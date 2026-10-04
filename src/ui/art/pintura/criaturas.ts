import { PAL } from './paleta';
import { Tela, pixelizar, cache, rng, fbm } from './base';

/**
 * Oponentes que não são gente: lobo, tigre, serpente, golem, dragão, espectro e o raio da tribulação. Pintados no mesmo estilo dos
 * retratos (manchas, luz de recorte, tinta só nas bordas de sombra), em 80x56, com 5 poses que cobrem os 11 quadros de animação.
 */
export const LARG_C = 80;
export const ALT_C = 56;
type Pt = [number, number];
type Pose = 'parado0' | 'parado1' | 'ataque' | 'dano' | 'derrota';
export const CRIATURAS = ['lobo', 'tigre', 'serpente', 'golem', 'dragao', 'espectro', 'raio'] as const;

const tela = () => new Tela(LARG_C, ALT_C, LARG_C * 10);
const sombraChao = (t: Tela, cx: number, rx: number) => t.elipse(cx, ALT_C - 2, rx, 2, PAL.folha[0], { alpha: 0.4, borrao: 1 });
const pele = (t: Tela, pts: Pt[], tons: string[], seed = 1) => {
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  t.mancha(pts, t.grad(Math.max(...xs), Math.min(...ys), Math.min(...xs), Math.max(...ys), [[0, tons[3] ?? tons[2]], [0.5, tons[2]], [1, tons[1]]]), { seed, tremor: 0.15 });
};
const borda = (t: Tela, pts: Pt[], larg = 0.9) => t.tinta([...pts], larg, PAL.tinta[0], 0.9);

function quadrupede(id: 'lobo' | 'tigre', pose: Pose): Tela {
  const t = tela();
  const lobo = id === 'lobo';
  const tons = lobo ? PAL.cinza : PAL.fogo, claro = lobo ? PAL.cinza[4] : PAL.ocre[4], escuro = lobo ? PAL.cinza[1] : PAL.fogo[1];
  const base = lobo ? [PAL.cinza[1], PAL.cinza[2], PAL.cinza[3], PAL.cinza[4]] : [PAL.fogo[1], PAL.fogo[2], PAL.fogo[3], PAL.ocre[3]];
  void tons;
  if (pose === 'derrota') {
    sombraChao(t, 40, 28);
    pele(t, [[12, 46], [20, 36], [44, 34], [62, 40], [66, 48], [44, 52], [18, 52]], base, 2);
    pele(t, [[56, 40], [70, 40], [72, 48], [60, 50]], base, 3);
    t.tinta([[62, 44], [66, 44.4]], 0.7, PAL.tinta[0], 1);
    borda(t, [[12, 46], [20, 36], [44, 34], [62, 40]]);
    return t;
  }
  const o = pose === 'ataque' ? { dx: 8, dy: -4, rot: -0.12, boca: 2 } : pose === 'dano' ? { dx: -6, dy: 0, rot: 0.1, boca: 0 } : pose === 'parado1' ? { dx: 0, dy: -1, rot: 0, boca: 0 } : { dx: 0, dy: 0, rot: 0, boca: 0 };
  sombraChao(t, 36 + o.dx, 24);
  t.g.save(); t.g.translate((36 + o.dx) * t.k, (36 + o.dy) * t.k); t.g.rotate(o.rot); t.g.translate(-36 * t.k, -36 * t.k);
  // rabo
  t.mancha([[14, 30], [4, 24], [2, 16], [8, 20], [16, 28]], base[1], { seed: 4, tremor: 0.1 });
  // pernas traseiras e dianteiras (duas de cada, uma mais escura)
  for (const [x, s] of [[20, 1], [26, 0], [48, 0], [54, 1]] as [number, number][]) { pele(t, [[x, 40], [x + 6, 40], [x + 5.4, 52], [x - 0.4, 52]], s ? [base[0], base[0], base[1], base[1]] : base, 5); t.tinta([[x - 0.4, 52], [x + 5.4, 52]], 0.8, PAL.tinta[0], 0.9); }
  // corpo
  pele(t, [[14, 34], [20, 26], [36, 24], [50, 26], [60, 32], [58, 42], [44, 46], [24, 46], [16, 42]], base, 6);
  t.mancha([[16, 40], [30, 44], [48, 44], [58, 40], [56, 44], [44, 48], [24, 48]], base[0], { seed: 7, tremor: 0.1, alpha: 0.7 });
  // pelo: tufos de luz no dorso
  for (let i = 0; i < 14; i++) t.traco(18 + i * 3, 26 + Math.sin(i) * 0.8, 17 + i * 3, 30, 0.7, i % 3 === 0 ? PAL.luz[1] : base[3], 0.9);
  if (!lobo) for (let i = 0; i < 6; i++) t.mancha([[20 + i * 6, 26], [22 + i * 6, 26], [24 + i * 6, 40], [21 + i * 6, 40]], PAL.tinta[1], { seed: 8 + i, tremor: 0.2, alpha: 0.9 });
  // cabeça
  pele(t, [[54, 22], [62, 18], [72, 24], [76, 30], [70, 36], [58, 36], [52, 30]], base, 9);
  t.mancha([[70, 28], [78, 30], [76, 34], [68, 34]], claro, { seed: 10, tremor: 0.1 });
  t.mancha([[56, 20], [58, 12], [62, 18]], base[1], { seed: 11, tremor: 0.05 }); t.mancha([[62, 18], [66, 11], [68, 20]], base[2], { seed: 12, tremor: 0.05 });
  t.tinta([[56, 20], [58, 12], [62, 18]], 0.7, PAL.tinta[0], 0.9);
  if (o.boca >= 2) { t.mancha([[66, 31], [77, 31], [75, 38], [66, 36]], PAL.vermelho[1], { seed: 13, tremor: 0.05 }); for (const x of [68, 72, 75]) t.mancha([[x, 31], [x + 1.2, 31], [x + 0.6, 34]], PAL.branco[2], { seed: 14, tremor: 0.02 }); }
  else t.tinta([[64, 34], [75, 33]], 0.7, PAL.tinta[0], 0.9);
  t.tinta([[75, 29], [77, 29.6]], 1.2, PAL.tinta[0], 1);
  if (pose === 'dano') t.tinta([[62, 26], [66, 26.6]], 0.7, PAL.tinta[0], 1); else { t.elipse(64, 26, 1.7, 1.2, lobo ? PAL.ouro[3] : PAL.luz[2]); t.elipse(64.4, 26, 0.6, 0.8, PAL.tinta[0]); }
  t.tinta([[60, 22], [64, 21.4], [68, 23]], 0.8, PAL.tinta[0], 0.85);
  borda(t, [[14, 34], [20, 26], [36, 24], [50, 26], [60, 32]], 1);
  t.tinta([[54, 22], [62, 18], [72, 24], [76, 30]], 0.7, escuro, 0.9);
  t.g.restore();
  return t;
}

function serpente(pose: Pose): Tela {
  const t = tela();
  sombraChao(t, 36, 26);
  if (pose === 'derrota') { for (let i = 0; i < 12; i++) { const x = 8 + i * 5.4, y = 48 + Math.sin(i * 0.9) * 2; t.elipse(x, y, 4.4, 3.4, i % 2 ? PAL.jade[2] : PAL.jade[3]); } t.elipse(70, 46, 5, 3.6, PAL.jade[3]); t.tinta([[67, 46], [72, 46.6]], 0.6, PAL.tinta[0], 1); return t; }
  const alt = pose === 'ataque' ? 40 : pose === 'dano' ? 22 : pose === 'parado1' ? 30 : 32, dx = pose === 'ataque' ? 14 : pose === 'dano' ? -6 : 0;
  // corpo em espiral
  for (let i = 0; i < 26; i++) { const a = i * 0.34; t.elipse(30 + Math.cos(a) * (17 - i * 0.28), 48 - i * 0.9 + Math.sin(a * 1.4) * 2.4, 5.2 - i * 0.07, 3.6, [PAL.jade[1], PAL.jade[2], PAL.jade[3]][i % 3]); }
  // pescoço levantado
  for (let i = 0; i < 12; i++) { const y = 46 - i * (alt - 8) / 12, x = 44 + Math.sin(i * 0.5) * 3 + (i / 12) * dx; t.elipse(x, y, 4.6 - i * 0.12, 3.6, [PAL.jade[2], PAL.jade[3], PAL.jade[2]][i % 3]); t.mancha([[x - 2, y + 1], [x + 2, y + 1], [x + 1, y + 3], [x - 1, y + 3]], PAL.ocre[4], { seed: i, tremor: 0.05, alpha: 0.8 }); }
  const hx = 48 + dx, hy = 46 - alt + 2;
  pele(t, [[hx - 5, hy], [hx + 2, hy - 4], [hx + 11, hy - 1], [hx + 12, hy + 3], [hx + 2, hy + 5], [hx - 4, hy + 4]], [PAL.jade[0], PAL.jade[1], PAL.jade[2], PAL.jade[3]], 3);
  if (pose === 'ataque') { t.mancha([[hx + 8, hy + 2], [hx + 18, hy + 5], [hx + 8, hy + 8]], PAL.vermelho[2], { seed: 20, tremor: 0.05 }); t.mancha([[hx + 8, hy + 2], [hx + 10, hy + 8], [hx + 9, hy + 3]], PAL.branco[2], { seed: 21, tremor: 0.02 }); t.tinta([[hx + 16, hy + 5], [hx + 21, hy + 5]], 0.7, PAL.vermelho[3], 1); }
  t.elipse(hx + 3, hy, 1.4, 1.2, pose === 'dano' ? PAL.jade[1] : PAL.luz[2]); t.elipse(hx + 3.3, hy, 0.5, 0.8, PAL.tinta[0]);
  borda(t, [[hx - 5, hy], [hx + 2, hy - 4], [hx + 11, hy - 1]], 0.9);
  return t;
}

function golem(pose: Pose): Tela {
  const t = tela();
  sombraChao(t, 38, 26);
  const pedra = [PAL.pedra[1], PAL.pedra[2], PAL.pedra[3], PAL.pedra[4]];
  if (pose === 'derrota') { for (const [x, y, s] of [[14, 46, 7], [26, 48, 9], [40, 49, 8], [54, 47, 8], [66, 50, 6], [32, 40, 5], [48, 41, 6]] as [number, number, number][]) { pele(t, [[x - s, y + 4], [x - s * 0.6, y - s * 0.6], [x + s * 0.5, y - s * 0.8], [x + s, y + 4]], pedra, Math.round(x)); t.tinta([[x - s, y + 4], [x - s * 0.6, y - s * 0.6], [x + s * 0.5, y - s * 0.8]], 0.8, PAL.tinta[0], 0.9); } t.elipse(34, 44, 1.2, 1.2, PAL.jade[3], { alpha: 0.8 }); return t; }
  const braco = pose === 'ataque' ? -26 : pose === 'dano' ? 10 : pose === 'parado1' ? -4 : 0;
  // pernas
  for (const x of [26, 44]) { pele(t, [[x - 5, 38], [x + 8, 38], [x + 9, 52], [x - 6, 52]], pedra, x); t.tinta([[x - 6, 52], [x + 9, 52]], 0.9, PAL.tinta[0], 0.9); }
  // tronco
  pele(t, [[18, 14], [34, 8], [52, 14], [58, 32], [52, 42], [22, 42], [14, 30]], pedra, 5);
  t.mancha([[18, 14], [34, 8], [30, 24], [22, 40], [14, 30]], PAL.pedra[0], { seed: 6, tremor: 0.1, alpha: 0.6 });
  t.tinta([[22, 18], [28, 26], [26, 36]], 0.8, PAL.tinta[0], 0.9); t.tinta([[44, 20], [40, 30], [46, 40]], 0.7, PAL.tinta[0], 0.8);
  // cabeça e olhos
  pele(t, [[28, 4], [40, 2], [46, 10], [40, 16], [30, 16], [26, 10]], pedra, 7);
  t.elipse(33, 9, 1.6, 1.2, pose === 'dano' ? PAL.pedra[1] : PAL.jade[3]); t.elipse(41, 9, 1.6, 1.2, pose === 'dano' ? PAL.pedra[1] : PAL.jade[3]);
  t.elipse(38, 26, 4, 4, PAL.jade[2], { alpha: 0.35, borrao: 1.2 }); t.tinta([[35, 26], [41, 26]], 0.7, PAL.jade[4], 0.95); t.tinta([[38, 23], [38, 29]], 0.7, PAL.jade[4], 0.95);
  // braços
  const braco2 = (x: number, ang: number, claro: boolean) => { t.g.save(); t.g.translate(x * t.k, 16 * t.k); t.g.rotate(ang * Math.PI / 180); pele(t, [[-6, 0], [6, 0], [8, 22], [-7, 22]], claro ? pedra : [PAL.pedra[0], PAL.pedra[1], PAL.pedra[2], PAL.pedra[3]], x); t.tinta([[-7, 22], [8, 22]], 0.9, PAL.tinta[0], 0.9); t.g.restore(); };
  braco2(16, -braco * 0.5, false); braco2(56, braco, true);
  t.tinta([[18, 14], [34, 8], [52, 14], [58, 32]], 1, PAL.tinta[0], 0.9);
  return t;
}

function dragao(pose: Pose): Tela {
  const t = tela();
  sombraChao(t, 36, 28);
  const esc = [PAL.vermelho[0], PAL.vermelho[1], PAL.vermelho[2], PAL.vermelho[3]];
  if (pose === 'derrota') { for (let i = 0; i < 14; i++) { const x = 6 + i * 4.6; t.elipse(x, 46 + Math.sin(i * 0.8) * 2, 5, 4, i % 2 ? esc[1] : esc[2]); } pele(t, [[62, 40], [74, 42], [76, 50], [62, 50]], esc, 3); t.tinta([[68, 46], [72, 46.6]], 0.6, PAL.tinta[0], 1); return t; }
  const dx = pose === 'ataque' ? 6 : pose === 'dano' ? -5 : 0, dy = pose === 'parado1' ? -1.4 : 0;
  // corpo em S
  for (let i = 0; i < 30; i++) { const x = 6 + i * 2.1, y = 44 + dy + Math.sin(i * 0.38) * 6 - (i > 20 ? (i - 20) * 1.2 : 0); const r = 6.5 - i * 0.12; t.elipse(x, y, r, r * 0.85, esc[1 + (i % 3 === 0 ? 1 : 0) + (i % 5 === 0 ? 1 : 0)]); if (i % 3 === 0) t.mancha([[x - 2, y - r * 0.8], [x + 2, y - r * 0.8], [x, y - r * 1.5]], PAL.ouro[2], { seed: i, tremor: 0.05 }); }
  // patas
  for (const x of [30, 46]) { pele(t, [[x, 46], [x + 5, 46], [x + 4, 54], [x - 1, 54]], esc, x); t.traco(x - 1, 54, x - 3, 55, 0.8, PAL.branco[2]); t.traco(x + 3, 54, x + 5, 55, 0.8, PAL.branco[2]); }
  // cabeça
  const hx = 58 + dx, hy = 22 + dy;
  pele(t, [[hx - 6, hy + 2], [hx - 2, hy - 7], [hx + 8, hy - 8], [hx + 16, hy - 2], [hx + 14, hy + 5], [hx + 4, hy + 8], [hx - 4, hy + 10]], esc, 2);
  t.mancha([[hx + 4, hy - 8], [hx + 8, hy - 18], [hx + 10, hy - 8]], PAL.ouro[2], { seed: 3, tremor: 0.05 }); t.mancha([[hx - 2, hy - 7], [hx - 4, hy - 16], [hx + 2, hy - 8]], PAL.ouro[1], { seed: 4, tremor: 0.05 });
  if (pose === 'ataque') { t.mancha([[hx + 12, hy], [hx + 22, hy + 3], [hx + 12, hy + 8]], PAL.fogo[2], { seed: 5, tremor: 0.1 }); t.elipse(hx + 22, hy + 3, 7, 5, PAL.fogo[3], { alpha: 0.7, borrao: 2 }); t.elipse(hx + 20, hy + 3, 3, 2.4, PAL.ouro[4]); }
  t.mancha([[hx + 14, hy + 2], [hx + 22, hy + 4], [hx + 20, hy + 7]], PAL.ouro[3], { seed: 6, tremor: 0.04, alpha: 0.9 });
  t.elipse(hx + 6, hy - 1, 1.8, 1.4, pose === 'dano' ? esc[1] : PAL.luz[2]); t.elipse(hx + 6.5, hy - 1, 0.6, 1, PAL.tinta[0]);
  t.tinta([[hx - 6, hy + 2], [hx - 2, hy - 7], [hx + 8, hy - 8], [hx + 16, hy - 2]], 1, PAL.tinta[0], 0.9);
  for (let i = 0; i < 3; i++) t.tinta([[hx + 14 + i, hy + 4 + i * 0.8], [hx + 24 + i * 3, hy + 8 + i * 2]], 0.4, PAL.ouro[3], 0.9);
  return t;
}

function espectro(pose: Pose): Tela {
  const t = tela();
  if (pose === 'derrota') { for (let i = 0; i < 12; i++) t.elipse(10 + i * 5.4, 48 + Math.sin(i) * 2, 6, 2 + (i % 3), PAL.azul[4], { alpha: 0.25, borrao: 1.2 }); return t; }
  const dy = pose === 'parado1' ? -2 : 0, dx = pose === 'ataque' ? 10 : pose === 'dano' ? -6 : 0;
  t.elipse(40 + dx, 30, 26, 28, PAL.azul[4], { alpha: 0.18, borrao: 5 });
  const corpo: Pt[] = [[26 + dx, 12 + dy], [40 + dx, 4 + dy], [54 + dx, 12 + dy], [58 + dx, 34], [54 + dx, 46], [48 + dx, 42], [44 + dx, 54], [38 + dx, 44], [32 + dx, 54], [28 + dx, 44], [22 + dx, 48], [22 + dx, 32]];
  t.mancha(corpo, t.grad(58 + dx, 4, 22 + dx, 54, [[0, PAL.branco[2]], [0.5, PAL.azul[4]], [1, PAL.azul[2]]]), { seed: 2, tremor: 0.4, alpha: 0.82 });
  t.mancha([[22 + dx, 32], [26 + dx, 12 + dy], [34 + dx, 8 + dy], [30 + dx, 34], [28 + dx, 44], [22 + dx, 48]], PAL.azul[2], { seed: 3, tremor: 0.3, alpha: 0.7 });
  t.elipse(34 + dx, 21 + dy, 3.4, 4.2, PAL.noite[0]); t.elipse(46 + dx, 21 + dy, 3.4, 4.2, PAL.noite[0]);
  t.elipse(34 + dx, 22 + dy, 1.2, 1.6, pose === 'dano' ? PAL.azul[2] : PAL.azul[4]); t.elipse(46 + dx, 22 + dy, 1.2, 1.6, pose === 'dano' ? PAL.azul[2] : PAL.azul[4]);
  t.elipse(40 + dx, 32 + dy, 3, pose === 'ataque' ? 5 : 2.4, PAL.noite[0]);
  for (const s of [-1, 1]) { const ax = 40 + dx + s * 22, ay = pose === 'ataque' ? 24 : 36; t.mancha([[40 + dx + s * 14, 26], [ax, ay], [ax + s * 6, ay + 8], [ax + s * 2, ay + 10], [40 + dx + s * 12, 36]], PAL.azul[3], { seed: 4 + s, tremor: 0.3, alpha: 0.75 }); for (const d of [0, 2.4, 4.8]) t.traco(ax + s * 4, ay + 8 + d * 0, ax + s * (7 + d), ay + 12 + d, 0.6, PAL.branco[2], 0.85); }
  t.tinta([[26 + dx, 12 + dy], [40 + dx, 4 + dy], [54 + dx, 12 + dy]], 0.8, PAL.azul[1], 0.8);
  return t;
}

function raio(pose: Pose): Tela {
  const t = tela();
  const r = rng(7);
  if (pose === 'derrota') { for (let i = 0; i < 6; i++) t.elipse(14 + i * 11, 20 + (i % 2) * 4, 9, 5, PAL.noite[3], { alpha: 0.5, borrao: 1.2 }); return t; }
  const dy = pose === 'parado1' ? -1.4 : 0, forca = pose === 'ataque' ? 1 : 0;
  t.elipse(40, 14, 38, 16, PAL.noite[2], { alpha: 0.3, borrao: 4 });
  for (let i = 0; i < 16; i++) t.elipse(10 + i * 4.2, 14 + dy + Math.sin(i * 0.9) * 3, r.r(8, 14), r.r(5, 9), [PAL.noite[1], PAL.noite[2], PAL.noite[3], PAL.roxo[1]][i % 4], { alpha: 0.95 });
  for (let i = 0; i < 8; i++) t.elipse(16 + i * 7, 10 + dy, r.r(5, 9), r.r(2.4, 4), PAL.roxo[2], { alpha: 0.7 });
  t.tinta([[8, 20], [24, 24], [44, 25], [62, 22], [74, 18]], 0.9, PAL.tinta[0], 0.6);
  const raios = forca ? [22, 40, 58] : [40];
  for (const x of raios) { const pts: Pt[] = [[x, 22]]; let cx = x; for (let y = 28; y < 52; y += 5) { cx += r.r(-4, 4); pts.push([cx, y]); } for (const [w, c] of [[3, PAL.azul[3]], [1.4, PAL.ouro[4]], [0.7, PAL.branco[2]]] as [number, string][]) t.tinta(pts, w, c, forca ? 1 : 0.55); if (forca) t.elipse(pts[pts.length - 1][0], 52, 6, 2.4, PAL.ouro[4], { alpha: 0.7, borrao: 1 }); }
  t.elipse(34, 18 + dy, 1.3, 1, pose === 'dano' ? PAL.roxo[1] : PAL.ouro[3]); t.elipse(46, 18 + dy, 1.3, 1, pose === 'dano' ? PAL.roxo[1] : PAL.ouro[3]);
  void fbm;
  return t;
}

export function pintarCriatura(id: string, pose: Pose): ReturnType<typeof pixelizar> {
  const t = id === 'lobo' || id === 'tigre' ? quadrupede(id, pose) : id === 'serpente' ? serpente(pose) : id === 'golem' ? golem(pose) : id === 'dragao' ? dragao(pose) : id === 'espectro' ? espectro(pose) : raio(pose);
  return pixelizar(t, LARG_C, ALT_C, { alfa: true, limpar: 1 });
}
const POSE_DE: Record<string, Pose> = { parado0: 'parado0', parado1: 'parado1', ataque0: 'parado1', ataque1: 'ataque', ataque2: 'ataque', tecnica0: 'parado1', tecnica1: 'ataque', tecnica2: 'ataque', dano0: 'dano', vitoria0: 'parado0', derrota0: 'derrota' };
export function criaturaUrl(id: string, quadro: string): string {
  const pose = POSE_DE[quadro] ?? 'parado0';
  return cache(`cr|${id}|${pose}`, () => pintarCriatura(id, pose));
}
