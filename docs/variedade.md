# Diagnóstico de variedade

Gerado por `npm run variedade -- 3000` em 2026-10-03 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Comparação **antes → depois** em relação ao baseline (`docs/variedade.baseline.json`).

## Resumo

| Métrica | Valor |
|---|---|
| Eventos no jogo | 427 → **689** |
| Eventos (turnos) por vida | 58.1 → **89.1** |
| Eventos distintos por vida | 49.3 → **85.1** |
| Parcela de ocorrências repetidas na mesma vida | 15.2% → **4.6%** |
| Parcela dos turnos ocupada por eventos genéricos | 42.4% → **26.1%** |
| Eventos distintos em 10 vidas seguidas | 211 → **339** |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.162 → **0.184** |
| Final mais comum | Mestre Respeitado: 71.8% → **30.4%** |
| Entropia dos finais (bits; maior = mais variado) | 1.48 → **3.21** |
| Finais com 1% ou mais das vidas | 5 → **10** |
| Idade média ao morrer | 634 → **534** anos |

Eventos por vida: p10 34 · mediana 83 · p90 146. Distintos: p10 34 · mediana 81 · p90 136.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Mestre Respeitado | 911 | 30.4% |
| O Sábio da Montanha | 471 | 15.7% |
| Cinzas da Tribulação | 406 | 13.5% |
| Fim em Paz | 293 | 9.8% |
| Morte em Combate | 250 | 8.3% |
| Desvio de Qi | 186 | 6.2% |
| Vida Comum | 127 | 4.2% |
| Caído na Guerra | 65 | 2.2% |
| Caçado pelo Culto | 44 | 1.5% |
| A Febre da Praga | 30 | 1.0% |
| Caminho Demoníaco | 29 | 1.0% |
| Ascensão | 28 | 0.9% |
| A Casa Cheia | 28 | 0.9% |
| A Roda do Samsara | 25 | 0.8% |
| Engolido pela Maré de Bestas | 20 | 0.7% |
| Exilado Para Sempre | 20 | 0.7% |
| O Eremita das Nuvens | 16 | 0.5% |
| O Veterano das Cicatrizes | 16 | 0.5% |
| Fundador de Seita | 7 | 0.2% |
| A Iluminação | 6 | 0.2% |
| Sacrifício Final | 5 | 0.2% |
| O Velho Esquecido | 5 | 0.2% |
| O Rancor Que Sobrou | 4 | 0.1% |
| Fio Vermelho | 2 | 0.1% |
| Guardião do Reino Secreto | 2 | 0.1% |
| Oficial da Corte Celeste | 2 | 0.1% |
| Perdido no Vazio | 1 | 0.0% |
| A Sombra do Trono | 1 | 0.0% |
| A Dívida Cobrada | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Fortuna Que Ficou | 0 | 0.0% |
| Punhal nas Costas | 0 | 0.0% |
| Morto em Duelo de Honra | 0 | 0.0% |

## Os 30 eventos que mais se repetem dentro de uma mesma vida

Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.

| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |
|---:|---|---:|---:|:---:|
| 1 | `mundo_guerra_inicio` | 0.21 | 15.1% | sim |
| 2 | `mundo_mare_inicio` | 0.19 | 14.2% | sim |
| 3 | `lenda_de_eco` | 0.15 | 12.8% |  |
| 4 | `meditacao_profunda` | 0.14 | 12.4% | sim |
| 5 | `mundo_dinastia_inicio` | 0.12 | 9.5% | sim |
| 6 | `mundo_reino_inicio` | 0.12 | 9.3% | sim |
| 7 | `mundo_festivais_inicio` | 0.12 | 9.5% | sim |
| 8 | `mundo_praga_inicio` | 0.11 | 9.1% | sim |
| 9 | `dia_comum` | 0.11 | 5.0% | sim |
| 10 | `rotina_mortal` | 0.10 | 6.4% | sim |
| 11 | `mundo_culto_inicio` | 0.10 | 7.9% | sim |
| 12 | `missao_do_registro` | 0.08 | 6.0% |  |
| 13 | `mundo_cometa_inicio` | 0.08 | 6.4% | sim |
| 14 | `gargalo_longo` | 0.07 | 6.4% | sim |
| 15 | `retiro_fechado` | 0.07 | 6.4% | sim |
| 16 | `menor_bandidos` | 0.05 | 5.2% | sim |
| 17 | `jardim_lotos` | 0.04 | 4.2% | sim |
| 18 | `expedicao_longe` | 0.04 | 4.0% | sim |
| 19 | `partir_viagem` | 0.04 | 4.1% | sim |
| 20 | `menor_jovem_mestre` | 0.04 | 3.9% | sim |
| 21 | `oferenda_templo` | 0.04 | 3.9% |  |
| 22 | `menor_duelista` | 0.03 | 3.2% | sim |
| 23 | `mantra_cem_mil` | 0.03 | 3.2% | sim |
| 24 | `encontro_festival` | 0.03 | 3.2% |  |
| 25 | `doenca_da_aldeia` | 0.03 | 3.0% | sim |
| 26 | `boato_estalagem` | 0.03 | 2.8% |  |
| 27 | `tesouro_roubado` | 0.03 | 2.9% |  |
| 28 | `menor_fera` | 0.03 | 2.9% | sim |
| 29 | `cavaleiro_andante` | 0.03 | 2.9% | sim |
| 30 | `r3_voo_sobre_cidade` | 0.03 | 2.9% | sim |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 3000 | 11.7 | 12 | 1.0 |
| 1 | 2871 | 9.8 | 13 | 1.3 |
| 2 | 2802 | 15.3 | 28 | 1.9 |
| 3 | 2673 | 24.8 | 62 | 2.5 |
| 4 | 2304 | 22.0 | 121 | 5.5 |
| 5 | 1382 | 19.9 | 239 | 12.0 |
| 6 | 753 | 14.8 | 393 | 26.5 |
| 7 | 334 | 13.0 | 666 | 51.1 |
| 8 | 118 | 11.1 | 1163 | 105.2 |

## Conteúdo disponível por reino (eventos sem flag exigida)

| Reino | Eventos disponíveis | Dos quais genéricos |
|---:|---:|---:|
| 0 | 136 | 22 |
| 1 | 237 | 49 |
| 2 | 253 | 69 |
| 3 | 330 | 89 |
| 4 | 339 | 99 |
| 5 | 338 | 98 |
| 6 | 256 | 89 |
| 7 | 211 | 72 |
| 8 | 161 | 57 |

## Causas prováveis

- **Vidas longas para a quantidade de conteúdo:** a idade média é 534 anos, com 89 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 26.1% dos turnos são eventos sem nenhuma condição além do reino (124 eventos), com cooldown médio de 48 anos e peso médio de 1.19. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Mestre Respeitado" responde por 30.4% das vidas. Só 10 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 18.4% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 339 de 689 eventos (49.1%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
