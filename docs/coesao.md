# Relatório de coesão da v2

Gerado por `npm run coesao -- 80`. **Números de apoio, não metas**: a decisão de qualidade é ler as crônicas em `docs/cronicas/`.

| Métrica | Valor |
|---|---|
| Vidas simuladas | 80 |
| Cenas por vida (média) | 65 |
| Fios abertos por vida | 5.7 |
| Fios resolvidos (com desfecho) | 49% dos abertos |
| Fios abandonados (o diretor os encerrou como esquecidos) | 18% |
| Vidas em que uma ambição foi forjada | 61% |
| Vidas com ambição cumprida | 23% |
| Reaparições por pessoa importante (média de cenas em que aparece) | 4.47 |
| Pessoas importantes que nunca reapareceram | 25% |
| Divergência entre vidas pareadas (cenas depois dos 20 anos que a outra vida não teve) | 29% |

## De onde vêm as cenas
- respiro: 24%
- personagem: 22%
- sistema: 14%
- perigo: 12%
- preparo: 10%
- consequencia: 10%
- virada: 6%
- climax: 3%

## Desfechos dos fios
- amigo:cumprido: 38
- cla:perdido: 23
- amigo:perdido: 22
- cla:perdoado: 15
- mestre:rompido: 12
- mestre:herdeiro: 11
- companheiro:recusado: 11
- seita:errante: 10
- companheiro:separados: 10
- rival:morto: 8
- rival:venceu: 7
- heranca:absorveu: 7
- mestre:morto: 7
- discipulo:recusado: 5
- seita:lider: 5
- amigo:quebrado: 5
- heranca:adiado: 4
- cla:vingado: 4
- discipulo:legado: 4
- mestre:independente: 4
- discipulo:morto: 3
- discipulo:fugiu: 3
- rival:reconciliado: 2
- heranca:libertou: 2
- heranca:vendeu: 2
- cla:reerguido: 1
- companheiro:unidos: 1
- rival:derrotado: 1

## Finais
- A Vida Que Ficou em Aberto: 18%
- O Velho Esquecido: 14%
- O Nome Que Sumiu na Chuva: 14%
- A Dívida Que Morreu Com o Passado: 11%
- Desvio de Qi: 8%
- Um Passo à Frente: 8%
- Morte em Combate: 6%
- A Voz Que Ficou: 4%
- O Ancião da Seita: 4%
- A Conta Fechada em Sangue: 4%
- A Sombra de Alguém Maior: 3%
- Ascensão: 3%
- O Nome Que Voltou a Valer: 1%
- A Mão Aberta: 1%
- A Noite Sem Lua: 1%
- Cinzas da Tribulação: 1%
- Dois no Mesmo Caminho: 1%

## Moldes nunca escolhidos nestas 80 vidas (7 de 98)
`rival_convite_amistoso`, `suc_herdeiro`, `dem_escolha`, `dem_epilogo`, `guerra_epilogo`, `orig_escolha`, `orig_epilogo`


## Antes e depois (v2 da Fase 2 → v2 depois do feedback)
| Métrica | Antes (40 vidas) | Depois (80 vidas) |
|---|---|---|
| Respiros | 38% das cenas | 24% |
| Fios abertos por vida | 5,0 | 5,7 |
| Fios esquecidos (abandonados) | 18% | 18% |
| Pessoas importantes que nunca reaparecem | 31% | 25% |
| Divergência entre vidas pareadas | 5% | 29% |
| Moldes nunca escolhidos | não medido | 7 de 98 |

Observações honestas:
- A **divergência mudou de método**. Antes, a escolha forçada era a da primeira cena da v2 (um respiro inofensivo, "Um Dia de Trabalho"), o que subestimava o efeito. Agora ela é forçada na primeira cena que abre um fio (a que de fato muda o rumo). Os 5% e os 29% **não são comparáveis diretamente**; com o novo método o valor de antes não foi medido.
- Os fios esquecidos ficaram em 18% (o README antigo dizia 18%, o relatório de 33% somava as pessoas de fios abandonados, outra conta). Esta medida conta fios, não pessoas.
- "Fios resolvidos" caiu de 67% para 49% porque agora há muitos mais fios (arcos novos e ciclos), e as vidas curtas deixam fios abertos.
- Finais: nenhum acima de 35% (o maior é "A Vida Que Ficou em Aberto"). A ascensão está em 3%, **acima** da faixa de 0,5% a 2% pedida para a Fase 3; ela entra na calibração da migração.
