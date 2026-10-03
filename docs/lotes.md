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
