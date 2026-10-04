import { PAL } from './paleta';
import { Tela, rng, pixelizar, cache, hashStr } from './base';
import { TEZES, COR_OLHO, figurinoDe, estatutoDe, fundoDe, type Aparencia, type Estatuto, type FundoTipo, type Figurino } from './aparencia';
import { pintarFundo } from './fundos';

/**
 * Retrato nítido (112x112): rosto desenhado por blocos de cor bem definidos (luz, base, sombra) e contorno escuro irregular em
 * olhos, sobrancelhas, nariz, boca, cabelo e gola. Cada traço vem da Aparencia da pessoa; a idade só acrescenta rugas, cabelo
 * grisalho e cansaço. Fundo, traje e gola variam com o lugar, a facção, a trilha e o estatuto.
 */
export const TAM_R = 112;
type Pt = [number, number];
export type Expressao = 'serio' | 'sorriso' | 'canto' | 'raiva' | 'cansaco';

export interface ContextoRosto {
  ap: Aparencia; semente: string;
  /** 0 criança, 1 jovem, 2 adulto, 3 maduro, 4 ancião. */
  stage: number;
  estatuto: Estatuto; trilha: string; tier: number; corr: number; role: string;
  fundo: FundoTipo; expr?: Expressao; feridas?: number;
}

const CABELOS = [PAL.cabeloPreto, PAL.cabeloCastEsc, PAL.cabelo, PAL.cabeloCastClaro, PAL.cabeloRuivo, PAL.cabeloLoiro, PAL.cabeloBranco] as string[][];
const FORMA_ROSTO: Record<number, { w: number; h: number; jw: number; cw: number }> = {
  0: { w: 13.4, h: 20.4, jw: 0.78, cw: 0.3 }, 1: { w: 15, h: 19.4, jw: 0.95, cw: 0.52 }, 2: { w: 14.6, h: 19.8, jw: 1.0, cw: 0.62 }, 3: { w: 12.6, h: 22.6, jw: 0.72, cw: 0.32 }, 4: { w: 14, h: 20.4, jw: 0.56, cw: 0.2 },
};

export function pintarRosto(c: ContextoRosto): ReturnType<typeof pixelizar> {
  const { ap, stage } = c;
  const r = rng(hashStr(c.semente + 'r')), t = new Tela(100, 100, 896);
  const f = ap.g === 'f', crianca = stage === 0, maduro = stage >= 3, velho = stage >= 4;
  const tez = TEZES[ap.tez];
  const fig = figurinoDe(ap, c.estatuto, c.trilha);
  const pano = PAL[fig.pano] as string[], forro = PAL[fig.forro] as string[], borda = PAL[fig.borda] as string[];
  const luzCor = pintarFundo(t, c.fundo, r);
  // cabelo: a cor envelhece (grisalho a partir dos maduros)
  const corIdx = velho ? 6 : maduro && ap.corCabelo < 6 && (hashStr(c.semente) % 3 !== 0) ? 6 : ap.corCabelo;
  const hcor = CABELOS[corIdx];
  const fr = FORMA_ROSTO[ap.rosto];
  const W = fr.w * (crianca ? 1.04 : f ? 0.95 : 1), H = fr.h * (crianca ? 0.86 : 1);
  const cx = 47, cy = crianca ? 46 : 43;
  const jw = fr.jw * (f ? 0.9 : 1.04), cw = fr.cw * (f ? 0.85 : 1);

  // sombra do fundo atrás da figura e brilho do reino (sutil)
  t.elipse(cx, 66, 40, 46, PAL.tinta[0], { alpha: 0.28, borrao: 4 });
  if (c.tier >= 3) t.elipse(cx + 2, cy, 30, 36, c.corr >= 30 ? PAL.vermelho[2] : c.tier >= 6 ? PAL.luz[2] : PAL.azul[4], { alpha: 0.1 + c.tier * 0.01, borrao: 8 });

  // enquadramento fechado: cabeça grande, levemente fora do centro
  t.g.save(); t.g.translate(cx * t.k, 68 * t.k); t.g.scale(1.2, 1.2); t.g.translate((-cx - 2) * t.k, -68 * t.k);

  /* ---------- cabelo de trás ---------- */
  const e = ap.cabelo;
  const cab = { base: hcor[2], sombra: hcor[1], escuro: hcor[0], luz: hcor[3], brilho: hcor[Math.min(4, hcor.length - 1)] };
  const traseiro = (e === 3 || e === 2 || e === 10 || e === 6 || e === 5 || e === 9) && !(stage === 0 && e !== 9);
  if (traseiro) {
    const comp = e === 3 || e === 10 ? 40 : e === 2 ? 22 : e === 5 ? 20 : e === 6 ? 30 : 16;
    t.mancha([[cx - W - 3, cy - 4], [cx - W * 0.8, cy - H - 3], [cx, cy - H - 6], [cx + W * 0.8, cy - H - 3], [cx + W + 3, cy - 4], [cx + W + 4, cy + comp], [cx + W * 0.5, cy + comp + 6], [cx - W * 0.5, cy + comp + 6], [cx - W - 4, cy + comp]], cab.base, { seed: 11, tremor: 0.4 });
    t.mancha([[cx - W - 3, cy - 4], [cx - W - 4, cy + comp], [cx - W * 0.5, cy + comp + 6], [cx - W + 3, cy + 8]], cab.sombra, { seed: 12, tremor: 0.3 });
    t.tinta([[cx - W - 4, cy + 4], [cx - W - 4.5, cy + comp * 0.6], [cx - W - 4, cy + comp]], 1.1, PAL.tinta[0], 0.8);
  }
  if (e === 9 || e === 6) { // rabo / trança: massa que desce atrás do ombro direito
    const seg = e === 6 ? 7 : 5;
    for (let i = 0; i < seg; i++) { const y = cy + 6 + i * 6.4; t.elipse(cx + W + 2 + i * 0.4, y, 3.4 - i * 0.18, 3.6, i % 2 ? cab.sombra : cab.base); t.tinta([[cx + W - 1 + i * 0.4, y - 2.8], [cx + W + 5 + i * 0.4, y - 0.4]], 0.6, PAL.tinta[0], 0.7); }
  }

  /* ---------- roupa (ombros e gola) ---------- */
  const ombro: Pt[] = [[0, 100], [3, 88], [16, 79], [32, 74], [62, 74], [78, 79], [92, 88], [100, 100]];
  t.mancha(ombro, pano[2], { seed: 21, tremor: 0.5 });
  t.mancha([[0, 100], [3, 88], [16, 79], [28, 76], [30, 92], [24, 100]], pano[1], { seed: 22, tremor: 0.4 });
  t.mancha([[60, 76], [78, 79], [92, 88], [100, 100], [70, 100], [64, 90]], pano[3], { seed: 23, tremor: 0.4 });
  t.tinta([[2, 98], [4, 88], [16, 79], [32, 74]], 1.1, PAL.tinta[0], 0.9);
  t.tinta([[62, 74], [78, 79], [92, 88]], 0.9, luzCor, 0.9);
  // pescoço
  const pesc = Math.max(0, f ? 2 : 0);
  t.mancha([[cx - 7 + pesc * 0.3, cy + H - 6], [cx + 7 - pesc * 0.3, cy + H - 6], [cx + 8, 76], [cx + 1, 79], [cx - 8, 76]], tez[1], { seed: 31, tremor: 0.3 });
  t.mancha([[cx - 7, cy + H - 6], [cx - 1, cy + H - 4], [cx - 1, 79], [cx - 8, 76]], tez[3], { seed: 32, tremor: 0.3 });
  t.mancha([[cx - 8, cy + H - 2], [cx + 8, cy + H - 2], [cx + 6, cy + H + 7], [cx - 6, cy + H + 7]], tez[3], { seed: 33, tremor: 0.3 });
  gola(t, fig, c, pano, forro, borda, luzCor, cx, cy, H);

  /* ---------- orelhas ---------- */
  for (const s of [-1, 1]) {
    const ex = cx + s * (W + 1.6);
    t.mancha([[ex - s * 1, cy - 4.5], [ex + s * 3.6, cy - 3], [ex + s * 4.2, cy + 3], [ex + s * 1.6, cy + 6.2], [ex - s * 1, cy + 5]], s < 0 ? tez[2] : tez[1], { seed: 40 + s, tremor: 0.2 });
    t.tinta([[ex + s * 0.4, cy - 2], [ex + s * 2.6, cy - 0.6], [ex + s * 2, cy + 3]], 0.55, tez[4], 0.9);
    if (ap.acess.includes('brinco')) t.elipse(ex + s * 1.2, cy + 7.6, 1.2, 1.7, PAL.ouro[3]);
  }

  /* ---------- rosto: contorno e blocos de cor ---------- */
  const lado = (s: number): Pt[] => [[s * W * 0.62, -H * 0.94], [s * W * 0.97, -H * 0.55], [s * W * 1.0, -H * 0.12], [s * jw * W, H * 0.48], [s * cw * W * 1.5, H * 0.88]];
  const metade = (s: number) => lado(s).map(([x, y]) => [cx + x, cy + y] as Pt);
  const contorno: Pt[] = [[cx, cy - H], ...metade(1), [cx, cy + H], ...metade(-1).reverse()];
  t.mancha(contorno, tez[1], { seed: 53, tremor: 0.12 });
  // sombra da esquerda (oposta à luz): bloco duro
  t.mancha([[cx - W * 0.97, cy - H * 0.55], [cx - W * 0.42, cy - H * 0.4], [cx - W * 0.3, cy + H * 0.1], [cx - W * 0.22, cy + H * 0.8], [cx - cw * W * 1.5, cy + H * 0.88], [cx - jw * W, cy + H * 0.48], [cx - W, cy - H * 0.12]], tez[3], { seed: 54, tremor: 0.12 });
  t.mancha([[cx - W, cy - H * 0.1], [cx - W * 0.7, cy - H * 0.05], [cx - W * 0.6, cy + H * 0.4], [cx - jw * W, cy + H * 0.48]], tez[4], { seed: 55, tremor: 0.12, alpha: 0.75 });
  // luz da direita: testa, maçã do rosto e queixo
  t.mancha([[cx + W * 0.3, cy - H * 0.8], [cx + W * 0.7, cy - H * 0.68], [cx + W * 0.76, cy - H * 0.4], [cx + W * 0.34, cy - H * 0.44]], tez[0], { seed: 56, tremor: 0.12 });
  t.mancha([[cx + W * 0.34, cy + H * 0.04], [cx + W * 0.92, cy - H * 0.02], [cx + W * 0.84, cy + H * 0.26], [cx + W * 0.46, cy + H * 0.22]], tez[0], { seed: 57, tremor: 0.12 });
  // oco abaixo da maçã (rosto magro ou velho) e bochecha corada
  if (velho || maduro || ap.rosto === 3) t.mancha([[cx - W * 0.7, cy + H * 0.25], [cx - W * 0.25, cy + H * 0.3], [cx - W * 0.3, cy + H * 0.55]], tez[3], { seed: 58, tremor: 0.1, alpha: 0.7 });
  else t.elipse(cx - W * 0.5, cy + H * 0.32, 3.4, 2.1, f || crianca ? PAL.vermelho[4] : tez[2], { alpha: 0.5 });
  t.elipse(cx + W * 0.55, cy + H * 0.32, 3.2, 2, f || crianca ? PAL.vermelho[4] : tez[1], { alpha: 0.4 });
  // contorno do rosto: tinta irregular só do lado da sombra e no queixo
  t.tinta([[cx - W * 0.97, cy - H * 0.5], [cx - W, cy - H * 0.1], [cx - jw * W, cy + H * 0.48], [cx - cw * W * 1.5, cy + H * 0.88], [cx, cy + H + 0.4]], 0.9, tez[5] ?? tez[4], 0.85);
  t.tinta([[cx, cy + H + 0.4], [cx + cw * W * 1.5, cy + H * 0.88], [cx + jw * W, cy + H * 0.48]], 0.7, tez[4], 0.75);
  t.tinta([[cx + W * 0.98, cy - H * 0.4], [cx + W * 1.0, cy - H * 0.1]], 0.6, luzCor, 0.7);

  /* ---------- olhos ---------- */
  const ey = cy + (crianca ? 1.8 : 0.6), sep = (crianca ? 7.9 : 7.5) * (ap.rosto === 1 ? 1.04 : ap.rosto === 3 ? 0.94 : 1);
  const exp = c.expr ?? (c.role === 'amigo' || c.role === 'noivo' ? 'sorriso' : c.role === 'rival' ? 'canto' : c.role === 'inimigo' ? 'raiva' : velho ? 'cansaco' : 'serio');
  for (const s of [-1, 1]) olho(t, cx + s * sep, ey, s, ap, c, exp, tez, hcor);
  // sobrancelhas
  for (const s of [-1, 1]) {
    const bx = cx + s * sep, by = ey - (crianca ? 4.6 : 4.8) - (ap.olho === 4 ? 0.6 : 0);
    const esp = [0.8, 1.3, 1.9][ap.sobEsp] * (f ? 0.8 : 1) * (crianca ? 0.9 : 1);
    let ang = ap.sobAng;
    if (exp === 'raiva') ang += 2; if (exp === 'cansaco') ang -= 1; if (exp === 'canto' && s === 1) ang += 1;
    const ix = bx - s * 5.6, iy = by + (exp === 'raiva' ? 1.6 : exp === 'cansaco' ? -0.6 : 0.2) , ox = bx + s * 5.8, oy = by - 0.6 + ang * 0.7 * -0.5 + (exp === 'sorriso' ? -0.6 : 0);
    t.mancha([[ix, iy - esp / 2], [(ix + ox) / 2, (iy + oy) / 2 - esp * 0.8], [ox, oy - esp * 0.3], [ox, oy + esp * 0.4], [(ix + ox) / 2, (iy + oy) / 2 + esp * 0.2], [ix, iy + esp / 2]], velho ? hcor[3] : hcor[1], { seed: 60 + s, tremor: 0.08 });
  }
  /* ---------- nariz ---------- */
  nariz(t, ap, cx, ey, H, tez, luzCor);
  /* ---------- boca ---------- */
  boca(t, ap, cx, cy + H * 0.62, exp, tez, f);
  /* ---------- barba e bigode ---------- */
  barba(t, ap, c, cx, cy, W, H, hcor, corIdx);
  /* ---------- rugas ---------- */
  if (maduro || velho) { const a = velho ? 0.8 : 0.5; for (const s of [-1, 1]) { t.tinta([[cx + s * 12.6, ey + 2], [cx + s * 10.4, ey + 5.6]], 0.5, tez[4], a); t.tinta([[cx + s * 4.8, cy + H * 0.5], [cx + s * 6.4, cy + H * 0.68]], 0.5, tez[4], a); } t.tinta([[cx - 7, ey - 9.4], [cx + 7, ey - 9.4]], 0.5, tez[4], a); if (velho) t.tinta([[cx - 6, ey - 11.6], [cx + 5, ey - 11.6]], 0.5, tez[4], a); }
  if (crianca) for (const s of [-1, 1]) t.elipse(cx + s * 10, cy + H * 0.34, 1.6, 1, PAL.vermelho[4], { alpha: 0.5 });
  /* ---------- marcas ---------- */
  marcas(t, ap, c, cx, cy, W, H, ey, tez);
  /* ---------- cabelo da frente ---------- */
  cabelo(t, c, ap, cx, cy, W, H, cab, luzCor, stage);
  /* ---------- acessórios ---------- */
  acessorios(t, c, ap, fig, cx, cy, W, H, ey, cab);

  t.g.restore();
  return pixelizar(t, TAM_R, TAM_R, { limpar: 2 });
}

/* ================= partes ================= */
function olho(t: Tela, x: number, y: number, s: number, ap: Aparencia, c: ContextoRosto, exp: Expressao, tez: string[], hcor: string[]) {
  const f = ap.g === 'f', crianca = c.stage === 0;
  const tipo = ap.olho;
  const w = [3.9, 3.4, 3.7, 4, 3.8][tipo] * (crianca ? 1.1 : 1), h = [2.5, 3.0, 2.4, 1.7, 3.4][tipo] * (crianca ? 1.12 : 1);
  const dy = [-0.55, 0.1, 0.65, -0.1, 0][tipo]; // desnível do canto externo (negativo = sobe)
  const ext: Pt = [x + s * w, y + dy], int: Pt = [x - s * w * 0.92, y + 0.25];
  const sup = (u: number): Pt => [int[0] + (ext[0] - int[0]) * u, int[1] + (ext[1] - int[1]) * u - Math.sin(u * Math.PI) * h * (u < 0.5 ? 1.02 : 0.9)];
  const inf = (u: number): Pt => [int[0] + (ext[0] - int[0]) * u, int[1] + (ext[1] - int[1]) * u + Math.sin(u * Math.PI) * h * 0.5];
  const contorno: Pt[] = [int, sup(0.25), sup(0.5), sup(0.75), ext, inf(0.75), inf(0.5), inf(0.25)];
  // sombra da pálpebra e olheira
  t.mancha([[int[0] - s * 0.4, y - h - 1.8], [x, y - h - 2.4], [ext[0] + s * 0.6, ext[1] - h - 0.6], [ext[0], ext[1] - 0.2], [x, y - h * 0.2], [int[0], int[1] - 0.2]], tez[2], { seed: 70, tremor: 0.05, alpha: 0.85 });
  t.mancha(contorno, PAL.branco[2], { seed: 71, tremor: 0.03 });
  const ir = h * 0.9 * (tipo === 3 ? 1.4 : 1.05), ix = x + s * 0.2;
  const g = t.g, k = t.k;
  g.save(); g.beginPath(); contorno.forEach(([px, py], i) => (i ? g.lineTo(px * k, py * k) : g.moveTo(px * k, py * k))); g.closePath(); g.clip();
  const cor = c.corr >= 30 ? PAL.vermelho[2] : c.tier >= 6 ? PAL.ouro[2] : COR_OLHO[ap.cor];
  t.elipse(ix, y - 0.1, ir, ir * 1.1, PAL.tinta[1]);
  t.elipse(ix, y + 0.05, ir * 0.84, ir * 0.92, cor);
  t.elipse(ix, y + ir * 0.35, ir * 0.55, ir * 0.4, PAL.branco[0], { alpha: 0.35 });
  t.elipse(ix, y - 0.1, ir * 0.38, ir * 0.42, PAL.tinta[0]);
  g.restore();
  t.elipse(ix + s * 0.5 + 0.3, y - ir * 0.55, 0.65, 0.65, PAL.branco[2]);
  // pálpebra superior (tinta grossa) com a ponta externa conforme o formato
  const lid: Pt[] = [[int[0], int[1] + 0.1], sup(0.18), sup(0.4), sup(0.62), sup(0.82), ext];
  t.tinta(lid, f ? 1.0 : 0.85, PAL.tinta[0], 1);
  const cauda: Pt = tipo === 2 ? [ext[0] + s * 1.6, ext[1] + 1] : tipo === 3 ? [ext[0] + s * 1.5, ext[1] - 0.3] : [ext[0] + s * 1.5, ext[1] - 0.9];
  t.tinta([ext, cauda], f ? 1.1 : 0.85, PAL.tinta[0], 0.95);
  if (f) t.tinta([[ext[0], ext[1] - 0.3], [ext[0] + s * 1.9, ext[1] - 1.7]], 0.6, PAL.tinta[0], 0.95);
  // dobra e pálpebra inferior
  t.tinta([sup(0.2).map((v, i) => v - (i ? 1.9 : 0)) as Pt, sup(0.55).map((v, i) => v - (i ? 2.1 : 0)) as Pt, sup(0.9).map((v, i) => v - (i ? 1.6 : 0)) as Pt], 0.5, tez[4], 0.7);
  t.tinta([inf(0.2), inf(0.5), inf(0.8)], 0.45, tez[3], 0.8);
  if (exp === 'cansaco' || c.stage >= 3) t.mancha([[x - w, y + 2.2], [x, y + 3.2], [x + w, y + 2.2], [x, y + 2.6]], tez[3], { seed: 72, tremor: 0.05, alpha: 0.7 });
  if (c.corr >= 30) t.elipse(ix, y, ir * 0.55, ir * 0.55, PAL.vermelho[4], { alpha: 0.55 });
  void hcor;
}

function nariz(t: Tela, ap: Aparencia, cx: number, ey: number, H: number, tez: string[], luzCor: string) {
  const w = [1.5, 2.0, 2.7, 1.9][ap.nariz], base = ey + H * 0.36, topo = ey + 0.6;
  t.mancha([[cx - 1.4, topo], [cx - 0.4, topo + 2], [cx - w - 0.2, base - 1.2], [cx - 0.6, base - 0.5]], tez[3], { seed: 80, tremor: 0.06, alpha: 0.85 });
  t.mancha([[cx + 0.4, topo + 1], [cx + 1.4, topo + 3], [cx + w * 0.8, base - 1.6], [cx + 0.4, base - 2]], tez[0], { seed: 81, tremor: 0.06 });
  t.mancha([[cx - w - 0.6, base - 0.2], [cx - w - 1.1, base + 0.7], [cx - w * 0.4, base + 1.8], [cx + w * 0.4, base + 1.8], [cx + w + 1.1, base + 0.7], [cx + w + 0.6, base - 0.2], [cx, base - 1.4]], PAL.nariz[0], { seed: 82, tremor: 0.06 });
  t.mancha([[cx - w * 0.9, base + 0.9], [cx - w * 0.2, base + 1.7], [cx - w * 0.2, base + 0.7]], PAL.nariz[1], { seed: 83, tremor: 0.04 });
  t.mancha([[cx + w * 0.9, base + 0.9], [cx + w * 0.2, base + 1.7], [cx + w * 0.2, base + 0.7]], PAL.nariz[1], { seed: 84, tremor: 0.04 });
  t.tinta([[cx - 0.6, base + 1.2], [cx - w * 0.5, base + 1.2]], 0.6, PAL.tinta[1], 0.9);
  t.tinta([[cx + 0.6, base + 1.2], [cx + w * 0.5, base + 1.2]], 0.6, PAL.tinta[1], 0.9);
  t.tinta([[cx - 0.9, topo + 2], [cx - w * 0.8, base - 1]], 0.55, tez[4], 0.8);
  t.elipse(cx + 0.5, base - 0.9, 0.7, 0.5, tez[0], { alpha: 0.9 });
  void luzCor;
}

function boca(t: Tela, ap: Aparencia, cx: number, my: number, exp: Expressao, tez: string[], f: boolean) {
  const w = [3.6, 4.2, 4.8, 3.2][ap.boca], esp = [0.8, 1.2, 1.9, 1.0][ap.boca] + (f ? 0.5 : 0);
  const labio = f ? PAL.vermelho[3] : ap.tez >= 2 ? PAL.peleEscura[3] : PAL.vermelho[3], sombra = f ? PAL.vermelho[2] : PAL.vermelho[1];
  const dx = exp === 'raiva' ? -1.1 : exp === 'cansaco' ? -0.7 : exp === 'sorriso' ? 1.5 : exp === 'canto' ? 1.1 : 0;
  const esq = my - (exp === 'sorriso' ? 0.7 : 0) + dx * -0.4, dir = my - (exp === 'sorriso' ? 1.2 : exp === 'canto' ? 1.5 : 0) + dx * -0.4;
  t.mancha([[cx - w, esq], [cx - w * 0.5, my - esp * 0.5], [cx, my - esp * 0.3], [cx + w * 0.5, my - esp * 0.55], [cx + w, dir], [cx, my + 0.3]], sombra, { seed: 90, tremor: 0.04 });
  t.mancha([[cx - w * 0.9, esq + 0.3], [cx, my + 0.3], [cx + w * 0.9, dir + 0.3], [cx + w * 0.5, my + esp * 1.15 + 0.3], [cx, my + esp * 1.35], [cx - w * 0.5, my + esp * 1.1]], labio, { seed: 91, tremor: 0.04 });
  if (esp > 1.1) t.elipse(cx + 0.6, my + esp * 0.7 + 0.3, 1.5, 0.35, tez[0], { alpha: 0.9 });
  t.tinta([[cx - w, esq + 0.1], [cx - w * 0.5, my + 0.15], [cx, my + 0.25], [cx + w * 0.5, my + 0.1], [cx + w, dir + 0.05]], 0.65, PAL.tinta[0], 0.95);
  if (exp === 'sorriso') { t.tinta([[cx + w, dir], [cx + w + 0.7, dir - 0.8]], 0.5, tez[4], 0.9); t.mancha([[cx - w * 0.5, my + 0.4], [cx + w * 0.6, my + 0.4], [cx + w * 0.4, my + 1.1], [cx - w * 0.3, my + 1.1]], PAL.branco[1], { seed: 92, tremor: 0.03 }); }
  if (exp === 'raiva') t.mancha([[cx - w * 0.6, my + 0.3], [cx + w * 0.6, my + 0.3], [cx + w * 0.4, my + 1.1], [cx - w * 0.4, my + 1.1]], PAL.branco[0], { seed: 93, tremor: 0.03, alpha: 0.9 });
  t.mancha([[cx - 2, my + esp * 1.4 + 1.6], [cx + 2, my + esp * 1.4 + 1.6], [cx + 1.4, my + esp * 1.4 + 2.5], [cx - 1.4, my + esp * 1.4 + 2.5]], tez[3], { seed: 94, tremor: 0.04, alpha: 0.6 });
}

function barba(t: Tela, ap: Aparencia, c: ContextoRosto, cx: number, cy: number, W: number, H: number, hcor: string[], corIdx: number) {
  if (!ap.barba || ap.g === 'f' || c.stage === 0) return;
  const tom = c.stage >= 3 ? PAL.cabeloBranco : (corIdx === 6 ? PAL.cabeloBranco : hcor);
  const my = cy + H * 0.62;
  if (ap.barba >= 1) { // bigode
    t.mancha([[cx - 6.4, my - 2.6], [cx - 1, my - 3.8], [cx, my - 2.8], [cx + 1, my - 3.8], [cx + 6.4, my - 2.6], [cx + 5, my - 0.4], [cx, my - 1.6], [cx - 5, my - 0.4]], tom[2], { seed: 100, tremor: 0.1 });
    t.tinta([[cx - 6.4, my - 2.4], [cx - 1, my - 3.7]], 0.6, tom[0], 0.9);
  }
  if (ap.barba >= 2) t.mancha([[cx - 3, my + 3], [cx + 3, my + 3], [cx + 2.4, my + H * 0.45], [cx, my + H * 0.52], [cx - 2.4, my + H * 0.45]], tom[2], { seed: 101, tremor: 0.1 });
  if (ap.barba >= 3) t.mancha([[cx - W + 1, cy + H * 0.1], [cx - W * 0.4, my + 1], [cx, my + 3], [cx + W * 0.4, my + 1], [cx + W - 1, cy + H * 0.1], [cx + W * 0.7, cy + H * 0.72], [cx, cy + H + 1.6], [cx - W * 0.7, cy + H * 0.72]], tom[2], { seed: 102, tremor: 0.15 });
  if (ap.barba >= 4) { t.mancha([[cx - W * 0.7, cy + H * 0.6], [cx + W * 0.7, cy + H * 0.6], [cx + W * 0.5, cy + H + 14], [cx, cy + H + 22], [cx - W * 0.5, cy + H + 14]], tom[3], { seed: 103, tremor: 0.2 }); t.mancha([[cx - W * 0.7, cy + H * 0.6], [cx - W * 0.1, cy + H * 0.8], [cx - W * 0.2, cy + H + 14], [cx - W * 0.5, cy + H + 14]], tom[1], { seed: 104, tremor: 0.2, alpha: 0.9 }); t.tinta([[cx - W * 0.7, cy + H * 0.65], [cx - W * 0.5, cy + H + 14], [cx, cy + H + 22]], 0.8, PAL.tinta[1], 0.8); }
  // fios de luz e a boca por cima
  t.tinta([[cx - 2, my + 0.3], [cx + 2, my + 0.3]], 0.6, PAL.tinta[0], 0.9);
}

function marcas(t: Tela, ap: Aparencia, c: ContextoRosto, cx: number, cy: number, W: number, H: number, ey: number, tez: string[]) {
  if (ap.marcas.includes('cicatriz')) { t.tinta([[cx + 9, ey - 6], [cx + 11, ey + 2], [cx + 8, ey + 9]], 1, tez[4], 0.95); t.tinta([[cx + 9.8, ey - 3], [cx + 11.6, ey - 3.6]], 0.5, tez[0], 0.9); }
  if (ap.marcas.includes('pinta')) t.elipse(cx - 9, cy + H * 0.5, 0.8, 0.8, PAL.tinta[1]);
  if (ap.marcas.includes('sardas')) for (let i = 0; i < 9; i++) t.elipse(cx + (i % 3) * 2.6 - 10.4 + (i > 5 ? 20 : 0), ey + 5 + Math.floor((i % 6) / 3) * 1.8, 0.45, 0.45, tez[3], { alpha: 0.9 });
  if (ap.marcas.includes('tatuagem')) { t.tinta([[cx - 2, ey - 14], [cx, ey - 11], [cx + 2, ey - 14]], 0.8, PAL.azul[1], 0.95); t.tinta([[cx, ey - 11], [cx, ey - 8.5]], 0.8, PAL.azul[1], 0.95); }
  if (ap.marcas.includes('demoniaca') || c.corr >= 30) { t.tinta([[cx - 1.8, ey - 14], [cx, ey - 10.5], [cx + 1.8, ey - 14], [cx, ey - 12.6]], 0.9, PAL.vermelho[2], 0.95); for (let i = 0; i < 3; i++) t.tinta([[cx - 12 + i, ey + 4 + i * 2.4], [cx - 9, ey + 5.6 + i * 2.6]], 0.45, PAL.vermelho[2], 0.85); }
  if (c.tier >= 5 && !(ap.marcas.includes('demoniaca') || c.corr >= 30)) t.mancha([[cx, ey - 15], [cx + 1.4, ey - 13], [cx, ey - 11], [cx - 1.4, ey - 13]], PAL.ouro[3], { seed: 110, tremor: 0.05 });
  if (ap.marcas.includes('olho_branco')) t.elipse(cx - 7.2, ey, 2.1, 1.6, PAL.branco[1], { alpha: 0.6 });
  for (let i = 0; i < Math.min(3, c.feridas ?? 0); i++) t.tinta([[cx - 12 + i * 3, cy + H * 0.2 + i * 3], [cx - 6 + i * 3, cy + H * 0.3 + i * 3.4]], 0.7, tez[4], 0.9);
}

function cabelo(t: Tela, c: ContextoRosto, ap: Aparencia, cx: number, cy: number, W: number, H: number, cab: { base: string; sombra: string; escuro: string; luz: string; brilho: string }, luzCor: string, stage: number) {
  const e = ap.cabelo;
  const topo = cy - H;
  const fio = (x0: number, y0: number, x1: number, y1: number, cor: string, w = 0.7, a = 0.95) => t.traco(x0, y0, x1, y1, w, cor, a);
  if (c.estatuto === 'monge' && c.role === 'jogador') return;
  if (e === 8) { // raspado: sombra fina de cabelo curto
    t.mancha([[cx - W - 0.6, cy - H * 0.2], [cx - W * 0.8, topo - 0.4], [cx, topo - 1.6], [cx + W * 0.8, topo - 0.4], [cx + W + 0.6, cy - H * 0.2], [cx + W * 0.7, cy - H * 0.62], [cx, cy - H * 0.78], [cx - W * 0.7, cy - H * 0.62]], cab.sombra, { seed: 120, tremor: 0.12, alpha: 0.9 });
    return;
  }
  const vol = e === 0 || e === 7 ? 1.6 : e === 2 ? 1.2 : 0.7;
  const alto = e === 7 ? 6.4 : e === 0 ? 4 : 3.2;
  // calota ao redor do crânio: contorno externo e linha do cabelo (a testa fica de fora)
  const ext: Pt[] = [[cx - W - 1.2, cy - H * 0.05], [cx - W - 1.8 - vol, cy - H * 0.55], [cx - W * 0.62, topo - alto + 0.6], [cx + 1.5, topo - alto - 1], [cx + W * 0.7, topo - alto + 0.8], [cx + W + 1.8 + vol, cy - H * 0.55], [cx + W + 1.2, cy - H * 0.05]];
  const linha = e === 7 || e === 11 ? 0.8 : 0.72;
  const hairline: Pt[] = [[cx + W * 0.98, cy - H * 0.2], [cx + W * 0.92, cy - H * 0.52], [cx + W * 0.5, cy - H * linha], [cx + 1, cy - H * (linha + 0.04)], [cx - W * 0.5, cy - H * linha], [cx - W * 0.92, cy - H * 0.52], [cx - W * 0.98, cy - H * 0.2]];
  t.mancha([...ext, ...hairline], cab.base, { seed: 121, tremor: 0.14 });
  // lado da sombra e lado da luz
  t.mancha([[cx - W - 1.2, cy - H * 0.05], [cx - W - 1.8 - vol, cy - H * 0.55], [cx - W * 0.62, topo - alto + 0.6], [cx - 1, topo - alto - 0.4], [cx - W * 0.7, cy - H * 0.62], [cx - W * 0.98, cy - H * 0.2]], cab.sombra, { seed: 123, tremor: 0.14 });
  t.mancha([[cx + 3, topo - alto - 0.6], [cx + W * 0.7, topo - alto + 0.8], [cx + W + 1.8 + vol, cy - H * 0.55], [cx + W * 0.8, cy - H * 0.58], [cx + W * 0.3, topo - alto + 3]], cab.luz, { seed: 124, tremor: 0.14 });
  // franja e mechas soltas conforme o estilo
  const mecha = (x: number, y0: number, x1: number, y1: number, w: number, cor: string) => t.mancha([[x - w, y0], [x + w, y0], [x1 + w * 0.3, y1], [x1 - w * 0.3, y1]], cor, { seed: Math.round(x * 9), tremor: 0.1 });
  const hy = cy - H * 0.7;
  if (e === 1 || e === 5 || e === 9 || e === 6 || e === 2 || e === 3) { // franja reta ou repartida
    const partida = e === 5 || e === 6;
    for (let i = 0; i < 6; i++) { const x = cx - W * 0.8 + i * (W * 1.6 / 5); const alt = cy - H * (e === 1 ? 0.42 : 0.5) + Math.abs(i - 2.5) * 0.7; mecha(x, hy, x + (partida ? (i < 3 ? -2.6 : 2.6) : (i - 2.5) * 0.5), alt, 2.9, i % 2 ? cab.base : cab.sombra); }
    t.tinta([[cx - W * 0.8, cy - H * 0.46], [cx, cy - H * 0.44], [cx + W * 0.8, cy - H * 0.47]], 0.7, PAL.tinta[1], 0.7);
  } else if (e === 0 || e === 7) { // bagunçado: pontas irregulares
    for (let i = 0; i < 6; i++) { const x = cx - W * 0.75 + i * (W * 1.5 / 5); mecha(x, hy, x + (i % 2 ? 2 : -2.6), cy - H * (0.46 + (i % 3) * 0.08), 2.6, i % 2 ? cab.luz : cab.base); }
  } else if (e === 11) { // chanfro: repartido de lado
    for (let i = 0; i < 4; i++) { const x = cx - W * 0.2 + i * 4.4; mecha(x, hy, x + 3.4, cy - H * 0.52, 2.8, cab.base); }
  }
  // mechas de luz (amarelas no cabelo escuro, brancas no grisalho) e de sombra
  const brilho = stage >= 3 ? PAL.cabeloBranco[4] : cab.brilho;
  const quente = c.corr < 30 && stage < 3 ? [PAL.luz[1], PAL.luz[2], brilho][(hashStr(c.semente) >> 3) % 3] : brilho;
  for (let i = 0; i < 7; i++) { const a2 = -0.3 - i * 0.22; const x0 = cx + 2 + Math.cos(a2) * (W + 0.4), y0 = cy - H * 0.3 + Math.sin(a2) * (H + 1); fio(x0, y0, x0 + (i % 2 ? -3 : 1.6), y0 + 4.6 + (i % 3), i % 3 === 0 ? quente : cab.brilho, 0.85); }
  for (let i = 0; i < 6; i++) fio(cx - W * 0.9 + i * 3.6, topo - alto + 1.2, cx - W * 0.9 + 0.8 + i * 3.6, hy + 0.6, cab.escuro, 0.7, 0.75);
  // tinta irregular só nas bordas externas
  t.tinta([[cx - W - 1.2, cy - H * 0.05], [cx - W - 1.8 - vol, cy - H * 0.55], [cx - W * 0.62, topo - alto + 0.6], [cx + 1.5, topo - alto - 1]], 1.05, PAL.tinta[0], 0.92);
  t.tinta([[cx + 1.5, topo - alto - 1], [cx + W * 0.7, topo - alto + 0.8], [cx + W + 1.8 + vol, cy - H * 0.55]], 0.7, PAL.tinta[1], 0.55);
  t.tinta([[cx - W * 0.98, cy - H * 0.2], [cx - W * 0.92, cy - H * 0.52], [cx - W * 0.5, cy - H * linha]], 0.7, PAL.tinta[1], 0.7);
  // volumes extras
  if (e === 4 || e === 5) { const by = e === 4 ? topo - alto - 6.4 : cy + 2; const bx = e === 4 ? cx + 1 : cx + W + 5; t.elipse(bx, by, 5.4, 5, cab.base); t.elipse(bx + 1.4, by - 1, 3, 2.4, cab.luz); t.tinta([[bx - 5.2, by + 1], [bx - 3, by + 4.2], [bx + 2, by + 4.8]], 0.9, PAL.tinta[0], 0.9); if (e === 4) t.tinta([[cx - 3, topo - alto - 1], [cx + 5, topo - alto - 1]], 0.9, PAL.tinta[0], 0.8); }
  if (e === 7) { t.mancha([[cx - 4, topo - alto], [cx + 6, topo - alto - 7], [cx + W - 2, topo - alto + 1]], cab.luz, { seed: 125, tremor: 0.3 }); t.tinta([[cx - 4, topo - alto], [cx + 6, topo - alto - 7], [cx + W - 2, topo - alto + 1]], 0.9, PAL.tinta[0], 0.85); }
  if (e === 0) for (let i = 0; i < 4; i++) t.mancha([[cx - 8 + i * 6, topo - alto + 1], [cx - 7 + i * 6, topo - alto - 4], [cx - 4 + i * 6, topo - alto + 1]], i % 2 ? cab.luz : cab.base, { seed: 126 + i, tremor: 0.12 });
  void luzCor;
}

function acessorios(t: Tela, c: ContextoRosto, ap: Aparencia, fig: Figurino, cx: number, cy: number, W: number, H: number, ey: number, cab: { base: string }) {
  const topo = cy - H;
  const ac = new Set([...ap.acess, ...(fig.chapeu ? [fig.chapeu] : []), ...(fig.extra ?? [])]);
  if (ac.has('faixa')) { t.mancha([[cx - W - 3, topo + 4], [cx + W + 3, topo + 3], [cx + W + 3, topo + 7], [cx - W - 3, topo + 8]], PAL[fig.borda][2], { seed: 130, tremor: 0.15 }); t.tinta([[cx - W - 3, topo + 8], [cx + W + 3, topo + 7]], 0.7, PAL.tinta[0], 0.8); t.elipse(cx, topo + 5.4, 1.5, 1.5, PAL.jade[3]); }
  if (ac.has('grampo_jade') && (ap.cabelo === 4 || ap.cabelo === 5)) { const by = ap.cabelo === 4 ? topo - 11 : cy + 2, bx = ap.cabelo === 4 ? cx + 1 : cx + W + 5; t.traco(bx - 8, by + 0.4, bx + 8, by - 0.6, 1.5, PAL.jade[3]); t.tinta([[bx - 8, by + 1.2], [bx + 8, by + 0.2]], 0.6, PAL.tinta[0], 0.8); t.elipse(bx + 8, by - 0.6, 1.6, 1.6, PAL.jade[4]); }
  if (ac.has('guan')) { t.mancha([[cx - 5, topo - 5], [cx + 5, topo - 5], [cx + 4, topo - 12], [cx - 4, topo - 12]], PAL.ouro[2], { seed: 131, tremor: 0.15 }); t.tinta([[cx - 5, topo - 5], [cx - 4, topo - 12], [cx + 4, topo - 12], [cx + 5, topo - 5]], 0.8, PAL.tinta[0], 0.9); t.traco(cx - 9, topo - 8, cx + 9, topo - 8.4, 1, PAL.ouro[3]); }
  if (ac.has('coroa')) { t.mancha([[cx - 9, topo - 2], [cx - 6, topo - 11], [cx - 2, topo - 5], [cx + 2, topo - 12], [cx + 6, topo - 5], [cx + 9, topo - 10], [cx + 10, topo - 2]], PAL.ouro[3], { seed: 132, tremor: 0.1 }); t.tinta([[cx - 9, topo - 2], [cx - 6, topo - 11], [cx - 2, topo - 5], [cx + 2, topo - 12], [cx + 6, topo - 5], [cx + 9, topo - 10]], 0.7, PAL.tinta[0], 0.9); t.elipse(cx + 2, topo - 8, 1.1, 1.1, PAL.vermelho[3]); }
  if (ac.has('turbante')) { t.mancha([[cx - W - 3, topo + 6], [cx - W, topo - 8], [cx, topo - 13], [cx + W, topo - 8], [cx + W + 3, topo + 6], [cx, topo + 2]], PAL[fig.pano][3], { seed: 133, tremor: 0.3 }); for (let i = 0; i < 4; i++) t.tinta([[cx - W + 1, topo + 2 - i * 3.4], [cx + W - 1, topo - 2 - i * 3.6]], 0.7, PAL[fig.pano][1], 0.8); t.elipse(cx, topo - 4, 1.6, 1.6, PAL.ouro[3]); }
  if (ac.has('chapeu_palha')) { t.mancha([[cx - W * 2.3, topo + 2], [cx - W * 0.9, topo - 10], [cx, topo - 14], [cx + W * 0.9, topo - 10], [cx + W * 2.3, topo + 2], [cx + W, topo + 5], [cx - W, topo + 5]], PAL.ocre[3], { seed: 134, tremor: 0.2 }); t.mancha([[cx, topo - 14], [cx + W * 0.9, topo - 10], [cx + W * 2.3, topo + 2], [cx + W, topo + 5], [cx, topo + 5]], PAL.ocre[4], { seed: 135, tremor: 0.2, alpha: 0.8 }); for (let i = 0; i < 6; i++) t.tinta([[cx - W * 2 + i * W * 0.8, topo + 2], [cx - W * 0.2 + i * 1, topo - 12 + i * 0.4]], 0.4, PAL.ocre[1], 0.7); t.tinta([[cx - W * 2.3, topo + 2], [cx - W * 0.9, topo - 10], [cx, topo - 14]], 0.9, PAL.tinta[0], 0.8); }
  if (ac.has('veu')) t.mancha([[cx - W + 1, ey + 4], [cx + W - 1, ey + 4], [cx + W * 0.6, cy + H + 4], [cx, cy + H + 6], [cx - W * 0.6, cy + H + 4]], PAL.branco[1], { seed: 136, tremor: 0.2, alpha: 0.92 });
  if (ac.has('mascara')) { t.mancha([[cx - W + 1, ey + 3.2], [cx + W - 1, ey + 3.2], [cx + W * 0.7, cy + H * 0.78], [cx, cy + H + 1], [cx - W * 0.7, cy + H * 0.78]], PAL.cinza[1], { seed: 137, tremor: 0.2 }); t.tinta([[cx - W + 1, ey + 3.4], [cx + W - 1, ey + 3.4]], 0.9, PAL.tinta[0], 0.95); t.traco(cx - 4, cy + H * 0.6, cx + 4, cy + H * 0.6, 0.6, PAL.cinza[4]); }
  if (ac.has('contas')) for (let i = 0; i < 10; i++) { const a = 0.4 + i * 0.26; t.elipse(cx + Math.cos(a + 2.2) * 11, 84 + Math.sin(a + 2.2) * 6, 1.4, 1.4, PAL.marrom[2]); }
  void cab;
}

function gola(t: Tela, fig: Figurino, c: ContextoRosto, pano: string[], forro: string[], borda: string[], luzCor: string, cx: number, cy: number, H: number) {
  const topo = cy + H + 4;
  const bd = borda[Math.min(3, borda.length - 1)];
  switch (fig.gola) {
    case 'cruzada': {
      t.mancha([[cx - 9, topo], [cx + 9, topo], [cx + 2, 100], [cx - 8, 100]], forro[Math.min(2, forro.length - 1)], { seed: 141, tremor: 0.2 });
      t.mancha([[cx - 12, 76], [cx - 8, topo - 2], [cx + 2, 100], [cx - 16, 100]], pano[2], { seed: 142, tremor: 0.2 }); // lapela esquerda por cima
      t.mancha([[cx + 11, 76], [cx + 6, topo - 2], [cx - 6, 100], [cx + 14, 100]], pano[3], { seed: 143, tremor: 0.2 });
      t.tinta([[cx - 12, 76], [cx - 8, topo - 2], [cx + 2, 100]], 2.0, bd, 0.95); t.tinta([[cx + 11, 76], [cx + 6, topo - 2], [cx - 6, 100]], 1.8, bd, 0.95);
      t.tinta([[cx - 13.4, 76], [cx - 9, topo - 2], [cx + 1, 100]], 0.7, PAL.tinta[0], 0.85); t.tinta([[cx + 12.4, 76], [cx + 7, topo - 2], [cx - 5, 100]], 0.6, PAL.tinta[0], 0.8);
      t.tinta([[cx + 11.6, 76], [cx + 16, 79]], 0.6, luzCor, 0.8); break;
    }
    case 'redonda': {
      t.mancha([[cx - 12, 76], [cx - 6, topo], [cx, topo + 3], [cx + 6, topo], [cx + 12, 76]], pano[1], { seed: 144, tremor: 0.2 });
      t.mancha([[cx - 8, topo + 1], [cx, topo + 4], [cx + 8, topo + 1], [cx + 8, topo + 5], [cx, topo + 9], [cx - 8, topo + 5]], pano[3], { seed: 145, tremor: 0.2 });
      t.tinta([[cx - 8, topo + 1], [cx, topo + 4.4], [cx + 8, topo + 1]], 1.4, bd, 0.95); t.tinta([[cx - 9, topo + 4], [cx, topo + 9.4], [cx + 9, topo + 4]], 0.6, PAL.tinta[0], 0.7); break;
    }
    case 'alta': {
      t.mancha([[cx - 9, topo - 5], [cx + 9, topo - 5], [cx + 10, topo + 6], [cx - 10, topo + 6]], pano[2], { seed: 146, tremor: 0.15 });
      t.mancha([[cx + 1, topo - 5], [cx + 9, topo - 5], [cx + 10, topo + 6], [cx + 1, topo + 6]], pano[3], { seed: 147, tremor: 0.15 });
      t.tinta([[cx - 9, topo - 5], [cx - 10, topo + 6]], 0.8, PAL.tinta[0], 0.9); t.tinta([[cx - 9, topo - 5], [cx + 9, topo - 5]], 1.3, bd, 0.95);
      t.traco(cx, topo - 4, cx, 100, 0.7, PAL.tinta[0], 0.8); for (let i = 0; i < 3; i++) t.elipse(cx, topo + 3 + i * 6, 0.9, 0.9, bd);
      t.mancha([[cx - 14, 78], [cx - 9, topo + 6], [cx - 9, 100], [cx - 24, 100]], pano[1], { seed: 148, tremor: 0.3, alpha: 0.8 }); break;
    }
    case 'capuz': {
      t.mancha([[cx - 26, 90], [cx - 22, 52], [cx - 10, 30], [cx + 2, 26], [cx + 14, 30], [cx + 26, 52], [cx + 30, 90]], pano[1], { seed: 149, tremor: 0.5 });
      t.mancha([[cx - 26, 90], [cx - 22, 52], [cx - 10, 30], [cx - 14, 60], [cx - 18, 90]], pano[0], { seed: 150, tremor: 0.4 });
      t.mancha([[cx - 12, 76], [cx - 5, topo + 2], [cx, topo + 6], [cx + 5, topo + 2], [cx + 14, 76], [cx + 22, 100], [cx - 22, 100]], pano[2], { seed: 151, tremor: 0.3 });
      t.tinta([[cx - 22, 52], [cx - 10, 30], [cx + 2, 26], [cx + 14, 30], [cx + 26, 52]], 1.2, PAL.tinta[0], 0.9); t.tinta([[cx + 14, 30], [cx + 26, 52]], 0.8, luzCor, 0.7); break;
    }
    case 'ombro': {
      t.mancha([[cx - 13, 76], [cx - 8, topo + 2], [cx + 8, topo + 2], [cx + 14, 76], [cx + 20, 100], [cx - 20, 100]], PAL.peleEscura[1] === pano[0] ? pano[1] : (c.ap.tez >= 2 ? PAL.peleEscura[1] : PAL.pele[2]), { seed: 152, tremor: 0.3 });
      t.mancha([[cx + 14, 76], [cx + 22, 82], [cx + 24, 100], [cx + 14, 100]], pano[2], { seed: 153, tremor: 0.3 }); // tira de pano
      t.tinta([[cx - 10, topo + 4], [cx, topo + 8], [cx + 10, topo + 4]], 0.7, PAL.tinta[1], 0.7); t.tinta([[cx + 12, 76], [cx + 22, 82]], 1.5, bd, 0.95); break;
    }
    case 'armadura': {
      for (const s of [-1, 1]) { t.mancha([[cx + s * 10, 76], [cx + s * 32, 80], [cx + s * 38, 96], [cx + s * 14, 92]], PAL.cinza[s < 0 ? 2 : 3], { seed: 154 + s, tremor: 0.3 }); t.tinta([[cx + s * 10, 76], [cx + s * 32, 80], [cx + s * 38, 96]], 1, PAL.tinta[0], 0.9); for (let i = 0; i < 3; i++) t.elipse(cx + s * (16 + i * 7), 83 + i * 3, 0.8, 0.8, PAL.cinza[4]); }
      t.mancha([[cx - 9, topo - 3], [cx + 9, topo - 3], [cx + 8, topo + 6], [cx - 8, topo + 6]], pano[2], { seed: 157, tremor: 0.2 }); t.tinta([[cx - 9, topo - 3], [cx + 9, topo - 3]], 1.2, bd, 0.95); break;
    }
    case 'pele': {
      t.mancha([[cx - 20, 82], [cx - 10, topo - 2], [cx, topo + 2], [cx + 10, topo - 2], [cx + 22, 82], [cx + 28, 100], [cx - 26, 100]], PAL.marrom[3], { seed: 158, tremor: 1 });
      for (let i = 0; i < 12; i++) t.traco(cx - 18 + i * 3.4, topo + 4 + (i % 3) * 3, cx - 17 + i * 3.4, topo + 10 + (i % 3) * 3, 0.7, i % 2 ? PAL.marrom[2] : PAL.marrom[4], 0.9);
      t.tinta([[cx - 20, 82], [cx - 10, topo - 2], [cx, topo + 2]], 0.9, PAL.tinta[0], 0.85); break;
    }
    default: { // camadas
      t.mancha([[cx - 10, topo - 2], [cx + 10, topo - 2], [cx + 8, 100], [cx - 8, 100]], forro[2] ?? forro[1], { seed: 159, tremor: 0.2 });
      t.mancha([[cx - 13, 76], [cx - 8, topo], [cx + 2, 100], [cx - 17, 100]], pano[2], { seed: 160, tremor: 0.2 });
      t.mancha([[cx + 12, 76], [cx + 8, topo], [cx - 2, 100], [cx + 16, 100]], pano[3], { seed: 161, tremor: 0.2 });
      t.tinta([[cx - 13, 76], [cx - 8, topo], [cx + 2, 100]], 1.8, bd, 0.95); t.tinta([[cx + 12, 76], [cx + 8, topo], [cx - 2, 100]], 1.8, bd, 0.95);
      t.tinta([[cx - 9, topo + 5], [cx + 1, 98]], 1.2, borda[2], 0.9); t.tinta([[cx + 9, topo + 5], [cx - 1, 98]], 1.2, borda[2], 0.9);
      if (fig.sinal) t.elipse(cx, 92, 2, 2, PAL.ouro[3]); break;
    }
  }
}

export function rostoUrl(c: ContextoRosto): string {
  const k = `ro|${c.semente}|${JSON.stringify(c.ap)}|${c.stage}|${c.estatuto}|${c.trilha}|${c.tier >= 3 ? c.tier : 0}|${c.corr >= 30 ? 1 : 0}|${c.fundo}|${c.expr ?? ''}|${c.feridas ?? 0}`;
  return cache(k, () => pintarRosto(c));
}
export { estatutoDe, fundoDe };
