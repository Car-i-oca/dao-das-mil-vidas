import type { GameEvent } from '../../types';

export const chefeSelva: GameEvent = {
  id: 'chefe_selva_anciao',
  title: 'Chefão: Tigre Ancião das Raízes',
  text: 'Após sobreviver a três encontros na Selva das Feras, o guardião ancestral emerge. A floresta inteira se curva ao seu rugido.',
  rarity: 'lendario',
  once: true,
  cond: { tierMin: 1, tierMax: 7, local: ['selva'], regionalEncounters: { place: 'selva', min: 3 } },
  combate: { oponente: 'chefe_selva', cenario: 'selva', boss: true },
  choices: [
    {
      text: 'Desafiar o guardião e proteger a floresta.',
      check: { stat: ['fis', 'dao'], dif: 3, tag: 'combate' },
      ok: { text: 'O Tigre Ancião cai. Seu núcleo raro e a gratidão da floresta são seus.', fx: { item: ['nucleo_besta_alto'], pedras: 50, fama: 12, reputation: 15 } },
      fail: { text: 'O rugido do guardião estremece a floresta. Você escapa, ferido, antes que o combate se torne fatal.', fx: { ferida: 2, status: [{ id: 'bleeding', turns: 2, potency: 1 }] } },
    },
    { text: 'Recuar sem provocar o guardião.', res: { text: 'Você abandona a clareira; a floresta volta a ficar em silêncio.' } },
  ],
};

export const torneioExterno: GameEvent = {
  id: 'torneio_pavilhao_externo',
  title: 'Torneio do Pavilhão Externo',
  text: 'A seita reúne seus discípulos para uma prova pública. Seu adversário é um cultivador do mesmo reino, que conhece os métodos do pavilhão.',
  rarity: 'raro',
  once: true,
  cond: { tierMin: 1, tierMax: 5, local: ['seita'], faction: ['seita'], sectRank: ['externo'] },
  combate: { oponente: 'rival_seita', cenario: 'seita' },
  choices: [
    {
      text: 'Entrar na arena e disputar o posto de discípulo interno.',
      check: { stat: ['fis', 'comp'], dif: 1, tag: 'combate' },
      ok: { text: 'Você vence seu rival, recebe o reconhecimento dos Anciãos e sobe ao Pavilhão Interno.', fx: { sectRankUp: true, reputation: 12, pedras: 35, fama: 5 } },
      fail: { text: 'Seu rival vence por pouco. Os Anciãos reconhecem seu esforço, mas o posto ainda não é seu.', fx: { ferida: 1, reputation: 2 } },
    },
    { text: 'Assistir ao torneio e treinar para o próximo.', res: { text: 'Você observa os estilos dos outros discípulos e guarda as lições para outra vida.' } },
  ],
};

export const torneioInterno: GameEvent = {
  id: 'torneio_pavilhao_interno',
  title: 'Desafio dos Pavilhões Internos',
  text: 'A disputa reúne os discípulos internos. O campeão será nomeado Ancião e receberá acesso às lojas reservadas da seita.',
  rarity: 'lendario',
  once: true,
  cond: { tierMin: 3, tierMax: 7, local: ['seita'], faction: ['seita'], sectRank: ['interno'] },
  combate: { oponente: 'rival_seita', cenario: 'seita' },
  choices: [
    {
      text: 'Enfrentar o campeão do pavilhão.',
      check: { stat: ['fis', 'dao', 'comp'], dif: 3, tag: 'combate' },
      ok: { text: 'Você vence o campeão. A seita o nomeia Ancião e abre o Pavilhão VIP.', fx: { sectRankUp: true, reputation: 25, pedras: 100, fama: 15 } },
      fail: { text: 'O campeão leva a melhor. Você mantém seu posto, mas terá de voltar mais forte.', fx: { ferida: 2, reputation: 3 } },
    },
    { text: 'Recusar o desafio por enquanto.', res: { text: 'Você retorna ao cultivo, sem perder seu posto atual.' } },
  ],
};

export const lojaVip: GameEvent = {
  id: 'loja_seita_vip',
  title: 'Pavilhão de Tesouros dos Anciãos',
  text: 'Seu rank de Ancião abre as portas da loja reservada. O intendente oferece tesouros de alto grau.',
  rarity: 'raro',
  cooldown: 30,
  eventType: 'mercador',
  cond: { tierMin: 3, local: ['seita'], sectRank: ['anciao'] },
  choices: [
    { text: 'Comprar Contas de Madeira de Trovão.', custo: 100, res: { text: 'O intendente entrega as contas seladas.', fx: { item: ['contas_trovao'] } } },
    { text: 'Comprar uma Pílula de Medula Renovada.', custo: 35, res: { text: 'A pílula é guardada com cuidado em seu estojo.', fx: { item: ['pilula_cura_maior'] } } },
    { text: 'Sair do pavilhão.', res: { text: 'Você fecha o livro de contas e volta ao pátio.' } },
  ],
};
