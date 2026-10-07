import type { Item } from '../types';

const ITEM_DEFS: Omit<Item, 'rarity'>[] = [
  { id: 'espada_ferro_viagem', name: 'Espada de Viagem', kind: 'arma', grade: 1, desc: 'Uma lâmina honesta, equilibrada para o combate.', equipmentSlot: 'rightWeapon', bonuses: { fis: 3 }, value: 24 },
  { id: 'adaga_guarda', name: 'Adaga da Guarda', kind: 'arma', grade: 1, desc: 'Lâmina curta para aparar golpes e contra-atacar.', equipmentSlot: 'leftWeapon', bonuses: { esp: 2 }, value: 18 },
  { id: 'manto_peles', name: 'Manto Forrado de Peles', kind: 'armadura', grade: 2, desc: 'Protege contra o vento e a neve das regiões altas.', equipmentSlot: 'armor', bonuses: { fis: 2 }, coldProtection: true, value: 45 },
  { id: 'pingente_jade', name: 'Pingente de Jade', kind: 'artefato', grade: 1, desc: 'Uma lembrança que firma o espírito.', equipmentSlot: 'accessory', bonuses: { dao: 2 }, value: 22 },
  { id: 'espada_inverno', name: 'Espada do Inverno', kind: 'arma', grade: 4, desc: 'Forjada no frio da Forja Silenciosa, fortalece ataques físicos e a disciplina do Dao.', equipmentSlot: 'rightWeapon', bonuses: { fis: 7, dao: 2 }, value: 480 },
  { id: 'espada_inverno_fragil', name: 'Espada do Inverno Trincada', kind: 'arma', grade: 2, desc: 'A têmpera falhou, mas a lâmina ainda guarda um fragmento do frio ancestral.', equipmentSlot: 'rightWeapon', bonuses: { fis: 3, dao: 1 }, value: 110 },
  { id: 'armadura_qi_escamas', name: 'Armadura de Qi Escamas', kind: 'armadura', grade: 4, desc: 'Escamas de fera seladas em camadas de Qi desviam golpes e isolam o corpo da neve espiritual.', equipmentSlot: 'armor', bonuses: { fis: 4, dao: 4 }, coldProtection: true, value: 520 },
  { id: 'armadura_qi_escamas_trincada', name: 'Armadura de Qi Escamas Trincada', kind: 'armadura', grade: 2, desc: 'Uma peça rachada da forja, ainda quente de Qi e resistente ao frio.', equipmentSlot: 'armor', bonuses: { fis: 2, dao: 1 }, coldProtection: true, value: 130 },
  // Pílulas de cultivo
  { id: 'pilula_qi_menor', name: 'Pílula de Qi Menor', kind: 'pilula', grade: 1, desc: 'Acelera um pouco o cultivo.', use: { xp: 8 }, value: 4 },
  { id: 'pilula_qi_media', name: 'Pílula de Qi Densa', kind: 'pilula', grade: 2, desc: 'Qi concentrado em uma gota de luz.', use: { xp: 15 }, value: 12 },
  { id: 'pilula_qi_maior', name: 'Pílula de Qi Profundo', kind: 'pilula', grade: 3, desc: 'Um mês de cultivo em um suspiro.', use: { xp: 30 }, value: 40 },
  // Cura e vida
  { id: 'pilula_cura', name: 'Pílula de Cura Simples', kind: 'pilula', grade: 1, desc: 'Fecha feridas leves.', use: { ferida: -2 }, value: 5 },
  { id: 'pilula_cura_maior', name: 'Pílula de Medula Renovada', kind: 'pilula', grade: 2, desc: 'Recupera ossos e tendões.', use: { ferida: -5 }, value: 18 },
  { id: 'pilula_longevidade', name: 'Pílula dos Anos Devolvidos', kind: 'pilula', grade: 3, desc: 'Empresta vinte anos ao seu relógio.', use: { vida: 20 }, value: 60 },
  // Pílulas de rompimento (ajudam na passagem para o reino indicado)
  { id: 'pilula_passagem_2', name: 'Pílula da Fundação Serena', kind: 'pilula', grade: 2, desc: 'Ajuda a atravessar o segundo gargalo.', breakBonus: { tier: 2, bonus: 0.25 }, value: 30 },
  { id: 'pilula_passagem_3', name: 'Pílula do Núcleo Luminoso', kind: 'pilula', grade: 3, desc: 'Ajuda a atravessar o terceiro gargalo.', breakBonus: { tier: 3, bonus: 0.22 }, value: 70 },
  { id: 'pilula_passagem_4', name: 'Pílula da Alma Tranquila', kind: 'pilula', grade: 4, desc: 'Ajuda a atravessar o quarto gargalo.', breakBonus: { tier: 4, bonus: 0.2 }, value: 180 },
  { id: 'pilula_passagem_5', name: 'Elixir do Céu Interior', kind: 'pilula', grade: 5, desc: 'Ajuda a atravessar o quinto gargalo.', breakBonus: { tier: 5, bonus: 0.18 }, value: 400 },
  { id: 'pilula_passagem_6', name: 'Néctar do Vazio', kind: 'pilula', grade: 5, desc: 'Ajuda a atravessar o sexto gargalo.', breakBonus: { tier: 6, bonus: 0.15 }, value: 900 },
  // Ervas
  { id: 'erva_orvalho', name: 'Erva do Orvalho Cinzento', kind: 'erva', grade: 1, desc: 'Cem dias de orvalho acumulado.', use: { xp: 5 }, value: 3 },
  { id: 'erva_cem_anos', name: 'Erva de Cem Anos', kind: 'erva', grade: 2, desc: 'Um século de Qi preso numa folha.', use: { xp: 12, stats: { esp: 1 } }, value: 15 },
  { id: 'erva_mil_anos', name: 'Raiz de Mil Anos', kind: 'erva', grade: 3, desc: 'Rara, amarga e valiosa.', use: { xp: 25, vida: 10 }, value: 80 },
  { id: 'cristal_qi', name: 'Cristal de Qi Bruto', kind: 'misc', grade: 2, desc: 'Absorva e fique mais forte.', use: { xp: 10 }, value: 10 },
  // Talismãs (usados por escolhas de eventos)
  { id: 'talisma_fuga', name: 'Talismã de Fuga', kind: 'talisma', grade: 2, desc: 'Tira você de enrascadas (uso único em eventos).', value: 20 },
  { id: 'talisma_escudo', name: 'Talismã de Escudo', kind: 'talisma', grade: 2, desc: 'Absorve um golpe fatal (uso único em eventos).', value: 25 },
  // Artefatos
  { id: 'espada_ferro_frio', name: 'Espada de Ferro Frio', kind: 'artefato', grade: 1, desc: 'Comum, mas leal.', passive: { fis: 1 }, value: 8 },
  { id: 'espada_aprendiz', name: 'Espada Voadora de Aprendiz', kind: 'artefato', grade: 2, desc: 'Obedece a sua intenção, com algum atraso.', passive: { fis: 1, dao: 1 }, value: 40 },
  { id: 'manto_nuvem_cinza', name: 'Manto da Nuvem Cinzenta', kind: 'artefato', grade: 2, desc: 'Impõe respeito discreto.', passive: { car: 2, sor: 1 }, value: 35 },
  { id: 'escudo_tartaruga', name: 'Escudo de Casco de Tartaruga', kind: 'artefato', grade: 2, desc: 'Sobreviveu a cem batalhas.', passive: { fis: 3 }, value: 45 },
  { id: 'contas_trovao', name: 'Contas de Madeira de Trovão', kind: 'artefato', grade: 3, desc: 'Cada conta guarda um raio apagado.', passive: { esp: 3, dao: 1 }, value: 120 },
  { id: 'estandarte_formacao', name: 'Estandarte de Formação Menor', kind: 'artefato', grade: 3, desc: 'Base portátil de formações.', passive: { comp: 2, esp: 2 }, value: 130 },
  // Anéis e misc
  { id: 'anel_armazenamento', name: 'Anel de Armazenamento Simples', kind: 'anel', grade: 2, desc: 'Cabe uma cabana e alguma dignidade.', value: 50 },
  { id: 'anel_do_velho', name: 'Anel Negro e Opaco', kind: 'anel', grade: 4, desc: 'Às vezes sussurra à noite.', passive: { comp: 2 }, value: 200 },
  { id: 'veneno_sete_noites', name: 'Veneno das Sete Noites', kind: 'misc', grade: 2, desc: 'Quem o prova não vê o oitavo amanhecer.', value: 25 },
  { id: 'mapa_fragmentado', name: 'Fragmento de Mapa Antigo', kind: 'misc', grade: 2, desc: 'Aponta para uma ruína que ninguém lembra.', value: 15 },
  // Núcleos de bestas
  { id: 'nucleo_besta_baixo', name: 'Núcleo de Besta Espiritual (baixo)', kind: 'nucleo', grade: 2, desc: 'Ainda pulsa.', use: { xp: 10 }, value: 20 },
  { id: 'nucleo_besta_alto', name: 'Núcleo de Besta Espiritual (alto)', kind: 'nucleo', grade: 4, desc: 'Brilha como um pequeno sol.', use: { xp: 35 }, value: 150 },
  // Manuais (ensinam técnicas)
  { id: 'manual_palma_cinzas', name: 'Manual: Palma das Cinzas Quentes', kind: 'manual', grade: 2, desc: 'Papel amarelado, caligrafia severa.', use: { tecnica: ['palma_cinzas'] }, value: 60 },
  { id: 'manual_olho_lotus', name: 'Manual: Olho de Lótus Fechado', kind: 'manual', grade: 2, desc: 'Meditação de ver sem olhar.', use: { tecnica: ['olho_lotus'] }, value: 60 },
  { id: 'manual_tres_luas', name: 'Manual: Espada das Três Luas', kind: 'manual', grade: 2, desc: 'Escrito com ponta de lâmina.', use: { tecnica: ['espada_tres_luas'] }, value: 70 },
  { id: 'manual_forja_sol', name: 'Manual: Forja do Sol Interior', kind: 'manual', grade: 3, desc: 'Um tesouro de seita.', use: { tecnica: ['forja_sol_interior'] }, value: 200 },
  { id: 'manual_selo_portas', name: 'Manual: Selo das Nove Portas', kind: 'manual', grade: 3, desc: 'Diagramas que mudam quando você pisca.', use: { tecnica: ['selo_nove_portas'] }, value: 190 },
  { id: 'manual_passo_garca', name: 'Manual: Passo da Garça Cinzenta', kind: 'manual', grade: 1, desc: 'Barato e muito usado.', use: { tecnica: ['passo_garca'] }, value: 15 },
  // Expansão
  { id: 'pilula_espirito_calmo', name: 'Pílula do Espírito Calmo', kind: 'pilula', grade: 2, desc: 'Aquieta a mente e dissolve um pouco de corrupção.', use: { stats: { esp: 1 }, corr: -10 }, value: 25 },
  { id: 'antidoto_sete_ervas', name: 'Antídoto de Sete Ervas', kind: 'pilula', grade: 2, desc: 'Amarga, mas conserta o que o veneno quebrou.', use: { ferida: -3 }, value: 14 },
  { id: 'elixir_medula', name: 'Elixir de Medula de Dragão Menor', kind: 'pilula', grade: 3, desc: 'Fortalece ossos e acelera o cultivo.', use: { stats: { fis: 1 }, xp: 12 }, value: 55 },
  { id: 'gema_trovao', name: 'Gema de Trovão Contido', kind: 'misc', grade: 3, desc: 'Um raio pequeno, dormindo em cristal.', use: { xp: 18 }, value: 45 },
  { id: 'lotus_negro', name: 'Flor de Lótus Negro', kind: 'erva', grade: 4, desc: 'Rende muito Qi, e deixa uma sombra em quem a come.', use: { xp: 40, corr: 10 }, value: 130 },
  { id: 'fruta_mil_aromas', name: 'Fruta dos Mil Aromas', kind: 'erva', grade: 3, desc: 'Cada mordida soma dias à sua vida.', use: { vida: 25 }, value: 110 },
  { id: 'sino_mente_clara', name: 'Sino da Mente Clara', kind: 'artefato', grade: 2, desc: 'Seu toque espanta pensamentos ruins.', passive: { dao: 2 }, value: 50 },
  { id: 'pincel_formacoes', name: 'Pincel de Pelo de Fênix', kind: 'artefato', grade: 2, desc: 'Cada traço fica gravado no ar.', passive: { comp: 2 }, value: 60 },
  { id: 'agulhas_de_alma', name: 'Estojo de Agulhas de Alma', kind: 'artefato', grade: 3, desc: 'Armas feitas de consciência cristalizada.', passive: { esp: 2, comp: 1 }, value: 140 },
  { id: 'rosario_sandalo', name: 'Rosário de Sândalo Antigo', kind: 'artefato', grade: 2, desc: 'Cada conta, um mantra.', passive: { dao: 2, esp: 1 }, value: 70 },
  { id: 'luvas_ferro_negro', name: 'Luvas de Ferro Negro', kind: 'artefato', grade: 2, desc: 'Pesadas, frias e mal-humoradas.', passive: { fis: 2 }, value: 55 },
  { id: 'anel_jade_frio', name: 'Anel de Jade Frio', kind: 'anel', grade: 3, desc: 'Gela os pensamentos até a clareza.', passive: { esp: 1, dao: 1 }, value: 90 },
  { id: 'bolsa_celeste', name: 'Bolsa Celeste', kind: 'anel', grade: 4, desc: 'Um bolso do tamanho de um pequeno mundo.', passive: { sor: 2 }, value: 260 },
  { id: 'ovo_fera_espiritual', name: 'Ovo de Fera Espiritual', kind: 'misc', grade: 3, desc: 'Quente, vivo, esperando um nome.', value: 80 },
  { id: 'chave_reino_secreto', name: 'Chave de Reino Secreto', kind: 'misc', grade: 4, desc: 'Abre uma porta que só existe na lua certa.', value: 200 },
  { id: 'manual_nevoa_venenos', name: 'Manual: Névoa dos Sete Venenos', kind: 'manual', grade: 2, desc: 'Notas de campo, algumas manchadas de verde.', use: { tecnica: ['nevoa_sete_venenos'] }, value: 65 },
  { id: 'manual_agulha_alma', name: 'Manual: Agulha de Alma', kind: 'manual', grade: 2, desc: 'Poucos caracteres, muitíssimo cuidado.', use: { tecnica: ['agulha_de_alma'] }, value: 70 },
  { id: 'manual_punho_vajra', name: 'Manual: Punho do Vajra', kind: 'manual', grade: 2, desc: 'Impresso em papel de templo.', use: { tecnica: ['punho_vajra'] }, value: 65 },
  { id: 'manual_estrelas', name: 'Manual: Arranjo das Sete Estrelas', kind: 'manual', grade: 3, desc: 'Mapas estelares e muitos cálculos.', use: { tecnica: ['formacao_estrelas'] }, value: 210 },

  // Lote 1: vida na seita
  { id: 'pilula_merito', name: 'Pílula do Mérito', kind: 'pilula', grade: 2, desc: 'Troco de pontos de mérito; sabor de chá velho.', use: { xp: 12, stats: { dao: 1 } }, value: 30 },
  { id: 'manto_nucleo', name: 'Manto do Discípulo do Núcleo', kind: 'artefato', grade: 3, desc: 'Escuro, bordado a prata. Abre portas e olhares.', passive: { car: 2, dao: 1 }, value: 150 },
  { id: 'jade_identidade', name: 'Jade de Identidade', kind: 'misc', grade: 2, desc: 'Prova de confiança entre mestres e alunos.', passive: { car: 1 }, value: 40 },
  { id: 'pergaminho_anciao', name: 'Pergaminho do Ancião', kind: 'manual', grade: 3, desc: 'Notas de um Ancião sobre o próprio caminho.', use: { tecnica: ['sutra_do_anciao'] }, value: 180 },
  { id: 'manual_guarda_portao', name: 'Manual: Guarda do Portão', kind: 'manual', grade: 2, desc: 'Ilustrações de posturas e respiração.', use: { tecnica: ['guarda_do_portao'] }, value: 60 },

  // Lote 2: reinos secretos
  { id: 'selo_do_guardiao', name: 'Selo de Passagem do Guardião', kind: 'misc', grade: 3, desc: 'Prova de que alguém pagou pela rota certa.', value: 60 },
  { id: 'lanterna_dragao', name: 'Lanterna de Sopro de Dragão', kind: 'artefato', grade: 4, desc: 'Uma chama antiga, que ilumina o que precisa ser visto.', passive: { esp: 2, comp: 1 }, value: 260 },
  { id: 'semente_jardim', name: 'Semente do Jardim dos Imortais', kind: 'erva', grade: 4, desc: 'Cresce devagar, rende tempo e Qi.', use: { vida: 20, xp: 20 }, value: 200 },
  { id: 'amuleto_nove_caudas', name: 'Amuleto das Nove Caudas', kind: 'artefato', grade: 3, desc: 'Pelo escarlate trançado, quente ao toque.', passive: { fis: 1, dao: 1, sor: 1 }, value: 130 },
  { id: 'escama_qilin', name: 'Escama de Qilin', kind: 'artefato', grade: 4, desc: 'Dourada, leve, rara demais para vender.', passive: { sor: 2, car: 1 }, value: 280 },
  { id: 'espelho_bronze', name: 'Espelho de Bronze Antigo', kind: 'artefato', grade: 2, desc: 'Mostra um pouco mais do que deveria.', passive: { comp: 1, dao: 1 }, value: 70 },

  // Lote 3: alquimia e forja
  { id: 'erva_lua_prata', name: 'Flor da Lua de Prata', kind: 'erva', grade: 3, desc: 'Qi lunar concentrado, colhido na hora certa.', use: { xp: 20 }, value: 90 },
  { id: 'fornalha_bronze', name: 'Fornalha de Bronze Velho', kind: 'artefato', grade: 3, desc: 'Cada lote refinado a deixa mais sábia.', passive: { comp: 2 }, value: 160 },
  { id: 'pilula_sem_nome', name: 'Pílula Sem Nome', kind: 'pilula', grade: 5, desc: 'Sem cor, sem forma, sem preço.', use: { xp: 60, vida: 40, stats: { comp: 2, dao: 2 } }, value: 900 },
  { id: 'artefato_natal', name: 'Artefato Natal', kind: 'artefato', grade: 4, desc: 'Forjado e ligado ao seu espírito. Cresce com você.', passive: { fis: 2, esp: 2, dao: 1 }, value: 320 },
  { id: 'artefato_natal_menor', name: 'Artefato Natal (imperfeito)', kind: 'artefato', grade: 3, desc: 'Falhas e orgulho, mas é seu.', passive: { fis: 1, esp: 1, dao: 1 }, value: 140 },
  { id: 'lingote_celeste', name: 'Lingote de Ferro Celeste', kind: 'misc', grade: 4, desc: 'Metal caído do céu, quente ao toque.', value: 220 },
  { id: 'armadura_escamas', name: 'Armadura de Escamas de Besta', kind: 'artefato', grade: 3, desc: 'Leve, escura e quase viva.', passive: { fis: 3 }, value: 180 },

  // Lote 4: mundo mortal e família
  { id: 'colar_familia', name: 'Colar da Família', kind: 'artefato', grade: 2, desc: 'Um fio de jade herdado de quatro gerações.', passive: { sor: 1, dao: 1 }, value: 60 },
  { id: 'seda_imperial', name: 'Manto de Seda Imperial', kind: 'artefato', grade: 3, desc: 'Presente da corte; abre portas e olhares.', passive: { car: 2, sor: 1 }, value: 150 },
  { id: 'arroz_espiritual', name: 'Arroz Espiritual do Campo Fértil', kind: 'erva', grade: 2, desc: 'Grão de campos abençoados, nutritivo e silencioso.', use: { ferida: -2, xp: 6 }, value: 20 },

  // Lote 5: sangue, karma e inimigos
  { id: 'lamina_sangrenta', name: 'Lâmina de Aço Sangrento', kind: 'artefato', grade: 3, desc: 'Sempre quente, nunca limpa.', passive: { fis: 2, esp: 1 }, value: 140 },
  { id: 'contas_penitencia', name: 'Contas de Penitência', kind: 'artefato', grade: 2, desc: 'Uma conta para cada vida que se quer reparar.', passive: { dao: 1, esp: 1 }, value: 60 },
  { id: 'talisma_exorcismo', name: 'Talismã de Exorcismo', kind: 'talisma', grade: 3, desc: 'Afasta espíritos vingativos e sussurros (uso único em eventos).', value: 50 },
  { id: 'sino_alma', name: 'Sino da Alma Reconciliada', kind: 'artefato', grade: 4, desc: 'Seu som lembra o que foi perdoado.', passive: { esp: 2, dao: 1 }, value: 260 },

  // Lote 6: budismo e peregrinação
  { id: 'incenso_sagrado', name: 'Incenso de Templo', kind: 'misc', grade: 2, desc: 'Queima devagar, acalma depressa.', use: { xp: 10, stats: { dao: 1 } }, value: 25 },
  { id: 'escritura_oeste', name: 'Escritura do Templo do Oeste', kind: 'manual', grade: 4, desc: 'Poucos caracteres, muitas vidas.', use: { tecnica: ['sutra_do_oeste'] }, value: 400 },
  { id: 'rosario_vajra', name: 'Rosário de Vajra', kind: 'artefato', grade: 3, desc: 'Contas de pedra preta que nunca esquentam.', passive: { dao: 2, fis: 1 }, value: 140 },
  { id: 'tigela_mendicante', name: 'Tigela do Mendigo', kind: 'artefato', grade: 2, desc: 'Amassada, humilde, abençoada.', passive: { sor: 1, dao: 1 }, value: 40 },

  // Lote 7: regressão, Registro Celeste e destino
  { id: 'pena_registro', name: 'Pena do Registro Celeste', kind: 'misc', grade: 3, desc: 'Leve como luz; anota o que você faz, e o que deixou de fazer.', use: { xp: 12, stats: { comp: 1 } }, value: 70 },
  { id: 'fio_destino_vermelho', name: 'Fio Dourado do Destino', kind: 'artefato', grade: 3, desc: 'Entrelaçado por um tecelão que nunca dorme.', passive: { sor: 2, car: 1 }, value: 170 },

  // Lote 9: identidade das trilhas
  { id: 'bastao_ferro_frio', name: 'Bastão de Chifre de Touro', kind: 'artefato', grade: 2, desc: 'Pesado, escuro, ótimo para temperar ossos.', passive: { fis: 2 }, value: 70 },
  { id: 'lamina_vento_sul', name: 'Lâmina do Vento do Sul', kind: 'artefato', grade: 3, desc: 'Guarda a memória de um mestre que nunca perdeu um duelo.', passive: { fis: 1, dao: 1, esp: 1 }, value: 170 },
  { id: 'cristal_formacao', name: 'Cristal de Formação', kind: 'artefato', grade: 2, desc: 'Presente de uma seita pequena: guarda um traço de formação.', passive: { comp: 1, esp: 1 }, value: 80 },
  { id: 'frasco_antidotos', name: 'Frasco dos Nove Antídotos', kind: 'pilula', grade: 3, desc: 'Desfaz quase qualquer toxina, e cura o resto.', use: { ferida: -5, vida: 10 }, value: 90 },

  // Lote 10: regiões distantes
  { id: 'cantil_oasis', name: 'Cantil do Oásis', kind: 'misc', grade: 2, desc: 'Nunca esvazia por completo; sempre tem um gole.', use: { ferida: -2, xp: 5 }, value: 40 },
  { id: 'cristal_inverno', name: 'Cristal do Inverno', kind: 'misc', grade: 3, desc: 'Azul, frio, calmo. Aquieta o Qi ao toque.', use: { xp: 18, stats: { esp: 1 } }, value: 100 },
  { id: 'perola_abismo', name: 'Pérola do Abismo', kind: 'artefato', grade: 4, desc: 'Cintila como a lua cheia sob a água.', passive: { esp: 2, sor: 1 }, value: 280 },

  // Lote 12: torneio
  { id: 'selo_campeao', name: 'Selo de Campeão dos Cem Picos', kind: 'artefato', grade: 3, desc: 'Cera dourada e uma estampa de pico nevado. Abre portas e fecha bocas.', passive: { car: 2, dao: 1 }, value: 160 },

  // Lote 13: o mundo em movimento
  { id: 'cura_da_praga', name: 'Elixir Contra a Febre Espiritual', kind: 'pilula', grade: 3, desc: 'Fórmula antiga que levantou uma fila inteira de doentes.', use: { ferida: -4, vida: 10 }, value: 80 },
  { id: 'fragmento_cometa', name: 'Fragmento de Cometa', kind: 'misc', grade: 4, desc: 'Pedra luminosa, quente ao toque, Qi puro em estado bruto.', use: { xp: 25, stats: { esp: 1 } }, value: 150 },
  // Materiais de bioma e produtos de alquimia/forja
  { id: 'folha_mana', name: 'Folha de Mana', kind: 'material', grade: 1, desc: 'Folha tenra que conserva o Qi da floresta.', value: 6 },
  { id: 'seiva_ardente', name: 'Seiva Ardente', kind: 'material', grade: 1, desc: 'Resina quente usada para estabilizar pílulas.', value: 8 },
  { id: 'mineral_antigo', name: 'Minério de Ruína', kind: 'material', grade: 2, desc: 'Metal antigo, ainda marcado por inscrições.', value: 12 },
  { id: 'poeira_espectral', name: 'Poeira Espectral', kind: 'material', grade: 2, desc: 'Resíduo frio deixado por espíritos das ruínas.', value: 14 },
  { id: 'sal_escarlate', name: 'Sal Escarlate', kind: 'material', grade: 1, desc: 'Cristais avermelhados que purificam toxinas.', value: 7 },
  { id: 'flor_gelo', name: 'Flor do Gelo Silencioso', kind: 'material', grade: 2, desc: 'Uma flor que floresce sob a neve espiritual.', value: 14 },
  { id: 'perola_marinha', name: 'Pérola das Marés', kind: 'material', grade: 2, desc: 'Concentra a pressão espiritual do fundo do mar.', value: 16 },
  { id: 'pilula_purificadora', name: 'Pílula Purificadora de Campo', kind: 'pilula', grade: 2, desc: 'Uma fórmula simples que cura feridas e elimina toxinas comuns.', use: { ferida: -2, clearStatus: ['poisoned', 'bleeding', 'burning', 'frozen'] }, value: 24 },
  { id: 'lamina_bioma', name: 'Lâmina Forjada de Minério Antigo', kind: 'arma', grade: 3, desc: 'Uma lâmina equilibrada, reforçada com uma pérola das marés.', passive: { fis: 2, dao: 1 }, value: 110 },
];

const GRADE_RARITY = {
  1: 'comum',
  2: 'incomum',
  3: 'raro',
  4: 'epico',
  5: 'lendario',
} as const;

export const ITEMS: Item[] = ITEM_DEFS.map((item) => ({
  ...item,
  rarity: GRADE_RARITY[item.grade],
}));
