/** Utilitários de cor para os estilos de arte (só cores #rrggbb). */
export function rgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function hex(r: number, g: number, b: number): string {
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${f(r)}${f(g)}${f(b)}`;
}
/** Mistura a com b (t=0 devolve a, t=1 devolve b). */
export function mix(a: string, b: string, t: number): string {
  const x = rgb(a), y = rgb(b);
  return hex(x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t);
}
export const claro = (c: string, t = 0.35) => mix(c, '#ffffff', t);
export const escuro = (c: string, t = 0.35) => mix(c, '#000000', t);
/** Gira o matiz (graus) mantendo brilho e saturação aproximados. */
export function matiz(c: string, graus: number): string {
  const [r, g, b] = rgb(c).map((v) => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h = (h * 60 + graus + 360) % 360;
  const l = (mx + mn) / 2, s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return hex(f(0) * 255, f(8) * 255, f(4) * 255);
}
