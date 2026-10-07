import type { GameEvent } from '../../types';
import type { Molde } from '../opcoes';

/**
 * Lote 26 — Talentos. Cada talento muda a run de forma reconhecível:
 * 4 eventos próprios (despertar, oportunidade, cobiça, ápice), opções exclusivas injetadas em eventos comuns
 * (moldes) e um final que só ele abre. As flags gravadas pelos moldes são lidas pelos eventos do próprio talento.
 */
const T = (t: string, min = 1, max = 8, extra: Record<string, unknown> = {}) => ({ talent: [t], tierMin: min, tierMax: max, ...extra });

export const lote26Talentos: GameEvent[] = [
  /* ================= MEMÓRIA PERFEITA ================= */
  {
    id: 'tl_mem_1', title: 'O Teste dos Mil Caracteres', rarity: 'comum', once: true, weight: 2.5, cond: T('memoria_perfeita', 1, 3),
    text: 'Um mestre cego estende um rolo com mil caracteres que você nunca viu e pede: "Leia uma vez. Depois, recite." Os outros discípulos riem baixinho. Você sente cada traço ficar gravado, como se a página tivesse sido talhada por dentro dos olhos.',
    choices: [
      { text: 'Recitar o rolo inteiro, sem errar uma pausa.', res: { text: 'O silêncio é tão longo que alguém tosse. O mestre sorri: "Poucos nascem assim, e quase todos sofrem por isso." Seu nome passa a ser dito em voz baixa.', fx: { setFlags: ['t_mp_prodigio'], fama: 6, stats: { comp: 2 }, agenda: [{ event: 'tl_mem_2', em: [4, 9] }] } } },
      { text: 'Recitar só metade e fingir que esqueceu o resto.', res: { text: 'Você aprende, cedo, que lembrar demais assusta as pessoas. O mestre percebe o truque e não diz nada.', fx: { setFlags: ['t_mp_segredo'], stats: { comp: 1, dao: 1 }, agenda: [{ event: 'tl_mem_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_mem_2', title: 'O Manual Que Você Só Viu Uma Vez', rarity: 'raro', once: true, weight: 0, cond: T('memoria_perfeita', 1, 6),
    text: 'Há anos, numa biblioteca, você folheou por um minuto um manual proibido. Hoje, uma seita desesperada oferece uma fortuna por qualquer fragmento dele. Só você tem a página inteira na cabeça, e ninguém sabe disso.',
    choices: [
      { text: 'Reproduzir o manual e treinar o método em segredo.', cond: { talent: ['memoria_perfeita'] }, res: { text: 'Três semanas de escrita, três de prática. O método se torna seu, e a seita nunca saberá que existe uma cópia.', fx: {  setFlags: ['t_mp_copiou_proibido'], karma: -3, stats: { comp: 1 } } } },
      { text: 'Vender uma cópia parcial à seita.', res: { text: 'A bolsa é pesada, e a cópia é boa o bastante para enganar. A seita cresce com ela, e você ganha uma credora satisfeita.', fx: { pedras: 160, setFlags: ['t_mp_vendeu_copia'], agenda: [{ event: 'tl_mem_3', em: [8, 18] }] } } },
      { text: 'Recitar o manual para a seita, de graça, para que ninguém o monopolize.', res: { text: 'A seita chora. O manual circula, o método se espalha, e o mundo ganha um pouco mais de gente capaz. Sua fama de generoso viaja mais que o texto.', fx: { karma: 9, fama: 10, setFlags: ['t_mp_doou_saber'], agenda: [{ event: 'tl_mem_3', em: [8, 18] }] } } },
    ],
  },
  {
    id: 'tl_mem_3', title: 'Quem Cobra a Página', rarity: 'raro', once: true, weight: 0, cond: T('memoria_perfeita', 2, 7),
    text: 'Anos depois, um emissário bate à sua porta. Alguém descobriu que você guarda, na memória, o que nenhuma biblioteca guarda. Querem a sua cabeça como arquivo: de uma forma gentil, ou de outra.',
    choices: [
      { text: 'Aceitar o posto de Arquivista Vivo da seita.', res: { text: 'A seita lhe dá um pavilhão e uma ala inteira de pergaminhos. Você nunca mais esquece o que lê, nem por quem foi pago.', fx: { setFlags: ['t_mp_arquivista'], pedras: 200, fama: 8, stats: { comp: 2 } } } },
      { text: 'Recusar e esconder o que sabe.', cond: { flags: ['t_mp_vendeu_copia'] }, res: { text: 'A seita que você enganou percebe a trapaça e passa a vigiar seus passos. Lembrar demais, às vezes, é uma dívida.', fx: { setFlags: ['inimigo_secreto'], karma: -2, stats: { dao: 1 } } } },
      { text: 'Recusar: o saber não é de ninguém.', cond: { flags: ['t_mp_doou_saber'] }, res: { text: 'O emissário baixa a cabeça. Quem já deu o saber de graça não pode ser comprado, e todos entendem.', fx: { karma: 5, fama: 6, stats: { dao: 2 } } } },
      { text: 'Fugir antes que cheguem a conclusões piores.', res: { text: 'Você muda de cidade, de nome, de sotaque. A memória não muda, e isso o denuncia mais do que qualquer rosto.', fx: { stats: { sor: 1 }, fama: -3 } } },
    ],
  },
  {
    id: 'tl_mem_4', title: 'A Última Página', rarity: 'lendario', once: true, weight: 1.6, cond: T('memoria_perfeita', 4, 8),
    text: 'Depois de séculos lendo, você carrega, dentro de si, uma biblioteca maior que a de qualquer seita. A morte, um dia, a apagará. Resta decidir o que fazer com tantas páginas antes disso.',
    choices: [
      { text: 'Escrever a Biblioteca Viva: ditar tudo a discípulos, até o último sopro.', cond: { talent: ['memoria_perfeita'] }, res: { text: 'Dez anos de ditado. Quando você cala, existem cem cópias de cada livro que já leu, e o mundo ganha uma era de aprendizes.', fx: { fim: 'lenda_memoria' } } },
      { text: 'Guardar tudo e seguir viajando.', res: { text: 'As páginas continuam com você, e o peso é doce. Alguns segredos são melhores quando só um os carrega.', fx: { stats: { comp: 2, dao: 2 } } } },
    ],
  },

  /* ================= FAVORECIDO PELO DESTINO ================= */
  {
    id: 'tl_sor_1', title: 'A Moeda Que Sempre Cai do Seu Lado', rarity: 'comum', once: true, weight: 2.5, cond: T('sorte_destino', 1, 3),
    text: 'Pela terceira vez no mês, o jogo de azar da taverna termina a seu favor. Um velho jogador cola o rosto ao seu e sussurra: "Isso não é sorte, rapaz. É dívida. O Destino adianta aos favoritos e cobra no fim."',
    choices: [
      { text: 'Rir e continuar jogando: dívida é problema de amanhã.', res: { text: 'A bolsa engorda e a noite é longa. Em algum lugar, algo anota um valor ao lado do seu nome.', fx: { pedras: 70, setFlags: ['t_sd_deve_ao_destino'], agenda: [{ event: 'tl_sor_2', em: [5, 12] }] } } },
      { text: 'Parar na hora e devolver parte do lucro aos perdedores.', res: { text: 'O velho ergue uma sobrancelha. "Pagar adiantado é raro." A sorte, a partir daí, parece mais leve, e menos exigente.', fx: { karma: 5, setFlags: ['t_sd_pagou_antes'], stats: { dao: 1, sor: 1 }, agenda: [{ event: 'tl_sor_2', em: [5, 12] }] } } },
    ],
  },
  {
    id: 'tl_sor_2', title: 'O Dia em Que a Sorte Cobrou', rarity: 'raro', once: true, weight: 0, cond: T('sorte_destino', 1, 6),
    text: 'Numa semana, tudo dá errado de um jeito perfeito: a ponte cai, o amigo some, a bolsa é roubada. Você entende que a sorte, de fato, não é de graça. A questão é como pagar.',
    choices: [
      { text: 'Aceitar a perda sem revolta.', cond: { flags: ['t_sd_pagou_antes'] }, res: { text: 'A semana é dura, e curta. A sorte, satisfeita por quem paga sem reclamar, devolve em dobro algumas luas depois.', fx: { stats: { dao: 2, sor: 1 }, setFlags: ['t_sd_equilibrio'], agenda: [{ event: 'tl_sor_3', em: [10, 20] }] } } },
      { text: 'Lutar contra o azar com todas as forças.', check: { stat: ['dao', 'sor'], dif: 1 }, ok: { text: 'Você vira a semana do avesso, recuperando metade do que perdeu e aprendendo o preço do resto.', fx: { stats: { dao: 1 }, pedras: -40, agenda: [{ event: 'tl_sor_3', em: [10, 20] }] } }, fail: { text: 'A dívida cobra juros: ferimentos, perdas, uma amizade que não volta.', fx: { ferida: 2, pedras: -90, karma: -2, agenda: [{ event: 'tl_sor_3', em: [10, 20] }] } } },
      { text: 'Culpar os outros e se isolar.', cond: { flags: ['t_sd_deve_ao_destino'] }, res: { text: 'Você se afasta, amargo. A dívida só cresce quando é ignorada.', fx: { setFlags: ['t_sd_azedou'], stats: { sor: -2 }, karma: -3, agenda: [{ event: 'tl_sor_3', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'tl_sor_3', title: 'A Aposta Contra o Céu', rarity: 'raro', once: true, weight: 0, cond: T('sorte_destino', 2, 7),
    text: 'Uma figura de máscara dourada senta-se em frente a você numa mesa de jogo fora do mundo e embaralha um baralho de estrelas. "Uma rodada", diz. "Se vencer, o Destino perdoa o que deve. Se perder, ele cobra tudo de uma vez."',
    choices: [
      { text: 'Apostar: confiar na própria sorte.', check: { stat: 'sor', dif: 2 }, ok: { text: 'As estrelas caem a seu favor. O Destino ri, abaixa a máscara e mostra um rosto parecido com o seu. "Está quite", diz, "por ora."', fx: { setFlags: ['t_sd_quite'], stats: { sor: 3, dao: 1 }, fama: 6 } }, fail: { text: 'A carta final vira com uma lentidão cruel. Tudo o que a sorte adiantou volta de uma vez.', fx: { ferida: 3, pedras: -200, stats: { sor: -3 } } } },
      { text: 'Recusar e pagar a dívida do jeito difícil.', res: { text: 'Anos de pequenas perdas, de ajuda sem retorno, de mão estendida. Quando acaba, a sorte volta, mais calma, e sem juros.', fx: { setFlags: ['t_sd_quite'], karma: 8, stats: { dao: 3 }, anos: 3 } } },
    ],
  },
  {
    id: 'tl_sor_4', title: 'O Dia Sem Dívida', rarity: 'lendario', once: true, weight: 1.6, cond: T('sorte_destino', 4, 8, { flags: ['t_sd_quite'] }),
    text: 'Pela primeira vez em séculos, você acorda sem sentir o peso de algo devido. O Destino, sem cobrança, abre uma porta aberta: a de viver como quiser, com a sorte de quem não deve mais nada.',
    choices: [
      { text: 'Viver como Mestre da Boa Sorte: espalhar prosperidade por onde passar.', res: { text: 'Em cada vila que você visita, colheitas melhoram e doentes se curam. Você nunca explica por quê, e ninguém precisa saber.', fx: { fim: 'lenda_sorte' } } },
      { text: 'Seguir no caminho, agora sem dívida.', res: { text: 'A sorte continua amiga, e discreta. Você aprende o valor de uma vida sem cobrança.', fx: { stats: { sor: 2, dao: 2 } } } },
    ],
  },

  /* ================= ALMA ANTIGA ================= */
  {
    id: 'tl_alm_1', title: 'A Voz Que Fala Dentro do Silêncio', rarity: 'comum', once: true, weight: 2.5, cond: T('alma_antiga', 1, 3),
    text: 'Em meditação, algo mais velho que o seu corpo se mexe no fundo da sua consciência. Uma voz sem idade murmura palavras que você não conhece, mas entende: "Acorda. Já fomos mais do que isso."',
    choices: [
      { text: 'Ouvir a voz sem resistir.', res: { text: 'Imagens de templos, de guerras, de uma cidade de jade passam por você. Quando acaba, você sabe uma respiração que nunca aprendeu.', fx: { setFlags: ['t_aa_ouviu'],  stats: { esp: 2 }, agenda: [{ event: 'tl_alm_2', em: [4, 9] }] } } },
      { text: 'Mandar a voz calar: esta vida é sua.', res: { text: 'A voz se cala, mas deixa uma pontada de saudade. Você sente que, um dia, ela voltará, e com mais força.', fx: { setFlags: ['t_aa_calou'], stats: { dao: 2 }, agenda: [{ event: 'tl_alm_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_alm_2', title: 'O Templo Que Você Reconhece', rarity: 'raro', once: true, weight: 0, cond: T('alma_antiga', 1, 6),
    text: 'Numa viagem, você chega a ruínas de um templo que nunca viu, e sabe onde fica cada sala. Seus pés o levam a uma câmara lacrada. O selo da porta responde ao seu Qi como a um velho conhecido.',
    choices: [
      { text: 'Abrir a câmara com a memória da alma.', cond: { flags: ['t_aa_ouviu'] }, check: { stat: ['esp', 'dao'], dif: 1, tag: 'mente' }, ok: { text: 'Dentro, um altar e um espelho de bronze com o seu rosto de outra era. Você sai com a lição do que foi, e do que não precisa ser de novo.', fx: { item: ['espelho_bronze'], setFlags: ['t_aa_templo'], stats: { esp: 2, dao: 2 }, agenda: [{ event: 'tl_alm_3', em: [10, 20] }] } }, fail: { text: 'A porta responde, mas a sua alma cede: uma enxurrada de memórias alheias quase o afoga.', fx: { ferida: 2, corr: 3, setFlags: ['t_aa_templo'], agenda: [{ event: 'tl_alm_3', em: [10, 20] }] } } },
      { text: 'Deixar a câmara fechada e seguir viagem.', res: { text: 'Você sai do templo sem olhar para trás. Alguns passados são melhores vivendo trancados.', fx: { stats: { dao: 2 }, agenda: [{ event: 'tl_alm_3', em: [10, 20] }] } } },
      { text: 'Pedir ao selo que reconheça quem você é agora, não quem foi.', cond: { flags: ['t_aa_calou'] }, res: { text: 'O selo hesita, e abre com um estalo suave. Dentro, só uma carta: "Bem-vindo a uma vida nova." Você chora sem entender por quê.', fx: { setFlags: ['t_aa_templo'], karma: 4, stats: { dao: 3 }, agenda: [{ event: 'tl_alm_3', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'tl_alm_3', title: 'Os Herdeiros da Vida Passada', rarity: 'raro', once: true, weight: 0, cond: T('alma_antiga', 2, 7),
    text: 'Uma seita antiga, que você já liderou, reconhece o seu Qi, e manda mensageiros: querem a sua volta como líder. Outra seita, que a destruiu, também reconhece, e manda assassinos.',
    choices: [
      { text: 'Assumir a liderança da seita antiga.', res: { text: 'Os velhos da seita choram ao ver você. Em um ano, o templo está cheio de novatos. Os assassinos do outro lado ainda esperam por você.', fx: { setFlags: ['t_aa_lider', 'inimigo_secreto'], fama: 12, stats: { car: 2, dao: 1 }, faccao: 'seita' } } },
      { text: 'Recusar ambas e cortar os laços do passado.', res: { text: 'Você parte sem olhar para trás. Nenhum lado o perdoa, e você aceita ser um estranho no próprio passado.', fx: { karma: 2, stats: { dao: 3 }, setFlags: ['t_aa_recusou'] } } },
      { text: 'Confrontar os assassinos com a memória dos erros da sua vida passada.', check: { stat: ['esp', 'dao', 'car'], dif: 2, tag: 'mente' }, ok: { text: 'Sua voz soa como a de uma época inteira. Os assassinos largam as lâminas, e o ódio de séculos tem fim.', fx: { setFlags: ['t_aa_perdoou_passado'], karma: 10, fama: 10, stats: { dao: 3 } } }, fail: { text: 'Os assassinos hesitam, mas atacam. Você escapa com cicatrizes que não pertencem a esta vida.', fx: { ferida: 3, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tl_alm_4', title: 'O Fim do Ciclo da Alma', rarity: 'lendario', once: true, weight: 1.6, cond: T('alma_antiga', 4, 8),
    text: 'Sua alma antiga alcança a idade em que recorda todas as vidas. Diante de você, um caminho: encerrar o ciclo de reencarnações, descansando de vez, ou deixá-lo continuar, carregando tudo de novo.',
    choices: [
      { text: 'Encerrar o ciclo: dissolver a alma antiga no Qi do mundo.', cond: { talent: ['alma_antiga'] }, res: { text: 'Você se deita numa colina, e lembra tudo, uma vez, de uma vez. Quando a memória acaba, o ciclo acaba com ela, e o mundo ganha uma brisa nova.', fx: { fim: 'lenda_alma' } } },
      { text: 'Deixar o ciclo continuar.', res: { text: 'A alma volta a se enrolar sobre si. Você sorri: haverá outra vida, e outra, e você estará lá.', fx: { stats: { esp: 2, dao: 3 } } } },
    ],
  },

  /* ================= CORPO RESISTENTE ================= */
  {
    id: 'tl_cor_1', title: 'O Peso Que Ninguém Mais Levantou', rarity: 'comum', once: true, weight: 2.5, cond: T('corpo_resistente', 1, 3),
    text: 'No pátio, uma pedra de moer arroz, pesada como um boi, sempre foi deixada ali porque ninguém consegue erguê-la. Hoje, de brincadeira, você a levanta acima da cabeça. O pátio inteiro fica em silêncio.',
    choices: [
      { text: 'Carregar a pedra até o portão, diante de todos.', res: { text: 'Os músculos queimam e a plateia aplaude. Os instrutores passam a testá-lo em tudo, e você nunca mais pode dizer que não aguenta.', fx: { setFlags: ['t_cr_forte_publico'], fama: 6, stats: { fis: 2 }, agenda: [{ event: 'tl_cor_2', em: [4, 9] }] } } },
      { text: 'Largar a pedra e fingir que foi sorte.', res: { text: 'Você aprende a esconder a força, para não virar ferramenta. O segredo pesa, mas protege.', fx: { setFlags: ['t_cr_forte_oculto'], stats: { fis: 1, dao: 1 }, agenda: [{ event: 'tl_cor_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_cor_2', title: 'O Que Aguentar Custa', rarity: 'raro', once: true, weight: 0, cond: T('corpo_resistente', 1, 6),
    text: 'Um mestre de corpo oferece a prova do Banho Fervente: sete dias em uma tina de água espiritual a ponto de ebulição. Para um corpo comum, é morte. Para o seu, é um convite. O preço da prova é a pele nova que dói em qualquer toque por meses.',
    choices: [
      { text: 'Aceitar a prova completa.', check: { stat: ['fis', 'dao'], dif: 1, tag: 'corpo' }, ok: { text: 'Sete dias de dor, e a pele sai da água como bronze polido. Você quase não sente mais o frio, nem os golpes.', fx: { setFlags: ['t_cr_banho'], stats: { fis: 3 }, vida: 20, ferida: 1, agenda: [{ event: 'tl_cor_3', em: [8, 16] }] } }, fail: { text: 'No quinto dia a tina vence. Você sai com queimaduras profundas e a convicção de que há limites mesmo para você.', fx: { ferida: 3, stats: { fis: 1, dao: 1 }, agenda: [{ event: 'tl_cor_3', em: [8, 16] }] } } },
      { text: 'Recusar: ser forte já basta.', res: { text: 'O mestre assente. Anos depois, você vai se perguntar o que seria de você com a pele de bronze, e vai concluir que escolheu uma paz diferente.', fx: { stats: { dao: 2 }, agenda: [{ event: 'tl_cor_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'tl_cor_3', title: 'Quem Contrata um Corpo Assim', rarity: 'raro', once: true, weight: 0, cond: T('corpo_resistente', 2, 7),
    text: 'Um senhor de armas, um capitão de muralha e uma seita de guarda-costas oferecem posto para quem aguenta o que você aguenta. Cada um paga de um jeito, e cada um espera um tipo diferente de obediência.',
    choices: [
      { text: 'Tornar-se a muralha do senhor de armas.', res: { text: 'Você fica entre ele e qualquer perigo. A paga é boa, e a lealdade vira corrente.', fx: { setFlags: ['t_cr_muralha'], pedras: 220, fama: 6, karma: -1, agenda: [{ event: 'tl_cor_4', em: [10, 22] }] } } },
      { text: 'Defender uma vila sitiada, sem pagamento.', res: { text: 'Sete dias de cerco, sete noites de pé. Quando os bandidos recuam, a vila inteira dorme à sua volta.', fx: { setFlags: ['t_cr_defensor'], karma: 10, fama: 8, ferida: 1, agenda: [{ event: 'tl_cor_4', em: [10, 22] }] } } },
      { text: 'Recusar todos e seguir sozinho.', res: { text: 'Corpos fortes atraem propostas, e você se cansa de todas. A estrada é um bom lugar para um corpo que não quer dono.', fx: { stats: { dao: 2, sor: 1 }, agenda: [{ event: 'tl_cor_4', em: [10, 22] }] } } },
    ],
  },
  {
    id: 'tl_cor_4', title: 'O Corpo Que Virou Montanha', rarity: 'lendario', once: true, weight: 1.6, cond: T('corpo_resistente', 4, 8),
    text: 'Seu corpo já aguentou raios, lâminas, séculos. Um velho monge de pedra diz que o corpo pode virar, um dia, um monumento: ficar de pé, imóvel, aguentando o mundo por mil anos, como uma montanha que respira.',
    choices: [
      { text: 'Tornar-se a Montanha Que Respira: ficar de pé, imóvel, guardando um vale.', cond: { talent: ['corpo_resistente'] }, res: { text: 'Você se planta num desfiladeiro e deixa o tempo passar. Cem anos depois, os viajantes dizem que a montanha, às vezes, suspira.', fx: { fim: 'lenda_corpo' } } },
      { text: 'Seguir andando: montanha que anda vale mais.', res: { text: 'Você guarda a ideia. Corpo bom é o que se move.', fx: { stats: { fis: 3, dao: 2 } } } },
    ],
  },

  /* ================= PRESENÇA MAGNÉTICA ================= */
  {
    id: 'tl_car_1', title: 'Todos Param Quando Você Entra', rarity: 'comum', once: true, weight: 2.5, cond: T('carisma_nato', 1, 3),
    text: 'Numa taverna cheia de desconhecidos, você entra e a conversa baixa. Alguém lhe oferece uma cadeira, outro paga uma bebida. Em uma hora, metade do salão conta histórias a você. Em algum canto, alguém anota o que você diz.',
    choices: [
      { text: 'Aproveitar a atenção e fazer amigos úteis.', res: { text: 'Você sai com três promessas de ajuda e uma carta de apresentação. As pessoas querem estar perto de você, e você aprende o valor disso.', fx: { setFlags: ['t_pm_rede'], fama: 5, stats: { car: 2 }, agenda: [{ event: 'tl_car_2', em: [4, 9] }] } } },
      { text: 'Sair discretamente: atenção é perigosa.', res: { text: 'Você escapa pela porta dos fundos. Alguns se sentem enganados; outros, curiosos. Um deles vai procurá-lo.', fx: { setFlags: ['t_pm_recluso'], stats: { dao: 1, sor: 1 }, agenda: [{ event: 'tl_car_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_car_2', title: 'O Discípulo Que Veio por Você', rarity: 'raro', once: true, weight: 0, cond: T('carisma_nato', 1, 6),
    text: 'Um jovem de olhar febril diz que atravessou três províncias só para estar perto de você. Não quer ensino, quer presença. Aos poucos, outros chegam, e sem querer, você tem um séquito.',
    choices: [
      { text: 'Aceitar o séquito e liderá-lo.', cond: { flags: ['t_pm_rede'] }, res: { text: 'Em três anos, cem pessoas dependem da sua palavra. Você descobre que liderar não é um dom: é um peso, e um poder.', fx: { setFlags: ['t_pm_seguidores'], fama: 10, stats: { car: 2 }, agenda: [{ event: 'tl_car_3', em: [8, 16] }] } } },
      { text: 'Mandá-los embora: ninguém deve seguir ninguém.', res: { text: 'Alguns obedecem; outros, magoados, o chamam de arrogante. A solidão é uma escolha com preço.', fx: { karma: 2, stats: { dao: 2 }, agenda: [{ event: 'tl_car_3', em: [8, 16] }] } } },
      { text: 'Usar o séquito para uma causa justa.', cond: { flags: ['t_pm_recluso'] }, res: { text: 'Você os guia a ajudar aldeias esquecidas. A devoção deles ganha propósito, e a sua, humildade.', fx: { setFlags: ['t_pm_seguidores'], karma: 8, fama: 6, stats: { car: 1, dao: 1 }, agenda: [{ event: 'tl_car_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'tl_car_3', title: 'O Preço de Ser Amado', rarity: 'raro', once: true, weight: 0, cond: T('carisma_nato', 2, 7),
    text: 'Seus seguidores esperam algo de você: respostas, milagres, decisões sobre suas vidas. Um deles pede que você decida se deve se casar; outro, se deve vingar o pai. Todos ouvem a sua palavra como lei.',
    choices: [
      { text: 'Assumir o papel de mestre: decidir por eles.', cond: { flags: ['t_pm_seguidores'] }, res: { text: 'As decisões saem fáceis, e as consequências, pesadas. Você começa a ser temido além de amado.', fx: { karma: -4, fama: 10, stats: { car: 2 }, setFlags: ['t_pm_tirano_manso'] } } },
      { text: 'Recusar decidir por eles e ensiná-los a pensar.', cond: { flags: ['t_pm_seguidores'] }, res: { text: 'Alguns se afastam, frustrados; outros crescem. Anos depois, eles têm seus próprios discípulos, e você, uma linhagem.', fx: { karma: 8, fama: 6, stats: { dao: 2, car: 1 }, setFlags: ['t_pm_linhagem'] } } },
      { text: 'Fugir à noite, deixando uma carta.', res: { text: 'A carta é longa e gentil. Eles choram, mas aprendem a caminhar. Você carrega a culpa, e a liberdade.', fx: { stats: { dao: 2 }, karma: -1 } } },
    ],
  },
  {
    id: 'tl_car_4', title: 'O Chamado de Mil Vozes', rarity: 'lendario', once: true, weight: 1.6, cond: T('carisma_nato', 4, 8),
    text: 'Uma multidão enorme, de vilas e cidades, pede que você os lidere numa causa: unir os reinos, acabar com uma guerra, fundar uma ordem. Sua voz, sozinha, pode mover exércitos. A escolha é o que fazer com isso.',
    choices: [
      { text: 'Tornar-se a Voz do Povo: liderar a união sem trono, só com palavra.', cond: { talent: ['carisma_nato'] }, res: { text: 'Em dez anos, três guerras se encerram sem sangue. Quando você morre, milhares caminham atrás do seu caixão, e ninguém sabe dizer quem era o seu rei.', fx: { fim: 'lenda_carisma' } } },
      { text: 'Recusar o chamado e voltar à vida simples.', res: { text: 'A multidão se dissolve, decepcionada e livre. Você vive em paz, com a certeza de que poder demais, mesmo de palavra, é um fardo.', fx: { stats: { dao: 3, car: 1 } } } },
    ],
  },

  /* ================= GÊNIO DO CULTIVO ================= */
  {
    id: 'tl_gen_1', title: 'O Qi Que Flui Até no Sono', rarity: 'comum', once: true, weight: 2.5, cond: T('mestre_nato', 1, 3),
    text: 'Acordar de manhã e descobrir que o Qi circulou a noite inteira sem você pedir é, a princípio, uma bênção. Depois você nota que, às vezes, ele sobe em horas erradas: no meio de uma conversa, num banho, numa discussão.',
    choices: [
      { text: 'Aprender a conter o fluxo antes que ele o controle.', check: { stat: ['dao', 'comp'], dif: 0, tag: 'qi' }, ok: { text: 'Em meses, você aprende a dobrar o fluxo, como um rio que se curva. O talento deixa de ser acidente e vira ferramenta.', fx: { setFlags: ['t_gm_controle'], stats: { dao: 2 }, xp: 6, agenda: [{ event: 'tl_gen_2', em: [4, 9] }] } }, fail: { text: 'O fluxo vence algumas vezes. Você aprende às custas de pequenas explosões e olhares assustados.', fx: { stats: { dao: 1 }, ferida: 1, agenda: [{ event: 'tl_gen_2', em: [4, 9] }] } } },
      { text: 'Deixar o Qi fluir à vontade e aproveitar a velocidade.', res: { text: 'O progresso é rápido, e os colegas, assustados. Você é, ao mesmo tempo, o mais promissor e o mais perigoso da sua turma.', fx: { setFlags: ['t_gm_solto'], xp: 10, corr: 2, fama: 4, agenda: [{ event: 'tl_gen_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_gen_2', title: 'O Gargalo Que Não Veio', rarity: 'raro', once: true, weight: 0, cond: T('mestre_nato', 1, 6),
    text: 'Você rompe um gargalo sem nem perceber, enquanto dormia. A seita inteira fala do assunto. Alguns dizem que isso é bênção do Céu; outros, que é sinal de algo antinatural, que cobra um preço.',
    choices: [
      { text: 'Aceitar o elogio e aproveitar o impulso.', res: { text: 'Em poucos meses, você alcança o que levaria anos a outros. A inveja dos pares cresce junto com o seu Qi.', fx: { xp: 10, fama: 6, setFlags: ['t_gm_invejado'], agenda: [{ event: 'tl_gen_3', em: [8, 16] }] } } },
      { text: 'Investigar por que isso acontece, antes de continuar.', check: { stat: ['comp', 'esp'], dif: 1 }, ok: { text: 'Você descobre que o talento tem um ritmo: acelera por estações e descansa por outras. Aprender esse ritmo vale mais que o impulso.', fx: { setFlags: ['t_gm_ritmo'], stats: { comp: 2 }, agenda: [{ event: 'tl_gen_3', em: [8, 16] }] } }, fail: { text: 'A investigação não traz respostas claras, só mais dúvidas. Mas você aprende a ficar atento.', fx: { stats: { comp: 1 }, agenda: [{ event: 'tl_gen_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'tl_gen_3', title: 'A Seita Que Quer Seu Segredo', rarity: 'raro', once: true, weight: 0, cond: T('mestre_nato', 2, 7),
    text: 'Mestres de uma seita rival dizem que vão pagar bem por um "estudo" do seu corpo. Querem entender o talento, e talvez replicá-lo. Outra seita oferece proteção, em troca de exclusividade.',
    choices: [
      { text: 'Aceitar o estudo e a pesquisa.', res: { text: 'Semanas de testes, medições, agulhas. No fim, você recebe uma bolsa e um método novo, e uma pontada de ser tratado como objeto.', fx: { pedras: 180,  karma: -2, stats: { comp: 1 }, setFlags: ['t_gm_estudado'] } } },
      { text: 'Aceitar a proteção da outra seita.', res: { text: 'Você ganha um pavilhão guardado e a promessa de nunca ser estudado. A lealdade, daqui por diante, é exigida.', fx: { faccao: 'seita', setFlags: ['t_gm_protegido'], fama: 6, stats: { dao: 1 } } } },
      { text: 'Recusar ambas e esconder o talento.', res: { text: 'Você passa a cultivar à noite, sem testemunhas. O talento, discreto, ainda rende, e a paz também.', fx: { stats: { dao: 2, sor: 1 }, xp: 4 } } },
    ],
  },
  {
    id: 'tl_gen_4', title: 'O Cultivo Que Não Precisa de Mestre', rarity: 'lendario', once: true, weight: 1.6, cond: T('mestre_nato', 4, 8),
    text: 'Você descobre que, para o seu Qi, cada respiração é uma lição. Sem seita, sem mestre, sem manual, você já supera os que o ensinaram. O Céu parece perguntar: o que você fará de tanto talento?',
    choices: [
      { text: 'Fundar a Escola do Sopro Livre: ensinar quem não tem mestre.', cond: { talent: ['mestre_nato'] }, res: { text: 'Você reúne rejeitados e órfãos sem talento aparente. Em vinte anos, dezenas deles romperam gargalos. Seu maior feito é o que não fez sozinho.', fx: { fim: 'lenda_genio' } } },
      { text: 'Seguir sozinho, mais fundo.', res: { text: 'Nenhum mestre, nenhum caminho. Só você e o Qi, em uma conversa sem fim.', fx: { stats: { dao: 3, esp: 2 }, xp: 10 } } },
    ],
  },

  /* ================= CORAÇÃO INABALÁVEL ================= */
  {
    id: 'tl_cin_1', title: 'O Demônio Que Não Achou Entrada', rarity: 'comum', once: true, weight: 2.5, cond: T('coracao_inabalavel', 1, 3),
    text: 'Um demônio interior, sob a forma de sua própria voz, tenta convencê-lo de que não vale nada. A maioria dos cultivadores cairia. Você apenas observa, com uma curiosidade fria, enquanto ele tenta vários jeitos, e nenhum funciona.',
    choices: [
      { text: 'Conversar com o demônio, como a um velho conhecido.', res: { text: 'Ele se cansa de tentar, e acaba confessando que também tem medo. Você aprende que até demônios têm um ponto fraco: a atenção.', fx: { setFlags: ['t_ci_dialogou'], stats: { dao: 3 }, corr: -3, agenda: [{ event: 'tl_cin_2', em: [4, 9] }] } } },
      { text: 'Ignorá-lo, até que ele vá embora.', res: { text: 'A voz some, devagar. Você descobre que a indiferença é um muro mais forte que a coragem.', fx: { setFlags: ['t_ci_ignorou'], stats: { dao: 2 }, agenda: [{ event: 'tl_cin_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_cin_2', title: 'O Que Ninguém Mais Aguenta', rarity: 'raro', once: true, weight: 0, cond: T('coracao_inabalavel', 1, 6),
    text: 'Um grupo de cultivadores quebrados pela culpa e pelo medo o procura. Dizem que seu Coração é um farol, e pedem para ficar perto. Não pedem que os cure; pedem só que você esteja.',
    choices: [
      { text: 'Acolhê-los e ser o farol que precisam.', res: { text: 'Eles passam meses ao seu redor, aos poucos reencontrando o prumo. Sua calma, repartida, não diminui; cresce.', fx: { setFlags: ['t_ci_farol'], karma: 8, stats: { dao: 2, car: 1 }, agenda: [{ event: 'tl_cin_3', em: [8, 16] }] } } },
      { text: 'Recusar: seu Coração é seu, não de todos.', res: { text: 'Eles partem sem queixa. Você segue firme, e um pouco mais só.', fx: { stats: { dao: 2 }, karma: -2, agenda: [{ event: 'tl_cin_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'tl_cin_3', title: 'A Prova Que Não Quebra', rarity: 'raro', once: true, weight: 0, cond: T('coracao_inabalavel', 2, 7),
    text: 'Um mestre de ilusões, famoso por quebrar a vontade de gerações, o desafia a atravessar a Ilusão das Mil Dores. Quem passa, ganha um tesouro; quem não passa, perde a sanidade por anos.',
    choices: [
      { text: 'Atravessar a Ilusão das Mil Dores.', cond: { talent: ['coracao_inabalavel'] }, check: { stat: ['dao', 'esp'], dif: 1, tag: 'mente' }, ok: { text: 'Você caminha por mil dores sem se desviar. No fim, o mestre se curva, e entrega o tesouro, e uma confissão de que ninguém jamais passou por inteiro.', fx: { item: ['sino_mente_clara'], stats: { dao: 4 }, fama: 10, setFlags: ['t_ci_mil_dores'] } }, fail: { text: 'No terceiro círculo, uma dor mais fundo que as outras o alcança. Você cai, e acorda dias depois, com a mente partida, mas inteira.', fx: { ferida: 3, corr: 4, stats: { dao: 2 } } } },
      { text: 'Recusar: não precisa provar nada.', res: { text: 'O mestre sorri. "Quem não precisa provar já passou." Você segue, sem tesouro e sem dívida.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tl_cin_4', title: 'O Coração Que Virou Rocha', rarity: 'lendario', once: true, weight: 1.6, cond: T('coracao_inabalavel', 4, 8),
    text: 'Seu Coração do Dao é tão firme que deixou de ser pessoal: tornou-se uma qualidade do mundo. Pessoas se acalmam quando você passa. Demônios recuam. Uma pergunta se forma: o que fazer com uma calma que contagia?',
    choices: [
      { text: 'Tornar-se o Farol da Aliança: sentar-se à porta de um templo para sempre, acalmando quem chegar.', cond: { talent: ['coracao_inabalavel'] }, res: { text: 'Você se senta, e fica. Por séculos, quem passa pelo templo sente o peito acalmar, sem saber por quê. Quando você parte, o templo continua calmo.', fx: { fim: 'lenda_coracao' } } },
      { text: 'Continuar andando: uma calma que contagia é mais útil em movimento.', res: { text: 'Em cada cidade que você cruza, brigas acabam e promessas são cumpridas. Você sorri, discreto.', fx: { stats: { dao: 3, car: 2 } } } },
    ],
  },

  /* ================= OLHAR DO DAO ================= */
  {
    id: 'tl_olh_1', title: 'Os Fios Que Você Vê', rarity: 'comum', once: true, weight: 2.5, cond: T('olhar_dao', 1, 3),
    text: 'Num mercado cheio, você vê fios finos ligando as pessoas: um vermelho entre um casal que ainda não se conhece, um cinza entre um mercador e uma dívida, um preto sobre alguém que não verá a próxima lua. Ninguém mais vê.',
    choices: [
      { text: 'Avisar o homem do fio preto.', res: { text: 'Ele ri, depois pálido, depois agradece. Nunca saberá se o aviso o salvou ou o condenou, mas você sabe que tentou.', fx: { setFlags: ['t_od_avisou'], karma: 5, stats: { esp: 1, dao: 1 }, agenda: [{ event: 'tl_olh_2', em: [4, 9] }] } } },
      { text: 'Observar em silêncio: o destino não é seu.', res: { text: 'O homem some na multidão. Você carrega o peso de saber, e a quietude de não ter interferido.', fx: { setFlags: ['t_od_calou'], stats: { dao: 2 }, agenda: [{ event: 'tl_olh_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_olh_2', title: 'O Fio Que Liga a Você', rarity: 'raro', once: true, weight: 0, cond: T('olhar_dao', 1, 6),
    text: 'Pela primeira vez, você vê um fio que sai do seu próprio peito e termina em alguém que ainda nem nasceu. Um discípulo, um filho, um rival. Os fios mudam conforme suas escolhas, e agora você percebe quantos você já cortou sem saber.',
    choices: [
      { text: 'Seguir o fio até quem o espera.', res: { text: 'Semanas de caminhada levam a um bebê numa vila distante, que ainda não sabe o que é Qi. Você o vê, e vai embora, sabendo que voltará.', fx: { setFlags: ['t_od_fio_seguido'], stats: { sor: 2, esp: 1 }, agenda: [{ event: 'tl_olh_3', em: [10, 20] }] } } },
      { text: 'Cortar o fio: alguns destinos não devem se cumprir.', check: { stat: ['dao', 'esp'], dif: 2, tag: 'mente' }, ok: { text: 'O fio se desfaz com um suspiro. Você sente um vazio doce e uma liberdade amarga: aquele destino não existe mais.', fx: { setFlags: ['t_od_cortou_fio'], stats: { dao: 3 }, karma: -2, agenda: [{ event: 'tl_olh_3', em: [10, 20] }] } }, fail: { text: 'O fio resiste e arde em suas mãos. Você aprende que nem tudo pode ser cortado.', fx: { ferida: 2, stats: { dao: 1 }, agenda: [{ event: 'tl_olh_3', em: [10, 20] }] } } },
      { text: 'Ignorar o fio e viver como se não o visse.', res: { text: 'A vida segue. O fio, silencioso, continua lá, esperando.', fx: { stats: { dao: 1 }, agenda: [{ event: 'tl_olh_3', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'tl_olh_3', title: 'Quando o Destino Bate à Porta', rarity: 'raro', once: true, weight: 0, cond: T('olhar_dao', 2, 7),
    text: 'Alguém bate à sua porta, e você já sabia, pelo fio, que seria hoje. É a pessoa ao fim do fio: um jovem, uma mulher, um ancião. Traz um pedido, e você vê, pelos fios, três futuros possíveis, dependendo da sua resposta.',
    choices: [
      { text: 'Aceitar o pedido, seja qual for.', cond: { flags: ['t_od_fio_seguido'] }, res: { text: 'O pedido é difícil, e o destino, generoso. Anos depois, você entende que foi a decisão que o Dao esperava de você.', fx: { setFlags: ['t_od_cumpriu'], karma: 6, stats: { dao: 3, sor: 1 }, fama: 6 } } },
      { text: 'Recusar, para desviar do destino previsto.', res: { text: 'O fio, cortado à força, estremece e se refaz de outro modo. Você ganha um futuro novo, com pontos cegos.', fx: { stats: { dao: 1 }, setFlags: ['t_od_desviou'], karma: -1 } } },
      { text: 'Pedir que o futuro mostre os três caminhos, e escolher o mais difícil.', check: { stat: ['dao', 'esp', 'sor'], dif: 2 }, ok: { text: 'Você escolhe o caminho em que perde mais e ajuda mais. A pessoa à porta chora sem saber por quê, e você sorri, vendo o fio brilhar.', fx: { karma: 10, stats: { dao: 4 }, fama: 8, setFlags: ['t_od_cumpriu'] } }, fail: { text: 'O caminho difícil é mais difícil do que parecia. Você aguenta, mas chega ao fim sem o prêmio.', fx: { ferida: 2, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tl_olh_4', title: 'O Tear do Destino', rarity: 'lendario', once: true, weight: 1.6, cond: T('olhar_dao', 4, 8),
    text: 'Seu olhar já enxerga todo o tecido: bilhões de fios, cruzando-se, formando o que chamam de mundo. Você pode tocar em qualquer fio, um por vez. A pergunta é quais, e quantos, e se alguém, no final, perguntou se você deveria.',
    choices: [
      { text: 'Tornar-se o Tecelão Invisível: passar a vida consertando fios rasgados, sem ninguém saber.', cond: { talent: ['olhar_dao'] }, res: { text: 'Por séculos, pequenas coincidências boas acontecem em cidades onde você passou: um amor que quase não houve, uma doença que não veio. Ninguém sabe seu nome, e você prefere assim.', fx: { fim: 'lenda_olhar' } } },
      { text: 'Fechar os olhos para os fios e viver como mortal.', res: { text: 'Você escolhe não ver. A vida, assim, volta a ter surpresas, e você aprende a gostar delas.', fx: { stats: { dao: 3 }, karma: 3 } } },
    ],
  },

  /* ================= LONGEVIDADE NATURAL ================= */
  {
    id: 'tl_lon_1', title: 'Os Amigos Que Ficam Para Trás', rarity: 'comum', once: true, weight: 2.5, cond: T('vida_longa', 1, 3),
    text: 'Aos quarenta, você ainda tem corpo de vinte e cinco. Seus amigos de infância começam a ter filhos, rugas, pressa. Um deles, rindo, diz: "Você parece meu neto." A piada dói mais do que ele pretendia.',
    choices: [
      { text: 'Passar o máximo de tempo possível com eles.', res: { text: 'Você os acompanha em casamentos, funerais, noites de bebida. Suas memórias, a partir daí, ganham um peso especial.', fx: { setFlags: ['t_vl_presente'], karma: 4, stats: { car: 1, dao: 1 }, agenda: [{ event: 'tl_lon_2', em: [10, 20] }] } } },
      { text: 'Afastar-se: a dor de ver envelhecer é maior que o prazer.', res: { text: 'Você parte antes de se apegar. A estrada é longa, e a solidão, silenciosa. Um dia, você se pergunta se foi sábio ou covarde.', fx: { setFlags: ['t_vl_afastou'], stats: { dao: 2 }, agenda: [{ event: 'tl_lon_2', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'tl_lon_2', title: 'O Funeral de Quem Você Amou', rarity: 'raro', once: true, weight: 0, cond: T('vida_longa', 1, 6),
    text: 'Um a um, seus contemporâneos partem. Hoje é o funeral do último deles. Você, ainda jovem de aparência, é confundido com um neto. Ninguém na vila lembra quem você é; só você lembra quem eles foram.',
    choices: [
      { text: 'Ficar em silêncio, ao lado do túmulo, por dias.', cond: { flags: ['t_vl_presente'] }, res: { text: 'Você deixa o luto fazer o trabalho dele. Quando se levanta, está mais velho por dentro e mais leve por fora.', fx: { karma: 4, stats: { dao: 3 }, corr: -3, agenda: [{ event: 'tl_lon_3', em: [15, 30] }] } } },
      { text: 'Partir imediatamente: a dor de ficar é maior.', cond: { flags: ['t_vl_afastou'] }, res: { text: 'Você deixa uma flor e vai embora. A dor vem depois, em pequenas doses, durante anos.', fx: { stats: { dao: 1 }, karma: -1, agenda: [{ event: 'tl_lon_3', em: [15, 30] }] } } },
      { text: 'Dizer a verdade aos netos: quem você é, e como os conheceu.', res: { text: 'Eles não acreditam, mas guardam a história. Gerações depois, ela vira lenda da vila: o jovem eterno que apareceu em cada funeral.', fx: { karma: 3, fama: 6, stats: { car: 1 }, setFlags: ['t_vl_lenda_da_vila'], agenda: [{ event: 'tl_lon_3', em: [15, 30] }] } } },
    ],
  },
  {
    id: 'tl_lon_3', title: 'A Pílula Que Ninguém Mais Precisava', rarity: 'raro', once: true, weight: 0, cond: T('vida_longa', 2, 7),
    text: 'Uma seita que passou séculos buscando longevidade descobre que você a tem de nascença. Oferecem uma fortuna para estudar o seu corpo. Outros, mais sombrios, oferecem o dobro para extrair a sua essência.',
    choices: [
      { text: 'Permitir um estudo cuidadoso, com limites.', res: { text: 'A seita ganha uma pílula nova, e você, uma bolsa e a certeza de que algum dia outros viverão mais por sua causa.', fx: { pedras: 200, karma: 4, fama: 6, setFlags: ['t_vl_estudado'], stats: { comp: 1 } } } },
      { text: 'Recusar e fugir dos caçadores de essência.', check: { stat: ['sor', 'esp'], dif: 1, tag: 'fuga' }, ok: { text: 'A fuga é longa e limpa. Você deixa uma trilha falsa, e eles gastam anos atrás de uma sombra.', fx: { stats: { sor: 1, esp: 1 }, setFlags: ['t_vl_perseguido'] } }, fail: { text: 'Eles o alcançam. Você escapa, ferido, deixando uma gota de sangue que será estudada por muitas gerações.', fx: { ferida: 3, setFlags: ['t_vl_perseguido'], karma: -1 } } },
      { text: 'Ensinar a seita a viver mais por meios próprios.', check: { stat: ['comp', 'dao'], dif: 1 }, ok: { text: 'Você divide hábitos, respiração e filosofia. A seita descobre que a longevidade, também, é uma arte.', fx: { karma: 8, fama: 10, stats: { comp: 2, dao: 1 }, setFlags: ['t_vl_estudado'] } }, fail: { text: 'A seita quer atalhos, não lições. A conversa termina em decepção.', fx: { stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'tl_lon_4', title: 'O Peso de Ser o Último', rarity: 'lendario', once: true, weight: 1.6, cond: T('vida_longa', 4, 8),
    text: 'Você já viu seis dinastias subirem e caírem. Poucos lembram do mundo como era quando você chegou. A pergunta é simples: como viver quando o mundo todo é, para você, uma memória?',
    choices: [
      { text: 'Tornar-se o Guardião da Memória: viver numa torre, contando a história a quem passar.', cond: { talent: ['vida_longa'] }, res: { text: 'Em uma torre branca, você recebe viajantes e conta, a cada um, o que ninguém mais lembra. Quando você finalmente parte, a torre fica cheia de histórias, e o mundo, de gente que sabe de onde veio.', fx: { fim: 'lenda_longevidade' } } },
      { text: 'Seguir viajando, sem peso, sem torre.', res: { text: 'Você guarda a memória e segue. Nas estradas, ainda há gente nova para conhecer, e esse é o segredo de uma vida longa.', fx: { stats: { dao: 3, car: 1 }, vida: 20 } } },
    ],
  },

  /* ================= PREDESTINADO ================= */
  {
    id: 'tl_pre_1', title: 'O Sinal no Céu', rarity: 'comum', once: true, weight: 2.5, cond: T('predestinado', 1, 3),
    text: 'No dia em que você faz catorze anos, uma estrela cruza o céu em pleno dia. Três videntes diferentes, em três vilas, dizem a mesma frase ao ver você: "É este." Ninguém quer explicar o que é "este".',
    choices: [
      { text: 'Perguntar a um vidente o que ele quis dizer.', res: { text: 'O vidente conta uma profecia antiga, vaga e assustadora. Ele pede desculpas por não saber mais. Você guarda cada palavra.', fx: { setFlags: ['t_pd_profecia'], stats: { comp: 1, dao: 1 }, agenda: [{ event: 'tl_pre_2', em: [4, 10] }] } } },
      { text: 'Ignorar o sinal e viver como qualquer um.', res: { text: 'Você tenta, e o mundo tenta também. Pequenos "acasos" surgem em torno de você, empurrando-o numa direção que você ainda não vê.', fx: { setFlags: ['t_pd_ignorou'], stats: { sor: 2 }, agenda: [{ event: 'tl_pre_2', em: [4, 10] }] } } },
    ],
  },
  {
    id: 'tl_pre_2', title: 'Os Que Querem Cumprir a Profecia', rarity: 'raro', once: true, weight: 0, cond: T('predestinado', 1, 6),
    text: 'Duas facções se aproximam de você. Uma quer proteger o "escolhido" para que a profecia se cumpra. A outra quer matá-lo, para que ela falhe. Nenhuma pergunta o que você quer.',
    choices: [
      { text: 'Aceitar a proteção da primeira facção.', res: { text: 'Você ganha mestres, recursos e vigias. Em troca, perde a liberdade de errar. A profecia, de fato, parece se cumprir, e você começa a duvidar se é você que decide.', fx: { setFlags: ['t_pd_protegido'], stats: { fis: 1, esp: 1, comp: 1 }, xp: 8, fama: 6, agenda: [{ event: 'tl_pre_3', em: [10, 20] }] } } },
      { text: 'Fugir de ambas e traçar o próprio caminho.', check: { stat: ['sor', 'dao'], dif: 1, tag: 'fuga' }, ok: { text: 'Você desaparece, e a profecia, sem seu protagonista, se confunde. Cada facção acha que a outra o pegou.', fx: { setFlags: ['t_pd_livre'], stats: { dao: 2, sor: 1 }, agenda: [{ event: 'tl_pre_3', em: [10, 20] }] } }, fail: { text: 'Uma das facções o encontra, e o resultado é feio. Você escapa, mas deixa para trás tudo que tinha.', fx: { ferida: 3, pedras: -50, setFlags: ['t_pd_livre'], agenda: [{ event: 'tl_pre_3', em: [10, 20] }] } } },
      { text: 'Reunir ambas e propor que a profecia seja reescrita.', check: { stat: ['car', 'dao'], dif: 2 }, ok: { text: 'Sua audácia desarma ambos os lados. Cria-se uma nova profecia, em que você é só uma pessoa, entre muitas.', fx: { karma: 8, fama: 10, stats: { car: 2, dao: 2 }, setFlags: ['t_pd_reescreveu'], agenda: [{ event: 'tl_pre_3', em: [10, 20] }] } }, fail: { text: 'As duas facções, ofendidas, concordam em uma única coisa: que você é um problema.', fx: { ferida: 2, fama: -3, setFlags: ['inimigo_secreto'], agenda: [{ event: 'tl_pre_3', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'tl_pre_3', title: 'A Profecia Cumpre-se, ou Não', rarity: 'raro', once: true, weight: 0, cond: T('predestinado', 2, 7),
    text: 'Chegou o ano que a profecia marcou. O que acontece agora depende do caminho que você escolheu: os protegidos esperam um milagre, os livres, uma emboscada, os que reescreveram, só uma conversa.',
    choices: [
      { text: 'Enfrentar o dia, como o escolhido.', cond: { flags: ['t_pd_protegido'] }, check: { stat: ['dao', 'fis', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'O dia se cumpre como foi dito, e o mundo olha. Você é um herói, e um símbolo, e dói saber que deixou de ser pessoa.', fx: { fama: 18, stats: { dao: 2, fis: 2 }, xp: 10, setFlags: ['t_pd_cumpriu'] } }, fail: { text: 'O dia chega, e o milagre não. Seus protetores o olham, decepcionados. A profecia, afinal, era só um desejo.', fx: { ferida: 3, fama: -6, stats: { dao: 3 } } } },
      { text: 'Passar o dia longe, fazendo algo pequeno e bom.', cond: { flags: ['t_pd_livre'] }, res: { text: 'Você planta uma árvore, cuida de uma criança. Ao fim, descobre que a profecia se cumpriu de outro jeito: pequena, silenciosa, sua.', fx: { karma: 8, stats: { dao: 3 }, setFlags: ['t_pd_cumpriu'] } } },
      { text: 'Reunir os dois lados para um chá.', cond: { flags: ['t_pd_reescreveu'] }, res: { text: 'O dia passa em conversa. Ninguém vence, ninguém morre. A profecia, sem palco, desbota com graça.', fx: { karma: 10, fama: 10, stats: { car: 2, dao: 2 }, setFlags: ['t_pd_cumpriu'] } } },
      { text: 'Aguardar o dia com o que tem, sem plano.', res: { text: 'O dia passa. Algo acontece, ou não. Você nunca saberá ao certo se a profecia era sobre você.', fx: { stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'tl_pre_4', title: 'O Fim da Profecia', rarity: 'lendario', once: true, weight: 1.6, cond: T('predestinado', 4, 8, { flags: ['t_pd_cumpriu'] }),
    text: 'A profecia, uma vez cumprida, desaparece. Não resta mais nada escrito sobre o seu futuro. Pela primeira vez, você pode decidir sozinho. A liberdade, depois de uma vida de destino, é mais assustadora do que parecia.',
    choices: [
      { text: 'Viver como Primeiro Livre: ser o primeiro a escrever o próprio futuro, e ensinar outros a fazê-lo.', cond: { talent: ['predestinado'] }, res: { text: 'Você atravessa o mundo ensinando que ninguém é profecia de ninguém. Quando morre, as profecias, em muitos lugares, caem em desuso, e há quem agradeça sem saber a quem.', fx: { fim: 'lenda_destino' } } },
      { text: 'Seguir sem plano, sem profecia, sem peso.', res: { text: 'Cada manhã é uma surpresa, e você aprende a gostar delas.', fx: { stats: { dao: 3, sor: 2 } } } },
    ],
  },

  /* ================= PASSO DO VAZIO ================= */
  {
    id: 'tl_pas_1', title: 'O Dia Em Que Você Nunca Se Perdeu', rarity: 'comum', once: true, weight: 2.5, cond: T('passo_vazio', 1, 3),
    text: 'Uma caravana inteira se perde num nevoeiro de três dias. Você, sem saber como, sabe onde fica o norte, onde corre o rio, onde há comida. O líder pergunta, perplexo: "Como você sabe?" Você não sabe responder.',
    choices: [
      { text: 'Guiar a caravana até a segurança.', res: { text: 'Três dias, e nenhum atraso. O líder lhe paga bem e espalha sua fama como guia. Você descobre que o dom é útil e solitário.', fx: { setFlags: ['t_pv_guia'], pedras: 60, fama: 6, stats: { sor: 1, esp: 1 }, agenda: [{ event: 'tl_pas_2', em: [4, 9] }] } } },
      { text: 'Seguir sozinho e deixar a caravana à própria sorte.', res: { text: 'Você chega em casa em um dia. Os outros se acham em outro, ou nunca. O peso dessa escolha pesa mais com o tempo.', fx: { setFlags: ['t_pv_sozinho'], karma: -4, stats: { sor: 2 }, agenda: [{ event: 'tl_pas_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_pas_2', title: 'A Porta Entre os Mundos', rarity: 'raro', once: true, weight: 0, cond: T('passo_vazio', 1, 6),
    text: 'Numa noite de lua nova, você pisa num trecho de estrada onde o ar parece dobrar. Um passo à frente, e você está em um vale que nunca existiu em mapa algum. Dois passos de volta, e a estrada reaparece.',
    choices: [
      { text: 'Explorar o vale desconhecido.', check: { stat: ['sor', 'esp'], dif: 1 }, ok: { text: 'O vale tem ervas raras, um lago de Qi e uma cabana vazia. Você sai com um tesouro e a certeza de que pode voltar.', fx: { item: ['erva_mil_anos', 'pilula_qi_maior'], setFlags: ['t_pv_vale'], stats: { esp: 2, sor: 1 }, agenda: [{ event: 'tl_pas_3', em: [10, 20] }] } }, fail: { text: 'O vale se fecha atrás de você. Você leva horas para achar a saída, exausto e com cheiro de outro mundo.', fx: { ferida: 1, corr: 2, setFlags: ['t_pv_vale'], agenda: [{ event: 'tl_pas_3', em: [10, 20] }] } } },
      { text: 'Marcar o lugar e voltar em outra hora.', res: { text: 'Quando volta, a porta não está lá. Algumas passagens só se abrem para quem chega sem plano.', fx: { stats: { dao: 1, comp: 1 }, agenda: [{ event: 'tl_pas_3', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'tl_pas_3', title: 'Quem Procura os Passos Perdidos', rarity: 'raro', once: true, weight: 0, cond: T('passo_vazio', 2, 7),
    text: 'Uma seita de exploradores do Vazio ouve falar do seu dom e quer recrutá-lo. Outra, de caçadores de relíquias, quer usá-lo como guia. Uma terceira, mais sinistra, quer fechá-lo numa sala para estudar como ele funciona.',
    choices: [
      { text: 'Juntar-se aos exploradores do Vazio.', res: { text: 'Você descobre cinco novos mundos de bolso e perde dois companheiros nas voltas. O Vazio, aos poucos, vira sua casa.', fx: { setFlags: ['t_pv_explorador'], fama: 8, stats: { esp: 2, sor: 1 } } } },
      { text: 'Guiar os caçadores de relíquias.', res: { text: 'As relíquias que você acha valem fortunas. As que você deixa, também, e alguns saqueadores pagam pelo que você não revelou.', fx: { pedras: 280, karma: -3, fama: 4, setFlags: ['t_pv_cacador'] } } },
      { text: 'Fugir da terceira seita pela porta do Vazio.', check: { stat: ['esp', 'sor'], dif: 2, tag: 'fuga' }, ok: { text: 'Você some diante dos olhos deles. A seita passa décadas buscando uma porta que só você sabe abrir.', fx: { stats: { esp: 2, sor: 2 }, setFlags: ['t_pv_perseguido'] } }, fail: { text: 'Você é alcançado a meio caminho, e a travessia termina em luta.', fx: { ferida: 3, setFlags: ['t_pv_perseguido'] } } },
    ],
  },
  {
    id: 'tl_pas_4', title: 'O Caminho Sem Caminho', rarity: 'lendario', once: true, weight: 1.6, cond: T('passo_vazio', 4, 8),
    text: 'Um dia você percebe que já não precisa de estradas. Qualquer lugar é aqui, e aqui é qualquer lugar. A pergunta que o Vazio faz é: se você pode ir a qualquer parte, por que ficaria em alguma?',
    choices: [
      { text: 'Tornar-se o Viajante Sem Retorno: passar pela última porta, sem voltar.', cond: { talent: ['passo_vazio'] }, res: { text: 'Você dá um passo, e depois outro, e depois nenhum. Alguns dizem que você vive agora nas entrelinhas do mundo, passando por quem precisa de um guia.', fx: { fim: 'lenda_passo' } } },
      { text: 'Fixar-se em um lugar e chamá-lo de casa.', res: { text: 'Poder ir a qualquer lugar e escolher ficar é a maior forma de querer. Você planta um pé de ameixa.', fx: { stats: { dao: 3, car: 1 } } } },
    ],
  },

  /* ================= SANGUE DE DRAGÃO ================= */
  {
    id: 'tl_dra_1', title: 'A Escama Que Brotou', rarity: 'comum', once: true, weight: 2.5, cond: T('sangue_dragao', 1, 3),
    text: 'Numa manhã, uma escama dourada do tamanho de uma unha aparece em seu antebraço, quente como brasa. Ela some em uma semana. Mas todas as feras da região passam a olhar para você de outro jeito: com medo, e com respeito.',
    choices: [
      { text: 'Aceitar o olhar das feras e usá-lo a seu favor.', res: { text: 'Você caminha pela mata sem ser atacado. Lobos recuam, ursos se curvam. O mundo selvagem passa a ser seu território, e você, o dele.', fx: { setFlags: ['t_sdr_feras'], stats: { esp: 1, car: 1 }, agenda: [{ event: 'tl_dra_2', em: [4, 9] }] } } },
      { text: 'Esconder a marca, com medo do que vem.', res: { text: 'Você veste mangas longas por anos. A marca volta de vez em quando, e você aprende a lidar com ela, em segredo.', fx: { setFlags: ['t_sdr_oculto'], stats: { dao: 1, sor: 1 }, agenda: [{ event: 'tl_dra_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_dra_2', title: 'O Chamado do Ninho', rarity: 'raro', once: true, weight: 0, cond: T('sangue_dragao', 1, 6),
    text: 'Numa noite de tempestade, um rugido distante, mais velho que montanhas, ressoa em seu peito. Você sente um puxão na direção das montanhas do norte. É o chamado do sangue: algo, lá, o espera.',
    choices: [
      { text: 'Atender o chamado e subir as montanhas.', check: { stat: ['fis', 'esp', 'dao'], dif: 1 }, ok: { text: 'Num ninho abandonado, uma única escama, grande como um escudo, pulsa. Ao tocá-la, o sangue responde, e você aprende um rugido que só dragões sabem.', fx: {  item: ['escama_qilin'], stats: { fis: 2, esp: 2 }, setFlags: ['t_sdr_ninho'], agenda: [{ event: 'tl_dra_3', em: [10, 20] }] } }, fail: { text: 'A subida é cruel, e o ninho, vazio. Você volta com o corpo moído e uma saudade sem nome.', fx: { ferida: 2, stats: { dao: 2 }, setFlags: ['t_sdr_ninho'], agenda: [{ event: 'tl_dra_3', em: [10, 20] }] } } },
      { text: 'Ignorar o chamado: seu lugar é aqui.', res: { text: 'O rugido some. Em noites de tempestade, você ainda o escuta, e sente a ausência de algo que nunca teve.', fx: { stats: { dao: 2 }, agenda: [{ event: 'tl_dra_3', em: [10, 20] }] } } },
    ],
  },
  {
    id: 'tl_dra_3', title: 'Os Caçadores de Dragões', rarity: 'raro', once: true, weight: 0, cond: T('sangue_dragao', 2, 7),
    text: 'Uma ordem de caçadores de dragões descobre que há sangue dracônico em você. Eles ensinam que dragões, em todas as eras, trouxeram desgraça. Dizem que você é uma ameaça em potencial, e propõem uma "solução pacífica" que envolve correntes.',
    choices: [
      { text: 'Resistir e provar que o sangue não define quem você é.', check: { stat: ['fis', 'dao', 'car'], dif: 2, tag: 'combate' }, ok: { text: 'Você derrota os caçadores sem matar nenhum, e os convence, com ações, de que o sangue não condena. Alguns passam a protegê-lo.', fx: { karma: 6, fama: 12, stats: { fis: 2, dao: 2 }, setFlags: ['t_sdr_aceito'] } }, fail: { text: 'Você é mais forte do que eles, mas não o bastante para evitar ferimentos nem para impedir que eles contem a história errada.', fx: { ferida: 3, fama: -5, setFlags: ['inimigo_secreto'] } } },
      { text: 'Fugir para as montanhas do norte.', res: { text: 'Você se refugia entre os picos. Lá, outras criaturas de sangue antigo o recebem, sem perguntas.', fx: { setFlags: ['t_sdr_refugio'], stats: { esp: 2, fis: 1 }, local: 'montanha' } } },
      { text: 'Aceitar as correntes por um tempo, para ganhar confiança.', res: { text: 'Sete meses presos, sete de conversa. No fim, alguns caçadores se tornam amigos, e outros, juram vingança.', fx: { karma: 6, stats: { dao: 3 }, setFlags: ['t_sdr_aceito'], fama: 4, ferida: 1 } } },
    ],
  },
  {
    id: 'tl_dra_4', title: 'O Herdeiro do Trono Dracônico', rarity: 'lendario', once: true, weight: 1.6, cond: T('sangue_dragao', 4, 8),
    text: 'Um dragão ancião, à beira da morte, convoca você ao ninho final. Seu reino de ouro e cinza precisa de um herdeiro. Você tem sangue, mas não escamas; tem coração, mas não asas. A pergunta é se aceita um trono que o mundo teme.',
    choices: [
      { text: 'Aceitar o trono: tornar-se o Rei-Dragão Humano, protetor dos dois mundos.', cond: { talent: ['sangue_dragao'] }, res: { text: 'Você se senta em um trono de ossos e ouro. As feras do mundo o reconhecem. Humanos e dragões, antes inimigos, passam a ter um intermediário, e a paz dura mais que você.', fx: { fim: 'lenda_dragao' } } },
      { text: 'Recusar: nenhum trono vale a sua liberdade.', res: { text: 'O dragão suspira, e morre, e o ninho se esvazia. Você carrega, para sempre, o peso do que poderia ter sido.', fx: { stats: { dao: 3, fis: 2 }, karma: 2 } } },
    ],
  },

  /* ================= APRENDIZ VELOZ ================= */
  {
    id: 'tl_apr_1', title: 'O Que Você Aprendeu Rápido Demais', rarity: 'comum', once: true, weight: 2.5, cond: T('aprendiz_veloz', 1, 3),
    text: 'Você aprende uma forma de espada em dois dias, enquanto os outros precisam de duas luas. O instrutor, perplexo, tenta ensiná-lo a ensinar. Você percebe que, ao aprender rápido, você também esquece rápido, e que a pressa cobra seu preço.',
    choices: [
      { text: 'Repetir o que aprendeu, para fixar de verdade.', res: { text: 'Você refaz cada passo, devagar. O método, antes superficial, ganha raízes, e você descobre que ser rápido não é a mesma coisa que ser fundo.', fx: { setFlags: ['t_av_fixou'], stats: { dao: 2, comp: 1 }, agenda: [{ event: 'tl_apr_2', em: [4, 9] }] } } },
      { text: 'Seguir aprendendo coisas novas, sem olhar para trás.', res: { text: 'Em um ano, você conhece vinte formas, e domina nenhuma. Alguns te chamam de gênio; outros, de curioso.', fx: { setFlags: ['t_av_colecionador'], xp: 6, stats: { comp: 2 }, agenda: [{ event: 'tl_apr_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_apr_2', title: 'A Competição dos Mil Estilos', rarity: 'raro', once: true, weight: 0, cond: T('aprendiz_veloz', 1, 6),
    text: 'Uma competição reúne mestres e aprendizes de dez escolas diferentes. Quem demonstrar o maior número de método, em combate, ganha o título de Mestre dos Mil Estilos. Seus dois jeitos de aprender, fundo ou largo, finalmente serão postos à prova.',
    choices: [
      { text: 'Competir com o método que você fixou fundo.', cond: { flags: ['t_av_fixou'] }, check: { stat: ['comp', 'fis', 'dao'], dif: 1, tag: 'combate' }, ok: { text: 'Um método, usado com perfeição, vence dez adversários que mostravam dez estilos. A plateia, em silêncio, entende o que viu.', fx: { fama: 10, stats: { dao: 2, comp: 1 }, setFlags: ['t_av_mestre_um'], agenda: [{ event: 'tl_apr_3', em: [8, 16] }] } }, fail: { text: 'O método funciona, mas só até certo ponto. Um adversário versátil o vence, e você aprende o preço de um só caminho.', fx: { ferida: 2, stats: { dao: 1 }, agenda: [{ event: 'tl_apr_3', em: [8, 16] }] } } },
      { text: 'Mostrar o máximo de estilos que conseguir.', cond: { flags: ['t_av_colecionador'] }, check: { stat: ['comp', 'sor'], dif: 1, tag: 'combate' }, ok: { text: 'Você muda de estilo a cada rodada, confundindo todos. A multidão aplaude: nunca viu tanto talento em um corpo só.', fx: { fama: 12, stats: { comp: 3 }, setFlags: ['t_av_mil_estilos'], agenda: [{ event: 'tl_apr_3', em: [8, 16] }] } }, fail: { text: 'A variedade vira desordem. Você é eliminado cedo, humilhado e com vinte golpes mal feitos na cabeça.', fx: { ferida: 1, fama: -4, stats: { dao: 1 }, agenda: [{ event: 'tl_apr_3', em: [8, 16] }] } } },
      { text: 'Desistir da competição e ensinar os outros competidores.', res: { text: 'Você passa o torneio ensinando a quem perdeu. O título vai para outro; a estima, para você.', fx: { karma: 6, fama: 6, stats: { car: 1, comp: 1 }, agenda: [{ event: 'tl_apr_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'tl_apr_3', title: 'A Escola de Todos os Estilos', rarity: 'raro', once: true, weight: 0, cond: T('aprendiz_veloz', 2, 7),
    text: 'Um senhor rico oferece financiar uma escola com o seu nome, onde você ensine tudo o que aprendeu a centenas de alunos. Alguns mestres, ofendidos, dizem que você está "vulgarizando" as artes. Outros, empolgados, oferecem suas método.',
    choices: [
      { text: 'Fundar a escola e ensinar a todos.', res: { text: 'O pátio fica cheio em um ano. Sua fama como mestre cresce, e com ela, as inimizades dos que viam as artes como segredo.', fx: { setFlags: ['t_av_escola'], pedras: -80, fama: 12, karma: 6, stats: { car: 2, comp: 1 } } } },
      { text: 'Recusar e manter seus estilos para si.', res: { text: 'Você segue com seu repertório particular. Poucos conhecem a profundidade do que você sabe, e ninguém ganha com ela.', fx: { stats: { comp: 2, dao: 1 } } } },
      { text: 'Aceitar o dinheiro, mas criar um curso curto e elitista.', res: { text: 'A escola é pequena e cara. Os alunos saem bons, e alguns, arrogantes. Você ganha, mas perde parte da simpatia.', fx: { pedras: 240, fama: 4, karma: -2, stats: { car: 1 } } } },
    ],
  },
  {
    id: 'tl_apr_4', title: 'O Livro de Todos os Caminhos', rarity: 'lendario', once: true, weight: 1.6, cond: T('aprendiz_veloz', 4, 8),
    text: 'Você aprendeu mais métodos do que qualquer cultivador vivo. Reunir tudo em um único livro seria a obra de uma vida. Seria também uma perda: alguns segredos, quando escritos, perdem a magia.',
    choices: [
      { text: 'Escrever o Livro de Todos os Caminhos e deixá-lo aberto ao mundo.', cond: { talent: ['aprendiz_veloz'] }, res: { text: 'Vinte anos de escrita. O livro circula em milhares de cópias, e uma geração inteira de cultivadores cresce sob a sua letra. Seu nome não está na capa.', fx: { fim: 'lenda_aprendiz' } } },
      { text: 'Guardar o conhecimento em si e seguir aprendendo.', res: { text: 'O caminho que nunca acaba é a melhor forma de ser mestre.', fx: { stats: { comp: 3, dao: 2 } } } },
    ],
  },

  /* ================= FARO PARA TESOUROS ================= */
  {
    id: 'tl_far_1', title: 'O Cheiro do Ouro', rarity: 'comum', once: true, weight: 2.5, cond: T('olfato_tesouro', 1, 3),
    text: 'Numa feira, você sente um cheiro quase imperceptível, de ferro velho e promessa. Seus pés o levam até uma tenda de bugigangas, onde um jarro rachado, aparentemente sem valor, vibra no ar. O vendedor pede quase nada.',
    choices: [
      { text: 'Comprar o jarro e abri-lo em segredo.', res: { text: 'Dentro do jarro, três moedas de uma dinastia antiga e um anel. O vendedor nunca soube o que vendeu, e você nunca devolve.', fx: { pedras: 70, item: ['anel_jade_frio'], setFlags: ['t_ft_achou'], karma: -2, agenda: [{ event: 'tl_far_2', em: [4, 9] }] } } },
      { text: 'Avisar o vendedor de que o jarro vale mais.', res: { text: 'O vendedor, surpreso, divide o lucro com você. Uma amizade improvável nasce entre o faro e a honestidade.', fx: { karma: 6, pedras: 30, setFlags: ['t_ft_honesto'], stats: { car: 1, sor: 1 }, agenda: [{ event: 'tl_far_2', em: [4, 9] }] } } },
    ],
  },
  {
    id: 'tl_far_2', title: 'A Rota dos Tesouros Esquecidos', rarity: 'raro', once: true, weight: 0, cond: T('olfato_tesouro', 1, 6),
    text: 'Seu faro percebe um padrão: tesouros enterrados em linha, séculos atrás, ao longo de uma antiga rota de caravanas. Cada um leva ao próximo, como migalhas de um mapa que ninguém mais vê.',
    choices: [
      { text: 'Seguir a rota inteira, coletando o que achar.', check: { stat: ['sor', 'comp'], dif: 1 }, ok: { text: 'Sete tesouros, cada um mais estranho que o anterior. O último é uma carta de um mercador morto: "Quem chegou até aqui, ficou rico, ou ficou sábio."', fx: { pedras: 300, item: ['bolsa_celeste'], setFlags: ['t_ft_rota'], stats: { sor: 2, comp: 1 }, agenda: [{ event: 'tl_far_3', em: [8, 16] }] } }, fail: { text: 'A rota é mais perigosa do que parecia, e vários tesouros já foram levados. Você volta com pouco e muita poeira.', fx: { pedras: 60, ferida: 1, setFlags: ['t_ft_rota'], agenda: [{ event: 'tl_far_3', em: [8, 16] }] } } },
      { text: 'Deixar os tesouros em paz e guardar o mapa.', res: { text: 'O faro tem opiniões, e você aprende a ignorá-las. O mapa, na memória, vira lenda pessoal.', fx: { stats: { dao: 2 }, karma: 2, agenda: [{ event: 'tl_far_3', em: [8, 16] }] } } },
      { text: 'Vender o mapa a uma guilda de exploradores.', res: { text: 'A guilda paga bem. Meses depois, ouve-se de uma expedição que nunca voltou.', fx: { pedras: 220, karma: -3, setFlags: ['t_ft_vendeu_mapa'], agenda: [{ event: 'tl_far_3', em: [8, 16] }] } } },
    ],
  },
  {
    id: 'tl_far_3', title: 'A Herança Que Ninguém Reclamou', rarity: 'raro', once: true, weight: 0, cond: T('olfato_tesouro', 2, 7),
    text: 'Seu faro o conduz a um cofre, num porão esquecido, que guarda uma herança sem herdeiro: relíquias, escrituras, o legado de uma família extinta. A lei diz que o que não tem dono é de quem achar. O faro diz outra coisa.',
    choices: [
      { text: 'Ficar com a herança: achado não é roubado.', res: { text: 'A fortuna é imensa, e a consciência, cheia de dúvidas. Você a gasta bem, e às vezes pergunta quem seria dono dela.', fx: { pedras: 400, item: ['anel_armazenamento'], karma: -3, setFlags: ['t_ft_herdeiro'] } } },
      { text: 'Procurar herdeiros distantes e devolver.', check: { stat: ['comp', 'sor', 'car'], dif: 1 }, ok: { text: 'Depois de meses, você encontra uma neta distante, que chora ao ver a escritura. Ela divide a herança com você, de coração.', fx: { pedras: 180, karma: 10, fama: 8, stats: { car: 2, dao: 1 }, setFlags: ['t_ft_devolveu'] } }, fail: { text: 'Os herdeiros não aparecem. Você ainda guarda a herança, e a sensação de dever em aberto.', fx: { pedras: 120, karma: 3 } } },
      { text: 'Doar a herança a um templo ou a uma escola.', res: { text: 'A riqueza vira bolsas de estudo e telhados novos. Você sai de mãos vazias, e o faro, curiosamente, passa a funcionar melhor.', fx: { karma: 12, fama: 6, stats: { dao: 2, sor: 2 }, setFlags: ['t_ft_devolveu'] } } },
    ],
  },
  {
    id: 'tl_far_4', title: 'O Maior Tesouro do Mundo', rarity: 'lendario', once: true, weight: 1.6, cond: T('olfato_tesouro', 4, 8),
    text: 'Depois de décadas seguindo cheiros, seu faro chega ao maior tesouro que já sentiu: algo tão grande que o ar ao redor vibra. Pode ser um artefato divino, uma fonte de Qi, uma verdade. Sua escolha, de novo, define o que ele será.',
    choices: [
      { text: 'Tornar-se o Guardião do Tesouro: viver ao lado dele, protegendo-o de quem o cobiçaria.', cond: { talent: ['olfato_tesouro'] }, res: { text: 'Você constrói uma cabana ao lado, e passa décadas em guarda. Quando enfim parte, o tesouro continua escondido, e a lenda do seu faro, intacta.', fx: { fim: 'lenda_faro' } } },
      { text: 'Pegar o tesouro e partir para uma vida de luxo.', res: { text: 'O que você leva vale reinos. Você os gasta com gosto, e o faro, saciado, vai dormir.', fx: { pedras: 600, stats: { sor: 2 }, karma: -4 } } },
    ],
  },
];

/* =====================================================================
 * MOLDES: opções exclusivas de cada talento em eventos comuns
 * ===================================================================== */
export const moldesTalentos: Molde[] = [
  // Memória Perfeita
  { id: 'mp_tes', alvo: ['tesouro'], choice: { cond: { talent: ['memoria_perfeita'] }, text: 'Memorizar o texto inteiro antes de largá-lo.', res: { text: 'Você lê uma vez, e a página inteira fica gravada. Mesmo sem o original, ela volta quando precisa.', fx: { setFlags: ['t_mp_copia'], stats: { comp: 1 }, xp: 3 } } } },
  { id: 'mp_soc', alvo: ['social'], choice: { cond: { talent: ['memoria_perfeita'] }, text: 'Citar, palavra por palavra, o que foi prometido antes.', res: { text: 'O silêncio que se segue vale um contrato. A outra parte aprende a medir o que diz perto de você.', fx: { fama: 3, setFlags: ['t_mp_promessa'], karma: -1 } } } },
  { id: 'mp_cul', alvo: ['cultivo'], choice: { cond: { talent: ['memoria_perfeita'] }, text: 'Reconstituir de memória o diagrama completo de um manual que você só viu uma vez.', check: { stat: ['comp'], dif: 0, tag: 'qi' }, ok: { text: 'Cada traço volta ao lugar. A prática, guiada pela memória, rende mais que meses de tentativa.', fx: { xp: 7, stats: { comp: 1 }, setFlags: ['t_mp_diagrama'] } }, fail: { text: 'Um detalhe errado, repetido com confiança, vira um hábito ruim.', fx: { ferida: 1, stats: { comp: 1 } } } } },
  // Favorecido pelo Destino
  { id: 'sd_tes', alvo: ['tesouro'], choice: { cond: { talent: ['sorte_destino'] }, text: 'Deixar o acaso escolher por você.', res: { text: 'Você fecha os olhos e aponta. O que o acaso escolhe é, de novo, o melhor. Algo, no fundo, anota a dívida.', fx: { pedras: 60, setFlags: ['t_sd_deve_ao_destino'], stats: { sor: 1 } } } } },
  { id: 'sd_per', alvo: ['perigo', 'combate'], choice: { cond: { talent: ['sorte_destino'] }, text: 'Confiar na sorte e avançar sem plano.', check: { stat: ['sor'], dif: 1, tag: 'fuga' }, ok: { text: 'O caminho abre-se por si só: uma pedra no lugar certo, um vento a favor. A sorte cobra, mas adia a conta.', fx: { stats: { sor: 1 }, fama: 3, setFlags: ['t_sd_deve_ao_destino'] } }, fail: { text: 'A sorte, pela primeira vez, falha, e a queda é feia: uma dívida que veio todinha de uma vez.', fx: { ferida: 2, stats: { sor: -1 } } } } },
  { id: 'sd_soc', alvo: ['social', 'viagem'], choice: { cond: { talent: ['sorte_destino'] }, text: 'Seguir um palpite sobre quem ou o que procurar.', res: { text: 'O palpite o leva a alguém que, por acaso, sabia exatamente o que você precisava. O acaso gosta de você.', fx: { fama: 2, stats: { sor: 1, car: 1 }, setFlags: ['t_sd_deve_ao_destino'] } } } },
  // Alma Antiga
  { id: 'aa_cul', alvo: ['cultivo'], choice: { cond: { talent: ['alma_antiga'] }, text: 'Chamar a lembrança de uma vida passada para guiar a prática.', check: { stat: ['esp', 'dao'], dif: 0, tag: 'mente' }, ok: { text: 'Uma voz sem idade murmura o próximo passo. O Qi obedece como a um velho dono.', fx: { xp: 8, stats: { esp: 1 }, setFlags: ['t_aa_ouviu'] } }, fail: { text: 'A voz diz coisas demais, e a mente transborda: uma memória que não era sua dói em você.', fx: { corr: 3, stats: { esp: 1 } } } } },
  { id: 'aa_soc', alvo: ['social', 'tesouro'], choice: { cond: { talent: ['alma_antiga'] }, text: 'Reconhecer o lugar, o objeto ou a pessoa de outra era.', res: { text: 'Algo em você já viu isto. A familiaridade assusta os outros e abre portas, e você nunca sabe qual das duas foi.', fx: { fama: 3, stats: { esp: 1, comp: 1 }, setFlags: ['t_aa_reconheceu'] } } } },
  { id: 'aa_per', alvo: ['perigo'], choice: { cond: { talent: ['alma_antiga'] }, text: 'Sentir o perigo antes que ele exista.', res: { text: 'Sua alma, mais velha que o corpo, reconhece o cheiro do desastre. Você evita o pior, às custas de um pequeno cansaço.', fx: { stats: { esp: 1 }, ferida: 0, setFlags: ['t_aa_reconheceu'], xp: 3 } } } },
  // Corpo Resistente
  { id: 'cr_com', alvo: ['combate', 'perigo'], choice: { cond: { talent: ['corpo_resistente'] }, text: 'Aguentar o golpe de peito aberto e revidar.', check: { stat: ['fis'], dif: 0, tag: 'combate' }, ok: { text: 'O golpe pega, e não abala. Seu revide, seguido, termina a luta com um estrondo. Os outros nunca mais subestimam você.', fx: { fama: 5, stats: { fis: 1 }, ferida: 1, setFlags: ['t_cr_forte_publico'] } }, fail: { text: 'Aguentar custa mais do que parecia. Seu corpo cede, e o orgulho, também.', fx: { ferida: 3, fama: -2 } } } },
  { id: 'cr_via', alvo: ['viagem'], choice: { cond: { talent: ['corpo_resistente'] }, text: 'Atravessar o trecho mais cruel a pé, sem parar.', res: { text: 'Dois dias sem dormir, uma montanha, um vento de lâmina. Ao fim, você chega onde outros precisariam de uma semana.', fx: { stats: { fis: 1, dao: 1 }, xp: 4, ferida: 1 } } } },
  { id: 'cr_soc', alvo: ['social', 'tesouro'], choice: { cond: { talent: ['corpo_resistente'] }, text: 'Oferecer-se para carregar o que ninguém mais consegue.', res: { text: 'A carga é pesada, e o gesto, notado. Alguém, no meio da multidão, se lembra de você.', fx: { fama: 4, pedras: 40, setFlags: ['t_cr_forte_publico'], karma: 2 } } } },
  // Presença Magnética
  { id: 'pm_soc', alvo: ['social'], choice: { cond: { talent: ['carisma_nato'] }, text: 'Falar de coração aberto e deixar a presença fazer o resto.', check: { stat: ['car'], dif: 0 }, ok: { text: 'As palavras saem simples, e a sala as ouve como oração. Ao fim, quase todos querem ajudar.', fx: { fama: 6, stats: { car: 1 }, setFlags: ['t_pm_rede'] } }, fail: { text: 'Alguém não gosta de ser seduzido por palavras, e fecha a cara. Você aprende que a presença tem limites.', fx: { fama: -2, stats: { car: 1 } } } } },
  { id: 'pm_per', alvo: ['perigo', 'combate'], choice: { cond: { talent: ['carisma_nato'] }, text: 'Desarmar a situação com uma palavra e um sorriso.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O inimigo hesita, ri, abaixa a lâmina. Anos depois, ele ainda conta a história, como se fosse sobre outra pessoa.', fx: { fama: 8, karma: 3, stats: { car: 1 }, setFlags: ['t_pm_rede'] } }, fail: { text: 'A palavra não alcança o inimigo, e a luta vem de qualquer jeito, com você sem preparo.', fx: { ferida: 2, fama: -2 } } } },
  { id: 'pm_tes', alvo: ['tesouro', 'viagem'], choice: { cond: { talent: ['carisma_nato'] }, text: 'Pedir ajuda a quem passa e confiar na gentileza alheia.', res: { text: 'Alguém para, outro oferece, um terceiro se junta. Em uma hora, você tem aliados que nunca viu.', fx: { fama: 3, pedras: 30, stats: { car: 1 }, setFlags: ['t_pm_recluso'] } } } },
  // Gênio do Cultivo
  { id: 'gm_cul', alvo: ['cultivo'], choice: { cond: { talent: ['mestre_nato'] }, text: 'Deixar o Qi fluir sozinho e seguir o ritmo dele.', res: { text: 'O Qi sobe, gira, e cobra silêncio. Em uma tarde, você faz o que levaria semanas, e sente o corpo reclamar.', fx: { xp: 12, ferida: 1, corr: 1, setFlags: ['t_gm_solto'] } } } },
  { id: 'gm_per', alvo: ['perigo', 'combate'], choice: { cond: { talent: ['mestre_nato'] }, text: 'Improvisar um método no meio do perigo, com o Qi que o corpo oferece.', check: { stat: ['esp', 'comp'], dif: 1, tag: 'qi' }, ok: { text: 'Um método que você nunca treinou sai perfeita, e o inimigo a vê pela primeira e última vez. O seu talento, de novo, assusta os outros e a você.', fx: { fama: 6, xp: 6, stats: { comp: 1 }, setFlags: ['t_gm_ritmo'] } }, fail: { text: 'O Qi desobedece, e a improvisação explode. Você aprende que talento sem controle é uma moeda de dois lados.', fx: { ferida: 2, corr: 2, stats: { dao: 1 } } } } },
  { id: 'gm_tes', alvo: ['tesouro'], choice: { cond: { talent: ['mestre_nato'] }, text: 'Absorver o Qi do objeto direto, sem refinar.', check: { stat: ['esp', 'fis'], dif: 1 }, ok: { text: 'O Qi do objeto entra como rio em casa de peixe. A absorção é crua e eficaz.', fx: { xp: 9, stats: { esp: 1 }, setFlags: ['t_gm_solto'] } }, fail: { text: 'O Qi bruto machuca por dentro. Você cospe sangue, e aprende por que as pessoas refinam.', fx: { ferida: 2, xp: 3 } } } },
  // Coração Inabalável
  { id: 'ci_per', alvo: ['perigo', 'cultivo'], choice: { cond: { talent: ['coracao_inabalavel'] }, text: 'Encarar o medo de olhos abertos e atravessá-lo.', check: { stat: ['dao'], dif: 0, tag: 'mente' }, ok: { text: 'O medo tenta, e não acha entrada. Você sai do outro lado mais firme, sem levantar a voz.', fx: { stats: { dao: 2 }, corr: -3, setFlags: ['t_ci_ignorou'] } }, fail: { text: 'Mesmo um coração inabalável treme, às vezes. Você aprende o valor de um dia ruim.', fx: { stats: { dao: 1 }, ferida: 1 } } } },
  { id: 'ci_soc', alvo: ['social'], choice: { cond: { talent: ['coracao_inabalavel'] }, text: 'Manter a calma e deixar o outro lado esgotar os argumentos.', res: { text: 'Ele grita, argumenta, ameaça. Você escuta. Ao fim, é ele quem cede, sem saber por quê.', fx: { fama: 4, karma: 2, stats: { dao: 1, car: 1 }, setFlags: ['t_ci_farol'] } } } },
  { id: 'ci_com', alvo: ['combate', 'tesouro'], choice: { cond: { talent: ['coracao_inabalavel'] }, text: 'Esperar o momento exato, sem pressa e sem pânico.', check: { stat: ['dao', 'fis'], dif: 0, tag: 'combate' }, ok: { text: 'O golpe certo, na hora certa, vale mais que dez apressados. O inimigo cai, sem entender.', fx: { fama: 5, stats: { dao: 1 }, setFlags: ['t_ci_dialogou'] } }, fail: { text: 'A espera custa um golpe, mas não o equilíbrio. Você segue de pé.', fx: { ferida: 2, stats: { dao: 1 } } } } },
  // Olhar do Dao
  { id: 'od_soc', alvo: ['social'], choice: { cond: { talent: ['olhar_dao'] }, text: 'Olhar os fios entre as pessoas e escolher o que dizer.', res: { text: 'Você vê as dívidas, os afetos, os medos. Uma frase certa vale por mil argumentos, e você guarda o peso de saber demais.', fx: { fama: 4, stats: { comp: 1, sor: 1 }, setFlags: ['t_od_calou'] } } } },
  { id: 'od_per', alvo: ['perigo', 'combate'], choice: { cond: { talent: ['olhar_dao'] }, text: 'Ver o fio do golpe e desviar antes que ele nasça.', check: { stat: ['sor', 'comp'], dif: 1, tag: 'combate' }, ok: { text: 'O golpe passa onde você não está. O inimigo, perdido, se cansa de acertar o ar.', fx: { fama: 5, stats: { sor: 1, esp: 1 }, setFlags: ['t_od_fio_seguido'] } }, fail: { text: 'Há fios que você ainda não enxerga, e este o pega de lado.', fx: { ferida: 2, stats: { comp: 1 } } } } },
  { id: 'od_tes', alvo: ['tesouro', 'viagem'], choice: { cond: { talent: ['olhar_dao'] }, text: 'Seguir o fio que brilha, sem saber aonde leva.', res: { text: 'O fio o leva a um lugar improvável, e a alguém que precisava de você. Algo, no mundo, se encaixa um pouco melhor.', fx: { stats: { sor: 2 }, karma: 3, pedras: 40, setFlags: ['t_od_fio_seguido'] } } } },
  // Longevidade Natural
  { id: 'vl_cul', alvo: ['cultivo', 'viagem'], choice: { cond: { talent: ['vida_longa'] }, text: 'Esperar anos, sem pressa: quem tem tempo não precisa correr.', res: { text: 'Cinco anos passam num suspiro. O progresso é lento, e seguro, e ninguém consegue acusá-lo de imprudência.', fx: { anos: 5, xp: 10, stats: { dao: 1 } } } } },
  { id: 'vl_per', alvo: ['perigo', 'combate'], choice: { cond: { talent: ['vida_longa'] }, text: 'Recuar, esperar, voltar quando o perigo tiver passado.', res: { text: 'Quem tem décadas de sobra pode se dar ao luxo da paciência. O perigo, sem plateia, se dissolve.', fx: { anos: 3, stats: { dao: 1, sor: 1 }, setFlags: ['t_vl_afastou'] } } } },
  { id: 'vl_soc', alvo: ['social', 'tesouro'], choice: { cond: { talent: ['vida_longa'] }, text: 'Lembrar de alguém ou de algo de décadas atrás, e usar isso.', res: { text: 'Sua memória vai mais longe que a de todos na sala. Uma lembrança antiga abre uma porta que ninguém mais sabia onde ficava.', fx: { fama: 4, stats: { comp: 1, car: 1 }, setFlags: ['t_vl_presente'] } } } },
  // Predestinado
  { id: 'pd_per', alvo: ['perigo', 'combate'], choice: { cond: { talent: ['predestinado'] }, text: 'Seguir adiante: o destino ainda não o quer morto.', check: { stat: ['sor', 'dao'], dif: 1, tag: 'fuga' }, ok: { text: 'Uma coincidência, depois outra, depois uma terceira. O Céu parece segurar a sua mão.', fx: { stats: { sor: 1, dao: 1 }, fama: 4, setFlags: ['t_pd_ignorou'] } }, fail: { text: 'Mesmo os predestinados caem. O Céu, desta vez, só olhou.', fx: { ferida: 2, stats: { dao: 1 } } } } },
  { id: 'pd_soc', alvo: ['social', 'tesouro'], choice: { cond: { talent: ['predestinado'] }, text: 'Dizer, com calma, que isto estava escrito.', res: { text: 'O outro estremece, sem saber se debocha ou se crê. Poucos discutem com quem fala em nome do destino.', fx: { fama: 5, stats: { car: 1 }, karma: -1, setFlags: ['t_pd_profecia'] } } } },
  { id: 'pd_cul', alvo: ['cultivo', 'viagem'], choice: { cond: { talent: ['predestinado'] }, text: 'Esperar um sinal antes de agir.', res: { text: 'O sinal vem, de um jeito pequeno e inequívoco: uma folha, um canto, um olhar. O caminho, claro, o espera.', fx: { xp: 5, stats: { sor: 1, dao: 1 }, setFlags: ['t_pd_profecia'] } } } },
  // Passo do Vazio
  { id: 'pv_per', alvo: ['perigo', 'combate'], choice: { cond: { talent: ['passo_vazio'] }, text: 'Dobrar o espaço e sumir antes do golpe.', check: { stat: ['esp', 'sor'], dif: 0, tag: 'fuga' }, ok: { text: 'Você some, e reaparece atrás do inimigo, que gira no vazio. Ninguém sabe como você fez.', fx: { fama: 5, stats: { esp: 1, sor: 1 }, setFlags: ['t_pv_guia'] } }, fail: { text: 'O passo falha por um fio, e você reaparece no meio do golpe.', fx: { ferida: 2, stats: { esp: 1 } } } } },
  { id: 'pv_via', alvo: ['viagem', 'tesouro'], choice: { cond: { talent: ['passo_vazio'] }, text: 'Atalhar pelo Vazio: chegar antes de qualquer um.', res: { text: 'Três dias de viagem viram um passo. Você chega, olha em volta, e vê que ninguém mais está lá ainda.', fx: { stats: { esp: 1 }, pedras: 50, setFlags: ['t_pv_vale'] } } } },
  { id: 'pv_soc', alvo: ['social', 'cultivo'], choice: { cond: { talent: ['passo_vazio'] }, text: 'Aparecer de surpresa, onde ninguém o esperava.', res: { text: 'A surpresa é metade do argumento. Quando o outro se recupera, você já tem o que queria.', fx: { fama: 4, stats: { sor: 1, car: 1 }, setFlags: ['t_pv_guia'] } } } },
  // Sangue de Dragão
  { id: 'sdr_com', alvo: ['combate', 'perigo'], choice: { cond: { talent: ['sangue_dragao'] }, text: 'Deixar o sangue de dragão falar: rugir.', check: { stat: ['fis', 'esp'], dif: 1, tag: 'combate' }, ok: { text: 'O rugido ecoa pela região. Os inimigos recuam, as feras se calam. Algo antigo, em você, sorri.', fx: { fama: 7, stats: { fis: 1, esp: 1 }, setFlags: ['t_sdr_feras'] } }, fail: { text: 'O sangue sobe demais. Você perde a mão por alguns segundos, e fere mais amigos que inimigos.', fx: { ferida: 2, corr: 3, karma: -3 } } } },
  { id: 'sdr_tes', alvo: ['tesouro', 'viagem'], choice: { cond: { talent: ['sangue_dragao'] }, text: 'Seguir o instinto de ouro: farejar o que é valioso.', res: { text: 'O sangue sabe onde há ouro e relíquia. Você segue o puxão, e o puxão o leva a algo antigo e quente.', fx: { pedras: 80, stats: { sor: 1 }, setFlags: ['t_sdr_ninho'] } } } },
  { id: 'sdr_soc', alvo: ['social', 'cultivo'], choice: { cond: { talent: ['sangue_dragao'] }, text: 'Deixar a presença dracônica pesar na sala.', res: { text: 'O ar engrossa. Vozes baixam. Você não precisa dizer nada: a sala já entendeu quem manda ali.', fx: { fama: 5, stats: { car: 1 }, karma: -2, setFlags: ['t_sdr_oculto'] } } } },
  // Aprendiz Veloz
  { id: 'av_cul', alvo: ['cultivo', 'tesouro'], choice: { cond: { talent: ['aprendiz_veloz'] }, text: 'Aprender o método rápido, em um dia, e passar ao próximo.', res: { text: 'Em um dia, o método é seu. Dos mil detalhes, você guarda os que importam, e o resto esquece sem culpa.', fx: { xp: 8, stats: { comp: 1 }, setFlags: ['t_av_colecionador'] } } } },
  { id: 'av_com', alvo: ['combate', 'perigo'], choice: { cond: { talent: ['aprendiz_veloz'] }, text: 'Copiar o golpe do adversário no meio da luta.', check: { stat: ['comp', 'fis'], dif: 1, tag: 'combate' }, ok: { text: 'Você vê, entende, repete, e devolve o golpe com uma pequena melhora. O adversário recua, ofendido e impressionado.', fx: { fama: 5, stats: { comp: 1, fis: 1 }, setFlags: ['t_av_fixou'] } }, fail: { text: 'A cópia sai pela metade, e você leva o golpe de volta, agora sem defesa.', fx: { ferida: 2, stats: { comp: 1 } } } } },
  { id: 'av_soc', alvo: ['social', 'viagem'], choice: { cond: { talent: ['aprendiz_veloz'] }, text: 'Aprender depressa o idioma, os costumes, os ofícios do lugar.', res: { text: 'Em semanas, você fala como um nativo e negocia como um local. As pessoas confiam, sem saber que você acabou de chegar.', fx: { fama: 3, stats: { comp: 1, car: 1 }, setFlags: ['t_av_colecionador'] } } } },
  // Faro para Tesouros
  { id: 'ft_tes', alvo: ['tesouro'], choice: { cond: { talent: ['olfato_tesouro'] }, text: 'Farejar a vizinhança: o melhor está em outro lugar.', res: { text: 'O faro puxa para o canto errado, o que significa o certo. Você acha algo escondido sob uma tábua solta.', fx: { pedras: 90, stats: { sor: 1 }, setFlags: ['t_ft_achou'], item: ['cristal_qi'] } } } },
  { id: 'ft_via', alvo: ['viagem'], choice: { cond: { talent: ['olfato_tesouro'] }, text: 'Seguir o cheiro de ouro por uma trilha sem nome.', check: { stat: ['sor', 'comp'], dif: 0 }, ok: { text: 'A trilha, esquecida, leva a um pequeno depósito de um mercador morto. A herança, sem herdeiros, é sua.', fx: { pedras: 140, stats: { sor: 1 }, setFlags: ['t_ft_rota'] } }, fail: { text: 'A trilha termina em um desfiladeiro, e o ouro era um reflexo. Você volta com pó e orgulho.', fx: { ferida: 1, stats: { comp: 1 } } } } },
  { id: 'ft_soc', alvo: ['social', 'perigo'], choice: { cond: { talent: ['olfato_tesouro'] }, text: 'Perceber quem esconde algo valioso e usar isso na conversa.', res: { text: 'O cheiro do segredo denuncia o dono. Você sorri, faz uma proposta, e a resposta é mais barata do que ele queria.', fx: { pedras: 70, fama: 2, karma: -2, stats: { car: 1 }, setFlags: ['t_ft_achou'] } } } },
];
