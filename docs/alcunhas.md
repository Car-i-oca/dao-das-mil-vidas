# Alcunhas

A alcunha é o nome pelo qual o mundo passa a chamar a pessoa por causa do jeito como ela viveu. Código: `src/engine/alcunhas.ts`; catálogos: `src/data/modos/murim/alcunhas.ts` e `src/data/modos/xianxia/alcunhas.ts` (24 por modo). Medição: `npm run alcunhas -- 1000` (grava `docs/alcunhas-<modo>.md`); crônicas: `npx tsx sim/cronica-alcunhas.ts` (`docs/cronicas-alcunhas.md`).

## De onde vem (perfil escrito à mão)
O perfil de conduta tem 8 eixos, nos dois modos: **compaixão, violência, astúcia, cautela, ambição, disciplina, devoção, ganância**. Cada escolha soma +1 ou +2 em um ou dois eixos, **escrito opção por opção** (nada é classificado por texto):
- **Xianxia:** nos efeitos (`fx.perfil`) dos 171+ moldes da v2.
- **Murim:** na tabela `src/data/modos/murim/perfil.ts`, uma linha por evento e uma entrada por opção (`'C D'` = compaixão +1, disciplina +1; `'D2'` = disciplina +2).
O perfil não tem teto e não desce sozinho; desce quando o jogador **rejeita** uma alcunha (−3 nos eixos dela). `alignment` e `morality` continuam separados do perfil.

## Como a alcunha é escolhida
Cada eixo é comparado com a vida **típica do modo** (média medida em 150 vidas, `ESCALA` em `alcunhas.ts`): `z = perfil / média` (só vale com perfil ≥ 3). Médias — Murim: compaixão 13,5 · violência 1,9 · astúcia 6,1 · cautela 7,5 · ambição 2,1 · disciplina 12,1 · devoção 1,3 · ganância 2,0. Xianxia: 26 · 5,6 · 13,7 · 27,1 · 8,9 · 20,7 · 16,8 · 3,8.
- **Puro** (um eixo): z ≥ 1,0 e o maior z da pessoa; pontos = 5·z (+3 se exige trilha, talento ou defeito).
- **Combinação** (dois eixos): os dois com z ≥ 1,05 e nenhum outro eixo mais de 15% acima; pontos = 8·menor z.
- **Feito** (um predicado sobre o estado: flag, fio do mundo v2, trilha): 6 pontos + 2·z dos eixos dela. Alguns têm idade mínima, para não dispararem por uma flag de infância.
- Exigências opcionais: trilha, talento, defeito.
Nasce quando a melhor alcunha chega a **5 pontos**, com a pessoa com 14 anos ou mais e pelo menos 4 turnos desde a última cena de alcunha.

## Cenas (nascimento, mudança, mancha, reação)
- **Nasce** («Um nome que corre»): alguém conta a história; o jogador **aceita** (fama +3), **rejeita** (fama −1, perfil −3, a alcunha não volta) ou **tenta trocar** (teste de sorte/carisma; pode dar outra alcunha, nenhuma, ou impor a mesma, pior).
- **Muda** («O nome muda»): outra alcunha passa da atual em 5 pontos, com 10 turnos de intervalo; aceitar ou insistir no nome antigo.
- **Perde/Mancha** («O nome já não cabe»): se um eixo que contradiz a alcunha (`contra`) sobe demais, ela fica manchada (versão infame, se houver), pode ser repudiada ou negada.
- **Reação do mundo** (a cada 7 turnos, 35% de chance): cena escrita para aquela alcunha, com 2 opções de consequência própria (fama, karma, pedras, atributos, flags lidas no resumo).
Texto de cena pode citar `{alcunha}` (com fallback no nome da pessoa antes de existir alcunha); o motor contrai preposições («de» + «a Raposa» = «da Raposa»). O `validate` confere o marcador.

## Interface
Status/HUD: alcunha ao lado do nome; toque abre a história e as alcunhas anteriores. Fim da vida: alcunha final e epílogo próprio (um parágrafo por alcunha). Legado › Códice: catálogo por modo, «???» com dica vaga. Layout testado em 320 a 430 px e fonte a 130% (`e2e:layout`).

## Limiares e metas medidas (1000 vidas por modo, metade com cada robô)
Ver a tabela em `docs/relatorio-lote2.md`.
