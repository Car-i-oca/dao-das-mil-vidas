import type { GameEvent } from '../../types';

/**
 * Lote 9 — Identidade das trilhas: cada caminho ganha eventos próprios em vários reinos.
 * Convenções: Sopro (ciclos de respiração e vento), Corpo (têmpera de ossos), Espada (intenção),
 * Consciência (sonhos e espíritos), Formações (arranjos), Mérito (esmola e exorcismo),
 * Venenos (antídotos), Bestas (pacto e evolução) e Sangue (irmãos de sangue, chama negra).
 */
export const lote9Trilhas: GameEvent[] = [
  /* ===== Sopro ===== */
  {
    id: 'sopro_ciclo_do_ano', title: 'Os Quatro Ciclos do Ano', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 5, path: ['sopro'] },
    text: 'Seu método do Sopro segue as estações: inspirar fundo na primavera, reter o ar no verão, soltar devagar no outono, descansar no inverno. Um ano inteiro de respiração é um único fôlego do mundo.',
    choices: [
      { text: 'Seguir o ano à risca, sem pular nenhuma estação.', check: { stat: ['dao', 'comp'], dif: 1, tag: 'qi' }, ok: { text: 'No fim do inverno, você sente o Qi circular sem esforço. O corpo parece uma flauta afinada.', fx: { anos: 1, xp: 20, stats: { esp: 1, dao: 1 } } }, fail: { text: 'No verão, você perde a paciência e pula uma semana. O ciclo sai torto, mas o aprendizado fica.', fx: { anos: 1, xp: 8, stats: { dao: 1 } } } },
      { text: 'Adaptar o método ao seu próprio ritmo.', res: { text: 'Você desvia um pouco do ciclo tradicional e descobre um atalho que ninguém havia anotado.', fx: { xp: 10, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'sopro_mar_de_nuvens', title: 'Cultivando no Mar de Nuvens', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 2, tierMax: 6, path: ['sopro'], local: ['montanha', 'seita'] },
    text: 'Acima da camada de nuvens, o Qi é fino e puro. Respirar ali é como beber água gelada depois de um deserto. Os mais velhos dizem que quem cultiva no mar de nuvens por uma noite ganha o que levaria um ano embaixo.',
    choices: [
      { text: 'Passar a noite em meditação no pico.', check: { stat: ['esp', 'dao'], dif: 2, tag: 'qi' }, ok: { text: 'Ao amanhecer, seus cabelos estão úmidos de orvalho e seus meridianos, cintilando. Um ano de cultivo em uma noite.', fx: { xp: 24, stats: { esp: 2 } } }, fail: { text: 'O frio é demais. Você desce tremendo, com apenas uma fração do ganho.', fx: { xp: 8, ferida: 1 } } },
    ],
  },
  {
    id: 'sopro_tempestade_interna', title: 'A Tempestade Dentro de Você', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, path: ['sopro'] },
    text: 'Seu Qi, acumulado por décadas, se revolta: uma tempestade sem raios dentro do ventre, pressão nos ouvidos, a respiração descompassada. É um teste do método: ou você domina o vento, ou ele domina você.',
    choices: [
      { text: 'Acalmar a tempestade respirando devagar.', check: { stat: ['dao', 'esp'], dif: 3, tag: 'mente' }, ok: { text: 'O vento interior cede, como um cachorro que aprende o dono. Seu Qi sai mais denso e obediente.', fx: { xp: 22, stats: { dao: 3, esp: 1 } } }, fail: { text: 'A tempestade vence por horas. Você vomita sangue claro e desmaia, mas acorda inteiro.', fx: { ferida: 3, xp: 6, stats: { dao: 1 } } } },
      { text: 'Cavalgar a tempestade, usando-a para um avanço.', check: { stat: ['fis', 'esp'], dif: 4 }, ok: { text: 'Você deixa o Qi correr solto e o conduz como um barco no mar bravo. Quando acaba, está num patamar acima.', fx: { xp: 40, stats: { esp: 2, fis: 1 }, ferida: 1 } }, fail: { text: 'A tempestade o joga contra suas próprias costelas. Você se recompõe em semanas.', fx: { ferida: 4 } } },
    ],
  },
  {
    id: 'sopro_mestre_do_vento', title: 'O Mestre do Vento', rarity: 'raro', once: true,
    cond: { tierMin: 4, tierMax: 8, path: ['sopro'] },
    text: 'Um velho cultivador, magro como um galho, senta-se de pernas cruzadas sobre uma folha que flutua num lago. Quando você se aproxima, ele diz: "Seu fôlego é bom. Mas ainda respira como quem tem medo de gastar o ar."',
    choices: [
      { text: 'Pedir para aprender o Ciclo de Cem Respirações.', check: { stat: ['comp', 'esp'], dif: 4, tag: 'qi' }, ok: { text: 'Cem respirações, cada uma diferente. Ao final, seu fôlego tem a largura de um rio.', fx: {  xp: 20, stats: { esp: 2, comp: 1 } } }, fail: { text: 'Você se perde na quadragésima respiração. O velho assente: "Volte em dez anos."', fx: { stats: { dao: 1 } } } },
    ],
  },

  /* ===== Corpo ===== */
  {
    id: 'corpo_tempera_ossos', title: 'A Têmpera dos Ossos', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 5, path: ['corpo'] },
    text: 'Seu mestre de corpo lhe entrega um bastão de madeira dura e uma árvore de ferro. "Bata. Cada golpe que devolver dor é um osso a mais. Cada osso que não rachar é um passo."',
    choices: [
      { text: 'Bater no tronco até os braços adormecerem.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'corpo' }, ok: { text: 'Semanas de golpes. Os ossos dos antebraços endurecem, os nós dos dedos viram pedra.', fx: { stats: { fis: 2, dao: 1 }, xp: 10 } }, fail: { text: 'Você racha um osso do dedo. A dor ensina o limite, mas custa tempo.', fx: { ferida: 2, stats: { fis: 1 }, xp: 4 } } },
      { text: 'Treinar com moderação, respeitando o descanso.', res: { text: 'Mais devagar, mais seguro. Um corpo bem cuidado dura mais que um corpo castigado.', fx: { stats: { fis: 1 }, xp: 8 } } },
    ],
  },
  {
    id: 'corpo_nascente_mineral', title: 'A Nascente Mineral', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 2, tierMax: 6, path: ['corpo', 'budista'], pedrasMin: 20 },
    text: 'Numa gruta quente, uma nascente de água amarelada, cheia de minerais, borbulha a mais de quarenta graus. Dizem que imergir nela, com pó de osso de besta dissolvido, forja a carne como aço.',
    choices: [
      { text: 'Pagar pelo banho e pelo pó de osso (20 pedras).', custo: 20, check: { stat: ['fis', 'dao'], dif: 2, tag: 'corpo' }, ok: { text: 'Duas horas de ardência. Ao sair, a pele está vermelha, a carne rija, e uma força nova pulsa nos músculos.', fx: { stats: { fis: 3 }, ferida: -2, xp: 10 } }, fail: { text: 'O calor é demais. Você sai antes da hora, tonto, com poucos ganhos.', fx: { stats: { fis: 1 }, ferida: 1 } } },
    ],
  },
  {
    id: 'corpo_touro_espiritual', title: 'O Touro de Chifres de Ferro', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['corpo'] },
    text: 'Num platô de pedra, um touro de pelagem cor de ferrugem e chifres cinzentos bate o casco. É uma fera espiritual de força bruta, e o mestre de corpo da região desafia seus aprendizes a domá-lo com as próprias mãos.',
    choices: [
      { text: 'Segurar os chifres e lutar com o touro.', check: { stat: ['fis', 'dao'], dif: 4, tag: 'corpo' }, ok: { text: 'Uma luta de quarenta minutos, suor, barro, grunhidos. Quando o touro se rende, o platô inteiro aplaude. Você ganha um bastão feito de seu chifre.', fx: { item: ['bastao_ferro_frio'], stats: { fis: 3, dao: 1 }, fama: 6 } }, fail: { text: 'O touro o arremessa por cima da cerca. Você acorda com o rosto cheio de terra e o orgulho machucado.', fx: { ferida: 3, stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'corpo_pele_de_bronze', title: 'A Pele Que Vira Bronze', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, path: ['corpo'] },
    text: 'Depois de décadas de treino, sua pele começa a escurecer e brilhar como bronze polido. Um mestre idoso, de braços cobertos de cicatrizes antigas, diz: "É o corpo respondendo ao método. Agora, comece a aprender o resto."',
    choices: [
      { text: 'Treinar o Corpo de Bronze por três anos.', check: { stat: ['fis', 'dao'], dif: 4, tag: 'corpo' }, ok: { text: 'Três anos de espancamento disciplinado. Sua pele agora aguenta golpes que quebrariam tijolos.', fx: { anos: 3,  stats: { fis: 3 }, xp: 14 } }, fail: { text: 'Você se machuca nas primeiras semanas e perde parte do progresso. Mas aprende o ritmo certo.', fx: { anos: 1, ferida: 3, stats: { fis: 1, dao: 1 }, xp: 6 } } },
    ],
  },

  /* ===== Espada ===== */
  {
    id: 'espada_corte_da_folha', title: 'Cortar a Folha Sem Tocar o Ramo', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 4, path: ['espada'] },
    text: 'Seu mestre de espada manda você cortar uma folha que cai, no ar, sem tocar o ramo de onde ela veio. "Quem não separa o inútil do necessário nunca vai separar nada."',
    choices: [
      { text: 'Treinar o corte, folha por folha, durante meses.', check: { stat: ['dao', 'fis'], dif: 1, tag: 'espada' }, ok: { text: 'Um dia, a folha cai em duas metades limpas, e o ramo balança de leve, sem um arranhão. O mestre sorri pela primeira vez.', fx: { stats: { dao: 2, fis: 1 }, xp: 10 } }, fail: { text: 'Os cortes saem tortos, e o ramo perde duas folhas por teimosia. Mas há progresso.', fx: { stats: { dao: 1 }, xp: 5 } } },
    ],
  },
  {
    id: 'espada_duelo_na_neve', title: 'O Duelo na Neve', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['espada'] },
    text: 'Num vale coberto de neve, um espadachim solitário o espera, a lâmina cravada no chão, sem sinais de ódio. "Um duelo sem plateia, sem apostas, sem razão. Só para ver quem somos."',
    choices: [
      { text: 'Aceitar o duelo.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'espada' }, ok: { text: 'A neve cai em silêncio, e as lâminas cantam. No fim, ambos sangram, ambos sorriem. Uma amizade nasce sem palavras.', fx: { stats: { dao: 3, fis: 1 }, fama: 6, xp: 14 } }, fail: { text: 'Você perde, e o espadachim estende a mão para levantá-lo. "Volte em três anos."', fx: { ferida: 3, stats: { dao: 2 }, xp: 6 } } },
      { text: 'Recusar o duelo e sentar-se ao lado dele, em silêncio.', res: { text: 'Duas lâminas, um frio, nenhuma luta. Horas depois, ele diz "obrigado" e some na névoa.', fx: { stats: { dao: 3 }, karma: 3 } } },
    ],
  },
  {
    id: 'espada_tumba_de_espadas', title: 'O Cemitério das Espadas', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, path: ['espada'] },
    text: 'Num vale de névoa permanente, milhares de lâminas, de todas as eras, estão cravadas no solo como uma floresta de aço. Cada uma guarda a memória de um espadachim. Dizem que apenas uma, a que escolher você, aceita ser levada.',
    choices: [
      { text: 'Caminhar pelo cemitério e aguardar ser escolhido.', check: { stat: ['dao', 'esp'], dif: 4, tag: 'espada' }, ok: { text: 'Após três dias de caminhada, uma lâmina vibra e salta do chão ao seu lado. Ela guarda a memória de um mestre que nunca perdeu um duelo.', fx: { item: ['lamina_vento_sul'], stats: { dao: 2 }, xp: 12, fama: 4 } }, fail: { text: 'Nenhuma lâmina se mexe. Você parte de mãos vazias, mas com a sensação de ter sido observado.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'espada_intencao', title: 'A Intenção Antes da Lâmina', rarity: 'raro', once: true,
    cond: { tierMin: 4, tierMax: 8, path: ['espada'] },
    text: 'Seu mestre antigo aparece no portão, mais velho, de cabelos brancos. "Você já corta tudo o que vê. Agora aprenda a cortar o que não vê: a intenção do inimigo, antes de ele erguer a lâmina."',
    choices: [
      { text: 'Treinar a Intenção da Lâmina com o mestre.', check: { stat: ['dao', 'comp'], dif: 5, tag: 'espada' }, ok: { text: 'Meses de treino de olhos fechados. Quando abre os olhos, você já sabe onde cada golpe vai cair, antes de ele nascer.', fx: {  stats: { dao: 3, comp: 1 }, xp: 18 } }, fail: { text: 'A intenção escapa como fumaça. O mestre diz que ainda não é a hora, e sorri.', fx: { stats: { dao: 2 } } } },
    ],
  },

  /* ===== Consciência ===== */
  {
    id: 'alma_sonho_lucido', title: 'O Sonho Que Você Governa', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 6, path: ['alma'] },
    text: 'Num sonho, você percebe que está sonhando. Cada coisa obedece a um pensamento seu. Pode voar, mudar a cor do céu, conversar com versões suas de outras idades.',
    choices: [
      { text: 'Usar o sonho para treinar o Mar da Consciência.', check: { stat: ['esp', 'comp'], dif: 1, tag: 'mente' }, ok: { text: 'Cada pensamento disciplinado no sonho vira firmeza na vigília. Você acorda mais claro que dormiu.', fx: { xp: 12, stats: { esp: 2 } } }, fail: { text: 'O sonho escorrega, e você acorda confuso. Fica a sensação de ter perdido uma noite.', fx: { xp: 3 } } },
      { text: 'Aproveitar o sonho para descansar e brincar.', res: { text: 'Nem tudo precisa render. Você acorda leve, de bom humor, e com vontade de cantar.', fx: { stats: { car: 1, dao: 1 }, ferida: -1 } } },
    ],
  },
  {
    id: 'alma_espirito_visitante', title: 'O Espírito Que Pede Ajuda', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, path: ['alma'] },
    text: 'Seu Mar da Consciência se abre sozinho. Do outro lado, um espírito vagante, de olhos fundos, sussurra: "Você é um dos poucos que me ouve. Morri sem terminar uma coisa. Ajude-me, e eu lhe ensino o que sei."',
    choices: [
      { text: 'Ouvir o espírito e ajudá-lo.', check: { stat: ['esp', 'dao'], dif: 3, tag: 'mente' }, ok: { text: 'O espírito conta a história: uma carta que nunca chegou. Você a entrega a uma neta distante. Ele sorri e se dissolve em luz, deixando uma lição.', fx: { karma: 12, stats: { esp: 3, comp: 1 }, xp: 14 } }, fail: { text: 'A tarefa é difícil e o espírito se perde antes de terminar. Você sente um aperto, e o aprendizado de que nem tudo se resolve.', fx: { karma: 4, stats: { esp: 1 } } } },
      { text: 'Expulsar o espírito do seu mar.', res: { text: 'O espírito uiva e se dissolve. O mar se acalma, e você sente um peso estranho no peito.', fx: { karma: -4, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'alma_selo_consciencia', title: 'O Selo da Consciência', rarity: 'raro', once: true,
    cond: { tierMin: 4, tierMax: 8, path: ['alma'] },
    text: 'Depois de décadas de meditação, você vislumbra, no fundo do mar, um selo de luz antiga. Quem o ler e dominar, dizem, poderá ver e agir sobre almas alheias.',
    choices: [
      { text: 'Mergulhar até o selo e lê-lo.', check: { stat: ['esp', 'dao', 'comp'], dif: 6, tag: 'mente' }, ok: { text: 'Palavras, símbolos, uma gramática inteira de almas. Quando você volta, sabe usar o selo.', fx: {  stats: { esp: 3, dao: 1 }, xp: 22 } }, fail: { text: 'O selo reage com uma pressão esmagadora. Você sai tonto, mas guardou uma pista.', fx: { ferida: 3, stats: { esp: 1 }, xp: 6 } } },
    ],
  },

  /* ===== Formações ===== */
  {
    id: 'formacao_labirinto_serra', title: 'O Labirinto da Serra', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['formacoes'] },
    text: 'Bandidos infestam uma passagem da serra e a vila vizinha lhe pede ajuda. Você pode desenhar uma formação de labirinto: o mesmo caminho, repetido, até quem entra desistir.',
    choices: [
      { text: 'Desenhar o labirinto com pedras e estacas, em uma semana.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'formacao' }, ok: { text: 'Os bandidos entram e giram por dias, até se renderem, famintos e exaustos. A vila o recompensa com honra e pedras.', fx: { fama: 8, pedras: 60, karma: 4, stats: { comp: 2 } } }, fail: { text: 'O labirinto funciona só pela metade. Os bandidos escapam, mas desistem de voltar.', fx: { fama: 2, pedras: 20, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'formacao_no_do_veio', title: 'O Nó do Veio Rompido', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 3, tierMax: 7, path: ['formacoes'] },
    text: 'Uma seita pequena pede sua ajuda: a formação que canaliza o veio espiritual da montanha rompeu um nó, e metade dos discípulos vem sofrendo de falta de Qi. Dois dias de estudo bastam para perceber o defeito, mas o conserto exige delicadeza.',
    choices: [
      { text: 'Consertar o nó, cobrando um preço justo.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'formacao' }, ok: { text: 'Com três traços novos, o veio volta a fluir. A seita agradece com pedras e hospitalidade.', fx: { pedras: 80, fama: 5, stats: { comp: 1 } } }, fail: { text: 'O conserto cria um novo defeito, menor. A seita agradece mesmo assim, e paga menos.', fx: { pedras: 25, fama: 1, stats: { comp: 1 } } } },
      { text: 'Consertar de graça, por solidariedade.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'formacao' }, ok: { text: 'A formação volta ao normal. Uma discípula lhe entrega um cristal de formação, o único tesouro que a seita tinha.', fx: { item: ['cristal_formacao'], karma: 8, stats: { comp: 1, car: 1 } } }, fail: { text: 'Falha parcial. A seita agradece o esforço, e você sai com a sensação de dívida.', fx: { karma: 3 } } },
    ],
  },
  {
    id: 'formacao_torneio_mestres', title: 'O Torneio dos Mestres de Formação', rarity: 'raro', once: true,
    cond: { tierMin: 4, tierMax: 8, path: ['formacoes'] },
    text: 'Uma vez por século, mestres de formação de todo o continente se reúnem num torneio: cada um desenha um arranjo, e os outros tentam quebrá-lo. O vencedor ganha um tratado antigo.',
    choices: [
      { text: 'Inscrever-se e desenhar sua melhor formação.', check: { stat: ['comp', 'esp', 'dao'], dif: 6, tag: 'formacao' }, ok: { text: 'Seu Labirinto das Mil Voltas resiste a nove desafiantes. O tratado antigo é seu, com um método que muda sua compreensão.', fx: {  fama: 14, stats: { comp: 3 }, xp: 18 } }, fail: { text: 'Sua formação cai na quinta rodada. Mas as notas que você tira dos outros valem um tratado.', fx: { fama: 4, stats: { comp: 2 }, xp: 10 } } },
    ],
  },

  /* ===== Mérito (budista) ===== */
  {
    id: 'budista_esmola_do_dia', title: 'A Ronda da Esmola', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 5, path: ['budista'] },
    text: 'Antes do amanhecer, você sai com a tigela de esmola. Come apenas o que os outros lhe dão, e recebe tanto desprezo quanto bênção. Cada porta é uma lição de desapego, ou de humildade.',
    choices: [
      { text: 'Fazer a ronda em silêncio, aceitando o que vier.', res: { text: 'Uma mulher lhe dá arroz e um sorriso. Um homem fecha a porta na sua cara. O estômago e o espírito aprendem a esperar.', fx: { stats: { dao: 2 }, karma: 4, xp: 6 } } },
      { text: 'Doar a metade do que recebeu a quem tem menos.', res: { text: 'Sobra pouco. Mas o pouco, repartido, tem sabor de banquete.', fx: { karma: 8, stats: { dao: 1, car: 1 } } } },
    ],
  },
  {
    id: 'budista_demonio_no_templo', title: 'O Demônio Que Veio Rezar', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, path: ['budista'] },
    text: 'Uma mulher de véu cinzento pede abrigo no templo. A cada oração, uma sombra se alonga atrás dela. Os monges se calam. Você percebe: o demônio quer se redimir, mas não sabe como.',
    choices: [
      { text: 'Orar ao lado dela e guiá-la na purificação.', check: { stat: ['dao', 'esp'], dif: 4, tag: 'mente' }, ok: { text: 'Três noites de mantras. A sombra se dissolve como fumaça num dia ventoso. Ela ajoelha-se aos seus pés, chorando, e ganha um novo nome.', fx: { karma: 16, stats: { dao: 3 }, fama: 4, xp: 12 } }, fail: { text: 'A sombra se agita, e a mulher foge antes do amanhecer. Fica uma sensação amarga de ter chegado perto.', fx: { karma: 4, stats: { dao: 1 } } } },
      { text: 'Expulsar o demônio do templo.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'A mulher se desfaz em fumaça, com um grito que não se parece com ódio. O templo está salvo; sua consciência, em pedaços.', fx: { karma: -4, fama: 4, stats: { dao: 1 } } }, fail: { text: 'A mulher escapa e some na floresta. O templo permanece em alerta por meses.', fx: { ferida: 2, fama: -2 } } },
    ],
  },
  {
    id: 'budista_coracao_diamante', title: 'O Sutra do Coração de Diamante', rarity: 'raro', once: true,
    cond: { tierMin: 4, tierMax: 8, path: ['budista'] },
    text: 'Um abade centenário, cego e sorridente, entrega a você um rolo de seda e uma pergunta: "Este sutra diz que tudo é ilusão, inclusive o sutra. Consegue lê-lo sem acreditar nele, e sem deixar de acreditar?"',
    choices: [
      { text: 'Ler o sutra, com a mente aberta e leve.', check: { stat: ['dao', 'esp', 'comp'], dif: 5, tag: 'mente' }, ok: { text: 'As letras se dissolvem no papel e se recompõem na sua mente. O abade ri, e você ri junto, sem saber por quê.', fx: {  stats: { dao: 4, esp: 1 }, xp: 20 } }, fail: { text: 'As letras ficam só letras. O abade pega o rolo de volta, com doçura: "Quem sabe numa próxima vida."', fx: { stats: { dao: 2 } } } },
    ],
  },

  /* ===== Venenos ===== */
  {
    id: 'veneno_antidoto_universal', title: 'A Busca do Antídoto Universal', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['venenos'] },
    text: 'Todo envenenador sonha com o antídoto universal: uma fórmula que desfaça qualquer toxina. Quase todos morrem tentando. Você reuniu as ervas, os minerais e a coragem. Falta a última etapa, que é prová-lo em si mesmo.',
    choices: [
      { text: 'Tomar três venenos distintos e testar o antídoto.', check: { stat: ['comp', 'fis', 'dao'], dif: 4, tag: 'veneno' }, ok: { text: 'Três dias de agonia. Quando a febre cede, você está vivo, com um frasco de líquido claro e um novo respeito pela vida.', fx: { item: ['frasco_antidotos'], stats: { comp: 2, fis: 1 }, xp: 12 } }, fail: { text: 'O antídoto falha em dois dos três venenos. Você sobrevive por sorte, e por uma pílula de emergência.', fx: { ferida: 4, stats: { comp: 1 } } } },
      { text: 'Testar em um rato primeiro. E em outro. E em outro.', res: { text: 'Você perde quarenta ratos e muitas semanas, mas aprende o limite de cada composto. A paciência vale um antídoto.', fx: { anos: 1, stats: { comp: 2 }, xp: 8 } } },
    ],
  },
  {
    id: 'veneno_banquete_do_barao', title: 'O Banquete do Barão', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['venenos'] },
    text: 'Um barão tirano oferece um banquete para cem convidados. Uma delegação de vítimas de suas leis pede em segredo: "Você é a única pessoa que pode agir sem ser notada. Basta uma gota no vinho do anfitrião."',
    choices: [
      { text: 'Envenenar o barão no banquete.', check: { stat: ['comp', 'sor'], dif: 3, tag: 'veneno' }, ok: { text: 'O barão cai durante o brinde final. Ninguém desconfia. A região respira, e suas mãos carregam um peso novo.', fx: { fama: 6, karma: -8, pedras: 100, corr: 3 } }, fail: { text: 'O barão tem um provador. A trama é descoberta, e você foge por três dias.', fx: { ferida: 3, fama: -6, karma: -4 } } },
      { text: 'Recusar o pedido e sugerir uma via legal.', res: { text: 'A delegação se desilude, mas aceita seu conselho. Anos depois, o barão cai por escândalos, sem uma gota de veneno.', fx: { karma: 8, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'veneno_mestre_antidotos', title: 'O Mestre dos Antidotos', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, path: ['venenos'] },
    text: 'Uma velha boticária, famosa por nunca ter perdido um paciente para qualquer toxina, convida você ao seu laboratório: "Quem conhece o veneno tão bem quanto você deveria conhecer também o antídoto."',
    choices: [
      { text: 'Aprender os Antídotos com a boticária.', check: { stat: ['comp', 'dao'], dif: 3, tag: 'veneno' }, ok: { text: 'Dois anos aprendendo a desfazer o que você sabe fazer. A boticária lhe entrega seu caderno, e uma bênção.', fx: { anos: 2,  stats: { comp: 2, dao: 1 }, xp: 12 } }, fail: { text: 'A boticária se cansa dos erros e o dispensa, mas com um frasco e uma dica.', fx: { item: ['antidoto_sete_ervas'], stats: { comp: 1 } } } },
    ],
  },

  /* ===== Bestas ===== */
  {
    id: 'bestas_ninhada_de_lobos', title: 'A Ninhada de Lobos de Prata', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 5, path: ['bestas'] },
    text: 'Numa toca, três filhotes de lobo de prata, com a mãe morta por caçadores, choramingam de fome. Um deles tem uma mancha de luar no focinho. Seu pacto de bestas pode chamar um deles, mas só um.',
    choices: [
      { text: 'Estabelecer um pacto com o filhote da mancha de luar.', check: { stat: ['esp', 'sor'], dif: 1, tag: 'besta' }, ok: { text: 'O filhote pula no seu colo, lambe seu rosto e sela o laço. Um irmão de alma, e logo, um companheiro de batalhas.', fx: { setFlags: ['besta_companheira'], karma: 6, stats: { esp: 1, sor: 1 }, agenda: [{ event: 'besta_companheira_cresce', em: [8, 18] }] } }, fail: { text: 'O filhote o morde e foge. Mas os outros dois ficam, e você os leva a um abrigo seguro.', fx: { karma: 4, ferida: 1, stats: { esp: 1 } } } },
      { text: 'Levar os três a um santuário de feras.', res: { text: 'O guardião do santuário o abençoa, e uma rede de olhos de lobo passa a vigiar sua estrada.', fx: { karma: 12, stats: { sor: 1, car: 1 } } } },
    ],
  },
  {
    id: 'bestas_cacada_lobo_prata', title: 'Caçar um Lobo de Prata', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 2, tierMax: 6, path: ['bestas'] },
    text: 'Um mercador paga bem por peles de lobo de prata, mas você, como mestre de bestas, não caçaria um deles. Hoje, no entanto, um macho enorme ronda sua vila, e os aldeões o chamam para resolver o assunto.',
    choices: [
      { text: 'Falar com o lobo e propor um acordo.', check: { stat: ['esp', 'car'], dif: 2, tag: 'besta' }, ok: { text: 'O lobo escuta, rosna uma vez e se retira para a mata, sem nunca mais ameaçar a vila. Uma pele de lobo, deixada no chão em gratidão, o aguarda na soleira da porta.', fx: { karma: 8, fama: 4, stats: { esp: 1, car: 1 } } }, fail: { text: 'O lobo não entende, ou não concorda. Você precisa expulsá-lo à força.', fx: { ferida: 2, fama: 1 } } },
      { text: 'Expulsar o lobo com um golpe de aviso.', check: { stat: ['fis', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'Um estalo e uma luz bastam para o lobo recuar, rosnando. A vila está segura.', fx: { fama: 3, stats: { fis: 1 } } }, fail: { text: 'O lobo é mais forte do que pareceu. Você sai com mordidas e orgulho machucado.', fx: { ferida: 3 } } },
    ],
  },
  {
    id: 'bestas_evolucao', title: 'A Evolução do Companheiro', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, path: ['bestas'], flags: ['pacto_besta'] },
    text: 'Seu companheiro de alma, agora enorme, entra em uma crise: o corpo dele muda, as escamas brilham, o pelo se arrepia. Uma evolução se aproxima, e ele precisa de uma coisa que só você pode dar: parte do seu Qi.',
    choices: [
      { text: 'Doar uma grande parte do seu Qi à besta.', res: { text: 'Uma semana de fraqueza para você, e um gigante glorioso para ele. O laço entre os dois se aprofunda como um poço sem fundo.', fx: { xp: -20, stats: { esp: 3, fis: 2, sor: 1 }, fama: 8 } } },
      { text: 'Ajudar com ervas e rezas, sem sacrificar o Qi.', check: { stat: ['esp', 'comp'], dif: 3, tag: 'besta' }, ok: { text: 'A evolução ocorre, mais lenta, mas sem danos. Seu companheiro cresce forte e saudável.', fx: { stats: { esp: 2, comp: 1 }, karma: 4, fama: 4 } }, fail: { text: 'A evolução é parcial. Ele sobrevive, mas ficará um pouco mais frágil.', fx: { ferida: 2, karma: 3 } } },
    ],
  },
  {
    id: 'bestas_voz_das_feras', title: 'A Voz Que as Feras Escutam', rarity: 'raro', once: true,
    cond: { tierMin: 4, tierMax: 8, path: ['bestas'] },
    text: 'Numa clareira, uma fera anciã, mais velha que a história de qualquer vila, observa você em silêncio. Ela fala sem voz: "Você ouve as feras há décadas. Hoje, aprenda a falar de forma que elas obedeçam, sem medo."',
    choices: [
      { text: 'Aprender a Voz das Feras.', check: { stat: ['esp', 'car', 'dao'], dif: 5, tag: 'besta' }, ok: { text: 'Um som novo sai da sua garganta, baixo, vasto. Pássaros, lobos e serpentes voltam a cabeça. Algo antigo fala por você.', fx: {  stats: { esp: 2, car: 2 }, xp: 18 } }, fail: { text: 'A voz não vem. A fera anciã assente: "Ainda não."', fx: { stats: { esp: 1 } } } },
    ],
  },
  {
    id: 'bestas_rei_da_floresta', title: 'O Rei da Floresta', rarity: 'lendario', once: true,
    cond: { tierMin: 4, tierMax: 8, path: ['bestas'] },
    text: 'Quando você entra em uma floresta virgem, todas as feras se calam. Uma presença imensa se move entre os troncos: o Rei da Floresta, um antigo tigre-dragão de pelo prateado e olhos como luas.',
    choices: [
      { text: 'Propor um pacto ao Rei da Floresta.', check: { stat: ['esp', 'car', 'dao'], dif: 7, tag: 'besta' }, ok: { text: 'O Rei o observa por uma hora inteira. Depois, baixa a cabeça. Um pacto de séculos, selado sem palavras.', fx: { setFlags: ['pacto_besta'], stats: { esp: 4, fis: 3, car: 2 }, fama: 14, xp: 20 } }, fail: { text: 'O Rei rosna uma vez, e as árvores tremem. Você se retira, respeitoso, e escapa ileso.', fx: { stats: { esp: 1, dao: 1 } } } },
      { text: 'Apenas reverenciar o Rei e seguir adiante.', res: { text: 'O Rei acompanha seus passos até a borda da floresta, sem uma palavra. Ao partir, você sente um selo invisível na testa.', fx: { karma: 8, stats: { esp: 2, sor: 1 } } } },
    ],
  },

  /* ===== Caminho do Sangue ===== */
  {
    id: 'sangue_irmaos', title: 'O Pacto dos Irmãos de Sangue', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['demoniaca'] },
    text: 'Na seita demoníaca, não há amigos. Há irmãos de sangue: dois cultivadores que cortam a mesma palma e trocam gotas. Quem trair o outro morre em dias. Um discípulo calado, de olhos cansados, propõe o pacto a você.',
    choices: [
      { text: 'Aceitar o pacto de sangue.', res: { text: 'Uma gota sua, outra dele. O laço queima na pele. Daqui em diante, você terá um aliado, e um carrasco, no mesmo rosto.', fx: { setFlags: ['irmao_de_sangue'], stats: { dao: 1, fis: 1 }, corr: 4, xp: 10 } } },
      { text: 'Recusar: confiança sem sangue vale mais.', res: { text: 'O discípulo assente, devagar. Não parece ofendido, só triste. "Quem recusa, vive sozinho. Mas vive."', fx: { stats: { dao: 2 }, corr: -2 } } },
    ],
  },
  {
    id: 'sangue_duelo_do_fraco', title: 'O Fraco Que Pediu Misericórdia', rarity: 'comum', cooldown: 25,
    cond: { tierMin: 1, tierMax: 5, path: ['demoniaca'] },
    text: 'Um cultivador mais fraco, derrotado num duelo, está de joelhos diante de você, com a lâmina a um palmo do pescoço. "Pare", sussurra. "Eu me rendo." Atrás, os outros discípulos esperam ver sangue.',
    choices: [
      { text: 'Poupar o derrotado.', res: { text: 'Os discípulos murmuram, descontentes. O derrotado ajoelha-se mais e jura dívida de vida. Uma dívida, às vezes, vale mais que uma morte.', fx: { karma: 6, corr: -3, fama: -2, stats: { dao: 2 } } } },
      { text: 'Matá-lo diante de todos.', res: { text: 'O sangue sobe como vapor. O poder cresce, e o respeito dos outros também. Você sente um frio novo.', fx: { corr: 10, karma: -14, fama: 6, xp: 12 } } },
    ],
  },
  {
    id: 'sangue_chama_negra', title: 'A Chama do Sangue Negro', rarity: 'raro', once: true,
    cond: { tierMin: 4, tierMax: 8, path: ['demoniaca'] },
    text: 'No altar mais profundo da seita, uma chama preta queima sem lenha. Os Anciãos dizem que ela só se acende para quem já passou do ponto sem retorno. Você sente a chama chamar por você, com a voz de todas as vítimas.',
    choices: [
      { text: 'Aceitar a Chama do Sangue Negro.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'demonio' }, ok: { text: 'A chama negra entra pelo peito e se acomoda no Dantian. Seu poder dispara, e a sombra no seu rosto não sai mais.', fx: {  xp: 30, corr: 14, stats: { fis: 2, esp: 2 } } }, fail: { text: 'A chama queima por dentro. Você sobrevive, em ruínas, e com pouco além de dor.', fx: { ferida: 4, corr: 8, xp: 8 } } },
      { text: 'Recusar a chama e sair do altar.', res: { text: 'A chama arde mais forte um instante, depois se aquieta. Algo em você sabe que não foi a última vez.', fx: { stats: { dao: 2 }, corr: -6 } } },
    ],
  },
  {
    id: 'sangue_trabalho_da_seita', title: 'O Trabalho Sujo da Seita', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 2, tierMax: 7, path: ['demoniaca'] },
    text: 'A seita precisa de algo que ninguém quer fazer: capturar um mensageiro de uma seita justa antes que ele chegue ao destino. Ele carrega um mapa que a seita quer, e uma família que o espera em casa.',
    choices: [
      { text: 'Capturar o mensageiro e tomar o mapa, poupando sua vida.', check: { stat: ['fis', 'sor'], dif: 3, tag: 'combate' }, ok: { text: 'Você o deixa desacordado à beira da estrada, sem um arranhão sério. O mapa vai para a seita, e a família do homem nunca descobre.', fx: { fama: 4, pedras: 50, karma: -2, corr: 4 } }, fail: { text: 'O mensageiro é mais forte do que o esperado. Você escapa, ferido, sem o mapa.', fx: { ferida: 3, fama: -3 } } },
      { text: 'Matar o mensageiro, sem testemunhas.', res: { text: 'A estrada engole o corpo. A seita lhe agradece e paga bem. Seu sono, nas noites seguintes, é raso.', fx: { pedras: 80, corr: 10, karma: -16, fama: 3 } } },
      { text: 'Recusar o trabalho e arcar com a reprimenda.', res: { text: 'O Mestre da seita franze o cenho. Uma semana de punição, e uma nota na sua ficha. Mas o mensageiro chega em casa.', fx: { karma: 10, corr: -4, fama: -3, ferida: 1, stats: { dao: 2 } } } },
    ],
  },
];
