# Relatório do Lote 2 e das alcunhas

Branch `feat/dois-modos`. Lote 1 aprovado e mesclado em `main` (merge `eb13bc5`); Action "APK Android" terminou com sucesso, Release `android-latest` atualizada (build 46) e a nota diz **"Assinatura fixa"** (instala por cima).

## Dourado do Murim: último hash antes de mudar conteúdo

`npm run dourado`: **330 vidas idênticas, total `6270f71ec360628f`** (registrado antes da primeira mudança de conteúdo do Murim). A partir daqui o dourado é regenerado a cada mudança intencional, com a explicação abaixo.

| Regeneração do dourado | O que mudou |
|---|---|
| Alcunhas e perfil escrito à mão no Murim | Cada opção do Murim ganhou perfil (tabela `murim/perfil.ts`) e o motor passou a sortear cenas de alcunha (nascimento, mudança, mancha, reação). Hash final deste passo: `423f24d975a204c2` (`docs/dourado-murim.json`). |

## Ascensão do Xianxia
Fator da tribulação final 0,35 → 0,25: **0,8%** em 1000 vidas (`docs/variedade-xianxia.md`, robô do simulador). Meta: 0,5% a 2%.

## Alcunhas (1000 vidas por modo; `npm run alcunhas`)

| Métrica | Meta | Murim | Xianxia |
|---|---|---|---|
| Vidas que terminam com alguma alcunha | ≥ 70% | 96,2% | **65,5%** (aberto) |
| Maior parcela de uma só alcunha | ≤ 20% | 19,4% | 13,1% |
| Alcunhas nunca alcançadas como final | 0 | **1** (Testemunha de Hwayang) | **1** (Vulto Vermelho) |
| Variedade dentro da mesma trilha (1 − Σp²) | alta | 0,88 | 0,86 |
| Mudanças de alcunha por vida (entre as que nasceram) | — | 0,25 | 0,81 |
| Idade média do nascimento da 1ª alcunha | — | 30 | 46 |

Crônicas (3 por modo, geradas) em `docs/cronicas-alcunhas.md`; li o Murim e corrigi: artigo duplicado («a «a Cobradora»»), preposição sem contração («de o»), pronome fixo na história e particípio fixo em reação. O quadro da cena de nascimento é o mesmo para todas as alcunhas do modo (só a história muda): soa repetitivo e fica como aberto.

## Lote 2: primeiro talento do Murim — Memória de escriba (`memoria_perfeita`)
- **4 cenas próprias** (`mem_aula`, `mem_escriba`, `mem_testemunho`, `mem_peso`), **6 opções exclusivas** escritas para cada cena comum (livro sob a ponte, armazém, torneio, conselho, nomes riscados, julgamento) e **1 final exclusivo**, «O arquivo que andava» (`murim_arquivista`, aberto pela flag `arquivo_vivo` em `mem_peso`). Cada opção tem consequência própria (flag lida em cena posterior ou no resumo, pedras, fama, karma).
- O `impacto` mostra 4 / 6 / 0 porque conta só finais dados por `fx.fim`; o final exclusivo vem do `finalDeVelhice` (flag), então a linha de «caminhos» fica 0 no relatório mesmo com o caminho existindo. Ajustar a ferramenta fica como aberto.
- Dourado regenerado: novo hash em `docs/dourado-murim.json`, porque o Murim ganhou 4 cenas, 6 opções e 1 final.

## O que ficou aberto (alcunhas e Lote 2)
- **Lote 2 em andamento:** 1 de 14 talentos do Murim feito (Memória de escriba); faltam 13 talentos, os 9 defeitos, as origens, as trilhas e o Xianxia (conversão dos lotes 26 a 28 de `899108c`).
- **Cenas de reação:** 1 por alcunha (meta: 3). O `validate` avisa. Os 3 por alcunha e as cenas «que só existem por causa dela» exigem mais ~96 cenas escritas.
- **Alcunhas raras que dão conquista:** não feito.
- **Xianxia:** 65,5% das vidas com alcunha (meta 70%) e Vulto Vermelho (trilha demoníaca) nunca alcançado pelos robôs; Murim: Testemunha de Hwayang (flag do fim da campanha) idem.
- **Escolas do Murim (Lâmina Errante a 73%) e escolhas sem marca:** inalteradas.


## B1 — dourado do Murim
O dourado mudou de `23690773a526c871` para `75265d8d67eeee36` (1 de 330 vidas diverge, a vida i4): a Testemunha de Hwayang agora pode substituir uma alcunha de perfil (`peso: 8`), o que muda a alcunha final e as cenas de reação dessa vida. Regenerado com `npm run dourado -- --gravar`. O Xianxia não tem dourado.

## B2 — talento 2 de 14: Instinto oportuno (`sorte_destino`)
- **Entrou** (`src/data/modos/murim/tracos/sorte_destino.ts`, carregado por `tracos/index.ts`): 4 cenas (`sor_pressentimento`, `sor_mesa`, `sor_dois_incendios`, `sor_ultima_estrada`), 6 opções exclusivas no fim de cenas comuns (dia na estrada, banca de Noh, festival, peregrinos, vila sob a neve, lâmina com duas versões) e o final `murim_andarilho` (flag `sor_andarilho`). Cicatriz: o instinto salva quem o segue, não quem está do outro lado (os dois incêndios).
- **Infraestrutura nova:** pasta `tracos/` (um arquivo por traço, perfil escrito à mão em `p:`), e `Cond.noFlaw` (esconde uma opção de quem tem o defeito, a menos que o tenha superado), para os defeitos poderem bloquear opções.
- **Dourado:** de `75265d8d67eeee36` para `da6f9ffc141af76c`, porque o Murim ganhou 4 cenas, 6 opções e 1 final.
- **Medido (1000 vidas, simulador):** Instinto oportuno com 4 eventos, 6 opções e 2 caminhos; Murim com 95,7% de vidas com alcunha; maior alcunha 22,2% (Cobrador de Prata; o número oscila a cada mudança de conteúdo e segue para o B3).

## B2 — talento 3 de 14: Olho experiente (`alma_antiga`)
- **Entrou** (`tracos/alma_antiga.ts`): 4 cenas (`ola_mao_do_vendedor`, `ola_discipulo_novo`, `ola_amigo_calado`, `ola_rosto_fechado`), 6 opções exclusivas (banca de Noh, lâmina com duas versões, bandidos do sal, audiência, oferta da Lua Oca, caldo) e o final `murim_olho_em_repouso` (flag `ola_confiou`). Cicatriz: ler gestos com clareza tira o direito de ser surpreendido; todo aviso custa algo.
- **Dourado:** `da6f9ffc141af76c` -> `c2608081c5813833` (4 cenas, 6 opções e 1 final novos no Murim).

## B2 — talento 4 de 14: Constituição vigorosa (`corpo_resistente`)
- **Entrou** (`tracos/corpo_resistente.ts`): 4 cenas (`cor_carga`, `cor_febre_da_escola`, `cor_ponte_inundada`, `cor_joelhos`), 6 opções exclusivas (dia na estrada, refugiados, torneio, inverno, reparo da ponte, bandidos) e o final `murim_pilar` (flag `cor_resistente`). Cicatriz: quem nunca cede é o último a poder descansar.
- **Dourado:** agora `8b0c9075ec0b3ae5`.

## B2 — talento 5 de 14: Presença acolhedora (`carisma_nato`)
- **Entrou** (`tracos/carisma_nato.ts`): 4 cenas (`aco_confissao_do_cais`, `aco_segredo_do_mestre`, `aco_mesa_dos_rivais`, `aco_cartas_guardadas`), 6 opções exclusivas (festival, caldo, lâmina com duas versões, banca de Noh, vila sob a neve, assembleia) e o final `murim_casa_aberta` (flag `aco_confidente`). Cicatriz: confidências são dívidas; guardar custa tanto quanto revelar.
- **Dourado:** agora `7523605a7a3be0c9`.

## B2 — talento 6 de 14: Aprendiz disciplinado (`mestre_nato`)
- **Entrou** (`tracos/mestre_nato.ts`): 4 cenas (`dis_mil_vezes`, `dis_forma_quebrada`, `dis_aluno_que_improvisa`, `dis_ultima_forma`), 6 opções exclusivas (escola, ponte da Garça, dia na estrada, peregrinos, estilos errantes, arquivo) e o final `murim_forma_viva` (flag `dis_mestre_repete`). Cicatriz: a forma perfeita pode virar jaula.
- **Dourado:** agora `9803d0c0d40e6150`.

## B2 — talento 7 de 14: Vontade firme (`coracao_inabalavel`)
- **Entrou** (`tracos/coracao_inabalavel.ts`): 4 cenas (`fir_promessa_na_chuva`, `fir_ordem_errada`, `fir_porta_fechada`, `fir_voto_velho`), 6 opções exclusivas (torneio, audiência, noite dos nomes, duelo na ponte, vila sob a neve, julgamento do aprendiz) e o final `murim_firme` (flag `fir_inabalavel`). Cicatriz: aprender a diferença entre firmeza e teimosia.
- **Dourado:** agora `267a7874e8c7cb17`.

## B2 — talento 8 de 14: Leitura de postura (`olhar_dao`)
- **Entrou** (`tracos/olhar_dao.ts`): 4 cenas (`pos_pisada`, `pos_mestre_cansado`, `pos_duelo_sem_golpe`, `pos_postura_propria`), 6 opções exclusivas (torneio, duelo na ponte, bandidos, ponte da Garça, estilos errantes, oferta da Lua Oca) e o final `murim_olho_no_espelho` (flag `pos_postura_lida`). Cicatriz: ver a fraqueza de todos e decidir o que fazer com ela. Dourado inalterado em relação ao commit anterior (nenhuma das 330 vidas fixas usa este talento).
- **Dourado:** agora `267a7874e8c7cb17`.

## B2 — talento 9 de 14: Saúde duradoura (`vida_longa`)
- **Entrou** (`tracos/vida_longa.ts`): 4 cenas (`lon_epidemia`, `lon_enterro_do_amigo`, `lon_filhos_dos_outros`, `lon_ultima_da_mesa`), 6 opções exclusivas (refugiados, vila sob a neve, dia na estrada, último inverno, peregrinos, retorno à ponte) e o final `murim_ultimo_da_mesa` (flag `lon_ultimo_da_mesa`). Cicatriz: quem vive muito enterra os que amou.
- **Dourado:** agora `4979b38fa0f7fa6d`.

## B2 — talento 10 de 14: Voz que reúne (`predestinado`)
- **Entrou** (`tracos/predestinado.ts`): 4 cenas (`voz_primeiro_pedido`, `voz_ponte_dos_desistentes`, `voz_quem_nao_voltou`, `voz_sem_discurso`), 6 opções exclusivas (refugiados, audiência, assembleia, vila sob a neve, festival, lanternas na rota) e o final `murim_voz_passada` (flag `voz_sem_discurso_ok`). Cicatriz: quem reúne responde por quem reuniu. Dourado inalterado (nenhuma das 330 vidas fixas usa este talento).
- **Dourado:** agora `4979b38fa0f7fa6d`.

## B2 — talento 11 de 14: Passo silencioso (`passo_vazio`)
- **Entrou** (`tracos/passo_vazio.ts`): 4 cenas (`vaz_porta_do_celeiro`, `vaz_sombra_da_escola`, `vaz_quem_te_seguia`, `vaz_ninguem_viu`), 6 opções exclusivas (armazém, casa de chá, oferta da Lua Oca, torneio, bandidos, vida comum) e o final `murim_passo_sem_nome` (flag `vaz_passo_vazio_fim`). Cicatriz: quem passa despercebido por todos também passa despercebido por quem o amaria.
- **Dourado:** agora `d9d4a7318cc51dc0`.

## B2 — talento 12 de 14: Força incomum (`sangue_dragao`)
- **Entrou** (`tracos/sangue_dragao.ts`): 4 cenas (`dra_mao_que_quebrou`, `dra_treino_contido`, `dra_o_pedido_do_clan`, `dra_mao_aberta`), 6 opções exclusivas (torneio, reparo da ponte, bandidos, refugiados, duelo na ponte, dia na estrada) e o final `murim_mao_aberta` (flag `dra_mao_aberta_fim`). Cicatriz: o dia em que a força machuca quem não devia.
- **Dourado:** agora `f83dd848f4384ef1`.

## B2 — talento 13 de 14: Aprendiz rápido (`aprendiz_veloz`)
- **Entrou** (`tracos/aprendiz_veloz.ts`): 4 cenas (`ver_aula_curta`, `ver_buraco_na_base`, `ver_aluno_lento`, `ver_licao_devagar`), 6 opções exclusivas (escola, estilos errantes, ponte da Garça, arquivo, banca de Noh, peregrinos) e o final `murim_aprendiz_devagar` (flag `ver_aprendiz_fim`). Cicatriz: o que se aprende cedo demais tem buracos que só aparecem na prova.
- **Dourado:** agora `6e9c4591b5def240`.

## B2 — talento 14 de 14: Faro para negócios (`olfato_tesouro`) — talentos do Murim concluídos
- **Entrou** (`tracos/olfato_tesouro.ts`): 4 cenas (`olf_barraca_de_frutas`, `olf_contrato_bom_demais`, `olf_sociedade_desfeita`, `olf_o_que_nao_se_vende`), 6 opções exclusivas (banca de Noh, torneio, armazém, festival, vila sob a neve, reparo da ponte) e o final `murim_piao_sem_preco` (flag `olf_nao_vendeu_fim`). Cicatriz: o dia em que algo valioso não tem cotação. **Com este, os 14 talentos do Murim estão feitos; faltam os 9 defeitos.**
- **Dourado:** agora `c353ae0ded9cc436`.

## B2 — defeito 1 de 9: Fôlego curto (`meridianos_estreitos`)
- **Entrou** (`tracos/meridianos_estreitos.ts`): 4 cenas (`fol_corrida_perdida`, `fol_treino_cortado`, `fol_respiracao_do_monge`, `fol_fim_de_fila`), 6 opções exclusivas de quem tem o defeito (dia na estrada, torneio, refugiados, vila sob a neve, peregrinos, duelo na ponte), arco de redenção (`fol_respiracao_do_monge`, `fx.superar` após quarenta dias de respiração lenta) e o final `murim_folego_proprio` (flag `fol_fim_ok`, só para quem tem o defeito).
- **Infraestrutura:** `FINAIS_POR_FLAG` ganhou o campo opcional `defeito` (como `talento`), lido por `finalDeVelhice`.
- **Medido:** Fôlego curto com 4 eventos, 6 opções e 3 caminhos (mínimo atingido).
- **Dourado:** agora `5eb4d4c19bc09bb4`.

## B2 — defeito 2 de 9: Mau timing (`azar`)
- **Entrou** (`tracos/azar.ts`): 4 cenas (`azr_dia_do_festival`, `azr_promessa_fora_de_hora`, `azr_a_chuva_certa`, `azr_ultimo_atraso`), 6 opções exclusivas de quem tem o defeito (dia na estrada, torneio, banca de Noh, bandidos, festival, vila sob a neve), arco de redenção (`azr_a_chuva_certa`, `fx.superar` ao confiar no momento) e o final `murim_chegou_na_hora` (flag `azr_fim_ok`, só para quem tem o defeito). Medido: 4 eventos, 6 opções, 3 caminhos.
- **Dourado:** agora `d23644663f43c5e4`.

## B2 — defeito 3 de 9: Técnica irregular (`qi_instavel`)
- **Entrou** (`tracos/qi_instavel.ts`): 4 cenas (`irr_golpe_torto`, `irr_exibicao_publica`, `irr_caderno_dos_dias`, `irr_forma_imperfeita`), 6 opções exclusivas de quem tem o defeito (escola, torneio, ponte da Garça, duelo na ponte, peregrinos, estilos errantes), arco de redenção (`irr_caderno_dos_dias`, `fx.superar` após um ano de caderno) e o final `murim_forma_de_cada_um` (flag `irr_fim_ok`, só para quem tem o defeito). Medido: 4 eventos, 6 opções, 3 caminhos.
- **Dourado:** agora `d9841be6bf3b0bda`.

## B2 — defeito 4 de 9: Hesitação sob pressão (`covarde`)
- **Entrou** (`tracos/covarde.ts`): 4 cenas (`hes_o_cao_do_moinho`, `hes_o_chamado_no_patio`, `hes_a_porta_da_casa`, `hes_o_medo_que_ficou`), 6 opções exclusivas de quem tem o defeito (bandidos, oferta da Lua Oca, duelo na ponte, torneio, audiência, vila sob a neve), arco de redenção (`hes_a_porta_da_casa`, `fx.superar` ao entrar na casa em chamas) e o final `murim_medo_dito` (flag `hes_fim_ok`, só para quem tem o defeito). Medido: 4 eventos, 6 opções, 3 caminhos.
- **Dourado:** agora `c771996e5e100b3f`.
