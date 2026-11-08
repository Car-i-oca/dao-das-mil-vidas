import type { Constitution } from './murim/nomes';
import type { Ending, Flaw, GameEvent, Item, Origin, Path, Talent } from '../../types';
import type { Modo, PacoteModo } from './tipos';
import { MURIM } from './murim';
import { XIANXIA } from './xianxia';

export type { Modo, PacoteModo } from './tipos';

export const MODOS: Modo[] = ['murim', 'xianxia'];
export const MODO_PADRAO: Modo = 'murim';

const PACOTES: Partial<Record<Modo, PacoteModo>> = { murim: MURIM, xianxia: XIANXIA };

const byId = <T extends { id: string }>(a: T[]) => Object.fromEntries(a.map((x) => [x.id, x])) as Record<string, T>;

/** Evento "genérico": repetível e sem nenhuma condição além de reino/idade. */
function isGeneric(e: GameEvent): boolean {
  const c = e.cond;
  if (e.once) return false;
  if (!c) return true;
  return !(c.path || c.origin || c.flags?.length || c.flagsAny?.length || c.local || c.faction || c.item || c.itemsAll?.length || c.itemsAny?.length || c.stat || c.pedrasMin || c.karmaMin || c.karmaMax || c.fameMin || c.corrMin);
}

/** Consultas por id, calculadas uma vez por pacote. */
export interface Indices {
  PATH: Record<string, Path>;
  ORIGIN: Record<string, Origin>;
  TALENT: Record<string, Talent>;
  FLAW: Record<string, Flaw>;
  ITEM: Record<string, Item>;
  ENDING: Record<string, Ending>;
  EVENT: Record<string, GameEvent>;
  CONSTITUTION: Record<string, Constitution>;
  GENERIC_IDS: Set<string>;
}
export type Pacote = PacoteModo & { ix: Indices };

const CACHE = new Map<Modo, Pacote>();

/** Pacote de conteúdo de um modo. Modo ausente (saves antigos) ou desconhecido vale como Murim. */
export function pacoteDe(modo?: Modo): Pacote {
  const id: Modo = modo && PACOTES[modo] ? modo : MODO_PADRAO;
  let p = CACHE.get(id);
  if (!p) {
    const base = PACOTES[id]!;
    const noPath: Path = { id: '', name: 'Sem escola ainda', ladder: base.escadaSemTrilha, desc: 'O estilo marcial ainda será escolhido durante a história.', stats: {} };
    p = {
      ...base,
      ix: {
        PATH: { ...byId(base.trilhas), '': noPath },
        ORIGIN: byId(base.origens), TALENT: byId(base.talentos), FLAW: byId(base.defeitos),
        ITEM: byId(base.itens), ENDING: byId(base.finais), EVENT: byId(base.eventos), CONSTITUTION: byId(base.nomes.constituicoes),
        GENERIC_IDS: new Set(base.eventos.filter(isGeneric).map((e) => e.id)),
      },
    };
    CACHE.set(id, p);
  }
  return p;
}
