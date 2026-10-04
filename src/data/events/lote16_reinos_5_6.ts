import type { GameEvent } from '../../types';

/**
 * Lote 16 — Reinos 5 e 6 (Transformação Divina / Transcendente; Refino do Vazio / Além dos Limites).
 * Fase da vida: guerras entre seitas e política continental (5); assuntos de outros planos (6).
 * Poderes em escolhas: avatar e mil formas (5), atravessar o vazio e primeiro domínio (6).
 */
export const lote16Reinos56: GameEvent[] = [
  /* ================= REINO 5: GUERRAS E CONTINENTE ================= */
  {
    id: 'r5_comando_alianca', title: 'O Comando da Aliança', rarity: 'raro', cooldown: 80, weight: 1.6, escala: true,
    cond: { tierMin: 5, tierMax: 6 },
    text: 'Cinco seitas se aliam contra uma ameaça comum e precisam de um general. Seu nome sai na primeira votação: ninguém ali tem mais anos de lâmina, e ninguém quer a culpa por uma derrota. Os estandartes diferentes vão se erguer sobre uma mesma colina.',
    choices: [
      { text: 'Aceitar o comando e conduzir a campanha.', check: { stat: ['car', 'comp', 'dao'], dif: 1 }, ok: { text: 'A aliança funciona como um corpo só. Em três estações, a ameaça cai. Seu nome entra para os anais dos continentes.', fx: { fama: 20, karma: 4, pedras: 300, xp: 6, stats: { car: 2, comp: 1 } } }, fail: { text: 'A aliança racha na segunda estação. Você salva o que dá, e a retirada é lembrada com amargura.', fx: { fama: -4, ferida: 2, stats: { dao: 1 } } } },
      { text: 'Recusar o comando e aceitar um papel de conselheiro.', res: { text: 'Um general mais jovem assume a frente. Você aconselha de longe, e a campanha termina com menos glória e menos erros.', fx: { fama: 8, karma: 3, stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'r5_avatar', title: 'Em Dois Lugares ao Mesmo Tempo', rarity: 'comum', cooldown: 60, weight: 1.4,
    cond: { tierMin: 5, tierMax: 7 },
    text: 'Seu primeiro avatar de Qi sai do corpo com um sopro e abre os olhos três cordilheiras além. Você sente o peso do corpo original e a leveza do outro, como lados de uma mesma moeda.',
    choices: [
      { text: 'Enviar o avatar a uma cerimônia, enquanto o corpo cultiva.', res: { text: 'A cerimônia acontece com sua presença e sem seu cansaço. Quando o avatar volta, traz a memória inteira, como se fosse seu.', fx: { fama: 6, xp: 8, stats: { comp: 1 } } } },
      { text: 'Usar o avatar como isca num esconderijo inimigo.', check: { stat: ['esp', 'comp'], dif: 1, tag: 'mente' }, ok: { text: 'O avatar é destruído de propósito, depois de revelar a localização do inimigo. Você ri, sozinho, no meio da noite.', fx: { fama: 6, karma: -1, stats: { comp: 2, esp: 1 }, pedras: 120 } }, fail: { text: 'A destruição do avatar o feriu de volta. A alma treme por semanas.', fx: { ferida: 2, stats: { esp: 1 } } } },
      { text: 'Fundir o avatar de volta ao corpo, sem uso.', res: { text: 'A volta é suave. Você sente, uns segundos, a mente em dobro, e aprende o gosto de ser apenas um.', fx: { stats: { dao: 2 }, xp: 4 } } },
    ],
  },
  {
    id: 'r5_desafio_patriarca', title: 'O Desafio do Patriarca Vizinho', rarity: 'raro', cooldown: 80, weight: 1.4, escala: true,
    cond: { tierMin: 5, tierMax: 7, fameMin: 40 },
    text: 'Um patriarca de uma seita vizinha envia uma carta de duelo, em papel preto e tinta dourada. "Dois nomes grandes demais para um só continente", diz. "Que o monte decida." A carta chega junto com uma multidão que já aposta em quem cai primeiro.',
    choices: [
      { text: 'Aceitar o duelo no monte.', check: { stat: ['fis', 'esp', 'dao'], dif: 2, tag: 'combate' }, ok: { text: 'A luta dura sete dias e uma noite. Ao fim, ele cai de joelhos, e você, de pé, o ajuda a levantar. A lenda é de ambos.', fx: { fama: 22, karma: 3, xp: 10, stats: { dao: 2, fis: 1 } } }, fail: { text: 'Você perde, por um golpe. Ele o poupa, o que é pior que a derrota.', fx: { fama: -6, ferida: 3, stats: { dao: 2 } } } },
      { text: 'Recusar com cortesia e propor uma troca de ensinamentos.', check: { stat: ['car', 'dao'], dif: 1 }, ok: { text: 'O rival aceita, perplexo. Duas seitas passam a trocar discípulos, e a rivalidade, aos poucos, vira estima.', fx: { fama: 12, karma: 7, stats: { car: 2, comp: 1 } } }, fail: { text: 'O rival entende como covardia. A cidade inteira ri, por um tempo.', fx: { fama: -5, karma: 1 } } },
    ],
  },
  {
    id: 'r5_tributo_dos_reinos', title: 'O Tributo dos Reinos Mortais', rarity: 'comum', cooldown: 60, weight: 1.2,
    cond: { tierMin: 5, tierMax: 7 },
    text: 'Três reinos mortais lhe oferecem tributo anual em troca de proteção. Em seus domínios, ninguém ousaria atacá-los sem pensar em você. O ouro vem em carroças, e as promessas, em pergaminhos.',
    choices: [
      { text: 'Aceitar o tributo e proteger os reinos.', res: { text: 'As carroças chegam pontuais. Os reinos prosperam sob a sua sombra, e os rivais, cautelosos, olham para o outro lado.', fx: { pedras: 500, fama: 8, karma: 1, setFlags: ['tributo_dos_reinos'] } } },
      { text: 'Recusar: ser deus não é seu ofício.', res: { text: 'Os reis, surpresos, enviam apenas presentes simbólicos. Uma estátua sua é erguida, mesmo assim, numa praça. Você finge nunca ter visto.', fx: { karma: 6, fama: 5, stats: { dao: 2 } } } },
      { text: 'Aceitar o tributo, mas exigir que seja usado em hospitais e escolas.', res: { text: 'O ouro vira remédio e livros. Daqui a cem anos, ninguém vai saber por quê, mas as crianças daquele reino lerão melhor.', fx: { karma: 10, fama: 10, pedras: 150 } } },
    ],
  },
  {
    id: 'r5_cerco_fortaleza', title: 'O Cerco à Fortaleza de Jade', rarity: 'raro', cooldown: 90, weight: 1.2, escala: true,
    cond: { tierMin: 5, tierMax: 7 },
    text: 'A Fortaleza de Jade, guardada por quatro patriarcas e uma formação lendária, sofre um cerco de quarenta dias. Dentro, refugiados e relíquias; fora, um exército de três seitas. Você chega no quadragésimo primeiro dia.',
    choices: [
      { text: 'Quebrar a formação do inimigo, abrindo o caminho.', check: { stat: ['comp', 'esp'], dif: 2, tag: 'formacao' }, ok: { text: 'Com três toques, a formação rui. O cerco se desfaz em fuga, e a fortaleza reabre os portões.', fx: { fama: 18, karma: 5, xp: 8, item: ['cristal_formacao'], stats: { comp: 1 } } }, fail: { text: 'A formação reage, e você é repelido. Mas a distração permite que os defensores saiam em ordem.', fx: { fama: 6, ferida: 2 } } },
      { text: 'Enfrentar o patriarca inimigo, um contra um.', check: { stat: ['fis', 'dao', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'Você o enfrenta no vazio acima das muralhas. O duelo decide a guerra, e o céu aplaude em relâmpagos.', fx: { fama: 22, karma: 2, xp: 10, stats: { dao: 2 } } }, fail: { text: 'O patriarca é mais forte do que seu relatório dizia. Você recua, pagando caro pelo erro.', fx: { ferida: 3, fama: -3 } } },
      { text: 'Não se meter: não é a sua guerra.', res: { text: 'A fortaleza cai, ou não, sem você. Você dorme mal e come mal por semanas.', fx: { karma: -4, fama: -3 } } },
    ],
  },
  {
    id: 'r5_mesa_da_paz', title: 'A Mesa da Paz', rarity: 'raro', cooldown: 90, weight: 1.2,
    cond: { tierMin: 5, tierMax: 7, fameMin: 50 },
    text: 'Depois de décadas de guerra, as seitas aceitam enfim sentar-se à mesma mesa. Há ódios antigos, mortos para vingar, terras para dividir. Você é convidado como árbitro neutro, o único em quem todos confiam, ou fingem confiar.',
    choices: [
      { text: 'Conduzir as negociações com paciência.', check: { stat: ['car', 'comp', 'dao'], dif: 1 }, ok: { text: 'Em cem dias, a trégua é assinada. Os mortos continuam mortos, mas os vivos poderão dormir. A história lembrará de você como o árbitro.', fx: { fama: 24, karma: 12, xp: 6, stats: { car: 2, dao: 2 } } }, fail: { text: 'As negociações terminam em ofensas. A guerra volta com mais força, e você leva parte da culpa.', fx: { fama: -4, karma: 1, stats: { dao: 1 } } } },
      { text: 'Aproveitar a mesa para ampliar os interesses de sua seita.', res: { text: 'A trégua sai, e sua seita ganha terras, minas e um tratado generoso. O ressentimento dos outros ficará guardado.', fx: { fama: 12, pedras: 400, karma: -3, setFlags: ['tratado_vantajoso'] } } },
    ],
  },
  {
    id: 'r5_artefato_de_seita', title: 'O Artefato da Seita', rarity: 'raro', once: true, weight: 1.2,
    cond: { tierMin: 5, tierMax: 7, faction: ['seita'] },
    text: 'O artefato central da seita, um caldeirão de cinco toneladas, perdeu o espírito. Sem ele, a formação protetora enfraquece. Só um cultivador de Transformação Divina consegue renovar a ligação. Isso vai custar parte da sua vida.',
    choices: [
      { text: 'Doar um século de sua vida ao artefato.', res: { text: 'O caldeirão se ilumina. A formação volta com mais força do que nunca. Seu nome é gravado na base, ao lado dos fundadores.', fx: { vida: -60, fama: 25, karma: 10, stats: { dao: 2 }, setFlags: ['guardiao_do_artefato'] } } },
      { text: 'Doar sangue e pedras, mas não vida.', check: { stat: ['esp', 'dao'], dif: 1 }, ok: { text: 'Não é perfeito, mas funciona. A seita agradece, e a formação segura por mais algumas décadas.', fx: { pedras: -200, fama: 14, karma: 4 } }, fail: { text: 'O artefato recusa o sacrifício parcial. A seita fica ressentida.', fx: { pedras: -100, fama: -2 } } },
      { text: 'Recusar: o artefato que se renove sozinho.', res: { text: 'Seu silêncio cai pesado. Os anciões, mais tarde, encontrarão outro jeito. Só não vão esquecer.', fx: { karma: -3, fama: -4 } } },
    ],
  },
  {
    id: 'r5_divida_de_vida', title: 'A Dívida de Vida', rarity: 'comum', cooldown: 70, weight: 1.0,
    cond: { tierMin: 5, tierMax: 7 },
    text: 'Um mensageiro entrega uma jarra de cerâmica com uma carta: o descendente de alguém que você salvou há séculos pede ajuda. Está à beira da ruína, e pede o que a família lhe devia. O mais velho já morreu, mas o nome ficou.',
    choices: [
      { text: 'Atender: uma dívida é uma dívida, mesmo de outros.', res: { text: 'Você restaura a casa da família com algumas palavras e uma pílula. Eles choram, e você se pergunta quantas outras dívidas andam pelo mundo.', fx: { karma: 8, fama: 6, pedras: -100, stats: { dao: 1 } } } },
      { text: 'Recusar: o mundo mudou, e a dívida prescreveu.', res: { text: 'O mensageiro leva a recusa, de ombros caídos. Você sente o peso de uma frase que não devia ter dito.', fx: { karma: -4, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'r5_besta_ancestral', title: 'A Besta Ancestral', rarity: 'raro', once: true, weight: 1.0, escala: true,
    cond: { tierMin: 5, tierMax: 7 },
    text: 'Uma fera de dez mil anos o chama pelo nome numa clareira: "Venho propor um pacto. Em troca de um favor, protegerei seu vale pelo tempo de uma era." Os olhos dela são lagos de âmbar, e não prometem nada de graça.',
    choices: [
      { text: 'Aceitar o pacto.', res: { text: 'Uma marca de âmbar aparece na palma da sua mão. A fera vigia o vale, e você deve a ela um favor a ser cobrado quando ela decidir.', fx: { setFlags: ['pacto_besta_ancestral'], fama: 8, stats: { esp: 2, fis: 1 }, xp: 6 } } },
      { text: 'Recusar, com respeito.', res: { text: 'A fera ri baixo, e um vento morno bagunça seu cabelo. "Os sábios sempre recusam. Os fortes sempre aceitam." Ela parte sem rancor.', fx: { stats: { dao: 2 }, karma: 3 } } },
      { text: 'Testar a fera, em duelo.', check: { stat: ['fis', 'esp', 'dao'], dif: 3, tag: 'combate' }, ok: { text: 'Você a derrota com honra. Ela ri, ofegante, e entrega uma escama de ouro como prova de respeito.', fx: { item: ['escama_qilin'], fama: 14, xp: 8, stats: { fis: 2, dao: 1 } } }, fail: { text: 'Ela o derruba com a cauda, sem nem acordar de todo. Você se levanta humilde, e ela, indulgente.', fx: { ferida: 2, stats: { dao: 2 } } } },
    ],
  },
  {
    id: 'r5_reino_oculto_porta', title: 'A Porta do Reino Oculto', rarity: 'raro', once: true, weight: 1.0,
    cond: { tierMin: 5, tierMax: 7 },
    text: 'No fundo de um lago sem vento, uma porta de pedra se abre apenas uma vez por século. Você sente nela uma aura de reinos além dos três mundos, um tipo de cheiro que não existe em nenhum lugar conhecido.',
    choices: [
      { text: 'Atravessar a porta.', check: { stat: ['esp', 'dao', 'sor'], dif: 3 }, ok: { text: 'Você sai do outro lado, numa vastidão de névoa luminosa, onde plantas cantam e as pedras têm pulso. Retorna depois de décadas, mudado, com uma flor que nunca murcha.', fx: { anos: 8, xp: 15, stats: { esp: 2, dao: 2, comp: 2 }, item: ['erva_mil_anos'], fama: 12 } }, fail: { text: 'A porta o cospe de volta, atônito, ferido. O que você viu fica como febre no cérebro.', fx: { ferida: 3, corr: 4, stats: { esp: 1 } } } },
      { text: 'Observar de fora e registrar tudo.', res: { text: 'Por semanas você copia símbolos, ritmos e correntes de Qi. Quando a porta se fecha, você tem um caderno inteiro sobre ela.', fx: { stats: { comp: 3 }, xp: 6 } } },
    ],
  },
  {
    id: 'r5_filho_do_inimigo', title: 'O Filho do Inimigo', rarity: 'raro', once: true, weight: 1.2,
    cond: { tierMin: 5, tierMax: 7, flags: ['humilhou_rival'] },
    text: 'Um jovem de olhar duro se ajoelha diante do seu portão. É o filho de alguém que você humilhou ou matou há décadas. Não carrega armas; traz só um pedido: que você o aceite como aprendiz, ou que o mate de uma vez.',
    choices: [
      { text: 'Aceitá-lo como aprendiz.', res: { text: 'Ele aceita sem agradecer. Em segredo, vigia você por anos, até que o ódio vira outra coisa, que nenhum dos dois sabe nomear.', fx: { karma: 12, stats: { dao: 3, car: 1 }, setFlags: ['tem_discipulo'] } } },
      { text: 'Mandá-lo embora.', res: { text: 'Ele parte sem dizer nada. Um dia, o nome dele voltará, mais afiado.', fx: { karma: -2, setFlags: ['inimigo_secreto'] } } },
      { text: 'Tirar a vida dele, para encerrar a linhagem.', res: { text: 'O silêncio que sobra é mais pesado que uma montanha. Você já não é, em nenhum sentido, quem era.', fx: { karma: -18, corr: 8, stats: { dao: -3 } } } },
    ],
  },
  {
    id: 'r5_emissario_do_culto', title: 'O Emissário do Culto', rarity: 'raro', cooldown: 90, weight: 1.0,
    cond: { tierMin: 5, tierMax: 7 },
    text: 'Um emissário de manto vinho, com olhos fundos e sorriso cuidadoso, senta-se à sua mesa sem convite. Em nome do Culto do Trono Escarlate, oferece um lugar entre os Quatro Reis: poder, acesso a uma biblioteca proibida e anos de vida a mais.',
    choices: [
      { text: 'Aceitar a oferta e jurar ao Culto.', res: { text: 'O pacto é selado com uma gota de sangue. O poder chega rápido, e a corrupção, quase em silêncio.', fx: { corr: 20, vida: 80, xp: 12, stats: { fis: 2, esp: 2 }, fama: -10, karma: -12, setFlags: ['membro_demoniaca'] } } },
      { text: 'Recusar com educação.', res: { text: 'O emissário se despede com pesar. Anos depois, sua seita sofrerá retaliações sutis.', fx: { karma: 2, stats: { dao: 1 } } } },
      { text: 'Capturar o emissário e entregá-lo à aliança.', check: { stat: ['fis', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'Ele se debate, e se rende. A aliança o interroga por semanas, e você é lembrado como inimigo declarado do Culto.', fx: { fama: 16, karma: 8, setFlags: ['inimigo_do_culto'] } }, fail: { text: 'Ele se desfaz em fumaça e some. O Culto vai lembrar do rosto que o recusou.', fx: { ferida: 1, setFlags: ['inimigo_do_culto'] } } },
    ],
  },

  /* ================= REINO 6: OUTROS PLANOS ================= */
  {
    id: 'r6_atravessar_vazio', title: 'Um Passo, Mil Li', rarity: 'comum', cooldown: 60, weight: 1.6,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'Pela primeira vez, você dobra o espaço e atravessa uma distância de mil li num único passo. Há um instante em que você não está em lugar nenhum, e o mundo parece um pano esticado.',
    choices: [
      { text: 'Visitar um lugar que você perdeu há muito tempo.', res: { text: 'O vilarejo ainda está lá, menor do que na lembrança. Você fica uma hora sob a árvore de entrada, e volta com o peito leve.', fx: { karma: 4, stats: { dao: 2 }, xp: 4 } } },
      { text: 'Aparecer, de surpresa, no salão de um rival.', res: { text: 'O rival derruba a xícara. Você sorri, conversa, e vai embora antes dele reagir. Uma lenda nasce, e uma inimizade, também.', fx: { fama: 8, karma: -1, stats: { car: 1 } } } },
      { text: 'Treinar passos de dobra até o limite do Qi.', check: { stat: ['esp', 'comp'], dif: 1 }, ok: { text: 'Ao fim, você cruza o continente em três passos. O Qi desce quase a zero, e a mente se abre.', fx: { xp: 10, stats: { esp: 2, comp: 1 } } }, fail: { text: 'O último passo erra a direção. Você reaparece num penhasco gelado, rindo e tremendo.', fx: { ferida: 1, stats: { esp: 1 } } } },
    ],
  },
  {
    id: 'r6_fenda', title: 'A Fenda Entre os Planos', rarity: 'raro', cooldown: 90, weight: 1.4, escala: true,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'Um corte invisível, de dez li de comprimento, se abre no céu sobre uma cidade mortal. Por ele sai um vento que cheira a metal e a cinza. Sombras de formas indefinidas se esticam em direção à terra.',
    choices: [
      { text: 'Fechar a fenda com seu domínio.', check: { stat: ['esp', 'dao', 'comp'], dif: 2, tag: 'formacao' }, ok: { text: 'O seu Domínio cobre o céu como uma tampa. A fenda se fecha lentamente, com um ranger de vidro. A cidade acorda sem saber de nada.', fx: { fama: 22, karma: 10, xp: 12, stats: { dao: 2, esp: 1 } } }, fail: { text: 'A fenda resiste. Você a estreita, mas não fecha. Uma sombra escapa e foge.', fx: { ferida: 2, fama: 6, stats: { dao: 1 }, corr: 3 } } },
      { text: 'Entrar na fenda e ver o outro lado.', check: { stat: ['dao', 'sor'], dif: 3 }, ok: { text: 'Do outro lado, uma paisagem de rochas negras e céu de cobre. Você volta com uma pedra que bate como coração.', fx: { item: ['fragmento_cometa'], xp: 14, stats: { comp: 2, dao: 2 }, anos: 3, corr: 4 } }, fail: { text: 'A fenda o expele em cuspe de luz. O que você viu cabe em um grito.', fx: { ferida: 3, corr: 6, stats: { esp: 1 } } } },
    ],
  },
  {
    id: 'r6_emissario_outro_plano', title: 'O Emissário de Outro Plano', rarity: 'lendario', once: true, weight: 1.0,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'Um ser feito de luz coalhada senta ao seu lado e não projeta sombra. Fala sem mover lábios: "Sou apenas um mensageiro. O que vem a seguir é maior que você, maior que o seu mundo. Queremos saber se você está pronto."',
    choices: [
      { text: 'Perguntar o que vem a seguir.', res: { text: 'O mensageiro mostra uma imagem: uma planície infinita de pessoas ajoelhadas diante de uma porta. Você não entende, mas guarda tudo.', fx: { stats: { dao: 3, comp: 2 }, xp: 8, setFlags: ['viu_alem'] } } },
      { text: 'Dizer que ainda não está pronto.', res: { text: 'Ele inclina a cabeça, entende, e desaparece. "Voltarei quando você mudar de ideia."', fx: { stats: { dao: 2 }, karma: 2 } } },
      { text: 'Atacar o mensageiro: ninguém decide por você.', check: { stat: ['fis', 'esp', 'dao'], dif: 4, tag: 'combate' }, ok: { text: 'Seu golpe atravessa o mensageiro e quebra um espelho em outro plano. Algo longe desperta. Você não sabe se acertou ou errou.', fx: { fama: 14, karma: -3, xp: 10, stats: { dao: 2 } } }, fail: { text: 'O mensageiro apenas o observa, sem se mexer. A sua força se esvai, como água num ralo.', fx: { ferida: 3, stats: { dao: 1 } } } },
    ],
  },
  {
    id: 'r6_primeiro_dominio', title: 'O Nascimento do Domínio', rarity: 'raro', once: true, weight: 2.0,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'Ao fechar os olhos, você sente o espaço ao seu redor responder. O seu Domínio, um território invisível onde as suas regras valem mais que as do Céu, está a ponto de nascer. Só falta decidir qual a forma da primeira regra.',
    choices: [
      { text: 'Um Domínio de silêncio: nenhum ruído, nenhum golpe sem aviso.', res: { text: 'Dentro do seu Domínio, tudo fica quieto como o fundo de um lago. Os inimigos sentem a pressão antes do golpe.', fx: { stats: { dao: 3, esp: 1 }, xp: 8, setFlags: ['dominio_silencio'] } } },
      { text: 'Um Domínio de vida: onde você pisa, as plantas florescem.', res: { text: 'Flores brotam onde a sua sombra cai. Ferimentos cicatrizam mais depressa dentro do seu raio.', fx: { stats: { fis: 2, car: 1, dao: 1 }, vida: 30, xp: 6, setFlags: ['dominio_vida'] } } },
      { text: 'Um Domínio de lâminas: o ar corta quem não é bem-vindo.', res: { text: 'O ar ao seu redor tem gume. Visitantes aprendem a tirar o chapéu antes de entrar.', fx: { stats: { fis: 2, esp: 2 }, xp: 6, fama: 6, setFlags: ['dominio_lamina'] } } },
    ],
  },
  {
    id: 'r6_templo_flutuante', title: 'O Templo Que Voa', rarity: 'raro', once: true, weight: 1.0,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'Um templo inteiro, com pagode e jardim, flutua sobre as nuvens, deslizando devagar. Seus monges, de roupas brancas, não envelhecem. Eles o convidam para sentar numa varanda e provar um chá que nunca esfria.',
    choices: [
      { text: 'Aceitar o convite e ficar um mês.', res: { text: 'O mês vira ano, e o ano vira lição. Quando você desce, o templo some, e o seu coração está mais calmo do que nunca.', fx: { anos: 1, xp: 12, stats: { dao: 3, comp: 1 }, karma: 3 } } },
      { text: 'Pedir um ensinamento específico.', check: { stat: ['comp', 'dao'], dif: 2, tag: 'mente' }, ok: { text: 'O monge mais velho lhe dá uma frase. A frase, aos poucos, vira técnica.', fx: { tecnica: ['respiracao_cem_ciclos'], xp: 8, stats: { comp: 2 } } }, fail: { text: 'Ele sorri e diz: "Quando você entender a pergunta, volte." O templo se afasta.', fx: { stats: { comp: 1 } } } },
    ],
  },
  {
    id: 'r6_tempestade_vazio', title: 'A Tempestade no Vazio', rarity: 'comum', cooldown: 70, weight: 1.2, escala: true,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'Você cruza o vazio entre dois mundos e encontra uma tempestade de fragmentos de espaço, lascas de realidade que cortam o Qi e o corpo. É lindo e é mortal, como a maioria das coisas desse reino.',
    choices: [
      { text: 'Atravessar a tempestade de frente.', check: { stat: ['fis', 'dao', 'esp'], dif: 2, tag: 'combate' }, ok: { text: 'Você sai do outro lado em farrapos, com um sorriso e a pele coberta de pequenos cortes dourados. O Qi está mais denso.', fx: { xp: 10, stats: { fis: 2, dao: 1 }, ferida: 1 } }, fail: { text: 'A tempestade corta fundo. Você recua, ofegante, deixando um rastro de sangue no vazio.', fx: { ferida: 3, stats: { dao: 1 } } } },
      { text: 'Contornar pela borda, perdendo anos de caminho.', res: { text: 'A viagem toma meia década, mas você chega inteiro. O vazio é paciente, e você aprendeu a ser também.', fx: { anos: 5, stats: { dao: 1, sor: 1 } } } },
    ],
  },
  {
    id: 'r6_ancestral_adormecido', title: 'O Ancestral Adormecido', rarity: 'lendario', once: true, weight: 0.9, escala: true,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'No coração de uma montanha oca, um ser de cabelos de gelo dorme sobre um trono de ossos de dragão. Os selos ao redor estão rachados. Se acordar, o continente inteiro sentirá. Se continuar dormindo, os selos podem ruir sozinhos, em alguns séculos.',
    choices: [
      { text: 'Reforçar os selos com o seu Domínio.', check: { stat: ['esp', 'dao', 'comp'], dif: 3, tag: 'formacao' }, ok: { text: 'Os selos se refazem, brilhando como alvorada. O ancestral murmura em sono. Um peso se levanta do continente, e você nunca saberá o quanto.', fx: { karma: 20, fama: 18, stats: { dao: 3, esp: 2 }, xp: 12, setFlags: ['guardiao_do_selo'] } }, fail: { text: 'Os selos reagem e queimam sua mão. Você dá tempo ao mundo, não solução.', fx: { ferida: 3, karma: 8, fama: 8, stats: { dao: 1 } } } },
      { text: 'Acordar o ancestral e conversar.', check: { stat: ['car', 'dao'], dif: 4 }, ok: { text: 'O ancestral abre um olho e ri, rouco: "Há quanto tempo, criança." Ele lhe conta um segredo, e volta a dormir.', fx: { stats: { dao: 4, comp: 2 }, xp: 15, setFlags: ['segredo_ancestral'] } }, fail: { text: 'Os selos soltam um estalo. O ancestral resmunga e se vira. Você recua, sem cabeça, e com a certeza de ter feito uma tolice.', fx: { ferida: 2, corr: 4, karma: -2 } } },
      { text: 'Sair em silêncio: alguns segredos são mais seguros dormindo.', res: { text: 'Você deixa a montanha sem olhar para trás. O resto fica para quem vier depois.', fx: { stats: { dao: 2 }, karma: 1 } } },
    ],
  },
  {
    id: 'r6_pilula_do_tempo', title: 'A Pílula do Tempo', rarity: 'raro', once: true, weight: 1.0,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'Um alquimista de outro continente oferece uma pílula que "dobra o tempo": tomada, ela faz um ano de cultivo caber num dia. O preço, diz ele, é um ano a menos de vida a cada dose, e a própria sorte.',
    choices: [
      { text: 'Tomar uma dose.', res: { text: 'O dia parece um ano. Você sai mais forte, e mais velho do que deveria. A sorte dá uma piscada fria.', fx: { xp: 18, vida: -10, stats: { sor: -1, dao: 1 } } } },
      { text: 'Recusar: tempo se ganha com paciência.', res: { text: 'O alquimista ri, guarda o frasco e ergue um dedo. "Nem todos são tão sábios. Nem todos vão longe."', fx: { stats: { dao: 2 }, karma: 2 } } },
    ],
  },
  {
    id: 'r6_convite_imortais', title: 'O Convite dos Imortais', rarity: 'lendario', once: true, weight: 0.8,
    cond: { tierMin: 6, tierMax: 8, karmaMin: 10 },
    text: 'Uma carta cai do céu, pesada como uma moeda de ouro: "Os Imortais do Terraço do Oeste o convidam para um banquete. Compareça sozinho." O selo é de uma ordem que, supostamente, não existe há dez mil anos.',
    choices: [
      { text: 'Comparecer ao banquete.', check: { stat: ['dao', 'car', 'sor'], dif: 3 }, ok: { text: 'À mesa, imortais bebem vinho de estrelas e riem como velhos amigos. Ao fim, um deles lhe passa um fragmento de pergaminho. "Para quando precisar."', fx: { stats: { dao: 3, comp: 2, car: 1 }, xp: 14, fama: 15, setFlags: ['banquete_imortais'] } }, fail: { text: 'À mesa, uma pergunta o deixa sem resposta. Eles sorriem e pedem desculpas. Você volta com a sensação de ter sido medido.', fx: { stats: { dao: 1 }, xp: 4 } } },
      { text: 'Rasgar a carta.', res: { text: 'A carta se desfaz em poeira prateada. Os imortais, dizem, são pacientes, mas não infinitos.', fx: { stats: { dao: 1 }, karma: -1 } } },
    ],
  },
  {
    id: 'r6_demonio_do_vazio', title: 'O Demônio do Vazio', rarity: 'raro', cooldown: 90, weight: 1.2, escala: true,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'Entre os mundos, uma criatura feita de fome, escuridão e memória de coisas que nunca existiram o persegue. Ela sabe seu nome, sua idade e os pecados que você já esqueceu. Cada vez que você pisca, ela está um passo mais perto.',
    choices: [
      { text: 'Enfrentar o demônio com o Domínio.', check: { stat: ['dao', 'esp', 'fis'], dif: 2, tag: 'demonio' }, ok: { text: 'Seu Domínio o envolve, e o demônio se desfaz em um grito sem som. O silêncio que sobra tem gosto de vitória.', fx: { fama: 16, xp: 10, karma: 4, stats: { dao: 3 } } }, fail: { text: 'O demônio escapa, mas deixa em você uma marca escura. Você sabe que ele voltará.', fx: { corr: 8, ferida: 2, stats: { dao: 1 } } } },
      { text: 'Fugir pelo vazio, dobrando espaço.', check: { stat: ['esp', 'sor'], dif: 1, tag: 'fuga' }, ok: { text: 'Mil li, dois mil, cinco mil. O demônio fica para trás. Por enquanto.', fx: { stats: { esp: 1, sor: 1 } } }, fail: { text: 'Ele aparece diante de você, rindo. A fuga, desta vez, falha.', fx: { ferida: 2, corr: 4 } } },
      { text: 'Conversar com o demônio: toda criatura tem desejo.', check: { stat: ['car', 'dao'], dif: 3, tag: 'mente' }, ok: { text: 'Ele quer lembrança, e você dá uma, uma só. O demônio recua, satisfeito, e some, para sempre.', fx: { stats: { dao: 4, comp: 1 }, xp: 12, karma: 6 } }, fail: { text: 'A conversa corre mal. O demônio leva uma lembrança sua, e você nunca saberá qual.', fx: { corr: 6, stats: { dao: -1 } } } },
    ],
  },
  {
    id: 'r6_arquivo_celeste', title: 'O Arquivo Celeste', rarity: 'raro', once: true, weight: 1.0,
    cond: { tierMin: 6, tierMax: 8 },
    text: 'Você encontra um corredor sem fim, forrado de estantes que contêm todos os nomes de quem já cultivou neste mundo. Seu próprio nome está lá, em muitas linhas, em muitas vidas. Algumas linhas são mais longas que outras; algumas terminam no meio de uma frase.',
    choices: [
      { text: 'Ler a linha da sua vida atual.', res: { text: 'A linha é curta e cheia de espaços em branco. Parece que ainda não foi escrita, ou que alguém a apagou.', fx: { stats: { dao: 2, comp: 2 }, xp: 6 } } },
      { text: 'Ler as linhas de vidas passadas.', check: { stat: ['dao', 'esp'], dif: 2, tag: 'mente' }, ok: { text: 'Fragmentos de vozes antigas voltam. Uma delas, de você mesmo, dá um conselho que mudará sua próxima respiração.', fx: { tecnica: ['memoria_vida_passada'], stats: { dao: 2, comp: 2 }, xp: 10 } }, fail: { text: 'As vozes se amontoam e o derrubam. Você acorda do lado de fora, com dor de cabeça.', fx: { ferida: 1, corr: 2, stats: { esp: 1 } } } },
      { text: 'Apagar uma linha que o assombra.', res: { text: 'A linha some. Algo, em algum lugar, esquece de existir. Você sente um vazio breve, e não sabe de quem.', fx: { karma: -6, stats: { dao: -1 }, xp: 4 } } },
    ],
  },
];
