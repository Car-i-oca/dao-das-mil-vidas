# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 414 eventos, 92 itens, 59 técnicas, 23 finais, 10 trilhas.

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

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0), memoria_tecnica_antiga (0), inimigo_vida_passada (0), erro_da_vida_passada (0), mestre_vida_passada_renasce (0), nome_antigo (0), sussurro_do_futuro (53), segunda_chance (42), cena_sombra_sangue (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Sutra do Céu Vazio (n=106, reino relativo +17.5 pp, ascensão 3.8%); Passo Sem Fio (n=104, reino relativo +14.3 pp, ascensão 2.9%); Anel de Jade Frio (n=226, reino relativo +13.8 pp, ascensão 0.9%); Sutra do Espelho Quieto (n=275, reino relativo +13.5 pp, ascensão 1.8%); Koan do Riso Antes do Nascimento (n=157, reino relativo +12.0 pp, ascensão 1.3%).
Menores: Espada do Orvalho (n=426, reino relativo -1.0 pp, ascensão 0.7%); Ossos de Ferro Frio (n=360, reino relativo -1.7 pp, ascensão 0.0%); Chuva de Mil Agulhas (n=414, reino relativo -2.0 pp, ascensão 0.5%).

**Eventos vistos:** 399/414. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao, banquete_de_sangue, memoria_tecnica_antiga, inimigo_vida_passada, erro_da_vida_passada, mestre_vida_passada_renasce, nome_antigo, cena_sombra_sangue, sangue_irmaos, sangue_duelo_do_fraco, sangue_chama_negra, sangue_trabalho_da_seita.
Eventos raros/lendários menos frequentes: mestre_em_perigo (1), senhor_do_sangue (1), rival_ascendido (2), cla_prospera (3), sucessao_seita (4), aprendiz_retorna (4), o_grande_inimigo (4), dilema_lealdade (5).
Eventos mais repetidos (por vida): meditacao_profunda (2.1), retiro_fechado (1.2), gargalo_longo (1.1), expedicao_longe (0.9), jardim_lotos (0.9), partir_viagem (0.8), fantasma_faminto (0.8), mantra_cem_mil (0.8).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 71 (1.8%)  
**Idade de morte:** mín 19 · p10 113 · mediana 461 · p90 1757 · p99 2756 · máx 3066

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2924 | 73.1% |
| Morte em Combate | 89 | 2.2% |
| Cinzas da Tribulação | 617 | 15.4% |
| Ascensão | 71 | 1.8% |
| Caminho Demoníaco | 13 | 0.3% |
| Vida Comum | 37 | 0.9% |
| Desvio de Qi | 197 | 4.9% |
| Fundador de Seita | 2 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 7 | 0.2% |
| O Eremita das Nuvens | 15 | 0.4% |
| Perdido no Vazio | 1 | 0.0% |
| Patriarca da Seita | 2 | 0.1% |
| Guardião do Reino Secreto | 4 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 6 | 0.1% |
| Oficial da Corte Celeste | 2 | 0.1% |
| A Roda do Samsara | 12 | 0.3% |

**Reino máximo — xianxia** (2316 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 32 | 1.4% |
| Fundação | 39 | 1.7% |
| Núcleo Dourado | 233 | 10.1% |
| Alma Nascente | 254 | 11.0% |
| Transformação Divina | 276 | 11.9% |
| Refino do Vazio | 752 | 32.5% |
| Integração Corporal | 467 | 20.2% |
| Grande Ascensão | 263 | 11.4% |

**Reino máximo — murim** (1640 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 11 | 0.7% |
| Segunda Classe | 22 | 1.3% |
| Primeira Classe | 90 | 5.5% |
| Mestre de Pico | 603 | 36.8% |
| Transcendente | 527 | 32.1% |
| Além dos Limites | 257 | 15.7% |
| Lenda Marcial | 130 | 7.9% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 44 | 0.16 | 30 | 5 |
| Caminho do Sopro | 456 | 5.72 | 1149 | 10 |
| Caminho da Espada | 392 | 4.85 | 312 | 7 |
| Caminho da Alquimia | 369 | 5.53 | 1027 | 4 |
| Caminho do Corpo | 415 | 4.71 | 288 | 4 |
| Caminho da Consciência | 419 | 5.72 | 1130 | 2 |
| Caminho das Formações | 414 | 5.60 | 1058 | 8 |
| Caminho do Mérito | 410 | 4.88 | 313 | 12 |
| Caminho dos Venenos | 423 | 4.66 | 276 | 5 |
| Caminho das Bestas | 570 | 5.71 | 1127 | 12 |
| Caminho do Sangue | 88 | 5.32 | 854 | 2 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 1 | Centenário |
| 3 | Mão Verde |
| 5 | Mão de Alquimista |
| 11 | Degraus de Nuvem |
| 13 | Dívida Quitada |
| 33 | Sombra Escolhida |
| 35 | Simplicidade |
| 78 | Discípulo de Sábios |
| 109 | A Roda Gira |
| 228 | Irmãos de Alma |
| 441 | Silêncio Alto |
| 560 | Luz Que Fica |
| 704 | A Pergunta do Portão |
| 1056 | Despertar Sem Degraus |
| 1952 | Manto de Séculos |
| 2098 | Carimbo do Céu |
| 2721 | Pedra Fundamental |
| 3008 | Fio Vermelho |
| 3095 | Entre Passos |

Conquistas não obtidas: Cofre Cheio, Alquimista Absoluto, Retrato no Salão, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 5/5 · Mente Clara 5/5 · Fio do Destino 5/5 · Ritmo do Dao 6/6 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 4/4. Pontos sobrando: 163493.

Ascensões por quartil de vidas (1º → 4º): 20 → 18 → 19 → 14

Uso de trilhas: Caminho do Sopro 456 · Caminho da Espada 392 · Caminho da Alquimia 369 · Caminho do Corpo 415 · Caminho da Consciência 419 · Caminho das Formações 414 · Caminho do Mérito 410 · Caminho dos Venenos 423 · Caminho das Bestas 570 · Caminho do Sangue 88

Origens usadas: 14/14 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (298), despertar_reencarnado (257), despertar_demoniaco (284), regressao_visao (65), memoria_tecnica_antiga (238), inimigo_vida_passada (65), erro_da_vida_passada (66), mestre_vida_passada_renasce (69), nome_antigo (232), sussurro_do_futuro (133), segunda_chance (114), cena_sombra_sangue (165).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Olhar de Bai Ze (n=68, reino relativo +15.1 pp, ascensão 5.9%); Sutra do Céu Vazio (n=126, reino relativo +14.3 pp, ascensão 3.2%); Escama de Qilin (n=63, reino relativo +12.9 pp, ascensão 3.2%); Grande Sutra do Ciclo (n=73, reino relativo +12.4 pp, ascensão 4.1%); Passo Sem Fio (n=75, reino relativo +11.9 pp, ascensão 0.0%).
Menores: Anel Negro e Opaco (n=200, reino relativo -1.7 pp, ascensão 1.0%); Ossos de Ferro Frio (n=415, reino relativo -1.8 pp, ascensão 1.0%); Chuva de Mil Agulhas (n=423, reino relativo -2.5 pp, ascensão 1.2%).

**Eventos vistos:** 413/414. Nunca vistos: senhor_do_sangue.
Eventos raros/lendários menos frequentes: mestre_em_perigo (3), aprendiz_retorna (3), besta_em_perigo (5), luto_e_caminho (5), rival_ascendido (5), bestas_evolucao (5), refinar_passagem_1 (6), pacto_sangue_antigo (6).
Eventos mais repetidos (por vida): meditacao_profunda (1.8), gargalo_longo (1.0), retiro_fechado (1.0), expedicao_longe (0.8), partir_viagem (0.8), entrar_na_seita (0.7), jardim_lotos (0.7), fantasma_faminto (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A trilha de cultivo nasce de eventos (cenas de primeiro método depois do despertar); a tabela por trilha reflete essas escolhas.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial (até nv 5), +2% de cultivo (até nv 6), +10 pedras, +1 re-sorteio, +0,8% de chance em testes (até nv 4). Os pontos ainda sobram no fim (o ganho médio por vida é maior que o total comprável); novos sumidouros podem entrar em ciclos futuros.
