# Diagnóstico de variedade

Gerado por `npm run variedade -- 1000` em 2026-10-08 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Relatório atual da campanha; ainda não há baseline comparativo.

## Resumo

| Métrica | Valor |
|---|---|
| Eventos no jogo | 36 |
| Eventos (turnos) por vida | 35.1 |
| Eventos distintos por vida | 23.7 |
| Parcela de ocorrências repetidas na mesma vida | 32.3% |
| Parcela dos turnos ocupada por eventos genéricos | 60.8% |
| Eventos distintos em 10 vidas seguidas | 33 |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.750 |
| Final mais comum | Mestre de muitas escolas: 27.6% |
| Entropia dos finais (bits; maior = mais variado) | 2.93 |
| Finais com 1% ou mais das vidas | 8 |
| Idade média ao morrer | 69 anos |

Eventos por vida: p10 28 · mediana 36 · p90 42. Distintos: p10 21 · mediana 24 · p90 27.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Mestre de muitas escolas | 276 | 27.6% |
| A casa cheia | 171 | 17.1% |
| A paz comprada | 131 | 13.1% |
| Uma vida completa | 100 | 10.0% |
| Uma trégua frágil | 88 | 8.8% |
| Uma escola de portas abertas | 80 | 8.0% |
| Guardião das estradas | 78 | 7.8% |
| Uma técnica interrompida | 56 | 5.6% |
| A sentença de Hwayang | 8 | 0.8% |
| O duelo que mudou o conselho | 7 | 0.7% |
| A última prova | 5 | 0.5% |
| A vida fora do Jianghu | 0 | 0.0% |
| Caído na estrada | 0 | 0.0% |
| Além do Jianghu | 0 | 0.0% |
| O preço do poder | 0 | 0.0% |
| Morto em duelo | 0 | 0.0% |
| Exílio | 0 | 0.0% |

## Os 30 eventos que mais se repetem dentro de uma mesma vida

Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.

| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |
|---:|---|---:|---:|:---:|
| 1 | `murim_festival` | 1.08 | 79.1% | sim |
| 2 | `murim_ponte_reparo` | 1.01 | 75.8% | sim |
| 3 | `murim_mercado` | 0.94 | 71.3% | sim |
| 4 | `murim_dia_comum` | 0.94 | 68.3% | sim |
| 5 | `murim_refeicao` | 0.93 | 73.5% | sim |
| 6 | `murim_ataque` | 0.92 | 70.5% | sim |
| 7 | `murim_nomes` | 0.81 | 66.5% | sim |
| 8 | `murim_mestra` | 0.80 | 62.8% | sim |
| 9 | `murim_inverno` | 0.73 | 62.0% | sim |
| 10 | `murim_peregrinos` | 0.69 | 57.7% | sim |
| 11 | `murim_carta` | 0.63 | 41.9% |  |
| 12 | `murim_dilema` | 0.60 | 52.7% | sim |
| 13 | `murim_assassino` | 0.49 | 44.1% |  |
| 14 | `murim_duelo_ponte` | 0.46 | 41.1% |  |
| 15 | `murim_retorno` | 0.29 | 29.2% | sim |
| 16 | `murim_ferro_inicio` | 0.00 | 0.0% |  |
| 17 | `murim_ferro_recado` | 0.00 | 0.0% |  |
| 18 | `murim_escola` | 0.00 | 0.0% |  |
| 19 | `murim_refugiados` | 0.00 | 0.0% |  |
| 20 | `murim_punicao` | 0.00 | 0.0% |  |
| 21 | `murim_torneio` | 0.00 | 0.0% |  |
| 22 | `murim_ancora` | 0.00 | 0.0% |  |
| 23 | `murim_rota_guardiao` | 0.00 | 0.0% |  |
| 24 | `murim_arquivo` | 0.00 | 0.0% |  |
| 25 | `murim_casa_cha` | 0.00 | 0.0% |  |
| 26 | `murim_escola_aberta` | 0.00 | 0.0% |  |
| 27 | `murim_final_vida` | 0.00 | 0.0% |  |
| 28 | `murim_estilos_errantes` | 0.00 | 0.0% |  |
| 29 | `murim_conselho` | 0.00 | 0.0% |  |
| 30 | `murim_pos_conselho` | 0.00 | 0.0% |  |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 1000 | 7.8 | 8 | 1.0 |
| 1 | 1000 | 6.1 | 8 | 1.4 |
| 2 | 978 | 9.5 | 16 | 1.7 |
| 3 | 944 | 9.7 | 25 | 2.6 |
| 4 | 520 | 5.2 | 13 | 2.6 |
| 5 | 13 | 3.7 | 9 | 2.6 |

## Conteúdo disponível por reino (eventos sem flag exigida)

| Reino | Eventos disponíveis | Dos quais genéricos |
|---:|---:|---:|
| 0 | 22 | 12 |
| 1 | 21 | 12 |
| 2 | 21 | 12 |
| 3 | 21 | 12 |
| 4 | 21 | 12 |
| 5 | 21 | 12 |
| 6 | 21 | 12 |
| 7 | 21 | 12 |
| 8 | 21 | 12 |

## Causas prováveis

- **Vidas longas para a quantidade de conteúdo:** a idade média é 69 anos, com 35 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 60.8% dos turnos são eventos sem nenhuma condição além do reino (12 eventos), com cooldown médio de 14 anos e peso médio de 1.05. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Mestre de muitas escolas" responde por 27.6% das vidas. Só 8 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 75.0% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 33 de 36 eventos (91.8%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
