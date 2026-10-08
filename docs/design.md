# Design atual de Murim Quest

## Fantasia e ciclo

O jogador vive uma vida no Jianghu, a rede de escolas, aldeias, caravanas e conselhos do cenário. A história começa aos seis anos, quando encontra o livro de contas sob a ponte de Pedra Baixa. Depois de cenas de formação e juventude, escolhas e testes definem como a pessoa se envolve no conflito do Clã Gwon e o que deixa para trás.

O ciclo de jogo é: ler uma cena → escolher uma ação → resolver o teste de D20 quando houver → aplicar efeitos e consequências → avançar o tempo e receber outra cena. A progressão de faixa representa domínio marcial e reconhecimento no mundo. A vida termina por idade, ferimentos, combate ou decisão voluntária.

## Conceitos que precisam ficar separados

- **Caminho marcial (`alignment`)**: tradição daoísta ou demoníaca, usada para regras de cultivo e algumas opções.
- **Moralidade (`morality`)**: quatro pontuações independentes — Bom, Mau, Ordem e Caos — alteradas por escolhas e usadas em reações/opções específicas.
- **Faixa (`tier`)**: nível de domínio no Jianghu; não equivale a imortalidade. Evite séculos de vida ou poderes de xianxia em uma história de escolas marciais humanas.
- **Fama e reputação**: reconhecimento público e relações com grupos têm usos distintos; cada tela deve explicar que ação altera cada valor.

## Campanha

1. **Infância e o livro**: três decisões iniciais mudam quem guarda a prova e definem rotas de refugiados, armazém ou magistrado.
2. **Aprendizado**: o jogador escolhe escola, ofício ou caminho independente. Im Seol, Seo Yun, Baek Mu-jin e Jang Hwa-ryeon voltam em cenas ligadas às escolhas anteriores.
3. **Hwayang**: prova, testemunha, torneio e julgamento criam caminhos de justiça, trégua, duelo, acordo ou exílio.
4. **Consequências**: a decisão reorganiza aldeias e escolas; uma assembleia pode estabelecer apoio, patrulha conjunta ou compromissos públicos.
5. **Legado pessoal**: a escola da Garça, a proteção das estradas ou a publicação do método de Im Seol são projetos de longo prazo. O jogador pode persegui-los até o fim da vida.
6. **Fim de vida**: a velhice fecha a crônica; decisões de juventude influenciam o epílogo.

As rotas narrativas são condicionais e não devem aparecer juntas quando são mutuamente exclusivas. Flags de campanha precisam ser gravadas, lidas numa condição/evento ou traduzidas num efeito claro de legado. Agendamentos só devem disparar quando suas próprias condições forem válidas.

## Testes e equilíbrio

Os testes usam atributos, equipamento, companheiros, faixa da ameaça e dificuldade declarada pelo evento. Um D20 é mostrado ao jogador; sucesso/falha e efeitos precisam corresponder ao valor real do dado. Recalibre dificuldades por simulação depois de qualquer alteração em atributos, bônus ou fórmula.

Metas atuais de análise:

- O jogador deve ter opções com risco legível; não apresente um teste como provável quando a chance calculada é baixa.
- Uma faixa avançada deve ser alcançável numa vida comum, sem ser garantida pelo bot.
- Eventos de campanha precisam aparecer em rotas válidas; eventos genéricos não podem dominar a narrativa.
- Itens comprados ou encontrados devem equipar, consumir, ativar uma regra concreta ou servir a uma troca valorizada. Remova descrições de efeito que o motor não implementa.

Use `npm run sim -- 1000 --report`, `npm run poder -- 100`, `npm run variedade -- 1000` e `npm run impacto -- 100` como diagnósticos. Relatórios antigos do jogo xianxia não são uma linha de base válida para Murim Quest.

## Interface e áudio

A interface deve caber em telas estreitas sem sobreposição. Arte, história, escolhas e navegação têm limites independentes; a rolagem fica nos painéis de conteúdo. Teste em 320×568, 360×640, 390×844 e 430×932. A música vem de um arquivo local no pacote, começa após ação explícita e pausa quando o app vai para segundo plano. Efeitos Web Audio são opcionais.

## Arquitetura

- `src/engine/engine.ts`: motor sem DOM, compartilhado com as simulações.
- `src/data/events/index.ts`: catálogo tipado da campanha.
- `src/data/`: tabelas de itens, estilos, personagens, companheiros, mundo e finais.
- `src/ui/`: interface e mídia do cliente.
- `sim/`: validação estática, fuzzing e relatórios de distribuição.
