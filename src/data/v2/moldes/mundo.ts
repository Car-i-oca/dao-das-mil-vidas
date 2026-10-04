import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Cenas do mundo: o amigo que pede ajuda, as mortes de pessoas importantes (cena própria e consequências),
 * a reação ao rompimento (o tratamento muda com o reino) e as viradas que forjam e trocam a ambição.
 */
export const MUNDO: Molde[] = [
  molde({
    id: 'amigo_pede_ajuda',
    titulo: '{amigo.nome} Pede Ajuda',
    tipo: 'personagem',
    capitulos: ['entrada', 'ascensao', 'crise'],
    unico: true,
    papeis: { amigo: { pessoa: { papel: 'amigo', vivo: true } } },
    quando: { jogador: { reinoMin: 1 } },
    relevancia: [{ se: { papel: { amigo: { fato: ['juramento'] } } }, mais: 30 }, { se: { papel: { amigo: { opiniaoMin: 25 } } }, mais: 15 }],
    fio: { id: 'amigo', etapa: 2, abandono: 'O amigo seguiu sozinho, e o juramento ficou no galho.' },
    cena: [
      { se: { papel: { amigo: { fato: ['juramento'] } } }, texto: '{amigo.nome} aparece sem aviso, com uma sacola e os olhos fundos. Foi expulso de uma seita por uma intriga, ou escapou de uma dívida, ou perdeu alguém; não diz qual. Não pergunta se pode ficar. Só olha para você, esperando. Na mão, aperta um saquinho, e você sabe o que tem dentro: o galho do juramento.' },
      { texto: '{amigo.nome} aparece sem aviso, com uma sacola e os olhos fundos. Foi expulso de uma seita por uma intriga, ou escapou de uma dívida, ou perdeu alguém; não diz qual. Não pergunta se pode ficar. Só olha para você, esperando.' },
    ],
    opcoes: [
      { id: 'abrigar', texto: 'Abrigá-lo em casa, pelo tempo que for preciso.', res: { texto: '{amigo.nome} chora, em silêncio, durante a primeira noite. Na segunda, já está rindo de coisas que você esqueceu. Há gente que só precisa de uma porta aberta para se lembrar de quem é.', efeitos: [{ opiniao: ['amigo', 20] }, { fato: ['amigo', 'foi_abrigado', 5] }, { fio: ['amigo', 'fechar:cumprido'] }, { inclinar: ['proteger', 2] }], fx: { karma: 2, perfil: { compaixao: 2, devocao: 1 } } } },
      { id: 'pedras', texto: 'Dar o que tem, em pedras, e deixar que ele refaça a vida sozinho.', custo: 30, res: { texto: '{amigo.nome} aceita o dinheiro com um aceno curto, de quem engoliu o orgulho de uma vez. "Eu devolvo", diz. Você sabe que vai ser difícil, e que ele vai tentar mesmo assim.', efeitos: [{ opiniao: ['amigo', 12] }, { fato: ['amigo', 'recebeu_ajuda', 4] }, { fio: ['amigo', 'fechar:cumprido'] }], fx: { karma: 1, perfil: { compaixao: 1 } } } },
      { id: 'distancia', texto: 'Ajudar com um pouco de dinheiro, mas manter distância.', res: { texto: 'Ele aceita, grato e magoado, e vai embora na manhã seguinte. Ao partir, deixa um recado: "Quando precisar de mim, sabe onde procurar." Há uma distância nova entre vocês, e nenhum dos dois sabe se é prudência ou perda.', efeitos: [{ opiniao: ['amigo', 3] }, { fato: ['amigo', 'foi_ajudado_de_longe', 2] }, { fio: ['amigo', 'fechar:cumprido'] }], fx: { pedras: -10, perfil: { cautela: 1 } } } },
      { id: 'remedio', texto: 'Cuidar dele com remédios, noite após noite, até a febre ceder.', requer: { jogador: { trilha: ['alquimia'] } }, selo: 'Caminho da Alquimia', teste: { stat: ['comp', 'sor'], tag: 'alquimia' },
        sucesso: { texto: 'A febre cede na quarta noite. {amigo.nome} acorda com o rosto de quem voltou de um lugar longe, e a primeira coisa que diz, rouco, é o seu nome. O que você preparou naquela panela vale mais do que qualquer pílula que já vendeu.', efeitos: [{ opiniao: ['amigo', 25] }, { fato: ['amigo', 'foi_curado', 5] }, { fio: ['amigo', 'fechar:cumprido'] }, { inclinar: ['proteger', 2] }], fx: { karma: 2, rec: 1, perfil: { compaixao: 2 } } },
        falha: { texto: 'O remédio não funciona, e você descobre, tarde, que a doença não era dessas. {amigo.nome} sobrevive, mas a sua confiança nas suas mãos nunca volta ao que era, e a dele em você, só um pouco.', efeitos: [{ opiniao: ['amigo', 5] }, { fato: ['amigo', 'quase_morreu', 4] }], fx: { karma: 1, perfil: { compaixao: 1 } } } },
      { id: 'merito', texto: 'Recitar o sutra e transferir o mérito dele para você: assumir parte do peso.', requer: { jogador: { trilha: ['budista'] } }, selo: 'Caminho do Mérito',
        res: { texto: 'Uma noite de recitação, e o mérito passa de uma pessoa a outra, sem perdas, como chama que acende outra chama. {amigo.nome} não entende o que aconteceu, mas dorme a noite inteira pela primeira vez em meses, e você sente o peso novo nos ombros, e não o troca por nada.', efeitos: [{ opiniao: ['amigo', 20] }, { fato: ['amigo', 'recebeu_merito', 5] }, { fio: ['amigo', 'fechar:cumprido'] }, { inclinar: ['proteger', 2] }], fx: { karma: 3, rec: 1, perfil: { compaixao: 2, devocao: 1 } } } },
      { id: 'recusar', texto: 'Dizer que agora não é a hora.', res: { texto: '{amigo.nome} assente, devagar, e entende tudo de uma vez: o que fica entre os dois, o juramento esquecido, o que a distância fez. Ele guarda o galho no bolso, e vai embora sem uma palavra. Uma porta fechada tem som, e você o escuta ainda por muitos anos.', efeitos: [{ opiniao: ['amigo', -25] }, { fato: ['amigo', 'foi_recusado_na_hora_da_necessidade', 5] }, { fio: ['amigo', 'fechar:quebrado'] }], fx: { karma: -2, perfil: { cautela: 2, ganancia: 1 } } } },
    ],
  }),

  /* ---------- Mortes: cena própria e consequências ---------- */
  molde({
    id: 'morte_mestre',
    titulo: 'A Morte de {morto.nome}',
    tipo: 'consequencia',
    capitulos: ['entrada', 'ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { morto: { pessoa: { papel: 'mestre', vivo: false } } },
    quando: { papel: { morto: { semFato: ['velado'], vivo: false } } },
    cena: 'A notícia chega por um mensageiro cansado: {morto.nome}, o seu mestre, morreu, e a causa foi {morto.causa}. Você sente uma coisa estranha, que não é bem tristeza: é o chão de uma casa que você nunca percebeu que estava pisando, sumindo. Ninguém mais sabe o que ele sabia, e o que ele sabia está, agora, em você.',
    opcoes: [
      { id: 'velar', texto: 'Velar o corpo até o amanhecer.', res: { texto: 'A vigília é silenciosa, e longa. Você repassa tudo o que ele disse, e percebe que ele falava menos do que ensinava. Ao amanhecer, o mundo é o mesmo e você, não.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fato: ['morto', 'foi_velado_pelo_discipulo', 3] }, { fio: ['mestre', 'fechar:morto'] }, { reducaoTensao: 0.15 }], fx: { karma: 2, stats: { dao: 2 }, perfil: { devocao: 2, compaixao: 1 } } } },
      { id: 'continuar', texto: 'Prometer continuar o que ele começou.', res: { texto: 'Você diz a promessa em voz alta, no pátio vazio, e é uma promessa pesada: a vida de outra pessoa continuada em você. Os anos seguintes vão ter um fio a mais, e uma voz.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['mestre', 'fechar:morto'] }, { inclinar: ['ascender_seita', 1] }, { inclinar: ['proteger', 1] }, { q: ['mestre_morto', 1] }], fx: { xp: 8, rec: 1, stats: { comp: 1, dao: 1 }, perfil: { disciplina: 2 } } } },
      { id: 'partir', texto: 'Partir sem olhar para trás.', res: { texto: 'Você parte antes do sol subir. Há despedidas que só funcionam sem plateia, e você não quer ser visto chorando. A estrada tem muita gente nova, e nenhuma delas sabe quem você era ontem.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['mestre', 'fechar:morto'] }, { fato: ['morto', 'foi_abandonado_pelo_discipulo', 3] }], fx: { stats: { sor: 1 }, perfil: { cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'morte_amigo',
    titulo: 'A Morte de {morto.nome}',
    tipo: 'consequencia',
    capitulos: ['entrada', 'ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { morto: { pessoa: { papel: 'amigo', vivo: false } } },
    quando: { papel: { morto: { semFato: ['velado'], vivo: false } } },
    cena: [
      { se: { papel: { morto: { fato: ['juramento'] } } }, texto: '{morto.nome} morreu, e a causa foi {morto.causa}. Quando chega a notícia, você não diz nada. Vai ao fundo da gaveta e tira o saquinho com o galho do juramento: duas gotas de sangue já escuras. Era um juramento de meninos. Era o único que valia.' },
      { texto: '{morto.nome} morreu, e a causa foi {morto.causa}. Quando chega a notícia, você não diz nada. Há uma lista de coisas que nunca contou, e agora ela está no ar, sem destinatário. O amigo mais antigo que você teve, e você só percebeu agora.' },
    ],
    opcoes: [
      { id: 'cumprir', texto: 'Cumprir o juramento sozinho: seguir o caminho dos imortais pelos dois.', res: { texto: 'Você diz em voz alta o que prometeu aos sete anos, para o vento e para o galho. É uma promessa que só você vai ouvir, e que vai cobrar muito. O Dao, desta vez, tem uma testemunha.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fato: ['morto', 'teve_o_juramento_cumprido', 4] }, { inclinar: ['proteger', 2] }, { fio: ['amigo', 'fechar:cumprido'] }], fx: { stats: { dao: 2 }, xp: 6, perfil: { devocao: 3 } } } },
      { id: 'velar', texto: 'Ir ao enterro, e ficar até o último punhado de terra.', res: { texto: 'O enterro é pequeno, com gente que você nunca viu, e um padre cansado. Você joga o último punhado de terra, e a coisa fica menor do que parecia. Voltando para casa, entende que a dor ocupa muito menos espaço do que a falta.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['amigo', 'fechar:perdido'] }, { reducaoTensao: 0.15 }], fx: { karma: 1, perfil: { compaixao: 2 } } } },
      { id: 'vingar', texto: 'Descobrir quem foi o responsável.', res: { texto: 'A pergunta vira uma obsessão. Você passa noites seguindo nomes, bilhetes, a rota que ele fez, e os anos seguintes ganham outro rumo, mais frio, mais afiado. Uma parte sua já sabe que não vai gostar do que vai encontrar.', efeitos: [{ fato: ['morto', 'velado', 1] }, { inclinar: ['vingar_cla', 2] }, { fio: ['amigo', 'fechar:perdido'] }], fx: { stats: { dao: 1 }, perfil: { violencia: 2, astucia: 1 } } } },
    ],
  }),

  molde({
    id: 'morte_parente',
    titulo: 'A Morte de {morto.nome}',
    tipo: 'consequencia',
    capitulos: ['entrada', 'ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { morto: { pessoa: { papel: 'parente', vivo: false } }, culpado: { pessoa: { papel: 'culpado' }, opcional: true } },
    quando: { papel: { morto: { semFato: ['velado'], vivo: false } } },
    cena: '{morto.nome}, que cuidou de você desde que você se lembra, morreu: a causa foi {morto.causa}. A casa fica estranhamente grande. Nos últimos anos, {morto.nome} falava pouco do clã, mas todo mundo sabia que o clã era o que o mantinha de pé. Agora a lembrança, e o que ela cobra, é só sua.',
    opcoes: [
      { id: 'prometer', texto: 'Prometer, diante do túmulo, que o nome do clã vai voltar a valer.', res: { texto: 'A voz sai mais firme do que você esperava. O túmulo é de pedra comum, mas o juramento, dito ali, ganha um peso que nenhuma lei carrega. Você sai com os ombros mais retos e o estômago mais pesado.', efeitos: [{ fato: ['morto', 'velado', 1] }, { inclinar: ['reerguer_cla', 3] }, { fato: ['culpado', 'foi_citado_no_tumulo', 2] }], fx: { stats: { dao: 1 }, perfil: { devocao: 2, ambicao: 1 } } } },
      { id: 'cobrar', texto: 'Lembrar a {culpado.nome} que o clã ainda tem quem cobre.', requer: { papel: { culpado: { vivo: true } } }, res: { texto: 'Você manda um recado curto, sem ameaça: só um nome e uma data. {culpado.nome} entende. A conversa que virá depois não vai ser fácil, e você o preparou, de propósito, para ela.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fato: ['culpado', 'recebeu_o_recado_do_tumulo', 3] }, { opiniao: ['culpado', -8] }, { inclinar: ['vingar_cla', 3] }], fx: { perfil: { violencia: 1, ambicao: 1 } } } },
      { id: 'deixar', texto: 'Deixar a casa para trás: nada a segura mais.', res: { texto: 'Você fecha a porta devagar, como se fechasse uma conversa. A casa continua de pé, sem ninguém, e você aprende a medir o futuro em estradas, não em pátios.', efeitos: [{ fato: ['morto', 'velado', 1] }, { inclinar: ['reerguer_cla', -2] }], fx: { stats: { sor: 1 }, perfil: { cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'morte_rival',
    titulo: 'A Morte de {morto.nome}',
    tipo: 'consequencia',
    capitulos: ['entrada', 'ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { morto: { pessoa: { papel: 'rival', vivo: false } } },
    quando: { papel: { morto: { semFato: ['velado', 'foi_morto_pelo_jogador'], vivo: false } } },
    cena: '{morto.nome} morreu, e a causa foi {morto.causa}. O rival de toda a sua vida, que subiu de reino enquanto você subia, que olhava para você com desprezo e com inveja ao mesmo tempo, não está mais em lugar nenhum. Você esperava sentir alívio. O que sente é o silêncio de uma pergunta que nunca vai ter resposta.',
    opcoes: [
      { id: 'honrar', texto: 'Ir ao funeral, e honrar a coragem dele.', res: { texto: 'O funeral é pequeno, e poucos acreditam que você vá. Mas você vai, e fica, e quando vai embora, uma velha, que deve ter sido a mãe, aperta a sua mão sem dizer nada. Há inimizades que só se fecham com o último respeito.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['rival', 'fechar:morto'] }, { reducaoTensao: 0.15 }], fx: { karma: 2, stats: { dao: 1 }, perfil: { compaixao: 1, devocao: 1 } } } },
      { id: 'alivio', texto: 'Sentir alívio, e não fingir o contrário.', res: { texto: 'Você respira fundo, e o ar sai com um peso que você carregava havia anos. Talvez seja só isso: a rivalidade acabou, e com ela, uma parte do que você era. Esse alívio é verdadeiro, e vem com uma conta que você ainda não sabe pagar.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['rival', 'fechar:morto'] }], fx: { stats: { dao: 1 }, perfil: { ambicao: 1, cautela: 1 } } } },
    ],
  }),

  molde({
    id: 'morte_culpado',
    titulo: 'A Morte de {morto.nome}',
    tipo: 'consequencia',
    capitulos: ['entrada', 'ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { morto: { pessoa: { papel: 'culpado', vivo: false } } },
    quando: { papel: { morto: { semFato: ['velado', 'foi_morto_pelo_jogador'], vivo: false } }, fio: { cla: { aberto: true } } },
    relevancia: [{ se: { ambicao: { atual: ['reerguer_cla', 'vingar_cla'] } }, mais: 40 }],
    cena: '{morto.nome}, o homem que o seu clã passou a vida jurando alcançar, morreu: a causa foi {morto.causa}. Você ouve a notícia num mercado, no meio de uma conversa sobre preço de arroz, e a mão que segura a cumbuca não treme. Ele morreu antes de pagar, antes de explicar, antes de qualquer coisa. Nenhum acerto de contas é possível. A raiva, de repente, não tem para onde ir.',
    opcoes: [
      { id: 'aceitar', texto: 'Aceitar que a conta se fechou sem você.', requer: { ambicao: { atual: ['reerguer_cla', 'vingar_cla'] } }, res: { texto: 'O nome dele fica na lista de mortos, e o clã continua devendo a si mesmo. Você sente o chão se mexer: a ambição que o movia perde o alvo, e você precisa decidir, de novo, quem é.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['cla', 'fechar:perdido'] }, { ambicao: 'abandonada' }, { inclinar: ['proteger', 2] }], fx: { stats: { dao: 1 }, perfil: { cautela: 1, devocao: 1 } } } },
      { id: 'aceitar2', texto: 'Aceitar que a conta se fechou sem você.', requer: { nao: { ambicao: { atual: ['reerguer_cla', 'vingar_cla'] } } }, res: { texto: 'O nome dele fica na lista de mortos. A dívida que o clã carregava fica pairando, sem credor, e o que sobra é um nome, e o que se faz com ele.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['cla', 'fechar:perdido'] }], fx: { stats: { dao: 1 }, perfil: { cautela: 1 } } } },
      { id: 'tumulo', texto: 'Ir ao túmulo dele, e dizer em voz alta tudo o que sempre quis dizer.', res: { texto: 'O túmulo é pequeno, e o ar, parado. Você fala por muito tempo, sozinho, e cada frase parece menor do que quando só existia na sua cabeça. Quando acaba, nada mudou, e alguma coisa se aliviou. É a única vingança que sobrou.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['cla', 'fechar:perdido'] }, { reducaoTensao: 0.15 }], fx: { karma: 1, stats: { dao: 1 }, perfil: { compaixao: 1, disciplina: 1 } } } },
    ],
  }),

  /* ---------- O mundo reage ao rompimento ---------- */
  molde({
    id: 'reacao_rompimento',
    titulo: 'O Mundo Olha',
    tipo: 'consequencia',
    capitulos: ['entrada', 'ascensao', 'crise', 'legado'],
    cooldown: 3,
    papeis: {
      seita: { faccao: { local: true }, opcional: true },
      rival: { pessoa: { papel: 'rival', vivo: true }, opcional: true },
      mestre: { pessoa: { papel: 'mestre', vivo: true }, opcional: true },
    },
    quando: { q: { reacao: [1, undefined] } },
    relevancia: [{ se: { q: { reacao: [1, undefined] } }, mais: 80 }],
    cena: [
      { se: { papel: { rival: { vivo: true, reinoDif: [1, 9] } } }, texto: 'Você rompeu para {jogador.reino}, e o mundo percebe antes de você. Na {seita.nome}, as conversas diminuem quando você passa. {rival.nome} para na sua frente, olhando um ponto acima do seu ombro. "{rival.trato}", diz, e a palavra sai como quem engole uma pedra. Foi a primeira vez que ele precisou escolher como te chamar.' },
      { se: { papel: { rival: { vivo: true, reinoDif: [-9, 0] } } }, texto: 'Você rompeu para {jogador.reino}, mas {rival.nome} chegou antes, e isso muda o tom de tudo. No pátio da {seita.nome}, ele para na sua frente e sorri, como quem recebe um novato. "{rival.trato}", diz, com a leveza de quem sabe onde está. Algumas pessoas percebem, outras escolhem não perceber.' },
      { texto: 'Você rompeu para {jogador.reino}, e o mundo percebe antes de você. As pessoas que o cumprimentavam de igual passam a baixar a voz; as que o ignoravam passam a lembrar do seu nome. Cada olhar que cruza o seu tem um cálculo novo por trás.' },
    ],
    opcoes: [
      { id: 'humilde', texto: 'Responder com humildade, como se nada tivesse mudado.', res: { texto: 'Você agradece, repete o nome de cada um, pergunta pela família de quem pergunta pela sua. A seita se acalma, e o seu nome, em voz baixa, ganha uma palavra que ele não tinha: confiável.', efeitos: [{ opiniao: ['rival', 4] }, { opiniao: ['mestre', 5] }, { reputacao: ['seita', 5] }, { q: ['reacao', -1] }], fx: { karma: 1, perfil: { compaixao: 1, disciplina: 1 } } } },
      { id: 'orgulho', texto: 'Aceitar o novo tratamento com a cabeça erguida.', res: { texto: 'Você assente, de leve, e deixa que o silêncio faça o resto. Há quem aprecie, há quem se ofenda, e há, sempre, quem tome nota. O mundo aprende como tratar você, e você aprende a gostar disso mais do que devia.', efeitos: [{ opiniao: ['rival', -8] }, { opiniao: ['mestre', -3] }, { reputacao: ['seita', 2] }, { q: ['reacao', -1] }], fx: { fama: 3, perfil: { ambicao: 2 } } } },
      { id: 'silencio', texto: 'Não dizer nada, e seguir o caminho.', res: { texto: 'Você atravessa o pátio sem olhar para os lados. O silêncio é a melhor resposta, e a pior também: cada um interpreta como quer, e a lenda cresce nos cantos sem precisar de você.', efeitos: [{ q: ['reacao', -1] }], fx: { fama: 1, stats: { dao: 1 }, perfil: { cautela: 1 } } } },
    ],
  }),

  /* ---------- Viradas: a ambição é forjada pela vida ---------- */
  molde({
    id: 'virada_reerguer',
    titulo: 'O Que Você Decidiu',
    tipo: 'virada',
    capitulos: ['infancia', 'despertar', 'entrada', 'ascensao'],
    cooldown: 8,
    papeis: { culpado: { pessoa: { papel: 'culpado' } }, faccao: { faccao: { ferida: true } }, parente: { pessoa: { papel: 'parente', vivo: true }, opcional: true } },
    quando: { ambicao: { sem: true, dominante: 'reerguer_cla', inclinacaoMin: ['reerguer_cla', 0] }, jogador: { idadeMin: 12 } },
    relevancia: [{ se: { ambicao: { sem: true } }, mais: 90 }],
    cena: [
      { se: { papel: { culpado: { fato: ['ouviu_juramento'] } } }, texto: 'Você vai à janela e repete, devagar, a frase que disse de pé na porta, aos sete anos, quando {culpado.nome} riu. Era um juramento de criança. Os anos o foram polindo até virar outra coisa: uma direção. Você entende que nunca parou de cumpri-lo, e que, de agora em diante, vai fazer isso de olhos abertos: reerguer o nome do clã.' },
      { texto: 'Foi num dia comum, sem trovão, que a coisa ficou nítida. A {faccao.nome}, {culpado.nome}, o cofre vazio, o livro de contas: cada fragmento dos últimos anos apontava para a mesma direção, e você, sem perceber, andava nela. Você entende que não vai fugir do nome que carrega: vai reerguê-lo.' },
    ],
    opcoes: [
      { id: 'aceitar', texto: 'Aceitar: reerguer o nome do clã.', res: { texto: 'Dizer a frase em voz alta muda o peso dela. Algumas decisões não mudam o mundo, só quem as toma. Os anos seguintes ganham um centro, e cada escolha, uma pergunta nova: isto me aproxima, ou me afasta?', efeitos: [{ ambicao: 'nomear:reerguer_cla' }, { opiniao: ['parente', 8] }, { fato: ['parente', 'soube_da_ambicao', 3] }], fx: { stats: { dao: 1 }, perfil: { disciplina: 1, devocao: 1 } } } },
      { id: 'adiar', texto: 'Ainda não sei se é isso.', res: { texto: 'Você deixa a frase suspensa, sem terminar. A decisão fica no ar, e você, sem pressa, continua vivendo. Algumas coisas amadurecem melhor quando não se apressa a colheita.', efeitos: [{ ambicao: 'adiar' }], fx: { perfil: { cautela: 1 } } } },
      { id: 'nao', texto: 'Isso é só raiva. Não é o meu caminho.', res: { texto: 'Você sacode a cabeça e sai da janela. O que parecia destino era só reflexo, e você decide, por um momento, que sua vida não é feita do que lhe fizeram. A pergunta, porém, não vai embora; só fica quieta.', efeitos: [{ inclinar: ['reerguer_cla', -4] }, { ambicao: 'adiar' }], fx: { stats: { dao: 1 }, perfil: { cautela: 1 } } } },
    ],
  }),

  molde({
    id: 'virada_vingar',
    titulo: 'O Que Você Decidiu',
    tipo: 'virada',
    capitulos: ['infancia', 'despertar', 'entrada', 'ascensao'],
    cooldown: 8,
    papeis: { culpado: { pessoa: { papel: 'culpado' } }, faccao: { faccao: { ferida: true } } },
    quando: { ambicao: { sem: true, dominante: 'vingar_cla', inclinacaoMin: ['vingar_cla', 0] }, jogador: { idadeMin: 12 } },
    relevancia: [{ se: { ambicao: { sem: true } }, mais: 90 }],
    cena: [
      { se: { papel: { culpado: { fato: ['foi_gravado'] } } }, texto: 'Você fecha os olhos e vê tudo: a voz, o anel, o casaco bom de {culpado.nome}. Nunca deixou de ver. A memória que você guardou, aos sete anos, não era só memória, era um endereço. Você entende, sem nenhuma pressa e sem nenhuma dúvida, o que vai fazer: fazer {culpado.nome} pagar.' },
      { texto: 'Foi num dia comum que a coisa ficou nítida. Cada vez que o nome de {culpado.nome} aparecia, algo dentro de você se endireitava, como quem ouve uma convocação. Você entende, sem pressa e sem dúvida, o que isso significa: vai fazer {culpado.nome} pagar o que fez ao clã.' },
    ],
    opcoes: [
      { id: 'aceitar', texto: 'Aceitar: fazer o culpado pagar.', res: { texto: 'Dizer isso em voz alta é mais perigoso do que pensar. Uma ambição como essa não é um plano, é uma maneira de ver o mundo. Os anos seguintes passam a ter um alvo, e você, sem perceber, uma sombra.', efeitos: [{ ambicao: 'nomear:vingar_cla' }, { fato: ['culpado', 'foi_escolhido_como_alvo', 3] }], fx: { stats: { dao: 1 }, perfil: { violencia: 1, ambicao: 1 } } } },
      { id: 'adiar', texto: 'Ainda não sei se é isso.', res: { texto: 'A ideia continua aí, como uma faca guardada na gaveta. Você a deixa quieta, por enquanto, e vai tomar chá. Algumas decisões esperam bem quando não se mexe nelas.', efeitos: [{ ambicao: 'adiar' }], fx: { perfil: { cautela: 1 } } } },
      { id: 'nao', texto: 'Isso é só raiva. Não é quem eu quero ser.', res: { texto: 'Você solta o ar devagar, e o aperto no peito afrouxa um pouco. Há ódios que a gente carrega por obrigação, e que um dia a gente decide soltar. Ainda não é hoje, mas a decisão de querer soltar já é um começo.', efeitos: [{ inclinar: ['vingar_cla', -4] }, { ambicao: 'adiar' }], fx: { karma: 1, perfil: { compaixao: 1 } } } },
    ],
  }),

  molde({
    id: 'virada_superar',
    titulo: 'O Que Você Decidiu',
    tipo: 'virada',
    capitulos: ['despertar', 'entrada', 'ascensao'],
    cooldown: 8,
    papeis: { rival: { pessoa: { papel: 'rival', vivo: true } } },
    quando: { ambicao: { sem: true, dominante: 'superar_rival', inclinacaoMin: ['superar_rival', 0] }, jogador: { idadeMin: 12 } },
    relevancia: [{ se: { ambicao: { sem: true } }, mais: 80 }],
    cena: 'Na hora de dormir, você percebe uma coisa estranha: toda vez que treina, está treinando contra {rival.nome}. Não contra o mundo, não contra o céu. Contra um rosto, uma voz, um tom. Você pensa em quanto da sua vida já foi gasto assim, e se pergunta se ainda poderia parar. Não consegue. Por mais que tente fugir da ideia, a conclusão chega inteira: você quer superar {rival.nome}.',
    opcoes: [
      { id: 'aceitar', texto: 'Aceitar: superar {rival.nome}.', res: { texto: 'Você diz o nome dele em voz alta, uma vez, só para ouvir. Não é ódio: é uma régua. Os dias seguintes passam a ter uma medida, e você, sem querer, o hábito de olhar para trás.', efeitos: [{ ambicao: 'nomear:superar_rival' }, { fato: ['rival', 'foi_escolhido_como_regua', 3] }], fx: { stats: { dao: 1 }, perfil: { ambicao: 2, disciplina: 1 } } } },
      { id: 'adiar', texto: 'Ainda não sei se é isso.', res: { texto: 'A ideia de ter um rival como régua é desconfortável, e você a deixa de lado, por enquanto. Alguma coisa dentro de você já sabe que vai voltar a ela, e que será pior.', efeitos: [{ ambicao: 'adiar' }], fx: { perfil: { cautela: 1 } } } },
      { id: 'nao', texto: 'Eu não vou viver para ser maior que alguém.', res: { texto: 'Você solta o ar, e tenta pensar em outra coisa, qualquer coisa. Não é fácil, mas é uma decisão. Treinar contra o céu, contra o próprio limite, contra a idade: qualquer coisa serve, menos um rosto.', efeitos: [{ inclinar: ['superar_rival', -4] }, { ambicao: 'adiar' }], fx: { karma: 1, stats: { dao: 1 }, perfil: { disciplina: 1 } } } },
    ],
  }),

  molde({
    id: 'virada_ascender',
    titulo: 'O Que Você Decidiu',
    tipo: 'virada',
    capitulos: ['entrada', 'ascensao'],
    cooldown: 8,
    papeis: { seita: { faccao: { local: true } } },
    quando: { ambicao: { sem: true, dominante: 'ascender_seita', inclinacaoMin: ['ascender_seita', 0] }, jogador: { flag: ['membro_seita'] } },
    relevancia: [{ se: { ambicao: { sem: true } }, mais: 80 }],
    cena: 'Uma noite, no alto do pátio da {seita.nome}, você olha para o pavilhão dos anciões, aceso, e percebe que não consegue desviar os olhos. Ali se decidem coisas: quem entra, quem sai, quem vive. Você nunca disse em voz alta o que quer, mas a verdade está inteira nos seus olhos: você quer estar lá dentro, quando a luz se acender de novo.',
    opcoes: [
      { id: 'aceitar', texto: 'Aceitar: chegar ao topo da seita.', res: { texto: 'Você diz a frase em voz baixa, e o pátio não responde. Mas algo muda no jeito como você varre, como você treina, como você escuta. Cada pequena tarefa passa a ter um degrau a mais, e você sabe exatamente quantos faltam.', efeitos: [{ ambicao: 'nomear:ascender_seita' }, { reputacao: ['seita', 2] }], fx: { stats: { dao: 1 }, perfil: { ambicao: 2, disciplina: 1 } } } },
      { id: 'adiar', texto: 'Ainda não sei se é isso.', res: { texto: 'Você desvia os olhos do pavilhão e volta ao trabalho. A luz continua acesa, e você sabe que ela vai estar lá amanhã. Algumas vontades esperam bem quando a gente tem pressa de outras coisas.', efeitos: [{ ambicao: 'adiar' }], fx: { perfil: { cautela: 1 } } } },
      { id: 'nao', texto: 'Poder numa seita não é o que eu procuro.', res: { texto: 'Você respira fundo, e a luz do pavilhão fica menor. Quem busca o topo nem sempre sabe o que vai encontrar lá, e você prefere descobrir isso de longe. A estrada, de repente, parece mais larga.', efeitos: [{ inclinar: ['ascender_seita', -4] }, { ambicao: 'adiar' }], fx: { karma: 1, stats: { dao: 1 }, perfil: { devocao: 1 } } } },
    ],
  }),

  molde({
    id: 'troca_ambicao',
    titulo: 'O Que Mudou Dentro de Você',
    tipo: 'virada',
    capitulos: ['ascensao', 'crise', 'legado'],
    cooldown: 20,
    papeis: { parente: { pessoa: { papel: 'parente', vivo: true }, opcional: true } },
    quando: { ambicao: { trocaPossivel: true } },
    relevancia: [{ se: { ambicao: { trocaPossivel: true } }, mais: 70 }],
    cena: 'Algo mudou, e você demora a perceber o quê. Aquilo que, anos atrás, parecia o centro da sua vida já não pesa do mesmo jeito, e outra coisa, antes menor, ocupa o espaço com um peso que não pediu. Você não sabe se isso é cansaço ou descoberta. Só sabe que, se fingir que nada mudou, vai viver a vida de outra pessoa, e que, se aceitar, vai ter de dizer adeus a alguém que você era.',
    opcoes: [
      { id: 'mudar', texto: 'Aceitar a mudança, e seguir o novo rumo.', res: { texto: 'Dizer adeus ao antigo propósito dói menos do que você esperava, e mais do que gostaria de admitir. Alguns notam, outros não, e há quem leve a mudança para o lado pessoal. Mas a vida, de repente, tem outra direção, e você respira mais fundo.', efeitos: [{ ambicao: 'trocar:auto' }, { opiniao: ['parente', -4] }, { fato: ['parente', 'viu_o_jogador_mudar_de_rumo', 3] }], fx: { stats: { dao: 1 }, perfil: { cautela: 1 } } } },
      { id: 'manter', texto: 'Manter o que jurei, mesmo com o peso mudado.', res: { texto: 'Você aperta os dentes e escolhe ficar. Não por convicção, e sim por lealdade ao que foi dito um dia, em outra voz. Há um valor secreto em cumprir o que foi prometido quando já ninguém lembra, e você o sente, devagar, como um calor de brasa.', efeitos: [{ ambicao: 'adiar' }], fx: { karma: 1, stats: { dao: 2 }, perfil: { disciplina: 2, devocao: 1 } } } },
    ],
  }),
];
