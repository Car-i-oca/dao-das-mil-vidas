import { molde, type Molde } from '../../../../../engine/v2/tipos';

/**
 * Arco Companheiro do Dao (fio `companheiro`): parceria e afeto sem erotismo, e o conflito de duas pessoas
 * que cultivam caminhos diferentes. Do encontro à escolha final: juntos, separados, ou o preço de um sacrifício.
 */
const PAR = { par: { pessoa: { papel: 'companheiro', vivo: true } } } as const;

export const COMPANHEIRO: Molde[] = [
  molde({
    id: 'comp_encontro',
    titulo: 'Alguém no Mesmo Passo',
    tipo: 'personagem',
    capitulos: ['entrada', 'ascensao'],
    unico: true,
    papeis: { par: { pessoa: { novo: true, criar: { traco: ['curioso', 'generoso', 'leal'], reino: 'jogador', objetivo: 'viver' } } }, cidade: { lugar: { tipo: ['mercado', 'praca', 'ponte', 'porto'] } } },
    quando: { jogador: { idadeMin: 16, reinoMin: 1 } },
    relevancia: [{ se: { jogador: { talento: ['carisma_nato', 'sorte_destino'] } }, mais: 20 }, { se: { ambicao: { sem: true } }, mais: 10 }],
    fio: { id: 'companheiro', abre: true, abandono: 'Cada um seguiu o seu caminho, e a pergunta de como seria ficou onde estava: sem resposta, e sem raiva.' },
    cena: [
      { se: { diretor: { contador: ['sombria'] } }, texto: 'Na {cidade.nome}, {par.um} {par.jovem} de capa molhada para ao seu lado sob o mesmo beiral. Passa um tempo sem que nenhum dos dois fale. Depois {par.nome} diz, sem olhar: "Eu estava seguindo você desde o rio. Não por mal. Quero saber como é andar tão sem medo."' },
      { texto: 'Na {cidade.nome}, a mesma barraca de chá, o mesmo balcão, e alguém de olhos atentos que repara no seu jeito de respirar. {par.nome} se apresenta com a franqueza de quem não tem nada a esconder. Fala de um caminho próprio, de um mestre ausente, de uma cidade onde ninguém olhou duas vezes. Ri de uma coisa que você disse sem querer.' },
    ],
    opcoes: [
      { id: 'conversar', texto: 'Ficar e conversar, sem pressa.',
        res: { texto: 'A tarde vira noite, e a noite vira madrugada. Quando {par.nome} se despede, não promete voltar; diz apenas onde dorme, como quem deixa uma porta encostada. Você sai com o peito mais leve do que entrou.', efeitos: [{ papel: ['par', 'companheiro'] }, { opiniao: ['par', 16] }, { fato: ['par', 'conversou_madrugada', 3] }], fx: { karma: 1, perfil: { compaixao: 1, devocao: 1 } } } },
      { id: 'treinar', texto: 'Propor um treino leve, só para ver o que {par.ele} sabe.', teste: { stat: ['fis', 'car'], dif: 0 },
        sucesso: { texto: 'Em dez minutos vocês ficam sem fôlego e sem pose. {par.nome} perde por um fio, ri, e pede revanche para o dia seguinte. Algumas amizades começam com um golpe aparado.', efeitos: [{ papel: ['par', 'companheiro'] }, { opiniao: ['par', 14] }, { fato: ['par', 'treinou_com_o_jogador', 3] }], fx: { fama: 1, perfil: { violencia: 1, ambicao: 1 } } },
        falha: { texto: 'Você perde com mais estardalhaço do que gostaria, e {par.nome} ajuda a levantar sem rir, o que é pior e melhor. "De novo amanhã", diz. A vergonha dura um dia; a vontade de revanche, uma vida.', efeitos: [{ papel: ['par', 'companheiro'] }, { opiniao: ['par', 8] }, { fato: ['par', 'venceu_o_jogador', 2] }], fx: { perfil: { disciplina: 1 } } } },
      { id: 'cautela', texto: 'Ficar cauteloso: ninguém é tão franco por acaso.',
        res: { texto: 'Você responde meio de lado, e {par.nome} entende, sem se ofender. "Sensato", diz. Deixa o recado de onde está hospedad{par.o}, e se afasta sem pressa. Há conhecidos que a vida força, e conhecidos que a vida oferece de novo, caso você sobreviva a si mesmo.', efeitos: [{ papel: ['par', 'companheiro'] }, { opiniao: ['par', 3] }, { fato: ['par', 'foi_tratado_com_cautela', 2] }], fx: { perfil: { cautela: 2, astucia: 1 } } } },
    ],
  }),

  molde({
    id: 'comp_viagem',
    titulo: 'A Estrada Para Dois',
    tipo: 'preparo',
    capitulos: ['entrada', 'ascensao'],
    unico: true,
    papeis: { ...PAR },
    quando: { jogador: { reinoMin: 1 }, papel: { par: { vivo: true, opiniaoMin: 0 } } },
    relevancia: [{ se: { papel: { par: { opiniaoMin: 25 } } }, mais: 25 }],
    fio: { id: 'companheiro', etapa: 2, abandono: 'A viagem que {par.nome} propôs nunca saiu da conversa.' },
    cena: [
      { se: { papel: { par: { opiniaoMin: 25 } } }, texto: '{par.nome} vem até a sua porta com um mapa dobrado e um sorriso de quem já decidiu. Há uma passagem de montanha, um templo antigo, uma feira de manuais raros. "Vamos juntos. Se for perigoso, melhor com companhia. Se for tedioso, melhor com conversa."' },
      { texto: '{par.nome} sugere uma viagem curta: uma semana, um vale, um mercado. Não diz o motivo, e você percebe que o motivo é a companhia. Há pedidos que não cabem em palavras, e este cabe em uma mochila arrumada.' },
    ],
    opcoes: [
      { id: 'ir', texto: 'Ir, e deixar a estrada decidir o resto.', teste: { stat: ['sor', 'esp'], dif: 0 },
        sucesso: { texto: 'A semana vira três. Vocês dividem a pouca comida, discutem a direção, aprendem os silêncios um do outro. Numa noite de chuva, {par.nome} diz algo que nunca disse a ninguém, e você escuta sem tentar consertar. Voltam mais próximos e mais cansados, e com o mapa riscado de rotas que só os dois conhecem.', efeitos: [{ opiniao: ['par', 18] }, { fato: ['par', 'viajou_com_o_jogador', 4] }, { inclinar: ['proteger', 2] }], fx: { karma: 2, xp: 14, perfil: { compaixao: 2, devocao: 1 } } },
        falha: { texto: 'Chove em todos os dias que importam, o vale está interditado, e a feira acabou na véspera. Brigam por bobagem, e fazem as pazes pior ainda. {par.nome} volta calad{par.o}, e você suspeita que a viagem teria dado certo com outra pessoa, ou outro mundo.', efeitos: [{ opiniao: ['par', -4] }, { fato: ['par', 'viagem_ruim', 2] }], fx: { perfil: { cautela: 1 } } } },
      { id: 'adiar', texto: 'Adiar: ainda há muito a fazer antes.',
        res: { texto: '{par.nome} guarda o mapa sem comentar. A viagem acontece, mas sem você, e as histórias que volta contando são de um mundo que você não viu. Há distâncias que se medem em estradas, e outras em convites recusados.', efeitos: [{ opiniao: ['par', -8] }, { fato: ['par', 'foi_adiado', 3] }], fx: { perfil: { ambicao: 1, disciplina: 1 } } } },
    ],
  }),

  molde({
    id: 'comp_conflito',
    titulo: 'Dois Caminhos',
    tipo: 'personagem',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...PAR },
    quando: { jogador: { reinoMin: 2 }, papel: { par: { vivo: true } } },
    relevancia: [{ se: { papel: { par: { opiniaoMin: 20 } } }, mais: 30 }],
    fio: { id: 'companheiro', etapa: 3, abandono: 'A conversa sobre os caminhos nunca aconteceu, e cada um seguiu o seu sem dizer adeus.' },
    cena: [
      { se: { papel: { par: { opiniaoMin: 20 } } }, texto: 'Uma noite {par.nome} diz, sem rodeios, o que andava engolindo: o caminho dos dois está se afastando. O seu cultivo pede uma coisa, o de {par.nome} pede outra, e cada avanço de um é uma pequena derrota do outro. "Não quero perder você. Mas também não quero me perder."' },
      { texto: '{par.nome} traz uma notícia: um mestre, uma seita, uma chance que exige partir. Fala em tom de quem já ensaiou. "Não peço que venha. Não peço que fique. Peço que a gente decida juntos, e não por omissão."' },
    ],
    opcoes: [
      { id: 'acompanhar', texto: 'Acompanhar {par.nome}, mesmo mudando de rumo.', requer: { papel: { par: { opiniaoMin: 15 } } },
        res: { texto: 'Você muda de rota, de seita, de método. Perde meses do que sabia e ganha anos do que ainda não sabia. {par.nome} não agradece em voz alta, mas na primeira manhã, deixa uma tigela de chá do seu lado da cama, e é toda a resposta que você pediria.', efeitos: [{ opiniao: ['par', 20] }, { fato: ['par', 'foi_seguido_pelo_jogador', 5] }, { inclinar: ['proteger', 3] }], fx: { karma: 2, perfil: { devocao: 3 } } } },
      { id: 'manter', texto: 'Manter o seu caminho, e pedir que {par.nome} respeite a escolha.', teste: { stat: ['car', 'dao'], dif: 1 },
        sucesso: { texto: '{par.nome} escuta, abaixa a cabeça, e diz: "Então vamos separados, mas não distantes." Vocês combinam cartas, dias e lugares. É menos do que ambos queriam e mais do que a maioria consegue, e a distância passa a ser uma forma de companhia.', efeitos: [{ opiniao: ['par', 8] }, { fato: ['par', 'aceitou_a_distancia', 4] }], fx: { karma: 1, perfil: { disciplina: 2 } } },
        falha: { texto: 'A frase sai mais fria do que você queria, e {par.nome} escuta como quem recebe uma sentença. Vai embora sem bater a porta. Nos meses seguintes, as cartas chegam mais curtas, depois mais raras, depois deixam de chegar.', efeitos: [{ opiniao: ['par', -20] }, { fato: ['par', 'foi_deixado_para_tras', 5] }, { situacao: ['par', 'partiu'] }], fx: { perfil: { ambicao: 2 } } } },
      { id: 'meio', texto: 'Propor um meio-termo: um ano de cada vez, e depois decidir de novo.', requer: { papel: { par: { opiniaoMin: 0 } } },
        res: { texto: '{par.nome} ri, e parece mais jovem. "Isso é o que todos dizem antes de cada uma das decisões difíceis." Mas aceita. Os anos têm outro ritmo depois disso: planejados em meses, vividos em dias, sem ilusão de que será fácil.', efeitos: [{ opiniao: ['par', 10] }, { fato: ['par', 'aceitou_o_meio_termo', 3] }], fx: { perfil: { astucia: 1, compaixao: 1 } } } },
    ],
  }),

  molde({
    id: 'comp_perigo',
    titulo: '{par.nome} em Perigo',
    tipo: 'perigo',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...PAR, culto: { faccao: { tipo: ['culto', 'seita'], estado: ['paz', 'tensao', 'guerra'] } } },
    quando: { jogador: { reinoMin: 2 }, papel: { par: { vivo: true, opiniaoMin: 5 } } },
    relevancia: [{ se: { fio: { companheiro: { etapaMin: 3 } } }, mais: 35 }],
    combate: { oponente: 'assassino', cenario: 'floresta' },
    fio: { id: 'companheiro', etapa: 4, abandono: 'O perigo passou por {par.nome} sem que você soubesse, e a pessoa aprendeu a não esperar socorro.' },
    cena: 'Um bilhete sem assinatura chega na madrugada: {par.nome} foi levad{par.o} pela {culto.nome}, que acredita ter um motivo e uma moeda. O endereço é de um armazém à beira do rio. Quem escreveu o bilhete quer que você vá sozinh{jogador.o}, e isso, por si só, diz tudo.',
    opcoes: [
      { id: 'atacar', texto: 'Ir atrás, de frente, sem esperar ninguém.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 3 },
        sucesso: { texto: 'A porta cede, e o armazém explode em ruído. Você sai com {par.nome} apoiad{par.o} no ombro, e atrás de vocês fica o cheiro de óleo e de promessas quebradas. Na estrada, {par.nome} diz, com a voz rouca: "Eu sabia que você viria." É a coisa mais bonita e mais injusta que alguém já lhe disse.', efeitos: [{ opiniao: ['par', 24] }, { fato: ['par', 'foi_resgatado_pelo_jogador', 5] }, { reputacao: ['culto', -10] }], fx: { fama: 3, xp: 20, perfil: { violencia: 1, devocao: 2 } } },
        falha: { texto: 'Você chega tarde e mal. Quando consegue entrar, {par.nome} já se soltou sozinh{par.o}, e te espera do outro lado, com o rosto marcado e um olhar que não sabe se agradece ou se cobra. Escapam os dois, por pouco, e nada fica como antes.', efeitos: [{ opiniao: ['par', 6] }, { fato: ['par', 'se_salvou_sozinho', 4] }], fx: { ferida: 3, perfil: { disciplina: 1 } } } },
      { id: 'astucia', texto: 'Planejar: vigiar o armazém, esperar a troca de guarda, entrar de noite.', teste: { stat: ['comp', 'sor'], dif: 1 },
        sucesso: { texto: 'Dois dias de espera, um cadeado aberto com um fio de bambu, e os guardas dormindo sentados. Vocês saem sem sangue, e {par.nome} só entende o que aconteceu quando já está longe. "Você devia ser ladrão", diz, rindo e chorando. Você finge que não é elogio.', efeitos: [{ opiniao: ['par', 20] }, { fato: ['par', 'foi_resgatado_com_astucia', 5] }], fx: { fama: 2, xp: 16, perfil: { astucia: 3 } } },
        falha: { texto: 'Dois dias é tempo demais. Quando você entra, o armazém está vazio, e há apenas uma folha dobrada no chão: um novo endereço. A caça continua, e {par.nome} passa a ser, para você, uma ferida que ainda sangra.', efeitos: [{ opiniao: ['par', -6] }, { fato: ['par', 'foi_levado_alem', 3] }], fx: { perfil: { cautela: 1 } } } },
      { id: 'negociar', texto: 'Oferecer ao grupo o que for pedido em troca de {par.ele}.', custo: 200,
        res: { texto: 'A troca é feita em silêncio, num cais, entre pessoas que se odeiam em voz baixa. {par.nome} volta inteir{par.o}, sem acreditar. Você vê no seu rosto o que o dinheiro nunca compra: uma gratidão que dói de tão grande, e uma dívida que não se paga em moeda.', efeitos: [{ opiniao: ['par', 22] }, { fato: ['par', 'foi_comprado_de_volta', 5] }, { reputacao: ['culto', 8] }], fx: { karma: 2, perfil: { devocao: 2 } } } },
    ],
  }),

  molde({
    id: 'comp_escolha',
    titulo: 'O Juramento de {par.nome}',
    tipo: 'climax',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { ...PAR },
    quando: { jogador: { reinoMin: 3 }, papel: { par: { vivo: true } } },
    relevancia: [{ se: { papel: { par: { opiniaoMin: 40 } } }, mais: 40 }, { se: { fio: { companheiro: { etapaMin: 3 } } }, mais: 25 }],
    fio: { id: 'companheiro', etapa: 5, abandono: 'O juramento nunca foi feito, e ficaram dois bons cultivadores que sabiam, sem dizer, o que poderia ter sido.' },
    cena: [
      { se: { papel: { par: { opiniaoMin: 40 } } }, texto: 'No alto de uma colina ao pôr do sol, {par.nome} segura as suas mãos. "Aqui", diz, "dois cultivadores às vezes fazem um juramento de Dao: caminhar lado a lado, dividir a tribulação, compartilhar a vida inteira. Não é casamento, não é seita, é uma aposta. Quero apostar com você, se quiser."' },
      { se: { papel: { par: { opiniaoMax: 15 } } }, texto: '{par.nome} vem até você uma última vez, sem pressa nem raiva. "Não vim cobrar nada. Vim saber se aquilo que fomos ainda tem lugar no mundo. Se não tiver, eu parto, e não volto a perguntar."' },
      { texto: '{par.nome} traz uma proposta que cabe numa frase: caminhar juntos pelo resto do que há. Ou escolher outro rumo, em paz. O olhar é calmo, mas as mãos tremem.' },
    ],
    opcoes: [
      { id: 'jurar', texto: 'Fazer o juramento de Dao, e dividir o caminho.', requer: { papel: { par: { opiniaoMin: 25 } } },
        res: { texto: 'As palavras saem mais simples do que o rito pedia. O juramento é feito sob uma árvore que ninguém plantou, diante de uma lua que ninguém convidou. Daí em diante a tribulação de um é a dos dois, e o que sobra de cada vida é maior do que a soma.', efeitos: [{ opiniao: ['par', 25] }, { fato: ['par', 'jurou_com_o_jogador', 5] }, { fio: ['companheiro', 'fechar:unidos'] }, { noticia: 'Dizem que dois cultivadores fizeram o juramento de Dao sob a lua, e que a montanha não gritou.' }], fx: { karma: 5, fama: 2, xp: 30, perfil: { devocao: 3, compaixao: 2 } } } },
      { id: 'separar', texto: 'Dizer que seus caminhos são bons, mas separados, e despedir-se em paz.',
        res: { texto: 'A despedida é calma, quase cerimoniosa. {par.nome} aperta a sua mão e diz "obrigad{par.o}" duas vezes. Você observa a figura diminuir na estrada. Há partidas que doem como perda, e outras que doem como fim de estação: necessárias, boas, e silenciosas.', efeitos: [{ opiniao: ['par', 6] }, { fato: ['par', 'se_despediu_em_paz', 4] }, { situacao: ['par', 'partiu'] }, { fio: ['companheiro', 'fechar:separados'] }], fx: { karma: 1, perfil: { disciplina: 2 } } } },
      { id: 'sacrificio', texto: 'Dar a {par.nome} o que você tem de mais precioso, mesmo que custe o seu avanço.', requer: { jogador: { pedrasMin: 300 } },
        res: { texto: 'A pílula que você guardava vai embora sem cerimônia. {par.nome} chora ao tomá-la, e o seu cultivo avança um passo que o seu próprio atraso. Você, atrás, perde um degrau. Não se arrepende. Há bens que só valem o que custam a quem os dá.', efeitos: [{ opiniao: ['par', 30] }, { fato: ['par', 'recebeu_o_sacrificio', 5] }, { reino: ['par', 1] }, { fio: ['companheiro', 'fechar:sacrificio'] }], fx: { pedras: -300, karma: 4, perfil: { devocao: 3 } } } },
      { id: 'recusar', texto: 'Recusar, e seguir sozinh{jogador.o}.', requer: { papel: { par: { opiniaoMin: -50 } } },
        res: { texto: 'A recusa é dita com educação, e recebida com dignidade. {par.nome} não pede explicação. Diz apenas: "Eu entendo." Vai embora com a postura de quem deixa a casa que construiu pela metade. Você fica com o vento e a certeza, que dura pouco, de ter escolhido certo.', efeitos: [{ opiniao: ['par', -15] }, { fato: ['par', 'foi_recusado', 5] }, { situacao: ['par', 'partiu'] }, { fio: ['companheiro', 'fechar:recusado'] }], fx: { perfil: { ambicao: 2, cautela: 1 } } } },
    ],
  }),

  molde({
    id: 'comp_epilogo',
    titulo: 'O Que Ficou do Par',
    tipo: 'consequencia',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { ...PAR },
    quando: { fio: { companheiro: { resolvido: true } } },
    relevancia: [{ se: { fio: { companheiro: { resolvido: true } } }, mais: 55 }],
    cena: [
      { se: { fio: { companheiro: { desfecho: ['unidos'] } } }, texto: 'Os anos têm outra textura depois do juramento. Há dias de discussão, de teimosia, de cansaço. Mas há também a confiança de saber que, em algum lugar do mundo, uma pessoa lembra o seu nome sem esforço, e que ao fim de cada tribulação, quando você abrir os olhos, haverá alguém na outra ponta do mesmo caminho.' },
      { se: { fio: { companheiro: { desfecho: ['sacrificio'] } } }, texto: '{par.nome} sobe, e você continua. Às vezes se encontram em estalagens ou em tribulações alheias, e há um olhar que dispensa conversa. O que você deu não volta, mas o que {par.nome} se tornou fala por você, e isso, no fundo, é mais do que a maioria consegue.' },
      { se: { fio: { companheiro: { desfecho: ['separados'] } } }, texto: 'Chegam cartas, de tempos em tempos, com notícias de lugares que você nunca verá. Você responde às vezes. Não há mágoa, só a doçura estranha de ter amado um caminho paralelo. Algumas pessoas são uma estação inteira, e basta.' },
      { texto: 'O nome de {par.nome} volta, às vezes, sem convite, nas conversas da estalagem ou nos sonhos mal dormidos. Você deixa passar, como se deixa passar uma chuva. Há perguntas que a vida faz uma vez, e cuja resposta ninguém cobra depois.' },
    ],
    opcoes: [
      { id: 'segue', texto: 'Seguir em frente.', res: { texto: 'A vida continua, e leva consigo o que for preciso. O que ficou não se perdeu: apenas mudou de lugar.', efeitos: [], fx: {} } },
    ],
  }),
];
