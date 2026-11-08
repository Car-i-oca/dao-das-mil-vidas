import type { ConjuntoTraco } from './tipos';

/**
 * Talento: Olho experiente (alma_antiga). Conceito: antes de a boca dizer, a mão, o ombro e o canto do olho já contaram. A cicatriz:
 * ler as pessoas com clareza demais tira o direito de ser surpreendido, e todo aviso custa uma amizade, mesmo quando estava certo.
 * Cenas: ola_mao_do_vendedor (infância) -> ola_discipulo_novo (juventude) -> ola_amigo_calado (maturidade) -> ola_rosto_fechado (velhice).
 */
const T = { talent: ['alma_antiga'] };

export const ALMA_ANTIGA: ConjuntoTraco = {
  eventos: [
    {
      id: 'ola_mao_do_vendedor', title: 'O polegar do vendedor', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 8, ageMax: 15 },
      text: 'Um vendedor de unguentos para na porta da sua casa e jura, de mão no peito, que o pote é de raiz pura de ginseng. Sua avó, que tem a coluna ruim, já separa as moedas. Você não ouve nada de errado nas palavras. Mas o polegar dele esfrega o indicador o tempo todo, como quem limpa algo que não quer mostrar.',
      choices: [
        { p: 'C', text: 'Dizer em voz alta, diante da vizinhança, que o polegar dele está mentindo', res: { text: 'A rua inteira se vira. O vendedor ri, depois tenta rir de novo, e quando um vizinho abre o pote o cheiro é de banha rançosa com serragem. Ele some antes do fim da tarde. Sua avó guarda as moedas e não diz nada, mas passa a olhar para você de lado, como quem descobriu que a casa tem uma janela nova.', fx: { fama: 1, karma: 2, stats: { esp: 1 }, setFlags: ['ola_rua_avisada'] } } },
        { p: 'T', text: 'Esperar a noite e contar à avó em voz baixa, sem constranger ninguém', res: { text: 'Ela ouve sem interromper, devolve as moedas à lata e no dia seguinte compra o unguento de outra pessoa, com o recibo da boticária. Você aprende que a verdade dita no momento certo faz menos barulho e salva mais. Também aprende que, em casa, ela começou a medir as próprias palavras diante de você.', fx: { karma: 1, stats: { esp: 1, dao: 1 }, setFlags: ['ola_aviso_calado'] } } },
        { p: 'A', text: 'Seguir o vendedor até a próxima aldeia para ver o que ele faz com os outros', check: { stat: ['esp', 'sor'], dif: -1 }, ok: { text: 'Na terceira casa o homem repete a mesma jura, com o mesmo polegar. Você volta a pé a noite toda e chega com os joelhos esfolados e com um nome: Mok, o dono da banca do cruzamento, que compra o falso unguento e o revende como seu. Anos depois, esse nome volta num momento que você não esperava.', fx: { stats: { esp: 2 }, setFlags: ['ola_aviso_calado', 'ola_nome_mok'] } }, fail: { text: 'Você o perde de vista na primeira curva, e a estrada à noite é maior do que uma criança imagina. Chega em casa de manhã, com febre de susto, sem prova e sem a certeza que tinha. Descobre que o olho enxerga, mas ainda não sabe esperar.', fx: { stats: { esp: 1 }, vida: -1 } } },
      ],
    },
    {
      id: 'ola_discipulo_novo', title: 'A reverência atrasada', rarity: 'comum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 16, ageMax: 34 },
      text: 'Um discípulo novo chega à escola trazendo carta de um mestre distante. É educado, trabalha sem reclamar e conhece todos os nomes no segundo dia. Mas, quando se curva diante do mestre, o faz meio tempo depois dos outros, como quem imita, e a mão direita não sai de perto da manga. Os demais já gostam dele. Você é o único que viu.',
      choices: [
        { p: 'C T', text: 'Contar ao mestre em particular o que viu, e pedir que ele mesmo decida', res: { text: 'O mestre ouve, agradece e nada muda por semanas. Numa madrugada, um cofre aparece arrombado, e o discípulo já não está. Mas o mestre também não esquece que você falou antes, e a partir daí passa a pedir sua opinião sobre quem entra e quem sai, o que dá poder e também inimigos.', fx: { fama: 2, stats: { esp: 1 }, setFlags: ['ola_impostor_visto'] } } },
        { p: 'V', text: 'Segurar o pulso do discípulo diante dos outros e puxar a manga dele', check: { stat: ['fis', 'esp'], dif: 0 }, ok: { text: 'Do forro da manga cai um pequeno cinzel de arrombador, e o pátio inteiro fica em silêncio. O discípulo tenta correr e é contido por três colegas. A escola agradece de boca fechada, e o mestre, a sós, diz que na próxima vez prefere ser avisado antes de ver um corpo no chão.', fx: { fama: 3, karma: 1, setFlags: ['ola_impostor_visto'] } }, fail: { text: 'A manga está vazia. O discípulo, humilhado, olha em volta e vê que ninguém se move para defendê-lo, nem para condená-lo. Vai embora ao amanhecer. Semanas depois, um viajante conta que ele era só um rapaz envergonhado, dos que se curvam atrasados porque nunca foram ensinados. Você carrega isso por anos.', fx: { fama: -2, karma: -2, stats: { dao: 1 }, setFlags: ['ola_acusou_inocente'] } } },
        { p: 'D', text: 'Não dizer nada e passar a acompanhá-lo, até que a mão se mostre ou se desmanche', res: { text: 'Você divide a mesma tarefa com ele durante um mês. A mão nunca se mostra, e no fim você não sabe se o enganou ou se se enganou. A única certeza é que, depois disso, você aprende a perguntar a si mesmo quanto de um palpite é leitura e quanto é gosto.', fx: { stats: { esp: 1, dao: 1 }, setFlags: ['ola_mao_paciente'] } } },
      ],
    },
    {
      id: 'ola_amigo_calado', title: 'O sorriso de Han Seok', rarity: 'incomum', once: true, cooldown: 99,
      cond: { ...T, ageMin: 26, ageMax: 55 },
      text: 'Han Seok, que dividiu com você anos de estrada, janta em sua casa e conta histórias antigas. Ele ri nas horas certas. Mas os olhos conferem a porta três vezes antes da sobremesa, e quando ele pega a tigela de vinho, a mão esquerda continua fechada. Você já viu esse desenho em outras pessoas. Sabe que ele vai trair algo, ainda não sabe o quê, e sabe que não pode provar.',
      choices: [
        { p: 'C', text: 'Perguntar com franqueza o que ele veio fazer, como se ele ainda fosse seu irmão', res: { text: 'Han Seok passa um longo tempo olhando a tigela, e então abre a mão: uma dívida de jogo, uma ameaça, uma carta para entregar. Chora de vergonha. Você o ajuda a pagar, e ele leva a vergonha de volta para casa; não é sempre que o gesto certo vem com agradecimento, e este não vem.', fx: { karma: 3, pedras: -30, setFlags: ['ola_amigo_salvo'] } } },
        { p: 'T', text: 'Sorrir de volta, esconder o que importa e guardar a casa sem avisá-lo', res: { text: 'Han Seok sai na manhã seguinte e nada acontece. Meses depois, um mercador relata que ele passou por tantas casas fazendo perguntas parecidas. Quando enfim bate à sua porta de novo, você sorri, e ele não sabe que as chaves estão em outro lugar. A amizade continua, mas com uma fresta que nunca mais se fecha.', fx: { stats: { esp: 1, dao: 1 }, setFlags: ['ola_precavido'] } } },
        { p: 'D', text: 'Confiar mesmo assim, e deixar que a traição, se vier, seja inteira dele', check: { stat: ['dao', 'esp'], dif: 1 }, ok: { text: 'Han Seok não trai. Ou trai no último instante, e volta, e diz que não conseguiu. Você nunca saberá se foi a sua fé que o deteve ou se ele nunca teve a intenção que você leu. Dorme melhor daquela noite em diante, pagando o preço de não saber.', fx: { karma: 3, stats: { dao: 2 }, setFlags: ['ola_amigo_salvo', 'ola_confiou_sem_provas'] } }, fail: { text: 'A traição vem, pequena e precisa, numa venda de cavalos que você deixou ao cuidado dele. Você tinha lido tudo, e mesmo assim confiou. O prejuízo é de dinheiro; o outro é pior, o de reconhecer que o olho acertou e você não quis ouvi-lo.', fx: { pedras: -50, karma: 1, stats: { dao: 1 }, setFlags: ['ola_amigo_traiu'] } } },
      ],
    },
    {
      id: 'ola_rosto_fechado', title: 'O rosto que ninguém ensinou', rarity: 'raro', once: true, cooldown: 99,
      cond: { ...T, ageMin: 50 },
      text: 'Uma jovem sem escola nem sobrenome bate à sua porta pedindo apenas um prato de arroz e um lugar para dormir. Você a observa há horas e não consegue ler nada: nem pressa, nem ganância, nem medo. Os ombros estão calmos, as mãos abertas, o olhar não procura saída. Pela primeira vez em décadas, o seu velho olho não sabe o que ver.',
      choices: [
        { p: 'C D', text: 'Abrir a porta sem perguntar nada e dar o prato como a qualquer visitante', res: { text: 'Ela fica três dias, ajuda na horta, conserta uma dobradiça e vai embora de manhã, deixando a porta bem fechada. Você nunca descobre quem era. Descobre, no entanto, que viver sem ler por uma vez foi um descanso estranho, e passa a deixar o olho em repouso mais vezes.', fx: { karma: 3, stats: { dao: 2 }, setFlags: ['ola_confiou', 'ola_olho_em_repouso'] } } },
        { p: 'T', text: 'Dar o prato do lado de fora e manter as portas trancadas até ela partir', res: { text: 'Ela agradece, come sentada no degrau e se vai ao entardecer. Nada acontece. Você passa a noite acordado, ouvindo o vento, ainda sem saber se protegeu a casa ou perdeu a única pessoa que o teria surpreendido.', fx: { stats: { esp: 1 }, setFlags: ['ola_nunca_leu'] } } },
        { p: 'O', text: 'Contar a ela o que o seu olho viu nas pessoas ao longo da vida, e o que aprendeu', cond: { ...T, flagsAny: ['ola_amigo_salvo', 'ola_precavido', 'ola_amigo_traiu', 'ola_confiou_sem_provas'] }, res: { text: 'Ela escuta até a lamparina quase acabar. No fim diz que ler gestos é fácil; difícil é dar a eles o benefício. Você, que passou a vida lendo, entende de repente por que Han Seok nunca soube se era amado. Ensina a ela o que sabe, e ela parte levando o seu jeito de olhar, sem a sua desconfiança.', fx: { fama: 2, karma: 3, stats: { dao: 2, esp: 1 }, setFlags: ['ola_confiou', 'ola_olhar_herdado'] } } },
      ],
    },
  ],
  opcoes: {
    murim_mercado: [
      { p: 'A', text: 'Notar que Noh olha duas vezes o brasão antes de oferecer o conserto, e perguntar por quê', cond: T, res: { text: 'Noh para de limpar a bainha e confessa que o brasão é igual ao de um freguês que sumiu devendo, anos atrás. Em troca do seu silêncio, conserta tudo de graça e anota o nome do freguês numa folha solta. Você sai com o equipamento novo e com o início de uma pista.', fx: { pedras: 8, stats: { esp: 1 }, setFlags: ['ola_noh_pista'] } } },
    ],
    murim_dilema: [
      { p: 'A D', text: 'Ignorar o que cada um diz e observar quem toca a própria mão ao falar', cond: T, res: { text: 'O espadachim cobre o pulso esquerdo sempre que cita o mestre. Debaixo da faixa, as marcas de uma corda. O mestre o amarrara por anos para que não fugisse da dor, e o rapaz nunca perdoou o fim dele. Você diz isso com cuidado, e a curandeira chora de alívio por ser compreendida.', fx: { fama: 2, karma: 2, stats: { esp: 1 }, setFlags: ['ola_dilema_mao'] } } },
    ],
    murim_ataque: [
      { p: 'A', text: 'Perceber que o bandido com o distintivo o segura com a mão errada, como quem o vestiu hoje', cond: T, res: { text: 'Você fala em voz baixa com o falso guarda: sabe de quem é o distintivo, e onde o dono foi enterrado. O homem vacila, os outros dão um passo atrás, e a carroça segue. Ele o procura meses depois para saber como descobriu, e agora você tem um inimigo que sabe seu rosto.', fx: { fama: 2, karma: 1, setFlags: ['ola_bandido_distintivo'] } } },
    ],
    murim_conselho: [
      { p: 'A D', text: 'Apontar ao conselho que Gwon Tae-seok sorri sempre um instante depois de negar', cond: T, res: { text: 'O mestre dos escribas anota a observação, e duas conselheiras trocam um olhar. Não vale como prova, mas desloca o peso da sala; a audiência continua, e o Clã Gwon passa a falar com mais cautela. Gwon marca o seu rosto com um interesse que não é de amigo.', fx: { fama: 3, karma: 1, stats: { esp: 1 }, setFlags: ['ola_gwon_sorriso'] } } },
    ],
    murim_assassino: [
      { p: 'C T', text: 'Perceber que Choi Rin treme os dedos ao deixar a lâmina e perguntar por quem ela teme', cond: T, res: { text: 'Choi Rin demora a responder. Diz que o cobrador é primo dela, e que a Lua Oca lhe cobra a dívida do pai em sangue. Você não aceita a oferta, mas passa a rota de fuga do cobrador por um mensageiro. Meses depois, ela deixa uma lâmina nova na sua porta, sem recado: um agradecimento e uma advertência.', fx: { karma: 3, stats: { esp: 1 }, setFlags: ['ola_choi_rin_poupada'] } } },
    ],
    murim_refeicao: [
      { p: 'C', text: 'Reparar que o viajante aperta a bolsa com a mão trêmula e perguntar a quem ele deve', cond: T, res: { text: 'O viajante cede, constrangido: leva o caldo para uma filha doente em outra cidade, e a pressa vem da mesma dívida do rapaz. Vocês três dividem a tigela e o caldo que sobra, e Dae-hyun passa a mandar notícias de tempos em tempos, sempre com um agradecimento a mais do que a conta pede.', fx: { karma: 3, stats: { car: 1 }, setFlags: ['ola_caldo_dividido'] } } },
    ],
  },
};
