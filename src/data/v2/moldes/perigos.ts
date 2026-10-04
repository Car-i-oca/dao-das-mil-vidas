import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Perigos e respiros extras da juventude à maturidade. Cada perigo dá a cada build uma solução escrita para ele.
 */
export const PERIGOS: Molde[] = [
  molde({
    id: 'perigo_tempestade', titulo: 'A Tempestade no Rio', tipo: 'perigo', capitulos: ['entrada', 'ascensao', 'crise'], cooldown: 18,
    quando: { jogador: { reinoMin: 1 } },
    combate: { oponente: 'raio', cenario: 'mar' },
    cena: 'O céu escurece no meio da travessia do rio, e o barqueiro, um velho que já viu coisa pior, começa a amarrar tudo o que pode. A primeira onda alta joga a barca de lado. O vento arranca o chapéu dele e o leva para sempre. Há seis pessoas a bordo, e o rio, pelo visto, tem outra ideia do destino.',
    opcoes: [
      { id: 'remar', texto: 'Pegar um remo e ajudar o velho a manter o rumo.', teste: { stat: ['fis', 'dao'], dif: 1 },
        sucesso: { texto: 'A margem aparece como uma promessa. Quando a barca bate na areia, ninguém fala nada; só o velho, ainda com o remo na mão, diz baixinho: "Bom braço." É um elogio que vale por todos os que você já ouviu.', fx: { fama: 2, stats: { fis: 1 }, perfil: { disciplina: 1, compaixao: 1 } } },
        falha: { texto: 'O remo quebra no meio, e a barca vira meio de lado. Todos se salvam, a nado e com sorte, mas a carga se perde, e o velho passa a noite olhando o rio, como quem pede perdão a um parente.', fx: { ferida: 1, pedras: -10 } } },
      { id: 'formacao', texto: 'Traçar na proa um arranjo rápido de talismãs, para acalmar o ar em volta.', requer: { jogador: { trilha: ['formacoes'] } }, selo: 'Caminho das Formações', teste: { stat: ['comp', 'esp'], tag: 'formacao' },
        sucesso: { texto: 'O vento recua, relutante, e a barca atravessa o resto do rio num círculo de calma que parece suspenso. Os passageiros olham para você, e depois para os talismãs queimando na proa. Ninguém pergunta como foi feito.', fx: { fama: 3, rec: 1, perfil: { astucia: 2 } } },
        falha: { texto: 'Os talismãs queimam rápido demais, e o arranjo se desfaz num estalo. O vento volta com um rancor novo. Todos se salvam, mas a lição fica: nem toda calma se encomenda.', fx: { ferida: 1, perfil: { astucia: 1 } } } },
      { id: 'alma', texto: 'Esticar a consciência sobre o rio, e dizer ao barqueiro, onde as ondas vão quebrar.', requer: { jogador: { trilha: ['alma'] } }, selo: 'Caminho da Consciência', teste: { stat: ['esp', 'comp'], tag: 'mente' },
        sucesso: { texto: 'Você sente cada onda antes de ela existir, e o barqueiro, que não é de acreditar, passa a obedecer. A travessia leva o dobro do tempo e é a mais segura que ele já fez. Na margem, o velho olha para você com os olhos de quem entendeu algo grande.', fx: { fama: 2, rec: 1, perfil: { astucia: 1, disciplina: 1 } } },
        falha: { texto: 'O rio é grande demais para a sua consciência, e a dor atrás dos olhos é a de um grito que ninguém ouviu. A barca se salva pela experiência do velho, não pela sua visão, e a humildade chega mais cara que o necessário.', fx: { ferida: 1, perfil: { disciplina: 1 } } } },
      { id: 'nadar', texto: 'Pular na água e levar a barca para a margem a nado, puxando a corda com os dentes.', requer: { jogador: { trilha: ['corpo'] } }, selo: 'Caminho do Corpo', teste: { stat: 'fis', tag: 'corpo', dif: 1 },
        sucesso: { texto: 'Cada braçada é uma pedra erguida, e o rio, pouco a pouco, se curva. Quando os seus pés tocam o fundo, a barca já está do outro lado, e os passageiros aplaudem em silêncio. O velho tira o chapéu que não tem.', fx: { fama: 3, rec: 1, stats: { fis: 2 }, perfil: { disciplina: 1, ambicao: 1 } } },
        falha: { texto: 'A corrente é maior que o corpo. Você é puxado rio abaixo, e só a corda, amarrada na barca, o salva do pior. A volta é a nado, devagar, e humilhante.', fx: { ferida: 2, stats: { fis: 1 } } } },
    ],
  }),

  molde({
    id: 'perigo_emboscada_culto', titulo: 'A Emboscada do {inimigo.nome}', tipo: 'perigo', capitulos: ['ascensao', 'crise'], cooldown: 25,
    papeis: { inimigo: { faccao: { tipo: ['culto'], estado: ['paz', 'tensao', 'guerra'] } }, lider: { pessoa: { novo: true, criar: { traco: ['cruel', 'ambicioso'], reino: 'jogador', objetivo: 'cacar', faccao: 'culto' } } } },
    quando: { jogador: { reinoMin: 2 } },
    combate: { oponente: 'assassino', cenario: 'selva' },
    cena: 'Na curva do desfiladeiro, três homens de manto negro saem das rochas e não dizem nada. O quarto, {lider.nome}, vem por último, devagar, e é o único que fala: "A {inimigo.nome} manda cumprimentos." {lider.Ele} não parece ter pressa, e isso é o que há de mais ameaçador no caminho.',
    opcoes: [
      { id: 'lutar', texto: 'Enfrentar os quatro, de costas para a rocha.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'lider' },
        sucesso: { texto: 'O desfiladeiro é estreito, e eles só podem vir dois de cada vez. É o que vence a luta. Quando o último cai, {lider.nome} está encostado na parede, ferido, com a expressão de quem calculou mal. Você o deixa ir, com o recado.', efeitos: [{ fato: ['lider', 'foi_derrotado_no_desfiladeiro', 4] }, { opiniao: ['lider', -20] }, { reputacao: ['inimigo', -8] }], fx: { fama: 3, perfil: { violencia: 1, disciplina: 1 } } },
        falha: { texto: 'São quatro, e eles se movem como quem já fez isso. Você cai, ferido, e a única razão de estar vivo é {lider.nome} ter ordens de levar um recado, e não um corpo.', efeitos: [{ fato: ['lider', 'derrotou_o_jogador', 4] }, { reputacao: ['inimigo', -4] }], fx: { ferida: 3, perfil: { disciplina: 1 } } } },
      { id: 'venenos', texto: 'Soltar, no vento, o pó que você prepara há meses para uma ocasião como esta.', requer: { jogador: { trilha: ['venenos'] } }, selo: 'Caminho dos Venenos', teste: { stat: ['comp', 'sor'], tag: 'veneno', ameaca: 'lider' },
        sucesso: { texto: 'Os três de preto caem, um por um, sem entender de onde veio o gosto de amêndoa. {lider.nome} recua com um lenço na boca, pálido de uma raiva que nunca mostrou. A emboscada vira um enterro, e você segue, com a certeza de que a palavra "veneno" agora corre entre eles.', efeitos: [{ fato: ['lider', 'viu_o_veneno', 5] }, { opiniao: ['lider', -30] }], fx: { fama: 2, karma: -2, rec: 1, perfil: { astucia: 2 } } },
        falha: { texto: 'O vento muda, e o pó volta para o seu lado. Você cai de joelhos, tossindo, e o resto da luta é feita com os olhos fechados, com a vergonha de ter sido vítima da própria arte.', efeitos: [{ fato: ['lider', 'viu_o_jogador_se_envenenar', 3] }], fx: { ferida: 2, karma: -1, perfil: { astucia: 1 } } } },
      { id: 'fugir', texto: 'Fugir pelo desfiladeiro, e rezar para que o terreno seja seu aliado.', teste: { stat: ['sor', 'esp'], dif: 0 },
        sucesso: { texto: 'A estrada se abre numa trilha que ninguém mais conhece, e você a toma, sem olhar para trás. Os passos deles ficam para trás, e a respiração de quem foge parece, de longe, a de quem voa.', efeitos: [{ fato: ['lider', 'viu_o_jogador_fugir', 3] }], fx: { stats: { sor: 1 }, perfil: { cautela: 2 } } },
        falha: { texto: 'A trilha termina numa rocha, e o resto da fuga é feito de mãos arranhadas e orgulho ferido. Quando os homens de preto chegam, ofegantes, ninguém mais precisa dizer nada.', efeitos: [{ fato: ['lider', 'encurralou_o_jogador', 4] }], fx: { ferida: 2, perfil: { cautela: 1 } } } },
    ],
  }),

  molde({
    id: 'perigo_besta', titulo: 'A Fera na Trilha', tipo: 'perigo', capitulos: ['entrada', 'ascensao', 'crise'], cooldown: 20,
    quando: { jogador: { reinoMin: 1 } },
    combate: { oponente: 'tigre', cenario: 'selva' },
    cena: 'A trilha termina numa clareira, e no meio dela está um tigre de listras brancas, de ombros de quem viveu muito e perdeu poucas lutas. Ele não ataca. Olha. Os olhos, cor de âmbar, têm uma inteligência que não combina com a boca cheia de dentes. Você pensa em todos os conselhos que já ouviu sobre feras espirituais, e em nenhum deles havia coragem suficiente.',
    opcoes: [
      { id: 'recuar', texto: 'Recuar devagar, com as mãos abertas.', res: { texto: 'O tigre acompanha o seu recuo com o olhar, e quando você some na curva, solta um som baixo, que não é rosnado: quase um riso. A trilha ganhou um nome novo para você, e o tigre, um registro na sua memória.', fx: { stats: { dao: 1 }, perfil: { cautela: 2 } } } },
      { id: 'enfrentar', texto: 'Enfrentar a fera, com tudo o que tem.', teste: { stat: ['fis', 'dao'], tag: 'combate', dif: 2 },
        sucesso: { texto: 'Cada golpe é uma pergunta, e cada resposta custa sangue. No fim, o tigre cai de lado, ofegante, e olha para você com respeito. A pele dele vale uma fortuna, mas você a deixa onde está.', fx: { fama: 4, karma: -1, ferida: 1, stats: { fis: 1, dao: 1 }, perfil: { violencia: 1, ambicao: 1 } } },
        falha: { texto: 'O tigre não está jogando. Você é jogado contra uma árvore, e só acorda dias depois, na casa de um caçador que ouviu seus gritos e escolheu ir ver.', fx: { ferida: 3, perfil: { violencia: 1 } } } },
      { id: 'fera', texto: 'Estender a mão, e deixar que o Qi fale com o dele.', requer: { jogador: { trilha: ['bestas'] } }, selo: 'Caminho das Bestas', teste: { stat: ['car', 'esp'], tag: 'besta' },
        sucesso: { texto: 'O tigre fecha os olhos, e um calor estranho sobe pelo seu braço: o Qi dele reconhece o seu. Ele não vira companheiro, mas passa a reconhecer o seu cheiro, e a trilha, a partir daí, deixa de ser perigosa para você.', fx: { fama: 2, rec: 2, karma: 1, perfil: { compaixao: 1 } } },
        falha: { texto: 'O Qi dele é grande demais, e o contato dói como queimadura. O tigre dá um passo atrás, ofendido, e você aprende que fera também tem pudor.', fx: { ferida: 1, rec: 0, perfil: { compaixao: 1 } } } },
      { id: 'merito', texto: 'Sentar na trilha, e esperar o tigre decidir.', requer: { jogador: { trilha: ['budista'] } }, selo: 'Caminho do Mérito',
        res: { texto: 'Você senta, de olhos baixos, e respira. O tempo passa, e o tigre, depois de um longo bocejo, se deita à distância de um salto. Ficam os dois, em silêncio, até o sol esquentar. Quando você se levanta, ele também. Segue a trilha, e o tigre, a seu modo, a deixa.', fx: { karma: 3, rec: 1, stats: { dao: 2 }, perfil: { compaixao: 2, devocao: 1 } } } },
    ],
  }),

  /* ---------- Mais respiros, para a vida não girar em círculos ---------- */
  molde({
    id: 'respiro_ponte', titulo: 'A Ponte de Pedra', tipo: 'respiro', capitulos: ['entrada', 'ascensao', 'crise', 'legado'], cooldown: 14,
    cena: [
      { tom: 'lirico', texto: '{vez2:A Ponte de Pedra de novo, igual, e você diferente. }A Ponte de Pedra é mais velha que qualquer nome que se conheça na região, e ninguém sabe quem a construiu. No meio dela, um viajante olha a água, e a água, ao que parece, lhe diz alguma coisa. Há dias em que o mundo é feito de tempo, e em que a ponte é a prova.' },
      { texto: '{vez2:A Ponte de Pedra de novo, igual, e você diferente. }A Ponte de Pedra é mais velha que qualquer nome que se conheça na região, e ninguém sabe quem a construiu. Hoje há um guarda do império cobrando passagem, e uma velha vendendo castanhas, e uma fila que só anda quando o guarda quer.' },
    ],
    opcoes: [
      { id: 'castanhas', texto: 'Comprar castanhas e conversar com a velha.', custo: 3, res: { texto: 'A velha sabe tudo sobre quem passa, e finge saber nada. No fim, deixa uma frase a mais no ar, que você guarda para depois. As castanhas, aliás, são boas.', fx: { stats: { sor: 1 }, perfil: { compaixao: 1, astucia: 1 } } } },
      { id: 'passar', texto: 'Pagar a passagem e seguir.', res: { texto: 'O guarda recebe, sem olhar, e o caminho se abre. A ponte atravessa o rio, e você, sem pressa, atravessa o dia.', fx: { xp: 2 } } },
      { id: 'pensar', texto: 'Parar no meio e ficar olhando a água.', res: { texto: 'A água passa, sempre diferente, sempre a mesma. Você pensa em tudo e em nada, e quando segue, a cabeça está mais clara, e o corpo, mais leve.', fx: { xp: 4, stats: { dao: 1 }, perfil: { disciplina: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_templo', titulo: 'O Templo Antigo', tipo: 'respiro', capitulos: ['despertar', 'entrada', 'ascensao', 'crise', 'legado'], cooldown: 14,
    cena: '{vez2:O templo sem rosto outra vez; a tigela de arroz continua fresca, e isso ainda intriga. }Entre duas colinas, um templo antigo guarda uma estátua sem rosto e uma tigela de arroz fresco, trocada todo dia por alguém que ninguém vê. O incenso queima sem pressa. Quando você entra, o silêncio muda de textura: não é vazio, é atenção.',
    opcoes: [
      { id: 'oferecer', texto: 'Deixar uma oferenda simples, e sentar um pouco.', custo: 5, res: { texto: 'A oferenda é pequena, e o silêncio, grande. Quando você sai, o sol já mudou de lugar, e um peso que você nem sabia que carregava ficou ao pé da estátua.', fx: { karma: 2, xp: 3, perfil: { devocao: 2 } } } },
      { id: 'estudar', texto: 'Estudar os caracteres gastos nas paredes.', res: { texto: 'Metade dos caracteres está perdida, mas a outra metade conta uma história de uma seita que deixou de existir sem deixar herdeiros. O que sobra é uma lição de humildade e uma frase inteira, bem preservada, sobre o valor de ser lembrado.', fx: { stats: { comp: 1 }, perfil: { astucia: 1, devocao: 1 } } } },
      { id: 'sair', texto: 'Observar de longe, sem entrar.', res: { texto: 'Há lugares que se respeitam melhor de fora. Você olha o templo por um tempo, e segue. O incenso, atrás de você, continua queimando, com a mesma paciência.', fx: { perfil: { cautela: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_ferreiro', titulo: 'A Forja da Vila', tipo: 'respiro', capitulos: ['despertar', 'entrada', 'ascensao'], cooldown: 14,
    cena: '{vez2:O ferreiro bate o mesmo ferro vermelho, ou outro idêntico, e o ritmo ainda acalma. }O ferreiro da vila bate um ferro vermelho que não vai virar nada em particular, só aquecer as mãos. O ritmo é o de uma conversa antiga, e as faíscas sobem como pensamentos que ninguém escreveu. Ele reconhece você, e acena sem parar de bater: se quiser ajudar, o fole está livre.',
    opcoes: [
      { id: 'fole', texto: 'Pegar o fole e ajudar até o ferro esfriar.', res: { texto: 'O ritmo do fole acompanha o do martelo, e por um tempo, os dois formam um instrumento só. No fim, o ferreiro joga a você uma ferradura ainda quente, para guardar. "Dá sorte", diz, sem convicção.', fx: { stats: { fis: 1 }, perfil: { disciplina: 1 } } } },
      { id: 'perguntar', texto: 'Perguntar ao ferreiro o que ele sabe do mundo lá fora.', res: { texto: 'O ferreiro fala pouco, mas o que diz é preciso: quem comprou espadas, quem pagou à vista, que seita encomendou aço demais. Uma conversa de dez minutos vale uma semana de boato.', fx: { stats: { comp: 1 }, perfil: { astucia: 1 } } } },
      { id: 'ouvir', texto: 'Apenas sentar e escutar o martelo.', res: { texto: 'O martelo é uma música simples, e o corpo, sem pedir, acompanha. Quando você levanta, o Qi corre mais firme, e a mente, mais lenta, no melhor sentido.', fx: { xp: 3, perfil: { disciplina: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_peregrinos', titulo: 'Os Peregrinos', tipo: 'respiro', capitulos: ['entrada', 'ascensao', 'crise', 'legado'], cooldown: 14,
    cena: '{vez2:Outra fila de peregrinos, e desta vez você repara em quem anda sozinho. }Uma fila de peregrinos passa pela estrada, de mantos claros e pés calejados, rumo a um templo distante. Cantam baixinho uma canção sem melodia. Uma velha da fila, mancando, para ao seu lado e pergunta, sem malícia, se você sabe quanto falta.',
    opcoes: [
      { id: 'caminhar', texto: 'Caminhar com eles por um trecho, ouvindo.', res: { texto: 'A canção não tem letra, mas tem fôlego. Você anda com eles por algumas horas, e quando se despede, a velha dá um tapinha na sua mão: "Quem caminha acompanhado, chega mais inteiro."', fx: { karma: 1, stats: { dao: 1 }, perfil: { compaixao: 1, devocao: 1 } } } },
      { id: 'ajudar', texto: 'Carregar a trouxa da velha até a próxima vila.', res: { texto: 'A trouxa é mais pesada do que parecia, e a velha, mais leve do que ela. No fim, ela deixa uma moeda de bronze, que você tenta recusar e não consegue.', fx: { pedras: 2, karma: 2, perfil: { compaixao: 2 } } } },
      { id: 'seguir', texto: 'Dizer a distância e seguir seu caminho.', res: { texto: 'A velha agradece, assente, e volta à fila. Você sente os olhos dela nas costas por um tempo, e depois, só o vento.', fx: { perfil: { cautela: 1 } } } },
    ],
  }),
];
