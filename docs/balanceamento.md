# Balanceamento — linha de base

Gerado por `npm run sim -- 6000 --report` em 2026-10-03.
Conteúdo: 714 eventos, 95 itens, 63 técnicas, 37 finais, 10 trilhas.

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

**Taxa de ascensão:** 51 (0.8%)  
**Idade de morte:** mín 18 · p10 43 · mediana 232 · p90 1094 · p99 2708 · máx 2979

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 440 | 7.3% |
| Morte em Combate | 873 | 14.6% |
| Cinzas da Tribulação | 783 | 13.1% |
| Ascensão | 51 | 0.8% |
| Caminho Demoníaco | 73 | 1.2% |
| Vida Comum | 365 | 6.1% |
| Desvio de Qi | 375 | 6.3% |
| Fundador de Seita | 12 | 0.2% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 7 | 0.1% |
| Sacrifício Final | 8 | 0.1% |
| O Eremita das Nuvens | 37 | 0.6% |
| Perdido no Vazio | 1 | 0.0% |
| Patriarca da Seita | 1 | 0.0% |
| Guardião do Reino Secreto | 5 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 1 | 0.0% |
| Senhor do Sangue | 1 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 14 | 0.2% |
| Oficial da Corte Celeste | 15 | 0.3% |
| Mestre Respeitado | 1729 | 28.8% |
| O Velho Esquecido | 7 | 0.1% |
| A Casa Cheia | 35 | 0.6% |
| O Sábio da Montanha | 700 | 11.7% |
| O Rancor Que Sobrou | 5 | 0.1% |
| A Fortuna Que Ficou | 0 | 0.0% |
| O Veterano das Cicatrizes | 24 | 0.4% |
| Caído na Guerra | 136 | 2.3% |
| A Febre da Praga | 65 | 1.1% |
| Engolido pela Maré de Bestas | 83 | 1.4% |
| Exilado Para Sempre | 46 | 0.8% |
| Caçado pelo Culto | 68 | 1.1% |
| Punhal nas Costas | 0 | 0.0% |
| Morto em Duelo de Honra | 0 | 0.0% |
| A Roda do Samsara | 40 | 0.7% |

**Reino máximo — xianxia** (3299 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 109 | 3.3% |
| Fundação | 217 | 6.6% |
| Núcleo Dourado | 611 | 18.5% |
| Alma Nascente | 534 | 16.2% |
| Transformação Divina | 756 | 22.9% |
| Refino do Vazio | 573 | 17.4% |
| Integração Corporal | 302 | 9.2% |
| Grande Ascensão | 197 | 6.0% |

**Reino máximo — murim** (2335 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 45 | 1.9% |
| Segunda Classe | 110 | 4.7% |
| Primeira Classe | 228 | 9.8% |
| Mestre de Pico | 1193 | 51.1% |
| Transcendente | 504 | 21.6% |
| Além dos Limites | 178 | 7.6% |
| Lenda Marcial | 77 | 3.3% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 366 | 0.00 | 30 | 0 |
| Caminho do Sopro | 696 | 4.87 | 790 | 15 |
| Caminho da Espada | 597 | 4.23 | 244 | 4 |
| Caminho da Alquimia | 614 | 4.51 | 611 | 5 |
| Caminho do Corpo | 558 | 4.08 | 236 | 2 |
| Caminho da Consciência | 557 | 4.79 | 759 | 5 |
| Caminho das Formações | 584 | 4.55 | 602 | 0 |
| Caminho do Mérito | 574 | 4.34 | 272 | 7 |
| Caminho dos Venenos | 606 | 4.21 | 238 | 5 |
| Caminho das Bestas | 848 | 4.64 | 698 | 8 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0), memoria_tecnica_antiga (0), inimigo_vida_passada (0), erro_da_vida_passada (0), mestre_vida_passada_renasce (0), nome_antigo (0), sussurro_do_futuro (98), segunda_chance (89), cena_sombra_sangue (0), lapide_do_antecessor (0), tecnica_do_antecessor (0), discipulos_do_antecessor (0), lenda_de_eco (0), inimigo_do_antecessor (0), espelho_de_eco (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Memória de Mão Antiga (n=63, reino relativo +29.9 pp, ascensão 3.2%); Ciclo de Cem Respirações (n=159, reino relativo +28.3 pp, ascensão 4.4%); Selo da Consciência (n=86, reino relativo +20.0 pp, ascensão 3.5%); Sutra do Céu Vazio (n=167, reino relativo +17.9 pp, ascensão 2.4%); Anel de Jade Frio (n=277, reino relativo +17.8 pp, ascensão 1.1%).
Menores: Pacto da Fera Irmã (n=848, reino relativo +2.4 pp, ascensão 0.9%); Traços do Primeiro Selo (n=584, reino relativo +1.3 pp, ascensão 0.0%); Caldeirão de Fogo Calmo (n=614, reino relativo +0.8 pp, ascensão 0.8%).

**Eventos vistos:** 652/714. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao, banquete_de_sangue, viuva_vinganca, filho_da_viuva, o_grande_inimigo, penitente, memoria_tecnica_antiga, inimigo_vida_passada, erro_da_vida_passada, mestre_vida_passada_renasce, nome_antigo, cena_sombra_sangue, sangue_irmaos, sangue_duelo_do_fraco, sangue_chama_negra, sangue_trabalho_da_seita, lapide_do_antecessor, tecnica_do_antecessor, discipulos_do_antecessor, lenda_de_eco, inimigo_do_antecessor, espelho_de_eco, tp_sangue_gota, tp_sangue_rio, tp_sangue_trono, og_alq_caderno, og_alq_jardim, og_alq_cliente, og_alq_fogo, og_alq_divida, og_reenc_sonhos, og_reenc_objeto, og_reenc_velho, og_reenc_medo, og_reenc_lingua, og_demonio_ritual, og_demonio_irmao, og_demonio_fuga, og_demonio_mae, og_demonio_missao, og_mendigo_fome, og_mendigo_monge, og_mendigo_ponte, og_mendigo_pao, og_mendigo_tesouro, og_principe_palacio, og_principe_servo, og_principe_etiqueta, og_principe_pretendente, og_eremita_licao, og_eremita_descer, og_eremita_visitante, og_eremita_lenha, og_eremita_doente, og_regressor_desastre, og_regressor_precos, og_regressor_morte, og_regressor_rival, og_regressor_mestre.
Eventos raros/lendários menos frequentes: karma_cobrado (1), tp_espada_montanha (2), mestre_ensina_tecnica (3), mestre_em_perigo (3), espada_viva (3), tp_corpo_diamante (3), tp_venenos_rei (3), r8_cortar_destino (4).
Eventos mais repetidos (por vida): __retiro (12.6), meditacao_profunda (0.9), npc_amor_1 (0.8), npc_amor_2 (0.7), npc_amor_3 (0.7), marco_t2 (0.7), entrar_na_seita (0.7), npc_amor_4 (0.7).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

6000 vidas.

**Taxa de ascensão:** 118 (2.0%)  
**Idade de morte:** mín 16 · p10 59 · mediana 340 · p90 1720 · p99 2749 · máx 3216

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 318 | 5.3% |
| Morte em Combate | 790 | 13.2% |
| Cinzas da Tribulação | 863 | 14.4% |
| Ascensão | 118 | 2.0% |
| Caminho Demoníaco | 76 | 1.3% |
| Vida Comum | 152 | 2.5% |
| Desvio de Qi | 412 | 6.9% |
| Fundador de Seita | 26 | 0.4% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 8 | 0.1% |
| Sacrifício Final | 11 | 0.2% |
| O Eremita das Nuvens | 28 | 0.5% |
| Perdido no Vazio | 5 | 0.1% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 2 | 0.0% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 2 | 0.0% |
| A Sombra do Trono | 4 | 0.1% |
| Senhor do Sangue | 3 | 0.1% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 21 | 0.3% |
| Oficial da Corte Celeste | 19 | 0.3% |
| Mestre Respeitado | 2182 | 36.4% |
| O Velho Esquecido | 1 | 0.0% |
| A Casa Cheia | 48 | 0.8% |
| O Sábio da Montanha | 495 | 8.3% |
| O Rancor Que Sobrou | 2 | 0.0% |
| A Fortuna Que Ficou | 1 | 0.0% |
| O Veterano das Cicatrizes | 30 | 0.5% |
| Caído na Guerra | 115 | 1.9% |
| A Febre da Praga | 53 | 0.9% |
| Engolido pela Maré de Bestas | 55 | 0.9% |
| Exilado Para Sempre | 41 | 0.7% |
| Caçado pelo Culto | 83 | 1.4% |
| Punhal nas Costas | 0 | 0.0% |
| Morto em Duelo de Honra | 0 | 0.0% |
| A Roda do Samsara | 36 | 0.6% |

**Reino máximo — xianxia** (3418 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 85 | 2.5% |
| Fundação | 205 | 6.0% |
| Núcleo Dourado | 498 | 14.6% |
| Alma Nascente | 468 | 13.7% |
| Transformação Divina | 681 | 19.9% |
| Refino do Vazio | 667 | 19.5% |
| Integração Corporal | 410 | 12.0% |
| Grande Ascensão | 404 | 11.8% |

**Reino máximo — murim** (2430 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 28 | 1.2% |
| Segunda Classe | 70 | 2.9% |
| Primeira Classe | 165 | 6.8% |
| Mestre de Pico | 994 | 40.9% |
| Transcendente | 665 | 27.4% |
| Além dos Limites | 289 | 11.9% |
| Lenda Marcial | 219 | 9.0% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 152 | 0.00 | 30 | 0 |
| Caminho do Sopro | 660 | 5.39 | 1017 | 21 |
| Caminho da Espada | 596 | 4.64 | 308 | 10 |
| Caminho da Alquimia | 570 | 4.84 | 749 | 10 |
| Caminho do Corpo | 616 | 4.66 | 321 | 10 |
| Caminho da Consciência | 580 | 5.16 | 927 | 13 |
| Caminho das Formações | 624 | 5.00 | 791 | 8 |
| Caminho do Mérito | 607 | 4.82 | 342 | 12 |
| Caminho dos Venenos | 611 | 4.37 | 258 | 2 |
| Caminho das Bestas | 872 | 5.00 | 811 | 21 |
| Caminho do Sangue | 112 | 5.23 | 915 | 11 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 1 | Centenário |
| 7 | Mão Verde |
| 10 | Dívida Quitada |
| 14 | Mão de Alquimista |
| 16 | Sombra Escolhida |
| 44 | Pedra Fundamental |
| 47 | Carimbo do Céu |
| 49 | Degraus de Nuvem |
| 66 | Irmãos de Alma |
| 81 | Discípulo de Sábios |
| 135 | Silêncio Alto |
| 149 | Entre Passos |
| 171 | Simplicidade |
| 208 | Luz Que Fica |
| 469 | A Roda Gira |
| 705 | A Pergunta do Portão |
| 777 | Despertar Sem Degraus |
| 1079 | Fio Vermelho |
| 1110 | Cofre Cheio |
| 1553 | Voz Atrás do Trono |
| 1761 | Retrato no Salão |
| 2147 | Coroa de Ossos |

Conquistas não obtidas: Manto de Séculos, Alquimista Absoluto, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 5/5 · Mente Clara 5/5 · Fio do Destino 5/5 · Ritmo do Dao 6/6 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 4/4. Pontos sobrando: 276328.

Ascensões por quartil de vidas (1º → 4º): 31 → 35 → 26 → 26

Uso de trilhas: Caminho do Sopro 660 · Caminho da Espada 596 · Caminho da Alquimia 570 · Caminho do Corpo 616 · Caminho da Consciência 580 · Caminho das Formações 624 · Caminho do Mérito 607 · Caminho dos Venenos 611 · Caminho das Bestas 872 · Caminho do Sangue 112

Origens usadas: 14/14 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (388), despertar_reencarnado (410), despertar_demoniaco (416), regressao_visao (114), memoria_tecnica_antiga (374), inimigo_vida_passada (118), erro_da_vida_passada (106), mestre_vida_passada_renasce (105), nome_antigo (350), sussurro_do_futuro (155), segunda_chance (169), cena_sombra_sangue (204), lapide_do_antecessor (1539), tecnica_do_antecessor (1499), discipulos_do_antecessor (1423), lenda_de_eco (4197), inimigo_do_antecessor (1291), espelho_de_eco (799).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Ciclo de Cem Respirações (n=319, reino relativo +24.6 pp, ascensão 6.0%); Sutra do Céu Vazio (n=231, reino relativo +16.9 pp, ascensão 4.3%); Olhar de Bai Ze (n=116, reino relativo +16.6 pp, ascensão 6.9%); Grande Sutra do Ciclo (n=123, reino relativo +16.5 pp, ascensão 5.7%); Labirinto das Mil Voltas (n=71, reino relativo +15.1 pp, ascensão 5.6%).
Menores: Chuva de Mil Agulhas (n=611, reino relativo -0.5 pp, ascensão 0.3%); Pacto da Fera Irmã (n=872, reino relativo -0.5 pp, ascensão 2.4%); Caldeirão de Fogo Calmo (n=570, reino relativo -2.4 pp, ascensão 1.8%).

**Eventos vistos:** 712/714. Nunca vistos: karma_cobrado, o_grande_inimigo.
Eventos raros/lendários menos frequentes: penitente (1), tp_sangue_trono (4), filho_da_viuva (6), viuva_vinganca (7), tp_venenos_rei (7), espada_viva (9), cacador_implacavel (9), rival_ascendido (9).
Eventos mais repetidos (por vida): __retiro (14.3), mundo_guerra_inicio (0.8), mundo_mare_inicio (0.7), npc_disc_1 (0.7), npc_amor_1 (0.7), npc_disc_2 (0.7), npc_amor_2 (0.7), entrar_na_seita (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A trilha de cultivo nasce de eventos (cenas de primeiro método depois do despertar); a tabela por trilha reflete essas escolhas.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial (até nv 5), +2% de cultivo (até nv 6), +10 pedras, +1 re-sorteio, +0,8% de chance em testes (até nv 4). Os pontos ainda sobram no fim (o ganho médio por vida é maior que o total comprável); novos sumidouros podem entrar em ciclos futuros.
