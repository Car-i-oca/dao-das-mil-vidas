import type { GameEvent } from '../../types';

/**
 * Lote 5 — Caminho demoníaco, karma e inimigos.
 * Convenções: seitas demoníacas (sacrifício de sangue, refino de almas), divisão justo × demoníaco,
 * demônio interior, retribuição cármica (o inimigo ou o filho do inimigo que volta).
 */
export const lote5Sangue: GameEvent[] = [
  /* ===== Seita demoníaca ===== */
  {
    id: 'entrada_seita_demoniaca', title: 'Os Portões Vermelhos', rarity: 'raro', once: true, weight: 2,
    cond: { tierMin: 1, tierMax: 5, corrMin: 10, noFlags: ['membro_demoniaca'], faction: ['errante', 'nenhuma', 'cla'] },
    text: 'Numa encosta onde nada cresce, portões vermelhos se abrem sem ranger. Um homem de olhos baços recebe você: "Sentimos sua sede. Aqui não perguntamos de onde veio, apenas até onde quer chegar."',
    choices: [
      { text: 'Entrar e jurar lealdade à seita.', res: { text: 'Uma gota de sangue sela o juramento. As paredes têm cheiro de ferrugem e incenso, e os discípulos o observam como lobos observam um novo membro da matilha.', fx: { faccao: 'demoniaca', setFlags: ['membro_demoniaca'], corr: 8, xp: 12, stats: { dao: 1 }, karma: -4 } } },
      { text: 'Recusar e seguir.', res: { text: 'O homem sorri sem calor. "Voltará, ou não." Você continua, com a nuca arrepiada.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'prova_de_sangue', title: 'A Prova de Sangue', rarity: 'comum', once: true,
    cond: { tierMin: 1, tierMax: 5, flags: ['membro_demoniaca'], noFlags: ['executor_demoniaco'] },
    text: 'Para subir na hierarquia da seita, é preciso passar pela Prova de Sangue: derrotar um discípulo de sua própria turma, diante de todos, até que um deles não se levante.',
    choices: [
      { text: 'Derrotar o oponente e poupar sua vida.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'demonio' }, ok: { text: 'O oponente cai, vivo. O Mestre franze a testa, mas o respeito dos outros discípulos é sincero.', fx: { setFlags: ['executor_demoniaco'], fama: 5, karma: 2, xp: 8, stats: { dao: 2 } } }, fail: { text: 'O oponente o vence, e você precisa fugir para não ser morto.', fx: { ferida: 3, fama: -3 } } },
      { text: 'Derrotar o oponente e matá-lo.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'demonio' }, ok: { text: 'O oponente cai sem vida. O Mestre aplaude, e a seita o reconhece como Executor.', fx: { item: ['lamina_sangrenta'], setFlags: ['executor_demoniaco'], fama: 8, karma: -12, corr: 10, xp: 14 } }, fail: { text: 'O oponente é mais duro que o esperado. Você sobrevive, mas perde a luta.', fx: { ferida: 3, fama: -3 } } },
    ],
  },
  {
    id: 'mestre_demoniaco_exige', title: 'A Ordem do Mestre Demoníaco', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 2, tierMax: 6, flags: ['membro_demoniaca'] },
    text: 'O Mestre da seita demoníaca chama você ao salão de cinzas: "Uma aldeia no vale norte esconde um manual que me pertence. Traga o manual. Sobre os aldeões, decida você."',
    choices: [
      { text: 'Tomar o manual e poupar a aldeia.', check: { stat: ['fis', 'car'], dif: 2 }, ok: { text: 'Você leva o manual e deixa a aldeia intacta. O Mestre estala a língua, mas aceita.', fx: { item: ['manual_olho_lotus'], xp: 10, karma: 4, stats: { dao: 1 } } }, fail: { text: 'A aldeia resiste, e você sai ferido, sem o manual.', fx: { ferida: 2, fama: -2 } } },
      { text: 'Tomar o manual e queimar a aldeia.', res: { text: 'As chamas sobem alto. O Mestre sorri e lhe entrega um fragmento de poder.', fx: { item: ['manual_olho_lotus'], xp: 20, corr: 14, karma: -20, fama: -6, setFlags: ['queimou_aldeia'] } } },
      { text: 'Desobedecer e voltar de mãos vazias.', res: { text: 'O Mestre o olha longamente. "Interessante. Mas não se repetirá."', fx: { karma: 6, corr: -4, stats: { dao: 2 }, setFlags: ['desobedeceu_mestre_demoniaco'] } } },
    ],
  },
  {
    id: 'lago_de_sangue', title: 'O Ritual do Lago de Sangue', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 3, tierMax: 7, flags: ['membro_demoniaca'] },
    text: 'Uma vez por geração, a seita abre o Lago de Sangue: uma caverna onde o Qi demoníaco condensa como névoa viscosa. Quem aguenta um mês lá dentro volta mudado.',
    choices: [
      { text: 'Entrar no Lago de Sangue.', check: { stat: ['fis', 'dao', 'esp'], dif: 4, tag: 'demonio' }, ok: { text: 'Você emerge pálido, calmo e muito mais forte. Algo em você foi trocado por algo que você ainda não entende.', fx: { xp: 40, corr: 14, stats: { fis: 2, esp: 2 }, anos: 1 } }, fail: { text: 'O lago o engole por semanas. Você sai trêmulo, esvaziado e com sangue nos olhos.', fx: { ferida: 3, corr: 10, xp: 12, anos: 1 } } },
      { text: 'Recusar o ritual.', res: { text: 'Os outros o encaram com desprezo. Você mantém o olhar firme.', fx: { fama: -2, stats: { dao: 1 }, corr: -3 } } },
    ],
  },
  {
    id: 'traicao_mestre_demoniaco', title: 'O Mestre Quer Seu Núcleo', rarity: 'raro', once: true, weight: 6,
    cond: { tierMin: 3, flags: ['membro_demoniaca', 'executor_demoniaco'] },
    text: 'Numa noite sem lua, o Mestre da seita convida você a seu pavilhão: "Você cresceu rápido demais. Um discípulo assim é um tesouro ou uma ameaça. Hoje descobriremos qual." Seus olhos brilham com a sede que ele nunca esconde.',
    choices: [
      { text: 'Enfrentar o Mestre.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'A luta é longa e feia. Quando o Mestre cai, o salão inteiro se cala. Alguns se ajoelham, outros fogem. A seita é, de repente, sua.', fx: { fama: 18, corr: 12, karma: -8, xp: 20, setFlags: ['senhor_demoniaco_em_potencia'] } }, fail: { text: 'Você é derrotado e escapa por um corredor de fuga, com ferimentos profundos e um novo inimigo mortal.', fx: { ferida: 4, setFlags: ['inimigo_mestre_demoniaco'], faccao: 'errante', clearFlags: ['membro_demoniaca'] } } },
      { text: 'Fugir pela porta dos fundos.', check: { stat: ['sor', 'fis'], dif: 3, tag: 'fuga' }, ok: { text: 'Você corre pela noite, sem olhar para trás. O Mestre solta um uivo distante.', fx: { faccao: 'errante', setFlags: ['inimigo_mestre_demoniaco'], clearFlags: ['membro_demoniaca'], corr: -4 } }, fail: { text: 'Você é pego no meio da fuga e quase morto. Escapa por um fio, ferido.', fx: { ferida: 4, faccao: 'errante', setFlags: ['inimigo_mestre_demoniaco'], clearFlags: ['membro_demoniaca'] } } },
      { text: 'Submeter-se e jurar obediência cega.', res: { text: 'O Mestre aceita, rindo. Você ganha tempo e perde um pouco da alma.', fx: { corr: 16, karma: -6, stats: { dao: -2 }, xp: 6 } } },
    ],
  },
  {
    id: 'senhor_do_sangue', title: 'O Trono de Ossos', rarity: 'lendario', once: true, weight: 14,
    cond: { tierMin: 4, tierMax: 8, flags: ['senhor_demoniaco_em_potencia'], fameMin: 30 },
    text: 'A seita demoníaca é sua. Os Anciãos, um a um, ajoelham-se diante do trono de ossos. O poder é grande, e o preço, maior. Ele estende a mão: "Reine, e liberte o mundo de seus justos."',
    choices: [
      { text: 'Aceitar o trono e reinar como Senhor do Sangue.', res: { text: 'O trono aceita seu peso. Por séculos, seu nome é pesadelo e bênção, dependendo de quem o pronuncia.', fx: { fim: 'senhor_sangue' } } },
      { text: 'Dissolver a seita e libertar os discípulos.', check: { stat: ['dao', 'car'], dif: 4 }, ok: { text: 'Num discurso curto, você extingue um século de crueldade. Centenas de jovens, livres, choram. Seu nome é amaldiçoado e abençoado, ao mesmo tempo.', fx: { corr: -30, karma: 25, fama: 10, stats: { dao: 4 }, faccao: 'errante' } }, fail: { text: 'A seita se rebela. Você foge do próprio trono, perseguido por velhos aliados.', fx: { ferida: 4, fama: -6, faccao: 'errante', clearFlags: ['membro_demoniaca'], stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'coracao_dividido', title: 'O Coração Dividido', rarity: 'raro', once: true, weight: 5,
    cond: { tierMin: 2, tierMax: 7, flags: ['membro_demoniaca'], karmaMin: 5 },
    text: 'Vendo crianças brincarem numa aldeia que a seita pretende queimar, algo trinca dentro de você. Ficar ou partir, obedecer ou se rebelar: a escolha pesa mais que qualquer método.',
    choices: [
      { text: 'Avisar a aldeia e deixar a seita.', check: { stat: ['dao', 'car'], dif: 3 }, ok: { text: 'A aldeia foge a tempo. A seita o declara traidor, mas as crianças crescem para contar a história.', fx: { item: ['talisma_exorcismo'], faccao: 'errante', clearFlags: ['membro_demoniaca'], karma: 18, corr: -12, fama: 6, stats: { dao: 3 }, setFlags: ['desertor_demoniaco'], agenda: [{ event: 'perseguidor_demoniaco', em: [5, 15] }] } }, fail: { text: 'Você tenta avisar a aldeia, mas é interceptado. A fuga é caótica e dolorosa.', fx: { faccao: 'errante', clearFlags: ['membro_demoniaca'], ferida: 3, karma: 8, setFlags: ['desertor_demoniaco'], agenda: [{ event: 'perseguidor_demoniaco', em: [5, 15] }] } } },
      { text: 'Seguir a ordem e queimar a aldeia.', res: { text: 'As chamas sobem. A dúvida some, junto com um pedaço do seu coração.', fx: { corr: 15, karma: -20, xp: 15, stats: { dao: -2 } } } },
    ],
  },
  {
    id: 'perseguidor_demoniaco', title: 'O Caçador da Seita', rarity: 'raro', once: true,
    cond: { flags: ['desertor_demoniaco'] },
    text: 'Um discípulo antigo da sua seita, de olhar frio e passos silenciosos, aparece numa estalagem. Sorri e senta-se à sua frente. "Mestre pediu seu coração. Mas eu pergunto: por que você largou tudo?"',
    choices: [
      { text: 'Explicar e tentar convencê-lo a deixar a seita.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'Ele escuta, em silêncio. No fim, deixa uma moeda de ferro na mesa e vai embora. "Não o encontrei."', fx: { karma: 8, stats: { car: 1, dao: 2 }, fama: 2 } }, fail: { text: 'Ele ri e saca a lâmina. A luta termina na rua, sob chuva.', fx: { ferida: 3, fama: -2 } } },
      { text: 'Lutar até o fim.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Você vence, e o poupa. Ele jura silêncio antes de sumir.', fx: { fama: 6, karma: 4, stats: { dao: 1 } } }, fail: { text: 'Você perde, e só sobrevive porque ele hesitou no último golpe.', fx: { ferida: 4, fama: -4 } } },
    ],
  },
  {
    id: 'purgacao_cidade', title: 'A Purgação da Cidade', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, tierMax: 7, local: ['cidade'] },
    text: 'Uma cidade inteira será "purificada" pela seita demoníaca esta noite. Duzentos mil habitantes ignorantes. Você é o único cultivador com tempo e poder para intervir.',
    choices: [
      { text: 'Enfrentar os executores na muralha.', check: { stat: ['fis', 'esp', 'dao'], dif: 5, tag: 'combate' }, ok: { text: 'Uma noite de gritos e sangue. Quando amanhece, a cidade ainda vive, e uma menina chora no seu colo.', fx: { fama: 22, karma: 22, ferida: 2, stats: { dao: 3 }, xp: 14 } }, fail: { text: 'Você mal contém a primeira onda. A cidade queima, apesar de tudo, e você salva só uma parte dos habitantes.', fx: { ferida: 5, karma: 14, fama: 8, stats: { dao: 2 } } } },
      { text: 'Alertar as seitas justas e fugir.', res: { text: 'Quando as seitas chegam, os demônios já se foram. A cidade é parcialmente salva, e você parte, ofegante.', fx: { karma: 8, fama: 3 } } },
      { text: 'Juntar-se à purgação.', res: { text: 'A noite é um borrão vermelho. De manhã, uma cidade em cinzas e uma sombra que não o deixa mais.', fx: { corr: 22, karma: -35, xp: 30, fama: -12 } } },
    ],
  },
  {
    id: 'pacto_demonio_antigo', title: 'O Demônio Antigo Oferece', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 8, corrMin: 25 },
    text: 'Num círculo de pedra, uma voz mais velha que o céu pergunta: "Você deseja mais poder? Posso dar. Em troca, vou apenas usar seu corpo por uma noite por ano." A proposta parece pequena, e esse é o perigo.',
    choices: [
      { text: 'Aceitar o pacto.', res: { text: 'Uma ardência sobe pela coluna. Seu Qi dobra. E nas noites seguintes, você acorda com lembranças que não são suas.', fx: { xp: 40, corr: 16, stats: { fis: 2, esp: 2 }, setFlags: ['pacto_demonio_antigo'], karma: -4 } } },
      { text: 'Recusar e dissolver o círculo de pedra.', check: { stat: ['dao', 'esp'], dif: 4, tag: 'mente' }, ok: { text: 'A pedra racha e a voz uiva. O círculo se desfaz em pó. Algo muito antigo foi, por um tempo, derrotado.', fx: { corr: -14, karma: 8, stats: { dao: 3 }, fama: 4 } }, fail: { text: 'O demônio mordisca sua alma antes de partir. Você acorda no chão, tonto e com menos vitalidade.', fx: { ferida: 3, corr: 6, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'caminho_cinzento', title: 'O Caminho Cinzento', rarity: 'lendario', once: true,
    cond: { tierMin: 3, corrMin: 20, karmaMin: 5 },
    text: 'Nem justo nem demoníaco: um velho cultivador de manto cinza, que vagueia pelo mundo sem seita, propõe uma terceira via. "O bem e o mal são faces de um mesmo rio. Quem aprende a navegá-lo sem se afogar domina ambos."',
    choices: [
      { text: 'Aprender o Caminho Cinzento.', check: { stat: ['dao', 'comp'], dif: 5, tag: 'mente' }, ok: { text: 'Por anos, você aprende a equilibrar sombra e luz. O Coração do Dao nunca esteve tão estável, e a corrupção vira combustível dominado.', fx: {  corr: -20, stats: { dao: 4, esp: 2 }, xp: 20, anos: 3 } }, fail: { text: 'A lição é difícil demais. O velho sorri e desaparece no nevoeiro, deixando uma pista.', fx: { stats: { dao: 2 } } } },
      { text: 'Recusar: prefere a clareza de um lado só.', res: { text: 'O velho assente com sabedoria. "Também é um caminho."', fx: { stats: { dao: 1 } } } },
    ],
  },

  /* ===== Karma e inimigos ===== */
  {
    id: 'viuva_vinganca', title: 'A Viúva Sem Nome', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7, karmaMax: -15 },
    text: 'Uma mulher de preto, magra e silenciosa, para diante de você numa estalagem. "Matou meu marido em {vila}. Quero que se lembre do nome dele: Chen. Quero que o diga em voz alta antes de morrer."',
    choices: [
      { text: 'Pedir perdão e oferecer reparação.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'Ela vacila. Aceita uma bolsa e o relato dos fatos. Vai embora sem uma palavra, mas com as costas menos curvas.', fx: { karma: 12, pedras: -80, stats: { dao: 2 }, setFlags: ['pediu_perdao_viuva'] } }, fail: { text: 'Ela cospe nos seus pés e se afasta. A promessa de vingança paira no ar.', fx: { karma: -2, setFlags: ['viuva_inimiga', 'chen_vinganca'], agenda: [{ event: 'filho_da_viuva', em: [20, 40] }] } } },
      { text: 'Matá-la para encerrar o assunto.', res: { text: 'Uma morte silenciosa numa viela. O assunto morre, e algo seu também.', fx: { karma: -22, corr: 8, stats: { dao: -2 }, setFlags: ['matou_viuva', 'chen_vinganca'], agenda: [{ event: 'filho_da_viuva', em: [20, 40] }] } } },
      { text: 'Ignorar e partir.', res: { text: 'Ela fica parada na estalagem, olhando você partir. A promessa fica no ar.', fx: { setFlags: ['viuva_inimiga', 'chen_vinganca'], agenda: [{ event: 'filho_da_viuva', em: [20, 40] }] } } },
    ],
  },
  {
    id: 'filho_da_viuva', title: 'O Filho de Chen', rarity: 'raro', once: true,
    cond: { flags: ['chen_vinganca'] },
    text: 'Décadas depois, um cultivador de olhar firme o aborda numa estrada vazia. "Chamo-me Chen, como meu pai. Minha mãe morreu me contando seu nome. Hoje eu cobro o que ela não pôde cobrar."',
    choices: [
      { text: 'Lutar contra ele.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'O duelo é curto e triste. Chen cai, e antes de partir, murmura: "Era isso que minha mãe queria?" Você não responde.', fx: { karma: -6, fama: 4, stats: { dao: 1 } } }, fail: { text: 'Chen o derrota e o poupa, por razões que ele mesmo não entende. Você vive, humilhado.', fx: { ferida: 3, fama: -6, stats: { dao: 2 } } } },
      { text: 'Contar-lhe a verdade e pedir perdão.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'Chen escuta, em silêncio. No fim, abaixa a lâmina. "Meu pai teria me perdoado por poupar você." Vocês se despedem como adultos.', fx: { karma: 20, stats: { dao: 4, car: 1 }, fama: 6 } }, fail: { text: 'A raiva dele é velha demais. Você foge, por pena e por medo.', fx: { ferida: 2, karma: 2 } } },
      { text: 'Aceitar o destino e se entregar.', res: { text: 'Chen hesita. Não consegue erguer a lâmina contra alguém que não resiste. Ele cospe, vira as costas e chora.', fx: { karma: 10, stats: { dao: 3 } } } },
    ],
  },
  {
    id: 'espiritos_vingativos', title: 'Os Fantasmas do Caminho', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 2, tierMax: 7, karmaMax: -20 },
    text: 'À noite, vultos de olhos vazios cercam seu acampamento. Cada um é uma vítima de seus atos passados, e todos o chamam pelo nome com vozes lastimosas.',
    choices: [
      { text: 'Enfrentá-los com o Coração do Dao.', check: { stat: ['dao', 'esp'], dif: 3, tag: 'mente' }, ok: { text: 'Você os encara, um por um, e pede perdão em silêncio. Aos poucos, eles se desfazem como fumaça.', fx: { karma: 10, corr: -6, stats: { dao: 3 } } }, fail: { text: 'Os fantasmas arrancam pedaços do seu espírito antes de sumir. Você acorda esgotado.', fx: { ferida: 2, corr: 6, stats: { esp: -1 } } } },
      { text: 'Usar um Talismã de Escudo contra os fantasmas.', cond: { item: 'talisma_escudo' }, res: { text: 'Os espíritos recuam diante da luz. A noite passa em paz, e a culpa fica.', fx: { removeItem: ['talisma_escudo'] } } },
      { text: 'Usar um Talismã de Exorcismo.', cond: { item: 'talisma_exorcismo' }, res: { text: 'O talismã arde em branco. Os vultos se desfazem em silêncio, e uma paz estranha toma o acampamento.', fx: { removeItem: ['talisma_exorcismo'], karma: 4, corr: -6 } } },
      { text: 'Fugir noite adentro.', check: { stat: ['sor', 'fis'], dif: 2, tag: 'fuga' }, ok: { text: 'Você corre até o amanhecer. Os fantasmas ficam para trás, esperando outra noite.', fx: { stats: { dao: -1 } } }, fail: { text: 'Os fantasmas o alcançam e o arranham por dentro.', fx: { ferida: 2 } } },
    ],
  },
  {
    id: 'tumulo_vitima', title: 'O Túmulo Esquecido', rarity: 'raro', once: true,
    cond: { tierMin: 2, karmaMax: -10 },
    text: 'Num cemitério, uma lápide gasta, com um nome que você reconhece, está coberta de musgo. Ninguém cuidou dela em décadas. Você foi a causa.',
    choices: [
      { text: 'Limpar a lápide e deixar oferendas por um ano.', res: { text: 'O musgo sai, o nome volta a brilhar. Um ano de cuidados lentos, quase rituais. Seu coração fica mais leve.', fx: { item: ['contas_penitencia'], anos: 1, karma: 16, corr: -8, stats: { dao: 3 } } } },
      { text: 'Deixar o túmulo como está e partir.', res: { text: 'Você vira as costas. O nome fica na pedra, esperando.', fx: { karma: -2, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'emboscada_tres_seitas', title: 'A Emboscada das Três Seitas', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, fameMin: 30, karmaMax: -5 },
    text: 'Seu nome é maldito em três seitas justas. Elas finalmente concordaram em agir juntas, e oitenta cultivadores, entre os quais cinco Anciãos, cercam seu esconderijo na madrugada.',
    choices: [
      { text: 'Lutar até onde der.', check: { stat: ['fis', 'esp', 'dao'], dif: 6, tag: 'combate' }, ok: { text: 'Você mata ou desmaia metade dos agressores e quebra o cerco. Quando amanhece, o terreno é de cinzas, e seu nome, de lenda.', fx: { fama: 28, karma: -12, ferida: 4, stats: { dao: 3 }, xp: 20 } }, fail: { text: 'Você é derrotado e preso. Vive só porque os Anciãos querem interrogá-lo antes de matá-lo. A fuga custa o resto da energia.', fx: { ferida: 5, fama: -8, anos: 1 } } },
      { text: 'Usar um Talismã de Fuga.', cond: { item: 'talisma_fuga' }, res: { text: 'Um clarão azul. Você acorda a cem li de distância, com o coração batendo na garganta.', fx: { removeItem: ['talisma_fuga'], fama: -2 } } },
      { text: 'Render-se e propor um julgamento justo.', check: { stat: ['car', 'dao'], dif: 5 }, ok: { text: 'Para surpresa de todos, os Anciãos aceitam. O julgamento dura um ano, e a sentença final é prisão branda e reabilitação.', fx: { anos: 1, karma: 14, fama: -4, corr: -20, stats: { dao: 4 } } }, fail: { text: 'Ninguém quer ouvir. A rendição vira surra.', fx: { ferida: 5, fama: -10 } } },
    ],
  },
  {
    id: 'cacador_implacavel', title: 'O Assassino que Nunca Erra', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, fameMin: 25, karmaMax: -8 },
    text: 'Um contrato foi aberto pela sua cabeça: dez mil pedras espirituais. Um assassino famoso, o único que nunca falhou, aceita o trabalho. A primeira lâmina chega antes do primeiro aviso.',
    choices: [
      { text: 'Preparar uma armadilha e esperar.', check: { stat: ['comp', 'esp'], dif: 4 }, ok: { text: 'O assassino cai na armadilha. Antes de morrer, revela quem contratou. Você tem uma nova lista.', fx: { fama: 8, karma: -4, stats: { comp: 1 }, setFlags: ['sabe_quem_contratou'] } }, fail: { text: 'A armadilha falha e uma lâmina atravessa seu ombro antes de você reagir.', fx: { ferida: 4, fama: -2 } } },
      { text: 'Oferecer o dobro do pagamento ao assassino.', check: { stat: ['car', 'sor'], dif: 3 }, ok: { text: 'O assassino aceita e some. O contratante nunca saberá por que ele falhou.', fx: { pedras: -150, karma: -2 } }, fail: { text: 'O assassino ri. "Não mudo de lado." A luta começa.', fx: { ferida: 3 } } },
    ],
  },
  {
    id: 'o_grande_inimigo', title: 'O Grande Inimigo', rarity: 'lendario', once: true, weight: 4,
    cond: { tierMin: 5, karmaMax: -25 },
    text: 'Um cultivador de olhos serenos desce de uma nuvem escura e para à sua frente. "Eu sou a soma de tudo o que você destruiu. Cada vida que tomou, cada promessa quebrada. O Céu me deu forma para cobrar a dívida."',
    choices: [
      { text: 'Enfrentá-lo com tudo.', check: { stat: ['fis', 'esp', 'dao'], dif: 8, tag: 'combate' }, ok: { text: 'Você vence, e ao final percebe que ele sorri. "Obrigado. Foi justo." O corpo dele se desfaz em luz, e sua carga cármica cai pela metade.', fx: { item: ['sino_alma'], karma: 40, stats: { dao: 5 }, xp: 25, fama: 20 } }, fail: { text: 'Você perde, e ele se compadece. "Ainda não é hora." Ele some, deixando você com feridas fundas e um aviso.', fx: { ferida: 6, stats: { dao: 3 } } } },
      { text: 'Pedir perdão a cada rosto que ele carrega.', check: { stat: ['dao', 'car'], dif: 6, tag: 'mente' }, ok: { text: 'Cada rosto desaparece, um a um, até restar apenas silêncio. O Grande Inimigo se curva. "Você pagou."', fx: { karma: 50, corr: -30, stats: { dao: 6, car: 2 }, xp: 25 } }, fail: { text: 'Os rostos zombam e se multiplicam. O Grande Inimigo desfaz o encontro com tristeza.', fx: { ferida: 3, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'penitente', title: 'O Caminho do Penitente', rarity: 'lendario', once: true, weight: 4,
    cond: { tierMin: 3, karmaMax: -20, corrMin: 30 },
    text: 'Cansado de lutar contra si, você encontra um templo de pedra gasta, onde monges silenciosos vivem em penitência perpétua. "Quem entra não sai", diz o porteiro. "Mas quem entra encontra paz."',
    choices: [
      { text: 'Entrar no templo e fazer penitência até o fim.', check: { stat: ['dao', 'esp'], dif: 4, tag: 'mente' }, ok: { text: 'Décadas de silêncio, orações e trabalho manual. Quando a morte chega, ela é calma, e a corrupção já se foi.', fx: { fim: 'penitente' } }, fail: { text: 'A penitência é difícil demais. Você sai antes de terminar, mas leva um pouco de calma consigo.', fx: { corr: -15, karma: 10, stats: { dao: 3 } } } },
      { text: 'Recusar: o mundo ainda tem coisas por ensinar.', res: { text: 'O porteiro curva-se, sem ressentimento.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'lista_negra', title: 'Seu Nome na Lista Negra', rarity: 'comum', cooldown: 50,
    cond: { tierMin: 2, tierMax: 7, fameMin: 15, karmaMax: -10 },
    text: 'Nas portas das estalagens, seu rosto aparece num cartaz: "Procurado vivo ou morto. Recompensa de mil pedras." Caçadores de recompensas começam a olhar para você com mais atenção.',
    choices: [
      { text: 'Mudar de aparência e viajar com cautela.', check: { stat: ['car', 'sor'], dif: 1, tag: 'fuga' }, ok: { text: 'Você evita três caçadores sem perceber. A fama pesa menos quando ninguém sabe seu rosto.', fx: { fama: -3, stats: { sor: 1 } } }, fail: { text: 'Um caçador o reconhece e o persegue por dias.', fx: { ferida: 2, fama: -2 } } },
      { text: 'Rasgar os cartazes e enfrentar quem aparecer.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Três caçadores caem, e o recado se espalha: este não é um alvo fácil.', fx: { fama: 8, pedras: 40, karma: -3 } }, fail: { text: 'Os caçadores se organizam e você escapa por pouco.', fx: { ferida: 3, fama: -2 } } },
    ],
  },
  {
    id: 'rival_ascendido', title: 'O Rival Que Subiu Mais Alto', rarity: 'raro', once: true,
    cond: { tierMin: 3, flags: ['perdeu_para_rival_interno'] },
    text: '{rival}, que o derrotou há décadas, retorna como Ancião de uma seita rival, mais poderoso e mais calmo. Ele o reconhece e inclina a cabeça: "Faz tempo. Ainda quer a revanche?"',
    choices: [
      { text: 'Aceitar a revanche.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'Desta vez, você vence. {rival} cai, sorrindo, e aperta sua mão. "Merecido."', fx: { fama: 14, stats: { dao: 3 }, xp: 14, setFlags: ['venceu_rival_interno'] } }, fail: { text: 'Você perde de novo, por menos. {rival} oferece a mão e um conselho, e o recusa por orgulho.', fx: { ferida: 3, stats: { dao: 2 } } } },
      { text: 'Recusar a revanche e agradecer pela lição antiga.', res: { text: '{rival} assente, surpreso. O ciclo de rancor se encerra, mais por cansaço que por perdão.', fx: { karma: 6, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'cacada_demonios_inquisidor', title: 'A Grande Caçada aos Demônios', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, tierMax: 7, faction: ['seita'] },
    text: 'As seitas justas anunciam a Grande Caçada: dez anos de expedições para limpar o continente de demônios. Os Anciãos pedem seus melhores discípulos.',
    choices: [
      { text: 'Juntar-se à caçada.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'Uma década de lutas, perdas e glória. Seu nome é honrado em três reinos.', fx: { fama: 18, karma: 8, pedras: 100, ferida: 2, anos: 5, stats: { dao: 2 }, xp: 14 } }, fail: { text: 'A caçada é dura. Você volta ferido e mais velho, com poucas conquistas.', fx: { ferida: 4, anos: 5, fama: 4, stats: { dao: 1 } } } },
      { text: 'Recusar a caçada: nem todo demônio merece a lâmina.', res: { text: 'Os Anciãos o olham com desconfiança. Mas sua consciência dorme tranquila.', fx: { fama: -4, karma: 4, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'carta_anonima', title: 'A Carta Sem Remetente', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 2, tierMax: 7, karmaMax: -5 },
    text: 'Uma carta aparece sobre o seu travesseiro, sem remetente: "Sei o que você fez em {vila}. Pague, ou todo mundo saberá." Uma assinatura rabiscada: "Um amigo."',
    choices: [
      { text: 'Pagar o chantagista (50 pedras).', custo: 50, res: { text: 'O dinheiro some. O chantagista, também, por enquanto.', fx: { karma: -2 } } },
      { text: 'Caçar o autor da carta.', check: { stat: ['comp', 'esp'], dif: 3 }, ok: { text: 'Você rastreia o remetente e o confronta. Ele implora, e você decide o que fazer.', fx: { fama: 3, karma: 2, stats: { comp: 1 } } }, fail: { text: 'O autor escapa. O segredo fica à solta.', fx: { fama: -2 } } },
      { text: 'Publicar o segredo antes que seja usado contra você.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'A confissão pública dói, mas liberta. Seus inimigos perdem uma arma.', fx: { fama: -4, karma: 10, stats: { dao: 3 } } }, fail: { text: 'A confissão é recebida com desprezo. Seu nome se suja ainda mais.', fx: { fama: -10, karma: 4 } } },
    ],
  },
  {
    id: 'tregua_sangue', title: 'A Trégua de Sangue', rarity: 'raro', once: true, weight: 6,
    cond: { tierMin: 3, flags: ['inimigo_mestre_demoniaco'] },
    text: 'O Mestre demoníaco, que você traiu ou fugiu, envia um mensageiro: "Uma trégua. Um século sem guerra. Em troca, uma pequena coisa que você pode dar."',
    choices: [
      { text: 'Aceitar a trégua e entregar o que ele pede.', res: { text: 'O pagamento é pequeno, ao menos na superfície. A trégua dura mais do que se esperava.', fx: { pedras: -100, karma: -3, setFlags: ['tregua_mestre_demoniaco'] } } },
      { text: 'Recusar: nada o liga mais à seita.', res: { text: 'O mensageiro sorri com pena. "Ele esperava isso."', fx: { stats: { dao: 2 }, fama: 3 } } },
    ],
  },
];
