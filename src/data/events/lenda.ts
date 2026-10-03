import type { GameEvent } from '../../types';

/** Eventos raros, lendários, de alto reino e de legado. */
export const lenda: GameEvent[] = [
  /* ===== O Velho no Anel ===== */
  {
    id: 'anel_negro', title: 'O Anel Negro e Opaco', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 4 },
    text: 'Você tropeça em um anel negro e opaco entre raízes e pedras. Ao tocá-lo, sua mão formiga e uma voz muito fraca sussurra: "Finalmente..."',
    choices: [
      { text: 'Colocar o anel no dedo.', res: { text: 'O anel se ajusta como se fosse feito para você. A voz silencia. Você sente que alguém o observa de dentro.', fx: { item: ['anel_do_velho'], setFlags: ['velho_no_anel'], agenda: [{ event: 'velho_desperta', em: [4, 12] }], stats: { comp: 1 } } } },
      { text: 'Guardá-lo sem usar.', res: { text: 'O anel pesa no bolso. Algo nele espera.', fx: { item: ['anel_do_velho'], setFlags: ['velho_no_anel'], agenda: [{ event: 'velho_desperta', em: [6, 15] }] } } },
      { text: 'Enterrar o anel de novo.', res: { text: 'Você o cobre de terra. Alguns tesouros são armadilhas bonitas.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'velho_desperta', title: 'O Velho Desperta', rarity: 'raro', once: true,
    cond: { flags: ['velho_no_anel'] },
    text: 'Uma voz rouca ressoa na sua mente: "Sou {mentor}, alma errante de um cultivador antigo. Há séculos esperava alguém com sua teimosia. Aceita ser meu herdeiro?"',
    choices: [
      { text: 'Aceitar o aprendizado.', res: { text: 'O Velho ri satisfeito. "Prepare-se, criança. Vou te ensinar tudo que sei, e também o que errei."', fx: { setFlags: ['mestre_do_anel'], tecnica: ['forja_sol_interior'], xp: 20, stats: { comp: 3, dao: 1 }, agenda: [{ event: 'velho_exige', em: [15, 35] }] } } },
      { text: 'Desconfiar e pedir provas.', check: { stat: ['comp', 'esp'], dif: 2 }, ok: { text: 'Você extrai verdades parciais, mas verdades. O Velho concorda em cooperar sem exigir mais.', fx: { setFlags: ['mestre_do_anel'], tecnica: ['forja_sol_interior'], xp: 12, stats: { comp: 2 }, agenda: [{ event: 'velho_exige', em: [15, 35] }] } }, fail: { text: 'O Velho se ofende e cala. Por anos, o anel permanece mudo.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'velho_exige', title: 'O Preço do Velho', rarity: 'raro', once: true,
    cond: { flags: ['mestre_do_anel'], tierMin: 2 },
    text: 'O Velho confessa: "Tudo tem preço, criança. Quero que me ajude a recuperar meu corpo em uma ruína ao norte. Ou, se preferir, que me deixe tomar o seu."',
    choices: [
      { text: 'Ajudar a recuperar o corpo do Velho.', check: { stat: ['esp', 'comp'], dif: 3 }, ok: { text: 'Após semanas de perigo, o Velho recupera forma física e vira seu aliado e protetor.', fx: { xp: 25, stats: { esp: 2, dao: 2 }, karma: 8, fama: 8, setFlags: ['velho_livre'] } }, fail: { text: 'A ruína é perigosa demais. Vocês fogem. O Velho resmunga.', fx: { ferida: 2, xp: 6 } } },
      { text: 'Recusar e quebrar o anel.', check: { stat: 'dao', dif: 2 }, ok: { text: 'O anel racha e o Velho some com um suspiro. O que ele ensinou ficou.', fx: { removeItem: ['anel_do_velho'], stats: { dao: 3 }, karma: -4 } }, fail: { text: 'O Velho tenta tomar seu corpo! Você resiste por pouco, expulsando-o à força.', fx: { removeItem: ['anel_do_velho'], ferida: 3, stats: { dao: 2 } } } },
    ],
  },

  /* ===== Raros e lendários ===== */
  {
    id: 'mestre_misterioso', title: 'O Encontro com um Mestre Oculto', rarity: 'lendario', once: true,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'Numa estrada comum, um velho comum oferece uma tigela de chá. Cada gole traz uma lição que nenhuma seita ensinaria.',
    choices: [
      { text: 'Beber o chá e ouvir calado.', res: { text: 'Horas depois, o velho se foi. O chá, o céu e a estrada pareciam a mesma coisa.', fx: { xp: 40, stats: { dao: 4, comp: 3, esp: 2 }, tecnica: ['sutra_vazio_calmo'] } } },
      { text: 'Perguntar: "Quem é você?"', res: { text: '"Ninguém", diz o velho, sorrindo. "Exatamente como você deveria ser." Ele parte.', fx: { stats: { dao: 3, comp: 1 }, xp: 15 } } },
    ],
  },
  {
    id: 'heranca_imortal', title: 'A Herança de um Imortal', rarity: 'lendario', once: true,
    cond: { tierMin: 3, tierMax: 7 },
    text: 'Um pavilhão suspenso no céu ressoa com música antiga. Nele, um imortal deixou três presentes: uma técnica, um artefato e uma bênção. Só um pode ser levado.',
    choices: [
      { text: 'A técnica: Grande Sutra do Ciclo.', check: { stat: ['comp', 'dao'], dif: 5, tag: 'mente' }, ok: { text: 'Você a compreende e a memoriza. Morte e renascimento passam a ser sua respiração.', fx: { tecnica: ['sutra_do_ciclo'], xp: 25, stats: { comp: 3 } } }, fail: { text: 'A técnica é grande demais. Você capta uma parte e parte envergonhado.', fx: { xp: 12 } } },
      { text: 'O artefato: Contas de Madeira de Trovão.', res: { text: 'As contas pulsam como um coração. Raios apagados despertam.', fx: { item: ['contas_trovao'], stats: { esp: 2 }, xp: 10 } } },
      { text: 'A bênção: longevidade.', res: { text: 'Uma luz suave o envolve. Anos adicionais se acomodam em seus ossos.', fx: { vida: 60, stats: { fis: 2 } } } },
    ],
  },
  {
    id: 'dragao_adormecido', title: 'O Dragão Adormecido', rarity: 'lendario', once: true,
    cond: { tierMin: 4 },
    text: 'No coração de um vulcão extinto, um dragão ancestral repousa em sono sem sonhos. Cada respiração dele é um século de Qi.',
    choices: [
      { text: 'Absorver o Qi que escapa de suas narinas.', check: { stat: ['esp', 'fis', 'dao'], dif: 5 }, ok: { text: 'Você bebe um oceano de Qi puro. O dragão abre um olho, grunhe e volta a dormir.', fx: { xp: 70, stats: { esp: 3, fis: 3 }, fama: 10, vida: 40 } }, fail: { text: 'O dragão acorda irritado. Um sopro do seu hálito e você é lançado para longe.', fx: { ferida: 4, xp: 10 } } },
      { text: 'Cantar para acalmar o dragão.', check: { stat: ['car', 'esp'], dif: 4 }, ok: { text: 'O dragão sorri, em sonhos. Uma escama dourada cai ao seu lado.', fx: { pedras: 300, stats: { car: 2, esp: 2 }, fama: 12 } }, fail: { text: 'Sua voz falha. O dragão se mexe e você foge sem olhar para trás.', fx: { ferida: 1 } } },
    ],
  },
  {
    id: 'fenix_do_ceu', title: 'A Fênix Caída', rarity: 'lendario', once: true,
    cond: { tierMin: 3 },
    text: 'Uma ave de chamas cai de uma nuvem rubra, ferida por algum inimigo invisível. Suas penas queimam a grama ao redor.',
    choices: [
      { text: 'Aproximar-se e curar a fênix.', check: { stat: ['esp', 'dao'], dif: 4 }, ok: { text: 'A fênix se renova em luz. Uma pena dourada pousa em sua mão: um presente eterno.', fx: { stats: { esp: 3, dao: 3 }, karma: 15, xp: 30, vida: 40, fama: 10 } }, fail: { text: 'O calor é insuportável. Você se queima, mas a ave sobrevive e parte agradecida.', fx: { ferida: 3, karma: 6, stats: { dao: 1 } } } },
      { text: 'Aproveitar para caçá-la.', check: { stat: ['fis', 'esp'], dif: 6, tag: 'combate' }, ok: { text: 'Você cai sobre a fênix e extrai um núcleo ardente. O preço no karma é enorme.', fx: { item: ['nucleo_besta_alto'], pedras: 200, karma: -40, corr: 10 } }, fail: { text: 'A fênix, ferida mas feroz, devolve o golpe em chamas sagradas.', fx: { ferida: 5, karma: -10 } } },
    ],
  },
  {
    id: 'espada_celeste', title: 'A Espada que Escolhe', rarity: 'lendario', once: true,
    cond: { tierMin: 3, path: ['espada'], stat: { dao: 20 } },
    text: 'No topo de um pico congelado, uma espada sem bainha espera, cravada na rocha. Muitos tentaram erguê-la. Ela escolhe quem quer.',
    choices: [
      { text: 'Tocar o punho da espada.', check: { stat: ['dao', 'fis'], dif: 5, tag: 'espada' }, ok: { text: 'A espada se solta como se esperasse por você. Uma voz sem palavras ensina o golpe que corta o céu.', fx: { tecnica: ['espada_corta_ceu'], stats: { dao: 4, fis: 2 }, fama: 12 } }, fail: { text: 'A espada recusa. Um choque o joga de costas.', fx: { ferida: 2, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'ruptura_do_tempo', title: 'A Fenda do Tempo', rarity: 'lendario', once: true, weight: 4,
    cond: { tierMin: 3, ageMin: 60 },
    text: 'Uma rachadura prateada se abre no ar, e através dela você vê o seu eu mais jovem, num pátio de seita, rindo. Uma voz oferece: "Volte. Mas pague."',
    choices: [
      { text: 'Atravessar a fenda e reviver 25 anos.', res: { text: 'O tempo gira. Você se vê trinta anos mais jovem, com todas as memórias e cicatrizes do que ainda não aconteceu.', fx: { anos: -25, stats: { comp: 3, dao: 2 }, xp: -20, karma: -5, setFlags: ['regressor'] } } },
      { text: 'Recusar. O tempo é rio de um só sentido.', res: { text: 'A fenda se fecha. Você respira com alívio e perda.', fx: { stats: { dao: 3 } } } },
    ],
  },
  {
    id: 'tesouro_seita_destruida', title: 'Os Escombros de uma Seita', rarity: 'raro', cooldown: 30,
    cond: { tierMin: 2, tierMax: 6 },
    text: 'Uma seita foi destruída por um massacre. Pavilhões queimados, cadáveres endurecidos. Entre os escombros, cofres selados.',
    choices: [
      { text: 'Enterrar os mortos antes de saquear.', res: { text: 'Três dias cavando. Os espíritos agradecem e indicam um cofre intacto.', fx: { karma: 12, pedras: 60, item: ['manual_forja_sol'], stats: { dao: 1 } } } },
      { text: 'Saquear rapidamente.', check: { stat: ['sor', 'comp'], dif: 2 }, ok: { text: 'Você leva pedras e pílulas e foge antes de qualquer saqueador chegar.', fx: { pedras: 90, item: ['pilula_qi_maior'], karma: -8 } }, fail: { text: 'Uma armadilha da seita ainda funciona. O saque custa sangue.', fx: { ferida: 2, pedras: 20, karma: -8 } } },
    ],
  },
  {
    id: 'conclave_grandes', title: 'O Conclave dos Grandes', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 4 },
    text: 'Os maiores cultivadores do continente convocam um conclave. Em pauta: um demônio ancestral desperta numa cordilheira distante.',
    choices: [
      { text: 'Participar e lutar ao lado dos grandes.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'A batalha é descomunal. Quando termina, seu nome está nos pergaminhos dos heróis.', fx: { fama: 30, xp: 30, stats: { dao: 2, esp: 2 }, karma: 10, ferida: 2 } }, fail: { text: 'O demônio é mais forte que o previsto. Você sobrevive por sorte e muita dor.', fx: { ferida: 4, fama: 10, xp: 8 } } },
      { text: 'Enviar auxílio em suprimentos e ficar longe.', custo: 100, res: { text: 'Sua ajuda é discreta, mas útil. Muitos se lembrarão.', fx: { fama: 8, karma: 6 } } },
    ],
  },
  {
    id: 'guerra_entre_seitas', title: 'Guerra Entre Seitas', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 3, tierMax: 7 },
    text: 'Duas grandes seitas vão à guerra por um veio espiritual. Sangue escorre pelos vales e ambos os lados oferecem recompensas por apoio.',
    choices: [
      { text: 'Juntar-se à seita mais forte.', res: { text: 'Você ganha recursos, mas perde princípios. Cada vitória pesa.', fx: { pedras: 120, fama: 6, karma: -8, xp: 10 } } },
      { text: 'Atuar como mediador.', check: { stat: ['car', 'dao'], dif: 4 }, ok: { text: 'Sua autoridade impõe uma trégua. Dois povos agradecem.', fx: { fama: 20, karma: 15, stats: { car: 2, dao: 2 } } }, fail: { text: 'Ninguém o ouve e a guerra continua. Você se retira desolado.', fx: { fama: -2 } } },
      { text: 'Ficar completamente fora.', res: { text: 'Neutralidade é luxo de quem pode pagar. Você paga.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'cometa_de_qi', title: 'Chuva de Estrelas Espirituais', rarity: 'raro', cooldown: 70,
    cond: { tierMin: 3 },
    text: 'O céu se enche de rastros luminosos: uma chuva de estrelas espirituais que aparece uma vez a cada século. Quem absorve o Qi corretamente, avança como em décadas de cultivo.',
    choices: [
      { text: 'Subir ao pico mais alto e absorver.', check: { stat: ['esp', 'comp'], dif: 3, tag: 'qi' }, ok: { text: 'Fios de luz entram em seus meridianos como agulhas de nuvem.', fx: { xp: 45, stats: { esp: 2 } } }, fail: { text: 'Você absorve demais e vomita sangue claro.', fx: { xp: 15, ferida: 2 } } },
    ],
  },
  {
    id: 'rei_mortal_pede', title: 'O Rei Mortal Pede Ajuda', rarity: 'raro', cooldown: 50,
    cond: { tierMin: 3 },
    text: 'O rei de um império mortal implora de joelhos: uma praga espiritual devora seus campos. Ele oferece ouro, títulos e o que for preciso.',
    choices: [
      { text: 'Purificar a terra por três meses.', check: { stat: ['esp', 'comp'], dif: 3 }, ok: { text: 'A praga cede. O povo canta seu nome por gerações.', fx: { pedras: 150, fama: 15, karma: 12, stats: { dao: 1 } } }, fail: { text: 'A praga é teimosa. Você ameniza o pior, mas não resolve.', fx: { pedras: 30, fama: 3, karma: 4 } } },
      { text: 'Recusar: mortais não são seu assunto.', res: { text: 'Você deixa o reino à própria sorte. Os mortais sofrem.', fx: { karma: -5, stats: { dao: -1 } } } },
    ],
  },

  /* ===== Legado e escolhas finais ===== */
  {
    id: 'fundar_seita', title: 'Fundar uma Seita', rarity: 'raro', once: true, weight: 3,
    cond: { tierMin: 3, fameMin: 40, pedrasMin: 100 },
    text: 'Seu nome já pesa. Discípulos pedem orientação, mercadores oferecem apoio e uma montanha vazia espera um estandarte. Fundar uma seita é deixar um legado, mas também um alvo.',
    choices: [
      { text: 'Fundar a seita com todo o seu cabedal.', custo: 100, check: { stat: ['car', 'comp'], dif: 4 }, ok: { text: 'O pavilhão se ergue e os primeiros discípulos juram lealdade. Séculos depois, ainda erguerão incenso em seu nome.', fx: { fim: 'fundador' } }, fail: { text: 'Falta apoio, sobram intrigas. O projeto é adiado e as pedras escoam.', fx: { fama: -2, stats: { car: 1 } } } },
      { text: 'Recusar. Seu caminho é solitário.', res: { text: 'Você declina com respeito. Não é hora de pesos extras.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'abandonar_caminho', title: 'Abandonar o Caminho', rarity: 'raro', once: true, weight: 1.5,
    cond: { tierMin: 1, tierMax: 3, karmaMin: 5 },
    text: 'Os anos cansam. Um dia, ao ver crianças correndo atrás de pipas, você se pergunta o preço que pagou. Plantar, pescar e ver os netos crescerem parece um segredo mais antigo que o Dao.',
    choices: [
      { text: 'Voltar à vida comum.', res: { text: 'Você pendura a espada e planta feijão. O mundo cultivador segue sem perceber.', fx: { fim: 'mortal' } } },
      { text: 'Persistir no caminho.', res: { text: 'O desejo de ir mais longe responde por você. Você aperta o punho e continua.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'regressao_visao', title: 'Visões de Outra Vida', rarity: 'raro', once: true,
    cond: { flags: ['reencarnado'], tierMin: 1 },
    text: 'Lembranças da vida passada voltam em ondas. Você vê o rosto de quem o matou, a seita que o traiu e o erro que custou tudo.',
    choices: [
      { text: 'Usar o conhecimento para evitar o antigo erro.', check: { stat: ['comp', 'dao'], dif: 2 }, ok: { text: 'Você muda um passo, e o futuro desliza para um caminho melhor.', fx: { xp: 20, stats: { comp: 2, dao: 2 }, pedras: 40 } }, fail: { text: 'O conhecimento é velho demais; o mundo mudou. Você hesita.', fx: { xp: 6, stats: { dao: 1 } } } },
      { text: 'Buscar vingança contra quem o matou na vida passada.', res: { text: 'A sede de vingança consome anos, mas dá motivo para crescer.', fx: { xp: 15, corr: 5, stats: { dao: -1, fis: 2 } } } },
    ],
  },
  {
    id: 'ancestral_ensina', title: 'A Voz do Ancestral', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['cla_reconstruido'] },
    text: 'No altar do {cla} reconstruído, a placa de um ancestral brilha em resposta. "Você restaurou o que perdemos", diz uma voz. "Receba o que guardamos."',
    choices: [
      { text: 'Receber a herança do clã.', res: { text: 'Uma luz envolve seu corpo, e um manual antigo se abre diante de você.', fx: { item: ['manual_selo_portas', 'pilula_passagem_3'], xp: 20, stats: { comp: 2, car: 2 }, fama: 8 } } },
    ],
  },
  {
    id: 'amigo_tribulacao', title: 'Um Amigo na Tribulação', rarity: 'raro', once: true,
    cond: { tierMin: 3, flags: ['aliado_amigo'] },
    text: '{amigo}, seu velho amigo, está prestes a enfrentar uma tribulação. Ele pede que você guarde os arredores contra intrusos.',
    choices: [
      { text: 'Proteger o amigo durante a tribulação.', check: { stat: ['fis', 'esp'], dif: 3, tag: 'combate' }, ok: { text: 'Raios caem. Inimigos tentam entrar. Você os detém. {amigo} sobrevive e rompe o limite.', fx: { fama: 10, karma: 10, xp: 12, stats: { dao: 2 }, item: ['pilula_longevidade'] } }, fail: { text: 'Você falha em proteger a todos. {amigo} sobrevive, mas ferido.', fx: { ferida: 3, karma: 4, xp: 4 } } },
    ],
  },
];
