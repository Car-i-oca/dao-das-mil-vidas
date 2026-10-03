# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 194 eventos, 59 itens, 32 técnicas, 15 finais, 10 trilhas.

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

**Taxa de ascensão:** 34 (0.8%)  
**Idade de morte:** mín 18 · p10 95 · mediana 294 · p90 1540 · p99 2687 · máx 2871

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2526 | 63.1% |
| Morte em Combate | 184 | 4.6% |
| Cinzas da Tribulação | 851 | 21.3% |
| Ascensão | 34 | 0.8% |
| Caminho Demoníaco | 44 | 1.1% |
| Vida Comum | 88 | 2.2% |
| Desvio de Qi | 209 | 5.2% |
| Fundador de Seita | 3 | 0.1% |
| A Dívida Cobrada | 3 | 0.1% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 12 | 0.3% |
| O Eremita das Nuvens | 21 | 0.5% |
| Perdido no Vazio | 5 | 0.1% |
| Patriarca da Seita | 0 | 0.0% |
| A Roda do Samsara | 20 | 0.5% |

**Reino máximo — xianxia** (2400 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 56 | 2.3% |
| Refinamento de Qi | 56 | 2.3% |
| Fundação | 34 | 1.4% |
| Núcleo Dourado | 384 | 16.0% |
| Alma Nascente | 462 | 19.3% |
| Transformação Divina | 374 | 15.6% |
| Refino do Vazio | 605 | 25.2% |
| Integração Corporal | 285 | 11.9% |
| Grande Ascensão | 144 | 6.0% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 30 | 1.9% |
| Terceira Classe | 21 | 1.3% |
| Segunda Classe | 47 | 2.9% |
| Primeira Classe | 230 | 14.4% |
| Mestre de Pico | 783 | 48.9% |
| Transcendente | 318 | 19.9% |
| Além dos Limites | 128 | 8.0% |
| Lenda Marcial | 43 | 2.7% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 400 | 4.81 | 732 | 3 |
| Caminho da Espada | 400 | 4.21 | 223 | 3 |
| Caminho da Alquimia | 400 | 4.89 | 788 | 2 |
| Caminho do Corpo | 400 | 3.95 | 200 | 3 |
| Caminho da Consciência | 400 | 5.22 | 896 | 6 |
| Caminho das Formações | 400 | 4.89 | 779 | 2 |
| Caminho do Mérito | 400 | 4.37 | 239 | 4 |
| Caminho dos Venenos | 400 | 3.96 | 195 | 1 |
| Caminho das Bestas | 400 | 4.83 | 794 | 4 |
| Caminho do Sangue | 400 | 4.79 | 744 | 6 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Grande Sutra do Ciclo (n=67, reino relativo +17.3 pp, ascensão 4.5%); Anel de Jade Frio (n=261, reino relativo +14.1 pp, ascensão 1.9%); Rosário de Sândalo Antigo (n=124, reino relativo +10.6 pp, ascensão 0.8%); Luvas de Ferro Negro (n=165, reino relativo +9.6 pp, ascensão 0.0%); Contas de Madeira de Trovão (n=168, reino relativo +8.9 pp, ascensão 3.6%).
Menores: Espada do Orvalho (n=400, reino relativo -0.3 pp, ascensão 0.8%); Chuva de Mil Agulhas (n=400, reino relativo -3.7 pp, ascensão 0.3%); Ossos de Ferro Frio (n=400, reino relativo -3.9 pp, ascensão 0.8%).

**Eventos vistos:** 190/194. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao.
Eventos raros/lendários menos frequentes: mestre_em_perigo (1), sucessao_seita (1), ancestral_ensina (4), mestre_pede_favor (5), conspiracao_anciao (6), refinar_passagem_1 (7), refinar_passagem_2 (7), mestre_ensina_tecnica (11).
Eventos mais repetidos (por vida): meditacao_profunda (3.6), retiro_fechado (1.8), gargalo_longo (1.8), partir_viagem (1.6), desvio_de_qi_leve (1.4), doenca_da_aldeia (1.2), cacador_recompensas (1.2), emboscada_bandidos (1.1).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 71 (1.8%)  
**Idade de morte:** mín 14 · p10 102 · mediana 389 · p90 1738 · p99 2721 · máx 3041

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2583 | 64.6% |
| Morte em Combate | 115 | 2.9% |
| Cinzas da Tribulação | 914 | 22.9% |
| Ascensão | 71 | 1.8% |
| Caminho Demoníaco | 27 | 0.7% |
| Vida Comum | 21 | 0.5% |
| Desvio de Qi | 223 | 5.6% |
| Fundador de Seita | 8 | 0.2% |
| A Dívida Cobrada | 3 | 0.1% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 8 | 0.2% |
| O Eremita das Nuvens | 14 | 0.3% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| A Roda do Samsara | 12 | 0.3% |

**Reino máximo — xianxia** (2370 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 10 | 0.4% |
| Refinamento de Qi | 34 | 1.4% |
| Fundação | 41 | 1.7% |
| Núcleo Dourado | 302 | 12.7% |
| Alma Nascente | 304 | 12.8% |
| Transformação Divina | 311 | 13.1% |
| Refino do Vazio | 689 | 29.1% |
| Integração Corporal | 426 | 18.0% |
| Grande Ascensão | 253 | 10.7% |

**Reino máximo — murim** (1630 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 11 | 0.7% |
| Terceira Classe | 21 | 1.3% |
| Segunda Classe | 27 | 1.7% |
| Primeira Classe | 80 | 4.9% |
| Mestre de Pico | 650 | 39.9% |
| Transcendente | 478 | 29.3% |
| Além dos Limites | 244 | 15.0% |
| Lenda Marcial | 119 | 7.3% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 385 | 5.51 | 1028 | 8 |
| Caminho da Espada | 390 | 4.71 | 288 | 8 |
| Caminho da Alquimia | 409 | 5.32 | 894 | 8 |
| Caminho do Corpo | 429 | 4.65 | 281 | 3 |
| Caminho da Consciência | 436 | 5.61 | 1078 | 8 |
| Caminho das Formações | 376 | 5.48 | 992 | 1 |
| Caminho do Mérito | 407 | 4.80 | 302 | 8 |
| Caminho dos Venenos | 404 | 4.50 | 255 | 7 |
| Caminho das Bestas | 399 | 5.54 | 1042 | 12 |
| Caminho do Sangue | 365 | 5.26 | 869 | 8 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 2 | Centenário |
| 3 | Discípulo de Sábios |
| 4 | Silêncio Alto |
| 6 | Sombra Escolhida |
| 8 | Mão Verde |
| 11 | Mão de Alquimista |
| 12 | Degraus de Nuvem |
| 12 | Dívida Quitada |
| 42 | Simplicidade |
| 56 | A Roda Gira |
| 98 | Irmãos de Alma |
| 204 | Fio Vermelho |
| 237 | Luz Que Fica |
| 767 | Cofre Cheio |
| 1254 | Pedra Fundamental |

Conquistas não obtidas: Entre Passos, Manto de Séculos.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 5/5. Pontos sobrando: 156947.

Ascensões por quartil de vidas (1º → 4º): 16 → 18 → 22 → 15

Uso de trilhas: Caminho do Sopro 385 · Caminho da Espada 390 · Caminho da Alquimia 409 · Caminho do Corpo 429 · Caminho da Consciência 436 · Caminho das Formações 376 · Caminho do Mérito 407 · Caminho dos Venenos 404 · Caminho das Bestas 399 · Caminho do Sangue 365

Origens usadas: 13/13 · Talentos usados: 13/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (308), despertar_reencarnado (297), despertar_demoniaco (316), regressao_visao (126).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Grande Sutra do Ciclo (n=90, reino relativo +14.1 pp, ascensão 3.3%); Anel de Jade Frio (n=190, reino relativo +12.5 pp, ascensão 3.2%); Manto do Discípulo do Núcleo (n=64, reino relativo +9.9 pp, ascensão 0.0%); Bolsa Celeste (n=124, reino relativo +8.4 pp, ascensão 2.4%); Sutra do Vazio Calmo (n=910, reino relativo +7.4 pp, ascensão 3.0%).
Menores: Ossos de Ferro Frio (n=429, reino relativo -1.2 pp, ascensão 0.7%); Anel Negro e Opaco (n=366, reino relativo -2.2 pp, ascensão 0.3%); Chuva de Mil Agulhas (n=404, reino relativo -3.3 pp, ascensão 1.7%).

**Eventos vistos:** 194/194. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: mestre_em_perigo (2), sucessao_seita (9), dilema_lealdade (18), pacto_sangue_antigo (20), ancestral_ensina (20), refinar_passagem_2 (23), mestre_pede_favor (24), dueto_dual_cultivo (25).
Eventos mais repetidos (por vida): meditacao_profunda (3.0), gargalo_longo (1.6), retiro_fechado (1.5), partir_viagem (1.3), desvio_de_qi_leve (1.1), cacador_recompensas (1.0), doenca_da_aldeia (0.9), peste_demonios_menores (0.8).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
