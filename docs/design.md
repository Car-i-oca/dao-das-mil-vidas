# Design — Dao das Mil Vidas

Jogo de texto de cultivação, mobile-first, instalável (PWA), 100% em PT-BR. Cada vida avança por eventos aleatórios; escolhas e testes decidem o resultado; o personagem envelhece e morre; cada vida termina com um final e um resumo. O que se aprende (Herança do Dao) vale para as vidas seguintes.

## Atributos e recursos
- **Atributos**: Físico (fis), Espírito (esp), Compreensão (comp), Sorte (sor), Carisma (car), Coração do Dao (dao). Começam perto de 6–12; sobem em eventos e a cada reino.
- **Recursos**: Pedras Espirituais, Karma (+/-), Fama, Corrupção (0–100, demoníaca), Ferimentos (0–6; 6 = morte), Progresso de cultivo (% do reino atual).
- **Flags**: marcam escolhas (ex.: `humilhou_jovem_mestre`) e alimentam cadeias de eventos.

## Criação de personagem
Sorteados: **origem**, **Raiz Espiritual** (e, raramente, constituição especial), **1 talento** e **1 defeito**. O jogador pode re-sortear 3 vezes e escolhe a **trilha**: Sopro (Qi), Espada, Alquimia ou Corpo. Origens/talentos extras são desbloqueados por conquistas; a Herança do Dao compra bônus permanentes.

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
