import type { GameEvent } from '../../types';

/**
 * Lote 13 — O mundo em movimento: eras de escala continental (ver src/data/mundo.ts).
 * Cada era tem um evento de abertura (sorteado só quando ela começa, por isso weight 0) e
 * eventos próprios (cond.mundo) que ganham peso enquanto ela dura.
 * Convenções: guerras entre seitas, marés de bestas, reinos secretos, pragas, quedas de dinastia,
 * culto demoníaco que ameaça a aliança marcial, festivais (Qingming, Festival dos Fantasmas, Meio do Outono).
 */
const W = (id: string) => ({ mundo: [id] });

export const lote13Mundo: GameEvent[] = [
  /* ================= GUERRA ENTRE SEITAS ================= */
  {
    id: 'mundo_guerra_inicio', title: 'A Guerra Entre as Seitas', rarity: 'raro', weight: 0, cooldown: 60,
    cond: W('guerra_seitas'),
    text: 'Mensageiros a cavalo correm de vale em vale: duas seitas poderosas romperam a trégua de cem anos por causa de um veio espiritual. Estandartes sobem nas muralhas, discípulos são convocados e viajantes passam a ser interrogados. Quem vive naquelas terras terá de escolher, ou fingir que não escolhe.',
    choices: [
      { text: 'Apresentar-se à seita justa e oferecer sua lâmina.', res: { text: 'O recrutador anota seu nome e entrega um estandarte pequeno. A causa parece justa, e as causas, como se sabe, sempre parecem.', fx: { setFlags: ['guerra_lado_justo'], fama: 3, stats: { dao: 1 } } } },
      { text: 'Oferecer seus serviços à seita rival, que paga melhor.', res: { text: 'As moedas são generosas, e as perguntas, poucas. Você veste uma faixa de outra cor e aprende a não olhar para quem a usava antes.', fx: { setFlags: ['guerra_lado_rival'], pedras: 40, karma: -4 } } },
      { text: 'Recusar os dois lados e ajudar os civis.', res: { text: 'Quando as bandeiras se movem, os refugiados são os primeiros a se mover. Você aprende, depressa, que neutralidade também tem preço.', fx: { setFlags: ['guerra_neutro'], karma: 8, stats: { dao: 1, car: 1 } } } },
      { text: 'Ficar longe e vender suprimentos aos dois lados.', res: { text: 'Armas, ervas e pílulas mudam de mãos tão rápido quanto as fronteiras. O lucro vem fácil, e o enjoo também.', fx: { setFlags: ['guerra_mercador'], pedras: 80, karma: -6 } } },
    ],
  },
  {
    id: 'guerra_linha_de_frente', title: 'A Linha de Frente', rarity: 'comum', cooldown: 30, weight: 2,
    cond: { ...W('guerra_seitas'), tierMin: 1, tierMax: 6 },
    text: 'O front se estende por vinte li de colinas. Do outro lado, estandartes de uma seita que você já visitou em tempos de paz. As ordens são claras e simples: segurar a posição até o amanhecer.',
    choices: [
      { text: 'Segurar a posição com tudo o que tem.', check: { stat: ['fis', 'dao', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'A noite é um vaivém de lanças e talismãs. Ao amanhecer, a linha ainda está de pé, e você também. Os soldados cantam seu nome, mesmo sem saber qual é.', fx: { fama: 8, xp: 8, ferida: 1, stats: { dao: 1 } } }, fail: { text: 'A linha cede na terceira vaga. Você recua com os que sobraram, e o gosto de cinza demora a sair da boca.', fx: { ferida: 3, fama: 2, stats: { dao: 1 } } } },
      { text: 'Recuar para uma posição melhor, mesmo contra as ordens.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'A manobra funciona. Os oficiais fingem que a ideia foi deles, e a linha mantém a colina seguinte.', fx: { fama: 4, stats: { comp: 1 } } }, fail: { text: 'Você é acusado de covardia, e a acusação cola.', fx: { fama: -4, karma: -2 } } },
    ],
  },
  {
    id: 'guerra_refugiados', title: 'Os Refugiados na Estrada', rarity: 'comum', cooldown: 25, weight: 2,
    cond: { ...W('guerra_seitas') },
    text: 'Uma coluna de refugiados cobre a estrada: velhos, crianças, carroças sem bois, panelas penduradas em varas. Pedem comida, abrigo e um caminho que não passe pelo front.',
    choices: [
      { text: 'Guiá-los por uma trilha segura que você conhece.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'Três dias de caminhada, sem uma única baixa. Uma criança dorme nas suas costas no último trecho.', fx: { karma: 12, fama: 4, stats: { dao: 1, car: 1 } } }, fail: { text: 'A trilha se revela mais difícil do que lembrava. Vocês chegam, mas deixam algo para trás, e você terá que conviver com o que foi.', fx: { karma: 6, ferida: 1 } } },
      { text: 'Dar o que puder (30 pedras em comida e panos).', custo: 30, res: { text: 'Uma sopa quente, cobertores, alguns sorrisos cansados. Não resolve o problema, mas resolve o dia.', fx: { karma: 8, fama: 2 } } },
      { text: 'Seguir viagem: não é problema seu.', res: { text: 'A coluna passa por você sem pedir mais. Os olhos que você evitou ficam no seu pescoço por muito tempo.', fx: { karma: -5, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'guerra_espiao_capturado', title: 'O Espião no Acampamento', rarity: 'raro', cooldown: 60, weight: 2,
    cond: { ...W('guerra_seitas'), tierMin: 1 },
    text: 'Os soldados trazem um jovem amarrado, com um mapa escondido na manga. Ele jura ser apenas um mensageiro. O comandante lhe pergunta, de olhos cansados: "Você fala a verdade melhor que eles. O que fazemos?"',
    choices: [
      { text: 'Interrogá-lo com paciência e sem violência.', check: { stat: ['car', 'comp'], dif: 2 }, ok: { text: 'Em uma hora, o jovem confessa tudo: o plano, os números, até os nomes dos pais. Você consegue uma informação decisiva, e a consciência limpa.', fx: { fama: 6, karma: 4, stats: { car: 1, comp: 1 } } }, fail: { text: 'O jovem não diz nada que valha. O comandante aceita seu relatório com um suspiro.', fx: { stats: { dao: 1 } } } },
      { text: 'Deixá-lo fugir à noite.', res: { text: 'Ninguém repara em você abrindo a corda. O jovem desaparece na escuridão, e você acorda pensando se fez a coisa certa.', fx: { karma: 6, fama: -2, stats: { dao: 1 } } } },
      { text: 'Pedir que o executem para evitar riscos.', res: { text: 'A ordem é cumprida sem cerimônia. O mapa é queimado. Naquela noite, o acampamento está mais quieto que de costume.', fx: { karma: -14, corr: 3, fama: 2 } } },
    ],
  },
  {
    id: 'guerra_tregua_negociada', title: 'A Mesa de Negociação', rarity: 'raro', cooldown: 80, weight: 1.5,
    cond: { ...W('guerra_seitas'), tierMin: 2, fameMin: 15 },
    text: 'Os líderes das duas seitas concordam em se encontrar numa casa de chá neutra, mas só se um cultivador de reputação intacta mediar. Seu nome é o único em que os dois confiam.',
    choices: [
      { text: 'Aceitar mediar a trégua.', check: { stat: ['car', 'comp', 'dao'], dif: 3 }, ok: { text: 'Três dias de chá, silêncios e cláusulas. No fim, os dois líderes assinam, de má vontade, uma trégua de quinze anos. A guerra, ao menos por ora, acaba.', fx: { fama: 18, karma: 14, stats: { car: 2, dao: 1 }, setFlags: ['mediou_a_guerra'] } }, fail: { text: 'Os líderes brigam por causa de uma vírgula. A reunião termina em gritos, e você sai com um gosto amargo e o convite para tentar de novo mais tarde.', fx: { fama: 2, stats: { car: 1 } } } },
      { text: 'Recusar: nem todo conflito merece um mediador.', res: { text: 'O mensageiro agradece, sem insistir. A guerra segue como seguiria, com um pouco mais de sangue do que haveria.', fx: { karma: -2 } } },
    ],
  },
  {
    id: 'guerra_ponte', title: 'A Ponte de Pedra', rarity: 'lendario', once: true, weight: 2,
    cond: { ...W('guerra_seitas'), tierMin: 2, tierMax: 5, flags: ['guerra_lado_justo'] },
    text: 'Um exército inteiro atravessará a ponte de pedra ao amanhecer, e a ponte é a única passagem em cem li. Atrás de você, uma vila de mortais. À sua frente, a coluna do inimigo, mais longa do que a névoa.',
    choices: [
      { text: 'Ficar na ponte e segurá-la até o fim.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'Dois mil passos, três mil golpes, uma ponte. Quando o inimigo recua, você não consegue mais levantar os braços. A vila inteira vai chorar em silêncio ao ver seu nome na lápide de uma ponte.', fx: { fama: 28, karma: 16, ferida: 4, stats: { dao: 3, fis: 1 }, setFlags: ['heroi_da_guerra'] } }, fail: { text: 'A ponte cai, e você com ela. Rios levam o que sobra. Acordado dias depois por pescadores, você descobre que a vila foi salva por outros.', fx: { ferida: 5, fama: 8, setFlags: ['heroi_da_guerra'] } } },
      { text: 'Destruir a ponte antes de o exército chegar.', check: { stat: ['esp', 'comp'], dif: 3, tag: 'formacao' }, ok: { text: 'Uma única runa, uma fissura precisa, e a ponte desaba em silêncio. O inimigo, furioso, perde dois dias procurando um caminho.', fx: { fama: 10, karma: 6, stats: { comp: 2 } } }, fail: { text: 'A ponte resiste ao primeiro golpe. Quando cai, é tarde demais para evitar o pior.', fx: { ferida: 3, fama: 2 } } },
    ],
  },

  /* ================= MARÉ DE BESTAS ================= */
  {
    id: 'mundo_mare_inicio', title: 'A Maré de Bestas', rarity: 'raro', weight: 0, cooldown: 60,
    cond: W('mare_bestas'),
    text: 'Pássaros somem do céu e feras de todas as espécies descem da cordilheira em debandada, como se fugissem de algo ainda pior. A terra treme sob o galope de mil patas. Em dois dias, a maré atingirá as primeiras vilas.',
    choices: [
      { text: 'Correr até a muralha e defender a primeira vila.', res: { text: 'Você chega ao amanhecer, junto com os poucos que ainda ousam ficar. A muralha é alta, mas a maré é maior.', fx: { setFlags: ['mare_defensor'], fama: 3, stats: { fis: 1 } } } },
      { text: 'Organizar a evacuação dos mais fracos.', res: { text: 'Carroças, jangadas, mulas e quem puder andar. A fila se estende por um dia inteiro, e cada hora parece uma barganha com a morte.', fx: { setFlags: ['mare_evacuador'], karma: 8, stats: { car: 1 } } } },
      { text: 'Caçar as bestas mais valiosas: núcleos valem fortunas.', res: { text: 'Você se infiltra nas bordas da maré, de lâmina em punho. Cada fera abatida é uma pequena fortuna, e cada passo, um pequeno risco.', fx: { setFlags: ['mare_cacador'], pedras: 20, stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'mare_muralha', title: 'A Muralha de Pedra Viva', rarity: 'comum', cooldown: 30, weight: 2,
    cond: { ...W('mare_bestas'), tierMin: 1, tierMax: 6 },
    text: 'A muralha da vila é velha e baixa. A maré bate nela em ondas: lobos, javalis de couro grosso, aves de bico de ferro. Os soldados estão exaustos, e o capitão grita por qualquer reforço.',
    choices: [
      { text: 'Reforçar a muralha com uma formação improvisada.', check: { stat: ['comp', 'esp'], dif: 2, tag: 'formacao' }, ok: { text: 'Linhas de Qi correm pela pedra como veias. A muralha resiste a mais três ondas, e os soldados recuperam o fôlego.', fx: { fama: 8, xp: 8, stats: { comp: 2 }, tecnica: ['defesa_muralha'] } }, fail: { text: 'A formação falha no pior momento, e a muralha racha em dois pontos. Você consegue ainda remendar, mas ao custo de uma manhã inteira.', fx: { fama: 2, ferida: 1, stats: { comp: 1 } } } },
      { text: 'Lutar em cima da muralha ao lado dos soldados.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você derruba bestas aos montes, e o resto da guarda ganha ânimo. A muralha ainda estará de pé ao anoitecer.', fx: { fama: 7, ferida: 1, stats: { fis: 1, dao: 1 }, xp: 6 } }, fail: { text: 'Uma ave de bico de ferro o derruba da muralha. Você acorda no pátio, com um corte fundo e o orgulho machucado.', fx: { ferida: 3, fama: 1 } } },
    ],
  },
  {
    id: 'mare_nucleos', title: 'Núcleos de Besta Aos Montes', rarity: 'comum', cooldown: 40, weight: 1.5,
    cond: { ...W('mare_bestas'), tierMin: 1, tierMax: 6 },
    text: 'Depois da primeira onda, o campo está coberto de carcaças com núcleos brilhando no peito. Mercadores já chegam com carroças. Todos querem os núcleos, e poucos querem enterrar os corpos.',
    choices: [
      { text: 'Recolher núcleos e vendê-los aos mercadores.', check: { stat: ['sor', 'fis'], dif: 1 }, ok: { text: 'Duas horas de trabalho sujo, uma bolsa pesada de núcleos pequenos e uma média. A vila precisará de dinheiro para reconstruir, e você doa uma parte.', fx: { pedras: 70, item: ['nucleo_besta_baixo'], karma: 2 } }, fail: { text: 'Outros mercadores chegaram antes. Sobram migalhas e disputas.', fx: { pedras: 15, ferida: 1 } } },
      { text: 'Ajudar a enterrar os corpos e deixar os núcleos para quem precisar.', res: { text: 'Pás, terra e uma oração baixa. A vila nunca esquece quem ficou para os mortos, mesmo os de quatro patas.', fx: { karma: 10, fama: 3, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'mare_besta_rei', title: 'O Rei da Maré', rarity: 'raro', cooldown: 80,
    cond: { ...W('mare_bestas'), tierMin: 2, tierMax: 7 },
    text: 'No terceiro dia, a maré se abre como um rio ao meio. Uma criatura imensa, de pelo cinzento e olhos de brasa, caminha devagar, sem pressa e sem medo. Sozinha, ela vale por uma legião de bestas menores.',
    choices: [
      { text: 'Enfrentar o Rei da Maré.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'Uma luta que remodela o vale. Quando o Rei tomba, a maré inteira se dissolve, e os que sobraram fogem para as montanhas. Seu nome entra nas canções de três vilas.', fx: { fama: 22, item: ['nucleo_besta_alto'], ferida: 4, stats: { dao: 2, fis: 2 }, xp: 14, setFlags: ['matou_rei_da_mare'] } }, fail: { text: 'O Rei o lança contra uma pedra. Você acorda no dia seguinte e descobre que a maré passou por cima da vila, e o Rei, por cima de mais alguém. Mesmo assim, você vive.', fx: { ferida: 5, fama: 4, karma: 2 } } },
      { text: 'Tentar acalmar o Rei da Maré.', check: { stat: ['esp', 'car', 'dao'], dif: 5, tag: 'besta' }, ok: { text: 'O Rei se detém. Por um longo instante, vocês dois se olham. Depois, ele vira o rosto, e a maré inteira o segue de volta às montanhas. Uma guerra evitada, e uma lenda nasce.', fx: { fama: 24, karma: 14, stats: { esp: 2, car: 1 }, xp: 14 } }, fail: { text: 'O Rei não escuta. Você mal consegue escapar da pisada seguinte.', fx: { ferida: 3 } } },
    ],
  },
  {
    id: 'mare_vila_sitiada', title: 'A Vila Cercada', rarity: 'comum', cooldown: 40, weight: 1.5,
    cond: { ...W('mare_bestas'), tierMin: 1, tierMax: 6 },
    text: 'Uma vila está cercada pela maré, com os portões trancados e a comida no fim. Uma bandeira branca balança numa torre. Quem chegar lá poderá salvar uma centena de vidas, e quem tentar sem plano, morrerá com elas.',
    choices: [
      { text: 'Abrir caminho até a vila e escoltar os moradores para fora.', check: { stat: ['fis', 'esp', 'sor'], dif: 3, tag: 'combate' }, ok: { text: 'Sangue, garras e um corredor aberto à força. Cento e doze pessoas atravessam por ele, e você é o último a sair, com um bebê dormindo nos braços.', fx: { fama: 14, karma: 14, ferida: 2, stats: { fis: 1, dao: 1 } } }, fail: { text: 'O corredor se fecha antes da hora. Você salva metade, e carregará o resto na memória.', fx: { fama: 4, karma: 6, ferida: 3 } } },
      { text: 'Enviar mensageiros à guarnição mais próxima e esperar.', res: { text: 'O reforço chega no dia seguinte, a tempo de salvar a maior parte. Não foi heroico, mas funcionou.', fx: { fama: 2, karma: 4, stats: { comp: 1 } } } },
    ],
  },

  /* ================= REINO SECRETO ABERTO ================= */
  {
    id: 'mundo_reino_inicio', title: 'O Reino Secreto Se Abre', rarity: 'raro', weight: 0, cooldown: 60,
    cond: W('reino_secreto'),
    text: 'Uma coluna de luz perfura o céu acima de um vale esquecido. Cultivadores de todas as seitas largam o que faziam e correm para lá: um reino secreto abriu a porta por poucos anos, e quem entrar terá acesso a heranças, ervas e perigos que o mundo de fora desconhece.',
    choices: [
      { text: 'Correr até a porta antes dos outros.', res: { text: 'A estrada vira procissão. No vale, centenas de tendas já cercam o portal, e todos fingem não se observar.', fx: { setFlags: ['reino_corredor'], fama: 1 } } },
      { text: 'Vender mapas e suprimentos aos corredores.', res: { text: 'Uma tenda, uma placa e uma fila. Vender pá é sempre melhor que cavar, dizem os velhos mercadores.', fx: { setFlags: ['reino_vendedor'], pedras: 60, karma: -2 } } },
      { text: 'Ficar longe: reinos secretos têm cemitérios próprios.', res: { text: 'Você segue o caminho de sempre, ouvindo ao longe o murmúrio de uma multidão que corre para o fim do mapa.', fx: { setFlags: ['reino_cauteloso'], stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'reino_emboscada_entrada', title: 'A Emboscada na Porta', rarity: 'comum', cooldown: 40, weight: 2,
    cond: { ...W('reino_secreto'), tierMin: 1, tierMax: 6 },
    text: 'No caminho de acesso ao portal, uma gangue de cultivadores bloqueia a passagem e cobra pedágio em pedras e itens. Quem se recusa a pagar é empurrado para o desfiladeiro. Eles se dizem "guardiões da fila".',
    choices: [
      { text: 'Pagar o pedágio e seguir.', custo: 20, res: { text: 'As pedras mudam de mão sem cerimônia. O líder da gangue o cumprimenta como a um cliente satisfeito.', fx: { karma: -1 } } },
      { text: 'Enfrentar a gangue.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Em poucos minutos, a gangue vira poeira, e os outros viajantes o aplaudem como se você fosse da casa. A passagem fica livre por uma semana.', fx: { fama: 6, pedras: 30, stats: { dao: 1 } } }, fail: { text: 'A gangue é maior do que parecia. Você é jogado de lado, e a fila anda sem você.', fx: { ferida: 2, fama: -2 } } },
      { text: 'Contornar o desfiladeiro por uma trilha de cabras.', check: { stat: ['fis', 'sor'], dif: 1, tag: 'fuga' }, ok: { text: 'Duas horas de rastejar entre pedras, e você aparece do outro lado, sem pagar, sem lutar, sem ser notado.', fx: { stats: { sor: 1, fis: 1 } } }, fail: { text: 'A trilha termina num paredão. Você precisa voltar e pagar em dobro.', fx: { pedras: -30, ferida: 1 } } },
    ],
  },
  {
    id: 'reino_mercado_chaves', title: 'O Mercado de Chaves', rarity: 'comum', cooldown: 40, weight: 1.5,
    cond: { ...W('reino_secreto'), tierMin: 1, tierMax: 7 },
    text: 'Na tenda de um mercador vesgo, fichas de jade numeradas ditam a ordem de entrada. Estão à venda por preços absurdos, e já há revendedores, falsificadores e até um leiloeiro itinerante.',
    choices: [
      { text: 'Comprar uma ficha numerada (70 pedras).', custo: 70, res: { text: 'A ficha é sua, e o número é razoável. Entrar entre os primeiros vale quase o dobro do que custou.', fx: { item: ['selo_do_guardiao'], stats: { sor: 1 } } } },
      { text: 'Tentar falsificar uma ficha.', check: { stat: ['car', 'comp'], dif: 3 }, ok: { text: 'O mercador vesgo olha, olha de novo, dá de ombros e a aceita. Hoje é um dia de bom humor.', fx: { item: ['selo_do_guardiao'], karma: -4 } }, fail: { text: 'A falsificação é descoberta, e os guardas o expulsam do mercado com uma multa.', fx: { pedras: -30, fama: -4, karma: -4 } } },
      { text: 'Ignorar o mercado e esperar a multidão diminuir.', res: { text: 'Semanas depois, a fila é bem menor, e o portal ainda está aberto, embora menos rico.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'reino_prova_do_portao', title: 'A Prova do Portal', rarity: 'raro', once: true, weight: 2,
    cond: { ...W('reino_secreto'), tierMin: 2, tierMax: 7 },
    text: 'O portal pede uma prova: cada visitante entra sozinho, e o reino o devolve com um julgamento escrito na testa, visível só a quem sabe ler a luz. Dizem que alguns saem com tesouros; outros, com marcas que nunca saem.',
    choices: [
      { text: 'Atravessar o portal e enfrentar o julgamento.', check: { stat: ['dao', 'esp', 'sor'], dif: 3, tag: 'mente' }, ok: { text: 'A luz lê você de ponta a ponta, e escreve uma única palavra: "Digno". Uma herança menor o aguarda no primeiro vale, e a reputação de quem foi aprovado.', fx: { item: ['pilula_passagem_4'], fama: 8, stats: { dao: 2 }, xp: 14 } }, fail: { text: 'A luz lê "Incompleto", e o reino o devolve ao vale com uma marca fria no pulso. Nada de grave, mas todos veem.', fx: { fama: -2, stats: { dao: 1 }, ferida: 1 } } },
    ],
  },
  {
    id: 'reino_depois', title: 'Quem Voltou do Reino', rarity: 'comum', cooldown: 60, weight: 1.5,
    cond: { ...W('reino_secreto'), tierMin: 1 },
    text: 'Os primeiros a voltar do reino secreto saem da luz com olhos de quem viu demais. Alguns riem, outros não falam. Um jovem pálido segura nas mãos um pergaminho que vale mais do que uma aldeia.',
    choices: [
      { text: 'Comprar o pergaminho do jovem (100 pedras).', custo: 100, check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'O pergaminho é real, e traz uma técnica antiga de Qi lunar. Poucos sabem que existe, e você será um deles.', fx: { tecnica: ['respiracao_lunar'], xp: 12, stats: { comp: 1 } } }, fail: { text: 'O pergaminho é falso, e você só descobre ao tentar usá-lo. O jovem já sumiu.', fx: { karma: -1 } } },
      { text: 'Ouvir o relato do jovem e agradecer.', res: { text: 'Ele fala por uma hora, quase sem respirar. Você sai com mais perguntas que respostas, e com um pouco de medo.', fx: { stats: { comp: 1, dao: 1 } } } },
    ],
  },

  /* ================= PRAGA ================= */
  {
    id: 'mundo_praga_inicio', title: 'A Praga Chega', rarity: 'raro', weight: 0, cooldown: 60,
    cond: W('praga'),
    text: 'Primeiro foram os porcos. Depois os cães. Depois, os curandeiros, que viram o rosto para o lado antes de dar um diagnóstico. A febre se espalha de vila em vila, sem respeitar rio ou muralha, e os mais fracos caem primeiro.',
    choices: [
      { text: 'Ajudar os curandeiros e as famílias doentes.', res: { text: 'Você veste um pano no rosto, ferve a água e trabalha ao lado de gente cansada. A praga não escolhe, e você também não.', fx: { setFlags: ['praga_cuidador'], karma: 8, stats: { dao: 1 } } } },
      { text: 'Isolar-se numa casa afastada.', res: { text: 'Uma porta trancada, estoques para meses e um silêncio que não é exatamente paz.', fx: { setFlags: ['praga_isolado'], stats: { dao: 1 } } } },
      { text: 'Vender remédios caros a quem tiver pressa.', res: { text: 'Todo desespero vira mercado. Seus frascos esgotam em dois dias, e o dinheiro entra sem alegria.', fx: { setFlags: ['praga_comerciante'], pedras: 60, karma: -8 } } },
    ],
  },
  {
    id: 'praga_aldeia_isolada', title: 'A Aldeia em Quarentena', rarity: 'comum', cooldown: 30, weight: 2,
    cond: { ...W('praga'), tierMax: 5 },
    text: 'Uma aldeia inteira foi cercada com cordas e bandeiras amarelas: ninguém entra, ninguém sai. Ao longe, os doentes pedem água. Os soldados de guarda, com medo, não se atrevem a se aproximar.',
    choices: [
      { text: 'Entrar na aldeia e levar água e ervas.', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'Você entra, serve água, troca panos, faz o que pode. Sai depois de três dias, extenuado, saudável e muito querido.', fx: { karma: 14, fama: 4, stats: { dao: 2, fis: 1 } } }, fail: { text: 'Você adoece, mas se recupera. A aldeia nunca esquece que alguém entrou.', fx: { karma: 10, ferida: 3, stats: { dao: 1 } } } },
      { text: 'Deixar suprimentos na entrada, sem entrar.', res: { text: 'Água, pão, ervas e uma nota de boa sorte. Não é muito, mas é algo.', fx: { karma: 5, pedras: -10 } } },
      { text: 'Seguir adiante sem olhar para trás.', res: { text: 'As bandeiras amarelas ficam pequenas no horizonte. A culpa, não.', fx: { karma: -4 } } },
    ],
  },
  {
    id: 'praga_cura_experimental', title: 'Uma Cura Experimental', rarity: 'raro', cooldown: 80, weight: 2,
    cond: { ...W('praga'), tierMin: 1, tierMax: 7, path: ['alquimia'] },
    text: 'Sua experiência como alquimista chama a atenção de um hospital de campanha. Há uma fórmula antiga contra febres espirituais, mas exige uma erva rara, tempo e coragem de testar em quem não tem mais escolha.',
    choices: [
      { text: 'Refinar a cura e testá-la nos doentes.', check: { stat: 'comp', dif: 3, tag: 'alquimia' }, ok: { text: 'No terceiro dia, a primeira fila de doentes se levanta, pálida e viva. A cura funciona. A praga, pouco a pouco, perde a força na região.', fx: { item: ['cura_da_praga'], fama: 16, karma: 14, stats: { comp: 2 }, xp: 12 } }, fail: { text: 'A cura é parcial: salva alguns, e outros, não. Você refaz a fórmula, noite após noite.', fx: { karma: 6, fama: 4, stats: { comp: 1 }, ferida: 1 } } },
    ],
  },
  {
    id: 'praga_rumor_veneno', title: 'O Rumor de Envenenamento', rarity: 'comum', cooldown: 50, weight: 1.5,
    cond: { ...W('praga'), tierMin: 1 },
    text: 'Na praça de um vilarejo, uma multidão enfurecida cerca um forasteiro: dizem que ele envenenou o poço e trouxe a praga. Ele jura inocência, apavorado. Os mais velhos pedem pressa; os mais moços, pedras.',
    choices: [
      { text: 'Intervir e exigir um julgamento justo.', check: { stat: ['car', 'comp'], dif: 2 }, ok: { text: 'Você examina o poço, a água e o forasteiro. A conclusão é simples: ninguém envenenou nada. A multidão se desfaz, envergonhada, e o forasteiro, trêmulo, o abraça.', fx: { karma: 12, fama: 4, stats: { car: 1, comp: 1 } } }, fail: { text: 'A multidão não ouve. Você consegue tirar o forasteiro vivo, mas o preço é uma pedra na cabeça.', fx: { karma: 8, ferida: 2 } } },
      { text: 'Não se meter: a multidão é maior que você.', res: { text: 'O forasteiro some entre os corpos. Ninguém chega a saber o que houve, e você carrega o não-saber.', fx: { karma: -8, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'praga_orfaos', title: 'Os Órfãos da Febre', rarity: 'comum', cooldown: 50, weight: 1.5,
    cond: { ...W('praga'), tierMin: 1 },
    text: 'Três crianças, a mais velha com uns dez anos, aparecem à sua porta. Os pais morreram da febre, e as vilas vizinhas não querem recebê-las por medo do contágio.',
    choices: [
      { text: 'Acolhê-las até que haja uma família para elas.', res: { text: 'A casa fica barulhenta, e a despensa, vazia. Mas, no fim do ano, as três têm lares, e você, uma saudade nova.', fx: { karma: 12, stats: { car: 1, dao: 1 }, pedras: -20 } } },
      { text: 'Levar as crianças a um templo que cuida de órfãos.', res: { text: 'A madre aceita com gratidão. Você sai mais leve, e com a promessa de visitar.', fx: { karma: 6 } } },
      { text: 'Negar abrigo: não tem como cuidar delas.', res: { text: 'A porta se fecha devagar. A mais velha não chora; a menor, sim. Você não dorme essa noite.', fx: { karma: -8, stats: { dao: -1 } } } },
    ],
  },

  /* ================= MUDANÇA DE DINASTIA ================= */
  {
    id: 'mundo_dinastia_inicio', title: 'A Dinastia Cai', rarity: 'raro', weight: 0, cooldown: 60,
    cond: W('mudanca_dinastia'),
    text: 'O imperador morreu sem herdeiro claro, e três generais se declararam regentes ao mesmo tempo. Cidades hasteiam estandartes diferentes, impostos mudam de mão a cada estação, e as seitas, que juravam neutralidade, começam a escolher lados em surdina.',
    choices: [
      { text: 'Apoiar o general que promete justiça aos camponeses.', res: { text: 'Seu apoio pesa pouco em soldados e muito em reputação. Os aldeões o chamam de amigo.', fx: { setFlags: ['dinastia_povo'], karma: 6, fama: 3 } } },
      { text: 'Apoiar o general com mais exércitos.', res: { text: 'Prudência e pragmatismo. Os soldados dele o recebem bem, mas pelo que você carrega, e não pelo que você é.', fx: { setFlags: ['dinastia_forca'], pedras: 30, karma: -2 } } },
      { text: 'Afastar-se: dinastias vêm e vão.', res: { text: 'Você observa de longe as bandeiras trocarem de cor. Os velhos têm razão: nada dura, nem o que parece eterno.', fx: { setFlags: ['dinastia_neutro'], stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'dinastia_convocacao', title: 'A Convocação do Novo Trono', rarity: 'raro', cooldown: 80, weight: 1.5,
    cond: { ...W('mudanca_dinastia'), tierMin: 2, fameMin: 12 },
    text: 'Um enviado do novo trono entrega um decreto: todos os cultivadores acima do segundo reino devem se registrar na corte e jurar lealdade. Quem não jurar, será considerado inimigo do reino.',
    choices: [
      { text: 'Jurar lealdade e aceitar um título.', res: { text: 'Um selo, uma túnica nova e uma cadeira num salão onde ninguém se olha. O reino ganha uma espada, e você, um lugar à mesa.', fx: { fama: 8, pedras: 80, karma: -2, setFlags: ['visitou_corte'] } } },
      { text: 'Recusar o juramento e partir antes do prazo.', check: { stat: ['sor', 'fis'], dif: 2, tag: 'fuga' }, ok: { text: 'Você deixa a cidade de madrugada. O decreto o alcançará de longe, mas sem poder de fazer algo.', fx: { fama: 2, stats: { dao: 2 } } }, fail: { text: 'Guardas bloqueiam a estrada. Você escapa, mas perde pertences e ganha um inimigo.', fx: { ferida: 2, pedras: -30, setFlags: ['inimigo_do_trono'] } } },
    ],
  },
  {
    id: 'dinastia_principe_fugitivo', title: 'O Príncipe Que Fugiu', rarity: 'raro', once: true, weight: 2,
    cond: { ...W('mudanca_dinastia'), tierMin: 1 },
    text: 'À noite, uma criança de seis ou sete anos e seu tutor, ambos suados e cobertos de lama, batem à sua porta. O menino carrega, no bolso, um selo imperial. "Eles vão matá-lo", sussurra o tutor. "Por favor."',
    choices: [
      { text: 'Esconder o menino e protegê-lo.', check: { stat: ['sor', 'comp', 'dao'], dif: 2 }, ok: { text: 'Semanas escondidos, noites sem dormir e uma fuga espetacular numa carroça de repolhos. O menino é levado a um mosteiro distante, a salvo. Ele nunca esquecerá você.', fx: { karma: 14, fama: 4, stats: { dao: 2 }, setFlags: ['protegeu_principe'] } }, fail: { text: 'Os caçadores do trono encontram vocês. Você luta, escapa e salva o menino, mas o preço é uma ferida funda e uma lembrança que arde.', fx: { ferida: 4, karma: 10, setFlags: ['protegeu_principe'] } } },
      { text: 'Entregá-lo aos soldados em troca de uma recompensa.', res: { text: 'As moedas são generosas, e as mãos, trêmulas. O menino olha para você sem raiva, e isso é pior.', fx: { pedras: 200, karma: -24, stats: { dao: -2 }, corr: 4 } } },
    ],
  },
  {
    id: 'dinastia_impostos', title: 'O Imposto das Seitas', rarity: 'comum', cooldown: 40, weight: 1.5,
    cond: { ...W('mudanca_dinastia'), tierMin: 1 },
    text: 'Um cobrador do novo trono exige das seitas um imposto retroativo de vinte anos. As seitas ameaçam resistir, e os camponeses, que pagam em dobro, esperam que alguém tome seu partido.',
    choices: [
      { text: 'Pagar o imposto e evitar conflitos (60 pedras).', custo: 60, res: { text: 'O cobrador carimba o recibo com um sorriso de quem esperava coisa pior. A paz custa caro, mas custa menos que uma guerra.', fx: { karma: 2 } } },
      { text: 'Negociar com o cobrador um abatimento.', check: { stat: ['car', 'comp'], dif: 2 }, ok: { text: 'Duas horas de chá e cálculo. O imposto cai pela metade, e o cobrador vira um aliado discreto.', fx: { fama: 3, pedras: -25, stats: { car: 1 } } }, fail: { text: 'O cobrador não cede. Você paga o valor cheio, e ainda perde tempo.', fx: { pedras: -60 } } },
      { text: 'Recusar o pagamento e apoiar os camponeses.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'Sua recusa pública inspira a vila. O cobrador recua, de olhos fixos, e sua fama de justo cresce nas terras vizinhas.', fx: { fama: 8, karma: 8, setFlags: ['inimigo_do_trono'] } }, fail: { text: 'O cobrador responde com soldados. Você escapa, mas a vila paga o preço.', fx: { fama: -2, karma: -2, ferida: 2 } } },
    ],
  },

  /* ================= CULTO DO DEMÔNIO CELESTIAL ================= */
  {
    id: 'mundo_culto_inicio', title: 'O Culto do Demônio Celestial', rarity: 'raro', weight: 0, cooldown: 60,
    cond: W('culto_ascende'),
    text: 'Boatos viram mensageiros, e mensageiros viram sangue: o Culto do Demônio Celestial, que dormia há três gerações, desperta. Seus emissários, de manto negro e olhos sem pupila, percorrem o continente. A Aliança Marcial convoca todas as seitas e todos os cultivadores com um mínimo de honra.',
    choices: [
      { text: 'Apresentar-se à Aliança Marcial.', res: { text: 'Uma sala cheia de rostos graves, estandartes de dez seitas e uma pergunta repetida: "De que lado você está?" Seu nome entra numa lista.', fx: { setFlags: ['alianca_marcial'], fama: 4, karma: 4 } } },
      { text: 'Estudar o Culto em segredo, antes de tomar partido.', res: { text: 'Você segue dois emissários de longe, anota o que ouve e quase é descoberto por um corvo, que o encara de cima de uma árvore.', fx: { setFlags: ['culto_observador'], stats: { comp: 1, sor: 1 } } } },
      { text: 'Procurar o Culto e oferecer seus serviços.', res: { text: 'Os emissários o recebem sem espanto. "Muitos nos procuram quando ficam cansados de esperar." Uma marca fria é gravada no seu pulso.', fx: { setFlags: ['culto_aliado'], corr: 14, karma: -8, pedras: 40 } } },
    ],
  },
  {
    id: 'culto_aldeia_convertida', title: 'A Aldeia Que Mudou de Rosto', rarity: 'comum', cooldown: 50, weight: 1.5,
    cond: { ...W('culto_ascende'), tierMin: 2 },
    text: 'Uma aldeia onde você já passou noites agora tem bandeiras negras nas portas e crianças que cantam hinos estranhos. Os moradores sorriem demais e olham para você como se o conhecessem de outras vidas.',
    choices: [
      { text: 'Investigar o que mudou.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'mente' }, ok: { text: 'Uma formação de controle mental está enterrada sob o poço. Você a desfaz, e os moradores caem de joelhos, confusos e chorando.', fx: { fama: 10, karma: 12, stats: { comp: 2 }, xp: 10 } }, fail: { text: 'A formação o repele, e os moradores o expulsam com pedras, educados e sorridentes.', fx: { ferida: 2, fama: -2 } } },
      { text: 'Avisar a Aliança Marcial e partir.', res: { text: 'Uma pomba mensageira, uma mensagem curta e um quilômetro de poeira atrás de você.', fx: { karma: 3, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'culto_emissario', title: 'O Emissário de Olhos Brancos', rarity: 'raro', cooldown: 60, weight: 1.5,
    cond: { ...W('culto_ascende'), tierMin: 2, tierMax: 6 },
    text: 'Um emissário do Culto senta-se à sua mesa numa estalagem e serve o chá como se fosse o dono. "Você tem potencial", diz, sem ameaça. "A Aliança vai perder, e os que se juntarem cedo ao lado certo serão lembrados."',
    choices: [
      { text: 'Recusar e continuar tomando o chá.', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'O emissário sorri com respeito, termina o chá e deixa uma moeda sobre a mesa. "Não esquecerei seu rosto." Ele se vai sem violência.', fx: { karma: 4, stats: { dao: 2 }, fama: 3 } }, fail: { text: 'O emissário não toma bem a recusa. A estalagem toda sente a pressão do seu Qi antes de ele se retirar.', fx: { ferida: 2, setFlags: ['inimigo_do_culto'] } } },
      { text: 'Aceitar o convite e jurar lealdade ao Culto.', res: { text: 'Você assina com sangue, e a tinta queima ao secar. Um poder frio sobe pelas veias, e a estalagem, de repente, parece muito pequena.', fx: { setFlags: ['culto_aliado'], corr: 16, xp: 14, karma: -12, faccao: 'demoniaca' } } },
    ],
  },
  {
    id: 'culto_batalha_passo', title: 'A Batalha do Passo da Névoa', rarity: 'raro', once: true, weight: 2,
    cond: { ...W('culto_ascende'), tierMin: 3, tierMax: 7, flags: ['alianca_marcial'] },
    text: 'Um exército de cultistas desce pelo Passo da Névoa em direção ao sul. A Aliança Marcial reúne seus melhores para bloquear a passagem. O comandante o chama pelo nome, diante de todos, para liderar a ala esquerda.',
    choices: [
      { text: 'Liderar a ala esquerda.', check: { stat: ['fis', 'esp', 'dao', 'car'], dif: 4, tag: 'combate' }, ok: { text: 'Três horas de combate e uma retirada ordenada do inimigo. O Passo da Névoa permanece fechado, e seu nome vira a senha dos soldados.', fx: { fama: 20, karma: 12, ferida: 3, stats: { dao: 2, car: 1 }, setFlags: ['heroi_da_guerra'] } }, fail: { text: 'A ala esquerda cede, mas a retirada é ordenada, e metade dos homens vive por sua causa. A Aliança lhe agradece pela honra, e o inimigo pela abertura.', fx: { fama: 8, ferida: 5, karma: 6 } } },
      { text: 'Recusar e ficar na retaguarda tratando feridos.', res: { text: 'Não é glorioso, mas é útil. Você passa a noite costurando carne, fazendo curativos e ouvindo gritos que depois sonhará.', fx: { karma: 10, fama: 3, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'culto_traidor_alianca', title: 'O Traidor Entre as Seitas', rarity: 'raro', once: true, weight: 1.5,
    cond: { ...W('culto_ascende'), tierMin: 3, flags: ['alianca_marcial'] },
    text: 'Um documento chega às suas mãos por vias que você prefere não investigar: um dos líderes da Aliança Marcial vende planos ao Culto. Se você acusá-lo sem provas, será expulso; se esperar, muitos morrerão.',
    choices: [
      { text: 'Reunir provas e expor o traidor diante da Aliança.', check: { stat: ['comp', 'car', 'dao'], dif: 4 }, ok: { text: 'Duas semanas de investigação silenciosa. A acusação é feita, e as provas são irrefutáveis. O traidor tenta fugir; é preso à porta, com o rosto em cinza.', fx: { fama: 16, karma: 10, stats: { comp: 2 }, setFlags: ['expos_traidor_alianca'] } }, fail: { text: 'As provas são insuficientes, e o traidor responde com calúnias. Você é afastado da Aliança por um tempo.', fx: { fama: -6, stats: { dao: 1 } } } },
      { text: 'Informar discretamente ao líder mais confiável.', res: { text: 'A informação chega ao destino certo. O traidor desaparece uma noite depois, sem um sussurro. Ninguém lhe agradece, e é isso mesmo que você queria.', fx: { karma: 6, stats: { comp: 1, dao: 1 } } } },
    ],
  },

  /* ================= GRANDES FESTIVAIS ================= */
  {
    id: 'mundo_festivais_inicio', title: 'A Era dos Grandes Festivais', rarity: 'raro', weight: 0, cooldown: 60,
    cond: W('festivais'),
    text: 'Anos de paz, colheitas fartas e imperadores generosos deixam o continente de bom humor. Todos os festivais do calendário voltam a ser celebrados com lanternas, incenso e danças: o dos Ancestrais na primavera, o dos Fantasmas famintos no verão e o da Lua cheia no outono.',
    choices: [
      { text: 'Participar de todas as festas que puder.', res: { text: 'Três estações de música e vinho morno. É a paz como poucos conhecem: cheia de pequenos prazeres que parecem durar para sempre.', fx: { setFlags: ['festivais_participante'], stats: { car: 1 }, ferida: -1 } } },
      { text: 'Aproveitar a paz para cultivar longe da multidão.', res: { text: 'Enquanto o continente festeja, você se retira, e a calma do mundo ajuda a calma de dentro.', fx: { xp: 8, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'festival_qingming', title: 'O Festival dos Ancestrais', rarity: 'comum', cooldown: 25, weight: 2,
    cond: { ...W('festivais') },
    text: 'No dia dos Ancestrais, as famílias sobem as colinas com cestas de comida, papel dourado e vassouras para limpar as lápides. Você tem uma colina para visitar, e alguém para lembrar, mesmo que não saiba bem quem.',
    choices: [
      { text: 'Subir à colina com oferendas e limpar as lápides.', res: { text: 'Folhas secas, musgo, o cheiro de incenso. Você diz em voz baixa o nome de quem partiu, e a colina parece ouvir.', fx: { karma: 6, stats: { dao: 2 }, tecnica: ['oracao_ancestrais'] } } },
      { text: 'Oferecer sua ajuda aos mais velhos que não conseguem subir.', res: { text: 'Cesto nas costas, passos lentos. No topo, uma anciã chora e agradece, e dá a você uma tigela de arroz doce.', fx: { karma: 8, stats: { car: 1, fis: 1 } } } },
      { text: 'Aproveitar o dia para cultivar: os mortos entendem.', res: { text: 'Uma meditação silenciosa sob uma árvore alta. Quando abre os olhos, a colina está vazia, e alguém deixou uma flor ao seu lado.', fx: { xp: 8, stats: { esp: 1 } } } },
    ],
  },
  {
    id: 'festival_fantasmas', title: 'A Noite dos Fantasmas Famintos', rarity: 'comum', cooldown: 25, weight: 2,
    cond: { ...W('festivais') },
    text: 'Uma vez por ano, as portas entre os mundos ficam entreabertas, e os mortos visitam os vivos. A cidade se enche de fogueiras, tigelas de comida nas portas e papéis queimados. Os mais velhos não saem de casa depois do pôr do sol.',
    choices: [
      { text: 'Deixar oferendas à porta e acender incenso.', res: { text: 'Uma tigela de arroz, uma vela, três varetas de incenso. Quando a noite cai, algo sopra a chama de leve, e uma sensação morna passa pela casa.', fx: { karma: 5, stats: { dao: 1 } } } },
      { text: 'Passear pela cidade e conversar com os fantasmas.', check: { stat: ['esp', 'dao'], dif: 2, tag: 'mente' }, ok: { text: 'Você percebe um vulto que o acompanha por três ruas. Por fim, ele sussurra um nome e some. Na manhã seguinte, você leva o recado à família, que chora e agradece.', fx: { karma: 12, fama: 3, stats: { esp: 2, dao: 1 }, xp: 8 } }, fail: { text: 'Os fantasmas o ignoram, ou você não os ouve. A noite passa em branco, com uma gota fria na nuca.', fx: { stats: { esp: 1 } } } },
    ],
  },
  {
    id: 'festival_meio_outono', title: 'O Festival da Lua Cheia', rarity: 'comum', cooldown: 25, weight: 2,
    cond: { ...W('festivais') },
    text: 'No outono, a lua cheia nasce enorme e dourada. Famílias comem bolos redondos, contam a lenda da dama que subiu à lua e do arqueiro que ficou para trás. Há quem diga que, nessa noite, os pedidos feitos à lua chegam mais rápido ao Céu.',
    choices: [
      { text: 'Subir a um terraço e meditar sob a lua cheia.', check: { stat: ['esp', 'dao'], dif: 1, tag: 'qi' }, ok: { text: 'Uma luz fria banha seu rosto. O Qi lunar, mais suave que o solar, entra pelos meridianos como leite morno. Você dorme pouco, mas desperta renovado.', fx: { xp: 14, stats: { esp: 1 } } }, fail: { text: 'Nuvens cobrem a lua por toda a noite. Você ri de si mesmo, come um bolo e vai dormir.', fx: { xp: 3, stats: { car: 1 } } } },
      { text: 'Compartilhar o bolo da lua com alguém especial.', res: { text: 'Duas pessoas, um terraço, uma lua enorme e nada mais a dizer. Um pequeno gesto, que vale um ano inteiro.', fx: { karma: 4, stats: { car: 2, dao: 1 }, setFlags: ['amor_incipiente'], agenda: [{ event: 'amor_decisao', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'festival_lanternas', title: 'O Rio das Lanternas', rarity: 'comum', cooldown: 25, weight: 1.5,
    cond: { ...W('festivais') },
    text: 'Milhares de lanternas de papel flutuam num rio escuro, cada uma levando um pedido ou uma lembrança. Rapazes, moças, velhos e crianças as soltam em silêncio, e o rio vira um céu invertido.',
    choices: [
      { text: 'Soltar uma lanterna com um desejo para o futuro.', res: { text: 'A lanterna flutua, vacila, e continua. Algum dia, ela chegará ao mar.', fx: { stats: { sor: 1, dao: 1 } } } },
      { text: 'Soltar uma lanterna com uma saudade do passado.', res: { text: 'Uma pessoa, uma lembrança, uma luz que se afasta devagar. O peito aperta e depois se solta.', fx: { stats: { dao: 2 }, karma: 3 } } },
    ],
  },

  /* ================= ANO DO COMETA ================= */
  {
    id: 'mundo_cometa_inicio', title: 'O Cometa Rasga o Céu', rarity: 'raro', weight: 0, cooldown: 60,
    cond: W('cometa'),
    text: 'Uma estrela com cauda longa surge no céu do norte e cresce a cada noite. Os astrônomos da corte entram em pânico, os monges estudam seus próprios textos e os cultivadores sentem o Qi do mundo vibrar, como se alguém tivesse tocado uma corda grande demais.',
    choices: [
      { text: 'Subir ao cume mais alto e absorver o Qi do cometa.', res: { text: 'Nas noites seguintes, a cauda do cometa banha o pico em prata. Você sente o Qi mais denso, mais ágil, mais seu.', fx: { setFlags: ['cometa_cultivador'], xp: 10, stats: { esp: 1 } } } },
      { text: 'Observar e anotar tudo o que for possível.', res: { text: 'Páginas e páginas de anotações. Alguém um dia vai ler isso e entender mais do que você entende agora.', fx: { setFlags: ['cometa_observador'], stats: { comp: 2 } } } },
    ],
  },
  {
    id: 'cometa_chuva_qi', title: 'A Chuva de Estrelas Raras', rarity: 'raro', cooldown: 60, weight: 3,
    cond: { ...W('cometa'), tierMin: 1 },
    text: 'Na terceira semana, o céu se enche de fragmentos luminosos, que caem em silêncio como neve de fogo. Cada um carrega Qi puro em estado bruto. Quem sabe absorver, ganha anos de cultivo em uma noite.',
    choices: [
      { text: 'Absorver os fragmentos com o corpo todo.', check: { stat: ['esp', 'fis', 'dao'], dif: 3 }, ok: { text: 'Cada fragmento é um soco quente e sutil. Quando acaba, o corpo é outro: mais leve, mais denso, mais sensível.', fx: { xp: 24, stats: { esp: 2, fis: 1 }, ferida: 1 } }, fail: { text: 'O Qi bruto é demais. Você desmaia e acorda no chão, queimado de leve, mas inteiro.', fx: { xp: 8, ferida: 2 } } },
      { text: 'Recolher fragmentos sólidos no chão para depois.', check: { stat: ['sor', 'comp'], dif: 1 }, ok: { text: 'Uma dúzia de pedras luminosas, quentes ao toque. Cada uma vale uma pequena fortuna, e todas, juntas, são um tesouro.', fx: { item: ['fragmento_cometa'], pedras: 40 } }, fail: { text: 'As pedras esfriam rápido demais e viram cinza antes de você coletar.', fx: { xp: 3 } } },
    ],
  },
  {
    id: 'cometa_pressagio', title: 'O Presságio do Cometa', rarity: 'comum', cooldown: 60, weight: 2,
    cond: { ...W('cometa') },
    text: 'Os mais velhos dizem que o cometa anuncia ora uma guerra, ora um nascimento. Um adivinho de rua oferece interpretar o sinal por uma moeda, e atrai uma pequena multidão.',
    choices: [
      { text: 'Ouvir o adivinho e pagar a moeda.', custo: 1, res: { text: '"Um grande homem nasce hoje", diz ele. "E uma grande dívida vai ser cobrada." Ninguém sabe ao certo o que isso significa, mas todos concordam.', fx: { stats: { sor: 1, dao: 1 } } } },
      { text: 'Rir do presságio e seguir seu caminho.', res: { text: 'Cometas são só pedras e gelo, você pensa. Mas à noite, olha para o céu uma vez mais.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'cometa_nascimento', title: 'A Criança do Cometa', rarity: 'raro', once: true, weight: 2,
    cond: { ...W('cometa'), tierMin: 2 },
    text: 'Numa vila, uma criança nasce na noite em que o cometa atinge o brilho máximo. Sua pele tem uma pequena marca prateada, e as parteiras falam de uma luz suave que vazou do quarto. Os pais, humildes e assustados, pedem seu conselho.',
    choices: [
      { text: 'Oferecer-se para ensinar a criança quando crescer.', res: { text: 'Os pais choram de alívio. Em quinze anos, você terá uma discípula, ou um discípulo, que ninguém mais saberia treinar.', fx: { karma: 8, fama: 3, setFlags: ['tem_discipulo'], agenda: [{ event: 'discipulo_retorna', em: [30, 70] }] } } },
      { text: 'Aconselhar os pais a manter a criança longe das seitas e do poder.', res: { text: 'Eles ouvem com atenção. Uma infância comum, sob a luz de um cometa, talvez seja o melhor presente.', fx: { karma: 6, stats: { dao: 2 } } } },
    ],
  },
];
