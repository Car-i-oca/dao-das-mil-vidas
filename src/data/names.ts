import type { Rng } from '../engine/rng';
import type { Root, Stats } from '../types';

const SURNAMES = ['Jang', 'Baek', 'Seo', 'Choi', 'Kang', 'Yoon', 'Han', 'Im', 'Gwon', 'Noh', 'Ryu', 'Jeong', 'Hwang', 'Kwon', 'Moon', 'Shin', 'Nam', 'Bae', 'Oh', 'Heo'];
const GIVEN_A = ['Ha', 'Mu', 'Hwa', 'Seol', 'Tae', 'Rin', 'Dae', 'Min', 'Eun', 'Jin', 'Soo', 'Yeon', 'Gye', 'Do', 'Yu'];
const GIVEN_B = ['-ryeon', '-jin', '-seok', '-hyeon', '-hwa', '-min', '-yeon', '-su', '-won', '-hee', '-tae', '-seo', '-mi', '-gyeong'];

export function personName(rng: Rng): string {
  return `${rng.pick(SURNAMES)} ${rng.pick(GIVEN_A)}${rng.pick(GIVEN_B)}`;
}

const SEITA_A = ['Escola', 'Pavilhão', 'Casa Marcial', 'Salão', 'Dojo'];
const SEITA_B = ['da Garça', 'das Quatro Pontes', 'da Lâmina Errante', 'do Rio Calmo', 'do Punho de Ferro', 'do Passo Norte', 'da Agulha Oculta', 'da Colina Baixa'];
export function sectName(rng: Rng): string {
  return `${rng.pick(SEITA_A)} ${rng.pick(SEITA_B)}`;
}

export function clanName(rng: Rng): string {
  return `Casa ${rng.pick(SURNAMES)}`;
}

const VILA_A = ['Aldeia', 'Vila', 'Povoado'];
const VILA_B = ['Pedra Baixa', 'das Quatro Pontes', 'do Cais Velho', 'do Campo de Arroz', 'da Colina Sul', 'dos Pinhais'];
export function villageName(rng: Rng): string {
  return `${rng.pick(VILA_A)} ${rng.pick(VILA_B)}`;
}

/* ---------- Aptidões e estilos de aprendizado ---------- */
const ELEMS = ['Passo', 'Respiração', 'Postura', 'Leitura', 'Ritmo'];
const MUTANTS = ['Improviso', 'Equilíbrio', 'Reflexo'];

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
    return { name: `Aptidão para ${m}`, mult: k.mult, elements: [m] };
  }
  const pool = [...ELEMS];
  const chosen: string[] = [];
  for (let i = 0; i < k.n; i++) chosen.push(pool.splice(rng.int(0, pool.length - 1), 1)[0]);
  const label = k.n === 1 ? 'Tendência marcial singular' : k.n === 5 ? 'Talento versátil' : `Aptidões combinadas (${k.n})`;
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
  { id: 'yin_puro', name: 'Fôlego sereno', desc: 'Respiração estável mesmo em momentos tensos.', stats: { esp: 3, car: 1 }, xpMult: 1.08 },
  { id: 'ossos_dragao', name: 'Ossatura robusta', desc: 'Suporta treino físico prolongado.', stats: { fis: 5 }, xpMult: 1.04 },
  { id: 'corpo_espada', name: 'Reflexos de duelista', desc: 'Reage rapidamente a mudanças de postura.', stats: { dao: 3, fis: 2 }, xpMult: 1.05 },
  { id: 'caos', name: 'Instinto imprevisível', desc: 'Improvisa bem, mas precisa controlar o ritmo.', xpMult: 1.3, breakMod: -0.08 },
  { id: 'jade_eterno', name: 'Saúde excepcional', desc: 'Envelhece devagar e se recupera bem.', stats: { car: 2, sor: 1 }, xpMult: 1.02, juventude: true },
  { id: 'veias_quebradas', name: 'Tendões sensíveis', desc: 'Treino exige mais cuidado para evitar lesões.', stats: { dao: 2 }, xpMult: 0.8, breakMod: 0.06 },
];
