import { claro, escuro, mix } from '../cor';

/** Estilo manhwa / web novel: contorno firme, cel-shading com gradiente, brilhos, luz de contorno e partículas. */
export const OL = '#140e2c';
let contador = 0;
export const uid = (p = 'm') => `${p}${++contador}`;

export function svg(w: number, h: number, body: string, cls: string, title: string, size?: number): string {
  const defs = `<defs><filter id="mwg" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.2"/></filter><filter id="mwg2" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.3"/></filter><filter id="mwg3" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7"/></filter></defs>`;
  const dim = size ? `width="${size}" height="${Math.round((size * h) / w)}"` : `width="${w}" height="${h}"`;
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" ${dim} role="img" ${title ? `aria-label="${title.replace(/"/g, '')}"` : 'aria-hidden="true"'} xmlns="http://www.w3.org/2000/svg">${defs}${body}</svg>`;
}

/** Forma com contorno, sombra de cel na borda de baixo/direita e gradiente suave. */
export function cel(d: string, c: string, o: { w?: number; off?: number; sh?: string; fill?: boolean } = {}): string {
  const id = uid('c'), gid = uid('g');
  const w = o.w ?? 2.2, off = o.off ?? 3, sh = o.sh ?? escuro(c, 0.4);
  return `<defs><clipPath id="${id}"><path d="${d}" clip-rule="evenodd"/></clipPath><linearGradient id="${gid}" x1="0" y1="0" x2="0.5" y2="1"><stop offset="0" stop-color="${claro(c, 0.28)}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs>`
    + `<path d="${d}" fill="${sh}" fill-rule="evenodd"/><g clip-path="url(#${id})"><path d="${d}" fill-rule="evenodd" fill="url(#${gid})" transform="translate(${-off * 0.7} ${-off})"/></g>`
    + `<path d="${d}" fill="none" fill-rule="evenodd" stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
}

/** Traço de contorno solto (linha de detalhe). */
export const linha = (d: string, c = OL, w = 1.6, o = 1) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
export const brilho = (d: string, o = 0.85) => `<path d="${d}" fill="#fff" opacity="${o}"/>`;
export const estrela = (x: number, y: number, r: number, c = '#fff', o = 1) =>
  `<path d="M${x} ${y - r}L${x + r * 0.26} ${y - r * 0.26} ${x + r} ${y} ${x + r * 0.26} ${y + r * 0.26} ${x} ${y + r} ${x - r * 0.26} ${y + r * 0.26} ${x - r} ${y} ${x - r * 0.26} ${y - r * 0.26}z" fill="${c}" opacity="${o}"/>`;

export function raios(cx: number, cy: number, r0: number, r1: number, n: number, c = '#fff', o = 0.14, sw = 1.2, giro = 0): string {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + giro;
    s += `M${(cx + Math.cos(a) * r0).toFixed(1)} ${(cy + Math.sin(a) * r0).toFixed(1)}L${(cx + Math.cos(a) * r1).toFixed(1)} ${(cy + Math.sin(a) * r1).toFixed(1)}`;
  }
  return `<path d="${s}" stroke="${c}" stroke-width="${sw}" opacity="${o}" fill="none" stroke-linecap="round"/>`;
}

/** Fundo escuro com luz colorida atrás do objeto. */
export function fundo(id: string, w: number, h: number, col: string, rx = 12, luz = 0.5, cx = 0.5, cy = 0.42): string {
  return `<defs><radialGradient id="${id}" cx="${cx}" cy="${cy}" r="0.78"><stop offset="0" stop-color="${mix(col, '#1a1250', 0.55)}"/><stop offset="0.55" stop-color="${escuro(mix(col, '#1a1250', 0.7), 0.45)}"/><stop offset="1" stop-color="#07051a"/></radialGradient></defs>`
    + `<rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" rx="${rx}" fill="url(#${id})"/>`
    + `<ellipse cx="${w * cx}" cy="${h * cy}" rx="${w * 0.36}" ry="${h * 0.36}" fill="${col}" opacity="${luz}" filter="url(#mwg)"/>`;
}

export const PAL = ['#3ddc97', '#ffc83d', '#ff5a5f', '#4aa3ff', '#a974ff', '#ff7eb6'];
export const GRAU = ['', '#9aa3b5', '#d9894a', '#3ddc97', '#4aa3ff', '#ffc83d'];

/** Partículas luminosas determinísticas. */
export function particulas(seed: number, w: number, h: number, n: number, c = '#fff'): string {
  let s = seed >>> 0, o = '';
  const r = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  for (let i = 0; i < n; i++) {
    const x = r() * w, y = r() * h, k = r();
    o += k > 0.72 ? estrela(+x.toFixed(1), +y.toFixed(1), 1.6 + r() * 2.2, c, 0.55 + r() * 0.4) : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.5 + r() * 1.1).toFixed(1)}" fill="${c}" opacity="${(0.3 + r() * 0.5).toFixed(2)}"/>`;
  }
  return o;
}
