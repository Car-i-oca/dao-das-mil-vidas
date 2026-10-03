/**
 * Simulador de vidas automáticas para balanceamento.
 *
 *   npm run sim -- 4000                 vidas independentes (meta vazia), todas as trilhas
 *   npm run sim -- 4000 --meta          vidas em sequência: conquistas, origens, talentos e trilhas vão sendo liberados
 *   npm run sim -- 4000 --path=sopro    só uma trilha (modo normal)
 *   npm run sim -- 4000 --report        roda os dois modos e grava docs/balanceamento.md
 */
import { writeFileSync } from 'node:fs';
import { Rng } from '../src/engine/rng';
import {
  newMeta, rollCreation, startLife, view, choose, proceed, finalizeLife, buyUpgrade, visibleChoices, ladderOf, PATH,
  type Visible,
} from '../src/engine/engine';
import { PATHS } from '../src/data/paths';
import { EVENTS } from '../src/data/events';
import { ITEMS } from '../src/data/items';
import { TECHNIQUES } from '../src/data/techniques';
import { ENDINGS, ACHIEVEMENTS, UPGRADES } from '../src/data/endings';
import { ORIGINS, TALENTS } from '../src/data/character';
import type { Meta, Outcome, State } from '../src/types';

const args = process.argv.slice(2);
const N = Number(args.find((a) => /^\d+$/.test(a)) ?? 1000);
const onlyPath = args.find((a) => a.startsWith('--path='))?.split('=')[1];
const verbose = args.includes('--verbose');
const metaMode = args.includes('--meta');
const report = args.includes('--report');

/* ---------- Bot ---------- */
/** Eventos em que um jogador que busca o caminho demoníaco aceita a oferta. */
const DEMON_EVENTS = new Set(['oferta_demoniaca', 'sacrificio_sangue', 'pacto_sangue_antigo', 'banquete_de_sangue']);

function endRisk(c: Visible['choice'], chance: number | undefined): number {
  if (!c) return 0;
  const ends = (o?: Outcome) => !!o?.fx?.fim;
  if (c.check) return (ends(c.ok) ? chance ?? 0.5 : 0) + (ends(c.fail) ? 1 - (chance ?? 0.5) : 0);
  return ends(c.res) ? 1 : 0;
}

function demonScore(c: Visible['choice']): number {
  const o = c?.res ?? c?.ok;
  return (o?.fx?.corr ?? 0) + (o?.fx?.fim === 'demonio' ? 100 : 0);
}

function botPick(s: State, rng: Rng, seekDemon: boolean): number {
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

function playLife(meta: Meta, seed: number, pathId: string, seekDemon: boolean, counts: Record<string, number>, tierAges: Record<string, number[]>): State {
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
      choose(s, botPick(s, bot, seekDemon), rng);
    }
    if (s.tier > lastTier) { (tierAges[`${pathId}:${s.tier}`] ??= []).push(s.age); lastTier = s.tier; }
    if (s.ending) break;
    proceed(s, rng);
  }
  return s;
}

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
  /** Por técnica/artefato: vidas que o possuíam ao morrer, soma do reino relativo e ascensões. */
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
  const gearIds = [...s.techniques.map((x) => "t:" + x), ...new Set(s.items.filter((i) => ITEMS.find((it) => it.id === i)?.passive).map((x) => "i:" + x))];
  for (const g of gearIds) {
    const e = (run.gear[g] ??= { n: 0, rel: 0, asc: 0 });
    e.n++; e.rel += rel; if (s.ending === "ascensao") e.asc++;
  }
}

function runIndependent(): Run {
  const run = emptyRun('Vidas independentes (meta vazia, todas as trilhas)');
  const paths = PATHS.filter((p) => !onlyPath || p.id === onlyPath);
  const per = Math.floor(N / paths.length);
  for (const p of paths) {
    for (let i = 0; i < per; i++) {
      const meta = newMeta();
      const s = playLife(meta, 1000 + i * 7919 + p.id.length, p.id, false, run.events, run.tierAges);
      record(run, s);
    }
  }
  return run;
}

const UPGRADE_ORDER = ['ritmo', 'mente', 'corpo', 'destino', 'bolso', 'memoria', 'sorteio'];

function runMeta(): Run {
  const run = emptyRun('Meta-progressão (vidas em sequência, como um jogador de verdade)');
  const meta = newMeta();
  const rng = new Rng(424242);
  for (let i = 0; i < N; i++) {
    const unlocked = PATHS.filter((p) => !p.unlock || meta.achievements.includes(p.unlock));
    const path = rng.pick(unlocked);
    // Busca o caminho demoníaco em metade das vidas até desbloquear a conquista.
    const seekDemon = !meta.achievements.includes('ach_demonio') && rng.chance(0.5);
    const before = new Set(meta.achievements);
    const s = playLife(meta, 5000 + i * 104729, path.id, seekDemon, run.events, run.tierAges);
    finalizeLife(meta, s);
    for (const a of meta.achievements) if (!before.has(a)) run.timeline.push({ id: a, life: i + 1 });
    run.pathUse[s.path] = (run.pathUse[s.path] ?? 0) + 1;
    record(run, s);
    if (s.ending === 'ascensao') run.ascByQuartile[Math.min(3, Math.floor((4 * i) / N))]++;
    // Gasta a Herança do Dao.
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
  L.push(`**Taxa de ascensão:** ${run.ascensions} (${pc(run.ascensions, run.total)})  `);
  L.push(`**Idade de morte:** mín ${q(ages, 0)} · p10 ${q(ages, 0.1)} · mediana ${q(ages, 0.5)} · p90 ${q(ages, 0.9)} · p99 ${q(ages, 0.99)} · máx ${q(ages, 1)}`, '');
  L.push('**Finais**', '', '| Final | Vidas | % |', '|---|---:|---:|');
  for (const e of ENDINGS) L.push(`| ${e.name} | ${run.ends[e.id] ?? 0} | ${pc(run.ends[e.id] ?? 0, run.total)} |`);
  for (const ladder of ['xianxia', 'murim']) {
    const rows = Object.entries(run.tiers).filter(([k]) => k.startsWith(ladder + ':')).sort((a, b) => Number(a[0].split(':')[1]) - Number(b[0].split(':')[1]));
    const tot = rows.reduce((a, [, n]) => a + n, 0);
    const probe = PATHS.find((p) => p.ladder === ladder)!;
    L.push('', `**Reino máximo — ${ladder}** (${tot} vidas)`, '', '| Reino | Vidas | % |', '|---|---:|---:|');
    for (const [k, n] of rows) L.push(`| ${ladderOf({ path: probe.id } as State).realms[Number(k.split(':')[1])].name} | ${n} | ${pc(n, tot)} |`);
  }
  L.push('', '**Por trilha**', '', '| Trilha | Vidas | Reino médio | Idade média | Ascensões |', '|---|---:|---:|---:|---:|');
  for (const p of PATHS) {
    const b = run.byPath[p.id];
    if (b) L.push(`| ${p.name} | ${b.n} | ${(b.tierSum / b.n).toFixed(2)} | ${(b.ageSum / b.n).toFixed(0)} | ${b.asc} |`);
  }
  if (run.finalMeta) {
    const m = run.finalMeta;
    L.push('', '**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)', '', '| Vida | Conquista |', '|---:|---|');
    for (const t of run.timeline) L.push(`| ${t.life} | ${ACHIEVEMENTS.find((a) => a.id === t.id)?.name ?? t.id} |`);
    const missing = ACHIEVEMENTS.filter((a) => !m.achievements.includes(a.id)).map((a) => a.name);
    L.push('', `Conquistas não obtidas: ${missing.length ? missing.join(', ') : 'nenhuma'}.`);
    L.push('', `Upgrades finais de Herança: ${UPGRADES.map((u) => `${u.name} ${m.upgrades[u.id] ?? 0}/${u.max}`).join(' · ')}. Pontos sobrando: ${m.legacy}.`);
    L.push('', `Ascensões por quartil de vidas (1º → 4º): ${run.ascByQuartile.join(' → ')}`);
    L.push('', `Uso de trilhas: ${PATHS.map((p) => `${p.name} ${run.pathUse[p.id] ?? 0}`).join(' · ')}`);
    const usedOrigins = ORIGINS.filter((o) => run.originUse[o.id]).length;
    const usedTalents = TALENTS.filter((t) => run.talentUse[t.id]).length;
    L.push('', `Origens usadas: ${usedOrigins}/${ORIGINS.length} · Talentos usados: ${usedTalents}/${TALENTS.length}`);
  }
  const GATED_FLAGS = ['reencarnado', 'regressor', 'sangue_demoniaco', 'avo_alquimista'];
  const gated = EVENTS.filter((e) => e.cond?.flags?.some((f) => GATED_FLAGS.includes(f))).map((e) => e.id);
  L.push('', `**Eventos que dependem de desbloqueio** (ocorrências): ${gated.map((id) => `${id} (${run.events[id] ?? 0})`).join(', ')}.`);
  {
    const mean = run.relSum / run.total;
    const rows = Object.entries(run.gear).filter(([, g]) => g.n >= 60).map(([id, g]) => ({ id, n: g.n, d: g.rel / g.n - mean, asc: g.asc / g.n }));
    rows.sort((a, b) => b.d - a.d);
    const name = (id: string) => (id.startsWith("t:") ? TECHNIQUES.find((x) => x.id === id.slice(2))?.name : ITEMS.find((x) => x.id === id.slice(2))?.name) ?? id;
    const fmt = (r: (typeof rows)[number]) => name(r.id) + " (n=" + r.n + ", reino relativo " + (r.d >= 0 ? "+" : "") + (100 * r.d).toFixed(1) + " pp, ascensão " + (100 * r.asc).toFixed(1) + "%)";
    L.push("", "**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)", "");
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
    `Conteúdo: ${EVENTS.length} eventos, ${ITEMS.length} itens, ${TECHNIQUES.length} técnicas, ${ENDINGS.length} finais, ${PATHS.length} trilhas.`,
    '',
    '## Como o bot joga',
    '- 70% das vezes escolhe a opção de maior chance de sucesso; nos demais casos escolhe ao acaso entre as opções seguras.',
    '- Evita escolhas que encerram a vida (risco de final > 12%), exceto quando a idade passa de 90% da vida máxima ou resta menos de 15 anos.',
    '- No modo meta, busca o caminho demoníaco (aceita ofertas, sacrifícios e pactos) em metade das vidas até liberar a conquista, escolhe trilhas liberadas ao acaso e gasta a Herança do Dao em ritmo → mente → corpo → destino → bolso.',
    '',
    '## Metas de balanceamento',
    '- Ascender é raro (~1% no bot), mas possível; um jogador atento deve superar o bot.',
    '- A maioria das vidas termina entre o 3º e o 5º reino.',
    '- Nenhum final voluntário (eremita, sacrifício, reencarnação) passa de ~5% das vidas.',
    '',
    formatRun(a),
    '',
    formatRun(b),
    '',
    '## Observações',
    '- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.',
    '- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).',
    '- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.',
    '- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.',
    '- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.',
    '',
  ].join('\n');
  writeFileSync('docs/balanceamento.md', doc);
  console.log(doc);
  console.log('\n→ gravado em docs/balanceamento.md');
} else {
  const run = metaMode ? runMeta() : runIndependent();
  console.log(formatRun(run));
}
