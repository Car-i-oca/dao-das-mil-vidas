# Como escrever eventos

Todo o conteúdo fica em `src/data/`. Eventos ficam em `src/data/events/*.ts` (cada arquivo exporta um array `GameEvent[]`; `index.ts` junta todos). Para criar um arquivo novo: exporte o array e adicione-o em `src/data/events/index.ts`.

Depois de escrever, rode `npm run sim` — o relatório lista eventos que nunca apareceram (condições impossíveis) e mostra se o balanceamento mudou.

## Estrutura de um evento

```ts
{
  id: 'caverna_heranca',          // único. Use snake_case.
  title: 'A Caverna Oculta',
  text: 'Texto exibido ao jogador. Aceita {nome} {rival} {mentor} {amigo} {noivo} {seita} {cla} {vila} {idade} {reino}.',
  rarity: 'raro',                 // 'comum' (peso 10) | 'raro' (2.5) | 'lendario' (0.5)
  weight: 1,                      // opcional: multiplica o peso da raridade
  once: true,                     // opcional: só acontece uma vez por vida
  cooldown: 15,                   // opcional: anos mínimos para repetir (padrão 15)
  cond: { ... },                  // opcional: condições para ser sorteado
  choices: [ ... ],               // 1 ou mais escolhas
}
```

Sorte (`sor`) aumenta o peso de eventos raros e lendários.

## Condições (`cond`)

Valem para eventos e para escolhas individuais. Todas as chaves são opcionais; todas precisam ser verdadeiras.

| Chave | Significado |
|---|---|
| `ageMin`, `ageMax` | idade |
| `tierMin`, `tierMax` | reino (0 = mortal; ver `src/data/realms.ts`) |
| `path`, `origin` | lista de ids de trilha / origem |
| `flags`, `noFlags` | flags exigidas / proibidas |
| `stat` | `{ comp: 15 }` = atributo efetivo mínimo |
| `pedrasMin`, `fameMin`, `karmaMin`, `karmaMax`, `corrMin` | recursos |
| `local` | `'vilarejo' \| 'cidade' \| 'seita' \| 'selva' \| 'montanha' \| 'ruinas'` |
| `faction` | `'seita' \| 'demoniaca' \| 'cla' \| 'errante' \| 'nenhuma'` |
| `item`, `tecnica` | possuir o item / a técnica |

## Escolhas

```ts
{
  text: 'Enfrentar a fera.',
  cond: { ... },                  // opcional: esconde a escolha se falsa
  custo: 20,                      // opcional: pedras gastas (desabilita se faltar)
  check: { stat: ['fis','esp'], dif: 1, tag: 'combate' },  // opcional: teste
  ok:   { text: '...', fx: { ... } },   // resultado do sucesso (com check)
  fail: { text: '...', fx: { ... } },   // resultado da falha (com check)
  res:  { text: '...', fx: { ... } },   // resultado sem teste
}
```

### Testes (`check`)
- `stat`: um atributo ou uma lista (usa a média). Atributos: `fis esp comp sor car dao`.
- `dif`: dificuldade **relativa ao reino**. 0 = normal, +3/+4 = difícil, −2/−3 = fácil. (Dificuldade real = `8 + reino×6 + dif`.)
- `tag`: opcional. Técnicas e trilhas com a mesma tag dão bônus (`combate`, `espada`, `corpo`, `qi`, `alquimia`, `formacao`, `mente`, `fuga`, `social`, `demonio`...).
- Chance = `0,5 + (atributo + bônus − dificuldade) × 0,035 + ajuste de Sorte − ferimentos×0,03`, entre 5% e 95%. O jogador vê a chance no botão.

## Efeitos (`fx`)

| Chave | Efeito |
|---|---|
| `stats: { comp: 1, fis: -1 }` | muda atributos |
| `pedras`, `karma`, `fama` | soma/subtrai |
| `xp` | progresso de cultivo em % do reino. Calibrado para o reino 1; em reinos altos vale menos automaticamente |
| `vida` | anos de vida máxima (+/−) |
| `anos` | avança (ou recua, se negativo) a idade |
| `ferida` | ferimentos (6 = morte em combate) |
| `corr` | corrupção demoníaca (100 = vira demônio) |
| `tier: 1` | sobe de reino (use para despertares); `-1` desce |
| `setFlags`, `clearFlags` | marca/limpa flags |
| `item`, `removeItem` | ids de `src/data/items.ts` |
| `tecnica` | ids de `src/data/techniques.ts` |
| `agenda: [{ event: 'id', em: [10, 30] }]` | agenda um evento daqui a 10–30 anos (cadeias!) |
| `local`, `faccao` | muda o lugar / a facção |
| `fim: 'id'` | termina a vida com o final `id` (`src/data/endings.ts`) |

## Cadeias de eventos
1. Evento A marca uma flag e/ou agenda o evento B (`agenda`).
2. Evento B exige a flag em `cond.flags` e normalmente é `once: true`.
3. Eventos agendados disparam assim que a idade chega, mesmo se a `cond` do evento não bater por acaso.

Exemplo real: `rival_aparece_crianca` → `rival_reaparece` → `rival_vinganca_final`.

## Outros arquivos de dados
- `realms.ts`: escadas de reinos (vida, anos para encher a barra, chance de rompimento, tribulação).
- `paths.ts`: trilhas jogáveis. `items.ts`, `techniques.ts`, `endings.ts` (finais, conquistas, upgrades de Herança), `character.ts` (origens, talentos, defeitos), `names.ts` (nomes e raízes).
- Itens com `breakBonus: { tier, bonus }` aparecem como opção no rompimento para aquele reino.
- Conquistas: adicione em `ACHIEVEMENTS` e a regra em `ACH_CHECKS` (`endings.ts`). Use o id da conquista no campo `unlock` de uma origem, talento ou trilha.

## Balanceamento
`npm run sim -- 2000` simula 2.000 vidas com um bot e mostra mortes por idade, finais e reino máximo. Metas atuais: ascender é raro (cerca de 1%), mas possível; a maioria das vidas termina entre o 3º e o 5º reino.
