import type { Path } from '../types';

export const PATHS: Path[] = [
  {
    id: 'sopro', name: 'Caminho do Sopro', ladder: 'xianxia',
    desc: 'Absorver o Qi do Céu e da Terra. Equilibrado, de vida longa e muita compreensão.',
    stats: { esp: 2, comp: 1 }, xpMult: 1.0, tags: ['qi', 'formacao'], tecnica: 'respiracao_nuvem',
  },
  {
    id: 'espada', name: 'Caminho da Espada', ladder: 'murim',
    desc: 'Unir intenção e lâmina. Golpes decisivos e Coração do Dao firme, mas poucos recursos.',
    stats: { fis: 1, dao: 2 }, xpMult: 0.95, tags: ['combate', 'espada'], tecnica: 'espada_orvalho',
  },
  {
    id: 'alquimia', name: 'Caminho da Alquimia', ladder: 'xianxia',
    desc: 'Refinar pílulas e ervas. Cultivo mais lento, mas riqueza, aliados e rompimentos assistidos.',
    stats: { comp: 2, sor: 1 }, xpMult: 0.85, tags: ['alquimia', 'qi'], tecnica: 'caldeirao_calmo',
  },
  {
    id: 'corpo', name: 'Caminho do Corpo', ladder: 'murim',
    desc: 'Temperar ossos, carne e sangue. Resistente e letal em combate, de avanço firme.',
    stats: { fis: 3 }, xpMult: 0.9, tags: ['combate', 'corpo'], tecnica: 'ossos_de_ferro',
  },
  {
    id: 'alma', name: 'Caminho da Consciência', ladder: 'xianxia',
    desc: 'Fortalecer o Mar da Consciência. Percepção afiada e golpes de alma; corpo frágil.',
    stats: { esp: 3, comp: 1, fis: -1 }, xpMult: 0.95, tags: ['mente', 'qi'], tecnica: 'mar_de_consciencia',
  },
  {
    id: 'formacoes', name: 'Caminho das Formações', ladder: 'xianxia',
    desc: 'Arranjos de runas e geomancia. Defesa sublime, ataque lento; precisa de muito estudo.',
    stats: { comp: 3, sor: 1 }, xpMult: 0.9, tags: ['formacao', 'qi'], tecnica: 'selo_primeiro_traco',
  },
  {
    id: 'budista', name: 'Caminho do Mérito', ladder: 'murim',
    desc: 'Compaixão, mérito e corpo sagrado. Coração do Dao firme, resistência a demônios.',
    stats: { dao: 3, fis: 1 }, xpMult: 0.92, tags: ['mente', 'corpo'], tecnica: 'sutra_do_merito',
  },
  {
    id: 'venenos', name: 'Caminho dos Venenos', ladder: 'murim',
    desc: 'Toxinas, antídotos e discrição. Letal e sutil, mas a reputação é suja.',
    stats: { comp: 1, sor: 1, car: -1 }, xpMult: 1.0, tags: ['veneno', 'combate'], tecnica: 'mil_agulhas',
  },
  {
    id: 'bestas', name: 'Caminho das Bestas', ladder: 'xianxia',
    desc: 'Pactos com feras espirituais. Aliados poderosos; sua força cresce com a deles.',
    stats: { esp: 2, car: 1 }, xpMult: 0.95, tags: ['besta', 'qi'], tecnica: 'pacto_da_fera',
  },
  {
    id: 'demoniaca', name: 'Caminho do Sangue', ladder: 'xianxia',
    desc: 'Poder rápido, preço escuro. Avanço veloz, corrupção constante e perseguição.',
    stats: { fis: 2, esp: 1, car: -1 }, xpMult: 1.15, tags: ['demonio', 'combate'], tecnica: 'caminho_do_sangue',
    unlock: 'ach_demonio', startCorr: 12,
  },
];
