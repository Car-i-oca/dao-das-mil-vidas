import type { ConjuntoTraco } from './tipos';

/**
 * Defeito: Técnica irregular (qi_instavel). Conceito: o domínio dos fundamentos oscila; o mesmo golpe sai perfeito num dia e torto no outro.
 * Força opções: só quem tem o defeito vê as saídas de quem precisa de método para o dia ruim. Cicatriz: a vergonha do erro em público.
 * Redenção: irr_caderno_dos_dias, a escolha difícil de registrar e estudar cada falha por um ano inteiro (fx.superar).
 * Cenas: irr_golpe_torto (infância) -> irr_exibicao_publica (juventude) -> irr_caderno_dos_dias (maturidade) -> irr_forma_imperfeita (velhice).
 */
const F = { flaw: ['qi_instavel'] };

export const QI_INSTAVEL: ConjuntoTraco = {
  eventos: [
    {
      id: 'irr_golpe_torto', title: 'O golpe que ontem saía', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 8, ageMax: 15 },
      text: 'Ontem, no quintal, você acertou o mesmo golpe vinte vezes seguidas, limpo e firme. Hoje, diante do mestre e de três colegas, ele sai torto na primeira, torto na segunda, e na terceira você quase acerta o próprio pé. O mestre cruza os braços e espera. Os colegas fingem não olhar. Você sabe que o golpe existe; só não sabe onde ele se escondeu.',
      choices: [
        { p: 'D', text: 'Repetir o golpe devagar, em voz alta, nomeando cada parte até ele aparecer', res: { text: 'Na décima repetição, o golpe volta, esquisito mas inteiro. O mestre assente, sem sorrir, e diz que técnica que desaparece é técnica que ainda não é sua. Você passa a ver o golpe não como um bem, mas como uma visita: precisa ser recebida de novo, a cada dia.', fx: { xp: 5, stats: { comp: 1, dao: 1 }, setFlags: ['irr_golpe_nomeado'] } } },
        { p: 'T', text: 'Pedir licença para voltar amanhã, quando o corpo estiver melhor', res: { text: 'O mestre concede, com um olhar que não esconde a pergunta: quantos amanhãs? No dia seguinte, o golpe sai limpo, e você não sabe se foi mérito do descanso ou capricho do acaso. A dúvida, de agora em diante, o acompanha como uma sombra pequena.', fx: { stats: { dao: 1 }, setFlags: ['irr_adiou'] } } },
        { p: 'M', text: 'Forçar o golpe mais rápido e mais forte, para provar a todos que ele existe', res: { text: 'O golpe sai forte, mas o ombro estala e você derruba o bastão. Os colegas se calam, e o mestre manda você parar. Fica uma semana sem treinar, com o ombro enfaixado e o orgulho em pedaços, e entende que força não substitui precisão.', fx: { ferida: 1, vida: -1, stats: { fis: 1 }, setFlags: ['irr_forcou'] } } },
      ],
    },
    {
      id: 'irr_exibicao_publica', title: 'A exibição em Hwayang', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 16, ageMax: 34 },
      text: 'A escola lhe dá a honra de abrir a exibição da festa em Hwayang, diante de mercadores, magistrados e pais de alunos. Você ensaiou a forma cem vezes, e em quase todas ela saiu boa. Na praça cheia, ao primeiro passo, algo falha: o pé esquerdo cai fora da marca. A plateia ainda não percebeu, mas você sabe que a forma inteira, daqui em diante, tem uma rachadura.',
      choices: [
        { p: 'D', text: 'Continuar a forma até o fim, sem se corrigir, deixando o erro virar parte dela', check: { stat: ['comp', 'dao'], dif: 0 }, ok: { text: 'Você termina a forma com o pé fora da marca e uma elegância teimosa que ninguém previa. A plateia aplaude, achando que o desvio era proposital. O mestre, nos bastidores, murmura que talvez tenha sido a melhor exibição que ele viu em anos, e que você nunca deve revelar por quê.', fx: { fama: 3, stats: { comp: 1, dao: 1 }, setFlags: ['irr_erro_virou_forma'] } }, fail: { text: 'Ao tentar manter o desvio, o equilíbrio se perde, e você termina a forma de joelhos, com o rosto em fogo. A plateia murmura, polida e cruel. Fica na lembrança desse dia um som que você ouve em sonhos: o do silêncio de quem espera que você levante.', fx: { fama: -2, stats: { dao: 1 }, setFlags: ['irr_caiu_em_publico'] } } },
        { p: 'T', text: 'Interromper a forma, curvar-se e recomeçar do início, pedindo desculpas à plateia', res: { text: 'A plateia, surpresa, concede um silêncio gentil. Você recomeça e a forma sai limpa, curta e sem brilho. O mestre diz depois que a coragem de recomeçar vale mais do que a perfeição de nunca errar, mas você sente o pé esquerdo queimando o dia inteiro.', fx: { fama: 1, karma: 1, stats: { dao: 2 }, setFlags: ['irr_recomecou'] } } },
        { p: 'A', text: 'Pedir a um colega que assuma a forma e continuar como seu assistente no centro da praça', res: { text: 'O colega, surpreso, aceita. A exibição segue sem tropeços, e você, ao lado, narra cada passo com humor. A plateia ri e aplaude, e a escola ganha um espetáculo mais leve do que o ensaiado. Você salva o dia, mas fica com a pergunta do que seria capaz de fazer sozinho.', fx: { fama: 2, karma: 1, stats: { car: 1 }, setFlags: ['irr_dividiu_praca'] } } },
      ],
    },
    {
      id: 'irr_caderno_dos_dias', title: 'O caderno dos dias ruins', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...F, ageMin: 26, ageMax: 55 },
      text: 'Uma velha mestra, ao vê-lo treinar, diz que o seu problema não é a técnica, mas a falta de memória do erro. Propõe um método: anotar, a cada treino, onde o corpo falhou, em que dia, com que humor, o que se comeu. Durante um ano inteiro. Sem pular. O caderno, diz ela, vai mostrar o padrão que você não vê. É chato, longo e exige uma honestidade que você sempre evitou.',
      choices: [
        { p: 'D', text: 'Aceitar e anotar cada treino durante um ano, sem pular dia nenhum', check: { stat: ['dao', 'comp'], dif: 0 }, ok: { text: 'No décimo mês, o padrão aparece: as falhas vêm nos dias de pouco sono e de mau humor, e não de falta de técnica. Você ajusta a rotina, e a forma se firma. A velha mestra lê o caderno e fecha-o devagar, sem uma palavra, que é o maior elogio que sabe fazer.', fx: { karma: 2, stats: { comp: 2, dao: 1 }, superar: true, setFlags: ['irr_caderno_ok', 'irr_padrao_visto'] } }, fail: { text: 'No quarto mês, você pula uma semana, depois um mês, e abandona o caderno com a desculpa de que o método não funciona. A velha mestra não insiste. Anos depois, o caderno, quase vazio, ainda está numa gaveta, lembrando uma disciplina que quase foi.', fx: { stats: { dao: 1 }, setFlags: ['irr_caderno_abandonado'] } } },
        { p: 'T', text: 'Recusar o método, agradecendo, e continuar com a técnica irregular que já conhece', res: { text: 'A velha mestra não insiste. Você segue com o corpo que tem, ajustando-se dia a dia, sem registro, sem padrão. A forma continua oscilando, e você continua aprendendo a rir do que não controla, que também é uma habilidade, embora menos nobre.', fx: { stats: { dao: 1 }, setFlags: ['irr_recusou_caderno'] } } },
        { p: 'A', text: 'Pedir a um discípulo que anote por você e lhe diga o padrão no fim do ano', res: { text: 'O discípulo anota com zelo e entrega, ao fim do ano, um resumo preciso. O padrão aparece, mas sem o peso de ter sido descoberto por você, e o ajuste que sugere tem metade do efeito. Alguns aprendizados exigem a mão de quem os vive, e você sabe disso.', fx: { karma: 1, stats: { comp: 1 }, setFlags: ['irr_padrao_visto'] } } },
      ],
    },
    {
      id: 'irr_forma_imperfeita', title: 'A forma que cada um faz a seu jeito', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...F, ageMin: 52 },
      text: 'Na escola, três jovens discípulos treinam a forma que você ensinou. Cada um a faz diferente: um com o pé fora da marca, outro com o ombro caído, a terceira com um sorriso. Nenhum erra. Cada um erra do seu jeito, e acerta do seu jeito. Os outros mestres franzem a testa. Você, que passou a vida inteira envergonhado do seu erro, percebe que talvez nunca tenha sido um defeito de forma, mas de ouvido.',
      choices: [
        { p: 'C O', text: 'Dizer aos jovens que a forma é de cada um e que o mestre só indica o caminho', cond: { ...F, flagsAny: ['irr_caderno_ok', 'irr_erro_virou_forma', 'irr_golpe_nomeado', 'irr_padrao_visto', 'irr_recomecou'] }, res: { text: 'Os jovens olham para você, surpresos, e depois uns para os outros. Aos poucos, relaxam, e cada forma ganha vida própria. Na primavera, a escola é conhecida por três estilos que parecem um só. Os outros mestres vêm ver, e alguns, de cara fechada, tomam nota.', fx: { fama: 4, karma: 4, stats: { dao: 2, comp: 1 }, setFlags: ['irr_fim_ok', 'irr_forma_de_cada_um'] } } },
        { p: 'D', text: 'Exigir que os três sigam a forma original, sem desvios, como foi ensinada', res: { text: 'Os jovens obedecem, calados. As formas ficam mais iguais e menos vivas, e o sorriso da terceira some. Você observa, satisfeito e inquieto: a perfeição que sempre quis dar aos outros tem o gosto exato do que lhe faltou, e agora o falta a eles.', fx: { fama: 1, karma: -1, stats: { dao: 1 }, setFlags: ['irr_fim_ok'] } } },
        { p: 'T', text: 'Observar em silêncio, sem corrigir nem aprovar, e deixar que o tempo mostre', res: { text: 'Os meses passam. Cada jovem vira mestre à sua maneira. Quando perguntam, anos depois, qual a forma original, você responde que nunca houve uma, só um corpo tentando e uma vida inteira para entender. A resposta é aceita, com um silêncio respeitoso.', fx: { karma: 2, stats: { dao: 2 }, setFlags: ['irr_fim_ok'] } } },
      ],
    },
  ],
  opcoes: {
    murim_escola: [
      { p: 'D T', text: 'Pedir ao mestre para ser avaliado em dias diferentes, e não por uma única prova', cond: F, res: { text: 'O mestre aceita, desconfiado, e marca três dias, um por semana. Em dois, você vai bem; em um, mal. A média é boa, e o mestre admite que a prova única teria sido injusta. É a primeira vez que alguém reconhece a sua irregularidade como fato, e não como vergonha.', fx: { xp: 5, stats: { comp: 1 }, setFlags: ['irr_prova_em_tres_dias'] } } },
    ],
    murim_torneio: [
      { p: 'A', text: 'Pedir para ser sorteado nas últimas chaves, para ter tempo de achar o ritmo do dia', cond: F, res: { text: 'Você assiste às primeiras lutas, ajusta o corpo e entra no meio da tarde, em forma. Vence duas, perde a terceira por um golpe torto, e sai com a lição de que escolher o horário da luta vale quase tanto quanto a técnica.', fx: { fama: 2, stats: { esp: 1 }, setFlags: ['irr_torneio_horario'] } } },
    ],
    murim_mestra: [
      { p: 'D', text: 'Pedir à mestra que o corrija toda vez que errar, sem poupá-lo', cond: F, res: { text: 'A mestra aceita com um brilho no olhar e o corrige trinta vezes na primeira tarde. Você sai exausto, humilhado e mais firme. Quando volta no dia seguinte, os erros caíram pela metade, e ela admite que aprendeu a ensinar quem tropeça melhor do que quem acerta.', fx: { xp: 8, stats: { comp: 1 }, setFlags: ['irr_mestra_corrige'] } } },
    ],
    murim_duelo_ponte: [
      { p: 'T', text: 'Pedir um intervalo antes do duelo para aquecer devagar, até o corpo estar no tom', cond: F, res: { text: 'O espadachim estranha, mas concede. Durante meia hora, você repete os movimentos básicos até o corpo despertar. No duelo, a técnica sai estável, e o adversário comenta, admirado, que raras vezes viu alguém conhecer tão bem o próprio ritmo.', fx: { fama: 2, stats: { dao: 1 }, setFlags: ['irr_aquecimento'] } } },
    ],
    murim_peregrinos: [
      { p: 'D', text: 'Pedir à lanceira que repita o golpe em ritmos diferentes, para sentir quando o seu falha', cond: F, res: { text: 'A lanceira ri e repete: rápido, lento, no meio. Você sente, em cada ritmo, onde o seu corpo desobedece. Anota na cabeça, e no fim da noite sabe que o golpe falha quando a respiração antecipa o pé. Uma descoberta pequena, que muda muita coisa.', fx: { xp: 6, stats: { comp: 1 }, setFlags: ['irr_ritmos'] } } },
    ],
    murim_estilos_errantes: [
      { p: 'A', text: 'Procurar o mestre que aceita alunos de técnica irregular e treinar com ele três meses', cond: F, res: { text: 'O ex-árbitro, que aceita você sem pergunta, mostra que os melhores juízes são os que também erraram muito. Você aprende a ver o erro como informação, e a técnica irregular vira, em seus olhos, um mapa de onde o corpo ainda precisa ouvir.', fx: { xp: 8, stats: { comp: 1, esp: 1 }, setFlags: ['irr_mestre_do_erro'] } } },
    ],
  },
};
