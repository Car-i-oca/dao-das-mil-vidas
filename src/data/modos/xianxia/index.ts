import type { State } from '../../../types';
import type { PacoteModo } from '../tipos';
import { ORIGINS, TALENTS, FLAWS } from './character';
import { PATHS } from './paths';
import { personName, sectName, clanName, villageName, rollRoot, CONSTITUTIONS } from './nomes';
import { ITEMS } from './items';
import { ENDINGS, ACHIEVEMENTS, ACH_CHECKS, ACH_POINTS, UPGRADES } from './endings';
import { LADDERS } from './realms';
import { MARCAS_VIDA } from './marcas_vida';
import { RETIRO_TEXTS, RETIRO_PATH_LINES, RETIRO_EXIT } from './retiros';
import { EVENTOS_XIANXIA } from './eventos';
import { MOLDES } from './v2';

/** Reserva do motor clássico: o diretor da v2 escolhe o final de velhice (finalDeVelhiceV2) e tem prioridade; aqui só sobram os dois finais simples. */
function finalDeVelhice(s: State): string {
  return s.tier > 0 && s.fama < 20 ? 'velhice_esquecido' : 'velhice';
}

/** Cultivação (Xianxia): reinos, séculos de vida, seitas, alquimia e tribulações, conduzida pelo mundo com memória da v2. */
export const XIANXIA: PacoteModo = {
  id: 'xianxia',
  nome: 'Xianxia',
  subtitulo: 'Cultivo',
  resumo: 'Cultivação rumo à imortalidade: reinos, séculos de vida, seitas, alquimia e tribulações.',
  eventos: EVENTOS_XIANXIA,
  cenas: MOLDES.length,
  trilhas: PATHS,
  origens: ORIGINS,
  talentos: TALENTS,
  defeitos: FLAWS,
  itens: ITEMS,
  finais: ENDINGS,
  conquistas: ACHIEVEMENTS,
  melhorias: UPGRADES,
  checks: ACH_CHECKS,
  pontos: ACH_POINTS,
  escadas: LADDERS,
  escadaSemTrilha: 'neutro',
  marcasVida: MARCAS_VIDA,
  regioes: {},
  afinidades: {},
  retiro: { textos: RETIRO_TEXTS, trilha: RETIRO_PATH_LINES, saida: RETIRO_EXIT },
  nomes: { personName, sectName, clanName, villageName, rollRoot, constituicoes: CONSTITUTIONS },
  vocab: {
    atributos: { fis: 'Físico', esp: 'Espírito', comp: 'Compreensão', sor: 'Sorte', car: 'Carisma', dao: 'Coração do Dao' },
    moral: { good: 'Bom', evil: 'Mau', order: 'Ordem', chaos: 'Caos' },
    moralRotulo: 'alinhamento',
    moeda: 'pedras espirituais',
    progresso: 'de cultivo',
    subiu: (nome) => `Alcançou o reino: ${nome}.`,
    alinhamento: (demoniaco) => `Alinhamento alterado: ${demoniaco ? 'Caminho Demoníaco' : 'Caminho Daoico'}.`,
    rotulos: {
      trilha: 'Trilha de cultivo', reino: 'Reino', reinoResumo: 'Reino de cultivo',
      facoes: { seita: 'Seita justa', demoniaca: 'Seita demoníaca', cla: 'Clã', errante: 'Cultivador errante', nenhuma: 'Sem facção' },
      criacao: 'Seu caminho de cultivo será escolhido dentro da história, quando você despertar o Qi e encontrar um método.',
    },
    rompimento: {
      gargalo: (alvo, trib) => `Seu cultivo transborda. Diante de você está a porta para ${alvo}.${trib ? ' Raios de tribulação já se agrupam no horizonte.' : ''}`,
      esperar: [
        'Você recolhe o Qi e espera. Os dias passam; o gargalo amadurece.',
        'Respirar, esperar, respirar. A barreira não some, mas já não parece tão alta.',
        'Você troca a pressa por rotina: cultiva de manhã, caminha à tarde, medita à noite. O gargalo respeita quem não o encara.',
      ],
      adiou: 'Adiou o rompimento para se preparar melhor.',
      escudoFinal: 'O raio final desabou. O Talismã de Escudo explodiu em mil faíscas, salvando sua vida, mas o rompimento foi interrompido. Você terá de tentar de novo.',
      escudoRompe: (alvo) => `O raio da tribulação desabou. O Talismã de Escudo explodiu salvando sua vida. Você rompeu para ${alvo}, mas feriu-se gravemente.`,
      sobreviveu: (alvo) => `O céu rugiu e o raio caiu. Você sobreviveu por pouco, queimado até os ossos. A tribulação em ${alvo} terá de ser enfrentada outra vez.`,
      morreu: (alvo) => `As nuvens se fecharam. O primeiro raio foi suportável. O segundo, quase. O terceiro apagou a ideia de que você poderia vencer o céu em ${alvo}.`,
      ascende: (alvo) => `O céu abriu degraus de luz. O mundo mortal ficou pequeno. Você alcançou: ${alvo}.`,
      provaCobrou: (alvo) => `Raios atravessaram seu corpo. Quando o céu enfim se calou, você estava de pé: ${alvo}.`,
      sucesso: (alvo) => [
        `O Qi fluiu como rio sem margens. Seu corpo cedeu, a mente iluminou: ${alvo}.`,
        `Uma porta que parecia parede abriu-se em silêncio. Do outro lado, ${alvo}.`,
        `Durante dias, nada. Então, num suspiro, tudo se encaixou: ${alvo}.`,
        `O Qi subiu como maré de lua cheia e, quando recuou, você já era ${alvo}.`,
      ],
      falha: [
        'O rompimento falhou. O Qi recuou como maré, deixando cansaço e uma lição amarga.',
        'A porta não cedeu. Você ficou diante dela até as pernas tremerem e voltou para trás, em silêncio.',
        'O Qi chegou à beira e não passou. Faltou pouco, ou faltou tudo; é difícil saber.',
      ],
      falhaFerida: [
        'O rompimento falhou e o Qi rebateu contra os meridianos. Sangue na boca, ferimentos no corpo.',
        'O Qi estourou contra a barreira e voltou como chicote. Você acordou no chão, sem lembrar de ter caído.',
      ],
      desvioVivo: 'O Qi desviou do curso! Seu Coração do Dao segurou o abismo por um fio. Você sobreviveu, em ruínas.',
      desvioMorto: 'O Qi desviou do curso e o Coração do Dao não aguentou segurar o abismo.',
    },
  },
  regras: {
    dificuldade: 2.5,
    longevidade: true,
    demoniacaMudaAlinhamento: true,
    motor: 'v2',
    eventoDiaComum: 'dia_comum',
    eventoVidaComum: 'vida_comum',
  },
  finalDeVelhice,
};
