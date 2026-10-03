/** Valida referências cruzadas do conteúdo. Uso: npm run validate */
import { EVENTS } from '../src/data/events';
import { ITEMS } from '../src/data/items';
import { TECHNIQUES } from '../src/data/techniques';
import { ENDINGS, ACHIEVEMENTS, ACH_CHECKS } from '../src/data/endings';
import { PATHS } from '../src/data/paths';
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

const setFlags = new Set<string>();
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
for (const o of ORIGINS) {
  if (o.unlock && !achIds.has(o.unlock)) errors.push(`origem ${o.id}: conquista inexistente "${o.unlock}"`);
  o.flags?.forEach((f) => setFlags.add(f));
}
for (const t of TALENTS) if (t.unlock && !achIds.has(t.unlock)) errors.push(`talento ${t.id}: conquista inexistente "${t.unlock}"`);
for (const a of ACHIEVEMENTS) if (!ACH_CHECKS[a.id]) errors.push(`conquista ${a.id}: sem regra em ACH_CHECKS`);

for (const [f, where] of needFlags) if (!setFlags.has(f)) warnings.push(`flag "${f}" exigida em ${where} nunca é definida`);

console.log(`Validação: ${EVENTS.length} eventos, ${ITEMS.length} itens, ${TECHNIQUES.length} técnicas, ${ENDINGS.length} finais, ${PATHS.length} trilhas.`);
warnings.forEach((w) => console.log('  aviso:', w));
errors.forEach((e) => console.log('  ERRO:', e));
if (errors.length) { console.log(`${errors.length} erro(s).`); process.exit(1); }
console.log('Conteúdo válido.');
