import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Cenas que dão corpo à vida entre os arcos: respiros ligados ao mundo (boatos reais, o rival na estalagem),
 * perigos da infância, o arco do mestre e as cenas que faltavam nos arcos do clã e do rival.
 */
const TODOS = ['infancia', 'despertar', 'entrada', 'ascensao', 'crise', 'legado'] as const;

export const EXTRAS: Molde[] = [
  /* ---------- Respiros ligados ao mundo ---------- */
  molde({
    id: 'respiro_boato', titulo: 'O Boato do Dia', tipo: 'respiro', capitulos: ['despertar', 'entrada', 'ascensao', 'crise', 'legado'], cooldown: 5,
    cena: [
      { tom: 'sombrio', texto: '{vez2:Outra noite de boatos na estalagem, e desta vez você escuta de um jeito diferente. }Na estalagem, entre cerveja e fumaça, o boato do dia chega pela boca de quem não quer ser reconhecido: {mundo.noticia}. Ninguém ri. As mesas vizinhas calam, uma a uma, como quem escuta o mesmo trovão de longe.' },
      { tom: 'ironico', texto: '{vez2:Outra noite de boatos na estalagem, e desta vez você escuta de um jeito diferente. }Na estalagem, o boato do dia é servido junto com o arroz: {mundo.noticia}. Cada mesa tem a sua versão, e a de cada uma é, com certeza, a única verdadeira. Alguém aposta um prato que a de baixo está errada.' },
      { texto: '{vez2:Outra noite de boatos na estalagem, e desta vez você escuta de um jeito diferente. }Na estalagem, entre cerveja e fumaça, o boato do dia é este: {mundo.noticia}. Cada mesa tem uma versão, e você, que escuta com mais atenção do que fala, junta as partes.' },
    ],
    opcoes: [
      { id: 'escutar', texto: 'Escutar com atenção, sem perguntar nada.', res: { texto: 'A noite rende pouco em palavras e muito em pistas: quem vem de onde, quem cala quando um nome é dito, quem paga a rodada seguinte. Você sai com uma ideia mais clara do mundo, e com a sensação de que ele é menor do que parece.', fx: { stats: { comp: 1 }, perfil: { astucia: 1 } } } },
      { id: 'rodada', texto: 'Pagar uma rodada para ouvir mais.', custo: 8, res: { texto: 'A língua dos outros afrouxa em proporção à bebida. Quando a noite acaba, você sabe de três coisas que não devia, e uma que talvez venha a precisar. O valor de uma rodada é sempre maior do que o preço.', efeitos: [{ inclinar: ['superar_rival', 0] }], fx: { fama: 1, perfil: { astucia: 1, ganancia: -1 } } } },
      { id: 'ignorar', texto: 'Comer em silêncio e fingir desinteresse.', res: { texto: 'Comer sozinh{jogador.o} entre gente que fala é uma forma de ficar a salvo. Você paga, agradece, sai. O boato cresce, longe de você, e vai encontrá-lo mais tarde de outro jeito.', fx: { stats: { dao: 1 }, perfil: { cautela: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_estalagem_rival', titulo: '{rival.nome} na Estalagem', tipo: 'personagem', capitulos: ['entrada', 'ascensao', 'crise'], cooldown: 9,
    papeis: { rival: { pessoa: { papel: 'rival', vivo: true } } },
    quando: { jogador: { reinoMin: 1 } },
    relevancia: [{ se: { papel: { rival: { opiniaoMax: -20 } } }, mais: 12 }],
    cena: [
      { se: { papel: { rival: { opiniaoMax: -20 } } }, texto: '{vez2:De novo na estalagem, e de novo {rival.nome} na mesa do fundo, como se o mundo só tivesse aquele lugar. }{rival.nome} está sentado ao fundo da estalagem, de costas para a parede, como quem aprendeu a nunca dar as costas a ninguém. Quando você entra, a conversa {rival.dele} com o taverneiro diminui. Os olhares se cruzam, e o {rival.dele} diz: "{rival.Trato}, que coincidência." O resto da sala ouve.' },
      { se: { papel: { rival: { opiniaoMin: 15 } } }, texto: '{vez2:De novo na estalagem, e de novo {rival.nome} na mesa do fundo, como se o mundo só tivesse aquele lugar. }{rival.nome} acena de uma mesa do fundo, com um sorriso quase envergonhado. Ficou entre vocês uma coisa que nenhum dos dois soube chamar. {rival.Ele} afasta uma cadeira com o pé, sem dizer nada, e você entende o convite.' },
      { texto: '{vez2:De novo na estalagem, e de novo {rival.nome} na mesa do fundo, como se o mundo só tivesse aquele lugar. }{rival.nome} está na estalagem, com a postura de quem vive em outro compasso. Vocês se veem, sem se cumprimentar, e ficam os dois, durante muito tempo, fingindo prestar atenção em outra coisa. É sempre assim, quando dois caminhos se cruzam sem querer.' },
    ],
    opcoes: [
      { id: 'mesa', texto: 'Dividir a mesa com {rival.ele}, e falar de qualquer coisa.', res: { texto: 'A conversa começa por clima, passa por preço de arroz, termina em lembrança de infância. Nenhum dos dois toca no assunto de verdade. Mas há uma trégua esquisita no ar, e vocês saem separados, sem pressa de voltar à briga.', efeitos: [{ opiniao: ['rival', 6] }, { fato: ['rival', 'dividiu_a_mesa', 2] }], fx: { karma: 1, perfil: { compaixao: 1 } } } },
      { id: 'ignorar', texto: 'Ignorá-lo, e escolher uma mesa longe.', res: { texto: 'Você escolhe a mesa mais distante, e sente as costas {rival.dele} a noite inteira. Ninguém diz nada. A rivalidade cresce no silêncio, como mofo em lugar fechado.', efeitos: [{ opiniao: ['rival', -3] }, { fato: ['rival', 'foi_ignorado_na_estalagem', 1] }], fx: { perfil: { cautela: 1 } } } },
      { id: 'provocar', texto: 'Provocá-lo de leve, para ver como reage diante de testemunhas.', teste: { stat: ['car', 'sor'], dif: 0 },
        sucesso: { texto: 'A provocação é elegante, o suficiente para fazer a sala rir sem humilhar. {rival.nome} responde à altura, e vocês saem empatados, com o respeito mútuo de dois bons espadachins que se medem sem sacar.', efeitos: [{ opiniao: ['rival', -2] }, { reputacao: ['rival', 0] }], fx: { fama: 1, perfil: { astucia: 1, ambicao: 1 } } },
        falha: { texto: 'A frase sai mais pesada do que você queria, e {rival.nome} fecha o rosto. "Eu me lembro disso", diz, baixo. A sala percebe, e {rival.ele} percebe que a sala percebeu.', efeitos: [{ opiniao: ['rival', -14] }, { fato: ['rival', 'foi_provocado_em_publico', 3] }], fx: { perfil: { ambicao: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_mercado', titulo: 'O Mercado de Cultivadores', tipo: 'respiro', capitulos: ['entrada', 'ascensao', 'crise'], cooldown: 7,
    papeis: { assoc: { faccao: { tipo: ['associacao'] } } },
    cena: '{vez2:O mercado de cultivadores outra vez, com as mesmas bancas e preços novos. }O mercado de cultivadores acontece a cada estação, e a {assoc.nome} controla as melhores bancas. Vende-se de tudo: pílulas, talismãs, mapas falsos, manuais emprestados. Os preços sobem em proporção ao número de curiosos, e os curiosos, em proporção à promessa de segredo.',
    opcoes: [
      { id: 'talisma', texto: 'Comprar um talismã de escudo.', custo: 20, res: { texto: 'O talismã é pequeno, de papel amarelo, escrito com tinta cara. Pelo preço, é um bom negócio, e ao mesmo tempo, uma lembrança de que a segurança sempre tem um preço, e de que alguém sempre fica sem.', efeitos: [{ reputacao: ['assoc', 2] }], fx: { item: ['talisma_escudo'], perfil: { cautela: 1, ganancia: 1 } } } },
      { id: 'barganhar', texto: 'Barganhar por um manual usado.', teste: { stat: ['car', 'sor'], dif: 0 },
        sucesso: { texto: 'O vendedor cede, com a resmungada de quem vende barato o que já não lê. O manual é velho, mas as anotações nas margens valem mais que o texto. Você passa a noite lendo, com um sorriso.', efeitos: [{ reputacao: ['assoc', 3] }], fx: { xp: 4, stats: { comp: 1 }, perfil: { astucia: 1 } } },
        falha: { texto: 'O vendedor percebe o seu interesse, e o preço dobra. Você sai sem manual, com a certeza de que foi lido, e de que a lição custou menos que o livro.', fx: { perfil: { cautela: 1 } } } },
      { id: 'olhar', texto: 'Só olhar, e deixar o mercado passar.', res: { texto: 'Você anda entre bancas, sem comprar nada, e vê mais do que quem compra: quem negocia com quem, que nome se repete, que banca tem guarda demais. O mercado, de longe, é um mapa do mundo.', fx: { stats: { comp: 1 }, perfil: { astucia: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_chuva', titulo: 'A Chuva Que Veio Cedo', tipo: 'respiro', capitulos: TODOS as unknown as ('infancia' | 'despertar' | 'entrada' | 'ascensao' | 'crise' | 'legado')[], cooldown: 6,
    cena: [
      { tom: 'lirico', texto: '{vez2:A chuva chega de novo antes da hora, e você a reconhece como se fosse uma velha conhecida. }A chuva chega cedo, e com ela, um silêncio que só a água sabe dar. Você ouve cada gota no telhado como quem ouve um conhecido contar uma história antiga. Há momentos em que o mundo se explica sozinho, se você deixar.' },
      { tom: 'sombrio', texto: '{vez2:A chuva chega de novo antes da hora, e você a reconhece como se fosse uma velha conhecida. }A chuva chega cedo e não tem pressa de ir embora. A água escorre pelas paredes como se procurasse alguma coisa, e o cheiro de terra molhada traz de volta coisas que você achava que tinha enterrado.' },
      { texto: '{vez2:A chuva chega de novo antes da hora, e você a reconhece como se fosse uma velha conhecida. }A chuva chega cedo, e o dia, de repente, muda de ritmo. Os campos se esvaziam, as estradas viram lama, e quem tem teto fica com ele. Você, que tem, fica.' },
    ],
    opcoes: [
      { id: 'meditar', texto: 'Meditar ouvindo a água.', res: { texto: 'O Qi acompanha o ritmo da chuva, e quando você abre os olhos, a tarde já se foi. Parte do cansaço, e parte do que carregava, ficou lá, junto das poças.', fx: { xp: 4, stats: { esp: 1 }, perfil: { disciplina: 1 } } } },
      { id: 'sair', texto: 'Sair na chuva, sem capa, e deixar a água lavar o dia.', res: { texto: 'Você volta ensopado, rindo, com os pés cheios de lama e a cabeça vazia. Há dias em que a melhor técnica é a mais simples.', fx: { stats: { sor: 1 }, perfil: { compaixao: 1 } } } },
      { id: 'ler', texto: 'Ficar dentro, relendo o que já sabe.', res: { texto: 'A leitura de sempre rende uma linha nova, que você não tinha visto antes. É o que torna uma releitura mais valiosa que uma leitura: o texto muda, porque você mudou.', fx: { xp: 3, stats: { comp: 1 }, perfil: { disciplina: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_visita', titulo: 'Uma Visita a {parente.nome}', tipo: 'personagem', capitulos: ['despertar', 'entrada', 'ascensao'], cooldown: 8,
    papeis: { parente: { pessoa: { papel: 'parente', vivo: true } } },
    cena: [
      { se: { papel: { parente: { opiniaoMin: 50 } } }, texto: '{vez2:Mais uma visita, e a distância entre vocês ficou mais fácil de medir. }Você volta a ver {parente.nome}. A casa tem o mesmo cheiro, e {parente.nome} parece menor e mais frágil do que na lembrança. Há uma panela no fogo, e uma cadeira vazia que já foi sua. Não perguntam onde você andou. Sabem que você vai contar o que puder.' },
      { texto: '{vez2:Mais uma visita, e a distância entre vocês ficou mais fácil de medir. }Você volta a ver {parente.nome}, depois de muito tempo. A casa mudou, e {parente.nome} também. Há uma cerimônia no cumprimento, uma cautela, e uma pergunta suspensa no ar: quem você se tornou?' },
    ],
    opcoes: [
      { id: 'ficar', texto: 'Ficar alguns dias, ajudar no que precisar.', res: { texto: 'Os dias passam em tarefas pequenas, e cada uma é um tipo de conversa. Quando você parte, {parente.nome} não chora, mas ficou olhando a estrada mais tempo do que o razoável.', efeitos: [{ opiniao: ['parente', 12] }, { fato: ['parente', 'foi_visitado', 3] }, { inclinar: ['proteger', 1] }], fx: { karma: 1, pedras: -5, perfil: { compaixao: 1, devocao: 1 } } } },
      { id: 'pedras', texto: 'Deixar um pouco de dinheiro e seguir viagem.', res: { texto: 'O dinheiro é aceito sem discussão, com um aceno curto. É uma forma de cuidado, e uma forma de ausência. {parente.nome} sabe, e você sabe, e nenhum dos dois comenta.', efeitos: [{ opiniao: ['parente', 4] }, { fato: ['parente', 'recebeu_dinheiro', 2] }], fx: { pedras: -15, perfil: { cautela: 1 } } } },
      { id: 'contar', texto: 'Contar a {parente.nome} tudo o que viu, e o que tem medo de ver.', res: { texto: '{parente.nome} escuta sem interromper, e quando você acaba, não dá conselho. Dá chá. É o melhor que ninguém lhe deu em muito tempo.', efeitos: [{ opiniao: ['parente', 10] }, { fato: ['parente', 'foi_confidente', 3] }], fx: { stats: { dao: 1 }, perfil: { compaixao: 1, devocao: 1 } } } },
    ],
  }),

  molde({
    id: 'respiro_pico', titulo: 'O Pico Onde Ninguém Sobe', tipo: 'respiro', capitulos: ['ascensao', 'crise', 'legado'], cooldown: 8,
    quando: { jogador: { reinoMin: 3 } },
    cena: [
      { tom: 'lirico', texto: '{vez2:Você volta ao pico, e o vento parece lembrar de você. }Você sobe ao pico onde ninguém sobe, e o mundo se abre, miniatura. Lá embaixo, uma seita parece um brinquedo, uma cidade, um formigueiro. Alguém contou, uma vez, que a notícia do dia era {mundo.noticia}. Daqui, isso parece pequeno.' },
      { texto: '{vez2:Você volta ao pico, e o vento parece lembrar de você. }Você sobe ao pico onde ninguém sobe, e o vento corta mais do que o frio. Lá embaixo, o mundo continua, com as suas guerras e feiras. Ouvi dizer que {mundo.noticia}. Daqui, tudo parece pequeno, e ao mesmo tempo, muito próximo.' },
    ],
    opcoes: [
      { id: 'contemplar', texto: 'Ficar o dia inteiro contemplando.', res: { texto: 'O dia passa como um olhar longo. Quando você desce, está mais leve, ou mais pesado, e nem você sabe qual. A altura ensina o que a planície esconde: que tudo é pequeno, e que isso não tira o valor de nada.', fx: { xp: 6, stats: { dao: 2 }, perfil: { disciplina: 1, devocao: 1 } } } },
      { id: 'treinar', texto: 'Treinar no ar rarefeito, até o corpo pedir trégua.', res: { texto: 'O ar é fino, e cada respiração é uma decisão. O corpo, sob pressão, descobre limites que não conhecia. Quando você desce, uma coisa em você mudou de lugar.', fx: { xp: 8, ferida: 1, stats: { fis: 1 }, perfil: { disciplina: 2 } } } },
    ],
  }),

  /* ---------- Perigos da infância e da juventude ---------- */
  molde({
    id: 'perigo_lobo', titulo: 'Olhos na Floresta', tipo: 'perigo', capitulos: ['infancia', 'despertar'], unico: true,
    papeis: { amigo: { pessoa: { papel: 'amigo', vivo: true }, opcional: true } },
    quando: { jogador: { idadeMin: 8, reinoMax: 1 } },
    combate: { oponente: 'lobo', cenario: 'selva' },
    cena: 'Ao recolher lenha, você sente que é observado. Entre as árvores, dois olhos amarelos acompanham cada passo seu. O lobo não rosna, e é isso que assusta: {amigo.ele} está calculando. Você se lembra de todos os conselhos que já ouviu, e nenhum deles cabe numa criança.',
    opcoes: [
      { id: 'voltar', texto: 'Voltar devagar pelo caminho conhecido, sem dar as costas.', res: { texto: 'Cada passo é uma eternidade, e o lobo não o segue. Quando as primeiras casas aparecem, você se dá conta de que estava prendendo a respiração desde o início. A prudência, às vezes, é o único herói.', fx: { stats: { dao: 1 }, perfil: { cautela: 2 } } } },
      { id: 'enfrentar', texto: 'Enfrentar o lobo com um pedaço de lenha.', teste: { stat: ['fis', 'sor'], tag: 'combate', dif: 2 },
        sucesso: { texto: 'A lenha acerta no focinho, e o lobo, surpreso, recua. É o tipo de sorte que a vila repete por anos. Você volta para casa com as mãos tremendo, e uma história para contar que ninguém acredita.', efeitos: [{ opiniao: ['amigo', 6] }], fx: { fama: 2, stats: { fis: 1, dao: 1 }, perfil: { violencia: 1 } } },
        falha: { texto: 'A lenha rola, e o lobo avança. Quando acaba, você está no chão, com um braço rasgado e um pavor novo. Um caçador, ouvindo os gritos, espanta o bicho, e você ouve a palavra "tolo" dita com ternura.', fx: { ferida: 2, perfil: { violencia: 1 } } } },
      { id: 'gritar', texto: 'Gritar pelo nome de {amigo.nome}, que estava por perto.', requer: { papel: { amigo: { vivo: true } } },
        res: { texto: '{amigo.nome} chega correndo, de pau na mão, com um grito ainda maior que o seu. O lobo, diante de dois barulhos, decide que o jantar não valia a pena. Vocês voltam juntos, sem falar, tremendo os dois.', efeitos: [{ opiniao: ['amigo', 12] }, { fato: ['amigo', 'enfrentou_o_lobo_junto', 4] }], fx: { stats: { car: 1 }, perfil: { compaixao: 1, devocao: 1 } } } },
    ],
  }),

  molde({
    id: 'perigo_febre', titulo: 'A Febre Que Veio de Fora', tipo: 'perigo', capitulos: ['infancia', 'despertar', 'entrada'], unico: true,
    papeis: { parente: { pessoa: { papel: 'parente', vivo: true } } },
    quando: { jogador: { idadeMin: 9 } },
    cena: 'Uma febre estranha chega à vila na carroça de um mercador, e em três dias metade das casas está de cama. {parente.nome} é um dos primeiros a adoecer. O curandeiro balança a cabeça, sem prometer nada. Você olha para o rosto de {parente.nome}, suado e pálido, e entende que o que for feito agora, será feito por você.',
    opcoes: [
      { id: 'cuidar', texto: 'Cuidar de {parente.nome} noite e dia, com panos molhados e chá de erva amarga.', teste: { stat: ['comp', 'sor'], dif: 1 },
        sucesso: { texto: 'No quarto dia, a febre cede. {parente.nome} abre os olhos e pede água, e você chora, de repente, sem saber por quê. A casa volta a cheirar a comida, e os dias ganham outro valor.', efeitos: [{ opiniao: ['parente', 20] }, { fato: ['parente', 'foi_curado_pelo_jogador', 5] }, { inclinar: ['proteger', 2] }], fx: { karma: 2, stats: { comp: 1 }, perfil: { compaixao: 2, devocao: 1 } } },
        falha: { texto: 'A febre vence. {parente.nome} parte numa madrugada de chuva, com a mão na sua. Não houve culpa, só a doença, que não escolhe. Mas você carrega o que poderia ter feito de outro modo, e o que ficou por dizer.', efeitos: [{ morte: 'parente', causa: 'uma febre longa' }, { q: ['perdas', 1] }, { inclinar: ['reerguer_cla', 1] }], fx: { stats: { dao: 1 }, perfil: { compaixao: 1 } } } },
      { id: 'curandeira', texto: 'Ir buscar a curandeira da cidade vizinha, a pé, e pagar o que {parente.ele} pedir.', custo: 25, teste: { stat: ['fis', 'sor'], dif: 0 },
        sucesso: { texto: 'A caminhada é longa, o preço é caro, e a curandeira, uma velha com cheiro de ervas, vem sem reclamar. O remédio {parente.dele} funciona em dois dias. Você aprendeu, de brinde, que há coisas que só o dinheiro e a pressa curam juntos.', efeitos: [{ opiniao: ['parente', 15] }, { fato: ['parente', 'foi_salvo_pela_curandeira', 4] }], fx: { karma: 1, perfil: { compaixao: 1 } } },
        falha: { texto: 'Você chega tarde. A curandeira examina {parente.nome}, balança a cabeça, e deixa um chá que ajuda a morrer sem dor. É o último gesto de bondade que {parente.ele} sabe dar, e você a respeita por isso.', efeitos: [{ morte: 'parente', causa: 'uma febre longa' }, { q: ['perdas', 1] }, { inclinar: ['vingar_cla', 1] }], fx: { ferida: 1, perfil: { compaixao: 1 } } } },
      { id: 'ficar', texto: 'Ficar longe, por medo do contágio.', res: { texto: 'Você deixa comida à porta e se afasta. A febre passa, ou não, e você aprende, de longe, o que é a covardia dos prudentes. {parente.nome} sobrevive, e nunca fala sobre isso, o que é pior.', efeitos: [{ opiniao: ['parente', -12] }, { fato: ['parente', 'foi_deixado_sozinho', 4] }], fx: { karma: -1, perfil: { cautela: 2 } } } },
    ],
  }),

  /* ---------- Arco do mestre (fio `mestre`) ---------- */
  molde({
    id: 'mestre_licao', titulo: 'A Lição de {mestre.nome}', tipo: 'preparo', capitulos: ['entrada', 'ascensao'], unico: true,
    papeis: { mestre: { pessoa: { papel: 'mestre', vivo: true } } },
    quando: { jogador: { reinoMin: 1 } },
    fio: { id: 'mestre', etapa: 2, abandono: 'O mestre ainda tinha o que ensinar, e o discípulo seguiu sem ouvir.' },
    cena: [
      { se: { papel: { mestre: { trilha: ['espada'] } } }, texto: '{mestre.nome} entrega a você uma espada de madeira e uma folha de bambu. "Corte a folha no ar", diz. "Sem tocá-la." Você tenta durante horas, e a folha cai inteira. {mestre.Ele} sorri, pela primeira vez. "É assim que se aprende que a espada é a última coisa que a espada precisa."' },
      { se: { papel: { mestre: { trilha: ['alquimia'] } } }, texto: '{mestre.nome} faz você refinar a mesma pílula de Qi vinte vezes seguidas, sem dizer o que está errado. Na vigésima, a chama faz alguma coisa diferente, e {mestre.nome} para de mexer o caldeirão. "Agora você viu o fogo", diz. "O resto é paciência."' },
      { se: { papel: { mestre: { trilha: ['corpo'] } } }, texto: '{mestre.nome} manda você carregar uma pedra ladeira acima, descê-la e subi-la de novo, até o sol se pôr. Não explica. No fim, apenas dá um tapa nas suas costas, com uma força de quem sabe quanta dor o outro aguenta, e acrescenta: "Amanhã, uma maior."' },
      { se: { papel: { mestre: { trilha: ['formacoes'] } } }, texto: '{mestre.nome} desenha uma linha no chão e pede que você a atravesse sem tocá-la. Você pula, rasteja, tenta. Não consegue. "A linha não está no chão", diz, calmo. "Está em quem a vê." Você passa a noite entendendo a frase, e quase a entende.' },
      { se: { papel: { mestre: { trilha: ['venenos'] } } }, texto: '{mestre.nome} oferece duas xícaras e pergunta qual contém o veneno. Você escolhe, pensa, escolhe de novo. As duas contêm. "A pergunta nunca era essa", diz, e bebe de uma, com tranquilidade. "Era se você sabia o que fazer depois."' },
      { texto: '{mestre.nome} ensina em silêncio, mais pelo exemplo do que pela fala. Há dias em que você aprende dez coisas, e dias em que aprende só uma, mas essa uma é, depois, a mais importante. Você começa a entender que mestre é quem sabe quando não dizer.' },
    ],
    opcoes: [
      { id: 'repetir', texto: 'Repetir o exercício até acertar, sem reclamar.', teste: { stat: ['dao', 'comp'], dif: 0 },
        sucesso: { texto: 'Algo se encaixa, no meio da tarde, quando você já não esperava. {mestre.nome} não diz nada. Mas aquele dia, no jantar, serve a você a primeira tigela, o que, para {mestre.ele}, é um discurso.', efeitos: [{ opiniao: ['mestre', 12] }, { fato: ['mestre', 'foi_paciente', 3] }, { inclinar: ['ascender_seita', 1] }], fx: { rec: 1, xp: 6, stats: { dao: 1 }, perfil: { disciplina: 2 } } },
        falha: { texto: 'O exercício continua teimando, e a paciência se esgota. {mestre.nome} observa, sem comentar, e quando você finalmente larga o instrumento, {mestre.ele} só diz: "Amanhã." O que {mestre.ele} quer dizer é: tente de novo.', efeitos: [{ opiniao: ['mestre', 2] }], fx: { xp: 3, perfil: { disciplina: 1 } } } },
      { id: 'perguntar', texto: 'Perguntar a {mestre.nome} por que {mestre.ele} ensina assim.', res: { texto: '{mestre.nome} demora a responder. "Porque me ensinaram assim", diz, afinal, "e porque funcionou comigo. Mas não sei se funciona com você." É a coisa mais honesta que um mestre já disse, e você passa a confiar {mestre.nele} um pouco mais.', efeitos: [{ opiniao: ['mestre', 8] }, { fato: ['mestre', 'foi_questionado', 3] }], fx: { stats: { comp: 1 }, perfil: { astucia: 1 } } } },
      { id: 'atalho', texto: 'Tentar um atalho, que você imaginou por conta própria.', teste: { stat: ['comp', 'sor'], dif: 1 },
        sucesso: { texto: 'O atalho funciona, e {mestre.nome} fica olhando o resultado por um longo tempo. "Eu nunca pensei nisso", diz, sem raiva, e anota. Há um brilho curioso no olhar {mestre.dele}: o de um mestre que aprende com o aluno, e que sabe que isso é raro.', efeitos: [{ opiniao: ['mestre', 15] }, { fato: ['mestre', 'aprendeu_com_o_jogador', 4] }], fx: { rec: 1, xp: 8, stats: { comp: 2 }, perfil: { astucia: 2 } } },
        falha: { texto: 'O atalho dá errado, e com estardalhaço. {mestre.nome} sacode a cabeça, ajuda a limpar a bagunça, e diz, enquanto isso: "A pressa é a mãe dos erros e a avó dos mestres." Você não entende a frase, mas anota.', efeitos: [{ opiniao: ['mestre', -3] }], fx: { ferida: 1, stats: { comp: 1 }, perfil: { ambicao: 1 } } } },
    ],
  }),

  molde({
    id: 'mestre_legado', titulo: 'O Que {mestre.nome} Quer Deixar', tipo: 'consequencia', capitulos: ['ascensao', 'crise', 'legado'], unico: true,
    papeis: { mestre: { pessoa: { papel: 'mestre', vivo: true } } },
    quando: { jogador: { reinoMin: 3 }, papel: { mestre: { vivo: true } } },
    relevancia: [{ se: { papel: { mestre: { opiniaoMin: 25 } } }, mais: 25 }],
    fio: { id: 'mestre', etapa: 3, abandono: 'O que o mestre queria dizer morreu com {mestre.ele}, e o discípulo nunca soube.' },
    cena: '{mestre.nome} manda chamar você, e a voz do mensageiro é diferente: há uma pressa tranquila. Quando você chega, {mestre.nome} está sentado numa pedra, olhando um vale que já foi {mestre.dele}. "Estou ficando velh{mestre.o}", diz, sem lamento. "Tenho três coisas a dizer, e uma só chance." O vento carrega o resto.',
    opcoes: [
      { id: 'ouvir', texto: 'Ouvir tudo, sem interromper.', res: { texto: '{mestre.nome} fala por muito tempo, e cada frase é uma pedra posta com cuidado. No fim, você entende que o que {mestre.ele} deixou não é técnica, e sim o jeito de segurar o mundo. {mestre.Ele} fecha os olhos, e é o mais perto de agradecer que {mestre.ele} sabe chegar.', efeitos: [{ opiniao: ['mestre', 20] }, { fato: ['mestre', 'foi_ouvido_ate_o_fim', 5] }, { fio: ['mestre', 'fechar:herdeiro'] }], fx: { rec: 2, xp: 10, stats: { dao: 2, comp: 1 }, perfil: { disciplina: 1, devocao: 2 } } } },
      { id: 'discordar', texto: 'Discordar de uma das três coisas, com respeito.', res: { texto: '{mestre.nome} ergue as sobrancelhas, e quase ri. "Era o que eu esperava", diz. "Um bom discípulo discorda de uma coisa. Um grande, de duas." Você não sabe se é elogio ou aviso, e talvez {mestre.ele} também não.', efeitos: [{ opiniao: ['mestre', 10] }, { fato: ['mestre', 'foi_contrariado', 3] }, { fio: ['mestre', 'fechar:independente'] }], fx: { rec: 1, xp: 6, stats: { dao: 1 }, perfil: { ambicao: 1, astucia: 1 } } } },
      { id: 'recusar', texto: 'Dizer que prefere seguir sozinh{jogador.o} a partir daqui.', res: { texto: '{mestre.nome} assente, devagar. Não há ressentimento: há uma tristeza antiga, de quem sabia. "Boa sorte, então." É a última frase que {mestre.ele} lhe dirá com os olhos abertos, e você a guardará por muito tempo.', efeitos: [{ opiniao: ['mestre', -10] }, { fato: ['mestre', 'foi_deixado_pelo_discipulo', 4] }, { fio: ['mestre', 'fechar:rompido'] }], fx: { perfil: { ambicao: 2, cautela: 1 } } } },
    ],
  }),

  /* ---------- Clã: aliados (etapa 3) ---------- */
  molde({
    id: 'cla_aliados', titulo: 'Quem Ainda Lembra do Clã', tipo: 'preparo', capitulos: ['entrada', 'ascensao'], unico: true,
    papeis: { aliada: { faccao: { tipo: ['associacao', 'seita', 'imperio'] } }, culpado: { pessoa: { papel: 'culpado', vivo: true } } },
    quando: { jogador: { reinoMin: 1 } },
    relevancia: [{ se: { jogador: { origem: ['mercador', 'cla_decadente'] } }, mais: 15 }, { se: { ambicao: { atual: ['reerguer_cla', 'vingar_cla'] } }, mais: 25 }],
    fio: { id: 'cla', etapa: 3, abandono: 'Ninguém foi procurar quem ainda lembrava do clã.' },
    cena: 'Um nome foi dito num corredor, e {culpado.ele} traz um fio de esperança: a {aliada.nome} já foi amiga do clã, no tempo dos fundadores. Se alguém ainda lembra do favor, talvez possa ser cobrado. Mas {culpado.nome} também conhece esse fio, e você não sabe de que lado {culpado.ele} puxa.',
    opcoes: [
      { id: 'pedir', texto: 'Pedir apoio, em nome do clã, a quem dirige a {aliada.nome}.', teste: { stat: ['car', 'comp'], dif: 0 },
        sucesso: { texto: 'O velho que o recebe escuta até o fim, com uma xícara de chá esfriando. "O fundador do seu clã me salvou uma vez", diz. "Não é todo dia que um nome valioso reaparece." A promessa é pequena, e vale muito: uma porta, uma carta, um nome pronunciado a seu favor.', efeitos: [{ reputacao: ['aliada', 12] }, { q: ['cla_apoio', 1] }, { inclinar: ['reerguer_cla', 1] }], fx: { fama: 2, stats: { car: 1 }, perfil: { disciplina: 1, devocao: 1 } } },
        falha: { texto: 'O velho escuta, agradece, e dispensa você com educação. Ao fechar a porta, você ouve a conversa que começa lá dentro, e o nome de {culpado.nome} aparece {culpado.nele}. O recado já está a caminho antes de você sair da vila.', efeitos: [{ reputacao: ['aliada', -4] }, { fato: ['culpado', 'soube_que_o_cla_procura_aliados', 3] }], fx: { perfil: { disciplina: 1 } } } },
      { id: 'oferecer', texto: 'Oferecer um pagamento adiantado, para comprar a lembrança.', custo: 60, res: { texto: 'O dinheiro troca de mãos sem um pio. O que se compra assim nunca é gratidão, apenas silêncio e pontualidade. Mas é um aliado, e um aliado pago é, às vezes, mais seguro que um sincero.', efeitos: [{ reputacao: ['aliada', 8] }, { q: ['cla_apoio', 1] }], fx: { perfil: { ganancia: 1, astucia: 1 } } } },
      { id: 'selo', texto: 'Mostrar o selo do clã, e deixar que {culpado.ele} fale por si.', requer: { jogador: { origem: ['cla_decadente'] } }, selo: 'Herdeiro de um Clã Decadente',
        res: { texto: 'O selo é pequeno, de jade rachado, e o silêncio que cai quando {culpado.ele} aparece é o de quem reconhece uma assinatura antiga. A porta se abre, devagar, e dois dos anciões levantam, de uma vez, em respeito a um passado que você mesmo não viveu.', efeitos: [{ reputacao: ['aliada', 14] }, { q: ['cla_apoio', 2] }, { inclinar: ['reerguer_cla', 2] }], fx: { fama: 3, perfil: { devocao: 2 } } } },
      { id: 'contatos', texto: 'Usar os contatos do seu pai, mercador, para chegar até eles sem se expor.', requer: { jogador: { origem: ['mercador'] } }, selo: 'Filho de Mercadores', teste: { stat: ['car', 'sor'], dif: -1 },
        sucesso: { texto: 'Duas cartas, um jantar, um favor devolvido. Nada disso aparece em lugar nenhum, e tudo funciona. Quando o assunto chega, chega pela boca de quem você nunca precisou convencer.', efeitos: [{ reputacao: ['aliada', 10] }, { q: ['cla_apoio', 1] }], fx: { fama: 1, perfil: { astucia: 2 } } },
        falha: { texto: 'Um dos contatos do seu pai já está do lado de {culpado.nome}, e a carta que você mandou vai direto para a mão errada. Você descobre isso só pela mudança no cumprimento de um sócio, semanas depois.', efeitos: [{ fato: ['culpado', 'leu_a_carta_do_jogador', 3] }], fx: { perfil: { astucia: 1 } } } },
    ],
  }),

  /* ---------- Rival: convite amistoso (etapa 3, alternativa ao desafio) ---------- */
  molde({
    id: 'rival_convite_amistoso', titulo: '{rival.nome} Propõe Algo Inesperado', tipo: 'preparo', capitulos: ['entrada', 'ascensao'], unico: true,
    papeis: { rival: { pessoa: { papel: 'rival', vivo: true } }, seita: { faccao: { de: 'rival' } } },
    quando: { jogador: { reinoMin: 1 }, papel: { rival: { vivo: true, opiniaoMin: 6 } } },
    relevancia: [{ se: { papel: { rival: { fato: ['foi_poupado_em_publico', 'dividiu_o_trabalho'] } } }, mais: 20 }],
    fio: { id: 'rival', etapa: 3, abandono: 'A proposta de {rival.nome} ficou sem resposta, e a distância voltou.' },
    cena: '{rival.nome} chega ao seu pavilhão sem armas, o que é, por si só, um recado. "Sei que você me acha insuportável", diz, sem rodeios, "e tem razão. Mas somos os dois melhores do nosso ano, e a {seita.nome} vai nos comparar para sempre. Proponho treinar juntos, uma estação: ninguém tem de gostar de ninguém."',
    opcoes: [
      { id: 'aceitar', texto: 'Aceitar, e treinar lado a lado.', res: { texto: 'A estação é feita de manhãs frias e golpes trocados sem raiva. Aos poucos, a rivalidade deixa de ser um muro e vira um espelho: cada um enxerga no outro o erro que não vê em si. Quando acaba, nenhum dos dois é amigo, mas ambos são melhores.', efeitos: [{ opiniao: ['rival', 14] }, { fato: ['rival', 'treinou_com_o_jogador', 4] }, { reputacao: ['seita', 6] }], fx: { xp: 10, stats: { fis: 1, dao: 1 }, perfil: { disciplina: 2, compaixao: 1 } } } },
      { id: 'condicao', texto: 'Aceitar, com uma condição: que o vencedor do último treino escolha o próximo.', res: { texto: '{rival.Ele} ri, e é uma risada de quem não esperava essa de você. "Combinado." A condição vira um jogo dentro do jogo, e você aprende mais sobre {rival.nome} em duas semanas de apostas do que em anos de olhares.', efeitos: [{ opiniao: ['rival', 6] }, { fato: ['rival', 'fez_uma_aposta_com_o_jogador', 3] }], fx: { xp: 6, perfil: { astucia: 2 } } } },
      { id: 'recusar', texto: 'Recusar: o que há entre vocês não se resolve com treino.', res: { texto: '{rival.nome} assente, devagar, e a máscara de quem esperava recusa cai um pouco. "Entendo." {rival.Ele} sai com a mesma postura com que entrou, mas por dentro, algo se fechou, de um modo que a rivalidade sozinha nunca fechou.', efeitos: [{ opiniao: ['rival', -12] }, { fato: ['rival', 'foi_recusado_na_amizade', 4] }], fx: { perfil: { ambicao: 1, cautela: 1 } } } },
    ],
  }),
];
