import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Vontade firme (coracao_inabalavel). Conceito: uma decisão tomada não se desfaz só porque ficou difícil.
 * A cicatriz: quem nunca recua precisa descobrir, uma vez, a diferença entre firmeza e teimosia, e pagar por ela.
 * Cenas: fir_promessa_na_chuva (infância) -> fir_ordem_errada (juventude) -> fir_porta_fechada (maturidade) -> fir_voto_velho (velhice).
 */
const T = { talent: ['coracao_inabalavel'] };

export const CORACAO_INABALAVEL: ConjuntoTraco = {
  eventos: [
    {
      id: 'fir_promessa_na_chuva', title: 'A promessa na chuva', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'Você prometeu a uma velha vizinha que levaria o cesto de ervas até a casa da filha dela, do outro lado do morro, antes do anoitecer. Agora começa a chover forte, os caminhos viram lama e os outros meninos, todos, voltam para casa. Ninguém o culparia se desistisse. A velha nem saberia.',
      choices: [
        { p: 'D', text: 'Seguir adiante sob a chuva até entregar o cesto', check: { stat: ['dao', 'fis'], dif: -1 }, ok: { text: 'Você chega à casa da filha encharcado, com os pés em carne viva e o cesto seco debaixo do manto. A mulher chora, o chá é quente, e você ouve pela primeira vez uma frase que vai guardar para sempre: promessa dada a velha vale tanto quanto a dada a rei. Dorme lá, pago com um colchão.', fx: { karma: 2, stats: { dao: 2 }, setFlags: ['fir_cesto_entregue'] } }, fail: { text: 'A lama engole uma sandália e você cai duas vezes no mesmo barranco. Chega de manhã, febril, e o cesto está molhado demais para as ervas. A mulher recebe o que sobrou. A velha, ao saber, diz que preferia a promessa cumprida a um cesto perfeito, e você não sabe se foi consolo ou verdade.', fx: { karma: 1, vida: -1, stats: { dao: 1 }, setFlags: ['fir_cesto_entregue'] } } },
        { p: 'T', text: 'Esperar a chuva passar sob um beiral e cumprir a promessa no dia seguinte', res: { text: 'A chuva dura a noite inteira, e você dorme encolhido no beiral de um estranho. Na manhã seguinte, corre o morro inteiro e entrega o cesto, atrasado. A filha sorri, a velha não diz nada, e você descobre que uma promessa pode ser cumprida em tempo imperfeito sem perder o valor.', fx: { karma: 1, stats: { dao: 1 }, setFlags: ['fir_cesto_atrasado'] } } },
        { p: 'C', text: 'Pedir aos outros meninos que o acompanhem, em troca de dividir o pagamento', res: { text: 'Três deles aceitam, mal-humorados. O caminho é pior do que parecia, e o grupo se ajuda mais do que reclama. A filha da velha serve doces para os quatro. Você aprende que firmeza também é saber trazer os outros para dentro dela.', fx: { fama: 1, karma: 2, stats: { car: 1, dao: 1 }, setFlags: ['fir_cesto_entregue'] } } },
      ],
    },
    {
      id: 'fir_ordem_errada', title: 'A ordem que ele sabia errada', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'O mestre da escola ordena que você defenda um posto de guarda contra uma investida que vem do lado oposto ao que ele imagina. Você sabe, pelos rastros, que o ataque vem pelo norte; ele manda você ficar ao sul. A ordem é clara. Você jurou obedecer. E também jurou proteger a escola.',
      choices: [
        { p: 'D', text: 'Obedecer e ficar ao sul, mesmo vendo o ataque se formar no norte', res: { text: 'O ataque vem, forte, pelo norte, e a escola é pega de surpresa. Você luta, ferido, no lugar errado, e depois carrega o peso da obediência: cumpriu o juramento, e quatro colegas pagaram por ele. O mestre jamais pergunta se você sabia. Você jamais conta.', fx: { fama: 1, karma: -1, ferida: 1, stats: { dao: 2 }, setFlags: ['fir_obedeceu_errado'] } } },
        { p: 'C T', text: 'Avisar o mestre uma vez, com respeito, e obedecer se ele insistir', res: { text: 'O mestre o escuta com o rosto fechado e mantém a ordem. Você obedece, e antes de ir ao posto deixa um recado para os colegas do norte: um aviso discreto que o mestre não autorizou. A escola resiste por pouco, e ninguém saberá quem avisou, a não ser o próprio mestre, anos depois, em silêncio.', fx: { fama: 2, karma: 2, stats: { dao: 1, esp: 1 }, setFlags: ['fir_avisou_uma_vez'] } } },
        { p: 'V M', text: 'Desobedecer, ir ao norte e enfrentar o ataque sem esperar ordem', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'Você chega ao norte dois minutos antes do ataque e segura a entrada com quatro colegas que o seguem sem perguntar. A escola vence. O mestre o castiga por desobediência e, na mesma tarde, o promove, e nenhum dos dois explica ao pátio como isso cabe numa só decisão.', fx: { fama: 4, karma: 1, ferida: 1, stats: { dao: 2 }, setFlags: ['fir_desobedeceu_certo'] } }, fail: { text: 'Você chega tarde, sozinho, e o posto do sul cai sem defensor. A escola perde as duas frentes. O mestre o chama a seu quarto e diz apenas que a firmeza sem escuta tem um nome, e que o nome não é coragem. Você sai sem resposta.', fx: { fama: -3, karma: -2, ferida: 2, stats: { dao: 1 }, setFlags: ['fir_teimosia_cobrada'] } } },
      ],
    },
    {
      id: 'fir_porta_fechada', title: 'A porta que você jurou não abrir', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 28, ageMax: 58 },
      text: 'Há vinte anos você jurou nunca mais atravessar a porta da casa do seu irmão, depois da briga pela herança. Hoje chega uma criança com o recado: ele está doente, pede para vê-lo, e talvez não passe do inverno. A mágoa continua inteira, firme como no primeiro dia, e é exatamente por isso que dói. Quebrar o juramento seria trair o que você é.',
      choices: [
        { p: 'C', text: 'Atravessar a porta e deixar o juramento para trás', res: { text: 'A primeira coisa que ouve, ao entrar, é seu irmão chorando de alívio. A segunda, que ele também guardava a mesma mágoa e a mesma vergonha. Passam o inverno juntos, falando pouco. No fim, você descobre que quebrar uma promessa velha pode ser o ato de maior firmeza da sua vida.', fx: { karma: 4, stats: { dao: 2, car: 1 }, setFlags: ['fir_porta_aberta'] } } },
        { p: 'D', text: 'Manter o juramento e mandar uma carta e dinheiro, sem entrar', res: { text: 'Seu irmão recebe a carta e o dinheiro, e responde com uma frase curta, sem rancor nem calor. Morre no inverno. Você vai ao enterro e fica do lado de fora do portão, de pé, até o fim. O juramento permanece, inteiro, e vazio como uma casa de onde todos saíram.', fx: { karma: -1, stats: { dao: 2 }, setFlags: ['fir_juramento_mantido'] } } },
        { p: 'O', text: 'Pedir que a criança traga o irmão até o portão, para vê-lo sem atravessar', check: { stat: ['car', 'dao'], dif: 0 }, ok: { text: 'Seu irmão é levado numa maca até o portão. Vocês se olham, cada um de um lado, sem tocar a soleira. Falam durante uma hora, e no fim ele sorri e diz que sempre foi o mais teimoso dos dois. A porta nunca foi aberta, e ainda assim algo se desfez.', fx: { karma: 3, stats: { dao: 2 }, setFlags: ['fir_porta_aberta'] } }, fail: { text: 'A maca nunca chega: seu irmão não tem forças para ser carregado. O recado volta, mudo. Você fica no portão até a noite, e a firmeza que sempre foi a sua forma de honra revela, pela primeira vez, ser também o seu modo de perder.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['fir_juramento_mantido'] } } },
      ],
    },
    {
      id: 'fir_voto_velho', title: 'O voto que ninguém lembrava', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 55 },
      text: 'Um mensageiro da escola em que você começou chega à sua porta com um pergaminho amarelado: o voto que você fez na juventude, de proteger as estradas até morrer. A escola foi dissolvida há anos, quem o recebeu já se foi, e ninguém o cobra mais. Mas o papel está ali, com a sua letra, e a sua mão treme ao tocá-lo.',
      choices: [
        { p: 'D O', text: 'Renovar o voto em voz alta, diante do mensageiro, como se o dia fosse o primeiro', res: { text: 'O mensageiro hesita, depois se ajoelha e repete o voto com você. A frase soa estranha na boca de um velho, mas inteira. Nos meses seguintes, a estrada ao redor da sua casa ganha lanternas, e os viajantes dizem, sem saber por quê, que ali se anda mais seguro.', fx: { fama: 4, karma: 3, stats: { dao: 2 }, setFlags: ['fir_inabalavel', 'fir_voto_renovado'] } } },
        { p: 'C', text: 'Libertar a si mesmo do voto e entregar o papel às chamas', cond: { ...T, flagsAny: ['fir_porta_aberta', 'fir_avisou_uma_vez', 'fir_cesto_atrasado'] }, res: { text: 'O papel queima rápido. Você observa até a última letra e sente uma coisa curiosa: não leveza, e sim a certeza de ter escolhido. A sua firmeza nunca foi a de não mudar, mas a de saber, por fim, o que valia o preço de manter e o que não valia.', fx: { karma: 2, stats: { dao: 3 }, setFlags: ['fir_inabalavel', 'fir_voto_solto'] } } },
        { p: 'T', text: 'Guardar o pergaminho sem renovar nem queimar, e deixá-lo na gaveta', res: { text: 'O pergaminho dorme na gaveta até a sua morte. Quem o encontra, depois, lê com os olhos cheios e o recoloca no mesmo lugar. Você não renovou, não rompeu, apenas aceitou carregar, e é possível que isso seja a firmeza mais honesta de todas.', fx: { stats: { dao: 1 }, setFlags: ['fir_inabalavel'] } } },
      ],
    },
  ],
  opcoes: {
    murim_torneio: [
      { p: 'D', text: 'Continuar lutando depois de a mão quebrar, até o juiz declarar o fim', cond: T, res: { text: 'A mão fica inutilizada, e a luta é perdida por pontos. Mas a plateia, em pé, aplaude o que viu: alguém que não parou. Gwon Tae-seok, da tribuna, anota o seu nome com uma caligrafia pequena e raivosa.', fx: { fama: 3, ferida: 1, stats: { dao: 1 }, setFlags: ['fir_mao_quebrada'] } } },
    ],
    murim_conselho: [
      { p: 'D', text: 'Repetir a acusação, sem alterar uma palavra, a cada vez que o conselho tentar desviar', cond: T, res: { text: 'Na quarta repetição, o presidente do conselho cede, cansado, e manda registrar a acusação. Não é vitória nem derrota, é a obrigação de ouvi-lo sem cessar. Gwon Tae-seok sai da sala sem olhar ninguém.', fx: { fama: 3, stats: { dao: 1 }, setFlags: ['fir_conselho_repetido'] } } },
    ],
    murim_julgamento: [
      { p: 'D', text: 'Recusar o acordo de Gwon e dizer que a página original só sai das suas mãos com testemunhas', cond: T, res: { text: 'Gwon sorri, aumenta a oferta, depois a ameaça. Você repete a mesma frase, com o mesmo tom, até ele perceber que nenhuma das duas coisas importa. A página fica com você, inteira, e a sua vida ganha mais um inimigo respeitoso.', fx: { fama: 3, karma: 1, stats: { dao: 2 }, setFlags: ['fir_pagina_mantida'] } } },
    ],
    murim_duelo_ponte: [
      { p: 'D', text: 'Ficar parado no meio da ponte e esperar que o espadachim decida se avança', cond: T, res: { text: 'Passam-se vinte minutos sem que ninguém se mova. O espadachim, impaciente, tira a máscara e confessa que não esperava resistência sem golpe. A conversa começa ali, no meio da ponte, e não termina em duelo.', fx: { fama: 2, karma: 1, stats: { dao: 1 }, setFlags: ['fir_ponte_parada'] } } },
    ],
    murim_inverno: [
      { p: 'D', text: 'Ficar de guarda no celeiro a noite toda, recusando o revezamento até o amanhecer', cond: T, res: { text: 'Ao amanhecer, os dedos estão brancos e a mente, estranhamente clara. O celeiro continua cheio, as crianças dormem, e uma velha põe uma tigela de sopa nas suas mãos sem dizer nada. Você aceita, pela primeira vez, uma ajuda sem sentir que perdeu algo.', fx: { fama: 3, karma: 2, ferida: 1, setFlags: ['fir_noite_de_guarda'] } } },
    ],
    murim_punicao: [
      { p: 'D', text: 'Dizer ao mestre que não depõe contra ninguém antes de ver o manual com os próprios olhos', cond: T, res: { text: 'O mestre exige e ameaça, e você mantém a recusa. Na manhã seguinte o manual aparece em uma estante, esquecido, e o caso inteiro se desfaz sem que ninguém precise ser condenado. Dae-hyun lhe agradece com os olhos, sem poder falar.', fx: { fama: 2, karma: 3, setFlags: ['fir_manual_visto'] } } },
    ],
  },
};
