import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Arco Mestre e Herança (fio `heranca`): o anel com uma voz dentro, as lições que cobram um preço,
 * o segredo do espírito, a caverna da herança e a escolha final. Mais um molde solto sobre o segredo do mestre.
 * Quem recebe o arco depende do build (talento, origem, ou ter ido a lugares onde heranças dormem).
 */
const TEM_AFINIDADE = {
  algum: [
    { jogador: { talento: ['alma_antiga', 'olhar_dao', 'predestinado', 'sorte_destino', 'passo_vazio', 'memoria_perfeita'] } },
    { jogador: { origem: ['alma_reencarnada', 'mendigo_iluminado', 'discipulo_eremita', 'regressor', 'cla_decadente'] } },
  ],
};
const ESPIRITO = { espirito: { pessoa: { papel: 'espirito', vivo: true } } } as const;

export const HERANCA: Molde[] = [
  molde({
    id: 'heranca_anel',
    titulo: 'O Anel Que Escutava',
    tipo: 'virada',
    capitulos: ['despertar', 'entrada', 'ascensao'],
    unico: true,
    papeis: {
      espirito: { pessoa: { novo: true, criar: { traco: ['cauteloso', 'ambicioso'], reino: 6, objetivo: 'viver' } } },
      ruina: { lugar: { tipo: ['ruinas', 'gruta', 'forja'] }, opcional: true },
    },
    quando: { jogador: { reinoMin: 1, reinoMax: 3 }, ...TEM_AFINIDADE },
    relevancia: [{ se: { jogador: { talento: ['alma_antiga', 'olhar_dao'] } }, mais: 40 }, { se: { jogador: { origem: ['alma_reencarnada', 'discipulo_eremita'] } }, mais: 40 }],
    fio: { id: 'heranca', abre: true, abandono: 'O anel esfriou numa gaveta, e a voz que havia nele se calou por falta de quem a escutasse.' },
    cena: [
      { se: { jogador: { origem: ['mendigo_iluminado'] } }, texto: 'No fundo de um bolso de um morto à beira da estrada, entre moedas de cobre e um lenço sem dono, há um anel de ferro escuro. Quando você o veste para ver se serve, ouve, nítida como se viesse de dentro do osso, uma voz de velho: "Finalmente. Alguém que não me vende de imediato."' },
      { texto: 'Um anel de ferro escuro, achado em {ruina.nome} entre cinzas que ninguém quis revirar, esquenta no seu dedo à noite. Na terceira madrugada, uma voz de velho diz, com a calma de quem já esperou séculos: "Não grite. Gritar é o que todos fazem, e nenhum deles precisava."' },
    ],
    opcoes: [
      { id: 'escutar', texto: 'Escutar a voz, sem prometer nada.',
        res: { texto: 'A voz se chama {espirito.nome}, ou foi isso que lembrou. Diz que foi cultivador de um tempo em que as seitas tinham nomes mais longos, e que está preso no anel desde que perdeu uma aposta que prefere não contar. Pede só uma coisa: conversa.', efeitos: [{ papel: ['espirito', 'espirito'] }, { opiniao: ['espirito', 10] }, { fato: ['espirito', 'foi_ouvido', 3] }, { inclinar: ['proteger', 1] }], fx: { stats: { esp: 1 }, perfil: { devocao: 1 } } } },
      { id: 'testar', texto: 'Perguntar o que a voz quer em troca, antes de qualquer outra coisa.', teste: { stat: ['comp', 'esp'], dif: 0 },
        sucesso: { texto: 'A pergunta agrada {espirito.nome}. "Poucos pensam em preço antes de aceitar uma lição", diz. "Isso me dá esperança de que você sobreviva à lição." O preço, descobre-se depois, não é dinheiro: é uma promessa ainda sem forma.', efeitos: [{ papel: ['espirito', 'espirito'] }, { opiniao: ['espirito', 14] }, { fato: ['espirito', 'foi_testado', 3] }, { q: ['pacto_espirito', 1] }], fx: { perfil: { astucia: 2, cautela: 1 } } },
        falha: { texto: 'A voz ri, e a risada se arrasta no seu crânio como giz. "Esperto demais para o seu tamanho." {espirito.nome} não ofende, mas fica claro que acaba de anotar um ponto contra você. O anel esfria por uma noite inteira.', efeitos: [{ papel: ['espirito', 'espirito'] }, { opiniao: ['espirito', -4] }, { fato: ['espirito', 'foi_testado_mal', 2] }], fx: { perfil: { astucia: 1 } } } },
      { id: 'jogar', texto: 'Tirar o anel e enterrá-lo longe de casa.',
        res: { texto: 'O anel desce na terra úmida sem protestar. Mas à noite, uma coisa velha fica no ar como o cheiro de uma porta fechada de repente. Algumas heranças esperam. Esta, pelo menos, não vai embora de graça.', efeitos: [{ papel: ['espirito', 'espirito'] }, { opiniao: ['espirito', -12] }, { fato: ['espirito', 'foi_enterrado', 3] }, { q: ['espirito_enterrado', 1] }], fx: { karma: 1, perfil: { cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'heranca_licoes',
    titulo: 'As Lições de {espirito.nome}',
    tipo: 'preparo',
    capitulos: ['entrada', 'ascensao'],
    unico: true,
    papeis: { ...ESPIRITO },
    quando: { jogador: { reinoMin: 1 }, papel: { espirito: { vivo: true } } },
    relevancia: [{ se: { papel: { espirito: { opiniaoMin: 10 } } }, mais: 30 }],
    fio: { id: 'heranca', etapa: 2, abandono: 'As lições de {espirito.nome} ficaram pela metade, e a voz parou de insistir.' },
    cena: [
      { se: { papel: { espirito: { opiniaoMax: 0 } } }, texto: '{espirito.nome} ensina a contragosto, com frases curtas e uma frieza que parece castigo. Ainda assim, cada lição é exata. O que falta em calor sobra em ofício, e você aprende a separar uma coisa da outra.' },
      { texto: 'Todas as noites, depois da última tarefa, {espirito.nome} dá uma lição. Respiração, postura, o jeito de fechar um golpe antes de abri-lo. Tudo dito baixo, com a paciência de quem já ensinou tanta gente que esqueceu os rostos e guardou só o método.' },
    ],
    opcoes: [
      { id: 'aplicar', texto: 'Aplicar a lição à risca, sem acrescentar nada de si.', teste: { stat: ['dao', 'comp'], dif: 0 },
        sucesso: { texto: 'O corpo entende antes da cabeça. Na manhã seguinte, o Qi corre onde nunca correu, e {espirito.nome} resmunga um "razoável" que, vindo de quem vem, é um aplauso.', efeitos: [{ opiniao: ['espirito', 8] }, { fato: ['espirito', 'foi_bom_aluno', 3] }], fx: { xp: 22, stats: { dao: 1 }, perfil: { disciplina: 2 } } },
        falha: { texto: 'Um detalhe escapa, e o Qi se enrola como linha mal puxada. Dói. {espirito.nome} suspira, ensina de novo, e parece mais cansad{espirito.o} do que uma voz em um anel deveria conseguir ficar.', efeitos: [{ opiniao: ['espirito', -2] }], fx: { xp: 8, perfil: { disciplina: 1 } } } },
      { id: 'adaptar', texto: 'Adaptar a lição ao seu jeito, mesmo contra a instrução.', teste: { stat: ['comp', 'sor'], dif: 1 },
        sucesso: { texto: 'O ajuste não devia funcionar, e funciona. {espirito.nome} fica calado tanto tempo que você acha que o anel esfriou. "Faz séculos", diz, afinal, "que alguém me ensina uma coisa."', efeitos: [{ opiniao: ['espirito', 14] }, { fato: ['espirito', 'foi_surpreendido', 4] }], fx: { xp: 30, stats: { comp: 1 }, perfil: { astucia: 2, ambicao: 1 } } },
        falha: { texto: 'O ajuste desfaz a lição inteira, e o Qi bate de volta no peito. {espirito.nome} não grita. Diz: "Eu avisei", em um tom que o faria preferir o grito.', efeitos: [{ opiniao: ['espirito', -6] }, { fato: ['espirito', 'desobedeceu', 3] }], fx: { ferida: 2, perfil: { ambicao: 1 } } } },
      { id: 'perguntar', texto: 'Parar a lição e perguntar por que {espirito.nome} está tão dispost{espirito.o} a ensinar.', requer: { papel: { espirito: { opiniaoMin: 0 } } },
        res: { texto: '{espirito.nome} demora a responder. "Porque tudo o que sei vai morrer comigo, e a vaidade é a última coisa que um mestre perde." Mas desvia o olhar de um jeito que a voz não deveria permitir, e você fica com a certeza de que a resposta é só uma parte.', efeitos: [{ opiniao: ['espirito', 4] }, { fato: ['espirito', 'foi_questionado', 3] }, { inclinar: ['proteger', 1] }], fx: { perfil: { astucia: 1, compaixao: 1 } } } },
    ],
  }),

  molde({
    id: 'heranca_segredo',
    titulo: 'O Que {espirito.nome} Não Contou',
    tipo: 'personagem',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...ESPIRITO, seita: { faccao: { tipo: ['seita', 'culto'], estado: ['paz', 'tensao', 'guerra'] } } },
    quando: { jogador: { reinoMin: 2 }, papel: { espirito: { vivo: true } } },
    relevancia: [{ se: { papel: { espirito: { opiniaoMin: 20 } } }, mais: 25 }, { se: { papel: { espirito: { opiniaoMax: -10 } } }, mais: 25 }],
    fio: { id: 'heranca', etapa: 3, abandono: 'O segredo de {espirito.nome} nunca chegou a ser dito, e o anel continuou carregando o que ninguém quis ouvir.' },
    cena: [
      { se: { papel: { espirito: { opiniaoMin: 20 } } }, texto: 'Numa noite sem lua, {espirito.nome} fala menos que de costume, e quando fala é com o jeito de quem desamarrou um nó por dentro. "Há uma coisa que devo contar. Tive um nome, uma seita, uma culpa. A {seita.nome} sabe quem eu fui, e tem motivo para me querer de volta, em pedaços ou em cinzas."' },
      { se: { papel: { espirito: { opiniaoMax: -10 } } }, texto: 'Você descobre sozinh{jogador.o}, por um pergaminho velho da {seita.nome} e um boato, o que {espirito.nome} escondeu: foi ancião de uma seita extinta, culpado pela queda da própria seita. Quando você confronta a voz, {espirito.nome} não nega. Diz só: "Eu esperava mais tempo."' },
      { texto: 'A voz se cala no meio de uma lição, e o anel esquenta como brasa. {espirito.nome} fala com esforço: "Eu devia ter contado antes. Aquilo que me prende ao anel não foi acaso. Foi um castigo, e quem o aplicou ainda vive, na {seita.nome}."' },
    ],
    opcoes: [
      { id: 'perdoar', texto: 'Dizer que o passado de {espirito.nome} é problema de {espirito.nome}, e continuar.', requer: { papel: { espirito: { opiniaoMin: -9 } } },
        res: { texto: 'A voz fica quieta, e depois ri, pela primeira vez sem ironia. "Em seiscentos anos, ninguém me deu essa escolha." Daí em diante as lições têm um calor que antes faltava.', efeitos: [{ opiniao: ['espirito', 18] }, { fato: ['espirito', 'foi_perdoado', 5] }, { q: ['pacto_espirito', 1] }], fx: { karma: 2, perfil: { compaixao: 2, devocao: 1 } } } },
      { id: 'cobrar', texto: 'Exigir a verdade inteira, com nomes e datas, antes de seguir.', teste: { stat: ['car', 'dao'], dif: 1 },
        sucesso: { texto: 'A história vem inteira, e é pior do que a versão curta, e mais humana. {espirito.nome} não pede perdão: pede que você decida com o que sabe. Você anota tudo, e passa a olhar a {seita.nome} de um jeito diferente.', efeitos: [{ opiniao: ['espirito', 8] }, { fato: ['espirito', 'contou_tudo', 5] }, { reputacao: ['seita', -4] }, { q: ['segredo_espirito', 1] }], fx: { perfil: { astucia: 2 } } },
        falha: { texto: 'A pergunta sai dura demais. {espirito.nome} se fecha como concha: "Isso era meu para dar, não seu para tomar." Passam semanas sem uma palavra da voz, e o anel fica frio como um pedaço de rua.', efeitos: [{ opiniao: ['espirito', -12] }, { fato: ['espirito', 'foi_pressionado', 4] }], fx: { perfil: { disciplina: 1 } } } },
      { id: 'usar', texto: 'Guardar o segredo, e usá-lo quando for útil.',
        res: { texto: 'Você não diz o que sabe. {espirito.nome} sente, de algum modo, que o segredo mudou de mãos, e a partir daí cada conversa tem um segundo fundo. Informação guardada pesa, e aprende a cobrar juros.', efeitos: [{ opiniao: ['espirito', -8] }, { fato: ['espirito', 'foi_chantageado', 4] }, { q: ['segredo_espirito', 1] }, { inclinar: ['ascender_seita', 1] }], fx: { karma: -2, perfil: { astucia: 2, ganancia: 1 } } } },
    ],
  }),

  molde({
    id: 'heranca_caverna',
    titulo: 'A Caverna da Herança',
    tipo: 'perigo',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...ESPIRITO, gruta: { lugar: { tipo: ['gruta', 'ruinas', 'pico'] } } },
    quando: { jogador: { reinoMin: 3 }, papel: { espirito: { vivo: true } } },
    relevancia: [{ se: { fio: { heranca: { etapaMin: 3 } } }, mais: 35 }],
    combate: { oponente: 'golem', cenario: 'ruinas' },
    fio: { id: 'heranca', etapa: 4, abandono: 'A caverna ficou onde estava, e a herança com ela, à espera de alguém menos hesitante.' },
    cena: [
      { se: { q: { pacto_espirito: [1, undefined] } }, texto: '{espirito.nome} guia você por uma trilha que não existe em nenhum mapa, e termina em {gruta.nome}. "É aqui", diz a voz, quase em reverência. "Aqui deixei o que não pude levar. Mas há um guardião, e o guardião não sabe quem sou. Só sabe quem você é."' },
      { texto: 'O anel esquenta no dedo toda vez que você passa por {gruta.nome}, e no quarto dia {espirito.nome} desiste de fingir indiferença. "Entre. O que procuro está lá no fundo, e o que guarda a porta não pergunta nada, nunca."' },
    ],
    opcoes: [
      { id: 'lutar', texto: 'Enfrentar o guardião de frente.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 4 },
        sucesso: { texto: 'O guardião cai em pedaços de pedra que ainda mantêm, por um instante, a forma de homem. Dentro da câmara, um altar baixo guarda um rolo de seda e uma pílula que cheira a chuva antiga. {espirito.nome} fica em silêncio por tanto tempo que você chega a pensar que foi embora.', efeitos: [{ opiniao: ['espirito', 10] }, { fato: ['espirito', 'viu_a_camara', 5] }, { q: ['heranca_pega', 1] }], fx: { fama: 3, xp: 40, perfil: { violencia: 1, ambicao: 1 } } },
        falha: { texto: 'O guardião é mais velho que o seu medo e mais forte que a sua pressa. Você é arremessado pelo corredor, e quando acorda, {espirito.nome} está dizendo o seu nome, baixo, como se nunca tivesse feito isso.', efeitos: [{ opiniao: ['espirito', 4] }, { fato: ['espirito', 'cuidou_do_ferido', 3] }], fx: { ferida: 4, perfil: { disciplina: 1 } } } },
      { id: 'pacto', texto: 'Pedir que {espirito.nome} fale com o guardião, em nome de um pacto antigo.', requer: { q: { pacto_espirito: [1, undefined] } }, selo: 'Pacto com o espírito',
        res: { texto: 'A voz diz uma frase numa língua que ninguém fala há séculos, e o guardião se ajoelha. A câmara se abre sem luta, e o que havia no altar é entregue como quem devolve a um dono antigo. Há coisas que só se ganham por honestidade; esta é uma delas.', efeitos: [{ opiniao: ['espirito', 16] }, { fato: ['espirito', 'foi_reconhecido', 5] }, { q: ['heranca_pega', 1] }], fx: { karma: 2, xp: 30, perfil: { devocao: 2 } } } },
      { id: 'recuar', texto: 'Recuar. A herança pode esperar.',
        res: { texto: 'A boca da caverna fica para trás, e {espirito.nome} não diz nada durante dias. Não é raiva; é cansaço de quem esperou muito e aprendeu a esperar mais. "Prudência", diz, afinal, "é o nome que damos ao medo quando o medo é bem-sucedido."', efeitos: [{ opiniao: ['espirito', -6] }, { fato: ['espirito', 'viu_o_jogador_recuar', 3] }], fx: { perfil: { cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'heranca_escolha',
    titulo: 'O Preço do Anel',
    tipo: 'climax',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { ...ESPIRITO },
    quando: { papel: { espirito: { vivo: true } }, jogador: { reinoMin: 3 } },
    relevancia: [{ se: { q: { heranca_pega: [1, undefined] } }, mais: 60 }, { se: { fio: { heranca: { etapaMin: 4 } } }, mais: 30 }],
    fio: { id: 'heranca', etapa: 5, abandono: 'O anel foi parar numa gaveta de herança, e a escolha foi tomada pelo tempo, que é o pior dos conselheiros.' },
    cena: [
      { se: { q: { heranca_pega: [1, undefined] }, papel: { espirito: { opiniaoMin: 25 } } }, texto: 'Com o rolo e a pílula diante de vocês, {espirito.nome} fala sem a voz de mestre. "A pílula me liberta do anel, mas gasta a herança. O rolo faz de você o que eu fui, mas me prende para sempre. Não vou escolher por você. Já escolhi tantas vezes por tantos outros."' },
      { se: { q: { heranca_pega: [1, undefined] } }, texto: 'A pílula e o rolo repousam diante de você. {espirito.nome} fala com a frieza de quem já fez as contas. "A pílula me liberta, e eu parto. O rolo faz de você o que eu fui, e eu fico. Ninguém vai julgar o que escolher. Só vão lembrar."' },
      { texto: '{espirito.nome} deixa de falar durante três dias. No quarto, diz: "O tempo acabou. Posso morrer no anel, ou você pode escolher o que fazer com o que sou. Peço uma coisa só: que seja uma escolha, e não um acidente."' },
    ],
    opcoes: [
      { id: 'libertar', texto: 'Libertar {espirito.nome}, mesmo gastando a herança.', requer: { q: { heranca_pega: [1, undefined] } },
        res: { texto: 'A pílula se desfaz na língua como chuva. O anel racha com um som de gelo, e {espirito.nome} sai do anel pela primeira vez em séculos: um vulto, depois um homem ou uma mulher, depois só luz. "Obrigad{espirito.o}", diz, e a palavra pesa mais que a herança que ficou para trás.', efeitos: [{ fato: ['espirito', 'foi_libertado', 5] }, { opiniao: ['espirito', 30] }, { situacao: ['espirito', 'partiu'] }, { fio: ['heranca', 'fechar:libertou'] }, { noticia: 'Dizem que um anel de ferro se partiu numa noite sem lua, e que algo muito velho finalmente descansou.' }], fx: { karma: 6, fama: 3, perfil: { compaixao: 3, devocao: 2 } } } },
      { id: 'absorver', texto: 'Ler o rolo e herdar o que {espirito.nome} foi.', requer: { q: { heranca_pega: [1, undefined] } },
        res: { texto: 'As palavras do rolo entram pelos olhos e se sentam no peito. Por um instante, você é duas pessoas, depois uma só, mais velha do que devia ser. {espirito.nome} não se despede: agora fala de dentro, quando precisa. O Dao desce sobre você com um peso que não é seu, e que passa a ser.', efeitos: [{ fato: ['espirito', 'foi_absorvido', 5] }, { opiniao: ['espirito', 5] }, { fio: ['heranca', 'fechar:absorveu'] }, { inclinar: ['ascender_seita', 1] }], fx: { xp: 70, fama: 4, stats: { dao: 2, esp: 1 }, perfil: { ambicao: 2, disciplina: 1 } } } },
      { id: 'vender', texto: 'Vender a herança e o anel ao Pavilhão dos Tesouros.', requer: { q: { heranca_pega: [1, undefined] } },
        res: { texto: 'O preço é alto, e a cara do comprador não muda. Você sai com pedras suficientes para comprar a décima parte de uma seita. Quando se vira, o anel já não está no balcão. A voz, se ainda existe, está agora na mão de quem não vai perguntar seu nome.', efeitos: [{ fato: ['espirito', 'foi_vendido', 5] }, { opiniao: ['espirito', -40] }, { situacao: ['espirito', 'preso'] }, { fio: ['heranca', 'fechar:vendeu'] }], fx: { pedras: 800, karma: -6, perfil: { ganancia: 3 } } } },
      { id: 'dispensar', texto: 'Não escolher nenhum dos dois: guardar o anel e seguir com a dúvida.',
        res: { texto: 'O anel volta ao dedo, frio como uma pedra do rio. {espirito.nome} não protesta. Decide, em silêncio, que a dúvida também é uma resposta, e que a espera, às vezes, é o único modo de não perder nada.', efeitos: [{ fato: ['espirito', 'ficou_no_anel', 4] }, { fio: ['heranca', 'fechar:adiado'] }], fx: { perfil: { cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'mestre_segredo',
    titulo: 'O Passado de {mestre.nome}',
    tipo: 'personagem',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { mestre: { pessoa: { papel: 'mestre', vivo: true } }, seita: { faccao: { de: 'mestre' }, opcional: true } },
    quando: { jogador: { reinoMin: 2 }, papel: { mestre: { vivo: true, opiniaoMin: 10 } } },
    relevancia: [{ se: { papel: { mestre: { opiniaoMin: 30 } } }, mais: 30 }],
    fio: { id: 'mestre', espaco: 3, abandono: 'O que {mestre.nome} carregava ficou sem ser dito, e o tempo guardou o segredo melhor do que qualquer cofre.' },
    cena: 'Você descobre, por um pergaminho velho e um boato de estalagem, que {mestre.nome} foi parte de algo que prefere não nomear: uma seita extinta, um erro, um dia em que {mestre.ele} escolheu mal. O que {mestre.ele} ensinou, no fundo, era penitência. Nunca contou, e você sente que chegou a hora de decidir o que fazer com isso.',
    opcoes: [
      { id: 'perguntar', texto: 'Perguntar a {mestre.nome} diretamente, sem rodeios.', teste: { stat: ['car', 'dao'], dif: 0 },
        sucesso: { texto: '{mestre.nome} olha para a parede por um longo minuto, e depois conta tudo, sem enfeite e sem desculpa. Quando acaba, diz: "Eu esperava que fosse você a perguntar." Algo se afrouxa no ar entre vocês, e a lição seguinte tem outro peso.', efeitos: [{ opiniao: ['mestre', 16] }, { fato: ['mestre', 'contou_o_passado', 5] }], fx: { karma: 2, perfil: { devocao: 2, compaixao: 1 } } },
        falha: { texto: '{mestre.nome} fecha o rosto, e a resposta vem curta: "Isso é meu." A porta não bate, mas o silêncio faz o mesmo som. Por semanas, as lições são exatas e frias, e nenhum dos dois toca no assunto.', efeitos: [{ opiniao: ['mestre', -8] }, { fato: ['mestre', 'foi_pressionado', 4] }], fx: { perfil: { disciplina: 1 } } } },
      { id: 'calar', texto: 'Guardar o segredo e fingir que nada sabe.',
        res: { texto: 'Você cumprimenta {mestre.nome} como sempre, e por dentro passa a ler cada gesto de outro jeito. Um segredo guardado por quem se ama é uma forma discreta de lealdade, e uma forma discreta de distância.', efeitos: [{ opiniao: ['mestre', 2] }, { fato: ['mestre', 'foi_poupado_da_pergunta', 3] }], fx: { perfil: { astucia: 1, devocao: 1 } } } },
      { id: 'trair', texto: 'Usar o segredo para ganhar posição na seita.', requer: { papel: { mestre: { vivo: true } } },
        res: { texto: 'O segredo muda de dono sem barulho. A seita se arruma em torno da nova verdade, e {mestre.nome} vê o próprio passado passar de mão em mão. Quando percebe quem o soltou, não grita. Diz apenas o seu nome, uma vez, e nunca mais.', efeitos: [{ opiniao: ['mestre', -50] }, { fato: ['mestre', 'foi_traido_pelo_aluno', 5] }, { situacao: ['mestre', 'caido'] }, { reputacao: ['seita', 6] }, { fio: ['mestre', 'fechar:rompido'] }], fx: { fama: 3, karma: -5, perfil: { ganancia: 2, astucia: 2 } } } },
    ],
  }),

  molde({
    id: 'heranca_epilogo',
    titulo: 'O Que Ficou do Anel',
    tipo: 'consequencia',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { ...ESPIRITO },
    quando: { fio: { heranca: { resolvido: true } } },
    relevancia: [{ se: { fio: { heranca: { resolvido: true } } }, mais: 60 }],
    cena: [
      { se: { fio: { heranca: { desfecho: ['libertou'] } } }, texto: 'Meses depois, uma carta chega sem remetente, escrita numa letra antiga: "Obrigado pela noite sem lua. Há uma coisa que um velho deixou para você debaixo da terceira pedra do poço." Não há mais nada, nem precisa. Algumas gratidões são só um nome dito uma vez, do outro lado.' },
      { se: { fio: { heranca: { desfecho: ['absorveu'] } } }, texto: 'Às vezes, quando você pensa em algo, a ideia vem num tom que não é seu. Dá bons conselhos, quase sempre. {espirito.nome} não se despediu, e você aprendeu a distinguir, aos poucos, onde termina o que lembra e começa o que decide.' },
      { se: { fio: { heranca: { desfecho: ['vendeu'] } } }, texto: 'O dinheiro ainda está lá, em boa parte. O que não está é a sensação de ter ganho algo. Em noites de chuva, você ouve, sem ouvir, uma voz de velho que dizia o seu nome como se valesse a pena. Algumas contas ficam abertas para sempre, mesmo pagas.' },
      { texto: 'O anel está no dedo, ou numa gaveta, ou no fundo de um rio. Você já não sabe. A voz ficou calada, e você, curiosamente, passa a sentir saudade de uma coisa que nunca decidiu ter.' },
    ],
    opcoes: [
      { id: 'segue', texto: 'Seguir em frente.', res: { texto: 'A vida continua, com ou sem herança. Você aprende, aos poucos, a medir o tempo por outras coisas.', efeitos: [], fx: {} } },
    ],
  }),
];
