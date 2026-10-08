# Arte e interface

Murim Quest tem três estilos de ilustração gerados pelo código em `src/ui/art/`: Manhwa, Tinta e Pixel. A seleção fica nas opções do app e é lembrada no aparelho. A tela de galeria permite conferir ícones, cenários, personagens, itens e faixas.

## Limites de interface

- O app ocupa a altura útil do celular e considera as áreas seguras do sistema.
- Cabeçalho, cena, narrativa, escolhas e abas permanecem em áreas separadas.
- Texto da narrativa e lista de escolhas têm rolagem própria; a página inteira não deve criar uma segunda barra horizontal.
- Mantenha controles com área de toque clara e não dependa só de cor para indicar sucesso, falha ou estado.
- Teste 320×568, 360×640, 390×844 e 430×932 com `npm run e2e:layout`.

## Áudio

A trilha `public/audio/murim-wuxia.ogg` é local e deve carregar dentro do pacote Android e da PWA. Ela começa após o toque inicial, fica em loop e pausa quando o app entra em segundo plano. Efeitos curtos são opcionais e gerados por Web Audio. Verifique `npm run e2e:audio-start` após mudanças de endereço, formato ou carregamento da mídia.

## Diagnóstico visual

`npm run galeria` atualiza `docs/galeria.html`. Para conferir cada linguagem visual, execute `npm run e2e:arte -- manhwa`, `-- tinta` ou `-- pixel` com o servidor de preview em `http://localhost:4173`.
