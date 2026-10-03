import type { GameEvent } from '../../types';

/**
 * Lote 14 — Sensação de poder (parte 1).
 * (a) Ameaças menores: quem já passou do reino do inimigo resolve a cena em uma linha e escolhe como (esmagar, assustar, poupar),
 *     com consequências morais e de reputação, sem teste.
 * (b) Marcos: um evento exclusivo logo após cada rompimento, com a reação do mundo ao novo reino.
 */
export const lote14Poder: GameEvent[] = [
  /* ================= AMEAÇAS MENORES (sem teste) ================= */
  {
    id: 'menor_bandidos', title: 'Bandidos Pequenos na Estrada', rarity: 'comum', cooldown: 30, weight: 1.6,
    cond: { tierMin: 3 },
    alt: ['Quatro homens de faca na mão bloqueiam a trilha, com o ar de quem nunca escolheu uma vítima errada. Eles ainda não sentiram o peso da sua presença.'],
    text: 'Seis bandidos de rosto marcado cercam você numa curva da estrada, rindo. Para eles, você é só mais um viajante. Para você, são seis crianças brincando de soldado.',
    choices: [
      { text: 'Esmagar: deixar claro quem manda no caminho.', res: { text: 'Um aceno, um estalo de ar, e a estrada fica vazia. Alguém vai achar os corpos ao entardecer.', alt: ['Uma pressão de Qi atravessa a clareira. Eles caem, um a um, sem tempo para gritar.'], fx: { karma: -5, fama: 1 } } },
      { text: 'Assustar: libertar apenas um pouco de aura.', res: { text: 'O sorriso deles murcha. Largam as facas e correm tropeçando. Não voltarão àquele trecho tão cedo.', alt: ['Você sorri. É o bastante. Eles deixam as armas no chão e somem entre as árvores.'], fx: { fama: 3, karma: 1 } } },
      { text: 'Poupar: ouvir antes de decidir.', res: { text: 'Todos acabam contando a mesma história de fome e dívidas. Você dá algumas pedras e uma lição que não vão esquecer.', fx: { karma: 6, pedras: -10, fama: 1 } } },
    ],
  },
  {
    id: 'menor_jovem_mestre', title: 'O Herdeiro Insolente', rarity: 'comum', cooldown: 35, weight: 1.4,
    cond: { tierMin: 3 },
    text: 'Um jovem de roupas finas ergue o queixo e exige que você se ajoelhe, porque o pai dele "comanda três vales". Seus guardas já puxaram as espadas. Você tem mais anos de cultivo do que a família inteira dele de vida.',
    choices: [
      { text: 'Esmagar: humilhar o jovem diante dos seus guardas.', res: { text: 'Uma palma suave o faz ajoelhar de verdade. Os guardas desviam o olhar. O pai, mais tarde, vai guardar rancor.', fx: { fama: 2, karma: -3, setFlags: ['pai_do_jovem_mestre'] } } },
      { text: 'Assustar: sorrir e seguir adiante.', res: { text: 'A aura passa como brisa gelada. O jovem gagueja um pedido de desculpas e perde a voz pelo resto do dia.', fx: { fama: 3 } } },
      { text: 'Poupar: dar-lhe um conselho que ele não vai ouvir.', res: { text: 'Você diz que todo trono é emprestado. Ele ri. Mas na volta para casa, no cavalo, repete a frase baixinho.', fx: { karma: 4, fama: 1, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'menor_assassino', title: 'O Assassino Que Errou o Alvo', rarity: 'comum', cooldown: 35, weight: 1.2,
    cond: { tierMin: 4 },
    text: 'Uma lâmina fina para a um palmo da sua garganta, segurada por uma mão que tremeu. O assassino, um cultivador de Fundação, percebe tarde demais que escolheu a vítima errada. Os olhos dele já se despedem do mundo.',
    choices: [
      { text: 'Esmagar: acabar com ele e com a ameaça.', res: { text: 'Nada sobra para ser enterrado. A mensagem para quem o enviou é clara, e cara.', fx: { karma: -4, fama: 2 } } },
      { text: 'Assustar: arrancar o nome de quem o contratou.', res: { text: 'Duas perguntas bastam. O nome vem junto com o suor frio. Você guarda o nome para um dia oportuno.', fx: { setFlags: ['inimigo_secreto'], stats: { comp: 1 } } } },
      { text: 'Poupar: devolver a lâmina e pedir que sirva a outro mestre.', res: { text: 'Ele chora, ajoelha, jura. Talvez cumpra. Talvez não. A dúvida é parte do preço.', fx: { karma: 7, fama: 2 } } },
    ],
  },
  {
    id: 'menor_seita_menor', title: 'A Seita Pequena e Orgulhosa', rarity: 'comum', cooldown: 40, weight: 1.2,
    cond: { tierMin: 4 },
    text: 'Os cinco anciões de uma seita de vale fecham o portão na sua cara e exigem que você declare "o que veio roubar". Cada um deles seria um gigante em sua aldeia; diante de você, são jovens com cara de severidade.',
    choices: [
      { text: 'Esmagar: abrir o portão à força e ficar no pátio.', res: { text: 'O portão cai com um som que ecoa pelo vale. Eles se curvam sem dizer palavra, e você bebe o chá deles em silêncio.', fx: { fama: 3, karma: -3 } } },
      { text: 'Assustar: mostrar um pouco da sua aura e pedir hospitalidade.', res: { text: 'O silêncio vira cortesia imediata. Você ganha um quarto, uma ceia e a promessa de que não perguntarão seu nome.', fx: { fama: 2, pedras: 20 } } },
      { text: 'Poupar: sentar fora do portão e esperar o convite.', res: { text: 'Ao fim do dia, o ancião mais velho vem pessoalmente abrir. "Poucos seriam tão pacientes", diz, sem entender o motivo.', fx: { karma: 5, fama: 3, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'menor_fera', title: 'A Fera Que Não Reconhece Você', rarity: 'comum', cooldown: 30, weight: 1.4,
    cond: { tierMin: 4 },
    text: 'Uma fera de dentes do tamanho de adagas surge na trilha, eriçada de fome. Aos olhos dela, você é presa. Aos seus, é um bicho de quem se pode ter piedade ou lucro.',
    choices: [
      { text: 'Esmagar: abater a fera e colher seu núcleo.', res: { text: 'Um golpe, um grito, um corpo grande no chão. O núcleo ainda está quente nas suas mãos.', fx: { pedras: 60, karma: -1, item: ['nucleo_besta_baixo'] } } },
      { text: 'Assustar: deixar a aura cair sobre ela.', res: { text: 'A fera encolhe, rosna uma vez e some entre as pedras. Aprende a medir o tamanho do mundo.', fx: { fama: 2 } } },
      { text: 'Poupar: oferecer comida e deixá-la ir.', res: { text: 'Ela cheira a sua mão, come, e desaparece. Dias depois, deixa uma pele de presente na porta da sua cabana.', fx: { karma: 4, stats: { car: 1, sor: 1 } } } },
    ],
  },
  {
    id: 'menor_duelista', title: 'O Duelista da Estalagem', rarity: 'comum', cooldown: 35, weight: 1.2,
    cond: { tierMin: 3 },
    text: 'Na estalagem, um espadachim de reputação local bate a bainha na mesa e anuncia que quer "testar a lâmina" do forasteiro. A taverna cala. Ele não faz ideia do que acabou de pedir.',
    choices: [
      { text: 'Esmagar: derrubar a espada dele sem tirar a sua.', res: { text: 'Um dedo, um som seco, e a lâmina dele está cravada no teto. A taverna aplaude em silêncio.', fx: { fama: 4, karma: -1 } } },
      { text: 'Assustar: aceitar o duelo e vencer sem um arranhão.', res: { text: 'Três passes. No terceiro, ele já está agradecendo pela lição. O dono da taverna oferece vinho por conta da casa.', fx: { fama: 3, stats: { dao: 1 } } } },
      { text: 'Poupar: recusar, com educação.', res: { text: 'Você paga a conta e vai embora. O duelista conta a todos que o desafiou, e que você "teve medo". Ninguém acredita.', fx: { karma: 3, fama: 1 } } },
    ],
  },
  {
    id: 'menor_rival_do_passado', title: 'O Rival Que Ficou para Trás', rarity: 'raro', cooldown: 70, weight: 1.2,
    cond: { tierMin: 5 },
    text: 'Um homem de cabelos brancos, ainda no Refinamento de Qi, sobe a colina para encontrar você. É {rival}, de décadas atrás. "Eu jurei que o alcançaria", diz, sem forças para erguer a lâmina. "Mas o mundo é maior que meu orgulho."',
    choices: [
      { text: 'Esmagar o juramento: encerrar a conversa com uma palma gentil.', res: { text: 'Ele cai sem dor, e sem saber por quê. Você sente o peso de uma vida inteira ser levada pelo vento.', fx: { karma: -6, stats: { dao: -1 } } } },
      { text: 'Reconhecê-lo: oferecer a ele uma pílula para dobrar a vida.', res: { text: 'Ele aceita com as mãos trêmulas. "Isto é uma esmola?", pergunta. "É uma dívida", você responde. Ele ri, e chora.', fx: { karma: 8, fama: 2, stats: { dao: 1 } } } },
      { text: 'Poupar: sentar com ele e beber chá.', res: { text: 'Falam de coisas simples, de professores mortos, de um tempo que não volta. Ao anoitecer, ele parte em paz.', fx: { karma: 5, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'menor_cultivador_mau', title: 'O Cultivador de Pacto Sujo', rarity: 'comum', cooldown: 40, weight: 1.0,
    cond: { tierMin: 4 },
    text: 'Um cultivador de Fundação, de olhos injetados, arrasta um vilarejo inteiro para sacrificar a um altar torto. Ele sorri ao ver você chegar, achando que é só mais uma presa.',
    choices: [
      { text: 'Esmagar: acabar com ele diante dos aldeões.', res: { text: 'O altar racha, o homem desaba. Os aldeões olham você como a um deus, e não sabem se devem ter medo.', fx: { karma: 9, fama: 5 } } },
      { text: 'Assustar: expulsá-lo da região com uma única frase.', res: { text: 'Ele foge. Em algum lugar, vai tentar de novo. Mas não neste vale, não nesta década.', fx: { karma: 5, fama: 3 } } },
      { text: 'Poupar: oferecer a ele um caminho melhor.', res: { text: 'Ele cospe, mas guarda o que você disse. Meses depois, um mensageiro traz notícias: ele fechou o altar.', fx: { karma: 8, stats: { dao: 1, car: 1 } } } },
    ],
  },

  /* ================= MARCOS DE REINO (reação do mundo) ================= */
  {
    id: 'marco_t1', title: 'O Primeiro Sinal', rarity: 'comum', once: true, weight: 8,
    cond: { tierMin: 1, tierMax: 1, noFlags: ['marco_t1'] },
    text: 'Seu primeiro rompimento não passa despercebido: o vizinho nota que você já não sente frio, a criança do mercado corre para contar que você sabe "fazer a água dançar". Para a vila, você deixou de ser um deles.',
    choices: [
      { text: 'Aceitar a atenção e dar uma pequena demonstração.', res: { text: 'As crianças aplaudem, os velhos fazem sinal contra mau-olhado. Seu nome começa a viajar de boca em boca.', fx: { setFlags: ['marco_t1'], fama: 4, stats: { car: 1 } } } },
      { text: 'Esconder o que mudou.', res: { text: 'Você veste a mesma roupa, abaixa a cabeça, ri das piadas. Só que dorme agora com a janela aberta, ouvindo o Qi da noite.', fx: { setFlags: ['marco_t1'], stats: { dao: 1, sor: 1 } } } },
    ],
  },
  {
    id: 'marco_t2', title: 'A Reação da Seita', rarity: 'comum', once: true, weight: 8,
    cond: { tierMin: 2, tierMax: 2, noFlags: ['marco_t2'] },
    text: 'Você é {reino}. Os instrutores deixam de corrigir seus erros; os colegas deixam de zombar. Num mesmo dia, um ancião manda chamar você e um rival abaixa o olhar. A hierarquia, de repente, encolheu e esticou ao mesmo tempo.',
    choices: [
      { text: 'Ir ao ancião, que quer oferecer-lhe um posto.', res: { text: 'Ele lhe oferece o cargo de monitor de um grupo de recém-chegados, com acesso à biblioteca interna. O poder vem junto com tarefas.', fx: { setFlags: ['marco_t2'], fama: 5, xp: 3, stats: { car: 1 } } } },
      { text: 'Aproveitar o respeito para viajar sem avisar ninguém.', res: { text: 'A porta da seita se fecha às suas costas, e o mundo do lado de fora é largo. Você sabe que é, de verdade, outra pessoa agora.', fx: { setFlags: ['marco_t2'], stats: { sor: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'marco_t3', title: 'Os Convites Chegam', rarity: 'comum', once: true, weight: 8,
    cond: { tierMin: 3, tierMax: 3, noFlags: ['marco_t3'] },
    text: 'Passam-se apenas semanas desde que você se tornou {reino}, e as cartas já não cabem na mesa: convites de seitas, ofertas de cargos, pedidos de casamento arranjado entre clãs. Em cada selo de cera há um interesse diferente.',
    choices: [
      { text: 'Aceitar o cargo de ancião numa seita de peso.', res: { text: 'Você assume o assento de ancião, com direito a pavilhão próprio e uma fila de discípulos esperando atenção. Também herda as dívidas políticas da cadeira.', fx: { setFlags: ['marco_t3', 'anciao'], fama: 12, pedras: 120, karma: 1 } } },
      { text: 'Recusar todos e manter-se livre.', res: { text: 'As cartas ficam sem resposta. Alguns se ofendem, outros se encantam. Você ganha a reputação de alguém que "não se vende".', fx: { setFlags: ['marco_t3'], fama: 6, stats: { dao: 2 } } } },
      { text: 'Aceitar a oferta que paga mais.', res: { text: 'O contrato é cheio de cláusulas pequenas e de uma, grande, que você só vai ler depois. Por ora, o ouro pesa bem no bolso.', fx: { setFlags: ['marco_t3'], pedras: 300, karma: -2, fama: 4 } } },
    ],
  },
  {
    id: 'marco_t4', title: 'Os Olhos que Se Voltam', rarity: 'comum', once: true, weight: 8,
    cond: { tierMin: 4, tierMax: 4, noFlags: ['marco_t4'] },
    text: 'Quando você se torna {reino}, o mundo muda de tom. Os tolos o temem, os sábios o testam. Mensageiros anônimos deixam presentes que podem ser veneno. Uma carta sem selo diz apenas: "Estamos de olho."',
    choices: [
      { text: 'Investigar quem enviou a carta.', res: { text: 'A trilha leva a três nomes, e nenhum deles é amigo. Ao menos agora você sabe quem anda por perto.', fx: { setFlags: ['marco_t4', 'inimigo_secreto'], stats: { comp: 1, esp: 1 } } } },
      { text: 'Reforçar sua defesa: formações, talismãs, vigias.', res: { text: 'Gasta tempo e pedras, mas dorme tranquilo. O ataque que viria em seguida bate numa parede e vai embora.', fx: { setFlags: ['marco_t4'], pedras: -60, stats: { dao: 1 } } } },
      { text: 'Ignorar e seguir cultivando.', res: { text: 'Nada acontece por meses, e isso, por si, é uma resposta. Quem observa agora sabe que não vai conseguir assustá-lo.', fx: { setFlags: ['marco_t4'], xp: 4, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'marco_t5', title: 'Emissários dos Quatro Cantos', rarity: 'comum', once: true, weight: 8,
    cond: { tierMin: 5, tierMax: 5, noFlags: ['marco_t5'] },
    text: 'Seu nome agora aparece em mapas. Emissários de três reinos, duas seitas e um clã antigo esperam em fila no seu portão. Cada um traz um presente e um pedido; nenhum deles diz tudo que quer.',
    choices: [
      { text: 'Receber os emissários com cortesia e ouvir todos.', res: { text: 'Você escuta e não promete nada. No fim, todos saem satisfeitos, e nenhum conseguiu o que queria. É uma arte, e você começa a dominá-la.', fx: { setFlags: ['marco_t5'], fama: 10, stats: { car: 2 } } } },
      { text: 'Escolher uma aliança e selá-la com um pacto.', res: { text: 'O pacto lhe dá um exército de cultivadores a uma carta de distância. Também dá a seus inimigos um motivo para erguer os escudos.', fx: { setFlags: ['marco_t5', 'pacto_politico'], fama: 14, pedras: 200, karma: -1 } } },
      { text: 'Fechar o portão e declarar retiro.', res: { text: 'Os emissários partem ressentidos. O mundo conhece, agora, a sua forma de dizer "não".', fx: { setFlags: ['marco_t5'], xp: 6, stats: { dao: 2 }, fama: 3 } } },
    ],
  },
  {
    id: 'marco_t6', title: 'O Chamado de Outro Plano', rarity: 'raro', once: true, weight: 8,
    cond: { tierMin: 6, tierMax: 6, noFlags: ['marco_t6'] },
    text: 'No instante em que você se torna {reino}, o céu inteiro silencia. Um olhar, de algum lugar acima das nuvens, pousa em você por um piscar e vai embora. Cultivadores distantes sentem um arrepio. Pela primeira vez, os assuntos do mundo mortal parecem um pátio de brincar.',
    choices: [
      { text: 'Subir ao pico mais alto e responder ao olhar.', res: { text: 'Nenhuma resposta vem. Mas, do alto, você vê com clareza o que antes só intuía: o mundo tem uma costura, e você está aprendendo a puxar o fio.', fx: { setFlags: ['marco_t6'], stats: { dao: 2, esp: 1 }, fama: 6 } } },
      { text: 'Fingir que nada aconteceu e voltar às suas coisas.', res: { text: 'Funciona por alguns dias. Depois você se pega olhando o céu de soslaio, como quem aguarda uma visita.', fx: { setFlags: ['marco_t6'], xp: 4 } } },
    ],
  },
  {
    id: 'marco_t7', title: 'Reis Ajoelhados', rarity: 'raro', once: true, weight: 8,
    cond: { tierMin: 7, tierMax: 7, noFlags: ['marco_t7'] },
    text: 'Quando a notícia de que você alcançou {reino} chega às cortes, três reis cancelam as guerras do ano. Um quarto envia uma carta em papel dourado, escrita com letra trêmula: "Peço apenas que se lembre de nós, mortais, quando olhar de cima."',
    choices: [
      { text: 'Aceitar o título de Protetor do Reino.', res: { text: 'As bandeiras com o seu emblema sobem nas muralhas. Os mortais dormem melhor, e você carrega agora um peso a mais.', fx: { setFlags: ['marco_t7', 'protetor_reino'], fama: 14, karma: 6 } } },
      { text: 'Recusar todo título, e manter só a amizade dos reis.', res: { text: 'Eles aceitam, aliviados e confusos. Você é, de agora em diante, uma lenda que não manda em ninguém, e por isso é mais temida.', fx: { setFlags: ['marco_t7'], fama: 8, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'marco_t8', title: 'O Limiar do Céu', rarity: 'lendario', once: true, weight: 8,
    cond: { tierMin: 8, tierMax: 8, noFlags: ['marco_t8'] },
    text: 'No topo do mundo mortal, o ar tem gosto de metal e promessa. Você ouve, pela primeira vez, o som das leis do Céu: um zumbido contínuo, como um instrumento afinando. Falta pouco, e tudo que fez até aqui ecoa em você.',
    choices: [
      { text: 'Meditar sobre as leis, sem pressa.', res: { text: 'Por anos, você aprende o idioma do Céu. Não o domina, mas já consegue ouvir quando ele discorda.', fx: { setFlags: ['marco_t8'], xp: 8, stats: { dao: 3, comp: 2 } } } },
      { text: 'Descer, uma última vez, à vila onde tudo começou.', res: { text: 'A vila já não existe como era, mas a árvore da entrada ainda está lá, maior. Você senta debaixo dela e deixa a ideia de ascender esperar mais um pouco.', fx: { setFlags: ['marco_t8'], karma: 6, stats: { dao: 2, car: 1 } } } },
    ],
  },
];
