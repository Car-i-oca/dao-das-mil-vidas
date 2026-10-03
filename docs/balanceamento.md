# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 333 eventos, 85 itens, 49 técnicas, 23 finais, 10 trilhas.

## Como o bot joga
- 70% das vezes escolhe a opção de maior chance de sucesso; nos demais casos escolhe ao acaso entre as opções seguras.
- Evita escolhas que encerram a vida (risco de final > 12%), exceto quando a idade passa de 90% da vida máxima ou resta menos de 15 anos.
- No modo meta, busca o caminho demoníaco (aceita ofertas, sacrifícios e pactos) em metade das vidas até liberar a conquista, escolhe trilhas liberadas ao acaso e gasta a Herança do Dao em ritmo → mente → corpo → destino → bolso.

## Metas de balanceamento
- Ascender é raro (~1% no bot), mas possível; um jogador atento deve superar o bot.
- A maioria das vidas termina entre o 3º e o 5º reino.
- Nenhum final voluntário (eremita, sacrifício, reencarnação) passa de ~5% das vidas.

### Vidas independentes (meta vazia, todas as trilhas)

4000 vidas.

**Taxa de ascensão:** 33 (0.8%)  
**Idade de morte:** mín 17 · p10 100 · mediana 311 · p90 1713 · p99 2710 · máx 2878

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2791 | 69.8% |
| Morte em Combate | 145 | 3.6% |
| Cinzas da Tribulação | 643 | 16.1% |
| Ascensão | 33 | 0.8% |
| Caminho Demoníaco | 24 | 0.6% |
| Vida Comum | 91 | 2.3% |
| Desvio de Qi | 219 | 5.5% |
| Fundador de Seita | 4 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 8 | 0.2% |
| O Eremita das Nuvens | 11 | 0.3% |
| Perdido no Vazio | 1 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 5 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 1 | 0.0% |
| Senhor do Sangue | 1 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 7 | 0.2% |
| Oficial da Corte Celeste | 4 | 0.1% |
| A Roda do Samsara | 12 | 0.3% |

**Reino máximo — xianxia** (2400 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 56 | 2.3% |
| Refinamento de Qi | 49 | 2.0% |
| Fundação | 40 | 1.7% |
| Núcleo Dourado | 339 | 14.1% |
| Alma Nascente | 386 | 16.1% |
| Transformação Divina | 353 | 14.7% |
| Refino do Vazio | 658 | 27.4% |
| Integração Corporal | 345 | 14.4% |
| Grande Ascensão | 174 | 7.3% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 30 | 1.9% |
| Terceira Classe | 25 | 1.6% |
| Segunda Classe | 39 | 2.4% |
| Primeira Classe | 215 | 13.4% |
| Mestre de Pico | 719 | 44.9% |
| Transcendente | 364 | 22.8% |
| Além dos Limites | 148 | 9.3% |
| Lenda Marcial | 60 | 3.8% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 400 | 5.13 | 904 | 3 |
| Caminho da Espada | 400 | 4.28 | 236 | 3 |
| Caminho da Alquimia | 400 | 5.08 | 874 | 6 |
| Caminho do Corpo | 400 | 4.05 | 219 | 3 |
| Caminho da Consciência | 400 | 5.21 | 916 | 3 |
| Caminho das Formações | 400 | 5.19 | 903 | 3 |
| Caminho do Mérito | 400 | 4.39 | 252 | 1 |
| Caminho dos Venenos | 400 | 4.16 | 220 | 0 |
| Caminho das Bestas | 400 | 4.96 | 860 | 8 |
| Caminho do Sangue | 400 | 4.96 | 848 | 3 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0), memoria_tecnica_antiga (0), inimigo_vida_passada (0), erro_da_vida_passada (0), mestre_vida_passada_renasce (0), nome_antigo (0), sussurro_do_futuro (44), segunda_chance (51).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Sutra do Céu Vazio (n=91, reino relativo +20.1 pp, ascensão 5.5%); Anel de Jade Frio (n=215, reino relativo +16.3 pp, ascensão 2.8%); Passo Sem Fio (n=108, reino relativo +15.8 pp, ascensão 2.8%); Sutra do Espelho Quieto (n=310, reino relativo +14.8 pp, ascensão 1.6%); Koan do Riso Antes do Nascimento (n=165, reino relativo +13.8 pp, ascensão 1.2%).
Menores: Espada do Orvalho (n=400, reino relativo -1.2 pp, ascensão 0.8%); Chuva de Mil Agulhas (n=400, reino relativo -2.8 pp, ascensão 0.0%); Ossos de Ferro Frio (n=400, reino relativo -4.3 pp, ascensão 0.8%).

**Eventos vistos:** 324/333. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao, memoria_tecnica_antiga, inimigo_vida_passada, erro_da_vida_passada, mestre_vida_passada_renasce, nome_antigo.
Eventos raros/lendários menos frequentes: mestre_em_perigo (1), ancestral_ensina (2), cla_prospera (3), mestre_ensina_tecnica (4), mestre_pede_favor (4), conspiracao_anciao (4), espada_viva (4), sucessao_seita (5).
Eventos mais repetidos (por vida): meditacao_profunda (2.2), retiro_fechado (1.2), gargalo_longo (1.1), partir_viagem (0.9), jardim_lotos (0.9), fantasma_faminto (0.9), secar_ervas (0.9), mantra_cem_mil (0.9).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 71 (1.8%)  
**Idade de morte:** mín 15 · p10 109 · mediana 460 · p90 1780 · p99 2774 · máx 3086

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2778 | 69.5% |
| Morte em Combate | 106 | 2.6% |
| Cinzas da Tribulação | 714 | 17.9% |
| Ascensão | 71 | 1.8% |
| Caminho Demoníaco | 15 | 0.4% |
| Vida Comum | 21 | 0.5% |
| Desvio de Qi | 240 | 6.0% |
| Fundador de Seita | 5 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 5 | 0.1% |
| O Eremita das Nuvens | 16 | 0.4% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 4 | 0.1% |
| Guardião do Reino Secreto | 4 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 5 | 0.1% |
| Oficial da Corte Celeste | 4 | 0.1% |
| A Roda do Samsara | 12 | 0.3% |

**Reino máximo — xianxia** (2372 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 15 | 0.6% |
| Refinamento de Qi | 44 | 1.9% |
| Fundação | 29 | 1.2% |
| Núcleo Dourado | 275 | 11.6% |
| Alma Nascente | 250 | 10.5% |
| Transformação Divina | 287 | 12.1% |
| Refino do Vazio | 671 | 28.3% |
| Integração Corporal | 467 | 19.7% |
| Grande Ascensão | 334 | 14.1% |

**Reino máximo — murim** (1628 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 6 | 0.4% |
| Terceira Classe | 12 | 0.7% |
| Segunda Classe | 22 | 1.4% |
| Primeira Classe | 76 | 4.7% |
| Mestre de Pico | 600 | 36.9% |
| Transcendente | 502 | 30.8% |
| Além dos Limites | 270 | 16.6% |
| Lenda Marcial | 140 | 8.6% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 387 | 5.57 | 1108 | 10 |
| Caminho da Espada | 388 | 4.92 | 320 | 14 |
| Caminho da Alquimia | 410 | 5.70 | 1115 | 5 |
| Caminho do Corpo | 430 | 4.69 | 278 | 9 |
| Caminho da Consciência | 435 | 5.83 | 1208 | 6 |
| Caminho das Formações | 376 | 5.42 | 1015 | 5 |
| Caminho do Mérito | 409 | 5.00 | 337 | 8 |
| Caminho dos Venenos | 401 | 4.55 | 266 | 2 |
| Caminho das Bestas | 398 | 5.78 | 1166 | 7 |
| Caminho do Sangue | 366 | 5.36 | 962 | 5 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 1 | Centenário |
| 4 | Degraus de Nuvem |
| 9 | Mão de Alquimista |
| 12 | Discípulo de Sábios |
| 13 | Dívida Quitada |
| 17 | Sombra Escolhida |
| 25 | Mão Verde |
| 42 | Simplicidade |
| 47 | Pedra Fundamental |
| 85 | A Roda Gira |
| 141 | Silêncio Alto |
| 178 | Cofre Cheio |
| 310 | A Pergunta do Portão |
| 372 | Irmãos de Alma |
| 509 | Luz Que Fica |
| 918 | Despertar Sem Degraus |
| 1044 | Carimbo do Céu |
| 1939 | Manto de Séculos |

Conquistas não obtidas: Fio Vermelho, Entre Passos, Alquimista Absoluto, Retrato no Salão, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 5/5. Pontos sobrando: 161574.

Ascensões por quartil de vidas (1º → 4º): 24 → 9 → 18 → 20

Uso de trilhas: Caminho do Sopro 387 · Caminho da Espada 388 · Caminho da Alquimia 410 · Caminho do Corpo 430 · Caminho da Consciência 435 · Caminho das Formações 376 · Caminho do Mérito 409 · Caminho dos Venenos 401 · Caminho das Bestas 398 · Caminho do Sangue 366

Origens usadas: 14/14 · Talentos usados: 13/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (259), despertar_reencarnado (291), despertar_demoniaco (270), regressao_visao (76), memoria_tecnica_antiga (258), inimigo_vida_passada (72), erro_da_vida_passada (67), mestre_vida_passada_renasce (67), nome_antigo (246), sussurro_do_futuro (83), segunda_chance (108).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Escama de Qilin (n=65, reino relativo +17.0 pp, ascensão 3.1%); Grande Sutra do Ciclo (n=66, reino relativo +16.4 pp, ascensão 4.5%); Sutra do Céu Vazio (n=113, reino relativo +13.4 pp, ascensão 2.7%); Koan do Riso Antes do Nascimento (n=165, reino relativo +12.4 pp, ascensão 1.2%); Anel de Jade Frio (n=227, reino relativo +11.1 pp, ascensão 2.2%).
Menores: Traços do Primeiro Selo (n=376, reino relativo -1.8 pp, ascensão 1.3%); Ossos de Ferro Frio (n=430, reino relativo -2.5 pp, ascensão 2.1%); Chuva de Mil Agulhas (n=401, reino relativo -4.5 pp, ascensão 0.5%).

**Eventos vistos:** 333/333. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: aprendiz_retorna (3), senhor_do_sangue (3), mestre_em_perigo (4), dilema_lealdade (4), cla_prospera (4), aprendiz_alquimista (5), besta_em_perigo (6), armadura_escamas (6).
Eventos mais repetidos (por vida): meditacao_profunda (1.9), gargalo_longo (0.9), retiro_fechado (0.9), partir_viagem (0.8), jardim_lotos (0.7), mantra_cem_mil (0.7), oferenda_templo (0.7), fantasma_faminto (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
