# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 340 eventos, 85 itens, 49 técnicas, 23 finais, 10 trilhas.

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

**Taxa de ascensão:** 29 (0.7%)  
**Idade de morte:** mín 17 · p10 103 · mediana 299 · p90 1711 · p99 2699 · máx 2883

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2791 | 69.8% |
| Morte em Combate | 142 | 3.5% |
| Cinzas da Tribulação | 607 | 15.2% |
| Ascensão | 29 | 0.7% |
| Caminho Demoníaco | 30 | 0.8% |
| Vida Comum | 130 | 3.3% |
| Desvio de Qi | 216 | 5.4% |
| Fundador de Seita | 0 | 0.0% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 7 | 0.2% |
| O Eremita das Nuvens | 9 | 0.2% |
| Perdido no Vazio | 1 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 6 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 5 | 0.1% |
| Oficial da Corte Celeste | 6 | 0.1% |
| A Roda do Samsara | 21 | 0.5% |

**Reino máximo — xianxia** (2373 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 124 | 5.2% |
| Refinamento de Qi | 49 | 2.1% |
| Fundação | 48 | 2.0% |
| Núcleo Dourado | 322 | 13.6% |
| Alma Nascente | 340 | 14.3% |
| Transformação Divina | 346 | 14.6% |
| Refino do Vazio | 629 | 26.5% |
| Integração Corporal | 369 | 15.5% |
| Grande Ascensão | 146 | 6.2% |

**Reino máximo — murim** (1627 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 20 | 1.2% |
| Segunda Classe | 30 | 1.8% |
| Primeira Classe | 227 | 14.0% |
| Mestre de Pico | 740 | 45.5% |
| Transcendente | 397 | 24.4% |
| Além dos Limites | 162 | 10.0% |
| Lenda Marcial | 51 | 3.1% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 125 | 0.01 | 30 | 0 |
| Caminho do Sopro | 485 | 5.23 | 902 | 4 |
| Caminho da Espada | 387 | 4.30 | 236 | 0 |
| Caminho da Alquimia | 391 | 5.14 | 879 | 4 |
| Caminho do Corpo | 386 | 4.30 | 230 | 4 |
| Caminho da Consciência | 411 | 5.37 | 989 | 5 |
| Caminho das Formações | 389 | 5.09 | 837 | 2 |
| Caminho do Mérito | 425 | 4.41 | 245 | 3 |
| Caminho dos Venenos | 429 | 4.28 | 229 | 1 |
| Caminho das Bestas | 572 | 5.23 | 932 | 6 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0), memoria_tecnica_antiga (0), inimigo_vida_passada (0), erro_da_vida_passada (0), mestre_vida_passada_renasce (0), nome_antigo (0), sussurro_do_futuro (49), segunda_chance (46), cena_sombra_sangue (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Sutra do Céu Vazio (n=88, reino relativo +20.1 pp, ascensão 1.1%); Passo Sem Fio (n=103, reino relativo +16.9 pp, ascensão 2.9%); Anel de Jade Frio (n=229, reino relativo +15.5 pp, ascensão 3.1%); Sutra do Espelho Quieto (n=275, reino relativo +14.7 pp, ascensão 1.5%); Koan do Riso Antes do Nascimento (n=175, reino relativo +14.3 pp, ascensão 1.1%).
Menores: Espada do Orvalho (n=387, reino relativo -0.3 pp, ascensão 0.0%); Ossos de Ferro Frio (n=386, reino relativo -0.4 pp, ascensão 1.0%); Chuva de Mil Agulhas (n=429, reino relativo -0.6 pp, ascensão 0.2%).

**Eventos vistos:** 328/340. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao, banquete_de_sangue, mestre_em_perigo, memoria_tecnica_antiga, inimigo_vida_passada, erro_da_vida_passada, mestre_vida_passada_renasce, nome_antigo, cena_sombra_sangue.
Eventos raros/lendários menos frequentes: cla_prospera (1), besta_em_perigo (3), mestre_ensina_tecnica (3), conspiracao_anciao (3), aprendiz_retorna (3), espada_viva (3), senhor_do_sangue (3), rival_ascendido (3).
Eventos mais repetidos (por vida): meditacao_profunda (2.2), retiro_fechado (1.2), gargalo_longo (1.1), partir_viagem (0.9), mantra_cem_mil (0.9), jardim_lotos (0.9), secar_ervas (0.9), fantasma_faminto (0.9).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 55 (1.4%)  
**Idade de morte:** mín 16 · p10 111 · mediana 453 · p90 1766 · p99 2742 · máx 3082

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2863 | 71.6% |
| Morte em Combate | 88 | 2.2% |
| Cinzas da Tribulação | 672 | 16.8% |
| Ascensão | 55 | 1.4% |
| Caminho Demoníaco | 24 | 0.6% |
| Vida Comum | 29 | 0.7% |
| Desvio de Qi | 220 | 5.5% |
| Fundador de Seita | 6 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 11 | 0.3% |
| O Eremita das Nuvens | 11 | 0.3% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 5 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 4 | 0.1% |
| Oficial da Corte Celeste | 3 | 0.1% |
| A Roda do Samsara | 8 | 0.2% |

**Reino máximo — xianxia** (2337 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 28 | 1.2% |
| Refinamento de Qi | 45 | 1.9% |
| Fundação | 42 | 1.8% |
| Núcleo Dourado | 250 | 10.7% |
| Alma Nascente | 230 | 9.8% |
| Transformação Divina | 263 | 11.3% |
| Refino do Vazio | 708 | 30.3% |
| Integração Corporal | 463 | 19.8% |
| Grande Ascensão | 308 | 13.2% |

**Reino máximo — murim** (1663 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 11 | 0.7% |
| Segunda Classe | 18 | 1.1% |
| Primeira Classe | 78 | 4.7% |
| Mestre de Pico | 651 | 39.1% |
| Transcendente | 497 | 29.9% |
| Além dos Limites | 267 | 16.1% |
| Lenda Marcial | 141 | 8.5% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 29 | 0.03 | 30 | 0 |
| Caminho do Sopro | 406 | 5.68 | 1075 | 11 |
| Caminho da Espada | 420 | 4.79 | 299 | 6 |
| Caminho da Alquimia | 410 | 5.62 | 1070 | 8 |
| Caminho do Corpo | 440 | 4.74 | 301 | 2 |
| Caminho da Consciência | 411 | 5.80 | 1196 | 4 |
| Caminho das Formações | 451 | 5.60 | 1062 | 7 |
| Caminho do Mérito | 383 | 5.01 | 336 | 5 |
| Caminho dos Venenos | 420 | 4.63 | 271 | 3 |
| Caminho das Bestas | 564 | 5.64 | 1123 | 8 |
| Caminho do Sangue | 66 | 5.52 | 1021 | 1 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 1 | Centenário |
| 3 | Mão Verde |
| 7 | Sombra Escolhida |
| 9 | Dívida Quitada |
| 9 | Discípulo de Sábios |
| 17 | Simplicidade |
| 21 | Mão de Alquimista |
| 35 | Degraus de Nuvem |
| 80 | Silêncio Alto |
| 83 | Irmãos de Alma |
| 96 | A Pergunta do Portão |
| 199 | A Roda Gira |
| 225 | Luz Que Fica |
| 241 | Cofre Cheio |
| 364 | Pedra Fundamental |
| 640 | Despertar Sem Degraus |
| 918 | Carimbo do Céu |
| 2831 | Fio Vermelho |

Conquistas não obtidas: Entre Passos, Manto de Séculos, Alquimista Absoluto, Retrato no Salão, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 5/5. Pontos sobrando: 159227.

Ascensões por quartil de vidas (1º → 4º): 14 → 14 → 11 → 16

Uso de trilhas: Caminho do Sopro 406 · Caminho da Espada 420 · Caminho da Alquimia 410 · Caminho do Corpo 440 · Caminho da Consciência 411 · Caminho das Formações 451 · Caminho do Mérito 383 · Caminho dos Venenos 420 · Caminho das Bestas 564 · Caminho do Sangue 66

Origens usadas: 14/14 · Talentos usados: 13/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (266), despertar_reencarnado (284), despertar_demoniaco (268), regressao_visao (64), memoria_tecnica_antiga (242), inimigo_vida_passada (65), erro_da_vida_passada (58), mestre_vida_passada_renasce (74), nome_antigo (240), sussurro_do_futuro (95), segunda_chance (84), cena_sombra_sangue (132).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Olhar de Bai Ze (n=61, reino relativo +16.8 pp, ascensão 8.2%); Sutra do Céu Vazio (n=105, reino relativo +15.3 pp, ascensão 1.9%); Grande Sutra do Ciclo (n=63, reino relativo +14.1 pp, ascensão 3.2%); Koan do Riso Antes do Nascimento (n=167, reino relativo +12.0 pp, ascensão 2.4%); Anel de Jade Frio (n=261, reino relativo +11.3 pp, ascensão 2.3%).
Menores: Espada do Orvalho (n=420, reino relativo -0.8 pp, ascensão 1.4%); Ossos de Ferro Frio (n=440, reino relativo -1.5 pp, ascensão 0.5%); Chuva de Mil Agulhas (n=420, reino relativo -3.2 pp, ascensão 0.7%).

**Eventos vistos:** 339/340. Nunca vistos: senhor_do_sangue.
Eventos raros/lendários menos frequentes: conselheiro_imperial (1), dilema_lealdade (4), cla_prospera (4), rival_ascendido (5), ancestral_ensina (6), mestre_em_perigo (7), aprendiz_retorna (7), espada_viva (9).
Eventos mais repetidos (por vida): meditacao_profunda (1.8), gargalo_longo (0.9), retiro_fechado (0.9), partir_viagem (0.7), entrar_na_seita (0.7), jardim_lotos (0.7), rotina_mortal (0.7), mantra_cem_mil (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
