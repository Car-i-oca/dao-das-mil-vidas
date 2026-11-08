import { molde, type Molde } from '../../../../../engine/v2/tipos';

/**
 * Arco do Demônio Interior (fio `demonio`): o sussurro, a oferta de um culto, a queda, a cobrança, e a escolha final entre
 * redenção, domínio e ser consumido. Usa a corrupção (corr) do jogador: quem já se sujou de sangue ouve primeiro.
 */
const TENTADOR = { tentador: { pessoa: { papel: 'tentador', vivo: true } } } as const;

export const DEMONIO: Molde[] = [
  molde({
    id: 'dem_sussurro',
    titulo: 'O Que Fala Quando Você Cala',
    tipo: 'virada',
    capitulos: ['entrada', 'ascensao', 'crise'],
    unico: true,
    papeis: {},
    quando: {
      jogador: { reinoMin: 2 },
      algum: [{ jogador: { karmaMax: -4 } }, { jogador: { origem: ['filho_demonio'] } }, { jogador: { corrMin: 12 } }, { jogador: { perfilMin: { violencia: 7 } } }],
    },
    relevancia: [{ se: { jogador: { corrMin: 20 } }, mais: 40 }, { se: { jogador: { origem: ['filho_demonio'] } }, mais: 40 }, { se: { jogador: { karmaMax: -8 } }, mais: 25 }],
    fio: { id: 'demonio', abre: true, abandono: 'A voz de dentro se cansou de ser ignorada e passou a falar baixo, que é a pior maneira de falar.' },
    cena: [
      { se: { jogador: { origem: ['filho_demonio'] } }, texto: 'Em meditação, o fundo da mente escurece sem pedir licença, e uma voz que já foi familiar diz o seu nome na língua dos seus antepassados. Não ameaça. Oferece. "Você nunca precisou fingir ser outra coisa. Aqui dentro, ninguém se envergonha do que você é."' },
      { se: { jogador: { corrMin: 12 } }, texto: 'Uma noite, durante a respiração, o Qi bate no peito com um sabor de ferro velho. Uma voz que parece a sua, mas mais calma, comenta cada um dos seus erros recentes como quem lista mercadorias. "Você poderia ter sido mais rápido. Mais cruel. Mais livre."' },
      { texto: 'Ao acordar de um sono curto, você tem certeza de ter ouvido alguém dizer o seu nome. Não é sonho. A voz repete, mais baixa, e segue falando: lembra tudo o que você fez, tudo o que quis fazer, e tudo o que fingiu não querer. Fala com a doçura de quem sabe onde você dói.' },
    ],
    opcoes: [
      { id: 'escutar', texto: 'Escutar, apenas para entender o que a voz quer.',
        res: { texto: 'A voz diz coisas verdadeiras em ordem estratégica. Não pede nada em troca, nesta noite. Mas ao amanhecer, uma parte sua anda mais leve, como quem soltou uma carga, e outra, mais pesada, como quem a guardou.', efeitos: [{ q: ['dem_ouvido', 1] }, { inclinar: ['superar_rival', 1] }], fx: { corr: 5, perfil: { ambicao: 1, astucia: 1 } } } },
      { id: 'calar', texto: 'Calar a voz com disciplina: meditar até ela se cansar.', teste: { stat: ['esp', 'dao'], dif: 1 },
        sucesso: { texto: 'Foram sete noites, e na oitava a voz ficou quieta. Você sabe, no fundo, que não foi vencida: foi adiada. Mas aprendeu o formato do seu silêncio, e silêncios assim servem de muralha.', efeitos: [{ q: ['dem_resistido', 1] }], fx: { corr: -4, stats: { esp: 1 }, perfil: { disciplina: 2 } } },
        falha: { texto: 'A voz ri, e o riso reverbera dentro dos ossos. Você perde o fio da respiração, vomita Qi turvo, e passa um dia no chão. Quando levanta, a voz continua ali, ligeiramente mais satisfeita.', efeitos: [{ q: ['dem_ouvido', 1] }], fx: { corr: 6, ferida: 2, perfil: { disciplina: 1 } } } },
      { id: 'contar', texto: 'Contar a alguém de confiança o que está ouvindo.', requer: { algum: [{ jogador: { flag: ['membro_seita'] } }, { jogador: { origem: ['orfao_seita', 'discipulo_eremita'] } }] }, selo: 'Quem escuta',
        res: { texto: 'A pessoa não ri, não se afasta, não faz sermão. Escuta até o fim, e diz: "Isso acontece com quem sente demais. O silêncio ajuda, mas companhia ajuda mais." Pela primeira vez a voz fica menor do que quem a escuta.', efeitos: [{ q: ['dem_resistido', 1] }], fx: { corr: -6, karma: 1, perfil: { compaixao: 1, devocao: 1 } } } },
    ],
  }),

  molde({
    id: 'dem_oferta',
    titulo: 'A Oferta do Culto',
    tipo: 'preparo',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: {
      tentador: { pessoa: { novo: true, criar: { traco: ['cruel', 'ambicioso'], reino: 5, objetivo: 'subir', faccao: 'culto' } } },
      culto: { faccao: { tipo: ['culto'] } },
    },
    quando: { jogador: { reinoMin: 3 }, fio: { demonio: { aberto: true } } },
    relevancia: [{ se: { q: { dem_ouvido: [1, undefined] } }, mais: 40 }, { se: { jogador: { corrMin: 25 } }, mais: 20 }],
    fio: { id: 'demonio', etapa: 2, abandono: 'O culto esperou uma resposta que nunca veio, e passou a esperar outra pessoa.' },
    cena: [
      { se: { q: { dem_ouvido: [1, undefined] } }, texto: '{tentador.Ele} aparece sem aviso na sua porta, de manto cinzento, com um sorriso pronto. {tentador.nome}, da {culto.nome}, fala como quem já viu seu rosto muitas noites. "A voz que você ouve não é doença. É a verdade que a seita ensinou você a temer. Nós ensinamos a ouvi-la, e a usá-la."' },
      { texto: 'Um convite chega por canais estranhos: um mensageiro que não pede resposta, um pedaço de papel preto com um endereço. {tentador.nome}, da {culto.nome}, espera no fim da rota, com a calma de quem sabe que a curiosidade é o nome elegante da fome.' },
    ],
    opcoes: [
      { id: 'ouvir', texto: 'Ouvir a oferta até o fim, sem se comprometer.',
        res: { texto: '{tentador.nome} não mente em nenhuma palavra. O culto oferece reconhecimento, técnicas que a sua seita nunca ensinaria, e uma família que não pergunta de onde veio o seu sangue. O preço é dito no final, em voz baixa, e parece tão razoável que dá medo.', efeitos: [{ papel: ['tentador', 'tentador'] }, { opiniao: ['tentador', 8] }, { fato: ['tentador', 'foi_ouvido', 3] }, { reputacao: ['culto', 4] }], fx: { corr: 4, perfil: { astucia: 1, ambicao: 1 } } } },
      { id: 'aceitar', texto: 'Aceitar: o poder é poder, venha de onde vier.',
        res: { texto: 'A marca é discreta: um traço negro no pulso, que arde por três dias e depois some. O Qi que sobe a partir dali tem outro cheiro e outra velocidade. {tentador.nome} sorri como quem recebe uma moeda que sabe que vai render.', efeitos: [{ papel: ['tentador', 'tentador'] }, { opiniao: ['tentador', 20] }, { fato: ['tentador', 'selou_o_pacto', 5] }, { reputacao: ['culto', 15] }, { q: ['dem_marcado', 1] }], fx: { corr: 18, xp: 40, karma: -3, perfil: { ambicao: 2, violencia: 1 } } } },
      { id: 'recusar', texto: 'Recusar, e avisar a seita sobre o culto.', requer: { jogador: { flag: ['membro_seita'] } }, selo: 'Seita',
        res: { texto: '{tentador.nome} sai com a mesma calma com que entrou. "Nós esperamos", diz. A seita agradece o aviso, e passa a olhar para você com um respeito diferente, o de quem sabe que a pessoa resistiu ao que muita gente não resiste.', efeitos: [{ papel: ['tentador', 'tentador'] }, { opiniao: ['tentador', -15] }, { fato: ['tentador', 'foi_recusado', 4] }, { reputacao: ['culto', -12] }, { q: ['dem_resistido', 1] }], fx: { corr: -8, fama: 2, karma: 3, perfil: { disciplina: 1, devocao: 1 } } } },
      { id: 'fugir', texto: 'Agradecer a atenção e sair sem voltar nunca àquela rua.',
        res: { texto: 'Você cumpre a promessa de não voltar, e {tentador.nome} não parece se importar. Mas a sensação de ter sido observado dura meses, e o papel preto, que você jura ter queimado, reaparece uma vez, dobrado dentro de um livro.', efeitos: [{ papel: ['tentador', 'tentador'] }, { opiniao: ['tentador', -3] }], fx: { corr: -2, perfil: { cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'dem_queda',
    titulo: 'A Noite da Cobrança',
    tipo: 'perigo',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...TENTADOR, culto: { faccao: { tipo: ['culto'] } } },
    quando: { jogador: { reinoMin: 3 }, papel: { tentador: { vivo: true } }, fio: { demonio: { aberto: true } } },
    relevancia: [{ se: { q: { dem_marcado: [1, undefined] } }, mais: 70 }],
    combate: { oponente: 'demonio', cenario: 'ruinas' },
    fio: { id: 'demonio', etapa: 3, abandono: 'A cobrança do culto nunca chegou, e talvez tenha sido esquecida, ou talvez só esteja esperando.' },
    cena: [
      { se: { q: { dem_marcado: [1, undefined] } }, texto: 'A marca no pulso pulsa antes do amanhecer. {tentador.nome} aparece de novo, sem sorriso. "Agora é a sua parte." É um nome, um lugar, uma hora. Alguém que a seita protege, alguém que o culto quer calado. A voz de dentro comenta, sem pressa: "Você sabe fazer isto."' },
      { texto: '{tentador.nome} volta com uma tarefa pequena e sem dono: uma oferenda, um nome riscado, uma ausência a causar. Não ameaça. Apenas observa, com a paciência de quem acabou de entender que você não é tão difícil de comprar.' },
    ],
    opcoes: [
      { id: 'cumprir', texto: 'Cumprir a tarefa, e seguir.', requer: { q: { dem_marcado: [1, undefined] } },
        res: { texto: 'É feito em dez minutos e lembrado por anos. Na noite seguinte o sono não vem, e a voz, em compensação, canta. {tentador.nome} agradece com um aceno quase afetuoso, e entrega a você uma segunda técnica, mais perigosa que a primeira.', efeitos: [{ opiniao: ['tentador', 18] }, { fato: ['tentador', 'viu_o_jogador_cumprir', 5] }, { reputacao: ['culto', 15] }, { q: ['dem_cumpriu', 1] }], fx: { corr: 20, xp: 30, karma: -8, perfil: { violencia: 2, ambicao: 1 } } } },
      { id: 'resistir', texto: 'Recusar a tarefa e arrancar a marca, custe o que custar.', teste: { stat: ['esp', 'fis'], dif: 2 },
        sucesso: { texto: 'A marca sai com um som de seda rasgada, e o que a marca segurava dentro de você grita antes de calar. Fica uma cicatriz branca no pulso e uma lacuna no Qi, que lentamente se preenche com uma coisa mais limpa. {tentador.nome} observa, sem raiva: "Poucos conseguem. Quase ninguém deveria precisar."', efeitos: [{ opiniao: ['tentador', -20] }, { fato: ['tentador', 'perdeu_o_pactuado', 5] }, { reputacao: ['culto', -15] }, { q: ['dem_livrou', 1] }], fx: { corr: -25, ferida: 3, karma: 4, perfil: { disciplina: 3, devocao: 1 } } },
        falha: { texto: 'A marca resiste, e pune. O Qi gira ao contrário por um minuto inteiro, e quando você volta a si, está no chão, com as mãos queimadas e a voz rindo sem pressa. {tentador.nome} estende uma mão, e a mão vale mais do que a recusa.', efeitos: [{ opiniao: ['tentador', 6] }, { fato: ['tentador', 'ajudou_o_jogador_a_levantar', 4] }], fx: { corr: 10, ferida: 4, perfil: { disciplina: 1 } } } },
      { id: 'enfrentar', texto: 'Enfrentar {tentador.nome} de frente.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'tentador' },
        sucesso: { texto: 'É uma luta dura, e a voz de dentro se cala no meio da luta, como quem aprecia o espetáculo. {tentador.nome} cai de joelhos, e dessa vez o sorriso não vem. "Você é mais forte do que eu pensava", diz. "Menos livre, também." Você não sabe qual das duas frases dói mais.', efeitos: [{ opiniao: ['tentador', -30] }, { fato: ['tentador', 'foi_derrotado', 5] }, { reputacao: ['culto', -20] }, { situacao: ['tentador', 'foragido'] }], fx: { fama: 3, corr: 4, perfil: { violencia: 1, disciplina: 1 } } },
        falha: { texto: '{tentador.nome} usa um golpe que você nunca viu, e com o golpe um sussurro que você reconhece: a mesma voz, em outra garganta. Você cai. Ouve, antes de apagar: "Foi bonito. Volte quando entender."', efeitos: [{ opiniao: ['tentador', 4] }, { fato: ['tentador', 'venceu_o_jogador', 5] }], fx: { ferida: 4, corr: 8, perfil: { disciplina: 1 } } } },
    ],
  }),

  molde({
    id: 'dem_escolha',
    titulo: 'O Que Você Se Tornou',
    tipo: 'climax',
    capitulos: ['crise', 'legado'],
    unico: true,
    papeis: {},
    quando: { jogador: { reinoMin: 4 }, fio: { demonio: { aberto: true, etapaMin: 2 } } },
    relevancia: [{ se: { jogador: { corrMin: 40 } }, mais: 60 }, { se: { q: { dem_livrou: [1, undefined] } }, mais: 40 }, { se: { fio: { demonio: { etapaMin: 3 } } }, mais: 30 }],
    fio: { id: 'demonio', etapa: 4, abandono: 'A hora de escolher passou sem testemunha, e o resultado foi decidido por omissão, que é a decisão mais antiga.' },
    cena: [
      { se: { jogador: { corrMin: 50 } }, texto: 'Num dia de céu limpo, a voz deixa de ser voz e vira o seu próprio pensamento, sem barreira. Você não sabe mais o que veio de dentro e o que veio do culto. A pergunta não é se você pode parar. É se você quer, e a resposta honesta é a mais difícil de dizer em voz alta.' },
      { texto: 'Há uma noite em que o espelho de água do poço mostra um rosto que não é o seu, e depois é. A voz diz, finalmente, a coisa de que você sempre desconfiou: "Escolha. Já sabe o que eu sou. Já sabe o que você é. Falta só dizer em voz alta."' },
    ],
    opcoes: [
      { id: 'redimir', texto: 'Recusar a voz de uma vez por todas, mesmo que custe o cultivo.', teste: { stat: ['esp', 'dao'], dif: 2 },
        sucesso: { texto: 'Foi um retiro de quarenta dias, sem comida, sem nome. No último, a voz disse o seu nome pela última vez, e não houve resposta. Algo antigo caiu como pele velha. Você sai do retiro mais leve, mais lento, e para sempre mais livre.', efeitos: [{ fio: ['demonio', 'fechar:redimido'] }, { noticia: 'Dizem que alguém saiu de um retiro de quarenta dias com os olhos limpos, e que a montanha agradeceu em silêncio.' }], fx: { corr: -40, xp: -15, karma: 8, fama: 3, perfil: { disciplina: 3, compaixao: 2 } } },
        falha: { texto: 'A voz resiste, e o corpo cede antes da vontade. Você perde dias, quase perde a mente. Quando volta, não está livre, mas está inteiro, e com uma humildade nova: a de saber que a batalha vai continuar a vida toda.', efeitos: [{ fio: ['demonio', 'fechar:contido'] }], fx: { corr: -15, ferida: 3, karma: 2, perfil: { disciplina: 2 } } } },
      { id: 'dominar', texto: 'Dominar a voz: tomar para si o poder, sem pedir licença a ninguém.', teste: { stat: ['dao', 'esp'], dif: 3 },
        sucesso: { texto: 'A voz se cala porque foi calada, não vencida. O poder que sobe não tem dono: é seu, e traz tudo o que o poder traz. Os olhos escurecem nas bordas, e os corredores ficam silenciosos quando você passa. Há quem chame de ascensão. Há quem chame de outra coisa, em voz baixa.', efeitos: [{ fio: ['demonio', 'fechar:dominou'] }, { inclinar: ['ascender_seita', 1] }, { noticia: 'Dizem que há um cultivador cuja sombra anda meio passo à frente do corpo.' }], fx: { corr: 15, xp: 80, fama: 6, karma: -6, stats: { dao: 2, esp: 1 }, perfil: { ambicao: 3, violencia: 2 } } },
        falha: { texto: 'A voz sorri, em você, com a sua boca. Por um momento o mundo é de outra cor, e depois não é de cor nenhuma. Quando você recupera o controle, há marcas que não eram suas e uma sensação de ter sido lido por inteiro por alguém que sabe o que quer.', efeitos: [{ fio: ['demonio', 'fechar:consumido'] }], fx: { corr: 45, ferida: 3, karma: -5, perfil: { violencia: 2 } } } },
      { id: 'ceder', texto: 'Ceder à voz, e deixar que ela decida o resto.',
        res: { texto: 'Não há dor. Há uma tranquilidade enorme, como quem larga uma carga que carregava a vida inteira. Os dias seguintes são lúcidos, eficientes, e estranhamente vazios. Quando você pensa em alguém que amou, a lembrança chega, sem calor. O mundo é de quem o toma, e agora você toma.', efeitos: [{ fio: ['demonio', 'fechar:consumido'] }], fx: { corr: 60, xp: 50, karma: -8, perfil: { ambicao: 2, violencia: 2 } } } },
    ],
  }),

  molde({
    id: 'dem_epilogo',
    titulo: 'A Marca no Pulso',
    tipo: 'consequencia',
    capitulos: ['crise', 'legado'],
    unico: true,
    papeis: {},
    quando: { fio: { demonio: { resolvido: true } } },
    relevancia: [{ se: { fio: { demonio: { resolvido: true } } }, mais: 55 }],
    cena: [
      { se: { fio: { demonio: { desfecho: ['redimido'] } } }, texto: 'Você aprende a viver sem aquela voz, e depois a sentir saudade dela, o que é quase uma vitória. Quando alguém na seita confessa ouvir algo parecido, você é a primeira pessoa que procura, sem ter nada de sábio a dizer, só um silêncio que acolhe.' },
      { se: { fio: { demonio: { desfecho: ['dominou'] } } }, texto: 'O poder que você tomou serve, e cobra. Há aliados que se afastam e inimigos que se aproximam por respeito. Você descobre que dominar uma voz é como domar um rio: possível, e permanente, e cada dia exige a mesma atenção do primeiro.' },
      { se: { fio: { demonio: { desfecho: ['consumido'] } } }, texto: 'O mundo continua do lado de fora, e você, por dentro, assiste. Há dias em que algo de você ainda reconhece o que perdeu, e esses são os piores. Os outros, que são a maioria, são calmos, eficientes, e não deixam rastro.' },
      { texto: 'A voz diminuiu, ou você aprendeu a ouvi-la menos. Fica uma sombra no fundo da mente, ocasional, como um velho vizinho a quem se acena sem conversar. Há pazes que se fazem por cansaço, e funcionam.' },
    ],
    opcoes: [
      { id: 'segue', texto: 'Seguir em frente.', res: { texto: 'O que foi decidido na escuridão pesa à luz do dia, e a luz do dia, aos poucos, aprende a carregar o peso.', efeitos: [], fx: {} } },
    ],
  }),
];
