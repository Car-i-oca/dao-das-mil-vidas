import type { GameEvent } from '../../types';

/**
 * Lote 3 — Alquimia, ervas e forja de artefatos.
 * Convenções: ervas com idade (100/1.000 anos), fornalhas herdadas que melhoram com o uso,
 * ranks de alquimista, refino de artefatos em quatro etapas (fundição, têmpera, forma, vínculo do espírito).
 */
export const lote3Alquimia: GameEvent[] = [
  /* ===== Ervas ===== */
  {
    id: 'erva_disputada', title: 'Uma Erva, Dois Interessados', rarity: 'comum', cooldown: 25,
    cond: { tierMin: 2, tierMax: 6, local: ['selva', 'montanha'] },
    text: 'No fundo de um barranco, uma erva de cem anos balança ao vento. Do outro lado, um cultivador desconhecido a nota ao mesmo tempo. Os olhares se cruzam, e as mãos vão devagar às armas.',
    choices: [
      { text: 'Propor dividir a erva.', check: { stat: 'car', dif: 1 }, ok: { text: 'O desconhecido hesita e aceita. Cada um leva metade, e algo parecido com respeito.', fx: { item: ['erva_orvalho', 'erva_orvalho'], karma: 3, stats: { car: 1 } } }, fail: { text: 'Ele desconfia da proposta. A tensão cresce, e a erva é arrancada pelo vento.', fx: { stats: { dao: 1 } } } },
      { text: 'Disputar a erva num duelo rápido.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você vence com um golpe limpo, sem matar. A erva é sua.', fx: { item: ['erva_cem_anos'], fama: 3 } }, fail: { text: 'O desconhecido é mais rápido. Você fica com um olho roxo e a erva fica com ele.', fx: { ferida: 1, fama: -1 } } },
      { text: 'Deixar a erva e seguir.', res: { text: 'Uma erva não vale uma morte. O vento carrega o aroma por um tempo.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'colheita_lua_prata', title: 'A Colheita da Lua de Prata', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 7, local: ['selva', 'montanha'] },
    text: 'Há uma flor que só desabrocha sob a lua de prata, uma vez por ano, e murcha ao amanhecer. Quem a colher na hora exata terá uma erva de Qi lunar.',
    choices: [
      { text: 'Esperar a noite inteira, imóvel, até o instante da flor.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'No instante exato, a flor se abre. Você a colhe com respeito, sentindo o brilho nos dedos.', fx: { item: ['erva_lua_prata'], xp: 4 } }, fail: { text: 'Você pisca no momento errado. A flor se abre e murcha diante dos seus olhos.', fx: { stats: { dao: 1 } } } },
      { text: 'Ir apenas observar, sem colher.', res: { text: 'A beleza de uma flor que vive uma noite não precisa de dono.', fx: { karma: 2, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'erva_mil_anos_guardada', title: 'A Raiz de Mil Anos e Sua Guardiã', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 7, local: ['selva', 'montanha', 'ruinas'] },
    text: 'No centro de um vale, uma raiz do tamanho de um braço brilha em dourado. Uma serpente enorme, enrolada ao seu redor, olha para você e sibila. Ela a guarda há séculos.',
    choices: [
      { text: 'Enfrentar a serpente.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'Uma batalha de dois dias. A serpente cai, e você leva a raiz. O mundo parece mais silencioso sem aquele sibilo.', fx: { item: ['erva_mil_anos', 'nucleo_besta_baixo'], fama: 6, xp: 8, ferida: 1 } }, fail: { text: 'A serpente quase o esmaga. Você escapa ferido, com a raiz ainda intocada.', fx: { ferida: 4, xp: 4 } } },
      { text: 'Tentar acalmá-la com música.', check: { stat: ['esp', 'car'], dif: 3, tag: 'besta' }, ok: { text: 'A serpente adormece lentamente. Você corta um pedaço da raiz sem a ferir.', fx: { item: ['erva_mil_anos'], karma: 5, stats: { esp: 1 } } }, fail: { text: 'A música a irrita. Você foge, e a flauta vira lenha.', fx: { ferida: 2 } } },
      { text: 'Deixar a raiz e agradecer à guardiã.', res: { text: 'A serpente baixa a cabeça, como quem entende. Você sente o olhar dela por todo o caminho de volta.', fx: { karma: 6, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'secar_ervas', title: 'A Estação de Secar Ervas', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 6 },
    text: 'O outono chega, e é hora de secar as ervas colhidas: cortar, pendurar, proteger da umidade, afastar roedores. Um erro e meses de trabalho viram mofo.',
    choices: [
      { text: 'Cuidar de cada folha com atenção.', check: { stat: ['comp', 'sor'], dif: 0, tag: 'alquimia' }, ok: { text: 'Ao fim da estação, as ervas estão perfeitas, aromáticas e potentes.', fx: { item: ['erva_orvalho', 'erva_orvalho', 'erva_cem_anos'], xp: 3 } }, fail: { text: 'Metade mofa. O resto ainda serve.', fx: { item: ['erva_orvalho'], xp: 2 } } },
      { text: 'Vender as ervas frescas no mercado.', res: { text: 'Pouco lucro, nenhum trabalho. Mercadores sorriem e pesam as ervas.', fx: { pedras: 12 } } },
    ],
  },

  /* ===== Alquimia ===== */
  {
    id: 'fornalha_herdada', title: 'A Fornalha de Bronze Velho', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 6, path: ['alquimia'], noFlags: ['fornalha_herdada'] },
    text: 'Um velho alquimista, morrendo sem herdeiros, entrega a você uma fornalha de bronze escurecido. "Cada pílula que refinar nela a deixará melhor. Cuide dela, e ela cuidará de você."',
    choices: [
      { text: 'Aceitar a fornalha com reverência.', res: { text: 'O bronze está quente, embora esteja frio há décadas. Você sente a fornalha reconhecendo seu Qi.', fx: { item: ['fornalha_bronze'], setFlags: ['fornalha_herdada'], karma: 4, stats: { comp: 1 } } } },
      { text: 'Recusar: não se sente digno.', res: { text: 'O velho sorri, triste, e entrega a fornalha a outro aprendiz. Você sai com um conselho e as mãos vazias.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'fornalha_cresce', title: 'A Fornalha Que Aprende', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 8, flags: ['fornalha_herdada'], path: ['alquimia'] },
    text: 'A fornalha de bronze rumina entre as pílulas, como quem aprende a cantar. Cada lote refinado deixa nela uma camada de experiência. Hoje, uma runa nova surgiu em sua borda.',
    choices: [
      { text: 'Refinar um lote grande de pílulas.', check: { stat: 'comp', dif: 1, tag: 'alquimia' }, ok: { text: 'A fornalha responde ao seu fogo. As pílulas saem perfeitas, e a runa nova brilha.', fx: { item: ['pilula_qi_media', 'pilula_qi_media', 'pilula_cura'], xp: 6, stats: { comp: 1 } } }, fail: { text: 'O lote falha, mas a fornalha parece compreender e esfria sem estalar.', fx: { xp: 3 } } },
      { text: 'Deixar a fornalha descansar por um ano.', res: { text: 'Todo instrumento precisa de repouso. Quando você volta, a runa está mais nítida.', fx: { anos: 1, stats: { comp: 1 }, xp: 5 } } },
    ],
  },
  {
    id: 'receita_perdida', title: 'A Receita Perdida', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 7, path: ['alquimia'] },
    text: 'No fundo de um velho livro de contas, um mestre alquimista deixou uma anotação: o nome de uma pílula esquecida e três ingredientes. Dois são comuns. O terceiro é uma flor que só nasce onde um raio caiu três vezes.',
    choices: [
      { text: 'Partir em busca da flor.', res: { text: 'Você marca o caminho num mapa mental e se prepara para uma longa viagem.', fx: { setFlags: ['receita_perdida'], agenda: [{ event: 'flor_do_raio', em: [3, 8] }] } } },
      { text: 'Guardar o livro para depois.', res: { text: 'O livro ganha lugar na estante. Receitas não têm pressa.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'flor_do_raio', title: 'A Flor Onde o Raio Caiu', rarity: 'raro', once: true,
    cond: { flags: ['receita_perdida'] },
    text: 'No topo de uma colina queimada, um círculo de grama prateada cerca uma única flor azul que vibra quando você se aproxima. O ar cheira a ozônio. Um raio ainda ecoa no solo.',
    choices: [
      { text: 'Colher a flor e voltar para refinar a pílula.', check: { stat: ['comp', 'esp'], dif: 3, tag: 'alquimia' }, ok: { text: 'Semanas de refino depois, a pílula antiga nasce do seu caldeirão, azul-pálida e silenciosa.', fx: { item: ['pilula_passagem_4', 'pilula_qi_maior'], xp: 14, fama: 6, stats: { comp: 2 }, setFlags: ['receita_refinada'] } }, fail: { text: 'O caldeirão racha na etapa final. A flor se desfaz em cinzas azuis, e a receita guarda seu segredo.', fx: { ferida: 2, xp: 4 } } },
      { text: 'Deixar a flor e proteger a colina.', res: { text: 'Você marca o lugar como santuário. A flor continuará ali, caso o céu queira.', fx: { karma: 8, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'rank_alquimista', title: 'O Exame de Mestre Alquimista', rarity: 'raro', once: true, weight: 5,
    cond: { tierMin: 3, tierMax: 8, path: ['alquimia'], flags: ['alquimista_certificado'] },
    text: 'A Associação de Alquimistas convoca você ao exame de Mestre: refinar três pílulas de graus diferentes diante de cinco juízes. Os que falham raramente tentam outra vez.',
    choices: [
      { text: 'Prestar o exame de Mestre.', check: { stat: 'comp', dif: 4, tag: 'alquimia' }, ok: { text: 'Os juízes provam as pílulas em silêncio, e depois levantam-se. "Mestre", dizem. Um broche de jade pesa em seu peito.', fx: { setFlags: ['mestre_alquimista'], tecnica: ['fogo_coracao'], fama: 14, pedras: 100, stats: { comp: 2 }, item: ['pilula_qi_maior'] } }, fail: { text: 'Você falha na terceira pílula. Os juízes indicam um ano de espera.', fx: { fama: -2, xp: 5, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'pilula_envenenada', title: 'A Encomenda Suspeita', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 7, local: ['cidade'], path: ['alquimia', 'venenos'] },
    text: 'Um cliente rico encomenda um lote de pílulas "para um amigo". Algo em seu olhar incomoda: a pressa, o cuidado em esconder o destinatário e o pagamento adiantado.',
    choices: [
      { text: 'Investigar discretamente o destinatário.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'O destinatário é um rival do cliente. A pílula não curaria, mataria. Você recusa e denuncia.', fx: { karma: 8, fama: 4, pedras: 10 } }, fail: { text: 'Você não descobre nada de útil. Recusa a encomenda por precaução e perde o cliente.', fx: { stats: { dao: 1 } } } },
      { text: 'Aceitar o pagamento e entregar sem perguntar.', res: { text: 'A pílula é entregue. Meses depois, um nobre aparece morto. Você nunca saberá se a causa foi sua mão.', fx: { pedras: 60, karma: -14, corr: 4 } } },
    ],
  },
  {
    id: 'duelo_alquimistas', title: 'O Duelo de Alquimistas', rarity: 'comum', cooldown: 25,
    cond: { tierMin: 2, tierMax: 7, path: ['alquimia'], local: ['cidade'] },
    text: 'Um alquimista de renome desafia você publicamente: quem refinar a melhor pílula de Qi num só dia fica com a clientela do outro. A praça enche.',
    choices: [
      { text: 'Aceitar e refinar com tudo que sabe.', check: { stat: 'comp', dif: 3, tag: 'alquimia' }, ok: { text: 'Sua pílula brilha em azul-profundo. O rival cumprimenta, humilhado, e a clientela é sua.', fx: { fama: 10, pedras: 70, stats: { comp: 1 } } }, fail: { text: 'Sua pílula perde por pouco. A clientela migra, e você aprende o preço do orgulho.', fx: { fama: -4, stats: { comp: 1 } } } },
      { text: 'Recusar e propor uma colaboração.', check: { stat: 'car', dif: 2 }, ok: { text: 'Em vez de duelo, uma sociedade. Vocês refinam juntos por décadas, e ambos prosperam.', fx: { fama: 6, pedras: 50, karma: 4, stats: { car: 1 } } }, fail: { text: 'O rival ri e se afasta. A oferta fica no ar, vazia.', fx: { stats: { car: 1 } } } },
    ],
  },
  {
    id: 'aprendiz_alquimista', title: 'O Aprendiz de Alquimia', rarity: 'raro', once: true, weight: 8,
    cond: { tierMin: 3, path: ['alquimia'], flags: ['mestre_alquimista'] },
    text: 'Uma jovem de mãos queimadas e olhos curiosos pede para ser sua aprendiz. Sem talento especial, mas com disciplina rara. Ensiná-la custará tempo, ervas e paciência.',
    choices: [
      { text: 'Aceitá-la como aprendiz.', res: { text: 'Os primeiros anos são caóticos: panelas queimadas, receitas trocadas. Aos poucos, a aprendiz amadurece.', fx: { karma: 6, stats: { dao: 1, car: 1 }, setFlags: ['aprendiz_alquimista'], agenda: [{ event: 'aprendiz_retorna', em: [30, 70] }] } } },
      { text: 'Recusar: seu tempo é limitado.', res: { text: 'Ela agradece com educação e parte, e você fica com uma estranha sensação de ter deixado cair uma xícara.', fx: {} } },
    ],
  },
  {
    id: 'aprendiz_retorna', title: 'A Pílula da Aprendiz', rarity: 'raro', once: true,
    cond: { flags: ['aprendiz_alquimista'] },
    text: 'Uma Mestra de aura calma o procura, com uma caixa de jade nas mãos: "Mestre, a primeira pílula que criei sozinha, com a técnica que o senhor me ensinou. Quero que seja a primeira a experimentar."',
    choices: [
      { text: 'Aceitar a pílula e prová-la.', res: { text: 'É uma pílula de grau alto, límpida, memorável. Você chora, em silêncio, de orgulho.', fx: { xp: 30, vida: 20, karma: 6, fama: 6, stats: { dao: 2 } } } },
      { text: 'Pedir que ela fique com a pílula e a venda para crescer.', res: { text: 'Ela insiste, e vocês dividem o lucro. Uma amizade longa nasce.', fx: { pedras: 80, karma: 4, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'cura_do_imperador', title: 'A Doença do Imperador', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 8, path: ['alquimia'] },
    text: 'Os médicos da corte fracassaram. O Imperador de um reino mortal, febril e pálido, é trazido a você como último recurso. A corte olha, em silêncio, sem esperanças.',
    choices: [
      { text: 'Refinar uma pílula específica para a doença.', check: { stat: ['comp', 'esp'], dif: 4, tag: 'alquimia' }, ok: { text: 'Três dias e três noites ao fogo. O Imperador acorda, vivo. A corte se curva diante de você.', fx: { fama: 16, pedras: 220, karma: 8, item: ['pilula_longevidade'], stats: { comp: 1 } } }, fail: { text: 'A pílula é insuficiente. O Imperador morre três dias depois. A corte não o culpa, mas o silêncio é pesado.', fx: { fama: -2, karma: -2, stats: { dao: 1 } } } },
      { text: 'Recusar: nenhuma pílula salva quem já se foi.', res: { text: 'Você explica, com tristeza, o limite da alquimia. A corte entende, e agradece pela honestidade.', fx: { karma: 2, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'pilula_sem_nome', title: 'A Pílula Sem Nome', rarity: 'lendario', once: true,
    cond: { tierMin: 4, path: ['alquimia'], stat: { comp: 28 } },
    text: 'Depois de décadas de prática, você entende o que os grandes mestres entenderam: a pílula suprema não se copia de receita. Ela nasce quando o alquimista e o fogo se tornam a mesma coisa.',
    choices: [
      { text: 'Refinar a Pílula Sem Nome, usando tudo o que aprendeu.', check: { stat: ['comp', 'esp', 'dao'], dif: 6, tag: 'alquimia' }, ok: { text: 'No quadragésimo dia, a pílula se forma, sem cor e sem forma. O céu escurece, e você sabe que a criou.', fx: { item: ['pilula_sem_nome'], fama: 24, stats: { comp: 3, dao: 3 }, xp: 14 } }, fail: { text: 'O caldeirão se abre em luz. Nada sobra, além de lições e cinzas douradas.', fx: { ferida: 3, xp: 12, stats: { comp: 2 } } } },
      { text: 'Refinar a si mesmo como a pílula suprema.', check: { stat: ['comp', 'esp', 'dao'], dif: 7, tag: 'alquimia' }, ok: { text: 'Seu corpo se dissolve no fogo. Na fornalha, uma pílula perfeita brilha. Séculos depois, alguém a tomará e saberá quem você foi.', fx: { fim: 'pilula' } }, fail: { text: 'O fogo o recusa. Você sai do caldeirão chamuscado, vivo, e um pouco mais sábio.', fx: { ferida: 4, stats: { dao: 2 } } } },
    ],
  },

  /* ===== Forja: o Artefato Natal em quatro etapas ===== */
  {
    id: 'forja_natal_inicio', title: 'O Artefato Natal: Fundição', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, pedrasMin: 40 },
    text: 'Um ferreiro ancião ensina uma tradição antiga: um cultivador deve forjar o próprio artefato natal, que crescerá com ele pela vida inteira. Quatro etapas: fundição, têmpera, forma e vínculo do espírito. A primeira exige minério raro.',
    choices: [
      { text: 'Comprar o minério e iniciar a fundição (40 pedras).', custo: 40, check: { stat: ['fis', 'comp'], dif: 2, tag: 'forja' }, ok: { text: 'O minério vira um lingote cintilante. A primeira etapa está completa.', fx: { setFlags: ['forja_fusao'], tecnica: ['martelo_ressonante'], agenda: [{ event: 'forja_natal_tempera', em: [1, 3] }] } }, fail: { text: 'O minério racha ao esfriar. Você perde parte do material, mas a técnica continua possível.', fx: { setFlags: ['forja_fusao', 'forja_falha'], agenda: [{ event: 'forja_natal_tempera', em: [1, 3] }] } } },
      { text: 'Não: forjar o próprio artefato é arrogância demais.', res: { text: 'O ferreiro assente. "Há artefatos que não pedem para nascer."', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'forja_natal_tempera', title: 'O Artefato Natal: Têmpera', rarity: 'raro', once: true,
    cond: { flags: ['forja_fusao'] },
    text: 'O lingote espera no suporte da forja. Agora é a têmpera: alternar fogo e água gelada, repetidamente, por sete dias. O metal precisa de dor para aprender força.',
    choices: [
      { text: 'Temperar com água de nascente.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'forja' }, ok: { text: 'O metal canta a cada mergulho. Ao fim, é denso e silencioso como uma pedra de rio.', fx: { setFlags: ['forja_tempera'], agenda: [{ event: 'forja_natal_forma', em: [1, 3] }] } }, fail: { text: 'Uma rachadura fina surge no metal. Você prossegue, mas um defeito fica.', fx: { setFlags: ['forja_tempera', 'forja_falha'], agenda: [{ event: 'forja_natal_forma', em: [1, 3] }] } } },
      { text: 'Temperar com gelo de montanha (mais caro e mais lento).', custo: 20, check: { stat: ['fis', 'dao'], dif: 1, tag: 'forja' }, ok: { text: 'O gelo traz uma pureza rara ao metal. Uma etapa difícil, vencida com cuidado.', fx: { setFlags: ['forja_tempera'], stats: { dao: 1 }, agenda: [{ event: 'forja_natal_forma', em: [1, 3] }] } }, fail: { text: 'O gelo derrete rápido demais. O metal sai irregular.', fx: { setFlags: ['forja_tempera', 'forja_falha'], agenda: [{ event: 'forja_natal_forma', em: [1, 3] }] } } },
    ],
  },
  {
    id: 'forja_natal_forma', title: 'O Artefato Natal: Forma', rarity: 'raro', once: true,
    cond: { flags: ['forja_tempera'] },
    text: 'O metal está pronto para ganhar forma. Uma lâmina, um escudo, um anel, um bastão, uma arma qualquer. A forma que você escolher moldará o artefato para sempre.',
    choices: [
      { text: 'Dar forma de lâmina curta.', check: { stat: ['fis', 'comp'], dif: 2, tag: 'forja' }, ok: { text: 'A lâmina nasce afiada, leve e sábia. Cada golpe do martelo a molda como uma ideia.', fx: { setFlags: ['forja_forma', 'forja_lamina'], agenda: [{ event: 'forja_natal_espirito', em: [1, 3] }] } }, fail: { text: 'O fio sai desigual. Você corrige, mas a forma tem uma imperfeição.', fx: { setFlags: ['forja_forma', 'forja_falha', 'forja_lamina'], agenda: [{ event: 'forja_natal_espirito', em: [1, 3] }] } } },
      { text: 'Dar forma de anel de jade e metal.', check: { stat: ['comp', 'esp'], dif: 2, tag: 'forja' }, ok: { text: 'O anel é fino como um fio de luar. Cabe no dedo como se sempre tivesse estado lá.', fx: { setFlags: ['forja_forma', 'forja_anel'], agenda: [{ event: 'forja_natal_espirito', em: [1, 3] }] } }, fail: { text: 'O anel sai espesso e desajeitado. Ainda funcional, mas feio.', fx: { setFlags: ['forja_forma', 'forja_falha', 'forja_anel'], agenda: [{ event: 'forja_natal_espirito', em: [1, 3] }] } } },
    ],
  },
  {
    id: 'forja_natal_espirito', title: 'O Artefato Natal: Vínculo do Espírito', rarity: 'raro', once: true,
    cond: { flags: ['forja_forma'] },
    text: 'A última etapa é a mais difícil: ligar um fragmento do seu espírito ao artefato, para que ele cresça com você e responda ao seu chamado. Quem falha aqui pode perder parte da alma.',
    choices: [
      { text: 'Ligar o espírito ao artefato (se tudo correu bem).', cond: { noFlags: ['forja_falha'] }, check: { stat: ['esp', 'dao'], dif: 3, tag: 'forja' }, ok: { text: 'Uma luz percorre o artefato como um suspiro. Ele agora vive. Algo em você sorri e se alivia.', fx: { item: ['artefato_natal'], stats: { esp: 1, dao: 1 }, xp: 10, fama: 4, clearFlags: ['forja_fusao', 'forja_tempera', 'forja_forma'] } }, fail: { text: 'O vínculo falha por um instante, e parte do seu espírito sangra. Você sobrevive, e o artefato também, menos poderoso.', fx: { item: ['artefato_natal_menor'], ferida: 3, stats: { esp: -1 }, clearFlags: ['forja_fusao', 'forja_tempera', 'forja_forma'] } } },
      { text: 'Ligar o espírito ao artefato imperfeito.', cond: { flags: ['forja_falha'] }, check: { stat: ['esp', 'dao'], dif: 2, tag: 'forja' }, ok: { text: 'O artefato não é perfeito, mas é seu. O vínculo se estabelece com um estalo quente.', fx: { item: ['artefato_natal_menor'], stats: { esp: 1 }, xp: 6, clearFlags: ['forja_fusao', 'forja_tempera', 'forja_forma', 'forja_falha'] } }, fail: { text: 'O vínculo se rompe. O artefato se despedaça em cacos de metal e brasas.', fx: { ferida: 3, stats: { esp: -1 }, clearFlags: ['forja_fusao', 'forja_tempera', 'forja_forma', 'forja_falha'] } } },
    ],
  },
  {
    id: 'minerio_celeste', title: 'A Queda do Ferro Celeste', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 2, tierMax: 7, local: ['montanha', 'selva', 'ruinas'] },
    text: 'Uma bola de fogo risca o céu e cai no vale ao lado. Quando você chega, restam uma cratera fumegante e um bloco de metal escuro, quente como brasa, que zumbe como um enxame.',
    choices: [
      { text: 'Carregar o bloco inteiro até um ferreiro.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'corpo' }, ok: { text: 'O ferreiro arregala os olhos: ferro celeste, raríssimo. Ele paga uma fortuna e ainda lhe deve favores.', fx: { pedras: 120, item: ['lingote_celeste'], fama: 3 } }, fail: { text: 'O metal queima suas mãos e você solta o bloco. Um bandido o carrega, enquanto você grita de dor.', fx: { ferida: 2 } } },
      { text: 'Quebrar uma pequena parte e deixar o resto.', res: { text: 'Um lasca basta para uma boa arma. O resto fica para quem vier depois.', fx: { item: ['lingote_celeste'], karma: 3 } } },
    ],
  },
  {
    id: 'espada_viva', title: 'A Espada Que Escuta', rarity: 'raro', once: true,
    cond: { tierMin: 3, tierMax: 8, path: ['espada'], item: 'espada_aprendiz' },
    text: 'Anos de treino com a mesma lâmina deixaram marcas: ela parece vibrar quando você pensa em golpes. Um velho mestre ferreiro diz: "Sua espada quer um espírito. Dê-lhe um."',
    choices: [
      { text: 'Atar um fragmento do seu espírito à espada.', check: { stat: ['esp', 'dao'], dif: 4, tag: 'espada' }, ok: { text: 'A espada acorda. Ela ouve seus pensamentos e responde com um tilintar. Nenhuma lâmina será mais leal.', fx: { tecnica: ['selo_espirito_arma'], stats: { dao: 2, esp: 1 }, xp: 12, fama: 6 } }, fail: { text: 'A espada resiste, indignada. Você perde um pouco de energia e sai ofendido.', fx: { ferida: 2, stats: { dao: 1 } } } },
      { text: 'Preservar a espada como ferramenta, sem espírito.', res: { text: 'O velho ferreiro dá de ombros. "Uma boa lâmina é mais honesta sem alma."', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'armadura_escamas', title: 'A Armadura de Escamas', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 2, tierMax: 7, path: ['corpo', 'budista'], item: 'nucleo_besta_baixo' },
    text: 'Um armeiro de olhar severo examina o núcleo de besta que você carrega. "Com as escamas certas e um pouco de coragem, isso vira uma armadura que você nunca mais tirará."',
    choices: [
      { text: 'Encomendar a armadura (60 pedras).', custo: 60, res: { text: 'Semanas depois, a armadura chega: leve, escura e quase viva. Você sente a escama pulsando sob a pele.', fx: { removeItem: ['nucleo_besta_baixo'], item: ['armadura_escamas'], stats: { fis: 1 } } } },
      { text: 'Guardar o núcleo para outro uso.', res: { text: 'O armeiro dá de ombros. "Pense com calma."', fx: {} } },
    ],
  },
  {
    id: 'artefato_amaldicoado', title: 'O Artefato Que Sussurra', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 2, tierMax: 7 },
    text: 'Num leilão discreto, uma lâmina com runas gastas é oferecida por um preço absurdamente baixo. O leiloeiro tem pressa de se livrar dela. Algo na lâmina sussurra em línguas esquecidas.',
    choices: [
      { text: 'Comprar a lâmina (30 pedras).', custo: 30, check: { stat: ['dao', 'esp'], dif: 3, tag: 'mente' }, ok: { text: 'Você controla o sussurro. A lâmina é poderosa e fica sob seu domínio, por ora.', fx: { item: ['espada_aprendiz'], corr: 8, stats: { dao: 1 }, xp: 8 } }, fail: { text: 'O sussurro vence. Em dias, você não dorme mais, e sente a lâmina pensando por você.', fx: { item: ['espada_aprendiz'], corr: 20, ferida: 1 } } },
      { text: 'Alertar os guardas sobre o leilão.', res: { text: 'O leiloeiro é preso, a lâmina é selada. A cidade dorme melhor.', fx: { karma: 8, fama: 4 } } },
    ],
  },
  {
    id: 'leilao_raro', title: 'O Leilão dos Artefatos Raros', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 3, tierMax: 8, local: ['cidade'], pedrasMin: 150 },
    text: 'Uma vez a cada vinte anos, o Pavilhão de Tesouros organiza um leilão de peças que nem os anciãos veem com frequência. As ofertas começam em quantias que dariam para comprar uma aldeia.',
    choices: [
      { text: 'Disputar uma Bolsa Celeste (200 pedras).', custo: 200, check: { stat: ['car', 'sor'], dif: 3 }, ok: { text: 'Em lances sucessivos, você vence. A bolsa é leve, discreta e imensa por dentro.', fx: { item: ['bolsa_celeste'] } }, fail: { text: 'Um comprador desconhecido supera seu lance no último minuto. Você recebe de volta parte das pedras.', fx: { pedras: 140 } } },
      { text: 'Disputar um Anel de Jade Frio (120 pedras).', custo: 120, res: { text: 'Mais acessível e igualmente útil. Você leva o anel sem disputas.', fx: { item: ['anel_jade_frio'] } } },
      { text: 'Observar e aprender sobre os compradores.', res: { text: 'Cada lance revela uma história de poder e dívida. Você anota nomes, rostos e hábitos.', fx: { stats: { car: 1, comp: 1 } } } },
    ],
  },
];
