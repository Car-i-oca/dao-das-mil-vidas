import type { GameEvent } from '../../types';

/**
 * Lote 11 — Ecos das vidas passadas.
 * Quem você foi na vida anterior vira lenda neste mundo: {eco} é o nome do personagem anterior,
 * {eco_final} o final que ele teve, {eco_trilha} a trilha que seguiu e {eco_tecnica} a técnica mais alta que dominou.
 * Só aparecem quando existe uma vida anterior registrada (flag tem_eco).
 */
const ECO = { flags: ['tem_eco'] };

export const lote11Ecos: GameEvent[] = [
  {
    id: 'lapide_do_antecessor', title: 'A Lápide de {eco}', rarity: 'raro', once: true, weight: 1,
    cond: { ...ECO, tierMin: 1, ageMin: 20 },
    text: 'Numa colina, entre pinheiros, uma lápide de pedra gasta traz um nome que lhe soa estranhamente familiar: {eco}. Os aldeões contam que foi cultivador do "{eco_trilha}" e que partiu em "{eco_final}". Algo em seu peito reconhece o nome, sem saber por quê.',
    choices: [
      { text: 'Acender incenso e prestar respeito.', res: { text: 'A fumaça sobe reta, como se alguém a puxasse. Um silêncio manso desce sobre a colina. Você sai com a estranha certeza de ter sido ouvido.', fx: { karma: 5, stats: { dao: 2 }, xp: 8 } } },
      { text: 'Vasculhar o túmulo em busca do que ele deixou.', check: { stat: ['sor', 'comp'], dif: 2 }, ok: { text: 'Sob uma pedra solta, uma bolsinha de couro com moedas antigas e uma pílula. Quem enterrou {eco} não tinha pressa em guardar tudo.', fx: { pedras: 70, item: ['pilula_qi_media'], karma: -3 } }, fail: { text: 'Nada além de terra e raízes. O vento sopra mais frio que antes.', fx: { karma: -3, stats: { sor: -1 } } } },
      { text: 'Seguir adiante: túmulos alheios não são problema seu.', res: { text: 'Você desce a colina sem olhar para trás. O nome, no entanto, vai atrás de você por alguns dias.', fx: {} } },
    ],
  },
  {
    id: 'tecnica_do_antecessor', title: 'As Notas de {eco}', rarity: 'raro', once: true, weight: 1,
    cond: { ...ECO, tierMin: 2 },
    text: 'Num sebo de cidade, um velho livreiro entrega um caderno surrado: "Notas de um cultivador, {eco}. Poucos entendem a letra. Os que entendem, dizem, aprendem a técnica que ele mais amava: {eco_tecnica}."',
    choices: [
      { text: 'Comprar o caderno e estudá-lo (30 pedras).', custo: 30, check: { stat: ['comp', 'dao'], dif: 2, tag: 'mente' }, ok: { text: 'Por semanas, você decifra a letra. Cada página parece um conselho de alguém que já passou por tudo o que você enfrentará. As lições entram com facilidade, como se fossem suas.', fx: { xp: 22, stats: { comp: 2, dao: 1 } } }, fail: { text: 'A letra é difícil. Você capta um terço do conteúdo, e o resto fica como promessa.', fx: { xp: 8, stats: { comp: 1 } } } },
      { text: 'Folhear no balcão e devolver.', res: { text: 'O livreiro assente, sem insistir. Uma frase do caderno ecoa na sua memória: "Não pare, mesmo quando o caminho fingir que acabou."', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'discipulos_do_antecessor', title: 'Os Órfãos de {eco}', rarity: 'raro', once: true, weight: 1,
    cond: { ...ECO, tierMin: 2, ageMin: 30 },
    text: 'Três jovens de olhar firme esperam na porta da sua casa. "Fomos alunos de {eco}", diz o mais velho, "até a morte dele. Sentimos algo em você. Como se ele tivesse voltado. Aceita nos ensinar?"',
    choices: [
      { text: 'Aceitar os três como discípulos.', res: { text: 'As primeiras semanas são caóticas, e depois não imagina a vida sem eles. Cada lição que você dá parece ter sido ensinada a você antes, em outro tempo.', fx: { karma: 8, fama: 4, stats: { car: 2, dao: 1 }, setFlags: ['tem_discipulo'] } } },
      { text: 'Recusar, dizendo que não é {eco}.', res: { text: 'Eles curvam a cabeça, entendem e vão embora. Anos depois, você ainda pensa neles, e no que poderia ter sido.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },
  {
    id: 'lenda_de_eco', title: 'A Balada de {eco}', rarity: 'comum', cooldown: 50, weight: 2,
    cond: { ...ECO, tierMin: 1 },
    text: 'Numa estalagem, um menestrel de laúde desafinado canta uma balada sobre {eco}, um cultivador do "{eco_trilha}" que acabou em "{eco_final}". Metade dos versos é mentira, e a outra metade é pior.',
    choices: [
      { text: 'Corrigir o menestrel, com a verdade.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O menestrel arregala os olhos e anota, às pressas, tudo o que você diz. A balada, daqui em diante, será mais honesta, e muito mais bonita.', fx: { fama: 4, karma: 3, stats: { car: 1 } } }, fail: { text: 'Ninguém acredita em você. O menestrel continua, e o público ri alto.', fx: { stats: { car: 1 } } } },
      { text: 'Pagar uma moeda e ouvir a balada até o fim.', res: { text: 'É uma balada ruim, mas há um verso, só um, que soa estranhamente verdadeiro. Você o guarda.', fx: { pedras: -1, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'inimigo_do_antecessor', title: 'O Velho Inimigo de {eco}', rarity: 'raro', once: true, weight: 1,
    cond: { ...ECO, tierMin: 3, ageMin: 40 },
    text: 'Um cultivador de manto cinza, com o rosto marcado por uma cicatriz antiga, o encara de longe. "Eu conheci {eco}. Tive contas a acertar com ele, e ele morreu antes de eu cobrar. Você tem os mesmos olhos."',
    choices: [
      { text: 'Duelar com ele em nome de quem veio antes.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Depois de uma luta longa, o cultivador baixa a lâmina, ofegante. "Era isso. Podia ter acabado assim há trinta anos." Ele se vai, em paz.', fx: { fama: 8, stats: { dao: 2 }, xp: 10 } }, fail: { text: 'Você perde, e o cultivador, sem prazer, vai embora. "Tenho idade demais para esse tipo de coisa."', fx: { ferida: 3, fama: -2 } } },
      { text: 'Dizer que você não é {eco} e que não tem dívida alguma.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'O cultivador pensa por um longo tempo. "É verdade. Os mortos levam suas dívidas." Ele estende a mão, e a rixa antiga termina ali.', fx: { karma: 8, stats: { dao: 2, car: 1 } } }, fail: { text: 'O cultivador não acredita. A luta começa, dura e silenciosa.', fx: { ferida: 2, fama: -1 } } },
    ],
  },
  {
    id: 'espelho_de_eco', title: 'O Lago Que Mostra Quem Você Foi', rarity: 'lendario', once: true, weight: 4,
    cond: { ...ECO, tierMin: 4 },
    text: 'Num lago de águas imóveis, onde nenhum vento toca, seu reflexo vira outro: {eco}, no último dia de sua vida, a morrer em "{eco_final}". Ele o olha de dentro da água e diz, sem som, uma única frase.',
    choices: [
      { text: 'Ler os lábios e ouvir o que {eco} quer dizer.', check: { stat: ['dao', 'esp', 'comp'], dif: 5, tag: 'mente' }, ok: { text: '"Não repita meus erros. Repita meus acertos." A água se agita, o reflexo volta a ser seu, e você sai do lago com a sensação de ter sido perdoado por alguém que nunca conheceu.', fx: { stats: { dao: 4, comp: 2, esp: 1 }, xp: 24, karma: 6 } }, fail: { text: 'Os lábios são rápidos demais. O reflexo some, e você fica com a certeza de ter perdido algo importante.', fx: { stats: { dao: 2 } } } },
      { text: 'Quebrar o reflexo atirando uma pedra.', res: { text: 'A água treme e se acalma. Nunca mais há um reflexo ali. Nem o seu.', fx: { stats: { dao: -1 }, karma: -2 } } },
    ],
  },
];
