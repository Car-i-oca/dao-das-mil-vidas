import { molde, type Molde, type Opcao, type Capitulo, type Tipo } from '../../../engine/v2/tipos';

/**
 * Lote 2 da Fase 3: cenas de trilha. Cada trilha tem duas cenas escritas para ela (a marca do build), que só aparecem para
 * quem a segue. Cada opção muda alguém ou alguma coisa no mundo e rende o recurso da trilha (fx.rec).
 */
const MESTRE = { mestre: { pessoa: { papel: 'mestre', vivo: true }, opcional: true } } as const;

function trilha(id: string, titulo: string, path: string, tipo: Tipo, caps: Capitulo[], cena: Molde['cena'], opcoes: Opcao[], extra: Partial<Molde> = {}): Molde {
  return molde({
    id, titulo, tipo, capitulos: caps, unico: true,
    papeis: { ...MESTRE },
    quando: { jogador: { trilha: [path], reinoMin: 1 } },
    relevancia: [{ se: { jogador: { trilha: [path] } }, mais: 38 }],
    cena, opcoes, ...extra,
  });
}

export const TRILHAS: Molde[] = [
  /* ---------- Sopro ---------- */
  trilha('tr_sopro_cachoeira', 'O Primeiro Fôlego Limpo', 'sopro', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} leva você até uma cachoeira que ninguém visita e manda sentar de costas para a água. "Respire com {=ela}, e não contra {=ela}", diz, e se afasta. O estrondo cobre todos os outros sons, inclusive os seus pensamentos, e o Qi que você julgava limpo mostra, de repente, quanta borra carrega.' },
      { texto: 'Numa cachoeira sem nome, no fundo de um vale, você senta de costas para a água e tenta fazer o que o manual diz: respirar com ela. O estrondo cobre todos os pensamentos, e o Qi que você julgava limpo revela, aos poucos, quanta borra carrega.' },
    ],
    [
      { id: 'respirar', texto: 'Respirar no ritmo da queda, um fôlego de cada vez, sem pressa de acabar.', teste: { stat: ['esp', 'dao'], dif: 0 },
        sucesso: { texto: 'Algo cede, devagar, como gelo no fim do inverno. O Qi que sobe agora é mais fino, e o corpo, depois de uma noite inteira de pedra fria, parece de outra massa. Você sai com os cabelos molhados e uma clareza que dura dias.', efeitos: [{ opiniao: ['mestre', 6] }], fx: { rec: 2, xp: 14, stats: { esp: 1 }, perfil: { disciplina: 2 } } },
        falha: { texto: 'O estrondo vence. Em vez de limpar, o Qi se agita, e você passa o resto da noite tossindo água e orgulho. Aprendeu, pelo menos, que a cachoeira não negocia.', fx: { rec: 1, ferida: 1, perfil: { disciplina: 1 } } } },
      { id: 'vento', texto: 'Trocar a cachoeira pelo vento do alto da pedra, onde ninguém grita e tudo sopra.', teste: { stat: ['comp', 'sor'], dif: 0 },
        sucesso: { texto: 'Lá em cima, o Qi anda mais solto. Você descobre que respirar com o vento é um jeito de ficar leve, não de ficar limpo, e que as duas coisas se parecem mais do que os livros dizem.', fx: { rec: 2, xp: 10, perfil: { astucia: 1, cautela: 1 } } },
        falha: { texto: 'O vento vira e leva embora a concentração, o chapéu e a paciência. Você desce com mais perguntas do que subiu, o que, afinal, também é aprendizado.', fx: { rec: 1, perfil: { cautela: 1 } } } },
      { id: 'ajudar', texto: 'Parar a prática para ajudar um peregrino que escorregou nas pedras molhadas.',
        res: { texto: 'Você o puxa pela manga, e ele agradece com a voz de quem quase não agradeceria a Deus. Perde-se uma noite de prática, ganha-se um favor, e o Qi, estranhamente, assenta melhor depois de um gesto assim.', fx: { rec: 1, karma: 3, perfil: { compaixao: 2 } } } },
    ]),
  trilha('tr_sopro_impureza', 'A Borra do Qi', 'sopro', 'personagem', ['ascensao', 'crise'],
    'O Qi começa a pesar nas juntas, como lama num rio que deveria correr. Você consulta o que sabe, e a resposta é sempre a mesma: limpar custa, e o custo é tempo, ou pedras, ou coragem. Um cultivador mais velho da região oferece, sem muito entusiasmo, um método antigo, e o aviso que vem junto: "Funciona, e dói. Não pergunte quanto."',
    [
      { id: 'metodo', texto: 'Aceitar o método antigo, com todo o custo que ele tiver.', teste: { stat: ['esp', 'fis'], dif: 1 },
        sucesso: { texto: 'Foram nove dias de uma dor que muda de lugar, e no décimo o Qi corre limpo como não corria desde a infância. O cultivador olha de longe e anota algo num caderno. "Mais um que sobreviveu", resmunga.', fx: { rec: 3, xp: 24, ferida: 1, perfil: { disciplina: 2, ambicao: 1 } } },
        falha: { texto: 'O método pede mais do que você tem. Interrompê-lo no sétimo dia custa caro: um mês de convalescença e a impressão de ter perdido, para sempre, uma camada de pureza que não volta.', fx: { rec: 1, ferida: 3, vida: -1, perfil: { disciplina: 1 } } } },
      { id: 'lento', texto: 'Limpar aos poucos, pelo caminho lento: meditação diária e paciência.',
        res: { texto: 'Leva anos, e ninguém aplaude. Mas a pureza que vem assim não tem um nome para ser perdido: é costume. Você aprende que a paciência também é um recurso, e que quem a tem raramente se parece com quem tem pressa.', fx: { rec: 2, xp: 12, perfil: { disciplina: 2, cautela: 1 } } } },
      { id: 'comprar', texto: 'Comprar uma pílula de purificação, e deixar que o mercado resolva.', custo: 120,
        res: { texto: 'A pílula funciona, mais ou menos. O Qi clareia um tom, e a bolsa, dois. O vendedor guarda a moeda com o sorriso de quem conhece o próximo cliente pelo nome.', fx: { rec: 1, xp: 8, perfil: { ganancia: 1 } } } },
    ]),

  /* ---------- Espada ---------- */
  trilha('tr_espada_folha', 'A Folha no Ar', 'espada', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} solta uma folha de bambu e diz: "Corte, sem tocar." Você corta cinquenta vezes, e a folha cai inteira todas as vezes. Na quinquagésima primeira, {mestre.ele} sai sem dizer nada, e você fica sozinh{jogador.o} com a folha, o vento e a ideia de que talvez a pergunta nunca tenha sido sobre a lâmina.' },
      { texto: 'Uma folha de bambu cai do alto, e você, de espada na mão, tenta cortá-la antes que toque o chão. Cinquenta vezes. A folha cai inteira todas elas. Na quinquagésima primeira, você pára, olha a lâmina, e pergunta a si mesm{jogador.o} para que serve cortar o que não pede para ser cortado.' },
    ],
    [
      { id: 'repetir', texto: 'Continuar até a folha ceder, nem que leve a noite.', teste: { stat: ['fis', 'dao'], dif: 0, tag: 'espada' },
        sucesso: { texto: 'Às três da manhã, a folha se parte em dois sem barulho, e você nem viu o golpe. A lâmina dorme na bainha, e a mão sabe uma coisa que a cabeça ainda não entendeu. É a primeira vez que sente que a espada o escolheu.', efeitos: [{ opiniao: ['mestre', 8] }], fx: { rec: 3, xp: 16, perfil: { disciplina: 2 } } },
        falha: { texto: 'Ao amanhecer, a mão treme, e a folha ainda cai inteira. Você guarda a espada com um respeito novo pelo que não sabe, e uma teimosia mais velha do que o corpo.', fx: { rec: 1, ferida: 1, perfil: { disciplina: 1 } } } },
      { id: 'soltar', texto: 'Largar a espada no chão e tentar pegar a folha com a mão.',
        res: { texto: 'A folha pousa na palma como um pássaro cansado. Você entende, por um instante, o que a pergunta queria: não cortar, mas chegar antes. Daquele dia em diante, o seu jeito de segurar a espada é um jeito de segurar o tempo.', fx: { rec: 2, xp: 10, karma: 1, perfil: { astucia: 1, compaixao: 1 } } } },
      { id: 'cortar_ar', texto: 'Cortar o ar em volta da folha, tirando o chão de debaixo dela.', teste: { stat: ['comp', 'dao'], dif: 1, tag: 'espada' },
        sucesso: { texto: 'A folha estremece, hesita, e se parte sem tocar o aço. Alguma coisa que você chamará, mais tarde, de intenção, aprendeu a sair da ponta da espada.', fx: { rec: 3, xp: 14, perfil: { astucia: 2 } } },
        falha: { texto: 'O ar não obedece, e a folha ri, do jeito que as folhas riem: caindo exatamente onde queria. Você guarda a espada com uma frase nova na cabeça: o orgulho também é um tipo de peso.', fx: { rec: 1, perfil: { ambicao: 1 } } } },
    ]),
  trilha('tr_espada_duelo', 'O Mestre de Espada da Vila', 'espada', 'personagem', ['ascensao', 'crise'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: 'Um velho espadachim de uma vila vizinha manda um recado: quer ver o aluno de {mestre.nome}. Não é desafio, diz o recado; é curiosidade. Mas todo mundo sabe que, entre gente de espada, a curiosidade é uma lâmina com bainha de seda.' },
      { texto: 'Um velho espadachim de uma vila vizinha manda um recado: ouviu falar de quem anda por aí com uma espada e pouco medo, e quer ver. Não é desafio, diz o recado; é curiosidade. Mas todo mundo sabe que, entre gente de espada, a curiosidade é uma lâmina com bainha de seda.' },
    ],
    [
      { id: 'duelo', texto: 'Aceitar o duelo de treino e medir-se com ele.', teste: { stat: ['fis', 'dao'], dif: 1, tag: 'espada' },
        sucesso: { texto: 'O velho cai de joelhos, e depois ri. "Não perdi para a espada", diz. "Perdi para a pressa que eu tinha há cinquenta anos." Entrega a você uma lâmina de madeira velha, polida de tanto uso, como quem passa uma chave.', fx: { rec: 3, xp: 26, fama: 2, perfil: { violencia: 1, disciplina: 1 } } },
        falha: { texto: 'Em três golpes você está de costas no chão, olhando o céu. O velho estende a mão, e a lição que vem com ela é seca como um osso: "Você é rápido demais para a idade que tem, e lento demais para a que quer ter."', fx: { rec: 1, ferida: 2, perfil: { disciplina: 1 } } } },
      { id: 'observar', texto: 'Pedir para apenas assistir, e aprender com a maneira dele lutar.',
        res: { texto: 'Você passa três dias olhando um homem velho cortar o vazio em oito direções, e na segunda noite entende o ritmo. Ao despedir-se, o espadachim diz, sem olhar: "Raramente alguém pede para assistir. Os que pedem, geralmente, chegam longe."', fx: { rec: 2, xp: 14, perfil: { astucia: 1, disciplina: 1 } } } },
      { id: 'recusar', texto: 'Recusar com educação: ainda não é a hora.',
        res: { texto: 'O velho assente, como quem já esperava. "Quando for, volte", diz o recado de volta. Há uma sabedoria silenciosa em saber que o duelo não vai a lugar nenhum, e que a espada cresce mesmo quando ninguém olha.', fx: { rec: 1, perfil: { cautela: 2 } } } },
    ]),

  /* ---------- Alquimia ---------- */
  trilha('tr_alquimia_vigesima', 'A Vigésima Pílula', 'alquimia', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} faz você refinar a mesma pílula vinte vezes, sem dizer o que está errado. A cada nova tentativa a chama sobe um pouco, e a cada tentativa as outras dezenove pílulas, empilhadas, parecem uma pequena montanha de falhas. Na vigésima, o forno faz um som que não fez nas outras.' },
      { texto: 'Você refina a mesma pílula pela vigésima vez, sem ninguém para dizer o que está errado. As dezenove anteriores estão alinhadas numa tábua, como pequenas lápides. O forno, na vigésima, faz um som diferente, e você segura o fôlego.' },
    ],
    [
      { id: 'chama', texto: 'Baixar a chama, e esperar que o forno decida o ritmo.', teste: { stat: ['comp', 'sor'], dif: 0, tag: 'alquimia' },
        sucesso: { texto: 'A pílula nasce redonda, lisa, e quente como uma brasa bem tratada. O cheiro enche a sala com uma doçura que você não sabia que existia. Dezenove falhas e uma vitória são, no fundo, a mesma coisa vista em direções diferentes.', efeitos: [{ opiniao: ['mestre', 6] }], fx: { rec: 3, xp: 14, item: ['pilula_qi_menor'], perfil: { disciplina: 1, astucia: 1 } } },
        falha: { texto: 'A chama oscila, a pílula racha, e o forno solta uma tosse de fumaça preta. A vigésima vai para a tábua, ao lado das outras. Nenhuma delas, você nota, é exatamente igual, e é isso, por incrível que pareça, que consola.', fx: { rec: 1, perfil: { disciplina: 1 } } } },
      { id: 'ervas', texto: 'Trocar uma erva por outra, por intuição, contra a receita.', teste: { stat: ['comp', 'esp'], dif: 1, tag: 'alquimia' },
        sucesso: { texto: 'A troca devia estragar tudo, e em vez disso a pílula nasce com uma cor nunca vista, entre o âmbar e o jade. Você anota a receita antes que o espanto passe. Há erros que não são erros: são portas.', fx: { rec: 3, xp: 12, perfil: { astucia: 2, ambicao: 1 } } },
        falha: { texto: 'A erva errada empesta o ar. Você abre as janelas, tosse, ri de si mesm{jogador.o}, e limpa o forno com a certeza de que a intuição também precisa de testes antes de merecer confiança.', fx: { rec: 1, ferida: 1, perfil: { astucia: 1 } } } },
      { id: 'parar', texto: 'Parar, dormir, e recomeçar no dia seguinte.',
        res: { texto: 'Na manhã seguinte, o problema que você via parece óbvio. Fazer menos, muitas vezes, é uma forma de fazer melhor. A pílula nasce sem alarde, e a satisfação é do tamanho exato dela.', fx: { rec: 2, xp: 8, perfil: { cautela: 1, disciplina: 1 } } } },
    ]),
  trilha('tr_alquimia_cliente', 'O Cliente Impossível', 'alquimia', 'personagem', ['ascensao', 'crise'],
    'Um homem de capa elegante entra na sua loja ao entardecer e faz uma encomenda estranha: um remédio que "cure o sono, de forma permanente". Paga adiantado, com mais pedras do que a pílula vale. Fala baixo, e os olhos, ao dizer "permanente", se desviam para a janela. Não é pedido de médico. Mas também não é pedido de assassino, ou ainda não parece.',
    [
      { id: 'recusar', texto: 'Recusar a encomenda, e devolver as pedras.',
        res: { texto: 'Ele leva as pedras de volta sem discutir. Na porta, olha para trás, e há alguma coisa na expressão que você nunca esquece: não raiva, e sim alívio, como se esperasse a recusa. Alguém, em algum lugar, vai dormir mais tarde esta noite.', fx: { rec: 2, karma: 4, perfil: { compaixao: 2 } } } },
      { id: 'perguntar', texto: 'Perguntar para quem é o remédio, e por quê.', teste: { stat: ['car', 'comp'], dif: 0 },
        sucesso: { texto: 'O homem demora a responder, e depois conta: é para a mãe, doente havia anos, que pediu para ir embora. Você prepara uma infusão que alivia a dor sem apressar nada, e ele chora ao recebê-la. Algumas pessoas não procuram veneno; procuram permissão.', fx: { rec: 3, karma: 5, xp: 10, perfil: { compaixao: 3 } } },
        falha: { texto: 'O homem se fecha, murmura uma desculpa, e sai. Pelo cheiro da rua, ele vai a outra loja. A pergunta certa, às vezes, só funciona uma vez, e uma vez só.', fx: { rec: 1, perfil: { compaixao: 1 } } } },
      { id: 'fazer', texto: 'Fazer o remédio: o que ele faz com ele não é da sua conta.',
        res: { texto: 'A poção sai limpa, discreta, perfeita. O homem agradece em voz baixa. Nos dias seguintes você tenta não pensar, e não pensa, até que um sino toca ao longe, e você sabe, sem saber, para quem.', fx: { rec: 2, pedras: 180, karma: -6, perfil: { ganancia: 2 } } } },
    ]),

  /* ---------- Corpo ---------- */
  trilha('tr_corpo_ladeira', 'A Pedra da Ladeira', 'corpo', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} aponta uma pedra do tamanho de um boi e uma ladeira de trezentos degraus. "Suba." Não diz mais nada. Subir a ladeira com a pedra nas costas leva o dia inteiro, e o que {=ela} ensina não está nos músculos, mas na parte que decide, no degrau cento e quarenta, não largar.' },
      { texto: 'Numa pedreira abandonada há uma pedra do tamanho de um boi e uma ladeira de trezentos degraus. Ninguém mandou, mas todo mundo que treina o corpo, em algum momento, acaba aqui. Subir com a pedra leva o dia inteiro, e o que {=ela} ensina não está nos músculos, e sim na parte que decide não largar.' },
    ],
    [
      { id: 'subir', texto: 'Carregar a pedra até o topo, degrau por degrau, sem parar.', teste: { stat: ['fis', 'dao'], dif: 1, tag: 'corpo' },
        sucesso: { texto: 'No degrau duzentos e dez, o corpo se rende, e quem continua é outra coisa. Você chega ao topo com os ombros em sangue e os olhos secos, e larga a pedra com uma delicadeza estranha. Um corpo que aprendeu a suportar o que não devia nunca mais se rende por pouco.', efeitos: [{ opiniao: ['mestre', 8] }], fx: { rec: 3, xp: 18, stats: { fis: 1 }, perfil: { disciplina: 2 } } },
        falha: { texto: 'Perto do fim, uma perna cede. A pedra rola, e você, atrás, de joelhos, vê-la descer até o pé da ladeira. Recomeçar custa mais do que insistir. Você recomeça.', fx: { rec: 1, ferida: 2, perfil: { disciplina: 1 } } } },
      { id: 'revezar', texto: 'Partir a subida em trechos, descansando sempre antes do limite.', teste: { stat: ['fis', 'comp'], dif: 0, tag: 'corpo' },
        sucesso: { texto: 'Você sobe sem glória, mas sem se quebrar. No topo, olha a ladeira e percebe que treinar não é a arte de sofrer, e sim a de sofrer o que serve. A pedra desce mais leve do que subiu.', fx: { rec: 2, xp: 12, perfil: { astucia: 1, cautela: 1 } } },
        falha: { texto: 'Descansar demais corta o ritmo, e a pedra pesa mais a cada recomeço. Você termina a subida ao pôr do sol, vazio, e entende que a medida certa é a coisa mais difícil de achar.', fx: { rec: 1, perfil: { cautela: 1 } } } },
      { id: 'ajudar', texto: 'Dividir a pedra com alguém que passava pela ladeira, e subir a dois.',
        res: { texto: 'A pedra, a dois, é menos pedra. Vocês chegam ao topo rindo de cansaço, e uma amizade começa onde nenhum dos dois esperava, no pó, no suor e na irreverência dos que subiram juntos.', fx: { rec: 2, karma: 2, xp: 8, perfil: { compaixao: 1, devocao: 1 } } } },
    ]),
  trilha('tr_corpo_forja', 'O Teste do Ferreiro', 'corpo', 'personagem', ['ascensao', 'crise'],
    'Um ferreiro grisalho, de braços tão marcados quanto a bigorna, oferece um negócio estranho: bater em você com o martelo, em pontos escolhidos, "para ver de que o corpo é feito". Diz que fez isso com meia dúzia de aprendizes de cultivadores, e que a metade voltou para pedir de novo. Os olhos dele não brincam.',
    [
      { id: 'aceitar', texto: 'Aceitar, e deixar o martelo cantar.', teste: { stat: ['fis', 'dao'], dif: 1, tag: 'corpo' },
        sucesso: { texto: 'Cada pancada é um ensinamento: aqui o osso é mais forte, ali ainda há uma lasca. Ao fim, você está inteiro e marcado, e o ferreiro, sem sorrir, diz: "Eu vi coisa pior sair daqui menos inteira." É a maior honra que ele sabe dar.', fx: { rec: 3, xp: 20, fama: 1, stats: { fis: 1 }, perfil: { disciplina: 1, violencia: 1 } } },
        falha: { texto: 'Duas pancadas depois, o mundo gira, e você acorda com um chá amargo na mão e o ferreiro, ao lado, resmungando. "Hoje não era o dia", diz. Há dias que o corpo não aceita o que a cabeça quis.', fx: { rec: 1, ferida: 3, perfil: { disciplina: 1 } } } },
      { id: 'observar', texto: 'Pedir que ele mostre em outro aprendiz primeiro, para aprender o ritmo.',
        res: { texto: 'O ferreiro dá de ombros e chama um rapaz que esperava na porta. Você assiste ao ritual de ponta a ponta, e entende, pelo que o corpo do outro suporta, o limite que o seu ainda não conhece. Escolher o tempo de aprender também é uma forma de força.', fx: { rec: 2, xp: 10, perfil: { astucia: 1, cautela: 1 } } } },
      { id: 'recusar', texto: 'Recusar e seguir o treino à sua maneira.',
        res: { texto: 'O ferreiro assente, sem ofensa. "Os que recusam também chegam, só mais devagar." E volta ao fogo. Você sai da oficina com o barulho do martelo ainda nos ouvidos e a certeza de ter feito, ao menos, uma escolha sua.', fx: { rec: 1, perfil: { cautela: 1 } } } },
    ]),

  /* ---------- Consciência (alma) ---------- */
  trilha('tr_alma_espelho', 'O Espelho de Água', 'alma', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} põe diante de você uma bacia de água parada. "Olhe", diz. Não para o rosto: para o que está atrás {=dele}. A água estremece sem vento, e o seu reflexo, por um instante, não acompanha os seus gestos. A mente, como a água, também tem fundo, e há coisas que moram {=nele}.' },
      { texto: 'Numa bacia de água parada, o seu reflexo se atrasa meio segundo. Depois se atrasa um. A água estremece sem vento, e você percebe, com um frio na nuca, que a mente tem fundo, e que há coisas morando nele que nunca foram apresentadas.' },
    ],
    [
      { id: 'mergulhar', texto: 'Mergulhar o olhar na água até o reflexo desistir de imitar.', teste: { stat: ['esp', 'dao'], dif: 1, tag: 'mente' },
        sucesso: { texto: 'O reflexo para, e uma coisa antiga olha de volta. Não é perigosa; é apenas muito velha, como a parte de você que sempre soube o que ia acontecer. Você sai do exercício com uma percepção que atravessa paredes, e um respeito novo pela quietude.', fx: { rec: 3, xp: 16, stats: { esp: 1 }, perfil: { disciplina: 1, astucia: 1 } } },
        falha: { texto: 'A água se agita, e o reflexo lhe mostra, por um segundo, algo que você preferia não ter visto. Você se afasta com dor de cabeça e uma sensação incômoda de ser olhad{jogador.o} de volta por uma versão sua que não gostou do que viu.', fx: { rec: 1, ferida: 1, corr: 2, perfil: { cautela: 1 } } } },
      { id: 'perturbar', texto: 'Jogar uma pedra na água: a mente que se agita não revela nada, mas também não pode ser lida.',
        res: { texto: 'As ondas apagam o rosto. Fica a pergunta de saber se você apagou algo que devia ser visto, ou se se protegeu de uma coisa que ainda não sabia que precisava de proteção. Tranquilidade e cegueira se parecem mais do que se admite.', fx: { rec: 1, perfil: { cautela: 2 } } } },
      { id: 'esperar', texto: 'Esperar de olhos fechados, até a água se acalmar sozinha.', teste: { stat: ['esp', 'sor'], dif: 0, tag: 'mente' },
        sucesso: { texto: 'A água se acalma, e junto dela a mente. Você abre os olhos e vê, sem esforço, uma folha caindo duas vezes antes de cair uma. A previsão de segundos é o mais perto do futuro que a consciência alcança.', fx: { rec: 2, xp: 12, perfil: { disciplina: 1 } } },
        falha: { texto: 'A mente não aquieta, e a água não ajuda. Você adormece sentado, e acorda ao amanhecer com a bacia vazia e o pescoço duro. Há dias em que a paz se recusa a ser convidada.', fx: { rec: 1, perfil: { disciplina: 1 } } } },
    ]),
  trilha('tr_alma_voz', 'A Voz Que Pede', 'alma', 'personagem', ['ascensao', 'crise'],
    'Quando a consciência ganha fundo, as vozes de quem já morreu ali começam a chegar. Esta noite, uma delas insiste: é uma mulher, ou foi, e pede que você leve uma mensagem até uma aldeia a três dias de distância. Não sabe a quem, só o nome de uma árvore e uma frase de despedida. Ela não ameaça. Apenas espera, com a paciência dos que não têm mais pressa.',
    [
      { id: 'levar', texto: 'Ir até a aldeia e entregar a mensagem, como ela pediu.', teste: { stat: ['car', 'esp'], dif: 0, tag: 'mente' },
        sucesso: { texto: 'Debaixo de uma árvore, um velho escuta a frase, e chora sem vergonha. "Ela morreu sem dizer", murmura, e abre as mãos como quem solta algo que segurava há quarenta anos. Naquela noite a voz não volta; há despedidas que, uma vez ditas, libertam também quem as carrega.', fx: { rec: 3, karma: 5, xp: 14, perfil: { compaixao: 3, devocao: 1 } } },
        falha: { texto: 'A aldeia é a errada, ou a árvore. Você anda dois dias entre pessoas que não entendem, e volta de mãos vazias. A voz não reclama, mas também não se despede. Fica ali, esperando, e algo da espera passa para você.', fx: { rec: 1, perfil: { compaixao: 1 } } } },
      { id: 'ignorar', texto: 'Fingir que não ouve: a consciência tem de aprender a calar os mortos.',
        res: { texto: 'Pouco a pouco, a voz diminui. Você ganha silêncio e perde uma conversa que talvez fosse a mais honesta da sua vida. O que se cala por escolha não desaparece: fica guardado, como uma pergunta.', fx: { rec: 1, karma: -1, perfil: { disciplina: 1, cautela: 1 } } } },
      { id: 'perguntar', texto: 'Perguntar à voz quem ela foi, e o que quer dizer ao mundo.',
        res: { texto: 'A voz fala por uma noite inteira, em frases que são mais lembrança do que informação. Você aprende o nome de um rio, o gosto de uma sopa, a cor de um lenço. Ao amanhecer, ela se foi, e você ficou com as lembranças de alguém que nunca foi você.', fx: { rec: 2, xp: 10, karma: 2, perfil: { compaixao: 2 } } } },
    ]),

  /* ---------- Formações ---------- */
  trilha('tr_formacoes_linha', 'A Linha no Chão', 'formacoes', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} desenha uma linha no chão e pede que você a atravesse sem pisar {=nela}. Você pula, rasteja, tenta de todas as formas. Não consegue. "A linha não está no chão", diz {mestre.ele}, calm{mestre.o}. "Está em quem a vê." Uma formação não prende o corpo: prende a maneira de decidir.' },
      { texto: 'Há uma linha riscada no chão de uma praça vazia, e uma crença antiga de que ninguém a atravessa. Você tenta, e descobre que não é medo: é uma espécie de vontade que não quer ser quebrada. Uma formação, entende, não prende o corpo, e sim a maneira de decidir.' },
    ],
    [
      { id: 'estudar', texto: 'Estudar a linha por dentro: onde começa, onde termina, o que a sustenta.', teste: { stat: ['comp', 'esp'], dif: 1, tag: 'formacao' },
        sucesso: { texto: 'Há três pontos, e um deles é uma pedra que alguém escondeu embaixo. Quando você a retira, a linha desaparece, e a praça, por um instante, parece maior. A formação não se rompeu: foi compreendida, e uma formação compreendida é uma formação que obedece.', fx: { rec: 3, xp: 14, stats: { comp: 1 }, perfil: { astucia: 2 } } },
        falha: { texto: 'A linha resiste, e a cabeça lateja. Você passa a tarde desenhando padrões na areia, e todos falham da mesma maneira bonita. Quem aprende formações aprende, primeiro, o próprio limite.', fx: { rec: 1, perfil: { astucia: 1 } } } },
      { id: 'desenhar', texto: 'Desenhar uma linha sua ao lado da primeira, e ver como elas se tocam.', teste: { stat: ['comp', 'sor'], dif: 0, tag: 'formacao' },
        sucesso: { texto: 'As duas linhas se tocam, vibram, e se cancelam em silêncio. Você aprende, de uma vez, que uma formação não é uma coisa: é uma conversa, e conversas se resolvem com interlocutores.', fx: { rec: 3, xp: 12, perfil: { astucia: 1, ambicao: 1 } } },
        falha: { texto: 'A segunda linha se parte, e a primeira ri sem ruído. Você apaga ambas com a bota e jura voltar com mais método, que é o jeito educado de dizer: mais humildade.', fx: { rec: 1, perfil: { cautela: 1 } } } },
      { id: 'contornar', texto: 'Desistir de atravessar, e seguir pela borda da praça.',
        res: { texto: 'Chegar ao outro lado pela borda leva três minutos a mais e nenhum esforço. Às vezes a resposta mais simples é a que menos se parece com resposta, e a que mais ensina.', fx: { rec: 1, perfil: { cautela: 2 } } } },
    ]),
  trilha('tr_formacoes_quebrada', 'O Padrão Quebrado', 'formacoes', 'personagem', ['ascensao', 'crise'],
    'Uma aldeia pede ajuda: a formação que protegia as casas contra o frio e as feras, desenhada por alguém há muitas gerações, rachou numa noite de chuva. Desde então, lobos rondam, e um menino adoeceu. Ninguém sabe consertá-la, e o cultivador mais próximo está a dez dias. Eles olham para você, com o respeito cauteloso de quem não tem mais ninguém para olhar.',
    [
      { id: 'consertar', texto: 'Estudar o que sobrou do padrão e reconstruí-lo, pedra por pedra.', teste: { stat: ['comp', 'esp'], dif: 1, tag: 'formacao' },
        sucesso: { texto: 'Foram quatro dias, e no quarto a pedra do centro vibrou, uma só vez, como um coração que volta. O frio recuou. Os lobos pararam na borda, olharam, e foram embora. A aldeia não tem moeda para pagar, mas tem uma panela de caldo e uma cadeira junto ao fogo, e é a mais honesta das pagas.', fx: { rec: 3, xp: 22, fama: 2, karma: 4, perfil: { compaixao: 2, astucia: 1 } } },
        falha: { texto: 'A formação segura por duas noites e racha de novo. Você explica, sem jeito, que fez o possível, e eles agradecem com a polidez de quem já perdeu esperanças. O menino melhora, devagar, por razões que não são suas.', fx: { rec: 1, karma: 1, perfil: { compaixao: 1 } } } },
      { id: 'provisorio', texto: 'Montar uma proteção provisória enquanto o cultivador distante não chega.', teste: { stat: ['comp', 'sor'], dif: 0, tag: 'formacao' },
        sucesso: { texto: 'Uma formação improvisada de varas, cordas e pó de cinábrio segura a noite. Não é bonita, mas serve, e quando o cultivador enfim chega, olha para o trabalho e murmura: "Tosco, e funcional. É a melhor classe de formação." Você finge não ouvir o elogio.', fx: { rec: 2, xp: 14, karma: 3, perfil: { astucia: 2, compaixao: 1 } } },
        falha: { texto: 'A proteção cai na segunda noite, e você passa a madrugada com a lança de um camponês na mão, ao lado de homens que não sabem lutar. Sobrevivem, por pouco, e a lição não é sobre formação: é sobre responsabilidade.', fx: { rec: 1, ferida: 2, perfil: { disciplina: 1 } } } },
      { id: 'recusar', texto: 'Recusar: não é seu dever, e o risco é de vocês.',
        res: { texto: 'Eles agradecem a franqueza, e não pedem de novo. A aldeia fica para trás com seus lobos e seu frio, e você segue pela estrada com a sensação, que não passa, de que cada decisão assim deixa um traço na bússola de quem a toma.', fx: { rec: 1, karma: -3, perfil: { cautela: 2, ganancia: 1 } } } },
    ]),

  /* ---------- Mérito (budista) ---------- */
  trilha('tr_budista_tigela', 'A Tigela Vazia', 'budista', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} entrega a você uma tigela de madeira, sem nada dentro, e manda sair pela vila pedindo comida. "Volte antes do sol sumir", diz. "Com a tigela cheia, ou com a lição." O mérito, descobre-se, não se acumula pedindo, e sim aprendendo a receber e a dar o que recebeu.' },
      { texto: 'Você sai da vila com uma tigela vazia, para pedir, de porta em porta, o que as pessoas quiserem dar. O mérito, diz a tradição, não se acumula pedindo: acumula-se aprendendo a receber e a dar o que se recebeu.' },
    ],
    [
      { id: 'agradecer', texto: 'Aceitar cada colherada com gratidão, e agradecer a quem não deu nada.', teste: { stat: ['car', 'dao'], dif: 0 },
        sucesso: { texto: 'Ao pôr do sol, a tigela está cheia de coisas estranhas: arroz, uma maçã, um botão, uma moeda furada. Você divide tudo com quem encontra pelo caminho, e volta com a tigela vazia de novo, e com o peito cheio. É a vitória mais silenciosa que já teve.', fx: { rec: 3, xp: 12, karma: 5, perfil: { compaixao: 3, devocao: 2 } } },
        falha: { texto: 'A maioria das portas se fecha, e você volta com meia tigela e a cara de quem aprendeu a ser rejeitado. Compreende, aos poucos, que quem pede de verdade não pede com esperança, e sim com abertura.', fx: { rec: 1, karma: 2, perfil: { devocao: 1 } } } },
      { id: 'dar', texto: 'Dar primeiro: encontrar alguém com fome e entregar a tigela antes de pedir qualquer coisa.',
        res: { texto: 'A criança come sem olhar, e a mãe, atrás, olha para você sem saber o que dizer. Você volta de mãos vazias, e o mestre pergunta se foi a lição ou a tigela que ficou. "Os dois", você responde, e ele sorri. Há respostas que valem a viagem.', fx: { rec: 3, karma: 6, perfil: { compaixao: 3, devocao: 2 } } } },
      { id: 'voltar', texto: 'Voltar cedo, com a tigela vazia, dizendo que ninguém quis dar.',
        res: { texto: 'A tigela vazia não é crime, mas também não é mérito. O mestre não pergunta nada. Você sente, na ausência da pergunta, a maior das perguntas.', fx: { rec: 1, karma: -1, perfil: { cautela: 1 } } } },
    ]),
  trilha('tr_budista_silencio', 'O Voto de Silêncio', 'budista', 'personagem', ['ascensao', 'crise'],
    'Um mosteiro vizinho propõe um desafio: sete dias de silêncio absoluto, sem uma palavra, sem um gesto de comunicação. É a maneira deles de medir o quanto de si sobra quando as palavras acabam. Quem completa ganha um nome novo, e quem quebra o silêncio pode partir sem vergonha. A maioria quebra. Alguns, dizem, saem do silêncio diferentes.',
    [
      { id: 'cumprir', texto: 'Cumprir os sete dias de silêncio, sem uma única palavra.', teste: { stat: ['dao', 'esp'], dif: 1 },
        sucesso: { texto: 'No terceiro dia, as vozes da cabeça gritam. No quinto, sussurram. No sétimo, quando acabaram, você descobre que o silêncio não era a ausência delas, e sim o lugar onde se encontravam. Você sai com um nome novo e uma maneira nova de ouvir.', fx: { rec: 3, xp: 20, karma: 3, stats: { dao: 1 }, perfil: { disciplina: 2, devocao: 2 } } },
        falha: { texto: 'No quarto dia, uma palavra escapa, sem querer: um nome, o de alguém que você tentava esquecer. O abade apenas assente, e aponta a porta com a mão aberta. Você parte, e o nome continua falando por dentro.', fx: { rec: 1, karma: 1, perfil: { devocao: 1 } } } },
      { id: 'parcial', texto: 'Fazer três dias e meditar sobre o que ficou.',
        res: { texto: 'Três dias bastam para ouvir a primeira camada, e é só nela que você consegue acreditar. O abade não censura, e você agradece com uma reverência que vale mais do que a conclusão que não houve.', fx: { rec: 2, xp: 8, karma: 1, perfil: { disciplina: 1 } } } },
      { id: 'recusar', texto: 'Recusar o desafio: o silêncio não é o seu caminho.',
        res: { texto: 'O abade agradece a franqueza. "Poucos dizem isso", comenta. Você parte com a sensação de ter feito uma escolha que o mosteiro respeitaria, e uma outra, mais pessoal, de ter evitado uma pergunta.', fx: { rec: 1, perfil: { cautela: 1, ambicao: 1 } } } },
    ]),

  /* ---------- Venenos ---------- */
  trilha('tr_venenos_xicara', 'A Xícara ao Contrário', 'venenos', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} oferece duas xícaras e pergunta qual contém o veneno. Você escolhe, pensa, escolhe de novo. As duas contêm. "A pergunta nunca era essa", diz {mestre.ele}, e bebe de uma, com tranquilidade. "Era se você sabia o que fazer depois."' },
      { texto: 'Num mercado de ervas, uma velha oferece duas xícaras e pergunta qual contém o veneno. Você escolhe, pensa, escolhe de novo. As duas contêm. "A pergunta nunca era essa", diz ela, e bebe de uma sem pestanejar. "Era se você sabia o que fazer depois."' },
    ],
    [
      { id: 'antidoto', texto: 'Beber, e preparar o antídoto com o que tem na bolsa, antes que o efeito chegue.', teste: { stat: ['comp', 'fis'], dif: 1, tag: 'veneno' },
        sucesso: { texto: 'A garganta queima, a visão estreita, e você mistura três pós numa colher sem olhar. Depois de um minuto longo, o mundo volta. Quem estava vendo prende o fôlego, e depois ri. "Tem sangue frio", diz. Não é elogio; é um diagnóstico.', fx: { rec: 3, xp: 18, stats: { comp: 1 }, perfil: { astucia: 2, disciplina: 1 } } },
        falha: { texto: 'O antídoto sai pela metade, e o veneno, pelo corpo inteiro. Você passa dois dias de cama, com o mundo girando, e uma única conclusão clara: nunca mais beber sem saber o que fazer depois.', fx: { rec: 1, ferida: 3, perfil: { cautela: 1 } } } },
      { id: 'recusar', texto: 'Recusar as duas: quem testa assim está testando a vaidade, não a competência.',
        res: { texto: 'A velha ri, sem malícia. "Resposta certa", diz, e guarda as xícaras. Aprender a não beber é uma lição que os venenos ensinam depressa, e a única que sobrevive à repetição.', fx: { rec: 2, xp: 10, perfil: { cautela: 2, astucia: 1 } } } },
      { id: 'trocar', texto: 'Trocar as xícaras sem que ela perceba, e ver quem bebe.', teste: { stat: ['sor', 'comp'], dif: 1, tag: 'veneno' },
        sucesso: { texto: 'A troca passa despercebida, e quando a velha bebe, a xícara que escolhe é, de fato, a que continha um sonífero leve. Ela dorme com a cabeça sobre a mesa e o sorriso de quem foi vencida por quem merecia. Uma lição vale mais do que um orgulho.', fx: { rec: 3, xp: 12, perfil: { astucia: 2, ambicao: 1 } } },
        falha: { texto: 'Ela vê a troca, e não diz nada. Bebe a xícara errada, sorri, e deixa uma frase no ar: "Eu também fui jovem." Você sai com o rosto quente e a certeza de ter sido lido como um livro aberto.', fx: { rec: 1, perfil: { ambicao: 1 } } } },
    ]),
  trilha('tr_venenos_antidoto', 'O Antídoto Que Faltava', 'venenos', 'personagem', ['ascensao', 'crise'],
    'Uma vila inteira adoece de uma doença que não é doença: um veneno lento, posto no poço por quem não se sabe. O curandeiro local não conhece a substância. Mas você, que estuda venenos, reconhece o cheiro do que sobrou no fundo de um balde: uma planta de montanha, rara, cuja cura é ainda mais rara. Quem a jogou sabia o que fazia. Quem a procura, agora, tem pouco tempo.',
    [
      { id: 'cura', texto: 'Ir à montanha buscar o ingrediente do antídoto, e preparar a cura.', teste: { stat: ['comp', 'sor'], dif: 1, tag: 'veneno' },
        sucesso: { texto: 'Três noites de subida, uma raiz retirada sem tocar o solo, e uma panela fumegando na praça. Os doentes bebem, um a um, e a cor volta aos rostos. O curandeiro olha você de lado e anota a receita. Você sabe, sem dizer, que nem toda lição vem de um mestre.', fx: { rec: 3, xp: 22, fama: 3, karma: 5, perfil: { compaixao: 3, astucia: 1 } } },
        falha: { texto: 'A raiz não é a certa, ou o preparo falha. Dois idosos morrem, o resto se recupera por conta própria, e você sai da vila sem agradecimento e com um peso novo sobre os ombros. Há estudos que não perdoam um erro de grau.', fx: { rec: 1, karma: 1, ferida: 1, perfil: { compaixao: 1 } } } },
      { id: 'culpado', texto: 'Investigar quem pôs o veneno no poço, e fazê-lo pagar.', teste: { stat: ['comp', 'car'], dif: 1 },
        sucesso: { texto: 'A pista é um frasco, e o frasco leva a uma loja de ervas que vende para todo mundo. O dono confessa, tremendo: foi encomenda de um comerciante que quis comprar as terras baratas. O comerciante é denunciado, e as terras, devolvidas. Justiça, às vezes, também precisa de química.', fx: { rec: 2, xp: 14, fama: 2, karma: 4, perfil: { astucia: 2, disciplina: 1 } } },
        falha: { texto: 'O rastro esfria, e quem sabia desaparece. A vila segue doente, e você segue sem respostas. Algumas culpas não têm rosto, e a pergunta, quando não responde, vira dor.', fx: { rec: 1, perfil: { astucia: 1 } } } },
      { id: 'ensinar', texto: 'Ensinar ao curandeiro a reconhecer o veneno, e deixar que ele cuide dos seus.',
        res: { texto: 'Uma tarde inteira de explicação paciente, e o curandeiro anota tudo em folhas soltas. Você parte sem dar a cura, e deixa uma capacidade. Quem aprende a reconhecer o veneno nunca mais morre da mesma coisa.', fx: { rec: 2, xp: 8, karma: 4, perfil: { compaixao: 2, disciplina: 1 } } } },
    ]),

  /* ---------- Bestas ---------- */
  trilha('tr_bestas_filhote', 'O Filhote Ferido', 'bestas', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} aponta um filhote de fera espiritual preso numa armadilha, com a pata ferida, que rosna sem convicção. "Se o ajudar, {=ele} vai lembrar", diz {mestre.ele}. "Se o matar, a mãe vai lembrar. Se deixar, a floresta vai lembrar. Todo mundo lembra, aqui. Decida o que prefere ser lembrad{jogador.o} por."' },
      { texto: 'Na floresta, um filhote de fera espiritual está preso numa armadilha, com a pata ferida, rosnando sem convicção. Em algum lugar, perto, a mãe vigia. Todos que passam por aqui sabem que a floresta lembra, e que cada escolha ressoa por anos.' },
    ],
    [
      { id: 'libertar', texto: 'Libertar o filhote, tratar a ferida e deixá-lo ir.', teste: { stat: ['comp', 'sor'], dif: 0, tag: 'qi' },
        sucesso: { texto: 'A pata sara depressa, e o filhote, ao partir, volta uma vez, só uma, para olhar. Um tempo depois, uma sombra grande observa você de uma colina e não se aproxima. Entre vocês, nasceu um respeito que nenhum contrato faria.', fx: { rec: 3, xp: 14, karma: 3, perfil: { compaixao: 2 } } },
        falha: { texto: 'O filhote morde, a mãe ruge ao longe, e você sai correndo com a mão ensanguentada. A pata sarou, mas a confiança não: há criaturas que só aprendem a amar quando já sabem odiar.', fx: { rec: 1, ferida: 2, perfil: { cautela: 1 } } } },
      { id: 'vincular', texto: 'Cuidar do filhote por semanas, até ele escolher ficar.', teste: { stat: ['car', 'esp'], dif: 1, tag: 'qi' },
        sucesso: { texto: 'Na quinta semana, o filhote deixa de rosnar. Na sexta, dorme encostado em você. Na sétima, o vínculo se forma, com um calor discreto no peito. Daí em diante, a floresta ganha dois olhos a mais, e você, um parceiro.', fx: { rec: 4, xp: 18, karma: 2, perfil: { compaixao: 2, devocao: 1 } } },
        falha: { texto: 'O filhote some numa noite de chuva, levando consigo a comida e um pedaço do seu orgulho. Algumas criaturas não aceitam ser domesticadas, e algumas lições não aceitam ser ensinadas.', fx: { rec: 1, perfil: { cautela: 1 } } } },
      { id: 'deixar', texto: 'Seguir adiante: a natureza resolve suas próprias feridas.',
        res: { texto: 'Você segue, e o rosnado vai diminuindo atrás. Não se sabe o que aconteceu com o filhote. Uma pergunta assim, deixada na estrada, pesa menos do que uma resposta ruim, e mais do que uma resposta nenhuma.', fx: { rec: 1, karma: -1, perfil: { cautela: 1 } } } },
    ]),
  trilha('tr_bestas_matilha', 'A Matilha Que Respeita', 'bestas', 'personagem', ['ascensao', 'crise'],
    'Uma matilha de lobos espirituais ronda a aldeia onde você está. O alfa, cinza, de olhos amarelos, para a distância de um tiro de arco e observa. Não ataca. Os aldeões pedem que você os afaste, mas o lobo não parece hostil: parece interessado, como quem avalia um candidato. Pelo andar da matilha, ninguém esperava alguém como você.',
    [
      { id: 'encarar', texto: 'Caminhar até o alfa, sem armas, e sustentar o olhar dele.', teste: { stat: ['esp', 'dao'], dif: 1, tag: 'qi' },
        sucesso: { texto: 'O alfa deixa você chegar a três passos. Rosna, uma vez, curto. Depois baixa a cabeça. A matilha, atrás, faz o mesmo, e uma a uma, as criaturas se afastam. Entre vocês, não nasceu amizade, e sim um acordo: respeito sem cobrança. A aldeia fica em paz.', fx: { rec: 3, xp: 18, fama: 2, perfil: { disciplina: 1, compaixao: 1 } } },
        falha: { texto: 'O alfa avança, e você recua, e a matilha cerca, devagar. Quem salva você é um velho caçador, com uma tocha e um grito rouco. Passam-se dias até você perder o gosto de medo na boca, e semanas para voltar a andar sozinh{jogador.o} no mato.', fx: { rec: 1, ferida: 3, perfil: { cautela: 2 } } } },
      { id: 'oferenda', texto: 'Deixar uma oferenda de carne e recuar.',
        res: { texto: 'A carne desaparece durante a noite, e o alfa deixa, em troca, uma garra fina na soleira. Uma negociação silenciosa, sem testemunhas. A aldeia dorme melhor, e você, com uma garra no pescoço, sente que algo foi aceito.', fx: { rec: 2, xp: 10, perfil: { astucia: 1, compaixao: 1 } } } },
      { id: 'afastar', texto: 'Afastar a matilha com um estrondo de qi, como pedem os aldeões.', teste: { stat: ['esp', 'fis'], dif: 0, tag: 'qi' },
        sucesso: { texto: 'O estrondo ecoa, e a matilha se dispersa, ofendida. A aldeia comemora. Você, não: o alfa, ao partir, olhou para trás como quem não esquece. A paz comprada com o susto é a mais barata, e a mais curta.', fx: { rec: 1, xp: 8, fama: 1, perfil: { violencia: 1 } } },
        falha: { texto: 'O estrondo falha, e a matilha, irritada, derruba o cercado da aldeia antes de partir. Os aldeões olham para você sem dizer nada, e o silêncio vale por todas as censuras.', fx: { rec: 0, karma: -2, perfil: { violencia: 1 } } } },
    ]),

  /* ---------- Sangue (demoníaca) ---------- */
  trilha('tr_demoniaca_preco', 'O Preço do Sangue', 'demoniaca', 'preparo', ['entrada', 'ascensao'],
    [
      { se: { papel: { mestre: { vivo: true } } }, texto: '{mestre.nome} abre uma caixa de madeira escura, e dentro há um punhal, uma tigela e uma pele de cabra. "O primeiro ritual cobra o primeiro sangue", diz. "Não o seu. Ainda." Há uma gaiola num canto, com uma ave de plumagem pálida. O silêncio que se segue pesa mais do que qualquer ordem.' },
      { texto: 'Numa sala sem janelas, há uma tigela, um punhal e uma gaiola. Dentro da gaiola, uma ave de plumagem pálida olha para você com olhos que parecem entender. O caminho do sangue cobra em sangue, e a primeira cobrança é pequena, para que as outras pareçam proporcionais.' },
    ],
    [
      { id: 'cumprir', texto: 'Cumprir o ritual: o poder cobra, e eu pago.', teste: { stat: ['esp', 'fis'], dif: 0 },
        sucesso: { texto: 'O sangue da ave desce na tigela, escuro, quase vivo. O Qi sobe do chão e se enrola no seu pulso como uma serpente morna. Você sente a força, e sente, junto, um peso novo na consciência que ninguém avisou que viria. O primeiro passo é sempre o mais fácil, e o mais caro, no longo prazo.', fx: { rec: 3, xp: 22, corr: 8, karma: -3, stats: { fis: 1 }, perfil: { violencia: 2, ambicao: 2 } } },
        falha: { texto: 'A ave escapa no último instante, e o ritual desanda. A tigela tomba, o sangue derrama, e o mestre apenas olha: "Hoje não". Você sai com a sensação de ter sido poupado de algo, e com a incômoda impressão de que quem foi poupado foi a ave.', fx: { rec: 1, corr: 3, perfil: { cautela: 1 } } } },
      { id: 'poupar', texto: 'Soltar a ave e oferecer o próprio sangue, em quantidade menor.', teste: { stat: ['fis', 'dao'], dif: 1 },
        sucesso: { texto: 'O corte é pequeno, a dor, honesta. O Qi responde, mais devagar, e com um brilho que não é todo escuro. O mestre ergue uma sobrancelha: "Poucos pagam com o que têm." Fica a impressão de que o caminho do sangue admite mais de uma doutrina.', fx: { rec: 3, xp: 14, corr: 3, karma: 1, perfil: { disciplina: 1, compaixao: 1 } } },
        falha: { texto: 'O corte vai fundo demais, e o desmaio vem rápido. Você acorda com o braço enfaixado e o mestre dizendo, sem raiva: "Aprenda a medir o que oferece." É um conselho melhor para a vida do que para o ritual.', fx: { rec: 1, ferida: 3, corr: 2, perfil: { disciplina: 1 } } } },
      { id: 'recusar', texto: 'Recusar: este caminho não precisa de gaiolas.',
        res: { texto: 'O mestre fecha a caixa sem comentar. Não há ameaça, nem desprezo. Há apenas uma observação, calma: "Quem recusa a gaiola, um dia, recusa o resto." É verdade, e você sabe, e ainda assim não muda de lado.', fx: { rec: 1, corr: -2, karma: 3, perfil: { compaixao: 2, disciplina: 1 } } } },
    ]),
  trilha('tr_demoniaca_divida', 'A Dívida de Quem Foi Sacrificado', 'demoniaca', 'personagem', ['ascensao', 'crise'],
    'Uma mulher de olhos fundos espera por você na estrada, e pergunta, sem preâmbulo: "O senhor era o que estava no ritual da colina, há sete anos." Você não se lembra, ou não quer. Ela carrega um menino pela mão, e o menino olha para você com um rosto que você já viu em sonhos. "O pai dele estava lá. Quero saber como foi."',
    [
      { id: 'contar', texto: 'Contar a verdade, inteira, como foi, sem enfeite.', teste: { stat: ['car', 'dao'], dif: 1 },
        sucesso: { texto: 'A mulher escuta sem interromper, e o menino, ao lado, olha para o chão. Quando você termina, ela agradece, com uma polidez de gelo, e vai embora. Uma semana depois, chega uma carta anônima: "Não vamos buscar vingança. Isso é só para que você saiba que sabe." É pior, e melhor, que qualquer ameaça.', fx: { rec: 2, xp: 12, karma: 4, corr: -4, perfil: { disciplina: 1, compaixao: 2 } } },
        falha: { texto: 'A frase sai torta, e a mulher a escuta como quem escuta uma confissão e uma ofensa ao mesmo tempo. Vai embora em silêncio, com o menino. Sobra a sensação de ter tentado, e ter falhado no que mais importava.', fx: { rec: 1, corr: 2, perfil: { compaixao: 1 } } } },
      { id: 'negar', texto: 'Negar tudo: você nunca esteve naquela colina.',
        res: { texto: 'A mulher olha por muito tempo, e assente, como quem recebe uma resposta que já esperava. Vai embora sem raiva, o que é pior. O menino olha para trás duas vezes. Há mentiras que cobram juros diários, e esta, você sabe, será paga em lembranças.', fx: { rec: 1, corr: 5, karma: -4, perfil: { cautela: 1, ganancia: 1 } } } },
      { id: 'reparar', texto: 'Oferecer reparação: um lugar, dinheiro, o que o menino precisar.', custo: 200,
        res: { texto: 'A mulher hesita, e depois aceita, com uma gratidão mais amarga do que doce. O menino cresce, e anos depois, num mercado, alguém o descreve a você como "o aluno mais atento do orfanato". Algumas dívidas não se pagam, mas se honram, e isso muda de peso.', fx: { rec: 2, xp: 10, karma: 5, corr: -6, perfil: { compaixao: 2, devocao: 1 } } } },
    ]),
];
