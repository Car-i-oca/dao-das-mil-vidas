import type { GameEvent } from '../../types';

/**
 * Lote 8 — Infância e juventude mortal (antes do despertar do Qi).
 * Convenções: começo humilde, aldeia, avós, marca de nascença (linhagem oculta), ataque de bandidos,
 * primeiro amor, serviço militar, sonhos com imortais. Tudo com tier 0.
 */
const MORTAL = { tierMax: 0 };

export const lote8Juventude: GameEvent[] = [
  {
    id: 'colheita_arroz', title: 'A Colheita do Arroz', rarity: 'comum', cooldown: 4, weight: 1.5,
    cond: { ...MORTAL, ageMin: 7, ageMax: 17 },
    text: 'É tempo de colheita. A vila inteira entra na água até os joelhos, de foice na mão, do amanhecer ao escuro. As costas doem, mas as risadas ajudam.',
    choices: [
      { text: 'Trabalhar mais rápido que todos.', check: { stat: 'fis', dif: 0 }, ok: { text: 'Ao fim do dia, seu feixe é o maior. O chefe da vila cumprimenta, e seus braços tremem de orgulho.', fx: { stats: { fis: 1 }, pedras: 1 } }, fail: { text: 'Você se corta com a foice e termina o dia sentado, com a mão enfaixada.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Trabalhar ao lado dos mais velhos e ouvir suas histórias.', res: { text: 'Entre uma fileira e outra, você escuta sobre invernos terríveis, cobras de rio e um monge que passou por aqui antes de seu pai nascer.', fx: { stats: { comp: 1, car: 1 } } } },
    ],
  },
  {
    id: 'cao_vira_lata', title: 'O Cão da Estrada', rarity: 'raro', once: true,
    cond: { ...MORTAL, ageMin: 7, ageMax: 13 },
    text: 'Um cão magro, de orelha rasgada e olhos amarelos, segue você até a porta de casa. Todos dizem que cão da estrada traz problema. Ele deita no chão e espera.',
    choices: [
      { text: 'Dar um pouco de comida e deixá-lo ficar.', res: { text: 'O cão come, dorme encostado na parede e, na manhã seguinte, já escolheu um lado da casa para chamar de seu.', fx: { stats: { car: 1, dao: 1 }, karma: 3, setFlags: ['cao_fiel'], agenda: [{ event: 'cao_envelhece', em: [9, 13] }] } } },
      { text: 'Espantar o cão.', res: { text: 'Ele afasta-se, devagar, olhando para trás. Você jura que ele não está bravo, apenas decepcionado.', fx: { karma: -2 } } },
    ],
  },
  {
    id: 'cao_envelhece', title: 'O Último Inverno do Cão', rarity: 'raro', once: true,
    cond: { flags: ['cao_fiel'] },
    text: 'O cão de orelha rasgada está velho. Já não corre, só caminha devagar ao seu lado, e dorme muito. Numa noite fria, ele deita a cabeça no seu pé e fica ali, quieto, olhando para você.',
    choices: [
      { text: 'Ficar ao lado dele até o fim.', res: { text: 'Ele parte antes do amanhecer, sem sofrer. Você o enterra sob o salgueiro. Algo na sua alma aprende, de uma vez, o peso de dizer adeus.', fx: { stats: { dao: 3, car: 1 }, karma: 4 } } },
      { text: 'Dar uma erva rara para prolongar seus dias.', cond: { item: 'erva_orvalho' }, res: { text: 'O cão ganha mais um verão, correndo atrás de borboletas. A erva custou caro, mas a alegria dele valeu.', fx: { removeItem: ['erva_orvalho'], stats: { dao: 2, sor: 1 }, karma: 3 } } },
    ],
  },
  {
    id: 'estrela_cadente', title: 'A Estrela Cadente', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 8, ageMax: 18 },
    text: 'Numa noite sem lua, uma estrela risca o céu, longa e lenta. Os mais velhos dizem que ela realiza um pedido, desde que você diga antes de ela sumir.',
    choices: [
      { text: 'Desejar poder voar como os imortais.', res: { text: 'A estrela some. Nenhum milagre acontece, mas você dorme com um sorriso, e acorda mais decidido.', fx: { stats: { dao: 2 }, setFlags: ['desejo_estrela'] } } },
      { text: 'Desejar que sua família nunca passe fome.', res: { text: 'A estrela some. Você sente, de leve, que o pedido foi ouvido, ou apenas que é um bom pedido.', fx: { karma: 4, stats: { dao: 1, sor: 1 } } } },
      { text: 'Não desejar nada: contemplar a estrela.', res: { text: 'Por um instante, só existem você e o céu. Você nunca esquecerá essa quietude.', fx: { stats: { esp: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'avo_ensina', title: 'A Respiração da Avó', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 8, ageMax: 14 },
    text: 'Sua avó, que diz nunca ter ouvido falar de cultivo, ensina um jeito de respirar quando está nervosa: inspirar contando até quatro, soltar contando até seis, sentindo o ar descer até a barriga.',
    choices: [
      { text: 'Praticar toda noite antes de dormir.', check: { stat: ['dao', 'comp'], dif: -1 }, ok: { text: 'Em semanas, a respiração vira hábito. Algo morno parece se acumular abaixo do umbigo.', fx: { stats: { esp: 1, dao: 1 }, setFlags: ['respiracao_da_avo'] } }, fail: { text: 'Você esquece na maior parte das noites, mas quando lembra, ajuda.', fx: { stats: { dao: 1 } } } },
      { text: 'Achar bobagem e correr para brincar.', res: { text: 'Sua avó sorri, sem se ofender. "Um dia você vai se lembrar."', fx: { stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'ataque_bandidos_vila', title: 'A Noite dos Bandidos', rarity: 'raro', once: true,
    cond: { ...MORTAL, ageMin: 10, ageMax: 19 },
    text: 'Uma noite, cavalos e tochas cercam {vila}. Bandidos exigem toda a colheita e metade das moças. Os homens da vila, em número menor, se preparam para resistir, ou correr.',
    choices: [
      { text: 'Pegar um bastão e defender a vila ao lado dos adultos.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você derruba um bandido com um golpe de sorte. A vila, impulsionada pela coragem de um jovem, repele o ataque.', fx: { fama: 4, karma: 6, stats: { fis: 1, dao: 2 }, setFlags: ['defendeu_vila'] } }, fail: { text: 'Você é jogado ao chão, desmaia e acorda no dia seguinte, com a vila salva sem você, e com vergonha misturada com alívio.', fx: { ferida: 2, stats: { dao: 1 } } } },
      { text: 'Esconder crianças e idosos no celeiro.', res: { text: 'Em silêncio, você guia dezenas de pessoas ao esconderijo. Os bandidos pegam parte do arroz e vão embora. Ninguém é ferido.', fx: { karma: 8, stats: { car: 1, dao: 1 } } } },
      { text: 'Correr para o forte do governador pedir ajuda.', check: { stat: ['fis', 'sor'], dif: 1, tag: 'fuga' }, ok: { text: 'Você corre a noite inteira. Os soldados chegam ao amanhecer e prendem os bandidos que ainda restavam. Você é lembrado como o mensageiro.', fx: { fama: 3, karma: 4, stats: { fis: 1, sor: 1 } } }, fail: { text: 'Você se perde na estrada e chega tarde demais. A vila sobrevive, mas muito foi perdido.', fx: { karma: -2, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'curandeira_aprendiz', title: 'A Aprendiz da Curandeira', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 10, ageMax: 18 },
    text: 'A velha curandeira de {vila} precisa de uma mão para moer ervas, ferver chás e conter pacientes. Paga pouco, mas ensina muito, se você prestar atenção.',
    choices: [
      { text: 'Aceitar o trabalho e aprender tudo o que puder.', check: { stat: 'comp', dif: 0 }, ok: { text: 'Em dois anos, você reconhece mais de cem ervas pelo cheiro. A curandeira lhe entrega um frasco de despedida.', fx: { stats: { comp: 2 }, item: ['pilula_cura'], setFlags: ['conhece_ervas'] } }, fail: { text: 'Você mistura duas ervas e deixa um paciente com cólicas. A curandeira não grita, mas perde a confiança por um tempo.', fx: { stats: { comp: 1 }, karma: -1 } } },
      { text: 'Recusar e brincar com os amigos.', res: { text: 'A curandeira encolhe os ombros e chama outra criança. Você perde uma lição que nem sabia que precisava.', fx: { stats: { car: 1 } } } },
    ],
  },
  {
    id: 'feira_do_templo', title: 'A Feira do Templo', rarity: 'comum', cooldown: 6,
    cond: { ...MORTAL, ageMin: 9, ageMax: 20 },
    text: 'Uma vez por ano, o templo do vale organiza uma feira: doces, fitas coloridas, adivinhos e um monge que balança varetas numeradas para quem quiser saber a sorte do ano.',
    choices: [
      { text: 'Sacudir as varetas da sorte.', check: { stat: 'sor', dif: 0 }, ok: { text: 'A vareta cai com um número raro. O monge arregala os olhos e lhe entrega um amuleto simples. "Bons ventos."', fx: { stats: { sor: 1 }, setFlags: ['vara_da_sorte'] } }, fail: { text: 'A vareta cai com um número vulgar. O monge sorri: "Também é uma resposta."', fx: { stats: { dao: 1 } } } },
      { text: 'Gastar as moedas em doces e ficar olhando as danças.', res: { text: 'Açúcar nos dedos, música nos ouvidos, um dia perfeito, desses que a memória guarda como um trapo de seda.', fx: { stats: { car: 1 }, pedras: -1 } } },
    ],
  },
  {
    id: 'poco_assombrado', title: 'O Poço Assombrado', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 8, ageMax: 15 },
    text: 'Os mais velhos proíbem qualquer criança de chegar perto do poço seco na colina. Diz-se que um espírito de mulher chora lá dentro. Seus amigos o desafiam a ir ver à meia-noite.',
    choices: [
      { text: 'Aceitar o desafio e ir sozinho.', check: { stat: ['dao', 'esp'], dif: 0, tag: 'mente' }, ok: { text: 'Você chega ao poço, ouve um choro suave e, em vez de fugir, diz baixinho: "Está tudo bem." O choro cessa. Você volta calmo, sem contar a ninguém.', fx: { stats: { dao: 2, esp: 1 }, karma: 3, setFlags: ['viu_espirito'] } }, fail: { text: 'Você chega a ouvir um sussurro e corre até em casa sem fôlego. Os amigos riem, mas o medo fica.', fx: { stats: { dao: 1 } } } },
      { text: 'Recusar: não se brinca com espíritos.', res: { text: 'Os amigos zombam, mas alguns, mais tarde, admitem o alívio de você ter dito não.', fx: { stats: { dao: 1, comp: 1 } } } },
    ],
  },
  {
    id: 'pesca_lago', title: 'A Carpa Dourada', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 8, ageMax: 16 },
    text: 'Num dia calmo de pesca, o anzol puxa com uma força estranha. Do lago, emerge uma carpa de escamas douradas, grande como seu antebraço, que o encara com olhos quase gentis.',
    choices: [
      { text: 'Soltar a carpa de volta ao lago.', res: { text: 'Ela se debate uma vez, olha para você e some na água. Meses depois, uma moeda dourada aparece na margem, e você nunca saberá se foi coincidência.', fx: { karma: 5, stats: { sor: 2 } } } },
      { text: 'Levar a carpa para casa e vender.', res: { text: 'A carpa rende um bom dinheiro no mercado. Naquela noite, a vila escuta um canto triste do lago.', fx: { pedras: 4, karma: -3, stats: { sor: -1 } } } },
    ],
  },
  {
    id: 'carta_do_pai', title: 'A Carta Que Chegou Tarde', rarity: 'raro', once: true,
    cond: { ...MORTAL, ageMin: 12, ageMax: 20 },
    text: 'Um mensageiro empoeirado entrega uma carta amarelada, endereçada a você. A letra é de seu pai (ou mãe), que partiu quando você era pequeno. A carta fala de uma seita, de um erro antigo e de um pedido de perdão.',
    choices: [
      { text: 'Ler a carta em segredo e guardá-la.', res: { text: 'Você relê as palavras muitas vezes. Sabe agora por que ele ou ela partiu, e não sabe se perdoa. O segredo pesa e ensina.', fx: { stats: { dao: 2, comp: 1 }, setFlags: ['segredo_de_familia'] } } },
      { text: 'Mostrar a carta aos mais velhos da família.', res: { text: 'A família se cala por um longo tempo. Depois, alguém diz o nome da seita, em voz baixa. Você sente o chão se mexer sob os pés.', fx: { karma: 2, stats: { car: 1, comp: 1 }, setFlags: ['segredo_de_familia'] } } },
      { text: 'Queimar a carta: o passado não deve voltar.', res: { text: 'As chamas devoram as palavras. O vento leva as cinzas. Você não tem certeza se fez a coisa certa.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },
  {
    id: 'marca_nascenca', title: 'A Marca Que Esquenta', rarity: 'raro', once: true,
    cond: { ...MORTAL, ageMin: 6, ageMax: 15 },
    text: 'Uma marca de nascença, em forma de chama, na sua omoplata, esquenta de vez em quando, sobretudo na lua cheia. Sua mãe diz que sempre foi assim, e que é melhor não comentar com ninguém.',
    choices: [
      { text: 'Ouvir o corpo: meditar quando a marca esquentar.', check: { stat: ['esp', 'dao'], dif: 0 }, ok: { text: 'Na lua cheia, a marca pulsa como um coração pequeno. Você sente o ritmo do mundo se encaixar no seu. Algo antigo acorda devagar.', fx: { stats: { esp: 2 }, setFlags: ['marca_estranha'] } }, fail: { text: 'A marca esquenta e você só sente desconforto. Mas, com o tempo, aprende a conviver com ela.', fx: { setFlags: ['marca_estranha'], stats: { dao: 1 } } } },
      { text: 'Esconder a marca e fingir que não existe.', res: { text: 'Você veste camisas mais grossas e evita nadar no rio. A marca esquenta, às vezes, como um segredo teimoso.', fx: { setFlags: ['marca_estranha'], stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'marca_desperta', title: 'A Marca Acorda', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 4, flags: ['marca_estranha'] },
    text: 'Depois que o Qi despertou, a marca em sua omoplata começa a brilhar sozinha, em dourado, durante a meditação. Um velho mestre, ao ver o brilho, empalidece: "Essa linhagem foi extinta há trezentos anos."',
    choices: [
      { text: 'Aceitar a herança da linhagem, apesar dos perigos.', check: { stat: ['dao', 'esp'], dif: 2 }, ok: { text: 'A marca se desdobra em runas, e memórias de uma linhagem inteira correm pelo seu sangue. Seus meridianos ganham uma nitidez rara.', fx: { stats: { esp: 3, dao: 2, sor: 1 }, xp: 14, fama: 4 } }, fail: { text: 'A herança é pesada demais. Você desmaia por três dias, mas guarda uma pequena parte do poder.', fx: { stats: { esp: 1 }, ferida: 2, xp: 6 } } },
      { text: 'Esconder a marca do mundo e do mestre.', res: { text: 'O velho concorda, em silêncio. "Segredos, às vezes, são abrigos." O brilho se apaga quando você o manda se apagar.', fx: { stats: { dao: 2 }, karma: 2 } } },
    ],
  },
  {
    id: 'peregrino_hospedado', title: 'O Viajante na Porta', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 9, ageMax: 18 },
    text: 'Numa tarde de chuva, um viajante pede abrigo. Seus sapatos estão gastos, mas sua postura é estranhamente reta. Sua família o hospeda e, à noite, ele conversa com você sobre o mundo lá fora.',
    choices: [
      { text: 'Perguntar sobre as seitas e os imortais.', res: { text: 'Ele conta, em voz baixa, sobre montanhas onde ninguém vê o chão, sobre pílulas, sobre espadas que voam. Ao partir, deixa uma moeda e um conselho: "Não desista cedo."', fx: { stats: { dao: 2, comp: 1 }, pedras: 2, setFlags: ['conhece_lendas'] } } },
      { text: 'Perguntar sobre as cidades distantes.', res: { text: 'Ruas de pedra, mercados de sete cores, torres de mil degraus. Sua cabeça gira por dias.', fx: { stats: { car: 1, sor: 1 } } } },
    ],
  },
  {
    id: 'dia_de_mercado', title: 'Dia de Mercado', rarity: 'comum', cooldown: 3, weight: 1.5,
    cond: { ...MORTAL, ageMin: 7, ageMax: 22 },
    text: 'É dia de feira em {vila}. Barracas de peixe seco, tecidos, panelas de barro e vozes por toda parte. Sempre há algo para ver, para vender, ou para tentar não comprar.',
    choices: [
      { text: 'Ajudar uma barraca a vender e ganhar umas moedas.', check: { stat: 'car', dif: -1 }, ok: { text: 'Você chama os fregueses com voz clara e vende tudo antes do meio-dia. A dona da barraca paga com generosidade.', fx: { pedras: 2, stats: { car: 1 } } }, fail: { text: 'Ninguém para na sua barraca. O dia rende só cansaço e uma lição sobre paciência.', fx: { stats: { dao: 1 } } } },
      { text: 'Perambular pelas barracas, observando.', res: { text: 'Cada barraca é um pequeno mundo. Você volta para casa com a cabeça cheia de cores e cheiros.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'casamento_vila', title: 'O Casamento na Vila', rarity: 'comum', cooldown: 8,
    cond: { ...MORTAL, ageMin: 10, ageMax: 22 },
    text: 'Dois jovens da vila se casam sob uma árvore florida. Música, danças e arroz doce para todos. Alguém lhe puxa pela mão para dançar.',
    choices: [
      { text: 'Dançar até os pés doerem.', res: { text: 'Giros, risos, o chão de terra batida martelando sob os pés. Uma das melhores noites do ano.', fx: { stats: { car: 1, fis: 1 } } } },
      { text: 'Ajudar a servir os convidados.', res: { text: 'Mãos ocupadas, ouvidos abertos. Você escuta histórias de famílias, rivalidades e favores antigos.', fx: { stats: { comp: 1, car: 1 }, karma: 2 } } },
    ],
  },
  {
    id: 'enchente_rio', title: 'A Enchente do Rio', rarity: 'raro', once: true,
    cond: { ...MORTAL, ageMin: 10, ageMax: 19 },
    text: 'Depois de três dias de chuva, o rio sobe e invade as casas baixas de {vila}. Gritos, animais fugindo, pessoas carregando o que podem. Uma casa de vizinhos está prestes a ser levada.',
    choices: [
      { text: 'Ajudar a família vizinha a salvar suas coisas.', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'Você carrega uma criança nos ombros e um saco de arroz nos braços. A casa cai logo depois, mas todos estão a salvo.', fx: { karma: 10, fama: 3, stats: { fis: 2, dao: 1 } } }, fail: { text: 'A correnteza o derruba. Você é salvo por um pescador, e a casa se perde.', fx: { karma: 3, ferida: 2, stats: { dao: 1 } } } },
      { text: 'Salvar primeiro os animais e as ferramentas da sua família.', res: { text: 'A sua casa fica a salvo. A dos vizinhos não. Eles não o culpam, mas o silêncio no dia seguinte pesa.', fx: { karma: -3, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'recrutador_exercito', title: 'O Recrutador do Exército', rarity: 'raro', once: true,
    cond: { ...MORTAL, ageMin: 15, ageMax: 22 },
    text: 'Soldados chegam a {vila} com estandartes e tambores. O recrutador paga adiantado, promete refeições e uma vida melhor para quem aceitar o serviço de quatro anos.',
    choices: [
      { text: 'Alistar-se por quatro anos.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Quatro anos de marcha, lama e disciplina. Você sai magro, calejado e com uma cicatriz na sobrancelha. E com uma coragem que antes não tinha.', fx: { anos: 4, stats: { fis: 3, dao: 2 }, pedras: 6, setFlags: ['veterano'] } }, fail: { text: 'O serviço é duro, e você volta com uma perna ruim e histórias que não conta. Mas volta.', fx: { anos: 4, stats: { fis: 1, dao: 2 }, ferida: 2, setFlags: ['veterano'] } } },
      { text: 'Recusar: seu caminho é outro.', res: { text: 'O recrutador cospe no chão e segue adiante. Alguns rapazes da vila vão com ele; alguns voltam.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tio_fracassado', title: 'O Tio Que Não Despertou', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 10, ageMax: 20 },
    text: 'Seu tio, bebedor de vinho barato, jura que já tentou despertar o Qi por vinte anos. Ele não conseguiu. Numa noite, bêbado, resolve ensinar tudo o que aprendeu sobre os erros que cometeu.',
    choices: [
      { text: 'Ouvir com atenção, mesmo bêbado.', res: { text: 'Entre soluços, o tio revela sete erros que quase todo iniciante comete. Você anota todos, mentalmente. Ele adormece sobre a mesa, e você o cobre com a manta.', fx: { stats: { comp: 2, dao: 1 }, karma: 2 } } },
      { text: 'Rir dele e deixá-lo falando sozinho.', res: { text: 'O tio se cala, magoado. Você sente algo azedo, que só entende anos depois.', fx: { karma: -3, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'primeiro_amor', title: 'Um Rosto na Fonte', rarity: 'raro', once: true,
    cond: { ...MORTAL, ageMin: 14, ageMax: 21, noFlags: ['amor_incipiente', 'companheiro_dao'] },
    text: 'Toda manhã, na fonte da vila, uma pessoa de sorriso tímido enche os baldes e finge não olhar na sua direção. Você já finge não olhar também. Os dois fingem muito bem.',
    choices: [
      { text: 'Conversar com ela ou ele, finalmente.', check: { stat: 'car', dif: -1 }, ok: { text: 'Falar é mais fácil do que parecia. Vocês riem, combinam de se ver, e o mundo ganha uma cor nova.', fx: { setFlags: ['amor_incipiente'], stats: { car: 1, dao: 1 }, agenda: [{ event: 'amor_decisao', em: [8, 16] }] } }, fail: { text: 'As palavras saem trocadas. A pessoa ri com carinho e vai embora. Pelo menos agora ela sabe seu nome.', fx: { stats: { car: 1 } } } },
      { text: 'Continuar fingindo. Há tempo para tudo.', res: { text: 'O tempo, como sempre, não espera. Mas você guarda a lembrança daquela fonte para sempre.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'jogo_de_go', title: 'O Velho do Tabuleiro', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 10, ageMax: 20 },
    text: 'Na praça, um velho joga um jogo de pedras brancas e pretas sobre um tabuleiro. Ele convida você a sentar: "Perder aqui não custa nada. Ganhar, custa tudo."',
    choices: [
      { text: 'Jogar uma partida.', check: { stat: 'comp', dif: 1 }, ok: { text: 'Você perde por apenas duas pedras, o que o velho considera uma vitória espiritual. Ele lhe ensina três truques que valem mais que um manual.', fx: { stats: { comp: 3 }, setFlags: ['jogou_go'] } }, fail: { text: 'Você perde feio. O velho ri, devolve suas pedras e marca nova partida para o dia seguinte.', fx: { stats: { comp: 1, dao: 1 } } } },
      { text: 'Apenas observar.', res: { text: 'Cada pedra colocada muda o sentido do tabuleiro inteiro. Você entende, sem palavras, uma regra do mundo.', fx: { stats: { comp: 1, esp: 1 } } } },
    ],
  },
  {
    id: 'incendio_celeiro', title: 'Fogo no Celeiro', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 10, ageMax: 19 },
    text: 'Gritos de madrugada: o celeiro do vizinho pega fogo. Em segundos, a vila está de pé, com baldes e panos molhados. O vento sopra na direção das casas.',
    choices: [
      { text: 'Entrar no celeiro para tirar os animais.', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'Fumaça nos olhos, calor na pele. Você sai com duas vacas e um bezerro. Ninguém sabe como conseguiu.', fx: { karma: 8, fama: 3, stats: { fis: 1, dao: 2 }, ferida: 1 } }, fail: { text: 'A fumaça o derruba. Um vizinho o puxa para fora. A vergonha de ter sido salvo pesa mais que a queimadura.', fx: { ferida: 2, stats: { dao: 1 } } } },
      { text: 'Organizar a fila de baldes.', check: { stat: 'car', dif: 0 }, ok: { text: 'Você grita instruções, e a vila inteira obedece. O fogo não chega às casas.', fx: { karma: 5, fama: 2, stats: { car: 2 } } }, fail: { text: 'A fila vira bagunça, mas, ao fim, o fogo é contido pelos mais velhos.', fx: { stats: { car: 1 } } } },
    ],
  },
  {
    id: 'sonho_de_queda', title: 'O Sonho da Queda', rarity: 'comum', once: true,
    cond: { ...MORTAL, ageMin: 8, ageMax: 16 },
    text: 'Você sonha que cai de uma montanha muito alta, em câmera lenta. No meio da queda, uma voz sussurra: "Ainda não." Você acorda no chão, ao lado da cama, sem se lembrar de ter caído.',
    choices: [
      { text: 'Contar o sonho aos mais velhos.', res: { text: 'Cada um dá uma interpretação diferente: um mau presságio, um bom presságio, um sinal de febre. Você ri e se sente menos sozinho.', fx: { stats: { car: 1 } } } },
      { text: 'Guardar o sonho para você.', res: { text: 'Ele volta nas noites seguintes, sempre com a mesma voz. Um dia, você não tem mais medo de cair.', fx: { stats: { dao: 2, sor: 1 } } } },
    ],
  },
  {
    id: 'tarefas_da_casa', title: 'As Tarefas da Casa', rarity: 'comum', cooldown: 3, weight: 1.5,
    cond: { ...MORTAL, ageMin: 7, ageMax: 22 },
    text: 'Lenha para cortar, água para buscar, galinhas para alimentar, um telhado para remendar. Os dias de uma casa simples têm mais tarefas que horas.',
    choices: [
      { text: 'Fazer tudo com capricho.', res: { text: 'Ao fim do dia, a casa está em ordem e suas mãos têm calos novos. Seus pais assentem, sem dizer nada.', fx: { stats: { fis: 1, dao: 1 } } } },
      { text: 'Fazer rápido e sobrar tempo para ler.', res: { text: 'Com a lamparina de sebo, você devora um livro velho que achou no baú. As palavras abrem janelas.', fx: { stats: { comp: 1, esp: 1 } } } },
    ],
  },
];
