import { C } from './core';

/* =====================================================================
 * Lutadores de lado (viewBox 120x140, voltados para a direita; os pés ficam em y=130).
 * O jogador muda de roupa, arma e aura com a trilha e o reino; cada oponente tem desenho próprio.
 * ===================================================================== */

export type Weapon = 'espada' | 'punho' | 'orbe' | 'talisma' | 'dardo' | 'frasco' | 'garra' | 'cajado' | 'cutelo' | 'adaga' | 'contas' | 'nenhuma';

export interface Human {
  robe: string; trim: string; skin?: string; hair?: string;
  weapon: Weapon; wcol?: string;
  hood?: boolean; mask?: boolean; horns?: boolean; bald?: boolean; scale?: number; eye?: string;
}

function weaponSvg(w: Weapon, col: string): string {
  switch (w) {
    case 'espada': return `<path d="M88 74L116 40l3 3L94 80z" fill="${C.steel}" stroke="${C.dark}" stroke-width="1"/><path d="M84 80l10-6 2 3-10 6z" fill="${col}"/>`;
    case 'cutelo': return `<path d="M90 76l22-22 6 6-14 20z" fill="#9aa3a9" stroke="${C.dark}" stroke-width="1"/><path d="M86 82l8-8" stroke="#6b4a2a" stroke-width="4"/>`;
    case 'adaga': return `<path d="M90 76l18-10-2 8z" fill="${C.steel}" stroke="${C.dark}" stroke-width="1"/><path d="M86 80l6-4" stroke="${col}" stroke-width="3"/>`;
    case 'cajado': return `<path d="M96 30v100" stroke="#8a6a4a" stroke-width="4" stroke-linecap="round"/><circle cx="96" cy="28" r="5" fill="${col}"/>`;
    case 'orbe': return `<circle cx="100" cy="70" r="9" fill="${col}" opacity="0.9"/><circle cx="100" cy="70" r="14" fill="none" stroke="${col}" stroke-width="1.6" opacity="0.6"/><circle cx="108" cy="52" r="4" fill="${col}" opacity="0.7"/>`;
    case 'talisma': return `<rect x="94" y="52" width="14" height="30" rx="1.5" fill="${C.bone}" stroke="${C.red}" stroke-width="1.4"/><path d="M97 58h8M97 64h8M97 70h6" stroke="${C.red}" stroke-width="1.6"/>`;
    case 'dardo': return `<path d="M90 78l22-6" stroke="${col}" stroke-width="3" stroke-linecap="round"/><path d="M112 72l6-2-3 5z" fill="${col}"/>`;
    case 'frasco': return `<path d="M94 68h10v8a5 5 0 0 1-10 0z" fill="${col}"/><path d="M97 68v-5h4v5" stroke="${C.bone}" stroke-width="2"/>`;
    case 'garra': return `<path d="M88 76q10-4 16-14M90 80q12-2 20-10M90 84q12 2 22-4" stroke="${col}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    case 'contas': return `<path d="M88 76q10 8 18-4" stroke="${C.gold}" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round" fill="none"/><circle cx="104" cy="74" r="6" fill="${C.skin[1]}"/>`;
    case 'punho': return `<circle cx="100" cy="76" r="8" fill="${C.skin[1]}" stroke="${C.dark}" stroke-width="1"/><rect x="92" y="72" width="8" height="9" fill="${C.red}"/>`;
    default: return '';
  }
}

function humanSvg(h: Human): string {
  const skin = h.skin ?? C.skin[1];
  const hair = h.hair ?? C.hair[0];
  let o = '';
  o += `<ellipse cx="58" cy="132" rx="26" ry="5" fill="#000" opacity="0.25"/>`;
  // pernas
  o += `<path d="M48 96l-6 34h12l4-34zM64 96l8 34h12l-8-34z" fill="${C.dark}"/><path d="M40 130h16M70 130h16" stroke="${h.trim}" stroke-width="4" stroke-linecap="round"/>`;
  // manto e torso
  o += `<path d="M42 56q16-12 34 0l10 48H36z" fill="${h.robe}" stroke="${C.dark}" stroke-width="1.2"/>`;
  o += `<path d="M52 56l14 22 14-22" fill="none" stroke="${h.trim}" stroke-width="3"/><path d="M38 100h46" stroke="${h.trim}" stroke-width="3"/>`;
  // braço de trás e da frente
  o += `<path d="M44 62l-10 24" stroke="${h.robe}" stroke-width="9" stroke-linecap="round"/><circle cx="33" cy="88" r="5" fill="${skin}"/>`;
  o += `<path d="M74 62l16 18" stroke="${h.robe}" stroke-width="9" stroke-linecap="round"/><circle cx="90" cy="80" r="5" fill="${skin}"/>`;
  o += weaponSvg(h.weapon, h.wcol ?? C.gold);
  // cabeça
  o += `<rect x="55" y="48" width="10" height="9" fill="${skin}"/>`;
  o += `<circle cx="60" cy="38" r="13" fill="${skin}"/>`;
  if (h.bald) o += `<circle cx="60" cy="38" r="13" fill="${skin}"/>`;
  else if (h.hood) o += `<path d="M44 40q0-24 16-24t16 24q-6-12-16-12t-16 12z" fill="${h.robe}" stroke="${C.dark}" stroke-width="1"/><path d="M48 40q12 6 24 0" fill="${C.dark}" opacity="0.55"/>`;
  else o += `<path d="M46 38q-2-22 14-22t14 22q-6-10-14-10t-14 10z" fill="${hair}"/><circle cx="60" cy="14" r="5" fill="${hair}"/>`;
  if (h.mask) o += `<rect x="52" y="38" width="22" height="9" rx="4" fill="${C.dark}"/>`;
  if (h.horns) o += `<path d="M48 26l-6-12 10 6M72 26l6-12-10 6" fill="${h.trim}"/>`;
  const e = h.eye ?? C.dark;
  o += `<circle cx="66" cy="38" r="2" fill="${e}"/>`;
  if (h.eye) o += `<circle cx="66" cy="38" r="5" fill="${e}" opacity="0.3"/>`;
  o += `<path d="M62 33l8 2" stroke="${C.dark}" stroke-width="1.6"/>`;
  return o;
}

/* ---------- Jogador ---------- */
export const PATH_FIGHT: Record<string, Human> = {
  espada: { robe: '#2f3a45', trim: '#c9ced3', weapon: 'espada', wcol: '#d2a95c' },
  corpo: { robe: '#a43b2c', trim: '#2a2018', weapon: 'punho' },
  sopro: { robe: '#5f7fa6', trim: '#e8e2d0', weapon: 'orbe', wcol: '#5a8fd0' },
  alquimia: { robe: '#a8742f', trim: '#efe0b0', weapon: 'frasco', wcol: '#e0742f' },
  alma: { robe: '#6d56a3', trim: '#e9defa', weapon: 'orbe', wcol: '#8a6fb8' },
  formacoes: { robe: '#3f7a5e', trim: '#e6f0d8', weapon: 'talisma' },
  budista: { robe: '#d79a2b', trim: '#8a3b1d', weapon: 'contas', bald: true },
  venenos: { robe: '#2f5a3a', trim: '#b8d06a', weapon: 'dardo', wcol: '#4fae7a', mask: true },
  bestas: { robe: '#9b5a2c', trim: '#e3c28a', weapon: 'garra', wcol: '#e0742f' },
  demoniaca: { robe: '#4a1620', trim: '#c8362f', weapon: 'garra', wcol: '#8f1f2b', eye: '#c8362f' },
  '': { robe: '#6f6455', trim: '#d8cdb5', weapon: 'cajado' },
};

export function playerFighter(path: string, tier: number): string {
  const h = PATH_FIGHT[path] ?? PATH_FIGHT[''];
  const aura = [C.muted, C.steel, C.jade, C.gold, C.blue, C.violet, '#d98aa3', C.fire, C.gold][Math.min(8, tier)];
  let o = '';
  const rings = Math.min(4, 1 + Math.floor(tier / 2));
  for (let i = 0; i < rings; i++) o += `<ellipse cx="58" cy="${128 - i * 2}" rx="${26 + i * 7}" ry="${6 + i * 2}" fill="none" stroke="${aura}" stroke-width="1.6" opacity="${0.8 - i * 0.18}"/>`;
  o += `<ellipse cx="58" cy="80" rx="${34 + tier * 2}" ry="${56 + tier}" fill="${aura}" opacity="${0.05 + Math.min(0.2, tier * 0.025)}"/>`;
  if (tier >= 6) o += `<circle cx="60" cy="38" r="24" fill="none" stroke="${C.gold}" stroke-width="2" opacity="0.8"/>`;
  o += humanSvg(h);
  if (path === 'bestas') o += `<ellipse cx="22" cy="118" rx="14" ry="9" fill="${C.fire}"/><circle cx="12" cy="110" r="6" fill="${C.fire}"/><path d="M8 105l-2-7 6 3M15 105l2-7-6 3" fill="${C.fire}"/><path d="M34 118q10-4 8-14" stroke="${C.fire}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  return o;
}

/** Cor do rastro dos golpes do jogador. */
export function pathColor(path: string): string {
  return ({ espada: '#dfe6ec', corpo: C.red, sopro: C.blue, alquimia: C.fire, alma: C.violet, formacoes: C.jade, budista: C.gold, venenos: C.jade, bestas: C.fire, demoniaca: C.blood } as Record<string, string>)[path] ?? C.bone;
}

/* ---------- Oponentes ---------- */
const FOE_FIGHT: Record<string, () => string> = {
  bandido: () => humanSvg({ robe: '#6b5a3a', trim: '#a8451f', weapon: 'cutelo', mask: true, hair: '#2a1d14' }),
  assassino: () => humanSvg({ robe: '#1f2128', trim: '#5a5f6b', weapon: 'adaga', hood: true, mask: true, wcol: C.jade }),
  cultivador: () => humanSvg({ robe: '#9b2f2f', trim: '#f1d9a0', weapon: 'espada', wcol: C.red, hair: '#17120e' }),
  monge: () => humanSvg({ robe: '#d79a2b', trim: '#8a3b1d', weapon: 'cajado', bald: true, wcol: C.gold }),
  demonio: () => humanSvg({ robe: '#3a1020', trim: '#c8362f', weapon: 'garra', wcol: C.blood, horns: true, eye: C.red, skin: '#a86a5a', scale: 1.1 }),
  espectro: () => `<ellipse cx="58" cy="132" rx="22" ry="4" fill="#000" opacity="0.18"/><path d="M36 54q22-26 44 0v56q-6 8-12 0t-12 6-12-6-8 4z" fill="#dfe8ee" opacity="0.62"/><path d="M36 54q22-26 44 0" fill="none" stroke="#9fb3c4" stroke-width="2"/><circle cx="52" cy="62" r="4" fill="${C.blue}"/><circle cx="68" cy="62" r="4" fill="${C.blue}"/><ellipse cx="60" cy="76" rx="5" ry="7" fill="${C.dark}" opacity="0.7"/><path d="M80 74q16-2 22 12M82 84q14 6 18 20" stroke="#dfe8ee" stroke-width="5" fill="none" opacity="0.5" stroke-linecap="round"/>`,
  lobo: () => `<ellipse cx="58" cy="132" rx="38" ry="5" fill="#000" opacity="0.22"/><path d="M26 104q0-26 28-30l26-10q16 0 24 12l-8 8q-6-6-14-4l-6 8 4 12h-8l-4-10-24 2-6 12h-8z" fill="#aeb7c0" stroke="${C.dark}" stroke-width="1.2"/><path d="M84 66l10-12 4 12M72 62l6-12 4 12" fill="#aeb7c0" stroke="${C.dark}" stroke-width="1"/><circle cx="96" cy="74" r="2.4" fill="${C.gold}"/><path d="M96 82l8 2" stroke="${C.bone}" stroke-width="2"/><path d="M26 98q-12-6-16 6" stroke="#aeb7c0" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M40 112v18M54 114v16M72 114v16M86 108v22" stroke="${C.dark}" stroke-width="5" stroke-linecap="round"/>`,
  tigre: () => `<ellipse cx="58" cy="132" rx="40" ry="5" fill="#000" opacity="0.22"/><path d="M20 104q0-28 30-32l30-8q20 0 28 14l-8 10q-8-6-16-4l-4 10 4 12h-10l-6-12-24 2-8 12H22z" fill="#e8e2d2" stroke="${C.dark}" stroke-width="1.2"/><path d="M40 78l4 14M54 74l4 16M68 70l4 16" stroke="${C.dark}" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="78" r="2.6" fill="${C.gold}"/><path d="M20 98q-14-4-14 8" stroke="#e8e2d2" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M38 112v18M54 114v16M74 114v16M90 108v22" stroke="${C.dark}" stroke-width="5" stroke-linecap="round"/>`,
  serpente: () => `<ellipse cx="58" cy="132" rx="38" ry="5" fill="#000" opacity="0.2"/><path d="M14 124q22-10 40-2t34-8q14-8 6-28t-4-30" fill="none" stroke="${C.jade}" stroke-width="16" stroke-linecap="round"/><path d="M14 124q22-10 40-2t34-8q14-8 6-28t-4-30" fill="none" stroke="#2f5a3a" stroke-width="3" stroke-dasharray="3 8" stroke-linecap="round"/><path d="M84 40q4-12 18-12 10 0 10 8-6 6-16 6z" fill="${C.jade}" stroke="${C.dark}" stroke-width="1.2"/><circle cx="104" cy="34" r="2" fill="${C.gold}"/><path d="M112 38l8 2-8 2" stroke="${C.red}" stroke-width="2" fill="none"/>`,
  golem: () => `<ellipse cx="58" cy="132" rx="34" ry="5" fill="#000" opacity="0.25"/><path d="M34 50h52v54H34z" fill="#8a8f94" stroke="${C.dark}" stroke-width="1.6"/><path d="M42 24h36v28H42z" fill="#9aa0a6" stroke="${C.dark}" stroke-width="1.6"/><path d="M38 104h18v26H38zM64 104h18v26H64z" fill="#7a8085" stroke="${C.dark}" stroke-width="1.6"/><path d="M86 58h22v36H86z" fill="#8a8f94" stroke="${C.dark}" stroke-width="1.6"/><path d="M20 58h14v32H20z" fill="#8a8f94" stroke="${C.dark}" stroke-width="1.6"/><rect x="48" y="34" width="8" height="4" fill="${C.gold}"/><rect x="62" y="34" width="8" height="4" fill="${C.gold}"/><path d="M48 70l10 6-8 12M70 60l8 14" stroke="${C.jade}" stroke-width="2" fill="none"/>`,
  dragao: () => `<ellipse cx="58" cy="132" rx="40" ry="5" fill="#000" opacity="0.2"/><path d="M8 118q20-22 44-8t38-12q12-12 0-34t12-34" fill="none" stroke="#3d7ea8" stroke-width="16" stroke-linecap="round"/><path d="M60 70l-20-34 24 14zM74 64l10-32 12 24z" fill="#5fa3c9" stroke="${C.dark}" stroke-width="1.2"/><path d="M90 22q6-12 20-10l8 8-8 12z" fill="#3d7ea8" stroke="${C.dark}" stroke-width="1.2"/><path d="M96 14l-4-10M104 12l2-10" stroke="${C.gold}" stroke-width="2.4"/><circle cx="106" cy="20" r="2.2" fill="${C.gold}"/><path d="M118 24q-8 6-6 12" stroke="${C.fire}" stroke-width="3" fill="none"/>`,
  raio: () => `<path d="M16 54q-8 0-8-12 0-12 16-12 4-14 20-14 12 0 18 10 18-2 22 12 12 2 12 12 0 12-14 14H24q-8 0-8-10z" fill="#4a4f78" stroke="#2a2d4a" stroke-width="2" transform="translate(0 -8)"/><path d="M62 46l-12 30h14l-12 34 28-40H64l12-24z" fill="${C.gold}" stroke="#fff" stroke-width="1.5"/><path d="M26 56l-8 20h8l-6 18" stroke="${C.blue}" stroke-width="3" fill="none"/><path d="M96 54l-6 18h8l-4 16" stroke="${C.blue}" stroke-width="3" fill="none"/>`,
};

export function foeFighter(id: string): string {
  return (FOE_FIGHT[id] ?? FOE_FIGHT.cultivador)();
}

/** Oponentes humanos (cada estilo desenha a partir destes dados) e criaturas (desenho próprio por estilo). */
export const FOE_HUMAN: Record<string, Human> = {
  bandido: { robe: '#6b5a3a', trim: '#a8451f', weapon: 'cutelo', mask: true, hair: '#2a1d14' },
  assassino: { robe: '#1f2128', trim: '#5a5f6b', weapon: 'adaga', hood: true, mask: true, wcol: '#4fae7a' },
  cultivador: { robe: '#9b2f2f', trim: '#f1d9a0', weapon: 'espada', wcol: '#c8362f', hair: '#17120e' },
  monge: { robe: '#d79a2b', trim: '#8a3b1d', weapon: 'cajado', bald: true, wcol: '#d2a95c' },
  demonio: { robe: '#3a1020', trim: '#c8362f', weapon: 'garra', wcol: '#8f1f2b', horns: true, eye: '#c8362f', skin: '#a86a5a' },
};
export const FOE_CREATURES = ['espectro', 'lobo', 'tigre', 'serpente', 'golem', 'dragao', 'raio'] as const;
