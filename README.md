# Dao das Mil Vidas

Jogo de texto de cultivação (xianxia / wuxia / murim) em português do Brasil.

> **Dao das Mil Vidas © 2026 Andre Barbosa Vieira. Todos os direitos reservados.** O repositório é público para consulta e para distribuir o jogo; não há licença aberta (ver `LICENSE`, `docs/autoria.md` e `docs/licencas.md`).
 Sua vida avança por eventos aleatórios; escolhas e testes de sorte decidem o rumo; sua trilha de cultivo nasce de cenas da própria história; você envelhece, morre e herda algo para a próxima vida.

## Rodar no computador
```bash
npm install
npm run dev        # http://localhost:5173 (e na rede local, pelo IP mostrado)
```

## Jogar no celular
**Site (qualquer celular):** https://car-i-oca.github.io/dao-das-mil-vidas/ — atualizado sozinho a cada push na `main`.

**Instalar como app (PWA):** abra o site no celular. No Android (Chrome): menu ⋮ → *Instalar app* (ou o botão *Instalar como app* na tela inicial do jogo). No iPhone (Safari): Compartilhar → *Adicionar à Tela de Início*. Depois da primeira visita funciona offline.

**APK para Android (app de verdade):** baixe em https://github.com/Car-i-oca/dao-das-mil-vidas/releases/download/android-latest/dao-das-mil-vidas.apk (ou pela página da Release `android-latest`). Abra o arquivo no celular e permita a instalação de apps desta fonte. O APK é recompilado e assinado na nuvem (GitHub Actions) a cada push, sempre com a mesma chave, então dá para instalar a versão nova por cima da antiga sem perder o save. iPhone não aceita APK; use o PWA.

**Rede local (teste rápido):** `npm run dev` no PC e abra `http://<IP-do-PC>:5173` no celular.

**Hospedar em outro lugar:** `npm run build` gera a pasta `dist/`; envie-a para Netlify Drop, Cloudflare Pages ou Vercel.

O save fica no navegador ou no app (localStorage), separado entre site, PWA e APK. Em *Herança do Dao → Opções* há backup (copiar/importar) para levar o progresso de um para o outro.

## Como o APK é gerado
`.github/workflows/android.yml` roda `npm run build`, cria o projeto Android com Capacitor (`capacitor.config.json`), gera os ícones a partir de `assets/`, compila o APK release e o assina com a chave guardada nos segredos `ANDROID_KEYSTORE_B64` e `ANDROID_KEYSTORE_PASSWORD` (alias `cultivo`). A pasta `android/` não é versionada. Pushes na `main` publicam a release `android-latest`; para testar uma branch antes do merge, execute manualmente o workflow **APK Android** em *Actions → APK Android → Run workflow*. Cada execução manual publica uma release de teste com o arquivo `.apk` disponível para download direto (sem descompactar artefato). Builds manuais não substituem a release estável e, sem os segredos de assinatura, usam uma chave temporária: desinstale a versão anterior antes de instalar.

## Scripts
| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | verifica tipos e gera `dist/` |
| `npm run preview` | serve o build |
| `npm run sim -- 4000` | simula 4.000 vidas (`--meta` joga em sequência com desbloqueios; `--report` grava `docs/balanceamento.md`) |
| `npm run validate` | confere referências cruzadas e a qualidade do texto (marcadores, tamanhos, repetições) |
| `npm run variedade -- 3000` | mede repetição, diversidade entre vidas e distribuição de finais (grava `docs/variedade.md`; `--baseline` fixa o ponto de comparação) |
| `npm run fuzz -- 3000` | joga vidas com escolhas aleatórias e confere invariantes (sem NaN, atributos na faixa, etc.) |
| `npm run endings` | confere que cada final com evento próprio é alcançável |
| `npm run icons` | regera os ícones do PWA e as fontes do APK |
| `npm run poder -- 400` | verifica a sensação de poder: chance de sucesso por reino, eventos por faixa de reino, comparação entre trilhas (`docs/poder.md`) |
| `npm run impacto -- 50` | verifica o impacto das escolhas: escolhas sem marca, flags nunca lidas, mínimos por talento/defeito/origem/raiz/constituição, semelhança entre vidas (`docs/impacto.md`; `--baseline` fixa o "antes") |
| `npm run galeria` | gera `docs/galeria.html` com todos os ícones, retratos e cenários |
| `npm run e2e:arte -- manhwa` | tira prints da galeria de arte de um estilo (`manhwa`, `tinta` ou `pixel`) a 390 px (precisa de `npm run preview -- --port 4173`) |
| `npm run e2e:estilo` | troca de estilo pela interface, começa uma vida e toca um duelo em cada estilo |
| `npm run e2e:duelo` | teste de navegador dos duelos animados (precisa de `npm run preview -- --port 4173`) |
| `npm run registro` | gera, em `registro/` (fora do git), o .zip do código-fonte e o hash SHA-512 para o registro no INPI (`docs/registro-inpi.md`) |

## Estrutura
```
src/engine/   motor do jogo (sem DOM; usado pelo jogo e pelo simulador)
src/data/     conteúdo: eventos, itens, técnicas, reinos, finais, trilhas
src/ui/       interface mobile; art/ (três estilos de arte gerados por código: manhwa, tinta e pixel 16-bit), duelo.ts (cena animada), galeria.ts (página de teste da arte)
sim/          simulador de vidas e validador de conteúdo
docs/         pesquisa.md, design.md, eventos.md (como escrever eventos), lotes.md, balanceamento.md
public/       manifest, service worker, ícones do PWA e as primeiras amostras de estilo de arte (estilos.html, só registro)
assets/       fontes de ícone e abertura do APK
```

## Estilos de arte
Três estilos, todos desenhados por código (sem imagens de terceiros): **Manhwa** (padrão, visual de web novel), **Tinta** (pintura chinesa de poucos traços) e **Pixel 16-bit**. Troque em *Herança do Dao → Opções → Estilo de arte* ou pelo botão da tela inicial; a escolha fica salva. Detalhes em `docs/arte.md`.

## Como o jogo faz as escolhas pesarem
- **Conduta:** toda escolha soma ao perfil do personagem (compaixão, violência, astúcia, cautela, ambição, disciplina, devoção, ganância); a virtude dominante vira alcunha e abre, fecha e muda opções.
- **Opções exclusivas:** talentos, defeitos, origens, raízes, constituições, trilhas e técnicas têm opções próprias em eventos comuns (`src/data/opcoes.ts`, `moldes_*`), com selo na tela indicando o motivo. Os defeitos também fecham opções (impulsivo não recua, orgulhoso não se curva...), e podem ser superados num arco de redenção.
- **Afinidades:** cada traço atrai os acontecimentos do seu tipo (`src/data/afinidades.ts`), então vidas diferentes veem eventos diferentes.
- **Técnicas:** têm estágios de domínio (Iniciante a Perfeição), o mundo reage a elas, podem ser fundidas e algumas vêm de seitas extintas.
- **Marcas da vida:** decisões que gravam flags viram linhas do que você deixou para trás, e rendem um pouco de Herança.
- **Missões e progressão da seita:** contratos aceitos na aba Missões acompanham caçadas, coletas e receitas; torneios podem elevar seu rank e abrir o Pavilhão VIP.
- **Chefões regionais:** sobreviva a encontros num bioma para atrair seu guardião; chefões têm padrões de ataque e podem resistir a efeitos de status.
- **Técnicas marciais e status:** técnicas ativas gastam Qi, entram em recarga e podem aplicar efeitos; o Qi recupera com a passagem dos turnos.
- **Equipamentos, companheiros e facções:** armas e armaduras ocupam slots e alteram atributos; até dois aliados dão bônus passivos, enquanto reputação com três facções pode atrair apoio ou emboscadas.
- **Sagas de aventura:** mapas e escolhas iniciam cadeias de eventos; testes usam bônus do equipamento e dos companheiros, e desfechos podem conceder peças complementares. A Forja Silenciosa é o arco de referência.
- **Mundo dinâmico:** o dia, horário e clima variam durante a jornada; chuva, nevasca e noite alteram testes, com proteção contra frio fornecida por equipamento.
- **Aventura mobile:** arte 16-bit em painel próprio, narrativa e escolhas com rolagens de D20 em combate; música e efeitos só são iniciados após a interação inicial do jogador.

## Adicionar eventos
Leia `docs/eventos.md`. Em resumo: crie ou edite um arquivo em `src/data/events/`, exporte um array de eventos e registre em `src/data/events/index.ts`. Depois rode `npm run validate` e `npm run sim -- 4000`.
