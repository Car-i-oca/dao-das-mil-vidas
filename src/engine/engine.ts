import { Rng } from './rng';
import type {
  Change, Check, Choice, Cond, Effects, GameEvent, Meta, Outcome, State, StatKey, Stats, Root, Realm, Item, Path,
} from '../types';
import { LADDERS } from '../data/realms';
import { PATHS } from '../data/paths';
import { ORIGINS, TALENTS, FLAWS } from '../data/character';
import { ITEMS } from '../data/items';
import { TECHNIQUES } from '../data/techniques';
import { ENDINGS, ACHIEVEMENTS, ACH_CHECKS, upgradePrice } from '../data/endings';
import { CONSTITUTIONS, personName, sectName, clanName, villageName, rollRoot } from '../data/names';
import { EVENTS } from '../data/events';

/* ---------- Índices ---------- */
const byId = <T extends { id: string }>(a: T[]) => Object.fromEntries(a.map((x) => [x.id, x])) as Record<string, T>;
/** Enquanto o personagem não encontra um método, usa-se uma trilha neutra (escada xianxia, sem bônus). */
const NO_PATH: Path = { id: '', name: 'Sem trilha ainda', ladder: 'neutro', desc: 'O método ainda será encontrado.', stats: {}, xpMult: 1, tags: [] };
export const PATH: Record<string, Path> = { ...byId(PATHS), '': NO_PATH };
export const ORIGIN = byId(ORIGINS);
export const TALENT = byId(TALENTS);
export const FLAW = byId(FLAWS);
export const ITEM = byId(ITEMS);
export const TECH = byId(TECHNIQUES);
export const ENDING = byId(ENDINGS);
export const EVENT = byId(EVENTS);
export const CONSTITUTION = byId(CONSTITUTIONS);

export const STAT_NAMES: Record<StatKey, string> = {
  fis: 'Físico', esp: 'Espírito', comp: 'Compreensão', sor: 'Sorte', car: 'Carisma', dao: 'Coração do Dao',
};
export const STAT_KEYS: StatKey[] = ['fis', 'esp', 'comp', 'sor', 'car', 'dao'];

export function newMeta(): Meta {
  return { legacy: 0, achievements: [], upgrades: {}, lives: 0, best: null, endingsSeen: [], history: [], codex: { items: [], techs: [] } };
}

/* ---------- Consultas ---------- */
export const ladderOf = (s: State) => LADDERS[PATH[s.path].ladder];
export const realmOf = (s: State, tier = s.tier): Realm => ladderOf(s).realms[tier];
export const realmName = (s: State) => realmOf(s).name;
export const has = (s: State, f: string) => s.flags.includes(f);

export function eff(s: State, k: StatKey): number {
  let v = s.stats[k];
  for (const id of s.items) v += ITEM[id]?.passive?.[k] ?? 0;
  for (const id of s.techniques) v += TECH[id]?.stats?.[k] ?? 0;
  return v;
}

function xpMult(s: State): number {
  let m = PATH[s.path].xpMult * s.root.mult * (TALENT[s.talent].xpMult ?? 1) * (FLAW[s.flaw].xpMult ?? 1);
  if (s.constitution) m *= CONSTITUTION[s.constitution].xpMult ?? 1;
  for (const t of s.techniques) m *= TECH[t]?.xpMult ?? 1;
  return m * (1 + 0.03 * s.legacyBonus.xp);
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
    .replace(/\{seita\}/g, s.names.seita)
    .replace(/\{cla\}/g, s.names.cla)
    .replace(/\{vila\}/g, s.names.vila)
    .replace(/\{idade\}/g, String(Math.floor(s.age)))
    .replace(/\{reino\}/g, realmName(s));
}

export function condMet(s: State, c?: Cond): boolean {
  if (!c) return true;
  if (c.ageMin !== undefined && s.age < c.ageMin) return false;
  if (c.ageMax !== undefined && s.age > c.ageMax) return false;
  if (c.tierMin !== undefined && s.tier < c.tierMin) return false;
  if (c.tierMax !== undefined && s.tier > c.tierMax) return false;
  if (c.path && !c.path.includes(s.path)) return false;
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
  if (c.tecnica && !s.techniques.includes(c.tecnica)) return false;
  if (c.corrMin !== undefined && s.corr < c.corrMin) return false;
  return true;
}

/* ---------- Testes ---------- */
export function checkDifficulty(s: State, ch: Check): number {
  return 8 + s.tier * 6 + (ch.dif ?? 0);
}

export function checkChance(s: State, ch: Check): number {
  const keys = Array.isArray(ch.stat) ? ch.stat : [ch.stat];
  let total = keys.reduce((a, k) => a + eff(s, k), 0) / keys.length;
  if (ch.tag) {
    if (PATH[s.path].tags.includes(ch.tag)) total += 1;
    for (const t of s.techniques) {
      const tech = TECH[t];
      if (tech?.tags?.includes(ch.tag)) total += tech.grade;
    }
  }
  const p = 0.5 + (total - checkDifficulty(s, ch)) * 0.035 + (eff(s, 'sor') - 10) * 0.004 - s.wounds * 0.03 + s.legacyBonus.luck * 0.01;
  return Math.min(0.95, Math.max(0.05, p));
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
    rival: personName(rng), mentor: personName(rng), amigo: personName(rng), noivo: personName(rng),
    seita: sectName(rng), cla: clanName(rng), vila: villageName(rng),
  };
  const s: State = {
    v: 1, seed: rng.seed, name: personName(rng), path: pathId, origin: c.origin, root: c.root,
    talent: c.talent, flaw: c.flaw, constitution: c.constitution,
    age: 6, tier: 0, xp: 0, stats, pedras: origin.pedras + 10 * (up.bolso ?? 0), karma: 0, fama: 0, corr: path.startCorr ?? 0, wounds: 0,
    maxAge: Math.round(LADDERS[path.ladder].realms[0].lifespan * lifeMult),
    place: origin.place, faction: origin.faction, flags: [...(origin.flags ?? [])],
    items: [], techniques: path.tecnica ? [path.tecnica] : [], names, scheduled: [], seen: {}, log: [],
    turn: 0, current: null, result: null, ending: null, endingText: null,
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

function noteFound(s: State, kind: 'items' | 'techs', id: string) {
  s.found ??= { items: [], techs: [] };
  if (!s.found[kind].includes(id)) s.found[kind].push(id);
}

export function endLife(s: State, id: string) {
  if (s.ending) return;
  s.ending = id;
  s.endingText = fill(s, ENDING[id].text);
  s.current = null;
}

function tierUp(s: State, delta: number) {
  const max = ladderOf(s).realms.length - 1;
  const t = Math.min(max, Math.max(0, s.tier + delta));
  if (t === s.tier) return;
  if (delta > 0) {
    for (const k of STAT_KEYS) s.stats[k] += 2;
    s.fama += t * 2;
  }
  s.tier = t;
  s.xp = 0;
  const lifeMult = (TALENT[s.talent].lifeMult ?? 1) * (FLAW[s.flaw].lifeMult ?? 1);
  s.maxAge = Math.max(s.maxAge, Math.round(realmOf(s).lifespan * lifeMult));
  addLog(s, `Alcançou o reino: ${realmName(s)}.`);
}

/** Adota uma trilha: aplica bônus de atributos, a técnica inicial e a corrupção/facção da trilha do Sangue. */
function setPath(s: State, id: string) {
  const p = PATH[id];
  if (!p || !id || s.path) return;
  s.path = id;
  for (const k of Object.keys(p.stats) as StatKey[]) s.stats[k] = Math.max(1, s.stats[k] + (p.stats[k] ?? 0));
  if (p.tecnica && !s.techniques.includes(p.tecnica)) { s.techniques.push(p.tecnica); noteFound(s, 'techs', p.tecnica); }
  if (p.startCorr) s.corr = Math.min(100, s.corr + p.startCorr);
  if (id === 'demoniaca') {
    s.faction = 'demoniaca';
    if (!s.flags.includes('membro_demoniaca')) s.flags.push('membro_demoniaca');
  }
  if (!s.flags.includes('trilha_definida')) s.flags.push('trilha_definida');
  const lifeMult = (TALENT[s.talent].lifeMult ?? 1) * (FLAW[s.flaw].lifeMult ?? 1);
  s.maxAge = Math.max(s.maxAge, Math.round(realmOf(s).lifespan * lifeMult));
  addLog(s, `Encontrou seu método: ${p.name}.`);
}

export function applyFx(s: State, fx: Effects | undefined, rng: Rng) {
  if (!fx) return;
  if (fx.trilha) setPath(s, fx.trilha);
  if (fx.stats) for (const k of Object.keys(fx.stats) as StatKey[]) s.stats[k] = Math.min(99, Math.max(1, s.stats[k] + (fx.stats[k] ?? 0)));
  if (fx.pedras) s.pedras = Math.max(0, s.pedras + fx.pedras);
  if (fx.karma) s.karma += fx.karma;
  if (fx.fama) s.fama = Math.max(0, s.fama + fx.fama);
  // Ganhos de eventos são em % do reino; em reinos altos valem menos (o cultivo exige mais anos).
  if (fx.xp && s.tier > 0) s.xp = Math.min(130, Math.max(0, s.xp + fx.xp * Math.min(1, Math.pow(10 / realmOf(s).years, 0.75))));
  if (fx.vida) s.maxAge += fx.vida;
  if (fx.ferida) s.wounds = Math.max(0, s.wounds + fx.ferida);
  // Quem trilha o Caminho do Sangue controla melhor a corrupção (compensa o ritmo de cultivo maior).
  if (fx.corr) s.corr = Math.min(100, Math.max(0, s.corr + (fx.corr > 0 && s.path === 'demoniaca' ? fx.corr * 0.6 : fx.corr)));
  if (fx.setFlags) for (const f of fx.setFlags) if (!s.flags.includes(f)) s.flags.push(f);
  if (fx.clearFlags) s.flags = s.flags.filter((f) => !fx.clearFlags!.includes(f));
  if (fx.item) for (const i of fx.item) if (s.items.length < 40) { s.items.push(i); noteFound(s, 'items', i); }
  if (fx.removeItem) {
    for (const i of fx.removeItem) {
      const idx = s.items.indexOf(i);
      if (idx >= 0) s.items.splice(idx, 1);
    }
  }
  if (fx.tecnica) for (const t of fx.tecnica) if (!s.techniques.includes(t)) { s.techniques.push(t); noteFound(s, 'techs', t); }
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
    base * statFactor + (FLAW[s.flaw].breakMod ?? 0) + cons +
    Math.min(0.15, Math.max(0, (s.xp - 100) * 0.005)) - s.wounds * 0.04 + (pill?.breakBonus?.bonus ?? 0);
  return Math.min(0.95, Math.max(0.03, p));
}

function tribulationChance(s: State): number {
  const next = s.tier + 1;
  const avg = (eff(s, 'fis') + eff(s, 'esp') + eff(s, 'dao')) / 3;
  const karmaMod = Math.max(-0.08, Math.min(0.08, s.karma / 300)); // karma positivo suaviza a tribulação, negativo a endurece
  return Math.min(0.95, Math.max(0.25, 0.6 + (avg - (6 + next * 4)) * 0.035 - s.wounds * 0.04 + karmaMod));
}

function doBreakthrough(s: State, rng: Rng, pill?: Item): string {
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
      if (!rng.chance(tribulationChance(s))) {
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
  chance?: number;
  disabled?: boolean;
  note?: string;
}

export interface View {
  kind: 'event' | 'result' | 'ending';
  title: string;
  text: string;
  rarity?: string;
  choices: ViewChoice[];
}

export interface Visible { choice?: Choice; action?: 'break' | 'wait'; pill?: Item }

export function visibleChoices(s: State): Visible[] {
  if (s.current?.breakthrough) {
    const v: Visible[] = [{ action: 'break' }];
    for (const p of breakPills(s)) v.push({ action: 'break', pill: p });
    v.push({ action: 'wait' });
    return v;
  }
  const ev = EVENT[s.current!.id];
  const out: Visible[] = ev.choices.filter((c) => condMet(s, c.cond) && (c.custo === undefined || true)).map((choice) => ({ choice }));
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
  const ev = EVENT[cur.id];
  const choices: ViewChoice[] = visibleChoices(s).map((v) => {
    const c = v.choice!;
    const vc: ViewChoice = { text: fill(s, c.text) };
    if (c.check) vc.chance = checkChance(s, c.check);
    if (c.custo) {
      vc.note = `${c.custo} pedras`;
      if (s.pedras < c.custo) vc.disabled = true;
    }
    return vc;
  });
  return { kind: 'event', title: fill(s, ev.title), text: fill(s, ev.text), rarity: ev.rarity, choices };
}

/* ---------- Escolhas ---------- */
interface Snap { realm: string; stats: Stats; pedras: number; karma: number; fama: number; corr: number; wounds: number; tier: number; xp: number; maxAge: number; items: string[]; techs: string[]; path: string }
const snap = (s: State): Snap => ({ realm: realmName(s), stats: { ...s.stats }, pedras: s.pedras, karma: s.karma, fama: s.fama, corr: s.corr, wounds: s.wounds, tier: s.tier, xp: s.xp, maxAge: s.maxAge, items: [...s.items], techs: [...s.techniques], path: s.path });

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
  for (const id of s.techniques) if (!b.techs.includes(id)) out.push({ t: `Técnica: ${TECH[id]?.name ?? id}`, k: 'up' });
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

function chooseCore(s: State, idx: number, rng: Rng) {
  if (s.ending && s.result) return;
  const vis = visibleChoices(s);
  const v = vis[idx];
  if (!v) return;
  if (v.choice?.custo && s.pedras < v.choice.custo) return;
  s.turn++;
  if (v.action) {
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
  if (c.custo) s.pedras = Math.max(0, s.pedras - c.custo);
  let out: Outcome;
  let check: { chance: number; success: boolean } | undefined;
  if (c.check) {
    const chance = checkChance(s, c.check);
    const success = rng.chance(chance);
    out = (success ? c.ok : c.fail) ?? c.res ?? { text: '' };
    check = { chance, success };
  } else {
    out = c.res ?? c.ok ?? { text: '' };
  }
  s.seen[ev.id] = s.age;
  const txt = fill(s, out.text);
  s.result = { text: txt, check };
  addLog(s, `${fill(s, ev.title)}: ${txt}`);
  applyFx(s, out.fx, rng);
}

/* ---------- Passagem do tempo e próximo evento ---------- */
function advance(s: State, rng: Rng) {
  const realm = realmOf(s);
  const dt = s.tier === 0 ? rng.int(1, 2) : rng.int(1, Math.max(2, Math.ceil(realm.years / 8)));
  if (s.tier > 0) s.xp = Math.min(130, s.xp + cultivationRate(s) * dt);
  s.age += dt;
  s.wounds = Math.max(0, s.wounds - Math.floor(dt * 0.4 + rng.next()));
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

const RARITY_W = { comum: 10, raro: 2.5, lendario: 0.5 } as const;

export function eligibleEvents(s: State): GameEvent[] {
  return EVENTS.filter((e) => {
    const last = s.seen[e.id];
    if (last !== undefined && (e.once || s.age - last < (e.cooldown ?? 15))) return false;
    return condMet(s, e.cond);
  });
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
    s.current = { id: due.event };
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
  const luck = 1 + eff(s, 'sor') / 50;
  const ev = rng.weighted(pool, (e) => RARITY_W[e.rarity] * (e.weight ?? 1) * (e.rarity === 'comum' ? 1 : luck));
  s.current = { id: ev ? ev.id : 'dia_comum' };
}

/* ---------- Final da vida ---------- */
export const ACH_POINTS: Record<string, number> = { ach_despertar: 3, ach_vinganca: 5, ach_fundador: 8, ach_amor: 5, ach_milionario: 4, ach_patriarca: 6, ach_guardiao: 6, ach_pilula: 6, ach_ancestral: 6, ach_conselheiro: 5, ach_senhor_sangue: 5, ach_penitente: 6, ach_iluminacao: 8, ach_celeste: 5, ach_mestre_veneno: 4, ach_pacto_besta: 3, ach_diaspora: 3 };

export function finalizeLife(meta: Meta, s: State): void {
  if (s.summary || !s.ending) return;
  const end = ENDING[s.ending];
  const raw = s.tier * 5 + Math.min(10, s.age / 40) + s.fama / 15 + Math.max(0, s.karma) / 25;
  let gain = Math.max(1, Math.floor(raw * end.legacy));
  const newAch: string[] = [];
  for (const a of ACHIEVEMENTS) {
    if (meta.achievements.includes(a.id)) continue;
    if (ACH_CHECKS[a.id]?.(s, s.ending)) {
      meta.achievements.push(a.id);
      newAch.push(a.id);
      gain += ACH_POINTS[a.id] ?? 0;
    }
  }
  meta.codex ??= { items: [], techs: [] };
  for (const id of s.found?.items ?? []) if (!meta.codex.items.includes(id)) meta.codex.items.push(id);
  for (const id of [...(s.found?.techs ?? []), ...s.techniques]) if (!meta.codex.techs.includes(id)) meta.codex.techs.push(id);
  meta.legacy += gain;
  meta.lives++;
  if (!meta.endingsSeen.includes(s.ending)) meta.endingsSeen.push(s.ending);
  const score = s.tier * 1000 + s.age;
  if (!meta.best || score > meta.best.tier * 1000 + meta.best.age) meta.best = { tier: s.tier, age: Math.floor(s.age), ending: s.ending };
  meta.history.unshift({ name: s.name, path: PATH[s.path].name, tierName: realmName(s), age: Math.floor(s.age), ending: end.name });
  if (meta.history.length > 30) meta.history.pop();
  s.summary = { legacy: gain, ach: newAch, tierName: realmName(s) };
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
