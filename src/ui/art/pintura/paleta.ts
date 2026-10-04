/**
 * Paleta fixa do jogo para o pixel art "pintado": cores naturais e um pouco dessaturadas (verdes de floresta, pele rosada,
 * castanhos), com acentos quentes de luz (amarelos). Toda peça é pintada em alta resolução e quantizada para estas cores,
 * sem pontilhado.
 */
export const PAL = {
  tinta: ['#120e18', '#241a28', '#382a38'],
  pele: ['#fbe6dc', '#f3d3c8', '#e6b4aa', '#cf948f', '#a56a72', '#7a4658'],
  peleEscura: ['#e8c09c', '#cf9c78', '#aa7656', '#80533c', '#5a3828'],
  nariz: ['#e4a88c', '#c98672'],
  cabelo: ['#2a1a12', '#432a1a', '#5f3d22', '#7f5430', '#a2713a', '#c99645'],
  cabeloEscuro: ['#0e0c14', '#1c1824', '#2e2838', '#463f56'],
  cabeloBranco: ['#6c6c80', '#9a9aae', '#c4c4d2', '#e6e6ee', '#fafaff'],
  luz: ['#c8901c', '#e8b830', '#f6d64c', '#fff0a0'],
  folha: ['#0c1a13', '#12291c', '#1b4028', '#285a34', '#3a7842', '#58985a', '#82b46c', '#b0d08a'],
  panoVerde: ['#1c2628', '#2a3e3c', '#3e5c52', '#5e8472', '#86ac94', '#b4d4b8', '#d8ecd4'],
  azul: ['#161c38', '#26407a', '#3e6aa8', '#6c98d0', '#a6c8ea'],
  vermelho: ['#2e0e1a', '#6c1e2c', '#a43438', '#d46a58', '#f0a488'],
  roxo: ['#1c1634', '#3a2a6c', '#6a4ea4', '#9c86d4', '#cec0f0'],
  ocre: ['#3c2a10', '#7a5420', '#b88a34', '#e0b858', '#f4dc90'],
  cinza: ['#1c1c24', '#3c3c48', '#666674', '#9a9aa8', '#d0d0da'],
  marrom: ['#241610', '#4a2e1a', '#74502c', '#a47c48', '#d0a870'],
  branco: ['#dcd8cc', '#f0ecde', '#fffaf0'],
  ceu: ['#244068', '#44709e', '#74a2cc', '#a8cae4', '#d4e6f0', '#f0f2ee'],
  noite: ['#080818', '#10102e', '#1c1a50', '#2e2c78', '#4a4698'],
  poente: ['#c06a40', '#e89a50', '#f6c870'],
  agua: ['#183c5a', '#2e6e8e', '#58a4b8', '#9cd4d8', '#d4f0ec'],
  pedra: ['#24242c', '#44444f', '#706e82', '#a09eb2', '#cac8d6'],
  ouro: ['#5a3c10', '#a8781a', '#e0ae2c', '#f8d95a', '#fff2a8'],
  jade: ['#0e3028', '#1c5c48', '#2e8c66', '#64c096', '#b4ecd0'],
  fogo: ['#4a1408', '#a43a14', '#e06a1c', '#faa83a', '#ffe08a'],
} satisfies Record<string, string[]>;

export type Rampa = string[];
export const TODAS: string[] = Object.values(PAL).flat();

/** RGB de #rrggbb. */
export function rgb(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const RGB = TODAS.map(rgb);

/** Cor mais próxima da paleta (distância "redmean", perto da percepção). */
export function maisProxima(r: number, g: number, b: number, subconjunto?: number[]): number {
  let melhor = 0, d0 = Infinity;
  const lista = subconjunto ?? RGB.map((_, i) => i);
  for (const i of lista) {
    const [pr, pg, pb] = RGB[i];
    const rm = (r + pr) / 2;
    const dr = r - pr, dg = g - pg, db = b - pb;
    const d = (2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db;
    if (d < d0) { d0 = d; melhor = i; }
  }
  return melhor;
}
export const corDe = (i: number) => TODAS[i];
