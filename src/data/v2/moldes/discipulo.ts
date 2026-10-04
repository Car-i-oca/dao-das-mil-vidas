import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Arco do Discípulo (fio `discipulo`, aberto por `suc_prodigio`): o método de ensinar, a tentação, a traição ou a formatura.
 * Completa as cenas de sucessao.ts: erro (etapa 2), superação (etapa 3).
 */
const DISC = { discipulo: { pessoa: { papel: 'discipulo', vivo: true } } } as const;

export const DISCIPULO: Molde[] = [
  molde({
    id: 'disc_formacao',
    titulo: 'O Método de Ensinar',
    tipo: 'preparo',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { ...DISC },
    quando: { papel: { discipulo: { vivo: true } } },
    fio: { id: 'discipulo', espaco: 2, abandono: 'O método nunca foi escolhido, e {discipulo.nome} aprendeu pelo que sobrou.' },
    cena: [
      { se: { papel: { discipulo: { traco: ['orgulhoso', 'ambicioso'] } } }, texto: '{discipulo.nome} é rápid{discipulo.o}, e sabe disso. Cada lição termina antes do que você planejou, e começa a faltar alguma coisa que não é técnica: paciência, talvez, ou medida. Você percebe que precisa decidir, agora, que tipo de mestre quer ser para quem pode virar maior do que você.' },
      { texto: 'A rotina de ensinar entra no seu dia como uma estação nova. {discipulo.nome} pergunta mais do que você sabe responder, e erra de maneiras que você já esqueceu que existiam. É preciso decidir: ensinar do jeito que lhe ensinaram, ou do jeito que você gostaria de ter aprendido.' },
    ],
    opcoes: [
      { id: 'rigor', texto: 'Ensinar com rigor: repetição, disciplina, nada de atalhos.',
        res: { texto: 'A disciplina dá frutos, e também ressentimentos. {discipulo.nome} fica mais sólid{discipulo.o} a cada mês, e menos solt{discipulo.o}. Em alguns dias o olhar de {discipulo.nome} sobre você parece o de quem conta os degraus de uma escada que não escolheu.', efeitos: [{ opiniao: ['discipulo', -2] }, { fato: ['discipulo', 'foi_treinado_com_rigor', 4] }, { q: ['metodo_rigor', 1] }], fx: { xp: 12, perfil: { disciplina: 2 } } } },
      { id: 'liberdade', texto: 'Ensinar com liberdade: deixar {discipulo.ele} errar, e escolher o próprio ritmo.',
        res: { texto: 'Os erros são grandes e as descobertas, maiores. {discipulo.nome} aprende rápido o que importa e devagar o que não, e ri muito, o que é raro numa seita. Você aprende que há ordem em quem não é forçado, embora não seja sempre a que se esperava.', efeitos: [{ opiniao: ['discipulo', 12] }, { fato: ['discipulo', 'foi_treinado_com_liberdade', 4] }, { q: ['metodo_liberdade', 1] }], fx: { karma: 1, perfil: { compaixao: 2 } } } },
      { id: 'exemplo', texto: 'Ensinar pelo exemplo: viver diante de {discipulo.ele}, e deixar o resto vir sozinho.',
        res: { texto: 'Não há aula formal; há dias. {discipulo.nome} copia seu jeito de dar o primeiro passo, de pedir licença à porta, de calar diante de quem fala demais. Anos depois, quando alguém disser "o jeito de {discipulo.nome}", estará falando do seu.', efeitos: [{ opiniao: ['discipulo', 8] }, { fato: ['discipulo', 'cresceu_ao_lado_do_mestre', 4] }, { q: ['metodo_exemplo', 1] }], fx: { fama: 1, perfil: { devocao: 1, disciplina: 1 } } } },
    ],
  }),

  molde({
    id: 'disc_tentacao',
    titulo: 'Quem Procura {discipulo.nome}',
    tipo: 'personagem',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { ...DISC, culto: { faccao: { tipo: ['culto', 'associacao'], estado: ['paz', 'tensao', 'guerra'] } } },
    quando: { jogador: { reinoMin: 3 }, papel: { discipulo: { vivo: true } }, fio: { discipulo: { aberto: true } } },
    relevancia: [{ se: { q: { metodo_rigor: [1, undefined] } }, mais: 25 }, { se: { papel: { discipulo: { opiniaoMax: 5 } } }, mais: 25 }],
    fio: { id: 'discipulo', espaco: 3, abandono: 'O que se ofereceu a {discipulo.nome} nunca foi dito em voz alta, e o silêncio deu a resposta por conta própria.' },
    cena: [
      { se: { q: { metodo_rigor: [1, undefined] } }, texto: 'Você percebe que {discipulo.nome} anda se encontrando com alguém da {culto.nome}. Não há prova, só um cheiro de incenso novo na roupa e uma pergunta, feita de passagem: "Mestre, o que o senhor acha de quem ensina sem cobrar tanto?" Toda disciplina cria, em alguma medida, a vontade de escapar da própria disciplina.' },
      { texto: 'Uma carta chega ao seu pavilhão, de {culto.nome}. Oferece a {discipulo.nome} uma posição, um mestre, uma promessa de atalhos. A carta foi aberta, lida, e deixada onde você a veria. Isso, por si só, é uma pergunta.' },
    ],
    opcoes: [
      { id: 'conversar', texto: 'Conversar com {discipulo.ele} em campo aberto, sem ameaça.', teste: { stat: ['car', 'dao'], dif: 0 },
        sucesso: { texto: '{discipulo.nome} escuta, e responde com uma sinceridade que dói. "Não quero ir. Mas queria que alguém me pedisse para ficar." Você pede. E descobre que a pergunta mais difícil de um mestre é, quase sempre, a mais simples.', efeitos: [{ opiniao: ['discipulo', 18] }, { fato: ['discipulo', 'foi_pedido_para_ficar', 5] }], fx: { karma: 2, perfil: { compaixao: 2, devocao: 1 } } },
        falha: { texto: 'A conversa sai de lado: você fala de dever, e {discipulo.nome} escuta ordem. A resposta é um aceno educado e um olhar já distante. Não há briga. Há, pior, a calma de quem já escolheu.', efeitos: [{ opiniao: ['discipulo', -12] }, { fato: ['discipulo', 'foi_mal_abordado', 4] }], fx: { perfil: { disciplina: 1 } } } },
      { id: 'proibir', texto: 'Proibir qualquer contato com a {culto.nome}, e vigiar.',
        res: { texto: 'A proibição é obedecida em público e desafiada em segredo. {discipulo.nome} agradece a preocupação com uma frieza nova. O que antes era respeito vira cálculo, e cada gesto seu passa a ser lido como possível armadilha.', efeitos: [{ opiniao: ['discipulo', -14] }, { fato: ['discipulo', 'foi_vigiado', 4] }, { q: ['metodo_rigor', 1] }], fx: { perfil: { disciplina: 2, cautela: 1 } } } },
      { id: 'confiar', texto: 'Fingir que não viu a carta: a decisão é de {discipulo.ele}.',
        res: { texto: 'Você guarda a carta, na mesma gaveta de outras decisões que preferiu não tomar. {discipulo.nome} nota que a carta foi vista, e que nada foi dito. Algumas formas de confiança parecem negligência, e algumas formas de negligência funcionam como confiança.', efeitos: [{ opiniao: ['discipulo', 6] }, { fato: ['discipulo', 'foi_deixado_decidir', 4] }], fx: { perfil: { devocao: 1 } } } },
    ],
  }),

  molde({
    id: 'disc_traicao',
    titulo: 'A Falta no Pavilhão',
    tipo: 'perigo',
    capitulos: ['crise', 'legado'],
    unico: true,
    papeis: { ...DISC, seita: { faccao: { local: true }, opcional: true } },
    quando: { jogador: { reinoMin: 4 }, papel: { discipulo: { vivo: true, opiniaoMax: 10 } }, fio: { discipulo: { aberto: true, etapaMin: 2 } } },
    relevancia: [{ se: { papel: { discipulo: { opiniaoMax: -10 } } }, mais: 30 }, { se: { q: { metodo_rigor: [2, undefined] } }, mais: 20 }],
    combate: { oponente: 'cultivador', cenario: 'montanha' },
    fio: { id: 'discipulo', espaco: 3, abandono: 'O que faltou no pavilhão nunca foi encontrado, nem o ladrão, nem a razão.' },
    cena: 'O pavilhão amanhece com uma falta: o seu manual mais antigo, a técnica que você não ensinou a ninguém, desapareceu da caixa de cedro. A porta não foi arrombada. Na mesa, {discipulo.nome} deixou um bilhete de uma linha: "Obrigad{discipulo.o} por tudo, mestre. O resto, eu levo." No pátio, passos já distantes.',
    opcoes: [
      { id: 'perseguir', texto: 'Perseguir {discipulo.ele} até o desfiladeiro, e exigir o manual de volta.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'discipulo' },
        sucesso: { texto: 'Você alcança {discipulo.nome} no último passo antes da fronteira. A luta é curta, e tem um gosto estranho: cada golpe que você desvia é um que você mesmo ensinou. O manual volta ao seu poder, e {discipulo.nome} fica no chão, sem ódio no rosto. "Eu aprendi com o melhor", diz. Não é elogio.', efeitos: [{ opiniao: ['discipulo', -20] }, { fato: ['discipulo', 'foi_derrotado_pelo_mestre', 5] }, { fio: ['discipulo', 'fechar:traido'] }, { situacao: ['discipulo', 'foragido'] }], fx: { fama: 2, karma: -1, perfil: { disciplina: 1, violencia: 1 } } },
        falha: { texto: '{discipulo.nome} usa a sua própria técnica contra você, e usa melhor do que você imaginou. Quando você acorda, o manual e o jovem estão longe, e o que resta é a sensação de ter ensinado mais do que sabia.', efeitos: [{ opiniao: ['discipulo', -10] }, { fato: ['discipulo', 'venceu_o_mestre', 5] }, { fio: ['discipulo', 'fechar:fugiu'] }, { situacao: ['discipulo', 'foragido'] }], fx: { ferida: 3, perfil: { disciplina: 1 } } } },
      { id: 'deixar', texto: 'Deixar {discipulo.ele} ir. O manual era só papel.',
        res: { texto: 'Você fecha a caixa de cedro vazia e senta no pátio, olhando a estrada. Perdeu um manual. Perdeu um discípulo. Talvez tenha ganhado uma pergunta que levará anos para responder: o que, afinal, foi ensinado? A seita comenta, e você deixa comentar.', efeitos: [{ opiniao: ['discipulo', 8] }, { fato: ['discipulo', 'foi_deixado_ir', 5] }, { fio: ['discipulo', 'fechar:fugiu'] }, { situacao: ['discipulo', 'partiu'] }], fx: { karma: 2, perfil: { compaixao: 2, devocao: 1 } } } },
      { id: 'carta', texto: 'Escrever uma carta e enviá-la aonde {discipulo.nome} for: "Se um dia quiser voltar, a porta está aberta."',
        res: { texto: 'A carta é curta e sem recriminação. Você não sabe se será lida. Anos depois, a carta volta, amassada e sem resposta, em um pacote junto de um frasco de pílulas, sem remetente. Algumas coisas não se devolvem com palavras.', efeitos: [{ opiniao: ['discipulo', 14] }, { fato: ['discipulo', 'recebeu_a_carta', 5] }, { fio: ['discipulo', 'fechar:perdoado'] }, { situacao: ['discipulo', 'partiu'] }], fx: { karma: 3, perfil: { compaixao: 3, devocao: 1 } } } },
    ],
  }),

  molde({
    id: 'disc_epilogo',
    titulo: 'O Que {discipulo.nome} Fez do Que Aprendeu',
    tipo: 'consequencia',
    capitulos: ['crise', 'legado'],
    unico: true,
    papeis: { discipulo: { pessoa: { papel: 'discipulo' } } },
    quando: { fio: { discipulo: { resolvido: true } } },
    relevancia: [{ se: { fio: { discipulo: { resolvido: true } } }, mais: 55 }],
    cena: [
      { se: { fio: { discipulo: { desfecho: ['traido', 'fugiu'] } } }, texto: 'Chegam notícias de {discipulo.nome}, pela boca de mercadores e peregrinos. Usa o que aprendeu com você, às vezes de um jeito que você reconhece. Ensina, agora, a outros, com um método que é seu e um pouco do seu. Nenhum dos dois pediu isso; os dois são, sem querer, a mesma linhagem.' },
      { se: { fio: { discipulo: { desfecho: ['perdoado', 'legado'] } } }, texto: 'Um dia, {discipulo.nome} volta, em uma estação qualquer, e senta no pátio sem dizer nada. Anos mudaram o rosto, e não o jeito de respirar. Conversam sobre o tempo. Os dois sabem que não era sobre o tempo.' },
      { texto: 'O nome de {discipulo.nome} circula pelos corredores da seita e pelos mercados, às vezes com o seu nome encostado, como se um explicasse o outro. Você aprende que ser um mestre é ser, durante algum tempo, a parte mais citada da vida de alguém.' },
    ],
    opcoes: [
      { id: 'segue', texto: 'Seguir em frente.', res: { texto: 'O que se ensinou fica no mundo, de um jeito que ninguém controla. Você segue, sabendo que parte de si continua em quem foi.', efeitos: [], fx: {} } },
    ],
  }),
];
