import { hash, prng } from '../core';
import { escuro, mix } from '../cor';

/**
 * Estilo tinta (shuimo): poucos traços, decididos, com pressão de pincel (começo cheio, fim afinando),
 * lavis de cor translúcida com borda mais escura (a tinta acumula na beira), muito papel vazio e um selo vermelho.
 * Nada de tremor por filtro: o traço é geométrico, só a borda ganha uma leve aspereza.
 */
export const TINTA = '#1a1720';
export const PAPEL = '#f3ead4';
export const VERM = '#b3262b';
export const CINZA = '#6e6a76';
export type Pt = [number, number];

let contador = 0;
export const uid = (p = 't') => `${p}${++contador}`;

export function svg(w: number, h: number, body: string, cls: string, title: string, size?: number): string {
  const defs = `<defs>
<filter id="tpapel" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .42  0 0 0 0 .34  0 0 0 0 .22  0 0 0 .16 0"/></filter>
<filter id="tlavis" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" result="d"/><feGaussianBlur in="d" stdDeviation="0.9"/></filter>
<filter id="tnevoa" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>
<filter id="tborda" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="0.9"/></filter>
</defs>`;
  const dim = size ? `width="${size}" height="${Math.round((size * h) / w)}"` : `width="${w}" height="${h}"`;
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" ${dim} role="img" ${title ? `aria-label="${title.replace(/"/g, '')}"` : 'aria-hidden="true"'} xmlns="http://www.w3.org/2000/svg">${defs}${body}</svg>`;
}

/** Papel de arroz com fibras discretas. */
export const papel = (w: number, h: number, cor = PAPEL, rx = 0) =>
  `<rect width="${w}" height="${h}" rx="${rx}" fill="${cor}"/><rect width="${w}" height="${h}" rx="${rx}" filter="url(#tpapel)"/>`;

/** Curva suave (Catmull-Rom) por pontos de controle. */
function amostra(p: Pt[], n: number): Pt[] {
  if (p.length === 2) return Array.from({ length: n + 1 }, (_, i) => [p[0][0] + ((p[1][0] - p[0][0]) * i) / n, p[0][1] + ((p[1][1] - p[0][1]) * i) / n] as Pt);
  const out: Pt[] = [];
  const seg = p.length - 1;
  for (let i = 0; i <= n; i++) {
    const u = (i / n) * seg, k = Math.min(seg - 1, Math.floor(u)), t = u - k;
    const p0 = p[Math.max(0, k - 1)], p1 = p[k], p2 = p[k + 1], p3 = p[Math.min(p.length - 1, k + 2)];
    const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
    out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
  }
  return out;
}

export interface OpTraco { cor?: string; op?: number; ataque?: number; fim?: number; seco?: boolean; seed?: string }

/**
 * Pincelada: polígono cheio com largura variável. Começa firme (pressão), mantém e afina até a ponta.
 * `ataque` = quanto do traço é a entrada (0–1); `fim` = largura final relativa (0 = ponta de agulha).
 */
export function traco(pts: Pt[], w: number, o: OpTraco = {}): string {
  const n = 22, c = amostra(pts, n), cor = o.cor ?? TINTA, op = o.op ?? 1;
  const r = prng(hash(o.seed ?? pts.map((p) => p.join(',')).join(';')));
  const atq = o.ataque ?? 0.12, fim = o.fim ?? 0.05;
  const L: Pt[] = [], R: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const a = c[Math.max(0, i - 1)], b = c[Math.min(n, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1];
    const m = Math.hypot(dx, dy) || 1;
    dx /= m; dy /= m;
    const entrada = 0.5 + 0.5 * Math.min(1, t / atq);
    const saida = 1 - (1 - fim) * Math.pow(t, 2.1);
    const asp = 1 + (r() - 0.5) * 0.16;
    const hw = (w / 2) * entrada * saida * asp;
    L.push([c[i][0] - dy * hw, c[i][1] + dx * hw]);
    R.push([c[i][0] + dy * hw, c[i][1] - dx * hw]);
  }
  const f = (p: Pt) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  let d = `M${f(L[0])}`;
  for (let i = 1; i <= n; i++) d += `L${f(L[i])}`;
  for (let i = n; i >= 0; i--) d += `L${f(R[i])}`;
  let out = `<path d="${d}Z" fill="${cor}" opacity="${op}" stroke="${cor}" stroke-width="0.35" stroke-linejoin="round"/>`;
  if (o.seco && w >= 2.6) {
    // pincel seco: fios finos de papel aparecendo dentro do traço
    for (let k = 1; k <= 3; k++) {
      const t0 = 0.25 + r() * 0.3, i0 = Math.floor(t0 * n), i1 = Math.min(n, i0 + 7 + Math.floor(r() * 6));
      const off = (k - 2) * (w * 0.22);
      let s = '';
      for (let i = i0; i <= i1; i++) {
        const a = c[Math.max(0, i - 1)], b = c[Math.min(n, i + 1)];
        let dx = b[0] - a[0], dy = b[1] - a[1];
        const m = Math.hypot(dx, dy) || 1; dx /= m; dy /= m;
        s += `${i === i0 ? 'M' : 'L'}${(c[i][0] - dy * off).toFixed(1)} ${(c[i][1] + dx * off).toFixed(1)}`;
      }
      out += `<path d="${s}" stroke="${PAPEL}" stroke-width="${Math.max(0.5, w * 0.1).toFixed(1)}" fill="none" opacity=".55" stroke-linecap="round"/>`;
    }
  }
  return out;
}

/** Lavis (aguada): cor translúcida com a borda mais carregada, como a tinta acumulando ao secar. */
export function lavis(d: string, cor: string, op = 0.55): string {
  return `<g filter="url(#tlavis)"><path d="${d}" fill="${cor}" opacity="${op}"/><path d="${d}" fill="none" stroke="${escuro(cor, 0.25)}" stroke-width="1.3" opacity="${Math.min(0.9, op * 0.8)}" stroke-linejoin="round"/></g>`;
}

/** Névoa horizontal: faixa de papel por cima do que está atrás. */
export const nevoa = (x: number, y: number, w: number, h: number, cor = PAPEL, op = 0.8) =>
  `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w / 2}" ry="${h / 2}" fill="${cor}" opacity="${op}" filter="url(#tnevoa)"/>`;

/** Disco (sol/lua) de cor chapada, levemente irregular. */
export const disco = (cx: number, cy: number, r: number, cor = VERM, op = 0.92) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${cor}" opacity="${op}" filter="url(#tborda)"/>`;

/** Selo vermelho com marca geométrica (sem depender de fontes): cada peça ganha um selo diferente. */
export function selo(x: number, y: number, s: number, seed: string, cor = VERM): string {
  const r = prng(hash(seed)), p = PAPEL;
  const k = Math.floor(r() * 4);
  const u = s / 10;
  let m = '';
  if (k === 0) m = `<path d="M${2 * u} ${3 * u}h${6 * u}M${2 * u} ${6.5 * u}h${6 * u}M${5 * u} ${1.6 * u}v${6.8 * u}" stroke="${p}" stroke-width="${1.3 * u}" fill="none"/>`;
  else if (k === 1) m = `<path d="M${2.2 * u} ${2.2 * u}h${5.6 * u}v${5.6 * u}h-${5.6 * u}zM${2.2 * u} ${5 * u}h${5.6 * u}" stroke="${p}" stroke-width="${1.2 * u}" fill="none"/>`;
  else if (k === 2) m = `<path d="M${2.4 * u} ${2 * u}l${5.2 * u} ${6 * u}M${7.6 * u} ${2 * u}l-${5.2 * u} ${6 * u}M${5 * u} ${1.6 * u}v${1.8 * u}" stroke="${p}" stroke-width="${1.2 * u}" fill="none" stroke-linecap="round"/>`;
  else m = `<path d="M${2 * u} ${2.4 * u}q${3 * u} -${1.2 * u} ${6 * u} 0M${5 * u} ${2 * u}v${6.4 * u}M${2.4 * u} ${8 * u}q${2.6 * u} -${2 * u} ${5.2 * u} 0" stroke="${p}" stroke-width="${1.2 * u}" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y})"><rect width="${s}" height="${s}" rx="${s * 0.1}" fill="${cor}" opacity=".95" filter="url(#tborda)"/>${m}</g>`;
}

/** Moldura de duas linhas, como as de pergaminho. */
export const moldura = (w: number, h: number, cor = TINTA) =>
  `<rect x="1.6" y="1.6" width="${w - 3.2}" height="${h - 3.2}" fill="none" stroke="${cor}" stroke-width="1.7" opacity=".85"/><rect x="4" y="4" width="${w - 8}" height="${h - 8}" fill="none" stroke="${cor}" stroke-width=".6" opacity=".5"/>`;

export const tom = (c: string, t: number) => mix(c, PAPEL, t);

/** Pontos de um arco (para traçar círculos de pincel em um gesto só, com a boca aberta). */
export function arco(cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, n = 8): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n;
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry] as Pt;
  });
}
