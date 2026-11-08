# Murim Quest

RPG narrativo de vidas, em português do Brasil, para celular (PWA + APK Android via Capacitor). Dois modos que o jogador escolhe ao começar uma vida: **Murim** (carreira marcial humana, Jianghu) e **Xianxia** (cultivação, mundo com memória). Tudo é conteúdo escrito à mão e lógica do motor: **nenhuma IA gera texto durante o jogo**. Meta: publicar.

**Para retomar o trabalho: leia `docs/estado.md` primeiro.** Não abra relatórios longos (`docs/relatorio-*.md`, `docs/modos.md`) na abertura da sessão.

## Regras invioláveis
- Trabalhe em branch (`feat/dois-modos`). **Nada vai para `main` sem aprovação do autor.** Nunca rebase nem force push; nunca apague branches.
- Não mexa em `appId` (`app.cultivo.jogo`), chave de save (`murim-quest-save-v1`), assinatura do APK, segredos da Action, nem na cópia local `C:\Users\Andre\OneDrive\Documentos\Dao das Mil Vidas`.
- **Proibido inflar métricas:** nada de texto de opção colado em várias cenas; toda opção exclusiva tem texto e consequência próprios (flag lida depois, aliado/inimigo, item, evento agendado, final ou caminho).
- Números sempre tirados dos relatórios gerados (`--modo`), nunca estimados. Diga com honestidade o que não atingiu a meta.
- `alignment` (daoísta/demoníaco) e `morality` (Bom/Mau/Ordem/Caos; no Murim Honra/Astúcia/Lealdade/Ambição) são separados do **perfil de conduta**, que é **escrito à mão** opção por opção (nunca por regex).
- Tudo em português do Brasil; personagens, seitas e técnicas são originais. Texto nunca pode escapar dos quadros (teste `e2e:layout`).
- Dúvida de direção: escolha a opção mais conservadora, registre em `docs/duvidas-lote2.md` e siga.

## Mapa do código
- `src/data/modos/<modo>/` — pacote de cada modo (`murim`, `xianxia`): eventos/moldes, trilhas, origens/talentos/defeitos, itens, finais, alcunhas, marcas de vida, vocabulário. `src/data/modos/index.ts` escolhe o pacote (`pacoteDe(modo)`).
- Murim: `eventos.ts` (eventos), `perfil.ts` (perfil escrito à mão por opção), `alcunhas.ts`. Xianxia: `v2/moldes/*.ts` (moldes), `alcunhas.ts`.
- `src/engine/engine.ts` — motor compartilhado (D20, rompimento, final da vida). Consulta o pacote por `P(s)`. `src/engine/alcunhas.ts` — alcunhas. `src/engine/v2/` — mundo com memória e diretor de história (só Xianxia, atrás de `s.v2`).
- `src/ui/main.ts` — interface (telas, status, fim, Legado); `src/ui/art/` — arte (3 estilos + `pintura/aparencia.ts`).
- `sim/` — simuladores e verificações (todos aceitam `--modo murim|xianxia`; `npm run <x>` roda os dois). `docs/` — relatórios por modo (`*-murim.md`, `*-xianxia.md`).
- Arquivo da v2 original: branch `arquivo/v2-reestruturacao` (não alterar).

## Comandos
```
npm run dev                         # servidor local
npm run build                       # tsc + vite
npm run validate | fuzz -- 200 | endings -- 200     # nos dois modos
npm run dourado                     # Murim: 330 vidas idênticas? (-- --gravar após mudança intencional)
npm run variedade|impacto|poder|alcunhas|alcance -- 1000 [--modo x] [--resumo]
npm run e2e:layout                  # layout nos dois modos (320–430 px, fonte 130%)
```
**Antes de cada push:** `build`, `validate` e `endings` passando nos dois modos; dourado regenerado se o Murim mudou de propósito (explique o que mudou em `docs/relatorio-lote2.md`); `docs/estado.md` atualizado no mesmo commit.

## Skills e agentes do projeto (em `.claude/`)
- Skills: `escrever-cena`, `metas-e-relatorios`, `talento-defeito-origem`, `arte`. Detalhes de formato e processo ficam nelas, não aqui.
- Agentes: `simulador` (roda sim e devolve só a tabela-resumo), `revisor-texto`, `auditor-conteudo`. Rodar sims e varreduras por eles; **escrever conteúdo é na sessão principal**.
- Evite ler arquivos grandes inteiros (`engine.ts` e `main.ts` têm 1000+ linhas; moldes somam muito): use Grep por símbolo e leia só o trecho.

## Sessões
Uma sessão por passo grande. Perto do limite de contexto ou ao fim de um passo: atualize `docs/estado.md`, faça commit e push e peça `/clear` ao autor.

# Compact instructions
Ao compactar, preserve: lote e passo atuais, branch e último commit, arquivos em edição, decisões tomadas na sessão, metas abertas e próximos passos (e a pergunta pendente ao autor, se houver). Descarte saídas de simulação, listagens de arquivos e trechos de código já commitados.
