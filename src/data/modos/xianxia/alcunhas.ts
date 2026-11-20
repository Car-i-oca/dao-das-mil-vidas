import type { Effects, State } from '../../../types';
import type { Alcunha, Eixo, ReacaoAlcunha } from '../tipos';

type Op = [texto: string, res: string, fx?: Effects];
const reacao = (id: string, titulo: string, texto: string, ops: Op[]): ReacaoAlcunha => ({ id, titulo, texto, opcoes: ops.map(([t, res, fx]) => ({ texto: t, res, fx })) });
const flag = (s: State, ...fl: string[]) => fl.some((x) => s.flags.includes(x));
/** O fio do mundo (v2) terminou com um destes desfechos? */
const fio = (s: State, id: string, ...desfechos: string[]) => !!s.v2?.mundo.fios.some((x) => x.id === id && x.estado === 'resolvido' && x.desfecho && desfechos.includes(x.desfecho));

const puro = (eixo: Eixo, id: string, m: string, fm: string, historia: string, epilogo: string, dica: string, reacoes: ReacaoAlcunha[], extra: Partial<Alcunha> = {}): Alcunha =>
  ({ id, m, f: fm, eixos: [eixo], historia, epilogo, dica, reacoes, ...extra });

/** Alcunhas do Xianxia: imortais, seitas, Dao. Eixos e limiares em docs/alcunhas.md. */
export const ALCUNHAS_XIANXIA: Alcunha[] = [
  puro('compaixao', 'xx_compassivo', 'o Imortal Compassivo', 'a Imortal Compassiva',
    'Dizem que, onde ele passa, as doenças recuam e as dívidas se acalmam, e que ele nunca pediu nada em troca.',
    'Os registros das seitas listam {alcunha} entre os que subiram devagar, parando para estender a mão. Nos vilarejos, o nome virou um tipo de proverbio: «Peça como se {alcunha} ouvisse», diziam, e muitas vezes ouvia.',
    'Quem sobe estendendo a mão chega mais devagar e é lembrado por mais gente.',
    [reacao('praga', 'A vila que adoece', 'Uma vila sem seita protetora adoece em silêncio, e as crianças são as primeiras a cair. Alguém, sabendo quem «{alcunha}» é, vem buscar socorro a cavalo, sem pedir prêmio.', [
      ['Ir sem demora, gastando pílulas e Qi.', 'Você fica quinze dias entre febres e panos. A vila se recupera, e o seu cultivo atrasa. O nome, nessa vila, passa a ser dito com a boca baixa.', { karma: 4, pedras: -40, stats: { dao: 1 } }],
      ['Mandar pílulas e instruções, sem ir pessoalmente.', 'A vila se recupera pela metade. Você mantém o ritmo do cultivo e a dívida de saber o que poderia ter feito.', { karma: 1, pedras: -15 }],
    ]),
    reacao('devedor', 'O homem que voltou para pagar', 'Um mercador grisalho atravessa três províncias para devolver a «{alcunha}» uma bolsa de pedras espirituais. Diz que, vinte anos atrás, recebeu remédio de graça e prometeu que um dia pagaria. A bolsa pesa mais do que tudo o que você deu.', [
      ['Recusar a bolsa e pedir que ele cure alguém no seu lugar.', 'O mercador chora, discute e, por fim, aceita. Anos depois, chega notícia de uma casa de remédios numa estrada pobre, com o seu nome escrito na porta sem que você tenha pedido.', { karma: 3, fama: 2 }],
      ['Aceitar, para que a promessa dele possa terminar.', 'Ele vai embora mais leve, como quem tira um peso das costas. Você descobre que deixar alguém pagar também é uma forma de bondade, e o cultivo agradece as pedras.', { pedras: 50, karma: 1, stats: { car: 1 } }],
    ]),
    reacao('ingrato', 'A mão mordida', 'Um discípulo de seita que você salvou de uma tribulação agora espalha que «{alcunha}» o curou só para ter um devedor. Há quem acredite. A acusação chega antes de você em cada cidade.', [
      ['Procurá-lo e perguntar, sem testemunhas, o que o machucou.', 'Ele não esperava a pergunta. Por trás da mentira há vergonha: precisou de ajuda diante de toda a seita. A calúnia para, não por medo, mas porque ele ficou sem raiva.', { karma: 2, stats: { dao: 1 } }],
      ['Deixar que os curados falem por você.', 'Leva um ano, mas as vilas respondem por você, uma a uma. O discípulo some dos salões. A fama volta maior, e com ela uma pequena desconfiança de quem cura demais.', { fama: 4 }],
    ])], { contra: ['violencia', 'ganancia'], infame: { m: 'o Santo Ingênuo', f: 'a Santa Ingênua' } }),
  puro('violencia', 'xx_carrasco', 'o Carrasco de Nuvens', 'a Carrasca de Nuvens',
    'Dizem que as nuvens se afastam antes de ele chegar, como quem sabe o que vai acontecer.',
    'Os registros de {alcunha} são curtos: uma lista de nomes riscados, uma lista de datas. Ninguém, nas seitas, soube dizer se havia prazer ou dever no que fez. Mas todos concordam que a lista era pontual.',
    'Quem resolve tudo à força é lembrado pelo que sobrou.',
    [reacao('prova', 'O desafio nas nuvens', 'Um jovem prodígio de uma seita menor sobe até as nuvens para provar que pode vencer «{alcunha}» num duelo marcado, diante dos anciãos.', [
      ['Vencer rápido e sem humilhar.', 'O jovem cai uma vez e agradece. Os anciãos, sem querer, passam a citar você como exemplo de contenção.', { fama: 3, karma: 1 }],
      ['Vencer devagar, para que todos vejam.', 'A plateia treme. O jovem nunca mais sobe àquelas nuvens. O nome fica mais curto e mais pesado.', { fama: 5, karma: -3, stats: { fis: 1 } }],
    ]),
    reacao('viuva', 'A viúva que não chora', 'Uma mulher de luto espera por «{alcunha}» à beira da estrada. O marido dela está numa daquelas listas de nomes riscados. Ela não ameaça e não chora: só quer saber se ele implorou no fim.', [
      ['Dizer a verdade, seja qual for.', 'Você conta como foi. Ela escuta até o fim, agradece com uma reverência curta e vai embora. Naquela noite, a meditação não vem, e o Qi fica pesado como ferro molhado.', { karma: 1, corr: -2, stats: { esp: -1 } }],
      ['Dizer que ele morreu sem medo, mesmo que não seja verdade.', 'A mentira sai fácil, e isso assusta mais do que a pergunta. A mulher acredita, ou finge. Você descobre que também sabe ter misericórdia, desde que custe pouco.', { karma: -1, fama: 1 }],
    ]),
    reacao('contrato', 'O nome na lista', 'Um emissário de seita traz a «{alcunha}» um contrato selado e uma bolsa pesada. O nome é de um ancião rival, poderoso e respeitado. O pagamento é alto demais para ser honesto.', [
      ['Recusar e devolver o selo à seita que mandou.', 'A recusa vira notícia: há coisas que nem o carrasco faz. A seita que encomendou passa a odiar você em silêncio, e a do ancião passa a respeitá-lo em voz alta.', { fama: 3, karma: 2 }],
      ['Aceitar o contrato e cumpri-lo sem perguntas.', 'O ancião cai numa manhã de neve. O pagamento é real, e o nome na lista agora é seu também, na lista de outra pessoa. Você dorme de costas para a parede.', { pedras: 90, karma: -4, corr: 4, fama: 2 }],
    ])], { contra: ['compaixao'], infame: { m: 'o Açougueiro Celeste', f: 'a Açougueira Celeste' } }),
  puro('astucia', 'xx_tecelao', 'o Tecelão de Mil Planos', 'a Tecelã de Mil Planos',
    'Dizem que quando duas seitas se desentendem, existe um fio na mão dele que ainda não foi puxado.',
    'Nenhum plano de {alcunha} foi escrito. Todos foram feitos de conversas curtas e favores sem recibo. Quando as seitas finalmente fizeram as pazes, a história oficial não tinha o nome dele em lugar nenhum, e foi assim que ele quis.',
    'Quem prevê três jogadas à frente é lembrado só pelas jogadas que os outros não viram.',
    [reacao('arbitro', 'A paz que alguém pagou', 'Duas seitas em tensão procuram «{alcunha}» para arbitrar em segredo uma disputa de minas espirituais.', [
      ['Arbitrar e cobrar uma parte da mina.', 'As duas seitas aceitam a divisão, contrariadas. Você sai com uma parte da mina e um nome mais conhecido do que desejava.', { pedras: 60, fama: 2 }],
      ['Arbitrar de graça e exigir uma testemunha neutra.', 'A testemunha incomoda as duas e protege as duas. A paz dura mais do que as minas.', { karma: 2, fama: 3 }],
    ]),
    reacao('fio_solto', 'O fio que alguém puxou', 'Um plano antigo de «{alcunha}» começa a desfazer-se: um mensageiro preso fala demais, e duas seitas que você aproximou descobrem que foram aproximadas. As duas querem saber quem teceu a rede.', [
      ['Assumir a autoria e explicar por que foi feito.', 'A franqueza desarma metade da raiva. A outra metade fica, mas agora tem rosto e endereço. As seitas mantêm a paz, de má vontade, porque o motivo era bom demais para ser jogado fora.', { fama: 2, karma: 1, stats: { car: 1 } }],
      ['Desviar a culpa para um intermediário que já morreu.', 'O morto não reclama. As seitas se acalmam e você guarda mais um segredo na manga. Mas um dos discípulos do morto começa a fazer perguntas, e ele é paciente.', { pedras: 20, karma: -2, stats: { comp: 1 } }],
    ]),
    reacao('aprendiz', 'A aprendiz de redes', 'Uma jovem estrategista de seita menor pede a «{alcunha}» que lhe ensine a tecer planos. Ela é brilhante e ambiciosa demais, e você reconhece no olhar dela o seu de muitos anos atrás.', [
      ['Ensinar tudo, inclusive o que não se deve fazer.', 'Ela aprende rápido e, um dia, usa um dos seus truques contra você, com elegância. Naquela noite você ri a sós: o ofício sobreviveu ao mestre.', { karma: 1, fama: 2, stats: { comp: -1 } }],
      ['Ensinar só a metade e guardar os fios mais finos.', 'Ela percebe a metade que falta e não perdoa. Vai embora com metade do ofício e uma inteira vontade de descobrir o resto. Você mantém a vantagem, e uma rival em formação.', { pedras: 15, stats: { comp: 1 } }],
    ])]),
  puro('cautela', 'xx_prudente', 'o Passo Prudente', 'a Sombra Prudente',
    'Dizem que olha o céu três vezes antes de abrir a janela, e que por isso ainda tem janela.',
    'Os que subiram mais depressa já não estavam lá para ver {alcunha} passar por eles, devagar, no décimo século. A fama dele era curta e o nome era comprido: durou mais.',
    'Quem recua no momento certo vive para escolher outro momento.',
    [reacao('armadilha', 'O tesouro fácil demais', 'Um mapa de tesouro cai nas mãos de «{alcunha}» com uma facilidade suspeita. A recompensa é grande, o aviso é nenhum.', [
      ['Investigar o mapa durante semanas antes de agir.', 'Quando você acaba, o tesouro já foi tomado por outro. Mas o mapa era falso, e você é o único que sabe disso.', { stats: { comp: 1 }, fama: 1 }],
      ['Mandar um servo na frente.', 'O servo volta vivo e com um fragmento do tesouro. A armadilha era para quem fosse pessoalmente, e você vê as marcas na pedra.', { pedras: 40, karma: -1 }],
    ]),
    reacao('pressa', 'O amigo apressado', 'Um velho companheiro de cultivo convida «{alcunha}» para invadir junto uma ruína recém-descoberta, antes que as grandes seitas cheguem. Ele tem um mapa, um prazo e nenhum plano de saída.', [
      ['Ir junto, mas exigir a sua própria rota de fuga.', 'A ruína desaba no terceiro salão. O seu túnel de saída salva os dois. O amigo não agradece: diz que, sem a sua demora, teriam chegado ao quarto salão. Mas ele está vivo para reclamar.', { pedras: 30, karma: 1, ferida: 1 }],
      ['Recusar e esperar notícias.', 'Ele volta com um artefato e uma cicatriz. Diz que você perdeu a chance da vida. Talvez. No ano seguinte, a mesma ruína engole três expedições que seguiram o mapa dele.', { stats: { esp: 1 }, fama: 1 }],
    ]),
    reacao('covarde', 'O apelido que dói', 'Numa casa de chá, jovens de seita riem de «{alcunha}» e dizem que é covardia nunca ter enfrentado uma tribulação de frente. Um deles desafia você ali mesmo, diante de todos.', [
      ['Aceitar o desafio, mas escolher o terreno e a hora.', 'Você marca o duelo para o amanhecer, num campo que conhece pedra por pedra. O jovem chega cansado e vai embora humilhado sem um arranhão. Ninguém mais ri, pelo menos em voz alta.', { fama: 3, stats: { comp: 1 } }],
      ['Pagar o chá de todos e ir embora.', 'Os jovens riem mais alto. Você não ouve. Dez anos depois, dois deles estão mortos em duelos de orgulho, e o terceiro vem pedir conselho.', { pedras: -5, karma: 2 }],
    ])]),
  puro('ambicao', 'xx_faminto', 'o Faminto de Céu', 'a Faminta de Céu',
    'Dizem que a cada reino que alcança olha o próximo como se já o tivesse perdido.',
    'Subiu mais depressa que seus rivais e deixou, atrás, mais amigos do que aprendizes. Quando {alcunha} chegou ao reino mais alto que o corpo suportava, descobriu que o céu tinha mais degraus do que o tempo.',
    'Quem quer sempre o próximo reino raramente descansa no atual.',
    [reacao('convite', 'O assento do Ancião', 'Uma seita enfraquecida oferece a «{alcunha}» o assento de Ancião, com a condição de assumir o passivo do último ocupante.', [
      ['Aceitar o assento e o passivo.', 'O assento é seu. O passivo também. Em um ano, você entende por que o último ocupante nunca voltou para visitar.', { fama: 6, pedras: -60, stats: { car: 1 } }],
      ['Aceitar apenas depois de renegociar o passivo.', 'A seita cede metade. Você assume com menos peso e mais inimigos entre os que queriam o assento.', { fama: 3, pedras: -20 }],
    ]),
    reacao('irmao_deixado', 'O irmão de juramento', 'Um antigo irmão de juramento, que ficou para trás nos primeiros reinos, encontra «{alcunha}» num salão de seita. Está velho, preso no mesmo degrau há décadas, e pede uma pílula que talvez o leve adiante. É a pílula que você guardava para o próprio rompimento.', [
      ['Entregar a pílula e adiar o próprio passo.', 'Ele rompe na semana seguinte e chora como criança. O seu cultivo espera mais um inverno. Pela primeira vez em muito tempo, você olha para o degrau atual sem pressa.', { karma: 4, stats: { dao: 1, comp: -1 } }],
      ['Recusar: o céu não espera por ninguém.', 'Ele entende, ou diz que entende. Você rompe no mês seguinte, mais forte do que nunca. No ano em que ele morre de velhice, ninguém se lembra de avisar você.', { karma: -2, stats: { esp: 1 }, corr: 2 }],
    ]),
    reacao('heranca_de_ceu', 'O degrau comprado', 'Um velho cultivador moribundo oferece a «{alcunha}» todo o Qi acumulado em mil anos, num ritual de transferência. Pede só uma coisa em troca: que você cuide do neto dele, um menino sem talento algum.', [
      ['Aceitar o Qi e cuidar do menino de verdade.', 'O Qi entra como um rio de inverno. O menino cresce na sua sombra, sem talento e sem medo. É a primeira coisa na sua vida que você não pode subir: só acompanhar.', { stats: { dao: 1, car: 1 }, karma: 2, pedras: -30 }],
      ['Aceitar o Qi e deixar o menino aos cuidados de uma seita.', 'O Qi é seu. O menino recebe uma vaga, uma cama e nenhuma visita. Você manda pedras todo ano, pontualmente, como quem paga uma dívida sem olhar o credor.', { stats: { dao: 1 }, pedras: -20, karma: -1 }],
    ])], { contra: ['compaixao'] }),
  puro('disciplina', 'xx_rocha', 'o Monte Imóvel', 'a Rocha Imóvel',
    'Dizem que medita no mesmo ponto desde antes de a trilha ser aberta.',
    'Os discípulos mudaram, as seitas mudaram de nome. {alcunha} continuou na mesma pedra, e a trilha, aos poucos, passou a desviar dela. Alguns diziam que foi a pedra que ficou, e outros, que foi o mundo que passou.',
    'Quem repete sem cansar vira ponto fixo.',
    [reacao('visita', 'A visita de um Patriarca', 'Um Patriarca, de passagem, observa «{alcunha}» meditar uma tarde inteira e diz que, com outro método, a mesma disciplina renderia o dobro.', [
      ['Ouvir o método e adotar o que servir.', 'O Patriarca sorri. Algumas partes do método servem; outras não. Você aprende a diferença sem perder a pedra.', { stats: { comp: 1, dao: 1 } }],
      ['Convidar o Patriarca a sentar ao lado, sem falar.', 'Ele aguenta até o fim da tarde, e sai calado. Manda um discípulo seu estudar com você, sem dizer o motivo.', { fama: 3 }],
    ]),
    reacao('enchente', 'A água que sobe', 'Uma enchente desce a montanha e vai cobrir a pedra onde «{alcunha}» medita há décadas. Os aldeões de baixo gritam para que você saia. A água já toca os joelhos.', [
      ['Não sair do lugar e deixar o Qi segurar a água.', 'A água passa ao redor como se a pedra tivesse ombros. Quando baixa, a aldeia está inteira atrás de você. Ninguém sabe se foi o Qi ou a teimosia, e você também não.', { fama: 4, karma: 2, ferida: 1 }],
      ['Levantar, pela primeira vez em anos, e ajudar a carregar os velhos.', 'As pernas estalam como galhos secos. Você carrega onze pessoas morro acima. A pedra some sob a lama, e, pela primeira vez, você medita em outro lugar e descobre que o lugar não importava.', { karma: 3, stats: { fis: 1, dao: -1 } }],
    ]),
    reacao('discipulo_impaciente', 'O discípulo que não aguenta esperar', 'Um rapaz senta ao lado de «{alcunha}» todos os dias, há um ano, esperando uma lição. Hoje, desesperado, ele pergunta se ficar parado também é um método ou só uma desculpa.', [
      ['Responder com uma única frase e voltar ao silêncio.', '"Fique mais um ano e me diga." Ele fica. No fim do segundo ano, não pergunta mais nada: só respira no mesmo ritmo que você. Alguém, na aldeia, começa a chamá-lo de pedra pequena.', { karma: 1, stats: { dao: 1 } }],
      ['Explicar, pela primeira vez, o que a quietude ensinou.', 'As palavras saem enferrujadas e, mesmo assim, úteis. O rapaz vai embora no dia seguinte, com um método que não é o seu e cabe nele. Você fica com a estranha sensação de ter falado demais.', { fama: 2, stats: { car: 1 } }],
    ])]),
  puro('devocao', 'xx_devoto', 'o Devoto do Dao', 'a Devota do Dao',
    'Dizem que reza pelas manhãs diante de uma pedra lisa, e que as manhãs, ali, são mais longas.',
    'Houve seitas mais poderosas, mas poucas tão fiéis. Quando {alcunha} morreu, a pedra lisa onde rezava foi encontrada rachada ao meio, e ninguém soube dizer se era um sinal ou um cansaço.',
    'Quem se agarra ao rito o carrega até o fim.',
    [reacao('rito', 'O altar abandonado', 'Numa montanha deserta, um altar antigo está sem ninguém para cuidar. «{alcunha}» é chamado para decidir se vale a pena reabri-lo.', [
      ['Reabrir o altar e mantê-lo em pessoa.', 'Anos depois, peregrinos sobem a montanha, e você é, outra vez, o guardião de um lugar que ninguém lembrava.', { karma: 3, fama: 2, stats: { dao: 1 } }],
      ['Reabrir o altar e entregá-lo a uma família local.', 'A família assume, com orgulho e atrapalhos. O altar vive, e o seu nome continua nele, como uma nota de rodapé.', { karma: 2 }],
    ]),
    reacao('falso_milagre', 'O milagre de encomenda', 'Um templo rico oferece a «{alcunha}» uma fortuna para presidir uma cerimônia em que uma estátua vai "chorar" diante dos fiéis. O truque é de cera e água morna, e os fiéis são pobres.', [
      ['Recusar e contar aos fiéis como o truque funciona.', 'O templo perde metade dos fiéis e ganha um inimigo para sempre. Os pobres voltam a rezar em casa, diante de pedras comuns. Dizem que as manhãs lá ficaram mais longas também.', { karma: 3, fama: 1, pedras: -10 }],
      ['Recusar em silêncio e ir embora.', 'A estátua chora sem você. O templo enriquece, os fiéis empobrecem, e você reza com mais força do que nunca, sabendo que reza também por omissão.', { karma: 1, stats: { dao: 1 } }],
    ]),
    reacao('duvida', 'A noite sem resposta', 'Depois de décadas de rito, numa noite comum, a reza de «{alcunha}» não encontra nada do outro lado. Nenhum calor, nenhuma presença. Só o vento e a pedra lisa, fria.', [
      ['Rezar mesmo assim, até o amanhecer.', 'O amanhecer vem sem resposta. Você continua no dia seguinte, e no outro. A fé deixa de ser conversa e vira hábito, e o hábito, para sua surpresa, aguenta peso maior.', { stats: { dao: 2 }, karma: 1 }],
      ['Parar e perguntar a um monge velho se isso é normal.', 'Ele ri sem dentes. "Acontece com todo mundo que reza de verdade. Com os outros, nunca." A conversa dura até a madrugada, e você volta para a pedra mais leve, com um amigo novo.', { stats: { car: 1, esp: 1 } }],
    ])]),
  puro('ganancia', 'xx_cofre', 'o Cofre Sem Fundo', 'a Bolsa Sem Fundo',
    'Dizem que já pagou três vezes pelo mesmo tesouro e ainda assim saiu com lucro.',
    'Os livros-caixa de {alcunha} eram os únicos que as seitas aceitavam como prova. Nunca perdoou uma dívida, nunca deu uma esmola. Mas foi também o único a guardar o preço exato de cada favor, e a lista, no fim, foi lida em voz alta.',
    'Quem conta tudo acaba contado.',
    [reacao('divida', 'A seita falida', 'Uma seita falida vem pedir a «{alcunha}» um empréstimo para não fechar. Os discípulos esperam no pátio, em silêncio.', [
      ['Emprestar com garantia de uma mina.', 'A seita sobrevive, e a mina passa a ser sua. Os discípulos agradecem e passam a desviar o olhar quando você chega.', { pedras: 60, karma: -2 }],
      ['Emprestar sem garantia, uma única vez.', 'A seita paga, com atraso e com juros inesperados de lealdade. O nome ganha uma fenda por onde entra luz.', { pedras: -30, karma: 3, fama: 2 }],
    ]),
    reacao('auditoria', 'O livro que não fecha', 'Os livros-caixa de «{alcunha}», famosos por serem exatos, mostram uma diferença de três pedras espirituais. É pouco, mas nunca aconteceu. Alguém da casa está roubando, ou alguém de fora quer que você pense isso.', [
      ['Revirar cada conta até achar as três pedras.', 'Leva um mês. As pedras estavam numa doação esquecida a um órfão, feita por você mesmo numa noite de inverno e de vinho demais. Você não comenta com ninguém, e deixa a conta aberta.', { karma: 2, stats: { comp: 1 } }],
      ['Demitir o contador mais novo e encerrar o assunto.', 'O livro volta a fechar. O contador vai embora sem protestar, o que é estranho. Um ano depois, ele abre um negócio próprio a duas ruas da sua casa, com clientes que antes eram seus.', { pedras: 10, karma: -2, fama: -1 }],
    ]),
    reacao('herdeiro_pobre', 'O primo de sangue', 'Um primo distante bate à porta de «{alcunha}» com três filhos e nenhuma pedra. Não pede esmola: oferece trabalho em troca de abrigo. Os filhos olham para os cofres como quem olha para o céu.', [
      ['Contratar o primo pelo preço de mercado, sem desconto nem favor.', 'Ele trabalha melhor do que qualquer contratado. Os filhos crescem contando moedas com você. Ninguém chama isso de bondade, nem você, mas a casa fica cheia pela primeira vez.', { pedras: -15, karma: 2, stats: { car: 1 } }],
      ['Emprestar uma quantia com juros e mandá-lo procurar trabalho em outra cidade.', 'O primo paga cada pedra, com juros, em seis anos. A última parcela chega com uma carta curta: "Quitado." Você guarda a carta no cofre, junto com as pedras.', { pedras: 25, karma: -1 }],
    ])], { contra: ['compaixao'], infame: { m: 'o Sanguessuga das Seitas', f: 'a Sanguessuga das Seitas' } }),

  { id: 'xx_pune_protege', m: 'o Braço que Pune para Proteger', f: 'a Mão que Pune para Proteger', eixos: ['compaixao', 'violencia'],
    historia: 'Dizem que os fracos dormem melhor quando ela está por perto, e que os fortes, pior.',
    epilogo: 'Ninguém negava a dureza de {alcunha}. Os protegidos diziam que a dureza era o único jeito que funcionava; os punidos diziam o mesmo, mais baixo.',
    dica: 'A ternura e a força juntas pesam mais que separadas.',
    reacoes: [reacao('queixa', 'A seita que oprime', 'Uma seita menor pede a «{alcunha}» que expulse de suas terras um clã que a explora. O clã tem crianças em casa.', [
      ['Expulsar o clã e garantir abrigo às crianças.', 'O clã vai embora, sem as crianças, que crescem na seita. Alguns dizem que foi justo, outros que foi cruel, e você sabe que foi os dois.', { karma: 2, fama: 3 }],
      ['Expulsar o clã e deixar o resto ao tempo.', 'A seita se recupera. Você segue, sentindo que terminou o trabalho pela metade.', { fama: 2 }],
    ])] },
  { id: 'xx_arquiteto', m: 'o Arquiteto de Tronos', f: 'a Arquiteta de Tronos', eixos: ['astucia', 'ambicao'],
    historia: 'Dizem que três líderes de seita devem seus assentos a uma conversa na casa de chá.',
    epilogo: 'Nenhum trono tem o nome de {alcunha} gravado. Mas todos os que subiram nos últimos cem anos passaram por uma sala em que ele tinha estado, antes, com um bule de chá e uma pergunta.',
    dica: 'Planejar e querer, juntos, constroem o que os outros só herdam.',
    reacoes: [reacao('pretendente', 'O pretendente ao trono', 'Um jovem pretendente a Patriarca procura «{alcunha}» pedindo uma estratégia para tomar o assento sem guerra.', [
      ['Montar a estratégia e cobrar um favor futuro.', 'O jovem sobe. Você tem agora um aliado que lhe deve, e um perigo adormecido que também lhe deve.', { fama: 3, pedras: 30 }],
      ['Recusar e avisar o Patriarca atual.', 'O Patriarca agradece, e você ganha o direito de ser ouvido quando ele estiver em dúvida. O jovem desaparece, e os dois lados lembram.', { karma: 2, fama: 2 }],
    ])] },
  { id: 'xx_eremita_jade', m: 'o Eremita de Jade', f: 'a Eremita de Jade', eixos: ['disciplina', 'devocao'],
    historia: 'Dizem que o jade da cabana dele sempre brilha, e que o jade nunca foi limpo.',
    epilogo: 'Poucos viram {alcunha} em carne. Muitos viram a luz verde da cabana, de longe, e voltaram para casa mais calmos sem saber o motivo.',
    dica: 'O rito e a rotina, juntos, afiam o silêncio.',
    reacoes: [reacao('visita', 'O discípulo na porta', 'Um discípulo de uma grande seita sobe até a cabana de «{alcunha}» pedindo para ficar um ano como servente, sem dizer por quê.', [
      ['Aceitá-lo, e deixá-lo varrer sem perguntas.', 'Ele varre por um ano. No fim, vai embora calado e mais velho. A seita dele passa a perguntar que mestre o ensinou.', { karma: 2, stats: { dao: 1 } }],
      ['Recusar com gentileza e indicar um templo vizinho.', 'Ele agradece e parte. Você mantém o silêncio, e o silêncio, por um tempo, parece menos inteiro.', { karma: 1 }],
    ])] },
  { id: 'xx_tigre', m: 'o Tigre que Espera', f: 'a Tigresa que Espera', eixos: ['cautela', 'astucia'],
    historia: 'Dizem que nunca ataca primeiro, e que mesmo assim ninguém lembra de tê-lo visto perder.',
    epilogo: 'Quem estudou os duelos de {alcunha} concluiu que ele não vencia por força, mas por tempo. Esperava o erro do outro com a mesma calma com que a neve espera o sol.',
    dica: 'Esperar com cuidado vale mais que atacar com força.',
    reacoes: [reacao('provoca', 'A provocação pública', 'Um cultivador famoso provoca «{alcunha}» publicamente, para forçá-lo a um duelo que ele teria vantagem em vencer.', [
      ['Ignorar a provocação e deixar que o cultivador se canse.', 'Ele grita por três dias e depois cai em desgraça por falta de resposta. Você ganha a reputação de quem não precisa responder.', { fama: 3 }],
      ['Aceitar o duelo e escolher o lugar e a hora.', 'Você escolhe uma hora em que ele está cansado. Vence sem pressa, e a plateia, sem entender, acha que foi magia.', { fama: 4, karma: -1 }],
    ]),
    reacao('emboscada', 'A emboscada paciente', 'Inimigos antigos montam uma armadilha para «{alcunha}» com a mesma arma que você sempre usou: tempo. Há semanas um vigia segue os seus passos, sem atacar, esperando um descuido.', [
      ['Fingir o descuido e escolher onde ele vai acontecer.', 'Você deixa a guarda baixa numa ponte estreita, onde só cabe um de cada vez. Eles vêm em fila. Ao fim, o vigia é o único de pé, e corre para contar aos outros que o tigre não dorme.', { fama: 3, stats: { comp: 1 }, ferida: 1 }],
      ['Mudar de cidade e de rotina, e deixar que eles se cansem.', 'Leva um ano. O vigia desiste antes dos patrões. Você perde clientes, conforto e um pouco do orgulho, mas ganha uma vida inteira para escolher outro momento.', { stats: { esp: 1 }, pedras: -20 }],
    ]),
    reacao('ataque_primeiro', 'A única exceção', 'Uma criança da aldeia é levada por bandidos que vão cruzar a fronteira ao amanhecer. Esperar o erro deles, como você sempre fez, significa perder a criança. «{alcunha}» precisa atacar primeiro, pela primeira vez.', [
      ['Atacar agora, de frente, sem plano.', 'É feio, rápido e funciona. A criança volta. Você volta com um corte no rosto e a certeza de que a sua calma era uma escolha, não uma natureza.', { karma: 3, ferida: 2, fama: 2 }],
      ['Gastar uma hora preparando o terreno, mesmo com o risco.', 'A hora custa caro: um dos bandidos foge com metade do resgate. Mas a criança volta inteira, e nenhum aldeão se fere. Você não sabe se foi prudência ou medo, e decide que não importa.', { karma: 2, stats: { comp: 1 } }],
    ])] },
  { id: 'xx_conquistador', m: 'o Conquistador de Picos', f: 'a Conquistadora de Picos', eixos: ['violencia', 'ambicao'],
    historia: 'Dizem que cada pico que sobe, ele muda o nome da seita que o ocupava.',
    epilogo: 'Cinco picos mudaram de bandeira nas mãos de {alcunha}. Nenhum voltou ao antigo nome. Os jovens que cresceram sob a nova ordem não sabem que havia outra.',
    dica: 'Querer e vencer, juntos, redesenham o mapa.',
    reacoes: [reacao('rendicao', 'A seita que se rende', 'Uma seita cercada manda um mensageiro oferecer a «{alcunha}» a rendição incondicional, em troca de uma única exigência: poupar os aprendizes.', [
      ['Aceitar a rendição e poupar os aprendizes.', 'A seita se dissolve em silêncio. Os aprendizes se espalham, e anos depois dois deles voltarão como aliados.', { karma: 2, fama: 4 }],
      ['Aceitar a rendição e não prometer nada.', 'A seita entrega as chaves. O silêncio que se segue pesa mais do que a vitória.', { fama: 5, karma: -3 }],
    ])] },
  { id: 'xx_bodisatva', m: 'o Bodhisattva de Estrada', f: 'a Bodhisattva de Estrada', eixos: ['compaixao', 'devocao'],
    historia: 'Dizem que adiou o próprio avanço por três séculos para acompanhar quem ainda não conseguia andar.',
    epilogo: 'Os templos de {alcunha} nunca tiveram teto bonito. Tinham, no entanto, uma tigela sempre cheia na porta, e quem comia nunca pagava, e quem pagava era sempre servido primeiro.',
    dica: 'Cuidar e rezar, juntos, formam um tipo de santo sem altar.',
    reacoes: [reacao('adiar', 'A porta para o próximo reino', 'A porta para o próximo reino se abre diante de «{alcunha}», exatamente quando uma vila inteira precisa de abrigo para o inverno.', [
      ['Adiar o avanço e abrigar a vila.', 'A porta se fecha por uma década. A vila sobrevive ao inverno, e o seu nome entra numa oração que as crianças aprendem antes de aprender a ler.', { karma: 5, fama: 3, stats: { dao: 1 } }],
      ['Avançar e deixar a vila com recursos.', 'A porta se abre. A vila sobrevive, parcialmente, e você sente, ao atravessar, o peso exato do que poderia ter feito.', { karma: 1, pedras: -50 }],
    ])] },

  { id: 'xx_sino', m: 'o Guardião do Sino', f: 'a Guardiã do Sino', feito: (s) => s.age >= 40 && flag(s, 'sino_encerrado', 'sino_segredo', 'monge_amigo'),
    historia: 'Dizem que guarda um sino de bronze verde que não tem badalo e que, mesmo assim, toca.',
    epilogo: 'Muitos acharam que {alcunha} era dono de uma relíquia. Os que o conheciam de perto sabiam que era o contrário: o sino é que era dono do tempo que ele tinha.',
    dica: 'Quem encontra algo pequeno aos seis anos pode carregá-lo a vida inteira.',
    reacoes: [reacao('peregrino', 'O peregrino do sino', 'Um peregrino chega à porta de «{alcunha}» perguntando se é verdade que existe um sino sem badalo que toca para quem deve ao céu.', [
      ['Levá-lo até o sino, sem dizer nada.', 'O sino não toca. O peregrino chora mesmo assim. Quando vai embora, deixa na soleira uma pedra lisa, que você guarda.', { karma: 2, stats: { esp: 1 } }],
      ['Negar que o sino exista.', 'Ele acredita, ou finge. O sino, atrás da porta, esquenta um pouco, como quem protesta.', { karma: -1 }],
    ])] },
  { id: 'xx_ouve_sino', m: 'o que Ouve o Sino', f: 'a que Ouve o Sino', feito: (s) => s.age >= 30 && flag(s, 'ouviu_chamado'),
    historia: 'Dizem que segue um tom grave que ninguém mais ouve, e que o tom sempre aponta para algum lugar.',
    epilogo: 'O tom que {alcunha} ouviu a vida inteira parou no dia em que ele chegou ao lugar certo. Ninguém soube explicar qual era. Quem estava presente jurou ter ouvido o bronze, uma vez, bem baixo.',
    dica: 'Quem segue um som fraco acaba conhecendo o lugar de onde ele vem.',
    reacoes: [reacao('rumo', 'Duas direções', 'O tom que «{alcunha}» ouve se divide em duas direções: uma aponta para uma montanha, a outra para uma vila onde alguém espera sem saber por quê.', [
      ['Seguir para a montanha.', 'Você encontra uma pedra lisa e um velho que não pergunta nada. Fica três anos, e aprende o que não sabia nomear.', { stats: { esp: 2, dao: 1 } }],
      ['Seguir para a vila.', 'Alguém espera mesmo, com uma xícara fria e uma pergunta antiga. A resposta muda duas vidas.', { karma: 3, fama: 1 }],
    ])] },
  { id: 'xx_cobrador_cla', m: 'o Cobrador do Clã', f: 'a Cobradora do Clã', feito: (s) => fio(s, 'cla', 'vingado'), infame: { m: 'a Conta Fechada em Sangue', f: 'a Conta Fechada em Sangue' },
    historia: 'Dizem que prometeu, ainda criança, de pé na porta de casa, e cumpriu todas as palavras.',
    epilogo: 'A casa de {alcunha} continuou de pé, mas silenciosa. Um juramento cumprido não faz barulho. Os vizinhos diziam que ele dormia em paz; ninguém sabia dizer se era verdade.',
    dica: 'Quem jura cedo muito carrega pouco, e depois, nada.',
    reacoes: [reacao('herdeiro', 'O herdeiro do culpado', 'O filho de quem você vingou aparece, adulto, com os olhos do pai e uma pergunta: o que o pai fez para merecer aquilo?', [
      ['Contar tudo, sem poupar o pai nem você.', 'Ele ouve até o fim, sem reagir. Ao final, agradece e vai embora sem jurar nada, e você não sabe se isso é paz ou o começo de outro ciclo.', { karma: 2, stats: { dao: 1 } }],
      ['Mandá-lo embora sem explicar.', 'Ele parte, e você sabe que o ciclo não acabou. A porta fica trancada por mais uma década.', { karma: -2 }],
    ])] },
  { id: 'xx_restaurador', m: 'o Restaurador do Clã', f: 'a Restauradora do Clã', feito: (s) => fio(s, 'cla', 'reerguido', 'perdoado'),
    historia: 'Dizem que o nome da família dele, que abria portões antigamente, voltou a abri-los.',
    epilogo: 'Quando {alcunha} morreu, o nome do clã estava num cartaz, numa pedra e na boca de uma criança que o soletrava no mercado. Era o que ele queria. Não pediu mais.',
    dica: 'Reerguer um nome é um trabalho longo e silencioso.',
    reacoes: [reacao('rival', 'O primo que não perdoa', 'Um parente distante, que se afastou do clã na ruína, volta agora que o nome vale de novo, exigindo a parte que acha que lhe cabe.', [
      ['Dar a parte e reintegrá-lo ao clã.', 'Ele aceita, com desconfiança. Em cinco anos, é o primeiro a defender o nome em público.', { karma: 2, fama: 2, pedras: -40 }],
      ['Recusar e lembrar quem ficou durante a ruína.', 'O parente sai em silêncio. O clã inteiro entende, sem dizer, o que isso custou a quem ficou.', { karma: 1, fama: 1 }],
    ])] },
  { id: 'xx_vencedor_pico', m: 'o Vencedor do Pico', f: 'a Vencedora do Pico', feito: (s) => fio(s, 'rival', 'venceu', 'poupado', 'reconciliado'),
    historia: 'Dizem que o rival dele subiu junto, e que, no final, só um chegou ao pico e voltou contando.',
    epilogo: 'A rivalidade de {alcunha} virou lenda com o tempo, de duas gerações para uma só. Os jovens perguntavam quem tinha ganhado; os velhos, que sabiam, diziam que quem restou perdeu mais.',
    dica: 'Quem supera o rival supera também o que o rival o fez ser.',
    reacoes: [reacao('estatua', 'A estátua do rival', 'Uma seita decide erguer uma estátua em homenagem ao seu antigo rival e convida «{alcunha}» à cerimônia.', [
      ['Comparecer e falar em honra do rival.', 'O discurso é curto e verdadeiro. A plateia, calada, entende que era o único que podia fazê-lo.', { karma: 2, fama: 3 }],
      ['Não comparecer e mandar uma oferenda.', 'A oferenda é lida por um aprendiz. Alguns notam a ausência, outros respeitam o silêncio.', { fama: 1 }],
    ])] },
  { id: 'xx_herdeiro_mestre', m: 'o Herdeiro do Mestre Sem Nome', f: 'a Herdeira do Mestre Sem Nome', feito: (s) => fio(s, 'mestre', 'herdeiro'),
    historia: 'Dizem que o mestre dele morreu sem dizer onde guardava o mais importante, e que o discípulo soube mesmo assim.',
    epilogo: 'A técnica de {alcunha} tinha uma pausa estranha no meio do movimento. Os discípulos achavam que era um erro. Os que conheciam a história sabiam que era uma homenagem a um mestre que ninguém conheceu.',
    dica: 'Quem herda de um mestre sem nome carrega duas vidas.',
    reacoes: [reacao('pergunta', 'O discípulo curioso', 'Um discípulo de «{alcunha}» pergunta, pela terceira vez, quem foi o mestre que o ensinou, e por que nunca se fala dele.', [
      ['Contar a história inteira.', 'O discípulo ouve em silêncio. Ao final, pede para aprender a pausa estranha do movimento e não reclama mais do ritmo.', { karma: 2, stats: { car: 1 } }],
      ['Dizer que o mestre pediu para não ser lembrado.', 'O discípulo aceita. A pausa continua, a dúvida também, e a lenda cresce sem ajuda.', { fama: 1 }],
    ])] },
  { id: 'xx_vulto_vermelho', m: 'o Vulto Vermelho', f: 'a Sombra Vermelha', feito: (s) => s.path === 'demoniaca' || flag(s, 'membro_demoniaca') || (s.corr ?? 0) >= 15, peso: 8, infame: { m: 'o Mensageiro do Sangue', f: 'a Mensageira do Sangue' },
    historia: 'Dizem que, nas noites de lua minguante, uma figura de manto escuro cruza os telhados das seitas.',
    epilogo: 'As seitas retas diziam que {alcunha} era um perigo. As seitas escondidas diziam que era um abrigo. Ninguém dizia nada em voz alta, e esse era o tamanho da fama.',
    dica: 'Quem escolhe o caminho do sangue, ou deixa que ele escolha, é visto de longe e nomeado de perto.',
    reacoes: [reacao('recusa', 'A porta que se fecha', 'Uma seita de reputação limpa recusa o pedido de abrigo de «{alcunha}» durante uma tempestade, citando as companhias que você manteve.', [
      ['Insistir pelo mérito, diante de todos.', 'A seita cede por vergonha. Você passa a noite sob o telhado deles, sentindo cada olhar como uma lâmina fina.', { fama: 2, karma: -1 }],
      ['Aceitar a recusa e buscar abrigo em outro lugar.', 'O outro lugar paga melhor e pergunta menos. Você sai com contatos novos e uma dívida que ainda não sabe medir.', { pedras: 40, karma: -2 }],
    ])] },
  { id: 'xx_mercador_pilulas', m: 'o Mercador de Pílulas', f: 'a Mercadora de Pílulas', eixos: ['ganancia'], trilha: ['alquimia'],
    historia: 'Dizem que as pílulas dele chegam a todas as seitas e que o preço sempre acompanha a necessidade.',
    epilogo: 'O caldeirão de {alcunha} tinha um segredo e uma tabela de preços. Os dois eram lidos por pouca gente. Os que leram entenderam que a fortuna dele começava onde acabava o desespero dos outros.',
    dica: 'Quem refina remédios aprende o preço de cada dor.',
    reacoes: [reacao('epidemia', 'A pílula e o preço', 'Uma epidemia atinge três seitas ao mesmo tempo, e só «{alcunha}» tem estoque suficiente da pílula que a combate.', [
      ['Vender a preço de custo, anotando tudo no livro.', 'As seitas pagam em dia e passam a recomendar você a todas. Você ganha menos, mas ganha em outra moeda.', { karma: 3, fama: 3, pedras: 10 }],
      ['Vender ao preço de mercado, que explode.', 'A fortuna cresce. A epidemia passa. O nome, depois, é dito com um tom diferente.', { pedras: 120, karma: -4, fama: -2 }],
    ])], infame: { m: 'o Usurário de Pílulas', f: 'a Usurária de Pílulas' } },
  { id: 'xx_lamina', m: 'o Gume que Não Volta', f: 'a Lâmina que Não Volta', eixos: ['violencia'], trilha: ['espada'],
    historia: 'Dizem que, quando a espada dele sai da bainha, ela só volta depois de resolver o que a tirou.',
    epilogo: 'Nunca houve ritual de despedida para a espada de {alcunha}: ela foi encontrada, depois, cravada num pico que ninguém mais sabia escalar. Ninguém quis tirá-la de lá.',
    dica: 'Quem confia a vida a uma espada deixa para ela a última palavra.',
    reacoes: [reacao('desafio', 'A lâmina rival', 'Uma espadachim de outra seita desafia «{alcunha}» num duelo ritual, para decidir qual das duas escolas tem o melhor caminho.', [
      ['Aceitar o duelo e respeitar cada regra.', 'O duelo é breve e bonito. Ao final, as duas escolas trocam discípulos em vez de ressentimentos.', { fama: 4, karma: 1 }],
      ['Recusar e propor uma troca de lições.', 'A troca de lições dura um verão. As duas escolas saem com técnicas novas e nenhuma ferida.', { karma: 2, stats: { comp: 1 } }],
    ]),
    reacao('espada_quebrada', 'A espada que racha', 'A espada de «{alcunha}» racha no meio de um treino comum, depois de décadas de batalhas. O ferreiro diz que pode refundi-la, mas ela nunca mais será a mesma lâmina.', [
      ['Refundir a espada e aprender o novo peso.', 'A lâmina nova é mais curta e mais rápida. O braço demora um ano para aceitar. Quando aceita, você percebe que lutava como a espada velha, e agora pode lutar como você.', { stats: { fis: 1 }, pedras: -25 }],
      ['Enterrar a espada velha e lutar de mãos vazias por um tempo.', 'Sem lâmina, todo duelo vira conversa. Você descobre quantas brigas acabavam porque você estava armado, e quantas começavam pelo mesmo motivo.', { karma: 2, stats: { dao: 1, fis: -1 } }],
    ]),
    reacao('aluno_vingador', 'O filho do vencido', 'Um jovem espadachim procura «{alcunha}» com a espada do pai, morto num duelo justo que você venceu há vinte anos. Ele não quer duelo: quer aprender a técnica que matou o pai.', [
      ['Ensinar, sabendo que um dia ele pode usá-la contra você.', 'Ele aprende em silêncio, com raiva e talento. No último dia, ergue a espada e a abaixa sem golpear. "Agora sei que meu pai perdeu para alguém que valia a pena." Vai embora sem olhar para trás.', { karma: 3, fama: 2 }],
      ['Recusar e devolver a ele a bainha do pai, guardada desde o duelo.', 'Ele segura a bainha como quem segura um corpo. Não diz nada. Anos depois, a escola dele, do outro lado do rio, ensina uma única regra: nunca guarde a bainha de um vencido.', { karma: 1, stats: { car: 1 } }],
    ])] },
  { id: 'xx_sem_medo', m: 'o Que Venceu o Medo', f: 'a Que Venceu o Medo', feito: (s) => s.flaw === 'covarde' && flag(s, 'defeito_superado'),
    historia: 'Dizem que foi o último da turma a atravessar a ponte, e o primeiro a atravessá-la de volta para buscar os outros.',
    epilogo: 'Quem conheceu {alcunha} no começo jamais teria apostado nele. Quem conheceu no fim jamais teria apostado contra. Ficou a lição de que a coragem, às vezes, é apenas o medo com tarefas.',
    dica: 'Quem vence o medo ensina mais do que quem nunca o teve.',
    reacoes: [reacao('discipulo', 'O aluno com medo', 'Um discípulo de «{alcunha}» paralisa diante de um desafio e não consegue dar o primeiro passo. Os outros riem baixinho.', [
      ['Ficar ao lado dele e contar como foi com você.', 'Ele ouve, respira, e dá o passo. A turma aprende que a história do mestre não é só de vitórias.', { karma: 2, fama: 2 }],
      ['Mandar os outros se calarem e dar tempo a ele.', 'O tempo é longo. Ele dá o passo ao final da tarde, em silêncio, e olha para você sem agradecer em voz alta.', { karma: 1 }],
    ])] },
];
