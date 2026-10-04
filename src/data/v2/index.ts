import type { Molde } from '../../engine/v2/tipos';
import { INFANCIA } from './moldes/infancia';
import { DESPERTAR } from './moldes/despertar';
import { RIVAL } from './moldes/rival';
import { CLA } from './moldes/cla';
import { SEITA_ARCO } from './moldes/seita';
import { MUNDO } from './moldes/mundo';
import { EXTRAS } from './moldes/extras';
import { SUCESSAO } from './moldes/sucessao';
import { PERIGOS } from './moldes/perigos';
import { HERANCA } from './moldes/heranca';
import { COMPANHEIRO } from './moldes/companheiro';
import { DISCIPULO } from './moldes/discipulo';

/** Todos os moldes da v2 (ver docs/eventos-v2.md). */
export const MOLDES: Molde[] = [...INFANCIA, ...DESPERTAR, ...RIVAL, ...CLA, ...SEITA_ARCO, ...MUNDO, ...EXTRAS, ...SUCESSAO, ...PERIGOS, ...HERANCA, ...COMPANHEIRO, ...DISCIPULO];
