/**
 * Tetos de reino (tierMax) para eventos antigos de baixo nível que valiam para quase todos os reinos.
 * Em reinos altos, o jogador já passou desses problemas: a ameaça de reinos abaixo se resolve nos eventos
 * "menor_*" (esmagar, assustar ou poupar), e o resto da vida ganha eventos próprios de cada reino.
 */
export const TETOS: Record<string, number> = {
  torneio_seita: 4, erva_espiritual: 4, leilao_pavilhao: 5, mercado_negro: 4, associacao_alquimistas: 4, cliente_alquimia: 5,
  desvio_de_qi_leve: 5, formacao_estudo: 4, treino_corpo_pesado: 4, duelo_de_espadas: 4, caldeirao_explode: 4,
  tempestade_espiritual: 5, oficina_artefatos: 5, pavilhao_medicinal: 4, cultivo_coletivo: 5, forno_da_seita: 4, secar_ervas: 4,
  guilda_mercadores: 4, juiz_do_vilarejo: 3, encomenda_assassino: 5, cacada_com_besta: 5, peregrino_enigmatico: 5, torneio_alquimia: 5,
  miragem_oasis: 5, tempestade_areia: 5, planicie_branca: 5, tempestade_no_mar: 5, viajante_congelado: 5, nomades_do_vento: 5,
  ilha_pescadores: 5, lista_negra: 5, carta_anonima: 5, bandidos_da_mina: 4, espiritos_vingativos: 5, fome_no_reino: 5,
  general_rebelde: 5, mestre_ensina_compreensao: 5, prova_do_espelho: 4, prova_do_peso: 4, prova_do_silencio: 4, pilula_envenenada: 5,
  colher_ervas_toxicas: 5, oferenda_templo: 5, fantasma_faminto: 5, bodhisattva_mendigo: 6, emboscada_bandidos: 4,
  encontro_festival: 6, boato_estalagem: 6, colheita_lua_prata: 5, alma_sonho_lucido: 5, estudo_geomancia: 5,
  dilema_do_merito: 5, banquete_aniversario: 5, minerio_celeste: 5, armadura_escamas: 5, artefato_amaldicoado: 5,
};
