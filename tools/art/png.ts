// Escritor de PNG (Node) para revisar a arte pixel: salva em tamanho real e ampliado, e monta folhas de contato.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import type { Pix } from '../../src/ui/art/pixel2/pix';

const crcT = (() => { const t: number[] = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc = (b: Buffer) => { let c = 0xffffffff; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(tipo: string, dados: Buffer) {
  const len = Buffer.alloc(4); len.writeUInt32BE(dados.length);
  const td = Buffer.concat([Buffer.from(tipo), dados]);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
  return Buffer.concat([len, td, c]);
}
const hex = (s: string): [number, number, number] => { const n = parseInt(s.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };

export function pngDe(w: number, h: number, px: (string | null)[], escala = 1, fundo = '#2a2438'): Buffer {
  const W = w * escala, H = h * escala;
  const raw = Buffer.alloc((W * 4 + 1) * H);
  const bg = hex(fundo);
  for (let y = 0; y < H; y++) {
    raw[y * (W * 4 + 1)] = 0;
    for (let x = 0; x < W; x++) {
      const c = px[Math.floor(y / escala) * w + Math.floor(x / escala)];
      const o = y * (W * 4 + 1) + 1 + x * 4;
      const xadrez = ((Math.floor(x / escala) + Math.floor(y / escala)) & 1) ? 0 : 6;
      const [r, g, b] = c ? hex(c) : [bg[0] + xadrez, bg[1] + xadrez, bg[2] + xadrez];
      raw[o] = r; raw[o + 1] = g; raw[o + 2] = b; raw[o + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}
export function salvar(p: Pix, caminho: string, escala = 1) { mkdirSync(dirname(caminho), { recursive: true }); writeFileSync(caminho, pngDe(p.w, p.h, p.px, escala)); }

/** Folha de contato: várias peças lado a lado, ampliadas. */
export function folha(pecas: Pix[], caminho: string, escala = 4, colunas = 6, gap = 2) {
  const cw = Math.max(...pecas.map((p) => p.w)) + gap, ch = Math.max(...pecas.map((p) => p.h)) + gap;
  const linhas = Math.ceil(pecas.length / colunas);
  const W = cw * Math.min(colunas, pecas.length), H = ch * linhas;
  const px: (string | null)[] = new Array(W * H).fill(null);
  pecas.forEach((p, i) => {
    const ox = (i % colunas) * cw, oy = Math.floor(i / colunas) * ch;
    for (let y = 0; y < p.h; y++) for (let x = 0; x < p.w; x++) px[(oy + y) * W + ox + x] = p.px[y * p.w + x];
  });
  mkdirSync(dirname(caminho), { recursive: true });
  writeFileSync(caminho, pngDe(W, H, px, escala));
}
