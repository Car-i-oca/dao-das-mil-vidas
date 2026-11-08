# Dúvidas e decisões tomadas sozinho (noite de 07/11/2026)

Cada item diz o que eu decidi, por quê, e como desfazer. Escolhi sempre a opção que muda menos o que já funciona e é fácil de desfazer.

## 1. `perfil` de conduta volta no Xianxia, mas só como dado escrito à mão
- **Decisão:** a D1 dizia "o perfil não volta". Ao portar a v2 vi que os moldes dela usam `perfil` de forma **explícita** em 704 efeitos (escritos pelo autor, opção por opção). Isso não é o classificador por regex de `899108c`, que continua morto. Por isso o campo `perfil` voltou em `Effects`, `Cond` e `State`, e o motor só soma e compara. Nada o gera automaticamente.
- **Por quê:** sem ele, 704 efeitos autorais seriam descartados em silêncio.
- **Como desfazer:** apagar a linha de `perfil` em `applyFx` e `condMet` (`src/engine/engine.ts`); o conteúdo continua válido, só deixa de acumular.
- **Confirme:** quer que o perfil vire alcunha/epílogo no Xianxia (como na v2), ou prefere que fique só como dado?

## 2. `rec` (recurso da trilha) voltou só como contador
- **Decisão:** 118 efeitos da v2 usam `rec` (Intenção de Espada, Têmpera do Corpo...). Voltaram `Path.rec/growth/fraco/tags/xpMult` e `Effects.rec`, e o motor acumula `s.rec`. **Não** voltou o bônus de teste por estágio nem a curva de crescimento por trilha: isso é o Lote 3 (sensação de poder).
- **Como desfazer:** remover `fx.rec` em `applyFx`.
- **Confirme:** nada urgente.

## 3. Eras do mundo, contratos e guildas não voltam
- **Decisão:** revisão da D8 do plano. A v2 já tem facções, guerra entre seitas e perigos; trazer as eras de `899108c` duplicaria o mecanismo. Registrado em `docs/modos.md`, seção 10.2.
- **Como desfazer:** os arquivos continuam em `899108c`/`arquivo/v2-reestruturacao`.

## 4. Nomes por modo
- **Decisão:** `names.ts` virou `modos/murim/nomes.ts` (coreano) e `modos/xianxia/nomes.ts` (chinês, com gênero). O Murim não mudou (o dourado prova). Isso vai além do plano (que só falava de marcas de vida), mas era necessário: nomes de seitas, raízes e constituições são parte da cultura de cada modo.

## 5. Conquistas e Legado
- **Decisão:** as conquistas do Xianxia têm prefixo `xx_ach_`; as melhorias do Legado têm os mesmos ids e custos nos dois modos, com nome e descrição próprios por modo (`PacoteModo.melhorias`).

## 6. Dificuldade do Xianxia: 2,5 (como o Murim), não 6
- **Decisão:** o plano dizia restaurar o fator 6 de `899108c`. Medi e **não serve**: com o D20 atual, `8 + reino × 6` deixa a chance média em 41% no reino 1, 14% no 2 e 5% do 3 em diante (`docs/poder-xianxia.md` na versão de 07/11, 60 vidas por trilha). Com 2,5 o Xianxia fica em 58%, 53%, 45%, 40%, 31% nos reinos 1 a 5, o mesmo perfil do Murim.
- **O que isso NÃO resolve:** nos dois modos a chance contra o próprio nível ainda cai com o reino (é o problema do `sensacaodepoder.md`). Isso é o Lote 3.
- **Como desfazer:** `regras.dificuldade` em `src/data/modos/xianxia/index.ts`.

## 7. Itens a conferir de manhã
- Os commits `b4467f3` e `4be4441` da v2 (feitos por ferramenta externa) **não** foram trazidos: só criam `src/main.ts` e um `audio.ts` que o HEAD já supre.
- O Xianxia ainda usa os retratos/cenários dos três estilos atuais. O gerador de aparência da v2 (`src/ui/art/pintura/aparencia.ts`) foi trazido e já gera `State.look`, mas **nenhum estilo o desenha ainda** (sub-lote 1B).
