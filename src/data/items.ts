import type { Item } from '../types';

/** Equipamento, ferramentas e remédios da nova campanha de Murim. */
const ITEM_DEFS: Omit<Item, 'rarity'>[] = [
  { id: 'espada_ferro_viagem', name: 'Sabre de Viagem', kind: 'arma', grade: 1, desc: 'Lâmina simples, equilibrada e fácil de reparar.', equipmentSlot: 'rightWeapon', bonuses: { fis: 3 }, value: 24 },
  { id: 'manto_peles', name: 'Manto de Estrada', kind: 'armadura', grade: 1, desc: 'Lona encerada e lã grossa contra vento, chuva e frio.', equipmentSlot: 'armor', bonuses: { fis: 1 }, coldProtection: true, value: 22 },
  { id: 'adaga_guarda', name: 'Adaga de Guarda', kind: 'arma', grade: 1, desc: 'Lâmina curta feita para aparar e abrir espaço.', equipmentSlot: 'leftWeapon', bonuses: { esp: 1 }, value: 18 },
  { id: 'lamina_armazem', name: 'Lâmina do Armazém', kind: 'arma', grade: 2, desc: 'Uma lâmina curta encontrada entre os registros do cais.', equipmentSlot: 'leftWeapon', bonuses: { fis: 1, sor: 1 }, value: 14 },
  { id: 'pingente_jade', name: 'Ficha de Jade', kind: 'artefato', grade: 1, desc: 'Uma ficha de identificação que pertenceu à Escola da Garça.', equipmentSlot: 'accessory', bonuses: { car: 1 }, value: 22 },
  { id: 'espada_inverno', name: 'Sabre da Escola do Norte', kind: 'arma', grade: 4, desc: 'Lâmina de aço temperado, firme mesmo nas mãos cansadas.', equipmentSlot: 'rightWeapon', bonuses: { fis: 7, dao: 2 }, value: 480 },
  { id: 'espada_inverno_fragil', name: 'Sabre Trincado', kind: 'arma', grade: 2, desc: 'Uma lâmina avariada que ainda pode proteger seu dono.', equipmentSlot: 'rightWeapon', bonuses: { fis: 3, dao: 1 }, value: 110 },
  { id: 'armadura_qi_escamas', name: 'Colete de Escamas', kind: 'armadura', grade: 4, desc: 'Placas sobrepostas desviam cortes e protegem o tronco.', equipmentSlot: 'armor', bonuses: { fis: 4, dao: 2 }, coldProtection: true, value: 520 },
  { id: 'armadura_qi_escamas_trincada', name: 'Colete de Escamas Danificado', kind: 'armadura', grade: 2, desc: 'Proteção útil apesar das placas rachadas.', equipmentSlot: 'armor', bonuses: { fis: 2, dao: 1 }, coldProtection: true, value: 130 },
  { id: 'pilula_qi_menor', name: 'Tônico de Recuperação', kind: 'pilula', grade: 1, desc: 'Ajuda a recuperar o fôlego depois do treino.', use: { xp: 8 }, value: 4 },
  { id: 'pilula_qi_media', name: 'Tônico de Raiz Forte', kind: 'pilula', grade: 2, desc: 'Recupera energia para uma sessão de treino exigente.', use: { xp: 15 }, value: 12 },
  { id: 'pilula_qi_maior', name: 'Tônico de Longa Jornada', kind: 'pilula', grade: 3, desc: 'Uma mistura concentrada para retomar o treinamento.', use: { xp: 30 }, value: 40 },
  { id: 'pilula_cura', name: 'Unguento de Ervas', kind: 'pilula', grade: 1, desc: 'Limpa e fecha cortes superficiais.', use: { ferida: -2 }, value: 5 },
  { id: 'pilula_cura_maior', name: 'Cataplasma de Casca', kind: 'pilula', grade: 2, desc: 'Alivia dores e ajuda a recuperar ferimentos.', use: { ferida: -5 }, value: 18 },
  { id: 'talisma_escudo', name: 'Broquel de Emergência', kind: 'talisma', grade: 2, desc: 'Placa leve presa ao antebraço; pode absorver um golpe fatal.', value: 25 },
  { id: 'espada_ferro_frio', name: 'Faca de Acampamento', kind: 'artefato', grade: 1, desc: 'Ferramenta resistente que também serve de arma reserva.', passive: { fis: 1 }, value: 8 },
  { id: 'espada_aprendiz', name: 'Espada de Treino Reforçada', kind: 'artefato', grade: 2, desc: 'Arma de madeira densa, pesada o bastante para corrigir a postura.', passive: { fis: 1, dao: 1 }, value: 40 },
  { id: 'erva_orvalho', name: 'Folha de Hortelã Selvagem', kind: 'erva', grade: 1, desc: 'Erva fresca que reduz o cansaço e acalma o estômago.', use: { xp: 5 }, value: 3 },
  { id: 'erva_cem_anos', name: 'Raiz de Ginseng', kind: 'erva', grade: 2, desc: 'Raiz amarga usada em caldos para restaurar o vigor.', use: { xp: 12, stats: { esp: 1 } }, value: 15 },
  { id: 'erva_mil_anos', name: 'Raiz de Cordilheira', kind: 'erva', grade: 3, desc: 'Ingrediente raro, colhido em encostas difíceis.', use: { xp: 25, vida: 10 }, value: 80 },
  { id: 'lamina_bioma', name: 'Lâmina da Costa', kind: 'arma', grade: 3, desc: 'Espada curta feita para convés molhado e combate próximo.', equipmentSlot: 'rightWeapon', bonuses: { fis: 2, dao: 1 }, value: 110 },
];

const GRADE_RARITY = { 1: 'comum', 2: 'incomum', 3: 'raro', 4: 'epico', 5: 'lendario' } as const;
export const ITEMS: Item[] = ITEM_DEFS.map((item) => ({ ...item, rarity: GRADE_RARITY[item.grade] }));
