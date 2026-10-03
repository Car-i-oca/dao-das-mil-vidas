# Lotes de conteúdo

Cada lote: pesquisa na web de um tema → conteúdo original no formato de `docs/eventos.md` → `npm run validate` + `npm run sim -- 4000` + `npm run sim -- 4000 --meta` → comparação com `docs/balanceamento.md` → commit.

Faixas de aceitação: ascensão entre 0,5% e 2% (nos dois modos); nenhum evento novo que nunca aparece (lendários podem ser raríssimos, mas aparecem); nenhum item, técnica ou trilha domina; finais e reinos sem saltos bruscos.

---

## Lote 1 — Vida na seita
**Pesquisa:** hierarquia de seitas (discípulo externo → interno → núcleo → Ancião → Patriarca), pontos de mérito e Pavilhão de Missões, favoritismo de anciãos, torneios, intercâmbio entre seitas e disputas por recursos. Fontes: [Cultivation Sects: Hierarchies & Power in Xianxia](https://xiuxian0.com/sects/complete-guide-cultivation-sects/), [Common Xianxia Web Novel Tropes](https://xiuxian0.com/web-novels/xianxia-web-novel-tropes/), [How to Build a Xianxia Sect or Clan](https://xianxiavault.com/guides/sect-worldbuilding).

**Entrou:** 29 eventos (`lote1_seita.ts`), 3 técnicas, 5 itens, 1 final (Patriarca da Seita), 1 conquista (Manto de Séculos).
- Cadeias: rival interno (`rival_interno` → `rival_interno_desafio`); espião (`espiao_infiltrado` → `conspiracao_anciao`); novato gentil (`discipulo_novato` → `junior_retorna`); favor do Mestre (`mestre_pede_favor` → `mestre_em_perigo`); núcleo (`prova_do_nucleo` → `privilegios_do_nucleo` → `sucessao_seita` → final Patriarca).
- Ajustes ao conteúdo antigo: pesos maiores em `mestre_ve_talento` e `prova_discipulo_interno` (as cadeias dependiam deles).

**Resultado das simulações (4.000 vidas):** ascensão 0,8% (independente) e 1,8% (meta); finais e reinos sem mudança relevante; os 29 eventos aparecem (os mais raros: `mestre_em_perigo`, `sucessao_seita`). Patriarca fica em ~0% porque o bot evita finais voluntários; humanos devem escolhê-lo.

**Ajustes de calibração feitos antes do lote:** `finalChance` 0,09; ganho de Herança limitado por idade; dois novos sumidouros de Herança (Mais Destinos, Memória de Vidas Passadas).

---

## Lote 2 — Reinos secretos, ruínas e bestas míticas
**Pesquisa:** reinos secretos que abrem por poucos dias, supressão de reino, guardiões, provas de herança, tesouros com prazo, ruínas com armadilhas; criaturas do Clássico das Montanhas e Mares (Bai Ze, raposa de nove caudas, Qilin, Jingwei, Zhulong). Fontes: [50 Cultivation Novel Tropes](https://xiuxian0.com/web-novels/cultivation-novel-tropes/), [Spirit Cultivation Genre (TV Tropes)](https://tvtropes.org/pmwiki/pmwiki.php/Main/SpiritCultivationGenre), [Shanhai Jing Creatures](https://shanhai0.com/divine-beasts/complete-guide-shanhaijing-creatures/), [Complete Guide to Shanhai Jing](https://shanhai0.com/cosmology/complete-guide-shanhai-jing/).

**Entrou:** 23 eventos (`lote2_reinos.ts`), 4 técnicas, 6 itens, 1 final (Guardião do Reino Secreto), 1 conquista (A Pergunta do Portão).
- Arco em 4 partes: `rumor_reino_nevoa` → `reino_nevoa_entrada` → `reino_nevoa_guardiao` → `reino_nevoa_heranca` (final Guardião opcional).
- Ruínas: tumba do general, cidade afundada, altar do sol, biblioteca enterrada, forja abandonada, jardim do imortal (lendário).
- Bestas míticas: raposa de nove caudas, Bai Ze (lendário), Qilin (lendário, exige karma ≥ 20), Jingwei, Zhulong (lendário), cervo celeste, montanha dos nove picos.
- Provas: espelho, peso, três portas, silêncio; corrida contra o fechamento do reino; `rival_na_ruina` retoma a rivalidade de infância.

**Resultado (4.000 vidas):** ascensão 1,1% (independente) e 1,9% (meta); todos os 23 eventos aparecem nos dois modos; nenhum item ou técnica novo foge do padrão (Olhar de Bai Ze, lendária, mostra +16 pp de reino relativo, mas com viés de sobrevivência e apenas ~2% das vidas).

---

## Lote 3 — Alquimia, ervas e forja
**Pesquisa:** graus de pílulas (1–9), ervas com idade (100 e 1.000 anos), fornalhas encantadas que melhoram com o uso, ranks de alquimista; graus de artefatos (instrumento mágico → artefato → tesouro → tesouro espiritual) e as quatro etapas do refino (fundição, têmpera, forma, vínculo do espírito). Fontes: [Alchemy (xianxialitrpgwiki)](https://xianxialitrpgwiki.com/alchemy/), [Pill furnace](https://jiu-xing-ba-ti-jue-nine-star-hegemon-body-art.fandom.com/wiki/Pill_furnace), [Weapon Grades in Cultivation Fiction](https://xiuxian0.com/weapon-refining/weapon-grades-ranking/), [Weapon Refinement Method](https://btftliaw.fandom.com/wiki/Weapon_Refinement_Method_Cultivation_World_Type).

**Entrou:** 24 eventos (`lote3_alquimia.ts`), 3 técnicas, 7 itens, 1 final (A Pílula Suprema), 1 conquista (Alquimista Absoluto).
- Ervas: erva disputada, colheita sob a lua de prata, raiz de mil anos guardada, secagem de ervas.
- Alquimia: fornalha herdada que cresce, receita perdida (→ flor onde o raio caiu), exame de Mestre, pílula envenenada, duelo de alquimistas, aprendiz (→ retorno), cura do Imperador, Pílula Sem Nome (lendário, com final).
- Forja: arco do Artefato Natal em quatro etapas (fundição → têmpera → forma → vínculo do espírito, com ramo de falha), ferro celeste, espada que escuta, armadura de escamas, artefato amaldiçoado, leilão raro.

**Calibração:** `finalChance` reduzido de 0,09 para 0,07 para manter margem (o modo meta estava em 2,0%).

**Resultado (4.000 vidas):** ascensão 0,8% (independente) e 1,7% (meta); todos os eventos novos aparecem; os mais raros são `aprendiz_alquimista` e `aprendiz_retorna` (exigem alquimia + Mestre alquimista). O artefato natal e o Espelho de Bronze figuram entre os mais presentes nos mortos de reino alto, mas com ascensão dentro da média (viés de sobrevivência).

---

## Lote 4 — Mundo mortal, impérios, companheiro do Dao e família
**Pesquisa:** jianghu e mundo mortal convivendo com seitas; cortes e dinastias que cultivadores influenciam; companheiro do Dao, "family cultivation" e clãs que crescem por gerações (sem conteúdo sexual). Fontes: [Cultivation Sects: Hierarchies & Power in Xianxia](https://xiuxian0.com/sects/complete-guide-cultivation-sects/), [Naming Sects and Clans in Wuxia and Xianxia](https://cultivatingdragons.com/naming-sects-and-clans-in-wuxia-and-xianxia/), [Family Cultivation: Ascending to Immortality](https://www.novelupdates.com/series/family-cultivation-ascending-to-immortality/), [Leaving A Legacy](https://www.royalroad.com/fiction/147117/leaving-a-legacy-a-xianxia-story).

**Entrou:** 26 eventos (`lote4_mundo.ts`), 2 técnicas, 3 itens, 2 finais (Ancestral do Clã, A Sombra do Trono), 2 conquistas.
- Família em 8 gerações de eventos: `pedido_de_casamento` → `filho_nasce` → `filho_adolescente` (teste de raiz) → `filho_parte` → `filho_retorna` → `cla_proprio_proposta` → `cla_prospera` (final Ancestral); doença e luto do companheiro (`doenca_companheiro` → `luto_e_caminho`).
- Corte: `corte_imperador` → `imperador_imortalidade`; `conselheiro_imperial` (lendário, final Sombra do Trono); `general_rebelde`; `dinastia_cai` (lendário).
- Jianghu: torneio mortal sem Qi, cavaleiro andante, irmãos jurados (`irmaos_jurados` → `irmao_pede_ajuda`), rede de mendigos, guilda de mercadores, juiz do vilarejo, fome no reino, mina de prisioneiros.

**Calibração:** com 267 eventos o pool diluiu cadeias de lotes anteriores; subi os pesos de `mestre_pede_favor`, `prova_do_nucleo`, `privilegios_do_nucleo`, `sucessao_seita`, `aprendiz_alquimista` e `rank_alquimista`. `finalChance` 0,075.

**Resultado (4.000 vidas):** ascensão ~0,6–0,7% (independente) e ~1,7% (meta); todos os eventos do lote aparecem. Os finais voluntários novos ficam em ~0% no bot (que os evita) mas são alcançáveis (`cla_prospera` aparece ~4× por 4.000 vidas; os eventos que levam ao final de Ancestral aparecem normalmente).

---

## Lote 5 — Caminho demoníaco, karma e inimigos
**Pesquisa:** seitas demoníacas (sacrifício de sangue, refino de almas, técnicas proibidas), divisão justo × demoníaco, demônio interior e retribuição cármica. Fontes: [Demon Sect (xianxialitrpgwiki)](https://xianxialitrpgwiki.com/demon-sect/), [Demonic Cultivation](https://ranmafanon.fandom.com/wiki/Demonic_Cultivation), [Grandmaster of Demonic Cultivation](https://en.wikipedia.org/wiki/Grandmaster_of_Demonic_Cultivation), [Reverend Insanity](https://en.wikipedia.org/wiki/Reverend_Insanity).

**Entrou:** 24 eventos (`lote5_sangue.ts`), 2 técnicas, 4 itens, 2 finais (Senhor do Sangue, O Penitente), 2 conquistas.
- Seita demoníaca: `entrada_seita_demoniaca`, `prova_de_sangue`, `mestre_demoniaco_exige`, `lago_de_sangue`, `traicao_mestre_demoniaco` (→ `senhor_do_sangue` / `tregua_sangue`), `coracao_dividido` (→ `perseguidor_demoniaco`), `purgacao_cidade`, `pacto_demonio_antigo`, `caminho_cinzento` (lendário).
- Karma: `viuva_vinganca` → `filho_da_viuva` (o filho que volta décadas depois), `espiritos_vingativos`, `tumulo_vitima`, `emboscada_tres_seitas`, `cacador_implacavel`, `lista_negra`, `carta_anonima`, `rival_ascendido`, `o_grande_inimigo` (lendário) e `penitente` (lendário, final de redenção).

**Correções e calibração:**
- Bug encontrado: ninguém recebia a flag `membro_demoniaca` (nem a trilha do Sangue, nem a oferta, nem o despertar demoníaco), então os arcos demoníacos nunca apareciam. Corrigido no motor (`tierUp`) e nos eventos.
- Bug em `filho_da_viuva` (condição vazia deixava o evento sortear a qualquer hora): agora exige a flag `chen_vinganca`.
- A trilha do Sangue converte só 60% do ganho de Corrupção (compensa o cultivo mais rápido). Sem isso, o final "Caminho Demoníaco" ia de 0,6% para 1,8%.
- Pesos de elos raros ajustados (`coracao_dividido`, `traicao_mestre_demoniaco`, `tregua_sangue`, `senhor_do_sangue`, `luto_e_caminho`, `o_grande_inimigo`).

**Resultado (4.000 vidas):** ascensão 0,6% (independente) e 1,8% (meta); "Caminho Demoníaco" 1,1% / 0,6%; todos os eventos aparecem nos dois modos (exceto os 4 que dependem de desbloqueio no modo independente).

---

## Lote 6 — Budismo, mérito e Peregrinação ao Oeste
**Pesquisa:** samsara e os seis reinos de renascimento, mantras, vajra, mérito e karma, as 81 provações de *Jornada ao Oeste* (peregrinação, demônios disfarçados, retribuição). Fontes: [What is Samsara? (Lion's Roar)](https://www.lionsroar.com/buddhism/samsara/), [Vajrayana Buddhism for Beginners](https://tricycle.org/buddhism-vajrayana/), [Journey to the West (mythlok)](https://mythlok.com/epics/journey-to-the-west/), [Journey to the West (EBSCO)](https://www.ebsco.com/research-starters/history/journey-west/), [Glossary of Terms in Wuxia, Xianxia & Xuanhuan](https://immortalmountain.wordpress.com/glossary/wuxia-xianxia-xuanhuan-terms/).

**Entrou:** 22 eventos (`lote6_oeste.ts`), 3 técnicas, 4 itens, 1 final (A Iluminação), 1 conquista (Despertar Sem Degraus). Personagens, lugares e cenas são originais; só a estrutura de peregrinação e as ideias budistas são tradicionais.
- Peregrinação ao Oeste em 6 etapas: `chamado_peregrinacao` → `peregrinacao_rio_areias` → `peregrinacao_prisioneiro` → `peregrinacao_demonio_disfarcado` → `peregrinacao_reino_fome` → `peregrinacao_templo_oeste` (lendário; final Iluminação, ou a Escritura do Oeste).
- Prática: mantra de cem mil voltas, koan do mestre, oferenda ao templo, voto de não matar (→ `quebra_do_voto`), pagode de sete andares, caverna dos mil budas, jardim dos lótus, sino da meia-noite.
- Karma e seres: visão dos seis reinos (lendário), fantasma faminto, mendigo bodhisattva, transferência de mérito, monge corrompido, árvore Bodhi (lendário), corpo de vajra.

**Resultado (4.000 vidas):** ascensão 0,7% (independente) e 1,6% (meta); a Iluminação sai em 0,2% / 0,1% das vidas; todos os eventos aparecem (exceto os dependentes de desbloqueio no modo independente). A técnica Sutra do Céu Vazio é a que mais cresce no impacto (+20 pp de reino relativo), mas só aparece em ~2% das vidas e a ascensão dos que a têm fica em 2–3%.

---

## Lote 7 — Regressão, o "sistema" e o Céu
**Pesquisa:** regressores com memórias do futuro, quadro de status/missões/penalidades dos manhwas (murim e fantasia), Dao Celestial, tribulação do coração, corte celeste burocrática e o efeito do karma na dificuldade da tribulação. Fontes: [Best Regression Manhwa](https://www.themanhwadude.com/lists/best-regression-manhwa), [10 Best Murim Manhwa With Regression](https://novelnodes.com/best-murim-manhwa-with-regression/), [Heavenly Tribulation and Ascension](https://xiuxian0.com/realms/tribulation-and-ascension/), [Immortal Realm (xianxialitrpgwiki)](https://xianxialitrpgwiki.com/immortal-realm/), [Heavenly Tribulation (xianxialitrpgwiki)](http://xianxialitrpgwiki.com/heavenly-tribulation/).

**Entrou:** 20 eventos (`lote7_ceu.ts`), 3 técnicas, 2 itens, 1 final (Oficial da Corte Celeste), 1 conquista (Carimbo do Céu), 1 origem (Regressor, liberada ao ascender).
- Reencarnado/regressor: memória de técnica antiga, inimigo da vida passada, o dia em que tudo deu errado, mestre que voltou criança, nome antigo, sussurros do futuro, segunda chance.
- O Registro Celeste (nosso "sistema", criação original): `janela_registro` → missões diárias, loja, avaliação, `erro_do_registro` → `fim_do_registro` (lendário, final Celeste).
- Céu e destino: tribulação do coração, oficial da Corte Celeste (lendário, burocracia do Céu), Livro da Vida e da Morte (lendário), fio vermelho do destino, o dia em que o Céu sorriu (lendário), raio roxo, o olhar do Céu.

**Mudança de regra:** o karma agora pesa na tribulação (±8% de sobrevivência, conforme o karma). É a convenção do gênero (karma positivo suaviza, negativo endurece) e dá um motivo mecânico para ser bom.

**Calibração:** `finalChance` 0,05 (o modo meta passou de 2,0% de ascensão com os lotes 6–7). Pesos de `ruptura_do_tempo`, `mestre_ve_talento` e `mestre_pede_favor` aumentados.

**Resultado (4.000 vidas):** ascensão 0,8% (independente) e 1,8% (meta; 1,8% também com 8.000 vidas). Eventos que dependem de desbloqueio (origens Alma Reencarnada, Neto de Alquimista, Rebento Demoníaco, Regressor) aparecem centenas de vezes no modo meta e, por definição, não aparecem no modo independente, que não tem desbloqueios.

---

## Mudança de design — a trilha nasce de eventos
A trilha de cultivo deixou de ser escolhida na criação do personagem.
- O personagem começa **sem trilha**. Depois do despertar do Qi, o motor só sorteia as **cenas de primeiro método** (`src/data/events/trilha_inicial.ts`) até que uma escolha aplique o efeito `trilha`.
- Cada cena oferece trilhas que combinam com os atributos e a origem: viajante (Sopro, Formações), espadachim (Espada, Corpo), erveira (Alquimia, Venenos), monge (Mérito, Consciência), caçador (Bestas) e o sussurro do sangue (Caminho do Sangue, só para quem tem o sangue demoníaco). Sempre dá para recusar e esperar outra cena; se todas forem recusadas, `caminho_do_acaso` entrega o Sopro.
- Efeito novo `trilha: "<id>"`: aplica os bônus de atributos e a técnica inicial da trilha, a corrupção e a facção da trilha do Sangue, e marca `trilha_definida`.
- Os bônus de trilha passam a valer só depois do despertar (antes valiam desde o nascimento).

**Resultado (4.000 vidas):** ascensão 0,7% (independente) e 1,4% (meta); as 9 trilhas comuns aparecem naturalmente (Bestas e Sopro são as mais frequentes, por terem cenas com requisitos mais fáceis). No modo meta, o único evento que não apareceu em 4.000 vidas foi o lendário `senhor_do_sangue`; no independente, `mestre_em_perigo` (cadeia longa) e os eventos que dependem de desbloqueios.

---

## Ciclo de melhorias 1 (UX, avaliação e ferramentas)
Feito como designer, jogador e avaliador, sem mexer no balanceamento.
- **Resumo das mudanças:** depois de cada escolha aparecem "chips" com o que mudou (atributos, pedras, karma, fama, corrupção, ferimentos, cultivo, itens, técnicas, reino, trilha). Verde = bom, vermelho = ruim, cinza = informativo.
- **Tema e fonte:** Opções → tema (automático, claro, escuro) e tamanho do texto (pequena, média, grande).
- **Códice:** coleção de finais, técnicas e itens descobertos em qualquer vida; o que falta aparece como "???".
- **Copiar resumo da vida:** botão na tela final.
- **Linter de conteúdo** (`npm run validate`): marcadores desconhecidos como `{foo}`, textos vazios ou longos, opções repetidas, atributos ou xp exagerados, nomes e títulos repetidos, eventos cujas opções todas têm condição. Resultado: o conteúdo está limpo; só renomeei três eventos com o mesmo título ("Refinar Pílula de Passagem").

## Ciclo de melhorias 2 (leitura de uma vida inteira como jogador)
Achados e correções:
- **Reino que "mudava de nome" depois da cena de trilha** (ex.: "Refinamento de Qi" virava "Terceira Classe"): quem despertou e ainda não tem trilha usa agora a escada neutra "Qi Despertado"; ao adotar a trilha, o reino ganha o nome definitivo e aparece um chip informativo.
- **Textos de rompimento e de "acumular anos" repetidos palavra por palavra:** agora há 2 a 4 variações para sucesso, falha, falha com ferimento e espera.
- `finalChance` ajustado de 0,05 para 0,055. Com 10.000 vidas: ascensão 0,6% (independente) e 1,8% (meta).

---

## Lote 8 — Infância e juventude mortal
**Pesquisa:** inícios humildes (filho de camponeses, órfão), despertares súbitos, linhagens ocultas e marcas de nascença. Fontes: [Spirit Cultivation Genre (TV Tropes)](https://tvtropes.org/pmwiki/pmwiki.php/Main/SpiritCultivationGenre), [Top 10 Most Overused Xianxia Tropes](https://lightnovelsai.com/blog/most-overused-xianxia-tropes/), [The Xianxia Handbook](https://www.webnovel.com/book/the-xianxia-handbook-a-guide-to-cultivation-and-beyond_33320064000358805/basic-introduction-of-chinese-fantasy_89458315674840787).

**Motivo:** a análise de cobertura mostrou só 30 eventos livres antes do despertar (a infância era a fase mais fina do jogo).

**Entrou:** 25 eventos (`lote8_juventude.ts`), todos antes do despertar: colheita, o cão da estrada (→ `cao_envelhece`), estrela cadente, a respiração da avó, noite dos bandidos, aprendiz de curandeira, feira do templo, poço assombrado, carpa dourada, carta do pai, marca de nascença (→ `marca_desperta`, linhagem oculta), viajante hospedado, dia de mercado, casamento na vila, enchente, recrutador do exército, tio que não despertou, primeiro amor (→ `amor_decisao`), jogo de go, incêndio no celeiro, sonho de queda e tarefas da casa. Dois são repetíveis de propósito (dia de mercado, tarefas da casa) para reduzir a repetição de "Dias de Trabalho".

## Lote 9 — Identidade das trilhas
**Pesquisa:** caminhos clássicos (têmpera de ossos no corpo, intenção na espada, arranjos de formação, pactos com feras). Fontes: [Major Cultivation Paths & Martial Classes](https://cultivationgames.com/wiki/cultivation-path/), [Body Refinement](https://xiuxian0.com/cultivation/body-refinement-path/), [Extended Cultivation Encyclopedia](https://xianxialitrpgwiki.com/cultivation-encyclopedia/), [Cultivation Types & Techniques](https://www.novelupdatesforum.com/threads/cultivation-types-techniques.141079/).

**Motivo:** a análise mostrou trilhas muito desiguais em eventos próprios (Alquimia 18; Sopro 4, Corpo 4, Bestas 3, Sangue 1).

**Entrou:** 32 eventos (`lote9_trilhas.ts`), 9 técnicas, 4 itens. Sopro (ciclos do ano, mar de nuvens, tempestade interna, mestre do vento); Corpo (têmpera, nascente mineral, touro de ferro, pele de bronze); Espada (folha, duelo na neve, cemitério de espadas, intenção); Consciência (sonho lúcido, espírito visitante, selo); Formações (labirinto, nó do veio, torneio); Mérito (esmola, demônio no templo, sutra do diamante); Venenos (antídoto universal, banquete do barão, mestre dos antídotos); Bestas (ninhada de lobos, caça, evolução, voz das feras, Rei da Floresta); Sangue (irmãos de sangue, duelo do fraco, chama negra, trabalho sujo).

**Calibração (os dois lotes juntos):** o modo meta subiu para 2,3% de ascensão. Em vez de mexer só no reino final, reduzi o poder das melhorias de Herança (cultivo +3% → +2% por nível; chance em testes +1% → +0,8%; níveis máximos 6→5, 8→6 e 5→4) e `finalChance` 0,065. Resultado (8.000 vidas): ascensão 0,6% (independente) e 1,9% (meta).

**Resultado:** 397 eventos, 89 itens, 58 técnicas, 23 finais, 10 trilhas. No modo meta todos os eventos aparecem; no independente, ficam de fora apenas os que dependem de desbloqueio (Alma Reencarnada, Neto de Alquimista, Rebento Demoníaco, Regressor e a trilha do Sangue).

## Ciclo de melhorias 3 (interface)
- **Onboarding** de primeira vez ("Como jogar", cinco linhas), que some ao tocar em "Entendi".
- **Técnicas detalhadas** na aba Status: grau, descrição e efeitos (atributos, cultivo, bônus em testes).
- **Marcos da vida** na tela final: nascimento, trilha e cada reino alcançado, com a idade.

- **Epitáfios variados:** os finais mais comuns (velhice, combate, tribulação, desvio de Qi, vida comum) ganharam 2 a 4 variações de texto; a escolhida depende do nome e da idade do personagem, então a mesma vida sempre termina com o mesmo texto, mas vidas diferentes não repetem o epitáfio. O linter também confere as variações.

## Ciclo de melhorias 4 (qualidade e robustez)
- **Fuzzer** (`npm run fuzz`): 3.000 vidas com escolhas totalmente aleatórias (inclusive finais voluntários e uso de itens): 183 mil escolhas, nenhum problema (atributos na faixa, sem NaN, sem telas sem opção, itens e técnicas existentes).
- **Alcançabilidade dos finais** (`npm run endings`): monta o estado exigido por cada evento com final e força o resultado; os 23 finais saem (20 por evento próprio, 3 por regra do motor).
- Os dois testes entram no workflow de publicação do site: conteúdo quebrado não vai ao ar.
- **Service worker:** páginas e manifesto vêm da rede primeiro (atualização aparece na hora quando há internet) e do cache quando offline; os arquivos com hash continuam cache-first.
- `realmOf` ficou robusto a números de reino fora da escada.
