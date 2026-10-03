# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 241 eventos, 72 itens, 39 técnicas, 17 finais, 10 trilhas.

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

**Taxa de ascensão:** 32 (0.8%)  
**Idade de morte:** mín 18 · p10 98 · mediana 298 · p90 1707 · p99 2707 · máx 2895

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2647 | 66.2% |
| Morte em Combate | 186 | 4.7% |
| Cinzas da Tribulação | 768 | 19.2% |
| Ascensão | 32 | 0.8% |
| Caminho Demoníaco | 27 | 0.7% |
| Vida Comum | 90 | 2.3% |
| Desvio de Qi | 204 | 5.1% |
| Fundador de Seita | 4 | 0.1% |
| A Dívida Cobrada | 1 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 8 | 0.2% |
| O Eremita das Nuvens | 20 | 0.5% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 3 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| A Roda do Samsara | 10 | 0.3% |

**Reino máximo — xianxia** (2400 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 56 | 2.3% |
| Refinamento de Qi | 40 | 1.7% |
| Fundação | 43 | 1.8% |
| Núcleo Dourado | 346 | 14.4% |
| Alma Nascente | 406 | 16.9% |
| Transformação Divina | 337 | 14.0% |
| Refino do Vazio | 674 | 28.1% |
| Integração Corporal | 323 | 13.5% |
| Grande Ascensão | 175 | 7.3% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 30 | 1.9% |
| Terceira Classe | 17 | 1.1% |
| Segunda Classe | 55 | 3.4% |
| Primeira Classe | 212 | 13.3% |
| Mestre de Pico | 741 | 46.3% |
| Transcendente | 391 | 24.4% |
| Além dos Limites | 108 | 6.8% |
| Lenda Marcial | 46 | 2.9% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 400 | 5.10 | 886 | 3 |
| Caminho da Espada | 400 | 4.24 | 219 | 2 |
| Caminho da Alquimia | 400 | 4.93 | 817 | 4 |
| Caminho do Corpo | 400 | 3.99 | 208 | 1 |
| Caminho da Consciência | 400 | 5.16 | 878 | 2 |
| Caminho das Formações | 400 | 5.08 | 856 | 1 |
| Caminho do Mérito | 400 | 4.35 | 241 | 5 |
| Caminho dos Venenos | 400 | 4.05 | 205 | 2 |
| Caminho das Bestas | 400 | 5.18 | 930 | 6 |
| Caminho do Sangue | 400 | 4.98 | 833 | 6 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Grande Sutra do Ciclo (n=61, reino relativo +16.5 pp, ascensão 1.6%); Escama de Qilin (n=78, reino relativo +14.4 pp, ascensão 1.3%); Sutra do Espelho Quieto (n=371, reino relativo +13.1 pp, ascensão 2.7%); Anel de Jade Frio (n=248, reino relativo +13.1 pp, ascensão 0.4%); Contas de Madeira de Trovão (n=141, reino relativo +12.5 pp, ascensão 2.1%).
Menores: Espada do Orvalho (n=400, reino relativo -1.3 pp, ascensão 0.5%); Chuva de Mil Agulhas (n=400, reino relativo -3.9 pp, ascensão 0.5%); Ossos de Ferro Frio (n=400, reino relativo -4.8 pp, ascensão 0.3%).

**Eventos vistos:** 237/241. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao.
Eventos raros/lendários menos frequentes: mestre_em_perigo (1), aprendiz_alquimista (1), aprendiz_retorna (1), mestre_pede_favor (3), sucessao_seita (3), espada_viva (5), besta_em_perigo (6), mestre_ensina_tecnica (7).
Eventos mais repetidos (por vida): meditacao_profunda (3.0), retiro_fechado (1.6), gargalo_longo (1.5), partir_viagem (1.3), secar_ervas (1.2), desvio_de_qi_leve (1.1), cacador_recompensas (1.0), doenca_da_aldeia (1.0).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 67 (1.7%)  
**Idade de morte:** mín 16 · p10 102 · mediana 382 · p90 1749 · p99 2727 · máx 3037

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2598 | 65.0% |
| Morte em Combate | 123 | 3.1% |
| Cinzas da Tribulação | 876 | 21.9% |
| Ascensão | 67 | 1.7% |
| Caminho Demoníaco | 10 | 0.3% |
| Vida Comum | 23 | 0.6% |
| Desvio de Qi | 253 | 6.3% |
| Fundador de Seita | 13 | 0.3% |
| A Dívida Cobrada | 3 | 0.1% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 3 | 0.1% |
| O Eremita das Nuvens | 13 | 0.3% |
| Perdido no Vazio | 2 | 0.1% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 4 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| A Roda do Samsara | 11 | 0.3% |

**Reino máximo — xianxia** (2376 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 13 | 0.5% |
| Refinamento de Qi | 42 | 1.8% |
| Fundação | 55 | 2.3% |
| Núcleo Dourado | 309 | 13.0% |
| Alma Nascente | 314 | 13.2% |
| Transformação Divina | 310 | 13.0% |
| Refino do Vazio | 642 | 27.0% |
| Integração Corporal | 430 | 18.1% |
| Grande Ascensão | 261 | 11.0% |

**Reino máximo — murim** (1624 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 9 | 0.6% |
| Terceira Classe | 16 | 1.0% |
| Segunda Classe | 30 | 1.8% |
| Primeira Classe | 67 | 4.1% |
| Mestre de Pico | 626 | 38.5% |
| Transcendente | 497 | 30.6% |
| Além dos Limites | 253 | 15.6% |
| Lenda Marcial | 126 | 7.8% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 390 | 5.25 | 918 | 5 |
| Caminho da Espada | 383 | 4.85 | 311 | 8 |
| Caminho da Alquimia | 410 | 5.32 | 939 | 6 |
| Caminho do Corpo | 427 | 4.60 | 274 | 8 |
| Caminho da Consciência | 437 | 5.52 | 1037 | 10 |
| Caminho das Formações | 382 | 5.40 | 974 | 6 |
| Caminho do Mérito | 410 | 4.86 | 305 | 11 |
| Caminho dos Venenos | 404 | 4.59 | 271 | 3 |
| Caminho das Bestas | 396 | 5.59 | 1092 | 6 |
| Caminho do Sangue | 361 | 5.30 | 935 | 4 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 2 | Centenário |
| 4 | Degraus de Nuvem |
| 9 | Mão de Alquimista |
| 11 | Dívida Quitada |
| 25 | Mão Verde |
| 31 | Discípulo de Sábios |
| 42 | Simplicidade |
| 55 | Sombra Escolhida |
| 89 | A Pergunta do Portão |
| 111 | Irmãos de Alma |
| 125 | Silêncio Alto |
| 243 | A Roda Gira |
| 453 | Pedra Fundamental |
| 584 | Entre Passos |
| 1087 | Cofre Cheio |
| 1651 | Luz Que Fica |
| 3617 | Fio Vermelho |

Conquistas não obtidas: Manto de Séculos, Alquimista Absoluto.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 5/5. Pontos sobrando: 155378.

Ascensões por quartil de vidas (1º → 4º): 18 → 18 → 13 → 18

Uso de trilhas: Caminho do Sopro 390 · Caminho da Espada 383 · Caminho da Alquimia 410 · Caminho do Corpo 427 · Caminho da Consciência 437 · Caminho das Formações 382 · Caminho do Mérito 410 · Caminho dos Venenos 404 · Caminho das Bestas 396 · Caminho do Sangue 361

Origens usadas: 13/13 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (304), despertar_reencarnado (287), despertar_demoniaco (295), regressao_visao (94).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Olhar de Bai Ze (n=68, reino relativo +15.4 pp, ascensão 4.4%); Anel de Jade Frio (n=242, reino relativo +13.1 pp, ascensão 5.8%); Grande Sutra do Ciclo (n=75, reino relativo +12.9 pp, ascensão 9.3%); Sutra do Espelho Quieto (n=456, reino relativo +12.8 pp, ascensão 4.2%); Espelho de Bronze Antigo (n=566, reino relativo +9.2 pp, ascensão 2.8%).
Menores: Ossos de Ferro Frio (n=427, reino relativo -1.8 pp, ascensão 1.9%); Respiração da Nuvem Lenta (n=390, reino relativo -1.9 pp, ascensão 1.3%); Chuva de Mil Agulhas (n=404, reino relativo -2.0 pp, ascensão 0.7%).

**Eventos vistos:** 241/241. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: mestre_em_perigo (1), aprendiz_alquimista (2), aprendiz_retorna (2), sucessao_seita (5), ancestral_ensina (7), pacto_sangue_antigo (8), besta_em_perigo (11), mestre_pede_favor (12).
Eventos mais repetidos (por vida): meditacao_profunda (2.4), gargalo_longo (1.3), retiro_fechado (1.2), partir_viagem (1.0), secar_ervas (0.9), desvio_de_qi_leve (0.8), cacador_recompensas (0.8), doenca_da_aldeia (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
