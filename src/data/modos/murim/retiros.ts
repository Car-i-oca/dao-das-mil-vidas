/**
 * Textos de temporadas de treino e recolhimento nas montanhas. {d} é a duração em anos.
 */
export const RETIRO_TEXTS: Record<'A' | 'B' | 'C', string[]> = {
  // Reinos 3 e 4
  A: [
    'Você passa {d} anos num pavilhão de montanha, repetindo formas até que o corpo antecipe cada movimento.',
    'Passam-se {d} anos de retiro. Cada estação traz um tipo de silêncio: o da neve, o da chuva, o do calor, o das folhas secas.',
    'Por {d} anos, você pratica a mesma sequência todas as manhãs, até o hábito virar corpo e o corpo virar hábito.',
    'Você recusa convites, cartas e notícias por {d} anos. A única visita é a da névoa, que chega sempre às mesmas horas.',
    'Em {d} anos de reclusão, você revisa tudo o que aprendeu e descobre que metade era ruído e metade ainda era promessa.',
  ],
  // Reinos 5 e 6
  B: [
    'São {d} anos de retiro. Escolas sobem e caem no mundo lá fora; dentro do pavilhão, só se ouvem passos e madeira contra madeira.',
    'Você treina por {d} anos sob uma montanha. Quando a respiração se aquieta, o mundo inteiro cabe num único movimento.',
    'Os {d} anos de retiro passam como um único inverno. Nesse intervalo, os discípulos de seus discípulos aprendem seu nome pelos livros.',
    'Por {d} anos, você estuda equilíbrio, alcance e intenção. As estrelas parecem mais próximas; a fama, bem menos importante.',
    '{d} anos de silêncio. Alguém bateu à porta duas vezes; você não ouviu nenhuma delas. Algum dia, vai perguntar quem era.',
  ],
  // Reinos 7 e 8
  C: [
    'Dobram-se {d} anos como quem dobra um papel. Montanhas mudam de forma, rios trocam de leito e sua técnica ganha uma nova leitura.',
    'Em {d} anos, você esquece o próprio rosto. Em compensação, cada aluno que treinou lembra de uma lição diferente.',
    'O retiro dura {d} anos. Quando você abre os olhos, as estrelas estão em lugares diferentes, e uma delas parece olhar para você.',
    'Por {d} anos você se afasta do Jianghu. Os conhecidos viram lenda; os desconhecidos, ancestrais de novas escolas.',
    'Num único respiro de {d} anos, você percebe que a técnica mais difícil é saber quando não sacar a espada.',
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
  bestas: 'O animal ao seu lado envelheceu devagar, de olhos meio fechados, atento aos passos que se aproximavam.',
  demoniaca: 'A sombra no canto do pavilhão se aquietou. Você não soube dizer se havia vencido ou apenas esperado.',
};

/** Texto do resultado ao sair da reclusão. */
export const RETIRO_EXIT: string[] = [
  'Você sai com poeira nos ombros e uma estranha calma. O mundo mudou, e você também.',
  'A luz da entrada machuca os olhos. Passaram-se {d} anos, e o primeiro cheiro de chuva vale por todos eles.',
  'Você empurra a porta. Do lado de fora, as árvores estão maiores, e as notícias, bem mais velhas.',
  'Ao sair, você descobre que perdeu alguns nomes e ganhou outros. Seus movimentos ficaram mais precisos, e a pressa, mais rara.',
  'A reclusão termina como começou: em silêncio. Mas o silêncio, agora, tem uma textura nova.',
];
