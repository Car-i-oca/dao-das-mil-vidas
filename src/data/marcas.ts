import type { Choice, Effects, GameEvent, Outcome } from '../types';
import { MARCAS_VIDA } from './marcas_vida';

/**
 * Marcas de escolha. Toda escolha deixa um rastro lido no futuro:
 *  - efeitos fortes (flag, agenda, item, técnica, local, facção, final...) contam como marca própria;
 *  - o resto alimenta o PERFIL de conduta do personagem (compaixão, violência, astúcia, cautela, ambição,
 *    disciplina, devoção, ganância), que vira alcunha, abre ou fecha opções, muda como NPCs reagem e os epitáfios.
 */
export const VIRTUDES = ['compaixao', 'violencia', 'astucia', 'cautela', 'ambicao', 'disciplina', 'devocao', 'ganancia'] as const;
export type Virtude = (typeof VIRTUDES)[number];

export const VIRTUDE_NOME: Record<Virtude, string> = {
  compaixao: 'Compaixão', violencia: 'Violência', astucia: 'Astúcia', cautela: 'Cautela',
  ambicao: 'Ambição', disciplina: 'Disciplina', devocao: 'Devoção', ganancia: 'Ganância',
};

/** Alcunha ganha ao acumular uma virtude (a de maior pontuação a partir de 10). */
export const ALCUNHA: Record<Virtude, string> = {
  compaixao: 'Mão Misericordiosa', violencia: 'Lâmina Sem Piedade', astucia: 'Raposa de Mil Planos', cautela: 'Sombra Prudente',
  ambicao: 'Faminto de Céu', disciplina: 'Rocha Imóvel', devocao: 'Coração Devoto', ganancia: 'Bolsa Sem Fundo',
};

const KEYS: [Virtude, RegExp][] = [
  ['compaixao', /\b(ajud|ced[ae]|doa|salv|proteg|perdo|poup|cur[ae]r?|acolh|devolv|divid|consol|cuid|abrig|aliment|alivi|visit|resgat|socorr|reparar|restaur)/i],
  ['violencia', /\b(atac|lut[ae]|enfrent|mat[ae]|esmag|derrot|desafi|ferir|golpe|invad|destru|elimin|captur|puni|arranc|quebr|queim|sacrific|vingan|cort[ae]r? a)/i],
  ['astucia', /\b(negoci|barganh|engan|finge|disfar|investig|planej|observ|espion|blef|trocar|propor|convenc|interrog|seguir de longe|armadilha|infiltr|falsific|sabot|esconder-se|decifr|estud[ae]r o)/i],
  ['cautela', /\b(recus|fug|evit|esper|recu|ignor|afast|esconde|partir|voltar|manter|deixar|desist|n[aã]o |sair |abandon|adiar|ficar longe|seguir adiante|seguir viagem|seguir caminho)/i],
  ['ambicao', /\b(aceit|candidat|tomar|lider|compet|assum|escalar|subir|exig|reivindic|inscrev|fundar|conquist|buscar o poder|disputar|comandar|governar|trono|cargo)/i],
  ['disciplina', /\b(medit|trein|estud|pratic|insist|jejua|repet|aprend|cultiv|aguent|resist|copi|refin|respir|recit|dedic|retiro|temper|forjar)/i],
  ['devocao', /\b(rez|oferec|oferenda|recita|agrade|jur[ae]|templo|ancestr|honr|reverenc|sutra|altar|incenso|meri|bênção|orar)/i],
  ['ganancia', /\b(vend|compr|roub|saque|lucr|furt|acumul|cobr|guardar para si|ficar com|pegar|tomar para|contrabando|subornar|propina|ficar com a)/i],
];

function fxOf(c: Choice): Outcome[] {
  return [c.res, c.ok, c.fail].filter(Boolean) as Outcome[];
}

/** Efeitos que contam como "marca própria" (rastro que o jogo lê depois). */
export function temMarca(fx?: Effects): boolean {
  if (!fx) return false;
  return !!(
    fx.setFlags?.length || fx.clearFlags?.length || fx.agenda?.length || fx.item?.length || fx.removeItem?.length || fx.tecnica?.length ||
    fx.local || fx.faccao || fx.fim || fx.tier || fx.trilha || fx.rec || fx.perfil ||
    Math.abs(fx.karma ?? 0) >= 8 || Math.abs(fx.fama ?? 0) >= 10 || (fx.corr ?? 0) >= 8 || (fx.ferida ?? 0) >= 3 ||
    Math.abs(fx.pedras ?? 0) >= 150 || Math.abs(fx.vida ?? 0) >= 40
  );
}

/** Virtude que a escolha expressa, pelo texto e pelo que ela faz. */
export function classificar(text: string, outs: Outcome[]): Virtude {
  for (const [v, re] of KEYS) if (re.test(text)) return v;
  const fx = outs.map((o) => o.fx ?? {});
  const karma = fx.reduce((a, f) => a + (f.karma ?? 0), 0);
  const pedras = fx.reduce((a, f) => a + (f.pedras ?? 0), 0);
  const comp = fx.reduce((a, f) => a + (f.stats?.comp ?? 0) + (f.stats?.dao ?? 0), 0);
  if (karma >= 2) return 'compaixao';
  if (karma <= -2) return pedras > 0 ? 'ganancia' : 'violencia';
  if (pedras > 0) return 'ganancia';
  if (comp > 0) return 'disciplina';
  return 'cautela';
}

/**
 * Dá marca a toda escolha que ainda não tem uma: acrescenta o perfil (+1 na virtude expressa) a cada resultado.
 * Escolhas com marca própria também ganham o perfil, para que a conduta sempre conte.
 */
export function marcarEscolhas(events: GameEvent[]): GameEvent[] {
  return events.map((e) => ({
    ...e,
    choices: e.choices.map((c) => {
      if (c.ex) return c; // opções exclusivas já têm marca própria e não precisam de cópia
      const outs = fxOf(c);
      if (outs.some((o) => o.fx?.perfil)) return c;
      const v = classificar(c.text, outs);
      const add = (o?: Outcome): Outcome | undefined => (o ? { ...o, fx: { ...o.fx, perfil: { [v]: 1 } } } : o);
      return { ...c, res: add(c.res), ok: add(c.ok), fail: add(c.fail) };
    }),
  }));
}

/**
 * Eventos em que todas as opções só deixam o perfil de conduta (e que não são cenas de passagem) ganham um REGISTRO:
 * cada opção grava uma flag `reg_<evento>_<n>` e, no fim da vida, a decisão aparece em "o que você deixou para trás".
 */
export function registrarSoPerfil(events: GameEvent[]): GameEvent[] {
  return events.map((e) => {
    if (e.passagem || !e.choices.length) return e;
    const soPerfil = e.choices.every((c) => {
      const outs = fxOf(c);
      return outs.length > 0 && outs.every((o) => !temMarca({ ...o.fx, perfil: undefined }));
    });
    if (!soPerfil) return e;
    return {
      ...e,
      choices: e.choices.map((c, i) => {
        const flag = `reg_${e.id}_${i + 1}`;
        MARCAS_VIDA[flag] = `Em “${e.title}”, escolheu: ${c.text.replace(/.$/, '')}.`;
        const add = (o?: Outcome): Outcome | undefined => (o ? { ...o, fx: { ...o.fx, setFlags: [...(o.fx?.setFlags ?? []), flag] } } : o);
        return { ...c, res: add(c.res), ok: add(c.ok), fail: add(c.fail) };
      }),
    };
  });
}
