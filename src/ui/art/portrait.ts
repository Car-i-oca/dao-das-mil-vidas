import type { State } from '../../types';
import { C, hash, svg } from './core';

/* =====================================================================
 * Retratos (busto 96x96). O do jogador muda com idade aparente, trilha, reino e itens;
 * os de NPCs seguem o papel (mentor, rival...) e o nome (cor e traços sorteados pelo hash).
 * ===================================================================== */

export type Role = 'jogador' | 'mentor' | 'rival' | 'amigo' | 'noivo' | 'discipulo' | 'inimigo';

export interface Look {
  seed: string;
  /** 0 criança, 1 jovem, 2 adulto, 3 maduro, 4 ancião (idade aparente). */
  stage: number;
  path: string;
  tier: number;
  corr: number;
  role: Role;
  items: string[];
}

const ROBE: Record<string, [string, string]> = {
  sopro: ['#5f7fa6', '#e8e2d0'], espada: ['#2f3a45', '#c9ced3'], alquimia: ['#a8742f', '#efe0b0'], corpo: ['#a43b2c', '#2a2018'],
  alma: ['#6d56a3', '#e9defa'], formacoes: ['#3f7a5e', '#e6f0d8'], budista: ['#d79a2b', '#8a3b1d'], venenos: ['#2f5a3a', '#b8d06a'],
  bestas: ['#9b5a2c', '#e3c28a'], demoniaca: ['#4a1620', '#c8362f'], '': ['#6f6455', '#d8cdb5'],
};

const ROLE_ROBE: Record<Role, [string, string]> = {
  jogador: ['#6f6455', '#d8cdb5'], mentor: ['#4d6d63', '#ece3c8'], rival: ['#9b2f2f', '#f1d9a0'], amigo: ['#7a8f5a', '#efe6c8'],
  noivo: ['#b0577a', '#f7e4ea'], discipulo: ['#5d7fa3', '#fafafa'], inimigo: ['#2a2230', '#7a1f2b'],
};

/** Idade aparente: cultivadores envelhecem mais devagar quanto mais alto o reino. */
export function stageFor(age: number, tier: number): number {
  const apparent = age <= 40 ? age : 40 + (age - 40) / (1 + tier * 1.4);
  return apparent < 13 ? 0 : apparent < 28 ? 1 : apparent < 50 ? 2 : apparent < 72 ? 3 : 4;
}

export function lookFromState(s: State): Look {
  return { seed: s.name, stage: stageFor(s.age, s.tier), path: s.path, tier: s.tier, corr: s.corr, role: 'jogador', items: s.items };
}

export function lookForNpc(role: Role, name: string, tier = 2): Look {
  const stage = role === 'mentor' ? 4 : role === 'rival' || role === 'discipulo' ? 1 : role === 'inimigo' ? 3 : 2;
  return { seed: name, stage, path: '', tier, corr: role === 'inimigo' ? 40 : 0, role, items: [] };
}

function shade(hex: string, amt: number): string {
  if (!hex.startsWith('#')) return hex;
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt)));
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => f(v).toString(16).padStart(2, '0')).join('')}`;
}

export function portraitSvg(look: Look, size = 96): string {

  const h = hash(look.seed);
  const skin = C.skin[h % C.skin.length];
  const [robe, trim] = look.role === 'jogador' ? (ROBE[look.path] ?? ROBE['']) : ROLE_ROBE[look.role];
  const child = look.stage === 0, elder = look.stage >= 4, old = look.stage >= 3;
  const hairBase = C.hair[(h >> 3) % C.hair.length];
  const hair = elder ? '#e9e6e0' : old ? '#8d8a86' : hairBase;
  const bald = look.path === 'budista' && look.role === 'jogador';
  const long = (h >> 5) % 2 === 0 || look.role === 'noivo';
  const aura = [C.muted, C.steel, C.jade, C.gold, C.blue, C.violet, '#d98aa3', C.fire, C.gold][Math.min(8, look.tier)];
  const headR = child ? 21 : 18;
  const cy = child ? 50 : 46;
  let o = '';

  // fundo e aura
  o += `<defs><radialGradient id="au${h % 999}" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="${aura}" stop-opacity="${0.12 + Math.min(0.4, look.tier * 0.05)}"/><stop offset="1" stop-color="${aura}" stop-opacity="0"/></radialGradient></defs>`;
  o += `<rect width="96" height="96" rx="16" fill="${C.bg2}"/><circle cx="48" cy="46" r="46" fill="url(#au${h % 999})"/>`;
  const rings = Math.min(4, Math.floor(look.tier / 2));
  for (let i = 0; i < rings; i++) o += `<circle cx="48" cy="46" r="${34 + i * 5}" fill="none" stroke="${aura}" stroke-width="1" opacity="${0.5 - i * 0.1}"/>`;
  if (look.tier >= 6) o += `<circle cx="48" cy="38" r="26" fill="none" stroke="${C.gold}" stroke-width="2" opacity="0.75"/>`;

  // capa (item de manto)
  if (look.items.some((i) => i.includes('manto'))) o += `<path d="M14 96q0-30 18-36h32q18 6 18 36z" fill="${shade(robe, -35)}"/>`;

  // cabelo de trás
  if (!bald && long) o += `<path d="M${48 - headR - 3} ${cy - 4}q-3 34 6 44h${2 * headR - 6}q9-10 6-44z" fill="${hair}"/>`;

  // ombros e roupa
  o += `<path d="M10 96q0-26 20-32l18 12 18-12q20 6 20 32z" fill="${robe}"/>`;
  o += `<path d="M30 64l18 14 18-14" fill="none" stroke="${trim}" stroke-width="3.4" stroke-linejoin="round"/>`;
  o += `<path d="M48 78v18" stroke="${trim}" stroke-width="2" opacity="0.6"/>`;

  // pescoço e cabeça
  o += `<rect x="42" y="${cy + 12}" width="12" height="16" rx="4" fill="${shade(skin, -18)}"/>`;
  o += `<ellipse cx="${48 - headR + 1}" cy="${cy + 2}" rx="3.4" ry="5" fill="${skin}"/><ellipse cx="${48 + headR - 1}" cy="${cy + 2}" rx="3.4" ry="5" fill="${skin}"/>`;
  o += `<ellipse cx="48" cy="${cy}" rx="${headR}" ry="${headR + (child ? 0 : 3)}" fill="${skin}"/>`;

  // cabelo da frente
  if (bald) {
    for (let i = 0; i < 3; i++) o += `<circle cx="${44 + i * 4}" cy="${cy - headR - 1}" r="1.1" fill="${C.dark}" opacity="0.45"/>`;
  } else {
    o += `<path d="M${48 - headR - 1} ${cy - 2}q0-${headR + 6} ${headR + 1}-${headR + 6}t${headR + 1} ${headR + 6}q-6-8-${headR + 1}-9t-${headR + 1} 9z" fill="${hair}"/>`;
    if (!long || look.role === 'rival') o += `<circle cx="48" cy="${cy - headR - 7}" r="6" fill="${hair}"/><rect x="45" y="${cy - headR - 4}" width="6" height="3" rx="1.4" fill="${C.gold}"/>`;
  }

  // rosto
  const eyeCol = look.corr >= 40 || look.tier >= 5 ? (look.corr >= 40 ? C.red : C.gold) : C.dark;
  const ey = cy - 1;
  const gap = child ? 8 : 7.4;
  const ew = child ? 3.4 : 2.8;
  o += `<ellipse cx="${48 - gap}" cy="${ey}" rx="${ew}" ry="${child ? 3.2 : 2}" fill="${eyeCol}"/><ellipse cx="${48 + gap}" cy="${ey}" rx="${ew}" ry="${child ? 3.2 : 2}" fill="${eyeCol}"/>`;
  if (look.tier >= 5 || look.corr >= 40) o += `<circle cx="${48 - gap}" cy="${ey}" r="5" fill="${eyeCol}" opacity="0.25"/><circle cx="${48 + gap}" cy="${ey}" r="5" fill="${eyeCol}" opacity="0.25"/>`;
  const sharp = look.role === 'rival' || look.role === 'inimigo' || look.path === 'espada' || look.path === 'demoniaca';
  const bw = elder ? 1.8 : 2.2;
  o += `<path d="M${48 - gap - 4} ${ey - 5 - (sharp ? 0 : 1)}l${sharp ? 8 : 8} ${sharp ? 2.5 : -1}M${48 + gap + 4} ${ey - 5 - (sharp ? 0 : 1)}l-${sharp ? 8 : 8} ${sharp ? 2.5 : -1}" stroke="${elder ? '#d8d4cc' : hairBase}" stroke-width="${bw}" stroke-linecap="round"/>`;
  o += `<path d="M48 ${ey + 3}l-1.6 6h3.2" fill="none" stroke="${shade(skin, -45)}" stroke-width="1.2" stroke-linecap="round"/>`;
  const smile = look.role === 'amigo' || look.role === 'noivo' || child;
  o += `<path d="M${43} ${cy + 12}q5 ${smile ? 4 : 1} 10 0" fill="none" stroke="${shade(skin, -70)}" stroke-width="1.6" stroke-linecap="round"/>`;
  if (look.stage >= 3) o += `<path d="M${48 - gap - 5} ${ey + 5}q2 3 5 1M${48 + gap + 5} ${ey + 5}q-2 3-5 1M${48 - 10} ${cy + 8}q2 3 4 2" fill="none" stroke="${shade(skin, -55)}" stroke-width="0.9" opacity="0.7"/>`;
  if (elder && ((h >> 7) % 2 === 0 || look.role === 'mentor')) o += `<path d="M${48 - 9} ${cy + 14}q9 22 9 22q0 0 9-22q-9 6-18 0z" fill="#ece8e0"/>`;
  if (look.role === 'inimigo') o += `<path d="M${48 + 6} ${ey - 8}l7 12" stroke="${C.blood}" stroke-width="1.6" opacity="0.85"/>`;

  // acessórios por trilha (só no jogador)
  if (look.role === 'jogador') {
    switch (look.path) {
      case 'espada': o += `<path d="M76 18l-12 30" stroke="${C.steel}" stroke-width="3.4" stroke-linecap="round"/><path d="M78 14l-3 8" stroke="${C.gold}" stroke-width="4"/>`; break;
      case 'corpo': o += `<path d="M${48 - headR} ${cy - 9}q${headR} -6 ${2 * headR} 0" stroke="${C.red}" stroke-width="3.2" fill="none"/><path d="M${48 + 8} ${cy + 2}l5 6" stroke="${shade(skin, -60)}" stroke-width="1.4"/>`; break;
      case 'alma': o += `<path d="M48 ${cy - 11}l3 4-3 4-3-4z" fill="${C.violet}"/>`; break;
      case 'budista': o += Array.from({ length: 7 }, (_, i) => `<circle cx="${34 + i * 4.7}" cy="${72 + Math.sin(i / 6 * Math.PI) * 6}" r="2.2" fill="${C.gold}"/>`).join(''); break;
      case 'alquimia': o += `<path d="M70 70h10v10a5 5 0 0 1-10 0z" fill="${C.jade}" opacity="0.9"/><path d="M73 70v-4h4v4" stroke="${C.bone}" stroke-width="1.6"/>`; break;
      case 'bestas': o += `<circle cx="76" cy="62" r="7" fill="${C.fire}"/><path d="M71 57l-2-6 6 3M81 57l2-6-6 3" fill="${C.fire}"/><circle cx="74" cy="61" r="1" fill="${C.dark}"/><circle cx="79" cy="61" r="1" fill="${C.dark}"/>`; break;
      case 'demoniaca': o += `<path d="M48 ${cy - 11}c-3 3-3 6 0 9 3-3 3-6 0-9z" fill="${C.blood}"/>`; break;
      case 'formacoes': o += `<path d="M${48 + 11} ${cy - headR - 2}l6 8" stroke="${C.jade}" stroke-width="2.6" stroke-linecap="round"/>`; break;
      case 'venenos': o += `<rect x="${48 - 11}" y="${cy + 8}" width="22" height="7" rx="3" fill="#2f5a3a" opacity="0.9"/>`; break;
      case 'sopro': o += `<path d="M20 70q14-6 26 4t30 0" stroke="${C.bone}" stroke-width="3" fill="none" opacity="0.85"/>`; break;
    }
    if (look.items.some((i) => i.includes('espada') || i.includes('lamina')) && look.path !== 'espada') o += `<path d="M76 20l-10 26" stroke="${C.steel}" stroke-width="3" stroke-linecap="round" opacity="0.9"/>`;
  }
  if (look.role === 'discipulo' || look.role === 'rival') o += `<path d="M${48 - headR} ${cy - 8}q${headR} -6 ${2 * headR} 0" stroke="${look.role === 'rival' ? C.red : C.bone}" stroke-width="3" fill="none"/>`;
  if (look.role === 'noivo') o += `<circle cx="${48 + 12}" cy="${cy - 10}" r="3.4" fill="#e58aa8"/><circle cx="${48 + 12}" cy="${cy - 10}" r="1.2" fill="${C.gold}"/>`;

  o += `<rect x="1.5" y="1.5" width="93" height="93" rx="15" fill="none" stroke="${C.line}" stroke-width="2"/>`;
  return svg(96, 96, o, 'art art-portrait', look.role).replace(/width="96" height="96"/, `width="${size}" height="${size}"`);
}

