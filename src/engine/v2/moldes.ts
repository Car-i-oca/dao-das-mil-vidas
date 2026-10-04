import type { Check, Choice, Cond, GameEvent, Outcome, State, StatKey } from '../../types';
import { applyFx, condMet, fill, ladderOf, realmOf } from '../engine';
import { Rng } from '../rng';
import { MOLDES } from '../../data/v2/index';
import type { Cond2, CondPapel, EfeitoMundo, Faccao, Fio, Id, Lugar, Molde, Opcao, Papel, PapelDef, Pessoa, Res, Variante } from './tipos';
import { generoDoNome } from '../../data/names';
import { criarSolta, fraseMorte, inserirPessoa, nomeDoReino, procurarPessoa, promover, registrarFato, temFato, trato, type CandidatoReserva } from './mundo';

export const MOLDE: Record<string, Molde> = Object.fromEntries(MOLDES.map((m) => [m.id, m]));

/** O molde cuja condição está sendo avaliada (para `vezes`). */
let moldeAtual = '';
export const usarMolde = (id: string) => { moldeAtual = id; };

/* ---------- Visão de um papel durante a escolha (sem promover ainda) ---------- */
export interface LigacaoPessoa { tipo: 'pessoa'; pessoa: Pessoa; reserva?: CandidatoReserva; criar?: boolean }
export interface LigacaoFaccao { tipo: 'faccao'; faccao: Faccao }
export interface LigacaoLugar { tipo: 'lugar'; lugar: Lugar }
export type Ligacao = LigacaoPessoa | LigacaoFaccao | LigacaoLugar;
export type Ligacoes = Record<Papel, Ligacao>;

export function faccaoDoJogador(s: State): Faccao | undefined {
  const m = s.v2!.mundo;
  const nome = s.faction === 'seita' ? s.names.seita : s.faction === 'cla' ? s.names.cla : s.faction === 'demoniaca' ? null : null;
  if (s.faction === 'demoniaca') return Object.values(m.faccoes).find((f) => f.tipo === 'culto');
  return nome ? Object.values(m.faccoes).find((f) => f.nome === nome) : undefined;
}

/** A inclinação mais alta (opcionalmente ignorando uma). */
const COM_ARCO = ['reerguer_cla', 'vingar_cla', 'superar_rival', 'ascender_seita'];
function dominante(a: { inclinacoes: Record<string, number> }, ignorar?: string): string | undefined {
  return Object.entries(a.inclinacoes).filter(([k]) => k !== ignorar && COM_ARCO.includes(k)).sort((x, y) => y[1] - x[1])[0]?.[0];
}

/* ---------- Condições ---------- */
function jogadorOk(s: State, c: NonNullable<Cond2['jogador']>): boolean {
  if (c.semTrilha && s.path) return false;
  if (c.defeitoNao?.includes(s.flaw)) return false;
  const k: Cond = {
    tierMin: c.reinoMin, tierMax: c.reinoMax, ageMin: c.idadeMin, ageMax: c.idadeMax, path: c.trilha, origin: c.origem, flags: c.flag, noFlags: c.semFlag,
    talent: c.talento, flaw: c.defeito, root: c.raiz, tecnicas: c.tecnica, mestria: c.mestria, item: c.item, perfil: c.perfilMin,
    pedrasMin: c.pedrasMin, karmaMin: c.karmaMin, karmaMax: c.karmaMax, fameMin: c.famaMin, constitution: c.constituicao, corrMin: c.corrMin,
  };
  return condMet(s, k);
}
function papelOk(s: State, p: Pessoa, c: CondPapel): boolean {
  if (c.vivo !== undefined && p.vivo !== c.vivo) return false;
  if (c.opiniaoMin !== undefined && p.opiniao < c.opiniaoMin) return false;
  if (c.opiniaoMax !== undefined && p.opiniao > c.opiniaoMax) return false;
  if (c.reinoMin !== undefined && p.reino < c.reinoMin) return false;
  if (c.reinoMax !== undefined && p.reino > c.reinoMax) return false;
  if (c.reinoDif) { const d = s.tier - p.reino; if (d < c.reinoDif[0] || d > c.reinoDif[1]) return false; }
  if (c.objetivo && !c.objetivo.includes(p.objetivo.tipo)) return false;
  if (c.fato && !c.fato.every((f) => temFato(p, f))) return false;
  if (c.semFato && c.semFato.some((f) => temFato(p, f))) return false;
  if (c.traco && !c.traco.some((t) => p.tracos.includes(t))) return false;
  if (c.trilha && !c.trilha.includes(p.trilha)) return false;
  if (c.situacao && !c.situacao.includes(p.situacao ?? '')) return false;
  if (c.semSituacao && c.semSituacao.includes(p.situacao ?? '')) return false;
  return true;
}
export function condOk(s: State, c: Cond2 | undefined, lig: Ligacoes): boolean {
  if (!c) return true;
  const v = s.v2!;
  if (c.jogador && !jogadorOk(s, c.jogador)) return false;
  if (c.papel) for (const [r, pc] of Object.entries(c.papel)) { const l = lig[r]; if (!l || l.tipo !== 'pessoa' || !papelOk(s, l.pessoa, pc)) return false; }
  if (c.faccao) {
    for (const [r, fc] of Object.entries(c.faccao)) {
      const l = lig[r]; if (!l || l.tipo !== 'faccao') return false;
      const f = l.faccao;
      if (fc.estado && !fc.estado.includes(f.estado)) return false;
      if (fc.reputacaoMin !== undefined && f.reputacao < fc.reputacaoMin) return false;
      if (fc.reputacaoMax !== undefined && f.reputacao > fc.reputacaoMax) return false;
      if (fc.forcaMin !== undefined && f.forca < fc.forcaMin) return false;
      if (fc.forcaMax !== undefined && f.forca > fc.forcaMax) return false;
    }
  }
  if (c.fio) {
    for (const [id, fc] of Object.entries(c.fio)) {
      const f = v.mundo.fios.find((x) => x.id === id);
      if (fc.existe !== undefined && !!f !== fc.existe) return false;
      if (fc.aberto !== undefined && (f?.estado === 'aberto') !== fc.aberto) return false;
      if (fc.resolvido !== undefined && (f?.estado === 'resolvido') !== fc.resolvido) return false;
      if (fc.desfecho && !(f?.desfecho && fc.desfecho.includes(f.desfecho))) return false;
      if (fc.etapaMin !== undefined && (!f || f.etapa < fc.etapaMin)) return false;
      if (fc.etapaMax !== undefined && f && f.etapa > fc.etapaMax) return false;
    }
  }
  if (c.diretor) {
    const d = v.diretor;
    if (c.diretor.capitulo && !c.diretor.capitulo.includes(d.capitulo)) return false;
    if (c.diretor.fase && !c.diretor.fase.includes(d.fase)) return false;
    if (c.diretor.tensaoMin !== undefined && d.tensao < c.diretor.tensaoMin) return false;
    if (c.diretor.tensaoMax !== undefined && d.tensao > c.diretor.tensaoMax) return false;
    if (c.diretor.contador && !c.diretor.contador.includes(d.contador)) return false;
  }
  if (c.ambicao) {
    const a = v.ambicao;
    if (c.ambicao.sem !== undefined && !a.atual !== c.ambicao.sem) return false;
    if (c.ambicao.atual && !(a.atual && c.ambicao.atual.includes(a.atual.id))) return false;
    if (c.ambicao.inclinacaoMin && (a.inclinacoes[c.ambicao.inclinacaoMin[0]] ?? 0) < (c.ambicao.inclinacaoMin[1] || a.limiar)) return false;
    if (c.ambicao.dominante && dominante(a, undefined) !== c.ambicao.dominante) return false;
    if (c.ambicao.trocaPossivel) {
      if (!a.atual) return false;
      const d = dominante(a, a.atual.id);
      if (!d || (a.inclinacoes[d] ?? 0) < Math.max(a.limiar, (a.inclinacoes[a.atual.id] ?? 0) + 4)) return false;
    }
    if (c.ambicao.etapaMin !== undefined && (a.atual?.etapa ?? -1) < c.ambicao.etapaMin) return false;
    if (c.ambicao.etapaMax !== undefined && (a.atual?.etapa ?? 99) > c.ambicao.etapaMax) return false;
  }
  if (c.vezes) { const n = v.vistos[moldeAtual] ?? 0; if (c.vezes[0] !== undefined && n < c.vezes[0]) return false; if (c.vezes[1] !== undefined && n > c.vezes[1]) return false; }
  if (c.q) for (const [k, [mn, mx]] of Object.entries(c.q)) { const x = v.q[k] ?? 0; if (mn !== undefined && x < mn) return false; if (mx !== undefined && x > mx) return false; }
  if (c.ferida && !c.ferida.includes(v.mundo.ferida.tipo)) return false;
  if (c.todos && !c.todos.every((x) => condOk(s, x, lig))) return false;
  if (c.algum && !c.algum.some((x) => condOk(s, x, lig))) return false;
  if (c.nao && condOk(s, c.nao, lig)) return false;
  return true;
}

/* ---------- Ligação dos papéis às entidades do mundo ---------- */
export function ligarPapeis(s: State, m: Molde, rng: Rng): Ligacoes | null {
  const v = s.v2!, mundo = v.mundo;
  const lig: Ligacoes = {};
  const usados: Id[] = [];
  const ano = Math.floor(s.age);
  for (const [r, def] of Object.entries(m.papeis ?? {})) {
    const d = def as PapelDef;
    if (d.pessoa) {
      const f = d.pessoa;
      if (f.novo && f.criar) { lig[r] = { tipo: 'pessoa', pessoa: criarSolta(mundo, rng, ano, s.tier, f.criar), criar: true }; continue; }
      const achou = procurarPessoa(mundo, f, { ano, reinoJog: s.tier, idadeJog: ano, excluir: usados }, rng);
      if (achou?.ativa) { lig[r] = { tipo: 'pessoa', pessoa: achou.ativa }; usados.push(achou.ativa.id); continue; }
      if (achou?.reserva) {
        const c = achou.reserva;
        const sp = c.sp;
        lig[r] = { tipo: 'pessoa', reserva: c, pessoa: { id: sp.id, nome: sp.nome, nasc: sp.nasc, reino: c.reino, xp: 0, ritmo: sp.ritmo, teto: sp.teto, trilha: sp.trilha, tracos: sp.tracos, objetivo: { tipo: 'subir' }, papeis: [], opiniao: 0, memoria: [], vivo: true } };
        usados.push(sp.id);
        continue;
      }
      if (f.criar) {
        const p = criarSolta(mundo, rng, ano, s.tier, f.criar);
        lig[r] = { tipo: 'pessoa', pessoa: p, criar: true };
        continue;
      }
      if (d.opcional) continue;
      return null;
    }
    if (d.faccao) {
      const f = d.faccao;
      let alvo: Faccao | undefined;
      if (f.de) { const l = lig[f.de]; const fid = l?.tipo === 'pessoa' ? l.pessoa.faccao : undefined; alvo = fid ? mundo.faccoes[fid] : undefined; }
      else if (f.inimigoDe) {
        const l = lig[f.inimigoDe];
        const base = l?.tipo === 'faccao' ? l.faccao : l?.tipo === 'pessoa' && l.pessoa.faccao ? mundo.faccoes[l.pessoa.faccao] : undefined;
        const lista = (base?.inimigos ?? []).map((id) => mundo.faccoes[id]).filter((x) => x && x.estado !== 'extinta');
        alvo = lista.length ? rng.pick(lista) : undefined;
      }
      else if (f.ferida) alvo = mundo.faccoes[mundo.ferida.faccao];
      else if (f.jogador) alvo = faccaoDoJogador(s);
      else if (f.local) alvo = Object.values(mundo.faccoes).find((x) => x.tipo === 'seita' && x.nome === s.names.seita);
      else {
        const lista = Object.values(mundo.faccoes).filter((x) => x.estado !== 'extinta' && (!f.tipo || f.tipo.includes(x.tipo)) && (!f.estado || f.estado.includes(x.estado)));
        alvo = lista.length ? rng.weighted(lista, (x) => 1 + x.forca / 25) : undefined;
      }
      if (alvo && alvo.estado !== 'extinta' || (alvo && f.estado?.includes('extinta'))) { lig[r] = { tipo: 'faccao', faccao: alvo }; continue; }
      if (d.opcional) continue;
      return null;
    }
    if (d.lugar) {
      const f = d.lugar;
      let lista = Object.values(mundo.lugares);
      if (f.natal) lista = lista.filter((l) => l.tipo === 'vila');
      if (f.dono) { const l = lig[f.dono]; const fid = l?.tipo === 'faccao' ? l.faccao.id : l?.tipo === 'pessoa' ? l.pessoa.faccao : undefined; lista = lista.filter((x) => x.dono === fid); }
      if (f.tipo) lista = lista.filter((l) => f.tipo!.includes(l.tipo));
      if (f.segredo) lista = lista.filter((l) => l.segredos.length > 0);
      if (lista.length) { lig[r] = { tipo: 'lugar', lugar: rng.pick(lista) }; continue; }
      if (d.opcional) continue;
      return null;
    }
  }
  return lig;
}

/** Concretiza a ligação (promove pessoas da reserva) e devolve os ids. */
export function efetivarLigacao(s: State, lig: Ligacoes, papeisMolde: Record<Papel, PapelDef> | undefined, rng: Rng): Record<Papel, Id> {
  const mundo = s.v2!.mundo, ano = Math.floor(s.age);
  const bind: Record<Papel, Id> = {};
  for (const [r, l] of Object.entries(lig)) {
    if (l.tipo === 'pessoa') {
      let p = l.pessoa;
      if (l.reserva) p = promover(mundo, l.reserva, ano, rng, []);
      else if (l.criar) p = inserirPessoa(mundo, p);
      if (p.papeis.length && ['rival', 'mestre', 'amigo', 'discipulo', 'inimigo', 'noivo'].includes(r) && p.papeis.includes(r)) s.names[r] = p.nome;
      void papeisMolde;
      p.ultima = ano;
      bind[r] = p.id;
    } else if (l.tipo === 'faccao') bind[r] = l.faccao.id;
    else bind[r] = l.lugar.id;
  }
  return bind;
}

/* ---------- Texto ---------- */
/** Marcadores de gênero: {rival.ele}, {mestre.o}, {jogador.moco}... (a primeira letra maiúscula capitaliza). */
const GEN: Record<string, [string, string]> = {
  ele: ['ele', 'ela'], dele: ['dele', 'dela'], nele: ['nele', 'nela'], o: ['o', 'a'], um: ['um', 'uma'], este: ['este', 'esta'], mesmo: ['mesmo', 'mesma'],
  moco: ['moço', 'moça'], homem: ['homem', 'mulher'], velho: ['velho', 'velha'], lo: ['lo', 'la'], senhor: ['senhor', 'senhora'], irmao: ['irmão', 'irmã'], jovem: ['rapaz', 'moça'], filho: ['filho', 'filha'],
};
export function generoCampo(nome: string, campo: string): string | null {
  const baixo = campo[0].toLowerCase() + campo.slice(1);
  const par = GEN[baixo];
  if (!par) return null;
  const t = par[generoDoNome(nome) === 'f' ? 1 : 0];
  return campo[0] !== baixo[0] ? t[0].toUpperCase() + t.slice(1) : t;
}
export function preencher(s: State, bind: Record<Papel, Id>, texto: string): string {
  const mundo = s.v2!.mundo;
  const jaVisto = (s.v2!.vistos[moldeAtual] ?? 0) + (s.v2!.vistos[moldeAtual + '#c'] ?? 0) >= 1;
  texto = texto.replace(/\{vez([12]):((?:[^{}]|\{[^{}]*\})*)\}/g, (_, k: string, c: string) => ((k === '2') === jaVisto ? c : ''));
  const t = texto.replace(/\{([a-z_]+)\.([a-zA-Z]+)\}/g, (_, r: string, campo: string) => {
    if (r === 'mundo') return noticiaDoMundo(s, campo);
    if (r === 'familia') return familiaCampo(s, campo);
    if (r === 'jogador') return generoCampo(s.name, campo) ?? (campo === 'reino' ? realmOf(s).name : campo === 'nome' ? s.name : '');
    const id = bind[r];
    if (!id) return campo === 'nome' ? 'alguém' : campo.toLowerCase() === 'trato' ? (campo[0] === 'T' ? 'Você' : 'você') : generoCampo('Lin Hao', campo) ?? '';
    const p = mundo.pessoas[id], f = mundo.faccoes[id], l = mundo.lugares[id];
    if (p) {
      const g = generoCampo(p.nome, campo); if (g !== null) return g;
      if (campo === 'nome') return p.nome;
      if (campo.toLowerCase() === 'trato') { const t = trato(p, s.tier, s.fama, s.name); return campo[0] === 'T' ? t[0].toUpperCase() + t.slice(1) : t; }
      if (campo === 'reino') return nomeDoReino(p.trilha, p.reino);
      if (campo === 'faccao') return p.faccao ? mundo.faccoes[p.faccao]?.nome ?? 'sua seita' : 'sua gente';
      if (campo === 'idade') return String(Math.floor(s.age) - p.nasc);
      if (campo === 'causa') return p.morte?.causa ?? 'o tempo';
      return '';
    }
    if (f) return campo === 'nome' ? f.nome : '';
    if (l) return campo === 'nome' ? l.nome : '';
    return '';
  });
  return concordar(fill(s, t)
    .replace(/\{jogador\.reino\}/g, realmOf(s).name)
    .replace(/\{ferida\.culpado\}/g, mundo.pessoas[mundo.ferida.culpado]?.nome ?? 'o culpado')
    .replace(/\{ferida\.faccao\}/g, mundo.faccoes[mundo.ferida.faccao]?.nome ?? 'a facção'));
}

/** {familia.vitima} (o seu pai), {familia.dovitima}, {familia.aovitima}, {familia.tutor}, {familia.dotutor}, {familia.aotutor}, {familia.casa}; Maiúscula no começo. */
function familiaCampo(s: State, campo: string): string {
  const f = s.v2!.mundo.familia ?? { vitima: ['o seu pai', 'do seu pai', 'ao seu pai'], casa: 'a casa da família', tutor: ['o seu tio', 'do seu tio', 'ao seu tio'] };
  const k = campo.toLowerCase();
  const t = k === 'vitima' ? f.vitima[0] : k === 'dovitima' ? f.vitima[1] : k === 'aovitima' ? f.vitima[2] : k === 'tutor' ? f.tutor[0] : k === 'dotutor' ? f.tutor[1] : k === 'aotutor' ? f.tutor[2] : k === 'casa' ? f.casa : '';
  return campo[0] === campo[0].toUpperCase() ? t[0].toUpperCase() + t.slice(1) : t;
}

/** Uma novidade recente do mundo (do registro), ou uma frase neutra se nada aconteceu: serve a respiros e boatos. */
function noticiaDoMundo(s: State, campo: string): string {
  const m = s.v2!.mundo, ano = Math.floor(s.age);
  if (campo === 'faccao') { const f = Object.values(m.faccoes).filter((x) => x.estado !== 'extinta'); return f.length ? f[(s.turn * 7 + ano) % f.length].nome : 'uma seita distante'; }
  const recentes = m.log.filter((l) => l.ano > ano - 25 && l.ano >= 0);
  if (!recentes.length) return 'que nada de importante mudou nas últimas estações';
  const l = recentes[(s.turn * 5 + ano) % recentes.length];
  return l.texto.replace(/\.$/, '');
}

/** Nomes próprios masculinos (Templo, Pavilhão, Culto...) pedem o/do/no/ao: troca o artigo escrito no feminino. */
const MASC = 'Templo|Pavilhão|Culto|Império|Clã|Pátio|Portão|Mercado|Pico|Desfiladeiro|Porto|Salão|Vale';
const TROCA: Record<string, string> = { de: 'do', De: 'Do', a: 'o', A: 'O', da: 'do', Da: 'Do', na: 'no', Na: 'No', 'à': 'ao', 'À': 'Ao', pela: 'pelo', Pela: 'Pelo' };
export function concordar(t: string): string {
  return t
    .replace(/toda o/g, 'todo o').replace(/Toda o/g, 'Todo o')
    .replace(new RegExp(`(^|[^\\p{L}])(a|A|de|De|da|Da|na|Na|à|À|pela|Pela)(\\s+)(?=(?:${MASC})(?![\\p{L}]))`, 'gu'), (_, pre: string, art: string, sp: string) => `${pre}${TROCA[art]}${sp}`)
    .replace(/(^|[^\p{L}])(a|A|da|Da|na|Na)(\s+)(?=Ruínas(?![\p{L}]))/gu, (_, pre: string, art: string, sp: string) => `${pre}${{ a: 'as', A: 'As', da: 'das', Da: 'Das', na: 'nas', Na: 'Nas' }[art]}${sp}`).replace(/toda o /g, 'todo o ').replace(/Toda o /g, 'Todo o ');
}

/* ---------- Instanciação: molde + papéis → evento jogável ---------- */
const STAT_PADRAO: Record<string, StatKey[]> = {
  combate: ['fis', 'dao'], veneno: ['comp', 'sor'], formacao: ['comp', 'esp'], alquimia: ['comp', 'sor'], social: ['car', 'comp'], mente: ['esp', 'comp'], espada: ['fis', 'dao'], corpo: ['fis'], qi: ['esp', 'comp'], fuga: ['sor', 'esp'],
};
function ligDeBind(s: State, bind: Record<Papel, Id>): Ligacoes {
  const mundo = s.v2!.mundo;
  const lig: Ligacoes = {};
  for (const [r, id] of Object.entries(bind)) {
    if (mundo.pessoas[id]) lig[r] = { tipo: 'pessoa', pessoa: mundo.pessoas[id] };
    else if (mundo.faccoes[id]) lig[r] = { tipo: 'faccao', faccao: mundo.faccoes[id] };
    else if (mundo.lugares[id]) lig[r] = { tipo: 'lugar', lugar: mundo.lugares[id] };
  }
  return lig;
}
function variante(s: State, vs: Variante[] | string, lig: Ligacoes): string {
  if (typeof vs === 'string') return vs;
  const ok = vs.filter((x) => condOk(s, x.se, lig));
  if (!ok.length) return vs[vs.length - 1]?.texto ?? '';
  const tom = tomDoContador(s.v2!.diretor.contador);
  const esp = ok.filter((x) => x.se);
  const espTom = esp.filter((x) => x.tom === tom);
  if (espTom.length) return espTom[0].texto;
  const espSem = esp.filter((x) => !x.tom);
  if (espSem.length) return espSem[0].texto;
  const soTom = ok.filter((x) => !x.se && x.tom === tom);
  if (soTom.length) return soTom[0].texto;
  return (ok.find((x) => !x.se && !x.tom) ?? ok[0]).texto;
}
export function tomDoContador(c: string): 'lirico' | 'sombrio' | 'ironico' | 'grave' {
  return c === 'serena' ? 'lirico' : c === 'sombria' ? 'sombrio' : c === 'trapaceiro' ? 'ironico' : 'grave';
}

function resParaOutcome(s: State, bind: Record<Papel, Id>, r: Res | undefined, lig: Ligacoes): Outcome | undefined {
  if (!r) return undefined;
  const fx = { ...(r.fx ?? {}) } as Outcome['fx'] & { mundo?: EfeitoMundo[] };
  if (r.efeitos?.length) fx.mundo = r.efeitos;
  const texto = r.se?.find((x) => condOk(s, x.se, lig))?.texto ?? r.texto;
  return { text: preencher(s, bind, texto), alt: r.alt?.map((a) => preencher(s, bind, a)), fx };
}

export function instanciar(s: State, molde: Molde, bind: Record<Papel, Id>): GameEvent {
  usarMolde(molde.id);
  const lig = ligDeBind(s, bind);
  const choices: Choice[] = [];
  for (const o of molde.opcoes as Opcao[]) {
    const ok = condOk(s, o.requer, lig);
    if (!ok && !o.seloBloqueio) continue;
    const c: Choice = { text: preencher(s, bind, o.texto) };
    if (o.selo) c.selo = o.selo;
    if (!ok) { c.bloq = o.seloBloqueio; choices.push(c); continue; }
    if (o.custo) c.custo = o.custo;
    if (o.teste) {
      const t = o.teste;
      const stat = t.stat ?? STAT_PADRAO[t.tag ?? ''] ?? ['sor'];
      const check: Check = { stat, tag: t.tag, dif: t.dif };
      if (typeof t.ameaca === 'number') check.amea = t.ameaca;
      else if (typeof t.ameaca === 'string') { const l = lig[t.ameaca]; if (l?.tipo === 'pessoa') check.amea = l.pessoa.reino; }
      c.check = check;
      c.ok = resParaOutcome(s, bind, o.sucesso, lig);
      c.fail = resParaOutcome(s, bind, o.falha, lig);
    } else c.res = resParaOutcome(s, bind, o.res ?? o.sucesso, lig);
    choices.push(c);
  }
  if (!choices.length) choices.push({ text: 'Seguir em frente.', res: { text: 'Você deixa o momento passar.' } });
  return {
    id: `m:${molde.id}`, title: preencher(s, bind, molde.titulo), text: preencher(s, bind, variante(s, molde.cena, lig)),
    rarity: molde.tipo === 'climax' ? 'lendario' : molde.tipo === 'respiro' ? 'comum' : 'raro', choices,
    combate: molde.combate, escala: true, amea: undefined,
  };
}

const CACHE = new WeakMap<object, GameEvent>();
/** O evento jogável da cena atual (instanciado uma vez por turno; reconstruído sozinho depois de carregar um save). */
export function eventoV2(s: State): GameEvent {
  const cur = s.current!;
  let ev = CACHE.get(cur);
  if (!ev) { ev = instanciar(s, MOLDE[cur.v2!.molde], cur.v2!.bind); CACHE.set(cur, ev); }
  return ev;
}

/* ---------- Efeitos de mundo ---------- */
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
function pessoaDe(s: State, bind: Record<Papel, Id>, r: Papel): Pessoa | undefined { const id = bind[r]; return id ? s.v2!.mundo.pessoas[id] : undefined; }
function faccaoDe(s: State, bind: Record<Papel, Id>, r: Papel): Faccao | undefined {
  const mundo = s.v2!.mundo, id = bind[r];
  if (!id) return undefined;
  if (mundo.faccoes[id]) return mundo.faccoes[id];
  const p = mundo.pessoas[id];
  return p?.faccao ? mundo.faccoes[p.faccao] : undefined;
}
export function logV2(s: State, texto: string) { s.log.push({ age: Math.floor(s.age), text: texto }); }

export function aplicarEfeitosMundo(s: State, efs: EfeitoMundo[], bind: Record<Papel, Id>, rng: Rng) {
  const v = s.v2!, mundo = v.mundo, ano = Math.floor(s.age);
  // a cena que abre um fio o abre antes dos efeitos (uma opção pode fechá-lo na mesma hora)
  const mol = s.current?.v2 ? MOLDE[s.current.v2.molde] : undefined;
  if (mol?.fio?.abre && !mundo.fios.some((x) => x.id === mol.fio!.id)) aplicarFio(s, mol.fio.id, 'abrir', bind, ano);
  for (const e of efs) {
    if ('opiniao' in e) {
      const p = pessoaDe(s, bind, e.opiniao[0]); if (!p) continue;
      let n = e.opiniao[1];
      if (n < 0 && p.tracos.includes('orgulhoso')) n *= 1.4;
      if (n < 0 && p.tracos.includes('rancoroso')) n *= 1.3;
      if (n > 0 && p.tracos.includes('leal')) n *= 1.3;
      p.opiniao = clamp(p.opiniao + n, -100, 100);
      p.importante = true;
    } else if ('fato' in e) {
      const p = pessoaDe(s, bind, e.fato[0]); if (!p) continue;
      registrarFato(p, { ano, tipo: e.fato[1], peso: e.fato[2] });
      p.importante = true;
    } else if ('reputacao' in e) {
      const f = faccaoDe(s, bind, e.reputacao[0]); if (f) f.reputacao = clamp(f.reputacao + e.reputacao[1], -100, 100);
    } else if ('objetivo' in e) {
      const p = pessoaDe(s, bind, e.objetivo[0]); if (!p) continue;
      const alvo = e.objetivo[2] ? bind[e.objetivo[2]] : 'jogador';
      p.objetivo = { tipo: e.objetivo[1], alvo };
    } else if ('morte' in e) {
      const p = pessoaDe(s, bind, e.morte); if (!p || !p.vivo) continue;
      p.vivo = false; p.morte = { ano, causa: e.causa ?? 'um golpe' };
      mundo.log.push({ ano, texto: fraseMorte(p.nome, p.morte.causa) });
      if (p.importante || p.papeis.length) v.diretor.mortes.push(p.id);
    } else if ('ferir' in e) {
      const p = pessoaDe(s, bind, e.ferir); if (p) p.ritmo *= 0.92;
    } else if ('papel' in e) {
      const p = pessoaDe(s, bind, e.papel[0]); if (p && !p.papeis.includes(e.papel[1])) { p.papeis.push(e.papel[1]); if (['rival', 'mestre', 'amigo', 'discipulo', 'inimigo', 'noivo'].includes(e.papel[1])) s.names[e.papel[1]] = p.nome; }
    } else if ('semPapel' in e) {
      const p = pessoaDe(s, bind, e.semPapel[0]); if (p) p.papeis = p.papeis.filter((x) => x !== e.semPapel[1]);
    } else if ('faccao' in e) {
      const f = faccaoDe(s, bind, e.faccao[0]); if (f) f.estado = e.faccao[1];
    } else if ('levarFaccao' in e) {
      const p = pessoaDe(s, bind, e.levarFaccao[0]); const f = faccaoDe(s, bind, e.levarFaccao[1]); if (p && f) p.faccao = f.id;
    } else if ('fio' in e) {
      aplicarFio(s, e.fio[0], e.fio[1], bind, ano);
    } else if ('ambicao' in e) {
      nomearAmbicao(s, e.ambicao, ano);
    } else if ('inclinar' in e) {
      const a = v.ambicao; a.inclinacoes[e.inclinar[0]] = (a.inclinacoes[e.inclinar[0]] ?? 0) + e.inclinar[1];
    } else if ('noticia' in e) {
      v.diretor.noticias.push(preencher(s, bind, e.noticia));
    } else if ('q' in e) {
      v.q[e.q[0]] = (v.q[e.q[0]] ?? 0) + e.q[1];
    } else if ('forca' in e) {
      const f = faccaoDe(s, bind, e.forca[0]); if (f) f.forca = clamp(f.forca + e.forca[1], 0, 100);
    } else if ('lugar' in e) {
      const id = bind[e.lugar[0]]; const l = id ? mundo.lugares[id] : undefined;
      if (l) { if (e.lugar[1].perigo) l.perigo = clamp(l.perigo + e.lugar[1].perigo, 0, 5); if (e.lugar[1].dono) l.dono = bind[e.lugar[1].dono]; }
    } else if ('reino' in e) {
      const p = pessoaDe(s, bind, e.reino[0]); if (p) p.reino = clamp(p.reino + e.reino[1], 0, 8);
    } else if ('situacao' in e) {
      const p = pessoaDe(s, bind, e.situacao[0]); if (!p) continue;
      p.situacao = e.situacao[1];
      if (['expulso', 'foragido', 'partiu'].includes(e.situacao[1])) { p.faccao = undefined; p.ritmo *= 0.9; }
      if (e.situacao[1] === 'caido') p.ritmo *= 0.85;
      if (e.situacao[1] === 'vingativo') p.objetivo = { tipo: 'vingar', alvo: 'jogador' };
      mundo.log.push({ ano, texto: `${p.nome} ${({ expulso: 'foi expulso da seita', caido: 'caiu em desgraça', foragido: 'fugiu e virou foragido', vingativo: 'jurou vingança', preso: 'foi preso', partiu: 'partiu sem se despedir' } as Record<string, string>)[e.situacao[1]] ?? 'mudou de situação'}.` });
    } else if ('trilhaDe' in e) {
      const p = pessoaDe(s, bind, e.trilhaDe); if (p?.trilha && !s.path) trilhaPeloMestre(s, p.trilha);
    } else if ('reducaoTensao' in e) {
      v.diretor.tensao = clamp(v.diretor.tensao - e.reducaoTensao, 0, 1);
    }
  }
  void rng;
}

function aplicarFio(s: State, id: string, acao: string, bind: Record<Papel, Id>, ano: number) {
  const m = s.v2!.mundo;
  let f: Fio | undefined = m.fios.find((x) => x.id === id);
  if (acao === 'abrir') {
    if (f && f.estado === 'aberto') { f.ultimo = ano; return; }
    f = { id, tipo: id, papeis: { ...bind }, aberto: ano, ultimo: ano, etapa: 1, prazo: 14, estado: 'aberto' };
    m.fios = m.fios.filter((x) => x.id !== id);
    m.fios.push(f);
    return;
  }
  if (!f) return;
  f.ultimo = ano;
  if (acao === 'avancar') { f.etapa++; f.papeis = { ...f.papeis, ...bind }; }
  else if (acao.startsWith('fechar:')) { if (f.estado === 'aberto') { f.estado = 'resolvido'; f.desfecho = acao.slice(7); } }
  else if (acao.startsWith('abandonar:')) { f.estado = 'abandonado'; f.desfecho = acao.slice(10); }
}

export const AMBICOES: Record<string, { nome: string; frase: string }> = {
  reerguer_cla: { nome: 'Reerguer o nome do clã', frase: 'reerguer o nome do clã' },
  vingar_cla: { nome: 'Vingar o clã', frase: 'fazer o culpado pagar' },
  superar_rival: { nome: 'Superar o rival', frase: 'superar quem sempre esteve um passo à frente' },
  ascender_seita: { nome: 'Ascender na seita', frase: 'chegar ao topo da seita' },
  proteger: { nome: 'Proteger quem ficou', frase: 'proteger quem depende de você' },
};
function trilhaPeloMestre(s: State, id: string) { applyFx(s, { trilha: id }, new Rng(s.seed ^ 0x77)); }
export function nomearAmbicao(s: State, spec: string, ano: number) {
  const a = s.v2!.ambicao;
  if (spec === 'adiar') { a.limiar += 4; return; }
  if (spec === 'etapa') { if (a.atual) a.atual.etapa++; return; }
  if (spec === 'cumprida' || spec === 'abandonada') {
    if (a.atual) { a.historico.push({ id: a.atual.id, desde: a.atual.desde, ate: ano, desfecho: spec }); a.inclinacoes[a.atual.id] = 0; a.atual = undefined; a.limiar = Math.max(a.limiar, 10); }
    return;
  }
  let id = spec.replace(/^nomear:|^trocar:/, '');
  if (id === 'auto') id = dominante(a, a.atual?.id) ?? 'proteger';
  if (a.atual && a.atual.id === id) return;
  if (a.atual) a.historico.push({ id: a.atual.id, desde: a.atual.desde, ate: ano, desfecho: spec.startsWith('trocar') ? 'trocada' : 'substituida' });
  a.atual = { id, desde: ano, etapa: 1, motivo: AMBICOES[id]?.frase ?? id };
  s.log.push({ age: ano, text: `Ambição: ${AMBICOES[id]?.nome ?? id}.` });
}
export { MOLDES };
