import { hash } from '../core';
import type { Look } from '../portrait';
import { claro, escuro, mix } from '../cor';
import { OL, brilho, cel, estrela, fundo, linha, particulas, raios, svg, uid } from './base';

const PELE = ['#ffe6d2', '#f9d3ae', '#eab88c', '#cc9468', '#9d6d4b'];
const AURA = ['#9aa3b5', '#c9d6ea', '#3ddc97', '#ffc83d', '#4aa3ff', '#a974ff', '#ff7eb6', '#ff9a3c', '#fff0a0'];
const ROUPA: Record<string, [string, string]> = {
  sopro: ['#4a78c8', '#e8f1ff'], espada: ['#2d3a5c', '#c9d6ea'], alquimia: ['#c07a2c', '#ffe9b0'], corpo: ['#b73a36', '#2a1a1a'],
  alma: ['#6f4fc0', '#efe4ff'], formacoes: ['#2f9a78', '#e6fff0'], budista: ['#e0a02c', '#8a3b1d'], venenos: ['#2f6a43', '#c4e870'],
  bestas: ['#a45e2c', '#f0d09a'], demoniaca: ['#4a1428', '#e0364a'], '': ['#6f6a7a', '#e6dfd0'],
};
const ROUPA_PAPEL: Record<string, [string, string]> = {
  mentor: ['#3f7a6c', '#f0e6c8'], rival: ['#b3303a', '#ffd9a0'], amigo: ['#6f9a52', '#f4ecd0'], noivo: ['#c05882', '#ffe8f0'],
  discipulo: ['#4a78c8', '#ffffff'], inimigo: ['#2a1f3a', '#a62840'],
};
const CABELO = ['#1b1840', '#3a2430', '#4a2f2a', '#241e3a'];
const OLHO = ['#2a6fd8', '#5a2fc0', '#2a9a78', '#b8622a', '#2a3a8a'];

export function retrato(look: Look, size: number): string {
  const h = hash(look.seed), papel = look.role;
  const [robe, trim] = papel === 'jogador' ? (ROUPA[look.path] ?? ROUPA['']) : ROUPA_PAPEL[papel];
  const crianca = look.stage === 0, velho = look.stage >= 4, maduro = look.stage >= 3;
  const pele = PELE[h % PELE.length], peleSh = escuro(pele, 0.16);
  const pathHair: Record<string, string> = { espada: '#1b2347', alma: '#35205f', demoniaca: '#2a0f1e', sopro: '#1f3a5a', budista: '#000', alquimia: '#3a2a1a' };
  const base = papel === 'jogador' && pathHair[look.path] ? pathHair[look.path] : CABELO[(h >>> 3) % CABELO.length];
  const cabelo = velho ? '#e8ebf5' : maduro ? mix(base, '#9aa0b4', 0.55) : base;
  const aura = AURA[Math.min(8, look.tier)];
  const olhoCor = look.corr >= 40 ? '#ff2a4a' : look.tier >= 5 ? '#ffd23a' : OLHO[(h >>> 6) % OLHO.length];
  const careca = look.path === 'budista' && papel === 'jogador';
  const estilo = papel === 'noivo' ? 'longo' : ((h >>> 5) % 3 === 0 ? 'coque' : (h >>> 5) % 3 === 1 ? 'longo' : 'rabo');
  const afiado = papel === 'rival' || papel === 'inimigo' || look.path === 'espada' || look.path === 'demoniaca';
  const sorri = papel === 'amigo' || papel === 'noivo' || crianca;
  const cx = 60, id = uid('p');
  let o = fundo(id, 120, 120, aura, 18, 0.45, 0.5, 0.42);

  // círculo mágico atrás do busto: mais anéis e runas a cada reino
  const aneis = Math.min(4, 1 + Math.floor(look.tier / 2));
  for (let i = 0; i < aneis; i++) o += `<circle cx="60" cy="52" r="${40 + i * 6}" fill="none" stroke="${aura}" stroke-width="${i === 0 ? 1.4 : 0.8}" opacity="${0.75 - i * 0.15}" ${i % 2 ? 'stroke-dasharray="3 3"' : ''}/>`;
  if (look.tier >= 2) o += raios(60, 52, 36, 42, 24, aura, 0.7, 1.2);
  if (look.tier >= 4) o += `<path d="M60 8l32 18v36L60 80 28 62V26z" fill="none" stroke="${aura}" stroke-width="0.9" opacity=".5"/>`;
  if (look.tier >= 6) o += `<circle cx="60" cy="40" r="30" fill="none" stroke="#ffc83d" stroke-width="2.2" opacity=".8"/><circle cx="60" cy="40" r="30" fill="none" stroke="#ffc83d" stroke-width="6" opacity=".18" filter="url(#mwg2)"/>`;
  if (look.tier >= 8) o += raios(60, 40, 32, 56, 20, '#fff6b0', 0.4, 1.8);
  o += particulas(h, 120, 120, 8 + look.tier, claro(aura, 0.6));

  // manto de fundo
  if (look.items.some((i) => i.includes('manto'))) o += cel('M2 120C2 92 20 78 40 76h40c20 2 38 16 38 44z', escuro(robe, 0.35), { w: 2.4 });

  // cabelo de trás
  if (!careca && estilo !== 'coque' && !velho || (!careca && velho && estilo === 'longo')) {
    o += cel('M31 48C26 74 30 100 38 116H82C90 100 94 74 89 48C87 24 74 12 60 12S33 24 31 48Z', escuro(cabelo, 0.12), { w: 2.4, off: 2 });
    o += `<path d="M36 60C34 80 38 98 42 110M84 60C86 80 82 98 78 110" stroke="${claro(cabelo, 0.35)}" stroke-width="1.4" fill="none" opacity=".7"/>`;
  } else if (!careca && estilo === 'coque') {
    o += cel('M33 50C30 40 36 24 60 22 84 24 90 40 87 50 82 44 70 40 60 42S38 44 33 50Z', escuro(cabelo, 0.12), { w: 2.2 });
  }

  // ombros e roupa
  o += cel('M4 120C6 96 22 86 42 83L60 102 78 83C98 86 114 96 116 120Z', robe, { w: 2.6, off: 4 });
  o += `<path d="M42 83L60 108 78 83" fill="none" stroke="${OL}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/><path d="M42 83L60 108 78 83" fill="none" stroke="${trim}" stroke-width="5.4" stroke-linejoin="round" stroke-linecap="round"/>`;
  o += `<path d="M50 80L60 96 70 80z" fill="${mix(trim, '#fff', 0.3)}" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/>`;
  o += `<path d="M60 108V120" stroke="${OL}" stroke-width="2.4"/><path d="M14 104q4-6 10-5M104 104q-4-6-10-5M20 112q3-4 8-3M100 112q-3-4-8-3" stroke="${trim}" stroke-width="1.8" fill="none" opacity=".75" stroke-linecap="round"/>`;
  o += `<path d="M10 112C14 98 26 92 40 90" stroke="${claro(robe, 0.45)}" stroke-width="1.6" fill="none" opacity=".8"/>`;

  // pescoço
  o += `<path d="M51 74V90Q60 99 69 90V74z" fill="${peleSh}" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><path d="M51 86Q60 94 69 86v4Q60 99 51 90z" fill="${escuro(pele, 0.32)}" opacity=".6"/>`;

  // cabeça
  const queixo = crianca ? 80 : velho ? 87 : 86, larg = crianca ? 27 : 25, jw = afiado ? 17 : 21;
  const cabeca = `M${cx - larg} 50C${cx - larg} 28 ${cx - 12} 19 ${cx} 19S${cx + larg} 28 ${cx + larg} 50C${cx + larg} 64 ${cx + jw - 4} 76 ${cx + 8} ${queixo - 4}Q${cx} ${queixo + 2} ${cx - 8} ${queixo - 4}C${cx - jw + 4} 76 ${cx - larg} 64 ${cx - larg} 50Z`;
  o += cel(cabeca, pele, { w: 2.4, off: 3.4, sh: peleSh });
  o += `<ellipse cx="45" cy="64" rx="6" ry="3.2" fill="#ff7a8a" opacity="${sorri ? 0.32 : 0.16}" filter="url(#mwg2)"/><ellipse cx="75" cy="64" rx="6" ry="3.2" fill="#ff7a8a" opacity="${sorri ? 0.32 : 0.16}" filter="url(#mwg2)"/>`;

  // olhos
  const olho = (lado: 1 | -1) => {
    const ex = 60 + lado * 13, cid = uid('e'), g = uid('i');
    const s = lado;
    const amend = `M${ex - s * 9} ${54}Q${ex - s * 1} ${46} ${ex + s * 9} ${51.5}Q${ex + s * 0.5} ${57.5} ${ex - s * 9} ${54}Z`;
    const iris = crianca ? 5.6 : 4.8;
    return `<defs><clipPath id="${cid}"><path d="${amend}"/></clipPath><radialGradient id="${g}" cx="0.5" cy="0.35" r="0.7"><stop offset="0" stop-color="${claro(olhoCor, 0.5)}"/><stop offset="0.6" stop-color="${olhoCor}"/><stop offset="1" stop-color="${escuro(olhoCor, 0.5)}"/></radialGradient></defs>`
      + `<path d="${amend}" fill="#f8f6ff"/><g clip-path="url(#${cid})"><circle cx="${ex + s * 0.5}" cy="${51.6}" r="${iris}" fill="url(#${g})"/><circle cx="${ex + s * 0.5}" cy="${51.6}" r="${iris * 0.46}" fill="${OL}"/><path d="M${ex - 9} 46h18v3q-9 0-18 0z" fill="#000" opacity=".22"/></g>`
      + `<circle cx="${ex - s * 1.6}" cy="${49.6}" r="1.7" fill="#fff"/><circle cx="${ex + s * 2.6}" cy="${53.4}" r="0.9" fill="#fff" opacity=".9"/>`
      + `<path d="M${ex - s * 10} ${54.4}Q${ex - s * 1} ${44.8} ${ex + s * 10} ${51.4}" fill="none" stroke="${OL}" stroke-width="${velho ? 1.8 : 2.4}" stroke-linecap="round"/>`
      + `<path d="M${ex + s * 8.4} ${50.4}l${s * 3} -2.2" stroke="${OL}" stroke-width="1.6" stroke-linecap="round"/>`
      + (velho ? '' : `<path d="M${ex - s * 6} ${56.4}Q${ex} ${58} ${ex + s * 6} ${55.6}" stroke="${OL}" stroke-width="0.9" fill="none" opacity=".55"/>`)
      + (look.corr >= 40 || look.tier >= 5 ? `<circle cx="${ex + s * 0.5}" cy="51.6" r="9" fill="${olhoCor}" opacity=".35" filter="url(#mwg2)"/>` : '');
  };
  o += olho(1) + olho(-1);

  // sobrancelhas
  const sobr = velho ? '#e6e9f4' : escuro(cabelo, 0.05);
  const tilt = afiado ? 3.4 : sorri ? -0.6 : 1.2, bw = velho ? 2.6 : 2;
  o += `<path d="M${60 - 22} ${43 + tilt}Q${60 - 13} ${40 - tilt * 0.4} ${60 - 5} ${43 - tilt * 0.4}M${60 + 22} ${43 + tilt}Q${60 + 13} ${40 - tilt * 0.4} ${60 + 5} ${43 - tilt * 0.4}" stroke="${sobr}" stroke-width="${bw}" fill="none" stroke-linecap="round"/>`;
  if (velho) o += `<path d="M${60 - 24} 44q-4 6-3 12M${60 + 24} 44q4 6 3 12" stroke="${sobr}" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9"/>`;

  // nariz, boca e marcas do rosto
  o += `<path d="M60 57l-2.4 8q2.4 1.6 4.8 0" fill="none" stroke="${escuro(pele, 0.5)}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`;
  o += `<path d="M53 73q7 ${sorri ? 6 : 2.6} 14 0" fill="none" stroke="${escuro(pele, 0.62)}" stroke-width="1.9" stroke-linecap="round"/>`;
  if (sorri) o += `<path d="M54 74q7 5 12 0z" fill="#fff" opacity=".9"/><path d="M53 73q7 6 14 0" fill="none" stroke="${escuro(pele, 0.62)}" stroke-width="1.6" stroke-linecap="round"/>`;
  if (maduro) o += `<path d="M37 56q2 5 6 6M83 56q-2 5-6 6M50 63q-1 4 1 7M70 63q1 4-1 7" stroke="${escuro(pele, 0.4)}" stroke-width="1" fill="none" opacity=".8" stroke-linecap="round"/>`;
  if (velho) o += `<path d="M41 42q8-3 16 0M63 42q8-3 16 0M42 36q8-3 14 0M64 36q8-3 14 0" stroke="${escuro(pele, 0.35)}" stroke-width="1" fill="none" opacity=".7"/>`;
  if (papel === 'inimigo') o += `<path d="M70 44l8 22" stroke="#ff2a4a" stroke-width="2" stroke-linecap="round" opacity=".9"/><path d="M70 44l8 22" stroke="#fff" stroke-width="0.6" opacity=".6"/>`;
  if (look.corr >= 40) o += `<path d="M44 40q-3 8-1 14M76 40q3 8 1 14M52 28l-2 8M68 28l2 8" stroke="#7a1030" stroke-width="1.4" fill="none" opacity=".8" stroke-linecap="round"/>`;

  // barba do ancião
  if (velho && ((h >>> 7) % 2 === 0 || papel === 'mentor')) {
    o += cel(`M43 70C44 92 52 106 60 112 68 106 76 92 77 70 71 78 66 76 60 77 54 76 49 78 43 70Z`, '#eef0fa', { w: 2.2, off: 2.4, sh: '#b8bdd6' });
    o += `<path d="M52 82q2 12 8 22M68 82q-2 12-8 22M60 80v26" stroke="#b8bdd6" stroke-width="1" fill="none" opacity=".9"/>` + `<path d="M50 72q10 5 20 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".9"/>`;
  } else if (maduro) {
    o += `<path d="M50 70q10 3.4 20 0q-4 4-10 3.4-6 .6-10-3.4z" fill="${velho ? '#eef0fa' : escuro(cabelo, 0.05)}" opacity=".9"/>`;
  }

  // cabelo da frente
  if (careca) {
    o += `<path d="M42 28Q60 16 78 28" fill="none" stroke="#fff" stroke-width="2" opacity=".5" stroke-linecap="round"/>`;
    for (let i = 0; i < 6; i++) o += `<circle cx="${48 + (i % 3) * 12}" cy="${26 + Math.floor(i / 3) * 6}" r="1.4" fill="#7a4a30" opacity=".7"/>`;
  } else {
    const claroH = claro(cabelo, 0.38), rim = mix(claro(cabelo, 0.45), aura, 0.5);
    o += cel(`M33 54C29 30 42 13 60 13S91 30 87 54C85 44 80 34 72 31 68 40 56 44 46 41 41 44 36 49 33 54Z`, cabelo, { w: 2.4, off: 2.6 });
    // mechas (franja) e brilhos de cabelo
    o += `<path d="M60 13C58 26 52 36 44 42 52 36 58 28 60 13Z" fill="${claroH}" opacity=".5"/><path d="M60 13C66 24 74 32 80 38 74 30 66 24 60 13Z" fill="${claroH}" opacity=".4"/>`;
    o += `<path d="M40 24Q48 16 58 15M64 15Q74 16 80 24" stroke="${rim}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".85"/>`;
    o += `<path d="M47 41C44 48 41 54 38 60C44 54 47 48 49 41Z" fill="${cabelo}" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/><path d="M73 41C76 48 79 54 82 60C76 54 73 48 71 41Z" fill="${cabelo}" stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"/>`;
    // mechas laterais compridas emoldurando o rosto
    if (estilo === 'longo') o += cel('M33 50C28 66 30 82 36 94C37 82 40 68 44 54Z', cabelo, { w: 1.8, off: 1.6 }) + cel('M87 50C92 66 90 82 84 94C83 82 80 68 76 54Z', cabelo, { w: 1.8, off: 1.6 });
    if (estilo === 'coque') {
      o += cel('M52 21a8 8 0 1 0 16 0 8 9 0 0 0-16 0z', cabelo, { w: 2, off: 1.6 }) + cel('M52 25h16v4H52z', '#ffc83d', { w: 1.6, off: 1.2 });
    } else if (estilo === 'rabo') {
      o += cel('M78 24C96 22 104 38 98 58 94 46 88 38 80 34Z', cabelo, { w: 1.8, off: 1.6 }) + `<circle cx="80" cy="28" r="3" fill="#ff5a5f" stroke="${OL}" stroke-width="1.4"/>`;
    }
  }

  // acessórios por trilha (só no jogador)
  if (papel === 'jogador') {
    switch (look.path) {
      case 'espada': o += `<g transform="rotate(14 96 36)">${cel('M93 6l5 5-2 56h-6L91 11z', '#c9d6ea', { w: 1.8, off: 1.4 })}${cel('M88 60h16v5H88z', '#ffc83d', { w: 1.6, off: 1.2 })}</g>` + linha('M100 12q8 10 4 24', '#7ac4ff', 2, 0.8); break;
      case 'corpo': o += `<path d="M35 40Q60 28 85 40" fill="none" stroke="${OL}" stroke-width="7" stroke-linecap="round"/><path d="M35 40Q60 28 85 40" fill="none" stroke="#ff4d5e" stroke-width="4.4" stroke-linecap="round"/><path d="M84 40q8 4 12 12M84 40q10 0 14 6" stroke="#ff4d5e" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M70 48l6 8" stroke="${escuro(pele, 0.5)}" stroke-width="1.4"/>`; break;
      case 'alma': o += `<path d="M60 31l4 5-4 6-4-6z" fill="${aura}" stroke="${OL}" stroke-width="1.4" stroke-linejoin="round"/><circle cx="60" cy="36" r="8" fill="${aura}" opacity=".35" filter="url(#mwg2)"/>`; break;
      case 'budista': o += `<path d="M30 100Q60 124 90 100" fill="none" stroke="${OL}" stroke-width="5.4" stroke-dasharray="1 7.4" stroke-linecap="round"/><path d="M30 100Q60 124 90 100" fill="none" stroke="#ffc83d" stroke-width="3.6" stroke-dasharray="1 7.4" stroke-linecap="round"/><circle cx="60" cy="24" r="40" fill="none" stroke="#ffc83d" stroke-width="1.4" opacity=".6"/>`; break;
      case 'alquimia': o += cel('M92 84h12v14a6 6 0 0 1-12 0z', '#3ddc97', { w: 1.8, off: 1.4 }) + cel('M95 78h6v6h-6z', '#f0d9a8', { w: 1.4, off: 1 }) + `<path d="M98 76q-3-6 1-10" stroke="#ff9a3c" stroke-width="2.4" fill="none" stroke-linecap="round"/>`; break;
      case 'bestas': o += cel('M86 96a12 9 0 1 0 24 0 12 9 0 0 0-24 0z', '#ff9a3c', { w: 1.8, off: 1.4 }) + cel('M88 86l-3-10 9 4zM104 86l3-10-9 4z', '#ff9a3c', { w: 1.6, off: 1.2 }) + `<circle cx="93" cy="94" r="1.8" fill="${OL}"/><circle cx="103" cy="94" r="1.8" fill="${OL}"/><circle cx="93.6" cy="93.4" r=".6" fill="#fff"/>`; break;
      case 'demoniaca': o += cel('M38 24L28 4l16 10zM82 24L92 4 76 14z', '#2a0f1e', { w: 2, off: 1.4 }) + `<path d="M60 28c-3 3-3 6 0 9 3-3 3-6 0-9z" fill="#ff2a4a"/><circle cx="60" cy="40" r="40" fill="#7a1030" opacity=".16" filter="url(#mwg3)"/>`; break;
      case 'formacoes': o += `<path d="M96 16l10 6v12l-10 6-10-6V22z" fill="none" stroke="#3ddc97" stroke-width="2"/><path d="M96 16v24M86 22l20 12M106 22L86 34" stroke="#3ddc97" stroke-width="1" opacity=".8"/>` + estrela(96, 28, 3, '#fff'); break;
      case 'venenos': o += cel('M43 66h34v10q-17 6-34 0z', '#244f37', { w: 2, off: 1.6 }) + `<path d="M50 72q10 3 20 0" stroke="#c4e870" stroke-width="1.4" fill="none" opacity=".9"/><path d="M52 80q-1 6 1 9" stroke="#8aff5a" stroke-width="2.4" stroke-linecap="round" fill="none"/>`; break;
      case 'sopro': o += `<path d="M6 88q18-12 36 4t38-2 34 6" fill="none" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><path d="M6 88q18-12 36 4t38-2 34 6" fill="none" stroke="#e8f1ff" stroke-width="5" stroke-linecap="round"/><path d="M10 74q8-4 14 0M92 70q8-5 16 0" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>`; break;
    }
    if (look.items.some((i) => i.includes('espada') || i.includes('lamina')) && look.path !== 'espada') o += `<g transform="rotate(16 98 40)">${cel('M95 8l4 4-1 44h-5l-1-44z', '#c9d6ea', { w: 1.6, off: 1.2 })}</g>`;
  }
  if (papel === 'discipulo' || papel === 'rival') o += `<path d="M35 41Q60 29 85 41" fill="none" stroke="${OL}" stroke-width="6.2" stroke-linecap="round"/><path d="M35 41Q60 29 85 41" fill="none" stroke="${papel === 'rival' ? '#ff4d5e' : '#fff'}" stroke-width="3.6" stroke-linecap="round"/>`;
  if (papel === 'noivo') o += cel('M84 26a6 6 0 1 0 12 0 6 6 0 0 0-12 0z', '#ff7eb6', { w: 1.6, off: 1.2 }) + `<circle cx="90" cy="26" r="2.2" fill="#ffc83d"/>` + cel('M92 34a4 4 0 1 0 8 0 4 4 0 0 0-8 0z', '#ff9ec8', { w: 1.2, off: 1 });
  if (papel === 'mentor') o += `<path d="M20 108l-4 12M100 108l4 12" stroke="#fff" stroke-width="1.6" opacity=".4"/>`;

  // luz de contorno e vinheta
  o += `<path d="M35 48C35 32 44 21 57 19" fill="none" stroke="${claro(aura, 0.4)}" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>`;
  o += `<defs><radialGradient id="${id}v" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#05030f" stop-opacity="0.65"/></radialGradient></defs><rect x="1.5" y="1.5" width="117" height="117" rx="18" fill="url(#${id}v)"/>`;
  o = `<defs><clipPath id="${id}c"><rect x="1.5" y="1.5" width="117" height="117" rx="18"/></clipPath></defs><g clip-path="url(#${id}c)">${o}</g>`;
  o += `<rect x="1.8" y="1.8" width="116.4" height="116.4" rx="18" fill="none" stroke="${OL}" stroke-width="3"/><rect x="3.2" y="3.2" width="113.6" height="113.6" rx="16.6" fill="none" stroke="${aura}" stroke-width="1.6" opacity=".9"/>`;
  return svg(120, 120, o, 'art art-portrait', papel, size);
}
