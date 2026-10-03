import type { GameEvent } from '../../types';

/**
 * Lote 17 — Reinos 7 e 8 (Integração Corporal / Grande Ascensão; Lenda Marcial).
 * Fase da vida: ser lendário. Os problemas já não são de sobrevivência, mas de legado, leis do Céu e despedida do mundo mortal.
 * Poder em escolhas: Domínio completo, avatares, leis do mundo.
 */
export const lote17Reinos78: GameEvent[] = [
  {
    id: 'r7_lenda_viva', title: 'A Estátua na Praça', rarity: 'comum', cooldown: 80, weight: 1.6,
    cond: { tierMin: 7 },
    text: 'Peregrinos sobem o monte onde você mora só para ver a sua sombra de passagem. Estátuas suas, feias, desproporcionais, aparecem em praças que você nunca visitou. Crianças brincam de ser {nome}, e lutam por quem fica com a espada de madeira.',
    choices: [
      { text: 'Descer ao vilarejo e se apresentar discretamente.', res: { text: 'Ninguém o reconhece, e isso é uma bênção. Você paga o jantar de uma família e sai antes do nascer do sol.', fx: { karma: 5, stats: { dao: 2 } } } },
      { text: 'Aparecer em pessoa na praça das estátuas.', res: { text: 'A multidão cai de joelhos. A criança com a espada de madeira entrega a você a arma, os olhos brilhando. Você aceita, e a guarda por anos.', fx: { fama: 12, karma: 2, stats: { car: 1 } } } },
      { text: 'Pedir que as estátuas sejam derrubadas.', res: { text: 'As praças ficam vazias, e as crenças se multiplicam. Quem apaga uma lenda só a deixa mais bonita.', fx: { stats: { dao: 2 }, fama: -2 } } },
    ],
  },
  {
    id: 'r7_dominio_refugio', title: 'O Refúgio Dentro da Montanha', rarity: 'raro', once: true, weight: 1.6,
    cond: { tierMin: 7 },
    text: 'Seu Domínio já é tão maduro que você pode dobrar uma montanha inteira e criar, nas suas dobras, um mundo de bolso. Há espaço para cem mil pessoas. Há espaço para uma biblioteca, para jardins, para um exército, ou para uma solidão perfeita.',
    choices: [
      { text: 'Fazer dele um refúgio para refugiados e feridos.', res: { text: 'Quando a próxima guerra vier, cem mil pessoas dormirão a salvo dentro de um mundo seu. As crianças nascidas lá aprenderão o seu nome como o de um avô.', fx: { karma: 20, fama: 18, stats: { dao: 3, car: 2 }, setFlags: ['refugio_mundo'] } } },
      { text: 'Fazer dele uma biblioteca de todos os métodos do mundo.', res: { text: 'Pergaminhos, jade, cristal, ossos gravados. Em cem anos, a sua biblioteca será a mais rica do continente.', fx: { stats: { comp: 4 }, xp: 12, fama: 10, setFlags: ['grande_biblioteca'] } } },
      { text: 'Fazer dele um local de solidão absoluta.', res: { text: 'Nem o vento entra ali sem permissão. O Dao, sem testemunhas, tem outro gosto.', fx: { stats: { dao: 4, esp: 1 }, xp: 14, fama: -2 } } },
    ],
  },
  {
    id: 'r7_guerra_dos_ceus', title: 'O Eco da Guerra dos Céus', rarity: 'raro', once: true, weight: 1.2, escala: true,
    cond: { tierMin: 7 },
    text: 'O céu noturno ganha riscos de fogo e sombra: algo acontece acima da atmosfera, entre seres que nunca desceram ao mundo. Fragmentos de armas celestes caem como estrelas. Um emissário ferido, de armadura dourada, aterrissa diante de você: "Escolha um lado, mortal. Não haverá meio-termo."',
    choices: [
      { text: 'Ficar ao lado do emissário.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Você luta em um campo de batalha que não cabe no mundo. Quando volta, traz uma lança quebrada e um lugar na lista de heróis do outro lado.', fx: { fama: 20, karma: 6, xp: 14, stats: { fis: 2, dao: 2 }, setFlags: ['heroi_dos_ceus'] } }, fail: { text: 'O campo de batalha o engole e o devolve, em pedaços. Você sobrevive, por ser ainda necessário.', fx: { ferida: 4, fama: 6, stats: { dao: 2 } } } },
      { text: 'Recusar e proteger o mundo mortal de estilhaços.', res: { text: 'Por semanas, você desvia armas caídas do céu para o oceano. Os mortais nunca saberão o que quase os destruiu.', fx: { karma: 15, fama: 8, stats: { dao: 3, car: 1 } } } },
      { text: 'Fugir para o vazio e esperar a guerra passar.', res: { text: 'Você volta em dez anos, e o mundo ainda está lá. Os mortos, no entanto, também.', fx: { anos: 5, karma: -5, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'r7_leis_do_ceu', title: 'Qual Lei Você Escolhe', rarity: 'raro', once: true, weight: 2.0,
    cond: { tierMin: 7 },
    text: 'Ao integrar o Dao ao corpo, você sente que o mundo oferece, a cada cultivador no seu nível, a chance de aprofundar uma lei: Fogo, Tempo, Vida ou Morte. É uma escolha que molda tudo que você vai ser. Só uma delas pode ser sua.',
    choices: [
      { text: 'A Lei do Fogo: transformar tudo, destruir o que for preciso.', res: { text: 'As suas chamas passam a ter vontade. O que você toca, arde ou renasce. Os inimigos temem o seu sorriso.', fx: { stats: { fis: 2, esp: 3, dao: 2 }, xp: 10, setFlags: ['lei_fogo'] } } },
      { text: 'A Lei do Tempo: ver os fios do passado e do futuro.', res: { text: 'Por um piscar, você vê todas as suas vidas ao mesmo tempo. Dali em diante, o tempo é seu aliado, ou ao menos um velho conhecido.', fx: { stats: { comp: 4, dao: 3 }, xp: 10, vida: 80, setFlags: ['lei_tempo'] } } },
      { text: 'A Lei da Vida: o que você toca, floresce.', res: { text: 'As suas mãos curam. O seu passo faz brotar. Você descobre que há poder também na gentileza.', fx: { stats: { fis: 3, car: 2, dao: 2 }, xp: 10, vida: 100, karma: 8, setFlags: ['lei_vida'] } } },
      { text: 'A Lei da Morte: acompanhar o fim de tudo com serenidade.', res: { text: 'O fim deixa de assustar. Você anda entre os mortos como entre amigos, e eles lhe cedem lugar.', fx: { stats: { dao: 5, esp: 2 }, xp: 10, setFlags: ['lei_morte'] } } },
    ],
  },
  {
    id: 'r7_mortais_oram', title: 'A Fé dos Mortais', rarity: 'comum', cooldown: 90, weight: 1.2,
    cond: { tierMin: 7 },
    text: 'Milhares de mortais acendem incenso diante de suas estátuas todos os dias. A fé deles chega até você como um calor suave, que reforça o seu Dao, mas também o prende aos desejos deles. Alguns pedem chuva, outros, vingança.',
    choices: [
      { text: 'Atender às preces que parecem justas.', res: { text: 'A chuva cai, a doença recua, a vingança dorme. Você se torna, aos poucos, um pouco menos pessoa e um pouco mais lenda.', fx: { karma: 10, fama: 12, stats: { dao: 2, car: 1 } } } },
      { text: 'Ignorar todas as preces.', res: { text: 'O silêncio é duro. Os mortais continuam a rezar, mas o calor diminui, e o Dao ganha uma pele mais fina.', fx: { stats: { dao: 3 }, karma: -3 } } },
      { text: 'Ensinar os mortais a viver sem rezar a você.', res: { text: 'Escolas e hospitais aparecem onde antes havia altares. Alguns se ofendem, outros se salvam.', fx: { karma: 14, fama: 8, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'r7_ultima_tentacao', title: 'A Tentação do Trono', rarity: 'raro', once: true, weight: 1.0,
    cond: { tierMin: 7 },
    text: 'Os ministros de um reino em ruínas oferecem a você a coroa. "Governe, e o povo será salvo", dizem. Você sabe que, com seu poder, poderia unir os reinos num único império em uma década, e que isso o prenderia à terra por séculos.',
    choices: [
      { text: 'Aceitar a coroa e unir os reinos.', res: { text: 'O império nasce, justo no começo, pesado no fim. Você aprende que o poder tem mais mãos que um deus, e todas elas pedem algo.', fx: { fama: 30, pedras: 600, karma: -6, stats: { car: 3, dao: -2 }, setFlags: ['imperador'] } } },
      { text: 'Recusar, e indicar um regente digno.', res: { text: 'O regente governa com sabedoria por trinta anos. Você o visita de vez em quando, e ele sempre lhe oferece chá.', fx: { karma: 12, fama: 12, stats: { dao: 3 } } } },
      { text: 'Recusar, e queimar o convite.', res: { text: 'O reino se desfaz em guerras menores. Alguns choram a sua recusa, e outros, a bendizem.', fx: { karma: -2, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'r7_inimigo_final', title: 'O Inimigo Que Você Esqueceu', rarity: 'raro', once: true, weight: 1.4, escala: true,
    cond: { tierMin: 7, flags: ['inimigo_secreto'] },
    text: 'Um vulto de cabelos prateados espera no portão. Você demora a reconhecer o rosto: é aquele inimigo de séculos atrás, que sobreviveu a tudo, ao tempo, à vergonha, a si mesmo. "Cheguei", diz. "E trouxe tudo que aprendi."',
    choices: [
      { text: 'Lutar, finalmente, de igual para igual.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'A luta é lenta e limpa, uma dança entre dois que sabem demais um do outro. No final, ele se curva e sorri: "Assim é melhor."', fx: { fama: 22, karma: 4, xp: 12, stats: { dao: 3, fis: 1 }, clearFlags: ['inimigo_secreto'] } }, fail: { text: 'Ele é mais forte do que você supunha. Ao fim, poupa você, e esse é o pior golpe.', fx: { ferida: 4, fama: -4, stats: { dao: 2 }, clearFlags: ['inimigo_secreto'] } } },
      { text: 'Oferecer chá e conversar.', res: { text: 'Falam de mestres mortos e de erros que não se desfazem. Ao fim, ele deixa a espada ali, e vai embora em paz.', fx: { karma: 12, stats: { dao: 4 }, clearFlags: ['inimigo_secreto'] } } },
    ],
  },
  {
    id: 'r7_testamento', title: 'O Testamento do Imortal Quase', rarity: 'comum', once: true, weight: 1.6,
    cond: { tierMin: 7 },
    text: 'Você começa a escrever o seu testamento. Não porque vai morrer, mas porque, na sua idade, o mundo precisa saber o que você deixa. Pedras, técnicas, relíquias, rancores. Cada linha pesa mais que o ouro que descreve.',
    choices: [
      { text: 'Deixar tudo para a seita.', res: { text: 'A seita agradece com uma reverência de séculos. O seu nome vai ser dito por gerações antes do almoço.', fx: { fama: 14, karma: 6, stats: { dao: 2 }, setFlags: ['legado_seita'] } } },
      { text: 'Dividir tudo entre os mortais.', res: { text: 'Terras viram escolas, relíquias viram remédios. Em mil anos, ninguém lembrará de você, e todos viverão melhor.', fx: { karma: 20, fama: 8, stats: { dao: 3 }, setFlags: ['legado_mortais'] } } },
      { text: 'Destruir tudo ao morrer: ninguém herda o que não merece.', res: { text: 'O fogo será visto de cem li de distância. O seu último ato será, enfim, uma só chama.', fx: { karma: -2, stats: { dao: 3 }, setFlags: ['legado_cinzas'] } } },
    ],
  },
  {
    id: 'r7_comete_nome', title: 'A Estrela Que Leva Seu Nome', rarity: 'raro', once: true, weight: 0.8,
    cond: { tierMin: 7, fameMin: 120 },
    text: 'Astrônomos de três reinos concordam: uma nova estrela apareceu no céu, e, no idioma antigo, o seu nome significa "{nome}". Poetas escrevem, mapas ganham um novo ponto, crianças fazem desejos sob ela.',
    choices: [
      { text: 'Subir ao pico mais alto e olhar para ela.', res: { text: 'A luz é suave, e sente-se quase pessoal. Você sorri, e algo em você descansa.', fx: { stats: { dao: 3 }, karma: 4, fama: 6 } } },
      { text: 'Fingir indiferença, e continuar cultivando.', res: { text: 'A estrela brilha por trinta anos. Você nunca olha para ela, e sempre sabe onde está.', fx: { xp: 8, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'r8_ultimo_olhar', title: 'O Último Olhar Sobre o Mundo', rarity: 'raro', once: true, weight: 2.0,
    cond: { tierMin: 8 },
    text: 'Do cume mais alto, você revê o mundo inteiro: as aldeias minúsculas, as seitas de pedra, as florestas, os oceanos. Cada ponto de luz é uma vida. Algumas você conhece pelo nome, outras só pelo cheiro do chá.',
    choices: [
      { text: 'Despedir-se de cada vida que você ainda lembra.', res: { text: 'Leva anos, e vale cada um. Quando acaba, o mundo parece mais leve, e o seu coração, mais pesado e mais pronto.', fx: { anos: 3, karma: 8, stats: { dao: 3, car: 1 }, xp: 8 } } },
      { text: 'Gravar o mundo na memória e partir.', res: { text: 'Nada de despedidas. Você guarda o mundo em si, e o mundo, em retorno, guarda um pouco de você.', fx: { stats: { dao: 2, comp: 2 }, xp: 8 } } },
    ],
  },
  {
    id: 'r8_ceu_pergunta', title: 'O Céu Pergunta', rarity: 'lendario', once: true, weight: 1.6,
    cond: { tierMin: 8 },
    text: 'Pela primeira vez, uma voz do alto não ordena nem ameaça: pergunta. "O que você deseja, cultivador? Poder? Fim? Memória? Responda sem pressa, que já esperei por muitos."',
    choices: [
      { text: 'Desejo ver o fim do caminho.', res: { text: 'O Céu fica em silêncio, e depois diz: "É honesto. Siga, então." A porta do último reino parece um pouco mais perto.', fx: { stats: { dao: 4 }, xp: 15 } } },
      { text: 'Desejo que ninguém precise percorrer o caminho como eu.', res: { text: 'O Céu ri baixinho, e é a primeira vez que alguém ouve isso. "Impossível. Mas lindo." Algo, no ar, se suaviza.', fx: { karma: 20, stats: { dao: 4, car: 2 }, xp: 10 } } },
      { text: 'Não desejo nada.', res: { text: 'O Céu, desta vez, é quem se cala por mais tempo. "Então, você já chegou."', fx: { stats: { dao: 6 }, xp: 18 } } },
    ],
  },
  {
    id: 'r8_guardiao_porta', title: 'O Guardião da Última Porta', rarity: 'lendario', once: true, weight: 1.4, escala: true,
    cond: { tierMin: 8 },
    text: 'Diante do último degrau, um guardião de armadura feita de estrelas barra o caminho. "Cada um passa por mim de uma forma. Mostre-me a sua", diz. Seu rosto muda, a cada olhar, para um que você já foi.',
    choices: [
      { text: 'Mostrar a sua força, em duelo.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'O duelo dura uma noite. Ao amanhecer, o guardião se curva, tão cansado quanto você: "É suficiente."', fx: { xp: 20, stats: { dao: 3, fis: 2 }, fama: 20 } }, fail: { text: 'O guardião o derruba, e então o ajuda a se levantar. "Volte quando a pergunta já não doer."', fx: { ferida: 3, xp: 8, stats: { dao: 2 } } } },
      { text: 'Mostrar a sua compaixão, curando-o de uma ferida antiga.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'Uma lágrima de ouro rola pela armadura do guardião. Ele cede o passo sem dizer palavra, como quem devolve uma dívida muito velha.', fx: { karma: 15, xp: 20, stats: { dao: 4, car: 2 } } }, fail: { text: 'O guardião recua. "Não é isso que eu perguntei." Você fica com a sensação de ter respondido a outra pergunta.', fx: { stats: { dao: 1 }, xp: 6 } } },
    ],
  },
  {
    id: 'r8_cortar_destino', title: 'O Fio do Destino', rarity: 'lendario', once: true, weight: 1.0,
    cond: { tierMin: 8 },
    text: 'Seu Dao é agora tão fino que você vê os fios que o ligam ao destino: um vermelho, um prateado, um negro. Um corte e o destino muda. Mas cada fio é também a ponte para alguém que você ama, ou odeia.',
    choices: [
      { text: 'Cortar o fio vermelho: libertar a sua sorte.', res: { text: 'Você sente a sorte passar a ser só sua. Algumas ligações, no entanto, se desfazem, e você não sabe quais.', fx: { stats: { sor: 5, dao: 2 }, karma: -4 } } },
      { text: 'Cortar o fio negro: libertar-se do rancor.', res: { text: 'Cada ódio perde o fio, e o peso. O mundo se estende, mais largo e mais leve.', fx: { corr: -20, stats: { dao: 4 }, karma: 6 } } },
      { text: 'Não cortar nenhum: aceitar o tecido como ele é.', res: { text: 'Os três fios pulsam, em harmonia, como as cordas de um instrumento. O Dao agradece em silêncio.', fx: { stats: { dao: 5, comp: 1 }, xp: 10 } } },
    ],
  },
  {
    id: 'r8_ultimo_discipulo', title: 'O Último Discípulo', rarity: 'raro', once: true, weight: 1.2,
    cond: { tierMin: 8, flags: ['tem_discipulo'] },
    text: 'Seu discípulo mais antigo, agora um velho de barba branca, volta ao pavilhão para uma última lição. "Mestre", diz, "não sei se vou vê-lo de novo. Diga-me, do alto de tudo que conseguiu, o que vale a pena."',
    choices: [
      { text: 'Responder com uma frase simples.', res: { text: 'Ele chora, ri, beija o chão. A sua frase vira poema, e, séculos depois, é inscrita em pedra.', fx: { karma: 12, fama: 10, stats: { dao: 3 } } } },
      { text: 'Responder com silêncio e uma xícara de chá.', res: { text: 'O velho entende. Eles bebem, lado a lado, até o sol cair.', fx: { karma: 8, stats: { dao: 4 } } } },
    ],
  },
  {
    id: 'r8_alquimia_imortalidade', title: 'A Pílula da Imortalidade', rarity: 'lendario', once: true, weight: 0.9,
    cond: { tierMin: 8 },
    text: 'Um alquimista de outro mundo bate à sua porta, com um frasco de cristal: a Pílula da Imortalidade. "Tome, e o mundo não o poderá matar. Mas ficará aqui, para sempre." Em vez de ascender, você viveria como uma lenda, sem fim, e sem Céu.',
    choices: [
      { text: 'Tomar a pílula.', res: { text: 'O tempo cessa de contar para você. Os dias, as estações, os séculos, tudo se torna uma música distante. Você nunca morrerá. Você também nunca irá embora.', fx: { vida: 300, stats: { dao: -2 }, setFlags: ['imortal_terrestre'] } } },
      { text: 'Recusar: o final é parte do caminho.', res: { text: 'O alquimista concorda com a cabeça. "Poucos têm essa coragem. Outros, essa tolice."', fx: { stats: { dao: 4 }, karma: 4 } } },
    ],
  },
  {
    id: 'r8_despedida', title: 'A Despedida do Mundo Mortal', rarity: 'raro', once: true, weight: 1.6,
    cond: { tierMin: 8 },
    text: 'Você sabe, pela primeira vez, que a ascensão já pode ser sua a qualquer instante. Falta só fechar as pontas soltas. Uma carta, uma visita, um favor, um perdão. A lista é curta e longa ao mesmo tempo.',
    choices: [
      { text: 'Visitar quem você feriu, e pedir perdão.', res: { text: 'Alguns perdoam, outros não. Você os agradece, com ou sem resposta. Sair assim, sem dívidas, é a forma mais leve de partir.', fx: { karma: 15, corr: -10, stats: { dao: 3 } } } },
      { text: 'Visitar quem você amou, e dizer adeus.', res: { text: 'Nem todos estão vivos. Você fala com as tumbas. O vento responde, sempre, um pouco mais baixo que as palavras.', fx: { karma: 8, stats: { dao: 2, car: 1 } } } },
      { text: 'Partir sem avisar ninguém.', res: { text: 'Nenhuma carta, nenhuma despedida. O mundo vai saber quando o céu abrir. Por ora, o silêncio é a sua última lição.', fx: { stats: { dao: 2 } } } },
    ],
  },
];
