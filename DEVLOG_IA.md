# DEVLOG da IA (execução semanal automática)

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

## [2026-11-20] Execução semanal
- **Pilares:** Save, QA (primeira execução, sem DEVLOG anterior)
- **Entregas:**
  - `src/ui/save.ts`: `saveVersion` 2, migração de saves v0/v1, meta/configurações normalizadas campo a campo; texto ilegível copiado em `murim-quest-save-v1-corrompido` antes de sobrescrever; importar save usa a mesma leitura.
  - Vida com evento, final ou resultado inexistente é descartada ao carregar (o Legado fica); teste com bot (30 vidas por modo) garante que nenhum estado real é descartado.
  - Rede de segurança no `render()`: erro inesperado mostra aviso com "Encerrar esta vida" em vez de tela em branco (testado no Chromium a 360 px).
- **Descartado/falhou:** extras não feitos (passou de HORA_PARAR: o setup do ambiente demorou); **push bloqueado pelo ambiente (403)**: os 4 commits estão só no PC, falta `git push`.
- **Validação:** typecheck OK · lint (sem script) · test OK (`npm test`, novo) · build OK · validate/endings/dourado OK | **Commits:** 190369a 9acf06c 0e3aff3
- **Consumo:** ~60 chamadas de ferramenta · ~340 linhas alteradas
- **Próximo foco:** Gameplay e balanceamento, Narrativa e conteúdo
- **Para o Andre decidir:** criar um script `lint` (ex.: eslint) ou seguir só com `tsc`?
