/**
 * Pixel art 16-bit "sombreada": cada forma é um campo de distância (SDF). A normal sai do gradiente do campo, a luz vem
 * sempre do canto superior esquerdo, e o resultado é quantizado em 4 a 5 tons de uma rampa fixa (paleta limitada do jogo).
 * Contorno seletivo: cor própria da rampa (nunca preto), mais claro onde a luz bate, mais escuro onde cai a sombra.
 */
import { PAL, type Rampa } from './pal';

export type Sdf = (x: number, y: number) => number;

/* ---------- Primitivas de campo (distância negativa = dentro) ---------- */
export const circulo = (cx: number, cy: number, r: number): Sdf => (x, y) => Math.hypot(x - cx, y - cy) - r;
export const elipse = (cx: number, cy: number, rx: number, ry: number): Sdf => (x, y) => (Math.hypot((x - cx) / rx, (y - cy) / ry) - 1) * Math.min(rx, ry);
export const caixa = (cx: number, cy: number, hw: number, hh: number, r = 0): Sdf => (x, y) => {
  const qx = Math.abs(x - cx) - hw + r, qy = Math.abs(y - cy) - hh + r;
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
};
export const capsula = (x0: number, y0: number, x1: number, y1: number, r0: number, r1 = r0): Sdf => (x, y) => {
  const dx = x1 - x0, dy = y1 - y0, l2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((x - x0) * dx + (y - y0) * dy) / l2));
  return Math.hypot(x - (x0 + dx * t), y - (y0 + dy * t)) - (r0 + (r1 - r0) * t);
};
export const poligono = (p: [number, number][]): Sdf => (x, y) => {
  let dentro = false, d = Infinity;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [ax, ay] = p[i], [bx, by] = p[j];
    if ((ay > y) !== (by > y) && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) dentro = !dentro;
    const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / l2));
    d = Math.min(d, Math.hypot(x - (ax + dx * t), y - (ay + dy * t)));
  }
  return dentro ? -d : d;
};
export const uniao = (...f: Sdf[]): Sdf => (x, y) => Math.min(...f.map((g) => g(x, y)));
export const subtrai = (a: Sdf, b: Sdf): Sdf => (x, y) => Math.max(a(x, y), -b(x, y));
export const inter = (a: Sdf, b: Sdf): Sdf => (x, y) => Math.max(a(x, y), b(x, y));
export const mover = (f: Sdf, dx: number, dy: number): Sdf => (x, y) => f(x - dx, y - dy);

const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const bayer = (x: number, y: number) => BAYER[y & 3][x & 3] / 16 - 0.5;

export interface OpForma {
  /** Altura da "cúpula": quanto a forma é arredondada (px). Valores pequenos = peça achatada. */
  volume?: number;
  /** Brilho especular (pontinho claro no lado da luz), útil em metal, jade e vidro. */
  brilho?: number;
  /** Pontilhado nas transições de tom (0 a 1). */
  pontilhado?: number;
  /** Textura: função que devolve -1..1 e desloca o tom (pano, madeira, pedra). */
  textura?: (x: number, y: number) => number;
  /** Sem contorno. */
  semContorno?: boolean;
}

const LUZ = (() => { const l = [-0.5, -0.62, 0.6]; const n = Math.hypot(l[0], l[1], l[2]); return l.map((v) => v / n); })();

export class Pix {
  px: (string | null)[];
  /** Camada de "profundidade": qual forma cobriu cada pixel por último (para contornos entre partes). */
  id: number[];
  private n = 0;
  constructor(public w: number, public h: number) {
    this.px = new Array(w * h).fill(null);
    this.id = new Array(w * h).fill(0);
  }
  get(x: number, y: number) { return x < 0 || y < 0 || x >= this.w || y >= this.h ? null : this.px[y * this.w + x]; }
  set(x: number, y: number, c: string | null) { if (x >= 0 && y >= 0 && x < this.w && y < this.h) this.px[y * this.w + x] = c; }

  /** Desenha uma forma com sombreamento e contorno seletivo. */
  forma(f: Sdf, r: Rampa, o: OpForma = {}) {
    const vol = o.volume ?? 3;
    const tons = r.length;
    const mask: boolean[] = new Array(this.w * this.h).fill(false);
    const x0 = 0, y0 = 0, x1 = this.w, y1 = this.h;
    const E = 0.01;
    this.n++;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const d = f(x + 0.5, y + 0.5);
      if (d > 0) continue;
      mask[y * this.w + x] = true;
      const gx = (f(x + 0.5 + E, y + 0.5) - f(x + 0.5 - E, y + 0.5)) / (2 * E);
      const gy = (f(x + 0.5, y + 0.5 + E) - f(x + 0.5, y + 0.5 - E)) / (2 * E);
      const gl = Math.hypot(gx, gy) || 1;
      const prof = Math.min(1, -d / vol);
      const nz = Math.sqrt(Math.max(0, prof * (2 - prof)));
      const k = 1 - nz;
      const nx = (gx / gl) * k, ny = (gy / gl) * k;
      let s = nx * LUZ[0] + ny * LUZ[1] + nz * LUZ[2];
      s = (s + 0.2) / 1.2; // 0..1
      if (o.textura) s += o.textura(x, y) * 0.12;
      s += bayer(x, y) * (o.pontilhado ?? 0) * 0.16;
      let i = Math.round(s * (tons - 1));
      i = Math.max(0, Math.min(tons - 1, i));
      let cor = r[i];
      if (o.brilho && s > 0.92 && -d > vol * 0.2 && gx + gy < 0) cor = r[tons - 1];
      this.set(x, y, cor);
      this.id[y * this.w + x] = this.n;
    }
    if (!o.semContorno) this.contornoDe(mask, r);
    return this;
  }

  /** Contorno seletivo: 1 px por fora da forma, na cor mais escura da rampa (mais clara do lado da luz). */
  private contornoDe(mask: boolean[], r: Rampa) {
    const out: [number, number, string][] = [];
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) {
      if (mask[y * this.w + x]) continue;
      const nb = (dx: number, dy: number) => { const xx = x + dx, yy = y + dy; return xx >= 0 && yy >= 0 && xx < this.w && yy < this.h && mask[yy * this.w + xx]; };
      const vizinho = nb(1, 0) || nb(-1, 0) || nb(0, 1) || nb(0, -1);
      if (!vizinho) continue;
      // lado da luz: o pixel de contorno está acima/à esquerda da forma
      const lit = nb(1, 0) || nb(0, 1);
      out.push([x, y, lit ? r[Math.min(1, r.length - 1)] : r[0]]);
    }
    for (const [x, y, c] of out) {
      // o contorno só cobre fundo vazio ou o contorno de outra peça
      const atual = this.get(x, y);
      if (!atual) this.set(x, y, c);
    }
  }

  /** Pixel solto (detalhes à mão: olhos, brilhos, rachaduras). */
  ponto(x: number, y: number, c: string) { this.set(Math.round(x), Math.round(y), c); return this; }
  linha(x0: number, y0: number, x1: number, y1: number, c: string) {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1;
    for (let i = 0; i <= n; i++) this.set(Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), c);
    return this;
  }
  retangulo(x: number, y: number, w: number, h: number, c: string) { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, c); return this; }
  colar(src: Pix, ox: number, oy: number) { for (let y = 0; y < src.h; y++) for (let x = 0; x < src.w; x++) { const c = src.px[y * src.w + x]; if (c) this.set(ox + x, oy + y, c); } return this; }
  espelhar() { const o = new Pix(this.w, this.h); for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) o.px[y * this.w + x] = this.px[y * this.w + (this.w - 1 - x)]; return o; }
  /** Gradiente vertical com pontilhado ordenado entre as cores. */
  gradiente(x: number, y: number, w: number, h: number, cores: string[]) {
    for (let j = 0; j < h; j++) {
      const t = (j / Math.max(1, h - 1)) * (cores.length - 1), k = Math.min(cores.length - 2, Math.floor(t)), f = t - k;
      for (let i = 0; i < w; i++) this.set(x + i, y + j, bayer(x + i, y + j) + 0.5 < f ? cores[k + 1] : cores[k]);
    }
    return this;
  }
}

export { PAL };
