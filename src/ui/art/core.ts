/**
 * Núcleo do sistema de arte (SVG gerado por código; nada de imagens externas).
 * As cores vêm das variáveis CSS do tema (var(--jade) etc.), então tudo acompanha claro/escuro.
 */

/** Hash estável de texto para 32 bits. */
export function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/** Gerador pseudoaleatório pequeno e determinístico (mulberry32). */
export function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Paleta "Tinta e Jade". Valores entre var() herdam o tema; os fixos são tons de pele, cabelo e metais. */
export const C = {
  ink: 'var(--ink)',
  bg: 'var(--bg)',
  bg2: 'var(--bg2)',
  card: 'var(--card)',
  line: 'var(--line)',
  muted: 'var(--muted)',
  red: 'var(--red)',
  jade: 'var(--jade)',
  gold: 'var(--gold)',
  blue: 'var(--blue)',
  violet: '#8a6fb8',
  bone: '#e9dfc6',
  steel: '#aab4bd',
  dark: '#1b1612',
  blood: '#8f1f2b',
  fire: '#e0742f',
  skin: ['#f0cfa8', '#e3b98b', '#c99468', '#a9744c', '#7c5236'],
  hair: ['#17120e', '#2a1d14', '#4a3322', '#6b4a2a'],
};

/** Cor da moldura por grau de raridade (1 a 5). */
export const GRADE_COLOR = ['', '#8a8f94', '#b07a4a', 'var(--jade)', 'var(--blue)', 'var(--gold)'];
export const GRADE_NAME = ['', 'Comum', 'Boa', 'Rara', 'Épica', 'Lendária'];

export function svg(w: number, h: number, body: string, cls = 'art', title = ''): string {
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" ${title ? `aria-label="${title.replace(/"/g, '')}"` : 'aria-hidden="true"'} xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

/** Placa quadrada de 64x64 com moldura que muda conforme o grau (1 a 5). */
export function plate(grade: number, inner: string, id = 'p'): string {
  const col = GRADE_COLOR[Math.max(1, Math.min(5, grade))];
  const orn = grade >= 4
    ? `<path d="M6 16V6h10M48 6h10v10M58 48v10H48M16 58H6V48" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round"/>`
    : '';
  const glow = grade >= 3 ? `<circle cx="32" cy="32" r="26" fill="${col}" opacity="${grade >= 5 ? 0.22 : 0.13}"/>` : '';
  const crown = grade >= 5 ? `<path d="M26 7l3 4 3-5 3 5 3-4" fill="none" stroke="${col}" stroke-width="1.6" stroke-linejoin="round"/>` : '';
  return `<rect x="2" y="2" width="60" height="60" rx="11" fill="${C.bg2}" stroke="${col}" stroke-width="${grade >= 4 ? 3 : 2.2}"/>${glow}${orn}${crown}<g id="${id}">${inner}</g>`;
}
