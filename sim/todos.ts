/**
 * Roda uma ferramenta de simulação nos dois modos, em sequência (ou só no modo pedido com --modo).
 *   tsx sim/todos.ts validate
 *   tsx sim/todos.ts variedade 1000 --resumo
 *   tsx sim/todos.ts impacto 100 --modo xianxia
 * `validate`, `fuzz` e `endings` imprimem só erros, avisos e uma linha de resultado por modo.
 * Com `--resumo`, as demais imprimem só a primeira tabela do relatório (métricas) e o caminho do relatório completo
 * (que continua gravado em docs/). Sai com erro se qualquer um dos modos falhar.
 */
import { spawnSync } from 'node:child_process';
import { MODOS } from '../src/data/modos';
import { argModo } from './modo';

const [script, ...resto] = process.argv.slice(2);
if (!script) { console.error('uso: tsx sim/todos.ts <script> [argumentos]'); process.exit(2); }
const pedido = argModo(resto);
const resumo = resto.includes('--resumo');
const enxuto = ['validate', 'fuzz', 'endings'].includes(script);
const args = resto.filter((a, i, v) => a !== '--modo' && v[i - 1] !== '--modo' && !a.startsWith('--modo=') && a !== '--resumo');
let falhou = false;

for (const m of pedido ? [pedido] : MODOS) {
  const completo = !resumo && !enxuto;
  const r = spawnSync(process.execPath, ['--import', 'tsx', `sim/${script}.ts`, ...args, '--modo', m], { stdio: completo ? 'inherit' : ['inherit', 'pipe', 'pipe'], encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (completo) { console.log(`=== ${script} · modo ${m} ===`); if (r.status !== 0) { falhou = true; console.error(`${script} falhou no modo ${m} (código ${r.status})`); } continue; }
  const linhas = `${r.stdout ?? ''}\n${r.stderr ?? ''}`.split('\n');
  const ok = r.status === 0;
  if (!ok) falhou = true;
  if (enxuto) {
    const erros = linhas.filter((l) => /ERRO|erro\(s\)|Error|exceção|problema|×|✗|DIVERGEM/.test(l) && !/Nenhum problema/.test(l));
    const avisos = linhas.filter((l) => /^\s*aviso:/.test(l));
    const final = linhas.filter((l) => /Nenhum problema|Conteúdo válido|Moldes válidos|Todos os finais|Fuzz:|Validação/.test(l)).slice(-2).join(' | ');
    console.log(`${ok ? '✓' : '✗'} ${script} · ${m}: ${ok ? 'ok' : 'FALHOU'}${avisos.length ? ` · ${avisos.length} aviso(s)` : ''}${final ? ` · ${final}` : ''}`);
    erros.slice(0, 15).forEach((l) => console.log('   ' + l.trim()));
    avisos.slice(0, 5).forEach((l) => console.log('   ' + l.trim()));
    if (avisos.length > 5) console.log(`   … mais ${avisos.length - 5} aviso(s)`);
    continue;
  }
  // --resumo: só a primeira tabela de métricas e o caminho do relatório
  const i = linhas.findIndex((l) => l.startsWith('|'));
  const tabela: string[] = [];
  for (let k = i; i >= 0 && k < linhas.length && linhas[k].startsWith('|') && tabela.length < 16; k++) tabela.push(linhas[k]);
  console.log(`## ${script} · ${m} ${ok ? '' : '(FALHOU)'}`);
  tabela.forEach((l) => console.log(l));
  linhas.filter((l) => /→ gravado|gravado em|docs\/[\w-]+\.md/.test(l)).slice(0, 1).forEach((l) => console.log(`(relatório completo: ${l.trim().replace(/^→\s*/, '')})`));
  if (!ok) linhas.filter((l) => l.trim()).slice(-5).forEach((l) => console.log('   ' + l));
}
process.exit(falhou ? 1 : 0);
