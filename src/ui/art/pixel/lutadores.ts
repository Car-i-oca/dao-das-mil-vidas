import { hash } from '../core';
import { FOE_CREATURES, FOE_HUMAN, PATH_FIGHT, type Human, type Weapon } from '../lutadores';
import { escuro, mix } from '../cor';
import { K, Surf, imagemMiolo, png } from './surf';

const PELE = '#f0cfa8', AM = '#ffd35a', PR = '#dfe8f4', VM = '#d94a3d', MR = '#8a5a3a';
const AURA = ['#9aa3ad', '#c9d3dc', '#4fcf8a', '#ffd35a', '#5aa0e8', '#a07be0', '#f08fb4', '#f08a3c', '#fff0a0'];
const W = '#fff7e6';

/* Sprites de 60x70 (ampliados 2x no quadro 120x140), virados para a direita, pés em y=65. */
function arma(s: Surf, w: Weapon, c: string) {
  switch (w) {
    case 'espada': s.trago(46, 41, 59, 20, PR, 2); s.trago(45, 41, 58, 20, W, 1); s.trago(42, 40, 49, 46, AM, 2); s.trago(43, 44, 40, 48, VM, 2); break;
    case 'cutelo': s.poli([[46, 40], [58, 28], [61, 32], [53, 43]], '#b8c4d4'); s.trago(44, 43, 49, 38, MR, 2); break;
    case 'adaga': s.trago(46, 41, 57, 34, PR, 2); s.trago(43, 43, 46, 41, c, 2); break;
    case 'cajado': s.trago(48, 11, 48, 66, MR, 2); s.elipse(48, 9, 3.4, 3.4, c); break;
    case 'orbe': s.halo(51, 35, 11, c, 0.6); s.elipse(51, 35, 5.5, 5.5, c); s.set(49, 33, W); break;
    case 'talisma': s.ret(47, 26, 8, 16, '#ffd75e'); s.rect(49, 29, 4, 1, VM); s.rect(50, 31, 2, 6, VM); break;
    case 'dardo': s.trago(45, 41, 58, 37, c, 2); s.poli([[58, 36], [61, 35], [59, 39]], K); break;
    case 'frasco': s.elipse(50, 37, 4, 4, c); s.rect(49, 31, 3, 3, '#efe9d0'); break;
    case 'garra': for (const [dy, ex] of [[-4, 56], [0, 58], [4, 56]] as const) s.trago(46, 41 + dy, ex, 36 + dy - 4, c, 1); s.halo(53, 37, 8, c, 0.4); break;
    case 'contas': for (let a = 0.2; a < 3; a += 0.4) s.set(47 + Math.cos(a) * 6, 43 + Math.sin(a) * 5, AM); s.elipse(52, 38, 2, 2, AM); break;
    case 'punho': s.elipse(51, 39, 4.4, 4.4, c === '#fff' ? PELE : '#b84a3a'); s.elipse(51, 39, 3, 3, PELE); break;
  }
}

function humano(h: Human, aura?: string): Surf {
  const s = new Surf(60, 70);
  const pele = h.skin ?? PELE, cabelo = h.hair ?? '#1b1840';
  s.elipse(29, 67, 15, 2.4, 'rgba(0,0,0,0.25)', true);
  if (aura) s.halo(29, 66, 16, aura, 0.6);
  // manto ao vento
  s.poli([[22, 29], [14, 38], [7, 56], [4, 62], [18, 58], [24, 46]], escuro(h.robe, 0.3));
  // pernas
  s.poli([[26, 48], [20, 58], [16, 66], [22, 66], [28, 56], [31, 48]], '#2a2440', true); s.poli([[32, 49], [38, 58], [45, 65], [50, 65], [43, 55], [37, 48]], '#352c50', true); s.linha(26, 49, 20, 58, '#4a4068'); s.linha(33, 50, 39, 58, '#4a4068');
  s.rect(14, 65, 8, 2, h.trim); s.rect(43, 64, 9, 2, h.trim);
  // braço de trás
  s.poli([[24, 33], [18, 40], [17, 46], [20, 47], [23, 41], [27, 36]], h.robe, true); s.elipse(18, 47, 2.6, 2.6, pele);
  // tronco
  s.poli([[23, 30], [31, 25], [40, 31], [46, 51], [18, 51]], h.robe);
  s.trago(26, 29, 33, 41, h.trim, 2); s.trago(40, 29, 33, 41, h.trim, 2); s.rect(19, 48, 26, 3, h.trim); s.poli([[32, 50], [35, 50], [38, 62], [34, 61]], h.trim);
  // braço da frente
  s.poli([[37, 31], [47, 39], [46, 44], [41, 42], [35, 36]], h.robe, true); s.elipse(46, 42, 3, 3, pele);
  arma(s, h.weapon, h.wcol ?? AM);
  // cabeça
  s.rect(27, 24, 5, 5, escuro(pele, 0.2));
  if (!h.bald && !h.hood) s.poli([[26, 17], [17, 17], [12, 21], [9, 29], [18, 25], [24, 21]], escuro(cabelo, 0.1));
  s.elipse(29, 19, 6.4, 6.6, pele, true);
  for (let y = 13; y < 26; y++) for (let x = 33; x < 36; x++) if (s.get(x, y) === pele && (x + y) % 2 === 0) s.set(x, y, escuro(pele, 0.2));
  if (h.bald) s.set(27, 14, W);
  else if (h.hood) s.poli([[21, 20], [20, 10], [29, 6], [38, 10], [38, 20], [34, 12], [29, 11], [24, 12]], h.robe);
  else { s.poli([[22, 19], [22, 11], [28, 7], [34, 9], [36, 14], [35, 19], [32, 13], [27, 13]], cabelo); s.elipse(30, 7, 3.4, 3, cabelo); s.trago(27, 8, 17, 5, cabelo, 2); s.set(26, 10, mix(cabelo, W, 0.45)); }
  if (h.mask) s.rect(26, 21, 11, 5, '#2a2638');
  if (h.horns) { s.trago(25, 12, 21, 5, h.trim, 2); s.trago(34, 11, 38, 4, h.trim, 2); }
  const e = h.eye ?? '#2a2040';
  s.rect(31, 19, 3, 2, '#fff'); s.set(33, 19, e); s.set(33, 20, e); s.rect(30, 17, 5, 1, K); s.set(35, 22, escuro(pele, 0.4));
  if (h.eye) s.halo(33, 20, 4, h.eye, 0.5);
  s.rect(32, 24, 3, 1, '#a04a4a');
  return s.contorno();
}

function jogadorSprite(path: string, tier: number): Surf {
  const h = PATH_FIGHT[path] ?? PATH_FIGHT[''];
  const ac = AURA[Math.min(8, tier)];
  const s = new Surf(60, 70);
  s.halo(29, 42, 22 + tier, ac, 0.28 + Math.min(0.3, tier * 0.03));
  const aneis = Math.min(4, 1 + Math.floor(tier / 2));
  for (let i = 0; i < aneis; i++) for (let a = 0; a < 6.3; a += 0.07) s.set(29 + Math.cos(a) * (13 + i * 4), 66 + Math.sin(a) * (3 + i), i ? mix(ac, K, 0.4) : ac);
  if (tier >= 6) for (let a = 0; a < 6.3; a += 0.06) s.set(29 + Math.cos(a) * 12, 19 + Math.sin(a) * 12, AM);
  if (path === 'bestas') { const b = new Surf(60, 70); b.elipse(12, 63, 8, 5, '#ff9a3c'); b.elipse(6, 58, 3.4, 3.4, '#ff9a3c'); b.poli([[3, 55], [4, 51], [7, 54]], '#ff9a3c'); b.poli([[9, 55], [11, 51], [10, 56]], '#ff9a3c'); b.trago(19, 63, 25, 60, '#ff9a3c', 2); b.set(5, 58, K); b.contorno(); s.colar(b, 0, 0); }
  return s.colar(humano(h, ac), 0, 0);
}

export function jogador(path: string, tier: number): string {
  return imagemMiolo(png(`jg|${path}|${tier}`, () => jogadorSprite(path, tier)), 0, 0, 120, 140);
}

/* ---------- Criaturas ---------- */
function criatura(id: string): Surf {
  const s = new Surf(60, 70);
  s.elipse(29, 67, 22, 2.6, 'rgba(0,0,0,0.25)', true);
  const quadrupede = (corpo: string, sombra: string, orelha: string, olho: string, listras?: string) => {
    s.trago(12, 54, 5, 50, corpo, 3); s.trago(5, 50, 3, 55, escuro(corpo, 0.2), 3);
    s.poli([[12, 58], [13, 48], [24, 38], [38, 34], [50, 30], [55, 35], [52, 42], [47, 40], [43, 44], [45, 52], [41, 52], [38, 47], [24, 48], [20, 58]], corpo);
    s.poli([[44, 33], [47, 26], [50, 32]], orelha); s.poli([[37, 35], [39, 28], [42, 34]], orelha);
    for (const x of [19, 27, 36, 44]) s.rect(x, 52, 4, 14, sombra);
    s.rect(51, 38, 6, 3, '#f4f0e8'); s.set(50, 35, olho); s.set(51, 35, olho); s.set(55, 40, K);
    if (listras) for (const [x, y] of [[20, 44], [27, 41], [34, 40], [41, 38]] as const) s.trago(x, y, x + 2, y + 8, listras, 2);
  };
  switch (id) {
    case 'lobo': quadrupede('#b4bfd2', '#8a96ac', '#9aa6bc', '#ffd23a'); break;
    case 'tigre': quadrupede('#f0a85a', '#e0963f', '#d98a3a', '#fff', K); break;
    case 'serpente': { for (let t = 0; t < 1; t += 0.012) { const x = 6 + t * 40 + Math.sin(t * 11) * 4, y = 62 - Math.sin(t * Math.PI * 1.1) * 40 + Math.cos(t * 12) * 3; s.elipse(x, y, 4.4 - t * 1.6, 4.4 - t * 1.6, t % 0.04 < 0.02 ? '#2fcf7a' : '#1a8a52', true); } s.elipse(48, 22, 6, 4.4, '#2fcf7a'); s.set(50, 21, AM); s.linha(54, 23, 59, 22, VM); break; }
    case 'golem': s.ret(17, 25, 26, 27, '#8f9bb4'); s.ret(21, 11, 18, 15, '#a4b0c8'); s.ret(19, 52, 9, 14, '#7a86a0'); s.ret(32, 52, 9, 14, '#7a86a0'); s.ret(43, 29, 12, 19, '#8f9bb4'); s.ret(9, 29, 8, 17, '#8f9bb4'); s.rect(24, 17, 4, 2, AM); s.rect(32, 17, 4, 2, AM); s.linha(23, 35, 29, 39, '#3ddc97'); s.linha(29, 39, 25, 46, '#3ddc97'); break;
    case 'dragao': { for (let t = 0; t < 1; t += 0.01) { const x = 4 + t * 36 + Math.sin(t * 9) * 5, y = 60 - t * 38 + Math.cos(t * 8) * 6; s.elipse(x, y, 4.6 - t * 1.4, 4.6 - t * 1.4, t % 0.04 < 0.02 ? '#3a9ae0' : '#2a7ac0', true); } s.poli([[30, 36], [20, 18], [34, 28]], '#6ac0f0'); s.poli([[38, 32], [44, 16], [50, 30]], '#6ac0f0'); s.poli([[42, 14], [48, 6], [56, 10], [54, 20], [44, 20]], '#3a9ae0'); s.trago(46, 8, 44, 2, AM, 1); s.trago(52, 7, 54, 1, AM, 1); s.set(52, 12, AM); s.linha(57, 14, 59, 18, '#ff9a3c'); s.halo(58, 18, 5, '#ff7a2a', 0.6); break; }
    case 'espectro': s.halo(29, 40, 24, '#7ac4ff', 0.5); s.poli([[15, 30], [29, 12], [43, 30], [43, 58], [38, 56], [34, 62], [29, 56], [24, 62], [20, 56], [15, 60]], '#cfe4ff'); s.rect(22, 33, 4, 5, '#4aa3ff'); s.rect(32, 33, 4, 5, '#4aa3ff'); s.set(23, 33, W); s.set(33, 33, W); s.elipse(29, 45, 3, 4.4, K); s.trago(44, 38, 55, 44, '#cfe4ff', 3); s.trago(44, 46, 52, 56, '#cfe4ff', 3); break;
    case 'raio': s.halo(29, 30, 28, '#6a8aff', 0.5); s.elipse(29, 24, 24, 11, '#4a4f90'); s.elipse(16, 26, 11, 7, '#5a60a0'); s.elipse(42, 25, 11, 7, '#5a60a0'); s.poli([[33, 24], [24, 42], [32, 42], [25, 62], [40, 38], [32, 38], [38, 24]], '#ffe45a'); s.trago(12, 30, 8, 42, '#8ab4ff', 2); s.trago(48, 30, 46, 42, '#8ab4ff', 2); break;
  }
  return s.contorno();
}

export function inimigo(id: string): string {
  const humanoFoe = FOE_HUMAN[id];
  const sprite = (FOE_CREATURES as readonly string[]).includes(id) ? () => criatura(id) : () => humano(humanoFoe ?? FOE_HUMAN.cultivador);
  return imagemMiolo(png(`ini|${id}|${hash(id) % 3}`, sprite), 0, 0, 120, 140);
}
