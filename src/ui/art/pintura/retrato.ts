import { PAL } from './paleta';
import { Tela, rng, pixelizar, cache, hashStr, type Rng } from './base';

/**
 * Retratos "pintados e pixelizados": busto fechado, cabeça grande e levemente fora do centro, fundo de folhagem (ou névoa),
 * luz de recorte amarela vinda da direita (cabelo e gola), contorno de tinta só onde define forma. Pintado em alta resolução,
 * reduzido para 96x96 e quantizado para a paleta fixa, sem pontilhado.
 */
export const TAM = 96;

export interface OlharP {
  seed: string;
  role: 'jogador' | 'mentor' | 'rival' | 'amigo' | 'noivo' | 'discipulo' | 'inimigo';
  /** 0 criança, 1 jovem, 2 adulto, 3 maduro, 4 ancião. */
  stage: number;
  path: string;
  tier: number;
  corr: number;
  genero: 'm' | 'f';
}

const ROUPA: Record<string, [keyof typeof PAL, keyof typeof PAL]> = {
  sopro: ['azul', 'branco'], espada: ['cinza', 'azul'], alquimia: ['ocre', 'vermelho'], corpo: ['vermelho', 'marrom'], alma: ['roxo', 'branco'],
  formacoes: ['panoVerde', 'ouro'], budista: ['ocre', 'vermelho'], venenos: ['folha', 'panoVerde'], bestas: ['marrom', 'branco'], demoniaca: ['vermelho', 'tinta'], '': ['panoVerde', 'branco'],
};
const PAPEL_ROUPA: Record<string, keyof typeof PAL> = { mentor: 'panoVerde', rival: 'vermelho', amigo: 'marrom', noivo: 'roxo', discipulo: 'azul', inimigo: 'cinza' };

function fundo(t: Tela, o: OlharP, r: Rng) {
  const nevoa = o.corr >= 30 || o.path === 'demoniaca' ? 'brasa' : o.path === 'alma' || o.role === 'inimigo' ? 'noite' : o.path === 'espada' || o.path === 'sopro' ? 'montanha' : 'floresta';
  if (nevoa === 'noite') {
    t.retangulo(0, 0, 100, 100, t.grad(0, 0, 100, 100, [[0, PAL.noite[2]], [1, PAL.noite[0]]]));
    t.folhagem(0, 0, 100, 100, [PAL.noite[1], PAL.noite[2], PAL.noite[3], PAL.roxo[0]], r, 0.8, 7);
    for (let i = 0; i < 14; i++) t.elipse(r.r(2, 98), r.r(2, 40), 0.5, 0.5, PAL.noite[4], { alpha: 0.9 });
  } else if (nevoa === 'brasa') {
    t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.roxo[0]], [1, PAL.vermelho[0]]]));
    t.folhagem(0, 0, 100, 100, [PAL.vermelho[0], PAL.vermelho[1], PAL.roxo[0], PAL.roxo[1]], r, 0.8, 7);
    for (let i = 0; i < 8; i++) t.elipse(r.r(5, 95), r.r(40, 98), r.r(2, 6), r.r(1, 3), PAL.fogo[1], { alpha: 0.5, borrao: 1.5 });
  } else if (nevoa === 'montanha') {
    t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.ceu[2]], [0.6, PAL.ceu[3]], [1, PAL.ceu[4]]]));
    t.mancha([[0, 55], [14, 38], [28, 52], [44, 30], [64, 54], [82, 36], [100, 52], [100, 100], [0, 100]], PAL.azul[2], { seed: 3, tremor: 1.5 });
    t.mancha([[0, 70], [20, 56], [40, 68], [62, 52], [84, 66], [100, 58], [100, 100], [0, 100]], PAL.folha[4], { seed: 5, tremor: 1.5 });
    t.folhagem(0, 55, 100, 45, [PAL.folha[2], PAL.folha[3], PAL.folha[4], PAL.folha[5]], r, 0.8, 5);
    for (let i = 0; i < 4; i++) t.elipse(r.r(5, 90), r.r(5, 30), r.r(8, 16), r.r(2, 4), PAL.ceu[5], { alpha: 0.85, borrao: 1 });
  } else {
    t.retangulo(0, 0, 100, 100, t.grad(0, 0, 0, 100, [[0, PAL.folha[3]], [1, PAL.folha[1]]]));
    // céu aparecendo no canto superior, como na referência
    if (r() < 0.6) t.mancha([[0, 0], [30, 0], [24, 8], [10, 14], [0, 16]], PAL.ceu[3], { seed: 9, tremor: 2 });
    t.folhagem(0, 0, 100, 100, [PAL.folha[0], PAL.folha[1], PAL.folha[2], PAL.folha[3], PAL.folha[4], PAL.folha[5]], r, 1, 6);
    t.folhagem(0, 0, 100, 100, [PAL.folha[0], PAL.folha[1], PAL.folha[2]], r, 0.35, 8);
  }
  // sombra do fundo atrás do busto, para a figura se destacar
  t.elipse(46, 62, 42, 46, PAL.folha[0], { alpha: 0.35, borrao: 4 });
}

export function pintarRetrato(o: OlharP): ReturnType<typeof pixelizar> {
  const sd = hashStr(o.seed + '|' + o.role + '|' + o.stage), r = rng(sd), t = new Tela(100, 100, 700);
  const f = o.genero === 'f', crianca = o.stage === 0, velho = o.stage >= 4, maduro = o.stage >= 3;
  const tez = [PAL.pele, PAL.pele, PAL.peleEscura][sd % 3];
  const escura = tez === PAL.peleEscura;
  const rp = o.role === 'jogador' ? ROUPA[o.path] ?? ROUPA[''] : [PAPEL_ROUPA[o.role], 'branco'] as [keyof typeof PAL, keyof typeof PAL];
  const pano = PAL[rp[0]] as string[], forro = PAL[rp[1]] as string[];
  const careca = o.path === 'budista' && o.role === 'jogador';
  const longo = f || o.role === 'noivo' || (sd >>> 5) % 7 === 0;
  const sombrio = o.role === 'inimigo' || o.role === 'rival' || o.corr >= 30;
  const corCabelo = velho ? PAL.cabeloBranco : sombrio && (sd >>> 3) % 2 ? PAL.cabeloEscuro : maduro ? PAL.cabeloBranco : (sd >>> 7) % 3 === 0 ? PAL.cabeloEscuro : PAL.cabelo;
  const claro = corCabelo === PAL.cabeloBranco || corCabelo === PAL.cabeloEscuro;
  const luzCor = o.corr >= 30 ? PAL.vermelho[3] : o.tier >= 6 ? PAL.jade[3] : PAL.luz[2];
  const cx = 46, cy = crianca ? 46 : 44;

  fundo(t, o, r);
  // brilho suave do reino atrás da cabeça (sem anéis)
  if (o.tier >= 2) t.elipse(cx + 2, cy, 34, 40, o.corr >= 30 ? PAL.vermelho[2] : o.tier >= 6 ? PAL.luz[2] : o.tier >= 4 ? PAL.azul[4] : PAL.jade[4], { alpha: 0.12 + o.tier * 0.012, borrao: 8 });
  // enquadramento fechado: a cabeça ocupa boa parte do quadro, levemente fora do centro
  t.g.save(); t.g.translate(cx * t.k, 66 * t.k); t.g.scale(1.22, 1.22); t.g.translate((-cx - 2.5) * t.k, -66 * t.k);

  // cabelo de trás (longo): massa atrás da cabeça e dos ombros
  if (!careca && (longo || velho)) {
    const base = corCabelo[2], sombra = corCabelo[1];
    t.mancha([[26, 30], [30, 18], [46, 12], [62, 18], [66, 32], [70, 60], [74, 84], [58, 82], [34, 82], [22, 84], [24, 60]], base, { seed: 11, tremor: 1.2 });
    t.mancha([[24, 40], [26, 62], [24, 84], [34, 82], [32, 56]], sombra, { seed: 12, tremor: 1, alpha: 0.9 });
  }

  // ombros e roupa (a luz de recorte vem da direita)
  t.mancha([[2, 100], [6, 88], [20, 78], [34, 73], [58, 73], [74, 78], [90, 86], [98, 100]], pano[2], { seed: 21, tremor: 1.2 });
  t.mancha([[2, 100], [6, 88], [18, 80], [30, 76], [32, 90], [24, 100]], pano[1], { seed: 22, tremor: 1 });
  t.mancha([[56, 76], [74, 78], [90, 86], [98, 100], [70, 100], [62, 88]], pano[3], { seed: 23, tremor: 1.2, alpha: 0.85 });
  // dobras: poucas manchas de sombra
  t.tinta([[14, 98], [18, 90], [24, 85]], 1.1, pano[0], 0.85);
  t.tinta([[70, 96], [66, 90], [62, 84]], 1, pano[1], 0.8);
  // pescoço
  t.mancha([[38, 60], [54, 60], [57, 76], [47, 80], [37, 76]], tez[1], { seed: 31, tremor: 0.6 });
  t.mancha([[38, 60], [46, 62], [47, 80], [37, 76]], tez[2], { seed: 32, tremor: 0.5, alpha: 0.45 });
  t.mancha([[38, 63], [55, 63], [52, 70], [41, 70]], tez[3], { seed: 33, tremor: 0.5, alpha: 0.75, borrao: 0.8 }); // sombra do queixo
  // gola e camisa por dentro (V)
  const camisa = rp[1] === 'branco' || rp[0] === rp[1] ? pano[Math.min(pano.length - 1, 4)] : forro[Math.min(2, forro.length - 1)];
  t.mancha([[36, 76], [58, 76], [47, 100], [38, 100]], camisa, { seed: 41, tremor: 0.6 });
  t.mancha([[36, 76], [46, 78], [44, 100], [38, 100]], pano[3], { seed: 42, tremor: 0.5, alpha: 0.7 });
  t.mancha([[36, 78], [28, 74], [30, 92], [44, 100], [40, 90]], pano[1], { seed: 43, tremor: 0.6 });
  t.mancha([[58, 78], [66, 74], [70, 90], [54, 100], [58, 90]], pano[2], { seed: 44, tremor: 0.6 });
  // luz de recorte na borda da gola (amarela, só do lado da luz) e contornos da roupa
  t.tinta([[58, 77], [64, 75], [68, 82], [66, 94], [58, 100]], 1.5, luzCor, 0.95);
  t.tinta([[36, 77], [30, 75], [28, 80]], 1.1, luzCor, 0.7);
  t.tinta([[36, 78], [30, 76], [29, 86], [38, 98]], 1, PAL.tinta[0], 0.9);
  t.tinta([[58, 78], [64, 82], [64, 94]], 0.9, PAL.tinta[0], 0.85);
  t.tinta([[40, 80], [44, 100]], 0.7, PAL.tinta[0], 0.7);
  t.tinta([[4, 96], [8, 88], [20, 80], [32, 75]], 1, PAL.tinta[0], 0.9);
  // acessórios por trilha/papel
  if (o.path === 'budista' && o.role === 'jogador') for (let i = 0; i < 11; i++) { const a = 0.4 + i * 0.22; t.elipse(47 + Math.cos(a + 2.4) * 11, 82 + Math.sin(a + 2.4) * 7, 1.3, 1.3, PAL.marrom[2], { alpha: 1 }); }
  if (o.path === 'espada' && o.role === 'jogador') { t.traco(78, 80, 90, 50, 2.2, PAL.marrom[1]); t.traco(76, 70, 92, 62, 1.8, PAL.ouro[2]); t.tinta([[78, 80], [90, 50]], 0.9, PAL.tinta[0], 0.8); }
  if (o.path === 'bestas' && o.role === 'jogador') t.mancha([[28, 74], [66, 74], [76, 86], [60, 84], [48, 90], [34, 84], [22, 88]], PAL.marrom[3], { seed: 45, tremor: 1.5 });

  // cabeça
  const larg = crianca ? 17 : f ? 14.5 : 15.5, alt = crianca ? 19 : 21;
  const rosto: [number, number][] = [[cx - larg + 1, cy - 12], [cx - larg * 0.6, cy - alt * 0.9], [cx, cy - alt], [cx + larg * 0.65, cy - alt * 0.9], [cx + larg, cy - 10], [cx + larg + 0.5, cy + 2], [cx + larg * 0.8, cy + 12], [cx + larg * (f ? 0.35 : 0.5), cy + alt * 0.92], [cx, cy + alt + 1.5], [cx - larg * (f ? 0.35 : 0.5), cy + alt * 0.92], [cx - larg * 0.85, cy + 11], [cx - larg - 0.5, cy + 2]];
  // orelhas
  t.mancha([[cx - larg - 1, cy - 3], [cx - larg - 4.5, cy], [cx - larg - 3.5, cy + 5], [cx - larg, cy + 5]], tez[2], { seed: 51, tremor: 0.3 });
  t.mancha([[cx + larg + 1, cy - 3], [cx + larg + 4, cy], [cx + larg + 3, cy + 5], [cx + larg, cy + 5]], tez[1], { seed: 52, tremor: 0.3 });
  t.mancha(rosto, t.grad(cx - larg, cy, cx + larg, cy, [[0, tez[2]], [0.35, tez[1]], [1, tez[0]]]), { seed: 53, tremor: 0.35 });
  // volumes: sombra do lado oposto à luz, sob o cabelo, e luz na testa e no nariz
  t.mancha([[cx - larg, cy - 4], [cx - larg * 0.4, cy - 8], [cx - larg * 0.5, cy + 10], [cx - larg * 0.3, cy + alt * 0.9], [cx - larg * 0.7, cy + 12], [cx - larg - 0.5, cy + 2]], tez[3], { seed: 54, tremor: 0.4, alpha: 0.5, borrao: 1.2 });
  t.mancha([[cx - larg, cy - 14], [cx + larg, cy - 14], [cx + larg - 2, cy - 7], [cx - larg + 2, cy - 7]], tez[4], { seed: 55, tremor: 0.4, alpha: 0.45, borrao: 1.5 });
  t.elipse(cx + 3, cy - 9, 8, 4, tez[0], { alpha: 0.55, borrao: 1.6 });
  t.elipse(cx + 2, cy + 6, 2.2, 6, tez[0], { alpha: 0.5, borrao: 0.9 });
  t.elipse(cx - 8, cy + 10, 4.4, 2.8, f || crianca ? PAL.vermelho[4] : tez[3], { alpha: f || crianca ? 0.35 : 0.3, borrao: 1.2 });
  t.elipse(cx + 8.5, cy + 10, 4.4, 2.8, f || crianca ? PAL.vermelho[4] : tez[3], { alpha: f || crianca ? 0.3 : 0.18, borrao: 1.2 });
  // luz de recorte na bochecha direita e contorno suave do rosto
  t.tinta([[cx + larg + 0.3, cy - 6], [cx + larg + 0.8, cy + 2], [cx + larg * 0.8, cy + 11]], 0.8, luzCor, 0.45);
  t.tinta([[cx - larg - 0.4, cy - 4], [cx - larg - 0.6, cy + 3], [cx - larg * 0.8, cy + 11]], 0.7, tez[5], 0.7);
  t.tinta([[cx - larg * 0.4, cy + alt * 0.95], [cx, cy + alt + 1.6], [cx + larg * 0.4, cy + alt * 0.96]], 0.7, tez[5], 0.6);

  // sinais da idade
  if (maduro) { for (const [a, b, c, d] of [[cx - 12, cy + 1, cx - 9, cy + 4], [cx + 12, cy + 1, cx + 9, cy + 4], [cx - 7, cy - 10, cx + 7, cy - 10], [cx - 6, cy + 12, cx - 5, cy + 18], [cx + 6, cy + 12, cx + 5, cy + 18]]) t.traco(a, b, c, d, 0.6, tez[4], velho ? 0.75 : 0.45); }

  // olhos: pouca informação (mancha escura, brilho e pálpebra)
  const oy = cy + 1;
  const olho = (x: number, lado: number) => {
    const tw = crianca ? 2.9 : 2.5;
    t.elipse(x, oy, tw + 0.4, 1.7, tez[3], { alpha: 0.5, borrao: 0.5 });
    t.elipse(x, oy + 0.1, tw, 1.55, o.corr >= 30 ? PAL.vermelho[1] : PAL.tinta[1]);
    t.elipse(x + lado * 0.5, oy - 0.2, 1.1, 1.1, o.corr >= 30 ? PAL.vermelho[3] : o.tier >= 5 ? PAL.ouro[2] : PAL.tinta[2], { alpha: 0.9 });
    t.elipse(x + lado * 0.9 + 0.4, oy - 0.6, 0.55, 0.55, PAL.branco[2]);
    t.tinta([[x - tw - 0.6, oy - 0.6], [x, oy - 1.9], [x + tw + 0.6, oy - 0.5]], 0.85, PAL.tinta[0], 0.95);
    if (f) t.tinta([[x + lado * (tw + 0.3), oy - 0.9], [x + lado * (tw + 1.6), oy - 1.8]], 0.6, PAL.tinta[0], 0.9);
  };
  olho(cx - 7.5, -1); olho(cx + 7.5, 1);
  // sobrancelhas
  const afiado = sombrio || o.path === 'espada' && o.role !== 'jogador';
  const bro = velho ? corCabelo[2] : corCabelo === PAL.cabelo ? PAL.cabelo[1] : corCabelo[1];
  const by = cy - 4.6;
  if (afiado) { t.tinta([[cx - 12, by - 0.4], [cx - 4, by + 1.1]], 1.1, bro, 0.95); t.tinta([[cx + 12, by - 0.4], [cx + 4, by + 1.1]], 1.1, bro, 0.95); }
  else if (o.role === 'amigo' || o.role === 'noivo' || crianca) { t.tinta([[cx - 12, by + 0.8], [cx - 4, by - 0.4]], 1, bro, 0.9); t.tinta([[cx + 12, by + 0.8], [cx + 4, by - 0.4]], 1, bro, 0.9); }
  else { t.tinta([[cx - 12, by], [cx - 4, by]], 1.05, bro, 0.9); t.tinta([[cx + 12, by], [cx + 4, by]], 1.05, bro, 0.9); }
  // nariz e boca: dois ou três pixels de cor
  t.elipse(cx + 0.5, cy + 9.4, 1.8, 1.3, PAL.nariz[0], { alpha: 0.9, borrao: 0.3 });
  t.elipse(cx - 0.4, cy + 11, 0.7, 0.5, PAL.nariz[1], { alpha: 0.9 });
  t.tinta([[cx - 2, cy + 6], [cx - 1.3, cy + 9]], 0.5, tez[4], 0.55);
  const my = cy + 15.6, labio = f ? PAL.vermelho[3] : escura ? PAL.peleEscura[3] : PAL.vermelho[2];
  if (o.role === 'amigo' || o.role === 'noivo' || crianca) { t.tinta([[cx - 3.5, my - 0.8], [cx - 1, my + 0.4], [cx + 1.5, my + 0.4], [cx + 4, my - 0.9]], 0.95, labio, 1); }
  else if (o.role === 'rival') { t.tinta([[cx - 3, my + 0.3], [cx + 1, my + 0.2], [cx + 4, my - 1.2]], 0.95, labio, 1); }
  else if (sombrio) { t.tinta([[cx - 3.4, my + 0.7], [cx, my - 0.2], [cx + 3.6, my + 0.6]], 0.95, labio, 1); t.elipse(cx, my + 0.5, 0.9, 0.5, PAL.branco[0], { alpha: 0.8 }); }
  else { t.tinta([[cx - 3, my], [cx + 3, my]], 0.9, labio, 1); }
  if (f && !sombrio) t.elipse(cx, my + 1.3, 2.4, 0.9, PAL.vermelho[4], { alpha: 0.45, borrao: 0.3 });
  // veias da corrupção
  if (o.corr >= 30) for (let i = 0; i < 4; i++) t.tinta([[cx - 12 + i, cy + 4 + i * 2.3], [cx - 9, cy + 6 + i * 2.8]], 0.5, PAL.vermelho[2], 0.8);

  // cabelo
  if (!careca) {
    const lo = corCabelo[1], md = corCabelo[2], cl = corCabelo[3], ul = corCabelo[Math.min(4, corCabelo.length - 1)];
    const franja: [number, number][] = longo
      ? [[cx - larg - 2, cy + 2], [cx - larg - 3, cy - 14], [cx - larg * 0.5, cy - alt - 4], [cx + 2, cy - alt - 6], [cx + larg * 0.8, cy - alt - 3], [cx + larg + 3, cy - 12], [cx + larg + 2, cy + 3], [cx + larg - 1, cy - 8], [cx + 6, cy - 14], [cx, cy - 8], [cx - 6, cy - 14], [cx - larg + 2, cy - 7]]
      : [[cx - larg - 3, cy + 5], [cx - larg - 4, cy - 12], [cx - larg * 0.4, cy - alt - 5], [cx + 4, cy - alt - 7], [cx + larg + 1, cy - alt - 2], [cx + larg + 4, cy - 10], [cx + larg + 2, cy + 3], [cx + larg - 2, cy - 5], [cx + 7, cy - 11], [cx + 1, cy - 6], [cx - 7, cy - 13], [cx - larg + 2, cy - 5]];
    t.mancha(franja, md, { seed: 61, tremor: 0.9 });
    // blocos de luz e de sombra
    t.mancha([[cx - larg - 3, cy + 4], [cx - larg - 3.5, cy - 10], [cx - larg * 0.5, cy - alt - 3], [cx - 3, cy - alt - 2], [cx - larg * 0.8, cy - 8]], lo, { seed: 62, tremor: 0.9, alpha: 0.95 });
    t.mancha([[cx + 2, cy - alt - 6], [cx + larg + 1, cy - alt - 2], [cx + larg + 3.5, cy - 9], [cx + larg - 3, cy - alt + 4]], cl, { seed: 63, tremor: 0.9 });
    // fios de luz amarela do lado da luz, como mechas
    const mech = claro ? [PAL.cabeloBranco[4], PAL.cabeloBranco[3]] : [PAL.luz[1], PAL.luz[2], PAL.luz[3]];
    for (let i = 0; i < 9; i++) { const ang = -0.2 - i * 0.2; const x0 = cx + 4 + Math.cos(ang) * (larg + 2), y0 = cy - 4 + Math.sin(ang) * (alt + 3); t.traco(x0, y0, x0 + r.r(-3, 2), y0 + r.r(3, 8), r.r(0.8, 1.7), r.pick(mech), 0.95); }
    for (let i = 0; i < 5; i++) t.traco(cx - 10 + i * 4, cy - alt - 3 + r.r(0, 3), cx - 11 + i * 4, cy - 11, 0.9, ul, 0.8);
    // contorno de tinta irregular só onde define forma
    t.tinta([[cx - larg - 3, cy + 5], [cx - larg - 4, cy - 10], [cx - larg * 0.4, cy - alt - 4]], 1.25, PAL.tinta[0], 0.95);
    t.tinta([[cx - larg + 2, cy - 5], [cx - 7, cy - 13], [cx + 1, cy - 6], [cx + 7, cy - 11], [cx + larg - 2, cy - 5]], 0.8, PAL.tinta[1], 0.55);
    t.tinta([[cx + 4, cy - alt - 7], [cx + larg + 1, cy - alt - 2], [cx + larg + 4, cy - 10]], 0.9, PAL.tinta[0], 0.7);
    if (!longo && !velho && !f && (sd >>> 11) % 3 === 0) { t.elipse(cx + 2, cy - alt - 9, 5.2, 4.6, md, { alpha: 1 }); t.elipse(cx + 3.4, cy - alt - 10, 3, 2.4, cl, { alpha: 0.95 }); t.tinta([[cx - 3, cy - alt - 6], [cx + 6, cy - alt - 6]], 1, PAL.tinta[0], 0.9); }
  } else {
    t.elipse(cx, cy - alt + 3, larg - 1, 6, tez[0], { alpha: 0.6, borrao: 1.5 });
  }
  // barba do ancião
  if (velho && !f) {
    t.mancha([[cx - 11, cy + 9], [cx - 5, cy + 13], [cx, cy + 12], [cx + 5, cy + 13], [cx + 11, cy + 9], [cx + 10, cy + 24], [cx, cy + 34], [cx - 9, cy + 24]], PAL.cabeloBranco[3], { seed: 71, tremor: 0.8 });
    t.mancha([[cx - 11, cy + 9], [cx - 6, cy + 14], [cx - 8, cy + 26], [cx - 9, cy + 24]], PAL.cabeloBranco[1], { seed: 72, tremor: 0.7, alpha: 0.9 });
    t.tinta([[cx - 10, cy + 12], [cx - 9, cy + 24], [cx, cy + 33]], 0.9, PAL.tinta[1], 0.7);
    t.tinta([[cx - 3, cy + 15.6], [cx + 3, cy + 15.6]], 0.8, PAL.cabeloBranco[0], 0.9);
  }
  // marcas por trilha e reino
  if (o.tier >= 5) t.mancha([[cx, cy - 12.5], [cx + 1.4, cy - 10.5], [cx, cy - 8.5], [cx - 1.4, cy - 10.5]], PAL.ouro[3], { seed: 81, tremor: 0.1 });
  if (o.path === 'formacoes' && o.role === 'jogador') { t.traco(cx - larg - 2, cy - 9, cx + larg + 2, cy - 9, 2.2, PAL.jade[2]); t.tinta([[cx - larg - 2, cy - 10.4], [cx + larg + 2, cy - 10.4]], 0.7, PAL.tinta[0], 0.8); }
  if (o.path === 'demoniaca' || o.corr >= 60) for (const lado of [-1, 1]) t.mancha([[cx + lado * 9, cy - alt - 1], [cx + lado * 12, cy - alt - 13], [cx + lado * 15, cy - alt - 2]], PAL.vermelho[2], { seed: 82 + lado, tremor: 0.3 });
  if (o.path === 'corpo' && o.role === 'jogador') t.tinta([[cx + 8, cy - 4], [cx + 12, cy + 7]], 0.8, tez[4], 0.9);

  t.g.restore();
  return pixelizar(t, TAM, TAM, { limpar: 2 });
}

export function retratoUrl(o: OlharP): string {
  return cache(`rp|${o.seed}|${o.role}|${o.stage}|${o.path}|${o.tier}|${o.corr >= 30 ? 1 : 0}|${o.genero}`, () => pintarRetrato(o));
}
