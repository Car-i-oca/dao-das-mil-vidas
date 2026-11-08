import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Aprendiz disciplinado (mestre_nato). Conceito: a repetição vira técnica mais depressa nele do que nos outros.
 * A cicatriz: quem aprende só repetindo teme o imprevisto, e a forma perfeita pode virar jaula.
 * Cenas: dis_mil_vezes (infância) -> dis_forma_quebrada (juventude) -> dis_aluno_que_improvisa (maturidade) -> dis_ultima_forma (velhice).
 */
const T = { talent: ['mestre_nato'] };

export const MESTRE_NATO: ConjuntoTraco = {
  eventos: [
    {
      id: 'dis_mil_vezes', title: 'A milésima vez', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'Depois de três meses repetindo o mesmo passo no quintal, você percebe que ele deixou de ser um passo: virou um hábito do corpo, e agora acontece sozinho. Seu irmão mais velho, que treina há dois anos, ainda tropeça. Ele olha você com um misto de orgulho e raiva, e pergunta qual é o segredo.',
      choices: [
        { p: 'C D', text: 'Contar que o segredo é a repetição e treinar junto com ele, todas as manhãs', res: { text: 'Seu irmão resmunga, mas aparece na manhã seguinte, e na outra, e na outra. Em dois meses, tropeça menos. Em quatro, já não precisa de você. A lição que ele leva é a mesma que você ensinou sem querer: a disciplina é contagiosa, e o orgulho de quem a ensina cresce em silêncio.', fx: { karma: 2, stats: { comp: 1, car: 1 }, setFlags: ['dis_irmao_treinado'] } } },
        { p: 'M', text: 'Guardar o método para si e continuar à frente dele', res: { text: 'Você segue na frente, e a vantagem cresce a cada semana. Seu irmão, sem entender o porquê, se afasta de você no pátio e na mesa. Anos depois, os dois fingem não lembrar daquele tempo, mas a fenda continua entre vocês, discreta como uma rachadura num prato.', fx: { stats: { comp: 2 }, setFlags: ['dis_irmao_afastado'] } } },
        { p: 'D', text: 'Fazer o passo duas mil vezes, em vez de mil, só para ver o que vem depois', check: { stat: ['comp', 'dao'], dif: 0 }, ok: { text: 'Depois da milésima, nada. Depois da mil e quinhentas, um tipo de silêncio na perna. Na duas milésima, o passo muda sozinho, e vira um segundo passo que ninguém ensinou. Você descobre que a repetição leva a algum lugar, e que o lugar não está no manual.', fx: { xp: 8, stats: { comp: 2, esp: 1 }, setFlags: ['dis_passo_proprio'] } }, fail: { text: 'Na mil e duzentas, o tornozelo reclama. Na mil e quinhentas, torce. Você passa três semanas de cama, com o orgulho machucado e uma lição: a disciplina sem limite é teimosia que se paga em carne.', fx: { ferida: 1, stats: { dao: 1 }, setFlags: ['dis_passo_torcido'] } } },
      ],
    },
    {
      id: 'dis_forma_quebrada', title: 'A forma que não cabia', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'Num duelo de treino, seu oponente faz algo que nenhuma forma prevê: troca o pé de apoio no meio do golpe e acerta você pelas costelas. Você respondeu exatamente como a forma mandava, e a forma perdeu. O mestre observa de longe, de braços cruzados, e não diz o que pensa.',
      choices: [
        { p: 'D T', text: 'Reconstruir a forma para incluir a troca de pé, treinando a variação mil vezes', res: { text: 'Você leva meses. A nova forma é um pouco mais feia, bem mais honesta, e a primeira que realmente lhe pertence. O mestre a vê num treino de outono e, sem comentar, a corrige em dois pontos. É o maior elogio que ele sabe fazer.', fx: { xp: 6, stats: { comp: 1, esp: 1 }, setFlags: ['dis_forma_ampliada'] } } },
        { p: 'O', text: 'Insistir na forma original e jurar que a falha foi só do momento', res: { text: 'Você a repete até acertar o adversário, e depois a repete mais. A forma torna-se uma fortaleza: perfeita, bonita, impenetrável para quem a conhece e ruim para quem não. O mestre, ao notar, suspira, e acrescenta uma tarefa de equilíbrio que você acha inútil por um ano.', fx: { stats: { dao: 2 }, setFlags: ['dis_forma_intacta'] } } },
        { p: 'A', text: 'Pedir ao adversário que lhe ensine a troca de pé, em troca de lhe ensinar a forma', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'O rival, desconcertado, aceita. Trocam lições por três semanas e descobrem que, juntos, cobrem os buracos um do outro. A amizade que nasce disso é rara no pátio, e útil.', fx: { fama: 2, karma: 2, stats: { comp: 1, car: 1 }, setFlags: ['dis_rival_amigo', 'dis_forma_ampliada'] } }, fail: { text: 'O rival recusa com um sorriso: pede pagamento em prata, e você não tem. Fica a lembrança do golpe e uma curiosidade que nunca será satisfeita. Você aprende que a humildade tem preço, e que às vezes ele é alto demais.', fx: { stats: { dao: 1 }, setFlags: ['dis_forma_intacta'] } } },
      ],
    },
    {
      id: 'dis_aluno_que_improvisa', title: 'O aluno que não repetia', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 28, ageMax: 58 },
      text: 'Um rapaz de quinze anos pede para ser seu aluno. É rápido, mas nunca faz um passo duas vezes do mesmo jeito, e o que seria erro em outro, nele, às vezes acerta. Você, que construiu uma vida em cima do mesmo gesto repetido mil vezes, sente uma coisa incômoda: inveja. Ou medo. Ou os dois.',
      choices: [
        { p: 'C D', text: 'Aceitá-lo e ensinar a repetição só como um instrumento, deixando que ele a use do jeito dele', res: { text: 'Leva três anos. O rapaz aprende a repetir quando quer e a quebrar quando precisa, e você aprende o contrário. No dia em que ele parte, deixa uma carta curta, que você guarda: «O senhor me ensinou a ficar. Eu lhe ensinei a sair. Estamos quites».', fx: { fama: 3, karma: 3, stats: { comp: 1, dao: 1 }, setFlags: ['dis_aluno_livre'] } } },
        { p: 'D', text: 'Exigir que ele repita cada passo mil vezes antes de ganhar uma variação', res: { text: 'O rapaz cumpre por três meses e depois desaparece de madrugada, sem avisar. Meses depois você o vê na feira, treinando com outro mestre, rindo, errando e acertando. Você segue como é, com a forma perfeita e a casa vazia.', fx: { stats: { dao: 1 }, setFlags: ['dis_aluno_perdido'] } } },
        { p: 'T', text: 'Recusar, dizendo que o método dele não se encaixa no seu, e indicar outro mestre', res: { text: 'O rapaz agradece, desanimado, e vai. Dois anos depois, ouve-se falar de um jovem mestre das estradas, que ensina pela experiência. Você sabe quem é, e carrega a dúvida de se ensinaria melhor se tivesse aceitado.', fx: { karma: 1, setFlags: ['dis_aluno_perdido'] } } },
      ],
    },
    {
      id: 'dis_ultima_forma', title: 'A forma que o corpo esqueceu', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 55 },
      text: 'Numa manhã fria, na hora do treino de sempre, o corpo hesita no meio da sequência. A memória do músculo, que foi a sua âncora por toda a vida, falha num trecho. Você sabia a forma como sabe o próprio nome, e agora há um buraco de três passos. Seu aprendiz mais novo olha sem entender.',
      choices: [
        { p: 'D', text: 'Recomeçar a forma do primeiro passo, devagar, todos os dias, até o buraco se fechar', res: { text: 'Leva meses, e o buraco não se fecha por inteiro. Mas no inverno você descobre algo curioso: ao refazer o caminho devagar, entende cada passo pela primeira vez, como se antes tivesse sido feito às cegas. A forma agora é mais lenta e mais sua.', fx: { karma: 1, stats: { dao: 2, comp: 1 }, setFlags: ['dis_mestre_repete'] } } },
        { p: 'C O', text: 'Ensinar ao aprendiz o trecho que falta, passando adiante o que ainda lembra', cond: { ...T, flagsAny: ['dis_irmao_treinado', 'dis_aluno_livre', 'dis_forma_ampliada', 'dis_rival_amigo', 'dis_passo_proprio'] }, res: { text: 'O aprendiz o repete, e você percebe que a forma, nas mãos dele, já não é igual. Está viva. O trecho esquecido volta nele, com uma variação que você não sabia que existia. É assim que a disciplina deve terminar: virando de outro.', fx: { fama: 3, karma: 3, stats: { dao: 2 }, setFlags: ['dis_mestre_repete', 'dis_forma_herdada'] } } },
        { p: 'T', text: 'Aceitar o buraco e deixar a forma incompleta como ela é', res: { text: 'Você a pratica mais curta, sem o trecho. Os aprendizes copiam a versão com o buraco, achando que é de propósito, e a escola ganha uma forma com um silêncio no meio. Anos depois, essa pausa é considerada sua maior invenção.', fx: { fama: 2, stats: { dao: 1 }, setFlags: ['dis_mestre_repete'] } } },
      ],
    },
  ],
  opcoes: {
    murim_escola: [
      { p: 'D', text: 'Pedir ao mestre que lhe dê uma só forma e deixe você repeti-la um ano inteiro', cond: T, res: { text: 'O mestre ergue uma sobrancelha, depois dá de ombros: concede. Ao final do ano, a forma é sua, os colegas chamam você de «a parede», e você aprendeu mais do que a maioria que correu atrás de dez técnicas. Mas ainda não sabe lutar com quem não segue regras.', fx: { xp: 8, stats: { comp: 2 }, setFlags: ['dis_um_ano'] } } },
    ],
    murim_mestra: [
      { p: 'D', text: 'Ficar ao lado da mestra copiando cada passo, sem perguntar, durante a tarde inteira', cond: T, res: { text: 'Ao entardecer, você repete o que ela fez e erra apenas o último ângulo. Ela sorri pela primeira vez e corrige com a ponta do pé. Diz que nunca viu alguém aprender um passo tão fundo em tão pouco, e que isso é bênção e armadilha.', fx: { xp: 6, stats: { comp: 1 }, setFlags: ['dis_mestra_garca'] } } },
    ],
    murim_dia_comum: [
      { p: 'D', text: 'Repetir a forma do dia anterior, com a diferença de uma respiração', cond: T, res: { text: 'Quando termina, não sente cansaço, e sim uma clareza: a diferença de uma respiração fez a forma mudar de peso. Você anota no caderno, com a letra de quem sabe que vai esquecer, e dorme tranquilo.', fx: { xp: 4, stats: { comp: 1 }, setFlags: ['dis_caderno'] } } },
    ],
    murim_peregrinos: [
      { p: 'D', text: 'Pedir à lanceira que repita o mesmo golpe até você conseguir contá-lo em voz alta', cond: T, res: { text: 'Ela repete dezenas de vezes, depois centenas, sem reclamar, e você conta junto. Quando a noite cai, a mulher confessa que raramente teve alguém com tanta paciência. Ensina-lhe um segundo golpe, e o seu primeiro aprendizado fora de uma escola.', fx: { xp: 6, stats: { comp: 1 }, setFlags: ['dis_lanceira'] } } },
    ],
    murim_estilos_errantes: [
      { p: 'D', text: 'Escolher uma só lição de cada mestre e repeti-la até que as cinco se pareçam com uma', cond: T, res: { text: 'Ao final do ano, as cinco lições são uma só, coisa que ninguém tinha ensinado antes. A barqueira, o ex-árbitro, a médica, a guia e o grupo das Quatro Pontes olham para o que você fez e reconhecem um pedaço de cada um. É o seu estilo, ainda sem nome.', fx: { xp: 10, stats: { comp: 2, esp: 1 }, setFlags: ['dis_estilo_unico'] } } },
    ],
    murim_arquivo: [
      { p: 'D T', text: 'Salvar o rolo de passos e copiá-lo à mão antes de entregá-lo, repetindo cada traço', cond: T, res: { text: 'A cópia sai tão fiel que a mestra Im Seol confunde as duas. Você guarda uma e entrega outra, e a escola, sem saber, passa a ter duas versões da mesma técnica. Só você saberá, quando for preciso, qual das duas é a verdadeira.', fx: { fama: 2, karma: 1, stats: { comp: 1 }, setFlags: ['dis_copia_fiel'] } } },
    ],
  },
};
