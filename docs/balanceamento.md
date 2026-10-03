# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 420 eventos, 92 itens, 59 técnicas, 23 finais, 10 trilhas.

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

**Taxa de ascensão:** 37 (0.9%)  
**Idade de morte:** mín 19 · p10 103 · mediana 308 · p90 1705 · p99 2695 · máx 2870

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2844 | 71.1% |
| Morte em Combate | 137 | 3.4% |
| Cinzas da Tribulação | 592 | 14.8% |
| Ascensão | 37 | 0.9% |
| Caminho Demoníaco | 13 | 0.3% |
| Vida Comum | 103 | 2.6% |
| Desvio de Qi | 213 | 5.3% |
| Fundador de Seita | 2 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 9 | 0.2% |
| O Eremita das Nuvens | 12 | 0.3% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 9 | 0.2% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 4 | 0.1% |
| Oficial da Corte Celeste | 8 | 0.2% |
| A Roda do Samsara | 17 | 0.4% |

**Reino máximo — xianxia** (2299 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 47 | 2.0% |
| Fundação | 37 | 1.6% |
| Núcleo Dourado | 315 | 13.7% |
| Alma Nascente | 386 | 16.8% |
| Transformação Divina | 362 | 15.7% |
| Refino do Vazio | 662 | 28.8% |
| Integração Corporal | 318 | 13.8% |
| Grande Ascensão | 172 | 7.5% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 17 | 1.1% |
| Segunda Classe | 44 | 2.8% |
| Primeira Classe | 243 | 15.2% |
| Mestre de Pico | 715 | 44.7% |
| Transcendente | 381 | 23.8% |
| Além dos Limites | 154 | 9.6% |
| Lenda Marcial | 46 | 2.9% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 101 | 0.02 | 30 | 1 |
| Caminho do Sopro | 459 | 5.34 | 967 | 10 |
| Caminho da Espada | 426 | 4.27 | 230 | 3 |
| Caminho da Alquimia | 420 | 5.13 | 875 | 2 |
| Caminho do Corpo | 360 | 4.22 | 228 | 0 |
| Caminho da Consciência | 415 | 5.38 | 975 | 6 |
| Caminho das Formações | 411 | 5.09 | 847 | 4 |
| Caminho do Mérito | 400 | 4.43 | 248 | 5 |
| Caminho dos Venenos | 414 | 4.20 | 214 | 2 |
| Caminho das Bestas | 594 | 5.16 | 883 | 4 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0), memoria_tecnica_antiga (0), inimigo_vida_passada (0), erro_da_vida_passada (0), mestre_vida_passada_renasce (0), nome_antigo (0), sussurro_do_futuro (53), segunda_chance (42), cena_sombra_sangue (0), lapide_do_antecessor (0), tecnica_do_antecessor (0), discipulos_do_antecessor (0), lenda_de_eco (0), inimigo_do_antecessor (0), espelho_de_eco (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Sutra do Céu Vazio (n=106, reino relativo +17.5 pp, ascensão 3.8%); Passo Sem Fio (n=104, reino relativo +14.3 pp, ascensão 2.9%); Anel de Jade Frio (n=226, reino relativo +13.8 pp, ascensão 0.9%); Sutra do Espelho Quieto (n=275, reino relativo +13.5 pp, ascensão 1.8%); Koan do Riso Antes do Nascimento (n=157, reino relativo +12.0 pp, ascensão 1.3%).
Menores: Espada do Orvalho (n=426, reino relativo -1.0 pp, ascensão 0.7%); Ossos de Ferro Frio (n=360, reino relativo -1.7 pp, ascensão 0.0%); Chuva de Mil Agulhas (n=414, reino relativo -2.0 pp, ascensão 0.5%).

**Eventos vistos:** 399/420. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao, banquete_de_sangue, memoria_tecnica_antiga, inimigo_vida_passada, erro_da_vida_passada, mestre_vida_passada_renasce, nome_antigo, cena_sombra_sangue, sangue_irmaos, sangue_duelo_do_fraco, sangue_chama_negra, sangue_trabalho_da_seita, lapide_do_antecessor, tecnica_do_antecessor, discipulos_do_antecessor, lenda_de_eco, inimigo_do_antecessor, espelho_de_eco.
Eventos raros/lendários menos frequentes: mestre_em_perigo (1), senhor_do_sangue (1), rival_ascendido (2), cla_prospera (3), sucessao_seita (4), aprendiz_retorna (4), o_grande_inimigo (4), dilema_lealdade (5).
Eventos mais repetidos (por vida): meditacao_profunda (2.1), retiro_fechado (1.2), gargalo_longo (1.1), expedicao_longe (0.9), jardim_lotos (0.9), partir_viagem (0.8), fantasma_faminto (0.8), mantra_cem_mil (0.8).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 69 (1.7%)  
**Idade de morte:** mín 17 · p10 114 · mediana 464 · p90 1768 · p99 2748 · máx 3077

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2982 | 74.5% |
| Morte em Combate | 84 | 2.1% |
| Cinzas da Tribulação | 563 | 14.1% |
| Ascensão | 69 | 1.7% |
| Caminho Demoníaco | 6 | 0.1% |
| Vida Comum | 40 | 1.0% |
| Desvio de Qi | 194 | 4.8% |
| Fundador de Seita | 3 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 6 | 0.1% |
| O Eremita das Nuvens | 17 | 0.4% |
| Perdido no Vazio | 3 | 0.1% |
| Patriarca da Seita | 2 | 0.1% |
| Guardião do Reino Secreto | 6 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 5 | 0.1% |
| Oficial da Corte Celeste | 3 | 0.1% |
| A Roda do Samsara | 16 | 0.4% |

**Reino máximo — xianxia** (2307 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 26 | 1.1% |
| Fundação | 36 | 1.6% |
| Núcleo Dourado | 223 | 9.7% |
| Alma Nascente | 231 | 10.0% |
| Transformação Divina | 292 | 12.7% |
| Refino do Vazio | 709 | 30.7% |
| Integração Corporal | 496 | 21.5% |
| Grande Ascensão | 294 | 12.7% |

**Reino máximo — murim** (1652 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 6 | 0.4% |
| Segunda Classe | 19 | 1.2% |
| Primeira Classe | 103 | 6.2% |
| Mestre de Pico | 650 | 39.3% |
| Transcendente | 490 | 29.7% |
| Além dos Limites | 262 | 15.9% |
| Lenda Marcial | 122 | 7.4% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 41 | 0.10 | 30 | 4 |
| Caminho do Sopro | 455 | 5.82 | 1169 | 9 |
| Caminho da Espada | 385 | 4.87 | 317 | 5 |
| Caminho da Alquimia | 399 | 5.52 | 1024 | 3 |
| Caminho do Corpo | 427 | 4.65 | 282 | 7 |
| Caminho da Consciência | 406 | 5.94 | 1256 | 11 |
| Caminho das Formações | 417 | 5.54 | 1023 | 11 |
| Caminho do Mérito | 419 | 4.75 | 293 | 6 |
| Caminho dos Venenos | 421 | 4.70 | 280 | 4 |
| Caminho das Bestas | 559 | 5.87 | 1198 | 7 |
| Caminho do Sangue | 71 | 5.32 | 966 | 2 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 1 | Centenário |
| 3 | Mão Verde |
| 4 | A Roda Gira |
| 5 | Mão de Alquimista |
| 10 | Discípulo de Sábios |
| 25 | Degraus de Nuvem |
| 26 | Sombra Escolhida |
| 33 | Dívida Quitada |
| 35 | Simplicidade |
| 114 | Luz Que Fica |
| 167 | Irmãos de Alma |
| 171 | Pedra Fundamental |
| 247 | Manto de Séculos |
| 289 | Silêncio Alto |
| 304 | A Pergunta do Portão |
| 357 | Entre Passos |
| 977 | Despertar Sem Degraus |
| 1396 | Carimbo do Céu |
| 1660 | Fio Vermelho |
| 2380 | Cofre Cheio |

Conquistas não obtidas: Alquimista Absoluto, Retrato no Salão, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 5/5 · Mente Clara 5/5 · Fio do Destino 5/5 · Ritmo do Dao 6/6 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 4/4. Pontos sobrando: 164269.

Ascensões por quartil de vidas (1º → 4º): 16 → 21 → 14 → 18

Uso de trilhas: Caminho do Sopro 455 · Caminho da Espada 385 · Caminho da Alquimia 399 · Caminho do Corpo 427 · Caminho da Consciência 406 · Caminho das Formações 417 · Caminho do Mérito 419 · Caminho dos Venenos 421 · Caminho das Bestas 559 · Caminho do Sangue 71

Origens usadas: 14/14 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (262), despertar_reencarnado (268), despertar_demoniaco (254), regressao_visao (75), memoria_tecnica_antiga (243), inimigo_vida_passada (66), erro_da_vida_passada (77), mestre_vida_passada_renasce (71), nome_antigo (244), sussurro_do_futuro (110), segunda_chance (94), cena_sombra_sangue (145), lapide_do_antecessor (948), tecnica_do_antecessor (904), discipulos_do_antecessor (841), lenda_de_eco (4941), inimigo_do_antecessor (751), espelho_de_eco (406).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Sutra do Céu Vazio (n=117, reino relativo +16.5 pp, ascensão 2.6%); Anel de Jade Frio (n=247, reino relativo +12.0 pp, ascensão 4.0%); Koan do Riso Antes do Nascimento (n=177, reino relativo +10.9 pp, ascensão 4.5%); Passo Sem Fio (n=104, reino relativo +10.0 pp, ascensão 3.8%); Sutra do Espelho Quieto (n=377, reino relativo +10.0 pp, ascensão 2.9%).
Menores: Sutra do Mérito Silencioso (n=419, reino relativo -1.6 pp, ascensão 1.4%); Chuva de Mil Agulhas (n=421, reino relativo -2.2 pp, ascensão 1.0%); Ossos de Ferro Frio (n=427, reino relativo -3.0 pp, ascensão 1.6%).

**Eventos vistos:** 420/420. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: senhor_do_sangue (2), pacto_sangue_antigo (3), cla_prospera (3), besta_em_perigo (4), mestre_em_perigo (5), armadura_escamas (5), dilema_lealdade (6), aprendiz_retorna (6).
Eventos mais repetidos (por vida): meditacao_profunda (1.8), lenda_de_eco (1.2), gargalo_longo (1.0), retiro_fechado (0.9), expedicao_longe (0.8), entrar_na_seita (0.7), partir_viagem (0.7), jardim_lotos (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A trilha de cultivo nasce de eventos (cenas de primeiro método depois do despertar); a tabela por trilha reflete essas escolhas.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial (até nv 5), +2% de cultivo (até nv 6), +10 pedras, +1 re-sorteio, +0,8% de chance em testes (até nv 4). Os pontos ainda sobram no fim (o ganho médio por vida é maior que o total comprável); novos sumidouros podem entrar em ciclos futuros.
