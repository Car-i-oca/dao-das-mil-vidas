import { Pix, PAL, circulo, elipse, caixa, capsula, poligono, uniao, subtrai } from './pix';

/** Retratos 64x64 em pixel art: busto com rosto expressivo, idade, trilha, reino (aura), corrupção, gênero e papel. */
export const TAM_RETRATO = 64;

export interface OlharPixel {
  seed: number;
  role: 'jogador' | 'mentor' | 'rival' | 'amigo' | 'noivo' | 'discipulo' | 'inimigo';
  /** 0 criança, 1 jovem, 2 adulto, 3 maduro, 4 ancião. */
  stage: number;
  path: string;
  tier: number;
  corr: number;
  genero: 'm' | 'f';
}

const ROUPA: Record<string, { cor: keyof typeof PAL; trim: keyof typeof PAL }> = {
  sopro: { cor: 'azul', trim: 'papel' }, espada: { cor: 'aco', trim: 'azul' }, alquimia: { cor: 'fogo', trim: 'ouro' }, corpo: { cor: 'vermelho', trim: 'madeira' },
  alma: { cor: 'roxo', trim: 'papel' }, formacoes: { cor: 'jade', trim: 'ouro' }, budista: { cor: 'ouro', trim: 'vermelho' }, venenos: { cor: 'grama', trim: 'jade' },
  bestas: { cor: 'madeira', trim: 'papel' }, demoniaca: { cor: 'vermelho', trim: 'noite' }, '': { cor: 'pedra', trim: 'papel' },
};
const ROUPA_PAPEL: Record<string, { cor: keyof typeof PAL; trim: keyof typeof PAL }> = {
  mentor: { cor: 'jade', trim: 'papel' }, rival: { cor: 'vermelho', trim: 'ouro' }, amigo: { cor: 'grama', trim: 'papel' }, noivo: { cor: 'roxo', trim: 'ouro' },
  discipulo: { cor: 'azul', trim: 'papel' }, inimigo: { cor: 'noite', trim: 'vermelho' },
};
const AURA: (keyof typeof PAL)[] = ['pedra', 'aco', 'jade', 'ouro', 'azul', 'roxo', 'vermelho', 'fogo', 'papel'];
const OLHOS = ['#3a64c0', '#7048b8', '#2e9468', '#8e5a28'];

function h32(n: number) { n = Math.imul(n ^ (n >>> 15), 0x2c1b3c6d); n = Math.imul(n ^ (n >>> 12), 0x297a2d39); return (n ^ (n >>> 15)) >>> 0; }

export function retrato(o: OlharPixel): Pix {
  const h = h32(o.seed);
  const p = new Pix(64, 64);
  const tez = [PAL.pele, PAL.pele, PAL.peleEscura][h % 3];
  const crianca = o.stage === 0, velho = o.stage >= 4, maduro = o.stage >= 3;
  const f = o.genero === 'f';
  const rp = o.role === 'jogador' ? (ROUPA[o.path] ?? ROUPA['']) : ROUPA_PAPEL[o.role];
  const robe = PAL[rp.cor], trim = PAL[rp.trim];
  const cabelo = velho ? PAL.cabeloBranco : maduro ? [PAL.cabelo[0], PAL.cabelo[1], PAL.cabeloBranco[1], PAL.cabeloBranco[2], PAL.cabeloBranco[3]] : PAL.cabelo;
  const aura = PAL[AURA[Math.min(8, o.tier)]];
  const olho = o.corr >= 40 ? PAL.vermelho[3] : o.tier >= 5 ? PAL.ouro[3] : OLHOS[(h >>> 5) % OLHOS.length];
  const careca = o.path === 'budista' && o.role === 'jogador';
  const sombrio = o.role === 'inimigo' || o.role === 'rival' || o.corr >= 30;
  const cy = crianca ? 31 : 27, rx = crianca ? 11 : f ? 9.6 : 10.4, ry = crianca ? 11 : 12;

  // fundo: gradiente noturno, halo da aura, anéis por reino
  p.gradiente(0, 0, 64, 64, [aura[1], PAL.noite[1], PAL.noite[0]]);
  for (let y = 0; y < 64; y++) for (let x = 0; x < 64; x++) {
    const d = Math.hypot(x - 32, y - 28) / 30;
    if (d < 1 && ((x * 5 + y * 3) % 11 === 0 || (d < 0.7 && (x + y) % 9 === 0))) p.set(x, y, aura[3]);
  }
  const aneis = Math.min(4, 1 + Math.floor(o.tier / 2));
  for (let i = 0; i < aneis; i++) for (let a = 0; a < 6.28; a += 0.035) p.ponto(32 + Math.cos(a) * (24 + i * 3), 29 + Math.sin(a) * (24 + i * 3), i % 2 ? aura[2] : aura[3]);

  // cabelo de trás (longo)
  const longo = f || o.role === 'noivo' || (h >>> 3) % 3 === 0;
  if (!careca && (longo || velho)) {
    p.forma(poligono([[19, 22], [21, 12], [32, 8], [43, 12], [45, 22], [48, 44], [41, 49], [23, 49], [16, 44]]), cabelo, { volume: 5 });
  }
  // ombros e roupa
  p.forma(poligono([[6, 64], [10, 52], [22, 44], [42, 44], [54, 52], [58, 64]]), robe, { volume: 7, pontilhado: 0.6 });
  // dobras
  p.linha(14, 58, 20, 49, robe[1]); p.linha(50, 58, 44, 49, robe[1]); p.linha(28, 64, 27, 56, robe[1]); p.linha(36, 64, 37, 56, robe[1]);
  // pescoço e decote
  p.forma(caixa(32, 40, 4.6, 6, 1.5), tez, { volume: 3 });
  p.forma(poligono([[26, 44], [38, 44], [32, 54]]), tez, { volume: 3, semContorno: true });
  p.forma(poligono([[23, 44], [27, 44], [33, 56], [31, 57]]), trim, { volume: 1.2, semContorno: true });
  p.forma(poligono([[41, 44], [37, 44], [31, 56], [33, 57]]), trim, { volume: 1.2, semContorno: true });
  if (o.path === 'espada' && o.role === 'jogador') p.forma(capsula(48, 42, 55, 30, 1.6), PAL.madeira, { volume: 1.6 }); // cabo da espada às costas
  if (o.path === 'budista') for (let i = 0; i < 9; i++) { const a = 0.25 + i * 0.3; p.forma(circulo(32 + Math.cos(a + 1.9) * 9, 49 + Math.sin(a + 1.9) * 5, 1.5), PAL.madeira, { volume: 1.5, semContorno: true }); }

  // cabeça
  const cabeca = uniao(elipse(32, cy - 1, rx, ry), elipse(32, cy + 6, rx - 1.8, ry - 3.4));
  p.forma(cabeca, tez, { volume: 9 });
  // orelhas
  p.forma(elipse(32 - rx - 0.4, cy + 1, 1.8, 2.8), tez, { volume: 2 });
  p.forma(elipse(32 + rx + 0.4, cy + 1, 1.8, 2.8), tez, { volume: 2 });
  // bochechas
  if (!velho) { for (const x of [25, 39]) for (const [dx, dy] of [[0, 0], [1, 0], [0, 1]]) if ((x + dx + dy) % 2 === 0) p.ponto(x + dx, cy + 7 + dy, f || crianca ? PAL.vermelho[3] : tez[1]); }

  // cabelo da frente
  if (!careca) {
    const franja = f || (h >>> 8) % 2 === 0
      ? poligono([[20, cy - 1], [20, cy - 9], [25, cy - 14], [32, cy - 16], [39, cy - 14], [44, cy - 9], [44, cy - 1], [41, cy - 8], [36, cy - 10], [32, cy - 6], [28, cy - 10], [23, cy - 8]])
      : poligono([[20, cy - 1], [21, cy - 10], [27, cy - 15], [36, cy - 15], [43, cy - 10], [44, cy - 1], [41, cy - 8], [35, cy - 11], [26, cy - 9], [23, cy - 6]]);
    p.forma(franja, cabelo, { volume: 3.4 });
    if (!longo && !velho && !f) { // coque no alto, com grampo
      p.forma(circulo(32, cy - 17, 4), cabelo, { volume: 4 });
      p.forma(capsula(28, cy - 17, 36, cy - 17, 0.7), PAL.ouro, { volume: 0.8, brilho: 1 });
    }
  }
  // testa: marca do terceiro olho, faixa, cicatriz
  if (o.tier >= 5) p.forma(poligono([[32, cy - 9], [33.4, cy - 7], [32, cy - 5], [30.6, cy - 7]]), PAL.ouro, { volume: 1.2, brilho: 1 });
  if (o.path === 'formacoes' && o.role === 'jogador') p.forma(caixa(32, cy - 8.5, 11, 1.4), PAL.jade, { volume: 1.4 });
  if (o.path === 'corpo' && o.role === 'jogador') p.linha(37, cy - 4, 41, cy + 4, tez[0]);
  if (o.path === 'demoniaca') { p.forma(poligono([[22, cy - 10], [20, cy - 18], [26, cy - 12]]), PAL.vermelho, { volume: 2 }); p.forma(poligono([[42, cy - 10], [44, cy - 18], [38, cy - 12]]), PAL.vermelho, { volume: 2 }); }

  // sobrancelhas
  const bro = PAL.cabelo[0];
  const afiado = sombrio || o.path === 'espada';
  const by = cy - 4 + (crianca ? 1 : 0);
  if (afiado) { p.linha(23, by - 1, 29, by + 1, bro); p.linha(41, by - 1, 35, by + 1, bro); p.linha(23, by - 2, 28, by, bro); p.linha(41, by - 2, 36, by, bro); }
  else if (o.role === 'amigo' || o.role === 'noivo' || crianca) { p.linha(24, by, 29, by - 1, velho ? cabelo[2] : bro); p.linha(40, by, 35, by - 1, velho ? cabelo[2] : bro); }
  else { p.linha(24, by, 29, by, velho ? cabelo[2] : bro); p.linha(40, by, 35, by, velho ? cabelo[2] : bro); if (!f) { p.linha(24, by - 1, 29, by - 1, velho ? cabelo[2] : bro); p.linha(40, by - 1, 35, by - 1, velho ? cabelo[2] : bro); } }

  // olhos: pálpebra, íris, brilho
  const oy = cy;
  const olhoDesenho = (x: number) => {
    p.retangulo(x - 1, oy - 1, 6, 1, PAL.cabelo[0]); // pálpebra
    p.retangulo(x - 1, oy, 6, 2, PAL.papel[4]);
    p.retangulo(x + 1, oy, 2, 2, olho);
    p.ponto(x + 1, oy, PAL.papel[4]); // brilho na íris
    p.ponto(x + 2, oy + 1, PAL.cabelo[0]);
    p.linha(x - 1, oy + 2, x + 4, oy + 2, tez[1]); // bolsa
    if (f) { p.ponto(x - 2, oy - 1, PAL.cabelo[0]); p.ponto(x + 5, oy - 1, PAL.cabelo[0]); }
  };
  olhoDesenho(24); olhoDesenho(35);
  if (o.corr >= 30) { p.ponto(24, oy, PAL.vermelho[4]); p.ponto(37, oy, PAL.vermelho[4]); for (let i = 0; i < 4; i++) p.ponto(26 - i, oy + 5 + i, PAL.vermelho[1]); }
  // nariz
  p.linha(32, oy + 2, 32, oy + 5, tez[1]); p.ponto(31, oy + 6, tez[1]); p.ponto(33, oy + 6, tez[0]); p.ponto(32, oy + 2, tez[3]);
  // boca por expressão
  const my = cy + 9;
  const labio = f ? PAL.vermelho[2] : tez[0];
  if (o.role === 'amigo' || o.role === 'noivo' || crianca) { p.linha(28, my - 1, 29, my, labio); p.linha(29, my, 35, my, labio); p.linha(35, my, 36, my - 1, labio); p.linha(30, my + 1, 34, my + 1, PAL.papel[4]); }
  else if (o.role === 'rival') { p.linha(28, my, 33, my, labio); p.linha(33, my, 36, my - 2, labio); p.ponto(36, my - 3, tez[1]); }
  else if (o.role === 'inimigo' || o.corr >= 30) { p.linha(28, my + 1, 31, my, labio); p.linha(31, my, 34, my, labio); p.linha(34, my, 37, my + 1, labio); p.ponto(30, my + 2, PAL.papel[3]); p.ponto(35, my + 2, PAL.papel[3]); }
  else { p.linha(29, my, 35, my, labio); p.ponto(29, my - 1, tez[1]); if (f) p.linha(30, my + 1, 34, my + 1, PAL.vermelho[1]); }
  // rugas e barba
  if (maduro) { p.linha(24, oy + 5, 26, oy + 8, tez[1]); p.linha(40, oy + 5, 38, oy + 8, tez[1]); p.linha(27, by - 3, 30, by - 3, tez[1]); p.linha(34, by - 3, 37, by - 3, tez[1]); }
  if (velho && !f) {
    p.forma(poligono([[24, my - 1], [28, my - 2], [32, my + 1], [36, my - 2], [40, my - 1], [38, my + 8], [32, my + 17], [26, my + 8]]), PAL.cabeloBranco, { volume: 4 });
    p.linha(29, my, 35, my, PAL.cabeloBranco[1]);
  } else if (!f && !crianca && o.role === 'mentor') { p.forma(poligono([[28, my + 2], [36, my + 2], [34, my + 7], [32, my + 9], [30, my + 7]]), cabelo, { volume: 2.5 }); }
  return p;
}

export const RETRATOS_AMOSTRA: Record<string, OlharPixel> = {
  jogadora: { seed: 11, role: 'jogador', stage: 1, path: 'espada', tier: 3, corr: 0, genero: 'f' },
  mestre: { seed: 5, role: 'mentor', stage: 4, path: 'alquimia', tier: 6, corr: 0, genero: 'm' },
  rival: { seed: 29, role: 'rival', stage: 2, path: 'corpo', tier: 3, corr: 0, genero: 'm' },
  inimigo: { seed: 3, role: 'inimigo', stage: 3, path: 'demoniaca', tier: 4, corr: 55, genero: 'f' },
};
void subtrai;
