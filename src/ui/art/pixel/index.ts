import type { Pacote } from '../estilo';
import * as icones from './icones';
import { retrato } from './retrato';
import { cenario, final } from './cenarios';
import { jogador, inimigo } from './lutadores';

export const pacote: Partial<Pacote> = {
  item: icones.item, path: icones.path, realm: icones.realm, portrait: retrato, scene: cenario, ending: final, player: jogador, foe: inimigo,
};
