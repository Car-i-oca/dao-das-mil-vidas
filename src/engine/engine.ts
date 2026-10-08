import { Rng } from './rng';
import type {
  Alignment, Change, Check, Choice, Cond, Effects, GameEvent, Meta, Outcome, State, StatKey, Stats, Root, Realm, Item, PassiveArtifact, Path, UiNotification, SectRank, EquipmentSlot, GuildFaction, DiceRoll, Weather,
} from '../types';
import { LADDERS } from '../data/realms';
import { PATHS } from '../data/paths';
import { ORIGINS, TALENTS, FLAWS } from '../data/character';
import { ITEMS } from '../data/items';
import { ENDINGS, ACHIEVEMENTS, ACH_CHECKS, upgradePrice } from '../data/endings';
import { CONSTITUTIONS, personName, sectName, clanName, villageName, rollRoot } from '../data/names';
import { EVENTS } from '../data/events';
import { FOE, foeFor } from '../data/combates';
import { eventTypeOf } from '../data/event-type';
import { REGION_POOLS } from '../data/regions';
import { VIRTUDE_NOME } from '../data/marcas';
import { MARCAS_VIDA } from '../data/marcas_vida';
import { AFINIDADES } from '../data/afinidades';
import { categorias, type Cat } from '../data/opcoes';
import { WORLDS, WORLD } from '../data/mundo';
import { RETIRO_TEXTS, RETIRO_PATH_LINES, RETIRO_EXIT } from '../data/retiros';
import { QUESTS } from '../data/quests';
import { COMPANIONS } from '../data/companions';

/* ---------- Índices ---------- */
const byId = <T extends { id: string }>(a: T[]) => Object.fromEntries(a.map((x) => [x.id, x])) as Record<string, T>;
/** Enquanto o personagem não encontra um método, usa-se uma trilha neutra (escada xianxia, sem bônus). */
const NO_PATH: Path = { id: '', name: 'Sem trilha ainda', ladder: 'neutro', desc: 'O método ainda será encontrado.', stats: {} };
export const PATH: Record<string, Path> = { ...byId(PATHS), '': NO_PATH };
export const ORIGIN = byId(ORIGINS);
export const TALENT = byId(TALENTS);
export const FLAW = byId(FLAWS);
export const ITEM = byId(ITEMS);
export const ENDING = byId(ENDINGS);
export const EVENT = byId(EVENTS);
export const CONSTITUTION = byId(CONSTITUTIONS);
const QUEST = byId(QUESTS);

export const STAT_NAMES: Record<StatKey, string> = {
  fis: 'Físico', esp: 'Espírito', comp: 'Compreensão', sor: 'Sorte', car: 'Carisma', dao: 'Coração do Dao',
};
export const STAT_KEYS: StatKey[] = ['fis', 'esp', 'comp', 'sor', 'car', 'dao'];

export function newMeta(): Meta {
  return { legacy: 0, achievements: [], upgrades: {}, lives: 0, best: null, endingsSeen: [], history: [], codex: { items: [] }, defeatedFoes: [] };
}

/* ---------- Consultas ---------- */
export const ladderOf = (s: State) => LADDERS[PATH[s.path].ladder];
export const realmOf = (s: State, tier = s.tier): Realm => { const r = ladderOf(s).realms; return r[Math.min(tier, r.length - 1)]; };
export const realmName = (s: State) => realmOf(s).name;
export const has = (s: State, f: string) => s.flags.includes(f);
const alignmentOf = (s: State): Alignment => s.alignment ?? (s.path === 'demoniaca' ? 'demoniaco' : 'daoico');
const SECT_RANKS: SectRank[] = ['externo', 'interno', 'anciao'];
export function sectRankOf(s: State): SectRank | null {
  if (s.sectRank) return s.sectRank;
  if (has(s, 'secta_anciao')) return 'anciao';
  if (has(s, 'discipulo_interno')) return 'interno';
  return has(s, 'membro_seita') ? 'externo' : null;
}
const isPassiveArtifact = (item: Item | undefined): item is PassiveArtifact =>
  !!item?.passive;
function notify(s: State, event: UiNotification) {
  s.uiNotifications ??= [];
  s.uiNotifications.push(event);
}

export function eff(s: State, k: StatKey): number {
  let v = s.stats[k];
  for (const id of s.items) {
    const item = ITEM[id];
    if (isPassiveArtifact(item)) v += item.passive[k] ?? 0;
  }
  for (const id of Object.values(s.equipment ?? {})) v += ITEM[id]?.bonuses?.[k] ?? 0;
  for (const id of s.companions ?? []) v += COMPANIONS.find((companion) => companion.id === id)?.bonus[k] ?? 0;
  return v;
}

export function equipItem(s: State, itemId: string): boolean {
  const item = ITEM[itemId];
  if (!item?.equipmentSlot || !item.bonuses || !s.items.includes(itemId)) return false;
  s.equipment ??= {};
  s.equipment[item.equipmentSlot] = itemId;
  return true;
}

export function unequipItem(s: State, slot: EquipmentSlot): boolean {
  if (!s.equipment?.[slot]) return false;
  delete s.equipment[slot];
  return true;
}

/** Compra ou vende itens apenas durante eventos de mercador. */
export function tradeItem(s: State, action: 'buy' | 'sell', itemId: string): string | null {
  const event = s.current ? EVENT[s.current.id] : undefined;
  if (!event || eventTypeOf(event) !== 'shop' || s.ending) return null;
  const item = ITEM[itemId];
  if (!item) return null;
  if (action === 'buy') {
    if (s.pedras < item.value) return null;
    s.pedras -= item.value;
    s.items.push(item.id);
    s.found ??= { items: [] };
    if (!s.found.items.includes(item.id)) s.found.items.push(item.id);
    const message = `Comprou ${item.name} por ${item.value} pedras espirituais.`;
    addLog(s, message);
    return message;
  }
  const index = s.items.indexOf(item.id);
  if (index < 0 || Object.values(s.equipment ?? {}).includes(item.id)) return null;
  s.items.splice(index, 1);
  const price = Math.max(1, Math.floor(item.value / 2));
  s.pedras += price;
  const message = `Vendeu ${item.name} por ${price} pedras espirituais.`;
  addLog(s, message);
  return message;
}

export function recruitCompanion(s: State, id: string): boolean {
  const companion = COMPANIONS.find((entry) => entry.id === id);
  s.companions ??= [];
  if (!companion || s.companions.includes(id) || s.companions.length >= 2 || s.pedras < companion.price) return false;
  s.pedras -= companion.price;
  s.companions.push(id);
  addLog(s, `${companion.name} juntou-se à sua jornada.`);
  return true;
}

export function dismissCompanion(s: State, id: string): boolean {
  const party = s.companions ?? [];
  const index = party.indexOf(id);
  if (index < 0) return false;
  party.splice(index, 1);
  addLog(s, `Seu companheiro deixou a jornada.`);
  return true;
}

export function joinGuild(s: State, guild: GuildFaction): boolean {
  if (s.guild === guild) return false;
  s.guild = guild;
  s.factionReputation ??= {};
  s.factionReputation[guild] ??= 0;
  addLog(s, `Você se afiliou a ${GUILD_NAMES[guild]}.`);
  return true;
}

const GUILD_NAMES: Record<GuildFaction, string> = {
  sword_sect: 'Seita da Espada',
  demon_cult: 'Culto Demoníaco',
  merchant_guild: 'Guilda dos Mercadores',
};

export function factionReputation(s: State, guild: GuildFaction): number {
  return s.factionReputation?.[guild] ?? 0;
}

function hasColdProtection(s: State): boolean {
  return Object.values(s.equipment ?? {}).some((id) => !!ITEM[id]?.coldProtection);
}

function isNight(s: State): boolean {
  return (s.hour ?? 8) >= 19 || (s.hour ?? 8) < 6;
}

function weatherPenalty(s: State, stat: StatKey): number {
  if (s.weather === 'rain' && stat === 'esp') return -2;
  if (s.weather === 'blizzard' && !hasColdProtection(s)) return -3;
  if (isNight(s) && (stat === 'esp' || stat === 'sor')) return -2;
  return 0;
}

function diceCheckPreview(s: State, check: Check, ev?: GameEvent): Omit<DiceRoll, 'd20' | 'total'> {
  const keys = Array.isArray(check.stat) ? check.stat : [check.stat];
  const stat = keys[0];
  const rating = keys.reduce((sum, key) => sum + eff(s, key) + weatherPenalty(s, key), 0) / keys.length;
  const equipmentRating = keys.reduce((sum, key) =>
    sum + Object.values(s.equipment ?? {}).reduce((bonus, id) => bonus + (ITEM[id]?.bonuses?.[key] ?? 0), 0), 0) / keys.length;
  const statBonus = Math.floor((rating - equipmentRating - 10) / 3);
  const equipmentBonus = Math.floor((rating - 10) / 3) - statBonus;
  const statusBonus = (s.statuses ?? []).reduce((sum, status) => {
    if (status.id === 'focused') return sum + status.potency;
    if (status.id === 'frozen') return sum - status.potency;
    return sum;
  }, 0);
  const isCombat = check.tag === 'combate';
  const dc = checkDifficulty(s, check, ev) + (isCombat && ev?.combate?.boss ? 2 : 0) + (isNight(s) ? 2 : 0);
  const playerPower = isCombat ? eff(s, 'fis') + eff(s, 'esp') + eff(s, 'dao') + s.tier * 3 : undefined;
  const enemyPower = isCombat ? dc * 2 : undefined;
  const powerBonus = playerPower !== undefined && enemyPower !== undefined
    ? Math.max(-4, Math.min(4, Math.trunc((playerPower - enemyPower) / 6)))
    : 0;
  const guildRep = s.guild ? factionReputation(s, s.guild) : 0;
  const guildBonus = isCombat ? (guildRep >= 30 ? 2 : guildRep <= -30 ? -2 : 0) : 0;
  const modifier = Math.floor((rating + statusBonus - 10) / 3)
    + guildBonus + powerBonus
    + Math.round((s.legacyBonus.luck ?? 0) * 0.16) - Math.round(s.wounds * 0.6) - (s.dif ?? 0) * 2;
  return {
    modifier,
    statBonus,
    equipmentBonus,
    otherBonus: modifier - statBonus - equipmentBonus,
    dc,
    stat,
    ...(playerPower !== undefined ? { playerPower, enemyPower } : {}),
  };
}

export function combatCheckPreview(s: State, check: Check, ev?: GameEvent): Omit<DiceRoll, 'd20' | 'total'> {
  return diceCheckPreview(s, check, ev);
}

function xpMult(s: State): number {
  let m = s.root.mult * (TALENT[s.talent].xpMult ?? 1) * (flawFx(s).xpMult ?? 1);
  if (s.constitution) m *= CONSTITUTION[s.constitution].xpMult ?? 1;
  return m * (1 + 0.02 * s.legacyBonus.xp);
}

export function cultivationRate(s: State): number {
  const realm = realmOf(s);
  if (!realm.years) return 0;
  const woundPenalty = Math.max(0.4, 1 - s.wounds * 0.1);
  return (100 / realm.years) * xpMult(s) * (0.7 + eff(s, 'comp') / 40) * woundPenalty * (1 + s.corr / 250);
}

export function fill(s: State, text: string): string {
  return text
    .replace(/\{nome\}/g, s.name)
    .replace(/\{rival\}/g, s.names.rival)
    .replace(/\{mentor\}/g, s.names.mentor)
    .replace(/\{amigo\}/g, s.names.amigo)
    .replace(/\{noivo\}/g, s.names.noivo)
    .replace(/\{discipulo\}/g, s.names.discipulo ?? 'o discípulo')
    .replace(/\{inimigo\}/g, s.current?.foeName ?? s.names.inimigo ?? 'o inimigo')
    .replace(/\{seita\}/g, s.names.seita)
    .replace(/\{cla\}/g, s.names.cla)
    .replace(/\{vila\}/g, s.names.vila)
    .replace(/\{idade\}/g, String(Math.floor(s.age)))
    .replace(/\{reino\}/g, realmName(s))
    .replace(/\{eco_final\}/g, s.names.eco_final ?? '')
    .replace(/\{eco_trilha\}/g, s.names.eco_trilha ?? '')
    .replace(/\{eco\}/g, s.names.eco ?? '');
}

/** Etiquetas da raiz espiritual: tipo (unica, mutante, dupla, tripla, quadrupla, caotica) e elementos. */
/** Efeitos do defeito de nascença (nenhum, se já foi superado). */
export function flawFx(s: State): { xpMult?: number; lifeMult?: number; breakMod?: number } {
  return s.flags.includes('defeito_superado') ? {} : FLAW[s.flaw];
}

const RE_RECUO = /recu|fug[ie]|desist|evit|esper|ignor|abandon|afast|deixar|voltar/i;
const RE_ORGULHO = /pedir ajuda|desculp|curvar|ajoelh|submeter|implorar|aceitar a ajuda|reconhecer o erro|ceder/i;
const RE_AVAREZA = /doar|devolver|dividir|oferecer|pagar|contribuir|repartir|presentear/i;
const RE_ENFRENTAR = /enfrent|desafi|lutar|atacar|encarar|confront|invadir|proteger com o corpo/i;

/** O defeito de nascença pode fechar opções: impulsivo não recua, orgulhoso não se curva, avarento não paga, covarde não encara. */
export function bloqueadaPorDefeito(s: State, c: Choice): string | null {
  if (c.ex || c.cond || s.flags.includes('defeito_superado')) return null;
  const meia = (hashStr(`${s.seed}:${s.turn}:${c.text}`) & 1) === 0;
  const f = s.flaw;
  if (f === 'impulsivo' && RE_RECUO.test(c.text) && meia) return 'Sangue Quente não deixa você recuar';
  if (f === 'orgulhoso' && RE_ORGULHO.test(c.text)) return 'o Orgulho Ferido não deixa você se curvar';
  if (f === 'avarento' && (c.custo || RE_AVAREZA.test(c.text)) && meia) return 'a Mão Fechada não deixa você largar o dinheiro';
  if (f === 'covarde' && RE_ENFRENTAR.test(c.text) && meia) return 'o Coração Covarde não deixa você encarar isso';
  return null;
}

function hashStr(x: string): number {
  let h = 2166136261;
  for (let i = 0; i < x.length; i++) { h ^= x.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function rootTags(r: Root): string[] {
  const n = r.elements.length;
  const kind = r.name.includes('Mutante') ? 'mutante' : ['', 'unica', 'dupla', 'tripla', 'quadrupla', 'caotica'][n] ?? 'tripla';
  return [kind, ...r.elements];
}

/** Idade aparente (0 criança, 1 jovem, 2 adulto, 3 maduro, 4 ancião) pela fração da vida vivida. */
export function apparentStage(s: State): number {
  if (s.age < 13) return 0;
  const forever = s.flags.includes('juventude_eterna') || (!!s.constitution && !!CONSTITUTION[s.constitution]?.juventude);
  const f = s.age / Math.max(1, s.maxAge);
  const st = f < 0.4 ? 1 : f < 0.7 ? 2 : f < 0.85 ? 3 : 4;
  return forever ? Math.min(st, 1) : st;
}

/** Virtude dominante do perfil (a partir de 10 pontos) e a alcunha correspondente. */
export function virtudeDominante(s: State): string | null {
  const p = s.perfil ?? {};
  const top = Object.entries(p).sort((a, b) => b[1] - a[1])[0];
  return top && top[1] >= 10 ? top[0] : null;
}

/** Selo mostrado na opção exclusiva: o que a torna possível. */
export function choiceBadge(c: Choice): string | undefined {
  const k = c.cond;
  if (!k) return undefined;
  if (k.path?.length) return PATH[k.path[0]]?.name.replace('Caminho d', 'D').replace(/^D[oa]s? /, '') ?? k.path[0];
  if (k.talent?.length) return TALENT[k.talent[0]]?.name;
  if (k.flaw?.length) return FLAW[k.flaw[0]]?.name;
  if (k.constitution?.length) return CONSTITUTION[k.constitution[0]]?.name;
  if (k.root?.length) return 'Raiz: ' + k.root[0];
  if (k.origin?.length) return ORIGIN[k.origin[0]]?.name;
  if (k.perfil) return 'Conduta: ' + (VIRTUDE_NOME[Object.keys(k.perfil)[0] as keyof typeof VIRTUDE_NOME] ?? Object.keys(k.perfil)[0]);
  if (k.item) return ITEM[k.item]?.name;
  return undefined;
}

export function condMet(s: State, c?: Cond): boolean {
  if (!c) return true;
  if (c.ageMin !== undefined && s.age < c.ageMin) return false;
  if (c.ageMax !== undefined && s.age > c.ageMax) return false;
  if (c.tierMin !== undefined && s.tier < c.tierMin) return false;
  if (c.tierMax !== undefined && s.tier > c.tierMax) return false;
  if (c.noActiveQuest && s.activeQuest) return false;
  if (c.regionalEncounters && (s.regionalEncounters?.[c.regionalEncounters.place] ?? 0) < c.regionalEncounters.min) return false;
  if (c.sectRank && !(sectRankOf(s) && c.sectRank.includes(sectRankOf(s)!))) return false;
  if (c.path && !c.path.includes(s.path)) return false;
  if (c.alignment && !c.alignment.includes(alignmentOf(s))) return false;
  if (c.morality) for (const [axis, value] of Object.entries(c.morality) as [keyof NonNullable<State['morality']>, number][]) {
    if ((s.morality?.[axis] ?? 0) < value) return false;
  }
  if (c.sagaStageMin !== undefined && Math.floor(s.turn / 6) < c.sagaStageMin) return false;
  if (c.master && !(s.master && c.master.includes(s.master))) return false;
  if (c.origin && !c.origin.includes(s.origin)) return false;
  if (c.flags && !c.flags.every((f) => has(s, f))) return false;
  if (c.noFlags && c.noFlags.some((f) => has(s, f))) return false;
  if (c.stat) for (const k of Object.keys(c.stat) as StatKey[]) if (eff(s, k) < (c.stat[k] as number)) return false;
  if (c.pedrasMin !== undefined && s.pedras < c.pedrasMin) return false;
  if (c.karmaMin !== undefined && s.karma < c.karmaMin) return false;
  if (c.karmaMax !== undefined && s.karma > c.karmaMax) return false;
  if (c.fameMin !== undefined && s.fama < c.fameMin) return false;
  if (c.local && !c.local.includes(s.place)) return false;
  if (c.faction && !c.faction.includes(s.faction)) return false;
  if (c.item && !s.items.includes(c.item)) return false;
  if (c.itemsAll && !c.itemsAll.every((id) => s.items.includes(id))) return false;
  if (c.itemsAny && !c.itemsAny.some((id) => s.items.includes(id))) return false;
  if (c.corrMin !== undefined && s.corr < c.corrMin) return false;
  if (c.perfil) for (const [k, v] of Object.entries(c.perfil)) if ((s.perfil?.[k] ?? 0) < v) return false;
  if (c.perfilMax) for (const [k, v] of Object.entries(c.perfilMax)) if ((s.perfil?.[k] ?? 0) > v) return false;
  if (c.talent && !c.talent.includes(s.talent)) return false;
  if (c.flaw && !c.flaw.includes(s.flaw)) return false;
  if (c.constitution && !(s.constitution && c.constitution.includes(s.constitution))) return false;
  if (c.root && !rootTags(s.root).some((k) => c.root!.includes(k))) return false;
  if (c.mundo && !(s.world && c.mundo.includes(s.world.id))) return false;
  return true;
}

/* ---------- Testes ---------- */
/** Reino da ameaça: explícito no teste ou no evento; senão, testes de combate/fuga de eventos de reino baixo viram ameaças de reino baixo. */
export function threatTier(s: State, ch: Check, ev?: GameEvent): number {
  let t = ch.amea ?? ev?.amea;
  if (t === undefined && ev && !ev.escala && (ch.tag === 'combate' || ch.tag === 'fuga') && !ev.cond?.mundo) {
    const lo = ev.cond?.tierMin ?? 1;
    t = Math.max(1, lo) + 1;
  }
  return t === undefined ? s.tier : Math.max(0, Math.min(s.tier, t));
}

export function checkDifficulty(s: State, ch: Check, ev?: GameEvent): number {
  return 8 + threatTier(s, ch, ev) * 6 + (ch.dif ?? 0);
}

export function checkChance(s: State, ch: Check, ev?: GameEvent): number {
  const { modifier, dc } = diceCheckPreview(s, ch, ev);
  const firstRegularHit = Math.max(2, Math.ceil(dc - modifier));
  const regularHits = Math.min(18, Math.max(0, 20 - firstRegularHit));
  return (1 + regularHits) / 20;
}

/* ---------- Criação ---------- */
export interface Creation {
  origin: string;
  talent: string;
  flaw: string;
  root: Root;
  constitution: string | null;
}

export function rollCreation(meta: Meta, rng: Rng): Creation {
  const ok = (u?: string) => !u || meta.achievements.includes(u);
  const origin = rng.pick(ORIGINS.filter((o) => ok(o.unlock)));
  const talent = rng.pick(TALENTS.filter((t) => ok(t.unlock)));
  const flaw = rng.pick(FLAWS);
  const root = rollRoot(rng);
  const constitution = rng.chance(0.06) ? rng.pick(CONSTITUTIONS).id : null;
  return { origin: origin.id, talent: talent.id, flaw: flaw.id, root, constitution };
}

export function startLife(meta: Meta, c: Creation, pathId: string, seed: number): State {
  const rng = new Rng(seed);
  const path = PATH[pathId];
  const origin = ORIGIN[c.origin];
  const talent = TALENT[c.talent];
  const flaw = FLAW[c.flaw];
  const cons = c.constitution ? CONSTITUTION[c.constitution] : null;
  const up = meta.upgrades;
  const stats: Stats = { fis: 0, esp: 0, comp: 0, sor: 0, car: 0, dao: 0 };
  for (const k of STAT_KEYS) {
    stats[k] = 8 + rng.int(0, 2);
    for (const src of [path.stats, origin.stats, talent.stats, flaw.stats, cons?.stats]) stats[k] += src?.[k] ?? 0;
  }
  stats.fis += up.corpo ?? 0;
  stats.comp += up.mente ?? 0;
  stats.sor += up.destino ?? 0;
  for (const k of STAT_KEYS) stats[k] = Math.max(1, stats[k]);
  const lifeMult = (talent.lifeMult ?? 1) * (flaw.lifeMult ?? 1);
  const names: Record<string, string> = {
    rival: personName(rng), mentor: personName(rng), amigo: personName(rng), noivo: personName(rng), discipulo: personName(rng), inimigo: personName(rng),
    seita: sectName(rng), cla: clanName(rng), vila: villageName(rng),
  };
  // Eco da vida anterior: quem você foi vira lenda neste mundo.
  const last = meta.history[0];
  if (last) {
    names.eco = last.name;
    names.eco_final = last.ending;
    names.eco_trilha = last.path;
  }
  // Novidade entre vidas: o que apareceu nas últimas vidas perde peso (mais a vida mais recente).
  const pen: Record<string, number> = {};
  (meta.recent ?? []).slice(0, 3).forEach((ids, i) => {
    const f = [0.5, 0.72, 0.86][i];
    for (const id of ids) pen[id] = (pen[id] ?? 1) * f;
  });
  const s: State = {
    pen,
    v: 1, seed: rng.seed, name: personName(rng), path: pathId,
    alignment: pathId === 'demoniaca' ? 'demoniaco' : 'daoico', morality: { good: 0, evil: 0, order: 0, chaos: 0 }, master: null,
    origin: c.origin, root: c.root,
    talent: c.talent, flaw: c.flaw, constitution: c.constitution,
    age: 6, tier: 0, xp: 0, stats, pedras: origin.pedras + 10 * (up.bolso ?? 0), karma: 0, fama: 0, corr: path.startCorr ?? 0, wounds: 0,
    maxAge: Math.round(LADDERS[path.ladder].realms[0].lifespan * lifeMult),
    place: origin.place, faction: origin.faction, flags: [...(origin.flags ?? []), ...(last ? ['tem_eco'] : [])],
    items: ['espada_ferro_viagem', 'manto_peles'], names, scheduled: [], seen: {}, log: [],
    counts: {}, world: null, nextWorldAt: 24 + rng.int(0, 30),
    equipment: { rightWeapon: 'espada_ferro_viagem', armor: 'manto_peles' }, companions: [], factionReputation: {}, day: 1, hour: 8, weather: 'sunny',
    turn: 0, current: null, statuses: [], result: null, ending: null, endingText: null,
    found: { items: ['espada_ferro_viagem', 'manto_peles'] },
    legacyBonus: { stats: 0, xp: up.ritmo ?? 0, luck: up.memoria ?? 0, pedras: up.bolso ?? 0 },
  };
  s.log.push({ age: 6, text: `${s.name} nasce em ${origin.place === 'seita' ? names.seita : names.vila}. ${origin.name}. ${c.root.name}.` });
  pickNext(s, rng);
  return s;
}

/* ---------- Efeitos ---------- */
function addLog(s: State, text: string) {
  s.log.push({ age: Math.floor(s.age), text });
  if (s.log.length > 400) s.log.shift();
}

function noteFound(s: State, id: string) {
  s.found ??= { items: [] };
  if (!s.found.items.includes(id)) s.found.items.push(id);
}

/** A velhice vira um final diferente conforme a vida que a pessoa levou. */
function oldAgeEnding(s: State): string {
  const f = (x: string) => s.flags.includes(x);
  if (s.tier === 0) return 'velhice';
  if (f('tem_neto') || f('cla_proprio')) return 'velhice_avo';
  const v = virtudeDominante(s);
  if (v === 'compaixao' && s.karma >= 5) return 'velhice_avo';
  if ((v === 'disciplina' || v === 'devocao') && eff(s, 'dao') >= 40 && s.karma >= 9) return 'velhice_sabio';
  if (v === 'cautela' && s.fama < 60) return 'velhice_esquecido';
  if (v === 'violencia' && s.fama >= 30) return 'velhice_veterano';
  if (v === 'ganancia' && s.pedras >= 300) return 'velhice_rico';
  if (v === 'ganancia' || (v === 'violencia' && s.karma <= -5)) return 'velhice_rancoroso';
  if (s.fama >= 90 && s.tier >= 4 && v !== 'cautela') return 'velhice_mestre';
  if (eff(s, 'dao') >= 45 && s.karma >= 12) return 'velhice_sabio';
  if (s.karma <= -15) return 'velhice_rancoroso';
  if (s.pedras >= 700) return 'velhice_rico';
  if (f('veterano') || f('heroi_do_cerco') || f('campeao_torneio') || f('torneio_campeao') || f('heroi_da_guerra')) return 'velhice_veterano';
  if (s.fama < 20) return 'velhice_esquecido';
  return 'velhice';
}

export function endLife(s: State, id: string) {
  if (s.ending) return;
  if (id === 'velhice') id = oldAgeEnding(s);
  s.ending = id;
  const end = ENDING[id];
  const variants = [end.text, ...(end.alt ?? [])];
  let h = 0;
  for (const ch of `${s.name}${Math.floor(s.age)}${s.tier}`) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  s.endingText = fill(s, variants[h % variants.length]);
  s.current = null;
}

function tierUp(s: State, delta: number) {
  const max = ladderOf(s).realms.length - 1;
  const t = Math.min(max, Math.max(0, s.tier + delta));
  if (t === s.tier) return;
  if (delta > 0) {
    for (const k of STAT_KEYS) s.stats[k] = Math.min(99, s.stats[k] + 2);
    s.fama += t * 2;
  }
  s.tier = t;
  s.xp = 0;
  const lifeMult = (TALENT[s.talent].lifeMult ?? 1) * (flawFx(s).lifeMult ?? 1);
  s.maxAge = Math.max(s.maxAge, Math.round(realmOf(s).lifespan * lifeMult));
  addLog(s, `Alcançou o reino: ${realmName(s)}.`);
}

/** Adota um caminho de cultivo e aplica seus atributos iniciais e alinhamento. */
function setPath(s: State, id: string) {
  const p = PATH[id];
  if (!p || !id || s.path) return;
  s.path = id;
  for (const k of Object.keys(p.stats) as StatKey[]) s.stats[k] = Math.min(99, Math.max(1, s.stats[k] + (p.stats[k] ?? 0)));
  if (p.startCorr) s.corr = Math.min(100, s.corr + p.startCorr);
  if (id === 'demoniaca') {
    s.alignment = 'demoniaco';
    s.faction = 'demoniaca';
    if (!s.flags.includes('membro_demoniaca')) s.flags.push('membro_demoniaca');
  }
  if (!s.flags.includes('trilha_definida')) s.flags.push('trilha_definida');
  const lifeMult = (TALENT[s.talent].lifeMult ?? 1) * (flawFx(s).lifeMult ?? 1);
  s.maxAge = Math.max(s.maxAge, Math.round(realmOf(s).lifespan * lifeMult));
  addLog(s, `Encontrou seu método: ${p.name}.`);
}

export function applyFx(s: State, fx: Effects | undefined, rng: Rng) {
  if (!fx) return;
  const previousAlignment = alignmentOf(s);
  const previousMaster = s.master;
  if (fx.trilha) setPath(s, fx.trilha);
  if (fx.alignment) s.alignment = fx.alignment;
  if (fx.master) s.master = fx.master;
  const currentAlignment = alignmentOf(s);
  if (currentAlignment !== previousAlignment) {
    notify(s, { kind: 'alignment', message: `Alinhamento alterado: ${currentAlignment === 'demoniaco' ? 'Caminho Demoníaco' : 'Caminho Daoico'}.` });
  }
  if (s.master && s.master !== previousMaster) {
    const masterName = s.master === 'lua_oca' ? 'Mestre da Lua Oca' : s.master === 'mestra_cinzas' ? 'Mestra das Cinzas' : s.master;
    notify(s, { kind: 'master', message: `Novo mestre: ${masterName}.` });
  }
  if (fx.superar && !s.flags.includes('defeito_superado')) {
    s.flags.push('defeito_superado');
    const pen = FLAW[s.flaw]?.stats ?? {};
    for (const k of Object.keys(pen) as StatKey[]) if ((pen[k] ?? 0) < 0) s.stats[k] = Math.min(99, s.stats[k] - (pen[k] as number));
    addLog(s, `Superou o defeito: ${FLAW[s.flaw]?.name}.`);
  }
  if (fx.perfil) { s.perfil ??= {}; for (const [k, v] of Object.entries(fx.perfil)) s.perfil[k] = (s.perfil[k] ?? 0) + v; }
  if (fx.morality) {
    s.morality ??= { good: 0, evil: 0, order: 0, chaos: 0 };
    for (const [axis, value] of Object.entries(fx.morality) as [keyof NonNullable<State['morality']>, number][]) {
      s.morality[axis] = Math.max(0, Math.min(100, s.morality[axis] + value));
    }
  }
  if (fx.stats) for (const k of Object.keys(fx.stats) as StatKey[]) s.stats[k] = Math.min(99, Math.max(1, s.stats[k] + (fx.stats[k] ?? 0)));
  if (fx.pedras) s.pedras = Math.max(0, s.pedras + fx.pedras);
  if (fx.karma) s.karma += fx.karma;
  if (fx.fama) s.fama = Math.max(0, s.fama + fx.fama);
  if (fx.reputation) s.reputation = Math.max(0, (s.reputation ?? 0) + fx.reputation);
  if (fx.factionReputation) {
    s.factionReputation ??= {};
    for (const [guild, value] of Object.entries(fx.factionReputation) as [GuildFaction, number][]) {
      s.factionReputation[guild] = Math.max(-100, Math.min(100, (s.factionReputation[guild] ?? 0) + value));
    }
  }
  if (fx.sectRankUp) {
    const current = sectRankOf(s);
    const next = Math.min(SECT_RANKS.length - 1, (current ? SECT_RANKS.indexOf(current) : -1) + 1);
    s.sectRank = SECT_RANKS[next];
    if (s.sectRank === 'interno' && !s.flags.includes('discipulo_interno')) s.flags.push('discipulo_interno');
    if (s.sectRank === 'anciao') {
      if (!s.flags.includes('secta_anciao')) s.flags.push('secta_anciao');
      if (!s.flags.includes('secta_vip')) s.flags.push('secta_vip');
    }
    addLog(s, `Rank da seita: ${s.sectRank === 'anciao' ? 'Ancião' : s.sectRank === 'interno' ? 'Discípulo Interno' : 'Discípulo Externo'}.`);
  }
  // Ganhos de eventos são em % do reino; em reinos altos valem menos (o cultivo exige mais anos).
  if (fx.xp && s.tier > 0) s.xp = Math.min(130, Math.max(0, s.xp + fx.xp * Math.min(1, Math.pow(10 / realmOf(s).years, 0.75))));
  if (fx.vida) s.maxAge += fx.vida;
  if (fx.ferida) {
    const guard = (s.statuses ?? []).filter((status) => status.id === 'guarded').reduce((sum, status) => sum + status.potency, 0);
    s.wounds = Math.max(0, s.wounds + (fx.ferida > 0 ? Math.max(0, fx.ferida - guard) : fx.ferida));
  }
  if (fx.clearStatus?.length) s.statuses = (s.statuses ?? []).filter((status) => !fx.clearStatus!.includes(status.id));
  if (fx.status?.length) {
    s.statuses ??= [];
    for (const status of fx.status) {
      const existing = s.statuses.find((current) => current.id === status.id);
      if (existing) {
        existing.turns = Math.max(existing.turns, status.turns);
        existing.potency = Math.max(existing.potency, status.potency);
      } else s.statuses.push({ ...status });
    }
  }
  // Quem trilha o Caminho do Sangue controla melhor a corrupção (compensa o ritmo de cultivo maior).
  if (fx.corr) s.corr = Math.min(100, Math.max(0, s.corr + (fx.corr > 0 && s.path === 'demoniaca' ? fx.corr * 0.6 : fx.corr)));
  if (fx.setFlags) for (const f of fx.setFlags) if (!s.flags.includes(f)) s.flags.push(f);
  if (fx.setFlags?.includes('membro_seita') && !s.sectRank) s.sectRank = 'externo';
  if (fx.setFlags?.includes('discipulo_interno') && !s.sectRank) s.sectRank = 'interno';
  if (fx.clearFlags) s.flags = s.flags.filter((f) => !fx.clearFlags!.includes(f));
  if (fx.item) for (const i of fx.item) if (s.items.length < 40) {
    s.items.push(i);
    noteFound(s, i);
    const item = ITEM[i];
    if (item && item.grade >= 3) notify(s, { kind: 'rare-item', message: `Item raro encontrado: ${item.name}.` });
  }
  if (fx.removeItem) {
    for (const i of fx.removeItem) {
      const idx = s.items.indexOf(i);
      if (idx >= 0) s.items.splice(idx, 1);
    }
  }
  if (fx.agenda) for (const a of fx.agenda) s.scheduled.push({ event: a.event, at: s.age + rng.int(a.em[0], a.em[1]) });
  if (fx.local) s.place = fx.local;
  if (fx.faccao) s.faction = fx.faccao;
  if (fx.tier) tierUp(s, fx.tier);
  if (fx.anos) s.age += fx.anos;
  if (fx.fim) endLife(s, fx.fim);
  if (!s.ending && s.wounds >= 6) endLife(s, 'combate');
  if (!s.ending && s.corr >= 100) endLife(s, 'demonio');
  if (!s.ending && s.age >= s.maxAge) endLife(s, s.tier === 0 ? 'mortal' : 'velhice');
}

export function acceptQuest(s: State, id: string): boolean {
  if (s.ending || s.activeQuest || !['cidade', 'seita'].includes(s.place) || !QUEST[id]) return false;
  s.activeQuest = { id, progress: 0 };
  notify(s, { kind: 'quest', message: `Contrato aceito: ${QUEST[id].title}.` });
  addLog(s, `Aceitou o contrato: ${QUEST[id].title}.`);
  return true;
}

export function abandonQuest(s: State): boolean {
  if (!s.activeQuest) return false;
  const title = QUEST[s.activeQuest.id]?.title ?? 'missão';
  s.activeQuest = undefined;
  notify(s, { kind: 'quest', message: `Contrato abandonado: ${title}.` });
  addLog(s, `Abandonou o contrato: ${title}.`);
  return true;
}

function updateQuest(s: State, ev: GameEvent, place: State['place'], foeId: string | undefined, success: boolean, gained: string[]) {
  const active = s.activeQuest;
  if (!active) return;
  const quest = QUEST[active.id];
  if (!quest) { s.activeQuest = undefined; return; }
  const objective = quest.objective;
  if (objective.place && objective.place !== place) return;
  if (objective.eventId && objective.eventId !== ev.id) return;
  let amount = 0;
  if (objective.kind === 'defeat' && success && foeId === objective.foe) amount = 1;
  if ((objective.kind === 'collect' || objective.kind === 'craft') && objective.item) {
    amount = gained.filter((id) => id === objective.item).length;
  }
  if (!amount) return;
  active.progress = Math.min(objective.count, active.progress + amount);
  if (active.progress < objective.count) {
    notify(s, { kind: 'quest', message: `${quest.title}: ${active.progress}/${objective.count}.` });
    return;
  }
  s.pedras += quest.reward.pedras;
  s.reputation = (s.reputation ?? 0) + quest.reward.reputation;
  s.activeQuest = undefined;
  notify(s, { kind: 'quest', message: `Contrato concluído: ${quest.title} · +${quest.reward.pedras} pedras · +${quest.reward.reputation} reputação.` });
  addLog(s, `Concluiu ${quest.title}; recebeu ${quest.reward.pedras} pedras e ${quest.reward.reputation} de reputação.`);
}

/* ---------- Rompimento (evento virtual) ---------- */
export function breakPills(s: State): Item[] {
  const next = s.tier + 1;
  const out: Item[] = [];
  for (const id of new Set(s.items)) {
    const it = ITEM[id];
    if (it?.breakBonus && it.breakBonus.tier === next) out.push(it);
  }
  return out;
}

export function breakChance(s: State, pill?: Item): number {
  const L = ladderOf(s);
  const next = s.tier + 1;
  const top = next >= L.realms.length;
  const base = top ? L.finalChance : L.realms[next].breakChance;
  const cons = s.constitution ? CONSTITUTION[s.constitution].breakMod ?? 0 : 0;
  // Atributos multiplicam a chance base (reinos altos continuam raros); o resto soma.
  const statFactor = Math.min(1.7, Math.max(0.6, 1 + (eff(s, 'comp') - 15) * 0.01 + (eff(s, 'dao') - 12) * 0.014));
  const p =
    base * statFactor + (flawFx(s).breakMod ?? 0) + cons +
    Math.min(0.15, Math.max(0, (s.xp - 100) * 0.005)) - s.wounds * 0.04 + (pill?.breakBonus?.bonus ?? 0) - (s.dif ?? 0) * 0.05;
  return Math.min(0.95, Math.max(0.03, p));
}

/** Flags de preparo de tribulação (definidas no evento tribulacao_preparo; consumidas ao enfrentar o raio). */
export const TRIB_FLAGS = ['trib_artefato', 'trib_formacao', 'trib_corpo', 'trib_merito', 'trib_consciencia'];

function tribulationChance(s: State): number {
  const next = s.tier + 1;
  const avg = (eff(s, 'fis') + eff(s, 'esp') + eff(s, 'dao')) / 3;
  const karmaMod = Math.max(-0.08, Math.min(0.08, s.karma / 300)); // karma positivo suaviza a tribulação, negativo a endurece
  const preparo = TRIB_FLAGS.some((fl) => s.flags.includes(fl)) ? 0.08 : 0;
  return Math.min(0.95, Math.max(0.25, 0.6 + (avg - (6 + next * 4)) * 0.035 - s.wounds * 0.04 + karmaMod + preparo));
}

function doBreakthrough(s: State, rng: Rng, pill?: Item): string {
  const before = s.tier;
  const st0 = apparentStage(s);
  const text = doBreakthroughCore(s, rng, pill);
  if (s.tier > before && !s.ending) {
    const r = realmOf(s);
    const young = apparentStage(s) < st0 ? 'Seu corpo rejuvenesceu.' : '';
    const extra = [r.poder, r.titulo ? `Título: ${r.titulo}.` : '', young].filter(Boolean).join(' ');
    if (extra) { addLog(s, extra); return `${text} ${extra}`; }
  }
  return text;
}

function doBreakthroughCore(s: State, rng: Rng, pill?: Item): string {
  const L = ladderOf(s);
  const next = s.tier + 1;
  const top = next >= L.realms.length;
  const p = breakChance(s, pill);
  if (pill) s.items.splice(s.items.indexOf(pill.id), 1);
  s.seen['__break'] = s.age;
  const target = top ? L.finalName : L.realms[next].name;
  if (rng.chance(p)) {
    const trib = top || L.realms[next].tribulation;
    if (trib) {
      const tribOk = rng.chance(tribulationChance(s));
      s.flags = s.flags.filter((fl) => !TRIB_FLAGS.includes(fl));
      if (!tribOk) {
        if (s.items.includes('talisma_escudo')) {
          s.items.splice(s.items.indexOf('talisma_escudo'), 1);
          s.wounds += 3;
          if (top) { s.xp = 60; return 'O raio final desabou. O Talismã de Escudo explodiu em mil faíscas, salvando sua vida, mas o rompimento foi interrompido. Você terá de tentar de novo.'; }
          tierUp(s, 1);
          return `O raio da tribulação desabou. O Talismã de Escudo explodiu salvando sua vida. Você rompeu para ${target}, mas feriu-se gravemente.`;
        }
        if (rng.chance(0.7)) {
          s.wounds += 3;
          s.xp = 50;
          return `O céu rugiu e o raio caiu. Você sobreviveu por pouco, queimado até os ossos. A tribulação em ${target} terá de ser enfrentada outra vez.`;
        }
        endLife(s, 'tribulacao');
        return `As nuvens se fecharam. O primeiro raio foi suportável. O segundo, quase. O terceiro apagou a ideia de que você poderia vencer o céu em ${target}.`;
      }
      if (top) {
        endLife(s, 'ascensao');
        return `O céu abriu degraus de luz. O mundo mortal ficou pequeno. Você alcançou: ${target}.`;
      }
      tierUp(s, 1);
      s.wounds += 1;
      return `Raios atravessaram seu corpo. Quando o céu enfim se calou, você estava de pé: ${target}.`;
    }
    tierUp(s, 1);
    return rng.pick([
      `O Qi fluiu como rio sem margens. Seu corpo cedeu, a mente iluminou: ${target}.`,
      `Uma porta que parecia parede abriu-se em silêncio. Do outro lado, ${target}.`,
      `Durante dias, nada. Então, num suspiro, tudo se encaixou: ${target}.`,
      `O Qi subiu como maré de lua cheia e, quando recuou, você já era ${target}.`,
    ]);
  }
  // Falhar custa tempo de recuperação.
  s.age += Math.max(1, Math.ceil(realmOf(s).years * 0.12));
  const r = rng.next();
  if (r < 0.6) {
    s.xp = 45;
    return rng.pick([
      'O rompimento falhou. O Qi recuou como maré, deixando cansaço e uma lição amarga.',
      'A porta não cedeu. Você ficou diante dela até as pernas tremerem e voltou para trás, em silêncio.',
      'O Qi chegou à beira e não passou. Faltou pouco, ou faltou tudo; é difícil saber.',
    ]);
  }
  if (r < 0.85) {
    s.xp = 40;
    s.wounds += 2;
    return rng.pick([
      'O rompimento falhou e o Qi rebateu contra os meridianos. Sangue na boca, ferimentos no corpo.',
      'O Qi estourou contra a barreira e voltou como chicote. Você acordou no chão, sem lembrar de ter caído.',
    ]);
  }
  const pDev = Math.min(0.9, Math.max(0.15, 0.5 + (eff(s, 'dao') - 12) * 0.03));
  if (rng.chance(pDev)) {
    s.xp = 30;
    s.wounds += 3;
    return 'O Qi desviou do curso! Seu Coração do Dao segurou o abismo por um fio. Você sobreviveu, em ruínas.';
  }
  endLife(s, 'desvio');
  return 'O Qi desviou do curso e o Coração do Dao não aguentou segurar o abismo.';
}

/* ---------- Visão (para a interface) ---------- */
export interface ViewChoice {
  text: string;
  check?: Check;
  chance?: number;
  disabled?: boolean;
  note?: string;
  /** Selo da opção exclusiva (trilha, talento, defeito...). */
  selo?: string;
}

export interface View {
  kind: 'event' | 'result' | 'ending';
  eventType?: GameEvent['type'];
  title: string;
  text: string;
  rarity?: string;
  choices: ViewChoice[];
  /** Aviso quando o defeito de nascença fechou alguma opção. */
  nota?: string;
}

export interface Visible { choice?: Choice; action?: 'break' | 'wait' | 'retiro'; pill?: Item }

export function visibleChoices(s: State): Visible[] {
  if (s.current?.retiro) return [{ action: 'retiro' }];
  if (s.current?.breakthrough) {
    const v: Visible[] = [{ action: 'break' }];
    for (const p of breakPills(s)) v.push({ action: 'break', pill: p });
    v.push({ action: 'wait' });
    return v;
  }
  const ev = EVENT[s.current!.id];
  const eventType = eventTypeOf(ev);
  let list = ev.choices.filter((c) =>
    condMet(s, c.cond) &&
    !bloqueadaPorDefeito(s, c) &&
    (eventType !== 'narrative' || ev.allowGlobalTraits === true || !c.ex) &&
    (!c.requiresEventType || c.requiresEventType === eventType) &&
    (eventType === 'combat' || c.check?.tag !== 'combate'),
  );
  // No máximo 3 opções exclusivas injetadas por vez (em rodízio), para a lista não crescer demais.
  const exs = list.filter((c) => c.ex);
  if (exs.length > 3) {
    const off = (s.turn * 7 + s.age) % exs.length;
    const keep = new Set([0, 1, 2].map((i) => exs[(off + i) % exs.length]));
    list = list.filter((c) => !c.ex || keep.has(c));
  }
  const out: Visible[] = list.map((choice) => ({ choice }));
  if (eventType === 'combat' && !out.some((entry) => entry.choice?.check?.tag === 'combate')) {
    const fight: Choice = {
      text: 'Enfrentar o inimigo',
      check: { stat: ['fis', 'esp'], tag: 'combate' },
      ok: { text: 'Seu golpe decisivo faz o inimigo recuar.', fx: { fama: 1 } },
      fail: { text: 'O inimigo vence a troca e deixa um ferimento.', fx: { ferida: 1 } },
    };
    out.unshift({ choice: fight });
  }
  if (eventType === 'combat' && !out.some((entry) => entry.choice?.check?.tag === 'fuga')) {
    out.push({
      choice: {
        text: 'Fugir',
        check: { stat: ['fis', 'sor'], tag: 'fuga', dif: -1 },
        ok: { text: 'Você encontra uma abertura e escapa do confronto.' },
        fail: { text: 'A tentativa de fuga é interrompida por um golpe.', fx: { ferida: 1 } },
      },
    });
  }
  if (!out.length) out.push({ choice: { text: 'Seguir em frente.', res: { text: 'Você deixa o momento passar.' } } });
  return out;
}

export function view(s: State): View {
  if (s.ending) {
    return { kind: s.result ? 'result' : 'ending', title: ENDING[s.ending].name, text: s.result?.text ?? s.endingText ?? '', choices: [] };
  }
  if (s.result) return { kind: 'result', title: '', text: s.result.text, choices: [] };
  const cur = s.current!;
  if (cur.breakthrough) {
    const L = ladderOf(s);
    const next = s.tier + 1;
    const top = next >= L.realms.length;
    const target = top ? L.finalName : L.realms[next].name;
    const trib = top || L.realms[next].tribulation;
    const choices: ViewChoice[] = visibleChoices(s).map((v) => {
      if (v.action === 'wait') return { text: 'Acumular mais alguns anos antes de tentar.', note: 'Mais preparo = mais chance' };
      if (v.pill) return { text: `Usar ${v.pill.name} e romper`, chance: breakChance(s, v.pill) };
      return { text: 'Tentar romper agora', chance: breakChance(s) };
    });
    return {
      kind: 'event', title: 'Gargalo', rarity: 'raro', choices,
      text: `Seu cultivo transborda. Diante de você está a porta para ${target}.${trib ? ' Raios de tribulação já se agrupam no horizonte.' : ''}`,
    };
  }
  if (cur.retiro) {
    const band = s.tier >= 7 ? 'C' : s.tier >= 5 ? 'B' : 'A';
    const texts = RETIRO_TEXTS[band];
    const base = texts[(cur.v ?? 0) % texts.length].replace(/\{d\}/g, String(cur.d ?? 10));
    const line = RETIRO_PATH_LINES[s.path];
    return { kind: 'event', title: 'Reclusão', rarity: 'comum', text: line ? `${base} ${line}` : base, choices: [{ text: 'Voltar ao mundo.' }] };
  }
  const ev = EVENT[cur.id];
  const choices: ViewChoice[] = visibleChoices(s).map((v) => {
    const c = v.choice!;
    const actionLabel = c.check?.tag === 'combate' ? '[Lutar] ' : c.check?.tag === 'fuga' ? '[Fugir] ' : '';
    const vc: ViewChoice = { text: `${actionLabel}${fill(s, c.text)}`, selo: choiceBadge(c), check: c.check };
    if (c.check) vc.chance = checkChance(s, c.check, ev);
    if (c.custo) {
      vc.note = `${c.custo} pedras`;
      if (s.pedras < c.custo) vc.disabled = true;
    }
    return vc;
  });
  const body = cur.v && ev.alt?.[cur.v - 1] ? ev.alt[cur.v - 1] : ev.text;
  const fechadas = ev.choices.filter((c) => condMet(s, c.cond)).map((c) => bloqueadaPorDefeito(s, c)).filter(Boolean) as string[];
  return { kind: 'event', eventType: eventTypeOf(ev), title: fill(s, ev.title), text: fill(s, body), rarity: ev.rarity, choices, nota: fechadas.length ? `Uma opção sumiu: ${fechadas[0]}.` : undefined };
}

/* ---------- Escolhas ---------- */
interface Snap { realm: string; stats: Stats; pedras: number; karma: number; fama: number; corr: number; wounds: number; tier: number; xp: number; maxAge: number; items: string[]; path: string; morality: NonNullable<State['morality']> }
const snap = (s: State): Snap => ({ realm: realmName(s), stats: { ...s.stats }, pedras: s.pedras, karma: s.karma, fama: s.fama, corr: s.corr, wounds: s.wounds, tier: s.tier, xp: s.xp, maxAge: s.maxAge, items: [...s.items], path: s.path, morality: { good: 0, evil: 0, order: 0, chaos: 0, ...s.morality } });

/** Compara o estado antes e depois de uma escolha e lista o que mudou, para o jogador enxergar a consequência. */
function diffSnap(b: Snap, s: State): Change[] {
  const out: Change[] = [];
  const sign = (n: number) => (n > 0 ? '+' : '−') + Math.abs(n);
  if (s.tier !== b.tier) out.push({ t: `Reino: ${realmName(s)}`, k: s.tier > b.tier ? 'up' : 'down' });
  else if (realmName(s) !== b.realm) out.push({ t: `Reino: ${realmName(s)}`, k: 'neutral' });
  if (s.path !== b.path && s.path) out.push({ t: `Trilha: ${PATH[s.path].name}`, k: 'up' });
  const lvl = s.tier > b.tier ? 2 : 0; // o ganho fixo de +2 por reino já está no aviso de reino
  for (const k of STAT_KEYS) {
    const d = s.stats[k] - b.stats[k] - lvl;
    if (d) out.push({ t: `${sign(d)} ${STAT_NAMES[k]}`, k: d > 0 ? 'up' : 'down' });
  }
  const num = (label: string, d: number, goodUp = true) => { if (d) out.push({ t: `${sign(d)} ${label}`, k: (d > 0) === goodUp ? 'up' : 'down' }); };
  num('pedras', s.pedras - b.pedras);
  num('karma', s.karma - b.karma);
  num('fama', s.fama - b.fama);
  num('corrupção', s.corr - b.corr, false);
  const moralLabels = { good: 'Bom', evil: 'Mau', order: 'Ordem', chaos: 'Caos' } as const;
  for (const axis of Object.keys(moralLabels) as (keyof typeof moralLabels)[]) {
    const delta = (s.morality?.[axis] ?? 0) - b.morality[axis];
    if (delta) num(`alinhamento ${moralLabels[axis]}`, delta, axis === 'good' || axis === 'order');
  }
  const dw = Math.round((s.wounds - b.wounds) * 10) / 10;
  if (dw) out.push({ t: dw > 0 ? `+${dw} ferimento${dw > 1 ? 's' : ''}` : `Ferimentos ${sign(dw)}`, k: dw > 0 ? 'down' : 'up' });
  if (s.tier === b.tier && s.tier > 0) {
    const dx = Math.round(s.xp - b.xp);
    if (dx) out.push({ t: `${sign(dx)}% de cultivo`, k: dx > 0 ? 'up' : 'down' });
  }
  if (s.maxAge !== b.maxAge && s.tier === b.tier) num('anos de vida', s.maxAge - b.maxAge);
  const gained = s.items.slice();
  for (const id of b.items) { const i = gained.indexOf(id); if (i >= 0) gained.splice(i, 1); }
  for (const id of gained) out.push({ t: `Item: ${ITEM[id]?.name ?? id}`, k: 'up' });
  const lost = b.items.slice();
  for (const id of s.items) { const i = lost.indexOf(id); if (i >= 0) lost.splice(i, 1); }
  for (const id of lost) out.push({ t: `Usou: ${ITEM[id]?.name ?? id}`, k: 'neutral' });
  return out;
}

export function choose(s: State, idx: number, rng: Rng) {
  const before = snap(s);
  chooseCore(s, idx, rng);
  if (s.result && !s.result.changes) {
    const ch = diffSnap(before, s);
    if (ch.length) s.result.changes = ch;
  }
}

/**
 * Normalização de recompensas: como os turnos ficaram mais curtos (mais eventos por reino), cada evento
 * entrega uma fração do que entregava, para o total por reino continuar o mesmo. Atributos inteiros
 * usam arredondamento por sorteio (1,0 × 0,8 vira 1 em 80% das vezes). Itens e danos não escalam.
 */
const REWARD_SCALE = [0.5, 0.6, 0.55, 0.46, 0.42, 0.42, 0.45, 0.45, 0.45];

/** Teto suave dos atributos por reino: perto dele, ganhos de eventos rendem cada vez menos (o balanço não depende da quantidade de eventos). */
const softCap = (tier: number) => 62 + 7 * tier;

function scaleFx(s: State, fx: Effects | undefined, r: number, rng: Rng): Effects | undefined {
  if (!fx) return fx;
  const out: Effects = { ...fx };
  const si = (n: number) => {
    const a = Math.abs(n) * r;
    const f = Math.floor(a);
    const v = f + (rng.chance(a - f) ? 1 : 0);
    return n < 0 ? -v : v;
  };
  if (fx.stats) {
    out.stats = {};
    for (const k of Object.keys(fx.stats) as StatKey[]) {
      const n = fx.stats[k] ?? 0;
      const room = n > 0 ? Math.max(0.15, 1 - s.stats[k] / softCap(s.tier)) : 1;
      const a = Math.abs(n) * r * room;
      const f = Math.floor(a);
      const v = (f + (rng.chance(a - f) ? 1 : 0)) * (n < 0 ? -1 : 1);
      if (v) out.stats[k] = v;
    }
  }
  for (const k of ['pedras', 'karma', 'fama'] as const) if (fx[k]) out[k] = si(fx[k] as number);
  if (fx.xp) out.xp = fx.xp * r;
  return out;
}

function chooseCore(s: State, idx: number, rng: Rng) {
  if (s.ending && s.result) return;
  const vis = visibleChoices(s);
  const v = vis[idx];
  if (!v) return;
  if (v.choice?.requiresEventType && v.choice.requiresEventType !== eventTypeOf(EVENT[s.current!.id])) return;
  if (v.choice && eventTypeOf(EVENT[s.current!.id]) !== 'combat' && v.choice.check?.tag === 'combate') return;
  if (v.choice?.custo && s.pedras < v.choice.custo) return;
  s.turn++;
  if (v.action) {
    if (v.action === 'retiro') {
      const d = s.current?.d ?? 10;
      s.age += d;
      s.xp = Math.min(130, s.xp + cultivationRate(s) * d * 1.1);
      s.wounds = 0;
      s.fama = Math.max(0, s.fama - Math.floor(d / 40)); // quem some do mundo vai sendo esquecido
      if (rng.chance(0.08)) { const k = rng.pick(['esp', 'dao', 'comp'] as StatKey[]); s.stats[k] = Math.min(99, s.stats[k] + 1); }
      s.result = { text: rng.pick(RETIRO_EXIT).replace(/\{d\}/g, String(d)) };
      addLog(s, `Reclusão de ${d} anos.`);
      if (!s.ending && s.age >= s.maxAge) endLife(s, 'velhice');
      return;
    }
    if (v.action === 'wait') {
      s.seen['__break'] = s.age;
      s.result = { text: rng.pick([
        'Você recolhe o Qi e espera. Os dias passam; o gargalo amadurece.',
        'Respirar, esperar, respirar. A barreira não some, mas já não parece tão alta.',
        'Você troca a pressa por rotina: cultiva de manhã, caminha à tarde, medita à noite. O gargalo respeita quem não o encara.',
      ]) };
      applyFx(s, { stats: { comp: 1 }, anos: 1 }, rng);
      s.log.push({ age: Math.floor(s.age), text: 'Adiou o rompimento para se preparar melhor.' });
      return;
    }
    const text = doBreakthrough(s, rng, v.pill);
    s.result = { text };
    addLog(s, text);
    if (!s.ending && s.age >= s.maxAge) endLife(s, 'velhice');
    return;
  }
  const c = v.choice!;
  const ev = EVENT[s.current!.id];
  const encounterPlace = s.place;
  const previousItems = [...s.items];
  if (c.custo) s.pedras = Math.max(0, s.pedras - c.custo);
  let out: Outcome;
  let check: { chance: number; success: boolean } | undefined;
  let roll: DiceRoll | undefined;
  if (c.check) {
    const chance = checkChance(s, c.check, ev);
    const preview = diceCheckPreview(s, c.check, ev);
    const d20 = rng.int(1, 20);
    const total = d20 + preview.modifier;
    const success = d20 === 20 || (d20 !== 1 && total >= preview.dc);
    roll = { ...preview, d20, total };
    out = (success ? c.ok : c.fail) ?? c.res ?? { text: '' };
    check = { chance, success };
    if (c.check.tag === 'combate' && !success && s.weather === 'blizzard' && !hasColdProtection(s)) {
      out = { ...out, fx: { ...out.fx, ferida: (out.fx?.ferida ?? 0) + 1 } };
      addLog(s, 'A nevasca atravessa suas roupas e agrava o ferimento.');
    }
  } else {
    out = c.res ?? c.ok ?? { text: '' };
  }
  s.seen[ev.id] = s.age;
  s.counts ??= {};
  s.counts[ev.id] = (s.counts[ev.id] ?? 0) + 1;
  const foeId = s.current?.foe ?? (ev.combate?.oponente ?? (eventTypeOf(ev) === 'combat' ? foeFor(ev.id, ev.title, ev.text) : undefined));
  if (check?.success && c.check?.tag === 'combate' && foeId) {
    s.defeatedFoes ??= [];
    if (!s.defeatedFoes.includes(foeId)) s.defeatedFoes.push(foeId);
  }
  const txt = fill(s, out.alt?.length ? rng.pick([out.text, ...out.alt]) : out.text);
  s.result = { text: txt, check, ...(roll ? { roll } : {}) };
  addLog(s, `${fill(s, ev.title)}: ${txt}`);
  applyFx(s, scaleFx(s, out.fx, REWARD_SCALE[Math.min(s.tier, 8)], rng), rng);
  if (check && c.check?.tag === 'combate' && s.guild) {
    s.factionReputation ??= {};
    const delta = check.success ? 2 : -3;
    s.factionReputation[s.guild] = Math.max(-100, Math.min(100, (s.factionReputation[s.guild] ?? 0) + delta));
  }
  if (!s.ending && s.place === encounterPlace && REGION_POOLS[encounterPlace]) {
    s.regionalEncounters ??= {};
    s.regionalEncounters[encounterPlace] = (s.regionalEncounters[encounterPlace] ?? 0) + 1;
  }
  const gained = s.items.slice();
  for (const id of previousItems) {
    const index = gained.indexOf(id);
    if (index >= 0) gained.splice(index, 1);
  }
  updateQuest(s, ev, encounterPlace, foeId, !!check?.success && check && c.check?.tag === 'combate', gained);
}

/* ---------- Passagem do tempo e próximo evento ---------- */
/** Passo máximo (em anos) de um turno comum, por reino. O resto do tempo passa nas reclusões. */
const DT_CAP = [2, 1, 2, 2, 2, 3, 4, 8, 10];
/** Chance de um turno de reclusão, por reino. */
const P_RETIRO = [0, 0, 0, 0.12, 0.25, 0.35, 0.45, 0.5, 0.55];

function advance(s: State, rng: Rng) {
  const realm = realmOf(s);
  const dt = s.tier === 0 ? 1 : s.tier <= 5 && rng.chance(0.55) ? 1 : rng.int(1, DT_CAP[Math.min(s.tier, DT_CAP.length - 1)]);
  if (s.tier > 0) s.xp = Math.min(130, s.xp + cultivationRate(s) * dt);
  s.age += dt;
  s.day = (s.day ?? 1) + 1;
  s.hour = ((s.hour ?? 8) + 8) % 24;
  if (rng.chance(s.place === 'gelo' ? 0.45 : 0.22)) {
    const weather: Weather[] = s.place === 'gelo' ? ['sunny', 'rain', 'blizzard', 'blizzard'] : ['sunny', 'rain', 'sunny', 'blizzard'];
    s.weather = rng.pick(weather);
  }
  s.wounds = Math.max(0, s.wounds - Math.floor(dt * 0.4 + rng.next()));
  s.statuses ??= [];
  for (const status of s.statuses) {
    if (status.id === 'poisoned' || status.id === 'bleeding' || status.id === 'burning') {
      s.wounds = Math.min(6, s.wounds + status.potency);
      addLog(s, `${status.id === 'poisoned' ? 'O veneno' : status.id === 'bleeding' ? 'O sangramento' : 'A queimadura'} causa ${status.potency} ferimento(s).`);
    }
    status.turns--;
  }
  s.statuses = s.statuses.filter((status) => status.turns > 0);
  if (s.wounds >= 6) endLife(s, 'combate');
  if (s.age >= s.maxAge) endLife(s, s.tier === 0 ? 'mortal' : 'velhice');
}

export function proceed(s: State, rng: Rng) {
  if (s.ending) return;
  s.result = null;
  s.current = null;
  advance(s, rng);
  if (s.ending) return;
  pickNext(s, rng);
}

const RARITY_W = { comum: 10, incomum: 6, raro: 2.5, epico: 1.2, lendario: 0.5 } as const;

/** Evento "genérico": repetível e sem nenhuma condição além de reino/idade. */
function isGeneric(e: GameEvent): boolean {
  const c = e.cond;
  if (e.once) return false;
  if (!c) return true;
  return !(c.path || c.origin || c.flags?.length || c.local || c.faction || c.item || c.itemsAll?.length || c.itemsAny?.length || c.stat || c.pedrasMin || c.karmaMin || c.karmaMax || c.fameMin || c.corrMin || c.mundo);
}
const GENERIC_IDS = new Set(EVENTS.filter(isGeneric).map((e) => e.id));

function setCurrent(s: State, id: string, rng: Rng) {
  const n = 1 + (EVENT[id]?.alt?.length ?? 0);
  s.current = { id, v: n > 1 ? rng.int(0, n - 1) : 0 };
  const opponents = EVENT[id]?.combate?.oponentes;
  if (opponents?.length) {
    s.current.foe = rng.pick(opponents);
    s.current.foeName = FOE[s.current.foe]?.name;
  }
}

/** Atualiza a era do mundo. Devolve true se já definiu o próximo turno (abertura de era ou fim de vida). */
function updateWorld(s: State, rng: Rng): boolean {
  if (s.world && s.age >= s.world.until) {
    addLog(s, `Termina a era: ${WORLD[s.world.id].name}.`);
    s.lastWorld = s.world.id;
    s.world = null;
    s.nextWorldAt = s.age + rng.int(35, 110);
  }
  if (!s.world && s.age >= (s.nextWorldAt ?? 1e9) && rng.chance(0.5)) {
    const cands = WORLDS.filter((w) => s.tier >= w.minTier && s.tier <= (w.maxTier ?? 99) && w.id !== s.lastWorld && EVENT[w.startEvent]);
    if (cands.length) {
      const w = rng.weighted(cands, (x) => x.weight);
      s.world = { id: w.id, until: s.age + rng.int(w.years[0], w.years[1]) };
      addLog(s, `Começa a era: ${w.name}.`);
      setCurrent(s, w.startEvent, rng);
      return true;
    }
  }
  const w = s.world ? WORLD[s.world.id] : null;
  if (w?.hazard && s.tier >= w.hazard.minTier && s.tier <= w.hazard.maxTier) {
    const prot = Math.min(0.75, (eff(s, 'fis') + eff(s, 'dao')) / 130);
    if (rng.chance(w.hazard.base * (1 - prot))) {
      if (s.items.includes('talisma_escudo')) {
        s.items.splice(s.items.indexOf('talisma_escudo'), 1);
        addLog(s, `O Talismã de Escudo absorve o golpe da era (${w.name}).`);
      } else {
        addLog(s, fill(s, w.hazard.text));
        endLife(s, w.hazard.fim);
        return true;
      }
    }
  }
  return false;
}

export function eligibleEvents(s: State): GameEvent[] {
  return EVENTS.filter((e) => {
    const last = s.seen[e.id];
    if (last !== undefined && (e.once || s.age - last < (e.cooldown ?? 15))) return false;
    return condMet(s, e.cond);
  });
}

const CATS_EV = new Map<string, Cat[]>();
const TODAS_CATS: Cat[] = ['combate', 'social', 'perigo', 'tesouro', 'cultivo', 'viagem'];
/** Multiplicador de afinidade por categoria para este personagem (calculado uma vez por turno; ver src/data/afinidades.ts). */
function afinidadePorCat(s: State): Record<Cat, number> {
  const keys = [s.talent, s.flaw, s.origin, s.path, s.constitution ?? '', ...rootTags(s.root)];
  const m = { combate: 1, social: 1, perigo: 1, tesouro: 1, cultivo: 1, viagem: 1 } as Record<Cat, number>;
  for (const k of keys) {
    const a = AFINIDADES[k];
    if (!a) continue;
    for (const c of TODAS_CATS) if (a[c]) m[c] *= a[c]!;
  }
  return m;
}
/** O que o personagem é atrai o tipo de acontecimento que combina com ele. */
function afinidade(e: GameEvent, porCat: Record<Cat, number>): number {
  let cats = CATS_EV.get(e.id);
  if (!cats) { cats = categorias(e); CATS_EV.set(e.id, cats); }
  let m = 1;
  for (const c of cats) m *= porCat[c];
  return Math.max(0.3, Math.min(4, m));
}

export function pickNext(s: State, rng: Rng) {
  if (s.ending) return;
  // 1) rompimento
  if (s.tier > 0 && s.xp >= 100 && s.age - (s.seen['__break'] ?? -99) >= 3) {
    s.current = { id: '__break', breakthrough: true };
    return;
  }
  // 2) eventos agendados
  const dueIdx = s.scheduled.findIndex((x) => x.at <= s.age && EVENT[x.event] && s.seen[x.event] === undefined);
  if (dueIdx >= 0) {
    const due = s.scheduled.splice(dueIdx, 1)[0];
    setCurrent(s, due.event, rng);
    return;
  }
  // 2b) eras do mundo
  if (updateWorld(s, rng)) return;
  // 2c) reclusão (reinos altos): em vez de mais um evento genérico, passam-se anos
  if (s.tier >= 3 && s.tier === Math.min(s.tier, 8) && rng.chance(P_RETIRO[Math.min(s.tier, 8)]) && s.turn - (s.seen['__retiro'] ?? -9) >= 2) {
    const years = realmOf(s).years;
    s.seen['__retiro'] = s.turn;
    s.current = { id: '__retiro', retiro: true, d: rng.int(Math.max(3, Math.round(years * 0.05)), Math.max(5, Math.round(years * 0.14))), v: rng.int(0, 4) };
    return;
  }
  // 3) vida comum caso nunca desperte
  if (s.tier === 0 && s.age >= 30 && s.seen['vida_comum'] === undefined) {
    s.current = { id: 'vida_comum' };
    return;
  }
  let pool = eligibleEvents(s);
  // Despertou mas ainda sem método: só as cenas que apresentam um caminho (ver trilha_inicial.ts).
  if (!s.path && s.tier >= 1) {
    const scenes = pool.filter((e) => e.cond?.noFlags?.includes('trilha_definida'));
    if (scenes.length) pool = scenes;
  }
  const guildRep = s.guild ? factionReputation(s, s.guild) : 0;
  if (s.guild && guildRep <= -40 && rng.chance(0.2)) {
    const ambushes = pool.filter((event) => event.type === 'combat' && condMet(s, event.cond));
    if (ambushes.length) {
      const ambush = rng.pick(ambushes);
      setCurrent(s, ambush.id, rng);
      addLog(s, `${GUILD_NAMES[s.guild]} enviou uma patrulha hostil.`);
      return;
    }
  }
  const regionalPool = REGION_POOLS[s.place]
    ?.map(({ eventId }) => EVENT[eventId])
    .filter((e): e is GameEvent => !!e && pool.includes(e));
  if (regionalPool?.length && rng.chance(0.38)) pool = regionalPool;
  const luck = 1 + eff(s, 'sor') / 50;
  const porCat = afinidadePorCat(s);
  const ev = rng.weighted(pool, (e) => {
    const regionalWeight = REGION_POOLS[s.place]?.find((entry) => entry.eventId === e.id)?.weight ?? 1;
    let w = RARITY_W[e.rarity] * (e.weight ?? 1) * regionalWeight * (e.rarity === 'comum' ? 1 : luck);
    if (!e.once) w *= Math.pow(0.45, s.counts?.[e.id] ?? 0); // fadiga: o que já aconteceu várias vezes perde peso
    const generic = GENERIC_IDS.has(e.id);
    if (generic) w *= 0.5;
    const c0 = e.cond;
    if (c0 && (c0.talent || c0.flaw || c0.origin || c0.constitution || c0.root)) w *= 2.2; // eventos do próprio traço do personagem
    else if ((e.cond?.tierMin ?? 0) >= 2 && (e.cond?.tierMax ?? 8) - (e.cond?.tierMin ?? 0) <= 3) w *= 1.35; // específicos do reino
    if (!e.once && s.pen?.[e.id]) w *= s.pen[e.id];
    w *= afinidade(e, porCat);
    if (s.world) {
      if (e.cond?.mundo?.includes(s.world.id)) w *= 3; // a era do mundo puxa seus próprios eventos
      else if (generic) w *= 0.7;
    }
    return w;
  });
  setCurrent(s, ev ? ev.id : 'dia_comum', rng);
}

/* ---------- Final da vida ---------- */
export const ACH_POINTS: Record<string, number> = { ach_despertar: 3, ach_vinganca: 5, ach_fundador: 8, ach_amor: 5, ach_milionario: 4, ach_patriarca: 6, ach_guardiao: 6, ach_pilula: 6, ach_ancestral: 6, ach_conselheiro: 5, ach_senhor_sangue: 5, ach_penitente: 6, ach_iluminacao: 8, ach_celeste: 5, ach_mestre_veneno: 4, ach_pacto_besta: 3, ach_diaspora: 3 };

export function finalizeLife(meta: Meta, s: State): void {
  if (s.summary || !s.ending) return;
  const end = ENDING[s.ending];
  const raw = s.tier * 5 + Math.min(10, s.age / 40) + s.fama / 15 + Math.max(0, s.karma) / 25;
  const difMult = s.dif === 1 ? 1.3 : s.dif === -1 ? 0.8 : 1; // desafio rende mais Herança; calmo, menos
  let gain = Math.max(1, Math.floor(raw * end.legacy * difMult));
  const newAch: string[] = [];
  for (const a of ACHIEVEMENTS) {
    if (meta.achievements.includes(a.id)) continue;
    if (ACH_CHECKS[a.id]?.(s, s.ending)) {
      meta.achievements.push(a.id);
      newAch.push(a.id);
      gain += ACH_POINTS[a.id] ?? 0;
    }
  }
  meta.codex ??= { items: [] };
  for (const id of s.found?.items ?? []) if (!meta.codex.items.includes(id)) meta.codex.items.push(id);
  meta.defeatedFoes ??= [];
  for (const id of s.defeatedFoes ?? []) if (!meta.defeatedFoes.includes(id)) meta.defeatedFoes.push(id);
  // Marcas da vida: cada decisão que gravou uma flag vira uma linha do que ficou; cada quatro rendem +1 de Herança (até +2).
  const todas = s.flags.filter((f) => MARCAS_VIDA[f]);
  const passo = Math.max(1, todas.length / 8);
  const marcas = Array.from({ length: Math.min(8, todas.length) }, (_, i) => fill(s, MARCAS_VIDA[todas[Math.floor(i * passo)]]));
  gain += Math.min(1, Math.floor(todas.length / 6));
  meta.legacy += gain;
  meta.lives++;
  if (!meta.endingsSeen.includes(s.ending)) meta.endingsSeen.push(s.ending);
  const score = s.tier * 1000 + s.age;
  if (!meta.best || score > meta.best.tier * 1000 + meta.best.age) meta.best = { tier: s.tier, age: Math.floor(s.age), ending: s.ending };
  meta.recent = [Object.keys(s.seen).filter((k) => !k.startsWith('__')), ...(meta.recent ?? [])].slice(0, 3);
  meta.history.unshift({ name: s.name, path: PATH[s.path].name, tierName: realmName(s), age: Math.floor(s.age), ending: end.name });
  if (meta.history.length > 30) meta.history.pop();
  s.summary = { legacy: gain, ach: newAch, tierName: realmName(s), marcas, equipment: { ...s.equipment } };
}

export function buyUpgrade(meta: Meta, id: string, cost: number, max: number): boolean {
  const lvl = meta.upgrades[id] ?? 0;
  const price = upgradePrice(cost, lvl);
  if (lvl >= max || meta.legacy < price) return false;
  meta.legacy -= price;
  meta.upgrades[id] = lvl + 1;
  return true;
}

/** Usa um item consumível do inventário. */
export function useItem(s: State, id: string, rng: Rng): string | null {
  const it = ITEM[id];
  if (!it?.use || !s.items.includes(id) || s.ending) return null;
  s.items.splice(s.items.indexOf(id), 1);
  applyFx(s, it.use, rng);
  const msg = `Usou ${it.name}.`;
  addLog(s, msg);
  return msg;
}

/** Permite consumir um item como ação de encontro, sem aplicar a resolução de uma luta por turnos. */
export function useItemInEncounter(s: State, id: string, rng: Rng): boolean {
  const event = s.current ? EVENT[s.current.id] : undefined;
  if (!event || eventTypeOf(event) !== 'combat') return false;
  const message = useItem(s, id, rng);
  if (!message) return false;
  s.turn++;
  s.seen[event.id] = s.age;
  s.counts ??= {};
  s.counts[event.id] = (s.counts[event.id] ?? 0) + 1;
  s.result = { text: `${message} Você aproveita o instante para se preparar.` };
  return true;
}
