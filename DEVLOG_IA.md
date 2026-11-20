# DEVLOG da IA (execução semanal automática)

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
