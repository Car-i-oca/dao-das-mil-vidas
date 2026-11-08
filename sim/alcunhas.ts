/**
 * Verificação das alcunhas: distribuição das finais, alcance, mudanças por vida, leitura (cenas) e variedade por trilha.
 *   npm run alcunhas -- 1000 [--modo xianxia]      grava docs/alcunhas-<modo>.md
 * Metade das vidas usa o robô do simulador e metade escolhe ao acaso, para não medir só um jeito de jogar.
 */
import { writeFileSync } from 'node:fs';
import { Rng } from '../src/engine/rng';
import { newMeta, rollCreation, startLife, view, choose, proceed } from '../src/engine/engine';
import { botPick } from './bot';
import { PK, MODO } from './modo';
import { nomeAlcunha } from '../src/engine/alcunhas';
import type { State } from '../src/types';

const N = Number(process.argv.slice(2).find((a) => /^\d+$/.test(a)) ?? 1000);
const final: Record<string, number> = {}, porTrilha: Record<string, Record<string, number>> = {};
let comAlcunha = 0, mudancas = 0, nascAge = 0, nasceu = 0;
const reacoesVistas: Record<string, number> = {};
const cenasPorTipo: Record<string, number> = {};

for (let i = 0; i < N; i++) {
  const rng = new Rng(11000 + i * 307);
  const meta = newMeta();
  const s: State = startLife(meta, rollCreation(meta, rng, MODO), '', rng.seed);
  const bot = new Rng(i * 17 + 3);
  const poli = i % 2 === 0;
  let g = 0;
  while (!s.ending && g++ < 6000) {
    const v = view(s);
    if (v.kind === 'event') {
      if (s.current?.alc) cenasPorTipo[s.current.alc.tipo] = (cenasPorTipo[s.current.alc.tipo] ?? 0) + 1;
      const ab = v.choices.map((_, k) => k).filter((k) => !v.choices[k].disabled);
      choose(s, poli || s.current?.alc ? botPick(s, bot, false) : ab.length ? bot.pick(ab) : 0, rng);
    }
    if (s.ending) break;
    proceed(s, rng);
  }
  const a = s.alc;
  const id = a?.atual?.id ?? '(nenhuma)';
  final[id] = (final[id] ?? 0) + 1;
  if (a?.atual) comAlcunha++;
  if (a?.historico.length) { nasceu++; nascAge += a.historico[0].idade; mudancas += a.historico.length - 1; }
  for (const r of a?.reacoes ?? []) reacoesVistas[r.split(':')[0]] = (reacoesVistas[r.split(':')[0]] ?? 0) + 1;
  const tr = s.path || '(sem trilha)';
  (porTrilha[tr] ??= {})[id] = (porTrilha[tr][id] ?? 0) + 1;
}

const nomes = Object.fromEntries(PK.alcunhas.map((a) => [a.id, nomeAlcunha({ ...({} as State), modo: MODO, name: 'Lin', seed: 0, v2: undefined } as State, a)]));
const linhas = PK.alcunhas.map((a) => ({ a, n: final[a.id] ?? 0 })).sort((x, y) => y.n - x.n);
const nunca = linhas.filter((l) => l.n === 0);
const maior = Math.max(...linhas.map((l) => l.n));
let diversas = 0, pares = 0;
for (const dist of Object.values(porTrilha)) {
  const total = Object.values(dist).reduce((x, y) => x + y, 0);
  if (total < 20) continue;
  const soma = Object.values(dist).reduce((x, y) => x + (y / total) ** 2, 0);
  diversas += 1 - soma; pares++;
}
const md = [
  `# Alcunhas — modo ${PK.nome}`, '',
  `Gerado por \`npm run alcunhas -- ${N} --modo ${MODO}\` (${N} vidas: metade com o robô do simulador, metade ao acaso).`, '',
  '| Métrica | Valor | Meta |', '|---|---|---|',
  `| Vidas que terminam com alguma alcunha | ${((100 * comAlcunha) / N).toFixed(1)}% | ≥ 70% |`,
  `| Maior parcela de uma só alcunha final | ${((100 * maior) / N).toFixed(1)}% | ≤ 20% |`,
  `| Alcunhas nunca alcançadas como final | ${nunca.length} de ${PK.alcunhas.length} | 0 |`,
  `| Mudanças de alcunha por vida (entre as que nasceram) | ${(mudancas / Math.max(1, nasceu)).toFixed(2)} | — |`,
  `| Idade média em que a primeira alcunha nasce | ${(nascAge / Math.max(1, nasceu)).toFixed(0)} anos | — |`,
  `| Variedade de alcunhas dentro da mesma trilha (1 − Σp², média) | ${(diversas / Math.max(1, pares)).toFixed(2)} | alta |`,
  `| Cenas de alcunha por 100 vidas (nasce / muda / perde / reação) | ${['nasce', 'muda', 'perde', 'reacao'].map((t) => ((100 * (cenasPorTipo[t] ?? 0)) / N).toFixed(0)).join(' / ')} | — |`, '',
  '## Alcunhas finais', '', '| Alcunha | Vidas | % | Cenas de reação escritas | Vistas (vidas) |', '|---|---:|---:|---:|---:|',
  ...linhas.map((l) => `| ${nomes[l.a.id]} | ${l.n} | ${((100 * l.n) / N).toFixed(1)}% | ${l.a.reacoes.length} | ${reacoesVistas[l.a.id] ?? 0} |`),
  `| (nenhuma) | ${final['(nenhuma)'] ?? 0} | ${((100 * (final['(nenhuma)'] ?? 0)) / N).toFixed(1)}% | — | — |`, '',
];
writeFileSync(`docs/alcunhas-${MODO}.md`, md.join('\n'));
console.log(md.slice(0, 16).join('\n'));
console.log('nunca:', nunca.map((l) => l.a.id).join(', '));
