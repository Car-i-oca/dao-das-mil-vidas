import { jogarV2 } from './cronica2';
import { MOLDES } from '../src/data/v2/index';
const tipo: Record<string, string> = Object.fromEntries(MOLDES.map((m) => [m.id, m.tipo]));
for (const seed of process.argv.slice(2).map(Number)) {
  const r = jogarV2(seed, 0, false);
  const c: Record<string, number> = {};
  r.molde.forEach((m) => { c[m] = (c[m] ?? 0) + 1; });
  const por: Record<string, number> = {};
  r.molde.forEach((m) => { const t = tipo[m] ?? (m.startsWith('__') ? 'sistema' : 'outro'); por[t] = (por[t] ?? 0) + 1; });
  const dist = Object.entries(c).sort((a, b) => b[1] - a[1]);
  console.log(`seed ${seed}: ${r.molde.length} cenas, ${Math.floor(r.s.age)} anos | ${Object.entries(por).map(([k, v]) => `${k}:${v}`).join(' ')} | mais repetidas: ${dist.slice(0, 6).map(([k, v]) => `${k}:${v}`).join(' ')}`);
}
