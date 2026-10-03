# Diagnóstico de variedade

Gerado por `npm run variedade -- 3000` em 2026-10-03 (vidas independentes, meta vazia, bot de `sim/bot.ts`).
Este é o **baseline**: os números que as próximas etapas precisam melhorar.

## Resumo

| Métrica | Valor |
|---|---|
| Eventos no jogo | 427 |
| Eventos (turnos) por vida | 58.1 |
| Eventos distintos por vida | 49.3 |
| Parcela de ocorrências repetidas na mesma vida | 15.2% |
| Parcela dos turnos ocupada por eventos genéricos | 42.4% |
| Eventos distintos em 10 vidas seguidas | 211 |
| Semelhança entre vidas seguidas (Jaccard, 0 a 1) | 0.162 |
| Final mais comum | Fim em Paz: 71.8% |
| Entropia dos finais (bits; maior = mais variado) | 1.48 |
| Finais com 1% ou mais das vidas | 5 |
| Idade média ao morrer | 634 anos |

Eventos por vida: p10 32 · mediana 56 · p90 87. Distintos: p10 30 · mediana 49 · p90 69.

## Distribuição dos finais

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2155 | 71.8% |
| Cinzas da Tribulação | 420 | 14.0% |
| Desvio de Qi | 158 | 5.3% |
| Morte em Combate | 122 | 4.1% |
| Vida Comum | 79 | 2.6% |
| Ascensão | 15 | 0.5% |
| Caminho Demoníaco | 13 | 0.4% |
| O Eremita das Nuvens | 13 | 0.4% |
| A Roda do Samsara | 9 | 0.3% |
| Oficial da Corte Celeste | 4 | 0.1% |
| Guardião do Reino Secreto | 3 | 0.1% |
| A Iluminação | 3 | 0.1% |
| Fundador de Seita | 2 | 0.1% |
| Sacrifício Final | 2 | 0.1% |
| A Dívida Cobrada | 1 | 0.0% |
| Perdido no Vazio | 1 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |

## Os 30 eventos que mais se repetem dentro de uma mesma vida

Repetições = ocorrências além da primeira, somadas em todas as vidas, dividido pelo número de vidas.

| # | Evento | Repetições por vida | % das vidas em que repete | Genérico? |
|---:|---|---:|---:|:---:|
| 1 | `meditacao_profunda` | 1.26 | 58.5% | sim |
| 2 | `gargalo_longo` | 0.46 | 29.3% | sim |
| 3 | `retiro_fechado` | 0.45 | 31.1% | sim |
| 4 | `expedicao_longe` | 0.30 | 21.8% | sim |
| 5 | `partir_viagem` | 0.29 | 21.1% | sim |
| 6 | `mantra_cem_mil` | 0.28 | 20.8% | sim |
| 7 | `secar_ervas` | 0.28 | 20.7% | sim |
| 8 | `jardim_lotos` | 0.26 | 19.2% | sim |
| 9 | `fantasma_faminto` | 0.24 | 18.5% | sim |
| 10 | `desvio_de_qi_leve` | 0.23 | 18.5% | sim |
| 11 | `cacador_recompensas` | 0.19 | 15.7% | sim |
| 12 | `doenca_da_aldeia` | 0.18 | 14.8% | sim |
| 13 | `fome_no_reino` | 0.18 | 14.6% | sim |
| 14 | `missao_do_registro` | 0.16 | 8.1% |  |
| 15 | `peste_demonios_menores` | 0.16 | 12.9% | sim |
| 16 | `cavaleiro_andante` | 0.16 | 13.2% | sim |
| 17 | `rotina_mortal` | 0.15 | 10.5% | sim |
| 18 | `oferenda_templo` | 0.14 | 11.1% |  |
| 19 | `emboscada_bandidos` | 0.14 | 12.0% | sim |
| 20 | `olhar_do_ceu` | 0.13 | 11.1% | sim |
| 21 | `formacao_estudo` | 0.07 | 5.3% |  |
| 22 | `dia_de_mercado` | 0.07 | 6.1% | sim |
| 23 | `caminho_de_volta` | 0.06 | 5.2% |  |
| 24 | `cacada_com_besta` | 0.06 | 4.3% |  |
| 25 | `encontro_festival` | 0.06 | 5.3% |  |
| 26 | `tesouro_roubado` | 0.06 | 4.8% |  |
| 27 | `boato_estalagem` | 0.05 | 4.4% |  |
| 28 | `tarefas_da_casa` | 0.05 | 4.9% | sim |
| 29 | `mercado_negro` | 0.05 | 3.9% |  |
| 30 | `juiz_do_vilarejo` | 0.05 | 4.3% |  |

## Ritmo por reino

| Reino (nº) | Vidas que chegam | Turnos por vida (nesse reino) | Anos por vida (nesse reino) | Anos por turno |
|---:|---:|---:|---:|---:|
| 0 | 3000 | 9.1 | 14 | 1.5 |
| 1 | 2922 | 5.7 | 13 | 2.2 |
| 2 | 2877 | 9.6 | 27 | 2.9 |
| 3 | 2807 | 13.1 | 63 | 4.8 |
| 4 | 2404 | 13.1 | 122 | 9.3 |
| 5 | 1556 | 12.1 | 213 | 17.6 |
| 6 | 1063 | 10.4 | 437 | 42.2 |
| 7 | 430 | 9.2 | 722 | 78.4 |
| 8 | 133 | 7.7 | 1128 | 147.0 |

## Conteúdo disponível por reino (eventos sem flag exigida)

| Reino | Eventos disponíveis | Dos quais genéricos |
|---:|---:|---:|
| 0 | 52 | 7 |
| 1 | 116 | 18 |
| 2 | 188 | 35 |
| 3 | 245 | 48 |
| 4 | 259 | 50 |
| 5 | 258 | 50 |
| 6 | 219 | 46 |
| 7 | 159 | 37 |
| 8 | 95 | 22 |

## Causas prováveis

- **Vidas longas para a quantidade de conteúdo:** a idade média é 634 anos, com 58 eventos por vida. Nos reinos altos, cada turno cobre muitos anos, mas ainda sorteia entre os mesmos eventos genéricos.
- **Eventos genéricos dominam:** 42.4% dos turnos são eventos sem nenhuma condição além do reino (58 eventos), com cooldown médio de 41 anos e peso médio de 1.04. Em vidas de centenas de anos, um cooldown de 15 a 30 anos não impede a repetição.
- **Sem memória de repetição:** o sorteio só olha o cooldown; um evento visto 3 vezes continua com o mesmo peso da primeira.
- **Finais concentrados:** "Fim em Paz" responde por 71.8% das vidas. Só 5 finais aparecem em 1% ou mais das vidas; os voluntários dependem de escolha, e o bot (como muita gente) os evita.
- **Semelhança entre vidas:** em média, 16.2% dos eventos de uma vida também aparecem na seguinte; 10 vidas seguidas mostram só 211 de 427 eventos (49.3%).

## Metas para as próximas etapas

- Pelo menos o **dobro de eventos distintos por vida** e bem menos repetição (parcela de repetidos abaixo de 15%).
- **Nenhum final acima de 35%** das vidas.
- Mais eventos distintos em 10 vidas seguidas e menor semelhança entre vidas seguidas.
- Ascensão entre 0,5% e 2% (balanceamento atual preservado).
