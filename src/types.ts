export type StatKey = 'fis' | 'esp' | 'comp' | 'sor' | 'car' | 'dao';
export type Stats = Record<StatKey, number>;
export type Rarity = 'comum' | 'raro' | 'lendario';
export type Faction = 'seita' | 'demoniaca' | 'cla' | 'errante' | 'nenhuma';
export type Place = 'vilarejo' | 'cidade' | 'seita' | 'selva' | 'montanha' | 'ruinas';

/** Efeitos aplicados quando uma escolha (ou resultado) acontece. */
export interface Effects {
  stats?: Partial<Stats>;
  pedras?: number;
  karma?: number;
  fama?: number;
  /** Progresso de cultivo, em % do reino atual (ex.: 10 = +10%). */
  xp?: number;
  /** Anos de vida restantes (+/-). */
  vida?: number;
  /** Ferimentos (+/-). 6 = morte em combate. */
  ferida?: number;
  /** Corrupção demoníaca (+/-). 100 = vira demônio. */
  corr?: number;
  /** Sobe (+1) ou desce (-1) de reino imediatamente. */
  tier?: number;
  /** Define a trilha de cultivo (só vale se o personagem ainda não tem uma). */
  trilha?: string;
  setFlags?: string[];
  clearFlags?: string[];
  item?: string[];
  removeItem?: string[];
  tecnica?: string[];
  /** Agenda eventos futuros: em [min,max] anos. */
  agenda?: { event: string; em: [number, number] }[];
  local?: Place;
  faccao?: Faction;
  /** Termina a vida com este final. */
  fim?: string;
  /** Avança anos extras. */
  anos?: number;
}

export interface Cond {
  ageMin?: number;
  ageMax?: number;
  tierMin?: number;
  tierMax?: number;
  path?: string[];
  origin?: string[];
  flags?: string[];
  noFlags?: string[];
  stat?: Partial<Stats>;
  pedrasMin?: number;
  karmaMin?: number;
  karmaMax?: number;
  fameMin?: number;
  local?: Place[];
  faction?: Faction[];
  item?: string;
  tecnica?: string;
  corrMin?: number;
}

export interface Outcome {
  text: string;
  fx?: Effects;
}

export interface Check {
  stat: StatKey | StatKey[];
  /** Dificuldade relativa ao reino: 0 = normal, +4 = difícil, -3 = fácil. */
  dif?: number;
  tag?: string;
}

export interface Choice {
  text: string;
  cond?: Cond;
  /** Custo em pedras espirituais (a escolha só aparece se houver). */
  custo?: number;
  check?: Check;
  ok?: Outcome;
  fail?: Outcome;
  /** Resultado sem teste. */
  res?: Outcome;
}

export interface GameEvent {
  id: string;
  title: string;
  text: string;
  rarity: Rarity;
  weight?: number;
  once?: boolean;
  /** Anos mínimos antes de repetir (padrão: 8). */
  cooldown?: number;
  cond?: Cond;
  choices: Choice[];
}

export interface Realm {
  name: string;
  /** Idade máxima absoluta ao atingir este reino. */
  lifespan: number;
  /** Anos típicos para encher a barra. */
  years: number;
  /** Chance base de rompimento para entrar NESTE reino. */
  breakChance: number;
  tribulation?: boolean;
}

export interface Path {
  id: string;
  name: string;
  ladder: string;
  desc: string;
  stats: Partial<Stats>;
  xpMult: number;
  tags: string[];
  /** Técnica inicial. */
  tecnica?: string;
  unlock?: string;
  /** Corrupção inicial (trilha demoníaca). */
  startCorr?: number;
}

export interface Item {
  id: string;
  name: string;
  kind: 'pilula' | 'erva' | 'artefato' | 'talisma' | 'manual' | 'nucleo' | 'anel' | 'misc';
  grade: 1 | 2 | 3 | 4 | 5;
  desc: string;
  /** Consumível: efeitos ao usar. */
  use?: Effects;
  /** Passivo (artefatos): bônus de atributos enquanto no inventário. */
  passive?: Partial<Stats>;
  /** Bônus à chance de rompimento para o reino alvo (consumido ao usar). */
  breakBonus?: { tier: number; bonus: number };
  value: number;
}

export interface Technique {
  id: string;
  name: string;
  grade: 1 | 2 | 3 | 4;
  desc: string;
  stats?: Partial<Stats>;
  xpMult?: number;
  tags?: string[];
}

export interface Ending {
  id: string;
  name: string;
  text: string;
  /** Multiplicador de pontos de Herança. */
  legacy: number;
}

export interface Origin {
  id: string;
  name: string;
  desc: string;
  stats: Partial<Stats>;
  pedras: number;
  place: Place;
  faction: Faction;
  unlock?: string;
  flags?: string[];
}

export interface Talent {
  id: string;
  name: string;
  desc: string;
  stats?: Partial<Stats>;
  xpMult?: number;
  lifeMult?: number;
  unlock?: string;
}

export interface Flaw {
  id: string;
  name: string;
  desc: string;
  stats?: Partial<Stats>;
  xpMult?: number;
  lifeMult?: number;
  breakMod?: number;
}

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  reward: string;
}

export interface LogEntry {
  age: number;
  text: string;
}

export interface Root {
  name: string;
  mult: number;
  elements: string[];
}

export interface State {
  v: 1;
  seed: number;
  name: string;
  path: string;
  origin: string;
  root: Root;
  talent: string;
  flaw: string;
  constitution: string | null;
  age: number;
  tier: number;
  xp: number;
  stats: Stats;
  pedras: number;
  karma: number;
  fama: number;
  corr: number;
  wounds: number;
  /** Idade máxima atual. */
  maxAge: number;
  place: Place;
  faction: Faction;
  flags: string[];
  items: string[];
  techniques: string[];
  names: Record<string, string>;
  scheduled: { event: string; at: number }[];
  seen: Record<string, number>;
  log: LogEntry[];
  turn: number;
  /** Evento atual (null quando em resultado/final). */
  current: { id: string; breakthrough?: boolean } | null;
  /** Resultado exibido após uma escolha. */
  result: { text: string; check?: { chance: number; success: boolean } } | null;
  ending: string | null;
  endingText: string | null;
  /** Preenchido quando a vida é encerrada (finalizeLife). */
  summary?: { legacy: number; ach: string[]; tierName: string };
  legacyBonus: { stats: number; xp: number; luck: number; pedras: number };
}

export interface Meta {
  legacy: number;
  achievements: string[];
  upgrades: Record<string, number>;
  lives: number;
  best: { tier: number; age: number; ending: string } | null;
  endingsSeen: string[];
  history: { name: string; path: string; tierName: string; age: number; ending: string }[];
}
