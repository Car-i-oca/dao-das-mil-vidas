/** Valida referências cruzadas do conteúdo. Uso: npm run validate */
import { EVENTS } from '../src/data/events';
import { hasCombatMechanics } from '../src/data/event-type';
import { ITEMS } from '../src/data/items';
import { ENDINGS, ACHIEVEMENTS, ACH_CHECKS } from '../src/data/endings';
import { PATHS } from '../src/data/paths';
import { WORLDS, WORLD } from '../src/data/mundo';
import { ORIGINS, TALENTS } from '../src/data/character';
import { QUESTS } from '../src/data/quests';
import { FOES } from '../src/data/combates';
import { COMPANIONS } from '../src/data/companions';
import { checkChance, choose, newMeta, proceed, startLife, visibleChoices } from '../src/engine/engine';
import { Rng } from '../src/engine/rng';
import type { Cond, Effects, EquipmentSlot, State } from '../src/types';

const errors: string[] = [];
const warnings: string[] = [];
const ROOT_TAGS = new Set(['unica', 'mutante', 'dupla', 'tripla', 'quadrupla', 'caotica', 'Passo', 'Respiração', 'Postura', 'Leitura', 'Ritmo', 'Improviso', 'Equilíbrio', 'Reflexo']);
const ids = <T extends { id: string }>(a: T[]) => new Set(a.map((x) => x.id));
const itemIds = ids(ITEMS), endIds = ids(ENDINGS), evIds = ids(EVENTS), achIds = ids(ACHIEVEMENTS), foeIds = ids(FOES);

function dupes(label: string, list: { id: string }[]) {
  const seen = new Set<string>();
  for (const x of list) {
    if (seen.has(x.id)) errors.push(`${label}: id duplicado "${x.id}"`);
    seen.add(x.id);
  }
}
dupes('evento', EVENTS); dupes('item', ITEMS); dupes('final', ENDINGS); dupes('missão', QUESTS); dupes('oponente', FOES); dupes('companheiro', COMPANIONS);

const equipmentSlots = new Set<EquipmentSlot>(['rightWeapon', 'leftWeapon', 'armor', 'accessory']);
for (const item of ITEMS) {
  if (item.equipmentSlot && !equipmentSlots.has(item.equipmentSlot)) errors.push(`item ${item.id}: slot de equipamento inválido "${item.equipmentSlot}"`);
  if (item.equipmentSlot && !item.bonuses) errors.push(`item ${item.id}: equipamento sem bônus numérico`);
  if (item.bonuses && Object.values(item.bonuses).some((value) => !Number.isFinite(value))) errors.push(`item ${item.id}: bônus de equipamento não numérico`);
}
for (const companion of COMPANIONS) {
  if (companion.price < 0 || !Number.isFinite(companion.price)) errors.push(`companheiro ${companion.id}: preço inválido`);
  if (Object.values(companion.bonus).some((value) => !Number.isFinite(value))) errors.push(`companheiro ${companion.id}: bônus não numérico`);
}

for (const quest of QUESTS) {
  if (quest.objective.item && !itemIds.has(quest.objective.item)) errors.push(`missão ${quest.id}: item inexistente "${quest.objective.item}"`);
  if (quest.objective.foe && !foeIds.has(quest.objective.foe)) errors.push(`missão ${quest.id}: oponente inexistente "${quest.objective.foe}"`);
  if (quest.objective.eventId && !evIds.has(quest.objective.eventId)) errors.push(`missão ${quest.id}: evento inexistente "${quest.objective.eventId}"`);
  if (quest.objective.count < 1) errors.push(`missão ${quest.id}: objetivo deve exigir ao menos uma unidade`);
}

const setFlags = new Set<string>(['tem_eco', 'trilha_definida']); // flags definidas pelo motor
const needFlags = new Map<string, string>();

function fx(where: string, e?: Effects) {
  if (!e) return;
  e.item?.forEach((i) => !itemIds.has(i) && errors.push(`${where}: item inexistente "${i}"`));
  e.removeItem?.forEach((i) => !itemIds.has(i) && errors.push(`${where}: removeItem inexistente "${i}"`));
  if (e.fim && !endIds.has(e.fim)) errors.push(`${where}: final inexistente "${e.fim}"`);
  e.agenda?.forEach((a) => !evIds.has(a.event) && errors.push(`${where}: evento agendado inexistente "${a.event}"`));
  e.setFlags?.forEach((f) => setFlags.add(f));
}
function cond(where: string, c?: Cond) {
  if (!c) return;
  c.flags?.forEach((f) => needFlags.set(f, where));
  c.root?.forEach((root) => !ROOT_TAGS.has(root) && errors.push(`${where}: raiz ou elemento inexistente "${root}"`));
  if (c.item && !itemIds.has(c.item)) errors.push(`${where}: cond.item inexistente "${c.item}"`);
  c.itemsAll?.forEach((id) => !itemIds.has(id) && errors.push(`${where}: cond.itemsAll inexistente "${id}"`));
  c.itemsAny?.forEach((id) => !itemIds.has(id) && errors.push(`${where}: cond.itemsAny inexistente "${id}"`));
  c.path?.forEach((p) => !PATHS.some((x) => x.id === p) && errors.push(`${where}: trilha inexistente "${p}"`));
  c.origin?.forEach((o) => !ORIGINS.some((x) => x.id === o) && errors.push(`${where}: origem inexistente "${o}"`));
  c.mundo?.forEach((m) => !WORLD[m] && errors.push(`${where}: era do mundo inexistente "${m}"`));
  if (c.tierMin !== undefined && c.tierMax !== undefined && c.tierMin > c.tierMax) errors.push(`${where}: tierMin > tierMax`);
}

for (const ev of EVENTS) {
  cond(`evento ${ev.id}`, ev.cond);
  if (!ev.type) errors.push(`evento ${ev.id}: tipo de contexto não classificado`);
  if (ev.type !== 'combat' && hasCombatMechanics(ev)) errors.push(`evento ${ev.id}: mecânica de combate fora de um evento de combate`);
  if (ev.type === 'combat' && !hasCombatMechanics(ev)) errors.push(`evento ${ev.id}: classificado como combate sem mecânica de combate`);
  if (ev.type === 'shop' && ev.eventType !== 'mercador') errors.push(`evento ${ev.id}: loja sem eventType mercador`);
  if (ev.type === 'alchemy' && !ev.id.startsWith('caldeirao_')) errors.push(`evento ${ev.id}: alquimia fora do contexto de caldeirão`);
  if (ev.combate?.oponente && !foeIds.has(ev.combate.oponente)) errors.push(`evento ${ev.id}: oponente inexistente "${ev.combate.oponente}"`);
  ev.combate?.oponentes?.forEach((id) => !foeIds.has(id) && errors.push(`evento ${ev.id}: oponente inexistente "${id}"`));
  if (!ev.choices.length) errors.push(`evento ${ev.id}: sem escolhas`);
  ev.choices.forEach((c, i) => {
    const w = `evento ${ev.id}#${i + 1}`;
    cond(w, c.cond);
    if (ev.type === 'narrative' && ev.choices.length > 0 && ev.allowGlobalTraits !== true && c.ex) errors.push(`${w}: opção global em narrativa fechada sem allowGlobalTraits`);
    if (c.requiresEventType && c.requiresEventType !== ev.type) errors.push(`${w}: exige contexto ${c.requiresEventType}, evento classificado como ${ev.type ?? 'sem tipo'}`);
    if (ev.type !== 'combat' && c.check?.tag === 'combate') errors.push(`${w}: escolha de combate disponível em evento ${ev.type ?? 'sem tipo'}`);
    if (c.check && (!c.ok || !c.fail)) errors.push(`${w}: check exige ok e fail`);
    if (!c.check && !c.res && !c.ok) errors.push(`${w}: escolha sem resultado`);
    fx(w, c.res?.fx); fx(w, c.ok?.fx); fx(w, c.fail?.fx);
  });
}

const eventById = new Map(EVENTS.map((event) => [event.id, event]));
const sagaTransitions = [
  { from: 'murim_ferro_inicio', to: 'murim_ferro_recado', flag: null },
  { from: 'murim_ferro_inicio', to: 'murim_escola', flag: null },
  { from: 'murim_ferro_recado', to: 'murim_refugiados', flag: 'saga_refugiados' },
  { from: 'murim_ferro_recado', to: 'murim_armazem', flag: 'saga_armazem' },
];
for (const { from, to, flag } of sagaTransitions) {
  const source = eventById.get(from);
  const target = eventById.get(to);
  if (!source || !target) {
    errors.push(`saga do Livro de Ferro: etapa inexistente em "${from}" → "${to}"`);
    continue;
  }
  const routes = source.choices.flatMap((choice) => [choice.res, choice.ok, choice.fail])
    .filter((outcome) => outcome?.fx?.agenda?.some((scheduled) => scheduled.event === to));
  if (!routes.length) errors.push(`saga do Livro de Ferro: "${from}" não agenda "${to}"`);
  if (flag && (!routes.some((outcome) => outcome?.fx?.setFlags?.includes(flag)) || !target.cond?.flags?.includes(flag))) {
    errors.push(`saga do Livro de Ferro: flag "${flag}" não liga "${from}" a "${to}"`);
  }
  if (!target.once) errors.push(`saga do Livro de Ferro: etapa "${to}" deve ocorrer uma vez por vida`);
}

const bonusProbe = startLife(newMeta(), {
  origin: ORIGINS[0].id,
  talent: TALENTS[0].id,
  flaw: 'covarde',
  root: { name: 'Fundamento de Passo', mult: 1, elements: ['Passo'] },
  constitution: null,
}, 'sopro', 0x51a9);
bonusProbe.stats = { fis: 8, esp: 8, comp: 8, sor: 8, car: 8, dao: 8 };
const probeCheck = { stat: 'car' as const };
const baseCheckChance = checkChance(bonusProbe, probeCheck);
bonusProbe.companions = ['lin_yue'];
if (checkChance(bonusProbe, probeCheck) <= baseCheckChance) errors.push('teste de integração: companheiro não aumenta a chance do teste');
bonusProbe.companions = [];
const equipmentCheck = { stat: 'fis' as const };
const equipmentChance = checkChance(bonusProbe, equipmentCheck);
bonusProbe.items.push('espada_inverno');
bonusProbe.equipment = { ...bonusProbe.equipment, rightWeapon: 'espada_inverno' };
if (checkChance(bonusProbe, equipmentCheck) <= equipmentChance) errors.push('teste de integração: equipamento não aumenta a chance do teste');

const sagaProbe = startLife(newMeta(), {
  origin: ORIGINS[0].id,
  talent: TALENTS[0].id,
  flaw: 'covarde',
  root: { name: 'Fundamento de Passo', mult: 1, elements: ['Passo'] },
  constitution: null,
}, '', 0x51aa);
sagaProbe.tier = 0;
sagaProbe.age = 6;
sagaProbe.maxAge = 5000;
sagaProbe.stats = { fis: 18, esp: 18, comp: 18, sor: 18, car: 18, dao: 18 };
sagaProbe.current = { id: 'murim_ferro_inicio' };
const sagaRng = new Rng(0x51ab);
const chooseSagaOption = (state: State, text: string): boolean => {
  const index = visibleChoices(state).findIndex((visible) => visible.choice?.text.startsWith(text));
  if (index < 0) {
    errors.push(`teste de integração: opção "${text}" indisponível em "${state.current?.id}"`);
    return false;
  }
  choose(state, index, sagaRng);
  return true;
};
if (chooseSagaOption(sagaProbe, 'Entregar o livro à boticária')) {
  if (!sagaProbe.scheduled.some((entry) => entry.event === 'murim_escola')) errors.push('teste de integração: a infância não agenda a decisão de entrar no Jianghu');
  if ((sagaProbe.morality?.good ?? 0) < 1) errors.push('teste de integração: escolha honrada não altera a reputação');
}
sagaProbe.age = 12;
sagaProbe.current = { id: 'murim_escola' };
if (chooseSagaOption(sagaProbe, 'Entrar na Escola da Lâmina Errante')) {
  if (sagaProbe.path !== 'espada' || sagaProbe.tier !== 1) errors.push('teste de integração: a escolha da escola não inicia a progressão marcial');
}
/* A validação percorre o catálogo ativo; módulos narrativos antigos foram arquivados fora dele. */
for (const i of ITEMS) fx(`item ${i.id}`, i.use);
for (const p of PATHS) {
  if (p.unlock && !achIds.has(p.unlock)) errors.push(`trilha ${p.id}: conquista inexistente "${p.unlock}"`);
}
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
const PLACEHOLDERS = new Set(['nome', 'rival', 'mentor', 'amigo', 'noivo', 'discipulo', 'inimigo', 'seita', 'cla', 'vila', 'idade', 'reino', 'eco', 'eco_final', 'eco_trilha']);
function lintText(where: string, text: string | undefined, max = 700) {
  if (text === undefined) return;
  if (!text.trim()) { errors.push(`${where}: texto vazio`); return; }
  for (const m of text.matchAll(/{([a-z_]+)}/g)) if (!PLACEHOLDERS.has(m[1])) errors.push(`${where}: marcador desconhecido {${m[1]}}`);
  if (/{[^}]*$/.test(text) || /^[^{]*}/.test(text)) errors.push(`${where}: chave solta`);
  if (text.length > max) warnings.push(`${where}: texto longo (${text.length} caracteres)`);
  if (/  +/.test(text)) warnings.push(`${where}: espaços duplos`);
  if (!where.includes('(título)') && !where.includes('(opção)') && !/[.!?…””)]$/.test(text.trim())) warnings.push(`${where}: não termina com pontuação`);
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
for (const e of ENDINGS) { lintText(`final ${e.id}`, e.text, 400); (e.alt ?? []).forEach((a, i) => lintText(`final ${e.id} (variação ${i + 1})`, a, 400)); }
const names = new Map<string, string>();
for (const x of ITEMS.map((i) => ({ id: 'item ' + i.id, name: i.name }))) {
  if (names.has(x.name)) warnings.push(`nome repetido: "${x.name}" (${names.get(x.name)} e ${x.id})`);
  names.set(x.name, x.id);
}
const titles = new Map<string, string>();
for (const ev of EVENTS) {
  if (titles.has(ev.title)) warnings.push(`título repetido: "${ev.title}" (${titles.get(ev.title)} e ${ev.id})`);
  titles.set(ev.title, ev.id);
}

const FLAGS_DO_MOTOR = new Set(['defeito_superado', 'juventude_eterna']);
for (const [f, where] of needFlags) if (!setFlags.has(f) && !FLAGS_DO_MOTOR.has(f)) warnings.push(`flag "${f}" exigida em ${where} nunca é definida`);

console.log(`Validação: ${EVENTS.length} eventos, ${ITEMS.length} itens, ${ENDINGS.length} finais, ${PATHS.length} estilos marciais.`);
warnings.forEach((w) => console.log('  aviso:', w));
errors.forEach((e) => console.log('  ERRO:', e));
if (errors.length) { console.log(`${errors.length} erro(s).`); process.exit(1); }
console.log('Conteúdo válido.');
