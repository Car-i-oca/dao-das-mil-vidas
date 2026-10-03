import type { GameEvent } from '../../types';

/**
 * A trilha do personagem não é escolhida na criação: ela nasce de uma cena, logo depois do despertar.
 * Todas estas cenas exigem `noFlags: ['trilha_definida']`; o motor só sorteia entre elas enquanto o
 * personagem desperto ainda não tem método. Cada cena oferece trilhas que combinam com o personagem
 * (atributos, origem) e sempre permite recusar, esperando outra cena. Se todas forem recusadas,
 * `caminho_do_acaso` entrega o método mais comum.
 */
const SEM_TRILHA = { tierMin: 1, noFlags: ['trilha_definida'] };

export const trilhaInicial: GameEvent[] = [
  {
    id: 'cena_viajante_sopro', title: 'O Método do Sopro', rarity: 'comum', once: true, weight: 3,
    cond: { ...SEM_TRILHA },
    text: 'O Qi desperto pede um método, e um velho viajante o encontra à beira da estrada. "Respirar", diz ele. "O Céu e a Terra sopram o tempo todo, e quase ninguém escuta." Ele desenha no chão um diagrama de respiração e, ao lado, um mapa de formações.',
    choices: [
      { text: 'Aprender a respirar com o Céu e a Terra.', res: { text: 'Semanas depois, o primeiro sopro sobe pelo seu ventre como fumaça de incenso. Esse é o seu método.', fx: { trilha: 'sopro', xp: 6 } } },
      { text: 'Pedir o mapa de formações e estudar os diagramas.', cond: { stat: { comp: 10 } }, res: { text: 'O velho ergue uma sobrancelha, satisfeito. Cada traço do diagrama parece uma frase de uma língua que você já quase fala.', fx: { trilha: 'formacoes', xp: 6 } } },
      { text: 'Agradecer e esperar outro caminho.', res: { text: 'O viajante dá de ombros e parte. Outras portas se abrirão, ou não.', fx: {} } },
    ],
  },
  {
    id: 'cena_mestre_espada', title: 'O Espadachim da Estalagem', rarity: 'comum', once: true, weight: 3,
    cond: { ...SEM_TRILHA, stat: { fis: 9 } },
    text: 'Numa estalagem de beira de estrada, um espadachim de capa velha corta uma vela ao meio sem apagar a chama. Ao ver sua postura, ele pergunta: "Já pensou em transformar sua intenção em aço? Ou prefere forjar o corpo antes de forjar a lâmina?"',
    choices: [
      { text: 'Aprender a espada: intenção e aço.', res: { text: 'Ele lhe empresta uma lâmina de treino e uma regra: "Não corte o que não ameaça você." Esse é o seu método.', fx: { trilha: 'espada', xp: 6 } } },
      { text: 'Forjar o corpo: ossos, carne e sangue.', cond: { stat: { fis: 10 } }, res: { text: 'O espadachim ri e o leva a um pátio com pedras, cordas e bastões. "Primeiro, aprenda a ser montanha."', fx: { trilha: 'corpo', xp: 6 } } },
      { text: 'Agradecer e esperar outro caminho.', res: { text: 'O espadachim dá de ombros e volta à sua tigela de sopa.', fx: {} } },
    ],
  },
  {
    id: 'cena_erveira', title: 'A Erveira do Mercado', rarity: 'comum', once: true, weight: 3,
    cond: { ...SEM_TRILHA, stat: { comp: 9 } },
    text: 'Entre as bancas de um mercado, uma velha erveira separa folhas por cheiro, sem olhar. "Cada erva cura ou mata, conforme a dose", diz. "Quer aprender o fogo e os caldeirões? Ou o outro lado das mesmas ervas?"',
    choices: [
      { text: 'Aprender alquimia: fogo, caldeirão e pílulas.', res: { text: 'Ela acende um braseiro e lhe entrega uma colher de bronze. A primeira lição dura três dias e uma panela queimada. Esse é o seu método.', fx: { trilha: 'alquimia', xp: 6 } } },
      { text: 'Aprender o outro lado das ervas: venenos e antídotos.', cond: { stat: { comp: 10 } }, res: { text: 'O sorriso dela é curto. "Quem conhece o veneno nunca morre de surpresa." Ela abre um baú de frascos etiquetados com símbolos discretos.', fx: { trilha: 'venenos', xp: 6 } } },
      { text: 'Agradecer e esperar outro caminho.', res: { text: 'A erveira volta a separar folhas sem olhar.', fx: {} } },
    ],
  },
  {
    id: 'cena_monge_andarilho', title: 'O Monge Que Não Tinha Pressa', rarity: 'comum', once: true, weight: 3,
    cond: { ...SEM_TRILHA, stat: { dao: 9 } },
    text: 'Um monge de sandálias gastas atravessa a mesma ponte que você, devagar, como se cada tábua merecesse atenção. "Seu Qi despertou, e sua cabeça ainda está barulhenta. Há quem busque o mérito. Há quem busque o fundo do próprio espírito."',
    choices: [
      { text: 'Seguir o monge e aprender o caminho do mérito.', res: { text: 'Ele não responde, apenas continua andando. Mas os passos dele têm o ritmo de uma resposta. Esse é o seu método.', fx: { trilha: 'budista', xp: 6 } } },
      { text: 'Mergulhar no próprio espírito: a consciência.', cond: { stat: { esp: 10 } }, res: { text: '"Então feche os olhos", diz o monge. "Sem pressa. O mar é fundo, e as ondas, mentirosas." Esse é o seu método.', fx: { trilha: 'alma', xp: 6 } } },
      { text: 'Agradecer e esperar outro caminho.', res: { text: 'O monge assente, sem ofensa, e some na curva da estrada.', fx: {} } },
    ],
  },
  {
    id: 'cena_cacador_feras', title: 'O Caçador e a Fera Ferida', rarity: 'comum', once: true, weight: 3,
    cond: { ...SEM_TRILHA, stat: { esp: 9 } },
    text: 'Na orla da mata, um caçador de mãos grossas segura uma raposa espiritual ferida. "Não consegui matar", resmunga. "Ela me olhou como se soubesse meu nome." Ele a estende a você, hesitante. A fera o encara, e algo no Qi dela responde ao seu.',
    choices: [
      { text: 'Cuidar da fera e tentar um pacto de alma.', res: { text: 'Três noites depois, a raposa deita a cabeça no seu joelho. Os sentidos dos dois começam a se misturar. Esse é o seu método.', fx: { trilha: 'bestas', xp: 6 } } },
      { text: 'Devolver a fera ao caçador e seguir viagem.', res: { text: 'O caçador suspira e carrega a raposa para dentro da mata. Você sente que perdeu algo, e que ganhou outra coisa.', fx: {} } },
    ],
  },
  {
    id: 'cena_sombra_sangue', title: 'O Sussurro do Sangue Antigo', rarity: 'comum', once: true, weight: 8,
    cond: { ...SEM_TRILHA, flags: ['sangue_demoniaco'] },
    text: 'Seu Qi desperto tem um calor diferente: espesso, escuro, faminto. Uma voz, que você já ouviu em sonhos, finalmente fala. "Seus pais nunca contaram, mas o sangue conta. Posso ensinar o método que ele deseja, rápido e cruel. Ou você pode tentar ignorá-lo."',
    choices: [
      { text: 'Aceitar o método do sangue.', res: { text: 'Uma ardência sobe pela sua espinha e se acomoda. Esse é o seu método, para o bem e para o mal.', fx: { trilha: 'demoniaca', xp: 8 } } },
      { text: 'Recusar a voz e esperar outro caminho.', res: { text: 'A voz ri baixo. "Eu espero. Eu sempre espero."', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'caminho_do_acaso', title: 'O Método Que Veio de Dentro', rarity: 'comum', cooldown: 0, weight: 0.05,
    cond: { ...SEM_TRILHA },
    text: 'Nenhum mestre apareceu, e você já recusou tantas portas. Então, numa noite silenciosa, o próprio corpo lhe ensina: inspirar fundo, deixar o ar descer até o ventre e esperar. Não há nada de especial nisso, e esse é o ponto.',
    choices: [
      { text: 'Seguir o único método que você conhece.', res: { text: 'Respirar. Esperar. Respirar. Sem pressa, o Qi encontra seu leito. Esse é o seu método.', fx: { trilha: 'sopro', xp: 4 } } },
    ],
  },
];
