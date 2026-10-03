# Diagnóstico de variedade

Gerado por `npm run variedade -- 3000` em 2026-10-03 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Comparação **antes → depois** em relação ao baseline (`docs/variedade.baseline.json`).

## Resumo

| Métrica | Valor |
|---|---|
| Eventos no jogo | 427 → **466** |
| Eventos (turnos) por vida | 58.1 → **67.2** |
| Eventos distintos por vida | 49.3 → **60.6** |
| Parcela de ocorrências repetidas na mesma vida | 15.2% → **9.8%** |
| Parcela dos turnos ocupada por eventos genéricos | 42.4% → **40.7%** |
| Eventos distintos em 10 vidas seguidas | 211 → **249** |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.162 → **0.163** |
| Final mais comum | Morte em Combate: 71.8% → **19.3%** |
| Entropia dos finais (bits; maior = mais variado) | 1.48 → **3.55** |
| Finais com 1% ou mais das vidas | 5 → **14** |
| Idade média ao morrer | 634 → **374** anos |

Eventos por vida: p10 25 · mediana 59 · p90 120. Distintos: p10 25 · mediana 56 · p90 102.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Morte em Combate | 578 | 19.3% |
| Fim em Paz | 541 | 18.0% |
| Cinzas da Tribulação | 433 | 14.4% |
| O Sábio da Montanha | 325 | 10.8% |
| Mestre Respeitado | 213 | 7.1% |
| Desvio de Qi | 153 | 5.1% |
| Vida Comum | 140 | 4.7% |
| O Velho Esquecido | 115 | 3.8% |
| Caminho Demoníaco | 96 | 3.2% |
| O Rancor Que Sobrou | 86 | 2.9% |
| Caído na Guerra | 66 | 2.2% |
| Caçado pelo Culto | 38 | 1.3% |
| Engolido pela Maré de Bestas | 34 | 1.1% |
| A Casa Cheia | 33 | 1.1% |
| A Febre da Praga | 29 | 1.0% |
| Exilado Para Sempre | 26 | 0.9% |
| O Veterano das Cicatrizes | 21 | 0.7% |
| O Eremita das Nuvens | 20 | 0.7% |
| Ascensão | 16 | 0.5% |
| A Roda do Samsara | 12 | 0.4% |
| Sacrifício Final | 8 | 0.3% |
| A Iluminação | 6 | 0.2% |
| Fio Vermelho | 4 | 0.1% |
| Oficial da Corte Celeste | 3 | 0.1% |
| Fundador de Seita | 2 | 0.1% |
| Guardião do Reino Secreto | 1 | 0.0% |
| A Sombra do Trono | 1 | 0.0% |
| A Dívida Cobrada | 0 | 0.0% |
| Perdido no Vazio | 0 | 0.0% |
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
| 1 | `meditacao_profunda` | 0.55 | 41.9% | sim |
| 2 | `retiro_fechado` | 0.25 | 21.9% | sim |
| 3 | `gargalo_longo` | 0.23 | 19.3% | sim |
| 4 | `partir_viagem` | 0.18 | 16.0% | sim |
| 5 | `expedicao_longe` | 0.18 | 15.5% | sim |
| 6 | `secar_ervas` | 0.17 | 14.7% | sim |
| 7 | `cacador_recompensas` | 0.15 | 14.0% | sim |
| 8 | `mantra_cem_mil` | 0.15 | 13.6% | sim |
| 9 | `jardim_lotos` | 0.15 | 13.6% | sim |
| 10 | `missao_do_registro` | 0.15 | 10.6% |  |
| 11 | `fantasma_faminto` | 0.14 | 13.2% | sim |
| 12 | `desvio_de_qi_leve` | 0.14 | 13.1% | sim |
| 13 | `mundo_guerra_inicio` | 0.13 | 10.3% | sim |
| 14 | `oferenda_templo` | 0.13 | 11.2% |  |
| 15 | `emboscada_bandidos` | 0.12 | 11.5% | sim |
| 16 | `mundo_mare_inicio` | 0.12 | 9.2% | sim |
| 17 | `doenca_da_aldeia` | 0.12 | 11.3% | sim |
| 18 | `cavaleiro_andante` | 0.12 | 11.8% | sim |
| 19 | `fome_no_reino` | 0.11 | 10.6% | sim |
| 20 | `peste_demonios_menores` | 0.11 | 10.4% | sim |
| 21 | `rotina_mortal` | 0.10 | 7.9% | sim |
| 22 | `mundo_reino_inicio` | 0.08 | 6.1% | sim |
| 23 | `mundo_festivais_inicio` | 0.07 | 6.1% | sim |
| 24 | `mundo_dinastia_inicio` | 0.07 | 5.6% | sim |
| 25 | `formacao_estudo` | 0.06 | 5.3% |  |
| 26 | `mundo_culto_inicio` | 0.06 | 5.2% | sim |
| 27 | `mundo_praga_inicio` | 0.06 | 5.0% | sim |
| 28 | `olhar_do_ceu` | 0.06 | 5.6% | sim |
| 29 | `tesouro_roubado` | 0.06 | 5.4% |  |
| 30 | `tutor_mortal` | 0.06 | 5.4% | sim |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 3000 | 9.0 | 13 | 1.4 |
| 1 | 2859 | 8.6 | 12 | 1.4 |
| 2 | 2776 | 13.9 | 27 | 1.9 |
| 3 | 2547 | 20.6 | 59 | 2.8 |
| 4 | 1816 | 18.2 | 111 | 6.1 |
| 5 | 922 | 16.9 | 215 | 12.7 |
| 6 | 482 | 14.1 | 377 | 26.8 |
| 7 | 210 | 12.7 | 683 | 53.9 |
| 8 | 77 | 10.2 | 1054 | 103.0 |

## Conteúdo disponível por reino (eventos sem flag exigida)

| Reino | Eventos disponíveis | Dos quais genéricos |
|---:|---:|---:|
| 0 | 67 | 22 |
| 1 | 145 | 45 |
| 2 | 224 | 65 |
| 3 | 281 | 78 |
| 4 | 295 | 80 |
| 5 | 294 | 80 |
| 6 | 254 | 75 |
| 7 | 188 | 60 |
| 8 | 120 | 43 |

## Causas prováveis

- **Vidas longas para a quantidade de conteúdo:** a idade média é 374 anos, com 67 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 40.7% dos turnos são eventos sem nenhuma condição além do reino (88 eventos), com cooldown médio de 43 anos e peso médio de 1.13. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Morte em Combate" responde por 19.3% das vidas. Só 14 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 16.3% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 249 de 466 eventos (53.5%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
