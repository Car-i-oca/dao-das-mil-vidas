import type { GameEvent } from '../../types';

/**
 * Lote 12 — O Torneio dos Cem Picos: arco encadeado de várias etapas (convite → preliminares →
 * oitavas → quartas → semifinal → final → consequências). Convenção do gênero: torneio com prêmios altos,
 * azarão, rival que reaparece e política entre seitas. Quem passa avança por agendamento (agenda).
 */
export const lote12Torneio: GameEvent[] = [
  {
    id: 'convite_torneio', title: 'O Convite do Torneio dos Cem Picos', rarity: 'raro', once: true, weight: 3,
    cond: { tierMin: 2, tierMax: 5, fameMin: 8 },
    text: 'Um mensageiro de manto vermelho entrega um convite lacrado em cera dourada: a cada cinquenta anos, as seitas do continente reúnem seus melhores em um torneio de cinco rodadas nos Cem Picos. O prêmio inclui um tesouro de seita, fama que atravessa reinos e a atenção de gente poderosa.',
    choices: [
      { text: 'Inscrever-se no torneio.', res: { text: 'Você assina o rolo de inscrição. A tinta, dizem, é feita de cinza de uma antiga lenda. A primeira rodada será em poucas semanas.', fx: { setFlags: ['torneio_inscrito'], agenda: [{ event: 'torneio_preliminares', em: [1, 2] }], xp: 4 } } },
      { text: 'Recusar: não vale o risco.', res: { text: 'O mensageiro suspira, enrola o convite e vai embora. Há quem diga que oportunidades como essa só passam uma vez.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'torneio_preliminares', title: 'Torneio: As Preliminares', rarity: 'raro', once: true,
    cond: { flags: ['torneio_inscrito'] },
    text: 'Cento e vinte inscritos, uma arena de pedra branca, árbitros de olhar severo. A rodada classificatória é rápida: cada um enfrenta três oponentes em sequência, sem intervalo. Os dezesseis melhores avançam às oitavas.',
    choices: [
      { text: 'Lutar com calma, conservando o fôlego.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você derrota os três sem pressa, poupando energia. Os árbitros anotam seu nome com um traço extra de tinta.', fx: { setFlags: ['torneio_r1'], fama: 4, agenda: [{ event: 'torneio_oitavas', em: [1, 2] }] } }, fail: { text: 'Você vence dois, mas perde o terceiro por um fio de cabelo. A arena o eliminará, um dia, de qualquer forma.', fx: { clearFlags: ['torneio_inscrito'], fama: 1, ferida: 2, stats: { dao: 1 } } } },
      { text: 'Lutar com tudo, mostrando força desde o começo.', check: { stat: ['fis', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'Três vitórias rápidas, e a arena inteira passa a falar do seu nome. O preço é o cansaço, que você sentirá nas rodadas seguintes.', fx: { setFlags: ['torneio_r1'], fama: 8, ferida: 1, agenda: [{ event: 'torneio_oitavas', em: [1, 2] }] } }, fail: { text: 'Você gasta energia demais na segunda luta e perde a terceira, exausto.', fx: { clearFlags: ['torneio_inscrito'], fama: 1, ferida: 3 } } },
    ],
  },
  {
    id: 'torneio_oitavas', title: 'Torneio: As Oitavas de Final', rarity: 'raro', once: true,
    cond: { flags: ['torneio_r1'] },
    text: 'Dezesseis lutadores restam. Seu adversário é um cultivador de olhos tranquilos e mãos grandes, conhecido por nunca ter sido derrubado em duelo público. A multidão aposta, a bandeira do seu nome é erguida na tribuna.',
    choices: [
      { text: 'Estudar o estilo dele antes da luta.', check: { stat: ['comp', 'esp'], dif: 1 }, ok: { text: 'Uma noite de observação, uma estratégia nova. Na arena, você cobre cada golpe dele antes de ele acabar de pensar. A vitória vem limpa.', fx: { setFlags: ['torneio_r2'], fama: 6, stats: { comp: 1 }, agenda: [{ event: 'torneio_quartas', em: [1, 2] }] } }, fail: { text: 'A estratégia não funciona: ele muda de estilo no meio da luta. Você perde com elegância, e aprende.', fx: { clearFlags: ['torneio_inscrito', 'torneio_r1'], fama: 2, ferida: 2, stats: { comp: 1 } } } },
      { text: 'Atacar de frente e confiar na sua técnica.', check: { stat: ['fis', 'dao', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'Uma luta feroz, quase cega. No último golpe, a mão grande hesita, e a sua não. A arena vem abaixo.', fx: { setFlags: ['torneio_r2'], fama: 8, ferida: 1, agenda: [{ event: 'torneio_quartas', em: [1, 2] }] } }, fail: { text: 'Ele é mais forte do que o previsto. Você cai na arena e se levanta com ajuda.', fx: { clearFlags: ['torneio_inscrito', 'torneio_r1'], ferida: 3, fama: 2 } } },
    ],
  },
  {
    id: 'torneio_quartas', title: 'Torneio: As Quartas de Final', rarity: 'raro', once: true,
    cond: { flags: ['torneio_r2'] },
    text: 'Oito lutadores permanecem. Nas quartas, você enfrenta um discípulo veterano que estudou suas vitórias anteriores.',
    choices: [
      { text: 'Mudar de ritmo e surpreender o veterano.', check: { stat: ['fis', 'comp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Sua mudança de ritmo quebra a defesa dele. Quatro lutadores seguem para as semifinais.', fx: { setFlags: ['torneio_r25'], fama: 8, agenda: [{ event: 'torneio_sabotagem', em: [1, 2] }, { event: 'torneio_semifinal', em: [1, 2] }] } }, fail: { text: 'O veterano lê sua estratégia e vence. Você sai da arena sem avançar, mas com o respeito dos árbitros.', fx: { clearFlags: ['torneio_inscrito', 'torneio_r1', 'torneio_r2'], fama: 3, ferida: 2 } } },
      { text: 'Apostar tudo em um golpe decisivo.', check: { stat: ['fis', 'esp'], dif: 3, tag: 'combate' }, ok: { text: 'Um único golpe encerra a luta. Quatro lutadores avançam às semifinais.', fx: { setFlags: ['torneio_r25'], fama: 10, ferida: 1, agenda: [{ event: 'torneio_sabotagem', em: [1, 2] }, { event: 'torneio_semifinal', em: [1, 2] }] } }, fail: { text: 'O veterano bloqueia seu golpe e aproveita a abertura. O torneio termina para você.', fx: { clearFlags: ['torneio_inscrito', 'torneio_r1', 'torneio_r2'], fama: 2, ferida: 3 } } },
    ],
  },
  {
    id: 'torneio_sabotagem', title: 'Torneio: O Aviso na Noite Anterior', rarity: 'raro', once: true, weight: 4,
    cond: { flags: ['torneio_r25'] },
    text: 'Na véspera da semifinal, alguém desliza um bilhete sob sua porta: "Seu chá está envenenado. Não beba." Seu chá, de fato, tem um cheiro estranho. Não há assinatura, só um selo de seita desconhecido.',
    choices: [
      { text: 'Descartar o chá e investigar quem escreveu o bilhete.', check: { stat: ['comp', 'sor'], dif: 2 }, ok: { text: 'Você identifica o sonífero e entrega o bilhete aos árbitros. Eles reforçam a segurança da semifinal, e a arena murmura seu nome com respeito renovado.', fx: { fama: 6, karma: 3, stats: { comp: 1 } } }, fail: { text: 'Você nunca descobre quem foi. Mas troca o chá e dorme com um olho aberto.', fx: { stats: { dao: 1 } } } },
      { text: 'Beber o chá para provar que não tem medo.', res: { text: 'O chá estava, de fato, adulterado com um sonífero fraco. Você luta atordoado na semifinal, mas com coragem.', fx: { ferida: 1, fama: 2, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'torneio_semifinal', title: 'Torneio: A Semifinal', rarity: 'raro', once: true,
    cond: { flags: ['torneio_r25'] },
    text: 'Quatro lutadores restam. Seu adversário é {rival}, ou alguém que combina com o tipo de rival que você teria: elegante, sorridente e com o mesmo brilho no olhar de quem sabe exatamente o que quer.',
    choices: [
      { text: 'Usar tudo o que aprendeu em todos esses anos.', check: { stat: ['fis', 'esp', 'dao', 'comp'], dif: 3, tag: 'combate' }, ok: { text: 'Uma das lutas mais longas da história do torneio. No fim, os dois estão de pé, ofegantes, e só um deles consegue dar o último passo. Você.', fx: { setFlags: ['torneio_r3'], fama: 12, ferida: 2, stats: { dao: 2 }, agenda: [{ event: 'torneio_final', em: [1, 2] }] } }, fail: { text: 'Por um golpe, por um passo, por um segundo. Você perde a semifinal com a cabeça erguida, e é aplaudido de pé.', fx: { clearFlags: ['torneio_inscrito', 'torneio_r1', 'torneio_r2', 'torneio_r25'], fama: 8, ferida: 3, setFlags: ['torneio_semifinalista'] } } },
      { text: 'Usar um Talismã de Escudo para ganhar uma chance a mais.', cond: { item: 'talisma_escudo' }, check: { stat: ['fis', 'esp', 'dao'], dif: 1 }, ok: { text: 'O talismã absorve o golpe que o derrubaria, e você contra-ataca no momento exato. A vitória é sua, e a arena nem sabe como.', fx: { removeItem: ['talisma_escudo'], setFlags: ['torneio_r3'], fama: 10, agenda: [{ event: 'torneio_final', em: [1, 2] }] } }, fail: { text: 'Mesmo com o talismã, a luta é difícil. Você perde, mas de pé.', fx: { removeItem: ['talisma_escudo'], clearFlags: ['torneio_inscrito', 'torneio_r1', 'torneio_r2', 'torneio_r25'], fama: 6, setFlags: ['torneio_semifinalista'] } } },
    ],
  },
  {
    id: 'torneio_final', title: 'Torneio: A Final nos Cem Picos', rarity: 'lendario', once: true,
    cond: { flags: ['torneio_r3'] },
    text: 'O estádio dos Cem Picos está lotado: dez mil vozes, mil bandeiras, nuvens roxas ao fundo. Seu adversário é uma lenda jovem, de aura gelada, que nunca perdeu em sua vida. Os anciãos das grandes seitas observam, de braços cruzados.',
    choices: [
      { text: 'Lutar com a alma inteira, sem poupar nada.', check: { stat: ['fis', 'esp', 'dao', 'comp'], dif: 5, tag: 'combate' }, ok: { text: 'O estádio treme. Quando o pó baixa, o adversário está de joelhos, e você de pé, trêmulo. Dez mil vozes gritam seu nome. O prêmio é seu.', fx: { setFlags: ['torneio_campeao'], clearFlags: ['torneio_inscrito'], fama: 30, pedras: 200, item: ['selo_campeao'], tecnica: ['golpe_campeao'], stats: { dao: 3, fis: 1, car: 2 }, xp: 14, ferida: 3, agenda: [{ event: 'torneio_depois', em: [1, 3] }] } }, fail: { text: 'Você luta como nunca, e perde por uma respiração. O adversário estende a mão, e o estádio inteiro aplaude de pé os dois. Vice-campeão dos Cem Picos: um título que ninguém esquece.', fx: { setFlags: ['torneio_vice'], clearFlags: ['torneio_inscrito'], fama: 20, pedras: 80, stats: { dao: 3, car: 1 }, ferida: 4, agenda: [{ event: 'torneio_depois', em: [1, 3] }] } } },
      { text: 'Propor ao adversário uma luta de tudo ou nada: o perdedor cede o prêmio.', check: { stat: ['car', 'dao'], dif: 4 }, ok: { text: 'O adversário sorri pela primeira vez. "Aceito." A luta é curta, intensa e justa. Você vence, e ele cumpre a palavra com um aperto de mão.', fx: { setFlags: ['torneio_campeao'], clearFlags: ['torneio_inscrito'], fama: 26, pedras: 260, item: ['selo_campeao'], stats: { dao: 3, car: 2 }, ferida: 3, agenda: [{ event: 'torneio_depois', em: [1, 3] }] } }, fail: { text: 'O adversário recusa: "Já está decidido." A luta, então, acontece pelos termos dele, e você perde com dignidade.', fx: { setFlags: ['torneio_vice'], clearFlags: ['torneio_inscrito'], fama: 16, ferida: 4, agenda: [{ event: 'torneio_depois', em: [1, 3] }] } } },
    ],
  },
  {
    id: 'torneio_depois', title: 'Depois do Torneio', rarity: 'raro', once: true,
    cond: { flags: ['torneio_campeao'] },
    text: 'Dias depois da final, seu quarto de estalagem se enche de visitas: emissários de seitas poderosas, mercadores com propostas e curiosos que só querem tocar a sua manga. Todos querem uma coisa: que você escolha um lado.',
    choices: [
      { text: 'Aceitar o convite da seita mais antiga, como Anciã honorária.', res: { text: 'Um título, um pavilhão e uma cadeira ao lado dos Anciãos. A seita ganha prestígio; você, recursos e uma vida mais calma.', fx: { faccao: 'seita', setFlags: ['membro_seita', 'discipulo_interno'], local: 'seita', pedras: 150, fama: 6, stats: { car: 1 } } } },
      { text: 'Recusar todos os convites e seguir como independente.', res: { text: 'Cada recusa é registrada, e cada registro vira lenda. "O campeão que não pertencia a ninguém." Você ri do apelido.', fx: { stats: { dao: 3 }, fama: 8, karma: 4 } } },
      { text: 'Aceitar a oferta de um mercador e abrir uma casa de treinamento.', res: { text: 'Uma pequena academia na cidade, com seu nome na porta. Jovens de todo o continente vêm treinar, e você aprende a ensinar.', fx: { pedras: 120, fama: 6, karma: 4, setFlags: ['tem_discipulo'], stats: { car: 2, comp: 1 } } } },
    ],
  },
];
