# Impacto das escolhas, traços e cenas — Xianxia (motor v2)

Gerado por `npm run impacto -- --modo xianxia`. Calculado sobre os 171 moldes de `src/data/modos/xianxia/v2`.

## Resumo

| Métrica | Valor | Meta |
|---|---|---|
| Moldes de cena | 171 | — |
| Escolhas no jogo | 541 | — |
| Escolhas sem marca (não mudam o mundo nem deixam flag, agenda, item, local, facção, final ou efeito grande) | 142 (26%) | 0 |
| ...dessas, fora das cenas de respiro (que por desenho são curtas e sem consequência) | 95 | 0 |
| Escolhas com a mesma consequência de outra do mesmo molde | 0 | 0 |
| Moldes "tanto faz" (fora os respiros) | 27 | 0 |
| Flags gravadas e nunca lidas | 3 | 0 |
| Escolhas exclusivas por trilha / talento / defeito / origem / item | 23 / 4 / 5 / 10 / 0 | muito mais |
| Semelhança (Jaccard) entre vidas com a MESMA trilha, talento e defeito | 0.542 | referência |
| Semelhança entre vidas com a mesma trilha e talento/defeito DIFERENTES | 0.444 | bem menor que a de cima |

### Talentos (mínimo: 4 cenas próprias, 6 opções exclusivas, 1 caminho/final)

| Nome | Cenas próprias | Opções exclusivas | Caminhos/finais | OK |
|---|---|---|---|---|
| Memória Perfeita | 2 | 2 | 0 | **não** |
| Favorecido pelo Destino | 2 | 0 | 0 | **não** |
| Alma Antiga | 3 | 0 | 0 | **não** |
| Corpo Resistente | 1 | 0 | 0 | **não** |
| Presença Magnética | 1 | 0 | 0 | **não** |
| Gênio do Cultivo | 2 | 0 | 0 | **não** |
| Coração Inabalável | 1 | 1 | 0 | **não** |
| Olhar do Dao | 3 | 1 | 0 | **não** |
| Longevidade Natural | 1 | 0 | 0 | **não** |
| Predestinado | 3 | 0 | 0 | **não** |
| Passo do Vazio | 2 | 0 | 0 | **não** |
| Sangue de Dragão | 2 | 0 | 0 | **não** |
| Aprendiz Veloz | 1 | 0 | 0 | **não** |
| Faro para Tesouros | 1 | 0 | 0 | **não** |

### Defeitos (mínimo: 4 cenas próprias, 6 opções exclusivas, 1 caminho/final)

| Nome | Cenas próprias | Opções exclusivas | Caminhos/finais | OK |
|---|---|---|---|---|
| Meridianos Estreitos | 1 | 0 | 0 | **não** |
| Azar Persistente | 1 | 0 | 0 | **não** |
| Qi Instável | 1 | 0 | 0 | **não** |
| Coração Covarde | 1 | 0 | 0 | **não** |
| Constituição Frágil | 1 | 0 | 0 | **não** |
| Orgulho Ferido | 1 | 0 | 0 | **não** |
| Mente Dispersa | 1 | 0 | 0 | **não** |
| Sangue Quente | 1 | 0 | 0 | **não** |
| Mão Fechada | 1 | 0 | 0 | **não** |

### Origens (mínimo: 5 cenas próprias, 4 opções exclusivas, 1 caminho/final)

| Nome | Cenas próprias | Opções exclusivas | Caminhos/finais | OK |
|---|---|---|---|---|
| Filho de Camponeses | 0 | 0 | 0 | **não** |
| Órfão Acolhido pela Seita | 2 | 3 | 0 | **não** |
| Herdeiro de um Clã Decadente | 1 | 4 | 0 | **não** |
| Filho de Mercadores | 0 | 1 | 0 | **não** |
| Caçador das Montanhas | 0 | 0 | 0 | **não** |
| Neto de Alquimista | 1 | 0 | 0 | **não** |
| Alma Reencarnada | 2 | 0 | 0 | **não** |
| Rebento da Seita Demoníaca | 2 | 0 | 0 | **não** |
| Mendigo das Estradas | 3 | 0 | 0 | **não** |
| Príncipe(sa) Decaído(a) | 1 | 0 | 0 | **não** |
| Discípulo do Eremita | 4 | 1 | 0 | **não** |
| Pescador dos Mares Sem Fim | 0 | 0 | 0 | **não** |
| Filho de um Guarda do Reino | 0 | 3 | 0 | **não** |
| Regressor | 2 | 0 | 0 | **não** |

## Flags gravadas e nunca lidas (3)

`discipulo_externo` (despertar_centelha), `trilha_mestre` (desp_mestre_caminho), `anciao_da_seita` (seita_posto)

## Escolhas com a mesma consequência (0)

nenhuma

## Moldes "tanto faz" (27)

`rival_desafio_publico`, `cla_climax`, `seita_portao`, `seita_posto`, `morte_culpado`, `reencontro_antigo`, `perigo_tempestade`, `heranca_escolha`, `heranca_epilogo`, `comp_conflito`, `comp_escolha`, `comp_epilogo`, `disc_epilogo`, `dem_epilogo`, `guerra_epilogo`, `orig_epilogo`, `tr_espada_duelo`, `tr_alma_espelho`, `tr_alma_voz`, `tr_formacoes_linha`, `tr_formacoes_quebrada`, `tr_budista_tigela`, `tr_budista_silencio`, `tr_venenos_antidoto`, `tr_bestas_filhote`, `tr_demoniaca_divida`, `leg_viagem`

## Escolhas sem marca (142; primeiras 150)

- respiro_estrada#descansar (respiro)
- respiro_estrada#seguir (respiro)
- respiro_festival#observar (respiro)
- respiro_trabalho#escutar (respiro)
- respiro_boato#escutar (respiro)
- respiro_boato#ignorar (respiro)
- respiro_mercado#olhar (respiro)
- respiro_chuva#meditar (respiro)
- respiro_chuva#sair (respiro)
- respiro_chuva#ler (respiro)
- respiro_pico#contemplar (respiro)
- respiro_pico#treinar (respiro)
- perigo_lobo#voltar
- perigo_tempestade#remar
- perigo_tempestade#formacao
- perigo_tempestade#alma
- perigo_tempestade#nadar
- perigo_besta#recuar
- perigo_besta#fera
- perigo_besta#merito
- respiro_ponte#castanhas (respiro)
- respiro_ponte#passar (respiro)
- respiro_ponte#pensar (respiro)
- respiro_templo#oferecer (respiro)
- respiro_templo#estudar (respiro)
- respiro_templo#sair (respiro)
- respiro_ferreiro#fole (respiro)
- respiro_ferreiro#perguntar (respiro)
- respiro_ferreiro#ouvir (respiro)
- respiro_peregrinos#caminhar (respiro)
- respiro_peregrinos#ajudar (respiro)
- respiro_peregrinos#seguir (respiro)
- heranca_epilogo#segue
- comp_epilogo#segue
- disc_epilogo#segue
- dem_epilogo#segue
- guerra_epilogo#segue
- orig_epilogo#segue
- tr_sopro_cachoeira#vento
- tr_sopro_cachoeira#ajudar
- tr_sopro_impureza#lento
- tr_sopro_impureza#comprar
- tr_espada_folha#soltar
- tr_espada_folha#cortar_ar
- tr_espada_duelo#duelo
- tr_espada_duelo#observar
- tr_espada_duelo#recusar
- tr_alquimia_vigesima#ervas
- tr_alquimia_vigesima#parar
- tr_alquimia_cliente#recusar
- tr_alquimia_cliente#perguntar
- tr_corpo_ladeira#revezar
- tr_corpo_ladeira#ajudar
- tr_corpo_forja#observar
- tr_corpo_forja#recusar
- tr_alma_espelho#mergulhar
- tr_alma_espelho#perturbar
- tr_alma_espelho#esperar
- tr_alma_voz#levar
- tr_alma_voz#ignorar
- tr_alma_voz#perguntar
- tr_formacoes_linha#estudar
- tr_formacoes_linha#desenhar
- tr_formacoes_linha#contornar
- tr_formacoes_quebrada#consertar
- tr_formacoes_quebrada#provisorio
- tr_formacoes_quebrada#recusar
- tr_budista_tigela#agradecer
- tr_budista_tigela#dar
- tr_budista_tigela#voltar
- tr_budista_silencio#cumprir
- tr_budista_silencio#parcial
- tr_budista_silencio#recusar
- tr_venenos_xicara#recusar
- tr_venenos_xicara#trocar
- tr_venenos_antidoto#cura
- tr_venenos_antidoto#culpado
- tr_venenos_antidoto#ensinar
- tr_bestas_filhote#libertar
- tr_bestas_filhote#vincular
- tr_bestas_filhote#deixar
- tr_bestas_matilha#oferenda
- tr_bestas_matilha#afastar
- tr_demoniaca_preco#recusar
- tr_demoniaca_divida#contar
- tr_demoniaca_divida#negar
- tr_demoniaca_divida#reparar
- df_azar#desafiar
- df_qi_instavel#evitar
- df_meridianos#paciencia
- df_meridianos#comparar
- tl_memoria#guardar
- tl_sorte#deixar
- tl_alma_antiga#oracao
- tl_alma_antiga#sair
- tl_carisma#calar
- tl_inabalavel#estudar
- tl_olhar#calar
- tl_vida_longa#registrar
- tl_predestinado#recusar
- tl_predestinado#ignorar
- tl_passo#negociar
- tl_dragao#procurar
- mundo_ruinas#esperar
- mundo_ruinas#deixar
- mundo_ceu#calar
- mundo_ceu#perguntar
- resp_go#observar (respiro)
- resp_pescadores#remar (respiro)
- resp_pescadores#ouvir (respiro)
- resp_pescadores#devolver (respiro)
- resp_casamento#dancar (respiro)
- resp_casamento#sair (respiro)
- resp_pilulas#conversar (respiro)
- resp_pilulas#passar (respiro)
- resp_chuva_petalas#meditar (respiro)
- resp_chuva_petalas#recolher (respiro)
- resp_chuva_petalas#correr (respiro)
- resp_funeral#acompanhar (respiro)
- resp_funeral#curvar (respiro)
- resp_funeral#seguir (respiro)
- resp_cha#conversar (respiro)
- resp_cha#xicara (respiro)
- resp_estudo#dormir (respiro)
- resp_visitante#abrigar (respiro)
- resp_visitante#perguntar (respiro)
- resp_visitante#recusar (respiro)
- per_peste#fugir
- per_deslizamento#correr
- per_deslizamento#fugir
- leg_tumulos#limpar
- leg_tumulos#falar
- leg_testamento#queimar
- leg_testamento#espalhar
- leg_viagem#contar
- leg_viagem#anonimo
- leg_viagem#ficar
- leg_fundar#doar
- leg_fundar#recusar
- leg_aposentadoria#parar (respiro)
- leg_aposentadoria#receber (respiro)
- leg_aposentadoria#continuar (respiro)
