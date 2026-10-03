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

**Taxa de ascensão:** 22 (0.6%)  
**Idade de morte:** mín 17 · p10 102 · mediana 298 · p90 1708 · p99 2732 · máx 2884

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2833 | 70.8% |
| Morte em Combate | 133 | 3.3% |
| Cinzas da Tribulação | 609 | 15.2% |
| Ascensão | 22 | 0.6% |
| Caminho Demoníaco | 17 | 0.4% |
| Vida Comum | 126 | 3.1% |
| Desvio de Qi | 193 | 4.8% |
| Fundador de Seita | 3 | 0.1% |
| A Dívida Cobrada | 2 | 0.1% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 8 | 0.2% |
| O Eremita das Nuvens | 23 | 0.6% |
| Perdido no Vazio | 2 | 0.1% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 7 | 0.2% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 1 | 0.0% |
| A Iluminação | 5 | 0.1% |
| Oficial da Corte Celeste | 5 | 0.1% |
| A Roda do Samsara | 11 | 0.3% |

**Reino máximo — xianxia** (2249 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 42 | 1.9% |
| Fundação | 44 | 2.0% |
| Núcleo Dourado | 335 | 14.9% |
| Alma Nascente | 359 | 16.0% |
| Transformação Divina | 333 | 14.8% |
| Refino do Vazio | 659 | 29.3% |
| Integração Corporal | 311 | 13.8% |
| Grande Ascensão | 166 | 7.4% |

**Reino máximo — murim** (1627 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 20 | 1.2% |
| Segunda Classe | 34 | 2.1% |
| Primeira Classe | 224 | 13.8% |
| Mestre de Pico | 757 | 46.5% |
| Transcendente | 375 | 23.0% |
| Além dos Limites | 172 | 10.6% |
| Lenda Marcial | 45 | 2.8% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 124 | 0.00 | 30 | 0 |
| Caminho do Sopro | 485 | 5.18 | 902 | 8 |
| Caminho da Espada | 386 | 4.28 | 232 | 1 |
| Caminho da Alquimia | 391 | 5.01 | 822 | 2 |
| Caminho do Corpo | 387 | 4.35 | 237 | 1 |
| Caminho da Consciência | 410 | 5.44 | 1018 | 2 |
| Caminho das Formações | 389 | 5.11 | 863 | 2 |
| Caminho do Mérito | 424 | 4.40 | 246 | 0 |
| Caminho dos Venenos | 430 | 4.21 | 219 | 2 |
| Caminho das Bestas | 574 | 5.24 | 913 | 4 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0), memoria_tecnica_antiga (0), inimigo_vida_passada (0), erro_da_vida_passada (0), mestre_vida_passada_renasce (0), nome_antigo (0), sussurro_do_futuro (37), segunda_chance (46), cena_sombra_sangue (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Sutra do Céu Vazio (n=83, reino relativo +17.5 pp, ascensão 1.2%); Passo Sem Fio (n=96, reino relativo +16.3 pp, ascensão 1.0%); Sutra do Espelho Quieto (n=305, reino relativo +15.4 pp, ascensão 2.0%); Koan do Riso Antes do Nascimento (n=184, reino relativo +13.6 pp, ascensão 1.1%); Anel de Jade Frio (n=230, reino relativo +13.4 pp, ascensão 0.9%).
Menores: Espada do Orvalho (n=386, reino relativo -0.5 pp, ascensão 0.3%); Chuva de Mil Agulhas (n=430, reino relativo -1.5 pp, ascensão 0.5%); Anel Negro e Opaco (n=199, reino relativo -1.8 pp, ascensão 0.0%).

**Eventos vistos:** 326/340. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao, besta_em_perigo, banquete_de_sangue, mestre_em_perigo, espada_viva, memoria_tecnica_antiga, inimigo_vida_passada, erro_da_vida_passada, mestre_vida_passada_renasce, nome_antigo, cena_sombra_sangue.
Eventos raros/lendários menos frequentes: senhor_do_sangue (1), rival_ascendido (1), mestre_ensina_tecnica (2), dilema_lealdade (2), cla_prospera (2), conspiracao_anciao (5), sucessao_seita (5), aprendiz_retorna (5).
Eventos mais repetidos (por vida): meditacao_profunda (2.2), retiro_fechado (1.2), gargalo_longo (1.1), partir_viagem (0.9), mantra_cem_mil (0.9), secar_ervas (0.9), fantasma_faminto (0.9), jardim_lotos (0.9).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 74 (1.9%)  
**Idade de morte:** mín 17 · p10 110 · mediana 433 · p90 1760 · p99 2745 · máx 3138

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2807 | 70.2% |
| Morte em Combate | 111 | 2.8% |
| Cinzas da Tribulação | 699 | 17.5% |
| Ascensão | 74 | 1.9% |
| Caminho Demoníaco | 9 | 0.2% |
| Vida Comum | 30 | 0.8% |
| Desvio de Qi | 224 | 5.6% |
| Fundador de Seita | 0 | 0.0% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 11 | 0.3% |
| O Eremita das Nuvens | 13 | 0.3% |
| Perdido no Vazio | 3 | 0.1% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 5 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 5 | 0.1% |
| Oficial da Corte Celeste | 2 | 0.1% |
| A Roda do Samsara | 7 | 0.2% |

**Reino máximo — xianxia** (2304 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Refinamento de Qi | 35 | 1.5% |
| Fundação | 40 | 1.7% |
| Núcleo Dourado | 258 | 11.2% |
| Alma Nascente | 270 | 11.7% |
| Transformação Divina | 289 | 12.5% |
| Refino do Vazio | 661 | 28.7% |
| Integração Corporal | 464 | 20.1% |
| Grande Ascensão | 287 | 12.5% |

**Reino máximo — murim** (1661 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Terceira Classe | 10 | 0.6% |
| Segunda Classe | 25 | 1.5% |
| Primeira Classe | 84 | 5.1% |
| Mestre de Pico | 650 | 39.1% |
| Transcendente | 489 | 29.4% |
| Além dos Limites | 253 | 15.2% |
| Lenda Marcial | 150 | 9.0% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Sem trilha (não despertou) | 35 | 0.23 | 29 | 4 |
| Caminho do Sopro | 424 | 5.62 | 1070 | 12 |
| Caminho da Espada | 407 | 4.74 | 293 | 6 |
| Caminho da Alquimia | 406 | 5.53 | 1035 | 5 |
| Caminho do Corpo | 444 | 4.66 | 284 | 3 |
| Caminho da Consciência | 409 | 5.81 | 1173 | 10 |
| Caminho das Formações | 423 | 5.57 | 1056 | 6 |
| Caminho do Mérito | 370 | 4.97 | 332 | 11 |
| Caminho dos Venenos | 440 | 4.74 | 291 | 10 |
| Caminho das Bestas | 573 | 5.61 | 1089 | 7 |
| Caminho do Sangue | 69 | 5.00 | 796 | 0 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 1 | Centenário |
| 3 | Discípulo de Sábios |
| 5 | Dívida Quitada |
| 10 | Degraus de Nuvem |
| 12 | Mão Verde |
| 15 | Mão de Alquimista |
| 18 | A Pergunta do Portão |
| 25 | Simplicidade |
| 26 | Sombra Escolhida |
| 237 | Entre Passos |
| 309 | A Roda Gira |
| 346 | Irmãos de Alma |
| 535 | Silêncio Alto |
| 1151 | Despertar Sem Degraus |
| 1247 | Luz Que Fica |
| 1921 | Carimbo do Céu |
| 3505 | Cofre Cheio |

Conquistas não obtidas: Pedra Fundamental, Fio Vermelho, Manto de Séculos, Alquimista Absoluto, Retrato no Salão, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 5/5. Pontos sobrando: 158899.

Ascensões por quartil de vidas (1º → 4º): 23 → 20 → 15 → 16

Uso de trilhas: Caminho do Sopro 424 · Caminho da Espada 407 · Caminho da Alquimia 406 · Caminho do Corpo 444 · Caminho da Consciência 409 · Caminho das Formações 423 · Caminho do Mérito 370 · Caminho dos Venenos 440 · Caminho das Bestas 573 · Caminho do Sangue 69

Origens usadas: 13/14 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (306), despertar_reencarnado (288), despertar_demoniaco (299), regressao_visao (64), memoria_tecnica_antiga (250), inimigo_vida_passada (61), erro_da_vida_passada (72), mestre_vida_passada_renasce (71), nome_antigo (247), sussurro_do_futuro (96), segunda_chance (104), cena_sombra_sangue (139).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Sutra do Céu Vazio (n=98, reino relativo +15.8 pp, ascensão 8.2%); Olhar de Bai Ze (n=68, reino relativo +15.5 pp, ascensão 8.8%); Anel de Jade Frio (n=194, reino relativo +13.5 pp, ascensão 4.1%); Koan do Riso Antes do Nascimento (n=163, reino relativo +11.6 pp, ascensão 2.5%); Escama de Qilin (n=61, reino relativo +11.3 pp, ascensão 4.9%).
Menores: Espada do Orvalho (n=407, reino relativo -1.2 pp, ascensão 1.5%); Anel Negro e Opaco (n=214, reino relativo -1.7 pp, ascensão 1.9%); Ossos de Ferro Frio (n=444, reino relativo -2.3 pp, ascensão 0.7%).

**Eventos vistos:** 340/340. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: senhor_do_sangue (3), luto_e_caminho (4), conselheiro_imperial (4), pacto_sangue_antigo (5), mestre_em_perigo (5), ancestral_ensina (6), cla_prospera (6), besta_em_perigo (7).
Eventos mais repetidos (por vida): meditacao_profunda (1.8), gargalo_longo (1.0), retiro_fechado (0.9), partir_viagem (0.7), jardim_lotos (0.7), entrar_na_seita (0.7), mantra_cem_mil (0.7), fantasma_faminto (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
