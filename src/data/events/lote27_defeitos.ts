import type { GameEvent } from '../../types';
import type { Molde } from '../opcoes';

/**
 * Lote 27 — Defeitos de nascença. Cada defeito:
 *  - fecha opções no jogo (ver bloqueadaPorDefeito no motor): impulsivo não recua, orgulhoso não se curva, avarento não paga, covarde não encara;
 *  - tem 4 eventos próprios que pesam na vida e um 5º, de redenção, cuja escolha difícil SUPERA o defeito (fx.superar);
 *  - tem opções exclusivas em eventos comuns (moldes) e um final de redenção que só quem o superou alcança.
 */
const F = (f: string, min = 1, max = 8, extra: Record<string, unknown> = {}) => ({ flaw: [f], tierMin: min, tierMax: max, ...extra });

export const lote27Defeitos: GameEvent[] = [
  /* ================= MERIDIANOS ESTREITOS ================= */
  {
    id: 'fl_mer_1', title: 'A Dor de Cada Ciclo', rarity: 'comum', once: true, weight: 2.5, cond: F('meridianos_estreitos', 1, 3),
    text: 'Cada vez que o Qi passa pelos seus meridianos, dói como fio de arame esfregado por dentro. Um curandeiro amigo oferece dois caminhos: dilatar os canais com pílulas amargas e arriscadas, ou aceitar a lentidão e refinar o Qi gota a gota.',
    choices: [
      { text: 'Dilatar os canais com as pílulas amargas.', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'A dor é uma semana inteira de fogo, mas os canais se abrem um pouco. O Qi passa mais rápido, e o curandeiro olha, impressionado.', fx: { setFlags: ['f_me_alargou'], stats: { fis: 1, dao: 1 }, xp: 6, ferida: 1, agenda: [{ event: 'fl_mer_2', em: [4, 9] }] } }, fail: { text: 'Os canais cedem de um lado só. Você ganha um ardor permanente e uma lição cara.', fx: { setFlags: ['f_me_alargou'], ferida: 3, stats: { fis: -1 }, agenda: [{ event: 'fl_mer_2', em: [4, 9] }] } } },
      { text: 'Aceitar a lentidão e refinar o Qi gota a gota.', res: { text: 'Cada ciclo leva o triplo do tempo, e cada gota passa mais pura. O curandeiro sorri: quem aprende a passar pelo fio, depois passa por qualquer porta.', fx: { setFlags: ['f_me_paciente'], stats: { dao: 2, comp: 1 }, agenda: [{ event: 'fl_mer_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'fl_mer_2', title: 'O Instrutor Que Desistiu de Você', rarity: 'raro', once: true, weight: 0, cond: F('meridianos_estreitos', 1, 6),
    text: 'O instrutor da seita chama você em particular. "Por mais que se esforce, a barra de cultivo nunca vai andar como a dos outros", diz, não sem pena. Sugere que você aceite um cargo de servente e deixe o caminho aos mais capazes.',
    choices: [
      { text: 'Aceitar o cargo e servir à seita.', res: { text: 'A rotina é pesada e honesta. Você aprende a ver a seita por dentro, e a ser indispensável de formas que nenhum talento compra.', fx: { setFlags: ['f_me_servente'], faccao: 'seita', fama: 3, stats: { car: 1 }, agenda: [{ event: 'fl_mer_3', em: [8, 16] }] } } },
      { text: 'Recusar e treinar sozinho, fora da seita.', res: { text: 'Você parte com a bolsa magra e a teimosia inteira. O instrutor te olha ir, sem acreditar, e depois, sem querer, admirando.', fx: { setFlags: ['f_me_teimoso'], stats: { dao: 2 }, fama: -2, faccao: 'errante', agenda: [{ event: 'fl_mer_3', em: [8, 16] }] } } },
      { text: 'Pedir um prazo de dez anos para provar o contrário.', res: { text: 'O instrutor ri, e depois concorda. Dez anos de prazo, e o relógio do orgulho dele passa a correr contra o seu.', fx: { setFlags: ['f_me_prazo'], stats: { dao: 1, comp: 1 }, agenda: [{ event: 'fl_mer_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_mer_3', title: 'Os Meridianos Escondidos', rarity: 'raro', once: true, weight: 0, cond: F('meridianos_estreitos', 2, 7),
    text: 'Um velho médico, ao examinar seu pulso, ergue as sobrancelhas: "Seus meridianos principais são estreitos, sim. Mas você tem, escondidos, oito meridianos extras que quase ninguém tem. Só ninguém te ensinou a usá-los."',
    choices: [
      { text: 'Estudar com o velho médico o uso dos meridianos escondidos.', check: { stat: ['comp', 'esp'], dif: 1, tag: 'qi' }, ok: { text: 'Em meses, você aprende a passar o Qi por rotas que ninguém mais conhece. O defeito vira atalho.', fx: { setFlags: ['f_me_escondidos'], tecnica: ['agulha_de_alma'], stats: { comp: 2, esp: 1 }, xp: 8, agenda: [{ event: 'fl_mer_4', em: [8, 16] }] } }, fail: { text: 'Os meridianos extras reagem mal. Você passa semanas de cama, com um formigamento que não passa.', fx: { setFlags: ['f_me_escondidos'], ferida: 2, stats: { comp: 1 }, agenda: [{ event: 'fl_mer_4', em: [8, 16] }] } } },
      { text: 'Recusar: a lentidão já virou o seu caminho.', cond: { flags: ['f_me_paciente'] }, res: { text: 'O velho concorda, com um sorriso curto. Quem já fez as pazes com o fio, não precisa de outra porta.', fx: { stats: { dao: 3 }, setFlags: ['f_me_aceitou'], agenda: [{ event: 'fl_mer_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_mer_4', title: 'O Fio Que Corta', rarity: 'raro', once: true, weight: 0, cond: F('meridianos_estreitos', 2, 7),
    text: 'Um mestre de técnicas de precisão percebe que os seus canais estreitos concentram o Qi num fio finíssimo, perfeito para golpes cirúrgicos. "Outros jogam um rio", diz. "Você pode jogar uma agulha."',
    choices: [
      { text: 'Treinar o Golpe do Fio: um único ponto, uma única vez.', check: { stat: ['esp', 'comp', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Seu primeiro golpe de fio atravessa uma tábua de ferro. A fama de quem derrota gigantes com uma agulha de Qi começa ali.', fx: { setFlags: ['f_me_golpe_fio'], fama: 10, stats: { esp: 2, dao: 1 }, xp: 6, agenda: [{ event: 'fl_mer_5', em: [10, 22] }] } }, fail: { text: 'O fio vacila, e o golpe falha. Mas o mestre diz: "Quem acerta de primeira não aprende."', fx: { ferida: 2, stats: { esp: 1 }, agenda: [{ event: 'fl_mer_5', em: [10, 22] }] } } },
      { text: 'Recusar: não quer ser lembrado só pelo que o defeito deu.', res: { text: 'O mestre entende, e se despede com cortesia. O defeito segue, sem estandarte.', fx: { stats: { dao: 2 }, agenda: [{ event: 'fl_mer_5', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'fl_mer_5', title: 'O Rio Que Aprendeu a Passar Pelo Fio', rarity: 'lendario', once: true, weight: 1.8, cond: F('meridianos_estreitos', 3, 8),
    text: 'Depois de décadas, seu Qi não é mais lento, nem estreito: é um rio que aprendeu a passar por um fio sem perder volume. Um último passo sobra: abrir os canais de uma vez, por uma dor que dura um mês e que só o seu Dao pode atravessar.',
    choices: [
      { text: 'Atravessar a dor do mês: abrir os meridianos de uma vez.', check: { stat: ['dao', 'fis'], dif: 2 }, ok: { text: 'Trinta dias de fogo e silêncio. Quando a dor passa, o Qi corre sem aperto, e você entende: o defeito foi, o tempo todo, uma escola.', fx: { superar: true, stats: { dao: 3, esp: 2 }, xp: 10, fama: 8, setFlags: ['f_me_superado'] } }, fail: { text: 'No vigésimo dia, a dor vence. Você desiste, e os canais cicatrizam como estavam. Talvez a hora certa ainda venha.', fx: { ferida: 3, stats: { dao: 2 } } } },
      { text: 'Encerrar a jornada como O Fio de Prata: viver ensinando a quem tem canais estreitos.', cond: { flags: ['f_me_golpe_fio'] }, res: { text: 'Você abre uma escola pequena, para os que a seita despreza. Dezenas deles fazem do defeito, como você, um estilo. Quando você parte, a escola segue.', fx: { fim: 'redencao_meridianos' } } },
      { text: 'Seguir como está: a lentidão já é sua.', res: { text: 'Cada ciclo, uma gota. Você não troca o fio por rio nenhum.', fx: { stats: { dao: 3 } } } },
    ],
  },

  /* ================= AZAR PERSISTENTE ================= */
  {
    id: 'fl_aza_1', title: 'Quando Tudo Dá Errado Ao Mesmo Tempo', rarity: 'comum', once: true, weight: 2.5, cond: F('azar', 1, 3),
    text: 'A ponte cai na hora em que você atravessa. O cavalo foge. A carta que ia entregar molha. Um estranho, rindo da sua cara de cansaço, diz: "Azar assim não vem de graça. Alguém tem uma conta com você, ou você, com alguém."',
    choices: [
      { text: 'Procurar a causa do azar, mesmo que dê trabalho.', check: { stat: ['comp', 'esp'], dif: 1 }, ok: { text: 'Depois de semanas, descobre uma maldição leve, herdada de um parente que ofendeu uma raposa. Agora você sabe contra o que luta.', fx: { setFlags: ['f_az_causa'], stats: { comp: 2 }, agenda: [{ event: 'fl_aza_2', em: [4, 9] }] } }, fail: { text: 'Nenhuma causa aparece. O azar continua, sem nome, e você aprende a ter planos B para tudo.', fx: { setFlags: ['f_az_planob'], stats: { comp: 1, dao: 1 }, agenda: [{ event: 'fl_aza_2', em: [4, 9] }] } } },
      { text: 'Rir de si mesmo e seguir em frente.', res: { text: 'Rir do azar tira dele metade do poder. As pessoas, sem saber por quê, passam a gostar de você.', fx: { setFlags: ['f_az_risada'], stats: { car: 1, dao: 1 }, karma: 2, agenda: [{ event: 'fl_aza_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'fl_aza_2', title: 'O Amuleto do Velho Supersticioso', rarity: 'raro', once: true, weight: 0, cond: F('azar', 1, 6),
    text: 'Um velho vende amuletos de azar "pra espantar azar". O seu custa pouco, e ele insiste que serve só pra quem acredita. Há também uma moça que vende outro, mais caro, "esse sim, garantido".',
    choices: [
      { text: 'Comprar o amuleto barato e acreditar nele.', res: { text: 'O azar diminui, ou você passa a notá-lo menos. O velho assente, satisfeito: "Acreditar já é metade do amuleto."', fx: { setFlags: ['f_az_amuleto'], stats: { sor: 1, dao: 1 }, pedras: -5, agenda: [{ event: 'fl_aza_3', em: [8, 16] }] } } },
      { text: 'Comprar o caro, da moça.', custo: 60, res: { text: 'O amuleto é pesado e elaborado, e ela jura que funciona. Funciona um mês. Depois, o azar volta com juros, e você descobre que a moça sumiu.', fx: { setFlags: ['f_az_enganado'], pedras: -20, stats: { sor: -1 }, karma: -1, agenda: [{ event: 'fl_aza_3', em: [8, 16] }] } } },
      { text: 'Não comprar nada: azar se aprende a viver.', res: { text: 'O velho concorda, com um suspiro. O caminho do azar é, afinal, o da paciência, e você vai longe nele.', fx: { stats: { dao: 2 }, setFlags: ['f_az_aceitou'], agenda: [{ event: 'fl_aza_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_aza_3', title: 'O Dia Em Que o Azar Salvou Você', rarity: 'raro', once: true, weight: 0, cond: F('azar', 2, 7),
    text: 'Você perde a carruagem, o trem de ideias, o horário. Foi o que o salvou: a carruagem sofreu uma emboscada, o salão onde ia entrar desabou. Aos poucos, você percebe que, às vezes, o azar vem antes de uma tragédia pior.',
    choices: [
      { text: 'Agradecer ao azar, e aprender a ler os sinais.', res: { text: 'Você passa a notar em que ordem as coisas dão errado. Em pouco tempo, o azar vira um sinal de alerta que ninguém mais tem.', fx: { setFlags: ['f_az_sinais'], stats: { esp: 1, sor: 1, comp: 1 }, xp: 5, agenda: [{ event: 'fl_aza_4', em: [8, 16] }] } } },
      { text: 'Continuar achando que é só azar.', res: { text: 'A coincidência passa, e o hábito de reclamar volta. Algumas lições esperam, pacientes, a segunda chance.', fx: { stats: { dao: 1 }, agenda: [{ event: 'fl_aza_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_aza_4', title: 'A Raposa da Dívida', rarity: 'raro', once: true, weight: 0, cond: F('azar', 2, 7),
    text: 'Uma raposa de olhos dourados atravessa o seu caminho. Sem rodeios, ela diz: "A maldição é minha. Seu antepassado me ofendeu. Posso levantá-la, em troca de um favor." Ela não diz qual.',
    choices: [
      { text: 'Aceitar o favor, sem saber qual é.', res: { text: 'Quando a raposa revela o pedido (cuidar de um filhote órfão por um ano), você aceita. O azar vai embora, e o filhote fica.', fx: { setFlags: ['f_az_raposa'], stats: { sor: 3 }, karma: 6, agenda: [{ event: 'fl_aza_5', em: [10, 22] }] } } },
      { text: 'Recusar o favor às cegas e propor um pagamento claro.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'A raposa, divertida, aceita um pagamento em oferendas. O azar diminui, e uma amizade estranha começa.', fx: { setFlags: ['f_az_raposa'], pedras: -60, stats: { sor: 2, car: 1 }, agenda: [{ event: 'fl_aza_5', em: [10, 22] }] } }, fail: { text: 'A raposa se ofende com a desconfiança. O azar fica, mais cheio de picuinhas.', fx: { stats: { sor: -1 }, agenda: [{ event: 'fl_aza_5', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'fl_aza_5', title: 'A Maldição Que Virou Lição', rarity: 'lendario', once: true, weight: 1.8, cond: F('azar', 3, 8),
    text: 'Com a raposa como amiga e o azar já entendido, resta um último desafio: pagar por escolha própria a dívida que seu antepassado deixou, abrindo mão de algo que você valoriza muito. É a única forma de apagar a maldição de vez.',
    choices: [
      { text: 'Abrir mão do que você mais valoriza e quebrar a maldição.', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'O preço é alto, e a paz é maior. A maldição se desfaz com um suspiro. Daí em diante, a sorte é só sorte.', fx: { superar: true, pedras: -200, karma: 8, stats: { dao: 3, sor: 2 }, setFlags: ['f_az_superado'] } }, fail: { text: 'O preço não basta, ou você hesita. A maldição se afrouxa, mas não se desfaz.', fx: { stats: { dao: 2 }, karma: 2 } } },
      { text: 'Encerrar a jornada como O Pagador de Dívidas: passar a vida quitando maldições alheias.', cond: { flags: ['f_az_raposa'] }, res: { text: 'Sua casa vira refúgio de amaldiçoados. Você ensina a rir do azar, a pagar a dívida, a fazer amigos até com raposas. Quando parte, deixa uma fila de gente aliviada.', fx: { fim: 'redencao_azar' } } },
      { text: 'Viver com a maldição: já virou parte de quem você é.', res: { text: 'O azar continua, e você já nem pergunta o porquê. Há uma dignidade teimosa em não fugir.', fx: { stats: { dao: 3 } } } },
    ],
  },

  /* ================= QI INSTÁVEL ================= */
  {
    id: 'fl_qin_1', title: 'A Faísca Que Escapou', rarity: 'comum', once: true, weight: 2.5, cond: F('qi_instavel', 1, 3),
    text: 'Em plena meditação, o Qi sobe como bolha, estoura, e solta uma faísca que queima a esteira. Você acorda assustado, de sobrancelhas chamuscadas. Outros dizem que o seu Qi é "inquieto". Ninguém sabe se isso é maldição ou marca.',
    choices: [
      { text: 'Treinar o controle com paciência, sozinho.', check: { stat: ['dao', 'esp'], dif: 1, tag: 'qi' }, ok: { text: 'Meses de prática, e o Qi, antes selvagem, aprende a esperar a sua ordem. A faísca vira ferramenta.', fx: { setFlags: ['f_qi_controle'], stats: { dao: 2, esp: 1 }, xp: 5, agenda: [{ event: 'fl_qin_2', em: [4, 9] }] } }, fail: { text: 'O controle vem em estalos, entre sustos e cicatrizes. Você aprende por tentativa e erro.', fx: { setFlags: ['f_qi_controle'], ferida: 1, stats: { dao: 1 }, agenda: [{ event: 'fl_qin_2', em: [4, 9] }] } } },
      { text: 'Procurar um mestre que lide com casos assim.', res: { text: 'O mestre é rabugento e eficaz. Em semanas, você aprende exercícios de contenção, e uma forma de respirar que ninguém usa.', fx: { setFlags: ['f_qi_mestre'], stats: { comp: 1, dao: 1 }, pedras: -30, agenda: [{ event: 'fl_qin_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'fl_qin_2', title: 'O Gargalo Que Explodiu', rarity: 'raro', once: true, weight: 0, cond: F('qi_instavel', 1, 6),
    text: 'Numa tentativa de romper o gargalo, o seu Qi, instável, faz o que sempre temeu: explode. Uma onda de energia crua atinge o pavilhão inteiro. Ninguém morre, mas todos olham, e alguém precisa decidir o que fazer com você.',
    choices: [
      { text: 'Assumir a culpa e reparar o pavilhão com as próprias mãos.', res: { text: 'Meses de trabalho de pedreiro. A seita, comovida, perdoa, e você descobre que consertar paredes concentra mais que muita meditação.', fx: { setFlags: ['f_qi_reparou'], karma: 6, stats: { dao: 2, fis: 1 }, fama: 3, agenda: [{ event: 'fl_qin_3', em: [8, 16] }] } } },
      { text: 'Fugir antes que decidam o castigo.', res: { text: 'Você parte de madrugada. A seita jamais esquece, e você jamais deixa de olhar para trás.', fx: { setFlags: ['f_qi_fugiu'], karma: -4, fama: -4, stats: { sor: 1 }, faccao: 'errante', agenda: [{ event: 'fl_qin_3', em: [8, 16] }] } } },
      { text: 'Pedir que um mestre o estude: a explosão pode ser útil.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O mestre mede a explosão e vê um padrão. "Isto é Qi de tempestade", diz. Ganha-se um mentor e um nome técnico para o problema.', fx: { setFlags: ['f_qi_estudado'], stats: { comp: 2, esp: 1 }, xp: 6, agenda: [{ event: 'fl_qin_3', em: [8, 16] }] } }, fail: { text: 'O mestre dá de ombros: "É só descontrole." A humilhação cola, mas a curiosidade, também.', fx: { fama: -2, stats: { dao: 1 }, agenda: [{ event: 'fl_qin_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_qin_3', title: 'A Seita Que Quer a Tempestade', rarity: 'raro', once: true, weight: 0, cond: F('qi_instavel', 2, 7),
    text: 'Uma seita militar descobre que o seu Qi instável pode ser usado como arma: explosões controladas, armadilhas, minas de energia. Oferecem posto, soldo e proteção. Em troca, você seria um explosivo de carne e osso.',
    choices: [
      { text: 'Aceitar o posto como Arma da Seita.', res: { text: 'As explosões viram técnica, e o soldo, rotina. Mas a seita passa a decidir quando você deve estourar, e isso pesa na alma.', fx: { setFlags: ['f_qi_arma'], pedras: 220, fama: 8, karma: -3, faccao: 'seita', stats: { esp: 2 } } } },
      { text: 'Recusar e buscar um jeito próprio de usar o Qi.', res: { text: 'Você passa anos desenhando sequências de contenção e liberação. O Qi, antes selvagem, aprende a dançar, e você aprende a dirigir a dança.', fx: { setFlags: ['f_qi_proprio'], stats: { esp: 2, dao: 2 }, xp: 8 } } },
    ],
  },
  {
    id: 'fl_qin_4', title: 'A Tempestade Dentro', rarity: 'raro', once: true, weight: 0, cond: F('qi_instavel', 2, 7),
    text: 'Numa noite, o Qi chega a um ponto crítico. Um raio de verdade, vindo de nuvem nenhuma, desce sobre o seu pavilhão, e o Qi, em vez de explodir, sobe como espiral. Algo novo, mais fundo, está para acontecer.',
    choices: [
      { text: 'Abraçar a espiral e deixar o Qi te levar.', check: { stat: ['dao', 'esp'], dif: 2, tag: 'qi' }, ok: { text: 'A espiral cresce, gira, assenta. Quando acaba, você sente o Qi pela primeira vez como parte de si, não como inimigo.', fx: { setFlags: ['f_qi_espiral'], stats: { esp: 3, dao: 2 }, xp: 10, tecnica: ['respiracao_coletiva'], agenda: [{ event: 'fl_qin_5', em: [10, 22] }] } }, fail: { text: 'A espiral se rompe em faíscas. Você acorda chamuscado, vivo, e um pouco mais sábio.', fx: { ferida: 3, stats: { dao: 2 }, agenda: [{ event: 'fl_qin_5', em: [10, 22] }] } } },
      { text: 'Conter o Qi, mesmo que custe a oportunidade.', res: { text: 'A espiral é cortada. Você poupa o pavilhão e perde a chance. Às vezes, ser prudente também tem um preço.', fx: { stats: { dao: 2 }, agenda: [{ event: 'fl_qin_5', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'fl_qin_5', title: 'A Calma no Olho da Tempestade', rarity: 'lendario', once: true, weight: 1.8, cond: F('qi_instavel', 3, 8),
    text: 'Anos de prática ensinaram o seu Qi a se acalmar sob comando. Resta o teste final: ficar de pé no centro de uma tempestade de raios reais, sem se mexer, deixando o Qi instável aprender o que é estabilidade.',
    choices: [
      { text: 'Ficar no centro da tempestade até o último raio.', check: { stat: ['dao', 'esp', 'fis'], dif: 2 }, ok: { text: 'Raio após raio, o seu Qi aprende a ser firme. Quando a tempestade cessa, você está inteiro, e o Qi também.', fx: { superar: true, stats: { dao: 3, esp: 2, fis: 1 }, fama: 8, setFlags: ['f_qi_superado'] } }, fail: { text: 'O quinto raio é demais. Você é jogado para longe, com queimaduras. A tempestade, por ora, ficou com a vitória.', fx: { ferida: 3, stats: { dao: 2 } } } },
      { text: 'Encerrar a jornada como O Guarda-Raios: viver no pico mais alto, dispersando tempestades.', cond: { flags: ['f_qi_espiral'] }, res: { text: 'Você se instala no pico mais exposto do continente. Quando a tempestade vem, você a recebe e a dispersa. Vilas inteiras dormem em paz por causa de uma cabana.', fx: { fim: 'redencao_qi' } } },
      { text: 'Deixar a tempestade para outra hora.', res: { text: 'O Qi continua inquieto, e você, atento. A calma, às vezes, é um ofício diário.', fx: { stats: { dao: 2 } } } },
    ],
  },

  /* ================= CORAÇÃO COVARDE ================= */
  {
    id: 'fl_cov_1', title: 'O Dia Em Que Você Correu', rarity: 'comum', once: true, weight: 2.5, cond: F('covarde', 1, 3),
    text: 'Um valentão ameaça um menino mais novo, na sua frente. Seu corpo gela. Você sabe que deveria intervir, e, sem controle, dá um passo para trás. O menino te vê. Ninguém diz nada, e o silêncio pesa.',
    choices: [
      { text: 'Fugir para longe, envergonhado.', res: { text: 'Você corre, e o vento leva a culpa para trás, mas não muito. Aquela noite, você não dorme.', fx: { setFlags: ['f_cv_correu'], stats: { dao: -1, sor: 1 }, karma: -2, agenda: [{ event: 'fl_cov_2', em: [4, 9] }] } } },
      { text: 'Gritar por socorro a um adulto, em vez de enfrentar.', res: { text: 'Não é heroísmo, mas ajuda. O valentão recua, o menino se salva, e você aprende que há mais de uma forma de coragem.', fx: { setFlags: ['f_cv_gritou'], karma: 3, stats: { car: 1 }, agenda: [{ event: 'fl_cov_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'fl_cov_2', title: 'O Menino Que Você Não Defendeu', rarity: 'raro', once: true, weight: 0, cond: F('covarde', 1, 6),
    text: 'Anos depois, o menino aparece, já rapaz, entre os discípulos da mesma seita. Ele se lembra, e você também. Ele não diz nada, mas se coloca sempre do lado oposto. Um dia, ele pede uma conversa.',
    choices: [
      { text: 'Pedir desculpas, mesmo que tarde.', res: { text: 'O rapaz ouve em silêncio. Depois diz: "Eu esperava." Não é perdão, mas é o começo de alguma coisa.', fx: { setFlags: ['f_cv_desculpou'], karma: 6, stats: { dao: 1, car: 1 }, agenda: [{ event: 'fl_cov_3', em: [8, 16] }] } } },
      { text: 'Evitá-lo, como sempre.', res: { text: 'A distância cresce. Ele se afasta, e você, aliviado e pior. O hábito de fugir cresce junto com a vergonha.', fx: { setFlags: ['f_cv_evitou'], stats: { dao: -1 }, karma: -2, agenda: [{ event: 'fl_cov_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_cov_3', title: 'O Medo Que Ensinou a Ver', rarity: 'raro', once: true, weight: 0, cond: F('covarde', 2, 7),
    text: 'Quem tem medo percebe o perigo antes dos outros. Você, depois de anos, descobre que isso é um dom: sente a emboscada, o veneno, a mentira, antes de todos. Alguns, notando, passam a pedir o seu conselho antes de qualquer decisão.',
    choices: [
      { text: 'Tornar-se o batedor oficial do grupo.', res: { text: 'Você caminha na frente, olhos arregalados, e salva vidas por simplesmente ter medo. Ninguém ri mais: quem ri, sai vivo por sua causa.', fx: { setFlags: ['f_cv_batedor'], fama: 8, karma: 4, stats: { esp: 1, sor: 1 }, agenda: [{ event: 'fl_cov_4', em: [8, 16] }] } } },
      { text: 'Vender o dom como "vidência" a quem pagar.', res: { text: 'Os clientes amam, e pagam. Você nunca mais fala de medo: fala de "sinais", e a bolsa agradece.', fx: { setFlags: ['f_cv_vidente'], pedras: 180, fama: 4, stats: { car: 1 }, karma: -2, agenda: [{ event: 'fl_cov_4', em: [8, 16] }] } } },
      { text: 'Guardar o dom para si, por vergonha.', res: { text: 'Você continua sem contar a ninguém. O medo, escondido, apenas fica maior.', fx: { stats: { dao: -1 }, agenda: [{ event: 'fl_cov_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_cov_4', title: 'O Dia Em Que o Medo Foi Útil', rarity: 'raro', once: true, weight: 0, cond: F('covarde', 2, 7),
    text: 'Um desabamento, um incêndio ou uma invasão: todos entram em pânico, e você, por ter tido medo a vida inteira, é o único com um plano de fuga pronto. Aos poucos, as pessoas se voltam para você, esperando o comando.',
    choices: [
      { text: 'Assumir o comando e guiar todos à saída.', check: { stat: ['car', 'dao', 'sor'], dif: 1 }, ok: { text: 'Sua voz treme, e todos obedecem, porque o tremor é de quem sabe o preço de errar. Ninguém morre. Você chora, depois, em silêncio.', fx: { setFlags: ['f_cv_lider'], fama: 12, karma: 8, stats: { dao: 3, car: 1 }, agenda: [{ event: 'fl_cov_5', em: [10, 22] }] } }, fail: { text: 'A voz falha no pior momento. Alguns se salvam, outros não, e você carrega o peso do que podia ter sido.', fx: { fama: -2, karma: 2, stats: { dao: 2 }, ferida: 1, agenda: [{ event: 'fl_cov_5', em: [10, 22] }] } } },
      { text: 'Fugir sozinho, como sempre.', res: { text: 'Você sai vivo, e sozinho. Os outros se arranjam, ou não. O medo, por ora, vence de novo.', fx: { setFlags: ['f_cv_correu'], karma: -5, stats: { dao: -2 }, agenda: [{ event: 'fl_cov_5', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'fl_cov_5', title: 'O Medo Que Virou Coragem', rarity: 'lendario', once: true, weight: 1.8, cond: F('covarde', 3, 8),
    text: 'O medo nunca foi embora, e talvez nunca vá. Mas hoje, diante de uma escolha que o assusta mais do que qualquer outra, você sente algo novo: não ausência de medo, mas decisão de agir com ele. Há quem diga que isso é a única coragem que existe.',
    choices: [
      { text: 'Enfrentar o que mais teme, de olhos abertos e com medo.', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'O medo vem inteiro, e você vai assim mesmo. Quando acaba, a coragem é sua, e o medo, só um velho companheiro.', fx: { superar: true, stats: { dao: 4, car: 1 }, fama: 10, karma: 6, setFlags: ['f_cv_superado'] } }, fail: { text: 'O medo vence um round. Você recua, mas desta vez sabendo que voltará.', fx: { stats: { dao: 2 }, karma: 2 } } },
      { text: 'Encerrar a jornada como O Guardião Trêmulo: dedicar a vida a proteger quem tem medo.', cond: { flags: ['f_cv_batedor'] }, res: { text: 'Você funda uma casa para os assustados. Ali, ninguém é obrigado a ser valente, e todos aprendem a ser úteis. Quando você parte, a casa permanece, cheia de gente com medo e de pé.', fx: { fim: 'redencao_covarde' } } },
      { text: 'Adiar mais uma vez.', res: { text: 'O medo, paciente, espera. Você, também.', fx: { stats: { dao: 1 } } } },
    ],
  },

  /* ================= CONSTITUIÇÃO FRÁGIL ================= */
  {
    id: 'fl_doe_1', title: 'A Febre Que Voltou', rarity: 'comum', once: true, weight: 2.5, cond: F('doente', 1, 3),
    text: 'De novo a febre, de novo a cama. Cada estação traz uma doença diferente, e cada doença, uma lição. Hoje, uma curandeira idosa senta ao seu lado e oferece dois métodos: tratar o corpo, ou aprender a escutá-lo.',
    choices: [
      { text: 'Tratar o corpo: ervas, repouso, uma dieta estrita.', res: { text: 'Semanas de chás amargos. O corpo melhora, devagar, e você aprende a respeitar a rotina como uma forma de oração.', fx: { setFlags: ['f_do_tratou'], stats: { fis: 1, dao: 1 }, vida: 6, agenda: [{ event: 'fl_doe_2', em: [4, 9] }] } } },
      { text: 'Aprender a escutar o corpo: meditar sobre cada dor.', check: { stat: ['esp', 'dao'], dif: 0, tag: 'mente' }, ok: { text: 'Cada ardor vira um mapa. Em meses, você sente a doença chegar antes dela existir, e desvia.', fx: { setFlags: ['f_do_escuta'], stats: { esp: 2, dao: 1 }, agenda: [{ event: 'fl_doe_2', em: [4, 9] }] } }, fail: { text: 'A escuta é confusa no início. Você erra sinais, e adoece de novo, mas aprende.', fx: { setFlags: ['f_do_escuta'], ferida: 1, stats: { esp: 1 }, agenda: [{ event: 'fl_doe_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'fl_doe_2', title: 'O Hospital da Seita', rarity: 'raro', once: true, weight: 0, cond: F('doente', 1, 6),
    text: 'Uma seita de curandeiros precisa de um paciente de longa data para estudar doenças raras. Você é o candidato perfeito, e eles pagam em tratamento. Mas estudar é também ser objeto de estudo.',
    choices: [
      { text: 'Aceitar o estudo e trocar o corpo por cuidado.', res: { text: 'Meses de agulhas e de anotações. Em troca, você ganha tratamento e uma amiga: a curandeira-chefe, que o vê como pessoa, não como caso.', fx: { setFlags: ['f_do_estudado'], vida: 10, karma: 2, stats: { fis: 1 }, fama: 4, agenda: [{ event: 'fl_doe_3', em: [8, 16] }] } } },
      { text: 'Recusar e cuidar de si por conta própria.', res: { text: 'A independência custa mais doença. Mas cada recuperação é sua, e cada vitória sobre uma febre vira orgulho.', fx: { setFlags: ['f_do_sozinho'], stats: { dao: 2, fis: 1 }, ferida: 1, agenda: [{ event: 'fl_doe_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_doe_3', title: 'O Médico Que Você Poderia Ser', rarity: 'raro', once: true, weight: 0, cond: F('doente', 2, 7),
    text: 'Quem passa a vida doente aprende a medicina sem querer. Um jovem doente vem, por acaso, pedir a sua ajuda, e você, em minutos, descobre que sabe mais sobre aquela febre que o curandeiro da vila.',
    choices: [
      { text: 'Tratar o jovem com o que aprendeu.', check: { stat: ['comp', 'esp'], dif: 0, tag: 'alquimia' }, ok: { text: 'O jovem se recupera em dias. A vila, surpresa, passa a procurar você. O corpo frágil, de repente, serve a um propósito.', fx: { setFlags: ['f_do_curandeiro'], fama: 8, karma: 6, stats: { comp: 2, car: 1 }, agenda: [{ event: 'fl_doe_4', em: [8, 16] }] } }, fail: { text: 'O tratamento não funciona direito, mas o jovem sobrevive, e você aprende o que errou.', fx: { karma: 2, stats: { comp: 1 }, agenda: [{ event: 'fl_doe_4', em: [8, 16] }] } } },
      { text: 'Indicar o curandeiro: não é seu papel.', res: { text: 'O curandeiro cuida do jovem, e você volta à cama. Uma dúvida pequena e persistente passa a visitá-lo todas as noites.', fx: { stats: { dao: 1 }, agenda: [{ event: 'fl_doe_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_doe_4', title: 'A Cura Que Pede um Preço', rarity: 'raro', once: true, weight: 0, cond: F('doente', 2, 7),
    text: 'Um alquimista misterioso oferece uma pílula que cura sua constituição de uma vez, ao custo de três anos de sua vida. Outro, mais honesto, diz que a cura existe, mas leva vinte anos de trabalho e disciplina.',
    choices: [
      { text: 'Tomar a pílula rápida, pagando com anos.', res: { text: 'O corpo, de repente, é inteiro. A fraqueza some, e os anos também. Você se sente outro, e pensa se foi bom negócio.', fx: { vida: -30, stats: { fis: 3 }, setFlags: ['f_do_pilula'], agenda: [{ event: 'fl_doe_5', em: [10, 22] }] } } },
      { text: 'Optar pela cura lenta e honesta.', res: { text: 'Vinte anos de rotina, de ervas, de respiração. A fraqueza vai embora devagar, e leva consigo a pressa.', fx: { setFlags: ['f_do_lenta'], stats: { fis: 2, dao: 2 }, anos: 5, agenda: [{ event: 'fl_doe_5', em: [10, 22] }] } } },
      { text: 'Recusar ambas: esta fragilidade é parte de você.', res: { text: 'Você escolhe viver com o corpo que tem, em paz com ele. Há uma dignidade serena nessa recusa.', fx: { stats: { dao: 3 }, setFlags: ['f_do_aceitou'], agenda: [{ event: 'fl_doe_5', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'fl_doe_5', title: 'O Corpo Que Aprendeu a Durar', rarity: 'lendario', once: true, weight: 1.8, cond: F('doente', 3, 8),
    text: 'Quem foi doente a vida inteira conhece, melhor que ninguém, o valor de cada dia de saúde. Resta um teste final: passar uma estação inteira sem adoecer, em retiro, sem remédios, só com o que aprendeu sobre o seu corpo.',
    choices: [
      { text: 'Atravessar a estação sem remédios, escutando cada sinal.', check: { stat: ['fis', 'dao', 'esp'], dif: 2 }, ok: { text: 'Cada febre que viria, você desvia; cada dor que apareceria, você acalma. Quando a estação acaba, o corpo é outro, ou você aprendeu a ser outro nele.', fx: { superar: true, stats: { fis: 3, dao: 3 }, fama: 8, setFlags: ['f_do_superado'] } }, fail: { text: 'No meio do retiro, a doença vence. Você a atravessa, fraco, e aprende que a hora ainda não é esta.', fx: { ferida: 2, stats: { dao: 2 } } } },
      { text: 'Encerrar a jornada como O Médico Que Adoeceu: abrir um hospital para os frágeis.', cond: { flags: ['f_do_curandeiro'] }, res: { text: 'Seu hospital é pequeno, e ninguém é recusado. Os pacientes encontram, no mestre, alguém que nunca esquece como é ter medo da própria carne. Quando você parte, o hospital continua, e a cura virou escola.', fx: { fim: 'redencao_doente' } } },
      { text: 'Seguir cuidando do corpo, dia a dia.', res: { text: 'Não há vitória final: há uma rotina que se repete, e uma paz que cresce por ela.', fx: { stats: { dao: 2, fis: 1 } } } },
    ],
  },

  /* ================= ORGULHO FERIDO ================= */
  {
    id: 'fl_org_1', title: 'A Humilhação Que Você Não Esqueceu', rarity: 'comum', once: true, weight: 2.5, cond: F('orgulhoso', 1, 3),
    text: 'Numa roda de discípulos, alguém corrige você em público, e erra a correção, mas ninguém o contradiz. Você sente o rosto arder. Anos depois, você ainda lembra a cena. Hoje, o mesmo discípulo aparece e finge nada.',
    choices: [
      { text: 'Guardar a mágoa e esperar a hora de se vingar.', res: { text: 'A mágoa cresce, discreta. Você aprende a sorrir enquanto planeja, e a vingança vira projeto de vida.', fx: { setFlags: ['f_or_rancor'], stats: { dao: -1, comp: 1 }, karma: -3, perfil: { violencia: 1 }, agenda: [{ event: 'fl_org_2', em: [4, 9] }] } } },
      { text: 'Confrontá-lo em particular, com calma.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O rapaz, surpreso, pede desculpas, e a mágoa, que parecia imensa, cabe num suspiro. Você se pergunta por que carregou aquilo tanto tempo.', fx: { setFlags: ['f_or_conversou'], karma: 4, stats: { dao: 2, car: 1 }, agenda: [{ event: 'fl_org_2', em: [4, 9] }] } }, fail: { text: 'A conversa descamba em briga, e o orgulho, de novo, é ferido. Pior: agora em público.', fx: { setFlags: ['f_or_rancor'], fama: -3, stats: { dao: -1 }, agenda: [{ event: 'fl_org_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'fl_org_2', title: 'O Convite Que Você Não Aceitou', rarity: 'raro', once: true, weight: 0, cond: F('orgulhoso', 1, 6),
    text: 'Um mestre de renome oferece ensinar você, mas exige que você peça formalmente, de joelhos, diante dos outros alunos. A cerimônia é antiga e dura dois minutos. Seu orgulho dói só de pensar.',
    choices: [
      { text: 'Recusar a cerimônia e perder a chance.', res: { text: 'O mestre assente, sem rancor, e escolhe outro aluno. Você segue sozinho, de cabeça erguida e sem mestre.', fx: { setFlags: ['f_or_sem_mestre'], stats: { dao: 1 }, fama: 2, agenda: [{ event: 'fl_org_3', em: [8, 16] }] } } },
      { text: 'Ajoelhar-se, engolindo o orgulho.', cond: { flags: ['defeito_superado'] }, res: { text: 'Você se ajoelha, e algo, dentro, se solta. Dois minutos depois, é aluno de um dos maiores mestres do continente.', fx: { tecnica: ['sutra_do_anciao'], stats: { dao: 2, comp: 2 }, fama: 4, agenda: [{ event: 'fl_org_3', em: [8, 16] }] } } },
      { text: 'Propor uma cerimônia alternativa, de igual para igual.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O mestre, divertido, aceita: uma xícara de chá, sem joelhos. Nasce uma relação diferente, de respeito mútuo.', fx: { setFlags: ['f_or_alternativa'], stats: { car: 2, dao: 1 }, fama: 4, agenda: [{ event: 'fl_org_3', em: [8, 16] }] } }, fail: { text: 'O mestre acha a proposta uma petulância. A porta se fecha, com cortesia.', fx: { fama: -3, stats: { dao: 1 }, agenda: [{ event: 'fl_org_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_org_3', title: 'O Duelo Que Você Não Devia Ter Aceito', rarity: 'raro', once: true, weight: 0, escala: true, cond: F('orgulhoso', 2, 7),
    text: 'Um rival o provoca na frente de todos, de um jeito calculado para atingir o seu orgulho. Todos sabem que é armadilha. Você, também. O desafio vem com data, hora e padrinhos, e o seu orgulho já respondeu antes de você.',
    choices: [
      { text: 'Aceitar o duelo: orgulho não recua.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você vence, e o rival, fingindo gentileza, revela que perdeu de propósito para saber como você luta. Você ganhou o duelo e perdeu a surpresa.', fx: { setFlags: ['f_or_duelou'], fama: 8, stats: { fis: 1 }, agenda: [{ event: 'fl_org_4', em: [8, 16] }] } }, fail: { text: 'Você perde, na frente de todos. A humilhação é completa, e a mágoa, ainda mais funda.', fx: { setFlags: ['f_or_duelou'], ferida: 3, fama: -8, stats: { dao: -1 }, agenda: [{ event: 'fl_org_4', em: [8, 16] }] } } },
      { text: 'Recusar o duelo e aguentar a vergonha.', res: { text: 'Todos riem, e você aguenta. Descobre que a vergonha de recusar dura um mês, e a de lutar errado duraria uma vida.', fx: { setFlags: ['f_or_recusou_duelo'], stats: { dao: 3 }, fama: -4, agenda: [{ event: 'fl_org_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_org_4', title: 'Quem Precisa de Seu Perdão', rarity: 'raro', once: true, weight: 0, cond: F('orgulhoso', 2, 7),
    text: 'Anos depois, aquele que o humilhou na primeira cena pede para falar com você. Está velho, doente, e quer, antes de partir, pedir perdão. O seu orgulho, que sempre sonhou com esse momento, agora tem um nome e um rosto cansado.',
    choices: [
      { text: 'Perdoá-lo diante de todos.', res: { text: 'As palavras saem curtas e sinceras. Ele chora, você também, e anos de peso caem como uma capa velha.', fx: { setFlags: ['f_or_perdoou'], karma: 10, stats: { dao: 3, car: 1 }, fama: 6, agenda: [{ event: 'fl_org_5', em: [10, 22] }] } } },
      { text: 'Recusar o perdão e deixá-lo ir sozinho.', res: { text: 'Ele parte em silêncio. O orgulho vence, e a vitória tem gosto de cinza. Você nunca mais se livra da cena.', fx: { setFlags: ['f_or_nao_perdoou'], karma: -6, stats: { dao: -2 }, agenda: [{ event: 'fl_org_5', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'fl_org_5', title: 'O Orgulho Que Aprendeu a Ajoelhar', rarity: 'lendario', once: true, weight: 1.8, cond: F('orgulhoso', 3, 8),
    text: 'O orgulho só se quebra, de verdade, por escolha. A prova final é simples e terrível: pedir perdão, em público, a alguém que você feriu de fato, por orgulho, e aceitar a resposta, qualquer que seja.',
    choices: [
      { text: 'Pedir perdão em público, de joelhos.', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'Você se ajoelha, e a praça fica em silêncio. A pessoa o levanta, abraça, e perdoa. O orgulho, antes uma muralha, vira uma ponte.', fx: { superar: true, karma: 10, fama: 10, stats: { dao: 4, car: 2 }, setFlags: ['f_or_superado'] } }, fail: { text: 'A pessoa recusa o perdão, e você segue de joelhos até o fim da cerimônia. Ainda assim, algo, em você, se quebra para melhor.', fx: { karma: 5, stats: { dao: 3 }, fama: 2 } } },
      { text: 'Encerrar a jornada como O Mestre Que Se Curva: viver ensinando humildade aos poderosos.', cond: { flags: ['f_or_perdoou'] }, res: { text: 'Você passa a vida convencendo orgulhosos a pedir perdão, e a aceitar o dos outros. Quando você parte, a sua escola de reconciliação segue em vilas onde antes só havia guerra de honra.', fx: { fim: 'redencao_orgulhoso' } } },
      { text: 'Continuar como está: o orgulho também sustenta.', res: { text: 'O orgulho ainda o mantém de pé, e você segue em frente, sem pedir nada a ninguém.', fx: { stats: { dao: 1 } } } },
    ],
  },

  /* ================= MENTE DISPERSA ================= */
  {
    id: 'fl_dis_1', title: 'Onde Foi Parar a Meditação', rarity: 'comum', once: true, weight: 2.5, cond: F('distraido', 1, 3),
    text: 'Você abre os olhos depois da meditação e percebe que passou duas horas pensando num pássaro, numa receita, numa canção. O instrutor ri sem maldade: "Mente dispersa não é mente vazia. É mente cheia demais."',
    choices: [
      { text: 'Treinar o foco com um exercício diário e chato.', res: { text: 'Vela, respiração, contar até cem. Em meses, a mente aprende a voltar. Não é talento, é teimosia.', fx: { setFlags: ['f_di_foco'], stats: { dao: 2, comp: 1 }, agenda: [{ event: 'fl_dis_2', em: [4, 9] }] } } },
      { text: 'Aceitar a dispersão e usar a mente cheia como ferramenta.', res: { text: 'Você passa a anotar as ideias que aparecem, em vez de afastá-las. Cada desvio vira uma pergunta, e algumas perguntas valem ouro.', fx: { setFlags: ['f_di_ideias'], stats: { comp: 2 }, xp: 4, agenda: [{ event: 'fl_dis_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'fl_dis_2', title: 'A Ideia Que Veio do Nada', rarity: 'raro', once: true, weight: 0, cond: F('distraido', 1, 6),
    text: 'Em meio a uma conversa, você divaga, e uma ideia cai na sua cabeça, absurda e brilhante: uma forma de misturar duas técnicas que ninguém mistura. Os outros acham graça. Você anota, e os dias seguintes giram em torno dela.',
    choices: [
      { text: 'Perseguir a ideia até ver se funciona.', check: { stat: ['comp', 'esp'], dif: 1, tag: 'qi' }, ok: { text: 'Depois de semanas, a mistura funciona, de um jeito torto e belo. Uma técnica nova nasce, e leva o seu nome.', fx: { setFlags: ['f_di_tecnica'], tecnica: ['respiracao_coletiva'], stats: { comp: 2, esp: 1 }, fama: 6, agenda: [{ event: 'fl_dis_3', em: [8, 16] }] } }, fail: { text: 'A ideia não funciona, e o Qi, bagunçado, se vinga. Mas você aprende o que não fazer, e isso é metade do caminho.', fx: { ferida: 1, stats: { comp: 1 }, agenda: [{ event: 'fl_dis_3', em: [8, 16] }] } } },
      { text: 'Deixar a ideia de lado: a meditação vem primeiro.', cond: { flags: ['f_di_foco'] }, res: { text: 'A ideia espera, paciente. Aprender a escolher é metade do foco.', fx: { stats: { dao: 2 }, agenda: [{ event: 'fl_dis_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_dis_3', title: 'O Dia Em Que a Distração Custou Caro', rarity: 'raro', once: true, weight: 0, cond: F('distraido', 2, 7),
    text: 'No meio de uma tarefa de importância, sua mente vaga, e você esquece um detalhe decisivo: a porta, a chama, o selo. O erro custa um prejuízo grande e coloca alguém em risco. Todos olham.',
    choices: [
      { text: 'Assumir o erro, e propor uma forma de consertá-lo.', res: { text: 'A humildade pesa, e conserta. Você cria listas, lembretes, rituais. Seu defeito, agora, tem muletas e disciplina.', fx: { setFlags: ['f_di_rotina'], karma: 4, stats: { dao: 2, comp: 1 }, pedras: -60, agenda: [{ event: 'fl_dis_4', em: [8, 16] }] } } },
      { text: 'Culpar as circunstâncias.', res: { text: 'Alguns acreditam, outros não. O erro, sem lição, volta a acontecer, e o preço, a cada vez, é maior.', fx: { setFlags: ['f_di_culpou'], karma: -3, fama: -4, stats: { dao: -1 }, agenda: [{ event: 'fl_dis_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_dis_4', title: 'O Mestre Que Entendeu Você', rarity: 'raro', once: true, weight: 0, cond: F('distraido', 2, 7),
    text: 'Um mestre estranho, famoso por dar aulas de pé num pé só, diz que a sua dispersão é uma forma de atenção: você vê tudo, só não escolhe o que olhar. Ele propõe ensinar a escolher sem calar o resto.',
    choices: [
      { text: 'Aprender o Olhar Aberto, com o mestre.', check: { stat: ['comp', 'dao'], dif: 1, tag: 'mente' }, ok: { text: 'O mestre ensina a atenção larga: ver o todo, e escolher o ponto. A dispersão, antes inimiga, vira um tipo de visão.', fx: { setFlags: ['f_di_olhar_aberto'], tecnica: ['olho_lotus'], stats: { comp: 2, esp: 2 }, agenda: [{ event: 'fl_dis_5', em: [10, 22] }] } }, fail: { text: 'O mestre elogia o esforço, e manda treinar mais. A mente, teimosa, ainda vagueia, mas agora sabe que há outro jeito.', fx: { stats: { comp: 1, dao: 1 }, agenda: [{ event: 'fl_dis_5', em: [10, 22] }] } } },
      { text: 'Recusar: a mente, desse jeito, já funciona.', res: { text: 'O mestre assente. Cada um tem sua forma de ver o mundo, e a sua é peculiar, e basta.', fx: { stats: { dao: 1, comp: 1 }, agenda: [{ event: 'fl_dis_5', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'fl_dis_5', title: 'A Atenção Que Aprendeu a Pousar', rarity: 'lendario', once: true, weight: 1.8, cond: F('distraido', 3, 8),
    text: 'Uma cena simples, uma xícara de chá. Você passa uma hora inteira apenas olhando o vapor subir, sem que a mente vague. É a primeira vez em décadas. O mestre diz: "Agora a atenção pousa onde você pede. Já pode largar a muleta."',
    choices: [
      { text: 'Largar as muletas e confiar na atenção.', check: { stat: ['dao', 'comp'], dif: 2 }, ok: { text: 'Você passa um dia inteiro sem listas, sem lembretes, sem desvios. A mente, enfim, é sua.', fx: { superar: true, stats: { dao: 3, comp: 3 }, xp: 8, setFlags: ['f_di_superado'] } }, fail: { text: 'No meio do dia, a mente vaga de novo. Você ri, retoma as muletas, e entende que a atenção também é ofício diário.', fx: { stats: { dao: 2 } } } },
      { text: 'Encerrar a jornada como O Olhar Que Pousa: ensinar atenção a quem se dispersa.', cond: { flags: ['f_di_olhar_aberto'] }, res: { text: 'Você abre uma escola de atenção, para os que a vida inteira ouviram que não prestavam. Muitos descobrem que a dispersão era, no fundo, curiosidade sem rumo. Quando você parte, a escola segue.', fx: { fim: 'redencao_distraido' } } },
      { text: 'Seguir como está: a dispersão tem seus encantos.', res: { text: 'A mente vagueia, e você deixa. Algumas das melhores ideias da sua vida nasceram assim.', fx: { stats: { comp: 2 } } } },
    ],
  },

  /* ================= SANGUE QUENTE ================= */
  {
    id: 'fl_imp_1', title: 'O Soco Antes da Pergunta', rarity: 'comum', once: true, weight: 2.5, cond: F('impulsivo', 1, 3),
    text: 'Um estranho faz uma piada sobre sua família, e a mão já estava no rosto dele antes de você pensar. O homem, sangrando, olha atônito. Era só uma piada ruim, de um forasteiro que não sabia de nada.',
    choices: [
      { text: 'Pedir desculpas e pagar o curativo.', res: { text: 'O estranho, surpreso, aceita. Vocês acabam em uma taverna, e ele conta que perdeu a família há pouco: a piada era um jeito torto de chorar.', fx: { setFlags: ['f_im_desculpou'], karma: 4, pedras: -10, stats: { dao: 1, car: 1 }, agenda: [{ event: 'fl_imp_2', em: [4, 9] }] } } },
      { text: 'Manter a postura: quem provoca, aguenta.', res: { text: 'O estranho vai embora, humilhado, e conta a história errada. A fama de encrenqueiro chega antes de você a todos os lugares.', fx: { setFlags: ['f_im_encrenqueiro'], fama: -3, stats: { fis: 1 }, karma: -2, agenda: [{ event: 'fl_imp_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'fl_imp_2', title: 'A Briga Que Não Era Sua', rarity: 'raro', once: true, weight: 0, escala: true, cond: F('impulsivo', 1, 6),
    text: 'Numa taverna, um grupo cerca um rapaz que você nunca viu. Sem pensar, você já está entre eles, de punhos erguidos. Só depois entende que o rapaz era um ladrão, e que o grupo o perseguia com razão.',
    choices: [
      { text: 'Lutar mesmo assim: já entrou, vai até o fim.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você vence, e as consequências viram dívidas: o ladrão escapa, o grupo exige reparo, o taverneiro cobra o prejuízo.', fx: { setFlags: ['f_im_briga'], fama: 3, karma: -3, pedras: -40, stats: { fis: 1 }, agenda: [{ event: 'fl_imp_3', em: [8, 16] }] } }, fail: { text: 'Apanha de todos, e o ladrão foge com a sua carteira. Humilhação tripla.', fx: { setFlags: ['f_im_briga'], ferida: 3, pedras: -30, fama: -4, agenda: [{ event: 'fl_imp_3', em: [8, 16] }] } } },
      { text: 'Parar no meio e se desculpar com o grupo.', res: { text: 'Você baixa os punhos. O grupo, perplexo, aceita. Parar no meio de uma impulsividade é, descobre, uma força nova.', fx: { setFlags: ['f_im_parou'], karma: 3, stats: { dao: 2 }, agenda: [{ event: 'fl_imp_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_imp_3', title: 'O Que a Pressa Custou', rarity: 'raro', once: true, weight: 0, cond: F('impulsivo', 2, 7),
    text: 'Uma decisão apressada, desta vez, não foi de punhos: foi de palavra. Você aceitou uma tarefa sem ler os termos, e agora tem uma dívida de honra com alguém que você não conhece, e uma cláusula que exige muito.',
    choices: [
      { text: 'Cumprir a tarefa, mesmo caro, para manter a palavra.', res: { text: 'Meses de trabalho duro, sem queixa. O contratante, impressionado, passa a confiar em você e a oferecer coisas melhores.', fx: { setFlags: ['f_im_palavra'], karma: 4, pedras: -60, stats: { dao: 2 }, fama: 4, agenda: [{ event: 'fl_imp_4', em: [8, 16] }] } } },
      { text: 'Quebrar o acordo e fugir.', res: { text: 'Você some. Sua palavra, a partir daí, vale menos, e o nome, também. Há quem não esqueça.', fx: { setFlags: ['f_im_quebrou'], karma: -4, fama: -5, stats: { dao: -1 }, agenda: [{ event: 'fl_imp_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_imp_4', title: 'O Mestre da Calma', rarity: 'raro', once: true, weight: 0, cond: F('impulsivo', 2, 7),
    text: 'Um mestre antigo, de olhos tranquilos, vê você parar no meio de um gesto raivoso. "Quase", diz. "Em vez de lutar contra o sangue, aprenda a dançar com ele." Propõe um ano de treino de pausa: respirar três vezes antes de cada ato.',
    choices: [
      { text: 'Aceitar o ano de treino de pausa.', res: { text: 'Respirar três vezes parece pouco, e é muito. Ao fim do ano, o impulso ainda está lá, mas há um espaço antes dele, e você mora nesse espaço.', fx: { setFlags: ['f_im_pausa'], anos: 1, stats: { dao: 3, comp: 1 }, agenda: [{ event: 'fl_imp_5', em: [10, 22] }] } } },
      { text: 'Recusar: a impulsividade também é força.', res: { text: 'O mestre assente. Você segue como está, e continua tendo, de vez em quando, a mesma conversa consigo.', fx: { stats: { fis: 1 }, agenda: [{ event: 'fl_imp_5', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'fl_imp_5', title: 'O Sangue Que Aprendeu a Esperar', rarity: 'lendario', once: true, weight: 1.8, cond: F('impulsivo', 3, 8),
    text: 'Um provocador, o mais habilidoso que você já viu, passa três dias o insultando, sem parar, de todos os jeitos possíveis. Você sabe que é teste. Sabe também que seu sangue ferve. O desafio é simples: passar os três dias sem erguer a mão.',
    choices: [
      { text: 'Aguentar os três dias de provocação sem reagir.', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'No terceiro dia, o provocador se ajoelha: "Eu nunca vi ninguém aguentar." O sangue, antes mestre, virou aprendiz.', fx: { superar: true, stats: { dao: 4, car: 1 }, fama: 10, karma: 5, setFlags: ['f_im_superado'] } }, fail: { text: 'No segundo dia, a mão voou. Você ganha uma luta e perde o teste. Mas sabe agora, com clareza, onde está o limite.', fx: { ferida: 1, stats: { dao: 2 }, fama: 2 } } },
      { text: 'Encerrar a jornada como O Punho Que Espera: viver ensinando guerreiros a aguentar provocação.', cond: { flags: ['f_im_pausa'] }, res: { text: 'Você abre um dojo onde a primeira lição é não bater. Os alunos, a princípio, riem; depois, entendem. Quando você parte, o dojo ensina a dar o segundo golpe só depois do terceiro suspiro.', fx: { fim: 'redencao_impulsivo' } } },
      { text: 'Recusar o teste e seguir em frente.', res: { text: 'O provocador se cansa, e vai embora. O sangue, tranquilo, volta a ferver, de leve, num canto.', fx: { stats: { fis: 1 } } } },
    ],
  },

  /* ================= MÃO FECHADA ================= */
  {
    id: 'fl_ava_1', title: 'O Cofre Que Nunca Abre', rarity: 'comum', once: true, weight: 2.5, cond: F('avarento', 1, 3),
    text: 'Seus amigos o chamam de "pão-duro" com carinho. Você conta pedras antes de dormir, e acorda contando de novo. Hoje, uma mulher bate à sua porta: o filho dela está doente, e ela pede uma pequena quantia emprestada para um remédio.',
    choices: [
      { text: 'Emprestar, apertando os dentes.', res: { text: 'A mão treme ao entregar. O filho melhora, a mulher chora, e você, para sua surpresa, não se arrepende. Algo, no cofre, se afrouxa.', fx: { setFlags: ['f_av_emprestou'], pedras: -20, karma: 6, stats: { car: 1, dao: 1 }, agenda: [{ event: 'fl_ava_2', em: [4, 9] }] } } },
      { text: 'Recusar: quem empresta, perde.', res: { text: 'A mulher agradece mesmo assim, com uma cortesia que corta. Você fecha a porta, conta de novo as pedras, e dorme mal.', fx: { setFlags: ['f_av_negou'], karma: -4, stats: { sor: 1 }, agenda: [{ event: 'fl_ava_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'fl_ava_2', title: 'O Preço de Cada Coisa', rarity: 'raro', once: true, weight: 0, cond: F('avarento', 1, 6),
    text: 'Você descobre um truque: comprar barato e vender caro, com margens pequenas e constantes. Em seis meses, a bolsa dobra. Mas nenhum amigo o visita mais: você só trata de lucro, e eles sentem.',
    choices: [
      { text: 'Seguir o lucro: amigo se perde, dinheiro fica.', res: { text: 'A bolsa engorda, e o silêncio da casa também. Você aprende o valor de cada moeda e o custo de cada ausência.', fx: { setFlags: ['f_av_lucro'], pedras: 200, karma: -3, stats: { comp: 1, car: -1 }, agenda: [{ event: 'fl_ava_3', em: [8, 16] }] } } },
      { text: 'Dividir parte do lucro com os amigos.', cond: { flags: ['f_av_emprestou'] }, res: { text: 'Cada pedra repartida é um nó de amizade. A bolsa cresce menos, e a vida, mais.', fx: { setFlags: ['f_av_dividiu'], pedras: 80, karma: 6, stats: { car: 2 }, agenda: [{ event: 'fl_ava_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_ava_3', title: 'O Ladrão de Sua Fortuna', rarity: 'raro', once: true, weight: 0, escala: true, cond: F('avarento', 2, 7),
    text: 'Uma noite, o cofre aparece vazio. Quem o roubou sabia onde ficava, e como abrir. A fortuna de uma década sumiu, e a polícia da vila diz que quase nada pode ser feito. A raiva, a dor e o pânico dividem o seu peito.',
    choices: [
      { text: 'Perseguir o ladrão, custe o que custar.', check: { stat: ['fis', 'comp', 'sor'], dif: 1, tag: 'combate' }, ok: { text: 'A busca dura meses. Quando o alcança, ele já gastou metade, mas a metade que sobra é sua, e uma nova humildade vem junto: era dinheiro. Só dinheiro.', fx: { setFlags: ['f_av_perseguiu'], pedras: 150, stats: { dao: 1, comp: 1 }, ferida: 1, agenda: [{ event: 'fl_ava_4', em: [8, 16] }] } }, fail: { text: 'O ladrão some, e a perseguição consome o resto. Você acaba sem nada, e livre de uma ideia: a de que a fortuna era você.', fx: { pedras: -100, ferida: 2, stats: { dao: 2 }, agenda: [{ event: 'fl_ava_4', em: [8, 16] }] } } },
      { text: 'Deixar o dinheiro ir, e recomeçar do zero.', res: { text: 'É a decisão mais difícil da sua vida. Você respira, e sente o peso de um cofre vazio, e, para sua surpresa, uma leveza.', fx: { setFlags: ['f_av_recomecou'], pedras: -2000, stats: { dao: 3 }, karma: 4, agenda: [{ event: 'fl_ava_4', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'fl_ava_4', title: 'A Fortuna Que Virou Fardo', rarity: 'raro', once: true, weight: 0, cond: F('avarento', 2, 7),
    text: 'Quem acumulou muito sente que cada pedra tem olhos. Você passa a dormir com a bolsa no peito, a desconfiar de amigos e sombras. Um velho monge, de passagem, diz: "Ricos são os pobres que ainda não sabem gastar."',
    choices: [
      { text: 'Fazer uma doação grande, de uma vez.', cond: { pedrasMin: 150 }, res: { text: 'Você entrega uma fortuna a uma escola. Sai de mãos vazias, e leve como não era há décadas.', fx: { setFlags: ['f_av_doou'], pedras: -150, karma: 12, fama: 8, stats: { dao: 3, car: 1 }, agenda: [{ event: 'fl_ava_5', em: [10, 22] }] } } },
      { text: 'Reforçar a segurança e acumular mais.', res: { text: 'A bolsa cresce, e o sono, não. A fortuna, agora, pesa, e você não sabe quando pesou demais.', fx: { setFlags: ['f_av_mais'], pedras: 220, karma: -3, stats: { dao: -1 }, agenda: [{ event: 'fl_ava_5', em: [10, 22] }] } } },
      { text: 'Usar o dinheiro para uma coisa de que goste, só para si.', res: { text: 'Uma noite de banquete, um instrumento de música, uma viagem curta. Você descobre o que o dinheiro compra de bom, e volta mais leve.', fx: { pedras: -60, stats: { dao: 2, car: 1 }, agenda: [{ event: 'fl_ava_5', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'fl_ava_5', title: 'A Mão Que Aprendeu a Abrir', rarity: 'lendario', once: true, weight: 1.8, cond: F('avarento', 3, 8),
    text: 'O último passo é dar sem esperar nada de volta, nem agradecimento, nem fama, nem a promessa de ser lembrado. Alguém, em necessidade real, aparece, e a sua mão, fechada por décadas, precisa decidir.',
    choices: [
      { text: 'Dar, em segredo, o que a pessoa precisa, sem se identificar.', cond: { pedrasMin: 100 }, check: { stat: ['dao', 'car'], dif: 1 }, ok: { text: 'Você deixa a bolsa à porta, sem bilhete. Nunca saberá se chegou. A mão, antes fechada, descobre que dar em segredo é a única forma pura de gastar.', fx: { superar: true, pedras: -100, karma: 12, stats: { dao: 4, car: 2 }, setFlags: ['f_av_superado'] } }, fail: { text: 'Você hesita, e o gesto sai torto: a pessoa o vê, agradece, e a gratidão incomoda. Mas deu, e isso conta.', fx: { pedras: -60, karma: 6, stats: { dao: 2 } } } },
      { text: 'Encerrar a jornada como O Mão Aberta: gastar o resto da fortuna fundando um fundo para quem precisa.', cond: { flags: ['f_av_doou'] }, res: { text: 'Você divide, em vida, tudo o que juntou. O fundo atende vilas inteiras. O avarento que você era deixou de existir, e ninguém o chora, e todos o louvam sem saber.', fx: { fim: 'redencao_avarento' } } },
      { text: 'Seguir guardando: segurança também é cuidado.', res: { text: 'Você segue contando pedras, com menos ânsia. A mão fechada afrouxou um pouco, e já é muito.', fx: { stats: { dao: 1 } } } },
    ],
  },
];

/* =====================================================================
 * MOLDES: opções exclusivas de cada defeito em eventos comuns
 * ===================================================================== */
export const moldesDefeitos: Molde[] = [
  // Meridianos Estreitos
  { id: 'me_cul', alvo: ['cultivo'], choice: { cond: { flaw: ['meridianos_estreitos'] }, text: 'Refinar o Qi gota a gota, como quem enfia linha numa agulha.', res: { text: 'Cada ciclo é lento e limpo. Os outros correm; você afunda. Em meses, o seu Qi tem uma pureza que a pressa não dá.', fx: { xp: 5, stats: { dao: 1, esp: 1 }, setFlags: ['f_me_paciente'] } } } },
  { id: 'me_com', alvo: ['combate', 'perigo'], choice: { cond: { flaw: ['meridianos_estreitos'] }, text: 'Concentrar todo o Qi num único fio e acertar um ponto só.', check: { stat: ['esp', 'comp'], dif: 1, tag: 'combate' }, ok: { text: 'O fio atravessa o ponto fraco. O inimigo cai, sem entender como um golpe tão fino derrubou algo tão grande.', fx: { fama: 6, stats: { esp: 1 }, setFlags: ['f_me_golpe_fio'] } }, fail: { text: 'O fio falha por um dedo, e o Qi, represado, volta contra você.', fx: { ferida: 2, stats: { esp: 1 } } } } },
  { id: 'me_tes', alvo: ['tesouro'], choice: { cond: { flaw: ['meridianos_estreitos'] }, text: 'Usar o item em doses minúsculas, espalhadas no tempo.', res: { text: 'Uma gota por dia, por um mês. O que os outros engoliriam de uma vez, você absorve inteiro, sem desperdiçar.', fx: { xp: 7, stats: { dao: 1 }, setFlags: ['f_me_paciente'] } } } },
  // Azar Persistente
  { id: 'az_per', alvo: ['perigo', 'combate'], choice: { cond: { flaw: ['azar'] }, text: 'Esperar o azar vir primeiro, para depois agir.', res: { text: 'Você deixa tudo dar errado de um jeito pequeno, e então age. O pior já passou, e a calma de quem está calejado serve.', fx: { setFlags: ['f_az_sinais'], stats: { dao: 1, sor: 1 }, xp: 3 } } } },
  { id: 'az_tes', alvo: ['tesouro', 'viagem'], choice: { cond: { flaw: ['azar'] }, text: 'Fazer um plano B, e um C, e um D.', res: { text: 'Quem tem azar sabe quantas coisas podem falhar. Você tem planos para todas, e consegue o que queria, devagar.', fx: { setFlags: ['f_az_planob'], stats: { comp: 1, dao: 1 }, pedras: 30 } } } },
  { id: 'az_soc', alvo: ['social'], choice: { cond: { flaw: ['azar'] }, text: 'Rir do próprio azar e quebrar o gelo.', res: { text: 'A piada sobre você mesmo desarma a sala. As pessoas, sem saber por quê, passam a gostar de quem tem a coragem de rir.', fx: { setFlags: ['f_az_risada'], fama: 3, stats: { car: 1 }, karma: 1 } } } },
  // Qi Instável
  { id: 'qi_cul', alvo: ['cultivo'], choice: { cond: { flaw: ['qi_instavel'] }, text: 'Deixar o Qi subir em espiral e tentar surfar nele.', check: { stat: ['dao', 'esp'], dif: 1, tag: 'qi' }, ok: { text: 'A espiral cresce, e você a cavalga. O Qi dispara em frente, de um jeito que só o instável conhece.', fx: { xp: 12, stats: { esp: 1 }, setFlags: ['f_qi_espiral'] } }, fail: { text: 'A espiral explode. Você é arremessado, chamuscado, de sobrancelha queimada.', fx: { ferida: 2, corr: 2 } } } },
  { id: 'qi_com', alvo: ['combate', 'perigo'], choice: { cond: { flaw: ['qi_instavel'] }, text: 'Liberar uma explosão de Qi descontrolada.', check: { stat: ['esp', 'fis'], dif: 1, tag: 'combate' }, ok: { text: 'A explosão varre o inimigo e o terreno. Amigos recuam, assustados com a sua força.', fx: { fama: 7, stats: { esp: 1 }, ferida: 1, setFlags: ['f_qi_controle'] } }, fail: { text: 'A explosão vira contra você, e o inimigo ri, entre faíscas.', fx: { ferida: 3, fama: -2 } } } },
  { id: 'qi_tes', alvo: ['tesouro', 'social'], choice: { cond: { flaw: ['qi_instavel'] }, text: 'Pedir ao dono do objeto que o ajude a estabilizar o seu Qi, em troca.', res: { text: 'Um estudo cuidadoso, uma troca justa. O dono ganha uma história, e você, um segredo de contenção.', fx: { setFlags: ['f_qi_mestre'], stats: { comp: 1, dao: 1 }, pedras: -20 } } } },
  // Coração Covarde
  { id: 'cv_per', alvo: ['perigo', 'combate'], choice: { cond: { flaw: ['covarde'] }, text: 'Farejar a saída antes de qualquer outra coisa.', check: { stat: ['esp', 'sor'], dif: 0, tag: 'fuga' }, ok: { text: 'O medo, afiado, mostra a única rota segura. Você a toma, e leva consigo quem quiser seguir.', fx: { stats: { esp: 1, sor: 1 }, setFlags: ['f_cv_batedor'], karma: 2 } }, fail: { text: 'O medo o paralisa. Você aguenta o susto, e perde o momento.', fx: { stats: { dao: -1 }, ferida: 1 } } } },
  { id: 'cv_soc', alvo: ['social'], choice: { cond: { flaw: ['covarde'] }, text: 'Admitir em voz alta que tem medo, e pedir ajuda.', res: { text: 'A franqueza desarma. Algumas pessoas riem, outras dão a mão. Quem dá, fica.', fx: { karma: 4, stats: { dao: 1, car: 1 }, setFlags: ['f_cv_gritou'] } } } },
  { id: 'cv_tes', alvo: ['tesouro', 'viagem', 'cultivo'], choice: { cond: { flaw: ['covarde'] }, text: 'Pôr à frente quem tem mais coragem, e ficar na retaguarda observando.', res: { text: 'Você deixa que o outro desbrave. Na retaguarda, vê armadilhas que o corajoso ignora. A parceria rende, e rende pouco, e rende a vida inteira.', fx: { stats: { comp: 1, esp: 1 }, pedras: 30, setFlags: ['f_cv_batedor'] } } } },
  // Constituição Frágil
  { id: 'do_per', alvo: ['perigo', 'viagem'], choice: { cond: { flaw: ['doente'] }, text: 'Escutar o corpo e antecipar o que vem: recuar a tempo.', res: { text: 'A dor de ontem avisa do perigo de amanhã. Você desvia de uma tragédia que só você sentiu chegar.', fx: { stats: { esp: 1, dao: 1 }, setFlags: ['f_do_escuta'], xp: 3 } } } },
  { id: 'do_cul', alvo: ['cultivo', 'tesouro'], choice: { cond: { flaw: ['doente'] }, text: 'Preparar uma infusão de ervas e cuidar do corpo antes de agir.', res: { text: 'Um dia de chá e repouso, e o corpo agradece. O resto da semana rende o dobro.', fx: { stats: { fis: 1 }, xp: 5, setFlags: ['f_do_tratou'], vida: 3 } } } },
  { id: 'do_soc', alvo: ['social', 'combate'], choice: { cond: { flaw: ['doente'] }, text: 'Usar a fragilidade como disfarce: ninguém teme quem parece doente.', res: { text: 'O adversário baixa a guarda. A palavra que sai, no momento certo, vale mais que um golpe.', fx: { fama: 3, stats: { car: 1, comp: 1 }, setFlags: ['f_do_escuta'] } } } },
  // Orgulho Ferido
  { id: 'or_soc', alvo: ['social'], choice: { cond: { flaw: ['orgulhoso'] }, text: 'Exigir o respeito que lhe é devido.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'A sala se cala, impressionada com a firmeza. O que você exigiu, você recebe, e algo mais, que não pediu: medo.', fx: { fama: 6, stats: { car: 1 }, karma: -2, setFlags: ['f_or_alternativa'] } }, fail: { text: 'A exigência soa arrogante, e a sala, em vez de respeitar, ri baixinho.', fx: { fama: -4, stats: { dao: -1 } } } } },
  { id: 'or_com', alvo: ['combate', 'perigo'], choice: { cond: { flaw: ['orgulhoso'] }, text: 'Recusar ajuda e enfrentar sozinho, por honra.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você vence sem ajuda. O orgulho, saciado, vira uma força de que os outros precisam saber.', fx: { fama: 8, stats: { dao: 1, fis: 1 }, setFlags: ['f_or_duelou'] } }, fail: { text: 'O orgulho cobra caro: você perde, e perde sozinho.', fx: { ferida: 3, fama: -3 } } } },
  { id: 'or_tes', alvo: ['tesouro', 'viagem'], choice: { cond: { flaw: ['orgulhoso'] }, text: 'Provar que não precisa de ninguém, e fazer tudo à própria maneira.', res: { text: 'É mais difícil, e mais seu. Você consegue, com mais cansaço, e leva a vantagem de nunca dever favor.', fx: { stats: { dao: 1, fis: 1 }, xp: 4, setFlags: ['f_or_sem_mestre'] } } } },
  // Mente Dispersa
  { id: 'di_cul', alvo: ['cultivo'], choice: { cond: { flaw: ['distraido'] }, text: 'Seguir o desvio da mente e ver aonde ele leva.', check: { stat: ['comp', 'esp'], dif: 1, tag: 'qi' }, ok: { text: 'A divagação vira descoberta: uma conexão que ninguém fez. Você anota correndo, antes que fuja.', fx: { xp: 8, stats: { comp: 2 }, setFlags: ['f_di_ideias'] } }, fail: { text: 'A mente vagueia para longe demais. Você perde a tarde, e o fio da prática.', fx: { stats: { comp: 1 } } } } },
  { id: 'di_soc', alvo: ['social', 'tesouro'], choice: { cond: { flaw: ['distraido'] }, text: 'Notar o detalhe que todos ignoram, sem querer.', res: { text: 'Enquanto todos olham para a frente, a sua mente, perdida, vê o canto: uma marca, uma pegada, um olhar. É o detalhe que vale.', fx: { stats: { comp: 1, sor: 1 }, fama: 2, pedras: 30, setFlags: ['f_di_ideias'] } } } },
  { id: 'di_per', alvo: ['perigo', 'combate'], choice: { cond: { flaw: ['distraido'] }, text: 'Anotar tudo à mão, para não esquecer o detalhe decisivo.', res: { text: 'As listas, os rabiscos, os lembretes: quem sabe do próprio defeito se protege dele. Você não esquece nada, desta vez.', fx: { stats: { comp: 1, dao: 1 }, setFlags: ['f_di_rotina'], xp: 3 } } } },
  // Sangue Quente
  { id: 'im_com', alvo: ['combate'], choice: { cond: { flaw: ['impulsivo'] }, text: 'Atacar primeiro, sem esperar nada.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'combate' }, ok: { text: 'O primeiro golpe é um raio. O adversário nem ergue a guarda. A luta acaba antes de começar, e você sorri, ofegante.', fx: { fama: 6, stats: { fis: 1 }, karma: -1, setFlags: ['f_im_briga'] } }, fail: { text: 'O golpe afoito erra, e o contragolpe acerta. A pressa cobra caro.', fx: { ferida: 3, fama: -2 } } } },
  { id: 'im_soc', alvo: ['social', 'perigo'], choice: { cond: { flaw: ['impulsivo'] }, text: 'Dizer o que pensa, sem filtro.', res: { text: 'A franqueza brutal corta a conversa ao meio. Alguns se ofendem, outros respeitam. Nenhum esquece.', fx: { fama: 3, karma: -2, stats: { car: 1 }, setFlags: ['f_im_encrenqueiro'] } } } },
  { id: 'im_tes', alvo: ['tesouro', 'viagem', 'cultivo'], choice: { cond: { flaw: ['impulsivo'] }, text: 'Pegar logo, antes que alguém pense duas vezes.', check: { stat: ['sor', 'fis'], dif: 1 }, ok: { text: 'A rapidez compensa: o que os outros levariam uma hora decidindo, você já tem na mão.', fx: { pedras: 80, stats: { sor: 1 }, setFlags: ['f_im_briga'] } }, fail: { text: 'A pressa deixa uma armadilha disparar. Você sai com a mão chamuscada e a sensação de que devia ter esperado.', fx: { ferida: 2, pedras: -20 } } } },
  // Mão Fechada
  { id: 'av_tes', alvo: ['tesouro'], choice: { cond: { flaw: ['avarento'] }, text: 'Pechinchar até o último centavo.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'O dono cede, resmungando. Você sai com o dobro pelo preço, e a certeza de que cada pedra economizada é uma pedra ganha.', fx: { pedras: 90, stats: { car: 1 }, setFlags: ['f_av_lucro'] } }, fail: { text: 'O dono se ofende com a mesquinharia, e fecha o negócio. Você economiza o nada.', fx: { fama: -2, stats: { car: -1 } } } } },
  { id: 'av_soc', alvo: ['social', 'viagem'], choice: { cond: { flaw: ['avarento'] }, text: 'Oferecer pouco, e deixar que o outro pareça generoso.', res: { text: 'A conta sai barata, e a conversa, amarga. O outro percebe a mesquinharia, mas aceita, e anota.', fx: { pedras: 40, karma: -2, setFlags: ['f_av_lucro'] } } } },
  { id: 'av_per', alvo: ['perigo', 'combate', 'cultivo'], choice: { cond: { flaw: ['avarento'] }, text: 'Guardar o que tem de melhor e usar só o necessário.', res: { text: 'Você poupa o item caro, e resolve com o barato. Funciona, desta vez, e a bolsa, intacta, agradece.', fx: { pedras: 30, stats: { comp: 1 }, setFlags: ['f_av_mais'] } } } },
];
