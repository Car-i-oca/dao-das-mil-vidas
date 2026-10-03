Quero que você crie um jogo de texto de CULTIVAÇÃO (xianxia/wuxia/murim) no estilo do "Life in Adventure": a vida do personagem avança por eventos aleatórios em texto, cada evento tem escolhas, atributos e testes de sorte decidem o resultado, o personagem envelhece e morre, e cada vida termina com um final e um resumo. TODO o jogo deve estar em português do Brasil.

## Fase 1 — Pesquisa (antes de escrever código)
Use busca na web para montar o arquivo docs/pesquisa.md com as convenções do gênero, tiradas de novels chinesas (xianxia, wuxia, xuanhuan), manhwas e manhuas (murim, regressão, "sistema"), além de mitologia e filosofia chinesas (taoísmo, budismo, Clássico das Montanhas e Mares, Jornada ao Oeste, cinco elementos, feng shui). Cubra:
- Trilhas de cultivo: Qi, corpo, alma ou consciência divina, espada, alquimia, formações, refinamento de artefatos, demoníaca, budista, venenos, invocação de bestas, dual cultivation (só citar, sem conteúdo sexual) etc.
- Escadas de reinos: a xianxia clássica (Refinamento de Qi → Fundação → Núcleo Dourado → Alma Nascente → ...) e a murim (Terceira/Segunda/Primeira Classe → Pico → Mestre → Transcendente...). Inclua expectativa de vida por reino, gargalos e tribulações.
- Raízes espirituais, constituições especiais, talentos e defeitos.
- Itens: pílulas, ervas espirituais com idade, pedras espirituais, talismãs, manuais e técnicas com graus, artefatos, anéis de armazenamento, núcleos de bestas.
- Facções e lugares: seitas justas e demoníacas, clãs, impérios, reinos secretos, Pavilhão de Tesouros, Associação de Alquimistas.
- Tropos de evento: noivado rompido, velho mestre dentro do anel, caverna com herança, jovem mestre arrogante, competição da seita, desvio de Qi, regressão ou reencarnação, coração do Dao, karma, inimigos que voltam.
- Glossário PT-BR padronizado para cada termo, sempre com o mesmo nome em todo o jogo.
Cite as fontes no final. IMPORTANTE: use isso só como referência de gênero. Todos os personagens, seitas, técnicas e textos do jogo devem ser ORIGINAIS. Não copie nomes, trechos ou enredos de obras específicas.

## Fase 2 — Design (docs/design.md)
- Atributos (ex.: Físico, Espírito, Compreensão, Sorte, Carisma, Coração do Dao), recursos (pedras espirituais, karma, fama) e flags de história.
- Criação de personagem: origem sorteada (camponês, clã decadente, órfão de seita...), raiz espiritual, 1 talento e 1 defeito.
- Loop: cada turno avança alguns meses ou anos. Sorteia um evento pelas condições (idade, reino, local, flags, facção). Escolhas mostram as chances quando for possível.
- Avanço de reino com chance de falha, risco de desvio de Qi e tribulação celestial.
- Cadeias de eventos que se lembram de escolhas antigas (o inimigo humilhado volta décadas depois).
- Vários finais: morte por idade, em combate, na tribulação, ascensão, virar demônio, viver como mortal comum etc.
- Meta-progressão: conquistas e "herança do Dao" que libera origens e talentos novos nas vidas seguintes.

Mostre o design e espere minha aprovação antes de implementar.

## Fase 3 — Implementação
- Jogo web mobile-first (HTML/CSS/TypeScript com Vite), que funcione bem no celular, com opção de instalar como PWA.
- Conteúdo separado do código: eventos, itens, técnicas e reinos em arquivos JSON ou TS de dados, com um formato documentado para eu escrever eventos novos.
- Motor de eventos com condições, pesos, efeitos e flags. Save automático em localStorage.
- Visual simples e com clima: fonte serifada, tons de tinta e papel, texto que aparece aos poucos e log da vida.
- Conteúdo inicial: pelo menos 80 eventos variados (comuns, raros e lendários), 3 trilhas de cultivo jogáveis, 30 itens, 15 técnicas e 8 finais.

## Verificação
- Crie um script que simula 1.000 vidas automáticas e relata a distribuição de idade de morte, de reinos alcançados e de finais. Use isso para balancear: chegar ao topo deve ser raro, mas possível.
- Teste o fluxo completo no navegador antes de dizer que terminou.

Trabalhe por etapas e mantenha uma lista de tarefas. Ao final, me explique como rodar o jogo e como adicionar eventos.