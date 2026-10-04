import { molde, type Molde } from '../../../engine/v2/tipos';

/**
 * Arco do Rival (fio `rival`): da primeira humilhação ao último confronto.
 * O rival é uma pessoa do mundo: cultiva, sobe de reino, lembra de tudo, pode morrer.
 */
export const RIVAL: Molde[] = [
  molde({
    id: 'rival_teste_publico',
    titulo: 'A Prova Diante de Todos',
    tipo: 'preparo',
    capitulos: ['despertar', 'entrada', 'ascensao'],
    papeis: {
      rival: { pessoa: { papel: 'rival', vivo: true } },
      seita: { faccao: { de: 'rival' } },
      patio: { lugar: { dono: 'seita', tipo: ['patio'] }, opcional: true },
    },
    quando: { jogador: { reinoMin: 1 }, papel: { rival: { vivo: true } } },
    relevancia: [
      { se: { papel: { rival: { fato: ['humilhou_o_jogador'] } } }, mais: 25 },
      { se: { papel: { rival: { fato: ['foi_derrubado'] } } }, mais: 25 },
    ],
    fio: { id: 'rival', etapa: 2, abandono: 'Eles nunca mediram forças de verdade.' },
    cena: [
      { se: { papel: { rival: { fato: ['foi_derrubado'] } } }, texto: 'A {seita.nome} promove uma prova aberta: cada novato mostra o que aprendeu diante de todos. {rival.nome} vai primeiro e faz bonito, mas há uma tensão nos ombros {rival.dele} que você conhece: é a do dia em que sangrou o nariz na frente da vila. Quando chega a sua vez, {rival.ele} não desvia os olhos.' },
      { se: { papel: { rival: { fato: ['humilhou_o_jogador'] } } }, texto: 'A {seita.nome} promove uma prova aberta: cada novato mostra o que aprendeu diante de todos. {rival.nome} vai primeiro, com a postura de quem nasceu para estar ali, e termina com um sorriso na sua direção. É o mesmo sorriso do balde chutado. Quando chega a sua vez, o pátio inteiro olha.' },
      { texto: 'A {seita.nome} promove uma prova aberta: cada novato mostra o que aprendeu diante de todos. {rival.nome} vai primeiro e faz bonito. Quando chega a sua vez, os olhos todos estão em você, e o {rival.dele} também.' },
    ],
    opcoes: [
      {
        id: 'tudo', texto: 'Mostrar tudo o que sabe, sem poupar ninguém.', teste: { stat: ['fis', 'dao'], dif: 0 },
        sucesso: { texto: 'O silêncio depois do seu último movimento é o tipo de silêncio que dura. {rival.nome} aplaude por último, e sem vontade. A seita começa a dizer o seu nome de um jeito diferente.', efeitos: [{ fato: ['rival', 'foi_superado_em_publico', 4] }, { opiniao: ['rival', -15] }, { reputacao: ['seita', 8] }, { inclinar: ['superar_rival', 2] }], fx: { fama: 3, stats: { dao: 1 }, perfil: { ambicao: 1 } } },
        falha: { texto: 'Um passo em falso, e a plateia suspira. {rival.nome} nem precisa sorrir; a vitória {rival.dele} está no ar. Você sai do pátio sem olhar para ninguém.', efeitos: [{ fato: ['rival', 'superou_o_jogador', 3] }, { opiniao: ['rival', -4] }, { reputacao: ['seita', -3] }, { inclinar: ['superar_rival', 3] }], fx: { stats: { dao: 1 }, perfil: { disciplina: 1 } } },
      },
      {
        id: 'mao', texto: 'Vencer, e estender a mão a {rival.nome} diante de todos.', teste: { stat: ['car', 'dao'], dif: 1 },
        sucesso: { texto: '{rival.nome} fica com a mão no ar por um instante longo demais. Depois a aperta, rápido, como quem fecha uma conta. A seita aprova a cena, e {rival.ele} sabe que perdeu duas vezes: uma na prova, outra na elegância.', efeitos: [{ fato: ['rival', 'foi_poupado_em_publico', 4] }, { opiniao: ['rival', 4] }, { reputacao: ['seita', 10] }, { inclinar: ['superar_rival', 1] }], fx: { fama: 2, karma: 1, perfil: { compaixao: 1 } } },
        falha: { texto: 'A mão estendida vira um gesto desajeitado, e {rival.nome} usa isso: "Guarde a gentileza para quem precisa." Alguém ri. Você aperta o punho vazio dentro da manga.', efeitos: [{ fato: ['rival', 'recusou_a_mao', 3] }, { opiniao: ['rival', -12] }, { reputacao: ['seita', -2] }], fx: { perfil: { compaixao: 1 } } },
      },
      {
        id: 'folha', texto: 'Cortar uma folha no ar antes de {rival.ele} tocar o chão.',
        requer: { jogador: { trilha: ['espada'] } }, selo: 'Caminho da Espada', teste: { stat: ['dao', 'fis'], dif: -1, tag: 'espada' },
        sucesso: { texto: 'A folha cai em dois pedaços, com a nervura exposta. Ninguém aplaude: ninguém lembra de como se faz. {rival.nome} olha o corte por muito tempo, e depois olha você, de outro jeito.', efeitos: [{ fato: ['rival', 'viu_a_lamina', 4] }, { opiniao: ['rival', -8] }, { reputacao: ['seita', 9] }, { inclinar: ['superar_rival', 2] }], fx: { fama: 3, rec: 1 } },
        falha: { texto: 'A folha escapa por um fio, e o seu golpe corta o ar. Alguém tosse. Não é um desastre, mas a seita aprende uma coisa sobre você, e {rival.nome} aprende outra.', efeitos: [{ fato: ['rival', 'viu_a_lamina_falhar', 2] }, { opiniao: ['rival', -3] }], fx: { perfil: { disciplina: 1 } } },
      },
      {
        id: 'pilula', texto: 'Mostrar uma pílula que você mesmo refinou, em vez de lutar.',
        requer: { jogador: { trilha: ['alquimia'] } }, selo: 'Caminho da Alquimia', teste: { stat: ['comp', 'sor'], dif: 0, tag: 'alquimia' },
        sucesso: { texto: 'A pílula brilha em azul profundo, e a plateia se inclina para ver. Os anciões se entreolham: um aprendiz que cura é mais raro que um que corta. {rival.nome} cruza os braços, em silêncio, calculando o preço dessa vantagem.', efeitos: [{ fato: ['rival', 'viu_o_jogador_refinar', 3] }, { opiniao: ['rival', -6] }, { reputacao: ['seita', 12] }], fx: { fama: 3, rec: 1 } },
        falha: { texto: 'A pílula racha no meio, e o cheiro é o de uma panela queimada. Alguns riem baixo. Você guarda os pedaços no bolso e promete a si mesmo que nunca mais vai errar o ponto diante de ninguém.', efeitos: [{ reputacao: ['seita', -2] }, { fato: ['rival', 'viu_o_jogador_errar', 2] }], fx: { perfil: { disciplina: 1 } } },
      },
      {
        id: 'margem', texto: 'Recusar-se a participar e ficar à margem do pátio.',
        res: { texto: 'Você fica de fora, com as mãos para trás. Alguns comentam, outros esquecem, e {rival.nome} entende o gesto como queria entender: você escolheu não competir. O que {rival.ele} não sabe é se foi medo ou desprezo.', efeitos: [{ fato: ['rival', 'viu_o_jogador_recuar', 2] }, { opiniao: ['rival', -6] }, { reputacao: ['seita', -4] }], fx: { perfil: { cautela: 1 } } },
      },
    ],
  }),

  molde({
    id: 'rival_sobe',
    titulo: 'O Rival Passa à Frente',
    tipo: 'personagem',
    capitulos: ['entrada', 'ascensao', 'crise'],
    cooldown: 12,
    papeis: { rival: { pessoa: { papel: 'rival', vivo: true } }, seita: { faccao: { de: 'rival' } } },
    quando: { jogador: { reinoMin: 1 }, papel: { rival: { vivo: true, reinoDif: [-9, -1] } } },
    relevancia: [{ se: { papel: { rival: { objetivo: ['superar'] } } }, mais: 25 }, { se: { papel: { rival: { reinoDif: [-9, -2] } } }, mais: 20 }],
    fio: { id: 'rival' },
    cena: '{rival.nome} rompeu para {rival.reino}. A notícia chega à {seita.nome} antes do próprio {rival.nome}, e quando {rival.ele} chega, o pátio se abre diante {rival.dele}. Você está um reino atrás. {rival.Ele} passa por você sem dizer nada, e o silêncio tem mais peso que qualquer palavra.',
    opcoes: [
      {
        id: 'treinar', texto: 'Trancar-se por semanas e treinar até cair.',
        res: { texto: 'Você perde a noção dos dias. Quando a porta se abre, o corpo dói, e o Qi corre mais firme. Aprendeu uma coisa útil: a rivalidade é um combustível, mas queima quem o carrega.', efeitos: [{ inclinar: ['superar_rival', 2] }], fx: { xp: 8, stats: { dao: 1 }, ferida: 1, perfil: { disciplina: 2 } } },
      },
      {
        id: 'felicitar', texto: 'Procurar {rival.nome} e felicitá-lo, sem ironia.',
        res: { texto: '{rival.nome} desconfia, e então percebe que você falou a sério. "Obrigado", responde, sem jeito, e por um instante parece {rival.o} garot{rival.o} do balde, de joelhos ralados, antes de aprender a ser arrogante.', efeitos: [{ fato: ['rival', 'foi_felicitado', 3] }, { opiniao: ['rival', 8] }], fx: { karma: 1, perfil: { compaixao: 1 } } },
      },
      {
        id: 'seguir', texto: 'Descobrir o segredo {rival.dele}: seguir {rival.nome} à noite.', teste: { stat: ['sor', 'comp'], dif: 0 },
        sucesso: { texto: 'Você o segue até um pavilhão fechado e o vê tomando uma pílula cara, de origem duvidosa. Não é trapaça de verdade, mas é a prova de que o talento {rival.dele} tem uma muleta. Você guarda isso, como se guarda uma faca.', efeitos: [{ q: ['rival_segredo', 1] }, { fato: ['rival', 'tem_uma_muleta', 2] }, { inclinar: ['superar_rival', 1] }], fx: { perfil: { astucia: 2 } } },
        falha: { texto: 'Um galho estala, e {rival.nome} se vira. Não grita; só olha, com o rosto de quem acaba de entender uma coisa sobre você. "Vai continuar atrás de mim até quando?" O que você ouve é pior que uma pancada.', efeitos: [{ fato: ['rival', 'pegou_o_jogador_espiando', 3] }, { opiniao: ['rival', -18] }], fx: { perfil: { astucia: 1 } } },
      },
      {
        id: 'fingir', texto: 'Fingir que não importa e seguir a sua rotina.',
        res: { texto: 'Você varre o pátio, rega as ervas, come o arroz. Ninguém acredita, nem você, mas a calma se torna uma armadura. Aos poucos, o assunto deixa de ser seu.', efeitos: [{ inclinar: ['superar_rival', 1] }], fx: { stats: { dao: 1 }, perfil: { cautela: 1, disciplina: 1 } } },
      },
    ],
  }),

  molde({
    id: 'rival_desafio_publico',
    titulo: '{rival.nome} Desafia Você Diante da {seita.nome}',
    tipo: 'perigo',
    capitulos: ['entrada', 'ascensao', 'crise'],
    unico: true,
    papeis: {
      rival: { pessoa: { papel: 'rival', vivo: true } },
      seita: { faccao: { de: 'rival' } },
      praca: { lugar: { dono: 'seita', tipo: ['patio', 'portao'] }, opcional: true },
    },
    quando: { jogador: { reinoMin: 1 }, papel: { rival: { vivo: true, opiniaoMax: 5 } } },
    relevancia: [
      { se: { papel: { rival: { objetivo: ['vingar', 'superar'] } } }, mais: 30 },
      { se: { papel: { rival: { fato: ['foi_derrubado'] } } }, mais: 15 },
      { se: { papel: { rival: { fato: ['pegou_o_jogador_espiando'] } } }, mais: 15 },
    ],
    combate: { oponente: 'cultivador', cenario: 'seita' },
    fio: { id: 'rival', etapa: 3, abandono: 'O duelo nunca foi marcado, e o orgulho dos dois ficou apodrecendo.' },
    cena: [
      { se: { papel: { rival: { fato: ['foi_derrubado'] } } }, texto: '{rival.nome} não esqueceu o dia em que você o fez sangrar. Hoje, diante de toda a {seita.nome}, {rival.ele} sobe ao estrado e pede o duelo que nunca aconteceu. {rival.Trato}, diz {rival.ele}, olhando para você, e a palavra sai com um gosto de ferro.' },
      { se: { papel: { rival: { fato: ['pegou_o_jogador_espiando'] } } }, texto: '{rival.nome} sobe ao estrado diante de toda a {seita.nome} e aponta para você. "Quem me segue à noite", diz, bem alto, "deve ter coragem de me enfrentar de dia." O pátio inteiro se vira para ver o que você vai fazer.' },
      { texto: '{rival.nome} sobe ao estrado e aponta para você: quer medir forças diante de toda a {seita.nome}. O pátio fica em silêncio. Ninguém tem certeza de que aquilo estava combinado, e ninguém quer ser o primeiro a perguntar.' },
    ],
    opcoes: [
      {
        id: 'aceitar', texto: 'Aceitar o duelo.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'rival' },
        sucesso: { texto: 'Você vence sem humilhá-lo mais do que o necessário. A praça vê, e {rival.nome} sai de cabeça baixa, sem aceitar a mão de ninguém. Quem perde assim fica muito tempo lembrando de quem venceu.', efeitos: [{ fato: ['rival', 'perdeu_o_duelo', 4] }, { opiniao: ['rival', -10] }, { reputacao: ['seita', 8] }, { objetivo: ['rival', 'superar'] }], fx: { fama: 4, perfil: { violencia: 1, ambicao: 1 } } },
        falha: { texto: 'O primeiro golpe {rival.dele} acerta, e o segundo também. Você cai diante de todos, com a boca cheia de poeira. {rival.nome} baixa a espada, sem triunfo, apenas com a certeza de quem acabou de confirmar uma ideia que já tinha.', efeitos: [{ fato: ['rival', 'venceu_o_duelo', 4] }, { objetivo: ['rival', 'superar'] }, { reputacao: ['seita', -4] }], fx: { ferida: 2, perfil: { disciplina: 1 } } },
      },
      {
        id: 'recusar', texto: 'Recusar, e deixar que o chamem de covarde.',
        requer: { jogador: { defeitoNao: ['orgulhoso'] } }, seloBloqueio: 'Orgulho Ferido: você não consegue recusar',
        res: { texto: 'O pátio murmura. {rival.nome} sorri, e o sorriso é de quem recebeu um presente. Você vai embora sem pressa, mas sabe que esse "não" vai ser cobrado, com juros, em outra ocasião.', efeitos: [{ fato: ['rival', 'viu_recuar_em_publico', 3] }, { opiniao: ['rival', -5] }, { reputacao: ['seita', -6] }], fx: { stats: { dao: 1 }, perfil: { cautela: 2 } } },
      },
      {
        id: 'cha', texto: 'Mandar, na véspera, um bule de chá para {rival.nome}. {rival.Ele} não vai lutar bem.',
        requer: { jogador: { trilha: ['venenos'] } }, selo: 'Caminho dos Venenos', teste: { stat: ['comp', 'sor'], tag: 'veneno', ameaca: 'rival' },
        sucesso: { texto: '{rival.nome} tropeça no estrado e desiste com a vista turva. Ninguém sabe por quê, mas a fama {rival.dele} sai arranhada, e a sua, intocada. Dentro de você, uma coisa pequena e fria registra que funcionou.', efeitos: [{ fato: ['rival', 'envenenado_sem_saber', 4] }, { reputacao: ['seita', 2] }], fx: { fama: 1, karma: -2, perfil: { astucia: 2 } } },
        falha: { texto: '{rival.nome} cheira o chá, entende, e não diz nada. Só olha. No estrado, depois, dá um passo para o lado quando você se aproxima e sussurra uma palavra que ninguém mais ouve: "veneno". O resto da seita ainda não sabe, mas {rival.ele} vai contar.', efeitos: [{ fato: ['rival', 'descobriu_o_veneno', 5] }, { opiniao: ['rival', -30] }, { objetivo: ['rival', 'expor'] }], fx: { karma: -2, perfil: { astucia: 1 } } },
      },
      {
        id: 'circulo', texto: 'Traçar, na véspera, o arranjo de pedras sob o estrado, e fazer o duelo acontecer no chão que você escolheu.',
        requer: { jogador: { trilha: ['formacoes'] } }, selo: 'Caminho das Formações', teste: { stat: ['comp', 'esp'], tag: 'formacao', ameaca: 'rival' },
        sucesso: { texto: 'Cada passo de {rival.nome} cai onde você previu. Quando {rival.ele} percebe, já está preso entre duas pedras, sem que ninguém precise ter encostado {rival.nele}. A seita aplaude o truque e teme o autor.', efeitos: [{ fato: ['rival', 'foi_preso_pela_formacao', 4] }, { opiniao: ['rival', -8] }, { reputacao: ['seita', 6] }], fx: { fama: 3, rec: 1, perfil: { astucia: 2 } } },
        falha: { texto: 'A pedra do canto está torta, e é só isso. A formação rateia, {rival.nome} pisa fora do desenho, e você tem de lutar sem {rival.ele}, com a vergonha de quem foi pego preparando o terreno.', efeitos: [{ fato: ['rival', 'viu_a_formacao_falhar', 2] }, { reputacao: ['seita', -3] }], fx: { ferida: 1, perfil: { astucia: 1 } } },
      },
    ],
  }),

  molde({
    id: 'rival_alianca',
    titulo: 'Um Inimigo em Comum',
    tipo: 'preparo',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: {
      rival: { pessoa: { papel: 'rival', vivo: true } },
      seita: { faccao: { de: 'rival' } },
      inimigo: { faccao: { inimigoDe: 'seita' } },
    },
    quando: { jogador: { reinoMin: 2 }, papel: { rival: { vivo: true } } },
    relevancia: [{ se: { papel: { rival: { opiniaoMax: -20 } } }, mais: 15 }, { se: { faccao: { inimigo: { estado: ['guerra', 'tensao'] } } }, mais: 25 }],
    fio: { id: 'rival', etapa: 4, abandono: 'Eles lutaram no mesmo lado uma vez, e depois fingiram que não.' },
    cena: 'Emissários da {inimigo.nome} aparecem às portas da {seita.nome} com um recado educado e uma lista de nomes. O seu está {rival.nele}, e o de {rival.nome} também. Os anciões não decidem nada, e o prazo corre. Na sombra de um corredor, {rival.nome} o encontra: "Vou ser direto. Sozinhos, nenhum de nós sai vivo. Juntos, talvez."',
    opcoes: [
      {
        id: 'trégua', texto: 'Propor uma trégua e dividir o plano, claro e por inteiro.',
        res: { texto: 'Vocês passam a noite desenhando o plano, e a desconfiança vai diminuindo a cada linha. De manhã, nenhum dos dois é amigo do outro, mas ambos têm uma linha de aliança que não existia antes.', efeitos: [{ fato: ['rival', 'aliados_de_ocasiao', 4] }, { opiniao: ['rival', 15] }, { reputacao: ['seita', 6] }, { q: ['alianca_rival', 1] }], fx: { stats: { car: 1 }, perfil: { compaixao: 1, disciplina: 1 } } },
      },
      {
        id: 'carta', texto: 'Aceitar, mas guardar uma carta na manga para si.',
        res: { texto: 'Você aceita tudo, concorda com tudo e esconde um detalhe que só você sabe. No final, funciona, e o detalhe te salva. Mas {rival.nome} sente, depois, que havia um espaço no plano que você não preencheu, e não pergunta, porque já sabe.', efeitos: [{ fato: ['rival', 'desconfia_do_jogador', 3] }, { opiniao: ['rival', 3] }, { q: ['alianca_rival', 1] }], fx: { fama: 2, perfil: { astucia: 2 } } },
      },
      {
        id: 'frente', texto: 'Deixar {rival.nome} ir na frente e se expor primeiro.', teste: { stat: ['sor', 'comp'], dif: 0 },
        sucesso: { texto: 'O ataque se concentra {rival.nele}, e você enxerga o fraco do inimigo enquanto {rival.ele} se distrai. Quando tudo acaba, {rival.nome} está de pé, ferido e furioso, e a dívida entre vocês agora tem outro nome.', efeitos: [{ fato: ['rival', 'foi_usado_como_isca', 5] }, { opiniao: ['rival', -22] }, { reputacao: ['seita', 4] }, { ferir: 'rival' }], fx: { fama: 2, karma: -2, perfil: { astucia: 1, ganancia: 1 } } },
        falha: { texto: 'O inimigo percebe a manobra e muda o alvo: o golpe cai em você, e {rival.nome} ainda tem tempo de olhar para você, com a certeza de quem acabou de ver o tamanho da sua alma. O resto é lembrança borrada de sangue e de dor.', efeitos: [{ fato: ['rival', 'viu_a_traicao_falhar', 5] }, { opiniao: ['rival', -25] }], fx: { ferida: 2, karma: -2, perfil: { astucia: 1 } } },
      },
      {
        id: 'sozinho', texto: 'Recusar a aliança e enfrentar a lista sozinh{jogador.o}.', teste: { stat: ['fis', 'dao'], dif: 2, ameaca: 'rival' },
        sucesso: { texto: 'Contra todas as apostas, você sobrevive, ferido e orgulhoso. {rival.nome} o encontra depois, com um olhar que não é de gratidão nem de raiva, e sim de respeito, o tipo que dói em quem o recebe.', efeitos: [{ fato: ['rival', 'viu_o_jogador_sozinho', 4] }, { opiniao: ['rival', 4] }, { reputacao: ['seita', 8] }], fx: { fama: 4, ferida: 1, stats: { dao: 2 }, perfil: { disciplina: 1, ambicao: 1 } } },
        falha: { texto: 'Você aguenta mais do que devia, e menos do que precisava. {rival.nome}, que ficou olhando de longe, acaba entrando na luta no último segundo, e a dívida que você queria evitar acaba tendo o dobro do tamanho.', efeitos: [{ fato: ['rival', 'salvou_o_jogador', 5] }, { opiniao: ['rival', 12] }], fx: { ferida: 2, perfil: { ambicao: 1 } } },
      },
    ],
  }),

  molde({
    id: 'rival_climax',
    titulo: 'O Último Duelo com {rival.nome}',
    tipo: 'climax',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { rival: { pessoa: { papel: 'rival', vivo: true } }, seita: { faccao: { de: 'rival' } } },
    quando: { papel: { rival: { vivo: true } } },
    relevancia: [{ se: { ambicao: { atual: ['superar_rival'] } }, mais: 40 }, { se: { papel: { rival: { objetivo: ['vingar', 'superar', 'expor'] } } }, mais: 20 }],
    combate: { oponente: 'cultivador', cenario: 'montanha' },
    fio: { id: 'rival', etapa: 5, abandono: 'Os dois envelheceram sem se encontrar de novo.' },
    cena: [
      { se: { papel: { rival: { fato: ['aliados_de_ocasiao'] } } }, texto: 'Vocês lutaram do mesmo lado uma vez, e nenhum dos dois esqueceu. Agora {rival.nome} espera no alto do desfiladeiro, sozinh{rival.o}, com a espada na bainha. "Aquela noite foi sincera", diz, "e esta também vai ser. Só que uma de nós tem de acabar."' },
      { texto: '{rival.nome} espera no alto do desfiladeiro, sozinh{rival.o}, com a espada na bainha. Os anos passaram, os reinos subiram, os nomes cresceram. O vento carrega as folhas secas entre vocês, e nenhum dos dois quer ser o primeiro a falar. {rival.Ele} fala: "Hoje eu fecho essa conta, de um jeito ou de outro."' },
    ],
    opcoes: [
      {
        id: 'poupar', texto: 'Enfrentá-lo com a intenção de poupar a vida {rival.dele}.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'rival' },
        sucesso: { texto: 'A espada {rival.dele} cai na terra. Você encosta a ponta da sua no chão, entre os dois, e a deixa lá. "Acabou", diz. {rival.nome} demora para entender, e mais ainda para aceitar. Mas aceita. O orgulho {rival.dele} não morreu, mas deixou de ser um problema seu.', efeitos: [{ fato: ['rival', 'foi_poupado', 5] }, { opiniao: ['rival', -6] }, { fio: ['rival', 'fechar:poupado'] }, { reputacao: ['seita', 8] }], fx: { fama: 5, karma: 2, perfil: { compaixao: 2, disciplina: 1 } } },
        falha: { texto: 'A espada {rival.dele} é mais rápida que a sua. Você cai de joelhos, com o sabor do ferro na boca, e {rival.nome} limpa a lâmina, devagar. "Não vale a pena matar você", diz, e é pior do que se tivesse matado.', efeitos: [{ fato: ['rival', 'venceu_o_ultimo_duelo', 5] }, { fio: ['rival', 'fechar:venceu'] }, { reputacao: ['seita', -6] }], fx: { ferida: 3, perfil: { disciplina: 1 } } },
      },
      {
        id: 'fim', texto: 'Enfrentá-lo até o fim, sem poupar.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'rival' },
        sucesso: { texto: 'Quando o último golpe cai, {rival.nome} ainda tenta dizer alguma coisa. Você nunca saberá o quê. A montanha engole o silêncio, e a vitória tem o peso de uma pedra no peito.', efeitos: [{ fato: ['rival', 'foi_morto_pelo_jogador', 5] }, { morte: 'rival', causa: 'o último duelo' }, { fio: ['rival', 'fechar:morto'] }, { reputacao: ['seita', 2] }], fx: { fama: 4, karma: -4, perfil: { violencia: 2 } } },
        falha: { texto: 'Você dá tudo, e {rival.nome} dá mais. Cair é a última coisa que você sente com clareza, e a primeira que você lembra quando acorda, muito depois, com o corpo remendado e o orgulho em pedaços.', efeitos: [{ fato: ['rival', 'venceu_o_ultimo_duelo', 5] }, { fio: ['rival', 'fechar:venceu'] }, { reputacao: ['seita', -8] }], fx: { ferida: 4, perfil: { violencia: 1 } } },
      },
      {
        id: 'mao_aberta', texto: 'Soltar a espada e estender a mão aberta: acabar com a rivalidade sem lutar.',
        requer: { jogador: { defeitoNao: ['orgulhoso'] }, papel: { rival: { opiniaoMin: -35 } } }, seloBloqueio: '{rival.Ele} ainda não esqueceu, ou você não consegue: o orgulho não deixa', teste: { stat: ['car', 'dao'], dif: 1 },
        sucesso: { texto: '{rival.nome} olha a mão, olha o seu rosto, e vê que não há truque. Solta a espada também, e o som do metal na terra parece o fim de uma longa frase. "Você é mais teimoso do que eu", diz. É o mais perto de um elogio que {rival.ele} já chegou.', efeitos: [{ fato: ['rival', 'aceitou_a_mao', 5] }, { opiniao: ['rival', 40] }, { fio: ['rival', 'fechar:reconciliado'] }, { reputacao: ['seita', 10] }], fx: { fama: 4, karma: 3, perfil: { compaixao: 2, devocao: 1 } } },
        falha: { texto: 'A sua mão fica no ar, e {rival.nome} dá um passo atrás, ofendido. "Isso é o que você acha de mim?" A espada {rival.dele} sai da bainha antes que você pegue a sua. A luta é curta, e desigual: você a perde de mãos abertas, e é a única vez em que isso parece justo.', efeitos: [{ fato: ['rival', 'recusou_a_mao_final', 5] }, { opiniao: ['rival', -20] }, { fio: ['rival', 'fechar:venceu'] }, { reputacao: ['seita', -4] }], fx: { ferida: 2, perfil: { compaixao: 1 } } },
      },
      {
        id: 'expor', texto: 'Contar diante de todos o que você sabe sobre a muleta {rival.dele}.',
        requer: { q: { rival_segredo: [1, undefined] } }, seloBloqueio: 'Você nunca descobriu o segredo {rival.dele}',
        res: { texto: 'Você fala, e cada palavra é um prego. {rival.nome} empalidece, e a seita inteira escuta. Quando termina, não há duelo: {rival.ele} perdeu o que tinha de mais precioso, que era a ideia que os outros faziam {rival.dele}. Você ganhou, e a vitória cheira a cinza.', efeitos: [{ fato: ['rival', 'foi_exposto', 5] }, { opiniao: ['rival', -35] }, { fio: ['rival', 'fechar:derrotado'] }, { reputacao: ['seita', -2] }], fx: { fama: 2, karma: -2, perfil: { astucia: 2 } } },
      },
    ],
  }),

  molde({
    id: 'rival_epilogo',
    titulo: 'O Que Sobrou da Rivalidade',
    tipo: 'consequencia',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { rival: { pessoa: { papel: 'rival' } } },
    quando: { fio: { rival: { resolvido: true } } },
    relevancia: [{ se: { fio: { rival: { resolvido: true } } }, mais: 60 }],
    cena: [
      { se: { fio: { rival: { desfecho: ['poupado'] } } }, texto: 'Meses depois, {rival.nome} deixa à sua porta uma lâmina nova, sem bilhete. Não é presente, nem pedido de desculpa, e sim uma forma muda de dizer que a dívida existe e que {rival.ele} sabe. Você a guarda ao lado da sua.' },
      { se: { fio: { rival: { desfecho: ['reconciliado'] } } }, texto: 'Os anos passam e as cartas começam. Curtas, secas, mas regulares: quem subiu, quem caiu, o que a seita disse de nós. {rival.nome} nunca diz que é seu amigo. Mas escreve, e isso, para {rival.ele}, é a mesma coisa.' },
      { se: { fio: { rival: { desfecho: ['morto'] } } }, texto: 'O funeral de {rival.nome} é pequeno e frio. Você vai, de longe. Uma mulher que você não conhece olha para você por muito tempo e depois desvia o olhar. Algumas vitórias deixam órfãos.' },
      { se: { fio: { rival: { desfecho: ['derrotado'] } } }, texto: '{rival.nome} deixou a seita sem se despedir. Dizem que foi para o norte, dizem que foi para o culto, dizem que desistiu do Dao. Você sente alívio e uma coisa pior, que não tem nome, quando vê o lugar vazio {rival.dele} no pátio.' },
      { texto: '{rival.nome} cresceu à sua frente: nome maior, reino mais alto, olhar de quem nunca olhou para trás. A seita fala {rival.dele} em tom de lenda, e de você em tom de nota de rodapé. Você aprendeu a conviver com isso, em silêncio, como se aprende a conviver com uma cicatriz.' },
    ],
    opcoes: [
      { id: 'fecha', texto: 'Aceitar o que o tempo decidiu.', requer: { ambicao: { atual: ['superar_rival'] } }, res: { texto: 'Alguns fios se resolvem no momento em que se fecham. Você sente o peso sair dos ombros, e percebe que a rivalidade era, em parte, o que o mantinha em movimento.', efeitos: [{ ambicao: 'cumprida' }, { reducaoTensao: 0.15 }], fx: { stats: { dao: 2 }, perfil: { disciplina: 1 } } } },
      { id: 'segue', texto: 'Seguir em frente.', requer: { nao: { ambicao: { atual: ['superar_rival'] } } }, res: { texto: 'A vida continua. O que foi dito não será dito de novo, e o que foi feito não será desfeito. Você carrega isso consigo, como se carrega o nome de alguém que existiu.', efeitos: [{ reducaoTensao: 0.1 }], fx: { stats: { dao: 1 } } } },
    ],
  }),
];
