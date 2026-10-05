import type { Technique } from '../types';
import { TECNICAS_NOVAS } from './tecnicas_novas';

/** Grau 1 = Mortal, 2 = Terra, 3 = Céu, 4 = Divino. O grau soma bônus em testes com a mesma tag. */
export const TECHNIQUES: Technique[] = [
  { id: 'respiracao_nuvem', name: 'Respiração da Nuvem Lenta', grade: 1, desc: 'Método básico de absorção de Qi.', xpMult: 1.05, tags: ['qi'] },
  { id: 'espada_orvalho', name: 'Espada do Orvalho', grade: 1, desc: 'Golpes simples, rápidos e honestos.', tags: ['espada', 'combate'], martial: { qiCost: 2, cooldown: 1, power: 1, status: { id: 'focused', turns: 2, potency: 1 } } },
  { id: 'caldeirao_calmo', name: 'Caldeirão de Fogo Calmo', grade: 1, desc: 'Controle básico de chama para pílulas.', tags: ['alquimia'] },
  { id: 'ossos_de_ferro', name: 'Ossos de Ferro Frio', grade: 1, desc: 'Temperar o corpo a golpes de martelo.', stats: { fis: 2 }, tags: ['corpo', 'combate'], martial: { qiCost: 2, cooldown: 1, power: 1, status: { id: 'guarded', turns: 2, potency: 1 } } },
  { id: 'passo_garca', name: 'Passo da Garça Cinzenta', grade: 1, desc: 'Leveza para fugir e para chegar primeiro.', stats: { sor: 1 }, tags: ['fuga'] },
  { id: 'palma_cinzas', name: 'Palma das Cinzas Quentes', grade: 2, desc: 'Uma palma que queima por dentro.', tags: ['combate'], martial: { qiCost: 3, cooldown: 2, power: 2, status: { id: 'focused', turns: 2, potency: 1 } } },
  { id: 'olho_lotus', name: 'Olho de Lótus Fechado', grade: 2, desc: 'Percepção espiritual que vê através de ilusões.', stats: { esp: 2 }, tags: ['formacao', 'social'] },
  { id: 'espada_tres_luas', name: 'Espada das Três Luas', grade: 2, desc: 'Três cortes, três luas, nenhum aviso.', tags: ['espada', 'combate'], martial: { qiCost: 3, cooldown: 2, power: 2, status: { id: 'focused', turns: 3, potency: 1 } } },
  { id: 'caminho_do_sangue', name: 'Sutra do Sangue Ardente', grade: 2, desc: 'Poder rápido, preço escuro.', xpMult: 1.18, tags: ['demonio', 'combate'], martial: { qiCost: 3, cooldown: 2, power: 2, status: { id: 'focused', turns: 2, potency: 1 } } },
  { id: 'forja_sol_interior', name: 'Forja do Sol Interior', grade: 3, desc: 'Transforma o Dantian numa fornalha estável.', xpMult: 1.15, tags: ['qi'] },
  { id: 'corpo_vajra_menor', name: 'Corpo de Diamante Menor', grade: 3, desc: 'A pele ganha brilho de metal sagrado.', stats: { fis: 4 }, tags: ['corpo', 'combate'] },
  { id: 'selo_nove_portas', name: 'Selo das Nove Portas', grade: 3, desc: 'Arranjo de formações para prender e proteger.', tags: ['formacao'] },
  { id: 'sutra_vazio_calmo', name: 'Sutra do Vazio Calmo', grade: 3, desc: 'Silêncio interior que domina demônios.', stats: { dao: 3 }, tags: ['mente'] },
  { id: 'fogo_nove_estacoes', name: 'Fogo das Nove Estações', grade: 3, desc: 'Cada estação, uma chama; cada chama, uma pílula.', tags: ['alquimia'] },
  { id: 'espada_corta_ceu', name: 'Espada que Corta o Céu', grade: 4, desc: 'Um golpe que a própria tribulação respeita.', tags: ['espada', 'combate'] },
  { id: 'sutra_do_ciclo', name: 'Grande Sutra do Ciclo', grade: 4, desc: 'Morte e renascimento como respiração.', stats: { comp: 3 }, xpMult: 1.25, tags: ['juventude', 'qi', 'mente'] },
  // Trilhas novas
  { id: 'mar_de_consciencia', name: 'Respiração do Mar Calmo', grade: 1, desc: 'Amplia o Mar da Consciência, onde pensamentos viram ondas.', stats: { esp: 2 }, tags: ['mente'] },
  { id: 'agulha_de_alma', name: 'Agulha de Alma', grade: 2, desc: 'Fio de consciência divina afiado como agulha.', tags: ['mente', 'combate'] },
  { id: 'selo_primeiro_traco', name: 'Traços do Primeiro Selo', grade: 1, desc: 'O alfabeto das formações: um traço, uma regra.', stats: { comp: 1 }, tags: ['formacao'] },
  { id: 'formacao_estrelas', name: 'Grande Arranjo das Sete Estrelas', grade: 3, desc: 'Uma formação que empresta força ao céu noturno.', stats: { comp: 2 }, tags: ['formacao', 'combate'] },
  { id: 'sutra_do_merito', name: 'Sutra do Mérito Silencioso', grade: 1, desc: 'Cada ato bom é um tijolo; cada tijolo, um muro.', stats: { dao: 1 }, tags: ['mente'] },
  { id: 'punho_vajra', name: 'Punho do Vajra', grade: 2, desc: 'Um punho que carrega o peso de uma montanha serena.', tags: ['corpo', 'combate'] },
  { id: 'mil_agulhas', name: 'Chuva de Mil Agulhas', grade: 1, desc: 'Agulhas finas, rápidas, untadas de silêncio.', tags: ['veneno', 'combate'], martial: { qiCost: 2, cooldown: 1, power: 1, status: { id: 'focused', turns: 2, potency: 1 } } },
  { id: 'nevoa_sete_venenos', name: 'Névoa dos Sete Venenos', grade: 2, desc: 'Uma névoa colorida que cobra pedágio dos pulmões.', tags: ['veneno', 'combate'], martial: { qiCost: 3, cooldown: 2, power: 2, status: { id: 'focused', turns: 3, potency: 1 } } },
  { id: 'pacto_da_fera', name: 'Pacto da Fera Irmã', grade: 1, desc: 'Compartilhar sentidos e fome com uma besta.', stats: { esp: 1, sor: 1 }, tags: ['besta'] },
  { id: 'rugido_dragao_jovem', name: 'Rugido do Dragão Jovem', grade: 3, desc: 'O grito que faz feras ajoelharem.', stats: { fis: 2 }, tags: ['besta', 'combate'] },
  { id: 'devorador_de_almas', name: 'Sutra do Devorador de Almas', grade: 3, desc: 'Poder roubado, nunca pago.', xpMult: 1.25, tags: ['demonio', 'combate'] },
  { id: 'passo_vento_nove', name: 'Nove Passos do Vento', grade: 2, desc: 'Nove passos e você já estava lá.', stats: { sor: 1 }, tags: ['fuga'] },
  { id: 'sutra_ceu_vazio', name: 'Sutra do Céu Vazio', grade: 3, desc: 'Quem nada carrega, nada o carrega.', stats: { dao: 2, esp: 1 }, tags: ['mente'] },

  // Lote 1: vida na seita
  { id: 'respiracao_coletiva', name: 'Respiração Coletiva', grade: 2, desc: 'Une sua respiração à do pavilhão inteiro.', xpMult: 1.08, tags: ['qi'] },
  { id: 'guarda_do_portao', name: 'Guarda do Portão', grade: 2, desc: 'Pés plantados, coração firme: ninguém passa.', stats: { fis: 1 }, tags: ['corpo', 'combate'] },
  { id: 'sutra_do_anciao', name: 'Sutra do Ancião Recluso', grade: 3, desc: 'Um método antigo, escrito à mão e passado em segredo.', stats: { dao: 2 }, tags: ['mente'] },

  // Lote 2: reinos secretos
  { id: 'passo_nevoa', name: 'Passo da Névoa Dourada', grade: 2, desc: 'Caminhar entre brumas sem deixar rastro.', stats: { sor: 1 }, tags: ['fuga', 'formacao'] },
  { id: 'sutra_espelho', name: 'Sutra do Espelho Quieto', grade: 3, desc: 'Ver a si mesmo sem se esconder.', stats: { dao: 1, comp: 1 }, tags: ['mente'] },
  { id: 'canto_jingwei', name: 'Canto da Ave Persistente', grade: 3, desc: 'A lição de quem nunca para de carregar pedras.', stats: { dao: 2 }, tags: ['mente', 'corpo'] },
  { id: 'olhar_bai_ze', name: 'Olhar de Bai Ze', grade: 4, desc: 'Conhecer o nome de cada espírito e de cada falha.', stats: { comp: 3 }, xpMult: 1.08, tags: ['mente', 'formacao'] },

  // Lote 3: alquimia e forja
  { id: 'fogo_coracao', name: 'Fogo do Coração Sereno', grade: 3, desc: 'A chama obedece ao pulso do alquimista.', xpMult: 1.04, tags: ['alquimia', 'qi'] },
  { id: 'martelo_ressonante', name: 'Martelo Ressonante', grade: 2, desc: 'Cada golpe do martelo canta a nota do metal.', stats: { fis: 1 }, tags: ['forja', 'combate'] },
  { id: 'selo_espirito_arma', name: 'Selo do Espírito da Arma', grade: 3, desc: 'Une espírito e lâmina, para que se completem.', stats: { dao: 1 }, tags: ['espada', 'combate', 'forja'] },

  // Lote 4: mundo mortal e família
  { id: 'sutra_familia', name: 'Sutra da Casa Acesa', grade: 2, desc: 'Cada ausência vira raiz; cada lembrança, chama.', stats: { dao: 1 }, tags: ['mente'] },
  { id: 'passo_jianghu', name: 'Passo do Andarilho do Jianghu', grade: 1, desc: 'Para quem dorme em estalagens e acorda em estradas.', stats: { sor: 1 }, tags: ['fuga', 'social'] },

  // Lote 5: sangue, karma e inimigos
  { id: 'passo_sombrio', name: 'Passo da Sombra Longa', grade: 2, desc: 'Move-se onde a luz não alcança.', stats: { sor: 1 }, tags: ['fuga', 'demonio'] },
  { id: 'sutra_cinzento', name: 'Sutra do Caminho Cinzento', grade: 3, desc: 'Domar a sombra sem negá-la.', stats: { dao: 2, esp: 1 }, tags: ['mente', 'demonio'] },

  // Lote 6: budismo e peregrinação
  { id: 'mantra_cem_mil', name: 'Mantra das Cem Mil Voltas', grade: 2, desc: 'Recitado até a boca virar respiração.', stats: { dao: 1 }, tags: ['mente'] },
  { id: 'koan_riso', name: 'Koan do Riso Antes do Nascimento', grade: 2, desc: 'Uma pergunta sem resposta que destrava respostas.', stats: { comp: 1 }, tags: ['mente'] },
  { id: 'sutra_do_oeste', name: 'Sutra do Templo do Oeste', grade: 4, desc: 'A escritura que a estrada inteira escreveu em você.', stats: { dao: 3, esp: 1 }, xpMult: 1.06, tags: ['mente'] },

  // Lote 7: regressão, Registro Celeste e destino
  { id: 'memoria_vida_passada', name: 'Memória de Mão Antiga', grade: 2, desc: 'Selos que o corpo lembra, mesmo quando a mente esquece.', stats: { comp: 1 }, tags: ['mente', 'formacao'] },
  { id: 'olho_registro', name: 'Olho do Registro', grade: 3, desc: 'Ler a anotação em branco ao lado do próprio nome.', stats: { comp: 2 }, tags: ['mente', 'formacao'] },
  { id: 'passo_destino', name: 'Passo Sem Fio', grade: 3, desc: 'Andar fora do traçado que alguém desenhou para você.', stats: { sor: 2 }, tags: ['fuga', 'mente'] },

  // Lote 9: identidade das trilhas
  { id: 'respiracao_cem_ciclos', name: 'Ciclo de Cem Respirações', grade: 3, desc: 'Cem respirações, nenhuma igual; um fôlego do tamanho de um rio.', stats: { esp: 1 }, xpMult: 1.06, tags: ['juventude', 'qi'] },
  { id: 'pele_de_bronze', name: 'Pele de Bronze', grade: 2, desc: 'A pele escurece, brilha e aguenta golpes de tijolo.', stats: { fis: 2 }, tags: ['corpo', 'combate'] },
  { id: 'intencao_lamina', name: 'Intenção da Lâmina', grade: 3, desc: 'Cortar a vontade do golpe antes de ele nascer.', stats: { dao: 2 }, tags: ['espada', 'combate'] },
  { id: 'selo_da_consciencia', name: 'Selo da Consciência', grade: 3, desc: 'Ler e agir sobre almas, com cuidado e culpa.', stats: { esp: 2 }, tags: ['mente', 'combate'] },
  { id: 'formacao_labirinto', name: 'Labirinto das Mil Voltas', grade: 3, desc: 'O mesmo caminho repetido até quem entra desistir.', stats: { comp: 1 }, tags: ['formacao', 'combate'] },
  { id: 'sutra_coracao_diamante', name: 'Sutra do Coração de Diamante', grade: 3, desc: 'Tudo é ilusão, inclusive o sutra. E isso basta.', stats: { dao: 2 }, tags: ['mente'] },
  { id: 'mestre_antidotos', name: 'Arte dos Antídotos', grade: 2, desc: 'Desfazer o que se sabe fazer.', stats: { comp: 1 }, tags: ['veneno', 'alquimia'] },
  { id: 'voz_das_feras', name: 'Voz das Feras', grade: 3, desc: 'Uma voz baixa e vasta que lobos, pássaros e serpentes entendem.', stats: { esp: 1, car: 1 }, tags: ['besta'] },
  { id: 'chama_sangue_negro', name: 'Chama do Sangue Negro', grade: 3, desc: 'Fogo preto que só acende em quem já passou do ponto sem volta.', xpMult: 1.1, tags: ['demonio', 'combate'] },

  // Lote 10: regiões distantes
  { id: 'passo_areia', name: 'Passo Sobre a Areia', grade: 2, desc: 'Andar sobre dunas sem afundar, e ler o vento como um livro.', stats: { sor: 1 }, tags: ['fuga'] },

  // Lote 12: torneio
  { id: 'golpe_campeao', name: 'Golpe do Campeão dos Cem Picos', grade: 3, desc: 'O golpe que fez dez mil vozes gritarem de uma vez.', stats: { fis: 1 }, tags: ['combate'] },

  // Lote 13: o mundo em movimento
  { id: 'defesa_muralha', name: 'Defesa da Muralha de Pedra Viva', grade: 2, desc: 'Linhas de Qi que correm pela pedra como veias.', stats: { fis: 1 }, tags: ['formacao', 'combate'] },
  { id: 'respiracao_lunar', name: 'Respiração da Lua Cheia', grade: 3, desc: 'Qi lunar, mais suave que o solar, entra como leite morno.', stats: { esp: 1 }, xpMult: 1.04, tags: ['juventude', 'qi'] },
  { id: 'oracao_ancestrais', name: 'Oração dos Ancestrais', grade: 2, desc: 'Dizer em voz baixa o nome de quem partiu; a colina ouve.', stats: { dao: 1 }, tags: ['mente'] },
  ...TECNICAS_NOVAS,
];
