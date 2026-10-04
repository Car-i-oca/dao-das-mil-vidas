# Registro de programa de computador no INPI (instruções)

O pacote de depósito é gerado localmente; **nada dele é commitado** (a pasta `registro/` está no `.gitignore`).

## Gerar o pacote
```
npm run registro
```
Cria, em `registro/`:
- `dao-das-mil-vidas-<data>.zip`: o código-fonte da versão atual (`git archive` do commit atual; sem `node_modules`, sem arquivos ignorados);
- `hash-sha512-<data>.txt`: o hash SHA-512 do .zip, com a data, o commit e o tamanho.

Rode o comando com a árvore de trabalho **limpa e commitada**: ele recusa gerar o pacote se houver alterações pendentes, para que o .zip corresponda exatamente a um commit.

## Como usar no INPI
1. Acesse o e-INPI (login e senha de pessoa física) e escolha "Programa de computador" > "Pedido de registro".
2. Informe titular (autor) e dados do programa: título "Dao das Mil Vidas", linguagem TypeScript, campo de aplicação (entretenimento), tipo de programa (jogo).
3. No campo do resumo digital hash, informe o **SHA-512** do arquivo gerado (abra o `.txt`; o hash nunca é versionado).
4. Guarde o .zip original: ele é a prova do que foi depositado.
5. Pague a GRU; o registro é válido por 50 anos a partir de 1º de janeiro do ano seguinte à publicação.

## Atenção
- O registro protege o código e a expressão do programa, não a ideia do jogo.
- A marca "Dao das Mil Vidas" é outra coisa: o registro de marca é pedido à parte (classe 9 para software e jogos). Pesquisa prévia de anterioridade: ver `docs/marca.md`.
