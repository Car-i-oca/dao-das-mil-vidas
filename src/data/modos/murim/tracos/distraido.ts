import type { ConjuntoTraco } from './tipos';

/**
 * Defeito: Atenção dispersa (distraido). Conceito: estudar e manter a guarda ao mesmo tempo é difícil; a mente voa para o que está fora.
 * Força opções: só quem tem o defeito vê as saídas de quem precisa de âncoras para ficar presente. Cicatriz: o detalhe que escapou na hora errada.
 * Redenção: dis2_o_detalhe_que_salvou, a escolha difícil de criar um ritual de atenção e mantê-lo (fx.superar).
 * Cenas: dsp_o_pote_derramado (infância) -> dsp_a_vigia_perdida (juventude) -> dsp_o_detalhe_que_salvou (maturidade) -> dsp_a_nuvem_que_ficou (velhice).
 */
const F = { flaw: ['distraido'] };

export const DISTRAIDO: ConjuntoTraco = {
  eventos: [
    {
      id: 'dsp_o_pote_derramado', title: 'O pote e a borboleta', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 7, ageMax: 14 },
      text: 'Sua tia pediu que você carregasse um pote de mel da despensa até a mesa, com cuidado, passo a passo. No meio do corredor, uma borboleta amarela entra pela janela e pousa no batente. Você olha por um instante. Quando volta os olhos, o pote está no chão, o mel escorrendo pelo assoalho, e sua tia, na porta, de braços cruzados, esperando uma explicação que você não tem.',
      choices: [
        { p: 'C', text: 'Assumir o erro, pedir um pano e limpar tudo sem uma palavra a mais', res: { text: 'A tia suspira, entrega o pano e fica olhando você esfregar. Quando termina, ela sorri de lado e diz que, do mel perdido, restou a coisa mais rara: uma criança que não inventa desculpas. Você guarda a frase, e a vergonha vira, aos poucos, respeito por si mesmo.', fx: { karma: 2, stats: { dao: 1 }, setFlags: ['dsp_limpou_o_mel'] } } },
        { p: 'A', text: 'Dizer que a borboleta fez o pote cair, apontando para o inseto como cúmplice', res: { text: 'A tia olha a borboleta, olha você, e ri baixinho. Mas diz que o pote caiu porque você o largou, e a borboleta só estava de passagem. A desculpa, que parecia esperta, ensina a primeira lição: a atenção não é culpa do mundo, é tarefa de quem a perde.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['dsp_culpou_a_borboleta'] } } },
        { p: 'D', text: 'Pedir à tia um modo de lembrar de olhar o pote enquanto o carrega', res: { text: 'A tia pensa e sugere uma regra simples: contar os passos em voz baixa. Você tenta, e o corredor, até então uma terra de distrações, vira uma contagem de dezoito. O pote chega inteiro. O truque funciona, e a atenção, descobre, pode ser uma corda onde se amarra a mente.', fx: { xp: 4, stats: { comp: 1, dao: 1 }, setFlags: ['dsp_contou_os_passos'] } } },
      ],
    },
    {
      id: 'dsp_a_vigia_perdida', title: 'A vigia que cochilou de olhos abertos', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 16, ageMax: 34 },
      text: 'Na escola, você assume a vigia da noite no portão, com a tarefa simples de avisar se alguém se aproximar. Perto da meia-noite, você começa a pensar numa forma que o mestre mostrou de manhã, e a forma ocupa a mente inteira. Quando volta a si, uma sombra já atravessou o pátio. Era só um gato. Poderia ter sido outra coisa.',
      choices: [
        { p: 'C T', text: 'Contar ao mestre pela manhã o que aconteceu e pedir para ser substituído na vigia', res: { text: 'O mestre ouve, grave, e agradece a honestidade. Você é transferido para a biblioteca, onde a mente pode vagar sem risco. A lição é amarga e útil: há tarefas que não combinam com a sua cabeça, e confessar isso é a única forma de não colocar outros em perigo.', fx: { karma: 2, stats: { dao: 1 }, setFlags: ['dsp_pediu_troca'] } } },
        { p: 'D', text: 'Criar um ritual para a vigia: três voltas pelo pátio a cada hora, contando as estrelas', check: { stat: ['dao', 'esp'], dif: 0 }, ok: { text: 'O ritual funciona. A mente tem onde se ocupar sem fugir. Nas noites seguintes, você vigia com atenção estranhamente aguda, e o mestre o elogia. Foi você que descobriu um jeito próprio de estar presente, e esse jeito vale mais do que qualquer virtude emprestada.', fx: { fama: 2, stats: { esp: 1, dao: 1 }, setFlags: ['dsp_ritual_de_vigia'] } }, fail: { text: 'O ritual dura três noites; na quarta, a mente já voou de novo. Dessa vez, é um colega que percebe e o acorda. Nada de grave acontece, mas a segunda falha pesa mais que a primeira, e você passa a se desconfiar um pouco.', fx: { stats: { dao: 1 }, setFlags: ['dsp_ritual_falhou'] } } },
        { p: 'A', text: 'Esconder o lapso e seguir a vigia, torcendo para que não aconteça de novo', res: { text: 'Nada acontece. Na semana seguinte, no mesmo posto, um ladrão de galinhas escapa por sua negligência, e o mestre, ao descobrir, pergunta quem estava de turno. O silêncio que parecia proteção vira testemunha. A humilhação é pública e inteira.', fx: { fama: -2, karma: -1, stats: { dao: 1 }, setFlags: ['dsp_escondeu_o_lapso'] } } },
      ],
    },
    {
      id: 'dsp_o_detalhe_que_salvou', title: 'A marca no chão', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 26, ageMax: 55 },
      text: 'Você leva uma caravana por uma passagem de montanha. O guia é novo, os viajantes, apressados. Quando todos descansam ao meio-dia, sua mente se afasta, como sempre, para o desenho de uma nuvem. Ao voltar, algo no chão prende seu olhar: uma marca de roda, fresca, saindo do caminho e entrando num atalho que o mapa não mostra. Uma emboscada seria o próximo passo lógico.',
      choices: [
        { p: 'A T', text: 'Parar a caravana, examinar a marca com calma e mudar o trajeto por precaução', check: { stat: ['esp', 'dao'], dif: 1 }, ok: { text: 'O atalho dá numa clareira onde três homens esperavam. A caravana, desviada, passa em segurança. O guia o olha com respeito. A atenção que sempre foi sua fraqueza, naquele instante, foi uma lente: o que a mente vagueia, o olhar capta, e um olhar solto às vezes vê mais do que um olhar preso.', fx: { fama: 4, karma: 3, pedras: 40, stats: { esp: 2, dao: 1 }, superar: true, setFlags: ['dsp_marca_vista', 'dsp_atencia_propria'] } }, fail: { text: 'Você nota a marca, mas hesita demais. A caravana entra no atalho antes de você decidir. A emboscada é real, mas pequena; um viajante é ferido, e a carga é saqueada pela metade. Você vê a marca, a tempo e tarde demais. A dispersão não foi a culpada; foi a dúvida em agir.', fx: { fama: -1, karma: 1, ferida: 1, stats: { dao: 1 }, setFlags: ['dsp_marca_vista'] } } },
        { p: 'C', text: 'Chamar o guia e perguntar a ele o que ele acha, em vez de decidir sozinho', res: { text: 'O guia, honrado pela pergunta, estuda a marca e concorda: é suspeito. Juntos, mudam o trajeto. A caravana chega em segurança. Você aprende uma forma de usar a dispersão: perceber, perguntar, dividir. A distração vira ponto de partida, e não de queda.', fx: { fama: 2, karma: 2, stats: { car: 1, esp: 1 }, setFlags: ['dsp_marca_vista', 'dsp_perguntou_ao_guia'] } } },
        { p: 'M', text: 'Ignorar a marca e seguir o plano, confiando que a mente voltou no tempo certo', res: { text: 'A caravana entra no desfiladeiro, e a emboscada se fecha. Dois viajantes se ferem e um cavalo morre. A carga é salva por um acaso de última hora. A marca estava lá, visível. A mente a viu e a deixou passar, e o remorso desce lento, um pouco a cada dia, até o fim do mês.', fx: { fama: -3, karma: -2, ferida: 1, stats: { dao: 1 }, setFlags: ['dsp_ignorou_a_marca'] } } },
      ],
    },
    {
      id: 'dsp_a_nuvem_que_ficou', title: 'A nuvem que ninguém mais viu', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...F, ageMin: 52 },
      text: 'Sentado na varanda, você observa uma nuvem comprida e fina atravessar o céu, e, pela primeira vez em décadas, a mente não quer ir a outro lugar. A atenção permanece, inteira, naquela nuvem, naquele instante. Seu neto, ao lado, pergunta no que o avô pensa. Você responde que não pensa em nada: apenas olha. O menino acha estranho, depois imita. Ficam os dois em silêncio.',
      choices: [
        { p: 'C O', text: 'Ensinar ao menino que olhar sem pensar é um ofício, e que ele pode ser mais forte que a atenção forçada', cond: { ...F, flagsAny: ['dsp_atencia_propria', 'dsp_ritual_de_vigia', 'dsp_contou_os_passos', 'dsp_marca_vista', 'dsp_perguntou_ao_guia'] }, res: { text: 'O menino passa semanas observando o céu e as formigas, em silêncio. Seu pai se preocupa; você diz que não é preguiça, é atenção de outro tipo. Anos depois, o neto se torna rastreador, e quando perguntam de onde veio o dom, ele diz apenas: da varanda do avô.', fx: { fama: 3, karma: 4, stats: { dao: 2, esp: 1 }, setFlags: ['dsp_fim_ok', 'dsp_olhar_herdado'] } } },
        { p: 'D', text: 'Ficar em silêncio com o menino até o fim da tarde, aproveitando a atenção que veio sem ser chamada', res: { text: 'Os dois ficam ali até o sol baixar. Ninguém fala. Quando a noite chega, o menino adormece no seu colo, e você segue olhando a nuvem até ela se desfazer. A atenção, que a vida inteira escapou, ficou, por um instante, inteira.', fx: { karma: 2, stats: { dao: 2 }, setFlags: ['dsp_fim_ok'] } } },
        { p: 'T', text: 'Pedir ao menino que traga um caderno, para anotar o que vê antes que a mente vá embora', res: { text: 'O menino volta com o caderno e você descreve a nuvem, devagar. Ele escreve com a letra torta. No fim, a página guarda uma tarde que, de outro modo, teria escapado. O caderno é a primeira coisa que o menino herda, e a única que pediu para guardar.', fx: { karma: 1, stats: { comp: 1 }, setFlags: ['dsp_fim_ok'] } } },
      ],
    },
  ],
  opcoes: {
    murim_escola: [
      { p: 'T D', text: 'Pedir uma escola onde os treinos sejam curtos e variados, e não longos e monótonos', cond: F, res: { text: 'O mestre aceita, desconfiado. As sessões de vinte minutos se alternam entre forma, equilíbrio e leitura, e a mente, que antes fugia, passa a acompanhar. Em um ano, você supera colegas que treinaram o dobro, e o mestre anota o método para outros alunos como você.', fx: { xp: 6, stats: { comp: 1 }, setFlags: ['dsp_escola_variada'] } } },
    ],
    murim_mestra: [
      { p: 'D', text: 'Pedir à mestra que lhe dê uma tarefa simples e repetida, para a mente se firmar enquanto o corpo treina', cond: F, res: { text: 'A mestra lhe entrega duas pedras e pede que as vá trocando de mão, devagar, durante o treino. A mente, ocupada com a troca, deixa o corpo livre. Em um mês, o passo sai limpo, e a mestra diz que algumas pessoas precisam de um segundo ponto de apoio para chegar ao primeiro.', fx: { xp: 6, stats: { comp: 1, dao: 1 }, setFlags: ['dsp_duas_pedras'] } } },
    ],
    murim_armazem: [
      { p: 'T A', text: 'Pedir a um amigo atento que vá junto, para olhar os cantos enquanto você olha os papéis', cond: F, res: { text: 'O amigo vigia o corredor, você revisa os registros. Entre os dois, nada escapa: ele vê o guarda voltando, você vê a lista. A parceria, nascida da sua limitação, rende uma noite perfeita. Ninguém jamais saberá quanto dela dependeu de uma fraqueza admitida.', fx: { fama: 2, karma: 1, stats: { esp: 1 }, setFlags: ['dsp_dupla_no_armazem'] } } },
    ],
    murim_arquivo: [
      { p: 'T', text: 'Salvar o rolo que a mestra apontar e pedir a um colega que anote tudo que você esquecer', cond: F, res: { text: 'O colega anota, e entre os dois nenhum detalhe se perde. A mestra Im Seol, comovida, nota o cuidado e diz que o arquivo nunca esteve tão bem guardado. Você aprende que a memória de dois vale mais que a memória inteira de um.', fx: { fama: 1, karma: 1, setFlags: ['dsp_arquivo_a_dois'] } } },
    ],
    murim_mercado: [
      { p: 'A T', text: 'Anotar numa tabuleta o que precisa comprar, antes de ver as bancas, para não esquecer no caminho', cond: F, res: { text: 'Noh, ao ver a tabuleta, ri e lhe oferece uma maior. Você sai da feira com tudo que precisava e nada que não precisava, um feito raro. Pela primeira vez, a distração perde uma disputa, e você a perde com gosto.', fx: { stats: { comp: 1 }, setFlags: ['dsp_tabuleta_de_noh'] } } },
    ],
    murim_dilema: [
      { p: 'T', text: 'Pedir que cada um repita sua versão duas vezes, pois da primeira você sempre perde um detalhe', cond: F, res: { text: 'Os dois, impacientes, repetem. Na segunda vez, um detalhe diferente aparece: o espadachim troca o nome do mestre por outro. É o fio que desfaz a acusação. O que parecia limitação revelou o que a escuta única teria deixado passar.', fx: { fama: 2, karma: 1, stats: { esp: 1 }, setFlags: ['dsp_segunda_versao'] } } },
    ],
  },
};
