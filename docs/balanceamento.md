# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 217 eventos, 65 itens, 36 técnicas, 16 finais, 10 trilhas.

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

**Taxa de ascensão:** 42 (1.1%)  
**Idade de morte:** mín 16 · p10 95 · mediana 296 · p90 1717 · p99 2715 · máx 2897

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2583 | 64.6% |
| Morte em Combate | 201 | 5.0% |
| Cinzas da Tribulação | 769 | 19.2% |
| Ascensão | 42 | 1.1% |
| Caminho Demoníaco | 30 | 0.8% |
| Vida Comum | 87 | 2.2% |
| Desvio de Qi | 217 | 5.4% |
| Fundador de Seita | 8 | 0.2% |
| A Dívida Cobrada | 2 | 0.1% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 11 | 0.3% |
| O Eremita das Nuvens | 26 | 0.7% |
| Perdido no Vazio | 2 | 0.1% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 3 | 0.1% |
| A Roda do Samsara | 18 | 0.5% |

**Reino máximo — xianxia** (2400 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 56 | 2.3% |
| Refinamento de Qi | 53 | 2.2% |
| Fundação | 53 | 2.2% |
| Núcleo Dourado | 364 | 15.2% |
| Alma Nascente | 401 | 16.7% |
| Transformação Divina | 357 | 14.9% |
| Refino do Vazio | 596 | 24.8% |
| Integração Corporal | 338 | 14.1% |
| Grande Ascensão | 182 | 7.6% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 30 | 1.9% |
| Terceira Classe | 20 | 1.3% |
| Segunda Classe | 63 | 3.9% |
| Primeira Classe | 196 | 12.3% |
| Mestre de Pico | 749 | 46.8% |
| Transcendente | 361 | 22.6% |
| Além dos Limites | 141 | 8.8% |
| Lenda Marcial | 40 | 2.5% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 400 | 5.05 | 866 | 6 |
| Caminho da Espada | 400 | 4.29 | 233 | 2 |
| Caminho da Alquimia | 400 | 5.04 | 868 | 2 |
| Caminho do Corpo | 400 | 3.96 | 204 | 0 |
| Caminho da Consciência | 400 | 5.18 | 889 | 7 |
| Caminho das Formações | 400 | 4.97 | 835 | 8 |
| Caminho do Mérito | 400 | 4.33 | 239 | 3 |
| Caminho dos Venenos | 400 | 4.07 | 210 | 1 |
| Caminho das Bestas | 400 | 4.95 | 842 | 7 |
| Caminho do Sangue | 400 | 4.89 | 815 | 6 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Olhar de Bai Ze (n=77, reino relativo +16.1 pp, ascensão 3.9%); Grande Sutra do Ciclo (n=67, reino relativo +16.0 pp, ascensão 7.5%); Anel de Jade Frio (n=230, reino relativo +14.3 pp, ascensão 0.9%); Sutra do Espelho Quieto (n=434, reino relativo +13.7 pp, ascensão 3.0%); Escama de Qilin (n=83, reino relativo +13.5 pp, ascensão 4.8%).
Menores: Espada do Orvalho (n=400, reino relativo -0.2 pp, ascensão 0.5%); Chuva de Mil Agulhas (n=400, reino relativo -3.3 pp, ascensão 0.3%); Ossos de Ferro Frio (n=400, reino relativo -4.8 pp, ascensão 0.0%).

**Eventos vistos:** 213/217. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao.
Eventos raros/lendários menos frequentes: mestre_em_perigo (1), sucessao_seita (3), refinar_passagem_1 (4), besta_em_perigo (4), mestre_pede_favor (5), dilema_lealdade (5), ancestral_ensina (9), mestre_ensina_tecnica (9).
Eventos mais repetidos (por vida): meditacao_profunda (3.2), retiro_fechado (1.6), gargalo_longo (1.6), partir_viagem (1.3), desvio_de_qi_leve (1.2), cacador_recompensas (1.1), doenca_da_aldeia (1.1), emboscada_bandidos (1.0).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 76 (1.9%)  
**Idade de morte:** mín 14 · p10 107 · mediana 389 · p90 1757 · p99 2739 · máx 3078

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2630 | 65.8% |
| Morte em Combate | 115 | 2.9% |
| Cinzas da Tribulação | 839 | 21.0% |
| Ascensão | 76 | 1.9% |
| Caminho Demoníaco | 16 | 0.4% |
| Vida Comum | 23 | 0.6% |
| Desvio de Qi | 244 | 6.1% |
| Fundador de Seita | 5 | 0.1% |
| A Dívida Cobrada | 3 | 0.1% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 7 | 0.2% |
| O Eremita das Nuvens | 18 | 0.5% |
| Perdido no Vazio | 4 | 0.1% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 3 | 0.1% |
| A Roda do Samsara | 17 | 0.4% |

**Reino máximo — xianxia** (2368 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 13 | 0.5% |
| Refinamento de Qi | 36 | 1.5% |
| Fundação | 41 | 1.7% |
| Núcleo Dourado | 297 | 12.5% |
| Alma Nascente | 298 | 12.6% |
| Transformação Divina | 301 | 12.7% |
| Refino do Vazio | 662 | 28.0% |
| Integração Corporal | 416 | 17.6% |
| Grande Ascensão | 304 | 12.8% |

**Reino máximo — murim** (1632 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 7 | 0.4% |
| Terceira Classe | 21 | 1.3% |
| Segunda Classe | 30 | 1.8% |
| Primeira Classe | 78 | 4.8% |
| Mestre de Pico | 632 | 38.7% |
| Transcendente | 513 | 31.4% |
| Além dos Limites | 240 | 14.7% |
| Lenda Marcial | 111 | 6.8% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 384 | 5.52 | 1014 | 5 |
| Caminho da Espada | 390 | 4.77 | 294 | 6 |
| Caminho da Alquimia | 408 | 5.48 | 1025 | 9 |
| Caminho do Corpo | 429 | 4.62 | 281 | 8 |
| Caminho da Consciência | 436 | 5.65 | 1099 | 10 |
| Caminho das Formações | 376 | 5.40 | 1007 | 13 |
| Caminho do Mérito | 408 | 4.81 | 302 | 10 |
| Caminho dos Venenos | 405 | 4.50 | 252 | 1 |
| Caminho das Bestas | 398 | 5.56 | 1030 | 5 |
| Caminho do Sangue | 366 | 5.35 | 950 | 9 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 1 | Centenário |
| 3 | Sombra Escolhida |
| 9 | Dívida Quitada |
| 9 | Mão Verde |
| 13 | Discípulo de Sábios |
| 14 | Mão de Alquimista |
| 16 | Silêncio Alto |
| 36 | A Roda Gira |
| 42 | Simplicidade |
| 152 | Degraus de Nuvem |
| 185 | Irmãos de Alma |
| 202 | Cofre Cheio |
| 470 | Pedra Fundamental |
| 472 | Luz Que Fica |
| 1769 | Entre Passos |
| 2904 | A Pergunta do Portão |

Conquistas não obtidas: Fio Vermelho, Manto de Séculos.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 5/5. Pontos sobrando: 157468.

Ascensões por quartil de vidas (1º → 4º): 18 → 17 → 19 → 22

Uso de trilhas: Caminho do Sopro 384 · Caminho da Espada 390 · Caminho da Alquimia 408 · Caminho do Corpo 429 · Caminho da Consciência 436 · Caminho das Formações 376 · Caminho do Mérito 408 · Caminho dos Venenos 405 · Caminho das Bestas 398 · Caminho do Sangue 366

Origens usadas: 13/13 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (307), despertar_reencarnado (284), despertar_demoniaco (300), regressao_visao (107).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Olhar de Bai Ze (n=87, reino relativo +15.8 pp, ascensão 5.7%); Grande Sutra do Ciclo (n=100, reino relativo +13.1 pp, ascensão 8.0%); Anel de Jade Frio (n=188, reino relativo +12.6 pp, ascensão 5.9%); Sutra do Espelho Quieto (n=487, reino relativo +11.1 pp, ascensão 3.3%); Bolsa Celeste (n=130, reino relativo +9.9 pp, ascensão 2.3%).
Menores: Ossos de Ferro Frio (n=429, reino relativo -2.0 pp, ascensão 1.9%); Anel Negro e Opaco (n=330, reino relativo -3.3 pp, ascensão 1.2%); Chuva de Mil Agulhas (n=405, reino relativo -3.6 pp, ascensão 0.2%).

**Eventos vistos:** 217/217. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: mestre_em_perigo (3), sucessao_seita (7), ancestral_ensina (9), besta_em_perigo (9), pacto_sangue_antigo (13), mestre_pede_favor (13), espada_celeste (15), dilema_lealdade (19).
Eventos mais repetidos (por vida): meditacao_profunda (2.6), retiro_fechado (1.3), gargalo_longo (1.3), partir_viagem (1.1), desvio_de_qi_leve (0.9), doenca_da_aldeia (0.8), cacador_recompensas (0.8), peste_demonios_menores (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
