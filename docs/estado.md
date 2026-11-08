# Estado do projeto (ponto de entrada de qualquer sessão)

**Atualize este arquivo em todo commit que conclui um passo.** Histórico detalhado: `docs/relatorio-lote2.md` (alcunhas e Lote 2), `docs/modos.md` (plano e decisão da base), `docs/relatorio-noite.md` (Lote 1).

## Onde estamos
- Branch: `feat/dois-modos` (nada novo em `main`; `main` = `eb13bc5`, Lote 1 aprovado e publicado como APK, assinatura fixa).
- Último commit de conteúdo: B1 (alcunhas: feitos raros, conquistas, quadros, impacto). Antes: `6bc1c82` (talento Memória de escriba). Parte A em `b81cde1`.
- Lote atual: **Lote 2** (impacto real de trilhas, talentos, defeitos e origens) + pendências das alcunhas.
- Dourado do Murim (`docs/dourado-murim.json`): `c2608081c5813833` (regenerar após cada mudança intencional do Murim).

## Feito recentemente
- **B1 concluído:** Testemunha de Hwayang e Vulto Vermelho alcançáveis (`peso`; corrupção ≥ 15); Xianxia 71,2% com alcunha; quadro de nascimento por eixo; 8 conquistas das alcunhas raras; `impacto` conta finais por flag. Detalhes em `docs/alcunhas.md`.
- Lote 1: dois modos funcionando (pacotes, tela de escolha, `--modo`, motor v2 isolado no Xianxia).
- Alcunhas: 24 por modo, cenas de nascimento/mudança/mancha/reação, UI, `sim/alcunhas.ts`, crônicas.
- Talentos do Murim: 3 de 14 (Memória de escriba; Instinto oportuno, final `murim_andarilho`; Olho experiente, final `murim_olho_em_repouso`). Cada traço novo fica em `src/data/modos/murim/tracos/<id>.ts` (ver `tracos/index.ts`; use `Cond.noFlaw` para um defeito bloquear opção).
- Ascensão do Xianxia: 0,8% (1000 vidas).

## Próximos passos (em ordem)
1. **B2 (em andamento)** Murim: faltam 11 talentos (corpo_resistente, carisma_nato, mestre_nato, coracao_inabalavel, olhar_dao, vida_longa, predestinado, passo_vazio, sangue_dragao, aprendiz_veloz, olfato_tesouro) e os 9 defeitos, um por vez, commit e push a cada um (skill talento-defeito-origem); depois nenhuma escola > 35%.
2. Pendência a): Caminho do Sangue no Xianxia nunca é alcançado nas simulações; investigar (robô ou condição do jogo) e registrar em `docs/duvidas-lote2.md`; se for bloqueio do jogo, corrigir no B4.
3. **B3** reações restantes das alcunhas (3 por alcunha, nos dois modos), revisar com `revisor-texto`.
4. **B4** Xianxia: talentos/defeitos/origens convertendo moldes dos lotes 26–28 de `899108c` (`auditor-conteudo` lista).
5. **B5** origens e trilhas nos dois modos.

## Metas por modo (linha atual; 1000 vidas, `--modo`)
| Meta | Murim | Xianxia |
|---|---|---|
| Alcunha na vida / maior parcela / nunca alcançadas | 95,7% / 22,2% / 0 | 71,2% / 12,3% / 0 |
| Ascensão (0,5–2%) | — | 0,8% |
| Talentos/defeitos com mínimos | 3 de 23 | 0 de 23 (1–3 cenas cada) |
| Escolhas sem marca / flags órfãs | 26% / 48 | 142 de 541 / 3 |
| Escola mais comum (≤ 35%) | Lâmina Errante 73% | — |
| Genéricos < 35% / semelhança < 0,5 | 61% / 0,75 | 24,8% / 0,42 |

## Dúvidas pendentes para o autor
Nenhuma aberta; 3 decisões conservadoras do B1 em `docs/duvidas-lote2.md`. Decisões tomadas sozinho: `docs/duvidas-noite.md` (aprovadas); novas entram em `docs/duvidas-lote2.md`.

## Como retomar
`git switch feat/dois-modos`, ler este arquivo, rodar `npm run validate` e seguir o passo 1 acima.
