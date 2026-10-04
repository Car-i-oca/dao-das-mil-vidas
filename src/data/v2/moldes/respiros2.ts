import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Lote 5 da Fase 3: respiros e cenas de convivência. Curtos, com uma escolha pequena que muda uma opinião ou deixa um fato.
 * Não carregam enredo: dão ritmo e variedade (festivais, mercado, colheita, meditação) e fazem as pessoas reaparecerem.
 */
const AMIGO = { amigo: { pessoa: { papel: 'amigo', vivo: true }, opcional: true } } as const;
const PARENTE = { parente: { pessoa: { papel: 'parente', vivo: true }, opcional: true } } as const;

export const RESPIROS2: Molde[] = [
  molde({
    id: 'resp_go', titulo: 'Uma Partida de Go', tipo: 'respiro', capitulos: ['despertar', 'entrada', 'ascensao', 'crise', 'legado'], max: 2,
    papeis: { ...AMIGO, praca: { lugar: { tipo: ['praca', 'templo', 'mercado'] } } },
    cena: [
      { se: { papel: { amigo: { vivo: true } } }, texto: 'No {praca.nome}, {amigo.nome} desenha um tabuleiro no chão com um graveto e coloca pedrinhas brancas e pretas. "Uma partida", diz. "Só uma." Duas horas depois, a luz mudou, o chá esfriou, e a partida continua, com a seriedade serena dos que sabem que o resultado não importa.' },
      { texto: 'No {praca.nome}, um velho desenha um tabuleiro no chão com um graveto e coloca pedrinhas brancas e pretas. Faz um gesto convidando. Duas horas depois, a luz mudou, o chá esfriou, e a partida continua, com a seriedade serena dos que sabem que o resultado não importa.' },
    ],
    opcoes: [
      { id: 'vencer', texto: 'Jogar para vencer, sem concessões.', teste: { stat: ['comp', 'esp'], dif: 0 },
        sucesso: { texto: 'A última pedra fecha um território inteiro, e o adversário, depois de um suspiro, bate palmas curtas. A vitória, em silêncio, é uma das poucas que não deixa rastro de ressentimento. Fica o prazer de um cálculo bem feito.', efeitos: [{ opiniao: ['amigo', 3] }], fx: { xp: 6, perfil: { astucia: 2 } } },
        falha: { texto: 'Três movimentos antes do fim, você vê o erro, e não tem mais o que fazer. O adversário ganha com humildade, o que dói mais. Fica a vontade de uma revanche, e a admissão, calada, de que há uma elegância na derrota.', efeitos: [{ opiniao: ['amigo', 2] }], fx: { xp: 3, perfil: { disciplina: 1 } } } },
      { id: 'deixar', texto: 'Jogar de modo a manter o jogo equilibrado, e deixar o fim em aberto.',
        res: { texto: 'A partida acaba em empate, e ninguém sabe quem cedeu a quem. A conversa, depois, é mais longa do que o jogo. Algumas partidas se jogam para ter um motivo de ficar à mesa.', efeitos: [{ opiniao: ['amigo', 5] }], fx: { karma: 1, perfil: { compaixao: 1 } } } },
      { id: 'observar', texto: 'Observar o jogo mais do que jogar: aprender com o jeito do outro.',
        res: { texto: 'Você move pouco, e olha muito. Há uma lição de paciência na maneira como o outro posiciona as pedras, e uma lição de abandono na maneira como as perde. Fim de tarde, fim de jogo, e um pequeno caderno na cabeça.', fx: { xp: 8, perfil: { cautela: 1, disciplina: 1 } } } },
    ],
  }),
  molde({
    id: 'resp_pescadores', titulo: 'A Rede ao Amanhecer', tipo: 'respiro', capitulos: ['infancia', 'despertar', 'entrada', 'ascensao'], max: 2,
    papeis: { ...PARENTE },
    cena: 'Antes do sol, os pescadores da vila empurram os barcos para a água fria, e alguém, sem perguntar, lhe entrega um remo. O mar, a essa hora, tem uma cor de ferro molhado, e o silêncio dos homens é uma forma de conversa. Quando a rede volta, pesada de prata, ninguém comemora: só se contam os peixes, com o respeito de quem lida com uma dádiva.',
    opcoes: [
      { id: 'remar', texto: 'Remar com eles até o fim da pesca.', teste: { stat: ['fis', 'sor'], dif: 0 },
        sucesso: { texto: 'Os braços ardem, o sal cola nos lábios, e no fim do dia você recebe uma porção de peixe e um aceno discreto. Há quem diga que o trabalho do mar ensina a respirar com o corpo todo. Quem o diz está certo.', fx: { xp: 6, stats: { fis: 1 }, perfil: { disciplina: 1 } } },
        falha: { texto: 'O remo escapa, o barco gira, e os homens, sem uma palavra, resolvem em dois movimentos o que você complicou em dez. No fim, sobra uma gargalhada e a lição de que o mar não perdoa a pressa e adora a humildade.', fx: { perfil: { cautela: 1 } } } },
      { id: 'ouvir', texto: 'Sentar na proa e ouvir as histórias dos mais velhos.',
        res: { texto: 'As histórias são sempre as mesmas: uma tempestade, um peixe que não foi pescado, um amigo que o mar levou. Mas contadas debaixo de um céu cor de pérola, ganham um peso novo, e você anota, calad{jogador.o}, o que nenhum livro registrou.', fx: { xp: 4, karma: 1, perfil: { compaixao: 1 } } } },
      { id: 'devolver', texto: 'Devolver ao mar o peixe menor, como os mais velhos fazem.',
        res: { texto: 'O peixe some na água com um clarão de prata, e o velho a seu lado assente sem dizer nada. "Quem devolve", murmura depois, "volta a receber." Não é doutrina, é costume, e os costumes do mar têm uma antiguidade que os livros não alcançam.', fx: { karma: 2, perfil: { compaixao: 1, devocao: 1 } } } },
    ],
  }),
  molde({
    id: 'resp_casamento', titulo: 'O Casamento da Vila', tipo: 'respiro', capitulos: ['despertar', 'entrada', 'ascensao', 'crise', 'legado'], max: 2,
    papeis: { ...PARENTE, ...AMIGO },
    cena: 'A vila se enche de fitas vermelhas e de fogos de papel, e a noiva, de véu, atravessa a praça num ritmo que parece de dança e é de medo. O noivo, mais pálido do que a roupa, sorri sem acreditar. Há música, e há bolo, e há a sensação, ao fundo, de que um casamento é, antes de tudo, um compromisso público de coragem.',
    opcoes: [
      { id: 'brindar', texto: 'Erguer a taça e fazer um brinde curto e sincero.', teste: { stat: ['car', 'sor'], dif: 0 },
        sucesso: { texto: 'O brinde é tão simples que todos o repetem, e a noite ganha uma risada coletiva. O noivo, depois, aperta sua mão sem falar, e a noiva lhe dá um doce de lótus com uma gravidade comovente. Há momentos em que a presença basta como presente.', efeitos: [{ opiniao: ['amigo', 3] }, { opiniao: ['parente', 3] }], fx: { karma: 2, fama: 1, perfil: { compaixao: 1, devocao: 1 } } },
        falha: { texto: 'A frase sai empacada, a taça tomba, e o vinho escorre sobre o véu de alguém. Há um silêncio de meio segundo, e depois uma gargalhada geral, e uma tia que o perdoa com um tapinha. Algumas gafes viram a lenda de uma festa.', fx: { perfil: { cautela: 1 } } } },
      { id: 'dancar', texto: 'Dançar até o escuro, com quem convidar.',
        res: { texto: 'A música é irregular, os pés, atrapalhados, e a alegria, completa. No fim da noite, você tem bolhas nos pés e a sensação larga de ter estado onde devia. Cultivadores raramente dançam, e talvez por isso devessem.', fx: { karma: 1, xp: 4, perfil: { devocao: 1 } } } },
      { id: 'sair', texto: 'Sair cedo, em silêncio: festas grandes pesam.',
        res: { texto: 'Lá fora, a noite é fresca, e a música, ao longe, parece de outra cidade. Há uma solidão boa em quem escolhe sair, e outra, menos boa, em quem sai por não saber ficar. Você não sabe qual das duas é a sua.', fx: { perfil: { cautela: 1 } } } },
    ],
  }),
  molde({
    id: 'resp_pilulas', titulo: 'A Barraca de Pílulas', tipo: 'respiro', capitulos: ['entrada', 'ascensao', 'crise'], max: 2,
    papeis: { assoc: { faccao: { tipo: ['associacao'] } } },
    cena: 'Uma barraca de pílulas, no meio de uma feira de segunda, anuncia curas para tudo: tosse, mau-olhado, dívida, amor. O vendedor, de bigode engomado, fala demais e vende pouco, e sob o toldo, entre os frascos coloridos, há um ou outro de verdade. A {assoc.nome} cobra um imposto sobre barracas assim, e finge que não vê as que valem mais.',
    opcoes: [
      { id: 'procurar', texto: 'Revirar os frascos à procura do que presta, sem dar na vista.', teste: { stat: ['comp', 'sor'], dif: 1, tag: 'alquimia' },
        sucesso: { texto: 'Entre dezoito frascos de água colorida, um deles cheira a raiz verdadeira. O vendedor, sem perceber, vende barato. Em casa, a pílula faz o que diz, e você descobre que a feira é como a vida: oito décimos de ruído, e um décimo de valor, pronto para quem tem olho.', fx: { item: ['pilula_qi_menor'], xp: 4, perfil: { astucia: 2 } } },
        falha: { texto: 'O frasco que você escolhe é de tintura com açúcar, e a única coisa que cura é a sede. O vendedor sorri com os olhos fechados. Algumas lições custam três cobres, e são as mais honestas.', fx: { pedras: -3, perfil: { cautela: 1 } } } },
      { id: 'conversar', texto: 'Conversar com o vendedor: gente assim sabe de muitas coisas.',
        res: { texto: 'O vendedor conta de três mestres falsos, dois verdadeiros, e uma velha que mora numa ponte e sabe curar com o silêncio. Nada disso é um tesouro, e tudo é um mapa. Você paga uma moeda, de gorjeta, e leva o que vale mais: uma lista de nomes.', fx: { xp: 4, perfil: { astucia: 1, compaixao: 1 } } } },
      { id: 'passar', texto: 'Passar adiante: não há cura que se compre em feira.',
        res: { texto: 'A feira fica atrás, com o barulho e o cheiro de óleo. Você não se arrepende, e nem se vangloria. Algumas decisões são só um jeito de continuar andando, e aí está, talvez, o segredo de todas as outras.', fx: { perfil: { cautela: 1 } } } },
    ],
  }),
  molde({
    id: 'resp_chuva_petalas', titulo: 'A Chuva de Pétalas', tipo: 'respiro', capitulos: ['entrada', 'ascensao', 'crise', 'legado'], max: 2,
    papeis: {},
    cena: [
      { se: { diretor: { contador: ['sombria'] } }, texto: 'Um vento de primavera sacode as cerejeiras e as pétalas caem juntas, uma só vez, como se alguém tivesse esvaziado um cesto. Em torno, as pessoas dizem que é bom augúrio. Você pensa em tudo que cai sem ser recolhido, e a ideia, estranhamente, não pesa.' },
      { texto: 'Um vento de primavera sacode as cerejeiras e as pétalas caem juntas, uma só vez, como se alguém tivesse esvaziado um cesto. Em torno, as pessoas riem e estendem as mãos. Por um instante, o mundo inteiro parece generoso.' },
    ],
    opcoes: [
      { id: 'meditar', texto: 'Sentar debaixo da árvore e meditar enquanto cai.', teste: { stat: ['esp', 'dao'], dif: 0 },
        sucesso: { texto: 'O Qi acompanha o ritmo da queda, e por uma hora você é só respiração. Quando abre os olhos, o chão está coberto, e o corpo, curiosamente, leve. Uma quietude assim paga mais do que dez dias de treino forçado.', fx: { xp: 10, stats: { esp: 1 }, perfil: { disciplina: 1 } } },
        falha: { texto: 'As pétalas fazem cócegas, e a meditação vira riso. Você se rende, e passa a hora catando pétalas do colarinho. Há dias que o Dao pede seriedade, e dias que pede só gargalhada.', fx: { xp: 2, perfil: { devocao: 1 } } } },
      { id: 'recolher', texto: 'Recolher as pétalas num cesto, para um chá ou um perfume.',
        res: { texto: 'O cesto enche devagar, e o perfume, dias depois, chega a todos os cantos da casa. Uma velha vizinha, ao sentir, chora um pouco, sem dizer por quê. Há coisas pequenas, como cheiros, que são grandes demais para explicar.', fx: { karma: 1, perfil: { compaixao: 1 } } } },
      { id: 'correr', texto: 'Correr debaixo da chuva, com os braços abertos, como uma criança.',
        res: { texto: 'A corrida é curta e boba, e a sensação, longa. Você volta ofegante, com pétalas nos cabelos, e quem o vê passar não diz nada. Alguns poderes se perdem quando se leva tudo a sério, e outros se encontram.', fx: { karma: 1, perfil: { devocao: 1 } } } },
    ],
  }),
  molde({
    id: 'resp_funeral', titulo: 'O Funeral Que Não Era Seu', tipo: 'respiro', capitulos: ['entrada', 'ascensao', 'crise', 'legado'], max: 2,
    papeis: {},
    cena: 'Uma procissão de gente de branco atravessa a estrada, carregando um caixão simples e uma lanterna apagada. Ninguém olha para você, e todos esperam, com a naturalidade de quem sabe que a morte é um encontro público. Alguém murmura um nome que você nunca ouviu, e o nome, mesmo assim, pesa.',
    opcoes: [
      { id: 'acompanhar', texto: 'Juntar-se ao fim da fila e caminhar com eles até o túmulo.',
        res: { texto: 'A caminhada dura uma hora, e ninguém pergunta quem você é. No fim, uma mulher estende a você uma pequena pedra branca, e você a deposita sobre a terra. É um gesto que ninguém lhe ensinou, e que ninguém esquecerá. Os mortos, às vezes, ajudam os vivos a lembrar de como se faz.', fx: { karma: 3, perfil: { compaixao: 2, devocao: 1 } } } },
      { id: 'curvar', texto: 'Ficar à beira da estrada, de cabeça baixa, até a procissão passar.',
        res: { texto: 'O silêncio é suficiente. Quando a última pessoa passa, uma criança olha para trás e acena, com a gravidade de uma adulta. Você fica um tempo parado, depois de a poeira baixar, sem pressa de seguir. Algumas pausas são orações.', fx: { karma: 1, perfil: { devocao: 1 } } } },
      { id: 'seguir', texto: 'Seguir viagem: a morte alheia não é assunto seu.',
        res: { texto: 'Você atravessa a estrada, e a procissão, cortada ao meio, espera. O barulho de seus passos ecoa mais do que devia. Há uma pequena culpa que não tem nome, e que, por isso mesmo, é difícil de lavar.', fx: { karma: -1, perfil: { cautela: 1 } } } },
    ],
  }),
  molde({
    id: 'resp_cha', titulo: 'A Casa de Chá do Desfiladeiro', tipo: 'respiro', capitulos: ['entrada', 'ascensao', 'crise', 'legado'], max: 2,
    papeis: {},
    cena: 'No meio do desfiladeiro, uma casa de chá de dois cômodos serve a viajantes que não têm pressa. A dona, uma mulher de rosto de pedra, serve o chá sem perguntar o que você quer, e serve exatamente o que você precisava. Há uma mesa em que ninguém se senta, e uma xícara a mais que nunca é usada.',
    opcoes: [
      { id: 'conversar', texto: 'Conversar com a dona: quem serve o chá sabe o que passa pela estrada.',
        res: { texto: 'Ela fala pouco, e o que fala é feito de nomes e datas: quem passou, quem não voltou, quem mandou lembranças. Você sai com uma pequena rede de informações e uma impressão de ter sido, por uma hora, parte de uma conversa maior do que a sua.', fx: { xp: 4, perfil: { astucia: 1, compaixao: 1 } } } },
      { id: 'xicara', texto: 'Perguntar por que há uma xícara a mais.',
        res: { texto: 'A dona demora, e responde com uma frase curta: "Para quem não chegou." Você não pergunta mais, e bebe o seu chá em silêncio, olhando a xícara vazia. Há perguntas que se fazem para ouvir a resposta e outras para ouvir o silêncio que ela deixa.', fx: { karma: 1, perfil: { compaixao: 1 } } } },
      { id: 'pagar', texto: 'Pagar o dobro, deixar a gorjeta e seguir.', custo: 4,
        res: { texto: 'A mulher assente, guarda as moedas, e, na saída, lhe estende um pequeno embrulho: três folhas de um chá raro. "Para uma hora ruim", diz. Você guarda, sem agradecer em voz alta, e passa a esperar a hora ruim com uma estranha serenidade.', fx: { item: ['pilula_qi_menor'], karma: 1, perfil: { compaixao: 1 } } } },
    ],
  }),
  molde({
    id: 'resp_estudo', titulo: 'Uma Noite de Estudo', tipo: 'respiro', capitulos: ['despertar', 'entrada', 'ascensao', 'crise'], max: 2,
    papeis: { ...AMIGO },
    cena: [
      { se: { papel: { amigo: { vivo: true } } }, texto: 'Uma lamparina, duas esteiras e um monte de pergaminhos: você e {amigo.nome} passam a noite decifrando um manual que nenhum dos dois entende. Às duas da manhã, as frases já não fazem sentido, e às três, voltam a fazer, de outra forma. Quem estuda em companhia aprende duas vezes, e esquece pela metade.' },
      { texto: 'Uma lamparina, uma esteira e um monte de pergaminhos: você passa a noite decifrando um manual que não entende. Às duas da manhã, as frases já não fazem sentido, e às três, voltam a fazer, de outra forma. A madrugada tem uma lucidez que o dia não alcança.' },
    ],
    opcoes: [
      { id: 'decifrar', texto: 'Insistir até o último pergaminho, dormir quando acabar.', teste: { stat: ['comp', 'esp'], dif: 1 },
        sucesso: { texto: 'Ao amanhecer, o último símbolo cede, e o manual inteiro se acende, como um mapa de uma terra que você já visitou. Você dorme sentado, com a testa sobre o pergaminho, e acorda com o sol na cara e uma nova técnica no corpo.', efeitos: [{ opiniao: ['amigo', 3] }], fx: { xp: 16, stats: { comp: 1 }, perfil: { disciplina: 2, astucia: 1 } } },
        falha: { texto: 'O último símbolo resiste, e a madrugada se vai sem resposta. Você dorme mal, acorda com dor no pescoço e um tipo de teimosia que só os derrotados têm. Há noites assim, e dias, depois, que as cobram.', fx: { xp: 5, perfil: { disciplina: 1 } } } },
      { id: 'dormir', texto: 'Parar às duas: a clareza vem pela manhã.',
        res: { texto: 'Você dorme. Ao acordar, as frases de ontem estão limpas como louça lavada, e o manual cede em meia hora. O sono, mais uma vez, prova ser o melhor mestre. Aprender a parar é, afinal, parte do aprender.', fx: { xp: 10, perfil: { cautela: 1, disciplina: 1 } } } },
      { id: 'dividir', texto: 'Dividir o manual em partes, e passar uma ao outro para estudar em separado.',
        res: { texto: 'Cada um estuda a sua metade, e, no fim, se juntam e se contam o que entenderam. A soma é maior do que as partes, e o manual, enfim, ganha um sentido que nenhum dos dois, sozinho, alcançaria. Aprender em dupla é uma arte, e vocês a descobrem.', efeitos: [{ opiniao: ['amigo', 6] }], fx: { xp: 12, karma: 1, perfil: { compaixao: 1, astucia: 1 } } } },
    ],
  }),
  molde({
    id: 'resp_visitante', titulo: 'O Viajante na Porta', tipo: 'respiro', capitulos: ['despertar', 'entrada', 'ascensao', 'crise', 'legado'], max: 2,
    papeis: {},
    cena: 'Ao pôr do sol, um viajante bate à porta pedindo abrigo e um prato de arroz. Está sujo, cansado, e os olhos, apesar de tudo, são de quem já viu muito. Ao primeiro gole de chá, começa a falar: de cidades onde as casas não têm telhado, de um mar de areia, de uma montanha que canta. Nada disso você pode verificar, e nada disso, ao ouvi-lo, parece mentira.',
    opcoes: [
      { id: 'abrigar', texto: 'Oferecer abrigo por uma noite, e ouvir as histórias até o fim.',
        res: { texto: 'A noite vira madrugada, e o viajante, ao partir, deixa uma moeda de um reino que não existe mais, e um conselho: "Vá longe, mas volte antes de esquecer o caminho." Você guarda a moeda, o conselho, e uma vontade pequena de ir, que, por enquanto, só cabe no bolso.', fx: { xp: 6, karma: 2, perfil: { compaixao: 1, astucia: 1 } } } },
      { id: 'perguntar', texto: 'Perguntar o que ele aprendeu, em todos esses lugares.',
        res: { texto: 'O viajante demora a responder. "Que ninguém sabe o que está fazendo. Mas os que sabem fingem melhor." Você ri, e ele ri, e a conversa, a partir dali, é mais leve. Há sabedorias que só se pagam em chá.', fx: { xp: 6, perfil: { astucia: 1, compaixao: 1 } } } },
      { id: 'recusar', texto: 'Dizer que não há lugar, e fechar a porta com educação.',
        res: { texto: 'A porta se fecha, e a noite, atrás dela, parece mais longa. Você escuta passos que se afastam, e o silêncio que fica pesa mais do que qualquer conversa. A prudência, às vezes, é uma forma elegante de solidão.', fx: { karma: -1, perfil: { cautela: 2 } } } },
    ],
  }),
];
