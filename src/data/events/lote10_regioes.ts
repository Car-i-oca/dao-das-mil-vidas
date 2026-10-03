import type { GameEvent } from '../../types';

/**
 * Lote 10 — Regiões distantes: deserto, gelo e mar.
 * Convenção de geografia: um centro próspero cercado por fronteiras perigosas (planície gelada ao norte,
 * deserto a oeste, oceano a leste). Estes eventos exigem estar no lugar (local) e pedem uma expedição.
 */
export const lote10Regioes: GameEvent[] = [
  {
    id: 'expedicao_longe', title: 'Além das Fronteiras', rarity: 'comum', cooldown: 25, weight: 1.2,
    cond: { tierMin: 2, tierMax: 8 },
    text: 'O continente tem um centro próspero e três bordas que poucos visitam: o Deserto do Vento Cego a oeste, a Planície de Gelo Silencioso ao norte e o Mar das Mil Ilhas a leste. Quem tem poder e curiosidade pode ir mais longe do que os mapas.',
    choices: [
      { text: 'Atravessar o Deserto do Vento Cego.', res: { text: 'Areia por todos os lados, e um sol que não pede licença. Você parte com água para dez dias e uma bússola que não tem certeza de nada.', fx: { local: 'deserto', xp: 2 } } },
      { text: 'Subir até a Planície de Gelo Silencioso.', res: { text: 'O frio chega antes da paisagem. Respirar já é um pequeno ato de coragem. Você caminha, de capa grossa, em direção ao branco.', fx: { local: 'gelo', xp: 2 } } },
      { text: 'Embarcar para o Mar das Mil Ilhas.', res: { text: 'Um barco de casco largo, um capitão de poucas palavras e uma linha de horizonte onde ainda não há nada.', fx: { local: 'mar', xp: 2 } } },
      { text: 'Ficar no continente, por ora.', res: { text: 'Há muita coisa por fazer perto de casa. A fronteira espera.', fx: {} } },
    ],
  },
  {
    id: 'caminho_de_volta', title: 'A Volta das Fronteiras', rarity: 'comum', cooldown: 12, weight: 2,
    cond: { tierMin: 1, local: ['deserto', 'gelo', 'mar'] },
    text: 'Depois de meses nas bordas do mundo, você sente saudade de coisas simples: chá quente, ruas com nome, conversa sem pressa. Está na hora de decidir se volta ou segue mais fundo.',
    choices: [
      { text: 'Voltar para a cidade mais próxima.', res: { text: 'Telhados, mercados e rumores. A civilização parece, de repente, um luxo que ninguém merece e todos querem.', fx: { local: 'cidade', stats: { car: 1 } } } },
      { text: 'Voltar à seita.', cond: { flags: ['membro_seita'] }, res: { text: 'Os portões da seita parecem menores, e mais acolhedores.', fx: { local: 'seita', faccao: 'seita' } } },
      { text: 'Seguir mais fundo na região.', res: { text: 'Você aperta o passo e deixa a saudade para trás.', fx: { xp: 3, stats: { dao: 1 } } } },
    ],
  },

  /* ===== Deserto do Vento Cego ===== */
  {
    id: 'miragem_oasis', title: 'A Miragem do Oásis', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 6, local: ['deserto'] },
    text: 'No horizonte, palmeiras, água azul e sombra. Seu odre está quase vazio. Algo no ar vibra de forma estranha: uma miragem, ou, o que é raro, um oásis de verdade.',
    choices: [
      { text: 'Seguir em direção ao oásis.', check: { stat: ['esp', 'sor'], dif: 1 }, ok: { text: 'Uma água fresca, pequenas tâmaras e três dias de descanso. O oásis era real, e só aparece para quem o procura sem desespero.', fx: { ferida: -2, xp: 6, stats: { sor: 1 } } }, fail: { text: 'A miragem some quando você chega. Você perde um dia de marcha, e muita água.', fx: { ferida: 2, stats: { dao: 1 } } } },
      { text: 'Ignorar a miragem e manter o rumo.', res: { text: 'Prudência, e sede. Dois dias depois, você encontra um poço de verdade, escondido sob uma pedra.', fx: { stats: { dao: 2 }, ferida: -1 } } },
    ],
  },
  {
    id: 'tempestade_areia', title: 'A Tempestade de Areia', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 6, local: ['deserto'] },
    text: 'A cor do céu muda de azul para laranja, e depois para um castanho espesso. Uma parede de areia, alta como uma montanha, avança. Em poucos minutos, ela engolirá tudo.',
    choices: [
      { text: 'Cavar um abrigo e esperar passar.', check: { stat: ['fis', 'comp'], dif: 1 }, ok: { text: 'Horas no escuro, respirando por um pano molhado. Quando passa, você emerge coberto de areia, vivo e orgulhoso.', fx: { stats: { fis: 1, dao: 1 }, xp: 4 } }, fail: { text: 'O abrigo desmorona. Você sai tossindo, com areia nos pulmões e na paciência.', fx: { ferida: 2 } } },
      { text: 'Usar o Qi para criar um escudo em volta de si.', check: { stat: ['esp', 'dao'], dif: 2, tag: 'qi' }, ok: { text: 'Uma esfera de ar calmo no meio da fúria da tempestade. Você medita, e a areia dança ao seu redor.', fx: { xp: 14, stats: { esp: 1 } } }, fail: { text: 'O escudo falha no pior momento. Você é jogado a cem passos de distância.', fx: { ferida: 3 } } },
    ],
  },
  {
    id: 'cidade_areia_enterrada', title: 'A Cidade Sob as Dunas', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, local: ['deserto'] },
    text: 'Quando o vento recua, uma torre aparece entre as dunas, depois um muro, depois uma rua inteira. Uma cidade que a areia engoliu e agora devolve. Dentro, uma luz fraca pulsa, como um coração de pedra.',
    choices: [
      { text: 'Explorar a cidade antes que o vento a esconda de novo.', check: { stat: ['comp', 'esp', 'sor'], dif: 3 }, ok: { text: 'Uma câmara selada, um baú de bronze e uma pílula que o tempo não estragou. A areia volta a cobrir tudo atrás de você.', fx: { item: ['pilula_passagem_4', 'cantil_oasis'], pedras: 120, xp: 10, fama: 4 } }, fail: { text: 'A cidade desmorona sobre si mesma. Você escapa por pouco, com as mãos vazias.', fx: { ferida: 3, xp: 3 } } },
      { text: 'Apenas desenhar o mapa e seguir viagem.', res: { text: 'Um mapa detalhado vale mais que uma pressa. Outros virão, ou você mesmo voltará.', fx: { item: ['mapa_fragmentado'], stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'nomades_do_vento', title: 'Os Nômades do Vento', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 1, tierMax: 7, local: ['deserto'] },
    text: 'Uma caravana de nômades de turbantes cor de areia o convida ao seu fogo. Eles não têm casa, só o caminho, e sabem ler o vento como se fosse um livro.',
    choices: [
      { text: 'Aprender com eles a ler o vento.', check: { stat: ['comp', 'esp'], dif: 1 }, ok: { text: 'Semanas ao lado deles. Você aprende a ver a chuva três dias antes de ela cair, a sentir um estrangeiro a uma légua.', fx: { stats: { comp: 1, esp: 1, sor: 1 }, tecnica: ['passo_areia'], xp: 8 } }, fail: { text: 'O vento ainda é um livro em outra língua. Mas a hospitalidade valeu a viagem.', fx: { stats: { car: 1 } } } },
      { text: 'Trocar suprimentos e seguir viagem.', res: { text: 'Água por pedras, pedras por água. Eles acenam, enquanto o sol se põe.', fx: { pedras: -10, ferida: -1 } } },
    ],
  },

  /* ===== Planície de Gelo Silencioso ===== */
  {
    id: 'planicie_branca', title: 'A Planície Branca', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 6, local: ['gelo'] },
    text: 'Por três dias, não há uma árvore, uma pedra ou um som. Só branco, e o vento. Sua respiração vira cristais de gelo na barba. Tudo o que você carrega pesa o dobro.',
    choices: [
      { text: 'Caminhar sem parar, mantendo o corpo aquecido com Qi.', check: { stat: ['fis', 'esp'], dif: 2, tag: 'qi' }, ok: { text: 'Um Qi quente e constante, como uma brasa pequena no ventre. Você atravessa a planície inteira sem sofrer.', fx: { xp: 12, stats: { fis: 1, esp: 1 } } }, fail: { text: 'O frio vence por algumas horas. Você chega ao outro lado com dedos azuis e dois dedos a menos de orgulho.', fx: { ferida: 3 } } },
      { text: 'Parar e esperar o frio passar.', res: { text: 'Uma noite, outra noite, uma terceira. O frio não passa, mas você aprende a conviver com ele.', fx: { ferida: 1, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'aurora_norte', title: 'A Aurora do Norte', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 2, tierMax: 8, local: ['gelo'] },
    text: 'No meio da noite, o céu se rasga em fitas verdes e roxas, ondulando como seda ao vento. Dizem que a aurora é o suspiro do Dao tocando a terra. Quem a contempla em silêncio, aprende algo sem explicação.',
    choices: [
      { text: 'Sentar-se na neve e meditar sob a aurora.', check: { stat: ['dao', 'esp', 'comp'], dif: 3, tag: 'mente' }, ok: { text: 'Cada cor entra em você como uma nota. Ao amanhecer, algo na sua compreensão do Dao mudou para sempre.', fx: { stats: { dao: 3, esp: 2, comp: 1 }, xp: 24 } }, fail: { text: 'O frio rouba sua concentração. Você assiste à aurora com olhos de criança, sem aprender nada, e com muita alegria.', fx: { stats: { dao: 1 }, xp: 6 } } },
    ],
  },
  {
    id: 'palacio_de_gelo', title: 'O Palácio de Gelo', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 8, local: ['gelo'] },
    text: 'Numa clareira de gelo liso como espelho, torres de cristal azulado erguem-se do chão. É um palácio que ninguém construiu, formado, dizem, pelo sono de um dragão de inverno. Uma porta aberta convida, e ameaça.',
    choices: [
      { text: 'Entrar e explorar o palácio.', check: { stat: ['fis', 'esp', 'dao'], dif: 4 }, ok: { text: 'Corredores de gelo, estátuas de espíritos, uma sala central com um trono vazio e uma pérola azul no assento. Você a leva, e uma lufada de ar frio fecha as portas atrás de você.', fx: { item: ['cristal_inverno'], xp: 16, stats: { esp: 2 }, fama: 4 } }, fail: { text: 'O palácio se fecha, e você precisa quebrar uma parede de gelo para sair. Fica com queimaduras de frio e um respeito novo pelo inverno.', fx: { ferida: 4, xp: 4 } } },
      { text: 'Reverenciar o palácio de fora e deixá-lo em paz.', res: { text: 'Uma brisa suave toca seu rosto. O palácio parece, por um instante, sorrir.', fx: { karma: 4, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'urso_gelo_anciao', title: 'O Urso Branco Ancestral', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, local: ['gelo'] },
    text: 'Uma montanha de pelo branco se move na neve: um urso espiritual ancestral, de olhos azuis, que carrega no lombo uma cicatriz de relâmpago. Ele não ataca. Apenas observa, como quem espera uma pergunta.',
    choices: [
      { text: 'Oferecer comida e conversar em silêncio.', check: { stat: ['esp', 'car'], dif: 3, tag: 'besta' }, ok: { text: 'O urso come, assente, e deita-se ao seu lado. Por uma noite, você é um irmão. Pela manhã, ele deixa uma presa de gelo ao lado do seu saco de dormir.', fx: { karma: 8, stats: { esp: 1, fis: 1 }, xp: 10 } }, fail: { text: 'O urso mantém o olhar fixo, depois se vira devagar e vai embora. Um encontro sem palavras, e sem desfecho.', fx: { stats: { dao: 1 } } } },
      { text: 'Enfrentar o urso para provar seu valor.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'A luta é tão épica que a neve ao redor derrete. No fim, o urso tomba ofegante, mas com respeito, e você carrega um núcleo azul como o céu.', fx: { item: ['nucleo_besta_alto'], fama: 8, ferida: 3, karma: -3 } }, fail: { text: 'O urso o lança a trinta metros, e você acorda numa neve macia, vivo apenas por sorte.', fx: { ferida: 4 } } },
    ],
  },
  {
    id: 'viajante_congelado', title: 'O Viajante na Neve', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 1, tierMax: 7, local: ['gelo'] },
    text: 'Na beira do caminho, meio coberto de neve, um viajante pálido segura uma bolsa com as duas mãos. Seus lábios estão azuis. Ele ainda respira, mal.',
    choices: [
      { text: 'Aquecê-lo com seu Qi e levá-lo a um abrigo.', check: { stat: ['esp', 'fis'], dif: 1 }, ok: { text: 'Horas de esforço. O viajante acorda, chora, agradece e, ao partir, deixa a bolsa em suas mãos: dentro, uma coleção de ervas do gelo.', fx: { karma: 10, item: ['erva_orvalho', 'erva_cem_anos'], stats: { dao: 1 } } }, fail: { text: 'Você chega tarde demais. O viajante parte com um sorriso, e a bolsa continua firme nos seus braços. Você a leva à família dele, meses depois.', fx: { karma: 6, stats: { dao: 2 } } } },
      { text: 'Seguir viagem: a planície não perdoa.', res: { text: 'Cada passo parece pesar o dobro. Naquela noite, você não dorme bem.', fx: { karma: -6, stats: { dao: -1 } } } },
    ],
  },

  /* ===== Mar das Mil Ilhas ===== */
  {
    id: 'tempestade_no_mar', title: 'A Tempestade Sobre as Ondas', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 6, local: ['mar'] },
    text: 'O barco sobe e desce como uma folha numa cachoeira. Ondas do tamanho de montanhas, relâmpagos ao longe e o mastro gemendo. O capitão grita ordens que ninguém ouve.',
    choices: [
      { text: 'Ajudar a tripulação a segurar o barco.', check: { stat: ['fis', 'dao'], dif: 2 }, ok: { text: 'Mãos nas cordas, pés firmes no convés. Quando a tempestade passa, o capitão lhe agradece com um aperto de mão que quase quebra seus dedos.', fx: { fama: 3, karma: 4, stats: { fis: 2, dao: 1 } } }, fail: { text: 'Uma onda o arremessa contra o mastro. Você acorda no porão, com uma costela rachada.', fx: { ferida: 2 } } },
      { text: 'Usar o Qi para acalmar as ondas ao redor do barco.', check: { stat: ['esp', 'dao'], dif: 3, tag: 'qi' }, ok: { text: 'Um círculo de mar calmo no meio da fúria. A tripulação, de queixo caído, só faz o sinal da proteção.', fx: { fama: 5, xp: 12, stats: { esp: 1 } } }, fail: { text: 'As ondas riem do seu esforço. O barco sobrevive, não graças a você.', fx: { ferida: 1 } } },
    ],
  },
  {
    id: 'ilha_que_some', title: 'A Ilha Que Some ao Amanhecer', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, tierMax: 8, local: ['mar'] },
    text: 'Numa manhã de névoa, uma ilha de relva verde e flores azuis surge diante do barco. Dizem que é uma ilha móvel, que só toca o mar uma vez por século, e que quem passar a noite lá volta mudado, ou não volta.',
    choices: [
      { text: 'Passar a noite na ilha.', check: { stat: ['esp', 'dao', 'sor'], dif: 4 }, ok: { text: 'Uma noite estranha, perfumada, de sonhos densos. Ao amanhecer, a ilha afunda devagar, e você estranha por que está no barco, com uma flor azul no cabelo e uma lembrança de cem anos.', fx: { xp: 24, stats: { esp: 2, dao: 2 }, vida: 20 } }, fail: { text: 'A ilha o expulsa na primeira madrugada. Você acorda no mar, agarrado a um pedaço de madeira, e é resgatado ao meio-dia.', fx: { ferida: 3, xp: 4 } } },
      { text: 'Apenas contemplar a ilha de bordo e seguir.', res: { text: 'A ilha some com a luz do dia. Você escreve uma linha no diário: "Vi uma ilha que não existe."', fx: { stats: { dao: 1, sor: 1 } } } },
    ],
  },
  {
    id: 'serpente_marinha', title: 'A Serpente do Mar Profundo', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, tierMax: 7, local: ['mar'] },
    text: 'O mar fica estranhamente calmo. Embaixo do casco, uma sombra comprida passa, mais longa que o próprio barco. Depois, um olho amarelo, grande como um escudo, ergue-se da água e encara você.',
    choices: [
      { text: 'Enfrentar a serpente.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'Uma luta que arrasta o barco por meia légua. No fim, a serpente submerge e some. Entre as ondas, uma escama dourada flutua.', fx: { item: ['perola_abismo'], fama: 10, ferida: 3, xp: 12 } }, fail: { text: 'A serpente derruba o mastro e foge. Você sobrevive, com o orgulho a pique.', fx: { ferida: 4, fama: -2 } } },
      { text: 'Ficar imóvel e deixar a serpente passar.', check: { stat: ['dao', 'sor'], dif: 2 }, ok: { text: 'A serpente examina o barco, desiste e desce. Alguns dias depois, um peixe pula para o convés com uma pérola na boca.', fx: { item: ['perola_abismo'], stats: { dao: 2 } } }, fail: { text: 'A serpente perde a paciência e bate no barco. Não afunda, mas quase.', fx: { ferida: 2 } } },
    ],
  },
  {
    id: 'barco_fantasma', title: 'O Barco Sem Tripulação', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7, local: ['mar'] },
    text: 'À noite, um barco de velas esfarrapadas e lanternas apagadas emerge da névoa, alinhado com o seu. Não há ninguém no convés, mas uma música abafada, de flauta, vem do porão.',
    choices: [
      { text: 'Abordar o barco e investigar a música.', check: { stat: ['esp', 'dao'], dif: 3, tag: 'mente' }, ok: { text: 'No porão, o fantasma de um músico toca a flauta, e agradece sua escuta com um baú cheio de moedas antigas. "Faltava alguém para ouvir."', fx: { pedras: 100, karma: 8, stats: { esp: 1, car: 1 } } }, fail: { text: 'A música o enfeitiça por horas. Você acorda no seu barco, com o outro já desaparecido.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Afastar-se do barco sem tocar nele.', res: { text: 'O barco fantasma acompanha por um tempo, depois some na névoa. Você não dorme bem naquela noite, mas dorme.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'ilha_pescadores', title: 'A Ilha dos Pescadores', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 1, tierMax: 7, local: ['mar'] },
    text: 'Uma ilha pequena, de casas de pedra e redes penduradas ao sol. Pescadores de pele curtida, hospitaleiros mas desconfiados, oferecem sopa de peixe e histórias do mar.',
    choices: [
      { text: 'Ficar uma semana, ajudando na pesca.', check: { stat: ['fis', 'car'], dif: 0 }, ok: { text: 'Redes, ondas, risadas e uma sopa que você nunca esquecerá. A ilha o adota, e um pescador velho lhe entrega uma âncora de madeira, talhada à mão, como recordação.', fx: { karma: 6, stats: { fis: 1, car: 1 }, xp: 6 } }, fail: { text: 'Você cai do barco duas vezes e é a piada da ilha. Mas rir com eles é bom.', fx: { stats: { car: 1 }, karma: 2 } } },
      { text: 'Perguntar sobre as lendas do mar.', res: { text: 'Um pescador conta, em voz baixa, histórias da ilha que some, da serpente e do barco sem tripulação. Cada uma vale uma viagem.', fx: { stats: { comp: 1, sor: 1 }, setFlags: ['conhece_lendas'] } } },
    ],
  },
  {
    id: 'perolas_abismo', title: 'As Pérolas do Abismo', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, tierMax: 8, local: ['mar'] },
    text: 'Um mergulhador, de olhos fundos e músculos de nadador, oferece levá-lo ao fundo, onde uma ostra gigante guarda as pérolas do abismo. Poucos retornam, mas os que retornam, dizem, voltam ricos.',
    choices: [
      { text: 'Mergulhar com ele até o fundo.', check: { stat: ['fis', 'esp', 'dao'], dif: 4 }, ok: { text: 'Pressão, escuridão, uma luz azul no fundo. A ostra se abre, e uma pérola do tamanho de um punho brilha como lua cheia.', fx: { item: ['perola_abismo'], pedras: 60, xp: 12, stats: { fis: 1, esp: 1 } } }, fail: { text: 'A pressão é demais. Você volta à superfície a meio caminho, com a cabeça latejando e as mãos vazias.', fx: { ferida: 3 } } },
      { text: 'Comprar uma pérola menor do mergulhador (50 pedras).', custo: 50, res: { text: 'Uma pérola pequena, mas perfeita. Ele aperta a sua mão e some em um bote.', fx: { stats: { sor: 1, car: 1 }, xp: 4 } } },
    ],
  },
];
