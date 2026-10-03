# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 165 eventos, 54 itens, 29 técnicas, 14 finais, 10 trilhas.

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

**Taxa de ascensão:** 66 (1.6%)  
**Idade de morte:** mín 18 · p10 95 · mediana 292 · p90 1505 · p99 2667 · máx 2871

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2445 | 61.1% |
| Morte em Combate | 195 | 4.9% |
| Cinzas da Tribulação | 875 | 21.9% |
| Ascensão | 66 | 1.6% |
| Caminho Demoníaco | 46 | 1.1% |
| Vida Comum | 89 | 2.2% |
| Desvio de Qi | 218 | 5.5% |
| Fundador de Seita | 4 | 0.1% |
| A Dívida Cobrada | 3 | 0.1% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 12 | 0.3% |
| O Eremita das Nuvens | 21 | 0.5% |
| Perdido no Vazio | 5 | 0.1% |
| A Roda do Samsara | 20 | 0.5% |

**Reino máximo — xianxia** (2400 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 56 | 2.3% |
| Refinamento de Qi | 62 | 2.6% |
| Fundação | 38 | 1.6% |
| Núcleo Dourado | 402 | 16.8% |
| Alma Nascente | 463 | 19.3% |
| Transformação Divina | 362 | 15.1% |
| Refino do Vazio | 589 | 24.5% |
| Integração Corporal | 289 | 12.0% |
| Grande Ascensão | 139 | 5.8% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 30 | 1.9% |
| Terceira Classe | 19 | 1.2% |
| Segunda Classe | 48 | 3.0% |
| Primeira Classe | 218 | 13.6% |
| Mestre de Pico | 789 | 49.3% |
| Transcendente | 318 | 19.9% |
| Além dos Limites | 135 | 8.4% |
| Lenda Marcial | 43 | 2.7% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 400 | 4.85 | 742 | 10 |
| Caminho da Espada | 400 | 4.22 | 226 | 6 |
| Caminho da Alquimia | 400 | 4.78 | 739 | 7 |
| Caminho do Corpo | 400 | 4.01 | 206 | 2 |
| Caminho da Consciência | 400 | 5.14 | 865 | 9 |
| Caminho das Formações | 400 | 4.84 | 764 | 2 |
| Caminho do Mérito | 400 | 4.36 | 233 | 6 |
| Caminho dos Venenos | 400 | 3.98 | 197 | 4 |
| Caminho das Bestas | 400 | 4.81 | 789 | 10 |
| Caminho do Sangue | 400 | 4.77 | 727 | 10 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0).

**Eventos vistos:** 161/165. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao.
Eventos raros/lendários menos frequentes: refinar_passagem_1 (5), refinar_passagem_2 (5), ancestral_ensina (6), besta_em_perigo (11), refinar_passagem_3 (22), espada_celeste (22), pacto_sangue_antigo (28), traidor_reaparece (30).
Eventos mais repetidos (por vida): meditacao_profunda (3.7), retiro_fechado (1.9), gargalo_longo (1.9), partir_viagem (1.6), desvio_de_qi_leve (1.4), doenca_da_aldeia (1.3), cacador_recompensas (1.3), emboscada_bandidos (1.2).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 136 (3.4%)  
**Idade de morte:** mín 14 · p10 91 · mediana 344 · p90 1737 · p99 2696 · máx 2984

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2391 | 59.8% |
| Morte em Combate | 171 | 4.3% |
| Cinzas da Tribulação | 913 | 22.8% |
| Ascensão | 136 | 3.4% |
| Caminho Demoníaco | 33 | 0.8% |
| Vida Comum | 41 | 1.0% |
| Desvio de Qi | 262 | 6.5% |
| Fundador de Seita | 7 | 0.2% |
| A Dívida Cobrada | 2 | 0.1% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 5 | 0.1% |
| O Eremita das Nuvens | 24 | 0.6% |
| Perdido no Vazio | 1 | 0.0% |
| A Roda do Samsara | 13 | 0.3% |

**Reino máximo — xianxia** (2372 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 24 | 1.0% |
| Refinamento de Qi | 42 | 1.8% |
| Fundação | 44 | 1.9% |
| Núcleo Dourado | 327 | 13.8% |
| Alma Nascente | 332 | 14.0% |
| Transformação Divina | 270 | 11.4% |
| Refino do Vazio | 676 | 28.5% |
| Integração Corporal | 419 | 17.7% |
| Grande Ascensão | 238 | 10.0% |

**Reino máximo — murim** (1628 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 15 | 0.9% |
| Terceira Classe | 23 | 1.4% |
| Segunda Classe | 34 | 2.1% |
| Primeira Classe | 90 | 5.5% |
| Mestre de Pico | 659 | 40.5% |
| Transcendente | 449 | 27.6% |
| Além dos Limites | 228 | 14.0% |
| Lenda Marcial | 130 | 8.0% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 387 | 5.32 | 921 | 16 |
| Caminho da Espada | 389 | 4.68 | 283 | 11 |
| Caminho da Alquimia | 410 | 5.31 | 922 | 14 |
| Caminho do Corpo | 430 | 4.48 | 258 | 12 |
| Caminho da Consciência | 436 | 5.41 | 970 | 14 |
| Caminho das Formações | 376 | 5.26 | 894 | 11 |
| Caminho do Mérito | 406 | 4.79 | 296 | 15 |
| Caminho dos Venenos | 403 | 4.54 | 261 | 13 |
| Caminho das Bestas | 398 | 5.48 | 1039 | 15 |
| Caminho do Sangue | 365 | 5.28 | 871 | 15 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 2 | Centenário |
| 3 | Discípulo de Sábios |
| 9 | Mão de Alquimista |
| 9 | Dívida Quitada |
| 11 | Sombra Escolhida |
| 19 | Degraus de Nuvem |
| 19 | Mão Verde |
| 40 | Irmãos de Alma |
| 42 | Simplicidade |
| 110 | Cofre Cheio |
| 277 | Fio Vermelho |
| 311 | Silêncio Alto |
| 507 | A Roda Gira |
| 700 | Luz Que Fica |
| 1309 | Entre Passos |
| 2408 | Pedra Fundamental |

Conquistas não obtidas: nenhuma.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10. Pontos sobrando: 286746.

Ascensões por quartil de vidas (1º → 4º): 31 → 37 → 36 → 32

Uso de trilhas: Caminho do Sopro 387 · Caminho da Espada 389 · Caminho da Alquimia 410 · Caminho do Corpo 430 · Caminho da Consciência 436 · Caminho das Formações 376 · Caminho do Mérito 406 · Caminho dos Venenos 403 · Caminho das Bestas 398 · Caminho do Sangue 365

Origens usadas: 13/13 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (303), despertar_reencarnado (310), despertar_demoniaco (336), regressao_visao (124).

**Eventos vistos:** 165/165. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: besta_em_perigo (11), ancestral_ensina (15), refinar_passagem_1 (18), espada_celeste (22), dueto_dual_cultivo (26), pacto_sangue_antigo (27), refinar_passagem_2 (36), traidor_reaparece (49).
Eventos mais repetidos (por vida): meditacao_profunda (3.2), gargalo_longo (1.7), retiro_fechado (1.6), partir_viagem (1.4), desvio_de_qi_leve (1.2), cacador_recompensas (1.0), doenca_da_aldeia (1.0), peste_demonios_menores (0.9).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
