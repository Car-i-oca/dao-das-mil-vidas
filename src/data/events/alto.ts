import type { GameEvent } from '../../types';

/** Reinos altos e eventos de desfecho (expansão). */
export const alto: GameEvent[] = [
  {
    id: 'juizo_do_ceu', title: 'O Juízo do Céu', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 4 },
    text: 'O céu escurece em silêncio. Uma voz sem origem pergunta: "Cultivador, o que fizeste de tua vida?" Cada ato seu parece pairar no ar como um espelho.',
    choices: [
      { text: 'Responder com a verdade, sem enfeites.', check: { stat: 'dao', dif: 3, tag: 'mente' }, ok: { text: 'A voz se cala. Uma luz suave atravessa seu peito: uma bênção do Céu.', fx: { xp: 30, stats: { dao: 3, esp: 1 }, vida: 40, karma: 5 } }, fail: { text: 'O Céu pesa seus erros, que são muitos. Um raio fino cruza seu ombro, apenas um aviso.', fx: { ferida: 3, stats: { dao: 1 } } } },
      { text: 'Recusar-se a responder.', res: { text: 'O silêncio é teimoso. A voz se afasta como quem desiste de uma criança difícil.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'templo_submerso', title: 'O Templo Sob as Ondas', rarity: 'raro', once: true,
    cond: { tierMin: 4 },
    text: 'Em águas calmas, ruínas de um templo brilham sob a superfície. Dizem que um imortal o mergulhou para esconder uma herança dos olhos do Céu.',
    choices: [
      { text: 'Mergulhar e explorar o templo.', check: { stat: ['esp', 'fis', 'comp'], dif: 4 }, ok: { text: 'Corredores de coral, selos antigos e um altar com três itens. Você leva dois e deixa o terceiro para quem vier.', fx: { pedras: 200, item: ['bolsa_celeste', 'pilula_passagem_5'], xp: 25, fama: 10 } }, fail: { text: 'Uma enguia gigante expulsa você do templo. Você emerge com marcas de dentes.', fx: { ferida: 4, xp: 6 } } },
      { text: 'Pedir aos guardiões espirituais, em silêncio, a permissão de entrar.', check: { stat: ['dao', 'car'], dif: 3 }, ok: { text: 'Uma luz azul o acolhe. Os guardiões o deixam passar sem luta e lhe entregam uma relíquia.', fx: { item: ['anel_jade_frio', 'fruta_mil_aromas'], karma: 6, fama: 6 } }, fail: { text: 'Os guardiões o ignoram. Você parte, com respeito e de mãos vazias.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'imortal_exilado', title: 'O Imortal Exilado', rarity: 'lendario', once: true,
    cond: { tierMin: 5 },
    text: 'Um homem de vestes rasgadas senta-se no topo de uma colina. Sua aura é do tamanho do céu, mas está presa em correntes invisíveis. "Fui expulso do Reino Celeste", diz. "Ajude-me a quebrar estes selos."',
    choices: [
      { text: 'Ajudar a quebrar os selos.', check: { stat: ['esp', 'comp', 'dao'], dif: 5, tag: 'formacao' }, ok: { text: 'Três dias de esforço. Os selos se quebram em luz. Em gratidão, o Imortal lhe dá um tesouro: uma lição.', fx: { xp: 40, stats: { esp: 3, comp: 3, dao: 3 }, tecnica: ['sutra_ceu_vazio'], karma: 15, fama: 15 } }, fail: { text: 'Os selos reagem e o expulsam para longe. O Imortal agradece pela tentativa, com um sorriso triste.', fx: { ferida: 4, karma: 6, stats: { dao: 1 } } } },
      { text: 'Recusar: ajudar um exilado pode custar caro.', res: { text: 'O Imortal acena em silêncio, sem rancor. Algum tempo depois, a colina está vazia.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'selo_do_mundo', title: 'O Selo do Mundo', rarity: 'raro', once: true,
    cond: { tierMin: 4 },
    text: 'Numa cordilheira esquecida, um selo gigantesco prende algo sob a terra. Uma rachadura se abriu, e uma voz sussurra por ela. Ninguém sabe o que há embaixo.',
    choices: [
      { text: 'Reforçar o selo com seu Qi.', check: { stat: ['esp', 'comp'], dif: 4, tag: 'formacao' }, ok: { text: 'Por três semanas, você tece o selo de novo. A voz silencia. O mundo dorme um pouco mais seguro.', fx: { karma: 20, fama: 15, stats: { esp: 2, dao: 2 }, xp: 15 } }, fail: { text: 'O selo reage, mas você está cansado demais. Algo sai da rachadura e foge antes que você possa impedir.', fx: { ferida: 3, karma: -3, stats: { dao: 1 } } } },
      { text: 'Ouvir o que a voz tem a dizer.', check: { stat: 'dao', dif: 4, tag: 'mente' }, ok: { text: 'A voz conta uma história do início do mundo. Você a guarda sem acreditar, e sem esquecer.', fx: { stats: { comp: 3, dao: 1 }, xp: 15, corr: 5 } }, fail: { text: 'A voz sussurra o que você mais teme. Você foge, e leva o sussurro consigo.', fx: { corr: 12, ferida: 1 } } },
    ],
  },
  {
    id: 'discipulos_rebeldes', title: 'A Rebeldia dos Discípulos', rarity: 'raro', once: true,
    cond: { tierMin: 3, flags: ['tem_discipulo'] },
    text: 'Seu antigo discípulo discorda de seus métodos. "Mestre, o mundo mudou. Cultivar em silêncio não basta mais." Atrás dele, jovens concordam.',
    choices: [
      { text: 'Ouvir e ajustar o ensino.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'Nem sempre o mestre tem razão. Seus discípulos o admiram ainda mais.', fx: { stats: { car: 2, dao: 2 }, fama: 8, karma: 6 } }, fail: { text: 'A conversa vira discussão. Alguns partem, outros ficam, todos aprendem algo.', fx: { fama: -3, stats: { dao: 1 } } } },
      { text: 'Impor sua autoridade.', res: { text: 'O discípulo baixa a cabeça. A obediência fica, a amizade se vai.', fx: { karma: -4, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'pico_dos_imortais', title: 'O Pico dos Imortais', rarity: 'raro', once: true,
    cond: { tierMin: 5 },
    text: 'Dizem que, acima das nuvens mais altas, há um pico onde antigos imortais deixaram marcas na pedra: golpes, versos, pegadas. Subir é um teste de corpo e de espírito.',
    choices: [
      { text: 'Escalar sem usar Qi, só com o corpo.', check: { stat: ['fis', 'dao'], dif: 5 }, ok: { text: 'No topo, as marcas se tornam lições. Você passa um ano entre elas e desce outro.', fx: { anos: 1, xp: 35, stats: { fis: 3, dao: 3, comp: 1 }, fama: 10 } }, fail: { text: 'A altitude humilha. Você desce antes do fim, aprendendo o peso de cada passo.', fx: { ferida: 2, xp: 10, stats: { dao: 1 } } } },
      { text: 'Subir usando o Qi com cuidado.', check: { stat: ['esp', 'comp'], dif: 3 }, ok: { text: 'Você chega ao topo sem esforço. As marcas são belas, mas parecem ensinar menos.', fx: { xp: 18, stats: { comp: 2 } } }, fail: { text: 'O Qi se dispersa na altitude. Você desce com tontura.', fx: { ferida: 1, xp: 5 } } },
    ],
  },
  {
    id: 'conclave_alquimistas', title: 'O Conclave dos Alquimistas', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, path: ['alquimia'] },
    text: 'Os maiores alquimistas do continente convocam um conclave. O tema: refinar uma pílula capaz de curar a Árvore do Mundo, doente há mil anos.',
    choices: [
      { text: 'Contribuir com a receita que você criou.', check: { stat: 'comp', dif: 5, tag: 'alquimia' }, ok: { text: 'Sua receita é a chave. A Árvore floresce. O mundo inteiro conhece seu nome como ao de um santo.', fx: { fama: 30, pedras: 300, item: ['pilula_longevidade', 'pilula_passagem_5'], stats: { comp: 3, dao: 2 }, xp: 20 } }, fail: { text: 'A receita falha, mas os mestres veem potencial. Você recebe uma bolsa de consolo e um convite.', fx: { fama: 8, pedras: 40, xp: 6 } } },
    ],
  },
  {
    id: 'besta_ancestral', title: 'A Besta Ancestral Desperta', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 4 },
    text: 'O chão treme: uma besta ancestral, de olhos como luas e escamas de montanha, emerge de um lago profundo. Aldeias fogem, e seitas se preparam para guerra.',
    choices: [
      { text: 'Enfrentar a besta ao lado das seitas.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'A batalha dura quatro dias. Quando a besta cai, o chão ainda treme em memória. Seu nome é gravado em pedra.', fx: { fama: 30, item: ['nucleo_besta_alto'], pedras: 150, ferida: 3, stats: { fis: 2, dao: 2 }, xp: 20 } }, fail: { text: 'A besta é grande demais. Você recua com alguns outros, cheio de cicatrizes.', fx: { ferida: 4, fama: 6, xp: 5 } } },
      { text: 'Acalmar a besta com seu Qi.', check: { stat: ['esp', 'car'], dif: 5, tag: 'besta' }, ok: { text: 'Uma pausa. A besta o encara, entende, e volta ao lago. Uma guerra evitada.', fx: { karma: 25, fama: 25, stats: { esp: 3, dao: 3 }, xp: 25 } }, fail: { text: 'A besta não ouve. Você foge, e sua falha vira piada em tabernas.', fx: { ferida: 2, fama: -4 } } },
    ],
  },
  {
    id: 'duelo_de_lenda', title: 'O Duelo com uma Lenda', rarity: 'lendario', once: true,
    cond: { tierMin: 4, tierMax: 7 },
    text: 'Uma lenda viva do continente envia-lhe uma carta: "Dizem que você é digno. Prove-o num duelo de três golpes." Não há como recusar sem perder a face.',
    choices: [
      { text: 'Aceitar e dar tudo em três golpes.', check: { stat: ['fis', 'esp', 'dao'], dif: 6, tag: 'combate' }, ok: { text: 'No terceiro golpe, a lenda sorri e recua um passo. "Ainda é cedo para você, mas o futuro é seu."', fx: { fama: 30, stats: { dao: 4, fis: 2, esp: 2 }, xp: 25, item: ['pilula_passagem_5'] } }, fail: { text: 'Você cai, humilhado, mas vivo. A lenda lhe estende a mão. "Levante-se. Vou lhe mostrar onde errou."', fx: { ferida: 3, stats: { dao: 2, comp: 2 }, xp: 15 } } },
      { text: 'Pedir um ano de preparo.', res: { text: 'A lenda concorda. Em um ano, você estará melhor, ou morto.', fx: { anos: 1, xp: 12, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'cidade_imortais', title: 'A Cidade dos Imortais Fragmentada', rarity: 'raro', cooldown: 120,
    cond: { tierMin: 5 },
    text: 'Pedaços de uma cidade celeste caíram do céu há mil anos e agora flutuam como ilhas. Mercadores ousados negociam entre os fragmentos, e itens raros mudam de mãos por fortunas.',
    choices: [
      { text: 'Comprar uma pílula de rompimento (300 pedras).', custo: 300, res: { text: 'O vendedor sorri e entrega um frasco: um elixir feito para o próximo passo do seu caminho.', fx: { item: ['pilula_passagem_5'] } } },
      { text: 'Vender seus próprios itens aos ricos locais.', res: { text: 'Você faz um bom lucro com itens que não usaria.', fx: { pedras: 160, fama: 3 } } },
      { text: 'Apenas conversar com os mercadores sobre rumores.', res: { text: 'Boatos de reinos que se abrem e de imortais que desaparecem. Muita informação, pouca certeza.', fx: { stats: { comp: 2 }, xp: 12 } } },
    ],
  },

  /* ===== Eventos de desfecho ===== */
  {
    id: 'sacrificio_heroico', title: 'O Dia em Que o Céu Caiu', rarity: 'lendario', once: true, weight: 1.5,
    cond: { tierMin: 3, karmaMin: 10 },
    text: 'Uma calamidade desce sobre uma cidade cheia de mortais: uma tribulação perdida, uma besta fugindo de si mesma, ou uma formação quebrada. Em poucos minutos, milhares morrerão. Só alguém com seu poder poderia absorver o golpe.',
    choices: [
      { text: 'Abrir os braços e absorver a calamidade.', res: { text: 'Uma luz branca atravessa você. Quando ela se extingue, a cidade está intacta e você não está mais lá.', fx: { fim: 'sacrificio' } } },
      { text: 'Tentar conter a calamidade sem se sacrificar.', check: { stat: ['fis', 'esp', 'dao'], dif: 6, tag: 'combate' }, ok: { text: 'Por um fio, você consegue. A cidade vive, e você também, mas para sempre mudado.', fx: { fama: 30, karma: 25, ferida: 4, stats: { dao: 4, esp: 2 } } }, fail: { text: 'Você falha. O golpe cai, e você só tem tempo de proteger metade da cidade.', fx: { fim: 'sacrificio' } } },
      { text: 'Fugir enquanto há tempo.', res: { text: 'Você corre. Atrás, gritos. Eles não o seguem; você os carrega.', fx: { karma: -30, fama: -15, stats: { dao: -3 }, corr: 8 } } },
    ],
  },
  {
    id: 'retiro_eterno', title: 'O Chamado da Montanha', rarity: 'raro', once: true, weight: 1.2,
    cond: { tierMin: 4, ageMin: 100 },
    text: 'Você olha as montanhas ao longe e entende: o mundo já lhe deu tudo o que podia. Resta o silêncio. Algumas lendas dizem que quem se recolhe assim não morre, apenas deixa de ser visto.',
    choices: [
      { text: 'Subir a montanha e nunca mais descer.', res: { text: 'Os pastores veem uma figura entrar nas nuvens. A chuva cai de manhã. Ninguém mais o vê.', fx: { fim: 'eremita' } } },
      { text: 'Ainda não. Há coisas por resolver.', res: { text: 'O chamado espera, paciente como montanha.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'portal_do_vazio', title: 'O Portal do Vazio', rarity: 'lendario', once: true,
    cond: { tierMin: 4 },
    text: 'Entre dois pilares quebrados, o espaço dobra sobre si mesmo. Dentro do portal, não há nada: nem luz, nem escuridão. Quem entra raramente volta, mas os que voltam trazem coisas que não existem aqui.',
    choices: [
      { text: 'Entrar no portal.', check: { stat: ['dao', 'esp'], dif: 5, tag: 'mente' }, ok: { text: 'Você caminha por um tempo sem tempo e retorna carregando um pedaço do Vazio no peito: um novo entendimento do Dao.', fx: { xp: 40, stats: { dao: 5, esp: 3 }, tecnica: ['sutra_ceu_vazio'], vida: 60, fama: 12 } }, fail: { text: 'O Vazio fecha a porta atrás de você. Você caminha para sempre, entre um passo e outro.', fx: { fim: 'vazio' } } },
      { text: 'Estudar o portal sem entrar.', res: { text: 'Você mede, desenha, anota. Três meses depois, o portal se fecha. Você tem apenas notas, e uma estranha saudade.', fx: { stats: { comp: 3, dao: 1 }, xp: 15 } } },
    ],
  },
  {
    id: 'fio_reencarnacao', title: 'O Fio da Reencarnação', rarity: 'raro', once: true, weight: 1.2,
    cond: { tierMin: 3, ageMin: 100, karmaMin: 5 },
    text: 'Numa noite de lua cheia, você vê o fio que o prende ao mundo: dourado, fino, e se estendendo para além. Um espírito de olhos mansos lhe pergunta: "Quer que eu o solte, para que você volte em outra forma?"',
    choices: [
      { text: 'Aceitar a Roda do Samsara.', res: { text: 'O fio se solta com doçura. Você fecha os olhos, sorrindo, e o mundo gira.', fx: { fim: 'reencarnacao' } } },
      { text: 'Recusar. Quero terminar esta vida inteira.', res: { text: 'O espírito acena e se desfaz. O fio permanece, discreto.', fx: { stats: { dao: 2 } } } },
    ],
  },
];
