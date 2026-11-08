import { molde, type Molde } from '../../../../../engine/v2/tipos';

/**
 * Sucessão e rotatividade: quando os fios da juventude se fecham, o mundo traz gente nova.
 * O herdeiro do rival morto, o jovem prodígio que pede para ser discípulo, e os perigos da maturidade.
 */
export const SUCESSAO: Molde[] = [
  molde({
    id: 'suc_herdeiro',
    titulo: 'Quem Veio no Lugar de {rival.nome}',
    tipo: 'perigo',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: {
      rival: { pessoa: { papel: 'rival', vivo: false } },
      herdeiro: { pessoa: { novo: true, criar: { traco: ['rancoroso', 'orgulhoso'], reino: 'jogador', objetivo: 'vingar', faccao: 'seita' } } },
    },
    quando: { papel: { rival: { vivo: false, fato: ['foi_morto_pelo_jogador'] } }, jogador: { reinoMin: 3 } },
    relevancia: [{ se: { papel: { rival: { vivo: false } } }, mais: 35 }],
    combate: { oponente: 'cultivador', cenario: 'montanha' },
    fio: { id: 'herdeiro', abre: true, abandono: 'O herdeiro de {rival.nome} nunca chegou a fazer a pergunta.' },
    cena: '{herdeiro.Um} {herdeiro.jovem} chega à sua porta numa tarde fria, de capa gasta e olhar de quem passou anos ensaiando a frase. {herdeiro.nome}, diz o nome {herdeiro.dele}, e acrescenta: "Meu pai se chamava {rival.nome}." O ar muda. {herdeiro.Ele} não traz arma à vista. Não precisa: o que {herdeiro.ele} traz é uma lembrança, e uma pergunta que cabe numa única palavra: por quê.',
    opcoes: [
      { id: 'enfrentar', texto: 'Aceitar o duelo que {herdeiro.ele} veio pedir.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'herdeiro' },
        sucesso: { texto: 'O duelo é mais curto do que {herdeiro.ele} esperava e mais longo do que você queria. Quando a espada {herdeiro.dele} cai, {herdeiro.ele} não chora: encara você com o olhar de quem acaba de aprender uma coisa que não queria saber. Você {herdeiro.o} poupa, sem dizer nada, e {herdeiro.ele} parte sem agradecer. Há dívidas que só passam de pai para {herdeiro.filho}.', efeitos: [{ fato: ['herdeiro', 'foi_poupada', 4] }, { opiniao: ['herdeiro', -10] }, { fio: ['herdeiro', 'fechar:poupada'] }], fx: { fama: 2, karma: -1, perfil: { violencia: 1 } } },
        falha: { texto: '{herdeiro.Ele} é mais rápid{herdeiro.o} do que o pai, e mais rancoros{herdeiro.o}. Você acorda dias depois, com um curativo mal feito e uma carta ao lado da cama: "Eu podia ter terminado. Escolhi não terminar. Agora estamos quites, e isso me enoja." {herdeiro.Ele} nunca voltou.', efeitos: [{ fato: ['herdeiro', 'poupou_o_jogador', 5] }, { opiniao: ['herdeiro', -6] }, { fio: ['herdeiro', 'fechar:vencedora'] }], fx: { ferida: 3, perfil: { disciplina: 1 } } } },
      { id: 'verdade', texto: 'Contar a {herdeiro.ele}, inteira, a história do pai: o que {rival.ele} fez, o que você fez.', teste: { stat: ['car', 'dao'], dif: 1 },
        sucesso: { texto: '{herdeiro.Ele} escuta até o fim, sem interromper, com os punhos fechados sobre os joelhos. Quando você acaba, não diz que perdoa. Diz: "Eu precisava ouvir." Vai embora devagar, e a rivalidade, que parecia herança, vira apenas história, o que é bem mais leve.', efeitos: [{ fato: ['herdeiro', 'ouviu_a_verdade', 5] }, { opiniao: ['herdeiro', 18] }, { fio: ['herdeiro', 'fechar:perdoada'] }], fx: { karma: 3, perfil: { compaixao: 2, devocao: 1 } } },
        falha: { texto: 'As palavras saem torcidas, e {herdeiro.ele} só ouve o que quer: que o pai foi morto. A raiva volta, mais limpa, com a pureza de uma certeza. "Mentiros{herdeiro.o}", diz, e se vai. Você sabe que {herdeiro.ele} vai voltar, e que dessa vez, não vai perguntar.', efeitos: [{ fato: ['herdeiro', 'nao_acreditou', 4] }, { opiniao: ['herdeiro', -20] }, { objetivo: ['herdeiro', 'cacar'] }], fx: { perfil: { compaixao: 1 } } } },
      { id: 'legado', texto: 'Entregar a {herdeiro.ele} o que {rival.nome} tinha de mais valioso, e que você guardou.', requer: { jogador: { pedrasMin: 1 } },
        res: { texto: 'É uma lâmina simples, com uma marca de família no cabo, que você guardou sem saber por quê. {herdeiro.Ele} a segura em silêncio, e o peso certo da arma na mão {herdeiro.dele} diz mais que qualquer discurso. "Eu não perdoo", diz, "mas eu sei que {rival.ele} existiu." É o mais perto de paz que a vida deixa.', efeitos: [{ fato: ['herdeiro', 'recebeu_a_lamina_do_pai', 5] }, { opiniao: ['herdeiro', 12] }, { fio: ['herdeiro', 'fechar:reconciliada'] }], fx: { karma: 2, perfil: { compaixao: 2 } } } },
      { id: 'recusar', texto: 'Recusar-se a falar, e mandar que {herdeiro.ele} volte quando tiver paz.', res: { texto: 'A porta se fecha com o som de uma decisão. Lá fora, {herdeiro.o} {herdeiro.jovem} fica um tempo, parada, e depois some na estrada. A paz que você pediu não vem, e a pergunta, sem resposta, vira ferro.', efeitos: [{ fato: ['herdeiro', 'foi_dispensada', 4] }, { opiniao: ['herdeiro', -15] }, { objetivo: ['herdeiro', 'cacar'] }, { fio: ['herdeiro', 'fechar:rancor'] }], fx: { perfil: { cautela: 1, violencia: 1 } } } },
    ],
  }),

  molde({
    id: 'suc_prodigio',
    titulo: 'Um Jovem Que Se Parece Com Você',
    tipo: 'personagem',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { jovem: { pessoa: { desconhecido: true, idadeMax: 32, reinoMin: 1, idadeDif: [-200, -25] } } },
    quando: { jogador: { reinoMin: 3 } },
    relevancia: [{ se: { ambicao: { sem: true } }, mais: 15 }, { se: { q: { mestre_morto: [1, undefined] } }, mais: 20 }],
    fio: { id: 'discipulo', abre: true, abandono: 'O jovem foi procurar outro mestre, e nunca soube o que quase foi.' },
    cena: [
      { se: { q: { mestre_morto: [1, undefined] } }, texto: 'Um jovem, {jovem.nome}, espera à sua porta há três dias, sem pedir nada, dormindo encostado na parede. Quando você pergunta quem o mandou, {jovem.ele} responde: "Ninguém. Ouvi falar de você." Há {jovem.nele} uma teimosia que você reconhece, e uma coisa mais antiga: {jovem.ele} se parece, em alguma coisa, com você, e com quem ensinou você.' },
      { texto: 'Um jovem, {jovem.nome}, espera à sua porta há três dias, sem pedir nada, dormindo encostado na parede. Quando você pergunta quem o mandou, {jovem.ele} responde: "Ninguém. Ouvi falar de você." Há {jovem.nele} uma teimosia que você reconhece, de outro tempo.' },
    ],
    opcoes: [
      { id: 'aceitar', texto: 'Aceitá-lo como discípulo.', res: { texto: '{jovem.nome} abaixa a cabeça, e o gesto é de alívio, não de humildade. "Obrigad{jovem.o}, mestre." Você ouve a palavra pela primeira vez dirigida a você, e algo antigo se mexe: a vida, de repente, tem um peso novo, e uma direção que não é só sua.', efeitos: [{ papel: ['jovem', 'discipulo'] }, { opiniao: ['jovem', 22] }, { fato: ['jovem', 'foi_aceito', 5] }, { inclinar: ['proteger', 2] }], fx: { karma: 1, perfil: { compaixao: 1, disciplina: 1 } } } },
      { id: 'testar', texto: 'Pôr o jovem à prova antes de decidir.', teste: { stat: ['car', 'comp'], dif: 0 },
        sucesso: { texto: 'A prova é simples: uma tarefa feia, num dia feio, sem testemunha. {jovem.nome} cumpre sem reclamar e sem esperar elogio. No fim, você já sabia a resposta, mas o jovem ainda não sabia a pergunta. É aceito, e agora, com razão.', efeitos: [{ papel: ['jovem', 'discipulo'] }, { opiniao: ['jovem', 18] }, { fato: ['jovem', 'passou_na_prova', 5] }], fx: { stats: { comp: 1 }, perfil: { disciplina: 1, astucia: 1 } } },
        falha: { texto: '{jovem.nome} cumpre a tarefa, mas com um sorriso torto que você não gosta. Você aceita assim mesmo, com um aviso silencioso para si, e a sensação de que acabou de convidar alguém que talvez não entenda o preço da porta.', efeitos: [{ papel: ['jovem', 'discipulo'] }, { opiniao: ['jovem', 8] }, { fato: ['jovem', 'sorriu_na_prova', 3] }], fx: { perfil: { cautela: 1 } } } },
      { id: 'recusar', texto: 'Recusar: você não tem nada para ensinar.', res: { texto: '{jovem.nome} escuta, assente, e se levanta sem protesto. "Entendo." No olhar {jovem.dele} há um respeito curioso por quem recusa, e um desafio por quem não ensina. {jovem.Ele} se afasta pela estrada, e você sabe que o encontrará outra vez, em outro lugar, com outra cara.', efeitos: [{ opiniao: ['jovem', -4] }, { fato: ['jovem', 'foi_recusado', 3] }, { fio: ['discipulo', 'fechar:recusado'] }], fx: { perfil: { cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'suc_discipulo_erro',
    titulo: 'O Erro de {discipulo.nome}',
    tipo: 'perigo',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { discipulo: { pessoa: { papel: 'discipulo', vivo: true } }, seita: { faccao: { local: true }, opcional: true } },
    quando: { papel: { discipulo: { vivo: true } } },
    fio: { id: 'discipulo', etapa: 2, abandono: 'O erro do discípulo ficou sem resposta, e {discipulo.ele} aprendeu sozinho o que ninguém ensinou.' },
    cena: 'A notícia chega pela boca de um ancião preocupado: {discipulo.nome}, por orgulho ou por descuido, quebrou um artefato precioso de uma seita vizinha, feriu um colega ou roubou uma pílula (as versões se contradizem). Os anciões pedem uma decisão. Todos olham para você, o mestre.',
    opcoes: [
      { id: 'culpa', texto: 'Assumir a culpa e pagar por {discipulo.ele}.', res: { texto: '{discipulo.nome} chora, e jura nunca mais. A seita admira ou despreza, em partes iguais, e as duas atitudes servem ao mesmo propósito: fazem {discipulo.dele} um aprendiz atento. A lealdade {discipulo.dele}, a partir daí, é de ferro.', efeitos: [{ opiniao: ['discipulo', 25] }, { fato: ['discipulo', 'foi_defendido', 5] }, { reputacao: ['seita', -4] }], fx: { pedras: -30, karma: 2, perfil: { compaixao: 2, devocao: 1 } } } },
      { id: 'punir', texto: 'Puni-lo duramente, para dar exemplo.', res: { texto: 'A seita aprova. {discipulo.nome} aprende, mas algo se quebra entre vocês, e a quebra não cola. Há lições que se ensinam melhor com uma mão do que com um cajado.', efeitos: [{ opiniao: ['discipulo', -15] }, { fato: ['discipulo', 'foi_punido', 4] }, { reputacao: ['seita', 5] }], fx: { fama: 2, perfil: { disciplina: 2 } } } },
      { id: 'ensinar', texto: 'Fazê-lo reparar o dano com as próprias mãos, e ficar ao lado até terminar.', teste: { stat: ['car', 'dao'], dif: 0 },
        sucesso: { texto: 'Quarenta dias, de pé ao lado {discipulo.dele}, sem ajudar e sem sair. No último, {discipulo.nome} diz, sem olhar: "Eu entendi." Não precisou de mais. A reparação não foi perfeita, mas a lição sim.', efeitos: [{ opiniao: ['discipulo', 20] }, { fato: ['discipulo', 'reparou_o_erro', 5] }, { reputacao: ['seita', 4] }], fx: { karma: 1, stats: { dao: 1 }, perfil: { disciplina: 2, compaixao: 1 } } },
        falha: { texto: 'A reparação sai torta, e a paciência acaba antes. {discipulo.nome} larga as ferramentas e diz uma coisa que não pode ser desdita. A seita, calada, vê o fim de uma relação que ainda tinha futuro.', efeitos: [{ opiniao: ['discipulo', -8] }, { fato: ['discipulo', 'largou_o_trabalho', 3] }], fx: { perfil: { disciplina: 1 } } } },
    ],
  }),

  molde({
    id: 'suc_discipulo_supera',
    titulo: '{discipulo.nome} Supera o Mestre',
    tipo: 'climax',
    capitulos: ['crise', 'legado'],
    unico: true,
    papeis: { discipulo: { pessoa: { papel: 'discipulo', vivo: true } }, seita: { faccao: { local: true }, opcional: true } },
    quando: { papel: { discipulo: { vivo: true, reinoDif: [-9, 0] } } },
    relevancia: [{ se: { papel: { discipulo: { opiniaoMin: 20 } } }, mais: 25 }],
    fio: { id: 'discipulo', etapa: 3, abandono: 'O discípulo seguiu viagem sem que ninguém dissesse se tinha passado.' },
    cena: 'Um dia, sem aviso, {discipulo.nome} chega ao seu pavilhão com o Qi de um reino que você demorou décadas a alcançar. Não há arrogância na chegada, só uma atenção estranha, de quem sabe o que acabou de acontecer e não sabe se deve dizer. Você percebe, primeiro no corpo e depois na cabeça, que o discípulo passou o mestre.',
    opcoes: [
      { id: 'celebrar', texto: 'Celebrar, em voz alta, diante de todos: {discipulo.ele} foi além.', res: { texto: 'A seita inteira escuta. {discipulo.nome} fica sem graça, e depois, devagar, sorri. Há uma felicidade quieta em ensinar alguém a ser maior que você, e você a sente agora, com a surpresa de quem nunca imaginou que {discipulo.ele} existisse.', efeitos: [{ opiniao: ['discipulo', 25] }, { fato: ['discipulo', 'foi_celebrado', 5] }, { fio: ['discipulo', 'fechar:legado'] }, { reputacao: ['seita', 8] }], fx: { fama: 3, karma: 3, perfil: { compaixao: 2, devocao: 2 } } } },
      { id: 'calar', texto: 'Cumprimentá-lo em silêncio, e engolir a inveja sem dizer o nome {discipulo.dele}.', res: { texto: 'A inveja é pequena e dura, como um caroço. Você a engole, e {discipulo.ele} não vai embora, mas fica quieta. {discipulo.nome} percebe, e não comenta. Há respeitos que não precisam de palavras, e ausências que só falam por elas.', efeitos: [{ opiniao: ['discipulo', 8] }, { fato: ['discipulo', 'viu_a_inveja', 3] }, { fio: ['discipulo', 'fechar:legado'] }], fx: { stats: { dao: 1 }, perfil: { disciplina: 1, cautela: 1 } } } },
      { id: 'desafiar', texto: 'Pedir um duelo, para medir o tamanho do que mudou.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 'discipulo' },
        sucesso: { texto: 'O duelo é bonito, longo, e justo. No fim, você vence por um fio, e os dois sabem que foi o último. {discipulo.nome} abaixa a cabeça, e você, com a mão no ombro {discipulo.dele}, diz: "Agora vá." {discipulo.Ele} vai.', efeitos: [{ opiniao: ['discipulo', 15] }, { fato: ['discipulo', 'perdeu_por_um_fio', 4] }, { fio: ['discipulo', 'fechar:legado'] }], fx: { fama: 3, perfil: { disciplina: 1, ambicao: 1 } } },
        falha: { texto: 'O discípulo vence, sem alarde. Quando você se levanta, {discipulo.ele} já está de joelhos, com o rosto de quem queria muito não ter ganhado. "Perdão, mestre." Você ri, com o ar de quem acaba de ganhar o que perdeu: uma razão para parar de ter medo.', efeitos: [{ opiniao: ['discipulo', 22] }, { fato: ['discipulo', 'venceu_o_mestre', 5] }, { fio: ['discipulo', 'fechar:legado'] }], fx: { ferida: 1, karma: 1, perfil: { compaixao: 1, devocao: 1 } } } },
    ],
  }),

  molde({
    id: 'morte_discipulo',
    titulo: 'A Morte de {morto.nome}',
    tipo: 'consequencia',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { morto: { pessoa: { papel: 'discipulo', vivo: false } } },
    quando: { papel: { morto: { semFato: ['velado'], vivo: false } } },
    cena: '{morto.nome}, o discípulo que você aceitou, morreu: a causa foi {morto.causa}. A ordem natural das coisas era outra, e você a sente quebrada, como uma frase dita ao contrário. O pavilhão, de repente, tem uma cadeira a mais, e ninguém sabe o que fazer com {morto.ele}.',
    opcoes: [
      { id: 'velar', texto: 'Velar o corpo, e guardar o que {morto.ele} deixou.', res: { texto: 'Você fica até o fim, e ninguém lhe pede para sair. Entre os pertences {morto.dele}, há uma folha com um desenho de técnica que {morto.ele} nunca mostrou, e uma frase, na margem, dirigida a você. Você a guarda, e não a lê até o outro dia.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['discipulo', 'fechar:morto'] }, { reducaoTensao: 0.2 }], fx: { karma: 2, stats: { dao: 2 }, perfil: { compaixao: 2, devocao: 1 } } } },
      { id: 'continuar', texto: 'Prometer a si mesmo ensinar melhor o próximo.', res: { texto: 'A promessa é um peso novo, e útil. Você vai ser mais atento, mais paciente, mais cuidadoso, e a dor do que não pôde salvar vira régua do que ainda pode.', efeitos: [{ fato: ['morto', 'velado', 1] }, { fio: ['discipulo', 'fechar:morto'] }, { inclinar: ['proteger', 2] }], fx: { stats: { comp: 1 }, perfil: { disciplina: 2 } } } },
    ],
  }),
];
