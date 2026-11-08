import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Instinto oportuno (sorte_destino). Conceito: o corpo chega antes da razão ao lugar certo, e isso tem preço: quem confia
 * no palpite aprende a confiar menos nas pessoas. A cicatriz: o instinto salva a você e nem sempre a quem está ao lado.
 * Cenas: sor_pressentimento (infância) -> sor_mesa (juventude) -> sor_dois_incendios (maturidade) -> sor_ultima_estrada (velhice).
 */
const T = { talent: ['sorte_destino'] };

export const SORTE_DESTINO: ConjuntoTraco = {
  eventos: [
    {
      id: 'sor_pressentimento', title: 'O pé que parou sozinho', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 7, ageMax: 14 },
      text: 'Você volta do rio com seu primo mais novo, pelo caminho de sempre, sobre a laje larga. No meio da laje, o pé simplesmente para. Não há medo, só uma certeza sem palavras de que o próximo passo é errado. O primo, adiante, já pisou na pedra seguinte e pergunta por que você ficou parado.',
      choices: [
        { p: 'C', text: 'Gritar para ele voltar e puxá-lo pelo braço', res: { text: 'A pedra cede um instante depois, com um estalo úmido, e leva o balde dele rio abaixo. Seu primo olha a água, depois olha para você, e nunca mais pergunta por que você às vezes para no meio do caminho. Quando a sorte tem alguém de quem cuidar, ela fica mais barulhenta.', fx: { stats: { sor: 1 }, karma: 1, setFlags: ['sor_primo_salvo'] } } },
        { p: 'T', text: 'Voltar pelo mesmo lugar e fingir que esqueceu algo', res: { text: 'Você salva a si mesmo sem explicar nada. O primo atravessa depois, sozinho, e a pedra aguenta, mas aquele dia ensina uma coisa torta: o instinto vale para a sua pele, e a pessoa ao lado precisa que você abra a boca. Você passa a guardar os palpites para si.', fx: { stats: { sor: 1, dao: 1 }, setFlags: ['sor_palpite_calado'] } } },
        { p: 'D', text: 'Não se mover e esperar o que o corpo está esperando', check: { stat: ['sor', 'esp'], dif: -1 }, ok: { text: 'Um barqueiro velho aparece na curva, com a vara na mão, e testa a pedra à frente antes de qualquer um. Ele olha os dois meninos, olha a laje e diz só uma frase: quem espera o rio falar costuma ouvir. Passa a ensinar a você a ler a água.', fx: { stats: { esp: 1, sor: 1 }, setFlags: ['sor_primo_salvo', 'sor_barqueiro'] } }, fail: { text: 'Esperar não revela nada. O primo, impaciente, volta correndo, escorrega na laje molhada e raspa o joelho até o osso. A sorte avisou, mas não explicou, e você aprende que ela não é uma ordem, e sim um sussurro que pode ser entendido tarde demais.', fx: { stats: { sor: 1 }, setFlags: ['sor_palpite_calado'] } } },
      ],
    },
    {
      id: 'sor_mesa', title: 'A mesa que ninguém queria', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 15, ageMax: 32 },
      text: 'A estalagem de Ponte Fria está lotada, e só sobra uma mesa de canto, com a lâmpada apagada e um banco manco. Todos a evitam. Seu corpo, sem pedir licença, vai para ela e senta. Do outro lado do biombo, duas vozes baixas negociam o que parece ser o preço de uma estrada fechada.',
      choices: [
        { p: 'A', text: 'Ficar em silêncio, beber devagar e ouvir tudo', res: { text: 'Uma voz é de um fiscal do sal, a outra de um capitão de escolta. Combinam fechar a estrada do desfiladeiro na terceira noite, para que uma carga passe sem ser vista. Você sai da estalagem com uma informação que vale ouro e uma sensação nova: a de ser a única pessoa a saber.', fx: { fama: 1, pedras: 12, setFlags: ['sor_ouviu_fiscal'] } } },
        { p: 'C', text: 'Avisar o dono da estalagem de que há gente tramando contra os viajantes', res: { text: 'O dono ouve, pálido, e manda um garoto avisar as caravanas. Dois dias depois, o desfiladeiro é vigiado por camponeses com forquilhas. O capitão nunca sabe quem avisou, mas o dono da estalagem sabe, e deixa sempre uma mesa guardada para você, a pior e a de melhor ouvido.', fx: { fama: 3, karma: 2, setFlags: ['sor_estalagem_amiga'] } } },
        { p: 'M', text: 'Aparecer por trás do biombo e se oferecer para vender silêncio', check: { stat: ['car', 'sor'], dif: 1 }, ok: { text: 'O fiscal paga sem discutir, e o capitão encara você como quem anota um rosto. Você sai com as mãos pesadas de prata e a sensação de que a sorte, desta vez, foi emprestada com juros.', fx: { pedras: 45, karma: -3, setFlags: ['sor_ouviu_fiscal', 'sor_inimigo_capitao'] } }, fail: { text: 'O capitão sorri, pede que você sente, e a conversa termina com a sua bolsa mais leve e o seu rosto decorado. Você passa a olhar, antes de entrar numa estalagem, quem se esconde atrás dos biombos.', fx: { pedras: -15, stats: { sor: -1 }, setFlags: ['sor_inimigo_capitao'] } } },
      ],
    },
    {
      id: 'sor_dois_incendios', title: 'Os dois incêndios de Pedra Baixa', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 26, ageMax: 55 },
      text: 'Na mesma madrugada, dois depósitos pegam fogo em pontas opostas de Pedra Baixa: o armazém de arroz dos pobres e a casa de contas, onde está guardado o registro das dívidas de metade da vila. Seu instinto, que nunca erra de lugar, empurra você para um deles com uma força que quase dói. Do outro, só há o som do fogo. Você pode estar em um lugar só.',
      choices: [
        { p: 'D', text: 'Correr para onde o instinto manda', res: { text: 'O instinto leva você ao armazém de arroz. Você tira cinco famílias do pátio antes de o telhado cair, e o arroz salvo dura até a colheita. Do outro lado, a casa de contas queima inteira, e com ela os registros: dívidas e provas de fraude somem na mesma fumaça. A sorte foi precisa, e cega para o que ficou do outro lado.', fx: { fama: 4, karma: 2, setFlags: ['sor_arroz_salvo', 'sor_pagou_o_preco'] } } },
        { p: 'C', text: 'Ignorar o palpite e ir para onde há mais gente em risco', res: { text: 'A casa de contas tem um zelador velho dormindo no sótão, que ninguém lembrou de contar. Você o encontra, quase sufocado, e o carrega. O arroz dos pobres queima inteiro, e o inverno seguinte será magro. Pela primeira vez, você decide contra o instinto, e descobre que escolher é diferente de ser levado.', fx: { fama: 2, karma: 3, stats: { dao: 2 }, setFlags: ['sor_decidiu_sozinho'] } } },
        { p: 'T', text: 'Chamar a vila inteira aos gritos e dividir as pessoas em duas filas', check: { stat: ['car', 'fis'], dif: 1 }, ok: { text: 'Em poucos minutos, duas correntes de baldes se formam. Os dois depósitos perdem a metade do que tinham, e nenhum se perde inteiro. Ninguém agradece a sorte, porque ninguém soube que ela estava ali; agradecem a você, o que é mais raro e mais caro.', fx: { fama: 5, karma: 3, stats: { car: 1 }, setFlags: ['sor_decidiu_sozinho'] } }, fail: { text: 'A vila não sabe se obedece ou se foge. As filas se desfazem, as duas casas queimam, e ao amanhecer você passa a manhã entre as cinzas, entendendo que quem deixa de seguir a sorte também fica sem ela.', fx: { fama: -1, karma: 1, stats: { sor: -1 }, setFlags: ['sor_pagou_o_preco'] } } },
      ],
    },
    {
      id: 'sor_ultima_estrada', title: 'A moça que quis andar ao seu lado', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 48 },
      text: 'Uma mensageira de quinze anos, filha de uma família que você ajudou sem perceber, te alcança na estrada e pede para andar com você. Ela diz que todo mundo sabe que você chega sempre na hora certa. Você sabe que isso nunca foi mérito, e que a sorte não será herdada por quem caminhar ao seu lado.',
      choices: [
        { p: 'D', text: 'Levá-la como aprendiz e ensinar a escutar o corpo antes de confiar no acaso', res: { text: 'Leva anos. Ela aprende a parar o pé, a ler as nuvens e a duvidar do próprio instinto. Quando você sente o primeiro cansaço de verdade, ela já anda dois passos à frente, escolhendo bifurcações pelo cheiro da chuva. A sorte, descobre-se, era em parte um ofício que ninguém tinha dado nome.', fx: { fama: 3, karma: 3, stats: { dao: 2 }, setFlags: ['sor_estrada_ensinada', 'sor_andarilho'] } } },
        { p: 'T', text: 'Recusar, e mostrar a ela o caminho de volta para casa', res: { text: 'Ela chora de raiva, depois agradece a sinceridade. Você continua sozinho, como a sorte gosta, e anos depois ouve falar de uma mensageira respeitada que nunca se perdeu na tempestade e que jura nunca ter acreditado em destino.', fx: { karma: 1, stats: { sor: 1 } } } },
        { p: 'O', text: 'Deixar que ela decida: andar uma estação juntos e ver o que acontece', check: { stat: ['sor', 'dao'], dif: 0 }, ok: { text: 'No terceiro mês, a estrada manda a vocês duas tempestades, uma ponte quebrada e um menino perdido. Em cada uma, algo faz o instinto vibrar. Ao final da estação, ela diz que você nunca teve sorte, só nunca deixou de prestar atenção. A frase fica com você até o último inverno.', fx: { fama: 3, karma: 2, stats: { sor: 1, esp: 1 }, setFlags: ['sor_estrada_ensinada', 'sor_andarilho'] } }, fail: { text: 'A estação é longa e sem acontecimentos. A moça se cansa de uma sorte que não aparece e volta para casa. Você fica com a dúvida mais antiga de todas: se a sorte era sua, ou se era só a pressa dos outros.', fx: { stats: { dao: 1 } } } },
      ],
    },
  ],
  opcoes: {
    murim_dia_comum: [
      { p: 'T', text: 'Tomar a bifurcação que parece pior, sem saber explicar por quê', cond: T, res: { text: 'Meia hora depois você ouve, atrás, o estrondo de uma carroça caindo da ribanceira da outra estrada. O cocheiro, vivo e pálido, jura que você é um santo. Você só sabe que o pé foi para a esquerda.', fx: { fama: 1, stats: { sor: 1 }, setFlags: ['sor_bifurcacao'] } } },
    ],
    murim_mercado: [
      { p: 'G', text: 'Comprar o mapa velho que Noh jura que não serve para nada', cond: T, res: { text: 'O mapa não leva a lugar nenhum que exista, mas uma margem anotada a lápis marca um poço seco e uma cova de moedas sob uma figueira. Noh, ao ouvir, ri até chorar e exige a metade, e você cede, porque a figueira ainda está lá.', fx: { pedras: 18, setFlags: ['sor_mapa_noh'] } } },
    ],
    murim_festival: [
      { p: 'O', text: 'Seguir, sem companhia, a lanterna que escapou da correnteza rio abaixo', cond: T, res: { text: 'A lanterna para junto a um galpão de redes, onde um velho remendeiro tenta acender o fogão. Ele te dá de comer e conta uma história com data, rota e nome de mercador. Você sai achando que ouviu só uma conversa de festival; semanas depois, a história vira um encontro marcado.', fx: { stats: { esp: 1 }, setFlags: ['sor_lanterna'], agenda: [{ event: 'sor_mesa', em: [1, 4] }] } } },
    ],
    murim_peregrinos: [
      { p: 'D', text: 'Perguntar ao monge o que ele não ofereceu, porque algo no jeito dele pede', cond: T, res: { text: 'O monge hesita, e então ensina o que nunca ensinou a ninguém: ficar parado até o vento mudar. Dura uma noite inteira. Pela manhã, você entende que a calma é só um nome mais velho para o que você chama de instinto.', fx: { stats: { esp: 1, dao: 1 }, setFlags: ['sor_quietude'] } } },
    ],
    murim_inverno: [
      { p: 'C', text: 'Ir ao poço velho atrás da igreja, sem avisar ninguém nem saber por quê, antes que a nevasca piore', cond: T, res: { text: 'Sob a tampa do poço seco, há um alçapão com oito sacos de grão que um mercador morto escondeu anos atrás. Você divide o achado em silêncio, para que ninguém perceba de onde veio, e o celeiro atravessa a segunda noite com folga.', fx: { fama: 3, karma: 2, setFlags: ['sor_celeiro_oculto'] } } },
    ],
    murim_dilema: [
      { p: 'A T', text: 'Ouvir só o que cada um deixa de dizer e confiar no frio que sente na nuca', cond: T, res: { text: 'O frio aponta para o espadachim. Você o encara e diz que ele sabe a verdade; ele desvia o olhar. Era o mestre quem tinha implorado pelo fim, e o rapaz só não suportava aceitar. A curandeira vai embora sem agradecer, e o rapaz fica olhando o chão, em paz pela primeira vez em semanas.', fx: { fama: 2, karma: 1, setFlags: ['sor_nuca'] } } },
    ],
  },
};
