import { hash, prng } from '../core';
import { MOTIF } from '../scenes';
import { escuro, mix } from '../cor';
import { K, Surf, bayer, imagemSvg, png } from './surf';

const W = '#fff7e6';
type Ceu = [string, string, string, string];
const CEU: Record<string, Ceu> = {
  vilarejo: ['#ff9d5c', '#ffc07a', '#ffe0a0', '#fff2cc'], cidade: ['#6a4cc0', '#d8808a', '#f4a888', '#ffd9a0'], seita: ['#3f86e0', '#7cb4ec', '#b8dcf4', '#e8f6ff'],
  selva: ['#157a5a', '#3fb084', '#8ad8a8', '#d0f4c8'], montanha: ['#4a6ad8', '#7a98e8', '#b0c8f4', '#e8eeff'], ruinas: ['#7a4a6a', '#c88470', '#e8a880', '#ffe0b0'],
  deserto: ['#ff7a3a', '#ffa050', '#ffc878', '#fff0b0'], gelo: ['#3a9ae0', '#78c4f0', '#b8e4f8', '#f0ffff'], mar: ['#2a6ad8', '#58a0ec', '#98d0f4', '#d8f4ff'],
  reino_secreto: ['#2a1080', '#6a40c0', '#b078e0', '#f0b8ff'], submundo: ['#14060f', '#3a0f1e', '#7a2030', '#c8402a'], ceu: ['#2a5ad8', '#6a98f0', '#a8c8ff', '#fff0c8'],
};
const NOITE: Ceu = ['#05071a', '#0c1236', '#1c2860', '#3a4a90'];

/** Nuvem de pixels com topo claro e base azulada. */
function nuvem(s: Surf, x: number, y: number, w: number, c = '#ffffff') {
  s.elipse(x, y, w, 2.6, mix(c, '#9ab0d8', 0.35), true); s.elipse(x - w * 0.3, y - 1.6, w * 0.45, 2.4, c, true); s.elipse(x + w * 0.25, y - 2, w * 0.4, 2.6, c, true);
  s.rect(Math.round(x - w * 0.6), Math.round(y), Math.round(w * 1.2), 1, mix(c, '#9ab0d8', 0.2));
}
/** Cordilheira em silhueta com cume irregular e dithering para o ar (perspectiva atmosférica). */
function serra(s: Surf, r: () => number, base: number, amp: number, cor: string, luz: string) {
  let y = base - r() * amp;
  for (let x = 0; x < s.w; x++) {
    if (x % 7 === 0) y = base - r() * amp;
    const top = Math.round(y + Math.sin(x / 5) * 2);
    for (let j = top; j < s.h; j++) s.set(x, j, j === top ? luz : j < top + 3 && bayer(x, j) < 0.5 ? mix(cor, luz, 0.4) : cor);
  }
}
const pinheiro = (s: Surf, x: number, y: number, h: number, c = '#1f5a3d') => { s.rect(x, y - 2, 1, 3, '#5a3a24'); for (let i = 0; i < h; i++) { const w = 1 + Math.floor(i * 0.9); s.rect(x - Math.floor(w / 2), y - 3 - (h - 1 - i) * 2, w + 1, 2, i % 2 ? c : mix(c, W, 0.15)); } };
const casa = (s: Surf, x: number, y: number, w: number, tel: string, luz: string) => { s.rect(x, y - 7, w, 7, '#e8d4a8'); s.rect(x, y - 7, w, 1, '#fff0c8'); for (let i = 0; i < 5; i++) s.rect(x - 2 + i, y - 8 - i, w + 4 - 2 * i, 1, i % 2 ? tel : mix(tel, W, 0.2)); s.rect(x + Math.floor(w / 2) - 1, y - 4, 3, 4, '#5a3a24'); s.rect(x + 2, y - 5, 2, 2, luz); };
const pagode = (s: Surf, x: number, y: number, n: number, w0: number, tel = '#d8423a') => { for (let i = 0; i < n; i++) { const w = w0 - i * 3, yy = y - i * 7; s.rect(x - w + 1, yy - 4, 2 * w - 1, 4, '#f0dcb0'); s.rect(x - w + 3, yy - 3, 2, 3, '#5a3a24'); s.rect(x + w - 5, yy - 3, 2, 3, '#5a3a24'); s.rect(x - w - 2, yy - 6, 2 * w + 5, 2, tel); s.set(x - w - 3, yy - 7, tel); s.set(x + w + 3, yy - 7, tel); s.rect(x - w, yy - 7, 2 * w + 1, 1, mix(tel, W, 0.3)); } s.rect(x, y - n * 7 - 5, 1, 5, '#ffd35a'); };

function elementos(s: Surf, k: string, r: () => number, noite: boolean) {
  const luz = noite ? '#ffd877' : '#fff0b0';
  switch (k) {
    case 'vilarejo':
      s.gradiente(0, 46, 160, 14, ['#8bb04a', '#5a8a38', '#3f6a2a']);
      for (let i = 0; i < 4; i++) casa(s, 14 + i * 36 + Math.floor(r() * 6), 50 + Math.floor(r() * 3), 16 + Math.floor(r() * 4), i % 2 ? '#c8402a' : '#e0583a', luz);
      for (let x = 0; x < 160; x += 2) s.set(x, 56 + Math.round(Math.sin(x / 8) * 1), '#e8d098');
      for (let i = 0; i < 3; i++) { s.rect(30 + i * 3, 30 - i * 3, 2, 2, '#e8e8f0'); }
      pinheiro(s, 150, 54, 4); pinheiro(s, 6, 55, 3);
      for (let x = 0; x < 160; x += 6) s.linha(x, 52, x + 2, 59, '#4a7a2a');
      break;
    case 'cidade': {
      s.rect(0, 52, 160, 8, '#2a1f3a');
      for (let i = 0; i < 6; i++) { const x = 10 + i * 26, h = 14 + ((i * 7) % 4) * 5; s.rect(x, 52 - h, 15, h, '#5a3f6a'); s.rect(x, 52 - h, 15, 1, '#7a5f8a'); for (let j = 0; j < Math.floor(h / 6); j++) { s.rect(x + 3, 52 - h + 3 + j * 6, 2, 3, luz); s.rect(x + 9, 52 - h + 3 + j * 6, 2, 3, luz); } for (let q = 0; q < 4; q++) s.rect(x - 2 + q, 51 - h - q, 19 - 2 * q, 1, q % 2 ? '#d8423a' : '#ef6a5a'); }
      for (let i = 0; i < 12; i++) { s.rect(6 + i * 13, 54, 2, 2, '#ff5a3a'); s.halo(7 + i * 13, 54, 3, '#ff7a3a', 0.6); }
      pagode(s, 80, 40, 3, 11); break;
    }
    case 'seita':
      s.gradiente(0, 50, 160, 10, ['#7aa86a', '#4a7a4a', '#2f5a3a']);
      s.poli([[30, 56], [58, 26], [100, 20], [130, 56]], '#6a7e92'); s.poli([[40, 56], [60, 34], [90, 28]], '#7a92a8');
      for (let y = 28; y < 56; y += 3) s.rect(70 + Math.floor((y - 28) / 4), y, 8, 1, '#c8c0a8');
      pagode(s, 84, 30, 4, 12); pinheiro(s, 36, 55, 4); pinheiro(s, 124, 55, 5); pinheiro(s, 140, 56, 3);
      break;
    case 'selva':
      s.gradiente(0, 50, 160, 10, ['#0e5a3a', '#0a4a30', '#06301f']);
      for (let i = 0; i < 9; i++) { const x = 4 + i * 18 + Math.floor(r() * 6), h = 18 + Math.floor(r() * 16); s.rect(x, 56 - h, 2, h, '#3a2a22'); s.elipse(x + 1, 56 - h, 8, 6, i % 2 ? '#18a86a' : '#0f8a58'); s.elipse(x - 3, 56 - h + 2, 5, 3.4, '#3fd08a', true); s.elipse(x + 5, 56 - h + 2, 5, 3.4, '#0a6a42', true); }
      for (let i = 0; i < 12; i++) { const fx = Math.floor(r() * 160), fy = 20 + Math.floor(r() * 34); s.set(fx, fy, '#d8ff90'); s.halo(fx, fy, 3, '#d8ff90', 0.4); }
      break;
    case 'montanha':
      s.poli([[10, 56], [50, 12], [66, 32], [92, 4], [150, 56]], '#5a6aa8'); s.poli([[50, 12], [44, 24], [50, 21], [54, 27], [58, 22]], W); s.poli([[92, 4], [84, 18], [90, 15], [94, 21], [99, 15]], W);
      s.poli([[92, 4], [110, 30], [150, 56], [100, 56]], escuro('#5a6aa8', 0.25));
      s.linha(118, 30, 117, 56, '#d8f4ff'); s.linha(119, 30, 118, 56, '#bce8ff'); pinheiro(s, 30, 56, 4); pinheiro(s, 146, 56, 5);
      s.gradiente(0, 50, 160, 10, ['#9ab0d8', '#e8eeff', '#ffffff']); break;
    case 'ruinas':
      s.gradiente(0, 52, 160, 8, ['#6a5a4a', '#4a3a2a', '#2a1f18']);
      for (const [x, h] of [[26, 26], [48, 34], [74, 20]] as const) { s.rect(x, 54 - h, 5, h, '#c9b896'); s.rect(x, 54 - h, 1, h, '#e8d8b6'); s.rect(x + 4, 54 - h, 1, h, '#8a7a5a'); for (let q = 0; q < 3; q++) s.rect(x, 54 - h + 4 + q * 7, 5, 1, '#8a7a5a'); }
      s.rect(22, 18, 38, 4, '#d8c8a6'); s.rect(22, 18, 38, 1, '#f0e4c8'); s.rect(104, 36, 28, 18, '#a89a80'); s.rect(104, 36, 28, 1, '#c8baa0'); for (let i = 0; i < 4; i++) s.rect(106 + i * 7, 54 - i % 2 * 3 - 2, 5, 3, '#a89a80');
      for (let i = 0; i < 12; i++) s.set(90 + ((i * 7) % 20), 48 + ((i * 5) % 6), '#3ddc97'); s.linha(30, 20, 28, 30, '#3ddc97'); s.linha(52, 21, 56, 31, '#3ddc97');
      for (let i = 0; i < 14; i++) s.set(Math.floor(r() * 160), 14 + Math.floor(r() * 36), '#ffe9b0'); break;
    case 'deserto':
      s.poli([[0, 48], [30, 36], [60, 46], [100, 40], [130, 44], [160, 38], [160, 60], [0, 60]], '#e8923a'); s.poli([[0, 48], [30, 36], [36, 40], [10, 52]], '#fff0b0');
      s.gradiente(0, 52, 160, 8, ['#c8702a', '#a85a20', '#8a4818']);
      for (let x = 0; x < 160; x += 5) s.set(x, 50 + Math.round(Math.sin(x / 4) * 1.4), '#f4b868');
      s.rect(125, 38, 3, 16, '#3a9a5a'); s.rect(122, 44, 3, 2, '#3a9a5a'); s.rect(122, 40, 2, 5, '#3a9a5a'); s.rect(128, 42, 3, 2, '#3a9a5a'); s.rect(130, 38, 2, 5, '#3a9a5a');
      for (let i = 0; i < 6; i++) s.rect(10 + i * 4, 56 - (i % 2), 3, 1, '#f4ead0'); break;
    case 'gelo':
      s.gradiente(0, 52, 160, 8, ['#f0fbff', '#d8f0fa', '#bfe4f4']);
      for (const [x, h, w] of [[16, 34, 18], [44, 22, 12], [104, 30, 16], [132, 20, 14]] as const) s.poli([[x, 54], [x + w / 2, 54 - h], [x + w, 54]], '#bfeaff');
      for (let x = 0; x < 160; x++) { const y = 10 + Math.round(Math.sin(x / 14) * 5 + Math.sin(x / 6) * 2); s.set(x, y, '#6affc0'); s.set(x, y + 1, '#8affd8'); s.set(x, y + 2, bayer(x, y) < 0.5 ? '#b08aff' : '#6affc0'); }
      for (let i = 0; i < 18; i++) s.set(Math.floor(r() * 160), 14 + Math.floor(r() * 36), '#ffffff'); break;
    case 'mar':
      for (let j = 0; j < 22; j++) { const y = 28 + j; for (let x = 0; x < 160; x++) s.set(x, y, bayer(x, y) < (j / 22) ? '#1f4a9a' : '#2a6ac0'); }
      for (let i = 0; i < 4; i++) { const y = 34 + i * 6; for (let x = 0; x < 160; x++) if (Math.round(Math.sin(x / 4 + i * 2) * 1) === 1 && x % 2) s.set(x, y, '#98d0f4'); }
      s.rect(94, 40, 34, 4, '#7a4a2a'); s.rect(96, 44, 30, 1, '#5a3a24'); s.rect(110, 16, 2, 25, K); s.poli([[112, 17], [126, 38], [112, 38]], '#f4ead0'); s.poli([[109, 20], [98, 38], [109, 38]], '#ffd8a0');
      s.poli([[10, 32], [16, 24], [22, 32]], '#2a5a4a'); s.poli([[30, 31], [34, 26], [38, 31]], '#2a5a4a'); break;
    case 'reino_secreto':
      for (const [x, y, w] of [[18, 34, 26], [118, 28, 28], [72, 44, 20]] as const) { s.poli([[x, y], [x + w, y], [x + w - 3, y + 4], [x + w / 2, y + 12], [x + 3, y + 4]], '#7a5ad8'); s.rect(x, y - 1, w, 2, '#6aff9a'); }
      s.poli([[66, 52], [66, 28], [80, 14], [94, 28], [94, 52]], '#ffd86a'); s.rect(76, 34, 8, 18, '#fff6c0'); s.halo(80, 34, 16, '#fff6b0', 0.8);
      for (let i = 0; i < 24; i++) s.set(Math.floor(r() * 160), Math.floor(r() * 50), '#f4e0ff'); break;
    case 'submundo':
      s.rect(0, 52, 160, 8, '#1a0a14');
      for (let x = 0; x < 160; x++) { s.set(x, 54 + Math.round(Math.sin(x / 6) * 1), '#ff5a2a'); s.set(x, 55 + Math.round(Math.sin(x / 6) * 1), '#ffd070'); }
      for (let i = 0; i < 6; i++) { const x = 8 + i * 26 + Math.floor(r() * 6), h = 12 + Math.floor(r() * 14); s.poli([[x, 52], [x + 3, 52 - h], [x + 6, 52]], '#4a2a3a'); }
      s.halo(80, 30, 12, '#ff7a3a', 0.9); s.elipse(80, 30, 4, 4, '#ff7a3a');
      for (let i = 0; i < 16; i++) s.set(Math.floor(r() * 160), 14 + Math.floor(r() * 36), '#ffb060'); break;
    default: // ceu
      for (let i = 0; i < 4; i++) nuvem(s, 20 + i * 42, 48 + (i % 2) * 3, 22);
      s.poli([[66, 50], [66, 26], [80, 14], [94, 26], [94, 50]], '#ffe9a0'); s.rect(78, 30, 4, 20, '#8a6a30'); s.halo(80, 28, 20, '#fff6b0', 0.8);
      s.gradiente(0, 54, 160, 6, ['#ffffff', '#e8f0ff', '#d0e0ff']); break;
  }
}

function desenha(kind: string, seed: string, noite: boolean): Surf {
  const k = CEU[kind] ? kind : 'vilarejo', r = prng(hash(k + seed));
  const s = new Surf(160, 60);
  const [a, b, c, d] = noite ? NOITE : CEU[k];
  s.gradiente(0, 0, 160, 60, [a, b, c, d]);
  const sx = 25 + Math.floor(r() * 110), sy = 11 + Math.floor(r() * 9);
  if (noite) {
    for (let i = 0; i < 40; i++) s.set(Math.floor(r() * 160), Math.floor(r() * 36), bayer(i, i * 3) < 0.4 ? '#ffffff' : '#9ab0e8');
    s.halo(sx, sy, 12, '#cfd8ff', 0.7); s.elipse(sx, sy, 5, 5, '#f4f0ff'); s.elipse(sx - 2, sy - 1, 4, 4.4, b, true);
  } else if (k === 'submundo') {
    s.halo(sx, sy, 12, '#ff3a2a', 0.8); s.elipse(sx, sy, 5, 5, '#ff6a3a');
  } else {
    s.halo(sx, sy, 15, '#fff6c8', 0.9); s.elipse(sx, sy, 6, 6, '#fffbe6'); s.elipse(sx, sy, 6, 6, '#fffbe6', true);
    nuvem(s, 24 + Math.floor(r() * 30), 10 + Math.floor(r() * 8), 12); nuvem(s, 100 + Math.floor(r() * 40), 8 + Math.floor(r() * 10), 10, '#fff6f0');
  }
  if (k !== 'mar' && k !== 'gelo' && k !== 'montanha') { serra(s, r, 40, 12, mix(c, '#4a5a9a', 0.5), mix(c, W, 0.5)); serra(s, r, 47, 9, mix(c, '#2a3a6a', 0.6), mix(c, W, 0.3)); }
  elementos(s, k, r, noite);
  if (noite) for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { const px = s.get(x, y); if (px && bayer(x, y) < 0.38 && px[0] === '#') s.set(x, y, mix(px, '#0a0a30', 0.55)); }
  // vinheta pontilhada embaixo
  for (let j = 0; j < 8; j++) for (let x = 0; x < 160; x++) { const px = s.get(x, 59 - j); if (px && px[0] === '#' && bayer(x, j) < (1 - j / 8) * 0.55) s.set(x, 59 - j, escuro(px, 0.45)); }
  return s;
}

export function cenario(kind: string, seed: string, noite: boolean): string {
  return imagemSvg(png(`sc|${kind}|${seed}|${noite ? 1 : 0}`, () => desenha(kind, seed, noite)), 320, 120, 'art art-scene', kind);
}

/* ---------- Finais ---------- */
function motivo(s: Surf, m: string) {
  const Y = '#ffd35a', Rj = '#d94a3d';
  switch (m) {
    case 'sol': s.halo(80, 31, 28, '#fff6b0', 0.9); s.elipse(80, 31, 11, 11, '#ffd23a'); for (let i = 0; i < 16; i++) { const a = (i / 16) * 6.283; s.trago(80 + Math.cos(a) * 15, 31 + Math.sin(a) * 15, 80 + Math.cos(a) * 24, 31 + Math.sin(a) * 24, '#fff2b0', 1); } break;
    case 'laminas': s.trago(62, 52, 94, 12, '#dfe8f4', 3); s.trago(98, 52, 66, 12, '#c8d6ee', 3); s.trago(56, 50, 68, 44, Y, 3); s.trago(104, 50, 92, 44, Y, 3); break;
    case 'raio': s.poli([[88, 6], [70, 32], [80, 32], [72, 54], [92, 28], [82, 28]], '#ffe45a'); s.halo(80, 30, 20, '#6a8aff', 0.6); break;
    case 'chama': s.halo(80, 38, 24, '#ff6a2a', 0.8); s.poli([[80, 54], [64, 46], [62, 32], [72, 22], [74, 30], [80, 18], [86, 30], [90, 22], [98, 32], [96, 46]], '#ff6a2a'); s.poli([[80, 52], [74, 44], [76, 36], [80, 40], [84, 34], [86, 44]], '#ffd23a'); break;
    case 'fio': for (let x = 24; x < 138; x++) s.set(x, 44 - Math.round(Math.sin((x - 24) / 18) * 16 + (x - 24) * 0.04), Rj); s.elipse(24, 44, 3, 3, '#ff7a8a'); s.elipse(138, 20, 3, 3, '#ff7a8a'); break;
    case 'arvore': s.rect(78, 32, 5, 24, '#7a4a2a'); s.elipse(80, 22, 15, 12, '#2fcf7a'); s.elipse(68, 28, 9, 7, '#22b86a'); s.elipse(92, 28, 9, 7, '#22b86a'); break;
    case 'montanha': s.poli([[40, 54], [68, 18], [80, 32], [92, 12], [120, 54]], '#6a7ac8'); s.poli([[68, 18], [63, 26], [67, 24], [70, 28]], W); s.rect(98, 46, 12, 8, '#f0dcb0'); for (let i = 0; i < 4; i++) s.rect(96 + i, 45 - i, 16 - 2 * i, 1, Rj); break;
    case 'pagode': s.halo(80, 32, 24, Y, 0.5); for (let k = 0; k < 4; k++) { const w = 17 - k * 3, y = 52 - k * 10; s.rect(80 - w, y - 5, 2 * w, 5, '#f0dcb0'); s.rect(80 - w - 3, y - 8, 2 * w + 6, 3, Rj); } s.rect(80, 6, 1, 6, Y); break;
    case 'moeda': s.halo(80, 31, 24, Y, 0.7); s.elipse(80, 31, 14, 14, Y); s.rect(75, 26, 10, 10, '#7a5a10'); s.rect(77, 28, 6, 6, '#fff2b0'); break;
    case 'roda': s.halo(80, 31, 24, Y, 0.5); for (let a = 0; a < 6.3; a += 0.04) { s.set(80 + Math.cos(a) * 15, 31 + Math.sin(a) * 15, Y); s.set(80 + Math.cos(a) * 14, 31 + Math.sin(a) * 14, Y); } for (let i = 0; i < 8; i++) s.linha(80, 31, 80 + Math.cos(i * 0.785) * 15, 31 + Math.sin(i * 0.785) * 15, Y); s.elipse(80, 31, 3, 3, Y); break;
    case 'caldeirao': s.elipse(80, 42, 22, 13, '#3a3560'); s.rect(58, 30, 44, 4, Y); for (const x of [68, 80, 92]) { s.linha(x, 28, x - 2, 20, '#ff9a3c'); s.linha(x, 20, x + 2, 12, '#ffcf6a'); } break;
    case 'garra': for (const [x, y] of [[60, 14], [74, 10], [90, 10], [104, 18]]) s.trago(x, 54, x + (x - 80) * 0.1, y, '#f4ead0', 4); break;
    case 'vaso': s.poli([[70, 52], [70, 38], [64, 30], [64, 24], [96, 24], [96, 30], [90, 38], [90, 52]], '#3ddc97'); break;
    case 'estrada': s.trago(48, 56, 76, 44, '#c9b896', 8); s.trago(76, 44, 82, 28, '#c9b896', 6); s.trago(82, 28, 110, 8, '#c9b896', 4); s.rect(80, 20, 2, 12, K); s.poli([[82, 20], [92, 24], [82, 28]], Rj); break;
    case 'vazio': s.halo(80, 31, 28, '#a974ff', 0.8); s.elipse(80, 31, 14, 14, '#07051a'); for (let a = 0; a < 6.3; a += 0.05) { s.set(80 + Math.cos(a) * 15, 31 + Math.sin(a) * 15, '#a974ff'); s.set(80 + Math.cos(a) * 21, 31 + Math.sin(a) * 21, '#7a5ad8'); } break;
    case 'livro': s.poli([[55, 20], [80, 15], [105, 20], [105, 48], [80, 44], [55, 48]], '#e8d8b0'); s.linha(80, 15, 80, 44, K); for (const y of [24, 29, 34]) { s.linha(60, y, 76, y - 1, '#8a7a5a'); s.linha(84, y - 1, 100, y, '#8a7a5a'); } break;
    case 'sino': s.rect(79, 6, 2, 8, K); s.poli([[62, 46], [66, 26], [72, 16], [88, 16], [94, 26], [98, 46]], Y); s.rect(58, 46, 44, 4, '#d8a020'); s.elipse(80, 52, 4, 3, Y); break;
    case 'olho': s.poli([[48, 31], [80, 12], [112, 31], [80, 50]], '#f4f0ff'); s.elipse(80, 31, 11, 11, '#a974ff'); s.elipse(80, 31, 4, 4, K); s.set(84, 27, W); break;
    case 'rio': for (let x = 10; x < 150; x++) { const yy = 50 - Math.round((x - 10) * 0.2 + Math.sin(x / 12) * 6); s.rect(x, yy - 6, 1, 12, x % 3 ? '#4aa3ff' : '#8ad0ff'); } break;
    case 'trono': s.poli([[60, 52], [60, 22], [67, 13], [67, 24], [93, 24], [93, 13], [100, 22], [100, 52]], '#7a4a8a'); s.rect(67, 38, 26, 14, '#c8402a'); s.set(80, 20, Y); break;
    case 'mao': s.poli([[59, 50], [56, 33], [61, 31], [64, 40], [66, 18], [71, 17], [72, 34], [76, 14], [81, 16], [78, 36], [86, 24], [91, 27], [84, 52]], '#f6cfa6'); break;
    case 'coracao': s.halo(80, 31, 24, '#ff4d5e', 0.7); s.poli([[80, 52], [56, 34], [56, 22], [66, 16], [76, 20], [80, 26], [84, 20], [94, 16], [104, 22], [104, 34]], '#ff4d5e'); s.set(66, 22, W); s.set(67, 21, W); break;
    default: for (let a = 0; a < 6.3; a += 0.04) { s.set(80 + Math.cos(a) * 12, 31 + Math.sin(a) * 12, Y); s.set(80 + Math.cos(a) * 11, 31 + Math.sin(a) * 11, Y); } s.elipse(80, 31, 3, 3, Rj);
  }
}

export function final(endingId: string, titulo: string): string {
  const m = MOTIF[endingId] ?? 'arvore';
  return imagemSvg(png(`fi|${m}|${hash(endingId) % 7}`, () => {
    const s = new Surf(160, 60);
    const escura = ['chama', 'raio', 'vazio', 'laminas'].includes(m);
    const topo = m === 'sol' ? '#ff9d3a' : m === 'chama' ? '#7a1a2a' : m === 'raio' ? '#2a3a9a' : m === 'vazio' ? '#2a1070' : m === 'laminas' ? '#4a2a5a' : '#4a8ad8';
    s.gradiente(0, 0, 160, 60, [topo, mix(topo, escura ? '#080414' : '#fff0c8', 0.55), escura ? '#080414' : mix(topo, '#fff0c8', 0.8)]);
    const r = prng(hash(endingId));
    for (let i = 0; i < 20; i++) s.set(Math.floor(r() * 160), Math.floor(r() * 60), mix(topo, '#ffffff', 0.7));
    motivo(s, m);
    const OURO = '#ffd35a';
    for (let x = 2; x < 158; x++) { s.set(x, 0, K); s.set(x, 59, K); s.set(x, 1, OURO); s.set(x, 58, OURO); }
    for (let y = 2; y < 58; y++) { s.set(0, y, K); s.set(159, y, K); s.set(1, y, OURO); s.set(158, y, OURO); }
    for (const [x, y] of [[0, 0], [1, 0], [0, 1], [159, 0], [158, 0], [159, 1], [0, 59], [1, 59], [0, 58], [159, 59], [158, 59], [159, 58]]) s.set(x, y, null);
    return s;
  }), 320, 120, 'art art-ending', titulo);
}
