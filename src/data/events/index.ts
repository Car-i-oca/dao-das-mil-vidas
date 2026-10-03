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

export const EVENTS: GameEvent[] = [
  ...infancia, ...seita, ...aventura, ...cidade, ...cultivo, ...lenda,
  ...trilhas, ...mundo, ...alto, ...juventude,
];
