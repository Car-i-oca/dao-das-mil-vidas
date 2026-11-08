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
