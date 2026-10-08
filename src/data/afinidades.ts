import type { Cat } from './opcoes';

/**
 * Afinidades: cada talento, defeito, origem, trilha, raiz e constituição puxa para o personagem os acontecimentos
 * do seu tipo (e afasta os que não combinam). É isto que faz duas vidas com traços diferentes verem eventos diferentes.
 * Os multiplicadores de todos os traços do personagem se combinam (limitados a 0,3 e 4) no peso do evento.
 */
type A = Partial<Record<Cat, number>>;

export const AFINIDADES: Record<string, A> = {
  // Talentos
  memoria_perfeita: { treino: 1.8, tesouro: 1.5, combate: 0.7 },
  sorte_destino: { tesouro: 1.8, viagem: 1.5, perigo: 0.8 },
  alma_antiga: { treino: 1.7, perigo: 1.3, social: 0.8 },
  corpo_resistente: { combate: 1.8, perigo: 1.4, treino: 0.8 },
  carisma_nato: { social: 2.2, viagem: 1.2, treino: 0.7 },
  mestre_nato: { treino: 2.0, combate: 0.8 },
  coracao_inabalavel: { perigo: 1.8, treino: 1.4, social: 0.8 },
  olhar_dao: { perigo: 1.4, social: 1.4, tesouro: 1.3 },
  vida_longa: { treino: 1.5, viagem: 1.5, combate: 0.8 },
  predestinado: { perigo: 1.6, social: 1.4, tesouro: 1.2 },
  passo_vazio: { viagem: 2.0, perigo: 1.5, social: 0.8 },
  sangue_dragao: { combate: 2.0, viagem: 1.3, social: 0.8 },
  aprendiz_veloz: { treino: 1.6, social: 1.4, tesouro: 1.3 },
  olfato_tesouro: { tesouro: 2.3, viagem: 1.5, combate: 0.7 },
  // Defeitos
  meridianos_estreitos: { treino: 1.5, tesouro: 1.2, combate: 0.8 },
  azar: { perigo: 1.8, viagem: 1.3, tesouro: 0.6 },
  qi_instavel: { perigo: 1.6, treino: 1.5, social: 0.8 },
  covarde: { perigo: 1.6, social: 1.2, combate: 0.6 },
  doente: { perigo: 1.4, social: 1.2, viagem: 0.7 },
  orgulhoso: { social: 1.7, combate: 1.5, tesouro: 0.8 },
  distraido: { social: 1.4, tesouro: 1.3, treino: 0.6 },
  impulsivo: { combate: 2.0, perigo: 1.4, treino: 0.7 },
  avarento: { tesouro: 2.0, social: 1.3, combate: 0.8 },
  // Origens
  campones: { viagem: 1.3, social: 1.1, tesouro: 0.8 },
  orfao_seita: { treino: 1.4, social: 1.2 },
  cla_decadente: { social: 1.8, tesouro: 1.3 },
  mercador: { tesouro: 1.8, social: 1.5, combate: 0.8 },
  cacador: { viagem: 1.8, combate: 1.5 },
  herdeiro_alquimista: { treino: 1.6, tesouro: 1.5 },
  alma_reencarnada: { treino: 1.5, perigo: 1.3 },
  filho_demonio: { combate: 1.6, perigo: 1.5, social: 0.8 },
  mendigo_iluminado: { viagem: 1.6, social: 1.3, tesouro: 0.7 },
  principe_decaido: { social: 1.8, perigo: 1.3 },
  discipulo_eremita: { treino: 1.8, viagem: 1.2, social: 0.7 },
  pescador_mares: { viagem: 1.8, perigo: 1.4 },
  filho_guarda: { combate: 1.6, social: 1.2 },
  regressor: { perigo: 1.3, tesouro: 1.4, treino: 1.2 },
  // Trilhas
  sopro: { treino: 1.3 },
  espada: { combate: 1.5 },
  alquimia: { tesouro: 1.4, treino: 1.3 },
  corpo: { combate: 1.5 },
  alma: { perigo: 1.3, social: 1.2 },
  formacoes: { tesouro: 1.4, perigo: 1.2 },
  budista: { social: 1.3, treino: 1.2 },
  venenos: { social: 1.2, combate: 1.2 },
  bestas: { viagem: 1.5 },
  demoniaca: { combate: 1.4, perigo: 1.3 },
  // Raízes (tipo e elemento) e constituições
  unica: { treino: 1.3 }, mutante: { perigo: 1.3, tesouro: 1.2 }, caotica: { perigo: 1.2, treino: 0.8 },
  Fogo: { combate: 1.3 }, Água: { viagem: 1.2, treino: 1.1 }, Terra: { perigo: 1.2 }, Madeira: { treino: 1.2, tesouro: 1.1 }, Metal: { combate: 1.2, tesouro: 1.1 },
  Raio: { perigo: 1.4, combate: 1.2 }, Gelo: { perigo: 1.2, treino: 1.2 }, Vento: { viagem: 1.4 },
  yin_puro: { treino: 1.4 }, ossos_dragao: { combate: 1.5 }, corpo_espada: { combate: 1.5 }, caos: { perigo: 1.4, treino: 1.3 }, veias_quebradas: { treino: 1.3, perigo: 1.3 }, jade_eterno: { social: 1.5, viagem: 1.2 },
};
