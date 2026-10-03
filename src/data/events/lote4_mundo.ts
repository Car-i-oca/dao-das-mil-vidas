import type { GameEvent } from '../../types';

/**
 * Lote 4 — Mundo mortal, impérios, jianghu, companheiro do Dao, família e clã.
 * Convenções: cortes e dinastias que cultivadores influenciam, pactos de irmãos jurados, clãs que crescem por gerações.
 * Sem conteúdo sexual: romance é companheirismo, sacrifício e família.
 */
export const lote4Mundo: GameEvent[] = [
  /* ===== Companheiro do Dao e família ===== */
  {
    id: 'pedido_de_casamento', title: 'Uma Proposta de Companhia', rarity: 'raro', once: true, weight: 2,
    cond: { tierMin: 1, tierMax: 5, ageMin: 18, noFlags: ['companheiro_dao', 'amor_incipiente'], local: ['cidade', 'vilarejo', 'seita'] },
    text: 'Uma pessoa de mãos calejadas e olhar sério, a quem você ajudou algumas vezes, propõe: "Cultivar sozinha é fácil de começar e difícil de aguentar. Quer caminhar comigo? Sem promessas grandes, apenas companhia."',
    choices: [
      { text: 'Aceitar a companhia, passo a passo.', check: { stat: ['car', 'dao'], dif: 0 }, ok: { text: 'A conversa vira rotina, a rotina vira costume, e o costume vira alicerce. Vocês combinam como as duas metades de uma folha.', fx: { setFlags: ['companheiro_dao'], stats: { dao: 2, car: 1 }, karma: 3 } }, fail: { text: 'Vocês tentam, mas os caminhos divergem em demasia. Ficam amigos, de longe.', fx: { stats: { car: 1 } } } },
      { text: 'Recusar com gentileza: seu caminho é solitário.', res: { text: 'A pessoa sorri com pena e respeito. "Entendo." A porta fica entreaberta para sempre.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'casa_na_montanha', title: 'A Casa na Encosta', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 1, flags: ['companheiro_dao'] },
    text: 'Vocês constroem, juntos, uma casa pequena na encosta de uma montanha, com horta, um poço e um pátio onde se pode meditar sem olhar para o vizinho. O silêncio é quase tangível.',
    choices: [
      { text: 'Passar um ano cuidando da casa e cultivando juntos.', res: { text: 'As estações giram. O Qi flui mais fácil com alguém para dividir o chá no fim do dia.', fx: { anos: 1, xp: 12, stats: { dao: 1, esp: 1 }, karma: 2 } } },
      { text: 'Ficar pouco tempo e voltar à estrada.', res: { text: 'A casa espera. Cada partida deixa um sorriso apertado, cada volta traz um riso largo.', fx: { xp: 5 } } },
    ],
  },
  {
    id: 'discussao_caminhos', title: 'Dois Caminhos, Uma Discussão', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 2, flags: ['companheiro_dao'] },
    text: 'Seu companheiro de Dao quer subir a montanha em busca de um reino secreto. Você prefere esperar mais um ciclo e preparar-se. A voz de ambos se ergue, e o silêncio depois é pesado.',
    choices: [
      { text: 'Ceder e acompanhar a expedição.', check: { stat: ['fis', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'A expedição é perigosa, mas vocês voltam juntos, com um tesouro modesto e uma história para contar.', fx: { pedras: 60, xp: 10, stats: { dao: 1 }, karma: 2 } }, fail: { text: 'A expedição é um erro. Vocês voltam machucados, e a briga se repete, mais mansa.', fx: { ferida: 2, stats: { dao: 1 } } } },
      { text: 'Convencer o companheiro a esperar e se preparar.', check: { stat: ['car', 'comp'], dif: 1 }, ok: { text: 'Ele concorda, depois de um longo suspiro. A espera se torna aprendizado.', fx: { xp: 10, stats: { comp: 1, car: 1 } } }, fail: { text: 'Ele parte sozinho. Você o espera por semanas, em silêncio, até ele voltar.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },
  {
    id: 'filho_nasce', title: 'Uma Criança em Casa', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 6, ageMin: 20, flags: ['companheiro_dao'], noFlags: ['tem_filho'] },
    text: 'Numa manhã de chuva fina, uma criança chega ao mundo, pequena, vermelha e furiosa. Quem a segura pela primeira vez percebe: nenhum cultivo é tão difícil quanto criar um filho.',
    choices: [
      { text: 'Dedicar-se por alguns anos à criança.', res: { text: 'Noites sem dormir, risos e uma ternura que nenhum manual descrevia. O Coração do Dao se amplia, e o corpo cansa.', fx: { anos: 3, xp: -3, karma: 6, stats: { dao: 2, car: 1 }, setFlags: ['tem_filho'], agenda: [{ event: 'filho_adolescente', em: [12, 16] }] } } },
      { text: 'Deixar a criança aos cuidados do companheiro e continuar cultivando.', res: { text: 'Você retorna em visitas, mas sua ausência é sentida em cada canto da casa.', fx: { xp: 8, karma: -2, stats: { dao: -1 }, setFlags: ['tem_filho'], agenda: [{ event: 'filho_adolescente', em: [12, 16] }] } } },
    ],
  },
  {
    id: 'filho_adolescente', title: 'O Teste da Raiz do Seu Filho', rarity: 'raro', once: true,
    cond: { flags: ['tem_filho'] },
    text: 'Seu filho, agora adolescente, teimoso e curioso, aproxima-se de você com os olhos brilhando: "Pai, mãe, eu quero ver se tenho raiz espiritual." Sua mão treme ao tocar a testa dele.',
    choices: [
      { text: 'Testar a raiz espiritual.', check: { stat: ['sor', 'esp'], dif: 0 }, ok: { text: 'Uma raiz dupla, viva e clara. Seu filho tem talento, e olha para você sem saber se ri ou chora.', fx: { setFlags: ['filho_com_raiz'], karma: 4, stats: { dao: 1 }, agenda: [{ event: 'filho_parte', em: [6, 12] }] } }, fail: { text: 'Nada brilha. Seu filho é mortal, como a maioria. Você o abraça, e entende que há outros caminhos de grandeza.', fx: { setFlags: ['filho_mortal'], karma: 6, stats: { dao: 2 }, agenda: [{ event: 'filho_parte', em: [6, 12] }] } } },
      { text: 'Recusar o teste: quer que ele escolha o próprio rumo.', res: { text: 'O filho resmunga, depois entende. Nenhum caminho é mais valioso que o escolhido.', fx: { karma: 3, stats: { dao: 1 }, setFlags: ['filho_mortal'], agenda: [{ event: 'filho_parte', em: [6, 12] }] } } },
    ],
  },
  {
    id: 'filho_parte', title: 'O Filho Parte', rarity: 'raro', once: true,
    cond: { flags: ['tem_filho'] },
    text: 'O filho está adulto. Faz uma pequena trouxa e anuncia que parte. "Quero ver o mundo, e fazer meu próprio nome." Seu coração quer gritar "fique" e quer sussurrar "vá".',
    choices: [
      { text: 'Abençoar a partida e entregar-lhe um presente.', res: { text: 'Você entrega um objeto de família. Ele se curva e parte, e o silêncio na casa tem seu próprio peso.', fx: { karma: 8, stats: { dao: 2, car: 1 }, item: ['colar_familia'], agenda: [{ event: 'filho_retorna', em: [20, 40] }] } } },
      { text: 'Pedir que ele fique.', check: { stat: ['car', 'dao'], dif: 3 }, ok: { text: 'Ele fica, por respeito. Anos depois, descobrirá o que perdeu, e você também.', fx: { karma: -2, stats: { dao: -1 }, agenda: [{ event: 'filho_retorna', em: [20, 40] }] } }, fail: { text: 'Ele parte mesmo assim, ferido. A despedida é áspera.', fx: { karma: -4, agenda: [{ event: 'filho_retorna', em: [25, 45] }] } } },
    ],
  },
  {
    id: 'filho_retorna', title: 'A Volta do Filho', rarity: 'raro', once: true,
    cond: { flags: ['tem_filho'] },
    text: 'Décadas depois, um homem ou mulher de cabelos grisalhos aparece à porta, com uma criança pequena pela mão. "Pai, mãe, este é seu neto. Quis que o conhecesse."',
    choices: [
      { text: 'Acolher a família e passar um ano com eles.', res: { text: 'Risos na sala, histórias antigas, um neto subindo pelos seus ombros. Você recorda o que realmente importa.', fx: { anos: 1, karma: 10, stats: { dao: 3 }, xp: 6, setFlags: ['tem_neto'], agenda: [{ event: 'cla_proprio_proposta', em: [2, 6] }] } } },
      { text: 'Receber a todos com carinho e partir em breve.', res: { text: 'Você deixa uma bênção, e algumas ervas valiosas, e sai sem olhar para trás.', fx: { karma: 4, item: ['erva_cem_anos'], setFlags: ['tem_neto'], agenda: [{ event: 'cla_proprio_proposta', em: [4, 10] }] } } },
    ],
  },
  {
    id: 'cla_proprio_proposta', title: 'Um Clã Para a Família', rarity: 'raro', once: true,
    cond: { tierMin: 3, flags: ['tem_neto'] },
    text: 'Seu filho tem sonhos de reerguer um clã com seu sobrenome. Ele precisa de um patriarca, de recursos e de uma montanha. Você tem pelo menos duas dessas coisas.',
    choices: [
      { text: 'Fundar o clã e assumir como Patriarca (100 pedras).', custo: 100, check: { stat: ['car', 'comp'], dif: 3 }, ok: { text: 'O estandarte é erguido no cume. Primos, sobrinhos e vizinhos trazem filhos para estudar.', fx: { setFlags: ['cla_proprio'], fama: 12, karma: 6, stats: { car: 2, comp: 1 }, agenda: [{ event: 'cla_prospera', em: [20, 50] }] } }, fail: { text: 'Falta apoio e sobram desconfianças. O clã nasce pequeno, mas nasce.', fx: { setFlags: ['cla_proprio'], fama: 3, agenda: [{ event: 'cla_prospera', em: [25, 55] }] } } },
      { text: 'Recusar: o clã é tarefa de outra geração.', res: { text: 'O filho entende, um pouco magoado. Ele tentará por conta própria.', fx: { stats: { dao: 1 }, karma: 1 } } },
    ],
  },
  {
    id: 'cla_prospera', title: 'O Clã Que Cresceu', rarity: 'raro', once: true,
    cond: { flags: ['cla_proprio'] },
    text: 'Gerações se passaram. Seu clã tem agora um grande salão, mestres, um pequeno exército de aprendizes e um nome respeitado em três reinos. Uma criança de olhos curiosos olha para o seu retrato na parede.',
    choices: [
      { text: 'Aceitar o título de Ancestral do Clã e retirar-se em honra.', res: { text: 'Uma cerimônia lenta, perfumada de incenso. Em cada geração, uma criança aprende seu nome. Você vê tudo isso de uma janela do cume, em paz.', fx: { fim: 'ancestral' } } },
      { text: 'Continuar no caminho, deixando o clã nas mãos de herdeiros.', res: { text: 'Você deixa a chave do salão com o neto mais velho e parte. O clã o espera, com cadeira vazia na ponta da mesa.', fx: { fama: 10, karma: 6, pedras: 80, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'doenca_companheiro', title: 'A Doença do Companheiro', rarity: 'raro', once: true,
    cond: { tierMin: 2, flags: ['companheiro_dao'] },
    text: 'Seu companheiro de caminho adoece, sem causa clara. Pálido, fraco, com a respiração curta. Os curandeiros dão de ombros. Você sabe que o tempo corre.',
    choices: [
      { text: 'Usar uma Pílula dos Anos Devolvidos.', cond: { item: 'pilula_longevidade' }, res: { text: 'A pílula devolve a cor ao rosto dele. Anos depois, ele ainda sorri e diz que você é um tolo generoso.', fx: { removeItem: ['pilula_longevidade'], karma: 10, stats: { dao: 2 } } } },
      { text: 'Cuidar dele dia e noite, buscando ervas e curandeiros.', check: { stat: ['comp', 'dao'], dif: 3 }, ok: { text: 'Meses de cuidados. A doença cede, lentamente, e o abraço que vem depois vale por mil lições.', fx: { anos: 1, karma: 8, stats: { dao: 2, comp: 1 } } }, fail: { text: 'Apesar do esforço, o companheiro se vai em suas mãos. O luto o transforma em outra pessoa.', fx: { anos: 1, stats: { dao: 3, car: -1 }, xp: -5, karma: 4, clearFlags: ['companheiro_dao'], setFlags: ['viuvo_do_dao'] } } },
    ],
  },
  {
    id: 'luto_e_caminho', title: 'O Luto no Caminho', rarity: 'raro', once: true, weight: 6,
    cond: { flags: ['viuvo_do_dao'] },
    text: 'Meses depois, um monge passa pela sua porta e vê a tristeza nos olhos. "O luto também é um caminho", diz. "Quem o atravessa carrega quem foi embora dentro de si."',
    choices: [
      { text: 'Aceitar o ensinamento e meditar no luto.', check: { stat: 'dao', dif: 2, tag: 'mente' }, ok: { text: 'Em silêncio, a dor muda de forma. Em vez de ferida, vira alicerce. Seu Coração do Dao se firma como uma rocha.', fx: { stats: { dao: 4 }, xp: 14, tecnica: ['sutra_familia'] } }, fail: { text: 'O luto ainda é grande demais. Você agradece o monge e continua, pouco a pouco.', fx: { stats: { dao: 1 } } } },
      { text: 'Mergulhar no trabalho para não sentir.', res: { text: 'A rotina dura anos. A dor espera, paciente, até você estar pronto.', fx: { xp: 12, stats: { dao: 1 }, corr: 3 } } },
    ],
  },

  /* ===== Mundo mortal e impérios ===== */
  {
    id: 'corte_imperador', title: 'O Convite da Corte', rarity: 'raro', once: true,
    cond: { tierMin: 2, tierMax: 6, local: ['cidade'], fameMin: 8 },
    text: 'Um emissário em seda dourada entrega um pergaminho: o Imperador convida o famoso cultivador a visitar a corte. Banquetes, intrigas e uma oferta que ninguém sabe qual é.',
    choices: [
      { text: 'Aceitar o convite.', res: { text: 'A corte é um jardim de sorrisos afiados. O Imperador, ao final, faz uma proposta: um cargo de conselheiro espiritual.', fx: { setFlags: ['visitou_corte'], item: ['seda_imperial'], fama: 6, pedras: 40, agenda: [{ event: 'imperador_imortalidade', em: [2, 6] }] } } },
      { text: 'Recusar com cortesia.', res: { text: 'O emissário curva-se, desapontado. Nenhum dos dois sabe se foi uma escolha sábia.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'imperador_imortalidade', title: 'O Imperador Quer Viver Para Sempre', rarity: 'raro', once: true,
    cond: { flags: ['visitou_corte'] },
    text: 'Numa câmara privada, o Imperador pede: "Dizem que os cultivadores vivem séculos. Ensine-me, ou me venda uma pílula. Dou-lhe o que quiser." Seus olhos são de quem tem muito a perder e nenhuma paciência.',
    choices: [
      { text: 'Ensinar ao Imperador uma respiração simples e honesta.', res: { text: 'O Imperador pratica por meses. Não alcança imortalidade, mas vive trinta anos a mais. Você é honrado como mestre.', fx: { karma: 8, fama: 10, pedras: 150, stats: { dao: 1 } } } },
      { text: 'Vender-lhe uma pílula falsa, bem cara.', check: { stat: ['car', 'sor'], dif: 2 }, ok: { text: 'O Imperador paga um dote em ouro e você parte antes que ele descubra. A culpa é pequena, mas teimosa.', fx: { pedras: 500, karma: -16, fama: -4 } }, fail: { text: 'A farsa é descoberta. A guarda imperial o persegue por três dias.', fx: { ferida: 3, karma: -10, fama: -10 } } },
      { text: 'Recusar: ensinar o caminho a um tirano seria um erro.', res: { text: 'O Imperador o olha com frieza. "Vá, antes que eu mude de ideia." Você parte rapidamente, de cabeça erguida.', fx: { karma: 6, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'conselheiro_imperial', title: 'A Sombra do Trono', rarity: 'lendario', once: true, weight: 3,
    cond: { tierMin: 4, tierMax: 8, flags: ['visitou_corte'], karmaMin: 5, fameMin: 30 },
    text: 'O Imperador envelheceu, e seu herdeiro, um jovem frágil, pede que você aceite o cargo de Conselheiro Eterno: viver à sombra do trono, protegendo o reino de dentro. Você nunca mais será livre.',
    choices: [
      { text: 'Aceitar o cargo e dedicar a vida ao reino.', check: { stat: ['car', 'comp', 'dao'], dif: 4 }, ok: { text: 'Por séculos, você guia gerações de monarcas com palavras discretas. Seu nome nunca aparece nos livros, e o reino prospera como nunca.', fx: { fim: 'conselheiro' } }, fail: { text: 'O herdeiro é teimoso, e as intrigas o esgotam. Você parte da corte antes do fim, de cabeça baixa.', fx: { fama: 3, stats: { dao: 2 } } } },
      { text: 'Recusar, mas indicar um sucessor digno.', res: { text: 'O herdeiro suspira. Seu sucessor, anos depois, faz honra à sua escolha.', fx: { karma: 8, fama: 4 } } },
    ],
  },
  {
    id: 'general_rebelde', title: 'O General Rebelde', rarity: 'raro', cooldown: 60,
    cond: { tierMin: 2, tierMax: 7, local: ['cidade', 'vilarejo'] },
    text: 'Um general carismático ergue uma rebelião contra um governador corrupto. Aldeões o seguem. Cultivadores são cobiçados por ambos os lados, e a guerra se aproxima de onde você mora.',
    choices: [
      { text: 'Apoiar o general rebelde.', check: { stat: ['fis', 'esp', 'car'], dif: 3, tag: 'combate' }, ok: { text: 'A rebelião vence. O governador cai, e o general o recompensa com ouro e respeito. O custo humano pesa, mas o povo respira.', fx: { fama: 12, pedras: 120, karma: 4, ferida: 1 } }, fail: { text: 'A rebelião é esmagada. Você escapa por pouco, com marcas de batalha e culpa.', fx: { ferida: 3, fama: -4, karma: -2 } } },
      { text: 'Proteger os civis e não tomar lado.', res: { text: 'Você abre as portas de uma casa de refúgio. Aldeões de ambos os lados passam por ela, e nenhum esquece.', fx: { karma: 12, fama: 5, stats: { dao: 2, car: 1 } } } },
      { text: 'Sair do reino enquanto a guerra durar.', res: { text: 'A guerra passa sem você. A distância é uma forma de prudência, e de culpa.', fx: { karma: -3, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'torneio_mortal', title: 'O Torneio de Artes Marciais Mortais', rarity: 'comum', cooldown: 30,
    cond: { tierMin: 1, tierMax: 3, local: ['cidade', 'vilarejo'] },
    text: 'Um grande torneio entre guerreiros mortais, sem qualquer Qi, acontece na praça central. Prêmios altos, plateia enorme. Você poderia vencer facilmente, mas isso não seria justo.',
    choices: [
      { text: 'Participar sem usar Qi.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Você vence com técnica pura. A plateia ruge, e você sai com uma lembrança clara de que luta não se resume a poder.', fx: { tecnica: ['passo_jianghu'], fama: 6, pedras: 30, stats: { fis: 1, dao: 1 } } }, fail: { text: 'Sem o Qi, você perde para um guerreiro mortal mais experiente. A humildade é um bom professor.', fx: { fama: 1, stats: { dao: 2 } } } },
      { text: 'Usar o Qi e vencer sem esforço.', res: { text: 'Você vence com um sopro. A plateia se cala, assustada, e o prêmio tem sabor de vergonha.', fx: { pedras: 50, fama: -3, karma: -4 } } },
      { text: 'Apenas assistir.', res: { text: 'Cada luta é uma pequena história. Você aprende a ler corpos e intenções.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'guilda_mercadores', title: 'A Guilda dos Mercadores', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 1, tierMax: 6, local: ['cidade'], pedrasMin: 40 },
    text: 'A Guilda de Mercadores propõe uma sociedade: você garante a segurança das caravanas com seu nome e sua presença, e recebe uma parte dos lucros.',
    choices: [
      { text: 'Aceitar a sociedade.', res: { text: 'Caravanas atravessam o reino sob o seu estandarte. As moedas chegam em ondas regulares, e as perguntas também.', fx: { pedras: 80, fama: 3, stats: { car: 1 } } } },
      { text: 'Recusar: não quer negócios.', res: { text: 'Os mercadores sorriem sem humor. "Ouro paga quem pede, não quem recusa."', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'irmaos_jurados', title: 'Irmãos de Juramento', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 5 },
    text: 'Numa estalagem, você e um viajante enfrentam juntos uma emboscada. Ao fim, ensanguentados e rindo, ele propõe: "Vamos beber o vinho do juramento. Irmãos, para o resto da vida."',
    choices: [
      { text: 'Jurar irmandade, dividindo o vinho.', res: { text: 'Duas taças erguidas, um brinde forte. A promessa é solene e impossível de quebrar sem perder algo de si.', fx: { setFlags: ['irmao_jurado'], karma: 4, stats: { car: 1, dao: 1 }, agenda: [{ event: 'irmao_pede_ajuda', em: [12, 30] }] } } },
      { text: 'Agradecer, mas recusar o juramento.', res: { text: 'O viajante concorda, sem mágoa. "Nem todos nascem para ser irmãos."', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'irmao_pede_ajuda', title: 'O Irmão Jurado Pede Ajuda', rarity: 'raro', once: true,
    cond: { flags: ['irmao_jurado'] },
    text: 'Seu irmão jurado chega ensanguentado à sua porta, perseguido por uma seita poderosa. "Preciso de refúgio. E talvez de uma luta que não possa vencer sozinho."',
    choices: [
      { text: 'Protegê-lo contra a seita.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'Você e ele lutam lado a lado e derrubam os perseguidores. O juramento é selado com sangue e riso.', fx: { fama: 10, karma: 8, stats: { dao: 2, fis: 1 }, pedras: 40 } }, fail: { text: 'Vocês escapam, feridos e juntos. A seita não esquece.', fx: { ferida: 3, karma: 6, stats: { dao: 2 } } } },
      { text: 'Negociar a paz com a seita.', check: { stat: ['car', 'comp'], dif: 3 }, ok: { text: 'Com paciência e algumas concessões, a seita recua. Seu irmão chora de alívio.', fx: { fama: 6, karma: 6, stats: { car: 2 } } }, fail: { text: 'A negociação fracassa. Vocês fogem por três reinos.', fx: { anos: 1, ferida: 1, stats: { dao: 1 } } } },
      { text: 'Entregá-lo e salvar a própria pele.', res: { text: 'Ele olha para você sem raiva. "Eu entendo." A culpa o acompanha por séculos.', fx: { karma: -22, stats: { dao: -3 }, corr: 8, fama: -8 } } },
    ],
  },
  {
    id: 'fome_no_reino', title: 'A Fome nos Campos', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 2, tierMax: 7 },
    text: 'Duas colheitas perdidas seguidas. Cidades inteiras racionam grãos. Seu poder poderia fazer a terra florescer, mas exigiria um mês de cultivo no campo, longe do seu caminho.',
    choices: [
      { text: 'Gastar um mês fertilizando os campos com seu Qi.', check: { stat: ['esp', 'comp'], dif: 2 }, ok: { text: 'O trigo cresce em ondas. Nunca houve colheita tão farta. A gratidão do povo é muda e calorosa.', fx: { item: ['arroz_espiritual'], karma: 14, fama: 6, stats: { dao: 2 } } }, fail: { text: 'O esforço é grande, o resultado, médio. A fome diminui, e você fica esgotado.', fx: { karma: 6, ferida: 1 } } },
      { text: 'Doar pedras para comprar grãos de outros reinos (60 pedras).', custo: 60, res: { text: 'Caravanas chegam com sacas de arroz. A solução é fria, mas salva vidas.', fx: { karma: 8, fama: 3 } } },
      { text: 'Seguir viagem, sem se envolver.', res: { text: 'Cada reino com seus problemas. Você dorme, e acorda ouvindo vozes.', fx: { karma: -5, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'cavaleiro_andante', title: 'O Cavaleiro Andante', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 1, tierMax: 5 },
    text: 'Um cavaleiro de capa gasta e espada simples vaga pelo reino, ajudando quem precisa. Ele cruza seu caminho e propõe um duelo amigável: "Quero conhecer o tamanho do seu coração."',
    choices: [
      { text: 'Aceitar o duelo de coração.', check: { stat: ['dao', 'car'], dif: 1 }, ok: { text: 'No fim, ambos riem, suados. O cavaleiro lhe entrega um manual e uma frase: "Siga ajudando."', fx: { item: ['manual_passo_garca'], karma: 4, stats: { dao: 1, car: 1 } } }, fail: { text: 'O duelo é um empate frustrado. Vocês parecem querer coisas diferentes.', fx: { stats: { dao: 1 } } } },
      { text: 'Recusar: não vê graça em duelos.', res: { text: 'O cavaleiro assente, sem ofensa. "Ainda nos veremos."', fx: {} } },
    ],
  },
  {
    id: 'juiz_do_vilarejo', title: 'O Juiz do Vilarejo', rarity: 'comum', cooldown: 40,
    cond: { tierMin: 1, tierMax: 6, local: ['vilarejo', 'cidade'] },
    text: 'Dois vizinhos disputam uma colheita. Cada um jura ser o dono, ambos choram, e o juiz local, nervoso diante de um cultivador, pede sua opinião.',
    choices: [
      { text: 'Investigar com paciência e decidir.', check: { stat: ['comp', 'dao'], dif: 1 }, ok: { text: 'A verdade vem à tona. Um dos dois mentia, e a justiça é feita sem violência.', fx: { karma: 6, fama: 3, stats: { comp: 1 } } }, fail: { text: 'Você decide, mas erra. Um dos dois sai injustiçado, e você descobre isso tarde demais.', fx: { karma: -3, stats: { dao: 1 } } } },
      { text: 'Dividir a colheita entre os dois, sem investigar.', res: { text: 'Nenhum fica satisfeito, nenhum protesta. O juiz agradece o pragmatismo.', fx: { stats: { car: 1 } } } },
    ],
  },
  {
    id: 'vila_homenagem', title: 'O Santuário da Vila', rarity: 'raro', once: true,
    cond: { tierMin: 3, origin: ['campones', 'cacador', 'pescador_mares', 'filho_guarda'], fameMin: 20 },
    text: 'Ao retornar a {vila}, você encontra uma capela simples, com seu nome gravado numa pedra. Aldeões acendem incenso diante dela, cada vez que alguém fica doente. Os mais jovens o chamam de santo.',
    choices: [
      { text: 'Aceitar a homenagem com humildade.', res: { text: 'Você acende um incenso ao lado do povo. Algo se aquece em seu peito, e algo se aperta.', fx: { karma: 8, fama: 6, stats: { dao: 2 } } } },
      { text: 'Pedir que a capela seja dedicada a todos os que ajudaram.', res: { text: 'A vila sorri. A pedra ganha mais nomes, e o templo, mais sentido.', fx: { karma: 12, stats: { dao: 3, car: 1 } } } },
    ],
  },
  {
    id: 'mendigos_informantes', title: 'A Rede dos Mendigos', rarity: 'raro', once: true,
    cond: { tierMin: 1, tierMax: 5, local: ['cidade'] },
    text: 'Um mendigo de olhos espertos cochicha nos becos: "Quem alimenta os que ninguém vê, ouve o que ninguém diz. Tenho uma rede, e posso trocá-la por favores."',
    choices: [
      { text: 'Aceitar a aliança com a rede de mendigos.', res: { text: 'Em semanas, você sabe quem está chegando e quem está partindo. Informação, afinal, vale mais que pedras.', fx: { setFlags: ['rede_mendigos'], stats: { comp: 1, sor: 1 }, karma: 3 } } },
      { text: 'Recusar: o submundo dá dívidas demais.', res: { text: 'O mendigo dá de ombros e some em um beco.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'bandidos_da_mina', title: 'A Mina dos Prisioneiros', rarity: 'raro', cooldown: 80,
    cond: { tierMin: 2, tierMax: 7 },
    text: 'Numa mina esquecida, centenas de mortais trabalham como escravos para uma facção de cultivadores desalmados. Seus gritos chegam ao vale, e ninguém na região ousa agir.',
    choices: [
      { text: 'Libertar os prisioneiros à força.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'A mina cai em horas. Centenas de pessoas choram na luz do dia. Seu nome ecoa pela região.', fx: { fama: 18, karma: 16, pedras: 100, stats: { dao: 2 }, ferida: 2 } }, fail: { text: 'Você liberta alguns, mas os guardas contra-atacam. Você foge, ferido, com a lembrança dos que ficaram.', fx: { ferida: 4, karma: 6, stats: { dao: 1 } } } },
      { text: 'Denunciar a mina às autoridades do reino.', check: { stat: ['car', 'comp'], dif: 3 }, ok: { text: 'A denúncia chega à corte, e um exército imperial limpa a região. A justiça tarda, mas vem.', fx: { fama: 8, karma: 10 } }, fail: { text: 'A denúncia é ignorada. Você repete, com raiva crescente.', fx: { stats: { dao: 1 } } } },
      { text: 'Fingir que não viu.', res: { text: 'O sol se põe, os gritos continuam. Você parte com um peso permanente nas costas.', fx: { karma: -10, stats: { dao: -2 }, corr: 3 } } },
    ],
  },
  {
    id: 'dinastia_cai', title: 'A Queda da Dinastia', rarity: 'lendario', once: true,
    cond: { tierMin: 4 },
    text: 'Uma dinastia de oito séculos desmorona: cultivadores traíram o trono, e as seitas lutam entre si por pedaços do império. Mortais fogem em milhares. A queda pode ser evitada por quem tiver poder e coragem.',
    choices: [
      { text: 'Intervir e proteger a linhagem imperial.', check: { stat: ['fis', 'esp', 'car', 'dao'], dif: 6, tag: 'combate' }, ok: { text: 'Você derrota os traidores e restaura o trono. O império é grato, e sua fama alcança lugares onde ninguém falou seu nome.', fx: { fama: 30, karma: 20, pedras: 500, stats: { dao: 3, car: 2 }, ferida: 2 } }, fail: { text: 'A dinastia cai mesmo assim. Você salva a criança herdeira e foge por cem estradas.', fx: { fama: 8, karma: 14, ferida: 4, stats: { dao: 2 } } } },
      { text: 'Assistir à queda como uma lição de impermanência.', res: { text: 'Você vê um império ruir sem erguer um dedo. A lição é fria, verdadeira e custosa.', fx: { stats: { dao: 3, comp: 1 }, karma: -6 } } },
    ],
  },
];
