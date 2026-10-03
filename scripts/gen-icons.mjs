// Gera ícones PNG (taiji estilizado em tinta e vermelhão) sem dependências externas.
// Saídas: public/icons (PWA) e assets/ (fonte para @capacitor/assets, usado no build do APK).
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

const BG = [20, 17, 15], PAPER = [232, 222, 200], RED = [196, 81, 61], GOLD = [210, 169, 92];

/**
 * @param size lado em pixels
 * @param rf raio do taiji como fração do lado
 * @param bg 'solid' (fundo tinta), 'transparent' (só o taiji) ou 'only-bg' (só o fundo)
 */
function png(size, rf, bg = 'solid') {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  const cx = size / 2, cy = size / 2;
  const R = size * rf;
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const dx = x - cx, dy = y - cy;
      const d = Math.hypot(dx, dy);
      let col = BG, alpha = bg === 'transparent' ? 0 : 255;
      if (bg !== 'only-bg') {
        if (d <= R + size * 0.025 * (rf / 0.38) && d > R) { col = GOLD; alpha = 255; }
        if (d <= R) {
          const d1 = Math.hypot(dx, dy - R / 2), d2 = Math.hypot(dx, dy + R / 2);
          let right = dx > 0;
          if (d1 <= R / 2) right = false;
          else if (d2 <= R / 2) right = true;
          col = right ? RED : PAPER;
          if (d1 <= R / 7) col = RED;
          if (d2 <= R / 7) col = PAPER;
          if (d1 <= R / 2 && d1 > R / 7 && !right) col = PAPER;
          alpha = 255;
        }
      }
      const i = y * (size * 4 + 1) + 1 + x * 4;
      raw[i] = col[0]; raw[i + 1] = col[1]; raw[i + 2] = col[2]; raw[i + 3] = alpha;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

mkdirSync('public/icons', { recursive: true });
mkdirSync('assets', { recursive: true });
writeFileSync('public/icons/icon-192.png', png(192, 0.38));
writeFileSync('public/icons/icon-512.png', png(512, 0.38));
writeFileSync('public/icons/icon-maskable-512.png', png(512, 0.3));
writeFileSync('public/icons/icon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#14110f"/><text x="50" y="72" font-size="64" text-anchor="middle" fill="#c4513d" font-family="serif" font-weight="700">道</text></svg>`);

// Fontes para o Android (@capacitor/assets): ícone completo, ícone adaptativo (frente/fundo) e abertura.
writeFileSync('assets/icon-only.png', png(1024, 0.38));
writeFileSync('assets/icon-foreground.png', png(1024, 0.22, 'transparent'));
writeFileSync('assets/icon-background.png', png(1024, 0, 'only-bg'));
writeFileSync('assets/splash.png', png(2732, 0.08));
writeFileSync('assets/splash-dark.png', png(2732, 0.08));
console.log('Ícones gerados em public/icons e assets/');
