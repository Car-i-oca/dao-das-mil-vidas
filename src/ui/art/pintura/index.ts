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
import { PAL } from './paleta';
import { rostoUrl, estatutoDe, fundoDe, type ContextoRosto } from './rosto';
import { gerarAparencia, type Estatuto, type FundoTipo } from './aparencia';
import { itemUrl } from './itens';
import { quadroUrl, QUADROS, type FigL, type ArmaL } from './lutadores';
import { criaturaUrl, CRIATURAS } from './criaturas';

export function itemSvg(it: Item, size: number): string | null {
  const id = it.kind === 'pilula' ? 'pilula' : it.kind === 'manual' ? 'manual' : it.kind === 'talisma' ? 'talisma' : it.kind === 'anel' ? 'jade' : it.kind === 'misc' ? 'bolsa' : it.kind === 'artefato' && /espada|l[aâ]mina|sabre|adaga/i.test(it.name) ? 'espada' : null;
  const u = id && itemUrl(id);
  if (!u) return null;
  return `<svg class="art art-item" viewBox="0 0 48 48" width="${size}" height="${size}" role="img" aria-label="${it.name.replace(/"/g, '')}" xmlns="http://www.w3.org/2000/svg"><image href="${u}" width="48" height="48" style="${PIX}"/></svg>`;
}
export function contextoDeLook(look: Look): ContextoRosto {
  const ap = look.ap ?? gerarAparencia(look.seed, generoDoNome(look.seed));
  const estatuto = (look.estatuto as Estatuto | undefined) ?? estatutoDe({ role: look.role, faccaoTipo: look.faccaoTipo, reino: look.tier, trilha: look.path });
  return { ap, semente: look.seed, stage: look.stage, estatuto, trilha: look.path, tier: look.tier, corr: look.corr, role: look.role, fundo: (look.fundo as FundoTipo | undefined) ?? fundoDe({ faccaoTipo: look.faccaoTipo, estatuto, corr: look.corr, role: look.role }), expr: look.expr as ContextoRosto['expr'], feridas: look.feridas };
}
export function retratoSvg(look: Look, size: number): string {
  return `<svg class="art art-portrait" viewBox="0 0 112 112" width="${size}" height="${size}" role="img" aria-label="${look.role}" xmlns="http://www.w3.org/2000/svg"><image href="${rostoUrl(contextoDeLook(look))}" width="112" height="112" style="${PIX}"/></svg>`;
}

const ARMA_TRILHA: Record<string, ArmaL> = { espada: 'espada', corpo: 'punho', alma: 'orbe', formacoes: 'talisma', alquimia: 'frasco', venenos: 'dardo', bestas: 'garra', budista: 'cajado', sopro: 'nenhuma', demoniaca: 'garra' };
/** Roupa de cada tipo de oponente humano; a cara vem da aparência (da pessoa, quando é uma pessoa do mundo). */
const TIPO_INIMIGO: Record<string, { arma: ArmaL; estatuto: Estatuto; roupa?: FigL['roupa']; role: string }> = {
  bandido: { arma: 'cutelo', estatuto: 'servo', role: 'inimigo', roupa: { pano: 'marrom', borda: 'vermelho', calca: 'cabeloEscuro' } },
  assassino: { arma: 'adaga', estatuto: 'errante', role: 'inimigo', roupa: { pano: 'noite', borda: 'roxo', calca: 'cabeloEscuro', capuz: true, mascara: true } },
  cultivador: { arma: 'espada', estatuto: 'interno', role: 'rival' },
  monge: { arma: 'cajado', estatuto: 'monge', role: 'mentor' },
  demonio: { arma: 'garra', estatuto: 'demoniaco', role: 'inimigo', roupa: { pano: 'tinta', borda: 'vermelho', calca: 'cabeloEscuro', chifres: true, olhos: PAL.vermelho[3] } },
};
function figDe(look: Look | undefined, tipo: string | undefined, semente: string): FigL {
  const base = tipo ? TIPO_INIMIGO[tipo] : undefined;
  const ap = look?.ap ?? gerarAparencia(semente, generoDoNome(semente.split('|')[0]));
  const apF: typeof ap = tipo === 'monge' ? { ...ap, cabelo: 8, barba: 0 } : tipo === 'demonio' ? { ...ap, marcas: [...new Set([...ap.marcas, 'demoniaca' as const])] } : ap;
  const est = (look?.estatuto as Estatuto | undefined) ?? (look?.faccaoTipo !== undefined || look?.role ? estatutoDe({ role: look?.role ?? 'rival', faccaoTipo: look?.faccaoTipo, reino: look?.tier, trilha: look?.path }) : base?.estatuto ?? 'interno');
  const trilha = look?.path ?? '';
  return { ap: apF, estatuto: base && !look?.ap ? base.estatuto : est, trilha, arma: base?.arma ?? ARMA_TRILHA[trilha] ?? 'espada', stage: look?.stage ?? 2, tier: look?.tier ?? 2, semente, roupa: base?.roupa && (!look?.ap || tipo === 'assassino' || tipo === 'demonio') ? base.roupa : undefined };
}
function folha(chave: string, fg: FigL): string {
  return QUADROS.map(([n, i]) => `<image data-q="${n}${i}" href="${quadroUrl(chave, fg, n, i)}" x="0" y="0" width="120" height="168" style="${PIX}"${n === 'parado' && i === 0 ? '' : ' display="none"'}/>`).join('');
}
function folhaCriatura(id: string): string {
  return QUADROS.map(([n, i]) => `<image data-q="${n}${i}" href="${criaturaUrl(id, n + i)}" x="0" y="84" width="120" height="84" style="${PIX}"${n === 'parado' && i === 0 ? '' : ' display="none"'}/>`).join('');
}
const chaveLook = (l?: Look) => (l?.ap ? JSON.stringify(l.ap) + l.stage + l.estatuto + l.faccaoTipo + l.path : '');
export function jogadorSvg(path: string, look?: Look): string {
  const lk = look ?? { seed: 'Jogador', stage: 2, path, tier: 2, corr: 0, role: 'jogador' as const, items: [] };
  const fg = figDe({ ...lk, path: lk.path || path }, undefined, lk.seed + '|j');
  fg.arma = ARMA_TRILHA[lk.path || path] ?? 'espada';
  return `<g data-sprites="1">${folha('j|' + chaveLook(lk) + path, fg)}</g>`;
}
export function inimigoSvg(id: string, look?: Look, semente = id): string | null {
  if ((CRIATURAS as readonly string[]).includes(id)) return `<g data-sprites="1">${folhaCriatura(id)}</g>`;
  if (!TIPO_INIMIGO[id] && !look) return null;
  const fg = figDe(look, TIPO_INIMIGO[id] ? id : undefined, semente);
  return `<g data-sprites="1">${folha('i|' + id + '|' + semente + chaveLook(look), fg)}</g>`;
}
export { efeitoUrl } from './efeitos';

/** Depuração: URLs dos 11 quadros do jogador (ou do oponente) para a folha de amostra. */
export function quadrosDe(tipo: 'jogador' | string, look: Look | undefined, path: string, semente: string): string[] {
  const fg = tipo === 'jogador' ? (() => { const f = figDe({ ...(look as Look), path }, undefined, semente); f.arma = ARMA_TRILHA[path] ?? 'espada'; return f; })() : figDe(look, tipo, semente);
  return QUADROS.map(([n, i]) => quadroUrl('dbg|' + tipo + '|' + semente + chaveLook(look), fg, n, i));
}
