import type { GameEvent } from '../../types';

/**
 * Lote 7 — Regressão e reencarnação, o "sistema" (janela de status e missões) e o Céu.
 * Convenções de manhwa/manhua: regressor com memórias do futuro, quadro de status, missões e penalidades;
 * convenções xianxia: Dao Celestial, tribulação do coração, corte celeste burocrática, karma que pesa na tribulação.
 * O "Registro Celeste" é uma criação original deste jogo.
 */
export const lote7Ceu: GameEvent[] = [
  /* ===== Reencarnado / Regressor ===== */
  {
    id: 'memoria_licao_antiga', title: 'Um Método Que Você Nunca Aprendeu', rarity: 'comum', once: true, weight: 3,
    cond: { tierMin: 1, tierMax: 5, flags: ['reencarnado'] },
    text: 'Numa meditação comum, suas mãos formam, sozinhas, uma sequência de selos que você nunca estudou. Cada gesto parece mais natural do que respirar.',
    choices: [
      { text: 'Seguir o fluxo das mãos até o fim.', check: { stat: ['comp', 'dao'], dif: 1, tag: 'mente' }, ok: { text: 'Um método inteiro se desdobra na sua memória, seco e preciso. Você o anota antes que se vá.', fx: {  xp: 12, stats: { comp: 2 } } }, fail: { text: 'As mãos se atrapalham. O método lhe escapa, mas a lembrança de que ele existe permanece.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'inimigo_vida_passada', title: 'O Rosto Que Você Já Viu Morrer', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 6, flags: ['reencarnado'] },
    text: 'Num mercado, um jovem de sorriso doce vira o rosto na sua direção. Seu sangue gela: é a cara de quem lhe cravou a lâmina nas costas na vida passada, ainda sem o ódio nos olhos.',
    choices: [
      { text: 'Matá-lo antes que cresça e repita o crime.', res: { text: 'Uma lâmina silenciosa. O jovem cai sem saber por quê. A culpa é pesada, mas o futuro, você sabe, será um pouco mais seguro.', fx: { karma: -18, corr: 6, stats: { dao: -2 } } } },
      { text: 'Aproximar-se dele como amigo.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'Você o ensina, protege e, de alguma forma, muda o que ele se tornará. Um futuro diferente começa a se desenhar.', fx: { karma: 14, stats: { car: 2, dao: 2 }, fama: 4, setFlags: ['aliado_vida_passada'] } }, fail: { text: 'Ele percebe algo estranho em você e se afasta, desconfiado. A história encontra um caminho, mesmo assim.', fx: { stats: { dao: 1 } } } },
      { text: 'Evitá-lo pelo resto da vida.', res: { text: 'Cada esquina, você olha por cima do ombro. Mas o destino nunca o encontra.', fx: { stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'erro_da_vida_passada', title: 'O Dia Em Que Tudo Deu Errado', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7, flags: ['reencarnado'] },
    text: 'Você acorda com uma certeza: hoje é o dia em que, na vida passada, sua seita foi traída. Uma carta, uma porta aberta, um nome. Você sabe o que acontecerá em poucas horas.',
    choices: [
      { text: 'Avisar a seita e impedir a traição.', check: { stat: ['car', 'comp'], dif: 3 }, ok: { text: 'Você chega a tempo. O traidor é preso, e a seita, abalada, sobrevive. Ninguém entende por que você sabia, mas todos agradecem.', fx: { fama: 14, karma: 12, stats: { comp: 2, car: 1 }, xp: 10 } }, fail: { text: 'Ninguém acredita, e o dia segue como na lembrança. A seita sofre, mas você salva alguns.', fx: { karma: 6, stats: { dao: 2 }, ferida: 1 } } },
      { text: 'Usar o conhecimento para lucrar com o caos.', res: { text: 'Você se posiciona do lado vencedor. O lucro é grande. O peso na consciência também.', fx: { pedras: 120, karma: -14, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'mestre_vida_passada_renasce', title: 'O Mestre Que Voltou Criança', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7, flags: ['reencarnado'] },
    text: 'Num vilarejo distante, você reconhece o jeito de andar de uma criança: o mesmo passo, a mesma mania de cutucar o queixo. É seu antigo mestre, que também renasceu, sem lembranças, e se tornou o que você nunca imaginou: mortal, comum, feliz.',
    choices: [
      { text: 'Revelar a verdade e ensinar de novo.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'A criança escuta, curiosa, sem entender. Mas as lições, repetidas, brotam como flores esquecidas. Em poucos anos, ela vai além da vida anterior.', fx: { karma: 14, stats: { dao: 3, car: 1 }, setFlags: ['mestre_renascido'] } }, fail: { text: 'A criança tem medo do estranho que a olha com saudade. Você parte sem mais palavras.', fx: { stats: { dao: 2 } } } },
      { text: 'Observar de longe e deixar a criança viver.', res: { text: 'Você olha uma tarde, deixa um presente anônimo e vai embora. Alguns reencontros são só para se despedir de novo.', fx: { karma: 8, stats: { dao: 3 } } } },
    ],
  },
  {
    id: 'nome_antigo', title: 'O Nome Que Não Era Seu', rarity: 'comum', once: true, weight: 3,
    cond: { tierMin: 2, tierMax: 8, flags: ['reencarnado'] },
    text: 'Num salão de chá, um idoso o chama por outro nome: aquele que você usava na vida passada. "Eu sabia", sussurra. "Você voltou." Atrás dele, olhos curiosos se voltam para vocês.',
    choices: [
      { text: 'Admitir quem foi.', res: { text: 'O idoso chora e o abraça. Depois conta, durante a noite inteira, tudo o que aconteceu desde sua morte. Muita coisa mudou. Muita permanece.', fx: { karma: 4, stats: { comp: 2, dao: 1 }, xp: 8 } } },
      { text: 'Negar e fingir que é um engano.', res: { text: 'O idoso balança a cabeça, sem insistir. "Como quiser." Mas você sabe que ele sabe.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'sussurro_do_futuro', title: 'Sussurros do Futuro Que Já Vivi', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['regressor'] },
    text: 'Desde que atravessou a fenda do tempo, certas coisas se repetem exatamente como você lembra. Hoje, ao ouvir um comerciante dizer uma frase, você sabe o que ele dirá a seguir, e depois, e depois.',
    choices: [
      { text: 'Usar a previsão para investir.', check: { stat: ['comp', 'sor'], dif: 2 }, ok: { text: 'Você compra o que vai valorizar e vende antes que desabe. Pedras fluem em ondas.', fx: { pedras: 180, karma: -2, stats: { comp: 1 } } }, fail: { text: 'Algo mudou: o futuro que você lembra já não é o mesmo. Você perde parte do que investiu.', fx: { pedras: -40, stats: { comp: 1 } } } },
      { text: 'Alertar quem vai sofrer o que você lembra.', res: { text: 'Alguns ouvem, outros riem. Os que ouvem se lembrarão de você com respeito.', fx: { karma: 10, fama: 5, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'segunda_chance', title: 'A Segunda Chance', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['regressor'] },
    text: 'Diante de um velho conhecido, você percebe que ele ainda está vivo, e que na primeira vida morreu justamente por sua causa. Hoje você sabe como evitar.',
    choices: [
      { text: 'Evitar o desastre e salvá-lo.', check: { stat: ['fis', 'esp', 'sor'], dif: 3 }, ok: { text: 'Você chega a tempo. O velho sorri, sem entender por quê, e aperta sua mão. Uma antiga ferida em seu peito se fecha.', fx: { karma: 16, stats: { dao: 3 }, xp: 10 } }, fail: { text: 'A história resiste: algo acontece, de outro jeito. Ele sobrevive, ferido.', fx: { karma: 6, ferida: 1, stats: { dao: 1 } } } },
      { text: 'Deixar acontecer: a vida e a morte têm suas razões.', res: { text: 'Você aceita o que não mudou. O luto é mais fácil na segunda vez. E mais difícil.', fx: { stats: { dao: 2 }, karma: -4 } } },
    ],
  },

  /* ===== O Registro Celeste (o "sistema") ===== */
  {
    id: 'janela_registro', title: 'A Janela de Luz', rarity: 'raro', once: true, weight: 2,
    cond: { tierMin: 1, tierMax: 4, noFlags: ['sistema'] },
    text: 'Num instante de silêncio, um quadro de luz azul aparece à sua frente, flutuando: seus atributos, escritos em caracteres limpos. "REGISTRO CELESTE ATIVADO", diz o título. Uma barra de progresso pisca sob seu nome.',
    choices: [
      { text: 'Aceitar o Registro Celeste.', res: { text: 'O quadro se contrai e entra no seu peito. Você sente uma presença atenta, como um escriturário invisível, anotando cada passo seu.', fx: { setFlags: ['sistema'], item: ['pena_registro'], stats: { comp: 1 }, xp: 6 } } },
      { text: 'Recusar: seu caminho é seu.', res: { text: 'O quadro hesita e some, sem alarde. Uma pequena sensação de ter perdido um atalho, e de ter ganhado clareza.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'missao_do_registro', title: 'Missão Diária do Registro', rarity: 'comum', cooldown: 12, weight: 3,
    cond: { tierMin: 1, tierMax: 8, flags: ['sistema'] },
    text: 'O quadro de luz pisca: "MISSÃO DO DIA: complete uma tarefa e receba recompensa. Falha: penalidade." Três opções brilham, uma de cada cor.',
    choices: [
      { text: 'Missão azul: meditar sem interrupção por um dia.', check: { stat: ['dao', 'esp'], dif: 1, tag: 'mente' }, ok: { text: '"MISSÃO CONCLUÍDA." Uma recompensa suave desce sobre você como chuva morna.', fx: { xp: 12, stats: { dao: 1 } } }, fail: { text: '"MISSÃO FALHOU." Uma pontada de dor percorre seus meridianos.', fx: { ferida: 1 } } },
      { text: 'Missão vermelha: derrotar uma fera espiritual.', check: { stat: ['fis', 'esp'], dif: 2, tag: 'combate' }, ok: { text: '"MISSÃO CONCLUÍDA." Um núcleo de fera aparece em sua mão.', fx: { item: ['nucleo_besta_baixo'], xp: 8, fama: 2 } }, fail: { text: '"MISSÃO FALHOU." A fera o machuca, e o quadro registra a falha com frieza.', fx: { ferida: 2 } } },
      { text: 'Missão verde: ajudar um desconhecido.', res: { text: '"MISSÃO CONCLUÍDA." Ajudar sem pedir nada rende pouco no quadro, mas muito em karma.', fx: { karma: 8, xp: 4, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'loja_do_registro', title: 'A Loja do Registro', rarity: 'comum', cooldown: 25, weight: 2,
    cond: { tierMin: 2, tierMax: 8, flags: ['sistema'], pedrasMin: 40 },
    text: 'Uma aba nova aparece no quadro: "LOJA DO REGISTRO". Preços em pedras espirituais, itens em miniatura que cintilam: pílulas, talismãs, fragmentos de método.',
    choices: [
      { text: 'Comprar uma pílula de Qi Densa (40 pedras).', custo: 40, res: { text: '"COMPRA EFETUADA." A pílula aparece na sua mão, ainda morna.', fx: { item: ['pilula_qi_media', 'pilula_qi_media'] } } },
      { text: 'Comprar um Talismã de Fuga (50 pedras).', custo: 50, res: { text: '"COMPRA EFETUADA." O talismã está quase vivo, de tão nítido.', fx: { item: ['talisma_fuga'] } } },
      { text: 'Fechar a loja e continuar.', res: { text: 'O quadro desliga, discreto, como um garçom educado.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'avaliacao_registro', title: 'A Avaliação do Registro', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 2, tierMax: 8, flags: ['sistema'] },
    text: '"AVALIAÇÃO PERIÓDICA", anuncia o quadro. "Atribuindo notas a: Corpo, Espírito, Compreensão, Sorte, Carisma, Coração do Dao." As notas parecem justas, o que é desconfortável.',
    choices: [
      { text: 'Aceitar as notas e corrigir os pontos fracos.', res: { text: 'Cada nota baixa vira um exercício diário. Meses depois, o quadro registra melhoria em todas as áreas.', fx: { stats: { fis: 1, esp: 1, comp: 1, car: 1 }, xp: 8 } } },
      { text: 'Contestar uma das notas.', check: { stat: ['car', 'comp'], dif: 3 }, ok: { text: 'O quadro hesita, atualiza o cálculo e concede um ponto extra. "ERRO INTERNO CORRIGIDO."', fx: { stats: { dao: 2, comp: 1 }, xp: 6 } }, fail: { text: '"RECLAMAÇÃO REGISTRADA." O quadro não discute, apenas anota.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'erro_do_registro', title: 'O Erro no Registro', rarity: 'raro', once: true,
    cond: { tierMin: 3, flags: ['sistema'] },
    text: 'O quadro pisca em vermelho: "ERRO. ERRO. REGISTRO INCONSISTENTE." Por um instante, você enxerga atrás da luz: milhares de nomes, listados em colunas, em uma biblioteca sem fim. O seu está marcado com uma pequena anotação em branco.',
    choices: [
      { text: 'Tentar ler a anotação.', check: { stat: ['comp', 'esp', 'dao'], dif: 5, tag: 'mente' }, ok: { text: 'Em letras minúsculas: "Alvo para revisão. Potencial acima do previsto." Algo em você sorri e se endurece ao mesmo tempo.', fx: { stats: { comp: 3, dao: 2 }, xp: 16 } }, fail: { text: 'A visão se fecha antes que você leia. Fica a sensação de que olhar demais tem preço.', fx: { ferida: 2, stats: { esp: -1 } } } },
      { text: 'Apagar a anotação.', check: { stat: ['esp', 'sor'], dif: 5 }, ok: { text: 'Uma linha de luz desaparece. Você sente o peso de ser, de repente, um pouco menos observado.', fx: { stats: { sor: 3 }, corr: 4, xp: 10 } }, fail: { text: 'O quadro reage com um choque. Você cai, tonto, com a visão cheia de fagulhas.', fx: { ferida: 3 } } },
    ],
  },
  {
    id: 'fim_do_registro', title: 'O Registro Cobra um Nome', rarity: 'lendario', once: true, weight: 4,
    cond: { tierMin: 5, flags: ['sistema'] },
    text: 'O quadro aparece uma última vez, sem cores: "O REGISTRO CELESTE CONCLUI SEU CICLO. PARA ENCERRAR, O USUÁRIO DEVE ESCREVER UM NOME NO ESPAÇO EM BRANCO. SEU OU DE OUTREM."',
    choices: [
      { text: 'Escrever o próprio nome e se tornar o novo Registro.', check: { stat: ['dao', 'comp', 'esp'], dif: 6, tag: 'mente' }, ok: { text: 'A luz o absorve. Por eras, você anota os nomes de quem busca o Dao, e responde, em silêncio, a quem pergunta.', fx: { fim: 'celeste' } }, fail: { text: 'O quadro hesita e se desfaz em pó. Você perdeu o acesso, mas ficou com o que aprendeu.', fx: { clearFlags: ['sistema'], stats: { dao: 3, comp: 2 } } } },
      { text: 'Escrever o nome de quem o feriu.', res: { text: 'O quadro registra e desaparece. Em algum lugar, alguém sente um frio no estômago. Você não saberá o que aconteceu.', fx: { clearFlags: ['sistema'], karma: -15, corr: 5 } } },
      { text: 'Escrever o nome de quem o ajudou.', res: { text: 'Uma luz quente atravessa o mundo. Em algum lugar, alguém sorri sem saber por quê.', fx: { clearFlags: ['sistema'], karma: 18, stats: { dao: 3 } } } },
    ],
  },

  /* ===== O Céu e o Destino ===== */
  {
    id: 'tribulacao_do_coracao', title: 'A Tribulação do Coração', rarity: 'raro', cooldown: 70,
    cond: { tierMin: 3, tierMax: 8 },
    text: 'O céu não se escurece, não troveja. Em vez disso, o silêncio sobe em seus ouvidos, e as lembranças vêm: cada erro, cada medo, cada promessa quebrada. Uma tribulação sem raios, feita só de você.',
    choices: [
      { text: 'Atravessar a tribulação de olhos abertos.', check: { stat: ['dao', 'esp'], dif: 4, tag: 'mente' }, ok: { text: 'Cada lembrança passa, e você a aceita. Ao fim, o silêncio vira calma. Sua alma, polida por dentro, está firme como jade.', fx: { stats: { dao: 4, esp: 1 }, xp: 18, corr: -12 } }, fail: { text: 'As lembranças vencem, por algumas horas. Você acorda chorando, mais frágil, e mais sincero.', fx: { stats: { dao: 1 }, ferida: 2, corr: 4 } } },
      { text: 'Fugir para dentro de um método de meditação rígido.', check: { stat: ['comp', 'dao'], dif: 3 }, ok: { text: 'Um ritmo quase mecânico o carrega pelo pior. Funciona, mas deixa uma cicatriz seca.', fx: { stats: { dao: 2 }, xp: 8 } }, fail: { text: 'O método falha no meio, e a tribulação vem inteira.', fx: { ferida: 3, corr: 6 } } },
    ],
  },
  {
    id: 'oficial_celeste', title: 'O Oficial da Corte Celeste', rarity: 'lendario', once: true, weight: 3,
    cond: { tierMin: 5, karmaMin: 10 },
    text: 'Entre nuvens, um funcionário de manto azul e óculos de cristal desce de uma plataforma de jade com uma prancheta. "Cultivador, consta no registro uma vaga na Secretaria de Tribulações. Salário modesto, benefícios eternos, muita papelada. Interessado?"',
    choices: [
      { text: 'Aceitar o posto na Corte Celeste.', check: { stat: ['car', 'comp', 'dao'], dif: 5 }, ok: { text: 'Por séculos, você carimba, arquiva e, às vezes, salva um cultivador desavisado com uma rasura discreta. O Céu, descobre-se, também precisa de gente de bom coração.', fx: { fim: 'celeste' } }, fail: { text: 'O funcionário folheia sua pasta e franze a testa. "Faltam três carimbos." Ele some entre as nuvens, com um pedido de desculpas.', fx: { stats: { car: 1, comp: 1 } } } },
      { text: 'Recusar educadamente.', res: { text: '"Natural", diz o funcionário, anotando algo na prancheta. "Ninguém diz sim de primeira."', fx: { stats: { dao: 2 }, fama: 6 } } },
    ],
  },
  {
    id: 'livro_vida_e_morte', title: 'O Livro da Vida e da Morte', rarity: 'lendario', once: true, weight: 3,
    cond: { tierMin: 4 },
    text: 'Numa câmara de uma corte celeste esquecida, um grande livro de capa preta está aberto sobre um pedestal. Cada página lista um nome e uma data. Há uma página com o seu nome, e sua data de morte ainda está em tinta fresca.',
    choices: [
      { text: 'Alterar a data para ganhar mais anos de vida.', check: { stat: ['esp', 'sor', 'dao'], dif: 5 }, ok: { text: 'Com um pincel, você escreve uma nova data. A tinta se acomoda, e uma sensação gelada desce por sua nuca: o Céu vai notar, algum dia.', fx: { vida: 80, karma: -16, corr: 4, stats: { sor: -1 } } }, fail: { text: 'O pincel queima em suas mãos. Você foge, com os dedos chamuscados, e a data permanece.', fx: { ferida: 3, karma: -4 } } },
      { text: 'Ler a data e fechar o livro, sem alterar nada.', res: { text: 'Agora você sabe quando. Estranhamente, isso torna cada dia mais cheio.', fx: { stats: { dao: 4 }, xp: 10 } } },
      { text: 'Apagar o nome de um inocente que morreria em breve.', check: { stat: ['esp', 'car'], dif: 4 }, ok: { text: 'Um nome desaparece do livro, e em algum lugar uma criança vive o que não viveria. O Céu pode cobrar; a consciência não.', fx: { karma: 20, stats: { dao: 2 } } }, fail: { text: 'O pincel o recusa. Você sai da câmara sem sorte, mas sem culpa.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'fio_do_destino', title: 'O Fio Vermelho do Destino', rarity: 'raro', once: true,
    cond: { tierMin: 3, stat: { sor: 18 } },
    text: 'Em um sonho límpido, você enxerga um fio vermelho que sai do seu dedo e se estende ao horizonte, ligando-o a coisas e pessoas ainda por vir. Você pode puxá-lo, cortá-lo ou segui-lo.',
    choices: [
      { text: 'Seguir o fio até onde ele leva.', check: { stat: ['sor', 'dao'], dif: 4 }, ok: { text: 'Semanas de caminhada levam você a uma cabana. Dentro, um velho tecelão lhe entrega um fio dourado e diz: "Não perca."', fx: { item: ['fio_destino_vermelho'], stats: { sor: 2, dao: 1 }, xp: 10 } }, fail: { text: 'O fio some numa neblina. Você volta com o coração cheio de uma saudade sem nome.', fx: { stats: { dao: 1 } } } },
      { text: 'Cortar o fio, para ser dono do próprio destino.', check: { stat: ['dao', 'esp'], dif: 5 }, ok: { text: 'O fio se desfaz em fagulhas. Você sente o mundo ficar mais silencioso e mais seu.', fx: { stats: { dao: 4, sor: -1 }, xp: 14 } }, fail: { text: 'O fio resiste, depois se reconecta, mais forte. O destino, às vezes, é teimoso.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'sorte_do_ceu', title: 'O Dia em Que o Céu Sorriu', rarity: 'lendario', once: true,
    cond: { tierMin: 3, stat: { sor: 20 }, karmaMin: 10 },
    text: 'Acordando de manhã, você nota algo estranho: tudo dá certo. A água ferve no tempo certo, a folha cai no lugar exato, um comerciante lhe dá um desconto sem pedir. É como se o próprio Céu estivesse de bom humor.',
    choices: [
      { text: 'Aproveitar o dia para cultivar e se arriscar.', check: { stat: ['sor', 'dao'], dif: 3 }, ok: { text: 'Cada risco se resolve com perfeição. À noite, você tem pedras, ervas e um avanço enorme no cultivo.', fx: { xp: 40, pedras: 200, item: ['pilula_passagem_5'], stats: { sor: 2, dao: 2 } } }, fail: { text: 'Por mais que seja um dia de sorte, ainda é um dia comum. Você faz o que consegue.', fx: { xp: 14, pedras: 40 } } },
      { text: 'Passar o dia em silêncio, agradecendo.', res: { text: 'Em sua gratidão simples, algo se abre e recebe você de volta, de braços abertos.', fx: { karma: 15, vida: 30, stats: { dao: 3 } } } },
    ],
  },
  {
    id: 'raio_roxo', title: 'O Raio Roxo', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, tierMax: 8, local: ['montanha', 'ruinas'] },
    text: 'No topo de uma montanha, um raio roxo, raro como cometa, cai a poucos passos de você. Ele não queima: ele vibra, como um tambor lento, chamando seu nome.',
    choices: [
      { text: 'Absorver o raio roxo no corpo.', check: { stat: ['fis', 'esp', 'dao'], dif: 5 }, ok: { text: 'Cada nervo acende em ametista. O corpo é reescrito, osso por osso. Você sai da montanha como outra pessoa, mais afiada e mais calma.', fx: { xp: 40, stats: { fis: 3, esp: 3, dao: 1 }, ferida: 2 } }, fail: { text: 'O raio o joga encosta abaixo. Você acorda dias depois, com cabelos arrepiados e uma lembrança vibrante.', fx: { ferida: 4, xp: 10, stats: { esp: 1 } } } },
      { text: 'Estudar o raio à distância, sem tocá-lo.', res: { text: 'Cada pulso conta uma história de uma tribulação distante. Você anota o que consegue.', fx: { xp: 12, stats: { comp: 2 } } } },
    ],
  },
  {
    id: 'olhar_do_ceu', title: 'O Olhar do Céu Sobre Você', rarity: 'comum', cooldown: 60,
    cond: { tierMin: 3, tierMax: 8 },
    text: 'Numa noite quieta, você sente o olhar do Céu sobre si, como quem sente um olhar de longe. Não é um julgamento: é uma pergunta, feita sem palavras.',
    choices: [
      { text: 'Responder em silêncio, mostrando as mãos limpas.', cond: { karmaMin: 0 }, res: { text: 'O olhar se afasta, discreto, e deixa uma sensação de leveza.', fx: { karma: 6, stats: { dao: 1 }, xp: 8 } } },
      { text: 'Encarar o céu em desafio.', check: { stat: ['dao', 'esp'], dif: 3, tag: 'mente' }, ok: { text: 'O olhar hesita e recua, respeitoso. Você sente a firmeza do seu Coração do Dao reforçada.', fx: { stats: { dao: 2 }, xp: 10 } }, fail: { text: 'O olhar pesa como uma montanha. Você cai de joelhos, humilhado, mas inteiro.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Fingir que não percebe.', res: { text: 'Mas o olhar ainda está lá, por mais algumas noites.', fx: { stats: { sor: -1 } } } },
    ],
  },
];
