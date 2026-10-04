// Tira print da amostra de arte: node tools/arte/ver.mjs [saida.png]   (precisa do preview v2 na 4174)
import { chromium } from 'playwright-core';
const OUT = process.argv[2] ?? '.tmp/arte/amostra.png';
import { mkdirSync } from 'node:fs'; import { dirname } from 'node:path'; mkdirSync(dirname(OUT), { recursive: true });
const EDGE = process.env.EDGE ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const b = await chromium.launch({ executablePath: EDGE, headless: true });
const p = await b.newPage({ viewport: { width: 1700, height: 900 } });
const erros = []; p.on('pageerror', (e) => erros.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') erros.push(m.text()); });
await p.goto('http://localhost:4174/?arte=amostra');
await p.waitForSelector('#amostra', { timeout: 20000 });
await p.waitForTimeout(500);
await p.screenshot({ path: OUT, fullPage: true });
console.log('erros:', erros.length ? erros : 'nenhum');
await b.close();
