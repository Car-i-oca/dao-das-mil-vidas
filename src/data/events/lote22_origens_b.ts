import type { GameEvent } from '../../types';

/** Lote 22 — Origens (parte 2): cinco cenas próprias nos primeiros 20 anos para cada uma das origens restantes. */
const O = (id: string, ageMin: number, ageMax: number) => ({ origin: [id], ageMin, ageMax, tierMax: 1 });

export const lote22OrigensB: GameEvent[] = [
  /* ================= REBENTO DA SEITA DEMONÍACA ================= */
  {
    id: 'og_demonio_ritual', title: 'O Primeiro Ritual de Sangue', rarity: 'comum', once: true, weight: 3,
    cond: O('filho_demonio', 8, 14),
    text: 'Aos oito anos, você assiste ao seu primeiro ritual: os mais velhos riscam círculos de sangue no chão, entoam um cântico grave, e um frasco de líquido negro ferve no centro. Sua mãe aperta sua mão. "Olhe sem medo", sussurra. "É de onde viemos."',
    choices: [
      { text: 'Olhar com atenção, sem desviar o rosto.', res: { text: 'O cheiro é ferroso e doce. Algo no seu peito reconhece o ritmo do cântico. Os anciões o notam, e trocam olhares.', fx: { stats: { fis: 1, esp: 1 }, corr: 3, setFlags: ['notado_pelos_anciaos'] } } },
      { text: 'Esconder o rosto no ombro da mãe.', res: { text: 'Ela acaricia seu cabelo, e não diz nada. Uma parte dela, talvez, também queria fazer o mesmo.', fx: { stats: { dao: 1 }, karma: 2 } } },
      { text: 'Perguntar à mãe por que precisam disso.', check: { stat: ['comp', 'car'], dif: 0 }, ok: { text: 'Ela sorri com tristeza, e responde com uma frase pronta: "Para sobreviver." Algo em seu olhar, no entanto, diz que ela mesma duvida.', fx: { stats: { comp: 1, dao: 1 }, setFlags: ['mae_duvida'] } }, fail: { text: 'Ela manda você calar. Os anciões o fitam. Você aprende, cedo, a medir as perguntas.', fx: { stats: { dao: 1 }, corr: 1 } } },
    ],
  },
  {
    id: 'og_demonio_irmao', title: 'O Irmão Mais Velho', rarity: 'comum', once: true, weight: 3,
    cond: O('filho_demonio', 9, 16),
    text: 'Seu irmão mais velho, o orgulho da família, voltou de uma missão com um olhar vago e as mãos manchadas. À noite, você o vê chorar sozinho, olhando as próprias palmas. Ele pede que você não conte a ninguém.',
    choices: [
      { text: 'Prometer silêncio e ficar ao lado dele.', res: { text: 'Ele fala pouco, mas fica mais leve. Pela primeira vez, você entende que a fraqueza também é um tipo de coragem.', fx: { karma: 4, stats: { dao: 2 }, setFlags: ['irmao_confidente'] } } },
      { text: 'Contar aos anciões: fraqueza é perigo.', res: { text: 'Ele é "corrigido" por três dias. Quando volta, está de novo sorrindo, e você nunca mais vê as lágrimas, nem os olhos dele.', fx: { karma: -4, corr: 3, stats: { dao: -1 }, fama: 1 } } },
      { text: 'Perguntar o que ele viu na missão.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Ele conta, aos poucos: a vila, as crianças, a ordem. Você jura nunca ser aquele que obedece sem perguntar.', fx: { stats: { dao: 2, comp: 1 }, karma: 2, setFlags: ['irmao_confidente'] } }, fail: { text: 'Ele diz que, se você precisa perguntar, ainda é cedo. Você sai com uma dúvida e uma ferida.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'og_demonio_fuga', title: 'Fugir ou Ficar', rarity: 'raro', once: true, weight: 2.5,
    cond: O('filho_demonio', 12, 18),
    text: 'Uma mensageira de uma seita justa o aborda em segredo: "Sabemos quem você é, e que não precisa ser como eles. Há um lugar para você entre os justos. Mas precisa decidir agora; a caravana parte ao amanhecer."',
    choices: [
      { text: 'Fugir com a caravana.', res: { text: 'A fuga é feita em silêncio, pelo muro dos fundos. Atrás, fica a casa, a mãe, o irmão. À frente, um mundo onde seu sobrenome é um perigo.', fx: { karma: 8, corr: -5, setFlags: ['fugiu_da_seita_demoniaca'], stats: { dao: 2 } } } },
      { text: 'Ficar e fingir que nunca ouviu.', res: { text: 'A mensageira some, e a vida segue. Você nunca mais fala daquilo, mas, às vezes, olha o muro dos fundos.', fx: { stats: { fis: 1, esp: 1 }, corr: 3 } } },
      { text: 'Denunciar a mensageira aos anciões.', res: { text: 'A mensageira é capturada. Você ganha um elogio, e uma sombra de culpa que nunca vai sair.', fx: { karma: -10, corr: 8, fama: 3, stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'og_demonio_mae', title: 'A Mãe Que Cantava Baixinho', rarity: 'comum', once: true, weight: 3,
    cond: O('filho_demonio', 7, 15),
    text: 'À noite, sua mãe canta uma canção de ninar que não tem nada de sombria: palavras de uma terra que ela nunca nomeia. Quando alguém entra, ela para. Você percebe que ela esconde esse hábito dos outros. Uma vez, você a viu chorando perto do poço.',
    choices: [
      { text: 'Aprender a canção e cantá-la junto.', res: { text: 'Por anos, vocês dividem esse segredo. Quando ela adoece, a canção é o que mais lembra dela.', fx: { karma: 3, stats: { dao: 2 }, setFlags: ['mae_duvida'] } } },
      { text: 'Perguntar de onde vem a canção.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Ela conta que veio de uma vila ao sul, queimada pelos "bons" antes de ela ser levada. Nenhum lado é só o que parece.', fx: { stats: { comp: 2, dao: 1 }, karma: 1 } }, fail: { text: 'Ela se cala, e muda de assunto. Mas deixa a canção, a partir daquela noite, um pouco mais alta.', fx: { stats: { dao: 1 } } } },
      { text: 'Fingir que não ouve.', res: { text: 'Você dorme ouvindo, e acorda sentindo falta, como quem perde um calor.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'og_demonio_missao', title: 'A Primeira Missão', rarity: 'raro', once: true, weight: 2.5,
    cond: O('filho_demonio', 13, 19),
    text: 'Os anciões o chamam: sua primeira missão será coletar "essência" de um vilarejo ao pé da montanha. Os detalhes, eles dizem, importam pouco. Basta voltar com o frasco cheio. Há crianças naquele vilarejo, e um velho que, segundo os registros, "já viveu o suficiente".',
    choices: [
      { text: 'Cumprir a missão: é o preço da pertença.', res: { text: 'O frasco volta cheio, e você, vazio. Os anciões o elogiam, e você nunca mais se olha no espelho com facilidade.', fx: { corr: 12, karma: -12, stats: { fis: 2, esp: 1 }, fama: 3 } } },
      { text: 'Voltar com o frasco cheio de outra coisa, e mentir.', check: { stat: ['comp', 'car'], dif: 1 }, ok: { text: 'Um frasco de sangue de animal, e uma história convincente. Os anciões não percebem. Nasce em você uma arte perigosa: enganar mestres.', fx: { karma: 3, stats: { comp: 2, car: 1 }, setFlags: ['mentiu_aos_anciaos'] } }, fail: { text: 'Os anciões percebem o truque. A punição é longa e dolorosa, e você a aceita em silêncio.', fx: { ferida: 2, corr: 4, stats: { dao: 2 } } } },
      { text: 'Avisar o vilarejo e fugir.', res: { text: 'A aldeia se esvazia em uma noite. Você corre, sem rumo, com uma caçada no seu calcanhar e uma paz estranha no peito.', fx: { karma: 10, corr: -6, setFlags: ['fugiu_da_seita_demoniaca', 'perseguido_por_demoniacos'], stats: { dao: 3 } } } },
    ],
  },

  /* ================= MENDIGO DAS ESTRADAS ================= */
  {
    id: 'og_mendigo_fome', title: 'A Noite Sem Pão', rarity: 'comum', once: true, weight: 3,
    cond: O('mendigo_iluminado', 7, 14),
    text: 'É o terceiro dia sem comida. As ruas de {vila} cheiram a pão, e cada janela é uma tentação. Você está sentado sob uma ponte, observando os peixes. Uma mulher passa, deixa cair uma moeda sem perceber, e continua.',
    choices: [
      { text: 'Devolver a moeda à mulher.', check: { stat: ['fis', 'car'], dif: 0 }, ok: { text: 'Ela se vira, perplexa. Dá-lhe um pão inteiro, e um conselho: "Honra de mendigo vale mais que ouro." A refeição tem o gosto de uma vitória.', fx: { karma: 4, stats: { dao: 1, car: 1 } } }, fail: { text: 'Ela já se foi quando você a alcança. Você fica com a moeda, e com a dúvida sobre o que fazer.', fx: { pedras: 1, stats: { dao: 1 } } } },
      { text: 'Ficar com a moeda e comprar comida.', res: { text: 'O pão é quente e imenso. Você o divide com um cão de rua, e os dois dormem bem pela primeira vez em dias.', fx: { pedras: 0, stats: { fis: 1 }, karma: 1 } } },
      { text: 'Pescar com as mãos, como o pai ensinou.', check: { stat: ['sor', 'fis'], dif: 0 }, ok: { text: 'Dois peixes pequenos, assados em fogo de gravetos. É pouco, e é seu. A fome cede, e uma calma estranha desce.', fx: { stats: { sor: 1, dao: 1 } } }, fail: { text: 'Os peixes escorregam. Você dorme de barriga vazia, e sonha com mesas fartas.', fx: { ferida: 1, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'og_mendigo_monge', title: 'O Monge Mendicante', rarity: 'comum', once: true, weight: 3,
    cond: O('mendigo_iluminado', 8, 16),
    text: 'Um monge de túnica remendada senta-se ao seu lado, sem dizer nada, dividindo o espaço sob o toldo. Depois de uma hora, tira de dentro da manga uma tigela vazia e a coloca entre vocês dois. "Hoje, nenhum de nós come", diz. "Mas a tigela é grande o bastante para os dois."',
    choices: [
      { text: 'Sentar em silêncio ao lado dele.', res: { text: 'As horas passam. A fome, em vez de crescer, vira um tipo de clareza. Ao anoitecer, o monge sorri: "É isso. Não é a tigela. É o espaço."', fx: { stats: { dao: 3 }, setFlags: ['licao_da_tigela'] } } },
      { text: 'Perguntar por que ele não pede comida.', res: { text: 'Ele ri baixo. "Quem pede, escolhe. Quem espera, recebe." Ao amanhecer, alguém deixa um pacote de arroz na tigela, sem dizer nada.', fx: { stats: { dao: 1, sor: 1 }, karma: 2 } } },
      { text: 'Pedir comida ao primeiro passante.', res: { text: 'Funciona, e o monge assiste em silêncio. Quando você divide a comida com ele, ele agradece, e vai embora com um sorriso estranho.', fx: { stats: { car: 1 }, karma: 1 } } },
    ],
  },
  {
    id: 'og_mendigo_ponte', title: 'Dormir Sob a Ponte', rarity: 'comum', once: true, weight: 3,
    cond: O('mendigo_iluminado', 9, 17),
    text: 'A chuva forte despeja sobre {vila}, e a ponte vira lar de dez pessoas. Há um velho que tosse, duas crianças que se abraçam, e uma mulher que reparte cobertores. Alguém sugere que o mais forte fique com o melhor canto.',
    choices: [
      { text: 'Ceder seu canto ao velho que tosse.', res: { text: 'Você dorme encolhido e molhado, e acorda com o velho pegando sua mão: "Obrigado". É o primeiro agradecimento em muito tempo.', fx: { karma: 5, stats: { dao: 1, car: 1 } } } },
      { text: 'Organizar um revezamento justo entre todos.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Ninguém reclama. Pela primeira vez, a ponte parece uma casa. Você ganha, entre os pobres, um respeito silencioso.', fx: { fama: 2, karma: 3, stats: { car: 2 } } }, fail: { text: 'Duas pessoas brigam pelo canto mais seco. Você leva um soco por tentar apartar.', fx: { ferida: 1, karma: 1 } } },
      { text: 'Ficar com o melhor canto: você chegou primeiro.', res: { text: 'Dorme bem, e acorda sem apetite. A tosse do velho, durante a noite, é uma música que te segue.', fx: { karma: -3, stats: { fis: 1 } } } },
    ],
  },
  {
    id: 'og_mendigo_pao', title: 'O Roubo do Pão', rarity: 'comum', once: true, weight: 3,
    cond: O('mendigo_iluminado', 10, 17),
    text: 'A padaria de uma viúva tem um tabuleiro de pães quentes na janela. Ninguém por perto. Seu estômago ronca tão alto que parece uma voz. Faz quatro dias que você não come direito.',
    choices: [
      { text: 'Pedir um pão em troca de varrer a loja.', check: { stat: ['car', 'dao'], dif: 0 }, ok: { text: 'A viúva sorri, suspeitando e admirando. Você varre, lava, empilha. No fim, recebe três pães e um prato de sopa.', fx: { karma: 3, stats: { car: 1, fis: 1 }, setFlags: ['amiga_da_padaria'] } }, fail: { text: 'Ela recusa, desconfiada. Você sai com a barriga vazia e o orgulho intacto.', fx: { stats: { dao: 1 } } } },
      { text: 'Roubar um pão e fugir.', check: { stat: ['sor', 'fis'], dif: 0, tag: 'fuga' }, ok: { text: 'O pão é quente na sua mão, e doce de culpa. Você o come atrás de um muro, chorando sem saber por quê.', fx: { karma: -2, stats: { sor: 1 } } }, fail: { text: 'A viúva grita, o guarda corre, você leva uma surra e perde o pão. A fome, depois, parece justiça.', fx: { ferida: 2, karma: -2, fama: -1 } } },
      { text: 'Ir embora sem pão, de cabeça erguida.', res: { text: 'A fome aperta. Mas há algo de limpo na recusa, uma pequena armadura invisível que você veste.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'og_mendigo_tesouro', title: 'O Tesouro do Lixo', rarity: 'raro', once: true, weight: 2.5,
    cond: O('mendigo_iluminado', 11, 18),
    text: 'Remexendo no monte de lixo atrás de uma mansão, você encontra uma caixinha de laca, rachada e suja. Dentro, uma pedra escura, tépida, que parece pulsar. Um criado, pela janela, o vê, e franze a testa.',
    choices: [
      { text: 'Guardar a pedra e correr.', check: { stat: ['sor', 'fis'], dif: 0, tag: 'fuga' }, ok: { text: 'Você escapa por becos conhecidos. A pedra, no escuro, brilha em tons de azul. É uma pedra espiritual de qualidade inesperada.', fx: { pedras: 12, xp: 3, stats: { sor: 1, esp: 1 } } }, fail: { text: 'O criado o alcança, e toma a pedra de volta com um tapa. Você sai com o rosto vermelho.', fx: { ferida: 1, karma: -1 } } },
      { text: 'Devolver a pedra ao criado.', res: { text: 'O criado, atônito, relata ao patrão. Em agradecimento, você ganha uma refeição, um par de sapatos, e uma estranha lealdade da casa.', fx: { karma: 4, pedras: 2, stats: { dao: 1, car: 1 } } } },
      { text: 'Entregar a pedra a um templo.', res: { text: 'O monge examina, perplexo, e a guarda no altar. A sua moeda, em troca, é um olhar de reconhecimento, e uma bênção.', fx: { karma: 5, stats: { dao: 2 }, setFlags: ['bem_visto_no_templo'] } } },
    ],
  },

  /* ================= PRÍNCIPE(SA) DECAÍDO(A) ================= */
  {
    id: 'og_principe_palacio', title: 'O Palácio em Cinzas', rarity: 'comum', once: true, weight: 3,
    cond: O('principe_decaido', 7, 13),
    text: 'Das janelas da casa de campo para onde fugiu, você vê, ao longe, a fumaça do que foi o palácio. Seu tio assumiu o trono. O velho guardião da família, Zhao, queimou o próprio uniforme para escondê-lo entre os camponeses.',
    choices: [
      { text: 'Jurar vingança, de punho cerrado.', res: { text: 'A promessa pesa mais do que você. Mas é um motor, e um fardo, que o acompanhará por anos.', fx: { stats: { dao: 2 }, setFlags: ['jurou_vinganca_trono'], karma: -1 } } },
      { text: 'Aceitar a vida simples e esquecer o trono.', res: { text: 'Aprende a ordenhar, a fazer fogo, a viver com pouco. Descobre, aos poucos, que a paz tem mais valor do que o poder que perdeu.', fx: { stats: { dao: 1, fis: 1 }, karma: 3 } } },
      { text: 'Perguntar a Zhao o que realmente aconteceu.', check: { stat: ['comp', 'car'], dif: 0 }, ok: { text: 'Zhao conta a verdade, devagar: uma conspiração, um veneno, uma traição dentro da própria família. Você sai mais velho, e mais atento.', fx: { stats: { comp: 2, dao: 1 }, setFlags: ['sabe_da_conspiracao'] } }, fail: { text: 'Zhao diz que é cedo demais para saber. A dúvida cresce, corrosiva.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'og_principe_servo', title: 'O Antigo Servo Leal', rarity: 'comum', once: true, weight: 3,
    cond: O('principe_decaido', 8, 15),
    text: 'Zhao, o antigo guardião, trabalha agora como lenhador, mas continua tratando você como "Alteza" quando ninguém vê. Hoje, ele aparece machucado, com um corte no braço, e esconde algo debaixo da túnica.',
    choices: [
      { text: 'Cuidar do ferimento dele.', res: { text: 'O corte é fundo, e Zhao cala a dor. Quando termina, ele revela o que escondia: o selo do seu pai, que conseguira salvar.', fx: { karma: 3, item: ['selo_do_guardiao'], stats: { car: 1, dao: 1 } } } },
      { text: 'Perguntar quem o machucou.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Soldados do seu tio vasculham as aldeias. Você aprende, cedo, a escolher os esconderijos.', fx: { stats: { comp: 2 }, setFlags: ['perseguido_pelo_tio'] } }, fail: { text: 'Zhao muda de assunto, com respeito. Você nota o quanto ele esconde para protegê-lo.', fx: { stats: { dao: 1 } } } },
      { text: 'Pedir que ele o ensine a lutar.', res: { text: 'Zhao, de início, relutante, passa a treinar você ao amanhecer, com varas de bambu. Em um ano, seus golpes são decentes, e a postura, real.', fx: { stats: { fis: 2, dao: 1 }, setFlags: ['treinado_por_zhao'] } } },
    ],
  },
  {
    id: 'og_principe_etiqueta', title: 'A Etiqueta Inútil', rarity: 'comum', once: true, weight: 3,
    cond: O('principe_decaido', 9, 17),
    text: 'Você faz uma reverência perfeita ao fazendeiro que lhe vende ovos, e o homem quase derruba a cesta. Você fala com os camponeses no tom de quem dá ordens, e eles se encolhem, por medo ou respeito. A etiqueta aprendida no palácio nunca foi tão inútil, nem tão vistosa.',
    choices: [
      { text: 'Aprender a falar como um camponês.', res: { text: 'Leva tempo. O sotaque, a postura, os gestos. Em um ano, ninguém suspeitaria do seu passado.', fx: { stats: { car: 1, sor: 1 }, setFlags: ['disfarce_de_campones'] } } },
      { text: 'Manter os modos e ensinar a vila a ler.', res: { text: 'A vila aprende a ler os próprios nomes, e a aldeia passa a vê-lo com carinho. O seu passado, de algum modo, vira recurso.', fx: { karma: 4, fama: 3, stats: { comp: 1, car: 1 } } } },
      { text: 'Usar a etiqueta para impressionar um mercador e conseguir crédito.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'O mercador, deslumbrado, lhe abre crédito generoso. É a primeira vez que seu nome rende mais do que o esperado.', fx: { pedras: 8, stats: { car: 2 } } }, fail: { text: 'O mercador desconfia de tanta pompa, e o ignora. A aldeia ri, baixinho.', fx: { fama: -1, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'og_principe_pretendente', title: 'O Pretendente ao Trono', rarity: 'raro', once: true, weight: 2.5,
    cond: O('principe_decaido', 12, 19),
    text: 'Um estranho de capa fina bate à porta, dizendo-se enviado por um grupo de nobres leais ao seu pai. Eles querem coroá-lo, derrubar o tio e restaurar a dinastia. Seria, dizem, uma guerra curta. Seria, você suspeita, uma longa.',
    choices: [
      { text: 'Aceitar a causa e liderar o levante.', res: { text: 'A conspiração cresce, e com ela o risco. Em poucos anos, você é o rosto de uma revolta, adorado por uns, caçado por muitos.', fx: { fama: 8, karma: -2, setFlags: ['levante_dinastico', 'perseguido_pelo_tio'], stats: { car: 2 } } } },
      { text: 'Recusar e desaparecer de vez.', res: { text: 'O estranho se vai, com desprezo. Você muda de nome, de cidade, de ofício, e começa uma vida em que ninguém sabe o seu passado.', fx: { stats: { dao: 2, sor: 1 }, karma: 2, setFlags: ['renunciou_ao_trono'] } } },
      { text: 'Pedir tempo para pensar, e consultar Zhao.', res: { text: 'Zhao diz: "Um trono não é uma casa. Mas pode ser uma tumba." Com essa frase, você decide por conta própria, e fica mais velho.', fx: { stats: { dao: 2, comp: 1 } } } },
    ],
  },

  /* ================= DISCÍPULO DO EREMITA ================= */
  {
    id: 'og_eremita_licao', title: 'A Lição do Silêncio', rarity: 'comum', once: true, weight: 3,
    cond: O('discipulo_eremita', 7, 13),
    text: 'Seu mestre, o eremita, passa uma manhã inteira sentado diante de você, sem dizer uma palavra. Ao meio-dia, você já está agitado, a perna formigando, o estômago reclamando. Ele, imóvel, parece parte da pedra.',
    choices: [
      { text: 'Aguentar o silêncio até o fim do dia.', check: { stat: ['dao', 'fis'], dif: 0 }, ok: { text: 'Ao entardecer, o mestre abre os olhos e sorri. "Agora você sabe o que é um minuto." A lição tem o peso de uma pedra, e a leveza de uma pluma.', fx: { stats: { dao: 3 }, setFlags: ['licao_do_silencio'] } }, fail: { text: 'Você desiste ao meio da tarde. O mestre só dá de ombros. "O silêncio também espera."', fx: { stats: { dao: 1 } } } },
      { text: 'Quebrar o silêncio com uma pergunta.', res: { text: 'O mestre diz: "Você já respondeu", e volta a fechar os olhos. A pergunta, descobre mais tarde, era a resposta.', fx: { stats: { comp: 2 } } } },
      { text: 'Imitar a postura dele e ver o que acontece.', res: { text: 'Você se senta, ereto, e fecha os olhos. Em algum momento, o mundo parece parar. Quando abre os olhos, o sol já se pôs.', fx: { stats: { dao: 2, esp: 1 } } } },
    ],
  },
  {
    id: 'og_eremita_descer', title: 'Descer a Montanha', rarity: 'comum', once: true, weight: 3,
    cond: O('discipulo_eremita', 10, 17),
    text: 'O eremita lhe entrega uma cesta e uma carta: "Leve à vila abaixo e traga sal". É a primeira vez que você descerá sozinho. O caminho tem três horas de descida, e a vila, dizem, é cheia de gente, de cheiros e de ruídos.',
    choices: [
      { text: 'Descer e cumprir a tarefa com atenção.', res: { text: 'A vila é um caos amável. Você compra o sal, aprende a pechinchar, e volta com os bolsos cheios de histórias novas.', fx: { stats: { car: 1, comp: 1 }, pedras: 2 } } },
      { text: 'Descer e explorar um pouco antes de voltar.', check: { stat: ['sor', 'car'], dif: 0 }, ok: { text: 'Você descobre uma livraria, uma ferraria, uma casa de chá. E uma menina que ri de você, e diz o seu nome.', fx: { stats: { car: 2, sor: 1 }, setFlags: ['conheceu_a_vila'] } }, fail: { text: 'A vila é demais. Você se perde, volta tarde, e leva do mestre uma tigela de chá frio e um olhar sereno.', fx: { stats: { dao: 1 } } } },
      { text: 'Não descer: o mundo lá embaixo é distração.', res: { text: 'O mestre olha, e diz: "Fugir também é uma forma de se apegar." Você passa a noite pensando nisso.', fx: { stats: { dao: 1, comp: 1 } } } },
    ],
  },
  {
    id: 'og_eremita_visitante', title: 'O Visitante da Montanha', rarity: 'raro', once: true, weight: 2.5,
    cond: O('discipulo_eremita', 11, 18),
    text: 'Um espadachim de armadura gasta sobe à cabana do eremita, pedindo um duelo. "Dizem que o senhor foi o maior de sua geração. Preciso saber se é verdade." O eremita serve chá, sem olhar para a espada. Você observa, escondido.',
    choices: [
      { text: 'Intervir em defesa do mestre.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você interpõe um bastão entre os dois, com sorte e desespero. O espadachim, surpreso, ri, e deixa a lâmina na bainha. "Este menino tem o fogo do mestre."', fx: { fama: 3, stats: { dao: 2, fis: 1 } } }, fail: { text: 'O espadachim o afasta com um gesto, quase sem tocar. O eremita, só então, se levanta, e o duelo acontece sem você.', fx: { ferida: 1, stats: { dao: 1 } } } },
      { text: 'Observar o duelo em silêncio.', res: { text: 'É curto: um gesto, um som, uma lâmina caindo. O eremita não saca nada. "Eu perdi esse duelo há muito tempo", diz ao visitante. "Você ainda não percebeu."', fx: { stats: { dao: 3, comp: 1 }, setFlags: ['viu_duelo_do_mestre'] } } },
      { text: 'Chamar o visitante para chá.', res: { text: 'O espadachim, desarmado pela gentileza, senta-se. Passam a noite falando de rios, de montanhas, e de por que todo duelo é uma forma de solidão.', fx: { karma: 3, stats: { car: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'og_eremita_lenha', title: 'Lenha e Água', rarity: 'comum', once: true, weight: 3,
    cond: O('discipulo_eremita', 8, 16),
    text: 'Todos os dias, você carrega água do riacho e corta lenha para o fogão. Parece uma tarefa sem sentido, mas o eremita diz que "quem corta lenha com atenção, corta o mundo com precisão". Hoje, o machado parece cantar em suas mãos.',
    choices: [
      { text: 'Cortar a lenha com cada golpe em silêncio e atenção total.', check: { stat: ['fis', 'dao'], dif: 0 }, ok: { text: 'Cada golpe tem o mesmo som. O mundo desaparece, e só o machado resta. Quando termina, a lenha está empilhada com perfeição, e você, calmo como um lago.', fx: { stats: { fis: 1, dao: 2 } } }, fail: { text: 'A mente vaga, o machado erra, e a lenha racha mal. O mestre, passando, só pergunta: "Onde você estava?"', fx: { stats: { dao: 1 } } } },
      { text: 'Tentar cortar mais rápido, para sobrar tempo livre.', res: { text: 'A lenha sai, torta e rápida. O mestre, ao ver, sorri: "A pressa é uma forma de fuga." Você refaz tudo, devagar.', fx: { stats: { dao: 1, fis: 1 } } } },
      { text: 'Pedir ao mestre que explique o sentido da tarefa.', res: { text: 'Ele diz: "Não há sentido. Há lenha." Você ri, e por um instante entende.', fx: { stats: { comp: 1, dao: 1 } } } },
    ],
  },
  {
    id: 'og_eremita_doente', title: 'O Mestre Adoece', rarity: 'comum', once: true, weight: 2.5,
    cond: O('discipulo_eremita', 13, 19),
    text: 'O eremita, que parecia eterno, acorda com febre. Tosse, treme, recusa comida. Pela primeira vez, você o vê frágil. Ele diz para não se preocupar, mas a voz falha. A vila mais próxima está a três horas, e o inverno apertou.',
    choices: [
      { text: 'Descer a montanha em busca de um médico.', check: { stat: ['fis', 'sor'], dif: 1, tag: 'fuga' }, ok: { text: 'Você chega à vila ofegante, encontra um médico, e volta com ervas e um mapa. O mestre se recupera. Em silêncio, ele agradece.', fx: { karma: 4, stats: { fis: 1, dao: 1 }, setFlags: ['salvou_o_mestre'] } }, fail: { text: 'O inverno é cruel. Você volta tarde, com ervas insuficientes. O mestre melhora, mas ficará mais frágil.', fx: { ferida: 1, stats: { dao: 2 } } } },
      { text: 'Ficar e cuidar dele com o que tem.', res: { text: 'Chás, compressas, noites em claro. Três semanas depois, a febre cede. Ele, sorrindo, diz: "Agora, o mestre aprendeu uma lição."', fx: { karma: 3, stats: { dao: 2, comp: 1 } } } },
      { text: 'Pedir que ele o ensine uma última técnica, por precaução.', res: { text: 'O mestre ri, tosse, e ensina. A técnica é simples, e profundíssima. Ele se recupera, mas você nunca mais esquece o aviso.', fx: { tecnica: ['sutra_vazio_calmo'], stats: { dao: 1 } } } },
    ],
  },

  /* ================= PESCADOR DOS MARES ================= */
  {
    id: 'og_pescador_tempestade', title: 'A Tempestade no Mar', rarity: 'comum', once: true, weight: 3,
    cond: O('pescador_mares', 8, 15),
    text: 'A barca do seu pai é jogada de onda em onda por uma tempestade súbita. Ele grita ordens, você segura o remo, e a vela estala como um chicote. Um relâmpago ilumina, por um segundo, uma forma gigantesca sob a água.',
    choices: [
      { text: 'Remar com toda a força contra a corrente.', check: { stat: ['fis', 'sor'], dif: 0, tag: 'fuga' }, ok: { text: 'Horas depois, a barca encosta no porto, destruída e viva. O pai, calado, aperta sua mão por mais tempo que o normal.', fx: { stats: { fis: 2, sor: 1 }, karma: 1 } }, fail: { text: 'Uma onda quebra o remo. Vocês sobrevivem por pouco, agarrados ao mastro, e o pai paga um ano de pesca pela barca.', fx: { ferida: 1, stats: { fis: 1 } } } },
      { text: 'Rezar ao Rei do Mar enquanto o pai manobra.', res: { text: 'A tempestade passa, ou você acredita que passou por causa disso. O pai, que não é de rezar, murmura um agradecimento.', fx: { stats: { dao: 1 }, karma: 1 } } },
      { text: 'Observar a forma gigantesca sob a água.', check: { stat: ['esp', 'sor'], dif: 1 }, ok: { text: 'É uma serpente de mil anos, de olhos como lanternas de pagode. Ela o encara, e some. Algo em seu corpo reconhece o Qi do mar.', fx: { stats: { esp: 2, sor: 1 }, xp: 3, setFlags: ['viu_a_serpente'] } }, fail: { text: 'O reflexo do relâmpago o cega por um minuto. Quando abre os olhos, só há ondas e a voz do pai.', fx: { stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'og_pescador_serpente', title: 'A Serpente do Pai', rarity: 'raro', once: true, weight: 2.5,
    cond: O('pescador_mares', 10, 17),
    text: 'O pai nunca fala da serpente que viu, mas, a cada lua cheia, vai ao cais e fica de costas para o mar, de braços cruzados. Esta noite, você o segue e o ouve murmurar: "Eu não contei. Eu juro que não contei."',
    choices: [
      { text: 'Aproximar-se e perguntar o que ele quer dizer.', check: { stat: ['car', 'esp'], dif: 0 }, ok: { text: 'Ele chora, e fala. Há anos, a serpente lhe pediu um favor, e ele recusou. Desde então, o mar o vigia. Agora, você é parte da dívida.', fx: { stats: { dao: 2, esp: 1 }, setFlags: ['divida_da_serpente'] } }, fail: { text: 'Ele fica em pé, rígido: "Não é nada, volte para casa." A noite, depois, parece mais fria.', fx: { stats: { dao: 1 } } } },
      { text: 'Ficar escondido e observar o mar.', res: { text: 'No meio da noite, algo grande emerge e olha para a costa. Seu pai não se vira. Você, escondido, aprende a segurar a respiração.', fx: { stats: { esp: 1, dao: 1 }, setFlags: ['viu_a_serpente'] } } },
      { text: 'Voltar para casa e fingir que nada viu.', res: { text: 'O silêncio de família é a primeira lição de mar: o que não se diz também afunda.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'og_pescador_perola', title: 'A Rede com a Pérola', rarity: 'comum', once: true, weight: 3,
    cond: O('pescador_mares', 9, 17),
    text: 'Ao puxar a rede ao amanhecer, entre peixes prateados e algas, você encontra uma pérola do tamanho de uma ameixa, azul-leitosa, com um brilho que parece respirar. Seu pai arregala os olhos. É mais do que a família ganha num ano.',
    choices: [
      { text: 'Vender a pérola no mercado do porto.', res: { text: 'O comprador paga bem, mas a pérola, na hora de partir, brilha mais forte, como quem se despede. Você sente uma ponta de arrependimento.', fx: { pedras: 20, stats: { car: 1 } } } },
      { text: 'Guardar a pérola e estudá-la.', check: { stat: ['esp', 'comp'], dif: 0 }, ok: { text: 'Ao segurá-la, o Qi do mar flui, suave, para o seu peito. É uma pérola espiritual de verdade, e algo em seu corpo agradece.', fx: { stats: { esp: 2 }, xp: 3, item: ['perola_abismo'] } }, fail: { text: 'A pérola, depois de semanas, perde o brilho, como quem murcha. Alguma coisa nela só funcionava no mar.', fx: { stats: { comp: 1 } } } },
      { text: 'Devolver a pérola ao mar.', res: { text: 'A pérola afunda, e uma onda calma, de gratidão, lambe seus pés. Naquela semana, a pesca é a melhor da década.', fx: { karma: 4, stats: { sor: 2, dao: 1 } } } },
    ],
  },
  {
    id: 'og_pescador_marujo', title: 'O Velho Marujo', rarity: 'comum', once: true, weight: 3,
    cond: O('pescador_mares', 8, 16),
    text: 'No cais, um velho marujo de pernas tortas remenda redes e conta histórias a quem para. Fala de ilhas que somem, de baleias que cantam em outras línguas, e de um farol no fim do mundo. Ninguém sabe se mente, e ninguém tem coragem de perguntar.',
    choices: [
      { text: 'Pedir que ele o ensine a ler as estrelas.', res: { text: 'Ele concorda, resmungando. Em um ano, você sabe navegar pelos astros, prever tempestades pelas nuvens, e usar a bússola de pedra-ímã.', fx: { stats: { comp: 2, sor: 1 }, setFlags: ['navegador'] } } },
      { text: 'Ouvir as histórias, e anotar os nomes das ilhas.', res: { text: 'Uma delas, "Ilha dos Mil Sinos", você jura ter visto num sonho. Anota o nome, e o desenho da costa.', fx: { stats: { comp: 1, esp: 1 }, setFlags: ['ouviu_da_ilha'] } } },
      { text: 'Perguntar sobre o farol no fim do mundo.', check: { stat: ['comp', 'esp'], dif: 1 }, ok: { text: 'O velho cala, depois sussurra: "É onde terminam os mapas." Ele lhe dá um pedaço de tecido com símbolos antigos, que você guarda como um segredo.', fx: { stats: { esp: 2, comp: 1 }, setFlags: ['pista_do_farol'] } }, fail: { text: 'Ele ri, e muda de assunto. A pergunta, no entanto, fica dentro do seu peito.', fx: { stats: { sor: 1 } } } },
    ],
  },
  {
    id: 'og_pescador_barco', title: 'O Barco Emprestado', rarity: 'comum', once: true, weight: 2.5,
    cond: O('pescador_mares', 13, 19),
    text: 'Um comerciante oferece emprestar a você um barco pequeno, de vela latina e casco novo, por uma semana, para uma viagem de reconhecimento a uma ilha distante. Em troca, quer metade do que encontrar. O pai acha loucura. A mãe, em segredo, sorri.',
    choices: [
      { text: 'Aceitar e navegar até a ilha.', check: { stat: ['sor', 'fis', 'comp'], dif: 1 }, ok: { text: 'A ilha tem águas calmas, conchas raras e uma gruta de cristal azul. Você volta com a carga, e a certeza de que o mar é, de algum modo, seu.', fx: { pedras: 12, stats: { sor: 2, comp: 1 }, fama: 3 } }, fail: { text: 'O mar é traiçoeiro. Você volta, três dias depois, de barco danificado e dívida nas costas.', fx: { pedras: -6, stats: { fis: 1 }, ferida: 1 } } },
      { text: 'Recusar: não vale o risco.', res: { text: 'O pai agradece, aliviado. A mãe, em silêncio, entende e não entende. Você fica olhando o barco novo balançar no cais.', fx: { stats: { dao: 1 } } } },
      { text: 'Pedir ao comerciante um contrato por escrito.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'O comerciante, impressionado, aceita. A viagem rende lucro e um amigo influente no porto.', fx: { pedras: 8, stats: { car: 2, comp: 1 } } }, fail: { text: 'O comerciante se irrita com a desconfiança, e a oferta some. O pai, secretamente, sorri.', fx: { stats: { dao: 1 } } } },
    ],
  },

  /* ================= FILHO DE UM GUARDA DO REINO ================= */
  {
    id: 'og_guarda_treino', title: 'O Treino de Lança', rarity: 'comum', once: true, weight: 3,
    cond: O('filho_guarda', 8, 15),
    text: 'Todo amanhecer, seu pai o põe no pátio do quartel com uma lança de madeira e mil repetições. "Disciplina é o que sobra quando a coragem acaba", ele diz. Hoje, são mil e duzentas, porque você errou o ângulo na quinta.',
    choices: [
      { text: 'Fazer as mil e duzentas sem reclamar.', check: { stat: ['fis', 'dao'], dif: 0 }, ok: { text: 'No fim, o corpo é de chumbo e o espírito, de aço. O pai, sem sorrir, bate no seu ombro uma vez, e é o maior elogio que você já recebeu.', fx: { stats: { fis: 2, dao: 1 } } }, fail: { text: 'No oitocentos, as mãos sangram. O pai manda parar, e diz: "Amanhã continua."', fx: { ferida: 1, stats: { fis: 1 } } } },
      { text: 'Pedir ao pai que corrija o ângulo antes de repetir.', res: { text: 'Ele, surpreso, ajusta. A resposta é seca, mas respeitosa. Em um mês, seu golpe é o mais limpo do quartel.', fx: { stats: { comp: 1, fis: 1 } } } },
      { text: 'Treinar escondido, à noite, para aprender a lutar sem lança.', res: { text: 'No escuro, aprende a luta de mãos nuas com os soldados de plantão. É um segredo seu, e um golpe a mais.', fx: { stats: { fis: 1, sor: 1 }, setFlags: ['luta_de_maos'] } } },
    ],
  },
  {
    id: 'og_guarda_patrulha', title: 'A Patrulha Noturna', rarity: 'comum', once: true, weight: 3,
    cond: O('filho_guarda', 10, 17),
    text: 'Pela primeira vez, seu pai o leva à patrulha da noite pelas ruas de {vila}. Os becos têm sons que você nunca ouvira: pés descalços, sussurros, lâminas deslizando. Um vulto cruza o fim da rua, correndo, com um saco nas costas.',
    choices: [
      { text: 'Perseguir o vulto.', check: { stat: ['fis', 'sor'], dif: 0, tag: 'fuga' }, ok: { text: 'Você o alcança num beco sem saída. É um menino da sua idade, com pão roubado. O pai, chegando, fica com o dilema ao seu lado.', fx: { stats: { fis: 1, dao: 1 }, setFlags: ['pegou_o_ladrao'] } }, fail: { text: 'Você o perde numa esquina. O pai, sem dizer nada, apenas marca o ponto em um mapa mental.', fx: { stats: { fis: 1 } } } },
      { text: 'Chamar o pai, e deixar que ele conduza.', res: { text: 'O pai age com precisão, e o ladrão é pego. Você aprende que a disciplina às vezes é só saber quando chamar.', fx: { stats: { dao: 1, comp: 1 } } } },
      { text: 'Deixar o vulto fugir: parece um menino com fome.', res: { text: 'O pai, que viu, não diz nada. Ao voltarem, ele põe um pão no seu prato, sem comentar. Você entende.', fx: { karma: 3, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'og_guarda_capitao', title: 'O Capitão Corrupto', rarity: 'raro', once: true, weight: 2.5,
    cond: O('filho_guarda', 12, 19),
    text: 'O capitão do pelotão do seu pai recebe propinas dos mercadores, e, em troca, fecha os olhos para o contrabando. Seu pai sabe, e cala. Você, que viu os envelopes sendo trocados, sente o estômago revirar.',
    choices: [
      { text: 'Confrontar o capitão em particular.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O capitão ri, mas, vendo seus olhos, devolve os envelopes. Em um ano, a patrulha está mais limpa, e você, em perigo.', fx: { karma: 5, fama: 3, stats: { dao: 2, car: 1 }, setFlags: ['inimigo_secreto'] } }, fail: { text: 'O capitão manda seu pai punir o filho pela insolência. Os dois sofrem a humilhação em silêncio.', fx: { ferida: 1, fama: -2, stats: { dao: 1 } } } },
      { text: 'Falar com o pai antes de agir.', res: { text: 'O pai suspira, e confessa: "Eu sei. Se eu falar, perco o emprego. Se eu calar, perco a honra." Vocês dois ficam em silêncio por muito tempo.', fx: { stats: { dao: 2, comp: 1 } } } },
      { text: 'Aprender o esquema, sem se meter.', res: { text: 'Em um ano, você sabe quem paga, quanto, e para quê. É um conhecimento que, um dia, valerá mais que ouro, ou uma sentença.', fx: { stats: { comp: 2 }, karma: -2, setFlags: ['sabe_dos_segredos'] } } },
    ],
  },
  {
    id: 'og_guarda_amigo', title: 'O Amigo Que Virou Ladrão', rarity: 'comum', once: true, weight: 3,
    cond: O('filho_guarda', 11, 18),
    text: 'Seu melhor amigo de infância, filho de um padeiro, anda em más companhias e foi visto com um bando de ladrões. Seu pai, o guarda, tem uma ordem de prisão em mãos, e hesita em lê-la quando vê o nome.',
    choices: [
      { text: 'Avisar o amigo em segredo.', check: { stat: ['sor', 'car'], dif: 0 }, ok: { text: 'Ele foge a tempo, com um olhar cheio de gratidão e vergonha. Você nunca mais o vê, mas sabe que ele vive.', fx: { karma: 2, stats: { dao: 1, sor: 1 }, setFlags: ['avisou_o_amigo'] } }, fail: { text: 'O aviso chega tarde. O amigo é pego, e nunca mais olha para você do mesmo jeito.', fx: { karma: -2, stats: { dao: 1 } } } },
      { text: 'Falar com ele, e convencê-lo a se entregar.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'Ele aceita, depois de uma longa conversa. A pena é leve, e a amizade, redimida. Seu pai o olha com orgulho.', fx: { karma: 5, stats: { car: 2, dao: 1 }, fama: 2 } }, fail: { text: 'Ele cospe no chão, e foge. A amizade, ali, termina.', fx: { stats: { dao: 1 } } } },
      { text: 'Deixar que o pai cumpra a ordem.', res: { text: 'A lei é a lei. Seu pai cumpre o dever, e chora, de noite, sem que ninguém veja.', fx: { stats: { dao: 2 }, karma: -1 } } },
    ],
  },
  {
    id: 'og_guarda_ferido', title: 'O Pai Ferido', rarity: 'comum', once: true, weight: 2.5,
    cond: O('filho_guarda', 13, 19),
    text: 'Seu pai volta do serviço com uma flecha no ombro, e é carregado por dois colegas. Os médicos dizem que ele ficará bem, mas não poderá segurar a lança por meses. A família, que depende do soldo, olha para você.',
    choices: [
      { text: 'Assumir o posto do pai, como aprendiz de guarda.', res: { text: 'O capitão aceita, a contragosto. Por seis meses, você patrulha ao lado de homens que podiam ser seu pai, aprendendo mais do que treinou em dez anos.', fx: { stats: { fis: 2, dao: 1 }, pedras: 4, setFlags: ['foi_guarda'] } } },
      { text: 'Procurar outro trabalho para sustentar a casa.', res: { text: 'Você carrega pedras, ajuda na padaria, copia cartas. O dinheiro é pouco, mas suficiente. Seu pai, em silêncio, entende o peso dessa escolha.', fx: { stats: { dao: 1, car: 1 }, pedras: 3, karma: 2 } } },
      { text: 'Ir atrás de quem feriu o pai.', check: { stat: ['fis', 'comp'], dif: 1, tag: 'combate' }, ok: { text: 'Você encontra os bandidos numa estalagem, e, com ajuda de dois soldados, os captura. O pai, de cama, não diz nada, mas seus olhos brilham.', fx: { fama: 5, stats: { fis: 1, dao: 1 }, karma: 1 } }, fail: { text: 'Os bandidos são mais perigosos do que parecia. Você volta ferido, e o pai o repreende com ternura.', fx: { ferida: 2, stats: { dao: 1 } } } },
    ],
  },

  /* ================= REGRESSOR ================= */
  {
    id: 'og_regressor_desastre', title: 'O Desastre Que Você Já Viu', rarity: 'raro', once: true, weight: 3,
    cond: O('regressor', 7, 14),
    text: 'Você acorda com o cheiro de fumaça, e sabe, antes de abrir os olhos, o que vai acontecer: o incêndio que, na outra vida, levou metade de {vila}. Faltam duas horas. Ninguém acreditaria numa criança.',
    choices: [
      { text: 'Acordar os vizinhos e gritar até ser ouvido.', check: { stat: ['car', 'sor'], dif: 0 }, ok: { text: 'Metade da vila escapa, e os incrédulos, humilhados, agradecem tarde. Você sente, pela primeira vez, que o futuro pode mudar.', fx: { karma: 6, fama: 4, stats: { dao: 1, car: 1 }, setFlags: ['evitou_o_incendio'] } }, fail: { text: 'Poucos acreditam. O incêndio vem, menor do que antes, mas vem. Você aprende o peso de saber demais.', fx: { karma: 2, stats: { dao: 2 } } } },
      { text: 'Usar o seu conhecimento para esvaziar os celeiros vizinhos.', res: { text: 'Sem alarde, você afasta os grãos do fogo. A perda é menor, e a fome do inverno, evitada. Ninguém sabe quem foi.', fx: { stats: { comp: 2 }, karma: 3, pedras: 2 } } },
      { text: 'Deixar tudo acontecer: mudar demais o passado pode ser perigoso.', res: { text: 'O fogo vem, e leva o que levou da outra vez. Você vê tudo, e a paz que sente é amarga.', fx: { karma: -4, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'og_regressor_precos', title: 'Saber os Preços do Futuro', rarity: 'comum', once: true, weight: 3,
    cond: O('regressor', 9, 17),
    text: 'Na outra vida, o preço do sal dobrou no inverno de seus quinze anos, e quem estocou lucrou. Você sabe que isso está para acontecer, e conhece três outras variações de mercado que ninguém prevê. Um mercador pergunta, só por conversa, o que você acha.',
    choices: [
      { text: 'Aconselhar o mercador sobre o sal.', res: { text: 'Ele ri, mas compra. Quando o preço dobra, volta com um saco de moedas e uma pergunta: "Como sabia?". Você dá de ombros.', fx: { pedras: 15, stats: { car: 1, comp: 1 }, setFlags: ['previu_o_sal'] } } },
      { text: 'Estocar sal com as próprias economias.', check: { stat: ['sor', 'comp'], dif: 0 }, ok: { text: 'O estoque é pequeno, mas o lucro é real. Em um ano, você dobra a sua riqueza e aprende a ser discreto.', fx: { pedras: 12, stats: { comp: 1, sor: 1 } } }, fail: { text: 'Uma variação inesperada, que você não conhecia, anula o lucro. Você aprende que o passado também muda.', fx: { pedras: -2, stats: { comp: 1 } } } },
      { text: 'Calar: o futuro não é seu para vender.', res: { text: 'Você observa o mercado enlouquecer, e fecha os olhos. A paz que isso traz é pequena, e firme.', fx: { stats: { dao: 2 }, karma: 2 } } },
    ],
  },
  {
    id: 'og_regressor_morte', title: 'Quem Vai Morrer Neste Ano', rarity: 'raro', once: true, weight: 3,
    cond: O('regressor', 10, 18),
    text: 'Na outra vida, a velha curandeira da vila morreu no inverno dos seus dezesseis anos, de uma febre que você sabe agora como curar. Se ela viver, o vilarejo ganhará uma década de saúde. Mas, para tratá-la, você teria de revelar o que sabe.',
    choices: [
      { text: 'Tratá-la em segredo, com ervas que ninguém conhece.', check: { stat: ['comp', 'esp'], dif: 1, tag: 'alquimia' }, ok: { text: 'A febre cede em três dias. A velha, sem entender, olha para você por muito tempo, e murmura: "Você não é desta idade."', fx: { karma: 8, stats: { comp: 2, esp: 1 }, setFlags: ['salvou_a_curandeira'] } }, fail: { text: 'O remédio chega tarde. Ela morre, como da outra vez, nos seus braços. Você chora com a raiva de quem sabia.', fx: { karma: 2, stats: { dao: 2 }, corr: 2 } } },
      { text: 'Contar a verdade a ela.', res: { text: 'Ela ouve, calada. No fim, diz: "Faça o que puder, mas não carregue sozinho." Ela vive mais três anos, e morre em paz, com seu nome nos lábios.', fx: { karma: 5, stats: { dao: 2, car: 1 }, setFlags: ['curandeira_sabe'] } } },
      { text: 'Aceitar a morte: mudar demais traz consequências.', res: { text: 'Você a visita todos os dias, sem tentar curar. Ela parte em paz, sem saber o que perdeu. Você, sabendo, carrega.', fx: { karma: -3, stats: { dao: 3 } } } },
    ],
  },
  {
    id: 'og_regressor_rival', title: 'O Rival Que Ainda Não É Rival', rarity: 'comum', once: true, weight: 3,
    cond: O('regressor', 11, 18),
    text: 'Na vila, um menino de sorriso fácil faz amizade com todos, inclusive com você. Na outra vida, ele se tornou o maior inimigo que você teve, e o responsável pela sua queda. Agora, ele só quer jogar pedra no riacho.',
    choices: [
      { text: 'Tornar-se seu melhor amigo, para mudar o futuro.', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Ele se apega a você. Meses depois, jura lealdade. Você se pergunta se aquilo é amizade, ou só tática, e a dúvida lhe pesa.', fx: { karma: 2, stats: { car: 2, dao: 1 }, setFlags: ['amigo_da_infancia'] } }, fail: { text: 'Ele percebe algo estranho e se afasta. O futuro, afinal, tem inércia.', fx: { stats: { car: 1 } } } },
      { text: 'Afastá-lo da vila.', res: { text: 'Ele é mandado para um tio na cidade, e perde o contato. Você respira, aliviado. Mas, de alguma forma, o destino encontra rotas.', fx: { karma: -3, stats: { dao: 1 } } } },
      { text: 'Observá-lo com cuidado, sem mudar nada.', res: { text: 'Ele cresce, ri, ensina, aprende. Não há um sinal do futuro monstro. Você duvida do passado, e do que sabe.', fx: { stats: { dao: 2, comp: 1 } } } },
    ],
  },
  {
    id: 'og_regressor_mestre', title: 'O Mestre Que Você Vai Conhecer', rarity: 'raro', once: true, weight: 2.5,
    cond: O('regressor', 12, 19),
    text: 'Você sabe que, daqui a três meses, um velho eremita passará por {vila}, e que ele, na outra vida, o aceitou como discípulo e mudou seu destino. Agora, você tem a chance de ir ao encontro dele, e de impressioná-lo antes da hora.',
    choices: [
      { text: 'Esperar o eremita no caminho, com chá.', check: { stat: ['car', 'dao'], dif: 0 }, ok: { text: 'O eremita ergue as sobrancelhas: "Você me esperava?". Você diz que sim, e ele ri, e o aceita, sem a prova habitual.', fx: { setFlags: ['mestre_regressor'], stats: { dao: 2, comp: 1 }, tecnica: ['respiracao_nuvem'] } }, fail: { text: 'O eremita acha estranho que você saiba demais, e o evita. Um desperdício de tempo, e de oportunidade.', fx: { stats: { dao: 1 }, karma: -1 } } },
      { text: 'Procurar outro mestre, diferente do da outra vida.', res: { text: 'Você tenta algo novo, e o novo é desconhecido. Em seis meses, o vazio da incerteza é, de algum modo, mais fértil do que o certo.', fx: { stats: { dao: 2, sor: 1 } } } },
      { text: 'Ignorar o encontro e treinar sozinho.', res: { text: 'Por anos, você pratica o que lembra. A solidão pesa, mas o passado, afinal, é seu.', fx: { stats: { dao: 1, comp: 2 } } } },
    ],
  },
];
