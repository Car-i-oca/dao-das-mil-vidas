/**
 * Verificação de IMPACTO: toda escolha e todo evento precisam mudar o rumo da run.
 *
 *   npm run impacto              gera docs/impacto.md (compara com docs/impacto.baseline.json, se existir)
 *   npm run impacto -- --baseline  grava o estado atual como baseline ("antes")
 *
 * Métricas: escolhas sem marca, escolhas com consequência igual à de outra do mesmo evento, eventos "tanto faz",
 * flags gravadas e nunca lidas, mínimos por talento/defeito/origem/raiz/constituição e semelhança entre vidas.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { EVENTS } from '../src/data/events';
import { TALENTS, FLAWS, ORIGINS } from '../src/data/character';
import { CONSTITUTIONS } from '../src/data/names';
import { ENDINGS } from '../src/data/endings';
import { MARCAS_VIDA } from '../src/data/marcas_vida';
import { TECHNIQUES } from '../src/data/techniques';
import { newMeta, rollCreation, startLife, view, choose, proceed } from '../src/engine/engine';
import { botPick } from './bot';
import { Rng } from '../src/engine/rng';
import type { Choice, Cond, Effects, GameEvent, Outcome } from '../src/types';

const args = process.argv.slice(2);
const saveBaseline = args.includes('--baseline');
const BASE = 'docs/impacto.baseline.json';

/* ---------- Marca: o que uma escolha deixa para o futuro ---------- */
function outcomes(c: Choice): Outcome[] {
  return [c.res, c.ok, c.fail].filter(Boolean) as Outcome[];
}
function markOf(fx?: Effects): string[] {
  if (!fx) return [];
  const m: string[] = [];
  if (fx.setFlags?.length) m.push('flag');
  if (fx.clearFlags?.length) m.push('limpa');
  if (fx.agenda?.length) m.push('agenda');
  if (fx.item?.length) m.push('item');
  if (fx.removeItem?.length) m.push('perde-item');
  if (fx.tecnica?.length) m.push('técnica');
  if (fx.local) m.push('local');
  if (fx.faccao) m.push('facção');
  if (fx.fim) m.push('fim');
  if (fx.tier) m.push('reino');
  if (fx.trilha) m.push('trilha');
  if (fx.rec) m.push('recurso');
  if (fx.perfil) m.push('perfil');
  if (Math.abs(fx.karma ?? 0) >= 8) m.push('karma');
  if (Math.abs(fx.fama ?? 0) >= 10) m.push('fama');
  if ((fx.corr ?? 0) >= 8) m.push('corrupção');
  if ((fx.ferida ?? 0) >= 3) m.push('ferida');
  if (Math.abs(fx.pedras ?? 0) >= 150) m.push('pedras');
  if (Math.abs(fx.vida ?? 0) >= 40) m.push('vida');
  return m;
}
const choiceMarks = (c: Choice) => outcomes(c).flatMap((o) => markOf(o.fx));
function signature(c: Choice): string {
  return outcomes(c).map((o) => JSON.stringify(o.fx ?? {})).join('|');
}

/* ---------- Flags lidas e gravadas ---------- */
const written = new Map<string, string>();
const read = new Set<string>();
const readCond = (c?: Cond) => { c?.flags?.forEach((f) => read.add(f)); c?.noFlags?.forEach((f) => read.add(f)); };
for (const e of EVENTS) {
  readCond(e.cond);
  for (const c of e.choices) {
    readCond(c.cond);
    for (const o of outcomes(c)) {
      o.fx?.setFlags?.forEach((f) => { if (!written.has(f)) written.set(f, e.id); });
    }
  }
}
// Leituras fora dos eventos: motor, interface e dados (finais, conquistas, origens).
const srcFiles = ['src/engine/engine.ts', 'src/engine/combate.ts', 'src/ui/main.ts', 'src/data/endings.ts', 'src/data/character.ts', 'src/data/mundo.ts'];
const code = srcFiles.filter(existsSync).map((f) => readFileSync(f, 'utf8')).join('\n');
const codeRead = (f: string) => code.includes(`'${f}'`) || code.includes(`"${f}"`);
const unreadFlags = [...written.keys()].filter((f) => !read.has(f) && !codeRead(f) && !MARCAS_VIDA[f]);

/* ---------- Escolhas e eventos ---------- */
let totalChoices = 0, noMark = 0, dup = 0, soPerfil = 0;
const dupList: string[] = [];
const soPerfilEv: string[] = [];
const noMarkList: string[] = [];
const taNEvents: string[] = [];
for (const e of EVENTS) {
  const sigs = new Map<string, number>();
  const ehEx = (c: Choice) => !!c.ex;
  let evMarks = 0;
  for (const c of e.choices) {
    totalChoices++;
    const m = choiceMarks(c);
    if (m.length && m.every((x) => x === 'perfil')) soPerfil++;
    if (!m.length) { noMark++; noMarkList.push(`${e.id}: ${c.text.slice(0, 40)}`); }
    evMarks += m.length;
    // Opções exclusivas de traços diferentes nunca são alternativas entre si (só aparecem para quem tem o traço).
    if (ehEx(c)) continue;
    const sg = signature(c);
    sigs.set(sg, (sigs.get(sg) ?? 0) + 1);
  }
  for (const [sg, n] of sigs.entries()) if (n > 1) { dup += n - 1; dupList.push(`${e.id} (${n}x ${sg.slice(0, 40)})`); }
  if (e.choices.length && e.choices.every((c) => { const m = choiceMarks(c); return m.length > 0 && m.every((x) => x === 'perfil'); }) && !e.passagem) soPerfilEv.push(e.id);
  // "Tanto faz": evento sem nenhuma marca, ou com todas as opções equivalentes.
  const allSame = e.choices.length > 1 && sigs.size === 1;
  if ((evMarks === 0 || allSame) && (e.weight ?? 1) > 0 && e.id !== 'dia_comum' && !/^(retiro|__)/.test(e.id)) taNEvents.push(e.id);
}

/* ---------- Mínimos por traço ---------- */
const hasTrait = (c: Cond | undefined, kind: keyof Cond, id: string) => !!(c?.[kind] as string[] | undefined)?.includes(id);
interface Row { id: string; name: string; eventos: number; opcoes: number; caminhos: number }
function traitRow(kind: 'talent' | 'flaw' | 'origin' | 'constitution', id: string, name: string): Row {
  let eventos = 0, opcoes = 0, caminhos = 0;
  for (const e of EVENTS) {
    const evHas = hasTrait(e.cond, kind, id);
    if (evHas) eventos++;
    for (const c of e.choices) {
      const chHas = hasTrait(c.cond, kind, id);
      if (chHas && !evHas) opcoes++;
      if (evHas || chHas) {
        const fx = outcomes(c).flatMap((o) => [o.fx?.fim, o.fx?.trilha, ...(o.fx?.tecnica ?? [])]).filter(Boolean);
        if (fx.length) caminhos++;
      }
    }
  }
  return { id, name, eventos, opcoes, caminhos };
}
const talentRows = TALENTS.map((t) => traitRow('talent', t.id, t.name));
const flawRows = FLAWS.map((t) => traitRow('flaw', t.id, t.name));
const originRows = ORIGINS.map((t) => traitRow('origin', t.id, t.name));
const consRows = CONSTITUTIONS.map((t) => traitRow('constitution', t.id, t.name));
const rootKinds = ['unica', 'mutante', 'dupla', 'tripla', 'quadrupla', 'caotica', 'Fogo', 'Água', 'Terra', 'Madeira', 'Metal', 'Raio', 'Gelo', 'Vento'];
const rootRows: Row[] = rootKinds.map((k) => {
  let eventos = 0, opcoes = 0, caminhos = 0;
  for (const e of EVENTS) {
    const evHas = !!e.cond?.root?.includes(k);
    if (evHas) eventos++;
    for (const c of e.choices) if (c.cond?.root?.includes(k) && !evHas) { opcoes++; if (outcomes(c).some((o) => o.fx?.fim || o.fx?.tecnica || o.fx?.trilha)) caminhos++; }
  }
  return { id: k, name: k, eventos, opcoes, caminhos };
});

const MIN_T = { eventos: 4, opcoes: 6, caminhos: 1 };
const MIN_ORIGEM = { eventos: 5, opcoes: 4, caminhos: 1 };
const MIN_ROOT = { eventos: 1, opcoes: 2, caminhos: 0 };
const fails = (rows: Row[], m: { eventos: number; opcoes: number; caminhos: number }) => rows.filter((r) => r.eventos < m.eventos || r.opcoes < m.opcoes || r.caminhos < m.caminhos);

/* ---------- Escolhas exclusivas (gerais) ---------- */
const exclusive: Record<string, number> = { trilha: 0, talento: 0, defeito: 0, tecnica: 0, item: 0, raiz: 0, constituicao: 0, origem: 0 };
for (const e of EVENTS) for (const c of e.choices) {
  const k = c.cond;
  if (!k) continue;
  if (k.path) exclusive.trilha++;
  if (k.talent) exclusive.talento++;
  if (k.flaw) exclusive.defeito++;
  if (k.tecnicas || k.tecnicaTag || k.tecnica) exclusive.tecnica++;
  if (k.item) exclusive.item++;
  if (k.root) exclusive.raiz++;
  if (k.constitution) exclusive.constituicao++;
  if (k.origin) exclusive.origem++;
}

/* ---------- Comparação de runs ---------- */
function eventSet(seed: number, talent: string, flaw: string, path: string): Set<string> {
  const rng = new Rng(seed);
  const meta = newMeta();
  const c = rollCreation(meta, rng);
  c.talent = talent; c.flaw = flaw;
  const s = startLife(meta, c, path, rng.seed);
  const bot = new Rng(seed ^ 0x51ed);
  const ids = new Set<string>();
  let g = 0;
  while (!s.ending && g++ < 4000) {
    if (view(s).kind === 'event') { if (s.current && !s.current.id.startsWith('__')) ids.add(s.current.id); choose(s, botPick(s, bot, false), rng); }
    if (s.ending) break;
    proceed(s, rng);
  }
  return ids;
}
const jac = (a: Set<string>, b: Set<string>) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i || 1); };
const paths = ['sopro', 'espada', 'alquimia', 'corpo'];
const talentsT = TALENTS.filter((t) => !t.unlock).map((t) => t.id);
const flawsT = FLAWS.map((t) => t.id);
let sameTraits = 0, diffTraits = 0, nS = 0, nD = 0;
const PAIRS = Number(args.find((a) => /^\d+$/.test(a)) ?? 60);
for (let i = 0; i < PAIRS; i++) {
  const p = paths[i % paths.length];
  const t1 = talentsT[i % talentsT.length], f1 = flawsT[i % flawsT.length];
  const t2 = talentsT[(i + 3) % talentsT.length], f2 = flawsT[(i + 4) % flawsT.length];
  const A = eventSet(1000 + i * 13, t1, f1, p), B = eventSet(5000 + i * 29, t1, f1, p), D = eventSet(9000 + i * 31, t2, f2, p);
  sameTraits += jac(A, B); nS++;
  diffTraits += jac(A, D); nD++;
}
const simSame = sameTraits / nS, simDiff = diffTraits / nD;

/* ---------- Relatório ---------- */
interface Snap { totalChoices: number; noMark: number; dup: number; tantoFaz: number; unread: number; excl: Record<string, number>; simSame: number; simDiff: number; events: number; tecnicas: number; rows: Record<string, Row[]> }
const snap: Snap = { totalChoices, noMark, dup, tantoFaz: taNEvents.length, unread: unreadFlags.length, excl: exclusive, simSame, simDiff, events: EVENTS.length, tecnicas: TECHNIQUES.length, rows: { talentos: talentRows, defeitos: flawRows, origens: originRows, constituicoes: consRows, raizes: rootRows } };
const before: Snap | null = existsSync(BASE) && !saveBaseline ? JSON.parse(readFileSync(BASE, 'utf8')) : null;
const arrow = (a: number | undefined, b: number, f = (x: number) => String(x)) => (a === undefined ? f(b) : `${f(a)} → **${f(b)}**`);
const tbl = (title: string, rows: Row[], m: { eventos: number; opcoes: number; caminhos: number }, prev?: Row[]) => {
  let o = `\n### ${title} (mínimo: ${m.eventos} eventos próprios, ${m.opcoes} opções exclusivas, ${m.caminhos} caminho/final)\n\n| Nome | Eventos próprios | Opções exclusivas | Caminhos/finais | OK |\n|---|---|---|---|---|\n`;
  for (const r of rows) {
    const p = prev?.find((x) => x.id === r.id);
    const ok = r.eventos >= m.eventos && r.opcoes >= m.opcoes && r.caminhos >= m.caminhos;
    o += `| ${r.name} | ${arrow(p?.eventos, r.eventos)} | ${arrow(p?.opcoes, r.opcoes)} | ${arrow(p?.caminhos, r.caminhos)} | ${ok ? 'sim' : '**não**'} |\n`;
  }
  return o;
};
let md = `# Impacto das escolhas, traços e eventos\n\nGerado por \`npm run impacto\`. ${before ? 'Comparação com o baseline (antes → depois).' : 'Sem baseline para comparar.'}\n\n## Resumo\n\n| Métrica | Valor | Meta |\n|---|---|---|\n`;
md += `| Escolhas no jogo | ${arrow(before?.totalChoices, totalChoices)} | — |\n`;
md += `| Escolhas sem marca (nenhuma flag, agenda, item, técnica, mudança de local/facção ou efeito grande) | ${arrow(before?.noMark, noMark)} (${((100 * noMark) / totalChoices).toFixed(0)}%) | 0 |\n`;
md += `| Escolhas cuja única marca é o perfil de conduta (sem flag, agenda, item etc.) | ${soPerfil} (${((100 * soPerfil) / totalChoices).toFixed(0)}%) | cair ao longo dos lotes |
`;
md += `| Escolhas com a mesma consequência de outra do mesmo evento | ${arrow(before?.dup, dup)} | 0 |\n`;
md += `| Eventos "tanto faz" | ${arrow(before?.tantoFaz, taNEvents.length)} | 0 |\n`;
md += `| Flags gravadas e nunca lidas | ${arrow(before?.unread, unreadFlags.length)} | 0 |\n`;
md += `| Escolhas exclusivas por trilha / talento / defeito / técnica / item | ${arrow(before?.excl.trilha, exclusive.trilha)} / ${arrow(before?.excl.talento, exclusive.talento)} / ${arrow(before?.excl.defeito, exclusive.defeito)} / ${arrow(before?.excl.tecnica, exclusive.tecnica)} / ${arrow(before?.excl.item, exclusive.item)} | muito mais |\n`;
md += `| Semelhança (Jaccard) entre vidas com a MESMA trilha, talento e defeito | ${arrow(before?.simSame, +simSame.toFixed(3), (x) => x.toFixed(3))} | referência |\n`;
md += `| Semelhança entre vidas com a mesma trilha e talento/defeito DIFERENTES | ${arrow(before?.simDiff, +simDiff.toFixed(3), (x) => x.toFixed(3))} | bem menor que a de cima |\n`;
md += tbl('Talentos', talentRows, MIN_T, before?.rows.talentos);
md += tbl('Defeitos', flawRows, MIN_T, before?.rows.defeitos);
md += tbl('Origens', originRows, MIN_ORIGEM, before?.rows.origens);
md += tbl('Constituições', consRows, MIN_ROOT, before?.rows.constituicoes);
md += tbl('Raízes (tipo e elemento)', rootRows, MIN_ROOT, before?.rows.raizes);
md += `\n## Flags gravadas e nunca lidas (${unreadFlags.length})\n\n${unreadFlags.map((f) => `\`${f}\` (${written.get(f)})`).join(', ') || 'nenhuma'}\n`;
md += `\n## Escolhas com a mesma consequência (${dup})\n\n${dupList.map((x) => `- ${x}`).join('\n') || 'nenhuma'}\n`;
md += `\n## Eventos em que TODAS as opções só deixam o perfil de conduta (${soPerfilEv.length}): candidatos a enriquecer, fundir ou virar passagem de tempo\n\n${soPerfilEv.map((x) => `\`${x}\``).join(', ') || 'nenhum'}\n`;
md += `\n## Eventos "tanto faz" (${taNEvents.length})\n\n${taNEvents.slice(0, 150).map((f) => `\`${f}\``).join(', ') || 'nenhum'}\n`;
md += `\n## Escolhas sem marca (${noMark}; primeiras 150)\n\n${noMarkList.slice(0, 150).map((x) => `- ${x}`).join('\n') || 'nenhuma'}\n`;
writeFileSync('docs/impacto.md', md);
if (saveBaseline) writeFileSync(BASE, JSON.stringify(snap, null, 1));
const bad = fails(talentRows, MIN_T).length + fails(flawRows, MIN_T).length + fails(originRows, MIN_ORIGEM).length + fails(consRows, MIN_ROOT).length + fails(rootRows, MIN_ROOT).length;
console.log(md.split('\n## Flags gravadas')[0]);
console.log(`Traços abaixo do mínimo: ${bad}${saveBaseline ? ' · baseline gravado' : ''}`);
void readdirSync;
