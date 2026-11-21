/* Testes do save (src/ui/save.ts): versão, migração de saves antigos e dado corrompido.
 * Uso: npm test  (sai com código 1 se algum caso falhar) */
import assert from 'node:assert/strict';
import { Rng } from '../src/engine/rng';
import { newMeta, rollCreation, startLife, view, choose, proceed, pickNext } from '../src/engine/engine';
import { botPick } from './bot';
import { pacoteDe, MODOS } from '../src/data/modos';
import { lerSave, normSettings, vidaValida, SAVE_VERSION, carregarSave, gravarSave, SAVE_KEY, SAVE_KEY_CORROMPIDO, type Armazenamento } from '../src/ui/save';
import type { State } from '../src/types';

let ok = 0;
const casos: [string, () => void][] = [];
const caso = (nome: string, f: () => void) => casos.push([nome, f]);

function vida(modo: (typeof MODOS)[number], seed = 4242): State {
  const meta = newMeta();
  const rng = new Rng(seed);
  const trilha = pacoteDe(modo).trilhas.find((t) => !t.unlock)!;
  return startLife(meta, rollCreation(meta, rng, modo), trilha.id, rng.seed);
}

caso('vazio ou ausente → save novo, sem marcar corrompido', () => {
  for (const raw of [null, undefined, '']) {
    const r = lerSave(raw);
    assert.equal(r.corrompido, false);
    assert.equal(r.save.saveVersion, SAVE_VERSION);
    assert.equal(r.save.run, null);
  }
});

caso('JSON inválido ou sem meta → save novo e corrompido', () => {
  for (const raw of ['{', 'null', '42', '[]', '{"run":null}', '"texto"']) {
    const r = lerSave(raw);
    assert.equal(r.corrompido, true, raw);
    assert.deepEqual(r.save.meta, newMeta());
  }
});

caso('v0 (sem saveVersion, vida sem modo) → migra para Murim e mantém o Legado', () => {
  const run = vida('murim') as Partial<State>;
  delete run.modo;
  const antigo = { meta: { legacy: 37, lives: 4, achievements: ['a1'], upgrades: { vigor: 2 }, best: null, endingsSeen: ['x'], history: [] }, run, settings: { speed: 1 } };
  const r = lerSave(JSON.stringify(antigo));
  assert.equal(r.versaoOriginal, 0);
  assert.equal(r.corrompido, false);
  assert.equal(r.save.saveVersion, SAVE_VERSION);
  assert.equal(r.save.run?.modo, 'murim');
  assert.equal(r.save.meta.legacy, 37);
  assert.deepEqual(r.save.meta.upgrades, { vigor: 2 });
  assert.deepEqual(r.save.meta.codex, { items: [] }, 'campo novo da meta ganha padrão');
  assert.equal(r.save.settings.speed, 1);
  assert.equal(r.save.settings.estilo, 'manhwa');
  view(r.save.run!); // a vida migrada continua jogável
});

caso('ida e volta nos dois modos preserva a vida', () => {
  for (const modo of MODOS) {
    const run = vida(modo, 777);
    const r = lerSave(JSON.stringify({ saveVersion: SAVE_VERSION, meta: newMeta(), run, settings: normSettings({ modo }) }));
    assert.equal(r.corrompido, false, modo);
    assert.deepEqual(r.save.run, JSON.parse(JSON.stringify(run)), modo);
    view(r.save.run!);
  }
});

caso('nenhum estado real de jogo é descartado (bot joga 30 vidas por modo, salvando a cada passo)', () => {
  let passos = 0, finais = 0;
  for (const modo of MODOS) {
    for (let i = 0; i < 30; i++) {
      const seed = 9100 + i * 7919;
      const s = vida(modo, seed);
      const rng = new Rng(seed ^ 0x5bd1e995);
      for (let g = 0; g < 4000; g++) {
        const copia = JSON.parse(JSON.stringify(s));
        assert.ok(vidaValida(copia), `${modo} seed ${seed} passo ${g}: ${JSON.stringify(s.current)} result=${!!s.result}`);
        passos++;
        if (s.ending) { finais++; break; }
        if (view(s).kind === 'event') choose(s, botPick(s, rng, false), rng);
        else proceed(s, rng);
      }
    }
  }
  assert.ok(finais >= 50 && passos > 2000, `cobertura baixa: ${finais} finais, ${passos} passos`);
});

caso('vida quebrada é descartada, mas o Legado fica', () => {
  const quebras: ((s: Record<string, unknown>) => void)[] = [
    (s) => { delete s.stats; },
    (s) => { s.flags = 'x'; },
    (s) => { s.path = 'escola_que_nao_existe'; },
    (s) => { s.modo = 'cyberpunk'; },
    (s) => { s.age = 'velho'; },
    (s) => { s.current = { id: 5 }; },
    (s) => { s.current = { id: 'evento_removido_numa_atualizacao' }; },
    (s) => { s.current = null; s.result = null; s.ending = null; },
    (s) => { s.ending = 'final_que_nao_existe'; },
    (s) => { s.result = { texto: 'sem text' }; },
  ];
  for (const q of quebras) {
    const run = vida('xianxia') as unknown as Record<string, unknown>;
    q(run);
    const r = lerSave(JSON.stringify({ saveVersion: SAVE_VERSION, meta: { ...newMeta(), legacy: 90 }, run }));
    assert.equal(r.vidaDescartada, true, q.toString());
    assert.equal(r.corrompido, true);
    assert.equal(r.save.run, null);
    assert.equal(r.save.meta.legacy, 90);
  }
});

caso('meta com tipos errados volta ao padrão campo a campo', () => {
  const r = lerSave(JSON.stringify({ meta: { legacy: 'muito', lives: -3, achievements: [1, 'ok'], upgrades: { a: 'x', b: 3 }, codex: 7, history: [] } }));
  assert.equal(r.save.meta.legacy, 0);
  assert.equal(r.save.meta.lives, 0);
  assert.deepEqual(r.save.meta.achievements, ['ok']);
  assert.deepEqual(r.save.meta.upgrades, { b: 3 });
  assert.deepEqual(r.save.meta.codex, { items: [] });
  assert.equal(r.corrompido, true);
});

caso('configurações fora da faixa voltam ao padrão', () => {
  const s = normSettings({ speed: 9, font: 'g', difficulty: 2.5, theme: 'neon', estilo: 'aquarela', intro: 'sim', modo: 'xianxia' });
  assert.deepEqual(s, { modo: 'xianxia', estilo: 'manhwa', speed: 2, theme: 'auto', font: 1, intro: false, difficulty: 0 });
  assert.equal(normSettings({ difficulty: -1, font: 2, speed: 0 }).difficulty, -1);
});

caso('motor: Xianxia sem trilha no topo da escada provisória não rompe (antes virava Ascensão)', () => {
  const s = vida('xianxia');
  Object.assign(s, { path: '', tier: 1, xp: 500, age: 60, ending: undefined, current: undefined });
  delete s.seen['__break'];
  pickNext(s, new Rng(7));
  assert.notEqual(s.current?.id, '__break');
  assert.notEqual(s.ending, 'ascensao');
  const c = vida('xianxia');
  Object.assign(c, { tier: 1, xp: 500, age: 60, ending: undefined, current: undefined });
  delete c.seen['__break'];
  pickNext(c, new Rng(7));
  assert.equal(c.current?.id, '__break', 'com trilha o rompimento continua aparecendo');
});

/** Storage falso: guarda em memória; `cheio` faz setItem lançar como QuotaExceededError. */
function armFalso(inicial: Record<string, string> = {}, cheio = false): Armazenamento & { dados: Record<string, string> } {
  const dados = { ...inicial };
  return {
    dados,
    getItem: (k) => dados[k] ?? null,
    setItem: (k, v) => { if (cheio) throw new Error('QuotaExceededError'); dados[k] = v; },
  };
}

caso('armazenamento: grava e reabre o mesmo save', () => {
  const arm = armFalso();
  const s = lerSave(null).save;
  s.meta.legacy = 77;
  s.run = vida('murim');
  assert.equal(gravarSave(s, arm), true);
  const r = carregarSave(arm);
  assert.equal(r.corrompido, false);
  assert.equal(r.save.meta.legacy, 77);
  assert.equal(r.save.run?.name, s.run.name);
});

caso('armazenamento: texto ilegível é copiado à parte antes de ser sobrescrito', () => {
  const arm = armFalso({ [SAVE_KEY]: '{"meta": {"legacy": 5' });
  const r = carregarSave(arm);
  assert.equal(r.corrompido, true);
  assert.equal(arm.dados[SAVE_KEY_CORROMPIDO], '{"meta": {"legacy": 5');
  assert.equal(r.save.run, null);
});

caso('armazenamento: aparelho cheio ou sem storage não derruba o jogo', () => {
  const s = lerSave(null).save;
  assert.equal(gravarSave(s, armFalso({}, true)), false);
  assert.equal(gravarSave(s, null), false);
  const quebrado: Armazenamento = { getItem: () => { throw new Error('SecurityError'); }, setItem: () => { throw new Error('SecurityError'); } };
  const r = carregarSave(quebrado);
  assert.equal(r.corrompido, false);
  assert.equal(r.save.saveVersion, SAVE_VERSION);
  assert.equal(carregarSave(null).save.run, null);
});

for (const [nome, f] of casos) {
  try { f(); ok++; console.log(`  ✓ ${nome}`); } catch (e) { console.error(`  ✗ ${nome}\n    ${(e as Error).message}`); }
}
console.log(`${ok === casos.length ? '✓' : '✗'} save: ${ok}/${casos.length} casos`);
if (ok !== casos.length) process.exit(1);
