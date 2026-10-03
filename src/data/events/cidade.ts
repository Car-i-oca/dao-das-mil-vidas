import type { GameEvent } from '../../types';

/** Mercados, leilões, associações, romance e vida social. */
export const cidade: GameEvent[] = [
  {
    id: 'leilao_pavilhao', title: 'Leilão do Pavilhão de Tesouros', rarity: 'comum', cooldown: 12,
    cond: { tierMin: 1, tierMax: 6, local: ['cidade'], pedrasMin: 15 },
    text: 'O Pavilhão de Tesouros realiza um leilão mensal. Pílulas, manuais e artefatos passam de mão em mão sob olhares famintos.',
    choices: [
      { text: 'Disputar uma pílula de rompimento (40 pedras).', custo: 40, check: { stat: ['car', 'sor'], dif: 1 }, ok: { text: 'Você vence a disputa por uma pílula rara.', fx: { item: ['pilula_passagem_2'] } }, fail: { text: 'Você é superado por um lance maior, mas recebe parte das pedras de volta.', fx: { pedras: 25 } } },
      { text: 'Comprar um manual de técnica (30 pedras).', custo: 30, res: { text: 'Manual antigo, papel áspero e conteúdo valioso.', fx: { item: ['manual_olho_lotus'] } } },
      { text: 'Apenas observar e aprender os preços.', res: { text: 'Observar é grátis. Você aprende sobre valor, desejo e ganância.', fx: { stats: { car: 1, comp: 1 } } } },
    ],
  },
  {
    id: 'mercado_negro', title: 'A Barraca do Mercado Negro', rarity: 'comum', cooldown: 12,
    cond: { tierMin: 1, tierMax: 6, local: ['cidade'] },
    text: 'No beco mais escuro da cidade, um vendedor sem rosto oferece uma pílula "especial". Seu preço é mais baixo que o razoável.',
    choices: [
      { text: 'Comprar a pílula (25 pedras).', custo: 25, check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'A pílula é legítima e potente. Seu Qi se agita.', fx: { xp: 25, karma: -1 } }, fail: { text: 'A pílula é falsificada e tóxica. Você passa dias doente.', fx: { ferida: 2, xp: -5 } } },
      { text: 'Denunciar o vendedor.', res: { text: 'Os guardas prendem o vendedor e premiam sua coragem.', fx: { karma: 4, fama: 3, pedras: 5 } } },
      { text: 'Ignorar e seguir.', res: { text: 'Mais uma tentação evitada.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'associacao_alquimistas', title: 'Teste da Associação de Alquimistas', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 6, local: ['cidade'], path: ['alquimia'] },
    text: 'A Associação de Alquimistas aplica o exame de graduação. Quem passa recebe um broche, descontos em ervas e acesso ao salão dos mestres.',
    choices: [
      { text: 'Prestar o exame.', check: { stat: 'comp', dif: 2, tag: 'alquimia' }, ok: { text: 'Seu caldeirão arde em perfeição. O examinador sorri e coloca o broche no seu peito.', fx: { fama: 8, pedras: 20, xp: 8, setFlags: ['alquimista_certificado'], stats: { comp: 1 } } }, fail: { text: 'Seu caldeirão explode. O examinador anota a falha, mas observa seu potencial.', fx: { ferida: 1, xp: 3 } } },
    ],
  },
  {
    id: 'cliente_alquimia', title: 'Encomenda de Pílulas', rarity: 'comum', cooldown: 10,
    cond: { tierMin: 1, tierMax: 6, path: ['alquimia'] },
    text: 'Um comerciante poderoso quer um lote de pílulas de Qi. Paga bem e rápido, se você entregar com qualidade.',
    choices: [
      { text: 'Refinar o lote com cuidado.', check: { stat: 'comp', dif: 0, tag: 'alquimia' }, ok: { text: 'Pílulas perfeitas. O comerciante dobra o pagamento.', fx: { pedras: 30, fama: 3, xp: 6 } }, fail: { text: 'Metade do lote falha. O pagamento é reduzido.', fx: { pedras: 10, xp: 3 } } },
      { text: 'Misturar ervas baratas para ganhar mais.', check: { stat: 'car', dif: 1 }, ok: { text: 'Ninguém percebe. O lucro é gordo, o risco é seu.', fx: { pedras: 40, karma: -5 } }, fail: { text: 'O comerciante descobre a fraude e arruína sua reputação.', fx: { fama: -8, karma: -5 } } },
    ],
  },
  {
    id: 'refinar_passagem_1', title: 'Refinar a Pílula da Fundação Serena', rarity: 'raro', cooldown: 30,
    cond: { tierMin: 1, tierMax: 1, path: ['alquimia'], pedrasMin: 20 },
    text: 'Você tem a receita da Pílula da Fundação Serena. Faltam recursos e coragem para tentar o refinamento.',
    choices: [
      { text: 'Refinar com 20 pedras de ingredientes.', custo: 20, check: { stat: 'comp', dif: 1, tag: 'alquimia' }, ok: { text: 'A pílula se forma em luz dourada. Perfeita.', fx: { item: ['pilula_passagem_2'], xp: 5 } }, fail: { text: 'O caldeirão racha. Ingredientes perdidos, orgulho abalado.', fx: { ferida: 1 } } },
    ],
  },
  {
    id: 'refinar_passagem_2', title: 'Refinar a Pílula do Núcleo Luminoso', rarity: 'raro', cooldown: 30,
    cond: { tierMin: 2, tierMax: 2, path: ['alquimia'], pedrasMin: 40 },
    text: 'O Núcleo Luminoso exige ingredientes difíceis. Você tem uma receita parcial e um forno de confiança.',
    choices: [
      { text: 'Refinar com 40 pedras de ingredientes.', custo: 40, check: { stat: 'comp', dif: 2, tag: 'alquimia' }, ok: { text: 'O núcleo brilha como o sol de inverno. Sucesso.', fx: { item: ['pilula_passagem_3'], xp: 6 } }, fail: { text: 'Falha. A fumaça sobe e leva sua esperança consigo.', fx: { ferida: 1 } } },
    ],
  },
  {
    id: 'refinar_passagem_3', title: 'Refinar a Pílula da Alma Tranquila', rarity: 'raro', cooldown: 30,
    cond: { tierMin: 3, tierMax: 3, path: ['alquimia'], pedrasMin: 90 },
    text: 'A Pílula da Alma Tranquila é um desafio de mestre. Requer uma erva de mil anos e fogo estável por sete dias.',
    choices: [
      { text: 'Refinar com 90 pedras de ingredientes.', custo: 90, check: { stat: 'comp', dif: 3, tag: 'alquimia' }, ok: { text: 'No sétimo dia, a pílula nasce. Mestres lendários invejariam sua paciência.', fx: { item: ['pilula_passagem_4'], xp: 8, fama: 6 } }, fail: { text: 'No sexto dia, a chama vacila. Tudo perdido.', fx: { ferida: 2 } } },
    ],
  },
  {
    id: 'encontro_festival', title: 'Lanternas no Rio', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 0, ageMin: 16, noFlags: ['amor_incipiente'], local: ['cidade', 'vilarejo'] },
    text: 'No festival das lanternas, uma pessoa de sorriso calmo solta uma lanterna ao lado da sua. Os olhares se cruzam, e a conversa flui como água.',
    choices: [
      { text: 'Convidar para caminhar à beira do rio.', check: { stat: 'car', dif: -1 }, ok: { text: 'Vocês caminham até o amanhecer. Algo plantado ali pode ou não florescer.', fx: { setFlags: ['amor_incipiente'], stats: { car: 1, dao: 1 }, agenda: [{ event: 'amor_decisao', em: [6, 14] }] } }, fail: { text: 'A conversa trava e a pessoa se afasta, sorrindo educada.', fx: { stats: { car: 1 } } } },
      { text: 'Apenas sorrir e seguir.', res: { text: 'Às vezes, uma lembrança vale mais que um caminho.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'amor_decisao', title: 'O Fio Vermelho', rarity: 'raro', once: true,
    cond: { flags: ['amor_incipiente'] },
    text: 'Anos depois, o amor ainda arde. A pessoa propõe: "Deixe o Dao para trás e viva comigo uma vida simples. Ou me leve consigo. Ou siga só, e eu entenderei."',
    choices: [
      { text: 'Largar o caminho e viver ao lado dessa pessoa.', res: { text: 'Você pendura a espada, o manual e o orgulho. Uma casa pequena vira seu universo.', fx: { fim: 'amor' } } },
      { text: 'Convidar a pessoa para cultivar junto.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'Duas almas, um caminho. A cada rompimento, uma mão segura a sua.', fx: { setFlags: ['companheiro_dao'], stats: { dao: 3, car: 2, esp: 1 }, xp: 12, karma: 3 } }, fail: { text: 'A pessoa aceita, mas o caminho é duro demais. Ela parte meses depois, com um adeus doce.', fx: { stats: { dao: 2 }, xp: 6 } } },
      { text: 'Seguir sozinho.', res: { text: 'A despedida dói. A dor vira lâmina e a lâmina vira clareza.', fx: { stats: { dao: 4, car: -1 }, xp: 10 } } },
    ],
  },
  {
    id: 'comerciar_ervas', title: 'Comércio de Ervas', rarity: 'comum', cooldown: 6,
    cond: { tierMin: 1, tierMax: 5, local: ['cidade'] },
    text: 'Com algumas ervas que você colheu, dá para negociar nas bancas do mercado. O lucro depende da lábia e do momento.',
    choices: [
      { text: 'Negociar com firmeza.', check: { stat: 'car', dif: 0 }, ok: { text: 'Você fecha negócio com margem generosa.', fx: { pedras: 15 } }, fail: { text: 'O comprador percebe sua pressa e paga pouco.', fx: { pedras: 4 } } },
      { text: 'Guardar as ervas para usar.', res: { text: 'Você mastiga as ervas e sente o Qi mais denso.', fx: { xp: 6 } } },
    ],
  },
  {
    id: 'boato_estalagem', title: 'Rumor na Estalagem', rarity: 'comum', cooldown: 10,
    cond: { tierMin: 1, local: ['cidade'] },
    text: 'Na estalagem, entre cerveja e fumaça, um velho bêbado jura saber onde repousa um tesouro: um fragmento de mapa pelo preço de uma rodada.',
    choices: [
      { text: 'Pagar uma rodada (5 pedras).', custo: 5, check: { stat: 'sor', dif: 0 }, ok: { text: 'O mapa parece real. Meses depois, você o decifra e acha algo.', fx: { item: ['mapa_fragmentado'], pedras: 12 } }, fail: { text: 'O velho ri: o mapa é um rabisco. Mas a conversa foi boa.', fx: { stats: { car: 1 } } } },
      { text: 'Ouvir só os boatos.', res: { text: 'Rumores sobre disputas, desaparecimentos e uma estranha pílula. Informação útil.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'cobrador_dividas', title: 'O Cobrador de Dívidas', rarity: 'comum', cooldown: 15,
    cond: { tierMax: 3, origin: ['cla_decadente', 'mercador'], local: ['cidade'] },
    text: 'Um cobrador de dívidas, de barba grisalha e olhos gelados, bate à sua porta. "Seu pai/mãe deixou dívidas. Venho cobrar."',
    choices: [
      { text: 'Pagar parte da dívida (20 pedras).', custo: 20, res: { text: 'O cobrador aceita, resmungando. Uma pedra a menos na mochila.', fx: { karma: 2 } } },
      { text: 'Enfrentá-lo.', check: { stat: ['fis', 'car'], dif: 1, tag: 'combate' }, ok: { text: 'Você mostra que não é presa fácil. O cobrador desiste.', fx: { fama: 3, stats: { dao: 1 } } }, fail: { text: 'O cobrador tem guardas. Você acaba machucado e ainda deve.', fx: { ferida: 2, pedras: -10 } } },
    ],
  },
  {
    id: 'mestre_oculto', title: 'O Mendigo na Esquina', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 5, local: ['cidade'] },
    text: 'Um mendigo com o manto em farrapos pede uma moeda. Seus olhos, por um segundo, parecem imensos como o céu.',
    choices: [
      { text: 'Dar uma pedra espiritual com respeito.', custo: 1, res: { text: 'O mendigo sorri. "Tolo gentil. Tome." Ele toca sua testa e algo se abre. Quando você olha de volta, ele sumiu.', fx: { xp: 25, stats: { dao: 3, comp: 2 }, karma: 5, setFlags: ['tocado_por_mestre'] } } },
      { text: 'Ignorar e seguir.', res: { text: 'Você passa. Um riso baixo ecoa atrás de você.', fx: {} } },
      { text: 'Chutar a cumbuca.', res: { text: 'O mendigo olha para você por um longo instante. Você sente um frio no estômago.', fx: { karma: -6, stats: { sor: -2 } } } },
    ],
  },
  {
    id: 'duelo_de_rua', title: 'Duelo na Praça', rarity: 'comum', cooldown: 10,
    cond: { tierMin: 1, tierMax: 5, local: ['cidade'] },
    text: 'Dois cultivadores se desafiam diante de uma multidão. Um deles aponta para você: "Aquele ali! Quero lutar com aquele!"',
    choices: [
      { text: 'Aceitar o duelo.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você vence com elegância. A multidão aplaude.', fx: { fama: 5, pedras: 10, xp: 5 } }, fail: { text: 'Você é derrotado e passa a noite lambendo as feridas.', fx: { ferida: 2, fama: -2, xp: 2 } } },
      { text: 'Recusar educadamente.', res: { text: 'Alguns riem, mas você mantém a dignidade.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'visitar_clan_ruina', title: 'A Casa dos Ancestrais', rarity: 'comum', once: true,
    cond: { tierMin: 1, origin: ['cla_decadente'], faction: ['cla', 'nenhuma', 'errante', 'seita'] },
    text: 'Você retorna ao {cla}, que antes era grande. Agora o pátio está coberto de ervas daninhas e dois anciãos teimosos tentam manter o nome vivo.',
    choices: [
      { text: 'Reconstruir o clã com seus recursos (60 pedras).', custo: 60, res: { text: 'Telhados consertados, pátio varrido, discípulos jovens. O {cla} respira de novo.', fx: { fama: 10, karma: 6, stats: { car: 2 }, setFlags: ['cla_reconstruido'] } } },
      { text: 'Pegar o legado dos ancestrais e partir.', res: { text: 'Você leva um velho livro e deixa um pedaço de memória.', fx: { xp: 8, stats: { comp: 1 }, karma: -2 } } },
    ],
  },
];
