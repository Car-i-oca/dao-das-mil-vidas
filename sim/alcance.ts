/**
 * Alcance dos finais: quais finais aparecem de verdade, jogando com dois robôs (o do simulador, que prefere a opção de maior chance,
 * e um que escolhe qualquer opção ao acaso). Um final que nenhum dos dois alcança em N vidas está inalcançável na prática.
 *   npm run alcance -- 1500 [--modo xianxia]      grava docs/alcance-<modo>.md
 */
import { writeFileSync } from 'node:fs';
import { Rng } from '../src/engine/rng';
import { newMeta, rollCreation, startLife, view, choose, proceed } from '../src/engine/engine';
import { playLife } from './bot';
import { PK, MODO } from './modo';

const N = Number(process.argv.slice(2).find((a) => /^\d+$/.test(a)) ?? 1500);
const robo: Record<string, number> = {}, acaso: Record<string, number> = {};

for (let i = 0; i < N; i++) {
  const s = playLife(newMeta(), 7000 + i * 6007, '', false, {}, {});
  robo[s.ending ?? '??'] = (robo[s.ending ?? '??'] ?? 0) + 1;
}
for (let i = 0; i < N; i++) {
  const rng = new Rng(9100 + i * 211);
  const s = startLife(newMeta(), rollCreation(newMeta(), rng, MODO), '', rng.seed);
  const bot = new Rng(i * 13 + 5);
  let guard = 0;
  while (!s.ending && guard++ < 6000) {
    const v = view(s);
    if (v.kind === 'event') {
      const abertas = v.choices.map((_, k) => k).filter((k) => !v.choices[k].disabled);
      choose(s, abertas.length ? bot.pick(abertas) : 0, rng);
    }
    if (s.ending) break;
    proceed(s, rng);
  }
  acaso[s.ending ?? '??'] = (acaso[s.ending ?? '??'] ?? 0) + 1;
}

const linhas = PK.finais.map((e) => ({ nome: e.name, id: e.id, r: robo[e.id] ?? 0, a: acaso[e.id] ?? 0 }));
const nunca = linhas.filter((l) => l.r + l.a === 0);
const md = [
  `# Alcance dos finais — modo ${PK.nome}`, '',
  `Gerado por \`npm run alcance -- ${N} --modo ${MODO}\`: ${N} vidas com o robô do simulador e ${N} com um robô que escolhe ao acaso.`, '',
  `Finais: ${linhas.length}. Alcançados por algum robô: ${linhas.length - nunca.length}. **Nunca alcançados: ${nunca.length}.**`, '',
  '| Final | id | Robô do simulador | Robô ao acaso |', '|---|---|---:|---:|',
  ...linhas.sort((x, y) => y.r + y.a - (x.r + x.a)).map((l) => `| ${l.nome} | \`${l.id}\` | ${l.r} | ${l.a} |`),
  '',
];
writeFileSync(`docs/alcance-${MODO}.md`, md.join('\n'));
console.log(`${PK.nome}: ${linhas.length - nunca.length}/${linhas.length} finais alcançados. Nunca alcançados: ${nunca.map((l) => l.id).join(', ') || 'nenhum'}`);
