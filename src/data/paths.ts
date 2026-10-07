import type { Path } from '../types';

export const PATHS: Path[] = [
  {
    id: 'sopro', name: 'Caminho do Sopro', ladder: 'xianxia',
    desc: 'Absorver o Qi do Céu e da Terra. Equilibrado, de vida longa e muita compreensão.',
    stats: { esp: 2, comp: 1 },

  },
  {
    id: 'espada', name: 'Caminho da Espada', ladder: 'murim',
    desc: 'Unir intenção e lâmina. Golpes decisivos e Coração do Dao firme, mas poucos recursos.',
    stats: { fis: 1, dao: 2 },

  },
  {
    id: 'alquimia', name: 'Caminho da Alquimia', ladder: 'xianxia',
    desc: 'Refinar pílulas e ervas. Cultivo mais lento, mas riqueza, aliados e rompimentos assistidos.',
    stats: { comp: 2, sor: 1 },

  },
  {
    id: 'corpo', name: 'Caminho do Corpo', ladder: 'murim',
    desc: 'Temperar ossos, carne e sangue. Resistente e letal em combate, de avanço firme.',
    stats: { fis: 3 },

  },
  {
    id: 'alma', name: 'Caminho da Consciência', ladder: 'xianxia',
    desc: 'Fortalecer o Mar da Consciência. Percepção afiada e golpes de alma; corpo frágil.',
    stats: { esp: 3, comp: 1, fis: -1 },

  },
  {
    id: 'formacoes', name: 'Caminho das Formações', ladder: 'xianxia',
    desc: 'Arranjos de runas e geomancia. Defesa sublime, ataque lento; precisa de muito estudo.',
    stats: { comp: 3, sor: 1 },

  },
  {
    id: 'budista', name: 'Caminho do Mérito', ladder: 'murim',
    desc: 'Compaixão, mérito e corpo sagrado. Coração do Dao firme, resistência a demônios.',
    stats: { dao: 3, fis: 1 },

  },
  {
    id: 'venenos', name: 'Caminho dos Venenos', ladder: 'murim',
    desc: 'Toxinas, antídotos e discrição. Letal e sutil, mas a reputação é suja.',
    stats: { comp: 1, sor: 1, car: -1 },

  },
  {
    id: 'bestas', name: 'Caminho das Bestas', ladder: 'xianxia',
    desc: 'Pactos com feras espirituais. Aliados poderosos; sua força cresce com a deles.',
    stats: { esp: 2, car: 1 },

  },
  {
    id: 'demoniaca', name: 'Caminho do Sangue', ladder: 'xianxia',
    desc: 'Poder rápido, preço escuro. Avanço veloz, corrupção constante e perseguição.',
    stats: { fis: 2, esp: 1, car: -1 },


    unlock: 'ach_demonio', startCorr: 12,
  },
];
