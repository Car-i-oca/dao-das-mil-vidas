import type { Realm } from '../types';

/** Escadas de reinos. O índice é o "tier" (0 = mortal). */
export const LADDERS: Record<string, { name: string; realms: Realm[]; finalName: string; finalChance: number }> = {
  xianxia: {
    name: 'Escada Xianxia',
    finalName: 'Ascensão',
    finalChance: 0.25,
    realms: [
      { name: 'Mortal', lifespan: 75, years: 0, breakChance: 1 },
      { name: 'Refinamento de Qi', lifespan: 110, years: 10, breakChance: 0.85 },
      { name: 'Fundação', lifespan: 170, years: 25, breakChance: 0.6 },
      { name: 'Núcleo Dourado', lifespan: 260, years: 55, breakChance: 0.5 },
      { name: 'Alma Nascente', lifespan: 420, years: 110, breakChance: 0.40, tribulation: true },
      { name: 'Transformação Divina', lifespan: 680, years: 200, breakChance: 0.32, tribulation: true },
      { name: 'Refino do Vazio', lifespan: 1050, years: 380, breakChance: 0.30, tribulation: true },
      { name: 'Integração Corporal', lifespan: 1700, years: 700, breakChance: 0.24, tribulation: true },
      { name: 'Grande Ascensão', lifespan: 2600, years: 1300, breakChance: 0.18, tribulation: true },
    ],
  },
  murim: {
    name: 'Escada Murim',
    finalName: 'Transcendência',
    finalChance: 0.25,
    realms: [
      { name: 'Mortal', lifespan: 75, years: 0, breakChance: 1 },
      { name: 'Terceira Classe', lifespan: 80, years: 6, breakChance: 0.9 },
      { name: 'Segunda Classe', lifespan: 90, years: 14, breakChance: 0.7 },
      { name: 'Primeira Classe', lifespan: 110, years: 28, breakChance: 0.55 },
      { name: 'Mestre de Pico', lifespan: 175, years: 55, breakChance: 0.4 },
      { name: 'Transcendente', lifespan: 290, years: 100, breakChance: 0.28, tribulation: true },
      { name: 'Além dos Limites', lifespan: 460, years: 190, breakChance: 0.24, tribulation: true },
      { name: 'Lenda Marcial', lifespan: 800, years: 350, breakChance: 0.2, tribulation: true },
    ],
  },
};
