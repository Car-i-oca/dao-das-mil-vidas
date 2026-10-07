import type { GameEvent } from '../../types';

/** Saga da Forja Silenciosa: mapa, escolha de equipamento, guardião e recompensa complementar. */
export const sagaFerro: GameEvent[] = [
  {
    id: 'saga_ferro_inicio', title: 'A Forja Silenciosa', rarity: 'raro', once: true,
    cond: { tierMin: 1, flags: ['saga_ferro_chamado'] },
    text: 'O mapa termina diante de uma forja soterrada pela neve. No portão, duas inscrições sobrevivem ao tempo: uma promete uma lâmina que corta o inverno; a outra, uma armadura que veste escamas de Qi. Um núcleo desperta sob o chão.',
    choices: [
      {
        text: 'Ler as inscrições e preparar a forja.',
        check: { stat: ['comp', 'esp'], dif: 1 },
        ok: { text: 'Você decifra a sequência de selos. O portão se abre, e o fogo antigo reconhece sua presença.', fx: { setFlags: ['saga_ferro_rastro'], agenda: [{ event: 'saga_ferro_forja', em: [1, 1] }] } },
        fail: { text: 'Os selos queimam sua memória por um instante, mas o mapa revela como acender a forja. Você segue adiante, com cautela.', fx: { setFlags: ['saga_ferro_rastro'], agenda: [{ event: 'saga_ferro_forja', em: [1, 1] }], ferida: 1 } },
      },
      { text: 'Fechar o mapa e deixar a forja dormir.', res: { text: 'Você guarda o fragmento. Algumas heranças não precisam ser despertadas.', fx: { pedras: 8 } } },
    ],
  },
  {
    id: 'saga_ferro_forja', title: 'O Coração da Forja', rarity: 'raro', once: true,
    cond: { tierMin: 1, flags: ['saga_ferro_rastro'] },
    text: 'A forja pulsa como um coração enterrado. O calor só responde quando você canaliza Qi através de uma das duas matrizes gravadas no metal: a da espada ou a das escamas.',
    choices: [
      {
        text: 'Forjar a Espada do Inverno.',
        check: { stat: ['fis', 'comp'], dif: 2 },
        ok: { text: 'A lâmina emerge azul e intacta. O aço não aquece nem na chama; o primeiro corte abre um caminho limpo no ar gelado.', fx: { item: ['espada_inverno'], setFlags: ['saga_ferro_arma', 'saga_ferro_fundida'], agenda: [{ event: 'saga_ferro_guardiao', em: [1, 1] }] } },
        fail: { text: 'A têmpera racha no último golpe. Você recupera uma espada trincada, ainda forte o bastante para canalizar o frio ancestral.', fx: { item: ['espada_inverno_fragil'], setFlags: ['saga_ferro_arma', 'saga_ferro_fundida'], agenda: [{ event: 'saga_ferro_guardiao', em: [1, 1] }] } },
      },
      {
        text: 'Forjar a Armadura de Qi Escamas.',
        check: { stat: ['dao', 'comp'], dif: 2 },
        ok: { text: 'As escamas se unem sem emenda e se ajustam ao seu Qi. O frio deixa de atravessar o corpo.', fx: { item: ['armadura_qi_escamas'], setFlags: ['saga_ferro_armadura', 'saga_ferro_fundida'], agenda: [{ event: 'saga_ferro_guardiao', em: [1, 1] }] } },
        fail: { text: 'Uma fissura atravessa as escamas, mas o conjunto permanece firme e guarda calor suficiente para resistir à nevasca.', fx: { item: ['armadura_qi_escamas_trincada'], setFlags: ['saga_ferro_armadura', 'saga_ferro_fundida'], agenda: [{ event: 'saga_ferro_guardiao', em: [1, 1] }] } },
      },
    ],
  },
  {
    id: 'saga_ferro_guardiao', title: 'O Guardião da Forja', rarity: 'lendario', once: true, type: 'combat',
    cond: { tierMin: 1, flags: ['saga_ferro_fundida'] },
    combate: { oponente: 'guardiao_ferro', cenario: 'gelo', boss: true },
    text: 'O núcleo desperta por completo. Um guardião de ferro e gelo emerge da parede, protegendo a forja que lhe deu vida. Cada golpe faz as escamas de pedra se fecharem sobre o caminho de saída.',
    choices: [
      {
        text: 'Enfrentar o Guardião e proteger o núcleo.',
        check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' },
        ok: { text: 'Sua arma encontra a junta entre as placas. O Guardião se ajoelha; o núcleo da forja pulsa em suas mãos.', fx: { setFlags: ['saga_ferro_vitoria'], item: ['nucleo_besta_alto'], pedras: 36, agenda: [{ event: 'saga_ferro_legado', em: [1, 1] }] } },
        fail: { text: 'O golpe não atravessa as placas. Você escapa da câmara com ferimentos e um fragmento de metal que o Guardião deixou cair.', fx: { setFlags: ['saga_ferro_recuo'], item: ['mineral_antigo'], ferida: 2, agenda: [{ event: 'saga_ferro_legado', em: [1, 1] }] } },
      },
      {
        text: 'Usar o terreno para desviar do golpe devastador.',
        check: { stat: ['sor', 'esp'], dif: 1, tag: 'combate' },
        ok: { text: 'O Guardião atinge a parede. Você passa por ele, desliga a forja e recolhe o núcleo sem destruir a câmara.', fx: { setFlags: ['saga_ferro_vitoria'], item: ['nucleo_besta_alto'], pedras: 24, agenda: [{ event: 'saga_ferro_legado', em: [1, 1] }] } },
        fail: { text: 'A avalanche de metal fecha a passagem. Você consegue fugir, levando um fragmento da forja e uma lembrança dolorosa do risco.', fx: { setFlags: ['saga_ferro_recuo'], item: ['mineral_antigo'], ferida: 2, agenda: [{ event: 'saga_ferro_legado', em: [1, 1] }] } },
      },
    ],
  },
  {
    id: 'saga_ferro_legado', title: 'O Legado da Forja Silenciosa', rarity: 'raro', once: true,
    cond: { tierMin: 1, flags: ['saga_ferro_fundida'] },
    text: 'Com o guardião vencido ou afastado, o núcleo estabiliza a forja. A matriz que você não escolheu também desperta: o trabalho está incompleto, mas a jornada deixou Qi e conhecimento suficientes para terminá-lo.',
    choices: [
      {
        text: 'Completar a matriz da armadura.',
        cond: { flags: ['saga_ferro_arma'] },
        check: { stat: ['dao', 'comp'], dif: 1 },
        ok: { text: 'As escamas se encaixam sobre o Qi que você já domina. A armadura completa fecha o ciclo iniciado pelo mapa.', fx: { item: ['armadura_qi_escamas'], setFlags: ['saga_ferro_finalizada'], pedras: 24, xp: 8 } },
        fail: { text: 'A matriz não aceita o último selo. Você leva uma armadura trincada, útil e resistente ao frio, como lembrança do que ainda pode aperfeiçoar.', fx: { item: ['armadura_qi_escamas_trincada'], setFlags: ['saga_ferro_finalizada'], pedras: 12, xp: 4 } },
      },
      {
        text: 'Completar a matriz da espada.',
        cond: { flags: ['saga_ferro_armadura'] },
        check: { stat: ['fis', 'comp'], dif: 1 },
        ok: { text: 'O aço canta ao encontrar a têmpera final. A Espada do Inverno completa a herança da forja.', fx: { item: ['espada_inverno'], setFlags: ['saga_ferro_finalizada'], pedras: 24, xp: 8 } },
        fail: { text: 'O aço resiste ao selo final. Você leva uma espada trincada, ainda capaz de canalizar parte do frio ancestral.', fx: { item: ['espada_inverno_fragil'], setFlags: ['saga_ferro_finalizada'], pedras: 12, xp: 4 } },
      },
      { text: 'Desativar a matriz restante e encerrar a exploração.', res: { text: 'Você sela a forja antes que o núcleo se descontrole. O mapa, a batalha e o equipamento já conquistado bastam como legado.', fx: { setFlags: ['saga_ferro_finalizada'], pedras: 8 } } },
    ],
  },
];
