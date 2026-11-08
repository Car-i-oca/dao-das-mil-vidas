# Murim Quest — dois modos de jogo (Lote 0: plano)

Estado: **aguardando aprovação**. Nada do jogo foi alterado; este arquivo é a única mudança da branch `feat/dois-modos`.

Os números abaixo vêm de duas fontes: `git show 899108c:<arquivo>` (contagens de arquivos, tipos e motor) e uma auditoria por script sobre os 877 eventos escritos à mão em `899108c` (extraídos com `git archive` e carregados com `tsx`). A auditoria é **mecânica**: ela vê marcas, textos repetidos e dependências, mas não julga a qualidade da prosa. Cada arquivo ainda será lido por mim durante o Lote 1.

---

## 0. O que preciso de você (todas têm um padrão; se não responder, sigo o padrão)

| # | Decisão | Padrão que vou seguir |
|---|---|---|
| D1 | O **perfil de conduta** do Xianxia antigo (compaixão, violência, astúcia... e as alcunhas) volta? | **Não.** Ele era colado por regex em toda escolha (ver 1.3). Os 7 finais `velhice_*` que dependiam dele passam a ler flags, karma, fama e atributos reais. |
| D2 | Os **moldes** (opções de talento, defeito, origem e raiz injetadas por categoria) voltam? | **Não como injeção.** Os 129 textos viram opções escritas evento a evento no Lote 2. |
| D3 | Escada de reinos no Xianxia | **Uma só** (Refinamento de Qi até Grande Ascensão) para as 10 trilhas. Hoje, em `899108c`, quatro trilhas (Espada, Corpo, Mérito, Venenos) usavam a escada "Terceira Classe..."; no Xianxia elas passam para a cultivação. |
| D4 | Conquistas | O Murim mantém os 13 ids `ach_*` que já usa. As do Xianxia ganham prefixo `xx_` (28 conquistas) para não colidir com os saves atuais. Legado, melhorias e códice são compartilhados. |
| D5 | Save da versão antiga (chave `dao-mil-vidas-save-v1`) | **Não importar.** A chave atual `murim-quest-save-v1` já não lia essa. Posso importar só o Legado e as conquistas dele, se você quiser. |
| D6 | Branch e APK | Estou em `feat/dois-modos`. O APK só sai com push em `main` (ou `gh workflow run android.yml --ref feat/dois-modos`, que sobrescreveria a Release de teste). Padrão: trabalho na branch e **você aprova o merge em `main` ao fim de cada lote**, que então gera o APK. |
| D7 | Arte do conteúdo restaurado | Sub-lote próprio **1B**, depois da parte mecânica do Lote 1, com revisão visual PNG por PNG (ver seção 6). |
| D8 | Contratos/guildas e eras do mundo | **Voltam só no Xianxia**, como recursos ligados por flag do pacote. O Murim não os usa. |

---

## 1. Inventário de `899108c`

### 1.1 Números gerais

| Item | `899108c` | HEAD (`8a99d7a`, Murim) |
|---|---|---|
| Eventos no catálogo base (escritos à mão) | **877** em 44 arquivos | 36 em 1 arquivo (`events/index.ts`) |
| Escolhas escritas à mão | 2.067 | ~115 |
| Escolhas no catálogo **final** (depois de moldes) | **12.723** | ~115 |
| Itens | 112 | 21 |
| Entradas com `id` em `endings.ts` (finais, conquistas, melhorias) | 72, mais 45 em `endings_tracos.ts` | 37 |
| Trilhas / origens / talentos / defeitos | 10 / 14 / 14 / 9 | 10 / 14 / 14 / 9 (mesmos ids, textos do Murim) |
| Escadas de reino | `neutro` (2), `xianxia` (9), `murim` (8) | só `murim` (8 faixas) |
| Combates (`combates.ts`) | 15 | 15 (textos alterados) |
| Arte (`src/ui/art/**`) | idêntica ao HEAD (`git diff --stat` vazio) | — |

Observação: 12 dos 877 eventos (`bioma_*_fera` e `bioma_*_coleta`, seis biomas) são gerados em código por um modelo único e não aparecem como literais em nenhum arquivo. Como são o mesmo texto com o bioma trocado, entram em "descartar/reescrever" até serem reescritos um a um.

### 1.2 Eventos por arquivo e triagem mecânica

Colunas: **restaurar** = nenhuma pendência detectada; **corrigir** = tem pendência mecânica (ver 1.3); **descartar/reescrever** = "tanto faz" ou texto colado em excesso.

| Arquivo | Eventos | Restaurar | Corrigir | Descartar/ reescrever |
|---|---:|---:|---:|---:|
| infancia | 20 | 12 | 5 | 3 |
| juventude | 8 | 0 | 3 | 5 |
| seita | 18 | 7 | 9 | 2 |
| aventura | 14 | 4 | 6 | 4 |
| cidade | 15 | 4 | 6 | 5 |
| cultivo | 24 | 7 | 5 | 12 |
| lenda | 19 | 8 | 8 | 3 |
| trilhas | 17 | 7 | 6 | 4 |
| mundo | 16 | 3 | 11 | 2 |
| alto | 14 | 5 | 8 | 1 |
| trilha_inicial | 7 | 1 | 6 | 0 |
| alquimia, biomas, mercador | 3 | 0 | 3 | 0 |
| missoes_torneios | 4 | 0 | 3 | 1 |
| saga_ferro | 4 | 3 | 1 | 0 |
| lote1_seita | 29 | 6 | 17 | 6 |
| lote2_reinos | 23 | 8 | 10 | 5 |
| lote3_alquimia | 24 | 8 | 14 | 2 |
| lote4_mundo | 26 | 9 | 11 | 6 |
| lote5_sangue | 24 | 12 | 11 | 1 |
| lote6_oeste | 22 | 8 | 10 | 4 |
| lote7_ceu | 20 | 5 | 11 | 4 |
| lote8_juventude | 24 | 1 | 15 | 8 |
| lote9_trilhas | 33 | 12 | 9 | 12 |
| lote10_regioes | 17 | 3 | 10 | 4 |
| lote11_ecos | 6 | 1 | 2 | 3 |
| lote12_torneio | 8 | 5 | 2 | 1 |
| lote13_mundo (todos dependem de eras) | 39 | 0 | 35 | 4 |
| lote14_poder | 16 | 8 | 5 | 3 |
| lote15_reinos_3_4 | 25 | 3 | 18 | 4 |
| lote16_reinos_5_6 | 23 | 5 | 13 | 5 |
| lote17_reinos_7_8 | 16 | 5 | 9 | 2 |
| lote18_reinos_1_2 | 13 | 1 | 4 | 8 |
| lote20_tribulacao | 1 | 0 | 1 | 0 |
| lote21_origens_a | 35 | 1 | 29 | 5 |
| lote22_origens_b | 34 | 3 | 27 | 4 |
| lote23_npcs | 30 | 22 | 8 | 0 |
| lote24_jianghu | 13 | 1 | 11 | 1 |
| lote25_mitologia | 12 | 0 | 11 | 1 |
| lote26_talentos | 56 | 37 | 19 | 0 |
| lote27_defeitos | 45 | 35 | 10 | 0 |
| lote28_origens | 42 | 32 | 10 | 0 |
| lote29_corpo_raiz | 26 | 21 | 5 | 0 |
| gerados em código (`bioma_*`) | 12 | 0 | 0 | 12 |
| **Total** | **877** | **313** | **417** | **147** |

### 1.3 Por que o catálogo antigo "parecia" ter 12.723 escolhas e 3 mecanismos de inflação

O catálogo final de `899108c` não é o que foi escrito. `events/index.ts` passava os eventos por três transformações:

1. **Moldes** (`aplicarMoldes`, `src/data/opcoes.ts`): 129 opções (42 de talentos, 27 de defeitos, 28 de origens, 32 de corpo/raiz) eram **copiadas para todo evento cuja categoria combinasse com uma regex** (`combate`, `social`, `perigo`, `tesouro`, `cultivo`, `viagem`). Resultado: **10.656 das 12.723 escolhas (84%)** eram a mesma frase repetida. Só **29 opções exclusivas** foram escritas dentro de um evento. É exatamente o que a sua regra "não cole o mesmo texto genérico de opção em vários eventos" proíbe.
2. **Perfil de conduta** (`marcarEscolhas`, `src/data/marcas.ts`): toda escolha sem marca recebia `+1` numa "virtude" decidida por regex sobre o texto da opção ("ajud..." vira compaixão, "fug..." vira cautela). Isso fazia a escolha *contar* como marca sem deixar nada que o jogo lesse. Só 2 escolhas escritas à mão usam `perfil` de verdade.
3. **Registro** (`registrarSoPerfil`): eventos cujas opções só deixavam perfil ganhavam uma flag `reg_<evento>_<n>` só para aparecer no epílogo.

Auditoria sobre os 877 eventos escritos à mão, **sem** esses três mecanismos:

| Pendência detectada | Eventos |
|---|---:|
| Pelo menos uma escolha sem marca real (nenhuma flag, agenda, item, local, facção, final, trilha ou efeito grande) | 538 |
| "Tanto faz" (nenhuma escolha deixa marca, ou todas as opções têm a mesma consequência) | 135 |
| Opção com texto idêntico ao de outros 3 ou mais eventos | 20 |
| Resultado com texto idêntico ao de outros 2 ou mais eventos | 12 |
| Depende de sistema removido (`cond.mundo` = eras: 39; `fx.reputation` de contratos/torneios: 3; `fx.perfil`: 2) | 44 |
| Nenhuma opção sem condição (risco de ficar sem saída) | 4 |
| Válidos para 6 ou mais reinos (o problema do `sensacaodepoder.md`) | 403 (46%) |

Limite da auditoria: ela **não** mede flags gravadas e nunca lidas (isso exige o `impacto` rodando sobre o pacote restaurado, passo 1.8) nem repetição de tema entre eventos.

### 1.4 Sistemas que existiam em `899108c` e o estado de cada um hoje

| Sistema | Onde estava | Hoje no HEAD | Decisão |
|---|---|---|---|
| Escada de reinos (Mortal, Refinamento de Qi... Grande Ascensão) e `lifespan` por reino | `data/realms.ts`, `Realm.lifespan` | Removidos; `maxAge = 75 × lifeMult` | Voltam no pacote Xianxia (`Realm.lifespan` opcional) |
| Longevidade (`maxAge` sobe ao romper) | `tierUp`, `setPath`, `startLife` | Removida | Volta, ligada por `regras.longevidade` |
| Tribulação | `lote20_tribulacao.ts`, `TRIB_FLAGS`, `tribulationChance` | **Motor ainda tem** `TRIB_FLAGS` e `tribulationChance`; o evento de preparo foi removido | Restaurar o evento no Xianxia |
| Reclusão (`P_RETIRO`) e `apparentStage` | motor | **Ainda existem** | Compartilhados |
| Eras do mundo (guerra de seitas, maré de bestas, reino secreto, praga...) | `data/mundo.ts`, `lote13_mundo.ts` (39 eventos), `updateWorld`, `cond.mundo`, `State.world` | Removidas | Voltam no Xianxia (D8). Finais de perigo da era (`guerra`, `feras`, `doenca`) vêm junto |
| Contratos e guildas | `data/quests.ts` (3 contratos), `joinGuild`, `factionReputation`, `State.guild/reputation` | Removidos | Voltam no Xianxia (D8) |
| Perfil de conduta, virtudes, alcunhas | `data/marcas.ts`, `virtudeDominante`, `oldAgeEnding` | Removidos | **Não voltam** (D1) |
| Variantes de texto | `data/variantes.ts` (alt de eventos repetidos) | Removidas | Voltam; o motor já aceita `alt` |
| Tetos de reino | `data/faixas.ts` (`TETOS`, ~55 eventos com `tierMax`) | Removidos | Voltam como `tierMax` escrito no próprio evento (não como tabela externa) |
| Marcas de vida | `data/marcas_vida.ts` (36 KB) | 36,7 KB, **textos do Murim e do Xianxia misturados** | Separado por modo (seção 3) |
| Saga da Forja Silenciosa | `saga_ferro.ts` (4 eventos) | O Murim tem a saga do Livro de Ferro, outra | Restaurar a antiga no Xianxia, com ids não colidentes |
| Finais de traços | `endings_tracos.ts` (45) | Removido | Reavaliar um a um (ver seção 4) |
| Moldes de opções | `opcoes.ts` (`aplicarMoldes`) + `moldes*` | `opcoes.ts` só tem `categorias()` | **Não voltam** (D2) |

---

## 2. O que mudou no motor e em `src/types.ts` desde `899108c`

Estas diferenças impedem copiar os arquivos antigos de volta:

**Tipos (`src/types.ts`)**
- Removidos: `QuestObjective(Kind)`, `QuestDefinition`, `GuildFaction`, `Effects.reputation/factionReputation/perfil`, `Cond.noActiveQuest/perfil/perfilMax/mundo`, `Choice.questAction`, `Realm.lifespan`, `State.activeQuest/reputation/factionReputation/guild/perfil/world/nextWorldAt/lastWorld`; `UiNotification.kind` perdeu `'quest'` e ganhou `'info'`.
- Acrescentado: `Cond.flagsAny`.
- Nenhum tipo tem `modo`.

**Motor (`src/engine/engine.ts`)** — o HEAD tem constantes globais (`PATH`, `ORIGIN`, `TALENT`, `FLAW`, `ITEM`, `ENDING`, `EVENT`, `LADDERS`, `MARCAS_VIDA`, `STAT_NAMES`, `GENERIC_IDS`) montadas no carregamento do módulo. Dois pacotes de conteúdo exigem que essas consultas dependam do modo da vida.
- `checkDifficulty`: `8 + tier × 6` antes, `8 + tier × 2.5` agora. O Murim precisa continuar com 2.5; o Xianxia volta com 6 até o Lote 3 refazer a curva.
- `startLife`: antes sorteava o primeiro evento; agora fixa `murim_ferro_inicio`.
- Fallbacks: `dia_comum` e `vida_comum` viraram `murim_dia_comum` e `murim_vida_comum` (fixos).
- `oldAgeEnding`: reescrito com as flags do Murim (`final_justica`, `fundou_escola`...).
- `setPath`: a trilha `demoniaca` deixou de definir `alignment = 'demoniaco'` e facção demoníaca.
- Rompimento (`doBreakthroughCore`), `view` (Gargalo), `diffSnap`, notificações e `tradeItem`: textos de cultivo trocados por textos marciais (moeda em vez de pedra espiritual, "graduação", "faixa").
- `STAT_NAMES`: Espírito/Compreensão/Sorte/Coração do Dao viraram Percepção/Técnica/Instinto/Vontade. Moralidade: Bom/Mau/Ordem/Caos viraram Honra/Astúcia/Lealdade/Ambição (no `diffSnap`).
- `Cat`: `'cultivo'` virou `'treino'` (afinidades e `opcoes.ts`).
- `pickNext`: eventos agendados agora respeitam `condMet` (correção que serve aos dois modos). `isGeneric` considera `flagsAny`.
- `ACH_POINTS` mudou de arquivo (`endings.ts`).
- Removidos: `joinGuild`, `acceptQuest`, `abandonQuest`, `updateQuest`, `updateWorld`, `virtudeDominante`, bônus e emboscada de guilda.

**Interface e dados**
- Chave do save mudou de `dao-mil-vidas-save-v1` para `murim-quest-save-v1` (sem migração).
- `main.ts`: sem `acceptQuest/abandonQuest/joinGuild/factionReputation/virtudeDominante`; `realmIcon(ladder, ...)` já distingue `murim` de outro valor, então o Xianxia usa o ramo que já existe.
- `character.ts`, `paths.ts`, `items.ts`, `endings.ts`, `realms.ts`, `retiros.ts`, `combates.ts`, `companions.ts`, `afinidades.ts`, `names.ts`: textos trocados, mesmos ids de trilha/origem/talento/defeito.

---

## 3. Como os dois modos convivem no código

### 3.1 Pastas

```
src/data/
  modos/
    index.ts              registro: pacoteDe(modo), MODOS, MODO_PADRAO = 'murim'
    tipos.ts              interface PacoteModo
    murim/
      index.ts            monta o pacote (aponta para os arquivos abaixo)
      eventos.ts          (hoje events/index.ts)  character.ts  paths.ts  items.ts
      endings.ts  realms.ts  combates.ts  marcas_vida.ts  vocabulario.ts
    xianxia/
      index.ts
      eventos/            os arquivos restaurados, já triados
      character.ts  paths.ts  items.ts  endings.ts  realms.ts  combates.ts
      marcas_vida.ts  vocabulario.ts  mundo.ts  contratos.ts  variantes.ts
  names.ts  companions.ts  afinidades.ts  retiros.ts  regions.ts   (compartilhados, com ganchos por modo)
```

Os arquivos do Murim saem de `src/data/` com `git mv`, para preservar o histórico. Quando um arquivo hoje compartilhado tiver diferença real entre os modos (`combates.ts`, `retiros.ts`, `afinidades.ts`), ele ganha uma versão por modo; senão, continua único.

### 3.2 O pacote

```ts
type Modo = 'murim' | 'xianxia';

interface PacoteModo {
  id: Modo; nome: string; resumo: string;          // textos da tela de escolha
  eventos: GameEvent[]; trilhas: Path[]; origens: Origin[]; talentos: Talent[]; defeitos: Flaw[];
  itens: Item[]; finais: Ending[]; conquistas: Achievement[]; melhorias: Upgrade[];
  escadas: Record<string, Ladder>; escadaSemTrilha: string;   // 'murim' | 'neutro'
  marcasVida: Record<string, string>;
  vocabulario: { atributos: Record<StatKey,string>; moral: Record<MoralAxis,string>; moeda: string; treino: string; /* ... */ };
  regras: { dificuldadePorReino: number; longevidade: boolean; eras: boolean; contratos: boolean;
            trilhaDemoniacaMudaAlinhamento: boolean; eventoInicial: string; eventoDiaComum: string; eventoVidaComum: string };
  finalDeVelhice(s: State): string;                              // substitui oldAgeEnding
}
```

### 3.3 Onde o modo fica salvo

- `State.modo: Modo`, gravado em `startLife`. Ausente em save antigo, vira `'murim'` em `load()` e em `view()`.
- `Creation.modo` (a criação já sorteia origem, talento e defeito; ela passa a depender do modo).
- `Meta.history[].modo` e `Meta.best` por modo. Legado, melhorias, códice e bestiário continuam **compartilhados** (você pediu Legado comum).
- `Settings.modoPreferido`, só para pré-selecionar o cartão na próxima vida.
- **Mesma chave** `murim-quest-save-v1`. Todo campo novo é opcional e tem padrão, então um save atual abre como Murim sem migração destrutiva. O `appId` (`app.cultivo.jogo`) e a assinatura não mudam.

### 3.4 Como o motor escolhe o pacote

`P(s: State) => pacoteDe(s.modo ?? 'murim')`, com índices por `id` calculados uma vez por pacote (cache). As constantes globais do `engine.ts` viram consultas por `P(s)`. Funções sem estado recebem o modo: `rollCreation(meta, rng, modo)`, `startLife` (via `Creation`). Na interface, `shopModalHtml`, Códice e Mochila usam `P(save.run)`.

Por que **não** mesclar tudo num catálogo só com `cond.modo`: os dois pacotes reutilizam ids de trilha, origem, talento e defeito com significados diferentes, e a dificuldade, o vocabulário e as regras de longevidade também diferem. Isolar por pacote evita um evento do Xianxia aparecer numa vida Murim por descuido de condição.

### 3.5 Garantia de que o Murim não muda (passo 1.2)

Antes de mexer, gravo um "dourado": para 300 sementes, o hash da sequência `(id do evento, escolha do bot, final)` mais os relatórios `sim 1000`, `variedade 1000`, `impacto 100` e `poder 100`. Depois da refatoração, a sequência tem de ser **idêntica bit a bit** (o RNG não pode ganhar nem perder sorteios), e os relatórios, iguais. Se uma sequência divergir, a refatoração está errada.

---

## 4. O que volta, o que é corrigido e o que cai

Regra: **só volta o que passa nos critérios das METAS**. Eventos que o script marcou como "tanto faz" ou com texto colado não voltam sem correção.

| Grupo | Eventos | Tratamento |
|---|---:|---|
| **Restaurar como estão** (sem pendência mecânica) | 313 | Voltam no passo 1.6. Eu leio uma amostra de cada arquivo para confirmar que a prosa se sustenta. |
| **Corrigir** | 417 | Dois tipos. *Bloqueadores* (dependência de eras/contratos, referência quebrada, nenhuma opção livre): corrigidos no Lote 1, porque são mecânicos. *Sem marca* (538 eventos têm ao menos uma escolha sem consequência): cada um precisa de uma consequência **escrita** (flag lida depois, aliado ou inimigo, item, evento agendado, final ou caminho). Isso é trabalho de conteúdo, não de código. |
| **Descartar ou reescrever** | 147 | Não voltam no Lote 1. Os 135 "tanto faz" e os que têm texto colado só voltam se eu conseguir dar-lhes consequência real; senão ficam de fora. |

**Consequência para as metas do Lote 1.** O pacote Xianxia começa com os 313 limpos mais os bloqueadores corrigidos. Os eventos "sem marca" voltam **em ondas, já corrigidos**, a partir do Lote 2, junto com o trabalho de trilhas, talentos e defeitos. Assim, "escolhas sem marca" fica em **0** no Xianxia em todos os lotes, porque o que está fora do pacote não conta.

**Riscos que já vejo, para você saber antes de aprovar:**
1. **Pouca repetição.** Dos 313 limpos, **281 têm `once`** (acontecem uma vez por vida) e só ~32 são repetíveis. Um Xianxia de séculos pode esgotar o conteúdo limpo e cair em eventos genéricos. Disponíveis por reino (limpos / limpos + corrigidos): reino 0: 60 / 167; 1: 144 / 324; 2: 228 / 431; 3: 261 / 535; 4: 245 / 549; 5: 240 / 548; 6: 217 / 485; 7: 168 / 381; 8: 100 / 258. Reino 8 e reino 0 são os mais finos. O Lote 1 vai medir isso com `variedade --modo xianxia` e eu reporto a taxa real de genéricos e a semelhança entre vidas, mesmo que fiquem acima da meta.
2. **Metas do Xianxia que o Lote 1 não fecha:** talentos/defeitos/origens com os mínimos (Lote 2), curva de poder (Lote 3) e ascensão entre 0,5% e 2%. Em `899108c` o relatório antigo dava 0,8%; com um catálogo menor e outra dificuldade, o número vai mudar e eu reporto o valor medido.
3. **Finais.** Em `899108c` havia 72 entradas em `endings.ts` e 45 de traços, vários a 0%. Meta é nenhum final em 0% ou acima de 35%: finais que o bot nunca alcançar após a restauração serão removidos ou ganham um caminho (decisão final no relatório do Lote 1).

---

## 5. Tela de escolha de modo

Aparece depois de "Nova vida" (início e fim de vida) e **antes** da tela de criação. Dois cartões grandes, empilhados em tela em pé e lado a lado em tela deitada.

```
┌──────────────────────────────────────┐
│   Que vida você quer viver?          │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ [ícone Murim]   MURIM · Jianghu  │ │
│ │ Carreira marcial humana: escolas,│ │
│ │ clãs e a fama que sobe de        │ │
│ │ Aprendiz a Lenda.                │ │
│ │ Suas vidas: 12 · Melhor: Mestre  │ │
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │ [ícone Xianxia] XIANXIA · Cultivo│ │
│ │ Cultivação rumo à imortalidade:  │ │
│ │ reinos, séculos de vida, seitas, │ │
│ │ alquimia e tribulações.          │ │
│ │ Suas vidas: 0                    │ │
│ └──────────────────────────────────┘ │
│  O modo vale para esta vida.         │
│  Seu Legado vale para os dois.       │
│                       [ Voltar ]     │
└──────────────────────────────────────┘
```

- Textos (uma linha cada, como pedido): **Murim** — "Carreira marcial humana: escolas, clãs e a fama que sobe de Aprendiz a Lenda." **Xianxia** — "Cultivação rumo à imortalidade: reinos, séculos de vida, seitas, alquimia e tribulações."
- O cartão do último modo jogado vem destacado; na primeira vez, o Murim.
- Toque no cartão = escolhe e vai para a criação (um toque, sem confirmação extra). O cartão tem pelo menos 44 px de altura e o texto quebra linha (`overflow-wrap`, `min-width: 0`, `clamp()`).
- **Status** mostra um selo "Murim · Jianghu" ou "Xianxia · Cultivo" na primeira linha. **Resumo final** ganha a linha "Modo". **Histórico** de vidas marca o modo de cada uma.
- Cada pacote usa seu vocabulário (Percepção/Técnica/Instinto/Vontade no Murim; Espírito/Compreensão/Sorte/Coração do Dao no Xianxia; moedas vs. pedras espirituais; Honra/Astúcia/Lealdade/Ambição vs. Bom/Mau/Ordem/Caos). `alignment` e `morality` seguem separados nos dois.
- `tools/e2e/layout-boundaries.mjs` hoje clica `new` e depois `start`. Passa a clicar `new`, escolher o modo e `start`, rodando uma vez por modo, e ganha a tela de escolha nos 4 tamanhos (320, 360, 390, 430) e com fonte a 130%.

---

## 6. Arte

- `src/ui/art/**` não mudou desde `899108c`; portanto o Xianxia já tem cenários (`vilarejo, cidade, seita, selva, montanha, ruinas, deserto, gelo, mar, reino_secreto, submundo, ceu`), ícones de reino do ramo não-Murim e ícones de item por tipo nos três estilos.
- Isso **não** é o "mesmo nível" que você pede: os 112 itens restaurados hoje reutilizariam ícones procedurais por tipo, e retratos e cenários não distinguem, por exemplo, tribulação, formação ou alquimia.
- Proposta (D7): **sub-lote 1B**, depois de o Xianxia rodar. Primeiro uma auditoria de lacunas por estilo (cenários de seita, reino secreto, tribulação, itens de cultivo, retratos por trilha/idade/reino/gênero/corrupção, oponentes), com a lista e as imagens de antes. Depois eu produzo as peças, **renderizo cada uma em PNG no tamanho real e ampliado, olho a imagem e corrijo** antes de seguir, nos três estilos, e mostro a prancha final. Essa revisão visual é parte do trabalho, não opcional; ela toma tempo e vou reportar quantas peças foram feitas e quantas faltam.

---

## 7. Ferramentas e relatórios

- `validate`, `fuzz`, `endings`, `sim`, `variedade`, `impacto`, `poder` e `galeria` aceitam `--modo murim|xianxia`. **Sem a flag, rodam os dois, em sequência**, para que um `npm run validate` pegue regressão em qualquer um.
- Relatórios com `git mv`, mantendo o histórico: `docs/impacto.md` → `impacto-murim.md`, `variedade.md` → `variedade-murim.md`, `balanceamento.md` → `balanceamento-murim.md`, `poder.md` → `poder-murim.md`, e os `*.baseline.json` idem. O Xianxia gera `*-xianxia.md`.
- `validate` ganha checagens novas: `PacoteModo` completo, ids únicos por pacote, nenhuma referência cruzada entre pacotes, opção sem condição em todo evento, e **texto de opção idêntico em 4 ou mais eventos** (para impedir a volta dos moldes).
- A auditoria que usei neste plano vira `sim/triagem.ts` (lê de `git show`, sem precisar extrair), para você poder reproduzir os números da seção 1.

---

## 8. Ordem do Lote 1 (depois da sua aprovação)

| Passo | Entrega | Verificação |
|---|---|---|
| 1.0 | Dourado do Murim (seção 3.5) | Arquivos de baseline versionados |
| 1.1 | Tipos: `Modo`, campos opcionais restaurados | `npm run build` |
| 1.2 | Registro de pacotes; Murim movido para `modos/murim/` sem mudar comportamento | Sequências das 300 sementes **idênticas**; `sim`/`variedade` iguais; mostro antes e depois |
| 1.3 | `State.modo`, `Creation.modo`, `load()` com padrão `murim`, histórico por modo | Save atual (de `8a99d7a`) abre como Murim; teste automatizado com um save real |
| 1.4 | Tela de escolha, Status, resumo final | `e2e:layout` nos dois modos e na tela nova |
| 1.5 | `--modo` nas ferramentas e relatórios separados | Relatórios do Murim reproduzem o dourado |
| 1.6 | Pacote Xianxia: escada, longevidade, trilhas, origens/talentos/defeitos, itens, finais, combates, marcas de vida, 313 eventos limpos, bloqueadores corrigidos, eras, contratos, tribulação | `build`, `validate`, `endings` passando |
| 1.7 | Motor: regras do pacote (dificuldade, longevidade, eras, contratos, alinhamento da trilha demoníaca, final de velhice) | `fuzz` sem violação nos dois modos |
| 1.8 | Relatórios do Xianxia e tabela antes/depois | Todas as metas medidas; abertas listadas |
| 1.9 | Commit e push (e merge em `main` com sua aprovação, D6) | APK instala por cima (mesmo `appId` e assinatura) |

**Depois do Lote 1:** 1B (arte), Lote 2 (impacto real; também traz de volta, em ondas, os eventos corrigidos), Lote 3 (sensação de poder), Lote 4 (mais conteúdo Murim). Cada um termina com a tabela de métricas por modo, tirada dos relatórios, e com as metas abertas ditas por extenso.

---

## 9. Perguntas de conteúdo e de design (sem padrão seguro)

Estas eu não vou decidir sozinho, porque mudam o que o jogo é:

1. **Tom do Xianxia.** O conteúdo de `899108c` mistura humor leve (o cozinheiro que era mestre) e tragédia. Mantenho a mistura como está?
2. **Nomes.** O Xianxia antigo usa nomes e seitas gerados (`names.ts`) e o Murim usa personagens fixos (Seo Yun, Baek Mu-jin, Im Seol). No Xianxia, quero manter os nomes gerados; faz sentido para você?
3. **Primeira vida.** O Murim abre com a saga do Livro de Ferro. O Xianxia não tem um evento inicial equivalente: ele começa pelos eventos de `infancia`, sorteados. Quer uma abertura escrita para o Xianxia no Lote 2?

---

## 10. Decisão da base do Xianxia (noite de 07/11/2026)

Resposta do autor ao Lote 0: D1 a D8 aprovadas; tom misto (humor leve e tragédia), nomes e seitas gerados, **abertura escrita para o Xianxia**; personagens recorrentes mantêm nome e aparência na vida toda. A v2 (branch `reestruturacao`, commit `4be4441`, só existia numa cópia local) foi preservada em `arquivo/v2-reestruturacao` no GitHub (push confirmado: `4be4441edc215cd8605668bcfcaa03469c25b302`). Não houve merge em `main`.

### 10.1 As três fontes, com números medidos

Medidos agora, rodando as ferramentas de cada versão sobre uma cópia extraída em pasta temporária (a cópia do OneDrive não foi tocada; só fiz `git fetch` dela).

| | **A** · `899108c` | **B** · v2 | **C** · v2 + eventos de A convertidos |
|---|---|---|---|
| Unidade de conteúdo | 877 eventos independentes | 171 moldes com papéis (124 únicos), 541 opções | os 171 moldes + os eventos limpos de A reescritos como moldes |
| Pessoas com memória | **nenhuma** (flags soltas) | sim: opinião, fatos, situação, gênero, aparência | sim |
| Coesão medida | 92,8 turnos/vida, 86,0 distintos, 7,2% repetidos, 24,1% genéricos, semelhança entre vidas 0,131 (100 vidas, `variedade`). Não há medida de fios nem de reaparição porque não existe o conceito | 86 cenas/vida; 5,5 fios abertos/vida; **50% dos fios resolvidos com desfecho**, 12% abandonados; 4,61 reaparições por pessoa importante, **28%** nunca reaparecem; 54% das vidas forjam uma ambição (30% cumprida); divergência 29% (120 vidas, `coesao`) | B + conteúdo de A |
| Opções com impacto | 29 opções exclusivas escritas; 538 eventos com escolha sem marca | 541 opções, todas escritas para a cena; 94 com `requer` (jogador 45, papel 27, contador 10...) | B + cobertura de A |
| Talentos e defeitos | muito material (lote26/27: 101 eventos, 72 limpos) | **fraco**: só 19 moldes ligados a talento | B + os 72 limpos convertidos |
| Cobertura por reino 0..8 | limpos 60·144·228·261·245·240·217·168·100 (281 de 313 são `once`) | moldes disponíveis 59·123·140·159·164·166·166·167·167 | soma |
| Moldes que nunca foram escolhidos em 120 vidas | — | 14 de 171 | a revisar |
| Mudança no motor atual | grande: voltar `lifespan`, eras, contratos/guilda, tipos | **média e isolada**: 4 arquivos em `src/engine/v2/` (~86 KB), ~20 ganchos protegidos por `if (s.v2)` em `engine.ts`, 6 campos opcionais em `types.ts`, `ui/art/pintura/aparencia.ts` | igual a B |
| Risco para o Murim | médio (mexe em tipos e fluxo compartilhados) | **baixo**: nenhuma vida Murim cria `s.v2`; o dourado de 300 sementes prova | igual a B |
| O que se perde | a coesão (o problema que a v2 resolveu) | os 313 eventos limpos de A e os sistemas de eras/contratos | só o que for descartado de A |

### 10.2 Decisão: **C, com o motor v2 isolado no pacote Xianxia**

- **Critério do autor:** coesão e impacto real das escolhas primeiro, volume depois. Os números confirmam que a v2 é mais coesa que A: A não tem sequer pessoa persistente; a v2 resolve metade dos fios, e metade das pessoas importantes volta 4,6 vezes. A é o único lado com volume em talentos e defeitos, que é o ponto fraco da v2 (19 moldes).
- **Isolamento:** o motor v2 entra como `regras.motor = 'v2'` do pacote Xianxia. O Murim não passa por ele. Os ganchos em `engine.ts` ficam todos atrás de `s.v2`.
- **Ordem:** (C1) portar a v2 para o motor atual e fazê-la rodar no pacote Xianxia: é o Lote 1. (C2) converter os eventos limpos de A em moldes **em ondas**, começando por talentos, defeitos e origens (lote26/27/28), no Lote 2. Eventos de A "sem marca" só entram convertidos e já com consequência.
- **Revisões ao plano do Lote 0:** (a) a seção 4 ("restaurar 313 eventos direto") vira "converter para moldes"; (b) **D8 muda**: eras do mundo (`lote13_mundo`, 39 eventos) e contratos/guildas **não** voltam, porque a v2 já tem facções, guerra entre seitas e perigos de mundo, e o autor pediu coesão antes de volume; (c) D1 e D2 continuam (a v2 também proíbe opção por categoria, regra 1 de `docs/eventos-v2.md`).
- **Fica de fora do que veio da v2:** os commits `b4467f3` e `4be4441` (feitos por ferramenta externa): só criam `src/main.ts` (6 linhas) e um `src/ui/audio.ts` de 51 linhas, e o HEAD já tem seu áudio. Também fica de fora `tarefa.txt`. Os arquivos soltos na raiz da cópia do OneDrive não estão em nenhum commit da branch.
- **UI da v2:** a interface atual (estilo Life in Adventure) é diferente da que a v2 alterou. Portar o **mínimo** no Lote 1: a cena v2 usa o mesmo `view()`/`choose()` e aparece nas telas atuais. Cartão de capítulo, notícias e aba Mundo são extras: entram quando o resto estiver estável; se não couberem, ficam registrados como abertos.

### 10.3 O gerador de aparência chegou a ser feito?

**Sim, na v2**: `src/ui/art/pintura/aparencia.ts` gera um rosto determinístico por pessoa (formato do rosto, tez, olhos, sobrancelha, nariz, boca, cabelo, barba, marcas, acessórios e traje) com a opção de **evitar semelhança** com outras aparências (`evitar`). Fica gravado em `Pessoa.visual` e `State.look` (jogador), e a idade só acrescenta rugas e grisalho, então a pessoa é reconhecível a vida toda. Ele é renderizado pelo estilo "pintura" (`retrato.ts`, `rosto.ts`). O que **não** está feito: usar essas aparências nos três estilos atuais (Pixel, Manhwa, Tinta) e nos oponentes do Murim. Isso entra no sub-lote 1B.
