# Estado do projeto (ponto de entrada de qualquer sessão)

**Atualize este arquivo em todo commit que conclui um passo.** Histórico detalhado: `docs/relatorio-lote2.md` (alcunhas e Lote 2), `docs/modos.md` (plano e decisão da base), `docs/relatorio-noite.md` (Lote 1).

## Onde estamos
- Branch: `feat/dois-modos` (nada novo em `main`; `main` = `eb13bc5`, Lote 1 aprovado e publicado como APK, assinatura fixa).
- Último commit de conteúdo: B1 (alcunhas: feitos raros, conquistas, quadros, impacto). Antes: `6bc1c82` (talento Memória de escriba). Parte A em `b81cde1`.
- Lote atual: **Lote 2** (impacto real de trilhas, talentos, defeitos e origens) + pendências das alcunhas.
- Dourado do Murim (`docs/dourado-murim.json`): `10975324d7bb6588` (regenerar após cada mudança intencional do Murim).

## Feito recentemente
- **Xianxia, método próprio (IA semanal, 2026-11-20):** quem recusa mestre ("vou aprender sozinho") ou adia duas vezes ganha, a partir dos 30 anos, o molde `desp_metodo_proprio` (corpo, consciência, bestas ou formações, cada um com teste e custo). Vidas que terminavam sem trilha: 44,9% → 14,8%; maior trilha: Corpo 16,6% (1000 vidas do bot). Eco: `metodo_sem_linhagem` (lê `metodo_proprio`; pode render um discípulo) aparece em 22% das vidas.
- **Save (IA semanal, 2026-11-20):** `src/ui/save.ts` com `saveVersion` 2 e migração; vida quebrada descartada sem perder Legado; rede de segurança no render; `npm test` (`sim/save.ts`). Ver `DEVLOG_IA.md`.
- **B1 concluído:** Testemunha de Hwayang e Vulto Vermelho alcançáveis (`peso`; corrupção ≥ 15); Xianxia 71,2% com alcunha; quadro de nascimento por eixo; 8 conquistas das alcunhas raras; `impacto` conta finais por flag. Detalhes em `docs/alcunhas.md`.
- Lote 1: dois modos funcionando (pacotes, tela de escolha, `--modo`, motor v2 isolado no Xianxia).
- Alcunhas: 24 por modo, cenas de nascimento/mudança/mancha/reação, UI, `sim/alcunhas.ts`, crônicas.
- Talentos do Murim: 14 de 14 (Memória de escriba; Instinto oportuno, final `murim_andarilho`; Olho experiente, final `murim_olho_em_repouso`). Cada traço novo fica em `src/data/modos/murim/tracos/<id>.ts` (ver `tracos/index.ts`; use `Cond.noFlaw` para um defeito bloquear opção).
- Ascensão do Xianxia: **0,0%** com trilha (1000 vidas). Os 0,8% medidos antes vinham todos de vidas sem trilha que rompiam o topo da escada provisória `neutro` (bug corrigido em `pickNext`). Com trilha, só 2 em 1000 chegam ao reino 8: a curva alta precisa de decisão do autor.

## Próximos passos (em ordem)
1. **B2 concluído** Murim: talentos (14), defeitos (9) e escolas (maior: Punho de Ferro 16,9%; os 73% da Lâmina Errante eram viés do bot, corrigido em `sim/bot.ts`).
2. Pendência a) **corrigida** (IA semanal, 2026-11-20): molde `desp_caminho_sangue` (despertar.ts) oferece o Caminho do Sangue a quem está sem trilha e tem corrupção ≥ 10, karma ≤ −4, violência ≥ 5 ou a origem Rebento; 5,5% das vidas do bot (1000), ascensão real 0,0% (ver linha da tabela).
3. **B3** reações restantes das alcunhas (3 por alcunha, nos dois modos), revisar com `revisor-texto`.
4. **B4** Xianxia: talentos/defeitos/origens convertendo moldes dos lotes 26–28 de `899108c` (`auditor-conteudo` lista).
5. **B5** origens e trilhas nos dois modos.

## Metas por modo (linha atual; 1000 vidas, `--modo`)
| Meta | Murim | Xianxia |
|---|---|---|
| Alcunha na vida / maior parcela / nunca alcançadas | 95,7% / 22,2% / 0 | 71,2% / 12,3% / 0 |
| Ascensão (0,5–2%) | — | **0,0%** (os 0,8% antigos eram vidas sem trilha "ascendendo" por bug, corrigido em 2026-11-20) |
| Talentos/defeitos com mínimos | 23 de 23 | 0 de 23 (1–3 cenas cada) |
| Escolhas sem marca / flags órfãs | 26% / 48 | 142 de 541 / 3 |
| Escola mais comum (≤ 35%) | Punho de Ferro 16,9% | — |
| Genéricos < 35% / semelhança < 0,5 | 61% / 0,75 | 24,8% / 0,42 |

## Dúvidas pendentes para o autor
Nenhuma aberta; 3 decisões conservadoras do B1 em `docs/duvidas-lote2.md`. Decisões tomadas sozinho: `docs/duvidas-noite.md` (aprovadas); novas entram em `docs/duvidas-lote2.md`.

## Como retomar
`git switch feat/dois-modos`, ler este arquivo, rodar `npm run validate` e seguir o passo 1 acima.
