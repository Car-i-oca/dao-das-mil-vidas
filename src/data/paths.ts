import type { Path } from '../types';

/** Escolas e estilos marciais do novo cenário. IDs legados preservam saves existentes. */
export const PATHS: Path[] = [
  { id: 'sopro', name: 'Punho da Respiração Serena', ladder: 'murim', desc: 'Controle do fôlego, equilíbrio e golpes que vencem pela precisão.', stats: { esp: 2, comp: 1 } },
  { id: 'espada', name: 'Escola da Lâmina Errante', ladder: 'murim', desc: 'Uma espada simples, uma intenção clara e nenhuma promessa de vitória fácil.', stats: { fis: 1, dao: 2 } },
  { id: 'alquimia', name: 'Ofício dos Cem Remédios', ladder: 'murim', desc: 'Conhecimento de ervas, venenos e antídotos, aprendido entre aldeias e estradas.', stats: { comp: 2, sor: 1 } },
  { id: 'corpo', name: 'Punho de Ferro', ladder: 'murim', desc: 'Condicionamento severo, base firme e resistência para continuar de pé.', stats: { fis: 3 } },
  { id: 'alma', name: 'Olho que Lê o Combate', ladder: 'murim', desc: 'Estude postura, intenção e ritmo antes de escolher onde agir.', stats: { esp: 3, comp: 1, fis: -1 } },
  { id: 'formacoes', name: 'Formações das Quatro Pontes', ladder: 'murim', desc: 'Coordene aliados e terreno para vencer sem depender de força bruta.', stats: { comp: 3, sor: 1 } },
  { id: 'budista', name: 'Disciplina do Templo Silencioso', ladder: 'murim', desc: 'Defesa paciente e compromisso de não usar força além do necessário.', stats: { dao: 3, fis: 1 } },
  { id: 'venenos', name: 'Mão das Agulhas Ocultas', ladder: 'murim', desc: 'Agulhas, compostos e leitura cuidadosa de cada risco.', stats: { comp: 1, sor: 1, car: -1 } },
  { id: 'bestas', name: 'Trilha do Caçador das Colinas', ladder: 'murim', desc: 'Rastreio e sobrevivência nas rotas distantes do Jianghu.', stats: { esp: 2, car: 1 } },
  { id: 'demoniaca', name: 'Método da Lua Oca', ladder: 'murim', desc: 'Uma escola clandestina que ensina disfarce, fuga e o preço das escolhas.', stats: { fis: 2, esp: 1, car: -1 } },
];
