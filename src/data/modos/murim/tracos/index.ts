import type { Choice, GameEvent } from '../../../../types';
import { leitura } from '../perfil';
import type { ConjuntoTraco, OpT } from './tipos';
import { SORTE_DESTINO } from './sorte_destino';
import { ALMA_ANTIGA } from './alma_antiga';
import { CORPO_RESISTENTE } from './corpo_resistente';
import { CARISMA_NATO } from './carisma_nato';
import { MESTRE_NATO } from './mestre_nato';
import { CORACAO_INABALAVEL } from './coracao_inabalavel';
import { OLHAR_DAO } from './olhar_dao';
import { VIDA_LONGA } from './vida_longa';
import { PREDESTINADO } from './predestinado';
import { PASSO_VAZIO } from './passo_vazio';
import { SANGUE_DRAGAO } from './sangue_dragao';
import { APRENDIZ_VELOZ } from './aprendiz_veloz';
import { OLFATO_TESOURO } from './olfato_tesouro';
import { MERIDIANOS_ESTREITOS } from './meridianos_estreitos';
import { AZAR } from './azar';
import { QI_INSTAVEL } from './qi_instavel';
import { COVARDE } from './covarde';

const CONJUNTOS: ConjuntoTraco[] = [SORTE_DESTINO, ALMA_ANTIGA, CORPO_RESISTENTE, CARISMA_NATO, MESTRE_NATO, CORACAO_INABALAVEL, OLHAR_DAO, VIDA_LONGA, PREDESTINADO, PASSO_VAZIO, SANGUE_DRAGAO, APRENDIZ_VELOZ, OLFATO_TESOURO, MERIDIANOS_ESTREITOS, AZAR, QI_INSTAVEL, COVARDE];

function aplica(op: OpT): Choice {
  const { p, ...c } = op;
  const perfil = leitura(p);
  const add = (o?: Choice['res']) => (o ? { ...o, fx: { ...(o.fx ?? {}), perfil: { ...(o.fx?.perfil ?? {}), ...perfil } } } : undefined);
  return { ...c, res: add(c.res), ok: add(c.ok), fail: add(c.fail) };
}

/** Junta as cenas e as opções exclusivas dos talentos, defeitos e origens do Murim (cada traço em seu arquivo). */
export function comTracos(base: GameEvent[]): GameEvent[] {
  const extras: Record<string, Choice[]> = {};
  const novos: GameEvent[] = [];
  for (const c of CONJUNTOS) {
    for (const e of c.eventos) novos.push({ ...e, type: 'narrative', choices: e.choices.map(aplica) });
    for (const [id, ops] of Object.entries(c.opcoes)) (extras[id] ??= []).push(...ops.map(aplica));
  }
  const ids = new Set(base.map((e) => e.id));
  for (const id of Object.keys(extras)) if (!ids.has(id)) throw new Error(`traço Murim: cena comum inexistente "${id}"`);
  return [...base.map((e) => (extras[e.id] ? { ...e, choices: [...e.choices, ...extras[e.id]] } : e)), ...novos];
}
