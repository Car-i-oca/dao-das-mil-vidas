/**
 * Simulador de vidas automáticas para balanceamento.
 *
 *   npm run sim -- 4000                 vidas independentes (meta vazia), todas as trilhas
 *   npm run sim -- 4000 --meta          vidas em sequência: conquistas, origens, talentos e trilhas vão sendo liberados
 *   npm run sim -- 4000 --report        roda os dois modos e grava docs/balanceamento.md
 */
import { writeFileSync } from 'node:fs';
import {
  newMeta, finalizeLife, buyUpgrade, ladderOf, PATH,
} from '../src/engine/engine';
import { playLife } from './bot';
import { PATHS } from '../src/data/paths';
import { EVENTS } from '../src/data/events';
import { ITEMS } from '../src/data/items';
import { ENDINGS, ACHIEVEMENTS, UPGRADES } from '../src/data/endings';
import { ORIGINS, TALENTS } from '../src/data/character';
import type { Meta, State } from '../src/types';

const args = process.argv.slice(2);
const N = Number(args.find((a) => /^\d+$/.test(a)) ?? 1000);
const verbose = args.includes('--verbose');
const metaMode = args.includes('--meta');
const report = args.includes('--report');

/* ---------- Coleta ---------- */
interface Run {
  title: string;
  total: number;
  ends: Record<string, number>;
  tiers: Record<string, number>;
  ages: number[];
  events: Record<string, number>;
  byPath: Record<string, { n: number; tierSum: number; ageSum: number; asc: number }>;
  ascensions: number;
  tierAges: Record<string, number[]>;
  timeline: { id: string; life: number }[];
  pathUse: Record<string, number>;
  originUse: Record<string, number>;
  talentUse: Record<string, number>;
  /** Por artefato: vidas que o possuíam ao morrer, soma da faixa relativa e consagrações. */
  gear: Record<string, { n: number; rel: number; asc: number }>;
  relSum: number;
  finalMeta?: Meta;
  ascByQuartile: number[];
}

function emptyRun(title: string): Run {
  return { title, total: 0, ends: {}, tiers: {}, ages: [], events: {}, byPath: {}, ascensions: 0, tierAges: {}, timeline: [], pathUse: {}, originUse: {}, talentUse: {}, gear: {}, relSum: 0, ascByQuartile: [0, 0, 0, 0] };
}

function record(run: Run, s: State) {
  run.total++;
  run.ends[s.ending!] = (run.ends[s.ending!] ?? 0) + 1;
  const key = `${PATH[s.path].ladder}:${s.tier}`;
  run.tiers[key] = (run.tiers[key] ?? 0) + 1;
  run.ages.push(s.age);
  const b = (run.byPath[s.path] ??= { n: 0, tierSum: 0, ageSum: 0, asc: 0 });
  b.n++; b.tierSum += s.tier; b.ageSum += s.age;
  if (s.ending === 'ascensao') { b.asc++; run.ascensions++; }
  run.originUse[s.origin] = (run.originUse[s.origin] ?? 0) + 1;
  run.talentUse[s.talent] = (run.talentUse[s.talent] ?? 0) + 1;
  const rel = s.tier / (ladderOf(s).realms.length - 1);
  run.relSum += rel;
  const gearIds = [...new Set(s.items.filter((i) => ITEMS.find((it) => it.id === i)?.passive).map((x) => "i:" + x))];
  for (const g of gearIds) {
    const e = (run.gear[g] ??= { n: 0, rel: 0, asc: 0 });
    e.n++; e.rel += rel; if (s.ending === "ascensao") e.asc++;
  }
}

function runIndependent(): Run {
  const run = emptyRun('Vidas independentes (meta vazia; a trilha nasce dos eventos)');
  for (let i = 0; i < N; i++) {
    const meta = newMeta();
    const s = playLife(meta, 1000 + i * 7919, '', false, run.events, run.tierAges);
    record(run, s);
  }
  return run;
}

const UPGRADE_ORDER = ['ritmo', 'mente', 'corpo', 'destino', 'bolso', 'memoria', 'sorteio'];

function runMeta(): Run {
  const run = emptyRun('Meta-progressão (vidas em sequência, como um jogador de verdade)');
  const meta = newMeta();
  for (let i = 0; i < N; i++) {
    const before = new Set(meta.achievements);
    const s = playLife(meta, 5000 + i * 104729, '', false, run.events, run.tierAges);
    finalizeLife(meta, s);
    for (const a of meta.achievements) if (!before.has(a)) run.timeline.push({ id: a, life: i + 1 });
    run.pathUse[s.path] = (run.pathUse[s.path] ?? 0) + 1;
    record(run, s);
    if (s.ending === 'ascensao') run.ascByQuartile[Math.min(3, Math.floor((4 * i) / N))]++;
    // Gasta pontos de Legado.
    for (let again = true; again;) {
      again = false;
      for (const id of UPGRADE_ORDER) {
        const u = UPGRADES.find((x) => x.id === id)!;
        if (buyUpgrade(meta, u.id, u.cost, u.max)) { again = true; break; }
      }
    }
  }
  run.finalMeta = meta;
  return run;
}

/* ---------- Relatório ---------- */
const q = (arr: number[], p: number) => Math.round(arr[Math.floor(p * (arr.length - 1))]);
const pc = (n: number, d: number) => `${((100 * n) / (d || 1)).toFixed(1)}%`;

function formatRun(run: Run): string {
  const L: string[] = [];
  const ages = [...run.ages].sort((a, b) => a - b);
  L.push(`### ${run.title}`, '', `${run.total} vidas.`, '');
  L.push(`**Nomes imortalizados pela graduação final:** ${run.ascensions} (${pc(run.ascensions, run.total)})`);
  L.push(`**Idade de morte:** mín ${q(ages, 0)} · p10 ${q(ages, 0.1)} · mediana ${q(ages, 0.5)} · p90 ${q(ages, 0.9)} · p99 ${q(ages, 0.99)} · máx ${q(ages, 1)}`, '');
  L.push('**Finais**', '', '| Final | Vidas | % |', '|---|---:|---:|');
  for (const e of ENDINGS) L.push(`| ${e.name} | ${run.ends[e.id] ?? 0} | ${pc(run.ends[e.id] ?? 0, run.total)} |`);
  for (const ladder of ['murim']) {
    const rows = Object.entries(run.tiers).filter(([k]) => k.startsWith(ladder + ':')).sort((a, b) => Number(a[0].split(':')[1]) - Number(b[0].split(':')[1]));
    const tot = rows.reduce((a, [, n]) => a + n, 0);
    const probe = PATHS.find((p) => p.ladder === ladder)!;
    L.push('', `**Faixa máxima — ${ladder}** (${tot} vidas)`, '', '| Faixa | Vidas | % |', '|---|---:|---:|');
    for (const [k, n] of rows) L.push(`| ${ladderOf({ path: probe.id } as State).realms[Number(k.split(':')[1])].name} | ${n} | ${pc(n, tot)} |`);
  }
  L.push('', '**Por escola e estilo**', '', '| Estilo | Vidas | Faixa média | Idade média | Consagrações |', '|---|---:|---:|---:|---:|');
  for (const p of [{ id: '', name: 'Sem trilha (não despertou)' }, ...PATHS]) {
    const b = run.byPath[p.id];
    if (b) L.push(`| ${p.name} | ${b.n} | ${(b.tierSum / b.n).toFixed(2)} | ${(b.ageSum / b.n).toFixed(0)} | ${b.asc} |`);
  }
  if (run.finalMeta) {
    const m = run.finalMeta;
    L.push('', '**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)', '', '| Vida | Conquista |', '|---:|---|');
    for (const t of run.timeline) L.push(`| ${t.life} | ${ACHIEVEMENTS.find((a) => a.id === t.id)?.name ?? t.id} |`);
    const missing = ACHIEVEMENTS.filter((a) => !m.achievements.includes(a.id)).map((a) => a.name);
    L.push('', `Conquistas não obtidas: ${missing.length ? missing.join(', ') : 'nenhuma'}.`);
    L.push('', `Aprimoramentos permanentes: ${UPGRADES.map((u) => `${u.name} ${m.upgrades[u.id] ?? 0}/${u.max}`).join(' · ')}. Pontos de Legado sobrando: ${m.legacy}.`);
    L.push('', `Ascensões por quartil de vidas (1º → 4º): ${run.ascByQuartile.join(' → ')}`);
    L.push('', `Uso de trilhas: ${PATHS.map((p) => `${p.name} ${run.pathUse[p.id] ?? 0}`).join(' · ')}`);
    const usedOrigins = ORIGINS.filter((o) => run.originUse[o.id]).length;
    const usedTalents = TALENTS.filter((t) => run.talentUse[t.id]).length;
    L.push('', `Origens usadas: ${usedOrigins}/${ORIGINS.length} · Talentos usados: ${usedTalents}/${TALENTS.length}`);
  }
  const GATED_FLAGS = ['reencarnado', 'regressor', 'sangue_demoniaco', 'avo_alquimista', 'tem_eco'];
  const gated = EVENTS.filter((e) => e.cond?.flags?.some((f) => GATED_FLAGS.includes(f))).map((e) => e.id);
  L.push('', `**Eventos que dependem de desbloqueio** (ocorrências): ${gated.map((id) => `${id} (${run.events[id] ?? 0})`).join(', ')}.`);
  {
    const mean = run.relSum / run.total;
    const rows = Object.entries(run.gear).filter(([, g]) => g.n >= 60).map(([id, g]) => ({ id, n: g.n, d: g.rel / g.n - mean, asc: g.asc / g.n }));
    rows.sort((a, b) => b.d - a.d);
    const name = (id: string) => ITEMS.find((x) => x.id === id.slice(2))?.name ?? id;
    const fmt = (r: (typeof rows)[number]) => name(r.id) + " (n=" + r.n + ", faixa relativa " + (r.d >= 0 ? "+" : "") + (100 * r.d).toFixed(1) + " pp, consagração " + (100 * r.asc).toFixed(1) + "%)";
    L.push("", "**Impacto de artefatos** (faixa relativa = faixa/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)", "");
    L.push("Maiores: " + rows.slice(0, 5).map(fmt).join("; ") + ".");
    L.push("Menores: " + rows.slice(-3).map(fmt).join("; ") + ".");
  }
  const never = EVENTS.filter((e) => !run.events[e.id]).map((e) => e.id);
  const seen = EVENTS.length - never.length;
  L.push('', `**Eventos vistos:** ${seen}/${EVENTS.length}. Nunca vistos: ${never.length ? never.join(', ') : 'nenhum'}.`);
  const rare = EVENTS.filter((e) => e.rarity !== 'comum' && run.events[e.id]).sort((a, b) => run.events[a.id] - run.events[b.id]).slice(0, 8);
  L.push(`Eventos raros/lendários menos frequentes: ${rare.map((e) => `${e.id} (${run.events[e.id]})`).join(', ')}.`);
  const top = Object.entries(run.events).filter(([k]) => k !== '__break').sort((a, b) => b[1] - a[1]).slice(0, 8);
  L.push(`Eventos mais repetidos (por vida): ${top.map(([k, n]) => `${k} (${(n / run.total).toFixed(1)})`).join(', ')}.`);
  if (verbose) {
    L.push('', '**Idade média ao entrar em cada reino (trilha Sopro)**', '');
    const rows = Object.entries(run.tierAges).filter(([k]) => k.startsWith('sopro:'));
    if (rows.length) L.push(rows.map(([k, v]) => `${k.split(':')[1]}: ${Math.round(v.reduce((a, b) => a + b, 0) / v.length)}a`).join(' · '));
  }
  return L.join('\n');
}

/* ---------- Execução ---------- */
if (report) {
  const a = runIndependent();
  const b = runMeta();
  const doc = [
    '# Balanceamento — linha de base',
    '',
    `Gerado por \`npm run sim -- ${N} --report\` em ${new Date().toISOString().slice(0, 10)}.`,
    `Conteúdo: ${EVENTS.length} eventos, ${ITEMS.length} itens, ${ENDINGS.length} finais, ${PATHS.length} trilhas.`,
    '',
    '## Como o bot joga',
    '- 70% das vezes escolhe a opção de maior chance de sucesso; nos demais casos escolhe ao acaso entre as opções seguras.',
    '- Evita escolhas que encerram a vida (risco de final > 12%), exceto quando a idade passa de 90% da vida máxima ou resta menos de 15 anos.',
    '- No modo meta, joga vidas consecutivas, escolhe entre as trilhas liberadas e gasta pontos de Legado nos aprimoramentos disponíveis.',
    '',
    '## Metas de balanceamento',
    '- A vida acompanha uma carreira marcial humana; a faixa deve refletir domínio e reputação, sem longevidade sobrenatural.',
    '- As escolhas da campanha Hwayang devem aparecer ao longo das vidas e produzir finais distintos.',
    '',
    formatRun(a),
    '',
    formatRun(b),
    '',
    '## Observações',
    '- A campanha Hwayang possui rotas de justiça, trégua, duelo, acordo e exílio; compare as frequências com a cobertura pretendida para escolhas humanas.',
    '- As faixas mais altas são raras no bot. Ajuste o ritmo de treinamento e as chances de rompimento em conjunto para manter a progressão alcançável sem torná-la automática.',
    '- O relatório usa um bot heurístico; distribuições descrevem esse comportamento e não substituem testes de jogo manual.',
    '',
  ].join('\n');
  writeFileSync('docs/balanceamento.md', doc);
  console.log(doc);
  console.log('\n→ gravado em docs/balanceamento.md');
} else {
  const run = metaMode ? runMeta() : runIndependent();
  console.log(formatRun(run));
}
