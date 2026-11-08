# Relatório da noite (07/11/2026)

Atualizado a cada passo. Branch: `feat/dois-modos` (nada em `main`). Dúvidas e decisões sozinho: [duvidas-noite.md](duvidas-noite.md). Plano e decisão da base: [modos.md](modos.md).

## Como testar

```bash
git switch feat/dois-modos
npm install
npm run dev
```

Abra o endereço mostrado (porta 5173). Olhe primeiro: **Nova vida → escolha do modo → Iniciar vida**. Para conferir os dois modos pelo terminal: `npm run validate`, `npm run fuzz -- 300`, `npm run dourado` (deve dizer "330 vidas idênticas").

## Passo a passo

| # | O que | Commit | Estado |
|---|---|---|---|
| 1 | v2 preservada em `arquivo/v2-reestruturacao` (push confirmado, `4be4441`) | — | feito |
| 2 | Comparação das bases (A, B, C) e decisão: **C, motor v2 isolado no Xianxia** | `9bc4331` | feito |
| 3.0 | Dourado do Murim (330 vidas) | `sim/dourado.ts` | feito |
| 3.1-3.2 | Pacotes de modo; Murim movido para `modos/murim`; motor consulta o pacote | `5f028fc` | feito: dourado idêntico |
| 3.6-3.7 | Pacote Xianxia (v2 + dados de `899108c`) rodando no motor atual | `0fa9ff5` | feito: fuzz de 120 vidas sem problema |
| 3.3-3.5 | Save, tela de escolha de modo, Status, `--modo` nas ferramentas e relatórios | — | em andamento |

## Metas (antes e depois)

Preenchido quando os relatórios por modo estiverem gerados.

## O que ficou aberto

Preenchido ao fim.
