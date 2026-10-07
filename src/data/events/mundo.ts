import type { GameEvent } from '../../types';

/** Vida no mundo dos cultivadores, reinos 1–4 (expansão). */
export const mundo: GameEvent[] = [
  {
    id: 'doenca_da_aldeia', title: 'A Praga da Aldeia', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 1, tierMax: 5 },
    text: 'Numa aldeia à beira da estrada, metade da população tem febre. O curandeiro implora por qualquer ajuda: pílulas, ervas, ou apenas Qi para dissipar a doença.',
    choices: [
      { text: 'Usar um Antídoto de Sete Ervas.', cond: { item: 'antidoto_sete_ervas' }, res: { text: 'Você dissolve o antídoto num grande caldeirão. A febre cede em dois dias. A aldeia o chama de santo.', fx: { removeItem: ['antidoto_sete_ervas'], karma: 14, fama: 5, stats: { dao: 1 } } } },
      { text: 'Gastar seu Qi tratando os doentes um a um.', check: { stat: ['esp', 'dao'], dif: 1 }, ok: { text: 'Cinco dias depois, a febre acabou e você mal consegue ficar de pé. A aldeia insiste em lhe dar um presente.', fx: { karma: 10, fama: 4, xp: -3, pedras: 12, stats: { dao: 1 } } }, fail: { text: 'Você ajuda a metade, mas o esforço o deixa febril também.', fx: { karma: 5, ferida: 1 } } },
      { text: 'Seguir viagem sem olhar para trás.', res: { text: 'Esta aldeia não é sua responsabilidade. Você se repete isso até a noite.', fx: { karma: -4 } } },
    ],
  },
  {
    id: 'peregrino_enigmatico', title: 'O Peregrino e o Enigma', rarity: 'raro', cooldown: 30,
    cond: { tierMin: 1, tierMax: 6 },
    text: 'Um peregrino de sandálias gastas pede passagem no seu fogo. Antes de dormir, propõe um enigma: "O que é mais pesado que uma montanha e mais leve que uma pena?"',
    choices: [
      { text: '"A promessa."', res: { text: 'O peregrino ri até chorar. "Quase", diz. "Mas você já ouviu algo que poucos ouvem." Toca seu ombro e continua a pé de manhã.', fx: { stats: { dao: 2, comp: 1 }, xp: 10 } } },
      { text: '"O arrependimento."', check: { stat: ['comp', 'dao'], dif: 0 }, ok: { text: '"Muito bem." O peregrino lhe entrega um pequeno cristal de Qi.', fx: { item: ['cristal_qi'], stats: { dao: 1 } } }, fail: { text: '"Hm." O peregrino sorri, nada diz, e na manhã seguinte já partiu.', fx: { stats: { dao: 1 } } } },
      { text: 'Admitir que não sabe.', res: { text: '"A resposta honesta é a mais rara." O peregrino lhe ensina uma respiração antiga.', fx: { xp: 12, stats: { comp: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'aposta_cultivador', title: 'Uma Aposta Perigosa', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 5, pedrasMin: 10, local: ['cidade'] },
    text: 'Numa casa de apostas, dois cultivadores duelam por prêmios altos. Um jogador de olhos brilhantes lhe cochicha: "Aposte no da esquerda. Tenho certeza."',
    choices: [
      { text: 'Apostar 20 pedras no da esquerda.', custo: 20, check: { stat: ['sor', 'comp'], dif: 0 }, ok: { text: 'O da esquerda vence por pouco. O jogador de olhos brilhantes some, mas seu bolso fica mais pesado.', fx: { pedras: 45 } }, fail: { text: 'O da esquerda cai no primeiro golpe. Você ri de si mesmo, às custas do bolso.', fx: { stats: { dao: 1 } } } },
      { text: 'Observar o duelo e ignorar a aposta.', res: { text: 'Você aprende mais assistindo do que perderia apostando.', fx: { xp: 6, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'torneio_alquimia', title: 'O Concurso de Pílulas', rarity: 'comum', cooldown: 25,
    cond: { tierMin: 1, tierMax: 6, local: ['cidade'], stat: { comp: 12 } },
    text: 'O Pavilhão de Tesouros promove um concurso: quem refinar a melhor pílula de Qi vence um forno raro e a admiração dos presentes.',
    choices: [
      { text: 'Inscrever-se.', check: { stat: 'comp', dif: 2, tag: 'alquimia' }, ok: { text: 'Sua pílula brilha em dourado. A plateia aplaude e o Pavilhão lhe entrega o prêmio.', fx: { fama: 8, pedras: 40, item: ['pilula_qi_maior'], stats: { comp: 1 } } }, fail: { text: 'A pílula racha no último minuto. Você sai com o rosto vermelho, mas aprende bastante.', fx: { xp: 4, fama: -1 } } },
      { text: 'Assistir e anotar as método dos finalistas.', res: { text: 'Cada alquimista tem um truque; você rouba o melhor deles, com o olhar.', fx: { xp: 8, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'tigre_branco', title: 'O Tigre Branco da Floresta', rarity: 'raro', cooldown: 30,
    cond: { tierMin: 2, tierMax: 5, local: ['selva', 'montanha'] },
    text: 'Entre troncos antigos, um tigre branco, grande como um cavalo, observa você. Seus olhos têm a calma de quem já viu séculos passarem.',
    choices: [
      { text: 'Enfrentá-lo em duelo de honra.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'O duelo dura uma hora e termina em respeito mútuo. O tigre deixa cair um dente: uma relíquia viva.', fx: { fama: 8, stats: { fis: 2, dao: 1 }, item: ['nucleo_besta_alto'], xp: 12 } }, fail: { text: 'O tigre o derruba e o deixa vivo. Seu orgulho dói mais que as costelas.', fx: { ferida: 3, stats: { dao: 1 } } } },
      { text: 'Curvar-se e pedir passagem.', res: { text: 'O tigre baixa a cabeça, como quem concorda. Você atravessa seu território sem ser seguido.', fx: { karma: 3, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tempestade_espiritual', title: 'A Tempestade de Qi', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 6, local: ['montanha', 'selva'] },
    text: 'Nuvens roxas se acumulam e raios sem trovão riscam o céu. Uma tempestade espiritual: perigosa, mas cheia de Qi vivo para quem souber aproveitar.',
    choices: [
      { text: 'Abrir braços e absorver o raio.', check: { stat: ['fis', 'esp'], dif: 3 }, ok: { text: 'Cada raio é um golpe e um presente. Você sai chamuscado e radiante.', fx: { xp: 22, stats: { fis: 1, esp: 1 }, ferida: 1 } }, fail: { text: 'Um raio mais forte joga você contra uma pedra. A tempestade passa sem pressa.', fx: { ferida: 3, xp: 4 } } },
      { text: 'Abrigar-se numa caverna e observar.', res: { text: 'De longe, a tempestade é uma lição de ritmo e fúria. Você tira notas.', fx: { xp: 7, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'vendedor_de_mapas', title: 'O Vendedor de Mapas', rarity: 'comum', once: true,
    cond: { tierMin: 1, tierMax: 5, local: ['cidade'], pedrasMin: 20 },
    text: 'Um velho com um tubo de pergaminhos abre uma banca: "Mapas de verdade, mapas falsos, mapas amaldiçoados. Qual você vai querer?"',
    choices: [
      { text: 'Comprar o mapa "de verdade" (20 pedras).', custo: 20, res: { text: 'O velho pisca e entrega um pergaminho enrolado. Será que é mesmo verdade?', fx: { item: ['mapa_fragmentado'], agenda: [{ event: 'tesouro_do_mapa', em: [3, 8] }] } } },
      { text: 'Barganhar o preço.', check: { stat: 'car', dif: 0 }, ok: { text: 'Por metade do preço, você leva o mapa. O velho suspira.', fx: { item: ['mapa_fragmentado'], agenda: [{ event: 'tesouro_do_mapa', em: [3, 8] }] } }, fail: { text: 'O velho se ofende e fecha a banca.', fx: { stats: { car: 1 } } } },
    ],
  },
  {
    id: 'tesouro_do_mapa', title: 'Onde o X Marca', rarity: 'raro', once: true,
    cond: { item: 'mapa_fragmentado' },
    text: 'Seguindo as linhas do mapa, você chega a um desfiladeiro cheio de névoa. No fundo, uma estrutura de pedra aguarda coberta de musgo.',
    choices: [
      { text: 'Descer e explorar a estrutura.', check: { stat: ['comp', 'sor', 'fis'], dif: 2 }, ok: { text: 'Você encontra uma pequena câmara com um baú. Dentro, uma chave de metal estranho e algumas moedas antigas.', fx: { item: ['chave_reino_secreto'], pedras: 50, xp: 8, removeItem: ['mapa_fragmentado'] } }, fail: { text: 'Um dispositivo antigo dispara agulhas. Você escapa, mas o mapa se desfaz em suas mãos.', fx: { ferida: 2, removeItem: ['mapa_fragmentado'] } } },
      { text: 'Desistir. O mapa pode ser falso.', res: { text: 'Você dobra o mapa e guarda no bolso. A dúvida tem seu preço.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'cacador_recompensas', title: 'Caçadores de Recompensas', rarity: 'comum', cooldown: 25,
    cond: { tierMin: 1, tierMax: 5 },
    text: 'Três caçadores de recompensas cercam um jovem assustado que carrega um manual roubado. Eles oferecem uma parte do lucro se você ajudar.',
    choices: [
      { text: 'Ajudar os caçadores.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'O jovem é capturado. Você recebe sua parte, e uma sensação ruim no estômago.', fx: { pedras: 30, karma: -6, fama: 2 } }, fail: { text: 'O jovem escapa e você leva uma facada de raspão.', fx: { ferida: 1 } } },
      { text: 'Defender o jovem.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você derrota os caçadores. O jovem chora e lhe entrega o manual: "Fique com ele."', fx: { item: ['manual_passo_garca'], karma: 10, fama: 4 } }, fail: { text: 'Os caçadores são mais fortes. Você e o jovem fogem, juntos e feridos.', fx: { ferida: 2, karma: 5 } } },
      { text: 'Não interferir.', res: { text: 'Cada um com seus problemas. Você se afasta rápido.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'retorno_ao_vilarejo', title: 'A Volta para Casa', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 5, origin: ['campones', 'cacador', 'pescador_mares', 'filho_guarda'] },
    text: 'Depois de anos, você retorna a {vila}. A casa onde cresceu está menor. Sua mãe, ou quem foi como uma, o reconhece pelo jeito de andar.',
    choices: [
      { text: 'Reformar a casa e deixar pedras para a família (30 pedras).', custo: 30, res: { text: 'Choram juntos. O vizinho diz que você ficou alto. Algo em seu coração se acalma.', fx: { karma: 10, fama: 3, stats: { dao: 2, car: 1 } } } },
      { text: 'Pedir a bênção dos mais velhos.', res: { text: 'Ervas, chás e uma frase: "Volte vivo." Você a guarda como talismã.', fx: { stats: { dao: 1, sor: 2 }, xp: 6 } } },
    ],
  },
  {
    id: 'cultivador_demoniaco_gentil', title: 'A Mão Que Salvou', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 5 },
    text: 'Ferido e à beira da morte, você é encontrado por uma mulher de olhos vermelhos e vestes escuras. Ela o carrega para uma caverna e estanca seu sangue. "Sou da seita demoníaca. Prefere que eu o deixe morrer?"',
    choices: [
      { text: 'Agradecer e aceitar a ajuda.', res: { text: 'Ela cuida de você por uma semana. Ao partir, deixa uma pílula e uma frase: "Nem todo demônio é cruel, e nem todo justo é bom."', fx: { ferida: -4, item: ['pilula_cura_maior'], karma: 4, stats: { dao: 2 }, setFlags: ['devedor_demoniaca'] } } },
      { text: 'Recusar por orgulho.', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'Você se arrasta para fora e acha outro caminho. O orgulho custa caro, mas funciona.', fx: { ferida: 1, stats: { dao: 2 } } }, fail: { text: 'Você desmaia antes de chegar à porta. Quando acorda, ela já se foi, deixando uma pílula.', fx: { ferida: 2, item: ['pilula_cura'] } } },
    ],
  },
  {
    id: 'oficina_artefatos', title: 'A Oficina do Mestre Ferreiro', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, tierMax: 6, local: ['cidade'], pedrasMin: 40 },
    text: 'Um mestre ferreiro exibe artefatos em sua oficina: luvas pesadas, sinos que ressoam, rosários talhados e agulhas finas. Cada item é uma pequena história.',
    choices: [
      { text: 'Comprar Luvas de Ferro Negro (55 pedras).', custo: 55, res: { text: 'Pesadas, frias, perfeitas.', fx: { item: ['luvas_ferro_negro'] } } },
      { text: 'Comprar Sino da Mente Clara (50 pedras).', custo: 50, res: { text: 'O som do sino organiza seus pensamentos.', fx: { item: ['sino_mente_clara'] } } },
      { text: 'Comprar Rosário de Sândalo (70 pedras).', custo: 70, res: { text: 'O perfume de sândalo permanece por semanas.', fx: { item: ['rosario_sandalo'] } } },
      { text: 'Apenas admirar e conversar com o ferreiro.', res: { text: 'O ferreiro lhe conta histórias das armas que forjou e dos donos que as perderam.', fx: { stats: { comp: 1, car: 1 } } } },
    ],
  },
  {
    id: 'festival_cultivadores', title: 'O Grande Mercado dos Cultivadores', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 1, tierMax: 5, local: ['cidade'] },
    text: 'A cada década, cultivadores de todos os cantos se reúnem para trocar itens, notícias e favores. Para quem sabe fazer contatos, é uma mina de ouro.',
    choices: [
      { text: 'Fazer contatos e trocar favores.', check: { stat: 'car', dif: 1 }, ok: { text: 'Você volta com uma lista de aliados, algumas dívidas a seu favor e um manual raro.', fx: { fama: 5, item: ['manual_olho_lotus'], setFlags: ['rede_contatos'], stats: { car: 1 } } }, fail: { text: 'Todos parecem ocupados demais. Você apenas volta mais cansado.', fx: { stats: { car: 1 } } } },
      { text: 'Vender itens que não precisa mais.', res: { text: 'Bons negócios, sem pressa.', fx: { pedras: 25 } } },
    ],
  },
  {
    id: 'peste_demonios_menores', title: 'Demônios Menores na Cidade', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 2, tierMax: 5 },
    text: 'Sombras rastejam pelas ruas de uma cidade, devorando sonhos. A guarda local pede ajuda a qualquer cultivador que saiba lutar.',
    choices: [
      { text: 'Caçar os demônios na noite.', check: { stat: ['fis', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'Uma noite inteira de luta e fogo. Ao amanhecer, a cidade respira.', fx: { fama: 8, pedras: 35, karma: 6, xp: 8 } }, fail: { text: 'As sombras são mais numerosas do que previsto. Você se retira ferido.', fx: { ferida: 2, fama: 1, xp: 3 } } },
      { text: 'Ensinar a guarda a usar talismãs.', res: { text: 'Mais lento, mas muito mais duradouro.', fx: { karma: 8, fama: 4, stats: { comp: 1, car: 1 } } } },
    ],
  },
  {
    id: 'iniciacao_cla', title: 'O Salão dos Ancestrais', rarity: 'comum', once: true,
    cond: { tierMin: 1, tierMax: 4, faction: ['cla'] },
    text: 'No salão do {cla}, jovens são reconhecidos como herdeiros ao entrarem nos três portões: Sangue, Honra e Fogo. Os anciãos o observam.',
    choices: [
      { text: 'Passar pelos três portões.', check: { stat: ['dao', 'car'], dif: 1 }, ok: { text: 'No terceiro portão, as brasas se abrem e o nome do seu clã é pronunciado com respeito.', fx: { fama: 6, stats: { dao: 2, car: 1 }, xp: 10, setFlags: ['herdeiro_reconhecido'] } }, fail: { text: 'Você tropeça no segundo portão, e é perdoado. Mas o olhar dos anciãos fica.', fx: { fama: -1, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tutor_mortal', title: 'O Velho Professor', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 1, tierMax: 3 },
    text: 'Um velho professor mortal, sem Qi algum, lhe ensina caligrafia e história por um preço simbólico. "Cultivadores também esquecem como se vive", diz.',
    choices: [
      { text: 'Aprender com atenção.', res: { text: 'Cada pincelada é uma respiração. A mente aquieta e você descobre ideias que seus mestres nunca disseram.', fx: { stats: { comp: 2, dao: 1 }, xp: 5 } } },
      { text: 'Pagar com algumas pedras e partir.', custo: 5, res: { text: 'Uma pequena cortesia, muitos sorrisos.', fx: { karma: 3 } } },
    ],
  },
];
