import type { GameEvent } from '../../types';

export const mercador: GameEvent[] = [
  {
    id: 'mercador_jade',
    eventType: 'mercador',
    title: 'A Loja sob o Pavilhão de Jade',
    rarity: 'comum',
    once: true,
    weight: 1.2,
    cond: { tierMin: 1 },
    text: 'Sob um pavilhão verde, um mercador abre um estojo de remédios, talismãs e artefatos. "Pedras espirituais em troca de coisas que valem mais do que parecem", diz ele. "Escolha com cuidado; esta banca não espera por ninguém."',
    choices: [
      {
        text: 'Comprar um bálsamo de viagem e tratar os ferimentos.',
        custo: 45,
        res: {
          text: 'O bálsamo arde por um instante e depois esfria a dor. O mercador conta as pedras sem tirar os olhos da estrada.',
          fx: { ferida: -2 },
        },
      },
      {
        text: 'Comprar o manual de exercícios do pavilhão.',
        custo: 90,
        res: {
          text: 'As páginas trazem exercícios simples, mas precisos. Você os pratica até decorar cada movimento.',
          fx: { stats: { fis: 2, comp: 2 } },
        },
      },
      {
        text: 'Comprar o Manto do Discípulo do Núcleo.',
        custo: 180,
        res: {
          text: 'O manto se ajusta aos seus ombros como se esperasse por você. O fio de jade reforça sua presença e firma seu Coração do Dao.',
          fx: { item: ['manto_nucleo'] },
        },
      },
      {
        text: 'Agradecer e seguir viagem sem comprar.',
        res: { text: 'Você guarda as pedras. O mercador fecha o estojo e deseja boa sorte na estrada.' },
      },
    ],
  },
];
