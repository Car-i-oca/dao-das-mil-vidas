/** Conta quantas lutas (duelos animados) surgem por vida e de que tipos: npx tsx sim/lutas.ts 500 */
import { newMeta, rollCreation, startLife, view, choose, proceed } from '../src/engine/engine';
import { botPick } from './bot';
import { Rng } from '../src/engine/rng';
const N = Number(process.argv[2] ?? 500);
const cult: Record<string, number> = {}; const byFoe: Record<string, number> = {}; let total = 0, wins = 0, lives = 0;
for (let i = 0; i < N; i++) {
  const rng = new Rng(777 + i * 31); const meta = newMeta();
  const s = startLife(meta, rollCreation(meta, rng), '', rng.seed); const bot = new Rng(i + 5);
  let g = 0; lives++;
  while (!s.ending && g++ < 5000) {
    if (view(s).kind === 'event') { choose(s, botPick(s, bot, false), rng); const c = s.result?.combate; if (c) { total++; byFoe[c.foe] = (byFoe[c.foe] ?? 0) + 1; if (c.foe === 'cultivador') { const k = s.log[s.log.length - 1]?.text.split(':')[0] ?? '?'; cult[k] = (cult[k] ?? 0) + 1; } if (c.vitoria) wins++; } }
    if (s.ending) break; proceed(s, rng);
  }
}
console.log(`lutas por vida: ${(total / lives).toFixed(2)} · vitórias ${(100 * wins / total).toFixed(0)}% · tipos: ${Object.keys(byFoe).length}`);
console.log(Object.entries(byFoe).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · '));
console.log(Object.entries(cult).sort((a, b) => b[1] - a[1]).slice(0, 40).map(([k, v]) => k + ' ' + v).join(' | '));
