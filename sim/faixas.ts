import { EVENTS } from '../src/data/events/index';
const rows: string[] = [];
for (const e of EVENTS) {
  const lo = e.cond?.tierMin ?? 0, hi = e.cond?.tierMax ?? 8;
  const hasAge = e.cond?.ageMax !== undefined && e.cond.ageMax < 30;
  if (hi - lo >= 5 && !hasAge && !e.once && !(e.weight === 0)) rows.push(`${e.id}|${lo}-${hi}|w${e.weight ?? 1}|${e.title}`);
}
console.log(rows.length); console.log(rows.join('\n'));
