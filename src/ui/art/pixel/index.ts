import type { Pacote } from '../estilo';
import * as icones from './icones';
import { retrato } from './retrato';
import { cenario, final } from './cenarios';
import { jogador, inimigo } from './lutadores';
import * as p2 from '../pixel2';

/** Pixel 16-bit: peças da nova geração (pixel2) quando existem, e a geração anterior para o resto. */
export const pacote: Partial<Pacote> = {
  item: (it, size) => p2.item(it, size) ?? icones.item(it, size),
  tech: icones.tech, path: icones.path, realm: icones.realm,
  portrait: (look, size) => p2.retrato(look, size),
  scene: (kind, seed, noite) => p2.cenario(kind, seed, noite) ?? cenario(kind, seed, noite),
  ending: final,
  player: (path, tier) => p2.jogador(path, tier),
  foe: (id) => p2.inimigo(id) ?? inimigo(id),
};
