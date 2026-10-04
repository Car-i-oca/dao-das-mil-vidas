import { hash } from '../core';
import type { Look } from '../portrait';
import { escuro, mix } from '../cor';
import { K, Surf, imagemSvg, png } from './surf';

const PELE = ['#f6d9bd', '#efc79e', '#d9a87c', '#b8845a', '#8a5e40'];
const ROUPA: Record<string, [string, string]> = {
  sopro: ['#4a78c8', '#e8f1ff'], espada: ['#2d3a5c', '#c9d6ea'], alquimia: ['#c07a2c', '#ffe9b0'], corpo: ['#b73a36', '#2a1a1a'],
  alma: ['#6f4fc0', '#efe4ff'], formacoes: ['#2f9a78', '#e6fff0'], budista: ['#e0a02c', '#8a3b1d'], venenos: ['#2f6a43', '#c4e870'],
  bestas: ['#a45e2c', '#f0d09a'], demoniaca: ['#4a1428', '#e0364a'], '': ['#6f6a7a', '#e6dfd0'],
};
const ROUPA_PAPEL: Record<string, [string, string]> = {
  mentor: ['#3f7a6c', '#f0e6c8'], rival: ['#b3303a', '#ffd9a0'], amigo: ['#6f9a52', '#f4ecd0'], noivo: ['#c05882', '#ffe8f0'],
  discipulo: ['#4a78c8', '#ffffff'], inimigo: ['#2a1f3a', '#a62840'],
};
const AURA = ['#9aa3ad', '#c9d3dc', '#4fcf8a', '#ffd35a', '#5aa0e8', '#a07be0', '#f08fb4', '#f08a3c', '#fff0a0'];
const CABELO = ['#1b1840', '#3a2430', '#4a2f2a', '#241e3a'];
const OLHO = ['#2a6fd8', '#5a2fc0', '#2a9a78', '#b8622a'];
const W = '#fff7e6';

function desenha(look: Look): Surf {
  const h = hash(look.seed), papel = look.role;
  const [robe, trim] = papel === 'jogador' ? (ROUPA[look.path] ?? ROUPA['']) : ROUPA_PAPEL[papel];
  const crianca = look.stage === 0, velho = look.stage >= 4, maduro = look.stage >= 3;
  const pele = PELE[h % PELE.length], peleSh = escuro(pele, 0.2);
  const pathHair: Record<string, string> = { espada: '#1b2347', alma: '#35205f', demoniaca: '#2a0f1e', sopro: '#1f3a5a', alquimia: '#3a2a1a' };
  const base = papel === 'jogador' && pathHair[look.path] ? pathHair[look.path] : CABELO[(h >>> 3) % CABELO.length];
  const cabelo = velho ? '#e8ebf5' : maduro ? mix(base, '#9aa0b4', 0.55) : base;
  const aura = AURA[Math.min(8, look.tier)];
  const olho = look.corr >= 40 ? '#ff2a4a' : look.tier >= 5 ? '#ffd23a' : OLHO[(h >>> 6) % OLHO.length];
  const careca = look.path === 'budista' && papel === 'jogador';
  const longo = papel === 'noivo' || (h >>> 5) % 2 === 0;
  const afiado = papel === 'rival' || papel === 'inimigo' || look.path === 'espada' || look.path === 'demoniaca';
  const sorri = papel === 'amigo' || papel === 'noivo' || crianca;

  const s = new Surf(48, 48);
  s.gradiente(1, 1, 46, 46, [escuro(aura, 0.72), '#120d2c', '#07051a']);
  s.halo(24, 22, 22, aura, 0.7);
  const aneis = Math.min(4, 1 + Math.floor(look.tier / 2));
  for (let i = 0; i < aneis; i++) for (let a = 0; a < 6.3; a += 0.05) s.set(24 + Math.cos(a) * (19 + i * 3), 22 + Math.sin(a) * (19 + i * 3), i % 2 ? escuro(aura, 0.4) : aura);
  if (look.tier >= 6) for (let a = 0; a < 6.3; a += 0.05) { s.set(24 + Math.cos(a) * 15, 14 + Math.sin(a) * 15, '#ffd35a'); }

  const p = new Surf(48, 48); // personagem
  if (look.items.some((i) => i.includes('manto'))) p.poli([[2, 48], [4, 38], [12, 33], [36, 33], [44, 38], [46, 48]], escuro(robe, 0.4));
  if (!careca && longo) p.poli([[10, 20], [10, 13], [16, 6], [32, 6], [38, 13], [38, 20], [40, 40], [36, 46], [12, 46], [8, 40]], escuro(cabelo, 0.12));
  p.poli([[3, 48], [4, 41], [11, 36], [19, 34], [24, 41], [29, 34], [37, 36], [44, 41], [45, 48]], robe);
  p.trago(11, 36, 24, 45, trim, 2); p.trago(37, 36, 24, 45, trim, 2); p.linha(24, 45, 24, 47, trim);
  p.rect(21, 30, 6, 7, peleSh);
  const larg = crianca ? 11.5 : 10.4;
  p.elipse(24, 21, larg, crianca ? 12 : 13, pele, true);
  for (let y = 8; y < 36; y++) for (let x = 29; x < 36; x++) if (p.get(x, y) === pele && (x > 31 || (x + y) % 2 === 0) && !(x === 29 && y % 3)) p.set(x, y, peleSh);
  if (afiado) { p.set(15, 30, null); p.set(33, 30, null); }
  // cabelo da frente
  if (careca) { pts(p, [[21, 7], [24, 6], [27, 7]], '#fff7e6'); pts(p, [[21, 9], [24, 9], [27, 9]], '#7a4a30'); }
  else {
    p.poli([[13, 22], [13, 14], [17, 8], [24, 6], [31, 8], [35, 14], [35, 22], [33, 16], [29, 13], [24, 14], [19, 13], [15, 17]], cabelo);
    p.poli([[13, 22], [12, 30], [14, 29], [15, 22]], cabelo); p.poli([[35, 22], [36, 30], [34, 29], [33, 22]], cabelo);
    p.linha(18, 9, 24, 7, mix(cabelo, '#ffffff', 0.4));
    if (!longo) { p.elipse(24, 5, 3.4, 3, cabelo); p.rect(22, 8, 5, 1, '#ffd35a'); }
  }
  // olhos
  const ey = crianca ? 23 : 22;
  for (const sx of [-1, 1]) {
    const x = 24 + sx * 5.5;
    p.rect(x - 1.5, ey, 3, 2, '#f8f6ff'); p.rect(x - 1, ey, 2, 2, olho); p.set(x - 0.5, ey, W);
    p.linha(x - 2.5, ey - 1, x + 1.5, ey - 1, K); if (!velho) p.set(x + sx * 2, ey, K);
    p.linha(x - 2.5, ey - 4 + (afiado ? (sx > 0 ? 1 : 0) : 0), x + 1.5, ey - 4 + (afiado ? (sx > 0 ? 0 : 1) : 0), velho ? '#d8dce8' : escuro(cabelo, 0.1));
    if (look.corr >= 40 || look.tier >= 5) s.halo(x, ey, 4, olho, 0.35);
  }
  p.set(24, 26, escuro(pele, 0.45)); p.set(24, 27, escuro(pele, 0.3));
  p.linha(22, 30, 26, 30, sorri ? '#a04a4a' : escuro(pele, 0.5)); if (sorri) { p.set(21, 29, '#a04a4a'); p.set(27, 29, '#a04a4a'); }
  if (sorri) { p.set(18, 27, '#ff9a9a'); p.set(30, 27, '#ff9a9a'); }
  if (maduro) { pts(p, [[17, 26], [18, 27], [31, 26], [30, 27]], escuro(pele, 0.3)); }
  if (velho && ((h >>> 7) % 2 === 0 || papel === 'mentor')) p.poli([[17, 30], [19, 40], [24, 47], [29, 40], [31, 30], [27, 33], [21, 33]], '#eef0fa');
  else if (maduro) p.linha(21, 29, 27, 29, velho ? '#eef0fa' : escuro(cabelo, 0.1));
  if (look.corr >= 40) { pts(p, [[16, 24], [15, 26], [32, 24], [33, 26]], '#a0102a'); }
  if (papel === 'inimigo') p.linha(29, 18, 32, 27, '#ff2a4a');

  // acessórios por trilha (só jogador)
  if (papel === 'jogador') {
    switch (look.path) {
      case 'espada': p.trago(41, 4, 37, 28, '#dfe8f4', 2); p.rect(36, 27, 5, 2, '#ffd35a'); break;
      case 'corpo': p.rect(12, 15, 24, 3, '#ff4d5e'); p.rect(35, 16, 5, 2, '#ff4d5e'); p.rect(34, 18, 4, 2, '#ff4d5e'); break;
      case 'alma': p.rect(23, 12, 2, 3, aura); p.set(24, 11, aura); break;
      case 'budista': for (let i = 0; i < 9; i++) p.set(10 + i * 3.5, 40 + Math.round(Math.sin((i / 8) * Math.PI) * 5), '#ffd35a'); break;
      case 'alquimia': p.elipse(40, 40, 3, 4, '#4fcf8a'); p.rect(39, 35, 2, 2, '#e8dcc0'); break;
      case 'bestas': p.elipse(40, 41, 5, 4, '#ff9a3c'); pts(p, [[36, 37], [37, 36], [44, 37], [43, 36]], '#ff9a3c'); pts(p, [[38, 41], [42, 41]], K); break;
      case 'demoniaca': p.trago(14, 12, 10, 3, '#2a0f1e', 2); p.trago(34, 12, 38, 3, '#2a0f1e', 2); p.set(24, 13, '#ff2a4a'); break;
      case 'formacoes': p.poli([[40, 8], [44, 10], [44, 15], [40, 17], [36, 15], [36, 10]], '#3ddc97'); break;
      case 'venenos': p.rect(16, 27, 16, 5, '#244f37'); p.set(20, 33, '#8aff5a'); break;
      case 'sopro': p.linha(3, 38, 14, 36, W); p.linha(14, 36, 24, 40, W); p.linha(24, 40, 36, 37, W); p.linha(36, 37, 46, 40, W); break;
    }
  }
  if (papel === 'discipulo') p.rect(12, 15, 24, 2, W);
  if (papel === 'rival') p.rect(12, 15, 24, 2, '#ff4d5e');
  if (papel === 'noivo') { p.elipse(38, 12, 3, 3, '#ff7eb6'); p.set(38, 12, '#ffd35a'); }
  p.contorno();
  s.colar(p, 0, 0);
  // moldura
  const gc = aura;
  for (let x = 2; x < 46; x++) { s.set(x, 0, K); s.set(x, 47, K); s.set(x, 1, gc); s.set(x, 46, gc); }
  for (let y = 2; y < 46; y++) { s.set(0, y, K); s.set(47, y, K); s.set(1, y, gc); s.set(46, y, gc); }
  for (const [x, y] of [[1, 1], [46, 1], [1, 46], [46, 46]]) s.set(x, y, K);
  for (const [x, y] of [[0, 0], [1, 0], [0, 1], [47, 0], [46, 0], [47, 1], [0, 47], [1, 47], [0, 46], [47, 47], [46, 47], [47, 46]]) s.set(x, y, null);
  return s;
}
const pts = (s: Surf, l: [number, number][], c: string) => l.forEach(([x, y]) => s.set(x, y, c));

export function retrato(look: Look, size: number): string {
  const chave = `ret|${look.seed}|${look.stage}|${look.path}|${look.tier}|${look.corr >= 40 ? 1 : 0}|${look.role}|${look.items.some((i) => i.includes('manto')) ? 1 : 0}|${look.items.some((i) => i.includes('espada') || i.includes('lamina')) ? 1 : 0}`;
  return imagemSvg(png(chave, () => desenha(look)), 48, 48, 'art art-portrait', look.role, size);
}
