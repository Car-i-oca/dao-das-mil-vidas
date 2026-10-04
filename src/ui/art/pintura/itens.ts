import { PAL } from './paleta';
import { Tela, rng, pixelizar, cache, hashStr } from './base';

/** Ícones de item 48x48, pintados em alta resolução e reduzidos: manchas de cor, luz de recorte amarela, contorno de tinta só nas bordas de sombra. */
export const TAM_ITEM = 48;
type Pt = [number, number];

function novo(): Tela { return new Tela(100, 100, 600); }
function sombra(t: Tela, cx: number, cy: number, rx: number, ry = 3.2) { t.elipse(cx, cy, rx, ry, PAL.folha[0], { alpha: 0.45, borrao: 1.6 }); }

/** Objeto: mancha com gradiente (luz em cima à direita), brilho de recorte e contorno de tinta irregular. */
function objeto(t: Tela, pts: Pt[], tons: string[], o: { tinta?: boolean; luz?: boolean; seed?: number; tremor?: number } = {}) {
  const [claro, base, escuro] = [tons[tons.length - 2], tons[Math.floor(tons.length / 2)], tons[1]];
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  t.mancha(pts, t.grad(x1, y0, x0, y1, [[0, claro], [0.45, base], [1, escuro]]), { seed: o.seed ?? 3, tremor: o.tremor ?? 0.25 });
  if (o.tinta !== false) {
    const fecha = [...pts, pts[0]];
    t.tinta(fecha, 1.2, PAL.tinta[0], 0.92);
  }
  if (o.luz) t.tinta(pts.slice(0, Math.ceil(pts.length / 2)).filter((p) => p[0] > (x0 + x1) / 2 && p[1] < (y0 + y1) / 2), 1.2, PAL.luz[2], 0.9);
}

export function espada(): Tela {
  const t = novo();
  sombra(t, 50, 92, 30);
  // cabo e pomo
  objeto(t, [[26, 78], [32, 72], [38, 78], [30, 90], [22, 90]], PAL.marrom, { seed: 1 });
  for (let i = 0; i < 3; i++) t.tinta([[24 + i * 2.4, 84 - i * 3.4], [32 + i * 2.4, 78 - i * 3.4]], 1, PAL.marrom[0], 0.8);
  t.elipse(20, 90, 5, 5, t.grad(14, 84, 26, 96, [[0, PAL.jade[3]], [1, PAL.jade[1]]])); t.tinta([[15, 87], [20, 95], [25, 90]], 1.1, PAL.tinta[0], 0.9);
  // lâmina
  objeto(t, [[36, 70], [82, 14], [90, 10], [88, 20], [44, 80]], PAL.cinza, { seed: 2, luz: true });
  t.tinta([[40, 70], [84, 16]], 0.9, PAL.cinza[1], 0.8);
  t.tinta([[46, 66], [76, 28]], 0.9, PAL.cinza[4], 0.9);
  // guarda
  objeto(t, [[22, 62], [30, 58], [50, 78], [44, 84], [38, 78]], PAL.ouro, { seed: 4, luz: true });
  t.elipse(34, 70, 2.6, 2.6, PAL.vermelho[3]); t.tinta([[32, 68], [36, 72]], 0.8, PAL.tinta[0], 0.8);
  return t;
}
export function pilula(): Tela {
  const t = novo();
  t.elipse(50, 56, 38, 36, PAL.fogo[3], { alpha: 0.22, borrao: 9 });
  objeto(t, [[18, 82], [30, 76], [70, 76], [82, 82], [74, 92], [26, 92]], PAL.marrom, { seed: 5 });
  t.elipse(54, 80, 18, 3.2, PAL.marrom[0], { alpha: 0.6, borrao: 0.8 });
  t.elipse(50, 52, 25, 25, t.radial(60, 38, 40, [[0, PAL.vermelho[4]], [0.35, PAL.vermelho[3]], [0.7, PAL.vermelho[2]], [1, PAL.vermelho[1]]]));
  t.tinta([[28, 62], [36, 74], [50, 78], [66, 72], [74, 60]], 1.3, PAL.tinta[0], 0.9);
  t.tinta([[44, 28], [56, 25], [68, 32], [74, 42]], 1.2, PAL.luz[2], 0.9);
  for (let a = 0.3; a < 5.4; a += 0.18) { const rr = 3 + a * 3.3; t.elipse(50 + Math.cos(a) * rr * 0.9, 52 + Math.sin(a) * rr * 0.9, 1.5, 1.5, a > 3 ? PAL.ouro[2] : PAL.ouro[3]); }
  t.elipse(61, 40, 4.5, 3, PAL.vermelho[4], { alpha: 0.9, borrao: 0.8 });
  for (let i = 0; i < 6; i++) t.traco(46 + Math.sin(i) * 3, 22 - i * 3.4, 48 + Math.sin(i + 1) * 3, 19 - i * 3.4, 2.2 - i * 0.25, PAL.cinza[4], 0.55 - i * 0.06);
  return t;
}
export function manual(): Tela {
  const t = novo();
  sombra(t, 50, 93, 30);
  objeto(t, [[78, 22], [84, 20], [84, 86], [78, 88]], PAL.branco, { seed: 7 });
  for (let y = 26; y < 84; y += 4) t.tinta([[79, y], [83, y - 0.6]], 0.6, PAL.ocre[2], 0.7);
  objeto(t, [[16, 14], [78, 12], [80, 88], [14, 90]], PAL.azul, { seed: 6, luz: true });
  objeto(t, [[16, 14], [26, 14], [26, 89], [14, 90]], [PAL.azul[0], PAL.azul[0], PAL.azul[1]], { seed: 8, tinta: false });
  for (let y = 22; y < 86; y += 11) t.elipse(21, y, 1.4, 1.4, PAL.ouro[3]);
  for (const [x, y] of [[16, 16], [76, 14], [78, 86], [16, 88]] as Pt[]) t.elipse(x, y, 4, 4, PAL.ouro[3]);
  t.tinta([[36, 24], [68, 23]], 2, PAL.ouro[2], 0.95); t.tinta([[40, 31], [64, 30]], 1.6, PAL.ouro[1], 0.9); t.tinta([[40, 76], [64, 76]], 1.6, PAL.ouro[1], 0.9);
  t.elipse(52, 52, 12, 12, t.radial(56, 46, 16, [[0, PAL.vermelho[3]], [1, PAL.vermelho[1]]])); t.tinta([[40, 54], [48, 63], [60, 62], [64, 52]], 1, PAL.tinta[0], 0.8);
  t.tinta([[46, 52], [58, 52]], 1.3, PAL.ouro[3], 0.95); t.tinta([[52, 44], [52, 60]], 1.3, PAL.ouro[3], 0.95); t.elipse(46, 45, 1.2, 1.2, PAL.ouro[3]); t.elipse(58, 58, 1.2, 1.2, PAL.ouro[3]);
  return t;
}
export function talisma(): Tela {
  const t = novo();
  t.traco(50, 2, 50, 12, 2.4, PAL.roxo[2]); t.elipse(50, 12, 4, 4, PAL.ouro[3]);
  const folha: Pt[] = [[30, 14], [70, 14], [70, 80], [64, 92], [58, 82], [50, 94], [42, 82], [36, 92], [30, 80]];
  objeto(t, folha, [PAL.ocre[1], PAL.ocre[2], PAL.ocre[4], PAL.branco[1]], { seed: 9, luz: true });
  for (let i = 0; i < 40; i++) t.elipse(32 + (i * 53) % 36, 18 + (i * 37) % 62, 0.8, 0.8, PAL.ocre[2], { alpha: 0.5 });
  t.tinta([[34, 22], [66, 22]], 2, PAL.vermelho[2], 0.95); t.tinta([[34, 74], [66, 74]], 2, PAL.vermelho[2], 0.95);
  const g = PAL.vermelho[2];
  t.tinta([[40, 30], [60, 30], [60, 40], [40, 40], [40, 30]], 2.2, g, 0.95);
  t.tinta([[50, 40], [50, 66]], 2.4, g, 0.95); t.tinta([[38, 52], [62, 52]], 2.2, g, 0.95); t.tinta([[42, 62], [58, 62]], 2, g, 0.95);
  t.tinta([[38, 66], [42, 72]], 1.8, PAL.vermelho[1], 0.95); t.tinta([[62, 66], [58, 72]], 1.8, PAL.vermelho[1], 0.95);
  for (const [x, y] of [[20, 40], [82, 30], [80, 62], [18, 72]] as Pt[]) { t.elipse(x, y, 2, 2, PAL.ouro[3]); t.elipse(x + 1.2, y - 1, 1, 1, PAL.ouro[4]); }
  return t;
}
export function jade(): Tela {
  const t = novo();
  t.traco(50, 0, 50, 18, 2.4, PAL.vermelho[2]); t.elipse(50, 19, 4.4, 4.4, t.grad(46, 14, 54, 24, [[0, PAL.ouro[4]], [1, PAL.ouro[1]]])); t.tinta([[46, 21], [50, 24], [54, 21]], 1, PAL.tinta[0], 0.9);
  t.elipse(50, 58, 38, 38, t.grad(80, 20, 20, 96, [[0, PAL.jade[4]], [0.3, PAL.jade[3]], [0.65, PAL.jade[2]], [1, PAL.jade[1]]]));
  t.elipse(50, 58, 13, 13, PAL.folha[0], { alpha: 0.0 });
  const g = t.g; g.save(); g.globalCompositeOperation = 'destination-out'; g.beginPath(); g.ellipse(50 * t.k, 58 * t.k, 13 * t.k, 13 * t.k, 0, 0, 6.2832); g.fill(); g.restore();
  for (let a = 0; a < 6.28; a += 0.05) { t.elipse(50 + Math.cos(a) * 38, 58 + Math.sin(a) * 38, 0.9, 0.9, a > 3.9 && a < 5.9 ? PAL.tinta[0] : PAL.tinta[1], { alpha: 0.9 }); t.elipse(50 + Math.cos(a) * 13, 58 + Math.sin(a) * 13, 0.9, 0.9, PAL.tinta[0], { alpha: 0.9 }); }
  for (let a = 0.2; a < 6.28; a += 0.8) t.tinta([[50 + Math.cos(a) * 27, 58 + Math.sin(a) * 27], [50 + Math.cos(a + 0.3) * 30, 58 + Math.sin(a + 0.3) * 30]], 1.2, PAL.jade[1], 0.8);
  t.tinta([[28, 36], [36, 28], [46, 24]], 1.8, PAL.jade[4], 0.95); t.elipse(30, 40, 2, 1.4, PAL.branco[2], { alpha: 0.9 });
  t.tinta([[72, 38], [78, 46]], 1.2, PAL.luz[2], 0.9);
  return t;
}
export function bolsa(): Tela {
  const t = novo();
  sombra(t, 46, 94, 32);
  for (const [x, y, rr] of [[72, 84, 6.5], [86, 90, 5.5], [60, 92, 5.5]] as [number, number, number][]) { t.elipse(x, y, rr, rr * 0.74, t.grad(x + rr, y - rr, x - rr, y + rr, [[0, PAL.ouro[4]], [0.5, PAL.ouro[3]], [1, PAL.ouro[1]]])); t.tinta([[x - rr, y + 1], [x, y + rr * 0.8], [x + rr, y + 1]], 1.1, PAL.tinta[0], 0.9); t.elipse(x, y, 2, 1.4, PAL.ouro[1], { alpha: 0.8 }); }
  t.elipse(12, 86, 6, 5, t.grad(18, 80, 8, 92, [[0, PAL.cinza[4]], [1, PAL.cinza[2]]])); t.tinta([[6, 88], [12, 92], [18, 88]], 1.1, PAL.tinta[0], 0.9);
  objeto(t, [[34, 28], [64, 28], [72, 44], [84, 66], [76, 86], [50, 92], [24, 86], [16, 66], [28, 44]], PAL.marrom, { seed: 11, luz: true, tremor: 0.6 });
  objeto(t, [[38, 14], [60, 14], [64, 28], [34, 28]], PAL.marrom, { seed: 12, tinta: true });
  t.tinta([[26, 52], [30, 74], [28, 84]], 1.1, PAL.marrom[0], 0.7); t.tinta([[68, 52], [66, 74], [64, 86]], 1, PAL.marrom[1], 0.7);
  objeto(t, [[32, 28], [66, 28], [67, 34], [31, 34]], PAL.vermelho, { seed: 13, luz: true });
  t.tinta([[48, 34], [38, 46], [32, 54]], 2.6, PAL.vermelho[2], 0.95); t.tinta([[52, 34], [62, 45], [68, 52]], 2.6, PAL.vermelho[2], 0.95);
  objeto(t, [[50, 52], [60, 64], [50, 76], [40, 64]], PAL.ouro, { seed: 14, luz: true });
  t.elipse(50, 64, 2, 2, PAL.vermelho[2]);
  return t;
}
export const ITENS: Record<string, () => Tela> = { espada, pilula, manual, talisma, jade, bolsa };
export function itemUrl(id: string): string | null {
  const f = ITENS[id];
  return f ? cache('ip|' + id, () => pixelizar(f(), TAM_ITEM, TAM_ITEM, { alfa: true, limpar: 2 })) : null;
}
void rng; void hashStr;
