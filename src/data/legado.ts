/** Aprimoramentos permanentes do Legado: valem para todos os modos de jogo. */
export const UPGRADES = [
  { id: 'corpo', name: 'Treino de força', desc: '+1 Físico inicial por nível', max: 5, cost: 14 },
  { id: 'mente', name: 'Estudo de técnicas', desc: '+1 Técnica inicial por nível', max: 5, cost: 14 },
  { id: 'destino', name: 'Instinto de estrada', desc: '+1 Instinto inicial por nível', max: 5, cost: 20 },
  { id: 'ritmo', name: 'Rotina disciplinada', desc: '+2% de progresso de treino por nível', max: 6, cost: 18 },
  { id: 'bolso', name: 'Economias de família', desc: '+10 moedas iniciais por nível', max: 10, cost: 8 },
  { id: 'sorteio', name: 'Mais opções de origem', desc: '+1 novo sorteio na criação por nível', max: 3, cost: 80 },
  { id: 'memoria', name: 'Caderno de viagem', desc: '+0,8% de chance em todos os testes por nível', max: 4, cost: 90 },
] as const;

/** Preço do próximo nível: cresce com o nível atual. */
export const upgradePrice = (cost: number, level: number) => Math.round(cost * Math.pow(level + 1, 1.5));
