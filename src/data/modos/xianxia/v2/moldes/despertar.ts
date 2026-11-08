import { molde, type Molde } from '../../../../../engine/v2/tipos';

/**
 * O Despertar: quem mostra o caminho. A trilha oferecida é a da pessoa que aparece (um mestre da reserva do mundo),
 * então cada vida encontra um mestre diferente, e esse mestre passa a existir no mundo (opinião, memória, morte).
 */
const TRILHAS = ['sopro', 'espada', 'alquimia', 'corpo', 'alma', 'formacoes', 'budista', 'venenos', 'bestas'];
const intro = (trilha: string, texto: string) => ({ se: { papel: { mestre: { trilha: [trilha] } } }, texto });

export const DESPERTAR: Molde[] = [
  molde({
    id: 'desp_mestre_caminho', max: 2,
    titulo: 'Quem Mostra o Caminho',
    tipo: 'personagem',
    capitulos: ['despertar', 'entrada'],
    cooldown: 5,
    papeis: {
      mestre: { pessoa: { desconhecido: true, idadeDif: [18, 90], reinoMin: 2, trilha: TRILHAS } },
    },
    quando: { jogador: { semTrilha: true, reinoMin: 1 } },
    relevancia: [{ se: { jogador: { semTrilha: true } }, mais: 70 }],
    cena: [
      intro('sopro', 'Uma mulher de olhar sereno, que respira como se o ar lhe obedecesse, para diante de você na estrada. {mestre.nome} diz que o seu Qi está desordenado, e que "o sopro certo resolve metade dos problemas do mundo". Não pede nada em troca. Só espera.'),
      intro('espada', 'Um homem de capa surrada e espada sem bainha repara no jeito como você segura um graveto. {mestre.nome} não se apresenta. "A lâmina é uma pergunta", diz. "Você sabe qual?" Há uma cicatriz antiga na mão {mestre.dele}, e nenhuma pressa.'),
      intro('alquimia', 'Uma velha de dedos manchados e cheiro de ervas queimadas observa a sua mão tremer ao tocar uma folha. {mestre.nome} ri. "Cada erva cura ou mata, conforme a dose. Quer aprender o fogo?" {mestre.Ele} já está acendendo um braseiro na beira da estrada.'),
      intro('corpo', 'Um homem enorme, de ombros como portas, para a carroça para olhar você erguer um balde. {mestre.nome} cruza os braços. "Esse corpo pede forja", diz. "Você aguenta ouvir o que {mestre.ele} precisa?" A voz é baixa, e o olhar é de quem já quebrou muita pedra.'),
      intro('alma', 'Um velho de olhos fechados, guiado por uma criança, diz o seu nome antes de você abrir a boca. {mestre.nome} sorri. "O mar dentro de você é maior do que o de fora. Vem ouvir." A criança olha para você como quem pede desculpas pelo velho, e para o velho como quem pede paciência.'),
      intro('formacoes', 'Uma moça de tinta nos dedos desenha um círculo no chão com um pedaço de giz e pede que você o atravesse. Você tenta, e não consegue. {mestre.nome} sorri, sem maldade. "As linhas mandam em quem não as vê. Quer aprender a ver?"'),
      intro('budista', 'Um monge de sandálias gastas atravessa a mesma ponte que você, devagar, como se cada tábua merecesse atenção. {mestre.nome} para ao seu lado. "Há quem busque poder. Há quem busque mérito. Seu Qi já escolheu, e sua cabeça ainda está barulhenta."'),
      intro('venenos', 'Uma mulher de manto verde oferece a você uma xícara de chá e, antes de você beber, avisa: "Estou só testando se você pergunta o que tem dentro." {mestre.nome} espera, com os olhos pequenos de quem já viu gente morrer de curiosidade e de falta {mestre.dele}.'),
      intro('bestas', 'Um caçador de mãos grossas segura uma raposa espiritual ferida. {mestre.nome} resmunga: "{mestre.Ele} me olhou como se soubesse meu nome." Estende o bicho para você, hesitante. A fera o encara, e algo no Qi {mestre.dele} responde ao seu.'),
      { texto: 'Alguém de passagem repara em você, e algo no seu jeito de respirar chama a atenção de {mestre.nome}. Há pouca gente nas estradas com tanto a ensinar, e menos ainda disposta a perder tempo com um iniciante.' },
    ],
    opcoes: [
      {
        id: 'aceitar', texto: 'Aceitar {mestre.nome} como mestre e seguir o método {mestre.dele}.',
        res: {
          texto: '{mestre.nome} assente. "O primeiro passo é desaprender o que você acha que sabe." Você começa a aprender o método {mestre.dele} naquela mesma noite, e percebe, sem saber como, que a sua vida acabou de ganhar um centro.',
          efeitos: [{ opiniao: ['mestre', 25] }, { fato: ['mestre', 'aceitou_discipulo', 4] }, { trilhaDe: 'mestre' }, { papel: ['mestre', 'mestre'] }, { fio: ['mestre', 'abrir'] }, { inclinar: ['ascender_seita', 1] }],
          fx: { setFlags: ['trilha_mestre'], stats: { comp: 1 }, perfil: { disciplina: 1, devocao: 1 } },
        },
      },
      {
        id: 'tempo', texto: 'Pedir um tempo para pensar.',
        res: {
          texto: '"Pense", diz {mestre.nome}, "mas o mundo não espera tanto quanto você imagina." Segue pela estrada, sem olhar para trás. Você fica sabendo que existe um caminho, e que {mestre.ele} está andando em outra direção.',
          efeitos: [{ fato: ['mestre', 'pediu_tempo', 1] }],
          fx: { perfil: { cautela: 1 } },
        },
      },
      {
        id: 'recusar', texto: 'Dizer que vai aprender sozinho.',
        res: {
          texto: '"Orgulho é a primeira coisa que o Dao cobra", diz {mestre.nome}, sem raiva, e se afasta. A estrada tem muita gente com vontade de ensinar, mas poucos esperam duas vezes.',
          efeitos: [{ opiniao: ['mestre', -10] }, { fato: ['mestre', 'foi_recusado', 3] }],
          fx: { perfil: { ambicao: 1 }, stats: { dao: 1 } },
        },
      },
      {
        id: 'nome_do_cla', texto: 'Dizer o nome do clã, esperando que {mestre.ele} o reconheça.',
        requer: { jogador: { origem: ['cla_decadente'] } }, selo: 'Herdeiro de um Clã Decadente',
        res: {
          texto: '{mestre.nome} franze a testa. "Já ouvi esse nome", diz, devagar. "Não era um nome pequeno." Não explica mais, mas o olhar {mestre.dele} muda: já não é de quem avalia um iniciante, e sim de quem lembra de uma dívida alheia.',
          efeitos: [{ fato: ['mestre', 'conheceu_o_nome_do_cla', 3] }, { opiniao: ['mestre', 8] }, { inclinar: ['reerguer_cla', 1] }],
          fx: { perfil: { devocao: 1 } },
        },
      },
    ],
  }),
];
