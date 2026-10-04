import type { GameEvent } from '../../types';
import { infancia } from './infancia';
import { seita } from './seita';
import { aventura } from './aventura';
import { cidade } from './cidade';
import { cultivo } from './cultivo';
import { lenda } from './lenda';
import { trilhas } from './trilhas';
import { mundo } from './mundo';
import { alto } from './alto';
import { juventude } from './juventude';
import { lote1Seita } from './lote1_seita';
import { lote2Reinos } from './lote2_reinos';
import { lote3Alquimia } from './lote3_alquimia';
import { lote4Mundo } from './lote4_mundo';
import { lote5Sangue } from './lote5_sangue';
import { lote6Oeste } from './lote6_oeste';
import { lote7Ceu } from './lote7_ceu';
import { trilhaInicial } from './trilha_inicial';
import { lote8Juventude } from './lote8_juventude';
import { lote9Trilhas } from './lote9_trilhas';
import { lote10Regioes } from './lote10_regioes';
import { lote11Ecos } from './lote11_ecos';
import { lote12Torneio } from './lote12_torneio';
import { lote13Mundo } from './lote13_mundo';
import { lote14Poder } from './lote14_poder';
import { lote15Reinos34 } from './lote15_reinos_3_4';
import { lote16Reinos56 } from './lote16_reinos_5_6';
import { lote17Reinos78 } from './lote17_reinos_7_8';
import { lote18Reinos12 } from './lote18_reinos_1_2';
import { lote19TrilhasPoder } from './lote19_trilhas_poder';
import { lote20Tribulacao } from './lote20_tribulacao';
import { lote21OrigensA } from './lote21_origens_a';
import { lote22OrigensB } from './lote22_origens_b';
import { lote23Npcs } from './lote23_npcs';
import { lote24Jianghu } from './lote24_jianghu';
import { lote25Mitologia } from './lote25_mitologia';
import { TETOS } from '../faixas';
import { lote26Talentos, moldesTalentos } from './lote26_talentos';
import { lote27Defeitos, moldesDefeitos } from './lote27_defeitos';
import { lote28Origens, moldesOrigens } from './lote28_origens';
import { lote29CorpoRaiz, moldesCorpoRaiz } from './lote29_corpo_raiz';
import { moldesTrilhas } from './lote30_trilhas_molde';
import { lote31Tecnicas } from './lote31_tecnicas';
import { moldesDeTecnicas } from '../moldes_tecnicas';
import { aplicarMoldes, type Molde } from '../opcoes';
import { VARIANTES } from '../variantes';
import { marcarEscolhas, registrarSoPerfil } from '../marcas';

const TODOS: GameEvent[] = [
  ...infancia, ...seita, ...aventura, ...cidade, ...cultivo, ...lenda,
  ...trilhas, ...mundo, ...alto, ...juventude,
  ...lote1Seita, ...lote2Reinos, ...lote3Alquimia, ...lote4Mundo, ...lote5Sangue, ...lote6Oeste, ...lote7Ceu, ...trilhaInicial,
  ...lote8Juventude, ...lote9Trilhas, ...lote10Regioes, ...lote11Ecos, ...lote12Torneio, ...lote13Mundo,
  ...lote14Poder, ...lote15Reinos34, ...lote16Reinos56, ...lote17Reinos78, ...lote18Reinos12, ...lote19TrilhasPoder, ...lote20Tribulacao, ...lote21OrigensA, ...lote22OrigensB, ...lote23Npcs, ...lote24Jianghu, ...lote25Mitologia, ...lote26Talentos, ...lote27Defeitos, ...lote28Origens, ...lote29CorpoRaiz, ...lote31Tecnicas,
];

/** Aplica os tetos de reino de src/data/faixas.ts. */
const COM_TETOS: GameEvent[] = TODOS.map((e0) => {
  let e = e0;
  if (TETOS[e.id] !== undefined) e = { ...e, cond: { ...e.cond, tierMax: Math.min(e.cond?.tierMax ?? 8, TETOS[e.id]) } };
  if (VARIANTES[e.id]) e = { ...e, alt: [...(e.alt ?? []), ...VARIANTES[e.id]] };
  return e;
});

/** Toda escolha deixa marca: as que não têm efeito próprio ganham o perfil de conduta (src/data/marcas.ts). */
const MOLDES: Molde[] = [...moldesTalentos, ...moldesDefeitos, ...moldesOrigens, ...moldesCorpoRaiz, ...moldesTrilhas, ...moldesDeTecnicas()];
/** Cenas de passagem de tempo: sem consequência própria por desenho. */
const PASSAGEM = new Set(['dia_comum', 'tarefas_da_casa', 'pesca_lago', 'aurora_norte', 'doenca_infantil', 'rotina_mortal']);
export const EVENTS: GameEvent[] = registrarSoPerfil(marcarEscolhas(aplicarMoldes(COM_TETOS, MOLDES)).map((e) => (PASSAGEM.has(e.id) ? { ...e, passagem: true } : e)));
