# Arte — estilo "Tinta e Jade"

Toda a arte é **gerada por código** (SVG em `src/ui/art/`), sem imagens externas: funciona offline no PWA e no APK, pesa poucos KB e acompanha o tema claro/escuro (as cores vêm das variáveis CSS).

## Paleta
Tinta (`--ink`), papel (`--bg`/`--card`), **jade** `--jade`, **cinábrio** `--red`, **ouro** `--gold`, **azul-lua** `--blue`; fixos: violeta `#8a6fb8`, osso `#e9dfc6`, aço `#aab4bd`, sangue `#8f1f2b`, fogo `#e0742f`.

## Tamanhos e regras
- Ícones de item/técnica/trilha/reino: viewBox 64×64 (exibidos a 26–56 px). Retratos: 96×96. Cenários e cartões de final: 320×120.
- Traço arredondado (2–3 px), formas chapadas com um brilho; sem gradientes pesados nem filtros (60 fps em celular).
- **Raridade** = moldura: grau 1 cinza, 2 bronze, 3 jade (+brilho), 4 azul-lua (+cantoneiras), 5 ouro (+coroa e brilho forte). Técnicas: anéis e cor crescem com o grau.
- Variação por `hash(id)`: cor e detalhes de cada item são fixos e únicos.

## Módulos
- `core.ts`: paleta, hash, gerador pseudoaleatório, moldura.
- `icons.ts`: `itemIcon` (pílula, erva, lâmina, armadura, sino, espelho, caldeirão, estandarte, lanterna, talismã, manual, núcleo, anel, cristal, ovo, fruta, pergaminho, chave, tábua, semente), `techIcon` (selo por etiqueta), `pathIcon` (10 trilhas), `realmIcon` (círculos no xianxia, losangos no murim; 9 reinos).
- `portrait.ts`: retrato do jogador (idade aparente, trilha, reino, itens, corrupção) e de NPCs (mentor, rival, amigo, amor, discípulo, inimigo).
- `scenes.ts`: 12 cenários (vilarejo, cidade, seita, selva, montanha, ruínas, deserto, gelo, mar, reino secreto, submundo, céu; versão noturna) e cartões de final por motivo (sol, lâminas, raio, chama, fio, árvore, montanha, pagode, moeda, roda, caldeirão, garra, estrada, vazio).
- `duelo.ts` (Etapa 4): lutadores de lado e animação do duelo.

## Onde aparece
HUD (retrato), cartão do evento (cenário + retrato do NPC citado), Status (emblemas, técnicas), Mochila e Códice (ícones), tela final (cartão + retrato). `npm run galeria` gera `docs/galeria.html` com tudo para revisão.
