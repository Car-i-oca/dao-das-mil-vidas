/** Gera docs/galeria.html com todos os ícones, retratos e cenários (para revisar a arte): npm run galeria */
import { writeFileSync } from 'node:fs';
import { ITEMS } from '../src/data/items';
import { PATHS } from '../src/data/paths';
import { ENDINGS } from '../src/data/endings';
import { itemIcon, pathIcon, realmIcon } from '../src/ui/art/icons';
import { sceneSvg, endingCard } from '../src/ui/art/scenes';
import { portraitSvg, type Look } from '../src/ui/art/portrait';

const css = `:root{--bg:#14110f;--bg2:#1d1915;--card:#231e19;--line:#3a3128;--ink:#e8dec8;--muted:#a69981;--red:#c4513d;--jade:#6fa389;--gold:#d2a95c;--blue:#7d9fc4}
body{background:var(--bg);color:var(--ink);font-family:Georgia,serif;margin:16px}h2{margin:22px 0 8px;color:var(--gold)}.g{display:flex;flex-wrap:wrap;gap:8px}.c{width:92px;text-align:center;font-size:10px}.w{width:300px;font-size:10px;text-align:center}.w svg{width:300px;height:auto}`;
let h = `<!doctype html><meta charset=utf-8><style>${css}</style><h1>Galeria de arte</h1>`;
h += '<h2>Itens</h2><div class=g>' + ITEMS.map((i) => `<div class=c>${itemIcon(i)}<br>${i.name}</div>`).join('') + '</div>';
h += '<h2>Trilhas</h2><div class=g>' + PATHS.map((p) => `<div class=c>${pathIcon(p.id)}<br>${p.name}</div>`).join('') + '</div>';
h += '<h2>Reinos (xianxia / murim)</h2><div class=g>' + [0, 1, 2, 3, 4, 5, 6, 7, 8].map((t) => `<div class=c>${realmIcon('xianxia', t)}<br>${t}</div>`).join('') + [0, 1, 2, 3, 4, 5, 6, 7].map((t) => `<div class=c>${realmIcon('murim', t)}<br>m${t}</div>`).join('') + '</div>';
const kinds = ['vilarejo', 'cidade', 'seita', 'selva', 'montanha', 'ruinas', 'deserto', 'gelo', 'mar', 'reino_secreto', 'submundo', 'ceu'];
h += '<h2>Cenários</h2><div class=g>' + kinds.map((k) => `<div class=w>${sceneSvg(k)}<br>${k}</div>`).join('') + `<div class=w>${sceneSvg('seita', 'n', true)}<br>seita (noite)</div></div>`;
h += '<h2>Finais</h2><div class=g>' + ENDINGS.map((e) => `<div class=w>${endingCard(e.id, e.name)}<br>${e.name}</div>`).join('') + '</div>';
const looks: [string, Look][] = [];
for (const p of ['', 'sopro', 'espada', 'alquimia', 'corpo', 'alma', 'formacoes', 'budista', 'venenos', 'bestas', 'demoniaca']) looks.push([p || 'neutro', { seed: 'Lin ' + p, stage: 2, path: p, tier: 3, corr: p === 'demoniaca' ? 50 : 0, role: 'jogador', items: [] }]);
for (const st of [0, 1, 2, 3, 4]) looks.push(['idade ' + st, { seed: 'Chen', stage: st, path: 'sopro', tier: 2, corr: 0, role: 'jogador', items: [] }]);
for (const t of [0, 2, 4, 6, 8]) looks.push(['reino ' + t, { seed: 'Chen', stage: 2, path: 'espada', tier: t, corr: 0, role: 'jogador', items: ['manto_nuvem_cinza'] }]);
for (const r of ['mentor', 'rival', 'amigo', 'noivo', 'discipulo', 'inimigo'] as const) looks.push([r, { seed: 'Nome ' + r, stage: r === 'mentor' ? 4 : r === 'inimigo' ? 3 : r === 'rival' || r === 'discipulo' ? 1 : 2, path: '', tier: 2, corr: r === 'inimigo' ? 40 : 0, role: r, items: [] }]);
h += '<h2>Retratos</h2><div class=g>' + looks.map(([n, l]) => `<div class=c>${portraitSvg(l)}<br>${n}</div>`).join('') + '</div>';
writeFileSync('docs/galeria.html', h);
console.log('docs/galeria.html', h.length);
