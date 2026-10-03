import type { Technique } from '../types';

/** Grau 1 = Mortal, 2 = Terra, 3 = Céu, 4 = Divino. O grau soma bônus em testes com a mesma tag. */
export const TECHNIQUES: Technique[] = [
  { id: 'respiracao_nuvem', name: 'Respiração da Nuvem Lenta', grade: 1, desc: 'Método básico de absorção de Qi.', xpMult: 1.05, tags: ['qi'] },
  { id: 'espada_orvalho', name: 'Espada do Orvalho', grade: 1, desc: 'Golpes simples, rápidos e honestos.', tags: ['espada', 'combate'] },
  { id: 'caldeirao_calmo', name: 'Caldeirão de Fogo Calmo', grade: 1, desc: 'Controle básico de chama para pílulas.', tags: ['alquimia'] },
  { id: 'ossos_de_ferro', name: 'Ossos de Ferro Frio', grade: 1, desc: 'Temperar o corpo a golpes de martelo.', stats: { fis: 2 }, tags: ['corpo', 'combate'] },
  { id: 'passo_garca', name: 'Passo da Garça Cinzenta', grade: 1, desc: 'Leveza para fugir e para chegar primeiro.', stats: { sor: 1 }, tags: ['fuga'] },
  { id: 'palma_cinzas', name: 'Palma das Cinzas Quentes', grade: 2, desc: 'Uma palma que queima por dentro.', tags: ['combate'] },
  { id: 'olho_lotus', name: 'Olho de Lótus Fechado', grade: 2, desc: 'Percepção espiritual que vê através de ilusões.', stats: { esp: 2 }, tags: ['formacao', 'social'] },
  { id: 'espada_tres_luas', name: 'Espada das Três Luas', grade: 2, desc: 'Três cortes, três luas, nenhum aviso.', tags: ['espada', 'combate'] },
  { id: 'caminho_do_sangue', name: 'Sutra do Sangue Ardente', grade: 2, desc: 'Poder rápido, preço escuro.', xpMult: 1.18, tags: ['demonio', 'combate'] },
  { id: 'forja_sol_interior', name: 'Forja do Sol Interior', grade: 3, desc: 'Transforma o Dantian numa fornalha estável.', xpMult: 1.15, tags: ['qi'] },
  { id: 'corpo_vajra_menor', name: 'Corpo de Diamante Menor', grade: 3, desc: 'A pele ganha brilho de metal sagrado.', stats: { fis: 4 }, tags: ['corpo', 'combate'] },
  { id: 'selo_nove_portas', name: 'Selo das Nove Portas', grade: 3, desc: 'Arranjo de formações para prender e proteger.', tags: ['formacao'] },
  { id: 'sutra_vazio_calmo', name: 'Sutra do Vazio Calmo', grade: 3, desc: 'Silêncio interior que domina demônios.', stats: { dao: 3 }, tags: ['mente'] },
  { id: 'fogo_nove_estacoes', name: 'Fogo das Nove Estações', grade: 3, desc: 'Cada estação, uma chama; cada chama, uma pílula.', tags: ['alquimia'] },
  { id: 'espada_corta_ceu', name: 'Espada que Corta o Céu', grade: 4, desc: 'Um golpe que a própria tribulação respeita.', tags: ['espada', 'combate'] },
  { id: 'sutra_do_ciclo', name: 'Grande Sutra do Ciclo', grade: 4, desc: 'Morte e renascimento como respiração.', stats: { comp: 3 }, xpMult: 1.25, tags: ['qi', 'mente'] },
  // Trilhas novas
  { id: 'mar_de_consciencia', name: 'Respiração do Mar Calmo', grade: 1, desc: 'Amplia o Mar da Consciência, onde pensamentos viram ondas.', stats: { esp: 2 }, tags: ['mente'] },
  { id: 'agulha_de_alma', name: 'Agulha de Alma', grade: 2, desc: 'Fio de consciência divina afiado como agulha.', tags: ['mente', 'combate'] },
  { id: 'selo_primeiro_traco', name: 'Traços do Primeiro Selo', grade: 1, desc: 'O alfabeto das formações: um traço, uma regra.', stats: { comp: 1 }, tags: ['formacao'] },
  { id: 'formacao_estrelas', name: 'Grande Arranjo das Sete Estrelas', grade: 3, desc: 'Uma formação que empresta força ao céu noturno.', stats: { comp: 2 }, tags: ['formacao', 'combate'] },
  { id: 'sutra_do_merito', name: 'Sutra do Mérito Silencioso', grade: 1, desc: 'Cada ato bom é um tijolo; cada tijolo, um muro.', stats: { dao: 1 }, tags: ['mente'] },
  { id: 'punho_vajra', name: 'Punho do Vajra', grade: 2, desc: 'Um punho que carrega o peso de uma montanha serena.', tags: ['corpo', 'combate'] },
  { id: 'mil_agulhas', name: 'Chuva de Mil Agulhas', grade: 1, desc: 'Agulhas finas, rápidas, untadas de silêncio.', tags: ['veneno', 'combate'] },
  { id: 'nevoa_sete_venenos', name: 'Névoa dos Sete Venenos', grade: 2, desc: 'Uma névoa colorida que cobra pedágio dos pulmões.', tags: ['veneno', 'combate'] },
  { id: 'pacto_da_fera', name: 'Pacto da Fera Irmã', grade: 1, desc: 'Compartilhar sentidos e fome com uma besta.', stats: { esp: 1, sor: 1 }, tags: ['besta'] },
  { id: 'rugido_dragao_jovem', name: 'Rugido do Dragão Jovem', grade: 3, desc: 'O grito que faz feras ajoelharem.', stats: { fis: 2 }, tags: ['besta', 'combate'] },
  { id: 'devorador_de_almas', name: 'Sutra do Devorador de Almas', grade: 3, desc: 'Poder roubado, nunca pago.', xpMult: 1.25, tags: ['demonio', 'combate'] },
  { id: 'passo_vento_nove', name: 'Nove Passos do Vento', grade: 2, desc: 'Nove passos e você já estava lá.', stats: { sor: 1 }, tags: ['fuga'] },
  { id: 'sutra_ceu_vazio', name: 'Sutra do Céu Vazio', grade: 3, desc: 'Quem nada carrega, nada o carrega.', stats: { dao: 2, esp: 1 }, tags: ['mente'] },

  // Lote 1: vida na seita
  { id: 'respiracao_coletiva', name: 'Respiração Coletiva', grade: 2, desc: 'Une sua respiração à do pavilhão inteiro.', xpMult: 1.08, tags: ['qi'] },
  { id: 'guarda_do_portao', name: 'Guarda do Portão', grade: 2, desc: 'Pés plantados, coração firme: ninguém passa.', stats: { fis: 1 }, tags: ['corpo', 'combate'] },
  { id: 'sutra_do_anciao', name: 'Sutra do Ancião Recluso', grade: 3, desc: 'Um método antigo, escrito à mão e passado em segredo.', stats: { dao: 2 }, tags: ['mente'] },
];
