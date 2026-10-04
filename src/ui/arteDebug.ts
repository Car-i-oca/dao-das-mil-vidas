import { rostoUrl, type ContextoRosto, estatutoDe, fundoDe } from './art/pintura/rosto';
import { gerarAparencia, type Aparencia, type Estatuto } from './art/pintura/aparencia';
import { itemUrl, ITENS } from './art/pintura/itens';
import { cenarioSvg } from './art/pintura';

/** Depuração da arte: ?arte=amostra mostra as peças pintadas lado a lado (usado por tools/arte/exportar.mjs). */
const PX = 'image-rendering:pixelated;image-rendering:crisp-edges';
function ctx(nome: string, g: 'm' | 'f', stage: number, o: Partial<ContextoRosto> & { est?: Estatuto; faccao?: string; reino?: number; papel?: string }): ContextoRosto {
  const ap = gerarAparencia(nome, g);
  const role = o.papel ?? o.role ?? 'amigo';
  const estatuto = o.est ?? estatutoDe({ role, faccaoTipo: o.faccao, reino: o.reino, trilha: o.trilha });
  return { ap, semente: nome, stage, estatuto, trilha: o.trilha ?? '', tier: o.reino ?? o.tier ?? 1, corr: o.corr ?? 0, role, fundo: o.fundo ?? fundoDe({ faccaoTipo: o.faccao, estatuto, corr: o.corr, role }), expr: o.expr };
}
export const PESSOAS: [string, ContextoRosto][] = [
  ['Lin Xueyun (discípula da seita)', ctx('Lin Xueyun', 'f', 1, { faccao: 'seita', reino: 2, trilha: 'espada', papel: 'amigo' })],
  ['Han Zhifeng (rival)', ctx('Han Zhifeng', 'm', 2, { faccao: 'seita', reino: 3, papel: 'rival', trilha: 'corpo' })],
  ['Su Mingfeng (patriarca)', ctx('Su Mingfeng', 'm', 4, { faccao: 'seita', reino: 6, papel: 'mentor' })],
  ['Qin Ruolan (culto)', ctx('Qin Ruolan', 'f', 3, { faccao: 'culto', reino: 4, papel: 'inimigo', corr: 55 })],
  ['Wen Haojun (mercador)', ctx('Wen Haojun', 'm', 2, { faccao: 'associacao', reino: 1, papel: 'amigo' })],
  ['Mo Shanyu (errante)', ctx('Mo Shanyu', 'f', 2, { reino: 2, papel: 'amigo', fundo: 'montanha' })],
  ['Feng Tianlei (nobre do império)', ctx('Feng Tianlei', 'm', 3, { faccao: 'imperio', reino: 4, papel: 'inimigo' })],
  ['Bai Jingwen (monge)', ctx('Bai Jingwen', 'm', 2, { reino: 3, papel: 'mentor', trilha: 'budista' })],
];
export const JOGADOR: [string, ContextoRosto][] = [
  ['Jogador: criança', ctx('Gu Ruomei', 'f', 0, { reino: 0, papel: 'jogador', faccao: 'cla', fundo: 'vila' })],
  ['Jogador: adulta', ctx('Gu Ruomei', 'f', 2, { reino: 3, papel: 'jogador', trilha: 'espada', faccao: 'seita' })],
  ['Jogador: anciã', ctx('Gu Ruomei', 'f', 4, { reino: 6, papel: 'jogador', trilha: 'espada', faccao: 'seita' })],
];
const fig = (n: string, c: ContextoRosto, tam = 336) => `<div><img src="${rostoUrl(c)}" width="${tam}" height="${tam}" style="${PX}"><div style="width:${tam}px">${n}</div></div>`;
export function montarAmostra() {
  document.body.style.cssText = 'background:#1b1722;margin:0;padding:12px;color:#ddd;font:12px sans-serif';
  let h = '<div id="amostra" style="display:flex;flex-wrap:wrap;gap:10px">' + PESSOAS.map(([n, c]) => fig(n, c)).join('') + '</div>';
  h += '<div id="jogador" style="display:flex;flex-wrap:wrap;gap:10px;margin-top:10px">' + JOGADOR.map(([n, c]) => fig(n, c)).join('') + '</div>';
  document.body.innerHTML = h;
  let hi = '<div id="itens" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:12px">';
  for (const id of Object.keys(ITENS)) hi += `<div><img src="${itemUrl(id)}" width="160" height="160" style="${PX};background:#2a2438"><div>${id}</div></div>`;
  document.body.insertAdjacentHTML('beforeend', hi + '</div>');
  let hc = '<div id="cenarios" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:12px">';
  for (const k of ['vilarejo', 'montanha']) for (const n of [false, true]) hc += `<div style="width:520px">${(cenarioSvg(k, 'amostra', n) ?? '').replace('<svg ', '<svg width="520" height="293" ')}<div>${k} ${n ? 'noite' : 'dia'}</div></div>`;
  document.body.insertAdjacentHTML('beforeend', hc + '</div>');
  montarOponentes();
}

import { inimigoSvg, jogadorSvg, quadrosDe } from './art/pintura';
import type { Look } from './art';
export function montarOponentes() {
  const lookDe = (c: ContextoRosto): Look => ({ seed: c.semente, stage: c.stage, path: c.trilha, tier: c.tier, corr: c.corr, role: c.role as Look['role'], items: [], ap: c.ap, estatuto: c.estatuto });
  const rival = PESSOAS[1][1], jog = JOGADOR[1][1];
  const foes: [string, string][] = [
    ['bandido', inimigoSvg('bandido', undefined, 'Bandido do Desfiladeiro') ?? ''], ['monge', inimigoSvg('monge', undefined, 'Monge Hu') ?? ''],
    ['lobo', inimigoSvg('lobo') ?? ''], ['golem', inimigoSvg('golem') ?? ''], ['rival (mesma cara do retrato)', inimigoSvg('cultivador', { ...lookDe(rival), role: 'rival' }, rival.semente) ?? ''],
    ['dragão', inimigoSvg('dragao') ?? ''], ['demônio', inimigoSvg('demonio', undefined, 'Demônio do Culto') ?? ''],
  ];
  let h = '<div id="oponentes" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;background:#5a7a9a;padding:8px">';
  for (const [n, svg] of foes) h += `<div><svg viewBox="0 0 120 168" width="180" height="252"><g transform="translate(120 0) scale(-1 1)">${svg}</g></svg><div style="color:#fff">${n}</div></div>`;
  h += `<div><svg viewBox="0 0 120 168" width="180" height="252">${jogadorSvg('espada', lookDe(jog))}</svg><div style="color:#fff">jogador (a mesma pessoa)</div></div></div>`;
  h += '<div id="quadros" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:8px;background:#5a7a9a;padding:8px">' + quadrosDe('jogador', lookDe(jog), 'espada', jog.semente).map((u) => `<img src="${u}" width="120" height="168" style="${PX}">`).join('') + '</div>';
  document.body.insertAdjacentHTML('beforeend', h);
}
