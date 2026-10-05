import type { EventType, GameEvent } from '../types';

const hasCombatChoices = (event: GameEvent) => event.choices.some((choice) =>
  !choice.ex && (choice.check?.tag === 'combate' || !!choice.activeTechnique),
);

export function eventTypeOf(event: GameEvent): EventType {
  if (event.type) return event.type;
  if (event.eventType === 'mercador') return 'shop';
  if (event.id.startsWith('caldeirao_')) return 'alchemy';
  if (event.combate || hasCombatChoices(event)) return 'combat';
  return 'narrative';
}

export function hasCombatMechanics(event: GameEvent): boolean {
  return !!event.combate || hasCombatChoices(event);
}
