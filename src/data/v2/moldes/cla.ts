import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Arco do Clã (fio `cla`): a ferida que a pré-história deixou na família (dívida, terra, desonra ou traição),
 * a pista, a prova, o segredo do culpado e o ajuste de contas. Cada vida tem um culpado diferente, de uma facção diferente.
 */
export const CLA: Molde[] = [
  molde({
    id: 'cla_pista',
    titulo: 'O Que o Seu Pai Escondeu',
    tipo: 'preparo',
    capitulos: ['infancia', 'despertar', 'entrada', 'ascensao'],
    unico: true,
    papeis: {
      culpado: { pessoa: { papel: 'culpado' } },
      faccao: { faccao: { ferida: true } },
      parente: { pessoa: { papel: 'parente', vivo: true }, opcional: true },
    },
    quando: { jogador: { idadeMin: 11 } },
    relevancia: [{ se: { jogador: { talento: ['memoria_perfeita'] } }, mais: 10 }],
    fio: { id: 'cla', etapa: 2, abandono: 'O que o seu pai escondeu ficou apodrecendo no escuro.' },
    cena: [
      { se: { ferida: ['divida'] }, texto: 'No fundo de um baú, atrás de roupas que ninguém usa mais, você encontra o caderno de contas do seu pai. Lê à luz de uma vela, com o dedo seguindo as linhas: a dívida com a {faccao.nome} foi paga duas vezes, e nenhum recibo foi dado. Há assinaturas, e uma delas é de {culpado.nome}.' },
      { se: { ferida: ['terra'] }, texto: 'Atrás de uma tábua solta do celeiro, enrolada em pano encerado, você encontra uma escritura com o sinete antigo do clã. A terra era dele, e ninguém a vendeu. O papel está amarelado, mas o selo é inteiro, e o nome de {culpado.nome} aparece como testemunha, e como beneficiário.' },
      { se: { ferida: ['desonra'] }, texto: 'Entre as páginas de um livro de poemas, você encontra uma carta que o seu pai nunca enviou. Ela dá o nome de quem espalhou a calúnia, e o motivo. {culpado.nome} aparece três vezes, sempre com a letra tremida de quem escreveu com raiva e depois não teve coragem de assinar.' },
      { texto: 'Dentro de um tubo de bambu escondido sob o telhado, você encontra o contrato original de sociedade entre o seu avô e {culpado.nome}. A cláusula de traição está sublinhada, na letra do seu avô: "Se o outro quebrar isto, que o mundo saiba." O mundo nunca soube.' },
    ],
    opcoes: [
      {
        id: 'guardar', texto: 'Guardar o achado em segredo, até ter força para usá-lo.',
        res: { texto: 'Você guarda o papel num lugar que só você conhece, e passa a viver com ele, como quem vive com uma pedra no sapato que, um dia, pode virar arma. Falar com ninguém sobre isso é o primeiro segredo da sua vida.', efeitos: [{ q: ['cla_prova', 1] }, { inclinar: ['reerguer_cla', 1] }, { inclinar: ['vingar_cla', 1] }], fx: { perfil: { astucia: 2, cautela: 1 } } },
      },
      {
        id: 'parente', texto: 'Mostrar o achado a {parente.nome}.', requer: { papel: { parente: { vivo: true } } },
        res: { texto: '{parente.nome} lê calado, e depois dobra o papel com um cuidado que parece reverência. "Eu sabia que existia", diz, baixo. "Nunca soube onde ele escondeu." As mãos tremem. Você percebe que acabou de dar a alguém um peso que essa pessoa carregava sozinha.', efeitos: [{ opiniao: ['parente', 12] }, { fato: ['parente', 'viu_a_prova', 3] }, { q: ['cla_prova', 1] }, { inclinar: ['proteger', 1] }, { inclinar: ['reerguer_cla', 1] }], fx: { perfil: { compaixao: 1 } } },
      },
      {
        id: 'escriba', texto: 'Levar o papel a um escriba da cidade, para confirmar o que ele diz.', teste: { stat: ['sor', 'car'], dif: 0 },
        sucesso: { texto: 'O escriba lê, assente, e confirma tudo sem fazer perguntas. "Isto vale mais do que a casa onde você mora", diz, e promete não contar a ninguém. Pelo preço de três moedas, você ganhou uma testemunha.', efeitos: [{ q: ['cla_prova', 2] }, { inclinar: ['reerguer_cla', 2] }], fx: { pedras: -3, perfil: { astucia: 1 } } },
        falha: { texto: 'O escriba lê, e a cara dele muda. Quando você volta, no dia seguinte, a loja está fechada, e alguém na rua diz que o homem partiu de madrugada, com pressa. Uma semana depois, {culpado.nome} manda cumprimentar a sua família, o que nunca fez antes.', efeitos: [{ fato: ['culpado', 'soube_da_prova', 4] }, { opiniao: ['culpado', -10] }, { q: ['cla_prova', 1] }, { inclinar: ['vingar_cla', 1] }], fx: { perfil: { cautela: 1 } } },
      },
      {
        id: 'decorar', texto: 'Decorar tudo, linha por linha, e devolver o papel ao esconderijo como se nunca tivesse sido tocado.',
        requer: { jogador: { talento: ['memoria_perfeita'] } }, selo: 'Memória Perfeita',
        res: { texto: 'Você lê uma vez, e a página inteira fica gravada. Depois a devolve ao esconderijo, no mesmo ângulo, com a mesma poeira. Se alguém procurar, não vai achar vestígio de que você existiu ali. Mas tudo está dentro de você, para sempre.', efeitos: [{ q: ['cla_prova', 2] }, { inclinar: ['reerguer_cla', 1] }, { inclinar: ['vingar_cla', 1] }], fx: { perfil: { astucia: 2 } } },
      },
      {
        id: 'queimar', texto: 'Queimar o papel: o passado não paga as contas.',
        res: { texto: 'O papel vira cinza num instante. Você observa até a última faísca, e sente um alívio estranho, de quem desistiu de uma briga que não escolheu. Mas o nome de {culpado.nome} continua na sua cabeça, e o papel, queimado, ainda diz tudo.', efeitos: [{ inclinar: ['reerguer_cla', -1] }, { inclinar: ['vingar_cla', -1] }], fx: { perfil: { cautela: 2 } } },
      },
    ],
  }),

  molde({
    id: 'cla_prova',
    titulo: 'Quem {culpado.nome} Mandou',
    tipo: 'perigo',
    capitulos: ['entrada', 'ascensao'],
    unico: true,
    papeis: {
      culpado: { pessoa: { papel: 'culpado', vivo: true } },
      capanga: { pessoa: { novo: true, criar: { traco: ['cruel', 'ambicioso'], reino: 'jogador', objetivo: 'cacar', faccao: 'associacao' } } },
      faccao: { faccao: { ferida: true } },
    },
    quando: { jogador: { reinoMin: 1 }, papel: { culpado: { vivo: true } } },
    relevancia: [{ se: { papel: { culpado: { fato: ['soube_da_prova'] } } }, mais: 35 }, { se: { q: { cla_prova: [1, undefined] } }, mais: 15 }],
    combate: { oponente: 'bandido', cenario: 'vilarejo' },
    fio: { id: 'cla', etapa: 4, abandono: 'O homem de {culpado.nome} nunca voltou, e a dívida do clã ficou como estava.' },
    cena: [
      { se: { papel: { culpado: { fato: ['soube_da_prova'] } } }, texto: '{culpado.nome} soube do que você tem, e mandou {capanga.nome} para resolver. Ele aparece no fim da tarde, sem pressa, com a gentileza de quem está só "de passagem". "O senhor {culpado.nome} manda lembranças", diz. "E pede que você traga o que encontrou, antes que algo aconteça com a sua casa."' },
      { texto: '{capanga.nome}, a serviço de {culpado.nome}, aparece no fim da tarde, sem pressa, com a gentileza de quem está só "de passagem". "O senhor {culpado.nome} manda lembranças", diz. "E pergunta se o clã tem pensado no assunto. Ele é um homem paciente. Os homens dele, nem tanto."' },
    ],
    opcoes: [
      {
        id: 'enfrentar', texto: 'Enfrentar {capanga.nome} ali mesmo.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'capanga' },
        sucesso: { texto: '{capanga.nome} cai primeiro, e a gentileza dele sai junto. Você o faz voltar, ferido, com um recado curto para o patrão. Em casa, ninguém diz nada; alguém, com os olhos, agradece.', efeitos: [{ fato: ['culpado', 'perdeu_um_homem', 3] }, { opiniao: ['culpado', -10] }, { opiniao: ['capanga', -30] }, { inclinar: ['vingar_cla', 2] }], fx: { fama: 2, perfil: { violencia: 1 } } },
        falha: { texto: '{capanga.nome} é melhor do que parecia. Você acorda com a casa revirada, e falta alguma coisa que você escondia. Sobra a dor, e a certeza de que isso foi só um aviso.', efeitos: [{ fato: ['culpado', 'mandou_o_aviso', 3] }, { opiniao: ['capanga', -20] }, { q: ['cla_prova', -1] }], fx: { ferida: 2, perfil: { disciplina: 1 } } },
      },
      {
        id: 'pagar', texto: 'Pagar o que ele pede, para ganhar tempo.', custo: 40,
        res: { texto: 'As moedas somem na manga dele, e o sorriso volta. "O senhor vai gostar de saber que o clã é sensato." Você ganhou meses, e perdeu uma coisa que não vai voltar tão cedo: a sensação de ter os próprios joelhos.', efeitos: [{ fato: ['culpado', 'recebeu_pagamento', 2] }, { q: ['cla_tempo', 1] }, { inclinar: ['reerguer_cla', 1] }], fx: { perfil: { cautela: 1, ganancia: -1 } } },
      },
      {
        id: 'mostrar', texto: 'Mostrar a ele o que você tem, e deixá-lo ler.', requer: { q: { cla_prova: [1, undefined] } }, seloBloqueio: 'Você não tem nada para mostrar', teste: { stat: ['comp', 'car'], dif: 0 },
        sucesso: { texto: '{capanga.nome} lê, empalidece, e devolve o papel com as duas mãos. "Eu não vi isto", diz. "O senhor não sabe que eu vi." Ele vai embora devagar, e você sabe que {culpado.nome}, em algum momento, vai descobrir que o segredo não é mais só dele.', efeitos: [{ fato: ['culpado', 'sabe_que_ha_prova', 4] }, { q: ['cla_prova', 1] }, { inclinar: ['reerguer_cla', 2] }], fx: { fama: 1, perfil: { astucia: 1 } } },
        falha: { texto: 'Antes que você termine de desdobrar o papel, {capanga.nome} o arranca e o rasga em dois. "Nunca existiu", diz. A mão dele já está no cabo da faca, e o resto da conversa é feito de silêncios.', efeitos: [{ fato: ['culpado', 'destruiu_a_prova', 4] }, { q: ['cla_prova', -1] }, { opiniao: ['capanga', -15] }], fx: { ferida: 1, perfil: { astucia: 1 } } },
      },
      {
        id: 'arranjo', texto: 'Levar {capanga.nome} para o pátio e conversar com ele dentro de um arranjo de pedras.',
        requer: { jogador: { trilha: ['formacoes'] } }, selo: 'Caminho das Formações', teste: { stat: ['comp', 'esp'], tag: 'formacao', ameaca: 'capanga' },
        sucesso: { texto: 'Cada passo que {capanga.nome} dá o leva de volta ao mesmo lugar. Sem ninguém tocar nele, ele percebe que está preso, e fala: quem mandou, o que faria, quantos mais. Você anota tudo, em silêncio, e o solta com um recado.', efeitos: [{ q: ['cla_pista', 1] }, { fato: ['culpado', 'perdeu_um_homem', 3] }, { opiniao: ['capanga', -25] }], fx: { fama: 2, rec: 1, perfil: { astucia: 2 } } },
        falha: { texto: 'A pedra do centro está um dedo fora do lugar. {capanga.nome} pisa fora do arranjo e agarra você pelo colarinho. O desenho se desfaz, e a lição também: uma formação malfeita é mais perigosa para quem a fez do que para quem a pisa.', efeitos: [{ opiniao: ['capanga', -15] }, { q: ['cla_prova', -1] }], fx: { ferida: 1, perfil: { astucia: 1 } } },
      },
      {
        id: 'cha', texto: 'Servir um chá a {capanga.nome} e esperar que ele fale.',
        requer: { jogador: { trilha: ['venenos'] } }, selo: 'Caminho dos Venenos', teste: { stat: ['comp', 'sor'], tag: 'veneno', ameaca: 'capanga' },
        sucesso: { texto: 'Quarenta minutos depois, {capanga.nome} está explicando a rotina do patrão com uma clareza desconfortável. Você anota a hora, o nome e a rota. Quando ele acorda, de manhã, não se lembra de nada, e você tem tudo.', efeitos: [{ q: ['cla_pista', 2] }, { q: ['cla_prova', 1] }, { fato: ['capanga', 'foi_envenenado_sem_saber', 4] }], fx: { karma: -2, perfil: { astucia: 2 } } },
        falha: { texto: 'A dose é maior do que devia. {capanga.nome} cai no meio de uma frase, e quando acorda, três dias depois, sabe exatamente o que fez você. Já há um cavalo no caminho para contar ao patrão.', efeitos: [{ fato: ['culpado', 'soube_do_envenenamento', 5] }, { fato: ['capanga', 'foi_envenenado_por_jogador', 5] }, { opiniao: ['capanga', -35] }, { objetivo: ['culpado', 'cacar'] }], fx: { karma: -3, perfil: { astucia: 1 } } },
      },
      {
        id: 'guarda', texto: 'Mostrar a insígnia do seu pai e dizer que {capanga.nome} está violando a lei do reino.',
        requer: { jogador: { origem: ['filho_guarda'] } }, selo: 'Filho de um Guarda do Reino',
        res: { texto: 'Metade dos homens do posto da vila serviu com o seu pai, e vem, sem pressa, ver o que acontece. {capanga.nome} sorri, vê o círculo se fechar, e vai embora com a dignidade de quem sabe perder. Dois dos guardas ficam de olho na sua casa nas semanas seguintes.', efeitos: [{ fato: ['culpado', 'foi_barrado_pelos_guardas', 3] }, { q: ['cla_tempo', 1] }, { inclinar: ['reerguer_cla', 1] }], fx: { fama: 1, perfil: { disciplina: 1 } } },
      },
    ],
  }),

  molde({
    id: 'cla_segredo',
    titulo: 'O Que {culpado.nome} Tem a Dizer',
    tipo: 'personagem',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { culpado: { pessoa: { papel: 'culpado', vivo: true } }, faccao: { faccao: { ferida: true } }, parente: { pessoa: { papel: 'parente', vivo: true }, opcional: true } },
    quando: { jogador: { reinoMin: 2 }, papel: { culpado: { vivo: true } } },
    fio: { id: 'cla', etapa: 5, abandono: 'A versão do culpado nunca foi ouvida.' },
    cena: [
      { se: { ferida: ['divida'] }, texto: '{culpado.nome} o recebe sem escolta, num salão da {faccao.nome}, e serve chá antes de falar. "O seu pai me deve", diz, "mas não é isso que eu venho dizer. Ele me pediu, no leito de morte, que eu cuidasse de vocês. Esta dívida foi a forma que encontrei de manter o clã vivo. Se eu tivesse perdoado, vocês teriam sido devorados por outros." Você não sabe se acredita.' },
      { se: { ferida: ['terra'] }, texto: '{culpado.nome} o recebe na varanda de uma casa que já foi do seu clã. "Eu tomei esta terra", diz, "porque o seu avô a tinha dado em penhor, e porque a {faccao.nome} estava prestes a tomá-la de uma forma muito pior. Eu a guardei. Nunca pedi gratidão." O jardim está bem cuidado. Você não sabe se isso é verdade ou apenas conveniente.' },
      { se: { ferida: ['desonra'] }, texto: '{culpado.nome} o recebe sozinho, de manto simples. "A história que contei sobre o seu pai era verdadeira", diz. "O erro foi meu: eu a contei antes da hora, por rancor. Mas o seu pai fez o que fez." Há uma tristeza antiga na voz dele, e isso complica mais do que simplifica.' },
      { texto: '{culpado.nome} o recebe sem mentiras, o que é inesperado. "Eu traí o seu avô", diz. "Porque ele ia me trair primeiro, e eu o descobri tarde demais para fazer outra coisa. Não peço que acredite. Peço que escute." O silêncio depois dessas palavras é longo.' },
    ],
    opcoes: [
      { id: 'acreditar', texto: 'Acreditar nele, ao menos em parte.', res: { texto: 'Algo dentro de você se afrouxa, e junto vem uma culpa pequena, de quem acaba de largar uma arma. A verdade nunca é tão limpa quanto o ódio que você carregou. Isso, por si só, já é uma perda.', efeitos: [{ q: ['cla_perdao', 2] }, { opiniao: ['culpado', 10] }, { fato: ['culpado', 'foi_ouvido', 3] }, { inclinar: ['vingar_cla', -2] }], fx: { karma: 1, perfil: { compaixao: 1, devocao: 1 } } } },
      { id: 'duvidar', texto: 'Não acreditar em uma palavra.', res: { texto: 'Cada frase dele soa como justificativa, e você a guarda como evidência. Quando sai, a chuva começa, e você caminha sem pressa sob ela, com o ódio mais definido do que antes.', efeitos: [{ q: ['cla_vinganca', 2] }, { opiniao: ['culpado', -8] }, { inclinar: ['vingar_cla', 2] }], fx: { stats: { dao: 1 }, perfil: { violencia: 1, ambicao: 1 } } } },
      { id: 'parente', texto: 'Perguntar a {parente.nome} o que ele sabe.', requer: { papel: { parente: { vivo: true } } }, res: { texto: '{parente.nome} fica calado por um bom tempo, e depois confirma metade: "O que ele disse é verdade, mas não é toda a verdade. Seu pai tinha pecados que nunca te contei." O mundo muda de cor, como quando o sol sai de trás de uma nuvem e mostra o que a sombra escondia.', efeitos: [{ opiniao: ['parente', 5] }, { q: ['cla_perdao', 1] }, { q: ['cla_vinganca', 1] }, { fato: ['parente', 'contou_a_verdade', 4] }], fx: { stats: { comp: 1 }, perfil: { disciplina: 1 } } } },
      { id: 'olhar', texto: 'Olhar fundo nos olhos dele e ler o que há por trás das palavras.', requer: { jogador: { talento: ['olhar_dao'] } }, selo: 'Olhar do Dao', teste: { stat: ['sor', 'comp'], dif: 0 }, sucesso: { texto: 'Você enxerga o fio que liga a história dele à sua. A parte que ele disse é verdadeira, e a parte que calou é ainda mais pesada. Você sai sabendo mais do que quando entrou, e mais sozinho também.', efeitos: [{ q: ['cla_perdao', 1] }, { q: ['cla_vinganca', 1] }, { q: ['cla_prova', 1] }, { fato: ['culpado', 'foi_visto_por_dentro', 4] }], fx: { stats: { dao: 1 }, perfil: { astucia: 2 } } }, falha: { texto: 'Há muita coisa nos olhos dele, e a maior parte é a sua própria projeção. Você sai confuso, com a sensação de que viu alguma coisa e a perdeu no mesmo instante.', efeitos: [{ q: ['cla_vinganca', 1] }], fx: { perfil: { cautela: 1 } } } },
    ],
  }),

  molde({
    id: 'cla_climax',
    titulo: 'O Ajuste de Contas',
    tipo: 'climax',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { culpado: { pessoa: { papel: 'culpado', vivo: true } }, faccao: { faccao: { ferida: true } } },
    quando: { papel: { culpado: { vivo: true } } },
    relevancia: [{ se: { ambicao: { atual: ['reerguer_cla', 'vingar_cla'] } }, mais: 40 }, { se: { q: { cla_prova: [2, undefined] } }, mais: 15 }],
    combate: { oponente: 'cultivador', cenario: 'cidade' },
    fio: { id: 'cla', etapa: 6, abandono: 'O dia do acerto nunca chegou.' },
    cena: [
      { se: { q: { cla_perdao: [2, undefined] } }, texto: '{culpado.nome} manda um recado simples: "Nós dois sabemos que isto precisa terminar." Vocês se encontram num lugar neutro, sem escolta. Os anos mudaram o rosto dele, e o seu também. Não há plateia, e é por isso que o que for decidido aqui vale mais.' },
      { texto: 'Chega o dia que você vem preparando desde a infância: {culpado.nome}, da {faccao.nome}, está ao alcance da sua mão. O que o clã perdeu, o que o seu pai nunca recuperou, o que você jurou de pé na porta de casa, tudo se resume a esta tarde, e à decisão de um único gesto.' },
    ],
    opcoes: [
      { id: 'pagar', texto: 'Pagar a dívida inteira, diante de testemunhas.', requer: { ferida: ['divida'] }, custo: 400,
        res: { texto: 'As moedas caem na mesa, e o som é o de um peso que deixa o peito. {culpado.nome} conta cada uma, e depois assina o recibo que o seu pai nunca recebeu. "Está quitado", diz. O nome do clã, riscado do livro de contas, volta a ser só um nome.', efeitos: [{ fato: ['culpado', 'foi_pago', 4] }, { fio: ['cla', 'fechar:reerguido'] }, { reputacao: ['faccao', 10] }], fx: { fama: 4, perfil: { disciplina: 1, devocao: 1 } } } },
      { id: 'prova', texto: 'Expor a prova diante da {faccao.nome}.', requer: { q: { cla_prova: [2, undefined] } }, seloBloqueio: 'Você ainda não reuniu provas suficientes', teste: { stat: ['car', 'comp'], dif: -1 },
        sucesso: { texto: 'Cada documento cai na mesa, e a sala muda de temperatura. {culpado.nome} tenta falar, mas já não há plateia. A {faccao.nome}, ao ver a evidência, decide que o preço de proteger um nome sujo é maior que o de abandoná-lo. O clã volta à luz, devagar.', efeitos: [{ fato: ['culpado', 'foi_exposto', 5] }, { opiniao: ['culpado', -30] }, { fio: ['cla', 'fechar:reerguido'] }, { reputacao: ['faccao', -5] }], fx: { fama: 5, karma: 1, perfil: { astucia: 2, disciplina: 1 } } },
        falha: { texto: 'A prova é boa, mas {culpado.nome} chegou antes: já tem testemunhas, contra-provas, e um advogado educado. Você sai da sala com os papéis na mão e a sensação de que perdeu para o tempo, e não só para ele.', efeitos: [{ fato: ['culpado', 'venceu_na_mesa', 4] }, { fio: ['cla', 'fechar:perdido'] }, { reputacao: ['faccao', -8] }], fx: { fama: -2, perfil: { astucia: 1 } } } },
      { id: 'duelo', texto: 'Desafiar {culpado.nome} diretamente.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'culpado' },
        sucesso: { texto: 'O golpe final é rápido, e a vitória, silenciosa. {culpado.nome} cai com os olhos abertos, e na última frase ele diz seu nome, não o do clã. O que você jurou aos sete anos está cumprido, e o vazio que fica no peito tem a forma exata do que você carregou.', efeitos: [{ fato: ['culpado', 'foi_morto_pelo_jogador', 5] }, { morte: 'culpado', causa: 'o ajuste de contas' }, { fio: ['cla', 'fechar:vingado'] }, { reputacao: ['faccao', -15] }], fx: { fama: 3, karma: -4, perfil: { violencia: 2 } } },
        falha: { texto: 'Ele é mais velho, mais forte, e já viu coisa pior. O golpe que o derruba é o seu. Quando acorda, a casa do clã está de pé, mas você, não. {culpado.nome} mandou tratar das suas feridas, o que dói mais que a derrota.', efeitos: [{ fato: ['culpado', 'venceu_o_jogador', 5] }, { fio: ['cla', 'fechar:perdido'] }], fx: { ferida: 3, perfil: { violencia: 1 } } } },
      { id: 'perdoar', texto: 'Perdoar, e deixar a dívida morrer com o passado.', requer: { q: { cla_perdao: [2, undefined] }, jogador: { defeitoNao: ['orgulhoso'] } }, seloBloqueio: 'Você ainda não entendeu o que ele fez, nem por quê',
        res: { texto: '{culpado.nome} demora para entender. Depois baixa a cabeça, longamente, e o gesto vale mais que um discurso. "O seu pai teria orgulho", diz, e é a primeira vez que um deles diz uma frase sem ferir. O clã não ganha dinheiro, mas ganha uma coisa que o dinheiro não compra.', efeitos: [{ fato: ['culpado', 'foi_perdoado', 5] }, { opiniao: ['culpado', 40] }, { fio: ['cla', 'fechar:perdoado'] }, { reputacao: ['faccao', 10] }], fx: { fama: 3, karma: 4, perfil: { compaixao: 3, devocao: 1 } } } },
    ],
  }),

  molde({
    id: 'cla_epilogo',
    titulo: 'O Nome do Clã',
    tipo: 'consequencia',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { culpado: { pessoa: { papel: 'culpado' } }, parente: { pessoa: { papel: 'parente' }, opcional: true } },
    quando: { fio: { cla: { resolvido: true } } },
    relevancia: [{ se: { fio: { cla: { resolvido: true } } }, mais: 60 }],
    cena: [
      { se: { fio: { cla: { desfecho: ['reerguido'] } } }, texto: 'Meses depois, o nome do clã aparece num cartaz do mercado, em letras que ninguém viu em décadas. Gente que nunca olhou para o seu pai agora o cumprimenta. É estranho: a mesma rua, os mesmos rostos, e um nome que volta a abrir portas. Você anda por ela de cabeça erguida, e se pergunta por que isso demorou tanto.' },
      { se: { fio: { cla: { desfecho: ['vingado'] } } }, texto: 'A casa do clã continua de pé, mas silenciosa. Você esperava alívio, e encontrou um vazio do tamanho exato do que carregou. Os vizinhos olham de lado, e há quem sussurre seu nome com respeito e quem o sussurre com medo. Nenhum dos dois sentimentos devolve o que foi perdido.' },
      { se: { fio: { cla: { desfecho: ['perdoado'] } } }, texto: 'Algumas cartas começam a chegar, curtas e formais, de {culpado.nome}. Não pedem nada, não prometem nada. Dizem só que o clã tem agora um aliado onde nunca teve, e que o passado, embora não esquecido, parou de pesar. O resto é feito de pequenas visitas, e de uma paz que ninguém sabe nomear.' },
      { se: { fio: { cla: { desfecho: ['perdido'] } } }, texto: 'O nome do clã some devagar, como tinta na chuva. Não há cena, nem despedida, só a observação, ao longo dos anos, de que ninguém mais o pronuncia. Você carrega a ferida sem poder tocá-la, e descobre que não curar também é uma forma de viver.' },
      { texto: 'O nome do clã segue o seu caminho, com ou sem você.' },
    ],
    opcoes: [
      { id: 'cumprida', texto: 'Aceitar o que ficou.', requer: { todos: [{ ambicao: { atual: ['reerguer_cla', 'vingar_cla'] } }, { fio: { cla: { desfecho: ['reerguido', 'vingado', 'perdoado'] } } }] }, res: { texto: 'Algumas ambições se encerram no instante em que se cumprem, e deixam o espaço de uma vida vazio. Você sente o peso sair dos ombros, e percebe que precisará de uma razão nova para continuar.', efeitos: [{ ambicao: 'cumprida' }, { reducaoTensao: 0.2 }], fx: { stats: { dao: 2 }, perfil: { disciplina: 1 } } } },
      { id: 'abandonada', texto: 'Aceitar o que ficou.', requer: { todos: [{ ambicao: { atual: ['reerguer_cla', 'vingar_cla'] } }, { fio: { cla: { desfecho: ['perdido'] } } }] }, res: { texto: 'A ambição se desfaz sem cerimônia. Você a põe de lado como se põe de lado uma roupa que não serve mais, e aprende, devagar, a procurar outra coisa para fazer com os dias que sobram.', efeitos: [{ ambicao: 'abandonada' }, { reducaoTensao: 0.1 }], fx: { stats: { dao: 1 }, perfil: { cautela: 1 } } } },
      { id: 'segue', texto: 'Seguir em frente.', requer: { nao: { ambicao: { atual: ['reerguer_cla', 'vingar_cla'] } } }, res: { texto: 'A vida continua, com ou sem a causa que um dia a moveu. Você aprendeu a conviver com a ausência, e com o que a preenche.', efeitos: [{ reducaoTensao: 0.1 }], fx: { stats: { dao: 1 } } } },
    ],
  }),
];
