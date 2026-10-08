# Balanceamento — linha de base

Gerado por `npm run sim -- 1000 --report` em 2026-10-08.
Conteúdo: 36 eventos, 21 itens, 17 finais, 10 trilhas.

## Como o bot joga
- 70% das vezes escolhe a opção de maior chance de sucesso; nos demais casos escolhe ao acaso entre as opções seguras.
- Evita escolhas que encerram a vida (risco de final > 12%), exceto quando a idade passa de 90% da vida máxima ou resta menos de 15 anos.
- No modo meta, joga vidas consecutivas, escolhe entre as trilhas liberadas e gasta pontos de Legado nos aprimoramentos disponíveis.

## Metas de balanceamento
- A vida acompanha uma carreira marcial humana; a faixa deve refletir domínio e reputação, sem longevidade sobrenatural.
- As escolhas da campanha Hwayang devem aparecer ao longo das vidas e produzir finais distintos.

### Vidas independentes (meta vazia; a trilha nasce dos eventos)

1000 vidas.

**Nomes imortalizados pela graduação final:** 0 (0.0%)
**Idade de morte:** mín 17 · p10 65 · mediana 71 · p90 76 · p99 80 · máx 83

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Uma vida completa | 280 | 28.0% |
| A vida fora do Jianghu | 0 | 0.0% |
| Caído na estrada | 0 | 0.0% |
| Caído na prova pública | 4 | 0.4% |
| Nome imortalizado | 0 | 0.0% |
| Isolado pelo poder | 0 | 0.0% |
| Derrota na graduação | 74 | 7.4% |
| Morto em duelo | 0 | 0.0% |
| Exílio | 0 | 0.0% |
| A sentença de Hwayang | 3 | 0.3% |
| Uma trégua frágil | 47 | 4.7% |
| O duelo que mudou o conselho | 7 | 0.7% |
| A paz comprada | 78 | 7.8% |
| Uma escola de portas abertas | 80 | 8.0% |
| Guardião das estradas | 61 | 6.1% |
| Mestre de muitas escolas | 213 | 21.3% |
| A casa cheia | 153 | 15.3% |

**Faixa máxima — murim** (1000 vidas)

| Faixa | Vidas | % |
|---|---:|---:|
| Aprendiz | 31 | 3.1% |
| Discípulo | 43 | 4.3% |
| Veterano | 425 | 42.5% |
| Mestre de Escola | 486 | 48.6% |
| Grão-Mestre | 15 | 1.5% |

**Por escola e estilo**

| Estilo | Vidas | Faixa média | Idade média | Consagrações |
|---|---:|---:|---:|---:|
| Punho da Respiração Serena | 22 | 3.32 | 71 | 0 |
| Escola da Lâmina Errante | 734 | 3.44 | 69 | 0 |
| Ofício dos Cem Remédios | 41 | 3.34 | 66 | 0 |
| Punho de Ferro | 36 | 3.31 | 70 | 0 |
| Olho que Lê o Combate | 15 | 3.13 | 67 | 0 |
| Formações das Quatro Pontes | 25 | 3.32 | 66 | 0 |
| Disciplina do Templo Silencioso | 57 | 3.46 | 70 | 0 |
| Mão das Agulhas Ocultas | 19 | 3.53 | 71 | 0 |
| Trilha do Caçador das Colinas | 20 | 3.25 | 69 | 0 |
| Método da Lua Oca | 31 | 3.19 | 67 | 0 |

**Eventos que dependem de desbloqueio** (ocorrências): .

**Impacto de artefatos** (faixa relativa = faixa/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: .
Menores: .

**Eventos vistos:** 35/36. Nunca vistos: murim_vida_comum.
Eventos raros/lendários menos frequentes: murim_heranca_final (4), murim_julgamento (52), murim_estilos_errantes (101), murim_rota_guardiao (131), murim_escola_aberta (137), murim_metodo_aberto (138), murim_conselho (152), murim_assembleia (182).
Eventos mais repetidos (por vida): murim_festival (2.3), murim_ponte_reparo (2.2), murim_mercado (2.1), murim_dia_comum (2.1), murim_refeicao (2.0), murim_ataque (1.9), murim_nomes (1.9), murim_inverno (1.8).

### Meta-progressão (vidas em sequência, como um jogador de verdade)

1000 vidas.

**Nomes imortalizados pela graduação final:** 0 (0.0%)
**Idade de morte:** mín 17 · p10 65 · mediana 71 · p90 77 · p99 85 · máx 88

**Finais**

| Final | Vidas | % |
|---|---:|---:|
| Uma vida completa | 124 | 12.4% |
| A vida fora do Jianghu | 0 | 0.0% |
| Caído na estrada | 2 | 0.2% |
| Caído na prova pública | 9 | 0.9% |
| Nome imortalizado | 0 | 0.0% |
| Isolado pelo poder | 0 | 0.0% |
| Derrota na graduação | 71 | 7.1% |
| Morto em duelo | 0 | 0.0% |
| Exílio | 0 | 0.0% |
| A sentença de Hwayang | 21 | 2.1% |
| Uma trégua frágil | 87 | 8.7% |
| O duelo que mudou o conselho | 18 | 1.8% |
| A paz comprada | 145 | 14.5% |
| Uma escola de portas abertas | 89 | 8.9% |
| Guardião das estradas | 63 | 6.3% |
| Mestre de muitas escolas | 228 | 22.8% |
| A casa cheia | 143 | 14.3% |

**Faixa máxima — murim** (1000 vidas)

| Faixa | Vidas | % |
|---|---:|---:|
| Aprendiz | 21 | 2.1% |
| Discípulo | 28 | 2.8% |
| Veterano | 213 | 21.3% |
| Mestre de Escola | 695 | 69.5% |
| Grão-Mestre | 43 | 4.3% |

**Por escola e estilo**

| Estilo | Vidas | Faixa média | Idade média | Consagrações |
|---|---:|---:|---:|---:|
| Punho da Respiração Serena | 56 | 3.71 | 70 | 0 |
| Escola da Lâmina Errante | 265 | 3.77 | 70 | 0 |
| Ofício dos Cem Remédios | 39 | 3.90 | 72 | 0 |
| Punho de Ferro | 62 | 3.66 | 69 | 0 |
| Olho que Lê o Combate | 50 | 3.62 | 69 | 0 |
| Formações das Quatro Pontes | 52 | 3.54 | 67 | 0 |
| Disciplina do Templo Silencioso | 41 | 3.88 | 71 | 0 |
| Mão das Agulhas Ocultas | 58 | 3.74 | 70 | 0 |
| Trilha do Caçador das Colinas | 55 | 3.60 | 70 | 0 |
| Método da Lua Oca | 322 | 3.69 | 69 | 0 |

**Linha do tempo de conquistas** (nº da vida em que cada uma foi liberada)

| Vida | Conquista |
|---:|---|
| 1 | Primeira Escola |
| 1 | Discípulo Reconhecido |
| 1 | Nome no Jianghu |
| 2 | Vigia das Estradas |
| 3 | Memória Longa |
| 3 | Portas Abertas |
| 5 | Método Compartilhado |
| 6 | Rota da Casa de Chá |
| 27 | Médico de Estrada |
| 32 | Olhos na Sombra |
| 109 | A Sentença de Hwayang |

Conquistas não obtidas: Vida Fora dos Portões, Lenda do Jianghu.

Aprimoramentos permanentes: Treino de força 5/5 · Estudo de técnicas 5/5 · Instinto de estrada 5/5 · Rotina disciplinada 6/6 · Economias de família 10/10 · Mais opções de origem 3/3 · Caderno de viagem 4/4. Pontos de Legado sobrando: 26215.

Ascensões por quartil de vidas (1º → 4º): 0 → 0 → 0 → 0

Uso de trilhas: Punho da Respiração Serena 56 · Escola da Lâmina Errante 265 · Ofício dos Cem Remédios 39 · Punho de Ferro 62 · Olho que Lê o Combate 50 · Formações das Quatro Pontes 52 · Disciplina do Templo Silencioso 41 · Mão das Agulhas Ocultas 58 · Trilha do Caçador das Colinas 55 · Método da Lua Oca 322

Origens usadas: 12/14 · Talentos usados: 13/14

**Eventos que dependem de desbloqueio** (ocorrências): .

**Impacto de artefatos** (faixa relativa = faixa/máximo, diferença para a média; há viés: quem vai longe acumula mais coisas)

Maiores: .
Menores: .

**Eventos vistos:** 35/36. Nunca vistos: murim_vida_comum.
Eventos raros/lendários menos frequentes: murim_heranca_final (19), murim_julgamento (98), murim_armazem (112), murim_rota_guardiao (196), murim_metodo_aberto (203), murim_escola_aberta (218), murim_estilos_errantes (271), murim_conselho (293).
Eventos mais repetidos (por vida): __retiro (2.2), murim_festival (1.8), murim_ponte_reparo (1.8), murim_dia_comum (1.7), murim_mercado (1.7), murim_refeicao (1.7), murim_ataque (1.7), murim_mestra (1.6).

## Observações
- A campanha Hwayang possui rotas de justiça, trégua, duelo, acordo e exílio; compare as frequências com a cobertura pretendida para escolhas humanas.
- As faixas mais altas são raras no bot. Ajuste o ritmo de treinamento e as chances de rompimento em conjunto para manter a progressão alcançável sem torná-la automática.
- O relatório usa um bot heurístico; distribuições descrevem esse comportamento e não substituem testes de jogo manual.
