import type { Item, Technique } from '../../types';
import type { Look } from './portrait';

/** Os três estilos de arte do jogo. O padrão é o manhwa. */
export type Estilo = 'pixel' | 'manhwa' | 'tinta';

export const ESTILOS: { id: Estilo; nome: string; desc: string }[] = [
  { id: 'manhwa', nome: 'Manhwa', desc: 'Visual de web novel: cores vivas, brilhos, contornos firmes e muita luz.' },
  { id: 'tinta', nome: 'Tinta', desc: 'Pintura chinesa a tinta: poucos traços, muito papel em branco e um selo vermelho.' },
  { id: 'pixel', nome: 'Pixel 16-bit', desc: 'RPG de 16 bits: sprites, sombreamento por faixas e cenários em camadas.' },
];

let atual: Estilo = 'manhwa';
const ouvintes: (() => void)[] = [];

export const estiloAtual = (): Estilo => atual;
export const estiloValido = (x: unknown): x is Estilo => x === 'pixel' || x === 'manhwa' || x === 'tinta';

export function definirEstilo(e: Estilo) {
  atual = e;
  if (typeof document !== 'undefined') document.documentElement.setAttribute('data-estilo', e);
  ouvintes.forEach((f) => f());
}
export function aoMudarEstilo(f: () => void) { ouvintes.push(f); }

/** Contrato de cada estilo. `player` e `foe` devolvem o miolo de um <svg viewBox="0 0 120 140">. */
export interface Pacote {
  item(it: Item, size: number): string;
  tech(t: Technique, size: number): string;
  path(id: string, size: number): string;
  realm(ladder: string, tier: number, size: number): string;
  portrait(look: Look, size: number): string;
  scene(kind: string, seed: string, night: boolean): string;
  ending(id: string, title: string): string;
  player(path: string, tier: number): string;
  foe(id: string): string;
}
