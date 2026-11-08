/**
 * Modo de jogo das ferramentas de simulação.
 *   --modo murim|xianxia   escolhe o pacote (sem a flag, um script rodado direto usa o Murim;
 *                          `npm run <script>` passa por sim/todos.ts, que roda os dois modos em sequência).
 */
import { pacoteDe, MODOS, MODO_PADRAO, type Modo } from '../src/data/modos';

export function argModo(args: string[] = process.argv.slice(2)): Modo | undefined {
  const i = args.indexOf('--modo');
  const v = i >= 0 ? args[i + 1] : args.find((a) => a.startsWith('--modo='))?.slice(7);
  if (v === undefined) return undefined;
  if (!(MODOS as string[]).includes(v)) {
    console.error(`modo inválido "${v}". Use: ${MODOS.join(' | ')}`);
    process.exit(2);
  }
  return v as Modo;
}

export const MODO: Modo = argModo() ?? MODO_PADRAO;
export const PK = pacoteDe(MODO);
