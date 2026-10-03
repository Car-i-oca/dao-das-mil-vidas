/**
 * Eras do mundo: acontecimentos de escala continental que duram anos e mudam quais eventos aparecem
 * (eventos com `cond.mundo` ganham peso; os genéricos perdem). Cada era tem um evento de abertura
 * (`startEvent`, sorteado só ao começar) e, em algumas, um perigo contínuo (`hazard`) que pode matar.
 */
export interface WorldEra {
  id: string;
  name: string;
  /** Duração em anos. */
  years: [number, number];
  weight: number;
  minTier: number;
  maxTier?: number;
  startEvent: string;
  hazard?: { fim: string; base: number; minTier: number; maxTier: number; text: string };
}

export const WORLDS: WorldEra[] = [
  {
    id: 'guerra_seitas', name: 'Guerra entre Seitas', years: [6, 25], weight: 3, minTier: 1, startEvent: 'mundo_guerra_inicio',
    hazard: { fim: 'guerra', base: 0.02, minTier: 1, maxTier: 4, text: 'Os exércitos de duas seitas se chocaram num desfiladeiro sem nome, e {nome} estava no meio do caminho.' },
  },
  {
    id: 'mare_bestas', name: 'Maré de Bestas', years: [3, 10], weight: 3, minTier: 1, startEvent: 'mundo_mare_inicio',
    hazard: { fim: 'feras', base: 0.018, minTier: 1, maxTier: 5, text: 'A maré de bestas desceu da cordilheira como uma enchente de garras. {nome} ficou para trás, segurando a linha.' },
  },
  { id: 'reino_secreto', name: 'Reino Secreto Aberto', years: [2, 6], weight: 2, minTier: 1, startEvent: 'mundo_reino_inicio' },
  {
    id: 'praga', name: 'Praga', years: [4, 15], weight: 2, minTier: 0, startEvent: 'mundo_praga_inicio',
    hazard: { fim: 'doenca', base: 0.03, minTier: 0, maxTier: 3, text: 'A febre chegou a {vila} e a {nome}, e nenhum chá espiritual foi forte o bastante.' },
  },
  {
    id: 'mudanca_dinastia', name: 'Mudança de Dinastia', years: [5, 20], weight: 2, minTier: 0, startEvent: 'mundo_dinastia_inicio',
    hazard: { fim: 'exilio', base: 0.01, minTier: 0, maxTier: 5, text: 'Com a queda da dinastia, {nome} foi declarado inimigo do novo trono e partiu para um exílio sem volta.' },
  },
  {
    id: 'culto_ascende', name: 'Ascensão do Culto do Demônio Celestial', years: [10, 35], weight: 2, minTier: 2, startEvent: 'mundo_culto_inicio',
    hazard: { fim: 'cacado', base: 0.012, minTier: 2, maxTier: 6, text: 'Os emissários do Culto encontraram {nome} numa estrada vazia, e ninguém ouviu o resto da conversa.' },
  },
  { id: 'festivais', name: 'Era dos Grandes Festivais', years: [5, 15], weight: 2, minTier: 0, startEvent: 'mundo_festivais_inicio' },
  { id: 'cometa', name: 'Ano do Cometa', years: [1, 3], weight: 1.5, minTier: 1, startEvent: 'mundo_cometa_inicio' },
];

export const WORLD: Record<string, WorldEra> = Object.fromEntries(WORLDS.map((w) => [w.id, w]));
