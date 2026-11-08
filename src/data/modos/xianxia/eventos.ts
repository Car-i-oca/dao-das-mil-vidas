import type { GameEvent } from '../../../types';

/**
 * Eventos de reserva do motor clássico no modo Xianxia. A vida em si é conduzida pelo diretor de história da v2
 * (src/engine/v2): estes dois só entram quando o diretor não tem cena ou a pessoa nunca desperta.
 */
export const EVENTOS_XIANXIA: GameEvent[] = [
  {
    id: 'dia_comum', title: 'Mais um Ano', rarity: 'comum', cooldown: 0, weight: 0.02,
    text: 'O tempo passa em silêncio. Estações vêm, vão, e você segue o caminho com a paciência de uma pedra no rio.',
    choices: [{ text: 'Continuar.', res: { text: 'Você respira, medita, vive.', fx: { xp: 3 } } }],
  },
  {
    id: 'vida_comum', title: 'A Vida Comum Chama', rarity: 'comum', once: true,
    cond: { tierMax: 0, ageMin: 30 },
    weight: 0.001,
    text: 'Aos {idade} anos, o sonho do Dao ficou para trás. A vida de {vila} oferece trabalho, uma casa e talvez uma família. Mas, no fundo, algo ainda brilha.',
    choices: [
      { text: 'Aceitar a vida simples.', res: { text: 'Você planta, colhe e envelhece em paz. Em noites claras, olha as estrelas e sorri.', fx: { fim: 'mortal' } } },
      { text: 'Uma última tentativa de despertar.', check: { stat: 'dao', dif: 5 }, ok: { text: 'Com as últimas forças da juventude, você consegue. O Qi desperta e todo o tempo perdido some como névoa.', fx: { tier: 1, setFlags: ['despertou'], faccao: 'errante', stats: { dao: 2 } } }, fail: { text: 'Nada acontece. A porta se fecha, gentil, mas definitiva.', fx: { fim: 'mortal' } } },
    ],
  },
];
