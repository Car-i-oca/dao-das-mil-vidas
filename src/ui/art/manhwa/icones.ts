import type { Item, Technique } from '../../../types';
import { hash } from '../core';
import { itemMotif, type Motif } from '../icons';
import { claro, escuro, mix } from '../cor';
import { GRAU, OL, PAL, brilho, cel, estrela, fundo, linha, particulas, raios, svg, uid } from './base';

type Glifo = (c: string, g: number) => string;
const OURO = '#ffc83d', ACO = '#c9d6ea', SANGUE = '#ff4d5e', VERDE = '#3ddc97', AZUL = '#4aa3ff', ROXO = '#a974ff';

/* ---------- Itens (64x64) ---------- */
const GLIFOS: Record<Motif, Glifo> = {
  pill: (c, g) => {
    let o = '';
    for (let i = 0; i < Math.max(0, g - 1); i++) o += `<circle cx="32" cy="34" r="${17 + i * 3.4}" fill="none" stroke="${c}" stroke-width="1" opacity="${0.6 - i * 0.12}"/>`;
    return `${o}<path d="M26 18q-4-7 2-11M33 17q-3-8 3-12M40 19q-2-6 3-9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>`
      + cel('M32 20a14 14 0 1 0 0.01 0z', c) + `<path d="M22 36a11 11 0 0 0 20 4 13 13 0 0 1-20-4z" fill="${escuro(c, 0.5)}" opacity=".6"/>`
      + brilho('M23 28a10 10 0 0 1 11-9 8 8 0 0 0-9 8z', 0.75) + `<ellipse cx="25.5" cy="26" rx="3.2" ry="1.8" fill="#fff" transform="rotate(-38 25.5 26)"/>`;
  },
  herb: (c, g) => {
    let o = linha('M32 56C31 46 33 36 32 24', '#1c6b45', 5) + linha('M32 56C31 46 33 36 32 24', '#4fe39a', 2.4);
    const folhas = 2 + Math.min(3, g);
    for (let i = 0; i < folhas; i++) {
      const y = 50 - i * (24 / folhas), lado = i % 2 ? 1 : -1, l = 15 + (i % 3) * 2;
      o += cel(`M32 ${y}q${lado * l} ${-3} ${lado * (l + 4)} ${-12}q${-lado * (l - 2)} ${-1} ${-lado * (l + 4)} ${12}z`, i % 2 ? '#38d07f' : '#27b56b', { w: 1.8, off: 2 });
    }
    return o + `<circle cx="32" cy="20" r="${g >= 3 ? 12 : 9}" fill="${c}" opacity=".5" filter="url(#mwg2)"/>` + cel('M32 12q8 4 6 11-6 5-12 0-2-7 6-11z', c, { w: 1.8, off: 2 }) + brilho('M28 17q3-3 5-2-3 1-5 4z') + estrela(46, 14, 3.4, '#fff', 0.9);
  },
  fruit: (c) => linha('M32 20q0-8 6-10', '#1c6b45', 3) + cel('M38 11q8-1 11 5-8 3-11-5z', '#38d07f', { w: 1.6, off: 1.5 })
    + cel('M32 20c-14-4-22 8-19 21 2 10 10 17 19 17s17-7 19-17c3-13-5-25-19-21z', c) + brilho('M20 32q0-8 7-10-6 4-5 12z', 0.7) + `<ellipse cx="22" cy="36" rx="2.4" ry="5" fill="#fff" opacity=".45"/>` + estrela(48, 40, 3, '#fff', 0.8),
  seed: (c) => linha('M32 54V34', '#1c6b45', 4) + cel('M32 38q-18-2-20-18 16-2 20 18z', '#38d07f', { w: 1.8, off: 2 }) + cel('M32 34q15-5 18-22-15 0-18 22z', '#4fe39a', { w: 1.8, off: 2 })
    + `<ellipse cx="32" cy="55" rx="14" ry="4" fill="${c}" opacity=".55"/>` + cel('M26 52a6 5 0 1 0 12 0 6 5 0 0 0-12 0z', '#b07a3a', { w: 1.6, off: 1.5 }) + estrela(50, 22, 3, '#c8ffd0'),
  blade: (c, g) => `<g transform="rotate(40 32 32)">${g >= 3 ? `<rect x="26" y="2" width="12" height="46" rx="6" fill="${c}" opacity=".35" filter="url(#mwg2)"/>` : ''}`
    + cel('M32 3l6 9v35H26V12z', ACO) + `<path d="M32 3l6 9v35h-6z" fill="${escuro(ACO, 0.22)}"/><path d="M32 8v38" stroke="#fff" stroke-width="2" opacity=".85"/>`
    + `<path d="M32 3l6 9v35H26V12z" fill="none" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/>`
    + cel('M20 47h24l-3 5H23z', OURO, { w: 1.8, off: 1.5 }) + cel('M29 52h6v9h-6z', '#8a2f4a', { w: 1.8, off: 1.5 }) + `<path d="M29 55h6M29 58h6" stroke="${OL}" stroke-width="1" opacity=".6"/>` + cel('M32 61a3.4 3.4 0 1 0 0.01 0z', c, { w: 1.6, off: 1 }) + `</g>`
    + linha('M10 24q10-2 18 6M6 40q14-6 24 4', claro(c, 0.5), 2.2, 0.7),
  armor: (c) => cel('M32 6l20 7v16c0 15-8 25-20 30C20 54 12 44 12 29V13z', c) + `<path d="M32 6v53" stroke="${OL}" stroke-width="2" opacity=".5"/><path d="M32 6l20 7v16c0 15-8 25-20 30z" fill="${escuro(c, 0.28)}" opacity=".55"/>`
    + cel('M32 20l8 6-3 10H27l-3-10z', OURO, { w: 1.6, off: 1.4 }) + brilho('M17 15l12-5-10 9z', 0.7) + estrela(46, 46, 3, '#fff', 0.8),
  bell: (c) => linha('M32 4v8', OL, 3) + cel('M31 4h2v8h-2z', OURO, { w: 1.2, off: 1 }) + cel('M18 46c0-16 4-30 14-30s14 14 14 30z', c) + cel('M14 46h36l-2 5H16z', OURO, { w: 1.8, off: 1.5 })
    + `<path d="M24 28q8-3 16 0M23 36q9-3 18 0" stroke="${escuro(c, 0.5)}" stroke-width="1.4" fill="none" opacity=".7"/>` + cel('M28 51h8a4 4 0 0 1-8 0z', OURO, { w: 1.4, off: 1 }) + brilho('M23 30q2-9 8-11-6 4-6 14z', 0.7) + linha('M46 22q5 2 5 7M18 20q-5 2-5 7', claro(c, 0.5), 1.6, 0.7),
  mirror: (c) => `<circle cx="32" cy="28" r="22" fill="${c}" opacity=".5" filter="url(#mwg2)"/>` + cel('M29 46h6v14h-6z', OURO, { w: 1.6, off: 1.5 }) + cel('M24 58h16l-2 4H26z', escuro(OURO, 0.2), { w: 1.4, off: 1 })
    + cel('M32 8a20 20 0 1 0 0.01 0z', OURO) + `<circle cx="32" cy="28" r="15" fill="#0d1b3d" stroke="${OL}" stroke-width="1.6"/><circle cx="32" cy="28" r="15" fill="${mix(c, '#fff', 0.2)}" opacity=".5"/>`
    + `<path d="M22 22q4-8 14-8-6 3-9 10z" fill="#fff" opacity=".85"/><path d="M26 38q8 3 14-4" stroke="#fff" stroke-width="1.4" fill="none" opacity=".6"/>` + estrela(41, 24, 3.2, '#fff'),
  cauldron: (c) => `<path d="M22 16q-5-7 1-12M32 14q-5-8 1-14M42 16q-5-7 1-12" stroke="#ff9a3c" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/><path d="M22 14q-3-5 0-9M32 12q-3-6 0-10" stroke="#ffe07a" stroke-width="1.5" fill="none" stroke-linecap="round"/>`
    + cel('M14 32l-4 4h4zM50 32l4 4h-4z', OURO, { w: 1.4, off: 1 }) + cel('M16 54l-3 8h6l3-8zM48 54l3 8h-6l-3-8z', escuro(c, 0.2), { w: 1.6, off: 1.2 })
    + cel('M12 26h40v10c0 12-9 20-20 20S12 48 12 36z', escuro(c, 0.35)) + cel('M10 24h44v5H10z', OURO, { w: 1.8, off: 1.4 }) + `<path d="M22 36l4 4-4 4M32 34v12M42 36l-4 4 4 4" stroke="${OURO}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".85"/>` + brilho('M17 34q0-5 4-6-3 4-2 11z', 0.6),
  banner: (c) => cel('M17 6h4v54h-4z', '#caa86a', { w: 1.6, off: 1.2 }) + cel('M14 3a5 5 0 1 0 10 0 5 5 0 0 0-10 0z', OURO, { w: 1.4, off: 1 })
    + cel('M21 8h31l-8 11 8 11H21z', c) + `<path d="M28 15h18M28 24h12" stroke="${claro(c, 0.65)}" stroke-width="2.2" stroke-linecap="round"/>` + brilho('M23 10h22l-18 4z', 0.55) + linha('M14 62h14', OL, 2.4) + estrela(48, 44, 3, '#fff', 0.7),
  lantern: (c) => `<ellipse cx="32" cy="34" rx="22" ry="22" fill="${c}" opacity=".5" filter="url(#mwg2)"/>` + linha('M32 4v8', OL, 2.6) + cel('M24 10h16l2 5H22z', '#6b2a3a', { w: 1.6, off: 1.2 })
    + cel('M32 15c13 0 18 9 18 19s-5 19-18 19-18-9-18-19 5-19 18-19z', c) + `<path d="M20 22q12 6 24 0M16 34h32M20 46q12-6 24 0" stroke="${escuro(c, 0.55)}" stroke-width="1.6" fill="none" opacity=".75"/><ellipse cx="32" cy="34" rx="7" ry="10" fill="#fff6c8" opacity=".85"/>`
    + cel('M24 53h16l-2 4H26z', '#6b2a3a', { w: 1.5, off: 1 }) + linha('M28 57v6M36 57v6M32 57v7', OURO, 2.2),
  talisman: (c) => `<rect x="18" y="4" width="28" height="56" rx="3" fill="${c}" opacity=".35" filter="url(#mwg2)"/>` + cel('M20 4h24v54H20z', '#ffd75e', { w: 2, off: 2.2 })
    + `<path d="M24 10h16M24 15h16" stroke="${SANGUE}" stroke-width="2" stroke-linecap="round"/><path d="M26 25h12M32 25v16M25 33q7 5 14 0M27 47q5-5 10 0M32 41v12" stroke="${SANGUE}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="32" cy="55" r="2.2" fill="${SANGUE}"/>`
    + brilho('M22 6h6l-6 8z', 0.7) + linha('M12 20q-5 12 0 24M52 20q5 12 0 24', claro(c, 0.55), 1.8, 0.7),
  manual: (c) => `<ellipse cx="32" cy="34" rx="24" ry="24" fill="${c}" opacity=".35" filter="url(#mwg2)"/>` + cel('M12 10l20-3 20 3v44l-20 3-20-3z', c) + `<path d="M32 7v50" stroke="${OL}" stroke-width="2"/><path d="M32 7l20 3v44l-20 3z" fill="${escuro(c, 0.32)}" opacity=".6"/>`
    + `<circle cx="22" cy="30" r="7.5" fill="${OURO}" stroke="${OL}" stroke-width="1.8"/><path d="M17 30h10M22 25v10M18.5 26.5l7 7M25.5 26.5l-7 7" stroke="${OL}" stroke-width="1.4" stroke-linecap="round"/>`
    + `<path d="M38 20h9M38 27h9M38 34h7M38 41h9" stroke="${claro(c, 0.7)}" stroke-width="2" stroke-linecap="round"/>` + cel('M12 52l20 3 20-3v3l-20 3-20-3z', '#f3e3b4', { w: 1.4, off: 1 }) + estrela(48, 14, 4, '#fff6b0'),
  core: (c, g) => {
    let o = `<circle cx="32" cy="32" r="26" fill="${c}" opacity=".5" filter="url(#mwg)"/>` + raios(32, 32, 20, 29, 12, '#fff', 0.5, 1.6);
    if (g >= 3) o += `<circle cx="32" cy="32" r="23" fill="none" stroke="${c}" stroke-width="1.2" opacity=".7"/>`;
    return o + `<path d="M14 24q-4-12 6-16 1 8 8 9 0-9 8-14 3 10 8 11 7-3 9-10 5 10-2 20z" fill="#ffb347" opacity=".85"/>` + cel('M32 14a18 18 0 1 0 0.01 0z', c)
      + `<ellipse cx="32" cy="33" rx="4.4" ry="11" fill="${OL}"/><ellipse cx="32" cy="33" rx="2" ry="8" fill="${OURO}"/>` + brilho('M20 28a13 13 0 0 1 14-12 10 10 0 0 0-12 11z', 0.7) + `<ellipse cx="23" cy="25" rx="3.4" ry="2" fill="#fff" transform="rotate(-40 23 25)"/>`;
  },
  ring: (c) => `<circle cx="32" cy="38" r="20" fill="${c}" opacity=".35" filter="url(#mwg2)"/>` + cel('M32 22a17 17 0 1 0 0.01 0zM32 29a10 10 0 1 1-0.01 0z', OURO, { w: 2, off: 2.4 })
    + cel('M23 18l9-12 9 12-9 8z', c) + `<path d="M32 6l9 12-9 8z" fill="${escuro(c, 0.3)}" opacity=".6"/>` + brilho('M26 16l6-7-2 10z', 0.85) + estrela(46, 12, 3.4, '#fff'),
  crystal: (c) => `<ellipse cx="32" cy="32" rx="22" ry="26" fill="${c}" opacity=".45" filter="url(#mwg2)"/>` + cel('M32 4l15 17-6 33H23l-6-33z', c) + `<path d="M32 4l-5 17 5 33 5-33z" fill="#fff" opacity=".25"/><path d="M17 21h30M27 21l5 33M37 21l-5 33" stroke="${OL}" stroke-width="1.2" fill="none" opacity=".5"/>`
    + brilho('M22 20l8-12-4 15z', 0.8) + estrela(50, 20, 4, '#fff') + estrela(12, 42, 3, '#fff', 0.8) + linha('M12 46l9 5M54 40l-8 8', c, 2.2, 0.7),
  egg: (c) => `<ellipse cx="32" cy="36" rx="22" ry="24" fill="${c}" opacity=".35" filter="url(#mwg2)"/>` + cel('M32 6c12 0 19 18 19 30a19 19 0 0 1-38 0c0-12 7-30 19-30z', '#f4ead0')
    + `<path d="M13 38l8-6 6 8 6-9 7 8 8-6 3 8a19 19 0 0 1-38 0z" fill="${c}" opacity=".55"/>` + linha('M17 34l8-5 6 7 6-8 7 7 7-5', OL, 1.8) + brilho('M20 24q2-9 9-13-5 7-4 17z', 0.8) + estrela(46, 16, 3, '#fff'),
  scroll: (c) => cel('M10 16h44v32H10z', '#f4e6bf') + `<path d="M10 16h44v6H10z" fill="${escuro('#f4e6bf', 0.1)}"/>` + cel('M5 12a5 5 0 1 0 0 40 5 5 0 0 0 0-40zM59 12a5 5 0 1 0 0 40 5 5 0 0 0 0-40z', c, { w: 1.8, off: 1.6 })
    + `<path d="M18 26h28M18 32h20M18 38h24" stroke="${OL}" stroke-width="1.8" stroke-linecap="round" opacity=".55"/><circle cx="46" cy="38" r="4" fill="${SANGUE}"/>` + estrela(50, 20, 3, '#fff', 0.8),
  key: (c) => `<ellipse cx="22" cy="22" rx="16" ry="16" fill="${c}" opacity=".4" filter="url(#mwg2)"/>` + cel('M22 8a14 14 0 1 0 0.01 0zM22 17a5 5 0 1 1-0.01 0z', OURO, { w: 2, off: 2 })
    + cel('M30 26l26 26-4 4-26-26z', OURO, { w: 2, off: 2 }) + cel('M44 40l6-6 4 4-6 6zM50 46l5-5 3 3-5 5z', c, { w: 1.6, off: 1.2 }) + brilho('M15 13a8 8 0 0 1 8-3-6 3-8 8z', 0.8) + estrela(52, 18, 3.4, '#fff'),
  tablet: (c) => `<ellipse cx="32" cy="32" rx="20" ry="28" fill="${c}" opacity=".4" filter="url(#mwg2)"/>` + cel('M16 58V22Q16 4 32 4t16 18v36z', mix(c, '#5b6b8a', 0.55))
    + `<path d="M24 24h16M24 32h16M24 40h10" stroke="${claro(c, 0.7)}" stroke-width="2.2" stroke-linecap="round"/><circle cx="32" cy="50" r="3" fill="${OURO}" stroke="${OL}" stroke-width="1.2"/>` + brilho('M20 20Q21 9 31 7q-8 4-8 15z', 0.7) + estrela(46, 12, 3, '#fff'),
  fallback: (c) => `<ellipse cx="32" cy="32" rx="22" ry="24" fill="${c}" opacity=".4" filter="url(#mwg2)"/>` + cel('M32 6l20 18-20 32-20-32z', c) + `<path d="M12 24h40M22 24l10 32M42 24L32 56M32 6l-10 18M32 6l10 18" stroke="${OL}" stroke-width="1.2" fill="none" opacity=".55"/>`
    + brilho('M18 22l11-13-5 14z', 0.8) + estrela(48, 14, 3.4, '#fff'),
};

/** Moldura e fundo de cada cartão: o grau muda brilho, adornos e coroa. */
function cartao(inner: string, col: string, grade: number, seed: number): string {
  const g = Math.max(1, Math.min(5, grade)), id = uid('f'), gc = GRAU[g];
  let o = fundo(id, 64, 64, col, 12, 0.35 + g * 0.05) + raios(32, 34, 8, 40, 14, '#fff', 0.06 + g * 0.015, 1.4);
  o += particulas(seed, 64, 64, 5 + g * 2, claro(col, 0.6));
  if (g >= 3) o += `<rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="${gc}" stroke-width="3" opacity=".7" filter="url(#mwg2)"/>`;
  o += inner;
  o += `<rect x="1.8" y="1.8" width="60.4" height="60.4" rx="12" fill="none" stroke="${OL}" stroke-width="2.4"/><rect x="2.6" y="2.6" width="58.8" height="58.8" rx="11.4" fill="none" stroke="${gc}" stroke-width="${g >= 4 ? 2.4 : 1.8}"/>`;
  if (g >= 4) o += `<path d="M8 17V8h9M47 8h9v9M56 47v9h-9M17 56H8v-9" fill="none" stroke="${gc}" stroke-width="2" stroke-linecap="round"/>`;
  if (g >= 5) o += `<path d="M24 9l3 4 5-6 5 6 3-4 1 5H23z" fill="${gc}" stroke="${OL}" stroke-width="1.2" stroke-linejoin="round"/>`;
  return o;
}

export function item(it: Item, size: number): string {
  const c = PAL[hash(it.id) % PAL.length];
  const cor = it.kind === 'pilula' || it.kind === 'nucleo' ? c : it.kind === 'artefato' || it.kind === 'anel' ? PAL[(hash(it.id) >>> 3) % PAL.length] : c;
  return svg(64, 64, cartao(GLIFOS[itemMotif(it)](cor, it.grade), cor, it.grade, hash(it.id)), 'art art-item', it.name, size);
}

/* ---------- Técnicas (selo circular, 64x64) ---------- */
const TAG: Record<string, (c: string) => string> = {
  combate: (c) => cel('M14 46L42 14l6 4-28 34z', ACO, { w: 1.8, off: 1.6 }) + cel('M50 46L22 14l-6 4 28 34z', c, { w: 1.8, off: 1.6 }) + estrela(46, 14, 3.4, '#fff'),
  mente: (c) => cel('M8 32Q32 8 56 32 32 56 8 32z', '#f4f0ff', { w: 1.8, off: 2 }) + `<circle cx="32" cy="32" r="10" fill="${c}" stroke="${OL}" stroke-width="1.8"/><circle cx="32" cy="32" r="4.4" fill="${OL}"/><circle cx="35" cy="29" r="2" fill="#fff"/>` + raios(32, 32, 14, 24, 8, c, 0.6, 1.4),
  qi: (c) => `<path d="M32 10a22 22 0 1 1-22 22 14 14 0 0 1 28 0 7 7 0 0 1-14 0" fill="none" stroke="${OL}" stroke-width="8.4" stroke-linecap="round"/><path d="M32 10a22 22 0 1 1-22 22 14 14 0 0 1 28 0 7 7 0 0 1-14 0" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>` + estrela(50, 14, 3, '#fff'),
  formacao: (c) => cel('M32 6l22 12v28L32 58 10 46V18z', mix(c, '#20194a', 0.5), { w: 2, off: 2 }) + `<path d="M32 6v52M10 18l44 28M54 18L10 46" stroke="${c}" stroke-width="1.6" opacity=".9"/><circle cx="32" cy="32" r="7" fill="${c}" stroke="${OL}" stroke-width="1.6"/>`,
  corpo: (c) => cel('M14 46V30q0-9 9-9h18q9 0 9 9v16q0 8-9 8H23q-9 0-9-8z', c) + `<path d="M23 31v10M32 29v12M41 31v10" stroke="${OL}" stroke-width="2.2" stroke-linecap="round"/>` + brilho('M18 30q1-6 7-7-4 5-4 11z', 0.7) + raios(32, 38, 22, 28, 10, '#fff', 0.5, 1.6),
  espada: (c) => `<g transform="rotate(40 32 32)">` + cel('M32 4l5 8v32H27V12z', ACO) + `<path d="M32 8v34" stroke="#fff" stroke-width="1.8" opacity=".85"/>` + cel('M22 44h20l-2 4H24z', OURO, { w: 1.6, off: 1.2 }) + cel('M29 48h6v10h-6z', c, { w: 1.6, off: 1.2 }) + `</g>` + linha('M8 20q10 0 16 8M50 46q-8 2-14-4', claro(c, 0.5), 2, 0.7),
  veneno: (c) => cel('M32 6C44 24 50 32 50 40a18 18 0 0 1-36 0c0-8 6-16 18-34z', c) + `<path d="M22 42a10 10 0 0 0 10 10" fill="none" stroke="#fff" stroke-width="2.2" opacity=".7" stroke-linecap="round"/>` + `<circle cx="38" cy="44" r="3" fill="#fff" opacity=".35"/>` + estrela(48, 14, 3, '#d8ffd0'),
  besta: (c) => cel('M22 46q0-12 10-12t10 12q0 8-10 8t-10-8z', c) + cel('M12 30a5 6 0 1 0 0.01 0zM24 18a5 6 0 1 0 0.01 0zM40 18a5 6 0 1 0 0.01 0zM52 30a5 6 0 1 0 0.01 0z', c, { w: 1.6, off: 1.2 }),
  demonio: (c) => cel('M32 56C18 48 14 34 22 20c3 8 8 8 10 0 2 8 7 8 10 0 8 14 4 28-10 36z', c) + cel('M12 14l8 12 2-10zM52 14l-8 12-2-10z', escuro(c, 0.15), { w: 1.6, off: 1.2 }) + `<circle cx="26" cy="40" r="2.6" fill="#fff"/><circle cx="38" cy="40" r="2.6" fill="#fff"/>`,
  alquimia: (c) => `<path d="M24 20q-5-8 1-14M32 18q-5-9 1-16M40 20q-5-8 1-14" stroke="#ff9a3c" stroke-width="3" fill="none" stroke-linecap="round"/>` + cel('M12 26h40v8c0 12-8 20-20 20S12 46 12 34z', c) + cel('M10 24h44v5H10z', OURO, { w: 1.6, off: 1.2 }) + brilho('M17 32q0-4 4-5-2 4-2 10z', 0.6),
  forja: (c) => cel('M10 38h44l-6 14H16z', mix(c, '#3a3560', 0.5)) + cel('M18 38V24h28v14', c, { w: 1.8, off: 1.6 }) + `<path d="M26 18l3-10 3 10M34 16l3-8 2 9" fill="#ff9a3c" stroke="${OL}" stroke-width="1.4" stroke-linejoin="round"/>`,
  fuga: (c) => `<path d="M8 38q14-18 28-8t20-4M8 48q14-18 28-8t20-4" fill="none" stroke="${OL}" stroke-width="6.4" stroke-linecap="round"/><path d="M8 38q14-18 28-8t20-4M8 48q14-18 28-8t20-4" fill="none" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>` + cel('M46 14l12 6-12 6z', c, { w: 1.6, off: 1.2 }),
};

export function tech(t: Technique, size: number): string {
  const g = Math.max(1, Math.min(4, t.grade)), h = hash(t.id);
  const col = [ACO, VERDE, AZUL, OURO][g - 1] === ACO ? PAL[h % PAL.length] : [ACO, VERDE, AZUL, OURO][g - 1];
  const tag = t.tags?.find((x) => TAG[x]);
  const id = uid('t');
  let o = fundo(id, 64, 64, col, 32, 0.5) + `<circle cx="32" cy="32" r="29.5" fill="none" stroke="${OL}" stroke-width="3"/>`;
  for (let i = 0; i < g; i++) o += `<circle cx="32" cy="32" r="${29 - i * 2.8}" fill="none" stroke="${col}" stroke-width="${i === 0 ? 2.4 : 1}" opacity="${1 - i * 0.2}"/>`;
  o += raios(32, 32, 14, 27, 12 + g * 2, '#fff', 0.1, 1.2) + particulas(h, 64, 64, 4 + g, claro(col, 0.6));
  const glifo = tag ? TAG[tag](col) : cel(`M32 12l${8 + (h % 5)} 14-${8 + (h % 5)} 24-${12 + (h % 4)}-24z`, col) + estrela(32, 30, 4, '#fff');
  o += `<g transform="translate(32 32) scale(0.62) translate(-32 -32)">${glifo}</g>`;
  if (g >= 4) o += `<circle cx="32" cy="32" r="31" fill="none" stroke="${OURO}" stroke-width="1.4" stroke-dasharray="2 4" opacity=".9"/>`;
  return svg(64, 64, o, 'art art-tech', t.name, size);
}

/* ---------- Trilhas ---------- */
const TRILHAS: Record<string, { c: string; g: (c: string) => string }> = {
  sopro: { c: AZUL, g: (c) => `<path d="M10 26q12-10 24 0t20-4M10 38q12-10 24 0t20-4M16 50q10-8 20 0t14-3" fill="none" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M10 26q12-10 24 0t20-4M10 38q12-10 24 0t20-4M16 50q10-8 20 0t14-3" fill="none" stroke="${claro(c, 0.45)}" stroke-width="3.6" stroke-linecap="round"/>` },
  espada: { c: ACO, g: (c) => `<g transform="rotate(0 32 32)">${cel('M32 4l7 11v31H25V15z', ACO)}<path d="M32 8v36" stroke="#fff" stroke-width="2" opacity=".8"/>${cel('M18 46h28l-3 5H21z', OURO, { w: 1.8, off: 1.4 })}${cel('M29 51h6v10h-6z', SANGUE, { w: 1.8, off: 1.2 })}</g>${estrela(48, 18, 3.4, '#fff')}` },
  alquimia: { c: OURO, g: () => `<path d="M22 22q-5-9 1-16M32 20q-5-10 1-18M42 22q-5-9 1-16" stroke="#ff9a3c" stroke-width="3.4" fill="none" stroke-linecap="round"/>${cel('M10 28h44v8c0 14-9 22-22 22S10 50 10 36z', '#463a6a')}${cel('M8 26h48v6H8z', OURO, { w: 1.8, off: 1.4 })}${estrela(46, 44, 3, OURO)}` },
  corpo: { c: SANGUE, g: (c) => cel('M12 50V32l8-12h8l4 8 4-8h8l8 12v18z', c) + `<path d="M23 36v8M32 34v10M41 36v8" stroke="${OL}" stroke-width="2.4" stroke-linecap="round"/>` + raios(32, 38, 26, 31, 12, '#fff', 0.45, 1.6) },
  alma: { c: ROXO, g: (c) => cel('M6 32Q32 6 58 32 32 58 6 32z', '#f2ecff', { w: 2, off: 2 }) + `<circle cx="32" cy="32" r="11" fill="${c}" stroke="${OL}" stroke-width="2"/><circle cx="32" cy="32" r="4.6" fill="${OL}"/><circle cx="35" cy="29" r="2.2" fill="#fff"/>` + raios(32, 32, 16, 28, 10, c, 0.7, 1.6) },
  formacoes: { c: VERDE, g: (c) => cel('M32 4l24 14v28L32 60 8 46V18z', '#1d3a5a') + `<path d="M32 4v56M8 18l48 28M56 18L8 46" stroke="${c}" stroke-width="1.8"/><circle cx="32" cy="32" r="9" fill="${c}" stroke="${OL}" stroke-width="2"/>` + estrela(32, 32, 4, '#fff') },
  budista: { c: OURO, g: (c) => cel('M32 54c-9-5-17-13-19-24 8 0 14 5 19 13 5-8 11-13 19-13-2 11-10 19-19 24z', c) + cel('M32 46c-5-8-5-20 0-32 5 12 5 24 0 32z', '#fff4cf', { w: 1.8, off: 1.6 }) + linha('M18 58h28', OURO, 3.4) },
  venenos: { c: VERDE, g: (c) => cel('M32 4C46 24 52 32 52 40a20 20 0 0 1-40 0C12 32 18 24 32 4z', c) + cel('M24 46l3-9h-6zM40 46l-3-9h6z', '#f4efdc', { w: 1.4, off: 1 }) + brilho('M20 40q0-8 7-12-4 6-3 14z', 0.7) },
  bestas: { c: '#ff9a3c', g: (c) => cel('M20 46q0-14 12-14t12 14q0 9-12 9t-12-9z', c) + cel('M8 32a6 7 0 1 0 0.01 0zM22 16a6 7 0 1 0 0.01 0zM42 16a6 7 0 1 0 0.01 0zM56 32a6 7 0 1 0 0.01 0z', c, { w: 1.8, off: 1.4 }) },
  demoniaca: { c: '#d12a4a', g: (c) => cel('M32 58C16 50 12 34 20 18c4 8 9 8 12 0 3 8 8 8 12 0 8 16 4 32-12 40z', c) + cel('M10 12l9 14 2-12zM54 12l-9 14-2-12z', escuro(c, 0.2), { w: 1.6, off: 1.2 }) + `<path d="M22 38l6 3-6 3M42 38l-6 3 6 3" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>` },
};

export function path(id: string, size: number): string {
  const a = TRILHAS[id] ?? TRILHAS.sopro, fid = uid('p');
  const o = fundo(fid, 64, 64, a.c, 32, 0.55) + `<circle cx="32" cy="32" r="29.5" fill="none" stroke="${OL}" stroke-width="3"/><circle cx="32" cy="32" r="28" fill="none" stroke="${a.c}" stroke-width="2"/>`
    + raios(32, 32, 16, 28, 16, '#fff', 0.08, 1.2) + `<g transform="translate(32 32) scale(0.64) translate(-32 -32)">${a.g(a.c)}</g>`;
  return svg(64, 64, o, 'art art-path', id, size);
}

/* ---------- Reinos ---------- */
export function realm(ladder: string, tier: number, size: number): string {
  const murim = ladder === 'murim', t = Math.min(8, tier);
  const col = ['#9aa3b5', ACO, VERDE, OURO, AZUL, ROXO, '#ff7eb6', '#ff9a3c', '#fff0a0'][t];
  const forma = (r: number, w: number, op = 1) => murim
    ? `<path d="M32 ${32 - r}L${32 + r} 32 32 ${32 + r} ${32 - r} 32z" fill="none" stroke="${col}" stroke-width="${w}" opacity="${op}" stroke-linejoin="round"/>`
    : `<circle cx="32" cy="32" r="${r}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${op}"/>`;
  const id = uid('r');
  let o = fundo(id, 64, 64, col, 32, 0.25 + t * 0.06) + `<circle cx="32" cy="32" r="29.5" fill="none" stroke="${OL}" stroke-width="3"/>`;
  const aneis = Math.min(5, 1 + Math.floor(t / 2));
  for (let i = 0; i < aneis; i++) o += forma(26 - i * 4.4, i === 0 ? 2.4 : 1.4, 1 - i * 0.14);
  o += raios(32, 32, 10, 27, 8 + t * 2, col, 0.18 + t * 0.03, 1.2);
  const nucleo = murim ? `<path d="M32 ${22 - t}L${42 + t} 32 32 ${42 + t} ${22 - t} 32z" fill="${col}" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/>` : `<circle cx="32" cy="32" r="${6 + t * 0.9}" fill="${col}" stroke="${OL}" stroke-width="2"/>`;
  o += nucleo + `<circle cx="${29}" cy="${29}" r="2.2" fill="#fff" opacity=".85"/>`;
  if (t >= 3) o += estrela(32, 7, 3.4, col) + estrela(32, 57, 3.4, col);
  if (t >= 6) o += estrela(7, 32, 3, col) + estrela(57, 32, 3, col);
  if (t >= 8) o += `<circle cx="32" cy="32" r="31" fill="none" stroke="${OURO}" stroke-width="1.4" stroke-dasharray="2 4"/>`;
  return svg(64, 64, o, 'art art-realm', `Reino ${tier}`, size);
}
