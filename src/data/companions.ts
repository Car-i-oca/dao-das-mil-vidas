import type { Companion } from '../types';

export const COMPANIONS: Companion[] = [
  { id: 'lin_yue', name: 'Lin Yue, espadachim errante', description: 'Lê os movimentos do inimigo antes do primeiro golpe.', bonus: { fis: 2, esp: 1 }, price: 35 },
  { id: 'shen_ming', name: 'Shen Ming, boticário', description: 'Conhece o valor de cada erva e mantém a calma.', bonus: { comp: 2, dao: 1 }, price: 40 },
  { id: 'mei_lan', name: 'Mei Lan, mercadora', description: 'Sua presença abre portas e melhora as negociações.', bonus: { car: 2, sor: 1 }, price: 45 },
];
