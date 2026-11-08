import type { ConjuntoTraco } from './tipos';

/**
 * Defeito: Mau timing (azar). Conceito: as coisas dão errado no pior momento, e quem tem esse jeito aprende a se antecipar ou a rir.
 * Força opções: só quem tem o defeito vê as saídas de quem já espera o pior. Cicatriz: o hábito de esperar o pior e agir cedo demais.
 * Redenção: azr_a_chuva_certa, a escolha difícil de confiar no momento mesmo sem garantia (fx.superar).
 * Cenas: azr_dia_do_festival (infância) -> azr_promessa_fora_de_hora (juventude) -> azr_a_chuva_certa (maturidade) -> azr_ultimo_atraso (velhice).
 */
const F = { flaw: ['azar'] };

export const AZAR: ConjuntoTraco = {
  eventos: [
    {
      id: 'azr_dia_do_festival', title: 'O dia em que choveu só em você', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 8, ageMax: 15 },
      text: 'É o dia do festival da colheita, e você ganhou um traje novo, costurado por sua tia. O céu está limpo de ponta a ponta, menos uma nuvem teimosa, pequena e cinza, que parece ter escolhido o seu caminho. Você olha para ela e ela olha para você. Na praça, os outros meninos já dançam sob o sol. O caminho até lá é curto, e a nuvem, quieta.',
      choices: [
        { p: 'T', text: 'Esperar a nuvem passar, mesmo perdendo o começo da dança', res: { text: 'A nuvem não passa. Cai uma chuva fina, só em cima de você, por exatos dez minutos, e some. Você chega à praça tarde e ensopado, mas a dança ainda está no meio, e uma menina empresta um pano para o seu cabelo. Atrasar-se, descobre, também é uma forma de ser notado.', fx: { karma: 1, stats: { dao: 1 }, setFlags: ['azr_esperou_nuvem'] } } },
        { p: 'M', text: 'Correr até a praça antes que a chuva comece, desafiando a nuvem', res: { text: 'A nuvem acompanha você a cada passo, e a chuva cai exatamente à entrada da praça, estragando o traje novo na frente de todos. A tia, ao ver, ri até chorar. A roda de meninos faz um corredor de aplausos para você entrar molhado. O riso é grande e quase afável.', fx: { fama: 1, stats: { sor: -1 }, setFlags: ['azr_riu_de_si'] } } },
        { p: 'A', text: 'Pedir emprestado o guarda-chuva de papel de uma vendedora e transformar o azar em figurino', check: { stat: ['car', 'sor'], dif: 0 }, ok: { text: 'A vendedora ri, empresta, e você dança de guarda-chuva aberto sob a chuva fina, no centro da roda. Os outros meninos imitam. Por uma tarde, a nuvem dá o ritmo da festa, e você aprende que uma desgraça bem vestida pode ser a estrela.', fx: { fama: 2, karma: 1, stats: { car: 1 }, setFlags: ['azr_riu_de_si', 'azr_virou_figurino'] } }, fail: { text: 'A vendedora vende, mas o guarda-chuva rasga na primeira rajada. Você dança com meia armação e a chuva escorrendo pelo pescoço. Mesmo assim, alguém aplaude, e você aprende que a desgraça é mais suportável quando se tem plateia.', fx: { stats: { sor: -1 }, setFlags: ['azr_riu_de_si'] } } },
      ],
    },
    {
      id: 'azr_promessa_fora_de_hora', title: 'A promessa que chegou depois', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 16, ageMax: 34 },
      text: 'Você combina com um colega de escola levar uma carta importante ao magistrado, antes do meio-dia. No caminho, a carroça de feno tomba e fecha a ponte; o atalho tem um cão bravo; o terceiro caminho, uma procissão. Quando chega à praça, o magistrado já saiu, e a carta que devia salvar o amigo chega com uma hora de atraso. O que ela dizia agora só serve para consolá-lo.',
      choices: [
        { p: 'C', text: 'Procurar o amigo, contar o que aconteceu e se oferecer para consertar o que for possível', res: { text: 'O amigo, abatido, escuta tudo. O prejuízo é real, mas não é o fim: ele perde o cargo de escrivão, mas ganha outro, por sua indicação. Vocês ficam mais próximos do que antes, porque ele viu que seu azar tinha um rosto honesto.', fx: { karma: 3, stats: { dao: 1 }, setFlags: ['azr_amigo_reparado'] } } },
        { p: 'T', text: 'Sair da cidade por uns dias, esperando que a poeira baixe', res: { text: 'Você volta uma semana depois e o amigo já refez a vida sem você, sem rancor visível, mas com uma distância educada. Certas ausências são mais frias que qualquer culpa, e o azar, aqui, pesa menos que a fuga.', fx: { stats: { dao: 1 }, setFlags: ['azr_fugiu'] } } },
        { p: 'A', text: 'Procurar o magistrado em casa e pedir audiência, com o atraso exposto sem rodeios', check: { stat: ['car', 'sor'], dif: 1 }, ok: { text: 'O magistrado, impressionado com a franqueza, escuta a carta e reabre o caso. O amigo é beneficiado. O atraso foi real, mas a coragem de expô-lo foi mais pesada que o azar. Você sai da casa dele devagar, com a sensação de ter vencido um dia em que perdeu.', fx: { fama: 2, karma: 3, stats: { car: 1 }, setFlags: ['azr_amigo_reparado', 'azr_enfrentou_atraso'] } }, fail: { text: 'O magistrado, irritado com o horário, recusa a audiência. Você volta pela mesma rua, com a mesma carta amassada, a mesma culpa e uma chuva que acaba de começar. Dessa vez, é só você e o céu.', fx: { fama: -1, stats: { sor: -1 }, setFlags: ['azr_fugiu'] } } },
      ],
    },
    {
      id: 'azr_a_chuva_certa', title: 'O dia em que a chuva ajudou', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 26, ageMax: 55 },
      text: 'Você fecha o negócio mais importante da vida: levar uma carga de grãos pelo desfiladeiro antes que o clima mude. Todos os sinais do azar estão ali: o cavalo manco, o céu escuro, o mapa com a dobra no lugar errado. Seu corpo pede para desistir. Mas há um velho sábio na estalagem que diz apenas: «Vá agora. A chuva vai ajudar».',
      choices: [
        { p: 'D O', text: 'Ir, apesar de tudo, confiando na frase do velho e deixando de esperar o pior', check: { stat: ['dao', 'sor'], dif: 1 }, ok: { text: 'A chuva cai, forte, no desfiladeiro, e lava a pista que os bandidos esperavam usar para a emboscada. A carga passa, ensopada e inteira. Pela primeira vez, o azar e a sorte parecem a mesma coisa, só que vistas de um lado diferente. Você deixa de contar o pior antes de acontecer.', fx: { fama: 3, pedras: 80, karma: 2, stats: { sor: 2, dao: 1 }, superar: true, setFlags: ['azr_chuva_ajudou', 'azr_confiou'] } }, fail: { text: 'A chuva cai e o desfiladeiro desaba parcialmente. Você escapa por pouco, perde a carga e um cavalo. O velho sábio, ao saber, não pede desculpas: diz apenas que a confiança sem garantia é o único tipo, e que o preço, às vezes, é real. Você aprende e paga ao mesmo tempo.', fx: { pedras: -60, karma: 1, ferida: 1, stats: { dao: 2 }, setFlags: ['azr_confiou'] } } },
        { p: 'T', text: 'Esperar um dia, apostando que o tempo vai melhorar sozinho', res: { text: 'O tempo piora. A carga perde o prazo, o comprador desiste e você volta para casa com os grãos e a velha sensação de ter sido pontual com o fracasso. O velho sábio, ao vê-lo, apenas assente: certas chuvas só se atravessam andando.', fx: { pedras: -40, stats: { sor: -1 }, setFlags: ['azr_esperou_demais'] } } },
        { p: 'A', text: 'Dividir a carga em três e mandar partes por caminhos diferentes, para que o azar atinja só um', res: { text: 'Uma parte atola, outra atrasa, e a terceira chega a tempo. O comprador aceita o que chegou e adia o resto com uma advertência. Você ganha menos do que queria, perde menos do que temia. É a primeira vez que o azar tem teto, e você descobre que isso também é uma espécie de sorte.', fx: { pedras: 30, stats: { comp: 1, sor: 1 }, setFlags: ['azr_dividiu_o_risco'] } } },
      ],
    },
    {
      id: 'azr_ultimo_atraso', title: 'O dia em que chegou na hora', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...F, ageMin: 55 },
      text: 'Uma jovem, filha de um velho amigo, se casa hoje, e você prometeu estar no jantar. Toda a vida você chegou atrasado a festas, funerais e batizados. Hoje, o caminho está limpo, o cavalo, forte, o céu, azul. Ao entrar na casa, a tempo, vê as portas abertas e a noiva de pé. Você ficou parado na soleira, espantado de nada ter dado errado.',
      choices: [
        { p: 'C O', text: 'Entrar, abraçar a noiva e contar ao velho amigo que, pela primeira vez, chegou na hora', res: { text: 'O velho amigo ri até chorar. A festa dura a noite inteira, e o seu lugar à mesa, que todos diziam sempre vazio, é ocupado, finalmente, por você. Quando alguém lhe pergunta o segredo, responde que não houve: só um dia em que as coisas deram certo, e a coragem de aproveitá-lo.', fx: { fama: 3, karma: 3, stats: { sor: 1, dao: 1 }, setFlags: ['azr_ultimo_atraso_ok', 'azr_fim_ok'] } } },
        { p: 'D', text: 'Entrar em silêncio, sentar no canto e saborear o dia sem dizer nada', res: { text: 'Ninguém repara que você está lá, o que, para quem passou a vida chamando atenção pelo atraso, é um tipo de descanso. A noiva o descobre ao fim da festa e o abraça. Você volta para casa a pé, devagar, sentindo a leveza de um dia sem ressalvas.', fx: { karma: 2, stats: { dao: 1 }, setFlags: ['azr_fim_ok'] } } },
        { p: 'T', text: 'Desconfiar do dia perfeito e esperar o que dará errado até a última hora', res: { text: 'Nada dá errado. Você passa o jantar inteiro de ouvidos em pé, esperando o desastre, e só percebe, no fim, que perdeu a festa por esperar o pior. O azar, afinal, não foi o que lhe tomou o dia: foi o hábito de esperá-lo.', fx: { stats: { dao: 1 }, setFlags: ['azr_fim_ok'] } } },
      ],
    },
  ],
  opcoes: {
    murim_dia_comum: [
      { p: 'T', text: 'Levar um guarda-chuva e um cantil extra, porque algo sempre acontece', cond: F, res: { text: 'Chove duas horas depois, o cantil de um viajante estoura, e você é o único a tê-los. Passa a manhã dividindo água e abrigo com estranhos agradecidos. O azar, quando antecipado, às vezes vira serviço.', fx: { karma: 2, stats: { sor: 1 }, setFlags: ['azr_estrada_preparada'] } } },
    ],
    murim_torneio: [
      { p: 'T', text: 'Aceitar o sorteio das chaves sem ilusão e preparar-se para o pior adversário possível', cond: F, res: { text: 'O sorteio coloca você contra o favorito logo na primeira rodada, como previsto. Você perde com dignidade, e o favorito, impressionado, comenta com os juízes que raramente enfrentou alguém tão bem preparado para perder. É um tipo de elogio.', fx: { fama: 1, stats: { esp: 1 }, setFlags: ['azr_torneio_pior_caso'] } } },
    ],
    murim_mercado: [
      { p: 'A', text: 'Conferir três vezes o troco antes de sair, porque sempre falta uma moeda', cond: F, res: { text: 'Na terceira conferência, Noh admite o erro, entregando a moeda. Por um instante, os dois riem do hábito, e Noh diz que passou a contar em voz alta quando você vem. Uma pequena ordem foi imposta ao caos.', fx: { pedras: 1, stats: { comp: 1 }, setFlags: ['azr_troco_contado'] } } },
    ],
    murim_ataque: [
      { p: 'T', text: 'Pagar para passar sem lutar, porque a flecha só acerta mesmo você', cond: F, res: { text: 'O líder, surpreso com a falta de resistência, aceita o pagamento e deixa a carroça passar. O cocheiro agradece, murmurando que mal podia crer. Você sabe, em silêncio, que uma flecha teria vindo, e o dinheiro, desta vez, foi bem gasto.', fx: { pedras: -20, karma: 1, setFlags: ['azr_pagou_passagem'] } } },
    ],
    murim_festival: [
      { p: 'A', text: 'Pagar a taxa sem discutir e ir direto à ponte, sabendo que a lanterna cairia', cond: F, res: { text: 'A lanterna cai de fato, uns passos adiante, mas você já passou. O oficial, surpreso, devolve metade da taxa pela facilidade. A artista procura o irmão ao seu lado, e os dois descobrem que a pessoa que se prepara para o pior atrapalha menos que a que o ignora.', fx: { fama: 1, karma: 1, setFlags: ['azr_festival_preparado'] } } },
    ],
    murim_inverno: [
      { p: 'T C', text: 'Dormir junto à porta do celeiro, porque o telhado sempre cede onde a pessoa deita', cond: F, res: { text: 'À meia-noite, o telhado cede exatamente sobre o canto onde você teria dormido. O barulho acorda o celeiro, e as crianças, assustadas, sobem nos seus joelhos. Você as conforta com a voz calma de quem esperava, e a vila, por um momento, se sente guardada pelo seu pessimismo.', fx: { fama: 2, karma: 2, setFlags: ['azr_telhado_cedeu'] } } },
    ],
  },
};
