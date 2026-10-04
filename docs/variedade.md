# Diagnóstico de variedade

Gerado por `npm run variedade -- 3000` em 2026-10-03 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Comparação **antes → depois** em relação ao baseline (`docs/variedade.baseline.json`).

## Resumo

| Métrica | Valor |
|---|---|
| Eventos no jogo | 427 → **714** |
| Eventos (turnos) por vida | 58.1 → **100.0** |
| Eventos distintos por vida | 49.3 → **95.2** |
| Parcela de ocorrências repetidas na mesma vida | 15.2% → **4.8%** |
| Parcela dos turnos ocupada por eventos genéricos | 42.4% → **27.8%** |
| Eventos distintos em 10 vidas seguidas | 211 → **372** |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.162 → **0.182** |
| Final mais comum | Fim em Paz: 71.8% → **Mestre Respeitado: 28.7%** |
| Entropia dos finais (bits; maior = mais variado) | 1.48 → **3.28** |
| Finais com 1% ou mais das vidas | 5 → **11** |
| Idade média ao morrer | 634 → **501** anos |

Eventos por vida: p10 33 · mediana 95 · p90 165. Distintos: p10 33 · mediana 93 · p90 152.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Mestre Respeitado | 860 | 28.7% |
| Morte em Combate | 459 | 15.3% |
| Cinzas da Tribulação | 394 | 13.1% |
| O Sábio da Montanha | 371 | 12.4% |
| Fim em Paz | 182 | 6.1% |
| Desvio de Qi | 176 | 5.9% |
| Vida Comum | 155 | 5.2% |
| Caído na Guerra | 75 | 2.5% |
| Caminho Demoníaco | 52 | 1.7% |
| Caçado pelo Culto | 50 | 1.7% |
| Engolido pela Maré de Bestas | 31 | 1.0% |
| Ascensão | 29 | 1.0% |
| A Febre da Praga | 27 | 0.9% |
| Exilado Para Sempre | 26 | 0.9% |
| A Casa Cheia | 25 | 0.8% |
| O Eremita das Nuvens | 19 | 0.6% |
| A Roda do Samsara | 16 | 0.5% |
| O Veterano das Cicatrizes | 12 | 0.4% |
| Fundador de Seita | 9 | 0.3% |
| Sacrifício Final | 9 | 0.3% |
| A Iluminação | 7 | 0.2% |
| Fio Vermelho | 5 | 0.2% |
| Oficial da Corte Celeste | 5 | 0.2% |
| Perdido no Vazio | 3 | 0.1% |
| Guardião do Reino Secreto | 2 | 0.1% |
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
| 1 | `mundo_mare_inicio` | 0.21 | 15.1% | sim |
| 2 | `mundo_guerra_inicio` | 0.18 | 14.2% | sim |
| 3 | `meditacao_profunda` | 0.17 | 15.2% | sim |
| 4 | `lenda_de_eco` | 0.17 | 15.2% |  |
| 5 | `mundo_praga_inicio` | 0.12 | 9.1% | sim |
| 6 | `mundo_dinastia_inicio` | 0.11 | 8.9% | sim |
| 7 | `dia_comum` | 0.11 | 5.2% | sim |
| 8 | `mundo_reino_inicio` | 0.11 | 8.9% | sim |
| 9 | `rotina_mortal` | 0.11 | 6.1% | sim |
| 10 | `mundo_festivais_inicio` | 0.11 | 8.9% | sim |
| 11 | `missao_do_registro` | 0.09 | 6.9% |  |
| 12 | `mundo_culto_inicio` | 0.09 | 7.8% | sim |
| 13 | `retiro_fechado` | 0.07 | 6.7% | sim |
| 14 | `mundo_cometa_inicio` | 0.07 | 6.1% | sim |
| 15 | `gargalo_longo` | 0.07 | 6.4% | sim |
| 16 | `menor_bandidos` | 0.06 | 5.5% | sim |
| 17 | `partir_viagem` | 0.05 | 5.1% | sim |
| 18 | `oferenda_templo` | 0.05 | 5.1% |  |
| 19 | `expedicao_longe` | 0.05 | 4.8% | sim |
| 20 | `jh_escolta` | 0.05 | 5.0% | sim |
| 21 | `mantra_cem_mil` | 0.05 | 4.4% | sim |
| 22 | `menor_jovem_mestre` | 0.04 | 4.1% | sim |
| 23 | `jh_taberna_espioes` | 0.04 | 4.2% | sim |
| 24 | `fantasma_faminto` | 0.04 | 4.1% | sim |
| 25 | `jardim_lotos` | 0.04 | 4.1% | sim |
| 26 | `menor_duelista` | 0.04 | 4.1% | sim |
| 27 | `doenca_da_aldeia` | 0.04 | 3.9% | sim |
| 28 | `r3_escassez_de_recursos` | 0.04 | 3.8% | sim |
| 29 | `encontro_festival` | 0.04 | 3.6% |  |
| 30 | `tesouro_roubado` | 0.04 | 3.5% |  |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 3000 | 11.7 | 12 | 1.0 |
| 1 | 2843 | 9.9 | 13 | 1.3 |
| 2 | 2779 | 19.0 | 28 | 1.5 |
| 3 | 2609 | 28.4 | 60 | 2.1 |
| 4 | 2173 | 28.2 | 117 | 4.1 |
| 5 | 1319 | 24.3 | 236 | 9.7 |
| 6 | 681 | 16.1 | 380 | 23.6 |
| 7 | 316 | 12.9 | 648 | 50.1 |
| 8 | 128 | 11.1 | 1144 | 102.9 |

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

- **Vidas longas para a quantidade de conteúdo:** a idade média é 501 anos, com 100 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 27.8% dos turnos são eventos sem nenhuma condição além do reino (135 eventos), com cooldown médio de 50 anos e peso médio de 1.19. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Mestre Respeitado" responde por 28.7% das vidas. Só 11 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 18.2% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 372 de 714 eventos (52.1%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
