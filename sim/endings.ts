/**
 * Teste de alcançabilidade dos finais: para cada escolha de evento que termina a vida (`fim`),
 * monta um estado que satisfaz as condições, força o resultado e confere se o final sai.
 * Uso: npm run endings
 */
import { Rng } from '../src/engine/rng';
import { newMeta, rollCreation, startLife, choose, visibleChoices, view } from '../src/engine/engine';
import { EVENTS } from '../src/data/events';
import { ENDINGS } from '../src/data/endings';
import { PATHS } from '../src/data/paths';
import type { Cond, GameEvent, Outcome, State, StatKey } from '../src/types';

class FixedRng extends Rng {
  constructor(private v: number) { super(1); }
  next() { return this.v; }
}

function satisfy(s: State, c?: Cond) {
  if (!c) return;
  if (c.tierMin !== undefined) s.tier = Math.max(s.tier, c.tierMin);
  if (c.ageMin !== undefined) s.age = Math.max(s.age, c.ageMin);
  if (c.tierMax !== undefined && s.tier > c.tierMax) s.tier = c.tierMax;
  if (c.path?.length) s.path = c.path[0];
  if (c.origin?.length) s.origin = c.origin[0];
  for (const f of [...(c.flags ?? []), ...(c.flagsAny?.length ? [c.flagsAny[0]] : [])]) if (!s.flags.includes(f)) s.flags.push(f);
  for (const k of Object.keys(c.stat ?? {}) as StatKey[]) s.stats[k] = Math.max(s.stats[k], c.stat![k]!);
  if (c.pedrasMin !== undefined) s.pedras = Math.max(s.pedras, c.pedrasMin + 400);
  if (c.karmaMin !== undefined) s.karma = Math.max(s.karma, c.karmaMin);
  if (c.karmaMax !== undefined) s.karma = Math.min(s.karma, c.karmaMax);
  if (c.fameMin !== undefined) s.fama = Math.max(s.fama, c.fameMin);
  if (c.local?.length) s.place = c.local[0];
  if (c.faction?.length) s.faction = c.faction[0];
  if (c.item) s.items.push(c.item);
  if (c.corrMin !== undefined) s.corr = Math.max(s.corr, c.corrMin);
  if (c.talent?.length) s.talent = c.talent[0];
  if (c.flaw?.length) s.flaw = c.flaw[0];
  if (c.constitution?.length) s.constitution = c.constitution[0];
  if (c.sagaStageMin !== undefined) s.turn = Math.max(s.turn, c.sagaStageMin * 6);
}

const results: { ending: string; event: string; ok: boolean; note?: string }[] = [];
for (const ev of EVENTS as GameEvent[]) {
  ev.choices.forEach((ch, ci) => {
    const outs: [string, Outcome | undefined][] = [['res', ch.res], ['ok', ch.ok], ['fail', ch.fail]];
    for (const [kind, out] of outs) {
      const fim = out?.fx?.fim;
      if (!fim) continue;
      const meta = newMeta();
      const r0 = new Rng(5);
      const s = startLife(meta, rollCreation(meta, r0), '', r0.seed);
      s.ending = null; s.current = { id: ev.id }; s.result = null;
      s.stats = { fis: 100, esp: 100, comp: 100, sor: 100, car: 100, dao: 100 };
      satisfy(s, ev.cond); satisfy(s, ch.cond);
      if (s.tier >= 1 && !s.path) s.path = 'sopro';
      if (s.path && !PATHS.some((p) => p.id === s.path)) s.path = '';
      s.maxAge = Math.max(s.maxAge, s.age + 50);
      s.wounds = 0;
      const vis = visibleChoices(s);
      const idx = vis.findIndex((v) => v.choice === ch);
      if (idx < 0) { results.push({ ending: fim, event: `${ev.id}#${ci + 1}/${kind}`, ok: false, note: 'escolha não aparece com as condições montadas' }); continue; }
      const sv = view(s);
      if (sv.choices[idx]?.disabled) { s.pedras += 1000; }
      // D20 natural 1 sempre falha e 20 sempre passa; o teste força 2 com atributo máximo/mínimo.
      if (kind === 'fail') s.stats = { fis: 0, esp: 0, comp: 0, sor: 0, car: 0, dao: 0 };
      choose(s, idx, new FixedRng(kind === 'ok' ? 0.075 : kind === 'fail' ? 0 : 0.5));
      results.push({ ending: fim, event: `${ev.id}#${ci + 1}/${kind}`, ok: s.ending === fim, note: s.ending === fim ? undefined : `terminou com ${s.ending ?? 'nada'}` });
    }
  });
}

const byEnding: Record<string, { ok: number; bad: string[] }> = {};
for (const r of results) {
  const e = (byEnding[r.ending] ??= { ok: 0, bad: [] });
  if (r.ok) e.ok++; else e.bad.push(`${r.event} (${r.note})`);
}
let failures = 0;
for (const e of ENDINGS) {
  const x = byEnding[e.id];
  const how = x ? `${x.ok} caminho(s) por evento` : 'sem evento próprio (sai por regra do motor)';
  console.log(`${x?.bad.length ? '✗' : '✓'} ${e.name.padEnd(28)} ${how}${x?.bad.length ? ' | FALHAS: ' + x.bad.join('; ') : ''}`);
  failures += x?.bad.length ?? 0;
}
if (failures) { console.log(`\n${failures} caminho(s) com falha.`); process.exit(1); }
console.log('\nTodos os finais com evento próprio são alcançáveis.');
