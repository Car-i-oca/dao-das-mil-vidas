import type { GameEvent } from '../../types';

/** Viagens, feras, ruínas e cavernas. */
export const aventura: GameEvent[] = [
  {
    id: 'partir_viagem', title: 'Para Onde o Vento Leva', rarity: 'comum', cooldown: 14, weight: 1,
    cond: { tierMin: 1 },
    text: 'O mundo é maior que o seu canto. Você sente o chamado da estrada e pode escolher para onde ir.',
    choices: [
      { text: 'Seguir para a cidade mais próxima.', res: { text: 'Telhados, mercados e rumores. A cidade nunca dorme.', fx: { local: 'cidade', xp: 2 } } },
      { text: 'Embrenhar-se na selva espiritual.', res: { text: 'Árvores gigantes, névoa e olhos observando das sombras.', fx: { local: 'selva', xp: 2 } } },
      { text: 'Escalar as montanhas sagradas.', res: { text: 'O ar rareia, o Qi engrossa. Um paraíso de cultivo, ou um túmulo.', fx: { local: 'montanha', xp: 2 } } },
      { text: 'Voltar à seita.', cond: { flags: ['membro_seita'] }, res: { text: 'Os portões da seita parecem menores que antes.', fx: { local: 'seita', faccao: 'seita', xp: 2 } } },
      { text: 'Seguir as marcas no mapa até a antiga forja.', cond: { item: 'mapa_fragmentado' }, res: { text: 'O fragmento se encaixa nas marcas do caminho. Uma linha fria de luz aponta para além das montanhas.', fx: { setFlags: ['saga_ferro_chamado'], agenda: [{ event: 'saga_ferro_inicio', em: [1, 1] }] } } },
    ],
  },
  {
    id: 'fera_espiritual', title: 'A Fera da Floresta', rarity: 'comum', cooldown: 10,
    cond: { tierMin: 1, tierMax: 5, local: ['selva', 'montanha'] },
    text: 'Um rugido faz a floresta calar. Uma fera espiritual, com pelagem de névoa e olhos dourados, rodeia você.',
    choices: [
      { text: 'Enfrentá-la.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'combate' }, ok: { text: 'Após uma batalha dura, a fera cai. Você arranca o núcleo, ainda quente.', fx: { item: ['nucleo_besta_baixo'], fama: 3, xp: 6, stats: { fis: 1 } } }, fail: { text: 'A fera é mais forte. Você escapa com garras fundas no ombro.', fx: { ferida: 2, xp: 2 } } },
      { text: 'Usar um Talismã de Fuga.', cond: { item: 'talisma_fuga' }, res: { text: 'Uma luz azul e a fera fica para trás, rugindo.', fx: { removeItem: ['talisma_fuga'] } } },
      { text: 'Recuar devagar, sem olhar nos olhos.', check: { stat: ['sor', 'esp'], dif: 0, tag: 'fuga' }, ok: { text: 'A fera perde o interesse. Você respira de novo.', fx: { stats: { dao: 1 } } }, fail: { text: 'A fera ataca assim que você vira as costas.', fx: { ferida: 2 } } },
    ],
  },
  {
    id: 'erva_espiritual', title: 'Erva do Orvalho Antigo', rarity: 'comum', cooldown: 8,
    cond: { tierMin: 1, tierMax: 6, local: ['selva', 'montanha'] },
    text: 'Entre raízes e musgo, brilha uma erva espiritual de brilho esverdeado. Ela está cercada por um ninho de cobras de jade.',
    choices: [
      { text: 'Colher pacientemente entre as cobras.', check: { stat: ['comp', 'sor'], dif: 0 }, ok: { text: 'Cada movimento é uma dança. A erva sai intacta.', fx: { item: ['erva_cem_anos'], xp: 3 } }, fail: { text: 'Uma cobra morde sua mão. A erva murcha ao toque.', fx: { ferida: 1, item: ['erva_orvalho'] } } },
      { text: 'Afastar as cobras com talismã.', cond: { item: 'talisma_fuga' }, res: { text: 'As cobras fogem; você colhe sem pressa.', fx: { removeItem: ['talisma_fuga'], item: ['erva_cem_anos', 'erva_orvalho'] } } },
      { text: 'Seguir adiante.', res: { text: 'Nem todo tesouro vale o risco. Você se afasta de olho nas cobras.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'emboscada_bandidos', title: 'Bandidos na Estrada', rarity: 'comum', cooldown: 16,
    cond: { tierMax: 4, tierMin: 1 },
    text: 'Dez homens armados cercam você numa passagem estreita. O líder grita: "Entregue sua bolsa e seu anel de armazenamento!"',
    choices: [
      { text: 'Lutar contra todos.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você derrota os bandidos e leva o saque.', fx: { pedras: 15, fama: 2, xp: 4 } }, fail: { text: 'Você é cercado e espancado. Perde parte do que carregava.', fx: { ferida: 2, pedras: -10 } } },
      { text: 'Negociar um acordo.', check: { stat: 'car', dif: 0 }, ok: { text: 'Você paga pouco e deixa os bandidos satisfeitos.', fx: { pedras: -5, karma: 1 } }, fail: { text: 'Os bandidos riem e levam o que querem.', fx: { pedras: -12, ferida: 1 } } },
      { text: 'Fugir pelo mato.', check: { stat: ['fis', 'sor'], dif: 0, tag: 'fuga' }, ok: { text: 'Você os despista. Sem prejuízos.', fx: { xp: 2 } }, fail: { text: 'Pega em uma armadilha, você perde o fôlego e a bolsa.', fx: { ferida: 1, pedras: -8 } } },
    ],
  },
  {
    id: 'cachoeira_epifania', title: 'Epifania na Cachoeira', rarity: 'comum', cooldown: 12,
    cond: { tierMin: 1, local: ['montanha', 'selva'] },
    text: 'Uma cachoeira alta cai sobre pedras negras. Quem medita sob ela costuma ouvir o ritmo do mundo.',
    choices: [
      { text: 'Meditar sob a água gelada.', check: { stat: ['dao', 'comp'], dif: 0 }, ok: { text: 'Num instante, o barulho some. Você entende como a água vence a pedra sem lutar.', fx: { xp: 18, stats: { dao: 2, comp: 1 } } }, fail: { text: 'Você só sente frio. Mas aprende a aguentar o desconforto.', fx: { xp: 5, stats: { dao: 1 } } } },
      { text: 'Beber a água espiritual.', res: { text: 'A água tem gosto de nuvem e ar. Seu Qi se aquieta.', fx: { xp: 6 } } },
    ],
  },
  {
    id: 'caverna_heranca', title: 'A Caverna Oculta', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 5, local: ['selva', 'montanha', 'ruinas'] },
    text: 'Atrás de uma cortina de cipós, uma caverna exala Qi antigo. Nas paredes, runas se acendem quando você se aproxima.',
    choices: [
      { text: 'Entrar e seguir as runas.', check: { stat: ['comp', 'esp'], dif: 2, tag: 'formacao' }, ok: { text: 'No fundo, um esqueleto sentado segura um anel. A herança de um cultivador esquecido é sua.', fx: { item: ['anel_armazenamento', 'pilula_qi_maior'], tecnica: ['olho_lotus'], xp: 15, setFlags: ['heranca_caverna'] } }, fail: { text: 'As runas explodem em luz. Você escapa, cego por horas.', fx: { ferida: 2, stats: { comp: 1 } } } },
      { text: 'Não arriscar. Registrar o local e partir.', res: { text: 'Cavernas assim têm donos pacientes. Você parte, curioso e vivo.', fx: { item: ['mapa_fragmentado'], stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'ruinas_antigas', title: 'Ruínas de um Reino Esquecido', rarity: 'raro', cooldown: 25,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'Colunas quebradas emergem da areia como ossos de gigantes. Dizem que esta cidade desapareceu numa única noite, há mil anos.',
    choices: [
      { text: 'Explorar o templo central.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'formacao' }, ok: { text: 'Armadilhas, selos e, ao final, um altar com um núcleo ainda vivo.', fx: { item: ['nucleo_besta_alto'], pedras: 40, xp: 12, fama: 4 } }, fail: { text: 'O teto desaba. Você escapa por pouco, coberto de pó e cortes.', fx: { ferida: 3, xp: 3 } } },
      { text: 'Vasculhar as casas do entorno.', res: { text: 'Entre cacos e cinzas, você encontra algumas moedas e peças valiosas.', fx: { pedras: 25, local: 'ruinas' } } },
      { text: 'Seguir sem entrar.', res: { text: 'Certas sombras são melhor deixadas em paz.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'besta_ferida', title: 'A Besta Ferida', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 5, local: ['selva', 'montanha'] },
    text: 'Uma fera jovem, pequena como um gato e brilhante como prata, jaz presa numa armadilha. Seus olhos suplicam.',
    choices: [
      { text: 'Libertar e tratar a besta.', check: { stat: ['esp', 'comp'], dif: 0 }, ok: { text: 'A besta se aninha em você. Anos depois, será uma aliada formidável.', fx: { karma: 8, setFlags: ['besta_companheira'], stats: { esp: 1, sor: 1 }, agenda: [{ event: 'besta_companheira_cresce', em: [10, 25] }] } }, fail: { text: 'A besta foge assustada, mas agradecida. Você sente um laço frágil.', fx: { karma: 4, stats: { dao: 1 } } } },
      { text: 'Arrancar o núcleo e vender.', res: { text: 'O pelo prateado se apaga. O dinheiro vem fácil. A culpa vem mais devagar.', fx: { item: ['nucleo_besta_baixo'], pedras: 10, karma: -8, corr: 4 } } },
    ],
  },
  {
    id: 'besta_companheira_cresce', title: 'A Companheira Cresce', rarity: 'raro', once: true,
    cond: { flags: ['besta_companheira'] },
    text: 'A besta que você salvou voltou, enorme e majestosa. Ela baixa a cabeça. Quer seguir você para onde for.',
    choices: [
      { text: 'Aceitar o pacto de companheirismo.', res: { text: 'Um laço de alma se forma. Vocês cultivam juntos, e cada batalha vira dança.', fx: { stats: { fis: 3, esp: 3, sor: 2 }, xp: 15, fama: 6, setFlags: ['pacto_besta'] } } },
      { text: 'Deixá-la livre na floresta.', res: { text: 'A besta uiva uma despedida e some entre as árvores. Sua bondade ecoa.', fx: { karma: 12, stats: { dao: 3 } } } },
    ],
  },
  {
    id: 'reino_secreto', title: 'O Reino Secreto Abre', rarity: 'raro', cooldown: 40,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'A cada poucas décadas, um reino secreto se abre por alguns dias. Cultivadores de toda parte correm para entrar. Quem sai, ou sai rico, ou sai morto.',
    choices: [
      { text: 'Entrar de cabeça, buscando tesouros.', check: { stat: ['fis', 'esp', 'sor'], dif: 3, tag: 'combate' }, ok: { text: 'Entre feras, armadilhas e rivais, você sai com um baú de pedras e uma pílula lendária.', fx: { pedras: 80, item: ['pilula_qi_maior', 'pilula_passagem_3'], xp: 20, fama: 8 } }, fail: { text: 'Você escapa por um triz, ferido e de bolsos vazios.', fx: { ferida: 3, xp: 5 } } },
      { text: 'Entrar com cautela, evitando disputas.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'Você coleta ervas e fragmentos sem chamar atenção.', fx: { pedras: 30, item: ['erva_mil_anos'], xp: 10 } }, fail: { text: 'O tempo acaba antes de achar algo.', fx: { xp: 2 } } },
      { text: 'Não entrar. Vender informações a quem entra.', res: { text: 'Poucos riscos, bons lucros. Informação é o melhor tesouro.', fx: { pedras: 25, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'tesouro_roubado', title: 'O Item Roubado', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 5, local: ['cidade', 'selva'] },
    text: 'Um ladrão ferido tropeça em você e deixa cair um manto de seda e uma pílula brilhante. Atrás dele, guardas de uma família poderosa gritam.',
    choices: [
      { text: 'Devolver o que caiu aos guardas.', res: { text: 'Os guardas agradecem e oferecem uma pequena recompensa.', fx: { pedras: 8, karma: 4, fama: 1 } } },
      { text: 'Pegar a pílula e fugir.', check: { stat: ['sor', 'fis'], dif: 1, tag: 'fuga' }, ok: { text: 'Você some pelos becos. A pílula é de ótima qualidade.', fx: { item: ['pilula_qi_media'], karma: -4 } }, fail: { text: 'Os guardas o alcançam e dão uma lição.', fx: { ferida: 1, karma: -4, fama: -2 } } },
    ],
  },
  {
    id: 'formacao_ilusoria', title: 'A Neblina que Não Passa', rarity: 'comum', cooldown: 12,
    cond: { tierMin: 1, tierMax: 5, local: ['selva', 'montanha'] },
    text: 'A névoa se espessa e os caminhos se repetem. Você já passou três vezes pela mesma árvore retorcida. Há uma formação ilusória por perto.',
    choices: [
      { text: 'Decifrar a formação.', check: { stat: ['comp', 'esp'], dif: 1, tag: 'formacao' }, ok: { text: 'Você identifica os pontos do arranjo e os desfaz. Dentro, repousa um velho pavilhão de cultivo abandonado.', fx: { xp: 14, stats: { comp: 2 }, pedras: 10 } }, fail: { text: 'Horas depois, exausto, você escapa por pura persistência.', fx: { xp: 3, ferida: 1 } } },
      { text: 'Quebrar a névoa à força.', check: { stat: ['fis', 'esp'], dif: 2 }, ok: { text: 'Um golpe e o ar estremece. A formação cede.', fx: { xp: 6, stats: { fis: 1 } } }, fail: { text: 'O contragolpe lança você contra uma pedra.', fx: { ferida: 2 } } },
    ],
  },
  {
    id: 'montanha_que_anda', title: 'A Montanha que Anda', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 3 },
    text: 'Nos Mares Sem Fim, uma ilha se move. Pescadores dizem que é uma tartaruga ancestral, adormecida por mil anos. Cultivadores acampam em seu casco, aproveitando o Qi denso.',
    choices: [
      { text: 'Acampar no casco e cultivar por uma década.', check: { stat: ['esp', 'dao'], dif: 2 }, ok: { text: 'Cada respiração é compassada com o sonho da tartaruga. Seu Qi se aprofunda como nunca.', fx: { xp: 30, anos: 8, stats: { esp: 2, dao: 1 } } }, fail: { text: 'A tartaruga se mexe em sonhos e você precisa saltar para salvar a vida.', fx: { xp: 5, ferida: 2 } } },
      { text: 'Falar com a tartaruga.', check: { stat: ['car', 'esp'], dif: 4 }, ok: { text: 'Uma voz antiga ressoa. A tartaruga lhe concede uma bênção de longevidade.', fx: { vida: 30, stats: { dao: 2 }, fama: 6 } }, fail: { text: 'Silêncio profundo. Quem sabe ela só dormisse.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'travessia_mares', title: 'A Travessia dos Mares Sem Fim', rarity: 'raro', cooldown: 50,
    cond: { tierMin: 3 },
    text: 'Para chegar ao arquipélago dos pavilhões flutuantes, só atravessando mares onde monstros ancestrais dormem sob as ondas.',
    choices: [
      { text: 'Atravessar a bordo de um navio mercante.', custo: 40, res: { text: 'A viagem é longa, mas segura. No arquipélago, você faz contatos valiosos.', fx: { fama: 4, xp: 8, stats: { car: 1 } } } },
      { text: 'Atravessar sozinho, sobre a espada ou o corpo.', check: { stat: ['esp', 'fis'], dif: 3 }, ok: { text: 'Quando você chega, as pessoas o olham como a um mito. Alguém pede sua bênção.', fx: { fama: 12, xp: 14, stats: { dao: 2 } } }, fail: { text: 'Uma serpente marinha o arrasta para o fundo. Você escapa com alma e orgulho machucados.', fx: { ferida: 3, xp: 4 } } },
    ],
  },
];
