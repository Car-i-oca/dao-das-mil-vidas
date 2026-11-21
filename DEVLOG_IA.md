# DEVLOG da IA (execução semanal automática)

## [2026-11-20] Execução semanal (3ª do dia, limites ×3; retomada após queda da conexão)
- **Pilares:** UI/UX e game feel, Arquitetura e performance
- **Entregas:**
  - Painel da história acompanha o texto enquanto digita e mostra «⌄ continua» quando há texto abaixo da dobra.
  - Celular baixo (≤ 700 px): história ganha espaço da arte; selo de clima/dia com fundo próprio, legível sobre céu claro.
  - Alvos de toque de 44 px (equipamento, loja, inventário, galeria; área ampliada no Diário e «Como jogar») + teste `npm run e2e:toque` (falha na versão antiga, passa em 320/360/390/430 px).
  - Gravação do save saiu do `main.ts` para `save.ts` (Storage injetável, 3 testes novos); aparelho que recusa gravar agora avisa uma vez.
  - Cena (`view`) montada uma vez por render em vez de duas.
  - Xianxia mais fácil no topo (aprovado pelo Andre): anos dos reinos 5–8 reduzidos, rompimento 0,27–0,38, última tribulação ×0,8 → reino 8 em 3,4% das vidas, ascensão 0% → 0,9% (1000 vidas; mortes por tribulação 6,5% → 10,2%).
- **Descartado/falhou:** conexão com o PC caiu no meio (~10 min); `git push` bloqueado de novo pelo ambiente (403): 26 commits só no PC.
- **Validação:** typecheck OK · lint (sem script) · test OK (12/12) · build OK · validate/endings/dourado OK · e2e:toque OK (Chromium no container) | **Commits:** 15eefe0 8af3fdd 1976e2a 1282001 e50d0ec 1ddaee4 + balance xianxia
- **Consumo:** ~115 chamadas de ferramenta · 256 linhas alteradas
- **Próximo foco:** Save e dados, QA e estabilidade
- **Para o Andre decidir:** Caminho do Sangue sem exigir a conquista «Sombra Escolhida»: manter? (curva do Xianxia resolvida)

## [2026-11-20] Execução semanal (2ª do dia, limites ×3 a pedido do Andre)
- **Pilares:** Gameplay e balanceamento, Narrativa e conteúdo
- **Entregas:**
  - Bot do simulador sorteia empates de chance: os 73% da Lâmina Errante eram viés do bot; maior escola do Murim agora 16,9% (B2 fechado).
  - **Bug:** no Xianxia, vida sem trilha "rompia" o topo da escada provisória e virava Ascensão; os 0,8% de ascensão eram só isso. Corrigido + teste; ascensão real com trilha = 0,0%.
  - Caminho do Sangue alcançável (`desp_caminho_sangue`, 2,1% das vidas) e Método Próprio para quem recusa mestre: vidas sem trilha 44,9% → 14,8%; eco `metodo_sem_linhagem` (pode render discípulo); opção do Rebento no ritual.
  - 30 reações de alcunha novas (20 Xianxia, 10 Murim; B3); concordância de gênero (senhor/senhora, adjetivos) e anacronismo "padre" corrigidos.
- **Descartado/falhou:** `git push` bloqueado de novo pelo ambiente (403): 17 commits só no PC. Uma série de commits entrou com CRLF e foi corrigida no commit c7491c7.
- **Validação:** typecheck OK · lint (sem script) · test OK (9/9) · build OK · validate/endings/fuzz/dourado OK | **Commits:** 1c505c8 efc10d1 8eaf302 68429c3 897ab82 6c5fca6 b791c1b 5c15a24 11fd621 c7491c7 2c9edff cd6cd1b 2364752
- **Consumo:** ~190 chamadas de ferramenta · 1154 linhas (350 escritas à mão; o resto é dourado e relatórios gerados)
- **Próximo foco:** UI/UX, Arquitetura e performance
- **Para o Andre decidir:** (1) curva alta do Xianxia: com trilha só 2 em 1000 vidas chegam ao reino 8, ascensão 0%; quer que a IA reequilibre (anos/longevidade/rompimento) para 0,5–2%? (2) Caminho do Sangue por karma/violência sem exigir a conquista «Sombra Escolhida»: manter?
