# Dao das Mil Vidas

Jogo de texto de cultivação (xianxia / wuxia / murim) em português do Brasil. Sua vida avança por eventos aleatórios; escolhas e testes de sorte decidem o rumo; você envelhece, morre e herda algo para a próxima vida.

## Rodar no computador
```bash
npm install
npm run dev        # http://localhost:5173 (e na rede local, pelo IP mostrado)
```

## Jogar no celular
O jogo é um site estático (PWA): depois da primeira visita funciona offline e pode ser instalado na tela inicial, como um app.

**Opção A — mesma rede Wi-Fi (teste rápido):** rode `npm run dev` no PC e abra no celular o endereço `http://<IP-do-PC>:5173`. (Instalar como PWA exige HTTPS, então por aqui só dá para jogar no navegador.)

**Opção B — publicar de graça (recomendado para instalar):**
```bash
npm run build      # gera a pasta dist/
```
Envie a pasta `dist/` para qualquer hospedagem estática com HTTPS: Netlify Drop (arraste a pasta em app.netlify.com/drop), GitHub Pages, Cloudflare Pages ou Vercel. Abra o link no celular e use "Adicionar à tela inicial" (Chrome/Android: menu ⋮ → *Instalar app*; Safari/iOS: Compartilhar → *Adicionar à Tela de Início*).

O save fica no navegador (localStorage). Em *Herança do Dao → Opções* há backup (copiar/importar).

## Scripts
| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | verifica tipos e gera `dist/` |
| `npm run preview` | serve o build |
| `npm run sim -- 2000` | simula 2.000 vidas e imprime o relatório de balanceamento |
| `npm run icons` | regera os ícones do PWA |

## Estrutura
```
src/engine/   motor do jogo (sem DOM; usado pelo jogo e pelo simulador)
src/data/     conteúdo: eventos, itens, técnicas, reinos, finais, trilhas
src/ui/       interface mobile
sim/          simulador de vidas
docs/         pesquisa.md (gênero e glossário), design.md, eventos.md (como escrever eventos)
public/       manifest, service worker e ícones
```

## Adicionar eventos
Leia `docs/eventos.md`. Em resumo: crie ou edite um arquivo em `src/data/events/`, exporte um array de eventos e registre em `src/data/events/index.ts`. Depois rode `npm run sim`.
