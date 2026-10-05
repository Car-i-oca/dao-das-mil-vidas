import type { Place } from '../types';

/** Eventos exclusivos de cada bioma; pesos relativos às outras ocorrências regionais. */
export const REGION_POOLS: Partial<Record<Place, { eventId: string; weight: number }[]>> = {
  selva: [
    { eventId: 'bioma_selva_fera', weight: 1.5 },
    { eventId: 'bioma_selva_coleta', weight: 1.8 },
    { eventId: 'bioma_mercador', weight: 0.45 },
  ],
  montanha: [
    { eventId: 'bioma_montanha_fera', weight: 1.4 },
    { eventId: 'bioma_montanha_coleta', weight: 1.6 },
    { eventId: 'bioma_mercador', weight: 0.4 },
  ],
  ruinas: [
    { eventId: 'bioma_ruinas_fera', weight: 1.3 },
    { eventId: 'bioma_ruinas_coleta', weight: 1.8 },
    { eventId: 'bioma_mercador', weight: 0.35 },
  ],
  deserto: [
    { eventId: 'bioma_deserto_fera', weight: 1.3 },
    { eventId: 'bioma_deserto_coleta', weight: 1.7 },
    { eventId: 'bioma_mercador', weight: 0.55 },
  ],
  gelo: [
    { eventId: 'bioma_gelo_fera', weight: 1.4 },
    { eventId: 'bioma_gelo_coleta', weight: 1.8 },
    { eventId: 'bioma_mercador', weight: 0.35 },
  ],
  mar: [
    { eventId: 'bioma_mar_fera', weight: 1.4 },
    { eventId: 'bioma_mar_coleta', weight: 1.7 },
    { eventId: 'bioma_mercador', weight: 0.6 },
  ],
};
