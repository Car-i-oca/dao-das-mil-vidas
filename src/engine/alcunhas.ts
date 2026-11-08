import type { Rng } from './rng';
import type { Alcunha, Eixo } from '../data/modos/tipos';
import type { Effects, State } from '../types';
import { pacoteDe } from '../data/modos';
import { generoDoNome } from '../data/modos/xianxia/nomes';

/**
 * Alcunhas: o nome pelo qual o mundo passa a chamar a pessoa por causa do jeito como ela viveu.
 * Nascem do perfil de conduta escrito à mão nas escolhas (nunca classificado por regex), ou de um feito concreto lido do estado.
 * Têm cena de nascimento (aceitar, rejeitar, tentar mudar), de mudança, de mancha, e cenas de reação do mundo.
 */
export const EIXOS: Eixo[] = ['compaixao', 'violencia', 'astucia', 'cautela', 'ambicao', 'disciplina', 'devocao', 'ganancia'];
const LIMIAR_NASCER = 5;
/** Xianxia: mesmo corte de z do eixo único (0,85 × 5 pontos); ver Z_PURO. */
const LIMIAR_NASCER_MODO: Record<string, number> = { murim: 5, xianxia: 4.25 };
const MARGEM_MUDAR = 5;

export interface EstadoAlcunha {
  atual?: { id: string; desde: number; manchada?: boolean };
  historico: { id: string; idade: number; como: string }[];
  recusadas: string[];
  turno: number;
  reacoes: string[];
  ultimaReacao: number;
}
export const alc = (s: State): EstadoAlcunha => (s.alc ??= { historico: [], recusadas: [], turno: -99, reacoes: [], ultimaReacao: 0 });

/** Põe a alcunha no texto concordando com a preposição que vem antes («de» + «a Raposa» = «da Raposa») e com o começo da frase. */
export function aplicarAlcunha(texto: string, nome: string): string {
  const m = nome.match(/^(o|a) (.+)$/i);
  const art = m?.[1].toLowerCase();
  const resto = m?.[2] ?? nome;
  const contr: Record<string, Record<string, string>> = { de: { o: 'do', a: 'da' }, em: { o: 'no', a: 'na' }, por: { o: 'pelo', a: 'pela' }, a: { o: 'ao', a: 'à' }, para: { o: 'para o', a: 'para a' } };
  let t = texto.replace(/(^|[.!?]\s+)\{alcunha\}/g, (_, p) => p + nome.charAt(0).toUpperCase() + nome.slice(1));
  t = t.replace(/\b(de|em|por|a|para)\s+«?\{alcunha\}»?/g, (_all, prep: string) => (art ? `${contr[prep][art]} ${resto}` : `${prep} ${nome}`));
  return t.replace(/\{alcunha\}/g, nome);
}
/** Particípios que concordam com o gênero da pessoa do jogador. */
function participios(s: State, texto: string): string {
  return generoJogador(s) === 'f' ? texto.replace(/(é|foi) (chamado|procurado|convidado)/g, (_m, v, p) => `${v} ${p.slice(0, -1)}a`) : texto;
}
/** Texto sobre a pessoa do jogador: «ele/ela» concorda com o gênero dela. */
export function pronomes(s: State, texto: string): string {
  const f = generoJogador(s) === 'f';
  return texto.replace(/\b(Ele|ele|Dele|dele|Nele|nele)\b/g, (w) => (f ? { Ele: 'Ela', ele: 'ela', Dele: 'Dela', dele: 'dela', Nele: 'Nela', nele: 'nela' }[w]! : w))
    .replace(/\b(Ela|ela|Dela|dela|Nela|nela)\b/g, (w) => (f ? w : { Ela: 'Ele', ela: 'ele', Dela: 'Dele', dela: 'dele', Nela: 'Nele', nela: 'nele' }[w]!));
}

export const generoJogador = (s: State): 'm' | 'f' => (s.modo === 'xianxia' || s.v2 ? generoDoNome(s.name) : ((s.seed >>> 3) & 1 ? 'f' : 'm'));
const catalogo = (s: State): Alcunha[] => pacoteDe(s.modo).alcunhas;
export const alcunhaPorId = (s: State, id: string) => catalogo(s).find((a) => a.id === id);

export function nomeAlcunha(s: State, a: Alcunha, manchada = false): string {
  const g = generoJogador(s);
  const base = manchada && a.infame ? a.infame : a;
  return g === 'f' ? base.f : base.m;
}
/** Alcunha atual, já escrita no gênero da pessoa (ou '' se ainda não há). */
export function textoAlcunha(s: State): string {
  const at = s.alc?.atual;
  const a = at && alcunhaPorId(s, at.id);
  return a ? nomeAlcunha(s, a, at!.manchada) : '';
}

/**
 * Escala de cada eixo: o perfil MÉDIO que uma vida acumula nele, medido com 150 vidas por modo (docs/alcunhas.md).
 * O jogo compara a pessoa com a vida típica do modo: «compaixão 20» é comum no Xianxia e raro no Murim.
 */
const ESCALA: Record<string, Record<Eixo, number>> = {
  murim: { compaixao: 13.5, violencia: 1.9, astucia: 6.1, cautela: 7.5, ambicao: 2.1, disciplina: 12.1, devocao: 1.3, ganancia: 2 },
  xianxia: { compaixao: 26, violencia: 5.6, astucia: 13.7, cautela: 27.1, ambicao: 8.9, disciplina: 20.7, devocao: 16.8, ganancia: 3.8 },
};
/** Menor z para uma alcunha de eixo único. O Xianxia acumula perfil de forma mais espalhada (mais eixos com valores próximos), então o limiar é menor. */
const Z_PURO: Record<string, number> = { murim: 1.0, xianxia: 0.85 };
/** Quanto do eixo, em relação à vida típica (1 = típico). */
export function zEixo(s: State, e: Eixo): number {
  const p = s.perfil?.[e] ?? 0;
  return p < 3 ? 0 : p / (ESCALA[pacoteDe(s.modo).id]?.[e] ?? 10);
}

/** Pontuação de uma alcunha para esta vida (0 = não serve). */
export function pontuar(s: State, a: Alcunha): number {
  if (a.trilha && !a.trilha.includes(s.path)) return 0;
  if (a.talento && !a.talento.includes(s.talent)) return 0;
  if (a.defeito && !a.defeito.includes(s.flaw)) return 0;
  if (a.feito) return a.feito(s) ? 6 + (a.peso ?? 0) + (a.eixos ? Math.min(...a.eixos.map((e) => zEixo(s, e))) * 2 : 0) : 0;
  if (!a.eixos) return 0;
  const maior = Math.max(...EIXOS.map((e) => zEixo(s, e)));
  if (a.eixos.length === 1) {
    const z = zEixo(s, a.eixos[0]);
    return z >= (Z_PURO[pacoteDe(s.modo).id] ?? 1) && z >= maior ? z * 5 + (a.trilha || a.talento || a.defeito ? 3 : 0) : 0;
  }
  const [x, y] = a.eixos;
  const menor = Math.min(zEixo(s, x), zEixo(s, y));
  const outros = Math.max(...EIXOS.filter((e) => e !== x && e !== y).map((e) => zEixo(s, e)));
  return menor >= 1.05 && outros <= Math.max(zEixo(s, x), zEixo(s, y)) * 1.15 ? menor * 8 : 0;
}

export function melhor(s: State): { a: Alcunha; score: number } | null {
  const e = alc(s);
  let top: { a: Alcunha; score: number } | null = null;
  for (const a of catalogo(s)) {
    if (e.recusadas.includes(a.id)) continue;
    const score = pontuar(s, a);
    if (score > 0 && (!top || score > top.score)) top = { a, score };
  }
  return top;
}

export type TipoCena = 'nasce' | 'muda' | 'perde' | 'reacao';
export interface CenaAlcunha { tipo: TipoCena; id: string; reacao?: string }
const hash = (x: string) => { let h = 2166136261; for (let i = 0; i < x.length; i++) { h ^= x.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

/** Decide se este turno é uma cena de alcunha (sem sorteio: depende só do estado e do turno). */
export function cenaPendente(s: State): CenaAlcunha | null {
  if (s.age < 14 || s.ending) return null;
  const e = alc(s);
  if (s.turn - e.turno < 4) return null;
  const m = melhor(s);
  if (!e.atual) return m && m.score >= (LIMIAR_NASCER_MODO[pacoteDe(s.modo).id] ?? LIMIAR_NASCER) ? { tipo: 'nasce', id: m.a.id } : null;
  const atual = alcunhaPorId(s, e.atual.id);
  if (!atual) return null;
  if (!e.atual.manchada && atual.contra?.length) {
    const own = Math.max(...(atual.eixos ?? []).map((x) => zEixo(s, x)), 0);
    if (Math.max(...atual.contra.map((x) => zEixo(s, x))) - own * 0.6 >= 0.7) return { tipo: 'perde', id: atual.id };
  }
  if (m && m.a.id !== atual.id && m.score >= pontuar(s, atual) + MARGEM_MUDAR && s.turn - e.turno >= 10) return { tipo: 'muda', id: m.a.id };
  if (s.turn - e.ultimaReacao >= 7 && hash(`${s.seed}:${s.turn}`) % 100 < 35) {
    const r = atual.reacoes.find((x) => !e.reacoes.includes(`${atual.id}:${x.id}`));
    if (r) return { tipo: 'reacao', id: atual.id, reacao: r.id };
  }
  return null;
}

export interface OpcaoCena { texto: string; fn: (rng: Rng, aplicar: (fx: Effects) => void) => string }
export interface CenaMontada { titulo: string; texto: string; opcoes: OpcaoCena[] }

/** Onde a história do nome é contada: varia com o eixo da alcunha (ou 'feito', para as de feito concreto) e com o modo. Termina pedindo o nome. */
const QUADRO: Record<string, Record<string, string>> = {
  murim: {
    compaixao: 'Na porta de uma casa de caridade, onde a fila de quem espera um prato quente dá a volta na esquina, uma mulher conta a história de quem chamam',
    violencia: 'Num pátio de treino ainda marcado de sangue seco, dois discípulos falam baixo, sem tirar os olhos do chão, da história de quem chamam',
    astucia: 'Numa casa de apostas de Hwayang, entre fichas e sorrisos que não chegam aos olhos, um corretor conta a história de quem chamam',
    cautela: 'Numa estalagem de beira de estrada, de janelas fechadas cedo, um mascate repete em voz baixa a história de quem chamam',
    ambicao: 'No salão de banquetes de uma escola em ascensão, entre brindes demasiado altos, alguém conta a história de quem chamam',
    disciplina: 'No corredor de um dojo, depois do último treino do dia, um mestre idoso conta aos alunos a história de quem chamam',
    devocao: 'Nos degraus de um templo de montanha, entre fiéis que acendem incenso, um monge conta a história de quem chamam',
    ganancia: 'Numa casa de penhores de beira de rio, entre balanças e livros de contas, um agiota conta a história de quem chamam',
    feito: 'Numa casa de chá à beira da estrada, um viajante conta, para quem quiser ouvir, a história de quem chamam',
  },
  xianxia: {
    compaixao: 'Num pavilhão de cura, entre bacias de ervas e pacientes de olhos vendados, uma curandeira conta a história de quem já chamam',
    violencia: 'Na borda de uma arena de duelos, entre cultivadores que limpam lâminas sem pressa, alguém conta a história de quem já chamam',
    astucia: 'Numa sala de chá de uma cidade de feiras, entre emissários que fingem não ouvir, alguém conta a história de quem já chamam',
    cautela: 'Num pavilhão de passagem, entre cultivadores que fingem não ouvir, alguém conta a história de quem já chamam',
    ambicao: 'No pátio externo de uma seita grande, onde discípulos disputam um lugar na fila das promoções, alguém conta a história de quem já chamam',
    disciplina: 'No salão de meditação de uma seita, entre esteiras alinhadas e incenso contado, um ancião conta a história de quem já chamam',
    devocao: 'Diante de um altar de pedra, sob o sino que marca as horas do Dao, um sacerdote conta a história de quem já chamam',
    ganancia: 'Numa casa de leilões, entre lotes selados e lances sussurrados, um leiloeiro conta a história de quem já chamam',
    feito: 'Num pavilhão de passagem, entre cultivadores que fingem não ouvir, alguém conta a história de quem já chamam',
  },
};

export function montarCena(s: State, c: CenaAlcunha): CenaMontada {
  const e = alc(s);
  const a = alcunhaPorId(s, c.id)!;
  const nome = nomeAlcunha(s, a);
  const modo = pacoteDe(s.modo).id;
  const marcar = () => { e.turno = s.turn; };
  if (c.tipo === 'nasce') {
    const outra = () => { const rest = catalogo(s).filter((x) => x.id !== a.id && !e.recusadas.includes(x.id)); return rest.map((x) => ({ x, v: pontuar(s, x) })).filter((o) => o.v > 0).sort((p, q) => q.v - p.v)[0]?.x; };
    return {
      titulo: 'Um nome que corre',
      texto: `${QUADRO[modo][a.eixos?.[0] ?? 'feito']} «${nome}». ${pronomes(s, a.historia)} Quando o narrador ergue os olhos na sua direção, a sala inteira percebe que a história é sua.`,
      opcoes: [
        { texto: `Aceitar o nome: «${nome}».`, fn: (_r, ap) => { marcar(); e.atual = { id: a.id, desde: s.age }; e.historico.push({ id: a.id, idade: Math.floor(s.age), como: 'aceita' }); ap({ fama: 3, setFlags: ['alcunha_aceita'] }); return `O nome pega. Em poucas semanas, gente que você nunca viu o diz como quem diz a hora. Você é «${nome}», e o mundo, a partir de agora, chega até você já sabendo o que esperar.`; } },
        { texto: 'Rejeitar o nome em voz alta, diante de todos.', fn: (_r, ap) => { marcar(); e.recusadas.push(a.id); for (const x of a.eixos ?? []) s.perfil = { ...(s.perfil ?? {}), [x]: Math.max(0, (s.perfil?.[x] ?? 0) - 3) }; ap({ fama: -1, setFlags: ['alcunha_recusada'], stats: { dao: 1 } }); return 'A sala fica em silêncio. Quem contava a história engole o resto dela. O nome não some, mas passa a andar sem o seu consentimento, e você aprende o preço de dizer não em público.'; } },
        { texto: 'Tentar trocar o nome por outro, pagando e conversando.', fn: (r, ap) => {
          marcar();
          const ok = r.chance(0.4 + Math.min(0.3, (s.stats.car ?? 8) / 80));
          const o = outra();
          if (ok && o) { e.recusadas.push(a.id); e.atual = { id: o.id, desde: s.age }; e.historico.push({ id: o.id, idade: Math.floor(s.age), como: 'trocada' }); ap({ pedras: -10, setFlags: ['alcunha_trocada'], fama: 1 }); return `Algumas rodadas de bebida e alguns favores depois, a história muda de boca em boca. Agora dizem «${nomeAlcunha(s, o)}». Não é o que você queria, mas é um nome que você consegue carregar.`; }
          if (ok) { e.recusadas.push(a.id); ap({ pedras: -10, setFlags: ['alcunha_trocada'] }); return 'Você paga, conversa e convence: o nome morre ali mesmo, sem herdeiro. Por enquanto, ninguém sabe como chamar você, e isso é uma espécie de liberdade.'; }
          e.atual = { id: a.id, desde: s.age, manchada: !!a.infame }; e.historico.push({ id: a.id, idade: Math.floor(s.age), como: 'imposta' }); ap({ pedras: -10, fama: -1, setFlags: ['alcunha_imposta'] });
          return `A tentativa vira piada, e a piada espalha o nome mais depressa do que a história. ${a.infame ? `Agora dizem «${nomeAlcunha(s, a, true)}», que soa pior.` : `Agora todos dizem «${nome}», e dizem rindo.`}`;
        } },
      ],
    };
  }
  if (c.tipo === 'muda') {
    const antiga = alcunhaPorId(s, e.atual!.id)!;
    return {
      titulo: 'O nome muda',
      texto: `Já não te chamam «${nomeAlcunha(s, antiga, e.atual!.manchada)}». ${pronomes(s, a.historia)} Agora, quando falam de você, dizem «${nome}».`,
      opcoes: [
        { texto: `Deixar que o novo nome ocupe o lugar do antigo: «${nome}».`, fn: (_r, ap) => { marcar(); e.historico.push({ id: a.id, idade: Math.floor(s.age), como: 'mudou' }); e.atual = { id: a.id, desde: s.age }; ap({ fama: 2, setFlags: ['alcunha_mudou'] }); return `O antigo nome vira lembrança de quem o conheceu. O novo chega sem pedir licença, e você descobre que se reconhece nele mais do que esperava.`; } },
        { texto: `Insistir no nome antigo, «${nomeAlcunha(s, antiga, e.atual!.manchada)}», e corrigir quem errar.`, fn: (_r, ap) => { marcar(); e.recusadas.push(a.id); ap({ fama: -2, stats: { dao: 1 }, setFlags: ['alcunha_mantida'] }); return 'Alguns riem, outros respeitam a teimosia. O nome novo desiste de você, por enquanto. O velho continua preso a quem foi, e ao que você já não é por inteiro.'; } },
      ],
    };
  }
  if (c.tipo === 'perde') {
    return {
      titulo: 'O nome já não cabe',
      texto: `Uma coisa que você fez desmentiu o que diziam de você, e o mundo percebeu. ${a.infame ? `Quando dizem «${nome}», agora é com outro tom, e começam a dizer «${nomeAlcunha(s, a, true)}».` : `Quem dizia «${nome}» agora olha para o chão antes de continuar a frase.`}`,
      opcoes: [
        ...(a.infame ? [{ texto: `Assumir o nome manchado: «${nomeAlcunha(s, a, true)}».`, fn: (_r: Rng, ap: (fx: Effects) => void) => { marcar(); e.atual = { ...e.atual!, manchada: true }; e.historico.push({ id: a.id, idade: Math.floor(s.age), como: 'manchada' }); ap({ fama: 1, karma: -2, setFlags: ['alcunha_manchada'] }); return 'Você não discute. O nome novo tem a feição do que você fez, e carregá-lo é uma forma estranha de honestidade.'; } }] : []),
        { texto: 'Repudiar o nome antigo e ficar sem alcunha por um tempo.', fn: (_r, ap) => { marcar(); e.recusadas.push(a.id); e.historico.push({ id: a.id, idade: Math.floor(s.age), como: 'perdida' }); e.atual = undefined; ap({ fama: -2, setFlags: ['alcunha_perdida'] }); return 'O nome cai como uma roupa que ficou grande. Por um tempo, ninguém sabe como chamar você, e você também não sabe o que responder quando perguntam.'; } },
        { texto: 'Fingir que nada mudou e esperar que a história seja esquecida.', fn: (_r, ap) => { marcar(); ap({ fama: -1, setFlags: ['alcunha_negada'] }); return 'A história não é esquecida: é guardada. Cada vez que o nome é dito, alguém lembra do que o desmentiu, e o silêncio entre as duas coisas cresce.'; } },
      ],
    };
  }
  const r = a.reacoes.find((x) => x.id === c.reacao)!;
  return {
    titulo: r.titulo,
    texto: participios(s, aplicarAlcunha(r.texto, nome)),
    opcoes: r.opcoes.map((o) => ({ texto: o.texto, fn: (_rng: Rng, ap: (fx: Effects) => void) => { e.turno = s.turn; e.ultimaReacao = s.turn; e.reacoes.push(`${a.id}:${r.id}`); ap(o.fx ?? {}); return participios(s, aplicarAlcunha(o.res, nome)); } })),
  };
}
