import { hash } from '../core';
import type { Look } from '../portrait';
import { mix } from '../cor';
import { CINZA, PAPEL, TINTA, VERM, arco, disco, lavis, moldura, nevoa, papel, selo, svg, traco as t } from './base';

const PELE = ['#f3dcc0', '#ecc9a2', '#d9ab80', '#bd8a60', '#8f6444'];
const ROUPA: Record<string, string> = {
  sopro: '#6f90c0', espada: '#4a5468', alquimia: '#c99a3a', corpo: '#b84a3a', alma: '#8a6aa8', formacoes: '#5a9a82',
  budista: '#d9a03a', venenos: '#4f7a58', bestas: '#a8683a', demoniaca: '#6a2a3a', '': '#8a8478',
};
const ROUPA_PAPEL: Record<string, string> = { mentor: '#5a8a7a', rival: '#b04040', amigo: '#8aa860', noivo: '#c9748a', discipulo: '#6f90c0', inimigo: '#3a2f45' };
const AURA = ['#9aa0aa', '#aab4c4', '#5a9a82', '#c99a3a', '#3f5f9a', '#7a5aa0', '#c9748a', '#d8742a', '#b3262b'];

export function retrato(look: Look, size: number): string {
  const h = hash(look.seed), papelNome = look.role;
  const robe = papelNome === 'jogador' ? (ROUPA[look.path] ?? ROUPA['']) : ROUPA_PAPEL[papelNome];
  const crianca = look.stage === 0, velho = look.stage >= 4, maduro = look.stage >= 3;
  const pele = PELE[h % PELE.length];
  const aura = AURA[Math.min(8, look.tier)];
  const careca = look.path === 'budista' && papelNome === 'jogador';
  const afiado = papelNome === 'rival' || papelNome === 'inimigo' || look.path === 'espada' || look.path === 'demoniaca';
  const sorri = papelNome === 'amigo' || papelNome === 'noivo' || crianca;
  const longo = papelNome === 'noivo' || (h >>> 5) % 2 === 0;
  const cabelo = velho ? '#cfd0d6' : maduro ? '#6a6872' : TINTA;
  let o = papel(120, 120, PAPEL, 16);

  // fundo: montanhas ao longe, névoa e disco do reino (cresce e esquenta com o reino)
  o += lavis('M0 88L22 66 38 78 62 50 88 76 120 62V120H0z', '#8a94a8', 0.3) + nevoa(0, 70, 120, 20, PAPEL, 0.9);
  o += disco(60, 46, 20 + look.tier * 1.6, look.tier >= 6 ? '#c8a028' : aura, 0.2 + Math.min(0.4, look.tier * 0.05));
  if (look.tier >= 4) o += t(arco(60, 46, 36, 36, -2.4, 3.4, 16), 1.6, { op: 0.65, fim: 0.2, seed: 'h' + look.seed });
  if (look.tier >= 7) o += t(arco(60, 46, 42, 42, -1.8, 4, 16), 1.1, { op: 0.5, fim: 0.2, seed: 'h2' + look.seed });
  if (look.items.some((i) => i.includes('manto'))) o += lavis('M2 120C2 96 20 80 40 78h40c20 2 38 18 38 42z', mix(robe, '#000000', 0.4), 0.7);

  // cabelo comprido por trás
  if (!careca && longo) o += `<path d="M32 46C26 72 30 100 36 118H84C90 100 94 72 88 46 86 28 74 14 60 14S34 28 32 46Z" fill="${cabelo}" opacity=".95"/>` + t([[40, 60], [38, 90], [42, 112]], 1.4, { cor: PAPEL, op: 0.35, fim: 0.3 }) + t([[80, 60], [82, 90], [78, 112]], 1.4, { cor: PAPEL, op: 0.35, fim: 0.3 });

  // roupa: um lavis e poucas pinceladas largas
  o += lavis('M6 120C8 98 26 88 44 84L60 106 76 84C94 88 112 98 114 120z', robe, 0.82);
  o += t([[44, 84], [60, 108], [76, 84]], 5.2, { cor: TINTA, ataque: 0.1, fim: 0.5 }) + t([[44, 84], [60, 108], [76, 84]], 2.2, { cor: PAPEL, op: 0.9, fim: 0.5 });
  o += t([[14, 118], [20, 102], [34, 92]], 3, { fim: 0.1 }) + t([[106, 118], [100, 102], [86, 92]], 2.4, { fim: 0.1 }) + t([[60, 108], [58, 120]], 2.4, { fim: 0.2 }) + t([[28, 118], [34, 104]], 1.6, { op: 0.6 }) + t([[92, 118], [86, 104]], 1.6, { op: 0.6 });

  // pescoço e cabeça
  o += lavis('M52 74V90Q60 98 68 90V74z', mix(pele, '#6a4a30', 0.2), 0.9) + t([[52, 76], [52, 90]], 1.4, { op: 0.8 });
  const cabeca = crianca ? 'M33 52C33 30 46 22 60 22S87 30 87 52C87 68 74 80 60 80S33 68 33 52Z' : `M35 50C35 28 47 19 60 19S85 28 85 50C85 64 76 76 68 82Q60 88 52 82C44 76 35 64 35 50Z`;
  o += lavis(cabeca, pele, 0.95);
  o += t([[36, 44], [37, 62], [48, 77], [60, 86]], 2.2, { fim: 0.25 }) + t([[84, 44], [83, 62], [72, 77], [60, 86]], 1.6, { fim: 0.2 });
  if (sorri) o += lavis(circ(46, 66, 5), '#d98a8a', 0.3) + lavis(circ(74, 66, 5), '#d98a8a', 0.3);

  // olhos, sobrancelhas, nariz, boca: o mínimo de traços
  const olhoCor = look.corr >= 40 ? VERM : look.tier >= 5 ? '#c8a028' : TINTA;
  for (const s of [-1, 1]) {
    const ex = 60 + s * 13;
    o += t([[ex - s * 7, 54], [ex, 51.4], [ex + s * 7, 53.6]], velho ? 1.8 : 2.8, { ataque: 0.3, fim: 0.25, seed: 'o' + s });
    o += `<circle cx="${ex}" cy="54.2" r="${look.tier >= 5 || look.corr >= 40 ? 2.6 : 1.9}" fill="${olhoCor}"/>`;
    o += t([[ex - s * 9, afiado ? 44 : 46], [ex, afiado ? 44.4 : 43.6], [ex + s * 9, afiado ? 47.4 : 44.6]], velho ? 2.8 : 2.2, { cor: velho ? CINZA : TINTA, ataque: 0.4, fim: 0.1, seed: 'b' + s });
  }
  o += t([[60, 57], [58.4, 66], [61.6, 66.6]], 1.2, { fim: 0.4, op: 0.8 });
  o += t([[53, 74], [60, sorri ? 77 : 74.6], [67, 74]], 1.9, { cor: VERM, op: 0.85, fim: 0.3 });
  if (maduro) o += t([[40, 58], [42, 64]], 1, { op: 0.6 }) + t([[80, 58], [78, 64]], 1, { op: 0.6 }) + t([[52, 40], [58, 39]], 1, { op: 0.5 }) + t([[62, 39], [68, 40]], 1, { op: 0.5 });
  if (look.corr >= 40) o += t([[44, 60], [42, 68]], 1.6, { cor: VERM }) + t([[76, 60], [78, 68]], 1.6, { cor: VERM });
  if (papelNome === 'inimigo') o += t([[72, 44], [80, 68]], 2, { cor: VERM, ataque: 0.2 });

  // barba do ancião: fios finos e longos, quase só papel
  if (velho && ((h >>> 7) % 2 === 0 || papelNome === 'mentor')) {
    for (const [x0, x1, w] of [[48, 54, 1.6], [53, 57, 1.4], [60, 60, 1.8], [67, 63, 1.4], [72, 66, 1.6]] as const) o += t([[x0, 76], [x0 + (x1 - x0) * 0.4, 92], [x1, 108]], w, { cor: '#5a5862', ataque: 0.2, fim: 0.1, seed: 'bb' + x0 });
    o += t([[50, 72], [60, 76], [70, 72]], 2, { cor: '#5a5862', fim: 0.3 });
  }

  // cabelo: massa de tinta com poucas falhas de papel
  if (careca) {
    o += t([[44, 30], [60, 22], [76, 30]], 1.4, { cor: '#fff', op: 0.5 });
    for (let i = 0; i < 3; i++) o += `<circle cx="${52 + i * 8}" cy="28" r="1.3" fill="${VERM}" opacity=".7"/>`;
  } else {
    o += `<path d="M34 52C30 26 46 11 60 11S90 26 86 52C85 42 79 33 70 30 64 38 52 40 45 36 41 41 37 47 34 52Z" fill="${cabelo}"/>`;
    o += t([[46, 20], [56, 14], [66, 14]], 1.6, { cor: PAPEL, op: 0.55, fim: 0.2 }) + t([[52, 26], [62, 20]], 1.2, { cor: PAPEL, op: 0.4, fim: 0.2 });
    o += `<path d="M36 40C34 50 33 58 35 66 38 58 40 50 41 40z" fill="${cabelo}"/><path d="M84 40C86 50 87 58 85 66 82 58 80 50 79 40z" fill="${cabelo}"/>`;
    if (!longo) o += `<circle cx="60" cy="12" r="7" fill="${cabelo}"/>` + t([[53, 17], [67, 17]], 2.6, { cor: '#c8a028', fim: 0.8 }) + t([[56, 8], [50, 2]], 1.6, { cor: '#c8a028' });
  }

  // acessórios por trilha (só no jogador)
  if (papelNome === 'jogador') {
    switch (look.path) {
      case 'espada': o += t([[102, 14], [92, 66]], 4, { fim: 0.2, cor: '#aab4c4', seco: true }) + t([[100, 10], [106, 16]], 4.4, { cor: '#c8a028' }); break;
      case 'corpo': o += t([[34, 42], [60, 34], [86, 42]], 5, { cor: VERM, ataque: 0.1, fim: 0.7 }) + t([[86, 42], [96, 54]], 3.4, { cor: VERM }) + t([[84, 42], [100, 44]], 2.6, { cor: VERM }); break;
      case 'alma': o += lavis(circ(60, 36, 3.6), VERM, 0.95); break;
      case 'budista': o += t(arco(60, 106, 30, 12, 0.1, 3.04, 12), 4.2, { cor: '#c8a028', fim: 0.9 }) + t(arco(60, 44, 40, 40, -2.4, 3.4, 16), 1.8, { cor: '#c8a028', op: 0.8, fim: 0.2 }); break;
      case 'alquimia': o += lavis('M92 82h12v14a6 6 0 0 1-12 0z', '#5a9a82', 0.85) + t([[98, 82], [98, 74]], 2.4) + t([[100, 72], [102, 64]], 1.6, { cor: VERM }); break;
      case 'bestas': o += lavis('M86 96a12 9 0 1 0 24 0 12 9 0 0 0-24 0z', '#c0763a', 0.85) + t([[88, 88], [86, 78], [94, 84]], 2.2, { cor: '#c0763a' }) + t([[104, 88], [108, 78], [100, 84]], 2.2, { cor: '#c0763a' }) + `<circle cx="93" cy="94" r="1.3" fill="${TINTA}"/><circle cx="103" cy="94" r="1.3" fill="${TINTA}"/>`; break;
      case 'demoniaca': o += t([[38, 28], [30, 6]], 4, { fim: 0.1 }) + t([[82, 28], [90, 6]], 4, { fim: 0.1 }) + lavis(circ(60, 36, 3), VERM, 0.95); break;
      case 'formacoes': o += t([[92, 20], [104, 26], [104, 40], [92, 46], [80, 40], [80, 26], [92, 20]], 1.8, { cor: '#5a9a82', fim: 0.9 }) + t([[92, 20], [92, 46]], 1, { cor: '#5a9a82' }); break;
      case 'venenos': o += lavis('M42 66h36v10q-18 7-36 0z', '#3f6a4a', 0.88) + t([[50, 80], [51, 90]], 2, { cor: '#6aa850' }); break;
      case 'sopro': o += t([[6, 90], [30, 84], [52, 94], [80, 86], [114, 94]], 6, { cor: PAPEL, op: 0.9, seco: true }) + t([[6, 90], [30, 84], [52, 94], [80, 86], [114, 94]], 1.4, { op: 0.7 }); break;
    }
  }
  if (papelNome === 'discipulo' || papelNome === 'rival') o += t([[34, 40], [60, 32], [86, 40]], 4.4, { cor: papelNome === 'rival' ? VERM : PAPEL, fim: 0.7 }) + (papelNome === 'discipulo' ? t([[34, 40], [60, 32], [86, 40]], 1, { op: 0.6 }) : '');
  if (papelNome === 'noivo') o += lavis(circ(90, 28, 6), '#e58aa8', 0.85) + lavis(circ(90, 28, 2.2), '#c8a028', 0.95);

  o += moldura(120, 120) + selo(100, 100, 12, look.seed + look.role);
  return svg(120, 120, o, 'art art-portrait', papelNome, size);
}
const circ = (cx: number, cy: number, r: number) => `M${cx} ${cy - r}a${r} ${r} 0 1 0 0.01 0z`;
