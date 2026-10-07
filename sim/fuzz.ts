/** Fuzzer: joga vidas com escolhas aleatórias e confere invariantes. Uso: npm run fuzz -- 4000 */
import { Rng } from '../src/engine/rng';
import { newMeta, rollCreation, startLife, view, choose, proceed, finalizeLife, useItem, ITEM, ENDING, EVENT, STAT_KEYS } from '../src/engine/engine';
import type { State } from '../src/types';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 3000);
const problems = new Map<string, number>();
const note = (msg: string) => problems.set(msg, (problems.get(msg) ?? 0) + 1);

function check(s: State, where: string) {
  for (const k of STAT_KEYS) if (!Number.isFinite(s.stats[k]) || s.stats[k] < 1 || s.stats[k] > 99) note(`${where}: atributo ${k} inválido (${s.stats[k]})`);
  for (const k of ['pedras', 'karma', 'fama', 'corr', 'wounds', 'xp', 'age', 'maxAge'] as const) if (!Number.isFinite(s[k])) note(`${where}: ${k} não numérico (${s[k]})`);
  if (s.pedras < 0) note(`${where}: pedras negativas`);
  if (s.wounds < 0) note(`${where}: ferimentos negativos`);
  if (s.corr < 0 || s.corr > 100) note(`${where}: corrupção fora de 0-100`);
  if (s.xp < 0 || s.xp > 131) note(`${where}: xp fora da faixa (${s.xp})`);
  if (s.age > s.maxAge + 200 && !s.ending) note(`${where}: idade muito acima do máximo sem final`);
  for (const id of s.items) if (!ITEM[id]) note(`${where}: item desconhecido ${id}`);
  if (s.ending && !ENDING[s.ending]) note(`${where}: final desconhecido ${s.ending}`);
  if (s.current && !s.current.breakthrough && !s.current.retiro && !EVENT[s.current.id]) note(`${where}: evento atual inexistente ${s.current.id}`);
}

let lives = 0, turns = 0;
const endings: Record<string, number> = {};
for (let i = 0; i < N; i++) {
  const meta = newMeta();
  const rng = new Rng(31337 + i * 101);
  let s: State;
  try {
    s = startLife(meta, rollCreation(meta, rng), '', rng.seed);
  } catch (e) { note('startLife lançou: ' + (e as Error).message); continue; }
  const bot = new Rng(i * 7 + 3);
  let guard = 0;
  try {
    while (!s.ending && guard++ < 6000) {
      const v = view(s);
      if (v.kind === 'event') {
        if (!v.choices.length) { note(`evento ${s.current?.id}: sem opções visíveis`); break; }
        if (v.choices.every((c) => c.disabled)) note(`evento ${s.current?.id}: todas as opções desabilitadas`);
        if (v.eventType === 'combat') {
          if (!v.choices.some((c) => c.text.startsWith('[Lutar]'))) note(`encontro ${s.current?.id}: sem ação de luta`);
          if (!v.choices.some((c) => c.text.startsWith('[Fugir]'))) note(`encontro ${s.current?.id}: sem ação de fuga`);
        }
        const open = v.choices.map((_, k) => k).filter((k) => !v.choices[k].disabled);
        const selected = open.length ? bot.pick(open) : 0;
        const selectedChoice = v.choices[selected];
        choose(s, selected, rng);
        if (selectedChoice.check && !s.result?.roll) note(`evento ${s.current?.id}: teste não gerou D20`);
        turns++;
        check(s, `evento ${s.current?.id ?? '?'}`);
        // usa itens consumíveis ao acaso
        if (bot.chance(0.1) && s.items.length && !s.ending) { useItem(s, bot.pick(s.items), rng); check(s, 'useItem'); }
      }
      if (s.ending) break;
      proceed(s, rng);
      check(s, 'proceed');
    }
    if (guard >= 6000) note('vida não terminou (6000 passos)');
    if (!s.ending) note('vida terminou sem final');
    else { finalizeLife(meta, s); endings[s.ending] = (endings[s.ending] ?? 0) + 1; if (!s.summary) note('finalizeLife não gerou resumo'); }
  } catch (e) { note('exceção: ' + (e as Error).message); }
  lives++;
}
console.log(`Fuzz: ${lives} vidas, ${turns} escolhas.`);
console.log('Finais:', JSON.stringify(endings));
if (problems.size) {
  console.log(`\n${problems.size} tipo(s) de problema:`);
  for (const [m, c] of [...problems].sort((a, b) => b[1] - a[1]).slice(0, 30)) console.log(`  ${c}× ${m}`);
  process.exit(1);
}
console.log('Nenhum problema encontrado.');
