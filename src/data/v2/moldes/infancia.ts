import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Infância (6 a 15 anos): a ferida da família, o amigo, o rival e a centelha do Qi.
 * Cada cena abre um fio ou alimenta uma inclinação; nenhuma opção é reaproveitada em outra cena.
 */
export const INFANCIA: Molde[] = [
  molde({
    id: 'inf_cobranca',
    titulo: 'A Marca da Família',
    tipo: 'personagem',
    capitulos: ['infancia'],
    unico: true,
    papeis: {
      culpado: { pessoa: { papel: 'culpado' } },
      faccao: { faccao: { ferida: true } },
      parente: { pessoa: { papel: 'parente', vivo: true }, opcional: true },
    },
    quando: { jogador: { idadeMin: 7 } },
    relevancia: [{ se: { jogador: { idadeMin: 7 } }, mais: 70 }],
    fio: { id: 'cla', abre: true, abandono: 'A dívida da família ficou sem resposta, e o nome do clã seguiu sumindo.' },
    cena: [
      { se: { ferida: ['divida'] }, texto: 'Um homem de casaco bom e olhos frios bate à porta, e ninguém precisa dizer quem é. {culpado.nome}, da {faccao.nome}, vem cobrar o que o seu clã deve desde antes de você nascer. Seus pais falam baixo, e você escuta de trás da porta. O nome da família, que um dia abriu portões, hoje só serve para constar num livro de contas.' },
      { se: { ferida: ['terra'] }, texto: 'Homens da {faccao.nome} medem a terra da sua família com cordas, e {culpado.nome} dita os números sem olhar para ninguém. O campo onde seus avós trabalharam agora "pertence" a outra gente. Seus pais não discutem. Você vê as mãos do seu pai se fecharem, devagar.' },
      { se: { ferida: ['desonra'] }, texto: 'No mercado, o nome do seu clã é dito com um sorriso torto. Quem o diz é {culpado.nome}, da {faccao.nome}, o mesmo que espalhou, anos atrás, a história que o manchou. Ao passar por você, ele abaixa os olhos para ver a criança em quem esse nome ainda vive.' },
      { texto: 'Há um retrato antigo em casa: dois sócios sorrindo. Um era da sua família; o outro é {culpado.nome}, hoje da {faccao.nome}, que nunca se explicou pelo que fez. Ele aparece na vila "só de passagem" e cumprimenta seus pais como se nada tivesse acontecido.' },
    ],
    opcoes: [
      {
        id: 'prazo', texto: 'Dar um passo à frente e pedir mais tempo, olhando nos olhos dele.',
        res: {
          texto: '{culpado.nome} ergue uma sobrancelha. Esperava uma criança escondida atrás da saia da mãe. "Corajoso", diz, sem sorrir, "ou tolo". Ele vai embora, mas guarda o seu rosto.',
          efeitos: [{ fato: ['culpado', 'foi_encarado', 2] }, { inclinar: ['reerguer_cla', 2] }, { opiniao: ['parente', 8] }],
          fx: { stats: { dao: 1 }, perfil: { disciplina: 1 } },
        },
      },
      {
        id: 'jurar', texto: 'Sair de trás dos seus pais e jurar que o nome da família vai voltar a valer.',
        requer: { jogador: { defeitoNao: ['covarde'] } }, seloBloqueio: 'Coração Covarde: a voz não sai',
        res: {
          texto: '{culpado.nome} ri, sem maldade, como quem ouve uma criança dizer que vai pegar a lua. Mas seu pai coloca a mão no seu ombro e aperta, e você entende que o juramento foi ouvido por mais de uma pessoa.',
          efeitos: [{ fato: ['culpado', 'ouviu_juramento', 3] }, { opiniao: ['culpado', -5] }, { opiniao: ['parente', 12] }, { inclinar: ['reerguer_cla', 3] }, { inclinar: ['vingar_cla', 1] }],
          fx: { perfil: { ambicao: 1, devocao: 1 } },
        },
      },
      {
        id: 'memoria', texto: 'Guardar cada detalhe: a voz, o anel, o nome do cocheiro. Você nunca esquece uma linha.',
        requer: { jogador: { talento: ['memoria_perfeita'] } }, selo: 'Memória Perfeita',
        res: {
          texto: 'Quando ele sai, você repete tudo, em voz baixa, até dormir: o brasão do anel, o sotaque, o caminho que os cavalos tomaram. Anos depois, isso vale mais que uma espada.',
          efeitos: [{ fato: ['culpado', 'foi_gravado', 3] }, { inclinar: ['vingar_cla', 2] }, { inclinar: ['reerguer_cla', 1] }, { q: ['cla_pista', 1] }],
          fx: { perfil: { astucia: 2 } },
        },
      },
      {
        id: 'calar', texto: 'Gravar o rosto dele na memória, calado.',
        res: {
          texto: 'Você não diz nada. Cada ruga, cada gesto dele fica guardado numa memória que não sabe esquecer. Ele nem percebe que acaba de ser anotado.',
          efeitos: [{ fato: ['culpado', 'foi_observado', 2] }, { inclinar: ['vingar_cla', 3] }],
          fx: { perfil: { astucia: 1, violencia: 1 } },
        },
      },
      {
        id: 'esconder', texto: 'Ficar atrás da sua mãe e deixar os adultos falarem.',
        res: {
          texto: 'Os adultos falam, e você ouve tudo, escondido. Entende pouco e sente muito: a vergonha tem cheiro de casa fria. Quando o homem sai, ninguém olha para ninguém.',
          efeitos: [{ fato: ['culpado', 'viu_medo', 1] }, { inclinar: ['reerguer_cla', 1] }, { inclinar: ['vingar_cla', 1] }, { opiniao: ['parente', 3] }],
          fx: { perfil: { cautela: 1 } },
        },
      },
    ],
  }),

  molde({
    id: 'inf_amigo_juramento',
    titulo: 'O Juramento dos Joelhos Ralados',
    tipo: 'personagem',
    capitulos: ['infancia'],
    unico: true,
    papeis: { amigo: { pessoa: { papel: 'amigo', vivo: true } } },
    quando: { jogador: { idadeMin: 8, idadeMax: 15 } },
    relevancia: [{ se: { jogador: { idadeMin: 8 } }, mais: 35 }],
    fio: { id: 'amigo', abre: true, abandono: 'O juramento dos dois ficou no tempo, sem ser cumprido nem quebrado.' },
    cena: '{amigo.nome} aparece com os joelhos ralados e um brilho nos olhos de quem escondeu o segredo a manhã inteira. "Quando a gente crescer, vamos para o mundo dos imortais. Os dois, juntos. Jura?" O vento move o capim, e você percebe que a pergunta é mais séria do que a idade dele.',
    opcoes: [
      {
        id: 'jurar', texto: 'Jurar, e cortar o dedo no mesmo galho.',
        res: { texto: 'O galho tem uma gota de cada um. {amigo.nome} guarda o pedaço de madeira num saquinho, como quem guarda um tesouro. Você sabe que agora existe alguém esperando por você em algum lugar do futuro.', efeitos: [{ fato: ['amigo', 'juramento', 4] }, { opiniao: ['amigo', 15] }, { inclinar: ['proteger', 2] }], fx: { perfil: { devocao: 1, compaixao: 1 } } },
      },
      {
        id: 'condicao', texto: 'Jurar, mas só se ele jurar esperar por você, caso você demore.',
        res: { texto: '{amigo.nome} pensa, franzindo a testa, e então cospe na palma para selar. "Eu espero. Mas não demore." A barganha é boba, e você sente que ela é a mais sincera de todas.', efeitos: [{ fato: ['amigo', 'pacto_de_espera', 3] }, { opiniao: ['amigo', 9] }, { inclinar: ['proteger', 1] }], fx: { perfil: { astucia: 1 } } },
      },
      {
        id: 'rir', texto: 'Rir e dizer que o Dao é coisa de gente grande.',
        res: { texto: '{amigo.nome} força um sorriso e muda de assunto. O galho cai do bolso e fica no chão, esquecido. O silêncio entre vocês, por uns dias, é de outro tamanho.', efeitos: [{ fato: ['amigo', 'zombou_do_sonho', 2] }, { opiniao: ['amigo', -10] }], fx: { perfil: { cautela: 1 } } },
      },
    ],
  }),

  molde({
    id: 'inf_rival_primeiro',
    titulo: 'O Balde Chutado',
    tipo: 'personagem',
    capitulos: ['infancia'],
    unico: true,
    papeis: { rival: { pessoa: { papel: 'rival', vivo: true } } },
    quando: { jogador: { idadeMin: 7, idadeMax: 14 } },
    relevancia: [{ se: { jogador: { idadeMin: 7 } }, mais: 30 }],
    fio: { id: 'rival', abre: true, abandono: 'Rival e jogador seguiram caminhos que nunca voltaram a se cruzar, e o assunto ficou por resolver.' },
    cena: '{rival.nome}, que veste seda e tem sapatos, chuta o seu balde de água e ri. "Gente como você deveria servir gente como eu." Há outras crianças olhando. Ninguém ri, e ninguém diz nada, e é esse silêncio que machuca mais que o chute.',
    opcoes: [
      {
        id: 'engolir', texto: 'Engolir o insulto e baixar a cabeça.',
        res: { texto: 'O riso de {rival.nome} ecoa na sua cabeça por muitos anos. Você enche o balde de novo e leva a água para casa, sem derramar uma gota.', efeitos: [{ fato: ['rival', 'humilhou_o_jogador', 3] }, { opiniao: ['rival', -2] }, { inclinar: ['superar_rival', 3] }], fx: { stats: { dao: 1 }, perfil: { cautela: 1 } } },
      },
      {
        id: 'revidar', texto: 'Revidar com um soco.', teste: { stat: 'fis', dif: 1 },
        sucesso: { texto: 'O nariz de {rival.nome} sangra. A vila inteira ouve o grito. A fama de valentão começa a crescer, e a de {rival.nome} a diminuir, só um pouco.', efeitos: [{ fato: ['rival', 'foi_derrubado', 4] }, { opiniao: ['rival', -25] }, { inclinar: ['superar_rival', 2] }], fx: { fama: 2, karma: -1, stats: { fis: 1 }, perfil: { violencia: 1 } } },
        falha: { texto: '{rival.nome} é maior do que parecia, e o soco acerta o ar. Você cai na lama diante de todos, e ele ri de novo, mais alto.', efeitos: [{ fato: ['rival', 'venceu_o_jogador', 3] }, { opiniao: ['rival', -10] }, { inclinar: ['superar_rival', 3] }], fx: { ferida: 1, perfil: { violencia: 1 } } },
      },
      {
        id: 'ignorar', texto: 'Ignorar, e seguir o seu caminho com o balde vazio.',
        res: { texto: 'Você caminha sem olhar para trás. A calma incomoda {rival.nome} mais que um soco: quem ignora um insulto parece não ter se importado, e isso, para ele, é pior.', efeitos: [{ fato: ['rival', 'foi_ignorado', 2] }, { opiniao: ['rival', -8] }, { inclinar: ['superar_rival', 1] }], fx: { stats: { dao: 2 }, perfil: { disciplina: 1 } } },
      },
      {
        id: 'postura', texto: 'Plantar os pés como o seu pai ensinou, e encarar sem dizer nada.',
        requer: { jogador: { origem: ['filho_guarda'] } }, selo: 'Filho de um Guarda do Reino',
        res: { texto: '{rival.nome} esperava medo, e encontra uma criança imóvel, com a postura de quem já viu coisa pior que ele. O riso morre no meio. Ele recua um passo e finge que o balde nunca existiu.', efeitos: [{ fato: ['rival', 'recuou_diante_do_jogador', 3] }, { opiniao: ['rival', -12] }, { inclinar: ['superar_rival', 2] }], fx: { fama: 1, perfil: { disciplina: 2 } } },
      },
      {
        id: 'sorrir', texto: 'Sorrir. Nenhum insulto o alcança.',
        requer: { jogador: { talento: ['coracao_inabalavel'] } }, selo: 'Coração Inabalável',
        res: { texto: 'O sorriso desarma {rival.nome} mais que um soco. Ele esperava um adversário e encontrou uma parede que sorri. Nos dias seguintes, ele passa a evitar o seu olhar.', efeitos: [{ fato: ['rival', 'foi_desarmado', 3] }, { opiniao: ['rival', -15] }, { inclinar: ['superar_rival', 1] }], fx: { stats: { dao: 1 }, perfil: { disciplina: 1 } } },
      },
    ],
  }),

  molde({
    id: 'despertar_centelha',
    titulo: 'A Centelha',
    tipo: 'virada',
    capitulos: ['infancia', 'despertar'],
    unico: true,
    papeis: { seita: { faccao: { local: true }, opcional: true }, parente: { pessoa: { papel: 'parente', vivo: true }, opcional: true } },
    quando: { jogador: { idadeMin: 11, reinoMax: 0, semFlag: ['despertou'] } },
    relevancia: [{ se: { jogador: { idadeMin: 12 } }, mais: 80 }],
    cena: [
      { se: { jogador: { origem: ['orfao_seita'] } }, texto: 'Na {seita.nome}, órfãos e servos fazem fila diante da Pedra de Teste. Cada toque revela um brilho, ou o silêncio. Quando chega a sua vez, o pátio inteiro parece prender a respiração, e você percebe que algumas dessas crianças nunca mais vão ter outra chance.' },
      { se: { jogador: { origem: ['cla_decadente'] } }, texto: 'Atrás do cofre vazio do clã, você encontra um compartimento oculto com um manual de respiração escrito por um ancestral. As letras são antigas, mas as instruções são claras. Se alguém da família já fez isso, o nome ainda pode valer alguma coisa.' },
      { texto: 'Um cultivador errante passa por {vila} testando crianças com uma pequena esfera de cristal. Quando chega a sua vez, a esfera treme na mão dele, e as outras crianças, de repente, ficam muito quietas.' },
    ],
    opcoes: [
      { id: 'pedra', texto: 'Tocar a pedra com firmeza.', requer: { jogador: { origem: ['orfao_seita'] } },
        res: { texto: 'A pedra brilha. O Ancião assente. Você deixa de ser servo e se torna discípulo externo da seita, e o peso de ter sido escolhido é maior que a alegria.', efeitos: [{ reputacao: ['seita', 8] }, { inclinar: ['ascender_seita', 3] }], fx: { tier: 1, setFlags: ['despertou', 'membro_seita', 'discipulo_externo'], faccao: 'seita', local: 'seita', perfil: { devocao: 1 } } } },
      { id: 'manual', texto: 'Seguir as instruções do manual do cofre, noite após noite.', requer: { jogador: { origem: ['cla_decadente'] } },
        res: { texto: 'Depois de semanas de insistência, uma corrente morna sobe pelo seu ventre. O Qi respondeu. A letra do ancestral aparece, de repente, mais legível do que ontem, e o cofre vazio já não parece tão vazio.', efeitos: [{ inclinar: ['reerguer_cla', 2] }, { q: ['manual_do_cla', 1] }], fx: { tier: 1, setFlags: ['despertou'], stats: { comp: 1 }, perfil: { disciplina: 1 } } } },
      { id: 'guiar', texto: 'Concentrar-se, e tentar guiar o brilho do cristal.', requer: { nao: { jogador: { origem: ['orfao_seita', 'cla_decadente'] } } },
        res: { texto: 'O cristal se acende em luz suave. "Você tem as raízes", diz o viajante, e lhe ensina o primeiro método de respiração. Depois vai embora, como se nada fosse, e você fica olhando a estrada por muito tempo.', fx: { tier: 1, setFlags: ['despertou'], faccao: 'errante', stats: { esp: 1 }, perfil: { disciplina: 1 } } } },
      { id: 'parente', texto: 'Contar primeiro a {parente.nome}, antes de qualquer outra pessoa.', requer: { papel: { parente: { vivo: true } } },
        res: { texto: '{parente.nome} escuta em silêncio, com a cabeça baixa, e então abraça você por mais tempo do que costuma. "Eu sabia", diz. Não sabia, mas dizer isso é a forma que {parente.nome} tem de dizer que tem orgulho.', efeitos: [{ opiniao: ['parente', 20] }, { fato: ['parente', 'primeiro_a_saber', 3] }, { inclinar: ['proteger', 2] }], fx: { tier: 1, setFlags: ['despertou'], stats: { dao: 1 }, perfil: { compaixao: 1 } } } },
    ],
  }),

  /* ---------- Respiros ---------- */
  molde({
    id: 'respiro_estrada',
    titulo: 'A Estrada do Salgueiro',
    tipo: 'respiro',
    capitulos: ['infancia', 'despertar', 'entrada', 'ascensao', 'crise', 'legado'],
    cooldown: 4,
    cena: [
      { tom: 'lirico', texto: 'A estrada do Salgueiro cheira a poeira e a chuva que ainda não veio. Você anda sem pressa, e o mundo se abre aos poucos, como um leque. Há dias em que a vida cabe inteira num passo.' },
      { tom: 'sombrio', texto: 'A estrada do Salgueiro está vazia demais. Corvos sobem de um poste, e o vento traz um cheiro que você prefere não identificar. Alguém passou por aqui com pressa, e não voltou.' },
      { tom: 'ironico', texto: 'A estrada do Salgueiro, como todas as estradas importantes, tem um buraco no pior lugar possível. Um mercador está parado diante dele, discutindo com a própria mula sobre quem foi o culpado.' },
      { texto: 'A estrada do Salgueiro segue entre arrozais, e o dia passa devagar. Um viajante com a perna enfaixada pede, sem muita esperança, que você leve um recado até a próxima vila.' },
    ],
    opcoes: [
      { id: 'recado', texto: 'Levar o recado, mesmo fora do seu caminho.', res: { texto: 'Perde-se uma tarde, e ganha-se um agradecimento sincero e um bolinho de arroz já meio duro. Há coisas que a gente só entende depois.', efeitos: [{ inclinar: ['proteger', 1] }], fx: { karma: 1, perfil: { compaixao: 1 } } } },
      { id: 'descansar', texto: 'Descansar à sombra de um salgueiro e respirar com calma.', res: { texto: 'A respiração encontra o ritmo da folhagem. Quando você se levanta, o corpo está mais leve e a cabeça, mais clara.', fx: { xp: 3, stats: { comp: 1 }, perfil: { disciplina: 1 } } } },
      { id: 'seguir', texto: 'Seguir viagem, sem parar.', res: { texto: 'A estrada se encarrega do resto. Você chega ao fim do dia com os pés doendo e a sensação de que ganhou tempo.', fx: { xp: 2, perfil: { ambicao: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_festival',
    titulo: 'O Festival das Lanternas',
    tipo: 'respiro',
    capitulos: ['infancia', 'despertar', 'entrada', 'ascensao', 'legado'],
    cooldown: 8,
    papeis: { amigo: { pessoa: { papel: 'amigo', vivo: true }, opcional: true } },
    cena: [
      { se: { papel: { amigo: { vivo: true } } }, texto: 'É noite de festival. Lanternas de papel sobem pelo rio, e {amigo.nome} puxa você pela manga para ver a primeira delas escapar do chafariz. "Faz um pedido", diz, sem olhar. "Eu já fiz o meu."' },
      { texto: 'É noite de festival. Lanternas de papel sobem pelo rio, vendedores gritam o preço dos bolos de lótus, e crianças correm entre as pernas dos adultos. Por uma noite, ninguém parece lembrar de dívidas, de seitas ou de rivais.' },
    ],
    opcoes: [
      { id: 'pedido', texto: 'Soltar uma lanterna e fazer um pedido em silêncio.', res: { texto: 'A lanterna sobe, torta, e se perde entre as outras. Você nunca saberá qual era a sua, mas o pedido ficou no ar, e há dias em que isso basta.', efeitos: [{ opiniao: ['amigo', 3] }], fx: { stats: { dao: 1 }, perfil: { devocao: 1 } } } },
      { id: 'dancar', texto: 'Entrar na roda de dança e esquecer o resto.', res: { texto: 'A música é ruim e o chão é irregular, mas ninguém se importa. Você volta para casa rindo sozinho, o que não acontecia havia tempo.', efeitos: [{ opiniao: ['amigo', 4] }], fx: { stats: { car: 1 }, perfil: { compaixao: 1 } } } },
      { id: 'observar', texto: 'Ficar à margem, observando quem está ali.', res: { texto: 'Há sempre mais coisa para ver de longe: quem fala com quem, quem desvia o olhar, quem leva um recado escondido na manga. Você guarda tudo.', fx: { stats: { comp: 1 }, perfil: { astucia: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_trabalho',
    titulo: 'Um Dia de Trabalho',
    tipo: 'respiro',
    capitulos: ['infancia', 'despertar'],
    cooldown: 4,
    papeis: { amigo: { pessoa: { papel: 'amigo', vivo: true }, opcional: true } },
    cena: [
      { se: { papel: { amigo: { vivo: true } } }, texto: 'O dia é de colheita, e {amigo.nome} trabalha na fileira ao lado, cantando uma música que nunca termina. As costas doem, e o sol ainda está alto. Entre uma foice e outra, o tempo passa melhor do que sozinho.' },
      { texto: 'O dia é de colheita. A vila inteira entra na água até os joelhos, de foice na mão, do amanhecer ao escuro. As costas doem, mas as risadas ajudam.' },
    ],
    opcoes: [
      { id: 'trabalhar', texto: 'Trabalhar firme até o fim do dia.', res: { texto: 'No fim, as mãos têm bolhas novas e a barriga tem comida de verdade. Dormir vem fácil.', efeitos: [{ opiniao: ['amigo', 3] }], fx: { stats: { fis: 1 }, perfil: { disciplina: 1 } } } },
      { id: 'escutar', texto: 'Trabalhar ao lado dos mais velhos e ouvir as histórias deles.', res: { texto: 'Entre uma fileira e outra, você escuta sobre invernos terríveis, cobras de rio e um monge que passou por aqui antes de seu pai nascer. A história do monge ficou na sua cabeça.', fx: { stats: { comp: 1 }, perfil: { astucia: 1 } } } },
      { id: 'fugir', texto: 'Inventar uma desculpa e sumir na floresta.', res: { texto: 'A tarde é sua. Quando você volta, alguém já cobriu a sua parte, e ninguém diz nada, o que é pior do que dizer.', efeitos: [{ opiniao: ['amigo', -3] }], fx: { stats: { sor: 1 }, perfil: { cautela: 1 } } } },
    ],
  }),
];
