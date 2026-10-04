/**
 * Crônica de uma vida da v2 (mundo com memória), em texto corrido:
 *   npx tsx sim/cronica2.ts <semente> [máx-cenas]    imprime a crônica
 *   npx tsx sim/cronica2.ts varrer <n>               lista sementes (traços, ambição, fios, final)
 */
import { Rng } from '../src/engine/rng';
import { newMeta, rollCreation, startLife, view, choose, proceed, PATH, TALENT, FLAW, ORIGIN, ENDING, realmOf } from '../src/engine/engine';
import { botPick } from './bot';
import { CAPITULO_NOME, CONTADOR_NOME } from '../src/engine/v2/diretor';
import type { State } from '../src/types';

export function jogarV2(seed: number, max = 9999, imprimir = true) {
  const meta = newMeta();
  const rng = new Rng(seed);
  const s = startLife(meta, rollCreation(meta, rng), '', rng.seed, { v2: true });
  const bot = new Rng(seed ^ 0x9e3779b9);
  const cena: string[] = [];
  const molde: string[] = [];
  let n = 0, guard = 0;
  const corte = (t: string, k = 420) => (t.length > k ? t.slice(0, k).replace(/\s+\S*$/, '') + '…' : t);
  while (!s.ending && guard++ < 4000) {
    const v = view(s);
    if (v.kind === 'event') {
      const i = botPick(s, bot, false);
      const escolha = v.choices[i]?.text ?? '';
      const d = s.v2!.diretor;
      const idade = Math.floor(s.age);
      molde.push(s.current?.v2?.molde ?? s.current?.id ?? '?');
      if (n < max && imprimir) {
        let o = '';
        if (v.cartao) o += `\n### ${v.cartao}\n\n`;
        if (v.noticias?.length) o += v.noticias.map((x) => `_Notícia: ${x}_`).join('\n') + '\n\n';
        o += `**${n + 1}. Ano ${idade} · ${realmOf(s).name} · ${d.fase} (tensão ${d.tensao.toFixed(2)}) · ${v.title}**\n${corte(v.text)}\n→ _${escolha}_`;
        cena.push(o);
      }
      choose(s, i, rng);
      if (n < max && imprimir) cena[cena.length - 1] += `\n${corte(view(s).text, 320)}\n`;
      n++;
    }
    if (s.ending) break;
    proceed(s, rng);
  }
  const v2 = s.v2!;
  const traços = `${s.name} · ${PATH[s.path]?.name ?? 'sem trilha'} · talento ${TALENT[s.talent]?.name} · defeito ${FLAW[s.flaw]?.name} · origem ${ORIGIN[s.origin]?.name}`;
  if (imprimir) {
    console.log(`# ${traços}\n`);
    console.log(`Ferida de origem: ${v2.mundo.ferida.tipo} (culpado: ${v2.mundo.pessoas[v2.mundo.ferida.culpado]?.nome}). Contador inicial: ${CONTADOR_NOME[v2.diretor.contador]}.\n`);
    console.log(cena.join('\n'));
    console.log(`\n---\n**Final (ano ${Math.floor(s.age)}, ${n} cenas): ${ENDING[s.ending!]?.name}**\n${s.endingText ?? ''}\n`);
    console.log(`**Ambições:** ${v2.ambicao.historico.map((h) => `${h.id} (${h.desfecho}, ano ${h.desde} a ${h.ate})`).join('; ') || 'nenhuma encerrada'}${v2.ambicao.atual ? `; em curso: ${v2.ambicao.atual.id} etapa ${v2.ambicao.atual.etapa}` : ''}`);
    console.log(`**Fios:** ${v2.mundo.fios.map((f) => `${f.id}:${f.estado}${f.desfecho ? '/' + f.desfecho : ''}(etapa ${f.etapa})`).join(', ') || 'nenhum'}`);
    const imp = Object.values(v2.mundo.pessoas).filter((p) => p.importante || p.papeis.length);
    console.log(`**Pessoas importantes:** ${imp.map((p) => `${p.nome} [${p.papeis.join(',')}] reino ${p.reino} op ${Math.round(p.opiniao)}${p.vivo ? '' : ' †' + (p.morte?.ano ?? '')} fatos:${p.memoria.map((f) => f.tipo).join('|') || '-'}`).join('\n  - ')}`);
    console.log(`**Capítulo final:** ${CAPITULO_NOME[v2.diretor.capitulo]}; pessoas no mundo: ${Object.keys(v2.mundo.pessoas).length}; facções: ${Object.values(v2.mundo.faccoes).filter((f) => f.estado !== 'extinta').length}/${Object.keys(v2.mundo.faccoes).length}`);
  }
  return { s, traços, n, molde, fim: ENDING[s.ending!]?.name ?? s.ending, v2 };
}

const [a, b] = process.argv.slice(2);
if (process.argv[1]?.includes('cronica2')) {
  if (a === 'varrer') {
    const n = Number(b ?? 20);
    for (let sd = 1; sd <= n; sd++) {
      const r = jogarV2(sd, 0, false);
      const amb = r.v2.ambicao.historico.map((h) => `${h.id}:${h.desfecho}`).join(',') + (r.v2.ambicao.atual ? `;atual:${r.v2.ambicao.atual.id}` : '');
      const fios = r.v2.mundo.fios.map((f) => `${f.id}:${f.desfecho ?? f.estado}`).join(',');
      console.log(`${sd}\t${r.n} cenas\t${Math.floor((r.s as State).age)}a\t${r.fim}\t${amb || '-'}\t${fios || '-'}\t${r.traços}`);
    }
  } else jogarV2(Number(a ?? 1), Number(b ?? 9999));
}
