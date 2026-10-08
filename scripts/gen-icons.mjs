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

const BG = [10, 10, 10], PAPER = [232, 222, 200], RED = [196, 81, 61], GOLD = [210, 169, 92];
const segmentDistance = (x, y, ax, ay, bx, by) => {
  const dx = bx - ax, dy = by - ay;
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - ax - t * dx, y - ay - t * dy);
};

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
        const unitX = x / size, unitY = y / size;
        const edge = size * 0.025 * (rf / 0.38);
        if (d <= R) { col = BG; alpha = 255; }
        if (d <= R + edge && d > R - edge) { col = GOLD; alpha = 255; }
        const bladeWidth = Math.max(0.004, rf * 0.045);
        const swordA = segmentDistance(unitX, unitY, 0.29, 0.71, 0.71, 0.29);
        const swordB = segmentDistance(unitX, unitY, 0.29, 0.29, 0.71, 0.71);
        if (d < R - edge && (swordA < bladeWidth || swordB < bladeWidth)) { col = swordA < swordB ? PAPER : RED; alpha = 255; }
        const guardWidth = bladeWidth * 0.8;
        if (d < R - edge && (
          segmentDistance(unitX, unitY, 0.20, 0.66, 0.37, 0.83) < guardWidth
          || segmentDistance(unitX, unitY, 0.20, 0.34, 0.37, 0.17) < guardWidth
          || segmentDistance(unitX, unitY, 0.63, 0.83, 0.80, 0.66) < guardWidth
          || segmentDistance(unitX, unitY, 0.63, 0.17, 0.80, 0.34) < guardWidth
        )) { col = GOLD; alpha = 255; }
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
writeFileSync('public/icons/icon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#0a0a0a"/><circle cx="50" cy="50" r="35" fill="#0a0a0a" stroke="#d2a95c" stroke-width="2"/><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M32 68 68 32M32 32l36 36" stroke="#e8dec8" stroke-width="5"/><path d="m27 73 8-8m-8-30 8 8m38 22 8 8m-8-46 8-8" stroke="#c4513d" stroke-width="4"/><path d="m24 76 7-7m38-38 7-7m-45 8 7 7m38 38 7 7" stroke="#d2a95c" stroke-width="3"/></g></svg>`);

// Fontes para o Android (@capacitor/assets): ícone completo, ícone adaptativo (frente/fundo) e abertura.
writeFileSync('assets/icon-only.png', png(1024, 0.38));
writeFileSync('assets/icon-foreground.png', png(1024, 0.22, 'transparent'));
writeFileSync('assets/icon-background.png', png(1024, 0, 'only-bg'));
writeFileSync('assets/splash.png', png(2732, 0.08));
writeFileSync('assets/splash-dark.png', png(2732, 0.08));
console.log('Ícones gerados em public/icons e assets/');
