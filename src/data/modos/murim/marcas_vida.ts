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
