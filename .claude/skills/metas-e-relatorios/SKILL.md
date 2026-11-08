---
name: metas-e-relatorios
description: Use ao medir o jogo ou montar a tabela de antes e depois das metas. Significado de cada métrica, comandos com --modo, limiares das METAS e como relatar com honestidade.
---

# Metas e relatórios

## Comandos (todos aceitam `--modo murim|xianxia`; sem a flag rodam os dois; `--resumo` imprime só a tabela curta)
- `npm run variedade -- 1000` → `docs/variedade-<modo>.md`: turnos por vida, genéricos (%), semelhança entre vidas seguidas (Jaccard), finais.
- `npm run impacto -- 100` → `docs/impacto-<modo>.md`: escolhas sem marca, «tanto faz», consequência repetida, flags gravadas e nunca lidas, tabela por talento/defeito/origem (cenas próprias, opções exclusivas, caminhos), semelhança com mesma/diferente trilha. No Xianxia calcula sobre moldes (`sim/impacto-v2.ts`).
- `npm run poder -- 100` → `docs/poder-<modo>.md`: chance média por reino, contra ameaça inferior e do próprio nível; cenas específicas por reino.
- `npm run alcunhas -- 1000` → `docs/alcunhas-<modo>.md`; `npm run alcance -- 1500` → finais alcançáveis; `npm run sim -- 1000 --report` → `docs/balanceamento-<modo>.md`.
- `npm run dourado` (Murim): 330 vidas idênticas. Após mudança intencional: `-- --gravar` e registre o hash em `docs/relatorio-lote2.md`.

## METAS (verificar nos dois modos a cada lote)
- Escolhas sem marca: 0 · «tanto faz»: 0 · flags gravadas e nunca lidas: 0.
- Cada talento/defeito/origem com os mínimos (ver skill `talento-defeito-origem`).
- Semelhança entre vidas com mesma trilha e traços diferentes: bem menor que com os mesmos traços.
- Vidas seguidas: semelhança < 0,5; genéricos < 35% dos turnos.
- Finais: nenhum > 35% e nenhum em 0% (se não deve existir, remova ou mande para reserva).
- Poder: chance contra ameaça de nível inferior sobe com o reino; contra o próprio nível 40–60%.
- Xianxia: ascensão 0,5–2%. Murim: nenhuma escola > 35% das vidas.
- Alcunhas: ≥ 70% das vidas terminam com alcunha; nenhuma > 20%; todas alcançáveis; ≥ 3 reações escritas por alcunha.

## Como relatar
Tabela de antes e depois **por modo, com 1000 vidas, gerada pelo simulador** (agente `simulador`), nunca estimada. Diga por extenso o que não atingiu a meta; não declare o lote concluído com meta aberta sem avisar. Relatório de lote em `docs/relatorio-lote2.md`; estado corrente em `docs/estado.md` (só a linha atual).
