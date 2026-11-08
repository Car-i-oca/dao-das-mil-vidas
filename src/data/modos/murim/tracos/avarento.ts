import type { ConjuntoTraco } from './tipos';

/**
 * Defeito: Apego ao dinheiro (avarento). Conceito: é difícil abrir mão de uma moeda, mesmo quando convém; o bolso fecha antes da mão.
 * Força opções: só quem tem o defeito vê as saídas de quem tenta pagar menos ou guardar mais. Cicatriz: a moeda guardada que custou um laço.
 * Redenção: ava_a_bolsa_aberta, a escolha difícil de gastar o que guardou, sem contar, por alguém que não pode pagar de volta (fx.superar).
 * Cenas: ava_a_moeda_do_cesto (infância) -> ava_o_preco_do_mestre (juventude) -> ava_a_bolsa_aberta (maturidade) -> ava_o_cofre_cheio (velhice).
 */
const F = { flaw: ['avarento'] };

export const AVARENTO: ConjuntoTraco = {
  eventos: [
    {
      id: 'ava_a_moeda_do_cesto', title: 'A moeda do cesto', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 7, ageMax: 14 },
      text: 'Sua avó lhe deu uma moeda de cobre para comprar bolinhos de feijão na feira. No caminho, um menino da sua idade, magro e descalço, está sentado na calçada com um cesto vazio. Ele não pede nada. Apenas olha para a sua moeda, e depois para o bolinho que você ainda nem comprou. Você aperta a moeda. Ela é sua. A avó disse.',
      choices: [
        { p: 'C', text: 'Dividir a moeda em duas partes e comprar um bolinho para cada um', res: { text: 'O dono da banca corta o bolinho ao meio com um olhar de cumplicidade. Os dois comem sentados na calçada, sem falar. Quando terminam, o menino vai embora e você fica com uma sensação nova: a de ter perdido metade de um bolinho e ganhado o resto do dia.', fx: { pedras: -1, karma: 2, stats: { car: 1 }, setFlags: ['ava_dividiu_a_moeda'] } } },
        { p: 'G', text: 'Guardar a moeda, comprar o bolinho inteiro e comê-lo longe dos olhos do menino', res: { text: 'O bolinho é quente e saboroso, e a lembrança do menino também. Você come devagar, escondido atrás de um barril, e sente o gosto virar cinza no meio. Nada acontece a ninguém, mas a moeda, que era sua, ficou menor do que as outras, de alguma forma.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['ava_comeu_escondido'] } } },
        { p: 'T', text: 'Guardar a moeda para um dia que precise, e voltar para casa sem comprar nada', res: { text: 'A avó pergunta pelo bolinho e você mostra a moeda intacta. Ela ri, sem entender, mas guarda a moeda no cofre da casa e anota seu nome. Anos depois, aquela moeda, e todas as que vieram depois, será a base de uma pequena fortuna e de um medo grande de perdê-la.', fx: { pedras: 1, stats: { dao: 1 }, setFlags: ['ava_guardou_a_moeda'] } } },
      ],
    },
    {
      id: 'ava_o_preco_do_mestre', title: 'O preço do mestre', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 16, ageMax: 34 },
      text: 'Um mestre errante de passagem oferece ensinar a você uma técnica rara em troca de trinta moedas, quase tudo que você guardou. A técnica é real, o mestre é honesto, e a oferta é única: ele parte ao amanhecer. Cada moeda que sai do seu bolso, você sente na espinha. A técnica pode mudar sua vida, ou ser só mais uma promessa.',
      choices: [
        { p: 'D', text: 'Pagar as trinta moedas, sem barganha, e aprender a técnica', res: { text: 'O mestre conta as moedas, assente e ensina durante a noite inteira. Ao amanhecer, parte, e você fica com a técnica e o bolso vazio. Pela primeira vez, o dinheiro parece ter ido para um lugar que o mereceu. O hábito de contar, porém, continua.', fx: { pedras: -30, xp: 12, stats: { comp: 2, dao: 1 }, setFlags: ['ava_pagou_o_mestre'] } } },
        { p: 'G A', text: 'Barganhar até o mestre aceitar vinte moedas e uma lição pela metade', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O mestre ri, aceita, e ensina a metade da técnica. A outra metade vem da prática, e você descobre sozinho o que faltava. A economia é real e o aprendizado, completo. Mas o mestre, ao partir, murmura que a técnica pela metade tem um preço que não aparece na bolsa.', fx: { pedras: -20, xp: 8, stats: { comp: 1 }, setFlags: ['ava_barganhou'] } }, fail: { text: 'O mestre percebe a barganha e retira a oferta com um gesto seco. Vai embora sem olhar, e você fica com as trinta moedas e a técnica que nunca terá. Sai da estalagem apertando a bolsa, com a sensação de ter ganho e perdido ao mesmo tempo.', fx: { pedras: 0, stats: { dao: 1 }, setFlags: ['ava_perdeu_o_mestre'] } } },
        { p: 'T', text: 'Recusar a oferta, com a desculpa de que a técnica não vale tanto', res: { text: 'O mestre parte, e a técnica com ele. A bolsa permanece cheia, e você a abre algumas vezes ao longo dos anos para ver se a dúvida dói menos. Dói igual. Anos depois, descobre que o mestre fundou uma escola famosa, e a técnica, sem você, ficou conhecida.', fx: { pedras: 0, stats: { dao: 1 }, setFlags: ['ava_perdeu_o_mestre'] } } },
      ],
    },
    {
      id: 'ava_a_bolsa_aberta', title: 'A dívida de quem não podia pagar', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 28, ageMax: 58 },
      text: 'Uma viúva, antiga conhecida, bate à sua porta com uma criança doente nos braços. O remédio de que precisa custa tudo que ela tem, e mais. Ela não pede um empréstimo: sabe que não poderá pagar. Apenas diz, sem erguer a voz, que você é o único na vila que tem o que falta. Sua bolsa está atrás da porta. O silêncio entre vocês dura um instante muito longo.',
      choices: [
        { p: 'C O', text: 'Abrir a bolsa, dar o necessário para o remédio e não anotar a dívida', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'As moedas saem da bolsa em silêncio, uma por uma, e você não as conta. A criança se cura em duas semanas, e a viúva volta, com um bolo e uma lágrima. Você aceita o bolo e recusa o resto. Pela primeira vez, o dinheiro foi gasto sem arrependimento, e a bolsa, mais leve, deixou o peito mais leve também.', fx: { pedras: -80, fama: 3, karma: 5, stats: { dao: 3, car: 1 }, superar: true, setFlags: ['ava_bolsa_aberta', 'ava_nao_anotou'] } }, fail: { text: 'Você abre a bolsa, mas a mão treme, e as moedas saem contadas, com um suspiro. A viúva percebe, agradece com a cabeça baixa e jura pagar. O remédio é comprado, a criança vive, mas a gratidão da viúva é fria, e o seu gesto, apesar de real, ficou pequeno diante do que poderia ter sido.', fx: { pedras: -60, karma: 2, stats: { dao: 1 }, setFlags: ['ava_deu_contando'] } } },
        { p: 'G', text: 'Oferecer um empréstimo com juros baixos e prazo longo, anotando tudo no caderno', res: { text: 'A viúva aceita, calada. A criança é salva, e o caderno ganha uma linha nova. Anos depois, a viúva paga cada moeda, com juros, e nunca mais cumprimenta você na rua. A dívida foi quitada; a gratidão, nunca emitida.', fx: { pedras: -50, karma: -1, setFlags: ['ava_emprestou_com_juros'] } } },
        { p: 'A T', text: 'Levar a viúva ao boticário e negociar o preço do remédio em nome dela, pagando só a diferença', res: { text: 'O boticário, surpreso com a insistência, baixa o preço pela metade. Você paga o resto e anota, em silêncio, um favor devido. A criança se cura, a viúva agradece, e você descobre que dar de forma esperta é uma forma de dar, embora uma que ainda pergunta pelo preço.', fx: { pedras: -35, fama: 1, karma: 2, stats: { car: 1 }, setFlags: ['ava_negociou_o_remedio'] } } },
      ],
    },
    {
      id: 'ava_o_cofre_cheio', title: 'O cofre e a mesa vazia', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...F, ageMin: 55 },
      text: 'Numa noite de inverno, você abre o cofre da casa para contar as moedas, como faz toda semana, e percebe o eco do lugar. O cofre está cheio, mas a casa está vazia. Os sobrinhos, que antes visitavam, já não vêm. Os vizinhos, que antes pediam, aprenderam a não pedir. Na mesa, há um prato só. Você olha as moedas e elas olham de volta, frias e silenciosas.',
      choices: [
        { p: 'C O', text: 'Reunir a família e os vizinhos numa ceia, pagando tudo sem contar, e distribuir parte do cofre', cond: { ...F, flagsAny: ['ava_bolsa_aberta', 'ava_dividiu_a_moeda', 'ava_pagou_o_mestre', 'ava_nao_anotou', 'ava_negociou_o_remedio'] }, res: { text: 'A ceia dura até de madrugada. As moedas distribuídas voltam em forma de risos, e uma sobrinha lhe segura a mão sem dizer nada. Quando a noite acaba, o cofre ainda tem mais do que o necessário, mas a mesa, pela primeira vez, tem lugar para todos.', fx: { pedras: -100, fama: 4, karma: 5, stats: { dao: 2, car: 2 }, setFlags: ['ava_fim_ok', 'ava_ceia_aberta'] } } },
        { p: 'D', text: 'Guardar o cofre fechado, mas escrever em testamento que ele será dividido entre os sobrinhos', res: { text: 'O testamento é redigido com letra firme, e o cofre continua cheio até o dia final. Os sobrinhos, ao receberem a herança, lembram do tio com um sentimento ambíguo: a generosidade que veio tarde ainda é generosidade, mas ainda tem o gosto do cofre.', fx: { karma: 1, stats: { dao: 1 }, setFlags: ['ava_fim_ok'] } } },
        { p: 'T', text: 'Fechar o cofre, apagar a luz e voltar a contar as moedas na semana seguinte', res: { text: 'A semana passa, depois o mês, e o hábito se repete. O cofre fica mais cheio e a casa, mais calada. Você não é infeliz, no sentido simples, só dono de uma riqueza que ninguém vê, nem você mesmo, e que se desfaz no escuro quando a mão para de contar.', fx: { stats: { dao: 1 }, setFlags: ['ava_fim_ok'] } } },
      ],
    },
  ],
  opcoes: {
    murim_mercado: [
      { p: 'G', text: 'Pechinchar o reparo do equipamento até Noh aceitar metade do preço e um café', cond: F, res: { text: 'Noh, cansado, cede, mas lembra a você, enquanto embrulha a bainha, que o preço pago é o preço que o objeto merece. A bainha dura três anos; a lembrança da frase, a vida inteira. Você paga metade e guarda a metade da vergonha.', fx: { pedras: 3, karma: -1, setFlags: ['ava_pechinchou_noh'] } } },
    ],
    murim_torneio: [
      { p: 'G A', text: 'Vender informações sobre os juízes a um patrocinador por um bom preço', cond: F, res: { text: 'O patrocinador paga bem, e você sai com a bolsa cheia. Gwon Tae-seok, informado, passa a olhá-lo como quem anota um preço. O dinheiro entra, e a reputação sai discretamente, sem que ninguém precise anunciá-lo.', fx: { pedras: 60, fama: -1, karma: -2, setFlags: ['ava_vendeu_informacao'] } } },
    ],
    murim_refugiados: [
      { p: 'G', text: 'Oferecer à família o preço justo por um lugar na carroça, em vez de ajudar de graça', cond: F, res: { text: 'A família aceita, constrangida, e paga com o pouco que tem. A carroça avança, mas o clima dentro dela é de gente que paga e gente que cobra. A menina do estandarte não olha para você, e você sente uma pontada no lugar onde deveria haver orgulho.', fx: { pedras: 8, karma: -2, setFlags: ['ava_cobrou_refugiados'] } } },
    ],
    murim_inverno: [
      { p: 'G A', text: 'Abrir o depósito da escola apenas para quem pagar o dobro, e distribuir o lucro depois', cond: F, res: { text: 'Os viajantes pagam, resmungando, e a vila atravessa a nevasca. Parte do lucro vai ao templo, a outra parte ao seu bolso. Ninguém o chama de herói e ninguém o chama de ladrão. Você aprende que há um meio-termo moral que não satisfaz ninguém, nem você.', fx: { pedras: 70, karma: -1, fama: 1, setFlags: ['ava_cobrou_no_inverno'] } } },
    ],
    murim_festival: [
      { p: 'G', text: 'Pagar a taxa do oficial com moedas contadas e pedir o recibo, como se fosse um negócio', cond: F, res: { text: 'O oficial, surpreso, passa o recibo e murmura que raramente vê alguém tão exato. Você atravessa a praça de mãos vazias e recibo na manga. A lanterna que acende, depois, parece mais cara do que as outras.', fx: { pedras: -3, setFlags: ['ava_recibo_da_taxa'] } } },
    ],
    murim_ponte_reparo: [
      { p: 'G', text: 'Financiar os materiais da ponte em troca de uma cota perpétua das taxas de passagem', cond: F, res: { text: 'A vila aceita, a ponte é refeita, e a taxa passa a render todo mês. Anos depois, o rio leva a ponte de novo, e a vila lembra de quem cobra por atravessar. A cota continua no contrato, mas a gratidão, essa, não estava prevista.', fx: { pedras: 40, fama: -1, karma: -2, setFlags: ['ava_cota_da_ponte'] } } },
    ],
  },
};
