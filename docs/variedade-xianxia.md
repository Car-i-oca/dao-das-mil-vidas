# Diagnóstico de variedade

Gerado por `npm run variedade -- 1000` em 2026-11-08 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Relatório atual da campanha; ainda não há baseline comparativo.

## Resumo

| Métrica | Valor |
|---|---|
| Moldes de cena no jogo | 174 |
| Eventos (turnos) por vida | 79.4 |
| Eventos distintos por vida | 56.0 |
| Parcela de ocorrências repetidas na mesma vida | 29.4% |
| Parcela dos turnos ocupada por eventos genéricos | 25.1% |
| Eventos distintos em 10 vidas seguidas | 129 |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.446 |
| Final mais comum | Morte em Combate: 17.4% |
| Entropia dos finais (bits; maior = mais variado) | 3.45 |
| Finais com 1% ou mais das vidas | 13 |
| Idade média ao morrer | 219 anos |

Eventos por vida: p10 36 · mediana 46 · p90 156. Distintos: p10 28 · mediana 42 · p90 97.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Morte em Combate | 174 | 17.4% |
| O Velho Esquecido | 165 | 16.5% |
| A Conta Fechada em Sangue | 122 | 12.2% |
| O Nome Que Sumiu na Chuva | 108 | 10.8% |
| A Vida Que Ficou em Aberto | 88 | 8.8% |
| Um Passo à Frente | 84 | 8.4% |
| Desvio de Qi | 77 | 7.7% |
| Cinzas da Tribulação | 68 | 6.8% |
| Dois no Mesmo Caminho | 25 | 2.5% |
| O Ancião da Seita | 20 | 2.0% |
| A Dívida Que Morreu Com o Passado | 16 | 1.6% |
| O Cultivador Que Não Entrou | 15 | 1.5% |
| A Voz Que Ficou | 13 | 1.3% |
| A Sombra de Alguém Maior | 8 | 0.8% |
| Ascensão | 8 | 0.8% |
| A Noite Sem Lua | 4 | 0.4% |
| O Que Partiu Antes do Inverno | 2 | 0.2% |
| Fim em Paz | 2 | 0.2% |
| A Mão Aberta | 1 | 0.1% |
| A Voz Que Calou | 0 | 0.0% |
| O Trono de Sombra | 0 | 0.0% |
| O Nome Que Voltou a Valer | 0 | 0.0% |
| Quase Lá | 0 | 0.0% |
| Caminho Demoníaco | 0 | 0.0% |
| Vida Comum | 0 | 0.0% |

## Os 30 eventos que mais se repetem dentro de uma mesma vida

Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.

| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |
|---:|---|---:|---:|:---:|
| 1 | `m:amigo_pede_ajuda` | 1.97 | 35.9% |  |
| 2 | `m:mundo_novo_rosto` | 1.66 | 88.2% |  |
| 3 | `m:reencontro_antigo` | 1.61 | 46.0% |  |
| 4 | `m:respiro_estrada` | 1.45 | 42.1% | sim |
| 5 | `m:rival_teste_publico` | 0.90 | 38.6% |  |
| 6 | `m:rival_desafio_publico` | 0.83 | 36.3% |  |
| 7 | `m:per_bandidos` | 0.77 | 76.8% |  |
| 8 | `m:reacao_rompimento` | 0.69 | 43.4% |  |
| 9 | `m:respiro_festival` | 0.68 | 67.7% | sim |
| 10 | `m:desp_mestre_caminho` | 0.66 | 66.2% |  |
| 11 | `m:resp_casamento` | 0.65 | 65.4% | sim |
| 12 | `m:resp_go` | 0.62 | 62.0% | sim |
| 13 | `m:resp_estudo` | 0.56 | 56.2% | sim |
| 14 | `m:respiro_estalagem_rival` | 0.46 | 46.4% |  |
| 15 | `m:mundo_deserto` | 0.46 | 45.5% |  |
| 16 | `m:mundo_mar` | 0.44 | 44.0% |  |
| 17 | `m:rival_epilogo` | 0.43 | 28.1% |  |
| 18 | `m:mundo_mercado_negro` | 0.43 | 43.0% |  |
| 19 | `m:respiro_chuva` | 0.41 | 40.8% | sim |
| 20 | `m:respiro_boato` | 0.41 | 40.7% | sim |
| 21 | `m:rival_alianca` | 0.40 | 27.7% |  |
| 22 | `m:virada_superar` | 0.37 | 25.1% |  |
| 23 | `m:respiro_templo` | 0.35 | 34.7% | sim |
| 24 | `m:perigo_tempestade` | 0.34 | 34.2% |  |
| 25 | `m:perigo_besta` | 0.34 | 34.0% |  |
| 26 | `m:respiro_trabalho` | 0.33 | 33.2% | sim |
| 27 | `m:mundo_gelo` | 0.31 | 31.2% |  |
| 28 | `m:rival_climax` | 0.31 | 21.4% |  |
| 29 | `m:suc_prodigio` | 0.30 | 22.2% |  |
| 30 | `m:respiro_visita` | 0.29 | 29.1% |  |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 1000 | 7.8 | 8 | 1.0 |
| 1 | 1000 | 22.3 | 41 | 1.9 |
| 2 | 530 | 29.3 | 44 | 1.5 |
| 3 | 441 | 45.0 | 97 | 2.2 |
| 4 | 261 | 40.0 | 205 | 5.1 |
| 5 | 97 | 30.2 | 319 | 10.6 |
| 6 | 22 | 22.2 | 502 | 22.6 |
| 7 | 1 | 18.0 | 475 | 26.4 |
| 8 | 1 | 24.0 | 1354 | 56.4 |

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

- **Vidas longas para a quantidade de conteúdo:** a idade média é 219 anos, com 79 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 25.1% dos turnos são eventos sem nenhuma condição além do reino (0 eventos), com cooldown médio de 0 anos e peso médio de 0.00. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Morte em Combate" responde por 17.4% das vidas. Só 13 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 44.6% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 129 de 2 eventos (6472.4%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
