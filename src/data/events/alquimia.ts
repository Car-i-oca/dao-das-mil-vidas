import type { GameEvent, Place } from '../../types';

const LOCAIS: Place[] = ['selva', 'montanha', 'ruinas', 'deserto', 'gelo', 'mar'];

export const caldeirao: GameEvent = {
  id: 'caldeirao_viagem',
  title: 'Caldeirão e Forja de Campo',
  text: 'Um abrigo abandonado conserva um caldeirão de pedra e uma pequena forja. Com os materiais certos, ainda é possível produzir algo útil.',
  rarity: 'comum',
  weight: 0.6,
  cooldown: 8,
  cond: {
    tierMin: 1,
    tierMax: 7,
    local: LOCAIS,
    itemsAny: ['folha_mana', 'seiva_ardente', 'mineral_antigo', 'perola_marinha'],
  },
  choices: [
    {
      text: 'Refinar uma Pílula Purificadora (Folha de Mana + Seiva Ardente).',
      cond: { itemsAll: ['folha_mana', 'seiva_ardente'] },
      res: {
        text: 'Os ingredientes se fundem numa pílula estável, capaz de aliviar feridas e limpar toxinas.',
        fx: { removeItem: ['folha_mana', 'seiva_ardente'], item: ['pilula_purificadora'] },
      },
    },
    {
      text: 'Forjar uma Lâmina de Minério Antigo (Minério de Ruína + Pérola das Marés).',
      cond: { itemsAll: ['mineral_antigo', 'perola_marinha'] },
      res: {
        text: 'A forja esfria. Uma lâmina equilibrada repousa sobre a bigorna.',
        fx: { removeItem: ['mineral_antigo', 'perola_marinha'], item: ['lamina_bioma'] },
      },
    },
    { text: 'Deixar o caldeirão e a forja para trás.', res: { text: 'Você guarda os materiais para outra ocasião.' } },
  ],
};
