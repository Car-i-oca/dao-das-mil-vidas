import { PAL } from './paleta';
import { Tela, pixelizar, cache, hashStr } from './base';
import { POSES, type Pose } from '../pixel2/lutadores';

/**
 * Lutadores 48x64 pintados (membros como pinceladas largas com luz de recorte e contorno de tinta), com os mesmos 11 quadros
 * de animação do esqueleto de poses. Cada quadro é pintado em alta resolução, reduzido e quantizado para a paleta fixa.
 */
export const LARG_L = 48;
export const ALT_L = 64;

export interface TracoL {
  robe: keyof typeof PAL; calca: keyof typeof PAL; pele: string[]; cabelo: string[]; arma: 'espada' | 'punho' | 'cajado' | 'nenhuma'; detalhe: keyof typeof PAL; demoniaco?: boolean;
}
export const TRACO_JOGADOR_P: TracoL = { robe: 'azul', calca: 'cinza', pele: PAL.pele, cabelo: PAL.cabelo, arma: 'espada', detalhe: 'ouro' };

const rad = (g: number) => (g * Math.PI) / 180;
const pol = (x: number, y: number, ang: number, len: number): [number, number] => [x + Math.sin(rad(ang)) * len, y + Math.cos(rad(ang)) * len];

/** Segmento largo (de x0,y0 a x1,y1) com gradiente transversal e contorno de tinta na borda de sombra. */
function membro(t: Tela, x0: number, y0: number, x1: number, y1: number, w0: number, w1: number, tons: string[], tinta = true) {
  const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
  const p: [number, number][] = [[x0 + nx * w0, y0 + ny * w0], [x1 + nx * w1, y1 + ny * w1], [x1 - nx * w1, y1 - ny * w1], [x0 - nx * w0, y0 - ny * w0]];
  const [claro, base, escuro] = [tons[tons.length - 2], tons[Math.floor(tons.length / 2)], tons[1]];
  t.mancha(p, t.grad(x0 + nx * w0, y0 + ny * w0, x0 - nx * w0, y0 - ny * w0, [[0, claro], [0.5, base], [1, escuro]]), { tremor: 0.12, seed: Math.round(x0 * 7 + y0) });
  if (tinta) t.tinta([p[3], p[0]], 0.75, PAL.tinta[0], 0.75); // pontas
  if (tinta) t.tinta([p[2], p[3]], 0.7, PAL.tinta[0], 0.7);
}

export function pintarLutador(tr: TracoL, po: Pose): ReturnType<typeof pixelizar> {
  const t = new Tela(LARG_L, ALT_L, LARG_L * 10);
  const robe = PAL[tr.robe] as string[], calca = PAL[tr.calca] as string[], det = PAL[tr.detalhe] as string[];
  if (po.deitado) {
    const y = 56;
    t.elipse(24, 61, 16, 1.6, PAL.folha[0], { alpha: 0.4, borrao: 0.8 });
    membro(t, 24, y, 38, y + 1, 3.2, 2.6, calca); membro(t, 38, y + 1, 43, y + 2, 2.4, 2.2, PAL.marrom);
    membro(t, 13, y - 1, 27, y, 4.8, 4.4, robe);
    t.elipse(9, y - 1, 5, 5.4, t.grad(14, y - 6, 4, y + 4, [[0, tr.pele[1]], [1, tr.pele[3]]])); t.tinta([[4, y + 2], [9, y + 6], [14, y + 2]], 0.8, PAL.tinta[0], 0.8);
    t.mancha([[4, y - 3], [6, y - 9], [12, y - 9], [15, y - 4], [10, y - 6], [6, y - 3]], tr.cabelo[3], { seed: 4, tremor: 0.2 });
    t.tinta([[8, y - 1], [10.5, y - 1]], 0.7, PAL.tinta[0], 0.9);
    if (tr.arma === 'espada') membro(t, 30, y + 5, 46, y + 5, 1.2, 0.5, PAL.cinza);
    return pixelizar(t, LARG_L, ALT_L, { alfa: true, limpar: 1 });
  }
  const chao = 61, cx = 22 + po.hx, hy = 38 + po.hy;
  t.elipse(cx, chao + 1.4, 11, 1.8, PAL.folha[0], { alpha: 0.4, borrao: 0.8 });
  const perna = (hip: number, joelho: number, ox: number) => {
    const j = pol(cx + ox, hy, hip, 10), f = pol(j[0], j[1], hip + joelho, 10); f[1] = Math.min(f[1], chao);
    membro(t, cx + ox, hy, j[0], j[1], 3.1, 2.5, calca); membro(t, j[0], j[1], f[0], f[1], 2.5, 2.1, calca);
    membro(t, f[0] - 1.2, f[1], f[0] + 3.6, f[1] + 0.3, 2, 1.9, PAL.marrom);
  };
  perna(po.pt[0], po.pt[1], -2);
  const sx = cx + Math.sin(rad(po.tronco)) * 14, sy = hy - Math.cos(rad(po.tronco)) * 14;
  const braco = (b: [number, number], ox: number, oy: number, tons: string[]) => {
    const cot = pol(ox, oy, b[0], 8), pun = pol(cot[0], cot[1], b[0] + b[1], 7.5);
    membro(t, ox, oy, cot[0], cot[1], 2.5, 2.1, tons); membro(t, cot[0], cot[1], pun[0], pun[1], 2.1, 1.8, tons);
    t.elipse(pun[0], pun[1], 1.9, 1.9, tr.pele[1]); t.tinta([[pun[0] - 1.8, pun[1] + 1], [pun[0], pun[1] + 2], [pun[0] + 1.8, pun[1] + 0.8]], 0.6, PAL.tinta[0], 0.7);
    return pun;
  };
  braco(po.bt, sx - 1, sy + 1, robe.map((c, i) => robe[Math.max(0, i - 1)]));
  perna(po.pf[0], po.pf[1], 3);
  // torso
  t.mancha([[cx - 5.5, hy + 2], [cx + 5.5, hy + 2], [sx + 6.5, sy], [sx - 6.5, sy]], t.grad(sx + 6, sy, sx - 6, hy + 2, [[0, robe[robe.length - 2]], [0.55, robe[2]], [1, robe[1]]]), { seed: 3, tremor: 0.2 });
  t.mancha([[cx - 5.5, hy + 2], [cx - 1, hy + 2], [sx - 1, sy], [sx - 6.5, sy]], robe[1], { seed: 4, tremor: 0.2, alpha: 0.5 });
  t.tinta([[cx - 5.5, hy + 2], [sx - 6.5, sy]], 0.8, PAL.tinta[0], 0.8);
  t.tinta([[sx + 6.5, sy], [cx + 5.5, hy + 2]], 0.8, det[2], 0.9);
  membro(t, cx - 5.4, hy + 1, cx + 5.4, hy + 1, 1.5, 1.5, det);
  // pescoço e cabeça
  const hxx = sx + Math.sin(rad(po.tronco + po.cab)) * 5, hyy = sy - Math.cos(rad(po.tronco + po.cab)) * 5;
  membro(t, sx, sy, hxx, hyy + 2, 1.7, 1.6, tr.pele, false);
  t.elipse(hxx, hyy - 3.4, 5.1, 5.6, t.grad(hxx + 5, hyy - 8, hxx - 5, hyy + 2, [[0, tr.pele[0]], [0.5, tr.pele[1]], [1, tr.pele[3]]]));
  t.tinta([[hxx - 4.8, hyy - 3], [hxx - 3, hyy + 1.4], [hxx + 1, hyy + 2.2], [hxx + 4, hyy + 0.4]], 0.7, tr.pele[5] ?? PAL.tinta[0], 0.8);
  t.mancha([[hxx - 5.8, hyy - 3], [hxx - 5.4, hyy - 8.4], [hxx - 1, hyy - 10.6], [hxx + 4.4, hyy - 9], [hxx + 5.8, hyy - 3], [hxx + 3.6, hyy - 6.4], [hxx, hyy - 7], [hxx - 3.6, hyy - 5.6]], tr.cabelo[2], { seed: 7, tremor: 0.15 });
  t.mancha([[hxx - 5.8, hyy - 3], [hxx - 5.4, hyy - 8.4], [hxx - 1, hyy - 10.6], [hxx - 2, hyy - 6]], tr.cabelo[1], { seed: 8, tremor: 0.15, alpha: 0.9 });
  for (let i = 0; i < 4; i++) t.traco(hxx + 1 + i * 1.2, hyy - 10 + i * 0.4, hxx + 2.4 + i * 1.1, hyy - 6.2, 0.55, PAL.luz[1 + (i % 2)], 0.95);
  t.tinta([[hxx - 5.8, hyy - 3], [hxx - 5.4, hyy - 8.4], [hxx - 1, hyy - 10.6]], 0.75, PAL.tinta[0], 0.9);
  if (tr.demoniaco) for (const l of [-1, 1]) t.mancha([[hxx + l * 3, hyy - 9], [hxx + l * 5, hyy - 14.5], [hxx + l * 1, hyy - 10]], PAL.vermelho[2], { seed: 9 + l, tremor: 0.1 });
  t.traco(hxx - 5.6, hyy - 6.5, hxx + 5.6, hyy - 6.2, 0.9, det[2], 0.95);
  const ex = hxx + 1.6, ey = hyy - 3.3;
  if (po.olhosFechados) { t.tinta([[ex - 0.6, ey], [ex + 1.8, ey + 0.2]], 0.6, PAL.tinta[0], 0.95); t.tinta([[ex - 3.4, ey], [ex - 1, ey + 0.2]], 0.6, PAL.tinta[0], 0.95); }
  else { t.elipse(ex + 0.6, ey, 1.1, 1.1, tr.demoniaco ? PAL.vermelho[2] : PAL.tinta[1]); t.elipse(ex - 2.6, ey, 0.9, 1, PAL.tinta[1]); t.elipse(ex + 0.9, ey - 0.4, 0.35, 0.35, PAL.branco[2]); }
  if (po.boca === 'grito') t.elipse(ex + 1, hyy + 0.8, 1.2, 0.9, PAL.vermelho[1]); else t.tinta([[ex - 0.4, hyy + 0.8], [ex + 2, hyy + 0.8]], 0.5, PAL.vermelho[2], 0.9);
  // braço da frente e arma
  const pun = braco(po.bf, sx + 1, sy + 1, robe);
  if (tr.arma === 'espada') {
    const ang = po.bf[0] + po.bf[1] + po.arma, ponta = pol(pun[0], pun[1], ang, 17);
    membro(t, pun[0], pun[1], ponta[0], ponta[1], 1.2, 0.5, PAL.cinza);
    t.tinta([pun, ponta], 0.5, PAL.cinza[4], 0.9);
    const g1 = pol(pun[0], pun[1], ang + 90, 2.8), g2 = pol(pun[0], pun[1], ang - 90, 2.8);
    t.traco(g1[0], g1[1], g2[0], g2[1], 1.2, PAL.ouro[3]);
  } else if (tr.arma === 'cajado') {
    const ang = po.bf[0] + po.bf[1] + po.arma, a = pol(pun[0], pun[1], ang, 18), b = pol(pun[0], pun[1], ang + 180, 14);
    membro(t, a[0], a[1], b[0], b[1], 0.9, 0.9, PAL.marrom); t.elipse(a[0], a[1], 2.2, 2.2, t.radial(a[0] + 1, a[1] - 1, 3, [[0, PAL.jade[4]], [1, PAL.jade[2]]]));
  }
  if (po.brilho) for (let i = 0; i < 16; i++) { const a = i * 0.9; t.elipse(cx + Math.cos(a) * (13 + (i % 3) * 2), 36 + Math.sin(a) * (20 + (i % 4)), 0.7, 0.7, PAL.ouro[3], { alpha: 0.9 }); }
  if (po.flash) t.retangulo(0, 0, LARG_L, ALT_L, PAL.vermelho[3], 0.0);
  const px = pixelizar(t, LARG_L, ALT_L, { alfa: true, limpar: 1 });
  if (po.flash) for (let i = 0; i < px.idx.length; i++) if (px.idx[i] >= 0 && (i + ((i / LARG_L) | 0)) % 3 === 0) px.idx[i] = (px.idx[i] + 0) as number;
  return px;
}

export const QUADROS: [string, number][] = [['parado', 0], ['parado', 1], ['ataque', 0], ['ataque', 1], ['ataque', 2], ['tecnica', 0], ['tecnica', 1], ['tecnica', 2], ['dano', 0], ['vitoria', 0], ['derrota', 0]];
export function quadroUrl(chave: string, tr: TracoL, nome: string, i: number): string {
  return cache(`lp|${chave}|${nome}${i}`, () => pintarLutador(tr, POSES[nome][i]));
}
export const hash = hashStr;
