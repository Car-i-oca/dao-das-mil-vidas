import { Pix, PAL, circulo, capsula, poligono, elipse } from './pix';

/**
 * Lutadores 48x64 em pixel art com quadros de animação: parado (2), ataque (3), técnica (3), dano, vitória, derrota.
 * Um esqueleto simples (quadril, ombro, cotovelos, joelhos, arma) é calculado por ângulos e desenhado com a mesma
 * técnica das peças estáticas (formas sombreadas, contorno seletivo, paleta fixa).
 */
export const LARG_LUT = 48;
export const ALT_LUT = 64;

export interface TraçoLutador {
  robe: keyof typeof PAL;
  calca: keyof typeof PAL;
  pele: string[];
  cabelo: string[];
  arma: 'espada' | 'punho' | 'cajado' | 'nenhuma';
  /** Cor da faixa/detalhe. */
  detalhe: keyof typeof PAL;
  demoniaco?: boolean;
}

export interface Pose {
  /** Deslocamento do quadril. */
  hx: number; hy: number;
  /** Inclinação do tronco (graus, + = para a frente). */
  tronco: number;
  /** Inclinação da cabeça. */
  cab: number;
  /** Ombro e cotovelo do braço da frente e do braço de trás (graus; 0 = pendurado, 90 = para a frente, 180 = para cima). */
  bf: [number, number]; bt: [number, number];
  /** Quadril e joelho das pernas (graus relativos à vertical). */
  pf: [number, number]; pt: [number, number];
  /** Ângulo da arma em relação ao antebraço da frente (graus). */
  arma: number;
  olhosFechados?: boolean;
  boca?: 'normal' | 'grito' | 'dor';
  /** Aura/brilho (0 a 1). */
  brilho?: number;
  /** Tinta vermelha (dano). */
  flash?: boolean;
  deitado?: boolean;
}

const rad = (g: number) => (g * Math.PI) / 180;
const pol = (x: number, y: number, ang: number, len: number): [number, number] => [x + Math.sin(rad(ang)) * len, y + Math.cos(rad(ang)) * len];

export function lutador(t: TraçoLutador, po: Pose): Pix {
  const p = new Pix(LARG_LUT, ALT_LUT);
  const chao = 61;
  const cx = 22 + po.hx, hy = 38 + po.hy;
  const robe = PAL[t.robe], calca = PAL[t.calca], det = PAL[t.detalhe];

  if (po.deitado) return deitado(t, po);

  // sombra no chão
  for (let x = cx - 10; x <= cx + 10; x++) for (let y = chao + 1; y <= chao + 2; y++) if (((x + y) & 1) === 0 && Math.hypot((x - cx) / 10, (y - chao - 1) / 1.6) < 1) p.set(x, y, PAL.pedra[1]);

  // pernas: quadril -> joelho -> pé
  const perna = (hip: number, joelho: number, ox: number, cor: string[]) => {
    const j = pol(cx + ox, hy, hip, 10);
    const f = pol(j[0], j[1], hip + joelho, 10);
    f[1] = Math.min(f[1], chao);
    p.forma(capsula(cx + ox, hy, j[0], j[1], 3, 2.4), cor, { volume: 2.6 });
    p.forma(capsula(j[0], j[1], f[0], f[1], 2.4, 2), cor, { volume: 2.2 });
    p.forma(capsula(f[0] - 1, f[1], f[0] + 3.5, f[1] + 0.2, 1.9), PAL.madeira, { volume: 1.9 });
  };
  perna(po.pt[0], po.pt[1], -2, calca);
  // braço de trás
  const braco = (b: [number, number], sx: number, sy: number, cor: string[], mao: boolean) => {
    const e = pol(sx, sy, 180 - b[0] + 0, 0); void e;
    const cot = pol(sx, sy, b[0], 8);
    const pun = pol(cot[0], cot[1], b[0] + b[1], 7.5);
    p.forma(capsula(sx, sy, cot[0], cot[1], 2.4, 2), cor, { volume: 2.2 });
    p.forma(capsula(cot[0], cot[1], pun[0], pun[1], 2, 1.7), cor, { volume: 1.9 });
    if (mao) p.forma(circulo(pun[0], pun[1], 1.8), t.pele, { volume: 1.8 });
    return pun;
  };
  // tronco
  const ombro: [number, number] = pol(cx, hy, 180 - po.tronco, 14).map((v, i) => (i === 1 ? hy - (v - hy) * -1 : v)) as [number, number];
  const sx = cx + Math.sin(rad(po.tronco)) * 14, sy = hy - Math.cos(rad(po.tronco)) * 14;
  void ombro;
  braco(po.bt, sx - 1, sy + 1, robe.map((c, i) => (i > 1 ? robe[i - 1] : c)), true);
  perna(po.pf[0], po.pf[1], 3, calca);
  // torso e cintura
  p.forma(poligono([[cx - 5, hy + 2], [cx + 5, hy + 2], [sx + 6, sy], [sx - 6, sy]]), robe, { volume: 5, pontilhado: 0.5 });
  p.forma(capsula(cx - 5, hy + 1, cx + 5, hy + 1, 1.4), PAL[t.detalhe], { volume: 1.4 });
  p.linha(sx - 3, sy + 1, cx + 1, hy, robe[1]);
  // pescoço e cabeça
  const hxx = sx + Math.sin(rad(po.tronco + po.cab)) * 5, hyy = sy - Math.cos(rad(po.tronco + po.cab)) * 5;
  p.forma(capsula(sx, sy, hxx, hyy + 2, 1.7), t.pele, { volume: 1.7 });
  p.forma(circulo(hxx, hyy - 3.4, 5.2), t.pele, { volume: 5.2 });
  p.forma(poligono([[hxx - 5.6, hyy - 3], [hxx - 5, hyy - 8], [hxx, hyy - 10.2], [hxx + 5, hyy - 8], [hxx + 5.6, hyy - 3], [hxx + 3, hyy - 6.5], [hxx, hyy - 7], [hxx - 3.5, hyy - 6]]), t.cabelo, { volume: 3 });
  if (t.demoniaco) { p.forma(poligono([[hxx - 3, hyy - 9], [hxx - 5, hyy - 14], [hxx - 1, hyy - 10]]), PAL.vermelho, { volume: 1.5 }); p.forma(poligono([[hxx + 3, hyy - 9], [hxx + 5, hyy - 14], [hxx + 1, hyy - 10]]), PAL.vermelho, { volume: 1.5 }); }
  p.forma(capsula(hxx - 5.4, hyy - 6.4, hxx + 5.4, hyy - 6, 0.8), det, { volume: 0.9, semContorno: true }); // faixa na testa
  // rosto (olha para a direita)
  const ex = hxx + 1.4, ey = hyy - 3.4;
  if (po.olhosFechados) { p.linha(ex, ey, ex + 2, ey, PAL.cabelo[0]); p.linha(ex - 3, ey, ex - 1, ey, PAL.cabelo[0]); }
  else { p.retangulo(Math.round(ex), Math.round(ey), 2, 2, t.demoniaco ? PAL.vermelho[3] : PAL.cabelo[0]); p.ponto(ex - 3, ey + 0, PAL.cabelo[0]); p.ponto(ex - 3, ey + 1, PAL.cabelo[0]); p.ponto(ex + 1, ey, PAL.papel[4]); }
  if (po.boca === 'grito') p.retangulo(Math.round(ex), Math.round(hyy + 0.5), 3, 2, PAL.vermelho[1]);
  else if (po.boca === 'dor') { p.linha(ex - 1, hyy + 1, ex + 2, hyy + 0, PAL.vermelho[1]); }
  else p.linha(ex, hyy + 0.6, ex + 2, hyy + 0.6, PAL.pele[1]);
  // braço da frente + arma
  const pun = braco(po.bf, sx + 1, sy + 1, robe, true);
  if (t.arma === 'espada') {
    const ang = po.bf[0] + po.bf[1] + po.arma;
    const ponta = pol(pun[0], pun[1], ang, 17);
    p.forma(capsula(pun[0], pun[1], ponta[0], ponta[1], 1.5, 0.6), PAL.aco, { volume: 1.5, brilho: 1 });
    const g1 = pol(pun[0], pun[1], ang + 90, 2.8), g2 = pol(pun[0], pun[1], ang - 90, 2.8);
    p.forma(capsula(g1[0], g1[1], g2[0], g2[1], 0.9), PAL.ouro, { volume: 1 });
    const pomo = pol(pun[0], pun[1], ang + 180, 3);
    p.forma(capsula(pun[0], pun[1], pomo[0], pomo[1], 1.1), PAL.madeira, { volume: 1.1 });
  } else if (t.arma === 'cajado') {
    const ang = po.bf[0] + po.bf[1] + po.arma;
    const a = pol(pun[0], pun[1], ang, 18), b = pol(pun[0], pun[1], ang + 180, 14);
    p.forma(capsula(a[0], a[1], b[0], b[1], 1.1), PAL.madeira, { volume: 1.1 });
    p.forma(circulo(a[0], a[1], 2.2), PAL.jade, { volume: 2.2, brilho: 1 });
  }
  // brilho de qi em volta
  if (po.brilho) for (let y = 0; y < ALT_LUT; y++) for (let x = 0; x < LARG_LUT; x++) { if (p.get(x, y)) continue; const d = Math.hypot(x - cx, (y - 36) * 0.7) / 22; if (d < 1 && ((x * 3 + y * 7) % 5 === 0) && ((x + y) & 1) === 0 && d > 0.55 / po.brilho) p.set(x, y, PAL.ouro[3]); }
  if (po.flash) for (let i = 0; i < p.px.length; i++) { const c = p.px[i]; if (c && (i + (i / LARG_LUT | 0)) % 2 === 0) p.px[i] = PAL.vermelho[3]; }
  return p;
}

function deitado(t: TraçoLutador, po: Pose): Pix {
  const p = new Pix(LARG_LUT, ALT_LUT);
  const y = 56, robe = PAL[t.robe], calca = PAL[t.calca];
  for (let x = 8; x < 40; x++) if (((x + 60) & 1) === 0) p.set(x, 62, PAL.pedra[1]);
  p.forma(capsula(24, y, 36, y + 1, 3, 2.4), calca, { volume: 2.6 });
  p.forma(capsula(36, y + 1, 41, y + 2, 2.2), PAL.madeira, { volume: 2 });
  p.forma(capsula(14, y - 1, 26, y, 4.4, 4), robe, { volume: 4 });
  p.forma(circulo(9, y - 1, 4.8), t.pele, { volume: 4.8 });
  p.forma(poligono([[4, y - 3], [6, y - 8], [11, y - 8], [14, y - 4], [10, y - 5], [6, y - 3]]), t.cabelo, { volume: 3 });
  p.linha(8, y - 1, 10, y - 1, PAL.cabelo[0]);
  p.forma(capsula(20, y + 2, 28, y + 3, 2, 1.7), robe.map((c, i) => (i > 0 ? robe[i - 1] : c)), { volume: 1.8 });
  if (t.arma === 'espada') p.forma(capsula(30, y + 5, 46, y + 5, 1.4, 0.6), PAL.aco, { volume: 1.4, brilho: 1 });
  void po; void elipse;
  return p;
}

const base: Pose = { hx: 0, hy: 0, tronco: 4, cab: 0, bf: [70, 40], bt: [20, 30], pf: [10, -5], pt: [-12, 6], arma: -20 };
export const POSES: Record<string, Pose[]> = {
  parado: [base, { ...base, hy: 1, tronco: 6, bf: [66, 44], bt: [18, 34], pf: [11, -6], pt: [-13, 7] }],
  ataque: [
    { ...base, hx: -3, tronco: -8, bf: [150, 10], bt: [-30, 40], pf: [-6, 4], pt: [-24, 10], arma: 40, boca: 'grito' },
    { ...base, hx: 5, hy: 2, tronco: 24, bf: [95, 4], bt: [-40, 30], pf: [34, -20], pt: [-30, 8], arma: -10, boca: 'grito' },
    { ...base, hx: 7, hy: 1, tronco: 18, bf: [60, 20], bt: [-30, 30], pf: [30, -14], pt: [-26, 8], arma: -50 },
  ],
  tecnica: [
    { ...base, hy: 3, tronco: 8, bf: [40, 90], bt: [10, 100], pf: [20, -30], pt: [-22, 20], arma: 0, brilho: 0.6 },
    { ...base, hx: 2, tronco: 12, bf: [90, 5], bt: [80, 10], pf: [14, -8], pt: [-18, 8], arma: 0, brilho: 1, boca: 'grito' },
    { ...base, hx: 2, tronco: 8, bf: [80, 10], bt: [60, 20], pf: [10, -6], pt: [-14, 6], arma: -10, brilho: 0.5 },
  ],
  dano: [{ ...base, hx: -4, tronco: -16, cab: -14, bf: [40, 30], bt: [30, 20], pf: [-6, 6], pt: [-26, 8], arma: -50, olhosFechados: true, boca: 'dor', flash: true }],
  vitoria: [{ ...base, tronco: -4, bf: [165, 10], bt: [30, 40], pf: [8, -4], pt: [-10, 6], arma: -10, boca: 'grito' }],
  derrota: [{ ...base, deitado: true, olhosFechados: true }],
};

export const TRACO_JOGADOR: TraçoLutador = { robe: 'azul', calca: 'pedra', pele: PAL.pele, cabelo: PAL.cabelo, arma: 'espada', detalhe: 'ouro' };
export const TRACO_RIVAL: TraçoLutador = { robe: 'vermelho', calca: 'cabelo', pele: PAL.peleEscura, cabelo: PAL.cabelo, arma: 'espada', detalhe: 'ouro', demoniaco: false };
export const TRACO_DEMONIO: TraçoLutador = { robe: 'noite', calca: 'cabelo', pele: PAL.pele, cabelo: PAL.cabeloBranco, arma: 'nenhuma', detalhe: 'vermelho', demoniaco: true };

/** Efeito de técnica 48x48: arco de espada (crescente) ou rajada de qi. */
export function efeito(tipo: 'espada' | 'rajada' | 'raio', quadro: number): Pix {
  const p = new Pix(48, 48);
  if (tipo === 'espada') {
    const r = 14 + quadro * 4;
    for (let a = -1.2; a <= 1.2; a += 0.02) for (let k = 0; k < 4 - quadro; k++) {
      const x = 14 + Math.cos(a) * (r + k * 0.9), y = 24 + Math.sin(a) * (r + k * 0.9) * 1.2;
      p.ponto(x, y, k === 0 ? PAL.aco[4] : k === 1 ? PAL.aco[3] : PAL.ceu[2]);
    }
  } else if (tipo === 'rajada') {
    p.forma(circulo(14 + quadro * 6, 24, 8 - quadro * 1.5), PAL.fogo, { volume: 7, brilho: 1, semContorno: true });
    for (let i = 0; i < 20; i++) p.ponto(4 + quadro * 6 + (i * 7) % 22, 18 + ((i * 5) % 14), i % 2 ? PAL.ouro[4] : PAL.fogo[3]);
  } else {
    let x = 4, y = 10;
    for (let i = 0; i < 10; i++) { const nx = x + 4 + (i % 2) * 2, ny = y + (i % 2 ? 4 : -2) + quadro; p.linha(x, y, nx, ny, PAL.ouro[4]); p.linha(x, y + 1, nx, ny + 1, PAL.azul[4]); x = nx; y = ny; }
  }
  return p;
}
