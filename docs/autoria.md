# Autoria e direção criativa

**Dao das Mil Vidas** é obra de **Andre Barbosa Vieira** (© 2026, todos os direitos reservados; ver `LICENSE`). Este documento registra, em ordem cronológica, a direção criativa dele: o conceito, as decisões de design, os pedidos e os feedbacks que moldaram o jogo, a partir dos arquivos de pedidos do projeto (`manwhua.md`, `expandirjg.md`, `proximopasso.md`, `sensacaodepoder.md`, `prompt-dao-v2.md`) e do histórico de commits.

> **Nota sobre ferramentas.** O desenvolvimento (código, textos, dados e arte gerada por código) usou o assistente de IA **Claude** (Anthropic) como ferramenta de escrita e programação, **sob a direção do autor**: foi o autor quem definiu o conceito, os requisitos, as regras de equilíbrio, as prioridades e quem aceitou ou rejeitou cada rumo do projeto. As decisões abaixo são dele.

## 1. Conceito (arquivo `manwhua.md`)
- Um jogo de texto de **cultivação** (xianxia, wuxia, murim) no estilo de "Life in Adventure": a vida avança por eventos aleatórios, cada evento tem escolhas, atributos e testes de sorte decidem o resultado, o personagem envelhece, morre, e cada vida termina com um final e um resumo. Tudo em **português do Brasil**.
- Fase 1, pesquisa de gênero em novels, manhwas, manhuas e mitologia chinesa, registrada em `docs/pesquisa.md`, **somente como referência**: personagens, seitas, técnicas e textos têm de ser **originais**.
- Fase 2, design aprovado antes da implementação: atributos (Físico, Espírito, Compreensão, Sorte, Carisma, Coração do Dao), recursos (pedras espirituais, karma, fama), origem sorteada, raiz espiritual, 1 talento e 1 defeito, escadas de reinos (xianxia e murim), rompimento com risco de desvio de Qi e tribulação, cadeias de eventos que se lembram de escolhas antigas, vários finais, meta-progressão com conquistas e "Herança do Dao".
- Fase 3, implementação: web mobile-first, PWA, conteúdo separado do código, simulador de 1.000 vidas para balancear ("chegar ao topo deve ser raro, mas possível").

## 2. Primeiros pedidos de produto
- **Dar nome ao jogo** e renomear a pasta (nasce "Dao das Mil Vidas"); jogar no **celular**, como no Life in Adventure.
- **Liberdade total** para o desenvolvedor decidir, "apenas conclua o jogo"; depois do plano, **ampliar** trilhas, finais, itens, técnicas e eventos **sem perder o balanceamento**.
- **A trilha não é escolhida no início**: ela nasce de **eventos** (cenas de primeiro método), dentro da história.
- **Rodar como aplicativo no celular**: PWA publicado na web e, depois, **APK instalável** gerado e atualizado automaticamente. Decisão: **não renomear** o jogo por ora.
- Publicar logo a versão atual para o autor testar no celular.

## 3. Expansão em lotes (`expandirjg.md`)
- "Eu não vou escrever eventos à mão: você pesquisa, escreve, valida e balanceia." Lotes temáticos de 20 a 30 eventos (vida na seita, reinos secretos, alquimia, forja, bestas, mundo mortal, caminho demoníaco, budismo, família sem conteúdo sexual, rivais, lendários), cada um validado por `npm run validate`, `npm run sim` e `--meta`, com metas: **ascensão entre 0,5% e 2%**, nenhum item, técnica ou trilha dominando, finais sem mudanças bruscas.
- Pedido contínuo: trabalhar como designer, desenvolvedor, usuário e avaliador para o jogo ficar cada vez mais completo.

## 4. Grande atualização de variedade, arte e combate (`proximopasso.md`)
Depois de jogar por horas, o autor percebeu o jogo "manjado": eventos repetidos, vidas parecidas ("Fim em Paz" em 72% das vidas). Pediu, por etapas, com commit e push:
1. **Diagnóstico de variedade** em números (`docs/variedade.md`).
2. **Mais variedade**: reclusões em reinos altos, conteúdo por reino e fase da vida, variações de texto, **personagens recorrentes** (mestre, rival, amigo, discípulo, amor sem conteúdo sexual, inimigo jurado), **grandes acontecimentos do mundo**, origens que mudam de verdade os primeiros 20 anos, finais mais variados, meta de dobrar os eventos distintos por vida.
3. **Design visual**: estilo próprio documentado, ícones, retratos que mudam com idade, trilha, reino e itens, cenários.
4. **Combate visual**: cena animada curta que só encena o resultado já decidido pelo motor, com "Pular" e "Acelerar", opção de desligar, oponentes variados.
- Regras gerais: tudo original; motor sem DOM; leve no celular; funcionar offline.

## 5. Sensação de poder (`sensacaodepoder.md`)
O autor diagnosticou que subir de reino e seguir uma trilha não mudavam o jogo: o jogador ficava relativamente mais fraco a cada reino, os eventos serviam para todos os reinos, as trilhas cresciam igual e o rompimento era só um sorteio. Pediu: ameaças de reinos abaixo ficarem fáceis ou virarem cenas de "esmagar, assustar ou poupar" com consequência moral; cada reino como uma fase diferente da vida (poderes novos, título, ameaças, lugares); trilhas com curva de atributos, recurso e mecânicas próprias, pontos fortes e fracos reais; rompimento como momento com reação do mundo; tribulação com escolhas. Verificações novas no simulador.

## 6. Feedback após testar a versão com arte e duelos (`prompt-dao-v2.md`)
- **Princípio geral**: **toda** escolha, evento, talento, defeito e origem deve ter **impacto determinante** na run; nada de enfeite. Exigências: condições de talento, defeito, raiz, constituição e técnica nas escolhas, selo na interface com o motivo das opções exclusivas, mínimos por traço (eventos próprios, opções exclusivas, caminho ou final exclusivo), arco de redenção dos defeitos, verificação obrigatória (`sim/impacto.ts`, `docs/impacto.md`).
- **Técnicas que ditam o caminho**: opções e eventos próprios, NPCs e facções que reagem, estágios de domínio, fusão de técnicas, técnicas raras que mudam o rumo da vida.
- **Aparência x longevidade**: o retrato envelhece pela fração da vida vivida, rejuvenesce ao romper de reino (com aviso na tela), e técnicas, pílulas ou constituições de juventude mantêm a aparência.
- **Combate**: barra de vida coerente com o desfecho, lutas de 6 a 12 golpes com os nomes das técnicas do jogador e efeitos visuais por técnica, opções exclusivas também na cena.
- **Arte**: qualidade acima de otimização; três estilos mais ricos para o autor escolher no celular, antes de refazer tudo (pixel art 16-bit, manhwa/manhua com cel-shading ou pintura chinesa); pacotes prontos só com licença livre.
- **Autoria e proteção**: `LICENSE` "todos os direitos reservados", aviso de copyright, este documento, auditoria de originalidade, `docs/licencas.md`, pacote para registro de programa no INPI (`npm run registro`, fora do git) e pesquisa de marca (`docs/marca.md`).
- Depois: balancear as trilhas (todas com chance real de chegar ao topo), limpar arquivos temporários e escolher melhorias de experiência no celular.

## 7. Linha do tempo resumida (commits)
O histórico completo está em `git log`. Marcos: pesquisa e design; motor, dados e interface; simulador e validador; lotes 1 a 12 de conteúdo; trilha nascida de eventos; PWA, APK e publicação; eras do mundo, reclusões e variedade; sensação de poder; origens, talentos e personagens recorrentes; arte em SVG; duelos animados; impacto determinante.

## 8. Auditoria de originalidade
Critério: nenhum nome, texto, personagem ou arte copiado de obra existente. O que foi feito:
- **Arte**: toda gerada por código (SVG e animações em `src/ui/art/` e `src/ui/duelo.ts`); nenhuma imagem de terceiros.
- **Nomes de pessoas**: combinados por sorteio de sílabas genéricas do chinês (`src/data/names.ts`), sem lista de personagens de obras conhecidas.
- **Seitas, técnicas, itens, finais, eventos e NPCs**: escritos para este projeto; os nomes de lugar e de seita são sorteados de combinações próprias.
- **Mitologia e domínio público**: referências a mitos de domínio público (Rei Dragão do Leste, pêssego da imortalidade, macaco de pedra, juiz do submundo, dama da Lua, os quatro guardiões, raposa de nove caudas) estão reescritas com cenas e diálogos novos, e sem personagens de obras protegidas.
- **Termos próximos de obras conhecidas, trocados**: "Culto do Demônio Celestial" → **Culto do Trono Escarlate**; "Clã dos Mendigos" → **Irmandade dos Panos Velhos**; "Conferência do Wulin" / "Aliança do Wulin" → **Conferência dos Punhos e Lâminas** / **Aliança das Lâminas**; "Nove Grandes Seitas" → **Nove Casas do Continente**.
- **Convenções de gênero** (reino por reino, tribulação, regressão, raiz espiritual, pílulas, pavilhões, "sistema") são ideias comuns do gênero, não expressão protegida; foram implementadas com texto próprio.
- **Dependências e fontes**: ver `docs/licencas.md`.
