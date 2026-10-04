import { Pix, PAL, circulo, elipse, caixa, capsula, poligono, subtrai, uniao, mover } from './pix';

/** Ícones de itens em 32x32, sombreados (luz no canto superior esquerdo), com a paleta fixa do jogo. */
export const TAM_ITEM = 32;
const novo = () => new Pix(TAM_ITEM, TAM_ITEM);

/** Sombra de contato embaixo da peça (elipse pontilhada). */
function chao(p: Pix, cx: number, cy: number, rx: number) {
  for (let y = cy - 1; y <= cy + 1; y++) for (let x = cx - rx; x <= cx + rx; x++) {
    const d = Math.hypot((x - cx) / rx, (y - cy) / 1.6);
    if (d < 1 && ((x + y) & 1) === 0 && !p.get(x, y)) p.set(x, y, PAL.pedra[1]);
  }
}

export function espada(): Pix {
  const p = novo();
  chao(p, 16, 30, 9);
  // cabo e pomo
  p.forma(capsula(10, 22, 5, 27, 1.7), PAL.madeira, { volume: 1.6 });
  for (const [x, y] of [[8, 24], [7, 25], [6, 26]]) p.ponto(x, y, PAL.madeira[0]);
  p.forma(circulo(4, 28, 2.3), PAL.jade, { volume: 2.3, brilho: 1 });
  // lâmina
  p.forma(capsula(12, 20, 28, 4, 2.5, 0.7), PAL.aco, { volume: 2.4, brilho: 1 });
  // fio de sangue (sulco central) e reflexo
  p.linha(13, 19, 25, 7, PAL.aco[1]);
  p.linha(14, 17, 22, 9, PAL.aco[4]);
  p.ponto(27, 5, PAL.aco[4]);
  // guarda
  p.forma(capsula(7, 19, 13, 25, 1.5), PAL.ouro, { volume: 1.5, brilho: 1 });
  p.forma(circulo(7, 19, 1.8), PAL.ouro, { volume: 1.8 });
  p.forma(circulo(13, 25, 1.8), PAL.ouro, { volume: 1.8 });
  p.ponto(10, 21, PAL.vermelho[3]); p.ponto(10, 22, PAL.vermelho[2]);
  return p;
}

export function pilula(): Pix {
  const p = novo();
  // brasa/halo em volta, pontilhado
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
    const d = Math.hypot(x - 16, y - 14) / 13;
    if (d < 1 && d > 0.55 && ((x * 3 + y * 5) % 7 === 0)) p.set(x, y, PAL.fogo[3]);
  }
  // pires
  p.forma(elipse(16, 25, 12, 4), PAL.madeira, { volume: 3 });
  p.forma(elipse(16, 24, 9, 2.4), PAL.madeira.map((c, i) => (i < 4 ? PAL.madeira[Math.max(0, i - 1)] : c)), { volume: 2, semContorno: true });
  // sombra da pílula no pires
  p.forma(elipse(17, 25, 6, 1.6), PAL.madeira.slice(0, 3), { volume: 1, semContorno: true });
  // pílula
  p.forma(circulo(16, 15, 7.4), PAL.vermelho, { volume: 7, brilho: 1 });
  // veios dourados (espiral)
  for (let a = 0.4; a < 5.2; a += 0.12) { const r = 1.5 + a * 0.85; p.ponto(16 + Math.cos(a) * r * 0.9, 15 + Math.sin(a) * r * 0.9, PAL.ouro[a > 3 ? 2 : 3]); }
  p.ponto(12, 11, PAL.vermelho[4]); p.ponto(13, 10, PAL.vermelho[4]); p.ponto(12, 12, PAL.vermelho[3]);
  // fios de vapor
  for (let i = 0; i < 8; i++) { p.ponto(15 + Math.sin(i * 0.9) * 1.6, 7 - i * 0.8 + 0, PAL.aco[4 - (i > 5 ? 2 : i > 3 ? 1 : 0)]); }
  p.ponto(19, 4, PAL.aco[3]); p.ponto(20, 3, PAL.aco[2]);
  return p;
}

export function manual(): Pix {
  const p = novo();
  chao(p, 16, 30, 9);
  // capa
  p.forma(caixa(15, 16, 9, 12, 1), PAL.azul, { volume: 2.2, brilho: 1 });
  // lombada mais escura e costura
  p.forma(caixa(8.5, 16, 2.2, 11.5, 0.6), PAL.azul.map((c, i) => PAL.azul[Math.max(0, i - 1)]), { volume: 1.5, semContorno: true });
  for (let y = 7; y <= 25; y += 3) p.ponto(8, y, PAL.ouro[3]);
  // páginas (lado direito)
  p.forma(caixa(25.2, 17, 1.7, 10.4, 0.2), PAL.papel, { volume: 1.3 });
  for (let y = 8; y <= 26; y += 2) p.ponto(25, y, PAL.papel[1]);
  // cantoneiras de ouro
  for (const [x, y] of [[7, 5], [22, 5], [7, 27], [22, 27]]) p.forma(caixa(x, y, 1.6, 1.6, 0.4), PAL.ouro, { volume: 1.6, semContorno: true });
  // selo vermelho e glifo
  p.forma(circulo(15.5, 15, 4.4), PAL.vermelho, { volume: 3.5, brilho: 1 });
  p.linha(13, 15, 18, 15, PAL.ouro[4]); p.linha(15.5, 12, 15.5, 18, PAL.ouro[3]); p.ponto(13, 13, PAL.ouro[3]); p.ponto(18, 17, PAL.ouro[3]);
  // título na capa
  p.linha(11, 7, 20, 7, PAL.ouro[3]); p.linha(12, 9, 19, 9, PAL.ouro[2]);
  p.linha(12, 23, 19, 23, PAL.ouro[2]);
  return p;
}

export function talisma(): Pix {
  const p = novo();
  // cordão
  p.forma(capsula(16, 1, 16, 5, 1), PAL.roxo, { volume: 1, semContorno: false });
  p.forma(circulo(16, 5, 1.6), PAL.ouro, { volume: 1.6 });
  // papel de talismã, ponta rasgada
  const folha = poligono([[10, 6], [22, 6], [22, 26], [20, 28.5], [18, 26.2], [16, 28.8], [14, 26.2], [12, 28.5], [10, 26]]);
  p.forma(folha, PAL.papel, { volume: 2, textura: (x, y) => ((x * 7 + y * 13) % 5 === 0 ? 0.6 : 0) });
  // faixas vermelhas
  p.retangulo(11, 8, 10, 1, PAL.vermelho[2]); p.retangulo(11, 24, 10, 1, PAL.vermelho[2]);
  // glifo (runa de trovão)
  const g = PAL.vermelho;
  p.retangulo(13, 10, 7, 1, g[2]); p.retangulo(13, 13, 7, 1, g[2]); p.linha(13, 10, 13, 13, g[2]); p.linha(19, 10, 19, 13, g[2]);
  p.linha(16, 13, 16, 22, g[2]); p.linha(13, 17, 19, 17, g[2]); p.linha(14, 20, 18, 20, g[2]);
  p.ponto(12, 22, g[1]); p.ponto(20, 22, g[1]); p.ponto(16, 23, g[1]); p.ponto(16, 11, g[3]);
  // faíscas
  for (const [x, y] of [[8, 14], [24, 10], [24, 20], [7, 23]]) { p.ponto(x, y, PAL.ouro[3]); p.ponto(x + 1, y, PAL.ouro[4]); p.ponto(x, y + 1, PAL.ouro[2]); }
  return p;
}

export function jade(): Pix {
  const p = novo();
  // cordão com borla
  p.forma(capsula(16, 0, 16, 5, 1), PAL.vermelho, { volume: 1 });
  p.forma(circulo(16, 5.5, 1.7), PAL.ouro, { volume: 1.7, brilho: 1 });
  const anel = subtrai(circulo(16, 17, 11.5), circulo(16, 17, 4.6));
  p.forma(anel, PAL.jade, { volume: 5, brilho: 1 });
  // entalhes
  for (let a = 0; a < 6.28; a += 0.78) { const x = 16 + Math.cos(a) * 8.6, y = 17 + Math.sin(a) * 8.6; p.ponto(x, y, PAL.jade[1]); p.ponto(x + (Math.cos(a) > 0 ? -1 : 1), y, PAL.jade[3]); }
  // nuvens gravadas
  p.linha(11, 10, 14, 9, PAL.jade[4]); p.linha(12, 11, 13, 11, PAL.jade[3]);
  // reflexo
  p.linha(9, 15, 10, 12, PAL.jade[4]); p.ponto(10, 11, PAL.jade[4]);
  // borlas
  p.linha(16, 7, 16, 8, PAL.vermelho[2]);
  return p;
}

export function bolsa(): Pix {
  const p = novo();
  chao(p, 15, 30, 11);
  // moedas e pedras espalhadas
  const moeda = (x: number, y: number) => { p.forma(elipse(x, y, 2.4, 1.9), PAL.ouro, { volume: 1.6, brilho: 1 }); p.ponto(x, y - 0.4, PAL.ouro[1]); };
  moeda(24, 26); moeda(28.5, 28.5); moeda(19.5, 29);
  p.forma(elipse(5.5, 27.5, 2.4, 2), PAL.aco, { volume: 2, brilho: 1 });
  // corpo da bolsa
  const corpo = uniao(elipse(15, 20, 10, 8.5), caixa(15, 11.2, 4.4, 3.2, 1));
  p.forma(corpo, PAL.madeira, { volume: 5, textura: (x, y) => (((x + y) % 4 === 0) ? 0.5 : 0) });
  // dobras
  p.linha(11, 17, 12, 24, PAL.madeira[1]); p.linha(19, 17, 18, 25, PAL.madeira[1]);
  // laço vermelho
  p.forma(caixa(15, 13.4, 5, 1.2, 0.5), PAL.vermelho, { volume: 1.2, brilho: 1 });
  p.forma(capsula(15, 14, 11.5, 18.5, 1), PAL.vermelho, { volume: 1 });
  p.forma(capsula(15, 14, 19, 18, 1), PAL.vermelho, { volume: 1 });
  // topo aberto
  p.forma(elipse(15, 8.6, 4.4, 1.6), PAL.madeira.slice(0, 3), { volume: 1, semContorno: true });
  // emblema: losango dourado
  p.forma(poligono([[15, 18], [18, 21], [15, 24], [12, 21]]), PAL.ouro, { volume: 2, brilho: 1 });
  p.ponto(15, 21, PAL.vermelho[2]);
  return p;
}

export const ITENS_AMOSTRA: Record<string, () => Pix> = { espada, pilula, manual, talisma, jade, bolsa };
void mover;
