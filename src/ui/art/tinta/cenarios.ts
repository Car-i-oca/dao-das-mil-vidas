import { hash, prng } from '../core';
import { MOTIF } from '../scenes';
import { CINZA, PAPEL, TINTA, VERM, arco, disco, lavis, moldura, nevoa, papel, selo, svg, traco as t, type Pt } from './base';

const JADE = '#5a9a82', ANIL = '#3f5f9a', OCRE = '#c99a3a', MARROM = '#7a4a2a';
const TOM: Record<string, string> = {
  vilarejo: '#e9c58a', cidade: '#d9b48a', seita: '#a9c3c0', selva: '#9fc4a4', montanha: '#a9b8d0', ruinas: '#d2b496',
  deserto: '#ecc27a', gelo: '#bcd8e6', mar: '#9cbfd8', reino_secreto: '#b8a4d8', submundo: '#c88a8a', ceu: '#a8c0e0',
};
const circ = (cx: number, cy: number, r: number) => `M${cx} ${cy - r}a${r} ${r} 0 1 0 0.01 0z`;

/** Cadeia de montanhas em lavis com a linha de cume numa pincelada só e uns poucos traços de textura. */
function serra(r: () => number, base: number, amp: number, cor: string, op: number, cume = true): string {
  const pts: Pt[] = [];
  for (let x = -10; x <= 330; x += 34) pts.push([x, base - r() * amp]);
  let d = `M-10 120L-10 ${pts[0][1].toFixed(1)}`;
  for (const p of pts) d += `L${p[0]} ${p[1].toFixed(1)}`;
  d += 'L330 120z';
  let o = lavis(d, cor, op);
  if (cume) o += t(pts, 1.8, { op: Math.min(0.85, op + 0.15), ataque: 0.04, fim: 0.3, seed: 'c' + base });
  for (let i = 0; i < 4; i++) { const p = pts[1 + Math.floor(r() * (pts.length - 3))]; o += t([[p[0], p[1] + 3], [p[0] - 5, p[1] + 12]], 1.2, { op: 0.35, fim: 0.1, seed: 'x' + i + base }); }
  return o;
}
const pino = (x: number, y: number, s = 1) => t([[x, y], [x + 1 * s, y - 14 * s], [x, y - 26 * s]], 2.4 * s, { cor: MARROM, fim: 0.3 })
  + [0, 1, 2].map((i) => t([[x - 10 * s + i * 2, y - (8 + i * 7) * s], [x, y - (12 + i * 7) * s], [x + 10 * s - i * 2, y - (8 + i * 7) * s]], 3.2 * s - i * 0.5, { cor: '#3f6a4f', ataque: 0.3, fim: 0.3, seed: `p${x}${i}` })).join('');
const casa = (x: number, y: number, w: number, tel = '#6a5a4a') => t([[x - 3, y - 12], [x + w / 2, y - 22], [x + w + 3, y - 12]], 4, { cor: tel, ataque: 0.15, fim: 0.3, seed: `ca${x}` }) + t([[x, y - 12], [x, y]], 1.6) + t([[x + w, y - 12], [x + w, y]], 1.6) + t([[x - 4, y], [x + w + 4, y]], 1.4, { op: 0.8 }) + `<rect x="${x + w * 0.38}" y="${y - 9}" width="${w * 0.24}" height="9" fill="${TINTA}" opacity=".7"/>`;
const pagode = (x: number, y: number, s = 1, n = 3) => Array.from({ length: n }, (_, i) => {
  const yy = y - i * 13 * s, w = (22 - i * 4) * s;
  return t([[x - w, yy - 6 * s], [x - w * 0.4, yy - 2 * s], [x + w * 0.4, yy - 2 * s], [x + w, yy - 6 * s]], 3.4 * s, { cor: i === 0 ? VERM : TINTA, ataque: 0.1, fim: 0.5, seed: `pg${x}${i}` })
    + t([[x - w * 0.7, yy - 2 * s], [x - w * 0.7, yy + 8 * s]], 1.4) + t([[x + w * 0.7, yy - 2 * s], [x + w * 0.7, yy + 8 * s]], 1.4);
}).join('') + t([[x, y - n * 13 * s], [x, y - n * 13 * s - 9 * s]], 1.8);
const bambu = (x: number, y: number, h: number) => t([[x, y], [x + 1, y - h]], 3, { cor: '#3f6a4f', fim: 0.5 }) + [0.3, 0.55, 0.8].map((k) => t([[x - 2.4, y - h * k], [x + 2.4, y - h * k]], 1.2)).join('')
  + [0.5, 0.75, 0.95].map((k, i) => t([[x, y - h * k], [x + (i % 2 ? 11 : -11), y - h * k - 5]], 2, { cor: '#3f6a4f', fim: 0.05, seed: `bb${x}${i}` })).join('');

function elementos(k: string, r: () => number): string {
  switch (k) {
    case 'vilarejo': {
      let o = t([[0, 106], [90, 100], [200, 106], [320, 100]], 3, { op: 0.6, ataque: 0.05 }) + lavis('M0 108Q90 98 190 106T320 102V120H0z', '#8bb04a', 0.35);
      for (let i = 0; i < 4; i++) o += casa(34 + i * 70 + r() * 10, 100 - r() * 5, 28 + r() * 8, i % 2 ? '#6a4a3a' : '#7a5a4a');
      for (let i = 0; i < 3; i++) o += t([[20 + i * 100, 114], [60 + i * 100, 112]], 1, { op: 0.5 });
      return o + t([[66, 66], [62, 56], [67, 46]], 2, { op: 0.4 }) + pino(300, 104, 0.7);
    }
    case 'cidade': {
      let o = lavis('M0 104H320V120H0z', '#8a7a68', 0.4);
      for (let i = 0; i < 4; i++) o += pagode(40 + i * 82, 104, 0.7 + (i % 2) * 0.25, 2 + (i % 3));
      o += t([[0, 100], [320, 100]], 3.4, { op: 0.8, ataque: 0.02, fim: 0.9 });
      for (let i = 0; i < 8; i++) o += `<circle cx="${20 + i * 40}" cy="${98 - (i % 2) * 4}" r="2.4" fill="${VERM}" opacity=".85"/>`;
      return o;
    }
    case 'seita': {
      let o = serra(r, 76, 18, '#7a94a8', 0.5);
      o += lavis('M70 100L120 40 170 52 230 30 270 100z', '#6a7e92', 0.5) + t([[70, 100], [120, 42], [170, 54], [230, 32], [270, 100]], 2.4, { fim: 0.4 });
      o += pagode(190, 40, 0.8, 4) + pino(112, 52, 0.9) + pino(252, 96, 0.8) + t([[150, 100], [166, 76], [180, 52]], 1.4, { op: 0.7 });
      return o + nevoa(70, 86, 200, 20, PAPEL, 0.95);
    }
    case 'selva': {
      let o = '';
      for (let i = 0; i < 10; i++) o += bambu(10 + i * 34 + r() * 14, 116, 50 + r() * 54);
      o += lavis('M0 104Q80 96 160 106T320 100V120H0z', '#3f6a4f', 0.35);
      for (let i = 0; i < 5; i++) o += `<circle cx="${r() * 320}" cy="${60 + r() * 40}" r="1.6" fill="${OCRE}" opacity=".8"/>`;
      return o + nevoa(0, 72, 320, 16, PAPEL, 0.8);
    }
    case 'montanha': {
      let o = lavis('M30 112L112 22l30 40 44-54 100 100z', '#7686a0', 0.6) + t([[30, 112], [112, 24], [142, 64], [186, 10], [286, 112]], 3, { fim: 0.2, seco: true });
      o += lavis('M112 24L100 46l12-4 8 10 8-12z', '#fff', 0.9) + t([[238, 30], [236, 70], [238, 112]], 3.2, { cor: '#bcd8e6', op: 0.9, fim: 0.3 }) + pino(70, 112, 0.7) + pino(296, 112, 0.8);
      return o + nevoa(0, 92, 320, 22, PAPEL, 0.9);
    }
    case 'ruinas':
      return lavis('M0 106H320V120H0z', '#8a7a66', 0.4) + [56, 100, 150].map((x, i) => t([[x, 108], [x, 60 + i * 6]], 7, { cor: '#8a7a66', seco: true, fim: 0.7 }) + t([[x - 7, 62 + i * 6], [x + 7, 60 + i * 6]], 2.4)).join('')
        + t([[46, 58], [112, 56]], 5, { ataque: 0.1, fim: 0.7 }) + lavis('M210 108V76h54v32l-13-8-14 8-13-8z', '#8a7a66', 0.6) + t([[210, 108], [210, 76], [264, 76], [264, 108]], 2, { fim: 0.6 }) + t([[186, 108], [200, 94], [214, 100]], 2.2, { cor: JADE }) + t([[62, 70], [68, 82]], 2, { cor: JADE });
    case 'deserto':
      return lavis('M0 100Q70 76 140 98T280 88 320 96V120H0z', '#d89a52', 0.55) + t([[0, 100], [70, 78], [140, 98], [220, 84]], 2.2, { fim: 0.3 }) + lavis('M0 112Q90 98 180 112T320 106V120H0z', '#c4823f', 0.5)
        + t([[250, 108], [250, 74]], 4, { cor: '#4f7a58', fim: 0.4 }) + t([[250, 92], [240, 90], [240, 80]], 2.6, { cor: '#4f7a58' }) + t([[250, 86], [260, 84], [260, 76]], 2.6, { cor: '#4f7a58' }) + t([[30, 104], [60, 102]], 1, { op: 0.5 }) + t([[90, 110], [140, 108]], 1, { op: 0.5 });
    case 'gelo':
      return lavis('M0 104H320V120H0z', '#e8f2f6', 0.7) + lavis('M24 106L50 50l22 36 28-48 34 68z', '#bcd8e6', 0.7) + t([[24, 106], [50, 50], [72, 86], [100, 38], [134, 106]], 2.4, { fim: 0.4 }) + lavis('M184 106l22-44 18 28 24-36 28 52z', '#a8cce0', 0.7) + t([[184, 106], [206, 62], [224, 90], [248, 54], [276, 106]], 2.2, { fim: 0.4 })
        + t([[0, 34], [80, 46], [170, 30], [320, 44]], 5, { cor: '#9ad8c8', op: 0.4, fim: 0.9 });
    case 'mar': {
      let o = '';
      for (let i = 0; i < 4; i++) o += t([[0, 78 + i * 12], [60, 72 + i * 12], [120, 80 + i * 12], [190, 73 + i * 12], [260, 80 + i * 12], [320, 75 + i * 12]], 2 - i * 0.2, { op: 0.75, ataque: 0.04, fim: 0.5, seed: 'w' + i });
      o += lavis('M0 80Q80 70 160 80T320 76V120H0z', '#6a98c0', 0.28);
      o += t([[196, 90], [230, 96], [262, 88]], 4.4, { cor: MARROM, ataque: 0.1, fim: 0.5 }) + t([[230, 92], [230, 42]], 2.4) + lavis('M232 44L256 86H232z', '#f1e6c8', 0.95) + t([[232, 44], [256, 86]], 1.6) + lavis('M228 50L208 86h20z', '#f1e6c8', 0.9);
      return o + lavis('M20 80l12-14 12 14zM64 78l8-10 8 10z', '#4f7a58', 0.6) + nevoa(0, 64, 320, 12, PAPEL, 0.7);
    }
    case 'reino_secreto': {
      let o = '';
      for (const [x, y, w] of [[34, 64, 54], [246, 52, 60], [146, 88, 40]] as const) o += lavis(`M${x} ${y}h${w}q-${w / 2} 24-${w} 0z`, '#8a74c0', 0.5) + t([[x - 2, y], [x + w / 2, y - 6], [x + w + 2, y]], 2, { cor: JADE }) + t([[x + 6, y + 4], [x + w / 2, y + 18]], 1.2, { op: 0.5 });
      o += lavis('M128 100V54l32-26 32 26v46z', '#d8b84a', 0.55) + t([[128, 100], [128, 54], [160, 28], [192, 54], [192, 100]], 2.4, { fim: 0.6 }) + t([[160, 100], [160, 64]], 2);
      return o + nevoa(0, 92, 320, 20, PAPEL, 0.8) + Array.from({ length: 8 }, () => `<circle cx="${r() * 320}" cy="${r() * 70}" r="1.2" fill="#fff" opacity=".9"/>`).join('');
    }
    case 'submundo': {
      let o = lavis('M0 102H320V120H0z', '#3a2a36', 0.7);
      for (let i = 0; i < 6; i++) { const x = 20 + i * 54 + r() * 12, hh = 26 + r() * 30; o += t([[x, 104], [x + 4, 104 - hh]], 5, { cor: TINTA, fim: 0.1 }); }
      return o + t([[0, 110], [100, 106], [200, 112], [320, 108]], 3, { cor: VERM, op: 0.85, ataque: 0.05 }) + disco(160, 56, 8, VERM, 0.9);
    }
    default: // ceu: nuvens em espiral
      return [30, 120, 210].map((x, i) => t([[x, 96 - i * 4], [x + 18, 86 - i * 4], [x + 40, 94 - i * 4], [x + 58, 88 - i * 4]], 3, { op: 0.6, seed: 'n' + i }) + t(arco(x + 20, 90 - i * 4, 8, 6, 0, 5, 8), 1.4, { op: 0.6 })).join('')
        + lavis('M130 96V52l30-24 30 24v44z', '#e8d890', 0.6) + t([[130, 96], [130, 52], [160, 28], [190, 52], [190, 96]], 2.4, { fim: 0.6 }) + t([[160, 96], [160, 60]], 2) + nevoa(0, 92, 320, 24, PAPEL, 0.95);
  }
}

export function cenario(kind: string, seed: string, noite: boolean): string {
  const k = TOM[kind] ? kind : 'vilarejo', r = prng(hash(k + seed));
  let o = papel(320, 120, PAPEL, 0) + lavis('M0 0H320V70Q160 90 0 70z', TOM[k], 0.35);
  const sx = 50 + r() * 220, sy = 24 + r() * 14;
  o += noite ? disco(sx, sy, 10, '#f4efe0', 0.95) + disco(sx - 3, sy - 2, 9, '#d8d4c4', 0.35) : disco(sx, sy, 12, k === 'submundo' ? '#6a1a1a' : VERM, 0.88);
  if (k !== 'mar' && k !== 'gelo' && k !== 'montanha') o += serra(r, 80, 22, '#8a94a8', 0.3) + nevoa(0, 74, 320, 14, PAPEL, 0.85) + serra(r, 94, 16, '#6a7488', 0.4);
  o += elementos(k, r);
  if (noite) {
    o += `<rect width="320" height="120" fill="#1c2448" opacity=".5"/>` + Array.from({ length: 14 }, () => `<circle cx="${(r() * 320).toFixed(0)}" cy="${(r() * 60).toFixed(0)}" r="1" fill="#fff" opacity=".8"/>`).join('') + disco(sx, sy, 9, '#f4efe0', 0.95);
  }
  o += moldura(320, 120) + selo(292, 92, 16, k + seed);
  return svg(320, 120, o, 'art art-scene', kind);
}

/* ---------- Finais ---------- */
function motivo(m: string): string {
  switch (m) {
    case 'sol': return disco(160, 58, 24, VERM, 0.92) + t(arco(160, 58, 34, 34, -2.2, 3.4, 14), 1.8, { fim: 0.2, op: 0.7 }) + t([[160, 12], [160, 20]], 2) + t([[210, 58], [202, 58]], 2) + t([[110, 58], [118, 58]], 2);
    case 'laminas': return t([[126, 100], [190, 26]], 6, { seco: true, fim: 0.1 }) + t([[194, 100], [130, 26]], 5, { cor: CINZA, seco: true, fim: 0.1 }) + t([[118, 98], [140, 86]], 4.4, { cor: VERM }) + t([[202, 98], [180, 86]], 4.4, { cor: VERM });
    case 'raio': return t([[172, 16], [142, 62], [164, 62], [146, 108]], 7, { cor: '#c8a028', ataque: 0.1, fim: 0.1 }) + t([[172, 16], [142, 62], [164, 62], [146, 108]], 2, { cor: TINTA }) + t([[108, 40], [128, 52]], 2.4, { cor: ANIL, op: 0.7 }) + t([[212, 70], [194, 80]], 2.4, { cor: ANIL, op: 0.7 });
    case 'chama': return lavis('M160 106C128 92 122 64 142 42c4 14 14 14 18 0 4 14 14 14 18 0 20 22 14 50-18 64z', '#d8742a', 0.8) + t([[160, 106], [136, 80], [142, 42]], 3, { fim: 0.2 }) + t([[160, 100], [152, 84], [160, 66]], 2.4, { cor: '#c8a028' });
    case 'fio': return t([[50, 94], [100, 40], [160, 76], [270, 36]], 3.2, { cor: VERM, ataque: 0.05, fim: 0.3 }) + disco(50, 94, 5, VERM) + disco(270, 36, 5, VERM);
    case 'arvore': return t([[160, 108], [158, 80], [160, 56]], 6, { cor: MARROM, fim: 0.4, seco: true }) + [[160, 40, 28], [138, 56, 18], [182, 56, 18]].map(([x, y, rr]) => lavis(circ(x, y, rr), '#5a9a82', 0.6)).join('') + t([[160, 76], [142, 62]], 2.6, { cor: MARROM }) + t([[160, 72], [178, 60]], 2.6, { cor: MARROM });
    case 'montanha': return lavis('M80 108L136 36l24 30 26-42 56 84z', '#7686a0', 0.65) + t([[80, 108], [136, 36], [160, 66], [186, 24], [242, 108]], 3, { fim: 0.2, seco: true }) + t([[200, 100], [224, 100]], 4, { cor: MARROM }) + t([[196, 94], [212, 82], [228, 94]], 3, { cor: VERM }) + nevoa(70, 90, 180, 18, PAPEL, 0.9);
    case 'pagode': return pagode(160, 98, 1.1, 4) + nevoa(100, 92, 120, 16, PAPEL, 0.8);
    case 'moeda': return lavis(circ(160, 62, 28), '#c8a028', 0.8) + t(arco(160, 62, 28.6, 28.6, -2.4, 3.6, 14), 3.4) + `<rect x="151" y="53" width="18" height="18" fill="${PAPEL}" stroke="${TINTA}" stroke-width="2.2"/>`;
    case 'roda': return t(arco(160, 62, 30, 30, -2, 4.3, 16), 4.4, { cor: '#c8a028', ataque: 0.05, fim: 0.1 }) + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => t([[160, 62], [160 + Math.cos(i * 0.785) * 30, 62 + Math.sin(i * 0.785) * 30]], 2, { cor: '#c8a028' })).join('') + disco(160, 62, 7, '#c8a028');
    case 'caldeirao': return lavis('M116 62h88v16c0 22-20 34-44 34s-44-12-44-34z', '#4a4650', 0.8) + t([[110, 62], [210, 62]], 5, { fim: 0.4 }) + t([[134, 52], [128, 36], [136, 22]], 2.6, { op: 0.6 }) + t([[162, 52], [158, 32], [166, 16]], 3, { cor: VERM }) + t([[188, 52], [184, 38]], 2.4, { op: 0.6 });
    case 'garra': return [[122, 106, 142, 30], [152, 106, 162, 28], [182, 106, 186, 28], [212, 106, 196, 42]].map(([a, b, c, d], i) => t([[a, b], [(a + c) / 2 - 4, 70], [c, d]], 7, { seco: true, fim: 0.05, seed: 'g' + i })).join('');
    case 'vaso': return lavis('M140 104V76q-12-8-12-24h64q0 16-12 24v28z', '#5a9a82', 0.7) + t([[128, 52], [140, 76], [140, 104]], 2.6) + t([[192, 52], [180, 76], [180, 104]], 2, { fim: 0.2 }) + t([[126, 52], [194, 52]], 3.4, { fim: 0.5 });
    case 'estrada': return t([[96, 112], [150, 90], [160, 58], [224, 14]], 12, { cor: '#c9b896', ataque: 0.2, fim: 0.1 }) + t([[96, 112], [150, 90], [160, 58], [224, 14]], 1.4, { op: 0.7, fim: 0.3 }) + t([[160, 40], [160, 14]], 2) + lavis('M160 14l22 8-22 8z', VERM, 0.9);
    case 'vazio': return disco(160, 62, 30, TINTA, 0.9) + t(arco(160, 62, 42, 42, -2, 3.6, 16), 1.6, { op: 0.6, fim: 0.2 }) + t(arco(160, 62, 36, 36, 0.4, 5.4, 16), 1, { op: 0.5 });
    case 'livro': return lavis('M110 38l50-8 50 8v58l-50-8-50 8z', '#e0d0a8', 0.9) + t([[110, 38], [160, 30], [210, 38], [210, 96], [160, 88], [110, 96], [110, 38]], 2, { fim: 0.9 }) + t([[160, 30], [160, 88]], 2.4) + [48, 58, 68].map((y) => t([[122, y], [150, y - 2]], 1.6, { op: 0.6 }) + t([[172, y - 2], [200, y]], 1.6, { op: 0.6 })).join('');
    case 'sino': return t([[160, 12], [160, 26]], 3) + lavis('M126 92c0-30 8-58 34-58s34 28 34 58z', '#c99a3a', 0.8) + t([[160, 32], [132, 52], [126, 90]], 3.2) + t([[160, 32], [188, 52], [194, 90]], 2.4, { fim: 0.2 }) + t([[118, 94], [202, 94]], 5, { fim: 0.5, ataque: 0.2 }) + disco(160, 102, 5, '#c99a3a');
    case 'olho': return t([[96, 62], [160, 24], [224, 62]], 4, { ataque: 0.2, fim: 0.2 }) + t([[96, 62], [160, 100], [224, 62]], 3, { fim: 0.2 }) + disco(160, 62, 22, '#7a5aa0', 0.75) + disco(160, 62, 8, TINTA, 0.95);
    case 'rio': return t([[20, 102], [90, 64], [150, 82], [300, 40]], 20, { cor: '#9cbfd8', ataque: 0.1, fim: 0.3, op: 0.8 }) + t([[24, 96], [96, 62], [150, 76], [290, 38]], 2, { cor: ANIL, op: 0.8, fim: 0.3 }) + t([[40, 108], [104, 76], [158, 92], [280, 52]], 1.4, { cor: ANIL, op: 0.6, fim: 0.3 });
    case 'trono': return lavis('M120 104V44l14-18v22h52V26l14 18v60z', '#7a4a8a', 0.6) + t([[120, 104], [120, 44], [134, 26], [134, 48], [186, 48], [186, 26], [200, 44], [200, 104]], 3, { fim: 0.8 }) + lavis('M134 78h52v26h-52z', VERM, 0.8);
    case 'mao': return lavis('M118 100l-6-34 10-4 6 18 4-34 10-2 2 32 8-30 10 2-4 32 10-20 10 6-14 44z', '#e8c9a0', 0.85) + t([[118, 100], [112, 66], [122, 62]], 2, { fim: 0.5 }) + t([[134, 52], [140, 30]], 2) + t([[152, 50], [156, 28]], 2) + t([[172, 50], [178, 32]], 2);
    case 'coracao': return lavis('M160 98C112 70 112 34 138 32c12 0 20 8 22 16 2-8 10-16 22-16 26 2 26 38-22 66z', VERM, 0.8) + t([[160, 98], [118, 64], [124, 36], [140, 34], [160, 50]], 2.8, { fim: 0.2 }) + t([[160, 50], [180, 34], [196, 36], [200, 62]], 2, { fim: 0.3 });
    default: return t(arco(160, 62, 24, 24, -2.4, 3.6, 14), 4, { cor: '#c8a028' }) + disco(160, 62, 4, VERM);
  }
}

export function final(endingId: string, titulo: string): string {
  const m = MOTIF[endingId] ?? 'arvore';
  const escura = ['chama', 'raio', 'vazio', 'laminas'].includes(m);
  let o = papel(320, 120, PAPEL, 14) + lavis('M0 0H320V70Q160 94 0 70z', m === 'sol' ? '#e8b46a' : escura ? '#8a8aa8' : '#a9c3c0', 0.3);
  o += nevoa(40, 92, 240, 22, PAPEL, 0.8) + motivo(m);
  if (escura) o += `<rect width="320" height="120" rx="14" fill="#2a2a44" opacity=".16"/>`;
  o += moldura(320, 120, TINTA) + selo(290, 90, 18, endingId);
  return svg(320, 120, o, 'art art-ending', titulo);
}
