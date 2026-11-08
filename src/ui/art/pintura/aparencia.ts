import { rng, hashStr } from './base';
import { PAL } from './paleta';

/**
 * Gerador de aparência por pessoa: determinístico (mesma semente = mesma cara) e serializável. Os traços não mudam com a idade:
 * a idade só acrescenta rugas, cabelo grisalho e postura, então a pessoa continua reconhecível a vida inteira.
 */
export type Genero = 'm' | 'f';
export type Marca = 'cicatriz' | 'pinta' | 'tatuagem' | 'demoniaca' | 'olho_branco' | 'sardas';
export type Acessorio = 'grampo_jade' | 'faixa' | 'brinco' | 'chapeu_palha' | 'veu' | 'mascara' | 'guan' | 'coroa' | 'turbante' | 'contas';

export interface Aparencia {
  g: Genero;
  /** 0 oval, 1 redondo, 2 quadrado, 3 longo, 4 coração. */
  rosto: number;
  /** 0 a 4: tons de pele, do claro ao escuro. */
  tez: number;
  /** 0 amendoado, 1 redondo, 2 caído, 3 estreito, 4 grande. */
  olho: number;
  /** 0 castanho, 1 preto, 2 azul, 3 verde, 4 cinza, 5 âmbar. */
  cor: number;
  /** Espessura (0 a 2) e ângulo (-1 a 2) da sobrancelha. */
  sobEsp: number; sobAng: number;
  /** 0 fino, 1 médio, 2 largo, 3 arrebitado. */
  nariz: number;
  /** 0 fina, 1 média, 2 cheia, 3 pequena. */
  boca: number;
  /** Estilo de cabelo (ver ESTILOS) e cor (ver COR_CABELO). */
  cabelo: number; corCabelo: number;
  /** 0 nada, 1 bigode, 2 cavanhaque, 3 barba curta, 4 barba longa. */
  barba: number;
  marcas: Marca[];
  acess: Acessorio[];
  /** Variante de gola/roupa (0 a 4), para que os trajes não se repitam. */
  traje: number;
}

export const ESTILOS = ['curto_bagunçado', 'liso_franja', 'medio_ondulado', 'longo_solto', 'coque_alto', 'coque_baixo', 'trança', 'topete', 'raspado', 'rabo', 'ralo_comprido', 'chanfro'] as const;
export const ESTILOS_F = [1, 2, 3, 4, 5, 6, 9, 3, 5];
export const ESTILOS_M = [0, 0, 1, 1, 2, 4, 7, 8, 9, 11, 3];
export const COR_CABELO = ['preto', 'castanho_escuro', 'castanho', 'castanho_claro', 'ruivo', 'loiro', 'prata'] as const;
export const COR_OLHO = ['#8a5a30', '#3a2e40', '#3c78c8', '#3c9a62', '#8a9ab0', '#d8a030'];

export const TEZES: string[][] = [PAL.pele as string[], PAL.pele as string[], PAL.peleEscura as string[], PAL.peleEscura as string[], PAL.peleEscura as string[]];

export function gerarAparencia(semente: string, genero: Genero, evitar: Aparencia[] = []): Aparencia {
  for (let tentativa = 0; tentativa < 8; tentativa++) {
    const ap = sortear(semente + '#' + tentativa, genero);
    if (tentativa === 7 || evitar.every((o) => distancia(ap, o) >= 6)) return ap;
  }
  return sortear(semente, genero);
}

function sortear(semente: string, g: Genero): Aparencia {
  const r = rng(hashStr(semente));
  const tez = r() < 0.55 ? r.i(0, 1) : r.i(2, 4);
  const vel = r() < 0.12;
  const marcas: Marca[] = [];
  if (r() < 0.14) marcas.push('cicatriz');
  if (r() < 0.12) marcas.push('pinta');
  if (r() < 0.06) marcas.push('tatuagem');
  if (r() < 0.14 && tez <= 1) marcas.push('sardas');
  const acess: Acessorio[] = [];
  if (r() < 0.16) acess.push('grampo_jade');
  if (r() < 0.14) acess.push('faixa');
  if (r() < 0.12) acess.push('brinco');
  if (r() < 0.05) acess.push('mascara');
  const estilo = g === 'f' ? ESTILOS_F[r.i(0, ESTILOS_F.length - 1)] : ESTILOS_M[r.i(0, ESTILOS_M.length - 1)];
  return {
    g, rosto: r.i(0, 4), tez, olho: r.i(0, 4), cor: r() < 0.7 ? (r() < 0.6 ? 0 : 1) : r.i(2, 5),
    sobEsp: r.i(0, 2), sobAng: r.i(-1, 2), nariz: r.i(0, 3), boca: r.i(0, 3),
    cabelo: estilo, corCabelo: vel ? 6 : r() < 0.5 ? r.i(0, 1) : r() < 0.7 ? r.i(2, 3) : r.i(4, 5),
    barba: g === 'm' ? (r() < 0.55 ? 0 : r.i(1, 3)) : 0,
    marcas, acess, traje: r.i(0, 4),
  };
}

/** Diferença entre duas aparências (para evitar dois personagens ativos parecidos). */
export function distancia(a: Aparencia, b: Aparencia): number {
  let d = 0;
  if (a.g !== b.g) d += 3;
  d += a.rosto !== b.rosto ? 1 : 0; d += Math.abs(a.tez - b.tez) >= 2 ? 2 : a.tez !== b.tez ? 0.5 : 0;
  d += a.olho !== b.olho ? 1 : 0; d += a.cor !== b.cor ? 0.5 : 0;
  d += a.cabelo !== b.cabelo ? 2 : 0; d += a.corCabelo !== b.corCabelo ? 1.5 : 0;
  d += a.barba !== b.barba ? 1 : 0; d += a.nariz !== b.nariz ? 0.5 : 0; d += a.boca !== b.boca ? 0.5 : 0;
  d += a.sobEsp !== b.sobEsp ? 0.5 : 0; d += a.marcas.join() !== b.marcas.join() ? 1 : 0; d += a.acess.join() !== b.acess.join() ? 1 : 0;
  return d;
}

/* ---------- Figurino: roupa por facção, trilha e status ---------- */
export type Estatuto = 'servo' | 'externo' | 'interno' | 'anciao' | 'patriarca' | 'errante' | 'mercador' | 'nobre' | 'demoniaco' | 'monge' | 'guarda' | 'campones';
export type Gola = 'cruzada' | 'redonda' | 'alta' | 'capuz' | 'ombro' | 'armadura' | 'pele' | 'camadas';

export interface Figurino {
  pano: keyof typeof PAL; forro: keyof typeof PAL; borda: keyof typeof PAL; gola: Gola; sinal: boolean;
  chapeu?: Acessorio; extra?: Acessorio[];
}

const COMBO: Record<Estatuto, [keyof typeof PAL, keyof typeof PAL, keyof typeof PAL][]> = {
  servo: [['marrom', 'branco', 'marrom'], ['cinza', 'branco', 'cinza'], ['panoVerde', 'branco', 'panoVerde']],
  campones: [['marrom', 'ocre', 'marrom'], ['panoVerde', 'marrom', 'branco'], ['ocre', 'marrom', 'marrom']],
  externo: [['azul', 'branco', 'azul'], ['panoVerde', 'branco', 'cinza'], ['cinza', 'azul', 'azul']],
  interno: [['azul', 'branco', 'cinza'], ['panoVerde', 'ocre', 'branco'], ['roxo', 'branco', 'cinza']],
  anciao: [['panoVerde', 'branco', 'ouro'], ['azul', 'branco', 'ouro'], ['marrom', 'ocre', 'ouro'], ['cinza', 'branco', 'ouro']],
  patriarca: [['vermelho', 'branco', 'ouro'], ['roxo', 'ocre', 'ouro'], ['azul', 'branco', 'ouro']],
  errante: [['marrom', 'panoVerde', 'marrom'], ['cinza', 'marrom', 'cinza'], ['panoVerde', 'marrom', 'folha']],
  mercador: [['ocre', 'vermelho', 'vermelho'], ['roxo', 'ocre', 'ouro'], ['vermelho', 'ocre', 'ocre']],
  nobre: [['roxo', 'branco', 'ouro'], ['azul', 'vermelho', 'ouro'], ['vermelho', 'branco', 'ouro']],
  demoniaco: [['tinta', 'vermelho', 'vermelho'], ['vermelho', 'tinta', 'tinta'], ['roxo', 'tinta', 'vermelho']],
  monge: [['ocre', 'vermelho', 'vermelho'], ['vermelho', 'ocre', 'ocre'], ['marrom', 'ocre', 'ocre']],
  guarda: [['cinza', 'azul', 'azul'], ['azul', 'cinza', 'cinza'], ['marrom', 'cinza', 'cinza']],
};
const GOLAS: Record<Estatuto, Gola[]> = {
  servo: ['redonda', 'cruzada'], campones: ['redonda', 'ombro'], externo: ['cruzada', 'alta'], interno: ['cruzada', 'alta', 'camadas'], anciao: ['camadas', 'cruzada'], patriarca: ['camadas', 'alta'],
  errante: ['capuz', 'cruzada', 'redonda'], mercador: ['alta', 'redonda', 'camadas'], nobre: ['camadas', 'alta'], demoniaco: ['alta', 'capuz', 'camadas'], monge: ['cruzada', 'ombro'], guarda: ['armadura', 'alta'],
};

/** Escolhe o estatuto de uma pessoa a partir do papel, da facção e do reino. */
export function estatutoDe(o: { role: string; faccaoTipo?: string; reino?: number; trilha?: string; idade?: number; status?: string }): Estatuto {
  if (o.status) return o.status as Estatuto;
  const t = o.faccaoTipo, rei = o.reino ?? 0;
  if (o.trilha === 'demoniaca' || t === 'culto' || o.role === 'inimigo') return 'demoniaco';
  if (o.trilha === 'budista') return 'monge';
  if (o.role === 'mentor') return rei >= 5 ? 'patriarca' : 'anciao';
  if (o.role === 'noivo') return t === 'imperio' ? 'nobre' : 'interno';
  if (t === 'imperio') return rei >= 3 ? 'nobre' : 'guarda';
  if (t === 'associacao') return 'mercador';
  if (t === 'seita') return rei >= 5 ? 'anciao' : rei >= 3 ? 'interno' : rei >= 1 ? 'externo' : 'servo';
  if (t === 'cla') return rei >= 2 ? 'nobre' : 'campones';
  if (o.role === 'rival') return rei >= 2 ? 'interno' : 'externo';
  if (o.role === 'discipulo') return 'externo';
  if (o.role === 'amigo') return rei >= 1 ? 'errante' : 'campones';
  return rei >= 2 ? 'errante' : 'campones';
}

export function figurinoDe(ap: Aparencia, est: Estatuto, trilha = '', salt = 0): Figurino {
  const lista = COMBO[est];
  let [pano, forro, borda] = lista[(ap.traje + salt) % lista.length];
  const golas = GOLAS[est];
  const gola = golas[(ap.traje >> 1) % golas.length];
  // a trilha tinge o traje de quem é do caminho (sem apagar o estatuto)
  const porTrilha: Record<string, keyof typeof PAL> = { sopro: 'azul', espada: 'cinza', alquimia: 'ocre', corpo: 'vermelho', alma: 'roxo', formacoes: 'panoVerde', venenos: 'folha', bestas: 'marrom' };
  if (trilha && porTrilha[trilha] && est !== 'demoniaco' && est !== 'monge' && (ap.traje % 2 === 0)) pano = porTrilha[trilha];
  const f: Figurino = { pano, forro, borda, gola, sinal: est === 'patriarca' || est === 'anciao' || est === 'nobre' };
  if (est === 'errante') f.chapeu = ap.traje % 2 ? 'chapeu_palha' : undefined;
  if (est === 'anciao' || est === 'patriarca') f.chapeu = 'guan';
  if (est === 'nobre' && ap.g === 'f') f.chapeu = 'coroa';
  if (est === 'monge') f.extra = ['contas'];
  if (est === 'mercador' && ap.traje % 3 === 0) f.chapeu = 'turbante';
  return f;
}

/** Fundo do retrato conforme o lugar ou a facção da pessoa. */
export type FundoTipo = 'floresta' | 'seita' | 'vila' | 'cidade' | 'montanha' | 'templo' | 'mar' | 'deserto' | 'gelo' | 'culto' | 'imperio' | 'mercado' | 'noite';
export function fundoDe(o: { faccaoTipo?: string; lugar?: string; estatuto?: Estatuto; corr?: number; role?: string }): FundoTipo {
  if ((o.corr ?? 0) >= 30 || o.estatuto === 'demoniaco' || o.faccaoTipo === 'culto') return 'culto';
  if (o.lugar && ['deserto', 'gelo', 'mar', 'porto', 'templo', 'mercado', 'praca', 'ponte', 'pico', 'floresta', 'vila'].includes(o.lugar)) return ({ porto: 'mar', praca: 'cidade', ponte: 'cidade', pico: 'montanha' } as Record<string, FundoTipo>)[o.lugar] ?? (o.lugar as FundoTipo);
  if (o.estatuto === 'monge') return 'templo';
  if (o.faccaoTipo === 'imperio') return 'imperio';
  if (o.faccaoTipo === 'associacao') return 'mercado';
  if (o.faccaoTipo === 'seita') return 'seita';
  if (o.faccaoTipo === 'cla') return 'vila';
  return 'floresta';
}
