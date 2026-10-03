# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 313 eventos, 83 itens, 46 técnicas, 22 finais, 10 trilhas.

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

**Taxa de ascensão:** 28 (0.7%)  
**Idade de morte:** mín 18 · p10 101 · mediana 296 · p90 1700 · p99 2697 · máx 2892

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2685 | 67.1% |
| Morte em Combate | 164 | 4.1% |
| Cinzas da Tribulação | 695 | 17.4% |
| Ascensão | 28 | 0.7% |
| Caminho Demoníaco | 25 | 0.6% |
| Vida Comum | 93 | 2.3% |
| Desvio de Qi | 244 | 6.1% |
| Fundador de Seita | 1 | 0.0% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 7 | 0.2% |
| O Eremita das Nuvens | 21 | 0.5% |
| Perdido no Vazio | 2 | 0.1% |
| Patriarca da Seita | 1 | 0.0% |
| Guardião do Reino Secreto | 5 | 0.1% |
| A Pílula Suprema | 1 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 7 | 0.2% |
| A Roda do Samsara | 21 | 0.5% |

**Reino máximo — xianxia** (2400 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 56 | 2.3% |
| Refinamento de Qi | 45 | 1.9% |
| Fundação | 59 | 2.5% |
| Núcleo Dourado | 374 | 15.6% |
| Alma Nascente | 448 | 18.7% |
| Transformação Divina | 340 | 14.2% |
| Refino do Vazio | 628 | 26.2% |
| Integração Corporal | 288 | 12.0% |
| Grande Ascensão | 162 | 6.8% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 30 | 1.9% |
| Terceira Classe | 21 | 1.3% |
| Segunda Classe | 39 | 2.4% |
| Primeira Classe | 232 | 14.5% |
| Mestre de Pico | 755 | 47.2% |
| Transcendente | 362 | 22.6% |
| Além dos Limites | 123 | 7.7% |
| Lenda Marcial | 38 | 2.4% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 400 | 4.96 | 847 | 4 |
| Caminho da Espada | 400 | 4.26 | 226 | 5 |
| Caminho da Alquimia | 400 | 4.92 | 804 | 1 |
| Caminho do Corpo | 400 | 3.92 | 199 | 2 |
| Caminho da Consciência | 400 | 5.10 | 881 | 6 |
| Caminho das Formações | 400 | 4.92 | 803 | 6 |
| Caminho do Mérito | 400 | 4.31 | 234 | 0 |
| Caminho dos Venenos | 400 | 4.07 | 208 | 0 |
| Caminho das Bestas | 400 | 4.89 | 815 | 1 |
| Caminho do Sangue | 400 | 4.86 | 800 | 3 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Sutra do Céu Vazio (n=86, reino relativo +20.5 pp, ascensão 2.3%); Anel de Jade Frio (n=214, reino relativo +16.5 pp, ascensão 3.3%); Sutra do Espelho Quieto (n=262, reino relativo +15.6 pp, ascensão 1.5%); Koan do Riso Antes do Nascimento (n=173, reino relativo +12.7 pp, ascensão 0.0%); Espelho de Bronze Antigo (n=471, reino relativo +10.7 pp, ascensão 1.3%).
Menores: Anel Negro e Opaco (n=218, reino relativo +0.2 pp, ascensão 0.9%); Chuva de Mil Agulhas (n=400, reino relativo -2.5 pp, ascensão 0.0%); Ossos de Ferro Frio (n=400, reino relativo -4.7 pp, ascensão 0.5%).

**Eventos vistos:** 309/313. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao.
Eventos raros/lendários menos frequentes: mestre_em_perigo (1), dilema_lealdade (2), mestre_ensina_tecnica (3), sucessao_seita (3), cla_prospera (3), senhor_do_sangue (3), ancestral_ensina (4), luto_e_caminho (4).
Eventos mais repetidos (por vida): meditacao_profunda (2.3), retiro_fechado (1.2), gargalo_longo (1.1), partir_viagem (0.9), mantra_cem_mil (0.9), jardim_lotos (0.9), secar_ervas (0.9), fantasma_faminto (0.9).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 64 (1.6%)  
**Idade de morte:** mín 15 · p10 110 · mediana 401 · p90 1754 · p99 2744 · máx 3157

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2707 | 67.7% |
| Morte em Combate | 116 | 2.9% |
| Cinzas da Tribulação | 791 | 19.8% |
| Ascensão | 64 | 1.6% |
| Caminho Demoníaco | 14 | 0.3% |
| Vida Comum | 21 | 0.5% |
| Desvio de Qi | 248 | 6.2% |
| Fundador de Seita | 5 | 0.1% |
| A Dívida Cobrada | 1 | 0.0% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 4 | 0.1% |
| O Eremita das Nuvens | 11 | 0.3% |
| Perdido no Vazio | 2 | 0.1% |
| Patriarca da Seita | 2 | 0.1% |
| Guardião do Reino Secreto | 2 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Iluminação | 5 | 0.1% |
| A Roda do Samsara | 6 | 0.1% |

**Reino máximo — xianxia** (2373 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 14 | 0.6% |
| Refinamento de Qi | 49 | 2.1% |
| Fundação | 47 | 2.0% |
| Núcleo Dourado | 280 | 11.8% |
| Alma Nascente | 311 | 13.1% |
| Transformação Divina | 325 | 13.7% |
| Refino do Vazio | 627 | 26.4% |
| Integração Corporal | 451 | 19.0% |
| Grande Ascensão | 269 | 11.3% |

**Reino máximo — murim** (1627 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 6 | 0.4% |
| Terceira Classe | 14 | 0.9% |
| Segunda Classe | 22 | 1.4% |
| Primeira Classe | 68 | 4.2% |
| Mestre de Pico | 637 | 39.2% |
| Transcendente | 519 | 31.9% |
| Além dos Limites | 226 | 13.9% |
| Lenda Marcial | 135 | 8.3% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 387 | 5.44 | 1005 | 9 |
| Caminho da Espada | 387 | 4.71 | 292 | 10 |
| Caminho da Alquimia | 411 | 5.37 | 969 | 4 |
| Caminho do Corpo | 429 | 4.68 | 288 | 5 |
| Caminho da Consciência | 435 | 5.58 | 1087 | 8 |
| Caminho das Formações | 376 | 5.35 | 966 | 3 |
| Caminho do Mérito | 409 | 4.86 | 312 | 12 |
| Caminho dos Venenos | 402 | 4.69 | 277 | 4 |
| Caminho das Bestas | 397 | 5.52 | 1066 | 6 |
| Caminho do Sangue | 367 | 5.40 | 952 | 3 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 2 | Núcleo Brilhante |
| 2 | Centenário |
| 9 | Mão de Alquimista |
| 11 | Dívida Quitada |
| 25 | Mão Verde |
| 26 | Sombra Escolhida |
| 42 | Simplicidade |
| 53 | Degraus de Nuvem |
| 95 | Cofre Cheio |
| 95 | Discípulo de Sábios |
| 118 | Pedra Fundamental |
| 181 | Silêncio Alto |
| 224 | A Roda Gira |
| 276 | Irmãos de Alma |
| 341 | Manto de Séculos |
| 601 | Despertar Sem Degraus |
| 1039 | Luz Que Fica |
| 3101 | Fio Vermelho |
| 3224 | A Pergunta do Portão |
| 3700 | Entre Passos |

Conquistas não obtidas: Alquimista Absoluto, Retrato no Salão, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 5/5. Pontos sobrando: 156934.

Ascensões por quartil de vidas (1º → 4º): 15 → 12 → 21 → 16

Uso de trilhas: Caminho do Sopro 387 · Caminho da Espada 387 · Caminho da Alquimia 411 · Caminho do Corpo 429 · Caminho da Consciência 435 · Caminho das Formações 376 · Caminho do Mérito 409 · Caminho dos Venenos 402 · Caminho das Bestas 397 · Caminho do Sangue 367

Origens usadas: 13/13 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (301), despertar_reencarnado (284), despertar_demoniaco (295), regressao_visao (76).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Sutra do Céu Vazio (n=103, reino relativo +16.6 pp, ascensão 2.9%); Anel de Jade Frio (n=226, reino relativo +14.2 pp, ascensão 4.0%); Bolsa Celeste (n=65, reino relativo +13.4 pp, ascensão 1.5%); Koan do Riso Antes do Nascimento (n=152, reino relativo +12.6 pp, ascensão 5.3%); Sutra do Espelho Quieto (n=350, reino relativo +10.9 pp, ascensão 2.9%).
Menores: Ossos de Ferro Frio (n=429, reino relativo -1.0 pp, ascensão 1.2%); Traços do Primeiro Selo (n=376, reino relativo -1.1 pp, ascensão 0.8%); Anel Negro e Opaco (n=213, reino relativo -2.0 pp, ascensão 0.5%).

**Eventos vistos:** 313/313. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: mestre_em_perigo (1), senhor_do_sangue (2), aprendiz_retorna (4), cla_prospera (5), luto_e_caminho (6), pacto_sangue_antigo (7), ancestral_ensina (7), mestre_ensina_tecnica (7).
Eventos mais repetidos (por vida): meditacao_profunda (1.9), retiro_fechado (1.0), gargalo_longo (1.0), partir_viagem (0.8), mantra_cem_mil (0.7), fantasma_faminto (0.7), jardim_lotos (0.7), oferenda_templo (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
