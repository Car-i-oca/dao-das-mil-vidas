import type { GameEvent } from '../types';

/** Categorias usadas para ajustar a frequência dos eventos ao personagem. */
export type Cat = 'combate' | 'social' | 'perigo' | 'tesouro' | 'treino' | 'viagem';

const RE: Record<Cat, RegExp> = {
  combate: /duelo|emboscada|luta|lutar|fera|lobo|tigre|serpente|bandid|assassin|guerra|cerco|torneio|desafio|combate|ataque|batalha|inimigo|ca[cç]ador/i,
  social: /conversa|negoci|convite|mercador|anci[aã]o|mestre|rival|rumor|festival|taberna|alian[cç]a|casamento|pedido|encontro|visita|discuss|conselho|embaixad|banquete|recrut|emiss[aá]rio|discípulo|disc[ií]pulo|amigo|irm[aã]o/i,
  perigo: /perigo|amea[cç]a|veneno|tribula|armadilha|trai[cç]|persegui|fuga|fugir|cerco|praga|maldi|demôni|demoni|espectro|fantasma|ru[ií]nas|selo|abismo|fenda|vazio/i,
  tesouro: /tesouro|rel[ií]quia|heran[cç]a|manual|p[ií]lula|artefato|erva|mapa|leil[aã]o|roubad|ba[uú]|raro|segredo|pergaminho|mercado|loja|jade|n[uú]cleo|forja/i,
  treino: /trein|pratic|postura|respira|t[eé]cnica|disciplina|escola marcial|forma[cç][aã]o/i,
  viagem: /viagem|estrada|caminho|deserto|mar |montanha|fronteira|floresta|selva|trilha|porto|cidade|vila|atravess|expedi|partir|ilha/i,
};

/** Categorias de um evento (pode ter várias), pelo conteúdo e pelas etiquetas dos testes. */
export function categorias(e: GameEvent): Cat[] {
  const txt = `${e.id} ${e.title} ${e.text}`;
  const cats = new Set<Cat>();
  const tags = e.choices.map((c) => c.check?.tag).filter(Boolean);
  if (tags.includes('combate') || e.combate) cats.add('combate');
  if (tags.includes('fuga')) cats.add('perigo');
  if (tags.some((t) => t === 'treino' || t === 'mente' || t === 'formacao')) cats.add('treino');
  for (const c of Object.keys(RE) as Cat[]) if (RE[c].test(txt)) cats.add(c);
  return [...cats];
}
