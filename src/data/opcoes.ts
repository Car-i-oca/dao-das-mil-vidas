import type { Choice, GameEvent } from '../types';
import { eventTypeOf } from './event-type';

/**
 * Opções exclusivas por traço (talento, defeito, trilha, origem, constituição, raiz, método, conduta).
 * Um MOLDE é uma escolha com condição própria (`cond`) que é acrescentada a todos os eventos de uma categoria
 * (ou a eventos específicos). Quem não tem o traço nunca vê a opção; quem tem, vê uma saída que só ele tem,
 * com consequência própria (flag lida depois, evento agendado, item, método, mudança de rumo).
 */
export type Cat = 'combate' | 'social' | 'perigo' | 'tesouro' | 'cultivo' | 'viagem';

export interface Molde {
  /** Categorias de evento que recebem a opção, ou ids de eventos. */
  alvo: Cat[] | string[];
  /** Id curto do molde (evita duplicar no mesmo evento). */
  id: string;
  /** A opção encena combate direto e só pode ser oferecida num encontro explicitamente combativo. */
  combatOnly?: boolean;
  choice: Choice;
}

const RE: Record<Cat, RegExp> = {
  combate: /duelo|emboscada|luta|lutar|fera|lobo|tigre|serpente|bandid|assassin|guerra|cerco|torneio|desafio|combate|ataque|batalha|inimigo|ca[cç]ador/i,
  social: /conversa|negoci|convite|mercador|anci[aã]o|mestre|rival|rumor|festival|taberna|alian[cç]a|casamento|pedido|encontro|visita|discuss|conselho|embaixad|banquete|recrut|emiss[aá]rio|discípulo|disc[ií]pulo|amigo|irm[aã]o/i,
  perigo: /perigo|amea[cç]a|veneno|tribula|armadilha|trai[cç]|persegui|fuga|fugir|cerco|praga|maldi|demôni|demoni|espectro|fantasma|ru[ií]nas|selo|abismo|fenda|vazio/i,
  tesouro: /tesouro|rel[ií]quia|heran[cç]a|manual|p[ií]lula|artefato|erva|mapa|leil[aã]o|roubad|ba[uú]|raro|segredo|pergaminho|mercado|loja|jade|n[uú]cleo|forja/i,
  cultivo: /medit|retiro|gargalo|\bqi\b|respira|cultiv|rompimento|ilumina|koan|mantra|sutra|forma[cç][aã]o|alquimia|caldeir|fornalha|dao/i,
  viagem: /viagem|estrada|caminho|deserto|mar |montanha|fronteira|floresta|selva|trilha|porto|cidade|vila|atravess|expedi|partir|ilha/i,
};

/** Categorias de um evento (pode ter várias), pelo conteúdo e pelas etiquetas dos testes. */
export function categorias(e: GameEvent): Cat[] {
  const txt = `${e.id} ${e.title} ${e.text}`;
  const cats = new Set<Cat>();
  const tags = e.choices.map((c) => c.check?.tag).filter(Boolean);
  if (tags.includes('combate') || e.combate) cats.add('combate');
  if (tags.includes('fuga')) cats.add('perigo');
  if (tags.some((t) => t === 'qi' || t === 'mente' || t === 'formacao' || t === 'alquimia')) cats.add('cultivo');
  for (const c of Object.keys(RE) as Cat[]) if (RE[c].test(txt)) cats.add(c);
  return [...cats];
}

/** Eventos que nunca recebem opções extras (cenas de transição, finais, aberturas de era). */
function elegivel(e: GameEvent): boolean {
  if ((e.weight ?? 1) === 0 && !e.once) return false;
  if (e.id.startsWith('mundo_') || e.id.startsWith('marco_') || e.id.startsWith('og_') || e.id.startsWith('npc_')) return false;
  if (e.choices.length < 2) return false;
  if (e.passagem) return false;
  return true;
}

export function aplicarMoldes(events: GameEvent[], moldes: Molde[]): GameEvent[] {
  const porId = new Map<string, Molde[]>();
  for (const m of moldes) for (const a of m.alvo as string[]) {
    if (['combate', 'social', 'perigo', 'tesouro', 'cultivo', 'viagem'].includes(a)) continue;
    (porId.get(a) ?? porId.set(a, []).get(a)!).push(m);
  }
  return events.map((e) => {
    if (eventTypeOf(e) === 'narrative' && e.choices.length > 0 && e.allowGlobalTraits !== true) return e;
    if (!elegivel(e) && !porId.has(e.id)) return e;
    const cats = categorias(e);
    const combatContext = !!e.combate || e.choices.some((choice) => !choice.ex && choice.check?.tag === 'combate');
    const extra: Choice[] = [];
    const usados = new Set<string>();
    for (const m of moldes) {
      if (usados.has(m.id)) continue;
      const alvos = m.alvo as string[];
      const porCat = alvos.some((a) => (cats as string[]).includes(a));
      const porEv = alvos.includes(e.id);
      const combatOnly = m.combatOnly || (m.choice.check?.tag === 'combate' && (m.alvo as string[]).includes('combate'));
      if ((porCat || porEv) && (!combatOnly || combatContext)) {
        usados.add(m.id);
        const choice = m.choice.cond?.root
          ? { ...m.choice, cond: { ...m.choice.cond, tierMin: Math.max(1, m.choice.cond.tierMin ?? 0) } }
          : m.choice;
        extra.push({ ...choice, ex: true, ...(combatOnly ? { requiresEventType: 'combat' as const } : {}) });
      }
    }
    return extra.length ? { ...e, choices: [...e.choices, ...extra] } : e;
  });
}
