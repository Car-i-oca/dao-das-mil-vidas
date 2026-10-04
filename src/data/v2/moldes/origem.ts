import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Arco do Segredo de Origem (fio `origem`): reencarnado, regressor ou portador de sangue especial.
 * Quem descobre, o que quer, e o que você faz com o que descobriu. Só abre para quem tem esse segredo no começo.
 */
const SEGREDO = { algum: [{ jogador: { origem: ['alma_reencarnada', 'regressor'] } }, { jogador: { talento: ['sangue_dragao', 'predestinado'] } }] };
const SABEDOR = { sabedor: { pessoa: { papel: 'sabedor', vivo: true } } } as const;

export const ORIGEM: Molde[] = [
  molde({
    id: 'orig_eco',
    titulo: 'O Que a Memória Insiste em Dizer',
    tipo: 'virada',
    capitulos: ['despertar', 'entrada', 'ascensao'],
    unico: true,
    papeis: {},
    quando: { jogador: { reinoMin: 1 }, ...SEGREDO },
    relevancia: [{ se: { jogador: { origem: ['alma_reencarnada', 'regressor'] } }, mais: 80 }, { se: { jogador: { talento: ['sangue_dragao', 'predestinado'] } }, mais: 50 }],
    fio: { id: 'origem', abre: true, abandono: 'O que a memória dizia nunca foi escutado, e a voz foi baixando até virar costume.' },
    cena: [
      { se: { jogador: { origem: ['alma_reencarnada'] } }, texto: 'Você acorda com o gosto de uma comida que nunca provou, e a lembrança de um nome que não é o seu. Nos dias seguintes vêm pedaços: um pátio de pedra negra, uma mão que segura a sua, o peso de uma espada que você jamais carregou. O corpo reconhece antes da cabeça, e a cabeça, aos poucos, entende.' },
      { se: { jogador: { origem: ['regressor'] } }, texto: 'Há dias em que você sabe o que vai acontecer cinco minutos antes, e isso começa a incomodar quem repara. Os sinais são pequenos: um nome que você diz antes que a pessoa se apresente, uma rota que evita um perigo que ainda não existe. A memória do futuro é pior que a do passado: ninguém pode confirmá-la.' },
      { texto: 'O sangue esquenta sem febre, e o calor sobe como uma maré num dia de lua cheia. Os olhos ficam mais claros por um instante, e a pele, ao toque de uma lâmina, devolve um brilho que não é do aço. Algo no corpo diz, em língua que você não conhece, que isto sempre esteve ali.' },
    ],
    opcoes: [
      { id: 'investigar', texto: 'Anotar tudo, e começar a investigar de onde isso vem.',
        res: { texto: 'Seu caderno ganha um capítulo novo, escrito em letra miúda e sem testemunhas. As perguntas pesam mais do que respostas, mas começam a se ordenar. Você descobre que pesquisar a própria origem é uma forma silenciosa de estudo.', efeitos: [{ q: ['origem_investigando', 1] }, { inclinar: ['superar_rival', 1] }], fx: { stats: { comp: 1 }, perfil: { astucia: 2, disciplina: 1 } } } },
      { id: 'esconder', texto: 'Esconder: não é da conta de ninguém.',
        res: { texto: 'Você aprende a esconder o brilho nos olhos, a calar a tradução involuntária, a desviar a conversa. Esconder cansa, e deixa um gosto de mentira constante. Mas protege, por um tempo, quem você ainda é.', efeitos: [{ q: ['origem_oculta', 1] }], fx: { perfil: { cautela: 2 } } } },
      { id: 'testar', texto: 'Testar o limite: ver até onde essa coisa vai.', teste: { stat: ['esp', 'dao'], dif: 1 },
        sucesso: { texto: 'O poder responde com generosidade desajeitada, como um cão grande que obedece sem saber a própria força. Você sai do teste com os cabelos arrepiados e um sorriso incontrolável, e a sensação de ter acabado de abrir uma porta que não vai mais fechar.', efeitos: [{ q: ['origem_investigando', 1] }], fx: { xp: 24, stats: { esp: 1 }, perfil: { ambicao: 2 } } },
        falha: { texto: 'O poder responde grande demais, e o corpo tem de pagar. Você acorda no chão, sangrando pelo nariz e com a certeza incômoda de que isto não é brinquedo. Mas aprendeu uma coisa: o limite existe, e é menor do que o seu orgulho.', efeitos: [{ q: ['origem_oculta', 1] }], fx: { ferida: 3, perfil: { cautela: 1 } } } },
    ],
  }),

  molde({
    id: 'orig_pista',
    titulo: 'Quem Sabe de Onde Você Veio',
    tipo: 'preparo',
    capitulos: ['entrada', 'ascensao'],
    unico: true,
    papeis: { sabedor: { pessoa: { novo: true, criar: { traco: ['cauteloso', 'curioso'], reino: 5, objetivo: 'esconder' } } }, lugar: { lugar: { tipo: ['templo', 'ruinas', 'gruta'] } } },
    quando: { jogador: { reinoMin: 2 }, fio: { origem: { aberto: true } } },
    relevancia: [{ se: { q: { origem_investigando: [1, undefined] } }, mais: 40 }],
    fio: { id: 'origem', etapa: 2, abandono: 'A pista esfriou sem que ninguém a seguisse, e o que se sabia sobre você continuou em segredo.' },
    cena: [
      { se: { q: { origem_investigando: [1, undefined] } }, texto: 'Depois de meses de perguntas indiretas, uma tarde alguém bate à sua porta. {sabedor.nome}, de capa cinza e olhos de quem acostumou a não olhar demais, afirma conhecer o que você procura. O encontro é marcado para {lugar.nome}, ao anoitecer. "Venha sem espada", acrescenta. "E sem pressa de entender."' },
      { texto: 'Por um acaso que não parece acaso, {sabedor.nome} aparece na sua rota, em {lugar.nome}. Conhece o seu nome, e a data em que você nasceu, e fala de um tempo em que nenhum dos dois era vivo. Não faz promessas. Apenas diz: "Quando quiser saber, volte aqui."' },
    ],
    opcoes: [
      { id: 'ir', texto: 'Ir ao encontro, como combinado, sem espada.', teste: { stat: ['comp', 'sor'], dif: 0 },
        sucesso: { texto: '{sabedor.nome} serve chá, conta uma história com começo e meio, e se recusa a dar o fim. "O fim é seu", diz. Mas deixa, no meio, informação suficiente para uma pessoa atenta montar o resto. Você volta com mais perguntas e as primeiras respostas.', efeitos: [{ papel: ['sabedor', 'sabedor'] }, { opiniao: ['sabedor', 14] }, { fato: ['sabedor', 'contou_parte', 4] }, { q: ['origem_pista', 1] }], fx: { xp: 12, perfil: { astucia: 2 } } },
        falha: { texto: 'Você chega tarde, e {sabedor.nome} já partiu. Deixou um bilhete: "Quem demora não está pronto." É injusto, e talvez verdadeiro. O resto da conversa fica em aberto.', efeitos: [{ papel: ['sabedor', 'sabedor'] }, { opiniao: ['sabedor', -4] }, { fato: ['sabedor', 'foi_deixado_esperando', 2] }], fx: { perfil: { disciplina: 1 } } } },
      { id: 'armadilha', texto: 'Desconfiar: ir armado e com alguém de olho à distância.',
        res: { texto: '{sabedor.nome} nota a vigilância e sorri sem humor. "Sensato." Conta a história com outra voz, mais curta, e deixa de lado detalhes que só diria a quem confiasse. A desconfiança paga seu preço em respostas, e protege em outras coisas.', efeitos: [{ papel: ['sabedor', 'sabedor'] }, { opiniao: ['sabedor', 4] }, { q: ['origem_pista', 1] }], fx: { perfil: { cautela: 2, astucia: 1 } } } },
      { id: 'recusar', texto: 'Recusar o encontro: algumas respostas fazem mais mal do que a pergunta.',
        res: { texto: 'Você guarda o recado no fundo do bolso, e o recado esquenta uma semana inteira. Não aparece no encontro. {sabedor.nome} aparece em outra ocasião, sem rancor, e a pergunta continua, paciente, à sua espera.', efeitos: [{ papel: ['sabedor', 'sabedor'] }, { opiniao: ['sabedor', -2] }], fx: { perfil: { cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'orig_verdade',
    titulo: 'O Que {sabedor.nome} Contou',
    tipo: 'personagem',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...SABEDOR },
    quando: { jogador: { reinoMin: 3 }, papel: { sabedor: { vivo: true } }, fio: { origem: { aberto: true } } },
    relevancia: [{ se: { fio: { origem: { etapaMin: 2 } } }, mais: 40 }],
    fio: { id: 'origem', etapa: 3, abandono: 'A verdade nunca foi dita por inteiro, e você passou a viver com a versão que sobrou.' },
    cena: [
      { se: { jogador: { origem: ['alma_reencarnada'] } }, texto: '{sabedor.nome} abre um livro de couro rachado e aponta um nome. Era o seu, numa outra vida, e a sua morte está descrita em três linhas de prosa seca. "O Dao guarda o que a vida não termina", diz. "Quem morre sem fechar um assunto volta. Você voltou. Falta ver o que o assunto era."' },
      { se: { jogador: { origem: ['regressor'] } }, texto: '{sabedor.nome} escuta tudo sem interromper, e depois diz uma coisa que você não esperava: "Já houve outros como você. Poucos. Todos voltaram para consertar algo. Quase todos erraram o que consertar, porque olhavam para o fim em vez do começo."' },
      { texto: '{sabedor.nome} desenrola um mapa antigo e aponta uma linhagem, quase apagada pelo tempo: dragões, imperadores, um clã que o mundo prefere esquecer. "Você carrega o sangue deles", diz. "O que esse sangue permite, ninguém lhe dirá. O que cobra, todos descobrirão."' },
    ],
    opcoes: [
      { id: 'aceitar', texto: 'Aceitar a verdade, e perguntar o que fazer com a verdade.',
        res: { texto: '{sabedor.nome} sorri, pela primeira vez. "A pergunta certa é sempre a primeira." Conta o que sabe, e o que não sabe, e o que teme. Você sai com o peso do mundo nos ombros e a primeira impressão de ter alguém ao lado do fardo.', efeitos: [{ opiniao: ['sabedor', 14] }, { fato: ['sabedor', 'contou_a_verdade', 5] }, { q: ['origem_aceita', 1] }], fx: { xp: 20, stats: { dao: 1 }, perfil: { devocao: 1, disciplina: 1 } } } },
      { id: 'negar', texto: 'Negar tudo: você é quem escolhe ser, não quem foi.',
        res: { texto: '{sabedor.nome} não discute. "É um direito." Parte sem rancor, e a conversa fica suspensa como uma nuvem que não chove. Você carrega a escolha com orgulho e com o desconforto de quem sabe que negar não apaga.', efeitos: [{ opiniao: ['sabedor', -6] }, { fato: ['sabedor', 'foi_negado', 3] }, { q: ['origem_negada', 1] }], fx: { perfil: { ambicao: 1, cautela: 1 } } } },
      { id: 'usar', texto: 'Perguntar como usar isso em proveito próprio.',
        res: { texto: '{sabedor.nome} ergue uma sobrancelha. "Direto." Responde, com franqueza fria, e com um aviso que soa menos como conselho do que como previsão. Você sai com métodos novos, e com a sensação de ter assinado algo sem ler a última página.', efeitos: [{ opiniao: ['sabedor', -2] }, { fato: ['sabedor', 'foi_perguntado_sobre_uso', 3] }, { q: ['origem_aceita', 1] }], fx: { xp: 30, karma: -1, perfil: { ambicao: 2, ganancia: 1 } } } },
    ],
  }),

  molde({
    id: 'orig_caca',
    titulo: 'Quem Também Sabe',
    tipo: 'perigo',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...SABEDOR, cacador: { pessoa: { novo: true, criar: { traco: ['cruel', 'ambicioso'], reino: 5, objetivo: 'cacar', faccao: 'culto' } } } },
    quando: { jogador: { reinoMin: 3 }, fio: { origem: { aberto: true, etapaMin: 2 } } },
    relevancia: [{ se: { fio: { origem: { etapaMin: 3 } } }, mais: 45 }],
    combate: { oponente: 'assassino', cenario: 'floresta' },
    fio: { id: 'origem', etapa: 4, abandono: 'O caçador perdeu o rastro, e você viveu sem saber por quantas portas já tinha escapado.' },
    cena: 'O mundo é pequeno para um segredo. {cacador.nome}, de um grupo que coleciona o que é raro, encontra a pista que você deixou sem querer: um nome dito alto demais, um brilho visto de longe. A mensagem chega em papel preto: "Sabemos o que você é. Oferecemos proteção. Ou o contrário." No pátio, um pássaro cai morto, sem causa.',
    opcoes: [
      { id: 'enfrentar', texto: 'Enfrentar {cacador.nome} antes que a oferta vire cerco.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'cacador' },
        sucesso: { texto: 'O encontro é num campo sem testemunhas, e o fim chega rápido. {cacador.nome} cai com uma expressão que mistura surpresa e desgosto, e murmura antes de calar: "Não somos os únicos." Ao voltar, você carrega a vitória, e um novo medo.', efeitos: [{ fato: ['cacador', 'foi_derrotado', 5] }, { situacao: ['cacador', 'caido'] }, { q: ['origem_caca_vencida', 1] }], fx: { fama: 3, xp: 30, perfil: { violencia: 2, cautela: 1 } } },
        falha: { texto: '{cacador.nome} é melhor do que o previsto, e quase o tem. Escapa por pouco, deixando para trás um rastro de sangue e a certeza de que a caça continua. A pessoa ferida era você.', efeitos: [{ fato: ['cacador', 'quase_pegou_o_jogador', 5] }, { q: ['origem_caca_aberta', 1] }], fx: { ferida: 4, perfil: { cautela: 2 } } } },
      { id: 'sumir', texto: 'Desaparecer por um tempo, e deixar a pista esfriar.',
        res: { texto: 'Você muda de cidade, de nome, de rota. Os meses passam em quartos alugados, olhando janelas. A caça diminui, mas não cessa, e você aprende que viver escondido é uma forma de ser caçado sem ser alcançado.', efeitos: [{ fato: ['cacador', 'perdeu_o_rastro', 3] }, { q: ['origem_caca_aberta', 1] }], fx: { perfil: { cautela: 3 } } } },
      { id: 'aliar', texto: 'Aceitar a "proteção" do grupo, por enquanto.',
        res: { texto: 'A proteção é eficiente e custosa. Você ganha acesso a bibliotecas, aliados, e uma coleira de seda. {cacador.nome} fala de você com um carinho de colecionador. Aprende-se depressa o preço de ser raro: tudo se torna um item de catálogo.', efeitos: [{ opiniao: ['cacador', 10] }, { fato: ['cacador', 'recrutou_o_jogador', 5] }, { q: ['origem_caca_aliada', 1] }], fx: { xp: 22, karma: -2, perfil: { ganancia: 1, ambicao: 1 } } } },
    ],
  }),

  molde({
    id: 'orig_escolha',
    titulo: 'O Que Fazer Com Quem Você Foi',
    tipo: 'climax',
    capitulos: ['crise', 'legado'],
    unico: true,
    papeis: {},
    quando: { jogador: { reinoMin: 4 }, fio: { origem: { aberto: true, etapaMin: 3 } } },
    relevancia: [{ se: { fio: { origem: { etapaMin: 3 } } }, mais: 55 }],
    fio: { id: 'origem', etapa: 5, abandono: 'Você deixou a decisão para depois, e o depois, como sempre, decidiu sozinho.' },
    cena: 'Chega o dia em que a pergunta deixa de ser "o que sou" e passa a ser "o que faço com isso". Diante de você há três caminhos, e nenhum deles é fácil: abraçar a herança inteira, recusá-la por completo, ou escondê-la até que o mundo esqueça. Não há erro. Há custos, e cada um é diferente.',
    opcoes: [
      { id: 'abracar', texto: 'Abraçar a herança inteira, e assumir quem você é.', teste: { stat: ['esp', 'dao'], dif: 2 },
        sucesso: { texto: 'O que dormia acorda, sem pressa e sem violência. Você sente os fios da vida anterior (ou do sangue, ou do futuro) se ligarem à sua, e por um instante é muitas pessoas, depois uma só. O mundo parece mais nítido. As pessoas ao redor percebem sem saber o quê.', efeitos: [{ fio: ['origem', 'fechar:abracou'] }, { noticia: 'Dizem que há um cultivador cuja presença faz o ar mudar de peso.' }], fx: { xp: 80, fama: 5, stats: { dao: 2, esp: 2 }, perfil: { ambicao: 2, disciplina: 2 } } },
        falha: { texto: 'A herança vem inteira demais, e o corpo não aguenta. Você apaga por três dias, e quando acorda, uma parte de você ficou do outro lado. Está mais velho do que devia estar, e mais sábio do que gostaria.', efeitos: [{ fio: ['origem', 'fechar:abracou'] }], fx: { vida: -8, xp: 40, ferida: 3, perfil: { disciplina: 1 } } } },
      { id: 'recusar', texto: 'Recusar a herança: viver a vida que é sua, sem fantasma.',
        res: { texto: 'O ritual de recusa é simples e duro. No fim, a memória (ou o sangue, ou o futuro) se cala como um animal que entendeu a ordem. Você sente falta do que perdeu. Mas a manhã seguinte tem o cheiro de uma vida que é só sua, e isso não tem preço.', efeitos: [{ fio: ['origem', 'fechar:recusou'] }], fx: { karma: 4, perfil: { disciplina: 2, compaixao: 1 } } } },
      { id: 'ocultar', texto: 'Ocultar a herança: usá-la em silêncio, e jamais confessar.',
        res: { texto: 'Você aprende a usar o que tem como se fosse sorte, intuição, disciplina. Ninguém repara, ou todos reparam e fingem não. A herança se enterra na rotina, e rende juros discretos pelo resto da vida.', efeitos: [{ fio: ['origem', 'fechar:ocultou'] }], fx: { xp: 36, fama: 1, perfil: { astucia: 2, cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'orig_epilogo',
    titulo: 'A Vida Que Era Sua',
    tipo: 'consequencia',
    capitulos: ['crise', 'legado'],
    unico: true,
    papeis: {},
    quando: { fio: { origem: { resolvido: true } } },
    relevancia: [{ se: { fio: { origem: { resolvido: true } } }, mais: 55 }],
    cena: [
      { se: { fio: { origem: { desfecho: ['abracou'] } } }, texto: 'Você carrega muitas vozes agora, e aprendeu a distinguir a sua entre elas. Quem convive com você diz que há algo de antigo no seu jeito de ouvir. Você sorri e não explica.' },
      { se: { fio: { origem: { desfecho: ['recusou'] } } }, texto: 'O vazio que ficou é pequeno e específico, como o de um dente que saiu. Você o sente com a língua, de vez em quando, e a cada vez agradece. Há quem escolha ser uma pessoa só, e é uma escolha imensa.' },
      { texto: 'O segredo cresce em silêncio, como uma árvore dentro de uma casa. Você aprendeu a andar em volta dele sem tropeçar. Ninguém sabe, e todos desconfiam, e a vida segue, firme, com um centro que só você conhece.' },
    ],
    opcoes: [
      { id: 'segue', texto: 'Seguir em frente.', res: { texto: 'O que se descobriu sobre si não acaba; vira o fundo contra o qual o resto acontece.', efeitos: [], fx: {} } },
    ],
  }),
];
