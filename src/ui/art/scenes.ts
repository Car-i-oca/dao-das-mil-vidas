import { C, hash, prng, svg } from './core';

/* =====================================================================
 * Cenários simples (faixas de 320x120) para lugares, e cartões de final.
 * Camadas: céu, astro, montanhas ao fundo, elemento do lugar, primeiro plano.
 * ===================================================================== */

export type SceneKind = 'vilarejo' | 'cidade' | 'seita' | 'selva' | 'montanha' | 'ruinas' | 'deserto' | 'gelo' | 'mar' | 'reino_secreto' | 'submundo' | 'ceu';

const SKY: Record<SceneKind, [string, string]> = {
  vilarejo: ['#e9c58a', '#f3e2bd'], cidade: ['#c9b48a', '#eadfc2'], seita: ['#a9c3c0', '#e6e3cf'], selva: ['#7fae92', '#dcebd0'],
  montanha: ['#9db0c4', '#e4e8e6'], ruinas: ['#b79c86', '#e5d5bf'], deserto: ['#e3a964', '#f6dfae'], gelo: ['#b9d6e6', '#eef6f8'],
  mar: ['#6c9bbf', '#d9e9ef'], reino_secreto: ['#7d6fb5', '#e6d8ef'], submundo: ['#3a2a36', '#7a4a52'], ceu: ['#5d7fc4', '#f5e8c8'],
};

function ridge(r: () => number, base: number, amp: number, color: string, opacity: number, w = 320): string {
  let d = `M0 120L0 ${base}`;
  for (let x = 0; x <= w; x += 20) d += `L${x} ${base - r() * amp}`;
  return `<path d="${d}L${w} 120z" fill="${color}" opacity="${opacity}"/>`;
}

function elements(kind: SceneKind, r: () => number): string {
  switch (kind) {
    case 'vilarejo':
      return [0, 1, 2, 3].map((i) => { const x = 40 + i * 62 + r() * 12; return `<path d="M${x} 96v-20h26v20z" fill="#8a6a4a"/><path d="M${x - 4} 76l17-14 17 14z" fill="${C.red}" opacity="0.85"/>`; }).join('') + `<path d="M0 104q80-10 160 0t160 0V120H0z" fill="#9a8f5a" opacity="0.6"/>`;
    case 'cidade':
      return `<path d="M20 100V60h30v40M60 100V48h24v52M96 100V66h36v34M142 100V40l14-12 14 12v60M180 100V58h30v42M220 100V50h26v50M256 100V64h34v36" fill="#6f5a44" opacity="0.9"/>` +
        `<path d="M142 44l14-14 14 14z" fill="${C.red}"/><path d="M60 52h24l-12-10zM220 54h26l-13-10z" fill="${C.red}" opacity="0.85"/>`;
    case 'seita':
      return `<path d="M120 100V64h80v36" fill="#7d6a52"/><path d="M110 66l50-26 50 26z" fill="${C.red}"/><path d="M128 100V76h16v24M176 100V76h16v24" fill="#3a2d22"/><path d="M60 100l14-26 14 26M236 100l12-22 12 22" fill="${C.jade}" opacity="0.8"/>` +
        `<path d="M156 40l4-12 4 12" stroke="${C.gold}" stroke-width="2" fill="none"/>`;
    case 'selva':
      return [0, 1, 2, 3, 4, 5, 6].map((i) => { const x = 14 + i * 46 + r() * 14; const h = 40 + r() * 30; return `<path d="M${x} 110V${110 - h}" stroke="#4a3a28" stroke-width="5"/><circle cx="${x}" cy="${100 - h}" r="${14 + r() * 8}" fill="${C.jade}" opacity="0.85"/>`; }).join('');
    case 'montanha':
      return `<path d="M30 110L100 30l30 40 40-52 90 92z" fill="#6c7f8e"/><path d="M100 30l-14 22 12-5 6 8 8-10z" fill="#fff" opacity="0.85"/><path d="M170 18l-16 26 14-6 8 10 10-8z" fill="#fff" opacity="0.85"/>`;
    case 'ruinas':
      return `<path d="M60 110V64h12v46M96 110V52h12v58M140 110V70h12v40M60 62h48v6H60z" fill="#8a7a66"/><path d="M200 110V80h40v30l-10-8-10 8-10-8-10 8z" fill="#7a6a58"/><path d="M180 110q10-14 24-6" stroke="${C.jade}" stroke-width="3" fill="none"/>`;
    case 'deserto':
      return `<path d="M0 100q60-24 120 0t120 -4 80 6V120H0z" fill="#d89a52"/><path d="M0 112q80-14 160 0t160-4V120H0z" fill="#c4823f"/><path d="M250 100V76M250 84l-8-6M250 92l8-6" stroke="${C.jade}" stroke-width="3" fill="none"/>`;
    case 'gelo':
      return `<path d="M30 110l22-50 18 30 22-44 26 64zM180 110l20-40 16 26 20-32 24 46z" fill="#cfe4ee" stroke="#8fb5c9" stroke-width="1.5"/><path d="M0 108h320v12H0z" fill="#e8f2f6"/>`;
    case 'mar':
      return `<path d="M0 78q40-8 80 0t80 0 80 0 80 0V120H0z" fill="#4f84ac"/><path d="M0 92q40-8 80 0t80 0 80 0 80 0V120H0z" fill="#3e6f98"/><path d="M200 78l24-30 24 30z" fill="#fff" opacity="0.9"/><path d="M224 78v8" stroke="#6b4a2a" stroke-width="3"/><path d="M190 80h68l-6 8h-56z" fill="#6b4a2a"/>`;
    case 'reino_secreto':
      return `<path d="M0 100q80-30 160-10t160-14V120H0z" fill="#5a4a8f" opacity="0.8"/><path d="M130 100V50l30-24 30 24v50z" fill="${C.gold}" opacity="0.5"/><circle cx="160" cy="58" r="12" fill="#fff" opacity="0.6"/>` + [0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${30 + i * 52}" cy="${30 + r() * 30}" r="2" fill="#fff" opacity="0.8"/>`).join('');
    case 'submundo':
      return `<path d="M0 104h320v16H0z" fill="#2a1c26"/><path d="M60 104V70h12v34M180 104V60h14v44M250 104V76h12v34" fill="#52303c"/><circle cx="160" cy="62" r="6" fill="#e0742f" opacity="0.8"/>`;
    case 'ceu':
      return `<path d="M30 98q30-14 60-4t60-6 60 2 60-4" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.8"/><path d="M150 70V30l-14 6 14-18 14 18-14-6z" fill="${C.gold}" opacity="0.9"/>`;
  }
}

/** Faixa de cenário de um lugar. `seed` varia detalhes sem mudar o tema. */
export function sceneSvg(kind: SceneKind | string, seed = 'x', night = false): string {
  const k = (SKY[kind as SceneKind] ? kind : 'vilarejo') as SceneKind;
  const r = prng(hash(k + seed));
  const [top, bottom] = SKY[k];
  const gid = `sk${hash(k + seed) % 9999}`;
  let o = `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${night ? '#1d2440' : top}"/><stop offset="1" stop-color="${night ? '#4a4f78' : bottom}"/></linearGradient></defs>`;
  o += `<rect width="320" height="120" fill="url(#${gid})"/>`;
  if (night) for (let i = 0; i < 18; i++) o += `<circle cx="${r() * 320}" cy="${r() * 60}" r="${0.6 + r()}" fill="#fff" opacity="${0.4 + r() * 0.5}"/>`;
  const sunX = 40 + r() * 240;
  o += `<circle cx="${sunX}" cy="${28 + r() * 12}" r="${night ? 11 : 14}" fill="${night ? '#f4efd8' : '#fff4d0'}" opacity="${night ? 0.95 : 0.8}"/>`;
  if (k !== 'mar' && k !== 'gelo') o += ridge(r, 84, 28, '#6b7f88', 0.35) + ridge(r, 96, 20, '#55696a', 0.45);
  o += elements(k, r);
  o += `<rect y="116" width="320" height="4" fill="${C.dark}" opacity="0.25"/>`;
  return svg(320, 120, o, 'art art-scene', String(kind));
}

/* ---------- Cartões de final ---------- */
const MOTIF: Record<string, string> = {
  ascensao: 'sol', iluminacao: 'sol', celeste: 'sol', vazio: 'vazio', combate: 'laminas', guerra: 'laminas', duelo: 'laminas', cacado: 'laminas',
  tribulacao: 'raio', desvio: 'raio', demonio: 'chama', sacrificio: 'chama', amor: 'fio', mortal: 'arvore', velhice: 'arvore', velhice_avo: 'arvore',
  velhice_sabio: 'montanha', velhice_mestre: 'pagode', velhice_rico: 'moeda', velhice_veterano: 'laminas', velhice_esquecido: 'arvore', velhice_rancoroso: 'chama',
  eremita: 'montanha', guardiao: 'pagode', fundador: 'pagode', patriarca: 'pagode', ancestral: 'pagode', reencarnacao: 'roda', pilula: 'caldeirao',
  feras: 'garra', doenca: 'vaso', exilio: 'estrada', traicao: 'laminas',
};

function motif(m: string): string {
  const g = C.gold, i = C.ink;
  switch (m) {
    case 'sol': { let o = `<circle cx="160" cy="62" r="20" fill="${g}"/>`; for (let k = 0; k < 16; k++) { const a = (k / 16) * Math.PI * 2; o += `<path d="M${160 + Math.cos(a) * 26} ${62 + Math.sin(a) * 26}L${160 + Math.cos(a) * 38} ${62 + Math.sin(a) * 38}" stroke="${g}" stroke-width="2.4"/>`; } return o; }
    case 'laminas': return `<path d="M130 94L186 30M190 94L134 30" stroke="${C.steel}" stroke-width="7" stroke-linecap="round"/><path d="M122 100l14-8M198 100l-14-8" stroke="${C.red}" stroke-width="6" stroke-linecap="round"/>`;
    case 'raio': return `<path d="M170 20l-30 44h20l-14 40 40-52h-22z" fill="${C.gold}" stroke="${C.blue}" stroke-width="2"/>`;
    case 'chama': return `<path d="M160 104c-24-12-30-32-14-50 4 12 12 12 14 0 4 12 12 12 14 0 16 18 10 38-14 50z" fill="${C.fire}"/><path d="M160 100c-10-6-12-16-4-26 2 6 6 6 8 0 8 10 6 20-4 26z" fill="${C.gold}"/>`;
    case 'fio': return `<path d="M60 90q50-60 100-10t100-40" stroke="${C.red}" stroke-width="3" fill="none"/><circle cx="60" cy="90" r="5" fill="${C.red}"/><circle cx="260" cy="40" r="5" fill="${C.red}"/>`;
    case 'arvore': return `<path d="M160 104V62" stroke="#6b4a2a" stroke-width="6"/><circle cx="160" cy="46" r="24" fill="${C.jade}" opacity="0.85"/><circle cx="144" cy="58" r="14" fill="${C.jade}" opacity="0.75"/><circle cx="178" cy="58" r="14" fill="${C.jade}" opacity="0.75"/>`;
    case 'montanha': return `<path d="M90 106L140 40l22 28 26-40 52 78z" fill="#6c7f8e"/><path d="M140 40l-10 14 8-3 4 6 6-8z" fill="#fff" opacity="0.85"/><path d="M200 94h18v12h-18z" fill="#8a6a4a"/><path d="M196 94l13-10 13 10z" fill="${C.red}"/>`;
    case 'pagode': return [0, 1, 2, 3].map((k) => `<path d="M${130 + k * 4} ${100 - k * 20}h${60 - k * 8}l-${4}-8h-${52 - k * 8}z" fill="${C.red}"/><path d="M${138 + k * 4} ${100 - k * 20}v-12h${44 - k * 8}v12z" fill="#8a6a4a"/>`).join('') + `<path d="M160 22v-8" stroke="${C.gold}" stroke-width="3"/>`;
    case 'moeda': return `<circle cx="160" cy="64" r="26" fill="${C.gold}" stroke="${C.dark}" stroke-width="2"/><rect x="152" y="56" width="16" height="16" fill="${C.bg}" stroke="${C.dark}" stroke-width="2"/>`;
    case 'roda': { let o = `<circle cx="160" cy="62" r="28" fill="none" stroke="${C.gold}" stroke-width="4"/><circle cx="160" cy="62" r="6" fill="${C.gold}"/>`; for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; o += `<path d="M160 62L${160 + Math.cos(a) * 28} ${62 + Math.sin(a) * 28}" stroke="${C.gold}" stroke-width="2.4"/>`; } return o; }
    case 'caldeirao': return `<path d="M120 62h80v14c0 20-18 32-40 32s-40-12-40-32z" fill="${C.dark}" stroke="${C.gold}" stroke-width="3"/><path d="M140 52q-6-14 2-24M160 52q-6-16 4-28M180 52q-6-14 2-24" stroke="${C.fire}" stroke-width="4" fill="none"/>`;
    case 'garra': return `<path d="M120 100q10-50 20-70M150 100q4-52 10-76M180 100q-2-50 2-72M208 100q-8-44-14-62" stroke="${C.bone}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
    case 'vaso': return `<path d="M140 100V74q-10-8-10-22h60q0 14-10 22v26z" fill="${C.jade}" opacity="0.8" stroke="${i}" stroke-width="1.6"/>`;
    case 'estrada': return `<path d="M100 110q50-20 60-50t60-44" stroke="#8a7a66" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M160 40V20l16 8z" fill="${C.red}"/>`;
    case 'vazio': return `<circle cx="160" cy="62" r="28" fill="${C.dark}"/><circle cx="160" cy="62" r="28" fill="none" stroke="${C.violet}" stroke-width="3"/><circle cx="160" cy="62" r="40" fill="none" stroke="${C.violet}" stroke-width="1" opacity="0.6"/>`;
    default: return `<circle cx="160" cy="62" r="22" fill="none" stroke="${C.gold}" stroke-width="3"/>`;
  }
}

/** Cartão de final: cenário + motivo central; cor do céu varia por motivo. */
export function endingCard(endingId: string, title: string): string {
  const m = MOTIF[endingId] ?? 'arvore';
  const dark = ['chama', 'raio', 'vazio', 'laminas'].includes(m);
  const top = m === 'sol' ? '#f1c46a' : m === 'chama' ? '#5b2a2a' : m === 'raio' ? '#2e3b66' : m === 'vazio' ? '#2a2144' : m === 'laminas' ? '#4a3a40' : '#b7c9c4';
  const bot = dark ? '#161212' : '#efe6d2';
  const gid = `ec${hash(endingId) % 9999}`;
  let o = `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs><rect width="320" height="120" rx="14" fill="url(#${gid})"/>`;
  o += motif(m);
  o += `<rect x="1.5" y="1.5" width="317" height="117" rx="13" fill="none" stroke="${C.gold}" stroke-width="2"/><path d="M10 22V10h12M298 10h12v12M310 98v12h-12M22 110H10V98" fill="none" stroke="${C.gold}" stroke-width="2"/>`;
  return svg(320, 120, o, 'art art-ending', title);
}
