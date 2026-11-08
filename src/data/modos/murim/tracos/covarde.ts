import type { ConjuntoTraco } from './tipos';

/**
 * Defeito: Hesitação sob pressão (covarde). Conceito: o perigo chega antes da coragem; o corpo congela e a decisão vem tarde.
 * Força opções: só quem tem o defeito vê as saídas de quem não consegue encarar de frente. Cicatriz: o dia em que a hesitação custou a outro.
 * Redenção: hes_a_porta_da_casa, o ato difícil de atravessar o medo uma vez, sem garantia (fx.superar).
 * Cenas: hes_o_cao_do_moinho (infância) -> hes_o_chamado_no_pátio (juventude) -> hes_a_porta_da_casa (maturidade) -> hes_o_medo_que_ficou (velhice).
 */
const F = { flaw: ['covarde'] };

export const COVARDE: ConjuntoTraco = {
  eventos: [
    {
      id: 'hes_o_cao_do_moinho', title: 'O cão do moinho', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 7, ageMax: 14 },
      text: 'Seu irmão menor atravessou o terreno do moinho atrás de uma bola e está agora de pé, congelado, diante do cão do moleiro, que rosna baixo, com os dentes à mostra. Você está a vinte passos, atrás da cerca. O cão ainda não avançou. Seu irmão olha para você, com os olhos arregalados, esperando. As suas pernas, de repente, não obedecem.',
      choices: [
        { p: 'C', text: 'Chamar o irmão em voz baixa e firme, dizendo para recuar um passo de cada vez', res: { text: 'Sua voz sai trêmula, mas inteira. O irmão recua, um passo, outro, os olhos fixos nos seus. O cão, entediado, deita-se. Quando o menino atravessa a cerca, você percebe que está chorando. Chorar, descobre, não impediu a voz de funcionar.', fx: { karma: 2, stats: { dao: 1 }, setFlags: ['hes_chamou_irmao'] } } },
        { p: 'T', text: 'Correr até a casa do moleiro e voltar com ele, em vez de se aproximar do cão', res: { text: 'Você corre, sem fôlego, e volta com o moleiro, que assobia e leva o cão. O irmão está inteiro, mas o tempo parece ter durado horas. Na volta para casa, ele não olha para você, não por raiva, mas porque ficou sozinho quando mais precisava. Você sabe disso.', fx: { karma: 1, stats: { dao: 1 }, setFlags: ['hes_foi_buscar_ajuda'] } } },
        { p: 'D', text: 'Ficar parado atrás da cerca, incapaz de qualquer ato, até o perigo passar', res: { text: 'O cão, depois de um tempo, perde o interesse e vai embora. O irmão atravessa a cerca e passa por você sem uma palavra. Nunca mais menciona o assunto. Mas você sabe que ele lembra, e que a cerca, daquele dia em diante, deixou de ser só madeira.', fx: { karma: -1, stats: { dao: -1 }, setFlags: ['hes_ficou_parado'] } } },
      ],
    },
    {
      id: 'hes_o_chamado_no_patio', title: 'A voz que não saiu', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 16, ageMax: 34 },
      text: 'No pátio da escola, três alunos mais velhos cercam um novato e começam a empurrá-lo, rindo. O novato olha ao redor procurando ajuda, e seus olhos passam por você. Você tem a voz presa na garganta. Sabe o que deveria dizer. Sabe até as palavras. Mas o corpo está em outro lugar, bem lá atrás, onde o medo faz casa.',
      choices: [
        { p: 'C', text: 'Forçar uma frase curta: «Deixem ele em paz», mesmo com a voz falhando', check: { stat: ['dao', 'car'], dif: 1 }, ok: { text: 'A frase sai pequena, rouca, mas audível. Os três se viram, surpresos. Um deles ri; os outros hesitam. O novato aproveita para fugir. Você fica ali, o coração disparado, descobrindo que as palavras, quando saem, pesam menos do que o medo de dizê-las.', fx: { fama: 2, karma: 3, stats: { dao: 2 }, setFlags: ['hes_falou_no_patio'] } }, fail: { text: 'A voz some no meio da frase e o que sai é um gemido engasgado. Os três riem de você também, e o novato, sem ninguém, é derrubado. O som da própria fraqueza fica no seu ouvido por semanas, mais alto do que o riso deles.', fx: { fama: -2, karma: -1, stats: { dao: 1 }, setFlags: ['hes_voz_falhou'] } } },
        { p: 'T', text: 'Ir buscar o mestre, rápido, e voltar com ele antes que a coisa piore', res: { text: 'O mestre chega a tempo, os três são repreendidos, e o novato se levanta, magoado. Nunca agradece, mas passa a sentar perto de você no refeitório, sem falar. Entre vocês, o silêncio é a conta que ninguém cobra.', fx: { fama: 1, karma: 1, setFlags: ['hes_foi_buscar_ajuda'] } } },
        { p: 'A', text: 'Fingir não ter visto e seguir seu caminho, esperando que o assunto se resolva sozinho', res: { text: 'Você passa pelo pátio com os olhos no chão. O novato apanha menos do que podia, e não volta mais à escola. Semanas depois, você ouve dizer que foi para outra cidade. O corpo congelado salvou-lhe a pele e custou a de outro, e essa conta, você sabe, não tem juros.', fx: { karma: -3, stats: { dao: -1 }, setFlags: ['hes_ficou_parado', 'hes_novato_perdido'] } } },
      ],
    },
    {
      id: 'hes_a_porta_da_casa', title: 'A porta em chamas', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 26, ageMax: 55 },
      text: 'Uma casa pega fogo à noite, na rua mais pobre da vila. Os vizinhos gritam; alguém diz que há uma criança no quarto dos fundos. A porta da frente é uma muralha de chamas, e você, do lado de fora, sente o corpo inteiro pedir que recue. Mas há um vão estreito, na lateral, por onde alguém pequeno e rápido poderia entrar. Os olhos de todos se voltam para você, que é o menor da rua.',
      choices: [
        { p: 'C D', text: 'Respirar fundo, molhar o manto no poço e entrar pelo vão, sem pensar no que pode acontecer', check: { stat: ['dao', 'fis'], dif: 2 }, ok: { text: 'O calor é um muro. A fumaça cega. Mas as mãos acham o menino, as pernas acham o vão, e vocês dois caem no chão da rua entre aplausos que você não ouve. O medo não passou: você simplesmente o atravessou, e do outro lado ele era menor do que parecia.', fx: { fama: 5, karma: 5, ferida: 1, stats: { dao: 3 }, superar: true, setFlags: ['hes_entrou_no_fogo', 'hes_atravessou_o_medo'] } }, fail: { text: 'A fumaça o vence na metade do caminho. Você cambaleia de volta, tossindo, sem o menino. Outro homem, mais rápido, o traz um minuto depois. Você sobrevive e carrega duas coisas: a tentativa, que foi real, e o fracasso, que também foi.', fx: { fama: 1, karma: 2, ferida: 2, stats: { dao: 2 }, setFlags: ['hes_tentou_e_falhou', 'hes_atravessou_o_medo'] } } },
        { p: 'T', text: 'Organizar os vizinhos em fila de baldes e pedir a alguém mais rápido que entre', res: { text: 'Um rapaz entra, retira a criança e sai com queimaduras leves. A fila de baldes contém o fogo antes que chegue às casas vizinhas. Você fez tudo que podia fazer sem arriscar o corpo, e na manhã seguinte ninguém o acusa. Você mesmo, sim.', fx: { fama: 2, karma: 1, stats: { car: 1 }, setFlags: ['hes_organizou_baldes'] } } },
        { p: 'M', text: 'Ficar parado, de olhos na porta, esperando que outro faça o que você não consegue', res: { text: 'Outro faz, e a criança se salva. Ninguém menciona que você ficou parado, mas você sente o peso dos olhos que não se viraram. À noite, deitado, repassa a cena cem vezes, e em cada versão, o seu corpo entra. É a única versão em que ele nunca entrou.', fx: { karma: -2, stats: { dao: -1 }, setFlags: ['hes_ficou_parado'] } } },
      ],
    },
    {
      id: 'hes_o_medo_que_ficou', title: 'O medo que não foi embora', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...F, ageMin: 50 },
      text: 'Um jovem, aprendiz de uma escola vizinha, procura você às escondidas. Confessa que tem medo: de lutar, de falar, de decepcionar. Diz que ouviu falar de você como alguém que sempre tremeu, e que mesmo assim fez o que era preciso. Pergunta, com a voz miúda, se o medo um dia passa. Você sabe a resposta, e ela não é bonita.',
      choices: [
        { p: 'C D', text: 'Dizer a verdade: o medo não passa, mas a gente aprende a andar com ele nos ombros', cond: { ...F, flagsAny: ['hes_atravessou_o_medo', 'hes_falou_no_patio', 'hes_chamou_irmao', 'hes_entrou_no_fogo'] }, res: { text: 'O jovem escuta, sério, e depois sorri com um alívio estranho. A verdade, dita sem enfeite, pesa menos que a mentira piedosa. Ele parte com uma frase no peito, e você, com a lembrança de que o medo, dito em voz alta, vira companhia e deixa de ser vergonha.', fx: { fama: 3, karma: 4, stats: { dao: 2 }, setFlags: ['hes_fim_ok', 'hes_medo_dito'] } } },
        { p: 'O', text: 'Contar a ele sobre o dia em que ficou parado, sem esconder, e o que isso custou', res: { text: 'O jovem se cala. Depois pergunta o que você faria diferente. Você responde que não sabe, e que só aprendeu a perguntar antes de congelar. Ele parte com a pergunta, e você fica com a sensação de ter pago, em honestidade, uma dívida velha.', fx: { karma: 3, stats: { dao: 2 }, setFlags: ['hes_fim_ok'] } } },
        { p: 'T', text: 'Dizer que o medo passa com os anos, para tranquilizá-lo', res: { text: 'O jovem agradece, aliviado, e vai embora. Meses depois, na primeira prova de coragem, descobre que a promessa era falsa, e volta, mais magoado do que assustado. Você dá a ele a verdade que devia ter dado antes, tarde e sem graça.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['hes_fim_ok'] } } },
      ],
    },
  ],
  opcoes: {
    murim_ataque: [
      { p: 'T', text: 'Recuar atrás da carroça e jogar uma pedra no cavalo do líder, para criar confusão', cond: F, res: { text: 'O cavalo empina, o líder cai, e os outros bandidos se atrapalham. Você aproveita para arrastar o cocheiro ferido para fora do caminho. Ninguém o chama de herói, mas ninguém morreu, e a confusão que você criou foi o único plano que funcionou.', fx: { fama: 1, karma: 1, setFlags: ['hes_pedra_no_cavalo'] } } },
    ],
    murim_assassino: [
      { p: 'T', text: 'Levar a oferta ao magistrado em segredo, sem ser visto, e não voltar a ver Choi Rin', cond: F, res: { text: 'O magistrado ouve com atenção e manda guardas discretos ao cobrador. Choi Rin, ao saber, desaparece da cidade. Você nunca a vê de novo, e nem o cobrador sabe de quem foi a denúncia. A coragem, às vezes, é só a prudência que escolheu o lado certo.', fx: { fama: 1, karma: 2, setFlags: ['hes_denunciou_em_segredo'] } } },
    ],
    murim_duelo_ponte: [
      { p: 'T', text: 'Recusar o duelo e abrir outra passagem rio acima, sem olhar para trás', cond: F, res: { text: 'A passagem rio acima é mais longa, mais úmida e mais segura. O espadachim mascarado grita algo que o vento leva, e você segue, ouvindo seu coração desacelerar. Ninguém o aplaude, e ninguém precisa. A ponte fica para trás, e a escolha também.', fx: { karma: 0, stats: { dao: 1 }, setFlags: ['hes_recusou_duelo'] } } },
    ],
    murim_torneio: [
      { p: 'T', text: 'Inscrever-se apenas na categoria de formas, onde ninguém o ataca de frente', cond: F, res: { text: 'Na categoria de formas, a técnica brilha sem o peso do confronto. Você vence, com uma elegância contida que o júri aprecia. Gwon Tae-seok, que prefere lutadores, torce o nariz, e você descobre que há honra em escolher o campo em que se é inteiro.', fx: { fama: 2, stats: { comp: 1 }, setFlags: ['hes_categoria_formas'] } } },
    ],
    murim_conselho: [
      { p: 'T C', text: 'Entregar os documentos a Jang Hwa-ryeon antes da audiência e deixar que ela fale por você', cond: F, res: { text: 'Jang Hwa-ryeon, que fala melhor do que você, apresenta as provas com precisão cirúrgica. Gwon Tae-seok perde a audiência sem ter que olhar para você. Depois, Jang diz apenas: «Quando precisar de voz, a minha está livre». Uma aliança nasce, discreta.', fx: { fama: 3, karma: 1, setFlags: ['hes_voz_emprestada'] } } },
    ],
    murim_inverno: [
      { p: 'C T', text: 'Cuidar das crianças no templo enquanto os outros enfrentam a neve do lado de fora', cond: F, res: { text: 'As crianças dormem em volta de você, com mãos pequenas agarradas à sua manga. Os homens voltam de madrugada, congelados, e ninguém menciona onde você esteve. O templo, aquela noite, foi o único lugar onde o frio não entrou.', fx: { karma: 3, fama: 1, setFlags: ['hes_cuidou_das_criancas'] } } },
    ],
  },
};
