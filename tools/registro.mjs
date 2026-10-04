// Gera o pacote de depósito de programa de computador (INPI): .zip do código-fonte do commit atual + hash SHA-512.
// Saída em registro/ (ignorada pelo git). Uso: npm run registro
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';

const git = (...a) => execFileSync('git', a, { encoding: 'utf8' }).trim();

if (git('status', '--porcelain')) {
  console.error('Há alterações não commitadas. Faça commit antes de gerar o pacote (o .zip precisa corresponder a um commit).');
  process.exit(1);
}
const commit = git('rev-parse', 'HEAD');
const data = new Date().toISOString().slice(0, 10);
mkdirSync('registro', { recursive: true });
const zip = `registro/dao-das-mil-vidas-${data}.zip`;
execFileSync('git', ['archive', '--format=zip', '--prefix=dao-das-mil-vidas/', '-o', zip, 'HEAD']);
const hash = createHash('sha512').update(readFileSync(zip)).digest('hex');
const txt = `registro/hash-sha512-${data}.txt`;
writeFileSync(txt, `Arquivo: ${zip}\nTamanho: ${statSync(zip).size} bytes\nCommit: ${commit}\nData: ${new Date().toISOString()}\nSHA-512: ${hash}\n`);
console.log(`Gerado: ${zip}\nHash:   ${txt}\n(Nada disso vai para o git: a pasta registro/ está no .gitignore.)`);
