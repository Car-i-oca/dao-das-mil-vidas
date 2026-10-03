import type { GameEvent } from '../../types';

/**
 * Lote 20 — Tribulação com escolhas. O preparo (artefato, formação, corpo, mérito ou consciência) define uma flag
 * `trib_*` que aumenta a chance de sobreviver ao raio e é consumida quando a tribulação acontece (ver tribulationChance).
 */
export const lote20Tribulacao: GameEvent[] = [
  {
    id: 'tribulacao_preparo', title: 'Preparar-se para o Raio', rarity: 'raro', cooldown: 45, weight: 2.4, escala: true,
    cond: { tierMin: 3, tierMax: 7, noFlags: ['trib_artefato', 'trib_formacao', 'trib_corpo', 'trib_merito', 'trib_consciencia'] },
    text: 'Os céus já começam a reunir nuvens sobre o seu pavilhão, ainda longe, ainda baixas. É um aviso, ou uma cortesia: logo que você tentar o próximo reino, a Tribulação cairá. Você tem tempo de se preparar, e cada caminho oferece o seu método.',
    choices: [
      { text: 'Comprar ou forjar um artefato de proteção (150 pedras).', custo: 150, res: { text: 'O artefato, uma cúpula de bronze e jade, vai guardar o seu cume no momento exato em que os raios caírem. Caro, e confiável.', fx: { setFlags: ['trib_artefato'] } } },
      { text: 'Preparar uma formação de dispersão em torno do cume.', cond: { stat: { comp: 22 } }, check: { stat: ['comp', 'esp'], dif: 1, tag: 'formacao' }, ok: { text: 'As linhas de giz e jade formam um para-raios esplêndido. Os trovões, em vez de bater em você, vão bater nos pilares.', fx: { setFlags: ['trib_formacao'], xp: 3, stats: { comp: 1 } } }, fail: { text: 'A formação ficou torta. Ela ajuda, mas só um pouco.', fx: { stats: { comp: 1 } } } },
      { text: 'Temperar o corpo para receber os raios de frente.', cond: { stat: { fis: 22 } }, check: { stat: ['fis', 'dao'], dif: 1, tag: 'corpo' }, ok: { text: 'Semanas de têmpera, de açoites, de suor. O seu corpo, ao final, tem a dureza de uma estátua.', fx: { setFlags: ['trib_corpo'], xp: 3, stats: { fis: 1 } } }, fail: { text: 'O corpo reclama e cede. Você tem alguma proteção, mas menos do que esperava.', fx: { ferida: 1, stats: { fis: 1 } } } },
      { text: 'Apelar ao mérito acumulado: boas ações pesam no céu.', cond: { karmaMin: 10 }, res: { text: 'Você recita, uma a uma, as vidas que ajudou. O céu parece ouvir. Dizem que o raio não gosta de bater em quem é querido.', fx: { setFlags: ['trib_merito'], karma: 2, stats: { dao: 1 } } } },
      { text: 'Fortalecer a alma, para sustentar a consciência sob o trovão.', cond: { stat: { esp: 22 } }, check: { stat: ['esp', 'dao'], dif: 1, tag: 'mente' }, ok: { text: 'A alma se ancora, feito navio no porto. Mesmo que o corpo vacile, a mente não cairá.', fx: { setFlags: ['trib_consciencia'], xp: 3, stats: { esp: 1, dao: 1 } } }, fail: { text: 'A alma não se firma por inteiro, mas a tentativa deixa a mente mais calma.', fx: { stats: { dao: 1 } } } },
      { text: 'Confiar no Dao e esperar o momento.', res: { text: 'Você não prepara nada, e dorme bem. Ou finge que dorme.', fx: { stats: { dao: 1 } } } },
    ],
  },
];
