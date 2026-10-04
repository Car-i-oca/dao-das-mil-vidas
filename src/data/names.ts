import type { Rng } from '../engine/rng';
import type { Root, Stats } from '../types';

const SURNAMES = ['Lin', 'Qin', 'Han', 'Mo', 'Su', 'Yan', 'Bai', 'Shen', 'Tang', 'Gu', 'Luo', 'Xu', 'Wen', 'Feng', 'Ji', 'Ning', 'Duan', 'Jiang', 'Fu', 'Cao'];
/** O gênero de uma pessoa vem da primeira sílaba do nome próprio (as listas são separadas). */
const A_MASC = ['Yun', 'Ming', 'Hao', 'Zhi', 'Wei', 'Tian', 'Chen', 'An'];
const A_FEM = ['Lian', 'Xue', 'Qing', 'Ruo', 'Yu', 'Shan', 'Jing'];
const B_MASC = ['feng', 'ge', 'lei', 'wen', 'zhao', 'jun', 'yan'];
const B_FEM = ['lan', 'yan', 'shu', 'hua', 'rui', 'xin', 'ning', 'mei'];
export type Genero = 'm' | 'f';
export function generoDoNome(nome: string): Genero {
  const dado = nome.split(' ')[1] ?? '';
  if (A_MASC.some((a) => dado.startsWith(a))) return 'm';
  return A_FEM.some((a) => dado.startsWith(a)) ? 'f' : 'm';
}
export function personNameG(rng: Rng, g: Genero): string {
  return `${rng.pick(SURNAMES)} ${rng.pick(g === 'm' ? A_MASC : A_FEM)}${rng.pick(g === 'm' ? B_MASC : B_FEM)}`;
}
export function personName(rng: Rng): string {
  return personNameG(rng, rng.chance(0.5) ? 'm' : 'f');
}

const SEITA_A = ['Seita do Pico', 'Seita do Vale', 'Seita do Lago', 'Templo do Monte', 'Pavilhão do Rio', 'Seita da Montanha'];
const SEITA_B = ['Nublado', 'das Mil Agulhas', 'do Orvalho Cinzento', 'da Lua Rachada', 'do Pinheiro Cego', 'das Cinzas Verdes', 'do Sino Mudo', 'da Garça Branca'];
export function sectName(rng: Rng): string {
  return `${rng.pick(SEITA_A)} ${rng.pick(SEITA_B)}`;
}

export function clanName(rng: Rng): string {
  return `Clã ${rng.pick(SURNAMES)}`;
}

const VILA_A = ['Vila', 'Aldeia', 'Povoado'];
const VILA_B = ['do Salgueiro', 'das Três Pontes', 'do Arroz Dourado', 'da Pedra Quieta', 'do Poço Fundo', 'dos Bambus'];
export function villageName(rng: Rng): string {
  return `${rng.pick(VILA_A)} ${rng.pick(VILA_B)}`;
}

/* ---------- Raízes Espirituais ---------- */
const ELEMS = ['Metal', 'Madeira', 'Água', 'Fogo', 'Terra'];
const MUTANTS = ['Raio', 'Gelo', 'Vento'];

export function rollRoot(rng: Rng): Root {
  const kinds: { n: number; w: number; mult: number }[] = [
    { n: 1, w: 3, mult: 1.5 },
    { n: 0, w: 2, mult: 1.6 }, // mutante
    { n: 2, w: 12, mult: 1.25 },
    { n: 3, w: 30, mult: 1.0 },
    { n: 4, w: 33, mult: 0.85 },
    { n: 5, w: 20, mult: 0.72 },
  ];
  const k = rng.weighted(kinds, (x) => x.w);
  if (k.n === 0) {
    const m = rng.pick(MUTANTS);
    return { name: `Raiz Mutante de ${m}`, mult: k.mult, elements: [m] };
  }
  const pool = [...ELEMS];
  const chosen: string[] = [];
  for (let i = 0; i < k.n; i++) chosen.push(pool.splice(rng.int(0, pool.length - 1), 1)[0]);
  const label = k.n === 1 ? 'Raiz Única' : k.n === 5 ? 'Raiz Caótica (cinco elementos)' : `Raiz de ${k.n} elementos`;
  return { name: `${label}: ${chosen.join(', ')}`, mult: k.mult, elements: chosen };
}

export interface Constitution {
  id: string;
  name: string;
  desc: string;
  stats?: Partial<Stats>;
  xpMult?: number;
  breakMod?: number;
  /** Mantém a aparência jovem. */
  juventude?: boolean;
}

export const CONSTITUTIONS: Constitution[] = [
  { id: 'yin_puro', name: 'Corpo de Yin Puro', desc: 'Qi gélido e límpido.', stats: { esp: 3, car: 1 }, xpMult: 1.08 },
  { id: 'ossos_dragao', name: 'Ossos de Dragão', desc: 'Densidade óssea absurda.', stats: { fis: 5 }, xpMult: 1.04 },
  { id: 'corpo_espada', name: 'Corpo de Espada Celestial', desc: 'Você nasceu afiado.', stats: { dao: 3, fis: 2 }, xpMult: 1.05 },
  { id: 'caos', name: 'Corpo Caótico', desc: 'Absorve tudo, controla pouco.', xpMult: 1.3, breakMod: -0.08 },
  { id: 'jade_eterno', name: 'Corpo de Jade Eterno', desc: 'A carne se recusa a envelhecer à vista.', stats: { car: 2, sor: 1 }, xpMult: 1.02, juventude: true },
  { id: 'veias_quebradas', name: 'Veias Quebradas', desc: 'Selo antigo oculta um potencial imenso.', stats: { dao: 2 }, xpMult: 0.8, breakMod: 0.06 },
];
