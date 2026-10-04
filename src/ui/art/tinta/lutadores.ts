import { FOE_CREATURES, FOE_HUMAN, PATH_FIGHT, type Human, type Weapon } from '../lutadores';
import { mix } from '../cor';
import { PAPEL, TINTA, VERM, arco, disco, lavis, nevoa, traco as t } from './base';

const circ = (cx: number, cy: number, r: number) => `M${cx} ${cy - r}a${r} ${r} 0 1 0 0.01 0z`;
const PELE = '#ecc9a2', OCRE = '#c99a3a', MARROM = '#7a4a2a', PRATA = '#9aa4b4';
const AURA = ['#9aa0aa', '#aab4c4', '#5a9a82', '#c99a3a', '#3f5f9a', '#7a5aa0', '#c9748a', '#d8742a', '#b3262b'];

/** Roupas e cabelo em tons de pigmento, mais apagados que os do estilo manhwa. */
const pigmento = (c: string) => mix(c, '#8a8478', 0.28);

function arma(w: Weapon, c: string): string {
  switch (w) {
    case 'espada': return t([[90, 84], [119, 38]], 4.6, { cor: PRATA, seco: true, fim: 0.08 }) + t([[84, 80], [98, 92]], 4, { cor: OCRE, fim: 0.7 }) + t([[86, 88], [80, 96]], 3.2, { cor: VERM });
    case 'cutelo': return lavis('M92 80l24-22 8 8-16 22z', PRATA, 0.85) + t([[92, 80], [116, 58], [124, 66]], 2.2, { fim: 0.4 }) + t([[88, 86], [96, 76]], 3.4, { cor: MARROM });
    case 'adaga': return t([[90, 82], [114, 68]], 3.6, { cor: PRATA, fim: 0.1, seco: true }) + t([[86, 86], [92, 80]], 3, { cor: c });
    case 'cajado': return t([[97, 22], [96, 136]], 3.6, { cor: MARROM, fim: 0.6 }) + disco(97, 18, 6, c, 0.85);
    case 'orbe': return disco(102, 70, 12, c, 0.55) + t(arco(102, 70, 14, 14, -2.4, 3.4, 12), 1.8, { cor: c, fim: 0.2 }) + t([[112, 54], [116, 48]], 1.6, { cor: c });
    case 'talisma': return lavis('M94 52h16v32H94z', '#e7c24a', 0.9) + t([[98, 58], [106, 58]], 2.2, { cor: VERM }) + t([[102, 58], [102, 76]], 2.4, { cor: VERM }) + t([[97, 66], [107, 66]], 2, { cor: VERM });
    case 'dardo': return t([[88, 84], [118, 72]], 3, { cor: c, fim: 0.05 }) + t([[116, 73], [122, 70]], 3, { cor: TINTA });
    case 'frasco': return lavis('M93 66h14v10a7 7 0 0 1-14 0z', c, 0.85) + t([[97, 66], [97, 60]], 2.4) + t([[103, 66], [103, 60]], 2.4);
    case 'garra': return t([[88, 78], [100, 70], [106, 60]], 3, { cor: c, fim: 0.05 }) + t([[90, 83], [104, 78], [112, 68]], 3, { cor: c, fim: 0.05 }) + t([[90, 88], [106, 88], [114, 80]], 3, { cor: c, fim: 0.05 });
    case 'contas': return t(arco(96, 86, 12, 10, 0.2, 3, 10), 3.4, { cor: OCRE, fim: 0.9 }) + disco(104, 76, 4, OCRE, 0.85);
    case 'punho': return lavis(circ(102, 78, 9), '#b84a3a', 0.75) + t(arco(102, 78, 9.4, 9.4, -2.6, 2.6, 10), 2.2);
    default: return '';
  }
}

function humano(h: Human, aura?: string): string {
  const roupa = pigmento(h.robe), pele = h.skin ?? PELE, cabelo = h.hair && h.hair !== '#17120e' ? mix(h.hair, '#000', 0.4) : TINTA;
  let o = `<ellipse cx="58" cy="133" rx="30" ry="4.5" fill="${TINTA}" opacity=".16"/>`;
  if (aura) o += `<ellipse cx="58" cy="132" rx="28" ry="5" fill="${aura}" opacity=".28"/>`;
  // manto solto ao vento
  o += lavis('M44 60C28 72 14 98 6 126l32-8 12-26z', roupa, 0.6) + t([[44, 62], [24, 88], [8, 122]], 3.4, { cor: TINTA, fim: 0.05, seco: true });
  // pernas em guarda
  o += t([[52, 98], [42, 116], [34, 132]], 7, { cor: '#3a3445', fim: 0.6 }) + t([[64, 100], [76, 116], [90, 130]], 7, { cor: '#2f2a3c', fim: 0.6 }) + t([[30, 132], [46, 132]], 3.2, { cor: TINTA }) + t([[84, 132], [100, 132]], 3.2, { cor: TINTA });
  // braço de trás
  o += t([[48, 66], [37, 82], [35, 92]], 6, { cor: roupa, fim: 0.6 }) + disco(34, 94, 4.4, pele, 0.95);
  // tronco
  o += lavis('M44 60Q62 50 80 62l12 46H36z', roupa, 0.9) + t([[44, 60], [36, 108]], 3.2, { fim: 0.2 }) + t([[80, 62], [92, 108]], 2.4, { fim: 0.2 }) + t([[52, 58], [66, 82], [80, 58]], 3, { cor: mix(h.trim, '#ffffff', 0.2), fim: 0.4 }) + t([[38, 96], [90, 98]], 4.4, { cor: mix(h.trim, '#000', 0.2), ataque: 0.2, fim: 0.5 });
  // braço da frente + arma
  o += t([[76, 64], [92, 78], [95, 84]], 6, { cor: roupa, fim: 0.6 }) + disco(94, 84, 4.6, pele, 0.95) + arma(h.weapon, h.wcol ?? OCRE);
  // cabeça
  o += lavis(circ(58, 40, 12), pele, 0.95) + t(arco(58, 40, 12.4, 12.4, -2.7, 2.1, 10), 2, { fim: 0.2 });
  if (h.bald) o += t([[50, 32], [58, 28], [66, 32]], 1.2, { cor: '#fff', op: 0.6 });
  else if (h.hood) o += lavis('M40 42C38 20 50 12 60 12s24 8 22 30c-4-12-12-18-22-18S44 30 40 42z', roupa, 0.9) + t([[40, 42], [38, 22], [60, 12], [82, 22]], 2.6, { fim: 0.3 });
  else o += `<path d="M45 40C42 24 52 15 62 16s14 10 12 22c-2-8-8-13-16-13S47 32 45 40Z" fill="${cabelo}"/>` + t([[50, 26], [32, 28], [16, 46]], 6, { cor: cabelo, fim: 0.04, ataque: 0.2 }) + disco(60, 13, 5, cabelo, 0.95);
  if (h.mask) o += lavis('M52 41h22v10q-11 5-22 0z', '#2a2638', 0.9);
  if (h.horns) o += t([[50, 28], [44, 14]], 3.6, { cor: TINTA, fim: 0.1 }) + t([[68, 26], [74, 12]], 3.2, { cor: TINTA, fim: 0.1 });
  o += t([[62, 39], [68, 38]], 2.2, { ataque: 0.3, fim: 0.3 }) + t([[61, 34], [70, 35.6]], 2, { ataque: 0.6, fim: 0.1 });
  if (h.eye) o += `<circle cx="66" cy="40" r="2" fill="${VERM}"/>`;
  return o + t([[64, 47], [68, 47.4]], 1.4, { cor: VERM, op: 0.8 });
}

export function jogador(path: string, tier: number): string {
  const h = PATH_FIGHT[path] ?? PATH_FIGHT[''];
  const ac = AURA[Math.min(8, tier)];
  let o = `<ellipse cx="58" cy="84" rx="${34 + tier * 2}" ry="${54 + tier}" fill="${ac}" opacity="${0.08 + Math.min(0.16, tier * 0.02)}" filter="url(#tnevoa)"/>`;
  const aneis = Math.min(4, 1 + Math.floor(tier / 2));
  for (let i = 0; i < aneis; i++) o += t(arco(58, 130 - i * 1.5, 28 + i * 8, 6 + i * 2, 0, Math.PI * 2 - 0.4 - i * 0.2, 14), i ? 1.2 : 2, { cor: ac, op: 0.85 - i * 0.2, fim: 0.1, seed: 'a' + i });
  if (tier >= 6) o += t(arco(60, 40, 24, 24, -2.4, 3.4, 16), 2, { cor: '#c8a028', op: 0.85, fim: 0.2 });
  if (path === 'bestas') o += lavis('M8 128a16 10 0 1 0 32 0 16 10 0 0 0-32 0z', '#c0763a', 0.85) + t([[12, 118], [8, 106], [20, 112]], 2.6, { cor: '#c0763a' }) + t([[30, 118], [34, 106], [22, 112]], 2.6, { cor: '#c0763a' }) + `<circle cx="18" cy="124" r="1.6" fill="${TINTA}"/><circle cx="30" cy="124" r="1.6" fill="${TINTA}"/>` + t([[40, 126], [52, 122], [54, 110]], 4, { cor: '#c0763a', fim: 0.2 });
  return o + humano({ ...h, robe: h.robe }, ac);
}

const CRIATURA: Record<string, () => string> = {
  espectro: () => lavis('M30 56Q58 18 86 56v58q-6 10-14 0t-14 8-14-8-14 6z', '#cfd8e8', 0.7) + t([[30, 56], [58, 22], [86, 56]], 2.2, { fim: 0.4, op: 0.8 }) + t([[44, 70], [54, 72]], 3, { cor: ANIL() }) + t([[64, 72], [74, 70]], 3, { cor: ANIL() }) + lavis('M52 88a6 9 0 1 0 12 0 6 9 0 0 0-12 0z', TINTA, 0.8) + t([[86, 74], [110, 82], [112, 100]], 5, { cor: '#cfd8e8', op: 0.7, fim: 0.05 }),
  lobo: () => lavis('M26 106q0-28 28-32l26-10q16 0 24 12l-8 8q-6-6-14-4l-6 8 4 12h-8l-4-10-24 2-6 12h-8z', '#aab4c4', 0.8) + t([[26, 104], [30, 80], [54, 72], [82, 62], [100, 70]], 3.4, { fim: 0.3, seco: true }) + t([[84, 66], [92, 52], [98, 66]], 2.6) + t([[100, 74], [112, 80]], 2.4, { cor: TINTA }) + disco(96, 74, 2.4, OCRE, 0.95) + t([[40, 98], [38, 132]], 3.4) + t([[56, 100], [56, 132]], 3.4) + t([[74, 100], [76, 132]], 3.4) + t([[88, 96], [92, 132]], 3.4) + t([[26, 98], [10, 100], [8, 112]], 4, { cor: '#aab4c4', fim: 0.1 }),
  tigre: () => lavis('M22 106q0-30 30-34l30-8q20 0 28 14l-8 10q-8-6-16-4l-4 10 4 12h-10l-6-12-24 2-8 12H24z', '#d8964a', 0.85) + [[40, 78, 44, 94], [54, 74, 58, 92], [68, 70, 72, 88], [82, 70, 84, 82]].map(([a, b, c, d], i) => t([[a, b], [c, d]], 3.6, { fim: 0.1, seed: 's' + i })).join('') + t([[22, 104], [30, 80], [52, 72], [82, 64], [104, 72]], 3, { fim: 0.3 }) + t([[84, 66], [92, 52], [98, 66]], 2.6) + disco(102, 76, 2.4, TINTA, 0.95) + t([[40, 98], [40, 132]], 3.6) + t([[56, 100], [56, 132]], 3.6) + t([[76, 100], [78, 132]], 3.6) + t([[92, 96], [96, 132]], 3.6) + t([[22, 100], [8, 100], [6, 112]], 4.4, { cor: '#d8964a', fim: 0.1 }),
  serpente: () => t([[14, 124], [54, 122], [88, 114], [96, 84], [90, 56], [92, 40]], 18, { cor: '#4f7a58', ataque: 0.1, fim: 0.5, seco: true }) + t([[14, 120], [54, 118], [86, 110]], 2, { cor: PAPEL, op: 0.5, fim: 0.2 }) + lavis('M82 40q4-14 20-14 12 0 12 10-8 8-18 8z', '#4f7a58', 0.95) + disco(104, 32, 2.4, OCRE, 0.95) + t([[114, 38], [124, 40]], 2, { cor: VERM }),
  golem: () => lavis('M34 50h52v54H34z', '#8a8f9a', 0.85) + lavis('M42 22h36v30H42z', '#9aa0aa', 0.9) + lavis('M38 104h18v28H38zM64 104h18v28H64z', '#7a808c', 0.9) + lavis('M86 58h24v38H86zM18 58h16v34H18z', '#8a8f9a', 0.85) + t([[34, 50], [86, 50], [86, 104], [34, 104], [34, 50]], 2.6, { fim: 0.9 }) + t([[42, 22], [78, 22], [78, 50]], 2.4, { fim: 0.6 }) + t([[47, 35], [56, 35]], 3.2, { cor: OCRE }) + t([[62, 35], [71, 35]], 3.2, { cor: OCRE }) + t([[46, 70], [58, 78], [50, 92]], 2, { cor: '#4f7a58' }),
  dragao: () => t([[8, 120], [32, 110], [52, 108], [74, 96], [90, 100], [92, 74], [88, 50], [96, 30]], 16, { cor: '#4a78a8', ataque: 0.1, fim: 0.25, seco: true }) + t([[8, 116], [32, 106], [52, 104], [74, 92]], 1.6, { cor: PAPEL, op: 0.6 }) + lavis('M90 26q6-14 22-12l8 8-8 14z', '#4a78a8', 0.95) + t([[98, 16], [94, 4]], 2.6, { cor: OCRE }) + t([[108, 14], [112, 2]], 2.6, { cor: OCRE }) + disco(108, 22, 2.4, VERM, 0.95) + t([[118, 26], [112, 38], [118, 46]], 1.8, { cor: TINTA }) + t([[60, 70], [46, 40]], 3, { cor: '#4a78a8' }) + t([[72, 66], [78, 36]], 3, { cor: '#4a78a8' }),
  raio: () => lavis('M16 54q-8 0-8-12 0-12 16-12 4-14 20-14 12 0 18 10 18-2 22 12 12 2 12 12 0 12-14 14H24q-8 0-8-10z', '#6a6e8a', 0.75) + t([[24, 40], [38, 34]], 1.6, { op: 0.6 }) + t([[64, 52], [50, 84], [66, 84], [52, 122]], 6, { cor: '#c8a028', ataque: 0.1, fim: 0.1 }) + t([[64, 52], [50, 84], [66, 84], [52, 122]], 1.6, { cor: TINTA }) + t([[26, 58], [18, 80]], 2.4, { cor: ANIL() }) + t([[98, 56], [92, 78]], 2.4, { cor: ANIL() }),
};
function ANIL() { return '#3f5f9a'; }

export function inimigo(id: string): string {
  if ((FOE_CREATURES as readonly string[]).includes(id)) return CRIATURA[id]() + nevoa(10, 124, 100, 12, PAPEL, 0.5);
  return humano(FOE_HUMAN[id] ?? FOE_HUMAN.cultivador);
}
