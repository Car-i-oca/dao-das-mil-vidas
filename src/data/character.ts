import type { Origin, Talent, Flaw } from '../types';

export const ORIGINS: Origin[] = [
  { id: 'campones', name: 'Filho de Camponeses', desc: 'Mãos calejadas e fome de mais.', stats: { fis: 2, dao: 1 }, pedras: 0, place: 'vilarejo', faction: 'nenhuma' },
  { id: 'orfao_seita', name: 'Órfão Acolhido pela Seita', desc: 'Criado como servo nos fundos de uma seita justa.', stats: { dao: 2, car: -1 }, pedras: 2, place: 'seita', faction: 'seita' },
  { id: 'cla_decadente', name: 'Herdeiro de um Clã Decadente', desc: 'Um nome antigo, um cofre vazio e dívidas de honra.', stats: { comp: 2, car: 1 }, pedras: 10, place: 'cidade', faction: 'cla' },
  { id: 'mercador', name: 'Filho de Mercadores', desc: 'Aprendeu a contar pedras antes de aprender a ler.', stats: { car: 3, sor: 1 }, pedras: 25, place: 'cidade', faction: 'nenhuma' },
  { id: 'cacador', name: 'Caçador das Montanhas', desc: 'Cresceu onde as feras espirituais rondam.', stats: { fis: 2, esp: 1 }, pedras: 3, place: 'montanha', faction: 'nenhuma' },
  { id: 'herdeiro_alquimista', name: 'Neto de Alquimista', desc: 'O avô deixou receitas e dívidas.', stats: { comp: 3, esp: 1 }, pedras: 15, place: 'cidade', faction: 'nenhuma', unlock: 'ach_alquimista', flags: ['avo_alquimista'] },
  { id: 'alma_reencarnada', name: 'Alma Reencarnada', desc: 'Memórias de uma vida passada despertam aos poucos.', stats: { comp: 3, dao: 3, car: -2 }, pedras: 0, place: 'vilarejo', faction: 'nenhuma', unlock: 'ach_nucleo', flags: ['reencarnado'] },
  { id: 'filho_demonio', name: 'Rebento da Seita Demoníaca', desc: 'Nasceu entre sombras e sussurros de sangue.', stats: { fis: 2, esp: 2, car: -2 }, pedras: 5, place: 'seita', faction: 'demoniaca', unlock: 'ach_demonio', flags: ['sangue_demoniaco'] },
  { id: 'mendigo_iluminado', name: 'Mendigo das Estradas', desc: 'Nada tem; por isso nada o prende.', stats: { dao: 4, sor: 2, fis: -1 }, pedras: 0, place: 'cidade', faction: 'errante', unlock: 'ach_mortal' },
  { id: 'principe_decaido', name: 'Príncipe(sa) Decaído(a)', desc: 'Perdeu o trono, manteve os modos.', stats: { car: 3, comp: 1 }, pedras: 30, place: 'cidade', faction: 'cla', unlock: 'ach_fundador' },
  { id: 'discipulo_eremita', name: 'Discípulo do Eremita', desc: 'Criado numa cabana de montanha, entre silêncios.', stats: { dao: 3, comp: 2 }, pedras: 0, place: 'montanha', faction: 'errante', unlock: 'ach_eremita' },
  { id: 'pescador_mares', name: 'Pescador dos Mares Sem Fim', desc: 'Seu pai viu uma serpente de mil anos e voltou calado.', stats: { fis: 2, sor: 2 }, pedras: 4, place: 'vilarejo', faction: 'nenhuma' },
  { id: 'filho_guarda', name: 'Filho de um Guarda do Reino', desc: 'Disciplina, cicatrizes e uma espada velha.', stats: { fis: 2, dao: 1, car: 1 }, pedras: 6, place: 'cidade', faction: 'nenhuma' },
];

export const TALENTS: Talent[] = [
  { id: 'memoria_perfeita', name: 'Memória Perfeita', desc: 'Nunca esquece uma linha de manual.', stats: { comp: 4 } },
  { id: 'sorte_destino', name: 'Favorecido pelo Destino', desc: 'O acaso sorri para você.', stats: { sor: 5 } },
  { id: 'alma_antiga', name: 'Alma Antiga', desc: 'Sua consciência é anormalmente densa.', stats: { esp: 4, dao: 1 } },
  { id: 'corpo_resistente', name: 'Corpo Resistente', desc: 'Ossos de quem já nasceu forjado.', stats: { fis: 4 }, lifeMult: 1.05 },
  { id: 'carisma_nato', name: 'Presença Magnética', desc: 'Pessoas confiam em você sem saber por quê.', stats: { car: 5 } },
  { id: 'mestre_nato', name: 'Gênio do Cultivo', desc: 'O Qi flui até quando você dorme.', xpMult: 1.15 },
  { id: 'coracao_inabalavel', name: 'Coração Inabalável', desc: 'Demônios interiores têm medo de você.', stats: { dao: 5 }, unlock: 'ach_fundacao' },
  { id: 'olhar_dao', name: 'Olhar do Dao', desc: 'Você enxerga fios de destino.', stats: { sor: 3, comp: 3 }, xpMult: 1.05, unlock: 'ach_ascensao' },
  { id: 'vida_longa', name: 'Longevidade Natural', desc: 'Seus anos custam a escorrer.', lifeMult: 1.12, unlock: 'ach_centenario' },
  { id: 'predestinado', name: 'Predestinado', desc: 'O Céu espera algo de você.', stats: { sor: 4, dao: 3 }, unlock: 'ach_sacrificio' },
  { id: 'passo_vazio', name: 'Passo do Vazio', desc: 'Você nunca se perde, mesmo no escuro.', stats: { sor: 2, esp: 3 }, xpMult: 1.05, unlock: 'ach_vazio' },
  { id: 'sangue_dragao', name: 'Sangue de Dragão', desc: 'Uma gota antiga corre em suas veias.', stats: { fis: 3, esp: 3 }, xpMult: 1.06, unlock: 'ach_reencarnacao' },
  { id: 'aprendiz_veloz', name: 'Aprendiz Veloz', desc: 'Aprende duas vezes mais rápido que o normal... às vezes.', stats: { comp: 2 }, xpMult: 1.08 },
  { id: 'olfato_tesouro', name: 'Faro para Tesouros', desc: 'Sempre acha moedas onde ninguém olhou.', stats: { sor: 3, car: 1 } },
];

export const FLAWS: Flaw[] = [
  { id: 'meridianos_estreitos', name: 'Meridianos Estreitos', desc: 'O Qi flui devagar e dói.', xpMult: 0.88 },
  { id: 'azar', name: 'Azar Persistente', desc: 'Se algo pode dar errado...', stats: { sor: -4 } },
  { id: 'qi_instavel', name: 'Qi Instável', desc: 'Mais propenso a desvios.', breakMod: -0.06 },
  { id: 'covarde', name: 'Coração Covarde', desc: 'Medo demais, coragem de menos.', stats: { dao: -3 } },
  { id: 'doente', name: 'Constituição Frágil', desc: 'Corpo que adoece fácil.', stats: { fis: -3 }, lifeMult: 0.92 },
  { id: 'orgulhoso', name: 'Orgulho Ferido', desc: 'Não esquece nem perdoa uma ofensa.', stats: { car: -3, dao: 1 } },
  { id: 'distraido', name: 'Mente Dispersa', desc: 'A meditação nunca dura o bastante.', stats: { comp: -2, esp: -1 } },
  { id: 'impulsivo', name: 'Sangue Quente', desc: 'Age primeiro, entende depois.', stats: { dao: -2, fis: 1 }, breakMod: -0.03 },
  { id: 'avarento', name: 'Mão Fechada', desc: 'Dinheiro vira obsessão.', stats: { car: -2, sor: 1 } },
];
