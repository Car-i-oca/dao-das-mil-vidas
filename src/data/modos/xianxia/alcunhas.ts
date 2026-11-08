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
    ])], { contra: ['violencia', 'ganancia'], infame: { m: 'o Santo Ingênuo', f: 'a Santa Ingênua' } }),
  puro('violencia', 'xx_carrasco', 'o Carrasco de Nuvens', 'a Carrasca de Nuvens',
    'Dizem que as nuvens se afastam antes de ele chegar, como quem sabe o que vai acontecer.',
    'Os registros de {alcunha} são curtos: uma lista de nomes riscados, uma lista de datas. Ninguém, nas seitas, soube dizer se havia prazer ou dever no que fez. Mas todos concordam que a lista era pontual.',
    'Quem resolve tudo à força é lembrado pelo que sobrou.',
    [reacao('prova', 'O desafio nas nuvens', 'Um jovem prodígio de uma seita menor sobe até as nuvens para provar que pode vencer «{alcunha}» num duelo marcado, diante dos anciãos.', [
      ['Vencer rápido e sem humilhar.', 'O jovem cai uma vez e agradece. Os anciãos, sem querer, passam a citar você como exemplo de contenção.', { fama: 3, karma: 1 }],
      ['Vencer devagar, para que todos vejam.', 'A plateia treme. O jovem nunca mais sobe àquelas nuvens. O nome fica mais curto e mais pesado.', { fama: 5, karma: -3, stats: { fis: 1 } }],
    ])], { contra: ['compaixao'], infame: { m: 'o Açougueiro Celeste', f: 'a Açougueira Celeste' } }),
  puro('astucia', 'xx_tecelao', 'o Tecelão de Mil Planos', 'a Tecelã de Mil Planos',
    'Dizem que quando duas seitas se desentendem, existe um fio na mão dele que ainda não foi puxado.',
    'Nenhum plano de {alcunha} foi escrito. Todos foram feitos de conversas curtas e favores sem recibo. Quando as seitas finalmente fizeram as pazes, a história oficial não tinha o nome dele em lugar nenhum, e foi assim que ele quis.',
    'Quem prevê três jogadas à frente é lembrado só pelas jogadas que os outros não viram.',
    [reacao('arbitro', 'A paz que alguém pagou', 'Duas seitas em tensão procuram «{alcunha}» para arbitrar em segredo uma disputa de minas espirituais.', [
      ['Arbitrar e cobrar uma parte da mina.', 'As duas seitas aceitam a divisão, contrariadas. Você sai com uma parte da mina e um nome mais conhecido do que desejava.', { pedras: 60, fama: 2 }],
      ['Arbitrar de graça e exigir uma testemunha neutra.', 'A testemunha incomoda as duas e protege as duas. A paz dura mais do que as minas.', { karma: 2, fama: 3 }],
    ])]),
  puro('cautela', 'xx_prudente', 'o Passo Prudente', 'a Sombra Prudente',
    'Dizem que olha o céu três vezes antes de abrir a janela, e que por isso ainda tem janela.',
    'Os que subiram mais depressa já não estavam lá para ver {alcunha} passar por eles, devagar, no décimo século. A fama dele era curta e o nome era comprido: durou mais.',
    'Quem recua no momento certo vive para escolher outro momento.',
    [reacao('armadilha', 'O tesouro fácil demais', 'Um mapa de tesouro cai nas mãos de «{alcunha}» com uma facilidade suspeita. A recompensa é grande, o aviso é nenhum.', [
      ['Investigar o mapa durante semanas antes de agir.', 'Quando você acaba, o tesouro já foi tomado por outro. Mas o mapa era falso, e você é o único que sabe disso.', { stats: { comp: 1 }, fama: 1 }],
      ['Mandar um servo na frente.', 'O servo volta vivo e com um fragmento do tesouro. A armadilha era para quem fosse pessoalmente, e você vê as marcas na pedra.', { pedras: 40, karma: -1 }],
    ])]),
  puro('ambicao', 'xx_faminto', 'o Faminto de Céu', 'a Faminta de Céu',
    'Dizem que a cada reino que alcança olha o próximo como se já o tivesse perdido.',
    'Subiu mais depressa que seus rivais e deixou, atrás, mais amigos do que aprendizes. Quando {alcunha} chegou ao reino mais alto que o corpo suportava, descobriu que o céu tinha mais degraus do que o tempo.',
    'Quem quer sempre o próximo reino raramente descansa no atual.',
    [reacao('convite', 'O assento do Ancião', 'Uma seita enfraquecida oferece a «{alcunha}» o assento de Ancião, com a condição de assumir o passivo do último ocupante.', [
      ['Aceitar o assento e o passivo.', 'O assento é seu. O passivo também. Em um ano, você entende por que o último ocupante nunca voltou para visitar.', { fama: 6, pedras: -60, stats: { car: 1 } }],
      ['Aceitar apenas depois de renegociar o passivo.', 'A seita cede metade. Você assume com menos peso e mais inimigos entre os que queriam o assento.', { fama: 3, pedras: -20 }],
    ])], { contra: ['compaixao'] }),
  puro('disciplina', 'xx_rocha', 'o Monte Imóvel', 'a Rocha Imóvel',
    'Dizem que medita no mesmo ponto desde antes de a trilha ser aberta.',
    'Os discípulos mudaram, as seitas mudaram de nome. {alcunha} continuou na mesma pedra, e a trilha, aos poucos, passou a desviar dela. Alguns diziam que foi a pedra que ficou, e outros, que foi o mundo que passou.',
    'Quem repete sem cansar vira ponto fixo.',
    [reacao('visita', 'A visita de um Patriarca', 'Um Patriarca, de passagem, observa «{alcunha}» meditar uma tarde inteira e diz que, com outro método, a mesma disciplina renderia o dobro.', [
      ['Ouvir o método e adotar o que servir.', 'O Patriarca sorri. Algumas partes do método servem; outras não. Você aprende a diferença sem perder a pedra.', { stats: { comp: 1, dao: 1 } }],
      ['Convidar o Patriarca a sentar ao lado, sem falar.', 'Ele aguenta até o fim da tarde, e sai calado. Manda um discípulo seu estudar com você, sem dizer o motivo.', { fama: 3 }],
    ])]),
  puro('devocao', 'xx_devoto', 'o Devoto do Dao', 'a Devota do Dao',
    'Dizem que reza pelas manhãs diante de uma pedra lisa, e que as manhãs, ali, são mais longas.',
    'Houve seitas mais poderosas, mas poucas tão fiéis. Quando {alcunha} morreu, a pedra lisa onde rezava foi encontrada rachada ao meio, e ninguém soube dizer se era um sinal ou um cansaço.',
    'Quem se agarra ao rito o carrega até o fim.',
    [reacao('rito', 'O altar abandonado', 'Numa montanha deserta, um altar antigo está sem ninguém para cuidar. «{alcunha}» é chamado para decidir se vale a pena reabri-lo.', [
      ['Reabrir o altar e mantê-lo em pessoa.', 'Anos depois, peregrinos sobem a montanha, e você é, outra vez, o guardião de um lugar que ninguém lembrava.', { karma: 3, fama: 2, stats: { dao: 1 } }],
      ['Reabrir o altar e entregá-lo a uma família local.', 'A família assume, com orgulho e atrapalhos. O altar vive, e o seu nome continua nele, como uma nota de rodapé.', { karma: 2 }],
    ])]),
  puro('ganancia', 'xx_cofre', 'o Cofre Sem Fundo', 'a Bolsa Sem Fundo',
    'Dizem que já pagou três vezes pelo mesmo tesouro e ainda assim saiu com lucro.',
    'Os livros-caixa de {alcunha} eram os únicos que as seitas aceitavam como prova. Nunca perdoou uma dívida, nunca deu uma esmola. Mas foi também o único a guardar o preço exato de cada favor, e a lista, no fim, foi lida em voz alta.',
    'Quem conta tudo acaba contado.',
    [reacao('divida', 'A seita falida', 'Uma seita falida vem pedir a «{alcunha}» um empréstimo para não fechar. Os discípulos esperam no pátio, em silêncio.', [
      ['Emprestar com garantia de uma mina.', 'A seita sobrevive, e a mina passa a ser sua. Os discípulos agradecem e passam a desviar o olhar quando você chega.', { pedras: 60, karma: -2 }],
      ['Emprestar sem garantia, uma única vez.', 'A seita paga, com atraso e com juros inesperados de lealdade. O nome ganha uma fenda por onde entra luz.', { pedras: -30, karma: 3, fama: 2 }],
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
  { id: 'xx_vulto_vermelho', m: 'o Vulto Vermelho', f: 'a Sombra Vermelha', feito: (s) => s.path === 'demoniaca' || flag(s, 'membro_demoniaca'), infame: { m: 'o Mensageiro do Sangue', f: 'a Mensageira do Sangue' },
    historia: 'Dizem que, nas noites de lua minguante, uma figura de manto escuro cruza os telhados das seitas.',
    epilogo: 'As seitas retas diziam que {alcunha} era um perigo. As seitas escondidas diziam que era um abrigo. Ninguém dizia nada em voz alta, e esse era o tamanho da fama.',
    dica: 'Quem escolhe o caminho do sangue é visto de longe e nomeado de perto.',
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
