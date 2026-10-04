import { Pix, PAL, circulo, capsula } from './pix';

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

const COR_SOMBRA = PAL.noite[0];

function deitado(t: TraçoLutador, po: Pose): Pix {
  const p = new Pix(LARG_LUT, ALT_LUT);
  const robe = PAL[t.robe], calca = PAL[t.calca];
  const chao = 60;

  // sombra
  for (let x = 6; x < 42; x++) {
    p.set(x, chao + 1, COR_SOMBRA);
  }

  // pernas caídas
  p.forma(capsula(14, chao - 3, 24, chao - 2, 3), calca, { volume: 2 });
  p.forma(capsula(24, chao - 2, 34, chao - 2, 2.5), calca, { volume: 2 });

  // tronco
  p.forma(capsula(26, chao - 4, 38, chao - 5, 4.5), robe, { volume: 3 });

  // cabeça no chão
  p.forma(circulo(41, chao - 6, 4.5), t.pele, { volume: 3 });
  p.forma(circulo(42, chao - 8, 4), t.cabelo, { volume: 2.5 });

  // braço caído
  p.forma(capsula(28, chao - 2, 36, chao - 2, 2), robe, { volume: 1.5 });

  if (po.flash) {
    for (let i = 0; i < p.px.length; i++) if (p.px[i]) p.px[i] = PAL.vermelho[3];
  }
  return p;
}

export function lutador(t: TraçoLutador, po: Pose): Pix {
  const p = new Pix(LARG_LUT, ALT_LUT);
  const chao = 61;
  const cx = 22 + po.hx, hy = 38 + po.hy;
  const robe = PAL[t.robe], calca = PAL[t.calca], det = PAL[t.detalhe];

  if (po.deitado) return deitado(t, po);

  // sombra no chão
  for (let x = cx - 10; x <= cx + 10; x++) {
    const d = Math.abs(x - cx) / 10;
    if (d <= 1) {
      p.set(x, chao, COR_SOMBRA);
      if (d < 0.6) p.set(x, chao + 1, COR_SOMBRA);
    }
  }

  // Articulações das pernas
  // Perna de trás
  const [jtx, jty] = pol(cx - 2, hy, po.pt[0], 10);
  const [ptx, pty] = pol(jtx, jty, po.pt[0] + po.pt[1], 10);
  p.forma(capsula(cx - 2, hy, jtx, jty, 3), calca, { volume: 2.5 });
  p.forma(capsula(jtx, jty, ptx, Math.min(chao, pty), 2.5), calca, { volume: 2 });
  p.forma(circulo(ptx + 1, Math.min(chao, pty), 2), PAL.madeira, { volume: 1.5 });

  // Tronco e ombro
  const [ox, oy] = pol(cx, hy - 1, po.tronco, 13);
  const [cabX, cabY] = pol(ox, oy - 2, po.tronco + po.cab, 7);

  // Braço de trás
  const [cotTx, cotTy] = pol(ox - 3, oy + 2, po.bt[0], 8);
  const [maoTx, maoTy] = pol(cotTx, cotTy, po.bt[0] + po.bt[1], 8);
  p.forma(capsula(ox - 3, oy + 2, cotTx, cotTy, 2.5), robe, { volume: 2 });
  p.forma(capsula(cotTx, cotTy, maoTx, maoTy, 2.2), robe, { volume: 1.8 });
  p.forma(circulo(maoTx, maoTy, 1.8), t.pele, { volume: 1.5 });

  // Perna da frente
  const [jfx, jfy] = pol(cx + 2, hy, po.pf[0], 10);
  const [pfx, pfy] = pol(jfx, jfy, po.pf[0] + po.pf[1], 10);
  p.forma(capsula(cx + 2, hy, jfx, jfy, 3.2), calca, { volume: 2.5 });
  p.forma(capsula(jfx, jfy, pfx, Math.min(chao, pfy), 2.7), calca, { volume: 2 });
  p.forma(circulo(pfx + 1, Math.min(chao, pfy), 2.2), PAL.madeira, { volume: 1.5 });

  // Tronco e túnica
  p.forma(capsula(cx, hy, ox, oy, 4.5), robe, { volume: 3.5 });
  p.forma(capsula(cx, hy - 1, ox, oy - 1, 3.5), robe, { volume: 3 });

  // Faixa na cintura
  p.forma(capsula(cx - 3, hy - 1, cx + 3, hy - 1, 2), det, { volume: 1.5 });
  p.linha(cx, hy, cx - 1, hy + 6, det[1] ?? det[0]);

  // Cabeça e rosto
  p.forma(circulo(cabX, cabY, 5), t.pele, { volume: 4 });
  // Cabelo
  p.forma(circulo(cabX - 1, cabY - 2, 5), t.cabelo, { volume: 3 });
  p.forma(capsula(cabX - 4, cabY - 1, cabX - 6, cabY + 7, 2), t.cabelo, { volume: 2 });

  // Olhos e boca
  const olhoX = Math.round(cabX + 2);
  const olhoY = Math.round(cabY - 1);
  if (po.olhosFechados) {
    p.linha(olhoX - 1, olhoY, olhoX + 1, olhoY, PAL.noite[0]);
  } else {
    p.ponto(olhoX, olhoY, t.demoniaco ? PAL.fogo[3] : PAL.noite[0]);
  }

  const bocaY = Math.round(cabY + 2);
  if (po.boca === 'grito') {
    p.retangulo(olhoX - 1, bocaY, 2, 2, PAL.vermelho[1]);
  } else if (po.boca === 'dor') {
    p.linha(olhoX - 1, bocaY, olhoX + 1, bocaY, PAL.vermelho[2]);
  } else {
    p.ponto(olhoX, bocaY, PAL.pele[1] ?? PAL.madeira[1]);
  }

  // Braço da frente
  const [cotFx, cotFy] = pol(ox + 3, oy + 2, po.bf[0], 8);
  const [maoFx, maoFy] = pol(cotFx, cotFy, po.bf[0] + po.bf[1], 8);
  p.forma(capsula(ox + 3, oy + 2, cotFx, cotFy, 2.7), robe, { volume: 2.2 });
  p.forma(capsula(cotFx, cotFy, maoFx, maoFy, 2.4), robe, { volume: 1.9 });
  p.forma(circulo(maoFx, maoFy, 2), t.pele, { volume: 1.6 });

  // Arma
  if (t.arma === 'espada') {
    const angArma = po.bf[0] + po.bf[1] + po.arma;
    const [pxPonta, pyPonta] = pol(maoFx, maoFy, angArma, 20);
    const [pxCabo, pyCabo] = pol(maoFx, maoFy, angArma + 180, 5);
    p.linha(Math.round(pxCabo), Math.round(pyCabo), Math.round(pxPonta), Math.round(pyPonta), PAL.aco[4]);
    p.forma(circulo(maoFx, maoFy, 1.8), PAL.ouro, { volume: 1 });
  } else if (t.arma === 'cajado') {
    const angArma = po.bf[0] + po.bf[1] + po.arma;
    const [px1, py1] = pol(maoFx, maoFy, angArma, 18);
    const [px2, py2] = pol(maoFx, maoFy, angArma + 180, 16);
    p.linha(Math.round(px1), Math.round(py1), Math.round(px2), Math.round(py2), PAL.madeira[3]);
    p.forma(circulo(px1, py1, 3), PAL.jade, { volume: 2 });
  }

  // Brilho / Aura
  if (po.brilho && po.brilho > 0) {
    const auraCor = t.demoniaco ? PAL.fogo[2] : PAL.ouro[3];
    for (let y = 0; y < ALT_LUT; y++) {
      for (let x = 0; x < LARG_LUT; x++) {
        if (!p.get(x, y)) {
          const viz = (p.get(x + 1, y) ? 1 : 0) + (p.get(x - 1, y) ? 1 : 0) + (p.get(x, y + 1) ? 1 : 0) + (p.get(x, y - 1) ? 1 : 0);
          if (viz > 0 && Math.random() < po.brilho * 0.6) {
            p.set(x, y, auraCor);
          }
        }
      }
    }
  }

  // Efeito de flash (dano)
  if (po.flash) {
    for (let i = 0; i < p.px.length; i++) {
      if (p.px[i] && p.px[i] !== COR_SOMBRA) p.px[i] = PAL.vermelho[3];
    }
  }

  return p;
}

export const POSES_PADRAO: Record<string, Pose> = {
  parado1: {
    hx: 0, hy: 0, tronco: 0, cab: 0,
    bf: [25, 45], bt: [-15, 30],
    pf: [12, -8], pt: [-14, 10],
    arma: 30
  },
  parado2: {
    hx: 0, hy: 1, tronco: 2, cab: -1,
    bf: [28, 48], bt: [-12, 32],
    pf: [14, -6], pt: [-12, 8],
    arma: 32
  },
  ataque1: {
    hx: -3, hy: 1, tronco: -10, cab: -5,
    bf: [-40, 60], bt: [40, 20],
    pf: [20, -10], pt: [-22, 18],
    arma: -30
  },
  ataque2: {
    hx: 4, hy: 0, tronco: 18, cab: 5,
    bf: [85, 10], bt: [-45, 30],
    pf: [-15, 20], pt: [24, -12],
    arma: 70,
    boca: 'grito'
  }
};

/**
 * Gera os 4 quadros do ciclo de animação do lutador usando as poses e primitivas.
 */
export function animacaoLutador(t: TraçoLutador): Pix[] {
  const quadros: Pose[] = [
    POSES_PADRAO.parado1,
    POSES_PADRAO.parado2,
    POSES_PADRAO.ataque1,
    POSES_PADRAO.ataque2
  ];
  return quadros.map(p => lutador(t, p));
}
