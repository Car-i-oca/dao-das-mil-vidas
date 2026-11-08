import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Aprendiz rápido (aprendiz_veloz). Conceito: assimila fundamentos antes de a aula terminar.
 * Diferente do Aprendiz disciplinado (repetição), este pula etapas. A cicatriz: o que se aprende cedo demais tem buracos
 * que só aparecem na hora da prova, e quem pula etapas descobre tarde o que não viu.
 * Cenas: ver_aula_curta (infância) -> ver_buraco_na_base (juventude) -> ver_aluno_lento (maturidade) -> ver_licao_devagar (velhice).
 */
const T = { talent: ['aprendiz_veloz'] };

export const APRENDIZ_VELOZ: ConjuntoTraco = {
  eventos: [
    {
      id: 'ver_aula_curta', title: 'A aula que acabou antes', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'O mestre começa a ensinar o primeiro passo da postura básica e, antes de terminar a frase, você já o repetiu inteiro, com os pés no lugar certo e a respiração acertada. A turma ainda está de pé sem entender. O mestre franze a testa, não sabe se é orgulho ou desconfiança, e pergunta se você quer que ele continue.',
      choices: [
        { p: 'D', text: 'Pedir que ele repita devagar, mesmo já tendo entendido', res: { text: 'O mestre suspira, aliviado, e repete devagar. Ao final, mostra um detalhe do calcanhar que você não tinha visto. Você descobre o primeiro pedaço de uma lição que levará décadas: entender depressa não é o mesmo que saber.', fx: { xp: 5, stats: { comp: 1, dao: 1 }, setFlags: ['ver_pediu_devagar'] } } },
        { p: 'M', text: 'Dizer que já aprendeu e pedir a próxima lição', res: { text: 'O mestre ergue uma sobrancelha, ensina a seguinte e depois outra. Em um mês, você supera a turma inteira. O orgulho do mestre se mistura a uma ponta de inquietação: ele nunca viu ninguém avançar assim, e não sabe o que ensinar quando o aluno acabar o caminho.', fx: { xp: 10, fama: 1, stats: { comp: 2 }, setFlags: ['ver_pulou_etapa'] } } },
        { p: 'C', text: 'Ficar quieto e ajudar os colegas, ensinando com as próprias palavras o que entendeu', res: { text: 'Os colegas aprendem mais depressa com você do que com o mestre, que observa com os braços cruzados. No fim da semana, o mestre propõe que você auxilie as aulas pequenas. Você ensina e aprende, e descobre que explicar é uma forma de entender duas vezes.', fx: { karma: 2, xp: 5, stats: { car: 1, comp: 1 }, setFlags: ['ver_ensinou_colegas'] } } },
      ],
    },
    {
      id: 'ver_buraco_na_base', title: 'O que a pressa não ensinou', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'Num duelo importante, você usa uma técnica avançada com perfeição e é derrotado por um golpe elementar que nunca estudou: uma simples varredura de calcanhar. O oponente, mais lento e mais velho, olha o chão e depois você, com piedade. Você pulou o fundamento por ser fácil demais. Agora entende por que o chamavam de fundamento.',
      choices: [
        { p: 'D', text: 'Voltar aos primeiros exercícios da escola e refazer cada passo, um por mês', res: { text: 'Leva um ano. Os colegas mais novos assistem, constrangidos, o aluno prodígio repetindo o que eles já fizeram. Ao final, os primeiros exercícios são seus pela primeira vez, e a técnica avançada ganha uma raiz. O mestre diz apenas: agora sim.', fx: { xp: 10, stats: { comp: 2, dao: 1 }, setFlags: ['ver_base_refeita'] } } },
        { p: 'A', text: 'Procurar o oponente e pedir que lhe mostre todos os golpes que nunca precisou aprender', check: { stat: ['car', 'esp'], dif: 0 }, ok: { text: 'O oponente, surpreso, aceita. Durante três semanas, mostra a você os golpes pequenos, os truques de bairro, as saídas feias. Você anota tudo e entende, por fim, que há uma sabedoria no que é lento e vulgar.', fx: { fama: 1, karma: 2, stats: { esp: 1, comp: 1 }, setFlags: ['ver_base_refeita', 'ver_mestre_de_bairro'] } }, fail: { text: 'O oponente recusa, com um sorriso triste, dizendo que tem pouco a ensinar a alguém que aprende tão depressa. A recusa ensina o que a lição não ensinou: pressa deixa conhecidos, não mestres.', fx: { stats: { dao: 1 }, setFlags: ['ver_pulou_etapa'] } } },
        { p: 'M', text: 'Treinar mais depressa ainda, para compensar o buraco antes da próxima disputa', res: { text: 'Você avança tão rápido que o buraco fica coberto por técnicas novas. A próxima disputa é ganha, e a seguinte também, até o dia em que algo básico falha e você cai de uma altura em que não devia estar. A pressa cobra juros compostos.', fx: { fama: 2, ferida: 1, stats: { comp: 1 }, setFlags: ['ver_pulou_etapa'] } } },
      ],
    },
    {
      id: 'ver_aluno_lento', title: 'O aluno que demorou três anos', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 28, ageMax: 58 },
      text: 'Um rapaz de dezoito anos pede que você o ensine. Ele é o aluno mais lento que você já viu: repete um passo duas semanas e ainda o erra. Os outros mestres o recusaram. Você, que aprendeu sempre antes do fim da explicação, não sabe como se ensina alguém que precisa do tempo inteiro. A paciência nunca lhe foi exigida.',
      choices: [
        { p: 'C D', text: 'Aceitá-lo e ensinar no ritmo dele, aprendendo com a lentidão o que a pressa nunca mostrou', res: { text: 'Três anos depois, o rapaz executa a forma melhor do que você. Ele a conhece por dentro, em cada junta, em cada respiração. Você aprende, ao vê-lo, o que lhe faltava: a posse, a lentidão que cria raiz. O aluno lento é o seu primeiro mestre.', fx: { fama: 3, karma: 4, stats: { dao: 2, comp: 1 }, setFlags: ['ver_aluno_lento_ensinado'] } } },
        { p: 'T', text: 'Recusar educadamente e indicar um mestre mais paciente', res: { text: 'O rapaz agradece e parte. Anos depois, você o encontra na feira, mestre respeitado de uma escola pequena. Cumprimenta-o com um aceno, e ele responde com um sorriso que você não sabe se é gratidão ou perdão.', fx: { karma: 1, setFlags: ['ver_aluno_lento_recusado'] } } },
        { p: 'M', text: 'Aceitá-lo e acelerar o método, pulando as etapas que lhe pareciam desnecessárias', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O rapaz sofre, mas avança. Você descobre que o método acelerado funciona em quem tem a sua pressa, e não nele. No segundo ano, ele troca de escola, envergonhado, e você não o procura. A lição ficou entre ambos, sem nome.', fx: { fama: 1, karma: -1, stats: { comp: 1 }, setFlags: ['ver_aluno_lento_recusado'] } }, fail: { text: 'O rapaz se fere num exercício acelerado demais e abandona o ofício. A culpa fica com você por muito tempo. Aprender depressa não é ensinar depressa, e você leva a lição no corpo de outra pessoa.', fx: { fama: -2, karma: -3, stats: { dao: 1 }, setFlags: ['ver_aluno_lento_ferido'] } } },
      ],
    },
    {
      id: 'ver_licao_devagar', title: 'O que se aprende no fim', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 55 },
      text: 'Aos cinquenta e tantos anos, você enfrenta algo que não consegue entender de uma vez: um poema antigo, lido devagar em voz alta por uma velha cega que o recita de cor. A cada verso, o sentido escapa. A velha o repete, pausadamente. Você sempre aprendeu depressa, e agora percebe que há coisas que só se aprendem devagar.',
      choices: [
        { p: 'D O', text: 'Sentar ao lado da velha e deixar que o poema revele o sentido ao longo de um ano inteiro', res: { text: 'O ano é longo, e o poema se abre aos poucos, verso a verso, como uma flor lenta. No último dia, você o recita sozinho e chora sem saber por quê. Aprendeu, enfim, a lição que a rapidez sempre lhe negou: a de esperar a coisa vir.', fx: { karma: 2, stats: { dao: 3 }, setFlags: ['ver_licao_devagar_ok', 'ver_aprendiz_fim'] } } },
        { p: 'C', text: 'Ensinar o poema, depois de aprendido, a um jovem apressado como você foi', cond: { ...T, flagsAny: ['ver_aluno_lento_ensinado', 'ver_pediu_devagar', 'ver_base_refeita', 'ver_mestre_de_bairro', 'ver_ensinou_colegas'] }, res: { text: 'O jovem tenta decorar o poema em uma noite e falha. Você diz apenas: devagar. Ele resiste por semanas, e então entende. Esse é o único ensinamento que você deixa, e ele cabe em uma palavra que levou a vida inteira para aprender.', fx: { fama: 3, karma: 3, stats: { dao: 2 }, setFlags: ['ver_licao_devagar_ok', 'ver_aprendiz_fim', 'ver_herdeiro_devagar'] } } },
        { p: 'T', text: 'Pedir que a velha resuma o sentido, e seguir com o resumo', res: { text: 'A velha ri, seca, e resume em duas frases. Você as guarda, útil e vazio. Anos depois, relê o poema e sente que aprendeu o essencial, mas não o que tinha valor. Algumas coisas não aceitam atalho, e você prefere não pensar nisso.', fx: { stats: { comp: 1 }, setFlags: ['ver_aprendiz_fim'] } } },
      ],
    },
  ],
  opcoes: {
    murim_escola: [
      { p: 'D', text: 'Escolher a escola que ensina o fundamento mais antigo e pedir para começar do primeiro dia', cond: T, res: { text: 'O mestre ri, desconfiado, e aceita. Você passa o primeiro mês a repetir um único passo, e a primeira coisa que aprende é a dificuldade de ser lento. Mas, ao fim do mês, o passo está plantado nos pés, e os que vieram depois tropeçam onde você não tropeça.', fx: { xp: 8, stats: { comp: 1, dao: 1 }, setFlags: ['ver_primeiro_dia'] } } },
    ],
    murim_estilos_errantes: [
      { p: 'A', text: 'Aprender a lição de cada mestre na primeira hora e passar o resto do dia comparando', cond: T, res: { text: 'Ao entardecer, você sabe cinco lições e as relaciona umas às outras, descobrindo contradições que nenhum dos mestres vira. A barqueira ri, o ex-árbitro suspira e a guia diz que nunca viu um aluno mais perigoso: capaz de perguntar o que ninguém quer responder.', fx: { xp: 10, stats: { comp: 2 }, setFlags: ['ver_cinco_mestres'] } } },
    ],
    murim_mestra: [
      { p: 'A D', text: 'Imitar os passos da mestra na primeira vez em que os viu e pedir que ela corrija o erro', cond: T, res: { text: 'Você repete os passos quase sem erro, e a mestra, espantada, corrige o único. Ela lhe diz que raramente ensina quem já sabe. Mas, aos poucos, entre uma correção e outra, entende que ensinar um aprendiz rápido é ensinar a ver o que a pressa esconde.', fx: { xp: 8, stats: { comp: 1, esp: 1 }, setFlags: ['ver_mestra_garca'] } } },
    ],
    murim_arquivo: [
      { p: 'A', text: 'Ler o rolo de lança uma vez, copiar de memória e deixar o original para a escola', cond: T, res: { text: 'A cópia sai quase perfeita, com dois erros de ordem. Você entrega o original à mestra Im Seol e leva consigo a lança. Meses depois, descobre que os erros mudam a técnica, e que a imperfeição virou estilo. A escola ganha o rolo, e você, uma variação que nunca existiu.', fx: { fama: 1, stats: { comp: 1 }, setFlags: ['ver_rolo_copiado'] } } },
    ],
    murim_mercado: [
      { p: 'A', text: 'Observar Noh remendar a bainha uma vez e repetir o ponto na própria bolsa', cond: T, res: { text: 'Noh vê o conserto improvisado e solta uma gargalhada: nunca viu ninguém aprender o ponto de bainha por olhar. Ensina outros três que usava só para ele. Você sai com um ofício a mais e com uma amizade fácil, dessas que se fazem pelo gosto de ensinar.', fx: { pedras: 5, stats: { comp: 1 }, setFlags: ['ver_ponto_de_noh'] } } },
    ],
    murim_peregrinos: [
      { p: 'D', text: 'Pedir ao médico da espada quebrada que ensine primeiro o que ele errou ao aprender', cond: T, res: { text: 'O médico, comovido, conta tudo o que pulou e pagou por isso. A lição é a mais valiosa que você ouviu: não a técnica, mas o mapa das armadilhas de quem tinha pressa. Anota cada uma, e as lembra mais tarde, na hora em que a pressa chama.', fx: { karma: 1, stats: { comp: 1, dao: 1 }, setFlags: ['ver_mapa_dos_erros'] } } },
    ],
  },
};
