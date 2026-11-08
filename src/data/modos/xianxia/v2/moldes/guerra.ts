import { molde, type Molde, type PapelDef } from '../../../../../engine/v2/tipos';

/**
 * Arco da Guerra entre Seitas (fio `guerra`): a convocação, escolher um lado, perder gente, o cerco, e o mapa depois.
 * A guerra muda o mundo de verdade: força das seitas, estado das facções, dono dos lugares.
 */
const LADOS: Record<string, PapelDef> = {
  seita: { faccao: { local: true } },
  inim: { faccao: { inimigoDe: 'seita' } },
  campo: { lugar: { dono: 'seita', tipo: ['patio', 'portao', 'pico', 'templo'] }, opcional: true },
};
const MEMBRO = { jogador: { flag: ['membro_seita'] } };

export const GUERRA: Molde[] = [
  molde({
    id: 'guerra_convocacao',
    titulo: 'A Convocação',
    tipo: 'virada',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...LADOS, anciao: { pessoa: { novo: true, criar: { traco: ['cauteloso', 'orgulhoso'], reino: 5, objetivo: 'proteger', faccao: 'seita' } } } },
    quando: { ...MEMBRO, jogador: { flag: ['membro_seita'], reinoMin: 3 }, faccao: { seita: { estado: ['paz', 'tensao'] } } },
    relevancia: [{ se: { faccao: { seita: { estado: ['tensao'] } } }, mais: 30 }, { se: { faccao: { inim: { forcaMin: 55 } } }, mais: 20 }],
    fio: { id: 'guerra', abre: true, abandono: 'A guerra anunciada nunca chegou aos portões, e a seita aprendeu a dormir mal por nada.' },
    cena: 'O sino da {seita.nome} toca três vezes seguidas, e não é dia de festa. No salão, o ancião {anciao.nome} lê uma carta da {inim.nome}: uma exigência, um prazo, uma ameaça de pouca elegância. "Teremos guerra", diz {anciao.ele}, sem gesto. "Antes, quero saber quem de vocês fica."',
    opcoes: [
      { id: 'ficar', texto: 'Dar um passo à frente: a seita é onde você mora.',
        res: { texto: 'O seu passo é seguido por outros, e o salão se enche do ruído de roupas que se mexem. {anciao.nome} assente. A voz volta mais firme: "Assim."', efeitos: [{ faccao: ['seita', 'guerra'] }, { faccao: ['inim', 'guerra'] }, { reputacao: ['seita', 8] }, { opiniao: ['anciao', 10] }, { q: ['guerra_lado_seita', 1] }, { noticia: 'A {seita.nome} e a {inim.nome} entraram em guerra.' }], fx: { fama: 2, perfil: { devocao: 2, disciplina: 1 } } } },
      { id: 'calar', texto: 'Ficar em silêncio e esperar para ver quem dá o passo primeiro.',
        res: { texto: 'Você é um dos que olha os pés. A seita se organiza, de qualquer forma, e a guerra começa sem exigir sua opinião. Fica um gosto estranho de quem aprendeu, tarde, que o silêncio também é uma posição.', efeitos: [{ faccao: ['seita', 'guerra'] }, { faccao: ['inim', 'guerra'] }, { reputacao: ['seita', -3] }, { q: ['guerra_neutro', 1] }], fx: { perfil: { cautela: 2 } } } },
      { id: 'dissuadir', texto: 'Pedir a palavra e propor negociar antes de qualquer lâmina.', teste: { stat: ['car', 'dao'], dif: 2 },
        sucesso: { texto: 'A sala escuta, contrariada. {anciao.nome} aceita enviar um emissário, e você parte como parte da comitiva. A negociação é longa, ofendida, quase quebrada. Mas termina com uma paz de papel, que não agrada a ninguém, e por isso mesmo funciona.', efeitos: [{ reputacao: ['seita', 12] }, { opiniao: ['anciao', 14] }, { fato: ['anciao', 'ouviu_o_jogador_pela_paz', 5] }, { fio: ['guerra', 'fechar:paz'] }, { faccao: ['inim', 'tensao'] }], fx: { fama: 4, karma: 3, perfil: { compaixao: 2, astucia: 2 } } },
        falha: { texto: 'A proposta é tomada por fraqueza, e ouvida com um riso curto. {anciao.nome} muda de assunto. O sino bate uma quarta vez, e é a guerra que responde.', efeitos: [{ faccao: ['seita', 'guerra'] }, { faccao: ['inim', 'guerra'] }, { reputacao: ['seita', -4] }, { opiniao: ['anciao', -5] }], fx: { perfil: { compaixao: 1 } } } },
    ],
  }),

  molde({
    id: 'guerra_lado',
    titulo: 'Escolher um Lado',
    tipo: 'personagem',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...LADOS, emissario: { pessoa: { novo: true, criar: { traco: ['curioso', 'generoso'], reino: 'jogador', objetivo: 'viver', faccao: 'seita' } } } },
    quando: { fio: { guerra: { aberto: true } }, faccao: { seita: { estado: ['guerra'] } } },
    relevancia: [{ se: { q: { guerra_neutro: [1, undefined] } }, mais: 30 }],
    fio: { id: 'guerra', etapa: 2, abandono: 'Você nunca escolheu de que lado ficar, e a guerra escolheu por você.' },
    cena: 'Na terceira semana de guerra, chega até você {emissario.nome}, vindo da {inim.nome}. Fala baixo, sem armas, e propõe uma coisa que nenhum general ouviria sem rir: que você passe para o outro lado, ou que, ao menos, deixe de ser obstáculo. "O senhor vê o que a seita não vê", diz {emissario.ele}. Talvez seja verdade. Talvez seja só adulação.',
    opcoes: [
      { id: 'lealdade', texto: 'Recusar, e entregar {emissario.ele} à seita.',
        res: { texto: '{emissario.nome} não resiste, e olha você com uma tristeza que parece prever tudo. A seita agradece, e a vingança do outro lado chega mais cedo do que o previsto. Lealdade é uma moeda cara, e o troco vem em feridas.', efeitos: [{ reputacao: ['seita', 12] }, { reputacao: ['inim', -12] }, { q: ['guerra_lado_seita', 1] }], fx: { fama: 2, karma: -1, perfil: { devocao: 2, disciplina: 1 } } } },
      { id: 'ouvir', texto: 'Ouvir a proposta inteira e não dar resposta.',
        res: { texto: 'A proposta tem pontos verdadeiros, e é isso que a faz perigosa. {emissario.nome} se despede com um sorriso e uma frase: "Pense." Você pensa, e o pensamento vira uma hóspede que se recusa a sair.', efeitos: [{ reputacao: ['inim', 5] }, { fato: ['emissario', 'foi_ouvido', 3] }, { q: ['guerra_dividido', 1] }], fx: { perfil: { astucia: 2 } } } },
      { id: 'passar', texto: 'Aceitar, e levar o que sabe sobre a {seita.nome}.',
        res: { texto: 'Atravessar a linha tem som de porta, e dura um instante. A {inim.nome} o recebe com cortesia, e a {seita.nome} com um bilhete: "Foi bom enquanto durou." Você tem um lado agora, e não é aquele em que nasceu. É estranho notar que a escolha é a mais leve que já fez e a mais pesada que vai carregar.', efeitos: [{ reputacao: ['seita', -30] }, { reputacao: ['inim', 25] }, { forca: ['seita', -6] }, { forca: ['inim', 6] }, { q: ['guerra_lado_inim', 1] }, { noticia: 'Um dos discípulos da {seita.nome} passou para a {inim.nome} levando segredos.' }], fx: { karma: -4, fama: 3, perfil: { astucia: 2, ambicao: 2 } } } },
    ],
  }),

  molde({
    id: 'guerra_perda',
    titulo: 'O Preço da Primeira Batalha',
    tipo: 'perigo',
    capitulos: ['ascensao', 'crise'],
    unico: true,
    papeis: { ...LADOS, amigo: { pessoa: { papel: 'amigo', vivo: true }, opcional: true } },
    quando: { fio: { guerra: { aberto: true, etapaMin: 2 } } },
    relevancia: [{ se: { fio: { guerra: { etapaMin: 2 } } }, mais: 40 }],
    combate: { oponente: 'cultivador', cenario: 'montanha' },
    fio: { id: 'guerra', etapa: 3, abandono: 'A primeira batalha nunca foi lutada por você, e foi ganha ou perdida sem a sua presença.' },
    cena: [
      { se: { papel: { amigo: { vivo: true } } }, texto: 'O vale entre a {seita.nome} e a {inim.nome} amanhece em fumaça. Você e {amigo.nome} correm, lado a lado, entre os que não voltarão. Quando chega a hora da carga, ouve o que vai ouvir para sempre: o som do aço, o som dos nomes, o som de quem escolheu não ser lembrado.' },
      { texto: 'O vale entre a {seita.nome} e a {inim.nome} amanhece em fumaça. Quando o sino toca, a linha avança, e você está no meio dos que avançam. Cada passo faz o ruído de uma decisão tomada por outro. Em algum ponto a linha se rompe, e você é de quem fica.' },
    ],
    opcoes: [
      { id: 'lutar', texto: 'Segurar a linha, custe o que custar.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 4 },
        sucesso: { texto: 'Você é um dos que seguram, e a história, mais tarde, lhe dá o nome de uma posição inteira. A linha aguenta, a carga fracassa, e o vale fica coberto de gente que ninguém terá tempo de enterrar. Há vitória, mas tem rosto de cansaço.', efeitos: [{ reputacao: ['seita', 14] }, { forca: ['seita', 3] }, { forca: ['inim', -4] }, { q: ['guerra_batalha_ganha', 1] }], fx: { fama: 5, xp: 30, perfil: { violencia: 2, disciplina: 2 } } },
        falha: { texto: 'A linha cede, e você é arrastado pela debandada. Corre sem saber onde, e quando a poeira baixa, descobre que está vivo por pouco e que perdeu mais do que a batalha. Em torno, o chão está cheio do que a fumaça escondia.', efeitos: [{ forca: ['seita', -5] }, { reputacao: ['seita', -2] }, { q: ['guerra_batalha_perdida', 1] }], fx: { ferida: 3, perfil: { disciplina: 1 } } } },
      { id: 'proteger', texto: 'Largar a linha e proteger {amigo.nome}, que caiu.', requer: { papel: { amigo: { vivo: true } } }, selo: 'Amigo em perigo',
        res: { texto: 'Você carrega {amigo.nome} nas costas por oitocentos passos, sem soltar, sem parar. Atrás, a linha rompe e se refaz sem você. Quando larga o corpo, tem a respiração de quem correu a vida inteira. {amigo.nome} abre os olhos e diz: "Você não devia." Mas diz sorrindo.', efeitos: [{ opiniao: ['amigo', 25] }, { fato: ['amigo', 'foi_salvo_na_guerra', 5] }, { reputacao: ['seita', -4] }, { q: ['guerra_batalha_perdida', 1] }], fx: { ferida: 2, karma: 3, perfil: { compaixao: 2, devocao: 2 } } } },
      { id: 'fugir', texto: 'Recuar antes que seja tarde.',
        res: { texto: 'Recuar parece fácil, e a vergonha chega junto. Você vive, e vive com a imagem dos que ficaram. Nos corredores da seita, passa a haver olhares que sabem, e olhares que não sabem, e são os que não sabem que doem menos.', efeitos: [{ reputacao: ['seita', -10] }, { forca: ['seita', -3] }, { q: ['guerra_batalha_perdida', 1] }], fx: { perfil: { cautela: 2 } } } },
    ],
  }),

  molde({
    id: 'guerra_cerco',
    titulo: 'O Cerco',
    tipo: 'climax',
    capitulos: ['ascensao', 'crise', 'legado'],
    unico: true,
    papeis: { ...LADOS },
    quando: { fio: { guerra: { aberto: true, etapaMin: 3 } } },
    relevancia: [{ se: { fio: { guerra: { etapaMin: 3 } } }, mais: 55 }],
    combate: { oponente: 'cultivador', cenario: 'montanha' },
    fio: { id: 'guerra', etapa: 4, abandono: 'O cerco foi levantado sem que ninguém entendesse por quê, e as duas seitas aprenderam a se odiar em silêncio.' },
    cena: [
      { se: { q: { guerra_lado_inim: [1, undefined] } }, texto: 'A {seita.nome} está cercada, e é você quem conhece cada porta, cada rotina, cada fraqueza. O comandante da {inim.nome} aponta o mapa, e espera que você escolha onde entrar. O mapa tem o seu rosto desenhado em volta. Você nunca foi tão útil, nem tão sozinho.' },
      { se: { q: { guerra_batalha_ganha: [1, undefined] } }, texto: 'A {inim.nome} vem com toda a força, depois de meses de derrotas, e cerca a {seita.nome} numa manhã sem vento. Os muros aguentam. O alimento, não. Você é um dos nomes que todos olham quando perguntam quem ainda tem uma ideia.' },
      { texto: 'A {inim.nome} fecha o cerco sobre a {seita.nome}, e a fome chega antes do aço. Cada dia, há menos gente nos corredores e mais em silêncio. O ancião reúne os que restam, e diz: "Ou rompemos, ou nos rendemos. Decidam."' },
    ],
    opcoes: [
      { id: 'romper', texto: 'Liderar um rompimento do cerco, de madrugada.', teste: { stat: ['fis', 'dao'], tag: 'combate', ameaca: 5 },
        sucesso: { texto: 'A madrugada é um rumor de pés. Os da frente caem, os de trás passam. Quando o sol sobe, a {seita.nome} ainda está de pé, e a {inim.nome} recua com a pressa de quem calcula perdas. A guerra não acabou, mas acabou para você, e o seu nome será gritado nos pátios por gerações.', efeitos: [{ reputacao: ['seita', 20] }, { forca: ['seita', 6] }, { forca: ['inim', -10] }, { faccao: ['inim', 'tensao'] }, { fio: ['guerra', 'fechar:vitoria'] }, { noticia: 'A {inim.nome} levantou o cerco da {seita.nome}. Dizem que um nome fez a diferença.' }], fx: { fama: 8, xp: 50, perfil: { violencia: 2, ambicao: 2, disciplina: 1 } } },
        falha: { texto: 'O rompimento é descoberto no primeiro passo. A madrugada vira dia de fogo. Poucos escapam; você é um deles, e isso pesa mais do que se não tivesse escapado. A {seita.nome} é tomada, e as chaves mudam de mão em silêncio.', efeitos: [{ reputacao: ['seita', -10] }, { forca: ['seita', -14] }, { forca: ['inim', 8] }, { fio: ['guerra', 'fechar:derrota'] }, { noticia: 'A {seita.nome} caiu. Os poucos que fugiram levam o seu nome pelo mundo como quem leva uma ferida.' }], fx: { ferida: 4, fama: 1, perfil: { disciplina: 1 } } } },
      { id: 'render', texto: 'Propor a rendição honrada, antes que morra mais gente.', teste: { stat: ['car', 'dao'], dif: 2 },
        sucesso: { texto: 'A rendição é aceita, com condições duras e pouquíssimo sangue. A {seita.nome} passa a pagar tributo, e seus discípulos continuam vivos para um dia reconstruir. Há quem o chame de covarde. Há quem lhe deva a vida.', efeitos: [{ reputacao: ['seita', 6] }, { forca: ['seita', -6] }, { forca: ['inim', 4] }, { faccao: ['inim', 'paz'] }, { faccao: ['seita', 'paz'] }, { fio: ['guerra', 'fechar:paz'] }], fx: { karma: 4, fama: 3, perfil: { compaixao: 2, astucia: 2 } } },
        falha: { texto: 'A proposta é rejeitada com desprezo. O cerco aperta, e a decisão fica de novo nas mãos dos que ainda têm força. O tempo corre, a comida acaba, e a última escolha é ainda pior que a primeira.', efeitos: [{ reputacao: ['seita', -4] }], fx: { perfil: { compaixao: 1 } } } },
      { id: 'abrir', texto: 'Abrir o portão a quem deveria ser inimigo.', requer: { q: { guerra_lado_inim: [1, undefined] } }, selo: 'Passou para o outro lado',
        res: { texto: 'O portão se abre com um rangido que parece um suspiro. Entram sem pressa, sem grito, e a {seita.nome} cai como um prédio velho que ninguém escorou. Você fica no pátio enquanto a história muda de mãos. Quando o último cativo passa, ninguém o olha nos olhos.', efeitos: [{ reputacao: ['seita', -40] }, { reputacao: ['inim', 30] }, { forca: ['seita', -20] }, { forca: ['inim', 12] }, { faccao: ['seita', 'extinta'] }, { fio: ['guerra', 'fechar:traicao'] }, { noticia: 'A {seita.nome} deixou de existir. Dizem que o portão foi aberto por dentro.' }], fx: { fama: 5, karma: -8, perfil: { ambicao: 3, astucia: 2 } } } },
    ],
  }),

  molde({
    id: 'guerra_epilogo',
    titulo: 'O Mapa Depois da Guerra',
    tipo: 'consequencia',
    capitulos: ['crise', 'legado'],
    unico: true,
    papeis: { ...LADOS },
    quando: { fio: { guerra: { resolvido: true } } },
    relevancia: [{ se: { fio: { guerra: { resolvido: true } } }, mais: 55 }],
    cena: [
      { se: { fio: { guerra: { desfecho: ['vitoria'] } } }, texto: 'A {seita.nome} sai da guerra menor e mais dura. Nos pátios, os nomes de quem caiu são lidos em voz alta toda estação. Você aprende que uma vitória também tem luto, e que o luto é parte do que a sustenta.' },
      { se: { fio: { guerra: { desfecho: ['derrota', 'traicao'] } } }, texto: 'O mapa mudou: onde havia uma seita, há agora um nome em memória, e os caminhos que levavam a ela se desfazem de ervas. Gente que você conhecia está em outros lugares, e alguns não estão em nenhum.' },
      { se: { fio: { guerra: { desfecho: ['paz'] } } }, texto: 'A paz que ficou não agrada a ninguém, e por isso mesmo se sustenta. Ninguém comemora. As seitas fingem cortesia, os mercados reabrem, e os que perderam alguém aprendem a viver com a pergunta de qual teria sido a alternativa.' },
      { texto: 'A guerra terminou do jeito que as guerras terminam: sem que ninguém fosse capaz de dizer quando. O que mudou foi o mapa e o jeito de olhar quem passa na estrada.' },
    ],
    opcoes: [
      { id: 'segue', texto: 'Seguir em frente.', res: { texto: 'O mundo cicatriza sem pedir licença, e a memória, como sempre, vai atrás.', efeitos: [], fx: {} } },
    ],
  }),
];
