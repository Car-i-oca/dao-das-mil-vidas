import type { GameEvent } from '../../types';
import type { Molde } from '../opcoes';

/**
 * Lote 29 — Constituições especiais e Raízes espirituais. Cada uma tem eventos próprios (quem a cobiça, como usá-la,
 * quais os riscos) e opções exclusivas em eventos comuns.
 */
const C = (c: string, min = 1, max = 8, extra: Record<string, unknown> = {}) => ({ constitution: [c], tierMin: min, tierMax: max, ...extra });
const R = (r: string, min = 1, max = 8, extra: Record<string, unknown> = {}) => ({ root: [r], tierMin: min, tierMax: max, ...extra });

export const lote29CorpoRaiz: GameEvent[] = [
  /* ================= CONSTITUIÇÕES ================= */
  {
    id: 'cs_yin_1', title: 'O Frio Que Ninguém Aguenta', rarity: 'raro', once: true, weight: 3, cond: C('yin_puro', 1, 4),
    text: 'Onde você dorme, a água da bacia amanhece com uma crosta de gelo. Os discípulos de Yang, de Qi quente, sentem arrepios quando você passa. Um ancião de Yang, ao perceber, oferece um trato: eles precisam de um "Yin puro" para um ritual de equilíbrio.',
    choices: [
      { text: 'Participar do ritual de equilíbrio com a seita de Yang.', res: { text: 'Três dias de ritual, entre fogo e gelo. A seita ganha o equilíbrio, e você, um aliado quente e uma marca de respeito nos dois lados do mundo.', fx: { setFlags: ['cs_yin_equilibrio'], faccao: 'seita', fama: 8, stats: { esp: 2 }, xp: 6, agenda: [{ event: 'cs_yin_2', em: [8, 16] }] } } },
      { text: 'Recusar: o seu frio é seu, e não de uma seita.', res: { text: 'O ancião aceita, mas passa a vigiá-lo de longe. O frio, pelos anos seguintes, cresce no seu peito como uma promessa de poder.', fx: { setFlags: ['cs_yin_livre'], stats: { esp: 1, dao: 1 }, agenda: [{ event: 'cs_yin_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'cs_yin_2', title: 'O Par Que Esquenta', rarity: 'raro', once: true, weight: 0, cond: C('yin_puro', 1, 6),
    text: 'Um cultivador de corpo Yang, de calor que faz a neve derreter, cruza o seu caminho. Dois corpos opostos, ao cultivarem juntos, dobram o rendimento de ambos, mas precisam de confiança total: um erro de ritmo e os dois queimam, ou congelam.',
    choices: [
      { text: 'Propor cultivo conjunto, com regras claras.', check: { stat: ['esp', 'dao', 'car'], dif: 1, tag: 'qi' }, ok: { text: 'O primeiro mês é estranho, o segundo, bom, o terceiro, profundo. A parceria rende uma amizade e um jeito de cultivar que nenhum dos dois acharia sozinho.', fx: { setFlags: ['cs_yin_par'], xp: 12, stats: { esp: 2, dao: 1 }, karma: 3 } }, fail: { text: 'O ritmo falha numa noite. Vocês saem chamuscados e congelados em partes iguais, e a parceria termina em desculpas.', fx: { ferida: 2, xp: 3, stats: { esp: 1 } } } },
      { text: 'Recusar: a vida de Yin é solitária e suficiente.', res: { text: 'Você segue sozinho. O frio, agora, tem uma voz mais clara, e a certeza de que o isolamento também é uma escolha.', fx: { stats: { dao: 2, esp: 1 } } } },
    ],
  },
  {
    id: 'cs_oss_1', title: 'Os Ossos Que Todos Querem', rarity: 'raro', once: true, weight: 3, cond: C('ossos_dragao', 1, 4),
    text: 'Um alquimista de olhar frio, em visita à seita, para diante de você e apalpa o seu braço: "Ossos de dragão, e ainda vivos." Oferece uma bolsa gorda por uma única costela, ao morrer, ou por um pó de osso a cada ano. Outros, menos educados, não oferecem: apenas observam.',
    choices: [
      { text: 'Vender um pó de osso por ano, em troca de proteção e dinheiro.', res: { text: 'O acordo rende bem, e dói um pouco a cada ano. O alquimista, satisfeito, passa a ser um aliado ocasional.', fx: { setFlags: ['cs_oss_vende'], pedras: 180, stats: { car: 1 }, agenda: [{ event: 'cs_oss_2', em: [8, 16] }] } } },
      { text: 'Recusar e esconder o que você é.', res: { text: 'Você veste mangas largas e anda de ombros curvos. O segredo pesa, mas os caçadores de ossos demoram a farejá-lo.', fx: { setFlags: ['cs_oss_oculto'], stats: { dao: 1, sor: 1 }, agenda: [{ event: 'cs_oss_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'cs_oss_2', title: 'O Peso do Dragão', rarity: 'raro', once: true, weight: 0, cond: C('ossos_dragao', 1, 6),
    text: 'Seus ossos, densos demais, o fazem afundar na água e quebrar espadas de voo. Um mestre de corpo diz que isso é bênção, não defeito: a densidade pode ser refinada em um corpo de lenda. Mas o método exige que você aguente uma década de martelos nos ossos.',
    choices: [
      { text: 'Aceitar a década de martelos.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'corpo' }, ok: { text: 'Dez anos de martelos, e os ossos cantam como sinos de bronze. Você é, agora, um corpo que a própria lâmina hesita em tocar.', fx: { setFlags: ['cs_oss_refinado'], stats: { fis: 4 }, anos: 5, vida: 30 } }, fail: { text: 'No oitavo ano, uma costela cede, e o corpo reage mal. Você sai com ossos mais fortes e com uma dor de vento.', fx: { ferida: 3, stats: { fis: 2 }, anos: 5 } } },
      { text: 'Aceitar o peso e seguir sem refinar.', res: { text: 'Você aprende a viver com ossos densos: caminhar, nadar, voar de outro jeito. Há uma economia estranha em não mudar o que se é.', fx: { stats: { fis: 1, dao: 2 } } } },
    ],
  },
  {
    id: 'cs_esp_1', title: 'A Lâmina Que Nasceu em Você', rarity: 'raro', once: true, weight: 3, cond: C('corpo_espada', 1, 4),
    text: 'Espadas penduradas na parede vibram quando você passa. Numa feira de ferreiros, uma lâmina de três mil anos, trancada em vidro, estremece a ponto de rachar a vitrine. O dono, atônito, pergunta quem você é.',
    choices: [
      { text: 'Pegar a lâmina que o chamou.', res: { text: 'Ela se encaixa na sua mão como uma costela perdida. Ao tocá-la, um método antigo volta à superfície do seu corpo, sem você ter estudado.', fx: { setFlags: ['cs_esp_lamina'], item: ['lamina_vento_sul'],  stats: { dao: 2, fis: 1 }, agenda: [{ event: 'cs_esp_2', em: [8, 16] }] } } },
      { text: 'Deixar a lâmina e sair sem dizer nada.', res: { text: 'Você deixa a vitrine rachada para trás. A lâmina, de dentro do vidro, o acompanha com um silvo longo. Uma espada que o escolheu não esquece.', fx: { setFlags: ['cs_esp_recusou'], stats: { dao: 2 }, agenda: [{ event: 'cs_esp_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'cs_esp_2', title: 'A Seita das Lâminas Quebradas', rarity: 'raro', once: true, weight: 0, cond: C('corpo_espada', 1, 6),
    text: 'Uma seita de espadachins, cujos fundadores tinham o seu corpo, sente a sua presença e manda convite: querem que você assuma como herdeiro, aprenda o método final e proteja o templo. Mas o método final cobra a espada do próprio mestre.',
    choices: [
      { text: 'Aceitar o posto de herdeiro e aprender o método final.', res: { text: 'Anos de treino, uma noite de cerimônia. O método agora é seu, e a lâmina do velho mestre, quebrada em dois, repousa a seus pés.', fx: { setFlags: ['cs_esp_herdeiro'],  faccao: 'seita', stats: { dao: 3, fis: 1 }, fama: 8 } } },
      { text: 'Recusar: a espada que nasceu em você não tem seita.', res: { text: 'A seita aceita, sem honra e sem rancor. Você segue com a espada que nasceu em seu corpo, e sem herança que obrigue.', fx: { stats: { dao: 2, sor: 1 }, fama: 3 } } },
    ],
  },
  {
    id: 'cs_cao_1', title: 'O Corpo Que Absorve Tudo', rarity: 'raro', once: true, weight: 3, cond: C('caos', 1, 4),
    text: 'Você tomou, por engano, uma sopa envenenada, e em vez de adoecer, sentiu o veneno virar Qi. Notou depois: nada o faz mal, e tudo o faz mudar um pouco. O curandeiro, assustado, diz que seu corpo é "uma esponja de mundo".',
    choices: [
      { text: 'Testar os limites: absorver Qi de tudo que encontrar.', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'Você absorve ervas, pedras, até fogo de lareira. O Qi cresce rápido, caótico, e você aprende a organizá-lo como quem separa roupas sujas.', fx: { setFlags: ['cs_cao_esponja'], xp: 14, stats: { esp: 2, fis: 1 }, corr: 3, agenda: [{ event: 'cs_cao_2', em: [8, 16] }] } }, fail: { text: 'Uma mistura errada o derruba por uma semana. O corpo, ao fim, absorve até a lição.', fx: { setFlags: ['cs_cao_esponja'], ferida: 3, xp: 5, stats: { dao: 1 }, agenda: [{ event: 'cs_cao_2', em: [8, 16] }] } } },
      { text: 'Limitar o que absorve, por prudência.', res: { text: 'Você aprende a dizer "não" ao corpo, e a escolher o que entra. O Qi cresce menos, e mais limpo.', fx: { setFlags: ['cs_cao_cauteloso'], stats: { dao: 2 }, agenda: [{ event: 'cs_cao_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'cs_cao_2', title: 'A Tempestade Que Não Pede Licença', rarity: 'raro', once: true, weight: 0, cond: C('caos', 1, 6),
    text: 'Numa noite, o Qi absorvido durante anos decide rebelar-se: dez tipos diferentes de energia disputam o seu Dantian, e nenhum cede. O corpo vira um campo de batalha. Alguém precisa decidir quem comanda.',
    choices: [
      { text: 'Impor a ordem com o Coração do Dao.', check: { stat: ['dao', 'esp'], dif: 2 }, ok: { text: 'Uma única decisão firme, repetida por horas. As energias, uma a uma, obedecem. O seu Dantian, de caótico, vira um redemoinho disciplinado.', fx: { setFlags: ['cs_cao_ordem'], stats: { dao: 3, esp: 2 }, xp: 10, corr: -3 } }, fail: { text: 'A ordem vence só em parte. Você sai da noite com marcas de queimadura e dois tipos de Qi que não conversam.', fx: { ferida: 3, corr: 4, stats: { dao: 2 } } } },
      { text: 'Deixar as energias se acertarem sozinhas.', res: { text: 'A guerra interna dura três dias. No fim, dois tipos de Qi vencem e os outros se dissolvem. O resultado é imprevisível, e fascinante.', fx: { setFlags: ['cs_cao_livre'], stats: { esp: 1, sor: 2 }, xp: 6, ferida: 1 } } },
    ],
  },
  {
    id: 'cs_vei_1', title: 'O Selo Antigo Rachou', rarity: 'raro', once: true, weight: 3, cond: C('veias_quebradas', 1, 4),
    text: 'Sob a pele, uma linha de luz, que você nunca viu, brilha por um instante: um selo antigo, colocado em você antes de nascer, está trincando. Uma voz distante, de dentro dele, murmura: "Ainda não. Mas logo."',
    choices: [
      { text: 'Procurar quem colocou o selo.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'Depois de meses, você acha um velho mestre de formações, que confessa: foi o pai dele, por pedido dos seus pais, para esconder o seu potencial de caçadores. O velho entrega a chave.', fx: { setFlags: ['cs_vei_chave'], item: ['cristal_formacao'], stats: { comp: 2, dao: 1 }, agenda: [{ event: 'cs_vei_2', em: [8, 16] }] } }, fail: { text: 'A busca termina em túmulos, sem nome. Mas a linha de luz continua, e a voz, também.', fx: { stats: { comp: 1, dao: 1 }, agenda: [{ event: 'cs_vei_2', em: [8, 16] }] } } },
      { text: 'Ignorar o selo e viver como se nada fosse.', res: { text: 'A linha de luz some por um tempo. Você segue, com a sensação de caminhar sobre gelo fino, e de que a decisão será tomada por você, ou contra você.', fx: { stats: { dao: 2 }, agenda: [{ event: 'cs_vei_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'cs_vei_2', title: 'A Ruptura', rarity: 'raro', once: true, weight: 0, cond: C('veias_quebradas', 1, 6),
    text: 'O selo cede de vez. Uma torrente de Qi ancestral desce pelas suas veias, como rio atrás de uma barragem que se rompeu. Você pode tentar contê-la, deixá-la correr, ou direcioná-la, e cada escolha tem um preço e um prêmio.',
    choices: [
      { text: 'Deixar a torrente correr livre, aguentando o que vier.', check: { stat: ['fis', 'dao', 'esp'], dif: 2 }, ok: { text: 'Quando a torrente passa, você é outro: veias largas como rios, Qi de outra era. O preço foi um mês de febre, e o prêmio, uma vida inteira de poder.', fx: { setFlags: ['cs_vei_rompeu'], stats: { fis: 2, esp: 3, dao: 2 }, xp: 20, ferida: 2 } }, fail: { text: 'A torrente vence o corpo. Você sobrevive por teimosia, queimado por dentro, mas com as veias abertas pela metade.', fx: { ferida: 4, stats: { esp: 1, dao: 2 }, xp: 8 } } },
      { text: 'Usar a chave e abrir o selo aos poucos.', cond: { flags: ['cs_vei_chave'] }, res: { text: 'Uma abertura lenta, de cem dias, com a chave nas mãos e um velho mestre ao lado. Sem dor, sem pressa, e sem perder um grama do poder.', fx: { setFlags: ['cs_vei_rompeu'], stats: { esp: 3, dao: 2, fis: 1 }, xp: 18 } } },
      { text: 'Reforçar o selo e adiar a ruptura.', res: { text: 'O selo volta a se fechar, e o poder volta a dormir. Você ganha anos, e perde, talvez, o que poderia ter sido.', fx: { stats: { dao: 3 }, karma: 2 } } },
    ],
  },
  {
    id: 'cs_jad_1', title: 'A Beleza Que Não Passa', rarity: 'raro', once: true, weight: 3, cond: C('jade_eterno', 1, 5),
    text: 'Aos sessenta, você ainda parece ter vinte. Admiradores o seguem em vilas inteiras, e uma seita de "colecionadores de juventude" anda o espionando. Eles acreditam que seu corpo é a chave de uma pílula de eterna juventude.',
    choices: [
      { text: 'Esconder o rosto e viver discretamente.', res: { text: 'Máscaras, capuzes, nomes trocados. A discrição o protege, e a solidão vem junto.', fx: { setFlags: ['cs_jad_escondeu'], stats: { dao: 1, sor: 1 }, agenda: [{ event: 'cs_jad_2', em: [10, 20] }] } } },
      { text: 'Enfrentar os colecionadores e acabar com a seita.', check: { stat: ['fis', 'esp', 'car'], dif: 1, tag: 'combate' }, ok: { text: 'Você os desbarata, um por um. A seita, sem líder, se dissolve, e a sua fama de belo e perigoso se espalha.', fx: { setFlags: ['cs_jad_enfrentou'], fama: 10, stats: { fis: 1, esp: 1 }, karma: 3, agenda: [{ event: 'cs_jad_2', em: [10, 20] }] } }, fail: { text: 'Eles são mais numerosos do que parecia. Você escapa, ferido, e o jogo vira caçada.', fx: { setFlags: ['cs_jad_enfrentou'], ferida: 3, stats: { dao: 1 }, agenda: [{ event: 'cs_jad_2', em: [10, 20] }] } } },
      { text: 'Fazer um acordo: ensinar a eles uma versão do segredo.', res: { text: 'Você entrega uma receita parcial, que dá aos colecionadores uma juventude breve. Eles ficam satisfeitos, e você aprende a negociar com quem o queria desmontar.', fx: { setFlags: ['cs_jad_acordo'], pedras: 150, karma: -2, stats: { car: 1, comp: 1 }, agenda: [{ event: 'cs_jad_2', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'cs_jad_2', title: 'O Fardo de Não Envelhecer', rarity: 'raro', once: true, weight: 0, cond: C('jade_eterno', 2, 7),
    text: 'Os que o conheceram jovem estão velhos, ou mortos. Os que o conhecem velho nunca acreditam que você tenha essa idade. Uma antiga amiga, já de cabelos brancos, olha o seu rosto e diz, sem rancor: "Você não tem o direito de ficar bonito assim."',
    choices: [
      { text: 'Aceitar o fardo e ficar ao lado dela até o fim.', res: { text: 'Você acompanha a velhice dela, dia a dia. Quando ela parte, deixa um recado: "Obrigada por não ter ido embora."', fx: { setFlags: ['cs_jad_fiel'], karma: 8, stats: { dao: 3, car: 1 } } } },
      { text: 'Ir embora antes que a diferença pese demais.', res: { text: 'A despedida é curta e boa. Você passa a viver em movimento, e a ter amigos por estação.', fx: { setFlags: ['cs_jad_foi'], stats: { sor: 1, dao: 1 } } } },
    ],
  },

  /* ================= RAÍZES ================= */
  {
    id: 'rz_unica', title: 'A Raiz Que Só Tem Um Rosto', rarity: 'raro', once: true, weight: 3, cond: R('unica', 1, 5),
    text: 'Os mestres de uma seita medem sua raiz e ficam em silêncio: um único elemento, puríssimo. É um dom raro, e uma limitação: tudo o que você aprende precisa ser filtrado por esse elemento. Dois mestres se oferecem para ensiná-lo, com métodos opostos.',
    choices: [
      { text: 'Seguir o mestre que ensina a aprofundar o elemento até o limite.', res: { text: 'Uma década de mergulho num só rio. Seu elemento ganha uma profundidade que nenhum raio de cinco raízes alcança.', fx: { setFlags: ['rz_unica_fundo'], stats: { esp: 3, dao: 1 }, xp: 10 } } },
      { text: 'Seguir o mestre que ensina a ampliar o elemento a todos os usos.', res: { text: 'Aprende a usar o seu elemento até para o que não parece servir: curar com fogo, cortar com água. A flexibilidade vira estilo.', fx: { setFlags: ['rz_unica_largo'], stats: { comp: 2, esp: 2 }, xp: 8 } } },
    ],
  },
  {
    id: 'rz_mutante', title: 'O Elemento Que Não Está nos Livros', rarity: 'raro', once: true, weight: 3, cond: R('mutante', 1, 5),
    text: 'Sua raiz é mutante: nem um dos cinco elementos conhecidos. Alguns mestres a chamam de maldição, outros de milagre, outros de problema administrativo. Uma seita de estudiosos oferece ajuda para estudá-la, e uma seita caçadora de raros, para recolhê-la.',
    choices: [
      { text: 'Aceitar o estudo e abrir o caminho para outros mutantes.', res: { text: 'Meses de testes. A seita registra o seu elemento num livro novo, e o seu nome vira referência para mutantes futuros.', fx: { setFlags: ['rz_mutante_estudado'], fama: 8, karma: 4, stats: { comp: 2, esp: 1 } } } },
      { text: 'Recusar o estudo e fugir dos caçadores.', check: { stat: ['sor', 'esp'], dif: 1, tag: 'fuga' }, ok: { text: 'Você os despista, e leva consigo o segredo. O elemento mutante é seu, e só seu, e ninguém sabe o que ele faz de verdade.', fx: { setFlags: ['rz_mutante_livre'], stats: { esp: 2, sor: 2 } } }, fail: { text: 'Os caçadores o alcançam, e a fuga custa caro. Você escapa, com marcas, e com uma lição sobre ser raro.', fx: { setFlags: ['rz_mutante_livre'], ferida: 3, stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'rz_dupla', title: 'Duas Metades de um Mesmo Rio', rarity: 'raro', once: true, weight: 3, cond: R('dupla', 1, 5),
    text: 'A sua raiz tem dois elementos, que combinam, ou se atrapalham, dependendo da hora. Um mestre sugere que você aprenda a "alternar", ou a "fundir". São duas escolas, e cada uma exige anos de dedicação.',
    choices: [
      { text: 'Aprender a alternar entre os dois elementos conforme a necessidade.', res: { text: 'Você passa a ter dois estilos num corpo: fogo de manhã, água à noite. A versatilidade desconcerta os adversários.', fx: { setFlags: ['rz_dupla_alterna'], stats: { comp: 2, sor: 1 }, xp: 6 } } },
      { text: 'Aprender a fundir os dois num terceiro elemento.', check: { stat: ['comp', 'esp', 'dao'], dif: 1 }, ok: { text: 'A fusão é estranha e linda: algo que não é fogo nem água, mas vapor, e que tem o poder dos dois. Seu elemento ganha nome próprio.', fx: { setFlags: ['rz_dupla_funde'], stats: { esp: 3, comp: 1 }, xp: 10, fama: 4 } }, fail: { text: 'A fusão falha duas vezes e machuca. Você volta ao básico, e aprende a respeitar a diferença.', fx: { ferida: 2, stats: { comp: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'rz_tripla', title: 'A Raiz do Meio-Termo', rarity: 'comum', once: true, weight: 3, cond: R('tripla', 1, 5),
    text: 'Três elementos: nem tão raro que o mundo se curve, nem tão comum que ninguém note. Os mestres dizem que é a raiz dos que dependem de esforço. Uma antiga lenda diz que os de raiz tripla, quando se dedicam, vão longe sem ninguém perceber.',
    choices: [
      { text: 'Aceitar o caminho do esforço e dedicar-se à rotina.', res: { text: 'Cada dia, uma pedra no muro. Anos depois, o muro é uma fortaleza, e ninguém lembra que você começou sem destaque.', fx: { setFlags: ['rz_tripla_esforco'], stats: { dao: 2, fis: 1 }, xp: 8 } } },
      { text: 'Buscar atalhos: pílulas, mestres caros, rotas secretas.', res: { text: 'Você gasta pedras e conexões. Os atalhos funcionam, em parte, e custam em outra: dívidas, favores, olhares tortos.', fx: { setFlags: ['rz_tripla_atalho'], pedras: -80, xp: 14, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'rz_quadrupla', title: 'A Raiz Que Pesa', rarity: 'comum', once: true, weight: 3, cond: R('quadrupla', 1, 5),
    text: 'Quatro elementos disputam o seu Dantian, e cada um dá sua opinião. O cultivo é lento, e a tentação de desistir é grande. Um velho instrutor diz que há um truque: escolher um "capitão" entre os quatro, e tratar os outros como tripulação.',
    choices: [
      { text: 'Escolher um elemento capitão e deixar os outros em segundo plano.', res: { text: 'O capitão assume, e os outros, aos poucos, se acalmam. O cultivo ganha um centro, e a lentidão, um propósito.', fx: { setFlags: ['rz_quad_capitao'], stats: { dao: 2, esp: 1 }, xp: 8 } } },
      { text: 'Tratar os quatro como iguais e aprender a equilibrá-los.', check: { stat: ['dao', 'comp'], dif: 1 }, ok: { text: 'A convivência é difícil, e em dez anos vira dança. Seus quatro elementos, antes brigando, sustentam um ao outro.', fx: { setFlags: ['rz_quad_equilibra'], stats: { dao: 3, comp: 1 }, xp: 6 } }, fail: { text: 'O equilíbrio não vem. Você aprende a conviver com o caos e a colher o pouco que ele oferece.', fx: { stats: { dao: 2 }, ferida: 1 } } },
    ],
  },
  {
    id: 'rz_caotica', title: 'A Raiz Que Todos Chamam de Lixo', rarity: 'comum', once: true, weight: 3, cond: R('caotica', 1, 5),
    text: 'Cinco elementos, todos juntos, todos brigando. Os mestres, ao medirem, suspiram e dão o veredicto de sempre: "Raiz de lixo". Mas há uma lenda antiga de que os de raiz caótica, se vencem o caminho, tornam-se algo que as raízes puras não alcançam.',
    choices: [
      { text: 'Provar que a lenda é verdade: dedicar a vida a superar a raiz.', res: { text: 'Cada dia é uma luta contra o seu próprio Dantian. O progresso é um grama por ano, e cada grama é conquista. Os outros, com o tempo, param de rir.', fx: { setFlags: ['rz_caot_prova'], stats: { dao: 3, fis: 1 }, xp: 6, perfil: { disciplina: 2 } } } },
      { text: 'Aceitar a rotulação e viver de forma simples.', res: { text: 'Sem pretensão, sem pressão. Você cultiva o que dá, e descobre que a paz de quem não precisa provar nada rende, sem querer, o próprio poder.', fx: { setFlags: ['rz_caot_simples'], stats: { dao: 2, sor: 1 }, karma: 2 } } },
    ],
  },
  {
    id: 'rz_fogo', title: 'O Fogo no Seu Sangue', rarity: 'comum', once: true, weight: 2.5, cond: R('Fogo', 1, 5),
    text: 'Seu elemento de fogo se agita em meio à raiva, e esfria na calma. Um mestre de chamas diz que o fogo é "um bom servo e um péssimo patrão", e propõe uma lição: acender uma vela com a ponta do dedo, sem queimar o dedo, durante um mês.',
    choices: [
      { text: 'Fazer o exercício da vela por um mês inteiro.', check: { stat: ['dao', 'esp'], dif: 0, tag: 'qi' }, ok: { text: 'No fim do mês, a vela acende por um pensamento, e o dedo continua inteiro. O fogo, agora, obedece, e você sente a diferença entre ter fogo e ser fogo.', fx: { setFlags: ['rz_fogo_vela'], stats: { esp: 2, dao: 1 }, xp: 6 } }, fail: { text: 'Três dedos queimados e uma lição: o fogo não gosta de pressa. Você tenta de novo, devagar.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Deixar o fogo livre: poder bruto, sem contenção.', res: { text: 'As chamas crescem, e com elas o rendimento, e o risco. Uma noite, você incendeia, sem querer, a própria cama.', fx: { setFlags: ['rz_fogo_livre'], xp: 10, ferida: 1, stats: { esp: 1 } } } },
    ],
  },
  {
    id: 'rz_agua', title: 'A Água Que Se Adapta', rarity: 'comum', once: true, weight: 2.5, cond: R('Água', 1, 5),
    text: 'O elemento água em você é paciente e teimoso: contorna obstáculos, enche vazios, rói rochas. Um velho pescador diz que a água vence tudo por não lutar. Sugere um exercício: passar um dia inteiro sem dizer "não" a nada.',
    choices: [
      { text: 'Passar o dia sem dizer "não", e ver o que acontece.', res: { text: 'Um dia estranho e cheio de pequenas descobertas. Você aprende a ceder sem se quebrar, e o seu Qi ganha uma maciez que nenhuma força tinha dado.', fx: { setFlags: ['rz_agua_cede'], stats: { dao: 2, car: 1 }, xp: 5 } } },
      { text: 'Treinar a água como arma: pressão, corte, precisão.', check: { stat: ['esp', 'fis'], dif: 1, tag: 'combate' }, ok: { text: 'O jato de água atravessa uma tábua de carvalho. A água, quando decide, é a coisa mais afiada do mundo.', fx: { setFlags: ['rz_agua_arma'], stats: { esp: 2, fis: 1 }, xp: 5, fama: 3 } }, fail: { text: 'O jato escorre, sem força. A água precisa de tempo, e você, de paciência.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'rz_terra', title: 'A Terra Que Aguenta', rarity: 'comum', once: true, weight: 2.5, cond: R('Terra', 1, 5),
    text: 'O elemento terra em você é lento, firme, quase teimoso. Um mestre de formações explica que a terra é a base de tudo: quem a domina, domina o chão onde luta. Propõe o exercício de ficar parado por três dias num mesmo ponto, sentindo as camadas.',
    choices: [
      { text: 'Ficar parado por três dias, escutando o chão.', check: { stat: ['dao', 'fis'], dif: 0 }, ok: { text: 'No terceiro dia, o chão sussurra: raízes, cavernas, água corrente. Você aprende a ler o terreno como quem lê um rosto.', fx: { setFlags: ['rz_terra_chao'], stats: { dao: 2, esp: 1 }, xp: 5 } }, fail: { text: 'No segundo dia, a impaciência vence. Mas o que você ouviu, já valeu o esforço.', fx: { stats: { dao: 1 } } } },
      { text: 'Usar a terra como defesa: muralhas, valas, armadilhas.', res: { text: 'Em uma hora, o terreno ao redor vira fortaleza. Seus adversários, sem entender, caem em poços que ontem não existiam.', fx: { setFlags: ['rz_terra_defesa'], stats: { esp: 1, comp: 1 }, fama: 3 } } },
    ],
  },
  {
    id: 'rz_madeira', title: 'A Madeira Que Cura', rarity: 'comum', once: true, weight: 2.5, cond: R('Madeira', 1, 5),
    text: 'O elemento madeira em você cura e cresce: plantas florescem sob seus passos, feridas leves se fecham. Um herborista, de passagem, diz que esse dom é raro, e propõe um aprendizado: a Cura das Mil Folhas.',
    choices: [
      { text: 'Aprender a Cura das Mil Folhas com o herborista.', res: { text: 'Você passa a conhecer cada erva pelo cheiro, e cada doença pela cor. Os doentes vão a você sem pedir. A madeira em você ganha raízes.', fx: { setFlags: ['rz_madeira_cura'], stats: { comp: 1, esp: 2 }, karma: 4, xp: 5 } } },
      { text: 'Treinar a madeira como arma: lianas, espinhos, raízes.', check: { stat: ['esp', 'fis'], dif: 1, tag: 'combate' }, ok: { text: 'Raízes agarram adversários pelos tornozelos, espinhos furam sem pressa. A madeira, quando quer, é uma prisão.', fx: { setFlags: ['rz_madeira_arma'], stats: { esp: 2 }, fama: 4 } }, fail: { text: 'As lianas se enrolam em você mesmo. O ridículo rende lição.', fx: { stats: { dao: 1 }, ferida: 1 } } },
    ],
  },
  {
    id: 'rz_metal', title: 'O Metal Que Corta', rarity: 'comum', once: true, weight: 2.5, cond: R('Metal', 1, 5),
    text: 'O elemento metal em você é afiado e frio: o ar zune quando você se zanga, e as lâminas, por perto, tremem. Um ferreiro, vendo, diz que você pode ser um grande forjador, ou um grande espadachim, mas não os dois ao mesmo tempo.',
    choices: [
      { text: 'Seguir o caminho do forjador: aprender a trabalhar o metal.', res: { text: 'Meses diante da bigorna, aprendendo o ritmo do martelo. O seu metal vira instrumento: espadas, anéis, ferramentas que carregam o seu Qi.', fx: { setFlags: ['rz_metal_forja'], item: ['espada_ferro_frio'], stats: { fis: 1, comp: 2 }, xp: 5 } } },
      { text: 'Seguir o caminho do espadachim: tornar-se a lâmina.', res: { text: 'Treina cortes no vento até o ar abrir. O seu metal vira intenção, e a intenção, uma lâmina que não precisa de aço.', fx: { setFlags: ['rz_metal_lamina'], stats: { fis: 1, dao: 2 }, xp: 6 } } },
    ],
  },
  {
    id: 'rz_raio', title: 'O Raio Que Dorme no Peito', rarity: 'raro', once: true, weight: 3, cond: R('Raio', 1, 5),
    text: 'Numa tempestade, você sente o raio responder ao chamado do seu corpo. Cabelos em pé, faíscas nas pontas dos dedos. Uma seita de caçadores de tempestade oferece treinar o seu dom, e uma tribulação celeste, de longe, parece reparar em você.',
    choices: [
      { text: 'Treinar com os caçadores de tempestade.', check: { stat: ['esp', 'dao', 'fis'], dif: 1 }, ok: { text: 'Raios cruzam o seu corpo, e você aprende a recebê-los. A tribulação, de longe, olha, e parece aprovar.', fx: { setFlags: ['rz_raio_treino'], stats: { esp: 3, fis: 1 }, xp: 10, fama: 5 } }, fail: { text: 'Um raio mais forte joga você ao chão, queimado. Você acorda no dia seguinte, com um riso nervoso e um novo respeito.', fx: { ferida: 3, stats: { esp: 1 } } } },
      { text: 'Esconder o dom: tribulações atraem tribulações.', res: { text: 'Você nunca mais se aproxima de campo aberto em dias de tempestade. O raio, no peito, dorme, e espera.', fx: { setFlags: ['rz_raio_oculto'], stats: { dao: 1, sor: 1 } } } },
    ],
  },
  {
    id: 'rz_gelo', title: 'O Gelo Que Guarda', rarity: 'raro', once: true, weight: 3, cond: R('Gelo', 1, 5),
    text: 'O seu gelo é calmo, silencioso e paciente. A água, ao seu toque, cristaliza. Uma anciã de um palácio de inverno o reconhece, e diz que o gelo, quando bem usado, preserva: corpos, memórias, promessas. Oferece uma lição.',
    choices: [
      { text: 'Aprender a preservar com o gelo.', res: { text: 'A anciã lhe ensina a congelar um instante, e guardá-lo. Anos depois, você ainda tem, em cristal, o rosto de alguém que amou.', fx: { setFlags: ['rz_gelo_preserva'], stats: { esp: 2, dao: 2 }, xp: 5, karma: 2 } } },
      { text: 'Treinar o gelo como arma: lanças, escudos, geada mortal.', check: { stat: ['esp', 'fis'], dif: 1, tag: 'combate' }, ok: { text: 'Lanças de gelo, geada na lâmina do inimigo, um escudo que rebate golpes. O seu gelo é uma fortaleza que anda.', fx: { setFlags: ['rz_gelo_arma'], stats: { esp: 2, fis: 1 }, fama: 5 } }, fail: { text: 'O gelo racha no pior momento, e você leva o golpe.', fx: { ferida: 2, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'rz_vento', title: 'O Vento Que Não Para', rarity: 'raro', once: true, weight: 3, cond: R('Vento', 1, 5),
    text: 'O seu vento é inquieto e curioso: levanta saias, vira páginas, abre portas. Um monge andarilho diz que o vento não se prende a lugar nenhum, e que a sua raiz é feita para viajar. Convida você para uma peregrinação de um ano, sem rota certa.',
    choices: [
      { text: 'Aceitar a peregrinação sem rota certa.', res: { text: 'O vento escolhe o caminho: vilas, montanhas, uma tempestade de areia. Você volta com histórias, amigos pelo mundo e um Qi que não sabe mais ficar parado.', fx: { setFlags: ['rz_vento_peregrino'], anos: 1, stats: { sor: 2, esp: 1 }, xp: 6, fama: 3 } } },
      { text: 'Treinar o vento como arma: lâminas de ar, voo, turbilhão.', check: { stat: ['esp', 'sor'], dif: 1, tag: 'combate' }, ok: { text: 'O ar corta, e o corpo flutua. Você aprende a voar por empuxo, e a cortar sem tocar.', fx: { setFlags: ['rz_vento_arma'], stats: { esp: 2, sor: 1 }, fama: 4 } }, fail: { text: 'O vento escapa, e você cai de uma altura generosa. Uma lição que se aprende de uma vez.', fx: { ferida: 2, stats: { sor: 1 } } } },
    ],
  },
];

/* =====================================================================
 * MOLDES: opções exclusivas de constituições e raízes em eventos comuns
 * ===================================================================== */
export const moldesCorpoRaiz: Molde[] = [
  { id: 'cs_yin_a', alvo: ['perigo', 'combate'], combatOnly: true, choice: { cond: { constitution: ['yin_puro'] }, text: 'Soltar o frio do corpo e congelar o perigo.', check: { stat: ['esp', 'dao'], dif: 1, tag: 'qi' }, ok: { text: 'Uma geada se espalha, e o inimigo, de pernas congeladas, fica no lugar. O seu frio é uma barreira viva.', fx: { fama: 5, stats: { esp: 1 }, setFlags: ['cs_yin_livre'] } }, fail: { text: 'O frio escapa, e acerta também você. Dedos roxos, nariz azul.', fx: { ferida: 2, stats: { esp: 1 } } } } },
  { id: 'cs_yin_b', alvo: ['cultivo', 'tesouro'], choice: { cond: { constitution: ['yin_puro'] }, text: 'Cultivar na noite fria, quando o Yin é mais forte.', res: { text: 'A noite, o gelo do corpo canta. O Qi flui com a limpidez de água de montanha, e o rendimento dobra.', fx: { xp: 9, stats: { esp: 1 }, setFlags: ['cs_yin_equilibrio'] } } } },
  { id: 'cs_oss_a', alvo: ['combate', 'perigo'], combatOnly: true, choice: { cond: { constitution: ['ossos_dragao'] }, text: 'Aguentar o golpe com os ossos e devolver com força.', check: { stat: ['fis'], dif: 0, tag: 'combate' }, ok: { text: 'O golpe quebra a arma, não o osso. O revide, de ossos densos, é um martelo vivo.', fx: { fama: 5, stats: { fis: 1 }, setFlags: ['cs_oss_oculto'] } }, fail: { text: 'Os ossos aguentam, os músculos nem tanto. A lição é cara.', fx: { ferida: 2, stats: { fis: 1 } } } } },
  { id: 'cs_oss_b', alvo: ['viagem', 'tesouro'], choice: { cond: { constitution: ['ossos_dragao'] }, text: 'Carregar o peso que ninguém mais carrega, e ser pago por isso.', res: { text: 'A bolsa vem pesada, e a fama também: um carregador que nunca cansa. Você sente os ossos agradecerem o trabalho.', fx: { pedras: 70, stats: { fis: 1 }, fama: 3, setFlags: ['cs_oss_vende'] } } } },
  { id: 'cs_esp_a', alvo: ['combate', 'perigo'], combatOnly: true, choice: { cond: { constitution: ['corpo_espada'] }, text: 'Ser a espada: cortar com o próprio corpo, sem arma.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'espada' }, ok: { text: 'Um golpe de mão, e o ar abre. A lâmina que nasceu em você corta onde o aço não alcança.', fx: { fama: 7, stats: { dao: 1, fis: 1 }, setFlags: ['cs_esp_lamina'] } }, fail: { text: 'O corpo corta, e se corta junto: uma linha fina, de sangue, no antebraço.', fx: { ferida: 2, stats: { dao: 1 } } } } },
  { id: 'cs_esp_b', alvo: ['tesouro', 'social'], choice: { cond: { constitution: ['corpo_espada'] }, text: 'Deixar as lâminas do lugar o escolherem.', res: { text: 'As espadas vibram, uma delas mais que as outras. Você a toma, com permissão, ou sem, e ela, a partir daí, é sua.', fx: { item: ['espada_aprendiz'], stats: { dao: 1 }, fama: 3, setFlags: ['cs_esp_lamina'] } } } },
  { id: 'cs_cao_a', alvo: ['cultivo', 'tesouro'], choice: { cond: { constitution: ['caos'] }, text: 'Absorver o Qi do objeto sem escolher, e ver o que sai.', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'Tudo entra, e algo bom sai. O corpo caótico transforma lixo em ouro, uma vez em cada três.', fx: { xp: 11, stats: { esp: 1 }, corr: 2, setFlags: ['cs_cao_esponja'] } }, fail: { text: 'A mistura é ruim. Você passa três dias de cama, soltando faíscas coloridas.', fx: { ferida: 2, xp: 3 } } } },
  { id: 'cs_cao_b', alvo: ['perigo', 'combate'], combatOnly: true, choice: { cond: { constitution: ['caos'] }, text: 'Devolver ao inimigo a energia que ele lançou, misturada.', check: { stat: ['esp', 'dao'], dif: 1, tag: 'qi' }, ok: { text: 'O golpe entra, vira outra coisa, e volta. O inimigo, confuso, recebe o próprio ataque em forma estranha.', fx: { fama: 6, stats: { esp: 1 }, setFlags: ['cs_cao_ordem'] } }, fail: { text: 'A energia fica presa, e explode de dentro. O corpo caótico paga a conta.', fx: { ferida: 3, corr: 2 } } } },
  { id: 'cs_vei_a', alvo: ['cultivo', 'perigo'], choice: { cond: { constitution: ['veias_quebradas'] }, text: 'Soltar um pouco do selo, só uma gota de poder.', check: { stat: ['dao', 'esp'], dif: 1 }, ok: { text: 'Uma gota de poder antigo escorre. O suficiente para vencer o momento, sem rachar o selo.', fx: { xp: 8, fama: 4, stats: { esp: 1 }, setFlags: ['cs_vei_chave'] } }, fail: { text: 'A gota vira filete, e o selo estala. O poder passa, e o preço também.', fx: { ferida: 2, corr: 2, stats: { esp: 1 } } } } },
  { id: 'cs_vei_b', alvo: ['social', 'tesouro'], choice: { cond: { constitution: ['veias_quebradas'] }, text: 'Esconder o brilho das veias e fingir ser ordinário.', res: { text: 'Ninguém desconfia do aprendiz comum. O selo, silencioso, espera o dia da ruptura, e você, o dia da escolha.', fx: { stats: { dao: 1, sor: 1 }, pedras: 40, setFlags: ['cs_vei_rompeu'] } } } },
  { id: 'cs_jad_a', alvo: ['social', 'viagem'], choice: { cond: { constitution: ['jade_eterno'] }, text: 'Usar a beleza que não passa para abrir portas.', res: { text: 'As pessoas confiam, e baixam a guarda. A aparência, um dom, e também um disfarce de quem já viveu demais.', fx: { fama: 5, stats: { car: 1 }, karma: -1, setFlags: ['cs_jad_acordo'] } } } },
  { id: 'cs_jad_b', alvo: ['perigo', 'tesouro'], choice: { cond: { constitution: ['jade_eterno'] }, text: 'Esconder o rosto e a idade para passar despercebido.', res: { text: 'Capuz, voz grave, um nome comum. O perigo passa, sem notar que o jovem e o velho eram o mesmo.', fx: { stats: { sor: 1, comp: 1 }, pedras: 30, setFlags: ['cs_jad_escondeu'] } } } },
  // Raízes: tipos
  { id: 'rz_unica_a', alvo: ['cultivo', 'combate'], choice: { cond: { root: ['unica'] }, text: 'Concentrar todo o Qi no único elemento, sem dispersar.', res: { text: 'A pureza do elemento único dá ao golpe, e à meditação, uma nitidez que as raízes mistas nunca alcançam.', fx: { xp: 8, stats: { esp: 1 }, fama: 3, setFlags: ['rz_unica_fundo'] } } } },
  { id: 'rz_unica_b', alvo: ['tesouro', 'perigo'], choice: { cond: { root: ['unica'] }, text: 'Procurar algo do seu elemento e entrar em sintonia com ele.', res: { text: 'O mundo, de repente, tem um elemento a mais para ouvir. Você encontra o que procurava, ou o que procurava encontra você.', fx: { pedras: 50, stats: { sor: 1, esp: 1 }, setFlags: ['rz_unica_largo'] } } } },
  { id: 'rz_mut_a', alvo: ['combate', 'perigo'], combatOnly: true, choice: { cond: { root: ['mutante'] }, text: 'Usar o elemento mutante, que ninguém sabe como se defender.', res: { text: 'Raio, gelo ou vento: o adversário nunca viu aquilo de perto. A surpresa vale um golpe, ou dois.', fx: { fama: 6, stats: { esp: 1 }, setFlags: ['rz_mutante_livre'] } } } },
  { id: 'rz_mut_b', alvo: ['cultivo', 'tesouro'], choice: { cond: { root: ['mutante'] }, text: 'Registrar o comportamento do elemento mutante, para entendê-lo.', res: { text: 'Cada observação anotada é um pedaço de um manual que ainda não existe. A raridade do elemento vira patrimônio.', fx: { xp: 6, stats: { comp: 1, esp: 1 }, fama: 2, setFlags: ['rz_mutante_estudado'] } } } },
  { id: 'rz_dup_a', alvo: ['combate', 'perigo'], combatOnly: true, choice: { cond: { root: ['dupla'] }, text: 'Alternar os dois elementos no meio da luta.', check: { stat: ['comp', 'esp'], dif: 1, tag: 'combate' }, ok: { text: 'Fogo e água em sequência desnorteiam o adversário: ele nunca sabe de que lado vem.', fx: { fama: 5, stats: { comp: 1 }, setFlags: ['rz_dupla_alterna'] } }, fail: { text: 'Os elementos se atrapalham no pior momento. Um vapor escaldante cobre a cena, e você sai chamuscado.', fx: { ferida: 2, stats: { comp: 1 } } } } },
  { id: 'rz_dup_b', alvo: ['cultivo', 'tesouro'], choice: { cond: { root: ['dupla'] }, text: 'Buscar o ponto onde os dois elementos se completam.', res: { text: 'Uma fusão pequena, mas verdadeira. O Qi ganha um tom novo, que só os de raiz dupla conhecem.', fx: { xp: 7, stats: { esp: 1, comp: 1 }, setFlags: ['rz_dupla_funde'] } } } },
  { id: 'rz_tri_a', alvo: ['cultivo', 'viagem'], choice: { cond: { root: ['tripla'] }, text: 'Apostar no esforço diário: fazer um pouco todo dia.', res: { text: 'Sem atalhos, sem brilho. Um pouco todo dia, e um dia, o muro está pronto.', fx: { xp: 7, stats: { dao: 1 }, setFlags: ['rz_tripla_esforco'] } } } },
  { id: 'rz_tri_b', alvo: ['social', 'tesouro'], choice: { cond: { root: ['tripla'] }, text: 'Aproveitar que ninguém espera nada de você.', res: { text: 'Os de raiz média passam despercebidos, e isso é uma arma. Você ouve o que ninguém diria diante de um gênio.', fx: { fama: 2, pedras: 40, stats: { sor: 1 }, setFlags: ['rz_tripla_atalho'] } } } },
  { id: 'rz_qua_a', alvo: ['cultivo', 'perigo'], choice: { cond: { root: ['quadrupla'] }, text: 'Pôr um elemento capitão e deixar os outros se calarem.', res: { text: 'Você escolhe o fogo, ou a terra, e os outros três cedem. A hierarquia interna, por um momento, acalma o Dantian.', fx: { xp: 6, stats: { dao: 1 }, setFlags: ['rz_quad_capitao'] } } } },
  { id: 'rz_qua_b', alvo: ['tesouro', 'combate'], combatOnly: true, choice: { cond: { root: ['quadrupla'] }, text: 'Usar a quantidade de elementos para improvisar o inesperado.', check: { stat: ['comp', 'esp'], dif: 1 }, ok: { text: 'Quatro elementos oferecem quatro respostas. O adversário nunca sabe qual virá.', fx: { fama: 4, stats: { comp: 1 }, setFlags: ['rz_quad_equilibra'] } }, fail: { text: 'Quatro respostas viram quatro dúvidas. Você hesita, e perde o tempo.', fx: { ferida: 1, stats: { comp: 1 } } } } },
  { id: 'rz_cao_a', alvo: ['cultivo', 'perigo'], choice: { cond: { root: ['caotica'] }, text: 'Aceitar o caos do Dantian e seguir o ritmo dele, não o do manual.', res: { text: 'Sem manual que sirva, você cria o seu ritmo. É feio, lento e seu, e funciona de um jeito que nenhum mestre previu.', fx: { xp: 7, stats: { dao: 2 }, setFlags: ['rz_caot_prova'] } } } },
  { id: 'rz_cao_b', alvo: ['social', 'tesouro'], choice: { cond: { root: ['caotica'] }, text: 'Deixar que todos o subestimem, e agir na surpresa.', res: { text: 'Ninguém desconfia do "lixo de raiz". A surpresa, quando vem, é completa.', fx: { fama: 3, pedras: 40, stats: { sor: 1, dao: 1 }, setFlags: ['rz_caot_simples'] } } } },
  // Raízes: elementos
  { id: 'rz_fogo_a', alvo: ['combate', 'perigo'], combatOnly: true, choice: { cond: { root: ['Fogo'] }, text: 'Incendiar o que estiver à mão: o fogo cresce em você.', check: { stat: ['esp', 'fis'], dif: 1, tag: 'combate' }, ok: { text: 'Uma labareda cobre o inimigo, e o terreno. Sua fúria é o combustível, e o fogo agradece.', fx: { fama: 6, stats: { esp: 1 }, setFlags: ['rz_fogo_livre'] } }, fail: { text: 'O fogo vira contra o seu casaco. Você apaga rolando no chão, com ar de quem planejou.', fx: { ferida: 2, stats: { dao: 1 } } } } },
  { id: 'rz_agua_a', alvo: ['perigo', 'viagem'], choice: { cond: { root: ['Água'] }, text: 'Deixar que a água o leve: contornar em vez de enfrentar.', res: { text: 'A água não luta: desvia. Você passa por onde ninguém esperava, ensopado e vitorioso.', fx: { stats: { dao: 1, sor: 1 }, xp: 4, setFlags: ['rz_agua_cede'] } } } },
  { id: 'rz_terra_a', alvo: ['combate', 'perigo'], combatOnly: true, choice: { cond: { root: ['Terra'] }, text: 'Fincar os pés e deixar a terra segurar por você.', check: { stat: ['fis', 'dao'], dif: 0, tag: 'combate' }, ok: { text: 'O chão aguenta o golpe que seria seu. Você, imóvel, devolve o que recebeu.', fx: { fama: 5, stats: { fis: 1, dao: 1 }, setFlags: ['rz_terra_defesa'] } }, fail: { text: 'A terra cede onde você não esperava. A queda é feia.', fx: { ferida: 2 } } } },
  { id: 'rz_mad_a', alvo: ['perigo', 'cultivo'], choice: { cond: { root: ['Madeira'] }, text: 'Pedir às plantas ao redor que o curem ou o protejam.', res: { text: 'Raízes se enroscam, folhas cobrem, e uma dor passa. A madeira, em você, ouve as árvores, e elas o ouvem.', fx: { stats: { esp: 1 }, xp: 5, karma: 2, setFlags: ['rz_madeira_cura'] } } } },
  { id: 'rz_metal_a', alvo: ['combate', 'tesouro'], combatOnly: true, choice: { cond: { root: ['Metal'] }, text: 'Usar o metal ao redor: moedas, lâminas, argolas, tudo é arma.', check: { stat: ['esp', 'fis'], dif: 0, tag: 'combate' }, ok: { text: 'Moedas viram projéteis, lâminas voam. O metal, a seu comando, é um enxame.', fx: { fama: 5, stats: { esp: 1 }, setFlags: ['rz_metal_lamina'] } }, fail: { text: 'Uma das lâminas escapa do controle, e rasga a sua manga, e um pouco mais.', fx: { ferida: 1, stats: { esp: 1 } } } } },
  { id: 'rz_raio_a', alvo: ['combate', 'perigo'], combatOnly: true, choice: { cond: { root: ['Raio'] }, text: 'Descarregar o raio do peito no inimigo.', check: { stat: ['esp', 'fis'], dif: 1, tag: 'combate' }, ok: { text: 'Um clarão, um estalo, e o inimigo cai, cheirando a céu. Algo, lá em cima, nota.', fx: { fama: 7, stats: { esp: 1 }, setFlags: ['rz_raio_treino'] } }, fail: { text: 'O raio volta pelo mesmo caminho, e você sente o gosto de metal na boca por um dia.', fx: { ferida: 3, stats: { esp: 1 } } } } },
  { id: 'rz_gelo_a', alvo: ['perigo', 'combate'], combatOnly: true, choice: { cond: { root: ['Gelo'] }, text: 'Congelar o chão sob o inimigo e esperar.', check: { stat: ['esp', 'dao'], dif: 0, tag: 'combate' }, ok: { text: 'O gelo se espalha em silêncio, e o inimigo, de pés presos, só percebe quando já é tarde.', fx: { fama: 5, stats: { esp: 1 }, setFlags: ['rz_gelo_arma'] } }, fail: { text: 'O gelo racha, o inimigo escorrega, e você leva o golpe sem defesa.', fx: { ferida: 2 } } } },
  { id: 'rz_vento_a', alvo: ['viagem', 'perigo'], choice: { cond: { root: ['Vento'] }, text: 'Pegar o vento e sair em voo, a chegar antes de todos.', check: { stat: ['esp', 'sor'], dif: 0, tag: 'fuga' }, ok: { text: 'O vento é seu cavalo: você chega onde queria, em metade do tempo, de cabelos desgrenhados e sorriso largo.', fx: { stats: { sor: 1, esp: 1 }, xp: 4, setFlags: ['rz_vento_peregrino'] } }, fail: { text: 'O vento muda, e você cai na lama de uma colina. O orgulho sai com menos terra que o resto.', fx: { ferida: 1, stats: { sor: 1 } } } } },
];
