import type { GameEvent, State } from '../types';
import { FOE, PATH_MOVES, foeFor } from '../data/combates';
import { TECHNIQUES } from '../data/techniques';
import { Rng } from './rng';

/**
 * Roteiro de combate: encena, em golpes, um teste de combate que o motor JÁ resolveu.
 * Puro (sem DOM) e determinístico; usa um gerador próprio, então não altera o sorteio do jogo.
 */
export interface Beat {
  /** 'p' = jogador, 'f' = oponente. */
  a: 'p' | 'f';
  mov: string;
  /** Golpe com técnica do jogador (mostra o nome em destaque). */
  tec?: boolean;
  /** Dano em % da vida de quem apanha. */
  dano: number;
  crit?: boolean;
  /** O alvo desviou (sem dano). */
  esq?: boolean;
}

export interface CombatScript {
  foe: string;
  foeName: string;
  scene: string;
  vitoria: boolean;
  beats: Beat[];
  /** Vida final (%) do jogador e do oponente. */
  fim: { p: number; f: number };
  /** Frase do desfecho do oponente quando ele perde. */
  fraseFim: string;
  path: string;
  tier: number;
}

const TECH = Object.fromEntries(TECHNIQUES.map((t) => [t.id, t]));

/** Nomes de golpes do jogador: técnicas de combate conhecidas primeiro, depois os da trilha. */
function playerMoves(s: State): { name: string; tec: boolean }[] {
  const tec = s.techniques.filter((id) => TECH[id]?.tags?.some((t) => ['combate', 'espada', 'corpo', 'veneno', 'demonio', 'besta'].includes(t))).map((id) => ({ name: TECH[id].name, tec: true }));
  const base = (PATH_MOVES[s.path] ?? PATH_MOVES['']).map((name) => ({ name, tec: false }));
  return [...tec, ...base];
}

export function buildCombat(s: State, ev: GameEvent, success: boolean, ferida: number): CombatScript {
  const rng = new Rng((s.seed ^ (s.turn * 2654435761)) >>> 0);
  const foeId = foeFor(ev.id, ev.title, ev.text, ev.combate?.oponente);
  const foe = FOE[foeId];
  const mine = playerMoves(s);
  const nP = success ? rng.int(3, 5) : rng.int(2, 3);
  const nF = success ? rng.int(1, 2) : rng.int(2, 4);
  const pFim = success ? Math.max(12, 100 - Math.round(ferida * 14) - rng.int(0, 12)) : Math.max(6, Math.min(40, 100 - Math.round(ferida * 20)));
  const fFim = success ? 0 : rng.int(25, 65);

  const split = (total: number, n: number): number[] => {
    const w = Array.from({ length: n }, () => 0.6 + rng.next());
    const sum = w.reduce((a, b) => a + b, 0);
    return w.map((x) => Math.max(4, Math.round((x / sum) * total)));
  };
  const dmgF = split(100 - fFim, nP);   // dano que o oponente sofre
  const dmgP = split(100 - pFim, nF);   // dano que o jogador sofre

  const seq: ('p' | 'f')[] = [];
  let ip = 0, iF = 0;
  while (ip < nP || iF < nF) {
    const wantF = iF < nF && (ip >= nP || (seq.length % 2 === 1 && rng.chance(0.75)) || rng.chance(0.2));
    if (wantF) { seq.push('f'); iF++; } else { seq.push('p'); ip++; }
  }
  // O desfecho fecha a cena: golpe final do vencedor.
  const wantLast = success ? 'p' : 'f';
  if (seq[seq.length - 1] !== wantLast) { const k = seq.lastIndexOf(wantLast); if (k >= 0) { seq.splice(k, 1); seq.push(wantLast); } }

  let kp = 0, kf = 0, usedTec = 0;
  const beats: Beat[] = seq.map((a, idx) => {
    const last = idx === seq.length - 1;
    if (a === 'p') {
      const useTec = mine.some((m) => m.tec) && (kp === 0 || rng.chance(0.55));
      const pool = useTec ? mine.filter((m) => m.tec) : mine.filter((m) => !m.tec).length ? mine.filter((m) => !m.tec) : mine;
      const mv = pool[(usedTec + kp) % pool.length];
      if (useTec) usedTec++;
      const d = dmgF[kp++];
      return { a, mov: mv.name, tec: mv.tec, dano: d, crit: last && success };
    }
    const d = dmgP[kf++];
    const mov = last && !success ? foe.finisher : foe.moves[(kf + idx) % foe.moves.length];
    return { a, mov, dano: d, crit: last && !success, esq: false };
  });
  // Um desvio do jogador para dar ritmo, quando há mais de um golpe do oponente.
  const fi = beats.findIndex((b, i) => b.a === 'f' && i < beats.length - 1 && !b.crit);
  if (fi >= 0 && nF >= 2 && rng.chance(0.6)) { beats[fi].esq = true; beats[fi].dano = 0; }

  return { foe: foeId, foeName: foe.name, scene: ev.combate?.cenario ?? foe.scene, vitoria: success, beats, fim: { p: pFim, f: fFim }, fraseFim: foe.down, path: s.path, tier: s.tier };
}
