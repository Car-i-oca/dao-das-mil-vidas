/**
 * Variações de texto dos eventos que mais se repetem (o motor sorteia uma por ocorrência).
 * Cada variante precisa continuar coerente com as escolhas do evento.
 */
export const VARIANTES: Record<string, string[]> = {
  meditacao_profunda: [
    'A madrugada chega mansa. Você se senta com as pernas cruzadas e deixa o Qi descer pelos meridianos como água por uma encosta.',
    'Há dias em que o corpo pede silêncio. Você atende, e o Qi circula sem pressa, como um rio que já conhece o caminho do mar.',
    'Uma chuva fina bate no telhado. Dentro de você, o mesmo ritmo: gota, respiração, gota, respiração.',
  ],
  dia_comum: [
    'Nada de notável acontece. O ano passa como uma folha na correnteza, e você aprende que há sabedoria em deixá-lo passar.',
    'As estações trocam de roupa. Você mantém a rotina, e a rotina, aos poucos, vira um tipo de oração.',
    'Um ano sem história é um ano que o mundo esquece e o corpo agradece. Você respira, e segue.',
  ],
  rotina_mortal: [
    'Em {vila}, os dias têm o cheiro de lenha e de arroz. Ninguém ali fala em Qi, mas você sente, às vezes, que o vento fala com você.',
    'O galo canta, o trabalho começa, o sono vem cedo. O mundo dos imortais parece uma história de viajantes, e mesmo assim você olha o céu.',
    'Mais um período de colheita e de contas. Entre uma tarefa e outra, você pega o seu pensamento como quem pega um peixe vivo.',
  ],
  gargalo_longo: [
    'Cada tentativa de avançar bate numa parede lisa. O Qi gira, volta, e a mente se enche de dúvida: será que o caminho acabou aqui?',
    'Meses de esforço, nenhum sinal. O silêncio do progresso é pior que uma derrota clara. Você pensa em desistir, e não desiste.',
    'O gargalo não é um muro: é uma porta que ainda não sabe que você existe. Você bate, e espera.',
  ],
  mantra_cem_mil: [
    'Um velho monge lhe entrega um fio de contas: "Cem mil recitações. O primeiro demônio é o tédio." Ele sorri, como quem já perdeu para ele.',
    'O desafio é simples e cruel: repetir a mesma sílaba cem mil vezes, sem pular nenhuma. Quem aguenta, descobre quem é.',
    'Uma mestra de olhos brandos explica a prática: "Não busque nada. Só conte." Parece fácil, até a décima milésima.',
  ],
  jardim_lotos: [
    'Entre as montanhas, um lago cheio de lótus rosados reflete o céu. Os monges não perguntam quem você é, e esse silêncio é um convite.',
    'No fundo de um vale, um templo pequeno guarda um jardim de lótus. A paz ali é tão densa que parece ter peso.',
    'Um caminho de pedra leva a um lago de águas paradas. Os lótus abrem de manhã e fecham à tarde, e os monges fazem o mesmo.',
  ],
  oferenda_templo: [
    'No sopé de uma colina, um templo de telhas quebradas sobrevive à base de arroz e fé. Os monges nunca pedem nada, e é por isso que dói ver o estado do lugar.',
    'Um templo velho, de portas rangendo, precisa de reparos. Uma monja varre o pátio sem reclamar, e o chão, mesmo limpo, parece cansado.',
    'O telhado do templo goteja em três lugares. Os monges colocaram baldes, e rezam entre eles, como se o som da água fosse parte da liturgia.',
  ],
  partir_viagem: [
    'O mundo é maior que o seu canto, e a estrada, naquela manhã, parece falar o seu nome. Falta só decidir para que lado ir.',
    'Há um tipo de inquietude que só se resolve com poeira nas botas. Você sente o chamado, e abre o mapa.',
    'Uma carta, um boato, um cheiro de mar: algo o faz querer partir. Resta saber para onde.',
  ],
  mar_da_consciencia: [
    'Você fecha os olhos e mergulha em si: um mar escuro, onde lembranças cintilam como cardumes. No fundo, algo enorme respira.',
    'No silêncio da meditação, o seu mundo interior se abre como um oceano. As ondas têm rostos, e o fundo, uma sombra que o observa.',
    'O Mar da Consciência está calmo hoje. Você nada entre memórias, e sente, lá embaixo, um movimento lento e antigo.',
  ],
  tesouro_roubado: [
    'Um ladrão ferido tropeça em você, e deixa cair um manto de seda e uma pílula que brilha. Atrás dele, os guardas de uma família rica gritam por ordem.',
    'Numa viela, um ladrão esbarra em você e foge, deixando para trás um manto fino e um frasco brilhante. Os guardas, ao longe, já estão chegando.',
    'O ladrão está cercado e solta o que carrega: um manto de seda, uma pílula luminosa. Os olhos dele, antes de fugir, pedem uma coisa que você não sabe qual é.',
  ],
  cacador_recompensas: [
    'Três caçadores de recompensas cercam um jovem assustado que carrega um manual roubado. Eles oferecem uma parte do lucro se você ajudar.',
    'Numa clareira, um jovem de olhos arregalados está encurralado por três caçadores. Um deles faz sinal para você: "Dá para dividir."',
    'A estrada é ocupada por três homens de armas e um rapaz trêmulo, abraçado a um pergaminho. A lei, naquele lugar, parece pender para quem tem mais braços.',
  ],
  missao_do_registro: [
    'O quadro de luz pisca: "MISSÃO DO DIA: cumpra e receba. Falha: penalidade." Três opções brilham, uma de cada cor.',
    'Uma letra dourada surge no ar: "NOVA MISSÃO". As três cores de sempre pulsam, e uma voz sem corpo diz: "Escolha com sabedoria."',
    'O Registro, como todo amanhecer, apresenta o seu cardápio de tarefas. Todas pagam bem, e uma, você sente, paga mais do que diz.',
  ],
  retiro_fechado: [
    'É hora de um retiro. Uma câmara de pedra, silêncio de anos, sem notícias do mundo. Alguns saem iluminados; outros, apenas mais velhos.',
    'O corpo e o Qi pedem recolhimento. Uma caverna seca espera, com água e uma esteira de palha. A pergunta é por quanto tempo.',
    'Você sente que o próximo passo só virá no silêncio. A porta de uma câmara de retiro se abre, e o seu lugar nela está marcado.',
  ],
  loja_do_registro: [
    'Uma aba nova surge no quadro: "LOJA DO REGISTRO". Preços em pedras, miniaturas brilhantes de pílulas, talismãs e fragmentos de técnicas.',
    'O Registro abre uma vitrine: pequenas relíquias de luz, cada uma com preço. Tudo cintila mais do que deveria.',
    'No canto do quadro, um aviso: "OFERTA LIMITADA". Itens em miniatura, de brilho convidativo, e uma voz que fala baixinho: "Só hoje."',
  ],
};
