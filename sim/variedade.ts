/**
 * Diagnóstico de variedade: mede repetição de eventos, diversidade entre vidas seguidas e distribuição de finais.
 *
 *   npm run variedade -- 3000                gera docs/variedade.md (compara com o baseline, se existir)
 *   npm run variedade -- 3000 --baseline     grava o resultado atual como baseline (docs/variedade.baseline.json)
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { newMeta, ladderOf, PATH, finalizeLife } from '../src/engine/engine';
import { playLife } from './bot';
import { EVENTS } from '../src/data/events';
import { ENDINGS } from '../src/data/endings';
import type { GameEvent } from '../src/types';

const args = process.argv.slice(2);
const N = Number(args.find((a) => /^\d+$/.test(a)) ?? 3000);
const saveBaseline = args.includes('--baseline');
const BASELINE = 'docs/variedade.baseline.json';

const ID_GENERIC = (e: GameEvent) => {
  const c = e.cond;
  if (e.once) return false;
  if (!c) return true;
  return !(c.path || c.origin || c.flags?.length || c.local || c.faction || c.item || c.stat || c.pedrasMin || c.karmaMin || c.karmaMax || c.fameMin || c.corrMin || c.sagaStageMin);
};
const GENERIC = new Set(EVENTS.filter(ID_GENERIC).map((e) => e.id));

interface Life { ids: string[]; ending: string; age: number; tierMax: number; ladder: string; ticks: { id: string; age: number; tier: number }[] }
const lives: Life[] = [];
// Vidas em sequências de 10 com a mesma Herança (memória entre vidas: o que já apareceu perde peso).
let meta = newMeta();
for (let i = 0; i < N; i++) {
  if (i % 10 === 0) meta = newMeta();
  const counts: Record<string, number> = {};
  const trace: { id: string; age: number; tier: number }[] = [];
  const s = playLife(meta, 1000 + i * 7919, '', false, counts, {}, trace);
  const real = trace.filter((t) => !t.id.startsWith('__'));
  finalizeLife(meta, s);
  lives.push({ ids: real.map((t) => t.id), ending: s.ending ?? '??', age: s.age, tierMax: s.tier, ladder: ladderOf(s).name, ticks: real });
}

/* ---------- métricas ---------- */
const mean = (a: number[]) => a.reduce((x, y) => x + y, 0) / (a.length || 1);
const pct = (x: number) => `${(100 * x).toFixed(1)}%`;
const q = (a: number[], p: number) => [...a].sort((x, y) => x - y)[Math.floor(p * (a.length - 1))];

const perLife = lives.map((l) => l.ids.length);
const distinctLife = lives.map((l) => new Set(l.ids).size);
const repeatedOcc = lives.map((l) => l.ids.length - new Set(l.ids).size);
const repeatShare = repeatedOcc.reduce((a, b) => a + b, 0) / perLife.reduce((a, b) => a + b, 0);
const genericTurns = lives.reduce((a, l) => a + l.ids.filter((id) => GENERIC.has(id)).length, 0) / perLife.reduce((a, b) => a + b, 0);

// diversidade em janelas de 10 vidas seguidas
const windows: number[] = [];
for (let i = 0; i + 10 <= lives.length; i += 5) {
  const set = new Set<string>();
  for (let j = i; j < i + 10; j++) for (const id of lives[j].ids) set.add(id);
  windows.push(set.size);
}
// parecença entre vidas consecutivas (Jaccard dos conjuntos de eventos)
const jac: number[] = [];
for (let i = 0; i + 1 < lives.length; i++) {
  const a = new Set(lives[i].ids), b = new Set(lives[i + 1].ids);
  let inter = 0; for (const x of a) if (b.has(x)) inter++;
  jac.push(inter / (a.size + b.size - inter || 1));
}

// finais
const endCount: Record<string, number> = {};
for (const l of lives) endCount[l.ending] = (endCount[l.ending] ?? 0) + 1;
const endShares = ENDINGS.map((e) => ({ id: e.id, name: e.name, n: endCount[e.id] ?? 0 })).sort((a, b) => b.n - a.n);
const topEnd = endShares[0];
const entropy = -endShares.filter((e) => e.n).reduce((a, e) => a + (e.n / N) * Math.log2(e.n / N), 0);
const endingsOver1 = endShares.filter((e) => e.n / N >= 0.01).length;

// eventos mais repetidos (ocorrências repetidas por vida) e quanto cada um pesa nos turnos
const rep: Record<string, { extra: number; lives2: number; total: number }> = {};
for (const l of lives) {
  const c: Record<string, number> = {};
  for (const id of l.ids) c[id] = (c[id] ?? 0) + 1;
  for (const [id, n] of Object.entries(c)) {
    const r = (rep[id] ??= { extra: 0, lives2: 0, total: 0 });
    r.total += n; r.extra += n - 1; if (n >= 2) r.lives2++;
  }
}
const topRep = Object.entries(rep).sort((a, b) => b[1].extra - a[1].extra).slice(0, 30);

// ritmo por reino: turnos e anos
const byTier: Record<number, { turns: number; years: number; lifeCount: number }> = {};
for (const l of lives) {
  const seen = new Set<number>();
  l.ticks.forEach((t, i) => {
    const b = (byTier[t.tier] ??= { turns: 0, years: 0, lifeCount: 0 });
    b.turns++;
    const next = l.ticks[i + 1];
    b.years += (next ? next.age : l.age) - t.age;
    if (!seen.has(t.tier)) { seen.add(t.tier); b.lifeCount++; }
  });
}
// eventos por reino (conteúdo disponível)
const availByTier: Record<number, { total: number; generic: number }> = {};
for (let t = 0; t <= 8; t++) {
  const ev = EVENTS.filter((e) => (e.cond?.tierMin ?? 0) <= t && (e.cond?.tierMax ?? 99) >= t && !e.cond?.flags?.length);
  availByTier[t] = { total: ev.length, generic: ev.filter((e) => GENERIC.has(e.id)).length };
}
const genericList = EVENTS.filter((e) => GENERIC.has(e.id));
const genericAvgCooldown = mean(genericList.map((e) => e.cooldown ?? 15));
const genericAvgWeight = mean(genericList.map((e) => e.weight ?? 1));

const metrics = {
  eventosPorVida: mean(perLife),
  distintosPorVida: mean(distinctLife),
  repeticao: repeatShare,
  genericosNosTurnos: genericTurns,
  distintosEm10Vidas: mean(windows),
  similaridadeVidasSeguidas: mean(jac),
  finalMaisComum: topEnd.n / N,
  finalMaisComumNome: topEnd.name,
  entropiaFinais: entropy,
  finaisAcima1pct: endingsOver1,
  idadeMedia: mean(lives.map((l) => l.age)),
  totalEventos: EVENTS.length,
};

/* ---------- documento ---------- */
const base = existsSync(BASELINE) ? (JSON.parse(readFileSync(BASELINE, 'utf8')) as typeof metrics) : null;
const delta = (k: keyof typeof metrics, fmt: (x: number) => string) => {
  const v = metrics[k] as number;
  if (!base || saveBaseline) return fmt(v);
  const b = base[k] as number;
  return `${fmt(b)} → **${fmt(v)}**`;
};

const L: string[] = [];
L.push('# Diagnóstico de variedade', '');
L.push(`Gerado por \`npm run variedade -- ${N}\` em ${new Date().toISOString().slice(0, 10)} (vidas independentes, meta vazia, bot de \`sim/bot.ts\`).`);
L.push(base && !saveBaseline ? 'Comparação **antes → depois** em relação ao baseline (`docs/variedade.baseline.json`).' : 'Este é o **baseline**: os números que as próximas etapas precisam melhorar.', '');
L.push('## Resumo', '', '| Métrica | Valor |', '|---|---|');
L.push(`| Eventos no jogo | ${delta('totalEventos', (x) => String(x))} |`);
L.push(`| Eventos (turnos) por vida | ${delta('eventosPorVida', (x) => x.toFixed(1))} |`);
L.push(`| Eventos distintos por vida | ${delta('distintosPorVida', (x) => x.toFixed(1))} |`);
L.push(`| Parcela de ocorrências repetidas na mesma vida | ${delta('repeticao', pct)} |`);
L.push(`| Parcela dos turnos ocupada por eventos genéricos | ${delta('genericosNosTurnos', pct)} |`);
L.push(`| Eventos distintos em 10 vidas seguidas | ${delta('distintosEm10Vidas', (x) => x.toFixed(0))} |`);
L.push(`| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | ${delta('similaridadeVidasSeguidas', (x) => x.toFixed(3))} |`);
L.push(`| Final mais comum | ${base && !saveBaseline ? `${(base as { finalMaisComumNome?: string }).finalMaisComumNome ?? '?'}: ${pct(base.finalMaisComum)} → **${topEnd.name}: ${pct(metrics.finalMaisComum)}**` : `${topEnd.name}: ${pct(metrics.finalMaisComum)}`} |`);
L.push(`| Entropia dos finais (bits; maior = mais variado) | ${delta('entropiaFinais', (x) => x.toFixed(2))} |`);
L.push(`| Finais com 1% ou mais das vidas | ${delta('finaisAcima1pct', (x) => String(x))} |`);
L.push(`| Idade média ao morrer | ${delta('idadeMedia', (x) => x.toFixed(0))} anos |`);
L.push('', `Eventos por vida: p10 ${q(perLife, 0.1)} · mediana ${q(perLife, 0.5)} · p90 ${q(perLife, 0.9)}. Distintos: p10 ${q(distinctLife, 0.1)} · mediana ${q(distinctLife, 0.5)} · p90 ${q(distinctLife, 0.9)}.`);

L.push('', '## Distribuição dos finais', '', '| Final | Vidas | % |', '|---|---:|---:|');
for (const e of endShares) L.push(`| ${e.name} | ${e.n} | ${pct(e.n / N)} |`);

L.push('', '## Os 30 eventos que mais se repetem dentro de uma mesma vida', '', 'Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.', '', '| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |', '|---:|---|---:|---:|:---:|');
topRep.forEach(([id, r], i) => L.push(`| ${i + 1} | \`${id}\` | ${(r.extra / N).toFixed(2)} | ${pct(r.lives2 / N)} | ${GENERIC.has(id) ? 'sim' : ''} |`));

L.push('', '## Ritmo por reino', '', '| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |', '|---:|---:|---:|---:|---:|');
for (const t of Object.keys(byTier).map(Number).sort((a, b) => a - b)) {
  const b = byTier[t];
  L.push(`| ${t} | ${b.lifeCount} | ${(b.turns / b.lifeCount).toFixed(1)} | ${(b.years / b.lifeCount).toFixed(0)} | ${(b.years / b.turns).toFixed(1)} |`);
}

L.push('', '## Conteúdo disponível por reino (eventos sem flag exigida)', '', '| Reino | Eventos disponíveis | Dos quais genéricos |', '|---:|---:|---:|');
for (let t = 0; t <= 8; t++) L.push(`| ${t} | ${availByTier[t].total} | ${availByTier[t].generic} |`);

L.push('', '## Causas prováveis', '');
L.push(`- **Vidas longas para a quantidade de conteúdo:** a idade média é ${metrics.idadeMedia.toFixed(0)} anos, com ${metrics.eventosPorVida.toFixed(0)} eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.`);
L.push(`- **Eventos genéricos dominam:** ${pct(metrics.genericosNosTurnos)} dos turnos são eventos sem nenhuma condição além do reino (${genericList.length} eventos), com cooldown médio de ${genericAvgCooldown.toFixed(0)} anos e peso médio de ${genericAvgWeight.toFixed(2)}. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.`);
L.push(`- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.`);
L.push(`- **Finais concentrados:** "${topEnd.name}" responde por ${pct(topEnd.n / N)} das vidas. Só ${endingsOver1} finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.`);
L.push(`- **Semelhança entre vidas:** em média, ${pct(mean(jac))} dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só ${mean(windows).toFixed(0)} de ${EVENTS.length} eventos (${pct(mean(windows) / EVENTS.length)}).`);
L.push('', '## Metas para as próximas etapas', '');
L.push('- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).');
L.push('- **Nenhum final acima de 35%** das vidas.');
L.push('- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.');
L.push('- Ascensão entre 0,5% e 2% (balanceamento atual preservado).');

writeFileSync('docs/variedade.md', L.join('\n') + '\n');
if (saveBaseline) writeFileSync(BASELINE, JSON.stringify(metrics, null, 2) + '\n');
console.log(L.slice(0, 22).join('\n'));
console.log(saveBaseline ? '\n→ baseline gravado em docs/variedade.baseline.json e docs/variedade.md' : '\n→ gravado em docs/variedade.md');
