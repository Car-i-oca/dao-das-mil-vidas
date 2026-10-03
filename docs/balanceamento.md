# Balanceamento — linha de base

Gerado por `npm run sim -- 4000 --report` em 2026-10-03.
Conteúdo: 291 eventos, 79 itens, 43 técnicas, 21 finais, 10 trilhas.

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

**Taxa de ascensão:** 23 (0.6%)  
**Idade de morte:** mín 18 · p10 97 · mediana 291 · p90 1584 · p99 2703 · máx 2867

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2561 | 64.0% |
| Morte em Combate | 192 | 4.8% |
| Cinzas da Tribulação | 811 | 20.3% |
| Ascensão | 23 | 0.6% |
| Caminho Demoníaco | 45 | 1.1% |
| Vida Comum | 88 | 2.2% |
| Desvio de Qi | 227 | 5.7% |
| Fundador de Seita | 3 | 0.1% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 5 | 0.1% |
| O Eremita das Nuvens | 21 | 0.5% |
| Perdido no Vazio | 0 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 8 | 0.2% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 1 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Roda do Samsara | 15 | 0.4% |

**Reino máximo — xianxia** (2400 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 56 | 2.3% |
| Refinamento de Qi | 55 | 2.3% |
| Fundação | 45 | 1.9% |
| Núcleo Dourado | 403 | 16.8% |
| Alma Nascente | 465 | 19.4% |
| Transformação Divina | 356 | 14.8% |
| Refino do Vazio | 588 | 24.5% |
| Integração Corporal | 294 | 12.3% |
| Grande Ascensão | 138 | 5.8% |

**Reino máximo — murim** (1600 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 30 | 1.9% |
| Terceira Classe | 30 | 1.9% |
| Segunda Classe | 56 | 3.5% |
| Primeira Classe | 205 | 12.8% |
| Mestre de Pico | 802 | 50.1% |
| Transcendente | 341 | 21.3% |
| Além dos Limites | 101 | 6.3% |
| Lenda Marcial | 35 | 2.2% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 400 | 5.04 | 861 | 4 |
| Caminho da Espada | 400 | 4.07 | 211 | 3 |
| Caminho da Alquimia | 400 | 4.83 | 768 | 1 |
| Caminho do Corpo | 400 | 3.92 | 196 | 2 |
| Caminho da Consciência | 400 | 4.97 | 801 | 4 |
| Caminho das Formações | 400 | 4.79 | 756 | 1 |
| Caminho do Mérito | 400 | 4.28 | 227 | 3 |
| Caminho dos Venenos | 400 | 4.03 | 203 | 1 |
| Caminho das Bestas | 400 | 4.82 | 771 | 2 |
| Caminho do Sangue | 400 | 4.77 | 762 | 2 |

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (0), despertar_reencarnado (0), despertar_demoniaco (0), regressao_visao (0).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Anel de Jade Frio (n=234, reino relativo +14.9 pp, ascensão 2.6%); Escama de Qilin (n=67, reino relativo +14.5 pp, ascensão 4.5%); Sutra do Espelho Quieto (n=290, reino relativo +14.1 pp, ascensão 1.7%); Contas de Penitência (n=67, reino relativo +12.0 pp, ascensão 0.0%); Espelho de Bronze Antigo (n=531, reino relativo +11.6 pp, ascensão 1.1%).
Menores: Espada do Orvalho (n=400, reino relativo -1.6 pp, ascensão 0.8%); Chuva de Mil Agulhas (n=400, reino relativo -2.2 pp, ascensão 0.3%); Ossos de Ferro Frio (n=400, reino relativo -3.7 pp, ascensão 0.5%).

**Eventos vistos:** 287/291. Nunca vistos: despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao.
Eventos raros/lendários menos frequentes: sucessao_seita (2), rival_ascendido (2), mestre_em_perigo (3), ancestral_ensina (4), mestre_ensina_tecnica (4), senhor_do_sangue (4), besta_em_perigo (5), aprendiz_retorna (5).
Eventos mais repetidos (por vida): meditacao_profunda (2.6), retiro_fechado (1.4), gargalo_longo (1.3), partir_viagem (1.1), secar_ervas (1.0), desvio_de_qi_leve (1.0), cacador_recompensas (0.9), doenca_da_aldeia (0.9).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

4000 vidas.

**Taxa de ascensão:** 73 (1.8%)  
**Idade de morte:** mín 16 · p10 104 · mediana 356 · p90 1737 · p99 2716 · máx 3020

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Fim em Paz | 2599 | 65.0% |
| Morte em Combate | 150 | 3.8% |
| Cinzas da Tribulação | 868 | 21.7% |
| Ascensão | 73 | 1.8% |
| Caminho Demoníaco | 22 | 0.6% |
| Vida Comum | 21 | 0.5% |
| Desvio de Qi | 235 | 5.9% |
| Fundador de Seita | 7 | 0.2% |
| A Dívida Cobrada | 0 | 0.0% |
| Fio Vermelho | 0 | 0.0% |
| Sacrifício Final | 3 | 0.1% |
| O Eremita das Nuvens | 11 | 0.3% |
| Perdido no Vazio | 1 | 0.0% |
| Patriarca da Seita | 0 | 0.0% |
| Guardião do Reino Secreto | 4 | 0.1% |
| A Pílula Suprema | 0 | 0.0% |
| Ancestral do Clã | 0 | 0.0% |
| A Sombra do Trono | 0 | 0.0% |
| Senhor do Sangue | 0 | 0.0% |
| O Penitente | 0 | 0.0% |
| A Roda do Samsara | 6 | 0.1% |

**Reino máximo — xianxia** (2372 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 9 | 0.4% |
| Refinamento de Qi | 41 | 1.7% |
| Fundação | 47 | 2.0% |
| Núcleo Dourado | 303 | 12.8% |
| Alma Nascente | 326 | 13.7% |
| Transformação Divina | 326 | 13.7% |
| Refino do Vazio | 676 | 28.5% |
| Integração Corporal | 398 | 16.8% |
| Grande Ascensão | 246 | 10.4% |

**Reino máximo — murim** (1628 vidas)

| Reino | Vidas | % |
|---|---:|---:|
| Mortal | 10 | 0.6% |
| Terceira Classe | 12 | 0.7% |
| Segunda Classe | 25 | 1.5% |
| Primeira Classe | 86 | 5.3% |
| Mestre de Pico | 659 | 40.5% |
| Transcendente | 475 | 29.2% |
| Além dos Limites | 244 | 15.0% |
| Lenda Marcial | 117 | 7.2% |

**Por trilha**

| Trilha | Vidas | Reino médio | Idade média | Ascensões |
|---|---:|---:|---:|---:|
| Caminho do Sopro | 386 | 5.41 | 954 | 6 |
| Caminho da Espada | 389 | 4.81 | 300 | 8 |
| Caminho da Alquimia | 409 | 5.29 | 939 | 5 |
| Caminho do Corpo | 430 | 4.60 | 272 | 7 |
| Caminho da Consciência | 436 | 5.49 | 992 | 10 |
| Caminho das Formações | 377 | 5.36 | 945 | 4 |
| Caminho do Mérito | 406 | 4.79 | 299 | 8 |
| Caminho dos Venenos | 403 | 4.52 | 260 | 4 |
| Caminho das Bestas | 399 | 5.37 | 981 | 12 |
| Caminho do Sangue | 365 | 5.42 | 978 | 9 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeiro Passo |
| 1 | Alicerce Firme |
| 2 | Núcleo Brilhante |
| 2 | Centenário |
| 2 | Discípulo de Sábios |
| 9 | Mão de Alquimista |
| 9 | Sombra Escolhida |
| 9 | Dívida Quitada |
| 21 | Mão Verde |
| 25 | Simplicidade |
| 40 | Irmãos de Alma |
| 146 | Degraus de Nuvem |
| 232 | A Roda Gira |
| 283 | A Pergunta do Portão |
| 285 | Cofre Cheio |
| 427 | Silêncio Alto |
| 686 | Pedra Fundamental |
| 1581 | Luz Que Fica |
| 3329 | Entre Passos |

Conquistas não obtidas: Fio Vermelho, Manto de Séculos, Alquimista Absoluto, Retrato no Salão, Voz Atrás do Trono, Coroa de Ossos, Vassoura e Silêncio.

Upgrades finais de Herança: Alicerce Corporal 6/6 · Mente Clara 6/6 · Fio do Destino 6/6 · Ritmo do Dao 8/8 · Herança de Pedras 10/10 · Mais Destinos 3/3 · Memória de Vidas Passadas 5/5. Pontos sobrando: 155441.

Ascensões por quartil de vidas (1º → 4º): 12 → 17 → 24 → 20

Uso de trilhas: Caminho do Sopro 386 · Caminho da Espada 389 · Caminho da Alquimia 409 · Caminho do Corpo 430 · Caminho da Consciência 436 · Caminho das Formações 377 · Caminho do Mérito 406 · Caminho dos Venenos 403 · Caminho das Bestas 399 · Caminho do Sangue 365

Origens usadas: 13/13 · Talentos usados: 14/14

**Eventos que dependem de desbloqueio** (ocorrências): despertar_alquimista (295), despertar_reencarnado (297), despertar_demoniaco (296), regressao_visao (100).

**Impacto de técnicas e artefatos** (reino relativo = reino/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: Grande Sutra do Ciclo (n=71, reino relativo +13.3 pp, ascensão 2.8%); Anel de Jade Frio (n=214, reino relativo +12.2 pp, ascensão 4.7%); Manto do Discípulo do Núcleo (n=80, reino relativo +11.5 pp, ascensão 1.3%); Espelho de Bronze Antigo (n=510, reino relativo +10.5 pp, ascensão 5.1%); Sutra do Espelho Quieto (n=382, reino relativo +10.2 pp, ascensão 3.1%).
Menores: Caldeirão de Fogo Calmo (n=409, reino relativo -1.1 pp, ascensão 1.2%); Ossos de Ferro Frio (n=430, reino relativo -1.5 pp, ascensão 1.6%); Chuva de Mil Agulhas (n=403, reino relativo -2.6 pp, ascensão 1.0%).

**Eventos vistos:** 291/291. Nunca vistos: nenhum.
Eventos raros/lendários menos frequentes: mestre_em_perigo (3), luto_e_caminho (4), aprendiz_retorna (6), cla_prospera (6), senhor_do_sangue (6), besta_em_perigo (9), rival_ascendido (9), espada_viva (10).
Eventos mais repetidos (por vida): meditacao_profunda (2.1), retiro_fechado (1.1), gargalo_longo (1.1), partir_viagem (0.9), secar_ervas (0.8), desvio_de_qi_leve (0.8), fome_no_reino (0.7), entrar_na_seita (0.7).

## Observações
- Os 4 eventos que dependem de desbloqueio (despertar_alquimista, despertar_reencarnado, despertar_demoniaco, regressao_visao) aparecem normalmente no modo meta.
- A conquista Sombra Escolhida (que libera a trilha do Sangue) vale também com Corrupção ≥ 60 ao morrer; terminar como demônio é raro demais (~1% mesmo buscando).
- Finais voluntários (eremita, sacrifício, reencarnação, vazio) ficam abaixo de ~1% porque o bot os evita; jogadores humanos devem escolhê-los mais.
- A Herança do Dao se esgota em cerca de 65 vidas (total comprável ≈ 4.700 pontos, ganho médio ≈ 74/vida). Falta um sumidouro de longo prazo para os pontos excedentes.
- Preços da Herança: custo × (nível+1)^1,5. Efeitos por nível: +1 atributo inicial, +3% de cultivo, +10 pedras.
