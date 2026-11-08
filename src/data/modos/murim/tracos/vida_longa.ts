import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Saúde duradoura (vida_longa). Conceito: o corpo cuida de si e raramente adoece, então a vida é longa.
 * A cicatriz: quem vive muito enterra os que amou, e a saúde vira a única testemunha de um mundo que já passou.
 * Cenas: lon_epidemia (infância) -> lon_enterro_do_amigo (juventude) -> lon_filhos_dos_outros (maturidade) -> lon_ultima_da_mesa (velhice).
 */
const T = { talent: ['vida_longa'] };

export const VIDA_LONGA: ConjuntoTraco = {
  eventos: [
    {
      id: 'lon_epidemia', title: 'A tosse que não pegou', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'Uma tosse seca percorre a vila e deixa metade das casas de cama. Seus irmãos adoecem, depois seus pais. Você respira o mesmo ar, divide as mesmas tigelas e acorda todos os dias sem febre. A vizinhança nota, e começa a mandar crianças enfermas para a sua porta, como quem deixa um recado sem se atrever a pedir.',
      choices: [
        { p: 'C', text: 'Cuidar de quem chegar, trocando panos e levando água', res: { text: 'Por três semanas você dorme pouco e cuida de oito crianças, além dos seus. Seis se recuperam. Duas não. Você aprende cedo que a saúde que você tem não é mérito, mas dever: o que fazer com um corpo que não cai quando os outros caem.', fx: { karma: 3, stats: { dao: 1, car: 1 }, setFlags: ['lon_cuidou_vila'] } } },
        { p: 'T', text: 'Ficar em casa cuidando só dos seus, com a porta fechada para evitar o contágio', res: { text: 'Seus pais e irmãos melhoram aos poucos, e nenhuma criança de fora entra. Do lado de fora, o murmúrio dos vizinhos é pesado. Quando a tosse passa, ninguém reprova você, mas ninguém esquece que a porta ficou fechada. Seu corpo, aprendeu, não é de todos.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['lon_porta_fechada'] } } },
        { p: 'A', text: 'Ir à boticária Seo Yun e oferecer seu corpo como exemplo para ela estudar', check: { stat: ['esp', 'car'], dif: -1 }, ok: { text: 'Seo Yun examina sua língua, seus olhos, sua urina, e anota tudo num caderno de couro. Você não tem a doença, e ela descobre o motivo: um leve gosto de raiz na sua água que ninguém mais bebe. A receita que ela cria salva uma dúzia de crianças, e seu nome vai no caderno.', fx: { fama: 2, karma: 2, stats: { comp: 1, esp: 1 }, setFlags: ['lon_boticaria'] } }, fail: { text: 'Seo Yun, sem tempo, o dispensa com uma pergunta cansada. Você volta para casa com a sensação de que ofereceu o corpo a quem não precisava dele. O que ela estudaria, estuda sozinha, e a vila sofre uma semana a mais.', fx: { stats: { dao: 1 } } } },
      ],
    },
    {
      id: 'lon_enterro_do_amigo', title: 'O primeiro da sua idade', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 20, ageMax: 40 },
      text: 'Min-jae, com quem você aprendeu a lutar no pátio, morre de uma febre comum numa noite de outono. Tinha trinta anos. Você estava ao lado dele dois dias antes, de pé, com o mesmo clima e a mesma água. O enterro é simples. Você percebe, olhando a cova, que o corpo que o seu amigo tinha e o corpo que você tem não são o mesmo tipo de promessa.',
      choices: [
        { p: 'C O', text: 'Assumir o cuidado da viúva e dos dois filhos do amigo', res: { text: 'Você leva arroz, repara o telhado e ensina o menino mais velho a manejar uma vara. A viúva aceita, sem agradecer, como quem sabe que o agradecimento seria falso. Com o tempo, o menino chama você de tio, e você carrega isso como quem carrega o peso de uma segunda vida.', fx: { fama: 1, karma: 3, pedras: -20, setFlags: ['lon_viuva_cuidada'] } } },
        { p: 'D', text: 'Ficar uma noite de vigília ao lado da cova e jurar fazer o que ele não fez', res: { text: 'A vigília é fria e longa. Você jura, sem testemunhas, viver as coisas que ele não viveu: ver o mar, cruzar a montanha, ensinar. No dia seguinte, parte sem avisar ninguém, com o juramento no peito e uma lista que só você conhece.', fx: { karma: 1, stats: { dao: 2 }, setFlags: ['lon_juramento_vigilia'] } } },
        { p: 'T', text: 'Voltar à rotina logo, sem tocar no assunto, para não carregar o que não se pode mudar', res: { text: 'Em duas semanas, a vida retorna ao curso. Você não menciona Min-jae, e ninguém menciona. Mas, na sétima semana, acorda no meio da noite com o nome dele na boca, e descobre que silêncio e esquecimento são coisas distintas.', fx: { stats: { dao: 1 }, setFlags: ['lon_silencio_amigo'] } } },
      ],
    },
    {
      id: 'lon_filhos_dos_outros', title: 'Os que você viu nascer', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 40, ageMax: 65 },
      text: 'Numa festa de colheita, você percebe que quase todos os rostos à sua volta são de pessoas que viu nascer ou crescer. Os da sua idade são raros: a maioria já se foi. Uma jovem pergunta, com respeito, como é viver tanto. Você tem a impressão, de repente, de ser uma espécie de arquivo ambulante da vila, e de que ninguém sabe o quanto isso pesa.',
      choices: [
        { p: 'C', text: 'Contar à jovem as histórias dos mortos, para que a vila os lembre', res: { text: 'Você fala por uma noite inteira, e a roda cresce. Os mais jovens ouvem nomes que não conheciam, e os mais velhos se calam, emocionados. Alguém propõe fazer um painel com os nomes na entrada da vila. O painel é feito, e você o repinta a cada primavera.', fx: { fama: 3, karma: 3, stats: { car: 1, dao: 1 }, setFlags: ['lon_memoria_da_vila'] } } },
        { p: 'T', text: 'Responder que é só costume, e mudar de assunto', res: { text: 'A jovem aceita a resposta com um sorriso educado. Você passa a festa observando em silêncio, reconhecendo gestos de gente que já se foi nos corpos dos netos. A solidão da longevidade é coisa que você não ensina a ninguém, e esta noite você a sente inteira.', fx: { stats: { dao: 1 }, setFlags: ['lon_solidao_aceita'] } } },
        { p: 'D', text: 'Ensinar à jovem a receita da longevidade: caminhar, comer pouco, dormir cedo', check: { stat: ['car', 'dao'], dif: 0 }, ok: { text: 'A jovem escuta, anota e, três anos depois, aparece mais saudável do que a maioria de sua geração. A vila adota o hábito, e as noites de colheita passam a ter mais rostos antigos. É um tipo de herança que não se pesa em moedas.', fx: { fama: 3, karma: 2, stats: { dao: 1 }, setFlags: ['lon_receita_ensinada'] } }, fail: { text: 'A jovem escuta com polidez e nada muda. Você descobre que a longevidade não se ensina como uma lição: se herda de um corpo, ou se conquista por anos de vigilância que ninguém quer repetir.', fx: { stats: { dao: 1 }, setFlags: ['lon_solidao_aceita'] } } },
      ],
    },
    {
      id: 'lon_ultima_da_mesa', title: 'A última cadeira ocupada', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 70 },
      text: 'Na mesa em que você janta há décadas, só restam duas cadeiras ocupadas: a sua e a de um neto de um amigo antigo. As outras, vazias, ainda têm o desenho dos corpos que as ocuparam. O neto pergunta se você não tem vontade de partir. Você olha as cadeiras e percebe que a pergunta, em outra voz, é a que carrega há anos.',
      choices: [
        { p: 'C O', text: 'Dizer a ele que fica porque ainda há quem queira ouvir os nomes que só você guarda', cond: { ...T, flagsAny: ['lon_memoria_da_vila', 'lon_viuva_cuidada', 'lon_cuidou_vila', 'lon_receita_ensinada', 'lon_boticaria'] }, res: { text: 'O neto fica calado, depois puxa uma cadeira para perto e pede que você comece. Você fala até de madrugada. Quando termina, os nomes estão menos sozinhos, e você, também. É uma forma de ficar que não precisa de saúde, só de voz.', fx: { fama: 3, karma: 4, stats: { dao: 2 }, setFlags: ['lon_ultimo_da_mesa', 'lon_nomes_passados'] } } },
        { p: 'D', text: 'Responder que a vontade de partir passa, e que a de ficar também, e que ambas são visitas', res: { text: 'O neto sorri sem entender, mas guarda a frase. Você termina o jantar, lava a tigela e senta na varanda. A noite é longa, tranquila, e a sua velhice, vista de fora, é só um homem ou uma mulher a respirar. Dentro, é uma vasta casa cheia.', fx: { karma: 1, stats: { dao: 2 }, setFlags: ['lon_ultimo_da_mesa'] } } },
        { p: 'T', text: 'Não responder, e servir mais uma porção de arroz ao neto', res: { text: 'O neto comeu em paz, e você ficou olhando, sem pensar em nada. É um jeito de ficar que não é glória nem martírio: um corpo que insiste, e uma mesa que ainda tem alguém.', fx: { stats: { dao: 1 }, setFlags: ['lon_ultimo_da_mesa'] } } },
      ],
    },
  ],
  opcoes: {
    murim_refugiados: [
      { p: 'C', text: 'Caminhar a noite toda ao lado da carroça, dando o lugar no assento a quem estiver mais frágil', cond: T, res: { text: 'Ao amanhecer, as três famílias estão inteiras e você sente apenas o cansaço de uma noite comum. Uma velha, que ia deitada, o abençoa em voz baixa e conta que já conheceu três gerações da sua família. Você sabe de quem ela fala, e a conversa dura até a cidade.', fx: { karma: 3, setFlags: ['lon_noite_caminhada'] } } },
    ],
    murim_inverno: [
      { p: 'C', text: 'Dormir ao relento junto ao celeiro, cedendo o abrigo a quem não aguenta o frio', cond: T, res: { text: 'A noite é gelada, e você a atravessa só com um manto. Pela manhã, ninguém acredita que dormiu fora. Alguns concluem que é santo; outros, que é doido. Você só conclui que o corpo é, às vezes, a única moeda que não se esgota.', fx: { fama: 3, karma: 3, setFlags: ['lon_noite_ao_relento'] } } },
    ],
    murim_dia_comum: [
      { p: 'D', text: 'Tomar a sopa de raízes amargas que a velha da estrada oferece, como todo dia', cond: T, res: { text: 'A velha ri baixo: é a quarta vez que você passa, e a quarta vez que aceita. Ela diz que, se todos fossem como você, não precisaria da sopa. Mas é a sopa que mantém o corpo, e ambos sabem, calados, que a saúde é tarefa, não presente.', fx: { karma: 1, stats: { fis: 1 }, setFlags: ['lon_sopa_amarga'] } } },
    ],
    murim_final_vida: [
      { p: 'O', text: 'Escrever, durante o inverno, uma carta a cada pessoa que sobreviveu a você', cond: T, res: { text: 'São trinta e duas cartas, escritas devagar, com a mão cansada. Algumas serão lidas, outras ficarão em gavetas. Mas, ao selar a última, você tem a sensação de ter feito o inventário certo de uma vida longa: não de feitos, mas de pessoas.', fx: { fama: 2, karma: 3, stats: { dao: 1 }, setFlags: ['lon_cartas_ao_fim'] } } },
    ],
    murim_peregrinos: [
      { p: 'O', text: 'Pedir ao monge o segredo de como ele chegou à idade que tem sem perder o sorriso', cond: T, res: { text: 'O monge ri até se engasgar. Diz que não há segredo: apenas decidiu, aos quarenta, que a velhice seria um lugar e não um castigo. Você anota a frase e a leva consigo pelos anos que virão, que são muitos.', fx: { karma: 1, stats: { dao: 2 }, setFlags: ['lon_velhice_lugar'] } } },
    ],
    murim_retorno: [
      { p: 'C', text: 'Reconhecer o menino que tenta alcançar o vão como neto de alguém que você conheceu', cond: T, res: { text: 'O menino se assusta ao ser chamado pelo nome do avô, mas ouve, de olhos largos, as histórias do homem que ele nunca viu. A ponte, que sobreviveu aos dois, ganha ali uma nova camada de lembrança. Você vai embora devagar, com a sensação de ser a última página de um livro velho.', fx: { fama: 2, karma: 3, setFlags: ['lon_neto_do_amigo'] } } },
    ],
  },
};
