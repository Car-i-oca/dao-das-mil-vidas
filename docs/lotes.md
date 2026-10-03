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
