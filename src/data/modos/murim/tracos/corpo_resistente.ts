import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Constituição vigorosa (corpo_resistente). Conceito: o corpo aguenta o que os outros não aguentam, e por isso todos
 * passam a contar com ele. A cicatriz: quem nunca cede acaba sendo o último a ter permissão para descansar.
 * Cenas: cor_carga (infância) -> cor_febre_da_escola (juventude) -> cor_ponte_inundada (maturidade) -> cor_joelhos (velhice).
 */
const T = { talent: ['corpo_resistente'] };

export const CORPO_RESISTENTE: ConjuntoTraco = {
  eventos: [
    {
      id: 'cor_carga', title: 'O saco que não era seu', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'No cais, quatro carregadores adultos reclamam do peso de um saco de arroz que precisa chegar ao celeiro antes do aguaceiro. Você, de doze anos, o ergue sem pensar e já está na metade do cais quando percebe que todos pararam de falar. O capataz pergunta quanto você cobra.',
      choices: [
        { p: 'M G', text: 'Cobrar o mesmo que um adulto e carregar o resto do dia', res: { text: 'Ao entardecer, você leva para casa a primeira soma que já ganhou sozinho e as costas em brasa. O capataz passa a chamá-lo toda manhã. A vantagem do corpo dura exatamente enquanto você aceita o trabalho, e isso você só entende anos depois.', fx: { pedras: 12, stats: { fis: 1 }, setFlags: ['cor_carregador'] } } },
        { p: 'C', text: 'Carregar o saco e deixar que os adultos fiquem com o pagamento', res: { text: 'Os homens, sem jeito, dividem a moeda e lhe compram um bolinho de feijão. No dia seguinte um deles aparece com um pano de sua casa para enrolar nos seus ombros. Você aprende que há força que se paga em favor, e que favor também pesa.', fx: { karma: 2, stats: { fis: 1, car: 1 }, setFlags: ['cor_amigo_cais'] } } },
        { p: 'T', text: 'Largar o saco, dizer que foi sorte e sair antes que alguém repare', res: { text: 'O capataz não insiste. Mas o carregador mais velho, que viu, comenta com a sua mãe, e ela passa a observá-lo à mesa como quem vigia uma panela nova. Esconder a força é possível; esconder que se esconde, não.', fx: { stats: { dao: 1 }, setFlags: ['cor_forca_escondida'] } } },
      ],
    },
    {
      id: 'cor_febre_da_escola', title: 'A semana da febre', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'Uma febre de inverno derruba quase toda a escola. Os mestres estão de cama, os mais novos delirando, e você, de pé, é o único com forças para carregar água, fazer o caldo e trocar panos. Ao quarto dia, ainda de pé, percebe que ninguém perguntou se você também precisa dormir.',
      choices: [
        { p: 'C D', text: 'Cuidar de todos até a febre passar, dormindo em pé quando o corpo deixar', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'No oitavo dia a febre cede, e os discípulos acordam famintos e vivos. Você cai num sono de quase dois dias. A escola passa a contar a semana da febre como lenda, e a você como quem a atravessou, o que lhe rende gratidão e um hábito perigoso: o de ser indispensável.', fx: { fama: 3, karma: 3, stats: { fis: 1, dao: 1 }, setFlags: ['cor_semana_febre'] } }, fail: { text: 'No sexto dia seus joelhos dobram na cozinha e é um aprendiz de dez anos que o arrasta até a esteira. Os outros se recuperam, mas você demora um mês para voltar a ser o que era. Descobre que a resistência tem fundo, e que o fundo é traiçoeiro.', fx: { fama: 1, karma: 1, vida: -2, stats: { fis: -1 }, setFlags: ['cor_cansaco_grande'] } } },
        { p: 'T', text: 'Revezar com os poucos que estão de pé e obrigar a si mesmo a dormir seis horas', res: { text: 'Uma discípula protesta que o senhor está se poupando enquanto os outros sofrem. Você responde que um corpo que cai não carrega ninguém. A febre dura um dia a mais do que poderia, mas ninguém morre, e a escola passa a enxergar o descanso como parte do dever.', fx: { karma: 1, stats: { dao: 2 }, setFlags: ['cor_descanso_aprendido'] } } },
        { p: 'A', text: 'Organizar quem ainda tem forças em turnos e usar o seu corpo só para o que ninguém mais pode', res: { text: 'A cozinha ganha uma ordem que nunca teve. Você se reserva as noites pesadas e entrega o resto a colegas que se sentem úteis pela primeira vez. A escola sobrevive com uma morte a menos do que o previsto, e um mestre sussurra que o senhor tem cabeça de capitão.', fx: { fama: 2, karma: 2, stats: { car: 1 }, setFlags: ['cor_semana_febre', 'cor_descanso_aprendido'] } } },
      ],
    },
    {
      id: 'cor_ponte_inundada', title: 'Quem segura a viga', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 26, ageMax: 55 },
      text: 'A cheia rasga a ponte de Pedra Baixa ao meio. Uma viga mestra ainda sustenta metade do tabuleiro, e vinte pessoas estão do outro lado, de pé na parte que se inclina. Os homens da vila têm cordas, mas faltam braços. Todos olham para você e ninguém diz nada, o que é pior do que um pedido.',
      choices: [
        { p: 'C D', text: 'Segurar a viga com o corpo até a última pessoa atravessar', check: { stat: ['fis', 'dao'], dif: 2 }, ok: { text: 'Vinte pessoas passam por baixo do seu braço, uma a uma, e a viga estala sem cair. Quando o último atravessa, você escorre para o chão com as palmas em carne viva. Ninguém esquece essa tarde. Você, menos que todos, porque sabe quanto custou.', fx: { fama: 5, karma: 4, ferida: 1, stats: { fis: 1, dao: 1 }, setFlags: ['cor_viga_segura'] } }, fail: { text: 'A viga cede antes do penúltimo atravessar. Você consegue arrastar duas pessoas para a margem, mas a água leva outras três. A vila agradece e chora, e você jamais será convencido de que o corpo que carregou os outros também podia ter carregado esses.', fx: { fama: 2, karma: 2, ferida: 2, stats: { fis: -1, dao: 1 }, setFlags: ['cor_viga_cedeu'] } } },
        { p: 'A', text: 'Gritar para formarem uma corrente humana e usar o seu peso como âncora, em vez de ser a viga', res: { text: 'Você prende as cordas ao próprio cinto e se agarra ao poste. A corrente humana passa mão a mão, e todos atravessam, trêmulos, sem que você precise ser mártir de ninguém. A vila fala menos de você depois, e mais do que fizeram juntos, e é assim que você prefere.', fx: { fama: 3, karma: 3, stats: { fis: 1, car: 1 }, setFlags: ['cor_ponte_dividida'] } } },
        { p: 'T', text: 'Pedir às pessoas que esperem a cheia baixar, mesmo com o tabuleiro inclinado', res: { text: 'É a opção mais sensata e a mais difícil de defender. O tabuleiro aguenta mais uma hora do que parecia, e a água baixa o suficiente para uma barca chegar. Duas pessoas se ferem no pânico. Ninguém morre. Alguns jamais o perdoarão por não ter feito o gesto que cabia à sua força.', fx: { fama: 1, karma: 2, stats: { dao: 2 }, setFlags: ['cor_ponte_dividida'] } } },
      ],
    },
    {
      id: 'cor_joelhos', title: 'O primeiro dia em que o corpo disse não', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 52 },
      text: 'Numa manhã comum, você se levanta e o joelho esquerdo não obedece. Não dói; apenas recusa. É a primeira vez em seis décadas que o corpo lhe diz não. Do outro lado da casa, os que sempre contaram com você esperam o que sempre esperaram: que você carregue o dia.',
      choices: [
        { p: 'C', text: 'Aceitar a bengala e pedir ajuda pela primeira vez na vida', res: { text: 'A casa inteira se mexe. Um sobrinho assume as cargas, uma vizinha traz o caldo, e você descobre o que sempre negou a si mesmo: ser cuidado dá trabalho a quem cuida, e eles gostam. Aprende a sentar numa varanda e a ver outros fazendo o que era seu.', fx: { karma: 3, stats: { dao: 2, car: 1 }, setFlags: ['cor_pediu_ajuda', 'cor_resistente'] } } },
        { p: 'D', text: 'Fingir que nada aconteceu e carregar o dia mesmo assim, devagar', check: { stat: ['fis', 'dao'], dif: 0 }, ok: { text: 'O joelho cumpre o dia e o próximo, e o outro, com um arrasto discreto que ninguém ousa mencionar. Você morre de pé, como queria, e a casa jamais saberá quantas vezes a dor o fez desistir em silêncio. O corpo não foi vencido, só atrasado.', fx: { fama: 2, stats: { fis: 1 }, vida: -3, setFlags: ['cor_resistente'] } }, fail: { text: 'O joelho trava na escada com o saco de arroz nos braços. Você cai, sem ferida grave, e os que correm a ajudar encontram um velho de olhos secos, humilhado por dentro. Passa a andar de bengala, resmungando que sempre soube que a tinha, só nunca quis ver.', fx: { karma: 1, vida: -1, setFlags: ['cor_pediu_ajuda'] } } },
        { p: 'O', text: 'Entregar a um jovem a carga que sempre foi sua, e ensinar a ele onde dói', cond: { ...T, flagsAny: ['cor_amigo_cais', 'cor_ponte_dividida', 'cor_semana_febre', 'cor_viga_segura', 'cor_descanso_aprendido'] }, res: { text: 'O jovem começa desajeitado e logo carrega melhor que você. Você lhe conta o que ninguém lhe contou: que a força é emprestada, que o corpo cobra a conta, que dizer não é uma parte do ofício. Ele ouve e, anos depois, é o primeiro da vila a se recusar a carregar além do que deve.', fx: { fama: 3, karma: 3, stats: { dao: 2 }, setFlags: ['cor_resistente', 'cor_herdeiro_forca'] } } },
      ],
    },
  ],
  opcoes: {
    murim_dia_comum: [
      { p: 'C D', text: 'Descarregar a carroça inteira sozinho, enquanto o cocheiro aprende a amarrar o resto', cond: T, res: { text: 'Quando termina, a carroça está leve, o cocheiro está pasmo e os seus braços ardem de um jeito bom. O homem insiste em lhe dar um odre de vinho de arroz e a notícia de que, na próxima vila, procuram quem aguente peso. Você decide aceitar, ou não, no dia em que lembrar.', fx: { pedras: 6, karma: 1, stats: { fis: 1 }, setFlags: ['cor_carroca'] } } },
    ],
    murim_refugiados: [
      { p: 'C', text: 'Erguer a carroça pelo eixo enquanto os outros trocam a roda', cond: T, res: { text: 'Três famílias olham, sem acreditar, o homem que segura sozinho o peso que quatro não moveriam. A roda entra no eixo, a chuva ainda está longe, e uma menina lhe oferece o estandarte queimado que carregava, como quem paga uma dívida. Você aceita e o guarda sem saber o que fazer com ele.', fx: { karma: 3, stats: { fis: 1 }, setFlags: ['cor_estandarte'] } } },
    ],
    murim_torneio: [
      { p: 'D', text: 'Aguentar todas as rodadas sem descanso e vencer pelo cansaço do adversário', cond: T, res: { text: 'Na terceira luta, os rivais respiram como foles e você ainda está de pé. A vitória é feia, longa e justa. A plateia aplaude sem entusiasmo e os juízes registram, a contragosto, que a resistência também é arte marcial. Gwon Tae-seok toma nota do seu nome.', fx: { fama: 3, stats: { fis: 1 }, setFlags: ['cor_torneio_longo'] } } },
    ],
    murim_inverno: [
      { p: 'C', text: 'Abrir caminho na neve até o templo, carregando uma criança em cada braço', cond: T, res: { text: 'Leva a noite toda. Quando a última criança é entregue às monjas, seus pés estão roxos e a vila sabe exatamente o quanto você aguenta. Alguns passam a esperar isso, e a pedir mais, e você aprende que a gratidão se mistura com a expectativa muito depressa.', fx: { fama: 3, karma: 3, ferida: 1, setFlags: ['cor_neve_criancas'] } } },
    ],
    murim_ponte_reparo: [
      { p: 'C D', text: 'Assentar a pedra caída no vão com a força dos braços, sem cordas', cond: T, res: { text: 'O mestre de obras, boquiaberto, anota que aquele vão foi fechado em uma manhã. Os trabalhadores da margem atravessam a ponte ainda úmida e gritam seu nome. Você não corrige: a pedra era sua, mas a ponte já é de todos.', fx: { fama: 3, karma: 2, setFlags: ['cor_ponte_assentada'] } } },
    ],
    murim_ataque: [
      { p: 'V T', text: 'Segurar o líder pelo ombro com uma mão e deixar que a respiração dele decida o resto', cond: T, res: { text: 'O bandido tenta se soltar, não consegue, e percebe que a mão que o prende não quer machucá-lo. Em voz baixa, ele pergunta quem é você. Os outros três recuam sem que ninguém precise ferir ninguém. O cocheiro nunca esquecerá a calma do seu braço.', fx: { fama: 2, karma: 2, stats: { fis: 1 }, setFlags: ['cor_ataque_calmo'] } } },
    ],
  },
};
