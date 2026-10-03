# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 427 eventos, 93 itens, 60 técnicas, 23 finais, 10 trilhas.

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

**Taxa de ascensão:** 19 (0.5%)  
**Idade de morte:** mín 19 · p10 103 · mediana 310 · p90 1715 · p99 2708 · máx 2888

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2884 | 72.1% |
| Morte em Combate | 158 | 4.0% |
| Cinzas da Tribulação | 565 | 14.1% |
| Ascensão | 19 | 0.5% |
| Caminho Demoníaco | 16 | 0.4% |
| Vida Comum | 102 | 2.5% |
| Desvio de Qi | 206 | 5.2% |
| Fundador de Seita | 5 | 0.1% |
| A Dívida Cobrada | 1 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 3 | 0.1% |
| O Eremita das Nuvens | 18 | 0.5% |
| Perdido no Vazio | 2 | 0.1% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 3 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 3 | 0.1% |
| Oficial da Corte Celeste | 5 | 0.1% |
| A Roda do Samsara | 10 | 0.3% |

**Reino máximo — xianxia** (2299 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 47 | 2.0% |
| Fundação | 46 | 2.0% |
| Núcleo Dourado | 289 | 12.6% |
| Alma Nascente | 356 | 15.5% |
| Transformação Divina | 343 | 14.9% |
| Refino do Vazio | 690 | 30.0% |
| Integração Corporal | 362 | 15.7% |
| Grande Ascensão | 166 | 7.2% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 17 | 1.1% |
| Segunda Classe | 46 | 2.9% |
| Primeira Classe | 241 | 15.1% |
| Mestre de Pico | 753 | 47.1% |
| Transcendente | 370 | 23.1% |
| Além dos Limites | 139 | 8.7% |
| Lenda Marcial | 34 | 2.1% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 101 | 0.02 | 30 | 1 |
| Caminho do Sopro | 459 | 5.46 | 1024 | 6 |
| Caminho da Espada | 426 | 4.30 | 233 | 1 |
| Caminho da Alquimia | 420 | 5.09 | 835 | 1 |
| Caminho do Corpo | 360 | 4.10 | 208 | 0 |
| Caminho da Consciência | 415 | 5.49 | 1028 | 3 |
| Caminho das Formações | 411 | 5.18 | 862 | 1 |
| Caminho do Mérito | 400 | 4.36 | 242 | 3 |
| Caminho dos Venenos | 414 | 4.14 | 204 | 0 |
| Caminho das Bestas | 594 | 5.21 | 931 | 3 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0), memoria_tecnica_antiga (0), inimigo_vida_passada (0), erro_da_vida_passada (0), mestre_vida_passada_renasce (0), nome_antigo (0), sussurro_do_futuro (43), segunda_chance (33), cena_sombra_sangue (0), lapide_do_antecessor (0), tecnica_do_antecessor (0), discipulos_do_antecessor (0), lenda_de_eco (0), inimigo_do_antecessor (0), espelho_de_eco (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Escama de Qilin (n=63, reino relativo +17.4 pp, ascensão 1.6%); Passo Sem Fio (n=123, reino relativo +15.4 pp, ascensão 0.8%); Sutra do Céu Vazio (n=93, reino relativo +14.6 pp, ascensão 2.2%); Anel de Jade Frio (n=223, reino relativo +13.6 pp, ascensão 1.8%); Koan do Riso Antes do Nascimento (n=180, reino relativo +12.9 pp, ascensão 0.6%).
Menores: Espada do Orvalho (n=426, reino relativo -0.7 pp, ascensão 0.2%); Chuva de Mil Agulhas (n=414, reino relativo -3.1 pp, ascensão 0.0%); Ossos de Ferro Frio (n=360, reino relativo -3.6 pp, ascensão 0.0%).

**Eventos vistos:** 405/427. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao, banquete_de_sangue, senhor_do_sangue, memoria_tecnica_antiga, inimigo_vida_passada, erro_da_vida_passada, mestre_vida_passada_renasce, nome_antigo, cena_sombra_sangue, sangue_irmaos, sangue_duelo_do_fraco, sangue_chama_negra, sangue_trabalho_da_seita, lapide_do_antecessor, tecnica_do_antecessor, discipulos_do_antecessor, lenda_de_eco, inimigo_do_antecessor, espelho_de_eco.
Eventos raros/lendários menos frequentes: mestre_em_perigo (3), cla_prospera (4), rival_ascendido (4), tregua_sangue (4), dilema_lealdade (5), sucessao_seita (5), conspiracao_anciao (6), aprendiz_retorna (6).
Eventos mais repetidos (por vida): meditacao_profunda (2.1), retiro_fechado (1.1), gargalo_longo (1.1), expedicao_longe (0.9), partir_viagem (0.8), mantra_cem_mil (0.8), secar_ervas (0.8), jardim_lotos (0.8).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 73 (1.8%)  
**Idade de morte:** mín 17 · p10 111 · mediana 432 · p90 1758 · p99 2729 · máx 3067

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2871 | 71.8% |
| Morte em Combate | 106 | 2.6% |
| Cinzas da Tribulação | 634 | 15.8% |
| Ascensão | 73 | 1.8% |
| Caminho Demoníaco | 13 | 0.3% |
| Vida Comum | 41 | 1.0% |
| Desvio de Qi | 204 | 5.1% |
| Fundador de Seita | 2 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 7 | 0.2% |
| O Eremita das Nuvens | 19 | 0.5% |
| Perdido no Vazio | 1 | 0.0% |
| Patriarca da Seita | 1 | 0.0% |
| Guardião do Reino Secreto | 9 | 0.2% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 1 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 2 | 0.1% |
| Oficial da Corte Celeste | 5 | 0.1% |
| A Roda do Samsara | 11 | 0.3% |

**Reino máximo — xianxia** (2299 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 33 | 1.4% |
| Fundação | 39 | 1.7% |
| Núcleo Dourado | 259 | 11.3% |
| Alma Nascente | 264 | 11.5% |
| Transformação Divina | 293 | 12.7% |
| Refino do Vazio | 666 | 29.0% |
| Integração Corporal | 465 | 20.2% |
| Grande Ascensão | 280 | 12.2% |

**Reino máximo — murim** (1657 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 5 | 0.3% |
| Segunda Classe | 28 | 1.7% |
| Primeira Classe | 119 | 7.2% |
| Mestre de Pico | 649 | 39.2% |
| Transcendente | 478 | 28.8% |
| Além dos Limites | 254 | 15.3% |
| Lenda Marcial | 124 | 7.5% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 44 | 0.16 | 30 | 5 |
| Caminho do Sopro | 458 | 5.66 | 1125 | 11 |
| Caminho da Espada | 392 | 4.74 | 296 | 6 |
| Caminho da Alquimia | 363 | 5.50 | 1036 | 6 |
| Caminho do Corpo | 416 | 4.71 | 292 | 6 |
| Caminho da Consciência | 417 | 5.79 | 1167 | 9 |
| Caminho das Formações | 411 | 5.44 | 995 | 9 |
| Caminho do Mérito | 419 | 4.79 | 302 | 8 |
| Caminho dos Venenos | 430 | 4.59 | 266 | 3 |
| Caminho das Bestas | 568 | 5.74 | 1146 | 9 |
| Caminho do Sangue | 82 | 4.85 | 757 | 1 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 1 | Centenário |
| 3 | Mão Verde |
| 5 | Mão de Alquimista |
| 5 | Sombra Escolhida |
| 13 | Dívida Quitada |
| 35 | Simplicidade |
| 65 | Discípulo de Sábios |
| 118 | Degraus de Nuvem |
| 161 | A Roda Gira |
| 210 | Cofre Cheio |
| 267 | Irmãos de Alma |
| 344 | Luz Que Fica |
| 566 | A Pergunta do Portão |
| 742 | Silêncio Alto |
| 2140 | Carimbo do Céu |
| 2471 | Entre Passos |
| 2482 | Pedra Fundamental |
| 2593 | Despertar Sem Degraus |
| 3312 | Manto de Séculos |
| 3506 | Retrato no Salão |

Conquistas não obtidas: Fio Vermelho, Alquimista Absoluto, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 5/5 · Mente Clara 5/5 · Fio do Destino 5/5 · Ritmo do Dao 6/6 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 4/4. Pontos sobrando: 162328.

Ascensões por quartil de vidas (1º → 4º): 16 → 25 → 17 → 15

Uso de trilhas: Caminho do Sopro 458 · Caminho da Espada 392 · Caminho da Alquimia 363 · Caminho do Corpo 416 · Caminho da Consciência 417 · Caminho das Formações 411 · Caminho do Mérito 419 · Caminho dos Venenos 430 · Caminho das Bestas 568 · Caminho do Sangue 82

Origens usadas: 14/14 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (297), despertar_reencarnado (260), despertar_demoniaco (289), regressao_visao (62), memoria_tecnica_antiga (239), inimigo_vida_passada (59), erro_da_vida_passada (62), mestre_vida_passada_renasce (63), nome_antigo (235), sussurro_do_futuro (96), segunda_chance (89), cena_sombra_sangue (160), lapide_do_antecessor (936), tecnica_do_antecessor (854), discipulos_do_antecessor (855), lenda_de_eco (4761), inimigo_do_antecessor (721), espelho_de_eco (430).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Olhar de Bai Ze (n=61, reino relativo +16.7 pp, ascensão 6.6%); Grande Sutra do Ciclo (n=68, reino relativo +14.2 pp, ascensão 1.5%); Passo Sem Fio (n=74, reino relativo +13.6 pp, ascensão 1.4%); Sutra do Céu Vazio (n=109, reino relativo +12.5 pp, ascensão 2.8%); Sutra do Espelho Quieto (n=346, reino relativo +11.7 pp, ascensão 4.0%).
Menores: Anel Negro e Opaco (n=197, reino relativo -0.7 pp, ascensão 2.0%); Ossos de Ferro Frio (n=416, reino relativo -1.0 pp, ascensão 1.4%); Chuva de Mil Agulhas (n=430, reino relativo -2.8 pp, ascensão 0.7%).

**Eventos vistos:** 426/427. Nunca vistos: senhor_do_sangue.
Eventos raros/lendários menos frequentes: mestre_em_perigo (2), tregua_sangue (3), luto_e_caminho (4), dilema_lealdade (5), aprendiz_retorna (5), conselheiro_imperial (6), rival_ascendido (6), cla_prospera (7).
Eventos mais repetidos (por vida): meditacao_profunda (1.7), lenda_de_eco (1.2), gargalo_longo (0.9), retiro_fechado (0.9), expedicao_longe (0.8), entrar_na_seita (0.7), jardim_lotos (0.7), partir_viagem (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A trilha de cultivo nasce de eventos (cenas de primeiro método depois do despertar); a tabela por trilha reflete essas escolhas.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial (até nv 5), +2% de cultivo (até nv 6), +10 pedras, +1 re-sorteio, +0,8% de chance em testes (até nv 4). Os pontos ainda sobram no fim (o ganho médio por vida é maior que o total comprável); novos sumidouros podem entrar em ciclos futuros.
