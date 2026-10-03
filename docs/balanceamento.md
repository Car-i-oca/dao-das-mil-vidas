# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 267 eventos, 75 itens, 41 técnicas, 19 finais, 10 trilhas.

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

**Taxa de ascensão:** 24 (0.6%)  
**Idade de morte:** mín 18 · p10 101 · mediana 293 · p90 1592 · p99 2672 · máx 2870

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2682 | 67.0% |
| Morte em Combate | 160 | 4.0% |
| Cinzas da Tribulação | 768 | 19.2% |
| Ascensão | 24 | 0.6% |
| Caminho Demoníaco | 15 | 0.4% |
| Vida Comum | 90 | 2.3% |
| Desvio de Qi | 205 | 5.1% |
| Fundador de Seita | 6 | 0.1% |
| A Dívida Cobrada | 1 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 8 | 0.2% |
| O Eremita das Nuvens | 23 | 0.6% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 4 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| A Roda do Samsara | 14 | 0.3% |

**Reino máximo — xianxia** (2400 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 56 | 2.3% |
| Refinamento de Qi | 56 | 2.3% |
| Fundação | 37 | 1.5% |
| Núcleo Dourado | 393 | 16.4% |
| Alma Nascente | 438 | 18.3% |
| Transformação Divina | 377 | 15.7% |
| Refino do Vazio | 609 | 25.4% |
| Integração Corporal | 308 | 12.8% |
| Grande Ascensão | 126 | 5.3% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 30 | 1.9% |
| Terceira Classe | 28 | 1.8% |
| Segunda Classe | 49 | 3.1% |
| Primeira Classe | 206 | 12.9% |
| Mestre de Pico | 828 | 51.8% |
| Transcendente | 306 | 19.1% |
| Além dos Limites | 118 | 7.4% |
| Lenda Marcial | 35 | 2.2% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 400 | 4.89 | 786 | 4 |
| Caminho da Espada | 400 | 4.20 | 227 | 1 |
| Caminho da Alquimia | 400 | 4.77 | 746 | 1 |
| Caminho do Corpo | 400 | 3.92 | 195 | 1 |
| Caminho da Consciência | 400 | 5.18 | 898 | 4 |
| Caminho das Formações | 400 | 4.88 | 789 | 1 |
| Caminho do Mérito | 400 | 4.27 | 232 | 3 |
| Caminho dos Venenos | 400 | 3.96 | 195 | 0 |
| Caminho das Bestas | 400 | 4.83 | 819 | 3 |
| Caminho do Sangue | 400 | 4.85 | 752 | 6 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Anel de Jade Frio (n=266, reino relativo +14.8 pp, ascensão 2.3%); Escama de Qilin (n=66, reino relativo +14.0 pp, ascensão 4.5%); Sutra do Espelho Quieto (n=317, reino relativo +14.0 pp, ascensão 2.2%); Espelho de Bronze Antigo (n=557, reino relativo +11.0 pp, ascensão 1.8%); Espada Voadora de Aprendiz (n=443, reino relativo +10.3 pp, ascensão 2.5%).
Menores: Caldeirão de Fogo Calmo (n=400, reino relativo -0.5 pp, ascensão 0.3%); Chuva de Mil Agulhas (n=400, reino relativo -3.5 pp, ascensão 0.0%); Ossos de Ferro Frio (n=400, reino relativo -4.2 pp, ascensão 0.3%).

**Eventos vistos:** 263/267. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao.
Eventos raros/lendários menos frequentes: ancestral_ensina (2), mestre_em_perigo (2), conspiracao_anciao (2), sucessao_seita (2), mestre_ensina_tecnica (4), cla_prospera (4), dilema_lealdade (5), mestre_pede_favor (6).
Eventos mais repetidos (por vida): meditacao_profunda (2.7), retiro_fechado (1.5), gargalo_longo (1.3), partir_viagem (1.1), secar_ervas (1.1), desvio_de_qi_leve (1.0), doenca_da_aldeia (0.9), cacador_recompensas (0.9).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 63 (1.6%)  
**Idade de morte:** mín 15 · p10 110 · mediana 414 · p90 1753 · p99 2744 · máx 3090

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2713 | 67.8% |
| Morte em Combate | 102 | 2.5% |
| Cinzas da Tribulação | 863 | 21.6% |
| Ascensão | 63 | 1.6% |
| Caminho Demoníaco | 7 | 0.2% |
| Vida Comum | 20 | 0.5% |
| Desvio de Qi | 196 | 4.9% |
| Fundador de Seita | 2 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 1 | 0.0% |
| Sacrifício Final | 3 | 0.1% |
| O Eremita das Nuvens | 12 | 0.3% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 1 | 0.0% |
| Guardião do Reino Secreto | 5 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 1 | 0.0% |
| A Roda do Samsara | 11 | 0.3% |

**Reino máximo — xianxia** (2372 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 12 | 0.5% |
| Refinamento de Qi | 34 | 1.4% |
| Fundação | 32 | 1.3% |
| Núcleo Dourado | 301 | 12.7% |
| Alma Nascente | 304 | 12.8% |
| Transformação Divina | 327 | 13.8% |
| Refino do Vazio | 650 | 27.4% |
| Integração Corporal | 452 | 19.1% |
| Grande Ascensão | 260 | 11.0% |

**Reino máximo — murim** (1628 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 7 | 0.4% |
| Terceira Classe | 20 | 1.2% |
| Segunda Classe | 36 | 2.2% |
| Primeira Classe | 70 | 4.3% |
| Mestre de Pico | 636 | 39.1% |
| Transcendente | 496 | 30.5% |
| Além dos Limites | 246 | 15.1% |
| Lenda Marcial | 117 | 7.2% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 387 | 5.58 | 1065 | 9 |
| Caminho da Espada | 389 | 4.75 | 295 | 6 |
| Caminho da Alquimia | 410 | 5.42 | 987 | 7 |
| Caminho do Corpo | 430 | 4.65 | 287 | 4 |
| Caminho da Consciência | 436 | 5.69 | 1109 | 7 |
| Caminho das Formações | 376 | 5.40 | 959 | 4 |
| Caminho do Mérito | 406 | 4.78 | 295 | 6 |
| Caminho dos Venenos | 403 | 4.55 | 261 | 5 |
| Caminho das Bestas | 398 | 5.44 | 1040 | 9 |
| Caminho do Sangue | 365 | 5.31 | 896 | 6 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 1 | Núcleo Brilhante |
| 2 | Centenário |
| 9 | Mão de Alquimista |
| 9 | Dívida Quitada |
| 11 | Sombra Escolhida |
| 19 | Mão Verde |
| 21 | A Roda Gira |
| 42 | Simplicidade |
| 46 | Irmãos de Alma |
| 60 | Discípulo de Sábios |
| 61 | Luz Que Fica |
| 145 | Degraus de Nuvem |
| 483 | A Pergunta do Portão |
| 561 | Silêncio Alto |
| 1163 | Voz Atrás do Trono |
| 1243 | Cofre Cheio |
| 1457 | Pedra Fundamental |
| 1565 | Manto de Séculos |
| 2775 | Fio Vermelho |

Conquistas não obtidas: Entre Passos, Alquimista Absoluto, Retrato no Salão.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 5/5. Pontos sobrando: 157235.

Ascensões por quartil de vidas (1º → 4º): 19 → 15 → 16 → 13

Uso de trilhas: Caminho do Sopro 387 · Caminho da Espada 389 · Caminho da Alquimia 410 · Caminho do Corpo 430 · Caminho da Consciência 436 · Caminho das Formações 376 · Caminho do Mérito 406 · Caminho dos Venenos 403 · Caminho das Bestas 398 · Caminho do Sangue 365

Origens usadas: 13/13 · Talentos usados: 13/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (296), despertar_reencarnado (310), despertar_demoniaco (315), regressao_visao (101).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Anel de Jade Frio (n=256, reino relativo +13.3 pp, ascensão 6.6%); Bolsa Celeste (n=100, reino relativo +12.2 pp, ascensão 3.0%); Manto do Discípulo do Núcleo (n=88, reino relativo +11.0 pp, ascensão 8.0%); Sutra do Espelho Quieto (n=422, reino relativo +10.8 pp, ascensão 2.8%); Canto da Ave Persistente (n=233, reino relativo +10.6 pp, ascensão 3.9%).
Menores: Traços do Primeiro Selo (n=376, reino relativo -0.3 pp, ascensão 1.1%); Ossos de Ferro Frio (n=430, reino relativo -1.4 pp, ascensão 0.9%); Chuva de Mil Agulhas (n=403, reino relativo -2.9 pp, ascensão 1.2%).

**Eventos vistos:** 267/267. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: aprendiz_retorna (3), luto_e_caminho (4), besta_em_perigo (6), mestre_em_perigo (6), conselheiro_imperial (6), pacto_sangue_antigo (8), ancestral_ensina (8), cla_prospera (9).
Eventos mais repetidos (por vida): meditacao_profunda (2.3), gargalo_longo (1.1), retiro_fechado (1.1), partir_viagem (0.9), secar_ervas (0.8), desvio_de_qi_leve (0.8), fome_no_reino (0.8), cacador_recompensas (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
