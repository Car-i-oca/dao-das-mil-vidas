import { maisProxima, rgb, TODAS } from './paleta';

/** Gerador determinístico (mulberry32) e ruído de valor suave: dão às manchas o jeito irregular de pintura. */
export function rng(seed: number) {
  let a = seed >>> 0;
  const f = () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  return Object.assign(f, { r: (a: number, b: number) => a + f() * (b - a), i: (a: number, b: number) => Math.floor(a + f() * (b - a + 1)), pick: <T,>(l: T[]) => l[Math.floor(f() * l.length)] });
}
export type Rng = ReturnType<typeof rng>;

export function hashStr(s: string): number { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

function h2(x: number, y: number, s: number) { let n = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(s, 2147483647); n = Math.imul(n ^ (n >>> 13), 1274126177); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; }
export function ruido(x: number, y: number, s = 1): number {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  return (h2(xi, yi, s) * (1 - u) + h2(xi + 1, yi, s) * u) * (1 - v) + (h2(xi, yi + 1, s) * (1 - u) + h2(xi + 1, yi + 1, s) * u) * v;
}
export const fbm = (x: number, y: number, s = 1) => ruido(x, y, s) * 0.55 + ruido(x * 2.1, y * 2.1, s + 7) * 0.3 + ruido(x * 4.3, y * 4.3, s + 13) * 0.15;

/** Tela de pintura: coordenadas em "unidades" (0 a 100 na largura), com pincéis de manchas irregulares. */
export class Tela {
  c: HTMLCanvasElement;
  g: CanvasRenderingContext2D;
  k: number;
  constructor(public w: number, public h: number, public alto = 640) {
    this.c = document.createElement('canvas');
    this.k = alto / w; // pixels de alta resolução por unidade
    this.c.width = Math.round(w * this.k); this.c.height = Math.round(h * this.k);
    this.g = this.c.getContext('2d', { willReadFrequently: true })!;
    this.g.lineJoin = 'round'; this.g.lineCap = 'round';
  }
  /** Mancha suave por pontos (curva de Catmull-Rom fechada), com tremor de ruído nas bordas. */
  mancha(pts: [number, number][], cor: string | CanvasGradient, o: { alpha?: number; tremor?: number; seed?: number; borrao?: number } = {}) {
    const g = this.g, k = this.k, tr = o.tremor ?? 0.6, s = o.seed ?? 1;
    const p = pts.map(([x, y], i) => [(x + (ruido(i * 1.7, s, s) - 0.5) * 2 * tr) * k, (y + (ruido(s, i * 1.3, s + 3) - 0.5) * 2 * tr) * k] as [number, number]);
    g.save();
    g.globalAlpha = o.alpha ?? 1;
    if (o.borrao) g.filter = `blur(${o.borrao * k}px)`;
    g.fillStyle = cor;
    g.beginPath();
    const n = p.length;
    g.moveTo((p[0][0] + p[n - 1][0]) / 2, (p[0][1] + p[n - 1][1]) / 2);
    for (let i = 0; i < n; i++) { const a = p[i], b = p[(i + 1) % n]; g.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); }
    g.closePath(); g.fill();
    g.restore();
  }
  elipse(cx: number, cy: number, rx: number, ry: number, cor: string | CanvasGradient, o: { alpha?: number; rot?: number; borrao?: number } = {}) {
    const g = this.g, k = this.k;
    g.save(); g.globalAlpha = o.alpha ?? 1; if (o.borrao) g.filter = `blur(${o.borrao * k}px)`;
    g.fillStyle = cor; g.beginPath(); g.ellipse(cx * k, cy * k, rx * k, ry * k, o.rot ?? 0, 0, 6.2832); g.fill(); g.restore();
  }
  /** Pincelada: traço com largura (em unidades) e cor. */
  traco(x0: number, y0: number, x1: number, y1: number, larg: number, cor: string, alpha = 1, curva = 0) {
    const g = this.g, k = this.k;
    g.save(); g.globalAlpha = alpha; g.strokeStyle = cor; g.lineWidth = larg * k;
    g.beginPath(); g.moveTo(x0 * k, y0 * k);
    if (curva) g.quadraticCurveTo(((x0 + x1) / 2 + curva) * k, ((y0 + y1) / 2 - curva) * k, x1 * k, y1 * k); else g.lineTo(x1 * k, y1 * k);
    g.stroke(); g.restore();
  }
  /** Linha de tinta: contorno irregular que aparece só onde define forma. Larg em unidades. */
  tinta(pts: [number, number][], larg: number, cor = '#17101c', alpha = 0.95) {
    const g = this.g, k = this.k;
    g.save(); g.globalAlpha = alpha; g.strokeStyle = cor; g.lineCap = 'round';
    for (let i = 0; i < pts.length - 1; i++) {
      const w = larg * (0.7 + ruido(i * 2.3, pts[i][0], 5) * 0.8);
      g.lineWidth = w * k; g.beginPath(); g.moveTo(pts[i][0] * k, pts[i][1] * k); g.lineTo(pts[i + 1][0] * k, pts[i + 1][1] * k); g.stroke();
    }
    g.restore();
  }
  grad(x0: number, y0: number, x1: number, y1: number, paradas: [number, string][]) {
    const gr = this.g.createLinearGradient(x0 * this.k, y0 * this.k, x1 * this.k, y1 * this.k);
    for (const [t, c] of paradas) gr.addColorStop(t, c);
    return gr;
  }
  radial(cx: number, cy: number, r: number, paradas: [number, string][]) {
    const gr = this.g.createRadialGradient(cx * this.k, cy * this.k, 0, cx * this.k, cy * this.k, r * this.k);
    for (const [t, c] of paradas) gr.addColorStop(t, c);
    return gr;
  }
  retangulo(x: number, y: number, w: number, h: number, cor: string | CanvasGradient, alpha = 1) {
    this.g.save(); this.g.globalAlpha = alpha; this.g.fillStyle = cor; this.g.fillRect(x * this.k, y * this.k, w * this.k, h * this.k); this.g.restore();
  }
  /** Folhagem: centenas de pinceladas em elipse, de várias tonalidades, que depois da redução viram manchas orgânicas. */
  folhagem(x: number, y: number, w: number, h: number, tons: string[], r: Rng, densidade = 1, tam = 5) {
    const n = Math.round(w * h * 0.12 * densidade);
    for (let i = 0; i < n; i++) {
      const px = x + r() * w, py = y + r() * h;
      const t = Math.min(tons.length - 1, Math.floor(ruido(px * 0.09, py * 0.09, 4) * tons.length * 0.8 + r() * tons.length * 0.35));
      this.elipse(px, py, tam * r.r(0.5, 1.2), tam * r.r(0.35, 0.8), tons[t], { rot: r() * 3.14, alpha: 0.92 });
    }
  }
}

export interface Pixelado { w: number; h: number; idx: Int16Array; }

/** Reduz a tela para w x h (média de área) e quantiza para a paleta SEM pontilhado; limpa pixels órfãos. `alfa`: preserva transparência. */
export function pixelizar(t: Tela, w: number, h: number, o: { alfa?: boolean; limpar?: number; subconjunto?: number[]; reforco?: boolean } = {}): Pixelado {
  const pq = document.createElement('canvas'); pq.width = w; pq.height = h;
  const g = pq.getContext('2d', { willReadFrequently: true })!;
  g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
  // redução em duas etapas, para a média de área ser boa
  let fonte: HTMLCanvasElement = t.c;
  while (fonte.width / 2 > w * 1.5) {
    const m = document.createElement('canvas'); m.width = Math.ceil(fonte.width / 2); m.height = Math.ceil(fonte.height / 2);
    const mg = m.getContext('2d')!; mg.imageSmoothingEnabled = true; mg.imageSmoothingQuality = 'high'; mg.drawImage(fonte, 0, 0, m.width, m.height); fonte = m;
  }
  g.drawImage(fonte, 0, 0, w, h);
  const d = g.getImageData(0, 0, w, h).data;
  const idx = new Int16Array(w * h).fill(-1);
  for (let i = 0; i < w * h; i++) {
    if (o.alfa && d[i * 4 + 3] < 120) continue;
    idx[i] = maisProxima(d[i * 4], d[i * 4 + 1], d[i * 4 + 2], o.subconjunto);
  }
  for (let pass = 0; pass < (o.limpar ?? 2); pass++) {
    const nova = idx.slice();
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      const i = y * w + x, c = idx[i];
      if (c < 0) continue;
      const viz = [idx[i - 1], idx[i + 1], idx[i - w], idx[i + w]];
      if (viz.includes(c)) continue;
      // órfão: troca pela cor que mais se repete entre os vizinhos
      const cont = new Map<number, number>();
      for (const v of viz) if (v >= 0) cont.set(v, (cont.get(v) ?? 0) + 1);
      let melhor = c, n = 1;
      for (const [v, q] of cont) if (q > n) { melhor = v; n = q; }
      if (n >= 2) nova[i] = melhor;
    }
    idx.set(nova);
  }
  return { w, h, idx };
}

/** Pixelado -> data URL PNG (cada pixel com a cor exata da paleta). */
export function paraPng(p: Pixelado): string {
  const cv = document.createElement('canvas'); cv.width = p.w; cv.height = p.h;
  const g = cv.getContext('2d')!; const im = g.createImageData(p.w, p.h);
  for (let i = 0; i < p.w * p.h; i++) {
    const c = p.idx[i];
    if (c < 0) continue;
    const [r, gg, b] = rgb(TODAS[c]);
    im.data[i * 4] = r; im.data[i * 4 + 1] = gg; im.data[i * 4 + 2] = b; im.data[i * 4 + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  return cv.toDataURL('image/png');
}

const cachePng = new Map<string, string>();
export function cache(chave: string, fazer: () => Pixelado): string {
  let u = cachePng.get(chave);
  if (!u) { u = paraPng(fazer()); cachePng.set(chave, u); }
  return u;
}
