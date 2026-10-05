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
  type: 'narrative',              // opcional: 'narrative' | 'combat' | 'shop' | 'alchemy'
  allowGlobalTraits: true,        // opcional: permite moldes globais em narrativas fechadas
  cond: { ... },                  // opcional: condições para ser sorteado
  choices: [ ... ],               // 1 ou mais escolhas
}
```

Sorte (`sor`) aumenta o peso de eventos raros e lendários.
O catálogo final infere `type` quando omitido. Declare-o explicitamente em eventos de loja, alquimia ou combate sempre que o contexto não puder ser inferido com segurança. Opções de combate injetadas por moldes devem usar `requiresEventType: 'combat'`; a engine oculta essas opções fora do contexto permitido e também valida a escolha ao executá-la.

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
  requiresEventType: 'combat',    // opcional: contexto necessário para exibir a escolha
  custo: 20,                      // opcional: pedras gastas (desabilita se faltar)
  check: { stat: ['fis','esp'], dif: 1, tag: 'combate' },  // opcional: teste
  ok:   { text: '...', fx: { ... } },   // resultado do sucesso (com check)
  fail: { text: '...', fx: { ... } },   // resultado da falha (com check)
  res:  { text: '...', fx: { ... } },   // resultado sem teste
}
```

Eventos narrativos com escolhas próprias não recebem opções globais de traços/origens por padrão. Defina `allowGlobalTraits: true` no evento apenas quando quiser permitir explicitamente esses moldes.

### Testes (`check`)
- `stat`: um atributo ou uma lista (usa a média). Atributos: `fis esp comp sor car dao`.
- `dif`: dificuldade **relativa ao reino**. 0 = normal, +3/+4 = difícil, −2/−3 = fácil. (Dificuldade real = `8 + reino×6 + dif`.)
- `tag`: opcional. Técnicas e trilhas com a mesma tag dão bônus (`combate`, `espada`, `corpo`, `qi`, `alquimia`, `formacao`, `mente`, `fuga`, `social`, `demonio`...).
- Chance = `0,5 + (atributo + bônus − dificuldade) × 0,035 + ajuste de Sorte − ferimentos×0,03`, entre 5% e 95%. O jogador vê a chance no botão.
- Testes com `tag: 'combate'` usam um D20: modificador de atributo, equipamento, companheiros, trilha e facção contra uma CD. Chuva reduz Espírito; noite favorece inimigos furtivos e nevasca penaliza quem não usa proteção contra frio.

## Efeitos (`fx`)

| Chave | Efeito |
|---|---|
| `stats: { comp: 1, fis: -1 }` | muda atributos |
| `pedras`, `karma`, `fama` | soma/subtrai |
| `factionReputation` | altera reputação em `sword_sect`, `demon_cult` ou `merchant_guild` |
| `xp` | progresso de cultivo em % do reino. Calibrado para o reino 1; em reinos altos vale menos automaticamente |
| `vida` | anos de vida máxima (+/−) |
| `anos` | avança (ou recua, se negativo) a idade |
| `ferida` | ferimentos (6 = morte em combate) |
| `corr` | corrupção demoníaca (100 = vira demônio) |
| `tier: 1` | sobe de reino (use para despertares); `-1` desce |
| `setFlags`, `clearFlags` | marca/limpa flags |
| `item`, `removeItem` | ids de `src/data/items.ts`; itens equipáveis declaram `equipmentSlot` e `bonuses` |
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
- Equipamentos declaram `equipmentSlot` (`rightWeapon`, `leftWeapon`, `armor`, `accessory`) e bônus numéricos em `bonuses`. Os slots ocupados e a party são salvos como propriedades opcionais para preservar saves antigos.
- Conquistas: adicione em `ACHIEVEMENTS` e a regra em `ACH_CHECKS` (`endings.ts`). Use o id da conquista no campo `unlock` de uma origem, talento ou trilha.

## Balanceamento
`npm run sim -- 2000` simula 2.000 vidas com um bot e mostra mortes por idade, finais e reino máximo. Metas atuais: ascender é raro (cerca de 1%), mas possível; a maioria das vidas termina entre o 3º e o 5º reino.

## Trilha por eventos
O personagem não escolhe a trilha na criação. Depois do despertar, o motor só sorteia eventos com `noFlags: ["trilha_definida"]` até que uma escolha aplique o efeito `trilha: "<id>"` (ver `src/data/events/trilha_inicial.ts`). O efeito aplica os bônus de atributos e a técnica inicial da trilha e marca a flag `trilha_definida`. Para criar uma cena nova de primeiro método, copie uma das existentes e exija `...SEM_TRILHA` em `cond`. Antes de ter trilha, `path` vale "" e eventos com `cond.path` não aparecem.

## Combate visual (campo `combate`)

Qualquer teste com `tag: 'combate'` (ou qualquer teste de um evento com `combate`) gera um **roteiro de combate** (`src/engine/combate.ts`) guardado em `state.result.combate`. A interface (`src/ui/duelo.ts`) encena o roteiro como uma cena de 5 a 15 segundos; o **resultado já foi decidido pelo motor**, então o equilíbrio não muda.

```ts
{
  id: 'emboscada_x', title: '...', text: '...',
  combate: { oponente: 'bandido', cenario: 'selva' },   // opcional
  choices: [{ text: '...', check: { stat: ['fis'], tag: 'combate' }, ok: {...}, fail: {...} }],
}
```

- `oponente`: um dos 12 tipos de `src/data/combates.ts` (bandido, assassino, cultivador, monge, demonio, espectro, lobo, serpente, golem, tigre, dragao, raio). Sem o campo, o tipo vem da tabela `COMBATE_EVENTOS` e, depois, de palavras-chave no id/título/texto.
- `cenario`: um dos cenários de `src/ui/art/scenes.ts` (padrão: o do oponente).
- O roteiro tem 3 a 7 golpes (nomes de técnicas do jogador e do oponente, dano em %, crítico, desvio), vida final de cada lado e a frase de derrota do oponente. Vitória termina com golpe final do jogador; derrota, com o do oponente.
- A cena mostra HP, nome da técnica, números de dano, tremor de tela, botões **Pular** e **Acelerar x2**. O visual do jogador muda com a trilha (roupa, arma, cor do golpe, companheiro) e com o reino (anéis de aura, halo).
- Desligar: **Herança do Dao → Opções → Duelos animados**.
- Teste manual: `?duelo=bandido&trilha=espada&reino=3` (e `&derrota=1`) toca um duelo de exemplo. `npx tsx sim/lutas.ts 500` conta lutas por vida e por tipo.
