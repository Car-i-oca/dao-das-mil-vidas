# Arte — três estilos, todos gerados por código

Toda a arte é **desenhada por código** (SVG e pixel art em `src/ui/art/`), sem imagens nem fontes de terceiros: funciona offline no PWA e no APK e pesa poucos KB. **Nenhum recurso externo é usado, então não há licença de terceiros para registrar** (ver `docs/licencas.md`). O jogador troca de estilo em **Herança do Dao → Opções → Estilo de arte** (ou pelo botão "Estilo de arte" da tela inicial); a escolha fica salva. O padrão é o **Manhwa**.

## Como funciona
- `estilo.ts`: tipo `Estilo` (`manhwa` | `tinta` | `pixel`), estilo ativo e o contrato `Pacote` (item, técnica, trilha, reino, retrato, cenário, final, lutador do jogador, oponente).
- `index.ts`: fachada. `main.ts` e `duelo.ts` só chamam `itemIcon`, `portraitSvg`, `sceneSvg`…; a fachada escolhe o desenho do estilo ativo e, se um estilo não desenha algo, cai na arte "clássica" original (`icons.ts`, `portrait.ts`, `scenes.ts`, `lutadores.ts`, que também guardam os dados compartilhados: motivos dos itens, trilhas e oponentes).
- Trocar de estilo refaz a tela na hora (toda a interface é redesenhada a cada ação). `amostraDe()` mostra a prévia de cada estilo nas opções sem trocar o ativo.
- Teste: `?arte=<estilo>&sec=<itens|tecnicas|trilhas|reinos|cenarios|finais|retratos|lutadores>` abre a galeria interna daquele estilo; `node tools/e2e/arte.mjs <estilo> [seções] [pasta]` tira prints a 390 px; `node tools/e2e/estilo.mjs` troca de estilo pela interface, começa uma vida e toca um duelo em cada um.

## Os estilos
**Manhwa** (`manhwa/`): cara de web novel atual. Contorno firme, cel-shading com gradiente, brilho especular, luz de contorno colorida pela aura do reino, círculos mágicos atrás dos retratos (mais anéis e runas a cada reino), partículas, vinheta e raridade por moldura neon (grau 4 ganha cantoneiras, grau 5 ganha coroa). Retratos com olhos grandes e brilhantes, cabelo em camadas com mechas e acessórios por trilha.

**Tinta** (`tinta/`): pintura chinesa de poucos traços. O traço é uma **pincelada de verdade**: um polígono de largura variável (começa firme, sustenta e afina até a ponta, com leve aspereza só na borda e fios de papel no pincel seco), calculado em `traco()`; nada de tremor por filtro. As cores são lavis translúcidos com a borda mais carregada, muito papel em branco, névoa entre os planos e **um selo vermelho** em cada peça (marca geométrica, sem depender de fontes). O grau da técnica fecha o círculo de pincel (ensō).

**Pixel 16-bit** (`pixel/`): sprites de verdade (`surf.ts`): formas com sombreamento automático por faixas (brilho em cima/esquerda, sombra embaixo/direita, pontilhado na transição), contorno escuro, céus em degradê pontilhado e cenários em camadas (céu, sol, nuvens, duas cordilheiras com perspectiva atmosférica, elementos do lugar, primeiro plano e vinheta). Cada sprite vira um PNG minúsculo em cache, ampliado sem suavizar.

## Tamanhos
Ícones 64×64 (manhwa e tinta) ou 32×32 (pixel), exibidos a 26–64 px. Retratos 120×120 (pixel: 48×48). Cenários e finais 320×120 (pixel: 160×60). Lutadores 120×140 (pixel: 60×70).

## Raridade e variação
Itens: moldura por grau (1 cinza, 2 bronze, 3 jade, 4 azul, 5 ouro; no tinta, o grau 5 ganha folhas de ouro). Técnicas: anéis e cor crescem com o grau. Cada item tem cor e detalhes fixos por `hash(id)`. Os finais têm um motivo próprio (sol, lâminas, raio, chama, fio, árvore, montanha, pagode, moeda, roda, caldeirão, garra, vaso, estrada, vazio, livro, sino, olho, rio, trono, mão, coração) e cada final de traço de personagem aponta para um deles em `scenes.ts`.

## Onde aparece
HUD (retrato), cartão do evento (cenário + retrato do NPC citado), Status (emblemas, técnicas), Mochila e Códice (ícones), tela final (cartão + retrato) e duelos (cenário, lutadores e efeitos).

## Pixel art 16-bit da nova geração (amostra, `src/ui/art/pixel2/`)
O pixel passou a ser o estilo padrão (quem nunca escolheu estilo vê o pixel; quem escolheu antes mantém a escolha). A nova geração é desenhada por **campos de distância (SDF)**: cada forma tem uma normal calculada, a luz vem sempre do canto superior esquerdo e o resultado é quantizado em 5 tons de uma rampa fixa, com **contorno seletivo** (cor da própria rampa, mais claro do lado da luz) e brilho especular em metal, jade e pílulas.
- **Paleta fixa**: 18 rampas de 5 tons (90 cores, `pal.ts`). O pedido sugeria 32 a 48 cores; fiquei em 90 porque cada matiz precisa de 5 tons e o jogo tem muitos materiais. Dá para reduzir juntando rampas parecidas, se você preferir.
- **Resolução**: itens 32x32, retratos 64x64, cenários 320x180 em camadas, lutadores 48x64 com 11 quadros (parado 2, ataque 3, técnica 3, dano, vitória, derrota) e efeitos de técnica 48x48.
- **Cenários**: céu, nuvens, longe, meio, água, perto e luzes saem em camadas separadas; no app as nuvens deslizam, a água cintila e as lanternas piscam (SMIL), com versão de dia e de noite.
- **Pessoas**: o retrato mostra idade (criança a ancião), trilha (roupa), reino (aura e anéis), gênero, corrupção (olhos e veias) e papel (rival, mestre, amigo...).
- **Feito na amostra**: 6 itens (espada, pílula, manual, talismã, jade, bolsa), 4 retratos, 2 cenários (vilarejo e montanha, dia e noite) e o duelo animado com 5 tipos de oponente humano. Os outros itens, técnicas, trilhas, reinos, cenários, oponentes e cartões de final **ainda usam o pixel anterior** até você aprovar o padrão.
- **Como ver**: `npm run arte:amostra` salva folhas em `.tmp/art/` (o repositório guarda cópias em `docs/arte-pixel-amostra/`); `npm run e2e:pixel` tira prints no app (precisa do preview v2 na porta 4174).

## Padrão da imagem de referência: "pintar e pixelizar" (`src/ui/art/pintura/`, substitui a amostra geométrica)
A referência é pixel art com cara de pintura: manchas orgânicas, sem pontilhado e sem halos, proporções naturais, busto fechado, fundo pintado, paleta natural com luz de recorte amarela e contorno escuro só onde define forma. A amostra geométrica (`pixel2/`) fica no repositório só como histórico; o app usa `pintura/`.
- **Técnica**: (1) cada peça é pintada em alta resolução num canvas (`base.ts`: manchas de contorno irregular com ruído, pinceladas, folhagem por centenas de pinceladas, gradientes, desfoque, tinta); (2) é reduzida por média de área; (3) é quantizada para a paleta fixa **sem pontilhado** (distância "redmean") e os pixels órfãos são limpos; (4) é exibida ampliada com `image-rendering: pixelated`.
- **Paleta** (`paleta.ts`): cerca de 150 cores naturais e um pouco dessaturadas em rampas (pele, cabelo, folha, pano, ouro, ceu, noite, agua...). O pedido era 32 a 48 cores; manter a paleta curta não era possível com folhagem, céu de dia e de noite, pele e panos. Dá para reduzir.
- **Resolução**: retrato 96x96, itens 48x48, cenário 320x180, lutadores 48x64 (os mesmos 11 quadros do esqueleto de poses).
- **Regras para qualquer peça nova**: sem anéis, sem pontilhado, sem fundo chapado; luz vem da direita (recorte amarelo na borda do cabelo e da gola); contorno de tinta só em cabelo, olhos, gola, separação de roupas e borda de sombra; olhos com pouca informação, nariz e boca de 2 ou 3 pixels; cabelo em blocos grandes com fios de luz; dobras com poucas manchas.
- **Como gerar e ver**: `npm run build:v2 && npx vite preview --mode v2 --outDir dist-v2 --port 4174`, depois `npm run arte` (grava `docs/arte-pixel-amostra/nova/*.png`, `folha-nova.png` e `comparacao.png`, com a referência lida de `C:\Users\Andre\OneDrive\Documentos\exemploarte.webp`, que NÃO entra no repositório). O app também tem `?arte=amostra`.
- **Diferenças que ainda restam em relação à referência**: o rosto da referência é mais claro e mais definido (olhos maiores, contorno mais marcado, nariz e boca mais nítidos); os nossos rostos saem mais lisos e simétricos; o cabelo da referência é bagunçado e em pontas, o nosso é mais arrumado; a referência tem pixels maiores e menos detalhe (80 a 100 px de largura, aparência de blocos), o nosso 96x96 tem manchas suaves demais em algumas áreas; os cenários e itens estão mais perto do padrão que os rostos.
