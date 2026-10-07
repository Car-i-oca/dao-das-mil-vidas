import type { GameEvent } from '../../types';

/**
 * Lote 15 — Reinos 3 e 4 (Núcleo Dourado / Primeira Classe; Alma Nascente / Mestre de Pico).
 * Fase da vida: do sobrevivente ao dono de recursos; depois, a política de seita.
 * Poderes que aparecem em escolhas: consciência divina (reino 4), voo prolongado, domínio de pavilhão.
 * Todos têm `escala: true` quando há teste de combate: a ameaça é do próprio reino.
 */
export const lote15Reinos34: GameEvent[] = [
  /* ================= REINO 3: RECURSOS E POSTO ================= */
  {
    id: 'r3_pavilhao_proprio', title: 'Um Pavilhão Só Seu', rarity: 'comum', once: true, weight: 2.5, cooldown: 80,
    cond: { tierMin: 3, tierMax: 4 },
    text: 'A seita lhe oferece uma encosta inteira para erguer o seu pavilhão. Pode escolher entre uma colina com veio espiritual, cercada de gente curiosa, ou uma gruta distante, quieta, onde o Qi é fraco e a paz é grande.',
    choices: [
      { text: 'Escolher a colina do veio espiritual.', res: { text: 'O Qi ali é denso como mel. Em compensação, toda semana há alguém batendo à porta com um pedido.', fx: { setFlags: ['pavilhao_proprio'], xp: 8, fama: 5, pedras: -40 } } },
      { text: 'Escolher a gruta distante.', res: { text: 'O silêncio é completo, e o Qi, magro. Mas ninguém o interrompe, e o seu Dao cresce nesse vazio.', fx: { setFlags: ['pavilhao_proprio'], stats: { dao: 2, comp: 1 }, xp: 4 } } },
      { text: 'Construir um pavilhão modesto, perto dos discípulos externos.', res: { text: 'Os jovens aprendem observando o seu modo de varrer o pátio. A fama de gentileza se espalha mais depressa que a de poder.', fx: { setFlags: ['pavilhao_proprio'], karma: 5, fama: 4, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'r3_primeiros_discipulos', title: 'Quem Pede Seu Método', rarity: 'comum', once: true, weight: 2.5, cooldown: 80,
    cond: { tierMin: 3, tierMax: 5, noFlags: ['tem_discipulo'] },
    text: 'Na porta do seu pavilhão ajoelham-se três jovens. Um é talentoso e arrogante; outro, esforçado, mas sem talento; o terceiro é calado e traz no olhar uma tristeza antiga. Cada um pede para ser seu discípulo.',
    choices: [
      { text: 'Aceitar o talentoso: ele irá longe.', res: { text: 'Ele aprende depressa e ouve pouco. Um dia vai olhar o mestre como quem mede um degrau.', fx: { setFlags: ['tem_discipulo', 'discipulo_talentoso'], fama: 5, stats: { car: 1 } } } },
      { text: 'Aceitar o esforçado: o Dao é paciência.', res: { text: 'Ele erra de novo e de novo. Cada acerto vale mais do que mil acertos dos outros.', fx: { setFlags: ['tem_discipulo', 'discipulo_esforcado'], karma: 5, stats: { dao: 1, car: 1 } } } },
      { text: 'Aceitar o calado: há uma ferida a cuidar.', res: { text: 'Ele fala pouco, mas guarda tudo que você diz. Aos poucos, a tristeza dele vira força.', fx: { setFlags: ['tem_discipulo', 'discipulo_calado'], karma: 4, stats: { dao: 2 } } } },
      { text: 'Recusar todos: seu caminho é solitário.', res: { text: 'Eles partem. Você ouve os passos sumindo e não sabe se é alívio ou perda.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'r3_disputa_veio', title: 'A Disputa pelo Veio Espiritual', rarity: 'comum', cooldown: 50, weight: 1.6, escala: true,
    cond: { tierMin: 3, tierMax: 4 },
    text: 'Dois clãs vizinhos reivindicam o mesmo veio de pedra espiritual, recém-descoberto. Como cultivador de {reino}, você é chamado para ser árbitro, ou para escolher um lado. A decisão pode render pedras, amigos e inimigos.',
    choices: [
      { text: 'Arbitrar com justiça, dividindo o veio.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'Ninguém fica totalmente feliz, e é por isso que o acordo se sustenta. Os dois clãs mandam presentes.', fx: { pedras: 80, karma: 6, fama: 6 } }, fail: { text: 'O acordo desmorona na semana seguinte. Ambos os clãs culpam você, e com razão.', fx: { fama: -3, karma: -1 } } },
      { text: 'Tomar o veio para si e deixar os clãs com as migalhas.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'combate' }, ok: { text: 'O veio é seu por força, e os clãs murmuram em surdina. Pedras demais para se arrepender cedo.', fx: { pedras: 250, karma: -6, fama: 2 } }, fail: { text: 'Você subestimou a rede de alianças deles. Sai ferido, e sem veio.', fx: { ferida: 2, fama: -3 } } },
      { text: 'Recomendar que ambos entreguem o veio à seita.', res: { text: 'A seita fica com o veio e agradece a você em voz baixa, com um favor para o futuro.', fx: { fama: 4, pedras: 40, setFlags: ['favor_da_seita'] } } },
    ],
  },
  {
    id: 'r3_cacada_nucleo', title: 'A Caça ao Núcleo de Besta', rarity: 'comum', cooldown: 45, weight: 1.6, escala: true,
    cond: { tierMin: 3, tierMax: 4 },
    text: 'Um bando de feras de reino alto assola o desfiladeiro. Dizem que abatê-las rende núcleos suficientes para alimentar um pavilhão por uma década. A trilha corta o desfiladeiro; o céu, de cima, parece mais seguro.',
    choices: [
      { text: 'Voar por cima e golpear de longe.', check: { stat: ['esp', 'comp'], dif: 0, tag: 'combate' }, ok: { text: 'Do alto, a luta é um desfile de lâminas de Qi. Você colhe cinco núcleos antes do anoitecer.', fx: { pedras: 220, xp: 6, fama: 3 } }, fail: { text: 'A fera líder salta mais alto do que você imaginava. Você escapa com o ombro rasgado.', fx: { ferida: 2, pedras: 40 } } },
      { text: 'Descer e lutar de frente, corpo a corpo.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'O desfiladeiro vira arena. Ao fim, você é a única coisa de pé.', fx: { pedras: 300, xp: 8, fama: 5, stats: { fis: 1 } } }, fail: { text: 'A matilha cerca você. Sai com cicatrizes que vão contar a história por anos.', fx: { ferida: 3, pedras: 40 } } },
      { text: 'Deixar a caça para os jovens e fornecer apoio.', res: { text: 'Você prepara pílulas, mapas e uma formação de retirada. Eles voltam vivos, e agradecidos.', fx: { karma: 4, fama: 3, pedras: 60 } } },
    ],
  },
  {
    id: 'r3_voo_sobre_cidade', title: 'Sobre os Telhados da Cidade', rarity: 'comum', cooldown: 60, weight: 1.2,
    cond: { tierMin: 3, tierMax: 6 },
    text: 'Você cruza o céu em direção a uma cidade mortal. Lá embaixo, milhares de lanternas acendem como constelações que subiram para a terra. Alguns olhos se voltam para cima, e um menino aponta, gritando.',
    choices: [
      { text: 'Descer na praça, com a espada brilhando.', res: { text: 'A multidão se ajoelha, pasma. O governador da cidade lhe oferece um banquete e uma promessa de tributo. Você tem, de repente, a medida de um deus pequeno.', fx: { fama: 8, pedras: 100, karma: -2 } } },
      { text: 'Descer num beco e andar entre os mortais.', res: { text: 'Ninguém sabe quem você é. Come numa barraca de macarrão e escuta as queixas dos que dormem de fome. Isso o muda mais do que um banquete.', fx: { karma: 4, stats: { dao: 2 } } } },
      { text: 'Seguir voando: a cidade não é para você.', res: { text: 'O vento corta bem. A cidade vira ponto, depois lembrança.', fx: { stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'r3_nucleo_proprio', title: 'Cuidar do Próprio Núcleo', rarity: 'comum', cooldown: 70, weight: 1.4,
    cond: { tierMin: 3, tierMax: 4 },
    text: 'Seu Núcleo Dourado, recém-formado, tem pequenas rachaduras, marcas do rompimento. Um mestre antigo disse que poucos as reparam, e que o futuro do cultivo depende delas. Reparar custa tempo, pedras e uma paciência que quase ninguém tem.',
    choices: [
      { text: 'Gastar 80 pedras em ervas de reparo e anos de retiro.', custo: 80, check: { stat: ['comp', 'dao'], dif: 0 }, ok: { text: 'O núcleo se fecha sem emendas. O Qi circula sem tropeçar, e sua base fica firme como pedra de templo.', fx: { xp: 10, stats: { dao: 2, esp: 1, fis: 1 }, vida: 20 } }, fail: { text: 'O reparo é imperfeito. A rachadura diminui, mas não some.', fx: { xp: 4, stats: { dao: 1 } } } },
      { text: 'Ignorar: o futuro cuida de si.', res: { text: 'Você segue sem pausa. A rachadura, às vezes, lateja nas noites de lua nova.', fx: { xp: 5 } } },
      { text: 'Ouvir a orientação gratuita do mestre.', res: { text: 'Sem ervas, o mestre ensina um exercício de respiração para estabilizar o núcleo aos poucos. Não resolve tudo, mas oferece um começo seguro.', fx: { stats: { dao: 1, comp: 1 } } } },
    ],
  },
  {
    id: 'r3_inspecao_externos', title: 'A Inspeção dos Discípulos Externos', rarity: 'comum', cooldown: 50, weight: 1.4,
    cond: { tierMin: 3, tierMax: 5, faction: ['seita'] },
    text: 'Como ancião, você inspeciona as casernas dos discípulos externos. Encontra comida estragada, pílulas diluídas e um intendente que fala mansinho demais. Uma menina o olha de canto, com receio de falar.',
    choices: [
      { text: 'Interrogar o intendente com a aura de ancião.', res: { text: 'Ele confessa em três perguntas. Sai da seita carregando as próprias malas e um pedido de desculpas que ninguém aceita.', fx: { karma: 8, fama: 6, stats: { dao: 1 } } } },
      { text: 'Ouvir a menina em particular, antes de agir.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Ela conta tudo, com nomes e datas. Você age com calma, e a reforma é limpa, sem escândalo.', fx: { karma: 9, fama: 8, stats: { car: 1, comp: 1 } } }, fail: { text: 'Ela se cala, com medo. O intendente percebe que você está de olho e some com as provas.', fx: { karma: 1 } } },
      { text: 'Fingir que não viu: é política demais para um ancião novo.', res: { text: 'Você assina o relatório e vai embora. A menina o olha por cima do ombro até você sumir de vista.', fx: { karma: -5 } } },
    ],
  },
  {
    id: 'r3_duelo_por_cargo', title: 'O Duelo pelo Cargo', rarity: 'comum', cooldown: 60, weight: 1.2, escala: true,
    cond: { tierMin: 3, tierMax: 4, faction: ['seita'] },
    text: 'Dois cargos de ancião, três candidatos. Pela regra antiga, os rivais se enfrentam no pátio da seita, diante de todos. Seu oponente é calmo, forte e bem-visto.',
    choices: [
      { text: 'Lutar com o método que você mais domina.', check: { stat: ['fis', 'esp', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'A luta é longa e limpa. Quando seu oponente se curva, a seita inteira ergue as mãos para você.', fx: { fama: 10, setFlags: ['anciao'], xp: 5 } }, fail: { text: 'Você perde por um passe. Ele estende a mão, o que dói mais que a derrota.', fx: { fama: 2, ferida: 1, stats: { dao: 1 } } } },
      { text: 'Propor um desafio de outro tipo: formação, pílula ou etiqueta.', check: { stat: ['comp', 'car'], dif: 1 }, ok: { text: 'O conselho aprova o desafio alternativo. Você vence sem derramar uma gota de sangue.', fx: { fama: 8, setFlags: ['anciao'], stats: { comp: 1 } } }, fail: { text: 'O conselho recusa a ideia. O duelo vai acontecer de qualquer jeito, e você perde.', fx: { fama: -2 } } },
      { text: 'Desistir em favor do oponente.', res: { text: 'Ele aceita o cargo com surpresa. Você ganha um amigo, que lembrará disso nos tempos difíceis.', fx: { karma: 5, stats: { dao: 1 }, setFlags: ['amigo_do_anciao'] } } },
    ],
  },
  {
    id: 'r3_emissario_do_reino', title: 'O Emissário do Reino Mortal', rarity: 'comum', cooldown: 60, weight: 1.2,
    cond: { tierMin: 3, tierMax: 5 },
    text: 'Um emissário do rei mortal chega envergando seda e medo. O reino está sitiado por rebeldes. "Um cultivador", ele implora, "bastaria para virar a guerra." Em troca, oferece uma fortuna em ouro, terras e uma estátua.',
    choices: [
      { text: 'Intervir e decidir a batalha pelo reino.', check: { stat: ['fis', 'esp'], dif: -2, tag: 'combate' }, ok: { text: 'Os rebeldes fogem ao ver a sua sombra no horizonte. O rei lhe entrega o ouro e a gratidão de um povo.', fx: { pedras: 300, fama: 9, karma: 2 } }, fail: { text: 'Seus oponentes tinham um mestre escondido. Você se retira, ferido, com a honra arranhada.', fx: { ferida: 2, fama: -2 } } },
      { text: 'Recusar: cultivadores não devem governar mortais.', res: { text: 'O emissário parte sem entender. Anos depois, a história do reino acaba mal, mas o seu Dao segue limpo.', fx: { karma: 2, stats: { dao: 2 } } } },
      { text: 'Aceitar, mas exigir que o rei liberte os presos políticos.', res: { text: 'O rei gagueja e concorda. A guerra termina com menos mortos do que ninguém esperava.', fx: { karma: 8, fama: 8, pedras: 150 } } },
    ],
  },
  {
    id: 'r3_leilao_ancioes', title: 'O Leilão dos Anciões', rarity: 'raro', cooldown: 80, weight: 1.0,
    cond: { tierMin: 3, tierMax: 5, pedrasMin: 300 },
    text: 'Os anciões de várias seitas se reúnem, cada ano, para um leilão fechado. Ali se vendem pílulas de passagem, relíquias e segredos. Os lances começam altos, e quem erra o preço, fica sem o tesouro e sem a face.',
    choices: [
      { text: 'Disputar a Pílula de Passagem (300 pedras).', custo: 300, check: { stat: ['car', 'sor'], dif: 1 }, ok: { text: 'Depois de lances nervosos, a pílula é sua. Você sente o olhar dos outros por semanas.', fx: { item: ['pilula_passagem_4'], fama: 5 } }, fail: { text: 'Você perde o lance por uma fração. O vencedor sorri e oferece o que sobrou por metade do preço.', fx: { pedras: 150, fama: 1 } } },
      { text: 'Apenas observar, e comprar informações.', res: { text: 'Você compra três rumores e uma lição: o preço de uma coisa depende de quem está olhando.', fx: { stats: { comp: 1, sor: 1 }, pedras: -30 } } },
    ],
  },
  {
    id: 'r3_escassez_de_recursos', title: 'A Escassez', rarity: 'comum', cooldown: 50, weight: 1.4,
    cond: { tierMin: 3, tierMax: 5 },
    text: 'Os preços de pílulas e ervas dobraram, por uma razão que ninguém explica. Os discípulos reclamam, os estoques secam, e a seita pede contribuições de todos os anciões.',
    choices: [
      { text: 'Contribuir com 100 pedras do seu bolso.', custo: 100, res: { text: 'A seita agradece e anota seu nome no livro de benfeitores. O inverno, afinal, passa.', fx: { karma: 5, fama: 8, stats: { dao: 1 } } } },
      { text: 'Investigar quem está acumulando recursos.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'O culpado é um comerciante de alto escalão, que manipulava o mercado. Você o denuncia, e os preços voltam ao normal.', fx: { fama: 10, karma: 6, pedras: 80 } }, fail: { text: 'As pistas levam a lugar algum. O inverno, de qualquer forma, passa.', fx: { stats: { comp: 1 } } } },
      { text: 'Segurar seus recursos: cada um por si.', res: { text: 'Você poupa suas ervas e suas pedras. Os olhares na seita ficam, aos poucos, mais frios.', fx: { karma: -4, fama: -3, pedras: 40 } } },
    ],
  },
  {
    id: 'r3_comerciante_de_almas', title: 'O Comerciante de Segredos', rarity: 'raro', cooldown: 90, weight: 0.9,
    cond: { tierMin: 3, tierMax: 5 },
    text: 'Um mercador de rosto liso vende segredos como outros vendem arroz. Para você, oferece três: onde está um tesouro, quem quer sua morte e o que você mais teme. Cada um tem um preço diferente.',
    choices: [
      { text: 'Comprar o segredo do tesouro (150 pedras).', custo: 150, check: { stat: ['sor', 'comp'], dif: 0 }, ok: { text: 'O mapa é verdadeiro. A caverna guarda uma relíquia de uma era antiga.', fx: { pedras: 400, item: ['espelho_bronze'], xp: 4 } }, fail: { text: 'O mapa é velho, e a caverna, vazia. O mercador deu um sorriso, e você deu o dinheiro.', fx: { stats: { comp: 1 } } } },
      { text: 'Comprar o nome de quem quer sua morte (100 pedras).', custo: 100, res: { text: 'O nome é conhecido, e inesperado. Daqui por diante, você saberá de onde vem o perigo.', fx: { setFlags: ['inimigo_secreto'], stats: { comp: 1, dao: 1 } } } },
      { text: 'Recusar todos: o segredo mais perigoso é o que se paga para saber.', res: { text: 'O mercador faz uma reverência. "Poucos recusam", diz. "E os que recusam, costumam ir longe."', fx: { stats: { dao: 2 }, fama: 2 } } },
      { text: 'Perguntar ao mercador sobre a própria história.', res: { text: 'Ele conta uma história curta, mas honesta, sobre o preço que pagou para aprender a guardar segredos. Você sai sem comprar nada, levando uma pergunta a mais.', fx: { stats: { comp: 1, dao: 1 } } } },
    ],
  },

  /* ================= REINO 4: POLÍTICA DE SEITA, CONSCIÊNCIA DIVINA ================= */
  {
    id: 'r4_consciencia_cidade', title: 'A Consciência Sobre a Cidade', rarity: 'comum', cooldown: 50, weight: 1.6,
    cond: { tierMin: 4, tierMax: 6 },
    text: 'Sua consciência divina cobre a cidade inteira como uma teia. Você sente as conversas nas lojas, o choro de um bebê, o golpe de um assassino que prepara a faca num telhado. Vê, sem querer, mais do que gostaria.',
    choices: [
      { text: 'Vasculhar a cidade em busca de ameaças.', res: { text: 'Você encontra três conspiradores, um espião de seita rival e um bebê doente. Resolve o que pode e anota o que deve.', fx: { fama: 5, karma: 4, stats: { comp: 1, esp: 1 } } } },
      { text: 'Fechar a consciência e deixar a cidade viver.', res: { text: 'O mundo dos mortais volta ao seu tamanho natural. Você respeita a intimidade deles como quem fecha uma janela.', fx: { karma: 3, stats: { dao: 2 } } } },
      { text: 'Procurar uma pessoa específica.', check: { stat: ['esp', 'comp'], dif: 0, tag: 'mente' }, ok: { text: 'Em meio à multidão, você encontra o rosto que procurava, e a vida dele muda por causa de uma conversa que ele jamais saberá que foi sua.', fx: { xp: 5, stats: { esp: 1 }, karma: 3 } }, fail: { text: 'A busca esbarra num selo de proteção. Algo do outro lado percebeu o seu olhar e fechou a porta.', fx: { corr: 2, stats: { esp: 1 } } } },
    ],
  },
  {
    id: 'r4_traidor_na_seita', title: 'O Traidor no Conselho', rarity: 'raro', once: true, weight: 1.8, cooldown: 80, escala: true,
    cond: { tierMin: 4, tierMax: 5, faction: ['seita'] },
    text: 'Há semanas, segredos da seita vazam para o inimigo. A suspeita recai sobre três anciões do conselho. Sua consciência divina capta fragmentos de uma conversa em código, mas ninguém acreditaria em você sem provas.',
    choices: [
      { text: 'Seguir o suspeito mais provável, de longe.', check: { stat: ['esp', 'comp'], dif: 0, tag: 'mente' }, ok: { text: 'Você o flagra entregando um pergaminho a um emissário. A prisão acontece sem violência, e a seita lhe deve o favor.', fx: { fama: 14, karma: 5, setFlags: ['favor_da_seita'], stats: { comp: 1 } } }, fail: { text: 'Era o suspeito errado. O ancião, inocente, jamais o perdoará.', fx: { fama: -6, karma: -3 } } },
      { text: 'Preparar uma armadilha com informações falsas.', check: { stat: ['comp', 'car'], dif: 1 }, ok: { text: 'A isca é mordida. O traidor cai com as mãos nos documentos falsos, e a seita comemora sua astúcia.', fx: { fama: 12, xp: 5, stats: { comp: 2 } } }, fail: { text: 'O traidor desconfia e some da seita, levando consigo metade dos segredos.', fx: { fama: -3, stats: { comp: 1 } } } },
      { text: 'Denunciar os três ao patriarca, sem provas.', res: { text: 'O patriarca ouve, anota, não faz nada. Meses depois, o traidor é pego por outros, e você continua sem saber se agiu certo.', fx: { fama: 2 } } },
    ],
  },
  {
    id: 'r4_eleicao_do_conselho', title: 'O Voto do Conselho', rarity: 'comum', cooldown: 70, weight: 1.3,
    cond: { tierMin: 4, tierMax: 5, faction: ['seita'] },
    text: 'O patriarca está velho, e a seita se divide em duas facções: os que querem expandir pelo continente e os que querem se manter fechados. Seu voto, como Ancião Supremo, vale por três.',
    choices: [
      { text: 'Votar pela expansão.', res: { text: 'A seita ganha filiais, riqueza e inimigos novos. O seu nome vai nas bandeiras, e nas listas de alvos.', fx: { fama: 10, pedras: 150, karma: -2, setFlags: ['seita_expansionista'] } } },
      { text: 'Votar pela contenção.', res: { text: 'A seita se mantém pequena, e segura. Os discípulos o respeitam como guardião de um modo antigo de viver.', fx: { fama: 6, karma: 4, stats: { dao: 1 }, setFlags: ['seita_fechada'] } } },
      { text: 'Abster-se e permanecer neutro.', res: { text: 'Ninguém gosta de neutros. Mas todos o procuram quando as facções precisam de um mediador.', fx: { fama: 3, stats: { car: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'r4_alma_viaja', title: 'A Alma Que Parte', rarity: 'raro', cooldown: 90, weight: 1.2,
    cond: { tierMin: 4, tierMax: 6 },
    text: 'Pela primeira vez, sua alma consegue deixar o corpo por algumas horas. Você flutua sobre o próprio rosto, vê as paredes de pedra, as ervas no canto, o selo do pavilhão. A porta do mundo está aberta, e a corda que o prende ao corpo é fina.',
    choices: [
      { text: 'Viajar até o túmulo dos patriarcas antigos.', check: { stat: ['esp', 'dao'], dif: 1, tag: 'mente' }, ok: { text: 'Os espíritos o recebem com solenidade. Um deles sussurra um conselho que você guardará como relíquia.', fx: { stats: { esp: 2, dao: 1 }, xp: 8, setFlags: ['conselho_dos_ancestrais'] } }, fail: { text: 'A corda estica demais. Você volta ao corpo num tranco, com dor de cabeça por semanas.', fx: { ferida: 1, stats: { esp: 1 } } } },
      { text: 'Visitar, em espírito, alguém que você perdeu.', res: { text: 'A pessoa não pode responder, mas os olhos dela, de alguma forma, o reconhecem. Você volta chorando, e mais leve.', fx: { karma: 3, stats: { dao: 2 }, corr: -3 } } },
      { text: 'Não arriscar: ficar no corpo.', res: { text: 'A porta se fecha, por ora. O seu corpo, que você quase esquecera, agradece o calor da lareira.', fx: { stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'r4_heranca_do_ancestral', title: 'A Câmara do Ancestral', rarity: 'raro', once: true, weight: 1.2,
    cond: { tierMin: 4, tierMax: 6, faction: ['seita'] },
    text: 'Atrás do salão dos fundadores existe uma câmara trancada há mil anos. Só um cultivador de Alma Nascente pode abrir. Lá dentro, uma estátua de pedra segura um pergaminho; ao seu pé, uma espada quebrada e uma tabuleta: "Ao digno, a herança. Ao indigno, a lição."',
    choices: [
      { text: 'Pegar o pergaminho.', check: { stat: ['dao', 'comp'], dif: 2, tag: 'mente' }, ok: { text: 'A estátua se desfaz em poeira dourada. O pergaminho traz o método base da seita, perdida há séculos.', fx: {  fama: 12, xp: 10, stats: { dao: 2 } } }, fail: { text: 'A estátua desperta e lança você para fora. A lição, afinal, é a vergonha.', fx: { ferida: 2, fama: -3 } } },
      { text: 'Pegar a espada quebrada.', res: { text: 'Quebrada há mil anos, ela ainda lembra cada corte. Você a embainha num pano e a guarda, com respeito.', fx: { item: ['espada_ferro_frio'], stats: { dao: 1 }, karma: 3 } } },
      { text: 'Deixar tudo como está.', res: { text: 'Você sai e fecha a porta. A câmara espera de novo, mais mil anos.', fx: { karma: 3, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'r4_disputa_sucessao', title: 'A Sucessão do Patriarca', rarity: 'raro', once: true, weight: 1.4,
    cond: { tierMin: 4, tierMax: 6, faction: ['seita'], fameMin: 30 },
    text: 'O patriarca da seita morreu dormindo. Seu testamento é obscuro: cita "o mais digno", sem dizer quem. Três ramos da seita reivindicam o cargo, e os discípulos olham para você, esperando sinal.',
    choices: [
      { text: 'Candidatar-se ao cargo de patriarca.', check: { stat: ['car', 'dao', 'fis'], dif: 2 }, ok: { text: 'Você vence a disputa por voto, não por espada. A seita lhe entrega o selo, e todas as dívidas dela.', fx: { setFlags: ['patriarca'], fama: 20, karma: 2, stats: { car: 2, dao: 2 }, xp: 8 } }, fail: { text: 'Você perde por poucos votos. O novo patriarca o convida a servir como conselheiro, com um sorriso afiado.', fx: { fama: 3, stats: { car: 1 } } } },
      { text: 'Apoiar o ramo mais justo.', res: { text: 'O ramo vence, e o novo patriarca lhe é devedor. A seita segue em paz por mais uma geração.', fx: { karma: 8, fama: 8, setFlags: ['favor_da_seita'] } } },
      { text: 'Partir antes que a seita se parta.', res: { text: 'Quando a seita se divide em duas, você já está longe, num pico qualquer, em silêncio.', fx: { karma: -1, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'r4_cacador_recompensas', title: 'Seu Nome na Parede dos Procurados', rarity: 'comum', cooldown: 60, weight: 1.2, escala: true,
    cond: { tierMin: 4, tierMax: 6, karmaMax: -5 },
    text: 'Numa taverna do cruzamento, o seu retrato está colado na Parede dos Procurados, com uma recompensa que faria uma vila inteira esquecer a fome. Três caçadores o encaram do fundo do salão.',
    choices: [
      { text: 'Encarar os três ali mesmo.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'combate' }, ok: { text: 'Nenhum deles chega ao fim da refeição. A taverna esquece de respirar, e o retrato na parede é riscado por uma mão trêmula.', fx: { fama: 5, karma: -3, pedras: 80 } }, fail: { text: 'Eles eram mais experientes do que parecia. Você foge ferido.', fx: { ferida: 2, fama: -2 } } },
      { text: 'Pagar à taverna para apagar o retrato.', custo: 60, res: { text: 'Uma moedinha aqui, outra ali, e o retrato some. A recompensa, porém, continua em algum arquivo distante.', fx: { fama: -1 } } },
      { text: 'Sair em silêncio e mudar de cidade.', check: { stat: ['sor', 'comp'], dif: 0, tag: 'fuga' }, ok: { text: 'Você some como fumaça. Quando os caçadores se levantam, só encontram o vento.', fx: { stats: { sor: 1 } } }, fail: { text: 'Eles o seguem até a estrada, e a fuga vira luta.', fx: { ferida: 2 } } },
    ],
  },
  {
    id: 'r4_casamento_de_alianca', title: 'O Casamento das Duas Seitas', rarity: 'comum', cooldown: 80, weight: 1.0,
    cond: { tierMin: 4, tierMax: 5, faction: ['seita'] },
    text: 'Duas seitas rivais querem selar uma aliança com um casamento entre os seus melhores jovens. Você é convidado como testemunha de honra, e como possível segurança: ninguém confia em ninguém.',
    choices: [
      { text: 'Aceitar o papel de guardião da cerimônia.', check: { stat: ['esp', 'comp'], dif: 1 }, ok: { text: 'Um atentado é frustrado no último instante, e o casamento se faz. As duas seitas ficam unidas, e devedoras de você.', fx: { fama: 14, karma: 4, pedras: 120 } }, fail: { text: 'A cerimônia acaba em tumulto, e os dois lados o culpam por um pouco de tudo.', fx: { fama: -3, ferida: 1 } } },
      { text: 'Declinar: aliança de casamento é armadilha de políticos.', res: { text: 'A cerimônia acontece sem você. Três meses depois, as seitas brigam, e você respira aliviado.', fx: { stats: { dao: 1 }, fama: -1 } } },
    ],
  },
  {
    id: 'r4_discipulo_prodigio', title: 'O Prodígio e a Inveja', rarity: 'raro', once: true, weight: 1.4,
    cond: { tierMin: 4, tierMax: 6, flags: ['tem_discipulo'] },
    text: 'Seu discípulo cresce rápido demais: já faz o que você só aprendeu aos cem anos. Os outros anciões murmuram. Alguns oferecem a ele cargos, e outros, venenos. Ele ainda o chama de mestre, e ainda tem medo do escuro.',
    choices: [
      { text: 'Treiná-lo pessoalmente, sem poupar nada.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Ele vira o orgulho da seita. Em retribuição, jura nunca esquecer de onde veio.', fx: { karma: 6, fama: 10, stats: { car: 2, dao: 1 }, setFlags: ['discipulo_prodigio'] } }, fail: { text: 'O ritmo é demais para ele. Ele quebra, chora, volta. Algo se perde, algo ensina.', fx: { karma: 2, stats: { car: 1 } } } },
      { text: 'Protegê-lo dos outros anciões.', res: { text: 'Você enfrenta cada olhar torto. Isso lhe custa amizades, e ganha uma lealdade que ouro não compra.', fx: { karma: 8, fama: -2, stats: { dao: 2 } } } },
      { text: 'Deixar que ele enfrente as intrigas sozinho.', res: { text: 'Ele sobrevive, mas aprende a desconfiar, até de você.', fx: { karma: -3, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'r4_veneno_na_ceia', title: 'O Veneno na Ceia', rarity: 'comum', cooldown: 60, weight: 1.2, escala: true,
    cond: { tierMin: 4, tierMax: 6 },
    text: 'Na ceia de boas-vindas de uma seita aliada, sua consciência divina percebe algo no vinho: uma essência sutil, quase inodora, que adormece o Qi. Todos os anfitriões sorriem, e nenhum bebe.',
    choices: [
      { text: 'Trocar sua taça pela do anfitrião, com discrição.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'O anfitrião bebe, empalidece, e a trama inteira desaba. Quando vão arrastá-lo, ele murmura que você foi mais esperto.', fx: { fama: 8, karma: 2, stats: { comp: 1 } } }, fail: { text: 'Ele nota a troca e grita traição. A ceia vira confusão, e você sai com a honra arranhada.', fx: { fama: -3, ferida: 1 } } },
      { text: 'Expulsar o veneno do seu corpo e fingir que bebeu.', check: { stat: ['esp', 'dao'], dif: 0, tag: 'qi' }, ok: { text: 'O Qi limpa o veneno sem esforço. Você é, a noite toda, um convidado educado, e fica sabendo de tudo que não devia.', fx: { xp: 5, stats: { esp: 1, comp: 1 }, setFlags: ['inimigo_secreto'] } }, fail: { text: 'O veneno é mais forte do que previa. Você aguenta até o fim, mas desmaia numa cama alheia.', fx: { ferida: 2, stats: { esp: 1 } } } },
      { text: 'Denunciar o veneno publicamente.', res: { text: 'A ceia termina em escândalo. Alguns lhe agradecem, outros nunca esquecerão a cena.', fx: { fama: 6, karma: 3 } } },
    ],
  },
  {
    id: 'r4_expedicao_ruinas', title: 'A Expedição à Cidade Enterrada', rarity: 'raro', cooldown: 80, weight: 1.2, escala: true,
    cond: { tierMin: 4, tierMax: 6 },
    text: 'A seita o escolhe para liderar vinte discípulos até uma cidade enterrada sob dunas. Dizem que lá dormem tesouros e armadilhas à altura de um Alma Nascente. Os discípulos ouvem, em silêncio, o nome de quem comanda.',
    choices: [
      { text: 'Liderar pessoalmente, na frente.', check: { stat: ['fis', 'esp', 'comp'], dif: 1, tag: 'combate' }, ok: { text: 'Cada armadilha é vencida com o corpo de um líder. Ao sair, restam todos os vinte, e três relíquias.', fx: { pedras: 350, item: ['bolsa_celeste'], fama: 12, karma: 3, xp: 6 } }, fail: { text: 'Cinco discípulos perdidos. Você volta com metade da expedição, e com um fardo que não sai do peito.', fx: { fama: -2, karma: 1, ferida: 2, stats: { dao: 2 } } } },
      { text: 'Guiar de trás, com a consciência divina à frente.', check: { stat: ['esp', 'comp'], dif: 0, tag: 'mente' }, ok: { text: 'Você marca cada armadilha antes de chegar. A expedição é limpa, e a seita ri de assombro.', fx: { pedras: 300, fama: 10, karma: 4, stats: { esp: 1, comp: 1 } } }, fail: { text: 'Uma armadilha desafia sua consciência. Três discípulos ficam feridos.', fx: { fama: -1, ferida: 1, pedras: 80 } } },
    ],
  },
  {
    id: 'r4_pico_proibido', title: 'O Pico Proibido', rarity: 'raro', once: true, weight: 1.0,
    cond: { tierMin: 4, tierMax: 6 },
    text: 'No horizonte, um pico que nenhuma seita reivindica. Pássaros evitam o ar acima dele. Sua consciência divina bate em algo como um muro, e, atrás dele, uma batida lenta, de coração antigo.',
    choices: [
      { text: 'Subir até o cume.', check: { stat: ['dao', 'fis'], dif: 3 }, ok: { text: 'No cume, um guardião de pedra faz uma reverência e desaparece. Ao pé, uma pérola, onde pulsa o coração do pico.', fx: { item: ['perola_abismo'], xp: 12, stats: { dao: 2, esp: 2 }, fama: 8 } }, fail: { text: 'A gravidade do pico dobra a cada passo. Você desce quando o sangue já pinga do nariz.', fx: { ferida: 2, stats: { dao: 1 } } } },
      { text: 'Rezar ao pé do pico e não subir.', res: { text: 'A batida acalma. Você jura que, ao ir embora, o pico suspirou aliviado.', fx: { karma: 3, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'r4_testemunho_do_ceu', title: 'O Julgamento dos Anciões', rarity: 'comum', cooldown: 60, weight: 1.1,
    cond: { tierMin: 4, tierMax: 6, faction: ['seita'] },
    text: 'Você preside, pela primeira vez, o julgamento de um discípulo acusado de roubar uma relíquia. O jovem jura inocência; as provas apontam para ele; as testemunhas hesitam. A seita espera uma sentença, e o mundo, um exemplo.',
    choices: [
      { text: 'Condenar de acordo com as provas.', res: { text: 'O jovem é expulso. A seita aprova, o silêncio é pesado. Meses depois, um boato desmonta uma das provas.', fx: { karma: -2, fama: 4, stats: { dao: -1 } } } },
      { text: 'Reabrir o caso e pedir novas testemunhas.', check: { stat: ['comp', 'car'], dif: 1 }, ok: { text: 'Você descobre que o verdadeiro ladrão era um intendente. O jovem é inocentado, e jura servir a você.', fx: { karma: 9, fama: 10, stats: { comp: 1, dao: 1 } } }, fail: { text: 'As novas testemunhas só confirmam a dúvida. Você decide mal, com mais informação.', fx: { fama: -2 } } },
      { text: 'Perdoar o jovem e dar-lhe uma tarefa dura.', res: { text: 'Ele cumpre, de cabeça baixa. A seita fala em misericórdia, e em fraqueza, em partes iguais.', fx: { karma: 5, fama: 2 } } },
    ],
  },
];
