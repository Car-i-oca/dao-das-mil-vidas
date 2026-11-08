/**
 * Impacto das escolhas no motor v2 (Xianxia): o mesmo relatório de `sim/impacto.ts`, calculado sobre os moldes.
 * Roda dentro de `npm run impacto` quando o modo é xianxia; grava docs/impacto-xianxia.md.
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { MOLDES } from '../src/data/modos/xianxia/v2';
import { pacoteDe } from '../src/data/modos';
import { newMeta, rollCreation, startLife, view, choose, proceed } from '../src/engine/engine';
import { botPick } from './bot';
import { Rng } from '../src/engine/rng';
import type { Effects } from '../src/types';
import type { Opcao, Res } from '../src/engine/v2/tipos';

const PK = pacoteDe('xianxia');
const args = process.argv.slice(2);

const outs = (o: Opcao): Res[] => [o.res, o.sucesso, o.falha].filter(Boolean) as Res[];
function markOf(fx?: Effects): string[] {
  if (!fx) return [];
  const m: string[] = [];
  if (fx.setFlags?.length) m.push('flag');
  if (fx.clearFlags?.length) m.push('limpa');
  if (fx.agenda?.length) m.push('agenda');
  if (fx.item?.length) m.push('item');
  if (fx.removeItem?.length) m.push('perde-item');
  if (fx.local) m.push('local');
  if (fx.faccao) m.push('facção');
  if (fx.fim) m.push('fim');
  if (fx.tier) m.push('reino');
  if (fx.trilha) m.push('trilha');
  if (Math.abs(fx.karma ?? 0) >= 8) m.push('karma');
  if (Math.abs(fx.fama ?? 0) >= 10) m.push('fama');
  if ((fx.corr ?? 0) >= 8) m.push('corrupção');
  if ((fx.ferida ?? 0) >= 3) m.push('ferida');
  if (Math.abs(fx.pedras ?? 0) >= 150) m.push('pedras');
  if (Math.abs(fx.vida ?? 0) >= 40) m.push('vida');
  if (fx.superar) m.push('superar');
  return m;
}
/** No v2, uma opção deixa marca se muda o mundo (`efeitos`: opinião, fato, fio, ambição...) ou tem uma marca do motor. */
const marcas = (o: Opcao) => outs(o).flatMap((r) => [...(r.efeitos?.length ? ['mundo'] : []), ...markOf(r.fx)]);
const assinatura = (o: Opcao) => outs(o).map((r) => JSON.stringify([r.efeitos ?? [], r.fx ?? {}])).join('|');

/** Procura `chave` em qualquer nível do objeto e diz se algum valor (lista) contém `id`. */
function tem(obj: unknown, chave: string, id: string): boolean {
  if (!obj || typeof obj !== 'object') return false;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (k === chave && Array.isArray(v) && v.includes(id)) return true;
    if (tem(v, chave, id)) return true;
  }
  return false;
}
function coleta(obj: unknown, chave: string, out: Set<string>) {
  if (!obj || typeof obj !== 'object') return;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (k === chave && Array.isArray(v)) v.forEach((x) => typeof x === 'string' && out.add(x));
    coleta(v, chave, out);
  }
}

/* ---------- escolhas ---------- */
let total = 0, semMarca = 0, semMarcaForaRespiro = 0, dup = 0;
const semMarcaLista: string[] = [], dupLista: string[] = [], tantoFaz: string[] = [];
for (const m of MOLDES) {
  const sigs = new Map<string, number>();
  let marcasMolde = 0;
  for (const o of m.opcoes) {
    total++;
    const mk = marcas(o);
    marcasMolde += mk.length;
    if (!mk.length) { semMarca++; if (m.tipo !== 'respiro') semMarcaForaRespiro++; semMarcaLista.push(`${m.id}#${o.id}${m.tipo === 'respiro' ? ' (respiro)' : ''}`); }
    if (!o.requer) sigs.set(assinatura(o), (sigs.get(assinatura(o)) ?? 0) + 1);
  }
  for (const [sg, n] of sigs) if (n > 1) { dup += n - 1; dupLista.push(`${m.id} (${n}x ${sg.slice(0, 40)})`); }
  const todasIguais = m.opcoes.length > 1 && sigs.size === 1 && [...sigs.values()][0] === m.opcoes.filter((o) => !o.requer).length;
  if (m.tipo !== 'respiro' && (marcasMolde === 0 || todasIguais)) tantoFaz.push(m.id);
}

/* ---------- flags ---------- */
const gravadas = new Map<string, string>();
const lidas = new Set<string>();
for (const m of MOLDES) {
  for (const o of m.opcoes) for (const r of outs(o)) r.fx?.setFlags?.forEach((f) => { if (!gravadas.has(f)) gravadas.set(f, m.id); });
  for (const chave of ['flag', 'semFlag']) coleta(m, chave, lidas);
}
const codigo = ['src/engine/engine.ts', 'src/engine/v2/diretor.ts', 'src/engine/v2/moldes.ts', 'src/engine/v2/mundo.ts', 'src/ui/main.ts', 'src/data/modos/xianxia/endings.ts', 'src/data/modos/xianxia/character.ts']
  .filter(existsSync).map((f) => readFileSync(f, 'utf8')).join('\n');
const lidaNoCodigo = (f: string) => codigo.includes(`'${f}'`) || codigo.includes(`"${f}"`);
const orfas = [...gravadas.keys()].filter((f) => !lidas.has(f) && !lidaNoCodigo(f) && !PK.marcasVida[f]);

/* ---------- traços ---------- */
interface Row { id: string; name: string; eventos: number; opcoes: number; caminhos: number }
function linha(chave: string, id: string, name: string): Row {
  let eventos = 0, opcoes = 0, caminhos = 0;
  for (const m of MOLDES) {
    const doMolde = tem(m.quando, chave, id);
    if (doMolde) eventos++;
    for (const o of m.opcoes) {
      const daOpcao = tem(o.requer, chave, id);
      if (daOpcao && !doMolde) opcoes++;
      if ((doMolde || daOpcao) && outs(o).some((r) => r.fx?.fim || r.fx?.trilha)) caminhos++;
    }
  }
  return { id, name, eventos, opcoes, caminhos };
}
const talentos = PK.talentos.map((t) => linha('talento', t.id, t.name));
const defeitos = PK.defeitos.map((t) => linha('defeito', t.id, t.name));
const origens = PK.origens.map((t) => linha('origem', t.id, t.name));
const MIN_T = { eventos: 4, opcoes: 6, caminhos: 1 }, MIN_O = { eventos: 5, opcoes: 4, caminhos: 1 };
const ok = (r: Row, m: typeof MIN_T) => r.eventos >= m.eventos && r.opcoes >= m.opcoes && r.caminhos >= m.caminhos;

/* ---------- semelhança entre vidas ---------- */
function cenas(seed: number, talent: string, flaw: string, path: string): Set<string> {
  const rng = new Rng(seed);
  const meta = newMeta();
  const c = rollCreation(meta, rng, 'xianxia');
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
const talentosLivres = PK.talentos.filter((t) => !t.unlock).map((t) => t.id);
const PARES = Number(args.find((a) => /^\d+$/.test(a)) ?? 60);
let igual = 0, diferente = 0;
for (let i = 0; i < PARES; i++) {
  const p = paths[i % paths.length];
  const t1 = talentosLivres[i % talentosLivres.length], f1 = PK.defeitos[i % PK.defeitos.length].id;
  const t2 = talentosLivres[(i + 3) % talentosLivres.length], f2 = PK.defeitos[(i + 4) % PK.defeitos.length].id;
  const A = cenas(1000 + i * 13, t1, f1, p), B = cenas(5000 + i * 29, t1, f1, p), D = cenas(9000 + i * 31, t2, f2, p);
  igual += jac(A, B); diferente += jac(A, D);
}
const simIgual = igual / PARES, simDif = diferente / PARES;

/* ---------- exclusivas gerais ---------- */
const excl: Record<string, number> = { trilha: 0, talento: 0, defeito: 0, origem: 0, item: 0 };
for (const m of MOLDES) for (const o of m.opcoes) {
  if (!o.requer) continue;
  if (tem(o.requer, 'trilha', 'sopro') || JSON.stringify(o.requer).includes('"trilha"')) excl.trilha++;
  if (JSON.stringify(o.requer).includes('"talento"')) excl.talento++;
  if (JSON.stringify(o.requer).includes('"defeito"') || JSON.stringify(o.requer).includes('"defeitoNao"')) excl.defeito++;
  if (JSON.stringify(o.requer).includes('"origem"')) excl.origem++;
  if (JSON.stringify(o.requer).includes('"item"')) excl.item++;
}

const pct = (a: number, b: number) => `${((100 * a) / (b || 1)).toFixed(0)}%`;
const tab = (titulo: string, rows: Row[], m: typeof MIN_T) =>
  `\n### ${titulo} (mínimo: ${m.eventos} cenas próprias, ${m.opcoes} opções exclusivas, ${m.caminhos} caminho/final)\n\n| Nome | Cenas próprias | Opções exclusivas | Caminhos/finais | OK |\n|---|---|---|---|---|\n` +
  rows.map((r) => `| ${r.name} | ${r.eventos} | ${r.opcoes} | ${r.caminhos} | ${ok(r, m) ? 'sim' : '**não**'} |`).join('\n') + '\n';

let md = `# Impacto das escolhas, traços e cenas — Xianxia (motor v2)\n\nGerado por \`npm run impacto -- --modo xianxia\`. Calculado sobre os ${MOLDES.length} moldes de \`src/data/modos/xianxia/v2\`.\n\n## Resumo\n\n| Métrica | Valor | Meta |\n|---|---|---|\n`;
md += `| Moldes de cena | ${MOLDES.length} | — |\n| Escolhas no jogo | ${total} | — |\n`;
md += `| Escolhas sem marca (não mudam o mundo nem deixam flag, agenda, item, local, facção, final ou efeito grande) | ${semMarca} (${pct(semMarca, total)}) | 0 |\n`;
md += `| ...dessas, fora das cenas de respiro (que por desenho são curtas e sem consequência) | ${semMarcaForaRespiro} | 0 |\n`;
md += `| Escolhas com a mesma consequência de outra do mesmo molde | ${dup} | 0 |\n`;
md += `| Moldes "tanto faz" (fora os respiros) | ${tantoFaz.length} | 0 |\n`;
md += `| Flags gravadas e nunca lidas | ${orfas.length} | 0 |\n`;
md += `| Escolhas exclusivas por trilha / talento / defeito / origem / item | ${excl.trilha} / ${excl.talento} / ${excl.defeito} / ${excl.origem} / ${excl.item} | muito mais |\n`;
md += `| Semelhança (Jaccard) entre vidas com a MESMA trilha, talento e defeito | ${simIgual.toFixed(3)} | referência |\n`;
md += `| Semelhança entre vidas com a mesma trilha e talento/defeito DIFERENTES | ${simDif.toFixed(3)} | bem menor que a de cima |\n`;
md += tab('Talentos', talentos, MIN_T) + tab('Defeitos', defeitos, MIN_T) + tab('Origens', origens, MIN_O);
md += `\n## Flags gravadas e nunca lidas (${orfas.length})\n\n${orfas.map((f) => `\`${f}\` (${gravadas.get(f)})`).join(', ') || 'nenhuma'}\n`;
md += `\n## Escolhas com a mesma consequência (${dup})\n\n${dupLista.map((x) => `- ${x}`).join('\n') || 'nenhuma'}\n`;
md += `\n## Moldes "tanto faz" (${tantoFaz.length})\n\n${tantoFaz.map((f) => `\`${f}\``).join(', ') || 'nenhum'}\n`;
md += `\n## Escolhas sem marca (${semMarca}; primeiras 150)\n\n${semMarcaLista.slice(0, 150).map((x) => `- ${x}`).join('\n') || 'nenhuma'}\n`;
writeFileSync('docs/impacto-xianxia.md', md);
console.log(md.split('\n## Flags gravadas')[0]);
const abaixo = [...talentos, ...defeitos].filter((r) => !ok(r, MIN_T)).length + origens.filter((r) => !ok(r, MIN_O)).length;
console.log(`Traços abaixo do mínimo: ${abaixo}`);
