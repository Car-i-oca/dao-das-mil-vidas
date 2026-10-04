import { hash, prng } from '../core';
import { MOTIF } from '../scenes';
import { claro, escuro, mix } from '../cor';
import { OL, brilho, cel, estrela, linha, particulas, raios, svg, uid } from './base';

type Ceu = [string, string, string];
const CEU: Record<string, Ceu> = {
  vilarejo: ['#ff9d5c', '#ffd08a', '#fff0c8'], cidade: ['#7a5cd0', '#e8908a', '#ffd9a0'], seita: ['#3f86e0', '#a8d8f0', '#f4fbff'],
  selva: ['#157a5a', '#56c995', '#d8ffd0'], montanha: ['#4a6ad8', '#9ab8f0', '#f0f4ff'], ruinas: ['#8a5a7a', '#e0a080', '#ffe0b0'],
  deserto: ['#ff7a3a', '#ffb860', '#fff0b0'], gelo: ['#3a9ae0', '#a8e0f8', '#f0ffff'], mar: ['#2a6ad8', '#6ab8f0', '#d8f4ff'],
  reino_secreto: ['#2a1080', '#8a5ad8', '#f0b8ff'], submundo: ['#14060f', '#561a2a', '#d0482a'], ceu: ['#2a5ad8', '#8ab8ff', '#fff0c8'],
};
const NOITE: Ceu = ['#070a24', '#1c2860', '#4a5aa0'];

/** Cadeia de montanhas com perspectiva atmosférica (cada camada mais clara e azulada ao fundo). */
function serra(r: () => number, base: number, amp: number, cor: string, op: number, passo = 26): string {
  let d = `M0 120V${base}`;
  for (let x = 0; x <= 320; x += passo) d += `L${x} ${(base - r() * amp).toFixed(1)}`;
  return `<path d="${d}V120z" fill="${cor}" opacity="${op}"/>`;
}
const nuvem = (x: number, y: number, s: number, c = '#fff', o = 0.8) => `<g opacity="${o}" filter="url(#mwg2)" transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="22" ry="6" fill="${c}"/><ellipse cx="-10" cy="-4" rx="12" ry="7" fill="${c}"/><ellipse cx="9" cy="-5" rx="10" ry="6" fill="${c}"/></g>`;
const casa = (x: number, y: number, w: number, h: number, tel: string, par: string) => cel(`M${x} ${y}h${w}v${-h}H${x}z`, par, { w: 1.4, off: 1.4 }) + cel(`M${x - 3} ${y - h}l${w / 2 + 3} -${h * 0.55} ${w / 2 + 3} ${h * 0.55}z`, tel, { w: 1.4, off: 1.4 }) + `<rect x="${x + w * 0.3}" y="${y - h * 0.55}" width="${w * 0.22}" height="${h * 0.3}" fill="#ffe08a"/>`;

function elementos(k: string, r: () => number, noite: boolean): string {
  const luz = noite ? '#ffd877' : '#fff6c8';
  switch (k) {
    case 'vilarejo': {
      let o = `<path d="M0 104Q80 94 160 102T320 98V120H0z" fill="#8bb04a"/><path d="M0 110Q100 100 200 108T320 106V120H0z" fill="#6c9a3a"/>`;
      for (let i = 0; i < 4; i++) o += casa(30 + i * 68 + r() * 10, 100 - r() * 6, 36, 20, i % 2 ? '#c8402a' : '#e0583a', '#f0dcb0');
      return o + `<path d="M0 118Q120 104 200 112T320 108" stroke="#e8d098" stroke-width="5" fill="none"/>` + `<path d="M64 62q-6-10 2-16M70 60q-4-8 2-12" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".6"/>`;
    }
    case 'cidade': {
      let o = '';
      const alt = [58, 44, 66, 38, 60, 48, 70];
      for (let i = 0; i < 7; i++) { const x = 10 + i * 46; o += cel(`M${x} 108V${108 - alt[i]}h30v${alt[i]}z`, '#5a3f6a', { w: 1.4, off: 1.6 }) + `<path d="M${x - 3} ${108 - alt[i]}l18 -10 18 10z" fill="#d8423a" stroke="${OL}" stroke-width="1.4"/>`; for (let j = 0; j < 3; j++) o += `<rect x="${x + 5 + (j % 2) * 12}" y="${108 - alt[i] + 8 + j * 10}" width="5" height="6" fill="${luz}"/>`; }
      for (let i = 0; i < 9; i++) o += `<circle cx="${14 + i * 36}" cy="${104 - (i % 2) * 4}" r="3.4" fill="#ff5a3a"/><circle cx="${14 + i * 36}" cy="${104 - (i % 2) * 4}" r="8" fill="#ff7a3a" opacity=".4" filter="url(#mwg2)"/>`;
      return o + `<path d="M0 108H320V120H0z" fill="#2a1f3a"/>`;
    }
    case 'seita': {
      let o = serra(r, 90, 26, '#6f9ac0', 0.6) + `<path d="M0 100Q80 80 160 92T320 90V120H0z" fill="#7aa86a"/>`;
      o += cel('M100 98V66h120v32z', '#e8d8b8', { w: 1.6, off: 1.8 }) + cel('M88 68l72-30 72 30z', '#d8423a', { w: 1.8, off: 2 }) + cel('M112 48l48-20 48 20z', '#e8584a', { w: 1.6, off: 1.6 });
      o += `<rect x="124" y="74" width="18" height="24" fill="#4a2a2a"/><rect x="178" y="74" width="18" height="24" fill="#4a2a2a"/><rect x="150" y="76" width="20" height="22" fill="${luz}"/>`;
      o += cel('M156 28l4-14 4 14z', '#ffc83d', { w: 1.2, off: 1 }) + `<path d="M40 104l16-34 16 34zM250 104l14-28 14 28z" fill="#2f8a6a" stroke="${OL}" stroke-width="1.4"/>`;
      return o + `<path d="M70 106Q160 90 250 106" stroke="#fff" stroke-width="5" fill="none" opacity=".35" filter="url(#mwg2)"/>`;
    }
    case 'selva': {
      let o = `<path d="M0 100Q80 86 160 98T320 94V120H0z" fill="#0e5a3a"/>`;
      for (let i = 0; i < 8; i++) { const x = 8 + i * 42 + r() * 14, h = 44 + r() * 34; o += `<path d="M${x} 112V${112 - h}" stroke="#3a2a22" stroke-width="6"/>` + cel(`M${x - 24} ${112 - h + 12}a12 12 0 0 1 12-14 14 14 0 0 1 24 0 12 12 0 0 1 12 14z`, i % 2 ? '#18a86a' : '#0f8a58', { w: 1.6, off: 2 }) + `<ellipse cx="${x - 8}" cy="${112 - h + 4}" rx="9" ry="5" fill="#8affc0" opacity=".35"/>`; }
      for (let i = 0; i < 9; i++) o += `<circle cx="${r() * 320}" cy="${50 + r() * 56}" r="1.8" fill="#d8ff90"/><circle cx="${r() * 320}" cy="${50 + r() * 56}" r="5" fill="#d8ff90" opacity=".25" filter="url(#mwg2)"/>`;
      return o + `<path d="M90 0L120 120M130 0L160 120" stroke="#fff" stroke-width="10" opacity=".08"/>`;
    }
    case 'montanha': {
      let o = serra(r, 74, 22, '#8aa4e8', 0.7, 32);
      o += cel('M20 112L100 22l32 42 44-60 100 108z', '#5a6aa8', { w: 1.8, off: 3 }) + cel('M100 22L84 46l14-6 8 12 10-14z', '#fff', { w: 1.4, off: 1.4 }) + cel('M176 4L160 30l14-6 8 12 12-10z', '#fff', { w: 1.4, off: 1.4 });
      o += `<path d="M232 66q4 30 0 54" stroke="#d8f4ff" stroke-width="5" fill="none" opacity=".8"/>` + `<path d="M0 108Q80 100 160 108T320 104V120H0z" fill="#fff" opacity=".35" filter="url(#mwg2)"/>`;
      return o + `<path d="M40 112l8-24 8 24zM270 112l8-26 8 26z" fill="#1f4a5a" stroke="${OL}" stroke-width="1.2"/>`;
    }
    case 'ruinas':
      return `<path d="M0 106Q100 98 200 106T320 102V120H0z" fill="#6a5a4a"/>` + cel('M50 110V56h14v54zM96 110V44h14v66zM144 110V64h14v46z', '#c9b896', { w: 1.6, off: 2 }) + cel('M44 56h76v8H44z', '#d8c8a6', { w: 1.6, off: 1.6 })
        + cel('M206 110V74h56v36l-14-8-14 8-14-8-14 8z', '#a89a80', { w: 1.6, off: 2 }) + `<path d="M180 108q12-18 30-8M60 70q8 6 4 16M104 60q-6 8-2 20" stroke="#3ddc97" stroke-width="3.4" fill="none" stroke-linecap="round"/>` + particulas(hash('ru'), 320, 100, 14, '#ffe9b0');
    case 'deserto':
      return `<path d="M0 98Q70 70 140 96T280 86 320 94V120H0z" fill="#e8923a"/>` + `<path d="M0 98Q70 70 140 96" fill="none" stroke="#fff0b0" stroke-width="2" opacity=".6"/>` + `<path d="M0 112Q90 94 180 110T320 104V120H0z" fill="#c8702a"/>`
        + cel('M246 108V70q-1-6 4-6t4 6v38z', '#3a9a5a', { w: 1.6, off: 1.4 }) + cel('M246 88q-12 0-12-10v-4M254 82q10 0 10-8', '#3a9a5a', { w: 1.6, off: 1 }) + `<path d="M40 100q8-10 18 0M60 104q6-6 14 0" stroke="#f4ead0" stroke-width="2.6" fill="none"/>` + `<path d="M0 90h320" stroke="#fff" stroke-width="14" opacity=".08" filter="url(#mwg2)"/>`;
    case 'gelo': {
      let o = `<path d="M0 100h320v20H0z" fill="#e8f8ff"/>`;
      o += cel('M20 108l26-60 20 36 26-52 30 76z', '#bfeaff', { w: 1.6, off: 2.4 }) + cel('M190 108l22-48 18 30 22-38 26 56z', '#a8dcf8', { w: 1.6, off: 2.4 });
      o += `<path d="M0 36q80 20 160 0t160 6" stroke="#6affc0" stroke-width="10" fill="none" opacity=".35" filter="url(#mwg2)"/><path d="M0 28q80 20 160 0t160 6" stroke="#b08aff" stroke-width="6" fill="none" opacity=".35" filter="url(#mwg2)"/>`;
      return o + particulas(hash('gl'), 320, 110, 18, '#fff') + `<path d="M0 112h320" stroke="#fff" stroke-width="3" opacity=".6"/>`;
    }
    case 'mar':
      return `<path d="M0 74Q40 66 80 74t80 0 80 0 80 0V120H0z" fill="#3a8ae0"/>` + `<path d="M0 90Q40 82 80 90t80 0 80 0 80 0V120H0z" fill="#2a6ac0"/>` + `<path d="M0 104Q40 96 80 104t80 0 80 0 80 0V120H0z" fill="#1f4a9a"/>`
        + cel('M196 88h64l-8 12h-48z', '#7a4a2a', { w: 1.6, off: 1.6 }) + `<path d="M228 88V40" stroke="${OL}" stroke-width="3"/>` + cel('M230 42l26 38h-26z', '#f4ead0', { w: 1.4, off: 1.4 }) + cel('M226 48l-20 32h20z', '#ffd8a0', { w: 1.4, off: 1.4 })
        + `<path d="M20 76l12-14 12 14zM60 74l8-8 8 8z" fill="#2a5a4a" stroke="${OL}" stroke-width="1.2"/>` + `<path d="M0 88q40-6 80 0M120 98q40-6 80 0M200 108q40-6 80 0" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/>`;
    case 'reino_secreto': {
      let o = '';
      for (const [x, y, w] of [[40, 62, 50], [250, 52, 56], [150, 84, 36]] as const) o += cel(`M${x} ${y}h${w}q-${w / 2} 22-${w} 0z`, '#7a5ad8', { w: 1.6, off: 2 }) + `<path d="M${x + 6} ${y}q${w / 2 - 6} -8 ${w - 12} 0" stroke="#8affc0" stroke-width="3" fill="none"/>`;
      o += cel('M130 100V50l30-24 30 24v50z', '#ffd86a', { w: 1.8, off: 2.4 }) + `<circle cx="160" cy="62" r="14" fill="#fff" opacity=".85"/><circle cx="160" cy="62" r="28" fill="#ffd86a" opacity=".4" filter="url(#mwg)"/>`;
      return o + raios(160, 62, 30, 110, 18, '#fff', 0.2, 2) + particulas(hash('rs'), 320, 110, 22, '#f4e0ff');
    }
    case 'submundo': {
      let o = `<path d="M0 100h320v20H0z" fill="#1a0a14"/><path d="M0 108Q80 100 160 110T320 106V120H0z" fill="#ff5a2a"/><path d="M0 108Q80 100 160 110T320 106" stroke="#ffd070" stroke-width="2.4" fill="none"/>`;
      for (let i = 0; i < 6; i++) { const x = 20 + i * 54 + r() * 12, h = 26 + r() * 30; o += cel(`M${x} 104l6-${h} 6 ${h}z`, '#4a2a3a', { w: 1.4, off: 1.4 }); }
      o += `<circle cx="160" cy="62" r="9" fill="#ff7a3a"/><circle cx="160" cy="62" r="26" fill="#ff5a2a" opacity=".45" filter="url(#mwg)"/>`;
      return o + particulas(hash('sm'), 320, 110, 16, '#ffb060');
    }
    default: // ceu
      return `<path d="M0 100q40-14 80-4t80-6 80 4 80-6V120H0z" fill="#fff" opacity=".85"/><path d="M0 108q60-12 120-2t200-4V120H0z" fill="#fff"/>` + cel('M134 100V54l26-18 26 18v46z', '#ffe9a0', { w: 1.8, off: 2.4 }) + `<path d="M160 100V64" stroke="${OL}" stroke-width="2"/><circle cx="160" cy="46" r="28" fill="#fff6b0" opacity=".5" filter="url(#mwg)"/>` + raios(160, 50, 20, 130, 22, '#fff', 0.3, 2.4) + particulas(hash('cc'), 320, 110, 16, '#fff');
  }
}

export function cenario(kind: string, seed: string, noite: boolean): string {
  const k = CEU[kind] ? kind : 'vilarejo';
  const r = prng(hash(k + seed)), id = uid('s');
  const [a, b, c] = noite ? NOITE : CEU[k];
  let o = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="0.6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><rect width="320" height="120" fill="url(#${id})"/>`;
  const sx = 50 + r() * 220, sy = 22 + r() * 18;
  if (noite) {
    for (let i = 0; i < 26; i++) o += `<circle cx="${(r() * 320).toFixed(0)}" cy="${(r() * 70).toFixed(0)}" r="${(0.5 + r() * 1.1).toFixed(1)}" fill="#fff" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`;
    o += `<circle cx="${sx}" cy="${sy}" r="22" fill="#cfd8ff" opacity=".35" filter="url(#mwg)"/><circle cx="${sx}" cy="${sy}" r="10" fill="#f4f0ff"/><circle cx="${sx - 3}" cy="${sy - 2}" r="9" fill="${a}" opacity=".25"/>`;
  } else if (k === 'submundo') {
    o += `<circle cx="${sx}" cy="${sy}" r="30" fill="#ff3a2a" opacity=".35" filter="url(#mwg)"/><circle cx="${sx}" cy="${sy}" r="11" fill="#ff6a3a"/>`;
  } else {
    o += `<circle cx="${sx}" cy="${sy}" r="34" fill="#fff6c8" opacity=".5" filter="url(#mwg)"/><circle cx="${sx}" cy="${sy}" r="12" fill="#fffbe6"/>` + raios(sx, sy, 16, 30, 14, '#fff', 0.25, 1.6);
    o += nuvem(60 + r() * 60, 24 + r() * 14, 1 + r() * 0.5) + nuvem(200 + r() * 80, 18 + r() * 20, 0.8 + r() * 0.5, '#fff', 0.7);
  }
  if (k !== 'mar' && k !== 'gelo' && k !== 'montanha') o += serra(r, 80, 26, mix(b, '#4a5a9a', 0.5), 0.55) + serra(r, 94, 20, mix(b, '#2a3a6a', 0.55), 0.7);
  o += elementos(k, r, noite);
  if (noite) o += `<rect width="320" height="120" fill="#0a0a30" opacity=".28"/>`;
  o += `<defs><linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#08041a" stop-opacity=".55"/></linearGradient></defs><rect width="320" height="120" fill="url(#${id}v)"/>`;
  return svg(320, 120, o, 'art art-scene', kind);
}

/* ---------- Finais ---------- */
function motivo(m: string): string {
  const O = OL;
  switch (m) {
    case 'sol': return `<circle cx="160" cy="62" r="34" fill="#ffd86a" opacity=".5" filter="url(#mwg)"/>` + raios(160, 62, 26, 70, 20, '#fff6b0', 0.7, 2.4) + cel('M160 40a22 22 0 1 0 0.01 0z', '#ffd23a', { w: 2.4, off: 3 }) + brilho('M148 52a14 14 0 0 1 14-10 12 12 0 0 0-12 12z');
    case 'laminas': return cel('M128 98L190 26l5 5-64 72z', '#dfe8f8', { w: 2.2, off: 2 }) + cel('M192 98L130 26l-5 5 64 72z', '#c8d6ee', { w: 2.2, off: 2 }) + cel('M116 96l14-8 4 6-14 8z', '#ffc83d', { w: 1.8, off: 1.4 }) + cel('M204 96l-14-8-4 6 14 8z', '#ffc83d', { w: 1.8, off: 1.4 }) + estrela(160, 62, 9, '#fff');
    case 'raio': return `<ellipse cx="160" cy="60" rx="40" ry="36" fill="#6a8aff" opacity=".4" filter="url(#mwg)"/>` + cel('M176 14l-38 50h24l-18 50 50-62h-26z', '#ffe45a', { w: 2.4, off: 2.4 }) + linha('M120 40l-14 12M200 70l14 10M126 94l-12 10', '#8ab4ff', 2.4, 0.8);
    case 'chama': return `<ellipse cx="160" cy="78" rx="40" ry="30" fill="#ff6a2a" opacity=".5" filter="url(#mwg)"/>` + cel('M160 108C128 94 122 66 142 44c4 14 14 14 18 0 4 14 14 14 18 0 20 22 14 50-18 64z', '#ff6a2a', { w: 2.4, off: 3 }) + cel('M160 102c-12-7-14-20-4-32 3 8 8 8 10 0 10 12 6 25-6 32z', '#ffd23a', { w: 1.6, off: 2 });
    case 'fio': return `<path d="M50 94Q100 30 160 76T270 36" stroke="#ff4d5e" stroke-width="7" fill="none" opacity=".4" filter="url(#mwg2)"/><path d="M50 94Q100 30 160 76T270 36" stroke="${O}" stroke-width="5" fill="none"/><path d="M50 94Q100 30 160 76T270 36" stroke="#ff4d5e" stroke-width="2.6" fill="none"/>` + cel('M50 94m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0z', '#ff7a8a', { w: 1.8, off: 1.6 }) + cel('M270 36m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0z', '#ff7a8a', { w: 1.8, off: 1.6 }) + estrela(160, 76, 5, '#fff');
    case 'arvore': return cel('M154 108V64h12v44z', '#7a4a2a', { w: 2, off: 2 }) + cel('M160 20a34 28 0 1 0 0.01 0z', '#2fcf7a', { w: 2.2, off: 3 }) + cel('M132 52a22 18 0 1 0 0.01 0zM188 52a22 18 0 1 0 0.01 0z', '#22b86a', { w: 2, off: 2.4 }) + particulas(hash('ar'), 320, 100, 12, '#c8ffd0');
    case 'montanha': return cel('M80 108L136 36l24 30 26-42 56 84z', '#6a7ac8', { w: 2.2, off: 3.4 }) + cel('M136 36l-12 16 10-4 6 8 8-10z', '#fff', { w: 1.4, off: 1.2 }) + cel('M200 96h24v12h-24z', '#f0dcb0', { w: 1.6, off: 1.4 }) + cel('M196 96l16-12 16 12z', '#d8423a', { w: 1.6, off: 1.4 });
    case 'pagode': { let o = `<ellipse cx="160" cy="64" rx="38" ry="40" fill="#ffc83d" opacity=".25" filter="url(#mwg)"/>`; for (let k = 0; k < 4; k++) o += cel(`M${126 + k * 5} ${96 - k * 20}h${68 - k * 10}l-5-9h-${58 - k * 10}z`, '#d8423a', { w: 1.8, off: 1.6 }) + cel(`M${136 + k * 5} ${96 - k * 20}v-11h${48 - k * 10}v11z`, '#f0dcb0', { w: 1.6, off: 1.4 }); return o + cel('M158 18h4v-10h-4z', '#ffc83d', { w: 1.2, off: 1 }); }
    case 'moeda': return `<circle cx="160" cy="62" r="42" fill="#ffc83d" opacity=".4" filter="url(#mwg)"/>` + cel('M160 34a28 28 0 1 0 0.01 0zM152 54h16v16h-16z', '#ffc83d', { w: 2.4, off: 3.2 }) + brilho('M142 48a20 20 0 0 1 18-14 16 16 0 0 0-16 14z') + particulas(hash('mo'), 320, 110, 10, '#fff6b0');
    case 'roda': return `<circle cx="160" cy="62" r="40" fill="#ffc83d" opacity=".28" filter="url(#mwg)"/>` + `<circle cx="160" cy="62" r="30" fill="none" stroke="${O}" stroke-width="8"/><circle cx="160" cy="62" r="30" fill="none" stroke="#ffd23a" stroke-width="4.4"/>` + raios(160, 62, 8, 30, 8, '#ffd23a', 1, 3) + cel('M160 54a8 8 0 1 0 0.01 0z', '#ffd23a', { w: 2, off: 1.6 });
    case 'caldeirao': return `<path d="M130 52q-6-16 2-28M160 50q-6-18 4-32M190 52q-6-16 2-28" stroke="#ff9a3c" stroke-width="5" fill="none" stroke-linecap="round"/>` + cel('M116 60h88v16c0 22-20 34-44 34s-44-12-44-34z', '#3a3560', { w: 2.4, off: 3 }) + cel('M112 56h96v8h-96z', '#ffc83d', { w: 2, off: 1.6 });
    case 'garra': return ['M120 106q10-52 22-76', 'M150 106q4-54 12-78', 'M180 106q-2-52 4-76', 'M210 106q-8-46-16-64'].map((d) => `<path d="${d}" stroke="${O}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#f4ead0" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('');
    case 'vaso': return cel('M140 104V76q-12-8-12-24h64q0 16-12 24v28z', '#3ddc97', { w: 2.2, off: 2.6 }) + brilho('M138 56q4-4 10-4-6 6-6 20z', 0.7);
    case 'estrada': return `<path d="M96 112Q150 90 160 58t64-44" stroke="${O}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M96 112Q150 90 160 58t64-44" stroke="#e8d098" stroke-width="11" fill="none" stroke-linecap="round"/>` + cel('M160 40V14l20 9z', '#d8423a', { w: 1.8, off: 1.4 });
    case 'vazio': return `<circle cx="160" cy="62" r="46" fill="#a974ff" opacity=".35" filter="url(#mwg)"/><circle cx="160" cy="62" r="30" fill="#07051a" stroke="#a974ff" stroke-width="3.4"/><circle cx="160" cy="62" r="42" fill="none" stroke="#a974ff" stroke-width="1.2" opacity=".6"/>` + particulas(hash('vz'), 320, 110, 14, '#d8b8ff');
    case 'livro': return `<ellipse cx="160" cy="64" rx="60" ry="34" fill="#4aa3ff" opacity=".3" filter="url(#mwg)"/>` + cel('M110 38l50-8 50 8v58l-50-8-50 8z', '#e8d8b0', { w: 2.2, off: 3 }) + `<path d="M160 30v58" stroke="${O}" stroke-width="2.4"/>` + `<path d="M122 48h28M122 58h28M122 68h22M172 48h28M172 58h28M172 68h22" stroke="${O}" stroke-width="2" stroke-linecap="round" opacity=".6"/>` + particulas(hash('lv'), 320, 110, 12, '#ffe9a0');
    case 'sino': return `<ellipse cx="160" cy="70" rx="44" ry="40" fill="#ffc83d" opacity=".3" filter="url(#mwg)"/>` + `<path d="M160 12v14" stroke="${O}" stroke-width="3"/>` + cel('M126 92c0-30 8-58 34-58s34 28 34 58z', '#ffc83d', { w: 2.4, off: 3.4 }) + cel('M118 92h84l-4 8h-76z', '#d8a020', { w: 2, off: 1.6 }) + cel('M150 100h20a10 10 0 0 1-20 0z', '#ffc83d', { w: 1.8, off: 1.4 }) + brilho('M138 60q4-18 18-22-14 8-12 30z', 0.7);
    case 'olho': return `<ellipse cx="160" cy="62" rx="60" ry="30" fill="#a974ff" opacity=".35" filter="url(#mwg)"/>` + cel('M96 62Q160 4 224 62 160 120 96 62z', '#f4f0ff', { w: 2.4, off: 3.4 }) + `<circle cx="160" cy="62" r="22" fill="#a974ff" stroke="${O}" stroke-width="2.4"/><circle cx="160" cy="62" r="9" fill="${O}"/><circle cx="168" cy="54" r="5" fill="#fff"/>` + raios(160, 62, 26, 46, 14, '#d8b8ff', 0.7, 2);
    case 'rio': return `<path d="M20 100Q90 60 150 80t150-40" stroke="${O}" stroke-width="30" fill="none" stroke-linecap="round"/>` + `<path d="M20 100Q90 60 150 80t150-40" stroke="#4aa3ff" stroke-width="24" fill="none" stroke-linecap="round"/>` + `<path d="M30 96Q96 60 150 76t140-36M40 104Q100 72 154 88t130-34" stroke="#d8f4ff" stroke-width="2.4" fill="none" opacity=".8"/>` + particulas(hash('ri'), 320, 110, 12, '#fff');
    case 'trono': return `<ellipse cx="160" cy="64" rx="44" ry="44" fill="#a974ff" opacity=".28" filter="url(#mwg)"/>` + cel('M120 104V44l14-18v22h52V26l14 18v60z', '#7a4a8a', { w: 2.4, off: 3.2 }) + cel('M134 78h52v26h-52z', '#c8402a', { w: 2, off: 2 }) + `<path d="M134 48h52v30h-52z" fill="#2a1a3a" opacity=".6"/>` + estrela(160, 40, 6, '#ffc83d');
    case 'mao': return `<ellipse cx="160" cy="70" rx="44" ry="36" fill="#ffc83d" opacity=".3" filter="url(#mwg)"/>` + cel('M118 100l-6-34 10-4 6 18 4-34 10-2 2 32 8-30 10 2-4 32 10-20 10 6-14 44z', '#f6cfa6', { w: 2.2, off: 2.6 }) + particulas(hash('mo2'), 320, 110, 12, '#fff6b0');
    case 'coracao': return `<ellipse cx="160" cy="64" rx="48" ry="40" fill="#ff4d5e" opacity=".35" filter="url(#mwg)"/>` + cel('M160 98C112 70 112 34 138 32c12 0 20 8 22 16 2-8 10-16 22-16 26 2 26 38-22 66z', '#ff4d5e', { w: 2.4, off: 3.2 }) + brilho('M128 44q4-8 12-8-8 4-8 16z', 0.8) + particulas(hash('co'), 320, 110, 10, '#ffd0d8');
    default: return `<circle cx="160" cy="62" r="24" fill="none" stroke="#ffc83d" stroke-width="3.4"/>` + estrela(160, 62, 8, '#ffc83d');
  }
}

export function final(endingId: string, titulo: string): string {
  const m = MOTIF[endingId] ?? 'arvore', id = uid('e');
  const escura = ['chama', 'raio', 'vazio', 'laminas'].includes(m);
  const topo = m === 'sol' ? '#ff9d3a' : m === 'chama' ? '#7a1a2a' : m === 'raio' ? '#2a3a9a' : m === 'vazio' ? '#2a1070' : m === 'laminas' ? '#4a2a5a' : '#4a8ad8';
  const fim = escura ? '#080414' : mix(topo, '#fff0c8', 0.7);
  let o = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${topo}"/><stop offset="1" stop-color="${fim}"/></linearGradient><clipPath id="${id}c"><rect width="320" height="120" rx="16"/></clipPath></defs><g clip-path="url(#${id}c)"><rect width="320" height="120" fill="url(#${id})"/>`;
  o += raios(160, 62, 20, 200, 26, '#fff', 0.07, 5) + particulas(hash(endingId), 320, 120, 18, claro(topo, 0.6)) + motivo(m);
  o += `<defs><radialGradient id="${id}v" cx="0.5" cy="0.5" r="0.75"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#05030f" stop-opacity=".6"/></radialGradient></defs><rect width="320" height="120" fill="url(#${id}v)"/></g>`;
  o += `<rect x="1.8" y="1.8" width="316.4" height="116.4" rx="15" fill="none" stroke="${OL}" stroke-width="3"/><rect x="3.4" y="3.4" width="313.2" height="113.2" rx="13.6" fill="none" stroke="#ffc83d" stroke-width="1.8"/><path d="M12 24V12h12M296 12h12v12M308 96v12h-12M24 108H12V96" fill="none" stroke="#ffc83d" stroke-width="2.2" stroke-linecap="round"/>`;
  return svg(320, 120, o, 'art art-ending', titulo);
}
