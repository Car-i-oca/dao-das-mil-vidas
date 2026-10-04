import { claro, escuro, mix } from '../cor';

/**
 * Motor de pixel art: uma grade de cores; formas com sombreamento automático (luz no canto superior esquerdo:
 * brilho nas bordas de cima/esquerda, sombra nas de baixo/direita, pontilhado na transição) e contorno escuro.
 * O resultado vira um PNG minúsculo (data URL) que o navegador amplia sem suavizar.
 */
export const K = '#1a1423';
type Rampa = [string, string, string, string, string]; // escuro, sombra, base, luz, brilho
const rampas = new Map<string, Rampa>();
export function rampa(c: string): Rampa {
  let r = rampas.get(c);
  if (!r) { r = [escuro(c, 0.48), escuro(c, 0.28), c, claro(c, 0.24), claro(c, 0.5)]; rampas.set(c, r); }
  return r;
}

const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
export const bayer = (x: number, y: number) => BAYER[y & 3][x & 3] / 16;

export class Surf {
  px: (string | null)[];
  constructor(public w: number, public h: number) { this.px = new Array(w * h).fill(null); }
  set(x: number, y: number, c: string | null) { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < this.w && y < this.h) this.px[y * this.w + x] = c; }
  get(x: number, y: number): string | null { return x >= 0 && y >= 0 && x < this.w && y < this.h ? this.px[y * this.w + x] : null; }
  rect(x: number, y: number, w: number, h: number, c: string) { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.set(x + i, y + j, c); return this; }
  linha(x0: number, y0: number, x1: number, y1: number, c: string) {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1;
    for (let i = 0; i <= n; i++) this.set(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n, c);
    return this;
  }
  /** Traço grosso (quadrados de lado `e`). */
  trago(x0: number, y0: number, x1: number, y1: number, c: string, e = 2) {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1;
    for (let i = 0; i <= n; i++) this.rect(Math.round(x0 + ((x1 - x0) * i) / n - e / 2), Math.round(y0 + ((y1 - y0) * i) / n - e / 2), e, e, c);
    return this;
  }

  /** Preenche a região `dentro` com sombreamento por faixas. `plano` desliga o sombreamento. */
  forma(dentro: (x: number, y: number) => boolean, c: string, x0: number, y0: number, x1: number, y1: number, plano = false) {
    const [d, s, b, l, h] = rampa(c);
    for (let y = Math.floor(y0); y <= Math.ceil(y1); y++) for (let x = Math.floor(x0); x <= Math.ceil(x1); x++) {
      if (!dentro(x, y)) continue;
      let cor = b;
      if (!plano) {
        const e = !dentro(x - 1, y) || !dentro(x, y - 1);
        const f = !dentro(x + 1, y) || !dentro(x, y + 1);
        if (e && !f) cor = h;
        else if (f && !e) cor = d;
        else if (e && f) cor = b;
        else if (!dentro(x + 2, y + 2) || !dentro(x + 2, y) || !dentro(x, y + 2)) cor = (x + y) & 1 ? s : d;
        else if (!dentro(x - 2, y - 2) && !((x + y) & 1)) cor = l;
        else if (!dentro(x + 3, y + 3)) cor = (x + y) & 1 ? s : b;
      }
      this.set(x, y, cor);
    }
    return this;
  }
  elipse(cx: number, cy: number, rx: number, ry: number, c: string, plano = false) {
    return this.forma((x, y) => { const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry; return dx * dx + dy * dy <= 1; }, c, cx - rx, cy - ry, cx + rx, cy + ry, plano);
  }
  ret(x: number, y: number, w: number, h: number, c: string, plano = false) {
    return this.forma((i, j) => i >= x && i < x + w && j >= y && j < y + h, c, x, y, x + w, y + h, plano);
  }
  poli(p: [number, number][], c: string, plano = false) {
    const xs = p.map((q) => q[0]), ys = p.map((q) => q[1]);
    const dentro = (x: number, y: number) => {
      let r = false;
      const px = x + 0.5, py = y + 0.5;
      for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
        if ((p[i][1] > py) !== (p[j][1] > py) && px < ((p[j][0] - p[i][0]) * (py - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) r = !r;
      }
      return r;
    };
    return this.forma(dentro, c, Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys), plano);
  }
  /** Contorno de 1 pixel em volta de tudo que não é transparente; cor própria ou o tom mais escuro do vizinho. */
  contorno(c?: string) {
    const out = this.px.slice();
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) {
      if (this.px[y * this.w + x]) continue;
      const v = [this.get(x - 1, y), this.get(x + 1, y), this.get(x, y - 1), this.get(x, y + 1)].find((q) => q);
      if (v) out[y * this.w + x] = c ?? K;
    }
    this.px = out;
    return this;
  }
  /** Preenchimento em gradiente vertical com pontilhado ordenado entre as cores (paradas = cores do topo à base). */
  gradiente(x: number, y: number, w: number, h: number, cores: string[]) {
    for (let j = 0; j < h; j++) {
      const t = (j / Math.max(1, h - 1)) * (cores.length - 1), k = Math.min(cores.length - 2, Math.floor(t)), f = t - k;
      for (let i = 0; i < w; i++) this.set(x + i, y + j, bayer(x + i, y + j) < f ? cores[k + 1] : cores[k]);
    }
    return this;
  }
  /** Disco/halo pontilhado que clareia do centro para a borda. */
  halo(cx: number, cy: number, r: number, c: string, forca = 1) {
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) / r;
      if (d > 1) continue;
      if (bayer(x, y) < (1 - d) * forca) { const base = this.get(x, y); this.set(x, y, base ? mix(base, c, 0.55) : c); }
    }
    return this;
  }
  colar(src: Surf, ox: number, oy: number) { for (let y = 0; y < src.h; y++) for (let x = 0; x < src.w; x++) { const c = src.px[y * src.w + x]; if (c) this.set(ox + x, oy + y, c); } return this; }
  espelhar() { const o = new Surf(this.w, this.h); for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) o.px[y * this.w + x] = this.px[y * this.w + (this.w - 1 - x)]; return o; }
  fundoCor(c: string) { for (let i = 0; i < this.px.length; i++) if (!this.px[i]) this.px[i] = c; return this; }
}

const cache = new Map<string, string>();
/** PNG (data URL) da grade, com cache pela chave. */
export function png(chave: string, fazer: () => Surf): string {
  let u = cache.get(chave);
  if (u) return u;
  const s = fazer();
  const cv = document.createElement('canvas');
  cv.width = s.w; cv.height = s.h;
  const g = cv.getContext('2d')!;
  for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) { const c = s.px[y * s.w + x]; if (c) { g.fillStyle = c; g.fillRect(x, y, 1, 1); } }
  u = cv.toDataURL('image/png');
  cache.set(chave, u);
  return u;
}

/** <svg> que mostra o PNG ampliado sem suavizar. `dx,dy,dw,dh` posicionam a imagem (para lutadores dentro de 120x140). */
export function imagemSvg(url: string, w: number, h: number, cls: string, titulo: string, size?: number): string {
  const dim = size ? `width="${size}" height="${Math.round((size * h) / w)}"` : `width="${w}" height="${h}"`;
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" ${dim} role="img" ${titulo ? `aria-label="${titulo.replace(/"/g, '')}"` : 'aria-hidden="true"'} xmlns="http://www.w3.org/2000/svg"><image href="${url}" width="${w}" height="${h}" style="image-rendering:pixelated" preserveAspectRatio="none"/></svg>`;
}
export const imagemMiolo = (url: string, x: number, y: number, w: number, h: number) => `<image href="${url}" x="${x}" y="${y}" width="${w}" height="${h}" style="image-rendering:pixelated" preserveAspectRatio="none"/>`;
