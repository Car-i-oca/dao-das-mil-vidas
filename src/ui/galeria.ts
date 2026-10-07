import { ITEMS } from '../data/items';
import { PATHS } from '../data/paths';
import { ENDINGS } from '../data/endings';
import { MOTIF } from './art/scenes';
import {
  itemIcon, pathIcon, realmIcon, sceneSvg, endingCard, portraitSvg, playerFighter, foeFighter,
  definirEstilo, type Estilo, type Look,
} from './art';

/** Depuração: ?arte=<estilo>&sec=<seção> mostra toda a arte do estilo (para conferir a olho). */
export function mostrarGaleria(app: HTMLElement, estilo: Estilo, sec: string) {
  definirEstilo(estilo);
  const kinds = ['vilarejo', 'cidade', 'seita', 'selva', 'montanha', 'ruinas', 'deserto', 'gelo', 'mar', 'reino_secreto', 'submundo', 'ceu'];
  const foes = ['bandido', 'assassino', 'cultivador', 'monge', 'demonio', 'espectro', 'lobo', 'tigre', 'serpente', 'golem', 'dragao', 'raio'];
  const caminhos = ['', 'sopro', 'espada', 'alquimia', 'corpo', 'alma', 'formacoes', 'budista', 'venenos', 'bestas', 'demoniaca'];
  const looks: [string, Look][] = [];
  for (const p of caminhos) looks.push([p || 'neutro', { seed: 'Chen ' + p, stage: 2, path: p, tier: 2, corr: 0, role: 'jogador', items: [] }]);
  for (const st of [0, 1, 2, 3, 4]) looks.push(['idade ' + st, { seed: 'Lin', stage: st, path: 'sopro', tier: 2, corr: 0, role: 'jogador', items: [] }]);
  for (const t of [0, 2, 4, 6, 8]) looks.push(['reino ' + t, { seed: 'Chen', stage: 2, path: 'espada', tier: t, corr: 0, role: 'jogador', items: ['manto_nuvem'] }]);
  looks.push(['corrompido', { seed: 'Chen', stage: 2, path: 'demoniaca', tier: 4, corr: 60, role: 'jogador', items: [] }]);
  for (const r of ['mentor', 'rival', 'amigo', 'noivo', 'discipulo', 'inimigo'] as const) looks.push([r, { seed: 'Nome ' + r, stage: r === 'mentor' ? 4 : 2, path: '', tier: 3, corr: r === 'inimigo' ? 40 : 0, role: r, items: [] }]);

  const fig = (inner: string, cena: string) => `<div class="c w2"><div class="fx">${sceneSvg(cena, 'g').replace('<svg ', '<svg preserveAspectRatio="xMidYMid slice" ')}<svg class="fg" viewBox="0 0 120 140" width="120" height="140">${inner}</svg></div></div>`;
  const S: Record<string, () => string> = {
    itens: () => `<div class="g">${ITEMS.map((i) => `<div class="c">${itemIcon(i, 64)}<br>${i.name}</div>`).join('')}</div>`,
    trilhas: () => `<div class="g">${PATHS.map((p) => `<div class="c">${pathIcon(p.id, 64)}<br>${p.name}</div>`).join('')}</div>`,
    reinos: () => `<div class="g">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((t) => `<div class="c">${realmIcon('xianxia', t, 56)}<br>${t}</div>`).join('')}${[0, 3, 6].map((t) => `<div class="c">${realmIcon('murim', t, 56)}<br>murim ${t}</div>`).join('')}</div>`,
    cenarios: () => `<div class="g">${kinds.map((k) => `<div class="c w">${sceneSvg(k, 'g')}<br>${k}</div>`).join('')}<div class="c w">${sceneSvg('seita', 'n', true)}<br>seita noite</div><div class="c w">${sceneSvg('selva', 'n', true)}<br>selva noite</div></div>`,
    finais: () => `<div class="g">${(() => { const vistos = new Set<string>(); return ENDINGS.filter((e) => { const m = MOTIF[e.id] ?? 'arvore'; if (vistos.has(m)) return false; vistos.add(m); return true; }); })().map((e) => `<div class="c w">${endingCard(e.id, e.name)}<br>${e.name}</div>`).join('')}</div>`,
    retratos: () => `<div class="g">${looks.map(([n, l]) => `<div class="c">${portraitSvg(l, 96)}<br>${n}</div>`).join('')}</div>`,
    lutadores: () => `<div class="g">${caminhos.map((p, i) => fig(playerFighter(p, i % 9), kinds[i % kinds.length]).replace('</div></div>', `</div><br>${p || 'neutro'} reino ${i % 9}</div>`)).join('')}${foes.map((f, i) => fig(`<g transform="translate(120 0) scale(-1 1)">${foeFighter(f)}</g>`, kinds[(i + 3) % kinds.length]).replace('</div></div>', `</div><br>${f}</div>`)).join('')}</div>`,
  };
  const css = `html,body{margin:0;background:#14110f;color:#e8dec8;font:12px Georgia,serif}h2{margin:14px 8px 6px;color:#d2a95c;font-size:15px}
  .g{display:flex;flex-wrap:wrap;gap:8px;padding:8px}.c{text-align:center;width:84px}.c.w{width:calc(50% - 8px)}.c.w svg,.c.w img{width:100%;height:auto}.c.w2{width:136px}
  .fx{position:relative;width:120px;height:140px;margin:0 8px;overflow:hidden;border-radius:10px}.fx>svg:first-child{position:absolute;inset:0;width:100%;height:100%}.fg{position:absolute;left:0;top:0}`;
  const lista = sec && S[sec] ? [sec] : Object.keys(S);
  app.innerHTML = `<style>${css}</style><h2 style="margin-top:6px">Estilo: ${estilo}</h2>${lista.map((k) => `<h2>${k}</h2>${S[k]()}`).join('')}`;
}
