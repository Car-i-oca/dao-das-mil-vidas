import type { Choice, GameEvent } from '../../../../types';

/** Opção de traço: igual a Choice, mais o perfil de conduta ESCRITO À MÃO (letras de perfil.ts, ex.: 'C2 D'). */
export type OpT = Choice & { p: string };
export type EvT = Omit<GameEvent, 'choices' | 'type'> & { choices: OpT[] };

/** Tudo que um talento, defeito ou origem acrescenta ao Murim. */
export interface ConjuntoTraco {
  /** Cenas próprias. */
  eventos: EvT[];
  /** Opções exclusivas acrescentadas ao FIM de cenas comuns já existentes (id da cena -> opções). */
  opcoes: Record<string, OpT[]>;
}
