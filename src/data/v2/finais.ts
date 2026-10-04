import type { Ending } from '../../types';

/**
 * Finais da v2: nascem do que a vida fez com as ambições e os fios (cumprida, traída, abandonada, trocada).
 * São escolhidos por `finalDeVelhiceV2` quando a vida termina por idade.
 */
export const FINAIS_V2: Ending[] = [
  { id: 'v2_cla_reerguido', name: 'O Nome Que Voltou a Valer', legacy: 1.8,
    text: 'Quando {nome} morreu, o nome do {cla} já abria portas que ninguém lembrava de ter fechado. O livro de contas tinha uma página riscada, e uma criança, no mercado, soletrou o nome em voz alta, sem saber por quê. O que foi perdido não voltou. O que valia a pena, sim.',
    alt: ['O nome do {cla} aparece, hoje, em cartazes e em pedras. {nome} não está em nenhum deles: o clã aprendeu que o nome era dele, e o resto, de quem veio depois. Foi o que {nome} quis.'] },
  { id: 'v2_cla_vingado', name: 'A Conta Fechada em Sangue', legacy: 1.3,
    text: 'A casa do {cla} continuou de pé, mas silenciosa. {nome} cumpriu o que jurou de pé na porta, aos sete anos, e descobriu que um juramento cumprido não tem som. Nos anos seguintes, os vizinhos baixavam a voz, e nenhum dos dois sentimentos, respeito ou medo, devolveu o que foi perdido.',
    alt: ['Disseram, depois, que {nome} dormiu em paz nos últimos anos. Ninguém sabia dizer se era verdade, e nenhum dos que sabiam era de falar.'] },
  { id: 'v2_cla_perdoado', name: 'A Dívida Que Morreu Com o Passado', legacy: 1.8,
    text: '{nome} perdoou a dívida do {cla} e, com ela, o homem que a cobrava. O que ninguém esperava: o {cla}, que passou décadas devendo, passou a ter um aliado onde nunca teve. Ninguém sabe se foi sabedoria, cansaço, ou as duas coisas, mas a paz que ficou foi de verdade.',
    alt: ['Algumas pessoas sussurram que {nome} foi fraco. Outras, que foi o único forte da família. A resposta, como a dívida, morreu com ele.'] },
  { id: 'v2_cla_perdido', name: 'O Nome Que Sumiu na Chuva', legacy: 0.9,
    text: 'O nome do {cla} sumiu devagar, como tinta na chuva. {nome} tentou, e perdeu, e passou o resto da vida aprendendo que não curar também é uma forma de viver. Quando morreu, ninguém no velório sabia que o homem ao lado do túmulo tinha sido um herdeiro.',
    alt: ['Havia uma ferida, e {nome} a carregou até o fim, sem poder tocá-la. É também uma forma de fidelidade.'] },
  { id: 'v2_rival_superado', name: 'Um Passo à Frente', legacy: 1.5,
    text: '{nome} passou a vida medindo a si mesmo contra um rosto, e um dia o rosto deixou de ser régua. O que sobrou foi o caminho, só o caminho, e a descoberta de que, sem rival, a pergunta continua: para onde, agora? Ninguém soube responder, nem {nome}.',
    alt: ['Nos últimos anos, {nome} falava pouco do rival, e quando falava, era sempre com o tom de quem lembra de um mestre.'] },
  { id: 'v2_rival_reconciliado', name: 'A Mão Aberta', legacy: 1.9,
    text: 'No final, {nome} e o antigo rival trocavam cartas curtas e secas, regulares como estações. Nenhum dos dois disse a palavra "amigo". Quando {nome} morreu, o outro veio de longe, parou diante do túmulo, e deixou uma lâmina. Era o mais próximo de uma despedida que ele sabia dar.',
    alt: ['Duas lápides, no mesmo cemitério, viradas uma para a outra. É o que dizem, e é provavelmente verdade.'] },
  { id: 'v2_rival_vencedor', name: 'A Sombra de Alguém Maior', legacy: 0.9,
    text: '{nome} viveu à sombra de um rosto que sempre esteve um passo à frente. Aprendeu a conviver com isso, em silêncio, como se aprende a conviver com uma cicatriz. Nos últimos anos, quando alguém perguntava de qual seita era, respondia com o nome do outro, sem perceber.',
    alt: ['A rivalidade foi tudo o que {nome} teve de mais constante na vida. Perder para ela foi, ao mesmo tempo, o maior luto e o maior trabalho.'] },
  { id: 'v2_seita_lider', name: 'O Ancião da Seita', legacy: 1.8,
    text: 'Durante décadas, {nome} governou a {seita} com a mão de quem sabe o preço de cada decisão. Quando morreu, o manto passou a outro, e os discípulos, ao ouvir o nome do antigo ancião, abaixavam a voz. A seita não lembrava mais do que ele tinha feito, só do que ele tinha sido.',
    alt: ['Na entrada da {seita}, há uma pedra com o nome de {nome} gravado, e uma fenda onde a mão de cada novo ancião se encaixa. Dizem que é coincidência.'] },
  { id: 'v2_seita_exilado', name: 'O Que Partiu Antes do Inverno', legacy: 1.0,
    text: '{nome} deixou a {seita} antes que o inverno começasse, com o que cabia nos braços. Nunca mais voltou, mas a seita, durante anos, deixou uma vela acesa no portão. Ninguém sabia quem a acendia, e ninguém admitia saber.',
    alt: ['O mundo é grande, e {nome} o viu inteiro. Talvez seja uma boa troca. Talvez não.'] },
  { id: 'v2_seita_errante', name: 'O Cultivador Que Não Entrou', legacy: 1.1,
    text: '{nome} nunca atravessou o portão da {seita}. Preferiu a estrada, o vento e a fome, e quando morreu, num abrigo de beira de caminho, tinha o olhar de quem escolheu e não se arrependeu. Ou se arrependeu, e escolheu de novo.',
    alt: ['Quem encontrou o corpo disse que ele sorria. Quem soube da história, que ele chorava. É provável que as duas coisas fossem verdade.'] },
  { id: 'v2_quase', name: 'Quase Lá', legacy: 1.2,
    text: '{nome} chegou perto, mais perto do que a maioria. Faltou pouco: um passo, um ano, uma conversa. A ambição que moveu a vida inteira ficou, afinal, no meio do caminho, e o que sobrou foi a dignidade de ter tentado, e uma pergunta que ninguém, nunca, vai responder.',
    alt: ['A vida de {nome} é um bom exemplo de que o caminho às vezes vale mais que a chegada. Ou de que ninguém chega, e todos continuam.'] },
  { id: 'v2_inacabado', name: 'A Vida Que Ficou em Aberto', legacy: 1.0,
    text: '{nome} deixou uma ambição pelo caminho, e uma outra a meio. Há fios soltos em cada canto da vida: pessoas que esperavam algo, nomes que nunca foram resolvidos, promessas sem prazo. Em compensação, deixou também a lembrança de ter vivido de olhos abertos.',
    alt: ['Algumas vidas fecham, outras só cessam. A de {nome} foi das que cessam, deixando a porta entreaberta.'] },
];
