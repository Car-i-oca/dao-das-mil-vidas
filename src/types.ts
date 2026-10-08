export type StatKey = 'fis' | 'esp' | 'comp' | 'sor' | 'car' | 'dao';
export type Stats = Record<StatKey, number>;
export type Rarity = 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario';
export type Alignment = 'daoico' | 'demoniaco';
export interface MoralAlignment { good: number; evil: number; order: number; chaos: number }
export type Faction = 'seita' | 'demoniaca' | 'cla' | 'errante' | 'nenhuma';
export type Place = 'vilarejo' | 'cidade' | 'seita' | 'selva' | 'montanha' | 'ruinas' | 'deserto' | 'gelo' | 'mar';
export type SectRank = 'externo' | 'interno' | 'anciao';
export type EventType = 'narrative' | 'combat' | 'shop' | 'alchemy';
export type QuestObjectiveKind = 'defeat' | 'collect' | 'craft';
export type EquipmentSlot = 'rightWeapon' | 'leftWeapon' | 'armor' | 'accessory';
export type Weather = 'sunny' | 'rain' | 'blizzard';
export type GuildFaction = 'sword_sect' | 'demon_cult' | 'merchant_guild';

export interface Companion {
  id: string;
  name: string;
  description: string;
  bonus: Partial<Stats>;
  price: number;
}

export interface DiceRoll {
  d20: number;
  modifier: number;
  /** Parcela baseada nos atributos efetivos, excluindo equipamento vestido. */
  statBonus: number;
  /** Parcela adicional dos bônus do equipamento vestido. */
  equipmentBonus: number;
  /** Clima, companheiros e demais modificadores do teste. */
  otherBonus: number;
  total: number;
  dc: number;
  stat: StatKey;
  playerPower?: number;
  enemyPower?: number;
}

export interface QuestObjective {
  kind: QuestObjectiveKind;
  count: number;
  place?: Place;
  foe?: string;
  item?: string;
  eventId?: string;
}

export interface QuestDefinition {
  id: string;
  title: string;
  description: string;
  objective: QuestObjective;
  reward: { pedras: number; reputation: number };
}

export interface StatusEffect {
  id: 'poisoned' | 'bleeding' | 'burning' | 'frozen' | 'focused' | 'guarded';
  turns: number;
  potency: number;
}

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
  /** Define o alinhamento do personagem. */
  alignment?: Alignment;
  /** Pontos morais ganhos ou perdidos nesta escolha. */
  morality?: Partial<MoralAlignment>;
  /** Define ou substitui o mestre atual. */
  master?: string;
  /** Avança um nível na hierarquia da seita, sem rebaixar personagens veteranos. */
  sectRankUp?: boolean;
  reputation?: number;
  factionReputation?: Partial<Record<GuildFaction, number>>;
  /** Aplica estados temporários no jogador. */
  status?: StatusEffect[];
  /** Remove estados temporários pelo id. */
  clearStatus?: StatusEffect['id'][];
  /** Soma ao perfil de conduta (compaixao, violencia, astucia, cautela, ambicao, disciplina, devocao, ganancia). */
  perfil?: Record<string, number>;
  /** Supera o defeito de nascença (arco de redenção): ele deixa de valer e a penalidade de atributos some. */
  superar?: boolean;
  setFlags?: string[];
  clearFlags?: string[];
  item?: string[];
  removeItem?: string[];
  /** Agenda eventos futuros: em [min,max] anos. */
  agenda?: { event: string; em: [number, number] }[];
  local?: Place;
  faccao?: Faction;
  /** Termina a vida com este final. */
  fim?: string;
  /** Avança anos extras. */
  anos?: number;
}

export interface UiNotification {
  kind: 'master' | 'alignment' | 'rare-item' | 'quest';
  message: string;
}

export interface Cond {
  ageMin?: number;
  ageMax?: number;
  tierMin?: number;
  tierMax?: number;
  path?: string[];
  /** Alinhamento moral/espiritual do cultivador. */
  alignment?: Alignment[];
  /** Pontuação mínima exigida em cada eixo moral indicado. */
  morality?: Partial<MoralAlignment>;
  /** Id do mestre atual (permite mestres alternativos). */
  master?: string[];
  origin?: string[];
  /** Exige todos os itens listados, útil para receitas com vários ingredientes. */
  itemsAll?: string[];
  /** Exige qualquer um dos itens listados. */
  itemsAny?: string[];
  /** Exige que o personagem ainda não esteja em missão. */
  noActiveQuest?: boolean;
  /** Mínimo de encontros sobrevividos em um bioma. */
  regionalEncounters?: { place: Place; min: number };
  sectRank?: SectRank[];
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
  corrMin?: number;
  /** Marco mínimo da progressão universal de sagas. */
  sagaStageMin?: number;
  /** Perfil de conduta mínimo (ex.: { compaixao: 8 }). */
  perfil?: Record<string, number>;
  /** Perfil de conduta máximo (ex.: { violencia: 3 }). */
  perfilMax?: Record<string, number>;
  /** Talento, defeito, raiz (tipo ou elemento) e constituição exigidos (qualquer um da lista). */
  talent?: string[];
  flaw?: string[];
  root?: string[];
  constitution?: string[];
  /** Só vale durante uma era do mundo (ids em src/data/mundo.ts). */
  mundo?: string[];
}

export interface Outcome {
  text: string;
  /** Variações do texto do desfecho (uma é sorteada). */
  alt?: string[];
  fx?: Effects;
}

export interface Check {
  /** Reino da ameaça (padrão: o reino do jogador). Ameaças de reinos abaixo ficam fáceis. */
  amea?: number;
  stat: StatKey | StatKey[];
  /** Dificuldade relativa ao reino: 0 = normal, +4 = difícil, -3 = fácil. */
  dif?: number;
  tag?: string;
}

export interface Choice {
  /** Opção exclusiva injetada por molde (ver src/data/opcoes.ts). */
  ex?: boolean;
  /** Contexto requerido pela opção; a Engine não a oferece fora dele. */
  requiresEventType?: EventType;
  text: string;
  cond?: Cond;
  /** Custo em pedras espirituais (a escolha só aparece se houver). */
  custo?: number;
  /** Estado de missão rastreado na UI/engine. */
  questAction?: { type: 'accept' | 'abandon'; questId?: string };
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
  /** Contexto mecânico do evento; eventos legados são classificados ao montar EVENTS. */
  type?: EventType;
  /** Permite anexar opções globais de traços/origens a este evento narrativo. */
  allowGlobalTraits?: boolean;
  weight?: number;
  once?: boolean;
  /** Evento comercial: as escolhas podem usar `custo` para cobrar pedras espirituais. */
  eventType?: 'mercador';
  /** Variações do texto do evento (uma é sorteada a cada ocorrência). */
  alt?: string[];
  /** Reino natural da ameaça deste evento (vale para todos os testes dele). `escala` desliga a regra automática. */
  amea?: number;
  escala?: boolean;
  /** Cena de passagem de tempo: não precisa de consequência própria. */
  passagem?: boolean;
  /** Marca o evento como encontro com inimigo (oponente e dificuldade de chefe opcionais). */
  combate?: { oponente?: string; oponentes?: string[]; cenario?: string; boss?: boolean };
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
  /** Título do jogador no mundo neste reino. */
  titulo?: string;
  /** Poder novo anunciado ao romper para este reino. */
  poder?: string;
}

export interface Path {
  id: string;
  name: string;
  ladder: string;
  desc: string;
  stats: Partial<Stats>;
  unlock?: string;
  /** Corrupção inicial (trilha demoníaca). */
  startCorr?: number;
}

export interface Item {
  id: string;
  name: string;
  kind: 'pilula' | 'erva' | 'material' | 'arma' | 'armadura' | 'artefato' | 'talisma' | 'nucleo' | 'anel' | 'misc';
  grade: 1 | 2 | 3 | 4 | 5;
  rarity: Rarity;
  desc: string;
  /** Consumível: efeitos ao usar. */
  use?: Effects;
  /** Passivo (artefatos): bônus de atributos enquanto no inventário. */
  passive?: Partial<Stats>;
  equipmentSlot?: EquipmentSlot;
  bonuses?: Partial<Stats>;
  coldProtection?: boolean;
  /** Bônus à chance de rompimento para o reino alvo (consumido ao usar). */
  breakBonus?: { tier: number; bonus: number };
  value: number;
}

/** Item com bônus passivos ativos enquanto estiver no inventário, sem ação de uso. */
export type PassiveArtifact = Item & { passive: Partial<Stats> };

export interface Ending {
  id: string;
  name: string;
  text: string;
  /** Multiplicador de pontos de Herança. */
  legacy: number;
  /** Variações do epitáfio (uma é sorteada pelo nome e pela idade). */
  alt?: string[];
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
  /** Ausente apenas em saves antigos; nesses casos a Engine infere o alinhamento da trilha. */
  alignment?: Alignment;
  /** Ausente em saves antigos; os quatro eixos morais começam em zero. */
  morality?: MoralAlignment;
  /** Mestre alternativo atual; ausente em saves antigos ou antes de conhecer um mestre. */
  master?: string | null;
  /** Contagem de encontros concluídos e sobrevividos em cada região. */
  regionalEncounters?: Partial<Record<Place, number>>;
  /** Missão ativa e seu progresso (ausente em saves antigos). */
  activeQuest?: { id: string; progress: number };
  /** Reputação obtida ao cumprir contratos. */
  reputation?: number;
  factionReputation?: Partial<Record<GuildFaction, number>>;
  guild?: GuildFaction;
  equipment?: Partial<Record<EquipmentSlot, string>>;
  companions?: string[];
  day?: number;
  hour?: number;
  weather?: Weather;
  /** Hierarquia atual na seita; derivável dos flags antigos. */
  sectRank?: SectRank;
  /** Mensagens produzidas pela Engine e consumidas pela camada de interface. */
  uiNotifications?: UiNotification[];
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
  /** IDs dos itens; artefatos passivos concedem seus bônus enquanto estiverem aqui. */
  items: string[];
  names: Record<string, string>;
  scheduled: { event: string; at: number }[];
  seen: Record<string, number>;
  log: LogEntry[];
  turn: number;
  /** Evento atual (null quando em resultado/final). */
  current: { id: string; breakthrough?: boolean; retiro?: boolean; /** duração da reclusão, em anos */ d?: number; /** variante de texto */ v?: number; foe?: string; foeName?: string } | null;
  /** Efeitos temporários e sua duração restante em turnos. */
  statuses?: StatusEffect[];
  /** Resultado exibido após uma escolha. */
  result: { text: string; check?: { chance: number; success: boolean }; roll?: DiceRoll; changes?: Change[] } | null;
  /** Quantas vezes cada evento já ocorreu nesta vida (alimenta a fadiga de repetição). */
  counts?: Record<string, number>;
  /** Perfil de conduta acumulado pelas escolhas. */
  perfil?: Record<string, number>;
  /** Multiplicador de peso por evento, vindo das vidas anteriores (novidade entre vidas). */
  pen?: Record<string, number>;
  /** Era do mundo em curso. */
  world?: { id: string; until: number } | null;
  nextWorldAt?: number;
  lastWorld?: string;
  /** Dificuldade escolhida: -1 calmo, 0 normal, 1 desafio. */
  dif?: number;
  /** Itens já obtidos nesta vida (alimenta o Códice). */
  found?: { items: string[] };
  /** Inimigos efetivamente derrotados nesta vida. */
  defeatedFoes?: string[];
  ending: string | null;
  endingText: string | null;
  /** Preenchido quando a vida é encerrada (finalizeLife). */
  summary?: { legacy: number; ach: string[]; tierName: string; marcas?: string[]; equipment?: Partial<Record<EquipmentSlot, string>> };
  legacyBonus: { stats: number; xp: number; luck: number; pedras: number };
}

/** Mudança exibida como "chip" depois de uma escolha (up = bom, down = ruim, neutral = informativo). */
export interface Change {
  t: string;
  k: 'up' | 'down' | 'neutral';
}

export interface Meta {
  /** Códice de itens encontrados em qualquer vida. */
  codex?: { items: string[] };
  legacy: number;
  achievements: string[];
  upgrades: Record<string, number>;
  lives: number;
  best: { tier: number; age: number; ending: string } | null;
  endingsSeen: string[];
  /** Eventos vistos nas últimas vidas (mais recente primeiro): quem já apareceu perde peso na vida seguinte. */
  recent?: string[][];
  history: { name: string; path: string; tierName: string; age: number; ending: string }[];
  /** Bestiário persistente: IDs dos inimigos vencidos em qualquer vida. */
  defeatedFoes?: string[];
}
