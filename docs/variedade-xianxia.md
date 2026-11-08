# Diagnóstico de variedade

Gerado por `npm run variedade -- 100` em 2026-11-08 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Relatório atual da campanha; ainda não há baseline comparativo.

## Resumo

| Métrica | Valor |
|---|---|
| Moldes de cena no jogo | 174 |
| Eventos (turnos) por vida | 77.2 |
| Eventos distintos por vida | 55.2 |
| Parcela de ocorrências repetidas na mesma vida | 28.5% |
| Parcela dos turnos ocupada por eventos genéricos | 24.9% |
| Eventos distintos em 10 vidas seguidas | 130 |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.423 |
| Final mais comum | O Nome Que Sumiu na Chuva: 16.0% |
| Entropia dos finais (bits; maior = mais variado) | 3.55 |
| Finais com 1% ou mais das vidas | 16 |
| Idade média ao morrer | 207 anos |

Eventos por vida: p10 36 · mediana 45 · p90 149. Distintos: p10 28 · mediana 34 · p90 97.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| O Nome Que Sumiu na Chuva | 16 | 16.0% |
| Morte em Combate | 15 | 15.0% |
| O Velho Esquecido | 14 | 14.0% |
| Um Passo à Frente | 11 | 11.0% |
| A Conta Fechada em Sangue | 8 | 8.0% |
| A Vida Que Ficou em Aberto | 7 | 7.0% |
| Desvio de Qi | 6 | 6.0% |
| Cinzas da Tribulação | 5 | 5.0% |
| A Dívida Que Morreu Com o Passado | 4 | 4.0% |
| O Cultivador Que Não Entrou | 4 | 4.0% |
| Ascensão | 3 | 3.0% |
| Dois no Mesmo Caminho | 2 | 2.0% |
| O Ancião da Seita | 2 | 2.0% |
| A Voz Que Ficou | 1 | 1.0% |
| O Que Partiu Antes do Inverno | 1 | 1.0% |
| Fim em Paz | 1 | 1.0% |
| A Voz Que Calou | 0 | 0.0% |
| O Trono de Sombra | 0 | 0.0% |
| A Noite Sem Lua | 0 | 0.0% |
| O Nome Que Voltou a Valer | 0 | 0.0% |
| A Mão Aberta | 0 | 0.0% |
| A Sombra de Alguém Maior | 0 | 0.0% |
| Quase Lá | 0 | 0.0% |
| Caminho Demoníaco | 0 | 0.0% |
| Vida Comum | 0 | 0.0% |

## Os 30 eventos que mais se repetem dentro de uma mesma vida

Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.

| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |
|---:|---|---:|---:|:---:|
| 1 | `m:amigo_pede_ajuda` | 1.90 | 37.0% |  |
| 2 | `m:mundo_novo_rosto` | 1.74 | 93.0% |  |
| 3 | `m:reencontro_antigo` | 1.55 | 48.0% |  |
| 4 | `m:respiro_estrada` | 1.08 | 42.0% | sim |
| 5 | `m:rival_teste_publico` | 0.80 | 35.0% |  |
| 6 | `m:per_bandidos` | 0.77 | 77.0% |  |
| 7 | `m:desp_mestre_caminho` | 0.73 | 73.0% |  |
| 8 | `m:rival_desafio_publico` | 0.71 | 32.0% |  |
| 9 | `m:reacao_rompimento` | 0.69 | 44.0% |  |
| 10 | `m:respiro_festival` | 0.68 | 68.0% | sim |
| 11 | `m:resp_go` | 0.63 | 63.0% | sim |
| 12 | `m:resp_casamento` | 0.62 | 62.0% | sim |
| 13 | `m:resp_estudo` | 0.55 | 55.0% | sim |
| 14 | `m:mundo_mar` | 0.45 | 45.0% |  |
| 15 | `m:respiro_estalagem_rival` | 0.44 | 44.0% |  |
| 16 | `m:mundo_mercado_negro` | 0.44 | 44.0% |  |
| 17 | `m:respiro_chuva` | 0.43 | 43.0% | sim |
| 18 | `m:mundo_deserto` | 0.43 | 43.0% |  |
| 19 | `m:rival_epilogo` | 0.38 | 25.0% |  |
| 20 | `m:respiro_trabalho` | 0.36 | 36.0% | sim |
| 21 | `m:respiro_boato` | 0.35 | 35.0% | sim |
| 22 | `m:rival_alianca` | 0.33 | 22.0% |  |
| 23 | `m:perigo_tempestade` | 0.33 | 33.0% |  |
| 24 | `m:perigo_besta` | 0.32 | 32.0% |  |
| 25 | `m:rival_sobe` | 0.31 | 19.0% |  |
| 26 | `m:respiro_templo` | 0.30 | 30.0% | sim |
| 27 | `m:virada_superar` | 0.29 | 21.0% |  |
| 28 | `m:respiro_visita` | 0.29 | 29.0% |  |
| 29 | `m:suc_prodigio` | 0.29 | 23.0% |  |
| 30 | `m:mundo_gelo` | 0.29 | 29.0% |  |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 100 | 7.8 | 8 | 1.0 |
| 1 | 100 | 23.6 | 45 | 1.9 |
| 2 | 50 | 26.3 | 42 | 1.6 |
| 3 | 44 | 44.8 | 100 | 2.2 |
| 4 | 25 | 40.1 | 198 | 4.9 |
| 5 | 7 | 35.6 | 352 | 9.9 |
| 6 | 2 | 17.0 | 469 | 27.6 |

## Conteúdo disponível por reino (eventos sem flag exigida)

| Reino | Eventos disponíveis | Dos quais genéricos |
|---:|---:|---:|
| 0 | 2 | 0 |
| 1 | 1 | 0 |
| 2 | 1 | 0 |
| 3 | 1 | 0 |
| 4 | 1 | 0 |
| 5 | 1 | 0 |
| 6 | 1 | 0 |
| 7 | 1 | 0 |
| 8 | 1 | 0 |

## Causas prováveis

- **Vidas longas para a quantidade de conteúdo:** a idade média é 207 anos, com 77 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 24.9% dos turnos são eventos sem nenhuma condição além do reino (0 eventos), com cooldown médio de 0 anos e peso médio de 0.00. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "O Nome Que Sumiu na Chuva" responde por 16.0% das vidas. Só 16 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 42.3% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 130 de 2 eventos (6486.8%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
