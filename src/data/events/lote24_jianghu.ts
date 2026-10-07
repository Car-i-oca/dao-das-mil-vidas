import type { GameEvent } from '../../types';

/**
 * Lote 24 — Jianghu (tropos de wuxia e murim): agência de escolta, mapa do tesouro, manual roubado, Irmandade dos Panos Velhos,
 * Palácio do Gelo, clã de venenos, taberna cheia de espiões, Conferência dos Punhos e Lâminas, mestre escondido, espada lendária.
 */
export const lote24Jianghu: GameEvent[] = [
  {
    id: 'jh_escolta', title: 'A Agência de Escolta', rarity: 'comum', cooldown: 40, weight: 1.6, escala: true,
    cond: { tierMin: 1, tierMax: 4 },
    text: 'Numa agência de escolta da cidade, o chefe procura um braço extra para levar um baú selado ao Porto de Jade. "Ninguém pergunta o que tem dentro", diz. "Quem pergunta, não volta." O pagamento é bom, e o selo na tampa, esquisito.',
    choices: [
      { text: 'Aceitar o serviço e proteger o baú.', check: { stat: ['fis', 'comp', 'sor'], dif: 1, tag: 'combate' }, ok: { text: 'Duas emboscadas depois, o baú chega ao porto. O destinatário abre sozinho, e agradece com um saquinho extra e um aviso: "Esqueça tudo."', fx: { pedras: 60, fama: 4, stats: { fis: 1, comp: 1 } } }, fail: { text: 'A segunda emboscada separa você do baú. O chefe da agência lhe paga metade, com frieza.', fx: { ferida: 2, pedras: 20, fama: -1 } } },
      { text: 'Abrir o baú escondido, no meio da viagem.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'Dentro, um cadáver de manto negro, e uma carta: "Se esta caixa chegar, o plano falhou." Você fecha, sua frio, e entrega mesmo assim.', fx: { stats: { comp: 2 }, setFlags: ['viu_o_baul'], pedras: 40 } }, fail: { text: 'O selo se rompe com um estalo e uma fumaça roxa. Você acorda horas depois, sem o baú e sem pagamento.', fx: { ferida: 1, fama: -3 } } },
      { text: 'Recusar: o selo cheira a problema.', res: { text: 'O chefe encolhe os ombros. Semanas depois, um boato diz que o baú nunca chegou, e que o escolta nunca mais foi visto.', fx: { stats: { sor: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'jh_mapa_tesouro', title: 'O Mapa Rasgado em Três', rarity: 'raro', once: true, weight: 1.4,
    cond: { tierMin: 1, tierMax: 4 },
    text: 'Um moribundo lhe entrega um pedaço de couro rasgado e morre com um nome nos lábios: "Pavilhão... do Corvo". O mapa mostra só um terço do caminho. Os outros dois pedaços estão com gente que, provavelmente, também está sendo caçada.',
    choices: [
      { text: 'Procurar os outros pedaços.', check: { stat: ['comp', 'sor', 'car'], dif: 1 }, ok: { text: 'Depois de meses, você reúne os três. O caminho leva a uma gruta seca, com uma arca, e dentro, uma lâmina, uma pílula e uma carta de despedida de um mestre que ninguém jamais encontrou.', fx: { item: ['pilula_passagem_3', 'espada_ferro_frio'], pedras: 150, fama: 6, xp: 8, stats: { sor: 1, comp: 1 } } }, fail: { text: 'Dois outros caçadores chegam primeiro. Você sai de lá com um corte no braço e o terço do mapa que nunca serviu.', fx: { ferida: 2, stats: { comp: 1 } } } },
      { text: 'Vender o pedaço de mapa a quem pagar mais.', res: { text: 'Um colecionador paga bem. Você nunca saberá o que havia na gruta, e tenta não pensar nisso.', fx: { pedras: 80, karma: -1 } } },
      { text: 'Queimar o mapa: tesouros trazem desgraça.', res: { text: 'O couro arde com um cheiro de gordura antiga. Você, aliviado, sente que escapou de algo.', fx: { stats: { dao: 2 }, karma: 2 } } },
    ],
  },
  {
    id: 'jh_manual_roubado', title: 'O Manual Roubado', rarity: 'raro', cooldown: 80, weight: 1.2,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'Um ladrão ferido se esconde no seu quarto e implora abrigo. Em suas vestes, escondido, um manual roubado de um Pavilhão de uma das Nove Casas do Continente. "Quem o tiver será caçado", ofega. "Mas quem o dominar..."',
    choices: [
      { text: 'Esconder o ladrão e ficar com uma cópia.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'Você copia a noite inteira. O ladrão foge ao amanhecer, e os caçadores da seita revistam a casa sem achar a cópia. Você aprende um método cara.', fx: {  stats: { comp: 2 }, karma: -4, setFlags: ['inimigo_secreto'] } }, fail: { text: 'Os caçadores chegam cedo demais. Você escapa com cortes e sem a cópia. O ladrão não teve a mesma sorte.', fx: { ferida: 2, karma: -2 } } },
      { text: 'Entregar o ladrão e o manual à seita.', res: { text: 'A seita agradece com uma bolsa e uma carta de recomendação. O ladrão, ao ser levado, olha para você sem rancor, e isso é pior.', fx: { pedras: 70, fama: 5, karma: -3 } } },
      { text: 'Ajudar o ladrão a fugir, sem tocar no manual.', res: { text: 'Você o esconde numa carroça de feno. O manual vai com ele. Seu nome fica limpo, e a sua consciência, também.', fx: { karma: 5, stats: { dao: 1, sor: 1 } } } },
    ],
  },
  {
    id: 'jh_cla_mendigos', title: 'A Irmandade dos Panos Velhos', rarity: 'comum', cooldown: 60, weight: 1.2,
    cond: { tierMin: 1, tierMax: 4 },
    text: 'Numa esquina da cidade, um mendigo de olhos espertos faz um sinal de mão. Você a reconhece: a Irmandade dos Panos Velhos, a rede de informantes mais espalhada do continente. Ele propõe uma troca: um favor de você por um segredo que vale ouro.',
    choices: [
      { text: 'Aceitar o favor e pedir o segredo.', check: { stat: ['car', 'sor'], dif: 0 }, ok: { text: 'O favor é pequeno: levar uma mensagem. O segredo é grande: onde mora o homem que destruiu a sua vila, ou o nome de quem manda em um monopólio. Você sai com uma pista cara.', fx: { stats: { comp: 1, car: 1 }, setFlags: ['pista_do_cla_mendigos'], fama: 2 } }, fail: { text: 'O mensageiro some com o seu bilhete. O Clã diz que a troca "não era equivalente". Você sai com uma lição, e sem segredo.', fx: { pedras: -10, stats: { car: 1 } } } },
      { text: 'Dar uma esmola e seguir adiante.', res: { text: 'O mendigo sorri, e anota algo na manga. Meses depois, a sua fama chegará mais longe do que você imagina.', fx: { karma: 2, fama: 2 } } },
      { text: 'Ignorar o sinal: não quer dívidas.', res: { text: 'O mendigo dá de ombros. Há gente, no jianghu, que nunca precisa de segredos, e vive menos por isso.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'jh_palacio_gelo', title: 'O Palácio do Gelo', rarity: 'raro', once: true, weight: 1.2, escala: true,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'No extremo norte, um palácio de gelo azul, guardado por mulheres de olhos de cristal e espadas finas como agulhas, recusa qualquer visita. Dizem que o seu manual, a Respiração do Inverno, é a mais pura do mundo. Elas não ensinam homens, ou estrangeiros, ou quem fala demais.',
    choices: [
      { text: 'Pedir audiência com humildade.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'A guardiã o escuta, em silêncio. Depois, entrega uma pequena agulha de gelo: "Uma lição. Só uma." Você a recebe de joelhos.', fx: {  stats: { dao: 2, esp: 1 }, xp: 6 } }, fail: { text: 'As portas não se abrem. Você espera três dias na neve, e parte congelado e humilde.', fx: { ferida: 1, stats: { dao: 2 } } } },
      { text: 'Invadir o palácio de noite.', check: { stat: ['fis', 'sor', 'esp'], dif: 2, tag: 'fuga' }, ok: { text: 'Você chega à sala dos manuais, e uma única página basta: a que você mais precisava. Foge com ela, e com o orgulho ferido de quem roubou o que podia ter pedido.', fx: { stats: { esp: 2, comp: 1 }, karma: -5, setFlags: ['inimigo_secreto'] } }, fail: { text: 'As guardiãs o cercam, sem pressa. Você é devolvido ao pé da montanha, de roupa rasgada e sem lembranças do que viu.', fx: { ferida: 2, fama: -3 } } },
      { text: 'Deixar um presente à porta e partir.', res: { text: 'Quando você volta, anos depois, há uma carta de agradecimento no mesmo lugar, e uma flor de gelo que nunca derrete.', fx: { karma: 3, item: ['cristal_inverno'], stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'jh_cla_veneno', title: 'O Clã dos Cinco Venenos', rarity: 'raro', cooldown: 90, weight: 1.0, escala: true,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'O Clã dos Cinco Venenos, de uma província ao sul, o convida para um banquete de reconciliação com uma seita justa. Há cinco pratos, cada um com um veneno, e a regra do clã é: quem come tudo e vive, é aceito. Quem recusa, é desprezado.',
    choices: [
      { text: 'Comer tudo, com calma.', check: { stat: ['fis', 'comp'], dif: 2, tag: 'veneno' }, ok: { text: 'Cada prato queima de um jeito. Você suporta, e ao fim, o chefe do clã aplaude, em silêncio. "Meus filhos não aguentam isso."', fx: { stats: { fis: 2, comp: 1 }, fama: 8, xp: 6, setFlags: ['amigo_do_cla_veneno'] } }, fail: { text: 'O quarto prato é demais. Você cai, e acorda dois dias depois, com o clã ao redor, rindo, e um antídoto na mão.', fx: { ferida: 3, fama: 2, stats: { fis: 1 } } } },
      { text: 'Recusar educadamente.', res: { text: 'O clã sorri, sem gentileza. Você sai ileso e sem aliados. Em outro tempo, essa recusa será lembrada.', fx: { fama: -2, stats: { dao: 1 } } } },
      { text: 'Perguntar de que são feitos os pratos antes de comer.', check: { stat: ['comp', 'car'], dif: 1 }, ok: { text: 'Sua curiosidade agrada ao chefe, que explica cada veneno. Você come só os dois mais suaves, e sai com receitas e respeito.', fx: { stats: { comp: 2 }, fama: 4, setFlags: ['amigo_do_cla_veneno'] } }, fail: { text: 'O chefe encara a pergunta como insulto. A conversa azeda, e você sai de lá antes da sobremesa.', fx: { fama: -2 } } },
    ],
  },
  {
    id: 'jh_taberna_espioes', title: 'A Taberna Cheia de Espiões', rarity: 'comum', cooldown: 50, weight: 1.4, escala: true,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'Na Taberna dos Três Gatos, cada mesa tem um espião: da Aliança, do Culto, de um reino distante. Todos fingem beber, e todos escutam. Uma conversa, três mesas adiante, traz o seu nome, e uma data.',
    choices: [
      { text: 'Aproximar-se e ouvir com disfarce.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'Uma emboscada está marcada para você, daqui a três dias, num desfiladeiro. Você tem tempo de montar a sua própria.', fx: { stats: { comp: 2 }, fama: 3, setFlags: ['avisado_da_emboscada'] } }, fail: { text: 'Um espião o reconhece. A taberna esvazia em silêncio, e você sai com facas em todos os olhares.', fx: { ferida: 1, fama: -1 } } },
      { text: 'Confrontar a mesa que citou seu nome.', check: { stat: ['fis', 'car'], dif: 1, tag: 'combate' }, ok: { text: 'Eles, surpresos, caem em contradição. Você os faz contar tudo, e deixa a taberna com informações e dois novos inimigos.', fx: { fama: 5, stats: { car: 1, dao: 1 }, setFlags: ['inimigo_secreto'] } }, fail: { text: 'A mesa tem mais gente do que parecia. A briga é feia e você sai coxeando.', fx: { ferida: 2 } } },
      { text: 'Sair sem pressa, como quem não ouviu.', res: { text: 'Você paga a conta, sorri ao garçom, e anda dez ruas sem olhar para trás. Só então respira.', fx: { stats: { sor: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'jh_conferencia', title: 'A Conferência dos Punhos e Lâminas', rarity: 'raro', once: true, weight: 1.2,
    cond: { tierMin: 3, tierMax: 5, fameMin: 20 },
    text: 'Os grandes clãs convocam a Conferência dos Punhos e Lâminas, para eleger o novo Líder da Aliança. Em frente a duzentos mestres, os candidatos discursam. Um deles, claramente corrupto, é o favorito. Você tem direito a um voto e, se quiser, a uma palavra.',
    choices: [
      { text: 'Denunciar o favorito, diante de todos.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'O salão se cala. Provas aparecem, uma a uma, e o favorito é desmascarado. Você é aclamado, e pedem que assuma um posto na Aliança.', fx: { fama: 18, karma: 8, stats: { car: 2, dao: 1 }, setFlags: ['conselheiro_da_alianca'] } }, fail: { text: 'Sem provas, a denúncia vira calúnia. A multidão o vaia, e o favorito, magnânimo, o perdoa em público. Você sai com uma ferida de vergonha.', fx: { fama: -8, stats: { dao: 2 } } } },
      { text: 'Votar no favorito para manter a paz.', res: { text: 'O favorito vence, e a paz, de fachada, dura uns anos. Você se pergunta, às vezes, o preço dessa paz.', fx: { karma: -3, fama: 2 } } },
      { text: 'Votar em branco e partir em silêncio.', res: { text: 'Poucos reparam. Você sai antes do fim, e a Aliança segue o seu rumo, com e sem você.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'jh_mestre_escondido', title: 'O Cozinheiro Que Era Mestre', rarity: 'raro', once: true, weight: 1.2,
    cond: { tierMin: 1, tierMax: 4 },
    text: 'O velho que cozinha na estalagem tem mãos que nunca tremem e passos que não fazem barulho. Uma noite, um bêbado derruba uma faca e ela para no ar, a dois dedos do rosto do cozinheiro. Ele não diz nada. Só serve mais uma tigela de sopa.',
    choices: [
      { text: 'Pedir que ele o aceite como discípulo.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O velho ri, de leve. "Sopa aprendeu a cozinhar sozinha, rapaz." Mas, depois de uma semana de lavar panelas, ele te ensina uma respiração que ninguém conhece.', fx: {  stats: { dao: 2, fis: 1 }, setFlags: ['mestre_escondido'] } }, fail: { text: 'Ele nega que seja mestre, e muda de assunto. Mas, ao partir, você nota que ele sorriu.', fx: { stats: { dao: 1 } } } },
      { text: 'Observar em silêncio, sem se revelar.', res: { text: 'Você passa semanas na estalagem, observando o modo como ele fatia legumes. É a melhor aula de espada que já teve, sem uma palavra.', fx: { stats: { comp: 2, dao: 1 } } } },
      { text: 'Desafiá-lo para um duelo.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'Você o toca uma vez, e ele deixa. "Acertou. Agora, lave os pratos." É o maior elogio que já ouviu.', fx: { fama: 6, stats: { fis: 1, dao: 2 }, xp: 6 } }, fail: { text: 'Você acorda no chão, sem entender como chegou lá. O velho serve chá, sem uma palavra.', fx: { ferida: 1, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'jh_espada_lendaria', title: 'A Espada Cravada na Pedra', rarity: 'lendario', once: true, weight: 0.9, escala: true,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'Numa clareira, uma espada de fio azul está cravada numa pedra negra, e dezenas de ossadas ao redor mostram quantos já tentaram. Uma inscrição: "Ao digno, a lâmina. Ao ganancioso, a pedra." O vento sopra, e a espada canta uma nota sem fim.',
    choices: [
      { text: 'Tentar arrancar a espada.', check: { stat: ['dao', 'fis', 'esp'], dif: 3, tag: 'espada' }, ok: { text: 'A lâmina sai sem esforço, como se fosse um cumprimento. Ela pesa na mão, e tem sede de caminho.', fx: { item: ['lamina_vento_sul'], stats: { dao: 2, fis: 1 }, fama: 12, xp: 8 } }, fail: { text: 'A pedra não cede, e você sente a gravidade dobrar. Cai, de joelhos, com o peito apertado.', fx: { ferida: 2, stats: { dao: 1 } } } },
      { text: 'Deixar uma oferenda e partir.', res: { text: 'A espada canta uma nota diferente, e o vento, por um momento, o acompanha. Algo, na floresta, aprovou.', fx: { karma: 4, stats: { dao: 2 } } } },
      { text: 'Enterrar os ossos dos que falharam.', res: { text: 'Três dias, cinquenta ossos. A espada, no fim, parece menos solitária. A pedra, sob seus pés, vibra baixinho.', fx: { karma: 8, stats: { dao: 3 }, setFlags: ['enterrou_os_ossos'] } } },
    ],
  },
  {
    id: 'jh_selo_cla', title: 'O Selo do Clã Perdido', rarity: 'raro', once: true, weight: 1.0,
    cond: { tierMin: 2, tierMax: 5, flags: ['sabe_do_cla'] },
    text: 'Numa feira de antiguidades, você vê um selo de jade com o brasão do seu clã, o que fora perdido quando ele caiu. O vendedor, ignorando o valor, pede um preço absurdo, mas não impossível. Você sente o coração batendo na garganta.',
    choices: [
      { text: 'Comprar o selo a qualquer preço (200 pedras).', custo: 200, res: { text: 'O selo, na mão, esquenta. Uma memória ancestral se acende: um rosto, um nome, uma promessa. O clã, de repente, parece ter um futuro.', fx: { item: ['selo_do_guardiao'], fama: 6, stats: { dao: 2, car: 1 }, setFlags: ['selo_do_cla'] } } },
      { text: 'Barganhar com habilidade.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O vendedor cede por um terço, sem saber o que perde. Você leva o selo, e a certeza de que o clã não morreu.', fx: { pedras: -60, item: ['selo_do_guardiao'], fama: 4, stats: { car: 1, dao: 1 }, setFlags: ['selo_do_cla'] } }, fail: { text: 'O vendedor percebe o seu interesse, e dobra o preço. Você vai embora, humilhado, e com a imagem do selo na cabeça.', fx: { stats: { dao: 1 } } } },
      { text: 'Roubar o selo à noite.', check: { stat: ['sor', 'comp'], dif: 1, tag: 'fuga' }, ok: { text: 'Tudo corre bem. O selo é seu, e a culpa, também.', fx: { item: ['selo_do_guardiao'], karma: -4, setFlags: ['selo_do_cla'] } }, fail: { text: 'Você é pego pelo guarda da feira. A multa é cara, e o selo, vendido a outro.', fx: { pedras: -30, fama: -3 } } },
    ],
  },
  {
    id: 'jh_duelo_na_ponte', title: 'O Duelo na Ponte de Corda', rarity: 'comum', cooldown: 50, weight: 1.2, escala: true,
    cond: { tierMin: 2, tierMax: 4 },
    text: 'Uma ponte de corda sobre um abismo, e do outro lado, um espadachim de chapéu largo, parado, bloqueando a travessia. "Só um passa", diz. "O outro volta, ou cai." Não há outro caminho em dias de viagem.',
    choices: [
      { text: 'Lutar na ponte, com cuidado.', check: { stat: ['fis', 'sor', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'A ponte balança a cada golpe. Você o derruba sem o matar, e ele agradece, de joelhos. "Faz anos que ninguém me vencia."', fx: { fama: 5, stats: { fis: 1, dao: 1 }, xp: 5 } }, fail: { text: 'A corda se rompe pela metade. Você cai, agarra-se, e é puxado para trás por ele, que ri: "Volte quando souber voar."', fx: { ferida: 2, stats: { sor: 1 } } } },
      { text: 'Propor um desafio de outro tipo: um enigma ou uma partida de xadrez.', check: { stat: ['comp', 'car'], dif: 1 }, ok: { text: 'O espadachim, encantado, aceita. A partida dura a tarde inteira, e termina em empate. Ele abre caminho com um sorriso e um conselho.', fx: { stats: { comp: 2 }, fama: 3 } }, fail: { text: 'Ele perde a paciência e saca. A discussão vira luta de qualquer jeito.', fx: { ferida: 1 } } },
      { text: 'Dar a volta pela montanha.', res: { text: 'Dois dias a mais, um desfiladeiro, uma raposa. Você chega do outro lado intacto, e sem uma história para contar.', fx: { stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'jh_viuva_negra', title: 'A Viúva da Estalagem', rarity: 'comum', cooldown: 70, weight: 1.0, escala: true,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'A dona da estalagem, elegante e discreta, serve chá a quem passa. Os últimos três hóspedes sumiram. O chá, hoje, tem um sabor que lembra amêndoas. Ela sorri, e pergunta: "Está bom?"',
    choices: [
      { text: 'Fingir beber e observar a reação dela.', check: { stat: ['comp', 'sor'], dif: 1, tag: 'veneno' }, ok: { text: 'Ela relaxa, quando você "bebe". Você a segue até a adega, e descobre três cadáveres e uma fortuna escondida. A guarda é chamada, e a viúva, presa.', fx: { fama: 8, karma: 4, pedras: 60, stats: { comp: 1 } } }, fail: { text: 'Ela percebe o truque. Há uma faca na manga, e uma luta curta, e feia.', fx: { ferida: 2, fama: 2 } } },
      { text: 'Beber o chá: seu corpo já suporta venenos.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'veneno' }, ok: { text: 'Uma queimação, uma tontura, e nada mais. A viúva, boquiaberta, solta a faca. "Você... não é desta terra."', fx: { stats: { fis: 2, dao: 1 }, fama: 6 } }, fail: { text: 'A visão escurece, e você acorda dois dias depois, num porão, com as mãos atadas.', fx: { ferida: 3, pedras: -20 } } },
      { text: 'Recusar o chá e sair na hora.', res: { text: 'Ela mantém o sorriso até você virar a esquina. Depois, aprende-se, o sorriso some, e um novo hóspede entra.', fx: { stats: { sor: 1 } } } },
    ],
  },
];
