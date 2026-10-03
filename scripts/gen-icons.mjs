// Gera ícones PNG (taiji estilizado em tinta e vermelhão) sem dependências externas.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';

const crcTable = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
  return Buffer.concat([len, td, c]);
};

function png(size, maskable) {
  const BG = [20, 17, 15], PAPER = [232, 222, 200], RED = [196, 81, 61], GOLD = [210, 169, 92];
  const raw = Buffer.alloc((size * 4 + 1) * size);
  const cx = size / 2, cy = size / 2;
  const R = size * (maskable ? 0.3 : 0.38);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy;
      const d = Math.hypot(dx, dy);
      let col = BG;
      if (d <= R + size * 0.025 && d > R) col = GOLD;
      if (d <= R) {
        // metade vermelha / metade papel, com as curvas do taiji
        const d1 = Math.hypot(dx, dy - R / 2), d2 = Math.hypot(dx, dy + R / 2);
        let right = dx > 0;
        if (d1 <= R / 2) right = false;
        else if (d2 <= R / 2) right = true;
        col = right ? RED : PAPER;
        if (d1 <= R / 7) col = RED;
        if (d2 <= R / 7) col = PAPER;
        if (d1 <= R / 2 && d1 > R / 7 && !right) col = PAPER;
      }
      const i = y * (size * 4 + 1) + 1 + x * 4;
      raw[i] = col[0]; raw[i + 1] = col[1]; raw[i + 2] = col[2]; raw[i + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

mkdirSync('public/icons', { recursive: true });
writeFileSync('public/icons/icon-192.png', png(192, false));
writeFileSync('public/icons/icon-512.png', png(512, false));
writeFileSync('public/icons/icon-maskable-512.png', png(512, true));
writeFileSync('public/icons/icon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#14110f"/><text x="50" y="72" font-size="64" text-anchor="middle" fill="#c4513d" font-family="serif" font-weight="700">道</text></svg>`);
console.log('Ícones gerados em public/icons');
