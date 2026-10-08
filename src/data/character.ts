import type { Origin, Talent, Flaw } from '../types';

/** Passados de personagens para a nova crônica das escolas do Jianghu. */
export const ORIGINS: Origin[] = [
  { id: 'campones', name: 'Filho de uma família de barqueiros', desc: 'Cresceu entre correntezas, carga pesada e gente de toda a província.', stats: { fis: 2, dao: 1 }, pedras: 0, place: 'vilarejo', faction: 'nenhuma' },
  { id: 'orfao_seita', name: 'Aprendiz acolhido por uma escola', desc: 'Aprendeu cedo a varrer o pátio antes de tocar numa espada.', stats: { dao: 2, car: -1 }, pedras: 2, place: 'seita', faction: 'seita' },
  { id: 'cla_decadente', name: 'Herdeiro de uma escola em ruínas', desc: 'Um nome respeitado, um salão vazio e dívidas deixadas por gerações.', stats: { comp: 2, car: 1 }, pedras: 10, place: 'cidade', faction: 'cla' },
  { id: 'mercador', name: 'Filho de comerciantes itinerantes', desc: 'Aprendeu a negociar passagem antes de aprender a lutar.', stats: { car: 3, sor: 1 }, pedras: 25, place: 'cidade', faction: 'nenhuma' },
  { id: 'cacador', name: 'Caçador das colinas', desc: 'Conhece rastros, atalhos e o momento de não seguir uma presa.', stats: { fis: 2, esp: 1 }, pedras: 3, place: 'montanha', faction: 'nenhuma' },
  { id: 'herdeiro_alquimista', name: 'Neto de uma médica de estrada', desc: 'Receitas de cura e cadernos de dívidas vieram no mesmo baú.', stats: { comp: 3, esp: 1 }, pedras: 15, place: 'cidade', faction: 'nenhuma', unlock: 'ach_alquimista', flags: ['avo_alquimista'] },
  { id: 'alma_reencarnada', name: 'Sobrevivente sem lembrança', desc: 'Uma infância interrompida deixou reflexos que você não sabe explicar.', stats: { comp: 3, dao: 3, car: -2 }, pedras: 0, place: 'vilarejo', faction: 'nenhuma', unlock: 'ach_nucleo', flags: ['reencarnado'] },
  { id: 'filho_demonio', name: 'Criado entre escolas clandestinas', desc: 'Aprendeu nomes falsos, saídas discretas e a nunca dormir de costas para a porta.', stats: { fis: 2, esp: 2, car: -2 }, pedras: 5, place: 'seita', faction: 'demoniaca', unlock: 'ach_demonio', flags: ['sangue_demoniaco'] },
  { id: 'mendigo_iluminado', name: 'Mensageiro sem morada', desc: 'Estradas e estalagens ensinaram mais do que qualquer salão.', stats: { dao: 4, sor: 2, fis: -1 }, pedras: 0, place: 'cidade', faction: 'errante', unlock: 'ach_mortal' },
  { id: 'principe_decaido', name: 'Descendente de uma casa deposta', desc: 'Perdeu posição e terras; conservou a memória dos nomes que o fizeram cair.', stats: { car: 3, comp: 1 }, pedras: 30, place: 'cidade', faction: 'cla', unlock: 'ach_fundador' },
  { id: 'discipulo_eremita', name: 'Discípulo de uma mestra retirada', desc: 'Treinou longe das cidades, sem saber quem ocupava os salões do poder.', stats: { dao: 3, comp: 2 }, pedras: 0, place: 'montanha', faction: 'errante', unlock: 'ach_eremita' },
  { id: 'pescador_mares', name: 'Filho de pescadores', desc: 'Vento, maré e corda molhada formaram suas primeiras lições.', stats: { fis: 2, sor: 2 }, pedras: 4, place: 'vilarejo', faction: 'nenhuma' },
  { id: 'filho_guarda', name: 'Filho de um guarda de estrada', desc: 'Disciplina, turnos longos e uma lança que já passou por três gerações.', stats: { fis: 2, dao: 1, car: 1 }, pedras: 6, place: 'cidade', faction: 'nenhuma' },
  { id: 'regressor', name: 'Pessoa que escapou de um massacre', desc: 'A memória do que aconteceu volta em fragmentos quando o perigo se aproxima.', stats: { comp: 2, dao: 2, sor: 1, car: -2 }, pedras: 0, place: 'vilarejo', faction: 'nenhuma', unlock: 'ach_ascensao', flags: ['regressor'] },
];

export const TALENTS: Talent[] = [
  { id: 'memoria_perfeita', name: 'Memória de escriba', desc: 'Recorda nomes, rotas e cada linha de um manual.', stats: { comp: 4 } },
  { id: 'sorte_destino', name: 'Instinto oportuno', desc: 'Costuma estar no lugar certo antes de saber por quê.', stats: { sor: 5 } },
  { id: 'alma_antiga', name: 'Olho experiente', desc: 'Reconhece intenção nos gestos mais discretos.', stats: { esp: 4, dao: 1 } },
  { id: 'corpo_resistente', name: 'Constituição vigorosa', desc: 'Recupera o fôlego e suporta treinos longos.', stats: { fis: 4 }, lifeMult: 1.05 },
  { id: 'carisma_nato', name: 'Presença acolhedora', desc: 'As pessoas contam mais do que pretendiam.', stats: { car: 5 } },
  { id: 'mestre_nato', name: 'Aprendiz disciplinado', desc: 'Transforma repetição em técnica com rapidez.', xpMult: 1.15 },
  { id: 'coracao_inabalavel', name: 'Vontade firme', desc: 'Não abandona uma decisão só porque ficou difícil.', stats: { dao: 5 }, unlock: 'ach_fundacao' },
  { id: 'olhar_dao', name: 'Leitura de postura', desc: 'Enxerga o peso e a intenção por trás de cada movimento.', stats: { sor: 3, comp: 3 }, xpMult: 1.05, unlock: 'ach_ascensao' },
  { id: 'vida_longa', name: 'Saúde duradoura', desc: 'Cuida do corpo e raramente adoece.', lifeMult: 1.12, unlock: 'ach_centenario' },
  { id: 'predestinado', name: 'Voz que reúne', desc: 'Consegue dar coragem a pessoas que já desistiram.', stats: { sor: 4, dao: 3 }, unlock: 'ach_sacrificio' },
  { id: 'passo_vazio', name: 'Passo silencioso', desc: 'Move-se sem chamar atenção e percebe quem o segue.', stats: { sor: 2, esp: 3 }, xpMult: 1.05, unlock: 'ach_vazio' },
  { id: 'sangue_dragao', name: 'Força incomum', desc: 'Um corpo naturalmente forte chama atenção nos treinos.', stats: { fis: 3, esp: 3 }, xpMult: 1.06, unlock: 'ach_reencarnacao' },
  { id: 'aprendiz_veloz', name: 'Aprendiz rápido', desc: 'Assimila fundamentos antes que a aula termine.', stats: { comp: 2 }, xpMult: 1.08 },
  { id: 'olfato_tesouro', name: 'Faro para negócios', desc: 'Percebe oportunidades e riscos nas trocas.', stats: { sor: 3, car: 1 } },
];

export const FLAWS: Flaw[] = [
  { id: 'meridianos_estreitos', name: 'Fôlego curto', desc: 'Treinos prolongados cobram um preço maior.', xpMult: 0.88 },
  { id: 'azar', name: 'Mau timing', desc: 'As coisas tendem a dar errado no pior momento.', stats: { sor: -4 } },
  { id: 'qi_instavel', name: 'Técnica irregular', desc: 'O domínio dos fundamentos ainda oscila.', breakMod: -0.06 },
  { id: 'covarde', name: 'Hesitação sob pressão', desc: 'O perigo às vezes chega antes da coragem.', stats: { dao: -3 } },
  { id: 'doente', name: 'Saúde delicada', desc: 'O frio e a exaustão o afetam com facilidade.', stats: { fis: -3 }, lifeMult: 0.92 },
  { id: 'orgulhoso', name: 'Rancor persistente', desc: 'Uma ofensa antiga pode guiar suas decisões.', stats: { car: -3, dao: 1 } },
  { id: 'distraido', name: 'Atenção dispersa', desc: 'Estudar e manter a guarda ao mesmo tempo é difícil.', stats: { comp: -2, esp: -1 } },
  { id: 'impulsivo', name: 'Impulsividade', desc: 'Age antes de descobrir todos os riscos.', stats: { dao: -2, fis: 1 }, breakMod: -0.03 },
  { id: 'avarento', name: 'Apego ao dinheiro', desc: 'É difícil abrir mão de uma moeda, mesmo quando convém.', stats: { car: -2, sor: 1 } },
];
