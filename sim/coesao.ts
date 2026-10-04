/**
 * Relatório de coesão da v2 (números de APOIO; a decisão é ler as crônicas): npm run coesao -- 60
 * Grava docs/coesao.md: fios abertos e resolvidos por vida, reaparições de pessoas importantes, relevância contra respiro,
 * moldes nunca escolhidos e divergência entre vidas pareadas (mesma semente, primeira escolha diferente).
 */
import { writeFileSync } from 'node:fs';
import { jogarV2 } from './cronica2';
import { MOLDES } from '../src/data/v2/index';

const N = Number(process.argv.slice(2).find((a) => /^\d+$/.test(a)) ?? 60);
const tipoDe: Record<string, string> = Object.fromEntries(MOLDES.map((m) => [m.id, m.tipo]));
const total = { vidas: 0, cenas: 0, fiosAbertos: 0, fiosResolvidos: 0, fiosAbandonados: 0, ambicao: 0, ambicaoCumprida: 0 };
const porTipo: Record<string, number> = {};
const usados = new Set<string>();
const reaparicoes: number[] = [];
const desfechos: Record<string, number> = {};
const finais: Record<string, number> = {};
for (let seed = 1; seed <= N; seed++) {
  const r = jogarV2(seed, 0, false);
  total.vidas++; total.cenas += r.n;
  r.molde.forEach((m) => { usados.add(m); const t = tipoDe[m] ?? (m.startsWith('__') ? 'sistema' : 'outro'); porTipo[t] = (porTipo[t] ?? 0) + 1; });
  for (const f of r.v2.mundo.fios) {
    total.fiosAbertos++;
    if (f.estado === 'resolvido') { total.fiosResolvidos++; desfechos[`${f.id}:${f.desfecho}`] = (desfechos[`${f.id}:${f.desfecho}`] ?? 0) + 1; }
    else if (f.estado === 'abandonado') total.fiosAbandonados++;
  }
  if (r.v2.ambicao.historico.length || r.v2.ambicao.atual) total.ambicao++;
  if (r.v2.ambicao.historico.some((h) => h.desfecho === 'cumprida')) total.ambicaoCumprida++;
  finais[r.fim as string] = (finais[r.fim as string] ?? 0) + 1;
  // reaparições: quantas cenas cada pessoa importante teve
  const cont: Record<string, number> = {};
  r.aparicoes.forEach((a) => a.ids.forEach((id) => { if (id.startsWith('p')) cont[id] = (cont[id] ?? 0) + 1; }));
  for (const p of Object.values(r.v2.mundo.pessoas)) if (p.importante || p.papeis.length) reaparicoes.push(cont[p.id] ?? 0);
}
// divergência causal: mesma semente, primeira escolha diferente → quantas cenas depois dos 20 anos diferem
const dif: number[] = [];
for (let seed = 1; seed <= Math.min(N, 30); seed++) {
  const a = jogarV2(seed, 0, false, 0), b = jogarV2(seed, 0, false, 1);
  const A = new Set(a.aparicoes.filter((x) => x.ano > 20).map((x) => x.molde)), B = b.aparicoes.filter((x) => x.ano > 20).map((x) => x.molde);
  if (B.length) dif.push(B.filter((m) => !A.has(m)).length / B.length);
}
const pct = (x: number, y: number) => (y ? `${((100 * x) / y).toFixed(0)}%` : '0%');
const media = (l: number[]) => (l.length ? (l.reduce((a, b) => a + b, 0) / l.length).toFixed(2) : '0');
const nunca = MOLDES.filter((m) => !usados.has(m.id)).map((m) => m.id);
const sorted = (o: Record<string, number>) => Object.entries(o).sort((a, b) => b[1] - a[1]);
const md = `# Relatório de coesão da v2

Gerado por \`npm run coesao -- ${N}\`. **Números de apoio, não metas**: a decisão de qualidade é ler as crônicas em \`docs/cronicas/\`.

| Métrica | Valor |
|---|---|
| Vidas simuladas | ${total.vidas} |
| Cenas por vida (média) | ${(total.cenas / total.vidas).toFixed(0)} |
| Fios abertos por vida | ${(total.fiosAbertos / total.vidas).toFixed(1)} |
| Fios resolvidos (com desfecho) | ${pct(total.fiosResolvidos, total.fiosAbertos)} dos abertos |
| Fios abandonados (o diretor os encerrou como esquecidos) | ${pct(total.fiosAbandonados, total.fiosAbertos)} |
| Vidas em que uma ambição foi forjada | ${pct(total.ambicao, total.vidas)} |
| Vidas com ambição cumprida | ${pct(total.ambicaoCumprida, total.vidas)} |
| Reaparições por pessoa importante (média de cenas em que aparece) | ${media(reaparicoes)} |
| Pessoas importantes que nunca reapareceram | ${pct(reaparicoes.filter((x) => x <= 1).length, reaparicoes.length)} |
| Divergência entre vidas pareadas (cenas depois dos 20 anos que a outra vida não teve) | ${pct(Math.round(dif.reduce((a, b) => a + b, 0) * 100), Math.round(dif.length * 100))} |

## De onde vêm as cenas
${sorted(porTipo).map(([k, v]) => `- ${k}: ${pct(v, total.cenas)}`).join('\n')}

## Desfechos dos fios
${sorted(desfechos).map(([k, v]) => `- ${k}: ${v}`).join('\n')}

## Finais
${sorted(finais).map(([k, v]) => `- ${k}: ${pct(v, total.vidas)}`).join('\n')}

## Moldes nunca escolhidos nestas ${N} vidas (${nunca.length} de ${MOLDES.length})
${nunca.length ? nunca.map((x) => `\`${x}\``).join(', ') : 'nenhum'}
`;
writeFileSync('docs/coesao.md', md);
console.log(md);
