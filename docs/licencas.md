# Licenças e dependências de terceiros

O jogo em si (código, textos, eventos, personagens, arte e documentação) é **Todos os direitos reservados © 2026 Andre Barbosa Vieira** (ver `LICENSE`).
A seguir, tudo o que vem de terceiros. Nada de terceiros é copiado para o jogo além do código das bibliotecas abaixo.

## Dependências de desenvolvimento (não vão para o jogo, exceto onde indicado)

| Pacote | Uso | Licença |
|---|---|---|
| `vite` | empacotador do site (o resultado é código próprio, minificado) | MIT |
| `typescript` | compilador e checagem de tipos | Apache-2.0 |
| `tsx` | executa os simuladores e validadores | MIT |
| `@types/node` | tipos para os scripts em Node | MIT |
| `playwright-core` | testes de navegador (só desenvolvimento) | Apache-2.0 |
| `@capacitor/core`, `@capacitor/android`, `@capacitor/cli` | empacota o site como APK; o tempo de execução do Capacitor vai dentro do APK | MIT |

As dependências indiretas (listadas em `package-lock.json`) têm licenças permissivas (MIT, ISC, BSD, Apache-2.0); confira com `npx license-checker` antes de qualquer distribuição comercial.

## Android (APK)
O APK inclui o AndroidX e o Capacitor Android (Apache-2.0 e MIT). Nenhum outro componente de terceiros.

## Fontes e imagens
- **Fontes:** a interface solicita fontes externas ao Google Fonts e usa fontes de sistema como alternativa.
- **Arte (ícones, retratos, cenários, lutadores):** gerada por código em `src/ui/art/`; original.
- **Ícones do app e telas de abertura:** gerados por `scripts/gen-icons.mjs`; originais.
- **Sons e música:** efeitos sintetizados no app e uma faixa local em `public/audio/murim-wuxia.ogg`.
- **Pacotes de arte prontos:** nenhum até agora. Se algum for usado (somente CC0 ou licença livre equivalente), será registrado aqui com fonte e licença.

## Conteúdo narrativo
O conteúdo ativo acompanha escolas, famílias e comunidades do Jianghu. Personagens, locais, itens, textos e arte são criados para este projeto; a evolução da campanha está descrita em `docs/autoria.md`.
