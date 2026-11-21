/* ---------- Save: leitura defensiva, versão e migração ----------
 * Leitura pura (sem DOM): recebe o texto bruto do armazenamento e devolve um save utilizável.
 * O acesso ao armazenamento (carregarSave/gravarSave) recebe o Storage por parâmetro, para testar sem navegador.
 * Regras: nunca lançar exceção; dado corrompido vira padrão campo a campo (o Legado sobrevive
 * mesmo se a vida em andamento estiver quebrada); saves antigos sobem de versão em `migrar`.
 */
import { newMeta } from '../engine/engine';
import { pacoteDe, MODOS, type Modo } from '../data/modos';
import { estiloValido, type Estilo } from './art/estilo';
import type { Meta, State } from '../types';

/** Versão atual do formato. v0 = sem campo (antes dos modos ou antes do versionamento); v1 = modos sem número. */
export const SAVE_VERSION = 2;

export interface Settings { modo?: Modo; estilo: Estilo; speed: number; theme: 'auto' | 'claro' | 'escuro'; font: number; intro: boolean; difficulty: number }
export interface Save { saveVersion: number; meta: Meta; run: State | null; settings: Settings }
export interface Leitura {
  save: Save;
  /** O texto existia mas não pôde ser aproveitado por inteiro (JSON inválido, meta ou vida descartada). */
  corrompido: boolean;
  /** A vida em andamento foi descartada por estar incompleta. */
  vidaDescartada: boolean;
  /** Versão encontrada no armazenamento (0 quando ausente). */
  versaoOriginal: number;
}

type Obj = Record<string, unknown>;
const isObj = (x: unknown): x is Obj => !!x && typeof x === 'object' && !Array.isArray(x);
const num = (x: unknown, d: number): number => (typeof x === 'number' && Number.isFinite(x) ? x : d);
const int = (x: unknown, min: number, max: number, d: number): number => {
  const n = num(x, d);
  return Number.isInteger(n) && n >= min && n <= max ? n : d;
};
const strArr = (x: unknown): string[] => (Array.isArray(x) ? x.filter((e): e is string => typeof e === 'string') : []);

export function normSettings(x?: unknown): Settings {
  const s = isObj(x) ? x : {};
  return {
    modo: s.modo === 'xianxia' ? 'xianxia' : 'murim',
    estilo: estiloValido(s.estilo) ? s.estilo : 'manhwa',
    speed: int(s.speed, 0, 3, 2),
    theme: s.theme === 'claro' || s.theme === 'escuro' ? s.theme : 'auto',
    font: int(s.font, 0, 2, 1),
    intro: s.intro === true,
    difficulty: int(s.difficulty, -1, 1, 0),
  };
}

/** Meta campo a campo: o que tiver tipo errado volta ao padrão, o resto é preservado. */
export function normMeta(x: unknown): Meta {
  const m = isObj(x) ? x : {};
  const base = newMeta();
  const upgrades: Record<string, number> = {};
  if (isObj(m.upgrades)) for (const [k, v] of Object.entries(m.upgrades)) if (typeof v === 'number' && Number.isFinite(v)) upgrades[k] = v;
  const b = m.best;
  const best = isObj(b) && typeof b.ending === 'string' ? { tier: num(b.tier, 0), age: num(b.age, 0), ending: b.ending } : null;
  const out: Meta = {
    ...base,
    legacy: Math.max(0, num(m.legacy, 0)),
    lives: Math.max(0, Math.floor(num(m.lives, 0))),
    achievements: strArr(m.achievements),
    upgrades,
    best,
    endingsSeen: strArr(m.endingsSeen),
    history: Array.isArray(m.history) ? (m.history.filter((h) => isObj(h) && typeof h.name === 'string') as Meta['history']) : [],
    codex: { items: isObj(m.codex) ? strArr(m.codex.items) : [] },
    defeatedFoes: strArr(m.defeatedFoes),
  };
  if (Array.isArray(m.recent)) out.recent = m.recent.filter(Array.isArray).map(strArr);
  if (m.alcunhas !== undefined) out.alcunhas = strArr(m.alcunhas);
  return out;
}

/** Vida em andamento: só é mantida se tiver o esqueleto que o motor exige. Senão, é descartada (o Legado fica). */
export function vidaValida(r: unknown): r is State {
  if (!isObj(r)) return false;
  const modo = r.modo as Modo | undefined;
  if (modo !== undefined && !MODOS.includes(modo)) return false;
  const ix = pacoteDe(modo).ix;
  if (typeof r.path !== 'string' || !(r.path in ix.PATH)) return false;
  if (typeof r.name !== 'string' || !isObj(r.stats) || !isObj(r.seen) || !isObj(r.names)) return false;
  for (const k of ['flags', 'items', 'log', 'scheduled'] as const) if (!Array.isArray(r[k])) return false;
  for (const k of ['seed', 'age', 'tier', 'turn', 'maxAge', 'xp'] as const) if (!Number.isFinite(r[k])) return false;
  // Referências que o motor resolve sem checar (view() quebraria e a tela ficaria presa a cada abertura).
  if (r.ending != null && (typeof r.ending !== 'string' || !(r.ending in ix.ENDING))) return false;
  if (r.result != null && !(isObj(r.result) && typeof r.result.text === 'string')) return false;
  const cur = r.current;
  if (cur == null) return r.ending != null || r.result != null;
  if (!isObj(cur) || typeof cur.id !== 'string') return false;
  if (cur.v2) return isObj(r.v2);
  if (cur.alc || cur.breakthrough || cur.retiro) return true;
  return cur.id in ix.EVENT;
}

/** Sobe um objeto de save de qualquer versão anterior para a atual (sem validar tipos). */
export function migrar(p: Obj): Obj {
  const v = num(p.saveVersion, 0);
  // v0 → v1: vida salva antes dos modos era Murim.
  if (v < 1 && isObj(p.run) && !p.run.modo) p.run = { ...p.run, modo: 'murim' };
  // v1 → v2: só passa a gravar o número da versão.
  return { ...p, saveVersion: SAVE_VERSION };
}

export function novoSave(): Save {
  return { saveVersion: SAVE_VERSION, meta: newMeta(), run: null, settings: normSettings() };
}

/** Lê o texto bruto do armazenamento. Nunca lança. */
export function lerSave(raw: string | null | undefined): Leitura {
  const vazio = (corrompido: boolean, versaoOriginal = 0): Leitura => ({ save: novoSave(), corrompido, vidaDescartada: false, versaoOriginal });
  if (!raw) return vazio(false);
  let p: unknown;
  try { p = JSON.parse(raw); } catch { return vazio(true); }
  if (!isObj(p) || !isObj(p.meta)) return vazio(true);
  const versaoOriginal = num(p.saveVersion, 0);
  const m = migrar(p);
  const vidaDescartada = m.run != null && !vidaValida(m.run);
  const metaOk = (p.meta.legacy === undefined || Number.isFinite(p.meta.legacy)) && (p.meta.history === undefined || Array.isArray(p.meta.history));
  return {
    save: { saveVersion: SAVE_VERSION, meta: normMeta(m.meta), run: vidaDescartada ? null : ((m.run as State | undefined) ?? null), settings: normSettings(m.settings) },
    corrompido: vidaDescartada || !metaOk,
    vidaDescartada,
    versaoOriginal,
  };
}

/* ---------- Armazenamento do aparelho ---------- */
/** Chave do save. Não mudar: quem já joga perderia o Legado. */
export const SAVE_KEY = 'murim-quest-save-v1';
/** Cópia do último texto que não pôde ser lido por inteiro (para recuperação manual; nunca é lida pelo jogo). */
export const SAVE_KEY_CORROMPIDO = `${SAVE_KEY}-corrompido`;
/** O pedaço do Storage que o save usa: localStorage no jogo, um objeto falso nos testes. */
export type Armazenamento = Pick<Storage, 'getItem' | 'setItem'>;

function armazenamentoNativo(): Armazenamento | null {
  try { return globalThis.localStorage ?? null; } catch { return null; } // WebView sem armazenamento lança ao acessar
}

/** Guarda um texto para recuperação manual. Nunca lança. */
export function guardarCopia(texto: string, arm: Armazenamento | null = armazenamentoNativo()): boolean {
  try { arm?.setItem(SAVE_KEY_CORROMPIDO, texto); return !!arm; } catch { return false; }
}

/** Abre o save do aparelho. Texto ilegível é copiado à parte antes que a próxima gravação o sobrescreva. Nunca lança. */
export function carregarSave(arm: Armazenamento | null = armazenamentoNativo()): Leitura {
  let raw: string | null = null;
  try { raw = arm?.getItem(SAVE_KEY) ?? null; } catch { /* armazenamento indisponível */ }
  const r = lerSave(raw);
  if (r.corrompido && raw) guardarCopia(raw, arm);
  return r;
}

/** Grava o save. Devolve falso se o aparelho recusou (sem espaço, modo privado, WebView sem armazenamento). Nunca lança. */
export function gravarSave(save: Save, arm: Armazenamento | null = armazenamentoNativo()): boolean {
  if (!arm) return false;
  try { arm.setItem(SAVE_KEY, JSON.stringify(save)); return true; } catch { return false; }
}
