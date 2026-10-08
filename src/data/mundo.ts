/** Eras históricas globais foram retiradas na nova campanha. Os saves antigos são tolerados. */
export interface WorldEra {
  id: string;
  name: string;
  years: [number, number];
  weight: number;
  minTier: number;
  maxTier?: number;
  startEvent: string;
  hazard?: { fim: string; base: number; minTier: number; maxTier: number; text: string };
}

export const WORLDS: WorldEra[] = [];
export const WORLD: Record<string, WorldEra> = {};
