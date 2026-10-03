import type { Realm } from '../types';

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
  murim: {
    name: 'Escada Murim',
    finalName: 'Transcendência',
    finalChance: 0.02,
    realms: [
      { name: 'Mortal', lifespan: 75, years: 0, breakChance: 1 },
      { name: 'Terceira Classe', lifespan: 80, years: 6, breakChance: 0.9, titulo: 'Discípulo Externo', poder: 'O Qi desce ao Dantian: os golpes ganham peso, e o corpo deixa de se cansar à toa.' },
      { name: 'Segunda Classe', lifespan: 100, years: 14, breakChance: 0.7, titulo: 'Discípulo Interno', poder: 'Passo leve: correr sobre telhados e cruzar riachos sem molhar as botas.' },
      { name: 'Primeira Classe', lifespan: 130, years: 28, breakChance: 0.55, titulo: 'Mestre de Salão', poder: 'Qi externalizado: lâminas de ar e golpes à distância; seu nome já circula nas tavernas.' },
      { name: 'Mestre de Pico', lifespan: 200, years: 55, breakChance: 0.4, titulo: 'Chefe de Pico', poder: 'Percepção marcial: você sente a intenção de matar antes do golpe nascer.' },
      { name: 'Transcendente', lifespan: 340, years: 100, breakChance: 0.22, tribulation: true, titulo: 'Grão-Mestre', poder: 'Corpo transcendente: veneno e fome obedecem, e um suspiro vira rajada de vento.' },
      { name: 'Além dos Limites', lifespan: 540, years: 190, breakChance: 0.17, tribulation: true, titulo: 'Lenda Viva', poder: 'Além dos limites: o Qi se mistura com o céu e o seu golpe corta montanhas.' },
      { name: 'Lenda Marcial', lifespan: 800, years: 350, breakChance: 0.14, tribulation: true, titulo: 'Santo da Guerra', poder: 'Poucos vivem para contar o que viram. Reis pedem audiência, e a guerra espera pelo seu aceno.' },
    ],
  },
};
