import type { GameEvent, State } from '../types';
import { FOE, PATH_MOVES, foeFor } from '../data/combates';
import { TECHNIQUES } from '../data/techniques';
import { Rng } from './rng';

/**
 * Roteiro de combate: encena, em golpes, um teste de combate que o motor JÁ resolveu.
 * Puro (sem DOM) e determinístico; usa um gerador próprio, então não altera o sorteio do jogo.
 * A barra de vida e o desfecho são coerentes: quem perde chega a um ponto baixo que justifica o final.
 */
export interface Beat {
  /** 'p' = jogador, 'f' = oponente. */
  a: 'p' | 'f';
  mov: string;
  /** Golpe com técnica do jogador (mostra o nome em destaque). */
  tec?: boolean;
  /** Id da técnica usada (para o efeito visual próprio). */
  tid?: string;
  /** Efeito visual: espada, corpo, qi, mente, formacao, veneno, besta, demonio, alquimia, forja, fuga, golpe. */
  fx?: string;
  /** Dano em % da vida de quem apanha. */
  dano: number;
  crit?: boolean;
  /** O alvo desviou (sem dano). */
  esq?: boolean;
}

export type Desfecho = 'vitoria' | 'derrota' | 'fuga' | 'salvo';

export interface CombatScript {
  foe: string;
  foeName: string;
  scene: string;
  vitoria: boolean;
  desfecho: Desfecho;
  beats: Beat[];
  /** Vida final (%) do jogador e do oponente. */
  fim: { p: number; f: number };
  /** Frase do desfecho do oponente quando ele perde. */
  fraseFim: string;
  path: string;
  tier: number;
  /** Selo da opção exclusiva que levou à luta (trilha, talento, defeito, técnica...), se houver. */
  selo?: string;
}

const TECH = Object.fromEntries(TECHNIQUES.map((t) => [t.id, t]));
const FX_TAGS = ['espada', 'corpo', 'veneno', 'demonio', 'besta', 'formacao', 'mente', 'alquimia', 'forja', 'fuga', 'qi', 'combate'];
const PATH_FX: Record<string, string> = { espada: 'espada', corpo: 'corpo', sopro: 'qi', alquimia: 'alquimia', alma: 'mente', formacoes: 'formacao', budista: 'corpo', venenos: 'veneno', bestas: 'besta', demoniaca: 'demonio' };

interface Move { name: string; tec: boolean; tid?: string; fx: string }

/** Golpes do jogador: técnicas que ele realmente tem (cada uma com efeito próprio) e, depois, os da trilha. */
function playerMoves(s: State): Move[] {
  const tec: Move[] = s.techniques
    .map((id) => TECH[id])
    .filter((t) => t && t.tags?.some((x) => FX_TAGS.includes(x)))
    .map((t) => ({ name: t.name, tec: true, tid: t.id, fx: FX_TAGS.find((x) => t.tags!.includes(x) && x !== 'combate') ?? 'golpe' }));
  const base: Move[] = (PATH_MOVES[s.path] ?? PATH_MOVES['']).map((name) => ({ name, tec: false, fx: PATH_FX[s.path] ?? 'golpe' }));
  return [...tec, ...base];
}

export function buildCombat(s: State, ev: GameEvent, success: boolean, ferida: number, selo?: string, activeTechnique?: string): CombatScript {
  const rng = new Rng((s.seed ^ (s.turn * 2654435761)) >>> 0);
  const foeId = foeFor(ev.id, ev.title, ev.text, ev.combate?.oponente);
  const foe = FOE[foeId];
  const mine = playerMoves(s);
  const tecs = activeTechnique ? mine.filter((m) => m.tid === activeTechnique) : mine.filter((m) => m.tec);
  const bases = mine.filter((m) => !m.tec);

  // 6 a 12 golpes, com idas e vindas. Quem vence dá mais golpes; quem perde apanha mais.
  const total = rng.int(6, 12);
  const nP = Math.max(2, Math.min(total - 2, success ? Math.round(total * 0.58) : Math.round(total * 0.4)));
  const nF = total - nP;

  // Desfecho coerente com o resultado do teste e com os ferimentos.
  let desfecho: Desfecho = 'vitoria';
  if (!success) desfecho = ferida >= 3 ? (rng.chance(0.55) ? 'derrota' : 'salvo') : ferida >= 1 ? (rng.chance(0.6) ? 'fuga' : 'derrota') : 'fuga';
  // Vida final: vencedor termina com o que sobrou; perdedor cai até um ponto baixo que justifica o recuo.
  const pFim = success ? Math.max(18, 100 - Math.round(ferida * 13) - rng.int(4, 24)) : desfecho === 'derrota' ? rng.int(0, 6) : rng.int(7, 20);
  const fFim = success ? 0 : rng.int(20, 70);

  // Quais golpes do oponente são desviados (não contam para o dano).
  const nEsq = nF >= 4 ? rng.int(1, 2) : nF === 3 ? 1 : 0;
  const hitF = nF - nEsq;

  const split = (totalDmg: number, n: number): number[] => {
    if (n <= 0) return [];
    const w = Array.from({ length: n }, () => 0.6 + rng.next());
    const sum = w.reduce((a, b) => a + b, 0);
    const out = w.map((x) => Math.max(3, Math.round((x / sum) * totalDmg)));
    // Ajusta o último para a soma bater exatamente com o dano total.
    const diff = totalDmg - out.reduce((a, b) => a + b, 0);
    out[out.length - 1] = Math.max(1, out[out.length - 1] + diff);
    return out;
  };
  const dmgF = split(100 - fFim, nP);   // dano que o oponente sofre
  const dmgP = split(100 - pFim, hitF); // dano que o jogador sofre

  // Ordem alternada com variações; o último golpe é do vencedor.
  const seq: ('p' | 'f')[] = [];
  let ip = 0, iF = 0;
  while (ip < nP || iF < nF) {
    const last = seq[seq.length - 1];
    const wantF = iF < nF && (ip >= nP || (last === 'p' && rng.chance(0.7)) || (last === 'f' && rng.chance(0.28)));
    if (wantF) { seq.push('f'); iF++; } else { seq.push('p'); ip++; }
  }
  const wantLast = success ? 'p' : 'f';
  if (seq[seq.length - 1] !== wantLast) { const k = seq.lastIndexOf(wantLast); if (k >= 0) { seq.splice(k, 1); seq.push(wantLast); } }

  // Escolhe quais golpes do oponente serão desviados (nunca o último).
  const fIdx = seq.map((a, i) => (a === 'f' && i < seq.length - 1 ? i : -1)).filter((i) => i >= 0);
  const esqSet = new Set<number>();
  while (esqSet.size < Math.min(nEsq, fIdx.length)) esqSet.add(fIdx[rng.int(0, fIdx.length - 1)]);

  let kp = 0, kf = 0, ti = 0, bi = 0;
  const beats: Beat[] = seq.map((a, idx) => {
    const last = idx === seq.length - 1;
    if (a === 'p') {
      // Usa as técnicas aprendidas em rodízio (a primeira sempre aparece); alterna com golpes da trilha.
      const useTec = tecs.length > 0 && (kp === 0 || kp % 2 === 0 || last);
      const mv = useTec ? tecs[ti++ % tecs.length] : bases[bi++ % bases.length];
      return { a, mov: mv.name, tec: mv.tec, tid: mv.tid, fx: mv.fx, dano: dmgF[kp++], crit: last && success };
    }
    if (esqSet.has(idx)) return { a, mov: foe.moves[(kf++ + idx) % foe.moves.length], dano: 0, esq: true };
    const mov = last && !success ? foe.finisher : foe.moves[(kf++ + idx) % foe.moves.length];
    return { a, mov, dano: dmgP.shift() ?? 1, crit: last && !success };
  });

  return {
    foe: foeId, foeName: foe.name, scene: ev.combate?.cenario ?? foe.scene, vitoria: success, desfecho, beats,
    fim: { p: pFim, f: fFim }, fraseFim: foe.down, path: s.path, tier: s.tier, selo,
  };
}
