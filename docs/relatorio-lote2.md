# Relatório do Lote 2 e das alcunhas

Branch `feat/dois-modos`. Lote 1 aprovado e mesclado em `main` (merge `eb13bc5`); Action "APK Android" terminou com sucesso, Release `android-latest` atualizada (build 46) e a nota diz **"Assinatura fixa"** (instala por cima).

## Dourado do Murim: último hash antes de mudar conteúdo

`npm run dourado`: **330 vidas idênticas, total `6270f71ec360628f`** (registrado antes da primeira mudança de conteúdo do Murim). A partir daqui o dourado é regenerado a cada mudança intencional, com a explicação abaixo.

| Regeneração do dourado | O que mudou |
|---|---|
| Alcunhas e perfil escrito à mão no Murim | Cada opção do Murim ganhou perfil (tabela `murim/perfil.ts`) e o motor passou a sortear cenas de alcunha (nascimento, mudança, mancha, reação). Hash final deste passo: `423f24d975a204c2` (`docs/dourado-murim.json`). |

## Ascensão do Xianxia
Fator da tribulação final 0,35 → 0,25: **0,8%** em 1000 vidas (`docs/variedade-xianxia.md`, robô do simulador). Meta: 0,5% a 2%.

## Alcunhas (1000 vidas por modo; `npm run alcunhas`)

| Métrica | Meta | Murim | Xianxia |
|---|---|---|---|
| Vidas que terminam com alguma alcunha | ≥ 70% | 96,2% | **65,5%** (aberto) |
| Maior parcela de uma só alcunha | ≤ 20% | 19,4% | 13,1% |
| Alcunhas nunca alcançadas como final | 0 | **1** (Testemunha de Hwayang) | **1** (Vulto Vermelho) |
| Variedade dentro da mesma trilha (1 − Σp²) | alta | 0,88 | 0,86 |
| Mudanças de alcunha por vida (entre as que nasceram) | — | 0,25 | 0,81 |
| Idade média do nascimento da 1ª alcunha | — | 30 | 46 |

Crônicas (3 por modo, geradas) em `docs/cronicas-alcunhas.md`; li o Murim e corrigi: artigo duplicado («a «a Cobradora»»), preposição sem contração («de o»), pronome fixo na história e particípio fixo em reação. O quadro da cena de nascimento é o mesmo para todas as alcunhas do modo (só a história muda): soa repetitivo e fica como aberto.

## O que ficou aberto (alcunhas e Lote 2)
- **Cenas de reação:** 1 por alcunha (meta: 3). O `validate` avisa. Os 3 por alcunha e as cenas «que só existem por causa dela» exigem mais ~96 cenas escritas.
- **Alcunhas raras que dão conquista:** não feito.
- **Xianxia:** 65,5% das vidas com alcunha (meta 70%) e Vulto Vermelho (trilha demoníaca) nunca alcançado pelos robôs; Murim: Testemunha de Hwayang (flag do fim da campanha) idem.
- **Lote 2 (talentos, defeitos, origens, trilhas):** não iniciado. As metas por traço continuam como em `docs/impacto-murim.md` e `docs/impacto-xianxia.md`.
- **Escolas do Murim (Lâmina Errante a 73%) e escolhas sem marca:** inalteradas.
