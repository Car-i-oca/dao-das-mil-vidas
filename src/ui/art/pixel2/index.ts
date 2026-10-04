import type { Item } from '../../../types';
import type { Look } from '../portrait';
import { generoDoNome } from '../../../data/names';
import { FOE_CREATURES } from '../lutadores';
import { Pix, PAL } from './pix';
import { ITENS_AMOSTRA } from './itens';
import { retrato as desenhaRetrato, type OlharPixel } from './retratos';
import { vilarejo, montanha, compor, LARGURA, ALTURA, type Camadas } from './cenarios';
import { lutador, POSES, TRACO_JOGADOR, TRACO_DEMONIO, type TraçoLutador } from './lutadores';

/** Pix -> data URL de PNG (cache pela chave). */
const cache = new Map<string, string>();
export function uri(chave: string, fazer: () => Pix): string {
  let u = cache.get(chave);
  if (u) return u;
  const p = fazer();
  const cv = document.createElement('canvas');
  cv.width = p.w; cv.height = p.h;
  const g = cv.getContext('2d')!;
  for (let y = 0; y < p.h; y++) for (let x = 0; x < p.w; x++) { const c = p.px[y * p.w + x]; if (c) { g.fillStyle = c; g.fillRect(x, y, 1, 1); } }
  u = cv.toDataURL('image/png');
  cache.set(chave, u);
  return u;
}
const PIX = 'image-rendering:pixelated;image-rendering:crisp-edges';

/* ---------- Itens (32x32) ---------- */
export function itemDe(it: Item): (() => Pix) | null {
  if (it.kind === 'pilula') return ITENS_AMOSTRA.pilula;
  if (it.kind === 'manual') return ITENS_AMOSTRA.manual;
  if (it.kind === 'talisma') return ITENS_AMOSTRA.talisma;
  if (it.kind === 'anel') return ITENS_AMOSTRA.jade;
  if (it.kind === 'misc') return ITENS_AMOSTRA.bolsa;
  if (it.kind === 'artefato' && /espada|l[aâ]mina|sabre|adaga/i.test(it.name)) return ITENS_AMOSTRA.espada;
  return null;
}
export function item(it: Item, size: number): string | null {
  const f = itemDe(it);
  if (!f) return null;
  const u = uri('i2|' + (it.kind === 'artefato' ? 'espada' : it.kind), f);
  return `<svg class="art art-item" viewBox="0 0 32 32" width="${size}" height="${size}" role="img" aria-label="${it.name.replace(/"/g, '')}" xmlns="http://www.w3.org/2000/svg"><image href="${u}" width="32" height="32" style="${PIX}"/></svg>`;
}

/* ---------- Retratos (64x64) ---------- */
export function retrato(look: Look, size: number): string {
  const o: OlharPixel = { seed: hashS(look.seed), role: look.role, stage: look.stage, path: look.path, tier: look.tier, corr: look.corr, genero: generoDoNome(look.seed) };
  const chave = `r2|${look.seed}|${look.role}|${look.stage}|${look.path}|${look.tier}|${look.corr >= 30 ? 1 : 0}`;
  const u = uri(chave, () => desenhaRetrato(o));
  return `<svg class="art art-portrait" viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-label="${look.role}" xmlns="http://www.w3.org/2000/svg"><image href="${u}" width="64" height="64" style="${PIX}"/></svg>`;
}
function hashS(s: string) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

/* ---------- Cenários (320x180, em camadas animadas) ---------- */
const CEN: Record<string, (n: boolean, s?: number) => Camadas> = { vilarejo, montanha };
export const cenarioTem = (kind: string) => kind in CEN;
export function cenario(kind: string, seed: string, noite: boolean): string | null {
  const f = CEN[kind];
  if (!f) return null;
  const s = hashS(seed) % 5;
  const c = f(noite, s + 1);
  const k = `c2|${kind}|${s}|${noite ? 1 : 0}`;
  const img = (n: string, p: Pix, extra = '', w = LARGURA, h = ALTURA) => `<image href="${uri(`${k}|${n}`, () => p)}" x="0" y="0" width="${w}" height="${h}" style="${PIX}" ${extra}/>`;
  const sky = uri(`${k}|ceu`, () => c.ceu);
  void sky;
  const nuv = `<g>${img('nuvens', c.nuvens, '', 640, 70).replace('y="0"', 'y="6"')}<animateTransform attributeName="transform" type="translate" values="0 0;-40 0;0 0" dur="48s" repeatCount="indefinite"/></g>`;
  const agua = `<g>${img('agua', c.agua)}<animateTransform attributeName="transform" type="translate" values="0 0;2 0;0 0;-2 0;0 0" dur="3.2s" repeatCount="indefinite" calcMode="discrete"/></g>`;
  const luzes = `<g>${img('luzes', c.luzes)}<animate attributeName="opacity" values="1;.55;1;.8;1" dur="2.4s" repeatCount="indefinite"/></g>`;
  return `<svg class="art art-scene" viewBox="0 0 ${LARGURA} ${ALTURA}" role="img" aria-label="${kind}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${img('ceu', c.ceu)}${nuv}${img('longe', c.longe)}${img('meio', c.meio)}${agua}${img('perto', c.perto)}${luzes}</svg>`;
}
export { compor };

/* ---------- Lutadores (48x64, 12 quadros) ---------- */
const TRACO_CAMINHO: Record<string, Partial<TraçoLutador>> = {
  sopro: { robe: 'azul', detalhe: 'papel', arma: 'nenhuma' }, espada: { robe: 'aco', detalhe: 'azul', arma: 'espada' }, alquimia: { robe: 'fogo', detalhe: 'ouro', arma: 'nenhuma' },
  corpo: { robe: 'vermelho', detalhe: 'madeira', arma: 'punho' }, alma: { robe: 'roxo', detalhe: 'papel', arma: 'cajado' }, formacoes: { robe: 'jade', detalhe: 'ouro', arma: 'cajado' },
  budista: { robe: 'ouro', detalhe: 'vermelho', arma: 'cajado' }, venenos: { robe: 'grama', detalhe: 'jade', arma: 'nenhuma' }, bestas: { robe: 'madeira', detalhe: 'papel', arma: 'nenhuma' },
  demoniaca: { robe: 'noite', detalhe: 'vermelho', arma: 'nenhuma', demoniaco: true },
};
const TRACO_INIMIGO: Record<string, TraçoLutador> = {
  bandido: { robe: 'madeira', calca: 'cabelo', pele: PAL.peleEscura, cabelo: PAL.cabelo, arma: 'espada', detalhe: 'vermelho' },
  assassino: { robe: 'noite', calca: 'cabelo', pele: PAL.pele, cabelo: PAL.cabelo, arma: 'espada', detalhe: 'roxo' },
  cultivador: { robe: 'vermelho', calca: 'pedra', pele: PAL.pele, cabelo: PAL.cabelo, arma: 'espada', detalhe: 'ouro' },
  monge: { robe: 'ouro', calca: 'madeira', pele: PAL.peleEscura, cabelo: PAL.cabelo, arma: 'cajado', detalhe: 'vermelho' },
  demonio: TRACO_DEMONIO,
};
const QUADROS: [string, number][] = [['parado', 0], ['parado', 1], ['ataque', 0], ['ataque', 1], ['ataque', 2], ['tecnica', 0], ['tecnica', 1], ['tecnica', 2], ['dano', 0], ['vitoria', 0], ['derrota', 0]];
function folhaDe(chave: string, t: TraçoLutador): string {
  return QUADROS.map(([n, i]) => {
    const u = uri(`${chave}|${n}${i}`, () => lutador(t, POSES[n][i]));
    return `<image data-q="${n}${i}" href="${u}" x="12" y="6" width="96" height="128" style="${PIX}"${n === 'parado' && i === 0 ? '' : ' display="none"'}/>`;
  }).join('');
}
export function jogador(path: string, tier: number): string {
  const t: TraçoLutador = { ...TRACO_JOGADOR, ...(TRACO_CAMINHO[path] ?? {}) };
  void tier;
  return `<g data-sprites="1">${folhaDe('lj|' + path, t)}</g>`;
}
export function inimigo(id: string): string | null {
  if ((FOE_CREATURES as readonly string[]).includes(id)) return null;
  const t = TRACO_INIMIGO[id] ?? TRACO_INIMIGO.cultivador;
  return `<g data-sprites="1">${folhaDe('li|' + id, t)}</g>`;
}
