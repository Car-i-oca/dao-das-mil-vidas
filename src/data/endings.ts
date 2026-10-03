import type { Ending, Achievement, State } from '../types';

export const ENDINGS: Ending[] = [
  { id: 'velhice', name: 'Fim em Paz', legacy: 1, text: 'Os anos acabaram como acabam todas as velas. {nome} fechou os olhos ouvindo o vento e entendeu que a chama era menos importante que a luz que deixou.' },
  { id: 'combate', name: 'Morte em Combate', legacy: 0.8, text: 'A lâmina chegou antes da resposta. {nome} caiu com os olhos abertos, e o chão, que já bebeu mais sangue de gênios que de tolos, aceitou mais um nome.' },
  { id: 'tribulacao', name: 'Cinzas da Tribulação', legacy: 1.2, text: 'O céu perguntou, {nome} respondeu, e o raio discordou. Restou apenas um clarão e um nome que professores usariam para assustar discípulos.' },
  { id: 'ascensao', name: 'Ascensão', legacy: 3, text: 'As nuvens se abriram em degraus. {nome} subiu sem olhar para trás, deixando o mundo mortal com uma lenda a mais e um cultivador a menos.' },
  { id: 'demonio', name: 'Caminho Demoníaco', legacy: 1.3, text: 'O poder chegou antes do arrependimento. {nome} sorriu com dentes que já não eram seus, e o mundo passou a falar o seu nome em voz baixa.' },
  { id: 'mortal', name: 'Vida Comum', legacy: 0.9, text: '{nome} nunca atravessou o portão, ou atravessou e voltou. Teve filhos, hortas e um chá quente. Quem sabe o Dao esteja justamente aí.' },
  { id: 'desvio', name: 'Desvio de Qi', legacy: 0.9, text: 'O Qi quebrou as margens. {nome} sentiu cada meridiano virar rio e cada rio virar fogo, até o silêncio ser a única coisa estável.' },
  { id: 'fundador', name: 'Fundador de Seita', legacy: 1.8, text: 'Séculos depois, discípulos que nunca viram {nome} ainda recitavam seus ensinamentos. A seita ergueu um pavilhão em seu nome e ninguém lembrava o rosto.' },
  { id: 'karma', name: 'A Dívida Cobrada', legacy: 1, text: 'Toda semente plantada em sangue dá fruto. {nome} descobriu, tarde demais, que o karma tem paciência e boa memória.' },
  { id: 'amor', name: 'Fio Vermelho', legacy: 1.3, text: '{nome} trocou a eternidade por uma casa pequena com uma pessoa dentro. Quando a vida acabou, não havia dúvida de que foi um bom negócio.' },
  { id: 'sacrificio', name: 'Sacrifício Final', legacy: 2, text: 'Quando o céu desabou sobre os inocentes, {nome} abriu os braços. A luz que restou durou três dias, e três gerações lembraram por quê.' },
  { id: 'eremita', name: 'O Eremita das Nuvens', legacy: 1.5, text: '{nome} subiu uma montanha sem nome e nunca desceu. Pastores dizem que o vento por lá tem voz, e que a voz conta boas histórias.' },
  { id: 'vazio', name: 'Perdido no Vazio', legacy: 1.1, text: 'O portal fechou-se atrás de {nome}. Dentro, o tempo perdeu o sentido. Talvez {nome} ainda caminhe lá, em algum lugar entre um passo e outro.' },
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
  { id: 'ach_diaspora', name: 'Discípulo de Sábios', desc: 'Receba ensinamentos de um Mestre Oculto.', reward: '+3 Herança do Dao' },
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
  ach_diaspora: (s) => s.flags.includes('tocado_por_mestre'),
};

/** Bônus de Herança do Dao compráveis. O preço sobe a cada nível (ver upgradePrice). */
export const UPGRADES = [
  { id: 'corpo', name: 'Alicerce Corporal', desc: '+1 Físico inicial por nível', max: 6, cost: 14 },
  { id: 'mente', name: 'Mente Clara', desc: '+1 Compreensão inicial por nível', max: 6, cost: 14 },
  { id: 'destino', name: 'Fio do Destino', desc: '+1 Sorte inicial por nível', max: 6, cost: 20 },
  { id: 'ritmo', name: 'Ritmo do Dao', desc: '+3% de cultivo por nível', max: 8, cost: 18 },
  { id: 'bolso', name: 'Herança de Pedras', desc: '+10 Pedras Espirituais iniciais por nível', max: 10, cost: 8 },
  { id: 'sorteio', name: 'Mais Destinos', desc: '+1 re-sorteio na criação do personagem por nível', max: 3, cost: 80 },
  { id: 'memoria', name: 'Memória de Vidas Passadas', desc: '+1% de chance em todos os testes por nível', max: 5, cost: 90 },
] as const;

/** Preço do próximo nível: cresce com o nível atual. */
export const upgradePrice = (cost: number, level: number) => Math.round(cost * Math.pow(level + 1, 1.5));
