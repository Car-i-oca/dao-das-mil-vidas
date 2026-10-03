import type { GameEvent } from '../../types';

/**
 * Lote 19 — Mecânicas próprias de cada trilha. Cada trilha tem um recurso (s.rec) que sobe com eventos e
 * testes bem-sucedidos da trilha, e que dá bônus nos testes dela (ver `rec` em src/data/paths.ts):
 *   Sopro: pureza do Qi · Espada: intenção de espada · Alquimia: reputação e chamas · Corpo: têmpera ·
 *   Consciência: alcance da percepção · Formações: arranjos dominados · Mérito: mérito acumulado ·
 *   Venenos: receitas e tolerância · Bestas: companheiro que evolui · Sangue: essência de sangue (e corrupção).
 * Três eventos por trilha: um inicial, um intermediário (recMin 3) e um de alto reino (recMin 6).
 */
const P = (id: string, lo: number, hi: number, recMin = 0) => ({ path: [id], tierMin: lo, tierMax: hi, ...(recMin ? { recMin } : {}) });

export const lote19TrilhasPoder: GameEvent[] = [
  /* ================= SOPRO ================= */
  {
    id: 'tp_sopro_manha', title: 'A Respiração das Manhãs', rarity: 'comum', cooldown: 30, weight: 1.8, escala: true,
    cond: P('sopro', 1, 3),
    text: 'Antes do sol nascer, você repete a respiração que o fez entrar no Caminho do Sopro. Hoje o Qi parece mais denso do que ontem, mais claro, como um copo de água que aos poucos fica limpo.',
    choices: [
      { text: 'Aprofundar a respiração, sem pressa.', check: { stat: ['esp', 'dao'], dif: 0, tag: 'qi' }, ok: { text: 'A névoa da manhã parece entrar em você, e sair, e entrar de novo. Ao meio-dia, o seu Qi tem um brilho de cristal.', fx: { rec: 2, xp: 5, stats: { esp: 1 } } }, fail: { text: 'O Qi se agita. A manhã passa sem avanço, mas com uma lição de paciência.', fx: { rec: 1, xp: 2 } } },
      { text: 'Fazer a respiração em movimento, caminhando.', res: { text: 'Passo e respiração se ajustam. O caminho, de repente, é parte do exercício.', fx: { rec: 1, xp: 3, stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'tp_sopro_chuva', title: 'A Chuva de Qi', rarity: 'raro', cooldown: 50, weight: 1.6, escala: true,
    cond: P('sopro', 3, 5, 3),
    text: 'Numa noite de tempestade, o Qi do céu desce junto da chuva. Para a maioria dos cultivadores, é só barulho. Para você, que cultiva o Caminho do Sopro, é um banquete: cada gota carrega uma partícula de energia pura.',
    choices: [
      { text: 'Sentar-se na tempestade e absorver tudo.', check: { stat: ['esp', 'comp'], dif: 1, tag: 'qi' }, ok: { text: 'Ao amanhecer, você está encharcado e iluminado. O Qi, depurado, escorre como mel claro pelos seus meridianos.', fx: { rec: 2, xp: 10, stats: { esp: 2, comp: 1 } } }, fail: { text: 'O Qi é demais, e transborda. Você passa dias de cama, com fraqueza e tremores.', fx: { rec: 1, ferida: 1, xp: 4 } } },
      { text: 'Absorver só um pouco, para ter controle.', res: { text: 'A medida certa é um tipo de força. Você sai da chuva tranquilo, sem excessos e sem arrependimentos.', fx: { rec: 1, xp: 6, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tp_sopro_primordial', title: 'O Qi Primordial', rarity: 'lendario', cooldown: 120, weight: 1.2,
    cond: P('sopro', 5, 8, 6),
    text: 'No ponto mais fundo da meditação, você toca algo que não é Qi do céu, nem da terra, nem de ninguém: o fôlego original do mundo, anterior às diferenças. Ele não obedece, mas aceita ser respirado.',
    choices: [
      { text: 'Respirar o fôlego original, sem nomeá-lo.', check: { stat: ['esp', 'dao', 'comp'], dif: 3, tag: 'qi' }, ok: { text: 'Cada célula do seu corpo se lembra de uma forma mais simples de existir. O Qi primordial se instala, silencioso.', fx: { rec: 3, xp: 20, stats: { esp: 3, dao: 3, comp: 2 }, vida: 60 } }, fail: { text: 'O fôlego original recua, como quem espia do outro lado de uma cortina. Você aprendeu onde ele está.', fx: { rec: 1, xp: 6, stats: { dao: 1 } } } },
      { text: 'Apenas contemplá-lo.', res: { text: 'Ele continua lá, quieto, e você, de olhos fechados, sorri. Algumas coisas não são para pegar.', fx: { stats: { dao: 3 }, xp: 8 } } },
    ],
  },

  /* ================= ESPADA ================= */
  {
    id: 'tp_espada_folha', title: 'Cortar a Folha Que Cai', rarity: 'comum', cooldown: 30, weight: 1.8, escala: true,
    cond: P('espada', 1, 3),
    text: 'No pátio, uma folha cai. Seu mestre disse que o espadachim verdadeiro corta a folha em duas antes que ela toque o chão, sem que a lâmina a perturbe. Hoje, o vento sopra de lado.',
    choices: [
      { text: 'Cortar a folha em pleno ar.', check: { stat: ['fis', 'dao'], dif: 0, tag: 'espada' }, ok: { text: 'O corte é limpo, sem som. As duas metades caem lado a lado, como se quisessem ficar juntas.', fx: { rec: 2, xp: 4, stats: { dao: 1 } } }, fail: { text: 'A lâmina desloca a folha, e ela escapa. Você tenta de novo, e de novo, até o fim da tarde.', fx: { rec: 1, xp: 2 } } },
      { text: 'Observar a folha cair, sem cortar.', res: { text: 'Quando ela toca o chão, você a ouve, sem som. Entender uma coisa é, às vezes, um corte.', fx: { rec: 1, stats: { comp: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'tp_espada_sem_sacar', title: 'Duelo Sem Sacar a Lâmina', rarity: 'raro', cooldown: 60, weight: 1.6, escala: true,
    cond: P('espada', 3, 5, 3),
    text: 'Um espadachim famoso desafia você. Ele saca. Você, de repente, entende que não precisa. A sua intenção de espada já preenche o pátio, e ele, de lâmina em punho, sente o corte antes do corte.',
    choices: [
      { text: 'Vencer sem sacar, só com a intenção.', check: { stat: ['dao', 'fis'], dif: 2, tag: 'espada' }, ok: { text: 'O rival abaixa a espada, pálido. "Você já me cortou", murmura. O pátio guarda silêncio por um bom tempo.', fx: { rec: 2, fama: 12, xp: 8, stats: { dao: 2 } } }, fail: { text: 'A intenção ainda não é suficiente. Você saca no último instante, e vence, mas o corte é feio.', fx: { rec: 1, fama: 4, ferida: 1 } } },
      { text: 'Sacar e lutar da maneira tradicional.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'combate' }, ok: { text: 'O duelo é bonito e limpo, como um poema de aço. O público aplaude, e o rival o abraça.', fx: { fama: 8, xp: 5, rec: 1 } }, fail: { text: 'Você perde por um golpe curto. A sala suspira.', fx: { ferida: 2, fama: -2 } } },
    ],
  },
  {
    id: 'tp_espada_montanha', title: 'A Espada Que Corta a Montanha', rarity: 'lendario', cooldown: 120, weight: 1.2, escala: true,
    cond: P('espada', 5, 8, 6),
    text: 'Diante de um pico imponente, você ergue a lâmina. Não para cortar. Para perguntar. A espada, em suas mãos, já não é aço: é a vontade de cortar o que não pode ser cortado, e a calma de não precisar.',
    choices: [
      { text: 'Descer o golpe: cortar a montanha ao meio.', check: { stat: ['fis', 'dao', 'esp'], dif: 3, tag: 'espada' }, ok: { text: 'A montanha se abre numa linha limpa, de cima a baixo. Um vale novo nasce, e você é, por um instante, parte do Céu.', fx: { rec: 3, xp: 18, fama: 20, stats: { dao: 3, fis: 2 } } }, fail: { text: 'O golpe racha a base, mas a montanha resiste. Seu braço treme. Você aprendeu o limite, e que ele é um convite.', fx: { rec: 1, xp: 6, ferida: 1, stats: { dao: 2 } } } },
      { text: 'Embainhar a espada e curvar-se à montanha.', res: { text: 'A montanha não responde. Mas a lâmina, na bainha, canta, baixinho, uma nota que você nunca tinha ouvido.', fx: { rec: 2, stats: { dao: 3 }, xp: 8 } } },
    ],
  },

  /* ================= ALQUIMIA ================= */
  {
    id: 'tp_alquimia_chama', title: 'A Primeira Chama Própria', rarity: 'comum', cooldown: 30, weight: 1.8, escala: true,
    cond: P('alquimia', 1, 3),
    text: 'Nenhum alquimista de verdade usa fogo emprestado. A sua chama, de cor ainda indecisa, nasce do Dantian e acende a fornalha sem lenha. É instável, caprichosa, e tem personalidade.',
    choices: [
      { text: 'Tentar refinar uma pílula simples com a chama nova.', check: { stat: ['comp', 'esp'], dif: 0, tag: 'alquimia' }, ok: { text: 'A pílula sai perfeita, redonda, com um brilho levemente dourado. A sua chama, orgulhosa, sobe um palmo.', fx: { rec: 2, xp: 4, pedras: 25, item: ['pilula_qi_menor'] } }, fail: { text: 'A pílula racha, o fogo vacila, o cheiro de queimado enche o pavilhão. Mas você aprendeu a obedecer à chama.', fx: { rec: 1, xp: 2 } } },
      { text: 'Estudar a chama antes de usá-la.', res: { text: 'Você descobre que ela reage ao seu humor. Alquimia, afinal, é também psicologia.', fx: { rec: 1, stats: { comp: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'tp_alquimia_receita', title: 'O Caderno do Colega Morto', rarity: 'raro', cooldown: 60, weight: 1.6, escala: true,
    cond: P('alquimia', 3, 5, 3),
    text: 'Um colega alquimista morre sem herdeiros e deixa, por testamento, a você, o seu caderno de receitas. Algumas são brilhantes, outras, perigosas. Uma, anotada com letra trêmula, diz: "Pílula de Nove Voltas. Só fiz uma vez, e quase não vivi."',
    choices: [
      { text: 'Tentar refinar a Pílula de Nove Voltas.', check: { stat: ['comp', 'esp', 'sor'], dif: 2, tag: 'alquimia' }, ok: { text: 'Nove voltas de chama, nove de espírito. A pílula nasce com uma aura de nove cores. Sua fama de alquimista dispara.', fx: { rec: 2, fama: 15, pedras: 300, item: ['pilula_passagem_4'], xp: 8 } }, fail: { text: 'A fornalha explode. Você sai chamuscado, de sobrancelhas queimadas, e com o caderno intacto.', fx: { rec: 1, ferida: 2, pedras: -50 } } },
      { text: 'Estudar as receitas e refinar só as seguras.', res: { text: 'Você refina dez pílulas úteis. O caderno vira uma biblioteca, e a sua reputação cresce devagar, e firme.', fx: { rec: 1, pedras: 150, fama: 6, stats: { comp: 2 } } } },
    ],
  },
  {
    id: 'tp_alquimia_nome', title: 'A Pílula com Seu Nome', rarity: 'lendario', cooldown: 120, weight: 1.2,
    cond: P('alquimia', 5, 8, 6),
    text: 'Na Associação dos Alquimistas, um grão-mestre anuncia: "Uma nova pílula será oficialmente registrada, e o nome dela será o do seu criador." A pílula é sua, e as pessoas esperam o nome que você escolher.',
    choices: [
      { text: 'Dar à pílula o seu próprio nome.', res: { text: 'A Pílula {nome} entra para os livros. Séculos depois, alquimistas ainda a refinam, sem saber quem foi o criador.', fx: { rec: 3, fama: 25, pedras: 500, xp: 12, stats: { car: 2, comp: 2 } } } },
      { text: 'Dar o nome do seu mestre.', res: { text: 'O mestre, já morto, é reconhecido por um feito que nunca soube que tinha feito. A Associação respeita a gentileza.', fx: { rec: 3, karma: 12, fama: 18, stats: { dao: 2, car: 1 } } } },
    ],
  },

  /* ================= CORPO ================= */
  {
    id: 'tp_corpo_banho', title: 'O Banho de Ervas e Pedras', rarity: 'comum', cooldown: 30, weight: 1.8, escala: true,
    cond: P('corpo', 1, 3),
    text: 'A têmpera começa pela pele. O banho de ervas ferventes, seguido de um açoite com varas de bambu, endurece o corpo como o ferreiro faz com o aço. Dói, e o instrutor de corpo diz que quem não dói não aprende.',
    choices: [
      { text: 'Aguentar o banho completo, sem fugir.', check: { stat: ['fis', 'dao'], dif: 0, tag: 'corpo' }, ok: { text: 'A pele muda, de leve, de cor: um bronze fosco, que repele arranhões. A dor vira orgulho.', fx: { rec: 2, xp: 5, stats: { fis: 2 } } }, fail: { text: 'Você sai do banho antes da hora, queimado e humilhado. Há quem chame isso de prudência.', fx: { rec: 1, ferida: 1, stats: { fis: 1 } } } },
      { text: 'Fazer o banho em doses menores, mais vezes.', res: { text: 'O ritmo é mais lento, mas o corpo agradece. Aos poucos, a pele endurece, sem rachaduras.', fx: { rec: 1, xp: 4, stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'tp_corpo_martelo', title: 'Os Martelos nos Ossos', rarity: 'raro', cooldown: 60, weight: 1.6, escala: true,
    cond: P('corpo', 3, 5, 3),
    text: 'Para endurecer os ossos, a tradição exige martelos de madeira dura, batidas rítmicas, uma respiração calma. Cada impacto é uma pergunta que o seu corpo responde. A cada resposta, ele fica mais difícil de quebrar.',
    choices: [
      { text: 'Pedir ao instrutor que bata com força total.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'corpo' }, ok: { text: 'Os ossos zumbem, e depois cantam. O corpo, agora, tem um som de bronze sob a pele.', fx: { rec: 2, xp: 8, stats: { fis: 3 }, vida: 30 } }, fail: { text: 'Uma costela racha. Você se deita por semanas, e o corpo descobre uma forma nova de se curar.', fx: { rec: 1, ferida: 2, stats: { fis: 1 } } } },
      { text: 'Fazer o processo aos poucos, com pausas longas.', res: { text: 'Leva uma década, mas os ossos ficam sólidos e sem trincas. O instrutor aprova, com um grunhido.', fx: { rec: 1, xp: 6, stats: { fis: 2 } } } },
    ],
  },
  {
    id: 'tp_corpo_diamante', title: 'A Medula de Diamante', rarity: 'lendario', cooldown: 120, weight: 1.2, escala: true,
    cond: P('corpo', 5, 8, 6),
    text: 'A última têmpera é a da medula: aquilo que o corpo guarda no mais fundo dos ossos. Não há martelo capaz. Só a vontade, a respiração, a dor mais antiga. Se der certo, o seu corpo vira um templo indestrutível.',
    choices: [
      { text: 'Mergulhar na dor, em retiro de sete anos.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'corpo' }, ok: { text: 'Sete anos depois, você abre os olhos e a sua medula brilha, translúcida. O corpo é uma montanha que anda.', fx: { rec: 3, anos: 7, xp: 20, stats: { fis: 4, dao: 2 }, vida: 80 } }, fail: { text: 'A dor vence antes do fim. Você sai do retiro quebrado, mas com a medula já parcialmente temperada.', fx: { rec: 1, anos: 4, ferida: 3, xp: 6, stats: { fis: 2 } } } },
      { text: 'Esperar o corpo estar pronto, sem forçar.', res: { text: 'Esperar é, para os impacientes, o desafio mais difícil. Você aprende que a pressa é só outra forma de fraqueza.', fx: { rec: 1, stats: { dao: 3 }, xp: 6 } } },
    ],
  },

  /* ================= CONSCIÊNCIA (alma) ================= */
  {
    id: 'tp_alma_rua', title: 'Ouvir a Rua Inteira', rarity: 'comum', cooldown: 30, weight: 1.8, escala: true,
    cond: P('alma', 1, 3),
    text: 'Seu Mar da Consciência estende-se por uma rua. Você sente as conversas, o passo dos cavalos, o choro de uma criança, o pensamento de um padeiro que sonha em ser poeta. É demais, e é belo.',
    choices: [
      { text: 'Expandir mais um pouco, até a próxima esquina.', check: { stat: ['esp', 'dao'], dif: 0, tag: 'mente' }, ok: { text: 'A consciência estica como um fio de seda. Você sente, pela primeira vez, uma segunda rua inteira.', fx: { rec: 2, xp: 5, stats: { esp: 1, comp: 1 } } }, fail: { text: 'A mente se atropela, e você cai de joelhos com a cabeça zunindo.', fx: { rec: 1, ferida: 1, xp: 2 } } },
      { text: 'Fechar os ouvidos da mente, e descansar.', res: { text: 'O silêncio que vem em seguida é uma bênção. Você descobre que a fonte de toda a paz é saber desligar.', fx: { rec: 1, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tp_alma_pensamentos', title: 'Os Pensamentos Alheios', rarity: 'raro', cooldown: 60, weight: 1.6, escala: true,
    cond: P('alma', 3, 5, 3),
    text: 'Sua percepção já alcança uma cidade. Em meio ao ruído, você começa a distinguir os pensamentos de quem passa: medo, desejo, culpa. Um mercador planeja envenenar o sócio. Uma viúva ensaia uma mentira piedosa.',
    choices: [
      { text: 'Intervir e impedir o envenenamento.', check: { stat: ['esp', 'car'], dif: 1, tag: 'mente' }, ok: { text: 'O mercador recua, sem saber por quê. O sócio vive, sem saber o quanto lhe deve.', fx: { rec: 2, karma: 8, fama: 4, stats: { esp: 1, dao: 1 } } }, fail: { text: 'Você intervém tarde. O sócio morre, e você carrega o peso do que já sabia.', fx: { rec: 1, karma: -4, stats: { dao: 2 } } } },
      { text: 'Fechar a mente: não é seu direito saber.', res: { text: 'Fechar é um ato de humildade. A privacidade dos outros é, afinal, o que o torna digno de ouvi-los.', fx: { rec: 1, karma: 4, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tp_alma_continente', title: 'A Consciência Que Cobre o Continente', rarity: 'lendario', cooldown: 120, weight: 1.2,
    cond: P('alma', 5, 8, 6),
    text: 'Pela primeira vez, a sua consciência divina atravessa o continente. Você sente cada seita, cada aldeia, cada batalha. É como ser, ao mesmo tempo, o céu e o chão. A pergunta que o Dao faz agora é: o que você faz com tanto saber?',
    choices: [
      { text: 'Usá-lo para proteger os inocentes.', res: { text: 'Em cem lugares ao mesmo tempo, você desvia um erro, adia uma guerra, acalma um rancor. Ninguém sabe quem fez. É a melhor das reputações.', fx: { rec: 3, karma: 20, stats: { dao: 3, esp: 3 }, xp: 15 } } },
      { text: 'Usá-lo para aprender tudo que o continente sabe.', res: { text: 'Em um ano, você tem a biblioteca mais completa do mundo dentro da cabeça. Mas é uma biblioteca sem janelas.', fx: { rec: 3, stats: { comp: 4, esp: 2 }, xp: 15 } } },
      { text: 'Recolher a consciência: é demais para um só.', res: { text: 'O mundo volta ao tamanho de uma casa. Você suspira, e o suspiro tem alívio.', fx: { rec: 1, stats: { dao: 4 } } } },
    ],
  },

  /* ================= FORMAÇÕES ================= */
  {
    id: 'tp_formacoes_terreno', title: 'Preparar o Terreno', rarity: 'comum', cooldown: 30, weight: 1.8, escala: true,
    cond: P('formacoes', 1, 3),
    text: 'Um viajante lhe pede abrigo por uma noite, e você sabe que, atrás dele, vem alguém com más intenções. Há tempo de preparar a casa: uma formação simples, de pedras e linhas de giz, pode fazer a diferença.',
    choices: [
      { text: 'Desenhar uma formação de defesa em volta da casa.', check: { stat: ['comp', 'esp'], dif: 0, tag: 'formacao' }, ok: { text: 'Quando os perseguidores chegam, topam numa parede invisível. A noite passa em paz, e as pedras ainda brilham pela manhã.', fx: { rec: 2, xp: 5, karma: 3, stats: { comp: 1 } } }, fail: { text: 'A formação funciona só pela metade. O viajante sai ferido, e você, humilhado.', fx: { rec: 1, ferida: 1, karma: 1 } } },
      { text: 'Esconder o viajante e fugir pela porta dos fundos.', res: { text: 'A formação é, afinal, uma boa escolha. Mas fugir também é, às vezes, a sabedoria de quem sabe quando não lutar.', fx: { rec: 1, stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'tp_formacoes_contrato', title: 'O Contrato da Formação', rarity: 'raro', cooldown: 60, weight: 1.6, escala: true,
    cond: P('formacoes', 3, 5, 3),
    text: 'Uma casa de comércio lhe propõe um contrato: instalar uma formação de proteção em sete armazéns, com garantia de décadas. A recompensa é alta, e a responsabilidade, também: se um armazém cai, o seu nome cai junto.',
    choices: [
      { text: 'Aceitar o contrato e instalar as sete formações.', check: { stat: ['comp', 'esp', 'sor'], dif: 1, tag: 'formacao' }, ok: { text: 'Sete formações perfeitas. A casa de comércio o recomenda a outras, e a sua reputação de arquiteto de segurança se espalha.', fx: { rec: 2, pedras: 350, fama: 10, xp: 6, stats: { comp: 1 } } }, fail: { text: 'Uma formação falha na primeira tempestade. A casa de comércio pede o dinheiro de volta.', fx: { rec: 1, pedras: -100, fama: -3 } } },
      { text: 'Recusar: o prazo é longo demais.', res: { text: 'A casa contrata um concorrente. Você respira, livre da dívida, e um pouco enciumado.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tp_formacoes_montanha', title: 'A Formação da Montanha', rarity: 'lendario', cooldown: 120, weight: 1.2, escala: true,
    cond: P('formacoes', 5, 8, 6),
    text: 'A seita pede a você, e a mais ninguém, que transforme a própria montanha numa formação defensiva. Cada pico, um nó; cada vale, uma linha. Será uma obra de décadas, e um milagre.',
    choices: [
      { text: 'Aceitar e dedicar vinte anos à obra.', check: { stat: ['comp', 'esp', 'dao'], dif: 3, tag: 'formacao' }, ok: { text: 'A montanha vira um grande arranjo vivo. Exércitos inteiros tropeçam nas encostas, e a seita jamais será invadida enquanto ela durar.', fx: { rec: 3, anos: 20, fama: 25, xp: 15, stats: { comp: 4, esp: 2 }, setFlags: ['formacao_montanha'] } }, fail: { text: 'A obra termina com uma falha oculta. Funciona, mas tem uma brecha que só você conhece.', fx: { rec: 1, anos: 20, fama: 10, stats: { comp: 2 } } } },
      { text: 'Recusar a obra e ensinar discípulos a fazê-la.', res: { text: 'Em cinquenta anos, três discípulos terminam a obra juntos. A formação tem uma beleza que nenhum só teria feito.', fx: { rec: 2, karma: 10, fama: 12, stats: { comp: 2, car: 2 } } } },
    ],
  },

  /* ================= MÉRITO (budista) ================= */
  {
    id: 'tp_budista_sutra', title: 'Uma Boa Ação Sem Testemunhas', rarity: 'comum', cooldown: 30, weight: 1.8,
    cond: P('budista', 1, 3),
    text: 'No caminho do mérito, o que vale é o ato que ninguém vê. Você encontra, ao lado da estrada, uma bolsa de moedas perdida, com um nome gravado. O dono mora a três dias de distância, e a sua viagem não passa por lá.',
    choices: [
      { text: 'Desviar três dias para devolver a bolsa.', res: { text: 'O dono chora, e oferece uma recompensa que você recusa. Você segue adiante, com a sensação de ter acendido uma lamparina invisível.', fx: { rec: 2, karma: 8, xp: 4, stats: { dao: 1 } } } },
      { text: 'Deixar a bolsa num templo, com recado.', res: { text: 'O monge sorri, anota, promete cuidar. Não é o ato perfeito, mas é um ato.', fx: { rec: 1, karma: 4, stats: { dao: 1 } } } },
      { text: 'Ficar com a bolsa, e ajudar alguém que precisa mais.', res: { text: 'Você usa o dinheiro para comprar remédios a uma família doente. O dono nunca saberá, e a bolsa tem o seu nome agora, em outro lugar.', fx: { rec: 1, karma: 3, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'tp_budista_transferir', title: 'O Mérito Que se Reparte', rarity: 'raro', cooldown: 60, weight: 1.6,
    cond: P('budista', 3, 5, 3),
    text: 'Um jovem que você ajudou numa fase difícil está morrendo. Os monges lhe dizem que seria possível transferir parte do seu mérito a ele, para ajudá-lo na travessia. Você perderia o mérito, e ele ganharia uma boa próxima vida.',
    choices: [
      { text: 'Transferir o mérito sem hesitar.', res: { text: 'O jovem morre em paz, e algo em você floresce, mais leve. O mérito se multiplica ao ser dado, como uma chama que acende outra.', fx: { rec: 1, karma: 15, stats: { dao: 3, car: 1 }, xp: 6 } } },
      { text: 'Rezar por ele, sem transferir.', res: { text: 'As suas orações são sinceras, mas curtas. Ele parte com um sorriso pequeno, e você, com a dúvida.', fx: { karma: 4, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tp_budista_vajra', title: 'O Corpo de Vajra', rarity: 'lendario', cooldown: 120, weight: 1.2,
    cond: P('budista', 5, 8, 6),
    text: 'Ao fim de décadas de bondade silenciosa, uma luz dourada começa a emanar do seu corpo. Sua pele parece cristal. O mérito acumulado se solidifica em algo próprio: um corpo de vajra, indestrutível, que só o amor impede de virar pedra.',
    choices: [
      { text: 'Aceitar o corpo de vajra e seguir servindo.', res: { text: 'A luz dourada não se apaga. Demônios recuam, feridas se fecham, o medo perde o poder. Você ainda lava a louça do templo.', fx: { rec: 3, karma: 15, stats: { fis: 3, dao: 4 }, xp: 18, vida: 60 } } },
      { text: 'Recusar a transformação: um corpo comum é bom o bastante.', res: { text: 'A luz recua. Você continua com o seu corpo velho, e os joelhos doendo. Os monges ficam em silêncio, e depois aplaudem.', fx: { karma: 10, stats: { dao: 4 }, xp: 8 } } },
    ],
  },

  /* ================= VENENOS ================= */
  {
    id: 'tp_venenos_prova', title: 'Provar o Veneno Diluído', rarity: 'comum', cooldown: 30, weight: 1.8, escala: true,
    cond: P('venenos', 1, 3),
    text: 'Para ganhar tolerância, o envenenador prova gotas de cada veneno que fabrica, em doses mínimas, e o corpo aprende. É uma técnica antiga, e mal-vista: dizem que, uma dose a mais, e o corpo esquece como se curar.',
    choices: [
      { text: 'Tomar uma dose pequena, bem calculada.', check: { stat: ['comp', 'fis'], dif: 0, tag: 'veneno' }, ok: { text: 'Uma queimação, uma febre, uma lucidez estranha. O corpo aprende o veneno, e passa a rir dele.', fx: { rec: 2, xp: 4, stats: { fis: 1, comp: 1 } } }, fail: { text: 'A dose é um pouco forte. Você passa três dias de cama, vomitando e jurando nunca mais.', fx: { rec: 1, ferida: 1, xp: 1 } } },
      { text: 'Manusear sem provar, só observar os efeitos em ratos.', res: { text: 'A ciência é mais lenta, e menos perigosa. Você aprende o que cada veneno faz, sem pagar com o corpo.', fx: { rec: 1, stats: { comp: 2 } } } },
    ],
  },
  {
    id: 'tp_venenos_antidoto', title: 'O Antídoto Universal', rarity: 'raro', cooldown: 60, weight: 1.6, escala: true,
    cond: P('venenos', 3, 5, 3),
    text: 'Um médico famoso lhe apresenta um desafio: criar um antídoto universal. Se conseguir, a sua fama se espalhará. Se falhar, nada se perde. Se o veneno for do tipo errado, o paciente morre, e a culpa é sua.',
    choices: [
      { text: 'Tentar a fórmula mais ousada, com doze ingredientes.', check: { stat: ['comp', 'sor', 'esp'], dif: 2, tag: 'veneno' }, ok: { text: 'O antídoto funciona contra nove das dez toxinas testadas. É o melhor já feito, e o médico faz uma reverência.', fx: { rec: 2, fama: 12, pedras: 200, item: ['frasco_antidotos'], stats: { comp: 2 } } }, fail: { text: 'A fórmula falha em duas das toxinas. O médico não o culpa, mas recusa o frasco.', fx: { rec: 1, stats: { comp: 1 } } } },
      { text: 'Trabalhar a fórmula mais lenta e segura.', res: { text: 'O antídoto cobre sete toxinas. Menos glória, mais vidas salvas, e a certeza de que cada uma foi testada.', fx: { rec: 1, karma: 6, fama: 6, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'tp_venenos_rei', title: 'O Corpo Que é Veneno', rarity: 'lendario', cooldown: 120, weight: 1.2, escala: true,
    cond: P('venenos', 5, 8, 6),
    text: 'Depois de décadas de tolerância, o seu sangue é, ele mesmo, um veneno que poucos poderiam sobreviver a tocar. As ervas murcham à sua passagem; os insetos, ao seu respiro. O corpo é uma arma. A pergunta é: o que mais você deixa de ser?',
    choices: [
      { text: 'Aceitar o Corpo Venenoso como arma.', res: { text: 'O seu toque é letal. Inimigos o evitam, amigos também. A solidão vem junto com o poder.', fx: { rec: 3, stats: { fis: 3, esp: 2 }, xp: 15, fama: 12, karma: -3 } } },
      { text: 'Aprender a controlar o veneno, a ponto de curar.', check: { stat: ['comp', 'dao'], dif: 3, tag: 'veneno' }, ok: { text: 'Com paciência, o seu veneno aprende a ser remédio, na dose certa. Você se torna a lenda do outro lado da moeda.', fx: { rec: 3, karma: 12, stats: { comp: 3, dao: 3 }, xp: 15, fama: 14 } }, fail: { text: 'O controle falha, uma vez, em público. O medo se instala, e a lenda ganha uma sombra.', fx: { rec: 1, fama: -4, stats: { dao: 1 } } } },
    ],
  },

  /* ================= BESTAS ================= */
  {
    id: 'tp_bestas_filhote', title: 'O Filhote Que Cresce', rarity: 'comum', cooldown: 30, weight: 1.8,
    cond: P('bestas', 1, 3),
    text: 'O seu companheiro, um filhote de fera espiritual, passa por uma fase estranha: perde dentes, ganha pelagem nova, rosna sem motivo. Não sabe se obedece a você ou ao próprio instinto. Parece uma criança que cresce.',
    choices: [
      { text: 'Treiná-lo com paciência, todas as manhãs.', check: { stat: ['car', 'esp'], dif: 0, tag: 'besta' }, ok: { text: 'Ele aprende, devagar, a esperar o comando. Os olhos dele, a cada dia, falam mais.', fx: { rec: 2, xp: 4, stats: { car: 1, esp: 1 } } }, fail: { text: 'Ele foge para a floresta por três dias, e volta cheio de carrapatos e de orgulho.', fx: { rec: 1, xp: 2 } } },
      { text: 'Deixar que ele escolha o próprio ritmo.', res: { text: 'Ele cresce selvagem e leal, do jeito dele. Às vezes obedece. Sempre fica.', fx: { rec: 1, karma: 2, stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'tp_bestas_evolui', title: 'A Noite da Metamorfose', rarity: 'raro', cooldown: 60, weight: 1.6, escala: true,
    cond: P('bestas', 3, 5, 3),
    text: 'Numa noite de lua cheia, o seu companheiro se enrola numa bola de névoa. Ao amanhecer, é outro: maior, mais forte, de olhos que brilham como brasas. Ele evoluiu, e está esperando, quieto, para saber se você aceita o novo ele.',
    choices: [
      { text: 'Abraçar o companheiro e aceitar a mudança.', res: { text: 'Ele funga, e ronrona como um trovão. O laço entre vocês, agora, dura além da morte de qualquer um dos dois.', fx: { rec: 3, karma: 5, stats: { esp: 2, car: 2 }, xp: 8 } } },
      { text: 'Testar a força dele num duelo amistoso.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'besta' }, ok: { text: 'Vocês lutam como irmãos, sem dor. Cada golpe é uma pergunta, e cada resposta, uma amizade.', fx: { rec: 2, fama: 6, xp: 6, stats: { fis: 1, esp: 1 } } }, fail: { text: 'Ele ainda não domina a nova forma, e o duelo termina em arranhões. Os dois riem, cansados.', fx: { rec: 1, ferida: 1 } } },
    ],
  },
  {
    id: 'tp_bestas_real', title: 'A Besta Real', rarity: 'lendario', cooldown: 120, weight: 1.2, escala: true,
    cond: P('bestas', 5, 8, 6),
    text: 'O seu companheiro, hoje uma besta de proporções míticas, ouve um chamado ancestral, vindo do norte. É o chamado dos reis das feras, uma convocação de todos os seus semelhantes. Ele olha para você, e pergunta, sem palavras: "Posso ir?"',
    choices: [
      { text: 'Acompanhá-lo ao norte, como amigo.', res: { text: 'Na assembleia das feras, você é o único humano. Eles o aceitam, por causa dele. A saga de vocês dois entra para as lendas das duas espécies.', fx: { rec: 3, fama: 20, karma: 8, stats: { car: 3, esp: 2 }, xp: 15 } } },
      { text: 'Deixá-lo ir sozinho, e esperar a sua volta.', res: { text: 'Ele volta meses depois, mais velho e mais quieto. Escolheu voltar, e isso, mais que o poder, é o prêmio.', fx: { rec: 2, karma: 6, stats: { dao: 3 }, xp: 10 } } },
    ],
  },

  /* ================= SANGUE (demoníaca) ================= */
  {
    id: 'tp_sangue_gota', title: 'A Gota de Essência', rarity: 'comum', cooldown: 30, weight: 1.8, escala: true,
    cond: P('demoniaca', 1, 3),
    text: 'O Caminho do Sangue se alimenta de essência vital. Uma gota, bem escolhida, vale mais que um mês de cultivo. Mas a essência de um inocente cobra um preço que não aparece em nenhuma balança, e a de um inimigo, nem sempre é suficiente.',
    choices: [
      { text: 'Refinar a essência de um bandido capturado.', check: { stat: ['fis', 'dao'], dif: 0, tag: 'demonio' }, ok: { text: 'A essência é amarga, mas potente. A corrupção sobe um pouco, e o poder, bastante.', fx: { rec: 2, xp: 8, corr: 5, stats: { fis: 1, esp: 1 }, karma: -2 } }, fail: { text: 'O bandido era mais fraco do que parecia, e a essência é escassa. Você sai com enjoo, e uma culpa estranha.', fx: { rec: 1, corr: 3, ferida: 1 } } },
      { text: 'Usar apenas o próprio sangue, em ritual curto.', res: { text: 'O ritual dói, e é limpo. O poder sobe menos, a corrupção também. Alguns chamam de covardia, outros de prudência.', fx: { rec: 1, xp: 4, corr: 2, stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'tp_sangue_rio', title: 'O Rio de Sangue', rarity: 'raro', cooldown: 60, weight: 1.6, escala: true,
    cond: P('demoniaca', 3, 5, 3),
    text: 'Seu sangue corre quente, rápido, com vontade própria. Meridianos novos, rubros, se abrem e cantam. Você sente que pode controlar o fluxo de qualquer corpo ao alcance, mas cada uso deixa uma mancha na alma.',
    choices: [
      { text: 'Dominar o próprio rio e seguir sem tocar nos outros.', check: { stat: ['dao', 'fis'], dif: 2, tag: 'demonio' }, ok: { text: 'O rio acalma. Você aprende a ser dono do seu poder, sem alimentá-lo de ninguém. Poucos no Caminho do Sangue chegam tão longe.', fx: { rec: 2, xp: 10, corr: -4, stats: { dao: 3, fis: 2 } } }, fail: { text: 'O rio escapa, e se derrama numa cena que você preferia esquecer.', fx: { rec: 1, corr: 8, ferida: 2, karma: -6 } } },
      { text: 'Usar o rio para drenar inimigos e crescer rápido.', res: { text: 'O poder sobe como maré. Os inimigos, sem saber por quê, caem. A corrupção sobe junto.', fx: { rec: 3, xp: 15, corr: 12, stats: { fis: 3, esp: 2 }, karma: -8, fama: -4 } } },
    ],
  },
  {
    id: 'tp_sangue_trono', title: 'O Trono de Sangue', rarity: 'lendario', cooldown: 120, weight: 1.2, escala: true,
    cond: P('demoniaca', 5, 8, 6),
    text: 'Diante de você, um trono feito de ossos e sangue cristalizado emerge da terra, lembrança de reis antigos do Caminho do Sangue. Quem senta nele ganha poder sem limite, e o preço é perder o rosto, nome e memória.',
    choices: [
      { text: 'Sentar-se no trono.', res: { text: 'O poder é imenso, e a pessoa que você era sai do corpo, como fumaça. Aquilo que se levanta do trono tem o seu rosto, e mais nada.', fx: { rec: 3, xp: 25, corr: 30, stats: { fis: 5, esp: 4, dao: -3 }, karma: -15, fama: -10 } } },
      { text: 'Destruir o trono, com o próprio poder.', check: { stat: ['dao', 'fis', 'esp'], dif: 3, tag: 'demonio' }, ok: { text: 'O trono racha, e solta um grito de mil vozes. O poder que dele se desprende, em vez de enlouquecer você, fica como lembrança.', fx: { rec: 2, xp: 15, corr: -15, stats: { dao: 4, fis: 2 }, karma: 10, fama: 12 } }, fail: { text: 'O trono resiste, e uma onda de sangue o atinge. Você foge, marcado.', fx: { rec: 1, ferida: 3, corr: 10, stats: { dao: 1 } } } },
      { text: 'Deixar o trono onde está, e partir.', res: { text: 'O trono desaparece quando você vira as costas. Algum outro cultivador o encontrará, em outra era.', fx: { stats: { dao: 3 }, karma: 2 } } },
    ],
  },
];
