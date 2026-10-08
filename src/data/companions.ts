import type { Companion } from '../types';

export const COMPANIONS: Companion[] = [
  { id: 'lin_yue', name: 'Jang Hwa-ryeon, testemunha', description: 'Conhece as famílias expulsas e não esquece um nome.', bonus: { car: 2, comp: 1 }, price: 35 },
  { id: 'shen_ming', name: 'Baek Mu-jin, viajante', description: 'Lê movimentos de combate e reconhece brasões de escolas.', bonus: { fis: 1, esp: 2 }, price: 40 },
  { id: 'mei_lan', name: 'Noh Gye-sang, comerciante', description: 'Mantém contatos nas estradas e consegue negociar suprimentos.', bonus: { car: 2, sor: 1 }, price: 45 },
];
