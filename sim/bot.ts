import { Rng } from '../src/engine/rng';
import { rollCreation, startLife, view, choose, proceed, visibleChoices, type Visible } from '../src/engine/engine';
import type { Meta, Outcome, State } from '../src/types';

/** Bot compartilhado pelos simuladores (simulate, variedade). */
/** Eventos em que um jogador que busca o caminho demoníaco aceita a oferta. */
export const DEMON_EVENTS = new Set(['cena_sombra_sangue', 'oferta_demoniaca', 'sacrificio_sangue', 'pacto_sangue_antigo', 'banquete_de_sangue']);

function endRisk(c: Visible['choice'], chance: number | undefined): number {
  if (!c) return 0;
  const ends = (o?: Outcome) => !!o?.fx?.fim;
  if (c.check) return (ends(c.ok) ? chance ?? 0.5 : 0) + (ends(c.fail) ? 1 - (chance ?? 0.5) : 0);
  return ends(c.res) ? 1 : 0;
}

function demonScore(c: Visible['choice']): number {
  const o = c?.res ?? c?.ok;
  return (o?.fx?.corr ?? 0) + (o?.fx?.fim === 'demonio' ? 100 : 0) + (o?.fx?.trilha === 'demoniaca' ? 50 : 0);
}

export function botPick(s: State, rng: Rng, seekDemon: boolean): number {
  const v = view(s);
  const vis = visibleChoices(s);
  const valid = v.choices.map((c, i) => ({ c, i, raw: vis[i]?.choice })).filter((x) => !x.c.disabled);
  if (seekDemon && DEMON_EVENTS.has(s.current?.id ?? '')) {
    const best = valid.reduce((a, b) => (demonScore(b.raw) > demonScore(a.raw) ? b : a), valid[0]);
    if (demonScore(best.raw) > 0) return best.i;
  }
  // Perto do fim, qualquer final serve; antes disso, evita escolhas que encerram a vida.
  const nearEnd = s.age >= s.maxAge * 0.9 || s.maxAge - s.age < 15;
  let pool = valid;
  if (!nearEnd) {
    const safe = valid.filter((x) => endRisk(x.raw, x.c.chance) <= 0.12);
    if (safe.length) pool = safe;
  }
  if (pool.some((x) => x.c.chance !== undefined) && rng.chance(0.7)) {
    return pool.reduce((a, b) => ((b.c.chance ?? 0.6) > (a.c.chance ?? 0.6) ? b : a), pool[0]).i;
  }
  return rng.pick(pool).i;
}

export function playLife(meta: Meta, seed: number, pathId: string, seekDemon: boolean, counts: Record<string, number>, tierAges: Record<string, number[]>, trace?: { id: string; age: number; tier: number }[]): State {
  const rng = new Rng(seed);
  const creation = rollCreation(meta, rng);
  const s = startLife(meta, creation, pathId, rng.seed);
  const bot = new Rng(seed ^ 0x9e3779b9);
  let guard = 0;
  let lastTier = 0;
  while (!s.ending && guard++ < 5000) {
    if (view(s).kind === 'event') {
      const id = s.current!.id;
      counts[id] = (counts[id] ?? 0) + 1;
      trace?.push({ id, age: s.age, tier: s.tier });
      choose(s, botPick(s, bot, seekDemon), rng);
    }
    if (s.tier > lastTier) { (tierAges[`${pathId}:${s.tier}`] ??= []).push(s.age); lastTier = s.tier; }
    if (s.ending) break;
    proceed(s, rng);
  }
  return s;
}

