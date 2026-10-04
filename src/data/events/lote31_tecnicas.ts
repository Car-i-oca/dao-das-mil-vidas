import type { GameEvent } from '../../types';

/**
 * Lote 31 — Técnicas que ditam o caminho.
 *  A) o mundo reage à técnica que você usa (por etiqueta): caçadores, duelistas, associações, mestres que querem trocar segredos;
 *  B) métodos de seitas extintas: quem o encontra vira alvo e herdeiro (3 eventos por método) e pode reerguer a seita;
 *  C) fusão de técnicas (iluminação) e perfeição de domínio;
 *  D) técnicas divinas raras: como se obtém cada uma, o que ela muda e um final que só ela abre.
 */
const T = (tag: string, min = 1, max = 8, extra: Record<string, unknown> = {}) => ({ tecnicaTag: tag, tierMin: min, tierMax: max, ...extra });
const U = (id: string, min = 1, max = 8, extra: Record<string, unknown> = {}) => ({ tecnicas: [id], tierMin: min, tierMax: max, ...extra });

export const lote31Tecnicas: GameEvent[] = [
  /* ================= A) O MUNDO REAGE À TÉCNICA ================= */
  {
    id: 'tc_cacadores_de_demonio', title: 'Os Caçadores de Quem Usa Sangue', rarity: 'raro', cooldown: 60, weight: 3, cond: T('demonio', 2, 7, { noFlags: ['tc_demonio_resolvido'] }),
    text: 'Três inquisidores de manto cinzento o esperam numa curva da estrada. Reconheceram o cheiro de ferro quente da sua técnica: "Quem aprende o Sangue deixa um rastro. O seu leva até nós." Eles têm uma lista, e o seu nome acabou de entrar nela.',
    choices: [
      { text: 'Provar que o seu uso é contido e voluntário.', check: { stat: ['dao', 'car'], dif: 1, tag: 'mente' }, ok: { text: 'Você deixa que eles examinem o seu Dantian e o seu Coração. O líder, sem sorrir, entrega uma tabuleta de passagem: "Enquanto durar a sua calma."', fx: { setFlags: ['tc_demonio_resolvido', 'tc_inquisicao_tolera'], karma: 3, fama: 4, stats: { dao: 1 } } }, fail: { text: 'Eles não acreditam em quem usa sangue e jura controle. A discussão vira luta, e você foge com uma ferida e o aviso de que a lista só cresce.', fx: { ferida: 2, setFlags: ['perseguido_por_demoniacos', 'tc_inquisicao_cobra'], karma: -1 } } },
      { text: 'Enfrentar os três e acabar com a caçada.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Três mantos no chão, nenhum morto. O último inquisidor diz, sem raiva: "Agora virão os que não perguntam."', fx: { setFlags: ['tc_inquisicao_inimiga'], fama: 8, karma: -2, stats: { fis: 1, dao: 1 } } }, fail: { text: 'São mais treinados do que parecia. Você escapa por um fio, com a fama de quem fugiu de inquisidores.', fx: { ferida: 3, fama: -3, setFlags: ['tc_inquisicao_cobra'] } } },
      { text: 'Renunciar à técnica diante deles.', res: { text: 'Você recita o juramento de abandono. A técnica não some, mas a sua mão para de a buscar. Os inquisidores partem em silêncio, e você carrega a perda como uma ausência de peso.', fx: { setFlags: ['tc_demonio_resolvido', 'tc_renunciou_sangue'], corr: -12, karma: 6, stats: { dao: 2, fis: -1 } } } },
    ],
  },
  {
    id: 'tc_duelista_reconhece', title: 'Quem Reconhece o Seu Corte', rarity: 'comum', cooldown: 60, weight: 2.5, escala: true, cond: T('espada', 2, 7),
    text: 'Num pátio de seita, um espadachim de cabelos brancos para no meio de uma frase e fica olhando o modo como você puxa a lâmina. "Esse corte", diz, "eu só vi uma vez, há quarenta anos, num homem que não voltou." Ele não pergunta o seu nome: pergunta quem foi o seu mestre.',
    choices: [
      { text: 'Contar a verdade sobre onde aprendeu.', res: { text: 'O velho escuta calado e, ao fim, abre a bainha e lhe mostra o mesmo corte, ao contrário: era a mesma escola, dividida em dois ramos. Ele passa a noite lhe ensinando o que faltava.', fx: { setFlags: ['tc_espada_ramo'], xp: 8, stats: { dao: 2, fis: 1 }, karma: 2, rec: 1 } } },
      { text: 'Dizer que aprendeu sozinho e não explicar.', res: { text: 'O velho assente, sem acreditar. Passa a observá-lo de longe, e os olhares dele pesam mais que perguntas.', fx: { setFlags: ['tc_espada_misterio'], stats: { dao: 1 }, fama: 3 } } },
      { text: 'Desafiá-lo a mostrar o que sabe.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'espada' }, ok: { text: 'O duelo é breve e limpo. O velho recua, honrado: "Aprendeu bem, quem quer que tenha ensinado." Algo, nos olhos dele, se acalma.', fx: { fama: 8, stats: { dao: 2 }, rec: 1, setFlags: ['tc_espada_ramo'] } }, fail: { text: 'O velho vence com um gesto. Ensina, depois, o erro exato do seu corte, sem cobrar.', fx: { ferida: 1, stats: { dao: 1, fis: 1 } } } },
    ],
  },
  {
    id: 'tc_associacao_chama', title: 'A Associação Quer a Sua Chama', rarity: 'raro', cooldown: 70, weight: 2.5, cond: T('alquimia', 2, 7),
    text: 'Um emissário da Associação dos Alquimistas deixa à sua porta uma carta com selo de cera verde. Alguém reparou na cor da sua chama, e a cor é rara. Eles oferecem um assento no conselho de pesquisa, e uma cláusula: toda receita nova entra no acervo da casa.',
    choices: [
      { text: 'Aceitar o assento no conselho de pesquisa.', res: { text: 'Fornalhas melhores, ervas raras, pergaminhos proibidos. Em troca, toda descoberta sua tem de passar por mãos que a revisam e a carimbam.', fx: { setFlags: ['tc_alq_conselho'], pedras: 220, fama: 8, stats: { comp: 2 }, rec: 1 } } },
      { text: 'Recusar e manter a chama e as receitas para si.', res: { text: 'A Associação aceita com educação e, depois, fecha algumas portas. Você ganha independência e perde fornecedores.', fx: { setFlags: ['tc_alq_independente'], stats: { dao: 2, comp: 1 }, pedras: -40 } } },
      { text: 'Propor uma troca de segredos entre iguais.', check: { stat: ['car', 'comp'], dif: 1, tag: 'alquimia' }, ok: { text: 'O emissário, surpreso, leva a proposta. Em um mês, volta com três receitas antigas em troca de uma sua. Os dois lados saem mais ricos.', fx: { setFlags: ['tc_alq_troca'], item: ['pilula_qi_maior'], stats: { comp: 2, car: 1 }, fama: 4 } }, fail: { text: 'A Associação não negocia de igual para igual. A proposta vira piada de corredor.', fx: { fama: -2, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'tc_arquiteto_formacao', title: 'O Arquiteto Que Viu Seus Traços', rarity: 'comum', cooldown: 70, weight: 2.5, cond: T('formacao', 2, 7),
    text: 'Um velho arquiteto, de dedos manchados de giz, para diante de uma formação sua e passa uma hora olhando. Depois diz: "Há um traço aqui que ninguém ensina mais. Quem lhe mostrou?" Ele quer saber, e quer trocar: um segredo seu por um segredo dele.',
    choices: [
      { text: 'Trocar o traço por uma formação antiga dele.', res: { text: 'O velho lhe mostra uma grande formação de montanha, desenhada em seda. Em troca, você revela o traço. Os dois saem com um segredo a menos e um aliado a mais.', fx: { setFlags: ['tc_form_troca'], tecnica: ['formacao_estrelas'], stats: { comp: 2 }, karma: 2 } } },
      { text: 'Guardar o traço e agradecer o interesse.', res: { text: 'O velho assente, sem rancor. "Os segredos que valem são os que a gente guarda." Ele parte com um sorriso de professor.', fx: { stats: { dao: 1, comp: 1 } } } },
      { text: 'Pedir que ele revise a formação e aponte os erros.', check: { stat: ['comp', 'esp'], dif: 1, tag: 'formacao' }, ok: { text: 'Ele aponta três erros, e você corrige. A formação, depois, aguenta um raio.', fx: { stats: { comp: 3 }, xp: 5, rec: 1 } }, fail: { text: 'Ele aponta tantos erros que você precisa recomeçar do início. Mas aprende como se faz.', fx: { stats: { comp: 1 }, ferida: 1 } } },
    ],
  },
  {
    id: 'tc_mestre_corpo_desafio', title: 'O Mestre de Corpo Que Quer Medir', rarity: 'comum', cooldown: 60, weight: 2.5, escala: true, cond: T('corpo', 2, 7),
    text: 'Um mestre de corpo, de pele escura como bronze velho, o encontra numa feira e, sem se apresentar, bate no seu ombro com a palma aberta. O estalo ecoa. "Aguenta", murmura. "Venha ao meu pátio. Quero medir até onde."',
    choices: [
      { text: 'Aceitar a medição no pátio dele.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'corpo' }, ok: { text: 'Três dias de pancada. Ao final, ele larga o martelo, ofegante: "Nunca vi tanto assentamento num só corpo." Entrega um pó de ossos e um método de têmpera.', fx: { setFlags: ['tc_corpo_medido'], stats: { fis: 3 }, ferida: 1, rec: 1, item: ['elixir_medula'] } }, fail: { text: 'No segundo dia, o corpo cede. O mestre o carrega nas costas até o curandeiro, resmungando que "isso também faz parte da medição".', fx: { ferida: 3, stats: { fis: 1, dao: 1 }, rec: 1 } } },
      { text: 'Recusar: não vai ser cobaia de ninguém.', res: { text: 'O mestre ri e se afasta. "Quem não quer medir, já sabe o resultado." A frase fica rodando na sua cabeça.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tc_besta_reconhece', title: 'As Feras Que Seguem Seu Cheiro', rarity: 'comum', cooldown: 60, weight: 2.5, cond: T('besta', 2, 7),
    text: 'Desde que você aprendeu o pacto, as feras mudaram: pássaros pousam no seu ombro, lobos acompanham a certa distância. Hoje, um cervo de chifres de luz se aproxima, dobra os joelhos e espera. Atrás dele, uma sombra maior observa.',
    choices: [
      { text: 'Aceitar o cervo como novo companheiro.', res: { text: 'O cervo se deita ao seu lado. Dias depois, a sombra maior, uma loba ancestral, aparece e dá permissão com um uivo breve. Seu rebanho cresce, e o mundo selvagem passa a reconhecê-lo.', fx: { setFlags: ['tc_besta_rebanho'], stats: { esp: 2, car: 1 }, karma: 3, rec: 2 } } },
      { text: 'Recusar: um companheiro basta.', res: { text: 'O cervo se levanta, sem ressentimento. A loba o olha longamente, e você sente que ela guardou o seu nome.', fx: { stats: { dao: 1, esp: 1 } } } },
      { text: 'Enfrentar a sombra maior, para ver quem é.', check: { stat: ['fis', 'esp'], dif: 2, tag: 'besta' }, ok: { text: 'A loba ancestral, ao ser desafiada com respeito, recua e curva a cabeça. Ela lhe dá uma escama de lua como prova de aliança.', fx: { setFlags: ['tc_besta_rebanho'], item: ['escama_qilin'], fama: 8, stats: { esp: 2 }, rec: 2 } }, fail: { text: 'A loba o derruba com uma pata e o olha sem raiva. Você aprende que respeito não se testa com força.', fx: { ferida: 2, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tc_cla_veneno_recruta', title: 'O Clã Que Quer Seus Antídotos', rarity: 'comum', cooldown: 70, weight: 2.5, cond: T('veneno', 2, 7),
    text: 'Uma mulher de olhar pálido, com um broche de aranha na gola, o aborda: "Seu jeito de preparar veneno é limpo. E seu jeito de preparar antídoto é melhor ainda." Ela lidera um clã de envenenadores e propõe um acordo: uma receita por estação, em troca de ervas que você jamais compraria.',
    choices: [
      { text: 'Aceitar o acordo com o clã.', res: { text: 'As ervas chegam em caixas lacradas, e as receitas saem na mesma medida. Ninguém pergunta para quê. Você descobre, aos poucos, quem foram os alvos.', fx: { setFlags: ['tc_ven_cla'], pedras: 150, stats: { comp: 2 }, karma: -4, item: ['frasco_antidotos'], rec: 1 } } },
      { text: 'Aceitar só dar antídotos, nunca venenos.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'A mulher sorri, de má vontade, e aceita. Em troca, as ervas vêm em menor quantidade, e com um recado: "Ninguém é tão limpo quanto pensa."', fx: { setFlags: ['tc_ven_antidotos'], karma: 4, stats: { comp: 1, car: 1 }, pedras: 60 } }, fail: { text: 'O clã não gosta de cláusulas. A mulher se despede sem raiva, mas as portas do clã se fecham para você.', fx: { stats: { dao: 1 }, fama: -1 } } },
      { text: 'Recusar e esconder as receitas.', res: { text: 'A mulher parte sem insistir. Semanas depois, uma aranha de jade aparece sobre a sua cama, vazia, uma promessa de que o assunto não acabou.', fx: { setFlags: ['inimigo_secreto'], stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tc_mestre_mente_oferece', title: 'O Mestre do Silêncio Interior', rarity: 'raro', cooldown: 70, weight: 2.5, cond: T('mente', 2, 7),
    text: 'Um monge de olhar profundo, que atravessou três cidades só para encontrá-lo, diz que a sua prática de consciência chegou perto de algo que ele conhece: o Mar Sem Margem. Oferece ensinar o resto, mas avisa: o último trecho exige perder o medo de esquecer quem se é.',
    choices: [
      { text: 'Aceitar o ensino do monge.', check: { stat: ['esp', 'dao'], dif: 2, tag: 'mente' }, ok: { text: 'Semanas de silêncio, e uma tarde em que você esquece o próprio nome e lembra, de repente, de todos os outros. O monge sorri: "Voltou."', fx: { setFlags: ['tc_mente_mar'], stats: { esp: 3, dao: 2 }, xp: 10, rec: 2, tecnica: ['sutra_vazio_calmo'] } }, fail: { text: 'No quinto dia, o esquecimento assusta, e você recua. O monge não censura: "Quem recua, ainda existe."', fx: { stats: { dao: 2 }, corr: 2, rec: 1 } } },
      { text: 'Recusar: o seu nome não é negociável.', res: { text: 'O monge se curva e parte. Você, em noites quietas, às vezes sente que o mar o chama, e que algum dia talvez responda.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tc_seita_sopro_troca', title: 'A Troca de Segredos do Sopro', rarity: 'comum', cooldown: 70, weight: 2.5, cond: T('qi', 2, 7),
    text: 'Dois mestres de sopro, de seitas rivais, o convidam para uma "troca de segredos": cada um ensina uma respiração em troca de outra. Querem o seu método porque ninguém mais respira como você, e a oferta vem de ambos, no mesmo dia, de forma que você precisa escolher.',
    choices: [
      { text: 'Trocar com o mestre da Seita do Vale.', res: { text: 'A respiração dele é lenta, lunar, funda. Em troca, você entrega a sua, mais rápida. Os dois ficam mais completos, e o mestre rival, ofendido, não esquece.', fx: { setFlags: ['tc_sopro_vale'], tecnica: ['respiracao_lunar'], stats: { esp: 2 }, xp: 6, fama: 3 } } },
      { text: 'Trocar com o mestre da Seita do Pico.', res: { text: 'A respiração dele é alta, seca, cortante. Em troca, você entrega a sua. O mestre do Vale, desprezado, passa a lhe mandar recados maldosos.', fx: { setFlags: ['tc_sopro_pico'], tecnica: ['respiracao_coletiva'], stats: { esp: 2, comp: 1 }, xp: 6, fama: 3 } } },
      { text: 'Recusar ambos: não quer dívidas de seitas.', res: { text: 'Os dois partem decepcionados. Você mantém o método intacto, e a certeza de que não deve nada a ninguém.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tc_ladrao_mestre', title: 'O Mestre dos Passos Que Quer um Aprendiz', rarity: 'comum', cooldown: 70, weight: 2.2, cond: T('fuga', 2, 7),
    text: 'Um velho ladrão, que durante quarenta anos nunca foi pego, observa a sua técnica de passos e pergunta, sem rodeios: "Quer aprender a sumir de verdade?" Ele não quer pagamento: quer que você faça, uma vez, uma coisa que ele não pode mais fazer.',
    choices: [
      { text: 'Aceitar e saber qual é a tarefa depois.', res: { text: 'Ele ensina por três semanas. No fim, pede que você devolva, de noite, uma relíquia roubada por ele décadas antes a um templo vizinho. Você devolve, e algo nele se acalma.', fx: { setFlags: ['tc_fuga_devolveu'], tecnica: ['passo_vento_nove'], stats: { sor: 2, esp: 1 }, karma: 4 } } },
      { text: 'Perguntar a tarefa antes de aceitar.', check: { stat: ['comp', 'car'], dif: 0 }, ok: { text: 'O velho, impressionado com a cautela, conta a tarefa: levar uma carta a uma mulher que o odeia. Você aceita, e leva.', fx: { setFlags: ['tc_fuga_carta'], tecnica: ['passo_vento_nove'], stats: { sor: 1, car: 1, comp: 1 }, karma: 3 } }, fail: { text: 'O velho se ofende com a desconfiança e vai embora, resmungando. A técnica, afinal, fica só sua.', fx: { stats: { sor: 1 } } } },
      { text: 'Recusar: ladrões têm preços escondidos.', res: { text: 'O velho dá de ombros. "Quem não quer aprender a sumir, vai aprender a ser achado." Ele desaparece, de um jeito que você nunca viu.', fx: { stats: { dao: 1 } } } },
    ],
  },

  /* ================= B) MÉTODOS DE SEITAS EXTINTAS ================= */
  {
    id: 'tc_cinzas_1', title: 'O Manual no Fundo do Poço Queimado', rarity: 'raro', once: true, weight: 1.8, cond: { tierMin: 2, tierMax: 6, noFlags: ['tc_cinzas_achou'] },
    text: 'Entre ruínas queimadas de uma seita extinta, uma criança mostra a você um poço seco, onde, diz, "o velho escondia um embrulho". Dentro, um manual chamuscado: a Palma da Seita das Cinzas Verdes. Uma inscrição na capa pede, em letra pequena: "A quem ficar, a palma. A quem partir, o luto."',
    choices: [
      { text: 'Levar o manual e aprender a palma.', res: { text: 'As páginas, mesmo queimadas, ensinam. Você aprende a palma e sente que, de algum modo, a seita morta agora respira através de você.', fx: { setFlags: ['tc_cinzas_achou'], tecnica: ['palma_seita_extinta'], stats: { fis: 1, dao: 1 }, agenda: [{ event: 'tc_cinzas_2', em: [6, 14] }] } } },
      { text: 'Deixar o manual no poço e rezar pelos mortos.', res: { text: 'Você cobre o poço com pedras e acende incenso. A criança, de longe, sorri. A seita, pelo menos, tem um túmulo.', fx: { karma: 6, stats: { dao: 2 }, setFlags: ['tc_cinzas_respeitou'] } } },
      { text: 'Vender o manual a um colecionador.', res: { text: 'O colecionador paga bem e some com o embrulho. Você descobre, depois, que a palma era o último elo de uma linhagem.', fx: { pedras: 160, karma: -5, setFlags: ['tc_cinzas_vendeu'] } } },
    ],
  },
  {
    id: 'tc_cinzas_2', title: 'Os Que Sobraram da Seita das Cinzas', rarity: 'raro', once: true, weight: 0, cond: U('palma_seita_extinta', 2, 7),
    text: 'Dois velhos de capa verde batem à sua porta: sobreviventes da Seita das Cinzas Verdes. Ao vê-lo usar a palma, um deles chora, outro desembainha. "Quem lhe deu o direito?", pergunta o segundo. Eles têm uma disputa antiga entre si, e você é, agora, o centro dela.',
    choices: [
      { text: 'Entregar o manual aos dois, para que decidam.', res: { text: 'Os velhos discutem por uma noite. Na manhã, decidem copiar o manual em duas cópias e dividi-lo. Eles lhe dão a palma, com a bênção dos dois.', fx: { setFlags: ['tc_cinzas_herdeiro'], stats: { dao: 2, car: 1 }, karma: 4, fama: 4, agenda: [{ event: 'tc_cinzas_3', em: [8, 18] }] } } },
      { text: 'Provar que a palma é sua pelo uso: duelar com o mais velho.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'O duelo é solene, e curto. O velho cai de joelhos e ri: "Ela escolheu bem." O outro, calado, assente. Vocês três passam a ser a nova seita.', fx: { setFlags: ['tc_cinzas_herdeiro'], fama: 8, stats: { fis: 2, dao: 1 }, agenda: [{ event: 'tc_cinzas_3', em: [8, 18] }] } }, fail: { text: 'O velho vence, e, depois, divide o manual em três: um para cada. A seita, de certa forma, renasce partida.', fx: { setFlags: ['tc_cinzas_herdeiro'], ferida: 2, stats: { dao: 2 }, agenda: [{ event: 'tc_cinzas_3', em: [8, 18] }] } } },
      { text: 'Negar o manual e fugir.', res: { text: 'Você escapa, e a palma vai com você. Os dois velhos, vencidos pela idade, não o seguem, mas a história passa a correr entre as seitas.', fx: { setFlags: ['inimigo_secreto', 'tc_cinzas_fugiu'], stats: { sor: 1 }, karma: -3 } } },
    ],
  },
  {
    id: 'tc_cinzas_3', title: 'A Seita Que Pode Renascer', rarity: 'lendario', once: true, weight: 1.5, cond: U('palma_seita_extinta', 3, 8, { flags: ['tc_cinzas_herdeiro'] }),
    text: 'Os dois velhos, a idade pesando, perguntam se você aceita reerguer a seita: um pátio, uma sala de manuais, uma placa nova. Será trabalho de anos, e a seita vai viver ou morrer conforme o seu humor. A palma, afinal, é a herança de todos.',
    choices: [
      { text: 'Reerguer a Seita das Cinzas Verdes e assumir como mestre.', res: { text: 'Em dez anos, o pátio tem vinte alunos. Em trinta, cem. A seita, antes varrida do mapa, volta a ter um nome, e você, uma casa. Quando parte, a placa nova ainda está lá.', fx: { fim: 'seita_renasce_cinzas' } } },
      { text: 'Deixar a seita nas mãos dos velhos e seguir seu caminho.', res: { text: 'Os velhos, sozinhos, fazem o que podem. A seita sobrevive, pequena, e você a visita de vez em quando.', fx: { karma: 4, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tc_sino_1', title: 'O Sutra Que Veio do Fundo do Mar', rarity: 'raro', once: true, weight: 1.8, cond: { tierMin: 2, tierMax: 6, noFlags: ['tc_sino_achou'] },
    text: 'Numa maré baixa, entre algas, uma tábua de madeira escura aparece, coberta de versos esculpidos. Um pescador diz que vem do Templo do Sino Afogado, engolido há cem anos. Ao lê-los em voz alta, você ouve, ao longe, um sino debaixo d’água.',
    choices: [
      { text: 'Memorizar os versos e aprender o sutra.', res: { text: 'Cada recitação traz o som do sino mais perto. Em semanas, você sabe o sutra, e o mar, quando o encara, parece reconhecê-lo.', fx: { setFlags: ['tc_sino_achou'], tecnica: ['sutra_templo_afundado'], stats: { dao: 2, esp: 1 }, agenda: [{ event: 'tc_sino_2', em: [6, 14] }] } } },
      { text: 'Devolver a tábua ao mar com uma prece.', res: { text: 'A tábua afunda devagar, e o sino toca uma única nota. O pescador, de olhos molhados, diz que viu o mar sorrir.', fx: { karma: 6, stats: { dao: 2 }, setFlags: ['tc_sino_respeitou'] } } },
    ],
  },
  {
    id: 'tc_sino_2', title: 'A Monja Que Ouve o Sino', rarity: 'raro', once: true, weight: 0, cond: U('sutra_templo_afundado', 2, 7),
    text: 'Uma monja de véu encharcado aparece numa noite de tempestade e fica de pé, na chuva, na sua porta. "Eu ouvi o sino", diz. "Ele só toca para quem sabe o sutra. Sou a última do Templo do Sino Afogado. Preciso saber se o senhor vai usá-lo para o bem."',
    choices: [
      { text: 'Jurar usar o sutra só para ajudar.', res: { text: 'A monja pousa a mão na sua testa, sem nenhuma palavra. O sino, ao longe, toca duas vezes. Ela some na chuva, como se tivesse esperado a vida inteira por aquilo.', fx: { setFlags: ['tc_sino_juramento'], karma: 8, stats: { dao: 3 }, agenda: [{ event: 'tc_sino_3', em: [8, 18] }] } } },
      { text: 'Recusar jurar: ninguém decide por você.', res: { text: 'A monja assente. "Então o sino saberá." Ela parte, e o sino, por meses, toca sem parar em suas noites.', fx: { setFlags: ['tc_sino_sem_juramento'], stats: { dao: 1 }, corr: 2, agenda: [{ event: 'tc_sino_3', em: [8, 18] }] } } },
      { text: 'Pedir que ela ensine o resto do sutra.', check: { stat: ['car', 'esp', 'dao'], dif: 1, tag: 'mente' }, ok: { text: 'Ela ensina, entre lágrimas, três páginas que ninguém mais lembra. O sutra fica completo, e o sino, mais próximo.', fx: { setFlags: ['tc_sino_juramento'], stats: { dao: 3, esp: 1 }, xp: 8, agenda: [{ event: 'tc_sino_3', em: [8, 18] }] } }, fail: { text: 'A monja, ofendida pela barganha, se cala. O sutra continua incompleto, e o sino, por noites, não toca.', fx: { stats: { dao: 1 }, agenda: [{ event: 'tc_sino_3', em: [8, 18] }] } } },
    ],
  },
  {
    id: 'tc_sino_3', title: 'O Templo Que Pode Subir do Mar', rarity: 'lendario', once: true, weight: 1.5, cond: U('sutra_templo_afundado', 3, 8),
    text: 'Numa maré de equinócio, o sino toca tão alto que as ondas se abrem. No fundo, de pé, as colunas do Templo do Sino Afogado. A monja, de outra era, o espera nos degraus, e pergunta se você quer reerguer o templo à luz, ou deixá-lo dormir.',
    choices: [
      { text: 'Reerguer o Templo do Sino Afogado e ser o seu primeiro abade.', res: { text: 'Você passa a vida subindo o templo, pedra a pedra, do fundo do mar. Quando ele emerge, o sino toca uma nota longa. Os peregrinos vêm de todos os lados, e a monja, enfim, descansa.', fx: { fim: 'seita_renasce_sino' } } },
      { text: 'Deixar o templo dormir sob as ondas.', res: { text: 'O mar se fecha, e o sino cala. Você volta à costa, e, em noites de lua cheia, ainda o escuta, a distância, como um agradecimento.', fx: { karma: 5, stats: { dao: 3, esp: 1 } } } },
    ],
  },
  {
    id: 'tc_nevoas_1', title: 'O Caderno do Último Discípulo', rarity: 'raro', once: true, weight: 1.8, cond: { tierMin: 2, tierMax: 6, noFlags: ['tc_nevoas_achou'] },
    text: 'Num armário de uma estalagem de beira de estrada, esquecido entre cobertores, um caderno de capa azul tem desenhados nove cortes dentro de uma espiral de névoa. A letra é de alguém com pressa. Na última página, um aviso: "Escola das Nove Névoas, apagada numa noite. Quem ler, lembre."',
    choices: [
      { text: 'Estudar o caderno e aprender os nove cortes.', res: { text: 'Cada corte esconde um segundo. Em meses, você domina cinco; em anos, os nove. A escola, apagada, passa a ter um herdeiro, que ninguém avisou.', fx: { setFlags: ['tc_nevoas_achou'], tecnica: ['espada_nove_nevoas'], stats: { dao: 2, fis: 1 }, agenda: [{ event: 'tc_nevoas_2', em: [6, 14] }] } } },
      { text: 'Entregar o caderno à guarda do reino, para registro.', res: { text: 'A guarda agradece e arquiva. Anos depois, descobre-se que o caderno nunca foi catalogado, e que a escola perdeu um último rastro.', fx: { karma: 2, stats: { dao: 1 }, setFlags: ['tc_nevoas_entregou'] } } },
    ],
  },
  {
    id: 'tc_nevoas_2', title: 'Os Que Apagaram a Escola', rarity: 'raro', once: true, weight: 0, escala: true, cond: U('espada_nove_nevoas', 2, 7),
    text: 'Três espadachins de uma escola rival, a que, anos atrás, apagou a das Nove Névoas, o encurralam: eles reconheceram os cortes. "Só sobrou um discípulo", dizem, "e você tem a letra dele." Eles não querem apenas o caderno: querem a certeza de que ninguém mais vai lembrar.',
    choices: [
      { text: 'Enfrentar os três com os nove cortes.', check: { stat: ['fis', 'dao', 'sor'], dif: 2, tag: 'espada' }, ok: { text: 'As névoas se fecham, e os três, um a um, perdem o chão. Você poupa o último, que fugirá para contar a história: a escola das Nove Névoas ainda tem um herdeiro.', fx: { setFlags: ['tc_nevoas_herdeiro'], fama: 12, karma: 3, stats: { dao: 2, fis: 1 }, agenda: [{ event: 'tc_nevoas_3', em: [8, 18] }] } }, fail: { text: 'Os três o vencem por número. Você foge, ferido, com o caderno no peito, e a lição de que nove cortes não são nove vidas.', fx: { ferida: 3, setFlags: ['tc_nevoas_herdeiro'], stats: { dao: 2 }, agenda: [{ event: 'tc_nevoas_3', em: [8, 18] }] } } },
      { text: 'Entregar o caderno para salvar a pele.', res: { text: 'Os três queimam o caderno diante de você. A técnica continua na sua memória, e a vergonha, também. Você viverá sabendo o que perdeu.', fx: { setFlags: ['tc_nevoas_entregou'], karma: -3, stats: { dao: 1 }, agenda: [{ event: 'tc_nevoas_3', em: [10, 20] }] } } },
      { text: 'Negociar: um duelo justo em vez de uma emboscada.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'O mais velho dos três, constrangido, aceita. O duelo é seu, e é limpo. Eles vão embora com respeito, e sem o caderno.', fx: { setFlags: ['tc_nevoas_herdeiro'], fama: 8, karma: 4, stats: { dao: 2, car: 1 }, agenda: [{ event: 'tc_nevoas_3', em: [8, 18] }] } }, fail: { text: 'Os três riem da proposta. A luta, afinal, acontece, em piores condições.', fx: { ferida: 2, stats: { dao: 1 }, agenda: [{ event: 'tc_nevoas_3', em: [8, 18] }] } } },
    ],
  },
  {
    id: 'tc_nevoas_3', title: 'A Escola Que Volta a Ter Nome', rarity: 'lendario', once: true, weight: 1.5, cond: U('espada_nove_nevoas', 3, 8, { flags: ['tc_nevoas_herdeiro'] }),
    text: 'Jovens com cadernos de capa azul começam a chegar à sua porta, vindos de lugares onde a história da escola apagada foi passada em segredo. Querem aprender os nove cortes com o último herdeiro. A escola, que todos davam por morta, só precisa de uma placa, e de um mestre.',
    choices: [
      { text: 'Reabrir a Escola das Nove Névoas e ensinar os nove cortes.', res: { text: 'Você ensina por décadas, e cada aluno dobra o caderno de capa azul na manga. Quando a escola volta a ser lembrada, a névoa que a cobria some, e o seu nome fica gravado na primeira placa.', fx: { fim: 'seita_renasce_nevoas' } } },
      { text: 'Guardar os nove cortes só para si.', res: { text: 'Os jovens partem, decepcionados. A escola, mais uma vez, fica sem lugar, e você carrega os nove cortes como um segredo que pesa.', fx: { stats: { dao: 2 }, karma: -2 } } },
    ],
  },
  {
    id: 'tc_anciao_1', title: 'O Caldeirão Que Sobreviveu ao Fogo', rarity: 'raro', once: true, weight: 1.8, cond: { tierMin: 2, tierMax: 6, noFlags: ['tc_anciao_achou'] },
    text: 'Num pavilhão queimado, no meio de cinzas de ervas centenárias, sobrou um caldeirão de bronze intacto. Dentro, um pergaminho enrolado em seda cinza: o método de um alquimista que refinava "sem perder o nome da erva". Uma inscrição no fundo avisa: "O fogo que o queimou ainda tem dono."',
    choices: [
      { text: 'Levar o caldeirão e aprender o método.', res: { text: 'O caldeirão pesa duas vezes o que parece. O método, em semanas, vira instinto: cada erva refinada mantém o seu nome, o seu cheiro, a sua alma.', fx: { setFlags: ['tc_anciao_achou'], tecnica: ['caldeirao_anciao_cinzento'], item: ['fornalha_bronze'], stats: { comp: 2 }, agenda: [{ event: 'tc_anciao_2', em: [6, 14] }] } } },
      { text: 'Deixar o caldeirão: o fogo que o queimou pode voltar.', res: { text: 'Você sai de mãos vazias. Durante meses, a dúvida o acompanha: e se fosse a única chance?', fx: { stats: { dao: 1, sor: 1 }, setFlags: ['tc_anciao_deixou'] } } },
    ],
  },
  {
    id: 'tc_anciao_2', title: 'O Dono do Fogo', rarity: 'raro', once: true, weight: 0, escala: true, cond: U('caldeirao_anciao_cinzento', 2, 7),
    text: 'Um homem de mãos queimadas, o mestre alquimista que incendiou o pavilhão por rancor e depois se arrependeu, o encontra. "Eu queimei o que não devia", diz. "E o caldeirão sobreviveu. Ele escolheu você." Ele pede, humildemente, para ver o método uma última vez.',
    choices: [
      { text: 'Mostrar o método ao alquimista arrependido.', res: { text: 'Ele chora ao ver cada gesto. Em seguida, ensina o que faltava: uma sequência final, de chamas leves. Os dois refinam juntos uma única pílula, e ele parte em paz.', fx: { setFlags: ['tc_anciao_perdoou'], karma: 8, stats: { comp: 3 }, xp: 6, agenda: [{ event: 'tc_anciao_3', em: [8, 18] }] } } },
      { text: 'Recusar: ele queimou o pavilhão, e o método não é dele.', res: { text: 'O homem baixa a cabeça e vai embora, sem insistir. O caldeirão, na sua mesa, parece mais frio.', fx: { setFlags: ['tc_anciao_negou'], karma: -2, stats: { dao: 1 }, agenda: [{ event: 'tc_anciao_3', em: [8, 18] }] } } },
      { text: 'Desafiá-lo a refinar sem o método e provar o que sabe.', check: { stat: ['comp', 'esp'], dif: 2, tag: 'alquimia' }, ok: { text: 'O alquimista refina, com maestria, uma pílula de uma só chama. Impressionado, você entende o que ele foi, e aprende com ele o que ainda falta.', fx: { setFlags: ['tc_anciao_perdoou'], stats: { comp: 3, esp: 1 }, xp: 8, agenda: [{ event: 'tc_anciao_3', em: [8, 18] }] } }, fail: { text: 'A pílula sai torta, e o alquimista, humilhado, se afasta. O caldeirão, na mesa, parece rir.', fx: { stats: { comp: 1 }, agenda: [{ event: 'tc_anciao_3', em: [8, 18] }] } } },
    ],
  },
  {
    id: 'tc_anciao_3', title: 'O Pavilhão Que Pode Reacender', rarity: 'lendario', once: true, weight: 1.5, cond: U('caldeirao_anciao_cinzento', 3, 8),
    text: 'As cinzas do Pavilhão do Ancião Cinzento ainda estão lá, e o terreno, à venda por quase nada. Com o caldeirão, o método e anos de prática, você pode reabrir a casa de alquimia, e fazer dela o que nunca foi: um lugar que não esconde nada.',
    choices: [
      { text: 'Reabrir o Pavilhão do Ancião Cinzento como casa aberta de alquimia.', res: { text: 'Em vinte anos, o pavilhão volta a cheirar a ervas. Você ensina a todos, de graça, o método de refinar sem perder o nome da erva. Quando parte, o caldeirão fica aceso numa lareira de pedra.', fx: { fim: 'seita_renasce_anciao' } } },
      { text: 'Deixar as cinzas para os que as querem.', res: { text: 'Outro alquimista compra o terreno e abre algo diferente. O caldeirão, na sua mesa, continua a refinar, sem um nome de casa.', fx: { karma: 2, stats: { comp: 2 } } } },
    ],
  },

  /* ================= C) FUSÃO E PERFEIÇÃO ================= */
  {
    id: 'tc_fusao', title: 'A Iluminação Entre Duas Técnicas', rarity: 'raro', cooldown: 90, weight: 2.4, cond: { tierMin: 2, mestria: 2 },
    text: 'Durante uma noite de meditação, duas técnicas suas começam a conversar. Uma fala em corte, a outra em respiração; uma em corpo, a outra em sutra. De repente você vê o ponto em que elas se tocam: um novo método, mais fundo que as duas. Fundi-las exige abandonar ambas, e confiar no que nasce.',
    choices: [
      { text: 'Fundir a Espada do Orvalho com a Respiração da Nuvem: a Espada de Qi Condensado.', cond: { tecnicasTodas: ['espada_orvalho', 'respiracao_nuvem'] }, res: { text: 'O Qi da nuvem sobe pelo braço e sai pela espada. O corte do orvalho, a partir daí, corta mais longe do que o aço alcança.', fx: { removeTecnica: ['espada_orvalho', 'respiracao_nuvem'], tecnica: ['espada_de_qi'], ferida: 1, stats: { esp: 1, dao: 2 }, setFlags: ['tc_fundiu_espada_qi'] } } },
      { text: 'Fundir os Ossos de Ferro com o Sutra do Mérito: o Corpo de Sutra Vivo.', cond: { tecnicasTodas: ['ossos_de_ferro', 'sutra_do_merito'] }, res: { text: 'O corpo temperado aprende a recitar: cada golpe recebido vira uma sílaba, e o mérito escreve o resto.', fx: { removeTecnica: ['ossos_de_ferro', 'sutra_do_merito'], tecnica: ['corpo_de_sutra'], anos: 3, stats: { fis: 2, dao: 2 }, setFlags: ['tc_fundiu_corpo_sutra'] } } },
      { text: 'Fundir o Selo do Primeiro Traço com a Espada do Orvalho: o Selo da Lâmina Fechada.', cond: { tecnicasTodas: ['selo_primeiro_traco', 'espada_orvalho'] }, res: { text: 'Traço e corte se confundem. O selo é desenhado no ar com a ponta da espada e fecha-se sobre o inimigo.', fx: { removeTecnica: ['selo_primeiro_traco', 'espada_orvalho'], tecnica: ['selo_de_lamina'], ferida: 1, stats: { comp: 2, dao: 1 }, setFlags: ['tc_fundiu_selo_lamina'] } } },
      { text: 'Fundir o Caldeirão de Fogo Calmo com os Ossos de Ferro: o Fogo Vital.', cond: { tecnicasTodas: ['caldeirao_calmo', 'ossos_de_ferro'] }, res: { text: 'A chama do caldeirão desce ao peito e passa a temperar a carne de dentro para fora.', fx: { removeTecnica: ['caldeirao_calmo', 'ossos_de_ferro'], tecnica: ['fogo_vital'], ferida: 1, stats: { fis: 2, comp: 1 }, setFlags: ['tc_fundiu_fogo_vital'] } } },
      { text: 'Fundir a Chuva de Mil Agulhas com o Mar de Consciência: o Veneno da Alma.', cond: { tecnicasTodas: ['mil_agulhas', 'mar_de_consciencia'] }, res: { text: 'A agulha deixa de tocar o corpo e entra pela memória. O veneno apodrece o que o inimigo mais acredita.', fx: { removeTecnica: ['mil_agulhas', 'mar_de_consciencia'], tecnica: ['veneno_de_alma'], karma: -4, stats: { esp: 2, comp: 1 }, setFlags: ['tc_fundiu_veneno_alma'] } } },
      { text: 'Fundir o Pacto da Fera Irmã com o Passo da Garça: o Pacto das Sombras Gêmeas.', cond: { tecnicasTodas: ['pacto_da_fera', 'passo_garca'] }, res: { text: 'O companheiro e você aprendem a ser a mesma sombra em dois lugares.', fx: { removeTecnica: ['pacto_da_fera', 'passo_garca'], tecnica: ['sombras_gemeas'], anos: 3, stats: { sor: 2, esp: 1 }, setFlags: ['tc_fundiu_sombras'] } } },
      { text: 'Fundir o Sangue Ardente com os Ossos de Ferro: o Corpo Carmesim.', cond: { tecnicasTodas: ['caminho_do_sangue', 'ossos_de_ferro'] }, res: { text: 'O sangue sobe e endurece: carne e vermelho viram uma armadura que cobra em juízo o que dá em força.', fx: { removeTecnica: ['caminho_do_sangue', 'ossos_de_ferro'], tecnica: ['corpo_carmesim'], corr: 10, stats: { fis: 3 }, setFlags: ['tc_fundiu_carmesim'] } } },
      { text: 'Fundir o Mar de Consciência com o Selo das Nove Portas: a Paisagem Interior.', cond: { tecnicasTodas: ['mar_de_consciencia', 'selo_nove_portas'] }, res: { text: 'Uma formação desenhada dentro da própria consciência: um mundo de bolso, com portas que só você abre.', fx: { removeTecnica: ['mar_de_consciencia', 'selo_nove_portas'], tecnica: ['paisagem_interior'], anos: 4, stats: { esp: 3, comp: 2 }, setFlags: ['tc_fundiu_paisagem'] } } },
      { text: 'Deixar as técnicas como estão: a fusão pode esperar.', res: { text: 'A ideia se dissolve. Em noites parecidas, ela volta, mais clara.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tc_perfeicao', title: 'A Perfeição de um Método', rarity: 'raro', cooldown: 90, weight: 2.4, cond: { tierMin: 2, mestria: 4 },
    text: 'Depois de anos de repetição, um dos seus métodos chega ao que os velhos chamam de Perfeição: não há mais diferença entre o gesto e a vontade. O Qi segue, sem pedir. Mas todo método perfeito pede, em troca, um tipo de renúncia: ou abrir mão da pressa, ou da fama, ou do medo.',
    choices: [
      { text: 'Renunciar à pressa: ficar anos sem tentar romper um gargalo, deixando o método assentar.', res: { text: 'Cinco anos de calma. O método, sem pressa, se aprofunda ainda mais, e os gargalos, depois, parecem mais baixos.', fx: { anos: 5, stats: { dao: 3, esp: 1 }, setFlags: ['tc_perfeicao_pressa'] } } },
      { text: 'Renunciar à fama: nunca mais usar o método em público.', res: { text: 'O método passa a ser seu segredo. Quem o vê, suspeita; quem o usa, esconde. Algo, nele, se torna mais íntimo.', fx: { fama: -6, stats: { dao: 3, sor: 1 }, setFlags: ['tc_perfeicao_fama'] } } },
      { text: 'Renunciar ao medo: usar o método contra algo que o assusta.', check: { stat: ['dao', 'fis', 'esp'], dif: 2 }, ok: { text: 'O medo vem inteiro, e o método o atravessa. Quando o perigo acaba, o medo, em você, é só um velho conhecido.', fx: { stats: { dao: 4, fis: 1 }, fama: 6, setFlags: ['tc_perfeicao_medo'] } }, fail: { text: 'O medo vence em parte, e o método, perfeito, mostra-se sensível ao desânimo. Você aprende que a perfeição também falha.', fx: { ferida: 2, stats: { dao: 2 } } } },
    ],
  },

  /* ================= D) TÉCNICAS DIVINAS RARAS ================= */
  {
    id: 'tc_obter_lamina_unica', title: 'O Golpe Que Cabe Todas as Espadas', rarity: 'lendario', once: true, weight: 1.0, escala: true, cond: { tierMin: 4, tierMax: 8, tecnicaTag: 'espada', noFlags: ['tc_lamina_unica'] },
    text: 'Num pico onde ninguém mora, uma espada sem bainha está enterrada até o punho numa pedra. Ao seu redor, centenas de lâminas de todos os tipos estão cravadas na rocha, como um bosque de aço. Uma voz diz, sem boca: "Todo espadachim que chega aqui larga uma espada. Quem larga a última, ganha o golpe."',
    choices: [
      { text: 'Largar a sua espada e aceitar o Golpe Único.', res: { text: 'A sua espada fica cravada na pedra, entre as outras. O golpe, que você agora conhece, cabe na mão vazia: um corte que reúne todas as lâminas do bosque. A voz diz: "Agora você não precisa de outra."', fx: { setFlags: ['tc_lamina_unica'], tecnica: ['lamina_unica'], stats: { dao: 4, fis: 1 }, fama: 12, agenda: [{ event: 'tc_g4_lamina_unica', em: [10, 22] }] } } },
      { text: 'Recusar o golpe e seguir com a sua espada.', res: { text: 'A sua espada continua com você, mais pesada de significado. A voz ri baixo: "Os que recusam também são espadachins."', fx: { stats: { dao: 3 }, karma: 3 } } },
      { text: 'Desafiar a voz.', check: { stat: ['dao', 'fis', 'esp'], dif: 4, tag: 'espada' }, ok: { text: 'A voz cede: "Poucos chegam com a espada e com a vontade." Você conserva a lâmina e leva o golpe, sem precisar largar nada.', fx: { setFlags: ['tc_lamina_unica'], tecnica: ['lamina_unica'], stats: { dao: 5, fis: 2 }, fama: 16, agenda: [{ event: 'tc_g4_lamina_unica', em: [10, 22] }] } }, fail: { text: 'O bosque de lâminas vibra, e uma delas o corta de leve. A voz diz, divertida: "Volte quando souber desistir."', fx: { ferida: 3, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tc_g4_lamina_unica', title: 'Quem Procura o Dono do Golpe Único', rarity: 'lendario', once: true, weight: 0, escala: true, cond: U('lamina_unica', 4, 8),
    text: 'Duelistas de todos os continentes ouvem falar do Golpe Único e viajam para vê-lo. Alguns querem aprendê-lo, outros destruí-lo, outros apenas comprovar que a lenda é mentira. Um deles, em particular, tem a mesma idade que você e a mesma fome.',
    choices: [
      { text: 'Encerrar a jornada como o Último Espadachim: dar o golpe uma única vez, na montanha, e nunca mais sacar espada.', res: { text: 'Você sobe ao pico, dá o golpe no vazio, e o ar se abre como pano. Depois, pendura a espada ao lado das outras e nunca mais saca. Duelistas vêm e vão, e a lenda se fecha ali.', fx: { fim: 'lenda_lamina_unica' } } },
      { text: 'Ensinar o princípio do golpe, sem o próprio golpe.', res: { text: 'Você ensina a ouvir a espada, a esperar, a escolher o único golpe que importa. A escola nunca ensina o Golpe Único, e produz, sem querer, uma geração de espadachins calmos.', fx: { karma: 8, fama: 10, stats: { dao: 3, car: 1 } } } },
    ],
  },
  {
    id: 'tc_obter_mil_ciclos', title: 'O Altar dos Mil Renascimentos', rarity: 'lendario', once: true, weight: 1.0, cond: { tierMin: 4, tierMax: 8, tecnicaTag: 'corpo', noFlags: ['tc_mil_ciclos'] },
    text: 'No fundo de uma gruta de calcário, um altar de pedra branca tem mil marcas de mãos: uma para cada vez que alguém tentou o ritual e falhou. Há um espaço livre, do tamanho exato da sua. O ritual é simples e terrível: morrer, deliberadamente, e voltar.',
    choices: [
      { text: 'Pôr a mão no altar e tentar o ritual.', check: { stat: ['fis', 'dao'], dif: 4, tag: 'corpo' }, ok: { text: 'Você morre, de um jeito curto e limpo. Quando volta, o corpo conhece mil ciclos, e a pedra do altar, branca, ganha uma nova marca. Nenhuma ferida, depois, dura mais que uma noite.', fx: { setFlags: ['tc_mil_ciclos'], tecnica: ['mil_ciclos_corpo'], stats: { fis: 5, dao: 2 }, fama: 12, agenda: [{ event: 'tc_g4_mil_ciclos', em: [10, 22] }] } }, fail: { text: 'O corpo não volta de imediato, e você passa três dias entre mundos. O altar o devolve, vazio de ritual e cheio de respeito.', fx: { ferida: 4, stats: { dao: 3 }, vida: -20 } } },
      { text: 'Recusar: a morte não é lição que se peça.', res: { text: 'Você tira a mão da pedra. O altar, calado, parece decepcionado e aliviado. Algumas portas são mais sábias fechadas.', fx: { stats: { dao: 3 }, karma: 3 } } },
    ],
  },
  {
    id: 'tc_g4_mil_ciclos', title: 'O Corpo Que Não Termina', rarity: 'lendario', once: true, weight: 0, cond: U('mil_ciclos_corpo', 4, 8),
    text: 'Seu corpo já não envelhece à vista, nem sangra além de uma noite. A tentação, nesse estágio, é enorme: viver para sempre aqui, sem ascender, sem partir, só observando. Um velho monge, do outro lado do altar, lembra que o ciclo, também, precisa de quem o feche.',
    choices: [
      { text: 'Encerrar a jornada como o Guardião do Altar: ficar ao lado da pedra, orientando quem queira tentar.', res: { text: 'Você se instala na gruta e passa séculos recebendo candidatos, uns que voltam, outros que não. Cada nova marca no altar é um nome que você nunca esquece.', fx: { fim: 'lenda_mil_ciclos' } } },
      { text: 'Seguir viajando: o altar é só o começo.', res: { text: 'O corpo dos mil ciclos aguenta o que vier. Você segue, atento, pelo mundo, sem se prender a nenhuma pedra.', fx: { stats: { fis: 3, dao: 2 }, vida: 40 } } },
    ],
  },
  {
    id: 'tc_obter_trono_vazio', title: 'O Trono Onde Ninguém Senta', rarity: 'lendario', once: true, weight: 1.0, cond: { tierMin: 5, tierMax: 8, tecnicaTag: 'mente', noFlags: ['tc_trono_vazio'] },
    text: 'Numa sala de pedra no coração de uma montanha oca, um trono de madeira escura está vazio. A poeira não pousa nele. Quem se aproxima sente o peito pesar, como se o mundo inteiro quisesse que alguém sentasse ali. Uma inscrição, no encosto, diz apenas: "O poder é de quem não o quer."',
    choices: [
      { text: 'Sentar-se no trono, sem querer nada.', check: { stat: ['dao', 'esp', 'car'], dif: 4, tag: 'mente' }, ok: { text: 'Você se senta e deixa o desejo ir. O trono se aquece, e o mundo, ao redor, se dobra um pouco: portas se abrem, olhares se baixam. Você, sem querer, aprendeu o Sutra do Trono Vazio.', fx: { setFlags: ['tc_trono_vazio'], tecnica: ['trono_vazio'], stats: { esp: 3, car: 3, dao: 2 }, fama: 14, agenda: [{ event: 'tc_g4_trono_vazio', em: [10, 22] }] } }, fail: { text: 'No instante em que você sente vontade de mandar, o trono esfria e o expulsa com um tranco. Você sai tonto, com uma lição incômoda sobre si mesmo.', fx: { ferida: 2, stats: { dao: 3 } } } },
      { text: 'Recusar o trono e sair em silêncio.', res: { text: 'O trono, ao ser deixado, parece mais vazio ainda. Você carrega, pela vida, a memória de uma cadeira que ninguém quis.', fx: { stats: { dao: 4 }, karma: 4 } } },
    ],
  },
  {
    id: 'tc_g4_trono_vazio', title: 'Os Reinos Que Querem um Rei Que Não Queira', rarity: 'lendario', once: true, weight: 0, cond: U('trono_vazio', 5, 8),
    text: 'Reis e patriarcas, ao sentir o seu Qi de trono vazio, vêm pedir que você arbitre disputas: quem fica com o quê, quem governa onde. Você, que nada quer, é o único em quem todos confiam, e a razão é exatamente essa.',
    choices: [
      { text: 'Encerrar a jornada como o Árbitro Sem Trono: decidir disputas de graça, em uma cadeira vazia, até o fim.', res: { text: 'Você passa a vida numa sala de pedra, onde reis e camponeses vêm pedir uma sentença. Nunca aceita pagamento, nunca guarda rancor. Quando parte, a cadeira fica vazia, e nenhum reino ousa preenchê-la.', fx: { fim: 'lenda_trono_vazio' } } },
      { text: 'Recusar o papel: ser árbitro é uma forma de querer.', res: { text: 'Reis e patriarcas voltam, decepcionados, e fazem as pazes sozinhos, mal. Você, longe, sente o alívio e o peso.', fx: { stats: { dao: 3 }, karma: 2 } } },
    ],
  },
  {
    id: 'tc_obter_rio_sem_margem', title: 'A Nascente do Rio Sem Margem', rarity: 'lendario', once: true, weight: 1.0, cond: { tierMin: 5, tierMax: 8, tecnicaTag: 'qi', noFlags: ['tc_rio_sem_margem'] },
    text: 'No alto de uma cordilheira, um filete de Qi puro brota da rocha e desce, sem leito, sem fim, por onde quer. Os que o seguem somem; os que o tocam voltam diferentes. Um velho pescador, sentado ao lado, diz: "Pesco aqui há cem anos. O rio nunca me deu um peixe, e nunca me tirou nada."',
    choices: [
      { text: 'Entrar no rio e seguir a corrente.', check: { stat: ['esp', 'dao', 'sor'], dif: 4, tag: 'qi' }, ok: { text: 'A corrente leva você por leitos que não existem, e traz de volta. O Qi, depois, flui sem margem: não se esgota, não se afoga, não obedece a mais ninguém.', fx: { setFlags: ['tc_rio_sem_margem'], tecnica: ['rio_sem_margem'], stats: { esp: 5, comp: 1 }, fama: 12, agenda: [{ event: 'tc_g4_rio_sem_margem', em: [10, 22] }] } }, fail: { text: 'O rio o leva longe, e o devolve às margens de uma vila distante, sem lembrar bem do trajeto. Você aprende que nem todo rio se deixa seguir.', fx: { ferida: 2, anos: 3, stats: { esp: 2 } } } },
      { text: 'Sentar-se ao lado do pescador e observar.', res: { text: 'Cem dias, e o rio vira lição. Você parte sem ter entrado, e o velho, ao se despedir, diz: "Quem só olha, às vezes entende mais."', fx: { stats: { dao: 4, esp: 1 }, xp: 8 } } },
    ],
  },
  {
    id: 'tc_g4_rio_sem_margem', title: 'Quem Pergunta Aonde Vai o Rio', rarity: 'lendario', once: true, weight: 0, cond: U('rio_sem_margem', 5, 8),
    text: 'O Qi que corre dentro de você já não tem leito, e começa a escorrer, às vezes, para fora: plantas crescem onde você dorme, doentes se curam ao seu lado, aldeias secas florescem por onde você passa. A pergunta é onde derramar um rio.',
    choices: [
      { text: 'Encerrar a jornada como o Rio Que Anda: caminhar de vila em vila, deixando o Qi correr onde for preciso.', res: { text: 'Você nunca mais fica num lugar mais que uma estação. Vilas secas voltam a ter água, doentes se levantam, e ninguém nunca soube a quem agradecer. Quando você parte, o Qi continua a correr, sozinho, atrás de quem precise.', fx: { fim: 'lenda_rio_sem_margem' } } },
      { text: 'Conter o rio num único lugar e fazer dele um refúgio.', res: { text: 'Você escolhe um vale e o deixa correr ali. O vale vira refúgio, e o resto do mundo, uma lembrança que o rio vai de vez em quando visitar.', fx: { karma: 8, fama: 8, stats: { esp: 2, dao: 2 } } } },
    ],
  },
];
