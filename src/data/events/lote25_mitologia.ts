import type { GameEvent } from '../../types';

/**
 * Lote 25 — Mitologia chinesa e xuanhuan (reinterpretadas com nomes e histórias próprios):
 * palácio do Rei Dragão, raposa de nove caudas, o juiz do submundo, o pêssego da imortalidade, a dama da Lua,
 * macaco de pedra, torre das provas celestes, guardiões das quatro direções, o rio do esquecimento.
 */
export const lote25Mitologia: GameEvent[] = [
  {
    id: 'mt_palacio_dragao', title: 'O Palácio Sob o Mar', rarity: 'raro', once: true, weight: 1.2, escala: true,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'Numa maré baixa fora de época, uma escadaria de coral aparece no fundo do mar. Ela desce até as portas de um palácio de madrepérola, onde um velho de barbas de alga, o Rei Dragão do Leste, recebe visitas com cortesia e muitas armadilhas.',
    choices: [
      { text: 'Descer a escadaria e pedir audiência.', check: { stat: ['car', 'dao', 'sor'], dif: 2 }, ok: { text: 'O rei o recebe, ri de suas respostas, e oferece uma pérola em troca de um favor futuro. Você aceita, sem saber o preço.', fx: { item: ['perola_abismo'], stats: { esp: 2, car: 1 }, xp: 8, setFlags: ['favor_do_rei_dragao'] } }, fail: { text: 'As portas se fecham antes de você chegar. A maré sobe, e você volta nadando, de pulmões em chamas.', fx: { ferida: 2, stats: { fis: 1 } } } },
      { text: 'Furtar uma pérola dos guardas.', check: { stat: ['sor', 'fis'], dif: 2, tag: 'fuga' }, ok: { text: 'Dentro do palácio, o silêncio é tenso. Você sai com uma pérola do tamanho de um punho, e algo, no oceano, jura vingança.', fx: { item: ['perola_abismo'], pedras: 100, karma: -4, setFlags: ['inimigo_secreto'] } }, fail: { text: 'Soldados-caranguejo o cercam, e o rei, indignado, o devolve à praia com um tapa de onda.', fx: { ferida: 2, fama: -3 } } },
      { text: 'Ficar na praia e agradecer ao mar.', res: { text: 'O mar recua, e deixa três conchas à sua frente. Dentro de uma delas, uma pérola pequena. Presente de quem ouviu.', fx: { karma: 3, pedras: 40, stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'mt_raposa_nove', title: 'A Visita da Mulher de Nove Sombras', rarity: 'raro', cooldown: 120, weight: 1.1, escala: true,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'Uma mulher de beleza improvável pede abrigo numa noite de chuva. Seus cabelos têm cheiro de ameixa, e sua sombra, ao fogo, tem uma cauda a mais. A cada hora, ela conta uma história diferente sobre quem é.',
    choices: [
      { text: 'Abrigá-la e fingir não perceber a sombra.', check: { stat: ['dao', 'car'], dif: 1, tag: 'mente' }, ok: { text: 'Pela manhã, ela se despede, divertida. "Você é o primeiro em cem anos a não me temer." Deixa uma cauda de seda, e um favor.', fx: { karma: 5, stats: { dao: 2, car: 1 }, item: ['amuleto_nove_caudas'] } }, fail: { text: 'Ela ri, e a noite escurece. Quando você acorda, falta metade da casa, e uma lembrança preciosa.', fx: { stats: { dao: -1, sor: -1 }, corr: 3 } } },
      { text: 'Confrontá-la com um talismã.', check: { stat: ['esp', 'fis'], dif: 2, tag: 'demonio' }, ok: { text: 'A raposa recua, ofendida e impressionada. "Sabe lutar", diz, em voz de sino. Ela some, deixando uma única pena de prata.', fx: { fama: 8, xp: 6, stats: { esp: 1, dao: 1 } } }, fail: { text: 'O talismã explode em chamas rosadas, e a mulher some em risada. Seu cabelo ficou branco numa mecha.', fx: { ferida: 1, stats: { sor: -1 } } } },
      { text: 'Expulsá-la: caridade com desconhecidos é arriscada.', res: { text: 'Ela agradece, com uma reverência que parece zombaria, e sai na chuva. No dia seguinte, a vila vizinha está em festa, por razões que ninguém sabe explicar.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'mt_juiz_submundo', title: 'O Juiz do Submundo', rarity: 'raro', once: true, weight: 1.0,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'Numa febre profunda, você caminha por uma estrada de poeira cinza até um tribunal. Atrás da mesa, um juiz de rosto verde folheia um livro enorme. "{nome}", lê. "Nasceu, viveu, errou, ajudou. Falta pouco para a conta fechar. Algum pedido antes da sentença?"',
    choices: [
      { text: 'Pedir mais tempo para corrigir um erro.', res: { text: 'O juiz fecha o livro com um estalo. "Concedido. Mas cada ano é um empréstimo." Você acorda, suado, com uma tarefa na cabeça e um prazo na alma.', fx: { vida: 10, karma: 3, stats: { dao: 2 }, setFlags: ['divida_com_o_submundo'] } } },
      { text: 'Pedir a leitura da conta, para entender seus erros.', check: { stat: ['dao', 'comp'], dif: 1, tag: 'mente' }, ok: { text: 'O juiz lê, devagar, e você ouve a sua vida como se fosse de outro. Cada erro tem uma lição, e cada lição, uma ferida. Você acorda mais sábio, e mais humilde.', fx: { stats: { dao: 3, comp: 1 }, xp: 8, karma: 2 } }, fail: { text: 'A leitura é longa demais, e confusa. Você acorda sem lembrar de quase nada, só do cheiro de papel velho.', fx: { stats: { dao: 1 } } } },
      { text: 'Recusar o tribunal: você não vai a lugar nenhum.', check: { stat: ['dao', 'fis'], dif: 2 }, ok: { text: 'O juiz ergue uma sobrancelha, e abre a porta. "Teimosos como você me dão trabalho. Vá." Você acorda com fome de vivo.', fx: { vida: 5, stats: { dao: 2, fis: 1 } } }, fail: { text: 'A porta não abre. Você acorda dias depois, febril e emagrecido, com a ideia de que algo, em algum lugar, anotou o seu nome.', fx: { ferida: 2, vida: -5 } } },
    ],
  },
  {
    id: 'mt_pessego', title: 'O Pêssego dos Mil Anos', rarity: 'lendario', once: true, weight: 0.9,
    cond: { tierMin: 3, tierMax: 6 },
    text: 'Num vale que ninguém encontra duas vezes, uma árvore antiga sustenta um único pêssego dourado. Ele pulsa ao vento. Quem o provar, diz a lenda, ganha mil anos, ou perde a razão. Ao pé da árvore, uma estátua de macaco de pedra sorri, e parece te olhar.',
    choices: [
      { text: 'Colher e comer o pêssego.', check: { stat: ['dao', 'sor'], dif: 3 }, ok: { text: 'O sabor é de todas as estações. Você sente os anos se acumulando, devagar, em ossos que já não doem. Algo, atrás da estátua, ri.', fx: { vida: 120, stats: { dao: 2, esp: 2, fis: 1 }, xp: 12 } }, fail: { text: 'O sumo é denso demais. Você desmaia, e acorda dias depois, com a barba crescida e uma vaga lembrança de um macaco.', fx: { vida: 20, ferida: 2, stats: { dao: 1 } } } },
      { text: 'Deixar o pêssego para outro.', res: { text: 'A estátua do macaco parece sorrir mais largo. Você sai do vale, e jamais o encontra de novo.', fx: { karma: 5, stats: { dao: 3 } } } },
      { text: 'Levar o pêssego para alguém que você ama.', res: { text: 'Você o carrega por semanas, intacto. Quem o come ganha uma vida mais longa, e uma estranha mansidão.', fx: { karma: 8, stats: { dao: 2, car: 1 }, setFlags: ['deu_o_pessego'] } } },
    ],
  },
  {
    id: 'mt_dama_lua', title: 'A Dama da Lua', rarity: 'raro', cooldown: 120, weight: 1.0,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'Numa noite de lua cheia, uma figura de branco desce da luz como se descesse uma escada. Seu rosto é triste, e a voz, como água num poço fundo. "Já fui mortal", diz. "Hoje guardo o espelho do céu. Sinto falta de uma conversa."',
    choices: [
      { text: 'Conversar com ela até o amanhecer.', res: { text: 'Ela fala do marido que não voltou, da lebre que pila elixir, dos mortais que perguntam o que não devem. Ao amanhecer, deixa uma gota de orvalho, que arde de fria.', fx: { karma: 5, stats: { dao: 2, esp: 1 }, item: ['erva_lua_prata'] } } },
      { text: 'Pedir um desejo.', check: { stat: ['sor', 'car'], dif: 2 }, ok: { text: 'Ela sorri, tristemente. "Nem todos os desejos são presentes." Mas concede um pequeno, e você o guarda como um tesouro.', fx: { stats: { sor: 2, esp: 1 }, xp: 6 } }, fail: { text: 'Ela se cala, e some. O desejo, qualquer que fosse, foi esquecido.', fx: { stats: { sor: -1 } } } },
      { text: 'Oferecer-lhe um copo de vinho em silêncio.', res: { text: 'Ela olha o copo por muito tempo, e aceita. Beber, para ela, é uma lembrança. "Obrigada", sussurra, antes de voltar à luz.', fx: { karma: 4, stats: { dao: 1, car: 1 } } } },
    ],
  },
  {
    id: 'mt_macaco_pedra', title: 'O Macaco de Pedra', rarity: 'raro', once: true, weight: 1.0, escala: true,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'No topo de uma colina, uma estátua rachada começa a falar. Um macaco, saindo da pedra, estende uma pata: "Há quinhentos anos que ninguém me desafia. Quer tentar?" Ele ri como um trovão, e faz piruetas com um bastão que é do tamanho de um pilar.',
    choices: [
      { text: 'Aceitar o desafio.', check: { stat: ['fis', 'esp', 'sor'], dif: 3, tag: 'combate' }, ok: { text: 'Três dias de acrobacias e golpes absurdos. No fim, você toca nele uma vez, por acaso. O macaco desaba de rir, e lhe dá um fio de pelo prateado.', fx: { fama: 12, stats: { fis: 2, sor: 2 }, xp: 10, item: ['bastao_ferro_frio'] } }, fail: { text: 'Você acaba pendurado numa árvore, com o macaco comendo as suas provisões. O desafio, ele diz, foi "interessante".', fx: { ferida: 1, pedras: -10, stats: { sor: 1 } } } },
      { text: 'Pedir que ele o ensine a pular nuvens.', check: { stat: ['esp', 'car'], dif: 2 }, ok: { text: 'Ele ri, balança a cabeça, e ensina um movimento tolo e sublime. Você não consegue pular nuvens, mas passa a pisar mais leve.', fx: {  stats: { sor: 1, esp: 1 } } }, fail: { text: 'O macaco o ignora, entediado, e volta a dormir. A colina fica em silêncio.', fx: { stats: { dao: 1 } } } },
      { text: 'Oferecer um pêssego, e pedir passagem.', res: { text: 'O macaco o aceita, e sorri. "Passe, pequeno. Mas diga que eu mandei lembranças ao Céu."', fx: { karma: 2, fama: 2 } } },
    ],
  },
  {
    id: 'mt_torre_provas', title: 'A Torre das Nove Provas', rarity: 'raro', once: true, weight: 1.1, escala: true,
    cond: { tierMin: 3, tierMax: 6 },
    text: 'Uma torre de nove andares, de pedra branca, surge sobre o cume de um monte que ontem estava vazio. Em cada andar, uma prova: lâmina, enigma, veneno, ilusão, peso, silêncio, espelho, memória, escolha. Quem a vence, diz o portão, vê "o rosto do Céu".',
    choices: [
      { text: 'Subir os nove andares em ordem.', check: { stat: ['fis', 'esp', 'comp', 'dao'], dif: 3 }, ok: { text: 'No último andar, não há ninguém. Só um espelho, e dentro dele, o seu rosto, mais velho e sereno. "Este é o Céu", diz uma voz. Você desce transformado.', fx: { stats: { dao: 4, esp: 2, comp: 2 }, xp: 15, fama: 12 } }, fail: { text: 'No quinto andar, você desiste, de joelhos. A torre o devolve à entrada com cortesia. "Volte", diz a voz.', fx: { ferida: 2, xp: 5, stats: { dao: 2 } } } },
      { text: 'Subir apenas até onde se sentir pronto.', res: { text: 'Três andares, e uma epifania. Você desce com os olhos úmidos e a certeza de que a torre estará lá quando precisar.', fx: { stats: { dao: 2, comp: 1 }, xp: 6 } } },
      { text: 'Estudar a torre por fora, sem entrar.', check: { stat: ['comp', 'esp'], dif: 2, tag: 'formacao' }, ok: { text: 'A torre é, por dentro, uma formação gigantesca. Você a desenha por semanas, e leva o diagrama como relíquia.', fx: { stats: { comp: 3 }, xp: 8, item: ['cristal_formacao'] } }, fail: { text: 'A torre sussurra, e você sai com uma cefaleia de três dias.', fx: { ferida: 1, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'mt_quatro_guardioes', title: 'Os Quatro Guardiões das Direções', rarity: 'raro', once: true, weight: 1.0, escala: true,
    cond: { tierMin: 3, tierMax: 6 },
    text: 'Quatro estátuas gigantes, de tigre branco, tartaruga negra, pássaro vermelho e dragão azul, vigiam as quatro entradas de uma região escondida. Cada uma testa uma virtude. Para passar, é preciso agradar a pelo menos uma.',
    choices: [
      { text: 'Enfrentar o Tigre Branco, guardião da força.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'O tigre se curva. Atrás dele, o caminho se abre, e uma garra de jade cai em sua mão.', fx: { stats: { fis: 3 }, xp: 8, fama: 6 } }, fail: { text: 'O tigre o derruba, com uma pata, e rosna uma lição curta. Você sai sangrando, e agradecido.', fx: { ferida: 2, stats: { fis: 1 } } } },
      { text: 'Aguardar a Tartaruga Negra, guardiã da paciência.', check: { stat: ['dao', 'comp'], dif: 2 }, ok: { text: 'Você espera três dias. A tartaruga abre um olho, e assente. Ela cede a passagem, e uma carapaça pequena, de proteção.', fx: { stats: { dao: 3 }, xp: 8, item: ['escudo_tartaruga'] } }, fail: { text: 'A impaciência o trai no segundo dia. A tartaruga, sem pressa, o ignora.', fx: { stats: { dao: 1 } } } },
      { text: 'Cantar para o Pássaro Vermelho, guardião da beleza.', check: { stat: ['car', 'esp'], dif: 2 }, ok: { text: 'O pássaro responde, em harmonia. Plumas de fogo caem, sem queimar, e viram uma capa leve.', fx: { stats: { car: 2, esp: 2 }, xp: 8, item: ['manto_nuvem_cinza'] } }, fail: { text: 'A canção desafina, e o pássaro, ofendido, queima de leve o seu cabelo.', fx: { ferida: 1, fama: -1 } } },
      { text: 'Perguntar ao Dragão Azul, guardião da sabedoria.', check: { stat: ['comp', 'dao'], dif: 3, tag: 'mente' }, ok: { text: 'A pergunta é simples, e a resposta não. O dragão sorri com dentes de nuvem, e lhe dá um conselho que, só mais tarde, você entenderá.', fx: { stats: { comp: 3, dao: 2 }, xp: 10, setFlags: ['conselho_do_dragao'] } }, fail: { text: 'O dragão, entediado, boceja. Você sai sem resposta, e com a impressão de ter feito a pergunta errada.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'mt_rio_esquecimento', title: 'O Rio do Esquecimento', rarity: 'raro', once: true, weight: 1.0,
    cond: { tierMin: 3, tierMax: 7 },
    text: 'Numa noite sem nuvens, você chega a uma margem onde uma velha serve sopa em tigelas de barro. A sopa, diz, apaga uma lembrança, uma só, a que mais dói. O rio, atrás dela, corre quieto, em tons de prata.',
    choices: [
      { text: 'Tomar a sopa e esquecer o que mais dói.', res: { text: 'A sopa é morna, e a dor, de repente, é um buraco onde antes havia história. Você não sabe o que perdeu, só que perdeu, e uma paz oca vem junto.', fx: { corr: -15, stats: { dao: -1 }, karma: -2, vida: 20 } } },
      { text: 'Recusar a sopa: a dor também é você.', res: { text: 'A velha sorri. "Poucos recusam, e todos ficam inteiros." Você segue, com a lembrança, e com o peso, e com a clareza.', fx: { stats: { dao: 3 }, karma: 3 } } },
      { text: 'Pedir a ela que esqueça, por você, algo que você fez de errado.', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'Ela ri, e despeja a sopa no rio. "A culpa não se esquece, mas se dilui." Você sente, de repente, o peito mais leve.', fx: { karma: 6, corr: -8, stats: { dao: 2 } } }, fail: { text: 'A velha balança a cabeça. "Isso, só você." Ela serve a sopa a outro, e você parte sem resposta.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'mt_espirito_montanha', title: 'O Espírito da Montanha', rarity: 'comum', cooldown: 80, weight: 1.2, escala: true,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'Ao cruzar uma serra, você sente o ar engrossar: o espírito do monte observa. Se aparecesse, seria um ancião de barba de névoa e olhos de pedra. Por ora, só uma voz grave: "Quem pisa em minha casa, pisa com respeito, ou com preço."',
    choices: [
      { text: 'Pagar o preço: uma oferenda de 30 pedras.', custo: 30, res: { text: 'As pedras somem na neblina. A montanha, satisfeita, abre uma trilha curta, e o vento muda a seu favor.', fx: { karma: 2, stats: { sor: 1, dao: 1 }, xp: 3 } } },
      { text: 'Pisar com respeito: falar baixo, não pegar nada.', res: { text: 'O espírito, divertido, o deixa passar. Uma flor rara aparece à beira da trilha, como presente.', fx: { karma: 4, item: ['erva_orvalho'], stats: { dao: 1 } } } },
      { text: 'Desafiar o espírito: a montanha é de quem a escala.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'A neblina o envolve, e se rende. O espírito, rindo, concede passagem, e uma lição de humildade em forma de pedra.', fx: { fama: 5, stats: { dao: 2, fis: 1 }, xp: 5 } }, fail: { text: 'Uma avalanche pequena, mas bem dirigida, o devolve ao pé do monte.', fx: { ferida: 2, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'mt_fantasma_noiva', title: 'A Noiva de Vermelho', rarity: 'comum', cooldown: 90, weight: 1.0, escala: true,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'Pelos corredores da estalagem, numa noite sem lua, passa uma noiva de vermelho, de cabelos longos e rosto coberto por um véu. Ela não pisa no chão. Todas as portas fecham sozinhas. Ela para na sua.',
    choices: [
      { text: 'Perguntar o que ela quer.', check: { stat: ['dao', 'car'], dif: 1, tag: 'mente' }, ok: { text: 'Ela conta: foi traída no dia do casamento, e vaga procurando o noivo. Você promete descobrir o paradeiro dele. Ela some, e deixa a porta em paz.', fx: { karma: 5, stats: { dao: 2 }, setFlags: ['promessa_a_noiva'] } }, fail: { text: 'Ela grita, sem som. Você acorda no chão, com cabelos brancos na têmpora.', fx: { ferida: 1, corr: 3, stats: { dao: 1 } } } },
      { text: 'Expulsá-la com um talismã.', check: { stat: ['esp', 'fis'], dif: 1, tag: 'demonio' }, ok: { text: 'O talismã arde, e ela some, com um sussurro de agradecimento amargo. Você dorme mal, mesmo assim.', fx: { xp: 3, stats: { esp: 1 }, karma: -1 } }, fail: { text: 'O talismã vira cinza ao toque. Ela some sozinha, no tempo dela.', fx: { stats: { esp: 1 } } } },
      { text: 'Fechar os olhos e esperar que passe.', res: { text: 'O frio dura uma hora. Pela manhã, o seu quarto tem cheiro de ameixa, e uma flor de papel, vermelha, na mesa.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'mt_lago_espelho', title: 'O Lago Que Mostrava o Futuro', rarity: 'raro', once: true, weight: 0.9,
    cond: { tierMin: 3, tierMax: 7 },
    text: 'Um lago imóvel mostra, em vez do seu rosto, uma cena que ainda não aconteceu: você, mais velho, de pé diante de um portão em chamas. Um vulto à sua frente chama o seu nome. A imagem muda, e some.',
    choices: [
      { text: 'Estudar o lago e buscar mais imagens.', check: { stat: ['esp', 'comp'], dif: 2, tag: 'mente' }, ok: { text: 'Por dias, o lago mostra fragmentos. Você anota cada um. Não dá para mudar o futuro, mas dá para se preparar.', fx: { stats: { comp: 2, esp: 2 }, xp: 8, setFlags: ['viu_o_futuro'] } }, fail: { text: 'O lago, cansado de perguntas, só mostra o seu rosto. Você ri, chateado, e volta.', fx: { stats: { esp: 1 } } } },
      { text: 'Fugir: o futuro não deve ser visto.', res: { text: 'Você nunca mais encontra o lago. Mas, em noites de chuva, o portão em chamas volta, em sonho.', fx: { stats: { dao: 2 } } } },
      { text: 'Atirar uma pedra no lago, quebrando a imagem.', res: { text: 'As ondas apagam a cena. Mas uma voz, do fundo, sussurra: "Não adianta." Você sai, com a pedra ainda na memória.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },
];
