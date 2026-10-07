import type { GameEvent } from '../../types';

/**
 * Lote 6 — Budismo, mérito e a Peregrinação ao Oeste.
 * Convenções: samsara e os seis reinos, mantras e koans, mérito/karma, votos, demônios disfarçados,
 * e as provações da peregrinação (inspiradas em Jornada ao Oeste, com personagens e lugares originais).
 */
export const lote6Oeste: GameEvent[] = [
  /* ===== Peregrinação ao Oeste ===== */
  {
    id: 'chamado_peregrinacao', title: 'O Chamado do Templo do Oeste', rarity: 'raro', once: true, weight: 2,
    cond: { tierMin: 2, tierMax: 7, karmaMin: 5 },
    text: 'Um monge de pés descalços e rosto de pedra bate à sua porta com uma carta lacrada em cera de abelha. "O Templo do Oeste guarda as escrituras que o mundo esqueceu. Poucos têm coração para chegar lá. Dizem que você tem."',
    choices: [
      { text: 'Aceitar a peregrinação.', res: { text: 'Você prepara uma trouxa, um cajado e um voto de paciência. A estrada é longa e as provações, numerosas.', fx: { setFlags: ['peregrino'], agenda: [{ event: 'peregrinacao_rio_areias', em: [1, 3] }] } } },
      { text: 'Recusar: seu caminho é outro.', res: { text: 'O monge agradece e parte. Há quem diga que ele nunca pede duas vezes.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'peregrinacao_rio_areias', title: 'O Rio das Areias Que Fluem', rarity: 'raro', once: true,
    cond: { flags: ['peregrino'] },
    text: 'Na primeira etapa, um rio de areia fina, brilhante e sem margem corta o caminho. Não se pode nadar, não se pode voar: quem tenta é puxado para baixo. Um barqueiro de pele de cobre cobra a passagem em silêncio.',
    choices: [
      { text: 'Pagar a passagem com pedras (30 pedras).', custo: 30, res: { text: 'O barqueiro leva você de um lado a outro sem uma palavra. A travessia dura uma tarde, ou um ano.', fx: { setFlags: ['peregrinacao_1'], agenda: [{ event: 'peregrinacao_prisioneiro', em: [1, 2] }], xp: 4 } } },
      { text: 'Atravessar contando só com sua mente.', check: { stat: ['dao', 'esp'], dif: 3, tag: 'mente' }, ok: { text: 'Você entende que a areia só tem poder sobre quem acredita no fundo. Caminha sobre ela, leve, até o outro lado.', fx: { setFlags: ['peregrinacao_1'], stats: { dao: 2 }, xp: 10, agenda: [{ event: 'peregrinacao_prisioneiro', em: [1, 2] }] } }, fail: { text: 'A areia o engole até a cintura. O barqueiro, com um suspiro, o puxa, cobra em dobro e o leva.', fx: { pedras: -30, ferida: 1, setFlags: ['peregrinacao_1'], agenda: [{ event: 'peregrinacao_prisioneiro', em: [1, 2] }] } } },
    ],
  },
  {
    id: 'peregrinacao_prisioneiro', title: 'O Prisioneiro da Montanha', rarity: 'raro', once: true,
    cond: { flags: ['peregrinacao_1'] },
    text: 'Presa sob uma montanha de pedra, uma criatura de pelo castanho e olhos faiscantes grita por socorro. "Ajude-me, peregrino! Estou aqui há quinhentos anos por uma brincadeira que dei no Céu!" A brincadeira, você suspeita, não foi tão inocente.',
    choices: [
      { text: 'Libertar a criatura.', check: { stat: ['fis', 'esp'], dif: 3 }, ok: { text: 'A montanha se parte ao meio. A criatura salta, ri e promete servir você pelo resto da estrada. Ela fala demais, mas luta bem.', fx: { setFlags: ['peregrinacao_2', 'companheiro_travesso'], karma: 6, stats: { fis: 1, sor: 1 }, agenda: [{ event: 'peregrinacao_demonio_disfarcado', em: [1, 2] }] } }, fail: { text: 'A montanha não cede. Você volta mais tarde com ferramentas melhores, e a criatura, agradecida mas calada, junta-se a você.', fx: { setFlags: ['peregrinacao_2', 'companheiro_travesso'], ferida: 1, karma: 4, agenda: [{ event: 'peregrinacao_demonio_disfarcado', em: [1, 2] }] } } },
      { text: 'Deixar a criatura onde está: castigo é castigo.', res: { text: 'A criatura xinga você por três dias. A estrada segue, mais silenciosa.', fx: { setFlags: ['peregrinacao_2'], karma: -2, stats: { dao: 1 }, agenda: [{ event: 'peregrinacao_demonio_disfarcado', em: [1, 2] }] } } },
    ],
  },
  {
    id: 'peregrinacao_demonio_disfarcado', title: 'A Velha da Estalagem', rarity: 'raro', once: true,
    cond: { flags: ['peregrinacao_2'] },
    text: 'Numa estalagem solitária, uma velha de mãos finas serve chá de jasmim. Algo nos gestos dela está errado: cada movimento é perfeito demais. Seus olhos, quando acha que ninguém vê, brilham em dourado doentio.',
    choices: [
      { text: 'Recusar o chá e fingir estar cansado.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'mente' }, ok: { text: 'Você a observa pela noite. Ao amanhecer, um demônio de pele pálida tenta atacar, e você já o esperava. O demônio foge, uivando.', fx: { setFlags: ['peregrinacao_3'], fama: 6, xp: 10, agenda: [{ event: 'peregrinacao_reino_fome', em: [1, 2] }] } }, fail: { text: 'Você bebe um gole. A visão turva, mas o companheiro, se houver, o arrasta para fora. A peregrinação segue, mais cansada.', fx: { setFlags: ['peregrinacao_3'], ferida: 2, agenda: [{ event: 'peregrinacao_reino_fome', em: [1, 2] }] } } },
      { text: 'Confrontar a velha abertamente.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'Ela se revela, uivando. O demônio cai, e a estalagem se desfaz em fumaça. Você leva as moedas que sobraram.', fx: { setFlags: ['peregrinacao_3'], pedras: 40, fama: 8, agenda: [{ event: 'peregrinacao_reino_fome', em: [1, 2] }] } }, fail: { text: 'O demônio é astuto. Você sai ferido e furioso, e a velha some entre uma cortina de névoa.', fx: { setFlags: ['peregrinacao_3'], ferida: 3, agenda: [{ event: 'peregrinacao_reino_fome', em: [1, 2] }] } } },
    ],
  },
  {
    id: 'peregrinacao_reino_fome', title: 'O Reino dos Espíritos Famintos', rarity: 'raro', once: true,
    cond: { flags: ['peregrinacao_3'] },
    text: 'No quarto trecho, a estrada atravessa um reino onde nada cresce. Espíritos de pescoço fino e barriga inchada rondam, com bocas minúsculas que nunca saciam. Eles imploram em silêncio por qualquer migalha.',
    choices: [
      { text: 'Oferecer sua comida e rezar por eles.', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'Um a um, os espíritos comem a oferenda e se dissolvem em luz. Cada um deixa uma fagulha de gratidão em você.', fx: { setFlags: ['peregrinacao_4'], karma: 14, stats: { dao: 2 }, xp: 8, agenda: [{ event: 'peregrinacao_templo_oeste', em: [1, 3] }] } }, fail: { text: 'A comida acaba antes dos espíritos. Alguns ficam, olhando, e você os carrega na consciência pelo resto da jornada.', fx: { setFlags: ['peregrinacao_4'], karma: 6, stats: { dao: 1 }, agenda: [{ event: 'peregrinacao_templo_oeste', em: [1, 3] }] } } },
      { text: 'Seguir adiante sem se deixar tocar.', res: { text: 'Você atravessa o reino de olhos baixos. O peso dos pedidos ressoa por dias.', fx: { setFlags: ['peregrinacao_4'], karma: -4, stats: { dao: -1 }, agenda: [{ event: 'peregrinacao_templo_oeste', em: [1, 3] }] } } },
    ],
  },
  {
    id: 'peregrinacao_templo_oeste', title: 'O Templo do Oeste', rarity: 'lendario', once: true,
    cond: { flags: ['peregrinacao_4'] },
    text: 'Depois de anos, você chega: um templo branco no topo de uma colina de nuvens. Um velho monge de rosto sem idade o recebe no portão. "As escrituras são suas, se você responder a uma pergunta: o que você deixou pelo caminho?"',
    choices: [
      { text: '"Nada. Cada passo foi parte de mim."', check: { stat: ['dao', 'esp', 'comp'], dif: 7, tag: 'mente' }, ok: { text: 'O monge sorri e some no vento. Num instante, você entende que o templo nunca existiu, e que a peregrinação era o templo. A luz o envolve, sem peso e sem fim.', fx: { fim: 'iluminacao' } }, fail: { text: 'O monge assente. "Quase." Ele lhe entrega uma escritura, fecha os olhos e some. A estrada de volta é mais curta que a ida.', fx: { item: ['escritura_oeste'], stats: { dao: 4, comp: 2 }, xp: 18, karma: 10 } } },
      { text: '"O orgulho e o medo."', check: { stat: ['dao', 'car'], dif: 4, tag: 'mente' }, ok: { text: '"Resposta de quem andou." O monge lhe entrega a escritura com as duas mãos, e uma bênção.', fx: { item: ['escritura_oeste'], stats: { dao: 3, comp: 2 }, xp: 14, karma: 10 } }, fail: { text: 'O monge sorri com ternura. "Volte na próxima vida." Ele fecha o portão com suavidade.', fx: { stats: { dao: 2 }, karma: 6 } } },
    ],
  },

  /* ===== Prática e mérito ===== */
  {
    id: 'mantra_cem_mil', title: 'Cem Mil Recitações', rarity: 'comum', cooldown: 25,
    cond: { tierMin: 1, tierMax: 7 },
    text: 'Um mestre antigo propõe um exercício: recitar um mantra cem mil vezes, contando em contas de madeira, sem pressa e sem parar. O tédio, ele garante, é o primeiro demônio.',
    choices: [
      { text: 'Recitar com todo o foco, por meses.', check: { stat: ['dao', 'esp'], dif: 1, tag: 'mente' }, ok: { text: 'Em algum ponto, o mantra para de ser palavras e vira respiração. Você sai calmo e vasto.', fx: { anos: 1, xp: 14, stats: { dao: 2 } } }, fail: { text: 'A mente divaga e o mantra vira ruído. Você aprende o valor da paciência pela falta dela.', fx: { anos: 1, xp: 5, stats: { dao: 1 } } } },
      { text: 'Fazer apenas mil recitações por dia durante um mês.', res: { text: 'Um bom hábito, e nada além disso. Seus pensamentos assentam, como poeira em água parada.', fx: { xp: 8, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'koan_do_mestre', title: 'A Pergunta Sem Resposta', rarity: 'raro', cooldown: 50,
    cond: { tierMin: 2, tierMax: 7 },
    text: 'Um mestre idoso, sentado sob um pinheiro retorcido, faz uma pergunta sem resposta: "Qual era o som da sua mão antes de você nascer?" Ele espera, de olhos fechados.',
    choices: [
      { text: 'Responder com silêncio.', check: { stat: ['dao', 'esp'], dif: 3, tag: 'mente' }, ok: { text: 'O mestre abre um olho e sorri. "A única resposta honesta." A lição se instala em você como pedra no leito de um rio.', fx: { stats: { dao: 3, comp: 1 }, xp: 14 } }, fail: { text: 'O mestre balança a cabeça. "Pensou demais." Mas o silêncio que sobra tem seu valor.', fx: { stats: { dao: 1 } } } },
      { text: 'Responder com uma gargalhada.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'O mestre ri junto. "Você entendeu mais do que parece." Ele lhe oferece chá.', fx: { stats: { dao: 2, car: 1 }, karma: 3 } }, fail: { text: 'O mestre fecha a cara. "Riso falso."', fx: { stats: { dao: 1 } } } },
      { text: 'Pedir que ele explique o sentido da pergunta.', res: { text: '"Se eu explicar, destruo a pergunta." Ele ri, e você se afasta pensativo.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'oferenda_templo', title: 'A Oferenda ao Templo', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 7, pedrasMin: 20 },
    text: 'Um templo humilde, no sopé de uma colina, precisa de reparos. As telhas caem, os monges dormem no chão. Eles nunca pediram nada, mas todos sabem do estado do lugar.',
    choices: [
      { text: 'Doar 40 pedras para os reparos.', custo: 40, res: { text: 'Em semanas, o telhado é refeito. Os monges oferecem chá, e um incenso que o acompanha por meses.', fx: { karma: 12, fama: 3, item: ['incenso_sagrado'], stats: { dao: 1 } } } },
      { text: 'Trabalhar com as mãos nos reparos.', res: { text: 'Pregos, tábuas e suor. Você dorme como não dormia há anos.', fx: { karma: 8, stats: { fis: 1, dao: 1 }, ferida: -1 } } },
      { text: 'Seguir viagem sem se envolver.', res: { text: 'O telhado cai um pouco mais. Você nunca saberá o quanto.', fx: { karma: -2 } } },
    ],
  },
  {
    id: 'voto_nao_matar', title: 'O Voto de Não Matar', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 6, karmaMin: 0, noFlags: ['voto_pacifico'] },
    text: 'Um monge propõe: "Faça o voto de não tirar vidas por um século. Quem o faz carrega o peso de cada ação, mas também a leveza de nunca ter sangue nas mãos."',
    choices: [
      { text: 'Fazer o voto.', res: { text: 'Uma pequena cerimônia de incenso. A partir de hoje, cada luta será mais difícil, e cada vitória, mais pura.', fx: { setFlags: ['voto_pacifico'], karma: 10, stats: { dao: 3 }, agenda: [{ event: 'quebra_do_voto', em: [30, 80] }] } } },
      { text: 'Recusar: o mundo não perdoa quem não luta.', res: { text: 'O monge assente sem julgar. "O mundo ensina caminhos diferentes."', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'quebra_do_voto', title: 'O Voto Posto à Prova', rarity: 'raro', once: true,
    cond: { flags: ['voto_pacifico'] },
    text: 'Um assassino, sedento e cruel, cerca uma criança diante de você. Matá-lo é a única maneira rápida de proteger a vida dela. O voto pesa como uma montanha nas costas.',
    choices: [
      { text: 'Quebrar o voto e matar o assassino.', res: { text: 'A criança vive. O voto se desfaz em cinzas. Você nunca mais será o mesmo, e talvez nunca devesse.', fx: { karma: 8, clearFlags: ['voto_pacifico'], stats: { dao: -2 }, fama: 4 } } },
      { text: 'Manter o voto e tentar deter o assassino sem matar.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'Uma luta exaustiva e precisa. O assassino é desarmado e preso, a criança vive, e o voto se mantém inteiro.', fx: { karma: 24, fama: 10, stats: { dao: 4, fis: 1 }, ferida: 2 } }, fail: { text: 'O assassino escapa, ferindo a criança. O voto fica de pé, mas a culpa também.', fx: { karma: 4, ferida: 3, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'seis_reinos_visao', title: 'A Visão dos Seis Reinos', rarity: 'lendario', once: true,
    cond: { tierMin: 3, karmaMin: 10 },
    text: 'Numa noite de meditação profunda, o chão se abre em um espelho de seis camadas: deuses, titãs, humanos, animais, espíritos famintos e seres dos infernos. Cada um o encara com a mesma dor e o mesmo anseio.',
    choices: [
      { text: 'Olhar cada reino com compaixão.', check: { stat: ['dao', 'esp'], dif: 5, tag: 'mente' }, ok: { text: 'Você chora, em silêncio, pelos seis. Ao fim, o espelho se desfaz, e algo em seu peito se abre: uma compreensão sobre o ciclo que sustenta tudo.', fx: { stats: { dao: 5, esp: 2 }, xp: 25, karma: 20 } }, fail: { text: 'A visão é grande demais. Você desmaia e acorda dias depois, com a memória vaga e o coração mais mole.', fx: { ferida: 2, stats: { dao: 2 }, karma: 6 } } },
      { text: 'Fechar os olhos e esperar que passe.', res: { text: 'A visão se desfaz, e fica uma vontade imensa de olhar de novo.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'fantasma_faminto', title: 'O Fantasma Faminto', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 1, tierMax: 7 },
    text: 'Na estrada de volta, um fantasma de rosto contraído pede um pouco de comida. Os aldeões vizinhos o evitam. A fome dele é só fome, não maldade.',
    choices: [
      { text: 'Realizar um pequeno rito de oferenda.', check: { stat: ['dao', 'esp'], dif: 1, tag: 'mente' }, ok: { text: 'O fantasma come a oferenda em silêncio, depois sorri e se dissolve. A estrada parece mais clara.', fx: { karma: 8, stats: { dao: 1 }, xp: 4 } }, fail: { text: 'O rito é desajeitado, mas a intenção conta. O fantasma agradece à sua maneira e some.', fx: { karma: 4 } } },
      { text: 'Ignorar e seguir viagem.', res: { text: 'Você sente os olhos dele nas suas costas por um tempo.', fx: { karma: -2 } } },
    ],
  },
  {
    id: 'bodhisattva_mendigo', title: 'O Mendigo Que Não Era', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 1, tierMax: 7 },
    text: 'Um mendigo imundo, de pés rachados, pede esmola à beira da estrada. Você sente algo estranho: uma presença que não combina com os trapos. Poucos o notam; menos ainda lhe dão atenção.',
    choices: [
      { text: 'Dar tudo o que carrega consigo (todas as pedras).', res: { text: 'O mendigo ri. "Tolo e raro." Ele toca sua testa, e você sente o peso do mundo se dissolver por um instante. Quando abre os olhos, ele sumiu, e suas pedras estão de volta, junto com uma bênção.', fx: { item: ['tigela_mendicante'], karma: 20, stats: { dao: 3, sor: 2 }, xp: 14 } } },
      { text: 'Dar algumas moedas e seguir.', res: { text: 'O mendigo sorri, sem surpresa. "Obrigado."', fx: { pedras: -3, karma: 3 } } },
      { text: 'Desviar o olhar.', res: { text: 'Uma risada baixa o acompanha por vários passos.', fx: { karma: -3, stats: { sor: -1 } } } },
    ],
  },
  {
    id: 'vajra_despertar', title: 'O Corpo de Diamante Desperta', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, path: ['budista', 'corpo'] },
    text: 'Depois de décadas de treino, você sente a pele ficar fria e dura como jade. Um monge mais velho, de olhos faiscantes, sorri: "Seu corpo de vajra está acordando. Agora, aprenda a não se apegar a ele."',
    choices: [
      { text: 'Treinar três meses no pátio, sob o sol.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'corpo' }, ok: { text: 'O corpo se transforma como um metal que aprende a respirar. Nada mais o arranha do mesmo jeito.', fx: { item: ['rosario_vajra'],  stats: { fis: 3, dao: 2 }, xp: 14 } }, fail: { text: 'O corpo reclama, e o desconforto é grande, mas há progresso.', fx: { stats: { fis: 1, dao: 1 }, ferida: 2, xp: 6 } } },
    ],
  },
  {
    id: 'transferencia_merito', title: 'Transferir o Mérito', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 2, tierMax: 8, karmaMin: 15 },
    text: 'Uma mulher idosa, à beira da morte, vê em você a esperança de um bom renascimento para o filho, que sofreu muito. "Pode transferir um pouco do seu mérito para ele?"',
    choices: [
      { text: 'Transferir uma parte do mérito acumulado.', res: { text: 'Uma luz suave deixa seu peito e alcança o jovem a muitas léguas. A velha sorri e se vai em paz. Seu karma diminui, e sua alma se aquece.', fx: { karma: -12, stats: { dao: 3, car: 1 }, xp: 10 } } },
      { text: 'Recusar: mérito se constrói, não se doa.', res: { text: 'A velha assente, resignada. A paz do momento passa rápido.', fx: { stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'monge_corrompido', title: 'O Monge e a Sombra', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7 },
    text: 'Num templo de belos jardins, um monge idoso, adorado pelo povo, esconde um segredo: seu cultivo é alimentado por uma coleção de almas aprisionadas em tigelas de bronze. Só você vê a sombra que o acompanha.',
    choices: [
      { text: 'Confrontá-lo em particular, oferecendo uma chance de redenção.', check: { stat: ['dao', 'car'], dif: 4, tag: 'mente' }, ok: { text: 'O velho chora. Em semanas, ele liberta as almas e se retira em penitência. O templo nunca saberá a verdade.', fx: { karma: 20, fama: 6, stats: { dao: 3 }, xp: 14 } }, fail: { text: 'O velho se enfurece e ataca. Você escapa, ferido, com a verdade como única arma.', fx: { ferida: 3, karma: 4, fama: -2 } } },
      { text: 'Expor o monge diante de todos.', check: { stat: ['car', 'comp'], dif: 3 }, ok: { text: 'O templo se enche de gritos. O monge é expulso, e as almas são libertadas, mas a fé do povo se abala por anos.', fx: { fama: 10, karma: 12 } }, fail: { text: 'Ninguém acredita em você. O monge sorri e o expulsa do templo.', fx: { fama: -8, karma: 2 } } },
      { text: 'Fingir que nada viu.', res: { text: 'O silêncio é cúmplice. Você sai do templo com a sombra do monge atrás de você, por algum tempo.', fx: { karma: -10, corr: 4, stats: { dao: -2 } } } },
    ],
  },
  {
    id: 'pagode_sete_andares', title: 'O Pagode de Sete Andares', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, tierMax: 8 },
    text: 'Um pagode de sete andares se ergue no meio de um lago de névoa. Dizem que cada andar encerra uma lição: Desejo, Raiva, Orgulho, Medo, Dúvida, Apego e Vazio. Quem sobe até o topo ganha o direito de pedir uma coisa.',
    choices: [
      { text: 'Subir os sete andares.', check: { stat: ['dao', 'esp', 'comp'], dif: 5, tag: 'mente' }, ok: { text: 'Cada andar é uma batalha contra si. No topo, uma figura de luz pergunta o que você quer. Você pede paz e a recebe.', fx: { xp: 30, stats: { dao: 4, esp: 2 }, karma: 10, anos: 1, vida: 30 } }, fail: { text: 'Você cai no quarto andar, tonto de medo. Desce, aprendendo o nome do que o derrubou.', fx: { ferida: 2, stats: { dao: 2 }, xp: 8 } } },
      { text: 'Subir só até o terceiro andar, o do Orgulho, e descer.', res: { text: 'Um passo sábio: quem enfrenta o orgulho cedo costuma poupar anos de dor.', fx: { stats: { dao: 2 }, xp: 8 } } },
    ],
  },
  {
    id: 'arvore_bodhi', title: 'A Árvore da Iluminação', rarity: 'lendario', once: true, weight: 3,
    cond: { tierMin: 4, karmaMin: 20 },
    text: 'Num vale esquecido, uma figueira de folhas em forma de coração cresce sozinha. Uma lenda diz que quem se sentar sob ela por quarenta e nove dias, sem se mover, alcança um entendimento que nenhum mestre pode ensinar.',
    choices: [
      { text: 'Sentar sob a árvore por quarenta e nove dias.', check: { stat: ['dao', 'esp', 'comp'], dif: 6, tag: 'mente' }, ok: { text: 'No quadragésimo nono dia, as folhas caem em silêncio. O mundo passa a ser uma só coisa. Você levanta, sorrindo, mudado em tudo.', fx: { stats: { dao: 6, esp: 3, comp: 3 }, xp: 40, karma: 20, anos: 1 } }, fail: { text: 'Sua mente divaga no trigésimo dia. Você se levanta, em paz com a falha, e um pouco mais sábio.', fx: { stats: { dao: 2 }, xp: 14, anos: 1 } } },
      { text: 'Apenas contemplar a árvore e seguir.', res: { text: 'Uma folha cai sobre seu ombro. Você a guarda, como um selo de um encontro.', fx: { stats: { dao: 1 }, karma: 2 } } },
    ],
  },
  {
    id: 'jardim_lotos', title: 'O Jardim dos Lótus', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 1, tierMax: 8 },
    text: 'Um templo escondido entre montanhas tem um lago coberto de lótus rosados. Os monges oferecem hospedagem e silêncio. Não pedem nada, e é difícil não querer devolver algo.',
    choices: [
      { text: 'Ficar uma estação, meditando junto aos monges.', res: { text: 'O chá é simples, o ritmo é lento e o silêncio, rico. Você parte descansado e límpido.', fx: { anos: 1, xp: 10, stats: { dao: 1, esp: 1 }, ferida: -2 } } },
      { text: 'Agradecer e seguir viagem, levando uma flor de lótus.', res: { text: 'A flor dura uma semana, e a lembrança, bem mais.', fx: { stats: { dao: 1 }, karma: 2 } } },
    ],
  },
  {
    id: 'sino_meia_noite', title: 'O Sino da Meia-Noite', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 1, tierMax: 7, local: ['montanha', 'seita'] },
    text: 'Toda noite, à meia-noite, um sino distante soa por sete vezes. Ninguém sabe de onde vem. Quem o ouve em meditação, dizem, entra em estados raros de atenção.',
    choices: [
      { text: 'Meditar durante o toque do sino.', check: { stat: ['esp', 'dao'], dif: 1, tag: 'mente' }, ok: { text: 'Cada badalada abre um espaço. Entre a quinta e a sexta, o tempo para por um momento.', fx: { xp: 12, stats: { esp: 1, dao: 1 } } }, fail: { text: 'A mente vagueia e o sino vira só um som. Mas o hábito de ouvir se firma.', fx: { xp: 4 } } },
      { text: 'Tentar rastrear a origem do som.', check: { stat: ['comp', 'sor'], dif: 3 }, ok: { text: 'Você descobre um templo esquecido, onde um sino de bronze balança sozinho. Um monge fantasma sorri e o agradece.', fx: { karma: 6, xp: 8, item: ['incenso_sagrado'] } }, fail: { text: 'O som some quando você se aproxima. Fica a dúvida, que também ensina.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'cavern_mil_budas', title: 'A Caverna dos Mil Budas', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 2, tierMax: 8, local: ['montanha', 'ruinas', 'selva'] },
    text: 'Numa falésia, uma caverna enorme guarda mil estátuas de pedra, cada uma em uma postura diferente, todas sorrindo com a mesma calma. Dentro, o ar é frio e perfumado.',
    choices: [
      { text: 'Sentar diante de uma estátua e meditar por semanas.', check: { stat: ['dao', 'comp'], dif: 3, tag: 'mente' }, ok: { text: 'Uma das estátuas parece sorrir mais que as outras. Em sua base, você encontra um pequeno pergaminho com um mantra raro.', fx: { stats: { dao: 2, comp: 1 }, xp: 14 } }, fail: { text: 'As estátuas permanecem em silêncio. Mas o ambiente acalma, e a mente acompanha.', fx: { xp: 6, stats: { dao: 1 } } } },
      { text: 'Estudar os afrescos nas paredes.', check: { stat: 'comp', dif: 2 }, ok: { text: 'Cenas das vidas passadas de um buda, narradas em cores. Você aprende mais de narrativa que de método.', fx: { xp: 10, stats: { comp: 2 } } }, fail: { text: 'Os afrescos são antigos e desbotados. Pouco se aproveita.', fx: { xp: 3 } } },
    ],
  },
];
