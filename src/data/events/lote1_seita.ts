import type { GameEvent } from '../../types';

/**
 * Lote 1 — Vida na seita: hierarquia (externo → interno → núcleo), mérito, anciãos, Casa da Punição,
 * rivalidade entre irmãos marciais e sucessão. Fontes de convenções: ver docs/pesquisa.md.
 */
export const lote1Seita: GameEvent[] = [
  {
    id: 'dormitorio_externo', title: 'O Dormitório dos Discípulos Externos', rarity: 'comum', once: true,
    cond: { tierMin: 1, tierMax: 2, faction: ['seita'], flags: ['discipulo_externo'], noFlags: ['discipulo_interno'] },
    text: 'Vinte discípulos externos dividem um salão de esteiras. Falta cobertor, sobra ronco. O dono da esteira ao lado, um rapaz magro, tenta esconder que está com fome.',
    choices: [
      { text: 'Dividir seu pão com ele.', res: { text: 'Ele chora de vergonha e de gratidão. Naquela mesma noite, você descobre que as amizades do dormitório valem mais que os cobertores.', fx: { karma: 4, stats: { car: 1 }, setFlags: ['amigo_do_dormitorio'] } } },
      { text: 'Fingir que não percebeu.', res: { text: 'A fome alheia incomoda mais do que você esperava, mas é a sua barriga que você alimenta.', fx: { stats: { dao: 1 } } } },
      { text: 'Vender seu pão a ele pelo triplo do preço.', res: { text: 'Ele paga. Você tem o dinheiro e uma sensação esquisita no estômago.', fx: { pedras: 3, karma: -3 } } },
    ],
  },
  {
    id: 'pontos_de_merito', title: 'O Balcão de Mérito', rarity: 'comum', cooldown: 12,
    cond: { tierMin: 1, tierMax: 5, faction: ['seita'] },
    text: 'No Pavilhão de Mérito, um velho contador troca pontos por recursos: pílulas, manuais, uma sala de cultivo por uma semana. As filas são longas e o ábaco nunca erra.',
    choices: [
      { text: 'Trocar por uma Pílula do Mérito (30 pedras em créditos).', custo: 30, res: { text: 'O contador carimba o recibo e entrega um frasco escuro. "Gaste com juízo."', fx: { item: ['pilula_merito'] } } },
      { text: 'Pedir uma semana na sala de cultivo (20 pedras).', custo: 20, check: { stat: ['comp', 'esp'], dif: 0, tag: 'qi' }, ok: { text: 'Sete dias de silêncio e Qi denso. Você sai com a cabeça leve e a bolsa vazia.', fx: { xp: 16, stats: { esp: 1 } } }, fail: { text: 'A sala é boa, mas sua mente divaga. Sete dias valeram metade do esperado.', fx: { xp: 7 } } },
      { text: 'Guardar os pontos para depois.', res: { text: 'O contador anota. Pontos guardados não rendem juros, mas também não se perdem.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'anciao_injusto', title: 'O Ancião Injusto', rarity: 'comum', once: true,
    cond: { tierMin: 1, tierMax: 3, faction: ['seita'], flags: ['discipulo_externo'] },
    text: 'O Ancião de Tarefas atribui a você o dobro do serviço por uma falta que não cometeu: derrubaram um vaso e a culpa caiu sobre o menos protegido.',
    choices: [
      { text: 'Aceitar em silêncio.', res: { text: 'Você cumpre a punição sem reclamar. O Ancião nem nota. Mas alguém viu, e se lembrará.', fx: { stats: { dao: 2 }, karma: 1 } } },
      { text: 'Protestar e apresentar o verdadeiro culpado.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'Você expõe a verdade com calma e provas. O Ancião engole o orgulho e muda o castigo.', fx: { fama: 3, karma: 3, stats: { car: 1 } } }, fail: { text: 'O Ancião se enfurece com a insolência. A punição dobra, e o culpado de verdade ri às suas costas.', fx: { ferida: 1, fama: -2, setFlags: ['inimigo_anciao'] } } },
      { text: 'Denunciar o Ancião ao Mestre da Seita.', check: { stat: 'car', dif: 3 }, ok: { text: 'O Mestre ouve. O Ancião é repreendido. Você ganha admiração e um inimigo discreto.', fx: { fama: 6, setFlags: ['inimigo_anciao'], stats: { dao: 1 } } }, fail: { text: 'Ninguém acredita em um discípulo externo. Você é chamado de intrigante.', fx: { fama: -5, setFlags: ['inimigo_anciao'] } } },
    ],
  },
  {
    id: 'rival_interno', title: 'O Irmão Marcial Competitivo', rarity: 'comum', once: true,
    cond: { tierMin: 1, tierMax: 4, faction: ['seita'] },
    text: '{rival}, discípulo da mesma geração, treina sempre ao seu lado e nunca perde a chance de dizer quem avança mais rápido. A competição é saudável, até o dia em que deixa de ser.',
    choices: [
      { text: 'Aceitar a rivalidade e competir sem ódio.', res: { text: 'Vocês se empurram para cima sem se destruir. Em cada metro de progresso, um olha para o outro.', fx: { xp: 10, stats: { dao: 1 }, setFlags: ['rival_interno'], agenda: [{ event: 'rival_interno_desafio', em: [8, 20] }] } } },
      { text: 'Ignorá-lo e focar no seu caminho.', res: { text: 'Você o trata como vento de verão. Ele se irrita com a indiferença.', fx: { stats: { dao: 2 }, setFlags: ['rival_interno'], agenda: [{ event: 'rival_interno_desafio', em: [10, 25] }] } } },
      { text: 'Sabotar discretamente os treinos dele.', check: { stat: ['car', 'sor'], dif: 1 }, ok: { text: 'Pequenos incidentes atrasam {rival}. Ninguém desconfia de você.', fx: { karma: -6, xp: 4, setFlags: ['rival_interno', 'sabotou_rival'], agenda: [{ event: 'rival_interno_desafio', em: [8, 20] }] } }, fail: { text: 'Pego em flagrante, você é advertido em público. {rival} sorri, vitorioso.', fx: { fama: -5, karma: -6, setFlags: ['rival_interno', 'sabotou_rival'], agenda: [{ event: 'rival_interno_desafio', em: [8, 20] }] } } },
    ],
  },
  {
    id: 'rival_interno_desafio', title: 'O Desafio de {rival}', rarity: 'raro', once: true,
    cond: { tierMin: 2, faction: ['seita'], flags: ['rival_interno'] },
    text: '{rival} sobe ao pátio de duelos e anuncia, diante de toda a {seita}: "Um duelo oficial. O perdedor serve ao vencedor por um ano."',
    choices: [
      { text: 'Aceitar o desafio.', check: { stat: ['fis', 'dao', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'Um duelo duro. No fim, {rival} cai de joelhos. Você recusa o serviço dele, mas o respeito fica.', fx: { fama: 8, stats: { dao: 2 }, xp: 10, setFlags: ['venceu_rival_interno'] } }, fail: { text: 'Você perde. O ano de serviço pesa, mas você aprende como {rival} pensa em batalha.', fx: { fama: -3, ferida: 2, stats: { dao: 1, comp: 1 }, setFlags: ['perdeu_para_rival_interno'] } } },
      { text: 'Propor um duelo de formações em vez de lutas.', cond: { stat: { comp: 14 } }, check: { stat: 'comp', dif: 1, tag: 'formacao' }, ok: { text: 'O pátio se enche de runas. Você vence com cabeça e calma.', fx: { fama: 6, stats: { comp: 2 }, setFlags: ['venceu_rival_interno'] } }, fail: { text: 'A formação desaba. {rival} ri com educação.', fx: { fama: -2, stats: { comp: 1 } } } },
      { text: 'Recusar, aceitando a vergonha.', res: { text: 'O pátio murmura. O desprezo de {rival} cola em você como lama.', fx: { fama: -6, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'ranking_da_seita', title: 'O Quadro de Ranking', rarity: 'comum', cooldown: 18,
    cond: { tierMin: 2, tierMax: 5, faction: ['seita'], flags: ['discipulo_interno'] },
    text: 'O quadro de ranking é atualizado a cada cinco anos. Seu nome aparece na posição 47 entre os discípulos internos. Acima de você, os mais fortes; abaixo, os que querem seu lugar.',
    choices: [
      { text: 'Desafiar o 30º colocado.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você sobe dezessete posições de uma vez. Os rivais passam a observá-lo com cuidado.', fx: { fama: 7, xp: 6, stats: { dao: 1 } } }, fail: { text: 'Você perde com dignidade e uma costela trincada.', fx: { ferida: 2, fama: -1 } } },
      { text: 'Treinar em silêncio e esperar o próximo ciclo.', res: { text: 'Cinco anos passam, e sua posição muda sozinha. Quem treina calado costuma surpreender.', fx: { xp: 12, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'caverna_privada', title: 'Uma Caverna Só Sua', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 5, faction: ['seita'], flags: ['discipulo_interno'], noFlags: ['caverna_privada'] },
    text: 'Seus méritos acumulados dão direito a uma caverna de cultivo particular numa encosta da {seita}. O Qi é fino, mas constante, e o silêncio é de ouro.',
    choices: [
      { text: 'Aceitar a caverna e passar a cultivar nela.', res: { text: 'A entrada tem uma placa com seu nome. Dentro, uma esteira, uma lamparina e um espaço que parece feito para o seu Qi.', fx: { setFlags: ['caverna_privada'], xp: 8, stats: { esp: 1 } } } },
      { text: 'Doar a vaga a um discípulo mais necessitado.', res: { text: 'O Ancião levanta a sobrancelha. "Raro ver generosidade nestas montanhas." Você ganha aliados e uma fama estranha.', fx: { karma: 10, fama: 4, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'cultivo_na_caverna', title: 'Anos na Caverna Privada', rarity: 'comum', cooldown: 10,
    cond: { tierMin: 2, tierMax: 6, flags: ['caverna_privada'], faction: ['seita'] },
    text: 'A caverna da encosta é sua casa há tempos. A rocha ao redor guarda o seu Qi como uma tigela guarda sopa.',
    choices: [
      { text: 'Retiro de cinco anos.', check: { stat: ['dao', 'comp'], dif: 1, tag: 'qi' }, ok: { text: 'Cinco anos sem notícias. Você sai mais forte e um pouco mais estranho.', fx: { anos: 5, xp: 24, stats: { dao: 1, esp: 1 } } }, fail: { text: 'O retiro é conturbado por pensamentos teimosos, mas rende o suficiente.', fx: { anos: 5, xp: 11 } } },
      { text: 'Cultivar um ano e voltar ao mundo.', res: { text: 'Um ano calmo, meditações e algumas visitas de amigos.', fx: { anos: 1, xp: 9 } } },
    ],
  },
  {
    id: 'mestre_ensina_tecnica', title: 'A Lição do Mestre', rarity: 'raro', cooldown: 30, weight: 3,
    cond: { tierMin: 2, tierMax: 7, faction: ['seita'], flags: ['mestre_protetor'] },
    text: 'O Mestre {mentor} o chama para o pavilhão particular. "Hoje você aprende algo que poucos veem. Mas ele cobra atenção."',
    choices: [
      { text: 'Estudar a Respiração Coletiva.', check: { stat: ['comp', 'esp'], dif: 1, tag: 'qi' }, ok: { text: 'O método une sua respiração à de todo o pavilhão. Você sente o mundo inspirar com você.', fx: { tecnica: ['respiracao_coletiva'], xp: 12, stats: { comp: 1 } } }, fail: { text: 'Você capta apenas um pedaço. O Mestre promete ensinar o resto "mais tarde".', fx: { xp: 6, stats: { comp: 1 } } } },
      { text: 'Pedir o Guarda do Portão, técnica de defesa.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'corpo' }, ok: { text: 'Uma técnica de pés plantados e coração firme. Você se sente imóvel como o próprio portão.', fx: { tecnica: ['guarda_do_portao'], stats: { fis: 1, dao: 1 } } }, fail: { text: 'O Mestre ri da sua pressa. Você terá de voltar quando o corpo estiver pronto.', fx: { xp: 4 } } },
    ],
  },
  {
    id: 'mestre_pede_favor', title: 'O Favor do Mestre', rarity: 'raro', once: true, weight: 8,
    cond: { tierMin: 2, tierMax: 6, faction: ['seita'], flags: ['mestre_protetor'] },
    text: 'O Mestre {mentor} entrega uma caixa de jade lacrada. "Leve isto a um velho amigo nas Montanhas do Norte. Ninguém pode saber. Nem a seita."',
    choices: [
      { text: 'Aceitar a missão em segredo.', check: { stat: ['sor', 'esp'], dif: 2, tag: 'fuga' }, ok: { text: 'A viagem é perigosa, mas você entrega a caixa. O velho amigo chora ao abri-la e lhe dá um presente.', fx: { item: ['jade_identidade'], pedras: 40, xp: 8, setFlags: ['confidente_do_mestre'], agenda: [{ event: 'mestre_em_perigo', em: [10, 25] }] } }, fail: { text: 'Bandidos tomam a caixa. Você a recupera ferido e entrega atrasado, envergonhado.', fx: { ferida: 2, setFlags: ['confidente_do_mestre'], agenda: [{ event: 'mestre_em_perigo', em: [10, 25] }] } } },
      { text: 'Recusar: não confia nos segredos do Mestre.', res: { text: 'O Mestre guarda a caixa sem dizer palavra. A decepção é silenciosa e pesada.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },
  {
    id: 'mestre_em_perigo', title: 'O Mestre em Perigo', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['confidente_do_mestre'] },
    text: 'Uma carta chega à noite: "Meu aluno, estou cercado pelos inimigos de minha juventude. Se ainda me considera, venha." Não há assinatura, mas há o cheiro do incenso do Mestre {mentor}.',
    choices: [
      { text: 'Correr em socorro do Mestre.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Você chega a tempo e luta ao lado dele. Os inimigos recuam, e o Mestre sorri entre dentes ensanguentados. "Meu melhor aluno."', fx: { fama: 12, karma: 10, xp: 18, stats: { dao: 2, fis: 1 }, item: ['pergaminho_anciao'], setFlags: ['salvou_mestre'] } }, fail: { text: 'Você chega tarde demais para evitar o pior, mas a tempo de enterrá-lo. Sua lealdade nunca será esquecida.', fx: { ferida: 3, karma: 6, stats: { dao: 2 }, tecnica: ['sutra_do_anciao'] } } },
      { text: 'Avisar os Anciãos e esperar que cheguem a tempo.', res: { text: 'Os Anciãos o salvam, mas tarde demais para evitar uma perna perdida. O Mestre nunca esquece quem veio de peito aberto e quem pediu licença.', fx: { karma: 2, fama: 1 } } },
      { text: 'Ignorar a carta.', res: { text: 'Semanas depois, você descobre que o Mestre foi dado como morto. A culpa pesa mais que qualquer montanha.', fx: { karma: -10, stats: { dao: -2 }, corr: 3 } } },
    ],
  },
  {
    id: 'casa_da_punicao', title: 'A Casa da Punição', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 5, faction: ['seita'] },
    text: 'Você é convocado à Casa da Punição: foram desviadas pílulas do depósito e o seu nome aparece num dos registros. Os Anciãos sentados à mesa o fitam sem expressão.',
    choices: [
      { text: 'Defender-se com provas e calma.', check: { stat: ['comp', 'car'], dif: 2 }, ok: { text: 'Você traz testemunhas e contraprovas. O verdadeiro culpado, um escriturário, é desmascarado.', fx: { fama: 6, karma: 4, stats: { comp: 1, car: 1 } } }, fail: { text: 'Suas provas são frágeis. Você recebe uma punição leve, mas a mancha no registro fica.', fx: { fama: -5, ferida: 1 } } },
      { text: 'Pedir clemência e aceitar a pena.', res: { text: 'A pena é leve: um mês de serviço. O registro fica, mas o orgulho sofre o mesmo.', fx: { fama: -2, stats: { dao: 1 } } } },
      { text: 'Acusar o mensageiro que levou os documentos.', check: { stat: 'car', dif: 3 }, ok: { text: 'O mensageiro, nervoso, entrega o jogo. A trama toda se desfaz.', fx: { fama: 5, karma: -1 } }, fail: { text: 'O mensageiro é inocente. A punição dobra.', fx: { fama: -8, karma: -6, ferida: 1 } } },
    ],
  },
  {
    id: 'pavilhao_medicinal', title: 'O Pavilhão Medicinal', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 6, faction: ['seita'] },
    text: 'Entre os biombos do Pavilhão Medicinal, um velho alquimista de óculos finos examina suas feridas e meridianos, murmurando sobre desequilíbrios.',
    choices: [
      { text: 'Tratamento completo (25 pedras).', custo: 25, res: { text: 'Agulhas, chás amargos e massagens. Você sai novo em folha.', fx: { ferida: -4, stats: { fis: 1 } } } },
      { text: 'Tratamento simples e gratuito.', res: { text: 'Uma pomada e um sermão sobre descanso. Ajuda um pouco.', fx: { ferida: -2 } } },
      { text: 'Ajudar o velho alquimista a moer ervas por uma semana.', res: { text: 'Cheiro de menta e raiz amarga. No fim, ele lhe dá um frasco de graça e uma lição sobre ervas.', fx: { item: ['pilula_cura'], stats: { comp: 1 }, karma: 2 } } },
    ],
  },
  {
    id: 'cultivo_coletivo', title: 'A Cerimônia de Cultivo Coletivo', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 6, faction: ['seita'] },
    text: 'Na grande formação da {seita}, centenas de discípulos sentam-se em círculos e respiram juntos. O Qi sobe do solo como névoa dourada.',
    choices: [
      { text: 'Sincronizar sua respiração com a do grupo.', check: { stat: ['esp', 'comp'], dif: 0, tag: 'qi' }, ok: { text: 'Por três horas, você é uma onda numa maré imensa. Sai tonto, forte e plácido.', fx: { xp: 16, stats: { esp: 1 } } }, fail: { text: 'Você perde o compasso e se desconecta cedo, mas ainda absorve um pouco.', fx: { xp: 7 } } },
      { text: 'Observar a formação e estudar seus padrões.', check: { stat: 'comp', dif: 1, tag: 'formacao' }, ok: { text: 'Cada linha da formação revela uma ideia. Você anota tudo.', fx: { xp: 8, stats: { comp: 2 } } }, fail: { text: 'A formação é complexa demais. Você só entende pedaços.', fx: { xp: 4, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'prova_do_nucleo', title: 'A Prova dos Discípulos do Núcleo', rarity: 'raro', once: true, weight: 8,
    cond: { tierMin: 3, tierMax: 6, faction: ['seita'], flags: ['discipulo_interno'], noFlags: ['discipulo_nucleo'] },
    text: 'A cada geração, apenas dez discípulos ascendem ao núcleo da {seita}. A prova dura três dias: formações, combate e uma pergunta do Mestre da Seita, feita a sós.',
    choices: [
      { text: 'Enfrentar a prova com tudo.', check: { stat: ['fis', 'esp', 'comp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'No terceiro dia, o Mestre da Seita sorri e entrega um manto escuro bordado a prata. "Bem-vindo ao núcleo."', fx: { setFlags: ['discipulo_nucleo'], item: ['manto_nucleo'], fama: 12, xp: 14, stats: { dao: 2 } } }, fail: { text: 'Você fica em 14º lugar, por um triz. O Mestre da Seita diz apenas: "Outra geração."', fx: { stats: { dao: 1, comp: 1 }, ferida: 1 } } },
      { text: 'Fingir doença para não arriscar.', res: { text: 'Todos entendem a desculpa, ninguém a respeita.', fx: { fama: -4, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'privilegios_do_nucleo', title: 'Os Privilégios do Núcleo', rarity: 'comum', cooldown: 20, weight: 3,
    cond: { tierMin: 3, tierMax: 7, faction: ['seita'], flags: ['discipulo_nucleo'] },
    text: 'Como discípulo do núcleo, você tem a primeira escolha nas distribuições de recursos. O quartel-general dos tesouros abre diante de você: pílulas, ervas, manuais.',
    choices: [
      { text: 'Levar uma pílula de rompimento.', cond: { tierMax: 5 }, res: { text: 'O guardião a entrega com reverência. Os outros discípulos olham de longe, sem dizer nada.', fx: { item: ['pilula_passagem_3'], fama: 2 } } },
      { text: 'Levar um manual de técnica.', res: { text: 'Cada manual é uma porta; você escolhe a que mais combina com sua alma.', fx: { item: ['manual_olho_lotus'], stats: { comp: 1 } } } },
      { text: 'Abrir mão e deixar para os mais novos.', res: { text: 'O Ancião faz um aceno de aprovação. Poucos entendem seu gesto, mas todos o notam.', fx: { karma: 8, fama: 4, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'desafio_entre_seitas', title: 'O Intercâmbio das Seitas', rarity: 'raro', cooldown: 30,
    cond: { tierMin: 2, tierMax: 6, faction: ['seita'] },
    text: 'Duas seitas vizinhas promovem um intercâmbio de discípulos: três dias de duelos, debates e visitas. Cada vitória rende pedras e honra à {seita}.',
    choices: [
      { text: 'Representar a {seita} nos duelos.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você derrota três oponentes em sequência. A {seita} sai com a taça, e você com os aplausos.', fx: { fama: 10, pedras: 25, xp: 8, stats: { dao: 1 } } }, fail: { text: 'Você perde na segunda luta, mas com honra. A {seita} agradece o esforço.', fx: { fama: 2, ferida: 2, xp: 4 } } },
      { text: 'Representar a {seita} no debate de formações.', cond: { stat: { comp: 13 } }, check: { stat: 'comp', dif: 2, tag: 'formacao' }, ok: { text: 'Seus argumentos silenciam a plateia. A formação que você propõe é adotada pelas duas seitas.', fx: { fama: 8, pedras: 15, stats: { comp: 2 } } }, fail: { text: 'Você é derrotado por argumentos mais sólidos, e aprende o valor de um bom debate.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'espiao_infiltrado', title: 'O Espião Entre Nós', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, faction: ['seita'] },
    text: 'Pequenos desaparecimentos: manuais copiados, planos de formações vazando. Alguém na {seita} fala com outro lado. Seus olhos esbarram em um irmão marcial de postura calma demais.',
    choices: [
      { text: 'Vigiar o suspeito em silêncio.', check: { stat: ['comp', 'esp'], dif: 2 }, ok: { text: 'Você o segue até uma casa de chá. Ali, entrega um rolo a um estranho. A prova é sua.', fx: { setFlags: ['espiao_pego'], karma: 3, agenda: [{ event: 'conspiracao_anciao', em: [4, 10] }] } }, fail: { text: 'Você o perde de vista. Ele percebe que foi vigiado, e passa a vigiar você.', fx: { stats: { comp: 1 }, setFlags: ['espiao_alerta'] } } },
      { text: 'Denunciar a suspeita sem provas.', res: { text: 'Sem provas, o Ancião o repreende por acusações levianas. A fama sofre.', fx: { fama: -3, karma: -1 } } },
      { text: 'Fingir que não percebeu.', res: { text: 'Em paz, você segue. Alguns segredos, às vezes, são problemas de outros.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'conspiracao_anciao', title: 'A Conspiração do Ancião', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['espiao_pego'], faction: ['seita'] },
    text: 'O espião, interrogado, entrega um nome inesperado: um Ancião da própria {seita} vendia segredos por pedras e por uma promessa de poder. Você é a única testemunha a ouvir.',
    choices: [
      { text: 'Revelar o Ancião ao Mestre da Seita.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'O Mestre age rápido, e o Ancião é expulso. A seita, abalada, passa a vê-lo como um pilar.', fx: { fama: 14, karma: 8, stats: { dao: 2, car: 1 }, setFlags: ['expos_anciao'] } }, fail: { text: 'O Ancião, mais ágil, nega tudo e semeia dúvidas sobre você. A conspiração fica, e você também.', fx: { fama: -4, ferida: 1, setFlags: ['inimigo_anciao'] } } },
      { text: 'Chantagear o Ancião em troca de recursos.', check: { stat: ['car', 'sor'], dif: 2 }, ok: { text: 'O Ancião paga bem. Você carrega uma culpa discreta e uma bolsa pesada.', fx: { pedras: 120, karma: -12, corr: 4 } }, fail: { text: 'O Ancião é perigoso demais para ameaças. Você escapa de uma emboscada por pouco.', fx: { ferida: 3, karma: -6, setFlags: ['inimigo_anciao'] } } },
      { text: 'Ficar em silêncio e rezar para que o problema desapareça.', res: { text: 'O problema não desaparece. Anos depois, a {seita} paga um preço alto por seu silêncio.', fx: { karma: -4, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'discipulo_novato', title: 'O Discípulo Novato', rarity: 'comum', once: true,
    cond: { tierMin: 2, tierMax: 5, faction: ['seita'] },
    text: 'Um jovem discípulo novo, de olhos arregalados e roupas grandes demais, tropeça em você e pede desculpas seis vezes. Está perdido. Os outros riem dele.',
    choices: [
      { text: 'Guiar o novato pela {seita} e protegê-lo dos zombeteiros.', res: { text: 'Ele nunca esquecerá a gentileza. Anos depois, será forte, e se lembrará de quem lhe estendeu a mão.', fx: { karma: 6, stats: { car: 1 }, setFlags: ['mentor_do_novato'], agenda: [{ event: 'junior_retorna', em: [20, 45] }] } } },
      { text: 'Ignorar e seguir seu caminho.', res: { text: 'Cada um com sua jornada. O novato some entre a multidão.', fx: {} } },
    ],
  },
  {
    id: 'junior_retorna', title: 'Aquele Jovem Discípulo', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['mentor_do_novato'] },
    text: 'Um cultivador de aura forte e olhar caloroso o aborda numa estrada: "Irmão marcial, lembra-se de mim? Você foi gentil quando eu era pequeno. Hoje, eu posso retribuir."',
    choices: [
      { text: 'Aceitar o presente com humildade.', res: { text: 'Ele entrega ervas raras, uma pílula e uma promessa de aliança. A bondade, afinal, é um empréstimo com bons juros.', fx: { item: ['pilula_qi_maior', 'erva_cem_anos'], fama: 4, stats: { car: 1 }, setFlags: ['aliado_junior'] } } },
      { text: 'Recusar: a gentileza não era um investimento.', res: { text: 'Ele sorri, entendendo. "Então fico em dívida para sempre." Uma amizade rara nasce entre vocês.', fx: { karma: 8, stats: { dao: 2 }, setFlags: ['aliado_junior'] } } },
    ],
  },
  {
    id: 'seita_decadente', title: 'A Seita em Declínio', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, faction: ['seita'] },
    text: 'A {seita} está perdendo discípulos e prestígio. Os Anciãos brigam por migalhas, os tesouros são desviados e o portão desbotou. Alguém precisa propor mudanças.',
    choices: [
      { text: 'Propor uma reforma, diante de todos.', check: { stat: ['car', 'comp', 'dao'], dif: 3 }, ok: { text: 'Seu discurso rompe a inércia. A reforma começa, e seu nome é associado à renovação.', fx: { fama: 14, karma: 6, stats: { car: 2, comp: 1 }, setFlags: ['reformador'] } }, fail: { text: 'Os Anciãos o escutam com desdém. Alguns jovens aplaudem, outros baixam o olhar.', fx: { fama: 1, stats: { car: 1 } } } },
      { text: 'Abandonar a {seita} e procurar outro caminho.', res: { text: 'Você tira o manto e atravessa o portão. A estrada é livre, e o vazio também.', fx: { faccao: 'errante', clearFlags: ['membro_seita'], stats: { dao: 1 } } } },
      { text: 'Calar e esperar que tudo passe.', res: { text: 'A decadência avança devagar, como água fria sobre pedra.', fx: { stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'banquete_aniversario', title: 'O Banquete de Aniversário da Seita', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 2, tierMax: 7, faction: ['seita'] },
    text: 'A {seita} comemora mais um século com um banquete: mesas imensas, vinho espiritual, discursos longos e convidados de seitas aliadas.',
    choices: [
      { text: 'Aproveitar para criar alianças.', check: { stat: 'car', dif: 1 }, ok: { text: 'Conversas fluem. Você sai com promessas, um favor devido e um novo amigo influente.', fx: { fama: 5, setFlags: ['rede_contatos'], stats: { car: 1 } } }, fail: { text: 'Você derrama vinho no manto de um convidado ilustre. Pede desculpas, com o rosto vermelho.', fx: { fama: -2 } } },
      { text: 'Observar em silêncio e aprender sobre as outras seitas.', res: { text: 'Cada mesa conta uma história de rivalidades e de heranças. Você anota o que escuta.', fx: { stats: { comp: 1, dao: 1 } } } },
      { text: 'Beber além da conta.', check: { stat: ['fis', 'dao'], dif: 0 }, ok: { text: 'Você dança, canta e acorda sem ressaca. O banquete é lenda por décadas.', fx: { fama: 3, stats: { car: 1 } } }, fail: { text: 'Você acorda sem lembrar de quase nada, e com muitos pedidos de desculpa a fazer.', fx: { fama: -3 } } },
    ],
  },
  {
    id: 'biblioteca_selada', title: 'A Seção Proibida da Biblioteca', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, faction: ['seita'], flags: ['discipulo_interno'] },
    text: 'No terceiro andar do Pavilhão dos Mil Livros há uma porta selada com talismãs. Dizem que lá guardam técnicas proibidas, de poder alto e preço mais alto ainda.',
    choices: [
      { text: 'Quebrar o selo à noite.', check: { stat: ['comp', 'sor'], dif: 3, tag: 'formacao' }, ok: { text: 'Você entra. Entre pergaminhos mofados, copia um método antigo e sai sem deixar rastro.', fx: { tecnica: ['sutra_vazio_calmo'], xp: 14, karma: -4, setFlags: ['leu_proibido'] } }, fail: { text: 'O selo reage e o alarma soa. Você é preso e punido.', fx: { ferida: 2, fama: -8, karma: -3 } } },
      { text: 'Pedir autorização ao Ancião da Biblioteca.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'O Ancião, impressionado com sua franqueza, permite uma leitura supervisionada.', fx: { xp: 10, stats: { comp: 2 }, fama: 2 } }, fail: { text: '"Cedo demais", diz o Ancião, devolvendo a chave ao bolso.', fx: { stats: { dao: 1 } } } },
      { text: 'Deixar a porta em paz.', res: { text: 'Há perguntas que é mais sensato não fazer.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'forno_da_seita', title: 'O Forno de Alquimia da Seita', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 6, faction: ['seita'], path: ['alquimia', 'sopro', 'bestas', 'alma', 'formacoes'] },
    text: 'O grande forno da {seita}, de bronze velho, aquece por cem anos sem apagar. Os discípulos o usam por turnos para refinar pílulas.',
    choices: [
      { text: 'Reservar um turno para refinar (15 pedras).', custo: 15, check: { stat: 'comp', dif: 1, tag: 'alquimia' }, ok: { text: 'O forno canta. Pílulas em quantidade, e todas de boa qualidade.', fx: { item: ['pilula_qi_media', 'pilula_cura'], xp: 5 } }, fail: { text: 'A chama oscila e o lote queima. O custo do forno não é devolvido.', fx: { xp: 2, stats: { comp: 1 } } } },
      { text: 'Ajudar o alquimista da seita e aprender.', res: { text: 'Horas ao lado do velho mestre. Cada gota de erva é uma lição.', fx: { xp: 7, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'ronda_noturna', title: 'A Ronda Noturna', rarity: 'comum', cooldown: 12,
    cond: { tierMin: 1, tierMax: 5, faction: ['seita'] },
    text: 'É sua noite de ronda ao redor da {seita}. A lua está fina, o vento cheira a pinheiro e a névoa baixa esconde os caminhos. Um farfalhar chama sua atenção.',
    choices: [
      { text: 'Investigar o ruído.', check: { stat: ['esp', 'sor'], dif: 1 }, ok: { text: 'Um ladrão de ervas, desajeitado, cai de joelhos ao vê-lo. Você o entrega à guarda e recebe uma recompensa.', fx: { fama: 3, pedras: 10, karma: 1 } }, fail: { text: 'Era uma armadilha: o ladrão tinha companhia. Você leva uma pancada na cabeça.', fx: { ferida: 1 } } },
      { text: 'Soar o sino de alerta.', res: { text: 'O sino ecoa. Meia seita acorda, nada acontece, e você passa vergonha. Mas a segurança nunca é demais.', fx: { fama: -1, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'disputa_mina', title: 'A Disputa pela Mina Espiritual', rarity: 'raro', cooldown: 40,
    cond: { tierMin: 3, tierMax: 7, faction: ['seita'] },
    text: 'Uma mina de pedras espirituais, a meio caminho entre a {seita} e uma seita rival, é disputada há gerações. Desta vez, os Anciãos pedem seus melhores discípulos para escoltar os mineiros.',
    choices: [
      { text: 'Liderar a escolta e defender a mina.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Dias de emboscadas e fumaça. A mina permanece da {seita}, e você é lembrado como o escudo dela.', fx: { fama: 14, pedras: 100, karma: 4, ferida: 1, stats: { dao: 2 } } }, fail: { text: 'A escolta é rompida. Você recua, ferido, mas salva os mineiros.', fx: { ferida: 3, fama: 4, karma: 6 } } },
      { text: 'Negociar uma partilha pacífica.', check: { stat: ['car', 'comp'], dif: 3 }, ok: { text: 'Em três reuniões, a disputa vira cooperação. Uma paz centenária nasce da sua diplomacia.', fx: { fama: 16, karma: 12, stats: { car: 2, comp: 1 } } }, fail: { text: 'Os rivais recusam, e a tensão continua.', fx: { fama: -1 } } },
    ],
  },
  {
    id: 'dilema_lealdade', title: 'Dilema de Lealdade', rarity: 'raro', once: true, weight: 0.8,
    cond: { tierMin: 2, tierMax: 6, faction: ['seita'], flags: ['inimigo_anciao'] },
    text: 'O Ancião que o persegue há anos fecha cada porta que você tenta abrir. Uma seita vizinha oferece acolhida e um posto melhor, desde que você leve consigo alguns segredos da {seita}.',
    choices: [
      { text: 'Aceitar o convite e levar os segredos.', res: { text: 'Você parte de madrugada, com o manto nas costas e a lealdade na bagagem. O novo lar é próspero, e sua consciência, esfarrapada.', fx: { faccao: 'errante', clearFlags: ['membro_seita'], pedras: 80, karma: -14, fama: -8, xp: 10 } } },
      { text: 'Recusar e seguir lutando por seu lugar.', res: { text: 'A teimosia lhe custa conforto. Mas o Coração do Dao se fortalece com cada recusa.', fx: { stats: { dao: 3 }, karma: 4 } } },
      { text: 'Deixar a {seita} sem levar nada.', res: { text: 'Você sai de mãos vazias e coração leve. A estrada começa onde os favores terminam.', fx: { faccao: 'errante', clearFlags: ['membro_seita'], karma: 6, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'sucessao_seita', title: 'A Sucessão do Mestre da Seita', rarity: 'lendario', once: true, weight: 24,
    cond: { tierMin: 4, tierMax: 8, faction: ['seita'], flags: ['discipulo_nucleo'], fameMin: 40, karmaMin: 0 },
    text: 'O Mestre da Seita convoca os Anciãos e os discípulos do núcleo ao Grande Pavilhão. Sua voz é cansada: "Estou velho. É hora de passar a espada. E eu quero que seja você."',
    choices: [
      { text: 'Aceitar o manto de Patriarca da {seita}.', check: { stat: ['car', 'comp', 'dao'], dif: 4 }, ok: { text: 'O manto cai sobre seus ombros. Séculos de história se curvam diante de você. A {seita} será sua obra e seu fardo, até o último dia.', fx: { fim: 'patriarca' } }, fail: { text: 'Os Anciãos rejeitam a escolha. Você aceita a derrota com serenidade, mas o título não será seu.', fx: { fama: 2, stats: { dao: 2 } } } },
      { text: 'Recusar com gratidão e recomendar outro discípulo.', res: { text: 'O velho Mestre sorri. "Sabe, é por isso que eu pensei em você." Você segue livre, e a seita guarda seu nome com carinho.', fx: { karma: 12, fama: 6, stats: { dao: 3 } } } },
    ],
  },
];
