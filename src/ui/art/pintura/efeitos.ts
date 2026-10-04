import { PAL } from './paleta';
import { Tela, pixelizar, cache, rng } from './base';

/** Efeitos de técnica 64x64 pintados (um por etiqueta de técnica/trilha), no mesmo estilo e paleta das demais peças. */
type Pt = [number, number];
export const EFEITOS = ['golpe', 'espada', 'corpo', 'qi', 'mente', 'formacao', 'veneno', 'besta', 'demonio', 'alquimia', 'forja', 'fuga'] as const;

function pintar(kind: string): Tela {
  const t = new Tela(64, 64, 640);
  const r = rng(kind.length * 31 + kind.charCodeAt(0));
  switch (kind) {
    case 'espada': case 'golpe': {
      t.mancha([[6, 52], [10, 30], [26, 12], [50, 6], [58, 10], [40, 14], [24, 28], [14, 46]], t.grad(6, 52, 58, 6, [[0, PAL.ceu[3]], [0.6, PAL.branco[2]], [1, PAL.branco[2]]]), { seed: 1, tremor: 0.4 });
      t.mancha([[10, 54], [14, 34], [30, 16], [52, 8], [44, 16], [28, 32], [18, 48]], PAL.ceu[4], { seed: 2, tremor: 0.4, alpha: 0.85 });
      t.tinta([[8, 50], [12, 30], [28, 14], [54, 7]], 1.4, PAL.branco[2], 0.95);
      for (let i = 0; i < 7; i++) t.elipse(r.r(14, 56), r.r(6, 40), 0.9, 0.9, PAL.branco[2], { alpha: 0.9 });
      break;
    }
    case 'corpo': {
      t.elipse(32, 32, 24, 24, PAL.ocre[3], { alpha: 0.4, borrao: 3 });
      for (const [rr, c] of [[22, PAL.ocre[2]], [15, PAL.ocre[4]], [8, PAL.branco[2]]] as [number, string][]) t.tinta(Array.from({ length: 25 }, (_, i) => [32 + Math.cos(i / 24 * 6.28) * rr, 32 + Math.sin(i / 24 * 6.28) * rr] as Pt), rr > 10 ? 3 : 2, c, 0.95);
      for (let a = 0; a < 6.28; a += 0.6) t.tinta([[32 + Math.cos(a) * 24, 32 + Math.sin(a) * 24], [32 + Math.cos(a) * 31, 32 + Math.sin(a) * 31]], 1.2, PAL.ocre[4], 0.9);
      break;
    }
    case 'qi': {
      t.elipse(32, 32, 28, 28, PAL.azul[3], { alpha: 0.25, borrao: 4 });
      t.elipse(32, 32, 16, 16, t.radial(32, 32, 16, [[0, PAL.branco[2]], [0.45, PAL.azul[4]], [1, PAL.azul[2]]]));
      for (let a = 0.2; a < 6.28; a += 0.9) t.mancha([[32 + Math.cos(a) * 14, 32 + Math.sin(a) * 14], [32 + Math.cos(a + 0.3) * 30, 32 + Math.sin(a + 0.3) * 30], [32 + Math.cos(a + 0.6) * 14, 32 + Math.sin(a + 0.6) * 14]], PAL.azul[3], { seed: 3, tremor: 0.4, alpha: 0.8 });
      t.tinta(Array.from({ length: 25 }, (_, i) => [32 + Math.cos(i / 24 * 6.28) * 16, 32 + Math.sin(i / 24 * 6.28) * 16] as Pt), 1, PAL.azul[1], 0.8);
      break;
    }
    case 'mente': {
      t.mancha([[4, 32], [18, 18], [32, 14], [46, 18], [60, 32], [46, 46], [32, 50], [18, 46]], PAL.roxo[3], { seed: 4, tremor: 0.3 });
      t.mancha([[10, 32], [22, 22], [32, 20], [42, 22], [54, 32], [42, 42], [32, 44], [22, 42]], PAL.branco[2], { seed: 5, tremor: 0.2 });
      t.elipse(32, 32, 9, 9, PAL.roxo[2]); t.elipse(32, 32, 4, 4, PAL.tinta[0]); t.elipse(34, 30, 1.4, 1.4, PAL.branco[2]);
      t.tinta([[4, 32], [18, 18], [32, 14], [46, 18], [60, 32]], 1.6, PAL.roxo[0], 0.95);
      break;
    }
    case 'formacao': {
      const hex = (rr: number) => Array.from({ length: 7 }, (_, i) => [32 + Math.cos(i * 1.0472 + 0.5236) * rr, 32 + Math.sin(i * 1.0472 + 0.5236) * rr] as Pt);
      t.mancha(hex(26).slice(0, 6), PAL.jade[2], { seed: 6, tremor: 0.1, alpha: 0.5 });
      for (const [rr, c, w] of [[26, PAL.jade[4], 2], [18, PAL.ouro[3], 1.6], [10, PAL.jade[3], 1.6]] as [number, string, number][]) t.tinta(hex(rr), w, c, 0.95);
      for (let i = 0; i < 6; i++) t.tinta([[32, 32], hex(26)[i]], 1, PAL.ouro[3], 0.9);
      t.elipse(32, 32, 3, 3, PAL.ouro[4]);
      break;
    }
    case 'veneno': {
      for (let i = 0; i < 12; i++) t.elipse(r.r(10, 52), r.r(12, 50), r.r(7, 13), r.r(6, 10), [PAL.jade[1], PAL.jade[2], PAL.folha[4], PAL.jade[3]][i % 4], { alpha: 0.78, borrao: 0.6 });
      for (let i = 0; i < 6; i++) t.elipse(r.r(12, 52), r.r(14, 48), r.r(2, 3.6), r.r(2, 3.6), PAL.jade[4], { alpha: 0.9 });
      break;
    }
    case 'besta': {
      for (let i = 0; i < 3; i++) { const x = 14 + i * 14; t.mancha([[x, 6], [x + 5, 6], [x + 12, 58], [x + 7, 58]], t.grad(x + 12, 6, x, 58, [[0, PAL.branco[2]], [1, PAL.ocre[3]]]), { seed: 7 + i, tremor: 0.3 }); t.tinta([[x, 6], [x + 7, 58]], 0.9, PAL.tinta[0], 0.8); }
      for (let i = 0; i < 8; i++) t.elipse(r.r(8, 56), r.r(50, 62), 1, 1.4, PAL.vermelho[3], { alpha: 0.9 });
      break;
    }
    case 'demonio': {
      for (let i = 0; i < 5; i++) { const x = 12 + i * 10; t.mancha([[x - 6, 60], [x - 3, 32 - (i % 2) * 8], [x, 14 + (i % 3) * 4], [x + 3, 32 - (i % 2) * 8], [x + 6, 60]], t.grad(x, 14, x, 60, [[0, PAL.vermelho[3]], [0.5, PAL.vermelho[2]], [1, PAL.roxo[0]]]), { seed: 9 + i, tremor: 0.5 }); }
      t.elipse(32, 52, 26, 8, PAL.vermelho[1], { alpha: 0.7, borrao: 2 });
      for (let i = 0; i < 10; i++) t.elipse(r.r(8, 56), r.r(8, 40), 0.9, 0.9, PAL.fogo[3]);
      break;
    }
    case 'alquimia': case 'forja': {
      t.elipse(32, 34, 26, 26, PAL.fogo[2], { alpha: 0.3, borrao: 4 });
      t.elipse(32, 34, 17, 17, t.radial(32, 34, 17, [[0, PAL.ouro[4]], [0.45, PAL.fogo[3]], [1, PAL.fogo[2]]]));
      for (let a = 0; a < 6.28; a += 0.55) t.tinta([[32 + Math.cos(a) * 16, 34 + Math.sin(a) * 16], [32 + Math.cos(a) * (28 + (a * 7) % 4), 34 + Math.sin(a) * (28 + (a * 7) % 4)]], 1.6, a > 3 ? PAL.fogo[3] : PAL.ouro[3], 0.95);
      break;
    }
    case 'fuga': {
      for (let i = 0; i < 5; i++) t.mancha([[4, 14 + i * 9], [40 + (i % 2) * 8, 12 + i * 9], [58, 16 + i * 9], [40, 18 + i * 9]], PAL.pedra[3 + (i % 2)], { seed: 11 + i, tremor: 0.3, alpha: 0.75 });
      for (let i = 0; i < 8; i++) t.elipse(r.r(8, 56), r.r(10, 56), r.r(1.4, 3), r.r(1, 2), PAL.ocre[3], { alpha: 0.9 });
      break;
    }
    default: {
      t.elipse(32, 32, 22, 22, PAL.ouro[3], { alpha: 0.4, borrao: 3 });
      for (let a = 0; a < 6.28; a += 0.78) t.mancha([[32, 32], [32 + Math.cos(a) * 28, 32 + Math.sin(a) * 28], [32 + Math.cos(a + 0.3) * 12, 32 + Math.sin(a + 0.3) * 12]], PAL.ouro[a > 3 ? 2 : 4], { seed: 12, tremor: 0.3 });
    }
  }
  return t;
}
export function efeitoUrl(kind: string): string { return cache(`ef|${kind}`, () => pixelizar(pintar(kind), 64, 64, { alfa: true, limpar: 1 })); }
