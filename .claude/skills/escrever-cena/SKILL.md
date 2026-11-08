---
name: escrever-cena
description: Use ao escrever ou editar cenas do Murim Quest (evento do Murim, molde v2 do Xianxia, reação de alcunha, epílogo). Formato, marcadores, perfil escrito à mão, consequências válidas, regras anti-inflação e checklist antes do commit.
---

# Escrever cena

## Onde
- **Murim:** `src/data/modos/murim/eventos.ts` (`GameEvent`). Perfil de cada opção em `src/data/modos/murim/perfil.ts` (tabela por evento; índice = opção; letras C V A T M D O G, peso opcional: `'C2 D'`). Opção nova entra **no fim** da lista (não desloca o perfil) e ganha sua entrada na tabela.
- **Xianxia:** moldes em `src/data/modos/xianxia/v2/moldes/*.ts` (`molde({...})`, registre em `v2/index.ts`). Perfil vai em `fx.perfil` de cada resultado.
- **Alcunhas:** `src/data/modos/<modo>/alcunhas.ts` (reação = `reacao(id, titulo, texto, [[opção, resultado, fx], ...])`).

## Formato
- Murim: `{ id, title, rarity, once?, cooldown?, cond?, text, choices: [{ text, cond?, check?, res | ok+fail }] }`; `fx`: `fama, karma, pedras, stats, setFlags, clearFlags, agenda, item, perfil, morality…`. Opção exclusiva de traço: `cond: { talent|flaw|origin|path: [...] }` (sem `ex`). Final exclusivo: ver `finalDeVelhice` em `murim/index.ts` e `murim/endings.ts`.
- Molde v2: `id, titulo, tipo (respiro|preparo|perigo|climax|consequencia|personagem|virada), capitulos, unico?, papeis, quando, relevancia, fio?, cena (texto ou variantes com se/tom), opcoes[{ id, texto, requer?, seloBloqueio?, teste?, res|sucesso+falha }]`. Resultado: `{ texto, efeitos (mundo: opiniao, fato, fio, inclinar, noticia, q…), fx }`.
- Marcadores: `{nome} {alcunha} {rival} {mentor} {seita} {cla} {vila}`; v2 também `{papel.nome} {papel.ele} {papel.Ele} {jogador.o}` e `{vez2:...}` (segunda ocorrência). `{alcunha}` tem fallback no nome da pessoa; o motor contrai preposição («de» + «a Raposa» = «da Raposa»).

## Regras
1. **Toda opção muda algo que o jogo lê depois** (flag lida em outra cena/opção/final/resumo, aliado ou inimigo, item, evento agendado, final ou caminho). Flag gravada precisa ser lida; texto de resumo em `marcas_vida.ts` (`flag|frase`) conta como leitura.
2. **Proibido inflar:** nenhum texto de opção repetido em outras cenas; opção exclusiva nunca com a mesma consequência de outra do evento.
3. Opção que fecha ou força por defeito: `seloBloqueio` no v2; no Murim use `cond`.
4. O texto da opção **não promete o resultado do teste** («enfrentá-lo e, quando vencer…»).
5. Gênero: nada de pronome/adjetivo fixo para o jogador (use neutro ou marcador). Sempre haja uma opção sem condição.
6. Perfil só escrito à mão, coerente com o que a opção faz; `alignment` e `morality` separados.
7. Tom: Murim = estradas, escolas, Clã Gwon, Hwayang; Xianxia = seitas, Dao, reinos. Humor leve e tragédia podem misturar no Xianxia. Personagens recorrentes mantêm nome e aparência.

## Checklist antes do commit
`npm run validate` (dois modos) → `npm run fuzz -- 200` → `npm run endings -- 200` → `npm run build`. Se o Murim mudou: `npm run dourado -- --gravar` e explique em `docs/relatorio-lote2.md`. Peça ao agente `revisor-texto` para olhar as cenas novas. Atualize `docs/estado.md` no mesmo commit.
