import type { State } from '../types';
import { nomeDoReino } from '../engine/v2/mundo';
import { AMBICOES } from '../engine/v2/moldes';
import { CAPITULO_NOME, CONTADOR_NOME } from '../engine/v2/diretor';
import type { Pessoa } from '../engine/v2/tipos';
import type { Role } from './art';

/** Partes da interface que só existem na v2 (mundo com memória). */
const esc = (t: string) => t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const legivel = (t: string) => t.replace(/_/g, ' ').replace(/ ate /g, ' até ').replace(/ ultimo /g, ' último ').replace(/ a mao /g, ' a mão ').replace(/ maos /g, ' mãos ');

export function opiniaoTexto(n: number): { txt: string; cls: string } {
  if (n <= -60) return { txt: 'inimigo jurado', cls: 'neg2' };
  if (n <= -30) return { txt: 'hostil', cls: 'neg' };
  if (n <= -10) return { txt: 'frio', cls: 'neg' };
  if (n < 10) return { txt: 'neutro', cls: '' };
  if (n < 35) return { txt: 'cordial', cls: 'pos' };
  if (n < 60) return { txt: 'amigo', cls: 'pos' };
  return { txt: 'leal', cls: 'pos2' };
}

const PAPEL_NOME: Record<string, string> = {
  mestre: 'mestre', rival: 'rival', amigo: 'amigo', discipulo: 'discípulo', parente: 'família', credor: 'credor', culpado: 'culpado', inimigo: 'inimigo', noivo: 'amor',
};
const FIO_NOME: Record<string, string> = {
  cla: 'O nome do clã', rival: 'A rivalidade', seita: 'A ascensão na seita', amigo: 'O juramento do amigo', mestre: 'O mestre', discipulo: 'O discípulo', herdeiro: 'O herdeiro do rival',
};

/** Quem aparece no retrato da cena atual, e com que papel de retrato. */
export function npcV2(s: State): { role: Role; nome: string; reino: number } | null {
  const v = s.current?.v2;
  if (!v || !s.v2) return null;
  const ordem: [string, Role][] = [['mestre', 'mentor'], ['rival', 'rival'], ['amigo', 'amigo'], ['discipulo', 'discipulo'], ['jovem', 'discipulo'], ['herdeiro', 'inimigo'], ['culpado', 'inimigo'], ['lider', 'inimigo'], ['capanga', 'inimigo'], ['anciao', 'mentor'], ['parente', 'amigo'], ['morto', 'amigo']];
  for (const [r, role] of ordem) {
    const p = s.v2.mundo.pessoas[v.bind[r]];
    if (p) return { role, nome: p.nome, reino: p.reino };
  }
  return null;
}

/** Tipo de cenário a partir dos lugares da cena (ou do tipo de luta). */
const LUGAR_CENA: Record<string, string> = {
  vila: 'vilarejo', mercado: 'cidade', praca: 'cidade', patio: 'seita', portao: 'seita', estrada: 'vilarejo', floresta: 'selva', desfiladeiro: 'montanha',
  ruinas: 'ruinas', gruta: 'montanha', pico: 'montanha', porto: 'mar', forja: 'cidade', ponte: 'cidade', templo: 'montanha',
};
export function cenaV2(s: State): string | null {
  const cur = s.current?.v2;
  if (!cur || !s.v2) return null;
  for (const id of Object.values(cur.bind)) {
    const l = s.v2.mundo.lugares[id];
    if (l) return LUGAR_CENA[l.tipo] ?? null;
  }
  return null;
}

const nomesDoFio = (s: State, papeis: Record<string, string>) =>
  Object.values(papeis).map((id) => s.v2!.mundo.pessoas[id]?.nome ?? s.v2!.mundo.faccoes[id]?.nome).filter(Boolean).slice(0, 2).join(' e ');

function pessoaHtml(s: State, p: Pessoa): string {
  const o = opiniaoTexto(p.opiniao);
  const papeis = p.papeis.map((x) => PAPEL_NOME[x] ?? x).join(', ');
  const fatos = [...p.memoria].sort((a, b) => b.peso - a.peso).slice(0, 2).map((f) => legivel(f.tipo)).join(' · ');
  return `<div class="pessoa ${p.vivo ? '' : 'morta'}">
    <div class="row between"><b>${esc(p.nome)}${p.vivo ? '' : ' †'}</b><span class="opi ${o.cls}">${o.txt}</span></div>
    <div class="small muted">${esc(papeis || 'conhecido')} · ${esc(nomeDoReino(p.trilha, p.reino))}${p.vivo ? '' : ` · morreu aos ${(p.morte?.ano ?? 0) - p.nasc} anos`}</div>
    ${fatos ? `<div class="small">Lembra: ${esc(fatos)}</div>` : ''}
  </div>`;
}

export function mundoHtml(s: State): string {
  const v = s.v2!, m = v.mundo, d = v.diretor, a = v.ambicao;
  const amb = a.atual
    ? `<div><b>${esc(AMBICOES[a.atual.id]?.nome ?? a.atual.id)}</b> <span class="muted small">desde os ${a.atual.desde} anos</span></div><div class="small">Você quer ${esc(a.atual.motivo)}.</div>`
    : `<div class="muted">Ainda sem rumo definido. A vida está forjando uma ambição a partir do que você faz.</div>`;
  const inc = Object.entries(a.inclinacoes).filter(([k, n]) => n > 0 && AMBICOES[k]).sort((x, y) => y[1] - x[1]).slice(0, 3);
  const hist = a.historico.map((h) => `<div class="small muted">${esc(AMBICOES[h.id]?.nome ?? h.id)}: ${esc(h.desfecho)} (${h.desde} a ${h.ate} anos)</div>`).join('');
  const fios = m.fios.filter((f) => f.estado === 'aberto');
  const pessoas = Object.values(m.pessoas).filter((p) => p.importante || p.papeis.length).sort((x, y) => Number(y.vivo) - Number(x.vivo) || Math.abs(y.opiniao) - Math.abs(x.opiniao));
  const faccoes = Object.values(m.faccoes).filter((f) => f.estado !== 'extinta' && (f.reputacao !== 0 || f.id === m.ferida.faccao)).sort((x, y) => Math.abs(y.reputacao) - Math.abs(x.reputacao));
  const recentes = m.log.filter((l) => l.ano >= 0).slice(-5).reverse();
  return `
    <div class="card"><div class="muted small">CAPÍTULO ${esc(CAPITULO_NOME[d.capitulo].toUpperCase())} · CONTADA ${esc(CONTADOR_NOME[d.contador].toUpperCase())}</div>${amb}
      ${inc.length ? `<div class="small muted" style="margin-top:6px">O que a vida está forjando: ${inc.map(([k, n]) => `${esc(AMBICOES[k].nome)} (${Math.round(n)})`).join(', ')}</div>` : ''}${hist}</div>
    <div class="card"><div class="muted small">FIOS ABERTOS</div>${fios.length ? fios.map((f) => `<div class="fio"><b>${esc(FIO_NOME[f.id] ?? f.id)}</b> <span class="muted small">etapa ${f.etapa}${nomesDoFio(s, f.papeis) ? ' · ' + esc(nomesDoFio(s, f.papeis)) : ''}</span></div>`).join('') : '<span class="muted">Nenhum fio pendente.</span>'}</div>
    <div class="card"><div class="muted small">PESSOAS</div>${pessoas.length ? pessoas.map((p) => pessoaHtml(s, p)).join('') : '<span class="muted">Ninguém marcou a sua vida ainda.</span>'}</div>
    <div class="card"><div class="muted small">FACÇÕES</div>${faccoes.length ? faccoes.map((f) => `<div class="pessoa"><div class="row between"><b>${esc(f.nome)}</b><span class="opi ${f.reputacao > 10 ? 'pos' : f.reputacao < -10 ? 'neg' : ''}">${f.reputacao > 0 ? '+' : ''}${Math.round(f.reputacao)}</span></div><div class="small muted">${esc(f.estado)} · força ${Math.round(f.forca)}</div></div>`).join('') : '<span class="muted">Nenhuma facção conhece o seu nome ainda.</span>'}</div>
    ${recentes.length ? `<div class="card"><div class="muted small">O MUNDO ANDA</div>${recentes.map((l) => `<div class="small">${esc(l.texto)} <span class="muted">(ano ${l.ano})</span></div>`).join('')}</div>` : ''}`;
}

/** Fim da vida: o que a ambição e os fios disseram, e o que aconteceu com quem ficou. */
export function resumoV2Html(s: State): string {
  const v = s.v2!, m = v.mundo;
  const amb = [...v.ambicao.historico.map((h) => `${AMBICOES[h.id]?.nome ?? h.id}: ${h.desfecho}`), ...(v.ambicao.atual ? [`${AMBICOES[v.ambicao.atual.id]?.nome}: em curso, etapa ${v.ambicao.atual.etapa}`] : [])];
  const fios = m.fios.map((f) => `${FIO_NOME[f.id] ?? f.id}: ${f.desfecho ? f.desfecho : f.estado}`);
  const pessoas = Object.values(m.pessoas).filter((p) => p.importante || p.papeis.length).map((p) => `${p.nome} (${p.papeis.map((x) => PAPEL_NOME[x] ?? x).join(', ') || 'conhecido'}): ${p.vivo ? opiniaoTexto(p.opiniao).txt : 'morreu' + (p.morte ? ` de ${p.morte.causa}` : '')}`);
  const bloco = (t: string, l: string[]) => l.length ? `<div class="muted small" style="margin-top:8px">${t}</div>${l.map((x) => `<div class="tech small">${esc(x)}</div>`).join('')}` : '';
  return `<div class="card"><div class="muted small">O QUE A SUA VIDA DEIXOU NO MUNDO</div>${bloco('AMBIÇÕES', amb)}${bloco('FIOS', fios)}${bloco('PESSOAS', pessoas)}</div>`;
}
