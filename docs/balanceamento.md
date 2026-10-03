# Balanceamento — linha de base

Gerado por `npm run sim -- 6000 --report` em 2026-10-03.
Conteúdo: 590 eventos, 95 itens, 63 técnicas, 37 finais, 10 trilhas.

## Como o bot joga
- 70% das vezes escolhe a opção de maior chance de sucesso; nos demais casos escolhe ao acaso entre as opções seguras.
- Evita escolhas que encerram a vida (risco de final > 12%), exceto quando a idade passa de 90% da vida máxima ou resta menos de 15 anos.
- No modo meta, busca o caminho demoníaco (aceita ofertas, sacrifícios e pactos) em metade das vidas até liberar a conquista, escolhe trilhas liberadas ao acaso e gasta a Herança do Dao em ritmo → mente → corpo → destino → bolso.

## Metas de balanceamento
- Ascender é raro (~1% no bot), mas possível; um jogador atento deve superar o bot.
- A maioria das vidas termina entre o 3º e o 5º reino.
- Nenhum final voluntário (eremita, sacrifício, reencarnação) passa de ~5% das vidas.

### Vidas independentes (meta vazia; a trilha nasce dos eventos)

6000 vidas.

**Taxa de ascensão:** 46 (0.8%)  
**Idade de morte:** mín 18 · p10 51 · mediana 210 · p90 1076 · p99 2697 · máx 3144

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 925 | 15.4% |
| Morte em Combate | 635 | 10.6% |
| Cinzas da Tribulação | 1130 | 18.8% |
| Ascensão | 46 | 0.8% |
| Caminho Demoníaco | 111 | 1.9% |
| Vida Comum | 260 | 4.3% |
| Desvio de Qi | 370 | 6.2% |
| Fundador de Seita | 12 | 0.2% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 12 | 0.2% |
| Sacrifício Final | 11 | 0.2% |
| O Eremita das Nuvens | 31 | 0.5% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 2 | 0.0% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 1 | 0.0% |
| O Penitente | 1 | 0.0% |
| A Iluminação | 17 | 0.3% |
| Oficial da Corte Celeste | 6 | 0.1% |
| Mestre Respeitado | 1482 | 24.7% |
| O Velho Esquecido | 11 | 0.2% |
| A Casa Cheia | 45 | 0.8% |
| O Sábio da Montanha | 384 | 6.4% |
| O Rancor Que Sobrou | 64 | 1.1% |
| A Fortuna Que Ficou | 0 | 0.0% |
| O Veterano das Cicatrizes | 38 | 0.6% |
| Caído na Guerra | 145 | 2.4% |
| A Febre da Praga | 68 | 1.1% |
| Engolido pela Maré de Bestas | 51 | 0.8% |
| Exilado Para Sempre | 35 | 0.6% |
| Caçado pelo Culto | 83 | 1.4% |
| Punhal nas Costas | 0 | 0.0% |
| Morto em Duelo de Honra | 0 | 0.0% |
| A Roda do Samsara | 24 | 0.4% |

**Reino máximo — xianxia** (3371 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 107 | 3.2% |
| Fundação | 216 | 6.4% |
| Núcleo Dourado | 778 | 23.1% |
| Alma Nascente | 672 | 19.9% |
| Transformação Divina | 610 | 18.1% |
| Refino do Vazio | 498 | 14.8% |
| Integração Corporal | 284 | 8.4% |
| Grande Ascensão | 206 | 6.1% |

**Reino máximo — murim** (2368 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 26 | 1.1% |
| Segunda Classe | 101 | 4.3% |
| Primeira Classe | 322 | 13.6% |
| Mestre de Pico | 1247 | 52.7% |
| Transcendente | 414 | 17.5% |
| Além dos Limites | 164 | 6.9% |
| Lenda Marcial | 94 | 4.0% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 261 | 0.00 | 30 | 0 |
| Caminho do Sopro | 719 | 4.72 | 705 | 15 |
| Caminho da Espada | 632 | 4.27 | 261 | 8 |
| Caminho da Alquimia | 600 | 4.28 | 523 | 0 |
| Caminho do Corpo | 570 | 4.06 | 227 | 1 |
| Caminho da Consciência | 563 | 4.86 | 782 | 10 |
| Caminho das Formações | 626 | 4.35 | 534 | 3 |
| Caminho do Mérito | 593 | 4.32 | 270 | 5 |
| Caminho dos Venenos | 573 | 4.05 | 209 | 0 |
| Caminho das Bestas | 863 | 4.42 | 631 | 4 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0), memoria_tecnica_antiga (0), inimigo_vida_passada (0), erro_da_vida_passada (0), mestre_vida_passada_renasce (0), nome_antigo (0), sussurro_do_futuro (71), segunda_chance (75), cena_sombra_sangue (0), lapide_do_antecessor (0), tecnica_do_antecessor (0), discipulos_do_antecessor (0), lenda_de_eco (0), inimigo_do_antecessor (0), espelho_de_eco (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Ciclo de Cem Respirações (n=106, reino relativo +29.3 pp, ascensão 2.8%); Sutra do Céu Vazio (n=78, reino relativo +22.6 pp, ascensão 6.4%); Cristal de Formação (n=91, reino relativo +20.6 pp, ascensão 2.2%); Amuleto das Nove Caudas (n=66, reino relativo +19.9 pp, ascensão 4.5%); Olho do Registro (n=86, reino relativo +17.5 pp, ascensão 1.2%).
Menores: Pacto da Fera Irmã (n=863, reino relativo -0.1 pp, ascensão 0.5%); Traços do Primeiro Selo (n=626, reino relativo -0.9 pp, ascensão 0.5%); Caldeirão de Fogo Calmo (n=600, reino relativo -1.9 pp, ascensão 0.0%).

**Eventos vistos:** 566/590. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao, banquete_de_sangue, memoria_tecnica_antiga, inimigo_vida_passada, erro_da_vida_passada, mestre_vida_passada_renasce, nome_antigo, cena_sombra_sangue, sangue_irmaos, sangue_duelo_do_fraco, sangue_chama_negra, sangue_trabalho_da_seita, lapide_do_antecessor, tecnica_do_antecessor, discipulos_do_antecessor, lenda_de_eco, inimigo_do_antecessor, espelho_de_eco, tp_sangue_gota, tp_sangue_rio, tp_sangue_trono.
Eventos raros/lendários menos frequentes: tp_venenos_rei (1), senhor_do_sangue (2), tp_budista_vajra (2), mestre_em_perigo (3), sucessao_seita (3), o_grande_inimigo (3), bestas_evolucao (3), tp_espada_montanha (3).
Eventos mais repetidos (por vida): __retiro (9.9), meditacao_profunda (1.2), retiro_fechado (0.8), entrar_na_seita (0.8), marco_t2 (0.7), marco_t3 (0.7), gargalo_longo (0.7), r2_primeiro_voo (0.7).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

6000 vidas.

**Taxa de ascensão:** 117 (1.9%)  
**Idade de morte:** mín 15 · p10 61 · mediana 291 · p90 1706 · p99 2745 · máx 3112

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 672 | 11.2% |
| Morte em Combate | 590 | 9.8% |
| Cinzas da Tribulação | 1253 | 20.9% |
| Ascensão | 117 | 1.9% |
| Caminho Demoníaco | 80 | 1.3% |
| Vida Comum | 119 | 2.0% |
| Desvio de Qi | 416 | 6.9% |
| Fundador de Seita | 12 | 0.2% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 6 | 0.1% |
| Sacrifício Final | 5 | 0.1% |
| O Eremita das Nuvens | 21 | 0.3% |
| Perdido no Vazio | 2 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 4 | 0.1% |
| A Pílula Suprema | 1 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 11 | 0.2% |
| Oficial da Corte Celeste | 2 | 0.0% |
| Mestre Respeitado | 1885 | 31.4% |
| O Velho Esquecido | 1 | 0.0% |
| A Casa Cheia | 38 | 0.6% |
| O Sábio da Montanha | 320 | 5.3% |
| O Rancor Que Sobrou | 27 | 0.5% |
| A Fortuna Que Ficou | 1 | 0.0% |
| O Veterano das Cicatrizes | 62 | 1.0% |
| Caído na Guerra | 123 | 2.0% |
| A Febre da Praga | 48 | 0.8% |
| Engolido pela Maré de Bestas | 55 | 0.9% |
| Exilado Para Sempre | 33 | 0.6% |
| Caçado pelo Culto | 71 | 1.2% |
| Punhal nas Costas | 0 | 0.0% |
| Morto em Duelo de Honra | 0 | 0.0% |
| A Roda do Samsara | 25 | 0.4% |

**Reino máximo — xianxia** (3425 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 82 | 2.4% |
| Fundação | 178 | 5.2% |
| Núcleo Dourado | 660 | 19.3% |
| Alma Nascente | 559 | 16.3% |
| Transformação Divina | 569 | 16.6% |
| Refino do Vazio | 575 | 16.8% |
| Integração Corporal | 404 | 11.8% |
| Grande Ascensão | 398 | 11.6% |

**Reino máximo — murim** (2456 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 24 | 1.0% |
| Segunda Classe | 72 | 2.9% |
| Primeira Classe | 214 | 8.7% |
| Mestre de Pico | 1132 | 46.1% |
| Transcendente | 555 | 22.6% |
| Além dos Limites | 260 | 10.6% |
| Lenda Marcial | 199 | 8.1% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 119 | 0.00 | 30 | 0 |
| Caminho do Sopro | 716 | 5.26 | 934 | 35 |
| Caminho da Espada | 631 | 4.52 | 291 | 7 |
| Caminho da Alquimia | 599 | 4.70 | 664 | 6 |
| Caminho do Corpo | 599 | 4.46 | 286 | 5 |
| Caminho da Consciência | 573 | 5.19 | 949 | 15 |
| Caminho das Formações | 613 | 4.69 | 673 | 5 |
| Caminho do Mérito | 616 | 4.80 | 337 | 15 |
| Caminho dos Venenos | 610 | 4.24 | 236 | 1 |
| Caminho das Bestas | 822 | 4.90 | 792 | 23 |
| Caminho do Sangue | 102 | 4.94 | 810 | 5 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Simplicidade |
| 3 | Primeiro Passo |
| 3 | Alicerce Firme |
| 3 | Núcleo Brilhante |
| 3 | Mão de Alquimista |
| 4 | Centenário |
| 4 | Dívida Quitada |
| 10 | Mão Verde |
| 12 | Sombra Escolhida |
| 30 | A Roda Gira |
| 41 | Pedra Fundamental |
| 94 | Discípulo de Sábios |
| 96 | Degraus de Nuvem |
| 216 | Irmãos de Alma |
| 341 | Silêncio Alto |
| 540 | Entre Passos |
| 710 | Despertar Sem Degraus |
| 765 | Cofre Cheio |
| 1035 | Fio Vermelho |
| 1983 | Luz Que Fica |
| 4155 | A Pergunta do Portão |
| 4212 | Carimbo do Céu |
| 5982 | Alquimista Absoluto |

Conquistas não obtidas: Manto de Séculos, Retrato no Salão, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 5/5 · Mente Clara 5/5 · Fio do Destino 5/5 · Ritmo do Dao 6/6 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 4/4. Pontos sobrando: 261697.

Ascensões por quartil de vidas (1º → 4º): 31 → 30 → 35 → 21

Uso de trilhas: Caminho do Sopro 716 · Caminho da Espada 631 · Caminho da Alquimia 599 · Caminho do Corpo 599 · Caminho da Consciência 573 · Caminho das Formações 613 · Caminho do Mérito 616 · Caminho dos Venenos 610 · Caminho das Bestas 822 · Caminho do Sangue 102

Origens usadas: 14/14 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (380), despertar_reencarnado (398), despertar_demoniaco (386), regressao_visao (106), memoria_tecnica_antiga (358), inimigo_vida_passada (105), erro_da_vida_passada (102), mestre_vida_passada_renasce (91), nome_antigo (346), sussurro_do_futuro (156), segunda_chance (138), cena_sombra_sangue (214), lapide_do_antecessor (1425), tecnica_do_antecessor (1311), discipulos_do_antecessor (1230), lenda_de_eco (5608), inimigo_do_antecessor (1068), espelho_de_eco (591).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Ciclo de Cem Respirações (n=183, reino relativo +24.6 pp, ascensão 8.7%); Sutra do Céu Vazio (n=112, reino relativo +22.4 pp, ascensão 9.8%); Selo da Consciência (n=61, reino relativo +20.9 pp, ascensão 6.6%); Amuleto das Nove Caudas (n=65, reino relativo +19.1 pp, ascensão 4.6%); Grande Sutra do Ciclo (n=70, reino relativo +18.7 pp, ascensão 10.0%).
Menores: Chuva de Mil Agulhas (n=610, reino relativo -1.1 pp, ascensão 0.2%); Caldeirão de Fogo Calmo (n=599, reino relativo -3.0 pp, ascensão 1.0%); Traços do Primeiro Selo (n=613, reino relativo -3.1 pp, ascensão 0.8%).

**Eventos vistos:** 590/590. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: tp_venenos_rei (1), tp_sangue_trono (1), o_grande_inimigo (2), senhor_do_sangue (3), rival_ascendido (4), tp_corpo_diamante (4), tp_budista_vajra (4), r8_alquimia_imortalidade (5).
Eventos mais repetidos (por vida): __retiro (11.2), meditacao_profunda (1.0), lenda_de_eco (0.9), entrar_na_seita (0.7), mundo_guerra_inicio (0.7), mundo_mare_inicio (0.7), retiro_fechado (0.7), marco_t3 (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A trilha de cultivo nasce de eventos (cenas de primeiro método depois do despertar); a tabela por trilha reflete essas escolhas.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial (até nv 5), +2% de cultivo (até nv 6), +10 pedras, +1 re-sorteio, +0,8% de chance em testes (até nv 4). Os pontos ainda sobram no fim (o ganho médio por vida é maior que o total comprável); novos sumidouros podem entrar em ciclos futuros.
