import type { Pacote } from '../estilo';
import * as icones from './icones';
import { retrato } from './retrato';
import { cenario, final } from './cenarios';
import { jogador, inimigo } from './lutadores';
import * as pp from '../pintura';

/** Pixel 16-bit: peças da nova geração (pixel2) quando existem, e a geração anterior para o resto. */
export const pacote: Partial<Pacote> = {
  item: (it, size) => pp.itemSvg(it, size) ?? icones.item(it, size),
  tech: icones.tech, path: icones.path, realm: icones.realm,
  portrait: (look, size) => pp.retratoSvg(look, size),
  scene: (kind, seed, noite) => pp.cenarioSvg(kind, seed, noite) ?? cenario(kind, seed, noite),
  ending: final,
  player: (path) => pp.jogadorSvg(path),
  foe: (id) => pp.inimigoSvg(id) ?? inimigo(id),
};
