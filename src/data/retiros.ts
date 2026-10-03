/**
 * Textos dos turnos de reclusão: em reinos altos, longos períodos de cultivo viram um resumo
 * em vez de mais um evento genérico. {d} é a duração em anos.
 */
export const RETIRO_TEXTS: Record<'A' | 'B' | 'C', string[]> = {
  // Reinos 3 e 4
  A: [
    'Você se tranca por {d} anos numa caverna de pedra fria. O Qi assenta como lama no fundo de um lago, e a mente fica transparente.',
    'Passam-se {d} anos de retiro. Cada estação traz um tipo de silêncio: o da neve, o da chuva, o do calor, o das folhas secas.',
    'Por {d} anos, você praticou a mesma respiração todas as manhãs, até o hábito virar corpo e o corpo virar hábito.',
    'Você recusa convites, cartas e notícias por {d} anos. A única visita é a da névoa, que chega sempre às mesmas horas.',
    'Em {d} anos de reclusão, você revisa tudo o que aprendeu e descobre que metade era ruído e metade ainda era promessa.',
  ],
  // Reinos 5 e 6
  B: [
    'São {d} anos de reclusão. Reinos se erguem e caem no mundo lá fora; dentro da câmara, apenas o fluxo lento do Qi, como um rio que já esqueceu o mar.',
    'Você cultiva por {d} anos sob uma montanha. Quando o Dantian fica quieto, o mundo inteiro cabe nele, e o tempo vira só um detalhe.',
    'Os {d} anos de retiro passam como um único inverno. Nesse intervalo, os discípulos de seus discípulos aprendem seu nome pelos livros.',
    'Por {d} anos, você acompanha o ciclo dos astros dentro do próprio corpo. As estrelas parecem mais próximas, e a gravidade, mais negociável.',
    '{d} anos de silêncio. Alguém bateu à porta duas vezes; você não ouviu nenhuma delas. Algum dia, vai perguntar quem era.',
  ],
  // Reinos 7 e 8
  C: [
    'Dobram-se {d} anos como quem dobra um papel. Montanhas mudam de forma, rios trocam de leito, e o seu Dao ganha uma pequena dobra nova.',
    'Em {d} anos, você esquece o próprio rosto. O Qi, em compensação, lembra de tudo: de cada respiração, de cada vida que você já foi.',
    'O retiro dura {d} anos. Quando você abre os olhos, as estrelas estão em lugares diferentes, e uma delas parece olhar para você.',
    'Por {d} anos você cultiva além do tempo. Os mortais que conheceu viraram lenda; os que nunca conheceu, ancestrais.',
    'Num único respiro de {d} anos, você ouve o Céu murmurar o que ele pensa da Terra. Não é uma resposta, mas é uma pista.',
  ],
};

/** Frase extra conforme a trilha (opcional). */
export const RETIRO_PATH_LINES: Record<string, string> = {
  sopro: 'A respiração, aos poucos, deixou de ser sua e virou do vento.',
  espada: 'A lâmina, na bainha, aprendeu o silêncio que o aço só conhece depois de muito tempo.',
  alquimia: 'O fogo da fornalha não apagou uma única vez, e as ervas secaram em boa ordem nas vigas.',
  corpo: 'Seus ossos, a cada ano, ganharam o som de metal que muda de tom quando você respira.',
  alma: 'O Mar da Consciência ganhou ilhas novas, e algumas delas pareciam falar.',
  formacoes: 'Nas paredes, os diagramas se rearranjaram sozinhos, como quem corrige a própria letra.',
  budista: 'O som do sino distante se tornou seu único relógio, e depois, apenas a sua respiração.',
  venenos: 'O frasco que você deixou aberto se tornou um jardim de cristais inofensivos, ou quase.',
  bestas: 'A fera ao seu lado envelheceu devagar, de olhos meio fechados, sentindo o seu Qi como quem sente uma lareira.',
  demoniaca: 'A sombra no canto da câmara foi se aquietando, e você não soube dizer se vencia ou se perdia.',
};

/** Texto do resultado ao sair da reclusão. */
export const RETIRO_EXIT: string[] = [
  'Você sai com poeira nos ombros e uma estranha calma. O mundo mudou, e você também.',
  'A luz da entrada machuca os olhos. Passaram-se {d} anos, e o primeiro cheiro de chuva vale por todos eles.',
  'Você empurra a porta. Do lado de fora, as árvores estão maiores, e as notícias, bem mais velhas.',
  'Ao sair, você descobre que perdeu alguns nomes e ganhou outros. O Qi ficou mais denso, e a pressa, mais rara.',
  'A reclusão termina como começou: em silêncio. Mas o silêncio, agora, tem uma textura nova.',
];
