import { FOE_CREATURES, FOE_HUMAN, PATH_FIGHT, type Human, type Weapon } from '../lutadores';
import { claro, escuro, mix } from '../cor';
import { OL, brilho, cel, estrela, linha, particulas, raios } from './base';

const PELE = '#f6cfa6', OURO = '#ffc83d', ACO = '#d6e2f4';
const AURA = ['#9aa3b5', '#c9d6ea', '#3ddc97', '#ffc83d', '#4aa3ff', '#a974ff', '#ff7eb6', '#ff9a3c', '#fff0a0'];

/** Armas: lâminas e orbes com brilho próprio. A mão fica em (90,80). */
function arma(w: Weapon, c: string): string {
  switch (w) {
    case 'espada': return `<path d="M96 76L120 38" stroke="${c}" stroke-width="7" opacity=".4" filter="url(#mwg2)"/>` + cel('M90 80L117 36l4 3-22 46z', ACO, { w: 1.6, off: 1.2 }) + `<path d="M93 77l21-35" stroke="#fff" stroke-width="1.2" opacity=".9"/>` + cel('M84 82l12-8 3 4-12 8z', OURO, { w: 1.4, off: 1 });
    case 'cutelo': return cel('M92 78l24-22 8 8-16 22z', '#b8c4d4', { w: 1.6, off: 1.4 }) + cel('M86 84l10-9 3 3-9 10z', '#7a4a2a', { w: 1.4, off: 1 });
    case 'adaga': return `<path d="M92 80l20-10" stroke="${c}" stroke-width="5" opacity=".4" filter="url(#mwg2)"/>` + cel('M90 80l22-12-2 9z', ACO, { w: 1.4, off: 1 }) + linha('M86 84l6-4', c, 3);
    case 'cajado': return cel('M95 24h4v110h-4z', '#9a6a3a', { w: 1.6, off: 1.2 }) + `<circle cx="97" cy="22" r="12" fill="${c}" opacity=".5" filter="url(#mwg2)"/>` + cel('M97 14a7 7 0 1 0 0.01 0z', c, { w: 1.6, off: 1.2 });
    case 'orbe': return `<circle cx="102" cy="70" r="20" fill="${c}" opacity=".5" filter="url(#mwg)"/>` + cel('M102 59a11 11 0 1 0 0.01 0z', c, { w: 1.8, off: 2 }) + brilho('M96 64a6 6 0 0 1 6-4 5 5 0 0 0-6 5z') + `<circle cx="102" cy="70" r="16" fill="none" stroke="${claro(c, 0.5)}" stroke-width="1.4" opacity=".8"/>` + estrela(114, 52, 4, '#fff');
    case 'talisma': return `<rect x="92" y="50" width="20" height="34" fill="#ffd75e" opacity=".5" filter="url(#mwg2)"/>` + cel('M94 52h16v32H94z', '#ffd75e', { w: 1.6, off: 1.4 }) + `<path d="M97 58h10M97 64h10M102 64v14M98 72q4 4 8 0" stroke="#ff4d5e" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    case 'dardo': return `<path d="M92 80l24-6" stroke="${c}" stroke-width="6" opacity=".4" filter="url(#mwg2)"/>` + cel('M90 80l24-8 4 2-3 5z', c, { w: 1.4, off: 1 }) + estrela(118, 72, 3, '#fff');
    case 'frasco': return `<circle cx="100" cy="72" r="14" fill="${c}" opacity=".45" filter="url(#mwg2)"/>` + cel('M93 66h14v10a7 7 0 0 1-14 0z', c, { w: 1.6, off: 1.4 }) + cel('M97 60h6v6h-6z', '#f0d9a8', { w: 1.4, off: 1 });
    case 'garra': return ['M88 78q12-4 18-16', 'M90 82q14-3 22-13', 'M90 86q14 1 24-8'].map((d) => `<path d="${d}" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${c}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`).join('') + `<circle cx="104" cy="74" r="16" fill="${c}" opacity=".3" filter="url(#mwg2)"/>`;
    case 'contas': return `<path d="M84 78q12 12 22-4" stroke="${OL}" stroke-width="6" stroke-dasharray="1 6" stroke-linecap="round" fill="none"/><path d="M84 78q12 12 22-4" stroke="${OURO}" stroke-width="3.6" stroke-dasharray="1 6" stroke-linecap="round" fill="none"/>` + `<circle cx="104" cy="74" r="14" fill="${OURO}" opacity=".3" filter="url(#mwg2)"/>`;
    case 'punho': return `<circle cx="102" cy="76" r="16" fill="${c}" opacity=".35" filter="url(#mwg2)"/>` + cel('M92 70h14v14H92z', '#ff4d5e', { w: 1.6, off: 1.2 }) + cel('M96 68a8 8 0 1 0 0.01 0z', PELE, { w: 1.6, off: 1.2 });
    default: return '';
  }
}

/** Humanoide em posição de combate, de lado: manto ao vento, cabelo solto, braço da frente estendido com a arma. */
function humano(h: Human, auraCor?: string): string {
  const pele = h.skin ?? PELE, cabelo = h.hair ?? '#1b1840', robe = h.robe, trim = h.trim;
  let o = `<ellipse cx="58" cy="133" rx="28" ry="5" fill="#000" opacity=".35"/>`;
  if (auraCor) o += `<ellipse cx="58" cy="132" rx="26" ry="5" fill="${auraCor}" opacity=".6" filter="url(#mwg2)"/>`;
  // manto ao vento (atrás)
  o += cel('M44 58C28 70 14 96 6 124l30-8 12-26z', escuro(robe, 0.25), { w: 2, off: 2 }) + linha('M40 72C28 86 20 102 14 118', claro(robe, 0.3), 1.4, 0.7);
  // pernas em guarda
  o += cel('M52 96l-16 30 8 4 18-26z', '#262040', { w: 1.8, off: 1.6 }) + cel('M64 98l18 28-7 5-22-24z', '#2d2650', { w: 1.8, off: 1.6 });
  o += cel('M30 126h18l2 6H28z', trim, { w: 1.6, off: 1.2 }) + cel('M74 128h18l2 6H72z', trim, { w: 1.6, off: 1.2 });
  // braço de trás
  o += cel('M48 64l-14 8 -4 18 8 2 8-14z', robe, { w: 1.8, off: 1.6 }) + `<circle cx="34" cy="92" r="5.4" fill="${pele}" stroke="${OL}" stroke-width="1.6"/>`;
  // tronco
  o += cel('M46 60Q62 50 78 62l10 40H38z', robe, { w: 2.2, off: 3 });
  o += `<path d="M52 58l14 24 14-24" fill="none" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/><path d="M52 58l14 24 14-24" fill="none" stroke="${trim}" stroke-width="3.4" stroke-linejoin="round"/>`;
  o += cel('M38 96h50v6H38z', trim, { w: 1.6, off: 1.2 }) + cel('M64 98l6 24-8-2z', trim, { w: 1.4, off: 1 });
  // braço da frente (estendido) + arma
  o += cel('M74 62l22 18-4 8-24-14z', robe, { w: 1.8, off: 1.6 }) + `<circle cx="92" cy="82" r="5.6" fill="${pele}" stroke="${OL}" stroke-width="1.6"/>`;
  o += arma(h.weapon, h.wcol ?? OURO);
  // cabeça e cabelo
  o += cel('M56 50h12v10H56z', escuro(pele, 0.15), { w: 1.6, off: 1 });
  if (!h.bald && !h.hood) o += cel('M52 36C34 36 30 56 22 62c14-2 24-8 28-18z', escuro(cabelo, 0.1), { w: 1.8, off: 1.4 });
  o += cel('M70 38a13 13 0 1 1-26 0 13 13 0 0 1 26 0z', pele, { w: 2.2, off: 2.4, sh: escuro(pele, 0.2) });
  if (h.bald) o += `<path d="M48 30Q57 24 66 30" stroke="#fff" stroke-width="1.6" fill="none" opacity=".6"/>`;
  else if (h.hood) o += cel('M40 40C38 18 52 12 60 12s24 6 22 28c-4-12-12-16-22-16S44 28 40 40z', robe, { w: 2, off: 2 }) + `<path d="M46 40q12 8 26 0" fill="#000" opacity=".5"/>`;
  else {
    o += cel('M42 38C38 20 50 12 62 14s16 12 12 24c-2-8-8-14-16-14S46 28 42 38z', cabelo, { w: 2, off: 2 }) + `<path d="M50 20Q58 14 66 18" stroke="${claro(cabelo, 0.45)}" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>`;
    o += cel('M56 16a6 6 0 1 0 12 0 6 6 0 0 0-12 0z', cabelo, { w: 1.6, off: 1.2 }) + cel('M52 18C38 10 22 18 12 40 26 30 38 32 52 28z', cabelo, { w: 1.8, off: 1.6 }) + `<path d="M44 20Q30 18 20 30" stroke="${claro(cabelo, 0.45)}" stroke-width="1.4" fill="none" opacity=".8"/>`;
  }
  if (h.mask) o += cel('M52 40h22v10q-11 5-22 0z', '#1f1b30', { w: 1.6, off: 1.2 });
  if (h.horns) o += cel('M48 26l-8-14 12 8zM68 24l8-14 -4 14z', trim, { w: 1.6, off: 1.2 });
  const e = h.eye ?? '#3a2a4a';
  o += `<path d="M62 37q5-3 9 0" stroke="${OL}" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="66" cy="39" rx="3" ry="2.6" fill="${h.eye ?? '#fff'}" stroke="${OL}" stroke-width="1"/><circle cx="66.6" cy="39" r="1.6" fill="${e}"/><circle cx="66" cy="38.2" r=".7" fill="#fff"/>`;
  if (h.eye) o += `<circle cx="66" cy="39" r="7" fill="${h.eye}" opacity=".4" filter="url(#mwg2)"/>`;
  o += `<path d="M61 33l10 2.4" stroke="${OL}" stroke-width="2" stroke-linecap="round"/>` + `<path d="M64 46q3 1.6 6 0" stroke="${escuro(pele, 0.6)}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  return o;
}

export function jogador(path: string, tier: number): string {
  const h = PATH_FIGHT[path] ?? PATH_FIGHT[''];
  const ac = AURA[Math.min(8, tier)];
  let o = '';
  o += `<ellipse cx="58" cy="82" rx="${36 + tier * 2}" ry="${58 + tier}" fill="${ac}" opacity="${0.12 + Math.min(0.28, tier * 0.03)}" filter="url(#mwg3)"/>`;
  const aneis = Math.min(4, 1 + Math.floor(tier / 2));
  for (let i = 0; i < aneis; i++) o += `<ellipse cx="58" cy="${130 - i * 2}" rx="${28 + i * 8}" ry="${6 + i * 2}" fill="none" stroke="${ac}" stroke-width="${i ? 1 : 2}" opacity="${0.95 - i * 0.2}"/>`;
  if (tier >= 6) o += `<circle cx="60" cy="38" r="24" fill="none" stroke="${OURO}" stroke-width="2.4" opacity=".85"/><circle cx="60" cy="38" r="24" fill="none" stroke="${OURO}" stroke-width="7" opacity=".2" filter="url(#mwg2)"/>`;
  if (tier >= 8) o += raios(60, 80, 40, 66, 18, '#fff6b0', 0.3, 2);
  o += particulas(tier * 31 + path.length, 120, 140, 6 + tier, claro(ac, 0.5));
  if (path === 'bestas') o += cel('M8 128a16 10 0 1 0 32 0 16 10 0 0 0-32 0z', '#ff9a3c', { w: 1.8, off: 2 }) + cel('M12 118l-3-12 11 6zM30 118l3-12-11 6z', '#ff9a3c', { w: 1.6, off: 1.2 }) + `<circle cx="18" cy="124" r="2" fill="${OL}"/><circle cx="30" cy="124" r="2" fill="${OL}"/>` + cel('M40 126q12-4 14-16', '#ff9a3c', { w: 1.6, off: 1 }) + linha('M40 126q12-4 14-16', '#ff9a3c', 5);
  return o + humano(h, ac);
}

/* ---------- Oponentes ---------- */
const CRIATURA: Record<string, () => string> = {
  espectro: () => `<ellipse cx="58" cy="132" rx="22" ry="4" fill="#000" opacity=".2"/><ellipse cx="58" cy="80" rx="34" ry="56" fill="#7ac4ff" opacity=".3" filter="url(#mwg3)"/>`
    + cel('M30 56Q58 18 86 56v58q-6 10-14 0t-14 8-14-8-14 6z', '#cfe4ff', { w: 2, off: 3 }) + `<path d="M30 56Q58 18 86 56" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/>`
    + `<path d="M46 66l10 4M70 66l-10 4" stroke="${OL}" stroke-width="3" stroke-linecap="round"/><ellipse cx="48" cy="72" rx="4.4" ry="6" fill="#4aa3ff"/><ellipse cx="68" cy="72" rx="4.4" ry="6" fill="#4aa3ff"/><circle cx="48" cy="70" r="1.6" fill="#fff"/><circle cx="68" cy="70" r="1.6" fill="#fff"/><ellipse cx="58" cy="90" rx="6" ry="9" fill="${OL}" opacity=".75"/>`
    + `<path d="M86 74q18-4 26 14M88 88q16 6 20 22" stroke="#cfe4ff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".6"/>` + particulas(7, 120, 140, 10, '#bfe4ff'),
  lobo: () => `<ellipse cx="58" cy="133" rx="40" ry="5" fill="#000" opacity=".3"/>` + cel('M10 98q-12-8-8 8 6 8 16 0z', '#b4bfd2', { w: 1.8, off: 1.6 }) + cel('M26 106q0-28 28-32l26-10q16 0 24 12l-8 8q-6-6-14-4l-6 8 4 12h-8l-4-10-24 2-6 12h-8z', '#b4bfd2', { w: 2, off: 3 })
    + cel('M84 68l10-14 4 14zM72 64l6-14 4 14z', '#9aa6bc', { w: 1.6, off: 1.2 }) + `<path d="M96 84l10 2-4 6-8-2z" fill="#f4f0e8" stroke="${OL}" stroke-width="1.4"/><circle cx="96" cy="74" r="2.6" fill="#ffd23a"/><circle cx="96" cy="74" r="6" fill="#ffd23a" opacity=".4" filter="url(#mwg2)"/>`
    + `<path d="M62 78q-4 14 2 24M50 80q-4 12 0 22" stroke="${OL}" stroke-width="1.4" fill="none" opacity=".5"/>` + cel('M40 100h8v32h-8zM54 102h8v30h-8zM72 102h8v30h-8zM86 98h8v34h-8z', '#8a96ac', { w: 1.6, off: 1.2 }),
  tigre: () => `<ellipse cx="58" cy="133" rx="42" ry="5" fill="#000" opacity=".3"/>` + cel('M14 100q-14-4-12 10 6 6 16-2z', '#f0a85a', { w: 1.8, off: 1.6 }) + cel('M22 106q0-30 30-34l30-8q20 0 28 14l-8 10q-8-6-16-4l-4 10 4 12h-10l-6-12-24 2-8 12H24z', '#f0a85a', { w: 2, off: 3 })
    + `<path d="M40 78l4 16M54 74l4 18M68 70l4 18M82 70l2 12" stroke="${OL}" stroke-width="4.4" stroke-linecap="round"/>` + cel('M84 64l8-12 4 14zM98 66l8-10 2 14z', '#d98a3a', { w: 1.6, off: 1.2 }) + `<circle cx="102" cy="76" r="2.8" fill="#fff" stroke="${OL}" stroke-width="1"/><circle cx="102.4" cy="76" r="1.4" fill="${OL}"/><path d="M98 84l12 2-4 6-8-2z" fill="#fff" stroke="${OL}" stroke-width="1.3"/>`
    + cel('M40 100h9v32h-9zM56 102h9v30h-9zM76 102h9v30h-9zM92 98h9v34h-9z', '#e0963f', { w: 1.6, off: 1.2 }),
  serpente: () => `<ellipse cx="58" cy="133" rx="40" ry="5" fill="#000" opacity=".25"/>` + `<path d="M14 124q22-12 40-2t34-8q14-8 6-28t-4-30" fill="none" stroke="${OL}" stroke-width="22" stroke-linecap="round"/><path d="M14 124q22-12 40-2t34-8q14-8 6-28t-4-30" fill="none" stroke="#2fcf7a" stroke-width="17" stroke-linecap="round"/>`
    + `<path d="M14 124q22-12 40-2t34-8q14-8 6-28t-4-30" fill="none" stroke="#1a8a52" stroke-width="3" stroke-dasharray="4 9" stroke-linecap="round"/><path d="M14 119q22-12 40-2t34-8q14-8 6-28" fill="none" stroke="#9affc0" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>`
    + cel('M82 40q4-14 20-14 12 0 12 10-8 8-18 8z', '#2fcf7a', { w: 1.8, off: 1.6 }) + `<circle cx="104" cy="32" r="3" fill="#ffd23a" stroke="${OL}" stroke-width="1"/><ellipse cx="104" cy="32" rx="1" ry="2.6" fill="${OL}"/><path d="M114 38l10 2-10 3" stroke="#ff4d5e" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  golem: () => `<ellipse cx="58" cy="133" rx="36" ry="5" fill="#000" opacity=".3"/>` + cel('M34 50h52v54H34z', '#8f9bb4', { w: 2.2, off: 3.4 }) + cel('M42 22h36v30H42z', '#a4b0c8', { w: 2.2, off: 3 }) + cel('M38 104h18v28H38zM64 104h18v28H64z', '#7a86a0', { w: 2.2, off: 2.4 })
    + cel('M86 58h24v38H86z', '#8f9bb4', { w: 2.2, off: 2.6 }) + cel('M18 58h16v34H18z', '#8f9bb4', { w: 2.2, off: 2.6 }) + `<rect x="47" y="33" width="9" height="5" fill="#ffd23a"/><rect x="63" y="33" width="9" height="5" fill="#ffd23a"/><rect x="45" y="30" width="30" height="14" fill="#ffd23a" opacity=".3" filter="url(#mwg2)"/>`
    + `<path d="M46 70l12 8-8 14M72 62l8 16" stroke="#3ddc97" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M46 70l12 8-8 14" stroke="#3ddc97" stroke-width="8" fill="none" opacity=".25" filter="url(#mwg2)"/>`,
  dragao: () => `<ellipse cx="58" cy="133" rx="42" ry="5" fill="#000" opacity=".25"/>` + `<path d="M8 120q20-24 44-10t38-12q12-14 0-36t12-34" fill="none" stroke="${OL}" stroke-width="22" stroke-linecap="round"/><path d="M8 120q20-24 44-10t38-12q12-14 0-36t12-34" fill="none" stroke="#3a9ae0" stroke-width="17" stroke-linecap="round"/><path d="M8 115q20-24 44-10t38-12q12-14 0-36" fill="none" stroke="#8ad8ff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>`
    + cel('M60 72l-22-36 26 16zM76 66l12-34 12 26z', '#6ac0f0', { w: 1.8, off: 1.6 }) + cel('M90 24q6-14 22-12l8 8-8 14z', '#3a9ae0', { w: 1.8, off: 1.6 }) + `<path d="M98 14l-4-12M108 12l2-12" stroke="${OURO}" stroke-width="3" stroke-linecap="round"/><circle cx="108" cy="22" r="2.6" fill="${OURO}" stroke="${OL}" stroke-width="1"/><path d="M118 26q-10 6-8 14" stroke="#ff9a3c" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="116" cy="38" r="8" fill="#ff7a2a" opacity=".5" filter="url(#mwg2)"/>`,
  raio: () => `<ellipse cx="58" cy="60" rx="50" ry="40" fill="#6a8aff" opacity=".35" filter="url(#mwg3)"/>` + cel('M16 54q-8 0-8-12 0-12 16-12 4-14 20-14 12 0 18 10 18-2 22 12 12 2 12 12 0 12-14 14H24q-8 0-8-10z', '#4a4f90', { w: 2.2, off: 3 }) + `<path d="M24 40q10-8 22-4M70 30q12 0 18 8" stroke="#8a90d0" stroke-width="2" fill="none" opacity=".7"/>`
    + cel('M64 52l-14 32h16l-14 38 32-44H66l14-26z', '#ffe45a', { w: 2.2, off: 2 }) + `<path d="M64 52l-14 32h16l-14 38 32-44H66l14-26z" fill="#fff" opacity=".35" filter="url(#mwg2)"/><path d="M26 58l-8 22h8l-6 20M98 56l-6 20h8l-4 18" stroke="#8ab4ff" stroke-width="3" fill="none" stroke-linecap="round"/>` + particulas(11, 120, 140, 8, '#fff6b0'),
};

export function inimigo(id: string): string {
  if ((FOE_CREATURES as readonly string[]).includes(id)) return CRIATURA[id]();
  return humano(FOE_HUMAN[id] ?? FOE_HUMAN.cultivador);
}
