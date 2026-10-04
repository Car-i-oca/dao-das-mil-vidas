import { Pix, PAL, circulo, elipse, caixa, poligono, uniao } from './pix';

/**
 * Cenários 320x180 em camadas (céu, longe, meio, perto), com versão de dia e de noite. As camadas saem separadas
 * para o jogo animar (nuvens e água deslizando, lanternas piscando) sem refazer o desenho.
 */
export const LARGURA = 320;
export const ALTURA = 180;

export interface Camadas { ceu: Pix; nuvens: Pix; longe: Pix; meio: Pix; agua: Pix; perto: Pix; luzes: Pix }

class Rng {
  constructor(private s: number) {}
  next() { this.s = (Math.imul(this.s, 1664525) + 1013904223) >>> 0; return this.s / 4294967296; }
  int(a: number, b: number) { return a + Math.floor(this.next() * (b - a + 1)); }
}
const novo = (w = LARGURA, h = ALTURA) => new Pix(w, h);
const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const bay = (x: number, y: number) => BAYER[y & 3][x & 3] / 16;

function ceu(night: boolean, kind: string): Pix {
  const p = novo();
  const faixas = night ? [PAL.noite[0], PAL.noite[1], PAL.noite[2], PAL.noite[3], PAL.roxo[1]] : kind === 'montanha'
    ? [PAL.ceu[1], PAL.ceu[2], PAL.ceu[3], PAL.ceu[4], PAL.papel[3]] : [PAL.ceu[1], PAL.ceu[2], PAL.ceu[3], PAL.ceu[4], PAL.ouro[4]];
  p.gradiente(0, 0, LARGURA, 118, faixas);
  return p;
}

function astros(p: Pix, night: boolean, r: Rng) {
  if (night) {
    for (let i = 0; i < 70; i++) { const x = r.int(0, 319), y = r.int(0, 80); p.ponto(x, y, r.next() < 0.2 ? PAL.ouro[4] : PAL.aco[r.int(3, 4)]); }
    // lua
    for (let y = 0; y < 60; y++) for (let x = 200; x < 270; x++) { const d = Math.hypot(x - 238, y - 30) / 19; if (d < 1.9 && d > 1 && bay(x, y) < (1.9 - d) * 0.7) p.set(x, y, PAL.roxo[2]); }
    p.forma(circulo(238, 30, 13), PAL.aco, { volume: 12, semContorno: true, pontilhado: 0.4 });
    for (const [x, y, rr] of [[233, 27, 3], [243, 35, 2.2], [240, 24, 1.6]] as const) p.forma(circulo(x, y, rr), PAL.aco.slice(1, 4), { volume: 1, semContorno: true });
  } else {
    for (let y = 0; y < 90; y++) for (let x = 210; x < 290; x++) { const d = Math.hypot(x - 250, y - 38) / 36; if (d < 1 && bay(x, y) < (1 - d) * 0.5) p.set(x, y, PAL.ouro[4]); }
    p.forma(circulo(250, 38, 11), PAL.fogo.slice(2), { volume: 10, semContorno: true });
    p.forma(circulo(250, 38, 9), PAL.ouro.slice(3), { volume: 9, semContorno: true });
  }
}

function nuvem(p: Pix, cx: number, cy: number, s: number, night: boolean) {
  const r = night ? PAL.noite.slice(1) : PAL.ceu.slice(2);
  const f = uniao(elipse(cx, cy, 16 * s, 5 * s), elipse(cx - 9 * s, cy + 1, 9 * s, 4 * s), elipse(cx + 10 * s, cy + 1, 10 * s, 4 * s), elipse(cx - 2 * s, cy - 4 * s, 9 * s, 5 * s));
  p.forma(f, night ? [PAL.noite[1], PAL.noite[2], PAL.noite[3], PAL.roxo[2]] : [PAL.ceu[3], PAL.ceu[4], PAL.papel[4], '#ffffff'].slice(0, 4), { volume: 5 * s, semContorno: true, pontilhado: 0.5 });
  void r;
}

/** Cadeia de montanhas em picos (ruído "ridged"): tons pela altura e pela inclinação (vertente da luz mais clara), neve opcional. */
function cadeia(p: Pix, y0: number, amp: number, passo: number, r: Rng, rampa: string[], opt: { neve?: boolean; baseY?: number; suave?: number } = {}) {
  const base = opt.baseY ?? ALTURA;
  const fases = [r.next() * 6.28, r.next() * 6.28, r.next() * 6.28];
  const alt = (x: number) => {
    const s = opt.suave ? 0.35 : 1;
    const a1 = 1 - Math.abs(Math.sin(x / passo + fases[0]));
    const a2 = 1 - Math.abs(Math.sin(x / (passo * 0.43) + fases[1]));
    const a3 = 1 - Math.abs(Math.sin(x / (passo * 0.19) + fases[2]));
    return y0 - amp * (0.62 * a1 + 0.28 * a2 * s + 0.1 * a3 * s);
  };
  const ys: number[] = [];
  for (let x = -3; x < LARGURA + 3; x++) ys[x + 3] = Math.round(alt(x));
  const Y = (x: number) => ys[Math.max(0, Math.min(LARGURA + 5, x + 3))];
  const topo = y0 - amp;
  for (let x = 0; x < LARGURA; x++) {
    const inc = Y(x + 3) - Y(x - 3); // negativo: o terreno sobe para a direita (vertente virada à esquerda, iluminada)
    for (let y = Y(x); y < base; y++) {
      const prof = y - Y(x);
      const t = Math.min(1, prof / Math.max(14, base - Y(x)));
      let tom = t < 0.12 ? 3 : t < 0.4 ? 2 : t < 0.75 ? 1 : 0;
      if (inc > 3 && t < 0.7) tom = Math.min(rampa.length - 1, tom + 1);
      else if (inc < -3 && t < 0.7) tom = Math.max(0, tom - 1);
      if (t > 0.1 && t < 0.9 && ((x * 7 + y * 3) % 23 === 0)) tom = Math.max(0, tom - 1); // veios de rocha
      p.set(x, y, rampa[Math.min(rampa.length - 1, tom)]);
    }
    if (opt.neve) {
      const lim = topo + amp * 0.42;
      if (Y(x) < lim) {
        const prof = 4 + (lim - Y(x)) * 0.5 + Math.sin(x * 0.7) * 1.4 + Math.sin(x * 1.9) * 0.8;
        for (let y = Y(x); y < Y(x) + prof; y++) p.set(x, y, y - Y(x) < 1.2 || inc > 3 ? PAL.aco[4] : inc < -3 ? PAL.aco[2] : PAL.aco[3]);
      }
    }
  }
  return ys;
}

function pinheiro(p: Pix, x: number, y: number, h: number, r: string[]) {
  for (let i = 0; i < 4; i++) {
    const w = (h / 2) * (0.5 + i * 0.28), yy = y - h + i * (h / 4.2);
    p.forma(poligono([[x - w, yy + h / 3], [x, yy], [x + w, yy + h / 3]]), r, { volume: 2.5, semContorno: i > 0, pontilhado: 0.3 });
  }
  p.retangulo(x - 1, y - 2, 2, 3, PAL.madeira[1]);
}

function casa(p: Pix, x: number, y: number, w: number, h: number, night: boolean, tel: string[]) {
  p.forma(caixa(x + w / 2, y - h / 2, w / 2, h / 2, 0.5), PAL.papel, { volume: 3, pontilhado: 0.3, semContorno: false });
  p.retangulo(x, y - 3, w, 3, PAL.madeira[1]);
  const jan = night ? PAL.ouro[3] : PAL.madeira[1];
  p.retangulo(Math.round(x + w * 0.2), Math.round(y - h * 0.65), 4, 5, jan);
  if (night) p.retangulo(Math.round(x + w * 0.2), Math.round(y - h * 0.65), 4, 1, PAL.ouro[4]);
  p.retangulo(Math.round(x + w * 0.62), Math.round(y - h * 0.55), 5, h * 0.55 | 0, PAL.madeira[1]);
  // telhado em beirais curvos
  const t = poligono([[x - 4, y - h + 1], [x + 3, y - h - 1], [x + w / 2, y - h - 11], [x + w - 3, y - h - 1], [x + w + 4, y - h + 1], [x + w + 1, y - h + 4], [x - 1, y - h + 4]]);
  p.forma(t, PAL[tel as unknown as keyof typeof PAL] ?? tel, { volume: 4, pontilhado: 0.3 });
}

function pagode(p: Pix, cx: number, y: number, andares: number, night: boolean) {
  let yy = y;
  for (let i = 0; i < andares; i++) {
    const w = 15 - i * 2.5, h = 9;
    p.forma(caixa(cx, yy - h / 2, w * 0.45, h / 2), PAL.papel, { volume: 3, semContorno: false });
    p.retangulo(cx - 1, yy - 6, 3, 4, night ? PAL.ouro[3] : PAL.madeira[1]);
    p.forma(poligono([[cx - w - 2, yy - h + 2], [cx - w / 2, yy - h - 1], [cx, yy - h - 4], [cx + w / 2, yy - h - 1], [cx + w + 2, yy - h + 2], [cx + w, yy - h + 4], [cx - w, yy - h + 4]]), PAL.vermelho, { volume: 3.5 });
    yy -= h + 3;
  }
  p.linha(cx, yy - 1, cx, yy - 8, PAL.ouro[2]); p.ponto(cx, yy - 9, PAL.ouro[4]);
}

function rio(p: Pix, y0: number, y1: number, night: boolean, r: Rng) {
  const t = night ? [PAL.noite[1], PAL.noite[2], PAL.agua[0], PAL.agua[1]] : [PAL.agua[2], PAL.agua[3], PAL.agua[2], PAL.agua[1]];
  p.gradiente(0, y0, LARGURA, y1 - y0, [t[0], t[2], t[3]]);
  for (let i = 0; i < 90; i++) { const x = r.int(0, 310), y = r.int(y0 + 1, y1 - 2), l = r.int(4, 14); p.linha(x, y, x + l, y, night ? PAL.agua[3] : PAL.agua[4]); }
}

function relva(p: Pix, y0: number, r: Rng, night: boolean) {
  const g = night ? [PAL.grama[0], PAL.grama[0], PAL.grama[1], PAL.grama[2]] : PAL.grama.slice(1);
  for (let x = 0; x < LARGURA; x++) {
    const top = y0 + Math.round(Math.sin(x / 17) * 2 + Math.sin(x / 5) * 0.8);
    for (let y = top; y < ALTURA; y++) { const t = (y - top) / (ALTURA - top); p.set(x, y, g[Math.min(g.length - 1, Math.floor(t * g.length * 0.9 + (bay(x, y) - 0.5) * 0.9))] ?? g[0]); }
    if (r.next() < 0.22) { const hh = r.int(2, 5); for (let k = 0; k < hh; k++) p.ponto(x + (k % 2), top - k, g[Math.min(g.length - 1, 1 + (k > 1 ? 2 : 1))]); }
  }
  for (let i = 0; i < 40; i++) { const x = r.int(0, 319), y = r.int(y0 + 6, 178); p.ponto(x, y, night ? PAL.papel[2] : [PAL.vermelho[3], PAL.ouro[4], PAL.papel[4]][r.int(0, 2)]); }
}

export function vilarejo(night: boolean, seed = 7): Camadas {
  const r = new Rng(seed * 977 + (night ? 1 : 0));
  const c: Camadas = { ceu: ceu(night, 'vilarejo'), nuvens: novo(640, 70), longe: novo(), meio: novo(), agua: novo(), perto: novo(), luzes: novo() };
  astros(c.ceu, night, r);
  for (const [x, y, s] of [[60, 14, 1], [170, 34, 1.3], [330, 20, 1.1], [450, 40, 1.2], [560, 14, 1]] as const) nuvem(c.nuvens, x, y, s, night);
  // montanhas distantes
  cadeia(c.longe, 100, 36, 24, r, night ? [PAL.azul[0], PAL.azul[0], PAL.noite[2], PAL.azul[1], PAL.azul[1]] : [PAL.azul[2], PAL.azul[3], PAL.azul[3], PAL.ceu[3], PAL.ceu[4]], { baseY: 124, neve: false });
  cadeia(c.longe, 114, 20, 17, r, night ? [PAL.noite[1], PAL.azul[0], PAL.azul[1], PAL.azul[1], PAL.azul[1]] : [PAL.jade[1], PAL.jade[2], PAL.azul[3], PAL.ceu[3], PAL.ceu[3]], { baseY: 130 });
  // colina com pinheiros
  cadeia(c.meio, 126, 10, 40, r, night ? [PAL.grama[0], PAL.grama[0], PAL.grama[1], PAL.grama[1], PAL.grama[2]] : [PAL.grama[1], PAL.grama[2], PAL.grama[2], PAL.grama[3], PAL.grama[3]], { baseY: 150, suave: 1 });
  const arv = night ? [PAL.grama[0], PAL.grama[0], PAL.grama[1], PAL.grama[1]] : [PAL.grama[0], PAL.grama[1], PAL.grama[2], PAL.grama[3]];
  for (let i = 0; i < 22; i++) pinheiro(c.meio, r.int(6, 314), r.int(124, 134), r.int(14, 22), arv);
  // aldeia
  const casas: [number, number, number, number][] = [[24, 142, 24, 16], [58, 144, 20, 14], [96, 141, 26, 18], [200, 143, 22, 15], [236, 141, 26, 17], [276, 144, 20, 14]];
  for (const [x, y, w, h] of casas) casa(c.meio, x, y, w, h, night, r.next() < 0.5 ? PAL.vermelho : PAL.madeira);
  pagode(c.meio, 168, 144, 3, night);
  // rio e ponte
  rio(c.agua, 148, 166, night, r);
  c.agua.forma(poligono([[104, 152], [112, 142], [132, 139], [152, 142], [160, 152], [160, 158], [104, 158]]), PAL.pedra, { volume: 4 });
  c.agua.forma(uniao(elipse(132, 156, 14, 8), elipse(132, 156, 14, 8)), PAL.agua.slice(0, 3), { volume: 1, semContorno: true });
  c.agua.retangulo(104, 140, 56, 2, PAL.madeira[2]);
  for (let x = 104; x <= 160; x += 8) c.agua.retangulo(x, 137, 2, 5, PAL.madeira[1]);
  // primeiro plano
  relva(c.perto, 164, r, night);
  // árvore à esquerda, em silhueta
  c.perto.forma(caixa(12, 150, 3, 28), PAL.madeira, { volume: 3 });
  c.perto.forma(uniao(circulo(10, 118, 20), circulo(-2, 128, 14), circulo(26, 128, 14), circulo(12, 104, 14)), night ? [PAL.grama[0], PAL.grama[0], PAL.grama[1], PAL.grama[1]] : PAL.grama.slice(1), { volume: 10, pontilhado: 0.8, semContorno: true });
  // lanternas penduradas e janelas acesas
  if (night) {
    for (let x = 6; x < 320; x += 20) { const y = 100 + Math.round(Math.sin(x / 30) * 3); c.luzes.forma(circulo(x, y + 6, 2.4), PAL.fogo, { volume: 2.4, brilho: 1, semContorno: true }); c.luzes.ponto(x, y + 5, PAL.ouro[4]); }
    for (let x = 0; x < 320; x += 2) c.luzes.ponto(x, 100 + Math.round(Math.sin(x / 30) * 3), PAL.madeira[1]);
    for (let i = 0; i < 18; i++) { const x = r.int(8, 312); c.luzes.ponto(x, 150 + (i % 8), PAL.fogo[3]); }
  } else {
    for (let x = 14; x < 320; x += 52) { c.luzes.retangulo(x, 118, 1, 22, PAL.madeira[1]); }
  }
  return c;
}

export function montanha(night: boolean, seed = 3): Camadas {
  const r = new Rng(seed * 733 + (night ? 1 : 0));
  const c: Camadas = { ceu: ceu(night, 'montanha'), nuvens: novo(640, 70), longe: novo(), meio: novo(), agua: novo(), perto: novo(), luzes: novo() };
  astros(c.ceu, night, r);
  for (const [x, y, s] of [[80, 26, 1.2], [260, 16, 1], [420, 34, 1.3], [580, 22, 1]] as const) nuvem(c.nuvens, x, y, s, night);
  cadeia(c.longe, 86, 62, 36, r, night ? [PAL.noite[2], PAL.azul[0], PAL.azul[1], PAL.roxo[2], PAL.aco[2]] : [PAL.azul[1], PAL.azul[2], PAL.azul[3], PAL.ceu[3], PAL.ceu[4]], { baseY: 130, neve: true });
  cadeia(c.meio, 118, 42, 26, r, night ? [PAL.noite[0], PAL.noite[1], PAL.azul[0], PAL.azul[1], PAL.pedra[2]] : [PAL.pedra[1], PAL.pedra[2], PAL.pedra[3], PAL.pedra[3], PAL.pedra[4]], { baseY: 168, neve: false });
  // templo num penhasco
  const tx = 214, ty = 100;
  c.meio.forma(poligono([[tx - 40, 170], [tx - 34, 128], [tx - 28, 120], [tx - 22, 108], [tx - 12, 106], [tx + 14, 106], [tx + 24, 110], [tx + 32, 122], [tx + 40, 134], [tx + 46, 170]]), night ? [PAL.noite[0], PAL.noite[1], PAL.azul[0], PAL.pedra[1], PAL.pedra[2]] : PAL.pedra, { volume: 10, pontilhado: 0.7 });
  c.meio.retangulo(tx - 24, ty + 4, 50, 3, night ? PAL.pedra[1] : PAL.pedra[3]);
  for (let x = tx - 22; x <= tx + 22; x += 8) c.meio.retangulo(x, ty - 2, 2, 8, PAL.vermelho[1]);
  pagode(c.meio, tx, ty + 2, 3, night);
  c.meio.forma(caixa(tx - 30, ty - 1, 7, 4), PAL.papel, { volume: 3 });
  c.meio.forma(poligono([[tx - 39, ty - 3], [tx - 30, ty - 10], [tx - 21, ty - 3], [tx - 23, ty], [tx - 37, ty]]), PAL.vermelho, { volume: 3 });
  for (let i = 0; i < 18; i++) c.meio.retangulo(tx - 5 + i - 0, ty + 8 + i * 2, 10 - (i >> 2), 1, i % 2 ? PAL.pedra[3] : PAL.pedra[2]);
  // cachoeira
  for (let y = 112; y < 166; y++) for (let x = 78; x < 84; x++) c.meio.set(x, y, (x + (y >> 1)) % 3 === 0 ? PAL.agua[4] : PAL.agua[3]);
  // pinheiros do meio
  const arv = night ? [PAL.grama[0], PAL.grama[0], PAL.grama[1], PAL.grama[1]] : [PAL.grama[0], PAL.grama[1], PAL.grama[2], PAL.grama[3]];
  for (let i = 0; i < 26; i++) pinheiro(c.meio, r.int(4, 316), r.int(150, 176), r.int(16, 28), arv);
  // névoa
  for (let y = 120; y < 150; y++) for (let x = 0; x < 320; x++) if (bay(x, y) < Math.max(0, 0.5 - Math.abs(y - 134) / 26)) c.agua.set(x, y, night ? PAL.roxo[1] : PAL.papel[4]);
  // pico em primeiro plano
  c.perto.forma(poligono([[0, 180], [0, 140], [18, 126], [34, 150], [52, 140], [70, 180]]), night ? [PAL.noite[0], PAL.noite[0], PAL.noite[1], PAL.azul[0], PAL.azul[1]] : PAL.pedra, { volume: 12, pontilhado: 0.8 });
  c.perto.forma(poligono([[250, 180], [270, 148], [290, 160], [306, 138], [320, 150], [320, 180]]), night ? [PAL.noite[0], PAL.noite[0], PAL.noite[1], PAL.azul[0], PAL.azul[1]] : PAL.pedra, { volume: 12, pontilhado: 0.8 });
  for (let i = 0; i < 16; i++) pinheiro(c.perto, r.int(0, 300), r.int(172, 179), r.int(26, 38), night ? [PAL.noite[0], PAL.grama[0], PAL.grama[0], PAL.grama[1]] : [PAL.grama[0], PAL.grama[1], PAL.grama[1], PAL.grama[2]]);
  if (night) for (const [x, y] of [[tx - 4, ty + 14], [tx + 6, ty + 14], [tx - 24, ty + 3]]) c.luzes.retangulo(x, y, 3, 3, PAL.ouro[3]);
  return c;
}

/** Junta as camadas numa imagem só (nuvens e água no ponto de partida). */
export function compor(c: Camadas): Pix {
  const p = novo();
  p.colar(c.ceu, 0, 0);
  const nuv = new Pix(LARGURA, 70);
  for (let y = 0; y < 70; y++) for (let x = 0; x < LARGURA; x++) { const q = c.nuvens.get(x, y); if (q) nuv.set(x, y, q); }
  p.colar(nuv, 0, 6);
  for (const l of [c.longe, c.meio, c.agua, c.perto, c.luzes]) p.colar(l, 0, 0);
  return p;
}

export const CENARIOS_AMOSTRA = { vilarejo, montanha };
