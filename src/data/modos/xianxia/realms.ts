import type { Realm } from '../../../types';

/** Escadas de reinos. O índice é o "tier" (0 = mortal). */
export const LADDERS: Record<string, { name: string; realms: Realm[]; finalName: string; finalChance: number }> = {
  /** Só vale entre o despertar do Qi e a cena de primeiro método (a trilha define a escada de verdade). */
  neutro: {
    name: 'Qi desperto',
    finalName: 'Ascensão',
    finalChance: 0.02,
    realms: [
      { name: 'Mortal', lifespan: 75, years: 0, breakChance: 1 },
      { name: 'Qi Despertado', lifespan: 90, years: 10, breakChance: 0.8 },
    ],
  },
  xianxia: {
    name: 'Escada Xianxia',
    finalName: 'Ascensão',
    finalChance: 0.02,
    realms: [
      { name: 'Mortal', lifespan: 75, years: 0, breakChance: 1 },
      { name: 'Refinamento de Qi', lifespan: 110, years: 10, breakChance: 0.85, titulo: 'Discípulo Externo', poder: 'Seu Qi agora responde ao pensamento: você enxerga o fluxo de energia ao redor.' },
      { name: 'Fundação', lifespan: 170, years: 25, breakChance: 0.6, titulo: 'Discípulo Interno', poder: 'Voar na espada: o chão deixa de ser limite.' },
      { name: 'Núcleo Dourado', lifespan: 260, years: 55, breakChance: 0.5, titulo: 'Ancião', poder: 'O Núcleo se formou: vida mais longa, golpes que racham pedra e uma aura que faz mortais baixarem a cabeça.' },
      { name: 'Alma Nascente', lifespan: 420, years: 110, breakChance: 0.40, tribulation: true, titulo: 'Ancião Supremo', poder: 'Consciência divina: sua percepção cobre uma cidade inteira, e a alma já consegue sair do corpo em viagens curtas.' },
      { name: 'Transformação Divina', lifespan: 680, years: 200, breakChance: 0.32, tribulation: true, titulo: 'Patriarca', poder: 'Transformação divina: avatares, mil formas e uma palavra que move seitas inteiras.' },
      { name: 'Refino do Vazio', lifespan: 1050, years: 380, breakChance: 0.22, tribulation: true, titulo: 'Soberano', poder: 'Atravessar o Vazio: o espaço se dobra e um passo vale mil li. Nasce o seu Domínio.' },
      { name: 'Integração Corporal', lifespan: 1700, years: 700, breakChance: 0.16, tribulation: true, titulo: 'Ser Lendário', poder: 'Corpo e Dao são um só: seu Domínio dobra a realidade dentro de uma montanha.' },
      { name: 'Grande Ascensão', lifespan: 2600, years: 1300, breakChance: 0.12, tribulation: true, titulo: 'Imortal Terrestre', poder: 'A fronteira do Céu: as leis do mundo respondem ao seu desejo. Falta só o último passo.' },
    ],
  },
};
