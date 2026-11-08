/** Crônicas curtas das alcunhas: mostra, em 3 vidas por modo, a alcunha nascendo, sendo usada e mudando. Grava docs/cronicas-alcunhas.md */
import { writeFileSync } from 'node:fs';
import { Rng } from '../src/engine/rng';
import { newMeta, rollCreation, startLife, view, choose, proceed } from '../src/engine/engine';
import { botPick } from './bot';
import { MODOS, pacoteDe } from '../src/data/modos';
import { textoAlcunha } from '../src/engine/alcunhas';

const out: string[] = ['# Crônicas das alcunhas', '', 'Trechos de vidas simuladas (`npx tsx sim/cronica-alcunhas.ts`): só as cenas em que a alcunha aparece. O robô aceita o nome na maioria das vezes.', ''];
for (const modo of MODOS) {
  out.push(`## ${pacoteDe(modo).nome}`, '');
  let achadas = 0;
  for (let i = 0; i < 400 && achadas < 3; i++) {
    const rng = new Rng(2200 + i * 41);
    const s = startLife(newMeta(), rollCreation(newMeta(), rng, modo), '', rng.seed);
    const bot = new Rng(i + 9);
    const trecho: string[] = [];
    let g = 0, tipos = new Set<string>();
    while (!s.ending && g++ < 6000) {
      const v = view(s);
      if (v.kind === 'event') {
        const al = s.current?.alc;
        const ab = v.choices.map((_, k) => k).filter((k) => !v.choices[k].disabled);
        const k = al ? botPick(s, bot, false) : ab.length ? bot.pick(ab) : 0;
        if (al) {
          tipos.add(al.tipo);
          trecho.push(`**${Math.floor(s.age)} anos · ${v.title}**\n\n${v.text}\n\n→ _${v.choices[k]?.text}_`);
        }
        choose(s, k, rng);
        if (al && s.result) trecho.push(`${s.result.text}\n`);
      }
      if (s.ending) break;
      proceed(s, rng);
    }
    if (tipos.has('nasce') && tipos.has('reacao') && trecho.length >= 4 && (achadas < 2 || tipos.has('muda'))) {
      achadas++;
      out.push(`### Vida ${achadas} · ${s.name} · alcunha final: ${textoAlcunha(s) || '(nenhuma)'}`, '', trecho.slice(0, 8).join('\n\n'), '');
    }
  }
}
writeFileSync('docs/cronicas-alcunhas.md', out.join('\n'));
console.log('docs/cronicas-alcunhas.md', out.length, 'blocos');
