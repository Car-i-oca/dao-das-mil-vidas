// Exporta a amostra pintada para PNG (peças em tamanho real e folha ampliada) e monta a comparação:
//   node tools/arte/exportar.mjs   (precisa do preview v2 na porta 4174: npm run build:v2 && npx vite preview --mode v2 --outDir dist-v2 --port 4174)
// Também confere a imagem de referência (fora do repositório) lado a lado com a amostra antiga e a nova.
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
const OUT = 'docs/arte-pixel-amostra';
const NOVO = `${OUT}/nova`;
mkdirSync(NOVO, { recursive: true });
const REF = process.env.REF_ARTE ?? 'C:/Users/Andre/OneDrive/Documentos/exemploarte.webp';
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const b = await chromium.launch({ executablePath: EDGE, headless: true });
const p = await b.newPage({ viewport: { width: 1700, height: 900 } });
await p.goto('http://localhost:4174/?arte=amostra');
await p.waitForSelector('#amostra');
await p.waitForTimeout(600);
const salvar = (nome, url) => writeFileSync(`${NOVO}/${nome}.png`, Buffer.from(url.split(',')[1], 'base64'));
const imgs = await p.evaluate(() => ({
  retratos: [...document.querySelectorAll('#amostra img')].map((i) => [i.nextElementSibling.textContent, i.src]),
  itens: [...document.querySelectorAll('#itens img')].map((i) => [i.nextElementSibling.textContent, i.src]),
  lutadores: [...document.querySelectorAll('#lutadores img')].map((i) => i.src),
  cenarios: [...document.querySelectorAll('#cenarios > div')].map((d) => [d.lastElementChild.textContent, [...d.querySelectorAll('image')].map((im) => im.getAttribute('href'))]),
}));
for (const [n, u] of imgs.retratos) salvar(`retrato-${n}`, u);
for (const [n, u] of imgs.itens) salvar(`item-${n}`, u);
imgs.lutadores.forEach((u, i) => salvar(`lutador-${String(i).padStart(2, '0')}`, u));
for (const [n, camadas] of imgs.cenarios) ['ceu', 'nuvens', 'terra', 'brilhos'].forEach((c, i) => salvar(`cenario-${n.replace(' ', '-')}-${c}`, camadas[i]));
await p.screenshot({ path: `${OUT}/folha-nova.png`, fullPage: true });
// comparação: referência × amostra antiga × amostra nova (só retratos, na mesma altura)
const barras = (s) => s.split(String.fromCharCode(92)).join('/');
const abs = (f) => 'file:///' + barras(resolve(f));
const html = `<body style="margin:0;background:#1b1722;color:#ddd;font:14px sans-serif"><div style="display:flex;gap:18px;padding:14px;align-items:flex-start">
<div><div>Referência (só estilo, fora do repositório)</div><img src="file:///${barras(REF)}" height="300" style="image-rendering:pixelated"></div>
<div><div>Amostra antiga</div><img src="${abs(OUT + '/retratos.png')}" height="300" style="image-rendering:pixelated"></div>
<div><div>Amostra nova (pintar e pixelizar)</div><div style="display:flex;gap:8px">${imgs.retratos.map(([, u]) => `<img src="${u}" height="300" style="image-rendering:pixelated">`).join('')}</div></div></div></body>`;
writeFileSync('.tmp/comparacao.html', html);
const q = await b.newPage({ viewport: { width: 2900, height: 360 } });
await q.goto(abs('.tmp/comparacao.html'));
await q.waitForTimeout(800);
await q.screenshot({ path: `${OUT}/comparacao.png`, fullPage: true });
console.log('exportado em', OUT, existsSync(REF) ? '' : '(referência não encontrada)');
await b.close();
