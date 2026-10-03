# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 397 eventos, 89 itens, 58 técnicas, 23 finais, 10 trilhas.

## Como o bot joga
- 70% das vezes escolhe a opção de maior chance de sucesso; nos demais casos escolhe ao acaso entre as opções seguras.
- Evita escolhas que encerram a vida (risco de final > 12%), exceto quando a idade passa de 90% da vida máxima ou resta menos de 15 anos.
- No modo meta, busca o caminho demoníaco (aceita ofertas, sacrifícios e pactos) em metade das vidas até liberar a conquista, escolhe trilhas liberadas ao acaso e gasta a Herança do Dao em ritmo → mente → corpo → destino → bolso.

## Metas de balanceamento
- Ascender é raro (~1% no bot), mas possível; um jogador atento deve superar o bot.
- A maioria das vidas termina entre o 3º e o 5º reino.
- Nenhum final voluntário (eremita, sacrifício, reencarnação) passa de ~5% das vidas.

### Vidas independentes (meta vazia; a trilha nasce dos eventos)

4000 vidas.

**Taxa de ascensão:** 22 (0.6%)  
**Idade de morte:** mín 19 · p10 105 · mediana 309 · p90 1720 · p99 2726 · máx 2857

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2874 | 71.8% |
| Morte em Combate | 124 | 3.1% |
| Cinzas da Tribulação | 606 | 15.2% |
| Ascensão | 22 | 0.6% |
| Caminho Demoníaco | 17 | 0.4% |
| Vida Comum | 102 | 2.5% |
| Desvio de Qi | 202 | 5.0% |
| Fundador de Seita | 5 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 7 | 0.2% |
| O Eremita das Nuvens | 12 | 0.3% |
| Perdido no Vazio | 3 | 0.1% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 6 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 5 | 0.1% |
| Oficial da Corte Celeste | 4 | 0.1% |
| A Roda do Samsara | 11 | 0.3% |

**Reino máximo — xianxia** (2299 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 47 | 2.0% |
| Fundação | 35 | 1.5% |
| Núcleo Dourado | 299 | 13.0% |
| Alma Nascente | 395 | 17.2% |
| Transformação Divina | 355 | 15.4% |
| Refino do Vazio | 624 | 27.1% |
| Integração Corporal | 359 | 15.6% |
| Grande Ascensão | 185 | 8.0% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 17 | 1.1% |
| Segunda Classe | 40 | 2.5% |
| Primeira Classe | 239 | 14.9% |
| Mestre de Pico | 726 | 45.4% |
| Transcendente | 380 | 23.8% |
| Além dos Limites | 158 | 9.9% |
| Lenda Marcial | 40 | 2.5% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 101 | 0.02 | 30 | 1 |
| Caminho do Sopro | 459 | 5.49 | 1031 | 6 |
| Caminho da Espada | 426 | 4.42 | 248 | 3 |
| Caminho da Alquimia | 420 | 5.09 | 835 | 0 |
| Caminho do Corpo | 360 | 4.20 | 224 | 0 |
| Caminho da Consciência | 415 | 5.49 | 1040 | 4 |
| Caminho das Formações | 411 | 5.24 | 917 | 1 |
| Caminho do Mérito | 400 | 4.30 | 234 | 1 |
| Caminho dos Venenos | 414 | 4.19 | 215 | 2 |
| Caminho das Bestas | 594 | 5.09 | 877 | 4 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0), memoria_tecnica_antiga (0), inimigo_vida_passada (0), erro_da_vida_passada (0), mestre_vida_passada_renasce (0), nome_antigo (0), sussurro_do_futuro (45), segunda_chance (33), cena_sombra_sangue (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Grande Sutra do Ciclo (n=61, reino relativo +18.9 pp, ascensão 0.0%); Passo Sem Fio (n=111, reino relativo +17.2 pp, ascensão 2.7%); Sutra do Céu Vazio (n=100, reino relativo +16.8 pp, ascensão 3.0%); Koan do Riso Antes do Nascimento (n=186, reino relativo +14.0 pp, ascensão 1.6%); Sutra do Espelho Quieto (n=328, reino relativo +13.4 pp, ascensão 1.5%).
Menores: Sutra do Mérito Silencioso (n=400, reino relativo -0.9 pp, ascensão 0.3%); Ossos de Ferro Frio (n=360, reino relativo -2.3 pp, ascensão 0.0%); Chuva de Mil Agulhas (n=414, reino relativo -2.5 pp, ascensão 0.5%).

**Eventos vistos:** 382/397. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao, banquete_de_sangue, memoria_tecnica_antiga, inimigo_vida_passada, erro_da_vida_passada, mestre_vida_passada_renasce, nome_antigo, cena_sombra_sangue, sangue_irmaos, sangue_duelo_do_fraco, sangue_chama_negra, sangue_trabalho_da_seita.
Eventos raros/lendários menos frequentes: mestre_ensina_tecnica (1), senhor_do_sangue (1), besta_em_perigo (2), mestre_em_perigo (2), cla_prospera (3), bestas_evolucao (3), dilema_lealdade (4), rival_ascendido (4).
Eventos mais repetidos (por vida): meditacao_profunda (2.2), retiro_fechado (1.1), gargalo_longo (1.1), partir_viagem (0.9), secar_ervas (0.9), jardim_lotos (0.8), mantra_cem_mil (0.8), fantasma_faminto (0.8).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 80 (2.0%)  
**Idade de morte:** mín 17 · p10 116 · mediana 451 · p90 1771 · p99 2761 · máx 3066

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2883 | 72.1% |
| Morte em Combate | 93 | 2.3% |
| Cinzas da Tribulação | 627 | 15.7% |
| Ascensão | 80 | 2.0% |
| Caminho Demoníaco | 10 | 0.3% |
| Vida Comum | 39 | 1.0% |
| Desvio de Qi | 212 | 5.3% |
| Fundador de Seita | 4 | 0.1% |
| A Dívida Cobrada | 1 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 4 | 0.1% |
| O Eremita das Nuvens | 13 | 0.3% |
| Perdido no Vazio | 1 | 0.0% |
| Patriarca da Seita | 1 | 0.0% |
| Guardião do Reino Secreto | 3 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 7 | 0.2% |
| Oficial da Corte Celeste | 4 | 0.1% |
| A Roda do Samsara | 18 | 0.5% |

**Reino máximo — xianxia** (2303 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 32 | 1.4% |
| Fundação | 41 | 1.8% |
| Núcleo Dourado | 210 | 9.1% |
| Alma Nascente | 274 | 11.9% |
| Transformação Divina | 302 | 13.1% |
| Refino do Vazio | 667 | 29.0% |
| Integração Corporal | 479 | 20.8% |
| Grande Ascensão | 298 | 12.9% |

**Reino máximo — murim** (1653 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 11 | 0.7% |
| Segunda Classe | 27 | 1.6% |
| Primeira Classe | 96 | 5.8% |
| Mestre de Pico | 628 | 38.0% |
| Transcendente | 505 | 30.6% |
| Além dos Limites | 260 | 15.7% |
| Lenda Marcial | 126 | 7.6% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 44 | 0.14 | 30 | 5 |
| Caminho do Sopro | 446 | 5.82 | 1191 | 7 |
| Caminho da Espada | 392 | 4.82 | 304 | 9 |
| Caminho da Alquimia | 377 | 5.51 | 1021 | 5 |
| Caminho do Corpo | 416 | 4.72 | 293 | 7 |
| Caminho da Consciência | 406 | 5.80 | 1175 | 13 |
| Caminho das Formações | 420 | 5.64 | 1074 | 4 |
| Caminho do Mérito | 409 | 4.79 | 306 | 11 |
| Caminho dos Venenos | 436 | 4.63 | 272 | 2 |
| Caminho das Bestas | 573 | 5.70 | 1119 | 12 |
| Caminho do Sangue | 81 | 5.33 | 955 | 5 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 1 | Centenário |
| 3 | Mão Verde |
| 5 | Mão de Alquimista |
| 9 | Dívida Quitada |
| 40 | A Pergunta do Portão |
| 60 | Sombra Escolhida |
| 63 | Irmãos de Alma |
| 82 | Discípulo de Sábios |
| 111 | Degraus de Nuvem |
| 124 | Despertar Sem Degraus |
| 170 | Cofre Cheio |
| 176 | Silêncio Alto |
| 221 | Simplicidade |
| 853 | A Roda Gira |
| 965 | Luz Que Fica |
| 1031 | Manto de Séculos |
| 1659 | Carimbo do Céu |
| 2098 | Pedra Fundamental |
| 2276 | Entre Passos |

Conquistas não obtidas: Fio Vermelho, Alquimista Absoluto, Retrato no Salão, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 5/5 · Mente Clara 5/5 · Fio do Destino 5/5 · Ritmo do Dao 6/6 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 4/4. Pontos sobrando: 165249.

Ascensões por quartil de vidas (1º → 4º): 20 → 18 → 22 → 20

Uso de trilhas: Caminho do Sopro 446 · Caminho da Espada 392 · Caminho da Alquimia 377 · Caminho do Corpo 416 · Caminho da Consciência 406 · Caminho das Formações 420 · Caminho do Mérito 409 · Caminho dos Venenos 436 · Caminho das Bestas 573 · Caminho do Sangue 81

Origens usadas: 14/14 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (278), despertar_reencarnado (264), despertar_demoniaco (283), regressao_visao (82), memoria_tecnica_antiga (252), inimigo_vida_passada (74), erro_da_vida_passada (71), mestre_vida_passada_renasce (71), nome_antigo (245), sussurro_do_futuro (106), segunda_chance (102), cena_sombra_sangue (155).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Olhar de Bai Ze (n=60, reino relativo +17.9 pp, ascensão 11.7%); Sutra do Céu Vazio (n=136, reino relativo +16.0 pp, ascensão 4.4%); Passo Sem Fio (n=80, reino relativo +14.2 pp, ascensão 2.5%); Anel de Jade Frio (n=256, reino relativo +12.0 pp, ascensão 4.7%); Koan do Riso Antes do Nascimento (n=204, reino relativo +11.5 pp, ascensão 2.0%).
Menores: Sutra do Mérito Silencioso (n=409, reino relativo -0.6 pp, ascensão 2.7%); Ossos de Ferro Frio (n=416, reino relativo -1.5 pp, ascensão 1.7%); Chuva de Mil Agulhas (n=436, reino relativo -2.9 pp, ascensão 0.5%).

**Eventos vistos:** 396/397. Nunca vistos: senhor_do_sangue.
Eventos raros/lendários menos frequentes: aprendiz_retorna (2), mestre_em_perigo (4), conselheiro_imperial (4), cla_prospera (5), refinar_passagem_1 (6), aprendiz_alquimista (6), tregua_sangue (6), besta_em_perigo (7).
Eventos mais repetidos (por vida): meditacao_profunda (1.8), gargalo_longo (1.0), retiro_fechado (1.0), partir_viagem (0.8), jardim_lotos (0.8), entrar_na_seita (0.7), mantra_cem_mil (0.7), oferenda_templo (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A trilha de cultivo nasce de eventos (cenas de primeiro método depois do despertar); a tabela por trilha reflete essas escolhas.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial (até nv 5), +2% de cultivo (até nv 6), +10 pedras, +1 re-sorteio, +0,8% de chance em testes (até nv 4). Os pontos ainda sobram no fim (o ganho médio por vida é maior que o total comprável); novos sumidouros podem entrar em ciclos futuros.
