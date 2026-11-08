import type { ConjuntoTraco } from './tipos';

/**
 * Defeito: Fôlego curto (meridianos_estreitos). Conceito: o treino prolongado cobra mais dele do que dos outros; ele cansa antes.
 * Força opções: só quem tem o defeito vê as saídas de quem precisa poupar o fôlego. Cicatriz: o orgulho de não aceitar o limite.
 * Redenção: fol_respiracao_do_monge, a escolha difícil de treinar de outro jeito (fx.superar).
 * Cenas: fol_corrida_perdida (infância) -> fol_treino_cortado (juventude) -> fol_respiracao_do_monge (maturidade) -> fol_fim_de_fila (velhice).
 */
const F = { flaw: ['meridianos_estreitos'] };

export const MERIDIANOS_ESTREITOS: ConjuntoTraco = {
  eventos: [
    {
      id: 'fol_corrida_perdida', title: 'A corrida da ladeira', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 8, ageMax: 15 },
      text: 'Os meninos apostam uma corrida até o alto da ladeira do templo. Você sabe, antes de largar, que vai ficar para trás: o peito aperta na metade do caminho, sempre, como uma porta que fecha. Os outros riem, mas sem maldade, esperando que você ria também. O prêmio é um bolo de arroz inteiro, e você tem fome.',
      choices: [
        { p: 'M', text: 'Correr até o fim, mesmo sem ar, e chegar de joelhos', res: { text: 'Você chega em último, com a visão turva e os ouvidos zumbindo, e desmaia no degrau do templo. Um monge o acorda com água fria. Ninguém ri. O bolo de arroz é dividido em seis, e a sua parte vem na mão do monge, que diz apenas que teimosia e coragem se parecem, mas não se confundem.', fx: { fama: 1, vida: -1, stats: { dao: 1 }, setFlags: ['fol_correu_ate_cair'] } } },
        { p: 'A', text: 'Propor outra prova em que o fôlego não decida', res: { text: 'Você sugere uma corrida de equilíbrio sobre o muro baixo do templo. Os meninos, curiosos, aceitam. Você vence com facilidade, pela primeira vez, e descobre que o limite de um corpo pode ser a regra de outro jogo. Deixa de ser o último e passa a ser o dono das provas.', fx: { karma: 1, stats: { comp: 1, car: 1 }, setFlags: ['fol_mudou_a_prova'] } } },
        { p: 'T', text: 'Ficar de lado e contar os colegas que passam, fingindo que não quer participar', res: { text: 'Fica sentado na sombra, ao lado de uma velha que vende chá. Ela não pergunta nada. Quando os meninos descem, o vencedor lhe oferece um pedaço do bolo, sem malícia. Você aceita, com a boca seca de vergonha, e aprende que esconder o limite machuca mais que mostrá-lo.', fx: { stats: { dao: 1 }, setFlags: ['fol_ficou_de_lado'] } } },
      ],
    },
    {
      id: 'fol_treino_cortado', title: 'A hora que você não aguentou', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 16, ageMax: 34 },
      text: 'O mestre determina uma sequência de duas horas sem pausa, para fortalecer o espírito. Aos quarenta minutos, o ar falta e a visão escurece nos cantos. Os colegas continuam, com o rosto vermelho e a forma firme. Se você parar agora, será o único a parar. Se continuar, cairá. O mestre olha de longe, sem dar sinal do que pensa.',
      choices: [
        { p: 'T', text: 'Parar, pedir licença e sentar à beira do pátio até recuperar o fôlego', res: { text: 'O mestre acena sem comentar. Duas semanas depois, chama você a um canto e diz que o fôlego curto não é falta de coragem: é um tipo de corpo, e há formas de treino que respeitam isso. A humilhação da pausa vira, aos poucos, o começo de um método.', fx: { stats: { dao: 1, comp: 1 }, setFlags: ['fol_parou_a_tempo'] } } },
        { p: 'M D', text: 'Seguir até o fim do treino, mesmo caindo no meio', check: { stat: ['fis', 'dao'], dif: 2 }, ok: { text: 'Você termina a sequência com os olhos fechados, no automático, e cai de joelhos ao fim. Os colegas aplaudem baixinho. O mestre, de braços cruzados, assente uma vez. Foi um feito, e também um aviso: o corpo anotou a conta, e o preço será cobrado em horas de febre.', fx: { fama: 3, ferida: 1, vida: -1, stats: { dao: 2 }, setFlags: ['fol_terminou_a_marca'] } }, fail: { text: 'Aos sessenta minutos você desmaia no meio de um golpe e bate a cabeça no chão do pátio. Acorda na enfermaria com a mestra a seu lado, séria. Ela diz que a teimosia lhe custou uma semana, e que um corpo só se treina até onde ele conta a verdade.', fx: { ferida: 2, vida: -1, stats: { dao: 1 }, setFlags: ['fol_correu_ate_cair'] } } },
        { p: 'A', text: 'Pedir ao mestre uma versão em blocos curtos e provar que consegue o mesmo no fim', res: { text: 'O mestre ergue a sobrancelha, considera e concede, com a condição de que o resultado seja igual. Você divide em seis blocos de vinte minutos, com respirações entre eles, e termina com a forma inteira. Os colegas estranham, mas o mestre registra o método no caderno de aulas.', fx: { fama: 1, stats: { comp: 1, esp: 1 }, setFlags: ['fol_blocos_curtos'] } } },
      ],
    },
    {
      id: 'fol_respiracao_do_monge', title: 'O monge que respirava devagar', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 26, ageMax: 55 },
      text: 'Um monge velho, de passagem pela vila, vê você tossir ao carregar uma jarra e lhe oferece, sem rodeios, um método de respiração: quarenta dias de exercícios lentos, sem esforço, sem pressa, ao amanhecer. O método não cura, diz ele, mas ensina o corpo a aproveitar o pouco ar que tem. É longo, chato e humilhante, para quem sempre tentou vencer o limite à força.',
      choices: [
        { p: 'D O', text: 'Aceitar o método e cumpri-lo por quarenta dias, sem pular nenhum', check: { stat: ['dao', 'comp'], dif: 0 }, ok: { text: 'No quadragésimo dia, você sobe a ladeira do templo sem parar, devagar, respirando em compasso. Não corre, mas chega inteiro. O monge sorri e vai embora na manhã seguinte. Você passa a viver com um corpo que ainda é curto de fôlego, mas deixou de ser um inimigo.', fx: { karma: 2, stats: { dao: 2, fis: 1 }, superar: true, setFlags: ['fol_respirou', 'fol_metodo_do_monge'] } }, fail: { text: 'No vigésimo dia, a pressa vence e você abandona o método, frustrado, com o corpo no mesmo lugar. O monge parte sem recriminação. Anos depois, você ainda sente que aquele dia foi um corte: o limite, uma vez recusado, volta mais teimoso.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['fol_abandonou_metodo'] } } },
        { p: 'T', text: 'Recusar, agradecendo, e continuar a viver dentro dos próprios limites', res: { text: 'O monge assente e se despede. Você segue com o fôlego curto, ajustando a vida a ele: carrega menos, descansa mais, planeja os passos. Não é uma derrota, e não é uma vitória: é uma paz de contas já resolvidas, e que não evolui.', fx: { stats: { dao: 1 }, setFlags: ['fol_recusou_monge'] } } },
        { p: 'G', text: 'Pedir ao monge que lhe venda um tônico que dispense o exercício', res: { text: 'O monge ri baixo e diz que o tônico existe, mas é o mesmo exercício. Você insiste, paga uma moeda e leva um chá amargo. Ele funciona uma semana, depois nada. O corpo, que nunca pediu atalho, só queria ser ouvido, e o chá fica na prateleira, vazio.', fx: { pedras: -10, setFlags: ['fol_recusou_monge'] } } },
      ],
    },
    {
      id: 'fol_fim_de_fila', title: 'O último da fila que ensinava', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...F, ageMin: 50 },
      text: 'Uma jovem de dezesseis anos, de fôlego tão curto quanto o seu foi, chega à sua porta, cansada de ser a última da fila na escola. Os mestres a mandaram embora. Ela ouviu dizer que o senhor sabe o que é isso. Não pede nada: só espera, ofegante, a ver se há algo a dizer a quem sempre chega depois.',
      choices: [
        { p: 'C D', text: 'Ensinar-lhe, passo a passo, o método de respiração e o que aprendeu sobre poupar', cond: { ...F, flagsAny: ['fol_respirou', 'fol_blocos_curtos', 'fol_parou_a_tempo', 'fol_mudou_a_prova'] }, res: { text: 'Leva meses. A jovem aprende a respirar devagar, a medir o passo, a mudar as provas. No fim do ano, vence uma corrida de resistência sem ser a mais rápida: apenas a que chegou inteira. Ela diz que aprendeu mais no fim da fila do que na frente dela.', fx: { fama: 3, karma: 4, stats: { dao: 2, car: 1 }, setFlags: ['fol_fim_ok', 'fol_herdeira_do_folego'] } } },
        { p: 'O', text: 'Contar a ela a sua história sem enfeite, incluindo os dias em que quis desistir', res: { text: 'A jovem escuta e chora baixinho. Quando você termina, ela já respira diferente. Não é uma cura, é um conforto: a sensação de ter companhia no limite. Passa a visitá-lo uma vez por mês, e a ideia de que alguém sabe tudo isso já é, para ela, um começo.', fx: { karma: 3, stats: { dao: 2 }, setFlags: ['fol_fim_ok'] } } },
        { p: 'T', text: 'Dizer que cada um tem de achar o seu ritmo, e despedi-la com um chá', res: { text: 'Ela aceita o chá, agradece e parte. Você fica olhando a poeira da estrada baixar, com a sensação de ter dito o que era verdade e insuficiente. Alguns limites se atravessam sozinhos; outros, em companhia. Você escolheu a primeira, e a dúvida o acompanha.', fx: { stats: { dao: 1 }, setFlags: ['fol_fim_ok'] } } },
      ],
    },
  ],
  opcoes: {
    murim_dia_comum: [
      { p: 'T', text: 'Descarregar a carroça em etapas curtas, sentando entre elas para recuperar o fôlego', cond: F, res: { text: 'O cocheiro se impacienta, depois vê que o serviço sai impecável, sem derrubar nada. Você termina mais tarde que os outros e mais inteiro. Ele agradece, meio desconcertado, e diz que raramente viu alguém trabalhar tão bem devagar.', fx: { karma: 1, stats: { dao: 1 }, setFlags: ['fol_trabalho_em_etapas'] } } },
    ],
    murim_torneio: [
      { p: 'A T', text: 'Inscrever-se apenas nas lutas de poucos assaltos, escolhendo o momento de acabar', cond: F, res: { text: 'Você vence duas rodadas curtas e se retira antes da terceira, que seria longa. A plateia estranha, os juízes anotam, e você sai com os dentes inteiros e a dignidade de quem escolheu. Gwon Tae-seok ri de longe: o senhor sabe perder.', fx: { fama: 1, stats: { esp: 1 }, setFlags: ['fol_torneio_curto'] } } },
    ],
    murim_refugiados: [
      { p: 'C', text: 'Revezar com as famílias no ritmo da carroça, caminhando e sentando por turnos', cond: F, res: { text: 'As famílias, que também estão cansadas, sentem alívio por ver alguém admitir o cansaço. O grupo avança num passo humano, sem ninguém desabar. A cidade surge ao fim da tarde, e a menina do estandarte pega a sua mão sem dizer nada.', fx: { karma: 3, setFlags: ['fol_refugiados_turnos'] } } },
    ],
    murim_inverno: [
      { p: 'T', text: 'Ficar no celeiro com as crianças e cuidar do fogo, em vez de abrir caminho na neve', cond: F, res: { text: 'Os outros partem para abrir a trilha, e você fica. A noite é longa e silenciosa, e as crianças dormem aos poucos em volta do fogo. Pela manhã, os homens voltam, e ninguém pergunta por que você ficou. Cuidar do fogo, descobre, também é uma forma de guarda.', fx: { karma: 2, fama: 1, setFlags: ['fol_cuidou_do_fogo'] } } },
    ],
    murim_peregrinos: [
      { p: 'D', text: 'Pedir ao monge que lhe ensine como respirar quando o ar falta', cond: F, res: { text: 'O monge ensina três respirações simples, uma para cada situação: a de repouso, a de esforço e a de pânico. Você as treina na estrada até que o corpo as faça sozinho. Não resolve, mas tira o pânico do caminho, e o pânico era o pior da dificuldade.', fx: { xp: 6, stats: { dao: 1 }, setFlags: ['fol_tres_respiracoes'] } } },
    ],
    murim_duelo_ponte: [
      { p: 'A', text: 'Propor ao espadachim um duelo curto, de três golpes, para decidir sem esgotar nenhum dos dois', cond: F, res: { text: 'O espadachim, surpreso, aceita. Em três golpes, a vitória é sua por um fio. Ele tira a máscara, ainda ofegante, e confessa que sua lesão antiga também o obriga a evitar duelos longos. Os dois se sentam na ponte, de costas para os espectadores, e conversam um bom tempo.', fx: { fama: 2, karma: 1, setFlags: ['fol_duelo_curto'] } } },
    ],
  },
};
