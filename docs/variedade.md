# Diagnóstico de variedade

Gerado por `npm run variedade -- 3000` em 2026-10-03 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Comparação **antes → depois** em relação ao baseline (`docs/variedade.baseline.json`).

## Resumo

| Métrica | Valor |
|---|---|
| Eventos no jogo | 427 → **590** |
| Eventos (turnos) por vida | 58.1 → **74.5** |
| Eventos distintos por vida | 49.3 → **68.9** |
| Parcela de ocorrências repetidas na mesma vida | 15.2% → **7.5%** |
| Parcela dos turnos ocupada por eventos genéricos | 42.4% → **43.3%** |
| Eventos distintos em 10 vidas seguidas | 211 → **287** |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.162 → **0.163** |
| Final mais comum | Mestre Respeitado: 71.8% → **25.5%** |
| Entropia dos finais (bits; maior = mais variado) | 1.48 → **3.25** |
| Finais com 1% ou mais das vidas | 5 → **11** |
| Idade média ao morrer | 634 → **455** anos |

Eventos por vida: p10 28 · mediana 67 · p90 127. Distintos: p10 28 · mediana 64 · p90 113.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Mestre Respeitado | 765 | 25.5% |
| Cinzas da Tribulação | 559 | 18.6% |
| Fim em Paz | 460 | 15.3% |
| Morte em Combate | 330 | 11.0% |
| O Sábio da Montanha | 187 | 6.2% |
| Desvio de Qi | 183 | 6.1% |
| Vida Comum | 142 | 4.7% |
| Caído na Guerra | 72 | 2.4% |
| Caminho Demoníaco | 61 | 2.0% |
| A Febre da Praga | 43 | 1.4% |
| Caçado pelo Culto | 36 | 1.2% |
| O Rancor Que Sobrou | 28 | 0.9% |
| Engolido pela Maré de Bestas | 25 | 0.8% |
| O Veterano das Cicatrizes | 18 | 0.6% |
| Ascensão | 16 | 0.5% |
| A Casa Cheia | 14 | 0.5% |
| A Roda do Samsara | 12 | 0.4% |
| Exilado Para Sempre | 11 | 0.4% |
| O Eremita das Nuvens | 9 | 0.3% |
| A Iluminação | 8 | 0.3% |
| Sacrifício Final | 6 | 0.2% |
| Fundador de Seita | 4 | 0.1% |
| Fio Vermelho | 4 | 0.1% |
| Guardião do Reino Secreto | 2 | 0.1% |
| Oficial da Corte Celeste | 2 | 0.1% |
| O Velho Esquecido | 2 | 0.1% |
| Senhor do Sangue | 1 | 0.0% |
| A Dívida Cobrada | 0 | 0.0% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Fortuna Que Ficou | 0 | 0.0% |
| Punhal nas Costas | 0 | 0.0% |
| Morto em Duelo de Honra | 0 | 0.0% |

## Os 30 eventos que mais se repetem dentro de uma mesma vida

Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.

| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |
|---:|---|---:|---:|:---:|
| 1 | `meditacao_profunda` | 0.41 | 33.1% | sim |
| 2 | `retiro_fechado` | 0.18 | 16.1% | sim |
| 3 | `mundo_mare_inicio` | 0.17 | 11.8% | sim |
| 4 | `mundo_guerra_inicio` | 0.16 | 12.2% | sim |
| 5 | `gargalo_longo` | 0.15 | 13.3% | sim |
| 6 | `expedicao_longe` | 0.12 | 10.4% | sim |
| 7 | `mantra_cem_mil` | 0.11 | 10.4% | sim |
| 8 | `menor_bandidos` | 0.10 | 9.6% | sim |
| 9 | `partir_viagem` | 0.10 | 9.5% | sim |
| 10 | `rotina_mortal` | 0.10 | 7.9% | sim |
| 11 | `mundo_festivais_inicio` | 0.10 | 8.1% | sim |
| 12 | `menor_jovem_mestre` | 0.09 | 8.6% | sim |
| 13 | `jardim_lotos` | 0.09 | 8.4% | sim |
| 14 | `missao_do_registro` | 0.09 | 7.3% |  |
| 15 | `mundo_dinastia_inicio` | 0.09 | 7.5% | sim |
| 16 | `desvio_de_qi_leve` | 0.09 | 8.4% | sim |
| 17 | `doenca_da_aldeia` | 0.09 | 8.0% | sim |
| 18 | `mundo_reino_inicio` | 0.08 | 7.2% | sim |
| 19 | `fantasma_faminto` | 0.08 | 7.7% | sim |
| 20 | `emboscada_bandidos` | 0.08 | 7.6% | sim |
| 21 | `mundo_culto_inicio` | 0.08 | 6.4% | sim |
| 22 | `mundo_praga_inicio` | 0.08 | 6.6% | sim |
| 23 | `cacador_recompensas` | 0.08 | 7.2% | sim |
| 24 | `oferenda_templo` | 0.07 | 7.1% |  |
| 25 | `secar_ervas` | 0.07 | 6.9% | sim |
| 26 | `peste_demonios_menores` | 0.07 | 6.7% | sim |
| 27 | `cavaleiro_andante` | 0.07 | 6.7% | sim |
| 28 | `fome_no_reino` | 0.07 | 6.3% | sim |
| 29 | `r3_escassez_de_recursos` | 0.06 | 5.8% | sim |
| 30 | `menor_duelista` | 0.06 | 5.7% | sim |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 3000 | 9.0 | 13 | 1.4 |
| 1 | 2859 | 9.0 | 13 | 1.4 |
| 2 | 2792 | 14.2 | 27 | 1.9 |
| 3 | 2637 | 21.7 | 62 | 2.9 |
| 4 | 2074 | 19.6 | 120 | 6.1 |
| 5 | 1126 | 17.7 | 222 | 12.6 |
| 6 | 631 | 13.6 | 367 | 26.9 |
| 7 | 293 | 11.8 | 607 | 51.3 |
| 8 | 106 | 11.0 | 1166 | 106.4 |

## Conteúdo disponível por reino (eventos sem flag exigida)

| Reino | Eventos disponíveis | Dos quais genéricos |
|---:|---:|---:|
| 0 | 67 | 22 |
| 1 | 163 | 49 |
| 2 | 248 | 69 |
| 3 | 324 | 89 |
| 4 | 337 | 99 |
| 5 | 337 | 98 |
| 6 | 255 | 89 |
| 7 | 211 | 72 |
| 8 | 161 | 57 |

## Causas prováveis

- **Vidas longas para a quantidade de conteúdo:** a idade média é 455 anos, com 75 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 43.3% dos turnos são eventos sem nenhuma condição além do reino (124 eventos), com cooldown médio de 48 anos e peso médio de 1.19. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Mestre Respeitado" responde por 25.5% das vidas. Só 11 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 16.3% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 287 de 590 eventos (48.6%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
