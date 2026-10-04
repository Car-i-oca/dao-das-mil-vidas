# Como escrever um molde (formato v2)

Guia do formato novo de cenas, descrito em `docs/design-v2.md`. **Ainda é uma especificação**: o motor que o executa será construído na Fase 2 (branch `reestruturacao`), e o formato pode receber ajustes finos lá. Não substitui `docs/eventos.md`, que continua valendo para o jogo atual até a migração.

## 1. A ideia em uma frase
Um **molde** é uma cena com **papéis** (quem e onde participa) que o motor preenche com entidades do **mundo** (pessoas, facções, lugares), escolhida por **relevância** no momento certo, cujas **opções** mudam o mundo.

## 2. Regras de ouro
1. **Toda opção é escrita para a cena.** Não existe opção genérica "por categoria", nem texto reaproveitado em outra cena.
2. **Toda opção muda o mundo** (opinião, memória, reputação, posse, objetivo, fio, morte). Se não muda nada além de um número, a cena é *respiro* e fica curta.
3. **O texto só diz o que o motor garante.** Nada de "se você aceitou… se recusou…": se a cena depende do que aconteceu, ela declara a condição em `quando` ou usa uma **variante** por estado.
4. **Opções de build existem onde fazem sentido.** Um traço sem solução na cena simplesmente não tem opção ali.
5. **Defeitos fecham ou forçam opções dentro da cena**, com selo do motivo visível.
6. Cenas de **fio** declaram a etapa (abrir, avançar, fechar) e o que acontece se o fio for abandonado.

## 3. Formato (TypeScript)

```ts
// src/data/v2/moldes/rival.ts
import { molde } from '../molde';

export default molde({
  id: 'rival_desafio_publico',
  titulo: '{rival.nome} desafia você diante de {seita.nome}',
  tipo: 'perigo',                 // respiro | preparo | perigo | climax | consequencia | personagem
  capitulos: ['entrada', 'ascensao'],
  unico: true,

  // Papéis: o motor liga cada um a alguém que existe (ou cria, se `criar` estiver definido)
  papeis: {
    rival: { pessoa: { papel: 'rival', opiniaoMax: -20, reinoMin: 'jogador-1' } },
    seita: { faccao: { de: 'rival' } },
    praca: { lugar: { dono: 'seita', tipo: 'praca' } },
  },

  // Pré-condições (jogador + papéis + mundo + diretor)
  quando: {
    jogador: { reinoMin: 1 },
    mundo: { faccaoEstado: { seita: ['paz', 'tensao'] } },
    fio: { rival: { etapaMin: 1 } },
  },

  // Relevância: cada termo verdadeiro soma. Quanto mais específico, mais salience.
  relevancia: [
    { se: { papel: { rival: { objetivo: 'vingar' } } }, mais: 30 },
    { se: { papel: { rival: { fato: 'humilhado' } } }, mais: 15 },
    { se: { jogador: { talento: ['coracao_inabalavel'] } }, mais: 5 },   // marca do build
  ],

  cena: [
    {
      se: { papel: { rival: { fato: 'humilhado' } } },   // variante por estado
      texto: '{rival.nome} não esqueceu o dia em que você o fez ajoelhar na lama. Hoje, diante de toda a {seita.nome}, ele pede o duelo que nunca aconteceu.',
    },
    {
      texto: '{rival.nome} sobe ao estrado da {praca.nome} e aponta para você: quer medir forças diante de toda a {seita.nome}.',
    },
  ],

  opcoes: [
    {
      id: 'aceitar',
      texto: 'Aceitar o duelo.',
      teste: { tag: 'combate', ameaca: 'rival' },        // usa o reino do rival
      sucesso: {
        texto: 'Você vence sem humilhá-lo mais do que o necessário. A praça vê.',
        efeitos: [
          { opiniao: ['rival', -10] }, { fato: ['rival', 'derrotou_jogador', 3] },
          { reputacao: ['seita', 8] }, { fio: ['rival', 'avancar'] },
        ],
      },
      falha: {
        texto: 'O primeiro golpe dele acerta. Você cai diante de todos.',
        efeitos: [{ ferir: 'jogador', n: 2 }, { fato: ['rival', 'venceu_jogador', 4] }, { objetivo: ['rival', 'superar'] }],
      },
    },
    {
      id: 'recusar',
      texto: 'Recusar, e deixar que o chamem de covarde.',
      requer: { defeitoNao: ['orgulho_ferido'] },       // quem tem Orgulho Ferido não consegue recusar
      selo: { se_bloqueado: 'Orgulho Ferido: você não consegue recusar' },
      efeitos: [{ reputacao: ['seita', -6] }, { opiniao: ['rival', -5] }, { fato: ['rival', 'viu_recuar', 2] }],
    },
    {
      id: 'veneno_no_cha',                              // solução de build, escrita para esta cena
      texto: 'Mandar, na véspera, um bule de chá para {rival.nome}. Ele não vai lutar bem.',
      requer: { trilha: ['venenos'] },
      selo: 'Caminho dos Venenos',
      teste: { tag: 'veneno', ameaca: 'rival' },
      sucesso: { texto: '{rival.nome} tropeça no estrado e desiste com a vista turva. Ninguém sabe por quê.', efeitos: [{ fato: ['rival', 'envenenado_sem_saber', 4] }, { fio: ['rival', 'avancar'] }] },
      falha: { texto: '{rival.nome} cheira o chá, entende e não fala nada. Só olha.', efeitos: [{ opiniao: ['rival', -30] }, { objetivo: ['rival', 'expor_jogador'] }] },
    },
  ],

  fio: { id: 'rival', etapa: 2, abandono: 'O rival passa a tratar o silêncio como resposta.' },
});
```

### 3.1 Campos
| Campo | Obrigatório | O que faz |
|---|---|---|
| `id`, `titulo` | sim | Identidade; o título aceita `{papel.campo}` |
| `tipo` | sim | Define em que fase do diretor a cena pode sair |
| `capitulos` | sim | Capítulos em que vale |
| `unico` / `cooldown` | não | Uma vez por vida / anos mínimos entre repetições |
| `papeis` | sim, se a cena envolve alguém | Filtros para preencher quem e onde |
| `quando` | sim | Pré-condições (jogador, papéis, mundo, fio, diretor) |
| `relevancia` | recomendado | Termos que somam salience. Sem termos, só vale o ritmo |
| `cena` | sim | Texto, com variantes por estado (`se`). A primeira variante verdadeira é usada |
| `opcoes` | sim | 2 a 6; cada uma com `texto`, `requer`, `selo`, `teste`, `sucesso/falha` ou `efeitos` |
| `fio` | se a cena abre, avança ou fecha um | `{ id, etapa, abre?, fecha?, abandono }` |

### 3.2 Papéis
- `pessoa`: `{ papel, opiniaoMin/Max, reinoMin/Max, traco, vivo, faccao, lugar }` (`reinoMin: 'jogador-1'` = um reino abaixo do jogador).
- `faccao`: `{ tipo, estado, de: '<papel pessoa>' }`.
- `lugar`: `{ dono, tipo, perigoMin/Max, segredo }`.
- `criar`: se nenhum candidato servir e a cena deve existir mesmo assim, define como criar (nome, traços, objetivo).

### 3.3 Condições (`quando`, `se`, `requer`)
- **jogador**: `reinoMin/Max`, `idadeMin/Max`, `trilha`, `talento`, `defeito`, `origem`, `raiz`, `constituicao`, `tecnica`, `mestria`, `item`, `perfil`, `rec`, `pedrasMin`, `karma`, `fama`.
- **papel**: `{ papel: { rival: { opiniaoMax: -20, objetivo: 'vingar', fato: 'humilhado', reinoMin: 3, vivo: true } } }`.
- **mundo**: `faccaoEstado`, `lugar`, `era`.
- **fio**: `{ fio: { rival: { etapaMin: 1, aberto: true } } }`.
- **diretor**: `capitulo`, `fase`, `tensaoMin/Max`.
- Composição: `todos: [...]`, `algum: [...]`, `nao: {...}`.

### 3.4 Efeitos
`opiniao: [papel, ±n]`, `fato: [papel, tipo, peso]`, `reputacao: [facção, ±n]`, `objetivo: [papel, novo]`, `ferir`, `morte: papel`, `criar: { papel, filtro }`, `lugar: { id, dono?, perigo?, segredo? }`, `fio: [id, 'abrir' | 'avancar' | 'fechar:<desfecho>']`, `ambicao: 'avancar' | 'trocar:<id>'`, `posse: item`, `tecnica: id`, `dominio: [id, n]`, mais os efeitos atuais (`stats`, `xp`, `fama`, `karma`, `pedras`, `rec`, `ferida`, `corr`). O motor só aceita esses; efeito novo exige código novo.

### 3.5 Testes de sucesso
`teste: { tag, ameaca? }` usa os atributos e a maestria de técnica do jogador, e o reino da ameaça (`'rival'` usa o reino da pessoa ligada ao papel). O resultado continua sendo decidido pelo motor (como hoje). Lutas usam o mesmo sistema de duelo.

## 4. Passo a passo para escrever uma cena
1. **A pergunta**: quem quer o quê, e o que o jogador pode fazer a respeito?
2. **Papéis**: quem precisa existir? Se só cabe a "um rival que ele humilhou", escreva isso no filtro.
3. **Quando**: o que precisa ser verdade? Prefira estado do mundo a idade.
4. **Relevância**: o que torna esta cena *mais urgente que as outras*? Cada termo é uma justificativa de enredo, não um número solto.
5. **Texto**: 80 a 150 palavras. Variante por estado quando o texto muda de verdade.
6. **Opções**: comece pelas 3 universais (agir, ceder, fugir), depois escreva as de build que fazem sentido *aqui*.
7. **Efeitos**: cada opção muda alguém, algum lugar ou alguma facção.
8. **Fio**: esta cena abre, avança ou fecha algo? Se abre, o que acontece se o jogador ignorar?
9. **Releia como crônica**: se alguém lesse a cena depois das duas anteriores desta vida, entenderia tudo?

## 5. Padrões que não valem mais
| Antes (jogo atual) | Agora |
|---|---|
| Opção injetada por regex de categoria | Opção escrita no molde |
| "Se você aceitou… se recusou…" no mesmo texto | Variante por estado ou condição no `quando` |
| Flag gravada e nunca lida | Fato, opinião, reputação ou fio que o motor consulta |
| `{mentor}`, `{rival}` como nomes soltos | Papéis ligados a pessoas com opinião e memória |
| Cena genérica de qualquer lugar | Respiro curto, só na calmaria |
| Evento agendado por `agenda` | Fio e objetivo da pessoa: o mundo decide quando ela volta |

## 6. Validação (planejada para a Fase 2)
`npm run validate` passará a conferir: papéis resolvíveis, condições sem campo desconhecido, efeitos da lista fechada, toda opção com efeito de mundo (exceto respiros), fios com abertura e desfecho, nenhuma opção repetida entre moldes, textos sem marcador solto, e tamanho de cena. O simulador reportará moldes nunca escolhidos e cenas cujas variantes nunca saem.
