/**
 * Dourado do Murim: prova de que uma refatoração não mudou o comportamento do jogo.
 *   npm run dourado -- --gravar     grava docs/dourado-murim.json (rode ANTES de refatorar)
 *   npm run dourado                 compara com o gravado; sai com erro se qualquer vida divergir
 * Para cada semente joga uma vida com o bot e resume o ESTADO FINAL inteiro (State serializado) mais a trilha de eventos.
 * Campos acrescentados depois pelo suporte a modos (listados em IGNORAR) não entram no resumo.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { newMeta, finalizeLife } from '../src/engine/engine';
import { playLife } from './bot';

const ARQ = 'docs/dourado-murim.json';
const IGNORAR = new Set(['modo']);
const gravar = process.argv.includes('--gravar');
const hash = (x: unknown) => createHash('sha1').update(JSON.stringify(x, (k, v) => (IGNORAR.has(k) ? undefined : v))).digest('hex').slice(0, 16);

const out: Record<string, string> = {};
// 300 vidas independentes (meta vazia)
for (let i = 0; i < 300; i++) {
  const trace: { id: string; age: number; tier: number }[] = [];
  const s = playLife(newMeta(), 5000 + i * 104729, '', false, {}, {}, trace);
  out[`i${i}`] = hash({ s, trace });
}
// 30 vidas encadeadas na mesma herança (testa Legado, conquistas e memória entre vidas)
const meta = newMeta();
for (let i = 0; i < 30; i++) {
  const trace: { id: string; age: number; tier: number }[] = [];
  const s = playLife(meta, 90000 + i * 7919, '', i % 3 === 0, {}, {}, trace);
  finalizeLife(meta, s);
  out[`c${i}`] = hash({ s, trace, meta });
}
const total = hash(out);
if (gravar) {
  writeFileSync(ARQ, JSON.stringify({ total, vidas: out }, null, 1) + '\n');
  console.log(`dourado gravado: ${Object.keys(out).length} vidas, total ${total}`);
} else {
  if (!existsSync(ARQ)) { console.error(`sem ${ARQ}: rode com --gravar antes de refatorar`); process.exit(2); }
  const ref = JSON.parse(readFileSync(ARQ, 'utf8')) as { total: string; vidas: Record<string, string> };
  const dif = Object.keys(ref.vidas).filter((k) => ref.vidas[k] !== out[k]);
  if (dif.length) { console.error(`DIVERGEM ${dif.length} de ${Object.keys(ref.vidas).length} vidas: ${dif.slice(0, 10).join(', ')}`); process.exit(1); }
  console.log(`dourado igual: ${Object.keys(out).length} vidas idênticas (total ${total})`);
}
