import { Pix, PAL, circulo, capsula, poligono, elipse } from './pix';

/**
 * Lutadores 48x64 em pixel art com quadros de animação: parado (2), ataque (3), técnica (3), dano, vitória, derrota.
 * Um esqueleto simples (quadril, ombro, cotovelos, joelhos, arma) é calculado por ângulos e desenhado com a mesma
 * técnica das peças estáticas (formas sombreadas, contorno seletivo, paleta fixa).
 */
export const LARG_LUT = 48;
export const ALT_LUT = 64;

export interface TraçoLutador {
  robe: keyof typeof PAL;
  calca: keyof typeof PAL;
  pele: string[];
  cabelo: string[];
  arma: 'espada' | 'punho' | 'cajado' | 'nenhuma';
  /** Cor da faixa/detalhe. */
  detalhe: keyof typeof PAL;
  demoniaco?: boolean;
}

export interface Pose {
  /** Deslocamento do quadril. */
  hx: number; hy: number;
  /** Inclinação do tronco (graus, + = para a frente). */
  tronco: number;
  /** Inclinação da cabeça. */
  cab: number;
  /** Ombro e cotovelo do braço da frente e do braço de trás (graus; 0 = pendurado, 90 = para a frente, 180 = para cima). */
  bf: [number, number]; bt: [number, number];
  /** Quadril e joelho das pernas (graus relativos à vertical). */
  pf: [number, number]; pt: [number, number];
  /** Ângulo da arma em relação ao antebraço da frente (graus). */
  arma: number;
  olhosFechados?: boolean;
  boca?: 'normal' | 'grito' | 'dor';
  /** Aura/brilho (0 a 1). */
  brilho?: number;
  /** Tinta vermelha (dano). */
  flash?: boolean;
  deitado?: boolean;
}

const rad = (g: number) => (g * Math.PI) / 180;
const pol = (x: number, y: number, ang: number, len: number): [number, number] => [x + Math.sin(rad(ang)) * len, y + Math.cos(rad(ang)) * len];

export function lutador(t: TraçoLutador, po: Pose): Pix {
  const p = new Pix(LARG_LUT, ALT_LUT);
  const chao = 61;
  const cx = 22 + po.hx, hy = 38 + po.hy;
  const robe = PAL[t.robe], calca = PAL[t.calca], det = PAL[t.detalhe];

  if (po.deitado) return deitado(t, po);

  // sombra no chão
  for (let x = cx - 10; x <= cx +