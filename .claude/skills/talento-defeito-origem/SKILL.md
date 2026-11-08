---
name: talento-defeito-origem
description: Use ao escrever o conteúdo de um talento, defeito, origem ou trilha. Mínimos exigidos, roteiro para escrever um por vez e como ligar alcunha, perfil e final.
---

# Talento, defeito, origem e trilha

## Mínimos (por item, em cada modo)
- **Talento:** ≥ 4 cenas próprias (`cond.talent` / `quando.jogador.talento`), ≥ 6 opções exclusivas em cenas comuns (cada uma escrita para a cena), ≥ 1 caminho ou final que só ele abre.
- **Defeito:** ≥ 4 cenas próprias, opções que ele **força ou bloqueia** (`seloBloqueio` no v2), e um **arco de redenção**: uma escolha difícil que o supera (`fx.superar: true`).
- **Origem:** ≥ 5 cenas próprias, ≥ 4 opções exclusivas; contatos, inimigos, recursos e obrigações que **voltam** ao longo da vida; ≥ 1 caminho ou final exclusivo.
- **Trilha/escola:** opções exclusivas nas cenas comuns mais frequentes e em todos os combates (com selo do motivo); conteúdo da própria trilha em ≥ 25% dos turnos depois de definida. Murim: nenhuma escola > 35% das vidas.
- Nada de molde injetado por categoria e nenhuma frase repetida: ver skill `escrever-cena`.

## Roteiro (um por vez, com commit a cada um)
1. Defina o **conceito** do traço em 2 linhas (o que ele muda na vida, não só em número) e a **cicatriz**: que escolha difícil ele cria.
2. Escreva as cenas próprias em sequência (idade crescente), cada uma lendo uma flag da anterior.
3. Escreva as opções exclusivas **no fim** das cenas comuns existentes (Murim) ou como `requer` (v2), com perfil à mão.
4. Final/caminho exclusivo: flag que `finalDeVelhice` lê (Murim) ou desfecho de fio (v2) + texto de final próprio; `marcas_vida` para as flags.
5. Se fizer sentido, **uma reação de alcunha** ligada ao traço.
6. `validate`, `fuzz`, `endings`, `build`; dourado (Murim); `revisor-texto`; `impacto` do traço (linha da tabela); `docs/estado.md`; commit.

## Referência
Modelo completo: talento Memória de escriba (`memoria_perfeita`) em `src/data/modos/murim/eventos.ts` (`mem_*`) e `murim_arquivista`. A ferramenta `impacto` mostra a linha de cada traço.
