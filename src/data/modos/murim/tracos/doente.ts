import type { ConjuntoTraco } from './tipos';

/**
 * Defeito: Saúde delicada (doente). Conceito: o frio e a exaustão o afetam com facilidade; a vida é mais curta e o corpo cobra cedo.
 * Força opções: só quem tem o defeito vê as saídas de quem precisa cuidar do corpo para poder fazer algo. Cicatriz: ser tratado como frágil.
 * Redenção: del_o_inverno_da_estrada, a escolha difícil de pedir cuidado e de aceitá-lo sem se sentir menos (fx.superar).
 * Cenas: del_febre_de_infancia (infância) -> del_a_escola_que_poupou (juventude) -> del_o_inverno_da_estrada (maturidade) -> del_quem_cuida (velhice).
 */
const F = { flaw: ['doente'] };

export const DOENTE: ConjuntoTraco = {
  eventos: [
    {
      id: 'del_febre_de_infancia', title: 'A janela do quarto', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 7, ageMax: 14 },
      text: 'Pela terceira vez no inverno, você está de cama com febre. Da janela do quarto, vê os outros meninos brincando na neve lá fora, sem casaco, sem tosse. Sua mãe, sentada ao lado da cama, dobra panos. Pela voz dela, você sabe que ela também se cansa. A boticária Seo Yun, que veio visitá-lo, pergunta o que você prefere: ficar quieto ou aprender a conhecer o próprio corpo.',
      choices: [
        { p: 'D', text: 'Pedir a Seo Yun que lhe ensine os sinais do corpo e as ervas que o aliviam', res: { text: 'Seo Yun ri baixo e começa a ensinar: a cor da língua, o ritmo do pulso, o amargo que ajuda e o que piora. Em um mês, você reconhece a febre antes de ela chegar. O corpo continua frágil, mas deixa de ser um estranho que o assalta, e passa a ser um vizinho difícil.', fx: { xp: 5, stats: { esp: 1, comp: 1 }, setFlags: ['del_aprendeu_ervas'] } } },
        { p: 'C', text: 'Pedir à mãe que descanse e prometer que vai se cuidar sozinho', res: { text: 'A mãe, cansada e comovida, aceita. Você cumpre a promessa por duas semanas, e depois mal. Mas o gesto de cuidar dela, aos oito anos, fica entre vocês como um tipo de pacto: você, o doente, também cuida; ela, a cuidadora, também precisa ser cuidada.', fx: { karma: 2, stats: { dao: 1 }, setFlags: ['del_cuidou_da_mae'] } } },
        { p: 'M', text: 'Jurar que vai ficar mais forte que todos os meninos lá fora', res: { text: 'A mãe sorri sem acreditar, mas lhe traz mais um cobertor. A promessa o acompanha por anos, como uma pedra no sapato: às vezes ajuda, quase sempre pesa. Você aprende que o orgulho pode servir de lenha, mas queima a casa se mal usado.', fx: { stats: { dao: 1 }, setFlags: ['del_jurou_forca'] } } },
      ],
    },
    {
      id: 'del_a_escola_que_poupou', title: 'Os treinos que te pouparam', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 16, ageMax: 34 },
      text: 'O mestre da escola, discreto, tira você dos treinos mais duros do inverno, dizendo apenas que há outras tarefas. Os colegas notam e murmuram. Você sabe o motivo: seu corpo o trairia no segundo dia. Mas a proteção, bem-intencionada, é uma humilhação silenciosa. Nos dias seguintes, você vê o pátio da janela da biblioteca, e o frio de dentro é de outro tipo.',
      choices: [
        { p: 'D', text: 'Aceitar a poupança e usar o tempo para estudar os manuais e ensinar os iniciantes', res: { text: 'Na biblioteca, você copia manuais, e com os iniciantes descobre que sabe explicar melhor do que muitos que treinam o dia inteiro. O mestre percebe e passa a confiar a você as aulas pequenas. A fraqueza vira um ofício, mas ainda queima um pouco no peito.', fx: { fama: 1, karma: 1, stats: { comp: 2 }, setFlags: ['del_virou_professor'] } } },
        { p: 'M', text: 'Exigir treinar como os outros, mesmo contra o conselho do mestre', check: { stat: ['fis', 'dao'], dif: 2 }, ok: { text: 'Você aguenta três dias de treino duro, a febre vem no quarto, e na semana seguinte está de volta à escola com os olhos brilhando e as mãos tremendo. O mestre, comovido e preocupado, dá a você um lugar na linha mas dobra a vigilância. O corpo pagou, mas a dignidade foi poupada.', fx: { fama: 2, ferida: 1, vida: -1, stats: { fis: 1, dao: 1 }, setFlags: ['del_treinou_com_febre'] } }, fail: { text: 'No segundo dia, você desmaia no pátio. O mestre o carrega nos braços até a enfermaria, sem uma palavra. Os colegas se calam. A teimosia custa três semanas de cama e uma humilhação pública que você não esquece.', fx: { fama: -2, ferida: 2, vida: -2, stats: { dao: 1 }, setFlags: ['del_desmaiou_no_patio'] } } },
        { p: 'C', text: 'Aceitar e pedir aos colegas que lhe contem, à noite, o que aprenderam no treino', res: { text: 'Os colegas, surpresos, aceitam. A cada noite, um deles senta ao lado da sua cama e narra o treino. Você memoriza tudo e, com o tempo, acompanha quase tão bem quanto eles. A escola ganha um costume novo: o de sentar ao lado de quem não pôde ir.', fx: { karma: 2, stats: { car: 1, comp: 1 }, setFlags: ['del_treino_contado'] } } },
      ],
    },
    {
      id: 'del_o_inverno_da_estrada', title: 'O inverno na beira da estrada', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 26, ageMax: 55 },
      text: 'Você viaja a pé entre duas cidades quando uma geada precoce cai. Na terceira noite, a tosse volta, o corpo trava, e a estalagem mais próxima está a um dia de distância. Um casal de camponeses, com um carro de boi, passa por perto e para. Perguntam se você precisa de ajuda. Você diz que não. Eles não se movem. É o seu orgulho, ou o seu corpo, quem decide.',
      choices: [
        { p: 'C', text: 'Aceitar a carona e deixar que eles o levem até a estalagem, sem fingir que não precisa', check: { stat: ['dao', 'car'], dif: 0 }, ok: { text: 'O casal o cobre com palha e uma manta de lã e segue devagar até a estalagem. Na madrugada, você ouve os dois conversarem baixinho, falando de um filho que também tossia. Pela primeira vez, aceitar ajuda não pareceu perda. Pareceu uma troca silenciosa, de gente que sabe o que é frio.', fx: { karma: 3, stats: { dao: 2, car: 1 }, superar: true, setFlags: ['del_aceitou_carona', 'del_pediu_cuidado'] } }, fail: { text: 'O casal o leva até a estalagem, mas você passa o trajeto de olhos fechados, mudo, envergonhado, sem uma palavra de agradecimento. Eles partem sem esperar nada. Você só percebe o que fez quando já é tarde, e a manta de lã fica, esquecida, no seu quarto.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['del_aceitou_carona'] } } },
        { p: 'D', text: 'Recusar e caminhar até a estalagem, devagar, parando a cada cem passos', res: { text: 'Leva o dia inteiro e metade da noite. Chega à estalagem ao amanhecer, com os lábios roxos, e dorme sem comer. A febre vem forte e dura uma semana. Recupera-se sozinho, com a sensação de ter provado algo a alguém, embora não saiba quem estava olhando.', fx: { vida: -2, ferida: 1, stats: { dao: 1 }, setFlags: ['del_recusou_ajuda'] } } },
        { p: 'A', text: 'Pedir apenas a manta emprestada e prometer devolvê-la na colheita', res: { text: 'O casal entrega a manta sem hesitar. Você segue a pé, agasalhado, e a devolve na colheita, com um saco de arroz como agradecimento. Eles recusam o arroz e aceitam o chá. Entre as duas famílias nasce uma correspondência que dura anos.', fx: { karma: 2, pedras: -10, stats: { car: 1 }, setFlags: ['del_manta_emprestada'] } } },
      ],
    },
    {
      id: 'del_quem_cuida', title: 'Quem cuida de quem cuidou', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...F, ageMin: 50 },
      text: 'Ao fim de uma vida frágil, você ainda está de pé, contra todas as previsões que Seo Yun fez há décadas. Hoje, uma menina de oito anos, filha de uma vizinha, senta ao seu lado e pergunta se dói ser velho e doente. Você nunca respondeu a essa pergunta com sinceridade. A menina espera, olhos largos, com o cuidado de quem sabe que a resposta pode ser longa.',
      choices: [
        { p: 'C O', text: 'Dizer à menina a verdade, que dói, mas que a dor traz atenção a coisas que os fortes não veem', res: { text: 'A menina ouve e depois pergunta que coisas. Você conta: o gosto da água, o jeito da luz, os passos de quem se aproxima. Ela fecha os olhos e escuta. Você nunca ensinou nada tão importante, e nunca imaginou que seria a fraqueza a lhe dar um ofício.', fx: { fama: 2, karma: 4, stats: { dao: 2, esp: 1 }, setFlags: ['del_fim_ok', 'del_fraqueza_oficio'] } } },
        { p: 'D', text: 'Ensinar à menina as ervas e os sinais do corpo que Seo Yun lhe passou há tantos anos', cond: { ...F, flagsAny: ['del_aprendeu_ervas', 'del_virou_professor', 'del_treino_contado', 'del_aceitou_carona', 'del_pediu_cuidado'] }, res: { text: 'A menina anota tudo com letras tortas. Em dez anos, será a boticária da vila, e a primeira receita que fizer com sucesso terá o seu nome no rodapé. Você passa, assim, para frente, a única riqueza que um corpo frágil acumula: o conhecimento de como se cuida.', fx: { fama: 3, karma: 4, stats: { dao: 2, comp: 1 }, setFlags: ['del_fim_ok', 'del_ervas_passadas'] } } },
        { p: 'T', text: 'Dizer que não dói tanto e mudar de assunto', res: { text: 'A menina, desconfiada, acena e muda de assunto também. A conversa continua em torno de bichos e de nuvens. Você a vê partir à tarde com a impressão de ter perdido uma ocasião, e fica olhando a luz mudar na parede, sem saber nomear o que falta.', fx: { stats: { dao: 1 }, setFlags: ['del_fim_ok'] } } },
      ],
    },
  ],
  opcoes: {
    murim_inverno: [
      { p: 'T C', text: 'Ficar junto ao fogo do templo com os mais frágeis e ajudar a cuidar dos febris', cond: F, res: { text: 'Cuidar de quem está doente é um ofício que você conhece desde menino. Passa a noite trocando panos e aquecendo caldo, e ao amanhecer ninguém piorou. As monjas, comovidas, lhe dão um lugar no templo para o inverno inteiro, e você aceita.', fx: { fama: 2, karma: 3, setFlags: ['del_inverno_templo'] } } },
    ],
    murim_dia_comum: [
      { p: 'T', text: 'Aceitar um lugar na carroça em vez de seguir a pé, e recuperar o fôlego pelo caminho', cond: F, res: { text: 'O cocheiro, jovial, conta histórias o caminho todo. Quando chegam, você está inteiro e descansado, com três novas histórias e uma amizade. Há dias em que ser frágil é só permissão para viajar melhor.', fx: { karma: 1, stats: { car: 1 }, setFlags: ['del_carona_cocheiro'] } } },
    ],
    murim_peregrinos: [
      { p: 'D', text: 'Pedir ao médico que examine o seu pulso e lhe diga o que não anda bem', cond: F, res: { text: 'O médico escuta o pulso, franze a testa e diz com franqueza o que viu: um coração que se cansa depressa, mas bate firme. Receita uma infusão e três hábitos simples. Você segue os hábitos pelo resto da vida e vive mais do que a maioria dos que o chamavam de frágil.', fx: { vida: 3, stats: { esp: 1 }, setFlags: ['del_pulso_lido'] } } },
    ],
    murim_refeicao: [
      { p: 'C', text: 'Oferecer ao rapaz a sua própria receita de caldo, boa para doentes, para a irmã dele', cond: F, res: { text: 'O rapaz, surpreso, anota a receita. A irmã melhora em uma semana, e Dae-hyun passa a mandar-lhe frutas e recados. Uma gentileza que veio de um corpo frágil e que serviu a outro corpo ainda mais frágil, num ciclo discreto.', fx: { karma: 3, stats: { comp: 1 }, setFlags: ['del_receita_do_caldo'] } } },
    ],
    murim_assembleia: [
      { p: 'T', text: 'Pedir à assembleia que fale sentada e em turnos curtos, porque não aguenta ficar em pé', cond: F, res: { text: 'A assembleia, surpresa, aceita. Os discursos ficam mais curtos e mais claros, e os delegados descobrem que sentados também discutem melhor. A proposta, nascida da sua fraqueza, é incorporada ao regimento sem ninguém lembrar de onde veio.', fx: { fama: 2, karma: 1, setFlags: ['del_assembleia_sentada'] } } },
    ],
    murim_final_vida: [
      { p: 'O', text: 'Passar o último inverno junto à janela, ouvindo quem vier contar histórias', cond: F, res: { text: 'As visitas vêm em fila, de manhã e à tarde. Cada uma traz um pedaço do mundo, e você as escuta com a atenção de quem aprendeu a ouvir pelo corpo. Ao final, a janela guarda mais histórias do que muitos livros.', fx: { fama: 2, karma: 3, setFlags: ['del_janela'] } } },
    ],
  },
};
