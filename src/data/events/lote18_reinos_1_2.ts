import type { GameEvent } from '../../types';

/**
 * Lote 18 — Reinos 1 e 2 (Refinamento de Qi / Fundação; Terceira Classe / Segunda Classe).
 * Fase da vida: sobreviver. Problemas de recurso mínimo, fome, feras comuns, primeiras rivalidades e o primeiro voo.
 */
export const lote18Reinos12: GameEvent[] = [
  {
    id: 'r1_primeira_pedra', title: 'A Primeira Pedra Espiritual', rarity: 'comum', once: true, weight: 2.5,
    cond: { tierMin: 1, tierMax: 2 },
    text: 'Você encontra, no fundo de um riacho, uma pedra espiritual de baixa qualidade. É do tamanho de um dente, quase sem brilho, mas já vale mais do que tudo que sua família juntou numa vida. Um mercador ambulante, sem perceber, a viu primeiro.',
    choices: [
      { text: 'Guardar a pedra para o cultivo.', res: { text: 'Absorver a pedra leva três dias, e o Qi que ela solta é fino como seda. A sensação dura a vida toda.', fx: { xp: 8, stats: { esp: 1 } } } },
      { text: 'Vender para o mercador e comprar pílulas.', res: { text: 'O mercador paga mal, mas as pílulas valem. Você sai com o dobro do que um aprendiz sonharia.', fx: { pedras: 25, item: ['pilula_qi_menor'] } } },
      { text: 'Dá-la à sua família, que passa fome.', res: { text: 'A mãe chora, o pai vira o rosto para esconder os olhos. Você se vai com a sensação de ter um alicerce.', fx: { karma: 5, stats: { dao: 1, car: 1 } } } },
    ],
  },
  {
    id: 'r1_fome_do_cultivo', title: 'A Fome do Cultivador', rarity: 'comum', cooldown: 30, weight: 1.6,
    cond: { tierMin: 1, tierMax: 2 },
    text: 'O cultivo consome mais do que parecia: você acorda com fome de lobo, tonto, pensando só em comida. A despensa tem arroz para três dias, e o próximo festival está a uma semana.',
    choices: [
      { text: 'Caçar na floresta, perto de casa.', check: { stat: ['fis', 'sor'], dif: 0, tag: 'combate' }, ok: { text: 'Um javali jovem, abatido com orgulho e uma flecha cega. Você come bem, e vende o couro.', fx: { pedras: 12, xp: 3 } }, fail: { text: 'Você volta de mãos vazias, picado de insetos e com um torção no tornozelo.', fx: { ferida: 1 } } },
      { text: 'Pedir comida aos vizinhos, em troca de pequenos serviços.', res: { text: 'Você carrega lenha, conserta um telhado, escuta as queixas de uma viúva. A comida chega, e uma boa fama também.', fx: { karma: 2, fama: 2 } } },
      { text: 'Jejuar e usar o Qi como alimento.', check: { stat: ['dao', 'esp'], dif: 0 }, ok: { text: 'A fome vira clareza. Você dorme pouco, medita muito, e acorda leve.', fx: { xp: 7, stats: { dao: 1 } } }, fail: { text: 'O Qi não substitui o arroz. Você desmaia no chão do pátio.', fx: { ferida: 1, xp: 1 } } },
    ],
  },
  {
    id: 'r1_instrutor_severo', title: 'O Instrutor Severo', rarity: 'comum', cooldown: 40, weight: 1.4,
    cond: { tierMin: 1, tierMax: 2, faction: ['seita'] },
    text: 'O instrutor de plantão tem fama de bater com a vara até nas sombras. Hoje, ele escolhe você como exemplo. "Mostre à turma como se faz", diz, apontando para o poste de treino.',
    choices: [
      { text: 'Fazer o exercício com toda a força que tem.', check: { stat: ['fis', 'dao'], dif: 0 }, ok: { text: 'O poste racha com um estalo. O instrutor ergue uma sobrancelha, que, vindo dele, é um elogio.', fx: { fama: 3, xp: 4, stats: { fis: 1 } } }, fail: { text: 'Seu golpe escorrega, e a vara do instrutor estala nas suas costas.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Pedir ao instrutor para corrigir antes de repetir.', res: { text: 'Ele rosna, mas corrige. Todo o grupo aprende, e você ganha uma reputação de humilde.', fx: { karma: 2, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'r1_fera_na_floresta', title: 'A Fera da Orla da Floresta', rarity: 'comum', cooldown: 25, weight: 1.6, escala: true,
    cond: { tierMin: 1, tierMax: 2 },
    text: 'Uma raposa espiritual de três caudas guarda a orla da floresta, os olhos brilhando de fome e de curiosidade. É forte para você, e esperta demais para fugir sem trama.',
    choices: [
      { text: 'Enfrentá-la com a lâmina.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'combate' }, ok: { text: 'A luta é suja, rápida e cheia de pelos. Você sai arranhado, e com um núcleo pequeno nas mãos.', fx: { pedras: 30, xp: 5, ferida: 1, item: ['nucleo_besta_baixo'] } }, fail: { text: 'A raposa foge, rindo, e leva sua bolsa de petiscos. A humilhação dói mais que as unhas dela.', fx: { ferida: 1, pedras: -10 } } },
      { text: 'Deixar um pouco de carne e passar devagar.', res: { text: 'A raposa cheira, pega, e deixa o caminho livre. Dali em diante, ela o segue, de longe, à distância de uma sombra.', fx: { karma: 2, stats: { sor: 1 } } } },
      { text: 'Voltar por outro caminho.', check: { stat: ['sor', 'comp'], dif: -1, tag: 'fuga' }, ok: { text: 'A floresta tem muitas trilhas. A raposa fica para trás, curiosa e entediada.', fx: { stats: { sor: 1 } } }, fail: { text: 'Todas as trilhas dão no mesmo ponto: o território da raposa.', fx: { ferida: 1 } } },
    ],
  },
  {
    id: 'r1_tarefas_do_patio', title: 'As Tarefas do Pátio', rarity: 'comum', cooldown: 20, weight: 1.6,
    cond: { tierMin: 1, tierMax: 2, faction: ['seita'] },
    text: 'Metade do seu dia vai em varrer, cozinhar e carregar baldes para os anciões. É um trabalho sem glória e sem fim. Alguns discípulos reclamam; outros, em silêncio, parecem tirar algo da rotina.',
    choices: [
      { text: 'Fazer cada tarefa como se fosse treino.', check: { stat: ['dao', 'fis'], dif: -1 }, ok: { text: 'Varrer vira respiração, carregar vira postura. Aos poucos, o pátio inteiro se transforma em seu mestre.', fx: { xp: 6, stats: { dao: 1, fis: 1 } } }, fail: { text: 'Você só consegue cansar. Mas o cansaço, ao menos, é honesto.', fx: { xp: 2 } } },
      { text: 'Trocar tarefas com outros em troca de favores.', res: { text: 'A rede de favores cresce, e você descobre que sabe negociar com gente.', fx: { stats: { car: 1 }, pedras: 6 } } },
      { text: 'Fugir das tarefas para praticar escondido.', check: { stat: ['sor', 'comp'], dif: 0, tag: 'fuga' }, ok: { text: 'Você pratica uma hora por dia, sem ser pego. O progresso vem, e o gosto do proibido, também.', fx: { xp: 7, stats: { sor: 1 } } }, fail: { text: 'O intendente o pega com a boca na botija. A punição é dobrar as tarefas.', fx: { fama: -2, karma: -1 } } },
    ],
  },
  {
    id: 'r1_sono_sem_qi', title: 'O Sono Sem Qi', rarity: 'comum', cooldown: 40, weight: 1.0,
    cond: { tierMin: 1, tierMax: 2 },
    text: 'Numa noite sem lua, você acorda sem sentir o Qi. Nem uma gota. É como perder um sentido, o olfato, o paladar. O Dantian está lá, mudo. Você nunca teve tanto medo.',
    choices: [
      { text: 'Respirar fundo e esperar o Qi voltar.', check: { stat: ['dao', 'esp'], dif: 0 }, ok: { text: 'Depois de horas, o Qi volta, tímido, como um gato desconfiado. Você jura nunca mais tratá-lo como garantido.', fx: { stats: { dao: 2 }, xp: 3 } }, fail: { text: 'O Qi só volta ao meio-dia, e fraco. O dia é inteiro de tontura.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Correr até o instrutor pedir socorro.', res: { text: 'O instrutor ri, e depois pára de rir: um sintoma assim, em jovens, costuma ser sinal de esforço demais. Ele lhe dá uma semana de folga.', fx: { ferida: -1, xp: -2, karma: 1 } } },
    ],
  },
  {
    id: 'r1_mercado_de_pedras', title: 'O Mercado de Pedras Menores', rarity: 'comum', cooldown: 30, weight: 1.2,
    cond: { tierMin: 1, tierMax: 2 },
    text: 'No mercado das pedras menores, barracas vendem fragmentos, pó e cacos de cristal a preço de ouro e de ilusão. Um velho de mãos tortas acena para você: "Esta pedra, para um jovem como você, é um tesouro."',
    choices: [
      { text: 'Pechinchar o preço.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Você consegue metade do preço, e o velho ainda lhe dá uma lição de graça.', fx: { pedras: 12, xp: 2, stats: { car: 1 } } }, fail: { text: 'O velho se ofende e vira as costas. Você perde a pedra, e um pouco de dignidade.', fx: { fama: -1 } } },
      { text: 'Comprar sem discutir.', custo: 15, res: { text: 'A pedra é boa, mas o preço, alto. Você aprende que tudo tem um sobrepreço para quem tem pressa.', fx: { xp: 6 } } },
      { text: 'Observar e aprender a distinguir pedras boas das falsas.', check: { stat: ['comp', 'sor'], dif: 0 }, ok: { text: 'Em uma hora, você distingue três falsificações. O velho, rindo, lhe dá uma pedra de verdade como brinde.', fx: { xp: 5, stats: { comp: 1 }, pedras: 8 } }, fail: { text: 'Você confunde duas pedras e quase leva uma falsa. O velho, caridoso, avisa a tempo.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'r2_primeiro_voo', title: 'O Primeiro Voo', rarity: 'comum', once: true, weight: 3.0,
    cond: { tierMin: 2, tierMax: 3 },
    text: 'Ao tocar o cabo da espada, o Qi dentro de você faz o que antes só os mestres faziam: ergue a lâmina, e você com ela. O chão afasta-se dez palmos, vinte, cem. O vento canta em seus ouvidos e o mundo vira miniatura.',
    choices: [
      { text: 'Voar alto, tão alto quanto o Qi permite.', check: { stat: ['esp', 'comp'], dif: 0 }, ok: { text: 'Do alto, a seita parece um brinquedo. Você ri, e chora, e volta com a lembrança do vento nos dentes.', fx: { xp: 8, stats: { esp: 1, dao: 1 }, setFlags: ['voou_na_espada'] } }, fail: { text: 'O Qi acaba no meio do céu. Você cai, rola, e levanta rindo, com um braço torcido.', fx: { ferida: 1, xp: 4, setFlags: ['voou_na_espada'] } } },
      { text: 'Voar baixo, por cima dos telhados da seita.', res: { text: 'Os discípulos olham, de boca aberta. Você ouve o próprio nome ser dito com assombro, pela primeira vez.', fx: { fama: 6, stats: { car: 1 }, setFlags: ['voou_na_espada'] } } },
      { text: 'Voar até a casa dos seus pais, para mostrá-los.', res: { text: 'A mãe esconde o rosto, o pai solta um assobio, o irmão pequeno pede um passeio. Você leva a todos, um por um.', fx: { karma: 6, fama: 3, setFlags: ['voou_na_espada'], stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'r2_prova_discipulo_interno', title: 'A Prova do Discípulo Interno', rarity: 'comum', once: true, weight: 2.4, escala: true,
    cond: { tierMin: 2, tierMax: 3, faction: ['seita'] },
    text: 'Os discípulos externos mais promissores são testados, a cada dez anos, para entrar na ala interna. A prova tem três partes: uma luta, uma pergunta e uma caminhada na neblina. Os instrutores observam de uma varanda, com olhos de águia.',
    choices: [
      { text: 'Fazer a prova da luta primeiro.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'combate' }, ok: { text: 'Você vence com limpeza e sem excesso. A varanda toma nota.', fx: { fama: 8, xp: 5, stats: { fis: 1 } } }, fail: { text: 'Você cai no primeiro assalto. Os instrutores o mandam voltar em dez anos.', fx: { ferida: 1, fama: -2 } } },
      { text: 'Fazer primeiro a pergunta.', check: { stat: ['comp', 'dao'], dif: 1, tag: 'mente' }, ok: { text: 'A pergunta é um koan. Sua resposta é simples e inesperada. O ancião sorri pela primeira vez no dia.', fx: { fama: 8, xp: 5, stats: { comp: 1, dao: 1 } } }, fail: { text: 'Você responde com ar de quem decorou. O ancião faz uma anotação desfavorável.', fx: { fama: -2, stats: { comp: 1 } } } },
      { text: 'Começar pela caminhada na neblina.', check: { stat: ['sor', 'dao', 'esp'], dif: 1 }, ok: { text: 'A neblina é uma ilusão sutil. Você a atravessa sem tropeçar, ouvindo o próprio coração.', fx: { fama: 8, xp: 5, stats: { dao: 1, sor: 1 } } }, fail: { text: 'Na neblina, você perde a direção, e a alma, por alguns minutos. Sai chorando, sem saber por quê.', fx: { fama: -2, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'r2_missao_perigosa', title: 'A Missão Fora dos Muros', rarity: 'comum', cooldown: 35, weight: 1.6, escala: true,
    cond: { tierMin: 2, tierMax: 3, faction: ['seita'] },
    text: 'A seita lhe entrega um pergaminho de missão: escoltar um mercador de pedras espirituais por três dias de estrada. A recompensa é boa. O mercador sorri demais, e o seu guarda-costas tem olhar de ladrão.',
    choices: [
      { text: 'Aceitar e cumprir a escolta.', check: { stat: ['fis', 'comp'], dif: 1, tag: 'combate' }, ok: { text: 'No segundo dia, o guarda-costas tenta uma emboscada. Você a desfaz, e o mercador, grato, dobra o pagamento.', fx: { pedras: 80, fama: 6, xp: 4 } }, fail: { text: 'A emboscada funciona. O mercador perde parte da carga, e você, o pagamento e um pouco da cabeça.', fx: { ferida: 2, fama: -2 } } },
      { text: 'Recusar a missão: o cheiro está ruim.', res: { text: 'O pergaminho vai para outro discípulo. Semanas depois, você ouve que ele voltou ferido. A sorte, ou o instinto, trabalhou por você.', fx: { stats: { sor: 1, comp: 1 } } } },
    ],
  },
  {
    id: 'r2_rival_do_patio', title: 'O Rival do Pátio', rarity: 'comum', cooldown: 40, weight: 1.4,
    cond: { tierMin: 2, tierMax: 3, faction: ['seita'] },
    text: 'Um discípulo de Fundação começa a cruzar o seu caminho com insistência. Corrige seus golpes em público, imita suas posturas e, no dia seguinte, faz melhor. Ninguém sabe se é rivalidade ou admiração disfarçada.',
    choices: [
      { text: 'Convidá-lo para treinar juntos.', check: { stat: ['car', 'fis'], dif: 0 }, ok: { text: 'A rivalidade vira amizade ríspida. Vocês se tornam o espelho um do outro, e ambos melhoram.', fx: { xp: 6, stats: { fis: 1, dao: 1 }, setFlags: ['rival_amigavel'] } }, fail: { text: 'Ele aceita, e te humilha diante da turma. A rivalidade só cresce.', fx: { fama: -2, stats: { dao: 1 } } } },
      { text: 'Ignorá-lo e treinar no seu ritmo.', res: { text: 'A indiferença o irrita mais que os golpes. Meses depois, ele passa a treinar sozinho, e a estudar você de longe.', fx: { stats: { dao: 1 } } } },
      { text: 'Desafiá-lo para um duelo oficial.', check: { stat: ['fis', 'esp', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você vence, com respeito. Ele aperta a sua mão, e sai com a promessa de voltar mais forte.', fx: { fama: 6, xp: 4, setFlags: ['rival_derrotado'] } }, fail: { text: 'Você perde. A turma ri, e o rival, magnânimo, ajuda você a se levantar.', fx: { fama: -2, ferida: 1, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'r2_biblioteca_interna', title: 'A Biblioteca Interna', rarity: 'comum', cooldown: 50, weight: 1.4,
    cond: { tierMin: 2, tierMax: 3, faction: ['seita'] },
    text: 'Como discípulo interno, você finalmente tem acesso à biblioteca do segundo andar. Há pergaminhos que cheiram a mofo, mapas manchados de vinho, manuais assinados por mestres mortos. Só pode escolher três para ler por mês.',
    choices: [
      { text: 'Escolher manuais da sua trilha.', res: { text: 'Cada pergaminho abre uma janela. Você sai da biblioteca com a cabeça cheia, e o Dao, mais firme.', fx: { xp: 7, stats: { comp: 1, dao: 1 } } } },
      { text: 'Escolher textos de trilhas distintas, para ampliar a visão.', res: { text: 'Você descobre pontes entre caminhos que ninguém liga. Uma ideia, em particular, se acende como lampião.', fx: { xp: 5, stats: { comp: 2 } } } },
      { text: 'Perder-se entre as estantes, sem um plano.', check: { stat: ['sor', 'comp'], dif: 0 }, ok: { text: 'Num canto esquecido, um livro sem título. Dentro, uma técnica, escrita à mão, de um discípulo que desapareceu há séculos.', fx: { tecnica: ['passo_garca'], xp: 6, stats: { sor: 1 } } }, fail: { text: 'Você perde a tarde, e ganha poeira nos pulmões. Mas sai sorrindo, mesmo assim.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'r2_ladrao_de_pilulas', title: 'O Ladrão de Pílulas', rarity: 'comum', cooldown: 45, weight: 1.2,
    cond: { tierMin: 2, tierMax: 3, faction: ['seita'] },
    text: 'Pílulas somem do estoque da seita, uma a cada lua cheia. Os anciões desconfiam de um intendente, de um discípulo e de um fantasma. Numa noite, você vê uma sombra pequena fugir do depósito, com frascos nas mãos.',
    choices: [
      { text: 'Seguir a sombra até o esconderijo.', check: { stat: ['sor', 'comp'], dif: 0, tag: 'fuga' }, ok: { text: 'É uma criança, com a irmã doente nas costas. Você encontra uma forma de ajudá-los sem escândalo.', fx: { karma: 8, fama: 4, stats: { dao: 1, car: 1 } } }, fail: { text: 'A sombra some. Você volta de mãos vazias, e o ladrão continua a agir.', fx: { stats: { comp: 1 } } } },
      { text: 'Denunciar ao ancião responsável.', res: { text: 'O ancião agradece e promete investigar. Semanas depois, o ladrão é pego, e você descobre que ele era, só, uma criança faminta.', fx: { karma: -1, fama: 3 } } },
      { text: 'Ignorar: pílulas são, afinal, só pílulas.', res: { text: 'Você dorme mal, mesmo assim. O depósito continua sendo furtado, e um dia o ladrão não aparece mais.', fx: { karma: -2 } } },
    ],
  },
];
