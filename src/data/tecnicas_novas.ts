import type { Technique } from '../types';

/**
 * Técnicas novas do lote "Técnicas que ditam o caminho": resultados de fusão (grau 3–4), métodos de seitas extintas
 * (cada um com a seita de origem, que o reconhece e o cobiça) e técnicas divinas raras.
 */
export const TECNICAS_NOVAS: Technique[] = [
  // Resultados de fusão
  { id: 'espada_de_qi', name: 'Espada de Qi Condensado', grade: 3, desc: 'O Qi vira lâmina: o corte não precisa de aço, só de intenção afinada.', stats: { esp: 1, dao: 1 }, tags: ['espada', 'qi', 'combate'] },
  { id: 'corpo_de_sutra', name: 'Corpo de Sutra Vivo', grade: 3, desc: 'Cada músculo recita o que a mente aprendeu: a carne vira escritura.', stats: { fis: 2, dao: 1 }, tags: ['corpo', 'mente'] },
  { id: 'selo_de_lamina', name: 'Selo da Lâmina Fechada', grade: 3, desc: 'Uma formação desenhada com o corte da espada: ela prende e fatia ao mesmo tempo.', stats: { comp: 1 }, tags: ['formacao', 'espada', 'combate'] },
  { id: 'fogo_vital', name: 'Fogo Vital', grade: 3, desc: 'A chama do caldeirão passa a queimar dentro do corpo: cura, tempera e refina ao mesmo tempo.', stats: { fis: 1, comp: 1 }, tags: ['alquimia', 'corpo'] },
  { id: 'veneno_de_alma', name: 'Veneno da Alma', grade: 3, desc: 'Toxina que não toca o corpo: apodrece a coragem, a lembrança, a vontade.', stats: { esp: 1, comp: 1 }, tags: ['veneno', 'mente', 'combate'] },
  { id: 'sombras_gemeas', name: 'Pacto das Sombras Gêmeas', grade: 3, desc: 'O companheiro e você passam a dividir uma só sombra: onde um está, o outro pode surgir.', stats: { sor: 1, esp: 1 }, tags: ['besta', 'fuga', 'combate'] },
  { id: 'corpo_carmesim', name: 'Corpo Carmesim', grade: 3, desc: 'O sangue vira armadura e arma: poder rápido, que cobra do juízo o que dá ao músculo.', stats: { fis: 2 }, tags: ['demonio', 'corpo', 'combate'] },
  { id: 'paisagem_interior', name: 'Paisagem Interior', grade: 4, desc: 'Uma formação desenhada dentro da própria consciência: um mundo de bolso que obedece ao dono.', stats: { esp: 2, comp: 2 }, tags: ['mente', 'formacao', 'juventude'] },
  // Métodos de seitas extintas (têm origem: a seita reconhece quem os usa)
  { id: 'palma_seita_extinta', name: 'Palma da Seita das Cinzas Verdes', grade: 2, desc: 'Método de uma seita varrida do mapa. Os poucos que o reconhecem choram, ou matam.', stats: { fis: 1 }, tags: ['combate', 'corpo'], origem: 'Seita das Cinzas Verdes' },
  { id: 'sutra_templo_afundado', name: 'Sutra do Templo Afundado', grade: 3, desc: 'Versos de um templo que o mar engoliu. Cada recitação traz um som de sino debaixo d’água.', stats: { dao: 2 }, tags: ['mente', 'qi'], origem: 'Templo do Sino Afogado' },
  { id: 'espada_nove_nevoas', name: 'Espada das Nove Névoas', grade: 3, desc: 'Nove cortes escondidos em névoa. A escola que a criou foi apagada numa noite só.', stats: { dao: 1, sor: 1 }, tags: ['espada', 'combate'], origem: 'Escola das Nove Névoas' },
  { id: 'caldeirao_anciao_cinzento', name: 'Caldeirão do Ancião Cinzento', grade: 3, desc: 'Técnica de alquimia de um pavilhão queimado: refina qualquer erva sem perder o nome dela.', stats: { comp: 2 }, tags: ['alquimia', 'forja'], origem: 'Pavilhão do Ancião Cinzento' },
  // Divinas e raras
  { id: 'lamina_unica', name: 'Dao da Lâmina Única', grade: 4, desc: 'Todas as espadas do mundo cabem num só golpe. Quem o dá, não precisa dar outro.', stats: { dao: 3, fis: 1 }, tags: ['espada', 'combate', 'mente'] },
  { id: 'mil_ciclos_corpo', name: 'Corpo dos Mil Ciclos', grade: 4, desc: 'Morrer e renascer na carne, mil vezes, sem perder o nome. Nenhuma ferida dura mais que uma noite.', stats: { fis: 3, dao: 1 }, tags: ['corpo', 'juventude'] },
  { id: 'trono_vazio', name: 'Sutra do Trono Vazio', grade: 4, desc: 'Sentar-se onde ninguém senta e deixar o mundo dobrar-se ao redor: poder de quem nada quer.', stats: { esp: 2, car: 2 }, tags: ['mente', 'qi'] },
  { id: 'rio_sem_margem', name: 'Rio Sem Margem', grade: 4, desc: 'O Qi corre sem leito: não se esgota, não se afoga, não obedece a mais ninguém que a você.', stats: { esp: 3, comp: 1 }, tags: ['qi', 'formacao'] },
];

/**
 * Fusões: duas técnicas (por id ou por etiqueta de domínio alto) viram uma nova, num evento de iluminação.
 * Cada fusão consome as duas originais e cobra um preço (ferimento, tempo ou risco).
 */
export interface Fusao {
  id: string;
  a: string;
  b: string;
  resultado: string;
  texto: string;
  preco: string;
}

export const FUSOES: Fusao[] = [
  { id: 'f_espada_qi', a: 'espada_orvalho', b: 'respiracao_nuvem', resultado: 'espada_de_qi', texto: 'A respiração da nuvem sobe pelo braço e sai pela espada, e o corte do orvalho passa a cortar mais longe do que o aço alcança.', preco: 'ferida' },
  { id: 'f_corpo_sutra', a: 'ossos_de_ferro', b: 'sutra_do_merito', resultado: 'corpo_de_sutra', texto: 'O corpo, temperado a martelo, aprende a recitar: cada golpe recebido vira uma sílaba, e o mérito escreve o resto.', preco: 'anos' },
  { id: 'f_selo_lamina', a: 'selo_primeiro_traco', b: 'espada_orvalho', resultado: 'selo_de_lamina', texto: 'Traço e corte se confundem: o selo é desenhado no ar com a ponta da espada e fecha-se sobre o inimigo.', preco: 'ferida' },
  { id: 'f_fogo_vital', a: 'caldeirao_calmo', b: 'ossos_de_ferro', resultado: 'fogo_vital', texto: 'A chama do caldeirão desce ao peito e passa a temperar a carne de dentro para fora.', preco: 'ferida' },
  { id: 'f_veneno_alma', a: 'mil_agulhas', b: 'mar_de_consciencia', resultado: 'veneno_de_alma', texto: 'A agulha deixa de tocar o corpo e entra pela memória: o veneno apodrece o que o inimigo mais acredita.', preco: 'karma' },
  { id: 'f_sombras', a: 'pacto_da_fera', b: 'passo_garca', resultado: 'sombras_gemeas', texto: 'O companheiro e você aprendem a ser a mesma sombra em dois lugares.', preco: 'anos' },
  { id: 'f_carmesim', a: 'caminho_do_sangue', b: 'ossos_de_ferro', resultado: 'corpo_carmesim', texto: 'O sangue sobe e endurece: carne e vermelho viram uma armadura que cobra em juízo o que dá em força.', preco: 'corrupcao' },
  { id: 'f_paisagem', a: 'mar_de_consciencia', b: 'selo_nove_portas', resultado: 'paisagem_interior', texto: 'Uma formação desenhada dentro da própria consciência: um mundo de bolso, com portas que só você abre.', preco: 'anos' },
];
