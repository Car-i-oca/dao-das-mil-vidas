/**
 * Verificação da "sensação de poder": chance de sucesso dos testes por reino, eventos exclusivos por faixa de reino
 * e comparação entre trilhas.
 *
 *   npm run poder -- 400        (vidas por trilha; gera docs/poder.md)
 */
import { writeFileSync } from 'node:fs';
import { Rng } from '../src/engine/rng';
import { newMeta, rollCreation, startLife, view, choose, proceed, visibleChoices, threatTier, checkChance, EVENT, STAT_KEYS, ladderOf } from '../src/engine/engine';
import { botPick } from './bot';
import { EVENTS } from '../src/data/events';
import { PATHS } from '../src/data/paths';
import { ENDINGS } from '../src/data/endings';
import type { State } from '../src/types';

const N = Number(process.argv.slice(2).find((a) => /^\d+$/.test(a)) ?? 400);
const mean = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const pct = (x: number) => `${(100 * x).toFixed(0)}%`;

interface Row { tier: number; gap: number; chance: number }
const rows: Row[] = [];
type Agg = { stats: number[][]; tier: number[]; age: number[]; endings: Record<string, number>; asc: number; chance: Record<string, number[]>; rec: number[] };
const perPath: Record<string, Agg> = {};
/** Vida de exemplo: a primeira que chega ao 6º reino (eventos por reino). */
let sample: { path: string; byTier: Record<number, string[]> } | null = null;

for (const p of PATHS) {
  if (p.unlock) continue;
  const agg: Agg = (perPath[p.id] = { stats: [], tier: [], age: [], endings: {}, asc: 0, chance: {}, rec: [] });
  for (let i = 0; i < N; i++) {
    const seed = 5000 + i * 104729;
    const rng = new Rng(seed);
    const meta = newMeta();
    const s: State = startLife(meta, rollCreation(meta, rng), p.id, rng.seed);
    const bot = new Rng(seed ^ 0x9e3779b9);
    let guard = 0;
    const byTier: Record<number, string[]> = {};
    while (!s.ending && guard++ < 5000) {
      if (view(s).kind === 'event') {
        if (s.current && !s.current.retiro && !s.current.id.startsWith('__')) (byTier[s.tier] ??= []).push(EVENT[s.current.id]?.title ?? s.current.id);
        const idx = botPick(s, bot, false);
        const vc = visibleChoices(s)[idx]?.choice;
        const ev = EVENT[s.current!.id];
        if (vc?.check && ev) {
          const chance = checkChance(s, vc.check, ev);
          rows.push({ tier: s.tier, gap: s.tier - threatTier(s, vc.check, ev), chance });
          (agg.chance[p.id + s.tier] ??= []).push(chance);
        }
        choose(s, idx, rng);
      }
      if (s.ending) break;
      proceed(s, rng);
    }
    if (!sample && s.tier >= 6) sample = { path: p.name, byTier };
    agg.stats.push(STAT_KEYS.map((k) => s.stats[k]));
    agg.tier.push(s.tier);
    agg.age.push(s.age);
    agg.rec.push(s.rec ?? 0);
    agg.endings[s.ending ?? '??'] = (agg.endings[s.ending ?? '??'] ?? 0) + 1;
    if (s.ending === 'ascensao') agg.asc++;
  }
}

const out: string[] = [];
out.push('# Sensação de poder — verificação', '', `Gerado por \`npm run poder -- ${N}\` (${N} vidas por trilha, bot jogando).`, '');

out.push('## Chance média de sucesso dos testes por reino', '', '| Reino (índice) | Testes | Chance média | Contra ameaça ≥2 reinos abaixo | Contra ameaça do próprio reino |', '|---|---|---|---|---|');
for (let t = 1; t <= 8; t++) {
  const r = rows.filter((x) => x.tier === t);
  if (!r.length) continue;
  const low = r.filter((x) => x.gap >= 2), own = r.filter((x) => x.gap === 0);
  out.push(`| ${t} | ${r.length} | ${pct(mean(r.map((x) => x.chance)))} | ${low.length ? `${pct(mean(low.map((x) => x.chance)))} (${low.length})` : '—'} | ${own.length ? `${pct(mean(own.map((x) => x.chance)))} (${own.length})` : '—'} |`);
}

out.push('', '## Eventos específicos de cada reino', '', 'Específico = vale para no máximo 3 reinos seguidos, a partir do 2º reino (sem contar os de idade jovem). Exclusivo = vale para um único reino.', '', '| Reino | Eventos disponíveis | Específicos | Exclusivos | Específicos + exclusivos em % |', '|---|---|---|---|---|');
const lo = (e: (typeof EVENTS)[number]) => e.cond?.tierMin ?? 0, hi = (e: (typeof EVENTS)[number]) => e.cond?.tierMax ?? 8;
for (let t = 1; t <= 8; t++) {
  const av = EVENTS.filter((e) => lo(e) <= t && hi(e) >= t && (e.weight ?? 1) > 0);
  const sp = av.filter((e) => lo(e) >= 2 && hi(e) - lo(e) <= 2);
  const ex = av.filter((e) => lo(e) === t && hi(e) === t);
  out.push(`| ${t} | ${av.length} | ${sp.length} | ${ex.length} | ${pct(sp.length / av.length)} |`);
}
out.push('', `Eventos que valem para 6 reinos ou mais: ${EVENTS.filter((e) => hi(e) - lo(e) >= 5).length} de ${EVENTS.length}.`);
out.push('', '## Comparação entre trilhas', '', '| Trilha | Reino máx. médio | Idade média | Ascensão | Final mais comum | FIS | ESP | COMP | SOR | CAR | DAO | Recurso médio |', '|---|---|---|---|---|---|---|---|---|---|---|---|');
for (const p of PATHS) {
  const a = perPath[p.id];
  if (!a) continue;
  const top = Object.entries(a.endings).sort((x, y) => y[1] - x[1])[0];
  const st = STAT_KEYS.map((_, i) => mean(a.stats.map((x) => x[i])).toFixed(0));
  out.push(`| ${p.name} | ${mean(a.tier).toFixed(2)} | ${mean(a.age).toFixed(0)} | ${((100 * a.asc) / N).toFixed(1)}% | ${(ENDINGS.find((e) => e.id === top[0])?.name ?? top[0])} ${pct(top[1] / N)} | ${st.join(' | ')} | ${mean(a.rec).toFixed(1)} |`);
}
out.push('', `Escadas: ${PATHS.filter((p) => !p.unlock).map((p) => `${p.name} → ${p.ladder}`).join('; ')}.`);
const smp = sample as { path: string; byTier: Record<number, string[]> } | null;
if (smp) {
  out.push('', `## Uma vida no 6º reino (${smp.path}): eventos de cada reino`, '');
  for (const k of Object.keys(smp.byTier).map(Number).sort((a, b) => a - b)) out.push(`- **Reino ${k}** (${smp.byTier[k].length} eventos): ${smp.byTier[k].slice(0, 14).join('; ')}${smp.byTier[k].length > 14 ? '…' : ''}`);
}
writeFileSync('docs/poder.md', out.join('\n') + '\n');
console.log(out.join('\n'));
void ladderOf;
