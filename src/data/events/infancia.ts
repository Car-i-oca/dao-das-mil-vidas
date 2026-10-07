import type { GameEvent } from '../../types';

/** Eventos de mortais (tier 0): infância, juventude e despertar. */
export const infancia: GameEvent[] = [
  /* ===== Infância ===== */
  {
    id: 'brincadeira_rio', title: 'O Rio Fundo', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMax: 14 },
    text: 'As crianças de {vila} desafiam você a atravessar o rio na parte funda, onde dizem que a corrente puxa os desprevenidos.',
    choices: [
      { text: 'Atravessar a nado.', check: { stat: 'fis', dif: 0 }, ok: { text: 'Você chega à outra margem ofegante e orgulhoso. A água ensinou a respirar fundo.', fx: { stats: { fis: 1, dao: 1 } } }, fail: { text: 'A corrente quase leva você. Um pescador o puxa pelos cabelos e dá um sermão.', fx: { stats: { fis: 1 }, ferida: 1 } } },
      { text: 'Recusar e ficar olhando a água.', res: { text: 'Você passa a tarde observando como a corrente contorna as pedras. Algo naquilo parece um padrão.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'fome_no_inverno', title: 'Inverno de Fome', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMax: 15 },
    text: 'O inverno chegou cedo. O celeiro está quase vazio e o vizinho idoso passa fome, dividindo a casa fria com o vento.',
    choices: [
      { text: 'Dividir sua comida com o vizinho.', res: { text: 'Você passa fome, mas o velho chora de gratidão. Nas noites seguintes, ele lhe conta histórias do mundo dos imortais.', fx: { karma: 8, stats: { dao: 1, car: 1 }, setFlags: ['gentil_na_infancia'] } } },
      { text: 'Caçar na floresta coberta de neve.', check: { stat: 'fis', dif: 1 }, ok: { text: 'Você volta com uma lebre gorda e as mãos dormentes. A casa inteira come naquela noite.', fx: { stats: { fis: 1 }, pedras: 1 } }, fail: { text: 'Você se perde na nevasca e volta coberto de geada.', fx: { ferida: 1 } } },
      { text: 'Guardar a comida para a família.', res: { text: 'É o que se espera. A fome passa, mas o olhar do vizinho fica com você.', fx: { stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'velho_conta_lendas', title: 'Lendas ao Pé do Fogo', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMax: 14 },
    text: 'Um viajante pernoita em {vila} e conta histórias de cultivadores que cavalgam nuvens e de seitas escondidas entre os picos.',
    choices: [
      { text: 'Perguntar tudo o que puder.', res: { text: 'O viajante ri, mas responde. Você guarda cada palavra como pedra preciosa.', fx: { stats: { comp: 1 }, setFlags: ['conhece_lendas'] } } },
      { text: 'Duvidar abertamente.', res: { text: 'O viajante dá de ombros. A dúvida endurece você, mas também o afasta de algo importante.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'cultivador_passa_voando', title: 'Uma Espada no Céu', rarity: 'raro', once: true,
    cond: { tierMax: 0, ageMax: 16 },
    text: 'Numa tarde clara, um vulto cruza o céu sobre uma lâmina de luz. Os adultos se ajoelham. Você fica de pé, de boca aberta.',
    choices: [
      { text: 'Gravar essa imagem na memória.', res: { text: 'Aquela visão se torna sua bússola. Nada, daqui em diante, parecerá impossível.', fx: { stats: { dao: 2 }, setFlags: ['viu_voo'] } } },
      { text: 'Correr atrás até perder o fôlego.', check: { stat: 'fis', dif: 1 }, ok: { text: 'Você corre colinas inteiras e vê onde o cultivador pousou. Ele deixou cair uma pedra espiritual.', fx: { pedras: 3, stats: { fis: 1 } } }, fail: { text: 'Você tropeça e rola colina abaixo. Machucado, mas ainda sonhando.', fx: { ferida: 1, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'amigo_de_infancia', title: 'O Melhor Amigo', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMax: 16 },
    text: '{amigo} apareceu na sua vida como aparecem as chuvas de verão: de repente, e para ficar. Juntos, vocês dividem segredos, castigos e uma promessa de seguir o caminho dos imortais.',
    choices: [
      { text: 'Selar a promessa com sangue de dedo.', res: { text: 'Duas crianças riem de si mesmas. Uma promessa feita aos oito anos pode pesar como montanha aos oitenta.', fx: { stats: { car: 1, dao: 1 }, setFlags: ['amigo_juramento'], agenda: [{ event: 'amigo_reencontro', em: [15, 40] }] } } },
      { text: 'Guardar a promessa sem cerimônia.', res: { text: 'Amizades fortes não precisam de ritual.', fx: { stats: { car: 1 }, agenda: [{ event: 'amigo_reencontro', em: [15, 40] }] } } },
    ],
  },
  {
    id: 'doenca_infantil', title: 'Febre de Três Dias', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMax: 13 },
    text: 'Uma febre estranha deixa você na cama por três dias. O curandeiro balança a cabeça.',
    choices: [
      { text: 'Lutar contra a febre com teimosia.', check: { stat: ['fis', 'dao'], dif: 0 }, ok: { text: 'A febre cede. Você acorda com a mente limpa e o corpo mais rijo.', fx: { stats: { fis: 1, dao: 1 } } }, fail: { text: 'A febre passa, mas leva um pouco do seu vigor.', fx: { stats: { fis: -1 }, vida: -2 } } },
      { text: 'Beber a erva amarga que o curandeiro receitou.', res: { text: 'O gosto é horrível. A febre cede devagar.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'festival_vila', title: 'Festival da Lua Cheia', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMax: 17 },
    text: 'Toda a {vila} se reúne sob lanternas de papel. Há jogos, dados de osso, bolos de arroz e um mágico itinerante que jura prever o futuro.',
    choices: [
      { text: 'Jogar dados de osso.', check: { stat: 'sor', dif: 0 }, ok: { text: 'A sorte sorri. Você volta com os bolsos mais pesados.', fx: { pedras: 4, stats: { sor: 1 } } }, fail: { text: 'Você perde tudo que tinha em três lances e aprende sobre arrependimento.', fx: { pedras: -1, stats: { dao: 1 } } } },
      { text: 'Deixar o mágico prever seu futuro.', res: { text: '"Vejo uma montanha... e muito, muito fogo", diz ele, sem convicção. Você sai cheio de perguntas.', fx: { stats: { sor: 1 }, setFlags: ['profecia_vaga'] } } },
      { text: 'Ajudar a servir os idosos.', res: { text: 'Você passa a noite carregando bandejas. A vila se lembra disso.', fx: { karma: 4, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'trabalho_pesado', title: 'Mãos de Trabalho', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMax: 17 },
    text: 'O dono da forja precisa de ajudante. É trabalho pesado, calor demais e um salário de fome.',
    choices: [
      { text: 'Aceitar e aguentar o martelo.', check: { stat: 'fis', dif: 0 }, ok: { text: 'Meses de martelo transformam seus braços. Você aprende o ritmo do metal.', fx: { stats: { fis: 2 }, pedras: 3 } }, fail: { text: 'Uma faísca queima seu braço. O ferreiro o dispensa com pena.', fx: { ferida: 1, stats: { fis: 1 } } } },
      { text: 'Recusar e estudar com a velha escriba.', res: { text: 'A escriba lhe ensina a ler e a escrever caracteres antigos. Livros serão suas armas.', fx: { stats: { comp: 2 } } } },
    ],
  },
  {
    id: 'biblioteca_do_cla', title: 'O Arquivo Empoeirado', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMax: 17, origin: ['cla_decadente'] },
    text: 'Você encontra o velho arquivo do {cla}, trancado há décadas. Lá dentro há pergaminhos mofados, livros de contabilidade e algo que parece um diagrama de formação.',
    choices: [
      { text: 'Estudar o diagrama noite após noite.', check: { stat: 'comp', dif: 1 }, ok: { text: 'Você decifra os fundamentos da formação. O nome do seu clã já foi grande.', fx: { stats: { comp: 2 }, setFlags: ['arquivo_cla'] } }, fail: { text: 'Você só entende que o diagrama é complicado. Mas persiste.', fx: { stats: { comp: 1 } } } },
      { text: 'Vender os pergaminhos mais velhos.', res: { text: 'Você levanta algumas pedras e uma sensação estranha de ter vendido a história de alguém.', fx: { pedras: 8, karma: -2 } } },
    ],
  },
  {
    id: 'rival_aparece_crianca', title: 'O Jovem Mestre Arrogante', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 8, ageMax: 17 },
    text: '{rival}, filho do homem mais rico da região, chuta o seu balde d\'água e ri. "Gente como você deveria servir gente como eu."',
    choices: [
      { text: 'Engolir o insulto e baixar a cabeça.', res: { text: 'O riso de {rival} ecoa na sua cabeça por muitos anos.', fx: { stats: { dao: 1 }, setFlags: ['humilhado_por_rival'], agenda: [{ event: 'rival_reaparece', em: [12, 25] }] } } },
      { text: 'Revidar com um soco.', check: { stat: 'fis', dif: 1 }, ok: { text: 'O nariz de {rival} sangra. A vila inteira ouve. A fama de valentão começa a crescer.', fx: { fama: 2, karma: -2, stats: { fis: 1, dao: 1 }, setFlags: ['enfrentou_rival'], agenda: [{ event: 'rival_reaparece', em: [12, 25] }] } }, fail: { text: 'Você leva uma surra e um olho roxo. {rival} nunca esquecerá a audácia.', fx: { ferida: 1, setFlags: ['humilhado_por_rival', 'enfrentou_rival'], agenda: [{ event: 'rival_reaparece', em: [12, 25] }] } } },
      { text: 'Ignorar e seguir seu caminho.', res: { text: 'Você caminha sem olhar para trás. A calma vale mais que um soco.', fx: { stats: { dao: 2 }, agenda: [{ event: 'rival_reaparece', em: [12, 25] }] } } },
    ],
  },
  {
    id: 'noivado_arranjado', title: 'Um Contrato de Famílias', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 12, ageMax: 18, origin: ['cla_decadente', 'mercador', 'campones'] },
    text: 'Seus pais assinam um contrato de noivado com a família de {noivo}. "É por seu futuro", dizem. Você mal conhece a pessoa.',
    choices: [
      { text: 'Aceitar com respeito.', res: { text: 'Você cumprimenta {noivo} com educação. Há simpatia, mas nenhuma urgência.', fx: { setFlags: ['noivado'], agenda: [{ event: 'noivado_rompido', em: [5, 12] }], stats: { car: 1 } } } },
      { text: 'Protestar, dizendo que seu destino é o Dao.', res: { text: 'Seus pais fecham a cara. O contrato permanece, mas você deixou claro seu rumo.', fx: { setFlags: ['noivado'], agenda: [{ event: 'noivado_rompido', em: [5, 12] }], stats: { dao: 1 } } } },
    ],
  },

  /* ===== Despertar do Qi ===== */
  {
    id: 'despertar_viajante', title: 'O Cultivador Viajante', rarity: 'comum', once: true, weight: 8,
    cond: { tierMax: 0, ageMin: 11, noFlags: ['despertou'], origin: ['campones', 'cacador', 'mercador', 'mendigo_iluminado'] },
    text: 'Um cultivador errante passa por {vila} testando crianças com uma pequena esfera de cristal. Quando chega a sua vez, a esfera tremula.',
    choices: [
      { text: 'Concentrar-se e tentar guiar o brilho.', check: { stat: ['comp', 'esp'], dif: -2 }, ok: { text: 'O cristal se acende em luz suave. "Você tem as raízes", diz o viajante, e lhe ensina o primeiro método de respiração.', fx: { tier: 1, setFlags: ['despertou'], faccao: 'errante' } }, fail: { text: 'O cristal vibra, mas não acende. "Talvez com mais um pouco de tempo", diz o viajante, sem muita esperança.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'despertar_pedra_seita', title: 'A Pedra de Teste da Seita', rarity: 'comum', once: true, weight: 10,
    cond: { tierMax: 0, ageMin: 11, noFlags: ['despertou'], origin: ['orfao_seita'] },
    text: 'Na {seita}, órfãos e servos fazem fila diante da Pedra de Teste. Cada toque revela um brilho — ou o silêncio.',
    choices: [
      { text: 'Tocar a pedra com firmeza.', check: { stat: ['comp', 'esp'], dif: -2 }, ok: { text: 'A pedra brilha. O Ancião assente. Você deixa de ser servo e se torna discípulo externo.', fx: { tier: 1, setFlags: ['despertou', 'membro_seita', 'discipulo_externo'], faccao: 'seita', local: 'seita' } }, fail: { text: 'A pedra não responde. Você volta a varrer o pátio, mas ainda sonha com ela.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'despertar_cla', title: 'O Manual do Cofre', rarity: 'comum', once: true, weight: 10,
    cond: { tierMax: 0, ageMin: 11, noFlags: ['despertou'], origin: ['cla_decadente'] },
    text: 'Atrás do cofre vazio do {cla}, você encontra um compartimento oculto contendo um manual de respiração, escrito por seu ancestral.',
    choices: [
      { text: 'Seguir as instruções do manual.', check: { stat: 'comp', dif: -2 }, ok: { text: 'Após semanas de insistência, você sente uma corrente morna subir pelo ventre. O Qi respondeu.', fx: { tier: 1, setFlags: ['despertou'], faccao: 'cla', stats: { comp: 1 } } }, fail: { text: 'Nada acontece, mas o manual agora é sua companhia. Quem sabe amanhã.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'despertar_alquimista', title: 'A Receita do Avô', rarity: 'comum', once: true, weight: 12,
    cond: { tierMax: 0, ageMin: 11, noFlags: ['despertou'], flags: ['avo_alquimista'] },
    text: 'Entre as receitas do avô, uma página cheirando a ervas queimadas descreve como "sentir o Qi no fogo". Você acende uma pequena chama.',
    choices: [
      { text: 'Observar a chama até sentir algo.', check: { stat: 'comp', dif: -3 }, ok: { text: 'Na terceira noite, a chama dança ao ritmo da sua respiração. O Qi nasceu do fogo.', fx: { tier: 1, setFlags: ['despertou', 'alquimista_aprendiz'], faccao: 'errante' } }, fail: { text: 'A chama só aquece. Mas você aprendeu a ter paciência com o fogo.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'despertar_reencarnado', title: 'Memórias de Outra Vida', rarity: 'comum', once: true, weight: 14,
    cond: { tierMax: 0, ageMin: 10, noFlags: ['despertou'], flags: ['reencarnado'] },
    text: 'Numa noite de febre, flashes de uma vida passada irrompem na sua mente: montanhas de nuvens, um nome esquecido e um método de respiração antigo.',
    choices: [
      { text: 'Seguir o método da memória.', check: { stat: 'dao', dif: -4 }, ok: { text: 'O corpo jovem aceita o método antigo como se sempre a tivesse conhecido. O Qi desperta.', fx: { tier: 1, setFlags: ['despertou'], stats: { comp: 2 }, faccao: 'errante' } }, fail: { text: 'O método é mais difícil do que parecia: o corpo ainda é fraco demais. Mas a lembrança permanece.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'despertar_demoniaco', title: 'O Sussurro do Sangue', rarity: 'comum', once: true, weight: 12,
    cond: { tierMax: 0, ageMin: 11, noFlags: ['despertou'], flags: ['sangue_demoniaco'] },
    text: 'Na seita demoníaca, os mais jovens são levados ao Altar do Sangue. Ali, o poder acorda, mas cobra seu preço.',
    choices: [
      { text: 'Aceitar o poder que sobe pelas veias.', check: { stat: ['fis', 'dao'], dif: -2 }, ok: { text: 'Você sente o poder queimando e algo dentro de você sorri. O Qi desperta, escuro e faminto.', fx: { tier: 1, setFlags: ['despertou', 'membro_demoniaca'], faccao: 'demoniaca', corr: 10, stats: { dao: 1 } } }, fail: { text: 'O sangue rejeita seu corpo. Cuspindo vermelho, você sobrevive para tentar outra vez.', fx: { ferida: 1, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'despertar_acidente', title: 'Relâmpago em Dia Claro', rarity: 'raro', once: true, weight: 4,
    cond: { tierMax: 0, ageMin: 11, noFlags: ['despertou'] },
    text: 'Um raio cai de um céu sem nuvens, a poucos passos de você. Sua pele formiga e os cabelos se arrepiam. Algo dentro de você sussurra: "Respire".',
    choices: [
      { text: 'Respirar fundo e seguir o chamado.', check: { stat: ['esp', 'dao'], dif: -1 }, ok: { text: 'O raio deixou uma semente de Qi no seu ventre. Você sobrevive e desperta.', fx: { tier: 1, setFlags: ['despertou'], stats: { esp: 2, sor: 1 }, faccao: 'errante' } }, fail: { text: 'Você desmaia. Acorda dias depois com cabelos brancos nas têmporas e uma cicatriz em forma de samambaia.', fx: { ferida: 2, stats: { esp: 1 }, vida: -3 } } },
    ],
  },
  {
    id: 'despertar_tardio', title: 'O Despertar Tardio', rarity: 'comum', once: true, weight: 8,
    cond: { tierMax: 0, ageMin: 17, ageMax: 29, noFlags: ['despertou'] },
    text: 'Os anos passaram e o Qi ainda dorme em você. Numa noite sem lua, após horas de meditação, uma centelha desperta.',
    choices: [
      { text: 'Persistir contra a exaustão.', check: { stat: 'dao', dif: 0 }, ok: { text: 'A teimosia compensa. O Qi vem, tardio mas verdadeiro. Você nunca esquecerá a longa espera.', fx: { tier: 1, setFlags: ['despertou'], stats: { dao: 2 }, faccao: 'errante' } }, fail: { text: 'A centelha se apaga. Você se pergunta se o Dao tem lugar para gente como você.', fx: { stats: { dao: 1 } } } },
    ],
  },

  /* ===== Vida Comum (último recurso) ===== */
  {
    id: 'vida_comum', title: 'A Vida Comum Chama', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 30 },
    weight: 0.001,
    text: 'Aos {idade} anos, o sonho do Dao ficou para trás. A vida de {vila} oferece trabalho, uma casa e talvez uma família. Mas, no fundo, algo ainda brilha.',
    choices: [
      { text: 'Aceitar a vida simples.', res: { text: 'Você planta, colhe e envelhece em paz. Em noites claras, olha as estrelas e sorri.', fx: { fim: 'mortal' } } },
      { text: 'Uma última tentativa de despertar.', check: { stat: 'dao', dif: 5 }, ok: { text: 'Com as últimas forças da juventude, você consegue. O Qi desperta e todo o tempo perdido some como névoa.', fx: { tier: 1, setFlags: ['despertou'], faccao: 'errante', stats: { dao: 2 } } }, fail: { text: 'Nada acontece. A porta se fecha, gentil, mas definitiva.', fx: { fim: 'mortal' } } },
    ],
  },
];
