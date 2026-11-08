import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Faro para negócios (olfato_tesouro). Conceito: percebe oportunidades e riscos nas trocas antes dos outros.
 * A cicatriz: quem vê preço em tudo corre o risco de tratar pessoas como mercadoria; o dia em que algo valioso não tem cotação.
 * Cenas: olf_barraca_de_frutas (infância) -> olf_contrato_bom_demais (juventude) -> olf_sociedade_desfeita (maturidade) -> olf_o_que_nao_se_vende (velhice).
 */
const T = { talent: ['olfato_tesouro'] };

export const OLFATO_TESOURO: ConjuntoTraco = {
  eventos: [
    {
      id: 'olf_barraca_de_frutas', title: 'A troca que ninguém viu', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'Na feira, você repara que o vendedor de caquis troca seis frutas por uma moeda, enquanto na barraca ao lado dão quatro pela mesma. Se você comprar numa e vender na outra, ganha duas frutas a cada ida e volta. Ninguém percebeu. Você faz as contas de cabeça em dois segundos, e o coração acelera com algo novo: a sensação de ver um caminho aberto.',
      choices: [
        { p: 'G', text: 'Fazer a troca escondido, várias vezes, até juntar moedas', res: { text: 'Ao fim da semana, tem uma pequena bolsa que ninguém sabe de onde vem. Os dois vendedores, cada um do seu lado, passam a estranhar sua presença constante. O negócio rende, mas você aprende que lucro sem testemunhas tem um sabor de furto sem lei.', fx: { pedras: 10, stats: { sor: 1 }, setFlags: ['olf_arbitragem'] } } },
        { p: 'C', text: 'Contar ao vendedor mais caro que a vizinhança vende mais barato e deixá-lo decidir', res: { text: 'O vendedor, grato e envergonhado, baixa o preço e lhe dá uma caqui de brinde. Os dois vendedores passam a se tratar com respeito, e a feira fica um pouco menos feroz. Você ganha um amigo e uma história, e perde o lucro que podia ter tido.', fx: { karma: 2, stats: { car: 1 }, setFlags: ['olf_contou_vendedor'] } } },
        { p: 'A', text: 'Propor aos dois vendedores uma sociedade em que você compra de um e vende ao outro por uma comissão', check: { stat: ['car', 'comp'], dif: -1 }, ok: { text: 'Os vendedores, surpresos com o desembaraço de um menino, aceitam. Durante um ano, você faz de intermediário entre as duas barracas, e a feira passa a lhe chamar de «o corretor». Dinheiro nenhum compra o orgulho dessa palavra, aos dez anos.', fx: { pedras: 20, fama: 1, stats: { car: 1, comp: 1 }, setFlags: ['olf_corretor'] } }, fail: { text: 'Os vendedores riem, não acreditam no menino e o expulsam da feira. Você volta para casa de cabeça baixa, mas com a conta feita e a vontade acesa. Aprende que ver o negócio não basta, é preciso ser levado a sério.', fx: { stats: { dao: 1 }, setFlags: ['olf_arbitragem'] } } },
      ],
    },
    {
      id: 'olf_contrato_bom_demais', title: 'A proposta que cheirava a perfume', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'Um mercador de seda oferece a você um contrato de transporte generoso demais: o dobro do preço normal por levar uma caixa de Hwayang até o rio. Ele sorri, serve chá, fala sem parar. Seu faro, que raramente falha, pisca um aviso: o preço é bom porque o risco é maior do que ele diz. A caixa, entre vocês, parece mais pesada do que o tamanho.',
      choices: [
        { p: 'T', text: 'Recusar educadamente e dizer que não transporta o que não pode abrir', res: { text: 'O mercador se ofende, depois ri sem graça e leva a caixa a outro. Semanas depois, a notícia chega: a caixa carregava contrabando de sal, e o transportador foi preso. Seu faro acertou, e a ausência do dinheiro, curiosamente, nunca doeu.', fx: { fama: 1, stats: { sor: 1, dao: 1 }, setFlags: ['olf_recusou_caixa'] } } },
        { p: 'A G', text: 'Aceitar com a condição de abrir a caixa diante de testemunhas na partida', check: { stat: ['car', 'esp'], dif: 1 }, ok: { text: 'O mercador gagueja, depois cede. A caixa contém seda mesmo, mas com um fundo falso com ouro não declarado. Você se recusa a transportar, o mercador paga pelo seu silêncio, e você sai com a bolsa cheia e a consciência no lugar.', fx: { pedras: 60, fama: 2, karma: 1, setFlags: ['olf_abriu_caixa'] } }, fail: { text: 'O mercador aceita a condição, mas troca a caixa antes da abertura. Você só percebe na estrada, tarde demais. O contrato é cumprido, o dinheiro entra, e o cheiro de perfume na sua mão fica por semanas.', fx: { pedras: 30, karma: -2, setFlags: ['olf_caixa_trocada'] } } },
        { p: 'M', text: 'Aceitar sem perguntar, confiando que o seu faro saberá o momento de largar', res: { text: 'Você cumpre o contrato, mas na terceira noite um guarda de estrada para a carroça e revista a caixa. O mercador some. Você fica com o ouro que não era seu e com um interrogatório que dura dois dias. O faro avisou, e a ambição não ouviu.', fx: { pedras: 20, fama: -2, karma: -2, setFlags: ['olf_caixa_trocada'] } } },
      ],
    },
    {
      id: 'olf_sociedade_desfeita', title: 'O sócio e a balança', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 28, ageMax: 58 },
      text: 'Há dez anos você e Pak, um velho amigo, mantêm uma casa de comércio de grãos. Os negócios vão bem. Mas, fazendo as contas do ano, você percebe pequenos desvios: moedas que não chegam, pesos levemente trocados. Pak nunca roubou grande coisa, e o seu faro já viu o padrão. É dinheiro de um filho doente, uma dívida em segredo. A pergunta é o que fazer com o que se sabe.',
      choices: [
        { p: 'C', text: 'Chamar Pak em particular e oferecer ajuda com a dívida do filho', res: { text: 'Pak desaba em lágrimas, jura devolver tudo e aceita a ajuda com a cabeça baixa. A sociedade continua, mais honesta e mais frágil. Anos depois, o filho se cura e Pak lhe entrega uma balança de bronze, esculpida à mão: a mais justa que você já pesou.', fx: { karma: 4, pedras: -50, stats: { car: 1, dao: 1 }, setFlags: ['olf_pak_salvo'] } } },
        { p: 'T', text: 'Desfazer a sociedade em silêncio, dividindo o estoque em partes iguais', res: { text: 'Pak percebe e aceita sem comentar. Vocês se despedem como sócios e se afastam como amigos antigos. A amizade fica na lembrança, os grãos nas prateleiras, e as contas, tranquilas. Você aprende que uma boa saída pode ser o único gesto honesto entre dois que se conhecem bem.', fx: { stats: { dao: 1 }, setFlags: ['olf_sociedade_desfeita'] } } },
        { p: 'G', text: 'Cobrar o prejuízo com juros, diante de testemunhas, e manter o negócio só para si', res: { text: 'Pak paga, humilhado, e some da cidade. Os negócios crescem sem ele, e a casa de grãos vira a maior da região. Você nunca mais ouve de Pak, e o cheiro de arroz, às vezes, traz de volta uma balança de bronze que ele nunca lhe deu.', fx: { pedras: 140, karma: -4, fama: 1, setFlags: ['olf_cobrou_pak'] } } },
      ],
    },
    {
      id: 'olf_o_que_nao_se_vende', title: 'O que ninguém comprou', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 55 },
      text: 'Num fim de tarde, uma menina entra na sua loja e pede o preço de um pião de madeira que você guarda há quarenta anos. Foi um presente de alguém que você amou. Nunca o vendeu, nunca o avaliou, nunca o pôs na prateleira, embora o faro sempre soubesse seu valor. A menina diz que só tem duas moedas. Você olha o pião e, pela primeira vez, não consegue dar-lhe um preço.',
      choices: [
        { p: 'C O', text: 'Dar o pião à menina, sem cobrar, e contar a ela de quem foi', res: { text: 'A menina segura o pião com as duas mãos, solene, e jura cuidá-lo. Você explica o que ele significa e ela escuta como quem aprende uma língua nova. Ao sair, ela vira na porta e acena. O faro, afinal, também sabia isto: nem tudo que vale tem preço.', fx: { karma: 4, fama: 2, stats: { dao: 2, car: 1 }, setFlags: ['olf_nao_vendeu', 'olf_nao_vendeu_fim'] } } },
        { p: 'D', text: 'Dizer que não está à venda e guardar o pião de volta', res: { text: 'A menina agradece e sai sem protestar. Você deixa o pião sobre a mesa durante toda a noite. De manhã, ao acordar, percebe que o que não se vende também não se dá, e que isso era uma forma de avareza que nunca soube nomear.', fx: { stats: { dao: 1 }, setFlags: ['olf_nao_vendeu_fim'] } } },
        { p: 'A', text: 'Propor à menina uma troca: o pião por uma promessa de nunca vendê-lo a ninguém', cond: { ...T, flagsAny: ['olf_pak_salvo', 'olf_contou_vendedor', 'olf_abriu_caixa', 'olf_recusou_caixa', 'olf_corretor'] }, res: { text: 'A menina pensa muito tempo e aceita. Escreve a promessa com letra torta num pedaço de papel, e você a guarda numa gaveta. Em troca, o pião muda de dono, sem preço. Foi a transação mais bem avaliada da sua vida, e a única que não aparece em nenhum livro.', fx: { fama: 3, karma: 3, stats: { dao: 2 }, setFlags: ['olf_nao_vendeu', 'olf_nao_vendeu_fim'] } } },
      ],
    },
  ],
  opcoes: {
    murim_mercado: [
      { p: 'G A', text: 'Perguntar a Noh qual das bainhas ele vende mais caro do que vale e comprar a barata ao lado', cond: T, res: { text: 'Noh dá uma risada, tira de um canto uma bainha sem enfeite e a vende pelo preço certo. Ele nota o faro e passa a lhe oferecer, antes dos outros, os melhores achados do dia. A primeira sociedade informal da vida está feita.', fx: { pedras: 25, stats: { sor: 1 }, setFlags: ['olf_noh_achados'] } } },
    ],
    murim_torneio: [
      { p: 'G', text: 'Apostar contra o favorito depois de ver a maneira como ele manca no aquecimento', cond: T, res: { text: 'O favorito perde na segunda rodada, e a sua aposta rende o dobro do prometido. Alguns apostadores olham desconfiados, outros pedem conselho. Gwon Tae-seok, num canto, anota o seu nome num livrinho, junto com o valor ganho.', fx: { pedras: 70, fama: 1, setFlags: ['olf_aposta_torneio'] } } },
    ],
    murim_armazem: [
      { p: 'G A', text: 'Descobrir quem lucra com o armazém fechado e a quem a lista de aldeias favorece', cond: T, res: { text: 'Em dois dias, você tem o nome de um atravessador do cais velho e de um pagamento semanal ao guarda. Entrega a lista, anônima, a Baek Mu-jin. Ele lê calado, dobra o papel e agradece com um aceno. O seu faro fora usado pela primeira vez a serviço de algo maior que o lucro.', fx: { fama: 2, karma: 1, stats: { esp: 1 }, setFlags: ['olf_cais_velho'] } } },
    ],
    murim_festival: [
      { p: 'G', text: 'Vender lanternas de papel pintadas às famílias que chegam tarde, a preço que ninguém contesta', cond: T, res: { text: 'Em duas horas, o estoque acaba, e você lucra com a pressa dos outros sem nunca elevar a voz. Depois, vê uma criança acender a lanterna que você vendeu, e sente a pontada estranha de que algo valioso foi trocado por moedas.', fx: { pedras: 35, setFlags: ['olf_lanternas'] } } },
    ],
    murim_inverno: [
      { p: 'A G', text: 'Comprar o estoque de farinha dos mercadores recusados e distribuí-lo a preço de custo', cond: T, res: { text: 'Os mercadores, aliviados por ter alguém que absorva o prejuízo, aceitam. Você distribui a farinha na estalagem e no templo. Perde dinheiro, e pela manhã descobre o que o faro ensinou sem querer: há investimentos que rendem em outra moeda.', fx: { pedras: -60, fama: 4, karma: 4, setFlags: ['olf_farinha'] } } },
    ],
    murim_ponte_reparo: [
      { p: 'G A', text: 'Financiar os materiais em troca de uma taxa simbólica de passagem durante um ano', cond: T, res: { text: 'A taxa é pequena e, durante o ano, paga o que você gastou e um pouco mais. Terminado o prazo, você a retira sem avisar ninguém, e a vila descobre que o preço da passagem tinha prazo e dono. A ponte, a esta altura, já é de todos.', fx: { pedras: 20, fama: 2, karma: 1, setFlags: ['olf_ponte_taxa'] } } },
    ],
  },
};
