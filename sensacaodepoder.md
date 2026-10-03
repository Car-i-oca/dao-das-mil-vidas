Mais um pedido de prioridade alta, junto com o de escolhas, trilhas, talentos e defeitos: quero que SUBIR DE REINO e SEGUIR UMA TRILHA mudem o jogo de verdade. Hoje não mudam:

- tierUp dá +2 em todos os atributos, mas checkDifficulty sobe +6 por reino (8 + tier*6). O jogador fica relativamente MAIS FRACO a cada reino e nunca sente progresso.
- 233 de 427 eventos valem para 6 reinos ou mais (a mesma emboscada de bandidos para um novato e para um Integração Corporal). Só 1 escolha em todo o jogo depende do reino.
- Todas as trilhas crescem igual (+2 em tudo). Xianxia e murim só mudam nomes e duração. A única diferença é o xpMult (0,85 a 1,15).
- O rompimento é só um sorteio. Não traz poder novo, mudança de status nem desafio próprio.

O que fazer

1. Sensação de poder
- Refaça a curva de dificuldade para que o jogador sinta que ficou mais forte: desafios do próprio reino continuam difíceis, mas ameaças de reinos abaixo ficam fáceis ou são resolvidas sem teste. Ex.: bandidos mortais contra um Núcleo Dourado viram uma cena de 1 linha com opção de "esmagar", "assustar" ou "poupar", e a escolha tem consequência moral ou de reputação.
- Use a diferença de reino entre o jogador e o oponente ou desafio nos testes, em vez de só a dificuldade relativa.

2. Cada reino é uma fase diferente da vida
- Para cada reino de cada escada, defina em docs/design.md o que muda: poderes novos (voar na espada, consciência divina, sair do corpo, criar um domínio), status no mundo (discípulo externo → interno → ancião → patriarca → ser lendário), ameaças, lugares acessíveis e o tipo de problema (sobrevivência → recursos → política de seita → guerras entre seitas → assuntos de outros planos).
- Restrinja os eventos genéricos a faixas de reino coerentes e crie eventos exclusivos de cada reino, com 15 ou mais nos reinos altos, onde hoje falta conteúdo.
- Escolhas que só existem a partir de certo reino ("usar a consciência divina para vasculhar a cidade", "voar para longe", "esmagar a formação com o seu domínio").
- O rompimento vira um momento: poder ou habilidade nova anunciada, mudança de título, reação do mundo (convites, inimigos atentos) e às vezes um evento-marco do novo reino. A tribulação pode ter escolhas (enfrentar com artefato, formação, corpo ou mérito) conforme a trilha.

3. Trilhas que crescem diferente
- Cada trilha ganha sua própria curva de atributos por reino. Ex.: Corpo cresce muito em Físico e quase nada em Espírito; Consciência é o oposto; Formações cresce em Compreensão.
- Cada trilha ganha mecânicas e recursos próprios que evoluem com o reino:
  - Formações: formações preparadas, preparar o terreno e defender, contratos;
  - Alquimia: fornos, chamas raras, receitas e reputação de alquimista;
  - Bestas: um companheiro que evolui junto;
  - Espada: intenção de espada que se aprofunda em estágios;
  - Corpo: estágios de têmpera;
  - Sangue: corrupção como recurso e como risco;
  - e assim para as demais.
- Mostre isso na aba Status (o que a trilha tem e quando evolui) e use nos eventos e nas escolhas exclusivas.
- Trilhas com pontos fortes e fracos reais: cada uma é a melhor em algumas situações e ruim em outras, sem uma dominar no sim.

4. Verificação
- Adicione ao sim:
  - chance média de sucesso nos testes por reino (deve subir contra ameaças comuns e se manter desafiadora contra as do próprio nível);
  - % de eventos exclusivos por faixa de reino;
  - comparação entre trilhas (atributos ao longo da vida, finais, reino máximo), para confirmar que são diferentes sem nenhuma dominar.
- Mantenha as metas: ascensão entre 0,5% e 2% e nenhum final acima de 35%.
- Jogue uma vida até um reino alto e confirme no resumo que a vida no 6º reino é claramente diferente da vida no 2º.
- Faça commit e push e depois siga com as Etapas 3 e 4 (design e combate visual).