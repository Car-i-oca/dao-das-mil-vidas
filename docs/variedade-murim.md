# Diagnóstico de variedade

Gerado por `npm run variedade -- 100` em 2026-11-08 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Relatório atual da campanha; ainda não há baseline comparativo.

## Resumo

| Métrica | Valor |
|---|---|
| Eventos no jogo | 40 |
| Eventos (turnos) por vida | 33.7 |
| Eventos distintos por vida | 23.3 |
| Parcela de ocorrências repetidas na mesma vida | 30.9% |
| Parcela dos turnos ocupada por eventos genéricos | 60.9% |
| Eventos distintos em 10 vidas seguidas | 35 |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.738 |
| Final mais comum | Mestre de muitas escolas: 27.0% |
| Entropia dos finais (bits; maior = mais variado) | 2.88 |
| Finais com 1% ou mais das vidas | 9 |
| Idade média ao morrer | 71 anos |

Eventos por vida: p10 27 · mediana 34 · p90 41. Distintos: p10 20 · mediana 23 · p90 27.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Mestre de muitas escolas | 27 | 27.0% |
| Uma vida completa | 14 | 14.0% |
| Guardião das estradas | 13 | 13.0% |
| Uma escola de portas abertas | 12 | 12.0% |
| A casa cheia | 12 | 12.0% |
| A paz comprada | 10 | 10.0% |
| Uma trégua frágil | 7 | 7.0% |
| Derrota na graduação | 4 | 4.0% |
| A sentença de Hwayang | 1 | 1.0% |
| A vida fora do Jianghu | 0 | 0.0% |
| Caído na estrada | 0 | 0.0% |
| Caído na prova pública | 0 | 0.0% |
| Nome imortalizado | 0 | 0.0% |
| Isolado pelo poder | 0 | 0.0% |
| Morto em duelo | 0 | 0.0% |
| Exílio | 0 | 0.0% |
| O duelo que mudou o conselho | 0 | 0.0% |
| O arquivo que andava | 0 | 0.0% |

## Os 30 eventos que mais se repetem dentro de uma mesma vida

Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.

| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |
|---:|---|---:|---:|:---:|
| 1 | `murim_festival` | 1.06 | 74.0% | sim |
| 2 | `murim_ataque` | 0.97 | 74.0% | sim |
| 3 | `murim_mercado` | 0.85 | 69.0% | sim |
| 4 | `murim_ponte_reparo` | 0.84 | 66.0% | sim |
| 5 | `murim_mestra` | 0.83 | 66.0% | sim |
| 6 | `murim_refeicao` | 0.82 | 67.0% | sim |
| 7 | `murim_dia_comum` | 0.79 | 62.0% | sim |
| 8 | `murim_nomes` | 0.79 | 67.0% | sim |
| 9 | `murim_peregrinos` | 0.68 | 58.0% | sim |
| 10 | `murim_dilema` | 0.63 | 51.0% | sim |
| 11 | `murim_inverno` | 0.58 | 49.0% | sim |
| 12 | `murim_carta` | 0.48 | 31.0% |  |
| 13 | `murim_duelo_ponte` | 0.44 | 42.0% |  |
| 14 | `murim_assassino` | 0.42 | 39.0% |  |
| 15 | `murim_retorno` | 0.23 | 22.0% | sim |
| 16 | `murim_ferro_inicio` | 0.00 | 0.0% |  |
| 17 | `murim_ferro_recado` | 0.00 | 0.0% |  |
| 18 | `murim_escola` | 0.00 | 0.0% |  |
| 19 | `murim_refugiados` | 0.00 | 0.0% |  |
| 20 | `murim_punicao` | 0.00 | 0.0% |  |
| 21 | `murim_torneio` | 0.00 | 0.0% |  |
| 22 | `murim_final_vida` | 0.00 | 0.0% |  |
| 23 | `murim_ancora` | 0.00 | 0.0% |  |
| 24 | `murim_rota_guardiao` | 0.00 | 0.0% |  |
| 25 | `murim_arquivo` | 0.00 | 0.0% |  |
| 26 | `murim_casa_cha` | 0.00 | 0.0% |  |
| 27 | `murim_metodo_aberto` | 0.00 | 0.0% |  |
| 28 | `murim_escola_aberta` | 0.00 | 0.0% |  |
| 29 | `murim_estilos_errantes` | 0.00 | 0.0% |  |
| 30 | `murim_conselho` | 0.00 | 0.0% |  |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 100 | 7.8 | 8 | 1.0 |
| 1 | 100 | 5.7 | 8 | 1.5 |
| 2 | 99 | 8.2 | 16 | 2.0 |
| 3 | 97 | 9.4 | 25 | 2.6 |
| 4 | 58 | 5.3 | 15 | 2.7 |
| 5 | 1 | 3.0 | 4 | 1.3 |

## Conteúdo disponível por reino (eventos sem flag exigida)

| Reino | Eventos disponíveis | Dos quais genéricos |
|---:|---:|---:|
| 0 | 26 | 12 |
| 1 | 25 | 12 |
| 2 | 25 | 12 |
| 3 | 25 | 12 |
| 4 | 25 | 12 |
| 5 | 25 | 12 |
| 6 | 25 | 12 |
| 7 | 25 | 12 |
| 8 | 25 | 12 |

## Causas prováveis

- **Vidas longas para a quantidade de conteúdo:** a idade média é 71 anos, com 34 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 60.9% dos turnos são eventos sem nenhuma condição além do reino (12 eventos), com cooldown médio de 14 anos e peso médio de 1.05. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Mestre de muitas escolas" responde por 27.0% das vidas. Só 9 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 73.8% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 35 de 40 eventos (88.2%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
