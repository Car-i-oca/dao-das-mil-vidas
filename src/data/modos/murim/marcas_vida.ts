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
