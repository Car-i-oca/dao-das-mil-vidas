import type { Effects, StatKey } from '../../types';

/**
 * Tipos da v2 (ver docs/design-v2.md e docs/eventos-v2.md).
 * Tudo aqui é dado serializável: vai dentro do State e do save.
 */
export type Id = string;
export type Papel = string;
export type Traco = 'orgulhoso' | 'leal' | 'rancoroso' | 'ambicioso' | 'cauteloso' | 'generoso' | 'cruel' | 'curioso';
export const TRACOS: Traco[] = ['orgulhoso', 'leal', 'rancoroso', 'ambicioso', 'cauteloso', 'generoso', 'cruel', 'curioso'];

/** Memória: um fato entre a pessoa e o jogador (ou entre a pessoa e outra entidade). */
export interface Fato { ano: number; tipo: string; peso: number; com?: Id; nota?: string }

export type ObjetivoTipo = 'subir' | 'vingar' | 'proteger' | 'cacar' | 'fundar' | 'esconder' | 'servir' | 'superar' | 'expor' | 'viver';
export interface Objetivo { tipo: ObjetivoTipo; alvo?: Id }

export interface Pessoa {
  id: Id;
  nome: string;
  nasc: number;
  /** Reino (0 = mortal). */
  reino: number;
  /** Progresso no reino atual, em anos de cultivo acumulados. */
  xp: number;
  /** Quão rápido cultiva (0,6 a 1,5). */
  ritmo: number;
  /** Reino máximo que esta pessoa alcança (a maioria para cedo). */
  teto: number;
  trilha: string;
  tracos: Traco[];
  objetivo: Objetivo;
  papeis: Papel[];
  faccao?: Id;
  lugar?: Id;
  /** Opinião sobre o jogador, de -100 a +100. */
  opiniao: number;
  memoria: Fato[];
  vivo: boolean;
  morte?: { ano: number; causa: string };
  /** Último ano em que apareceu numa cena. */
  ultima?: number;
  /** Pessoa que o jogador conheceu de verdade (morre com cena própria). */
  importante?: boolean;
  /** Ligações de parentesco ou ensino: { mestre: id, filho: id... }. */
  lig?: Record<string, Id>;
}

export type FaccaoTipo = 'seita' | 'cla' | 'culto' | 'imperio' | 'associacao';
export type FaccaoEstado = 'paz' | 'tensao' | 'guerra' | 'extinta';
export interface Faccao {
  id: Id;
  nome: string;
  tipo: FaccaoTipo;
  forca: number;
  estado: FaccaoEstado;
  aliados: Id[];
  inimigos: Id[];
  interesse: string;
  /** Reputação do jogador com a facção (-100 a +100). */
  reputacao: number;
  lugares: Id[];
  fundada: number;
  /** Ano em que a guerra atual termina. */
  ate?: number;
}

export interface Lugar { id: Id; nome: string; tipo: string; dono?: Id; perigo: number; segredos: string[] }

export type FioEstado = 'aberto' | 'resolvido' | 'abandonado';
export interface Fio {
  id: string;
  tipo: string;
  papeis: Record<Papel, Id>;
  aberto: number;
  ultimo: number;
  etapa: number;
  /** Anos sem toque até o fio ser considerado maduro. */
  prazo: number;
  estado: FioEstado;
  desfecho?: string;
}

export type FeridaTipo = 'divida' | 'terra' | 'desonra' | 'traicao';
/** A ferida de origem: o que a pré-história fez com a família do jogador. */
export interface Ferida { tipo: FeridaTipo; culpado: Id; faccao: Id }

export interface Mundo {
  semente: number;
  pessoas: Record<Id, Pessoa>;
  faccoes: Record<Id, Faccao>;
  lugares: Record<Id, Lugar>;
  fios: Fio[];
  /** Registro do mundo (o "Legends"): o que aconteceu e pode ser citado depois. */
  log: { ano: number; texto: string }[];
  ferida: Ferida;
  proxId: number;
  /** Última vez que a reserva foi processada. */
  anoReserva: number;
  /** Ids de reserva já usados (promovidos ou descartados). */
  usados: Id[];
}

export type Tipo = 'respiro' | 'preparo' | 'perigo' | 'climax' | 'consequencia' | 'personagem' | 'virada';
export type Capitulo = 'infancia' | 'despertar' | 'entrada' | 'ascensao' | 'crise' | 'legado';
export type Fase = 'calmaria' | 'preparo' | 'perigo' | 'climax' | 'consequencia';
export type ContadorId = 'serena' | 'sombria' | 'trapaceiro' | 'mestre';

export interface Diretor {
  capitulo: Capitulo;
  fase: Fase;
  /** Tensão atual, de 0 a 1. */
  tensao: number;
  contadorBase: ContadorId | 'auto';
  contador: ContadorId;
  capDesde: number;
  cenasNaFase: number;
  /** Ids dos últimos moldes (evita repetir e mede o ritmo). */
  ultimos: string[];
  /** Notícias do mundo a mostrar junto da próxima cena. */
  noticias: string[];
  /** Pessoas importantes que morreram e esperam a cena de morte. */
  mortes: Id[];
  /** Capítulo cujo cartão ainda não foi mostrado. */
  cartao?: string;
}

export interface AmbicaoAtual { id: string; desde: number; etapa: number; motivo: string }
export interface Ambicao {
  /** Inclinações: o que a vida vai forjando (reerguer, vingar, superar, fundar, proteger, dominar, ascender, redimir). */
  inclinacoes: Record<string, number>;
  atual?: AmbicaoAtual;
  historico: { id: string; desde: number; ate: number; desfecho: string }[];
  /** Limiar de inclinação para a próxima cena de virada. */
  limiar: number;
}

export interface V2State {
  mundo: Mundo;
  diretor: Diretor;
  ambicao: Ambicao;
  /** Qualidades numéricas livres (contadores de arco). */
  q: Record<string, number>;
  /** Quantas vezes cada molde já saiu nesta vida. */
  vistos: Record<string, number>;
  /** Último ano em que cada molde saiu. */
  quando: Record<string, number>;
  /** Último ano do mundo já simulado. */
  anoMundo: number;
}

/* ---------- Condições ---------- */
export interface CondJogador {
  reinoMin?: number; reinoMax?: number; idadeMin?: number; idadeMax?: number;
  trilha?: string[]; semTrilha?: boolean; talento?: string[]; defeito?: string[]; defeitoNao?: string[];
  origem?: string[]; raiz?: string[]; tecnica?: string[]; mestria?: number; item?: string;
  flag?: string[]; semFlag?: string[]; perfilMin?: Record<string, number>; pedrasMin?: number;
  karmaMin?: number; karmaMax?: number; famaMin?: number; constituicao?: string[];
}
export interface CondPapel {
  opiniaoMin?: number; opiniaoMax?: number; reinoMin?: number; reinoMax?: number;
  /** Reino do jogador menos o reino da pessoa. */
  reinoDif?: [number, number];
  objetivo?: ObjetivoTipo[]; fato?: string[]; semFato?: string[]; vivo?: boolean; traco?: Traco[]; trilha?: string[];
}
export interface CondFaccao { estado?: FaccaoEstado[]; reputacaoMin?: number; reputacaoMax?: number; forcaMin?: number; forcaMax?: number }
export interface CondFio { existe?: boolean; aberto?: boolean; etapaMin?: number; etapaMax?: number; resolvido?: boolean; desfecho?: string[] }
export interface Cond2 {
  jogador?: CondJogador;
  papel?: Record<Papel, CondPapel>;
  faccao?: Record<Papel, CondFaccao>;
  fio?: Record<string, CondFio>;
  diretor?: { capitulo?: Capitulo[]; fase?: Fase[]; tensaoMin?: number; tensaoMax?: number; contador?: ContadorId[] };
  ambicao?: { atual?: string[]; sem?: boolean; inclinacaoMin?: [string, number]; etapaMin?: number; etapaMax?: number };
  q?: Record<string, [number | undefined, number | undefined]>;
  ferida?: FeridaTipo[];
  todos?: Cond2[];
  algum?: Cond2[];
  nao?: Cond2;
}

/* ---------- Moldes ---------- */
export interface PapelPessoa {
  /** Papel já atribuído a uma pessoa ativa (ex.: 'rival'). */
  papel?: string;
  opiniaoMin?: number; opiniaoMax?: number;
  reinoMin?: number | 'jogador-1' | 'jogador' | 'jogador+1'; reinoMax?: number | 'jogador-1' | 'jogador' | 'jogador+1';
  /** Diferença de idade (pessoa - jogador). */
  idadeDif?: [number, number];
  idadeMin?: number; idadeMax?: number;
  traco?: Traco[]; trilha?: string[];
  vivo?: boolean;
  faccao?: string;
  objetivo?: ObjetivoTipo[];
  /** Se nenhuma pessoa servir, cria uma assim. */
  criar?: { traco?: Traco[]; trilha?: string; reino?: number | 'jogador'; objetivo?: ObjetivoTipo; faccao?: string };
  /** Só procura entre pessoas sem papel nenhum (um desconhecido). */
  desconhecido?: boolean;
}
export interface PapelDef {
  pessoa?: PapelPessoa;
  faccao?: { tipo?: string[]; estado?: FaccaoEstado[]; de?: Papel; inimigoDe?: Papel; ferida?: boolean; jogador?: boolean; local?: boolean };
  lugar?: { dono?: Papel; tipo?: string[]; segredo?: boolean; natal?: boolean };
  /** Papel opcional: a cena sai mesmo sem ele (o nome vira texto neutro). */
  opcional?: boolean;
}

export type EfeitoMundo =
  | { opiniao: [Papel, number] }
  | { fato: [Papel, string, number] }
  | { reputacao: [Papel, number] }
  | { objetivo: [Papel, ObjetivoTipo] | [Papel, ObjetivoTipo, Papel] }
  | { morte: Papel; causa?: string }
  | { ferir: Papel }
  | { papel: [Papel, string] }
  | { semPapel: [Papel, string] }
  | { faccao: [Papel, FaccaoEstado] }
  | { levarFaccao: [Papel, string] }
  | { fio: [string, 'abrir' | 'avancar' | 'tocar' | string] }
  | { ambicao: string }
  | { inclinar: [string, number] }
  | { noticia: string }
  | { q: [string, number] }
  | { forca: [Papel, number] }
  | { lugar: [Papel, { perigo?: number; dono?: Papel }] }
  | { reino: [Papel, number] }
  | { trilhaDe: Papel }
  | { reducaoTensao: number };

export interface Res { texto: string; alt?: string[]; efeitos?: EfeitoMundo[]; fx?: Effects }
export interface Teste { tag?: string; stat?: StatKey | StatKey[]; dif?: number; ameaca?: Papel | number }
export interface Opcao {
  id: string;
  texto: string;
  requer?: Cond2;
  selo?: string;
  /** Texto do motivo quando a opção está bloqueada (aparece desabilitada). Sem ele, a opção some. */
  seloBloqueio?: string;
  teste?: Teste;
  custo?: number;
  sucesso?: Res;
  falha?: Res;
  res?: Res;
}
export interface Variante { se?: Cond2; tom?: 'lirico' | 'sombrio' | 'ironico' | 'grave'; texto: string }
export interface TermoRelevancia { se: Cond2; mais: number }
export interface Molde {
  id: string;
  titulo: string;
  tipo: Tipo;
  capitulos: Capitulo[];
  unico?: boolean;
  cooldown?: number;
  /** Variação de tensão ao ocorrer (padrão por tipo). */
  tensao?: number;
  papeis?: Record<Papel, PapelDef>;
  quando?: Cond2;
  relevancia?: TermoRelevancia[];
  cena: string | Variante[];
  opcoes: Opcao[];
  fio?: { id: string; etapa?: number; abre?: boolean; fecha?: string; abandono?: string };
  /** Cena de luta: oponente e cenário do duelo animado. */
  combate?: { oponente?: string; cenario?: string };
}

export const molde = (m: Molde): Molde => m;
