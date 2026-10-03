# Dao das Mil Vidas

Jogo de texto de cultivação (xianxia / wuxia / murim) em português do Brasil. Sua vida avança por eventos aleatórios; escolhas e testes de sorte decidem o rumo; você envelhece, morre e herda algo para a próxima vida.

## Rodar no computador
```bash
npm install
npm run dev        # http://localhost:5173 (e na rede local, pelo IP mostrado)
```

## Jogar no celular
**Site (qualquer celular):** https://car-i-oca.github.io/dao-das-mil-vidas/ — atualizado sozinho a cada push na .

**Instalar como app (PWA):** abra o site no celular. No Android (Chrome): menu ⋮ → *Instalar app* (ou o botão *Instalar como app* na tela inicial do jogo). No iPhone (Safari): Compartilhar → *Adicionar à Tela de Início*. Depois da primeira visita funciona offline.

**APK para Android (app de verdade):** baixe em https://github.com/Car-i-oca/dao-das-mil-vidas/releases/download/android-latest/dao-das-mil-vidas.apk (ou pela página da Release ). Abra o arquivo no celular e permita a instalação de apps desta fonte. O APK é recompilado e assinado na nuvem (GitHub Actions) a cada push, com a mesma chave, então dá para instalar a versão nova por cima da antiga sem perder o save. iPhone não aceita APK; use o PWA.

**Rede local (teste rápido):**  no PC e abra  no celular.

**Hospedar em outro lugar:**  gera a pasta ; envie-a para Netlify Drop, Cloudflare Pages ou Vercel.

O save fica no navegador/app (localStorage), separado entre site, PWA e APK. Em *Herança do Dao → Opções* há backup (copiar/importar) para levar o progresso de um para o outro.

## Como o APK é gerado
 roda , cria o projeto Android com Capacitor (), gera os ícones a partir de , compila o APK release e o assina com a chave guardada nos segredos  e  (alias ). A pasta  não é versionada.

## Scripts
| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | verifica tipos e gera `dist/` |
| `npm run preview` | serve o build |
| `npm run sim -- 4000` | simula 4.000 vidas (`--meta` joga em sequência com desbloqueios; `--report` grava docs/balanceamento.md) |
| `npm run validate` | confere referências cruzadas do conteúdo |
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
