# Design — Dao das Mil Vidas

Jogo de texto de cultivação, mobile-first, instalável (PWA), 100% em PT-BR. Cada vida avança por eventos aleatórios; escolhas e testes decidem o resultado; o personagem envelhece e morre; cada vida termina com um final e um resumo. O que se aprende (Herança do Dao) vale para as vidas seguintes.

## Atributos e recursos
- **Atributos**: Físico (fis), Espírito (esp), Compreensão (comp), Sorte (sor), Carisma (car), Coração do Dao (dao). Começam perto de 6–12; sobem em eventos e a cada reino.
- **Recursos**: Pedras Espirituais, Karma (+/-), Fama, Corrupção (0–100, demoníaca), Ferimentos (0–6; 6 = morte), Progresso de cultivo (% do reino atual).
- **Flags**: marcam escolhas (ex.: `humilhou_jovem_mestre`) e alimentam cadeias de eventos.

## Criação de personagem
Sorteados: **origem**, **Raiz Espiritual** (e, raramente, constituição especial), **1 talento** e **1 defeito**. O jogador pode re-sortear (3 vezes, mais com a Herança). A **trilha não é escolhida na criação**: depois do despertar do Qi, uma cena (mestre, manual, fera, acaso) apresenta trilhas que combinam com o personagem e ele decide dentro da história. Origens/talentos extras são desbloqueados por conquistas; a Herança do Dao compra bônus permanentes.

## Reinos
- Escada **xianxia** (Sopro, Alquimia): Refinamento de Qi → Fundação → Núcleo Dourado → Alma Nascente → Transformação Divina → Refino do Vazio → Integração Corporal → Grande Ascensão → Ascensão.
- Escada **murim** (Espada, Corpo): Terceira Classe → Segunda Classe → Primeira Classe → Mestre de Pico → Transcendente → Além dos Limites → Lenda Marcial → Transcendência.
- Cada reino tem expectativa de vida, "anos típicos" para encher a barra e chance base de rompimento. Reinos altos da escada xianxia exigem **Tribulação Celestial**.

## Loop
1. Evento sorteado por condição (idade, reino, local, facção, flags, atributos) e peso (comum/raro/lendário; Sorte favorece raros).
2. Escolhas mostram a chance do teste quando houver. Testes: `chance = 0,5 + (atributo + bônus − dificuldade) × 0,035 + ajuste de Sorte`, limitada a 5%–95%.
3. Resultado aplica efeitos (atributos, recursos, itens, técnicas, flags, agendamentos, finais).
4. Passam alguns anos (mais em reinos altos): cultivo avança, ferimentos curam, idade sobe.
5. Barra cheia → evento de **rompimento** (chance de falha, desvio de Qi, tribulação).

## Cadeias de eventos
`agenda` agenda um evento futuro em N–M anos (o inimigo humilhado volta décadas depois). Flags (`setFlags`) liberam eventos que as exigem.

## Finais
Há 23 finais (lista em `src/data/endings.ts`): os de morte (velhice, combate, tribulação, desvio de Qi, karma), os de poder (ascensão, iluminação, demônio, Senhor do Sangue), os de legado (fundador, patriarca, ancestral do clã, Guardião, Conselheiro, Oficial Celeste, Pílula Suprema, Sacrifício, Penitente) e os de vida simples (mortal comum, eremita, fio vermelho, Roda do Samsara, perdido no Vazio). Vários são voluntários e aparecem como escolha dentro de eventos.

## Meta-progressão
- **Conquistas** desbloqueiam origens e talentos.
- **Herança do Dao**: pontos ganhos ao morrer, gastos em bônus permanentes (atributos iniciais, ritmo de cultivo, sorte, recomeço com pedras).

## Arquitetura
- `src/engine`: motor puro (sem DOM) — usado pelo jogo e pelo simulador.
- `src/data`: conteúdo em TS tipado (eventos, itens, técnicas, reinos, finais).
- `src/ui`: interface mobile (tabs, texto digitado aos poucos, log).
- `sim/simulate.ts`: 1.000 vidas automáticas para balancear.
- PWA: `manifest.webmanifest` + `sw.js` (offline), build estático para qualquer hospedagem.

## Sensação de poder (progressão por reino)

**Regra de ameaça.** Todo teste tem um *reino da ameaça* (`check.amea`, `evento.amea`, ou automático: testes de combate/fuga de eventos de reino baixo). A dificuldade usa esse reino, não o do jogador, e há um piso de sucesso por diferença de reino: 2 abaixo ≥ 78%, 3 abaixo ≥ 88%, 4 ou mais ≥ 95%. Eventos com `escala: true` (desafios do próprio reino) continuam difíceis. Ameaças de reinos abaixo viram cenas de uma linha com *esmagar / assustar / poupar* (`menor_*`, sem teste, com consequência de karma e fama).

**Crescimento por trilha.** Cada trilha tem `growth` (ganho de atributos a cada reino, total ≈ 10) e `fraco` (testes em que perde 1,5). Corpo cresce muito em Físico, Consciência em Espírito, Formações em Compreensão, Espada em Coração do Dao, e assim por diante.

**Recurso próprio da trilha** (`path.rec`, 6 estágios, 3 pontos por estágio; sobe em eventos `tp_*`, ao romper de reino e em 25% dos testes bem-sucedidos da trilha; a cada 2 estágios dá +1 nos testes da trilha; também reforça a tribulação): Sopro — Pureza do Qi · Espada — Intenção de Espada · Alquimia — Reputação de Alquimista · Corpo — Têmpera · Consciência — Consciência Divina · Formações — Formações Dominadas · Mérito — Mérito Acumulado · Venenos — Receitas e Tolerância · Bestas — Companheiro · Sangue — Essência de Sangue (junto com a corrupção).

**Rompimento como momento.** Ao entrar num reino o jogo anuncia o *poder novo* e o *título no mundo*; logo depois sai o evento-marco `marco_tN` com a reação do mundo. As tribulações têm preparo (`tribulacao_preparo`): artefato, formação, corpo, mérito ou consciência, que aumentam a chance de sobreviver ao raio.

### O que muda em cada reino

| Reino (xianxia / murim) | Título | Poder novo | Tipo de problema | Lugares e ameaças |
|---|---|---|---|---|
| 1 Refinamento de Qi / Terceira Classe | Discípulo Externo | Qi responde ao pensamento / Qi no Dantian | Sobrevivência: fome, feras, rivais de pátio | Vila, floresta, mercado de pedras |
| 2 Fundação / Segunda Classe | Discípulo Interno | Voar na espada / passo leve | Lugar na seita, missões, provas | Seita, estradas, biblioteca interna |
| 3 Núcleo Dourado / Primeira Classe | Ancião / Mestre de Salão | Núcleo e aura / Qi externalizado | Recursos: veios, pavilhão, discípulos, quotas | Cidades, desfiladeiros, leilões |
| 4 Alma Nascente / Mestre de Pico | Ancião Supremo / Chefe de Pico | Consciência divina, alma sai do corpo | Política de seita: traidores, sucessão, conselhos | Ruínas, picos proibidos, câmaras de ancestrais |
| 5 Transformação Divina / Transcendente | Patriarca / Grão-Mestre | Avatares, mil formas | Guerras entre seitas, tributos, alianças | Fortalezas, reinos mortais, portas de reinos ocultos |
| 6 Refino do Vazio / Além dos Limites | Soberano / Lenda Viva | Atravessar o vazio, Domínio | Assuntos de outros planos: fendas, emissários, demônios do vazio | Vazio, templos flutuantes, arquivos celestes |
| 7 Integração Corporal / Lenda Marcial | Ser Lendário / Santo da Guerra | Domínio completo, leis do mundo | Legado: estátuas, fé dos mortais, testamento, inimigos antigos | Mundos de bolso, guerra dos céus |
| 8 Grande Ascensão | Imortal Terrestre | Fronteira do Céu | Despedida: o último olhar, guardião da porta, fio do destino | Limiar do Céu |

Lotes de conteúdo: 14 (ameaças menores e marcos), 15 (reinos 3–4), 16 (reinos 5–6), 17 (reinos 7–8), 18 (reinos 1–2), 19 (trilhas), 20 (tribulação). Verificação: `npm run poder` gera `docs/poder.md`.
