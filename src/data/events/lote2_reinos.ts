import type { GameEvent } from '../../types';

/**
 * Lote 2 — Reinos secretos, ruínas e bestas míticas (inspiradas no Clássico das Montanhas e Mares).
 * Convenções: reinos que abrem por poucos dias, guardiões, provas de herança, tesouros com prazo.
 */
export const lote2Reinos: GameEvent[] = [
  /* ===== Arco: o Reino da Névoa Dourada ===== */
  {
    id: 'rumor_reino_nevoa', title: 'O Rumor da Névoa Dourada', rarity: 'raro', once: true, weight: 2,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'Nas estalagens, só se fala disso: a cada cem anos, uma névoa dourada desce sobre um vale e revela um reino que ninguém vê no resto do tempo. A porta dura sete dias, e nenhuma seita quer ficar de fora.',
    choices: [
      { text: 'Pagar por informações detalhadas (20 pedras).', custo: 20, res: { text: 'Um velho cartógrafo desenha a rota e lhe vende um selo de passagem. "Sete dias, não esqueça. Quem demora, fica."', fx: { item: ['selo_do_guardiao'], setFlags: ['reino_nevoa_rota'], agenda: [{ event: 'reino_nevoa_entrada', em: [1, 3] }] } } },
      { text: 'Seguir a multidão de cultivadores e improvisar.', res: { text: 'A estrada vira procissão. Todos rumam para o mesmo vale, desconfiados uns dos outros.', fx: { setFlags: ['reino_nevoa_rota'], agenda: [{ event: 'reino_nevoa_entrada', em: [1, 3] }] } } },
      { text: 'Deixar para lá. Reinos secretos têm cemitérios próprios.', res: { text: 'A prudência de quem já viu muita gente voltar de lá em caixões.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'reino_nevoa_entrada', title: 'A Porta Dourada', rarity: 'raro', once: true,
    cond: { flags: ['reino_nevoa_rota'] },
    text: 'No vale, a névoa se abre como um portão de seda. Centenas de cultivadores se amontoam. Do outro lado, ninguém entra acima do Núcleo: o reino suprime quem passa do limite. As regras são claras, e os olhares, hostis.',
    choices: [
      { text: 'Entrar em silêncio, evitando as multidões.', check: { stat: ['sor', 'esp'], dif: 1, tag: 'fuga' }, ok: { text: 'Você atravessa por uma fresta do portão, sem tropeços. Dentro, o ar tem cheiro de mel e cobre.', fx: { setFlags: ['reino_nevoa_dentro'], agenda: [{ event: 'reino_nevoa_guardiao', em: [0, 0] }] } }, fail: { text: 'Você é empurrado, pisoteado e derrubado na entrada. Entra mal, mas entra.', fx: { ferida: 1, setFlags: ['reino_nevoa_dentro'], agenda: [{ event: 'reino_nevoa_guardiao', em: [0, 0] }] } } },
      { text: 'Aliar-se a um grupo de cultivadores.', check: { stat: 'car', dif: 1 }, ok: { text: 'Cinco desconhecidos juram ajuda mútua por sete dias. Uma aliança frágil, mas útil.', fx: { setFlags: ['reino_nevoa_dentro', 'reino_nevoa_aliados'], agenda: [{ event: 'reino_nevoa_guardiao', em: [0, 0] }] } }, fail: { text: 'Ninguém confia em você. Você entra sozinho, e mais desconfiado.', fx: { setFlags: ['reino_nevoa_dentro'], agenda: [{ event: 'reino_nevoa_guardiao', em: [0, 0] }] } } },
      { text: 'Forçar a passagem pela porta, aos empurrões.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Três cultivadores rolam pela lama. Você passa na frente, com respeito e inimigos.', fx: { fama: 3, karma: -2, setFlags: ['reino_nevoa_dentro'], agenda: [{ event: 'reino_nevoa_guardiao', em: [0, 0] }] } }, fail: { text: 'Você é repelido e atinge um tronco. Passa depois, machucado e furioso.', fx: { ferida: 2, setFlags: ['reino_nevoa_dentro'], agenda: [{ event: 'reino_nevoa_guardiao', em: [0, 0] }] } } },
    ],
  },
  {
    id: 'reino_nevoa_guardiao', title: 'O Guardião de Olhos Dourados', rarity: 'raro', once: true,
    cond: { flags: ['reino_nevoa_dentro'] },
    text: 'No primeiro vale, uma fera de corpo de leão e olhos dourados senta-se sobre uma pedra, observando. Fala sem mover a boca: "Cada passante tem direito a uma pergunta. Mas eu só respondo a quem responde a mim primeiro. O que pesa mais: o que se sabe ou o que se faz?"',
    choices: [
      { text: '"O que se faz. Saber sem fazer é pó."', check: { stat: ['dao', 'comp'], dif: 2, tag: 'mente' }, ok: { text: 'O guardião ri: um riso estrondoso. "Resposta de quem viveu." Ele se afasta e deixa o caminho livre.', fx: { setFlags: ['guardiao_ouvido'], stats: { dao: 2 }, xp: 6, agenda: [{ event: 'reino_nevoa_heranca', em: [0, 0] }] } }, fail: { text: 'O guardião estala a língua. "Sinceridade demais." Ele o deixa passar com um aviso: "Não confie em tudo o que sabe."', fx: { setFlags: ['guardiao_ouvido'], agenda: [{ event: 'reino_nevoa_heranca', em: [0, 0] }] } } },
      { text: '"O que se sabe. A ação sem saber é cega."', check: { stat: ['comp', 'esp'], dif: 2, tag: 'mente' }, ok: { text: '"Também verdade." O guardião sorri de lado. "Ao menos você pensa antes de agir."', fx: { setFlags: ['guardiao_ouvido'], stats: { comp: 2 }, xp: 6, agenda: [{ event: 'reino_nevoa_heranca', em: [0, 0] }] } }, fail: { text: 'O guardião não se impressiona. Você passa ainda assim, constrangido.', fx: { setFlags: ['guardiao_ouvido'], agenda: [{ event: 'reino_nevoa_heranca', em: [0, 0] }] } } },
      { text: 'Atacar o guardião.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'Um duelo surpreendente. O guardião, impressionado, ri com a boca cheia de sangue dourado e deixa você passar.', fx: { setFlags: ['guardiao_ouvido'], fama: 8, xp: 10, ferida: 1, agenda: [{ event: 'reino_nevoa_heranca', em: [0, 0] }] } }, fail: { text: 'O guardião o lança para fora do vale com uma patada. Você perde dois dos sete dias para voltar.', fx: { ferida: 3, setFlags: ['guardiao_ouvido'], agenda: [{ event: 'reino_nevoa_heranca', em: [1, 1] }] } } },
    ],
  },
  {
    id: 'reino_nevoa_heranca', title: 'O Salão da Herança', rarity: 'raro', once: true,
    cond: { flags: ['guardiao_ouvido'] },
    text: 'No coração do reino há um salão de pedra clara. No centro, quatro presentes brilham: um pergaminho, uma lanterna, uma semente e um trono vazio. Uma voz diz: "Um só, filho do tempo."',
    choices: [
      { text: 'O pergaminho: um método de caminhar entre névoas.', res: { text: 'As palavras se imprimem na sua pele em luz. Você aprende o Passo da Névoa.', fx: { stats: { dao: 1 }, xp: 10, setFlags: ['saiu_com_heranca'] } } },
      { text: 'A lanterna: um tesouro de sopro de dragão.', res: { text: 'A lanterna acende sozinha, em dourado. Dentro, uma chama antiga o reconhece.', fx: { item: ['lanterna_dragao'], xp: 10, setFlags: ['saiu_com_heranca'] } } },
      { text: 'A semente: um fruto do jardim dos imortais.', res: { text: 'A semente pulsa. Você a engole inteira e sente o tempo desacelerar nos ossos.', fx: { vida: 30, xp: 20, setFlags: ['saiu_com_heranca'] } } },
      { text: 'O trono: tornar-se o novo Guardião do reino.', check: { stat: ['dao', 'car'], dif: 4 }, ok: { text: 'O trono aceita você. A névoa dourada o envolve, e a porta do reino se fecha. Você nunca mais sairá, e seu nome virará lenda sussurrada.', fx: { fim: 'guardiao' } }, fail: { text: 'O trono rejeita você, devolvendo-o ao vale com uma sacudida. Pelo menos você ainda tem a vida.', fx: { ferida: 2, stats: { dao: 1 }, setFlags: ['saiu_com_heranca'] } } },
    ],
  },

  /* ===== Ruínas ===== */
  {
    id: 'tumba_do_general', title: 'A Tumba do General', rarity: 'raro', cooldown: 40,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'Sob um monte de terra, uma tumba antiga: soldados de barro alinhados, uma armadura enorme e o ar frio de quem não dorme. A inscrição diz: "Quem acordar o general carrega seu fardo."',
    choices: [
      { text: 'Tomar a lança do general.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Os soldados de barro se movem, mas o general apenas observa. A lança é sua, e o fardo também: uma dívida de honra que você nunca entendeu direito.', fx: { item: ['espada_aprendiz'], xp: 10, fama: 4, karma: -2, stats: { fis: 1 } } }, fail: { text: 'Os soldados despertam. Você escapa por pouco, sem lança e com hematomas.', fx: { ferida: 3, xp: 3 } } },
      { text: 'Prestar homenagem aos mortos e partir.', res: { text: 'Uma pausa respeitosa. O ar parece mais quente quando você sai.', fx: { karma: 6, stats: { dao: 2 } } } },
      { text: 'Estudar a formação que mantém os soldados de pé.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'formacao' }, ok: { text: 'Cada soldado é um nó em uma teia. Você desenha tudo e sai com uma lição preciosa.', fx: { xp: 14, stats: { comp: 2 } } }, fail: { text: 'A formação se rearranja. Você foge com anotações incompletas.', fx: { xp: 4, ferida: 1 } } },
    ],
  },
  {
    id: 'cidade_afundada', title: 'A Cidade Afundada', rarity: 'raro', cooldown: 50,
    cond: { tierMin: 3, tierMax: 7 },
    text: 'No leito seco de um lago, torres emergem da lama como dentes. Dizem que uma cidade inteira afundou numa só noite, junto com seus tesouros e feitiços.',
    choices: [
      { text: 'Vasculhar o palácio central.', check: { stat: ['comp', 'esp', 'sor'], dif: 3 }, ok: { text: 'Você encontra o cofre real, intacto, e leva o que consegue carregar.', fx: { pedras: 140, item: ['pilula_passagem_4'], xp: 8, fama: 4 } }, fail: { text: 'O piso cede e uma armadilha de água quase o afoga.', fx: { ferida: 3, xp: 3 } } },
      { text: 'Procurar a biblioteca da cidade.', check: { stat: 'comp', dif: 3 }, ok: { text: 'Pergaminhos selados em jade resistiram ao lodo. Você copia o que pode.', fx: { xp: 16, stats: { comp: 2 }, item: ['manual_estrelas'] } }, fail: { text: 'O papel desfaz-se ao toque. Só restam fragmentos.', fx: { xp: 5 } } },
    ],
  },
  {
    id: 'altar_do_sol', title: 'O Altar do Sol Quebrado', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 2, tierMax: 6, local: ['montanha', 'ruinas', 'selva'] },
    text: 'Num pico açoitado pelo vento, um altar de pedra partido ao meio ainda guarda um disco de bronze polido. Ao meio-dia, ele reflete o sol com uma intensidade estranha.',
    choices: [
      { text: 'Meditar sob a luz refletida.', check: { stat: ['esp', 'dao'], dif: 2, tag: 'qi' }, ok: { text: 'O Qi solar entra em você como uma lança calorosa. Você sai radiante.', fx: { xp: 18, stats: { esp: 1 } } }, fail: { text: 'A luz é intensa demais. Seus olhos ardem por dias, mas o aprendizado fica.', fx: { xp: 6, ferida: 1 } } },
      { text: 'Tentar restaurar o altar.', check: { stat: 'comp', dif: 3, tag: 'formacao' }, ok: { text: 'As peças se encaixam. O altar brilha, e uma bênção solar o toca.', fx: { xp: 12, stats: { comp: 1, dao: 1 }, karma: 4 } }, fail: { text: 'As peças não encaixam. Mas você aprendeu algo sobre a forma do altar.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'biblioteca_enterrada', title: 'A Biblioteca Enterrada', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 3, tierMax: 7 },
    text: 'Uma nascente seca revela uma escada que desce para a escuridão. No fundo, estantes de pedra alinham rolos de bambu intactos, cercados por traças que brilham como estrelas.',
    choices: [
      { text: 'Ler por semanas, até a luz das traças apagar.', check: { stat: ['comp', 'dao'], dif: 3, tag: 'mente' }, ok: { text: 'Você sai com a cabeça cheia de uma civilização esquecida. Um novo método de cultivo se forma.', fx: { anos: 1, xp: 26, stats: { comp: 3 } } }, fail: { text: 'As traças guiam mal. Os rolos se esfarelam, e você aprende só o que sobra.', fx: { anos: 1, xp: 8, stats: { comp: 1 } } } },
      { text: 'Copiar rapidamente o que puder e sair.', res: { text: 'Você leva uma pilha de rolos e algumas lições esparsas.', fx: { xp: 10, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'forja_abandonada', title: 'A Forja Abandonada dos Anões de Pedra', rarity: 'raro', cooldown: 50,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'Numa montanha oca, uma forja gigantesca ainda conserva brasas. Enigmas gravados em martelos e tenazes guardam o segredo de metais que cantam sob golpes.',
    choices: [
      { text: 'Tentar forjar algo com as brasas antigas.', check: { stat: ['fis', 'comp'], dif: 3 }, ok: { text: 'O metal cede como manteiga sob seu martelo. Você sai com um escudo que parece cantar.', fx: { item: ['escudo_tartaruga', 'espelho_bronze'], xp: 8, stats: { fis: 1 } } }, fail: { text: 'Uma fagulha explosiva queima seu braço. A forja guarda seu segredo.', fx: { ferida: 2, xp: 3 } } },
      { text: 'Estudar as inscrições nos martelos.', check: { stat: 'comp', dif: 2 }, ok: { text: 'Um método de percepção metálica se revela. Seus golpes ganham ritmo.', fx: { xp: 10, stats: { comp: 1, fis: 1 } } }, fail: { text: 'Os enigmas são impenetráveis. Mas você os copia para tentar de novo.', fx: { xp: 3 } } },
    ],
  },
  {
    id: 'jardim_do_imortal', title: 'O Jardim do Imortal Esquecido', rarity: 'lendario', once: true,
    cond: { tierMin: 3 },
    text: 'Por trás de uma cachoeira, um jardim murado resiste ao tempo: pessegueiros em flor num outono inteiro, lagos de água quase líquida de luz. O imortal que o plantou já se foi, mas o jardim ainda o espera.',
    choices: [
      { text: 'Colher os pêssegos dourados.', check: { stat: ['esp', 'dao'], dif: 4 }, ok: { text: 'Os pêssegos têm gosto de infância. Cada mordida acrescenta anos à sua vida e clareza à sua alma.', fx: { vida: 60, xp: 30, stats: { esp: 2, dao: 2 }, item: ['semente_jardim'] } }, fail: { text: 'As árvores se fecham ao seu toque. O jardim não aceita quem tem pressa.', fx: { ferida: 2, stats: { dao: 1 } } } },
      { text: 'Ficar uma estação no jardim, cuidando das árvores.', res: { text: 'Uma estação de rega e poda. O jardim retribui com um fruto, e uma conversa em sonho com o imortal.', fx: { anos: 1, vida: 25, karma: 10, xp: 18, stats: { dao: 3 } } } },
    ],
  },

  /* ===== Bestas e seres míticos ===== */
  {
    id: 'raposa_nove_caudas', title: 'A Raposa de Nove Caudas', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7, local: ['selva', 'montanha'] },
    text: 'Uma raposa de pelo cor de brasa e nove caudas ondulantes o segue por três dias. Seu choro é como o de um bebê. Dizem que sua carne cura todo veneno, mas dizem também que ela engana quem confia.',
    choices: [
      { text: 'Oferecer comida e conversar.', check: { stat: ['car', 'esp'], dif: 3, tag: 'besta' }, ok: { text: 'A raposa se transforma numa figura de véus, ri e entrega um amuleto. "Raros são os que oferecem antes de tomar."', fx: { item: ['amuleto_nove_caudas'], karma: 6, stats: { car: 1, esp: 1 } } }, fail: { text: 'A raposa foge, ofendida, deixando apenas um fio de pelo no chão. A conversa foi curta.', fx: { stats: { esp: 1 } } } },
      { text: 'Tentar capturá-la.', check: { stat: ['fis', 'esp'], dif: 4, tag: 'combate' }, ok: { text: 'Você a prende, e ela chora de verdade. O amuleto que lhe oferece como resgate pesa na consciência.', fx: { item: ['amuleto_nove_caudas'], karma: -10, corr: 4 } }, fail: { text: 'A raposa se desfaz em fumaça. Você acorda dias depois, perdido numa floresta que não reconhece.', fx: { ferida: 2, anos: 1 } } },
      { text: 'Ignorar e seguir viagem.', res: { text: 'Ela o segue por mais um dia, depois some. Nada acontece. Ainda assim, você olha para trás.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'bai_ze_conselho', title: 'O Conselho de Bai Ze', rarity: 'lendario', once: true,
    cond: { tierMin: 3, tierMax: 8 },
    text: 'Numa margem de mar, uma fera de pelagem branca, cabeças múltiplas e olhos por todo o corpo fala em língua de gente: "Conheço o nome de todos os espíritos e de todos os males. Pergunte, mas apenas uma vez."',
    choices: [
      { text: 'Perguntar: "Qual é o maior perigo da minha jornada?"', res: { text: 'Bai Ze enumera ameaças com precisão cruel. Você sai com uma lista de males a evitar, e a cabeça girando.', fx: { stats: { sor: 3, comp: 2 }, xp: 14 } } },
      { text: 'Perguntar: "Como posso superar meu gargalo?"', res: { text: 'A fera responde em três frases de pedra. Cada uma desmonta uma crença sua. Quando você parte, a barra do cultivo parece mais leve.', fx: { xp: 40, stats: { dao: 2 } } } },
      { text: 'Perguntar: "Qual é o segredo do Dao?"', check: { stat: ['dao', 'comp'], dif: 6, tag: 'mente' }, ok: { text: 'Bai Ze ri baixo. "Você já sabe. Apenas ainda não acredita." Em seu peito, algo se acende.', fx: {  xp: 30, stats: { dao: 4, comp: 2 } } }, fail: { text: 'A fera o encara por muito tempo. "Ainda não." Ela some entre as ondas.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'qilin_passa', title: 'A Passagem do Qilin', rarity: 'lendario', once: true,
    cond: { tierMin: 2, karmaMin: 20 },
    text: 'Numa manhã de paz inexplicável, uma fera de corpo de cervo e cabeça de dragão atravessa a estrada, sem tocar o chão. Camponeses se ajoelham. Dizem que o Qilin só aparece onde nasce um sábio ou onde há bondade de sobra.',
    choices: [
      { text: 'Ajoelhar-se e agradecer em silêncio.', res: { text: 'O Qilin se detém, olha para você e deixa cair uma escama dourada. "Que o seu caminho seja leve."', fx: { item: ['escama_qilin'], karma: 8, stats: { dao: 2, sor: 1 }, fama: 6 } } },
      { text: 'Pedir uma bênção.', check: { stat: ['dao', 'car'], dif: 3 }, ok: { text: 'O Qilin toca sua testa com o focinho. Uma luz suave o envolve, e anos de vida se somam em silêncio.', fx: { vida: 40, stats: { dao: 2, sor: 2 } } }, fail: { text: 'O Qilin desvia o olhar. Um sinal de que você pediu demais.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'jingwei_no_mar', title: 'A Ave que Enche o Mar', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 7, local: ['selva', 'montanha', 'cidade'] },
    text: 'Numa praia, uma ave minúscula leva uma pedrinha no bico do cume da montanha até o mar, e a deixa cair. Voa de volta. Repete. Um pescador explica: "Dizem que ela quer encher o oceano, que matou sua dona. Está nisso há mil anos."',
    choices: [
      { text: 'Observar a ave por um dia inteiro, em silêncio.', res: { text: 'Ao fim do dia, você entende: não se trata de encher o mar, mas de nunca parar. O método fica gravado.', fx: { stats: { dao: 3 }, xp: 10 } } },
      { text: 'Ajudar a ave carregando pedras por uma semana.', res: { text: 'Costas doloridas, mãos cortadas. A ave pousa em seu ombro ao fim da semana, e você sente um laço antigo e simples.', fx: { stats: { fis: 1, dao: 2 }, karma: 6, ferida: 1 } } },
      { text: 'Rir da tolice e seguir.', res: { text: 'A ave não se importa. O mar continua cheio, e você continua rindo.', fx: { stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'zhulong_olhos', title: 'O Dragão que Acende o Dia', rarity: 'lendario', once: true,
    cond: { tierMin: 5 },
    text: 'No extremo noroeste, onde nunca há sol, uma serpente imensa de rosto humano e pele escarlate dorme enrolada em torno de uma montanha. Quando ela abre os olhos, amanhece. Quando os fecha, a noite cai.',
    choices: [
      { text: 'Esperar em silêncio que ele abra os olhos.', check: { stat: ['dao', 'esp'], dif: 6 }, ok: { text: 'Um dia inteiro de luz cai sobre você. Um olho do dragão o observa por um instante. Uma lanterna de luz nasce na sua mão.', fx: { item: ['lanterna_dragao'], xp: 40, stats: { esp: 3, dao: 3 }, fama: 12 } }, fail: { text: 'A escuridão perpétua devora sua noção de tempo. Você volta após muitos anos, com cabelos brancos e métodos obscuros.', fx: { anos: 5, xp: 15, stats: { dao: 2 } } } },
      { text: 'Tentar roubar uma escama.', check: { stat: ['fis', 'esp', 'sor'], dif: 7, tag: 'fuga' }, ok: { text: 'Um brilho nas mãos, um rugido distante. Você foge, com uma escama quente como brasa.', fx: { item: ['nucleo_besta_alto'], pedras: 300, karma: -12, ferida: 2 } }, fail: { text: 'Os olhos do dragão se abrem. A luz o cega por meses. Você sobrevive, mas a lição é cruel.', fx: { ferida: 4, anos: 1 } } },
    ],
  },
  {
    id: 'nove_picos', title: 'A Montanha dos Nove Picos', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, tierMax: 8 },
    text: 'Nove picos, cada um coberto por uma estação diferente: neve no primeiro, flores no segundo, chuva no terceiro, e assim por diante. Cada um guarda um desafio, e quem completar os nove ganha uma bênção do céu.',
    choices: [
      { text: 'Tentar escalar os nove picos.', check: { stat: ['fis', 'esp', 'dao'], dif: 5 }, ok: { text: 'Dias, anos, talvez. Quando você chega ao nono, o céu abre um sorriso de nuvens. Sua alma se fortalece.', fx: { anos: 3, xp: 38, stats: { fis: 2, esp: 2, dao: 2 }, fama: 10 } }, fail: { text: 'Você cai no sexto pico, mas aprende uma lição sobre humildade.', fx: { anos: 1, ferida: 3, xp: 10, stats: { dao: 1 } } } },
      { text: 'Escalar só o primeiro e o último.', check: { stat: ['fis', 'dao'], dif: 3 }, ok: { text: 'A neve e o fogo ensinam em extremos. Você volta mais leve e mais firme.', fx: { xp: 18, stats: { fis: 1, dao: 1 } } }, fail: { text: 'O primeiro pico o cansa mais do que esperava.', fx: { ferida: 1, xp: 5 } } },
    ],
  },
  {
    id: 'cervo_celeste', title: 'O Cervo de Chifres de Luar', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 2, tierMax: 7, local: ['selva', 'montanha'] },
    text: 'Na clareira, um cervo de chifres feitos de luar bebe de uma poça. Ele levanta a cabeça ao notar você, sem medo. Seus olhos são calmos.',
    choices: [
      { text: 'Aproximar-se devagar e estender a mão.', check: { stat: ['esp', 'dao'], dif: 2, tag: 'besta' }, ok: { text: 'O cervo encosta o focinho na sua palma. Um calor suave atravessa seu corpo. Ele some entre as árvores, deixando um chifre pequeno.', fx: { stats: { esp: 1, dao: 1 }, ferida: -2, xp: 8 } }, fail: { text: 'O cervo foge em silêncio. A clareira parece vazia demais.', fx: { stats: { dao: 1 } } } },
      { text: 'Observar de longe e partir.', res: { text: 'A visão é uma lembrança que o aquece nas noites frias.', fx: { karma: 2 } } },
    ],
  },

  /* ===== Provas de herança ===== */
  {
    id: 'prova_do_espelho', title: 'A Prova do Espelho', rarity: 'raro', cooldown: 50,
    cond: { tierMin: 2, tierMax: 7 },
    text: 'Num salão sem teto, um espelho de bronze ocupa a parede. Quem se olha nele vê o seu eu mais profundo: o que deseja, o que teme e o que esconde. Ninguém sai igual.',
    choices: [
      { text: 'Encarar o espelho sem desviar o olhar.', check: { stat: 'dao', dif: 3, tag: 'mente' }, ok: { text: 'Você vê todas as suas faces: a covarde, a vaidosa, a gentil. Todas são suas. O espelho se aquieta.', fx: { stats: { dao: 3 }, xp: 16, corr: -8, item: ['espelho_bronze'] } }, fail: { text: 'Uma face sombria sorri de volta. Você foge, ofegante, levando um pedaço dela.', fx: { corr: 8, ferida: 1, stats: { dao: 1 } } } },
      { text: 'Quebrar o espelho.', check: { stat: ['fis', 'dao'], dif: 3 }, ok: { text: 'Cacos de bronze voam. Atrás do espelho, uma câmara oculta guarda uma pílula antiga.', fx: { item: ['pilula_qi_maior'], karma: -2 } }, fail: { text: 'Cacos cortam seus braços. O espelho não gosta de ser desafiado.', fx: { ferida: 2 } } },
      { text: 'Virar o rosto e sair.', res: { text: 'Há perguntas que cada um responde em seu tempo.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'prova_do_peso', title: 'A Prova do Peso do Mundo', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 2, tierMax: 7 },
    text: 'Numa câmara de pedra, o chão pesa mais a cada passo. Gravuras na parede contam: "Quem atravessar sem ajoelhar leva consigo o peso do mundo e a força para carregá-lo."',
    choices: [
      { text: 'Atravessar a câmara a pé.', check: { stat: ['fis', 'dao'], dif: 4, tag: 'corpo' }, ok: { text: 'Cada passo é uma batalha. No fim, o peso se dissolve, e seus ossos zumbem de força nova.', fx: { stats: { fis: 3, dao: 2 }, xp: 14 } }, fail: { text: 'Você se ajoelha no meio do caminho e é expulso pela formação, com ossos doloridos.', fx: { ferida: 3, stats: { fis: 1 } } } },
      { text: 'Usar o Qi para aliviar o peso.', check: { stat: ['esp', 'comp'], dif: 3 }, ok: { text: 'Você descobre um método de redistribuição. Passa sem esforço, mas sem a mesma lição.', fx: { xp: 10, stats: { esp: 1, comp: 1 } } }, fail: { text: 'A formação detecta o truque e redobra o peso.', fx: { ferida: 2 } } },
    ],
  },
  {
    id: 'prova_tres_caminhos', title: 'A Prova das Três Portas', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 3, tierMax: 8 },
    text: 'Três portas: uma de pedra, uma de madeira, uma de névoa. Uma inscrição avisa: "Duas levam à morte; uma, à herança. A verdadeira é a que ninguém escolheria."',
    choices: [
      { text: 'Escolher a porta de névoa.', check: { stat: ['comp', 'sor'], dif: 3 }, ok: { text: 'A névoa se dissolve num salão luminoso. Você leva uma pílula antiga e uma lição sobre o óbvio.', fx: { item: ['pilula_passagem_4'], xp: 14, stats: { comp: 1 } } }, fail: { text: 'A névoa é só névoa. Você tropeça por horas e sai com as mãos vazias.', fx: { xp: 3 } } },
      { text: 'Escolher a porta de pedra.', check: { stat: ['dao', 'sor'], dif: 3 }, ok: { text: 'A porta se abre para uma câmara de memórias. Você aprende algo sobre quem já esteve ali.', fx: { xp: 12, stats: { dao: 2 } } }, fail: { text: 'A porta se fecha atrás de você. Você precisa quebrar o mecanismo para sair.', fx: { ferida: 2 } } },
      { text: 'Escolher a porta de madeira.', check: { stat: ['esp', 'sor'], dif: 3 }, ok: { text: 'A madeira cheira a resina antiga. No fim, um velho espírito sorri e o abençoa.', fx: { xp: 12, stats: { esp: 2 }, karma: 3 } }, fail: { text: 'Uma armadilha de espinhos dispara. Você foge cambaleando.', fx: { ferida: 2 } } },
    ],
  },
  {
    id: 'prova_do_silencio', title: 'A Prova do Silêncio', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 2, tierMax: 7 },
    text: 'Um vale onde nenhum som pode existir. Quem fala, quem respira alto, quem pisa forte, desperta os guardiões de gelo. Atravessar leva três dias.',
    choices: [
      { text: 'Atravessar em silêncio absoluto.', check: { stat: ['dao', 'esp'], dif: 3, tag: 'mente' }, ok: { text: 'Três dias de uma quietude que parece infinita. Do outro lado, você sente o mundo mais claro que antes.', fx: { xp: 18, stats: { dao: 2, esp: 1 }, anos: 1 } }, fail: { text: 'Um espirro fatal desperta os guardiões. Você corre, com gelo nos pés.', fx: { ferida: 3, xp: 3 } } },
      { text: 'Contornar o vale por outro caminho.', res: { text: 'A volta custa semanas. Mas a pressa é inimiga do Dao.', fx: { anos: 1, stats: { dao: 1 } } } },
    ],
  },

  /* ===== Rivais e disputas ===== */
  {
    id: 'rival_na_ruina', title: 'Quando {rival} Chega Primeiro', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7, flags: ['enfrentou_rival'] },
    text: 'Numa ruína recém-descoberta, você encontra pegadas frescas e um bilhete sarcástico: "Cheguei primeiro. Sempre chego. Atenciosamente, {rival}." Atrás da porta da câmara central, há alguém.',
    choices: [
      { text: 'Entrar de cabeça e disputar o tesouro.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Uma luta rápida e feia. Quando acaba, o tesouro é seu e {rival} foge, jurando vingança.', fx: { item: ['pilula_passagem_3'], fama: 8, karma: -3, stats: { dao: 1 }, xp: 8 } }, fail: { text: '{rival} o deixa para trás, humilhado e sem tesouro.', fx: { ferida: 2, fama: -4 } } },
      { text: 'Propor dividir o tesouro.', check: { stat: 'car', dif: 2 }, ok: { text: '{rival} hesita, pesa os riscos e aceita. Uma paz tensa nasce entre vocês.', fx: { pedras: 60, karma: 4, stats: { car: 1 }, setFlags: ['paz_com_rival'] } }, fail: { text: '{rival} ri: "Nunca." A porta se fecha na sua cara.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'corrida_do_reino', title: 'A Corrida Contra o Tempo', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 3, tierMax: 7 },
    text: 'Faltam duas horas para o reino secreto se fechar. Você está no ponto mais profundo, com um tesouro à frente e a saída bem atrás. Se ficar, pode ficar preso por um século.',
    choices: [
      { text: 'Pegar o tesouro e correr.', check: { stat: ['fis', 'sor'], dif: 4, tag: 'fuga' }, ok: { text: 'Você cruza o portal quando ele está fechando, ofegante, rindo, rico.', fx: { pedras: 160, item: ['pilula_passagem_4'], xp: 12, fama: 4 } }, fail: { text: 'O portal se fecha e você fica preso. Passa um século naquele lugar, e sai quando o mundo se esqueceu de você.', fx: { anos: 8, xp: 20, stats: { dao: 2 }, fama: -10 } } },
      { text: 'Abandonar o tesouro e sair a tempo.', res: { text: 'Você sai com as mãos vazias e o coração leve. A cobiça é uma corda; você não puxou.', fx: { stats: { dao: 2 }, karma: 2 } } },
    ],
  },
];
