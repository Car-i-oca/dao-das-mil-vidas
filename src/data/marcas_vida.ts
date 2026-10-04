/**
 * Marcas da vida: cada decisão que grava uma flag vira, no fim da vida, uma linha do que {nome} deixou para trás.
 * O resumo mostra até 8 marcas e cada marca distinta rendem +1 de Herança a cada quatro (máximo +2): o que você faz importa
 * mesmo quando nenhum evento posterior pergunta por isso. Formato: `flag|frase`.
 */
const TABELA = `
brincadeira_rio_dummy|-
gentil_na_infancia|Foi gentil na infância, e isso voltou em forma de amigos.
conhece_lendas|Cresceu ouvindo lendas ao pé do fogo, e as repetiu a vida inteira.
viu_voo|Viu um cultivador cruzar o céu e nunca mais olhou a terra do mesmo jeito.
profecia_vaga|Guardou uma profecia vaga que nunca soube se era sobre si.
arquivo_cla|Mexeu nos arquivos do clã e descobriu o que os mais velhos escondiam.
alquimista_aprendiz|Começou como aprendiz de alquimista e levou o cheiro de ervas consigo.
independente|Recusou ficar preso a uma seita e preferiu o próprio caminho.
saqueou_seita|Saqueou uma seita em apuros e carregou a culpa por isso.
derrotado_pelo_rival|Foi derrotado pelo rival, e a derrota virou combustível.
ignorou_rival|Fingiu ignorar o rival, que nunca esqueceu.
heranca_caverna|Encontrou uma herança numa caverna que outros não viram.
legado_seita|Deixou um legado numa seita que não era a sua.
pacto_demoniaco|Fez um pacto demoníaco do qual só se arrependeu tarde.
veio_proprio|Cultivou por veio próprio de espiritualidade, sem ajuda de ninguém.
imune_venenos|Treinou até ficar imune a venenos comuns.
matou_inquisidor|Matou um inquisidor da seita, e a seita não perdoa.
rede_contatos|Teceu uma rede de contatos que o ajudou por décadas.
herdeiro_reconhecido|Foi reconhecido como herdeiro do clã diante de todos.
treinou_com_soldado|Treinou com um soldado veterano e aprendeu disciplina de quartel.
sabotou_rival|Sabotou um rival interno, e nunca contou a ninguém.
venceu_rival_interno|Venceu o rival interno e ganhou respeito entre os iguais.
salvou_mestre|Salvou o mestre de um perigo que ele jamais mencionou.
espiao_alerta|Descobriu um espião na seita e deu o alarme a tempo.
expos_anciao|Expôs a corrupção de um ancião e pagou o preço por isso.
reformador|Tentou reformar uma seita decadente por dentro.
leu_proibido|Leu o que era proibido e carregou o segredo.
reino_nevoa_aliados|Saiu do Reino da Névoa com aliados que durariam décadas.
saiu_com_heranca|Saiu de um reino secreto com uma herança que valia reinos.
receita_refinada|Refinou uma receita rara que levou o seu nome.
filho_mortal|Teve um filho mortal, e viu a vida passar pelos olhos dele.
rede_mendigos|Ganhou a rede de olhos dos mendigos, que sabiam de tudo.
queimou_aldeia|Queimou uma aldeia a mando de um mestre demoníaco, e não se perdoou.
desobedeceu_mestre_demoniaco|Desobedeceu o mestre demoníaco e viveu fugindo.
pacto_demonio_antigo|Selou um pacto com um demônio antigo.
pediu_perdao_viuva|Pediu perdão a uma viúva que nunca soube se aceitou.
matou_viuva|Matou uma viúva vingativa, e o ciclo se fechou com sangue.
sabe_quem_contratou|Descobriu quem contratou o caçador que o perseguia.
tregua_mestre_demoniaco|Fez uma trégua incômoda com o mestre demoníaco.
companheiro_travesso|Teve um companheiro travesso que o seguiu por muito tempo.
aliado_vida_passada|Reconheceu um aliado de uma vida passada.
desejo_estrela|Fez um desejo a uma estrela cadente e esperou o resto da vida.
respiracao_da_avo|Aprendeu com a avó uma respiração que guardou até o fim.
defendeu_vila|Defendeu uma vila de bandidos, e a vila o chamou de herói.
conhece_ervas|Aprendeu a conhecer as ervas, e isso o salvou mais de uma vez.
vara_da_sorte|Ganhou a vara da sorte numa feira de templo.
viu_espirito|Viu um espírito num poço assombrado e nunca contou.
segredo_de_familia|Guardou um segredo de família até o último dia.
jogou_go|Jogou go com quem não devia, e aprendeu mais que a regra.
torneio_semifinalista|Chegou à semifinal de um torneio de cem picos.
torneio_vice|Foi vice-campeão do torneio, a um golpe da glória.
guerra_lado_rival|Lutou do lado errado numa guerra entre seitas.
guerra_neutro|Ficou neutro na guerra e ajudou quem pôde.
guerra_mercador|Vendeu suprimentos aos dois lados da guerra.
mediou_a_guerra|Mediou uma trégua que poupou milhares de vidas.
mare_defensor|Defendeu uma muralha contra a maré de bestas.
mare_evacuador|Evacuou vilas inteiras diante da maré de bestas.
mare_cacador|Caçou núcleos de bestas na maré e enriqueceu.
matou_rei_da_mare|Matou o Rei da Maré, e o feito virou lenda.
reino_corredor|Correu para dentro de um reino secreto antes dos outros.
reino_vendedor|Vendeu chaves de reino secreto a quem pagasse.
reino_cauteloso|Esperou, cauteloso, e não perdeu o que o reino secreto cobrou.
praga_cuidador|Cuidou de doentes durante a praga.
praga_isolado|Isolou-se durante a praga e sobreviveu só.
praga_comerciante|Lucrou com remédios durante a praga.
dinastia_povo|Ficou ao lado do povo na queda da dinastia.
dinastia_forca|Apoiou a força na queda da dinastia, e viveu bem.
dinastia_neutro|Ficou neutro na queda da dinastia.
inimigo_do_trono|Tornou-se inimigo do novo trono.
protegeu_principe|Protegeu um príncipe fugitivo, e a promessa pesou.
culto_observador|Observou a ascensão do culto sem se meter.
culto_aliado|Aliou-se, por um tempo, ao culto do Trono Escarlate.
inimigo_do_culto|Foi inimigo declarado do culto do Trono Escarlate.
expos_traidor_alianca|Expôs um traidor dentro da Aliança.
festivais_participante|Participou dos grandes festivais da era.
cometa_cultivador|Cultivou sob um cometa, e o Qi nunca foi o mesmo.
cometa_observador|Observou o cometa, e guardou a imagem para sempre.
pai_do_jovem_mestre|Humilhou o herdeiro de um poderoso, e o pai dele não esqueceu.
anciao|Foi ancião de uma seita de peso.
pacto_politico|Selou um pacto político que lhe deu poder e inimigos.
protetor_reino|Foi o Protetor do Reino, e as bandeiras tinham o seu emblema.
pavilhao_proprio|Teve um pavilhão próprio, onde passou décadas.
discipulo_talentoso|Aceitou o discípulo talentoso e arrogante.
discipulo_esforcado|Aceitou o discípulo esforçado, sem talento, e não se arrependeu.
discipulo_calado|Aceitou o discípulo calado, de tristeza antiga.
favor_da_seita|Deixou a seita lhe devendo um favor.
amigo_do_anciao|Ganhou um amigo entre os anciões ao ceder um posto.
seita_expansionista|Votou pela expansão da seita, e arcou com os inimigos novos.
seita_fechada|Votou pela contenção, e a seita ficou segura e pequena.
conselho_dos_ancestrais|Recebeu o conselho dos ancestrais em viagem de alma.
discipulo_prodigio|Teve um discípulo prodígio, e defendeu-o da inveja.
tributo_dos_reinos|Recebeu o tributo de três reinos mortais.
tratado_vantajoso|Arrancou um tratado vantajoso numa mesa de paz.
guardiao_do_artefato|Entregou parte da vida para renovar o artefato da seita.
pacto_besta_ancestral|Selou um pacto com uma besta ancestral.
viu_alem|Viu, por um instante, o que há além do mundo.
dominio_silencio|Criou um Domínio de silêncio.
dominio_vida|Criou um Domínio de vida, onde as plantas florescem.
dominio_lamina|Criou um Domínio de lâminas, onde o ar corta.
guardiao_do_selo|Reforçou o selo de um ancestral adormecido.
segredo_ancestral|Ouviu um segredo de um ancestral adormecido.
banquete_imortais|Sentou-se à mesa dos Imortais do Terraço do Oeste.
refugio_mundo|Criou um mundo de bolso para abrigar refugiados.
grande_biblioteca|Reuniu a maior biblioteca de métodos do mundo.
heroi_dos_ceus|Lutou na guerra dos céus e voltou com uma lança quebrada.
lei_fogo|Aprofundou a Lei do Fogo.
lei_tempo|Aprofundou a Lei do Tempo.
lei_vida|Aprofundou a Lei da Vida.
lei_morte|Aprofundou a Lei da Morte.
imperador|Foi imperador de um reino unificado, e carregou o peso.
legado_mortais|Deixou todo o legado aos mortais.
legado_cinzas|Determinou que o legado virasse cinzas.
imortal_terrestre|Tomou a pílula da imortalidade, e ficou.
voou_na_espada|Voou na espada pela primeira vez, e nunca esqueceu o vento.
rival_amigavel|Fez do rival um amigo ríspido.
formacao_montanha|Transformou uma montanha em formação defensiva.
conhece_velho_templo|Conheceu o velho do templo, que o ajudou na fome.
sabe_ler_contas|Aprendeu a ler contas na infância e viveu de ler o que outros ignoravam.
ouviu_do_qi|Ouviu falar do Qi de um vizinho, e não esqueceu.
viu_a_forma|Viu, de cima de uma figueira, uma forma de espada inteira.
amigo_da_seita|Fez, na seita, um amigo que o protegeu.
padrinho_na_seita|Ganhou um padrinho entre os anciões da seita.
sabe_do_traidor|Descobriu quem traía a seita, e guardou o nome.
trabalhou_pro_credor|Trabalhou para o credor do clã para saldar a dívida.
sabe_da_traicao_do_cla|Soube da traição que arruinou o clã.
casamento_arranjado|Casou-se por conveniência, e aprendeu a gostar.
noivo_definido|Teve um companheiro definido pelas famílias.
rezou_aos_ancestrais|Rezou aos ancestrais no salão esquecido do clã.
ideia_do_menino|Teve uma ideia de menino que o pai adotou nas carroças.
pacto_com_bandidos|Fez um pacto com bandidos que durou mais que o esperado.
rival_mercador|Teve um rival mercador a vida inteira.
balanca_do_avo|Herdou a balança do avô e a levou por todo canto.
loba_prateada|Libertou uma loba prateada, que o seguiu de longe.
fonte_azul|Descobriu uma fonte azul numa trilha que desapareceu.
rastreador|Aprendeu a rastrear com um velho caçador de um olho só.
sabe_das_feras|Anotou os nomes de feras ouvidos numa noite de histórias.
decifrou_o_caderno|Decifrou o caderno cifrado do avô alquimista.
jardim_do_avo|Reviveu o jardim de ervas do avô.
primeira_pilula|Refinou a primeira pílula na fornalha do avô.
receita_propria|Inventou uma receita própria, de cheiro de lavanda.
pagou_as_dividas|Quitou as dívidas do avô em pílulas.
caderno_dos_sonhos|Anotou os sonhos de outra vida num caderno.
pista_da_vida_passada|Seguiu uma pista da vida passada.
moeda_do_monge|Guardou uma moeda de dinastia extinta, dada por um monge.
memorias_abertas|Abriu de vez as memórias de outras vidas.
escreve_lingua_antiga|Aprendeu a escrever numa língua que ninguém lê.
notado_pelos_anciaos|Foi notado pelos anciões da seita demoníaca desde cedo.
fugiu_da_seita_demoniaca|Fugiu da seita demoníaca com a ajuda de uma desconhecida.
mentiu_aos_anciaos|Mentiu aos anciões demoníacos e saiu ileso.
perseguido_por_demoniacos|Foi perseguido por demoníacos a vida inteira.
amiga_da_padaria|Fez uma amiga numa padaria de viúva.
bem_visto_no_templo|Foi bem visto num templo por devolver uma pedra.
sabe_da_conspiracao|Soube da conspiração que derrubou a sua casa real.
perseguido_pelo_tio|Foi perseguido pelo tio que usurpou o trono.
treinado_por_zhao|Foi treinado pelo velho guardião Zhao.
disfarce_de_campones|Aprendeu a viver como camponês e a esconder o passado.
levante_dinastico|Liderou, ou apoiou, um levante dinástico.
renunciou_ao_trono|Renunciou ao trono e mudou de nome.
licao_do_silencio|Aprendeu a lição do silêncio com o mestre eremita.
conheceu_a_vila|Desceu a montanha e conheceu a vila.
viu_duelo_do_mestre|Viu o duelo do mestre, e o entendeu tarde.
salvou_o_mestre|Salvou o mestre de uma febre.
viu_a_serpente|Viu a serpente de mil anos sob a água.
navegador|Aprendeu a navegar pelas estrelas com um velho marujo.
ouviu_da_ilha|Ouviu falar da ilha dos mil sinos.
pista_do_farol|Guardou uma pista do farol no fim do mundo.
luta_de_maos|Aprendeu luta de mãos nuas nos quartéis.
pegou_o_ladrao|Pegou um ladrão numa patrulha noturna.
avisou_o_amigo|Avisou o amigo de uma ordem de prisão.
foi_guarda|Serviu como guarda no lugar do pai ferido.
evitou_o_incendio|Evitou um incêndio que já tinha visto em outra vida.
previu_o_sal|Previu o preço do sal e enriqueceu um mercador.
salvou_a_curandeira|Salvou a curandeira que, em outra vida, morreu.
curandeira_sabe|Contou a verdade a uma curandeira.
amigo_da_infancia|Fez amizade com o futuro rival, antes de ele ser rival.
mestre_regressor|Esperou o eremita na estrada, e foi aceito antes da hora.
mentor_leal|Foi leal ao mentor, que lhe ensinou a recomeçar do básico.
mentor_rebelde|Discordou do mentor e seguiu sozinho.
mentor_confessou|Soube o segredo do mentor, e ele confessou.
mentor_traido|Revelou o segredo do mentor à seita.
mentor_prova_ok|Passou a prova do mentor onde ele falhara.
herdou_do_mentor|Herdou do mentor um manual anotado por décadas.
rival_respeito|Fez do rival um adversário respeitado.
rival_odio|Cultivou ódio pelo rival desde o primeiro dia.
rival_ignorado|Ignorou o rival, que não perdoou.
rival_venceu|Perdeu para o rival num duelo oficial.
rival_aliado|Aliou-se ao rival contra um inimigo comum.
rival_empate|Empatou o último duelo com o rival.
amigo_correspondente|Trocou cartas com o amigo de infância por décadas.
amigo_acolhido|Acolheu o amigo quando ele chegou sem nada.
amigo_abandonado|Abandonou o amigo, e a porta que fechou nunca reabriu.
amigo_salvo|Salvou o amigo de uma cilada.
amor_aceito|Aceitou um amor no festival das lanternas.
amor_publico|Assumiu o amor publicamente.
disc_leal|Assumiu o erro do discípulo, que lhe jurou lealdade.
disc_ressentido|Puniu o discípulo, e algo se quebrou entre os dois.
disc_livre|Deixou o discípulo partir, com a sua bênção.
legado_discipulo|Viu o discípulo fundar uma escola com sua frase gravada.
inim_vinganca|Jurou vingança ao inimigo de infância.
inim_luto|Enterrou o luto e guardou o nome do inimigo.
inim_localizado|Localizou o inimigo jurado.
inim_derrotado|Derrotou o inimigo jurado em combate.
inim_morto|Matou o inimigo jurado.
inim_poupado|Poupou o inimigo jurado.
viu_o_baul|Viu o que havia no baú da escolta, e calou.
pista_do_cla_mendigos|Ganhou da Irmandade dos Panos Velhos uma pista cara.
amigo_do_cla_veneno|Tornou-se amigo do Clã dos Cinco Venenos.
avisado_da_emboscada|Foi avisado de uma emboscada na taberna dos espiões.
conselheiro_da_alianca|Foi conselheiro da Aliança das Lâminas.
mestre_escondido|Descobriu um mestre disfarçado de cozinheiro.
enterrou_os_ossos|Enterrou os ossos dos que tentaram arrancar a espada.
selo_do_cla|Recuperou o selo do clã numa feira.
favor_do_rei_dragao|Ficou devendo um favor ao Rei Dragão do Leste.
divida_com_o_submundo|Pediu mais tempo ao juiz do submundo, e ficou devendo.
deu_o_pessego|Levou o pêssego da imortalidade a quem amava.
conselho_do_dragao|Recebeu um conselho do Dragão Azul.
promessa_a_noiva|Prometeu à noiva fantasma buscar o noivo que a traiu.
viu_o_futuro|Viu o futuro num lago, e guardou o portão em chamas.
t_mp_prodigio|Foi o prodígio de memória da sua turma.
t_mp_segredo|Escondeu o quanto memorizava.
t_mp_copiou_proibido|Copiou de memória um manual proibido.
t_mp_arquivista|Foi Arquivista Vivo de uma seita.
t_mp_copia|Memorizou textos inteiros antes de largá-los.
t_mp_promessa|Citou, palavra por palavra, o que lhe haviam prometido.
t_mp_diagrama|Reconstituiu de memória o diagrama de um manual visto uma vez.
t_sd_equilibrio|Pagou a dívida do destino sem revolta.
t_sd_azedou|Azedou com a sorte e se isolou.
t_aa_reconheceu|Reconheceu lugares e rostos de outra era.
t_aa_templo|Abriu, com a memória da alma, uma câmara de templo antigo.
t_aa_lider|Reassumiu a liderança de uma seita da vida passada.
t_aa_recusou|Recusou o passado, de ambos os lados.
t_aa_perdoou_passado|Perdoou o ódio de séculos de uma vida passada.
t_cr_forte_publico|Mostrou a força em público, e nunca mais pôde fingir fraqueza.
t_cr_forte_oculto|Escondeu a força para não virar ferramenta.
t_cr_banho|Atravessou o banho fervente que endurece a pele.
t_cr_muralha|Foi a muralha de um senhor de armas.
t_cr_defensor|Defendeu uma vila sitiada sem cobrar nada.
t_pm_rede|Fez amigos úteis só com a presença.
t_pm_recluso|Fugiu da atenção, e alguém o procurou por isso.
t_pm_tirano_manso|Decidiu a vida de seus seguidores, e virou um tirano manso.
t_pm_linhagem|Ensinou os seguidores a pensar, e deixou uma linhagem.
t_gm_solto|Deixou o Qi fluir à vontade.
t_gm_controle|Aprendeu a dobrar o fluxo do Qi.
t_gm_ritmo|Descobriu o ritmo próprio do seu talento.
t_gm_invejado|Foi invejado pelos pares por romper gargalos dormindo.
t_gm_estudado|Foi estudado por uma seita rival.
t_gm_protegido|Aceitou a proteção de uma seita, em troca de exclusividade.
t_ci_ignorou|Ignorou o demônio interior até ele ir embora.
t_ci_dialogou|Conversou com o demônio interior como com um conhecido.
t_ci_farol|Serviu de farol para cultivadores quebrados.
t_ci_mil_dores|Atravessou a Ilusão das Mil Dores.
t_od_calou|Calou o que viu nos fios dos outros.
t_od_avisou|Avisou um homem do fio preto.
t_od_cortou_fio|Cortou um fio do destino.
t_od_fio_seguido|Seguiu um fio do destino até alguém que o esperava.
t_od_cumpriu|Cumpriu o pedido que o destino lhe trouxe à porta.
t_od_desviou|Desviou o destino que viu chegar.
t_vl_presente|Passou o máximo de tempo com os amigos que envelheciam.
t_vl_afastou|Afastou-se dos amigos para não vê-los envelhecer.
t_vl_lenda_da_vila|Virou lenda numa vila: o jovem que aparecia em cada funeral.
t_vl_estudado|Deixou uma seita estudar o seu corpo longevo.
t_vl_perseguido|Foi perseguido por caçadores de essência.
t_pd_profecia|Guardou, palavra por palavra, a profecia.
t_pd_ignorou|Ignorou o sinal no céu e viveu como qualquer um.
t_pd_protegido|Foi protegido por quem queria cumprir a profecia.
t_pd_livre|Fugiu da profecia e traçou o próprio caminho.
t_pd_reescreveu|Reescreveu a profecia com as duas facções.
t_pd_cumpriu|Cumpriu a profecia, ou deixou que se cumprisse de outro jeito.
t_pv_guia|Guiou uma caravana perdida, sem saber como.
t_pv_sozinho|Seguiu sozinho e deixou a caravana à sorte.
t_pv_vale|Encontrou um vale que só existe para quem chega sem plano.
t_pv_explorador|Juntou-se aos exploradores do Vazio.
t_pv_cacador|Guiou caçadores de relíquias.
t_pv_perseguido|Fugiu pela porta do Vazio de uma seita que o queria estudar.
t_sdr_feras|Passou a ser respeitado pelas feras.
t_sdr_oculto|Escondeu a marca de dragão.
t_sdr_ninho|Atendeu o chamado do ninho de dragão.
t_sdr_aceito|Foi aceito pelos caçadores de dragões.
t_sdr_refugio|Refugiou-se nas montanhas entre criaturas de sangue antigo.
t_av_fixou|Repetiu o que aprendeu até fixá-lo de verdade.
t_av_colecionador|Colecionou métodos sem dominar nenhum.
t_av_mestre_um|Venceu a competição com uma única técnica.
t_av_mil_estilos|Venceu a competição dos mil estilos.
t_av_escola|Fundou uma escola com todos os estilos que aprendeu.
t_ft_achou|Achou tesouros onde outros só viam bugigangas.
t_ft_honesto|Avisou um vendedor do valor do que vendia.
t_ft_rota|Seguiu uma rota antiga de tesouros esquecidos.
t_ft_vendeu_mapa|Vendeu o mapa dos tesouros, e uma expedição não voltou.
t_ft_herdeiro|Ficou com uma herança sem herdeiros.
t_ft_devolveu|Devolveu uma herança que ninguém reclamara.
f_me_alargou|Dilatou os canais com pílulas amargas.
f_me_paciente|Aceitou a lentidão e refinou o Qi gota a gota.
f_me_servente|Aceitou o posto de servente na seita.
f_me_teimoso|Treinou sozinho, fora da seita, por teimosia.
f_me_prazo|Pediu dez anos para provar o contrário.
f_me_escondidos|Descobriu meridianos escondidos.
f_me_aceitou|Aceitou a lentidão como o seu caminho.
f_me_golpe_fio|Aprendeu o Golpe do Fio, um único ponto.
f_me_superado|Superou os meridianos estreitos.
f_az_causa|Descobriu a causa do seu azar.
f_az_planob|Aprendeu a ter sempre um plano B.
f_az_risada|Aprendeu a rir do próprio azar.
f_az_amuleto|Comprou um amuleto e acreditou nele.
f_az_enganado|Foi enganado por uma vendedora de amuletos.
f_az_aceitou|Aceitou viver com o azar.
f_az_sinais|Aprendeu a ler os sinais do azar.
f_az_raposa|Fez um pacto com a raposa da dívida.
f_az_superado|Quebrou a maldição que o perseguia.
f_qi_controle|Aprendeu a conter o Qi instável.
f_qi_mestre|Estudou com um mestre de casos como o seu.
f_qi_reparou|Reparou o pavilhão que o seu Qi destruiu.
f_qi_fugiu|Fugiu da seita depois de uma explosão.
f_qi_estudado|Foi estudado por um mestre que viu padrão na explosão.
f_qi_arma|Virou a Arma da Seita.
f_qi_proprio|Encontrou um jeito próprio de usar o Qi instável.
f_qi_espiral|Cavalgou a espiral do Qi.
f_qi_superado|Estabilizou o Qi no centro da tempestade.
f_cv_correu|Correu quando devia ter ficado.
f_cv_gritou|Gritou por ajuda em vez de enfrentar.
f_cv_desculpou|Pediu desculpas ao menino que não defendeu.
f_cv_evitou|Evitou o menino que não defendeu.
f_cv_batedor|Foi o batedor do grupo, graças ao medo.
f_cv_vidente|Vendeu o medo como vidência.
f_cv_lider|Liderou todos à saída num desastre.
f_cv_superado|Enfrentou o medo de olhos abertos.
f_do_tratou|Tratou o corpo com ervas e disciplina.
f_do_escuta|Aprendeu a escutar o corpo.
f_do_estudado|Foi estudado por uma seita de curandeiros.
f_do_sozinho|Cuidou da própria doença por conta própria.
f_do_curandeiro|Virou curandeiro por ter sido doente.
f_do_pilula|Pagou a cura rápida com anos de vida.
f_do_lenta|Escolheu a cura lenta e honesta.
f_do_aceitou|Aceitou a fragilidade como parte de si.
f_do_superado|Passou uma estação sem adoecer, escutando o corpo.
f_or_rancor|Guardou rancor da humilhação por décadas.
f_or_conversou|Conversou com quem o humilhou, e a mágoa coube num suspiro.
f_or_sem_mestre|Recusou ajoelhar-se e ficou sem mestre.
f_or_alternativa|Ganhou um mestre com uma xícara de chá, sem joelhos.
f_or_duelou|Aceitou o duelo que o orgulho pediu.
f_or_recusou_duelo|Recusou o duelo e aguentou a vergonha.
f_or_perdoou|Perdoou quem o humilhou.
f_or_nao_perdoou|Não perdoou quem pediu perdão.
f_or_superado|Pediu perdão de joelhos, em público.
f_di_foco|Treinou o foco por exercício diário.
f_di_ideias|Anotou as ideias que a dispersão trouxe.
f_di_tecnica|Inventou uma técnica nascida de uma divagação.
f_di_rotina|Criou listas e rituais contra o esquecimento.
f_di_culpou|Culpou as circunstâncias por um erro seu.
f_di_olhar_aberto|Aprendeu o Olhar Aberto.
f_di_superado|Largou as muletas da atenção.
f_im_desculpou|Pediu desculpas depois de um soco precipitado.
f_im_encrenqueiro|Ganhou fama de encrenqueiro.
f_im_briga|Entrou numa briga que não era sua.
f_im_parou|Parou no meio de um ímpeto e pediu desculpas.
f_im_palavra|Cumpriu uma palavra dada com pressa.
f_im_quebrou|Quebrou uma palavra dada com pressa.
f_im_pausa|Treinou a pausa de três respirações.
f_im_superado|Aguentou três dias de provocação sem reagir.
f_av_emprestou|Emprestou pedras, apertando os dentes.
f_av_negou|Negou ajuda a quem pedia por um filho doente.
f_av_lucro|Seguiu o lucro e perdeu os amigos.
f_av_dividiu|Dividiu o lucro com os amigos.
f_av_perseguiu|Perseguiu o ladrão que levou a sua fortuna.
f_av_recomecou|Deixou a fortuna ir e recomeçou do zero.
f_av_doou|Fez uma doação grande, e dormiu leve.
f_av_mais|Reforçou a segurança e acumulou mais.
f_av_superado|Aprendeu a dar em segredo.
og_camp_voltou|Voltou à vila onde nasceu para interceder pelos seus.
og_camp_mandou|Mandou pedras e uma carta à vila de origem.
og_camp_negou|Negou ajuda à vila onde nasceu.
og_camp_senhor_devedor|Deixou o senhor da terra lhe devendo um favor.
og_camp_cobrou|Cobrou do antigo senhor os anos de tributo.
og_orf_ficou|Voltou ao pátio onde foi criado.
og_orf_achou_familia|Encontrou a família que perdeu.
og_orf_nao_achou|Procurou a família e não achou.
og_orf_perdoou|Alimentou o velho intendente sem dizer quem era.
og_orf_cobrou|Cobrou uma desculpa do velho intendente.
og_orf_vingou|Deixou o velho intendente na rua.
og_cla_reuniu|Reuniu os primos do clã sob a sua liderança.
og_cla_ajudou_avulso|Ajudou cada primo, sem unir o clã.
og_cla_recusou|Recusou reunir o clã.
og_cla_paz|Fez a paz entre o clã e a casa que o traiu.
og_cla_vingou|Vingou o clã contra a casa traidora.
og_merc_guilda|Teve um assento no conselho da Guilda dos Mercadores.
og_merc_proprio|Abriu um negócio próprio, pequeno e honesto.
og_merc_socio|Fez sociedade com o rival da infância.
og_merc_guerra|Venceu uma guerra de preços contra o rival.
og_merc_fundo|Criou um fundo comum com o antigo rival.
og_cac_loba|Foi seguido por uma loba prateada.
og_cac_afastou|Afastou a loba e os filhotes na neve.
og_cac_pago|Pagou ao espírito da montanha o que devia.
og_cac_acordo|Fez um acordo anual com o espírito da serra.
og_alq_tentou|Tentou terminar a receita do avô, sem conseguir.
og_alq_guardou|Guardou a receita do avô sem tentar.
og_alq_terminou|Terminou a receita do avô.
og_alq_registrou|Registrou a receita do avô na Associação.
og_alq_recusou|Recusou entregar a receita à Associação.
og_alq_meio|Entregou uma versão pública e guardou o segredo.
og_ree_lembrou|Lembrou, pela espada de um estranho, uma vida passada.
og_ree_fugiu|Fugiu do inimigo da outra vida.
og_ree_licao|Aprendeu a lição inacabada do mestre de outra era.
og_ree_recusou|Recusou a lição de outra vida.
og_dem_voltou|Voltou à seita demoníaca por um tempo.
og_dem_recusou|Recusou os emissários da seita.
og_dem_plano_mae|Planejou tirar a mãe da seita.
og_dem_irmao_salvo|Alcançou o irmão por trás da máscara.
og_dem_irmao_perdido|Perdeu o irmão para o Culto.
og_dem_obedeceu|Obedeceu ao Culto, e algo seu escorreu.
og_dem_guerra|Declarou guerra ao Culto e ao próprio irmão.
og_mend_voltou|Passou outro inverno sob a ponte com os antigos companheiros.
og_mend_dividiu|Repartiu o que tinha com os companheiros da ponte.
og_mend_seguiu|Seguiu em frente, deixando a vida da ponte para trás.
og_mend_tigela|Herdou uma tigela vazia que estava cheia.
og_prin_conspira|Conspirou com os leais pela restauração.
og_prin_dissolveu|Dissolveu a rede de leais.
og_prin_espera|Manteve a rede de leais à espera.
og_prin_verdade|Ouviu a verdade do tio no leito de morte.
og_prin_armadilha|Escapou de uma armadilha no palácio.
og_prin_nao_foi|Não foi ver o tio moribundo.
og_ere_ficou|Ficou na cabana do mestre.
og_ere_procurou|Procurou o mestre pelo mundo.
og_ere_cha|Ofereceu chá a quem o desafiava em nome do mestre.
og_ere_duelou|Duelou em nome do mestre.
og_pesc_favor|Aceitou o favor que a serpente cobrou do pai.
og_pesc_recusou|Recusou o favor da serpente, como o pai.
og_pesc_ilha|Chegou à ilha dos mil sinos.
og_gua_corrupto|Aceitou um posto e fechou os olhos, como o pai.
og_gua_provas|Juntou provas contra o general corrupto.
og_gua_exposto|Foi descoberto antes do tempo e perdeu as provas.
og_gua_recusou|Recusou o posto que exigia corrupção.
og_gua_justica|Fez justiça ao pai e ao general.
og_gua_entregou|Entregou o próprio pai à lei.
og_gua_fugiu|Fugiu com o pai da lei.
og_reg_evitou|Evitou a enchente que já tinha vivido.
og_reg_parcial|Salvou parte da cidade que viu afogar.
og_reg_calou|Deixou a enchente acontecer, em silêncio.
og_reg_aliado|Aliou-se a outro regressor.
og_reg_desconfiou|Desconfiou de outro regressor.
og_reg_matou|Matou outro regressor.
forja_lamina|Deu ao artefato natal a forma de uma lâmina curta.
forja_anel|Deu ao artefato natal a forma de um anel de jade e metal.
og_cac_marcou_trilha|Marcou uma trilha que a montanha apagou antes de o pai ver.
og_cac_ignorou_trilha|Ignorou uma trilha que apareceu e sumiu, e nunca esqueceu.
cs_oss_vende|Vendeu pó dos próprios ossos de dragão a um alquimista.
cs_jad_acordo|Entregou aos colecionadores de juventude uma receita parcial.
rz_tripla_esforco|Confiou no esforço diário de quem tem raiz comum.
rz_agua_cede|Aprendeu com a água a ceder sem se quebrar.
rz_vento_peregrino|Fez, com o vento, uma peregrinação sem rota certa.
cs_yin_livre|Recusou emprestar o seu frio a uma seita de Yang.
cs_oss_oculto|Escondeu que tinha ossos de dragão.
cs_esp_lamina|Foi escolhido por uma lâmina de três mil anos.
cs_cao_ordem|Impôs ordem às energias que o corpo caótico absorveu.
cs_jad_escondeu|Viveu escondido para que ninguém visse que não envelhecia.
rz_unica_largo|Ampliou o único elemento da raiz a todos os usos.
rz_mutante_livre|Escondeu a raiz mutante dos que a queriam.
rz_dupla_alterna|Alternou os dois elementos da raiz conforme a hora.
rz_quad_capitao|Fez de um dos quatro elementos o capitão do Dantian.
rz_caot_prova|Dedicou a vida a provar que raiz caótica não é lixo.
rz_fogo_livre|Deixou o fogo livre, e incendiou a própria cama.
rz_terra_defesa|Fez da terra uma fortaleza.
rz_madeira_cura|Aprendeu a Cura das Mil Folhas.
rz_raio_treino|Treinou o raio com os caçadores de tempestade.
rz_gelo_arma|Fez do gelo uma fortaleza que anda.
cs_yin_equilibrio|Ofereceu o frio do corpo ao ritual de uma seita de Yang.
cs_cao_esponja|Absorveu o Qi de tudo ao alcance, como uma esponja de mundo.
rz_unica_fundo|Mergulhou no único elemento da raiz até o limite.
rz_mutante_estudado|Deixou estudiosos registrarem a raiz mutante num livro novo.
rz_dupla_funde|Fundiu os dois elementos da raiz num terceiro.
cs_vei_rompeu|Rompeu o selo antigo das veias e viveu o que veio depois.
rz_tripla_atalho|Gastou pedras e favores em atalhos de cultivo.
rz_quad_equilibra|Pôs os quatro elementos da raiz para conviver.
rz_caot_simples|Viveu simples, e a raiz caótica rendeu mesmo assim.
rz_metal_lamina|Fez do metal uma intenção de lâmina.
og_cla_divida|Saiu de um banquete devendo uma dívida de honra.
cs_yin_par|Cultivou em par com um corpo Yang, e a amizade foi o prêmio.
cs_oss_refinado|Refinou os ossos de dragão por dez anos de martelo.
cs_esp_recusou|Recusou a lâmina que o chamou, e ela o seguiu assim mesmo.
cs_esp_herdeiro|Foi herdeiro da seita das lâminas quebradas.
cs_cao_cauteloso|Aprendeu a dizer não ao que o corpo caótico quis absorver.
cs_cao_livre|Deixou as energias do corpo caótico se acertarem sozinhas.
cs_jad_enfrentou|Enfrentou os colecionadores de juventude.
cs_jad_fiel|Ficou ao lado de uma amiga até ela envelhecer e partir.
cs_jad_foi|Foi embora antes que o tempo pesasse demais entre amigos.
rz_fogo_vela|Aprendeu, com uma vela, a diferença entre ter fogo e ser fogo.
rz_agua_arma|Fez da água a coisa mais afiada que conhecia.
rz_terra_chao|Escutou o chão por três dias e passou a ler o terreno.
rz_madeira_arma|Fez da madeira uma prisão de raízes e espinhos.
rz_metal_forja|Aprendeu a forja e deixou o próprio Qi nas lâminas.
rz_raio_oculto|Escondeu o raio do peito, para não chamar tempestades.
rz_gelo_preserva|Aprendeu a guardar um instante em cristal.
rz_vento_arma|Cortou o ar com a própria intenção.
p_sopro_vento|Deixou o vento e o Qi do mundo falarem por si.
p_espada_honra|Resolveu um conflito com um duelo de honra, sem sangue.
p_alq_reputacao|Pagou confiança com frascos e antídotos, e ganhou fama de alquimista honesto.
p_corpo_muralha|Foi a muralha de peito aberto contra o golpe.
p_form_contrato|Protegeu casas e acampamentos com formações pagas em confiança.
p_bud_transfere|Transferiu mérito a quem pediu, como chama que acende outra chama.
p_ven_dose|Usou o veneno certo na dose certa, sem alarde.
p_bes_dupla|Lutou ao lado do companheiro, dois corpos numa luta só.
p_dem_medo|Gastou o medo que o seu nome causava como moeda.
p_espada_intencao|Cortou com a intenção, sem sacar a lâmina.
p_alq_frasco|Tirou do cinto o frasco certo na hora certa.
p_alma_alcance|Estendeu a consciência e sentiu o que ninguém dizia.
p_form_terreno|Fez do terreno um aliado antes do primeiro golpe.
p_bud_merito|Protegeu os outros com o corpo e um sutra.
p_dem_bebeu|Bebeu a essência de um inimigo ainda quente.
p_sopro_gotas|Refinou o Qi do lugar em pequenas gotas claras.
p_espada_folha|Aprendeu o corte da folha: um golpe, uma vez, no ponto.
p_alq_pilula|Refinou pílulas simples com o que tinha à mão.
p_corpo_temperado|Temperou o corpo a banhos, martelos e jejum.
p_alma_mar|Mergulhou no Mar da Consciência e achou a resposta lá.
p_form_falha|Achou a falha escondida no arranjo de um lugar.
p_ven_tolerancia|Provou o que havia de estranho e aprendeu pelo gosto.
p_bes_vinculo|Passou dias calmos ao lado do companheiro, e o Qi dos dois se espelhou.
p_dem_proprio|Sangrou a si mesmo num ritual curto, sem tocar em ninguém.
tc_demonio_resolvido|Resolveu a caçada dos inquisidores contra quem usa a técnica do sangue.
tc_inquisicao_tolera|Convenceu os inquisidores de que o seu uso do sangue era contido.
tc_inquisicao_cobra|Foi marcado pela inquisição por usar a técnica do sangue.
tc_inquisicao_inimiga|Enfrentou três inquisidores e ganhou a inimizade da inquisição.
tc_renunciou_sangue|Renunciou, diante dos inquisidores, à técnica do sangue.
tc_espada_ramo|Descobriu que o seu corte era o ramo irmão de uma escola antiga.
tc_espada_misterio|Deixou um velho espadachim intrigado com a origem do seu corte.
tc_alq_conselho|Aceitou um assento no conselho de pesquisa da Associação dos Alquimistas.
tc_alq_independente|Recusou a Associação e manteve a chama só para si.
tc_alq_troca|Trocou receitas de igual para igual com a Associação.
tc_form_troca|Trocou um traço secreto por uma formação antiga com um arquiteto.
tc_corpo_medido|Passou três dias de pancada sob a medição de um mestre de corpo.
tc_besta_rebanho|Ganhou o respeito das feras e um rebanho que o seguia de longe.
tc_ven_cla|Fez um acordo de receitas com um clã de envenenadores.
tc_ven_antidotos|Só aceitou fornecer antídotos a um clã de envenenadores.
tc_mente_mar|Atravessou o esquecimento do Mar Sem Margem com um monge.
tc_sopro_vale|Trocou respirações com o mestre da Seita do Vale.
tc_sopro_pico|Trocou respirações com o mestre da Seita do Pico.
tc_fuga_devolveu|Devolveu a um templo a relíquia que um velho ladrão levara décadas antes.
tc_fuga_carta|Levou uma carta de um velho ladrão a uma mulher que o odiava.
tc_cinzas_achou|Achou o manual da Palma da Seita das Cinzas Verdes num poço.
tc_cinzas_respeitou|Deixou o manual da seita queimada no poço e rezou pelos mortos.
tc_cinzas_vendeu|Vendeu o último elo de uma linhagem a um colecionador.
tc_cinzas_herdeiro|Foi aceito como herdeiro da Seita das Cinzas Verdes.
tc_cinzas_fugiu|Fugiu dos sobreviventes da Seita das Cinzas Verdes levando a palma.
tc_sino_achou|Achou, no mar, os versos do Templo do Sino Afogado.
tc_sino_respeitou|Devolveu ao mar a tábua do Templo do Sino Afogado.
tc_sino_juramento|Jurou à última monja do sino usar o sutra só para o bem.
tc_sino_sem_juramento|Recusou jurar à monja, e o sino tocou em suas noites.
tc_nevoas_achou|Achou o caderno do último discípulo da Escola das Nove Névoas.
tc_nevoas_entregou|Entregou o caderno da Escola das Nove Névoas, e a vergonha ficou.
tc_nevoas_herdeiro|Foi o herdeiro da Escola das Nove Névoas diante dos que a apagaram.
tc_anciao_achou|Levou o caldeirão que sobreviveu ao fogo de um pavilhão queimado.
tc_anciao_deixou|Deixou o caldeirão no pavilhão queimado, e nunca esqueceu.
tc_anciao_perdoou|Perdoou o alquimista que queimou o pavilhão por rancor.
tc_anciao_negou|Negou o método ao alquimista arrependido.
tc_fundiu_espada_qi|Fundiu a espada e a respiração na Espada de Qi Condensado.
tc_fundiu_corpo_sutra|Fundiu o corpo temperado e o mérito no Corpo de Sutra Vivo.
tc_fundiu_selo_lamina|Fundiu o selo e o corte no Selo da Lâmina Fechada.
tc_fundiu_fogo_vital|Fundiu o caldeirão e o osso no Fogo Vital.
tc_fundiu_veneno_alma|Fundiu a agulha e a consciência no Veneno da Alma.
tc_fundiu_sombras|Fundiu o companheiro e o passo no Pacto das Sombras Gêmeas.
tc_fundiu_carmesim|Fundiu o sangue e o osso no Corpo Carmesim.
tc_fundiu_paisagem|Fundiu a consciência e o selo na Paisagem Interior.
tc_perfeicao_pressa|Chegou à Perfeição de um método e renunciou à pressa.
tc_perfeicao_fama|Chegou à Perfeição de um método e renunciou à fama.
tc_perfeicao_medo|Chegou à Perfeição de um método e renunciou ao medo.
tc_lamina_unica|Largou a espada na pedra e levou o Golpe Único.
tc_mil_ciclos|Morreu de propósito no altar e voltou com mil ciclos no corpo.
tc_trono_vazio|Sentou-se, sem querer nada, no trono onde ninguém senta.
tc_rio_sem_margem|Entrou no rio sem margem e aprendeu a deixá-lo correr.
`;

export const MARCAS_VIDA: Record<string, string> = Object.fromEntries(
  TABELA.split('\n')
    .map((l) => l.trim())
    .filter((l) => l.includes('|') && !l.endsWith('|-'))
    .map((l) => {
      const i = l.indexOf('|');
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);
