import type { Molde } from '../../engine/v2/tipos';
import { INFANCIA } from './moldes/infancia';
import { DESPERTAR } from './moldes/despertar';
import { RIVAL } from './moldes/rival';
import { CLA } from './moldes/cla';
import { SEITA_ARCO } from './moldes/seita';
import { MUNDO } from './moldes/mundo';
import { EXTRAS } from './moldes/extras';
import { SUCESSAO } from './moldes/sucessao';
import { PERIGOS } from './moldes/perigos';
import { HERANCA } from './moldes/heranca';
import { COMPANHEIRO } from './moldes/companheiro';
import { DISCIPULO } from './moldes/discipulo';
import { DEMONIO } from './moldes/demonio';
import { GUERRA } from './moldes/guerra';
import { ORIGEM } from './moldes/origem';
import { TRILHAS } from './moldes/trilhas';
import { TRACOS } from './moldes/tracos';
import { REGIOES } from './moldes/regioes';

/** Todos os moldes da v2 (ver docs/eventos-v2.md). */
const CICLOS: Record<string, string> = {
  rival: 'A rivalidade ganhou outro rosto. ', amigo: 'Outra amizade, outro juramento, a mesma vida. ', discipulo: 'Outro jovem, outras mãos, e você já sabe o que ensinar e o que esconder. ', guerra: 'Outra guerra: as seitas aprendem pouco com as anteriores. ',
};
/** Arcos que podem recomeçar com outro elenco (ver renovarCiclos no diretor): valem em qualquer capítulo adulto e reconhecem a repetição. */
function ciclar(m: Molde): Molde {
  const f = m.fio?.id;
  if (!f || !CICLOS[f] || m.capitulos.includes('infancia')) return m;
  const pre = `{vez2:${CICLOS[f]}}`;
  const cena = typeof m.cena === 'string' ? pre + m.cena : m.cena.map((v) => ({ ...v, texto: pre + v.texto }));
  return { ...m, cena, capitulos: [...new Set([...m.capitulos, 'ascensao', 'crise', 'legado'])] as Molde['capitulos'] };
}
const TODOS: Molde[] = [...INFANCIA, ...DESPERTAR, ...RIVAL, ...CLA, ...SEITA_ARCO, ...MUNDO, ...EXTRAS, ...SUCESSAO, ...PERIGOS, ...HERANCA, ...COMPANHEIRO, ...DISCIPULO, ...DEMONIO, ...GUERRA, ...ORIGEM, ...TRILHAS, ...TRACOS, ...REGIOES];
/** Prefixo de "segunda vez" para moldes soltos que podem voltar. */
const REPETE: Record<string, string> = {
  desp_mestre_caminho: 'Anos depois, o mesmo convite aparece de novo, num outro ponto da estrada. ', troca_ambicao: 'De novo a sensação de que o centro da vida mudou de lugar. ',
  reacao_rompimento: 'Mais um rompimento, e o mundo repara outra vez, com menos surpresa. ', reencontro_antigo: 'Mais uma vez, um rosto do passado. ',
};
function repetir(m: Molde): Molde {
  const pre = REPETE[m.id];
  if (!pre) return m;
  const p = `{vez2:${pre}}`;
  return { ...m, cena: typeof m.cena === 'string' ? p + m.cena : m.cena.map((v) => ({ ...v, texto: p + v.texto })) };
}
export const MOLDES: Molde[] = TODOS.map(ciclar).map(repetir);
