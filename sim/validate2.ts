/** Valida os moldes da v2 (papéis, marcadores, gênero, saídas). Uso: npm run validate (roda junto com o da v1). */
import { MOLDES } from '../src/data/v2/index';
import { ITEMS } from '../src/data/items';
import { TECHNIQUES } from '../src/data/techniques';
import { ENDINGS } from '../src/data/endings';
import type { Cond2, Molde, Res } from '../src/engine/v2/tipos';

const errors: string[] = [];
const warnings: string[] = [];
const itemIds = new Set(ITEMS.map((i) => i.id)), techIds = new Set(TECHNIQUES.map((t) => t.id)), endIds = new Set(ENDINGS.map((e) => e.id));

const CAMPOS = new Set(['nome', 'trato', 'Trato', 'reino', 'faccao', 'idade', 'causa', 'ele', 'Ele', 'dele', 'Dele', 'nele', 'Nele', 'o', 'O', 'um', 'Um', 'este', 'Este', 'mesmo', 'moco', 'homem', 'Homem', 'velho', 'lo', 'senhor', 'Senhor', 'irmao', 'jovem', 'filho', 'vitima', 'Vitima', 'dovitima', 'aovitima', 'tutor', 'Tutor', 'dotutor', 'aotutor', 'casa', 'Casa']);
const GLOBAIS = new Set(['jogador', 'mundo', 'ferida', 'familia']);
const V1 = new Set(['nome', 'rival', 'mentor', 'amigo', 'noivo', 'discipulo', 'inimigo', 'seita', 'cla', 'vila', 'idade', 'reino', 'eco', 'eco_final', 'eco_trilha', 'eco_tecnica']);
/** Moldes onde "ele/ela" não se refere a uma pessoa (coisa, lugar ou nome). */
const PRONOME_LIVRE = new Set(['virada_reerguer', 'seita_guerra', 'reacao_rompimento']);

const ids = new Set<string>();
const fios = new Set<string>();
for (const m of MOLDES) if (m.fio) fios.add(m.fio.id);

function textos(m: Molde): { onde: string; t: string; opcao?: boolean }[] {
  const out: { onde: string; t: string; opcao?: boolean }[] = [{ onde: 'título', t: m.titulo }];
  if (typeof m.cena === 'string') out.push({ onde: 'cena', t: m.cena });
  else m.cena.forEach((v, i) => out.push({ onde: `cena[${i}]`, t: v.texto }));
  const res = (w: string, r?: Res) => {
    if (!r) return;
    out.push({ onde: w, t: r.texto });
    r.alt?.forEach((a, i) => out.push({ onde: `${w}.alt${i}`, t: a }));
    r.efeitos?.forEach((e) => { if ('noticia' in e) out.push({ onde: `${w}.noticia`, t: e.noticia }); });
  };
  for (const o of m.opcoes) { out.push({ onde: `opção ${o.id}`, t: o.texto, opcao: true }); res(`${o.id}.res`, o.res); res(`${o.id}.ok`, o.sucesso); res(`${o.id}.falha`, o.falha); }
  return out;
}

function condPapeis(c: Cond2 | undefined, f: (r: string) => void) {
  if (!c) return;
  Object.keys(c.papel ?? {}).forEach(f); Object.keys(c.faccao ?? {}).forEach(f);
  c.todos?.forEach((x) => condPapeis(x, f)); c.algum?.forEach((x) => condPapeis(x, f)); condPapeis(c.nao, f);
}

for (const m of MOLDES) {
  const w = `molde ${m.id}`;
  if (ids.has(m.id)) errors.push(`${w}: id duplicado`);
  ids.add(m.id);
  const papeis = new Set(Object.keys(m.papeis ?? {}));
  const ehPessoa = (r: string) => !!(m.papeis?.[r] as { pessoa?: unknown } | undefined)?.pessoa;
  const temPessoa = [...papeis].some(ehPessoa);

  // papéis usados em condições e efeitos existem
  const exige = (r: string, onde: string) => { if (!papeis.has(r)) errors.push(`${w}: papel "${r}" usado em ${onde} não existe em papeis`); };
  condPapeis(m.quando, (r) => exige(r, 'quando'));
  m.relevancia?.forEach((t) => condPapeis(t.se, (r) => exige(r, 'relevancia')));
  if (typeof m.cena !== 'string') m.cena.forEach((v) => condPapeis(v.se, (r) => exige(r, 'cena')));
  const efs = (o: string, r?: Res) => {
    if (!r) return;
    const fx = r.fx;
    fx?.item?.forEach((i) => !itemIds.has(i) && errors.push(`${w}#${o}: item inexistente "${i}"`));
    fx?.tecnica?.forEach((t) => !techIds.has(t) && errors.push(`${w}#${o}: técnica inexistente "${t}"`));
    if (fx?.fim && !endIds.has(fx.fim)) errors.push(`${w}#${o}: final inexistente "${fx.fim}"`);
    for (const e of r.efeitos ?? []) {
      const ref = (e as Record<string, unknown>);
      for (const k of ['opiniao', 'fato', 'reputacao', 'objetivo', 'papel', 'semPapel', 'faccao', 'levarFaccao', 'forca', 'lugar', 'reino', 'situacao']) if (k in ref) exige((ref[k] as string[])[0], `efeito ${k}`);
      for (const k of ['morte', 'ferir', 'trilhaDe']) if (k in ref) exige(ref[k] as string, `efeito ${k}`);
      if ('fio' in e) { const [fid] = e.fio; if (!fios.has(fid)) errors.push(`${w}#${o}: fio "${fid}" não é aberto por nenhum molde`); }
    }
  };
  const seen = new Set<string>();
  for (const o of m.opcoes) {
    if (seen.has(o.id)) errors.push(`${w}: opção duplicada "${o.id}"`);
    seen.add(o.id);
    condPapeis(o.requer, (r) => exige(r, `opção ${o.id}`));
    if (o.teste && (!o.sucesso || !o.falha)) errors.push(`${w}#${o.id}: teste exige sucesso e falha`);
    if (!o.teste && !o.res && !o.sucesso) errors.push(`${w}#${o.id}: opção sem resultado`);
    efs(`${o.id}.res`, o.res); efs(`${o.id}.ok`, o.sucesso); efs(`${o.id}.falha`, o.falha);
    // o texto da escolha não pode prometer o desfecho do teste
    if (o.teste && /\b(quando|depois de|assim que|e, ao) (vencer|ganhar|derrotar|conseguir|triunfar)|e então (poupar|perdoar|matar)|e, (depois|então),? (poupar|perdoar|matar)/i.test(o.texto)) errors.push(`${w}#${o.id}: o texto da opção presume o resultado do teste ("${o.texto}")`);
  }
  if (!m.opcoes.some((o) => !o.requer)) warnings.push(`${w}: todas as opções têm condição (o motor oferece "Seguir em frente." se nenhuma servir)`);
  if (m.fio && !['rival', 'cla', 'seita', 'amigo', 'mestre', 'discipulo', 'herdeiro'].includes(m.fio.id) && !fios.has(m.fio.id)) warnings.push(`${w}: fio "${m.fio.id}" desconhecido`);

  for (const { onde, t } of textos(m)) {
    const at = `${w} ${onde}`;
    if (!t.trim()) { errors.push(`${at}: texto vazio`); continue; }
    for (const mm of t.matchAll(/\{([a-z_]+)\.([a-zA-Z]+)\}/g)) {
      const [, r, c] = mm;
      if (!GLOBAIS.has(r) && !papeis.has(r)) errors.push(`${at}: papel "${r}" em {${r}.${c}} não existe`);
      else if (!CAMPOS.has(c) && !(r === 'mundo' || r === 'ferida' || r === 'familia' || (r === 'jogador' && c === 'reino'))) errors.push(`${at}: campo desconhecido {${r}.${c}}`);
      else if (c !== 'nome' && c !== 'faccao' && papeis.has(r) && !ehPessoa(r) && !['reino'].includes(c)) errors.push(`${at}: {${r}.${c}} usado em papel que não é pessoa`);
    }
    for (const mm of t.matchAll(/\{([a-z_]+)\}/g)) if (!V1.has(mm[1])) errors.push(`${at}: marcador desconhecido {${mm[1]}}`);
    if (/\{[^}]*$/.test(t) || /^[^{]*\}/.test(t) || /\{\{|\}\}/.test(t)) errors.push(`${at}: chave solta`);
    // gênero fixo: pronome solto numa cena com pessoas
    // (só vale se o próprio texto cita uma pessoa do molde: sem isso o pronome se refere a alguém sem nome, a um bicho ou a uma coisa)
    const citaPessoa = [...t.matchAll(/\{([a-z_]+)\.[A-Za-z]+\}/g)].some((x) => ehPessoa(x[1]));
    if (temPessoa && citaPessoa && !PRONOME_LIVRE.has(m.id)) {
      const sem = t.replace(/\{[^}]*\}/g, '');
      const g = sem.match(/\b(ele|ela|dele|dela|nele|nela|Ele|Ela)\b/);
      if (g) errors.push(`${at}: pronome fixo "${g[0]}" (use {papel.ele}): …${sem.slice(Math.max(0, (g.index ?? 0) - 25), (g.index ?? 0) + 25)}…`);
      const j = sem.match(/\b(sozinho|sozinha|cansado|cansada|sorrindo)\b/);
      if (j && /voc[êe]|você/i.test(sem)) warnings.push(`${at}: adjetivo "${j[0]}" pode estar fixo no gênero do jogador (use {jogador.o})`);
    }
    // tratamento minúsculo no começo de fala
    if (/"\{[a-z_]+\.trato\}/.test(t)) errors.push(`${at}: {x.trato} no começo da fala (use {x.Trato})`);
  }
}

console.log(`Validação v2: ${MOLDES.length} moldes.`);
warnings.forEach((x) => console.log('  aviso:', x));
errors.forEach((x) => console.log('  ERRO:', x));
if (errors.length) { console.log(`${errors.length} erro(s) na v2.`); process.exit(1); }
console.log('Moldes válidos.');
