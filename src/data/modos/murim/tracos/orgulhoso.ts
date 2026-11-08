import type { ConjuntoTraco } from './tipos';

/**
 * Defeito: Rancor persistente (orgulhoso). Conceito: uma ofensa antiga guia suas decisões; o passado não perdoa nem é perdoado.
 * Força opções: só quem tem o defeito vê as saídas de quem não consegue largar a ofensa. Cicatriz: o rancor vira a única história que se conta.
 * Redenção: ran_a_ofensa_devolvida, a escolha difícil de largar o rancor diante de quem o causou (fx.superar).
 * Cenas: ran_a_pedra_no_sapato (infância) -> ran_o_rival_que_pediu_perdao (juventude) -> ran_a_ofensa_devolvida (maturidade) -> ran_o_que_sobrou (velhice).
 */
const F = { flaw: ['orgulhoso'] };

export const ORGULHOSO: ConjuntoTraco = {
  eventos: [
    {
      id: 'ran_a_pedra_no_sapato', title: 'A ofensa na praça', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 7, ageMax: 14 },
      text: 'Na praça da vila, diante dos outros meninos, um deles chama sua família de «gente que nunca teve nome». Todos riem. Você sente o rosto esquentar e os punhos se fecharem sozinhos. O menino, que é filho de um cobrador, nem lembrará disso amanhã. Você, sim. Você já sabe que lembrará disso por muito tempo.',
      choices: [
        { p: 'V', text: 'Empurrar o menino na lama diante de todos', res: { text: 'O menino cai, a praça se cala, e o pai dele aparece três horas depois, furioso, na sua porta. Seu pai paga o prejuízo com a cabeça baixa. Você ganha a respeito dos meninos e perde a paz de casa, e a ofensa, em vez de sumir, vira uma dívida em dobro.', fx: { fama: 1, karma: -2, stats: { dao: 1 }, setFlags: ['ran_empurrou'] } } },
        { p: 'D', text: 'Ficar calado, guardar o nome do menino e a data, e esperar o dia certo', res: { text: 'Você não responde. Os meninos estranham o silêncio. Naquela noite, você grava o nome dele e a frase na memória, como quem guarda uma moeda. O dia certo demora vinte anos, e quando chega, a moeda pesa mais do que o menino.', fx: { stats: { dao: 2 }, setFlags: ['ran_guardou_o_nome'] } } },
        { p: 'C', text: 'Contar à sua mãe o que aconteceu e perguntar de onde vem o nome da família', res: { text: 'A mãe conta, devagar, a história da família: um bisavô que perdeu terras e título. Não há vergonha, só azar. Você entende a ofensa como uma ignorância do outro, e não como uma verdade sobre você. O rancor não some, mas deixa de ter fundamento.', fx: { karma: 2, stats: { car: 1, dao: 1 }, setFlags: ['ran_perguntou_a_mae'] } } },
      ],
    },
    {
      id: 'ran_o_rival_que_pediu_perdao', title: 'O perdão que chegou tarde', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 16, ageMax: 34 },
      text: 'O menino da praça é agora um jovem da escola vizinha, e vem até você sozinho, de cabeça baixa. Diz que se lembra do que falou, que se envergonha, e que quer pedir perdão. Os colegas observam de longe. O pedido é sincero e simples. A pedra que você carrega há anos não parece querer sair do bolso.',
      choices: [
        { p: 'C D', text: 'Aceitar o perdão em voz alta e apertar a mão dele diante dos colegas', check: { stat: ['dao', 'car'], dif: 1 }, ok: { text: 'O aperto é firme e o jovem sorri, com os olhos úmidos. Os colegas aplaudem, constrangidos. Você sente uma coisa se soltar na altura do peito, pequena, mas real. O rancor não desaparece, mas perde o lugar central. É a primeira vez que alguém o libera de algo que você não pediu.', fx: { fama: 2, karma: 4, stats: { dao: 2, car: 1 }, setFlags: ['ran_perdoou_cedo'] } }, fail: { text: 'As palavras saem rígidas, ocas. O jovem percebe que o perdão foi só formal e se afasta, magoado. O gesto, que deveria libertar, serve apenas para confirmar que a pedra continua ali, e que você mesmo a segura.', fx: { karma: 0, stats: { dao: 1 }, setFlags: ['ran_perdao_frio'] } } },
        { p: 'M', text: 'Recusar o perdão e responder que algumas ofensas não se apagam com palavras', res: { text: 'O jovem assente, pálido, e se retira. Os colegas se calam. Você sai do pátio sentindo-se vencedor e vazio ao mesmo tempo. A recusa, que parecia força, se mostra, na noite, uma forma lenta de se punir.', fx: { fama: 1, karma: -2, stats: { dao: 1 }, setFlags: ['ran_recusou_perdao'] } } },
        { p: 'T', text: 'Dizer que vai pensar e pedir tempo, sem rejeitar nem aceitar', res: { text: 'O jovem concorda, aliviado e incerto. Os meses passam. Você nunca responde, e ele nunca volta. A pergunta fica suspensa entre vocês como uma corda frouxa, e você descobre que o rancor pode viver tanto no não quanto no talvez.', fx: { stats: { dao: 1 }, setFlags: ['ran_adiou_perdao'] } } },
      ],
    },
    {
      id: 'ran_a_ofensa_devolvida', title: 'A casa do cobrador', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 28, ageMax: 58 },
      text: 'Anos depois, o pai do menino da praça, o velho cobrador, bate à sua porta, doente e quase cego, pedindo abrigo por uma noite. Foi ele quem humilhou seu pai tantas vezes, quem cobrou uma dívida injusta, quem carregou a sua família de vergonha. Agora, está diante de você, sem saber quem você é. A porta, entre os dois, é pequena como uma decisão.',
      choices: [
        { p: 'C D', text: 'Abrir a porta, dar-lhe comida e cama, sem dizer quem você é', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'O velho dorme na sua casa e, de manhã, agradece sem saber a quem. Você o acompanha até o fim da rua, e algo velho cede dentro de você: não o perdão, que seria cedo, mas o peso do rancor, que já não era tão grande. A ofensa deixa de ser a história que você conta de si mesmo.', fx: { fama: 3, karma: 5, stats: { dao: 3 }, superar: true, setFlags: ['ran_ofensa_largada', 'ran_abriu_a_porta'] } }, fail: { text: 'Você abre a porta, mas a voz sai áspera, o olhar, duro. O velho, mesmo cego, sente. Dorme encolhido, com medo, e parte antes do amanhecer. Você fica com a ofensa e com uma nova vergonha: a de ter tido a oportunidade e a ter usado para ferir.', fx: { karma: -2, stats: { dao: 1 }, setFlags: ['ran_porta_fria'] } } },
        { p: 'V M', text: 'Dizer quem você é, em voz baixa, e fechar a porta sem lhe dar abrigo', res: { text: 'O velho murmura que conhece o nome, que sabe que fez mal, que não tem direito a pedir. Vai embora de bengala no escuro. Na manhã seguinte, é encontrado no riacho, sem vida. Ninguém acusa você, mas o rancor, que pensava ter saciado, de repente pesa duas vezes mais.', fx: { karma: -5, fama: -2, stats: { dao: -1 }, setFlags: ['ran_fechou_a_porta'] } } },
        { p: 'T', text: 'Indicar a ele o templo, onde há abrigo, e não se envolver mais', res: { text: 'O velho agradece e segue ao templo, guiado por uma criança. Você fecha a porta e permanece em pé no escuro por muito tempo. Não o ajudou, não o feriu. O rancor, sem ser alimentado nem desfeito, ficou ali, parado, esperando a próxima ocasião.', fx: { stats: { dao: 1 }, setFlags: ['ran_indicou_o_templo'] } } },
      ],
    },
    {
      id: 'ran_o_que_sobrou', title: 'A pedra na gaveta', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...F, ageMin: 52 },
      text: 'Ao arrumar uma gaveta velha, você encontra uma pedra pequena e lisa, que guardou quando criança, no dia da ofensa na praça. Todos os anos, ao longo da vida, você a olhou e jurou lembrar. Agora, não lembra mais do rosto do menino, só da pedra e do que ela representava. Ela pesa na palma da sua mão, mais leve do que a memória.',
      choices: [
        { p: 'C O', text: 'Levar a pedra ao rio e deixá-la ir, com a data e o nome do menino, em voz alta', cond: { ...F, flagsAny: ['ran_ofensa_largada', 'ran_perdoou_cedo', 'ran_perguntou_a_mae', 'ran_abriu_a_porta'] }, res: { text: 'A pedra afunda sem som. Você fica na margem até o sol baixar, sentindo a mão leve pela primeira vez em décadas. Uma criança, de longe, joga uma pedra também, rindo. O rio devolve apenas a água, e você volta para casa devagar, sem nada nas mãos, e em paz.', fx: { fama: 2, karma: 4, stats: { dao: 3 }, setFlags: ['ran_fim_ok', 'ran_pedra_ao_rio'] } } },
        { p: 'D', text: 'Guardar a pedra de volta na gaveta, como um lembrete, mas sem mais olhá-la', res: { text: 'A gaveta fecha com um estalo seco. Você segue o dia, e o seguinte, e nunca mais a abre. A pedra, que antes guiava, agora só pesa onde não é vista. O rancor, enfim, aprendeu a ocupar menos espaço, mesmo sem ir embora.', fx: { karma: 1, stats: { dao: 2 }, setFlags: ['ran_fim_ok'] } } },
        { p: 'M', text: 'Dar a pedra a um jovem aprendiz, contando a ofensa e pedindo que a vingue', res: { text: 'O jovem escuta, pálido, e aceita a pedra. Anos depois, é você quem ouve dizer que o rapaz, motivado pelo rancor alheio, brigou e foi expulso da escola. A pedra mudou de dono, e a pedra pesou de novo, só que dessa vez no peito de outro.', fx: { karma: -3, fama: -1, stats: { dao: 1 }, setFlags: ['ran_fim_ok'] } } },
      ],
    },
  ],
  opcoes: {
    murim_torneio: [
      { p: 'V M', text: 'Escolher enfrentar o rival da infância nas chaves e vencê-lo sem poupar', cond: F, res: { text: 'Você o derruba na terceira rodada, com um golpe seco. A plateia aplaude a técnica, não o motivo. O rival se levanta, em silêncio, e você percebe que ele nem se lembrava de por que você o odiava. O troféu pesa pouco, e o rancor, de repente, também.', fx: { fama: 3, karma: -2, stats: { dao: 1 }, setFlags: ['ran_venceu_rival'] } } },
    ],
    murim_conselho: [
      { p: 'V', text: 'Desafiar Gwon Tae-seok com uma lista de todas as ofensas que o clã fez à sua família', cond: F, res: { text: 'A lista é longa e precisa. O conselho escuta em silêncio. Gwon sorri, apanhado, e nega tudo. Mas a lista, anexada às atas, se torna história. Você sai do conselho com o nome do clã na boca e um gosto amargo: a vingança, em papel, não alimenta ninguém.', fx: { fama: 2, karma: -1, stats: { dao: 1 }, setFlags: ['ran_lista_de_ofensas'] } } },
    ],
    murim_julgamento: [
      { p: 'V M', text: 'Recusar o acordo de Gwon e jurar que o clã pagará, mesmo que leve vinte anos', cond: F, res: { text: 'Gwon ri, lisonjeado. Você sai da sala com o juramento nos ombros, e os anos seguintes são regidos por ele. Cada decisão, cada amizade, cada viagem é medida pelo que aproxima ou afasta o dia do ajuste. É um tipo de lealdade a si mesmo que se parece muito com prisão.', fx: { fama: 2, karma: -2, stats: { dao: 2 }, setFlags: ['ran_juramento_de_vinte_anos'] } } },
    ],
    murim_duelo_ponte: [
      { p: 'V', text: 'Aceitar o duelo e dizer ao mascarado que, qualquer que seja o motivo dele, o seu é mais antigo', cond: F, res: { text: 'O mascarado hesita, sem entender, e a luta começa com uma raiva que não é dele. Você vence, e ao tirar a máscara dele, vê um rosto cansado, que não conhecia. A raiva que trouxe ao duelo não era para ele. Era para o passado, que não luta de volta.', fx: { fama: 3, karma: -1, setFlags: ['ran_duelo_antigo'] } } },
    ],
    murim_punicao: [
      { p: 'V', text: 'Inventar uma testemunha que culpe o filho do cobrador, aproveitando para acertar contas', cond: F, res: { text: 'O depoimento é falso, mas bem montado. O filho do cobrador é punido, e Dae-hyun é salvo. Você sai do pátio com a vitória nas mãos e uma dúvida na garganta: a quem, de fato, serviu a mentira? O rancor mente bem, e cobra caro depois.', fx: { fama: 1, karma: -4, stats: { dao: 1 }, setFlags: ['ran_testemunha_falsa'] } } },
    ],
    murim_festival: [
      { p: 'M', text: 'Recusar-se a pagar a taxa ao oficial que um dia humilhou sua família, mesmo que isso o expulse da praça', cond: F, res: { text: 'O oficial, constrangido, tenta ceder, mas já há gente olhando. A recusa vira um espetáculo pequeno, e você é retirado da praça por dois guardas. Do lado de fora, sozinho, a lanterna que você acendeu flutua no rio, e você a acompanha até desaparecer.', fx: { fama: 1, karma: -1, stats: { dao: 1 }, setFlags: ['ran_recusou_taxa'] } } },
    ],
  },
};
