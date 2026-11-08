import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Passo silencioso (passo_vazio). Conceito: move-se sem chamar atenção e percebe quem o segue.
 * A cicatriz: quem passa despercebido por todos acaba despercebido também por quem o amaria; ninguém o procura.
 * Cenas: vaz_porta_do_celeiro (infância) -> vaz_sombra_da_escola (juventude) -> vaz_quem_te_seguia (maturidade) -> vaz_ninguem_viu (velhice).
 */
const T = { talent: ['passo_vazio'] };

export const PASSO_VAZIO: ConjuntoTraco = {
  eventos: [
    {
      id: 'vaz_porta_do_celeiro', title: 'O que a porta não ouviu', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'À noite, você desce a escada da casa sem fazer ranger um só degrau, como sempre. No celeiro, a porta está entreaberta, e dois homens conversam em voz baixa sobre a colheita de seu pai: querem escondê-la antes do cobrador. Nenhum dos dois o viu. Seu pai dorme na casa, ignorante.',
      choices: [
        { p: 'C', text: 'Voltar em silêncio e acordar o pai para contar', res: { text: 'Seu pai desce descalço, com a vara na mão, e surpreende os dois homens. Eram parentes de sua mãe, endividados, e a colheita acaba dividida em segredo, sem escândalo. Você aprende que ouvir sem ser visto traz poder, e que o poder pede um uso.', fx: { karma: 2, stats: { esp: 1 }, setFlags: ['vaz_celeiro_avisado'] } } },
        { p: 'T', text: 'Ficar escondido até os homens partirem, para ver quem mais aparece', res: { text: 'Os dois partem, e, uma hora depois, volta um terceiro, que você não esperava. Ele carrega uma lanterna coberta e uma carta. Você observa, sem respirar, e guarda o rosto dele para um dia que ainda não sabe qual será. Dorme mal, de tanto saber.', fx: { stats: { esp: 2 }, setFlags: ['vaz_terceiro_homem'] } } },
        { p: 'A', text: 'Seguir os dois pelas sombras até a casa deles para saber onde moram', check: { stat: ['esp', 'sor'], dif: -1 }, ok: { text: 'Você os segue por vinte minutos sem um ruído, e anota onde cada um mora. Quando volta, o dia está raiando. Aquela noite lhe ensina duas coisas: que sabe desaparecer, e que o desaparecimento, usado assim, é um modo de poder que não pede licença.', fx: { stats: { esp: 1, sor: 1 }, setFlags: ['vaz_seguiu_os_dois'] } }, fail: { text: 'Um dos homens se vira de repente, e você fica imóvel ao lado de uma cerca, com o coração batendo no ouvido. Ele não o vê, mas volta ao celeiro desconfiado, e o plano deles se desmancha. Você descobre que o silêncio é uma arte com fim próprio.', fx: { stats: { esp: 1 }, setFlags: ['vaz_celeiro_avisado'] } } },
      ],
    },
    {
      id: 'vaz_sombra_da_escola', title: 'A mestra que nunca o viu chegar', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'Há semanas você chega à escola sem que ninguém perceba, e sai do mesmo jeito. Os colegas já se acostumaram a esquecer que você existe: ninguém o convida, ninguém o pune. Hoje, num descuido, a mestra pergunta, diante da turma, quem é o aluno do fundo. Ela jura que nunca o viu. E você é o aluno há dois anos.',
      choices: [
        { p: 'C', text: 'Apresentar-se à turma em voz alta, nome, origem e o que sabe fazer', res: { text: 'A turma se vira, constrangida, e a mestra pede desculpas. Naquela noite, três colegas o procuram para conversar. O silêncio não é desfeito de uma vez, mas algo mudou: você descobre que desaparecer é fácil, e que ser visto, às vezes, exige coragem de outro tipo.', fx: { karma: 1, stats: { car: 1, dao: 1 }, setFlags: ['vaz_apresentou_se'] } } },
        { p: 'T', text: 'Continuar quieto e deixar que a mestra siga acreditando que você é novo', res: { text: 'A mestra aceita a resposta sem entender e passa a tratá-lo como um recém-chegado. Você continua a aprender em paz, mas percebe, no fim do ano, que ninguém na escola poderia dizer seu nome sem hesitar. A invisibilidade tem esse preço: o de não ter plateia nem testemunhas.', fx: { stats: { esp: 1 }, setFlags: ['vaz_invisivel_escola'] } } },
        { p: 'A', text: 'Aproveitar para ouvir o que a mestra e os colegas dizem quando acham que ninguém ouve', res: { text: 'Durante meses, você escuta o que ninguém lhe diria: quem teme quem, quem quer ser mestre, quem pensa em partir. A informação vale mais do que um manual. Mas a cada segredo colhido, os rostos dos colegas parecem ficar um pouco menos reais.', fx: { fama: 1, stats: { esp: 2 }, setFlags: ['vaz_escutou_escola'] } } },
      ],
    },
    {
      id: 'vaz_quem_te_seguia', title: 'A pessoa atrás de você', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 26, ageMax: 55 },
      text: 'Há três dias você percebe passos atrás dos seus, tão silenciosos quanto os seus. Quem o segue é bom. Você muda de caminho, volta, entra numa estalagem e sai pelos fundos, e a presença continua. Ao entardecer, em uma viela estreita, você se vira de repente e encontra uma jovem de olhos largos, de mãos abertas, sem armas.',
      choices: [
        { p: 'C', text: 'Perguntar por que a jovem o segue e oferecer-lhe um prato de comida', res: { text: 'Ela confessa que o segue há dois anos, aprendendo seus passos de longe, sem nunca ter sido percebida antes. Está faminta, cansada e orgulhosa. Come devagar, sem falar. Ao fim da refeição, pede para ser sua aprendiz, e você descobre que há alguém, no mundo, que o procurou de verdade.', fx: { karma: 3, stats: { car: 1 }, setFlags: ['vaz_discipula'] } } },
        { p: 'V', text: 'Imobilizar a jovem contra a parede e exigir quem a mandou', res: { text: 'Ela não resiste, mas seus olhos são de acusação. Ninguém a mandou: seguia o senhor por admiração. Você a solta, envergonhado, e ela se afasta sem olhar para trás. Anos depois, ouve dizer que uma jovem desse nome é famosa no Jianghu, e nunca fala de você.', fx: { karma: -2, stats: { dao: 1 }, setFlags: ['vaz_discipula_afastada'] } } },
        { p: 'T', text: 'Fingir que não a viu e sair pelo outro lado da viela, sem olhar para trás', res: { text: 'Você caminha com firmeza, e ela não o segue. Durante semanas, repete a caminhada na esperança de reencontrá-la, e ela nunca aparece. Era talvez a única pessoa capaz de perceber o seu passo, e você a deixou na viela.', fx: { stats: { esp: 1 }, setFlags: ['vaz_discipula_afastada'] } } },
      ],
    },
    {
      id: 'vaz_ninguem_viu', title: 'O velho que passava sem que o vissem', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 55 },
      text: 'Numa festa de colheita, você atravessa a praça inteira sem que ninguém lhe dirija o olhar. Come, ouve, ri baixo, e ninguém o repara. Aos poucos percebe: a praça comemora a vida de gente que você ajudou, e nenhum deles sabe disso. Ninguém sabe que foi você quem avisou da cheia, quem tirou a criança do poço, quem afastou o cobrador. Passou por todos como vento.',
      choices: [
        { p: 'D', text: 'Deixar-se ver: levantar a voz e contar a quem estiver perto o que fez', res: { text: 'A praça se vira, perplexa. Alguém ri, achando que é um velho exagerando. Outro chora, reconhecendo. Em algumas semanas, os jovens do povoado passam a procurá-lo na varanda para ouvir como era a vila quando ninguém olhava. Ser visto, no fim, é só um trabalho de coragem.', fx: { fama: 4, karma: 2, stats: { car: 1, dao: 1 }, setFlags: ['vaz_deixou_se_ver', 'vaz_passo_vazio_fim'] } } },
        { p: 'C', text: 'Aproximar-se da jovem aprendiz e lhe mostrar como passar sem ser notado, e quando parar', cond: { ...T, flagsAny: ['vaz_discipula', 'vaz_apresentou_se', 'vaz_celeiro_avisado'] }, res: { text: 'Ela aprende em três estações e o supera em duas. Mas aprende também o que você mais queria ensinar: que desaparecer é uma escolha, e que o melhor desaparecimento é o de quem sabe voltar. A jovem leva seu passo para muito longe, e deixa alguém sempre à porta.', fx: { fama: 3, karma: 4, stats: { dao: 2, esp: 1 }, setFlags: ['vaz_passo_vazio_fim', 'vaz_passo_herdado'] } } },
        { p: 'T', text: 'Ficar invisível até o fim, aceitando que os atos não precisam de nome para valer', res: { text: 'Você volta para casa pela rua escura e dorme em paz. Quando morrer, ninguém dirá o seu nome em voz alta, mas muitos terão vivido porque o senhor passou. Uma forma estranha de grandeza, que não pede aplauso, e que quase ninguém reconhece como tal.', fx: { karma: 2, stats: { dao: 2 }, setFlags: ['vaz_passo_vazio_fim'] } } },
      ],
    },
  ],
  opcoes: {
    murim_armazem: [
      { p: 'A T', text: 'Entrar pelo telhado, sem fazer ranger uma telha, e copiar os registros à luz da lua', cond: T, res: { text: 'Você cruza a viga mestra como uma sombra, copia as páginas à luz do luar e devolve o livro exatamente onde estava. Pela manhã, o guarda coça a cabeça sem saber que algo mudou. A lista de aldeias condenadas está na sua manga, e ninguém sabe que ela existe.', fx: { fama: 2, stats: { esp: 1 }, setFlags: ['vaz_armazem_telhado'] } } },
    ],
    murim_casa_cha: [
      { p: 'A T', text: 'Sair pela janela dos fundos antes dos passos chegarem e esperar do outro lado da rua', cond: T, res: { text: 'Do outro lado, você vê três homens entrarem e saírem de mãos vazias, furiosos. As cartas estão na sua manga. Quem eles procuravam não está lá, e jamais saberão como o perderam, nem quem foi o fantasma que lhes escapou.', fx: { fama: 2, karma: 1, setFlags: ['vaz_casa_cha_janela'] } } },
    ],
    murim_assassino: [
      { p: 'A', text: 'Seguir Choi Rin à distância e descobrir quem a Lua Oca está protegendo ou perseguindo', cond: T, res: { text: 'Choi Rin é seguida por mais gente do que imagina. Você a protege à distância e anota quem a vigia. Na noite seguinte, entrega à mulher um bilhete sem assinatura, com um nome e um aviso. Ela nunca descobre quem foi, e a Lua Oca, por algum tempo, hesita antes de ameaçá-lo.', fx: { karma: 2, stats: { esp: 1 }, setFlags: ['vaz_choi_rin_seguida'] } } },
    ],
    murim_torneio: [
      { p: 'A', text: 'Observar os juízes dos fundos da arquibancada e anotar quem aceita o quê, sem ser notado', cond: T, res: { text: 'Você passa o dia sentado numa pedra, sem chamar atenção. Ao final, tem a lista de quem recebeu o quê, de quem. Entrega-a a um escrivão amigo, anônima, e as eliminatórias do dia seguinte são conduzidas com muita cautela.', fx: { fama: 3, karma: 1, setFlags: ['vaz_torneio_observado'] } } },
    ],
    murim_ataque: [
      { p: 'V T', text: 'Circular o grupo em silêncio e surgir às costas do bandido com o distintivo', cond: T, res: { text: 'O bandido sente a lâmina fria no pescoço antes de perceber que há alguém. Você sussurra o que quer, e ele larga o distintivo sem protestar. Os outros três, sem chefe, recuam. O cocheiro nunca saberá quem salvou sua carga.', fx: { fama: 1, karma: 1, setFlags: ['vaz_ataque_silencio'] } } },
    ],
    murim_vida_comum: [
      { p: 'T', text: 'Trabalhar anos a fio no mercado sem que ninguém reconheça o seu nome', cond: T, res: { text: 'Os anos passam, e o mercado o conhece apenas como o homem do canto, que ajuda quando precisa e some quando termina. A vida é tranquila, com seus ofícios e suas pequenas generosidades. Quando alguém pergunta quem você é, dão de ombros: sempre esteve ali, e sempre foi invisível.', fx: { karma: 1, stats: { dao: 1 }, setFlags: ['vaz_vida_discreta'] } } },
    ],
  },
};
