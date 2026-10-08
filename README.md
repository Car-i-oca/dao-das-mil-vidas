# Murim Quest

RPG narrativo mobile em português brasileiro, passado no Jianghu. Cada vida começa com o livro de contas encontrado sob a ponte de Pedra Baixa; as escolhas abrem caminhos de escola, reputação, alianças e legado. O jogo combina cenas narrativas, testes de D20, equipamento, companheiros, treinamento e consequências que podem reaparecer décadas depois.

## Rodar localmente

```bash
npm ci
npm run dev
```

## Jogar

- Web e PWA: <https://car-i-oca.github.io/dao-das-mil-vidas/>. A primeira visita instala os arquivos para uso offline.
- Android: a Action **APK Android** gera o APK após um push em `main`; builds manuais ficam como artefatos de teste.
- O progresso fica no armazenamento local do navegador/app. Exporte o backup em **Legado → Opções** para transferi-lo entre instalações.

## Verificações

| Comando | Uso |
|---|---|
| `npm run build` | Tipagem TypeScript e build de produção |
| `npm run validate` | Referências, condições, itens, eventos e textos |
| `npm run endings` | Alcançabilidade dos finais |
| `npm run fuzz -- 300` | Invariantes do motor em vidas aleatórias |
| `npm run sim -- 1000 --report` | Distribuição de idade, faixas, itens e finais |
| `npm run variedade -- 1000` | Repetição e diversidade da campanha |
| `npm run impacto -- 100` | Efeito das escolhas e uso de flags |
| `npm run poder -- 100` | Chances de teste por faixa e por estilo |
| `npm run e2e:audio-start` | Inicialização da música local no navegador móvel |
| `npm run e2e:layout` | Limites e sobreposição em quatro tamanhos de celular |

Para os dois E2E, rode `npm run preview -- --port 4173` em outro terminal.

## Estrutura

- `src/engine/`: regras da vida, escolhas, tempo, combate, equipamento e progressão.
- `src/data/events/index.ts`: campanha e eventos ativos do Jianghu.
- `src/data/`: personagens, escolas, itens, companheiros, regiões e finais.
- `src/ui/`: interface mobile, áudio local e arte vetorial.
- `sim/`: validação e simulações do mesmo motor usado pelo jogo.
- `docs/`: design, guia de conteúdo e relatórios recentes de balanceamento.

## Regras de design

- `alignment` é o caminho marcial daoísta ou demoníaco; `morality` é a escala Bom/Mau/Ordem/Caos. Eles são conceitos separados.
- Uma decisão que abre um arco deve continuar como consequência de campanha, não encerrar a vida do personagem.
- A história nova acompanha pessoas, escolas e comunidades do Jianghu; as antigas listas xianxia não fazem parte da campanha ativa.
- A música é empacotada localmente em `public/audio/`; Web Audio fornece apenas efeitos curtos e pode falhar sem impedir a partida.

Antes de publicar conteúdo, rode pelo menos `npm run validate`, `npm run build` e `npm run endings`.
