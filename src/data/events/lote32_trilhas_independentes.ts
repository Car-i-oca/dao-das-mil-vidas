import type { GameEvent } from '../../types';

/**
 * Lote 32 — exemplo de uma trilha de poder paralela ao cultivo e de mestres alternativos.
 * O Caminho Demoníaco não troca a trilha principal: cada mestre abre sua própria forma de avanço.
 */
export const lote32TrilhasIndependentes: GameEvent[] = [
  {
    id: 'pd_mestre_alternativo',
    title: 'Duas Sombras, Dois Mestres',
    rarity: 'raro',
    once: true,
    weight: 2,
    cond: { tierMin: 1, alignment: ['demoniaco'], noFlags: ['pd_mestres_apresentados'] },
    text: 'Quando seu alinhamento demoníaco se torna impossível de esconder, duas presenças respondem. Uma voz vem de um anel negro; a outra, de uma urna coberta de cinzas. Ambas oferecem poder sem exigir que você abandone sua trilha de cultivo.',
    choices: [
      {
        text: 'Aceitar os ensinamentos do Mestre da Lua Oca.',
        res: {
          text: 'O velho no anel ensina a esconder a fome dentro do próprio silêncio. Seu método não substitui o Caminho do Sangue: corre ao lado dele, como uma segunda sombra.',
          fx: { alignment: 'demoniaco', master: 'lua_oca', powerPath: 'caminho_demoniaco', powerProgress: 1, corr: 3, setFlags: ['pd_mestres_apresentados'] },
        },
      },
      {
        text: 'Aceitar os ensinamentos da Mestra das Cinzas.',
        cond: { corrMin: 30 },
        res: {
          text: 'A mestra não promete conter sua corrupção. Ensina, em vez disso, a transformá-la em marcas que obedecem à vontade. A nova trilha de poder permanece separada do seu cultivo.',
          fx: { alignment: 'demoniaco', master: 'mestra_cinzas', powerPath: 'caminho_demoniaco', powerProgress: 1, corr: 2, setFlags: ['pd_mestres_apresentados'] },
        },
      },
    ],
  },
  {
    id: 'pd_linguagem_da_sombra',
    title: 'A Linguagem da Sombra',
    rarity: 'raro',
    cooldown: 45,
    weight: 1.4,
    cond: { tierMin: 2, powerPath: ['caminho_demoniaco'], powerProgressMin: 1 },
    text: 'A sombra que acompanha seu cultivo já não imita seus movimentos: espera uma ordem. O ensinamento que você recebeu determina como ela responde.',
    choices: [
      {
        text: 'Observar a sombra e praticar o controle básico.',
        res: {
          text: 'Você aprende a manter a sombra próxima sem deixá-la escolher por você. É um fundamento simples, mas seu.',
          fx: { powerPath: 'caminho_demoniaco', powerProgress: 1, stats: { dao: 1 } },
        },
      },
      {
        text: 'Seguir o silêncio do Mestre da Lua Oca.',
        cond: { master: ['lua_oca'] },
        res: {
          text: 'Você prende a própria intenção num gesto quase invisível. A sombra se move antes do golpe, e volta antes que alguém perceba.',
          fx: { powerPath: 'caminho_demoniaco', powerProgress: 1, stats: { sor: 1, dao: 1 }, setFlags: ['pd_sombra_silenciosa'] },
        },
      },
      {
        text: 'Gravar o selo ensinado pela Mestra das Cinzas.',
        cond: { master: ['mestra_cinzas'] },
        res: {
          text: 'As cinzas formam um selo sobre sua pele. A corrupção pulsa, mas pela primeira vez obedece a um ritmo escolhido por você.',
          fx: { powerPath: 'caminho_demoniaco', powerProgress: 1, corr: -2, stats: { fis: 1, comp: 1 }, setFlags: ['pd_selo_cinzas'] },
        },
      },
    ],
  },
];
