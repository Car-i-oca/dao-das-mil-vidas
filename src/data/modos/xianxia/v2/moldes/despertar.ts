import { molde, type Molde } from '../../../../../engine/v2/tipos';

/**
 * O Despertar: quem mostra o caminho. A trilha oferecida é a da pessoa que aparece (um mestre da reserva do mundo),
 * então cada vida encontra um mestre diferente, e esse mestre passa a existir no mundo (opinião, memória, morte).
 */
const TRILHAS = ['sopro', 'espada', 'alquimia', 'corpo', 'alma', 'formacoes', 'budista', 'venenos', 'bestas'];
const intro = (trilha: string, texto: string) => ({ se: { papel: { mestre: { trilha: [trilha] } } }, texto });

export const DESPERTAR: Molde[] = [
  molde({
    id: 'desp_mestre_caminho', max: 2,
    titulo: 'Quem Mostra o Caminho',
    tipo: 'personagem',
    capitulos: ['despertar', 'entrada'],
    cooldown: 5,
    papeis: {
      mestre: { pessoa: { desconhecido: true, idadeDif: [18, 90], reinoMin: 2, trilha: TRILHAS } },
    },
    quando: { jogador: { semTrilha: true, reinoMin: 1 } },
    relevancia: [{ se: { jogador: { semTrilha: true } }, mais: 70 }],
    cena: [
      intro('sopro', 'Uma mulher de olhar sereno, que respira como se o ar lhe obedecesse, para diante de você na estrada. {mestre.nome} diz que o seu Qi está desordenado, e que "o sopro certo resolve metade dos problemas do mundo". Não pede nada em troca. Só espera.'),
      intro('espada', 'Um homem de capa surrada e espada sem bainha repara no jeito como você segura um graveto. {mestre.nome} não se apresenta. "A lâmina é uma pergunta", diz. "Você sabe qual?" Há uma cicatriz antiga na mão {mestre.dele}, e nenhuma pressa.'),
      intro('alquimia', 'Uma velha de dedos manchados e cheiro de ervas queimadas observa a sua mão tremer ao tocar uma folha. {mestre.nome} ri. "Cada erva cura ou mata, conforme a dose. Quer aprender o fogo?" {mestre.Ele} já está acendendo um braseiro na beira da estrada.'),
      intro('corpo', 'Um homem enorme, de ombros como portas, para a carroça para olhar você erguer um balde. {mestre.nome} cruza os braços. "Esse corpo pede forja", diz. "Você aguenta ouvir o que {mestre.ele} precisa?" A voz é baixa, e o olhar é de quem já quebrou muita pedra.'),
      intro('alma', 'Um velho de olhos fechados, guiado por uma criança, diz o seu nome antes de você abrir a boca. {mestre.nome} sorri. "O mar dentro de você é maior do que o de fora. Vem ouvir." A criança olha para você como quem pede desculpas pelo velho, e para o velho como quem pede paciência.'),
      intro('formacoes', 'Uma moça de tinta nos dedos desenha um círculo no chão com um pedaço de giz e pede que você o atravesse. Você tenta, e não consegue. {mestre.nome} sorri, sem maldade. "As linhas mandam em quem não as vê. Quer aprender a ver?"'),
      intro('budista', 'Um monge de sandálias gastas atravessa a mesma ponte que você, devagar, como se cada tábua merecesse atenção. {mestre.nome} para ao seu lado. "Há quem busque poder. Há quem busque mérito. Seu Qi já escolheu, e sua cabeça ainda está barulhenta."'),
      intro('venenos', 'Uma mulher de manto verde oferece a você uma xícara de chá e, antes de você beber, avisa: "Estou só testando se você pergunta o que tem dentro." {mestre.nome} espera, com os olhos pequenos de quem já viu gente morrer de curiosidade e de falta {mestre.dele}.'),
      intro('bestas', 'Um caçador de mãos grossas segura uma raposa espiritual ferida. {mestre.nome} resmunga: "{mestre.Ele} me olhou como se soubesse meu nome." Estende o bicho para você, hesitante. A fera o encara, e algo no Qi {mestre.dele} responde ao seu.'),
      { texto: 'Alguém de passagem repara em você, e algo no seu jeito de respirar chama a atenção de {mestre.nome}. Há pouca gente nas estradas com tanto a ensinar, e menos ainda disposta a perder tempo com um iniciante.' },
    ],
    opcoes: [
      {
        id: 'aceitar', texto: 'Aceitar {mestre.nome} como mestre e seguir o método {mestre.dele}.',
        res: {
          texto: '{mestre.nome} assente. "O primeiro passo é desaprender o que você acha que sabe." Você começa a aprender o método {mestre.dele} naquela mesma noite, e percebe, sem saber como, que a sua vida acabou de ganhar um centro.',
          efeitos: [{ opiniao: ['mestre', 25] }, { fato: ['mestre', 'aceitou_discipulo', 4] }, { trilhaDe: 'mestre' }, { papel: ['mestre', 'mestre'] }, { fio: ['mestre', 'abrir'] }, { inclinar: ['ascender_seita', 1] }],
          fx: { setFlags: ['trilha_mestre'], stats: { comp: 1 }, perfil: { disciplina: 1, devocao: 1 } },
        },
      },
      {
        id: 'tempo', texto: 'Pedir um tempo para pensar.',
        res: {
          texto: '"Pense", diz {mestre.nome}, "mas o mundo não espera tanto quanto você imagina." Segue pela estrada, sem olhar para trás. Você fica sabendo que existe um caminho, e que {mestre.ele} está andando em outra direção.',
          efeitos: [{ fato: ['mestre', 'pediu_tempo', 1] }, { q: ['adiou_mestre', 1] }],
          fx: { perfil: { cautela: 1 } },
        },
      },
      {
        id: 'recusar', texto: 'Dizer que vai aprender sozinh{jogador.o}.',
        res: {
          texto: '"Orgulho é a primeira coisa que o Dao cobra", diz {mestre.nome}, sem raiva, e se afasta. A estrada tem muita gente com vontade de ensinar, mas poucos esperam duas vezes.',
          efeitos: [{ opiniao: ['mestre', -10] }, { fato: ['mestre', 'foi_recusado', 3] }, { q: ['sozinho', 1] }],
          fx: { perfil: { ambicao: 1 }, stats: { dao: 1 } },
        },
      },
      {
        id: 'nome_do_cla', texto: 'Dizer o nome do clã, esperando que {mestre.ele} o reconheça.',
        requer: { jogador: { origem: ['cla_decadente'] } }, selo: 'Herdeiro de um Clã Decadente',
        res: {
          texto: '{mestre.nome} franze a testa. "Já ouvi esse nome", diz, devagar. "Não era um nome pequeno." Não explica mais, mas o olhar {mestre.dele} muda: já não é de quem avalia um iniciante, e sim de quem lembra de uma dívida alheia.',
          efeitos: [{ fato: ['mestre', 'conheceu_o_nome_do_cla', 3] }, { opiniao: ['mestre', 8] }, { inclinar: ['reerguer_cla', 1] }],
          fx: { perfil: { devocao: 1 } },
        },
      },
    ],
  }),

  // Caminho do Sangue: a trilha 'demoniaca' não existe na reserva de mestres, então quem ensina é alguém do culto
  // criado para a cena. Só aparece para quem já carrega corrupção, karma negativo, um histórico de violência ou nasceu na seita demoníaca.
  molde({
    id: 'desp_caminho_sangue',
    titulo: 'Quem Mostra o Caminho do Sangue',
    tipo: 'personagem',
    capitulos: ['despertar', 'entrada'],
    unico: true,
    papeis: {
      mestre: { pessoa: { novo: true, criar: { traco: ['ambicioso', 'cruel'], trilha: 'demoniaca', reino: 4, objetivo: 'subir', faccao: 'culto' } } },
    },
    quando: {
      jogador: { semTrilha: true, reinoMin: 1 },
      algum: [{ jogador: { corrMin: 10 } }, { jogador: { origem: ['filho_demonio'] } }, { jogador: { karmaMax: -4 } }, { jogador: { perfilMin: { violencia: 5 } } }],
    },
    relevancia: [{ se: { jogador: { origem: ['filho_demonio'] } }, mais: 80 }, { se: { jogador: { corrMin: 20 } }, mais: 60 }, { se: { jogador: { semTrilha: true } }, mais: 40 }],
    cena: [
      { se: { jogador: { origem: ['filho_demonio'] } }, texto: 'Na feira da vila, alguém de manto cor de vinho vende amuletos que ninguém compra. Quando você passa, {mestre.nome} vira a mão e mostra, tatuado na palma, o mesmo sinal que quem criou você trazia no pulso. Não há sorriso. "A seita não esquece os seus", diz. "Mesmo os que tentam esquecer a seita."' },
      { texto: 'Depois de uma noite em que o Qi ferveu sem motivo, você acorda com alguém sentado na beira da sua esteira. {mestre.nome} tem unhas escuras e voz de quem nunca precisou gritar. "Você sente o gosto de ferro quando respira fundo", diz {mestre.ele}. "Os mestres das estradas mandariam você purificar isso. Eu ensino a beber."' },
    ],
    opcoes: [
      {
        id: 'aceitar', texto: 'Aceitar o Caminho do Sangue como método.',
        res: {
          texto: '{mestre.nome} corta a própria palma e deixa três gotas caírem na sua língua. O Qi, que antes se debatia, se assenta como fera alimentada. "Cada degrau custa alguma coisa", avisa. "A diferença entre nós e os outros é que nós sabemos o preço."',
          efeitos: [{ opiniao: ['mestre', 25] }, { fato: ['mestre', 'aceitou_discipulo', 4] }, { trilhaDe: 'mestre' }, { papel: ['mestre', 'mestre'] }, { inclinar: ['superar_rival', 1] }],
          fx: { corr: 6, setFlags: ['trilha_mestre', 'trilha_sangue'], perfil: { ambicao: 2 } },
        },
      },
      {
        id: 'recusar', texto: 'Recusar e meditar até o gosto de ferro passar.', teste: { stat: ['esp', 'dao'], dif: 1 },
        sucesso: {
          texto: '{mestre.nome} dá de ombros e vai embora antes do amanhecer. Você passa três dias sentad{jogador.o}, respirando devagar, e o gosto de ferro some quase por inteiro. Fica só a lembrança de que alguém viu, em você, uma porta.',
          efeitos: [{ fato: ['mestre', 'foi_recusado', 3] }],
          fx: { corr: -4, perfil: { disciplina: 2 } },
        },
        falha: {
          texto: 'Você recusa, mas a recusa sai fraca. {mestre.nome} ri baixo, como quem guarda um troco para depois, e deixa sobre a esteira um pedaço de papel com um endereço. Você não joga fora.',
          efeitos: [{ fato: ['mestre', 'foi_recusado', 2] }, { opiniao: ['mestre', 5] }],
          fx: { corr: 3, perfil: { cautela: 1 } },
        },
      },
      {
        id: 'denunciar', texto: 'Denunciar {mestre.nome} aos guardas da seita mais próxima.',
        res: {
          texto: 'Os guardas chegam tarde, como sempre, mas chegam. {mestre.nome} escapa pelos telhados e, antes de sumir, olha para você uma única vez. Não é raiva. É paciência. Os anciãos anotam o seu nome com algum respeito.',
          efeitos: [{ opiniao: ['mestre', -40] }, { fato: ['mestre', 'foi_denunciado', 5] }, { situacao: ['mestre', 'foragido'] }],
          fx: { karma: 1, fama: 2, corr: -2, perfil: { disciplina: 1, compaixao: 1 } },
        },
      },
      {
        id: 'sinal', texto: 'Mostrar o sinal no pulso e pedir para aprender como igual, não como servo.',
        requer: { jogador: { origem: ['filho_demonio'] } }, selo: 'Rebento da Seita Demoníaca',
        res: {
          texto: '{mestre.nome} examina o sinal por muito tempo e, enfim, inclina a cabeça. "Igual, não. Mas também não servo." O método é o mesmo do sangue, ensinado sem as correntes que a seita põe nos de fora: você aprende a cobrar o preço de outros antes do seu.',
          efeitos: [{ opiniao: ['mestre', 15] }, { fato: ['mestre', 'aceitou_discipulo', 3] }, { trilhaDe: 'mestre' }, { papel: ['mestre', 'mestre'] }],
          fx: { corr: 2, setFlags: ['trilha_mestre', 'trilha_sangue', 'sangue_como_igual'], perfil: { ambicao: 1, cautela: 1 } },
        },
      },
    ],
  }),

  // Quem recusou mestre ("vou aprender sozinho") ou adiou duas vezes não fica preso para sempre no primeiro reino:
  // o método vem do próprio esforço, com um custo diferente do de quem teve mestre.
  molde({
    id: 'desp_metodo_proprio', max: 2,
    titulo: 'O Método Que Ninguém Ensinou',
    tipo: 'virada',
    capitulos: ['despertar', 'entrada', 'ascensao', 'crise'],
    cooldown: 4,
    papeis: {},
    quando: {
      jogador: { semTrilha: true, reinoMin: 1, idadeMin: 30 },
      algum: [{ q: { sozinho: [1, undefined] } }, { q: { adiou_mestre: [2, undefined] } }],
    },
    relevancia: [{ se: { jogador: { semTrilha: true, idadeMin: 40 } }, mais: 30 }],
    cena: [
      { se: { q: { sozinho: [1, undefined] } }, texto: 'Você disse que aprenderia sozinh{jogador.o}, e os anos cobraram a promessa. O Qi desperto continua girando sem rumo, como água num poço sem saída. Numa manhã fria, cansad{jogador.o} de esperar que alguém volte pela estrada, você decide abrir o caminho com as próprias mãos.' },
      { texto: 'Os convites passaram e você deixou todos para depois. Agora não há mais ninguém na estrada perguntando nada. O Qi desperto pesa no peito como uma ferramenta que você nunca aprendeu a segurar. Se ninguém vai ensinar, alguém precisa inventar o método.' },
    ],
    opcoes: [
      {
        id: 'corpo', texto: 'Forjar o corpo no trabalho pesado até o Qi aprender a seguir os músculos.', teste: { stat: ['fis', 'dao'], dif: 2 },
        falha: {
          texto: 'Você carrega pedra até as costas travarem. O Qi não desce para os ossos: fica preso no peito, quente e inútil. Passa uma estação inteira deitad{jogador.o}, e o método continua sem nome.',
          fx: { ferida: 2, stats: { fis: 1 }, perfil: { disciplina: 1 } },
        },
        sucesso: {
          texto: 'Pedra, lenha, água do rio morro acima. Durante meses o corpo reclama e o Qi não responde. Um dia, carregando um tronco, você sente a força descer por dentro dos ossos como se sempre tivesse estado ali. Doeu chegar. Não há mestre a quem agradecer, só calos.',
          fx: { trilha: 'corpo', ferida: 1, stats: { fis: 1 }, setFlags: ['metodo_proprio'], perfil: { disciplina: 2 } },
        },
      },
      {
        id: 'escutar', texto: 'Sentar-se toda noite e escutar o Qi até ele dizer o que quer.', teste: { stat: ['esp', 'dao'], dif: 1 },
        sucesso: {
          texto: 'Na quadragésima noite o barulho dentro da cabeça se aquieta, e o Qi, enfim, mostra o desenho que sempre fez: um mar parado, fundo, que responde à atenção. Você não aprendeu um método. Você o reconheceu.',
          fx: { trilha: 'alma', stats: { esp: 1 }, setFlags: ['metodo_proprio'], perfil: { cautela: 1, devocao: 1 } },
        },
        falha: {
          texto: 'Você escuta por semanas e só ouve o próprio cansaço. Numa noite o Qi se revolta, sobe pela garganta e deixa um gosto de ferro. Você desiste por ora, com a sensação incômoda de ter aberto uma porta errada.',
          fx: { corr: 3, ferida: 1, perfil: { ambicao: 1 } },
        },
      },
      {
        id: 'feras', texto: 'Seguir os bichos espirituais das colinas e copiar o jeito deles de respirar.', teste: { stat: ['sor', 'esp'], dif: 1 },
        falha: {
          texto: 'A raposa de cauda prateada some na primeira nevasca e não volta. Você passa o inverno sozinh{jogador.o} numa gruta, aprende muito sobre frio e quase nada sobre Qi. Desce a montanha mais magr{jogador.o} e mais humilde.',
          fx: { ferida: 1, perfil: { cautela: 1 } },
        },
        sucesso: {
          texto: 'Uma raposa de cauda prateada tolera sua presença por um inverno inteiro. Você imita o modo como ela dorme, caça e foge, até que um dia o seu Qi passa a se mover do mesmo jeito: alerta, econômico, selvagem. Os aldeões começam a dizer que você tem cheiro de mato.',
          fx: { trilha: 'bestas', stats: { sor: 1 }, karma: 1, setFlags: ['metodo_proprio'], perfil: { compaixao: 1, astucia: 1 } },
        },
      },
      {
        id: 'contas', texto: 'Desenhar no chão os padrões que o Qi parece seguir e corrigi-los como um livro de contas.', requer: { jogador: { perfilMin: { astucia: 3 } } }, selo: 'Mente de calculista', teste: { stat: ['comp', 'esp'], dif: 1 },
        falha: {
          texto: 'Os círculos no chão se multiplicam e nenhum fecha a conta. Numa madrugada você percebe que passou a semana corrigindo o mesmo erro. Apaga tudo com o pé, envergonhad{jogador.o}, e guarda o giz no fundo da gaveta, mas não o joga fora.',
          fx: { stats: { comp: 1 }, perfil: { cautela: 1 } },
        },
        sucesso: {
          texto: 'Você enche o chão do quarto de círculos, setas e números. Os vizinhos acham que enlouqueceu. Mas, numa tarde, ao apagar uma linha torta, sente o Qi se acomodar no lugar certo, como uma dívida enfim quitada. Formações, sem nenhum professor de formações.',
          fx: { trilha: 'formacoes', stats: { comp: 1 }, setFlags: ['metodo_proprio'], perfil: { astucia: 1, disciplina: 1 } },
        },
      },
    ],
  }),
];
