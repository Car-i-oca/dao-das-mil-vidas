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

export const EVENTS: GameEvent[] = [
  ...infancia, ...seita, ...aventura, ...cidade, ...cultivo, ...lenda,
  ...trilhas, ...mundo, ...alto, ...juventude,
  ...lote1Seita, ...lote2Reinos, ...lote3Alquimia, ...lote4Mundo, ...lote5Sangue, ...lote6Oeste, ...lote7Ceu, ...trilhaInicial,
  ...lote8Juventude, ...lote9Trilhas, ...lote10Regioes, ...lote11Ecos, ...lote12Torneio,
];
