import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Voz que reúne (predestinado). Conceito: consegue dar coragem a quem já desistiu, e as pessoas passam a segui-lo.
 * A cicatriz: quem reúne os outros responde por eles; a coragem emprestada às vezes leva alguém ao lugar errado.
 * Cenas: voz_primeiro_pedido (infância) -> voz_ponte_dos_desistentes (juventude) -> voz_quem_nao_voltou (maturidade) -> voz_sem_discurso (velhice).
 */
const T = { talent: ['predestinado'] };

export const PREDESTINADO: ConjuntoTraco = {
  eventos: [
    {
      id: 'voz_primeiro_pedido', title: 'O menino que não queria descer', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'Um menino menor está agarrado ao alto de uma figueira, paralisado de medo, sem coragem de subir mais nem de descer. Os outros riem ou gritam conselhos contraditórios. Você levanta a voz, não para dar ordens, e todos se calam de uma vez. O menino olha para você, e só para você, como quem espera ser dito o que fazer.',
      choices: [
        { p: 'C', text: 'Falar baixo, de baixo da árvore, e guiá-lo galho por galho', res: { text: 'Você diz o nome dele e depois o próximo galho, um de cada vez. A descida leva uma hora, e no fim ele pisa o chão chorando, mas inteiro. Os outros meninos, sem entender, passam a te procurar nas brigas da rua, como quem busca um árbitro de sua própria vergonha.', fx: { karma: 2, stats: { car: 1, dao: 1 }, setFlags: ['voz_menino_figueira'] } } },
        { p: 'M', text: 'Gritar que ele é um covarde e que desça logo, para ver se reage', res: { text: 'O menino reage, e desce em pânico, ralando os braços no tronco. Chora de raiva, e, para sua surpresa, os outros meninos o aplaudem como se ele tivesse vencido. Você ganhou um inimigo e, ao mesmo tempo, uma autoridade que não sabe bem como usar.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['voz_menino_humilhado'] } } },
        { p: 'D', text: 'Subir você mesmo até ele e descer junto, devagar, atado a ele por uma corda', check: { stat: ['fis', 'dao'], dif: -1 }, ok: { text: 'A subida é fácil, a descida lenta, e a corda estala duas vezes. Quando os dois pisam o chão, o menino se agarra em você e não solta por um minuto. A vila inteira ouve sobre a corda, e você aprende que há uma coragem que só se empresta com o corpo.', fx: { fama: 2, karma: 2, stats: { fis: 1, dao: 1 }, setFlags: ['voz_menino_figueira'] } }, fail: { text: 'A corda arrebenta no meio do caminho e os dois caem juntos num monte de folhas, felizmente sem gravidade. O menino chora, você ri, e a vila fala disso por semanas. A voz, descobre-se, é eficaz; a corda, nem tanto.', fx: { ferida: 1, stats: { dao: 1 }, setFlags: ['voz_menino_figueira'] } } },
      ],
    },
    {
      id: 'voz_ponte_dos_desistentes', title: 'Os que quiseram voltar', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'Uma caravana de doze pessoas atravessa uma passagem de montanha, e no terceiro dia metade quer voltar: o frio, a fome, o atraso. O guia está calado, sem autoridade. Você, que é apenas um viajante entre outros, percebe que todos olham para você. Se a caravana se divide, ninguém chega. Se continua, alguns talvez não aguentem.',
      choices: [
        { p: 'C D', text: 'Falar com cada um, um a um, e perguntar o que precisa para dar mais um dia', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'Leva a noite toda. Pela manhã, onze dos doze seguem. O décimo segundo, um velho, volta com um guia da vila vizinha e promete encontrá-los. A caravana chega ao destino, e as doze pessoas se lembrarão para sempre da noite em que alguém perguntou o que cada uma precisava.', fx: { fama: 4, karma: 4, stats: { car: 1, dao: 1 }, setFlags: ['voz_caravana_reunida'] } }, fail: { text: 'A conversa dura tempo demais. Quatro dos doze se cansam de esperar e voltam sozinhos, e um deles se perde no caminho. A caravana chega com oito. Você carrega a conta, sem que ninguém lha cobre.', fx: { fama: -1, karma: -1, stats: { dao: 1 }, setFlags: ['voz_caravana_perdeu'] } } },
        { p: 'M V', text: 'Subir numa pedra e falar a todos juntos, com a voz mais alta que tiver', res: { text: 'A voz ecoa na encosta e os doze se calam. O discurso é simples, sobre chegar e sobre a vergonha de voltar de mãos vazias. A caravana segue, inteira, em silêncio tenso. Dois deles não perdoam a pressão. Você chega, e levará a vida inteira o fardo de ter mandado quem não queria ser mandado.', fx: { fama: 3, karma: -1, stats: { car: 1 }, setFlags: ['voz_caravana_reunida', 'voz_pressao'] } } },
        { p: 'T', text: 'Propor que os que querem voltar voltem, e que os outros sigam, sem culpa', res: { text: 'Seis voltam, seis seguem. Ninguém é humilhado, e a separação é amigável. A notícia chega à vila: o grupo que seguiu atravessa a passagem; o que voltou chega em casa a salvo. Você descobre que reunir não é o mesmo que prender.', fx: { fama: 2, karma: 2, stats: { dao: 2 }, setFlags: ['voz_caravana_dividida'] } } },
      ],
    },
    {
      id: 'voz_quem_nao_voltou', title: 'O nome na parede', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 28, ageMax: 58 },
      text: 'Anos atrás, você convenceu um grupo de dezoito aldeões a defender um desfiladeiro contra bandidos. A defesa funcionou, mas quatro deles morreram. Hoje, a viúva de um deles vem à sua porta, calada, com um pano dobrado nos braços. Não grita, não acusa. Só pergunta, em voz baixa, se você ainda se lembra do nome do marido dela.',
      choices: [
        { p: 'C', text: 'Dizer o nome, a idade, o que ele fez no desfiladeiro, e pedir perdão', res: { text: 'Ela escuta, de pé, até o fim. Quando você termina, abre o pano: dentro, o cinto do marido. Entrega-o a você e vai embora sem dizer nada. Você o pendura na parede, ao lado da porta, e o olha todos os dias, sem desviar.', fx: { karma: 3, fama: 1, stats: { dao: 2 }, setFlags: ['voz_nome_dito'] } } },
        { p: 'T', text: 'Dizer que lamenta e oferecer dinheiro, sem pronunciar o nome', res: { text: 'Ela aceita o dinheiro sem agradecer e se despede em silêncio. Mais tarde, você percebe que não sabe o nome. Esquecer era mais fácil do que carregar, e a viúva percebeu. Você revira os arquivos da vila até encontrar, e o escreve num papel que guarda no peito.', fx: { pedras: -40, karma: 1, stats: { dao: 1 }, setFlags: ['voz_dinheiro_pago'] } } },
        { p: 'O D', text: 'Convidá-la a participar da próxima defesa, como quem divide a responsabilidade', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'Ela, surpresa, aceita. Nos anos seguintes, a viúva se torna a voz mais firme do desfiladeiro, e a defesa vira um assunto de duas pessoas que se entendem. Você nunca será perdoado inteiramente, mas aprende que dividir a dor é um tipo de resposta.', fx: { fama: 3, karma: 3, stats: { car: 1, dao: 1 }, setFlags: ['voz_nome_dito', 'voz_viuva_aliada'] } }, fail: { text: 'Ela recusa, magoada, e diz que esperava uma resposta, não uma convocação. Você a vê descer a rua, sem conseguir chamá-la de volta. O pedido foi mal medido, e o que se perde, nesse tipo de erro, não se recupera por palavras.', fx: { karma: -1, stats: { dao: 1 }, setFlags: ['voz_dinheiro_pago'] } } },
      ],
    },
    {
      id: 'voz_sem_discurso', title: 'A vez em que não disse nada', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 55 },
      text: 'A vila inteira se reúne na praça, e todos olham para você: há uma disputa de terras, uma ameaça de um clã vizinho e uma dúvida sobre o que fazer. Você, que passou a vida inteira dizendo as palavras certas, percebe que não sabe o que dizer. Pela primeira vez, não tem discurso, nem consolo, nem estratégia. Só a voz, vazia, esperando.',
      choices: [
        { p: 'C', text: 'Dizer a verdade: que não sabe, e perguntar a cada um o que acha', res: { text: 'Há um longo silêncio, e então um jovem levanta a mão e propõe algo. Outro responde. Em uma hora, a praça decide sozinha, e a decisão é melhor do que a que você teria tomado. A voz que reúne descobre, no fim, que o melhor discurso é uma pergunta.', fx: { fama: 4, karma: 4, stats: { dao: 2, car: 1 }, setFlags: ['voz_reuniu_calando', 'voz_sem_discurso_ok'] } } },
        { p: 'D', text: 'Improvisar uma fala firme, mesmo sem convicção, para segurar a praça', res: { text: 'As palavras saem, vazias e eficazes. A praça segura o que decidiu, e o clã vizinho recua. Mais tarde, sozinho, você pensa se a coragem emprestada pela última vez foi honesta. A voz serviu, mas deixou um gosto de cinza na boca.', fx: { fama: 2, karma: -1, stats: { dao: 1 }, setFlags: ['voz_sem_discurso_ok'] } } },
        { p: 'O', text: 'Passar a palavra a um jovem que o ouviu a vida inteira e deixar que ele fale por você', cond: { ...T, flagsAny: ['voz_menino_figueira', 'voz_caravana_reunida', 'voz_nome_dito', 'voz_viuva_aliada', 'voz_caravana_dividida'] }, res: { text: 'O jovem, surpreso, hesita e então fala, com palavras que são e não são as suas. A praça o escuta e, ao final, o aplaude. Você, de pé ao fundo, entende que a voz que reúne não precisa ser a mesma: precisa ser passada.', fx: { fama: 3, karma: 4, stats: { dao: 2 }, setFlags: ['voz_reuniu_calando', 'voz_sem_discurso_ok', 'voz_herdeiro'] } } },
      ],
    },
  ],
  opcoes: {
    murim_refugiados: [
      { p: 'C', text: 'Subir na carroça quebrada e falar às três famílias, uma a uma, antes de partirem', cond: T, res: { text: 'Você lhes diz que a cidade está a dois dias, que há um magistrado honesto, que não estão sós. Pela primeira vez em semanas, as famílias sorriem. Quando partem, seguem em coluna, de cabeça erguida, e a menina do estandarte lhe acena sem parar.', fx: { karma: 3, stats: { car: 1 }, setFlags: ['voz_refugiados'] } } },
    ],
    murim_conselho: [
      { p: 'C D', text: 'Falar às famílias na galeria e pedir que, em coro, exijam o direito de depor', cond: T, res: { text: 'As famílias se levantam, quase sem querer, e a sala muda. O presidente do conselho hesita e cede: as depoentes são admitidas. Gwon Tae-seok perde a calma pela primeira vez, e você aprende que um coro vale mais do que um solo.', fx: { fama: 4, karma: 2, setFlags: ['voz_coro_familias'] } } },
    ],
    murim_assembleia: [
      { p: 'C', text: 'Falar com a voz firme que acalma as duas bancadas ao mesmo tempo', cond: T, res: { text: 'A sala se acalma, o primeiro delegado fala, e a assembleia segue. Ao final, as bancadas se despedem com gestos mais lentos do que ao chegar. Alguém sussurra que a voz que acalmou a sala deveria ser chamada para a próxima.', fx: { fama: 4, karma: 2, setFlags: ['voz_assembleia'] } } },
    ],
    murim_inverno: [
      { p: 'C', text: 'Reunir viajantes e mercadores na estalagem e convencê-los de que dividir é sobreviver', cond: T, res: { text: 'Você fala por duas horas, e ao final os mercadores abrem os baús. A vila atravessa a nevasca sem perdas, e três mercadores te procuram na primavera, querendo agradecer e fechar negócio. Você aceita só o agradecimento.', fx: { fama: 3, karma: 3, setFlags: ['voz_inverno'] } } },
    ],
    murim_festival: [
      { p: 'C', text: 'Convencer o oficial e o garoto a conversarem diante da praça', cond: T, res: { text: 'A voz se faz ouvir, e a praça silencia. O oficial, constrangido, abre mão da taxa do garoto e de mais dois, e o garoto devolve a fruta. Ninguém sabe bem como aquilo aconteceu, e você sai discretamente antes que alguém o pergunte.', fx: { fama: 3, karma: 2, setFlags: ['voz_festival'] } } },
    ],
    murim_rota_guardiao: [
      { p: 'C D', text: 'Falar aos viajantes das duas caravanas e propor que atravessem juntos, em fila', cond: T, res: { text: 'Os dois chefes de caravana hesitam, depois cedem: a fila é formada, os remédios no meio, o acusado ao lado do escudeiro. A passagem é cruzada ao entardecer, e o acusado é ouvido por um juiz ao chegar. Você descobre que dividir a rota é uma forma de dividir o risco.', fx: { fama: 4, karma: 3, setFlags: ['voz_rota'] } } },
    ],
  },
};
