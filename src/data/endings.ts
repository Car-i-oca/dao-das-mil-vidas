import type { Ending, Achievement, State } from '../types';

import { ENDINGS_TRACOS } from './endings_tracos';

export const ENDINGS: Ending[] = [
  ...ENDINGS_TRACOS,
  { id: 'velhice', name: 'Fim em Paz', legacy: 1, alt: [
    'Nenhum raio, nenhuma lâmina, nenhum demônio. Apenas o tempo, que vence todos sem pressa. {nome} sorriu para o teto de madeira, lembrou do cheiro da chuva em {vila} e deixou de lembrar.',
    'Os discípulos esperaram à porta, em silêncio. Dentro, {nome} terminou o chá, fechou os olhos e confiou o resto ao Céu. O chá ainda estava morno quando abriram a porta.',
    'A última coisa que {nome} sentiu foi a respiração ficando mais longa, mais lenta, até se confundir com o vento. Estava, afinal, em harmonia com o que sempre buscou.',
    'Antes do fim, {nome} contou a quem quis ouvir o que aprendeu: pouco, quase nada, e o suficiente. A velhice não foi derrota; foi o capítulo em que o livro se fechou sem se rasgar.',
  ], text: 'Os anos acabaram como acabam todas as velas. {nome} fechou os olhos ouvindo o vento e entendeu que a chama era menos importante que a luz que deixou.' },
  { id: 'combate', name: 'Morte em Combate', legacy: 0.8, alt: [
    '{nome} ainda tentou levantar, mas as pernas já não pertenciam a este mundo. O último golpe veio de um inimigo que, anos depois, não saberia dizer por que o ódio não valeu a pena.',
    'O silêncio depois da luta foi estranho. {nome} olhou o céu, viu uma nuvem passando, e achou que era uma boa nuvem para ser a última.',
  ], text: 'A lâmina chegou antes da resposta. {nome} caiu com os olhos abertos, e o chão, que já bebeu mais sangue de gênios que de tolos, aceitou mais um nome.' },
  { id: 'tribulacao', name: 'Cinzas da Tribulação', legacy: 1.2, alt: [
    'O terceiro raio chegou antes do pensamento. Em volta do clarão, as nuvens se abriram, como quem espia, e se fecharam, como quem desiste. O vale guardou o cheiro de ozônio por um ano.',
    '{nome} subiu ao cume com o coração firme, e ouviu uma pergunta no trovão. A resposta que deu foi sincera, e o Céu, que respeita sinceridade, não a perdoou.',
  ], text: 'O céu perguntou, {nome} respondeu, e o raio discordou. Restou apenas um clarão e um nome que professores usariam para assustar discípulos.' },
  { id: 'ascensao', name: 'Ascensão', legacy: 3, text: 'As nuvens se abriram em degraus. {nome} subiu sem olhar para trás, deixando o mundo mortal com uma lenda a mais e um cultivador a menos.' },
  { id: 'demonio', name: 'Caminho Demoníaco', legacy: 1.3, text: 'O poder chegou antes do arrependimento. {nome} sorriu com dentes que já não eram seus, e o mundo passou a falar o seu nome em voz baixa.' },
  { id: 'mortal', name: 'Vida Comum', legacy: 0.9, alt: [
    'Dizem que {nome} sonhava, quando jovem, com espadas e nuvens. Aos oitenta, sonhava com a horta. Nenhum dos dois sonhos foi desperdício.',
    'Quem passava pela casa de {nome}, em {vila}, via sempre uma panela no fogo e uma cadeira vazia para visitas. O Dao, talvez, passasse por ali mais vezes do que se imagina.',
  ], text: '{nome} nunca atravessou o portão, ou atravessou e voltou. Teve filhos, hortas e um chá quente. Quem sabe o Dao esteja justamente aí.' },
  { id: 'desvio', name: 'Desvio de Qi', legacy: 0.9, alt: [
    'Havia um som, um zumbido, uma doçura quente subindo pelo braço. {nome} reconheceu os sinais tarde demais e, mesmo assim, ainda tentou respirar fundo.',
    'O meridiano rompeu primeiro; o resto foi consequência. Os que encontraram {nome} disseram que o rosto estava calmo, o que talvez fosse o mais cruel de tudo.',
  ], text: 'O Qi quebrou as margens. {nome} sentiu cada meridiano virar rio e cada rio virar fogo, até o silêncio ser a única coisa estável.' },
  { id: 'fundador', name: 'Fundador de Seita', legacy: 1.8, text: 'Séculos depois, discípulos que nunca viram {nome} ainda recitavam seus métodos. A seita ergueu um pavilhão em seu nome e ninguém lembrava o rosto.' },
  { id: 'karma', name: 'A Dívida Cobrada', legacy: 1, text: 'Toda semente plantada em sangue dá fruto. {nome} descobriu, tarde demais, que o karma tem paciência e boa memória.' },
  { id: 'amor', name: 'Fio Vermelho', legacy: 1.3, text: '{nome} trocou a eternidade por uma casa pequena com uma pessoa dentro. Quando a vida acabou, não havia dúvida de que foi um bom negócio.' },
  { id: 'sacrificio', name: 'Sacrifício Final', legacy: 2, text: 'Quando o céu desabou sobre os inocentes, {nome} abriu os braços. A luz que restou durou três dias, e três gerações lembraram por quê.' },
  { id: 'eremita', name: 'O Eremita das Nuvens', legacy: 1.5, text: '{nome} subiu uma montanha sem nome e nunca desceu. Pastores dizem que o vento por lá tem voz, e que a voz conta boas histórias.' },
  { id: 'vazio', name: 'Perdido no Vazio', legacy: 1.1, text: 'O portal fechou-se atrás de {nome}. Dentro, o tempo perdeu o sentido. Talvez {nome} ainda caminhe lá, em algum lugar entre um passo e outro.' },
  { id: 'patriarca', name: 'Patriarca da Seita', legacy: 1.7, text: '{nome} governou a {seita} por incontáveis invernos. Quando o manto passou a outras mãos, o portão que antes desbotava brilhava como no primeiro dia.' },
  { id: 'guardiao', name: 'Guardião do Reino Secreto', legacy: 1.6, text: 'A névoa dourada se fechou sobre {nome}. Dizem que, a cada cem anos, quando o reino abre por sete dias, uma figura calma espera junto ao portão e faz uma pergunta a cada viajante.' },
  { id: 'pilula', name: 'A Pílula Suprema', legacy: 1.5, text: 'O fogo aceitou {nome}. Na fornalha restou uma única pílula, sem cor e sem nome. Séculos depois, alguém a tomou e passou a se lembrar de uma vida que não era sua.' },
  { id: 'ancestral', name: 'Ancestral do Clã', legacy: 1.6, text: 'O retrato de {nome} ainda pende no salão do {cla}. Cada geração recebe, aos sete anos, uma lição sobre quem ergueu aquelas paredes.' },
  { id: 'conselheiro', name: 'A Sombra do Trono', legacy: 1.4, text: 'Poucos livros mencionam {nome}. Mas, em cada reinado próspero, um conselheiro silencioso sempre sussurrava a decisão certa antes que ela fosse necessária.' },
  { id: 'senhor_sangue', name: 'Senhor do Sangue', legacy: 1.4, text: 'No trono de ossos, {nome} governou a seita demoníaca por séculos. Aldeias rezavam para que a sombra passasse longe; outras, para que ela decidisse protegê-las.' },
  { id: 'penitente', name: 'O Penitente', legacy: 1.5, text: 'No templo de pedra gasta, {nome} varreu o mesmo corredor por quarenta anos. Quando a vassoura caiu, o corredor estava limpo, e a alma também.' },
  { id: 'iluminacao', name: 'A Iluminação', legacy: 2.4, text: 'Não houve nuvens, nem raios, nem degraus. {nome} apenas sentou-se à beira da estrada e entendeu. O mundo seguiu como antes, e algo, bem de leve, sorriu para sempre.' },
  { id: 'celeste', name: 'Oficial da Corte Celeste', legacy: 1.5, text: 'No terceiro andar da Secretaria de Tribulações, uma mesa de jade guarda os carimbos de {nome}. Dizem que cultivadores desavisados, às vezes, se salvam por uma rasura bem colocada.' },
  // Variações da velhice, conforme a vida que a pessoa levou
  { id: 'velhice_mestre', name: 'Mestre Respeitado', legacy: 1.3, text: 'Quando {nome} se despediu, o pátio inteiro da {seita} estava de joelhos, e nenhum discípulo teve vergonha de chorar. Ensinara menos pelo que dizia do que pelo que fazia.', alt: [
    'O funeral de {nome} durou sete dias. Vieram seitas rivais, mercadores, camponeses, e até um velho inimigo, que se curvou mais fundo do que todos.',
    '{nome} partiu cercado de nomes que o pronunciavam com respeito. Nos anos seguintes, o título "Mestre" ficou mais pesado para quem veio depois.',
  ] },
  { id: 'velhice_esquecido', name: 'O Velho Esquecido', legacy: 0.9, text: '{nome} morreu como viveu nos últimos anos: sem aplausos, sem testemunhas e sem pressa. Poucos lembraram do nome. A montanha, que lembrava, não disse nada.', alt: [
    'Ninguém soube ao certo quando {nome} partiu. Meses depois, alguém achou a cabana vazia, o chá frio e um caderno cheio de letras pequenas, que ninguém leu.',
    'A fama de {nome} se dissolveu como orvalho. Quando o velho cultivador fechou os olhos, a estalagem do vale estava cheia, e ninguém comentou.',
  ] },
  { id: 'velhice_avo', name: 'A Casa Cheia', legacy: 1.2, text: 'No último dia, a casa de {nome} estava cheia de netos, sobrinhos, vizinhos e panelas. Alguém tocava flauta no pátio. Para quem sempre procurou a eternidade, foi uma saída barulhenta e feliz.', alt: [
    'Netos brincavam no pátio quando {nome} fechou os olhos. Alguém viria, minutos depois, e cobriria o velho cultivador com o xale que ele mesmo havia tecido anos antes.',
    'O {cla} inteiro se reuniu no salão para a despedida. Cada um contou uma história diferente de {nome}, e nenhuma delas era mentira.',
  ] },
  { id: 'velhice_sabio', name: 'O Sábio da Montanha', legacy: 1.4, text: 'Peregrinos subiam a montanha de {nome} para fazer uma única pergunta e ouviam, quase sempre, uma resposta que só entendiam anos depois. Quando a cabana ficou em silêncio, o vento continuou respondendo.', alt: [
    '{nome} morreu sentado, de olhos abertos, olhando um desfiladeiro. Os que o encontraram juram que o sorriso era de quem acabou de ouvir uma boa piada do Céu.',
    'Até o fim, {nome} manteve o Coração do Dao firme como uma pedra de rio. Diz-se que, no instante da partida, o riacho ao lado parou de correr por uma respiração.',
  ] },
  { id: 'velhice_rancoroso', name: 'O Rancor Que Sobrou', legacy: 0.9, text: '{nome} viveu muito, e cada ano foi um tijolo a mais no muro do rancor. Morreu sozinho, cercado de memórias de dívidas cobradas e de dívidas por cobrar.', alt: [
    'Havia gente que esperava o fim de {nome} com alívio. Outros, com saudade da própria raiva. A lápide ficou sem flores, e ninguém se surpreendeu.',
    'O último pensamento de {nome} foi uma lista de nomes. O primeiro era o de quem o havia ofendido, e o último, estranhamente, o próprio.',
  ] },
  { id: 'velhice_rico', name: 'A Fortuna Que Ficou', legacy: 1.0, text: 'Os cofres de {nome} estavam cheios quando o coração parou. Herdeiros brigaram por três anos pelo que sobrou, e todos descobriram que ninguém, sozinho, soube gastar tudo aquilo.', alt: [
    '{nome} morreu cercado de pedras espirituais, com o olhar fixo no teto. Alguns dizem que tentou contá-las uma última vez, e perdeu a conta no mesmo instante em que perdeu o fôlego.',
    'A fortuna de {nome} financiou três templos, uma biblioteca e um processo judicial que durou setenta anos. Poucos se lembravam do rosto do dono.',
  ] },
  { id: 'velhice_veterano', name: 'O Veterano das Cicatrizes', legacy: 1.2, text: '{nome} morreu com mais cicatrizes que dentes. Cada uma, dizia, era uma história que não valia a pena contar. Os jovens, mesmo assim, pediam que contasse.', alt: [
    'No fim, {nome} só queria sentar-se ao sol com uma tigela de sopa. Teve esse último gosto, e mais uma cicatriz nova, de uma cadeira de bambu quebrada.',
    'Duas guerras, três torneios, um cerco e um inverno interminável. {nome} morreu na cama, o que, para um veterano, é o desfecho mais improvável.',
  ] },
  // Mortes ligadas às eras do mundo e a traições
  { id: 'guerra', name: 'Caído na Guerra', legacy: 1.0, text: 'A guerra entre as seitas não escolheu lados na hora de cobrar. {nome} caiu num campo cheio de bandeiras que ninguém mais lembra de quem eram.', alt: ['Nos registros da guerra, o nome de {nome} aparece numa linha, entre duzentos outros. Em casa, uma criança perguntou por que a mãe chorava, e ninguém soube explicar a política.'] },
  { id: 'doenca', name: 'A Febre da Praga', legacy: 0.9, text: 'A praga não distinguiu rico de pobre, mortal de cultivador. {nome} deitou-se numa esteira simples e, entre uma febre e outra, lembrou de uma canção que a avó cantava.', alt: ['Os curandeiros tentaram tudo. {nome} agradeceu cada chá, cada oração, cada mão fria na testa, e partiu com um sorriso cansado.'] },
  { id: 'feras', name: 'Engolido pela Maré de Bestas', legacy: 1.0, text: 'Quando a maré de bestas desceu da cordilheira, {nome} segurou a linha por tempo suficiente para duas aldeias fugirem. O que se ouviu depois foi um rugido, e depois, silêncio.', alt: ['Diz-se que as feras recuaram no dia seguinte, sem razão aparente. Alguns acham que foi respeito, e outros, saciedade.'] },
  { id: 'exilio', name: 'Exilado Para Sempre', legacy: 1.0, text: 'Com a queda da dinastia, {nome} foi declarado inimigo do trono novo e partiu para o exílio. Escreveu cartas por anos, e nenhuma foi respondida. Morreu em terra estrangeira, de saudade e de frio.', alt: ['O novo imperador mandou apagar o nome de {nome} dos registros. A montanha, indiferente, o guardou.'] },
  { id: 'cacado', name: 'Caçado pelo Culto', legacy: 1.0, text: 'Os emissários do Culto do Trono Escarlate nunca erram o caminho. {nome} soube que eles chegariam semanas antes, e usou as semanas para queimar cartas e cuidar das pessoas.', alt: ['Ninguém ouviu a conversa entre {nome} e os emissários. Só se viu, ao amanhecer, uma casa vazia e uma xícara de chá, ainda morna.'] },
  { id: 'traicao', name: 'Punhal nas Costas', legacy: 1.0, text: 'Foi alguém de confiança. É sempre alguém de confiança. {nome} só virou o rosto a tempo de ver o sorriso hesitante, o mesmo de tantos anos atrás.', alt: ['A lâmina veio de uma mão que {nome} havia ajudado. O último pensamento foi menos de ódio que de espanto.'] },
  { id: 'duelo', name: 'Morto em Duelo de Honra', legacy: 1.1, text: 'Dois cultivadores, uma ponte e uma palavra empenhada. {nome} perdeu o duelo, mas ganhou o respeito do vencedor, que enterrou o adversário com as próprias mãos.', alt: ['O duelo durou três lances. Houve quem dissesse que {nome} podia ter vencido, e quem dissesse que não quis.'] },
  { id: 'reencarnacao', name: 'A Roda do Samsara', legacy: 2.2, text: 'Ao morrer, {nome} soltou a mão da vida e sentiu outra mão segurá-la. Em algum lugar, uma criança abriu os olhos pela primeira vez, lembrando de tudo.' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_despertar', name: 'Primeiro Passo', desc: 'Desperte o Qi pela primeira vez.', reward: '+3 Herança do Dao' },
  { id: 'ach_fundacao', name: 'Alicerce Firme', desc: 'Alcance o 2º reino.', reward: 'Talento: Coração Inabalável' },
  { id: 'ach_nucleo', name: 'Núcleo Brilhante', desc: 'Alcance o 3º reino.', reward: 'Origem: Alma Reencarnada' },
  { id: 'ach_alquimista', name: 'Mão de Alquimista', desc: 'Alcance o 2º reino no Caminho da Alquimia.', reward: 'Origem: Neto de Alquimista' },
  { id: 'ach_demonio', name: 'Sombra Escolhida', desc: 'Termine uma vida como demônio ou com Corrupção de 60 ou mais.', reward: 'Origem: Rebento da Seita Demoníaca + Trilha: Caminho do Sangue' },
  { id: 'ach_mortal', name: 'Simplicidade', desc: 'Termine uma vida como mortal comum.', reward: 'Origem: Mendigo das Estradas' },
  { id: 'ach_ascensao', name: 'Degraus de Nuvem', desc: 'Ascenda ou transcenda.', reward: 'Talento: Olhar do Dao' },
  { id: 'ach_centenario', name: 'Centenário', desc: 'Viva mais de 100 anos.', reward: 'Talento: Longevidade Natural' },
  { id: 'ach_vinganca', name: 'Dívida Quitada', desc: 'Derrote seu maior rival.', reward: '+5 Herança do Dao' },
  { id: 'ach_fundador', name: 'Pedra Fundamental', desc: 'Funde uma seita.', reward: '+8 Herança do Dao' },
  { id: 'ach_amor', name: 'Fio Vermelho', desc: 'Termine uma vida ao lado de quem ama.', reward: '+5 Herança do Dao' },
  { id: 'ach_milionario', name: 'Cofre Cheio', desc: 'Acumule 1.000 pedras espirituais.', reward: '+4 Herança do Dao' },
  { id: 'ach_sacrificio', name: 'Luz Que Fica', desc: 'Termine uma vida em sacrifício.', reward: 'Talento: Predestinado' },
  { id: 'ach_eremita', name: 'Silêncio Alto', desc: 'Termine uma vida como eremita.', reward: 'Origem: Discípulo do Eremita' },
  { id: 'ach_vazio', name: 'Entre Passos', desc: 'Perca-se no Vazio.', reward: 'Talento: Passo do Vazio' },
  { id: 'ach_reencarnacao', name: 'A Roda Gira', desc: 'Termine uma vida pela Roda do Samsara.', reward: 'Talento: Sangue de Dragão' },
  { id: 'ach_mestre_veneno', name: 'Mão Verde', desc: 'Alcance o 3º reino no Caminho dos Venenos.', reward: '+4 Herança do Dao' },
  { id: 'ach_pacto_besta', name: 'Irmãos de Alma', desc: 'Sele um pacto com uma besta espiritual.', reward: '+3 Herança do Dao' },
  { id: 'ach_patriarca', name: 'Manto de Séculos', desc: 'Torne-se Patriarca de uma seita.', reward: '+6 Herança do Dao' },
  { id: 'ach_guardiao', name: 'A Pergunta do Portão', desc: 'Torne-se Guardião de um Reino Secreto.', reward: '+6 Herança do Dao' },
  { id: 'ach_pilula', name: 'Alquimista Absoluto', desc: 'Refine a si mesmo na Pílula Suprema.', reward: '+6 Herança do Dao' },
  { id: 'ach_ancestral', name: 'Retrato no Salão', desc: 'Torne-se Ancestral de um clã.', reward: '+6 Herança do Dao' },
  { id: 'ach_conselheiro', name: 'Voz Atrás do Trono', desc: 'Termine como Conselheiro Eterno de um império.', reward: '+5 Herança do Dao' },
  { id: 'ach_senhor_sangue', name: 'Coroa de Ossos', desc: 'Torne-se Senhor do Sangue.', reward: '+5 Herança do Dao' },
  { id: 'ach_penitente', name: 'Vassoura e Silêncio', desc: 'Termine uma vida como Penitente.', reward: '+6 Herança do Dao' },
  { id: 'ach_iluminacao', name: 'Despertar Sem Degraus', desc: 'Alcance a Iluminação ao fim da Peregrinação ao Oeste.', reward: '+8 Herança do Dao' },
  { id: 'ach_celeste', name: 'Carimbo do Céu', desc: 'Torne-se Oficial da Corte Celeste ou o novo Registro.', reward: '+5 Herança do Dao' },
  { id: 'ach_diaspora', name: 'Discípulo de Sábios', desc: 'Recebo métodos de um Mestre Oculto.', reward: '+3 Herança do Dao' },
];

/** Condição de cada conquista. `ending` só existe ao morrer. */
export const ACH_CHECKS: Record<string, (s: State, ending?: string) => boolean> = {
  ach_despertar: (s) => s.tier >= 1,
  ach_fundacao: (s) => s.tier >= 2,
  ach_nucleo: (s) => s.tier >= 3,
  ach_alquimista: (s) => s.path === 'alquimia' && s.tier >= 2,
  ach_demonio: (s, e) => e === 'demonio' || s.corr >= 60,
  ach_mortal: (_s, e) => e === 'mortal',
  ach_ascensao: (_s, e) => e === 'ascensao',
  ach_centenario: (s) => s.age >= 100,
  ach_vinganca: (s) => s.flags.includes('rival_derrotado'),
  ach_fundador: (_s, e) => e === 'fundador',
  ach_amor: (_s, e) => e === 'amor',
  ach_milionario: (s) => s.pedras >= 1000,
  ach_sacrificio: (_s, e) => e === 'sacrificio',
  ach_eremita: (_s, e) => e === 'eremita',
  ach_vazio: (_s, e) => e === 'vazio',
  ach_reencarnacao: (_s, e) => e === 'reencarnacao',
  ach_mestre_veneno: (s) => s.path === 'venenos' && s.tier >= 3,
  ach_pacto_besta: (s) => s.flags.includes('pacto_besta'),
  ach_patriarca: (_s, e) => e === 'patriarca',
  ach_guardiao: (_s, e) => e === 'guardiao',
  ach_pilula: (_s, e) => e === 'pilula',
  ach_ancestral: (_s, e) => e === 'ancestral',
  ach_conselheiro: (_s, e) => e === 'conselheiro',
  ach_senhor_sangue: (_s, e) => e === 'senhor_sangue',
  ach_penitente: (_s, e) => e === 'penitente',
  ach_iluminacao: (_s, e) => e === 'iluminacao',
  ach_celeste: (_s, e) => e === 'celeste',
  ach_diaspora: (s) => s.flags.includes('tocado_por_mestre'),
};

/** Bônus de Herança do Dao compráveis. O preço sobe a cada nível (ver upgradePrice). */
export const UPGRADES = [
  { id: 'corpo', name: 'Alicerce Corporal', desc: '+1 Físico inicial por nível', max: 5, cost: 14 },
  { id: 'mente', name: 'Mente Clara', desc: '+1 Compreensão inicial por nível', max: 5, cost: 14 },
  { id: 'destino', name: 'Fio do Destino', desc: '+1 Sorte inicial por nível', max: 5, cost: 20 },
  { id: 'ritmo', name: 'Ritmo do Dao', desc: '+2% de cultivo por nível', max: 6, cost: 18 },
  { id: 'bolso', name: 'Herança de Pedras', desc: '+10 Pedras Espirituais iniciais por nível', max: 10, cost: 8 },
  { id: 'sorteio', name: 'Mais Destinos', desc: '+1 re-sorteio na criação do personagem por nível', max: 3, cost: 80 },
  { id: 'memoria', name: 'Memória de Vidas Passadas', desc: '+0,8% de chance em todos os testes por nível', max: 4, cost: 90 },
] as const;

/** Preço do próximo nível: cresce com o nível atual. */
export const upgradePrice = (cost: number, level: number) => Math.round(cost * Math.pow(level + 1, 1.5));
