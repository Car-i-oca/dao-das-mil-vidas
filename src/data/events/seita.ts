import type { GameEvent } from '../../types';

/** Vida em seitas e clãs, rivais e cadeias. */
export const seita: GameEvent[] = [
  {
    id: 'entrar_na_seita', title: 'Um Portão Entreaberto', rarity: 'comum', once: true, weight: 6,
    cond: { tierMin: 1, tierMax: 3, noFlags: ['membro_seita'], faction: ['errante', 'nenhuma', 'cla'] },
    text: 'No sopé do monte, a {seita} abre as portas para novos discípulos. Alguns choram de felicidade, outros calculam a vantagem.',
    choices: [
      { text: 'Prestar o exame de ingresso.', check: { stat: ['comp', 'esp'], dif: -1 }, ok: { text: 'Você entra como discípulo externo. A sopa é rala, mas os manuais são generosos.', fx: { setFlags: ['membro_seita', 'discipulo_externo'], faccao: 'seita', local: 'seita', xp: 8 } }, fail: { text: 'O examinador balança a cabeça. "Volte quando tiver mais base."', fx: { stats: { dao: 1 } } } },
      { text: 'Seguir como cultivador errante.', res: { text: 'Liberdade tem sabor de vento, e fome de verdade.', fx: { faccao: 'errante', stats: { dao: 1 }, pedras: 2 } } },
    ],
  },
  {
    id: 'tarefas_externas', title: 'Tarefas dos Discípulos Externos', rarity: 'comum', cooldown: 6,
    cond: { tierMin: 1, tierMax: 3, faction: ['seita'], noFlags: ['discipulo_interno'] },
    text: 'O Ancião de Tarefas distribui trabalhos: limpar o pátio, colher ervas de baixa classe, carregar água para os pavilhões internos.',
    choices: [
      { text: 'Fazer o serviço e ganhar pontos de mérito.', res: { text: 'Mãos calejadas, mérito acumulado e Qi absorvido durante o esforço.', fx: { xp: 7, pedras: 2, stats: { fis: 1 } } } },
      { text: 'Fugir do serviço para ler na biblioteca.', check: { stat: 'car', dif: -1 }, ok: { text: 'Ninguém percebe. Você devora um manual inteiro.', fx: { xp: 10, stats: { comp: 1 } } }, fail: { text: 'O Ancião de Tarefas o pega e o castiga com o dobro de serviço.', fx: { xp: 2, fama: -1 } } },
    ],
  },
  {
    id: 'prova_discipulo_interno', title: 'A Prova dos Discípulos Internos', rarity: 'comum', once: true, weight: 3,
    cond: { tierMin: 1, faction: ['seita'], flags: ['discipulo_externo'], noFlags: ['discipulo_interno'] },
    text: 'A cada poucos anos, a {seita} abre vagas para o círculo interno. A prova é dura e quem passa ganha acesso a mestres e recursos.',
    choices: [
      { text: 'Enfrentar a prova com tudo que tem.', check: { stat: ['comp', 'fis', 'dao'], dif: 0 }, ok: { text: 'Você passa e veste o manto interno. O pavilhão de cultivo agora tem uma porta para você.', fx: { setFlags: ['discipulo_interno'], xp: 12, fama: 4, stats: { dao: 1 } } }, fail: { text: 'Você reprova por um triz. Os colegas riem, mas você vê o caminho para a próxima vez.', fx: { stats: { dao: 1 }, ferida: 1 } } },
      { text: 'Subornar um examinador (30 pedras).', custo: 30, check: { stat: 'car', dif: 1 }, ok: { text: 'O examinador fecha os olhos para sua falha. Você passa.', fx: { setFlags: ['discipulo_interno'], karma: -5, xp: 8 } }, fail: { text: 'O examinador aceita o suborno e o denuncia.', fx: { karma: -5, fama: -4 } } },
    ],
  },
  {
    id: 'torneio_seita', title: 'O Torneio da Seita', rarity: 'comum', cooldown: 20,
    cond: { tierMin: 1, faction: ['seita'] },
    text: 'A {seita} realiza seu torneio quinquenal. Os melhores serão recompensados com método e recursos; os piores, com humilhação pública.',
    choices: [
      { text: 'Disputar com tudo.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você derruba um oponente após outro. A arena grita seu nome.', fx: { fama: 8, pedras: 12, xp: 10, setFlags: ['campeao_torneio'], stats: { dao: 1 } } }, fail: { text: 'Você cai nas quartas de final, mas luta bem e aprende.', fx: { fama: 2, ferida: 1, xp: 4 } } },
      { text: 'Assistir de longe e estudar os golpes.', res: { text: 'Cada golpe é uma lição. Você anota mentalmente e imita à noite.', fx: { stats: { comp: 1 }, xp: 5 } } },
    ],
  },
  {
    id: 'mestre_ve_talento', title: 'O Olhar do Mestre', rarity: 'raro', once: true, weight: 8,
    cond: { tierMin: 1, tierMax: 4, faction: ['seita'], flags: ['discipulo_interno'], noFlags: ['mestre_protetor'] },
    text: 'O Mestre {mentor} passa por você no pátio e para. "Você tem algo", diz, e o olha como quem avalia uma espada.',
    choices: [
      { text: 'Pedir que o aceite como discípulo direto.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'O Mestre {mentor} aceita. Daqui em diante, você terá luz de verdade no caminho.', fx: { setFlags: ['mestre_protetor'],  xp: 15, stats: { comp: 2 }, fama: 4 } }, fail: { text: '"Ainda não", diz o Mestre. "Mostre-me mais em cinco anos."', fx: { stats: { dao: 1 } } } },
      { text: 'Agradecer e continuar por conta própria.', res: { text: 'Você rejeita proteção para construir seu próprio caminho.', fx: { stats: { dao: 2 }, setFlags: ['independente'] } } },
    ],
  },
  {
    id: 'missao_da_seita', title: 'Missão do Pavilhão de Tarefas', rarity: 'comum', cooldown: 8,
    cond: { tierMin: 1, tierMax: 5, faction: ['seita'] },
    text: 'O Pavilhão de Tarefas oferece uma missão: escoltar um comboio de ervas por estradas infestadas de bandidos e feras.',
    choices: [
      { text: 'Aceitar a missão difícil (alto risco, alta recompensa).', check: { stat: ['fis', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Você lidera a escolta, derruba os bandidos e chega são e salvo. O mérito é generoso.', fx: { pedras: 25, fama: 5, xp: 10 } }, fail: { text: 'Houve baixas. Você sobrevive, ferido, e entrega o comboio incompleto.', fx: { pedras: 5, ferida: 2, xp: 4 } } },
      { text: 'Aceitar a missão fácil (pouco risco).', res: { text: 'Uma viagem tranquila rende uma recompensa decente.', fx: { pedras: 8, xp: 4 } } },
    ],
  },
  {
    id: 'biblioteca_da_seita', title: 'O Pavilhão dos Mil Livros', rarity: 'comum', cooldown: 10,
    cond: { tierMin: 1, tierMax: 5, faction: ['seita'] },
    text: 'Seus pontos de mérito permitem ler no pavilhão do segundo andar. Os livros ali custam caro e ensinam mais que qualquer sermão.',
    choices: [
      { text: 'Pagar 20 pedras por acesso a manuais de método.', custo: 20, check: { stat: 'comp', dif: 0 }, ok: { text: 'Após semanas de leitura, você domina um método novo.', fx: { item: ['manual_passo_garca'], xp: 8, stats: { comp: 1 } } }, fail: { text: 'Os manuais são densos demais. Você aprende só um pedaço do que buscava.', fx: { xp: 4 } } },
      { text: 'Ler apenas os livros livres.', res: { text: 'Poucos segredos, mas nenhum custo. Você relê textos básicos com olhos novos.', fx: { xp: 5, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'traicao_irmao_marcial', title: 'Traição de um Irmão Marcial', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 5, faction: ['seita'] },
    text: '{amigo}, seu irmão marcial mais próximo, roubou um manual do Pavilhão e deixou a culpa nas suas costas. Os Anciãos já o procuram.',
    choices: [
      { text: 'Provar sua inocência com a verdade.', check: { stat: ['car', 'comp'], dif: 2 }, ok: { text: 'Você expõe a trama com provas. {amigo} foge em desgraça; seu nome fica limpo.', fx: { fama: 6, karma: 2, setFlags: ['traiu_por_amigo'], agenda: [{ event: 'traidor_reaparece', em: [20, 50] }] } }, fail: { text: 'Ninguém acredita. Você é punido e perde meses de mérito.', fx: { fama: -6, pedras: -10, ferida: 1, setFlags: ['traiu_por_amigo'], agenda: [{ event: 'traidor_reaparece', em: [20, 50] }] } } },
      { text: 'Aceitar a culpa para proteger {amigo}.', res: { text: 'Você paga pelo crime alheio. Anos depois, descobrirá que a lealdade nem sempre é recompensada.', fx: { karma: 5, fama: -4, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'traidor_reaparece', title: 'O Traidor Reaparece', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['traiu_por_amigo'] },
    text: '{amigo} reaparece, mais poderoso e com olhos de quem escolheu o lado errado. "Você não imagina o que passei", diz.',
    choices: [
      { text: 'Enfrentá-lo.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Após uma luta amarga, você o derrota. O olhar dele agradece por não ter sido pior.', fx: { fama: 8, karma: 3, stats: { dao: 2 }, xp: 10 } }, fail: { text: 'Ele vence. Mas poupa você, pela amizade antiga.', fx: { ferida: 2, fama: -4, stats: { dao: 1 } } } },
      { text: 'Perdoar e deixá-lo seguir.', res: { text: 'Seu perdão é mais pesado que qualquer golpe.', fx: { karma: 10, stats: { dao: 3 } } } },
    ],
  },
  {
    id: 'seita_sob_cerco', title: 'A Seita Sob Cerco', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 5, faction: ['seita'] },
    text: 'Gritos no portão. A {seita} está sob ataque de uma facção rival. Anciãos correm, discípulos trêmulos escondem-se nas cavernas.',
    choices: [
      { text: 'Lutar no portão ao lado dos Anciãos.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Você luta como nunca. Quando o fumo baixa, a seita sobreviveu e seu nome é falado com respeito.', fx: { fama: 15, xp: 18, ferida: 1, karma: 5, stats: { dao: 2 }, setFlags: ['heroi_do_cerco'] } }, fail: { text: 'O portão cai. Você sobrevive por sorte, marcado de cicatrizes.', fx: { ferida: 3, fama: 4, xp: 6 } } },
      { text: 'Fugir pelos túneis com os mais jovens.', res: { text: 'Você leva os pequenos a salvo. Nenhuma glória, mas muitas vidas.', fx: { karma: 8, fama: 3, stats: { car: 1 } } } },
      { text: 'Aproveitar o caos para saquear o Pavilhão do Tesouro.', check: { stat: 'sor', dif: 2 }, ok: { text: 'Você sai com uma bolsa pesada. A culpa pesa mais que a bolsa.', fx: { pedras: 60, karma: -15, fama: -5, setFlags: ['saqueou_seita'] } }, fail: { text: 'Pego em flagrante, você foge sem nada.', fx: { karma: -10, fama: -10, ferida: 1, faccao: 'errante', clearFlags: ['membro_seita'] } } },
    ],
  },
  {
    id: 'visita_do_ancião', title: 'O Ancião da Montanha Posterior', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 5, faction: ['seita'], flags: ['discipulo_interno'] },
    text: 'Um Ancião recluso, que ninguém vê há décadas, convoca você. Seus olhos são nuvens cinzentas. "Responda-me com sinceridade: por que você cultiva?"',
    choices: [
      { text: '"Para viver mais e proteger quem amo."', res: { text: 'O Ancião sorri. "Motivo honesto, caminho estável." Ele toca sua testa e despeja um fio de seu próprio Qi.', fx: { xp: 20, stats: { dao: 2 }, karma: 3 } } },
      { text: '"Para ficar mais forte que todos."', res: { text: 'O Ancião suspira. "Já vi esse brilho acabar em cinzas. Mas o poder também é um caminho." Ele lhe dá um manual de combate.', fx: { xp: 10, item: ['manual_tres_luas'], stats: { dao: 1, fis: 1 } } } },
      { text: '"Não sei."', res: { text: '"Então já está no começo da verdade." O Ancião ri alto. "Volte quando souber."', fx: { stats: { dao: 3, comp: 1 } } } },
    ],
  },
  {
    id: 'rival_reaparece', title: 'O Rival do Passado', rarity: 'raro', once: true,
    cond: { tierMin: 1 },
    text: '{rival} reaparece anos depois, elegante e com cultivo superior ao seu. "Ainda lembra de mim?", pergunta, com um sorriso que não alcança os olhos.',
    choices: [
      { text: 'Desafiá-lo para um duelo.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'Você vence. {rival} cai de joelhos, atônito. "Isso não termina aqui."', fx: { fama: 8, karma: -3, stats: { dao: 2 }, setFlags: ['humilhou_rival'], agenda: [{ event: 'rival_vinganca_final', em: [15, 40] }] } }, fail: { text: '{rival} o derrota diante de testemunhas. Você sente o gosto da cinza.', fx: { fama: -5, ferida: 2, setFlags: ['derrotado_pelo_rival'], agenda: [{ event: 'rival_vinganca_final', em: [15, 40] }] } } },
      { text: 'Fingir que não o reconhece.', res: { text: 'Você passa por ele como por uma pedra do caminho. Ele não esquece o desprezo.', fx: { stats: { dao: 1 }, setFlags: ['ignorou_rival'], agenda: [{ event: 'rival_vinganca_final', em: [20, 45] }] } } },
      { text: 'Cumprimentar com respeito e mostrar maturidade.', check: { stat: 'car', dif: 0 }, ok: { text: '{rival} hesita. Talvez haja paz possível. Ele se retira sem dizer uma palavra.', fx: { karma: 4, stats: { car: 1, dao: 1 }, setFlags: ['paz_com_rival'] } }, fail: { text: '{rival} entende a cortesia como fraqueza e sorri com malícia.', fx: { setFlags: ['ignorou_rival'], agenda: [{ event: 'rival_vinganca_final', em: [20, 45] }] } } },
    ],
  },
  {
    id: 'rival_vinganca_final', title: 'O Acerto de Contas', rarity: 'raro', once: true,
    cond: { tierMin: 2, noFlags: ['paz_com_rival', 'rival_derrotado'] },
    text: '{rival} finalmente te encurrala numa passagem estreita. Atrás dele, capangas. No olhar, anos de ressentimento. "Hoje a gente resolve isso."',
    choices: [
      { text: 'Lutar até o fim.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'Depois de uma luta devastadora, {rival} cai. O silêncio que sobra é estranhamente vazio.', fx: { fama: 15, karma: -5, stats: { dao: 3 }, xp: 15, setFlags: ['rival_derrotado'] } }, fail: { text: 'Você é derrotado. {rival} hesita no golpe final, e por um instante você vê dúvida em seu rosto.', fx: { ferida: 3, fama: -6, stats: { dao: 1 } } } },
      { text: 'Usar um Talismã de Fuga.', cond: { item: 'talisma_fuga' }, res: { text: 'Uma luz branca e você some. {rival} ruge de raiva. A fuga custa o orgulho, mas poupa a vida.', fx: { removeItem: ['talisma_fuga'], fama: -3 } } },
      { text: 'Propor uma trégua honrada.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'Para surpresa geral, {rival} aceita. Talvez ele também estivesse cansado.', fx: { karma: 8, stats: { dao: 2 }, setFlags: ['paz_com_rival'] } }, fail: { text: '{rival} ri e ataca. Você se defende no limite.', fx: { ferida: 3, fama: -4 } } },
    ],
  },
  {
    id: 'jovem_mestre_na_cidade', title: 'O Jovem Mestre da Cidade', rarity: 'comum', cooldown: 15,
    cond: { tierMin: 1, tierMax: 4, local: ['cidade'] },
    text: 'Um jovem mestre de família poderosa, rodeado de guarda-costas, bloqueia sua passagem. "Esse manto é bonito. Eu o quero."',
    choices: [
      { text: 'Entregar o manto para evitar problemas.', res: { text: 'O jovem ri, satisfeito. A humilhação pica por dentro.', fx: { stats: { dao: 1 }, fama: -2 } } },
      { text: 'Recusar com firmeza.', check: { stat: ['fis', 'car'], dif: 2, tag: 'combate' }, ok: { text: 'Seu olhar firme congela os guarda-costas. O jovem recua. A cidade comenta o episódio por dias.', fx: { fama: 5, stats: { dao: 1 }, setFlags: ['humilhou_rival'] } }, fail: { text: 'Os guarda-costas descem a mão. Você fica caído no beco, sozinho.', fx: { ferida: 2, fama: -2 } } },
      { text: 'Oferecer 10 pedras em troca de paz.', custo: 10, res: { text: 'O jovem aceita o dinheiro e vai embora. Barato, mas amargo.', fx: { karma: 1 } } },
    ],
  },
  {
    id: 'inimigo_humilhado_retorna', title: 'O Orgulho Ferido Volta', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['humilhou_rival'], noFlags: ['rival_derrotado', 'paz_com_rival'] },
    text: 'Um mensageiro entrega uma carta: "{rival}, a quem você humilhou, voltou com poder. Ele marcou o dia." Quem planta orgulho colhe tempestade.',
    choices: [
      { text: 'Preparar-se com meses de treino.', check: { stat: ['fis', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Quando o dia chega, você está pronto. A luta é feia e vitoriosa.', fx: { fama: 10, stats: { dao: 2 }, setFlags: ['rival_derrotado'], xp: 10 } }, fail: { text: 'Você perde. Humilhado agora, descobre que o ciclo da vingança é fome sem fundo.', fx: { ferida: 3, fama: -8, stats: { dao: 1 } } } },
      { text: 'Ir pessoalmente pedir desculpas.', check: { stat: 'car', dif: 1 }, ok: { text: '{rival} desarma-se com o gesto. A inimizade não some, mas se apaga.', fx: { karma: 6, setFlags: ['paz_com_rival'], stats: { dao: 2 } } }, fail: { text: '{rival} cospe aos seus pés.', fx: { fama: -4 } } },
    ],
  },
  {
    id: 'noivado_rompido', title: 'O Contrato Rompido', rarity: 'raro', once: true,
    cond: { flags: ['noivado'] },
    text: 'A família de {noivo} anuncia o rompimento do noivado diante de todos, alegando que você não tem futuro no cultivo. A voz de {noivo} treme, mas não o defende.',
    choices: [
      { text: 'Jurar, diante de todos, que um dia voltará com glória.', res: { text: 'O juramento fica gravado no seu coração. Nenhuma montanha vai pesar mais do que ele.', fx: { stats: { dao: 3 }, setFlags: ['juramento_vinganca'], agenda: [{ event: 'noivo_retorna', em: [15, 45] }] } } },
      { text: 'Aceitar em silêncio e partir.', res: { text: 'Você não derrama uma lágrima. A dor vira combustível quieto.', fx: { stats: { dao: 1 }, agenda: [{ event: 'noivo_retorna', em: [20, 50] }] } } },
      { text: 'Desejar sinceramente felicidade a {noivo}.', res: { text: 'O gesto surpreende todos. A mágoa se dissolve antes de criar raízes.', fx: { karma: 5, stats: { dao: 2, car: 1 }, agenda: [{ event: 'noivo_retorna', em: [20, 50] }] } } },
    ],
  },
  {
    id: 'noivo_retorna', title: 'Quando {noivo} Volta', rarity: 'raro', once: true,
    cond: { tierMin: 1 },
    text: 'Décadas depois, {noivo} aparece à sua porta. A família que o desprezou agora precisa de ajuda: um ancestral foi ferido e só um cultivador como você poderia tratá-lo.',
    choices: [
      { text: 'Ajudar sem cobrar nada.', res: { text: 'Você trata o ancestral. {noivo} chora, sem palavras. Nenhuma vingança é maior que a bondade inesperada.', fx: { karma: 12, fama: 6, stats: { dao: 3 }, setFlags: ['perdoou_noivado'] } } },
      { text: 'Cobrar um preço alto (100 pedras).', res: { text: 'Você leva o dinheiro e deixa claras as consequências do desprezo antigo.', fx: { pedras: 100, karma: -4, fama: 2 } } },
      { text: 'Recusar friamente e fechar a porta.', res: { text: 'A porta bate. Você não sente o triunfo que esperava.', fx: { karma: -3, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'amigo_reencontro', title: 'O Amigo de Infância', rarity: 'raro', once: true,
    cond: { tierMin: 1 },
    text: '{amigo}, seu amigo de infância, aparece diante de você, envelhecido e cultivando em outra seita. "Eu sabia que você chegaria longe", diz com um abraço.',
    choices: [
      { text: 'Dividir recursos com ele.', res: { text: 'Vocês passam semanas trocando dicas e ervas. Os dois ficam mais fortes.', fx: { pedras: -10, xp: 10, karma: 4, stats: { car: 1, comp: 1 } } } },
      { text: 'Lembrar a antiga promessa e propor uma aliança.', res: { text: 'Vocês selam uma aliança de ajuda mútua. O mundo cultivador é menos solitário agora.', fx: { setFlags: ['aliado_amigo'], stats: { car: 1, dao: 1 }, fama: 3 } } },
    ],
  },
];
