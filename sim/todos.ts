/**
 * Roda uma ferramenta de simulação nos dois modos, em sequência (ou só no modo pedido com --modo).
 *   tsx sim/todos.ts validate
 *   tsx sim/todos.ts variedade 1000
 *   tsx sim/todos.ts impacto 100 --modo xianxia
 * Sai com erro se qualquer um dos modos falhar.
 */
import { spawnSync } from 'node:child_process';
import { MODOS } from '../src/data/modos';
import { argModo } from './modo';

const [script, ...resto] = process.argv.slice(2);
if (!script) { console.error('uso: tsx sim/todos.ts <script> [argumentos]'); process.exit(2); }
const pedido = argModo(resto);
const args = resto.filter((a, i, v) => a !== '--modo' && v[i - 1] !== '--modo' && !a.startsWith('--modo='));
let falhou = false;
for (const m of pedido ? [pedido] : MODOS) {
  console.log(`\n=== ${script} · modo ${m} ===`);
  const r = spawnSync(process.execPath, ['--import', 'tsx', `sim/${script}.ts`, ...args, '--modo', m], { stdio: 'inherit' });
  if (r.status !== 0) { falhou = true; console.error(`${script} falhou no modo ${m} (código ${r.status})`); }
}
process.exit(falhou ? 1 : 0);
