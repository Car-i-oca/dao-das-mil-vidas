import type { Item } from '../../../types';
import { hash } from '../core';
import { itemMotif, type Motif } from '../icons';
import { mix } from '../cor';
import { K, Surf, imagemSvg, png } from './surf';

const AZ = '#5aa0e8', VD = '#4fcf8a', VM = '#e0524a', AM = '#ffd35a', RX = '#a07be0', RS = '#f08fb4', LJ = '#f08a3c', PR = '#c9d3dc', MR = '#8a5a3a';
const PAL = [VD, AM, VM, AZ, RX, RS];
const GRAU = ['', '#9aa3ad', '#c9803a', VD, AZ, AM];
const W = '#fff7e6';

/** Apaga (deixa transparente) uma elipse: serve para furos de anel. */
function furo(s: Surf, cx: number, cy: number, rx: number, ry: number) {
  for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry; if (dx * dx + dy * dy <= 1) s.set(x, y, null); }
}
const pts = (s: Surf, l: [number, number][], c: string) => l.forEach(([x, y]) => s.set(x, y, c));

/* ---------- Itens: 32x32, o desenho ocupa ~24x24 ---------- */
const GLIFOS: Record<Motif, (s: Surf, c: string, g: number) => void> = {
  pill: (s, c, g) => {
    for (let i = 0; i < g - 1; i++) s.halo(16, 18, 10 + i * 2, c, 0.5);
    s.elipse(16, 18, 7.5, 7.5, c); pts(s, [[12, 14], [13, 14], [12, 15], [14, 13]], W); pts(s, [[15, 7], [16, 6], [15, 5], [19, 8], [20, 7]], '#e8dcc0');
  },
  herb: (s, c, g) => {
    s.linha(16, 28, 16, 13, '#3d8f5a'); s.linha(17, 28, 17, 14, '#1f5a3d');
    s.elipse(10, 21, 5, 2.4, '#4fcf8a'); s.elipse(22, 17, 5, 2.4, '#4fcf8a'); s.elipse(11, 14, 4, 2, '#3d8f5a'); s.elipse(21, 24, 4, 2, '#3d8f5a');
    s.elipse(16, 9, 3.2, 3.8, c); if (g >= 3) s.halo(16, 9, 7, c, 0.6);
  },
  fruit: (s, c) => { s.elipse(16, 19, 9, 8.6, c); pts(s, [[11, 15], [11, 16], [12, 14]], W); s.rect(15, 8, 2, 4, '#5a3a24'); s.elipse(21, 9, 4, 2.2, '#4fcf8a'); },
  seed: (s, c) => { s.linha(16, 27, 16, 17, '#3d8f5a'); s.elipse(10, 14, 5, 3, '#4fcf8a'); s.elipse(22, 11, 5, 3, '#4fcf8a'); s.elipse(16, 28, 8, 2.2, c); s.elipse(16, 26, 4, 2, MR); },
  blade: (s, c, g) => {
    if (g >= 3) s.halo(18, 14, 11, c, 0.4);
    s.poli([[27, 3], [29, 5], [14, 21], [10, 17]], '#dfe8f4'); s.linha(26, 6, 13, 19, W);
    s.poli([[7, 17], [13, 23], [11, 25], [5, 19]], AM); s.poli([[8, 22], [10, 20], [5, 27], [4, 26]], VM); s.elipse(4, 27, 1.8, 1.8, AM);
  },
  armor: (s, c) => { s.poli([[16, 4], [27, 8], [27, 16], [16, 28], [5, 16], [5, 8]], c); s.linha(16, 6, 16, 26, W); s.elipse(16, 14, 3.4, 3.4, AM); },
  bell: (s, c) => { s.rect(15, 3, 2, 4, AM); s.poli([[9, 24], [10, 14], [13, 8], [19, 8], [22, 14], [23, 24]], c); s.rect(7, 24, 18, 3, AM); s.elipse(16, 28, 2.4, 2, AM); pts(s, [[13, 14], [13, 16]], W); },
  mirror: (s, c) => { s.rect(15, 21, 3, 8, AM); s.elipse(16, 13, 10, 10, AM); s.elipse(16, 13, 7, 7, '#2d5aa0'); s.elipse(16, 13, 6, 6, '#6aa0e0'); pts(s, [[12, 9], [13, 9], [12, 10]], W); },
  cauldron: (s, c) => { pts(s, [[12, 8], [13, 6], [12, 4], [20, 8], [19, 6]], LJ); pts(s, [[16, 7], [16, 5]], AM); s.elipse(16, 20, 10, 7, '#4a4658'); s.rect(5, 12, 22, 3, c); s.rect(8, 26, 3, 3, c); s.rect(21, 26, 3, 3, c); pts(s, [[12, 20], [16, 18], [20, 20]], c); },
  banner: (s, c) => { s.rect(7, 3, 2, 26, MR); s.elipse(8, 3, 2, 2, AM); s.poli([[9, 5], [26, 5], [22, 11], [26, 17], [9, 17]], c); s.rect(12, 10, 8, 2, W); },
  lantern: (s, c) => { s.halo(16, 17, 12, c, 0.5); s.rect(15, 3, 2, 3, MR); s.rect(10, 6, 12, 3, '#6b2a3a'); s.elipse(16, 17, 9, 9, c); s.elipse(16, 17, 3, 5, '#fff2b0'); s.rect(11, 26, 10, 2, '#6b2a3a'); s.rect(13, 28, 1, 3, AM); s.rect(18, 28, 1, 3, AM); },
  talisman: (s, c) => { s.ret(10, 3, 12, 26, '#ffe070'); s.rect(12, 6, 8, 1, VM); s.rect(15, 9, 2, 8, VM); s.rect(13, 12, 6, 1, VM); s.rect(13, 19, 2, 4, VM); s.rect(17, 19, 2, 4, VM); s.elipse(16, 26, 1.5, 1.5, VM); },
  manual: (s, c) => { s.ret(6, 4, 20, 24, c); s.rect(6, 4, 3, 24, mix(c, K, 0.4)); s.ret(12, 9, 10, 8, '#e8dcc0'); s.rect(14, 11, 6, 1, K); s.rect(14, 14, 4, 1, K); s.rect(11, 22, 12, 1, AM); },
  core: (s, c, g) => { if (g >= 3) s.halo(16, 16, 14, c, 0.5); s.elipse(16, 16, 10, 10, c); s.ret(15, 10, 3, 12, K); s.rect(16, 12, 1, 8, AM); pts(s, [[11, 11], [12, 10]], W); },
  ring: (s, c) => { s.elipse(16, 20, 9, 8, AM); furo(s, 16, 20, 5, 4.4); s.poli([[16, 4], [21, 10], [16, 16], [11, 10]], c); pts(s, [[15, 7], [14, 8]], W); },
  crystal: (s, c) => { s.poli([[16, 3], [24, 11], [21, 28], [11, 28], [8, 11]], c); s.linha(16, 4, 14, 27, mix(c, W, 0.5)); s.linha(9, 11, 23, 11, mix(c, W, 0.4)); pts(s, [[12, 9], [13, 8]], W); },
  egg: (s, c) => { s.elipse(16, 17, 9, 11.4, '#efe4c4'); pts(s, [[8, 18], [10, 16], [12, 19], [14, 15], [17, 19], [20, 15], [23, 19]], c); s.set(13, 9, W); s.set(12, 10, W); },
  scroll: (s, c) => { s.ret(5, 9, 22, 14, '#efe2bc'); s.elipse(5, 16, 2.6, 8, c); s.elipse(27, 16, 2.6, 8, c); s.rect(9, 13, 14, 1, K); s.rect(9, 16, 10, 1, K); s.rect(9, 19, 12, 1, K); s.elipse(22, 19, 1.5, 1.5, VM); },
  key: (s, c) => { s.elipse(10, 10, 7, 7, AM); furo(s, 10, 10, 3, 3); s.trago(15, 15, 27, 27, AM, 3); s.rect(23, 23, 3, 4, AM); s.rect(26, 26, 3, 3, c); },
  tablet: (s, c) => { s.ret(8, 10, 16, 19, mix(c, '#7a8aa8', 0.6)); s.elipse(16, 10, 8, 7, mix(c, '#7a8aa8', 0.6)); s.rect(12, 12, 8, 1, W); s.rect(12, 16, 8, 1, W); s.rect(12, 20, 5, 1, W); s.elipse(16, 25, 1.6, 1.6, AM); },
  fallback: (s, c) => { s.poli([[16, 3], [27, 13], [16, 29], [5, 13]], c); s.linha(5, 13, 27, 13, mix(c, W, 0.4)); s.linha(11, 13, 16, 29, mix(c, K, 0.3)); pts(s, [[11, 9], [12, 8]], W); },
};

function moldura(s: Surf, g: number, seed: number) {
  const gc = GRAU[g];
  const anel = (i: number, c: string) => {
    for (let x = i + 2; x < 30 - i; x++) { s.set(x, i, c); s.set(x, 31 - i, c); }
    for (let y = i + 2; y < 30 - i; y++) { s.set(i, y, c); s.set(31 - i, y, c); }
    s.set(i + 1, i + 1, c); s.set(30 - i, i + 1, c); s.set(i + 1, 30 - i, c); s.set(30 - i, 30 - i, c);
  };
  anel(0, K); anel(1, gc); if (g >= 3) anel(2, mix(gc, K, 0.5));
  if (g >= 4) { for (const [x, y] of [[3, 3], [28, 3], [3, 28], [28, 28]]) s.set(x, y, gc); pts(s, [[4, 3], [3, 4], [27, 3], [28, 4], [4, 28], [3, 27], [27, 28], [28, 27]], gc); }
  if (g >= 5) { pts(s, [[13, 2], [15, 2], [17, 2], [19, 2], [14, 3], [16, 3], [18, 3]], AM); for (let i = 0; i < 6; i++) s.set(3 + ((seed >> (i * 3)) & 15) * 1.6, 3 + ((seed >> (i * 2 + 1)) & 15) * 1.6, '#fff2b0'); }
}

function cartao(motivo: (s: Surf, c: string, g: number) => void, cor: string, grau: number, seed: number): Surf {
  const g = Math.max(1, Math.min(5, grau));
  const s = new Surf(32, 32);
  s.gradiente(1, 1, 30, 30, [mix(cor, '#0a0820', 0.72), '#120d2c', '#07051a']);
  s.halo(16, 16, 15, cor, 0.55);
  for (let i = 0; i < 5 + g * 2; i++) s.set(2 + ((seed >> i) & 31) * 0.9 + (i % 3), 2 + ((seed >> (i + 5)) & 31) * 0.9, mix(cor, '#ffffff', 0.5));
  const it = new Surf(32, 32);
  motivo(it, cor, g);
  it.contorno();
  s.colar(it, 0, 0);
  moldura(s, g, seed);
  return s;
}

export function item(it: Item, size: number): string {
  const c = PAL[hash(it.id) % PAL.length], cor = it.kind === 'artefato' || it.kind === 'anel' ? PAL[(hash(it.id) >>> 3) % PAL.length] : c;
  const url = png(`i|${it.id}|${it.grade}`, () => cartao(GLIFOS[itemMotif(it)], cor, it.grade, hash(it.id)));
  return imagemSvg(url, 32, 32, 'art art-item', it.name, size);
}

function selo(glifo: (s: Surf, c: string) => void, cor: string, g: number, sementes: number): Surf {
  const s = new Surf(32, 32);
  s.elipse(16, 16, 15, 15, mix(cor, '#0a0820', 0.8), true);
  s.halo(16, 16, 13, cor, 0.5);
  const it = new Surf(32, 32);
  glifo(it, cor);
  it.contorno();
  s.colar(it, 0, 0);
  const gc = GRAU[Math.max(1, Math.min(5, g + 1))];
  for (let a = 0; a < 6.3; a += 0.045) { s.set(16 + Math.cos(a) * 15.2, 16 + Math.sin(a) * 15.2, K); s.set(16 + Math.cos(a) * 14.4, 16 + Math.sin(a) * 14.4, gc); }
  if (g >= 3) for (let a = 0; a < 6.3; a += 0.06) s.set(16 + Math.cos(a) * 13.4, 16 + Math.sin(a) * 13.4, mix(gc, K, 0.5));
  if (g >= 4) for (let i = 0; i < 8; i++) s.set(16 + Math.cos(i * 0.785 + 0.3) * 15, 16 + Math.sin(i * 0.785 + 0.3) * 15, '#fff2b0');
  void sementes;
  return s;
}

const TRILHAS: Record<string, [string, (s: Surf, c: string) => void]> = {
  sopro: [AZ, (s, c) => { for (const y of [10, 16, 22]) for (let x = 5; x < 27; x++) s.set(x, y + Math.round(Math.sin(x / 2.6 + y) * 2), x % 5 < 4 ? c : '#e8f1ff'); }],
  espada: [PR, (s) => { s.poli([[16, 3], [20, 8], [20, 23], [12, 23], [12, 8]], '#dfe8f4'); s.rect(7, 23, 18, 3, AM); s.rect(14, 26, 4, 5, VM); s.linha(16, 6, 16, 22, W); }],
  alquimia: [AM, (s, c) => { s.elipse(16, 21, 10, 7, '#4a4658'); s.rect(5, 14, 22, 3, c); pts(s, [[11, 10], [11, 7], [12, 4], [17, 10], [17, 7], [18, 3], [22, 10], [22, 8]], LJ); }],
  corpo: [VM, (s, c) => { s.poli([[7, 27], [7, 15], [11, 9], [15, 9], [16, 13], [17, 9], [21, 9], [25, 15], [25, 27]], c); s.rect(12, 17, 2, 6, K); s.rect(15, 16, 2, 7, K); s.rect(18, 17, 2, 6, K); }],
  alma: [RX, (s, c) => { s.poli([[3, 16], [16, 5], [29, 16], [16, 27]], '#f0ecff'); s.elipse(16, 16, 6, 6, c); s.elipse(16, 16, 2.4, 2.4, K); pts(s, [[17, 15]], W); }],
  formacoes: [VD, (s, c) => { s.poli([[16, 3], [28, 10], [28, 22], [16, 29], [4, 22], [4, 10]], '#1d3a5a'); s.linha(16, 3, 16, 29, c); s.linha(4, 10, 28, 22, c); s.linha(28, 10, 4, 22, c); s.elipse(16, 16, 4, 4, c); }],
  budista: [AM, (s, c) => { s.poli([[16, 28], [8, 20], [5, 13], [11, 14], [16, 21], [21, 14], [27, 13], [24, 20]], c); s.poli([[16, 22], [13, 14], [16, 6], [19, 14]], '#fff4cf'); s.rect(9, 29, 14, 2, c); }],
  venenos: [VD, (s, c) => { s.poli([[16, 3], [25, 16], [25, 22], [16, 29], [7, 22], [7, 16]], c); pts(s, [[11, 18], [11, 20], [12, 22]], W); s.rect(12, 22, 2, 4, '#efe9d0'); s.rect(18, 22, 2, 4, '#efe9d0'); }],
  bestas: ['#ff9a3c', (s, c) => { s.elipse(16, 21, 7, 6, c); s.elipse(7, 15, 3, 3.4, c); s.elipse(13, 8, 3, 3.4, c); s.elipse(20, 8, 3, 3.4, c); s.elipse(26, 15, 3, 3.4, c); }],
  demoniaca: ['#d12a4a', (s, c) => { s.poli([[16, 29], [8, 21], [8, 12], [13, 15], [16, 7], [19, 15], [24, 12], [24, 21]], c); pts(s, [[13, 21], [19, 21]], W); s.trago(5, 5, 10, 12, '#2a0f1e', 2); s.trago(27, 5, 22, 12, '#2a0f1e', 2); }],
};
export function path(id: string, size: number): string {
  const [cor, g] = TRILHAS[id] ?? TRILHAS.sopro;
  return imagemSvg(png(`p|${id}`, () => selo(g, cor, 2, 0)), 32, 32, 'art art-path', id, size);
}

export function realm(ladder: string, tier: number, size: number): string {
  const n = Math.min(8, tier), murim = ladder === 'murim';
  const cor = ['#9aa3ad', PR, VD, AM, AZ, RX, RS, LJ, '#fff0a0'][n];
  return imagemSvg(png(`r|${ladder}|${n}`, () => {
    const s = new Surf(32, 32);
    s.elipse(16, 16, 15, 15, '#120d2c', true);
    s.halo(16, 16, 14, cor, 0.25 + n * 0.06);
    const aneis = Math.min(5, 1 + Math.floor(n / 2));
    for (let i = 0; i < aneis; i++) {
      const r = 13 - i * 2.3;
      for (let a = 0; a < 6.3; a += 0.04) {
        const x = murim ? 16 + Math.sign(Math.cos(a)) * r * Math.pow(Math.abs(Math.cos(a)), 1) : 16 + Math.cos(a) * r;
        const y = murim ? 16 + Math.sign(Math.sin(a)) * r * Math.pow(Math.abs(Math.sin(a)), 1) : 16 + Math.sin(a) * r;
        s.set(x, y, i === 0 ? cor : mix(cor, '#120d2c', 0.35 + i * 0.1));
      }
    }
    s.elipse(16, 16, 2 + n * 0.5, 2 + n * 0.5, cor);
    if (n >= 4) pts(s, [[16, 3], [16, 29], [3, 16], [29, 16]], '#fff2b0');
    if (n >= 8) for (let i = 0; i < 12; i++) s.set(16 + Math.cos(i * 0.5236) * 15, 16 + Math.sin(i * 0.5236) * 15, '#fff2b0');
    for (let a = 0; a < 6.3; a += 0.045) { s.set(16 + Math.cos(a) * 15.3, 16 + Math.sin(a) * 15.3, K); }
    return s;
  }), 32, 32, 'art art-realm', `Reino ${tier}`, size);
}
