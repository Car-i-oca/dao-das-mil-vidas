/** Valida referências cruzadas do conteúdo. Uso: npm run validate */
import { EVENTS } from '../src/data/events';
import { ITEMS } from '../src/data/items';
import { TECHNIQUES } from '../src/data/techniques';
import { ENDINGS, ACHIEVEMENTS, ACH_CHECKS } from '../src/data/endings';
import { PATHS } from '../src/data/paths';
import { WORLDS, WORLD } from '../src/data/mundo';
import { TETOS } from '../src/data/faixas';
import { FUSOES } from '../src/data/tecnicas_novas';
import { ORIGINS, TALENTS } from '../src/data/character';
import type { Cond, Effects } from '../src/types';

const errors: string[] = [];
const warnings: string[] = [];
const ids = <T extends { id: string }>(a: T[]) => new Set(a.map((x) => x.id));
const itemIds = ids(ITEMS), techIds = ids(TECHNIQUES), endIds = ids(ENDINGS), evIds = ids(EVENTS), achIds = ids(ACHIEVEMENTS);

function dupes(label: string, list: { id: string }[]) {
  const seen = new Set<string>();
  for (const x of list) {
    if (seen.has(x.id)) errors.push(`${label}: id duplicado "${x.id}"`);
    seen.add(x.id);
  }
}
dupes('evento', EVENTS); dupes('item', ITEMS); dupes('técnica', TECHNIQUES); dupes('final', ENDINGS);

const setFlags = new Set<string>(['tem_eco', 'trilha_definida']); // flags definidas pelo motor
const needFlags = new Map<string, string>();

function fx(where: string, e?: Effects) {
  if (!e) return;
  e.item?.forEach((i) => !itemIds.has(i) && errors.push(`${where}: item inexistente "${i}"`));
  e.removeItem?.forEach((i) => !itemIds.has(i) && errors.push(`${where}: removeItem inexistente "${i}"`));
  e.tecnica?.forEach((t) => !techIds.has(t) && errors.push(`${where}: técnica inexistente "${t}"`));
  if (e.fim && !endIds.has(e.fim)) errors.push(`${where}: final inexistente "${e.fim}"`);
  e.agenda?.forEach((a) => !evIds.has(a.event) && errors.push(`${where}: evento agendado inexistente "${a.event}"`));
  e.setFlags?.forEach((f) => setFlags.add(f));
}
function cond(where: string, c?: Cond) {
  if (!c) return;
  c.flags?.forEach((f) => needFlags.set(f, where));
  if (c.item && !itemIds.has(c.item)) errors.push(`${where}: cond.item inexistente "${c.item}"`);
  if (c.tecnica && !techIds.has(c.tecnica)) errors.push(`${where}: cond.tecnica inexistente "${c.tecnica}"`);
  c.path?.forEach((p) => !PATHS.some((x) => x.id === p) && errors.push(`${where}: trilha inexistente "${p}"`));
  c.origin?.forEach((o) => !ORIGINS.some((x) => x.id === o) && errors.push(`${where}: origem inexistente "${o}"`));
  c.mundo?.forEach((m) => !WORLD[m] && errors.push(`${where}: era do mundo inexistente "${m}"`));
  if (c.tierMin !== undefined && c.tierMax !== undefined && c.tierMin > c.tierMax) errors.push(`${where}: tierMin > tierMax`);
}

for (const ev of EVENTS) {
  cond(`evento ${ev.id}`, ev.cond);
  if (!ev.choices.length) errors.push(`evento ${ev.id}: sem escolhas`);
  ev.choices.forEach((c, i) => {
    const w = `evento ${ev.id}#${i + 1}`;
    cond(w, c.cond);
    if (c.check && (!c.ok || !c.fail)) errors.push(`${w}: check exige ok e fail`);
    if (!c.check && !c.res && !c.ok) errors.push(`${w}: escolha sem resultado`);
    fx(w, c.res?.fx); fx(w, c.ok?.fx); fx(w, c.fail?.fx);
  });
}
for (const i of ITEMS) fx(`item ${i.id}`, i.use);
for (const p of PATHS) {
  if (p.tecnica && !techIds.has(p.tecnica)) errors.push(`trilha ${p.id}: técnica inexistente`);
  if (p.unlock && !achIds.has(p.unlock)) errors.push(`trilha ${p.id}: conquista inexistente "${p.unlock}"`);
}
for (const id of Object.keys(TETOS)) if (!evIds.has(id)) errors.push(`faixas.ts: evento inexistente ${id}`);
for (const w of WORLDS) {
  if (!evIds.has(w.startEvent)) errors.push(`era ${w.id}: evento de abertura inexistente "${w.startEvent}"`);
  if (w.hazard && !endIds.has(w.hazard.fim)) errors.push(`era ${w.id}: final de perigo inexistente "${w.hazard.fim}"`);
  const own = EVENTS.filter((e) => e.cond?.mundo?.includes(w.id) && e.id !== w.startEvent);
  if (own.length < 3) warnings.push(`era ${w.id}: só ${own.length} eventos próprios`);
}
for (const o of ORIGINS) {
  if (o.unlock && !achIds.has(o.unlock)) errors.push(`origem ${o.id}: conquista inexistente "${o.unlock}"`);
  o.flags?.forEach((f) => setFlags.add(f));
}
for (const t of TALENTS) if (t.unlock && !achIds.has(t.unlock)) errors.push(`talento ${t.id}: conquista inexistente "${t.unlock}"`);
for (const a of ACHIEVEMENTS) if (!ACH_CHECKS[a.id]) errors.push(`conquista ${a.id}: sem regra em ACH_CHECKS`);


/* ---------- Linter de texto e estrutura ---------- */
const PLACEHOLDERS = new Set(['nome', 'rival', 'mentor', 'amigo', 'noivo', 'discipulo', 'inimigo', 'seita', 'cla', 'vila', 'idade', 'reino', 'eco', 'eco_final', 'eco_trilha', 'eco_tecnica']);
function lintText(where: string, text: string | undefined, max = 700) {
  if (text === undefined) return;
  if (!text.trim()) { errors.push(`${where}: texto vazio`); return; }
  for (const m of text.matchAll(/{([a-z_]+)}/g)) if (!PLACEHOLDERS.has(m[1])) errors.push(`${where}: marcador desconhecido {${m[1]}}`);
  if (/{[^}]*$/.test(text) || /^[^{]*}/.test(text)) errors.push(`${where}: chave solta`);
  if (text.length > max) warnings.push(`${where}: texto longo (${text.length} caracteres)`);
  if (/  +/.test(text)) warnings.push(`${where}: espaços duplos`);
  if (!where.includes('(título)') && !/[.!?…"”)]$/.test(text.trim())) warnings.push(`${where}: não termina com pontuação`);
}
for (const ev of EVENTS) {
  lintText(`evento ${ev.id} (título)`, ev.title, 80);
  lintText(`evento ${ev.id}`, ev.text);
  const seenTexts = new Set<string>();
  ev.choices.forEach((c, i) => {
    const w = `evento ${ev.id}#${i + 1}`;
    lintText(w + ' (opção)', c.text, 140);
    if (seenTexts.has(c.text)) warnings.push(`${w}: opção repetida no mesmo evento`);
    seenTexts.add(c.text);
    for (const o of [c.res, c.ok, c.fail]) lintText(w, o?.text);
    for (const o of [c.res, c.ok, c.fail]) {
      const f = o?.fx;
      if (f?.stats) for (const [k, v] of Object.entries(f.stats)) if (Math.abs(v as number) > 6) warnings.push(`${w}: atributo ${k} muda ${v} de uma vez`);
      if (f?.xp && f.xp > 60) warnings.push(`${w}: xp muito alto (${f.xp})`);
      if (f?.pedras && f.pedras > 600) warnings.push(`${w}: pedras muito altas (${f.pedras})`);
    }
  });
  if (!ev.choices.some((c) => !c.cond)) warnings.push(`evento ${ev.id}: todas as opções têm condição (pode ficar sem saída)`);
}
for (const i of ITEMS) lintText(`item ${i.id}`, i.desc, 120);
for (const t of TECHNIQUES) lintText(`técnica ${t.id}`, t.desc, 120);
for (const e of ENDINGS) { lintText(`final ${e.id}`, e.text, 400); (e.alt ?? []).forEach((a, i) => lintText(`final ${e.id} (variação ${i + 1})`, a, 400)); }
const names = new Map<string, string>();
for (const x of [...ITEMS.map((i) => ({ id: 'item ' + i.id, name: i.name })), ...TECHNIQUES.map((t) => ({ id: 'técnica ' + t.id, name: t.name }))]) {
  if (names.has(x.name)) warnings.push(`nome repetido: "${x.name}" (${names.get(x.name)} e ${x.id})`);
  names.set(x.name, x.id);
}
const titles = new Map<string, string>();
for (const ev of EVENTS) {
  if (titles.has(ev.title)) warnings.push(`título repetido: "${ev.title}" (${titles.get(ev.title)} e ${ev.id})`);
  titles.set(ev.title, ev.id);
}

for (const fu of FUSOES) for (const id of [fu.a, fu.b, fu.resultado]) if (!techIds.has(id)) errors.push(`fusão ${fu.id}: técnica inexistente ${id}`);
const FLAGS_DO_MOTOR = new Set(['defeito_superado', 'juventude_eterna']);
for (const [f, where] of needFlags) if (!setFlags.has(f) && !FLAGS_DO_MOTOR.has(f)) warnings.push(`flag "${f}" exigida em ${where} nunca é definida`);

console.log(`Validação: ${EVENTS.length} eventos, ${ITEMS.length} itens, ${TECHNIQUES.length} técnicas, ${ENDINGS.length} finais, ${PATHS.length} trilhas.`);
warnings.forEach((w) => console.log('  aviso:', w));
errors.forEach((e) => console.log('  ERRO:', e));
if (errors.length) { console.log(`${errors.length} erro(s).`); process.exit(1); }
console.log('Conteúdo válido.');
