import type { GameEvent } from '../../types';
import type { Molde } from '../opcoes';

/**
 * Lote 28 — Origens ao longo da vida. As cenas de infância estão nos lotes 21–22; aqui cada origem volta com
 * contatos, inimigos, dívidas e obrigações nos reinos 2 a 6, lê as marcas deixadas na infância e abre um final
 * que só ela alcança (voluntário, no último evento da origem).
 */
const O = (o: string, min: number, max = 8, extra: Record<string, unknown> = {}) => ({ origin: [o], tierMin: min, tierMax: max, ...extra });

export const lote28Origens: GameEvent[] = [
  /* ================= FILHO DE CAMPONESES ================= */
  {
    id: 'og2_campones_1', title: 'A Vila Pede Seu Nome de Volta', rarity: 'comum', once: true, weight: 2, cond: O('campones', 2, 6),
    text: 'Uma comitiva da vila onde você nasceu chega a pé, empoeirada e solene. O senhor da terra dobrou o tributo, a seca voltou, e eles ouviram dizer que o filho do velho lavrador "virou imortal". Pedem ajuda, e pedem com vergonha.',
    choices: [
      { text: 'Voltar à vila e interceder junto ao senhor da terra.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O senhor, diante de quem você virou, cede e baixa o tributo. A vila o recebe como a um filho, e a sua família, na porta, esquece de respirar.', fx: { setFlags: ['og_camp_voltou'], karma: 8, fama: 8, stats: { car: 1, dao: 1 }, agenda: [{ event: 'og2_campones_2', em: [8, 16] }] } }, fail: { text: 'O senhor não cede, e a sua visita só azeda as coisas. A vila agradece a tentativa, e sofre assim mesmo.', fx: { karma: 2, stats: { dao: 1 }, agenda: [{ event: 'og2_campones_2', em: [8, 16] }] } } },
      { text: 'Mandar pedras e uma carta, sem voltar.', custo: 60, res: { text: 'As pedras compram sacos de arroz, e a carta é lida em voz alta na praça. A vila agradece, com o ar de quem esperava mais, ou menos.', fx: { setFlags: ['og_camp_mandou'], pedras: -20, karma: 3, agenda: [{ event: 'og2_campones_2', em: [8, 16] }] } } },
      { text: 'Dizer que o passado ficou para trás.', res: { text: 'A comitiva parte em silêncio. Você sente, pelos meses seguintes, o peso de uma porta fechada por dentro.', fx: { setFlags: ['og_camp_negou'], karma: -5, stats: { dao: -1 }, agenda: [{ event: 'og2_campones_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_campones_2', title: 'O Senhor da Terra Cobra uma Dívida', rarity: 'raro', once: true, weight: 0, cond: O('campones', 2, 7),
    text: 'O senhor da terra, agora velho e arruinado, aparece à sua porta. Sabe que você virou alguém, e pede um favor que lembra muito o tributo de antigamente: apoio contra um rival, ou dinheiro, ou abrigo.',
    choices: [
      { text: 'Ajudá-lo: a vila precisa que ele continue no posto.', cond: { flags: ['og_camp_voltou'] }, res: { text: 'Com a sua palavra, o rival recua. O senhor, humilhado pela ajuda, trata a vila com um respeito novo. Anos depois, ele manda uma carta de agradecimento, escrita à mão.', fx: { karma: 6, fama: 6, stats: { car: 1, dao: 1 }, setFlags: ['og_camp_senhor_devedor'], agenda: [{ event: 'og2_campones_3', em: [10, 22] }] } } },
      { text: 'Negar ajuda e cobrar os anos de tributo injusto.', res: { text: 'O senhor sai de cabeça baixa. A vila ouve, e há quem comemore, e há quem tema as consequências de humilhar quem manda.', fx: { karma: -2, fama: 4, stats: { dao: 1 }, setFlags: ['og_camp_cobrou'], agenda: [{ event: 'og2_campones_3', em: [10, 22] }] } } },
      { text: 'Fingir que não o reconhece.', res: { text: 'Ele percebe, e vai embora sem uma palavra. A cena, por semanas, volta à sua cabeça, e nunca com a conclusão que você queria.', fx: { stats: { dao: 1 }, agenda: [{ event: 'og2_campones_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_campones_3', title: 'O Arroz e o Céu', rarity: 'lendario', once: true, weight: 1.6, cond: O('campones', 3, 8),
    text: 'Uma fome atravessa três províncias. Você, que um dia colheu raízes na mata, pode agora fazer o arroz crescer onde nada cresce, com o Qi de uma vida de lavrador. A pergunta é por quanto tempo, e a quem alimentar.',
    choices: [
      { text: 'Dedicar o resto da vida a alimentar os famintos: tornar-se o Mestre do Arroz.', cond: { origin: ['campones'] }, res: { text: 'Você plantou arrozais em solos mortos, ensinou os camponeses a repetir o que fez e jamais pediu nada. Quando partiu, as três províncias nunca mais passaram fome, e ninguém lembrava mais a quem agradecer.', fx: { fim: 'lenda_campones' } } },
      { text: 'Alimentar uma só vila e depois seguir o seu caminho.', res: { text: 'A vila prospera. Você sai com a sensação de ter feito o que podia, e a dúvida de ter feito o bastante.', fx: { karma: 8, stats: { dao: 2, fis: 1 } } } },
    ],
  },

  /* ================= ÓRFÃO ACOLHIDO PELA SEITA ================= */
  {
    id: 'og2_orfao_1', title: 'O Rosto dos Seus Pais', rarity: 'comum', once: true, weight: 2, cond: O('orfao_seita', 2, 6),
    text: 'Um mercador, vendo o seu rosto, estremece: "Eu conheci uma mulher assim, no norte, que perdeu o filho num incêndio." Ele vai embora sem dizer mais. Pela primeira vez, você sente que a pergunta que nunca fez pode ter resposta.',
    choices: [
      { text: 'Partir para o norte e investigar.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'Depois de meses, você encontra uma vila de pescadores e uma velha de olhos iguais aos seus. Ela não o reconhece, mas, ao ouvir seu nome, chora sem saber por quê.', fx: { setFlags: ['og_orf_achou_familia'], karma: 5, stats: { dao: 2, car: 1 }, agenda: [{ event: 'og2_orfao_2', em: [8, 16] }] } }, fail: { text: 'A pista esfria numa vila queimada, sem registros nem ninguém. Você volta com menos do que queria e mais do que tinha.', fx: { setFlags: ['og_orf_nao_achou'], stats: { dao: 2 }, agenda: [{ event: 'og2_orfao_2', em: [8, 16] }] } } },
      { text: 'Deixar a pergunta sem resposta: a seita foi a sua família.', res: { text: 'Você volta ao pátio onde foi criado, e a velha cozinheira, sem saber por quê, lhe serve a tigela de sempre. Algumas respostas se constroem, e não se acham.', fx: { setFlags: ['og_orf_ficou'], karma: 4, stats: { dao: 2 }, faccao: 'seita', agenda: [{ event: 'og2_orfao_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_orfao_2', title: 'O Intendente Reaparece', rarity: 'raro', once: true, weight: 0, cond: O('orfao_seita', 2, 7),
    text: 'O antigo intendente do pátio, aquele que o acusava de roubar bolos, aparece, velho e doente, num beco da cidade. Não o reconhece de início. Quando reconhece, empalidece, e pede, sem coragem, uma tigela de sopa.',
    choices: [
      { text: 'Dar a sopa e uma moeda, sem dizer quem é.', res: { text: 'O velho come, agradece, e vai embora sem saber que foi o próprio menino quem o alimentou. A história acaba aí, e você descobre que gostou assim.', fx: { setFlags: ['og_orf_perdoou'], karma: 8, stats: { dao: 2 }, agenda: [{ event: 'og2_orfao_3', em: [10, 22] }] } } },
      { text: 'Dizer quem é e cobrar uma desculpa.', res: { text: 'Ele chora, e pede perdão, e você descobre que uma desculpa tardia vale menos do que o rancor de anos. Mesmo assim, ela pesa.', fx: { setFlags: ['og_orf_cobrou'], karma: 2, stats: { dao: 1, car: 1 }, agenda: [{ event: 'og2_orfao_3', em: [10, 22] }] } } },
      { text: 'Deixá-lo na rua, sem uma palavra.', cond: { flags: ['rancor_da_seita'] }, res: { text: 'Você passa por ele, e ele não vê. O rancor, afinal cumprido, tem o gosto vazio que todos os rancores têm.', fx: { setFlags: ['og_orf_vingou'], karma: -6, stats: { dao: -1 }, agenda: [{ event: 'og2_orfao_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_orfao_3', title: 'O Pátio Que Precisa de um Pai', rarity: 'lendario', once: true, weight: 1.6, cond: O('orfao_seita', 3, 8),
    text: 'A seita que o criou decai: os anciões envelhecem, os servos fogem, o pátio esvazia. Os novos órfãos que chegam não têm quem os ensine. A seita, sem palavras, olha para você.',
    choices: [
      { text: 'Voltar e ser o pai de todos os órfãos do pátio.', cond: { origin: ['orfao_seita'] }, res: { text: 'Você retorna e se instala nos fundos, onde dormia criança. Com os anos, o pátio se enche de meninos que não têm onde ir, e nenhum deles tem medo. Quando você parte, a seita inteira o chama de pai.', fx: { fim: 'lenda_orfao' } } },
      { text: 'Enviar um mestre e apoio, sem voltar.', res: { text: 'O mestre que você manda faz o que pode. A seita sobrevive, sem calor. A dívida com o seu passado fica pela metade.', fx: { karma: 4, pedras: -100, stats: { dao: 1 } } } },
    ],
  },

  /* ================= HERDEIRO DE UM CLÃ DECADENTE ================= */
  {
    id: 'og2_cla_1', title: 'Os Primos Que Sobraram', rarity: 'comum', once: true, weight: 2, cond: O('cla_decadente', 2, 6),
    text: 'Três primos, que você mal conhece, aparecem à sua porta: um comerciante falido, uma costureira de olhar duro e um jovem de espada enferrujada. Todos têm o sobrenome do {cla}, e todos querem o mesmo: que você, o "que deu certo", reúna o clã.',
    choices: [
      { text: 'Aceitar reunir o clã sob a sua liderança.', cond: { flags: ['jurou_reerguer'] }, res: { text: 'Você os recebe, e em meses a casa antiga tem de novo uma mesa comprida. A promessa de infância, feita a um avô, começa a ganhar telhado.', fx: { setFlags: ['og_cla_reuniu'], fama: 6, karma: 4, stats: { car: 2, dao: 1 }, agenda: [{ event: 'og2_cla_2', em: [8, 16] }] } } },
      { text: 'Ajudar cada primo com algo, sem unir o clã.', res: { text: 'Uma bolsa para um, um posto para outro, um mestre para o terceiro. Todos agradecem, e ninguém se sente um clã.', fx: { setFlags: ['og_cla_ajudou_avulso'], pedras: -80, karma: 3, stats: { car: 1 }, agenda: [{ event: 'og2_cla_2', em: [8, 16] }] } } },
      { text: 'Recusar: cada um por si, o clã já morreu.', res: { text: 'Os primos partem sem uma palavra. O sobrenome fica mais leve, e mais vazio.', fx: { setFlags: ['og_cla_recusou'], karma: -3, stats: { dao: 1 }, agenda: [{ event: 'og2_cla_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_cla_2', title: 'A Traição Que o Clã Jurou Esquecer', rarity: 'raro', once: true, weight: 0, cond: O('cla_decadente', 2, 7),
    text: 'Entre os papéis do avô, você acha o nome que a família jurou nunca pronunciar: a casa que traiu o {cla} há três gerações. Essa casa, hoje, é próspera, e o chefe dela, polido, o convida para um banquete de "reconciliação".',
    choices: [
      { text: 'Ir ao banquete e ouvir o que ele tem a dizer.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'Entre cortesias, você descobre que a traição foi, em parte, calúnia. O chefe devolve um selo que a sua família perdera, e a paz entre as casas tem um preço justo.', fx: { setFlags: ['og_cla_paz'], item: ['selo_do_guardiao'], fama: 8, karma: 6, stats: { car: 1, comp: 1 }, agenda: [{ event: 'og2_cla_3', em: [10, 22] }] } }, fail: { text: 'O banquete é uma armadilha polida: você sai vivo, e com uma dívida de honra que não queria.', fx: { setFlags: ['og_cla_divida'], fama: -4, pedras: -100, stats: { dao: 1 }, agenda: [{ event: 'og2_cla_3', em: [10, 22] }] } } },
      { text: 'Recusar e preparar a vingança do clã.', res: { text: 'Você passa anos tecendo a vingança. Ela chega, e o clã recobra a honra, mas o chefe adversário, ao cair, diz uma frase que você não esquece.', fx: { setFlags: ['og_cla_vingou'], karma: -6, fama: 8, stats: { dao: -1, comp: 1 }, agenda: [{ event: 'og2_cla_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_cla_3', title: 'O Salão Que Voltou a Brilhar', rarity: 'lendario', once: true, weight: 1.6, cond: O('cla_decadente', 3, 8),
    text: 'A casa do {cla} está reformada. O salão dos ancestrais tem tabuletas novas, incenso fresco, uma espada polida no altar. Os primos o chamam de "Patriarca", e há um lugar vazio na mesa, o do seu avô. Falta uma última decisão: quem o clã será.',
    choices: [
      { text: 'Tornar-se Patriarca e jurar o clã às próximas gerações.', cond: { origin: ['cla_decadente'] }, res: { text: 'Você assume o posto, ergue o nome e passa a vida ensinando os mais novos a merecer o sobrenome. Quando parte, o {cla} é de novo uma casa, e a promessa de um menino a um avô está cumprida.', fx: { fim: 'lenda_cla' } } },
      { text: 'Entregar o posto a outro e seguir o seu caminho.', res: { text: 'Você deixa o salão aos primos. O clã vive, sem você, e a promessa se cumpre de forma mais discreta.', fx: { karma: 6, stats: { dao: 2 } } } },
    ],
  },

  /* ================= FILHO DE MERCADORES ================= */
  {
    id: 'og2_merc_1', title: 'A Guilda Quer um Cultivador', rarity: 'comum', once: true, weight: 2, cond: O('mercador', 2, 6),
    text: 'A Guilda dos Mercadores do Rio, da qual seu pai foi sócio menor, oferece a você um assento no conselho: eles querem um cultivador, para escoltar cargas, negociar com seitas e intimidar concorrentes. A paga é alta, e as exigências, também.',
    choices: [
      { text: 'Aceitar o assento no conselho da Guilda.', res: { text: 'Você passa a sentar numa mesa de seda, ao lado de homens que seu pai chamava de "senhor". As decisões são frias, e a bolsa, quente.', fx: { setFlags: ['og_merc_guilda'], pedras: 220, fama: 6, stats: { car: 1, comp: 1 }, agenda: [{ event: 'og2_merc_2', em: [8, 16] }] } } },
      { text: 'Recusar e abrir o próprio negócio.', check: { stat: ['car', 'comp', 'sor'], dif: 1 }, ok: { text: 'O seu negócio é pequeno, e honesto. A Guilda o olha com condescendência, até o dia em que passa a precisar dele.', fx: { setFlags: ['og_merc_proprio'], pedras: 120, fama: 4, stats: { car: 2, comp: 1 }, agenda: [{ event: 'og2_merc_2', em: [8, 16] }] } }, fail: { text: 'Sem a Guilda, as rotas fecham-se, e o negócio sufoca em seis meses. A lição é cara, e a de um comerciante também.', fx: { setFlags: ['og_merc_proprio'], pedras: -80, stats: { comp: 1, dao: 1 }, agenda: [{ event: 'og2_merc_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_merc_2', title: 'O Rival da Infância Volta Rico', rarity: 'raro', once: true, weight: 0, cond: O('mercador', 2, 7),
    text: 'O filho do mercador rival, aquele da "amizade estratégica", volta rico e polido, com uma proposta e um sorriso afiado: uma sociedade nos grandes negócios, ou, se recusar, a guerra de preços.',
    choices: [
      { text: 'Aceitar a sociedade com ele.', cond: { flags: ['amigo_estrategico'] }, res: { text: 'Vocês dobram a velha amizade em contrato. Os lucros crescem, e a confiança também, na medida de uma folha de pedras.', fx: { setFlags: ['og_merc_socio'], pedras: 260, fama: 6, karma: -1, stats: { car: 1 }, agenda: [{ event: 'og2_merc_3', em: [10, 22] }] } } },
      { text: 'Recusar e enfrentar a guerra de preços.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'Você vence a guerra com astúcia e uma cadeia de favores. O rival, humilhado, aprende, e passa a respeitar você.', fx: { setFlags: ['og_merc_guerra'], pedras: 180, fama: 8, stats: { comp: 2 }, agenda: [{ event: 'og2_merc_3', em: [10, 22] }] } }, fail: { text: 'A guerra de preços o esvazia. Você acaba aceitando as migalhas de uma sociedade pior, e a lição de que o dinheiro não perdoa.', fx: { setFlags: ['og_merc_guerra'], pedras: -200, stats: { comp: 1, dao: 1 }, agenda: [{ event: 'og2_merc_3', em: [10, 22] }] } } },
      { text: 'Propor uma terceira via: um fundo comum para os dois e a cidade.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'O rival ri, e depois pensa, e depois assina. Os dois constroem um fundo que ajuda as duas famílias e metade da cidade.', fx: { setFlags: ['og_merc_fundo'], pedras: 100, karma: 8, fama: 10, stats: { car: 2, dao: 1 }, agenda: [{ event: 'og2_merc_3', em: [10, 22] }] } }, fail: { text: 'O rival acha a proposta ingênua. A conversa termina educada, e inútil.', fx: { stats: { car: 1 }, agenda: [{ event: 'og2_merc_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_merc_3', title: 'A Balança do Avô', rarity: 'lendario', once: true, weight: 1.6, cond: O('mercador', 3, 8),
    text: 'Você já negociou com reis, seitas e demônios. A balança de bronze do avô, pesos minúsculos, continua na sua mesa, com a inscrição: "Pese tudo. Principalmente a si mesmo." Chegou a hora de pesar o que a sua vida foi.',
    choices: [
      { text: 'Fundar a Casa dos Mil Selos: um império de comércio justo, que atravessa continentes.', cond: { origin: ['mercador'] }, res: { text: 'Em trinta anos, o seu selo vale mais que o dos reis. Contratos que levam o seu nome são cumpridos sem juiz. Quando você parte, o império continua, e a balança do avô fica na parede, intocada.', fx: { fim: 'lenda_mercador' } } },
      { text: 'Doar a balança a uma escola e seguir viagem.', res: { text: 'A escola a pendura na entrada. Os alunos aprendem a contar, e a pesar, e a dar valor à palavra.', fx: { karma: 6, stats: { dao: 2, car: 1 } } } },
    ],
  },

  /* ================= CAÇADOR DAS MONTANHAS ================= */
  {
    id: 'og2_cac_1', title: 'A Loba Volta com Filhotes', rarity: 'comum', once: true, weight: 2, cond: O('cacador', 2, 6),
    text: 'Numa noite de neve, uma loba de pelo prateado aparece à sua cabana, seguida por três filhotes famintos. Se você libertou aquela loba anos atrás, ela parece reconhecê-lo. Se não, ela só pede abrigo, sem pedir por quê.',
    choices: [
      { text: 'Abrigar a loba e os filhotes pelo inverno.', res: { text: 'A cabana fica cheia de calor e de pelo. Na primavera, a loba parte, e um dos filhotes fica, sem explicação.', fx: { setFlags: ['og_cac_loba'], karma: 6, stats: { esp: 1, car: 1 }, agenda: [{ event: 'og2_cac_2', em: [8, 16] }] } } },
      { text: 'Afastá-los: feras não pertencem a casas.', res: { text: 'A loba sai sem rancor, e a neve engole as pegadas. Na manhã seguinte, a cabana está estranhamente silenciosa.', fx: { karma: -2, stats: { dao: 1 }, setFlags: ['og_cac_afastou'], agenda: [{ event: 'og2_cac_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_cac_2', title: 'A Dívida com o Espírito da Montanha', rarity: 'raro', once: true, weight: 0, cond: O('cacador', 2, 7),
    text: 'O espírito da serra, aquele que viu você na tempestade da adolescência, cobra a conta: ele protegeu os seus caminhos por décadas, e agora quer uma oferenda que só você pode pagar: o abandono de uma das suas caçadas favoritas.',
    choices: [
      { text: 'Aceitar a oferenda e deixar aquela caçada para sempre.', res: { text: 'Você abre mão de um prazer de vida. Em troca, os caminhos da serra se abrem para você mesmo no pior inverno.', fx: { setFlags: ['og_cac_pago'], karma: 6, stats: { dao: 2, sor: 1 }, agenda: [{ event: 'og2_cac_3', em: [10, 22] }] } } },
      { text: 'Negociar uma oferenda diferente.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O espírito, divertido, aceita o seu canto à beira do rio, uma vez por ano. Um acordo pouco comum, e firme.', fx: { setFlags: ['og_cac_acordo'], stats: { car: 1, esp: 1 }, karma: 3, agenda: [{ event: 'og2_cac_3', em: [10, 22] }] } }, fail: { text: 'O espírito se ofende, e a serra, por um ano, faz o que quer com você: neblinas, trilhas falsas, uma queda.', fx: { ferida: 2, stats: { dao: 1 }, agenda: [{ event: 'og2_cac_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_cac_3', title: 'O Rei da Montanha', rarity: 'lendario', once: true, weight: 1.6, cond: O('cacador', 3, 8),
    text: 'As feras da região escolhem você. Não por força ou por magia: pela calma de quem aprendeu a respeitá-las. O velho Rei da Montanha, um tigre de cem anos, morre e deixa o trono vago, e o olhar de cada fera da serra se volta para você.',
    choices: [
      { text: 'Aceitar o trono e guardar a serra como o Rei da Montanha.', cond: { origin: ['cacador'] }, res: { text: 'Você passa a viver entre as feras, como um pastor sem cajado. Caçadores e viajantes, sem entender, passam a encontrar caminhos seguros. Quando você parte, os lobos uivam três noites seguidas.', fx: { fim: 'lenda_cacador' } } },
      { text: 'Recusar o trono e voltar à cabana.', res: { text: 'As feras entendem, e elegem outro. Você os visita, de vez em quando, e eles o recebem como a um irmão mais velho.', fx: { karma: 5, stats: { dao: 2, esp: 1 } } } },
    ],
  },

  /* ================= NETO DE ALQUIMISTA ================= */
  {
    id: 'og2_alq_1', title: 'A Última Receita do Avô', rarity: 'comum', once: true, weight: 2, cond: O('herdeiro_alquimista', 2, 6),
    text: 'Numa página que você nunca tinha visto, escondida no fundo da capa do caderno, está a última receita do avô: uma pílula chamada, apenas, "A Que Falta". Ele escreveu: "Se não terminei, é porque faltava você."',
    choices: [
      { text: 'Tentar terminar a receita do avô.', check: { stat: ['comp', 'esp', 'sor'], dif: 1, tag: 'alquimia' }, ok: { text: 'Depois de meses, você descobre o ingrediente que faltava: uma lágrima. A pílula sai dourada, estranha, e cura um mal que nenhuma pílula curava.', fx: { setFlags: ['og_alq_terminou'], item: ['pilula_sem_nome'], stats: { comp: 2, esp: 1 }, fama: 8, agenda: [{ event: 'og2_alq_2', em: [8, 16] }] } }, fail: { text: 'A receita resiste. Você aprende muito tentando, e fica com a certeza de que o avô não terminou por motivos bons.', fx: { setFlags: ['og_alq_tentou'], stats: { comp: 1 }, agenda: [{ event: 'og2_alq_2', em: [8, 16] }] } } },
      { text: 'Guardar a receita sem tentar: alguns legados são para ser lidos.', res: { text: 'A página volta ao caderno. Em dias de chuva, você a relê, e sente o avô sentado ao lado.', fx: { setFlags: ['og_alq_guardou'], stats: { dao: 2 }, karma: 2, agenda: [{ event: 'og2_alq_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_alq_2', title: 'A Associação Quer a Receita', rarity: 'raro', once: true, weight: 0, cond: O('herdeiro_alquimista', 2, 7),
    text: 'A Associação dos Alquimistas descobre a existência da receita final do avô e exige que ela seja registrada no acervo oficial. Pagam bem. Se recusar, o seu nome perde o selo de membro, e as portas fecham.',
    choices: [
      { text: 'Registrar a receita e abrir mão dela.', res: { text: 'A receita vira patrimônio de todos, com o nome do avô na capa. A bolsa cresce, e o selo, também.', fx: { setFlags: ['og_alq_registrou'], pedras: 240, fama: 8, karma: 3, agenda: [{ event: 'og2_alq_3', em: [10, 22] }] } } },
      { text: 'Recusar e perder o selo, mas manter a receita.', res: { text: 'Você perde o selo, as vendas, os convites. Ganha a certeza de que o legado é seu, e uma nova independência.', fx: { setFlags: ['og_alq_recusou'], fama: -4, stats: { dao: 2, comp: 1 }, agenda: [{ event: 'og2_alq_3', em: [10, 22] }] } } },
      { text: 'Propor uma versão pública, guardando o ingrediente secreto.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'A Associação aceita o acordo, e o segredo continua só seu. Ganha-se um equilíbrio entre o público e o íntimo.', fx: { setFlags: ['og_alq_meio'], pedras: 120, fama: 6, stats: { car: 1, comp: 1 }, agenda: [{ event: 'og2_alq_3', em: [10, 22] }] } }, fail: { text: 'A Associação suspeita, e investiga. A tensão dura anos.', fx: { fama: -3, stats: { comp: 1 }, agenda: [{ event: 'og2_alq_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_alq_3', title: 'A Pílula Que Faltava', rarity: 'lendario', once: true, weight: 1.6, cond: O('herdeiro_alquimista', 3, 8),
    text: 'Você finalmente entende o que o avô tentava fazer: uma pílula que não cura o corpo, mas o rancor. Com tudo o que sabe, a fórmula é possível. Resta decidir quem a receberá, e se é justo que um remédio assim exista.',
    choices: [
      { text: 'Fazer a Pílula Que Falta e distribuí-la sem cobrar.', cond: { origin: ['herdeiro_alquimista'] }, res: { text: 'Por anos, você distribui a pílula a quem tem ódio no peito. Muitas guerras de família acabam por causa de um chá, e ninguém sabe ao certo por quê. O avô, onde estiver, sorri.', fx: { fim: 'lenda_alquimista' } } },
      { text: 'Guardar a fórmula e não fazê-la: alguns remédios mudam demais.', res: { text: 'A fórmula fica no caderno. Há uma dignidade em não saber qual remédio o mundo mereceria.', fx: { stats: { dao: 2, comp: 2 } } } },
    ],
  },

  /* ================= ALMA REENCARNADA ================= */
  {
    id: 'og2_reenc_1', title: 'O Inimigo da Outra Vida', rarity: 'comum', once: true, weight: 2, cond: O('alma_reencarnada', 2, 6),
    text: 'Um estranho de olhar gélido o encara numa feira, e murmura um nome que você não conhecia nesta vida: "Hai-Lian". Ele não está ali por você, mas pelo que você foi. E tem uma espada à cintura, e uma dívida de séculos.',
    choices: [
      { text: 'Enfrentá-lo, para saber o que existiu entre vocês.', check: { stat: ['esp', 'dao', 'fis'], dif: 1, tag: 'mente' }, ok: { text: 'A luta é curta, e traz de volta a cena inteira: um traidor, um incêndio, uma promessa. Você entende o que ele sofreu, e o que fez.', fx: { setFlags: ['og_ree_lembrou'], stats: { esp: 2, dao: 1 }, xp: 6, agenda: [{ event: 'og2_reenc_2', em: [8, 16] }] } }, fail: { text: 'O choque de memórias derruba você antes da lâmina. Ele hesita, e vai embora, e o enigma fica de pé.', fx: { ferida: 2, stats: { dao: 1 }, agenda: [{ event: 'og2_reenc_2', em: [8, 16] }] } } },
      { text: 'Fingir que não o conhece e sair dali.', res: { text: 'Ele ainda o olha por muito tempo. Você sente os olhos nas costas por semanas, e os sonhos ficam mais precisos.', fx: { setFlags: ['og_ree_fugiu'], stats: { dao: 1 }, agenda: [{ event: 'og2_reenc_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_reenc_2', title: 'O Mestre de Outra Era', rarity: 'raro', once: true, weight: 0, cond: O('alma_reencarnada', 2, 7),
    text: 'Uma figura de cabelos de prata, o velho mestre que você teve na outra vida, vive ainda, de algum modo, num templo remoto. Ele o reconhece, e sorri. Diz que tem uma lição inacabada, e que só você pode terminar.',
    choices: [
      { text: 'Aceitar a lição inacabada.', res: { text: 'O mestre lhe ensina o último passo de um método de séculos atrás. A lição leva meses, e dói de um jeito antigo.', fx: { setFlags: ['og_ree_licao'],  stats: { comp: 2, dao: 2 }, xp: 8, agenda: [{ event: 'og2_reenc_3', em: [10, 22] }] } } },
      { text: 'Recusar: esta vida é nova, e a lição pertence a outra.', res: { text: 'O mestre assente, sem rancor. "Quem recusa o passado ganha o futuro", diz, sorrindo. Você sai do templo mais leve.', fx: { setFlags: ['og_ree_recusou'], stats: { dao: 3 }, karma: 2, agenda: [{ event: 'og2_reenc_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_reenc_3', title: 'O Ciclo Que Se Fecha', rarity: 'lendario', once: true, weight: 1.6, cond: O('alma_reencarnada', 3, 8),
    text: 'Você vê, enfim, o desenho completo: as vidas que teve, os erros que repetiu, o traidor e a vítima, que podem ter sido a mesma pessoa. Só falta uma ação para fechar o círculo: perdoar o que foi feito, ou terminar o que ficou pendente.',
    choices: [
      { text: 'Perdoar o passado e fechar o ciclo das reencarnações: a Alma Que Aprendeu.', cond: { origin: ['alma_reencarnada'] }, res: { text: 'Você escreve uma carta a si mesmo, de todas as vidas, e a queima. Quando acaba, sente algo se romper com um suspiro de alívio: o ciclo acabou, e a sua alma, enfim, aprendeu.', fx: { fim: 'lenda_reencarnado' } } },
      { text: 'Seguir como está: a ponta solta ainda tem sentido.', res: { text: 'O ciclo continua, e você, sem pressa. Há paz em não saber o fim.', fx: { stats: { dao: 3, comp: 1 } } } },
    ],
  },

  /* ================= REBENTO DA SEITA DEMONÍACA ================= */
  {
    id: 'og2_dem_1', title: 'A Seita Reclama o Que É Dela', rarity: 'comum', once: true, weight: 2, cond: O('filho_demonio', 2, 6),
    text: 'Dois emissários da seita demoníaca o encontram, com a cortesia de quem tem tempo. Lembram a sua infância, os rituais, a mãe. Dizem que a seita o espera de volta, e que a recusa teria consequências para quem você ama, e para quem foi bom com você.',
    choices: [
      { text: 'Voltar à seita, ao menos por um tempo.', res: { text: 'A volta é morna, e perigosa. Na seita, você é tratado como filho pródigo, e começa a ver como as engrenagens funcionam por dentro.', fx: { setFlags: ['og_dem_voltou'], faccao: 'demoniaca', corr: 6, stats: { fis: 1, esp: 1 }, agenda: [{ event: 'og2_dem_2', em: [8, 16] }] } } },
      { text: 'Recusar os emissários e esconder quem o ama.', check: { stat: ['esp', 'sor', 'fis'], dif: 1, tag: 'fuga' }, ok: { text: 'Você os despista, e leva os seus para longe. A perseguição vai ser longa, mas, por ora, ninguém foi tocado.', fx: { setFlags: ['og_dem_recusou'], stats: { sor: 1, esp: 1 }, karma: 3, agenda: [{ event: 'og2_dem_2', em: [8, 16] }] } }, fail: { text: 'Eles encontram um dos seus. O aviso é claro, e doloroso, e você aprende o preço de dizer não.', fx: { setFlags: ['og_dem_recusou', 'perseguido_por_demoniacos'], ferida: 2, karma: -1, agenda: [{ event: 'og2_dem_2', em: [8, 16] }] } } },
      { text: 'Aceitar, mas só para tirar a mãe da seita.', cond: { flags: ['mae_duvida'] }, res: { text: 'Em segredo, você planeja a fuga. A mãe, ao saber, chora de alívio. Aceitar a seita foi só a parte visível do plano.', fx: { setFlags: ['og_dem_plano_mae'], faccao: 'demoniaca', corr: 3, karma: 2, stats: { comp: 1, car: 1 }, agenda: [{ event: 'og2_dem_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_dem_2', title: 'O Irmão Que Obedeceu', rarity: 'raro', once: true, weight: 0, cond: O('filho_demonio', 2, 7),
    text: 'Seu irmão mais velho, o orgulho da seita, volta como emissário do Culto. Mudou: o olhar está vazio, a voz, sem calor. Ele fala em nome de quem manda, e traz uma oferta, ou uma ordem, dependendo de como você responder.',
    choices: [
      { text: 'Tentar alcançar o irmão por trás da máscara.', cond: { flags: ['irmao_confidente'] }, check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'Por um instante, o irmão de infância reaparece. Ele chora, e promete ajudar a seita a se rachar por dentro. Vocês combinam um sinal.', fx: { setFlags: ['og_dem_irmao_salvo'], karma: 8, stats: { dao: 2, car: 1 }, agenda: [{ event: 'og2_dem_3', em: [10, 22] }] } }, fail: { text: 'O irmão não volta. Ele sai, rígido, e a seita ganha um olho a mais sobre você.', fx: { setFlags: ['og_dem_irmao_perdido'], stats: { dao: 1 }, ferida: 1, agenda: [{ event: 'og2_dem_3', em: [10, 22] }] } } },
      { text: 'Obedecer à ordem e cumprir a missão.', res: { text: 'A missão é suja, e rápida. Você ganha a confiança do Culto e a sensação de que algo em você, que ainda era seu, escorreu.', fx: { setFlags: ['og_dem_obedeceu'], corr: 8, karma: -6, stats: { fis: 1 }, agenda: [{ event: 'og2_dem_3', em: [10, 22] }] } } },
      { text: 'Enfrentar o irmão e o Culto.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você derrota o irmão sem o matar, e o Culto, ao ver, hesita. A guerra aberta começa, e com ela uma liberdade amarga.', fx: { setFlags: ['og_dem_guerra'], fama: 8, karma: 3, stats: { dao: 2, fis: 1 }, agenda: [{ event: 'og2_dem_3', em: [10, 22] }] } }, fail: { text: 'O irmão vence, e poupa a sua vida por um fio de lembrança. A derrota ensina mais que a vitória.', fx: { ferida: 3, stats: { dao: 2 }, agenda: [{ event: 'og2_dem_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_dem_3', title: 'O Cisma do Sangue', rarity: 'lendario', once: true, weight: 1.6, cond: O('filho_demonio', 3, 8),
    text: 'Dentro da seita, há outros que, como você, duvidam. Basta uma centelha para o cisma: uma facção que abandone os sacrifícios, e mantenha o poder do sangue sem o custo dos inocentes. Você tem o nome, a história e o respeito para liderá-la.',
    choices: [
      { text: 'Liderar o cisma: fundar o Sangue Livre, sem sacrifícios.', cond: { origin: ['filho_demonio'] }, res: { text: 'Você parte com uma centena de dissidentes, e funda uma comunidade onde o sangue é poder, e a vida alheia, sagrada. A seita antiga o persegue por décadas, e perde. Quando você parte, o Sangue Livre continua.', fx: { fim: 'lenda_demonio' } } },
      { text: 'Deixar o cisma para os outros e seguir só.', res: { text: 'A seita se rompe sem você. Você assiste de longe, e carrega a dúvida de ter deixado a hora passar.', fx: { stats: { dao: 2 }, karma: 3 } } },
    ],
  },

  /* ================= MENDIGO DAS ESTRADAS ================= */
  {
    id: 'og2_mend_1', title: 'Os Companheiros da Ponte', rarity: 'comum', once: true, weight: 2, cond: O('mendigo_iluminado', 2, 6),
    text: 'Numa cidade grande, você reencontra os companheiros da ponte: o velho que tossia, as crianças que se abraçavam, a mulher que repartia cobertores. Estão mais velhos, e ainda pobres, e riem ao reconhecer você, de roupa fina, na rua.',
    choices: [
      { text: 'Reparti-lo com eles, sem condições.', cond: { pedrasMin: 60 }, res: { text: 'Você divide o que tem. Naquela noite, a ponte é de novo uma casa, com sopa, canto e um velho tossindo menos.', fx: { setFlags: ['og_mend_dividiu'], pedras: -50, karma: 8, stats: { dao: 2, car: 1 }, agenda: [{ event: 'og2_mend_2', em: [8, 16] }] } } },
      { text: 'Cumprimentar e seguir: a vida de antes ficou para trás.', res: { text: 'Eles entendem, e cada um volta ao que fazia. Você se pergunta, às vezes, se ficaria melhor sem a roupa fina.', fx: { setFlags: ['og_mend_seguiu'], stats: { dao: 1 }, karma: -2, agenda: [{ event: 'og2_mend_2', em: [8, 16] }] } } },
      { text: 'Voltar a viver com eles por uma estação.', res: { text: 'Um inverno sob a ponte, de novo. O frio é o mesmo, e a companhia, melhor do que você lembrava. Você parte com os ombros mais leves.', fx: { setFlags: ['og_mend_voltou'], stats: { dao: 3 }, karma: 6, agenda: [{ event: 'og2_mend_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_mend_2', title: 'O Monge da Tigela', rarity: 'raro', once: true, weight: 0, cond: O('mendigo_iluminado', 2, 7),
    text: 'O monge mendicante que dividiu a tigela com você, aquele da lição do espaço, está morrendo num mosteiro de pedra. Pede que você venha, e sente o seu Dao a distância. Diz que tem um último pedido, e uma herança.',
    choices: [
      { text: 'Ir ao mosteiro e ficar com ele até o fim.', cond: { flags: ['licao_da_tigela'] }, res: { text: 'Você o acompanha por semanas. Ele, quase sem voz, entrega a tigela, vazia e rachada, e murmura: "Está cheia." Você descobre que sim.', fx: { setFlags: ['og_mend_tigela'], item: ['tigela_mendicante'], karma: 8, stats: { dao: 4 }, agenda: [{ event: 'og2_mend_3', em: [10, 22] }] } } },
      { text: 'Mandar um curandeiro e uma carta.', res: { text: 'O curandeiro chega tarde, ou a tempo. A carta é lida em voz alta, no último dia. Algo se perde, algo se cumpre.', fx: { karma: 3, stats: { dao: 1 }, agenda: [{ event: 'og2_mend_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_mend_3', title: 'O Santo dos Mendigos', rarity: 'lendario', once: true, weight: 1.6, cond: O('mendigo_iluminado', 3, 8),
    text: 'Os que não têm nada ouviram falar de você: um deles, o que nunca esqueceu o que é fome. Filas inteiras caminham por dias para sentar ao seu lado e dividir um pedaço de pão. Há quem diga que você os faz esquecer o frio.',
    choices: [
      { text: 'Tornar-se o Santo dos Mendigos: viver entre os sem-teto, sem templo, sem nome.', cond: { origin: ['mendigo_iluminado'] }, res: { text: 'Você passa a viver nas pontes, nas portas, nas encruzilhadas. Nada tem, e nada precisa. Quando parte, a ponte onde dormiu ganha uma pedra sem inscrição, e cada mendigo da cidade, ao passar, a toca.', fx: { fim: 'lenda_mendigo' } } },
      { text: 'Construir um abrigo duradouro e voltar à estrada.', res: { text: 'O abrigo sobrevive a você. Por mais cem invernos, ninguém dorme ao relento naquela cidade.', fx: { karma: 8, pedras: -120, stats: { dao: 2, car: 1 } } } },
    ],
  },

  /* ================= PRÍNCIPE(SA) DECAÍDO(A) ================= */
  {
    id: 'og2_prin_1', title: 'Os Leais Que Restaram', rarity: 'comum', once: true, weight: 2, cond: O('principe_decaido', 2, 6),
    text: 'Zhao, o velho guardião, aparece com três outros: um general sem exército, uma dama de companhia que virou espiã, um escrivão que guardou os selos. Dizem que há uma rede de leais, que espera um sinal seu para se mover.',
    choices: [
      { text: 'Aceitar liderar a rede e conspirar pela restauração.', cond: { flags: ['jurou_vinganca_trono'] }, res: { text: 'Em meses, cartas viajam, aliados aparecem, e o seu tio, no trono, passa a ter noites ruins. A causa ganha rosto, e você perde o anonimato.', fx: { setFlags: ['og_prin_conspira', 'perseguido_pelo_tio'], fama: 8, stats: { car: 2, comp: 1 }, agenda: [{ event: 'og2_prin_2', em: [8, 16] }] } } },
      { text: 'Dissolver a rede: as pessoas merecem viver sem guerras.', res: { text: 'Zhao chora, sem protestar. A rede se desfaz, e cada um vai cuidar da vida. Você se sente livre, e culpado, em partes iguais.', fx: { setFlags: ['og_prin_dissolveu'], karma: 6, stats: { dao: 2 }, agenda: [{ event: 'og2_prin_2', em: [8, 16] }] } } },
      { text: 'Pedir tempo e manter a rede à espera.', res: { text: 'A rede aguarda, e o tempo faz o que sempre faz: alguns esquecem, outros se impacientam, outros morrem. A decisão se encolhe, e amadurece.', fx: { setFlags: ['og_prin_espera'], stats: { dao: 1, comp: 1 }, agenda: [{ event: 'og2_prin_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_prin_2', title: 'O Tio no Trono', rarity: 'raro', once: true, weight: 0, cond: O('principe_decaido', 2, 7),
    text: 'O seu tio, que tomou o trono, adoece. Manda um mensageiro com uma carta lacrada: quer vê-lo, sozinho, antes de morrer. Pode ser armadilha, ou confissão, ou as duas coisas ao mesmo tempo.',
    choices: [
      { text: 'Ir sozinho ao palácio e ouvir o tio.', check: { stat: ['car', 'dao', 'sor'], dif: 1 }, ok: { text: 'O tio, magro e pálido, conta a verdade: o veneno do seu pai foi, em parte, culpa dele; em parte, de um conselheiro que ainda vive. Ele entrega o selo e o nome do verdadeiro traidor.', fx: { setFlags: ['og_prin_verdade'], item: ['selo_do_guardiao'], karma: 4, stats: { dao: 2, comp: 2 }, agenda: [{ event: 'og2_prin_3', em: [10, 22] }] } }, fail: { text: 'É uma armadilha, e você escapa por pouco, com a roupa em farrapos e o selo do trono nas mãos de outro.', fx: { setFlags: ['og_prin_armadilha'], ferida: 3, stats: { sor: 1 }, agenda: [{ event: 'og2_prin_3', em: [10, 22] }] } } },
      { text: 'Não ir: o passado não merece uma visita.', res: { text: 'O tio morre sem vê-lo. Você ouve a notícia numa estalagem, e brinda sozinho ao silêncio.', fx: { setFlags: ['og_prin_nao_foi'], stats: { dao: 2 }, karma: -1, agenda: [{ event: 'og2_prin_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_prin_3', title: 'A Coroa Que Ninguém Quer', rarity: 'lendario', once: true, weight: 1.6, cond: O('principe_decaido', 3, 8),
    text: 'O reino está sem rei, e todos os candidatos são piores que o último. A coroa, de novo, está ao seu alcance, e o povo, que o esqueceu uma vez, o chama de volta. A pergunta é o que você faria com um trono que já o expulsou.',
    choices: [
      { text: 'Assumir a coroa e governar como o Rei Sem Coroa: justo, e sem pompa.', cond: { origin: ['principe_decaido'] }, res: { text: 'Você volta ao trono, e recusa a coroa de ouro. Governa de cajado, em uma cadeira de madeira, e o reino passa a ser o mais justo de uma geração. Quando você parte, o trono fica vazio por vontade: o povo decidiu que ninguém mais o merecia.', fx: { fim: 'lenda_principe' } } },
      { text: 'Recusar o trono e indicar um regente digno.', res: { text: 'O regente reina com justiça, e você o visita de vez em quando. A coroa, afinal, não faz falta.', fx: { karma: 8, stats: { dao: 3, car: 1 } } } },
    ],
  },

  /* ================= DISCÍPULO DO EREMITA ================= */
  {
    id: 'og2_ere_1', title: 'A Cabana Vazia', rarity: 'comum', once: true, weight: 2, cond: O('discipulo_eremita', 2, 6),
    text: 'Você sobe à cabana do mestre, depois de muitos anos, e a encontra vazia: a lareira fria, uma carta na mesa. Nela, só uma frase: "Fui ver se o silêncio também existe do outro lado." Ao lado, uma xícara, com chá ainda morno.',
    choices: [
      { text: 'Ficar na cabana e continuar a prática do mestre.', res: { text: 'Você se instala, e o silêncio da montanha o recebe como a um filho. A cada manhã, a xícara aparece, cheia, e você não pergunta quem a enche.', fx: { setFlags: ['og_ere_ficou'], stats: { dao: 3, esp: 1 }, xp: 6, agenda: [{ event: 'og2_ere_2', em: [8, 16] }] } } },
      { text: 'Descer e procurar o mestre pelo mundo.', check: { stat: ['sor', 'esp'], dif: 1 }, ok: { text: 'Depois de meses, você acha uma pista: uma pegada, um chá deixado numa estalagem, um verso numa pedra. O mestre, onde estiver, deixa trilhas para quem sabe ler.', fx: { setFlags: ['og_ere_procurou'], stats: { comp: 2, sor: 1 }, agenda: [{ event: 'og2_ere_2', em: [8, 16] }] } }, fail: { text: 'A busca termina em frio e em chuva. Você volta, de mãos vazias, e descobre que a cabana, enquanto isso, ficou arrumada.', fx: { stats: { dao: 2 }, agenda: [{ event: 'og2_ere_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_ere_2', title: 'O Duelista Que Voltou', rarity: 'raro', once: true, weight: 0, cond: O('discipulo_eremita', 2, 7),
    text: 'O espadachim que um dia desafiou o seu mestre volta, mais velho, com uma proposta: já que o mestre sumiu, é com você que ele quer terminar o duelo. Não por ódio, diz, mas porque "o duelo ficou pendente".',
    choices: [
      { text: 'Aceitar o duelo, em nome do mestre.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'A luta é longa, e silenciosa. No fim, você acerta um golpe que nunca aprendeu, e o espadachim sorri: "Era isso que ele queria que eu visse."', fx: { setFlags: ['og_ere_duelou'], fama: 10, stats: { dao: 2, fis: 1 }, agenda: [{ event: 'og2_ere_3', em: [10, 22] }] } }, fail: { text: 'Você perde, e o espadachim, em vez de comemorar, se curva: "Você é o discípulo certo. Só falta tempo."', fx: { setFlags: ['og_ere_duelou'], ferida: 2, stats: { dao: 2 }, agenda: [{ event: 'og2_ere_3', em: [10, 22] }] } } },
      { text: 'Oferecer chá, em vez de duelo.', res: { text: 'O espadachim, desarmado, aceita. A conversa dura até o amanhecer, e ele parte sem rancor, e leva, na manga, um pouco do silêncio da montanha.', fx: { setFlags: ['og_ere_cha'], karma: 6, stats: { dao: 3, car: 1 }, agenda: [{ event: 'og2_ere_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_ere_3', title: 'O Silêncio do Outro Lado', rarity: 'lendario', once: true, weight: 1.6, cond: O('discipulo_eremita', 3, 8),
    text: 'Uma manhã, na cabana, a xícara está cheia, e do outro lado da mesa há alguém sentado: o mestre, mais velho, com olhos de montanha. "Existe, sim", diz. "O silêncio do outro lado." Ele pede que você decida: ficar, ou ir ver.',
    choices: [
      { text: 'Tornar-se o Eremita da Montanha: assumir a cabana, e ensinar a quem subir.', cond: { origin: ['discipulo_eremita'] }, res: { text: 'Você assume a cabana, e o mestre se despede com um aceno. Pelas décadas seguintes, quem sobe a montanha encontra um velho, uma xícara e um silêncio que ensina mais do que mil palavras. Quando você parte, a cabana tem outro eremita.', fx: { fim: 'lenda_eremita' } } },
      { text: 'Seguir o mestre ao outro lado do silêncio.', res: { text: 'Vocês dois partem, de manhã, em silêncio. A cabana fica de portas abertas, e o chá, morno, para quem vier.', fx: { stats: { dao: 4, esp: 2 }, xp: 10 } } },
    ],
  },

  /* ================= PESCADOR DOS MARES SEM FIM ================= */
  {
    id: 'og2_pesc_1', title: 'A Serpente Cobra o Que Seu Pai Devia', rarity: 'comum', once: true, weight: 2, cond: O('pescador_mares', 2, 6),
    text: 'Numa noite de maré alta, a serpente de mil anos emerge ao lado do seu barco. Não é um ataque: ela fala, numa voz de onda, "O seu pai me recusou um favor, e a dívida passou para você. Hoje, venho cobrá-la."',
    choices: [
      { text: 'Aceitar o favor, qualquer que seja.', res: { text: 'A serpente pede que você leve uma pérola até a ilha dos mil sinos, e a entregue a quem a espera. O caminho leva meses, e lhe ensina mais que o mar.', fx: { setFlags: ['og_pesc_favor'], stats: { esp: 2, sor: 1 }, xp: 5, agenda: [{ event: 'og2_pesc_2', em: [8, 16] }] } } },
      { text: 'Recusar, como o pai fez.', res: { text: 'A serpente se afunda, sem raiva. O mar passa a ser um pouco mais frio para você, e as redes, mais magras.', fx: { setFlags: ['og_pesc_recusou'], stats: { dao: 1 }, pedras: -30, agenda: [{ event: 'og2_pesc_2', em: [8, 16] }] } } },
      { text: 'Perguntar qual foi o favor que o pai recusou.', cond: { flags: ['divida_da_serpente'] }, res: { text: 'A serpente conta, devagar. O pai tinha medo de uma coisa pequena: ensinar a filha do mar a nadar. Você entende, e aceita no lugar dele.', fx: { setFlags: ['og_pesc_favor'], karma: 6, stats: { esp: 2, dao: 1 }, agenda: [{ event: 'og2_pesc_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_pesc_2', title: 'A Ilha dos Mil Sinos', rarity: 'raro', once: true, weight: 0, cond: O('pescador_mares', 2, 7),
    text: 'A ilha dos mil sinos, a que você ouviu num cais anos atrás, é real: uma ilha que desaparece e reaparece, onde cada pedra toca uma nota. Uma mulher de cabelos de alga espera na praia, e diz que você chegou, enfim.',
    choices: [
      { text: 'Entregar a pérola e ouvir o que ela tem a dizer.', cond: { flags: ['og_pesc_favor'] }, res: { text: 'A mulher a segura, e a pérola vira uma pequena lua. Ela conta o destino do seu pai, e do mar, e do pacto que você agora herda.', fx: { setFlags: ['og_pesc_ilha'], stats: { esp: 2, dao: 2 }, xp: 8,  agenda: [{ event: 'og2_pesc_3', em: [10, 22] }] } } },
      { text: 'Explorar a ilha antes de falar com ela.', check: { stat: ['sor', 'esp'], dif: 1 }, ok: { text: 'Cada sino que você toca revela uma história. Na última, uma nota que só você ouve, e que muda o tom do mar ao seu redor.', fx: { setFlags: ['og_pesc_ilha'], stats: { esp: 2, sor: 1 }, xp: 6, agenda: [{ event: 'og2_pesc_3', em: [10, 22] }] } }, fail: { text: 'A ilha se afunda, e você é jogado de volta ao barco, ensopado e perplexo. Alguns segredos esperam.', fx: { ferida: 1, stats: { sor: 1 }, agenda: [{ event: 'og2_pesc_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_pesc_3', title: 'O Senhor das Ondas', rarity: 'lendario', once: true, weight: 1.6, cond: O('pescador_mares', 3, 8),
    text: 'O mar, que um dia levou a paz do seu pai, agora o reconhece. As ondas se abrem para o seu barco, os peixes sobem à rede, as tempestades, ao vê-lo, mudam de rumo. O Rei do Mar, uma entidade sem nome, pergunta, em voz de maré: "Quer o trono?"',
    choices: [
      { text: 'Aceitar o trono das ondas: ser o Senhor das Ondas, protetor dos pescadores.', cond: { origin: ['pescador_mares'] }, res: { text: 'Você passa a viver entre a terra e o mar, e a protege os pescadores de todas as costas. Nunca mais uma tempestade levou um barco que levava o seu nome na vela. Quando você parte, as ondas cantam o seu nome por sete noites.', fx: { fim: 'lenda_pescador' } } },
      { text: 'Recusar e viver em terra, em paz com o mar.', res: { text: 'O Rei do Mar assente. Você volta para a vila, e todo amanhecer, uma onda vem ao seu pé, cumprimentar.', fx: { karma: 5, stats: { dao: 3, esp: 1 } } } },
    ],
  },

  /* ================= FILHO DE UM GUARDA DO REINO ================= */
  {
    id: 'og2_gua_1', title: 'O Capitão Convida', rarity: 'comum', once: true, weight: 2, cond: O('filho_guarda', 2, 6),
    text: 'O capitão corrupto, agora general, oferece um posto de oficial na guarda do reino. O pagamento é bom, e há uma condição não dita: fechar os olhos, como o seu pai fazia. Um velho colega do seu pai, em sussurros, diz que há outra opção.',
    choices: [
      { text: 'Aceitar o posto e fingir que não vê.', res: { text: 'O soldo chega, as regalias também, e a consciência fica num canto, quieta. Você passa a conhecer as engrenagens por dentro.', fx: { setFlags: ['og_gua_corrupto'], pedras: 200, karma: -5, fama: 4, stats: { comp: 1 }, agenda: [{ event: 'og2_gua_2', em: [8, 16] }] } } },
      { text: 'Aceitar o posto e juntar provas contra o general.', cond: { flags: ['sabe_dos_segredos'] }, check: { stat: ['comp', 'sor', 'car'], dif: 1 }, ok: { text: 'Meses de paciência, e um caderno cheio de nomes e datas. O general não percebe, e, quando perceber, será tarde.', fx: { setFlags: ['og_gua_provas'], stats: { comp: 2 }, karma: 3, agenda: [{ event: 'og2_gua_2', em: [8, 16] }] } }, fail: { text: 'O general descobre antes do tempo. Você escapa, e as provas queimam com o quartel.', fx: { setFlags: ['og_gua_exposto'], ferida: 2, fama: -3, agenda: [{ event: 'og2_gua_2', em: [8, 16] }] } } },
      { text: 'Recusar: a lei não se vende, e o seu pai que perdoe.', res: { text: 'O general sorri, sem raiva. Você sai do quartel de cabeça erguida, e sem o posto, e livre.', fx: { setFlags: ['og_gua_recusou'], karma: 4, stats: { dao: 2 }, fama: -2, agenda: [{ event: 'og2_gua_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_gua_2', title: 'O Pai e a Lei', rarity: 'raro', once: true, weight: 0, cond: O('filho_guarda', 2, 7),
    text: 'Seu pai, velho e doente, aparece com um pedido: ele foi acusado de um crime que cometeu, por ordem do general, anos atrás. Pede que você o proteja, ou que o entregue, o que você achar justo. Não quer mais ser o homem que calou.',
    choices: [
      { text: 'Proteger o pai e enfrentar o general com a verdade.', cond: { flags: ['og_gua_provas'] }, res: { text: 'Com as provas, o general cai, e o seu pai, ao testemunhar, volta a ser um homem de honra. Ele morre meses depois, em paz.', fx: { setFlags: ['og_gua_justica'], karma: 10, fama: 10, stats: { dao: 2, car: 1 }, agenda: [{ event: 'og2_gua_3', em: [10, 22] }] } } },
      { text: 'Entregar o pai à lei, como a lei exige.', res: { text: 'É uma das decisões mais duras da sua vida. O pai, antes de ser levado, aperta a sua mão. Há orgulho e dor no olhar.', fx: { setFlags: ['og_gua_entregou'], karma: 2, stats: { dao: 3 }, agenda: [{ event: 'og2_gua_3', em: [10, 22] }] } } },
      { text: 'Esconder o pai e fugir juntos.', res: { text: 'Vocês fogem. A estrada é dura, e ele, calado. Anos depois, ele diz, sem dramas, que foi a melhor coisa que você podia ter feito.', fx: { setFlags: ['og_gua_fugiu'], karma: -2, stats: { sor: 1, dao: 1 }, agenda: [{ event: 'og2_gua_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_gua_3', title: 'O Capitão Justo', rarity: 'lendario', once: true, weight: 1.6, cond: O('filho_guarda', 3, 8),
    text: 'A guarda do reino, quebrada por décadas de corrupção, precisa de um novo comandante. Você, filho de guarda, cultivador de renome, é o único em quem as fileiras ainda confiam. A tarefa é grande, longa e ingrata.',
    choices: [
      { text: 'Assumir o comando e reformar a guarda: tornar-se o Capitão Justo.', cond: { origin: ['filho_guarda'] }, res: { text: 'Em vinte anos, a guarda volta a ser o que o seu pai sonhou: um corpo honesto, com salário digno e disciplina de ferro. Quando você parte, o quartel tem o seu retrato, e os soldados, a coragem de dizer não.', fx: { fim: 'lenda_guarda' } } },
      { text: 'Indicar outro e continuar sua vida.', res: { text: 'A guarda segue o seu caminho, melhor do que antes. Você a visita às vezes, e o pátio, ao vê-lo, bate continência.', fx: { karma: 5, stats: { dao: 2 } } } },
    ],
  },

  /* ================= REGRESSOR ================= */
  {
    id: 'og2_reg_1', title: 'O Dia Que Você Já Viveu', rarity: 'comum', once: true, weight: 2, cond: O('regressor', 2, 6),
    text: 'Você acorda com a certeza de que hoje, na outra vida, houve uma catástrofe: uma cidade inteira afogou numa enchente, e ninguém previu. Está a dois dias de viagem, e o tempo corre contra você. Ninguém acredita em quem diz saber o futuro.',
    choices: [
      { text: 'Viajar à cidade e avisar às autoridades.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'Com provas pequenas e um plano concreto, você convence o prefeito. A cidade evacua. Ninguém morre, e ninguém sabe a quem agradecer.', fx: { setFlags: ['og_reg_evitou'], karma: 10, fama: 8, stats: { car: 1, dao: 2 }, agenda: [{ event: 'og2_reg_2', em: [8, 16] }] } }, fail: { text: 'O prefeito o chama de louco. A enchente vem, e você salva quem pode, com o que tem.', fx: { setFlags: ['og_reg_parcial'], karma: 4, ferida: 1, stats: { dao: 2 }, agenda: [{ event: 'og2_reg_2', em: [8, 16] }] } } },
      { text: 'Deixar acontecer: mudar demais o passado é perigoso.', res: { text: 'Você observa a notícia chegar, e sente o peso de saber. A enchente leva o que levou, e você carrega a culpa que escolheu.', fx: { setFlags: ['og_reg_calou'], karma: -8, stats: { dao: 2 }, agenda: [{ event: 'og2_reg_2', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'og2_reg_2', title: 'Quem Mais Voltou', rarity: 'raro', once: true, weight: 0, cond: O('regressor', 2, 7),
    text: 'Numa estalagem, alguém menciona uma data que só um regressor conheceria. Você o encara, e ele, a você. Vocês dois sabem. Há outro regressor no mundo, e seus objetivos podem ser iguais, ou opostos.',
    choices: [
      { text: 'Propor uma aliança aos outros regressores.', res: { text: 'Ele ri, aliviado, e concorda. Vocês passam semanas trocando listas do que sabem, e planejando como evitar o fim do mundo conhecido.', fx: { setFlags: ['og_reg_aliado'], stats: { comp: 2, car: 1 }, fama: 4, agenda: [{ event: 'og2_reg_3', em: [10, 22] }] } } },
      { text: 'Desconfiar e o vigiar.', res: { text: 'Ele percebe, e vai embora sem dizer nada. Você nunca saberá se era amigo ou rival, e a dúvida, por si, vira lição.', fx: { setFlags: ['og_reg_desconfiou'], stats: { comp: 1, dao: 1 }, agenda: [{ event: 'og2_reg_3', em: [10, 22] }] } } },
      { text: 'Eliminá-lo antes que atrapalhe.', res: { text: 'O fim é rápido e frio. Você sente, depois, o peso de ter matado a única pessoa que o entenderia.', fx: { setFlags: ['og_reg_matou'], karma: -12, corr: 6, stats: { dao: -1 }, agenda: [{ event: 'og2_reg_3', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'og2_reg_3', title: 'O Fim Que Você Veio Evitar', rarity: 'lendario', once: true, weight: 1.6, cond: O('regressor', 3, 8),
    text: 'A data se aproxima: o dia em que, na sua vida anterior, o mundo, de um jeito ou de outro, acabou. Você sabe a hora, o lugar, o nome do que vem. Tudo que fez, nesta vida, preparou o instante. Falta a última escolha.',
    choices: [
      { text: 'Enfrentar o fim com tudo o que preparou, e mudar o destino do mundo.', cond: { origin: ['regressor'] }, check: { stat: ['dao', 'esp', 'fis', 'comp'], dif: 3, tag: 'combate' }, ok: { text: 'O dia chega, e passa. O que devia acabar o mundo é desviado, preso, ou perdoado. Quando você parte, ninguém sabe que o fim foi evitado, e você sorri, o único que sabe.', fx: { fim: 'lenda_regressor' } }, fail: { text: 'Você faz o que pode, e o mundo sobrevive em parte. A data passa, e você, ferido, descobre que o futuro, mesmo mudado, é só outro caminho.', fx: { ferida: 3, stats: { dao: 3 }, fama: 10, karma: 6 } } },
      { text: 'Fugir para longe, deixando o fim acontecer sem você.', res: { text: 'Você foge, e o fim chega, e passa, e você, de longe, assiste. A culpa o acompanha, e a sobrevivência também.', fx: { karma: -10, stats: { dao: 1 } } } },
    ],
  },
];

/* =====================================================================
 * MOLDES: opções exclusivas de cada origem em eventos comuns
 * ===================================================================== */
export const moldesOrigens: Molde[] = [
  { id: 'og_camp_a', alvo: ['viagem', 'tesouro'], choice: { cond: { origin: ['campones'] }, text: 'Usar o que o campo ensinou: plantas, clima, paciência.', res: { text: 'Quem cresceu na terra lê o que os outros ignoram: o vento, a cor do solo, o jeito do bicho. Você chega ao que queria sem pressa.', fx: { stats: { fis: 1, sor: 1 }, pedras: 40, setFlags: ['og_camp_mandou'] } } } },
  { id: 'og_camp_b', alvo: ['social', 'perigo'], choice: { cond: { origin: ['campones'] }, text: 'Falar como camponês: simples, direto, sem enfeite.', res: { text: 'A franqueza rude desarma a malícia. Os poderosos, desacostumados com gente simples, falam mais do que deviam.', fx: { fama: 3, stats: { car: 1 }, karma: 1, setFlags: ['og_camp_voltou'] } } } },
  { id: 'og_orf_a', alvo: ['social', 'perigo'], choice: { cond: { origin: ['orfao_seita'] }, text: 'Lembrar um segredo da seita que você ouviu quando servia.', res: { text: 'O que você ouviu, invisível, entre os servos, vale mais que muito talento: um nome, um hábito, um medo. Usa-se com cuidado.', fx: { fama: 3, stats: { comp: 1 }, setFlags: ['og_orf_ficou'], pedras: 30 } } } },
  { id: 'og_orf_b', alvo: ['tesouro', 'cultivo'], choice: { cond: { origin: ['orfao_seita'] }, text: 'Procurar nos fundos, onde nunca ninguém olha.', res: { text: 'Quem foi servo sabe onde as coisas ficam esquecidas. Você acha, no canto errado, exatamente o que ninguém procurava.', fx: { pedras: 60, stats: { sor: 1, comp: 1 }, setFlags: ['og_orf_ficou'] } } } },
  { id: 'og_cla_a', alvo: ['social'], choice: { cond: { origin: ['cla_decadente'] }, text: 'Invocar o nome antigo do {cla}.', res: { text: 'O nome, vazio de cofre, ainda abre portas: gente velha se lembra. A cortesia que se oferece não é para você, e funciona.', fx: { fama: 5, stats: { car: 1 }, karma: -1, setFlags: ['og_cla_reuniu'] } } } },
  { id: 'og_cla_b', alvo: ['tesouro', 'cultivo'], choice: { cond: { origin: ['cla_decadente'] }, text: 'Lembrar de uma passagem dos antigos papéis do clã.', res: { text: 'Uma linha, de um velho pergaminho de família, vira a chave: um método, um esconderijo, um atalho. O clã ainda deixa dívidas e heranças.', fx: { stats: { comp: 1, dao: 1 }, xp: 4, pedras: 40, setFlags: ['og_cla_reuniu'] } } } },
  { id: 'og_mer_a', alvo: ['tesouro', 'social'], choice: { cond: { origin: ['mercador'] }, text: 'Pesar o preço de tudo e negociar como um mercador de nascença.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Cada preço tem um teto, e você o conhece. O que os outros pagam por três, você paga por um.', fx: { pedras: 100, stats: { car: 1 }, setFlags: ['og_merc_proprio'] } }, fail: { text: 'O outro lado também sabe de preços. Você sai com o que tinha, e a lição de que o mercado é um espelho.', fx: { stats: { car: 1 } } } } },
  { id: 'og_mer_b', alvo: ['perigo', 'viagem'], choice: { cond: { origin: ['mercador'] }, text: 'Usar um contato da Guilda para abrir caminho.', res: { text: 'Um nome, uma carta, um favor antigo. A Guilda tem olhos em todo canto, e você, de repente, é um amigo de gente útil.', fx: { fama: 3, pedras: -20, stats: { car: 1, sor: 1 }, setFlags: ['og_merc_guilda'] } } } },
  { id: 'og_cac_a', alvo: ['viagem', 'perigo'], choice: { cond: { origin: ['cacador'] }, text: 'Rastrear, ler pegadas e vento, e achar a rota certa.', check: { stat: ['sor', 'comp'], dif: 0 }, ok: { text: 'O mato conversa com você: o galho quebrado, a pegada fresca, o silêncio dos pássaros. Você antecipa o perigo e escolhe o caminho.', fx: { stats: { sor: 1, comp: 1 }, xp: 3, setFlags: ['og_cac_loba'] } }, fail: { text: 'Um rastro falso o desvia. Você perde meio dia, e ganha um respeito novo pela serra.', fx: { ferida: 1, stats: { sor: 1 } } } } },
  { id: 'og_cac_b', alvo: ['combate'], choice: { cond: { origin: ['cacador'] }, text: 'Aplicar o que aprendeu caçando: esperar o bote, golpear uma vez.', check: { stat: ['fis', 'sor'], dif: 0, tag: 'combate' }, ok: { text: 'Você espera, imóvel, e o inimigo, impaciente, vem. Um único golpe, no ponto, decide a luta.', fx: { fama: 5, stats: { fis: 1, sor: 1 }, setFlags: ['og_cac_loba'] } }, fail: { text: 'O inimigo não morde a isca. A espera custa uma ferida, e ensina.', fx: { ferida: 2, stats: { dao: 1 } } } } },
  { id: 'og_alq_a', alvo: ['tesouro', 'cultivo'], choice: { cond: { origin: ['herdeiro_alquimista'] }, text: 'Identificar e usar o item com o conhecimento herdado do avô.', res: { text: 'O caderno do avô tem uma nota sobre quase tudo. O que parecia só raro era, na verdade, precioso, e você sabe usá-lo.', fx: { xp: 6, pedras: 50, stats: { comp: 1 }, setFlags: ['og_alq_guardou'] } } } },
  { id: 'og_alq_b', alvo: ['perigo', 'social'], choice: { cond: { origin: ['herdeiro_alquimista'] }, text: 'Tirar do bolso uma pílula ou um antídoto, no momento certo.', res: { text: 'O frasco certo, na hora certa, vale por muita espada. A confiança de quem é salvo é de um tipo especial, e dura.', fx: { fama: 4, stats: { comp: 1, car: 1 }, karma: 3, setFlags: ['og_alq_tentou'] } } } },
  { id: 'og_ree_a', alvo: ['cultivo', 'tesouro'], choice: { cond: { origin: ['alma_reencarnada'] }, text: 'Usar a memória de uma vida passada para resolver o problema.', res: { text: 'Uma lembrança de outra era, nítida e alheia, mostra o caminho. Você faz o que nunca fez, como quem faz pela milésima vez.', fx: { xp: 8, stats: { comp: 2 }, setFlags: ['og_ree_lembrou'] } } } },
  { id: 'og_ree_b', alvo: ['social', 'perigo'], choice: { cond: { origin: ['alma_reencarnada'] }, text: 'Reconhecer alguém ou algo de uma outra vida.', res: { text: 'O rosto, a voz, o objeto: você já os viu, em outro corpo. A lembrança desarma o outro, ou o assusta, e o assombro rende vantagem.', fx: { fama: 3, stats: { esp: 1, dao: 1 }, setFlags: ['og_ree_lembrou'] } } } },
  { id: 'og_dem_a', alvo: ['combate', 'perigo'], choice: { cond: { origin: ['filho_demonio'] }, text: 'Chamar o poder do sangue herdado da seita.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'demonio' }, ok: { text: 'O sangue responde, escuro e rápido. A luta é curta, e a sensação, estranha: aquilo era seu, e nunca foi só seu.', fx: { fama: 6, corr: 5, stats: { fis: 1, esp: 1 }, setFlags: ['og_dem_voltou'] } }, fail: { text: 'O sangue sobe demais. Você perde o controle por um instante, e deixa uma marca que não vai embora.', fx: { corr: 8, ferida: 2, karma: -3 } } } },
  { id: 'og_dem_b', alvo: ['social', 'tesouro'], choice: { cond: { origin: ['filho_demonio'] }, text: 'Usar o código e a linguagem da seita demoníaca.', res: { text: 'Os que reconhecem o sinal recuam, ou colaboram. Você ganha acesso a lugares que a gente boa não vê, e carrega um selo mal visto.', fx: { pedras: 70, fama: -2, corr: 3, stats: { car: 1, comp: 1 }, setFlags: ['og_dem_voltou'] } } } },
  { id: 'og_men_a', alvo: ['viagem', 'social'], choice: { cond: { origin: ['mendigo_iluminado'] }, text: 'Pedir abrigo e comida como só um mendigo sabe pedir.', res: { text: 'A experiência da rua vale como carta de apresentação entre os que têm pouco. Você é recebido, alimentado, e informado.', fx: { stats: { dao: 1, car: 1 }, karma: 2, pedras: 20, setFlags: ['og_mend_voltou'] } } } },
  { id: 'og_men_b', alvo: ['perigo', 'combate'], choice: { cond: { origin: ['mendigo_iluminado'] }, text: 'Passar despercebido: ninguém olha para um mendigo.', check: { stat: ['sor', 'dao'], dif: 0, tag: 'fuga' }, ok: { text: 'Você se encolhe, estende a mão, e o perigo passa por cima como vento. Nada tem, e nada o prende.', fx: { stats: { sor: 1, dao: 1 }, setFlags: ['og_mend_seguiu'] } }, fail: { text: 'O disfarce não convence. A fome da rua, desta vez, não ajuda.', fx: { ferida: 1 } } } },
  { id: 'og_pri_a', alvo: ['social'], choice: { cond: { origin: ['principe_decaido'] }, text: 'Usar a etiqueta do palácio, impecável, para impressionar.', res: { text: 'A reverência perfeita, o tom de quem nasceu mandando: algo antigo e régio faz a sala se endireitar.', fx: { fama: 5, stats: { car: 1 }, karma: -1, setFlags: ['og_prin_espera'] } } } },
  { id: 'og_pri_b', alvo: ['perigo', 'tesouro'], choice: { cond: { origin: ['principe_decaido'] }, text: 'Procurar um dos leais do antigo reino.', res: { text: 'Um general, uma espiã, um escrivão: alguém, ao reconhecer o seu rosto, abre uma porta que ninguém mais veria.', fx: { fama: 3, pedras: 50, stats: { car: 1, comp: 1 }, setFlags: ['og_prin_conspira'] } } } },
  { id: 'og_ere_a', alvo: ['cultivo', 'perigo'], choice: { cond: { origin: ['discipulo_eremita'] }, text: 'Parar, respirar e escutar o silêncio da montanha dentro de si.', res: { text: 'A calma do mestre volta em você, sem esforço. O problema, visto de dentro do silêncio, é menor, e a solução, mais óbvia.', fx: { xp: 6, stats: { dao: 2 }, setFlags: ['og_ere_ficou'] } } } },
  { id: 'og_ere_b', alvo: ['social', 'combate'], choice: { cond: { origin: ['discipulo_eremita'] }, text: 'Falar pouco, oferecer chá, e esperar.', res: { text: 'O silêncio é um interlocutor. O outro, desarmado pela calma, cede, ou revela mais do que pretendia.', fx: { fama: 3, stats: { dao: 1, car: 1 }, karma: 2, setFlags: ['og_ere_cha'] } } } },
  { id: 'og_pes_a', alvo: ['viagem', 'perigo'], choice: { cond: { origin: ['pescador_mares'] }, text: 'Ler o céu e a maré: quando partir, quando esperar.', res: { text: 'O mar ensina a ler o tempo. Você parte na hora certa, e evita o que os outros sofrem sem entender.', fx: { stats: { sor: 1, comp: 1 }, xp: 3, setFlags: ['og_pesc_favor'] } } } },
  { id: 'og_pes_b', alvo: ['tesouro', 'social'], choice: { cond: { origin: ['pescador_mares'] }, text: 'Negociar com gente do porto: pescadores, marujos, contrabandistas.', res: { text: 'A gente do mar tem códigos, e você os conhece. A conversa é curta, e o negócio, justo, e a ajuda, certa.', fx: { pedras: 60, fama: 2, stats: { car: 1, sor: 1 }, setFlags: ['og_pesc_favor'] } } } },
  { id: 'og_gua_a', alvo: ['combate', 'perigo'], choice: { cond: { origin: ['filho_guarda'] }, text: 'Aplicar a disciplina militar aprendida com o pai: formação, ordem, calma.', check: { stat: ['fis', 'dao'], dif: 0, tag: 'combate' }, ok: { text: 'O treinamento de quartel aparece, mecânico e eficaz. Os inimigos, desorganizados, caem, um a um.', fx: { fama: 5, stats: { fis: 1, dao: 1 }, setFlags: ['og_gua_recusou'] } }, fail: { text: 'A disciplina ajuda, mas não basta. A lição, dolorosa, é que lei e ordem também têm limites.', fx: { ferida: 2, stats: { dao: 1 } } } } },
  { id: 'og_gua_b', alvo: ['social', 'tesouro'], choice: { cond: { origin: ['filho_guarda'] }, text: 'Falar com os guardas e soldados como quem é um deles.', res: { text: 'O código dos que vestem uniforme é universal. Você ganha informação, passagem, ou pelo menos o benefício da dúvida.', fx: { fama: 3, stats: { car: 1, sor: 1 }, pedras: 30, setFlags: ['og_gua_recusou'] } } } },
  { id: 'og_reg_a', alvo: ['tesouro', 'viagem'], choice: { cond: { origin: ['regressor'] }, text: 'Lembrar onde isto estava na outra vida.', res: { text: 'Você sabe onde, quando e quem. O que os outros levariam semanas descobrindo, você pega em uma tarde.', fx: { pedras: 90, stats: { comp: 1, sor: 1 }, setFlags: ['og_reg_aliado'] } } } },
  { id: 'og_reg_b', alvo: ['perigo', 'combate', 'social'], choice: { cond: { origin: ['regressor'] }, text: 'Antecipar o que vai acontecer, porque você já viu isto antes.', check: { stat: ['comp', 'esp'], dif: 0 }, ok: { text: 'Você age um passo à frente de todos. O que parecia surpresa é, para você, rotina, e a vantagem decide.', fx: { fama: 5, stats: { comp: 1, esp: 1 }, setFlags: ['og_reg_aliado'] } }, fail: { text: 'Desta vez, a história é diferente. O que você achava saber, estava errado, e o custo da certeza é alto.', fx: { ferida: 1, stats: { comp: 1 } } } } },
];
