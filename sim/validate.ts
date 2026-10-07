/** Valida referências cruzadas do conteúdo. Uso: npm run validate */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as ts from 'typescript';
import { EVENTS } from '../src/data/events';
import { hasCombatMechanics } from '../src/data/event-type';
import { ITEMS } from '../src/data/items';
import { TECHNIQUES } from '../src/data/techniques';
import { ENDINGS, ACHIEVEMENTS, ACH_CHECKS } from '../src/data/endings';
import { PATHS } from '../src/data/paths';
import { WORLDS, WORLD } from '../src/data/mundo';
import { TETOS } from '../src/data/faixas';
import { FUSOES } from '../src/data/tecnicas_novas';
import { ORIGINS, TALENTS } from '../src/data/character';
import { QUESTS } from '../src/data/quests';
import { FOES } from '../src/data/combates';
import { COMPANIONS } from '../src/data/companions';
import { checkChance, choose, newMeta, proceed, startLife, visibleChoices } from '../src/engine/engine';
import { Rng } from '../src/engine/rng';
import type { Cond, Effects, EquipmentSlot, State } from '../src/types';

const errors: string[] = [];
const warnings: string[] = [];
const ROOT_TAGS = new Set(['unica', 'mutante', 'dupla', 'tripla', 'quadrupla', 'caotica', 'Metal', 'Madeira', 'Água', 'Fogo', 'Terra', 'Raio', 'Gelo', 'Vento']);
const ids = <T extends { id: string }>(a: T[]) => new Set(a.map((x) => x.id));
const itemIds = ids(ITEMS), techIds = ids(TECHNIQUES), endIds = ids(ENDINGS), evIds = ids(EVENTS), achIds = ids(ACHIEVEMENTS), foeIds = ids(FOES);

function dupes(label: string, list: { id: string }[]) {
  const seen = new Set<string>();
  for (const x of list) {
    if (seen.has(x.id)) errors.push(`${label}: id duplicado "${x.id}"`);
    seen.add(x.id);
  }
}
dupes('evento', EVENTS); dupes('item', ITEMS); dupes('técnica', TECHNIQUES); dupes('final', ENDINGS); dupes('missão', QUESTS); dupes('oponente', FOES); dupes('companheiro', COMPANIONS);

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
  e.tecnica?.forEach((t) => !techIds.has(t) && errors.push(`${where}: técnica inexistente "${t}"`));
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
  if (c.tecnica && !techIds.has(c.tecnica)) errors.push(`${where}: cond.tecnica inexistente "${c.tecnica}"`);
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
    if (ev.type !== 'combat' && (c.check?.tag === 'combate' || c.activeTechnique)) errors.push(`${w}: escolha de combate disponível em evento ${ev.type ?? 'sem tipo'}`);
    if (c.activeTechnique && (ev.type !== 'combat' || c.check?.tag !== 'combate')) errors.push(`${w}: técnica ativa fora de uma escolha de combate`);
    if (c.check && (!c.ok || !c.fail)) errors.push(`${w}: check exige ok e fail`);
    if (!c.check && !c.res && !c.ok) errors.push(`${w}: escolha sem resultado`);
    fx(w, c.res?.fx); fx(w, c.ok?.fx); fx(w, c.fail?.fx);
  });
}

const eventById = new Map(EVENTS.map((event) => [event.id, event]));
const sagaTransitions = [
  { from: 'partir_viagem', to: 'saga_ferro_inicio', flag: 'saga_ferro_chamado' },
  { from: 'saga_ferro_inicio', to: 'saga_ferro_forja', flag: 'saga_ferro_rastro' },
  { from: 'saga_ferro_forja', to: 'saga_ferro_guardiao', flag: 'saga_ferro_fundida' },
  { from: 'saga_ferro_guardiao', to: 'saga_ferro_legado', flag: null },
];
for (const { from, to, flag } of sagaTransitions) {
  const source = eventById.get(from);
  const target = eventById.get(to);
  if (!source || !target) {
    errors.push(`saga da Forja Silenciosa: etapa inexistente em "${from}" → "${to}"`);
    continue;
  }
  const routes = source.choices.flatMap((choice) => [choice.res, choice.ok, choice.fail])
    .filter((outcome) => outcome?.fx?.agenda?.some((scheduled) => scheduled.event === to));
  if (!routes.length) errors.push(`saga da Forja Silenciosa: "${from}" não agenda "${to}"`);
  if (flag && (!routes.some((outcome) => outcome?.fx?.setFlags?.includes(flag)) || !target.cond?.flags?.includes(flag))) {
    errors.push(`saga da Forja Silenciosa: flag "${flag}" não liga "${from}" a "${to}"`);
  }
  if (!target.once) errors.push(`saga da Forja Silenciosa: etapa "${to}" deve ocorrer uma vez por vida`);
}

const bonusProbe = startLife(newMeta(), {
  origin: ORIGINS[0].id,
  talent: TALENTS[0].id,
  flaw: 'covarde',
  root: { name: 'Raiz de Metal', mult: 1, elements: ['Metal'] },
  constitution: null,
}, 'sopro', 0x51a9);
bonusProbe.stats = { fis: 10, esp: 10, comp: 10, sor: 10, car: 10, dao: 10 };
const probeCheck = { stat: 'fis' as const };
const baseCheckChance = checkChance(bonusProbe, probeCheck);
bonusProbe.companions = ['lin_yue'];
if (checkChance(bonusProbe, probeCheck) <= baseCheckChance) errors.push('teste de integração: companheiro não aumenta a chance do teste');
bonusProbe.companions = [];
bonusProbe.items.push('espada_inverno');
bonusProbe.equipment = { ...bonusProbe.equipment, rightWeapon: 'espada_inverno' };
if (checkChance(bonusProbe, probeCheck) <= baseCheckChance) errors.push('teste de integração: equipamento não aumenta a chance do teste');

const sagaProbe = startLife(newMeta(), {
  origin: ORIGINS[0].id,
  talent: TALENTS[0].id,
  flaw: 'covarde',
  root: { name: 'Raiz de Metal', mult: 1, elements: ['Metal'] },
  constitution: null,
}, 'sopro', 0x51aa);
sagaProbe.tier = 1;
sagaProbe.age = 20;
sagaProbe.maxAge = 5000;
sagaProbe.xp = 0;
sagaProbe.stats = { fis: 18, esp: 18, comp: 18, sor: 18, car: 18, dao: 18 };
sagaProbe.items.push('mapa_fragmentado');
sagaProbe.scheduled = [];
sagaProbe.seen = {};
sagaProbe.counts = {};
sagaProbe.current = { id: 'partir_viagem' };
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
const advanceSaga = (state: State, expected: string) => {
  proceed(state, sagaRng);
  if (state.current?.id !== expected) errors.push(`teste de integração: saga esperava "${expected}", recebeu "${state.current?.id ?? 'nenhum evento'}"`);
};
if (chooseSagaOption(sagaProbe, 'Seguir as marcas')) {
  advanceSaga(sagaProbe, 'saga_ferro_inicio');
  if (chooseSagaOption(sagaProbe, 'Ler as inscrições')) {
    advanceSaga(sagaProbe, 'saga_ferro_forja');
    if (chooseSagaOption(sagaProbe, 'Forjar a Espada')) {
      advanceSaga(sagaProbe, 'saga_ferro_guardiao');
      if (chooseSagaOption(sagaProbe, 'Enfrentar o Guardião')) {
        advanceSaga(sagaProbe, 'saga_ferro_legado');
        if (chooseSagaOption(sagaProbe, 'Completar a matriz da armadura') &&
            !sagaProbe.items.some((id) => id.startsWith('armadura_qi_escamas'))) {
          errors.push('teste de integração: o desfecho da saga não concedeu a armadura escolhida');
        }
      }
    }
  }
}

/* Todo módulo de eventos precisa estar ligado ao catálogo e todo evento literal precisa chegar ao runtime. */
const eventDir = fileURLToPath(new URL('../src/data/events/', import.meta.url));
const eventIndexSource = readFileSync(new URL('../src/data/events/index.ts', import.meta.url), 'utf8');
const eventFiles = readdirSync(eventDir).filter((name) => name.endsWith('.ts') && name !== 'index.ts');
for (const file of eventFiles) {
  const stem = file.slice(0, -3);
  if (!eventIndexSource.includes(`from './${stem}'`)) errors.push(`arquivo de eventos ${file}: não registrado em events/index.ts`);
  const sourceText = readFileSync(new URL(`../src/data/events/${file}`, import.meta.url), 'utf8');
  const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);
  const inspect = (node: ts.Node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map((p) => [p.name.getText(sourceFile).replace(/^['"]|['"]$/g, ''), p.initializer]));
      const id = props.get('id');
      if (id && ts.isStringLiteralLike(id) && props.has('choices') && !evIds.has(id.text)) {
        errors.push(`${file}: evento "${id.text}" não foi incluído em EVENTS`);
      }
    }
    ts.forEachChild(node, inspect);
  };
  inspect(sourceFile);
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
