import { Rng } from '../rng';
import { LADDERS } from '../../data/modos/xianxia/realms';
import { PATHS } from '../../data/modos/xianxia/paths';
import { clanName, generoDoNome, personName, sectName, villageName } from '../../data/modos/xianxia/nomes';
import { gerarAparencia } from '../../ui/art/pintura/aparencia';
import type { Faccao, FaccaoTipo, Fato, FeridaTipo, Id, Lugar, Mundo, Objetivo, Papel, Pessoa, PapelPessoa, Traco } from './tipos';
import { TRACOS } from './tipos';

/**
 * O mundo da v2: pessoas, facções e lugares que existem entre as cenas.
 * - Elenco ATIVO: tudo que está em `mundo.pessoas`, simulado todo ano.
 * - RESERVA: pessoas geradas de forma determinística pela semente do mundo (`reservaPessoa`), que não ficam no save;
 *   ao serem promovidas viram ativas. O ano do mundo é a idade do jogador (ele nasce no ano 0).
 */
const LADDER_DE: Record<string, string> = Object.fromEntries(PATHS.map((p) => [p.id, p.ladder]));
const ladder = (trilha: string) => LADDERS[LADDER_DE[trilha] ?? 'xianxia'] ?? LADDERS.xianxia;
const anosDoReino = (trilha: string) => ladder(trilha).realms.map((r) => r.years);
export const vidaMax = (trilha: string, reino: number) => { const r = ladder(trilha).realms; return r[Math.min(reino, r.length - 1)].lifespan ?? 75; };
const OBJ_PADRAO: Objetivo = { tipo: 'subir' };

/** Nome do reino de uma pessoa (a escada depende da trilha; quem ainda não tem trilha usa a do xianxia). */
export function nomeDoReino(trilha: string, reino: number): string {
  const r = ladder(trilha).realms;
  return r[Math.min(reino, r.length - 1)].name;
}

/** Frase natural para uma morte. */
export function fraseMorte(nome: string, causa: string): string {
  const m: Record<string, string> = { 'a idade': 'morreu de velhice', 'uma febre longa': 'morreu de febre', 'um duelo': 'morreu num duelo', 'uma emboscada': 'caiu numa emboscada', 'a tribulação': 'não sobreviveu à tribulação', 'um desvio de Qi': 'morreu num desvio de Qi' };
  return `${nome} ${m[causa] ?? `morreu (${causa})`}.`;
}

/** Marca de um mesmo texto: gerador pequeno a partir de números. */
const rngDe = (...n: number[]) => new Rng(n.reduce((a, b) => (Math.imul(a ^ b, 0x45d9f3b) + 0x9e3779b9) >>> 0, 0x1234567));

/* ---------- Criação de pessoas e facções ---------- */
function nomeUnico(m: Mundo, rng: Rng): string {
  const usados = new Set(Object.values(m.pessoas).map((p) => p.nome));
  for (let i = 0; i < 30; i++) { const n = personName(rng); if (!usados.has(n)) return n; }
  return `${personName(rng)} ${m.proxId}`;
}
function doisTracos(rng: Rng): Traco[] {
  const a = rng.pick(TRACOS);
  let b = rng.pick(TRACOS);
  while (b === a) b = rng.pick(TRACOS);
  return [a, b];
}
const NEGATIVOS: Traco[] = ['orgulhoso', 'rancoroso', 'cruel'];

export function novaPessoa(m: Mundo, rng: Rng, ano: number, o: { idade: number; reino?: number; trilha?: string; tracos?: Traco[]; objetivo?: Objetivo; papeis?: Papel[]; faccao?: Id; lugar?: Id; opiniao?: number; teto?: number }, inserir = true): Pessoa {
  const id = inserir ? `p${m.proxId++}` : 'tmp';
  const reino = o.reino ?? 0;
  const p: Pessoa = {
    id, nome: nomeUnico(m, rng), nasc: ano - o.idade, reino, xp: 0, ritmo: 0.7 + rng.next() * 0.8, teto: o.teto ?? Math.max(reino, rng.weighted([2, 3, 4, 5, 6, 7, 8], (x) => [20, 24, 20, 14, 10, 6, 3][x - 2])),
    trilha: o.trilha ?? '', tracos: o.tracos ?? doisTracos(rng), objetivo: o.objetivo ?? OBJ_PADRAO, papeis: o.papeis ?? [],
    faccao: o.faccao, lugar: o.lugar, opiniao: o.opiniao ?? 0, memoria: [], vivo: true, ultima: ano,
  };
  if (p.tracos.includes('ambicioso')) p.ritmo *= 1.1;
  if (inserir) { darVisual(m, p); m.pessoas[id] = p; }
  return p;
}

/** Dá à pessoa um rosto próprio, diferente do das outras pessoas vivas do mundo. */
export function darVisual(m: Mundo, p: Pessoa) {
  if (p.visual) return;
  const outros = Object.values(m.pessoas).filter((o) => o.vivo && o.visual && o.id !== p.id).map((o) => o.visual!);
  p.visual = gerarAparencia(`${p.nome}|${m.semente}|${p.id}`, generoDoNome(p.nome), outros);
}

/** Insere no mundo uma pessoa criada solta (só acontece se a cena for escolhida). */
export function inserirPessoa(m: Mundo, p: Pessoa): Pessoa { p.id = `p${m.proxId++}`; darVisual(m, p); m.pessoas[p.id] = p; return p; }

/** Cria uma pessoa solta (fora do mundo) a partir da especificação `criar` de um papel. */
export function criarSolta(m: Mundo, rng: Rng, ano: number, reinoJog: number, c: NonNullable<PapelPessoa['criar']>): Pessoa {
  const reino = c.reino === 'jogador' ? reinoJog : c.reino ?? reinoJog;
  const tr = c.traco ? [rng.pick(c.traco), ...doisTracos(rng).slice(0, 1)] as Traco[] : undefined;
  const fac = c.faccao ? Object.values(m.faccoes).find((f) => f.tipo === c.faccao && f.estado !== 'extinta') : undefined;
  return novaPessoa(m, rng, ano, { idade: Math.max(8, 18 + reino * 12 + rng.int(-6, 10)), reino, trilha: c.trilha, tracos: tr, objetivo: c.objetivo ? { tipo: c.objetivo, alvo: 'jogador' } : undefined, faccao: fac?.id }, false);
}

const SEITA_EXTRA = ['Seita da Garça Branca', 'Seita do Pinheiro Cego', 'Templo do Sino Mudo', 'Seita da Lua Rachada', 'Pavilhão do Lago Quieto', 'Seita das Mil Agulhas'];
const CULTOS = ['Culto do Trono Escarlate', 'Culto da Lua Sem Rosto', 'Irmandade do Sangue Negro'];
const ASSOCIACOES = ['Pavilhão de Tesouros', 'Irmandade dos Panos Velhos', 'Aliança das Lâminas', 'Companhia dos Barqueiros'];
const CIDADES = ['Qingshui', 'Longmen', 'Baiyun', 'Hanjiang', 'Tiangong', 'Yuhe'];

function novaFaccao(m: Mundo, rng: Rng, nome: string, tipo: FaccaoTipo, ano: number, forca = rng.int(25, 70), interesse = ''): Faccao {
  const id = `f${m.proxId++}`;
  const f: Faccao = { id, nome, tipo, forca, estado: 'paz', aliados: [], inimigos: [], interesse: interesse || rng.pick(['expandir', 'proteger um segredo', 'cobrar dívidas', 'caçar um artefato', 'manter a ordem']), reputacao: 0, lugares: [], fundada: ano };
  m.faccoes[id] = f;
  return f;
}
function novoLugar(m: Mundo, nome: string, tipo: string, dono?: Id, perigo = 1): Lugar {
  const id = `l${m.proxId++}`;
  const l: Lugar = { id, nome, tipo, dono, perigo, segredos: [] };
  m.lugares[id] = l;
  if (dono && m.faccoes[dono]) m.faccoes[dono].lugares.push(id);
  return l;
}

/** Ferida de origem por origem (o que a pré-história fez com a família). */
const FERIDA_DE: Record<string, FeridaTipo> = {
  cla_decadente: 'divida', campones: 'terra', mercador: 'traicao', cacador: 'desonra', herdeiro_alquimista: 'divida', filho_guarda: 'desonra',
  pescador_mares: 'divida', orfao_seita: 'traicao', principe_decaido: 'traicao', mendigo_iluminado: 'desonra', discipulo_eremita: 'desonra',
  alma_reencarnada: 'traicao', filho_demonio: 'traicao', regressor: 'divida',
};

const PAI: [string, string, string] = ['o seu pai', 'do seu pai', 'ao seu pai'];
const FAMILIA_BASE: Record<string, { vitima: [string, string, string]; casa: string; orfao?: boolean }> = {
  campones: { vitima: PAI, casa: 'a casa de barro da família' }, mercador: { vitima: PAI, casa: 'a loja da família' }, cacador: { vitima: PAI, casa: 'a cabana da família' },
  filho_guarda: { vitima: PAI, casa: 'o alojamento da guarda' }, pescador_mares: { vitima: PAI, casa: 'a casa de palafitas' }, cla_decadente: { vitima: PAI, casa: 'a casa do clã' },
  herdeiro_alquimista: { vitima: ['o seu avô', 'do seu avô', 'ao seu avô'], casa: 'a casa do avô' }, principe_decaido: { vitima: PAI, casa: 'o palacete que sobrou' },
  filho_demonio: { vitima: PAI, casa: 'a casa sem janelas' }, regressor: { vitima: PAI, casa: 'a casa de sempre' }, alma_reencarnada: { vitima: PAI, casa: 'a casa em que nasceu' },
  orfao_seita: { vitima: ['quem o deixou na seita', 'de quem o deixou na seita', 'a quem o deixou na seita'], casa: 'o alojamento dos servos', orfao: true },
  mendigo_iluminado: { vitima: ['quem o abandonou na estrada', 'de quem o abandonou na estrada', 'a quem o abandonou na estrada'], casa: 'o canto da estrada', orfao: true },
  discipulo_eremita: { vitima: ['quem o deixou na montanha', 'de quem o deixou na montanha', 'a quem o deixou na montanha'], casa: 'a cabana da montanha', orfao: true },
};
/** Origens sem família viva por perto: a infância e a ferida são contadas de outro jeito. */
export const ORIGENS_ORFAS = ['orfao_seita', 'mendigo_iluminado', 'discipulo_eremita'];
function familiaDe(origem: string, parente: Pessoa): NonNullable<Mundo['familia']> {
  const b = FAMILIA_BASE[origem] ?? FAMILIA_BASE.campones;
  const f = generoDoNome(parente.nome) === 'f';
  const tutor: [string, string, string] = b.orfao
    ? origem === 'discipulo_eremita' ? (f ? ['a eremita', 'da eremita', 'à eremita'] : ['o eremita', 'do eremita', 'ao eremita']) : f ? ['a velha que o criou', 'da velha que o criou', 'à velha que o criou'] : ['o velho que o criou', 'do velho que o criou', 'ao velho que o criou']
    : f ? ['a sua mãe', 'da sua mãe', 'à sua mãe'] : ['o seu tio', 'do seu tio', 'ao seu tio'];
  return { vitima: b.vitima, casa: b.casa, tutor };
}

export interface Semente { semente: number; origem: string; nomeVila: string; nomeSeita: string; nomeCla: string; idade: number }

/** Pré-história: cria facções, lugares, a ferida de origem e o elenco inicial (rival, amigo, culpado, parente). */
export function criarMundo(sem: Semente, jogadorNome: string): { mundo: Mundo; rival: Pessoa; amigo: Pessoa; culpado: Pessoa; parente: Pessoa } {
  const rng = rngDe(sem.semente, 77);
  const m: Mundo = { semente: sem.semente, pessoas: {}, faccoes: {}, lugares: {}, fios: [], log: [], ferida: { tipo: 'divida', culpado: '', faccao: '' }, proxId: 1, anoReserva: 0, usados: [] };
  const ano = 6;
  // Facções
  const seita = novaFaccao(m, rng, sem.nomeSeita, 'seita', -120, rng.int(45, 70), 'formar discípulos');
  const cla = novaFaccao(m, rng, sem.nomeCla, 'cla', -90, rng.int(10, 30), 'recuperar o nome');
  const imperio = novaFaccao(m, rng, 'Império do Céu Dourado', 'imperio', -400, rng.int(70, 90), 'manter a ordem');
  const culto = novaFaccao(m, rng, rng.pick(CULTOS), 'culto', -60, rng.int(20, 45), 'caçar a seita justa');
  const assoc = ASSOCIACOES.slice().sort(() => rng.next() - 0.5).slice(0, 3).map((n) => novaFaccao(m, rng, n, 'associacao', -80, rng.int(30, 60)));
  const extras = SEITA_EXTRA.slice().sort(() => rng.next() - 0.5).slice(0, 3).map((n) => novaFaccao(m, rng, n, 'seita', rng.int(-200, -40), rng.int(25, 60)));
  const todas = [seita, imperio, culto, ...assoc, ...extras];
  // inimigos e aliados
  culto.inimigos.push(seita.id); seita.inimigos.push(culto.id);
  extras[0].inimigos.push(seita.id); seita.inimigos.push(extras[0].id);
  seita.aliados.push(imperio.id); imperio.aliados.push(seita.id);
  assoc[0].aliados.push(imperio.id);
  // Lugares
  const cidade = rng.pick(CIDADES);
  const vila = novoLugar(m, sem.nomeVila, 'vila', cla.id, 0);
  novoLugar(m, `Mercado de ${cidade}`, 'mercado', assoc[0].id, 1);
  novoLugar(m, `Praça de ${cidade}`, 'praca', imperio.id, 1);
  const sede = novoLugar(m, `Pátio da ${sem.nomeSeita}`, 'patio', seita.id, 1);
  novoLugar(m, `Portão da ${sem.nomeSeita}`, 'portao', seita.id, 1);
  novoLugar(m, 'Estrada do Salgueiro', 'estrada', undefined, 2);
  novoLugar(m, 'Floresta Espiritual', 'floresta', undefined, 3);
  novoLugar(m, 'Desfiladeiro do Corvo', 'desfiladeiro', undefined, 3);
  const ruinas = novoLugar(m, 'Ruínas da Seita das Cinzas Verdes', 'ruinas', undefined, 4);
  ruinas.segredos.push('um manual escondido num poço queimado');
  novoLugar(m, 'Gruta do Eremita', 'gruta', undefined, 2);
  novoLugar(m, 'Pico do Sino', 'pico', extras[1].id, 3);
  novoLugar(m, 'Porto dos Barqueiros', 'porto', assoc[1] ? assoc[1].id : undefined, 2);
  novoLugar(m, 'Forja Abandonada', 'forja', undefined, 2).segredos.push('um martelo que ainda guarda calor');
  novoLugar(m, 'Ponte de Pedra', 'ponte', imperio.id, 2);
  novoLugar(m, 'Templo Antigo', 'templo', undefined, 2);
  novoLugar(m, 'Deserto das Areias Mudas', 'deserto', undefined, 3);
  novoLugar(m, 'Planalto do Gelo Eterno', 'gelo', undefined, 4);
  novoLugar(m, 'Mar Sem Margem', 'mar', undefined, 3);
  void vila; void sede;
  // Elenco inicial
  const ferida: FeridaTipo = FERIDA_DE[sem.origem] ?? 'divida';
  const faccaoCulpada = ferida === 'divida' ? assoc[0] : ferida === 'terra' ? seita : ferida === 'desonra' ? imperio : assoc[1] ?? assoc[0];
  const papelCulpado = ferida === 'divida' ? 'credor' : 'culpado';
  const culpado = novaPessoa(m, rng, ano, { idade: rng.int(38, 60), reino: rng.int(1, 3), trilha: '', tracos: ['ambicioso', rng.pick(['cruel', 'orgulhoso', 'cauteloso'] as Traco[])], papeis: ferida === 'divida' ? ['credor', 'culpado'] : ['culpado'], faccao: faccaoCulpada.id, opiniao: -10, objetivo: { tipo: 'subir' }, teto: rng.int(4, 6) });
  culpado.importante = true;
  m.ferida = { tipo: ferida, culpado: culpado.id, faccao: faccaoCulpada.id };
  const rival = novaPessoa(m, rng, ano, { idade: 6 + rng.int(-1, 2), reino: 0, tracos: ['orgulhoso', rng.pick(['ambicioso', 'rancoroso', 'curioso'] as Traco[])], papeis: ['rival'], faccao: seita.id, objetivo: { tipo: 'superar', alvo: 'jogador' }, opiniao: -5, teto: rng.int(4, 7) });
  rival.ritmo = 1.05 + rng.next() * 0.35;
  const amigo = novaPessoa(m, rng, ano, { idade: 6 + rng.int(-1, 1), reino: 0, tracos: ['leal', rng.pick(['curioso', 'generoso', 'cauteloso'] as Traco[])], papeis: ['amigo'], faccao: cla.id, objetivo: { tipo: 'proteger', alvo: 'jogador' }, opiniao: 30 });
  const parente = novaPessoa(m, rng, ano, { idade: rng.int(30, 48), reino: 0, tracos: ['generoso', rng.pick(['cauteloso', 'leal', 'orgulhoso'] as Traco[])], papeis: ['parente'], faccao: cla.id, objetivo: { tipo: 'proteger', alvo: 'jogador' }, opiniao: 60 });
  parente.importante = true; amigo.importante = true;
  m.log.push({ ano: -41, texto: `${sem.nomeCla} perdeu o que tinha: ${ferida === 'divida' ? `ficou devendo à facção de ${culpado.nome}` : ferida === 'terra' ? `a terra foi tomada por gente de ${faccaoCulpada.nome}` : ferida === 'desonra' ? `o nome foi manchado por ${culpado.nome}` : `foi traído por ${culpado.nome}`}.` });
  void todas; void jogadorNome;
  m.familia = familiaDe(sem.origem, parente);
  return { mundo: m, rival, amigo, culpado, parente };
}

/* ---------- Reserva determinística ---------- */
interface SementePessoa { id: Id; nome: string; nasc: number; ritmo: number; teto: number; cultiva: boolean; inicio: number; trilha: string; tracos: Traco[]; u: number; violencia: number }
const NASC_POR_ANO = 3;
const DESLOC = 200;
const SEM_RESERVA = new Map<string, SementePessoa>();

export function reservaSemente(semente: number, k: number): SementePessoa {
  const chave = `${semente}:${k}`;
  let sp = SEM_RESERVA.get(chave);
  if (sp) return sp;
  const rng = rngDe(semente, 1000 + k);
  const cultiva = rng.chance(0.33);
  sp = {
    id: `r${k}`, nome: personName(rng), nasc: -DESLOC + Math.floor(k / NASC_POR_ANO), ritmo: 0.65 + rng.next() * 0.85,
    teto: rng.weighted([2, 3, 4, 5, 6, 7, 8], (x) => [20, 24, 20, 14, 10, 6, 3][x - 2]), cultiva, inicio: rng.int(10, 24),
    trilha: cultiva ? rng.pick(['sopro', 'espada', 'alquimia', 'corpo', 'alma', 'formacoes', 'budista', 'venenos', 'bestas']) : '',
    tracos: doisTracos(rng), u: rng.next(), violencia: rng.chance(cultiva ? 0.3 : 0.12) ? rng.int(18, 220) : 9999,
  };
  SEM_RESERVA.set(chave, sp);
  if (SEM_RESERVA.size > 6000) SEM_RESERVA.clear();
  return sp;
}
function reinoEm(sp: SementePessoa, idade: number): number {
  if (!sp.cultiva || idade < sp.inicio) return 0;
  const anos = anosDoReino(sp.trilha);
  const xp = (idade - sp.inicio) * sp.ritmo;
  let t = 1, acc = anos[1];
  while (t < 8 && xp >= acc) { t++; acc += anos[t]; }
  return Math.min(t, sp.teto);
}
function vivoEm(sp: SementePessoa, idade: number): boolean {
  if (idade >= sp.violencia) return false;
  for (let a = 20; a <= idade; a += 20) if (a > vidaMax(sp.trilha, reinoEm(sp, a)) * (0.78 + 0.22 * sp.u)) return false;
  return idade <= vidaMax(sp.trilha, reinoEm(sp, idade)) * (0.78 + 0.22 * sp.u);
}
export interface CandidatoReserva { sp: SementePessoa; idade: number; reino: number }
const CACHE_RES = new Map<string, CandidatoReserva[]>();
/** Todas as pessoas da reserva vivas no ano `ano` e com 6 anos ou mais (cache por ano). */
export function reservaViva(m: Mundo, ano: number): CandidatoReserva[] {
  const chave = `${m.semente}:${ano}`;
  const c = CACHE_RES.get(chave);
  if (c) return c;
  const kMin = Math.max(0, (ano - 260 + DESLOC) * NASC_POR_ANO), kMax = (ano - 6 + DESLOC) * NASC_POR_ANO;
  const out: CandidatoReserva[] = [];
  for (let k = kMin; k <= kMax; k++) {
    const sp = reservaSemente(m.semente, k);
    if (m.usados.includes(sp.id)) continue;
    const idade = ano - sp.nasc;
    if (idade < 6 || !vivoEm(sp, idade)) continue;
    out.push({ sp, idade, reino: reinoEm(sp, idade) });
  }
  if (CACHE_RES.size > 40) CACHE_RES.clear();
  CACHE_RES.set(chave, out);
  return out;
}

/** Promove uma pessoa da reserva a ativa. */
export function promover(m: Mundo, c: CandidatoReserva, ano: number, rng: Rng, papeis: Papel[]): Pessoa {
  const sp = c.sp;
  m.usados.push(sp.id);
  CACHE_RES.delete(`${m.semente}:${ano}`);
  const fac = Object.values(m.faccoes).filter((f) => f.tipo !== 'cla');
  const f = fac.length ? fac[Math.floor(sp.u * fac.length) % fac.length] : undefined;
  const id = `p${m.proxId++}`;
  const p: Pessoa = {
    id, nome: sp.nome, nasc: sp.nasc, reino: c.reino, xp: 0, ritmo: sp.ritmo, teto: sp.teto, trilha: sp.trilha, tracos: sp.tracos, objetivo: OBJ_PADRAO,
    papeis: [...papeis], faccao: f?.id, opiniao: 0, memoria: [], vivo: true, ultima: ano,
  };
  darVisual(m, p);
  m.pessoas[id] = p;
  return p;
}

/* ---------- Busca de pessoas para os papéis ---------- */
const reinoRef = (r: number | 'jogador-1' | 'jogador' | 'jogador+1' | undefined, jogador: number): number | undefined =>
  r === undefined ? undefined : r === 'jogador' ? jogador : r === 'jogador-1' ? jogador - 1 : r === 'jogador+1' ? jogador + 1 : r;

export function pessoaServe(p: Pessoa, f: PapelPessoa, ano: number, reinoJog: number, idadeJog: number): boolean {
  if (f.vivo === true && !p.vivo) return false;
  if (f.vivo === false && p.vivo) return false;
  if (f.papel && !p.papeis.includes(f.papel)) return false;
  if (f.desconhecido && p.papeis.length) return false;
  if (f.opiniaoMin !== undefined && p.opiniao < f.opiniaoMin) return false;
  if (f.opiniaoMax !== undefined && p.opiniao > f.opiniaoMax) return false;
  const rmin = reinoRef(f.reinoMin, reinoJog), rmax = reinoRef(f.reinoMax, reinoJog);
  if (rmin !== undefined && p.reino < rmin) return false;
  if (rmax !== undefined && p.reino > rmax) return false;
  const idade = ano - p.nasc;
  if (f.idadeMin !== undefined && idade < f.idadeMin) return false;
  if (f.idadeMax !== undefined && idade > f.idadeMax) return false;
  if (f.idadeDif && (idade - idadeJog < f.idadeDif[0] || idade - idadeJog > f.idadeDif[1])) return false;
  if (f.traco && !f.traco.some((t) => p.tracos.includes(t))) return false;
  if (f.trilha && !f.trilha.includes(p.trilha)) return false;
  if (f.objetivo && !f.objetivo.includes(p.objetivo.tipo)) return false;
  if (f.faccao && p.faccao !== f.faccao) return false;
  if (f.importante && !p.importante) return false;
  if (f.semVer !== undefined && ano - (p.ultima ?? ano) < f.semVer) return false;
  return true;
}
function candServe(c: CandidatoReserva, f: PapelPessoa, ano: number, reinoJog: number, idadeJog: number): boolean {
  if (f.papel) return false; // papéis com nome só existem entre os ativos
  const sp = c.sp;
  const fake: Pessoa = { id: sp.id, nome: sp.nome, nasc: sp.nasc, reino: c.reino, xp: 0, ritmo: sp.ritmo, teto: sp.teto, trilha: sp.trilha, tracos: sp.tracos, objetivo: OBJ_PADRAO, papeis: [], opiniao: 0, memoria: [], vivo: true };
  return pessoaServe(fake, { ...f, vivo: undefined }, ano, reinoJog, idadeJog);
}

export interface BuscaCtx { ano: number; reinoJog: number; idadeJog: number; excluir: Id[] }
/** Procura entre os ativos e, só então, na reserva (sem promover): devolve o candidato escolhido. */
export function procurarPessoa(m: Mundo, f: PapelPessoa, ctx: BuscaCtx, rng: Rng): { ativa?: Pessoa; reserva?: CandidatoReserva } | null {
  const ativos = Object.values(m.pessoas).filter((p) => !ctx.excluir.includes(p.id) && pessoaServe(p, f, ctx.ano, ctx.reinoJog, ctx.idadeJog));
  if (ativos.length) {
    // prefere quem apareceu há mais tempo (rotatividade) e quem tem mais a ver
    const ativa = rng.weighted(ativos, (p) => 1 + Math.min(20, ctx.ano - (p.ultima ?? 0)) / 4 + Math.abs(p.opiniao) / 40);
    return { ativa };
  }
  if (f.papel) return null;
  const cands = reservaViva(m, ctx.ano).filter((c) => !ctx.excluir.includes(c.sp.id) && candServe(c, f, ctx.ano, ctx.reinoJog, ctx.idadeJog));
  if (cands.length) return { reserva: cands[Math.floor(rng.next() * cands.length)] };
  return null;
}

/* ---------- Fatos, opinião e tratamento ---------- */
export function registrarFato(p: Pessoa, f: Fato) {
  p.memoria.push(f);
  if (p.memoria.length > 24) p.memoria.sort((a, b) => b.peso - a.peso || b.ano - a.ano).length = 24;
}
export const temFato = (p: Pessoa, tipo: string) => p.memoria.some((f) => f.tipo === tipo);

/** Como a pessoa chama o jogador (reino, título, fama, opinião). */
export function trato(p: Pessoa, reinoJog: number, fama: number, nomeJog: string): string {
  const dif = reinoJog - p.reino;
  const hostil = p.opiniao <= -40, afeto = p.opiniao >= 40;
  const f = generoDoNome(nomeJog) === 'f';
  const mestre = f ? 'Mestra' : 'Mestre';
  if (hostil) return dif >= 3 ? (f ? 'maldita' : 'maldito') : dif >= 0 ? (f ? 'desgraçada' : 'desgraçado') : (f ? 'impostora' : 'impostor');
  if (dif >= 4) return afeto ? mestre : 'Ancestral';
  if (dif >= 2) return afeto ? `${mestre} ${nomeJog.split(' ')[0]}` : f ? 'senhora' : 'senhor';
  if (dif <= -3) return afeto ? 'jovem' : f ? 'moleca' : 'moleque';
  if (afeto) return nomeJog.split(' ').pop() ?? nomeJog;
  return fama >= 40 ? mestre : 'você';
}

/* ---------- O mundo anda sozinho ---------- */
export interface Avanco { noticias: string[]; mortes: Id[] }
const CAUSAS = ['uma febre longa', 'um duelo', 'uma emboscada', 'a tribulação', 'a idade', 'um desvio de Qi'];

export function avancarMundo(m: Mundo, de: number, ate: number, nomeJog: string, rng: Rng, ctx: { reinoJog: number; faccaoJogador?: Id }): Avanco {
  const out: Avanco = { noticias: [], mortes: [] };
  for (let y = Math.floor(de) + 1; y <= Math.floor(ate); y++) {
    // pessoas
    for (const p of Object.values(m.pessoas)) {
      if (!p.vivo) continue;
      const idade = y - p.nasc;
      if (p.reino >= 1 && p.reino < p.teto) {
        p.xp += p.ritmo * (p.objetivo.tipo === 'superar' || p.objetivo.tipo === 'vingar' ? 1.12 : 1);
        const anos = anosDoReino(p.trilha);
        if (p.xp >= anos[Math.min(p.reino, 8)]) {
          p.xp = 0; p.reino++;
          if (p.papeis.length || p.importante) out.noticias.push(`${p.nome} rompeu para ${nomeDoReino(p.trilha, p.reino)}.`);
        }
      } else if (p.reino === 0 && idade >= 14 && p.papeis.includes('rival') && p.teto >= 3 && rng.chance(0.18)) {
        p.reino = 1; p.xp = 0;
        if (!p.trilha) p.trilha = rng.pick(['sopro', 'espada', 'alquimia', 'corpo', 'alma', 'formacoes', 'budista', 'venenos', 'bestas']);
        out.noticias.push(`${p.nome} despertou o Qi.`);
      }
      // opinião esfria devagar, exceto em rancorosos e leais
      if (p.opiniao !== 0 && !p.tracos.includes('rancoroso') && !p.tracos.includes('leal')) p.opiniao += p.opiniao > 0 ? -0.3 : 0.3;
      // morte
      const lim = vidaMax(p.trilha, p.reino);
      let morre = false, causa = '';
      if (idade >= lim) { morre = rng.chance(0.5); causa = 'a idade'; }
      else if (idade > lim * 0.88 && rng.chance(0.06)) { morre = true; causa = 'a idade'; }
      else if ((p.objetivo.tipo === 'cacar' || p.objetivo.tipo === 'vingar' || p.faccao && m.faccoes[p.faccao]?.estado === 'guerra') && p.reino >= 1 && rng.chance(0.006)) { morre = true; causa = rng.pick(CAUSAS); }
      else if (rng.chance(0.0015)) { morre = true; causa = 'uma febre longa'; }
      if (morre) {
        p.vivo = false; p.morte = { ano: y, causa };
        m.log.push({ ano: y, texto: fraseMorte(p.nome, causa) });
        if (p.importante || p.papeis.some((x) => ['mestre', 'amigo', 'rival', 'noivo', 'discipulo', 'parente', 'inimigo'].includes(x))) out.mortes.push(p.id);
      }
    }
    // facções
    for (const f of Object.values(m.faccoes)) {
      if (f.estado === 'extinta') continue;
      f.forca = Math.max(0, Math.min(100, f.forca + rng.int(-2, 2) + (f.estado === 'guerra' ? -1 : 0)));
      if (f.estado === 'guerra' && f.ate !== undefined && y >= f.ate) { f.estado = 'paz'; f.ate = undefined; if (f.reputacao !== 0 || f.id === ctx.faccaoJogador) out.noticias.push(`A guerra de ${f.nome} terminou.`); }
      if ((f.estado === 'paz' || f.estado === 'tensao') && f.inimigos.length && rng.chance(f.estado === 'tensao' ? 0.04 : 0.012)) {
        const alvo = m.faccoes[rng.pick(f.inimigos)];
        if (alvo && alvo.estado !== 'extinta') {
          f.estado = 'guerra'; f.ate = y + rng.int(6, 18);
          if (alvo.estado !== 'guerra') { alvo.estado = 'guerra'; alvo.ate = f.ate; }
          m.log.push({ ano: y, texto: `${f.nome} entrou em guerra com ${alvo.nome}.` });
          if (f.reputacao !== 0 || alvo.reputacao !== 0 || f.id === ctx.faccaoJogador || alvo.id === ctx.faccaoJogador) out.noticias.push(`${f.nome} e ${alvo.nome} entraram em guerra.`);
        }
      } else if (f.estado === 'paz' && f.inimigos.length && rng.chance(0.02)) f.estado = 'tensao';
      else if (f.estado === 'tensao' && rng.chance(0.05)) f.estado = 'paz';
      if (f.forca <= 0 || (f.estado === 'guerra' && f.forca <= 4 && rng.chance(0.2))) {
        f.estado = 'extinta';
        m.log.push({ ano: y, texto: `${f.nome} deixou de existir.` });
        for (const lid of f.lugares) { const l = m.lugares[lid]; if (l) { l.dono = undefined; l.segredos.push(`um manual deixado por ${f.nome}`); } }
        if (f.reputacao !== 0 || f.id === ctx.faccaoJogador) out.noticias.push(`${f.nome} caiu e deixou ruínas.`);
      }
    }
    // novas facções: cismas e fundações
    if (y % 20 === 0 && rng.chance(0.4)) {
      const seitas = Object.values(m.faccoes).filter((f) => f.tipo === 'seita' && f.estado !== 'extinta' && f.forca > 55);
      if (seitas.length) {
        const mae = rng.pick(seitas);
        const nome = sectName(rng);
        if (!Object.values(m.faccoes).some((f) => f.nome === nome)) {
          const nova = novaFaccao(m, rng, nome, 'seita', y, rng.int(14, 30), 'provar-se');
          nova.inimigos.push(mae.id); mae.inimigos.push(nova.id); mae.forca -= 8;
          m.log.push({ ano: y, texto: `${nova.nome} se separou da ${mae.nome}.` });
          if (mae.reputacao !== 0) out.noticias.push(`Um cisma na ${mae.nome} criou a ${nova.nome}.`);
        }
      }
    }
  }
  return out;
}

export const nomeVilaAleatorio = (rng: Rng) => villageName(rng);
export const nomeClaAleatorio = (rng: Rng) => clanName(rng);
