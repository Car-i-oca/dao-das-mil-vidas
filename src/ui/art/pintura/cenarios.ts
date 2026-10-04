import { PAL } from './paleta';
import { Tela, rng, fbm, pixelizar, cache, hashStr, type Pixelado, type Rng } from './base';

/**
 * Cenários 320x180 pintados em camadas (céu, nuvens, terra, brilhos), com versão de dia e de noite. Cada camada é pintada em
 * alta resolução e reduzida/quantizada para a paleta fixa; no app as nuvens deslizam e os brilhos (água, lanternas) pulsam.
 */
export const LARG = 320;
export const ALT = 180;
type Pt = [number, number];

export interface Camadas { ceu: Pixelado; nuvens: Pixelado; terra: Pixelado; brilhos: Pixelado }

const nova = (w = LARG, h = ALT) => new Tela(w, h, w * 4);

function ceuDe(noite: boolean, tipo: string, r: Rng): Tela {
  const t = nova();
  if (noite) {
    t.retangulo(0, 0, LARG, ALT, t.grad(0, 0, 0, 130, [[0, PAL.noite[0]], [0.5, PAL.noite[1]], [0.85, PAL.noite[2]], [1, PAL.roxo[1]]]));
    for (let i = 0; i < 90; i++) t.elipse(r.r(0, LARG), r.r(0, 90), r.r(0.35, 0.9), r.r(0.35, 0.9), r() < 0.2 ? PAL.ouro[4] : PAL.cinza[4], { alpha: r.r(0.5, 1) });
    t.elipse(236, 34, 30, 30, PAL.roxo[2], { alpha: 0.28, borrao: 9 });
    t.elipse(236, 34, 14, 14, t.radial(231, 29, 18, [[0, PAL.branco[2]], [0.7, PAL.cinza[4]], [1, PAL.cinza[3]]]));
    for (const [x, y, rr] of [[231, 31, 3], [241, 38, 2.4], [238, 26, 1.8]] as [number, number, number][]) t.elipse(x, y, rr, rr, PAL.cinza[3], { alpha: 0.7, borrao: 0.5 });
  } else {
    t.retangulo(0, 0, LARG, ALT, t.grad(0, 0, 0, 130, [[0, PAL.ceu[1]], [0.45, PAL.ceu[2]], [0.8, PAL.ceu[3]], [1, tipo === 'montanha' ? PAL.ceu[5] : PAL.poente[2]]]));
    t.elipse(252, 38, 34, 34, PAL.poente[2], { alpha: 0.2, borrao: 8 });
    t.elipse(252, 38, 13, 13, t.radial(248, 34, 16, [[0, PAL.ouro[4]], [0.6, PAL.ouro[3]], [1, PAL.ouro[2]]]));
  }
  return t;
}

function nuvem(t: Tela, cx: number, cy: number, s: number, noite: boolean, r: Rng) {
  const tons = noite ? [PAL.noite[2], PAL.noite[3], PAL.roxo[1], PAL.roxo[2]] : [PAL.ceu[3], PAL.ceu[4], PAL.ceu[5], PAL.branco[2]];
  for (let i = 0; i < 9; i++) {
    const x = cx + r.r(-16, 16) * s, y = cy + r.r(-3, 3) * s, rx = r.r(7, 14) * s, ry = r.r(3.5, 6) * s;
    t.elipse(x, y + ry * 0.6, rx, ry * 0.8, tons[0], { alpha: 0.9 });
  }
  for (let i = 0; i < 10; i++) {
    const x = cx + r.r(-15, 15) * s, y = cy + r.r(-4, 2) * s, rx = r.r(6, 12) * s, ry = r.r(3, 5.5) * s;
    t.elipse(x, y, rx, ry, tons[1 + (i % 2)], { alpha: 0.95 });
  }
  for (let i = 0; i < 6; i++) t.elipse(cx + r.r(-10, 10) * s, cy - 3 * s + r.r(-2, 1), r.r(4, 8) * s, r.r(1.4, 2.6) * s, tons[3], { alpha: 0.9 });
}

function cume(t: Tela, base: number, amp: number, esc: number, seed: number, topo: string, fundo: string, o: { neve?: boolean; picos?: boolean; ate?: number } = {}) {
  const pts: Pt[] = [];
  for (let x = -4; x <= LARG + 4; x += 3) {
    const n = fbm(x / esc, seed, seed) * 1.2 + (o.picos ? Math.abs(Math.sin(x / (esc * 0.55) + seed)) * 0.5 : 0);
    pts.push([x, base - n * amp]);
  }
  const ate = o.ate ?? ALT;
  t.mancha([...pts, [LARG + 4, ate], [-4, ate]], t.grad(0, base - amp, 0, base + 30, [[0, topo], [1, fundo]]), { seed, tremor: 0.15 });
  // vertentes iluminadas (luz da direita): manchas claras na face direita de cada pico
  for (let i = 4; i < pts.length - 4; i += 3) {
    const [x, y] = pts[i], [x2, y2] = pts[i + 1];
    if (y2 > y + 1.6) t.mancha([[x, y], [x + 9, y2 + 6], [x + 5, y2 + 22], [x - 5, y + 14]], topo, { seed: seed + i, tremor: 0.4, alpha: 0.35, borrao: 1.2 });
    else if (y2 < y - 1.6) t.mancha([[x, y], [x + 10, y + 12], [x + 6, y + 26], [x - 4, y + 10]], fundo, { seed: seed + i, tremor: 0.4, alpha: 0.35, borrao: 1.2 });
  }
  if (o.neve) for (let i = 1; i < pts.length - 1; i++) { const [x, y] = pts[i]; if (y < base - amp * 0.7) { const d = 3 + (base - amp * 0.7 - y) * 0.32 + fbm(i * 0.6, seed, 4) * 5; t.mancha([[x - 3, y], [x + 3, y], [x + 3.5, y + d], [x - 3.5, y + d * 0.8]], PAL.cinza[4], { seed: i, tremor: 0.3 }); t.mancha([[x - 3, y + d * 0.5], [x + 3, y + d * 0.5], [x + 3.5, y + d], [x - 3.5, y + d * 0.8]], PAL.ceu[4], { seed: i + 3, tremor: 0.3, alpha: 0.8 }); } }
  return pts;
}

function pinheiros(t: Tela, n: number, x0: number, x1: number, y0: number, y1: number, tons: string[], r: Rng, alt0 = 14, alt1 = 22) {
  for (let i = 0; i < n; i++) {
    const x = r.r(x0, x1), y = r.r(y0, y1), h = r.r(alt0, alt1);
    for (let k = 0; k < 4; k++) { const w = (h / 2.1) * (0.45 + k * 0.28), yy = y - h + k * (h / 4.3); t.mancha([[x - w, yy + h / 3], [x, yy], [x + w, yy + h / 3]], tons[Math.min(tons.length - 1, 1 + (k % 3))], { seed: i * 7 + k, tremor: 0.5 }); t.mancha([[x + 1, yy + 1], [x + w, yy + h / 3], [x + 1, yy + h / 3]], tons[Math.min(tons.length - 1, 2 + (k % 2))], { seed: i + k, tremor: 0.4, alpha: 0.8 }); }
    t.traco(x, y - 2, x, y + 1, 1.6, PAL.marrom[1]);
  }
}

function casa(t: Tela, x: number, y: number, w: number, h: number, noite: boolean, telhado: string[], janelas: Pt[]) {
  t.mancha([[x, y], [x + w, y], [x + w, y - h], [x, y - h]], t.grad(x + w, y - h, x, y, [[0, PAL.branco[1]], [1, PAL.marrom[3]]]), { seed: Math.round(x), tremor: 0.2 });
  t.retangulo(x, y - 3, w, 3, PAL.marrom[1]);
  t.retangulo(x + w * 0.62, y - h * 0.55, 5, h * 0.55, PAL.marrom[1]);
  for (const [jx, jy] of janelas) { t.retangulo(x + jx, y - jy, 4.5, 5, noite ? PAL.ouro[3] : PAL.marrom[0]); if (noite) t.elipse(x + jx + 2, y - jy + 2, 7, 7, PAL.fogo[3], { alpha: 0.28, borrao: 2 }); }
  t.mancha([[x - 4, y - h + 2], [x + 3, y - h - 1], [x + w / 2, y - h - 11], [x + w - 3, y - h - 1], [x + w + 4, y - h + 2], [x + w + 1, y - h + 5], [x - 1, y - h + 5]], t.grad(x + w, y - h - 11, x, y - h + 5, [[0, PAL.vermelho[3]], [0.5, PAL.vermelho[2]], [1, PAL.vermelho[1]]]), { seed: Math.round(y), tremor: 0.2 });
  t.tinta([[x - 4, y - h + 2], [x + w / 2, y - h - 11], [x + w + 4, y - h + 2]], 1.1, PAL.tinta[0], 0.8);
  t.tinta([[x, y], [x + w, y]], 1, PAL.tinta[0], 0.7);
}

function pagode(t: Tela, cx: number, y: number, andares: number, noite: boolean) {
  let yy = y;
  for (let i = 0; i < andares; i++) {
    const w = 15 - i * 2.4, h = 9;
    t.mancha([[cx - w * 0.5, yy], [cx + w * 0.5, yy], [cx + w * 0.5, yy - h], [cx - w * 0.5, yy - h]], t.grad(cx + w, yy - h, cx - w, yy, [[0, PAL.branco[1]], [1, PAL.marrom[3]]]), { seed: i + 20, tremor: 0.15 });
    t.retangulo(cx - 1.5, yy - 6, 3, 4.5, noite ? PAL.ouro[3] : PAL.marrom[0]);
    t.mancha([[cx - w - 2, yy - h + 2], [cx - w / 2, yy - h - 1.5], [cx, yy - h - 4.5], [cx + w / 2, yy - h - 1.5], [cx + w + 2, yy - h + 2], [cx + w, yy - h + 4.5], [cx - w, yy - h + 4.5]], t.grad(cx + w, yy - h - 4, cx - w, yy - h + 4, [[0, PAL.vermelho[3]], [1, PAL.vermelho[1]]]), { seed: i + 30, tremor: 0.15 });
    t.tinta([[cx - w - 2, yy - h + 2], [cx, yy - h - 4.5], [cx + w + 2, yy - h + 2]], 1, PAL.tinta[0], 0.8);
    yy -= h + 3;
  }
  t.traco(cx, yy - 1, cx, yy - 9, 1.2, PAL.ouro[2]);
}

export function vilarejo(noite: boolean, seed: number): Camadas {
  const r = rng(seed * 977 + (noite ? 1 : 0));
  const ceu = ceuDe(noite, 'vilarejo', r);
  const nuv = nova(640, 80);
  for (const [x, y, s] of [[70, 20, 1], [190, 46, 1.2], [340, 24, 1.1], [470, 50, 1.2], [590, 22, 1]] as [number, number, number][]) nuvem(nuv, x, y, s, noite, r);
  const terra = nova(), brilhos = nova();
  // montanhas distantes e colinas
  cume(terra, 106, 46, 52, seed + 1, noite ? PAL.azul[1] : PAL.azul[3], noite ? PAL.noite[2] : PAL.azul[2], { picos: true, neve: !noite, ate: 138 });
  cume(terra, 118, 24, 34, seed + 5, noite ? PAL.noite[2] : PAL.ceu[2], noite ? PAL.noite[1] : PAL.jade[2], { ate: 144 });
  cume(terra, 130, 12, 60, seed + 9, noite ? PAL.folha[1] : PAL.folha[4], noite ? PAL.folha[0] : PAL.folha[2], { ate: 156 });
  const arv = noite ? [PAL.folha[0], PAL.folha[0], PAL.folha[1], PAL.folha[2]] : [PAL.folha[1], PAL.folha[2], PAL.folha[3], PAL.folha[4]];
  pinheiros(terra, 26, 4, 316, 126, 140, arv, r);
  terra.folhagem(0, 128, LARG, 26, noite ? [PAL.folha[0], PAL.folha[1]] : [PAL.folha[2], PAL.folha[3], PAL.folha[4]], r, 0.5, 4);
  for (const [x, y, w, h, j] of [[22, 146, 24, 16, [[3, 8]]], [56, 148, 20, 14, [[4, 7]]], [94, 145, 26, 18, [[3, 9], [14, 9]]], [196, 147, 22, 15, [[3, 8]]], [232, 145, 26, 17, [[4, 9]]], [274, 148, 20, 14, [[4, 7]]]] as [number, number, number, number, Pt[]][]) casa(terra, x, y, w, h, noite, PAL.vermelho, j);
  pagode(terra, 166, 148, 3, noite);
  // rio com pinceladas horizontais
  terra.retangulo(0, 150, LARG, 20, terra.grad(0, 150, 0, 170, noite ? [[0, PAL.noite[1]], [1, PAL.agua[0]]] : [[0, PAL.agua[2]], [1, PAL.agua[1]]]));
  for (let i = 0; i < 70; i++) { const x = r.r(0, 310), y = r.r(152, 168), l = r.r(5, 18); brilhos.traco(x, y, x + l, y + r.r(-0.4, 0.4), 1.1, noite ? PAL.agua[3] : PAL.agua[4], noite ? 0.85 : 0.9); }
  // ponte de pedra
  terra.mancha([[102, 156], [110, 142], [130, 138], [150, 142], [158, 156], [158, 160], [102, 160]], terra.grad(158, 138, 102, 160, [[0, PAL.pedra[3]], [1, PAL.pedra[1]]]), { seed: 3, tremor: 0.3 });
  terra.elipse(130, 158, 14, 9, PAL.agua[0], { alpha: 0.95 });
  terra.tinta([[102, 156], [110, 142], [130, 138], [150, 142], [158, 156]], 1.2, PAL.tinta[0], 0.85);
  // primeiro plano: relva, flores e árvore em silhueta
  terra.mancha([[0, 168], [60, 163], [140, 167], [230, 163], [320, 168], [320, 180], [0, 180]], terra.grad(0, 162, 0, 180, noite ? [[0, PAL.folha[1]], [1, PAL.folha[0]]] : [[0, PAL.folha[4]], [1, PAL.folha[2]]]), { seed: 7, tremor: 0.6 });
  terra.folhagem(0, 164, LARG, 16, noite ? [PAL.folha[0], PAL.folha[1], PAL.folha[2]] : [PAL.folha[2], PAL.folha[3], PAL.folha[4], PAL.folha[5]], r, 0.9, 3.4);
  for (let i = 0; i < 26; i++) terra.elipse(r.r(2, 318), r.r(168, 178), 0.9, 0.9, noite ? PAL.branco[0] : [PAL.vermelho[3], PAL.ouro[3], PAL.branco[2]][r.i(0, 2)]);
  terra.mancha([[8, 178], [10, 120], [14, 120], [18, 178]], terra.grad(18, 120, 6, 178, [[0, PAL.marrom[2]], [1, PAL.marrom[0]]]), { seed: 4, tremor: 0.4 });
  terra.tinta([[8, 176], [10, 122]], 1.2, PAL.tinta[0], 0.9);
  terra.folhagem(-14, 84, 56, 52, noite ? [PAL.folha[0], PAL.folha[1], PAL.folha[2]] : [PAL.folha[2], PAL.folha[3], PAL.folha[4], PAL.folha[5], PAL.folha[6]], r, 1.2, 6.5);
  // lanternas e luzes
  if (noite) {
    for (let x = 10; x < LARG; x += 22) { const y = 104 + Math.round(Math.sin(x / 30) * 3); brilhos.elipse(x, y + 5, 7, 7, PAL.fogo[3], { alpha: 0.3, borrao: 2.4 }); brilhos.elipse(x, y + 5, 2.6, 3, t2(brilhos), { alpha: 1 }); }
    brilhos.tinta(Array.from({ length: 33 }, (_, i) => [i * 10, 104 + Math.sin(i * 10 / 30) * 3] as Pt), 0.9, PAL.marrom[1], 0.9);
  }
  return emp(ceu, nuv, terra, brilhos, 'vilarejo');
}
const t2 = (t: Tela) => t.grad(0, 0, 0, 10, [[0, PAL.ouro[4]], [1, PAL.fogo[2]]]);

export function montanha(noite: boolean, seed: number): Camadas {
  const r = rng(seed * 733 + (noite ? 1 : 0));
  const ceu = ceuDe(noite, 'montanha', r);
  const nuv = nova(640, 80);
  for (const [x, y, s] of [[90, 26, 1.2], [260, 14, 1], [430, 34, 1.3], [590, 20, 1]] as [number, number, number][]) nuvem(nuv, x, y, s, noite, r);
  const terra = nova(), brilhos = nova();
  cume(terra, 92, 70, 40, seed + 2, noite ? PAL.azul[1] : PAL.azul[3], noite ? PAL.noite[2] : PAL.azul[1], { picos: true, neve: true, ate: 140 });
  cume(terra, 126, 46, 30, seed + 6, noite ? PAL.pedra[0] : PAL.pedra[3], noite ? PAL.noite[1] : PAL.pedra[1], { picos: true, ate: 172 });
  // penhasco com templo
  const tx = 216, ty = 98;
  terra.mancha([[tx - 42, 172], [tx - 36, 130], [tx - 28, 120], [tx - 22, 108], [tx - 12, 106], [tx + 14, 106], [tx + 24, 110], [tx + 32, 122], [tx + 40, 136], [tx + 48, 172]], terra.grad(tx + 40, 106, tx - 40, 172, [[0, noite ? PAL.pedra[1] : PAL.pedra[3]], [0.5, noite ? PAL.pedra[0] : PAL.pedra[2]], [1, noite ? PAL.noite[0] : PAL.pedra[1]]]), { seed: 5, tremor: 0.7 });
  terra.tinta([[tx - 36, 130], [tx - 28, 120], [tx - 22, 108], [tx - 12, 106]], 1.1, PAL.tinta[0], 0.7);
  terra.retangulo(tx - 24, ty + 4, 50, 3, noite ? PAL.pedra[1] : PAL.pedra[3]);
  for (let x = tx - 22; x <= tx + 22; x += 8) terra.retangulo(x, ty - 2, 2, 8, PAL.vermelho[1]);
  pagode(terra, tx, ty + 2, 3, noite);
  casa(terra, tx - 44, ty + 2, 18, 10, noite, PAL.vermelho, [[3, 6]]);
  for (let i = 0; i < 18; i++) terra.retangulo(tx - 6 + i * 0.8, ty + 8 + i * 2, 11 - (i >> 2), 1.2, i % 2 ? PAL.pedra[3] : PAL.pedra[2]);
  // cachoeira
  terra.mancha([[78, 112], [86, 112], [88, 168], [76, 168]], terra.grad(78, 112, 86, 168, [[0, PAL.agua[4]], [1, PAL.agua[3]]]), { seed: 8, tremor: 0.5 });
  for (let i = 0; i < 14; i++) brilhos.traco(79 + (i % 3) * 2.4, 114 + i * 3.8, 79.4 + (i % 3) * 2.4, 117 + i * 3.8, 0.9, PAL.branco[2], 0.9);
  const arv = noite ? [PAL.folha[0], PAL.folha[0], PAL.folha[1], PAL.folha[2]] : [PAL.folha[1], PAL.folha[2], PAL.folha[3], PAL.folha[4]];
  pinheiros(terra, 30, 4, 316, 150, 176, arv, r, 16, 28);
  // névoa pintada
  const nev = noite ? [PAL.roxo[1], PAL.noite[3]] : [PAL.ceu[5], PAL.branco[1]];
  for (let i = 0; i < 18; i++) terra.elipse(r.r(0, LARG), r.r(124, 148), r.r(20, 50), r.r(2, 5), nev[i % 2], { alpha: 0.5, borrao: 1.4 });
  // picos em primeiro plano
  terra.mancha([[0, 180], [0, 142], [18, 124], [36, 150], [54, 140], [74, 180]], terra.grad(60, 124, 0, 180, [[0, noite ? PAL.pedra[0] : PAL.pedra[2]], [1, noite ? PAL.noite[0] : PAL.pedra[0]]]), { seed: 9, tremor: 0.7 });
  terra.mancha([[250, 180], [270, 148], [290, 160], [306, 136], [320, 150], [320, 180]], terra.grad(306, 136, 250, 180, [[0, noite ? PAL.pedra[0] : PAL.pedra[2]], [1, noite ? PAL.noite[0] : PAL.pedra[0]]]), { seed: 10, tremor: 0.7 });
  pinheiros(terra, 14, 0, 300, 172, 180, noite ? [PAL.noite[0], PAL.folha[0], PAL.folha[0], PAL.folha[1]] : [PAL.folha[0], PAL.folha[1], PAL.folha[1], PAL.folha[2]], r, 28, 40);
  if (noite) for (const [x, y] of [[tx - 4, ty + 14], [tx + 6, ty + 14], [tx - 40, ty + 7]] as Pt[]) { brilhos.elipse(x, y, 7, 7, PAL.fogo[3], { alpha: 0.3, borrao: 2 }); brilhos.retangulo(x - 1.5, y - 1.5, 3, 3, PAL.ouro[3]); }
  return emp(ceu, nuv, terra, brilhos, 'montanha');
}

function emp(ceu: Tela, nuv: Tela, terra: Tela, brilhos: Tela, _k: string): Camadas {
  return {
    ceu: pixelizar(ceu, LARG, ALT, { limpar: 1 }), nuvens: pixelizar(nuv, 640, 80, { alfa: true, limpar: 1 }),
    terra: pixelizar(terra, LARG, ALT, { alfa: true, limpar: 2 }), brilhos: pixelizar(brilhos, LARG, ALT, { alfa: true, limpar: 0 }),
  };
}

const CACHE_CAM = new Map<string, Camadas>();
export const CENARIOS: Record<string, (noite: boolean, seed: number) => Camadas> = { vilarejo, montanha };
export function camadasDe(kind: string, seed: string, noite: boolean): { k: string; c: Camadas } | null {
  const f = CENARIOS[kind];
  if (!f) return null;
  const s = (hashStr(seed) % 5) + 1;
  const k = `cp|${kind}|${s}|${noite ? 1 : 0}`;
  let c = CACHE_CAM.get(k);
  if (!c) { c = f(noite, s); CACHE_CAM.set(k, c); }
  return { k, c };
}
void cache;
