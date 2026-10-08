import type { GameEvent } from '../../types';

/** Mais vida de mortal (tier 0): reduz a repetição antes do despertar. */
export const juventude: GameEvent[] = [
  {
    id: 'caravana_mercadores', title: 'A Caravana dos Mercadores', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 8, ageMax: 20 },
    text: 'Uma caravana colorida chega a {vila}. Os mercadores trazem sedas, ervas secas e histórias de cidades onde as lanternas nunca apagam.',
    choices: [
      { text: 'Ajudar a descarregar as carroças.', res: { text: 'Costas doendo, bolso mais cheio. Um mercador piscou e disse: "Você tem braço bom."', fx: { pedras: 2, stats: { fis: 1 } } } },
      { text: 'Ouvir as histórias da estrada.', res: { text: 'Cidades de mármore, templos nas nuvens e gente que cura com agulhas. Sua cabeça fica cheia de mundo.', fx: { stats: { comp: 1, dao: 1 } } } },
      { text: 'Tentar uma barganha esperta.', check: { stat: 'car', dif: 0 }, ok: { text: 'Você leva uma pulseira de contas por quase nada, e o mercador ri e admite que perdeu.', fx: { pedras: 3, stats: { car: 1 } } }, fail: { text: 'O mercador é mais esperto. Você sai com uma lição e menos moedas.', fx: { pedras: -1, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'lobo_na_floresta', title: 'Olhos na Floresta', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 9, ageMax: 18 },
    text: 'Ao recolher lenha, você sente que é observado. Entre as árvores, dois olhos amarelos acompanham cada passo seu.',
    choices: [
      { text: 'Ficar imóvel e encarar de volta.', check: { stat: ['dao', 'sor'], dif: 0 }, ok: { text: 'O lobo hesita, abaixa a cabeça e some. Seu coração bate por uma hora, mas algo em você ficou mais firme.', fx: { stats: { dao: 2 } } }, fail: { text: 'O lobo avança. Você foge com a lenha pela metade e um arranhão no braço.', fx: { ferida: 1, stats: { fis: 1 } } } },
      { text: 'Voltar devagar pelo caminho conhecido.', res: { text: 'Prudência de quem quer chegar a velho. O lobo não o segue.', fx: { stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'professor_aldeia', title: 'O Professor da Aldeia', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 8, ageMax: 16 },
    text: 'Um velho professor, de mãos manchadas de tinta, ensina caligrafia embaixo de uma figueira. "Quem aprende a escrever", diz ele, "aprende a pensar."',
    choices: [
      { text: 'Sentar-se e aprender, ainda que atrasado.', check: { stat: 'comp', dif: -1 }, ok: { text: 'Os caracteres começam a fazer sentido. Meses depois, você lê um manual velho inteirinho.', fx: { stats: { comp: 2 } } }, fail: { text: 'Os caracteres embaralham. Mas o professor tem paciência de montanha.', fx: { stats: { comp: 1 } } } },
      { text: 'Preferir brincar com os amigos.', res: { text: 'A infância é curta, e o riso é parte do Dao também.', fx: { stats: { car: 1, sor: 1 } } } },
    ],
  },
  {
    id: 'tempestade_vila', title: 'A Grande Tempestade', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 8, ageMax: 22 },
    text: 'Uma tempestade monstruosa derruba o telhado do celeiro e ameaça levar a plantação. A {vila} inteira corre para salvar o que pode.',
    choices: [
      { text: 'Carregar sacos de grãos para um abrigo seguro.', check: { stat: 'fis', dif: 0 }, ok: { text: 'Você carrega peso de adulto até o amanhecer. Os vizinhos não esquecem.', fx: { stats: { fis: 2 }, karma: 3 } }, fail: { text: 'Você escorrega na lama e cai, mas se levanta rindo de si mesmo.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Ajudar os idosos a chegar ao abrigo.', res: { text: 'Mãos velhas apertando as suas. Algo morno se acomoda no peito.', fx: { karma: 6, stats: { car: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'ladrao_galinhas', title: 'O Ladrão de Galinhas', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 9, ageMax: 20 },
    text: 'Alguém tem roubado galinhas de {vila}. Uma noite, você o flagra: um menino menor que você, com fome nos olhos e uma galinha embaixo do braço.',
    choices: [
      { text: 'Denunciar o menino aos mais velhos.', res: { text: 'O menino é punido. A galinha volta ao galinheiro. Mas aquele olhar acompanha você.', fx: { karma: -2, stats: { dao: 1 }, morality: { order: 2, evil: 1 } } } },
      { text: 'Deixá-lo ir e levar uma galinha embora.', res: { text: 'Ele some entre as casas. Você mente que a galinha fugiu, e ninguém acredita, mas ninguém liga.', fx: { karma: 5, stats: { car: 1 }, morality: { evil: 1, chaos: 2 } } } },
      { text: 'Dividir seu jantar com ele.', res: { text: 'Vocês comem calados sob a lua. Anos depois, alguém dirá seu nome com carinho em outra aldeia.', fx: { karma: 8, stats: { dao: 1, car: 1 }, setFlags: ['gentil_na_infancia'], morality: { good: 3, order: 1 } } } },
    ],
  },
  {
    id: 'sonho_montanha', title: 'O Sonho da Montanha', rarity: 'raro', once: true,
    cond: { tierMax: 0, ageMin: 10, ageMax: 20 },
    text: 'Você sonha com uma montanha envolta em nuvens, onde figuras de branco meditam em silêncio. Ao acordar, sente a palma das mãos quente e um nome ecoando: um lugar, ou um chamado.',
    choices: [
      { text: 'Anotar o sonho e procurar a montanha.', res: { text: 'Você a procura em livros, mapas e conversas de viajantes. Não a encontra, mas aprende muito sobre o mundo.', fx: { stats: { comp: 1, dao: 1, sor: 1 }, setFlags: ['conhece_lendas'] } } },
      { text: 'Esquecer o sonho. É coisa de criança.', res: { text: 'Você o esquece. Quase.', fx: { stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'mestre_de_armas', title: 'O Velho Soldado', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 10, ageMax: 20 },
    text: 'Um velho soldado aposentado, de perna manca e olhar duro, ensina meninos a segurar uma lança. "Se quiser sobreviver", diz, "aprenda a não morrer primeiro."',
    choices: [
      { text: 'Treinar com ele até cair de cansaço.', check: { stat: ['fis', 'dao'], dif: 0 }, ok: { text: 'O velho murmura um "nada mal" que vale mais que elogios. Você aprende o equilíbrio de quem luta.', fx: { stats: { fis: 2, dao: 1 }, setFlags: ['treinou_com_soldado'] } }, fail: { text: 'Você leva uma bastonada que doeu por dias. Mas volta no dia seguinte.', fx: { ferida: 1, stats: { fis: 1, dao: 1 } } } },
      { text: 'Ficar só olhando de longe.', res: { text: 'Cada golpe que ele dá é uma lição que você roubou com os olhos.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'adivinha_cega', title: 'A Adivinha Cega', rarity: 'raro', once: true,
    cond: { tierMax: 0, ageMin: 11, ageMax: 22 },
    text: 'Uma velha cega, que dizem ver mais que os que têm olhos, segura sua mão e fica em silêncio. "Você vai morrer muitas vezes", sussurra. "E cada uma será diferente."',
    choices: [
      { text: 'Perguntar o que ela quer dizer.', res: { text: '"Nada que eu possa explicar", sorri a velha. "Mas lembre-se de sorrir de vez em quando."', fx: { stats: { dao: 2, sor: 1 } } } },
      { text: 'Rir e sair, sem acreditar.', res: { text: 'Você ri. Mas a frase gruda como carrapicho no fundo da memória.', fx: { stats: { sor: 1 } } } },
    ],
  },
];
