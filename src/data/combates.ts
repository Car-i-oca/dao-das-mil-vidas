/**
 * Identidade e arte dos oponentes mostrados antes da resolução de um encontro por dados.
 */
export interface Foe {
  id: string;
  name: string;
  /** Golpes do oponente (nomes mostrados na tela). */
  moves: string[];
  /** Golpe final quando ele vence. */
  finisher: string;
  /** Frase de derrota dele. */
  down: string;
  scene: string;
}

export const FOES: Foe[] = [
  { id: 'bandido', name: 'Bandido', moves: ['Facão Torto', 'Chute Sujo', 'Golpe de Cabo', 'Poeira nos Olhos'], finisher: 'Estocada Covarde', down: 'cai de joelhos, largando o facão', scene: 'selva' },
  { id: 'assassino', name: 'Assassino', moves: ['Agulha na Sombra', 'Corte Silencioso', 'Passo Fantasma', 'Veneno na Lâmina'], finisher: 'Lâmina Entre as Costelas', down: 'desaparece em fumaça, ferido', scene: 'cidade' },
  { id: 'cultivador', name: 'Cultivador Rival', moves: ['Palma de Qi', 'Espada Voadora', 'Selo Rápido', 'Onda de Energia'], finisher: 'Estrela Cadente', down: 'recua, ofegante, com o orgulho ferido', scene: 'seita' },
  { id: 'monge', name: 'Monge Guerreiro', moves: ['Punho do Vajra', 'Bastão Sagrado', 'Chute do Tigre', 'Palma da Montanha'], finisher: 'Golpe do Mérito', down: 'junta as mãos e se curva', scene: 'montanha' },
  { id: 'demonio', name: 'Demônio do Culto', moves: ['Garra de Sangue', 'Chama Negra', 'Grito do Abismo', 'Mão Corrompida'], finisher: 'Devorar Alma', down: 'se desfaz em fumaça escarlate', scene: 'submundo' },
  { id: 'espectro', name: 'Espectro', moves: ['Toque Gélido', 'Lamento', 'Mão de Névoa', 'Medo Antigo'], finisher: 'Abraço dos Mortos', down: 'dissipa-se num sussurro', scene: 'ruinas' },
  { id: 'lobo', name: 'Lobo Espiritual', moves: ['Mordida', 'Salto Predador', 'Uivo', 'Garras Prateadas'], finisher: 'Cerco da Matilha', down: 'foge ganindo para a mata', scene: 'selva' },
  { id: 'serpente', name: 'Serpente de Escamas', moves: ['Chicote de Cauda', 'Presas de Jade', 'Enrolar', 'Jato Venenoso'], finisher: 'Constrição', down: 'afunda, sibilando', scene: 'mar' },
  { id: 'golem', name: 'Guardião de Pedra', moves: ['Punho de Rocha', 'Pisão', 'Muralha Viva', 'Avalanche'], finisher: 'Esmagamento', down: 'racha ao meio e desaba', scene: 'ruinas' },
  { id: 'tigre', name: 'Tigre de Listras Brancas', moves: ['Garrada', 'Salto do Tigre', 'Rugido', 'Mordida Fatal'], finisher: 'Bote Final', down: 'recua, rosnando', scene: 'montanha' },
  { id: 'dragao', name: 'Dragão Jovem', moves: ['Sopro de Fogo', 'Cauda de Trovão', 'Garras de Nuvem', 'Rugido do Céu'], finisher: 'Tempestade Dragônica', down: 'sobe aos céus, vencido', scene: 'ceu' },
  { id: 'raio', name: 'Tribulação do Céu', moves: ['Raio Roxo', 'Trovão Duplo', 'Chuva de Faíscas', 'Fúria das Nuvens'], finisher: 'Raio Final', down: 'dispersa-se em nuvens calmas', scene: 'ceu' },
  { id: 'chefe_selva', name: 'Tigre Ancião das Raízes', moves: ['Garras de Raiz', 'Bote do Guardião', 'Uivo da Floresta', 'Cauda Sísmica'], finisher: 'Devorar o Núcleo', down: 'cai, e a floresta enfim volta a respirar', scene: 'selva' },
  { id: 'guardiao_ferro', name: 'Guardião da Forja Invernal', moves: ['Martelo de Geada', 'Círculo de Escamas', 'Estilhaço de Qi', 'Investida de Aço'], finisher: 'Nevasca de Ferro', down: 'se ajoelha e deixa o núcleo cair na neve', scene: 'gelo' },
  { id: 'rival_seita', name: 'Rival do Pavilhão Interno', moves: ['Palma de Qi', 'Lâmina Espelhada', 'Selo de Duelo', 'Passo da Nuvem'], finisher: 'Método Final do Pavilhão', down: 'saúda você com respeito e aceita a derrota', scene: 'seita' },
];

export const FOE: Record<string, Foe> = Object.fromEntries(FOES.map((f) => [f.id, f]));

/**
 * Escolhe o tipo de oponente de um evento. Prioridade: campo `combate` do evento, tabela explícita,
 * palavras-chave no id, título e texto.
 */
export const COMBATE_EVENTOS: Record<string, string> = {
  menor_bandidos: 'bandido', emboscada_bandidos: 'bandido', menor_assassino: 'assassino', encomenda_assassino: 'assassino',
  menor_fera: 'lobo', fera_na_floresta: 'lobo', r1_fera_na_floresta: 'lobo', r3_cacada_nucleo: 'tigre', r6_demonio_do_vazio: 'demonio',
  raio_roxo: 'raio', tribulacao_do_coracao: 'raio', mt_macaco_pedra: 'golem', mt_quatro_guardioes: 'tigre', mt_raposa_nove: 'espectro',
  mt_fantasma_noiva: 'espectro', rival_vinganca_final: 'assassino', cacador_recompensas: 'bandido', reino_nevoa_entrada: 'golem',
  missao_do_registro: 'lobo', duelo_de_rua: 'bandido', tumba_do_general: 'espectro', conclave_grandes: 'monge', erva_disputada: 'bandido',
  reino_secreto: 'golem', og_cacador_primeira: 'tigre', recrutador_exercito: 'bandido', jovem_mestre_na_cidade: 'assassino', mt_espirito_montanha: 'espectro',
  og_guarda_capitao: 'bandido', og_guarda_patrulha: 'bandido', jh_escolta: 'bandido', jh_taberna_espioes: 'assassino', jh_cla_veneno: 'assassino',
  jh_cozinheiro: 'monge', jh_mestre_escondido: 'monge', guerra_linha_de_frente: 'cultivador', mare_muralha: 'lobo', mare_besta_rei: 'dragao',
  r4_veneno_na_ceia: 'assassino', r2_missao_perigosa: 'bandido', r2_rival_do_patio: 'cultivador', r3_duelo_por_cargo: 'monge',
  r5_cerco_fortaleza: 'demonio', r6_fenda: 'demonio', r6_tempestade_vazio: 'raio', r7_guerra_dos_ceus: 'dragao', r4_expedicao_ruinas: 'golem', jh_duelo_na_ponte: 'cultivador', menor_duelista: 'cultivador', r5_desafio_patriarca: 'cultivador',
  r5_besta_ancestral: 'dragao', r8_guardiao_porta: 'golem', r7_inimigo_final: 'cultivador', npc_rival_2: 'cultivador', npc_rival_5: 'cultivador',
  npc_inim_3: 'assassino', r4_cacador_recompensas: 'assassino', r5_emissario_do_culto: 'demonio', jh_viuva_negra: 'assassino',
};

const KEYS: [RegExp, string][] = [
  [/tribula|raio|trov[aã]o/i, 'raio'], [/drag[aã]o/i, 'dragao'], [/serpente|cobra|mar |kraken|enguia/i, 'serpente'], [/lobo|matilha|raposa/i, 'lobo'],
  [/tigre|leopardo|urso/i, 'tigre'], [/fera|besta/i, 'lobo'], [/golem|guardi[aã]o de pedra|est[aá]tua|montanha que anda/i, 'golem'],
  [/fantasma|espectro|esp[ií]rito vingativo|noiva/i, 'espectro'], [/demoni|culto|sangue|corrompid/i, 'demonio'], [/assassin|espi[aã]o|ladr[aã]o/i, 'assassino'],
  [/bandid|salteador|emboscada|ladr/i, 'bandido'], [/monge|templo|vajra/i, 'monge'], [/duelo|torneio|rival|espadachim|patriarca|desafi/i, 'cultivador'],
];

export function foeFor(id: string, title: string, text: string, explicit?: string): string {
  if (explicit && FOE[explicit]) return explicit;
  if (COMBATE_EVENTOS[id]) return COMBATE_EVENTOS[id];
  for (const [re, f] of KEYS) if (re.test(id) || re.test(title)) return f;
  for (const [re, f] of KEYS) if (re.test(text)) return f;
  return 'cultivador';
}
