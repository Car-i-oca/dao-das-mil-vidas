import type { GameEvent, Place, StatusEffect } from '../../types';

type Biome = {
  id: string;
  place: Place;
  title: string;
  text: string;
  foes: string[];
  material: string;
  gather: string;
  hazard: StatusEffect['id'];
};

const BIOMES: Biome[] = [
  { id: 'selva', place: 'selva', title: 'Rastros na Floresta das Feras', text: 'Entre as raízes, {inimigo} protege uma presa recém-caçada.', foes: ['lobo', 'tigre', 'serpente'], material: 'folha_mana', gather: 'Folhas de mana crescem junto às raízes.', hazard: 'poisoned' },
  { id: 'montanha', place: 'montanha', title: 'Desafio nas Montanhas Sagradas', text: '{inimigo} desce por uma trilha estreita, bloqueando sua passagem.', foes: ['tigre', 'monge', 'dragao'], material: 'seiva_ardente', gather: 'Uma árvore antiga verte seiva ardente na encosta.', hazard: 'burning' },
  { id: 'ruinas', place: 'ruinas', title: 'Ecos das Ruínas Ancestrais', text: 'O chão estremece. {inimigo} desperta entre pedras cobertas de runas.', foes: ['espectro', 'golem', 'assassino'], material: 'mineral_antigo', gather: 'Entre os escombros, você encontra minério ainda marcado por runas.', hazard: 'bleeding' },
  { id: 'deserto', place: 'deserto', title: 'Perseguição no Deserto', text: '{inimigo} surge de uma nuvem de areia e avança sem aviso.', foes: ['bandido', 'serpente', 'tigre'], material: 'sal_escarlate', gather: 'Cristais de sal escarlate brilham sob a areia.', hazard: 'bleeding' },
  { id: 'gelo', place: 'gelo', title: 'Sombra na Planície de Gelo', text: 'Uma silhueta corta a nevasca: {inimigo} farejou seu Qi.', foes: ['lobo', 'espectro', 'tigre'], material: 'flor_gelo', gather: 'Uma flor do gelo silencioso resiste ao vento cortante.', hazard: 'frozen' },
  { id: 'mar', place: 'mar', title: 'Predador das Mil Ilhas', text: 'A água escurece sob o barco. {inimigo} rompe a superfície.', foes: ['serpente', 'dragao', 'lobo'], material: 'perola_marinha', gather: 'Uma pérola das marés ficou presa entre os corais.', hazard: 'poisoned' },
];

export const biomas: GameEvent[] = BIOMES.flatMap((biome) => [
  {
    id: `bioma_${biome.id}_fera`,
    title: biome.title,
    text: biome.text,
    rarity: 'comum',
    weight: 0.8,
    cooldown: 12,
    cond: { tierMin: 1, tierMax: 6, local: [biome.place] },
    combate: { oponentes: biome.foes, cenario: biome.place },
    choices: [
      {
        text: 'Enfrentar a fera com um método.',
        check: { stat: ['fis', 'esp'], tag: 'combate' },
        ok: { text: 'Você vence {inimigo} e recolhe o núcleo deixado para trás.', fx: { item: ['nucleo_besta_baixo'], fama: 1 } },
        fail: { text: 'O confronto termina em retirada; o golpe de {inimigo} deixa uma condição dolorosa.', fx: { ferida: 1, status: [{ id: biome.hazard, turns: 2, potency: 1 }] } },
      },
      { text: 'Evitar o confronto e seguir por outro caminho.', res: { text: 'Você contorna a ameaça sem provocar a fera.' } },
    ],
  },
  {
    id: `bioma_${biome.id}_coleta`,
    title: `Coleta em ${biome.place === 'ruinas' ? 'Ruínas' : biome.place === 'selva' ? 'Floresta' : biome.place === 'montanha' ? 'Montanhas' : biome.place === 'deserto' ? 'Deserto' : biome.place === 'gelo' ? 'Planície de Gelo' : 'Mar'}`,
    text: biome.gather,
    rarity: 'comum',
    weight: 0.9,
    cooldown: 10,
    cond: { tierMin: 1, tierMax: 7, local: [biome.place] },
    choices: [
      {
        text: 'Colher o material com cuidado.',
        check: { stat: ['comp', 'esp'], tag: 'cultivo', dif: 1 },
        ok: { text: 'A coleta é bem-sucedida: você guarda o material sem danificá-lo.', fx: { item: [biome.material], xp: 4 } },
        fail: { text: 'O material se desfaz e sua energia é atingida pelo ambiente.', fx: { ferida: 1, status: [{ id: biome.hazard, turns: 2, potency: 1 }] } },
      },
      { text: 'Deixar o recurso para trás.', res: { text: 'Você prefere não arriscar os meridianos.' } },
    ],
  },
]);

export const biomaMercador: GameEvent = {
  id: 'bioma_mercador',
  title: 'Tenda entre os Biomas',
  text: 'Uma mercadora itinerante oferece suprimentos para a próxima etapa da viagem.',
  rarity: 'raro',
  weight: 0.35,
  cooldown: 24,
  eventType: 'mercador',
  cond: { tierMin: 1, tierMax: 7, local: ['selva', 'montanha', 'ruinas', 'deserto', 'gelo', 'mar'] },
  choices: [
    { text: 'Comprar uma Pílula Purificadora de Campo.', custo: 20, res: { text: 'A mercadora entrega a pílula e guarda as pedras espirituais.', fx: { item: ['pilula_purificadora'] } } },
    { text: 'Comprar uma Lâmina Forjada de Minério Antigo.', custo: 75, res: { text: 'A lâmina muda de mãos; as pedras passam para a mercadora.', fx: { item: ['lamina_bioma'] } } },
    { text: 'Agradecer e continuar a jornada.', res: { text: 'A mercadora recolhe a tenda e deseja uma viagem segura.' } },
  ],
};
