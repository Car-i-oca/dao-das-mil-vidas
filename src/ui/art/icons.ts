import type { Item, Technique } from '../../types';
import { C, GRADE_COLOR, hash, plate, prng, svg } from './core';

/* =====================================================================
 * Ícones de itens, técnicas, trilhas e reinos. Tudo em SVG 64x64.
 * Variação por id (cor, detalhes) e por grau (moldura, brilho, adornos).
 * ===================================================================== */

const PILL_COLORS = [C.jade, C.gold, C.red, C.blue, C.violet, '#d98aa3'];

function stroke(color: string, w = 2.4) { return `fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`; }

/* ---------- Itens ---------- */
type Glyph = (g: number, r: () => number, col: string) => string;

const pill: Glyph = (g, r, col) => {
  const rings = Math.max(0, g - 1);
  let o = '';
  for (let i = 0; i < rings; i++) o += `<circle cx="32" cy="34" r="${15 + i * 3.5}" ${stroke(col, 1.1)} opacity="${0.55 - i * 0.1}"/>`;
  return `${o}<circle cx="32" cy="34" r="12" fill="${col}"/><circle cx="32" cy="34" r="12" fill="url(#shine)" opacity="0.5"/><ellipse cx="27.5" cy="29.5" rx="4" ry="2.6" fill="#fff" opacity="0.5" transform="rotate(-30 27.5 29.5)"/><path d="M26 41q6 4 12 0" ${stroke(C.dark, 1.2)} opacity="0.35"/>`;
};

const herb: Glyph = (g, r, col) => {
  const leaves = 2 + g;
  let o = `<path d="M32 54V26" ${stroke(C.jade, 2.6)}/><path d="M32 54q-6 3-10 1M32 54q6 3 10 1" ${stroke(C.gold, 1.6)} opacity="0.8"/>`;
  for (let i = 0; i < leaves; i++) {
    const y = 48 - i * (22 / leaves) * 1.15;
    const side = i % 2 ? 1 : -1;
    const len = 12 + r() * 6;
    o += `<path d="M32 ${y}q${side * len} -${4 + r() * 4} ${side * (len + 2)} -${9 + r() * 3}q-${side * len * 0.7} 1 -${side * (len + 2)} ${9 + r() * 3}z" fill="${C.jade}" opacity="${0.75 + r() * 0.2}"/>`;
  }
  if (g >= 3) o += `<circle cx="32" cy="22" r="4" fill="${col}"/><circle cx="32" cy="22" r="7" ${stroke(col, 1)} opacity="0.5"/>`;
  return o;
};

const blade: Glyph = (g, r, col) =>
  `<path d="M44 12L22 42l-3-3L40 10z" fill="${C.steel}" stroke="${C.dark}" stroke-width="1" transform="rotate(8 32 32)"/><path d="M22 42l-8 8M18 38l7 7" ${stroke(col, 3)}/><circle cx="14" cy="50" r="2.4" fill="${col}"/><path d="M41 15L25 38" ${stroke('#fff', 1)} opacity="0.5"/>${g >= 3 ? `<path d="M46 16q4-2 6 2M48 22q4 0 5 3" ${stroke(col, 1.4)} opacity="0.7"/>` : ''}`;

const armor: Glyph = (g, r, col) =>
  `<path d="M32 10l16 6v14c0 12-7 20-16 24C23 50 16 42 16 30V16z" fill="${col}" opacity="0.85" stroke="${C.dark}" stroke-width="1.2"/><path d="M32 14v36M20 26h24" ${stroke(C.bone, 1.5)} opacity="0.7"/>${g >= 3 ? `<circle cx="32" cy="29" r="5" ${stroke(C.gold, 1.6)}/>` : ''}`;

const bell: Glyph = (g, r, col) =>
  `<path d="M32 12v6M20 44c0-12 4-22 12-22s12 10 12 22z" fill="${col}" stroke="${C.dark}" stroke-width="1.2"/><path d="M18 44h28" ${stroke(C.dark, 2.4)}/><circle cx="32" cy="48" r="3" fill="${C.gold}"/><path d="M27 30q2-5 7-5" ${stroke('#fff', 1.2)} opacity="0.5"/>`;

const mirror: Glyph = (g, r, col) =>
  `<circle cx="32" cy="29" r="16" fill="${C.bg}" stroke="${col}" stroke-width="3"/><circle cx="32" cy="29" r="11" fill="${C.blue}" opacity="0.35"/><path d="M24 24q5-6 12-3" ${stroke('#fff', 1.4)} opacity="0.6"/><path d="M32 45v10M27 55h10" ${stroke(col, 3)}/>`;

const cauldron: Glyph = (g, r, col) =>
  `<path d="M16 28h32v8c0 9-7 14-16 14s-16-5-16-14z" fill="${C.dark}" stroke="${col}" stroke-width="2"/><path d="M14 28h36" ${stroke(col, 3)}/><path d="M20 52v5M44 52v5" ${stroke(col, 2.6)}/><path d="M26 22q-3-5 0-9M32 22q-3-6 1-11M38 22q-3-5 0-9" ${stroke(C.fire, 1.8)} opacity="0.85"/>`;

const banner: Glyph = (g, r, col) =>
  `<path d="M20 10v46" ${stroke(C.bone, 2.4)}/><path d="M20 12h26l-5 8 5 8H20z" fill="${col}" stroke="${C.dark}" stroke-width="1"/><path d="M26 20h14" ${stroke(C.bone, 1.4)} opacity="0.8"/><circle cx="20" cy="10" r="2.4" fill="${C.gold}"/>`;

const lantern: Glyph = (g, r, col) =>
  `<path d="M32 8v6" ${stroke(C.muted, 2)}/><ellipse cx="32" cy="32" rx="14" ry="17" fill="${col}" opacity="0.9" stroke="${C.dark}" stroke-width="1.2"/><path d="M22 20q10 6 20 0M20 32h24M22 44q10-6 20 0" ${stroke(C.dark, 1.2)} opacity="0.5"/><path d="M28 52v6M36 52v6" ${stroke(C.gold, 2)}/><circle cx="32" cy="32" r="6" fill="#ffe9a8" opacity="0.7"/>`;

const talisman: Glyph = (g, r, col) => {
  let marks = '';
  const n = 3 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) {
    const y = 18 + i * 8;
    marks += `<path d="M${25 + r() * 4} ${y}q${4 + r() * 4} ${-3 - r() * 3} ${10 + r() * 4} ${r() * 3 - 1}" ${stroke(C.red, 2)}/>`;
  }
  return `<rect x="22" y="8" width="20" height="48" rx="2" fill="${C.bone}" stroke="${col}" stroke-width="1.6"/><path d="M24 12h16" ${stroke(C.red, 1.4)}/>${marks}<circle cx="32" cy="51" r="2.6" fill="${C.red}"/>`;
};

const manual: Glyph = (g, r, col) =>
  `<rect x="16" y="10" width="32" height="44" rx="3" fill="${col}" stroke="${C.dark}" stroke-width="1.4"/><path d="M20 10v44" ${stroke(C.dark, 1.6)} opacity="0.5"/><rect x="25" y="19" width="16" height="12" rx="1.6" fill="${C.bone}" opacity="0.9"/><path d="M28 23h10M28 27h7" ${stroke(C.dark, 1.2)}/><path d="M24 44h20" ${stroke(C.bone, 1.4)} opacity="0.6"/><path d="M48 14v10" ${stroke(C.gold, 2.4)}/>`;

const core: Glyph = (g, r, col) =>
  `<circle cx="32" cy="32" r="16" fill="${col}" opacity="0.9"/><circle cx="32" cy="32" r="16" fill="url(#shine)" opacity="0.55"/><circle cx="32" cy="32" r="16" ${stroke(C.dark, 1.2)}/><ellipse cx="32" cy="32" rx="3.2" ry="8" fill="${C.dark}"/><ellipse cx="32" cy="32" rx="1.2" ry="5.6" fill="${C.gold}"/>${g >= 3 ? `<circle cx="32" cy="32" r="22" ${stroke(col, 1.2)} opacity="0.5"/>` : ''}`;

const ring: Glyph = (g, r, col) =>
  `<circle cx="32" cy="38" r="14" ${stroke(C.gold, 4.4)}/><path d="M26 25l6-8 6 8-6 5z" fill="${col}" stroke="${C.dark}" stroke-width="1.2"/><path d="M29 24l3-3" ${stroke('#fff', 1.2)} opacity="0.7"/>`;

const crystal: Glyph = (g, r, col) =>
  `<path d="M32 8l12 14-5 30H25l-5-30z" fill="${col}" opacity="0.85" stroke="${C.dark}" stroke-width="1.2"/><path d="M32 8l-4 14 4 30 4-30z" fill="#fff" opacity="0.25"/><path d="M20 22h24" ${stroke('#fff', 1)} opacity="0.4"/><path d="M14 40l8 4M50 36l-8 6" ${stroke(col, 2)} opacity="0.6"/>`;

const egg: Glyph = (g, r, col) =>
  `<path d="M32 10c10 0 16 16 16 26a16 16 0 0 1-32 0c0-10 6-26 16-26z" fill="${C.bone}" stroke="${col}" stroke-width="2"/><path d="M22 34l6-4 4 6 5-6 6 5" ${stroke(col, 1.8)}/><circle cx="26" cy="22" r="2" fill="#fff" opacity="0.7"/>`;

const fruit: Glyph = (g, r, col) =>
  `<path d="M32 18c-14-2-20 8-18 20 2 10 10 16 18 16s16-6 18-16c2-12-4-22-18-20z" fill="${col}" stroke="${C.dark}" stroke-width="1.2"/><path d="M32 18c0-5 2-8 6-9" ${stroke(C.jade, 2.4)}/><path d="M38 9q6 1 8 6-6 1-8-6z" fill="${C.jade}"/><ellipse cx="25" cy="30" rx="4" ry="6" fill="#fff" opacity="0.25"/>`;

const scroll: Glyph = (g, r, col) =>
  `<rect x="12" y="20" width="40" height="24" rx="3" fill="${C.bone}" stroke="${col}" stroke-width="1.6"/><circle cx="12" cy="32" r="5" fill="${col}"/><circle cx="52" cy="32" r="5" fill="${col}"/><path d="M20 28h24M20 34h18M20 40h22" ${stroke(C.dark, 1.2)} opacity="0.55"/>`;

const key: Glyph = (g, r, col) =>
  `<circle cx="22" cy="24" r="9" ${stroke(col, 4)}/><path d="M29 31l22 22M42 44l5-5M48 50l5-5" ${stroke(col, 4)}/><circle cx="22" cy="24" r="3" fill="${col}"/>`;

const tablet: Glyph = (g, r, col) =>
  `<path d="M20 52V20q0-10 12-10t12 10v32z" fill="${col}" opacity="0.85" stroke="${C.dark}" stroke-width="1.4"/><path d="M26 22h12M26 30h12M26 38h8" ${stroke(C.bone, 1.6)} opacity="0.8"/>`;

const seed: Glyph = (g, r, col) =>
  `<path d="M32 50V34" ${stroke(C.jade, 2.6)}/><path d="M32 36q-14-2-16-16 12-2 16 16zM32 34q12-4 14-18-12 0-14 18z" fill="${C.jade}"/><ellipse cx="32" cy="52" rx="10" ry="3" fill="${col}" opacity="0.6"/>`;

const fallback: Glyph = (g, r, col) =>
  `<path d="M32 12l18 14-18 26-18-26z" fill="${col}" opacity="0.8" stroke="${C.dark}" stroke-width="1.2"/><path d="M14 26h36" ${stroke('#fff', 1)} opacity="0.4"/>`;

/** Escolhe o desenho pela categoria e por palavras do nome. */
function itemGlyph(it: Item): Glyph {
  const n = it.name.toLowerCase();
  const has = (...w: string[]) => w.some((x) => n.includes(x));
  switch (it.kind) {
    case 'pilula': return pill;
    case 'erva': return n.includes('fruta') ? fruit : n.includes('semente') ? seed : herb;
    case 'talisma': return talisman;
    case 'manual': return manual;
    case 'nucleo': return core;
    case 'anel': return ring;
    case 'artefato':
      if (has('espada', 'lâmina', 'lamina', 'bastão', 'bastao', 'martelo', 'punhal')) return blade;
      if (has('manto', 'armadura', 'escudo', 'luva', 'túnica', 'veste', 'seda')) return armor;
      if (has('sino')) return bell;
      if (has('espelho')) return mirror;
      if (has('fornalha', 'caldeirão', 'caldeirao', 'forja')) return cauldron;
      if (has('estandarte', 'formação', 'formacao', 'pincel')) return banner;
      if (has('lanterna', 'lampião')) return lantern;
      return fallback;
    default:
      if (has('cristal', 'gema', 'pérola', 'perola', 'jade', 'lingote', 'fragmento', 'escama')) return crystal;
      if (has('ovo')) return egg;
      if (has('mapa', 'pergaminho', 'escritura', 'carta')) return scroll;
      if (has('chave', 'selo', 'jade_identidade')) return n.includes('selo') ? tablet : key;
      if (has('fruta')) return fruit;
      if (has('semente')) return seed;
      if (has('lanterna')) return lantern;
      if (has('sino')) return bell;
      if (has('manto', 'seda', 'armadura', 'escudo')) return armor;
      if (has('espada', 'lâmina', 'lamina', 'bastão')) return blade;
      if (has('rosário', 'rosario', 'contas', 'tigela', 'incenso')) return ring;
      return fallback;
  }
}

const DEFS = `<defs><radialGradient id="shine" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity="0.9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`;

export function itemIcon(it: Item, size = 56): string {
  const r = prng(hash(it.id));
  const col = it.kind === 'artefato' || it.kind === 'anel' ? GRADE_COLOR[it.grade] === C.gold ? C.gold : PILL_COLORS[hash(it.id) % PILL_COLORS.length] : PILL_COLORS[hash(it.id) % PILL_COLORS.length];
  const body = DEFS + plate(it.grade, itemGlyph(it)(it.grade, r, col));
  return svg(64, 64, body, 'art art-item', it.name).replace(/width="64" height="64"/, `width="${size}" height="${size}"`);
}

/* ---------- Técnicas ---------- */
const TAG_GLYPH: Record<string, (col: string) => string> = {
  combate: (c) => `<path d="M20 44L44 20M44 44L20 20" ${stroke(c, 4)}/><path d="M44 20l4-1-1 4M20 20l-4-1 1 4" ${stroke(c, 2)}/>`,
  mente: (c) => `<path d="M16 32q16-16 32 0-16 16-32 0z" ${stroke(c, 2.6)}/><circle cx="32" cy="32" r="6" fill="${c}"/><circle cx="32" cy="32" r="2.4" fill="${C.dark}"/>`,
  qi: (c) => `<path d="M32 16a16 16 0 1 1-16 16 10 10 0 0 1 20 0 5 5 0 0 1-10 0" ${stroke(c, 3)}/>`,
  formacao: (c) => `<path d="M32 14l16 9v18l-16 9-16-9V23z" ${stroke(c, 2.4)}/><path d="M32 14v36M16 23l32 18M48 23L16 41" ${stroke(c, 1.2)} opacity="0.7"/>`,
  corpo: (c) => `<path d="M20 42V28q0-6 6-6h12q6 0 6 6v14q0 6-6 6H26q-6 0-6-6z" fill="${c}" opacity="0.9"/><path d="M26 28v8M32 26v10M38 28v8" ${stroke(C.dark, 1.6)}/>`,
  espada: (c) => `<path d="M46 14L24 40l-4-4L42 12z" fill="${c}"/><path d="M20 40l-6 8M16 36l8 8" ${stroke(C.steel, 3)}/>`,
  veneno: (c) => `<path d="M32 12c10 14 14 20 14 26a14 14 0 0 1-28 0c0-6 4-12 14-26z" fill="${c}" opacity="0.9"/><path d="M26 38a6 6 0 0 0 6 6" ${stroke('#fff', 1.6)} opacity="0.6"/>`,
  besta: (c) => `<ellipse cx="32" cy="40" rx="10" ry="8" fill="${c}"/><circle cx="20" cy="28" r="4.4" fill="${c}"/><circle cx="28" cy="20" r="4.4" fill="${c}"/><circle cx="36" cy="20" r="4.4" fill="${c}"/><circle cx="44" cy="28" r="4.4" fill="${c}"/>`,
  demonio: (c) => `<path d="M32 50c-10-6-14-14-8-24 2 6 6 6 8 0 2 6 6 6 8 0 6 10 2 18-8 24z" fill="${c}"/><path d="M20 20l4 6M44 20l-4 6" ${stroke(c, 2.6)}/>`,
  alquimia: (c) => `<path d="M18 34h28v4c0 8-6 12-14 12s-14-4-14-12z" fill="${c}" opacity="0.9"/><path d="M26 28q-2-5 1-9M32 28q-2-6 2-11M38 28q-2-5 1-9" ${stroke(C.fire, 2)}/>`,
  forja: (c) => `<path d="M18 38h28l-4 10H22z" fill="${c}"/><path d="M24 38V26h16v12" ${stroke(c, 2.6)}/><path d="M30 20l2-6 2 6" ${stroke(C.fire, 2)}/>`,
  fuga: (c) => `<path d="M16 36q10-12 20-6t14-2M16 44q10-12 20-6t14-2" ${stroke(c, 2.6)}/><path d="M44 22l8 4-8 4" ${stroke(c, 2.4)}/>`,
};

function glyphFromTags(tags: string[] | undefined, col: string, h: number): string {
  const key = tags?.find((t) => TAG_GLYPH[t]);
  if (key) return TAG_GLYPH[key](col);
  // Sem tag: um selo abstrato único por id.
  const r = prng(h);
  let d = '';
  const n = 3 + Math.floor(r() * 3);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r();
    d += `${i ? 'L' : 'M'}${32 + Math.cos(a) * 15} ${32 + Math.sin(a) * 15}`;
  }
  return `<path d="${d}Z" ${stroke(col, 2.6)}/><circle cx="32" cy="32" r="${3 + r() * 3}" fill="${col}"/>`;
}

/** Selo circular da técnica: anéis e cor crescem com o grau (1 a 4). */
export function techIcon(t: Technique, size = 52): string {
  const h = hash(t.id);
  const col = [C.steel, C.jade, C.blue, C.gold][t.grade - 1];
  const rings = t.grade;
  let o = `<circle cx="32" cy="32" r="28" fill="${C.bg2}" stroke="${col}" stroke-width="2.4"/>`;
  for (let i = 1; i < rings; i++) o += `<circle cx="32" cy="32" r="${28 - i * 3.2}" fill="none" stroke="${col}" stroke-width="0.9" opacity="${0.8 - i * 0.15}"/>`;
  if (t.grade >= 3) o += `<circle cx="32" cy="32" r="22" fill="${col}" opacity="0.1"/>`;
  const dots = 4 + (h % 4);
  for (let i = 0; i < dots; i++) {
    const a = (i / dots) * Math.PI * 2 + (h % 7);
    o += `<circle cx="${32 + Math.cos(a) * 27}" cy="${32 + Math.sin(a) * 27}" r="1.6" fill="${t.grade >= 4 ? C.gold : col}"/>`;
  }
  o += `<g transform="translate(32 32) scale(0.62) translate(-32 -32)">${glyphFromTags(t.tags, col, h)}</g>`;
  return svg(64, 64, o, 'art art-tech', t.name).replace(/width="64" height="64"/, `width="${size}" height="${size}"`);
}

/* ---------- Trilhas ---------- */
const PATH_ART: Record<string, { color: string; glyph: string }> = {
  sopro: { color: C.blue, glyph: `<path d="M14 26q10-8 20 0t16-4M14 36q10-8 20 0t16-4M18 46q8-6 16 0t12-3" ${stroke(C.blue, 3)}/><circle cx="46" cy="24" r="3" fill="${C.blue}" opacity="0.7"/>` },
  espada: { color: C.steel, glyph: `<path d="M32 8l5 10v26H27V18z" fill="${C.steel}" stroke="${C.dark}" stroke-width="1"/><path d="M20 44h24" ${stroke(C.gold, 3.4)}/><path d="M32 44v12" ${stroke(C.red, 3.2)}/><path d="M32 12v28" ${stroke('#fff', 1)} opacity="0.6"/>` },
  alquimia: { color: C.gold, glyph: `<path d="M16 34h32v4c0 9-7 14-16 14s-16-5-16-14z" fill="${C.dark}" stroke="${C.gold}" stroke-width="2.4"/><path d="M14 34h36" ${stroke(C.gold, 3)}/><path d="M24 28q-3-6 1-12M32 28q-3-7 2-14M40 28q-3-6 1-12" ${stroke(C.fire, 2.4)}/>` },
  corpo: { color: C.red, glyph: `<path d="M18 46V30l6-8h6l2 6 2-6h6l6 8v16z" fill="${C.red}" opacity="0.9" stroke="${C.dark}" stroke-width="1.2"/><path d="M26 34v6M32 32v8M38 34v6" ${stroke(C.dark, 1.8)}/>` },
  alma: { color: C.violet, glyph: `<path d="M12 32q20-22 40 0-20 22-40 0z" ${stroke(C.violet, 3)}/><circle cx="32" cy="32" r="8" fill="${C.violet}"/><circle cx="32" cy="32" r="3" fill="${C.bone}"/><path d="M32 8v6M18 14l3 4M46 14l-3 4" ${stroke(C.violet, 2)}/>` },
  formacoes: { color: C.jade, glyph: `<path d="M32 8l18 10v20L32 48 14 38V18z" ${stroke(C.jade, 2.6)}/><path d="M32 8v40M14 18l36 20M50 18L14 38" ${stroke(C.jade, 1.4)} opacity="0.8"/><circle cx="32" cy="28" r="5" fill="${C.jade}"/>` },
  budista: { color: C.gold, glyph: `<path d="M32 46c-6-4-12-10-14-18 6 0 10 4 14 10 4-6 8-10 14-10-2 8-8 14-14 18z" fill="${C.gold}" opacity="0.85"/><path d="M32 40c-3-6-3-14 0-22 3 8 3 16 0 22z" fill="${C.bone}"/><path d="M22 50h20" ${stroke(C.gold, 2.4)}/>` },
  venenos: { color: C.jade, glyph: `<path d="M32 10c10 14 14 20 14 26a14 14 0 0 1-28 0c0-6 4-12 14-26z" fill="${C.jade}" opacity="0.85"/><path d="M26 44l2-6M38 44l-2-6" ${stroke(C.bone, 2.6)}/><path d="M24 30q8 4 16 0" ${stroke(C.dark, 1.6)} opacity="0.6"/>` },
  bestas: { color: C.fire, glyph: `<ellipse cx="32" cy="40" rx="11" ry="9" fill="${C.fire}"/><circle cx="18" cy="26" r="5" fill="${C.fire}"/><circle cx="27" cy="17" r="5" fill="${C.fire}"/><circle cx="37" cy="17" r="5" fill="${C.fire}"/><circle cx="46" cy="26" r="5" fill="${C.fire}"/>` },
  demoniaca: { color: C.blood, glyph: `<path d="M32 52c-12-6-16-16-8-28 2 6 6 6 8 0 2 6 6 6 8 0 8 12 4 22-8 28z" fill="${C.blood}"/><path d="M18 18l6 8M46 18l-6 8" ${stroke(C.blood, 3)}/><circle cx="26" cy="38" r="2" fill="${C.bone}"/><circle cx="38" cy="38" r="2" fill="${C.bone}"/>` },
};

export function pathIcon(id: string, size = 56): string {
  const a = PATH_ART[id] ?? PATH_ART.sopro;
  const body = `<circle cx="32" cy="32" r="29" fill="${C.bg2}" stroke="${a.color}" stroke-width="2.6"/><circle cx="32" cy="32" r="24" fill="${a.color}" opacity="0.1"/><g transform="translate(32 32) scale(0.82) translate(-32 -32)">${a.glyph}</g>`;
  return svg(64, 64, body, 'art art-path', id).replace(/width="64" height="64"/, `width="${size}" height="${size}"`);
}

/* ---------- Reinos ---------- */
/** Emblema do reino: círculos (xianxia) ou losangos (murim) que crescem e ganham detalhes a cada reino (0 a 8). */
export function realmIcon(ladder: string, tier: number, size = 56): string {
  const murim = ladder === 'murim';
  const col = [C.muted, C.steel, C.jade, C.gold, C.blue, C.violet, '#d98aa3', C.fire, C.gold][Math.min(8, tier)];
  const shape = (r: number, w = 2, op = 1) => murim
    ? `<path d="M32 ${32 - r}L${32 + r} 32 32 ${32 + r} ${32 - r} 32z" fill="none" stroke="${col}" stroke-width="${w}" opacity="${op}"/>`
    : `<circle cx="32" cy="32" r="${r}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${op}"/>`;
  let o = `<circle cx="32" cy="32" r="29" fill="${C.bg2}" stroke="${C.line}" stroke-width="2"/>`;
  const rings = Math.min(5, 1 + Math.floor(tier / 2));
  for (let i = 0; i < rings; i++) o += shape(24 - i * 4.4, i === 0 ? 2.4 : 1.4, 1 - i * 0.12);
  if (tier === 0) o += `<circle cx="32" cy="32" r="4" fill="${col}"/>`;
  if (tier === 1) o += `<circle cx="32" cy="32" r="5" fill="${col}" opacity="0.8"/>`;
  if (tier === 2) o += `<rect x="27" y="27" width="10" height="10" fill="${col}" opacity="0.9"/>`;
  if (tier === 3) o += `<circle cx="32" cy="32" r="8" fill="${col}"/><path d="M32 20v24M20 32h24" ${stroke(C.dark, 1.2)} opacity="0.4"/>`;
  if (tier === 4) o += `<circle cx="32" cy="27" r="4.6" fill="${col}"/><path d="M24 42q8-10 16 0" fill="${col}"/>`;
  if (tier === 5) o += `<circle cx="27" cy="32" r="8" fill="${col}" opacity="0.7"/><circle cx="37" cy="32" r="8" fill="${col}" opacity="0.7"/>`;
  if (tier === 6) o += `<path d="M32 18a14 14 0 1 0 14 14" ${stroke(col, 3)}/><circle cx="32" cy="32" r="3" fill="${col}"/>`;
  if (tier === 7) o += `<path d="M18 44l10-18 6 10 6-14 8 22z" fill="${col}" opacity="0.9"/><circle cx="32" cy="18" r="4" fill="${col}"/>`;
  if (tier >= 8) {
    o += `<circle cx="32" cy="32" r="7" fill="${col}"/>`;
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; o += `<path d="M${32 + Math.cos(a) * 11} ${32 + Math.sin(a) * 11}L${32 + Math.cos(a) * 17} ${32 + Math.sin(a) * 17}" ${stroke(col, 1.6)}/>`; }
  }
  return svg(64, 64, o, 'art art-realm', `Reino ${tier}`).replace(/width="64" height="64"/, `width="${size}" height="${size}"`);
}
