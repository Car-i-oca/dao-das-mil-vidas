# Crônicas da v2 (vidas inteiras)

Sete vidas completas de builds diferentes, geradas por `npx tsx sim/cronica2.ts <semente>` (sem limite de cenas). O bot escolhe sem estratégia, então estas crônicas mostram o que o sistema produz, não o melhor jogo possível. As sementes 9, 30, 3, 6 e 24 são as da rodada anterior; **12 e 17 são novas**. As vidas mudaram porque o conteúdo e o diretor mudaram (a mesma semente já não conta a mesma história).

| Semente | Build | Como termina |
|---|---|---|
| 9 | Venenos, órfão acolhido pela seita, Aprendiz Veloz | vida longa: rival com segundo ciclo, guerra de seitas, discípulo |
| 30 | sem trilha, filho de guarda, Coração Covarde | vida curta, morre ainda no Despertar |
| 3 | Sopro, pescador, Memória Perfeita | vida de mais de 240 anos: herança do anel, companheira, discípulo, novo rival |
| 6 | Consciência, filho de guarda, Orgulho Ferido | vida longa |
| 24 | sem trilha, herdeiro de clã decadente | vida curta (Despertar) |
| 12 | Corpo, herdeiro de clã decadente | vida média |
| 17 | Corpo, Favorecido pelo Destino | vida longa |

## Leitura crítica (o que ainda aparece)
Li as crônicas 9 e 3 inteiras e passei verificações automáticas nas sete (títulos repetidos, chaves soltas, pronomes). O que funciona: a infância já aponta o que vem depois (a ferida, o culpado, o visitante de casaco bom), os fios têm começo e fim, os nomes reaparecem, o rival muda de situação (expulso → volta vingativo), as vidas longas não ficam mais vazias (novo rival, discípulo, guerra, companheiro, herança) e o texto muda com a opinião em alguns encontros.

O que ainda falha, e eu **não** corrigi:
1. **Ciclos repetem a trama.** O segundo rival, o segundo amigo etc. usam as mesmas cenas, com um prefixo que reconhece a repetição ("A rivalidade ganhou outro rosto"). "A Prova Diante de Todos" para um cultivador de Núcleo Dourado ainda fala em "novato". Pede cenas próprias de meia-idade (Fase 3).
2. **Resultado por opinião é raro.** Só a estalagem, o reencontro e a volta do rival caído mudam o resultado conforme a opinião; a maioria dos moldes ainda mostra o mesmo resultado para qualquer opinião.
3. **Ordem dentro do arco do discípulo:** "O Método de Ensinar" às vezes vem depois de "O Erro de {discípulo}".
4. **Cenas de sistema em excesso** nas vidas muito longas: Gargalo e Reclusão aparecem de 5 a 9 vezes numa vida.
5. **Órfãos:** a infância e o clã já respeitam a origem, mas a cena "Uma Visita a {tutor}" ainda fala em "casa" e "cadeira vazia que já foi sua".
6. **Respiros** ainda são cerca de 24% das cenas.
7. **Arco de Segredo de Origem** só abre para alguns builds (origens ou talentos com segredo); em 80 vidas ele não apareceu até eu ampliar a porta de entrada (ver `docs/coesao.md`).
8. **Morte cedo por sistema** (Desvio de Qi, Morte em Combate) ainda encerra cerca de 18% das vidas antes do meio.
