---
name: arte
description: Use ao produzir ou revisar arte do Murim Quest (retratos, cenários, itens, lutadores, efeitos). Pipeline pintar-e-pixelizar, os estilos, o gerador de aparência e a regra de renderizar, olhar e corrigir cada peça.
---

# Arte

## Estado
- Estilos selecionáveis em `src/ui/art/`: `pixel/`, `manhwa/`, `tinta/` (+ padrão antigo). A arte do Xianxia reaproveita os mesmos cenários e ícones por tipo; falta a arte própria (sub-lote 1B).
- Gerador de aparência por pessoa: `src/ui/art/pintura/aparencia.ts` (rosto, tez, olhos, cabelo, barba, marcas, acessórios, traje; determinístico; guarda em `State.look` e `Pessoa.visual`). **Nenhum estilo atual o desenha ainda.** Estilo «pintura» e pixel2 estão só na branch `arquivo/v2-reestruturacao` (retratos 96×96, itens 48×48, cenários 320×180 dia/noite, lutadores com 11 quadros).
- Meta do autor: pixel art 16-bit detalhada; tamanho do app não importa; arte nova **não é aplicada ao jogo inteiro sem o autor ver** (gerar amostras e prancha de comparação).

## Regras
- **Renderize cada peça em PNG no tamanho real e ampliado, OLHE a imagem e corrija** (leitura em tela pequena, proporção, contraste, paleta e luz coerentes) antes de seguir. Repita até ficar bom.
- Paleta limitada e coerente (32–48 cores no jogo), sombreamento em 3–5 tons por material, luz sempre do mesmo lado, contorno seletivo, texturas diferentes por material.
- Personagens diferentes têm aparências diferentes (NPCs, oponentes e jogador); recorrentes mantêm a mesma aparência a vida toda (a idade só acrescenta rugas e cabelo grisalho).
- Cenário pelo lugar da cena (vila, rio, floresta, estalagem, estrada, montanha…), com dia e noite.
- `npm run galeria` gera `docs/galeria.html`; `npm run e2e:arte` e `e2e:estilo` conferem os estilos; `e2e:layout` confere que nada escapa da tela.
