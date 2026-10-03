import type { GameEvent } from '../../types';

/**
 * Lote 21 — Origens (parte 1): cada origem ganha cinco cenas próprias nos primeiros 20 anos de vida,
 * antes e logo depois do despertar do Qi. Isso muda de verdade o começo de cada vida.
 */
const O = (id: string, ageMin: number, ageMax: number) => ({ origin: [id], ageMin, ageMax, tierMax: 1 });

export const lote21OrigensA: GameEvent[] = [
  /* ================= FILHO DE CAMPONESES ================= */
  {
    id: 'og_campones_colheita', title: 'A Colheita Que Falhou', rarity: 'comum', once: true, weight: 3,
    cond: O('campones', 7, 14),
    text: 'A chuva não veio este ano, e o arroz de {vila} secou antes de espigar. Seu pai conta os sacos em silêncio; sua mãe remenda o mesmo cobertor pela terceira vez. O senhor da terra ainda quer o tributo inteiro.',
    choices: [
      { text: 'Ir à mata colher raízes e cogumelos.', check: { stat: ['sor', 'fis'], dif: 0 }, ok: { text: 'Você volta com um cesto cheio e um ninho de ovos. Naquela noite, a família come sem contar as colheres.', fx: { stats: { sor: 1, fis: 1 }, karma: 2 } }, fail: { text: 'A mata esconde o que tem. Você volta com os pés cheios de espinhos e o cesto pela metade.', fx: { ferida: 1 } } },
      { text: 'Trabalhar de diarista nas terras do senhor.', res: { text: 'O dia é longo e o pagamento, curto. Mas você aprende a segurar a enxada sem reclamar, e a ouvir o que os feitores comentam.', fx: { pedras: 3, stats: { fis: 1, dao: 1 } } } },
      { text: 'Pedir ajuda ao velho do templo.', res: { text: 'O velho lhe dá um saco de painço e um conselho: "A fome ensina mais do que o livro, mas dói mais." Você guarda o saco e a frase.', fx: { stats: { dao: 1 }, setFlags: ['conhece_velho_templo'] } } },
    ],
  },
  {
    id: 'og_campones_imposto', title: 'O Cobrador de Impostos', rarity: 'comum', once: true, weight: 3,
    cond: O('campones', 9, 16),
    text: 'O cobrador chega a cavalo, com dois soldados e um livro de contas onde seu nome já foi escrito com a letra errada. Diz que a família deve duas luas de tributo, e olha a porca prenha com um interesse que não é de veterinário.',
    choices: [
      { text: 'Defender a porca com o corpo.', check: { stat: ['fis', 'dao'], dif: 0, tag: 'combate' }, ok: { text: 'Os soldados riem, e depois param. Algo no seu olhar faz o cobrador contar de novo, e achar um erro a favor da sua família.', fx: { fama: 2, stats: { dao: 1 }, karma: 2 } }, fail: { text: 'Um soldado o derruba com o cabo da lança. A porca vai embora, e você fica com a vergonha.', fx: { ferida: 1, karma: 1 } } },
      { text: 'Oferecer trabalho em troca do tributo.', res: { text: 'O cobrador aceita, desconfiado. Meses depois, você é o único menino da vila que sabe ler um livro de contas.', fx: { stats: { comp: 2 }, setFlags: ['sabe_ler_contas'] } } },
      { text: 'Esconder as moedas e fingir pobreza total.', check: { stat: ['sor', 'car'], dif: 0 }, ok: { text: 'A encenação convence. O cobrador parte praguejando, sem saber que há um jarro enterrado sob a cama.', fx: { pedras: 4, stats: { car: 1 } } }, fail: { text: 'Ele encontra o jarro. Leva tudo, e uma multa por mentir.', fx: { pedras: -3, karma: -1 } } },
    ],
  },
  {
    id: 'og_campones_curandeira', title: 'A Velha das Ervas', rarity: 'comum', once: true, weight: 3,
    cond: O('campones', 8, 16),
    text: 'Na beira do arrozal mora uma velha que ninguém visita, a não ser quando há febre. Ela sabe os nomes de todas as ervas, e dizem que, quando ri, as cabras tremem. Hoje, ela o chama pelo nome, que você não lembra de ter dito.',
    choices: [
      { text: 'Ajudar a velha a colher ervas no brejo.', res: { text: 'Três tardes de lama e cheiro verde. Ao fim, ela lhe dá um pacote de folhas secas e diz: "Quem sabe curar nunca morre de fome."', fx: { stats: { comp: 1, esp: 1 }, setFlags: ['conhece_ervas'], item: ['erva_orvalho'] } } },
      { text: 'Perguntar de onde ela conhece seu nome.', check: { stat: ['comp', 'esp'], dif: 0, tag: 'mente' }, ok: { text: 'Ela ri baixo. "Eu ouvi no vento. Você ainda não sabe escutar, mas vai." Algo em sua cabeça faz um clique distante.', fx: { stats: { esp: 2 }, xp: 2 } }, fail: { text: 'Ela só sorri e muda de assunto. A dúvida fica, como uma pedra no sapato.', fx: { stats: { comp: 1 } } } },
      { text: 'Recuar: dizem que ela é bruxa.', res: { text: 'Você vai embora sem olhar para trás. Na noite seguinte, sonha com o riso dela.', fx: { stats: { sor: -1 } } } },
    ],
  },
  {
    id: 'og_campones_vizinho', title: 'O Vizinho Que Partiu', rarity: 'comum', once: true, weight: 3,
    cond: O('campones', 10, 17),
    text: 'O filho do vizinho, três anos mais velho, volta à vila de roupa nova e conta que "foi aceito numa seita". Ninguém acredita. Ele ergue a mão e uma folha seca flutua entre os dedos. Os velhos fazem sinal contra mau-olhado; as crianças fazem fila.',
    choices: [
      { text: 'Perguntar como se faz.', res: { text: 'Ele fala de "Qi", de "meridianos", de uma cidade onde o chão brilha. Você não entende metade, mas decora tudo.', fx: { stats: { comp: 1, dao: 1 }, setFlags: ['ouviu_do_qi'] } } },
      { text: 'Duvidar em voz alta e desafiá-lo.', check: { stat: ['fis', 'car'], dif: 0 }, ok: { text: 'A folha cai, ele se atrapalha, e você, rindo, descobre que, por trás do truque, havia só um menino com medo.', fx: { stats: { car: 1 }, karma: 1 } }, fail: { text: 'Ele o derruba com um empurrão de vento. Você vai para casa de joelho ralado e orgulho idem.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Ignorá-lo e voltar ao trabalho.', res: { text: 'A enxada pesa mais naquela tarde. Mas você pensa na folha flutuando por um bom tempo.', fx: { stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'og_campones_lenha', title: 'A Lenha do Inverno', rarity: 'comum', once: true, weight: 2.5,
    cond: O('campones', 11, 18),
    text: 'O inverno chegou antes, e a pilha de lenha está pela metade. Seu pai ficou doente, e o machado é grande demais para você. Há uma floresta de pinheiros do outro lado do riacho, onde dizem que ninguém deve cortar.',
    choices: [
      { text: 'Atravessar o riacho e cortar assim mesmo.', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'O pinheiro cai com um suspiro. Algo na floresta o observa, e deixa passar. A lenha dura até a primavera.', fx: { stats: { fis: 2, dao: 1 }, karma: -1 } }, fail: { text: 'Um galho solta-se e atinge seu ombro. Você volta com meia carga e um hematoma enorme.', fx: { ferida: 1, stats: { fis: 1 } } } },
      { text: 'Trocar trabalho por lenha com os vizinhos.', res: { text: 'Há mais gente disposta a ajudar do que você imaginava. Aprende que, no campo, o inverno é de todos.', fx: { karma: 3, stats: { car: 1 }, fama: 1 } } },
      { text: 'Queimar os móveis velhos da casa.', res: { text: 'A mesa vira cinza. O pai, de cama, finge não ver, e agradece em silêncio pelo calor.', fx: { karma: 1, stats: { dao: 1 } } } },
    ],
  },

  /* ================= ÓRFÃO ACOLHIDO PELA SEITA ================= */
  {
    id: 'og_orfao_cozinha', title: 'O Servo da Cozinha', rarity: 'comum', once: true, weight: 3,
    cond: O('orfao_seita', 7, 13),
    text: 'Seu primeiro trabalho em {seita} é descascar raízes na cozinha dos discípulos internos. Eles passam, falam alto, cheiram a incenso. O cozinheiro-chefe, um homem de bigodes caídos, joga um pano velho nas suas mãos: "Aqui, quem observa, come."',
    choices: [
      { text: 'Observar tudo: quem entra, quem sai, quem come mal.', res: { text: 'Em um mês, você sabe a hora de cada ancião, o prato favorito de cada discípulo e quem, escondido, rouba pílulas da despensa.', fx: { stats: { comp: 2 }, setFlags: ['sabe_dos_segredos'] } } },
      { text: 'Trabalhar calado e tentar agradar o chefe.', res: { text: 'O bigodudo acaba lhe dando uma tigela extra. É o primeiro afeto que você recebe naquele lugar.', fx: { stats: { dao: 1, car: 1 }, karma: 1 } } },
      { text: 'Fugir para olhar os discípulos treinando.', check: { stat: ['sor', 'comp'], dif: 0, tag: 'fuga' }, ok: { text: 'Do alto de uma figueira, você vê a sequência inteira de uma forma de espada. Sua memória guarda cada passo.', fx: { stats: { comp: 1, dao: 1 }, setFlags: ['viu_a_forma'] } }, fail: { text: 'O chefe o flagra e lhe dá uma bronca que ecoa até a sala dos anciões.', fx: { fama: -1, karma: -1 } } },
    ],
  },
  {
    id: 'og_orfao_protetor', title: 'O Discípulo Que Defendeu Você', rarity: 'comum', once: true, weight: 3,
    cond: O('orfao_seita', 8, 15),
    text: 'Três discípulos de pátio, mais velhos, encurralaram você atrás do depósito para "ensinar o lugar de órfão". Antes do primeiro soco, uma voz rouca os interrompe: um rapaz alto, de cicatriz no queixo, que você só tinha visto de longe.',
    choices: [
      { text: 'Agradecer e perguntar o nome dele.', res: { text: 'Ele diz que se chama {amigo} e que "ninguém merece apanhar sem motivo". Desde aquele dia, vocês dividem o almoço.', fx: { setFlags: ['amigo_da_seita'], stats: { car: 1 }, karma: 2 } } },
      { text: 'Dizer que não precisava de ajuda.', res: { text: 'Ele ri, ergue uma sobrancelha e vai embora. Mais tarde, você percebe que errou, e que não sabe como se desculpar.', fx: { stats: { dao: 1 }, karma: -1 } } },
      { text: 'Seguir o rapaz e pedir que o ensine a lutar.', check: { stat: ['car', 'fis'], dif: 0 }, ok: { text: 'Ele resmunga, faz cara de quem não gosta de companhia, mas no outro dia aparece com duas varas de bambu.', fx: { stats: { fis: 2, dao: 1 }, setFlags: ['amigo_da_seita'] } }, fail: { text: 'Ele recusa com educação. Você treina sozinho, com raiva e um galho.', fx: { stats: { fis: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'og_orfao_manual', title: 'O Manual no Lixo', rarity: 'raro', once: true, weight: 2.5,
    cond: O('orfao_seita', 9, 16),
    text: 'Ao limpar o depósito dos fundos, você encontra uma caixa de livros descartados: manuais danificados, pergaminhos rasgados, um caderno quase queimado. Para a seita, é lixo. Para quem nunca teve um livro, é um tesouro.',
    choices: [
      { text: 'Levar tudo para o quarto e estudar à noite.', check: { stat: ['comp', 'dao'], dif: 0 }, ok: { text: 'Fragmentos se encaixam: uma respiração, uma postura, uma explicação do Qi. Sua base é, sem ninguém saber, melhor do que a de muitos discípulos.', fx: { stats: { comp: 2, esp: 1 }, tecnica: ['respiracao_nuvem'] } }, fail: { text: 'A letra é difícil e metade das páginas, ilegível. Mas você aprende a ler melhor, só por teimosia.', fx: { stats: { comp: 1 } } } },
      { text: 'Entregar tudo a um ancião, esperando reconhecimento.', res: { text: 'O ancião agradece sem olhar. No dia seguinte, os livros estão na biblioteca dos discípulos internos. Você aprende como o mundo funciona.', fx: { karma: 2, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'og_orfao_intendente', title: 'O Intendente Injusto', rarity: 'comum', once: true, weight: 3,
    cond: O('orfao_seita', 10, 17),
    text: 'O intendente do pátio tem fama de dar a pior comida aos servos e guardar a melhor para si. Hoje, ele o acusa de roubar um bolo da despensa. A acusação é falsa, e a punição, três dias de jejum.',
    choices: [
      { text: 'Protestar e pedir prova.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'A sua insistência chama a atenção de um ancião que passava. O verdadeiro ladrão, o filho do intendente, é descoberto.', fx: { fama: 4, karma: 3, stats: { car: 1 } } }, fail: { text: 'O intendente dobra a punição pela insolência. Você jejua em silêncio, aprendendo que as palavras também têm preço.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Aceitar o jejum e guardar o rancor.', res: { text: 'Três dias de fome, e uma lista mental de nomes. Um dia, você vai rever cada um.', fx: { stats: { dao: 2 }, karma: -1, setFlags: ['rancor_da_seita'] } } },
      { text: 'Roubar um bolo de verdade, só por desforra.', check: { stat: ['sor', 'comp'], dif: 1, tag: 'fuga' }, ok: { text: 'O bolo, roubado com dignidade, tem o gosto da justiça. Ninguém jamais descobre.', fx: { karma: -2, stats: { sor: 1 } } }, fail: { text: 'Você é pego com a boca cheia. A punição, agora, é justa. E dobrada.', fx: { ferida: 1, karma: -2, fama: -2 } } },
    ],
  },
  {
    id: 'og_orfao_portao', title: 'A Noite do Portão', rarity: 'raro', once: true, weight: 2.5,
    cond: O('orfao_seita', 12, 19),
    text: 'Numa noite de lua nova, você vê alguém escalar o muro da seita: um vulto encapuzado, ferido, que deixa cair um pergaminho antes de desaparecer na mata. O pergaminho tem o selo de {seita}, e, abaixo, uma linha escrita a sangue: "Traição".',
    choices: [
      { text: 'Levar o pergaminho a um ancião.', res: { text: 'O ancião lê, empalidece, e lhe pede segredo. Semanas depois, um suposto traidor é descoberto, e você ganha um padrinho.', fx: { fama: 5, karma: 3, setFlags: ['padrinho_na_seita'], stats: { dao: 1 } } } },
      { text: 'Guardar o pergaminho e investigar sozinho.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'Pelas pistas, você chega ao nome de quem escreveu. Uma peça importante de um jogo muito maior, que você, por ora, só observa.', fx: { stats: { comp: 2 }, setFlags: ['sabe_do_traidor'] } }, fail: { text: 'As pistas levam a um beco sem saída, e a um intendente desconfiado. Você devolve o pergaminho, de mãos vazias e coração acelerado.', fx: { stats: { comp: 1 }, karma: -1 } } },
      { text: 'Queimar o pergaminho: é perigoso demais para um servo.', res: { text: 'As chamas devoram a linha vermelha. Você dorme mal por semanas, mas dorme.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },

  /* ================= HERDEIRO DE UM CLÃ DECADENTE ================= */
  {
    id: 'og_cla_cofre', title: 'O Cofre Vazio', rarity: 'comum', once: true, weight: 3,
    cond: O('cla_decadente', 7, 13),
    text: 'Seu avô abre o cofre da família diante de você, com cerimônia. Dentro, há uma moeda de cobre, um pergaminho amarelado e um leque rasgado. "Isto é tudo", ele diz, com a mesma dignidade de quem exibe um tesouro. "Nosso nome vale mais."',
    choices: [
      { text: 'Perguntar sobre o pergaminho.', res: { text: 'É a árvore genealógica do {cla}: dez gerações de cultivadores, um ancestral lendário, e uma linha final riscada de vermelho. Seu avô muda de assunto.', fx: { stats: { comp: 1 }, setFlags: ['sabe_do_cla'] } } },
      { text: 'Guardar o leque e prometer reerguer o clã.', res: { text: 'Seu avô sorri pela primeira vez em meses. Algo naquela promessa, desproporcional e pueril, fica gravado na sua alma.', fx: { stats: { dao: 2 }, karma: 1, setFlags: ['jurou_reerguer'] } } },
      { text: 'Vender a moeda e comprar comida.', res: { text: 'É a decisão sensata, e a que dói mais. O avô, calado, divide o arroz como quem divide uma relíquia.', fx: { pedras: 2, stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'og_cla_credor', title: 'O Credor Visita a Casa', rarity: 'comum', once: true, weight: 3,
    cond: O('cla_decadente', 9, 16),
    text: 'Um homem gordo, de anéis nos dedos e risinho educado, chega com um escrivão. Diz que o {cla} deve uma soma antiga e que "vai aceitar com gosto uma pequena parte, na forma de um serviço". Seu avô está pálido.',
    choices: [
      { text: 'Oferecer-se para saldar a dívida com trabalho.', res: { text: 'O credor aceita, divertido. Você passa dois anos em armazéns e livros-caixa, aprendendo mais sobre o mundo do que ensinaram aos seus pais.', fx: { stats: { comp: 1, car: 1 }, pedras: 6, setFlags: ['trabalhou_pro_credor'] } } },
      { text: 'Desafiar o credor com a honra do clã.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O discurso ecoa na sala. O credor, surpreso, reduz a dívida e vai embora. Seu avô chora em silêncio.', fx: { fama: 4, stats: { car: 2, dao: 1 }, karma: 2 } }, fail: { text: 'O credor ri. A dívida dobra pela insolência, e a casa fica mais fria.', fx: { fama: -2, pedras: -3 } } },
      { text: 'Esperar que o avô resolva.', res: { text: 'O avô resolve, de um jeito humilhante, que você prefere esquecer. Aprende a não esperar.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },
  {
    id: 'og_cla_glorias', title: 'O Avô e as Glórias de Antigamente', rarity: 'comum', once: true, weight: 3,
    cond: O('cla_decadente', 8, 15),
    text: 'Toda noite, o avô conta uma história sobre o que o {cla} já foi: um ancestral que cortou um rio ao meio, uma ancestral que derrotou um dragão. Cada história tem uma moral e uma lacuna. Esta noite, ele conta uma que nunca ouvira, e fica calado no meio.',
    choices: [
      { text: 'Perguntar o que aconteceu depois.', res: { text: 'Ele demora a responder. Fala de uma traição, de um selo perdido, de um nome que o clã jurou jamais pronunciar. Você anota tudo na memória.', fx: { stats: { comp: 1 }, setFlags: ['sabe_da_traicao_do_cla'] } } },
      { text: 'Pedir que ele ensine o que sabe de cultivo.', check: { stat: ['comp', 'car'], dif: 0 }, ok: { text: 'O avô relutante cede. Passa a lhe ensinar uma respiração antiga, fraca, mas legítima, do clã.', fx: { tecnica: ['respiracao_nuvem'], stats: { comp: 1, esp: 1 } } }, fail: { text: 'Ele diz que o clã já sofreu demais com cultivo. A resposta é um muro, mas uma curiosidade se acende.', fx: { stats: { dao: 1 } } } },
      { text: 'Ouvir calado e dormir no colo dele.', res: { text: 'Uma das últimas noites assim. Você só vai saber disso muito depois.', fx: { stats: { dao: 1 }, karma: 2 } } },
    ],
  },
  {
    id: 'og_cla_casamento', title: 'O Casamento Que Salvaria o Clã', rarity: 'raro', once: true, weight: 2.5,
    cond: O('cla_decadente', 13, 19),
    text: 'Uma família rica de mercadores propõe o casamento do herdeiro do {cla} com a filha caçula deles. Em troca, quitam as dívidas e reformam a casa. A moça, pelo que se diz, é tímida e lê escondida. Seu avô olha para você, esperando.',
    choices: [
      { text: 'Aceitar o casamento arranjado.', res: { text: 'A cerimônia é simples. A moça e você acabam descobrindo, aos poucos, que ambos preferiam não ter sido escolhidos, e que é possível gostar mesmo assim.', fx: { pedras: 25, setFlags: ['casamento_arranjado', 'noivo_definido'], stats: { car: 1 }, karma: 1 } } },
      { text: 'Recusar e buscar outro modo de salvar o clã.', res: { text: 'O avô suspira, orgulhoso e triste. Daqui para frente, o clã dependerá de você, de verdade, e de mais ninguém.', fx: { stats: { dao: 2 }, setFlags: ['jurou_reerguer'] } } },
      { text: 'Fugir de casa antes da cerimônia.', res: { text: 'A fuga é covarde, e livre. Você carrega, pela estrada, a culpa e o ar fresco, em partes iguais.', fx: { karma: -3, stats: { sor: 1 }, fama: -2 } } },
    ],
  },
  {
    id: 'og_cla_salao', title: 'A Sala Esquecida do Clã', rarity: 'comum', once: true, weight: 2.5,
    cond: O('cla_decadente', 10, 18),
    text: 'No fundo da casa do {cla}, há um salão que ninguém limpa: tabuletas de ancestrais, incenso seco, uma espada oxidada sobre o altar. Você entra por acaso numa tarde de chuva e sente que o ar tem memória.',
    choices: [
      { text: 'Acender incenso e rezar aos ancestrais.', res: { text: 'A fumaça sobe reta, contra o vento. Alguém, em algum lugar, parece ter ouvido.', fx: { karma: 2, stats: { dao: 1 }, setFlags: ['rezou_aos_ancestrais'] } } },
      { text: 'Limpar a espada oxidada.', check: { stat: ['fis', 'comp'], dif: 0 }, ok: { text: 'Sob a ferrugem, o aço é claro como o dia. A espada, ao ser limpa, vibra em suas mãos como quem reconhece.', fx: { item: ['espada_ferro_frio'], stats: { fis: 1, dao: 1 } } }, fail: { text: 'A espada está mais danificada do que parece. Você a limpa mesmo assim, e se corta, de leve.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Sair depressa: o lugar é pesado demais.', res: { text: 'Na saída, o vento fecha a porta atrás de você com delicadeza demais para ser vento.', fx: { stats: { sor: 1 } } } },
    ],
  },

  /* ================= FILHO DE MERCADORES ================= */
  {
    id: 'og_mercador_caravana', title: 'A Primeira Caravana', rarity: 'comum', once: true, weight: 3,
    cond: O('mercador', 8, 15),
    text: 'Seu pai o leva, pela primeira vez, numa caravana de seis carroças até uma cidade vizinha. A estrada é longa, os guardas, entediados, e o cheiro de especiarias e couro é inebriante. Na terceira noite, um dos guardas desaparece com parte da carga.',
    choices: [
      { text: 'Rastrear o guarda na mata.', check: { stat: ['sor', 'comp'], dif: 1 }, ok: { text: 'Você o encontra dormindo sobre os sacos roubados. A caravana recupera a carga, e seu pai o observa de um jeito novo.', fx: { pedras: 6, stats: { comp: 1, sor: 1 }, fama: 2 } }, fail: { text: 'Você se perde na mata e volta ao amanhecer, sujo e sem resultado. O guarda nunca é achado.', fx: { ferida: 1, stats: { sor: 1 } } } },
      { text: 'Contar ao pai e deixar que ele decida.', res: { text: 'Seu pai resolve com dinheiro e silêncio. Você aprende que, em certos negócios, perder é o preço de manter a paz.', fx: { stats: { car: 1, dao: 1 } } } },
      { text: 'Propor ao pai um sistema de contagem melhor.', check: { stat: ['comp', 'car'], dif: 0 }, ok: { text: 'Uma lista simples, um selo, uma assinatura. O pai sorri e adota a ideia nas carroças seguintes.', fx: { pedras: 8, stats: { comp: 2 }, setFlags: ['ideia_do_menino'] } }, fail: { text: 'O pai diz que o sistema é complicado demais. Mas guarda a lista no bolso.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'og_mercador_bandidos', title: 'Negociar com os Bandidos', rarity: 'raro', once: true, weight: 2.5,
    cond: O('mercador', 11, 17),
    text: 'A caravana é parada por seis bandidos de rosto coberto. O chefe pede metade da carga, ou "uma generosidade equivalente". Seu pai congela. Os guardas olham para os pés. É a sua vez de falar, e você sabe contar.',
    choices: [
      { text: 'Barganhar: oferecer um terço da carga e uma parceria.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O chefe ri, aceita, e passa a escoltar sua caravana pela região. Você aprende que até bandidos gostam de contratos.', fx: { pedras: 10, fama: 3, stats: { car: 2, comp: 1 }, setFlags: ['pacto_com_bandidos'] } }, fail: { text: 'O chefe acha a oferta insultuosa. A caravana é saqueada, e seu pai fica semanas sem falar.', fx: { pedras: -6, karma: -1 } } },
      { text: 'Entregar o que pedem, sem discutir.', res: { text: 'A vida é preservada, e o lucro, perdido. Seu pai aperta seu ombro, em agradecimento mudo.', fx: { pedras: -4, stats: { dao: 1 }, karma: 1 } } },
      { text: 'Gritar por socorro e tentar chamar a guarda do próximo posto.', check: { stat: ['sor', 'fis'], dif: 1, tag: 'fuga' }, ok: { text: 'O grito atravessa o vale, e uma patrulha de soldados aparece na curva. Os bandidos somem, e você ganha fama de menino valente.', fx: { fama: 5, stats: { sor: 1 } } }, fail: { text: 'Os bandidos não gostam do barulho. O saque, agora, é violento.', fx: { ferida: 2, pedras: -6 } } },
    ],
  },
  {
    id: 'og_mercador_livro', title: 'O Livro de Contas Secreto', rarity: 'comum', once: true, weight: 3,
    cond: O('mercador', 9, 16),
    text: 'Dentro do armazém, você descobre um livro de contas escondido sob o balcão, com números que não batem com o livro oficial. Seu pai paga propinas a um oficial da cidade, e lucra com contrabando de ervas espirituais.',
    choices: [
      { text: 'Confrontar o pai.', res: { text: 'Ele fica calado, depois explica: sem aquele dinheiro, a família já teria quebrado. Você não concorda, e entende. É uma lição de mundo.', fx: { stats: { dao: 1, comp: 1 }, karma: 1 } } },
      { text: 'Aprender o esquema e ajudar a escondê-lo.', res: { text: 'Em um ano, você domina contabilidade de dois mundos. O dinheiro vem, e a consciência aperta um pouco.', fx: { pedras: 12, stats: { comp: 2 }, karma: -3 } } },
      { text: 'Denunciar o oficial, não o pai.', check: { stat: ['car', 'sor'], dif: 1 }, ok: { text: 'O oficial é afastado, e o pai, sem saber quem denunciou, jura vingança contra o desconhecido. Ironias.', fx: { fama: 3, karma: 3, stats: { car: 1 } } }, fail: { text: 'O oficial descobre a denúncia, e a família paga caro por isso.', fx: { pedras: -6, karma: 1 } } },
    ],
  },
  {
    id: 'og_mercador_rival', title: 'O Filho do Mercador Rival', rarity: 'comum', once: true, weight: 3,
    cond: O('mercador', 10, 17),
    text: 'O filho do maior concorrente do seu pai senta-se ao seu lado na escola de contabilidade e sorri demais. Ele tem um anel de jade, uma bolsa bordada e uma facilidade enervante de ser querido. Ele propõe, para o bem de ambos, uma "amizade estratégica".',
    choices: [
      { text: 'Aceitar a amizade e aprender com ele.', res: { text: 'Ele é astuto, e você, também. A amizade tem a temperatura de um negócio, e a durabilidade de um segredo bem guardado.', fx: { stats: { car: 2 }, setFlags: ['amigo_estrategico'], pedras: 4 } } },
      { text: 'Recusar e tratá-lo como adversário.', res: { text: 'Ele dá de ombros, e passa a competir com você em tudo: notas, vendas, presentes. A rivalidade o torna mais atento.', fx: { stats: { comp: 1, dao: 1 }, setFlags: ['rival_mercador'] } } },
      { text: 'Sabotar o anel dele.', check: { stat: ['sor', 'comp'], dif: 0, tag: 'fuga' }, ok: { text: 'O anel some, e ele jura que foi roubado. Ninguém desconfia de você, que nunca teve tanta paz.', fx: { karma: -3, pedras: 5, stats: { sor: 1 } } }, fail: { text: 'Ele o pega com a mão no anel. Seu pai paga uma multa vexatória.', fx: { fama: -3, karma: -2, pedras: -4 } } },
    ],
  },
  {
    id: 'og_mercador_presente', title: 'O Presente do Pai', rarity: 'comum', once: true, weight: 3,
    cond: O('mercador', 13, 19),
    text: 'No seu aniversário, seu pai lhe entrega um embrulho. Dentro, há uma balança de bronze, de pesos minúsculos, com uma inscrição na base: "Pese tudo. Principalmente a si mesmo." Ele diz que foi do pai dele, e que o próximo será seu.',
    choices: [
      { text: 'Aceitar e jurar honrar o legado.', res: { text: 'A balança pesa mais do que parece. Você passa a pesar também as palavras, as promessas, os silêncios.', fx: { stats: { dao: 1, comp: 1 }, karma: 2, setFlags: ['balanca_do_avo'] } } },
      { text: 'Perguntar se a balança é para vender.', res: { text: 'Seu pai dá uma gargalhada, e é a primeira vez em meses. "Para você, sim, tudo é negócio. Talvez seja uma bênção."', fx: { stats: { car: 1 }, pedras: 3 } } },
      { text: 'Deixar a balança e partir para a estrada.', res: { text: 'Seu pai o olha da porta, sem dizer nada. A balança, mais tarde, estará na sua bolsa, que ele colocou no último instante.', fx: { stats: { sor: 1, dao: 1 }, setFlags: ['balanca_do_avo'] } } },
    ],
  },

  /* ================= CAÇADOR DAS MONTANHAS ================= */
  {
    id: 'og_cacador_primeira', title: 'A Primeira Caça', rarity: 'comum', once: true, weight: 3,
    cond: O('cacador', 8, 14),
    text: 'Seu pai o leva à mata, de arco curto e faca de osso. "Hoje você traz a ceia", diz. Pegadas frescas de um cervo de chifres brancos cruzam a trilha. É a presa certa, e o animal parece saber que você está ali.',
    choices: [
      { text: 'Seguir o cervo em silêncio e atirar na hora certa.', check: { stat: ['sor', 'fis'], dif: 0, tag: 'combate' }, ok: { text: 'A flecha encontra o alvo. Você agradece ao cervo, como o pai ensinou, e carrega a presa nos ombros.', fx: { fama: 2, stats: { fis: 1, sor: 1 }, pedras: 3 } }, fail: { text: 'A flecha passa de raspão. O cervo some, e o pai, sem repreender, só diz: "Amanhã."', fx: { stats: { dao: 1 } } } },
      { text: 'Observar o cervo sem atirar.', res: { text: 'Ele bebe água, levanta a cabeça, olha para você, e vai embora. Seu pai, ao saber, só ri e lhe dá um tapinha nas costas.', fx: { stats: { dao: 2, esp: 1 }, karma: 2 } } },
      { text: 'Afastar-se e caçar coelhos, por prudência.', res: { text: 'A ceia é pobre e certa. O pai assente: ele também começou assim.', fx: { stats: { comp: 1 }, pedras: 1 } } },
    ],
  },
  {
    id: 'og_cacador_fera', title: 'A Fera Ferida', rarity: 'comum', once: true, weight: 3,
    cond: O('cacador', 9, 16),
    text: 'Numa clareira, uma loba de pelo prateado está presa numa armadilha de ferro. Os olhos dela brilham de dor e de raiva. Dizem que lobas assim valem muito, e que são, às vezes, espíritos de ancestrais.',
    choices: [
      { text: 'Libertar a loba da armadilha.', check: { stat: ['fis', 'car'], dif: 0, tag: 'besta' }, ok: { text: 'Ela rosna, mas não morde. Depois que você a liberta, ela lambe sua mão, e some. Meses depois, uma silhueta prateada o acompanha de longe.', fx: { karma: 4, stats: { esp: 1, sor: 1 }, setFlags: ['loba_prateada'] } }, fail: { text: 'A armadilha escapa, e a loba o morde, de susto. A ferida é feia, mas ela foge livre.', fx: { ferida: 1, karma: 3, stats: { esp: 1 } } } },
      { text: 'Abater a loba e vender a pele.', res: { text: 'A pele rende bom dinheiro. A noite, porém, é longa, e há um uivo que não vem de nenhum lobo conhecido.', fx: { pedras: 10, karma: -4, stats: { fis: 1 } } } },
      { text: 'Chamar o pai para decidir.', res: { text: 'O pai a olha por muito tempo, e a liberta sem dizer palavra. "Alguns caçadores só caçam para viver. Outros, para lembrar quem são."', fx: { stats: { dao: 1 }, karma: 2 } } },
    ],
  },
  {
    id: 'og_cacador_trilha', title: 'A Trilha Que Não Existia', rarity: 'raro', once: true, weight: 2.5,
    cond: O('cacador', 11, 17),
    text: 'Seguindo uma pista, você descobre uma trilha que não estava lá ontem: pedras redondas, musgo brilhante, uma luz azulada no fundo. Seu pai disse que a montanha, às vezes, muda de ideia. Parece ser um dia desses.',
    choices: [
      { text: 'Seguir a trilha até o fim.', check: { stat: ['sor', 'esp'], dif: 1 }, ok: { text: 'No fim da trilha, uma fonte de água azul brota da rocha. Quem bebe, sente o corpo leve e o Qi fazer cócegas. Algo em você desperta.', fx: { stats: { esp: 2, sor: 1 }, xp: 3, setFlags: ['fonte_azul'] } }, fail: { text: 'A trilha termina num precipício. Você volta com cuidado, sentindo o olhar da montanha nas costas.', fx: { stats: { sor: 1 } } } },
      { text: 'Marcar o local e voltar com o pai.', res: { text: 'Quando volta com o pai, a trilha já não existe. O pai coça a barba: "Algumas coisas são só para quem as vê primeiro."', fx: { stats: { dao: 1 } } } },
      { text: 'Ignorar: a montanha tem seus segredos.', res: { text: 'Você volta para casa pela trilha comum. Um peso pequeno, de curiosidade não satisfeita, fica com você por muitos anos.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'og_cacador_velho', title: 'O Velho Caçador', rarity: 'comum', once: true, weight: 3,
    cond: O('cacador', 10, 18),
    text: 'Um caçador velho, de um olho só, passa pela sua cabana e pede abrigo. À noite, conta histórias de feras de mil anos, de espíritos da montanha e de uma lição que aprendeu da pior forma: "Respeite a presa. A montanha vê."',
    choices: [
      { text: 'Pedir que ele o ensine a rastrear.', check: { stat: ['comp', 'sor'], dif: 0 }, ok: { text: 'Por três semanas, ele o treina. No fim, você segue qualquer pegada, ouve qualquer folha, lê qualquer vento.', fx: { stats: { comp: 1, sor: 1, fis: 1 }, setFlags: ['rastreador'] } }, fail: { text: 'Ele se cansa do seu ritmo e parte antes do previsto. Mas deixa uma faca de osso de presente.', fx: { stats: { fis: 1 } } } },
      { text: 'Ouvir só as histórias, e anotar o que lembrar.', res: { text: 'Cada história tem um nome de fera. Um dia, esses nomes valerão ouro.', fx: { stats: { comp: 2 }, setFlags: ['sabe_das_feras'] } } },
      { text: 'Perguntar como ele perdeu o olho.', res: { text: 'Ele fica calado um bom tempo. "Uma fera me ensinou a ser humilde." Só isso. Naquela noite, você entende que ele nunca contou a ninguém.', fx: { stats: { dao: 1, car: 1 }, karma: 1 } } },
    ],
  },
  {
    id: 'og_cacador_tempestade', title: 'A Tempestade na Serra', rarity: 'comum', once: true, weight: 2.5,
    cond: O('cacador', 12, 19),
    text: 'Uma tempestade de granizo apanha você a meio dia de casa. O céu escureceu em minutos, as árvores curvam-se ao vento, um relâmpago racha um pinheiro ao seu lado. Há uma caverna a cem passos, e uma trilha mais longa, mais segura.',
    choices: [
      { text: 'Correr para a caverna.', check: { stat: ['fis', 'sor'], dif: 0, tag: 'fuga' }, ok: { text: 'Você entra ofegante, no momento exato em que o pinheiro desaba sobre o lugar onde estava. A caverna é seca, e tem um ninho abandonado.', fx: { stats: { fis: 1, sor: 1 } } }, fail: { text: 'Um raio cai muito perto. Você chega à caverna surdo e chamuscado, mas vivo.', fx: { ferida: 1, stats: { sor: 1 } } } },
      { text: 'Tomar a trilha longa, mais protegida.', res: { text: 'O caminho é cansativo, mas calmo. Você chega em casa tarde, ensopado, e com uma lição sobre prudência.', fx: { stats: { dao: 1 } } } },
      { text: 'Parar no meio da tempestade e observar o raio.', check: { stat: ['esp', 'dao'], dif: 1 }, ok: { text: 'O raio, de perto, tem um ritmo. Você sente algo no peito vibrar no mesmo compasso. É a primeira vez que sente o Qi do mundo.', fx: { stats: { esp: 2, dao: 1 }, xp: 3 } }, fail: { text: 'O trovão estoura a poucos metros, e você cai de joelhos. Passa dias com o ouvido zunindo.', fx: { ferida: 1, stats: { esp: 1 } } } },
    ],
  },

  /* ================= NETO DE ALQUIMISTA ================= */
  {
    id: 'og_alq_caderno', title: 'O Caderno do Avô', rarity: 'comum', once: true, weight: 3,
    cond: O('herdeiro_alquimista', 8, 15),
    text: 'No fundo do baú do avô, você encontra um caderno de capa de couro com receitas, desenhos de ervas e anotações marginais em letra apertada. Algumas páginas estão rasgadas; outras, escritas em código.',
    choices: [
      { text: 'Estudar o caderno todas as noites.', check: { stat: ['comp', 'esp'], dif: 0, tag: 'alquimia' }, ok: { text: 'Em meio ano, você decifra o código. As receitas escondidas incluem uma pílula de nome impronunciável e um alerta: "Nunca duas vezes."', fx: { stats: { comp: 2, esp: 1 }, setFlags: ['decifrou_o_caderno'] } }, fail: { text: 'O código resiste. Mas você aprende o bastante das receitas simples para preparar remédios de vila.', fx: { stats: { comp: 1 }, pedras: 3 } } },
      { text: 'Vender o caderno para pagar as dívidas.', res: { text: 'O preço é bom, e o arrependimento é maior. Você nunca saberá o que havia nas páginas rasgadas.', fx: { pedras: 15, karma: -1, stats: { dao: -1 } } } },
      { text: 'Guardar para quando for mais velho.', res: { text: 'Fecha o caderno e o enterra no fundo do baú. Há coisas que precisam amadurecer, inclusive você.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'og_alq_jardim', title: 'O Jardim das Ervas do Avô', rarity: 'comum', once: true, weight: 3,
    cond: O('herdeiro_alquimista', 9, 16),
    text: 'Atrás da casa, o jardim do seu avô virou mato. Mas, entre as ervas daninhas, algumas plantas ainda crescem, teimosas, com folhas de formatos estranhos. Uma delas solta, ao ser tocada, um perfume que lembra incenso de templo.',
    choices: [
      { text: 'Limpar o jardim e cultivar as ervas.', res: { text: 'Três meses de trabalho. O jardim renasce, e três das ervas têm propriedades que vendem bem na cidade.', fx: { stats: { comp: 1, sor: 1 }, pedras: 6, setFlags: ['jardim_do_avo'] } } },
      { text: 'Colher só a de perfume de templo.', check: { stat: ['esp', 'comp'], dif: 0, tag: 'alquimia' }, ok: { text: 'Após secar e moer a erva, você faz uma infusão. O Qi, por um instante, parece visível. Você nunca se sentiu tão acordado.', fx: { stats: { esp: 2 }, xp: 2, item: ['erva_orvalho'] } }, fail: { text: 'A infusão sai amarga e fraca. Mas você aprende a identificar a planta, e isso, mais tarde, vale ouro.', fx: { stats: { comp: 1 } } } },
      { text: 'Deixar o jardim como está: era do avô.', res: { text: 'As ervas continuam a crescer, selvagens. Às vezes, você passa por lá só para sentir o cheiro.', fx: { karma: 1, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'og_alq_cliente', title: 'O Cliente Suspeito', rarity: 'raro', once: true, weight: 2.5,
    cond: O('herdeiro_alquimista', 11, 18),
    text: 'Um homem de capa escura entra na loja do falecido avô e pede uma pílula "que apague as pistas de um veneno no corpo de um homem morto". Ele deixa um saco de moedas sobre o balcão, e olha para você, sem expressão.',
    choices: [
      { text: 'Recusar e expulsar o homem.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O homem hesita, e vai embora, deixando as moedas. No dia seguinte, uma notícia de um assassinato impune sacode a cidade. Você sabe o que evitou.', fx: { karma: 4, stats: { dao: 2 }, fama: 2 } }, fail: { text: 'Ele não aceita recusa. Antes de sair, deixa uma ameaça sutil e um olhar frio. Você vai dormir de olho aberto.', fx: { karma: 2, stats: { dao: 1 }, setFlags: ['inimigo_secreto'] } } },
      { text: 'Aceitar o trabalho e preparar a pílula.', res: { text: 'As moedas são muitas. A pílula, perfeita. A culpa, que ainda não chegou, está a caminho.', fx: { pedras: 20, karma: -8, stats: { comp: 1 } } } },
      { text: 'Fingir que aceita e avisar a guarda.', check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'O homem é preso quando vem buscar a pílula. A guarda lhe agradece, e a cidade passa a ver a loja do avô com respeito.', fx: { fama: 6, karma: 5, pedras: 8, stats: { comp: 1, car: 1 } } }, fail: { text: 'O homem desconfia e some, antes da guarda chegar. Fica a sensação de uma oportunidade perdida.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'og_alq_fogo', title: 'O Fogo de Teste', rarity: 'comum', once: true, weight: 3,
    cond: O('herdeiro_alquimista', 12, 19),
    text: 'Na oficina do fundo, a velha fornalha de bronze do avô ainda funciona. Você tem ervas, uma panela e uma receita simples. Hoje é o dia de acender o fogo de teste, o primeiro de verdade. O ar cheira a carvão, a esperança e a medo de queimar tudo.',
    choices: [
      { text: 'Acender o fogo e seguir a receita à risca.', check: { stat: ['comp', 'esp'], dif: 0, tag: 'alquimia' }, ok: { text: 'A pílula sai pequena, redonda, de um dourado tímido. A primeira de muitas. Você a guarda como prova de que o avô vive em suas mãos.', fx: { stats: { comp: 2, esp: 1 }, item: ['pilula_qi_menor'], setFlags: ['primeira_pilula'] } }, fail: { text: 'A panela racha, o fogo se espalha, e quase leva as cortinas. Você apaga tudo a tempo, de rosto sujo e sorriso envergonhado.', fx: { ferida: 1, stats: { comp: 1 } } } },
      { text: 'Improvisar uma receita nova.', check: { stat: ['comp', 'sor'], dif: 1, tag: 'alquimia' }, ok: { text: 'A pílula é estranha, de cheiro de lavanda. Funciona, e é diferente de qualquer coisa. Um alquimista de verdade começa assim.', fx: { stats: { comp: 3 }, setFlags: ['receita_propria'], fama: 2 } }, fail: { text: 'A mistura explode em fumaça verde. Os vizinhos reclamam do cheiro por uma semana.', fx: { fama: -2, stats: { comp: 1 } } } },
      { text: 'Esperar: o avô nunca acenderia o fogo sem cerimônia.', res: { text: 'Você prepara a oficina, incensa, e só acende o fogo no dia seguinte, ao nascer do sol. A calma, de algum modo, é parte da receita.', fx: { stats: { dao: 1, comp: 1 } } } },
    ],
  },
  {
    id: 'og_alq_divida', title: 'As Dívidas do Avô', rarity: 'comum', once: true, weight: 3,
    cond: O('herdeiro_alquimista', 10, 18),
    text: 'Três credores batem à porta, cada um com um papel amarelado. O avô devia dinheiro a todos: um boticário, um mineiro, uma viúva. Nenhum perdoa. Um deles oferece comprar a loja inteira; outro, aceitar pílulas em vez de moedas.',
    choices: [
      { text: 'Pagar a viúva em pílulas e pedir prazo aos outros.', check: { stat: ['car', 'comp'], dif: 0, tag: 'alquimia' }, ok: { text: 'Os credores aceitam o acordo, e a viúva, surpresa, devolve metade do valor em ervas raras. Um começo de reputação.', fx: { fama: 3, stats: { car: 1, comp: 1 }, setFlags: ['pagou_as_dividas'] } }, fail: { text: 'As pílulas saem fracas, e dois credores recusam o acordo. A loja encolhe.', fx: { pedras: -4, fama: -1, stats: { comp: 1 } } } },
      { text: 'Vender a loja ao primeiro comprador.', res: { text: 'As dívidas somem, a loja também. Você guarda o caderno, a balança, e uma pontada de vergonha.', fx: { pedras: 6, karma: -1, stats: { dao: 1 } } } },
      { text: 'Desaparecer da cidade por uns meses.', res: { text: 'A fuga resolve nada, mas permite um respiro. Quando volta, algumas dívidas foram perdoadas pela morte de quem as cobrava.', fx: { stats: { sor: 1 }, karma: -2 } } },
    ],
  },

  /* ================= ALMA REENCARNADA ================= */
  {
    id: 'og_reenc_sonhos', title: 'Os Sonhos de Outra Vida', rarity: 'comum', once: true, weight: 3,
    cond: O('alma_reencarnada', 7, 13),
    text: 'À noite, você sonha com uma vida que não viveu: uma torre de marfim, um mestre de barba comprida, um rio de fogo. Acorda com o gosto do chá do mestre na boca, e a palavra "Hai-Lian" na ponta da língua. Ninguém na vila conhece esse nome.',
    choices: [
      { text: 'Anotar tudo num caderno, todas as manhãs.', res: { text: 'Em dois anos, o caderno é um mapa de uma vida perdida. Você não sabe se é memória ou imaginação, mas as respostas começam a fazer sentido.', fx: { stats: { comp: 2, dao: 1 }, setFlags: ['caderno_dos_sonhos'] } } },
      { text: 'Contar à mãe e pedir que reze.', res: { text: 'A mãe, assustada, leva você a um templo. O monge diz que há almas que "carregam demais". Ele dá um amuleto de sândalo, e um conselho: "Escute, mas não obedeça."', fx: { stats: { dao: 2 }, item: ['rosario_sandalo'] } } },
      { text: 'Ignorar os sonhos e brincar com as outras crianças.', res: { text: 'Funciona por um tempo. Depois, os sonhos ficam mais insistentes, e você passa a acordar chorando sem saber de quem.', fx: { stats: { car: 1 }, karma: 1 } } },
    ],
  },
  {
    id: 'og_reenc_objeto', title: 'O Objeto Que Você Reconhece', rarity: 'raro', once: true, weight: 2.5,
    cond: O('alma_reencarnada', 9, 16),
    text: 'Numa feira, entre quinquilharias, você vê uma pequena tigela de jade rachada. Seu coração dispara. Você sabe, sem saber como, que ela cabe exatamente na sua mão esquerda, e que, quando era "outro", você bebeu chá nela todas as manhãs.',
    choices: [
      { text: 'Comprar a tigela, custe o que custar.', check: { stat: ['car', 'sor'], dif: 0 }, ok: { text: 'O vendedor, vendo seus olhos, faz um desconto absurdo. Ao tocar a tigela, uma lembrança inteira se abre: o rosto do mestre, o cheiro do incenso, uma técnica perdida.', fx: { tecnica: ['memoria_vida_passada'], stats: { dao: 2, comp: 1 }, pedras: -2 } }, fail: { text: 'O preço é alto demais. Você vai embora, mas a tigela te persegue nos sonhos por semanas.', fx: { stats: { dao: 1 } } } },
      { text: 'Perguntar de onde veio.', res: { text: 'O vendedor conta que a comprou numa cidade distante, de um velho que disse: "Quem voltar a procurar, entregue-a." Você sente um frio na espinha.', fx: { stats: { comp: 1 }, setFlags: ['pista_da_vida_passada'] } } },
      { text: 'Fingir que não a viu.', res: { text: 'Você se afasta devagar. A tigela fica lá, brilhando de leve, enquanto você diz a si mesmo que não é nada.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },
  {
    id: 'og_reenc_velho', title: 'O Velho Que Olhou Demais', rarity: 'comum', once: true, weight: 3,
    cond: O('alma_reencarnada', 10, 17),
    text: 'Um monge andarilho cruza a vila e para diante de você, e o olha por tanto tempo que a conversa em volta cessa. "Eu o conheço", ele diz, devagar. "Mas não o seu rosto. Seu cansaço." Ele deixa uma moeda no seu bolso e vai embora.',
    choices: [
      { text: 'Correr atrás do monge.', check: { stat: ['fis', 'sor'], dif: 0, tag: 'fuga' }, ok: { text: 'Você o alcança na estrada. Ele sorri e diz um nome antigo, "Hai-Lian", e, só de ouvir, você chora. Ele indica uma direção, e some.', fx: { stats: { dao: 2, esp: 1 }, setFlags: ['pista_da_vida_passada'] } }, fail: { text: 'Ele desapareceu na curva. Você ouve só o sino do cajado, cada vez mais longe.', fx: { stats: { sor: -1, dao: 1 } } } },
      { text: 'Examinar a moeda.', res: { text: 'É uma moeda velha, de uma dinastia extinta. No verso, um símbolo que você já viu em sonhos. Você a guarda como talismã.', fx: { stats: { comp: 1 }, setFlags: ['moeda_do_monge'] } } },
      { text: 'Jogar a moeda no rio.', res: { text: 'A moeda cai, e a água fica, por um instante, dourada. Ninguém mais vê, e você jura que alguém, do fundo, agradeceu.', fx: { stats: { dao: 1 }, karma: 1 } } },
    ],
  },
  {
    id: 'og_reenc_medo', title: 'O Medo de Si Mesmo', rarity: 'comum', once: true, weight: 3,
    cond: O('alma_reencarnada', 12, 19),
    text: 'Cada vez que você entende demais depressa, algo dentro de você se assusta. Você já resolveu duas equações que ninguém ensinou, corrigiu um mestre de escola, e previu uma tempestade. O que estará crescendo dentro de você?',
    choices: [
      { text: 'Procurar um monge para conversar.', res: { text: 'O monge diz que "o passado é um rio, e quem se afoga nele esquece de nadar". É a primeira vez que você sente alívio.', fx: { stats: { dao: 2 }, corr: -2 } } },
      { text: 'Reprimir as memórias, fingindo ser comum.', res: { text: 'Funciona. Por alguns anos. Mas uma parte sua murcha, e outra, inquieta, aguarda a vez de voltar.', fx: { stats: { car: 1, dao: -1 }, karma: -1 } } },
      { text: 'Abraçar as memórias e usar tudo que sabe.', check: { stat: ['dao', 'esp'], dif: 1 }, ok: { text: 'O choque inicial é imenso. Depois, tudo se encaixa. Você sabe uma respiração de nível alto, e um mapa mental de cinco reinos.', fx: { stats: { comp: 3, dao: 1 }, xp: 3, setFlags: ['memorias_abertas'] } }, fail: { text: 'As lembranças vêm todas de uma vez, e um enjoo o domina por dias. Você aprende a ir mais devagar.', fx: { ferida: 1, stats: { dao: 1, comp: 1 } } } },
    ],
  },
  {
    id: 'og_reenc_lingua', title: 'A Língua dos Mortos', rarity: 'comum', once: true, weight: 2.5,
    cond: O('alma_reencarnada', 8, 16),
    text: 'Dormindo, você fala. A mãe ouve palavras que não existem no idioma da vila: sílabas lentas, tons como de sino. Uma manhã, você descobre que também sabe escrevê-las, com um pincel que nunca segurou.',
    choices: [
      { text: 'Mostrar a escrita a um letrado da cidade.', res: { text: 'O letrado empalidece: é uma língua oficial de uma dinastia de três mil anos. Ele tenta comprar o seu papel, e você prefere guardá-lo.', fx: { stats: { comp: 2 }, fama: 2, setFlags: ['escreve_lingua_antiga'] } } },
      { text: 'Praticar a escrita todos os dias.', res: { text: 'Um ano depois, você escreve poemas em uma língua que ninguém lê. Ou quase ninguém: um dia, alguém vai.', fx: { stats: { comp: 1, dao: 1 } } } },
      { text: 'Queimar os papéis: é sinal de maldição.', res: { text: 'A fogueira é breve. Mas as palavras continuam, depois, nos sonhos, mais nítidas do que antes.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },
];
