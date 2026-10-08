/** Adversários humanos e animais das estradas e escolas do Jianghu. */
export interface Foe {
  id: string;
  name: string;
  moves: string[];
  finisher: string;
  down: string;
  scene: string;
}

export const FOES: Foe[] = [
  { id: 'bandido', name: 'Salteador do Passo Sul', moves: ['Facão de Gancho', 'Areia nos Olhos', 'Chute na Canela', 'Corte de Retorno'], finisher: 'Golpe no Flanco', down: 'larga a arma e recua para a mata', scene: 'selva' },
  { id: 'assassino', name: 'Agente da Lua Oca', moves: ['Agulha Oculta', 'Corte de Manga', 'Passo Sem Ruído', 'Lâmina Invertida'], finisher: 'Estocada às Costas', down: 'se afasta ao notar que perdeu a vantagem', scene: 'cidade' },
  { id: 'cultivador', name: 'Duelista de Escola Rival', moves: ['Corte em Arco', 'Passo Lateral', 'Finta Alta', 'Ponta Direta'], finisher: 'Sequência das Três Linhas', down: 'saúda você e reconhece o resultado', scene: 'seita' },
  { id: 'monge', name: 'Guardião do Templo Silencioso', moves: ['Bastão Circular', 'Palma Aberta', 'Passo Baixo', 'Bloqueio de Ombro'], finisher: 'Queda Controlada', down: 'encerra a luta e estende a mão', scene: 'montanha' },
  { id: 'demonio', name: 'Lutador da Lua Oca', moves: ['Finta Curta', 'Corte Cego', 'Troca de Guarda', 'Golpe de Punho'], finisher: 'Ataque pela Sombra', down: 'abandona o disfarce e se rende', scene: 'cidade' },
  { id: 'espectro', name: 'Espadachim Mascarado', moves: ['Corte de Baixo', 'Passo Recuado', 'Lâmina Cruzada', 'Golpe no Punho'], finisher: 'Estocada na Ponte', down: 'deixa a máscara cair e revela o rosto', scene: 'ruinas' },
  { id: 'lobo', name: 'Lobo da Cordilheira', moves: ['Mordida Curta', 'Salto Lateral', 'Rosnado de Ameaça', 'Arrancada'], finisher: 'Bote da Matilha', down: 'foge ferido para dentro da mata', scene: 'selva' },
  { id: 'serpente', name: 'Serpente-das-Pedras', moves: ['Bote Rápido', 'Cauda em Chicote', 'Mordida de Defesa', 'Rastejo'], finisher: 'Enrolar o Tornozelo', down: 'escapa por uma fenda entre as pedras', scene: 'montanha' },
  { id: 'golem', name: 'Capitão de Armadura', moves: ['Escudo à Frente', 'Pancada de Punho', 'Avanço Pesado', 'Empurrão de Ombro'], finisher: 'Carga de Escudo', down: 'cai sentado e pede que a luta termine', scene: 'cidade' },
  { id: 'tigre', name: 'Tigre da Mata Alta', moves: ['Garrada', 'Investida', 'Salto Curto', 'Mordida de Aviso'], finisher: 'Bote do Predador', down: 'rosna e recua para a vegetação', scene: 'montanha' },
  { id: 'dragao', name: 'Mestre da Escola do Rio', moves: ['Passo sobre Água', 'Corte Ascendente', 'Palma Curta', 'Mudança de Ritmo'], finisher: 'Queda do Remanso', down: 'admite a derrota e oferece uma revanche futura', scene: 'mar' },
  { id: 'raio', name: 'Instrutor das Quatro Pontes', moves: ['Comando de Flanco', 'Troca de Linha', 'Avanço em Dupla', 'Defesa Fechada'], finisher: 'Formação do Arco', down: 'encerra o exercício e corrige sua postura', scene: 'seita' },
  { id: 'chefe_selva', name: 'Chefe dos Salteadores', moves: ['Facão Pesado', 'Chute de Varredura', 'Finta de Ombro', 'Ataque em Carga'], finisher: 'Corte do Chefe', down: 'manda os outros largarem as armas', scene: 'selva' },
  { id: 'guardiao_ferro', name: 'Veterano do Armazém', moves: ['Escudo de Carga', 'Martelo Curto', 'Passo de Guarda', 'Golpe no Joelho'], finisher: 'Golpe de Marreta', down: 'se rende quando os registros são recuperados', scene: 'cidade' },
  { id: 'rival_seita', name: 'Duelista da Escola da Garça', moves: ['Passo da Garça', 'Corte Espelhado', 'Toque no Punho', 'Investida de Ponta'], finisher: 'Sequência da Asa Fechada', down: 'saúda você e aceita o resultado do duelo', scene: 'seita' },
];

export const FOE: Record<string, Foe> = Object.fromEntries(FOES.map((foe) => [foe.id, foe]));
export const COMBATE_EVENTOS: Record<string, string> = {};

const KEYS: [RegExp, string][] = [
  [/tigre|lobo|fera|besta|animal/i, 'lobo'],
  [/assassin|espi[aã]o|lua oca/i, 'assassino'],
  [/bandido|salteador|emboscada|ladr[aã]o/i, 'bandido'],
  [/monge|templo|bast[aã]o/i, 'monge'],
  [/duelo|torneio|rival|espadachim|mestre/i, 'rival_seita'],
];

export function foeFor(id: string, title: string, text: string, explicit?: string): string {
  if (explicit && FOE[explicit]) return explicit;
  for (const [pattern, foe] of KEYS) if (pattern.test(id) || pattern.test(title)) return foe;
  for (const [pattern, foe] of KEYS) if (pattern.test(text)) return foe;
  return 'rival_seita';
}
