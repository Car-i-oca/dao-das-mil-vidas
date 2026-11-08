import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Presença acolhedora (carisma_nato). Conceito: as pessoas contam mais do que pretendiam, e quem escuta passa a saber
 * demais. A cicatriz: confidências são dívidas; guardar um segredo custa tanto quanto revelá-lo.
 * Cenas: aco_confissao_do_cais (infância) -> aco_segredo_do_mestre (juventude) -> aco_mesa_dos_rivais (maturidade) -> aco_cartas_guardadas (velhice).
 */
const T = { talent: ['carisma_nato'] };

export const CARISMA_NATO: ConjuntoTraco = {
  eventos: [
    {
      id: 'aco_confissao_do_cais', title: 'A confissão do remador', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'Você só tinha ido buscar água, mas o remador do barco de carga sentou-se ao seu lado no degrau e, sem que você perguntasse nada, começou a contar. Que tinha fugido de uma dívida. Que a filha pensava que ele estava morto. Que dormia mal. Ele para no meio, assustado com o que acabou de dizer a uma criança, e espera que você faça algo com isso.',
      choices: [
        { p: 'C', text: 'Ouvir até o fim e dizer que ele podia mandar uma carta pela sua mãe', res: { text: 'Ele manda a carta, e a sua mãe, embaraçada, entrega-a a um mensageiro com três moedas suas. A resposta chega seis semanas depois: uma frase só, com letra de menina. O remador não diz nada, mas no dia seguinte lhe deixa um peixe seco embrulhado numa folha, e uma lição que você leva para a vida: escutar é uma forma de fazer.', fx: { karma: 2, stats: { car: 1 }, setFlags: ['aco_remador_ajudado'] } } },
        { p: 'T', text: 'Prometer que não conta a ninguém e depois guardar o segredo', res: { text: 'Você guarda. Seis meses depois, um cobrador chega perguntando pelo homem, e você olha o chão e diz que não sabe de nada. Ele paga o seu silêncio com uma moeda de cobre e com a primeira dúvida que você tem sobre a honra: se o silêncio salva, por que é tão pesado?', fx: { stats: { dao: 1 }, setFlags: ['aco_segredo_guardado'] } } },
        { p: 'A', text: 'Perguntar mais, por curiosidade, até saber o nome da dívida e de quem a cobrava', res: { text: 'O remador responde a tudo, aliviado de ter alguém para quem responder. Você anota na cabeça o nome do credor e a rota, e só mais tarde percebe o que fez: transformou uma confissão em informação. Isso será útil, mais de uma vez, e tornará você um pouco menos doce a cada uso.', fx: { fama: 1, stats: { esp: 1 }, setFlags: ['aco_nomes_colhidos'] } } },
      ],
    },
    {
      id: 'aco_segredo_do_mestre', title: 'O que o mestre contou à noite', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'Ao fim de uma sessão de treino, o mestre da escola o chama ao pátio vazio e, olhando para o chão, diz que está perdendo a visão do olho esquerdo. Que ninguém sabe. Que o torneio de outono está perto e a escola precisa de um mestre inteiro. Ele pergunta o que você faria. Não é uma pergunta de mestre; é de um homem assustado que escolheu falar com você porque você é fácil de ouvir.',
      choices: [
        { p: 'C D', text: 'Aconselhá-lo a treinar um sucessor e se oferecer para ajudar nos fundamentos', res: { text: 'O mestre fica em silêncio por um tempo longo e então aperta seu ombro. Nos meses seguintes, os treinos mudam sem que ninguém entenda: mais exercícios coletivos, mais lições de postura, uma sutil abertura para quem ensinaria depois. No outono, a escola perde o torneio e ganha um futuro.', fx: { fama: 2, karma: 3, stats: { car: 1, dao: 1 }, setFlags: ['aco_mestre_apoiado'] } } },
        { p: 'T', text: 'Guardar o segredo a sete chaves, sem se meter no que o mestre decida', res: { text: 'Você não conta a ninguém. O mestre vai ao torneio e quase perde um duelo por não ver um golpe vindo da esquerda; só você entende o que aconteceu. Depois, ele agradece sem olhá-lo nos olhos. Fica entre vocês um acordo mudo: você sabe, ele sabe que você sabe, e a escola jamais saberá.', fx: { karma: 1, stats: { dao: 1 }, setFlags: ['aco_segredo_guardado'] } } },
        { p: 'M A', text: 'Usar a confiança do mestre para se colocar como seu braço direito na escola', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O mestre, aliviado, passa a delegar mais, e você se torna o sombra dele nos assuntos importantes. A escola funciona melhor, e os colegas notam seu novo lugar com olhares divididos. A cadeira que você ocupa é legítima, e é também a que você queria.', fx: { fama: 3, karma: -1, stats: { car: 1, comp: 1 }, setFlags: ['aco_braco_direito'] } }, fail: { text: 'O mestre percebe a manobra ainda no primeiro mês e retira a confiança com uma frase calma. A escola o vê, de repente, como alguém que foi favorecido e traiu o favor. A porta da confidência se fecha, e demora anos para você conseguir abrir outra.', fx: { fama: -2, karma: -2, setFlags: ['aco_confianca_quebrada'] } } },
      ],
    },
    {
      id: 'aco_mesa_dos_rivais', title: 'As duas famílias à sua mesa', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 26, ageMax: 55 },
      text: 'Duas famílias de oleiros brigam há três gerações por uma nascente. Cada uma, em separado, já lhe contou a sua versão, e você acredita nas duas: aprendeu que as pessoas lhe dizem a verdade que sentem. Agora, as duas se sentaram à sua mesa, de mau humor, esperando que você, que todos estimam, decida quem tem razão.',
      choices: [
        { p: 'C D', text: 'Servir o chá e contar a cada família, diante da outra, o que a outra lhe confiou', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O silêncio é longo, doloroso, e então uma velha ri baixo e diz que então todos já sabem tudo. A nascente é dividida em dias alternados, e os dois filhos mais novos, sem aviso, arranjam casamento. Nenhuma das famílias o perdoará inteiramente, e ambas lhe mandarão louças pelo resto da vida.', fx: { fama: 5, karma: 4, stats: { car: 1, dao: 1 }, setFlags: ['aco_paz_oleiros'] } }, fail: { text: 'Você quebra o segredo das duas famílias de uma vez, e as duas se sentem traídas pelo mesmo ato. A mesa é virada, o chá se perde, e a briga fica maior que antes. Você aprende, da pior forma, que confidências não são moeda de paz.', fx: { fama: -3, karma: -2, stats: { car: -1 }, setFlags: ['aco_confianca_quebrada'] } } },
        { p: 'T', text: 'Recusar a decisão e propor que um juiz de fora ouça as duas famílias', res: { text: 'As famílias bufam, mas aceitam. O juiz leva três semanas e dá razão a quem não esperava. Você sai da história sem aliados nem inimigos, e com a lição de que ser querido por todos é uma qualidade que só vale enquanto se aceita não resolver tudo.', fx: { karma: 1, stats: { dao: 1 }, setFlags: ['aco_juiz_de_fora'] } } },
        { p: 'A', text: 'Usar o que cada lado lhe contou para fazer uma proposta que os dois possam aceitar sem perder a face', res: { text: 'É um trabalho sutil de dias, com a sua voz alternando entre uma casa e outra. No fim, a nascente passa a servir uma casa de banhos comum, e as duas famílias ganham dinheiro juntas. Nenhuma delas consegue dizer exatamente como chegou ali, e você nunca conta.', fx: { fama: 4, karma: 2, pedras: 25, stats: { car: 1 }, setFlags: ['aco_paz_oleiros'] } } },
      ],
    },
    {
      id: 'aco_cartas_guardadas', title: 'O baú das confidências', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 50 },
      text: 'Ao arrumar a casa para o inverno, você abre o baú do fundo do armário e encontra o que sempre soube que estava lá: cartas, bilhetes, recados, e dezenas de segredos que as pessoas lhe confiaram ao longo da vida, anotados por escrúpulo ou por fraqueza. Muitos dos donos já morreram. Alguns de seus filhos ainda vivem, e não sabem o que os pais disseram.',
      choices: [
        { p: 'C', text: 'Entregar a cada herdeiro o que lhe cabe, com uma conversa, e queimar o resto', res: { text: 'Leva o ano inteiro. Você bate a portas que não esperavam sua visita e conta o que ninguém lhes contou. Alguns choram, outros agradecem, um expulsa você. No fim, o baú está vazio e a casa mais leve. Dizem que nunca mais alguém confiou tanto numa pessoa que sabia tanto.', fx: { fama: 3, karma: 4, stats: { dao: 2, car: 1 }, setFlags: ['aco_confidente', 'aco_bau_aberto'] } } },
        { p: 'T O', text: 'Queimar tudo sem ler uma segunda vez, e levar os segredos para o túmulo', res: { text: 'Você acende a pequena fogueira no quintal e olha cada carta virar cinza. O fogo é rápido, e a sua consciência, mais lenta. Mas, quando a última página se desfaz, sente algo parecido com honra: a de ter sido cofre até o fim.', fx: { karma: 2, stats: { dao: 2 }, setFlags: ['aco_confidente', 'aco_bau_queimado'] } } },
        { p: 'D', text: 'Deixar o baú à vista de todos, com uma nota pedindo que quem se reconhecer o leve', cond: { ...T, flagsAny: ['aco_paz_oleiros', 'aco_mestre_apoiado', 'aco_remador_ajudado', 'aco_juiz_de_fora', 'aco_segredo_guardado'] }, res: { text: 'Em dois meses, o baú está meio vazio. Em quatro, cheio de bilhetes novos, de gente que veio deixar um segredo, em vez de levar um. Você entende que a presença que sempre teve não era tanto escutar, mas ser o lugar onde as coisas podem ficar. Ela continuará, depois de você, na própria casa.', fx: { fama: 4, karma: 3, stats: { car: 1, dao: 1 }, setFlags: ['aco_confidente', 'aco_casa_aberta'] } } },
      ],
    },
  ],
  opcoes: {
    murim_festival: [
      { p: 'C', text: 'Sentar com a artista e deixar que ela fale do irmão antes de procurá-lo', cond: T, res: { text: 'Ela fala por uma hora, sem que você precise pedir. Descobre que o irmão não se perdeu: foi embora porque ela o acusou de uma coisa que nunca fez. Quando o encontram, ela tem diante de si algo que não esperava, a coragem de se desculpar, e você tem diante de si outra confidência.', fx: { karma: 3, stats: { car: 1 }, setFlags: ['aco_artista'] } } },
    ],
    murim_refeicao: [
      { p: 'C', text: 'Sentar entre o rapaz e o viajante e deixar que ambos contem o motivo da pressa', cond: T, res: { text: 'O viajante, desarmado pelo seu jeito, desfaz o ar duro e revela que também tem uma filha. A tigela é dividida, e os dois homens, em silêncio, aprendem a olhar um para o outro sem pressa. Dae-hyun passa a falar de você como alguém que fez milagre com a colher.', fx: { karma: 3, setFlags: ['aco_caldo_duas_filhas'] } } },
    ],
    murim_dilema: [
      { p: 'C D', text: 'Convidar os dois a sentarem e deixar que cada um fale sem ser interrompido', cond: T, res: { text: 'O espadachim fala por muito tempo e, no meio, esquece a acusação e conta o que sentia pelo mestre. A curandeira escuta e, quando é a vez dela, também se esquece da defesa. No fim, ninguém precisa de um veredito: sentam-se, calados, junto ao corpo.', fx: { fama: 2, karma: 3, setFlags: ['aco_dilema_ouvido'] } } },
    ],
    murim_mercado: [
      { p: 'A C', text: 'Conversar com Noh o tempo suficiente para ele esquecer que estava cobrando', cond: T, res: { text: 'Em meia hora, Noh conta de uma esposa, de um filho e de uma dívida de apostas. No fim, o reparo sai de graça, e ele guarda o seu nome numa lista que só consulta quando precisa de aliados. Alguns anos depois, vai precisar.', fx: { karma: 1, stats: { car: 1 }, setFlags: ['aco_noh_confidencias'] } } },
    ],
    murim_inverno: [
      { p: 'C', text: 'Ficar uma noite com os mercadores recusados e ouvir o que cada um tem a perder', cond: T, res: { text: 'Quando o fogo diminui, os mercadores começam a contar o que carregam. Um tem remédios; outro, farinha que escondeu; um terceiro, o medo de voltar para casa de mãos vazias. Pela manhã, ninguém precisa de ordem para dividir, porque ouvir já tinha dividido.', fx: { fama: 3, karma: 3, setFlags: ['aco_inverno_dividido'] } } },
    ],
    murim_assembleia: [
      { p: 'C', text: 'Falar com cada delegado a sós, antes da sessão, e ouvir o que cada um não pode dizer em público', cond: T, res: { text: 'Quando a assembleia começa, você já sabe o que cada um quer e o que teme. A sessão corre como se fosse ensaiada: ninguém é humilhado, e as concessões saem como presentes. Os delegados, no fim, acham que decidiram tudo sozinhos, e você deixa que assim seja.', fx: { fama: 4, karma: 2, stats: { car: 1 }, setFlags: ['aco_assembleia_amaciada'] } } },
    ],
  },
};
