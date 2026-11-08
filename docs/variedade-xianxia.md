# Diagnóstico de variedade

Gerado por `npm run variedade -- 300` em 2026-11-08 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Relatório atual da campanha; ainda não há baseline comparativo.

## Resumo

| Métrica | Valor |
|---|---|
| Moldes de cena no jogo | 171 |
| Eventos (turnos) por vida | 61.4 |
| Eventos distintos por vida | 45.5 |
| Parcela de ocorrências repetidas na mesma vida | 25.9% |
| Parcela dos turnos ocupada por eventos genéricos | 24.8% |
| Eventos distintos em 10 vidas seguidas | 118 |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.422 |
| Final mais comum | Morte em Combate: 36.7% |
| Entropia dos finais (bits; maior = mais variado) | 3.10 |
| Finais com 1% ou mais das vidas | 14 |
| Idade média ao morrer | 143 anos |

Eventos por vida: p10 28 · mediana 42 · p90 140. Distintos: p10 24 · mediana 31 · p90 90.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Morte em Combate | 110 | 36.7% |
| O Velho Esquecido | 42 | 14.0% |
| A Vida Que Ficou em Aberto | 29 | 9.7% |
| O Nome Que Sumiu na Chuva | 23 | 7.7% |
| Um Passo à Frente | 18 | 6.0% |
| Desvio de Qi | 17 | 5.7% |
| Ascensão | 14 | 4.7% |
| A Dívida Que Morreu Com o Passado | 10 | 3.3% |
| Cinzas da Tribulação | 9 | 3.0% |
| A Sombra de Alguém Maior | 8 | 2.7% |
| A Conta Fechada em Sangue | 5 | 1.7% |
| O Ancião da Seita | 5 | 1.7% |
| O Cultivador Que Não Entrou | 4 | 1.3% |
| A Voz Que Ficou | 3 | 1.0% |
| O Que Partiu Antes do Inverno | 2 | 0.7% |
| Fim em Paz | 1 | 0.3% |
| A Voz Que Calou | 0 | 0.0% |
| O Trono de Sombra | 0 | 0.0% |
| Dois no Mesmo Caminho | 0 | 0.0% |
| A Noite Sem Lua | 0 | 0.0% |
| O Nome Que Voltou a Valer | 0 | 0.0% |
| A Mão Aberta | 0 | 0.0% |
| Quase Lá | 0 | 0.0% |
| Caminho Demoníaco | 0 | 0.0% |
| Vida Comum | 0 | 0.0% |
| Fundador de Seita | 0 | 0.0% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 0 | 0.0% |
| O Eremita das Nuvens | 0 | 0.0% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 0 | 0.0% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 0 | 0.0% |
| Oficial da Corte Celeste | 0 | 0.0% |
| Mestre Respeitado | 0 | 0.0% |
| A Casa Cheia | 0 | 0.0% |
| O Sábio da Montanha | 0 | 0.0% |
| O Rancor Que Sobrou | 0 | 0.0% |
| A Fortuna Que Ficou | 0 | 0.0% |
| O Veterano das Cicatrizes | 0 | 0.0% |
| Caído na Guerra | 0 | 0.0% |
| Punhal nas Costas | 0 | 0.0% |
| Morto em Duelo de Honra | 0 | 0.0% |
| A Roda do Samsara | 0 | 0.0% |

## Os 30 eventos que mais se repetem dentro de uma mesma vida

Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.

| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |
|---:|---|---:|---:|:---:|
| 1 | `m:mundo_novo_rosto` | 1.40 | 75.7% |  |
| 2 | `m:amigo_pede_ajuda` | 1.09 | 24.3% |  |
| 3 | `m:reencontro_antigo` | 1.00 | 33.0% |  |
| 4 | `m:respiro_estrada` | 0.81 | 35.7% | sim |
| 5 | `m:desp_mestre_caminho` | 0.69 | 69.3% |  |
| 6 | `m:per_bandidos` | 0.63 | 63.0% |  |
| 7 | `m:respiro_festival` | 0.55 | 54.7% | sim |
| 8 | `m:resp_casamento` | 0.53 | 53.0% | sim |
| 9 | `m:rival_teste_publico` | 0.51 | 25.0% |  |
| 10 | `m:resp_go` | 0.49 | 48.7% | sim |
| 11 | `m:resp_estudo` | 0.48 | 48.3% | sim |
| 12 | `m:rival_desafio_publico` | 0.44 | 23.0% |  |
| 13 | `m:reacao_rompimento` | 0.43 | 30.0% |  |
| 14 | `m:respiro_trabalho` | 0.36 | 35.7% | sim |
| 15 | `m:respiro_estalagem_rival` | 0.35 | 35.3% |  |
| 16 | `m:respiro_chuva` | 0.34 | 34.0% | sim |
| 17 | `m:mundo_deserto` | 0.33 | 32.7% |  |
| 18 | `m:respiro_boato` | 0.31 | 31.3% | sim |
| 19 | `m:mundo_mar` | 0.31 | 30.7% |  |
| 20 | `m:respiro_visita` | 0.29 | 29.0% |  |
| 21 | `m:mundo_mercado_negro` | 0.29 | 29.0% |  |
| 22 | `m:respiro_templo` | 0.26 | 26.0% | sim |
| 23 | `m:rival_epilogo` | 0.25 | 15.3% |  |
| 24 | `m:virada_superar` | 0.25 | 18.0% |  |
| 25 | `m:resp_pescadores` | 0.24 | 24.3% | sim |
| 26 | `m:rival_sobe` | 0.24 | 14.3% |  |
| 27 | `m:rival_alianca` | 0.23 | 16.0% |  |
| 28 | `m:perigo_tempestade` | 0.21 | 21.3% |  |
| 29 | `m:perigo_besta` | 0.20 | 20.0% |  |
| 30 | `m:resp_visitante` | 0.19 | 19.3% | sim |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 300 | 7.2 | 7 | 1.0 |
| 1 | 300 | 22.2 | 41 | 1.8 |
| 2 | 153 | 25.6 | 37 | 1.5 |
| 3 | 99 | 37.4 | 81 | 2.2 |
| 4 | 38 | 41.1 | 217 | 5.3 |
| 5 | 13 | 28.2 | 292 | 10.3 |
| 6 | 2 | 26.0 | 491 | 18.9 |

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

- **Vidas longas para a quantidade de conteúdo:** a idade média é 143 anos, com 61 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 24.8% dos turnos são eventos sem nenhuma condição além do reino (0 eventos), com cooldown médio de 0 anos e peso médio de 0.00. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Morte em Combate" responde por 36.7% das vidas. Só 14 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 42.2% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 118 de 2 eventos (5889.8%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
