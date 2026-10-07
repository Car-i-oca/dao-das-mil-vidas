import type { GameEvent } from '../../types';

/**
 * Lote 23 — Personagens recorrentes. Seis cadeias de cinco cenas cada, ligadas por `agenda` e por flags,
 * de modo que o que você fez com a pessoa antes muda o que acontece depois:
 *   mentor ({mentor}), rival ({rival}), amigo de infância ({amigo}), amor ({noivo}), discípulo ({discipulo}), inimigo jurado ({inimigo}).
 * O primeiro evento de cada cadeia é sorteado normalmente; os seguintes só chegam por agenda (weight 0).
 */
export const lote23Npcs: GameEvent[] = [
  /* ================= MENTOR ================= */
  {
    id: 'npc_mentor_1', title: 'O Estranho Que Observava', rarity: 'comum', once: true, weight: 2.5,
    cond: { tierMin: 1, tierMax: 3, noFlags: ['mestre_protetor', 'npc_mentor'] },
    text: 'Há semanas, um homem de meia-idade, de túnica sem emblema, aparece onde você treina e vai embora sem dizer nada. Hoje, ele fala: "Meu nome é {mentor}. Você erra o mesmo ponto toda vez. Quer saber qual?"',
    choices: [
      { text: 'Pedir que ele diga e aceitar a lição.', res: { text: '{mentor} corrige uma única postura, e o seu golpe muda por inteiro. "Venha amanhã", diz, e some. Você vai.', fx: { setFlags: ['npc_mentor', 'mentor_aberto'], stats: { comp: 1, dao: 1 }, agenda: [{ event: 'npc_mentor_2', em: [3, 6] }] } } },
      { text: 'Desconfiar e mandá-lo embora.', res: { text: 'Ele dá de ombros e vai. A dúvida fica. Anos depois, você descobrirá quem ele era.', fx: { setFlags: ['npc_mentor', 'mentor_recusado'], agenda: [{ event: 'npc_mentor_2', em: [8, 14] }] } } },
    ],
  },
  {
    id: 'npc_mentor_2', title: 'A Lição Mais Difícil', rarity: 'comum', once: true, weight: 0,
    cond: { flags: ['npc_mentor'] },
    text: '{mentor} aparece de novo. Se você o aceitou, traz uma lição dura: abandonar um método de que se orgulha, porque ela cobra um preço escondido. Se o recusou, ele só observa de longe, e deixa um bilhete: "A porta ainda está aberta."',
    choices: [
      { text: 'Abandonar o método e recomeçar do básico.', cond: { flags: ['mentor_aberto'] }, res: { text: 'Três meses humilhantes, depois a base nova. {mentor} sorri pela primeira vez. "Poucos têm essa coragem."', fx: { setFlags: ['mentor_leal'], stats: { dao: 2, comp: 1 }, xp: 6, agenda: [{ event: 'npc_mentor_3', em: [6, 12] }] } } },
      { text: 'Discordar e seguir sozinho.', cond: { flags: ['mentor_aberto'] }, res: { text: '{mentor} concorda, sem rancor. "Quem discorda aprende o preço pessoalmente." Ele se afasta, mas não some.', fx: { setFlags: ['mentor_rebelde'], stats: { dao: 1 }, agenda: [{ event: 'npc_mentor_3', em: [8, 14] }] } } },
      { text: 'Ir até ele agora, depois de tanto tempo.', cond: { flags: ['mentor_recusado'] }, res: { text: '{mentor} o recebe sem cobrar o atraso. "Eu esperava." O orgulho dói, e a lição vale cada gota.', fx: { setFlags: ['mentor_aberto', 'mentor_leal'], stats: { dao: 2 }, agenda: [{ event: 'npc_mentor_3', em: [6, 12] }] } } },
      { text: 'Ignorar o bilhete e seguir o seu caminho.', cond: { flags: ['mentor_recusado'] }, res: { text: 'O bilhete vai para o fogo. Você segue, e {mentor} desaparece da sua vida, por enquanto.', fx: { setFlags: ['mentor_rebelde'], agenda: [{ event: 'npc_mentor_3', em: [10, 18] }] } } },
    ],
  },
  {
    id: 'npc_mentor_3', title: 'O Segredo de {mentor}', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_mentor'] },
    text: 'Você descobre, por um pergaminho velho e um boato, que {mentor} foi um ancião de uma seita extinta, culpado pela queda dela. O que ele ensinou, no fundo, era penitência. Ele nunca contou, e você nunca perguntou.',
    choices: [
      { text: 'Confrontá-lo, com respeito.', res: { text: '{mentor} confirma, sem se defender. "Não ensino por orgulho. Ensino para que ninguém repita meu erro." Ele parece mais velho, e mais leve.', fx: { setFlags: ['mentor_confessou'], karma: 3, stats: { dao: 2 }, agenda: [{ event: 'npc_mentor_4', em: [5, 10] }] } } },
      { text: 'Guardar o segredo, sem dizer nada.', res: { text: 'Você o observa com outros olhos. Ele nota, e não diz nada. Vocês dois sabem, e é o que basta.', fx: { stats: { comp: 1, dao: 1 }, agenda: [{ event: 'npc_mentor_4', em: [5, 10] }] } } },
      { text: 'Revelar o segredo à seita, por justiça.', res: { text: 'A seita o expulsa da cidade. {mentor} parte sem se despedir. Você ganha reputação de íntegro, e perde alguém que não sabia que amava.', fx: { setFlags: ['mentor_traido'], fama: 6, karma: -2, stats: { dao: -1 }, agenda: [{ event: 'npc_mentor_4', em: [6, 12] }] } } },
    ],
  },
  {
    id: 'npc_mentor_4', title: 'A Prova de {mentor}', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_mentor'] },
    text: '{mentor} reaparece, mais velho, com um pedido. Se ainda o considera mestre, ele propõe uma prova: atravessar sozinho um desfiladeiro onde ele próprio falhou, décadas atrás. Se foi traído por você, vem só para dizer o que pensa.',
    choices: [
      { text: 'Aceitar a prova.', check: { stat: ['dao', 'fis', 'esp'], dif: 2 }, ok: { text: 'No fim, você encontra uma inscrição que ele nunca viu. {mentor} chora ao lê-la. Vocês voltam juntos, sem falar.', fx: { setFlags: ['mentor_prova_ok'], stats: { dao: 3, esp: 1 }, xp: 8, fama: 5, agenda: [{ event: 'npc_mentor_5', em: [8, 20] }] } }, fail: { text: 'Você volta ferido, sem a resposta. {mentor} o abraça mesmo assim: "Eu também voltei assim."', fx: { ferida: 2, stats: { dao: 2 }, agenda: [{ event: 'npc_mentor_5', em: [8, 20] }] } } },
      { text: 'Recusar: o passado dele é dele.', res: { text: '{mentor} assente. Não insiste. Você sente que ele esperava outra resposta, e que a sua era honesta.', fx: { stats: { dao: 1 }, agenda: [{ event: 'npc_mentor_5', em: [8, 20] }] } } },
    ],
  },
  {
    id: 'npc_mentor_5', title: 'A Despedida de {mentor}', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_mentor'] },
    alt: ['Chega uma carta, escrita à mão, com letra trêmula: {mentor} está morrendo e quer vê-lo. A vila onde ele vive é pequena, e o quarto, mais ainda. Ele sorri ao vê-lo entrar.', 'Um mensageiro avisa: {mentor} partiu num entardecer sereno, e deixou um embrulho com o seu nome. Você vai buscá-lo, sentindo que algo se fechou.'],
    text: '{mentor} chega ao fim da vida. Ele deixou um legado para você: a sua melhor método, uma espada, ou só uma frase. O que ele deixa depende de quem você foi para ele.',
    choices: [
      { text: 'Receber o legado e honrar a memória dele.', res: { text: 'O embrulho tem um manual anotado por décadas, e uma frase final: "Não ensine por obrigação. Ensine porque alguém precisa." Você chora em silêncio.', fx: {  stats: { dao: 3, comp: 2 }, karma: 6, fama: 4, setFlags: ['herdou_do_mentor'] } } },
      { text: 'Recusar o legado: basta ter sido discípulo.', res: { text: 'O velho ri, tosse, e diz que você é teimoso como ele. A frase final, ele diz em voz alta mesmo assim.', fx: { stats: { dao: 4 }, karma: 8, setFlags: ['herdou_do_mentor'] } } },
    ],
  },

  /* ================= RIVAL ================= */
  {
    id: 'npc_rival_1', title: '{rival} Entra na Sua Vida', rarity: 'comum', once: true, weight: 2.5,
    cond: { tierMin: 1, tierMax: 3, noFlags: ['npc_rival'] },
    text: '{rival} chega à seita no mesmo dia que você, com a mesma idade e o mesmo sorriso sem humor. Os instrutores já os comparam. Na primeira semana, ele supera o seu melhor resultado, e ainda pede desculpas, o que é pior.',
    choices: [
      { text: 'Propor uma competição amistosa permanente.', res: { text: '{rival} aperta sua mão, e ri pela primeira vez. A rivalidade vira um jogo, com placar, que ambos fingem não levar a sério.', fx: { setFlags: ['npc_rival', 'rival_respeito'], stats: { dao: 1, fis: 1 }, agenda: [{ event: 'npc_rival_2', em: [4, 8] }] } } },
      { text: 'Tratá-lo como inimigo desde o primeiro dia.', res: { text: 'Cada treino vira disputa. Você melhora depressa, e ele também. O ódio é combustível, e custa caro.', fx: { setFlags: ['npc_rival', 'rival_odio'], stats: { fis: 1, esp: 1 }, karma: -1, agenda: [{ event: 'npc_rival_2', em: [4, 8] }] } } },
      { text: 'Ignorar: não vale a comparação.', res: { text: 'Ele fica irritado com a indiferença, e mais ainda quando você vence sem esforço aparente.', fx: { setFlags: ['npc_rival', 'rival_ignorado'], stats: { dao: 1 }, agenda: [{ event: 'npc_rival_2', em: [4, 8] }] } } },
    ],
  },
  {
    id: 'npc_rival_2', title: 'O Duelo com {rival}', rarity: 'comum', once: true, weight: 0, escala: true,
    cond: { flags: ['npc_rival'] },
    text: 'Os anciões decidem resolver a comparação: um duelo oficial entre você e {rival}, no pátio, diante da seita inteira. Ele está calmo; você, nem tanto. A multidão já fez apostas.',
    choices: [
      { text: 'Lutar com toda o método que possui.', check: { stat: ['fis', 'esp', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'A luta é parelha, e você vence por uma fração. {rival} se levanta, tenso, e murmura: "Na próxima, eu ganho."', fx: { setFlags: ['rival_derrotado'], fama: 6, xp: 5, stats: { dao: 1 }, agenda: [{ event: 'npc_rival_3', em: [6, 12] }] } }, fail: { text: '{rival} vence. Ele não comemora, e isso dói mais. "Você é bom. Só não é o melhor."', fx: { setFlags: ['rival_venceu'], fama: -2, ferida: 1, stats: { dao: 2 }, agenda: [{ event: 'npc_rival_3', em: [6, 12] }] } } },
      { text: 'Desistir do duelo antes de começar.', res: { text: 'O pátio vaia. {rival} franze a testa, ofendido pela falta de luta. Você sente vergonha e alívio, em medidas iguais.', fx: { setFlags: ['rival_venceu'], fama: -4, stats: { dao: -1 }, agenda: [{ event: 'npc_rival_3', em: [6, 12] }] } } },
    ],
  },
  {
    id: 'npc_rival_3', title: 'Quando {rival} Fica Forte', rarity: 'comum', once: true, weight: 0,
    cond: { flags: ['npc_rival'] },
    text: 'Anos se passam. {rival} cresce de um jeito que assusta: aprende métodos novos, ganha um mestre famoso, e passa a ser citado ao lado do seu nome. Hoje, ele cruza o seu caminho numa estrada, sozinho, e para.',
    choices: [
      { text: 'Parabenizá-lo com sinceridade.', res: { text: '{rival} desarma-se. "Você é o único que diz isso de verdade", murmura. Vocês bebem juntos, e o placar fica esquecido por uma noite.', fx: { setFlags: ['rival_respeito'], karma: 3, stats: { car: 1, dao: 1 }, agenda: [{ event: 'npc_rival_4', em: [8, 15] }] } } },
      { text: 'Provocá-lo, como sempre.', res: { text: 'A provocação é antiga, e ele a devolve na mesma moeda. Riem, mas o riso tem algo de lâmina.', fx: { stats: { car: 1 }, agenda: [{ event: 'npc_rival_4', em: [8, 15] }] } } },
      { text: 'Fingir que não o viu e seguir.', res: { text: 'Você passa de cabeça baixa. Ele o vê, e entende. A distância, a partir daí, é de reinos.', fx: { karma: -1, stats: { dao: 1 }, agenda: [{ event: 'npc_rival_4', em: [8, 15] }] } } },
    ],
  },
  {
    id: 'npc_rival_4', title: 'A Aliança Impossível com {rival}', rarity: 'raro', once: true, weight: 0, escala: true,
    cond: { flags: ['npc_rival'] },
    text: 'Um inimigo comum, forte demais para qualquer um dos dois, ameaça a região. A única chance de vencê-lo é uma aliança entre você e {rival}. Ele aparece à sua porta, de braços cruzados: "Eu odeio isto. Mas preciso de você."',
    choices: [
      { text: 'Aceitar a aliança e lutar lado a lado.', check: { stat: ['fis', 'esp', 'car'], dif: 2, tag: 'combate' }, ok: { text: 'A luta é uma dança. Vocês se completam, de um modo que nenhum dos dois queria admitir. O inimigo cai, e os dois, de joelhos, riem como crianças.', fx: { setFlags: ['rival_aliado'], fama: 14, karma: 4, xp: 8, stats: { dao: 2, car: 1 }, agenda: [{ event: 'npc_rival_5', em: [10, 25] }] } }, fail: { text: 'A aliança falha por orgulho: cada um tenta brilhar. Vocês sobrevivem, mas o inimigo escapa, e a discussão posterior é feia.', fx: { ferida: 2, fama: -2, stats: { dao: 1 }, agenda: [{ event: 'npc_rival_5', em: [10, 25] }] } } },
      { text: 'Recusar e enfrentar o inimigo sozinho.', res: { text: 'O orgulho vence a prudência. O resultado é desastroso, ou glorioso; de um modo ou de outro, {rival} ouve falar.', fx: { ferida: 1, fama: 3, stats: { dao: 1 }, agenda: [{ event: 'npc_rival_5', em: [10, 25] }] } } },
    ],
  },
  {
    id: 'npc_rival_5', title: 'O Último Duelo com {rival}', rarity: 'raro', once: true, weight: 0, escala: true,
    cond: { flags: ['npc_rival'] },
    text: 'Depois de décadas, {rival} o procura para um último duelo. Não por ódio, ou por vingança: por necessidade. "Preciso saber qual de nós, afinal, venceu", ele diz, e traz duas espadas.',
    choices: [
      { text: 'Aceitar o duelo.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'O duelo dura uma tarde e termina em empate. Ambos riem, ensanguentados. O placar, finalmente, é zero a zero.', fx: { fama: 12, xp: 8, stats: { dao: 3 }, karma: 3, setFlags: ['rival_empate'] } }, fail: { text: '{rival} vence, e o gesto seguinte é estender a mão. "Eu precisava disso. Obrigado." Você aceita, e a derrota, estranhamente, não dói.', fx: { ferida: 2, stats: { dao: 3 }, karma: 3, fama: 4 } } },
      { text: 'Recusar: o placar nunca importou.', res: { text: '{rival} fica em silêncio. Depois guarda uma das espadas, e entrega a outra a você, de presente. "Então, jantamos."', fx: { karma: 6, stats: { dao: 4, car: 1 } } } },
    ],
  },

  /* ================= AMIGO DE INFÂNCIA ================= */
  {
    id: 'npc_amigo_1', title: 'A Carta de {amigo}', rarity: 'comum', once: true, weight: 2.5,
    cond: { tierMin: 1, tierMax: 3, noFlags: ['npc_amigo'] },
    text: 'Uma carta chega, amassada e remendada, depois de meses de estrada: é de {amigo}, o amigo de infância. Ele conta que também despertou o Qi, que está numa seita do outro lado do continente, e que "sente falta do seu mau humor". No fim, escreveu: "Prometemos, lembra?"',
    choices: [
      { text: 'Responder com saudade e promessas.', res: { text: 'A carta parte. Vocês passam a trocar cartas duas vezes por ano, com a pontualidade de dois idiotas apaixonados por amizade.', fx: { setFlags: ['npc_amigo', 'amigo_correspondente'], stats: { car: 1, dao: 1 }, agenda: [{ event: 'npc_amigo_2', em: [6, 12] }] } } },
      { text: 'Guardar a carta, e responder só quando for alguém.', res: { text: 'A resposta nunca vem. A carta, na gaveta, envelhece. Um dia, você se arrepende.', fx: { setFlags: ['npc_amigo'], karma: -1, agenda: [{ event: 'npc_amigo_2', em: [8, 14] }] } } },
    ],
  },
  {
    id: 'npc_amigo_2', title: '{amigo} Pede Ajuda', rarity: 'comum', once: true, weight: 0,
    cond: { flags: ['npc_amigo'] },
    text: '{amigo} aparece, sem aviso, com uma sacola e os olhos fundos. Foi expulso da seita por uma intriga, ou escapou de uma dívida, ou perdeu alguém. Não pergunta se pode ficar, só olha para você, esperando.',
    choices: [
      { text: 'Acolher {amigo}, sem perguntas.', res: { text: 'Ele dorme dois dias seguidos. Quando acorda, conta tudo, e chora. Vocês passam meses reconstruindo o que ele perdeu.', fx: { setFlags: ['amigo_acolhido'], karma: 6, stats: { car: 1, dao: 1 }, pedras: -20, agenda: [{ event: 'npc_amigo_3', em: [6, 14] }] } } },
      { text: 'Ajudar com dinheiro, mas manter distância.', res: { text: 'Ele aceita, grato e magoado. Ao partir, deixa um recado: "Quando precisar de mim, sabe onde procurar."', fx: { pedras: -30, karma: 1, agenda: [{ event: 'npc_amigo_3', em: [8, 16] }] } } },
      { text: 'Recusar: não pode se envolver em problemas alheios.', res: { text: 'Ele concorda com a cabeça, e vai embora. A porta, ao fechar, faz um som que você demora a esquecer.', fx: { setFlags: ['amigo_abandonado'], karma: -5, stats: { dao: -1 }, agenda: [{ event: 'npc_amigo_3', em: [10, 18] }] } } },
    ],
  },
  {
    id: 'npc_amigo_3', title: 'O Que {amigo} Se Tornou', rarity: 'comum', once: true, weight: 0,
    cond: { flags: ['npc_amigo'] },
    text: 'Anos depois, as notícias de {amigo} chegam por terceiros: ele virou alguém. Se você o acolheu, vira conselheiro de uma casa de peso. Se o abandonou, vira inimigo de uma facção que conhece o seu nome.',
    choices: [
      { text: 'Procurá-lo e conversar.', res: { text: 'O reencontro tem silêncios e piadas velhas. Se houve mágoa, ela cede, devagar, como um nó que se desfaz com as duas mãos.', fx: { karma: 3, stats: { car: 1, dao: 1 }, agenda: [{ event: 'npc_amigo_4', em: [8, 16] }] } } },
      { text: 'Deixar que o tempo decida.', res: { text: 'O tempo, como sempre, decide por indiferença. Vocês se cruzam numa festa, e se cumprimentam, educados e estranhos.', fx: { stats: { dao: 1 }, agenda: [{ event: 'npc_amigo_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'npc_amigo_4', title: 'Quando {amigo} Fica em Perigo', rarity: 'raro', once: true, weight: 0, escala: true,
    cond: { flags: ['npc_amigo'] },
    text: 'Uma mensagem urgente: {amigo} foi cercado por inimigos numa cidade distante, e pede socorro. Você está a três dias de caminho. Sozinho, ele não resistirá até o fim da semana.',
    choices: [
      { text: 'Partir imediatamente, sem avisar ninguém.', check: { stat: ['fis', 'esp', 'sor'], dif: 1, tag: 'combate' }, ok: { text: 'Você chega no último instante e o resgata, ferido mas vivo. {amigo} ri, tossindo: "Você demorou."', fx: { setFlags: ['amigo_salvo'], fama: 6, karma: 6, stats: { dao: 2, car: 1 }, agenda: [{ event: 'npc_amigo_5', em: [10, 25] }] } }, fail: { text: 'Chega tarde. {amigo} está ferido, e os inimigos fugiram com o que ele guardava. Ainda assim, ele o abraça.', fx: { ferida: 2, karma: 3, stats: { dao: 2 }, agenda: [{ event: 'npc_amigo_5', em: [10, 25] }] } } },
      { text: 'Enviar ajuda, mas não ir pessoalmente.', res: { text: 'A ajuda chega e funciona, em parte. {amigo} sobrevive, agradecido e magoado. Há coisas que dinheiro não paga.', fx: { pedras: -50, karma: 1, agenda: [{ event: 'npc_amigo_5', em: [10, 25] }] } } },
      { text: 'Ignorar o apelo.', res: { text: 'A notícia chega semanas depois: {amigo} morreu, ou desapareceu. Você jura a si mesmo que não pensa nisso, e pensa todos os dias.', fx: { setFlags: ['amigo_perdido'], karma: -8, stats: { dao: -2 } } } },
    ],
  },
  {
    id: 'npc_amigo_5', title: 'O Reencontro Final com {amigo}', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_amigo'], noFlags: ['amigo_perdido'] },
    text: 'Ao fim de muitas décadas, os dois estão velhos, ou quase, e se sentam, lado a lado, sob uma árvore na vila onde cresceram. {amigo} traz uma garrafa e dois copos. "Prometemos seguir o caminho dos imortais. Fomos?"',
    choices: [
      { text: 'Brindar à promessa, cumprida ou não.', res: { text: 'Vocês falam até o céu clarear. Não é um final, é uma pausa, e você a guarda como uma das melhores memórias da vida.', fx: { karma: 8, stats: { dao: 3, car: 2 }, vida: 30, fama: 3 } } },
      { text: 'Confessar o que nunca disse.', res: { text: 'É um segredo pequeno e imenso. {amigo} ouve, ri, chora, e diz que sabia há muitos anos.', fx: { karma: 6, stats: { dao: 4 } } } },
    ],
  },

  /* ================= AMOR ================= */
  {
    id: 'npc_amor_1', title: 'Quem Dançou na Noite das Lanternas', rarity: 'comum', once: true, weight: 2.5,
    cond: { tierMin: 1, tierMax: 4, noFlags: ['npc_amor'] },
    text: 'Na noite do festival, entre mil lanternas e o cheiro de bolos de lótus, uma pessoa esbarra em você, e ri. É {noivo}. A conversa vem fácil, e o tempo some. Quando a música acaba, vocês ainda estão de mãos dadas, sem saber como isso aconteceu.',
    choices: [
      { text: 'Convidar {noivo} para ver o rio ao amanhecer.', res: { text: 'O rio, ao amanhecer, é um espelho de ouro. Vocês combinam de se rever, e cumprem.', fx: { setFlags: ['npc_amor', 'amor_aceito'], stats: { car: 1, dao: 1 }, karma: 1, agenda: [{ event: 'npc_amor_2', em: [3, 6] }] } } },
      { text: 'Agradecer a dança e seguir seu caminho.', res: { text: '{noivo} sorri, entende, e se perde na multidão. Você carrega a imagem por anos, sem saber por quê.', fx: { setFlags: ['npc_amor'], agenda: [{ event: 'npc_amor_2', em: [8, 14] }] } } },
    ],
  },
  {
    id: 'npc_amor_2', title: 'As Cartas e os Pavilhões', rarity: 'comum', once: true, weight: 0,
    cond: { flags: ['npc_amor'] },
    text: '{noivo} e você encontram um jeito de se ver: um recado numa árvore, uma visita a um pavilhão distante, uma carta num frasco. Ninguém mais sabe. Mas as seitas, como as famílias, têm olhos, e o segredo começa a ficar pequeno demais.',
    choices: [
      { text: 'Assumir o relacionamento publicamente.', res: { text: 'Os olhares, as fofocas, as cartas anônimas. Mas também, para sua surpresa, algum apoio, de lugares inesperados.', fx: { setFlags: ['amor_publico'], fama: -2, karma: 3, stats: { car: 1, dao: 1 }, agenda: [{ event: 'npc_amor_3', em: [4, 8] }] } } },
      { text: 'Manter o segredo, e evitar o escândalo.', res: { text: 'O segredo cresce, e pesa. Vocês se encontram em lugares cada vez menos óbvios, e menos tranquilos.', fx: { stats: { sor: 1 }, agenda: [{ event: 'npc_amor_3', em: [4, 8] }] } } },
    ],
  },
  {
    id: 'npc_amor_3', title: 'O Conflito Entre Caminhos', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_amor'] },
    text: '{noivo} segue um caminho diferente do seu: outra seita, outro dever, outra promessa. Hoje, os dois são convocados para lados opostos de uma disputa, e a escolha de cada um pode custar o outro.',
    choices: [
      { text: 'Escolher {noivo}, e abandonar o dever.', res: { text: 'A seita o repreende, e os anciões cortam algumas portas. Mas o olhar de {noivo} compensa muita coisa. Vocês partem juntos.', fx: { setFlags: ['amor_escolhido'], fama: -5, karma: 3, stats: { dao: 2, car: 1 }, agenda: [{ event: 'npc_amor_4', em: [6, 14] }] } } },
      { text: 'Escolher o dever, e perder {noivo}.', res: { text: 'A despedida é calma, e é a mais cruel que você já viveu. {noivo} entende, e é isso que machuca.', fx: { setFlags: ['amor_perdido'], fama: 4, stats: { dao: 3 }, karma: -1, agenda: [{ event: 'npc_amor_4', em: [10, 20] }] } } },
      { text: 'Tentar conciliar: servir aos dois lados.', check: { stat: ['car', 'comp'], dif: 2 }, ok: { text: 'A conciliação é um fio de seda, e funciona. Os dois lados se encontram, aos poucos, e a disputa se dissolve.', fx: { setFlags: ['amor_escolhido'], fama: 8, karma: 6, stats: { car: 2, comp: 1 }, agenda: [{ event: 'npc_amor_4', em: [6, 14] }] } }, fail: { text: 'A conciliação falha. Os dois lados desconfiam de você, e {noivo} se afasta, cansado.', fx: { setFlags: ['amor_perdido'], fama: -3, stats: { comp: 1 }, agenda: [{ event: 'npc_amor_4', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'npc_amor_4', title: 'Os Anos Sem {noivo}', rarity: 'comum', once: true, weight: 0,
    cond: { flags: ['npc_amor'] },
    text: 'Os anos passam. Se estão juntos, a rotina tem a calma das coisas bem cuidadas, e o peso dos que dependem um do outro. Se perderam-se, você pensa em {noivo} em dias de chuva, e mantém, nas gavetas, um bilhete que nunca enviou.',
    choices: [
      { text: 'Cuidar do que tem, com atenção.', cond: { flags: ['amor_escolhido'] }, res: { text: 'Pequenos gestos, grandes anos. O amor de vocês não tem fogos, mas tem raízes.', fx: { karma: 4, stats: { dao: 2, car: 1 }, vida: 20, agenda: [{ event: 'npc_amor_5', em: [10, 25] }] } } },
      { text: 'Buscar {noivo} depois de tanto tempo.', cond: { flags: ['amor_perdido'] }, check: { stat: ['car', 'sor'], dif: 1 }, ok: { text: 'Vocês se reencontram numa cidade ao sul, mais velhos, mais lentos. Há perdão, e nada mais precisa ser dito.', fx: { setFlags: ['amor_escolhido'], karma: 5, stats: { dao: 2 }, agenda: [{ event: 'npc_amor_5', em: [8, 20] }] } }, fail: { text: '{noivo} já tem outra vida. O olhar cortês é a resposta. Você parte, sem rancor, e sem esperança.', fx: { stats: { dao: 3 }, karma: 1, agenda: [{ event: 'npc_amor_5', em: [8, 20] }] } } },
      { text: 'Não buscar: o passado é passado.', cond: { flags: ['amor_perdido'] }, res: { text: 'Você segue o seu caminho. O bilhete, na gaveta, nunca é enviado, e nunca é jogado fora.', fx: { stats: { dao: 2 }, agenda: [{ event: 'npc_amor_5', em: [8, 20] }] } } },
    ],
  },
  {
    id: 'npc_amor_5', title: 'O Último Inverno de {noivo}', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_amor'] },
    text: 'O tempo cobra o seu preço: {noivo} adoece, ou parte, ou apenas envelhece mais depressa do que você. Em qualquer dos casos, chega o inverno em que as palavras importam mais do que os atos.',
    choices: [
      { text: 'Compartilhar uma pílula de longevidade, se tiver.', cond: { item: 'pilula_longevidade' }, res: { text: 'O gesto vale mais do que o tempo que ganha. {noivo} sorri, e jura que o inverno, desta vez, não era o último.', fx: { removeItem: ['pilula_longevidade'], karma: 10, stats: { dao: 3, car: 2 } } } },
      { text: 'Ficar ao lado até o fim.', res: { text: 'Há uma paz estranha em ficar. {noivo} parte numa tarde clara, sorrindo, e você fica com uma canção sem fim na cabeça.', fx: { karma: 8, stats: { dao: 4 }, vida: -5 } } },
      { text: 'Aceitar a despedida, e seguir viagem.', res: { text: 'A despedida é rápida e completa. Você caminha, sem olhar para trás, e chora só ao anoitecer.', fx: { stats: { dao: 3 }, karma: 2 } } },
    ],
  },

  /* ================= DISCÍPULO ================= */
  {
    id: 'npc_disc_1', title: '{discipulo} Pede para Aprender', rarity: 'comum', once: true, weight: 2.5,
    cond: { tierMin: 3, tierMax: 6, noFlags: ['npc_disc'] },
    text: 'Um jovem de roupas remendadas, {discipulo}, espera horas à sua porta, sem comer. Diz que ouviu falar do seu nome em três vilas, e que quer ser o seu aprendiz. Não tem talento óbvio, só uma teimosia que lembra a sua, de tempos atrás.',
    choices: [
      { text: 'Aceitá-lo como discípulo.', res: { text: '{discipulo} prostra-se no chão, em lágrimas. A rotina muda: mais uma tigela na mesa, mais uma lição por dia.', fx: { setFlags: ['npc_disc', 'tem_discipulo'], karma: 3, stats: { car: 1, dao: 1 }, agenda: [{ event: 'npc_disc_2', em: [5, 10] }] } } },
      { text: 'Pedir que prove a determinação por um ano.', res: { text: '{discipulo} varre o pátio, carrega água, e não reclama. Um ano depois, você o aceita, e ele chora ao saber.', fx: { setFlags: ['npc_disc', 'tem_discipulo'], karma: 2, stats: { dao: 2 }, agenda: [{ event: 'npc_disc_2', em: [6, 11] }] } } },
      { text: 'Recusar: não tem tempo para discípulos.', res: { text: '{discipulo} vai embora de cabeça baixa. Um dia, você o encontrará de novo, em outro contexto.', fx: { setFlags: ['npc_disc'], karma: -1, agenda: [{ event: 'npc_disc_2', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'npc_disc_2', title: 'O Erro de {discipulo}', rarity: 'comum', once: true, weight: 0,
    cond: { flags: ['npc_disc'] },
    text: 'Um erro grave: {discipulo}, por orgulho ou descuido, quebra um artefato precioso da seita, ou fere um colega, ou rouba uma pílula. Os anciões pedem uma decisão. Todos olham para você, o mestre.',
    choices: [
      { text: 'Assumir a culpa e pagar por ele.', cond: { flags: ['tem_discipulo'] }, res: { text: '{discipulo} chora, e jura nunca mais. A seita o admira ou o despreza, em partes iguais. A lealdade dele, a partir daí, é de ferro.', fx: { setFlags: ['disc_leal'], fama: -2, karma: 6, pedras: -60, stats: { dao: 2 }, agenda: [{ event: 'npc_disc_3', em: [6, 12] }] } } },
      { text: 'Puni-lo duramente, para dar exemplo.', cond: { flags: ['tem_discipulo'] }, res: { text: 'A seita aprova. {discipulo} aprende, mas algo se quebra entre vocês.', fx: { setFlags: ['disc_ressentido'], karma: -2, fama: 3, agenda: [{ event: 'npc_disc_3', em: [6, 12] }] } } },
      { text: 'Reencontrá-lo anos depois, ainda marcado pelo desamparo.', cond: { noFlags: ['tem_discipulo'] }, res: { text: '{discipulo} foi aceito por outro mestre, e é bom. Ele o cumprimenta com respeito, e uma ponta de mágoa.', fx: { karma: -1, stats: { dao: 1 }, agenda: [{ event: 'npc_disc_3', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'npc_disc_3', title: '{discipulo} Supera o Mestre', rarity: 'raro', once: true, weight: 0, escala: true,
    cond: { flags: ['npc_disc'] },
    text: 'Chega o dia em que {discipulo} vence você, num treino aparentemente inocente. Não foi por trapaça. Ele, simplesmente, está melhor. O pátio fica em silêncio, esperando a sua reação.',
    choices: [
      { text: 'Cumprimentá-lo diante de todos.', res: { text: 'A seita aplaude. {discipulo} chora. Algo muda: o mestre passa a ser, aos poucos, alguém que também aprende.', fx: { karma: 6, fama: 5, stats: { dao: 3, car: 1 }, agenda: [{ event: 'npc_disc_4', em: [8, 16] }] } } },
      { text: 'Pedir uma revanche, para provar que não foi sorte.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você vence a revanche, com dificuldade. {discipulo} sorri, aliviado: "Eu precisava saber que ainda tinha o que aprender."', fx: { fama: 6, xp: 5, stats: { dao: 1 }, agenda: [{ event: 'npc_disc_4', em: [8, 16] }] } }, fail: { text: 'Você perde, de novo, e agora sem desculpa. {discipulo} abaixa a espada, constrangido.', fx: { fama: -2, stats: { dao: 2 }, agenda: [{ event: 'npc_disc_4', em: [8, 16] }] } } },
      { text: 'Retirar-se com dignidade, sem comentários.', res: { text: 'Você sai do pátio de cabeça erguida. A noite, porém, é longa.', fx: { stats: { dao: 2 }, agenda: [{ event: 'npc_disc_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'npc_disc_4', title: 'A Escolha de {discipulo}', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_disc'] },
    text: '{discipulo} vem a você, com a postura de quem ensaiou. Recebeu um convite de outra seita, mais rica, e deve escolher entre ficar ao seu lado ou partir. "Eu aceitaria o que o mestre decidisse", diz, mentindo muito mal.',
    choices: [
      { text: 'Deixá-lo ir, com a sua bênção.', res: { text: '{discipulo} parte, chorando. Anos depois, volta como um nome respeitado, e jamais se esquece de agradecer.', fx: { karma: 8, stats: { dao: 3 }, setFlags: ['disc_livre'], agenda: [{ event: 'npc_disc_5', em: [10, 25] }] } } },
      { text: 'Pedir que fique, por afeto.', res: { text: 'Ele fica, e o convite se perde. Você nunca sabe se foi o certo, e nunca pergunta.', fx: { karma: 1, stats: { car: 1 }, agenda: [{ event: 'npc_disc_5', em: [10, 25] }] } } },
      { text: 'Proibir: ele deve lealdade à sua escola.', res: { text: '{discipulo} obedece, calado. Algo em seus olhos apaga, e ele, em poucos anos, abandona a escola sem se despedir.', fx: { karma: -5, stats: { dao: -1 }, setFlags: ['disc_ressentido'], agenda: [{ event: 'npc_disc_5', em: [10, 25] }] } } },
    ],
  },
  {
    id: 'npc_disc_5', title: 'O Legado de {discipulo}', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_disc'] },
    text: 'Muito tempo depois, {discipulo} volta, já mestre, com uma escola própria e um nome conhecido. Traz consigo uma tabuleta de madeira, com a sua frase favorita gravada. "Ensinei o que o senhor me ensinou", diz. "E mais um pouco."',
    choices: [
      { text: 'Aceitar a tabuleta e sentar para conversar.', res: { text: 'A tabuleta, depois, está pendurada na entrada da escola dele, para sempre. Você é, de alguma forma, imortal, e sorri.', fx: { karma: 10, fama: 10, stats: { dao: 3, car: 2 }, setFlags: ['legado_discipulo'] } } },
      { text: 'Perguntar o que ele aprendeu que você não sabia.', res: { text: 'Ele conta, e você ouve a noite inteira. Ao amanhecer, sai mais jovem, de algum jeito.', fx: { karma: 4, stats: { comp: 3, dao: 2 }, xp: 5 } } },
    ],
  },

  /* ================= INIMIGO JURADO ================= */
  {
    id: 'npc_inim_1', title: 'O Nome Que Você Jurou Lembrar', rarity: 'comum', once: true, weight: 2.2,
    cond: { tierMin: 1, tierMax: 3, noFlags: ['npc_inim'] },
    text: 'Numa noite escura, homens armados cercam alguém que você ama. O líder, um homem de cicatriz no olho, diz um nome ao partir: {inimigo}. Você o ouve, fixa, e o repete em silêncio até a madrugada. A dor não passa; só cresce, e se organiza.',
    choices: [
      { text: 'Jurar vingança e treinar por isso.', res: { text: 'A raiva é combustível. Os treinos ficam duros, e a cada golpe você vê o rosto de {inimigo}. O preço, você paga em outros lugares.', fx: { setFlags: ['npc_inim', 'inim_vinganca'], stats: { fis: 2, dao: 1 }, karma: -2, corr: 3, agenda: [{ event: 'npc_inim_2', em: [5, 10] }] } } },
      { text: 'Chorar, enterrar, e seguir em frente.', res: { text: 'O luto é longo. Você lembra o nome de {inimigo}, mas não o alimenta. Um dia, talvez, o nome volte, de outro jeito.', fx: { setFlags: ['npc_inim', 'inim_luto'], stats: { dao: 2 }, karma: 2, agenda: [{ event: 'npc_inim_2', em: [8, 14] }] } } },
    ],
  },
  {
    id: 'npc_inim_2', title: 'A Pista de {inimigo}', rarity: 'comum', once: true, weight: 0,
    cond: { flags: ['npc_inim'] },
    text: 'Uma pista: um viajante diz ter visto {inimigo} numa cidade distante, usando outro nome, protegido por uma família rica. Ele agora vive confortável, e esqueceu quem foi.',
    choices: [
      { text: 'Ir até a cidade e investigar.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'Em duas semanas, você descobre onde ele mora, quem o protege, e a que horas sai. A informação pesa como uma pedra.', fx: { setFlags: ['inim_localizado'], stats: { comp: 2 }, agenda: [{ event: 'npc_inim_3', em: [4, 8] }] } }, fail: { text: 'A cidade é vigiada. Você volta sem nada, e com a certeza de que foi notado.', fx: { stats: { comp: 1 }, setFlags: ['inimigo_secreto'], agenda: [{ event: 'npc_inim_3', em: [6, 12] }] } } },
      { text: 'Ignorar a pista.', res: { text: 'Você a guarda, em silêncio. Anos depois, ela voltará, mais fria, e com consequências maiores.', fx: { stats: { dao: 1 }, agenda: [{ event: 'npc_inim_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'npc_inim_3', title: 'Cara a Cara com {inimigo}', rarity: 'raro', once: true, weight: 0, escala: true,
    cond: { flags: ['npc_inim'] },
    text: 'Você e {inimigo} finalmente se encontram, numa estalagem de beira de estrada. Ele não o reconhece. Está mais velho, mais gordo, mais cansado. Pede vinho, e o garçom o chama de "senhor".',
    choices: [
      { text: 'Revelar quem você é, e desafiá-lo.', check: { stat: ['fis', 'esp', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'O desafio termina em segundos. {inimigo} cai de joelhos, e pede perdão. A vingança está nas suas mãos, e pesa muito mais do que imaginou.', fx: { setFlags: ['inim_derrotado'], fama: 6, xp: 5, stats: { dao: 1 }, agenda: [{ event: 'npc_inim_4', em: [1, 2] }] } }, fail: { text: '{inimigo} tem guarda-costas. Você é derrotado, e só escapa por sorte.', fx: { ferida: 3, fama: -3, stats: { dao: 2 }, agenda: [{ event: 'npc_inim_4', em: [6, 12] }] } } },
      { text: 'Observá-lo sem agir, e decidir depois.', res: { text: 'O dia passa. Você o segue até a casa, e o vê brincar com um neto no jardim. A raiva, de algum modo, não sabe o que fazer.', fx: { stats: { dao: 2, comp: 1 }, setFlags: ['inim_localizado'], agenda: [{ event: 'npc_inim_4', em: [1, 3] }] } } },
      { text: 'Sentar à mesa dele e pedir um copo.', res: { text: '{inimigo}, sem entender, serve. A conversa dura horas. Ele não sabe quem você é, e você sabe tudo sobre ele.', fx: { stats: { car: 1, comp: 1 }, agenda: [{ event: 'npc_inim_4', em: [1, 3] }] } } },
    ],
  },
  {
    id: 'npc_inim_4', title: 'Vingança ou Perdão', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_inim'] },
    text: 'O momento chegou. {inimigo} está à sua mercê: sozinho, doente, ou desarmado. A espada na sua mão é pesada. Ele sabe quem você é agora, e olha, sem pedir nada.',
    choices: [
      { text: 'Matá-lo: a dívida de sangue se paga com sangue.', res: { text: 'O golpe é limpo. O silêncio que vem é maior do que você esperava. A dor antiga não vai embora, só muda de forma.', fx: { setFlags: ['inim_morto'], karma: -10, corr: 8, stats: { dao: -2, fis: 1 }, fama: 4, agenda: [{ event: 'npc_inim_5', em: [10, 25] }] } } },
      { text: 'Poupá-lo e exigir que repare o que fez.', res: { text: '{inimigo} dedica anos a reconstruir o que destruiu. Não é justiça perfeita, mas é justiça viva. A dor, aos poucos, cede.', fx: { setFlags: ['inim_poupado'], karma: 10, stats: { dao: 4 }, agenda: [{ event: 'npc_inim_5', em: [10, 25] }] } } },
      { text: 'Deixá-lo viver, e partir sem dizer palavra.', res: { text: 'Você embainha a espada e sai. A pior vingança é o esquecimento, e você a pratica por anos, até que ela vire paz.', fx: { setFlags: ['inim_poupado'], karma: 6, stats: { dao: 3 }, agenda: [{ event: 'npc_inim_5', em: [10, 25] }] } } },
    ],
  },
  {
    id: 'npc_inim_5', title: 'O Peso do Que Foi Feito', rarity: 'raro', once: true, weight: 0,
    cond: { flags: ['npc_inim'] },
    text: 'Décadas depois, a história de {inimigo} volta a você de um jeito inesperado: um filho dele, uma lápide, uma carta, um sonho. O que você fez, ou deixou de fazer, ainda ressoa, como um sino distante.',
    choices: [
      { text: 'Aceitar o peso, qualquer que seja.', res: { text: 'Você carrega a memória sem fugir. Há uma paz estranha nisso, a de quem não mente para si.', fx: { stats: { dao: 4 }, karma: 4, corr: -5 } } },
      { text: 'Tentar reparar o que ainda puder.', res: { text: 'Uma doação, uma visita, uma frase. Pequenos gestos que ninguém cobra, e que, de alguma maneira, o libertam.', fx: { karma: 8, pedras: -50, stats: { dao: 3, car: 1 } } } },
    ],
  },
];
