import { paraPng } from './base';
import { camadasDe, LARG, ALT } from './cenarios';

const PIX = 'image-rendering:pixelated;image-rendering:crisp-edges';
const urls = new Map<string, string>();
const url = (k: string, p: Parameters<typeof paraPng>[0]) => { let u = urls.get(k); if (!u) { u = paraPng(p); urls.set(k, u); } return u; };

/** Cenário pintado: camadas empilhadas num <svg>; as nuvens deslizam e a água e as lanternas pulsam. */
export function cenarioSvg(kind: string, seed: string, noite: boolean): string | null {
  const r = camadasDe(kind, seed, noite);
  if (!r) return null;
  const { k, c } = r;
  const img = (n: string, p: Parameters<typeof paraPng>[0], w = LARG, h = ALT, y = 0) => `<image href="${url(`${k}|${n}`, p)}" x="0" y="${y}" width="${w}" height="${h}" style="${PIX}"/>`;
  const nuv = `<g>${img('nuvens', c.nuvens, 640, 80, 4)}<animateTransform attributeName="transform" type="translate" values="0 0;-60 0;0 0" dur="70s" repeatCount="indefinite"/></g>`;
  const luz = `<g>${img('brilhos', c.brilhos)}<animate attributeName="opacity" values="1;.55;1;.8;1" dur="2.6s" repeatCount="indefinite"/></g>`;
  return `<svg class="art art-scene" viewBox="0 0 ${LARG} ${ALT}" role="img" aria-label="${kind}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${img('ceu', c.ceu)}${nuv}${img('terra', c.terra)}${luz}</svg>`;
}

import type { Item } from '../../../types';
import type { Look } from '../portrait';
import { generoDoNome } from '../../../data/names';
import { FOE_CREATURES } from '../lutadores';
import { PAL } from './paleta';
import { retratoUrl, type OlharP } from './retrato';
import { itemUrl } from './itens';
import { quadroUrl, QUADROS, TRACO_JOGADOR_P, type TracoL } from './lutadores';

export function itemSvg(it: Item, size: number): string | null {
  const id = it.kind === 'pilula' ? 'pilula' : it.kind === 'manual' ? 'manual' : it.kind === 'talisma' ? 'talisma' : it.kind === 'anel' ? 'jade' : it.kind === 'misc' ? 'bolsa' : it.kind === 'artefato' && /espada|l[aâ]mina|sabre|adaga/i.test(it.name) ? 'espada' : null;
  const u = id && itemUrl(id);
  if (!u) return null;
  return `<svg class="art art-item" viewBox="0 0 48 48" width="${size}" height="${size}" role="img" aria-label="${it.name.replace(/"/g, '')}" xmlns="http://www.w3.org/2000/svg"><image href="${u}" width="48" height="48" style="${PIX}"/></svg>`;
}
export function retratoSvg(look: Look, size: number): string {
  const o: OlharP = { seed: look.seed, role: look.role, stage: look.stage, path: look.path, tier: look.tier, corr: look.corr, genero: generoDoNome(look.seed) };
  return `<svg class="art art-portrait" viewBox="0 0 96 96" width="${size}" height="${size}" role="img" aria-label="${look.role}" xmlns="http://www.w3.org/2000/svg"><image href="${retratoUrl(o)}" width="96" height="96" style="${PIX}"/></svg>`;
}

const CAMINHO: Record<string, Partial<TracoL>> = {
  sopro: { robe: 'azul', detalhe: 'branco', arma: 'nenhuma' }, espada: { robe: 'cinza', detalhe: 'azul', arma: 'espada' }, alquimia: { robe: 'ocre', detalhe: 'vermelho', arma: 'nenhuma' }, corpo: { robe: 'vermelho', detalhe: 'marrom', arma: 'punho' },
  alma: { robe: 'roxo', detalhe: 'branco', arma: 'cajado' }, formacoes: { robe: 'panoVerde', detalhe: 'ouro', arma: 'cajado' }, budista: { robe: 'ocre', detalhe: 'vermelho', arma: 'cajado' }, venenos: { robe: 'folha', detalhe: 'jade', arma: 'nenhuma' },
  bestas: { robe: 'marrom', detalhe: 'branco', arma: 'nenhuma' }, demoniaca: { robe: 'vermelho', detalhe: 'tinta', arma: 'nenhuma', demoniaco: true },
};
const INIMIGOS: Record<string, TracoL> = {
  bandido: { robe: 'marrom', calca: 'cabeloEscuro', pele: PAL.peleEscura, cabelo: PAL.cabeloEscuro, arma: 'espada', detalhe: 'vermelho' },
  assassino: { robe: 'noite', calca: 'cabeloEscuro', pele: PAL.pele, cabelo: PAL.cabeloEscuro, arma: 'espada', detalhe: 'roxo' },
  cultivador: { robe: 'vermelho', calca: 'cinza', pele: PAL.pele, cabelo: PAL.cabelo, arma: 'espada', detalhe: 'ouro' },
  monge: { robe: 'ocre', calca: 'marrom', pele: PAL.peleEscura, cabelo: PAL.cabeloEscuro, arma: 'cajado', detalhe: 'vermelho' },
  demonio: { robe: 'noite', calca: 'cabeloEscuro', pele: PAL.pele, cabelo: PAL.cabeloBranco, arma: 'nenhuma', detalhe: 'vermelho', demoniaco: true },
};
function folha(chave: string, t: TracoL): string {
  return QUADROS.map(([n, i]) => `<image data-q="${n}${i}" href="${quadroUrl(chave, t, n, i)}" x="12" y="6" width="96" height="128" style="${PIX}"${n === 'parado' && i === 0 ? '' : ' display="none"'}/>`).join('');
}
export function jogadorSvg(path: string): string {
  const t: TracoL = { ...TRACO_JOGADOR_P, ...(CAMINHO[path] ?? {}) } as TracoL;
  return `<g data-sprites="1">${folha('j|' + path, t)}</g>`;
}
export function inimigoSvg(id: string): string | null {
  if ((FOE_CREATURES as readonly string[]).includes(id)) return null;
  return `<g data-sprites="1">${folha('i|' + id, INIMIGOS[id] ?? INIMIGOS.cultivador)}</g>`;
}
