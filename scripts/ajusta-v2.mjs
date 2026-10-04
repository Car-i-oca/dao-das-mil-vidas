// Depois do build da v2: dá à versão de teste outro nome (manifesto do PWA e título), para não se confundir com o jogo original.
import { readFileSync, writeFileSync } from 'node:fs';
const pasta = process.argv[2] ?? 'dist-v2';
const mf = JSON.parse(readFileSync(`${pasta}/manifest.webmanifest`, 'utf8'));
mf.name = 'Murim Quest (teste)';
mf.short_name = 'Murim Quest v2';
writeFileSync(`${pasta}/manifest.webmanifest`, JSON.stringify(mf, null, 2));
const html = readFileSync(`${pasta}/index.html`, 'utf8').replace('<title>Murim Quest</title>', '<title>Murim Quest (teste)</title>');
writeFileSync(`${pasta}/index.html`, html);
console.log('v2: nome ajustado em', pasta);
