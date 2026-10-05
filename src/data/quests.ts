import type { QuestDefinition } from '../types';

export const QUESTS: QuestDefinition[] = [
  {
    id: 'contrato_lobos_selva',
    title: 'Matilha sob Recompensa',
    description: 'Derrote dois lobos espirituais na Selva das Feras.',
    objective: { kind: 'defeat', count: 2, foe: 'lobo', place: 'selva' },
    reward: { pedras: 45, reputation: 8 },
  },
  {
    id: 'contrato_folhas',
    title: 'Ingredientes para a Enfermaria',
    description: 'Reúna duas Folhas de Mana na Selva.',
    objective: { kind: 'collect', count: 2, item: 'folha_mana', place: 'selva' },
    reward: { pedras: 25, reputation: 5 },
  },
  {
    id: 'contrato_refino',
    title: 'Fórmula de Purificação',
    description: 'Refine uma Pílula Purificadora no caldeirão de campo.',
    objective: { kind: 'craft', count: 1, item: 'pilula_purificadora', eventId: 'caldeirao_viagem' },
    reward: { pedras: 35, reputation: 7 },
  },
];
