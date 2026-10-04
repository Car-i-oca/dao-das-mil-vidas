# Dao das Mil Vidas v2: um mundo com lógica

Documento de design da Fase 1. Para ler junto: `docs/diagnostico-coesao.md` (o que está errado hoje) e `docs/eventos-v2.md` (como escrever uma cena no formato novo). Tudo offline, sem IA dentro do jogo: a inteligência vem de sistemas.

## 0. Resumo em um minuto

Hoje o jogo sorteia um evento qualquer que passe nas condições, e cada evento ignora o que veio antes. No desenho novo:

1. **O mundo existe entre as cenas.** Pessoas, facções e lugares têm estado, objetivos e memória, e andam sozinhos a cada ano de tempo que passa.
2. **As cenas são moldes com papéis** ("{rival} desafia você diante de {seita}"). O motor liga cada papel a alguém que existe no mundo e escolhe a cena **mais relevante para este momento**, não uma qualquer.
3. **Um diretor de história** organiza a vida em capítulos, controla o ritmo (calmaria, preparo, perigo, clímax, consequência) e cuida dos fios abertos (vingança, dívida, promessa) para que nenhum se perca.
4. **A vida tem uma ambição** (vingar o clã, fundar uma seita, ascender, proteger alguém, dominar uma técnica, redimir um defeito). O diretor puxa a história a favor ou contra ela, e o final diz se foi cumprida, traída ou abandonada.
5. **O build é lido pelo mundo.** Trilha, talento, defeito, origem, raiz e técnicas são traços que as pessoas enxergam e que mudam quais cenas aparecem e quais soluções existem **dentro de cada cena**, escritas à mão para ela.

O que sai: opções coladas por palavra-chave, afinidades, "marcas da vida" como substituto de consequência. O que fica: trilhas e recursos, reinos, duelos, arte (3 estilos), aparência por fração da vida, técnicas com domínio e fusão, autoria, PWA e APK.

## 1. O que aprendemos com cada sistema

Pesquisei como cinco sistemas resolvem coesão e escolhi o que serve a um jogo de texto de uma vida só.

### RimWorld: o contador de histórias (AI storyteller)
O RimWorld não sorteia incidentes uniformemente. Cada contador de histórias olha o estado da colônia (riqueza, população, se alguém morreu ou se feriu há pouco, quanto tempo passou desde o último evento grande) e decide **qual categoria de incidente cabe agora**; a riqueza vira "pontos de ameaça" que dimensionam o perigo. Cassandra sobe a dificuldade de forma contínua, como um arco dramático; Phoebe manda ajuda depois de uma pancada; Randy é puro sorteio. ([RimWorld Wiki: AI Storytellers](https://rimworldwiki.com/wiki/AI_Storytellers), [análise do contador como autor de gênero](https://medium.com/@coyega1328/algorithmic-authors-rimworlds-ai-storytellers-as-agents-of-literary-genre-eff70ea4560c))
**Usaremos:** (a) o diretor decide o *tipo* de cena (calma, preparo, perigo, clímax) por uma curva de tensão, antes de escolher qual cena; (b) "pontos de ameaça" para dimensionar rivais e inimigos pelo reino do jogador; (c) contadores de histórias como modo de jogo opcional (um sereno, um cruel, um caótico), que também resolve a pergunta de dificuldade.

### Crusader Kings 3: pessoas com traços, opiniões e memórias
Em CK3 todo evento tem `trigger` (quem pode recebê-lo), `weight` (quanto pesa), um bloco que roda na hora e **opções com condição e peso de IA** que dependem de traços (`has_trait = brave`). Os eventos recebem **papéis** guardados (`scope:rival`), ligam-se por `trigger_event` com atraso, e rodam em pulsos (uma vez por ano, por trimestre, ao nascer um filho). Os personagens têm **opiniões** (modificadores que somam e expiram) e **memórias** de fatos (batalhas, filhos, rivais mortos) que os eventos leem. ([CK3 Wiki: Event modding](https://ck3.paradoxwikis.com/Event_modding), [Trait modding](https://ck3.paradoxwikis.com/Trait_modding), [Modifiers](https://ck3.paradoxwikis.com/Modifiers))
**Usaremos:** pessoas com 2–3 traços, opinião sobre o jogador de −100 a +100 com modificadores que expiram, memória de fatos, papéis nomeados nas cenas, encadeamento com atraso e um pulso anual de simulação.

### Dwarf Fortress: o mundo roda sozinho antes de você chegar
O mundo é simulado como um "jogo de estratégia sem jogador" de 250 a 1.000 anos, com milhares de agentes; a história é **o registro dessa simulação**, e o jogador herda povoados com rivalidades e ruínas reais. ([DF Wiki: World generation](https://www.dwarffortresswiki.org/index.php/World_generation), [Legends](https://dwarffortresswiki.org/index.php/DF2014:Legends))
**Usaremos:** uma **pré-história curta** (30 a 60 anos) simulada ao nascer, que cria o clã, a dívida, a seita extinta, o rival da família; e o registro do mundo, que alimenta as cenas e o final.

### Fallen London: storylets e qualidades
Em quality-based narrative (QBN), a história é feita de **storylets**: um ou dois parágrafos, uma escolha e um desfecho, liberados por **qualidades** (contadores como "Reputação com a Polícia" ou "Progresso do Caso"). Várias histórias curtas se encaixam sem ramificação gigante, e as opções bloqueadas ficam **visíveis, com o motivo**. ([Emily Short, Beyond Branching](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/), [SimpleQBN](https://videlais.github.io/simple-qbn/qbn.html), [Fallen London](https://en.wikipedia.org/wiki/Fallen_London))
**Usaremos:** qualidades numéricas em vez de flags booleanas (Opinião, Reputação, Progresso do fio, Domínio); cenas curtas e independentes que se compõem; opções bloqueadas visíveis com o selo do motivo (já temos o selo).

### Narrativa por saliência (Left 4 Dead, Versu, Dwarf Fortress)
Aqui o **sistema** escolhe o conteúdo mais apropriado: cada peça de conteúdo declara condições e vence a que combina com mais (a mais **específica**). "Pantry = empty" bate "location = kitchen". Vantagem: dá para começar com conteúdo largo e padrão e ir adicionando conteúdo mais específico sem mexer no resto. Risco, nas palavras de Emily Short: sem estrutura dramática o jogador "acaba satisfazendo as precondições para o personagem ser morto pela máfia" num momento absurdo; e é preciso ferramentas de visualização para achar conteúdo que nunca sai. ([Emily Short, Beyond Branching](https://emshort.blog/2016/04/12/beyond-branching-quality-based-and-salience-based-narrative-structures/))
**Usaremos:** relevância por especificidade (secção 3), **mais** o diretor (secção 4) para cobrir exatamente esse risco, e relatórios de conteúdo nunca escolhido no simulador.

### Síntese
| Problema do jogo atual | Solução | Origem |
|---|---|---|
| Cenas não sabem de quem são | Papéis ligados a pessoas do mundo | CK3 |
| Pessoas só existem na tela | Mundo com memória que roda por ano | Dwarf Fortress, CK3 |
| Sorteio uniforme | Relevância por especificidade e urgência | Salience, QBN |
| Sem ritmo | Diretor com curva de tensão e fases | RimWorld |
| Fios somem | Lista de fios com prazo e desfecho obrigatório | RimWorld (tempo desde o último), QBN |
| Build é frase solta | Traços lidos por pessoas e por cada cena | CK3 (traços), QBN (opções visíveis) |

## 2. O mundo com memória

### 2.1 Entidades
Tudo é dado serializável dentro do `State` (continua salvando em JSON), sem DOM.

**Pessoa**: `id, nome, idade, reino (tier), trilha, traços (2–3), objetivo, opinião (−100..+100 sobre o jogador), memória (fatos entre vocês), facção, lugar, papéis (mestre, rival, amigo, amor, discípulo, inimigo, parente, cobrador…), vivo`. Traços de personalidade, por exemplo: orgulhoso, leal, rancoroso, ambicioso, cauteloso, generoso, cruel, curioso. O **perfil de conduta** do jogador (as 8 virtudes que já temos) vira a personalidade que as pessoas **enxergam**: quem tem "Lâmina sem Piedade" é temido por uns e procurado por outros.

**Fato** (memória): `ano, tipo (humilhou, salvou, traiu, poupou, devia, venceu, abandonou…), peso (1–5), com quem/onde`. A opinião é calculada a partir dos fatos mais pesos de traço: um orgulhoso lembra uma humilhação com peso dobrado; um leal, uma ajuda.

**Facção**: `seitas, clãs, culto demoníaco, império, associações` com território (lugares), força, aliados, inimigos, interesse (expandir, vingar, esconder um segredo, caçar um artefato) e **reputação do jogador**. Estados: paz, tensão, guerra, extinta.

**Lugar**: `dono, perigo, recursos, segredos` (o poço onde um manual esconde; a gruta onde o mestre caiu). Substituem os cenários soltos.

**Fio**: `tipo, entidades, aberto em, último toque, etapa, desfecho (cumprido, traído, esquecido, perdoado, morto)`. É a unidade que o diretor acompanha (secção 4).

Tamanho: cerca de **12–30 pessoas ativas** (as que o jogador conhece ou que o conhecem), 6–9 facções e ~14 lugares por vida. Pequeno o bastante para simular num celular em milissegundos.

### 2.2 O mundo anda sozinho
A cada passo de tempo (e o tempo passa em saltos de 1 a 15+ anos, conforme o reino), o motor roda `mundo.avançar(anos)`:

- **Pessoas** perseguem o objetivo: o rival *treina* (ganha experiência e sobe de reino), o inimigo jurado *procura* o jogador (distância cai a cada ano), a amiga *se casa*, o mentor *envelhece e morre* se a idade bater.
- **Facções** mudam de força, formam alianças, declaram guerra e se extinguem. Uma guerra entre duas seitas fecha a rota de um lugar e abre cenas de refugiados.
- **Registro**: tudo que acontece vai para `mundo.log` (um "Legends" curto). O que aconteceu fora da tela aparece depois como **notícia** ("Enquanto você estava em reclusão: {rival} rompeu para Núcleo Dourado; o Pavilhão do Corvo caiu").
- **A pré-história**: ao nascer, o motor simula 30–60 anos de mundo (o clã caiu porquê, quem tem a dívida, qual seita é extinta e deixou um manual) e cria as primeiras pessoas. A **origem** deixa de ser um texto e vira condição inicial do mundo: "Herdeiro de um Clã Decadente" significa *este clã, esta dívida, este credor, este rival da família*.

### 2.3 Consequência = o mundo mudou
Cada opção tem efeitos de mundo, não só de atributo. A lista fechada de efeitos:

| Efeito | Exemplo |
|---|---|
| `opinião(papel, ±n)` e `fato(papel, tipo, peso)` | Humilhar {rival}: opinião −25, fato "humilhou" peso 4 |
| `reputação(facção, ±n)` | Ajudar a seita: +15 e uma porta nova |
| `objetivo(papel, novo)` | O rival humilhado passa a *vingar* |
| `morte(papel)` / `ferir(papel)` | O mentor morre na emboscada que você não impediu |
| `criar(papel, filtro)` | Uma criança resgatada vira a discípula do arco |
| `lugar(dono, perigo, segredo)` | A vila é tomada pela facção inimiga |
| `abrir(fio)`, `avançar(fio)`, `fechar(fio, desfecho)` | Promessa feita, cumprida ou quebrada |
| `posse(item/técnica)` e `domínio` | Como hoje |

Humilhar alguém **cria ou atualiza uma pessoa que lembra disso e pode voltar mais forte** (o rival ganha o objetivo "vingar" e o diretor sabe que há um fio aberto). Ajudar uma seita muda reputação e abre cenas que antes não existiam.

## 3. Cenas como moldes, escolhidas por relevância

### 3.1 O molde
Um evento deixa de ser um texto fixo e vira um **molde** (formato completo em `docs/eventos-v2.md`). Em resumo:

- **papéis**: quem e onde participa, por filtro ("um rival com opinião < −20 e reino ≥ o do jogador − 1", "um lugar da facção do rival").
- **quando**: pré-condições sobre jogador, papéis, mundo e diretor.
- **relevância**: lista de termos "se esta condição for verdadeira, soma tanto".
- **cena**: texto com `{rival.nome}`, `{lugar.nome}`, `{facção.nome}`.
- **opções**: cada uma com requisito (traço, técnica, item), selo do motivo, custo, teste, e **efeitos de mundo**.
- **fio** (abre, avança ou fecha um), **tipo** (respiro, preparo, crise, clímax, consequência, personagem), **capítulos** em que vale.

Regra de ouro do formato: **toda opção é escrita para aquela cena.** Não existe campo de "opção genérica por categoria". Se o envenenador tem uma solução em "bandidos bloqueiam a estrada", ela está escrita ali, com os efeitos que ela tem ali.

### 3.2 Como a cena é escolhida
Para cada molde cujos papéis consigam ser preenchidos e cujo `quando` passe:

```
R = ritmo(tipo, diretor)
    × ( 10
        + Σ termos verdadeiros do molde            // especificidade: mais condições = mais salience
        + urgência dos papéis                       // quem é, o que quer, há quanto tempo não aparece
        + tração do fio                             // fio aberto pedindo a próxima etapa
        + tração da ambição                         // a cena move (ou ameaça) o que o jogador quer
        + marca do build )                          // traço do jogador que o molde declara que o interessa
    × descanso                                      // 0 se único e já ocorreu; × 0,35 por repetição
```

- **urgência dos papéis** (por pessoa ligada): `|opinião|/100 × 15` + 10 se está no mesmo lugar + `2 × anos sem aparecer` (máx. 20) + 25 se o objetivo dela envolve o jogador.
- **tração do fio**: +30 se a cena é a próxima etapa de um fio aberto; +10 por ano que o fio passou do prazo.
- **ritmo**: multiplica por 0 a 1,5 conforme a fase do diretor aceita esse tipo de cena agora (secção 4).
- **escolha final**: pega as 5 cenas de maior R e sorteia com peso R², para a vida não ficar previsível, mas nunca absurda.

**Exemplo numérico.** Ano 24 (Fundação), fase *perigo*. Candidatas: (A) *"{rival} desafia você diante de {seita}"* com rival de opinião −60, objetivo "vingar" (você o humilhou aos 14), mesmo lugar, 6 anos sem aparecer: 10 + 15×0,6 + 10 + 12 + 25 + tração do fio 30 = **106**, ritmo 1,3 → ~138. (B) *"A Fome nos Campos"* (cena de região, nenhum papel, nenhuma tração): 10, ritmo 0,3 → 3. (C) *"O Duelo de Alquimistas"* (você é alquimista, sem papéis ligados): 10 + 20 (marca do build) = 30, ritmo 1,0 → 30. Resultado: A tem 4,6× a chance de C e 46× a de B. O confronto vem antes da colheita, como pede o design.

### 3.3 Cenas genéricas como "respiro"
Cenas sem papel (colheita, festival, estrela cadente, mercado) continuam existindo, **curtas** e só como respiro: o diretor só as aceita na fase de calmaria e nunca duas seguidas depois do capítulo da Infância. "Dias de Trabalho", "Meditação", "Gargalo" e "Reclusão" deixam de ser cartões repetidos e viram **cenas de passagem de tempo com notícia do mundo** (secção 2.2).

## 4. O diretor de história

### 4.1 Capítulos
A vida é dividida em capítulos, cada um com **pergunta dramática**, tensão-alvo e um clímax.

| Capítulo | Quando começa | Pergunta dramática | Tensão-alvo |
|---|---|---|---|
| Infância | Nascimento | Quem você é e a que se agarra? | 0,1 → 0,3 |
| Despertar | Primeira centelha de Qi | Qual caminho escolhe você, e quem o vê? | 0,3 |
| Entrada no mundo | Primeira trilha e primeira facção | A quem deve lealdade? | 0,4 |
| Ascensão | Reino 2 em diante | O que está disposto a pagar para subir? | 0,4 → 0,7 |
| Crise | Reino 5+, tribulação, ou fio principal maduro | O que se perde quando o passado cobra? | 0,8 → 1,0 |
| Legado | Reino 7+ ou idade avançada | O que você deixa e para quem? | 0,5 → 0,2 |

Capítulos começam por **marcos** (reino, ambição, fio), não só por idade. Cada transição tem uma cena de virada.

### 4.2 Ritmo
Máquina de fases, como o contador do RimWorld: **calmaria → preparo → perigo → clímax → consequência → calmaria**. A curva de tensão-alvo do capítulo diz se estamos abaixo (vai mais cedo ao perigo) ou acima (insere consequência ou calmaria). Cada molde tem um `tipo`; o multiplicador `ritmo(tipo, fase)` zera o que não cabe. Um clímax é sempre precedido por preparo (para o jogador poder reagir) e seguido por consequência (para o mundo responder).

### 4.3 Fios abertos
O diretor mantém a lista de fios (vingança jurada, promessa, dívida, rival, amor, mestre). Regras:
- um fio aberto há mais que o prazo ganha **tração crescente**;
- **nenhum capítulo termina com fio maduro sem desfecho**: ou aparece a cena de desfecho, ou o fio é encerrado com uma cena de abandono ("a promessa ficou na poeira") que também marca o mundo;
- o final cita os fios principais e como acabaram.

### 4.4 Passagem de tempo com sentido
O diretor decide os saltos: calmaria pode pular anos; clímax não pula nada. Em retiros e esperas, a notícia do mundo narra o que andou sem você, e esse relato pode abrir um novo fio ("o rival está agora no seu antigo pavilhão").

## 5. Objetivos de vida (ambições)

### 5.1 Como surgem
No fim da **Infância** o jogo propõe 2–3 ambições compatíveis com o que já vivido (origem, primeira dívida, primeiro amigo, defeito), e o jogador escolhe ou decide por conta própria mais tarde. Lista inicial:

| Ambição | Estrutura (etapas) | Final se cumprida |
|---|---|---|
| Vingar o clã | descobrir o culpado, reunir poder, enfrentar, decidir (vingança ou perdão) | Vingança / Perdão |
| Reerguer o clã ou fundar uma seita | aliados, território, rival que contesta, primeira prova, legado | Fundador / Ancestral |
| Alcançar a imortalidade | reinos, tribulação, custo escondido, ascensão | Ascensão |
| Proteger alguém | vínculo, ameaça, sacrifício ou vitória | Sacrifício Final / A Casa Cheia |
| Dominar uma técnica lendária | achar, treinar, rival da técnica, perfeição | finais de técnica |
| Redimir um defeito | falha, custo, prova, superar | finais "redenção" |

Cada ambição é um **arco** (um conjunto de moldes + fios com etapas), não um número a mais.

### 5.2 Trocar de ambição
Pode-se trocar, a um custo real: uma **memória pesada** ("abandonou o juramento") vira fato nas pessoas ligadas, o fio fecha como *traído/abandonado* e a reputação cai com quem acreditava. Os finais passam a refletir a ambição **cumprida, traída ou abandonada**.

### 5.3 Puxar a favor ou contra
O diretor soma `tração da ambição` às cenas que a movem **e às que a ameaçam**: a vida de quem quer proteger a vila ganha, no capítulo de Crise, a facção que ataca a vila.

## 6. Build com sentido

Trilha, talento, defeito, origem, raiz, constituição e técnicas entram como **traços** que o mundo lê de três jeitos:

1. **Como as pessoas reagem.** A opinião inicial e os fatos dependem do traço: o orgulhoso Su Haojun despreza o filho de camponeses; a seita extinta reconhece a técnica do jogador; o credor sabe de quem é herdeiro.
2. **Quais moldes ficam relevantes.** Cada molde declara `marca do build` (soma relevância se o jogador tem o traço): o envenenador atrai mais o "banquete com convidado suspeito", o de formações atrai "a falha do lugar".
3. **Quais soluções existem na cena**, escritas à mão.

**Exemplo concreto: "Bandidos bloqueiam a estrada" (molde `estrada_bloqueada`)**
- Universais: *Pagar a passagem* (−pedras, os bandidos lembram de você), *Dar a volta pelo rio* (+2 anos, perigo do rio), *Enfrentar* (teste de combate pelo reino).
- *[Formações]* **Prender o grupo no arranjo de pedras do cruzamento.** Ninguém morre; o líder passa a te dever medo (fato "dominou", opinião −15 mas respeito +). Requer Formação em Mestria Iniciante ou mais.
- *[Venenos]* **Envenenar o líder durante a barganha.** O líder morre em três dias; a quadrilha se desfaz e sua alcunha ganha "Mão Mansa". Se descoberto, reputação com a facção local −20.
- *[Defeito Impulsivo]* **a opção *Dar a volta pelo rio* aparece bloqueada, com o selo "Sangue Quente: você não consegue recuar".** Sobram *Pagar* e *Enfrentar*, e *Enfrentar* sem preparo começa com o primeiro golpe do adversário.
- *[Origem Filho de um Guarda]* **Mostrar a insígnia do pai.** Metade dos bandidos foi soldado; um deles vira contato (pessoa nova, opinião +20).

Nenhuma dessas opções existe em outra cena. Se o molde "Fome nos Campos" quiser dar uma saída ao envenenador, ela será escrita ali, com sentido de colheita (e provavelmente não existirá).

Defeitos fecham ou forçam opções **dentro do molde**, e a redenção é um arco (ambição "redimir um defeito"). Técnicas continuam com domínio e fusão, mas passam a ser **reconhecidas por pessoas** ("alguém viu seu Punho do Vajra" vira fato e atrai quem o procura).

## 7. Uma vida completa, como o sistema novo a narraria

*Exemplo ilustrativo: a mesma build da crônica 1 de hoje (Feng Xuexin, Alquimia, Herdeiro de um Clã Decadente, Memória Perfeita, Meridianos Estreitos), narrada como o sistema novo a produziria. O texto abaixo é escrito à mão para mostrar o resultado; a cena exata virá dos moldes. Nomes em negrito são entidades do mundo.*

**Pré-história (simulada, 41 anos antes do nascimento).** O **Clã Fu** controlava a Forja do Corvo. Perdeu-a para a **Seita das Cinzas Verdes** numa guerra e ficou devendo ao **Pavilhão de Tesouros**. O credor, **Wang Dacheng**, herda a dívida. A Seita das Cinzas Verdes foi depois destruída por uma facção rival, deixando um manual escondido num poço queimado.

**Infância (6 a 14).** Aos 7 anos, **Wang Dacheng** bate à porta. A cena é *Dívida do Pai*: opções de criança (esconder-se, pedir prazo, oferecer o que tem). O jogador pede prazo; o fato "pediu prazo" fica na memória do credor com opinião +5 (ele respeita quem não foge). Aos 11, o manual do cofre acorda o Qi. O diretor nota: origem de clã decadente + dívida aberta. No fim do capítulo, propõe três ambições. O jogador escolhe **Reerguer o Clã Fu**. O fio *Dívida do Clã* tem prazo de 20 anos.

**Despertar (12 a 19).** A erveira do mercado oferece o caminho da Alquimia (a trilha entra no mundo: **Mestra Lin** é a primeira mestra, de opinião +30). O rival aparece: **Duan Lian**, filha do concorrente do credor, também alquimista, orgulhosa. O jogador a derrota num teste público de pílulas, e é cordial. Decisão do jogador: **não a humilhar**. Fato "poupou" peso 3. Opinião de Lian: +10, com a desconfiança de quem foi poupada (traço orgulhosa: o fato pesa dobrado, **como ofensa e como dívida**).

**Entrada no mundo (19 a 30).** Fundação aos 19. **Mestra Lin** o apresenta ao **Templo do Orvalho Cinzento**; ele recusa e fica errante, e a **reputação** com o Templo cai −5. O mundo, enquanto isso: Lian entra no Templo e sobe para Fundação aos 24 (notícia), o Pavilhão de Tesouros passa a cobrar juros.

**Ascensão (30 a 62).** Cena de preparo: o **Pavilhão** propõe pagar a dívida em pílulas. O jogador aceita, e o fio avança (etapa 2). Meses depois, a mulher demoníaca que o salvou (cena *A Mão Que Salvou*, ano 32) reaparece como **Yu Shanshan**, agora anciã de um culto que caça a seita do Templo: pede que ele **pague a gentileza** entregando uma receita. As opções: negar (a ameaça fica), entregar (reputação com o Templo −20, ele ganha um aliado), delatá-la (Yu o marca como inimigo; fato "traiu" peso 5). Ele entrega. O clímax do capítulo chega quando **Duan Lian**, agora no Núcleo Dourado, lidera o ataque do Templo contra o culto e o encontra entre os dois lados. Lian deve a ele (fato "poupou") e hesita. O jogador escolhe interceder: Yu escapa, Lian perde um aliado na seita e passa a *vingar* o orgulho dobrado.

**Crise (62 a 77).** Os fios maduros pedem fechamento: a **dívida** do clã (etapa final: pagar ou ser executado), **Lian** (rival com objetivo "vingar") e **Yu** (aliado do culto). O diretor monta o clímax: no Gargalo de Alma Nascente os três chegam juntos. O jogador tem poder, tribulação à frente e três decisões: enfrentar Lian, pagar a dívida com a receita que escondia, ou romper antes. Escolhe romper. O raio vence o céu em *Alma Nascente*, mas queima o corpo. (Este é um resultado possível; em outra execução, a mesma vida chegaria à tribulação com a dívida paga e Lian reconciliada.)

**Final: *O Clã Que Voltou a Ter Nome*** (ambição cumprida em parte: dívida paga, clã reerguido na memória, rival reconciliada; a vingança de Lian ficou em aberto). O texto cita Mestra Lin, Wang Dacheng (que veio ao funeral), Duan Lian (que não veio, e deixou uma flor de lótus na porta) e a Yu Shanshan que "nunca esqueceu a receita".

### 7.1 O que o motor sabia em três momentos
| Momento | Mundo | Por que essa cena |
|---|---|---|
| Ano 24 | Lian: Fundação, objetivo *superar o jogador*, opinião +10 com fato "poupou" (peso dobrado: orgulhosa). Fio *Rival* na etapa 1. | Cena de desafio: R alto por urgência + tração do fio; fase *perigo*. |
| Ano 32 | Jogador ferido; culto de Yu precisa de médicos; reputação do jogador com o culto 0. | Cena *A Mão Que Salvou* abre fio *Dívida de gratidão* com Yu. |
| Ano 70 | Fios: *Dívida do Clã* (prazo vencido há 3 anos), *Rival* (Lian: *vingar*), *Gratidão* (Yu). Capítulo: Crise, tensão 0,85. | O diretor funde os três fios num clímax único. |

### 7.2 Mesma vida, outra build
Outro jogador, mesma origem, mas **Venenos + defeito Mão Fechada**:
- Aos 7, na *Dívida do Pai*, uma criança não tem veneno, mas o mundo pergunta: o traço *Mão Fechada* **fecha** a opção "oferecer o que tem". Resta pedir prazo ou esconder-se.
- No *banquete do Pavilhão*, ele **envenena o credor** (opção de Venenos escrita para essa cena): a dívida some, mas o fio muda para *Crime Oculto*, e o **Pavilhão** passa a investigar. **Lian não vira rival**; no lugar dela, o inspetor **Mo Zhen** tem o objetivo *descobrir*.
- A Crise vira uma caçada. O final possível: *O Nome Que Sumiu*.
As duas vidas compartilham a origem e contam histórias claramente diferentes, porque **o mundo seguiu caminhos diferentes**.

## 8. Arquitetura e migração

### 8.1 Como o motor muda
`src/engine` continua **sem DOM**. Entram módulos novos e `pickNext` ganha um pipeline novo; o resto (reinos, rompimento, combate, trilhas, técnicas, itens) segue como está.

| Módulo | Papel |
|---|---|
| `mundo.ts` | entidades (pessoa, facção, lugar, fio), pré-história, `avançar(anos)`, registro |
| `moldes.ts` | carrega moldes, preenche papéis, texto com `{papel.campo}`, aplica efeitos de mundo |
| `relevancia.ts` | fórmula da secção 3.2 e escolha entre as 5 melhores |
| `diretor.ts` | capítulos, fases, tensão, fios, saltos de tempo |
| `ambicao.ts` | arcos de ambição, trocar de ambição, finais por ambição |
| `engine.ts` | `startLife` cria o mundo (pré-história); `pickNext` usa o diretor; sistema atual de rompimento, tribulação, reclusão e eras vira "cena de sistema" |

`State` ganha `mundo`, `diretor`, `ambicao`; mantém atributos, itens, técnicas, `rec`, `dominio`, `perfil`. Save v2 usa outra chave (`dao-mil-vidas-save-v2`).

### 8.2 Pipeline do turno (novo)
```
1. cenas de sistema obrigatórias: rompimento, tribulação                 (como hoje)
2. mundo.avançar(anos_decorridos); acumula notícias e cenas "pendentes"
3. diretor: capítulo, fase e tensão-alvo → tipos de cena aceitos agora
4. candidatas = moldes com papéis ligáveis e `quando` verdadeiro
5. R de cada candidata (3.2) → top 5 → sorteio por R²
6. se nada passa de um limiar: respiro curto + notícia do mundo
7. aplicar escolha → efeitos de mundo → fio/ambição/diretor atualizados
```

### 8.3 Simulador
`sim/` continua rodando (`validate`, `fuzz`, `endings`, `sim`, `--meta`), com o bot escolhendo entre as opções do molde. Novidades: `sim/cronica.ts` gera crônicas em texto corrido (já existe para o jogo atual); `sim/coesao.ts` mede **fios abertos e resolvidos por vida**, **reaparições de cada NPC importante**, **fração do conteúdo vinda da relevância contra respiro**, **moldes nunca escolhidos** e **divergência causal** (duas vidas com a mesma semente e uma decisão diferente no início: quantas cenas posteriores diferem *e* se ligam à decisão por memória ou fio).

### 8.4 Plano de migração do conteúdo atual
| Hoje | Vira |
|---|---|
| Cadeias de NPC (`npc_*`, ~30), rival (`rival_*`), `torneio_*`, `guerra_*`, `filho_*→cla_*`, `mestre_*` | **Arcos** com a pessoa como entidade (papéis `{mentor}`, `{rival}`…); cada ramo vira estado (aceitou/recusou), sem texto "se você… se não…" |
| Origens (`og_*`, `og2_*`) | Condições iniciais da pré-história + cenas de personagem com papéis |
| Talentos e defeitos (`tl_*`, `fl_*`) | Cenas de personagem (só aparecem com o traço) e **opções escritas dentro de cada cena** |
| Cenas de trilha (`tp_*`, `lote9`, `lote19`) | Moldes de trilha (`marca do build`) |
| Cenas de região, mundo, reinos | Moldes com lugar e facção como papéis |
| Festivais, mercado, colheita, meditação | Respiros curtos |
| `opcoes.ts`, moldes de técnica e de traço (opções coladas) | **Removidos** |
| `afinidades.ts` e peso ×2,2 | **Removidos** (substituídos por relevância) |
| `marcas_vida.ts` e `registrarSoPerfil` | Ficam só como enfeite do resumo final; **não contam como consequência** |
| Finais | Mantidos; escolhidos por ambição, fios e estado |

### 8.5 O que não muda
Trilhas e recursos, escadas de reino, sensação de poder, duelos animados, os 3 estilos de arte e o seletor, aparência pela fração da vida, técnicas com domínio e fusão, itens, Herança, autoria e LICENSE, PWA e APK.

## 9. Fases, riscos e como medir sucesso

### 9.1 Fases
- **Fase 2 (branch `reestruturacao`)**: núcleo jogável com mundo, relevância, diretor, capítulos e ambições; ~30 moldes bem escritos; 3 arcos completos (rival, reerguer/vingar o clã, ascensão numa seita), 1 ambição por arco; opções por build dentro de cada cena; build de teste em `/v2/` com save separado; 5 crônicas em `docs/cronicas/`. **Parar e esperar seu feedback.**
- **Fase 3**: converter o conteúdo atual em lotes, com crônicas novas e relatórios a cada lote; merge na main só com sua aprovação.

### 9.2 Riscos
| Risco | Como tratamos |
|---|---|
| Custo de escrita: cada molde pede cena + várias opções por build | Poucas cenas, bem escritas; as opções de build são por cena e raras; cenas que não ganham opção de um traço simplesmente não a têm |
| Conteúdo que nunca sai (o risco da saliência) | `sim/coesao.ts` lista moldes nunca escolhidos; painel de depuração mostra o mundo e a lista de candidatas com R |
| Cena poderosa em hora errada | Diretor (fases e capítulos) e `ritmo` zerando o que não cabe |
| Estado oculto demais | Painel `?debug=mundo` com pessoas, facções, fios, opinião e memória em texto |
| Vidas parecidas por falta de moldes | Pré-história e traços criam mundos diferentes; relevância usa urgência de pessoas diferentes |
| Mais conteúdo, menos coesão (o erro de hoje) | Congelamos conteúdo novo até o núcleo existir; só entram moldes com papéis e opções escritas à mão |

### 9.3 Como vou medir (sem metas fáceis de burlar)
**O critério é a leitura de crônicas, por você e por outra IA.** Perguntas: dá para contar a vida como história? As pessoas lembram do que fiz? Uma decisão do começo muda o depois? Builds diferentes contam histórias diferentes? Cada opção exclusiva faz sentido *naquela* cena? Nenhum evento aparece do nada?
Números de apoio, nunca metas: fios abertos e resolvidos por vida; reaparições de cada NPC importante; % de cenas vindas de relevância contra respiro; moldes nunca escolhidos; divergência causal entre vidas pareadas. Os de equilíbrio atuais (ascensão 0,5–2%, finais ≤ 35%, nenhuma trilha dominando) continuam como **verificação de segurança**, não como objetivo.

## 10. Decisões para você aprovar antes da Fase 2
1. **Escala do mundo**: ~12–30 pessoas ativas, 6–9 facções, ~14 lugares por vida. Serve?
2. **Ambição**: proposta no fim da Infância (2–3 opções) e trocável a custo. Ou você prefere escolher na criação do personagem?
3. **Contadores de histórias** (sereno, cruel, caótico) como opção de dificuldade: entram agora ou depois?
4. **Os 3 arcos da Fase 2**: rival, reerguer/vingar o clã, ascensão numa seita. Quer outros?
5. **Morte permanente de pessoas importantes** (mentor, amigo, amor, rival): sim, com cena própria?
6. **Cenas de sistema** (rompimento, tribulação, reclusão): ficam como estão, com notícia do mundo no retorno.
7. **Build de teste**: pasta `/v2/` no site com save separado, e APK de teste com outro nome. Combinado?
