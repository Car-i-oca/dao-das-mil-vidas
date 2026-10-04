# Diagnóstico: por que o Dao das Mil Vidas parece aleatório e sem coesão

Fase 0 da reestruturação. Texto curto e honesto, com números medidos no jogo atual (915 eventos) e três crônicas reais (as vidas completas estão em `docs/cronicas-v1/`, geradas por `npx tsx sim/cronica.ts <semente>`).

## 1. Por que o jogo parece aleatório

### 1.1 O sorteio não olha para a história
A cada turno o motor (`pickNext`, `src/engine/engine.ts`) faz três coisas: (1) filtra os eventos que passam nas condições (idade, reino, trilha, flags); (2) multiplica um peso por raridade, por afinidade do build, por fadiga de repetição e por penalidade das vidas anteriores; (3) sorteia um. **Nada nessa conta pergunta "o que está acontecendo na vida dessa pessoa agora?"**. Um inimigo jurado e forte que está a três dias de distância não pesa mais que uma colheita de arroz. A única continuidade vem de `agenda` (um evento que agenda outro para daqui a N anos) e de flags nas condições.

### 1.2 Cada evento é uma ilha
Dos 915 eventos, **625 (68%) não dependem de nenhuma flag nem de nenhum agendamento**: podem sair a qualquer momento, em qualquer vida compatível com a idade e o reino. Só 300 tocam em algum estado, e só 184 agendam outro evento. Os eventos não conhecem quem a pessoa se tornou, e os textos que tentam compensar isso viram frases em cima do muro. Exemplo real (crônica 1, ano 24): "Xu Zhining aparece de novo. *Se você o aceitou*, traz uma lição dura… *Se o recusou*, ele só observa de longe". O jogador recusou; no ano 62 ele ainda "chega ao fim da vida" e deixa um legado que "depende de quem você foi para ele". O texto cobre as duas histórias porque o motor não sabe qual delas aconteceu.

### 1.3 As pessoas não existem entre as cenas
Um NPC é um marcador de texto (`{mentor}`, `{rival}`, `{amor}`) mais uma flag. Não tem idade, objetivo, reino que cresce, nem opinião sobre o jogador, nem memória. Por isso os fios se contradizem: na crônica 1 o jogador agradece a dança e segue seu caminho (ano 57), e no ano 72 o evento seguinte da cadeia afirma que "Duan Haozhao e você encontram um jeito de se ver". Só 84 dos 915 eventos têm algum papel de NPC no texto.

### 1.4 Os moldes genéricos criaram o efeito "colado por palavra-chave"
`src/data/opcoes.ts` e os moldes de talento, defeito, origem, raiz, trilha e técnica injetam opções em eventos por regex do texto. Resultado medido:

| Medida | Valor |
|---|---|
| Escolhas escritas à mão | ~2.157 |
| Escolhas injetadas por molde | **109.690 (98% de todas)** |
| Textos distintos de escolhas injetadas | 316, repetidos em até **513 eventos cada** |
| Exemplos do que sai | "Forçar passagem com Ossos de Ferro Frio: o corpo abre o caminho" em 500 eventos; "Pegar logo, antes que alguém pense duas vezes" em 513 |

Nas crônicas isso aparece o tempo todo. Crônica 2 (guarda do reino): *"Falar com os guardas e soldados como quem é um deles"* é a opção de **A Aprendiz da Curandeira**, de **A Estrela Cadente** e de **O Vendedor de Mapas**; *"Reconhecer o lugar, o objeto ou a pessoa de outra era"* aparece no poço assombrado, na madeira que cura e na oficina do ferreiro; *"Chamar a lembrança de uma vida passada"* é a solução para a **Fome nos Campos**. Crônica 1 (alquimista): *"Refinar uma pílula com o que tem à mão"* sai em 7 eventos que não têm nada a ver com pílulas (o mapa rasgado, o primeiro voo, o rumor na estalagem, a dor dos meridianos, um duelo na praça). Aos 7 anos, diante de um cobrador de dívidas, o jogador "concentra todo o Qi num fio e acerta um ponto só". Crônica 3 (pescador): *"Ler o céu e a maré"* resolve o **Ladrão de Galinhas**, a **Volta para Casa** e, no ano 967, o **Manual no Fundo do Poço Queimado**.

A causa é a abordagem, não o texto: uma opção só faz sentido dentro de **uma cena**; escrita para "qualquer cena do tipo combate/social/perigo" ela nunca serve a nenhuma. O sistema também falha na própria meta: as vidas com talentos e defeitos diferentes continuam contando a mesma história (semelhança entre vidas de mesma trilha: 0,197 com os mesmos traços e 0,159 com traços diferentes; a diferença vem de opções injetadas diferentes, não de acontecimentos diferentes).

### 1.5 As consequências viraram frase de resumo
O jogo grava **753 flags**; só **151 (20%)** são lidas por algum evento. As outras ~600 foram "resolvidas" em `marcas_vida.ts`, que as transforma em linhas do resumo final ("O que você deixou para trás"). Isso zera a métrica de "flags nunca lidas" sem que nada no jogo reaja à escolha. A mesma lógica vale para `registrarSoPerfil`: decisões que só mexem no perfil de conduta ganham uma flag que só aparece no fim.

### 1.6 Falta ritmo e falta fim de cena
- **Tempo morto**: na crônica 2 (127 eventos), **29 são o cartão "Gargalo" e 14 são "Reclusão": 34% da vida em duas cartas repetidas**, sempre com o mesmo desfecho ("Você recolhe o Qi e espera. Os dias passam"). Nos anos 323, 326 e 338 o jogador lê o mesmo "Acumular mais alguns anos antes de tentar" três vezes em 15 anos.
- **Fios abertos que somem**: a crônica 1 termina em Cinzas da Tribulação (ano 77) com três órfãos da febre sem destino, um mestre morto e um amor secreto sem desfecho, uma dívida de clã cobrada no ano 7 que nunca mais aparece, e uma mulher demoníaca que salvou a vida do jogador e nunca volta.
- **Evento repetido**: "O Duelo de Alquimistas" sai duas vezes na mesma vida (anos 33 e 66), com resultados diferentes e sem que a segunda lembre da primeira.
- **Finais que contradizem a vida**: crônica 3, o jogador *procura o Culto e oferece seus serviços* (ano 1026) e o final é "Caçado pelo Culto".
- **Sem capítulos nem pergunta dramática**: a vida é uma fila de cenas; não há "agora estamos no ato em que você decide se vinga o clã".

## 2. Inventário: manter, converter ou descartar

### 2.1 Manter (está bom e é independente do sorteio)
| O quê | Por quê |
|---|---|
| Trilhas e seus recursos (`rec`: Pureza do Qi, Intenção de Espada, Têmpera do Corpo…) | Identidade mecânica real; viram traços que o mundo enxerga |
| Escadas de reinos, sensação de poder, `poder` por reino, marcos t1–t8 | Dão a espinha de progressão; os marcos já são "o mundo reage ao seu reino" |
| Combate, duelos animados, efeitos por técnica | Funcionam e são o ponto alto visual |
| Técnicas com domínio, fusão e reação do mundo por etiqueta | Já têm a lógica certa; falta o mundo ter quem reaja |
| Itens e Códice, conquistas, Herança | Meta-progressão e coleção |
| Arte (3 estilos), aparência pela fração da vida, PWA e APK, autoria | Fora do escopo da reestruturação |
| Perfil de conduta (8 virtudes) e alcunha | Vira **personalidade do jogador** que as pessoas enxergam (não substituto de consequência) |
| Finais com evento próprio (~90) | Texto bom; precisam ser religados a ambições e fios resolvidos |

### 2.2 Converter em arcos (já têm coesão e viram arcos no sistema novo)
São as cadeias que já encadeiam por `agenda` + flags e leem o que veio antes:

| Cadeia | Eventos | Nota de coesão |
|---|---|---|
| `npc_mentor_1..5` | 5 | Melhor cadeia do jogo, mas hesita entre ramos (ver 1.2): precisa saber se o mentor foi aceito |
| `npc_rival_1..5`, `rival_aparece_crianca → rival_reaparece → rival_vinganca_final`, `rival_interno → desafio → rival_ascendido`, `inimigo_humilhado_retorna`, `rival_na_ruina` | ~14 | Três versões do mesmo rival: unificar em **uma pessoa** que sobe de reino |
| `npc_amigo_1..5` (Fu Shanxin na crônica 2 funciona: carta, pedido de ajuda) | 5 | Bom; falta opinião e memória real |
| `npc_amor_1..5`, `amor_decisao`, `festival_meio_outono` | ~7 | Contradiz a escolha de não aceitar o amor (crônica 1) |
| `npc_disc_1..5`, `mestre_ve_talento` | 6 | Bom (erro, supera o mestre, legado) |
| `npc_inim_1..5`, `inimigo_humilhado_retorna` | 6 | Vingança ou perdão: já é um arco de ambição |
| `filho_nasce → filho_adolescente → filho_parte → filho_retorna → cla_proprio_proposta → cla_prospera` | 6 | Linhagem; vira arco "fundar um clã" |
| `torneio_*` (inscrição → preliminares → oitavas → semifinal → final → depois) | 7 | Cadeia de fluxo fechado por flags: modelo de arco bem feito |
| `guerra_*` (linha de frente, refugiados, espião, trégua, ponte) | 5 | Vira conflito entre facções |
| `mestre_protetor → ensina_técnica / pede_favor → em_perigo` | 3–4 | Vira vínculo com um mestre-pessoa |
| Cadeias de seitas extintas (`tc_*`), sangue/demoníaca (`sangue_*`, `pacto_*`, `banquete_*`, `cena_sombra_sangue`) e eco/reencarnação (`lote11_ecos`, `lenda_de_eco`, `inimigo_do_antecessor`) | ~25 | Já são mini-histórias com flag de entrada |
| Origens (`og_*`, `og2_*`, 69 + 42) e traços (`tl_*` 56, `fl_*` 45) | 212 | Boa matéria-prima de **cenas de personagem**; viram moldes que só aparecem para quem tem o traço e com participantes certos |

### 2.3 Converter em moldes com relevância (storylets)
Cenas autocontidas que dependem de lugar, reino ou trilha e podem ser puxadas quando o estado pedir: trilhas (`lote9`, `lote19` `tp_*`: 63 eventos), regiões e mundo (`lote4`, `lote6`, `lote7`, `lote10`, `lote13`: ~120), reinos 1–8 (`r1..r8`, `lote2`, `lote15..18`: ~150), juventude (`lote8`), seita (`lote1`), jianghu, mitologia, forjas/formações. Cada uma ganha **papéis** (quem é o rival, qual é a facção) em vez de texto fixo.

### 2.4 Virar "respiro" (curtos, só entre momentos importantes)
Festivais (`festival_*`), "Dias de Trabalho", "Dia de Mercado", "Meditação Profunda", "Gargalo/Acumular", "Reclusão", colheita, casamento na vila, tempestade, estrela cadente, juiz do vilarejo, banquetes. Hoje são ~40% dos turnos (métrica `genericosNosTurnos` do `sim/variedade.ts`; na crônica 2, os cartões "Gargalo" e "Reclusão" sozinhos somam 34%); no sistema novo só ocupam a calmaria entre capítulos e perdem o peso.

### 2.5 Descartar
| O quê | Motivo |
|---|---|
| `src/data/opcoes.ts` (moldes por categoria/regex) e `moldes_tecnicas.ts`, `lote30_trilhas_molde.ts` e os moldes dentro de `lote26`–`lote29` | Fonte das 109.690 opções coladas |
| `afinidades.ts` e o peso "traço ×2,2" em `pickNext` | Substituídos por relevância declarada em cada molde |
| `marcas_vida.ts` como substituta de consequência e `registrarSoPerfil` | Podem sobrar como enfeite do resumo final, mas deixam de contar como "marca" |
| Textos em cima do muro ("Se você o aceitou… se recusou…") | Reescritos como variantes por estado ou por papel |
| Duplicatas (ex.: "O Duelo de Alquimistas" duas vezes; vários "Gargalo" iguais) | Cenas únicas por vida, ou variantes que lembrem da anterior |
| Métricas que podem ser fraudadas (escolhas sem marca, flags não lidas, Jaccard) | Substituídas por leitura de crônicas e por números de apoio (ver `design-v2.md`) |

### 2.6 Itens, técnicas e finais
- **Itens**: manter. O mundo passa a enxergá-los (um artefato de seita extinta atrai os herdeiros dela).
- **Técnicas**: manter domínio e fusão. Passam a ser *traços* que as pessoas reconhecem ("alguém viu seu Punho do Vajra").
- **Finais**: manter o texto, mas escolhidos pela **ambição cumprida, traída ou abandonada** e pelos fios resolvidos, não só por estado numérico.

## 3. Três crônicas reais, com comentários
As vidas completas estão em `docs/cronicas-v1/`. Abaixo, os trechos que mostram o problema. **⚠** marca onde a história perde o sentido; **✓** marca onde funciona.

### Crônica 1: Feng Xuexin, alquimista, Herdeiro de um Clã Decadente (56 eventos, morre aos 77 na tribulação)
- Ano 7 · *O Cobrador de Dívidas*: "Seu pai/mãe deixou dívidas." → *Concentrar todo o Qi num único fio e acertar um ponto só.* "O inimigo cai." **⚠** Uma criança de 7 anos, sem Qi despertado, derruba o cobrador com técnica de Qi; e a dívida (o gancho da origem) nunca mais é mencionada.
- Ano 11 · *O Manual do Cofre*: acha o manual do ancestral e desperta o Qi. **✓** Boa cena de origem que explica o despertar.
- Anos 14–18: o mendigo, o estranho Xu Zhining, o mapa rasgado, um mercado, a praga da aldeia. **⚠** Quatro "gatilhos" de arco abertos em 4 anos (mapa em três pedaços, mendigo, mestre, praga) sem nenhum ligado ao outro. *O mapa* é "refinado com o Caldeirão" (opção colada) e nunca volta.
- Anos 24 a 62 · arco de Xu Zhining **✓/⚠**: é a cadeia mais coesa (observador → lição → segredo → prova → despedida), e o jogador sente que "alguém" o acompanha por 40 anos. Mas o jogador o recusou nos dois primeiros encontros e o arco segue como se o tivesse aceitado.
- Ano 32 · *A Mão Que Salvou*: uma mulher da seita demoníaca o salva e deixa uma pílula. **⚠** Nunca volta; a seita demoníaca não reage a ter salvo um Ancião.
- Anos 44–45: praga → *Vender remédios caros a quem tiver pressa* → *Os Órfãos da Febre* → *Improvisar um remédio com o Caldeirão: o frasco errado*. **⚠** Ele lucrou com a praga e logo depois as crianças da praga batem à porta, sem que o motivo seja dele; a opção é um molde de alquimia colado; as crianças nunca mais aparecem.
- Ano 57–72 · *Quem Dançou na Noite das Lanternas*: **⚠** recusa a dança; 15 anos depois "vocês encontram um jeito de se ver", como se nada tivesse sido recusado.
- Anos 33 e 66 · *O Duelo de Alquimistas* duas vezes. **⚠** Repetição sem memória; no primeiro a opção ("memorizar o texto inteiro") não tem relação com pílulas.
- Final: **⚠** morre na tribulação aos 77 com 5 fios abertos (dívida, órfãos, mulher demoníaca, mapa, amor). O final não menciona nenhum.

### Crônica 2: Bai Ruofeng, Caminho do Mérito, Filho de um Guarda do Reino (127 eventos, 341 anos)
- Anos 6–18, infância: **✓/⚠** Ótimas pequenas cenas (a carpa dourada que devolve uma moeda, o ladrão de galinhas com quem divide o jantar e que "anos depois será lembrado com carinho em outra aldeia"). A promessa nunca é cumprida: o ladrão e a carpa nunca voltam.
- Ano 6 · *Inverno de Fome*: *Aplicar a disciplina militar aprendida com o pai.* **✓** A origem (filho de guarda) dá uma opção que faz sentido.
- Ano 14 · *O Pai Ferido* → *Assumir o posto do pai*. **✓** Escolha forte, com prêmio concreto. **⚠** O pai nunca mais é mencionado; a família não reage ao jogador ter virado guarda aos 19.
- Anos 12, 16, 31 e 39: *Reconhecer o lugar, o objeto ou a pessoa de outra era* aparece no poço assombrado, na madeira que cura e na oficina do ferreiro; *Falar com os guardas e soldados como quem é um deles* aparece na curandeira, na estrela cadente e no vendedor de mapas. **⚠** Os dois moldes enchem a vida de opções que "dão informação, passagem ou benefício da dúvida" onde ninguém pediu informação.
- Anos 27–34 · Fu Shanxin: carta, depois pede ajuda, o jogador ajuda "com dinheiro, mas mantendo distância", ele "deixa um recado". **✓** Pequena história de amizade com custo emocional. **⚠** Termina ali; o amigo nunca volta, mesmo prometendo.
- Ano 24 · *O Caçador e a Fera Ferida*: **⚠** a opção é "Alternar os dois elementos no meio da luta" numa cena sem luta (uma raposa ferida).
- Contagem da vida inteira: 29 "Gargalo" + 14 "Reclusão" em 127 eventos (34%). Anos 323, 326 e 338: *Acumular mais alguns anos antes de tentar* com o mesmo texto. **⚠** Tempo morto: um terço da vida é a mesma carta.
- Final: *O Sábio da Montanha*. **⚠** É um bom título, mas não cita o amigo, o pai, a infância, nada.

### Crônica 3: Tang Anzhao, Caminho da Consciência, Pescador dos Mares Sem Fim (212 eventos, 1.029 anos)
- Anos 6–24: **✓** A origem funciona melhor aqui: a tempestade no mar, o barco emprestado, o velho marujo, a ilha de cristal. As opções de pescador fazem sentido nessas cenas.
- **⚠** Mas "Ler o céu e a maré" resolve *O Ladrão de Galinhas* (ano 19), *A Volta para Casa* (31) e *O Manual no Fundo do Poço Queimado* (ano 967); *Negociar com gente do porto* resolve *O Viajante na Porta* e *A Fome do Cultivador*.
- Ano 36 · *A Serpente Cobra o Que Seu Pai Devia*: **✓** Um dos melhores momentos (a origem produz uma dívida e uma missão, "o caminho leva meses"). **⚠** A pérola, a ilha dos mil sinos e "quem a espera" nunca aparecem de novo.
- Salto de ~170 eventos (do ano 41 ao 934, quase 900 anos) que o trecho acima omite. **⚠** O que aparece no começo do trecho final são retiros de 30 e 52 anos ("alguém bateu à porta duas vezes; você não ouviu"): o tempo passa, e nada do que o jogador viveu antes é cobrado.
- Ano 1026 · *O Culto do Trono Escarlate*: *Procurar o Culto e oferecer seus serviços* → marca gravada no pulso. Final: *Caçado pelo Culto* ("só se viu uma casa vazia e uma xícara de chá, ainda morna"). **⚠** O jogador entrou no Culto e o final diz que foi caçado por ele.

## 4. Conclusão do diagnóstico
1. O jogo é um **saco de eventos** com três ou quatro cadeias boas boiando dentro dele. As cadeias funcionam porque **um evento sabe do outro**; o resto não sabe de nada.
2. As **opções injetadas** são um defeito de método (opção escrita para uma categoria, não para uma cena) e precisam sair, não só ser melhoradas.
3. O que falta não é conteúdo, é **estado do mundo**: pessoas que existem entre as cenas, facções que andam sozinhas, um diretor que escolha o momento certo e uma ambição que dê direção à vida.
4. O conteúdo atual é aproveitável: as cadeias de NPC e as cenas de origem/traço são ótimas matérias-primas para o formato novo. O problema é de **estrutura**.

O desenho da solução está em `docs/design-v2.md` (Fase 1).
