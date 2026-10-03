import { newMeta } from '../src/engine/engine';
import { playLife } from './bot';
const per: number[][] = Array.from({ length: 9 }, () => []);
const N = 1500;
for (let i = 0; i < N; i++) {
  const trace: { id: string; age: number; tier: number }[] = [];
  playLife(newMeta(), 1000 + i * 7919, '', false, {}, {}, trace);
  const c = Array(9).fill(0);
  for (const t of trace) if (!t.id.startsWith('__')) c[t.tier]++;
  c.forEach((v, k) => per[k].push(v));
}
console.log(per.map((a, k) => `tier ${k}: média ${(a.reduce((x, y) => x + y, 0) / N).toFixed(1)} (chegam: ${(100 * a.filter((v) => v > 0).length / N).toFixed(0)}%)`).join('\n'));
