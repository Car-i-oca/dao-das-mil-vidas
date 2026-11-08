import { molde, type Molde } from '../../../../../engine/v2/tipos';

/**
 * Abertura do Xianxia: "O Sino Sem Badalo". Aos seis anos a vida começa com um objeto que não deveria existir,
 * e o que se faz com ele volta aos doze (o eco) e, bem mais tarde, perto do fim (o último toque).
 * É o equivalente, no Xianxia, do livro sob a ponte do Murim: uma escolha pequena que a vida inteira lembra.
 * Flags: sino_guardado, sino_entregue, sino_tocou, sino_vendido (aos 6) → sino_devolvido, sino_segredo, monge_amigo,
 * ouviu_chamado, sino_ignorado, sino_recuperado, sino_perdido, sino_esquecido (aos 12) → lidas por `abertura_sino_fim`
 * e pelo resumo da vida (marcas_vida).
 */
const ALGUM_SINO = [
  { jogador: { flag: ['sino_guardado'] } },
  { jogador: { flag: ['sino_entregue'] } },
  { jogador: { flag: ['sino_tocou'] } },
  { jogador: { flag: ['sino_vendido'] } },
];
const DESFECHOS = ['sino_devolvido', 'sino_segredo', 'monge_amigo', 'ouviu_chamado', 'sino_ignorado', 'sino_recuperado', 'sino_perdido', 'sino_esquecido'];

export const ABERTURA: Molde[] = [
  molde({
    id: 'abertura_sino',
    titulo: 'O Sino Sem Badalo',
    tipo: 'personagem',
    capitulos: ['infancia'],
    unico: true,
    cenario: 'vilarejo',
    quando: { jogador: { idadeMin: 6, idadeMax: 9 }, nao: { jogador: { flag: ['sino_visto'] } } },
    relevancia: [{ se: { jogador: { idadeMin: 6 } }, mais: 400 }],
    cena: [
      { tom: 'lirico', texto: 'A cheia do rio baixa numa noite só, e de manhã a margem amanhece cheia de coisas que a água devolveu: um sapato, uma panela, um pedaço de telhado. Entre as pedras, meio afundado na lama, há um sino de bronze do tamanho de uma cabaça. Não tem badalo, nem corda, nem dono. Os outros meninos dizem que sino sem badalo só toca para quem deve algo ao céu. Você é o primeiro a chegar até ele.' },
    ],
    opcoes: [
      {
        id: 'esconder', texto: 'Arrastar o sino para casa e escondê-lo debaixo do assoalho, sem contar a ninguém.',
        res: {
          texto: 'Você o limpa com a barra da roupa até o bronze aparecer, verde e antigo, e o enfia no vão seco sob a cama. À noite, deitado, o assoalho parece respirar. Ninguém ouviu nada, e é justamente isso que você passa a vida guardando.',
          efeitos: [{ inclinar: ['proteger', 1] }, { q: ['sino', 1] }],
          fx: { setFlags: ['sino_visto', 'sino_guardado'], stats: { sor: 1 }, perfil: { cautela: 1 } },
        },
      },
      {
        id: 'entregar', texto: 'Levar o sino ao monge do pequeno templo da beira do rio.',
        res: {
          texto: 'O monge não pergunta onde você achou. Segura o bronze com as duas mãos, demora a falar e depois diz só: "Quem entrega o que não é seu aprende, cedo, que a conta do céu também se paga em silêncio." Ele pendura o sino numa viga, sem corda, e deixa que o vento decida.',
          efeitos: [{ inclinar: ['servir', 1] }, { q: ['sino', 2] }],
          fx: { setFlags: ['sino_visto', 'sino_entregue'], karma: 2, perfil: { devocao: 1 } },
        },
      },
      {
        id: 'tocar', texto: 'Bater no sino com uma pedra, só para ouvir o que ele tem a dizer.',
        res: {
          texto: 'O som não sai pelo ar: sai pelos seus ossos. O rio inteiro para por um instante, as crianças ao longe se viram ao mesmo tempo e você sente um calor fino no meio do peito, como se uma porta pequena tivesse sido aberta para dentro. Você larga a pedra. Não é medo; é outra coisa, que ainda não tem nome.',
          efeitos: [{ inclinar: ['ascender', 2] }, { q: ['sino', 3] }],
          fx: { setFlags: ['sino_visto', 'sino_tocou'], stats: { esp: 1 }, perfil: { ambicao: 1 } },
        },
      },
      {
        id: 'vender', texto: 'Vender o bronze ao mascate que passa pela estrada de manhã.',
        res: {
          texto: 'O mascate pesa o sino na mão, finge desinteresse e paga menos do que vale, mas mais do que você já viu junto. Você volta para casa com o peso das moedas e a leveza esquisita de quem se livrou de algo. Atrás de você, no carroção, o bronze bate uma única vez contra a madeira.',
          efeitos: [{ inclinar: ['dominar', 1] }, { q: ['sino', 1] }],
          fx: { setFlags: ['sino_visto', 'sino_vendido'], pedras: 12, perfil: { ganancia: 1 } },
        },
      },
    ],
  }),

  molde({
    id: 'abertura_sino_eco',
    titulo: 'O Eco do Sino',
    tipo: 'virada',
    capitulos: ['infancia', 'despertar', 'entrada'],
    unico: true,
    cenario: 'vilarejo',
    quando: { jogador: { idadeMin: 12, idadeMax: 20 }, algum: ALGUM_SINO, nao: { jogador: { flag: DESFECHOS } } },
    relevancia: [{ se: { jogador: { idadeMin: 12 } }, mais: 180 }],
    cena: [
      { se: { jogador: { flag: ['sino_guardado'] } }, tom: 'sombrio', texto: 'Numa noite sem lua, o sino debaixo do assoalho começa a vibrar sozinho, um zumbido baixo que faz a água da caneca tremer. Quando você levanta a tábua, o bronze está quente. Lá fora, alguém bate de leve na porta, duas vezes, devagar, como quem sabe que a casa está acordada.' },
      { se: { jogador: { flag: ['sino_entregue'] } }, tom: 'grave', texto: 'O monge do templo da beira do rio mandou chamar você. O sino continua na viga, sem corda, e agora, sempre que o vento vem do rio, ele soa o nome de alguém da vila antes de essa pessoa adoecer. O monge pergunta, sem rodeios, se você sabe por que ele só tocou o seu nome uma vez, e nunca mais.' },
      { se: { jogador: { flag: ['sino_tocou'] } }, tom: 'lirico', texto: 'Desde o dia em que você bateu naquele sino, o mundo tem uma costura a mais. Ouve a água dentro da pedra, o cansaço dentro de quem passa, e à noite um tom grave que ninguém mais ouve e que parece vir de muito longe, de uma direção que o seu corpo, sozinho, aprendeu a apontar.' },
      { se: { jogador: { flag: ['sino_vendido'] } }, tom: 'ironico', texto: 'Numa feira de cidade grande, entre barracas de talismãs e incenso, você reconhece um sino de bronze verde pendurado à entrada de um pavilhão elegante. Tem agora uma corda de seda e um letreiro. O dono jura que é relíquia de família. O bronze, quando você passa, bate uma única vez, sem que ninguém o toque.' },
      { texto: 'Algo que você achou um dia voltou a bater à porta da sua vida.' },
    ],
    opcoes: [
      {
        id: 'devolver', texto: 'Devolver o sino ao rio na mesma noite, antes que a pessoa na porta entre.', requer: { jogador: { flag: ['sino_guardado'] } },
        res: {
          texto: 'Você corre até a margem com o bronze quente apertado ao peito e o lança na correnteza. O som que sobe da água não é de afogamento: é de alívio. Quem batia à porta já não está lá. Em casa, o assoalho volta a ser só assoalho, e você, por um tempo, não sabe se ganhou ou perdeu.',
          efeitos: [{ inclinar: ['redimir', 1] }, { q: ['sino', 1] }],
          fx: { setFlags: ['sino_devolvido'], clearFlags: ['sino_guardado'], karma: 2, stats: { dao: 1 }, perfil: { devocao: 1 } },
        },
      },
      {
        id: 'abrir', texto: 'Abrir a porta e ouvir o que a visita veio dizer sobre o sino.', requer: { jogador: { flag: ['sino_guardado'], defeitoNao: ['covarde'] } },
        seloBloqueio: 'Coração Covarde: a mão não alcança o trinco',
        res: {
          texto: 'É uma velha de olhos brancos, com uma corda enrolada no pulso. Diz que o sino é de uma linhagem que perdeu seu último guardião e que, quem o esconde por tempo demais, passa a ser o guardião sem ser perguntado. Ela não o leva. Deixa uma única instrução: "Quando ele esquentar de novo, é porque alguém precisa ser ouvido."',
          efeitos: [{ inclinar: ['proteger', 2] }, { q: ['sino', 3] }],
          fx: { setFlags: ['sino_segredo'], stats: { esp: 1 }, perfil: { disciplina: 1 } },
        },
      },
      {
        id: 'visitar', texto: 'Ir ao templo, sentar com o monge e contar tudo o que você sente quando o sino toca.', requer: { jogador: { flag: ['sino_entregue'] } },
        res: {
          texto: 'O monge ouve até o chá esfriar. Depois abre uma gaveta com um caderno de nomes escritos por décadas e escreve o seu na última linha, ao lado de uma data que ainda não chegou. "Eu guardo o sino. Você aprende com ele. Um dia a gente troca." Você sai do templo com um aliado e uma tarefa sem prazo.',
          efeitos: [{ inclinar: ['servir', 2] }, { q: ['sino', 4] }],
          fx: { setFlags: ['monge_amigo'], karma: 2, stats: { dao: 1 }, perfil: { devocao: 2 } },
        },
      },
      {
        id: 'esquecer_templo', texto: 'Dizer ao monge que foi só um menino achando um objeto, e voltar para casa sem olhar para trás.', requer: { jogador: { flag: ['sino_entregue'] } },
        res: {
          texto: 'O monge assente, sem insistir. Na saída, o vento sopra do rio e o sino, na viga, não soa. Você leva essa ausência como se levasse uma pedrinha no sapato: não machuca, mas você sabe que ela está lá, e que bastava ter parado para tirá-la.',
          efeitos: [{ q: ['sino', -1] }],
          fx: { setFlags: ['sino_esquecido'], perfil: { cautela: 1 } },
        },
      },
      {
        id: 'seguir_som', texto: 'Seguir o tom grave que só você ouve, deixando o corpo apontar o caminho.', requer: { jogador: { flag: ['sino_tocou'] } },
        res: {
          texto: 'Três noites de caminhada depois, o tom para diante de um barranco coberto de samambaias. Não há nada ali, a não ser uma pedra lisa onde cabe a palma da sua mão. Você a encosta e sente o mesmo calor fino do dia em que tocou o sino, agora firme, como uma chama que aprendeu a ficar acesa. O chamado tem um endereço, e você ainda não sabe de quem.',
          efeitos: [{ inclinar: ['ascender', 3] }, { q: ['sino', 4] }],
          fx: { setFlags: ['ouviu_chamado'], stats: { esp: 1, dao: 1 }, perfil: { disciplina: 1, ambicao: 1 } },
        },
      },
      {
        id: 'tapar_ouvidos', texto: 'Tapar os ouvidos, ocupar as noites e fingir que o som nunca existiu.', requer: { jogador: { flag: ['sino_tocou'] } },
        res: {
          texto: 'Você enche os dias de trabalho e as noites de cansaço, e o tom, aos poucos, recua. Fica uma sensação de que alguém, em algum lugar, desistiu de esperar por uma resposta. Você não sente culpa; sente a falta de uma coisa que nunca chegou a ter.',
          efeitos: [{ q: ['sino', -1] }],
          fx: { setFlags: ['sino_ignorado'], stats: { fis: 1 }, perfil: { cautela: 1 } },
        },
      },
      {
        id: 'recuperar', texto: 'Propor ao dono do pavilhão comprar o sino de volta, mesmo pagando o dobro.', requer: { jogador: { flag: ['sino_vendido'] } },
        teste: { stat: ['car', 'sor'], dif: 1 },
        sucesso: {
          texto: 'O dono regateia por educação e cede por cansaço: o sino sempre bate de noite e espanta os hóspedes. Você leva o bronze de volta embrulhado num pano, e ele, nas suas mãos, fica em silêncio, como um bicho que reconhece o cheiro. Dessa vez ninguém lhe paga nada por isso, e é a primeira vez que a conta fecha.',
          efeitos: [{ inclinar: ['redimir', 1] }, { q: ['sino', 3] }],
          fx: { setFlags: ['sino_recuperado'], clearFlags: ['sino_vendido'], pedras: -20, karma: 1, perfil: { astucia: 1 } },
        },
        falha: {
          texto: 'O dono sorri e fecha a mão sobre o sino. Diz que relíquia não se vende, só se empresta ao dono certo, e que o dono certo ainda não nasceu. Você sai com o bolso mais leve e a certeza de que aquele sino, agora, tem uma história em que você é só o menino que o vendeu.',
          efeitos: [{ q: ['sino', -1] }],
          fx: { setFlags: ['sino_perdido'], clearFlags: ['sino_vendido'], pedras: -8, perfil: { ganancia: 1 } },
        },
      },
      {
        id: 'deixar_pavilhao', texto: 'Deixar o sino onde está: o que se vende uma vez não se compra de volta.', requer: { jogador: { flag: ['sino_vendido'] } },
        res: {
          texto: 'Você segue pela feira sem olhar para trás, e o sino bate uma segunda vez às suas costas, mais fraco. Anos depois, quando alguém falar de relíquias vendidas e de dívidas que não se pagam, você vai lembrar desse segundo toque.',
          efeitos: [{ q: ['sino', -1] }],
          fx: { setFlags: ['sino_esquecido'], perfil: { cautela: 1 } },
        },
      },
    ],
  }),

  molde({
    id: 'abertura_sino_fim',
    titulo: 'O Último Toque',
    tipo: 'consequencia',
    capitulos: ['legado', 'crise', 'ascensao'],
    unico: true,
    cenario: 'montanha',
    quando: { jogador: { idadeMin: 50, flag: ['sino_visto'] }, algum: [{ jogador: { flag: DESFECHOS } }] },
    relevancia: [{ se: { jogador: { idadeMin: 60 } }, mais: 220 }],
    cena: [
      { se: { jogador: { flag: ['sino_devolvido'] } }, tom: 'lirico', texto: 'Numa tarde de cheia, o rio sobe até a porta e devolve, na soleira, um sino de bronze verde, limpo, sem badalo. Você o reconhece pelo peso antes de reconhecê-lo pela forma. O rio, depois de tantos anos, resolveu perguntar se você ainda quer o que um dia largou.' },
      { se: { jogador: { flag: ['sino_segredo'] } }, tom: 'grave', texto: 'O sino debaixo do assoalho, que você nunca mais soube se era um fardo ou um posto, esquenta devagar ao longo do dia. À noite alguém bate à porta, duas vezes, como bateu a velha de olhos brancos décadas atrás. Desta vez, quem vem é jovem, e traz uma corda enrolada no pulso.' },
      { se: { jogador: { flag: ['monge_amigo'] } }, tom: 'grave', texto: 'O monge do templo da beira do rio já não consegue subir os degraus. Manda recado: a data escrita ao lado do seu nome, no caderno, chegou. Ele quer entregar o sino em mãos, e a pergunta que fica no recado é a mesma de quando você era menino: o que você faz com o que lhe entregam?' },
      { se: { jogador: { flag: ['ouviu_chamado'] } }, tom: 'lirico', texto: 'O tom grave que o conduziu pela vida inteira para, de repente, num dia comum. Não por ter chegado ao fim, mas por ter chegado ao lugar onde ele sempre apontou. No meio da sala, sem que ninguém o tenha trazido, há um sino de bronze verde, e ele toca, uma vez, bem baixo, o seu nome.' },
      { se: { jogador: { flag: ['sino_recuperado'] } }, tom: 'ironico', texto: 'O sino que você comprou de volta, e guardou numa gaveta, resolve tocar numa noite de visitas. Sozinho, sem corda, sem badalo, diante de gente educada que finge não ouvir. Você sorri: aquele bronze nunca foi de ninguém, e sempre soube escolher o pior momento para dizer a verdade.' },
      { texto: 'Em algum lugar da vila onde você nasceu, um sino de bronze sem badalo bate uma única vez. Ninguém o toca. Quem ouve se pergunta por um instante o que deve ao céu, e logo volta ao que estava fazendo.' },
    ],
    opcoes: [
      {
        id: 'aceitar', texto: 'Receber o último toque de pé, sem pressa, e dizer em voz alta o que você deve e o que cumpriu.',
        res: {
          texto: 'Você fala. Não é uma confissão nem uma prestação de contas: é um inventário curto, honesto e sem plateia. O sino ouve até o fim e soa uma vez, grave, e o som atravessa a casa, a vila, o rio. Algo que estava aberto desde os seis anos, enfim, fecha sem estrondo.',
          efeitos: [{ inclinar: ['redimir', 2] }, { noticia: 'Um sino sem badalo tocou na vila onde nasceu, e quem o ouviu jura que foi o seu nome.' }],
          fx: { setFlags: ['sino_encerrado'], karma: 4, fama: 3, stats: { dao: 2 }, perfil: { devocao: 2 } },
        },
      },
      {
        id: 'passar', texto: 'Entregar o sino a alguém mais novo, e ensinar-lhe só duas regras: não esconder e não vender.',
        requer: { algum: [{ jogador: { flag: ['sino_segredo'] } }, { jogador: { flag: ['monge_amigo'] } }, { jogador: { flag: ['sino_devolvido'] } }] },
        res: {
          texto: 'O jovem recebe o bronze como quem recebe um bicho assustado, com as duas mãos e sem fazer perguntas. Você diz as duas regras e nenhuma explicação. Ele vai embora sem saber que acaba de herdar uma vida inteira. Você fica olhando a estrada, de braços vazios, e leve.',
          efeitos: [{ inclinar: ['proteger', 2] }, { noticia: 'O sino sem badalo ganhou um novo guardião, e a vila só percebeu depois.' }],
          fx: { setFlags: ['sino_encerrado'], karma: 3, stats: { car: 1, dao: 1 }, perfil: { compaixao: 2 } },
        },
      },
      {
        id: 'tocar_de_novo', texto: 'Bater no sino uma última vez com a mesma pedra, só para ouvir o que ele tem a dizer agora.',
        res: {
          texto: 'O som é o mesmo de quando você tinha seis anos, e é completamente outro: agora você sabe de que tamanho é cada coisa que ele diz. O rio para, as crianças ao longe se viram, e você sente aquela porta pequena abrir, desta vez para fora. Não há resposta. Há, finalmente, a pergunta inteira.',
          efeitos: [{ inclinar: ['ascender', 1] }],
          fx: { setFlags: ['sino_encerrado'], stats: { esp: 2 }, perfil: { ambicao: 1, disciplina: 1 } },
        },
      },
      {
        id: 'deixar_tocar', texto: 'Deixar o sino tocar sozinho e continuar com o que estava fazendo.',
        res: {
          texto: 'Você termina o que fazia: a xícara, o remendo, a frase. O sino toca e para. Ninguém, em volta, nota nada. Mais tarde, quando a casa esfria, você entende que acabou de fazer a escolha mais comum e mais difícil: aceitar que algumas contas não se pagam nem se cobram, só se carregam.',
          efeitos: [{ q: ['sino', -1] }],
          fx: { setFlags: ['sino_encerrado'], stats: { dao: 1 }, perfil: { cautela: 2 } },
        },
      },
    ],
  }),
];
