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
| 3.3-3.5 | Save (modo ausente = Murim), tela de escolha de modo, Status, resumo, Legado por modo, `--modo` nas ferramentas, relatórios por modo, `e2e:layout` nos dois modos | `5f028fc`..`072365a` | feito |
| 4 | Abertura do Xianxia: O Sino Sem Badalo (3 moldes, aos 6, 12 e perto do fim) | último commit | feito; o 3º molde só aparece em parte das vidas (ver abertos) |

## Metas (antes e depois)

Preenchido quando os relatórios por modo estiverem gerados.

## O que ficou aberto

- **Uso esgotado durante a noite:** parei aqui. Não foram feitos o Lote 2 (talentos, defeitos, origens), o Lote 3 (poder), o 1B (arte) nem o Lote 4.
- Metas ainda abertas (medidas): Xianxia com ascensão 1,7% (ok) mas talentos/defeitos com 1 a 3 cenas próprias (mínimo 4); 142 de 541 escolhas sem marca; Murim sem mudança (0 eventos por talento/defeito, 7 de 17 finais em 0%, Lâmina Errante 73%).
- Xianxia: 5 finais da v2 ainda em 0% no robô; chance contra o próprio nível cai com o reino (Lote 3).
- `abertura_sino_fim` aparecia em 23/150 vidas; ampliei os capítulos onde ele pode sair, sem remedir.
- Relatórios `docs/*-xianxia.md` foram gerados com N pequeno (60 a 300 vidas) em momentos diferentes.
