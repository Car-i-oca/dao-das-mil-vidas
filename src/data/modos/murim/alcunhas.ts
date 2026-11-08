import type { Effects, State } from '../../../types';
import type { Alcunha, Eixo, ReacaoAlcunha } from '../tipos';

type Op = [texto: string, res: string, fx?: Effects];
const reacao = (id: string, titulo: string, texto: string, ops: Op[]): ReacaoAlcunha => ({ id, titulo, texto, opcoes: ops.map(([t, res, fx]) => ({ texto: t, res, fx })) });
const f = (s: State, ...flags: string[]) => flags.some((x) => s.flags.includes(x));

/**
 * Alcunhas do Murim: estradas, escolas e Jianghu. Eixos e limiares em docs/alcunhas.md.
 * Cada alcunha tem nome nos dois gêneros, história de origem, epílogo próprio, dica e cenas de reação do mundo.
 */
const puro = (eixo: Eixo, id: string, m: string, fm: string, historia: string, epilogo: string, dica: string, reacoes: ReacaoAlcunha[], extra: Partial<Alcunha> = {}): Alcunha =>
  ({ id, m, f: fm, eixos: [eixo], historia, epilogo, dica, reacoes, ...extra });

export const ALCUNHAS_MURIM: Alcunha[] = [
  puro('compaixao', 'mur_misericordioso', 'o Misericordioso', 'a Misericordiosa',
    'Dizem que nunca passou por uma aldeia sem deixar algo na porta de quem não podia pedir.',
    'Nas aldeias das duas margens, quando alguém perguntava quem os tinha ajudado, ninguém sabia o nome verdadeiro. Sabiam «{alcunha}», e isso bastava para acender uma lanterna na janela no dia do enterro.',
    'Quem ajuda sem ser visto acaba visto por todos.',
    [reacao('pedido', 'A fila na porta', 'Ao saber que «{alcunha}» está na estalagem, uma fila de gente humilde se forma no pátio: doentes, viúvas, um menino com a perna torta. Não há remédio nem prata para todos.', [
      ['Atender a todos até a lanterna acabar.', 'Você dorme sentado, as mãos cheias de pano e ervas. De manhã, metade da fila volta com pão. A outra metade volta só para agradecer.', { karma: 3, pedras: -15, stats: { car: 1 } }],
      ['Escolher os casos mais graves e explicar o limite.', 'Alguns saem de cabeça baixa, mas ninguém sai enganado. Você aprende que misericórdia também tem contabilidade.', { karma: 1, stats: { comp: 1 } }],
    ])],
    { contra: ['violencia', 'ganancia'], infame: { m: 'o Piedoso Tolo', f: 'a Piedosa Tola' } }),
  puro('violencia', 'mur_punho', 'o Punho Sem Descanso', 'a Mão Sem Descanso',
    'Contam que, quando uma briga começa onde ele está, ela termina antes de qualquer um saber quem a começou.',
    'Ninguém lembrava de um duelo de {alcunha} que tivesse durado mais de três golpes. Também ninguém lembrava de tê-lo visto rir depois. Os pátios onde treinou guardam, até hoje, uma marca no chão que os alunos novos evitam pisar.',
    'Quem resolve tudo com as mãos acaba conhecido por elas.',
    [reacao('desafio', 'O garoto da taberna', 'Um jovem de uma escola menor reconhece «{alcunha}» e o desafia diante da taberna lotada, mais por nome que por raiva. Todos esperam o primeiro golpe.', [
      ['Aceitar e vencer sem machucar.', 'Você o derruba duas vezes e o ajuda a levantar. A taberna não sabe se aplaude ou se cala. O garoto jura que nunca mais vai desafiar ninguém por nome.', { fama: 3, karma: 1 }],
      ['Aceitar e deixar a marca que a taberna espera.', 'O garoto fica três semanas de cama. A taberna passa a servi-lo primeiro e a olhá-lo por último.', { fama: 4, karma: -3, stats: { fis: 1 } }],
    ])],
    { contra: ['compaixao'] }),
  puro('astucia', 'mur_raposa', 'o Zorro de Hwayang', 'a Raposa de Hwayang',
    'Quem negocia em Hwayang diz que ela sempre sabe o preço de cada porta antes de bater.',
    'A {alcunha} nunca venceu uma disputa pela força. Vencia pela hora certa de chegar, pela frase certa de calar. Quando morreu, três escolas rivais mandaram flores para o mesmo funeral, cada uma achando que era a única a ter sido favorecida.',
    'Quem planeja três jogadas à frente é lembrado pelo jogo, não pelo lado.',
    [reacao('convite', 'A carta sem selo', 'Um mensageiro entrega a «{alcunha}» uma carta sem selo: duas escolas rivais querem que alguém de fora arbitre uma disputa de herança, e as duas já pagaram adiantado.', [
      ['Arbitrar com cuidado e cobrar das duas.', 'Cada lado sai achando que ganhou o que queria. Você sai com duas bolsas e um sorriso que nenhum dos dois lê direito.', { pedras: 30, fama: 2 }],
      ['Recusar as duas bolsas e propor um acordo aberto.', 'A transparência assusta os dois no começo. Ao fim, é o único acordo que sobrevive ao inverno.', { karma: 2, fama: 3 }],
    ])]),
  puro('cautela', 'mur_sombra', 'o Passo Cuidadoso', 'a Sombra Prudente',
    'Dizem que olha três vezes para a ponte antes de pisar, e que por isso ainda anda por estradas onde muitos já não andam.',
    'Viveu mais do que quase todos os que a desafiaram, e quase ninguém soube de nenhuma façanha dela. Isso, para {alcunha}, nunca foi falta: foi a vitória que quis.',
    'Quem nunca é pego de surpresa quase não aparece nas histórias.',
    [reacao('emboscada', 'O atalho gentil', 'Um carroceiro oferece a «{alcunha}» um atalho que economiza dois dias. A estrada é boa demais, e a hora é conveniente demais.', [
      ['Recusar o atalho e dar a volta longa.', 'Dois dias depois, vocês ouvem dizer que o atalho foi tomado por bandidos. O carroceiro nunca mais é visto.', { stats: { sor: 1 }, fama: 1 }],
      ['Aceitar, mas mandar alguém na frente.', 'O batedor volta correndo: havia, sim, gente esperando. Você os evita pelo outro lado e ganha a fama de quem cheira o perigo.', { fama: 3, pedras: 10 }],
    ])]),
  puro('ambicao', 'mur_faminto', 'o Faminto de Escolas', 'a Faminta de Escolas',
    'Dizem que olha cada pátio como quem calcula quanto custaria comprá-lo.',
    'Subiu mais depressa do que qualquer rival e deixou, no caminho, mais ex-aliados do que alunos. Quando {alcunha} chegou ao topo, descobriu que o ar ali era o mesmo de embaixo, só mais caro.',
    'Quem quer sempre a próxima porta raramente vê a que deixou aberta.',
    [reacao('convite', 'A cadeira vazia', 'Uma escola em crise oferece a «{alcunha}» a cadeira de mestre interino. O preço é assinar uma dívida antiga que não é sua.', [
      ['Assinar e assumir a escola.', 'A cadeira é sua, e a dívida também. Você sobe um degrau e entende, na primeira noite, por que ninguém mais quis aquele lugar.', { fama: 5, pedras: -30, stats: { car: 1 } }],
      ['Negociar a dívida antes de sentar.', 'A escola relutante cede metade. Você assume com menos peso e mais inimigos entre os que queriam a cadeira.', { fama: 3, pedras: -10 }],
    ])], { contra: ['compaixao'] }),
  puro('disciplina', 'mur_coluna', 'o Pilar do Pátio', 'a Coluna do Pátio',
    'Dizem que treina no mesmo lugar, na mesma hora, desde antes de os alunos mais velhos chegarem.',
    'Os discípulos mudaram, os mestres envelheceram, a escola trocou de nome duas vezes. {alcunha} continuou ali, de pé, às cinco da manhã, e o pátio aprendeu a medir o dia por isso.',
    'Quem repete sem cansar vira ponto de referência.',
    [reacao('visita', 'O visitante apressado', 'Um mestre famoso, de passagem, assiste ao treino de «{alcunha}» e diz que daria metade do tempo para chegar ao mesmo lugar, se soubesse o atalho.', [
      ['Convidar o visitante a treinar uma manhã inteira.', 'Ele aguenta até o meio-dia. Sai calado, respeitoso, e manda um discípulo seu estudar com você.', { fama: 3, stats: { dao: 1 } }],
      ['Ouvir o atalho e testar sem abandonar a rotina.', 'O atalho funciona em parte. Você incorpora o que serve e passa a ensinar as duas coisas.', { stats: { comp: 1 }, fama: 1 }],
    ])]),
  puro('devocao', 'mur_incenso', 'o Guardião do Incenso', 'a Guardiã do Incenso',
    'Dizem que nenhuma cerimônia da região começa sem que ele já tenha acendido o primeiro bastão.',
    'Havia templos maiores e monges mais sábios. Mas, quando o inverno apertava, era na porta de {alcunha} que as famílias deixavam seus mortos recentes, certas de que alguém ia acender o incenso certo.',
    'Quem cuida dos ritos dos outros ganha um lugar nas memórias de todos.',
    [reacao('rito', 'O enterro sem família', 'Um viajante morre na estrada sem ninguém para velá-lo. A vila hesita: ninguém quer pagar o rito. «{alcunha}» é chamado.', [
      ['Conduzir o rito inteiro e pagar do próprio bolso.', 'A vila inteira comparece, por vergonha ou por afeto. Ninguém fala de preço. O nome do viajante, que ninguém sabia, é escrito na tabuleta.', { karma: 3, pedras: -15, fama: 2 }],
      ['Conduzir o rito simples e deixar a vila completar.', 'A vila, constrangida, completa a cerimônia. Você vê que a devoção também é um jeito de dar aos outros a chance de ser decentes.', { karma: 2, stats: { dao: 1 } }],
    ])]),
  puro('ganancia', 'mur_cobrador', 'o Cobrador de Prata', 'a Cobradora de Prata',
    'Dizem que nunca esquece uma dívida, nem a data, nem o nome de quem a contraiu.',
    'Fez fortuna onde outros fizeram dívidas. Quando {alcunha} morreu, o inventário tinha mais cofres do que amigos, e o testamento deixava uma única linha para os dois lados da conta.',
    'Quem conta tudo acaba sendo contado.',
    [reacao('divida', 'A viúva do ferreiro', 'A viúva de um ferreiro vem pedir mais um mês a «{alcunha}». O marido devia, o filho é pequeno, e a forja ainda não esfriou.', [
      ['Dar o mês, mas cobrar juros no fim.', 'Ela agradece com os olhos baixos. No fim do mês, paga tudo, e você ganha dinheiro e um inimigo de longa memória.', { pedras: 20, karma: -1 }],
      ['Perdoar a dívida inteira diante de testemunhas.', 'A notícia se espalha como uma mancha de vinho. Alguns riem de quem cobra tão mole; outros começam a pagar em dia por vontade própria.', { pedras: -25, karma: 3, fama: 2 }],
    ])], { contra: ['compaixao'], infame: { m: 'o Sanguessuga das Estradas', f: 'a Sanguessuga das Estradas' } }),

  { id: 'mur_mao_protetora', m: 'o Braço que Pune para Proteger', f: 'a Mão que Pune para Proteger', eixos: ['compaixao', 'violencia'],
    historia: 'Dizem que os fracos dormem melhor quando ela está por perto, e que os fortes dormem pior.',
    epilogo: 'Ninguém negava a dureza de {alcunha}. Os que tinham sido protegidos diziam que a dureza era o único jeito de proteger que funcionava; os que tinham sido punidos diziam o mesmo, em voz mais baixa.',
    dica: 'A ternura e a força, juntas, pesam mais que cada uma.',
    reacoes: [reacao('queixa', 'O vilarejo dividido', 'Uma aldeia pede a «{alcunha}» que expulse uma gangue que a explora. A gangue tem um filho doente dentro dela.', [
      ['Expulsar a gangue e levar o remédio ao menino.', 'A aldeia respira. A gangue vai embora. O menino sobrevive, e o pai dele nunca esquece a mão que o puniu e a que o ajudou.', { karma: 2, fama: 3 }],
      ['Expulsar a gangue sem se envolver com o resto.', 'A aldeia fica em paz, e você segue viagem com a sensação de que acabou o trabalho pela metade.', { fama: 2 }],
    ])] },
  { id: 'mur_tecelao', m: 'o Tecelão de Casas', f: 'a Tecelã de Casas', eixos: ['astucia', 'ambicao'],
    historia: 'Dizem que, onde duas famílias fazem aliança, há uma ponta de fio nas mãos dele.',
    epilogo: 'Casamentos, heranças e acordos de água: tudo o que mudou de mão em trinta anos tinha, em algum lugar, o dedo de {alcunha}. Nunca assinou nada. Nunca precisou.',
    dica: 'Planejar e querer, juntos, costuram o que os outros só veem separado.',
    reacoes: [reacao('alianca', 'Duas escolas e um casamento', 'Duas escolas rivais querem selar a paz com um casamento, e as duas procuram «{alcunha}» para arranjar os termos em segredo.', [
      ['Arranjar o casamento e ficar com a comissão.', 'O casamento sai, a paz sai, e você sai com uma bolsa gorda e dois inimigos que ainda não sabem do que o devem.', { pedras: 40, fama: 3 }],
      ['Arranjar o casamento e exigir a escola de Im Seol como testemunha.', 'A testemunha incomoda os dois lados, mas também os protege. A paz dura mais do que previsto.', { karma: 2, fama: 2 }],
    ])] },
  { id: 'mur_asceta', m: 'o Asceta da Lâmina', f: 'a Asceta da Lâmina', eixos: ['disciplina', 'devocao'],
    historia: 'Dizem que treina como quem reza, e que reza como quem treina.',
    epilogo: 'A espada de {alcunha} nunca foi a mais rápida. Mas ninguém, em quarenta anos, a viu fora de lugar. Os discípulos diziam que ela fazia silêncio ao ser desembainhada.',
    dica: 'A rotina e o rito, juntos, afiam mais que o ferro.',
    reacoes: [reacao('retiro', 'O convite ao templo', 'Um mosteiro de montanha oferece a «{alcunha}» uma cela de retiro por um inverno inteiro, sem nenhuma obrigação além do silêncio.', [
      ['Aceitar o inverno inteiro.', 'Você volta mais magro, mais calmo, e com uma ideia clara do que não precisa mais. Três escolas notam a diferença no seu passo.', { stats: { dao: 2, esp: 1 }, fama: 1 }],
      ['Aceitar um mês e voltar para o pátio.', 'Um mês basta para ouvir o que você precisava. O resto, você aprende ensinando.', { stats: { dao: 1 } }],
    ])] },
  { id: 'mur_ouvinte', m: 'o Ouvinte das Estalagens', f: 'a Ouvinte das Estalagens', eixos: ['cautela', 'astucia'],
    historia: 'Dizem que sabe do que se fala em cada mesa sem ter aberto a boca.',
    epilogo: 'Metade dos acordos da província passou, antes de existir, por uma conversa que {alcunha} ouviu sem comentar. A outra metade foi evitada pelo mesmo motivo.',
    dica: 'Escutar com cuidado vale mais que falar com força.',
    reacoes: [reacao('segredo', 'A conversa na mesa ao lado', '«{alcunha}» ouve, sem querer, dois homens combinarem uma emboscada contra uma caravana de remédios que parte ao amanhecer.', [
      ['Avisar o chefe da caravana sem se identificar.', 'A caravana muda de rota. Ninguém sabe quem avisou. Você ganha um aliado que nunca soube que tinha.', { karma: 2, fama: 1, setFlags: ['caravana_avisada'] }],
      ['Guardar a informação e vendê-la a quem pagar melhor.', 'A informação vale uma bolsa. A caravana é assaltada mesmo assim. Você dorme mal por uma semana.', { pedras: 35, karma: -3 }],
    ])] },
  { id: 'mur_lamina_aluguel', m: 'o Espada de Aluguel', f: 'a Lâmina de Aluguel', eixos: ['violencia', 'ganancia'],
    historia: 'Dizem que serve a quem paga, e que nunca perguntou o que o contratante pretende.',
    epilogo: 'Muitos juraram que {alcunha} mudou o rumo de guerras pequenas. Ninguém conseguia dizer o lado dele. O dinheiro tinha tamanho, e a lealdade, nenhum.',
    dica: 'Quem vende o braço pelo preço acaba ficando conhecido só por ele.',
    reacoes: [reacao('contrato', 'A oferta dobrada', 'Um mercador paga a «{alcunha}» para escoltar uma carga. Na estrada, um segundo mercador oferece o dobro para que a carga nunca chegue.', [
      ['Cumprir o primeiro contrato.', 'A carga chega. O segundo mercador manda dizer que não esquece. O primeiro paga pontualmente e passa a indicar você a outros.', { pedras: 30, fama: 2 }],
      ['Aceitar o dobro e desaparecer com a carga.', 'A bolsa é gorda. O nome fica sujo. Em três cidades, ninguém mais lhe aperta a mão sem olhar para o cinto.', { pedras: 80, karma: -4, fama: -3 }],
    ])], infame: { m: 'o Cão de Aluguel', f: 'a Cadela de Aluguel' } },
  { id: 'mur_mestre_paciente', m: 'o Mestre Paciente', f: 'a Mestra Paciente', eixos: ['compaixao', 'disciplina'],
    historia: 'Dizem que nunca elevou a voz para um aluno, e que, mesmo assim, nenhum deles errou duas vezes.',
    epilogo: 'Os alunos de {alcunha} contavam, anos depois, que a maior lição foi esperar. Esperar que o outro errasse sozinho, e esperar depois com a mão aberta.',
    dica: 'Cuidar e insistir, juntos, formam gente.',
    reacoes: [reacao('aluno', 'O aluno que desistiu', 'Um aluno promissor decide abandonar o treino depois de uma derrota humilhante, e «{alcunha}» o encontra arrumando a trouxa à noite.', [
      ['Sentar ao lado dele e não dizer nada até ele falar.', 'Ele fala por uma hora. Quando termina, desfaz a trouxa. Anos depois, será ele a ensinar um aluno que quer desistir.', { karma: 2, stats: { car: 1 } }],
      ['Dar-lhe a escolha e uma semana de descanso.', 'Ele volta na sexta. A semana de descanso vira costume na escola, e os alunos agradecem sem saber a quem.', { fama: 1 }],
    ])] },

  { id: 'mur_mestra_portas', m: 'o Mestre de Portas Abertas', f: 'a Mestra de Portas Abertas', feito: (s) => f(s, 'fundou_escola'),
    historia: 'Dizem que fundou uma escola onde ninguém é recusado antes de ser ouvido.',
    epilogo: 'O pátio de {alcunha} nunca teve o telhado mais bonito da província, mas tinha o portão sem trinco. Gente de três escolas inimigas treinou lado a lado ali, e brigou menos do que se esperava.',
    dica: 'Quem abre uma escola fica sendo, para sempre, a porta dela.',
    reacoes: [reacao('recusado', 'O candidato recusado', 'Um rapaz expulso de outra escola bate ao portão de «{alcunha}». Os alunos dizem que ele causa problemas.', [
      ['Aceitá-lo com uma regra clara.', 'Ele é difícil por um ano e leal pelo resto. A escola aprende a conviver com gente que ainda não aprendeu a conviver.', { karma: 2, fama: 2 }],
      ['Recusar para proteger o pátio.', 'O pátio fica calmo. O rapaz vai a outro lugar, e você sabe, pelas notícias, em quem ele se tornou.', { karma: -1 }],
    ])] },
  { id: 'mur_lanterna', m: 'o Lampião das Estradas', f: 'a Lanterna das Estradas', feito: (s) => f(s, 'guardiao_estradas'),
    historia: 'Dizem que, nas noites sem lua, viajantes perdidos procuram uma luz que sempre está no mesmo ponto da estrada.',
    epilogo: 'Nenhuma escola quis a vaga de {alcunha}. Ninguém pagava para guardar estrada. Mesmo assim, mercadores contavam as noites seguras pelo número de vezes que a luz estava no mesmo lugar.',
    dica: 'Quem protege caminhos vira parte da paisagem.',
    reacoes: [reacao('socorro', 'O comboio atrasado', 'Um comboio de peregrinos chega à sua posição com cinco horas de atraso e uma criança com febre. A estrada seguinte está sem guarda.', [
      ['Escoltar o comboio até o destino, abandonando o posto.', 'O posto fica vazio por uma noite. A criança chega viva, e o comboio fala disso por anos.', { karma: 3, fama: 2 }],
      ['Mandar um recado à escola vizinha e manter o posto.', 'A escola envia dois discípulos. O posto continua, a criança chega, e você descobre que sozinho, também, não era a única luz.', { karma: 1, stats: { car: 1 } }],
    ])] },
  { id: 'mur_copista', m: 'o Copista da Verdade', f: 'a Copista da Verdade', feito: (s) => f(s, 'tecnica_aberta', 'metodo_verificado'),
    historia: 'Dizem que publicou um método sem esconder as falhas, e que isso irritou muita gente séria.',
    epilogo: 'O caderno de {alcunha} circulou por quarenta escolas, cada uma com suas correções na margem. Anos depois, ninguém mais sabia o que era original. Foi a vitória que ele quis.',
    dica: 'Quem não guarda um segredo acaba sem dono e com herdeiros.',
    reacoes: [reacao('plagio', 'A cópia reivindicada', 'Um mestre de outra escola publica uma cópia do seu método com o nome dele na capa. Os alunos esperam que você proteste.', [
      ['Aceitar a cópia e corrigir o texto em público.', 'O mestre, desconcertado, agradece em voz baixa. A correção circula, e a técnica fica melhor do que antes.', { fama: 2, karma: 2 }],
      ['Desmascarar o plágio com provas.', 'A disputa é feia e rápida. Você ganha o direito de ser citado, e perde a paz por um tempo.', { fama: 3, karma: -1 }],
    ])] },
  { id: 'mur_testemunha', m: 'a Testemunha de Hwayang', f: 'a Testemunha de Hwayang', feito: (s) => f(s, 'final_justica', 'legado_verificacao'),
    historia: 'Dizem que, quando o conselho se reuniu, foi ela quem entrou com as provas e não saiu antes de elas serem lidas.',
    epilogo: 'Nos livros do conselho, o nome de {alcunha} aparece uma só vez, numa nota de rodapé. Nas casas das famílias que voltaram, aparece todas as noites, numa oração curta.',
    dica: 'Quem leva a prova até o fim fica com ela na memória.',
    reacoes: [reacao('ameaca', 'O recado sem assinatura', 'Um recado sem assinatura chega à porta de «{alcunha}»: esquecer o que foi dito ao conselho, ou aceitar as consequências.', [
      ['Guardar o recado e reforçar a guarda da casa.', 'Nada acontece por três semanas. Na quarta, a carta é encontrada por um magistrado, e o remetente é identificado.', { stats: { sor: 1 }, fama: 1 }],
      ['Levar o recado em público ao conselho.', 'O recado vira prova. O remetente é interrogado, e o conselho, desta vez, fica do seu lado antes de perguntar.', { fama: 3, karma: 1 }],
    ])] },
  { id: 'mur_duelista', m: 'o Duelista da Ponte', f: 'a Duelista da Ponte', feito: (s) => f(s, 'final_duelo'),
    historia: 'Dizem que enfrentou, em campo aberto, a quem ninguém queria enfrentar, e que respeitou cada regra do duelo.',
    epilogo: 'Onde antes havia uma ponte de cordas, hoje há uma de pedra. Os alunos de {alcunha} treinam ali ao amanhecer e dizem que o primeiro passo deve ser dado com a regra, não com a pressa.',
    dica: 'Quem luta de acordo com regras é lembrado pelas regras.',
    reacoes: [reacao('revanche', 'O pedido de revanche', 'O filho de um dos derrotados pede a «{alcunha}» uma revanche formal, com as mesmas regras e as mesmas testemunhas.', [
      ['Aceitar, e deixar que ele escolha o terreno.', 'Ele escolhe a mesma ponte. Você vence outra vez, mas diz as regras com tanta clareza que ele agradece ao final.', { fama: 3, stats: { fis: 1 } }],
      ['Recusar com respeito e oferecer ensiná-lo.', 'A recusa pesa. O ensino pesa mais. Ele aceita, a contragosto, e três anos depois é um dos melhores da região.', { karma: 2, fama: 1 }],
    ])] },
  { id: 'mur_sombra_lua', m: 'a Sombra da Lua Oca', f: 'a Sombra da Lua Oca', feito: (s) => f(s, 'casa_cha', 'lua_oca_aprendiz') || s.path === 'demoniaca', infame: { m: 'o Mensageiro da Lua Oca', f: 'a Mensageira da Lua Oca' },
    historia: 'Dizem que as portas dos fundos da Casa de Chá da Lua Oca se abrem sozinhas quando ele passa.',
    epilogo: 'Nunca foi preso, nunca foi premiado. {alcunha} era citado em sussurros, e cada sussurro, sem ser verdadeiro por inteiro, também não era falso.',
    dica: 'Quem aprende a sair sem ser visto também aprende a nunca ser esquecido.',
    reacoes: [reacao('recusa', 'A porta da escola reconhecida', 'Uma escola de reputação limpa recusa a entrada de «{alcunha}» num torneio aberto, alegando as companhias que você manteve.', [
      ['Insistir pelo mérito, diante de todos.', 'A escola cede por vergonha. Você participa e vence uma rodada. A plateia não sabe se aplaude ou se vigia.', { fama: 2, karma: -1 }],
      ['Aceitar a recusa e participar de outro torneio, escondido.', 'O torneio escondido paga melhor e pergunta menos. Você sai com bolsa, contatos novos, e uma dívida que ainda não sabe medir.', { pedras: 40, karma: -2 }],
    ])] },
  { id: 'mur_barqueiro', m: 'o Barqueiro dos Expulsos', f: 'a Barqueira dos Expulsos', feito: (s) => s.age >= 28 && s.flags.includes('mu_jin_aliado'),
    historia: 'Dizem que as famílias expulsas descem o rio em barcos que ela, às vezes, conduziu sem cobrar.',
    epilogo: 'Cinquenta famílias ainda dizem que chegaram ao novo vale por causa de {alcunha}, e nenhuma consegue explicar como chegou lá, porque o caminho todo foi feito de noite e de rio.',
    dica: 'Quem leva os outros ao outro lado é lembrado como o próprio rio.',
    reacoes: [reacao('travessia', 'A última travessia', 'Uma família expulsa chega ao cais à noite, perseguida por homens do Clã Gwon. O barco só leva mais uma carga.', [
      ['Levar a família e enfrentar quem chegar ao cais.', 'O barco parte, e na margem você ouve os gritos de quem chegou tarde demais. A família chora em silêncio, vendo o cais encolher.', { karma: 3, fama: 2, stats: { fis: 1 } }],
      ['Levar a família e deixar uma pista falsa no cais.', 'Os perseguidores seguem a pista errada por dois dias. A família chega ao vale com todos os filhos, e o cais continua em silêncio.', { karma: 2, fama: 1, stats: { comp: 1 } }],
    ])] },
  { id: 'mur_curandeiro', m: 'o Curandeiro das Estradas', f: 'a Curandeira das Estradas', eixos: ['compaixao'], trilha: ['alquimia'],
    historia: 'Dizem que sabe a erva certa para cada febre e que nunca recusou paciente, mesmo sem saber de onde veio a moeda.',
    epilogo: 'O baú de ervas de {alcunha} era conhecido em oito vilas. Quando ele parou de viajar, os remédios continuaram a ser usados por quem aprendera a fazê-los, e a lista de nomes no caderno ultrapassou mil.',
    dica: 'A erva e a ternura, juntas, curam mais do que a erva.',
    reacoes: [reacao('febre', 'A febre do vale', 'Um vale inteiro adoece com a mesma febre, e «{alcunha}» é o único que sabe qual erva a combate. Falta a erva no vale.', [
      ['Subir a montanha atrás da erva, mesmo no inverno.', 'A subida custa três dedos de gelo e dois dias. A erva chega a tempo, e o vale lembra, mais de uma geração, de quem a trouxe.', { karma: 3, fama: 3, stats: { fis: 1 } }],
      ['Ensinar o vale a plantar a erva e partir.', 'A febre dura mais, mas deixa uma horta que nunca mais falha. Você parte sem aplauso e com o caderno mais cheio.', { karma: 2, stats: { comp: 1 } }],
    ])] },
  { id: 'mur_pedra', m: 'o Rancor de Pedra', f: 'a Pedra que Não Perdoa', eixos: ['violencia', 'ambicao'], defeito: ['orgulhoso'],
    historia: 'Dizem que guarda cada ofensa como um caderno, e que o caderno ainda tem páginas em branco.',
    epilogo: 'Quem cruzou o caminho de {alcunha} lembrava da cena por décadas. Quem não cruzou lembrava só do tamanho do pátio vazio onde ele treinava, olhando a mesma parede.',
    dica: 'Quem não esquece uma ofensa acaba sendo lembrado por ela.',
    reacoes: [reacao('pedido', 'O pedido de desculpas', 'Alguém que o ofendeu há anos chega, de joelhos, pedindo perdão diante da escola inteira. «{alcunha}» sente o peso da cena.', [
      ['Perdoar diante de todos.', 'O pátio prende o fôlego. Ao final, você se sente mais leve do que esperava, e mais velho do que gostaria. O nome ganha uma fenda por onde entra luz.', { karma: 4, stats: { dao: 1 } }],
      ['Recusar e mandar o homem embora.', 'O homem sai em silêncio. O pátio fica mais frio. Ninguém comenta, e todos lembram.', { karma: -2, fama: 1 }],
    ])] },
  { id: 'mur_memoria', m: 'o Arquivo Vivo', f: 'a Memória Viva', eixos: ['disciplina'], talento: ['memoria_perfeita'],
    historia: 'Dizem que nunca precisou reler um contrato, uma genealogia ou um mapa.',
    epilogo: 'Os escribas diziam que {alcunha} valia mais do que a biblioteca de uma escola média. Quando morreu, três famílias disputaram o direito de guardar suas anotações, e nenhuma soube ler a letra miúda.',
    dica: 'Quem esquece pouco acaba sendo chamado quando os outros esquecem.',
    reacoes: [reacao('disputa', 'A genealogia contestada', 'Duas famílias disputam um terreno com genealogias incompatíveis, e todos concordam que só «{alcunha}» pode dizer quem tem razão.', [
      ['Recitar a genealogia exata, sem tomar partido.', 'As duas famílias ouvem em silêncio. A verdade desagrada a uma, mas ninguém contesta a memória.', { fama: 3, stats: { comp: 1 } }],
      ['Recitar a genealogia e propor a divisão do terreno.', 'A verdade vem com uma saída: as famílias aceitam, a contragosto, e o terreno floresce com duas casas.', { karma: 2, fama: 2 }],
    ])] },
];
