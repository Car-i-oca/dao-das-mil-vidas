import type { Ending, Achievement, State } from '../types';


export const ENDINGS: Ending[] = [
  { id: 'velhice', name: 'Uma vida completa', legacy: 1, text: '{nome} deixou o último fôlego numa casa tranquila. No pátio, alguém repetia um movimento que {nome} ensinara sem perceber.' },
  { id: 'mortal', name: 'A vida fora do Jianghu', legacy: 0.9, text: '{nome} escolheu uma existência comum: trabalho, família e noites sem vigília. Não foi uma vida menor por não ter sido lembrada nas tavernas.' },
  { id: 'combate', name: 'Caído na estrada', legacy: 0.8, text: 'A estrada ficou em silêncio. Quem conhecia {nome} contou a história com uma versão diferente, mas todos lembraram que alguém teve tempo de fugir.' },
  { id: 'tribulacao', name: 'A última prova', legacy: 1.1, text: 'A prova final terminou antes do amanhecer. {nome} não voltou, mas os que sobreviveram carregaram suas decisões por muitos anos.' },
  { id: 'ascensao', name: 'Além do Jianghu', legacy: 1.5, text: '{nome} deixou as disputas das escolas para trás e desapareceu pelas rotas do norte. Nenhum registro explica o que havia além delas.' },
  { id: 'demonio', name: 'O preço do poder', legacy: 0.7, text: 'O poder protegeu {nome} até o dia em que ninguém mais se aproximou. A última porta fechou por dentro.' },
  { id: 'desvio', name: 'Uma técnica interrompida', legacy: 0.7, text: 'O corpo de {nome} cedeu antes que a técnica estivesse pronta. Os cadernos que deixou ajudaram outros aprendizes a evitar o mesmo erro.' },
  { id: 'duelo', name: 'Morto em duelo', legacy: 0.9, text: '{nome} perdeu o duelo segundo as regras que aceitou. O vencedor cumpriu a palavra e levou o corpo até a margem da estrada.' },
  { id: 'exilio', name: 'Exílio', legacy: 1, text: '{nome} partiu sem o direito de voltar. Em outra província, recomeçou sem títulos e sem precisar pedir licença.' },
  { id: 'murim_justica', name: 'A sentença de Hwayang', legacy: 1.8, text: 'A investigação pública revelou quem lucrou com as expulsões. {nome} deixou um arquivo verificável para que ninguém tivesse de depender de uma única testemunha.' },
  { id: 'murim_tregua', name: 'Uma trégua frágil', legacy: 1.2, text: 'A violência cessou antes de a verdade aparecer. {nome} soube que uma trégua ainda deixa espaço para quem quiser continuar perguntando.' },
  { id: 'murim_duelo', name: 'O duelo que mudou o conselho', legacy: 1.5, text: 'O duelo não resolveu tudo, mas obrigou o conselho a ouvir as famílias que antes mantinha do lado de fora.' },
  { id: 'murim_acordo', name: 'A paz comprada', legacy: 0.9, text: 'O acordo manteve as escolas abertas e as aldeias em casa. Alguns chamaram isso de prudência; outros, de silêncio caro.' },
  { id: 'murim_escola', name: 'Uma escola de portas abertas', legacy: 1.8, text: '{nome} deixou um salão cheio de alunos que discordavam entre si e ainda assim treinavam juntos.' },
  { id: 'murim_guardiao', name: 'Guardião das estradas', legacy: 1.6, text: 'As lanternas das aldeias acendiam quando {nome} passava. Não havia título para aquele trabalho, mas ninguém precisou perguntar seu nome.' },
  { id: 'murim_mestre', name: 'Mestre de muitas escolas', legacy: 2, text: 'As técnicas de {nome} foram copiadas, discutidas e modificadas. O legado sobreviveu porque ninguém precisou guardá-lo sozinho.' },
  { id: 'murim_heranca', name: 'A casa cheia', legacy: 1.4, text: 'A mesa de {nome} ficou cheia até a última noite. Cada pessoa presente lembrava uma vida diferente e todas eram verdadeiras.' },
];
export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_despertar', name: 'Primeira Escola', desc: 'Entre numa escola marcial e alcance a faixa de aprendiz.', reward: '+3 pontos de Legado' },
  { id: 'ach_fundacao', name: 'Discípulo Reconhecido', desc: 'Conquiste o respeito de uma escola como discípulo.', reward: 'Talento: Vontade firme' },
  { id: 'ach_nucleo', name: 'Nome no Jianghu', desc: 'Alcance a faixa de veterano.', reward: 'Origem: Sobrevivente sem lembrança' },
  { id: 'ach_alquimista', name: 'Médico de Estrada', desc: 'Avance no Ofício dos Cem Remédios.', reward: 'Origem: Neto de uma médica de estrada' },
  { id: 'ach_demonio', name: 'Olhos na Sombra', desc: 'Aprenda os métodos da Casa da Lua Oca.', reward: 'Origem: Criado entre escolas clandestinas' },
  { id: 'ach_mortal', name: 'Vida Fora dos Portões', desc: 'Encerre uma vida sem entrar numa escola marcial.', reward: 'Origem: Mensageiro sem morada' },
  { id: 'ach_ascensao', name: 'Lenda do Jianghu', desc: 'Alcance o mais alto reconhecimento marcial.', reward: 'Talento: Leitura de postura' },
  { id: 'ach_centenario', name: 'Memória Longa', desc: 'Viva mais de cem anos.', reward: 'Talento: Saúde duradoura' },
  { id: 'ach_fundador', name: 'Portas Abertas', desc: 'Reconstrua uma escola e forme novos discípulos.', reward: 'Origem: Descendente de uma casa deposta' },
  { id: 'ach_eremita', name: 'Vigia das Estradas', desc: 'Dedique sua vida a proteger viajantes e aldeias.', reward: 'Origem: Discípulo de uma mestra retirada' },
  { id: 'ach_sacrificio', name: 'A Sentença de Hwayang', desc: 'Leve provas e testemunhas ao conselho.', reward: 'Talento: Voz que reúne' },
  { id: 'ach_vazio', name: 'Rota da Casa de Chá', desc: 'Descubra a rede que opera sob a Lua Oca.', reward: 'Talento: Passo silencioso' },
  { id: 'ach_reencarnacao', name: 'Método Compartilhado', desc: 'Deixe uma técnica acessível a várias escolas.', reward: 'Talento: Força incomum' },
];
/** Condição de cada conquista. `ending` só existe ao morrer. */
export const ACH_CHECKS: Record<string, (s: State, ending?: string) => boolean> = {
  ach_despertar: (s) => s.tier >= 1,
  ach_fundacao: (s) => s.tier >= 2,
  ach_nucleo: (s) => s.tier >= 3,
  ach_alquimista: (s) => s.path === 'alquimia' && s.tier >= 2,
  ach_demonio: (s) => s.path === 'demoniaca',
  ach_mortal: (_s, e) => e === 'mortal',
  ach_ascensao: (_s, e) => e === 'ascensao',
  ach_centenario: (s) => s.age >= 100,
  ach_fundador: (s) => s.flags.includes('fundou_escola'),
  ach_sacrificio: (_s, e) => e === 'murim_justica',
  ach_eremita: (s) => s.flags.includes('guardiao_estradas'),
  ach_vazio: (s) => s.flags.includes('casa_cha'),
  ach_reencarnacao: (s) => s.flags.includes('tecnica_aberta'),
};

/** Pontos de Legado recebidos ao liberar cada conquista da campanha atual. */
export const ACH_POINTS: Record<string, number> = {
  ach_despertar: 3, ach_fundacao: 4, ach_nucleo: 5, ach_alquimista: 4, ach_demonio: 4,
  ach_mortal: 2, ach_ascensao: 8, ach_centenario: 4, ach_fundador: 8,
  ach_eremita: 6, ach_sacrificio: 6, ach_vazio: 5, ach_reencarnacao: 6,
};

/** Aprimoramentos permanentes compráveis com pontos de Legado. */
export const UPGRADES = [
  { id: 'corpo', name: 'Treino de força', desc: '+1 Físico inicial por nível', max: 5, cost: 14 },
  { id: 'mente', name: 'Estudo de técnicas', desc: '+1 Técnica inicial por nível', max: 5, cost: 14 },
  { id: 'destino', name: 'Instinto de estrada', desc: '+1 Instinto inicial por nível', max: 5, cost: 20 },
  { id: 'ritmo', name: 'Rotina disciplinada', desc: '+2% de progresso de treino por nível', max: 6, cost: 18 },
  { id: 'bolso', name: 'Economias de família', desc: '+10 moedas iniciais por nível', max: 10, cost: 8 },
  { id: 'sorteio', name: 'Mais opções de origem', desc: '+1 novo sorteio na criação por nível', max: 3, cost: 80 },
  { id: 'memoria', name: 'Caderno de viagem', desc: '+0,8% de chance em todos os testes por nível', max: 4, cost: 90 },
] as const;

/** Preço do próximo nível: cresce com o nível atual. */
export const upgradePrice = (cost: number, level: number) => Math.round(cost * Math.pow(level + 1, 1.5));
