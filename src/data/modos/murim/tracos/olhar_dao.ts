import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Leitura de postura (olhar_dao). Conceito: o peso e a intenção de um corpo aparecem no modo como ele pisa, antes do golpe.
 * Diferente do Olho experiente (mentiras e gestos de conversa), este lê o corpo em movimento. A cicatriz: ver a fraqueza de todos,
 * mestres incluídos, e decidir o que fazer com ela.
 * Cenas: pos_pisada (infância) -> pos_mestre_cansado (juventude) -> pos_duelo_sem_golpe (maturidade) -> pos_postura_propria (velhice).
 */
const T = { talent: ['olhar_dao'] };

export const OLHAR_DAO: ConjuntoTraco = {
  eventos: [
    {
      id: 'pos_pisada', title: 'O jeito de pisar', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'Na praça da vila, dois meninos mais velhos brincam de luta. Um deles pisa com o calcanhar para fora, e você sabe, sem saber como, que ele vai cair para a direita antes de o outro se mover. Cai. O que cai olha para você, desconfiado, como se tivesse sido empurrado por algo que você fez.',
      choices: [
        { p: 'C', text: 'Explicar a ele, depois, como o calcanhar o trai, sem zombar', res: { text: 'O menino ouve de cara fechada, depois testa o passo na terra e ri quando acerta. Passa a procurar você para corrigir a postura antes de cada brincadeira. A primeira lição que você ensina nasce da pena de ver alguém cair sem entender por quê.', fx: { karma: 2, stats: { car: 1, comp: 1 }, setFlags: ['pos_menino_corrigido'] } } },
        { p: 'A', text: 'Guardar a observação para si e usá-la quando a luta for com ele', res: { text: 'Na semana seguinte, o mesmo menino o desafia. Você espera o calcanhar, desvia, empurra de leve, e ele cai de novo. A turma ri, e o riso fica no ar mais do que deveria. Você ganha o dia e perde algo que não sabe nomear.', fx: { fama: 1, karma: -1, stats: { comp: 1 }, setFlags: ['pos_menino_humilhado'] } } },
        { p: 'T', text: 'Continuar observando, calado, para entender como outros pisam', res: { text: 'Você passa a tarde olhando o pátio e começa a ver padrões: quem arrasta o pé esquerdo, quem treme antes do golpe, quem cede o peso para trás. Anota mentalmente cada um, como quem ganha um idioma. Nenhum dos meninos percebe que virou texto.', fx: { stats: { esp: 2 }, setFlags: ['pos_olhar_atento'] } } },
      ],
    },
    {
      id: 'pos_mestre_cansado', title: 'O mestre que pisava mal', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'Seu mestre, que todos veneram, abre o treino com a forma de sempre. Você, que já aprendeu a ver, nota que o joelho direito dele cede em um terço do movimento, e que ele compensa com o ombro. Ninguém mais percebe. Ele treina assim há anos, e você agora entende que ele provavelmente sente dor.',
      choices: [
        { p: 'C D', text: 'Procurá-lo em particular e oferecer uma pomada de erva que você conhece', res: { text: 'O mestre fica em silêncio por um momento, e então ri baixo: sabia que alguém um dia veria. Aceita a pomada e, em troca, lhe ensina um ajuste de postura que alivia o joelho. É a lição mais íntima que você já recebeu, e a menos formal.', fx: { karma: 2, stats: { comp: 1, dao: 1 }, setFlags: ['pos_mestre_cuidado'] } } },
        { p: 'M', text: 'Treinar até aprender a aproveitar a fraqueza dele num duelo de treino', res: { text: 'Num duelo de treino, você sente o joelho ceder e explora o vazio. O mestre cai de lado, surpreso, e se levanta devagar. O pátio inteiro vê. Ele não diz nada, mas nunca mais o escolhe para duelos, e a escola passa a olhar você com a cautela devida a quem não deixa nada passar.', fx: { fama: 2, karma: -2, stats: { comp: 1 }, setFlags: ['pos_mestre_exposto'] } } },
        { p: 'T', text: 'Fingir que não viu e continuar a treinar como se nada tivesse mudado', res: { text: 'Você mantém o silêncio durante meses, vendo o joelho piorar. Quando o mestre finalmente cai num treino, os alunos o carregam, e você sente em silêncio que talvez devesse ter dito algo. Ou talvez não: o orgulho dele também era um tipo de força.', fx: { stats: { dao: 1 }, setFlags: ['pos_mestre_calado'] } } },
      ],
    },
    {
      id: 'pos_duelo_sem_golpe', title: 'O duelo que terminou antes de começar', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 26, ageMax: 55 },
      text: 'Um espadachim famoso, de passagem pela vila, desafia você para um duelo oficial. Você o observa caminhar até o círculo e, antes de ele sacar, vê tudo: o peso no calcanhar traseiro, o ombro rígido, uma fadiga de semanas que ele disfarça. Você sabe como o duelo vai terminar, e sabe que ele sabe que perdeu antes de começar. A vila inteira espera o espetáculo.',
      choices: [
        { p: 'C', text: 'Recusar o duelo diante de todos e oferecer ao desafiante um lugar para descansar', res: { text: 'A vila murmura, decepcionada. O espadachim, atônito, aceita o abrigo, dorme dois dias seguidos e parte sem se despedir, deixando uma espada curta como pagamento. Meses depois, você ouve dizer que ele abandonou os duelos. Foi um desfecho que você leu e escolheu.', fx: { fama: -1, karma: 4, stats: { dao: 2 }, setFlags: ['pos_desafiante_poupado'] } } },
        { p: 'D', text: 'Aceitar o duelo e vencer no primeiro movimento, com precisão e sem humilhar', res: { text: 'Um só golpe, curto, e o espadachim está desarmado, de olhos abertos, sem nenhuma ferida. A vila aplaude tarde, atônita. Ele curva a cabeça, reconhecendo, e sussurra que nunca viu alguém ler tão cedo. O duelo vira lenda, e a lenda é maior que o fato.', fx: { fama: 4, karma: 1, stats: { comp: 1, esp: 1 }, setFlags: ['pos_duelo_limpo'] } } },
        { p: 'A', text: 'Recusar o duelo sob um pretexto, para não mostrar à vila o quanto você consegue ler', check: { stat: ['car', 'esp'], dif: 0 }, ok: { text: 'O pretexto é aceito, o espadachim parte, e ninguém saberá que você poderia tê-lo vencido sem esforço. Você guarda o segredo da sua leitura e mantém a vantagem para quando importar. A vantagem, porém, tem um custo: ninguém sabe quem você realmente é.', fx: { karma: 1, stats: { dao: 1, esp: 1 }, setFlags: ['pos_olhar_escondido'] } }, fail: { text: 'O pretexto soa falso, e o espadachim, ofendido, sai espalhando que você teve medo. A fama cai alguns degraus por semanas. Aprender a ler os outros não ensinou você a ser lido.', fx: { fama: -3, stats: { dao: 1 }, setFlags: ['pos_olhar_escondido'] } } },
      ],
    },
    {
      id: 'pos_postura_propria', title: 'A postura que você nunca viu', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 52 },
      text: 'Você passa por uma poça d\'água num dia de sol e vê, pela primeira vez em décadas, o próprio reflexo andando. O ombro direito cai um dedo. O peso se apoia mais na perna esquerda. Há uma pequena hesitação antes de cada passo. Você, que leu a postura de mil pessoas, nunca leu a própria. E o que vê é um velho que se parece com todos os que um dia observou.',
      choices: [
        { p: 'D', text: 'Corrigir a postura, passo a passo, todos os dias, diante de um espelho de água', res: { text: 'Leva meses para o ombro subir, e o joelho melhora sem remédio. Você descobre que ler os outros é um ofício, mas ler a si mesmo exige coragem de que o olho não precisa. A postura nova é a mesma de um jovem, com uma lentidão de quem sabe.', fx: { karma: 1, stats: { dao: 2, fis: 1 }, setFlags: ['pos_postura_lida'] } } },
        { p: 'C O', text: 'Ensinar a um jovem a ler também a própria postura, antes de ler a dos outros', cond: { ...T, flagsAny: ['pos_menino_corrigido', 'pos_mestre_cuidado', 'pos_desafiante_poupado', 'pos_duelo_limpo', 'pos_olhar_atento'] }, res: { text: 'O jovem resiste, depois entende. Na primavera, já corrige o ombro dele antes de apontar o dos outros. Você vê nele o que faltou à sua leitura em tantos anos: a mão estendida junto com o olho. O que ele aprender, passará adiante com a mesma gentileza.', fx: { fama: 3, karma: 3, stats: { dao: 2 }, setFlags: ['pos_postura_lida', 'pos_olhar_herdado'] } } },
        { p: 'T', text: 'Aceitar o reflexo como ele é e seguir andando, mais devagar, sem se corrigir', res: { text: 'Você caminha pelo resto do dia com o peso diferente, sentindo o corpo que tem. Não é uma derrota: é um tipo de paz que nenhuma leitura havia dado. Quando a noite chega, você já não tem certeza se vê o mundo ou se o mundo finalmente o vê.', fx: { stats: { dao: 1 }, setFlags: ['pos_postura_lida'] } } },
      ],
    },
  ],
  opcoes: {
    murim_torneio: [
      { p: 'A D', text: 'Ver o suor dos favoritos e prever quem cansa antes de cada rodada', cond: T, res: { text: 'Você anota três rivais de passos curtos e dois de peso para trás, e escolhe cada luta pelo que o corpo deles diz. Chega à final sem um golpe sofrido. Gwon Tae-seok olha de longe, sem entender, e a Quatro Pontes passa a falar de um discípulo que parece ler o futuro.', fx: { fama: 4, stats: { esp: 1 }, setFlags: ['pos_torneio_lido'] } } },
    ],
    murim_duelo_ponte: [
      { p: 'A', text: 'Ler a postura do espadachim mascarado e dizer de onde ele veio e a que escola pertence', cond: T, res: { text: 'Você diz que ele treinou ao norte, num pátio de pedra, e que o ombro esquerdo guarda uma lesão antiga. O mascarado hesita e baixa a lâmina. A conversa seguinte é franca e curta, e o duelo se dissolve numa troca de nomes e de desculpas.', fx: { fama: 3, karma: 1, setFlags: ['pos_mascarado_lido'] } } },
    ],
    murim_ataque: [
      { p: 'A V', text: 'Escolher o bandido de pé mais frágil e derrubá-lo para que os outros entendam', cond: T, res: { text: 'O primeiro cai com um toque, e os outros três recuam sem entender como o chefe foi vencido tão cedo. A carroça passa. O cocheiro, ferido, agradece com a boca seca, e você guarda o jeito de pisar do homem que derrubou como quem guarda um nome.', fx: { fama: 2, karma: 1, setFlags: ['pos_bandido_lido'] } } },
    ],
    murim_mestra: [
      { p: 'D', text: 'Desafiar a mestra apontando, antes de começar, onde ela vai ceder o peso', cond: T, res: { text: 'A mestra sorri pela primeira vez, ajeita o pé e responde que ninguém viu aquilo em vinte anos. O treino seguinte é o mais duro da sua vida, e o mais bonito. Ela passa a chamá-lo de «olho», e a ensinar o que só se ensina a quem já vê.', fx: { xp: 8, stats: { comp: 1, esp: 1 }, setFlags: ['pos_mestra_lida'] } } },
    ],
    murim_estilos_errantes: [
      { p: 'A', text: 'Estudar a postura do ex-árbitro e descobrir por que ele nunca perdeu uma decisão', cond: T, res: { text: 'O ex-árbitro revela, aos poucos, que sua intuição vinha de décadas olhando pés. Você vê isso nele e em si mesmo, e os dois passam as tardes comparando o que cada um lê. É a primeira vez que alguém o ensina a explicar o que enxerga.', fx: { xp: 8, stats: { esp: 2 }, setFlags: ['pos_arbitro'] } } },
    ],
    murim_assassino: [
      { p: 'A T', text: 'Ler o corpo de Choi Rin enquanto ela fala e descobrir se a lâmina é dela', cond: T, res: { text: 'Choi Rin segura a lâmina como quem a herdou, sem hábito, com o polegar no lugar errado. Você lhe diz isso, em voz baixa, e ela perde a cor. Conta que a Lua Oca tem dívidas sobre ela. Você recusa a oferta e lhe dá um nome seguro onde procurar abrigo.', fx: { karma: 3, stats: { esp: 1 }, setFlags: ['pos_choi_rin_lida'] } } },
    ],
  },
};
