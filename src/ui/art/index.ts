import type { Item, Technique } from '../../types';
import { estiloAtual, type Estilo, type Pacote } from './estilo';
import { itemIcon as itemBase, techIcon as techBase, pathIcon as pathBase, realmIcon as realmBase } from './icons';
import { sceneSvg as sceneBase, endingCard as endingBase } from './scenes';
import { portraitSvg as portraitBase, type Look } from './portrait';
import { foeFighter as foeBase, playerFighter as playerBase } from './lutadores';
import { pacote as pixel } from './pixel';
import { pacote as manhwa } from './manhwa';
import { pacote as tinta } from './tinta';
import { pacote as pintura } from './pintura';

export { estiloAtual, definirEstilo, aoMudarEstilo, ESTILOS, estiloValido, type Estilo } from './estilo';
export { lookFromState, lookForNpc, type Look, type Role } from './portrait';
export type { SceneKind } from './scenes';
export { pathColor } from './lutadores';
export { hash } from './core';
export { efeitoUrl } from './pintura';

/** Arte "clássica" (a original do jogo): serve de reserva para o que um estilo ainda não desenha. */
const CLASSICO: Pacote = {
  item: itemBase, tech: techBase, path: pathBase, realm: realmBase, portrait: portraitBase,
  scene: sceneBase, ending: endingBase, player: playerBase, foe: foeBase,
};

const PACOTES: Record<string, Partial<Pacote>> = {
  pixel,
  manhwa,
  tinta,
  pintura,
};

const usar = <K extends keyof Pacote>(k: K): Pacote[K] => {
  const pack = PACOTES[estiloAtual()] ?? pixel;
  return (pack[k] ?? CLASSICO[k]) as Pacote[K];
};

export const itemIcon = (it: Item, size = 56) => usar('item')(it, size);
export const techIcon = (t: Technique, size = 52) => usar('tech')(t, size);
export const pathIcon = (id: string, size = 56) => usar('path')(id, size);
export const realmIcon = (ladder: string, tier: number, size = 56) => usar('realm')(ladder, tier, size);
export const portraitSvg = (look: Look, size = 96) => usar('portrait')(look, size);
export const sceneSvg = (kind: string, seed = 'x', night = false) => usar('scene')(kind, seed, night);
export const endingCard = (id: string, title: string) => usar('ending')(id, title);
export const playerFighter = (path: string, tier: number, look?: Look) => usar('player')(path, tier, look);
export const foeFighter = (id: string, look?: Look, semente?: string) => usar('foe')(id, look, semente);

/** Amostra de um estilo (retrato, item e cenário) sem trocar o estilo ativo: serve ao seletor das opções. */
export function amostraDe(e: Estilo, look: Look, item: Item) {
  const p = PACOTES[e] ?? CLASSICO;
  return {
    retrato: (p.portrait ?? CLASSICO.portrait)(look, 54),
    item: (p.item ?? CLASSICO.item)(item, 40),
    cenario: (p.scene ?? CLASSICO.scene)('montanha', 'amostra', false),
  };
}
