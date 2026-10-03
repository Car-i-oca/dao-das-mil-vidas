import type { Item } from '../types';

export const ITEMS: Item[] = [
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
];
