import type { GameEvent } from '../../types';

/** Cultivo, trilhas, demônios interiores e caminho demoníaco. */
export const cultivo: GameEvent[] = [
  /* ===== Fillers e cultivo básico ===== */
  {
    id: 'dia_comum', title: 'Mais um Ano', rarity: 'comum', cooldown: 0, weight: 0.02,
    text: 'O tempo passa em silêncio. Estações vêm, vão, e você segue o caminho com a paciência de uma pedra no rio.',
    choices: [{ text: 'Continuar.', res: { text: 'Você respira, medita, vive.', fx: { xp: 3 } } }],
  },
  {
    id: 'rotina_mortal', title: 'Dias de Trabalho', rarity: 'comum', cooldown: 3, weight: 1.2,
    cond: { tierMax: 0 },
    text: 'Os dias em {vila} correm entre trabalho, sono e sonhos. O mundo dos imortais parece impossível, mas você olha para o céu mesmo assim.',
    choices: [
      { text: 'Trabalhar duro para ajudar a família.', res: { text: 'Mãos calejadas e coração firme. O cansaço também ensina.', fx: { stats: { fis: 1 }, pedras: 1 } } },
      { text: 'Estudar caracteres e histórias à luz de velas.', res: { text: 'Cada página lida abre uma janela. A mente se afia.', fx: { stats: { comp: 1 } } } },
      { text: 'Treinar respiração às escondidas.', check: { stat: ['comp', 'dao'], dif: 0 }, ok: { text: 'Você sente um calor suave no ventre. Algo está perto de acordar.', fx: { stats: { esp: 1, dao: 1 } } }, fail: { text: 'Você só adormece de cansaço, mas tenta de novo na noite seguinte.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'meditacao_profunda', title: 'Meditação Profunda', rarity: 'comum', cooldown: 9, weight: 2.5,
    cond: { tierMin: 1 },
    text: 'Os dias se acalmam. Você se recolhe e deixa o Qi circular pelos meridianos, grão a grão.',
    choices: [
      { text: 'Meditar com foco total.', check: { stat: ['comp', 'esp'], dif: 0, tag: 'qi' }, ok: { text: 'O Qi flui como seda. Você emerge mais leve, com a mente cristalina.', fx: { xp: 14, stats: { comp: 1 } } }, fail: { text: 'A mente divaga. Mesmo assim, algo avança.', fx: { xp: 6 } } },
      { text: 'Meditar movendo o corpo, no ritmo da respiração.', res: { text: 'Corpo e Qi dançam. O treino é igualmente exaustivo e proveitoso.', fx: { xp: 9, stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'retiro_fechado', title: 'Retiro Fechado', rarity: 'comum', cooldown: 30, weight: 1.5,
    cond: { tierMin: 1, tierMax: 6 },
    text: 'Chegou o tempo de um retiro. Anos fechados em uma caverna ou câmara, sem notícias do mundo.',
    choices: [
      { text: 'Retiro curto (3 anos).', check: { stat: ['dao', 'comp'], dif: 0 }, ok: { text: 'Ao sair, o mundo parece menor e o Qi, maior.', fx: { anos: 3, xp: 30, stats: { dao: 1 } } }, fail: { text: 'O retiro é duro e pouco produtivo.', fx: { anos: 3, xp: 12 } } },
      { text: 'Retiro longo (10 anos).', check: { stat: ['dao', 'comp'], dif: 3 }, ok: { text: 'Dez anos de silêncio forjam um novo você.', fx: { anos: 10, xp: 70, stats: { dao: 3, comp: 2 } } }, fail: { text: 'Dez anos de tédio, ilusões e quase-demônios interiores. Você sai cansado e um pouco mais sábio.', fx: { anos: 10, xp: 30, corr: 4, stats: { dao: 1 } } } },
      { text: 'Recusar. O mundo me chama.', res: { text: 'O mundo sempre chama.', fx: {} } },
    ],
  },
  {
    id: 'gargalo_longo', title: 'O Gargalo Teimoso', rarity: 'comum', cooldown: 25, weight: 1.5,
    cond: { tierMin: 2 },
    text: 'Seu Qi parece uma parede lisa. Cada anos de tentativa resulta em pouco ou nada. Pior que a dor é o silêncio do progresso.',
    choices: [
      { text: 'Insistir com a força do Coração do Dao.', check: { stat: 'dao', dif: 2 }, ok: { text: 'No instante em que desiste de forçar, a parede cede. Você respira.', fx: { xp: 18, stats: { dao: 2 } } }, fail: { text: 'A frustração cresce e um sussurro duvida de você.', fx: { corr: 4, stats: { dao: -1 } } } },
      { text: 'Descansar e viajar para esvaziar a mente.', res: { text: 'Você vê nuvens, rios e vilarejos. Voltando, a parede parece apenas uma pedra.', fx: { xp: 9, stats: { comp: 1 }, karma: 1 } } },
    ],
  },
  {
    id: 'desvio_de_qi_leve', title: 'O Qi Perde o Rumo', rarity: 'comum', cooldown: 25, weight: 1,
    cond: { tierMin: 1, tierMax: 6 },
    text: 'No meio da meditação, o Qi muda de direção. Uma dor aguda queima o canal do braço. O perigo é real.',
    choices: [
      { text: 'Parar tudo e acalmar a mente.', check: { stat: 'dao', dif: 0, tag: 'mente' }, ok: { text: 'Você respira e guia o Qi de volta devagar. A dor passa.', fx: { stats: { dao: 1 }, xp: 3 } }, fail: { text: 'O Qi se rebela e fere seus meridianos.', fx: { ferida: 2, xp: -8 } } },
      { text: 'Forçar o Qi a obedecer.', check: { stat: ['esp', 'fis'], dif: 2 }, ok: { text: 'Com um grito, você retoma o controle. Dói, mas funciona.', fx: { xp: 6, ferida: 1 } }, fail: { text: 'O Qi estoura nos canais. Sangue pelo nariz e pelos ouvidos.', fx: { ferida: 3, xp: -12 } } },
    ],
  },
  {
    id: 'coracao_demonio', title: 'O Demônio do Coração', rarity: 'raro', cooldown: 25,
    cond: { tierMin: 2, tierMax: 7 },
    text: 'Numa noite de meditação, uma sombra com seu rosto surge e sussurra: "Para que sofrer? Pegue o atalho. Eu mostro o caminho."',
    choices: [
      { text: 'Enfrentar o demônio interior com o Coração do Dao.', check: { stat: 'dao', dif: 3, tag: 'mente' }, ok: { text: 'A sombra se curva. A cada pergunta, você responde sem medo. Ao fim, ela se dissolve.', fx: { stats: { dao: 3 }, xp: 15, corr: -10 } }, fail: { text: 'A sombra ri, e parte dela fica dentro de você.', fx: { corr: 12, ferida: 1, xp: -5 } } },
      { text: 'Escutar a oferta.', res: { text: 'A sombra mostra uma técnica sombria. Você a memoriza e acorda suando. O desejo ficou.', fx: { corr: 15, xp: 15, tecnica: ['caminho_do_sangue'] } } },
    ],
  },
  {
    id: 'iluminacao_sonho', title: 'O Sonho do Dao', rarity: 'raro', cooldown: 30,
    cond: { tierMin: 1 },
    text: 'Você sonha com um rio de luz fluindo para dentro de uma montanha. Ao acordar, os caracteres de uma técnica inteira estão na sua mente.',
    choices: [
      { text: 'Anotar tudo antes que desapareça.', check: { stat: ['comp', 'esp'], dif: 1 }, ok: { text: 'As palavras fluem do pincel. É uma técnica real e poderosa.', fx: { xp: 18, stats: { comp: 2, dao: 1 }, tecnica: ['sutra_vazio_calmo'] } }, fail: { text: 'Você só consegue anotar fragmentos. Ainda assim, algo permanece.', fx: { xp: 8, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'tribulacao_alheia', title: 'Observar a Tribulação de Outro', rarity: 'raro', cooldown: 40,
    cond: { tierMin: 2 },
    text: 'No horizonte, o céu escurece em espiral. Um cultivador desconhecido enfrenta a tribulação. Você pode observar à distância e aprender.',
    choices: [
      { text: 'Observar de perto, sentindo a pressão do Dao.', check: { stat: ['dao', 'esp'], dif: 2 }, ok: { text: 'Você entende por que raios caem: perguntas de fogo, respostas de coragem.', fx: { xp: 20, stats: { dao: 3, esp: 1 } } }, fail: { text: 'Um raio perdido o alcança de raspão.', fx: { ferida: 2, xp: 5 } } },
      { text: 'Observar de longe, a salvo.', res: { text: 'Entre estrondos, você aprende pouco, mas sobrevive sem arranhão.', fx: { xp: 7, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'discipulo_talentoso', title: 'Um Discípulo no Seu Caminho', rarity: 'raro', once: true,
    cond: { tierMin: 3 },
    text: 'Um jovem de olhar intenso implora para ser seu discípulo. Sua raiz é média, mas a teimosia é de gigante.',
    choices: [
      { text: 'Aceitá-lo e ensinar com cuidado.', res: { text: 'Ensinar é aprender duas vezes. Seu Coração do Dao se aprofunda.', fx: { setFlags: ['tem_discipulo'], stats: { dao: 2, comp: 1 }, karma: 6, fama: 4, agenda: [{ event: 'discipulo_retorna', em: [30, 80] }] } } },
      { text: 'Recusar: o caminho é solitário.', res: { text: 'O jovem se vai, cabisbaixo. Você retorna ao silêncio.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'discipulo_retorna', title: 'O Discípulo Retorna', rarity: 'raro', once: true,
    cond: { flags: ['tem_discipulo'] },
    text: 'Décadas depois, uma figura poderosa se ajoelha diante de você. "Mestre, eu voltei." É seu antigo discípulo, que agora lidera uma pequena seita.',
    choices: [
      { text: 'Aceitar sua gratidão e aconselhá-lo.', res: { text: 'Ele lhe entrega um presente raro e jura proteger seu nome.', fx: { pedras: 80, item: ['pilula_qi_maior'], fama: 8, karma: 4, stats: { dao: 1 } } } },
      { text: 'Pedir que ele reconstrua a antiga seita sob seu nome.', res: { text: 'Ele aceita. O seu nome será levado por séculos.', fx: { fama: 15, stats: { car: 2 }, setFlags: ['legado_seita'] } } },
    ],
  },

  /* ===== Trilhas ===== */
  {
    id: 'formacao_estudo', title: 'O Estudo das Formações', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 6, path: ['sopro', 'alquimia'] },
    text: 'Um velho estudioso lhe mostra um diagrama complexo e propõe um desafio: compreender como o Qi fluiria dentro dele.',
    choices: [
      { text: 'Estudar o diagrama por meses.', check: { stat: 'comp', dif: 2, tag: 'formacao' }, ok: { text: 'Quando o último nó se resolve, uma onda de compreensão o atinge.', fx: { xp: 14, stats: { comp: 2 }, tecnica: ['selo_nove_portas'] } }, fail: { text: 'O diagrama é impenetrável. Mas você aprende o que não sabe.', fx: { xp: 4, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'treino_corpo_pesado', title: 'Treino Extremo do Corpo', rarity: 'comum', cooldown: 8,
    cond: { tierMin: 1, tierMax: 6, path: ['corpo', 'espada'] },
    text: 'Pedras presas às costas, cachoeira martelando os ombros, golpes de bastão nas costelas. O treino do corpo é tortura que gera força.',
    choices: [
      { text: 'Treinar até o limite.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'corpo' }, ok: { text: 'Músculos, ossos e vontade endurecem juntos.', fx: { stats: { fis: 2, dao: 1 }, xp: 10 } }, fail: { text: 'Você passa do limite. Dias na cama, mas algo foi forjado.', fx: { stats: { fis: 1 }, ferida: 2, xp: 4 } } },
      { text: 'Treinar com sabedoria, respeitando o corpo.', res: { text: 'Progresso lento e constante é progresso.', fx: { stats: { fis: 1 }, xp: 8 } } },
    ],
  },
  {
    id: 'duelo_de_espadas', title: 'O Duelo das Lâminas', rarity: 'comum', cooldown: 10,
    cond: { tierMin: 1, tierMax: 6, path: ['espada'] },
    text: 'Um espadachim errante cruza seu caminho e propõe um duelo sem raiva, apenas por aprendizado. Sua lâmina canta antes de sair da bainha.',
    choices: [
      { text: 'Duelar com tudo que tem.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'espada' }, ok: { text: 'Cada golpe é uma pergunta, cada defesa uma resposta. Ao final, ambos se curvam.', fx: { stats: { dao: 2, fis: 1 }, xp: 14, fama: 3 } }, fail: { text: 'O espadachim é melhor. Mas ensina em cada corte.', fx: { ferida: 1, stats: { dao: 1 }, xp: 6 } } },
    ],
  },
  {
    id: 'mestre_espada_ermitao', title: 'O Espadachim Ermitão', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, path: ['espada'] },
    text: 'Numa cabana de montanha, um velho mutilado afia uma lâmina sem fio. "Quem corta o céu, precisa antes cortar a si mesmo", diz.',
    choices: [
      { text: 'Pedir para aprender com ele.', check: { stat: ['dao', 'comp'], dif: 3 }, ok: { text: 'Por três anos você recebe lições duras. Quando parte, sua lâmina corta a intenção.', fx: { tecnica: ['espada_tres_luas'], stats: { dao: 3, fis: 1 }, xp: 18, anos: 3 } }, fail: { text: 'Ele o expulsa. "Ainda não tem fome suficiente."', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'caldeirao_explode', title: 'O Caldeirão Instável', rarity: 'comum', cooldown: 8,
    cond: { tierMin: 1, tierMax: 6, path: ['alquimia'] },
    text: 'Você tenta uma receita ambiciosa. O fogo oscila, a fumaça muda de cor e o caldeirão range com ameaça.',
    choices: [
      { text: 'Estabilizar o fogo com Qi.', check: { stat: ['comp', 'esp'], dif: 1, tag: 'alquimia' }, ok: { text: 'O caldeirão se acalma. Três pílulas perfeitas surgem.', fx: { item: ['pilula_qi_media', 'pilula_cura'], xp: 6, stats: { comp: 1 } } }, fail: { text: 'O caldeirão explode! Você salva o que pode e sai chamuscado.', fx: { ferida: 2, item: ['pilula_qi_menor'] } } },
      { text: 'Abandonar o lote e salvar o equipamento.', res: { text: 'Prudência é uma virtude cara, mas poupa dedos.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'forja_espada_voadora', title: 'Forjar um Artefato', rarity: 'raro', cooldown: 40,
    cond: { tierMin: 1, tierMax: 5, path: ['espada', 'corpo'], pedrasMin: 30 },
    text: 'Um ferreiro de montanha oferece aprimorar sua arma com minérios espirituais. O preço é alto e o resultado, imprevisível.',
    choices: [
      { text: 'Pagar 30 pedras e confiar no ferreiro.', custo: 30, check: { stat: ['sor', 'comp'], dif: 1 }, ok: { text: 'A lâmina nasce de novo, mais leve, mais afiada, quase viva.', fx: { item: ['espada_aprendiz'], stats: { dao: 1 } } }, fail: { text: 'O metal racha. O ferreiro devolve metade do dinheiro.', fx: { pedras: 12 } } },
    ],
  },
  {
    id: 'dueto_dual_cultivo', title: 'Cultivo em Parceria', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['companheiro_dao'] },
    text: 'Seu parceiro de caminho propõe que cultivem juntos num retiro, equilibrando Qi e intenções. Nada além de meditação e respeito mútuo.',
    choices: [
      { text: 'Aceitar o retiro conjunto.', res: { text: 'Um ano em harmonia. Os Qi se sincronizam e os dois crescem.', fx: { anos: 1, xp: 25, stats: { esp: 2, dao: 2, car: 1 }, karma: 3 } } },
    ],
  },

  /* ===== Caminho demoníaco ===== */
  {
    id: 'oferta_demoniaca', title: 'A Oferta do Mestre Sombrio', rarity: 'raro', once: true, weight: 3,
    cond: { tierMin: 1, tierMax: 5, noFlags: ['rejeitou_demonio'], faction: ['errante', 'nenhuma', 'cla', 'seita'] },
    text: 'Numa noite chuvosa, um homem de manto negro aparece em seu quarto. "Você está preso no gargalo. Eu posso destravá-lo, pelo preço certo."',
    choices: [
      { text: 'Aceitar o pacto.', res: { text: 'Uma gota de sangue sela o acordo. Seu Qi aumenta de forma estranha e deliciosa.', fx: { faccao: 'demoniaca', corr: 20, xp: 25, tecnica: ['caminho_do_sangue'], karma: -10, setFlags: ['pacto_demoniaco'] } } },
      { text: 'Rejeitar com firmeza.', check: { stat: 'dao', dif: 1 }, ok: { text: 'O homem recua com respeito. "Você é difícil de comprar."', fx: { stats: { dao: 2 }, setFlags: ['rejeitou_demonio'] } }, fail: { text: 'Ele sorri e deixa uma marca em sua mente antes de sumir.', fx: { corr: 8, setFlags: ['rejeitou_demonio'] } } },
    ],
  },
  {
    id: 'sacrificio_sangue', title: 'O Altar do Sacrifício', rarity: 'comum', cooldown: 6,
    cond: { tierMin: 1, faction: ['demoniaca'] },
    text: 'Para avançar, o Mestre exige um sacrifício: uma vida inocente alimentará seu Qi.',
    choices: [
      { text: 'Realizar o ritual.', res: { text: 'O sangue sobe como vapor e entra em você. O poder dispara, a alma esfria.', fx: { xp: 25, corr: 15, karma: -20, fama: -4 } } },
      { text: 'Recusar e arriscar a ira da seita.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'O Mestre o encara por longo tempo, e então ri. "Respeito quem sabe o que quer."', fx: { corr: -8, karma: 5, stats: { dao: 2 } } }, fail: { text: 'O Mestre castiga sua desobediência e o prende por meses.', fx: { ferida: 2, corr: -4, xp: -5 } } },
    ],
  },
  {
    id: 'perseguicao_demoniaca', title: 'Os Caçadores de Demônios', rarity: 'comum', cooldown: 18,
    cond: { tierMin: 1, faction: ['demoniaca'] },
    text: 'Seitas justas enviaram caçadores atrás de você. Aldeões trancam as portas e fecham as janelas à sua passagem.',
    choices: [
      { text: 'Enfrentá-los.', check: { stat: ['fis', 'esp'], dif: 2, tag: 'demonio' }, ok: { text: 'Você os derrota um a um. Sua fama sombria cresce.', fx: { fama: 6, karma: -5, xp: 8, corr: 5 } }, fail: { text: 'Os caçadores o encurralam e você escapa com feridas profundas.', fx: { ferida: 3, xp: -4 } } },
      { text: 'Fugir e desaparecer.', check: { stat: ['sor', 'fis'], dif: 1, tag: 'fuga' }, ok: { text: 'Você some nas montanhas. Os caçadores perdem o rastro.', fx: { xp: 3 } }, fail: { text: 'Cercado, você luta para escapar.', fx: { ferida: 2 } } },
    ],
  },
  {
    id: 'redencao', title: 'O Caminho de Volta', rarity: 'raro', cooldown: 30,
    cond: { tierMin: 2, corrMin: 20 },
    text: 'Um monge de olhar manso pergunta: "Você ainda se lembra de quem era antes do sangue? Há um jeito de limpar a alma, mas dói."',
    choices: [
      { text: 'Submeter-se à purificação.', check: { stat: 'dao', dif: 2, tag: 'mente' }, ok: { text: 'Dias de sutras e dor. Quando acaba, o peso nas costas é menor.', fx: { corr: -35, karma: 10, stats: { dao: 3 }, faccao: 'errante', xp: -5 } }, fail: { text: 'A purificação falha. A sombra se agarra com mais força.', fx: { corr: 5, ferida: 2 } } },
      { text: 'Recusar. O poder vale o preço.', res: { text: 'O monge suspira e vai embora. O poder continua.', fx: { corr: 8, xp: 8 } } },
    ],
  },
  {
    id: 'pacto_sangue_antigo', title: 'O Pacto do Sangue Antigo', rarity: 'lendario', once: true,
    cond: { tierMin: 3, corrMin: 40 },
    text: 'Das profundezas de um altar esquecido, uma presença antiga o chama pelo nome. "Dê-me seu coração e eu lhe dou o mundo."',
    choices: [
      { text: 'Aceitar. Tornar-se um verdadeiro demônio.', res: { text: 'O mundo escurece e se rearranja. Você agora é lenda, medo e fome.', fx: { fim: 'demonio' } } },
      { text: 'Resistir com tudo.', check: { stat: 'dao', dif: 6, tag: 'mente' }, ok: { text: 'Uma luta de eras acontece dentro de você. Ao fim, a presença se cala.', fx: { corr: -50, stats: { dao: 5 }, xp: 20 } }, fail: { text: 'A presença vence. O sorriso que sai da sua boca não é seu.', fx: { fim: 'demonio' } } },
    ],
  },
  {
    id: 'karma_cobrado', title: 'O Karma Bate à Porta', rarity: 'raro', once: true,
    cond: { tierMin: 2, karmaMax: -25 },
    text: 'Anos de atos sombrios têm um preço. Hoje, inimigos vindos de toda parte surgem: viúvas de vítimas, filhos de rivais, guardiões de seitas atingidas.',
    choices: [
      { text: 'Lutar contra todos.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'Uma noite sangrenta. Você sobrevive, mas o fardo é imenso.', fx: { ferida: 3, karma: -5, fama: -8, corr: 8 } }, fail: { text: 'A dívida é cobrada. Você cai cercado por rostos que reconhece.', fx: { fim: 'karma' } } },
      { text: 'Pedir perdão publicamente e pagar o que deve.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'Poucos aceitam, mas o suficiente. O fardo diminui.', fx: { karma: 25, pedras: -50, fama: -3, stats: { dao: 3 } } }, fail: { text: 'O pedido é recusado. A única saída é fugir.', fx: { ferida: 2, karma: 5, faccao: 'errante' } } },
      { text: 'Usar o Talismã de Fuga.', cond: { item: 'talisma_fuga' }, res: { text: 'Você some. Mas o karma continua seguindo.', fx: { removeItem: ['talisma_fuga'], karma: 3 } } },
    ],
  },
];
