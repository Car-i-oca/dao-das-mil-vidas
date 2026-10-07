import type { GameEvent } from '../../types';

/** Eventos específicos de cada trilha de cultivo (expansão). */
export const trilhas: GameEvent[] = [
  /* ===== Consciência ===== */
  {
    id: 'mar_da_consciencia', title: 'Mergulho no Mar da Consciência', rarity: 'comum', cooldown: 12,
    cond: { tierMin: 1, tierMax: 7, path: ['alma'] },
    text: 'Você fecha os olhos e desce em si mesmo: um mar escuro, cheio de lembranças que brilham como peixes. Mais fundo, algo muito grande se move.',
    choices: [
      { text: 'Descer até o fundo.', check: { stat: ['esp', 'dao'], dif: 2, tag: 'mente' }, ok: { text: 'Você toca o leito do mar e o encontra: uma pérola de consciência pura. Ao voltar, o mundo parece mais nítido.', fx: { xp: 16, stats: { esp: 2, dao: 1 } } }, fail: { text: 'A pressão esmaga seus pensamentos. Você emerge zonzo, com sangue no nariz.', fx: { ferida: 1, xp: 4 } } },
      { text: 'Nadar na superfície, organizando memórias.', res: { text: 'Pouca profundidade, muito aprendizado. Memórias esquecidas voltam úteis.', fx: { xp: 9, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'projecao_de_alma', title: 'A Alma Que Viaja', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7, path: ['alma'] },
    text: 'Pela primeira vez, sua consciência deixa o corpo. Você flutua sobre telhados e montanhas, tão leve que um suspiro poderia desfazê-la.',
    choices: [
      { text: 'Espionar uma seita rival.', check: { stat: ['esp', 'sor'], dif: 3, tag: 'mente' }, ok: { text: 'Você descobre onde guardam seus tesouros e as fraquezas de seus mestres. Informação vale ouro.', fx: { pedras: 50, fama: 3, stats: { esp: 1 } } }, fail: { text: 'Um Ancião sente sua presença e o atinge com uma agulha de consciência. Você volta ao corpo gritando.', fx: { ferida: 2, stats: { esp: -1 } } } },
      { text: 'Voar até a casa da sua infância.', res: { text: 'Lá estão as paredes, o cheiro do arroz, o riso de quem você amou. Você chora sem corpo, e acorda leve.', fx: { stats: { dao: 2 }, karma: 3 } } },
    ],
  },
  {
    id: 'ilusionista_mestre', title: 'O Mestre das Ilusões', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['alma', 'formacoes'] },
    text: 'Um ancião cego desafia você: "Quem enxerga com os olhos é enganado com facilidade. Mostre-me que vê com o espírito."',
    choices: [
      { text: 'Aceitar o desafio de ilusões.', check: { stat: ['esp', 'comp'], dif: 3, tag: 'mente' }, ok: { text: 'Cada ilusão cai uma por uma. O ancião sorri e lhe entrega um manual.', fx: { item: ['manual_agulha_alma'], xp: 14, stats: { esp: 2 } } }, fail: { text: 'Você se perde em um labirinto de rostos. Acorda horas depois, com sede e humildade.', fx: { ferida: 1, stats: { dao: 1 } } } },
    ],
  },

  /* ===== Formações ===== */
  {
    id: 'estudo_geomancia', title: 'Feng Shui do Vale', rarity: 'comum', cooldown: 12,
    cond: { tierMin: 1, tierMax: 7, path: ['formacoes'] },
    text: 'Você percorre um vale lendo o fluxo de Qi: onde a água encontra a pedra, onde o vento cruza os pinheiros. Algo debaixo do chão chama sua atenção.',
    choices: [
      { text: 'Medir e mapear o terreno por semanas.', check: { stat: 'comp', dif: 2, tag: 'formacao' }, ok: { text: 'Você localiza um veio espiritual raso e o explora com cuidado.', fx: { pedras: 40, xp: 10, stats: { comp: 1 } } }, fail: { text: 'O mapa sai impreciso. Mas você aprende a desconfiar da própria pressa.', fx: { xp: 4, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'defender_cidade_formacao', title: 'A Muralha Invisível', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['formacoes'] },
    text: 'O governador de uma cidade ameaçada por bestas implora que você desenhe uma formação de defesa. Prazo: sete dias. Recurso: o que houver.',
    choices: [
      { text: 'Desenhar a formação com tudo o que sabe.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'formacao' }, ok: { text: 'Na sétima noite, a muralha invisível se acende. As bestas batem e recuam. A cidade chora de alívio.', fx: { fama: 14, pedras: 70, karma: 10, item: ['pincel_formacoes'] } }, fail: { text: 'A formação funciona pela metade. A cidade resiste, mas com perdas.', fx: { fama: 3, karma: 4, ferida: 1 } } },
      { text: 'Cobrar adiantado e partir.', res: { text: 'O governador paga o que você pediu. A cidade que se vire.', fx: { pedras: 60, karma: -8 } } },
    ],
  },
  {
    id: 'veio_espiritual', title: 'Veio Espiritual Escondido', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['formacoes', 'sopro'] },
    text: 'Sob um pico esquecido, você sente um veio espiritual de grande densidade. Com uma formação coletora, ele poderia sustentar uma seita inteira.',
    choices: [
      { text: 'Montar a formação e reivindicar o veio.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'formacao' }, ok: { text: 'O veio canta sob a formação. Você tem agora um refúgio pessoal onde o Qi flui como rio.', fx: { xp: 30, stats: { esp: 2, comp: 1 }, setFlags: ['veio_proprio'], pedras: 20 } }, fail: { text: 'A formação desaba quando o veio muda de curso. Fica só a lição.', fx: { xp: 8, ferida: 1 } } },
      { text: 'Compartilhar a descoberta com a vila mais próxima.', res: { text: 'A vila prospera. O nome de quem avisou vira lenda entre camponeses.', fx: { karma: 12, fama: 6, stats: { dao: 2 } } } },
    ],
  },

  /* ===== Mérito (budista) ===== */
  {
    id: 'mosteiro_na_neve', title: 'O Mosteiro na Neve', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 6, path: ['budista'] },
    text: 'Depois de três dias de neve, você bate à porta de um mosteiro esquecido. Um monge de olhos serenos lhe oferece chá e uma pergunta: "O que você quer largar?"',
    choices: [
      { text: 'Responder com sinceridade: "Meu orgulho."', res: { text: 'O monge assente e o ensina o Punho do Vajra: um golpe que nasce do desapego.', fx: {  stats: { dao: 2 }, xp: 14, karma: 4 } } },
      { text: 'Responder: "Nada. Quero é aprender a lutar."', check: { stat: ['dao', 'car'], dif: 1 }, ok: { text: 'O monge ri baixo. "Honesto. Fique um inverno."', fx: { stats: { dao: 1, fis: 1 }, xp: 10, item: ['manual_punho_vajra'] } }, fail: { text: 'O monge só serve mais chá. Você parte sem lição, mas com o estômago quente.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'dilema_do_merito', title: 'O Preço do Mérito', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 6, path: ['budista'] },
    text: 'Uma aldeia sofre com a seca. Os aldeões pedem sua ajuda: mover rios espirituais exige um mês de meditação sem descanso e deixa o corpo exausto.',
    choices: [
      { text: 'Meditar um mês pelo bem da aldeia.', check: { stat: ['dao', 'fis'], dif: 1, tag: 'mente' }, ok: { text: 'A chuva volta. Crianças riem na lama. O mérito acumulado se acomoda em você como luz.', fx: { karma: 15, fama: 4, xp: 8, stats: { dao: 2 } } }, fail: { text: 'Você desmaia no vigésimo dia, mas a chuva chega assim mesmo, tímida.', fx: { karma: 8, ferida: 2, stats: { dao: 1 } } } },
      { text: 'Recusar: tem seu próprio caminho.', res: { text: 'Cada passo foi seu, e cada recusa também.', fx: { karma: -3, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'cem_dias_silencio', title: 'Cem Dias de Silêncio', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['budista', 'sopro'] },
    text: 'Um voto antigo: cem dias sem pronunciar uma palavra, comendo só o que a terra dá. Nos primeiros dias, o barulho dos pensamentos é ensurdecedor.',
    choices: [
      { text: 'Cumprir o voto até o fim.', check: { stat: 'dao', dif: 2, tag: 'mente' }, ok: { text: 'No centésimo dia, o barulho cessa. Você ouve o próprio coração como o ritmo do mundo.', fx: { anos: 1, xp: 20, stats: { dao: 4, comp: 1 } } }, fail: { text: 'No sexagésimo dia você quebra o voto num grito. Recomeçar custa orgulho.', fx: { anos: 1, xp: 6, stats: { dao: 1 } } } },
    ],
  },

  /* ===== Venenos ===== */
  {
    id: 'colher_ervas_toxicas', title: 'O Jardim das Sombras', rarity: 'comum', cooldown: 8,
    cond: { tierMin: 1, tierMax: 7, path: ['venenos'] },
    text: 'No pântano, ervas de cores impossíveis crescem entre ossos de animais. Aqui, cada folha é uma ferramenta; cada gota, um segredo.',
    choices: [
      { text: 'Colher com luvas e paciência.', check: { stat: ['comp', 'sor'], dif: 1, tag: 'veneno' }, ok: { text: 'Você volta com sacos de ervas raras e extrai delas um veneno perfeito e um antídoto.', fx: { item: ['veneno_sete_noites', 'antidoto_sete_ervas'], xp: 6 } }, fail: { text: 'Um pólen traiçoeiro queima seus pulmões. Você escapa tossindo sangue.', fx: { ferida: 2, xp: 3 } } },
    ],
  },
  {
    id: 'encomenda_assassino', title: 'Uma Encomenda Discreta', rarity: 'raro', cooldown: 25,
    cond: { tierMin: 1, tierMax: 6, path: ['venenos'] },
    text: 'Um estranho de capuz coloca uma bolsa pesada sobre a mesa. "Um mercador. Sem barulho. Sem rastros." Seu veneno é famoso, e sua reputação também.',
    choices: [
      { text: 'Aceitar o contrato.', check: { stat: ['comp', 'sor'], dif: 2, tag: 'veneno' }, ok: { text: 'O mercador cai dormindo e não acorda. Ninguém suspeita de você. A bolsa pesa mais que a consciência.', fx: { pedras: 90, karma: -18, corr: 6, fama: -2 } }, fail: { text: 'O mercador tinha um antídoto. Guardas perseguem você por três dias.', fx: { ferida: 2, karma: -10, fama: -6 } } },
      { text: 'Recusar e denunciar o estranho.', res: { text: 'O estranho some antes que os guardas cheguem. A cidade lhe agradece à distância.', fx: { karma: 8, fama: 3 } } },
    ],
  },
  {
    id: 'imunidade_por_dose', title: 'Doses Cada Vez Maiores', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['venenos'] },
    text: 'Para conquistar imunidade, você precisa ingerir doses crescentes do seu próprio veneno, durante meses, à beira da morte.',
    choices: [
      { text: 'Seguir o regime rigoroso.', check: { stat: ['fis', 'dao'], dif: 3 }, ok: { text: 'Seu sangue fica doce e escuro. Você agora passeia por jardins que matam outros.', fx: { stats: { fis: 3, dao: 2 }, xp: 14, setFlags: ['imune_venenos'] } }, fail: { text: 'Uma dose passa do ponto. Você sobrevive, em agonia, por pura teimosia.', fx: { ferida: 3, stats: { fis: 1 } } } },
      { text: 'Recusar. Fica só com antídotos.', res: { text: 'Prudência. O caminho dos venenos tem muitos mortos que foram corajosos demais.', fx: { stats: { comp: 1 } } } },
    ],
  },

  /* ===== Bestas ===== */
  {
    id: 'ovo_da_fera', title: 'O Ovo na Neblina', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 5, path: ['bestas'] },
    text: 'Num ninho abandonado, um ovo do tamanho de uma cabeça pulsa em luz morna. A mãe parece ter morrido há dias.',
    choices: [
      { text: 'Chocar o ovo com seu próprio Qi.', check: { stat: ['esp', 'sor'], dif: 1, tag: 'besta' }, ok: { text: 'A casca racha numa noite de chuva. Uma criatura pequena abre os olhos e o chama de mãe, pai, e amigo.', fx: { item: ['ovo_fera_espiritual'], setFlags: ['besta_companheira'], stats: { esp: 2, sor: 1 }, karma: 6, agenda: [{ event: 'besta_companheira_cresce', em: [8, 18] }] } }, fail: { text: 'O ovo esfria antes de eclodir. Você chora sem vergonha e o enterra com honras.', fx: { stats: { dao: 1, esp: 1 } } } },
      { text: 'Levar o ovo e vender na cidade.', res: { text: 'Colecionadores pagam muito. A pergunta "e se?" fica com você.', fx: { pedras: 60, karma: -6 } } },
    ],
  },
  {
    id: 'cacada_com_besta', title: 'Caçando em Dupla', rarity: 'comum', cooldown: 8,
    cond: { tierMin: 1, tierMax: 6, path: ['bestas'] },
    text: 'Sua fera companheira fareja algo que você não sente: um cervo de chifres de cristal, mais valioso do que parece.',
    choices: [
      { text: 'Seguir o instinto da fera.', check: { stat: ['esp', 'sor'], dif: 1, tag: 'besta' }, ok: { text: 'Vocês sincronizam passos. O cervo cai, e seus chifres rendem uma fortuna.', fx: { pedras: 30, item: ['nucleo_besta_baixo'], xp: 8, stats: { esp: 1 } } }, fail: { text: 'O cervo escapa e a fera volta emburrada. Pelo menos vocês dividem a decepção.', fx: { xp: 3, stats: { esp: 1 } } } },
    ],
  },
  {
    id: 'besta_em_perigo', title: 'O Grito da Fera', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['pacto_besta'] },
    text: 'Seu companheiro uiva no meio da noite. Caçadores de núcleos o cercaram numa clareira e o prendem com correntes de ferro frio.',
    choices: [
      { text: 'Lutar para libertá-lo.', check: { stat: ['fis', 'esp'], dif: 3, tag: 'combate' }, ok: { text: 'Você derruba os caçadores um a um. A fera se levanta e vocês fogem juntos sob a lua.', fx: { fama: 6, karma: 8, stats: { esp: 2, dao: 2 }, xp: 10 } }, fail: { text: 'Os caçadores são fortes. Você ganha tempo para que a fera escape, ferido.', fx: { ferida: 3, karma: 4, stats: { dao: 1 } } } },
    ],
  },

  /* ===== Caminho do Sangue ===== */
  {
    id: 'banquete_de_sangue', title: 'O Banquete de Essência', rarity: 'comum', cooldown: 12,
    cond: { tierMin: 1, path: ['demoniaca'] },
    text: 'Um bandido capturado, vivo e algemado, espera no porão. Suo método pede essência vital. Os pecados dele já foram julgados; os seus, ainda não.',
    choices: [
      { text: 'Drenar a essência do bandido.', res: { text: 'O poder sobe como fogo. Você sente o gosto metálico do sucesso e a sombra em seus olhos.', fx: { xp: 20, corr: 10, karma: -8 } } },
      { text: 'Libertá-lo e buscar outro caminho.', check: { stat: 'dao', dif: 1, tag: 'mente' }, ok: { text: 'O bandido foge. Você sente sua fome, mas também uma estranha leveza.', fx: { corr: -6, karma: 4, stats: { dao: 2 } } }, fail: { text: 'A fome vence. Você hesita, e na hesitação ele morre de qualquer jeito.', fx: { corr: 6, karma: -4 } } },
    ],
  },
  {
    id: 'inquisidor_da_seita', title: 'O Inquisidor', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7, corrMin: 20 },
    text: 'Um inquisidor de manto branco o encontra numa noite sem luar. "Sua aura fede a sangue. Venha comigo, ou eu o levarei."',
    choices: [
      { text: 'Lutar contra o inquisidor.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'O inquisidor cai. Sua fama sombria dobra e a seita dele agora o procura.', fx: { fama: 8, karma: -10, corr: 8, xp: 15, setFlags: ['matou_inquisidor'] } }, fail: { text: 'Ele é melhor do que você. Mas, por algum motivo, hesita antes do golpe final e se afasta.', fx: { ferida: 3, fama: -4 } } },
      { text: 'Render-se e aceitar a purificação.', res: { text: 'Meses de rituais gélidos. Você sai mais leve, mais lúcido e menos poderoso.', fx: { corr: -30, karma: 6, xp: -8, stats: { dao: 2 }, faccao: 'errante' } } },
      { text: 'Usar um Talismã de Fuga.', cond: { item: 'talisma_fuga' }, res: { text: 'Uma luz azul, e o inquisidor ruge para o ar vazio.', fx: { removeItem: ['talisma_fuga'] } } },
    ],
  },
];
