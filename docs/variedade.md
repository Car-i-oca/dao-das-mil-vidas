# Diagnóstico de variedade

Gerado por `npm run variedade -- 2500` em 2026-10-03 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Comparação **antes → depois** em relação ao baseline (`docs/variedade.baseline.json`).

## Resumo

| Métrica | Valor |
|---|---|
| Eventos no jogo | 427 → **714** |
| Eventos (turnos) por vida | 58.1 → **99.9** |
| Eventos distintos por vida | 49.3 → **95.1** |
| Parcela de ocorrências repetidas na mesma vida | 15.2% → **4.8%** |
| Parcela dos turnos ocupada por eventos genéricos | 42.4% → **27.8%** |
| Eventos distintos em 10 vidas seguidas | 211 → **372** |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.162 → **0.183** |
| Final mais comum | Mestre Respeitado: 71.8% → **28.3%** |
| Entropia dos finais (bits; maior = mais variado) | 1.48 → **3.27** |
| Finais com 1% ou mais das vidas | 5 → **12** |
| Idade média ao morrer | 634 → **499** anos |

Eventos por vida: p10 34 · mediana 95 · p90 165. Distintos: p10 34 · mediana 92 · p90 153.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Mestre Respeitado | 707 | 28.3% |
| Morte em Combate | 386 | 15.4% |
| Cinzas da Tribulação | 341 | 13.6% |
| O Sábio da Montanha | 315 | 12.6% |
| Fim em Paz | 150 | 6.0% |
| Desvio de Qi | 147 | 5.9% |
| Vida Comum | 124 | 5.0% |
| Caído na Guerra | 62 | 2.5% |
| Caminho Demoníaco | 44 | 1.8% |
| Caçado pelo Culto | 39 | 1.6% |
| Ascensão | 27 | 1.1% |
| Engolido pela Maré de Bestas | 26 | 1.0% |
| Exilado Para Sempre | 23 | 0.9% |
| A Febre da Praga | 21 | 0.8% |
| A Casa Cheia | 20 | 0.8% |
| O Eremita das Nuvens | 13 | 0.5% |
| O Veterano das Cicatrizes | 11 | 0.4% |
| A Roda do Samsara | 10 | 0.4% |
| Fundador de Seita | 8 | 0.3% |
| Sacrifício Final | 8 | 0.3% |
| A Iluminação | 7 | 0.3% |
| Fio Vermelho | 3 | 0.1% |
| Perdido no Vazio | 3 | 0.1% |
| Oficial da Corte Celeste | 3 | 0.1% |
| Guardião do Reino Secreto | 1 | 0.0% |
| O Velho Esquecido | 1 | 0.0% |
| A Dívida Cobrada | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| O Rancor Que Sobrou | 0 | 0.0% |
| A Fortuna Que Ficou | 0 | 0.0% |
| Punhal nas Costas | 0 | 0.0% |
| Morto em Duelo de Honra | 0 | 0.0% |

## Os 30 eventos que mais se repetem dentro de uma mesma vida

Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.

| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |
|---:|---|---:|---:|:---:|
| 1 | `mundo_mare_inicio` | 0.20 | 14.8% | sim |
| 2 | `mundo_guerra_inicio` | 0.18 | 13.9% | sim |
| 3 | `lenda_de_eco` | 0.17 | 15.4% |  |
| 4 | `meditacao_profunda` | 0.17 | 15.1% | sim |
| 5 | `mundo_praga_inicio` | 0.12 | 8.9% | sim |
| 6 | `mundo_festivais_inicio` | 0.11 | 8.9% | sim |
| 7 | `mundo_reino_inicio` | 0.11 | 8.7% | sim |
| 8 | `mundo_dinastia_inicio` | 0.10 | 8.6% | sim |
| 9 | `dia_comum` | 0.10 | 5.0% | sim |
| 10 | `rotina_mortal` | 0.10 | 5.8% | sim |
| 11 | `missao_do_registro` | 0.09 | 6.9% |  |
| 12 | `mundo_culto_inicio` | 0.09 | 7.7% | sim |
| 13 | `mundo_cometa_inicio` | 0.07 | 6.1% | sim |
| 14 | `retiro_fechado` | 0.07 | 6.8% | sim |
| 15 | `gargalo_longo` | 0.07 | 6.4% | sim |
| 16 | `menor_bandidos` | 0.06 | 5.5% | sim |
| 17 | `oferenda_templo` | 0.05 | 5.2% |  |
| 18 | `partir_viagem` | 0.05 | 4.9% | sim |
| 19 | `jh_escolta` | 0.05 | 5.1% | sim |
| 20 | `expedicao_longe` | 0.05 | 4.7% | sim |
| 21 | `menor_jovem_mestre` | 0.05 | 4.2% | sim |
| 22 | `mantra_cem_mil` | 0.04 | 4.1% | sim |
| 23 | `fantasma_faminto` | 0.04 | 4.2% | sim |
| 24 | `jh_taberna_espioes` | 0.04 | 4.2% | sim |
| 25 | `jardim_lotos` | 0.04 | 4.0% | sim |
| 26 | `menor_duelista` | 0.04 | 4.0% | sim |
| 27 | `r3_escassez_de_recursos` | 0.04 | 3.7% | sim |
| 28 | `doenca_da_aldeia` | 0.04 | 3.7% | sim |
| 29 | `encontro_festival` | 0.04 | 3.6% |  |
| 30 | `torneio_alquimia` | 0.04 | 3.5% |  |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 2500 | 11.6 | 12 | 1.0 |
| 1 | 2374 | 9.9 | 13 | 1.3 |
| 2 | 2321 | 18.9 | 28 | 1.5 |
| 3 | 2175 | 28.5 | 60 | 2.1 |
| 4 | 1809 | 28.4 | 117 | 4.1 |
| 5 | 1092 | 23.8 | 232 | 9.7 |
| 6 | 573 | 16.2 | 378 | 23.4 |
| 7 | 270 | 12.9 | 648 | 50.3 |
| 8 | 107 | 11.2 | 1122 | 100.4 |

## Conteúdo disponível por reino (eventos sem flag exigida)

| Reino | Eventos disponíveis | Dos quais genéricos |
|---:|---:|---:|
| 0 | 136 | 22 |
| 1 | 241 | 51 |
| 2 | 271 | 80 |
| 3 | 354 | 100 |
| 4 | 363 | 110 |
| 5 | 357 | 106 |
| 6 | 265 | 91 |
| 7 | 213 | 72 |
| 8 | 161 | 57 |

## Causas prováveis

- **Vidas longas para a quantidade de conteúdo:** a idade média é 499 anos, com 100 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 27.8% dos turnos são eventos sem nenhuma condição além do reino (135 eventos), com cooldown médio de 50 anos e peso médio de 1.19. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Mestre Respeitado" responde por 28.3% das vidas. Só 12 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 18.3% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 372 de 714 eventos (52.1%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
