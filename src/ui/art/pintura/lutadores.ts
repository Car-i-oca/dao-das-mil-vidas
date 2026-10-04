import { PAL } from './paleta';
import { Tela, pixelizar, cache, hashStr } from './base';
import { POSES, type Pose } from '../pixel2/lutadores';
import { TEZES, COR_OLHO, figurinoDe, type Aparencia, type Estatuto } from './aparencia';

/**
 * Lutadores 60x84 pintados com a aparência da própria pessoa (cabelo, cor da pele, marcas, barba, traje e cores do retrato), nos
 * mesmos 11 quadros de animação do esqueleto de poses. Membros são pinceladas largas com luz de recorte e contorno de tinta.
 */
export const LARG_L = 60;
export const ALT_L = 84;
const ESC = 1.25; // o esqueleto original é 48x64

export type ArmaL = 'espada' | 'punho' | 'cajado' | 'cutelo' | 'adaga' | 'frasco' | 'orbe' | 'talisma' | 'dardo' | 'garra' | 'nenhuma';
export interface FigL {
  ap: Aparencia; estatuto: Estatuto; trilha: string; arma: ArmaL; stage: number; tier: number; semente: string;
  /** Roupa por cima do estatuto (bandido esfarrapado, assassino de capuz...). */
  roupa?: { pano: keyof typeof PAL; borda: keyof typeof PAL; calca: keyof typeof PAL; capuz?: boolean; mascara?: boolean; chifres?: boolean; olhos?: string };
}

const rad = (g: number) => (g * Math.PI) / 180;
const pol = (x: number, y: number, ang: number, len: number): [number, number] => [x + Math.sin(rad(ang)) * len * ESC, y + Math.cos(rad(ang)) * len * ESC];
const CABELOS = [PAL.cabeloPreto, PAL.cabeloCastEsc, PAL.cabelo, PAL.cabeloCastClaro, PAL.cabeloRuivo, PAL.cabeloLoiro, PAL.cabeloBranco] as string[][];

function membro(t: Tela, x0: number, y0: number, x1: number, y1: number, w0: number, w1: number, tons: string[], tinta = true) {
  const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
  const p: [number, number][] = [[x0 + nx * w0, y0 + ny * w0], [x1 + nx * w1, y1 + ny * w1], [x1 - nx * w1, y1 - ny * w1], [x0 - nx * w0, y0 - ny * w0]];
  const [claro, base, escuro] = [tons[tons.length - 2], tons[Math.floor(tons.length / 2)], tons[1]];
  t.mancha(p, t.grad(x0 + nx * w0, y0 + ny * w0, x0 - nx * w0, y0 - ny * w0, [[0, claro], [0.5, base], [1, escuro]]), { tremor: 0.08, seed: Math.round(x0 * 7 + y0) });
  if (tinta) { t.tinta([p[3], p[0]], 0.7, PAL.tinta[0], 0.8); t.tinta([p[2], p[3]], 0.65, PAL.tinta[0], 0.75); }
}

export function pintarLutador(fg: FigL, po: Pose): ReturnType<typeof pixelizar> {
  const t = new Tela(LARG_L, ALT_L, LARG_L * 10);
  const { ap } = fg, f = ap.g === 'f', velho = fg.stage >= 4, maduro = fg.stage >= 3;
  const fig = figurinoDe(ap, fg.estatuto, fg.trilha);
  const rp = fg.roupa;
  const pano = PAL[rp?.pano ?? fig.pano] as string[], forro = PAL[fig.forro] as string[], borda = PAL[rp?.borda ?? fig.borda] as string[];
  const calca = PAL[rp?.calca ?? (['mercador', 'nobre', 'patriarca', 'anciao'].includes(fg.estatuto) ? fig.pano : 'cinza')] as string[];
  const tez = TEZES[ap.tez];
  const corCab = velho || (maduro && hashStr(fg.semente) % 3) ? 6 : ap.corCabelo;
  const hc = CABELOS[corCab];
  const robeLongo = ['patriarca', 'anciao', 'nobre', 'monge'].includes(fg.estatuto) || (fig.gola === 'camadas');
  const baseX = 26 + po.hx * ESC, baseY = 48 + po.hy * ESC, chao = 79;

  if (po.deitado) return deitado(t, fg, tez, hc, pano, calca);
  t.elipse(baseX, chao + 1.6, 13, 2, PAL.folha[0], { alpha: 0.4, borrao: 1 });
  const perna = (hip: number, joelho: number, ox: number) => {
    const j = pol(baseX + ox, baseY, hip, 10), p = pol(j[0], j[1], hip + joelho, 10); p[1] = Math.min(p[1], chao);
    membro(t, baseX + ox, baseY, j[0], j[1], 3.6, 3, calca); membro(t, j[0], j[1], p[0], p[1], 3, 2.5, calca);
    membro(t, p[0] - 1.4, p[1], p[0] + 4.6, p[1] + 0.4, 2.4, 2.3, PAL.marrom);
  };
  perna(po.pt[0], po.pt[1], -2.6);
  const sx = baseX + Math.sin(rad(po.tronco)) * 14 * ESC, sy = baseY - Math.cos(rad(po.tronco)) * 14 * ESC;
  const braco = (b: [number, number], ox: number, oy: number, tons: string[]) => {
    const cot = pol(ox, oy, b[0], 8), pun = pol(cot[0], cot[1], b[0] + b[1], 7.5);
    membro(t, ox, oy, cot[0], cot[1], 3, 2.6, tons); membro(t, cot[0], cot[1], pun[0], pun[1], 2.6, 2.2, tons);
    t.elipse(pun[0], pun[1], 2.3, 2.3, tez[1]); t.tinta([[pun[0] - 2.1, pun[1] + 1.2], [pun[0], pun[1] + 2.5], [pun[0] + 2.1, pun[1] + 1]], 0.6, PAL.tinta[0], 0.75);
    return pun;
  };
  braco(po.bt, sx - 1.2, sy + 1.2, pano.map((c, i) => pano[Math.max(0, i - 1)]));
  perna(po.pf[0], po.pf[1], 3.6);
  // saia do manto (traje longo cobre os joelhos)
  if (robeLongo) t.mancha([[baseX - 8, baseY], [baseX + 8, baseY], [baseX + 11, baseY + 20], [baseX + 2, baseY + 24], [baseX - 9, baseY + 20]], t.grad(baseX + 10, baseY, baseX - 9, baseY + 22, [[0, pano[3]], [0.6, pano[2]], [1, pano[1]]]), { seed: 5, tremor: 0.2 });
  if (robeLongo) { t.tinta([[baseX - 9, baseY + 20], [baseX + 2, baseY + 24], [baseX + 11, baseY + 20]], 1.1, borda[2], 0.95); t.tinta([[baseX - 8, baseY], [baseX - 9, baseY + 20]], 0.7, PAL.tinta[0], 0.8); }
  // torso
  t.mancha([[baseX - 6.6, baseY + 2.5], [baseX + 6.6, baseY + 2.5], [sx + 8, sy], [sx - 8, sy]], t.grad(sx + 8, sy, sx - 8, baseY + 2, [[0, pano[pano.length - 2]], [0.55, pano[2]], [1, pano[1]]]), { seed: 3, tremor: 0.15 });
  t.mancha([[baseX - 6.6, baseY + 2.5], [baseX - 1, baseY + 2.5], [sx - 1, sy], [sx - 8, sy]], pano[1], { seed: 4, tremor: 0.15, alpha: 0.5 });
  t.tinta([[baseX - 6.6, baseY + 2.5], [sx - 8, sy]], 0.9, PAL.tinta[0], 0.85);
  t.tinta([[sx + 8, sy], [baseX + 6.6, baseY + 2.5]], 0.9, borda[3] ?? borda[2], 0.9);
  // gola em V com forro e borda (varia com o traje)
  t.mancha([[sx - 3, sy + 0.6], [sx + 3, sy + 0.6], [sx + 0.4, sy + 11]], forro[Math.min(2, forro.length - 1)], { seed: 6, tremor: 0.1 });
  t.tinta([[sx - 5, sy + 0.4], [sx + 0.2, sy + 11]], 1.1, borda[2], 0.95); t.tinta([[sx + 5, sy + 0.4], [sx + 0.6, sy + 11]], 1, borda[2], 0.95);
  membro(t, baseX - 6.5, baseY + 1.5, baseX + 6.5, baseY + 1.5, 1.7, 1.7, borda);
  // pescoço e cabeça
  const hxx = sx + Math.sin(rad(po.tronco + po.cab)) * 5.5, hyy = sy - Math.cos(rad(po.tronco + po.cab)) * 5.5;
  membro(t, sx, sy, hxx, hyy + 2.4, 2, 1.9, tez, false);
  const rx = ap.rosto === 1 ? 6 : ap.rosto === 3 ? 5 : 5.5, ry = ap.rosto === 3 ? 6.8 : 6.1;
  const hcy = hyy - 3.8;
  t.elipse(hxx, hcy, rx, ry, t.grad(hxx + rx, hcy - ry, hxx - rx, hcy + ry, [[0, tez[0]], [0.5, tez[1]], [1, tez[3]]]));
  t.mancha([[hxx - rx, hcy - 1], [hxx - 1.4, hcy - 2], [hxx - 1.6, hcy + ry - 1], [hxx - rx * 0.6, hcy + ry * 0.7]], tez[3], { seed: 8, tremor: 0.1, alpha: 0.6 });
  t.tinta([[hxx - rx, hcy - 2], [hxx - rx * 0.9, hcy + 2.4], [hxx - 1.6, hcy + ry]], 0.7, tez[5] ?? tez[4], 0.85);
  // barba
  if (ap.barba >= 3 && fg.stage > 0) t.mancha([[hxx - rx, hcy + 1.4], [hxx, hcy + 3], [hxx + rx, hcy + 1.4], [hxx + rx * 0.7, hcy + ry + 0.6], [hxx, hcy + ry + (ap.barba >= 4 ? 7 : 2)], [hxx - rx * 0.7, hcy + ry + 0.6]], velho || maduro ? PAL.cabeloBranco[3] : hc[2], { seed: 9, tremor: 0.15 });
  else if (ap.barba >= 1 && fg.stage > 0) t.mancha([[hxx - 2.6, hcy + 3.2], [hxx + 2.6, hcy + 3.2], [hxx + 2, hcy + 4.2], [hxx - 2, hcy + 4.2]], velho ? PAL.cabeloBranco[3] : hc[1], { seed: 9, tremor: 0.05 });
  // cabelo (calota + estilo)
  if (!(fg.estatuto === 'monge' && fg.trilha === 'budista')) {
    const e = ap.cabelo;
    if (e !== 8) {
      if ([3, 2, 10, 6, 5, 9].includes(e)) t.mancha([[hxx - rx - 1.6, hcy - 2], [hxx - rx * 0.6, hcy - ry - 2.4], [hxx + rx * 0.8, hcy - ry - 2], [hxx + rx + 1.8, hcy - 2], [hxx + rx + 2.4, hcy + (e === 3 || e === 10 ? 16 : 7)], [hxx - rx - 2.4, hcy + (e === 3 || e === 10 ? 16 : 7)]], hc[1], { seed: 11, tremor: 0.2 });
      t.mancha([[hxx - rx - 1.2, hcy - 0.4], [hxx - rx - 1.6, hcy - ry * 0.6], [hxx - rx * 0.5, hcy - ry - 2.4], [hxx + 1, hcy - ry - 3.2], [hxx + rx * 0.7, hcy - ry - 2.2], [hxx + rx + 1.6, hcy - ry * 0.6], [hxx + rx + 1.2, hcy - 0.4], [hxx + rx * 0.8, hcy - ry * 0.55], [hxx, hcy - ry * 0.75], [hxx - rx * 0.8, hcy - ry * 0.55]], hc[2], { seed: 12, tremor: 0.12 });
      t.mancha([[hxx - rx - 1.2, hcy - 0.4], [hxx - rx - 1.6, hcy - ry * 0.6], [hxx - rx * 0.5, hcy - ry - 2.4], [hxx - 0.5, hcy - ry - 2.6], [hxx - rx * 0.7, hcy - ry * 0.55]], hc[1], { seed: 13, tremor: 0.12 });
      for (let i = 0; i < 4; i++) t.traco(hxx + 1 + i * 1.3, hcy - ry - 2 + i * 0.3, hxx + 2.2 + i * 1.2, hcy - ry * 0.45, 0.55, i % 2 ? hc[4] ?? hc[3] : PAL.luz[1 + (i % 2)], 0.95);
      if (e === 4) { t.elipse(hxx + 1, hcy - ry - 5, 3.2, 3, hc[2]); t.tinta([[hxx - 3, hcy - ry - 3.4], [hxx + 5, hcy - ry - 3.4]], 0.6, PAL.tinta[0], 0.85); }
      t.tinta([[hxx - rx - 1.4, hcy], [hxx - rx - 1.6, hcy - ry * 0.6], [hxx - rx * 0.5, hcy - ry - 2.4], [hxx + 1, hcy - ry - 3.2]], 0.8, PAL.tinta[0], 0.9);
      if (e === 9 || e === 6) { for (let i = 0; i < 4; i++) t.elipse(hxx + rx + 3 + i * 0.4, hcy + 2 + i * 4.4, 2.2 - i * 0.2, 2.4, i % 2 ? hc[1] : hc[2]); }
    }
  }
  if (fg.estatuto === 'monge') for (let i = 0; i < 6; i++) t.elipse(sx - 4 + i * 1.6, sy + 2.8 + Math.sin(i) * 1, 0.9, 0.9, PAL.marrom[2]);
  if (rp?.capuz) { t.mancha([[hxx - rx - 3, hcy + 4], [hxx - rx - 2, hcy - ry - 1], [hxx, hcy - ry - 4.4], [hxx + rx + 2, hcy - ry - 1], [hxx + rx + 3, hcy + 4], [hxx + rx * 0.7, hcy - 1], [hxx - rx * 0.7, hcy - 1]], pano[1], { seed: 14, tremor: 0.15 }); t.tinta([[hxx - rx - 3, hcy + 4], [hxx - rx - 2, hcy - ry - 1], [hxx, hcy - ry - 4.4]], 0.9, PAL.tinta[0], 0.9); }
  if (rp?.chifres || ap.marcas.includes('demoniaca')) for (const l of [-1, 1]) t.mancha([[hxx + l * 3, hcy - ry - 1.6], [hxx + l * 5.4, hcy - ry - 8], [hxx + l * 1, hcy - ry - 2.4]], PAL.vermelho[2], { seed: 15 + l, tremor: 0.08 });
  if (ap.acess.includes('faixa') || fg.estatuto === 'servo') t.traco(hxx - rx - 0.6, hcy - ry * 0.6, hxx + rx + 0.6, hcy - ry * 0.6, 1.1, borda[2], 0.95);
  if (fig.chapeu === 'chapeu_palha') { t.mancha([[hxx - rx * 2.2, hcy - ry * 0.4], [hxx, hcy - ry - 6], [hxx + rx * 2.2, hcy - ry * 0.4], [hxx, hcy - ry * 0.1]], PAL.ocre[3], { seed: 16, tremor: 0.2 }); t.tinta([[hxx - rx * 2.2, hcy - ry * 0.4], [hxx, hcy - ry - 6]], 0.7, PAL.tinta[0], 0.85); }
  if (fig.chapeu === 'guan') { t.mancha([[hxx - 2.6, hcy - ry - 2.2], [hxx + 2.6, hcy - ry - 2.2], [hxx + 2, hcy - ry - 6], [hxx - 2, hcy - ry - 6]], PAL.ouro[2], { seed: 17, tremor: 0.08 }); }
  // rosto
  const ex = hxx + 1.8, ey = hcy + 0.4;
  const cor = rp?.olhos ?? (fg.tier >= 6 ? PAL.ouro[2] : COR_OLHO[ap.cor]);
  if (po.olhosFechados) { t.tinta([[ex - 0.8, ey], [ex + 2.2, ey + 0.3]], 0.7, PAL.tinta[0], 0.95); t.tinta([[ex - 4.4, ey], [ex - 1.4, ey + 0.3]], 0.7, PAL.tinta[0], 0.95); }
  else for (const [ox, w] of [[ex + 0.2, 1.7], [ex - 3.8, 1.5]] as [number, number][]) { t.elipse(ox, ey, w, 1.35, PAL.branco[2]); t.elipse(ox + 0.3, ey, 0.95, 1.1, cor); t.elipse(ox + 0.3, ey, 0.5, 0.6, PAL.tinta[0]); t.tinta([[ox - w, ey - 0.4], [ox, ey - 1.5], [ox + w, ey - 0.3]], 0.6, PAL.tinta[0], 1); }
  t.tinta([[ex - 4.6, ey - 2.6], [ex - 1.2, ey - 2.2]], 0.7, hc[1], 0.95); t.tinta([[ex - 0.4, ey - 2.2], [ex + 2.8, ey - 2.6]], 0.7, hc[1], 0.95);
  t.elipse(ex - 1, ey + 2, 0.8, 0.6, PAL.nariz[1]);
  if (po.boca === 'grito') t.elipse(ex - 0.8, hcy + 4, 1.5, 1.1, PAL.vermelho[1]); else if (po.boca === 'dor') t.tinta([[ex - 2.4, hcy + 4], [ex + 0.6, hcy + 3.4]], 0.6, PAL.vermelho[2], 0.95); else t.tinta([[ex - 2.4, hcy + 4], [ex + 0.4, hcy + 4]], 0.6, f ? PAL.vermelho[3] : PAL.vermelho[2], 0.95);
  if (rp?.mascara) t.mancha([[hxx - rx, ey + 1.4], [hxx + rx, ey + 1.4], [hxx + rx * 0.7, hcy + ry], [hxx - rx * 0.7, hcy + ry]], PAL.cinza[1], { seed: 18, tremor: 0.08 });
  if (ap.marcas.includes('cicatriz')) t.tinta([[ex + 2, ey - 3], [ex + 2.6, ey + 3]], 0.55, tez[4], 0.95);
  // braço da frente e arma
  const pun = braco(po.bf, sx + 1.2, sy + 1.2, pano);
  arma(t, fg.arma, pun, po);
  if (po.brilho) for (let i = 0; i < 18; i++) { const a = i * 0.9; t.elipse(baseX + Math.cos(a) * (15 + (i % 3) * 2), 44 + Math.sin(a) * (24 + (i % 4)), 0.8, 0.8, PAL.ouro[3], { alpha: 0.9 }); }
  return pixelizar(t, LARG_L, ALT_L, { alfa: true, limpar: 1 });
}

function arma(t: Tela, tipo: ArmaL, pun: [number, number], po: Pose) {
  const ang = po.bf[0] + po.bf[1] + po.arma;
  if (tipo === 'espada' || tipo === 'cutelo' || tipo === 'adaga') {
    const comp = tipo === 'adaga' ? 8 : tipo === 'cutelo' ? 13 : 20, ponta = pol(pun[0], pun[1], ang, comp / ESC);
    if (tipo === 'cutelo') { t.mancha([[pun[0], pun[1]], [ponta[0] - 2, ponta[1]], [ponta[0] + 2, ponta[1] + 3], [pun[0] + 2, pun[1] + 2]], PAL.cinza[3], { seed: 20, tremor: 0.05 }); t.tinta([[pun[0], pun[1]], [ponta[0] - 2, ponta[1]], [ponta[0] + 2, ponta[1] + 3]], 0.6, PAL.tinta[0], 0.9); }
    else { membro(t, pun[0], pun[1], ponta[0], ponta[1], tipo === 'adaga' ? 1 : 1.5, 0.5, PAL.cinza); t.tinta([pun, ponta], 0.5, PAL.cinza[4], 0.9); }
    const g1 = pol(pun[0], pun[1], ang + 90, 3 / ESC), g2 = pol(pun[0], pun[1], ang - 90, 3 / ESC);
    t.traco(g1[0], g1[1], g2[0], g2[1], 1.4, PAL.ouro[3]);
  } else if (tipo === 'cajado') {
    const a = pol(pun[0], pun[1], ang, 18 / ESC), b = pol(pun[0], pun[1], ang + 180, 14 / ESC);
    membro(t, a[0], a[1], b[0], b[1], 1.2, 1.2, PAL.marrom); t.elipse(a[0], a[1], 2.6, 2.6, t.radial(a[0] + 1, a[1] - 1, 4, [[0, PAL.jade[4]], [1, PAL.jade[2]]]));
  } else if (tipo === 'orbe') { t.elipse(pun[0] + 2, pun[1] - 2, 5, 5, PAL.azul[4], { alpha: 0.35, borrao: 1.4 }); t.elipse(pun[0] + 2, pun[1] - 2, 2.8, 2.8, t.radial(pun[0] + 1, pun[1] - 3, 4, [[0, PAL.branco[2]], [1, PAL.azul[3]]])); }
  else if (tipo === 'talisma') { t.mancha([[pun[0] + 1, pun[1] - 6], [pun[0] + 5, pun[1] - 6], [pun[0] + 5, pun[1] + 2], [pun[0] + 1, pun[1] + 2]], PAL.ocre[4], { seed: 21, tremor: 0.05 }); t.tinta([[pun[0] + 3, pun[1] - 5], [pun[0] + 3, pun[1] + 1]], 0.7, PAL.vermelho[2], 0.95); }
  else if (tipo === 'frasco') { t.elipse(pun[0] + 2, pun[1] - 1, 2.8, 3.2, PAL.vermelho[3]); t.traco(pun[0] + 2, pun[1] - 4, pun[0] + 2, pun[1] - 6, 1.2, PAL.branco[1]); t.tinta([[pun[0] - 0.6, pun[1]], [pun[0] + 2, pun[1] + 2.4], [pun[0] + 4.6, pun[1]]], 0.5, PAL.tinta[0], 0.85); }
  else if (tipo === 'dardo') { const p2 = pol(pun[0], pun[1], ang, 12 / ESC); membro(t, pun[0], pun[1], p2[0], p2[1], 0.7, 0.4, PAL.jade); }
  else if (tipo === 'garra') { for (const d of [-2, 0, 2]) { const p2 = pol(pun[0], pun[1] + d, ang, 8 / ESC); membro(t, pun[0], pun[1] + d, p2[0], p2[1], 0.5, 0.2, PAL.cinza, false); } }
  else if (tipo === 'punho') { t.elipse(pun[0], pun[1], 3, 3, PAL.vermelho[2]); t.tinta([[pun[0] - 2.6, pun[1] + 1], [pun[0], pun[1] + 3], [pun[0] + 2.6, pun[1] + 1]], 0.6, PAL.tinta[0], 0.85); }
}

function deitado(t: Tela, fg: FigL, tez: string[], hc: string[], pano: string[], calca: string[]) {
  const y = 74;
  t.elipse(30, 80, 20, 2, PAL.folha[0], { alpha: 0.4, borrao: 1 });
  membro(t, 30, y, 47, y + 1, 4, 3.4, calca); membro(t, 47, y + 1, 53, y + 2, 3, 2.8, PAL.marrom);
  membro(t, 16, y - 1, 33, y, 6, 5.5, pano);
  t.elipse(11, y - 1, 6.4, 6.8, t.grad(17, y - 7, 5, y + 5, [[0, tez[0]], [1, tez[3]]])); t.tinta([[5, y + 3], [11, y + 7.6], [17, y + 3]], 0.8, PAL.tinta[0], 0.8);
  t.mancha([[5, y - 4], [8, y - 11], [15, y - 11], [18, y - 5], [12, y - 7], [8, y - 4]], hc[2], { seed: 4, tremor: 0.15 });
  t.tinta([[9.4, y - 1], [12.6, y - 1]], 0.7, PAL.tinta[0], 0.95);
  membro(t, 24, y + 3, 33, y + 4, 2.6, 2.2, pano.map((c, i) => pano[Math.max(0, i - 1)]));
  if (fg.arma === 'espada') membro(t, 36, y + 7, 57, y + 7, 1.6, 0.6, PAL.cinza);
  return pixelizar(t, LARG_L, ALT_L, { alfa: true, limpar: 1 });
}

export const QUADROS: [string, number][] = [['parado', 0], ['parado', 1], ['ataque', 0], ['ataque', 1], ['ataque', 2], ['tecnica', 0], ['tecnica', 1], ['tecnica', 2], ['dano', 0], ['vitoria', 0], ['derrota', 0]];
export function quadroUrl(chave: string, fg: FigL, nome: string, i: number): string {
  return cache(`lp2|${chave}|${nome}${i}`, () => pintarLutador(fg, POSES[nome][i]));
}
export const hash = hashStr;
