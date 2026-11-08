import { Rng } from '../rng';
import { endLife } from '../engine';
import type { State } from '../../types';
import { MOLDES } from '../../data/modos/xianxia/v2';
import { avancarMundo, criarMundo, criarSolta, inserirPessoa } from './mundo';
import { aplicarEfeitosMundo, concordar, condOk, efetivarLigacao, faccaoDoJogador, ligarPapeis, nomearAmbicao, usarMolde, type Ligacoes } from './moldes';
import type { Ambicao, Capitulo, ContadorId, Diretor, Fase, Molde, Tipo, V2State } from './tipos';

export const CAPITULO_NOME: Record<Capitulo, string> = { infancia: 'Infância', despertar: 'O Despertar', entrada: 'Entrada no Mundo', ascensao: 'Ascensão', crise: 'Crise', legado: 'Legado' };
export const CAPITULO_PERGUNTA: Record<Capitulo, string> = {
  infancia: 'Quem você é e a que se agarra?', despertar: 'Que caminho escolhe você, e quem o vê?', entrada: 'A quem deve lealdade?',
  ascensao: 'O que está disposto a pagar para subir?', crise: 'O que se perde quando o passado cobra?', legado: 'O que você deixa, e para quem?',
};
const ORDEM: Capitulo[] = ['infancia', 'despertar', 'entrada', 'ascensao', 'crise', 'legado'];
export const CONTADOR_NOME: Record<ContadorId, string> = { serena: 'a Cronista Serena', sombria: 'a Voz Sombria', trapaceiro: 'o Trapaceiro', mestre: 'o Velho Mestre' };
const CONTADOR_PELO: Record<ContadorId, string> = { serena: 'pela Cronista Serena', sombria: 'pela Voz Sombria', trapaceiro: 'pelo Trapaceiro', mestre: 'pelo Velho Mestre' };
const ALVO_TENSAO: Record<Capitulo, number> = { infancia: 0.2, despertar: 0.3, entrada: 0.4, ascensao: 0.55, crise: 0.85, legado: 0.35 };
const AJUSTE_ALVO: Record<ContadorId, number> = { serena: -0.1, sombria: 0.15, trapaceiro: 0, mestre: -0.03 };

/** Quanto cada fase aceita cada tipo de cena agora. */
const RITMO: Record<Fase, Record<Tipo, number>> = {
  calmaria: { respiro: 1.5, personagem: 1.1, preparo: 0.9, virada: 1.1, perigo: 0.2, climax: 0, consequencia: 0.8 },
  preparo: { respiro: 0.5, personagem: 1.0, preparo: 1.6, virada: 1.0, perigo: 0.6, climax: 0.05, consequencia: 0.5 },
  perigo: { respiro: 0.1, personagem: 0.6, preparo: 0.4, virada: 0.8, perigo: 1.7, climax: 0.7, consequencia: 0.2 },
  climax: { respiro: 0.05, personagem: 0.2, preparo: 0.1, virada: 0.3, perigo: 0.5, climax: 2.0, consequencia: 0.2 },
  consequencia: { respiro: 0.8, personagem: 1.0, preparo: 0.3, virada: 1.2, perigo: 0.1, climax: 0, consequencia: 2.0 },
};
const MULT_CONTADOR: Record<ContadorId, Partial<Record<Tipo, number>>> = {
  serena: { consequencia: 1.3, respiro: 1.2, perigo: 0.8 },
  sombria: { perigo: 1.3, climax: 1.2, respiro: 0.8 },
  trapaceiro: { personagem: 1.2, virada: 1.3 },
  mestre: { preparo: 1.4, perigo: 0.9 },
};
const DELTA_TENSAO: Record<Tipo, number> = { respiro: -0.08, preparo: 0.06, perigo: 0.12, climax: 0.2, consequencia: -0.2, personagem: 0, virada: 0 };

/* ---------- Início da vida ---------- */
export function iniciarV2(s: State, rng: Rng): V2State {
  const { mundo, rival, amigo } = criarMundo({ semente: (rng.seed ^ 0x5bd1e995) >>> 0, origem: s.origin, nomeVila: s.names.vila, nomeSeita: s.names.seita, nomeCla: s.names.cla, idade: 6 }, s.name);
  s.names.rival = rival.nome;
  s.names.amigo = amigo.nome;
  const inc: Record<string, number> = { reerguer_cla: 0, vingar_cla: 0, superar_rival: 2, ascender_seita: s.faction === 'seita' ? 2 : 0, proteger: 0 };
  const f = mundo.ferida.tipo;
  if (f === 'divida') { inc.reerguer_cla += 3; inc.vingar_cla += 1; }
  else if (f === 'terra') { inc.vingar_cla += 3; inc.reerguer_cla += 1; }
  else if (f === 'desonra') { inc.reerguer_cla += 2; inc.vingar_cla += 2; }
  else { inc.vingar_cla += 3; inc.reerguer_cla += 1; }
  const ambicao: Ambicao = { inclinacoes: inc, historico: [], limiar: 6 };
  const diretor: Diretor = { capitulo: 'infancia', fase: 'calmaria', tensao: 0.1, contadorBase: 'auto', contador: 'serena', capDesde: 6, cenasNaFase: 0, ultimos: [], noticias: [], mortes: [] };
  const v: V2State = { mundo, diretor, ambicao, q: {}, vistos: {}, quando: {}, anoMundo: 6 };
  diretor.contador = escolherContador(v, rng);
  diretor.cartao = cartao('infancia', diretor.contador);
  return v;
}
const cartao = (cap: Capitulo, c: ContadorId) => `Capítulo ${ORDEM.indexOf(cap) + 1}: ${CAPITULO_NOME[cap]}, contado ${CONTADOR_PELO[c]}. ${CAPITULO_PERGUNTA[cap]}`;

/* ---------- Contadores de histórias (oscilam por capítulo) ---------- */
function escolherContador(v: V2State, rng: Rng): ContadorId {
  const d = v.diretor;
  const perdas = v.q.perdas ?? 0;
  const w: Record<ContadorId, number> = { serena: 1 + perdas * 0.8, sombria: 1 + (d.tensao < 0.25 ? 1 : 0), trapaceiro: 1 + (d.ultimos.slice(-3).every((x) => x === d.ultimos[d.ultimos.length - 1]) && d.ultimos.length >= 3 ? 1.2 : 0), mestre: 1 + (d.capitulo === 'despertar' || d.capitulo === 'entrada' ? 1.2 : 0) };
  if (d.contadorBase !== 'auto') w[d.contadorBase] += 2.5;
  const ids = Object.keys(w) as ContadorId[];
  return rng.weighted(ids, (c) => w[c] * (c === d.contador ? 0.7 : 1));
}

/* ---------- Capítulos ---------- */
function capituloAtual(s: State): Capitulo {
  const v = s.v2!, a = v.ambicao;
  const cur = v.diretor.capitulo;
  const i = ORDEM.indexOf(cur);
  let alvo = i;
  if (i === 0 && (s.tier >= 1 || s.age >= 15)) alvo = 1;
  if (alvo === 1 && s.path && s.tier >= 1) alvo = 2;
  if (alvo === 2 && s.tier >= 2) alvo = 3;
  if (alvo === 3 && (s.tier >= 5 || (a.atual && a.atual.etapa >= 4))) alvo = 4;
  if (alvo === 4 && (s.tier >= 7 || s.age >= s.maxAge * 0.82)) alvo = 5;
  if (s.age >= s.maxAge * 0.88 && s.tier >= 2) alvo = Math.max(alvo, 5);
  return ORDEM[Math.max(i, alvo)];
}
function atualizarCapitulo(s: State, rng: Rng) {
  const v = s.v2!, d = v.diretor;
  const novo = capituloAtual(s);
  if (novo === d.capitulo) return;
  d.capitulo = novo; d.capDesde = s.age;
  d.contador = escolherContador(v, rng);
  d.cartao = cartao(novo, d.contador);
  // fios maduros que ninguém tocou terminam como esquecidos (o mundo seguiu em frente)
  for (const f of v.mundo.fios) {
    if (f.estado === 'aberto' && s.age - f.ultimo > f.prazo * 1.6) { f.estado = 'abandonado'; f.desfecho = 'esquecido';
      for (const id of Object.values(f.papeis)) {
        const p = v.mundo.pessoas[id];
        if (p && p.vivo && p.importante && !p.situacao) { p.situacao = 'partiu'; v.diretor.noticias.push(concordar(`${p.nome} seguiu outro caminho, e o fio entre vocês se soltou.`)); v.mundo.log.push({ ano: Math.floor(s.age), texto: `${p.nome} seguiu outro caminho.` }); }
      }
      s.log.push({ age: Math.floor(s.age), text: `O fio de ${f.tipo} ficou sem resposta e se perdeu.` }); }
  }
}

/* ---------- Relevância ---------- */
function relevancia(s: State, m: Molde, lig: Ligacoes): number {
  const v = s.v2!, d = v.diretor, ano = Math.floor(s.age);
  let soma = 10;
  for (const t of m.relevancia ?? []) if (condOk(s, t.se, lig)) soma += t.mais;
  for (const l of Object.values(lig)) {
    if (l.tipo !== 'pessoa' || l.reserva || l.criar) continue;
    const p = l.pessoa;
    soma += (Math.abs(p.opiniao) / 100) * 15 + Math.min(20, (ano - (p.ultima ?? ano)) * 2) + (p.importante ? 5 : 0);
    if (p.objetivo.alvo === 'jogador' && ['vingar', 'cacar', 'superar', 'expor'].includes(p.objetivo.tipo)) soma += 25;
  }
  if (m.fio) {
    const f = v.mundo.fios.find((x) => x.id === m.fio!.id);
    if (f && f.estado === 'aberto') {
      soma += 30;
      const atraso = ano - f.ultimo - f.prazo;
      if (atraso > 0) soma += Math.min(40, atraso * 10);
    }
  }
  if (v.ambicao.atual && (m.relevancia ?? []).some((t) => t.se.ambicao?.atual)) soma += 5;
  const ritmo = (m.id.startsWith('morte_') ? 3 : RITMO[d.fase][m.tipo]) * (MULT_CONTADOR[d.contador][m.tipo] ?? 1);
  const descanso = m.unico ? 1 : Math.pow(0.35, v.vistos[m.id] ?? 0);
  return ritmo * soma * descanso;
}

/* ---------- Escolha da próxima cena ---------- */
const PROXIMA_FASE: Record<Fase, Fase> = { calmaria: 'preparo', preparo: 'perigo', perigo: 'climax', climax: 'consequencia', consequencia: 'calmaria' };

function candidatas(s: State, rng: Rng): { m: Molde; lig: Ligacoes; R: number; serve: number }[] {
  const v = s.v2!;
  const ano = Math.floor(s.age);
  const cands: { m: Molde; lig: Ligacoes; R: number; serve: number }[] = [];
  for (const m of MOLDES) {
    if (!m.capitulos.includes(v.diretor.capitulo) && !m.id.startsWith('morte_')) continue;
    if (m.unico && (v.vistos[m.id] ?? 0) > 0) continue;
    if ((v.vistos[m.id] ?? 0) >= (m.max ?? (m.tipo === 'respiro' || m.tipo === 'perigo' ? 2 : 3))) continue;
    const ult = v.quando[m.id];
    if (ult !== undefined && ano - ult < (m.cooldown ?? (m.tipo === 'respiro' ? 12 : 6))) continue;
    if (m.fio) {
      const f = v.mundo.fios.find((x) => x.id === m.fio!.id);
      if (m.fio.abre && f && f.estado === 'aberto') continue;
      if (!m.fio.abre) {
        if (!f || f.estado !== 'aberto') continue;
        if (m.fio.etapa !== undefined && m.fio.etapa > 1 && f.etapa !== m.fio.etapa - 1) continue;
        // o arco respira entre as etapas (o clímax pede mais tempo)
        const espaco = m.fio.espaco ?? (m.tipo === 'climax' ? 5 : 3);
        if (ano - f.ultimo < espaco) continue;
      }
    }
    const morte = m.id.startsWith('morte_');
    const serve = morte ? 3 : RITMO[v.diretor.fase][m.tipo];
    if (serve <= 0) continue;
    const lig = ligarPapeis(s, m, rng);
    if (!lig) continue;
    usarMolde(m.id);
    if (!condOk(s, m.quando, lig)) continue;
    const R = relevancia(s, m, lig);
    if (R > 0) cands.push({ m, lig, R, serve });
  }
  return cands;
}

/* ---------- Ciclos: arcos que recomeçam com outro elenco (vidas longas não ficam vazias) ---------- */
const CICLAVEIS: Record<string, { prefixos: string[]; papel?: string }> = {
  rival: { prefixos: ['rival_'], papel: 'rival' }, amigo: { prefixos: ['amigo_'], papel: 'amigo' }, discipulo: { prefixos: ['suc_prodigio', 'suc_discipulo_', 'disc_'], papel: 'discipulo' }, guerra: { prefixos: ['guerra_'] },
};
/** Se um arco principal já fechou há muito tempo, o mundo oferece outra geração: novo rival, novo amigo, outro discípulo, outra guerra. */
function renovarCiclos(s: State, rng: Rng): boolean {
  const v = s.v2!, m = v.mundo, ano = Math.floor(s.age);
  if (s.tier < 3 || ano - (v.q.ultimoCiclo ?? -99) < 12) return false;
  const maduros = m.fios.filter((f) => CICLAVEIS[f.id] && f.estado !== 'aberto' && ano - f.ultimo >= 10);
  const abertos = m.fios.filter((f) => CICLAVEIS[f.id] && f.estado === 'aberto').length;
  if (!maduros.length || abertos >= 2 || !rng.chance(0.55)) return false;
  const f = rng.pick(maduros);
  if (f.id === 'guerra' && !s.flags.includes('membro_seita')) return false;
  const cfg = CICLAVEIS[f.id];
  m.fios = m.fios.filter((x) => x !== f);
  for (const mo of MOLDES) {
    if (mo.id.startsWith('inf_') || mo.id.startsWith('morte_')) continue;
    if (mo.fio?.id === f.id || cfg.prefixos.some((p) => mo.id.startsWith(p))) {
      if (v.vistos[mo.id]) { v.vistos[mo.id + '#c'] = (v.vistos[mo.id + '#c'] ?? 0) + v.vistos[mo.id]; v.vistos[mo.id] = 0; }
      delete v.quando[mo.id];
    }
  }
  if (cfg.papel) for (const p of Object.values(m.pessoas)) p.papeis = p.papeis.filter((x) => x !== cfg.papel);
  const bind: Record<string, string> = {};
  if (f.id === 'rival' || f.id === 'amigo') {
    const novo = criarSolta(m, rng, ano, s.tier, f.id === 'rival' ? { traco: ['orgulhoso', 'ambicioso'], reino: 'jogador', objetivo: 'superar', faccao: 'seita' } : { traco: ['leal', 'generoso'], reino: 'jogador', objetivo: 'proteger' });
    novo.papeis = [f.id]; novo.importante = true; novo.opiniao = f.id === 'rival' ? -10 : 25;
    inserirPessoa(m, novo);
    s.names[f.id] = novo.nome;
    bind[f.id] = novo.id;
    v.diretor.noticias.push(concordar(f.id === 'rival' ? `Um nome novo desponta e já ouviu falar de você: ${novo.nome}.` : `${novo.nome} cruza o seu caminho e, de algum modo, parece conhecer você há anos.`));
    m.log.push({ ano, texto: `${novo.nome} entra na sua vida.` });
    v.ambicao.inclinacoes.superar_rival = (v.ambicao.inclinacoes.superar_rival ?? 0) + (f.id === 'rival' ? 3 : 0);
  } else if (f.id === 'guerra') {
    const fj = faccaoDoJogador(s); if (fj && fj.estado !== 'extinta') fj.estado = 'tensao';
    v.diretor.noticias.push('As seitas voltam a afiar as lâminas: o último tratado já não convence ninguém.');
  } else {
    v.diretor.noticias.push('Há uma geração nova batendo à porta, com a mesma pressa e outros erros.');
  }
  v.q.ultimoCiclo = ano; v.q['ciclo_' + f.id] = (v.q['ciclo_' + f.id] ?? 0) + 1;
  if (f.id === 'rival' || f.id === 'amigo') m.fios.push({ id: f.id, tipo: f.id, papeis: { [f.id]: bind[f.id] }, aberto: ano, ultimo: ano, etapa: 1, prazo: 14, estado: 'aberto' });
  return true;
}

export function pickNextV2(s: State, rng: Rng): void {
  const v = s.v2!;
  atualizarCapitulo(s, rng);
  renovarCiclos(s, rng);
  let cands = candidatas(s, rng);
  // sem nada que sirva: o tempo corre (em vez de repetir um respiro)
  for (let i = 0; i < 4 && !cands.length && s.tier >= 1; i++) {
    s.age += rng.int(2, 5);
    if (s.age >= s.maxAge) { endLife(s, 'velhice'); return; }
    sincronizarMundo(s, rng);
    cands = candidatas(s, rng);
  }
  // Se a fase atual não tem cena que sirva de verdade (só sobras), o ritmo anda para a fase seguinte.
  for (let i = 0; i < 4 && !cands.some((c) => c.serve >= 0.8); i++) {
    v.diretor.fase = PROXIMA_FASE[v.diretor.fase]; v.diretor.cenasNaFase = 0;
    cands = candidatas(s, rng);
  }
  // respiro é tempero, não prato: com outras cenas à mão, ele perde força
  if (cands.some((c) => c.m.tipo !== 'respiro')) for (const c of cands) if (c.m.tipo === 'respiro') c.R *= 0.35;
  let esc: { m: Molde; lig: Ligacoes } | undefined;
  if (cands.length) {
    cands.sort((a, b) => b.R - a.R);
    const top = cands.slice(0, 5);
    esc = rng.weighted(top, (c) => c.R * c.R);
  } else {
    const m = MOLDES.find((x) => x.id === 'respiro_estrada') ?? MOLDES[0];
    esc = { m, lig: ligarPapeis(s, m, rng) ?? {} };
  }
  // Se a vida só tem respiro a oferecer (os fios estão quietos), o tempo corre: o mundo anda enquanto nada importante acontece.
  const u = v.diretor.ultimos;
  if (esc.m.tipo === 'respiro' && u.length >= 2 && u.slice(-2).every((x) => x === 'respiro') && s.tier >= 1) {
    const salto = rng.int(2, Math.max(3, Math.round(2 + s.tier * 2.2)));
    s.age += salto;
    if (s.age >= s.maxAge) { endLife(s, 'velhice'); return; }
    sincronizarMundo(s, rng);
  }
  const bind = efetivarLigacao(s, esc.lig, esc.m.papeis, rng);
  s.current = { id: 'm:' + esc.m.id, v2: { molde: esc.m.id, bind } };
}

/* ---------- Depois de cada cena ---------- */
export function depoisDaCena(s: State, m: Molde, rng: Rng) {
  const v = s.v2!, d = v.diretor, ano = Math.floor(s.age);
  v.vistos[m.id] = (v.vistos[m.id] ?? 0) + 1;
  v.quando[m.id] = ano;
  d.ultimos.push(m.tipo); if (d.ultimos.length > 8) d.ultimos.shift();
  const bind = s.current?.v2?.bind ?? {};
  // fio: abre ou avança automaticamente (e alimenta a inclinação que ele representa)
  if (m.fio) {
    const inc = v.ambicao.inclinacoes;
    if (m.fio.id === 'cla') { inc.reerguer_cla = (inc.reerguer_cla ?? 0) + 1; inc.vingar_cla = (inc.vingar_cla ?? 0) + 0.6; }
    else if (m.fio.id === 'rival') inc.superar_rival = (inc.superar_rival ?? 0) + 1;
    else if (m.fio.id === 'seita') inc.ascender_seita = (inc.ascender_seita ?? 0) + 1;
    const f = v.mundo.fios.find((x) => x.id === m.fio!.id);
    if (m.fio.abre && !f) aplicarEfeitosMundo(s, [{ fio: [m.fio.id, 'abrir'] }], bind, rng);
    else if (f && f.estado === 'aberto') { f.ultimo = ano; if (m.fio.etapa !== undefined && f.etapa < m.fio.etapa) f.etapa = m.fio.etapa; }
  }
  // ritmo e tensão
  d.tensao = Math.max(0, Math.min(1, d.tensao + (m.tensao ?? DELTA_TENSAO[m.tipo])));
  d.cenasNaFase++;
  const alvo = ALVO_TENSAO[d.capitulo] + AJUSTE_ALVO[d.contador];
  const proxima = (f: Fase) => { d.fase = f; d.cenasNaFase = 0; };
  switch (d.fase) {
    case 'calmaria': if (d.cenasNaFase >= (d.tensao < alvo - 0.2 ? 1 : d.contador === 'serena' ? 3 : 2)) proxima('preparo'); break;
    case 'preparo': if (d.cenasNaFase >= (d.contador === 'mestre' ? 2 : 1) || m.tipo === 'perigo') proxima('perigo'); break;
    case 'perigo': if (m.tipo === 'climax' || (d.cenasNaFase >= 2 && d.tensao >= alvo * 0.75) || d.cenasNaFase >= 4) proxima(m.tipo === 'climax' ? 'consequencia' : 'climax'); break;
    case 'climax': proxima('consequencia'); d.tensao = Math.max(0, d.tensao - 0.25); break;
    case 'consequencia': if (d.cenasNaFase >= 2 || d.tensao < 0.15) proxima('calmaria'); break;
  }
  if (m.tipo === 'climax' && d.fase !== 'consequencia') proxima('consequencia');
  void rng;
}

/* ---------- Tempo do mundo ---------- */
export function sincronizarMundo(s: State, rng: Rng) {
  const v = s.v2!;
  // rompimento: o mundo percebe que o jogador subiu de reino
  if (s.tier > (v.q.reinoVisto ?? 0)) { if (s.tier >= 2) v.q.reacao = 1; v.q.reinoVisto = s.tier; }
  const ate = Math.floor(s.age);
  if (ate <= v.anoMundo) return;
  const fj = faccaoDoJogador(s);
  const r = avancarMundo(v.mundo, v.anoMundo, ate, s.name, rng, { reinoJog: s.tier, faccaoJogador: fj?.id });
  v.anoMundo = ate;
  for (const raw of r.noticias) { const n = concordar(raw); if (!v.diretor.noticias.includes(n)) v.diretor.noticias.push(n); }
  if (v.diretor.noticias.length > 4) v.diretor.noticias = v.diretor.noticias.slice(-4);
  for (const id of r.mortes) { v.diretor.mortes.push(id); v.q.perdas = (v.q.perdas ?? 0) + 1; }
}

/* ---------- Final por ambição ---------- */
const FIO_DA_AMBICAO: Record<string, string> = { reerguer_cla: 'cla', vingar_cla: 'cla', superar_rival: 'rival', ascender_seita: 'seita' };
const FINAL_DO_FIO: Record<string, Record<string, string>> = {
  cla: { reerguido: 'v2_cla_reerguido', vingado: 'v2_cla_vingado', perdoado: 'v2_cla_perdoado', perdido: 'v2_cla_perdido' },
  rival: { derrotado: 'v2_rival_superado', poupado: 'v2_rival_superado', reconciliado: 'v2_rival_reconciliado', morto: 'v2_rival_superado', venceu: 'v2_rival_vencedor' },
  seita: { lider: 'v2_seita_lider', exilado: 'v2_seita_exilado', errante: 'v2_seita_errante' },
  companheiro: { unidos: 'v2_comp_unidos' },
  demonio: { redimido: 'v2_dem_redimido', dominou: 'v2_dem_trono' },
  heranca: { libertou: 'v2_heranca_libertou', absorveu: 'v2_heranca_absorveu' },
};
export function finalDeVelhiceV2(s: State): string | null {
  const v = s.v2;
  if (!v) return null;
  const a = v.ambicao;
  // 1) a ambição em curso (ou a última) aponta o fio principal
  const idAmb = a.atual?.id ?? a.historico[a.historico.length - 1]?.id;
  const fioId = idAmb ? FIO_DA_AMBICAO[idAmb] : undefined;
  const fio = fioId ? v.mundo.fios.find((f) => f.id === fioId) : undefined;
  if (fio?.desfecho && FINAL_DO_FIO[fio.id]?.[fio.desfecho]) return FINAL_DO_FIO[fio.id][fio.desfecho];
  // 2) o fio resolvido mais recente
  const fechados = v.mundo.fios.filter((f) => f.estado === 'resolvido' && f.desfecho && FINAL_DO_FIO[f.id]?.[f.desfecho]).sort((x, y) => y.ultimo - x.ultimo);
  if (fechados.length) return FINAL_DO_FIO[fechados[0].id][fechados[0].desfecho!];
  // 3) ambição aberta: ficou no meio do caminho
  if (a.atual) return a.atual.etapa >= 3 ? 'v2_quase' : 'v2_inacabado';
  return null;
}
export { nomearAmbicao };
