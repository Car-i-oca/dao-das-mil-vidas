import type { GameEvent } from '../../types';

/** Campanha original de Murim: as antigas listas foram retiradas do catálogo ativo. */
export const EVENTS: GameEvent[] = ([
  {
    id: 'murim_dia_comum', title: 'Um dia na estrada', rarity: 'comum', weight: 0.45, cooldown: 1,
    text: 'A estrada segue entre campos de arroz e pequenos povoados. Por algumas horas, ninguém pede que você escolha um lado ou desembainhe a arma. Ainda assim, o dia oferece suas próprias decisões.',
    choices: [
      { text: 'Ajudar a descarregar uma carroça', res: { text: 'O trabalho rende uma refeição quente e uma conversa sobre as escolas da região.', fx: { xp: 2, morality: { good: 1 } } } },
      { text: 'Praticar a forma básica ao amanhecer', res: { text: 'Você repete os movimentos até o corpo encontrar um ritmo mais firme.', fx: { xp: 3, stats: { fis: 1 } } } },
      { text: 'Ouvir as notícias na casa de chá', check: { stat: ['comp', 'car'], dif: -1 }, ok: { text: 'Um viajante menciona o nome de Gwon Tae-seok e uma patrulha vista perto do rio.', fx: { fama: 1 } }, fail: { text: 'As histórias se contradizem; você guarda apenas os nomes dos povoados.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'murim_ferro_inicio', title: 'O livro sob a ponte', rarity: 'comum', once: true, cooldown: 99,
    text: 'Aos seis anos, você encontra um livro de contas escondido entre as pedras da ponte de Pedra Baixa. Há nomes de famílias, pagamentos a guardas e uma marca de punho partido. Antes que possa ler mais, a boticária Seo Yun aparece na margem.',
    choices: [
      { text: 'Entregar o livro à boticária', res: { text: 'Seo Yun reconhece o selo do Clã Gwon e pede que você guarde segredo. Ela promete ensinar-lhe a observar antes de agir.', fx: { stats: { comp: 1 }, morality: { good: 1, order: 1 }, setFlags: ['livro_ferro_seo'], agenda: [{ event: 'murim_ferro_recado', em: [3, 7] }, { event: 'murim_escola', em: [6, 8] }] } } },
      { text: 'Esconder o livro e decorar os nomes', res: { text: 'Você guarda o volume num vão seco. Os nomes ficam na memória, junto com a pergunta de por que alguém pagaria para apagar uma aldeia do mapa.', fx: { stats: { sor: 1 }, morality: { evil: 1 }, setFlags: ['livro_ferro_oculto'], agenda: [{ event: 'murim_ferro_recado', em: [3, 7] }, { event: 'murim_escola', em: [6, 8] }] } } },
      { text: 'Levar o livro ao magistrado', res: { text: 'O magistrado fecha a porta, recolhe o livro e manda você para casa. Na manhã seguinte, um homem de punho partido pergunta pelo seu nome.', fx: { fama: 1, morality: { order: 1 }, setFlags: ['livro_ferro_magistrado'], agenda: [{ event: 'murim_ferro_recado', em: [2, 5] }, { event: 'murim_escola', em: [6, 8] }] } } },
    ],
  },
  {
    id: 'murim_ferro_recado', title: 'O homem do punho partido', rarity: 'incomum', once: true, cooldown: 99,
    cond: { ageMin: 9 }, text: 'Um viajante com dois dedos quebrados espera no portão. Diz chamar-se Baek Mu-jin e oferece uma lição em troca de uma resposta: quem deve guardar a verdade quando a lei pertence aos poderosos?',
    choices: [
      { text: 'A verdade deve ser provada, não escondida', check: { stat: ['comp', 'car'], dif: 0 }, ok: { text: 'Mu-jin entrega uma página arrancada do livro: os pagamentos financiavam a escolta de refugiados expulsos pelo Clã Gwon.', fx: { setFlags: ['mu_jin_aliado', 'saga_refugiados'], agenda: [{ event: 'murim_refugiados', em: [3, 5] }], fama: 2 } }, fail: { text: 'Ele não confia em suas palavras, mas deixa a página mesmo assim. Agora, alguém sabe que você está investigando.', fx: { setFlags: ['saga_refugiados'], agenda: [{ event: 'murim_refugiados', em: [3, 5] }], fama: 1 } } },
      { text: 'A lei é a única proteção dos fracos', res: { text: 'Mu-jin ri sem alegria. “Então descubra quem escreveu a lei.” Ele parte, deixando uma pista sobre o Armazém das Lanternas.', fx: { setFlags: ['saga_armazem'], agenda: [{ event: 'murim_armazem', em: [3, 5] }], stats: { dao: 1 } } } },
      { text: 'Aceitar a prata para esquecer o assunto', res: { text: 'Você aceita a bolsa. O dinheiro resolve problemas imediatos, mas o rosto das famílias na página não sai da memória.', fx: { pedras: 12, morality: { evil: 2, chaos: 1 }, setFlags: ['saga_prata'] } } },
    ],
  },
  {
    id: 'murim_escola', title: 'O portão da escola', rarity: 'incomum', once: true, cooldown: 99,
    cond: { ageMin: 12 }, text: 'Aos doze anos, você precisa decidir o que fazer com a vontade de entrar no Jianghu. Uma escola aceita aprendizes, uma médica procura ajudante, uma mestra errante oferece treino individual e a Casa de Chá da Lua Oca promete poder sem registro.',
    choices: [
      { text: 'Entrar na Escola da Lâmina Errante', res: { text: 'Você recebe uma espada de treino e uma regra: nunca desembainhe por uma disputa que possa ser resolvida de outro modo.', fx: { trilha: 'espada', tier: 1, morality: { good: 1, order: 1 }, setFlags: ['im_seol_aluna'] } } },
      { text: 'Aprender o Punho de Ferro', res: { text: 'O mestre do pátio ensina postura, queda e como proteger quem está atrás de você.', fx: { trilha: 'corpo', tier: 1, morality: { order: 1 } } } },
      { text: 'Tornar-se aprendiz do Ofício dos Cem Remédios', res: { text: 'Você troca o pátio por um balcão cheio de ervas, frascos e pacientes que não podem pagar.', fx: { trilha: 'alquimia', tier: 1, setFlags: ['medica_aprendiz'] } } },
      { text: 'Aceitar a disciplina do Templo Silencioso', res: { text: 'O templo não promete vitória. Oferece rotina, abrigo e uma maneira de interromper uma luta antes que comece.', fx: { trilha: 'budista', tier: 1, morality: { good: 1, chaos: -1 }, setFlags: ['templo_aprendiz'] } } },
      { text: 'Aprender com uma escola clandestina', check: { stat: ['sor', 'esp'], dif: 1 }, ok: { text: 'A Lua Oca lhe ensina a sair de um lugar sem ser seguido e a não confiar numa porta aberta.', fx: { trilha: 'demoniaca', tier: 1, setFlags: ['lua_oca_aprendiz'] } }, fail: { text: 'A escola recusa ensinar alguém que chegou sem observar as entradas. Ainda há outros caminhos.', fx: { fama: 1 } } },
      { text: 'Continuar sem escola por enquanto', res: { text: 'Você decide que o Jianghu pode esperar. O trabalho e as estradas também ensinam, ainda que cobrem de outro jeito.', fx: { setFlags: ['sem_escola'] } } },
    ],
  },
  {
    id: 'murim_armazem', title: 'As lanternas apagadas', rarity: 'raro', once: true, cooldown: 99,
    cond: { ageMin: 12, flags: ['saga_armazem'] }, text: 'No cais velho, o Armazém das Lanternas fecha as portas antes do pôr do sol. Você ouve vozes discutindo uma lista de aldeias condenadas a pagar “proteção”. Um guarda bloqueia a passagem.',
    choices: [
      { text: 'Escalar a parede e procurar os registros', check: { stat: ['fis', 'sor'], dif: 1 }, ok: { text: 'Você encontra um mapa de rotas e uma assinatura: Gwon Tae-seok, herdeiro do clã.', fx: { setFlags: ['mapa_rotas'], item: ['lamina_armazem'], fama: 2 } }, fail: { text: 'O vigia o apanha, mas você memoriza o nome do responsável antes de escapar.', fx: { ferida: 1, setFlags: ['nome_gwon'] } } },
      { text: 'Convencer o guarda a deixar você entrar', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'O guarda revela que também tem família numa das aldeias. Ele lhe dá acesso aos registros e pede que não o exponha.', fx: { setFlags: ['guarda_aliado', 'mapa_rotas'], item: ['lamina_armazem'] } }, fail: { text: 'O guarda recusa, mas sua pergunta o deixa inquieto. Ele promete verificar os nomes por conta própria.', fx: { setFlags: ['guarda_aliado'] } } },
      { text: 'Recuar e procurar testemunhas', res: { text: 'Você sai sem provas. Ainda assim, sabe que as famílias das aldeias podem confirmar o esquema.', fx: { setFlags: ['saga_refugiados'], agenda: [{ event: 'murim_refugiados', em: [3, 5] }] } } },
    ],
  },
  {
    id: 'murim_refugiados', title: 'A estrada dos sem-teto', rarity: 'incomum', once: true, cooldown: 99,
    cond: { ageMin: 11, flags: ['saga_refugiados'] }, text: 'Uma carroça quebrada bloqueia a estrada. Três famílias foram expulsas de suas casas; uma criança segura um estandarte queimado do Clã Gwon. A caravana precisa chegar à cidade antes da chuva.',
    choices: [
      { text: 'Ajudar a reparar a roda e seguir com eles', check: { stat: ['fis', 'comp'], dif: -1 }, ok: { text: 'A caravana chega inteira. A matriarca Jang Hwa-ryeon promete testemunhar quando você precisar.', fx: { setFlags: ['jang_testemunha'], fama: 3, stats: { car: 1 } } }, fail: { text: 'A viagem custa um dia e uma ferida, mas ninguém fica para trás. Jang memoriza seu nome.', fx: { ferida: 1, setFlags: ['jang_testemunha'], fama: 2 } } },
      { text: 'Dar-lhes a prata que recebeu', cond: { flags: ['saga_prata'] }, res: { text: 'A bolsa compra comida e abrigo. Jang percebe de onde veio a prata e passa a confiar em você.', fx: { pedras: -12, setFlags: ['jang_testemunha'], fama: 3 } } },
      { text: 'Aconselhar que procurem o magistrado', res: { text: 'As famílias seguem para a cidade. Você promete levar o caso adiante, mas elas não podem esperar por muito tempo.', fx: { fama: 1, setFlags: ['jang_cidade'] } } },
    ],
  },
  {
    id: 'murim_torneio', title: 'O torneio das Quatro Pontes', rarity: 'raro', once: true, cooldown: 99,
    cond: { ageMin: 16 }, text: 'Quatro escolas marciais reúnem discípulos, mercadores e magistrados na praça de Hwayang. O vencedor ganha audiência com o conselho local. Gwon Tae-seok está entre os favoritos.',
    choices: [
      { text: 'Inscrever-se e lutar com técnica limpa', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'Você vence por pontos e recusa o golpe que teria ferido o rival. O público lembra da sua disciplina.', fx: { fama: 4, setFlags: ['torneio_honra'], agenda: [{ event: 'murim_conselho', em: [1, 3] }] } }, fail: { text: 'Você perde, mas luta sem desonra. Uma mestra da Escola da Garça oferece treino.', fx: { stats: { fis: 1 }, fama: 2, setFlags: ['torneio_honra'] } } },
      { text: 'Investigar os juízes e expor suborno', cond: { flags: ['mapa_rotas'] }, check: { stat: ['comp', 'sor'], dif: 1 }, ok: { text: 'As provas invalidam o torneio e ligam o suborno ao esquema das aldeias. O conselho convoca uma audiência.', fx: { setFlags: ['provas_suborno'], fama: 5, agenda: [{ event: 'murim_conselho', em: [1, 2] }] } }, fail: { text: 'Os juízes abafam a denúncia. Você sai com um inimigo poderoso e sem vitória.', fx: { ferida: 1, setFlags: ['gwon_alerta'] } } },
      { text: 'Vender informações a um patrocinador', res: { text: 'O patrocinador paga bem e usa a informação para tirar um rival da chave. Sua fama cresce por motivos que poucos conhecem.', fx: { pedras: 30, fama: 2, setFlags: ['torneio_dívida'] } } },
    ],
  },
  {
    id: 'murim_conselho', title: 'A audiência de Hwayang', rarity: 'lendario', once: true, cooldown: 99,
    cond: { ageMin: 17, flags: ['mapa_rotas'] }, text: 'Diante do conselho, Gwon Tae-seok nega tudo. Jang Hwa-ryeon espera na galeria, Baek Mu-jin permanece junto à porta e o livro de contas pesa em sua manga. Uma acusação sem testemunhas pode virar contra você.',
    choices: [
      { text: 'Apresentar documentos e chamar as famílias', cond: { flags: ['jang_testemunha'] }, check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'O conselho congela os bens do clã e abre investigação pública. As famílias retornam às terras; Mu-jin escolhe ficar para reconstruir a ponte.', fx: { fama: 8, setFlags: ['final_justica'], pedras: 40, fim: 'murim_justica' } }, fail: { text: 'A sentença não chega, mas o conselho reconhece as testemunhas e suspende as expulsões. A disputa seguirá nos tribunais.', fx: { fama: 5, setFlags: ['final_tregua'], fim: 'murim_tregua' } } },
      { text: 'Desafiar Gwon Tae-seok diante de todos', check: { stat: ['fis', 'dao'], dif: 2 }, ok: { text: 'Você vence o duelo e obriga Gwon a confessar o esquema. As famílias recuperam suas casas, mas a lei não esquece quem a humilhou.', fx: { fama: 7, setFlags: ['final_duelo'], fim: 'murim_duelo' } }, fail: { text: 'Gwon vence e você cai diante do conselho. Mu-jin leva as provas adiante em seu nome.', fx: { fim: 'duelo' } } },
      { text: 'Aceitar o acordo secreto e proteger sua escola', res: { text: 'O clã paga a dívida e as expulsões cessam. Em troca, você mantém silêncio; sua escola prospera sob uma paz que não é limpa.', fx: { pedras: 80, fama: -2, setFlags: ['final_acordo'], fim: 'murim_acordo' } } },
    ],
  },
  {
    id: 'murim_mercado', title: 'A banca do velho Noh', rarity: 'comum', cond: { ageMin: 10 }, weight: 1.3,
    text: 'Na feira, Noh Gye-sang vende bainhas, mapas e histórias. Ele reconhece o brasão gasto no seu equipamento e oferece consertá-lo por algumas moedas.',
    choices: [
      { text: 'Pagar pelo reparo', cond: { pedrasMin: 5 }, res: { text: 'Noh reforça o equipamento e ensina como evitar que a bainha denuncie sua posição.', fx: { pedras: -5, stats: { fis: 1 } } } },
      { text: 'Trocar notícias sobre o Clã Gwon', cond: { flags: ['livro_ferro_seo', 'livro_ferro_oculto', 'livro_ferro_magistrado'] }, res: { text: 'Noh conta que o clã perdeu influência no norte e está comprando aliados no sul.', fx: { setFlags: ['gwon_contexto'], stats: { comp: 1 } } } },
      { text: 'Agradecer e seguir viagem', res: { text: 'Você guarda o conselho e segue pela feira.', fx: { fama: 1 } } },
    ],
  },
  {
    id: 'murim_mestra', title: 'A ponte da Garça', rarity: 'incomum', cond: { ageMin: 8 }, weight: 1.1,
    text: 'Uma mulher de cabelos grisalhos treina passos sobre as tábuas da ponte. Cada movimento parece lento até o instante em que já terminou. Ela pergunta o que você faria ao enfrentar alguém mais forte.',
    choices: [
      { text: 'Aprender a ceder sem recuar', res: { text: 'Mestra Im Seol mostra como usar o peso do oponente contra ele. Sua base fica mais estável.', fx: { stats: { fis: 1, dao: 1 }, setFlags: ['im_seol_aluna'] } } },
      { text: 'Estudar o ritmo antes de atacar', res: { text: 'Você percebe uma pausa entre os passos. A mestra sorri: observar também é uma forma de combate.', fx: { stats: { comp: 1, sor: 1 }, setFlags: ['im_seol_aluna'] } } },
      { text: 'Desafiá-la sem conhecer seu nome', check: { stat: 'fis', dif: 2 }, ok: { text: 'Ela desvia do seu golpe e o elogia pela coragem. A lição começa com uma queda na água.', fx: { stats: { fis: 1 }, setFlags: ['im_seol_aluna'] } }, fail: { text: 'Você cai na água. Ela ainda assim oferece uma toalha e uma segunda chance.', fx: { ferida: 1, setFlags: ['im_seol_aluna'] } } },
    ],
  },
  {
    id: 'murim_dilema', title: 'Uma lâmina, duas versões', rarity: 'incomum', cond: { ageMin: 13 },
    text: 'Um jovem espadachim acusa uma curandeira de envenenar seu mestre. A mulher diz que o mestre já estava morrendo e implorou por um fim sem dor. Ambos pedem que você escolha em quem acreditar.',
    choices: [
      { text: 'Examinar o frasco e as marcas', check: { stat: ['comp', 'esp'], dif: 0 }, ok: { text: 'O frasco contém um sedativo, não veneno. O espadachim baixa a arma e aceita ouvir a última vontade do mestre.', fx: { fama: 2, stats: { comp: 1 } } }, fail: { text: 'Você não encontra uma resposta. A curandeira foge e o jovem parte atrás dela.', fx: { fama: -1 } } },
      { text: 'Impedir que alguém ataque até haver prova', check: { stat: ['car', 'fis'], dif: 0 }, ok: { text: 'Sua presença compra tempo para ambos respirarem e contarem suas versões com calma.', fx: { stats: { dao: 1 }, fama: 1 } }, fail: { text: 'A luta começa e você sai ferido ao separá-los.', fx: { ferida: 1, fama: 1 } } },
      { text: 'Deixar que resolvam a própria disputa', res: { text: 'Você se afasta. O som de aço acompanha o caminho até a próxima estalagem.', fx: { fama: -1 } } },
    ],
  },
  {
    id: 'murim_ataque', title: 'Bandidos na estrada do sal', rarity: 'comum', cond: { ageMin: 12 },
    text: 'Quatro homens armados cercam uma carroça de sal. O cocheiro está ferido e a estrada estreita não permite que ninguém corra. Um dos bandidos usa o distintivo de um guarda desaparecido.',
    combate: { oponente: 'bandido', cenario: 'estrada', boss: false },
    choices: [
      { text: 'Desarmar o líder sem o matar', check: { stat: ['fis', 'dao'], tag: 'combate' }, ok: { text: 'O líder cai e os outros largam as armas. Sob o distintivo, você encontra um pedido de socorro antigo.', fx: { fama: 2, setFlags: ['distintivo_roubado'], pedras: 7 } }, fail: { text: 'Você repele o grupo, mas o cocheiro fica mais ferido durante a luta.', fx: { ferida: 1, fama: 1 } } },
      { text: 'Negociar uma saída para todos', check: { stat: 'car', dif: 0 }, ok: { text: 'Você convence os homens a aceitar parte da carga e escoltar o cocheiro até a vila.', fx: { fama: 2, pedras: 4 } }, fail: { text: 'A negociação falha; você abre caminho para a carroça e abandona o sal.', fx: { fama: 1 } } },
      { text: 'Pagar para passar sem lutar', cond: { pedrasMin: 15 }, res: { text: 'Os homens liberam a estrada. O cocheiro anota seu nome e o preço que pagou.', fx: { pedras: -15, fama: -1 } } },
    ],
  },
  {
    id: 'murim_arquivo', title: 'O arquivo da escola vazia', rarity: 'raro', once: true, cooldown: 99,
    cond: { ageMin: 16, flags: ['im_seol_aluna'] }, text: 'A Escola da Garça fecha as portas depois de um incêndio. Mestra Im Seol pede que escolha um único rolo de técnica para salvar: passos defensivos, golpes de lança ou registros de alunos desaparecidos.',
    choices: [
      { text: 'Salvar os registros dos alunos', res: { text: 'O arquivo mostra que alguns desaparecimentos foram comprados pelo Clã Gwon. Im Seol confia a você o destino da escola.', fx: { setFlags: ['registro_alunos', 'mapa_rotas'], fama: 3 } } },
      { text: 'Salvar a técnica de passos', res: { text: 'Você aprende a atravessar um alcance sem desperdiçar movimento. Im Seol passa a tratar você como sucessor possível.', fx: { stats: { fis: 2, sor: 1 }, setFlags: ['passo_garca'] } } },
      { text: 'Salvar o rolo de lança para os outros discípulos', res: { text: 'Você entrega a técnica ao grupo que perdeu o salão. O método continua vivo, mesmo sem uma escola para abrigá-lo.', fx: { fama: 2, setFlags: ['lanca_garca'] } } },
    ],
  },
  {
    id: 'murim_julgamento', title: 'A noite dos nomes apagados', rarity: 'lendario', once: true, cooldown: 99,
    cond: { ageMin: 21, flags: ['provas_suborno'] }, text: 'Os registros do torneio foram queimados. Resta uma cópia incompleta, o depoimento do guarda e a palavra das famílias. Gwon Tae-seok oferece retirar a acusação se você entregar a página original.',
    choices: [
      { text: 'Publicar as provas e assumir o risco', cond: { flags: ['guarda_aliado'] }, check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O depoimento confirma a fraude. O conselho remove Gwon do cargo e convoca novas eleições entre as escolas.', fx: { fama: 9, setFlags: ['final_justica'], fim: 'murim_justica' } }, fail: { text: 'O conselho não condena Gwon, mas o depoimento impede novas expulsões. Você deixa Hwayang sem aliados no palácio.', fx: { fama: 4, setFlags: ['final_tregua'], fim: 'murim_tregua' } } },
      { text: 'Entregar a página e aceitar o exílio', res: { text: 'Você protege os refugiados de uma retaliação imediata, mas perde o direito de retornar a Hwayang.', fx: { fama: 1, setFlags: ['final_exilio'], fim: 'exilio' } } },
      { text: 'Desafiar o clã a um julgamento marcial', check: { stat: ['fis', 'dao'], dif: 2 }, ok: { text: 'O duelo termina quando Gwon admite que não pode vencer sem recorrer a truques. O conselho reabre o caso.', fx: { fama: 7, setFlags: ['final_duelo'], fim: 'murim_duelo' } }, fail: { text: 'Seu rival vence. As escolas guardam seu nome, mas as provas sobrevivem com o guarda.', fx: { fim: 'duelo' } } },
    ],
  },
  {
    id: 'murim_refeicao', title: 'A última tigela de caldo', rarity: 'comum', cond: { ageMin: 8 }, weight: 1.4,
    text: 'Na cozinha da estalagem, um rapaz chamado Dae-hyun separa a última tigela de caldo para a irmã doente. Um viajante oferece o dobro do preço e diz que não aceita esperar.',
    choices: [
      { text: 'Ajudar a preparar uma segunda porção', check: { stat: ['comp', 'car'], dif: -1 }, ok: { text: 'Você encontra ingredientes esquecidos na despensa. Dae-hyun promete retribuir quando puder.', fx: { fama: 1, setFlags: ['dae_hyun_amigo'] } }, fail: { text: 'O caldo fica ralo, mas alimenta os dois. Dae-hyun guarda seu nome.', fx: { setFlags: ['dae_hyun_amigo'] } } },
      { text: 'Comprar a tigela para o viajante', cond: { pedrasMin: 3 }, res: { text: 'O viajante paga e vai embora. Dae-hyun não protesta, mas a irmã dorme com fome.', fx: { pedras: 3, fama: -1 } } },
      { text: 'Deixar que decidam entre si', res: { text: 'A discussão termina quando o estalajadeiro divide o caldo em duas tigelas pequenas.', fx: { stats: { car: 1 } } } },
    ],
  },
  {
    id: 'murim_carta', title: 'A carta sem selo', rarity: 'incomum', cond: { ageMin: 14, flags: ['mu_jin_aliado'] },
    text: 'Baek Mu-jin manda uma carta por um mensageiro cego: “O livro tem uma segunda metade. Procure a casa de chá onde ninguém serve chá.” O mensageiro espera resposta.',
    choices: [
      { text: 'Confirmar que irá à casa de chá', res: { text: 'O mensageiro desaparece na multidão. Uma nova rota aparece no verso da carta.', fx: { setFlags: ['casa_cha'], agenda: [{ event: 'murim_casa_cha', em: [2, 5] }] } } },
      { text: 'Pedir que Mu-jin venha até você', res: { text: 'A resposta volta três dias depois: “Não posso. Há olhos em toda parte.”', fx: { stats: { comp: 1 } } } },
      { text: 'Queimar a carta', res: { text: 'Você reduz o papel a cinzas. O mensageiro não retorna.', fx: { setFlags: ['carta_queimada'] } } },
    ],
  },
  {
    id: 'murim_casa_cha', title: 'A casa de chá sem chá', rarity: 'raro', once: true, cooldown: 99,
    cond: { ageMin: 15, flags: ['casa_cha'] }, text: 'A casa está vazia, exceto por uma chaleira seca. Sob o assoalho há cartas que ligam o Clã Gwon ao desaparecimento de três escolas pequenas. Passos se aproximam do lado de fora.',
    choices: [
      { text: 'Levar as cartas ao magistrado', check: { stat: ['comp', 'sor'], dif: 0 }, ok: { text: 'Você escapa com cópias suficientes para abrir uma investigação.', fx: { setFlags: ['provas_suborno', 'mapa_rotas'], fama: 3 } }, fail: { text: 'Você perde as cartas originais, mas memoriza o nome de quem as recolheu.', fx: { setFlags: ['gwon_alerta'], ferida: 1 } } },
      { text: 'Confiar os documentos a Mu-jin', cond: { flags: ['mu_jin_aliado'] }, res: { text: 'Mu-jin envia as cartas para as escolas afetadas e pede que você reúna testemunhas.', fx: { setFlags: ['provas_suborno', 'saga_refugiados'] } } },
      { text: 'Enfrentar quem está chegando', check: { stat: ['fis', 'dao'], dif: 1 }, ok: { text: 'Você desarma os perseguidores e encontra no cinto deles uma ordem assinada por Gwon.', fx: { setFlags: ['provas_suborno'], fama: 2 } }, fail: { text: 'Você foge pelos fundos sem os papéis. Os perseguidores agora sabem seu rosto.', fx: { ferida: 1, setFlags: ['gwon_alerta'] } } },
    ],
  },
  {
    id: 'murim_nomes', title: 'A parede dos nomes', rarity: 'comum', cond: { ageMin: 18 },
    text: 'Na entrada de uma escola antiga, uma parede lista mestres mortos em duelos. Alguém riscou vários nomes com carvão e escreveu os de alunos ainda vivos.',
    choices: [
      { text: 'Restaurar os nomes apagados', check: { stat: 'comp', dif: -1 }, ok: { text: 'Um ancião conta a história dos nomes e reconhece o brasão que você carrega.', fx: { fama: 2, stats: { comp: 1 } } }, fail: { text: 'Você restaura parte da inscrição. Os nomes restantes continuam legíveis para quem quiser procurar.', fx: { fama: 1 } } },
      { text: 'Perguntar quem lucra com os nomes riscados', check: { stat: ['car', 'sor'], dif: 0 }, ok: { text: 'Um discípulo revela que o conselho apagou rivais políticos dos registros oficiais.', fx: { setFlags: ['registro_alunos'], stats: { car: 1 } } }, fail: { text: 'Ninguém responde. Na saída, você percebe que alguém o seguia.', fx: { setFlags: ['gwon_alerta'] } } },
      { text: 'Seguir viagem', res: { text: 'Você segue, levando consigo a imagem da parede dividida entre memória e conveniência.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'murim_final_vida', title: 'O último inverno', rarity: 'comum', once: true, cooldown: 99,
    cond: { ageMin: 65 }, text: 'O frio chega cedo à sua casa. Discípulos, parentes e velhos rivais enviam cartas perguntando como você quer passar o último inverno. Pela primeira vez, ninguém espera que você resolva uma disputa.',
    choices: [
      { text: 'Reunir todos à mesa', res: { text: 'A casa fica cheia de vozes e tigelas. Você escuta histórias que começaram muito antes de sua espada e terminam depois dela.', fx: { fim: 'murim_heranca' } } },
      { text: 'Ensinar uma última lição no pátio', res: { text: 'Seus alunos repetem os movimentos, cada qual com um erro diferente. Você ri, corrige o primeiro e deixa os outros descobrirem sozinhos.', fx: { fim: 'murim_mestre' } } },
      { text: 'Caminhar sozinho até a ponte de Pedra Baixa', res: { text: 'A ponte foi reconstruída tantas vezes que nenhuma pedra é a mesma. Você reconhece o rio, o vento e o silêncio que abriu sua primeira pergunta.', fx: { fim: 'velhice' } } },
    ],
  },
  {
    id: 'murim_peregrinos', title: 'Os três peregrinos', rarity: 'incomum', cond: { ageMin: 9 },
    text: 'Três peregrinos dividem a estrada: uma lanceira sem escola, um monge que abandonou o templo e um médico que carrega uma espada quebrada. Cada um oferece uma lição diferente por uma noite de abrigo.',
    choices: [
      { text: 'Treinar com a lanceira', res: { text: 'Ela ensina a manter distância sem ceder terreno.', fx: { stats: { fis: 1 }, setFlags: ['lanca_peregrina'] } } },
      { text: 'Ouvir o monge em silêncio', res: { text: 'Ele não fala de iluminação; ensina a respirar depois de perder uma luta.', fx: { stats: { dao: 1 }, fama: 1 } } },
      { text: 'Ajudar o médico a reparar a espada', check: { stat: 'comp', dif: 0 }, ok: { text: 'O médico lhe deixa o cabo e um conselho sobre os pontos que encerram uma luta rápido.', fx: { stats: { comp: 1 }, item: ['lamina_armazem'] } }, fail: { text: 'O cabo fica torto, mas o médico não cobra pela tentativa.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'murim_festival', title: 'O festival das lanternas', rarity: 'comum', cond: { ageMin: 10 }, weight: 1.2,
    text: 'A cidade acende lanternas sobre o rio. Um garoto rouba uma fruta, uma artista procura seu irmão e um oficial exige que todos paguem uma taxa para atravessar a praça.',
    choices: [
      { text: 'Ajudar a artista a procurar o irmão', check: { stat: ['sor', 'car'], dif: -1 }, ok: { text: 'Você encontra o menino no cais. A artista pinta seu retrato numa das lanternas.', fx: { fama: 2, stats: { car: 1 } } }, fail: { text: 'A busca não dá resultado, mas vocês distribuem lanternas para as crianças que ficaram na praça.', fx: { fama: 1 } } },
      { text: 'Questionar a taxa do oficial', check: { stat: ['car', 'dao'], dif: 0 }, ok: { text: 'A cobrança não aparece no edital. O oficial devolve o dinheiro e abandona o posto.', fx: { fama: 2 } }, fail: { text: 'Ele mantém a cobrança. Você guarda o número do distintivo para denunciar depois.', fx: { setFlags: ['oficial_taxa'] } } },
      { text: 'Comprar fruta para o garoto', cond: { pedrasMin: 2 }, res: { text: 'O garoto devolve a fruta roubada e corre para encontrar a família.', fx: { pedras: -2, fama: 1 } } },
    ],
  },
  {
    id: 'murim_punicao', title: 'O julgamento do aprendiz', rarity: 'raro', cond: { ageMin: 18, flags: ['dae_hyun_amigo'] }, once: true,
    text: 'Dae-hyun, agora aprendiz de uma escola local, é acusado de roubar um manual. O mestre exige que você fale: um depoimento honesto pode expulsar o rapaz, e uma mentira pode condenar outro aluno.',
    choices: [
      { text: 'Investigar antes de depor', check: { stat: ['comp', 'sor'], dif: 0 }, ok: { text: 'O manual estava na sala do mestre. Dae-hyun é inocentado e o verdadeiro culpado confessa.', fx: { fama: 3, setFlags: ['dae_hyun_livre'] } }, fail: { text: 'Você não encontra o manual. Dae-hyun é expulso, embora saiba que tentou ajudá-lo.', fx: { setFlags: ['dae_hyun_livre'] } } },
      { text: 'Contar apenas o que sabe sobre o rapaz', res: { text: 'Seu depoimento não resolve o caso, mas o mestre decide investigar a sala antes da punição.', fx: { fama: 1 } } },
      { text: 'Inventar uma testemunha para protegê-lo', check: { stat: 'car', dif: 1 }, ok: { text: 'A mentira compra tempo; Dae-hyun encontra a prova real antes que o mestre decida.', fx: { setFlags: ['dae_hyun_livre'], fama: 1 } }, fail: { text: 'O mestre descobre a mentira e expulsa Dae-hyun por cumplicidade.', fx: { fama: -2 } } },
    ],
  },
  {
    id: 'murim_inverno', title: 'A vila sob a neve', rarity: 'incomum', cond: { ageMin: 20 },
    text: 'Uma nevasca prende viajantes numa vila de passagem. O celeiro tem comida para duas noites; o templo abriga crianças e a estalagem está cheia de mercadores que se recusam a dividir suprimentos.',
    choices: [
      { text: 'Organizar turnos para proteger o celeiro', check: { stat: ['car', 'fis'], dif: 0 }, ok: { text: 'Os mercadores acabam ajudando. A vila atravessa a nevasca sem perder mantimentos.', fx: { fama: 3, stats: { car: 1 } } }, fail: { text: 'O celeiro é saqueado, mas você salva as crianças e os viajantes mais velhos.', fx: { fama: 2, ferida: 1 } } },
      { text: 'Abrir o depósito da escola marcial', cond: { flags: ['im_seol_aluna'] }, res: { text: 'A escola perde parte de suas reservas, mas ninguém passa fome. Im Seol aceita a decisão.', fx: { fama: 3 } } },
      { text: 'Viajar antes que a neve feche a estrada', check: { stat: ['fis', 'sor'], dif: 1 }, ok: { text: 'Você alcança o próximo posto antes do amanhecer.', fx: { fama: 1 } }, fail: { text: 'A neve o força a voltar à vila com uma ferida e menos mantimentos.', fx: { ferida: 1 } } },
    ],
  },
  {
    id: 'murim_duelo_ponte', title: 'O desafio na ponte', rarity: 'raro', cond: { ageMin: 19, fameMin: 3 },
    text: 'Um espadachim mascarado bloqueia a ponte de Pedra Baixa. Ele acusa você de interferir nos assuntos do Clã Gwon e exige um duelo diante de testemunhas.',
    combate: { oponente: 'rival_seita', cenario: 'ponte', boss: true },
    choices: [
      { text: 'Aceitar o duelo e respeitar as regras', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você vence sem quebrar as regras. O espadachim revela ser um discípulo que perdeu a escola para o clã.', fx: { fama: 4, setFlags: ['rival_revelado'] } }, fail: { text: 'Você perde o duelo e entrega a arma, como prometeu. O mascarado poupa sua vida.', fx: { ferida: 2, fama: 1, setFlags: ['rival_revelado'] } } },
      { text: 'Exigir que ele revele o rosto antes', check: { stat: ['car', 'comp'], dif: 0 }, ok: { text: 'Ele hesita e tira a máscara. Você reconhece um aluno desaparecido da Escola da Garça.', fx: { setFlags: ['rival_revelado'], fama: 2 } }, fail: { text: 'Ele se recusa e vai embora, prometendo voltar com testemunhas.', fx: { setFlags: ['rival_revelado'] } } },
      { text: 'Recusar o duelo e abrir outra passagem', res: { text: 'Você evita a armadilha, mas a história da recusa chega às escolas antes de você.', fx: { fama: -1 } } },
    ],
  },
  {
    id: 'murim_ancora', title: 'A escolha de Im Seol', rarity: 'lendario', once: true, cooldown: 99,
    cond: { ageMin: 25, flags: ['im_seol_aluna'] }, text: 'Mestra Im Seol reúne seus alunos no pátio reconstruído. A escola não pode sustentar todos: alguém precisa levar seu nome adiante, alguém precisa proteger as aldeias, e alguém precisa guardar as técnicas no arquivo.',
    choices: [
      { text: 'Assumir a escola e formar novos discípulos', res: { text: 'Você aceita o pátio, suas dívidas e seus alunos. A Escola da Garça renasce sem exigir que todos pensem igual.', fx: { fama: 6, setFlags: ['fundou_escola'], fim: 'murim_escola' } } },
      { text: 'Deixar o título e proteger as estradas', res: { text: 'Você parte sem faixa ou cargo. As aldeias passam a acender uma lanterna quando ouvem passos na estrada.', fx: { fama: 5, setFlags: ['guardiao_estradas'], fim: 'murim_guardiao' } } },
      { text: 'Ensinar os métodos a todas as escolas', res: { text: 'Im Seol entrega os rolos ao conselho aberto. Nenhuma linhagem poderá reivindicar domínio exclusivo sobre aquelas técnicas.', fx: { fama: 7, setFlags: ['tecnica_aberta'], fim: 'murim_mestre' } } },
    ],
  },
  {
    id: 'murim_vida_comum', title: 'Uma vida sem torneios', rarity: 'comum', once: true, cooldown: 99,
    cond: { ageMin: 30, tierMax: 0 }, text: 'Os anos passam, e a vida não lhe pede outro duelo. Uma escola oferece treinamento tardio; o mercado oferece trabalho estável; sua família pede que você permaneça em casa.',
    choices: [
      { text: 'Tentar aprender uma arte marcial', res: { text: 'Você aprende o suficiente para se defender. Não se torna lenda, mas dorme com menos medo.', fx: { stats: { fis: 1 }, fama: 1 } } },
      { text: 'Ficar e cuidar dos seus', res: { text: 'A vida encontra seu próprio ritmo entre refeições, trabalho e visitas. Ninguém pergunta quantos torneios você venceu.', fx: { fim: 'mortal' } } },
      { text: 'Partir numa última viagem', res: { text: 'Você deixa uma carta na mesa e segue a estrada antes do amanhecer.', fx: { fama: 1, fim: 'mortal' } } },
    ],
  },
  {
    id: 'murim_retorno', title: 'O retorno à ponte', rarity: 'incomum', cond: { ageMin: 40, flags: ['livro_ferro_seo', 'livro_ferro_oculto', 'livro_ferro_magistrado'] },
    text: 'Você retorna a Pedra Baixa e encontra a ponte reconstruída. Uma criança tenta alcançar o vão entre as pedras onde encontrou o livro tantos anos atrás.',
    choices: [
      { text: 'Contar a história sem esconder os erros', res: { text: 'A criança ouve tudo, inclusive as partes em que você hesitou. Ela pergunta o que faria diferente; pela primeira vez, você tem uma resposta.', fx: { stats: { dao: 1 }, fama: 2 } } },
      { text: 'Entregar a criança à mestra Im Seol', cond: { flags: ['im_seol_aluna'] }, res: { text: 'Im Seol aceita uma nova aluna e promete não lhe ensinar a história antes que tenha perguntas próprias.', fx: { setFlags: ['nova_geracao'], fama: 2 } } },
      { text: 'Deixar que descubra sozinha', res: { text: 'Você segue sem interrompê-la. Algumas histórias começam com uma pergunta e uma pedra solta.', fx: { fama: 1 } } },
    ],
  },
  {
    id: 'murim_assassino', title: 'A oferta da Lua Oca', rarity: 'raro', cond: { ageMin: 17, fameMin: 2 },
    text: 'Uma mulher chamada Choi Rin deixa uma lâmina curta sobre a mesa. A Lua Oca oferece dinheiro para que você elimine um cobrador do clã. Ela não diz quantas pessoas dependem dele.',
    choices: [
      { text: 'Recusar e descobrir quem será prejudicado', check: { stat: ['comp', 'car'], dif: 0 }, ok: { text: 'O cobrador desviava parte do dinheiro para manter uma clínica. Você organiza uma denúncia com os pacientes como testemunhas.', fx: { fama: 3, setFlags: ['lua_oca_recusada'] } }, fail: { text: 'Choi Rin parte sem resposta. Dias depois, o cobrador desaparece e a clínica fecha.', fx: { fama: -1 } } },
      { text: 'Aceitar, mas exigir que ninguém seja ferido', check: { stat: ['fis', 'sor'], dif: 1 }, ok: { text: 'Você toma os livros de cobrança e deixa o homem vivo. Rin paga, embora saiba que você não cumpriu o trabalho como ela esperava.', fx: { pedras: 40, setFlags: ['lua_oca_divida'] } }, fail: { text: 'A emboscada dá errado. Você foge com uma ferida e sem pagamento.', fx: { ferida: 1, setFlags: ['gwon_alerta'] } } },
      { text: 'Levar a oferta ao magistrado', res: { text: 'O magistrado fica com a lâmina e promete investigar a Lua Oca. Nenhuma testemunha aparece para confirmar a história.', fx: { fama: 1 } } },
    ],
  },
  {
    id: 'murim_ponte_reparo', title: 'Pedras para uma ponte', rarity: 'comum', cond: { ageMin: 10 }, weight: 1.1,
    text: 'Uma enchente leva duas pedras da ponte de Pedra Baixa. O comércio parou e os trabalhadores da margem oposta não conseguem chegar à cidade. O mestre de obras não tem dinheiro para contratar ajuda.',
    choices: [
      { text: 'Organizar os vizinhos para reconstruir o vão', check: { stat: ['car', 'fis'], dif: -1 }, ok: { text: 'Cada pessoa traz uma coisa: corda, pedra, arroz, ferramentas. A ponte fica pronta antes da chuva voltar.', fx: { fama: 2, stats: { car: 1 } } }, fail: { text: 'O trabalho demora, mas os vizinhos terminam o reparo juntos.', fx: { fama: 1, ferida: 1 } } },
      { text: 'Pagar os materiais', cond: { pedrasMin: 20 }, res: { text: 'Os materiais chegam naquela tarde. O mestre grava seu nome numa pedra, embora você peça que não o faça.', fx: { pedras: -20, fama: 2 } } },
      { text: 'Usar a passagem da montanha', check: { stat: ['fis', 'sor'], dif: 0 }, ok: { text: 'Você abre uma trilha segura o bastante para carroças leves até que a ponte seja reparada.', fx: { fama: 1 } }, fail: { text: 'A trilha termina num barranco. Você volta antes que alguém se machuque.', fx: { ferida: 1 } } },
    ],
  },
  {
    id: 'murim_heranca_final', title: 'As páginas que ficaram', rarity: 'lendario', once: true, cooldown: 99,
    cond: { ageMin: 35, flags: ['final_justica'] }, text: 'Anos depois, uma cópia do livro de contas reaparece numa escola distante. As anotações nas margens são suas. Um jovem pede licença para continuar a investigação que você começou.',
    choices: [
      { text: 'Entregar as páginas e ensinar como verificar cada nome', res: { text: 'O jovem parte com um método, não com uma lista de culpados. Dessa vez, ninguém terá de confiar apenas na sua palavra.', fx: { fama: 5, setFlags: ['legado_verificacao'], fim: 'murim_mestre' } } },
      { text: 'Guardar as páginas para evitar outra crise', res: { text: 'Você esconde a cópia. A paz dura, embora a dúvida também.', fx: { fama: -1, fim: 'murim_heranca' } } },
      { text: 'Publicar tudo sem revisão', res: { text: 'Os nomes vêm a público e alguns são inocentes. A investigação recomeça com mais ruído que clareza.', fx: { fama: 1, fim: 'murim_tregua' } } },
    ],
  },
] satisfies GameEvent[]).map((event) => ({ ...event, type: event.id === 'murim_ataque' || event.id === 'murim_duelo_ponte' ? 'combat' : 'narrative' }));
