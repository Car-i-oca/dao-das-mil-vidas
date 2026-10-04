import { PAL } from './paleta';
import { Tela, type Rng } from './base';
import type { FundoTipo } from './aparencia';

/** Fundos pintados dos retratos, conforme o lugar ou a facção (coordenadas de 0 a 100). Devolve a cor da luz de recorte. */
export function pintarFundo(t: Tela, tipo: FundoTipo, r: Rng): string {
  const folh = (a: number, b: number, c: number, d: number, tons: string[], dens = 1, tam = 6) => t.folhagem(a, b, c, d, tons, r, dens, tam);
  switch (tipo) {
    case 'seita': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.ceu[2]], [0.55, PAL.ceu[4]], [1, PAL.panoVerde[3]]]));
      t.mancha([[0, 62], [18, 44], [36, 58], [58, 38], [80, 56], [100, 44], [100, 100], [0, 100]], PAL.azul[2], { seed: 3, tremor: 1.5 });
      t.mancha([[0, 72], [26, 60], [52, 70], [76, 58], [100, 68], [100, 100], [0, 100]], PAL.folha[4], { seed: 4, tremor: 1.5 });
      for (const [x, y, s] of [[18, 40, 1], [66, 32, 1.35]] as [number, number, number][]) { t.mancha([[x - 14 * s, y + 14 * s], [x, y - 2 * s], [x + 14 * s, y + 14 * s]], PAL.vermelho[2], { seed: 5, tremor: 0.4 }); t.retangulo(x - 9 * s, y + 14 * s, 18 * s, 22 * s, PAL.branco[1]); t.retangulo(x - 9 * s, y + 18 * s, 18 * s, 2 * s, PAL.marrom[2]); }
      folh(0, 60, 100, 40, [PAL.folha[1], PAL.folha[2], PAL.folha[3], PAL.folha[4]], 0.9, 5);
      t.elipse(70, 18, 16, 3, PAL.ceu[5], { alpha: 0.8, borrao: 1 });
      return PAL.luz[2];
    }
    case 'vila': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.ceu[2]], [0.5, PAL.ceu[4]], [1, PAL.poente[2]]]));
      t.mancha([[0, 58], [24, 46], [50, 56], [78, 44], [100, 54], [100, 100], [0, 100]], PAL.folha[3], { seed: 2, tremor: 1.5 });
      for (const [x, y, w] of [[8, 66, 24], [40, 70, 22], [70, 64, 26]] as [number, number, number][]) { t.retangulo(x, y, w, 20, PAL.branco[1]); t.retangulo(x, y + 14, w, 6, PAL.marrom[1]); t.mancha([[x - 3, y], [x + w / 2, y - 14], [x + w + 3, y]], PAL.marrom[2], { seed: 6, tremor: 0.3 }); t.retangulo(x + w * 0.4, y + 8, 5, 12, PAL.marrom[0]); }
      folh(0, 78, 100, 22, [PAL.folha[2], PAL.folha[3], PAL.folha[4], PAL.folha[5]], 0.9, 5);
      return PAL.luz[2];
    }
    case 'cidade': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.ceu[3]], [1, PAL.ocre[4]]]));
      for (let i = 0; i < 6; i++) { const x = i * 18 - 6, h = 24 + (i % 3) * 10; t.retangulo(x, 70 - h, 17, h + 30, [PAL.marrom[2], PAL.cinza[3], PAL.marrom[3]][i % 3]); t.mancha([[x - 2, 70 - h], [x + 8.5, 58 - h], [x + 19, 70 - h]], PAL.vermelho[1 + (i % 2)], { seed: i, tremor: 0.3 }); for (let k = 0; k < 3; k++) t.retangulo(x + 3 + (k % 2) * 7, 74 - h + k * 9, 4, 5, PAL.marrom[0]); }
      for (let i = 0; i < 8; i++) t.traco(i * 14, 46, i * 14 + 7, 50, 0.5, PAL.marrom[1], 0.8);
      for (let i = 0; i < 6; i++) t.elipse(8 + i * 17, 50, 2.2, 3, PAL.fogo[2]);
      t.retangulo(0, 84, 100, 16, PAL.pedra[2]);
      return PAL.luz[2];
    }
    case 'montanha': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.ceu[1]], [0.5, PAL.ceu[3]], [1, PAL.ceu[5]]]));
      t.mancha([[0, 56], [16, 34], [28, 50], [46, 22], [64, 48], [82, 30], [100, 52], [100, 100], [0, 100]], PAL.azul[1], { seed: 3, tremor: 1.2 });
      t.mancha([[34, 36], [46, 22], [58, 40], [50, 36], [44, 42]], PAL.cinza[4], { seed: 8, tremor: 0.4 });
      t.mancha([[0, 74], [22, 56], [46, 70], [70, 54], [100, 70], [100, 100], [0, 100]], PAL.pedra[2], { seed: 4, tremor: 1.2 });
      folh(0, 70, 100, 30, [PAL.folha[2], PAL.folha[3], PAL.folha[4]], 0.7, 5);
      t.elipse(24, 14, 14, 3, PAL.branco[2], { alpha: 0.9, borrao: 0.8 });
      return PAL.luz[2];
    }
    case 'templo': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.marrom[1]], [1, PAL.marrom[0]]]));
      for (const x of [6, 32, 68, 92]) { t.retangulo(x - 5, 0, 10, 100, t.grad(x + 5, 0, x - 5, 0, [[0, PAL.vermelho[2]], [1, PAL.vermelho[0]]])); }
      t.retangulo(0, 0, 100, 10, PAL.vermelho[1]);
      for (let i = 0; i < 7; i++) t.elipse(14 + i * 12, 12, 3.2, 5, PAL.ouro[2], { alpha: 0.9 });
      t.elipse(50, 40, 34, 28, PAL.fogo[3], { alpha: 0.16, borrao: 8 });
      return PAL.fogo[3];
    }
    case 'mar': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.ceu[2]], [0.55, PAL.ceu[4]], [0.56, PAL.agua[2]], [1, PAL.agua[0]]]));
      t.mancha([[10, 54], [26, 54], [24, 30], [14, 30]], PAL.branco[1], { seed: 3, tremor: 0.4 });
      t.mancha([[2, 56], [40, 56], [34, 62], [8, 62]], PAL.marrom[2], { seed: 4, tremor: 0.4 });
      for (let i = 0; i < 30; i++) t.traco(r.r(0, 90), r.r(60, 98), r.r(4, 18) + 4, r.r(60, 98), 0.7, PAL.agua[4], 0.8);
      return PAL.luz[2];
    }
    case 'deserto': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.ceu[2]], [0.5, PAL.poente[2]], [1, PAL.ocre[3]]]));
      t.elipse(78, 22, 10, 10, PAL.ouro[4]);
      t.mancha([[0, 66], [30, 52], [56, 66], [80, 56], [100, 64], [100, 100], [0, 100]], PAL.ocre[2], { seed: 3, tremor: 1.5 });
      t.mancha([[0, 80], [34, 70], [68, 82], [100, 74], [100, 100], [0, 100]], PAL.ocre[1], { seed: 4, tremor: 1.5 });
      return PAL.ouro[4];
    }
    case 'gelo': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.ceu[3]], [1, PAL.ceu[5]]]));
      t.mancha([[0, 60], [20, 30], [34, 52], [52, 20], [70, 50], [86, 32], [100, 54], [100, 100], [0, 100]], PAL.azul[3], { seed: 3, tremor: 1.2 });
      t.mancha([[42, 34], [52, 20], [62, 38], [54, 34]], PAL.branco[2], { seed: 5, tremor: 0.4 });
      t.mancha([[0, 78], [30, 66], [60, 78], [100, 68], [100, 100], [0, 100]], PAL.cinza[4], { seed: 4, tremor: 1.2 });
      return PAL.ceu[4];
    }
    case 'imperio': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.vermelho[1]], [1, PAL.vermelho[0]]]));
      for (const x of [10, 90]) t.retangulo(x - 6, 0, 12, 100, t.grad(x + 6, 0, x - 6, 0, [[0, PAL.ouro[3]], [1, PAL.ouro[1]]]));
      for (let i = 0; i < 5; i++) t.retangulo(20 + i * 14, 0, 2, 100, PAL.ouro[1], 0.5);
      t.mancha([[30, 100], [30, 56], [50, 40], [70, 56], [70, 100]], PAL.vermelho[2], { seed: 3, tremor: 0.3, alpha: 0.5 });
      t.elipse(50, 24, 12, 12, PAL.ouro[2], { alpha: 0.35, borrao: 3 });
      return PAL.ouro[4];
    }
    case 'mercado': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.ceu[3]], [1, PAL.ocre[4]]]));
      const cores = [PAL.vermelho[2], PAL.azul[2], PAL.ocre[2], PAL.panoVerde[3], PAL.roxo[2]];
      for (let i = 0; i < 5; i++) { t.mancha([[i * 22 - 4, 46], [i * 22 + 8, 30], [i * 22 + 22, 46]], cores[i % 5], { seed: i, tremor: 0.4 }); t.retangulo(i * 22, 46, 18, 3, PAL.branco[1]); t.retangulo(i * 22 + 2, 52, 3, 40, PAL.marrom[1]); t.retangulo(i * 22 + 14, 52, 3, 40, PAL.marrom[1]); }
      for (let i = 0; i < 6; i++) t.elipse(8 + i * 17, 82, 4, 3, [PAL.vermelho[3], PAL.ocre[3], PAL.jade[3]][i % 3]);
      t.retangulo(0, 88, 100, 12, PAL.marrom[2]);
      return PAL.luz[2];
    }
    case 'culto': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.roxo[0]], [0.6, PAL.vermelho[0]], [1, PAL.noite[0]]]));
      t.elipse(76, 22, 12, 12, PAL.vermelho[3], { alpha: 0.9 }); t.elipse(76, 22, 22, 22, PAL.vermelho[2], { alpha: 0.2, borrao: 4 });
      folh(0, 0, 100, 100, [PAL.vermelho[0], PAL.vermelho[1], PAL.roxo[0], PAL.roxo[1]], 0.8, 7);
      for (let i = 0; i < 10; i++) t.elipse(r.r(5, 95), r.r(50, 98), r.r(2, 6), r.r(1, 3), PAL.fogo[1], { alpha: 0.5, borrao: 1.5 });
      return PAL.vermelho[3];
    }
    case 'noite': {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 100, 100, [[0, PAL.noite[2]], [1, PAL.noite[0]]]));
      folh(0, 0, 100, 100, [PAL.noite[1], PAL.noite[2], PAL.noite[3], PAL.roxo[0]], 0.8, 7);
      for (let i = 0; i < 16; i++) t.elipse(r.r(2, 98), r.r(2, 46), 0.5, 0.5, PAL.noite[4]);
      return PAL.azul[4];
    }
    default: {
      t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.folha[3]], [1, PAL.folha[1]]]));
      if (r() < 0.6) t.mancha([[0, 0], [30, 0], [24, 8], [10, 14], [0, 16]], PAL.ceu[3], { seed: 9, tremor: 2 });
      folh(0, 0, 100, 100, [PAL.folha[0], PAL.folha[1], PAL.folha[2], PAL.folha[3], PAL.folha[4], PAL.folha[5]], 1, 6);
      folh(0, 0, 100, 100, [PAL.folha[0], PAL.folha[1], PAL.folha[2]], 0.35, 8);
      return PAL.luz[2];
    }
  }
}
