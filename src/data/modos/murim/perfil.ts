import type { Effects, GameEvent, Outcome } from '../../../types';

/**
 * Perfil de conduta do Murim, ESCRITO À MÃO opção por opção (nada é classificado por texto).
 * Cada linha é um evento; cada item é a opção de mesmo índice. Letras: C compaixão, V violência, A astúcia, T cautela,
 * M ambição, D disciplina, O devoção, G ganância; o número é o peso (padrão 1). Ex.: 'C2 D' = compaixão +2, disciplina +1.
 * Eixos e limiares: docs/alcunhas.md.
 */
const EIXO: Record<string, string> = { C: 'compaixao', V: 'violencia', A: 'astucia', T: 'cautela', M: 'ambicao', D: 'disciplina', O: 'devocao', G: 'ganancia' };

const TABELA: Record<string, string[]> = {
  murim_dia_comum: ['C', 'D', 'A'],
  murim_ferro_inicio: ['C', 'A T', 'D', 'D A'],
  murim_ferro_recado: ['A D', 'D', 'G2'],
  murim_escola: ['D M', 'D2', 'C', 'O2', 'A', 'T', 'D'],
  murim_armazem: ['A M', 'A2', 'T', 'A D'],
  murim_refugiados: ['C2', 'C2', 'D'],
  murim_torneio: ['D M', 'A D', 'G2', 'D A'],
  murim_conselho: ['D C', 'V M', 'T G', 'D2'],
  murim_mercado: ['D', 'A', 'T'],
  murim_mestra: ['D T', 'D A', 'M V'],
  murim_dilema: ['A D', 'C D', 'T'],
  murim_ataque: ['C V', 'A C', 'G T'],
  murim_arquivo: ['C2', 'D', 'C'],
  murim_julgamento: ['C M', 'C T', 'V M', 'C D'],
  murim_refeicao: ['C', 'C', 'T'],
  murim_carta: ['M', 'A', 'T'],
  murim_casa_cha: ['D', 'A', 'V M'],
  murim_nomes: ['C D', 'A', 'T', 'C2 D'],
  murim_final_vida: ['C O', 'D2', 'O T', 'T'],
  murim_peregrinos: ['D', 'O2', 'C D'],
  murim_festival: ['C', 'A M', 'C'],
  murim_punicao: ['A D', 'D', 'A C'],
  murim_inverno: ['D C', 'C2', 'T'],
  murim_duelo_ponte: ['D V', 'A', 'C T'],
  murim_ancora: ['M D', 'C O', 'C D'],
  murim_vida_comum: ['M', 'C', 'T'],
  murim_retorno: ['C D', 'D', 'T'],
  murim_assassino: ['D C', 'A C', 'D A'],
  murim_ponte_reparo: ['C D', 'G', 'T'],
  murim_heranca_final: ['C D', 'T2', 'M'],
  murim_estilos_errantes: ['D', 'A', 'C D', 'C A', 'T D'],
  murim_pos_conselho: ['C2', 'A D', 'T'],
  murim_assembleia: ['C', 'M D', 'D'],
  murim_escola_aberta: ['C O', 'A D', 'C T'],
  murim_rota_guardiao: ['C D', 'C D', 'D A'],
  murim_metodo_aberto: ['C D', 'T', 'C'],
  mem_aula: ['D', 'T', 'M A'],
  mem_escriba: ['D G', 'A D', 'T'],
  mem_testemunho: ['D C', 'D C', 'T2', 'A D'],
  mem_peso: ['D2', 'O D', 'T'],
};

function leitura(codigo: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const parte of codigo.split(' ')) {
    const eixo = EIXO[parte[0]];
    if (!eixo) throw new Error(`perfil Murim: letra desconhecida em "${codigo}"`);
    out[eixo] = (out[eixo] ?? 0) + (parte.length > 1 ? Number(parte.slice(1)) : 1);
  }
  return out;
}

/** Soma o perfil escrito em TABELA ao efeito de cada resultado da opção. Evento fora da tabela fica como está. */
export function comPerfil(events: GameEvent[]): GameEvent[] {
  return events.map((e) => {
    const linha = TABELA[e.id];
    if (!linha) return e;
    return {
      ...e,
      choices: e.choices.map((c, i) => {
        if (!linha[i]) return c;
        const perfil = leitura(linha[i]);
        const add = (o?: Outcome): Outcome | undefined => (o ? { ...o, fx: { ...(o.fx as Effects | undefined), perfil: { ...(o.fx?.perfil ?? {}), ...perfil } } } : o);
        return { ...c, res: add(c.res), ok: add(c.ok), fail: add(c.fail) };
      }),
    };
  });
}
export const IDS_COM_PERFIL = Object.keys(TABELA);
