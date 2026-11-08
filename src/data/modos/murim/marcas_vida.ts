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
