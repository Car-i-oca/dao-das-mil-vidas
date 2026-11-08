import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Força incomum (sangue_dragao). Conceito: um corpo naturalmente forte chama atenção, e a atenção traz medo e expectativa.
 * Diferente da Constituição vigorosa (aguentar), este é o golpe: a força que quebra. A cicatriz: o dia em que a força machuca quem não devia.
 * Cenas: dra_mao_que_quebrou (infância) -> dra_treino_contido (juventude) -> dra_o_pedido_do_clan (maturidade) -> dra_mao_aberta (velhice).
 */
const T = { talent: ['sangue_dragao'] };

export const SANGUE_DRAGAO: ConjuntoTraco = {
  eventos: [
    {
      id: 'dra_mao_que_quebrou', title: 'O brinquedo que virou lasca', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 7, ageMax: 14 },
      text: 'Durante uma brincadeira de empurrões, você aperta o braço de um amigo mais novo para impedi-lo de cair, e ouve um estalo seco. O amigo grita. O osso, sob os seus dedos, cedeu como um graveto. A roda de meninos recua, em silêncio, olhando suas mãos, que ainda não parecem diferentes das deles.',
      choices: [
        { p: 'C', text: 'Carregar o amigo até a casa da boticária, pedir perdão e ficar com ele até o fim', res: { text: 'Seo Yun imobiliza o braço com talas e diz que não foi culpa sua, mas da própria força: coisa que se aprende a medir. Você passa a visitar o amigo todos os dias, levando água, e ele, aos poucos, volta a rir. Na lembrança, o estalo permanece como um sino distante.', fx: { karma: 2, stats: { dao: 1, car: 1 }, setFlags: ['dra_amigo_cuidado'] } } },
        { p: 'T', text: 'Sair correndo, esconder-se e esperar que ninguém diga que foi você', res: { text: 'Ninguém conta, porque ninguém quis ver. O amigo se cura, mas olha as suas mãos com cuidado dali em diante. Você guarda o medo de si mesmo como uma pedra pequena, que cresce a cada vez que lembra.', fx: { stats: { dao: 1 }, setFlags: ['dra_fugiu'] } } },
        { p: 'D', text: 'Pedir a seu pai que o ensine a aprender a medir a própria força', res: { text: 'O pai o leva a uma forja e lhe entrega dois martelos, um de madeira e um de ferro. Ensina que a força é como a água: serve a quem sabe canalizá-la. Em um ano, você consegue quebrar uma noz sem despedaçar a mesa.', fx: { karma: 1, xp: 5, stats: { fis: 1, dao: 1 }, setFlags: ['dra_aprendeu_medir'] } } },
      ],
    },
    {
      id: 'dra_treino_contido', title: 'O treino em que você precisou perder', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'No pátio, você enfrenta um colega mais fraco e esbarra, sem querer, na sua força toda. O colega voa três passos e bate de costas num poste. Ele se levanta devagar, rindo, mas o pulso treme. Os outros alunos cochicham. A mestra olha de longe e pede que você se aproxime. Quer saber se você ainda sabe perder de propósito.',
      choices: [
        { p: 'D T', text: 'Treinar por semanas com pesos leves, aprendendo a conter cada golpe', res: { text: 'A mestra lhe dá uma bola de argila: se você a amassar, perde o dia. Em um mês, consegue segurá-la sem deformar. Em três, rola-a entre os dedos sem marcar. Não é mais fraco, mas é mais perigoso, porque agora sabe quando soltar.', fx: { xp: 8, stats: { comp: 1, dao: 1 }, setFlags: ['dra_forca_contida'] } } },
        { p: 'M', text: 'Aceitar a fama de forte e deixar que os outros recuem diante de você', res: { text: 'Os colegas deixam de desafiá-lo, e o pátio fica mais silencioso quando você chega. A reputação o precede, e ninguém lhe pergunta nada. Ganha respeito e perde proximidade, e quando percebe, está sozinho no meio de uma escola cheia.', fx: { fama: 3, karma: -1, stats: { fis: 1 }, setFlags: ['dra_temido'] } } },
        { p: 'C', text: 'Pedir ao colega que lhe ensine uma técnica de leveza, em troca de lições de peso', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'O colega, lisonjeado, aceita. Trocam lições durante meses e se tornam bons amigos. Ele aprende a resistir, você aprende a ceder. A mestra, observando, anota algo no caderno e sorri pela primeira vez em muito tempo.', fx: { fama: 2, karma: 2, stats: { comp: 1, car: 1 }, setFlags: ['dra_forca_contida', 'dra_amigo_leve'] } }, fail: { text: 'O colega recusa, ainda com o pulso dolorido, e se afasta sem rancor. Você fica com a lembrança do poste e com a certeza de que alguns erros custam amizades que não voltam.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['dra_temido'] } } },
      ],
    },
    {
      id: 'dra_o_pedido_do_clan', title: 'Quem quer um braço como o seu', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 26, ageMax: 55 },
      text: 'Um emissário do Clã Gwon chega com uma bolsa pesada e uma proposta simples: ser o braço direito do clã, o homem diante de quem os devedores se calam. A paga é grande, a proteção é real, e o trabalho, ele diz, quase nunca exige violência: basta sua presença. A bolsa brilha, e sua força, ao seu lado, parece uma espécie de segunda voz.',
      choices: [
        { p: 'G M', text: 'Aceitar a oferta e se tornar o braço do clã', res: { text: 'Por cinco anos, você basta. Os devedores pagam, os rivais recuam, e a bolsa nunca esvazia. Quando enfim precisa usar a força, é contra um velho e uma criança, e algo se quebra em você que não é osso. Sai do clã sem ouro, mas com uma cicatriz que só você enxerga.', fx: { pedras: 120, karma: -4, fama: 2, stats: { fis: 1 }, setFlags: ['dra_braco_do_cla'] } } },
        { p: 'D', text: 'Recusar a oferta e voltar à estrada, escolhendo para quem usar a força', res: { text: 'O emissário parte sem protestar, mas deixa uma ameaça velada no tom de voz. Você segue pela estrada com a bolsa que não pegou e a consciência que manteve. Ajuda carroças, quebra portas trancadas, defende quem não pode, e a lenda do seu braço corre, sem nunca virar mercadoria.', fx: { fama: 3, karma: 3, stats: { dao: 1 }, setFlags: ['dra_recusou_cla'] } } },
        { p: 'A', text: 'Fingir aceitar para conhecer por dentro o clã e denunciar os abusos', check: { stat: ['car', 'esp'], dif: 1 }, ok: { text: 'Em seis meses, você conhece cada nome, cada dívida, cada ameaça. Quando denuncia ao conselho, a documentação é irretocável, e a queda do clã é rápida. A fama do seu braço é a menor parte do que você fez. A maior é a coragem de ter fingido sem se perder.', fx: { fama: 5, karma: 3, pedras: 40, stats: { esp: 1, car: 1 }, setFlags: ['dra_infiltrou_cla'] } }, fail: { text: 'O clã descobre o jogo em dois meses. Você escapa por pouco, ferido, com os documentos pela metade e uma inimizade que persistirá por anos. A força, sozinha, não sustenta um disfarce.', fx: { fama: -2, ferida: 2, karma: 1, setFlags: ['dra_recusou_cla'] } } },
      ],
    },
    {
      id: 'dra_mao_aberta', title: 'A mão que já não quebra', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 52 },
      text: 'Uma criança de cinco anos, neta de uma antiga vizinha, apoia a mão pequena na sua, grande e velha, e pergunta se pode medir. As duas mãos lado a lado parecem de espécies diferentes. Você, que passou a vida inteira medindo cada gesto para não quebrar nada, sente pela primeira vez que a mão está inteiramente em repouso, e ainda assim vigia.',
      choices: [
        { p: 'C', text: 'Deixar a criança segurar o seu dedo com as duas mãos e aguardar o que ela decidir fazer', res: { text: 'A criança aperta com toda a força, ri, e solta. Não houve nenhuma dor, nenhum estalo, nenhum medo. Você descobre que a vida inteira estava à espera de um aperto que não precisasse de cuidado, e que a força, no fim, é só uma mão aberta.', fx: { karma: 3, stats: { dao: 2 }, setFlags: ['dra_forca_aberta', 'dra_mao_aberta_fim'] } } },
        { p: 'D', text: 'Contar à criança o que a força custou, em palavras simples, e o que valeu a pena', res: { text: 'Ela escuta, séria, e depois pergunta se dói ser tão forte. Você responde que dói quando se esquece, e deixa a criança dormir no seu colo. Ela não vai lembrar da conversa, mas lembrará de alguém que a ouviu com a mão aberta.', fx: { karma: 2, stats: { dao: 2 }, setFlags: ['dra_mao_aberta_fim'] } } },
        { p: 'O', text: 'Mostrar à criança como segurar uma pedra sem quebrá-la, passando adiante o seu ofício', cond: { ...T, flagsAny: ['dra_amigo_cuidado', 'dra_aprendeu_medir', 'dra_forca_contida', 'dra_recusou_cla', 'dra_infiltrou_cla'] }, res: { text: 'A criança segura a pedra com as duas mãos, devagar. Você lhe ensina a respirar antes de apertar e a soltar antes de sentir. Ela aprende rápido. Anos depois, será a mão mais firme e mais suave da vila, e a pedra ainda estará sobre a mesa.', fx: { fama: 3, karma: 3, stats: { dao: 2 }, setFlags: ['dra_forca_aberta', 'dra_mao_aberta_fim'] } } },
      ],
    },
  ],
  opcoes: {
    murim_torneio: [
      { p: 'V D', text: 'Vencer as primeiras rodadas com um só golpe e depois recusar-se a bater em quem já estava no chão', cond: T, res: { text: 'A plateia vibra pela força e vaia pela recusa. Os juízes, divididos, anotam: um forte que sabe parar. Gwon Tae-seok sorri de lado e envia, no fim do dia, um convite para jantar. Você não responde, e a recusa já é uma declaração.', fx: { fama: 4, karma: 2, stats: { fis: 1 }, setFlags: ['dra_torneio_parou'] } } },
    ],
    murim_ponte_reparo: [
      { p: 'C D', text: 'Ajeitar a pedra do vão com um empurrão só e ensinar os trabalhadores a travar a cunha', cond: T, res: { text: 'A pedra assenta num estalo, e a cunha trava. Os trabalhadores, boquiabertos, perguntam o truque. Você explica que o truque é a cunha, não a força. A ponte reabre mais forte do que antes, e seu braço vira assunto de taverna, que você corrige a cada vez.', fx: { fama: 3, karma: 2, setFlags: ['dra_ponte_cunha'] } } },
    ],
    murim_ataque: [
      { p: 'V', text: 'Quebrar a lança do líder com as mãos e mostrar aos outros a madeira partida', cond: T, res: { text: 'O estalo ecoa na estrada, e os quatro bandidos recuam sem trocar palavra. O cocheiro, atônito, agradece com os olhos. Você recolhe os pedaços da lança e os pendura na carroça, como aviso a quem se aproximar depois.', fx: { fama: 3, karma: 1, setFlags: ['dra_lanca_partida'] } } },
    ],
    murim_refugiados: [
      { p: 'C', text: 'Carregar a carroça com as três famílias inteiras até a cidade, puxando-a sozinho', cond: T, res: { text: 'A estrada é longa, e a carroça é pesada, mas você a arrasta até o fim, ofegando. As famílias dormem no caminho, aliviadas. Ao chegar, a cidade vê um homem exausto e três famílias inteiras, e a história corre por semanas sem que você a conte.', fx: { fama: 3, karma: 3, stats: { fis: 1 }, setFlags: ['dra_carroca_puxada'] } } },
    ],
    murim_duelo_ponte: [
      { p: 'D', text: 'Aceitar o duelo e vencer prendendo o adversário nos braços, sem feri-lo', cond: T, res: { text: 'O espadachim, imobilizado, rosna e depois ri, vencido. Ao tirar a máscara, revela um rosto que você conhecia. Os dois se abraçam diante das testemunhas, sem vencedor nem vencido, e a ponte guarda a lembrança de um duelo sem sangue.', fx: { fama: 3, karma: 2, setFlags: ['dra_duelo_abraco'] } } },
    ],
    murim_dia_comum: [
      { p: 'T', text: 'Descarregar a carroça com as mãos nuas, mas devagar, para não assustar o cavalo', cond: T, res: { text: 'O cavalo, que sempre se assustava com estranhos, acalma-se. O cocheiro nota o cuidado e a força juntos, e diz que raramente viu as duas coisas na mesma pessoa. Você sorri e continua, sem pressa, sentindo o peso de cada saco como um lembrete.', fx: { karma: 1, stats: { fis: 1 }, setFlags: ['dra_cavalo_calmo'] } } },
    ],
  },
};
