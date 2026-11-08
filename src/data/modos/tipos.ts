import type { Rng } from '../../engine/rng';
import type { Constitution } from './murim/nomes';
import type { Effects, Achievement, Ending, Flaw, GameEvent, Item, Origin, Path, Place, Realm, Root, State, StatKey, Talent } from '../../types';

/** Modo de jogo: cada vida pertence a um modo e usa o pacote de conteúdo dele. */
export type Modo = 'murim' | 'xianxia';

export interface Escada { name: string; realms: Realm[]; finalName: string; finalChance: number }

/** Textos do rompimento de faixa/reino, do gargalo e do treino: o motor é o mesmo, a voz muda por modo. */
export interface Rompimento {
  gargalo: (alvo: string, tribulacao: boolean) => string;
  esperar: string[];
  adiou: string;
  escudoFinal: string;
  escudoRompe: (alvo: string) => string;
  sobreviveu: (alvo: string) => string;
  morreu: (alvo: string) => string;
  ascende: (alvo: string) => string;
  provaCobrou: (alvo: string) => string;
  sucesso: (alvo: string) => string[];
  falha: string[];
  falhaFerida: string[];
  desvioVivo: string;
  desvioMorto: string;
}

export interface Vocabulario {
  atributos: Record<StatKey, string>;
  moral: { good: string; evil: string; order: string; chaos: string };
  /** Prefixo do aviso de mudança moral: "reputação:" ou "alinhamento". */
  moralRotulo: string;
  /** "moedas" ou "pedras espirituais". */
  moeda: string;
  /** Sufixo do progresso na barra: "de treino" ou "de cultivo". */
  progresso: string;
  /** Linha do diário ao subir de faixa/reino. */
  subiu: (nome: string) => string;
  /** Aviso ao mudar de tradição/caminho. */
  alinhamento: (demoniaco: boolean) => string;
  rompimento: Rompimento;
  /** Rótulos de interface que mudam de nome entre os modos. */
  rotulos: { trilha: string; reino: string; reinoResumo: string; facoes: Record<string, string>; criacao: string };
}

export interface Regras {
  /** Quanto cada reino de ameaça soma à dificuldade dos testes. */
  dificuldade: number;
  /** A idade máxima cresce com o reino (`Realm.lifespan`). */
  longevidade: boolean;
  /** Escolher a trilha demoníaca muda o alinhamento e a facção. */
  demoniacaMudaAlinhamento: boolean;
  /** 'classico' sorteia eventos do catálogo; 'v2' usa o mundo com memória e o diretor de história. */
  motor: 'classico' | 'v2';
  /** Evento fixo no começo da vida (o motor v2 não usa). */
  eventoInicial?: string;
  eventoDiaComum: string;
  eventoVidaComum: string;
}

/** Geradores de nomes e aptidões: cada modo tem a sua cultura (coreana no Murim, chinesa no Xianxia). */
export interface Nomes {
  personName: (rng: Rng) => string;
  sectName: (rng: Rng) => string;
  clanName: (rng: Rng) => string;
  villageName: (rng: Rng) => string;
  rollRoot: (rng: Rng) => Root;
  constituicoes: Constitution[];
}

export type Eixo = 'compaixao' | 'violencia' | 'astucia' | 'cautela' | 'ambicao' | 'disciplina' | 'devocao' | 'ganancia';
export interface ReacaoAlcunha {
  id: string; titulo: string;
  /** Pode citar {alcunha}. */
  texto: string;
  opcoes: { texto: string; res: string; fx?: Effects }[];
}
/** Alcunha: o nome que o mundo dá a quem viveu de certo jeito (ver docs/alcunhas.md). */
export interface Alcunha {
  id: string;
  /** Nome no masculino e no feminino. */
  m: string; f: string;
  /** Versão infame (quando a reputação é negativa ou o nome é manchado). */
  infame?: { m: string; f: string };
  /** Um eixo = perfil puro; dois = combinação. Sem eixos, só `feito` vale. */
  eixos?: [Eixo] | [Eixo, Eixo];
  /** Feito concreto lido do estado (flag, fio, trilha...). */
  feito?: (s: State) => boolean;
  /** Pontos extras do feito, para feitos raros que devem vencer (e substituir) alcunhas de perfil. */
  peso?: number;
  trilha?: string[]; talento?: string[]; defeito?: string[];
  /** Eixos que, em excesso, mancham a alcunha. */
  contra?: Eixo[];
  /** Como a história começou a ser contada (entra na cena de nascimento). */
  historia: string;
  /** Parágrafo do epílogo, próprio desta alcunha. */
  epilogo: string;
  /** Dica vaga mostrada no catálogo antes de conquistada. */
  dica: string;
  reacoes: ReacaoAlcunha[];
}

export interface Afinidade { [cat: string]: number | undefined }

export interface PacoteModo {
  id: Modo;
  nome: string;
  subtitulo: string;
  /** Uma linha, mostrada na tela de escolha de modo. */
  resumo: string;
  eventos: GameEvent[];
  /** Quantidade de cenas distintas do modo (eventos no clássico, moldes no v2). */
  cenas: number;
  trilhas: Path[];
  origens: Origin[];
  talentos: Talent[];
  defeitos: Flaw[];
  itens: Item[];
  finais: Ending[];
  conquistas: Achievement[];
  /** Melhorias de Legado (mesmos ids e custos nos dois modos; muda o nome e a descrição). */
  melhorias: readonly { id: string; name: string; desc: string; max: number; cost: number }[];
  checks: Record<string, (s: State, ending?: string) => boolean>;
  pontos: Record<string, number>;
  escadas: Record<string, Escada>;
  /** Escada usada antes de a vida entrar numa trilha. */
  escadaSemTrilha: string;
  marcasVida: Record<string, string>;
  regioes: Partial<Record<Place, { eventId: string; weight: number }[]>>;
  afinidades: Record<string, Afinidade>;
  retiro: { textos: Record<'A' | 'B' | 'C', string[]>; trilha: Record<string, string>; saida: string[] };
  nomes: Nomes;
  vocab: Vocabulario;
  regras: Regras;
  /** Final escolhido quando a vida acaba de velhice. */
  finalDeVelhice: (s: State) => string;
  alcunhas: Alcunha[];
}
