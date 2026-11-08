/**
 * Marcas da vida do modo Murim (o Xianxia tem o seu arquivo): cada decisão que grava uma flag vira, no fim da vida, uma linha do que {nome} deixou para trás.
 * O resumo mostra até 8 marcas e cada marca distinta rendem +1 de Herança a cada quatro (máximo +2): o que você faz importa
 * mesmo quando nenhum evento posterior pergunta por isso. Formato: `flag|frase`.
 *
 * Ainda vazia: os textos que estavam aqui eram do Xianxia antigo (agora em modos/xianxia/marcas_vida.ts). As frases do Murim
 * entram junto com o Lote 2, flag a flag, só para as flags que o jogo de fato lê.
 */
const TABELA = `
memoria_livro|Leu o livro sob a ponte duas vezes e guardou cada nome, cada valor e cada data até o fim.
nomes_restaurados_memoria|Recompôs de memória os nomes riscados, e uma velha sentou no chão ao ler o do marido.
depoimento_exato|Ditou, de memória, depoimentos mais exatos do que os do escrivão.
livros_duplos|Copiou os livros duplos da casa de contas e deixou uma nota na margem.
testemunha_exata|Depôs palavra por palavra, e o comerciante desistiu de contestar.
cadernos_escritos|Passou as memórias para quarenta cadernos e queimou onze.
memoria_em_paz|Aprendeu com um monge de passagem a lembrar sem carregar.
memoria_pesada|Recusou o conselho do monge e seguiu lembrando tudo, cada vez mais calado.
mem_biblioteca|Recebeu, ainda criança, uma carta para a biblioteca do templo.
mem_discreta|Aprendeu cedo que lembrar tudo e mostrar tudo são habilidades diferentes.
caravana_avisada|Avisou, sem se identificar, uma caravana de remédios da emboscada que a esperava.
alcunha_aceita|Aceitou o nome que o mundo lhe deu e passou a viver à altura dele.
alcunha_recusada|Recusou em voz alta o nome que o mundo lhe deu, e aprendeu o preço de dizer não em público.

sor_primo_salvo|Parou a tempo na laje do rio e salvou o primo de uma queda.
sor_palpite_calado|Aprendeu cedo a guardar os palpites para si.
sor_barqueiro|Um barqueiro velho o ensinou a ler a água.
sor_ouviu_fiscal|Ouviu, numa mesa de canto, o que não devia, e soube usar o silêncio.
sor_estalagem_amiga|Avisou uma estalagem do que se tramava contra os viajantes.
sor_inimigo_capitao|Tem um capitão de escolta que guardou seu rosto.
sor_arroz_salvo|Seguiu o instinto e salvou o arroz dos pobres, enquanto as provas da casa de contas queimavam.
sor_pagou_o_preco|Soube, em Pedra Baixa, que a sorte salva um lado e deixa o outro queimar.
sor_decidiu_sozinho|Escolheu contra o próprio instinto, uma vez, e descobriu que podia.
sor_estrada_ensinada|Ensinou uma jovem mensageira a escutar o corpo antes de confiar no acaso.
sor_bifurcacao|Tomou a bifurcação errada e escapou de uma carroça despencando.
sor_mapa_noh|Comprou de Noh um mapa inútil e achou uma cova de moedas.
sor_lanterna|Seguiu uma lanterna rio abaixo até um remendeiro que sabia demais.
sor_quietude|Aprendeu com um monge a ficar parado até o vento mudar.
sor_celeiro_oculto|Achou grão escondido sob um poço seco e salvou uma vila do inverno.
sor_nuca|Escolheu em quem acreditar pelo frio na nuca, e acertou.

ola_rua_avisada|Disse à rua inteira, aos dez anos, o que o polegar de um vendedor escondia.
ola_aviso_calado|Aprendeu cedo a avisar em voz baixa, sem constranger ninguém.
ola_nome_mok|Seguiu um vendedor de unguentos falsos até descobrir o nome por trás dele.
ola_impostor_visto|Viu na reverência atrasada o impostor que a escola inteira tomou por amigo.
ola_acusou_inocente|Acusou um rapaz tímido de ser ladrão, e carregou isso por anos.
ola_mao_paciente|Passou um mês ao lado de um suspeito sem saber se o enganou ou se se enganou.
ola_amigo_salvo|Leu a mão fechada de um amigo a tempo de salvá-lo da própria vergonha.
ola_precavido|Sorriu para um amigo e guardou as chaves em outro lugar.
ola_amigo_traiu|Confiou num amigo que o olho já tinha condenado, e pagou o preço.
ola_confiou_sem_provas|Confiou num amigo contra o que o próprio olho dizia.
ola_confiou|Abriu a porta a uma estranha sem tentar lê-la, e dormiu em paz.
ola_olho_em_repouso|Deixou o olho em repouso por três dias e descobriu o que era descanso.
ola_nunca_leu|Trancou a porta à única pessoa que nunca soube ler.
ola_olhar_herdado|Ensinou a uma jovem o seu jeito de olhar, sem a sua desconfiança.
ola_noh_pista|Descobriu, pelo olhar de Noh, o nome de um freguês que sumiu devendo.
ola_dilema_mao|Leu a corda no pulso de um espadachim e reconheceu a dor por trás da acusação.
ola_bandido_distintivo|Desarmou um falso guarda dizendo onde o dono do distintivo foi enterrado.
ola_gwon_sorriso|Apontou ao conselho o sorriso tardio de Gwon Tae-seok.
ola_choi_rin_poupada|Ajudou Choi Rin a avisar o cobrador que ela devia matar.
ola_caldo_dividido|Dividiu uma tigela de caldo com um viajante que devia mais do que dizia.

cor_carregador|Carregou o saco que quatro adultos não moveram e passou a ser chamado toda manhã.
cor_amigo_cais|Dividiu a moeda com os carregadores do cais e ganhou amigos pesados.
cor_forca_escondida|Tentou esconder a própria força, e todos perceberam que escondia.
cor_semana_febre|Atravessou a semana da febre de pé, cuidando da escola inteira.
cor_cansaco_grande|Descobriu na cozinha, aos joelhos, que a resistência tem fundo.
cor_descanso_aprendido|Aprendeu que um corpo que cai não carrega ninguém.
cor_viga_segura|Segurou uma viga com o próprio corpo até vinte pessoas atravessarem.
cor_viga_cedeu|Soube, na ponte, que mesmo o corpo mais forte não segura tudo.
cor_ponte_dividida|Dividiu o peso da ponte com a vila, em vez de ser o único a sustentá-la.
cor_resistente|Viveu o dia em que o corpo disse não, e o que fez com isso.
cor_pediu_ajuda|Aceitou a bengala e pediu ajuda pela primeira vez na vida.
cor_herdeiro_forca|Ensinou a um jovem onde dói carregar, e quando dizer não.
cor_carroca|Descarregou uma carroça sozinho e ganhou um odre de vinho de arroz.
cor_estandarte|Ergueu uma carroça pelo eixo e recebeu de uma menina o estandarte queimado.
cor_torneio_longo|Venceu o torneio pelo cansaço dos outros.
cor_neve_criancas|Atravessou a nevasca com uma criança em cada braço.
cor_ponte_assentada|Assentou sozinho a pedra caída da ponte de Pedra Baixa.
cor_ataque_calmo|Imobilizou um bandido pelo ombro sem feri-lo.

aco_remador_ajudado|Ouviu a confissão de um remador e o ajudou a escrever à filha.
aco_segredo_guardado|Guardou, ainda menino, um segredo que não era seu, e aprendeu o peso do silêncio.
aco_nomes_colhidos|Transformou, sem querer, uma confissão em informação.
aco_mestre_apoiado|Ajudou o mestre meio cego a preparar a escola para depois dele.
aco_braco_direito|Tornou-se o braço direito do mestre quando ele mais precisava de alguém.
aco_confianca_quebrada|Perdeu a confiança de quem lhe confiou um segredo.
aco_paz_oleiros|Fez as duas famílias de oleiros dividirem uma nascente depois de três gerações.
aco_juiz_de_fora|Recusou-se a decidir uma briga e chamou um juiz de fora.
aco_confidente|Soube o que fazer com as confidências de uma vida inteira.
aco_bau_aberto|Devolveu a cada herdeiro o segredo que lhe pertencia.
aco_bau_queimado|Queimou os segredos de uma vida e foi cofre até o fim.
aco_casa_aberta|Deixou um baú aberto na sala, e a casa virou lugar de deixar segredos.
aco_artista|Ouviu a artista falar do irmão antes de procurá-lo.
aco_caldo_duas_filhas|Descobriu que o viajante e o rapaz tinham, cada um, uma filha doente.
aco_dilema_ouvido|Deixou o espadachim e a curandeira falarem até esquecerem a acusação.
aco_noh_confidencias|Ouviu as confidências de Noh até o conserto sair de graça.
aco_inverno_dividido|Ouviu os mercadores até que dividir já não fosse ordem.
aco_assembleia_amaciada|Ouviu cada delegado a sós e deixou que todos acreditassem ter decidido sozinhos.

dis_irmao_treinado|Treinou o irmão mais velho até ele não precisar mais de ajuda.
dis_irmao_afastado|Guardou o método para si e afastou o irmão.
dis_passo_proprio|Repetiu um passo até ele virar outro, que ninguém havia ensinado.
dis_passo_torcido|Torceu o tornozelo na duas milésima repetição e aprendeu o limite da teimosia.
dis_forma_ampliada|Reconstruiu a forma para incluir o que a derrotou.
dis_forma_intacta|Insistiu numa forma perfeita que só serve para quem a conhece.
dis_rival_amigo|Trocou lições com o rival que o derrubou.
dis_aluno_livre|Ensinou a repetição a um aluno que a quebrava, e aprendeu a sair dela.
dis_aluno_perdido|Perdeu um aluno talentoso por exigir que ele repetisse demais.
dis_mestre_repete|Recomeçou a forma do primeiro passo quando o corpo a esqueceu.
dis_forma_herdada|Passou a um aprendiz o trecho da forma que o corpo havia esquecido.
dis_um_ano|Passou um ano inteiro repetindo uma única forma.
dis_mestra_garca|Copiou cada passo da mestra da ponte da Garça numa só tarde.
dis_caderno|Anotou no caderno a diferença de uma respiração.
dis_lanceira|Contou em voz alta os golpes da lanceira sem escola.
dis_estilo_unico|Fundiu as cinco lições dos mestres errantes numa só, sem nome.
dis_copia_fiel|Copiou à mão o rolo de passos tão fielmente que a mestra confundiu as duas versões.

fir_cesto_entregue|Entregou o cesto de ervas sob a chuva, porque tinha prometido.
fir_cesto_atrasado|Cumpriu a promessa do cesto com um dia de atraso, e aprendeu que atraso não a desfaz.
fir_obedeceu_errado|Obedeceu a uma ordem que sabia errada, e quatro colegas pagaram por isso.
fir_avisou_uma_vez|Avisou o mestre uma vez e deixou um recado discreto aos colegas.
fir_desobedeceu_certo|Desobedeceu à ordem do mestre e salvou a escola.
fir_teimosia_cobrada|Desobedeceu por teimosia e a escola pagou.
fir_porta_aberta|Atravessou a porta que jurou nunca mais atravessar.
fir_juramento_mantido|Manteve o juramento contra o irmão até o enterro.
fir_inabalavel|Soube, no fim, o que valia manter.
fir_voto_renovado|Renovou em voz alta o voto de juventude de proteger as estradas.
fir_voto_solto|Queimou o voto de juventude, sabendo o que fazia.
fir_mao_quebrada|Continuou lutando com a mão quebrada, até o juiz parar.
fir_conselho_repetido|Repetiu a acusação ao conselho até que a registrassem.
fir_pagina_mantida|Recusou a oferta de Gwon e manteve a página original.
fir_ponte_parada|Esperou vinte minutos no meio da ponte até o espadachim tirar a máscara.
fir_noite_de_guarda|Guardou o celeiro a noite toda, e aceitou uma sopa pela manhã.
fir_manual_visto|Recusou depor contra o rapaz até ver o manual com os próprios olhos.

pos_menino_corrigido|Explicou a um menino como o calcanhar o traía, sem zombar.
pos_menino_humilhado|Usou o calcanhar de um menino contra ele e ganhou algo que não soube nomear.
pos_olhar_atento|Passou uma tarde lendo o pátio e aprendeu um idioma de pés.
pos_mestre_cuidado|Viu o joelho do mestre ceder e lhe ofereceu uma pomada em particular.
pos_mestre_exposto|Explorou o joelho fraco do mestre num duelo de treino.
pos_mestre_calado|Viu o joelho do mestre piorar e se calou.
pos_desafiante_poupado|Recusou o duelo com um espadachim exausto e lhe deu abrigo.
pos_duelo_limpo|Venceu um espadachim famoso no primeiro movimento, sem humilhar.
pos_olhar_escondido|Escondeu da vila quanto conseguia ler.
pos_postura_lida|Leu pela primeira vez a própria postura numa poça d'água.
pos_olhar_herdado|Ensinou um jovem a ler a própria postura antes da dos outros.
pos_torneio_lido|Escolheu cada luta do torneio pelo que o corpo dos rivais dizia.
pos_mascarado_lido|Disse ao mascarado da ponte de onde ele vinha e desfez o duelo.
pos_bandido_lido|Derrubou o bandido mais frágil para que os outros entendessem.
pos_mestra_lida|Apontou à mestra da Garça onde ela cederia o peso.
pos_arbitro|Aprendeu com o ex-árbitro a explicar o que enxergava.
pos_choi_rin_lida|Percebeu que a lâmina de Choi Rin era herdada.

lon_cuidou_vila|Cuidou das crianças doentes da vila numa epidemia que não o pegou.
lon_porta_fechada|Fechou a porta durante a epidemia, e a vila nunca esqueceu.
lon_boticaria|Ofereceu o próprio corpo à boticária Seo Yun e ajudou a criar uma receita.
lon_viuva_cuidada|Cuidou da viúva e dos filhos de Min-jae.
lon_juramento_vigilia|Jurou, junto à cova de Min-jae, viver o que ele não viveu.
lon_silencio_amigo|Calou a morte de Min-jae até acordar com o nome dele na boca.
lon_memoria_da_vila|Contou a vila inteira de volta aos mortos e pintou os seus nomes numa parede.
lon_solidao_aceita|Aceitou a solidão de ter visto nascer quase todos à sua volta.
lon_receita_ensinada|Ensinou a uma jovem a receita de caminhar, comer pouco e dormir cedo.
lon_ultimo_da_mesa|Ficou como o último da mesa e não fugiu da pergunta.
lon_nomes_passados|Passou a um neto de amigo os nomes que só ele guardava.
lon_noite_caminhada|Caminhou a noite toda ao lado da carroça dos refugiados.
lon_noite_ao_relento|Dormiu ao relento para ceder o abrigo a quem não aguentava o frio.
lon_sopa_amarga|Aceitou, pela quarta vez, a sopa amarga da velha da estrada.
lon_cartas_ao_fim|Escreveu uma carta a cada pessoa que sobreviveu a ele.
lon_velhice_lugar|Ouviu de um monge que a velhice é um lugar, não um castigo.
lon_neto_do_amigo|Reconheceu num menino da ponte o neto de um velho amigo.

voz_menino_figueira|Guiou um menino paralisado na figueira, galho por galho.
voz_menino_humilhado|Gritou com um menino paralisado e foi aplaudido, para sua vergonha.
voz_caravana_reunida|Convenceu uma caravana de doze a atravessar a passagem.
voz_caravana_perdeu|Demorou em convencer uma caravana e perdeu quatro dos doze.
voz_caravana_dividida|Deixou a caravana se dividir, sem culpa para ninguém.
voz_pressao|Chegou à passagem de montanha carregando quem não queria ser mandado.
voz_nome_dito|Disse o nome do morto no desfiladeiro à viúva dele, e pediu perdão.
voz_dinheiro_pago|Pagou à viúva sem saber o nome do marido, e depois o procurou nos arquivos.
voz_viuva_aliada|Chamou a viúva do desfiladeiro a dividir a responsabilidade da defesa.
voz_sem_discurso_ok|Perdeu o discurso diante da praça e descobriu o que fazer sem ele.
voz_reuniu_calando|Reuniu a praça com uma pergunta, em vez de um discurso.
voz_herdeiro|Passou a palavra a um jovem que o ouviu a vida inteira.
voz_refugiados|Falou às três famílias antes de partirem e as viu seguir de cabeça erguida.
voz_coro_familias|Fez as famílias exigirem em coro o direito de depor.
voz_assembleia|Acalmou as duas bancadas da assembleia com a voz.
voz_inverno|Convenceu os mercadores a dividir na nevasca.
voz_festival|Fez o oficial e o garoto conversarem diante da praça.
voz_rota|Propôs que as duas caravanas atravessassem juntas, em fila.

vaz_celeiro_avisado|Ouviu dois homens no celeiro e acordou o pai para contar.
vaz_terceiro_homem|Guardou o rosto de um terceiro homem que veio ao celeiro.
vaz_seguiu_os_dois|Seguiu os dois homens do celeiro até a casa deles, sem ranger uma tábua.
vaz_apresentou_se|Apresentou-se em voz alta à turma que o esquecera.
vaz_invisivel_escola|Foi esquecido pela escola inteira e não protestou.
vaz_escutou_escola|Escutou a escola inteira quando ninguém sabia que ele estava ali.
vaz_discipula|Acolheu a jovem que o seguiu por dois anos sem ser percebida.
vaz_discipula_afastada|Perdeu a jovem que o seguia por medo de ser seguido.
vaz_passo_vazio_fim|Descobriu o que fazer com tantos atos que ninguém viu.
vaz_deixou_se_ver|Contou à praça o que fez quando ninguém olhava.
vaz_passo_herdado|Ensinou à jovem quando desaparecer e quando voltar.
vaz_armazem_telhado|Copiou os registros do armazém pelo telhado, sem ranger uma telha.
vaz_casa_cha_janela|Escapou da casa de chá pela janela e viu os perseguidores saírem de mãos vazias.
vaz_choi_rin_seguida|Seguiu Choi Rin à distância e a protegeu sem se mostrar.
vaz_torneio_observado|Anotou do fundo da arquibancada quem subornava quem.
vaz_ataque_silencio|Surgiu às costas do falso guarda e desfez o assalto sem um golpe.
vaz_vida_discreta|Viveu anos no mercado como o homem do canto.

dra_amigo_cuidado|Quebrou o braço de um amigo por brincadeira e ficou ao lado dele até curar.
dra_fugiu|Fugiu depois de quebrar o braço de um amigo e guardou o medo de si mesmo.
dra_aprendeu_medir|Aprendeu com o pai a medir a própria força, quebrando noz sem despedaçar a mesa.
dra_forca_contida|Treinou por semanas com uma bola de argila até aprender a conter cada golpe.
dra_temido|Aceitou a fama de forte e ficou sozinho no meio da escola.
dra_amigo_leve|Trocou lições de peso por lições de leveza com um colega.
dra_braco_do_cla|Foi por cinco anos o braço do Clã Gwon, e se arrependeu.
dra_recusou_cla|Recusou ser o braço do Clã Gwon e escolheu para quem usar a força.
dra_infiltrou_cla|Fingiu aceitar o Clã Gwon para denunciá-lo por dentro.
dra_mao_aberta_fim|Segurou a mão de uma criança sem medo de quebrá-la.
dra_forca_aberta|Descobriu que a força, no fim, é uma mão aberta.
dra_torneio_parou|Venceu o torneio e parou diante de quem já estava no chão.
dra_ponte_cunha|Assentou a pedra da ponte e ensinou o truque da cunha.
dra_lanca_partida|Quebrou a lança do líder dos bandidos com as mãos.
dra_carroca_puxada|Puxou sozinho a carroça de três famílias até a cidade.
dra_duelo_abraco|Venceu o duelo na ponte prendendo o adversário num abraço.
dra_cavalo_calmo|Descarregou a carroça devagar para não assustar o cavalo.

ver_pediu_devagar|Pediu ao mestre que repetisse devagar o que já entendera.
ver_pulou_etapa|Pulou etapas por saber demais e pagou depois.
ver_ensinou_colegas|Ensinou os colegas com as próprias palavras antes de o mestre terminar.
ver_base_refeita|Refez a base da escola, um exercício por mês, depois de perder para uma varredura de calcanhar.
ver_mestre_de_bairro|Aprendeu com o oponente os golpes pequenos e vulgares que nunca precisou.
ver_aluno_lento_ensinado|Ensinou um aluno lento até ele superá-lo, e aprendeu com ele o que faltava.
ver_aluno_lento_recusado|Recusou um aluno lento e o encontrou anos depois como mestre.
ver_aluno_lento_ferido|Feriu um aluno lento ao acelerar o método dele.
ver_licao_devagar_ok|Aprendeu devagar um poema que nunca entenderia depressa.
ver_aprendiz_fim|Aprendeu, tarde, a esperar a coisa vir.
ver_herdeiro_devagar|Ensinou a um jovem apressado a palavra devagar.
ver_primeiro_dia|Começou pelo fundamento mais antigo, do primeiro dia.
ver_cinco_mestres|Aprendeu cinco lições em uma hora e passou o dia comparando-as.
ver_mestra_garca|Imitou a mestra da Garça na primeira vez em que a viu.
ver_rolo_copiado|Copiou de memória o rolo de lança, com dois erros que viraram estilo.
ver_ponto_de_noh|Aprendeu o ponto de bainha olhando Noh uma vez.
ver_mapa_dos_erros|Recebeu do médico da espada o mapa dos erros de quem tinha pressa.

olf_arbitragem|Ganhou duas frutas a cada ida e volta entre duas barracas da feira.
olf_contou_vendedor|Contou ao vendedor de caquis que a vizinhança vendia mais barato.
olf_corretor|Virou, aos dez anos, o corretor entre duas barracas da feira.
olf_recusou_caixa|Recusou uma caixa que cheirava a perfume e a contrabando.
olf_abriu_caixa|Exigiu abrir a caixa do mercador de seda diante de testemunhas.
olf_caixa_trocada|Transportou uma caixa trocada e sentiu o cheiro por semanas.
olf_pak_salvo|Descobriu os desvios do sócio Pak e o ajudou com a dívida do filho doente.
olf_sociedade_desfeita|Desfez a sociedade com Pak em silêncio, dividindo o estoque.
olf_cobrou_pak|Cobrou de Pak o prejuízo com juros, diante de testemunhas.
olf_nao_vendeu|Entregou o pião da juventude a uma menina que tinha duas moedas.
olf_nao_vendeu_fim|Descobriu, no fim, algo que o faro não conseguia avaliar.
olf_noh_achados|Virou sócio informal de Noh nos melhores achados do dia.
olf_aposta_torneio|Apostou contra o favorito pelo jeito de mancar no aquecimento.
olf_cais_velho|Descobriu quem lucrava com o armazém fechado e entregou o nome a Mu-jin.
olf_lanternas|Vendeu lanternas de papel às famílias que chegaram tarde.
olf_farinha|Comprou a farinha dos mercadores recusados e a distribuiu a preço de custo.
olf_ponte_taxa|Financiou a ponte em troca de uma taxa que retirou sem avisar.

fol_correu_ate_cair|Correu até cair, por teimosia, e um monge lhe deu água fria.
fol_mudou_a_prova|Mudou a prova da ladeira para uma de equilíbrio e passou a ser dono dos jogos.
fol_ficou_de_lado|Ficou de lado na corrida e aprendeu que esconder o limite machuca mais.
fol_parou_a_tempo|Parou o treino a tempo, e o mestre mostrou que o fôlego curto é um tipo de corpo.
fol_terminou_a_marca|Terminou a sequência de duas horas caindo, e o corpo anotou a conta.
fol_blocos_curtos|Dividiu o treino em blocos curtos e provou o mesmo resultado ao mestre.
fol_respirou|Cumpriu quarenta dias do método do monge e superou o fôlego curto.
fol_metodo_do_monge|Aprendeu o método de respiração lenta do monge.
fol_abandonou_metodo|Abandonou o método do monge no vigésimo dia.
fol_recusou_monge|Recusou o método do monge e viveu dentro do limite.
fol_fim_ok|Ensinou a quem ficava no fim da fila.
fol_herdeira_do_folego|Ensinou a uma jovem de fôlego curto o método de poupar.
fol_trabalho_em_etapas|Descarregou a carroça em etapas curtas, sem derrubar nada.
fol_torneio_curto|Escolheu o momento de acabar no torneio.
fol_refugiados_turnos|Revezou com os refugiados no ritmo da carroça.
fol_cuidou_do_fogo|Ficou no celeiro cuidando do fogo enquanto os outros abriam a trilha.
fol_tres_respiracoes|Aprendeu com o monge três respirações para as horas difíceis.
fol_duelo_curto|Propôs um duelo de três golpes para não esgotar nenhum dos dois.

azr_esperou_nuvem|Esperou a nuvem passar no dia do festival e chegou tarde, ensopado.
azr_riu_de_si|Riu de si mesmo diante da praça no dia da chuva só sua.
azr_virou_figurino|Dançou sob a chuva com um guarda-chuva emprestado e virou a estrela do festival.
azr_amigo_reparado|Reparou o dano de uma carta que chegou com uma hora de atraso.
azr_fugiu|Fugiu da cidade depois de uma carta atrasada.
azr_enfrentou_atraso|Expôs o próprio atraso ao magistrado sem rodeios.
azr_chuva_ajudou|Atravessou o desfiladeiro sob a chuva que lavou a emboscada.
azr_confiou|Confiou no momento sem esperar o pior, e superou o azar.
azr_esperou_demais|Esperou o tempo melhorar e perdeu a carga.
azr_dividiu_o_risco|Dividiu a carga em três caminhos para que o azar atingisse só um.
azr_ultimo_atraso_ok|Chegou na hora ao casamento da filha do amigo e contou a todos.
azr_fim_ok|Chegou na hora, pela primeira vez, e soube aproveitar.
azr_estrada_preparada|Levou guarda-chuva e cantil extra e socorreu estranhos na estrada.
azr_torneio_pior_caso|Preparou-se para o pior adversário do sorteio e perdeu com dignidade.
azr_troco_contado|Conferiu o troco três vezes até Noh passar a contar em voz alta.
azr_pagou_passagem|Pagou aos bandidos para passar, porque a flecha só acertava ele.
azr_festival_preparado|Pagou a taxa do festival sem discutir e atravessou antes de a lanterna cair.
azr_telhado_cedeu|Dormiu junto à porta do celeiro e escapou do telhado que cedeu.

irr_golpe_nomeado|Recuperou o golpe torto nomeando cada parte em voz alta.
irr_adiou|Adiou a prova do golpe torto e passou a conviver com a dúvida.
irr_forcou|Forçou o golpe até estalar o ombro.
irr_erro_virou_forma|Transformou um passo fora da marca em parte da forma, diante de Hwayang.
irr_caiu_em_publico|Caiu de joelhos diante da praça de Hwayang, no meio da exibição.
irr_recomecou|Recomeçou a forma do início, pedindo desculpas à plateia.
irr_dividiu_praca|Dividiu a exibição com um colega e a salvou com humor.
irr_caderno_ok|Anotou cada treino durante um ano e superou a irregularidade.
irr_padrao_visto|Viu no caderno o padrão que escondia a causa das falhas.
irr_caderno_abandonado|Abandonou o caderno do método da velha mestra.
irr_recusou_caderno|Recusou o caderno e aprendeu a rir do que não controla.
irr_fim_ok|Aprendeu, tarde, a conviver com a forma que cada um faz a seu jeito.
irr_forma_de_cada_um|Disse aos três jovens que a forma é de cada um e o mestre só indica o caminho.
irr_prova_em_tres_dias|Pediu para ser avaliado em três dias, e não em uma prova única.
irr_torneio_horario|Pediu as últimas chaves do torneio para achar o ritmo do dia.
irr_mestra_corrige|Pediu à mestra que o corrigisse a cada erro e perdeu metade dos tropeços.
irr_aquecimento|Aqueceu meia hora antes do duelo e chegou ao tom do corpo.
irr_ritmos|Descobriu, com a lanceira, que o golpe falha quando a respiração antecipa o pé.
irr_mestre_do_erro|Treinou três meses com o ex-árbitro e aprendeu a ver o erro como informação.

hes_chamou_irmao|Chamou o irmão pelo nome diante do cão do moinho, com a voz trêmula mas inteira.
hes_foi_buscar_ajuda|Foi buscar ajuda em vez de enfrentar o perigo, e chegou a tempo.
hes_ficou_parado|Ficou parado quando alguém precisava dele.
hes_falou_no_patio|Forçou uma frase curta diante dos três alunos mais velhos, e a voz saiu.
hes_voz_falhou|Teve a voz falhando diante dos alunos que cercavam um novato.
hes_novato_perdido|Fingiu não ver, e o novato foi embora da cidade.
hes_entrou_no_fogo|Entrou pelo vão de uma casa em chamas e tirou um menino.
hes_atravessou_o_medo|Atravessou o medo, uma vez, sem garantia, e superou a hesitação.
hes_tentou_e_falhou|Tentou entrar no fogo e voltou sem o menino, mas tentou.
hes_organizou_baldes|Organizou a fila de baldes enquanto outro entrava na casa.
hes_fim_ok|Disse a um jovem aprendiz a verdade sobre o medo.
hes_medo_dito|Disse que o medo não passa, mas se aprende a andar com ele nos ombros.
hes_pedra_no_cavalo|Jogou uma pedra no cavalo do líder dos bandidos e criou a confusão que salvou a carroça.
hes_denunciou_em_segredo|Levou em segredo a oferta da Lua Oca ao magistrado.
hes_recusou_duelo|Recusou o duelo e abriu outra passagem rio acima.
hes_categoria_formas|Venceu o torneio na categoria de formas, onde ninguém o atacava de frente.
hes_voz_emprestada|Entregou os documentos a Jang Hwa-ryeon e deixou que ela falasse por ele.
hes_cuidou_das_criancas|Cuidou das crianças no templo enquanto os outros enfrentavam a neve.

del_aprendeu_ervas|Aprendeu com Seo Yun a ler a febre antes de ela chegar.
del_cuidou_da_mae|Prometeu à mãe cuidar de si e descobriu que também cuidava dela.
del_jurou_forca|Jurou ficar mais forte que os meninos da neve e carregou a promessa como lenha.
del_virou_professor|Aceitou ser poupado do treino e virou professor dos iniciantes.
del_treinou_com_febre|Treinou com febre contra o conselho do mestre e pagou depois.
del_desmaiou_no_patio|Desmaiou no pátio ao exigir treinar como os outros.
del_treino_contado|Recebeu a cada noite o treino contado pelos colegas.
del_aceitou_carona|Aceitou a carona de um casal de camponeses na geada.
del_pediu_cuidado|Aceitou cuidado sem se sentir menos, e superou o orgulho do corpo frágil.
del_recusou_ajuda|Recusou ajuda na geada e chegou à estalagem com os lábios roxos.
del_manta_emprestada|Pediu emprestada a manta do casal e a devolveu na colheita.
del_fim_ok|Respondeu à menina que perguntou se dói ser frágil.
del_fraqueza_oficio|Fez ofício da fraqueza: ensinou o que o corpo frágil vê.
del_ervas_passadas|Passou a uma menina as ervas e os sinais do corpo.
del_inverno_templo|Passou um inverno no templo cuidando dos febris.
del_carona_cocheiro|Aceitou um lugar na carroça e chegou inteiro, com três histórias.
del_pulso_lido|Pediu ao médico que lesse seu pulso e seguiu os três hábitos a vida toda.
del_receita_do_caldo|Deu a Dae-hyun a receita de caldo para a irmã doente.
del_assembleia_sentada|Fez a assembleia falar sentada e em turnos curtos.
del_janela|Passou o último inverno junto à janela, ouvindo histórias.

ran_empurrou|Empurrou o menino da praça na lama diante de todos.
ran_guardou_o_nome|Guardou o nome e a data da ofensa, esperando o dia certo.
ran_perguntou_a_mae|Perguntou à mãe de onde vinha o nome da família e entendeu a ofensa como ignorância.
ran_perdoou_cedo|Aceitou o pedido de perdão do rival da praça diante dos colegas.
ran_perdao_frio|Perdoou de modo frio e o rival percebeu.
ran_recusou_perdao|Recusou o perdão do rival e carregou a recusa como punição.
ran_adiou_perdao|Adiou a resposta ao pedido de perdão para sempre.
ran_ofensa_largada|Abriu a porta ao cobrador cego e largou a ofensa antiga.
ran_abriu_a_porta|Deu abrigo, sem se identificar, ao velho cobrador que humilhou sua família.
ran_porta_fria|Abriu a porta ao cobrador com a voz áspera e o olhar duro.
ran_fechou_a_porta|Fechou a porta ao cobrador cego, e ele foi encontrado no riacho.
ran_indicou_o_templo|Indicou ao cobrador cego o templo e não se envolveu.
ran_fim_ok|Resolveu o que fazer com a pedra da ofensa, no fim da vida.
ran_pedra_ao_rio|Levou a pedra da ofensa ao rio e a deixou ir, em voz alta.
ran_venceu_rival|Venceu o rival da infância no torneio, sem poupar.
ran_lista_de_ofensas|Apresentou ao conselho a lista de ofensas do Clã Gwon à sua família.
ran_juramento_de_vinte_anos|Jurou que o Clã Gwon pagaria, mesmo que levasse vinte anos.
ran_duelo_antigo|Lutou no duelo da ponte com uma raiva que não era do mascarado.
ran_testemunha_falsa|Inventou uma testemunha para punir o filho do cobrador.
ran_recusou_taxa|Recusou a taxa ao oficial que humilhou sua família e foi retirado da praça.

dsp_limpou_o_mel|Derrubou o pote de mel por causa de uma borboleta e limpou tudo sem desculpas.
dsp_culpou_a_borboleta|Culpou a borboleta pelo pote derrubado e aprendeu a lição.
dsp_contou_os_passos|Aprendeu a contar os passos em voz baixa para carregar o pote.
dsp_pediu_troca|Contou ao mestre que cochilou de olhos abertos e pediu para sair da vigia.
dsp_ritual_de_vigia|Criou um ritual de três voltas por hora para vigiar o portão.
dsp_ritual_falhou|Viu o ritual de vigia falhar na quarta noite.
dsp_escondeu_o_lapso|Escondeu o lapso da vigia e deixou um ladrão escapar.
dsp_marca_vista|Viu a marca de roda no chão da passagem de montanha.
dsp_atencia_propria|Descobriu uma atenção própria que vê melhor soltando o olhar, e superou a dispersão.
dsp_perguntou_ao_guia|Perguntou ao guia o que fazer com a marca de roda.
dsp_ignorou_a_marca|Ignorou a marca de roda e a emboscada se fechou.
dsp_fim_ok|Olhou uma nuvem inteira, na varanda, e a atenção ficou.
dsp_olhar_herdado|Ensinou a um neto que olhar sem pensar também é ofício.
dsp_escola_variada|Escolheu uma escola de treinos curtos e variados.
dsp_duas_pedras|Treinou trocando duas pedras de mão enquanto a mestra ensinava.
dsp_dupla_no_armazem|Entrou no armazém em dupla: um vigiava, o outro lia.
dsp_arquivo_a_dois|Salvou o arquivo da Garça com um colega que anotava o que escapava.
dsp_tabuleta_de_noh|Anotou numa tabuleta o que precisava comprar e saiu da feira só com isso.
dsp_segunda_versao|Pediu que cada um repetisse a versão e achou o detalhe que desfez a acusação.

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
