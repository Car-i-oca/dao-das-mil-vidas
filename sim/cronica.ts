/**
 * Narra uma vida do jogo atual, evento a evento (para ler como história):
 *   npx tsx sim/cronica.ts varrer 60        lista sementes com trilha, traços, nº de eventos e final
 *   npx tsx sim/cronica.ts <semente> [máx]  imprime a crônica (por padrão os primeiros 40 passos e o final)
 */
import { Rng } from '../src/engine/rng';
import { newMeta, rollCreation, startLife, view, choose, proceed, PATH, TALENT, FLAW, ORIGIN, ENDING, realmOf } from '../src/engine/engine';
import { botPick } from './bot';

function jogar(seed: number, max = 40, imprimir = true) {
  const meta = newMeta();
  const rng = new Rng(seed);
  const s = startLife(meta, rollCreation(meta, rng), '', rng.seed);
  const bot = new Rng(seed ^ 0x9e3779b9);
  const passos: { age: number; reino: string; titulo: string; texto: string; escolha: string; resultado: string }[] = [];
  let guard = 0;
  while (!s.ending && guard++ < 5000) {
    const v = view(s);
    if (v.kind === 'event') {
      const i = botPick(s, bot, false);
      const escolha = v.choices[i]?.text ?? '';
      const reino = realmOf(s).name;
      const idade = Math.floor(s.age);
      choose(s, i, rng);
      passos.push({ age: idade, reino, titulo: v.title, texto: v.text, escolha, resultado: view(s).text });
    }
    if (s.ending) break;
    proceed(s, rng);
  }
  const traços = `${s.name} · ${PATH[s.path]?.name ?? 'sem trilha'} · talento ${TALENT[s.talent]?.name} · defeito ${FLAW[s.flaw]?.name} · origem ${ORIGIN[s.origin]?.name}`;
  if (imprimir) {
    console.log(`# ${traços}\n`);
    const corte = (t: string, n = 330) => (t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + '…' : t);
    const mostrar = passos.length > max + 6 ? [...passos.slice(0, max), null, ...passos.slice(-5)] : passos;
    mostrar.forEach((p, k) => {
      if (!p) { console.log(`\n_[… ${passos.length - max - 5} eventos omitidos …]_\n`); return; }
      console.log(`**${k + 1}. Ano ${p.age} · ${p.reino} · ${p.titulo}**\n${corte(p.texto)}\n→ _${p.escolha}_\n${corte(p.resultado, 260)}\n`);
    });
    console.log(`**Final (ano ${Math.floor(s.age)}, ${passos.length} eventos): ${ENDING[s.ending!]?.name}**\n${s.endingText ?? ''}`);
  }
  return { traços, n: passos.length, fim: ENDING[s.ending!]?.name ?? s.ending, path: s.path, idade: Math.floor(s.age) };
}

const [a, b] = process.argv.slice(2);
if (a === 'varrer') {
  const n = Number(b ?? 60);
  for (let sd = 1; sd <= n; sd++) { const r = jogar(sd, 0, false); console.log(`${sd}\t${r.n} ev\t${r.idade} anos\t${r.fim}\t${r.traços}`); }
} else jogar(Number(a ?? 1), Number(b ?? 40));
