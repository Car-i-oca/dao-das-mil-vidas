import { retratoUrl, type OlharP } from './art/pintura/retrato';

/** Depuração da arte: ?arte=amostra mostra as peças pintadas lado a lado (usado por tools/arte/amostra.mjs). */
export const RETRATOS_AMOSTRA: Record<string, OlharP> = {
  jovem: { seed: 'Lin Xueyun', role: 'jogador', stage: 1, path: 'espada', tier: 3, corr: 0, genero: 'f' },
  adulto: { seed: 'Han Zhifeng', role: 'rival', stage: 2, path: 'corpo', tier: 3, corr: 0, genero: 'm' },
  anciao: { seed: 'Su Mingfeng', role: 'mentor', stage: 4, path: 'alquimia', tier: 6, corr: 0, genero: 'm' },
  vilao: { seed: 'Qin Ruolan', role: 'inimigo', stage: 3, path: 'demoniaca', tier: 4, corr: 55, genero: 'f' },
};
export function montarAmostra() {
  document.body.style.cssText = 'background:#1b1722;margin:0;padding:12px;color:#ddd;font:12px sans-serif';
  const px = 'image-rendering:pixelated;image-rendering:crisp-edges';
  let h = '<div id="amostra" style="display:flex;flex-wrap:wrap;gap:12px">';
  for (const [n, o] of Object.entries(RETRATOS_AMOSTRA)) h += `<div><img src="${retratoUrl(o)}" width="384" height="384" style="${px}"><div>${n}</div></div>`;
  h += '</div>';
  document.body.innerHTML = h;
  montarItens();
  montarCenarios();
  montarLutadores();
}

import { itemUrl, ITENS } from './art/pintura/itens';
export function montarItens() {
  const px = 'image-rendering:pixelated;image-rendering:crisp-edges';
  let h = '<div id="itens" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:12px">';
  for (const id of Object.keys(ITENS)) h += `<div><img src="${itemUrl(id)}" width="240" height="240" style="${px};background:#2a2438"><div>${id}</div></div>`;
  h += '</div>';
  document.getElementById('amostra')!.insertAdjacentHTML('afterend', h);
}

import { cenarioSvg } from './art/pintura';
export function montarCenarios() {
  let h = '<div id="cenarios" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:12px">';
  for (const k of ['vilarejo', 'montanha']) for (const n of [false, true]) h += `<div style="width:800px">${(cenarioSvg(k, 'amostra', n) ?? '').replace('<svg ', '<svg width="800" height="450" ')}<div>${k} ${n ? 'noite' : 'dia'}</div></div>`;
  h += '</div>';
  document.getElementById('amostra')!.insertAdjacentHTML('afterend', h);
}

import { quadroUrl, QUADROS, TRACO_JOGADOR_P } from './art/pintura/lutadores';
export function montarLutadores() {
  const px = 'image-rendering:pixelated;image-rendering:crisp-edges';
  let h = '<div id="lutadores" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;background:#4a6a8a;padding:8px">';
  for (const [n, i] of QUADROS) h += `<img src="${quadroUrl('jog', TRACO_JOGADOR_P, n, i)}" width="144" height="192" style="${px}">`;
  h += '</div>';
  document.getElementById('amostra')!.insertAdjacentHTML('afterend', h);
}
