import type { ConjuntoTraco } from './tipos';

/**
 * Defeito: Impulsividade (impulsivo). Conceito: age antes de descobrir todos os riscos; o corpo vai antes da conta.
 * Força opções: só quem tem o defeito vê as saídas de quem não consegue esperar. Cicatriz: o gesto rápido que não tem volta.
 * Redenção: imp_a_corda_cortada, a escolha difícil de esperar três respirações no instante em que tudo pede pressa (fx.superar).
 * Cenas: imp_o_salto_do_muro (infância) -> imp_a_palavra_dita (juventude) -> imp_a_corda_cortada (maturidade) -> imp_tres_respiracoes (velhice).
 */
const F = { flaw: ['impulsivo'] };

export const IMPULSIVO: ConjuntoTraco = {
  eventos: [
    {
      id: 'imp_o_salto_do_muro', title: 'O muro do vizinho', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 7, ageMax: 14 },
      text: 'Do outro lado do muro, a bola de couro do seu primo caiu no quintal do velho vizinho, que tem fama de bravo e de cão solto. Os meninos discutem como recuperá-la: uma vara comprida, um pedido educado, uma escada. Antes que a conversa termine, você já está no alto do muro, com um pé no ar, olhando para baixo.',
      choices: [
        { p: 'V', text: 'Saltar e correr pelo quintal até a bola, sem olhar nada em volta', res: { text: 'O salto é limpo, o pé direito acerta a bola, e o cão aparece pela porta dos fundos. Você corre de volta, escala o muro com o cão nos calcanhares e rasga a calça. A bola fica do outro lado, e o velho vizinho, rindo, a devolve na manhã seguinte, com uma bronca curta e um pão doce.', fx: { fama: 1, stats: { fis: 1 }, setFlags: ['imp_saltou_o_muro'] } } },
        { p: 'T', text: 'Parar no alto do muro, respirar fundo e olhar o quintal antes de descer', res: { text: 'Do alto, você vê o cão dormindo à sombra e a bola a três passos. Desce devagar, apanha a bola, volta. O cão nem se mexe. Os meninos aplaudem, estranhando: você, o que sempre pulava primeiro, desta vez olhou. Aquele minuto parado ficou pesando mais que qualquer salto.', fx: { karma: 1, stats: { dao: 1, esp: 1 }, setFlags: ['imp_olhou_antes'] } } },
        { p: 'C', text: 'Descer do muro, bater à porta do velho e pedir a bola com educação', res: { text: 'O velho abre a porta, desconfiado, e escuta o pedido de um menino ofegante. Entrega a bola, segura-lhe o ombro e diz que bater à porta custa menos que saltar o muro, e que muita gente demora a vida inteira para aprender isso. Você leva a frase como uma moeda de troca.', fx: { karma: 2, stats: { dao: 1, car: 1 }, setFlags: ['imp_bateu_a_porta'] } } },
      ],
    },
    {
      id: 'imp_a_palavra_dita', title: 'A resposta que não tinha volta', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 16, ageMax: 34 },
      text: 'Num jantar de escola, um discípulo veterano zomba da sua forma, diante de todos, com uma frase certeira e cruel. A resposta chega à sua boca antes mesmo de a risada acabar: uma frase tão pesada que ofende não só ele, mas o mestre dele, que está à mesa. A palavra está na ponta da língua, inteira, brilhante. Basta soltá-la.',
      choices: [
        { p: 'V', text: 'Dizer a frase inteira, sem filtro, deixando a mesa em silêncio', res: { text: 'A mesa gela. O veterano empalidece, o mestre dele se levanta, e o seu mestre fecha os olhos. A frase era verdadeira e imperdoável. Você sai do jantar com uma vitória que parece cinza, e passa meses pedindo desculpas que ninguém exige mais.', fx: { fama: -2, karma: -2, stats: { dao: 1 }, setFlags: ['imp_disse_tudo'] } } },
        { p: 'T D', text: 'Morder a língua, contar até dez em voz baixa e responder com uma frase curta e neutra', check: { stat: ['dao', 'car'], dif: 1 }, ok: { text: 'Na contagem, a raiva afrouxa. A frase que sai é simples: «Aprendo com a crítica». A mesa respira, o veterano se surpreende, e o seu mestre assente discretamente. Você descobre que a palavra mais forte é, às vezes, a que não se diz, e que isso dá um trabalho enorme.', fx: { fama: 2, karma: 2, stats: { dao: 2 }, setFlags: ['imp_contou_ate_dez'] } }, fail: { text: 'No sétimo número, a frase escapa pela metade, enrolada, pior que a original. A mesa ri, constrangida, e o veterano sorri vitorioso. A contenção falhou na hora da prova, e o remorso vem junto com o riso dos outros.', fx: { fama: -1, karma: -1, stats: { dao: 1 }, setFlags: ['imp_disse_tudo'] } } },
        { p: 'C', text: 'Rir junto com a mesa, assumindo a piada, e pedir ao veterano que lhe mostre o erro depois', res: { text: 'A mesa se surpreende, o veterano se desarma, e na manhã seguinte vocês treinam juntos. A crítica, que era ferida, vira lição. Você descobre que o riso de si mesmo é uma arma que ninguém sabe desviar, e que o impulso, quando se rende, às vezes se transforma.', fx: { fama: 1, karma: 2, stats: { car: 1, comp: 1 }, setFlags: ['imp_riu_de_si'] } } },
      ],
    },
    {
      id: 'imp_a_corda_cortada', title: 'A corda do poço', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 26, ageMax: 55 },
      text: 'Uma criança caiu no poço velho da praça, e a corda que a segura está presa a uma polia enferrujada que range, perigosamente. Os vizinhos gritam instruções contraditórias. Sua mão já foi à faca para cortar a corda e saltar, sem pensar. Mas, no fundo do corpo, algo diz que a polia aguenta, se for puxada devagar, com três pessoas, em ritmo. Pedir calma, agora, parece impossível.',
      choices: [
        { p: 'T D', text: 'Respirar três vezes, soltar a faca e organizar três homens para puxar a corda em ritmo', check: { stat: ['dao', 'car'], dif: 2 }, ok: { text: 'As três respirações duram séculos. Quando a corda é puxada, a polia range, mas aguenta. A criança sobe, assustada e inteira. Você, de joelhos, entende a lição que a vida lhe preparou: o gesto mais rápido não é sempre o mais eficaz, e a coragem de esperar três respirações salva mais do que a de se jogar.', fx: { fama: 5, karma: 5, stats: { dao: 3 }, superar: true, setFlags: ['imp_esperou', 'imp_tres_respiracoes_ok'] } }, fail: { text: 'Na segunda respiração, a polia estala. Você corta a corda por instinto e salta, e acaba salvando a criança por sorte, ao custo de duas costelas quebradas. O impulso venceu mais uma vez, e por pouco não matou. A sorte, desta vez, foi sua; da próxima, talvez não.', fx: { fama: 2, ferida: 2, stats: { dao: 1 }, setFlags: ['imp_cortou_a_corda'] } } },
        { p: 'V', text: 'Cortar a corda e saltar atrás da criança, confiando que o corpo saberá o que fazer', res: { text: 'O corpo sabe: você a agarra no fundo do poço, e os dois sobem presos por uma corda de reserva que alguém jogou. A criança chora, você ri de alívio. A vila fala do salto por semanas. Mas, à noite, você pensa na polia estalando e em tudo que poderia ter dado errado.', fx: { fama: 4, karma: 2, ferida: 1, stats: { fis: 1 }, setFlags: ['imp_cortou_a_corda'] } } },
        { p: 'A', text: 'Gritar para todos calarem e dar uma ordem só: «Todos puxam, ninguém solta»', res: { text: 'A voz, forte e clara, ordena a praça. Dez pessoas puxam a corda em ritmo e a criança sobe. Você fica de lado, atônito: o impulso, desta vez, foi a ordem, e funcionou. Não é a calma que lhe faltava, era um lugar onde pôr a pressa.', fx: { fama: 3, karma: 3, stats: { car: 1, dao: 1 }, setFlags: ['imp_ordem_na_praca'] } } },
      ],
    },
    {
      id: 'imp_tres_respiracoes', title: 'A cerca do velho vizinho', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...F, ageMin: 52 },
      text: 'Seu neto, de dez anos, está no alto do mesmo muro que você saltou na infância, com um pé no ar, olhando para o quintal do vizinho, onde uma bola caiu. Ele não sabe que você o observa da janela. Você reconhece a postura, o ombro, a respiração prestes a se perder. Tem tempo de gritar, de descer, de agir como sempre agiu. Ou de esperar.',
      choices: [
        { p: 'D O', text: 'Sair devagar, ficar ao pé do muro e ensinar ao menino a respiração que lhe custou a vida inteira aprender', cond: { ...F, flagsAny: ['imp_esperou', 'imp_olhou_antes', 'imp_contou_ate_dez', 'imp_bateu_a_porta', 'imp_ordem_na_praca', 'imp_riu_de_si'] }, res: { text: 'O menino escuta, de olhos largos, e desce com cuidado. Vocês batem à porta do vizinho, que já é um velho de cabelo branco, e a bola volta sem cão. Quando entram em casa, o menino diz que quer aprender a contar até dez. Você sorri, e começa pela segunda respiração.', fx: { fama: 3, karma: 4, stats: { dao: 3 }, setFlags: ['imp_fim_ok', 'imp_ensinou_a_esperar'] } } },
        { p: 'C', text: 'Gritar o nome do menino da janela e mandá-lo descer, sem explicação', res: { text: 'O menino se assusta, desce, e fica de cara fechada. A bola é resgatada, mais tarde, por um adulto. A lição que você queria dar chegou como ordem, e ordem não ensina. Você percebe, olhando o menino emburrado, que o impulso de proteger também pode ser um jeito de calar.', fx: { karma: 1, stats: { dao: 1 }, setFlags: ['imp_fim_ok'] } } },
        { p: 'T', text: 'Observar da janela em silêncio, deixando que o menino aprenda sozinho o que o muro tem a dizer', res: { text: 'O menino hesita no alto, olha o quintal e desce pelo mesmo lado por onde subiu. Ele não saltou. Não saberá, nunca, que o avô observava. Você fica à janela, com um peso estranho de alívio, tendo visto, em outro corpo, a pausa que levou a vida inteira para aprender.', fx: { karma: 2, stats: { dao: 2 }, setFlags: ['imp_fim_ok'] } } },
      ],
    },
  ],
  opcoes: {
    murim_torneio: [
      { p: 'V', text: 'Atacar na primeira abertura, sem esperar o sinal do juiz', cond: F, res: { text: 'O golpe acerta, mas o juiz desqualifica a rodada. A plateia vaia e aplaude ao mesmo tempo. Gwon Tae-seok anota seu nome com um sorriso: um lutador que age antes do sinal também erra antes da prova.', fx: { fama: 1, karma: -1, setFlags: ['imp_antes_do_sinal'] } } },
    ],
    murim_ataque: [
      { p: 'V', text: 'Atirar-se sobre o líder dos bandidos antes que ele termine a primeira frase', cond: F, res: { text: 'A surpresa funciona: o líder cai, os outros hesitam, e o cocheiro escapa com a carroça. Mas um dos bandidos corta seu antebraço antes de fugir. A pressa ganhou a luta e custou uma cicatriz que você carrega com orgulho e dúvida.', fx: { fama: 2, ferida: 1, stats: { fis: 1 }, setFlags: ['imp_saltou_no_lider'] } } },
    ],
    murim_duelo_ponte: [
      { p: 'V', text: 'Aceitar o duelo antes de o espadachim terminar de falar e sacar a lâmina primeiro', cond: F, res: { text: 'O duelo é breve, bruto e sem regras. Quando termina, você está de pé, o outro de joelhos, e a plateia em silêncio. Ao tirar a máscara, ele revela um rosto jovem, assustado, que só queria ser ouvido. Você havia vencido uma conversa com uma espada.', fx: { fama: 1, karma: -3, setFlags: ['imp_duelo_sem_ouvir'] } } },
    ],
    murim_conselho: [
      { p: 'V M', text: 'Levantar-se no meio da audiência e acusar Gwon Tae-seok antes do momento combinado', cond: F, res: { text: 'A sala se agita, o presidente bate o martelo, e Gwon aproveita para negar tudo com ar de vítima. Parte das provas se perde na confusão. Você sai com a satisfação de ter dito o que sentia e o gosto de ter dado ao clã a chance de se defender melhor.', fx: { fama: 1, karma: -1, setFlags: ['imp_acusou_cedo'] } } },
    ],
    murim_festival: [
      { p: 'V', text: 'Confrontar o oficial no meio da praça e exigir que devolva a taxa a todos', cond: F, res: { text: 'O oficial, pego de surpresa, recua. A praça aplaude, e por cinco minutos você é herói. Depois chegam os guardas, e a taxa continua. O gesto marcou, mas não mudou nada, e você sai da praça sentindo-se meio vitorioso e meio ridículo.', fx: { fama: 1, karma: 0, setFlags: ['imp_confrontou_oficial'] } } },
    ],
    murim_assassino: [
      { p: 'V', text: 'Pegar a lâmina da mesa e correr até o cobrador para avisá-lo, sem pensar em quem observa', cond: F, res: { text: 'Você chega ao cobrador ofegante, com a lâmina na mão, e o homem quase o mata de susto. Entre gritos e explicações, a verdade vem. Choi Rin, atrás, assiste de longe, e depois some. O aviso foi dado, mas o modo foi tão ruidoso que a Lua Oca sabe, agora, quem você é.', fx: { fama: 1, karma: 2, setFlags: ['imp_avisou_o_cobrador'] } } },
    ],
  },
};
