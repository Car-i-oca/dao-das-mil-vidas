import type { State } from '../../../types';
import type { PacoteModo } from '../tipos';
import { ORIGINS, TALENTS, FLAWS } from './character';
import { PATHS } from './paths';
import { personName, sectName, clanName, villageName, rollRoot, CONSTITUTIONS } from './nomes';
import { ITEMS } from './items';
import { ENDINGS, ACHIEVEMENTS, ACH_CHECKS, ACH_POINTS } from './endings';
import { LADDERS } from './realms';
import { MARCAS_VIDA } from './marcas_vida';
import { REGION_POOLS } from './regions';
import { AFINIDADES } from './afinidades';
import { RETIRO_TEXTS, RETIRO_PATH_LINES, RETIRO_EXIT } from './retiros';
import { EVENTS } from './eventos';
import { UPGRADES } from '../../legado';

/** A velhice vira um final diferente conforme a vida que a pessoa levou. */
function finalDeVelhice(s: State): string {
  if (s.flags.includes('final_justica') || s.flags.includes('legado_verificacao')) return 'murim_justica';
  if (s.flags.includes('final_duelo')) return 'murim_duelo';
  if (s.flags.includes('final_acordo')) return 'murim_acordo';
  if (s.flags.includes('final_tregua') || s.flags.includes('final_exilio') || s.flags.includes('legado_contestado')) return 'murim_tregua';
  if (s.flags.includes('fundou_escola')) return 'murim_escola';
  if (s.flags.includes('guardiao_estradas')) return 'murim_guardiao';
  if (s.flags.includes('tecnica_aberta') || s.flags.includes('metodo_verificado')) return 'murim_mestre';
  if (s.flags.includes('legado_silenciado')) return 'murim_heranca';
  return 'velhice';
}

/** Campanha Murim (Jianghu): carreira marcial humana, escolas, Clã Gwon, Hwayang. */
export const MURIM: PacoteModo = {
  id: 'murim',
  nome: 'Murim',
  subtitulo: 'Jianghu',
  resumo: 'Carreira marcial humana: escolas, clãs e a fama que sobe de Aprendiz a Lenda.',
  eventos: EVENTS,
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
  escadaSemTrilha: 'murim',
  marcasVida: MARCAS_VIDA,
  regioes: REGION_POOLS,
  afinidades: AFINIDADES,
  retiro: { textos: RETIRO_TEXTS, trilha: RETIRO_PATH_LINES, saida: RETIRO_EXIT },
  nomes: { personName, sectName, clanName, villageName, rollRoot, constituicoes: CONSTITUTIONS },
  vocab: {
    atributos: { fis: 'Físico', esp: 'Percepção', comp: 'Técnica', sor: 'Instinto', car: 'Carisma', dao: 'Vontade' },
    moral: { good: 'Honra', evil: 'Astúcia', order: 'Lealdade', chaos: 'Ambição' },
    moralRotulo: 'reputação:',
    moeda: 'moedas',
    progresso: 'de treino',
    subiu: (nome) => `Faixa alcançada: ${nome}.`,
    alinhamento: (demoniaco) => `Sua escola segue uma tradição ${demoniaco ? 'clandestina' : 'reconhecida'}.`,
    rompimento: {
      gargalo: (alvo, trib) => `Seu treinamento chegou ao limite da faixa atual. Para avançar até ${alvo}, você precisa demonstrar domínio sob pressão.${trib ? ' Uma prova pública já se aproxima.' : ''}`,
      esperar: [
        'Você observa sua postura e espera. Os dias passam; o próximo movimento se torna mais claro.',
        'Respirar, esperar, respirar. A barreira não some, mas já não parece tão alta.',
        'Você troca a pressa pela rotina: treina de manhã, caminha à tarde, descansa à noite. A técnica amadurece sem atalhos.',
      ],
      adiou: 'Adiou a graduação para se preparar melhor.',
      escudoFinal: 'A prova final saiu do controle. O broquel absorveu o golpe que seria fatal; você terá de se preparar para tentar outra vez.',
      escudoRompe: (alvo) => `O raio da tribulação desabou. O Talismã de Escudo explodiu salvando sua vida. Você rompeu para ${alvo}, mas feriu-se gravemente.`,
      sobreviveu: (alvo) => `A disputa pela faixa de ${alvo} foi interrompida antes do fim. Você sobreviveu, mas precisa se recuperar e voltar mais preparado.`,
      morreu: (alvo) => `A prova pela faixa de ${alvo} terminou em derrota. O conselho marcou seu nome; os ferimentos, porém, foram fatais.`,
      ascende: (alvo) => `Diante das escolas reunidas, seu domínio da arte marcial não deixou dúvidas. Seu nome passa a representar a faixa de ${alvo}.`,
      provaCobrou: (alvo) => `A prova cobrou caro. Você saiu ferido, mas reconhecido como ${alvo}.`,
      sucesso: (alvo) => [
        `Anos de treino se alinharam num único movimento. Você alcançou a faixa de ${alvo}.`,
        `Uma porta que parecia parede abriu-se em silêncio. Do outro lado, ${alvo}.`,
        `Durante dias, nada. Então, num suspiro, sua técnica finalmente se encaixou: ${alvo}.`,
        `O fôlego encontrou seu ritmo. Quando o treino terminou, você era ${alvo}.`,
      ],
      falha: [
        'A graduação falhou. O corpo pediu descanso e deixou uma lição amarga.',
        'A porta não cedeu. Você ficou diante dela até as pernas tremerem e voltou para trás, em silêncio.',
        'Sua técnica chegou perto da faixa seguinte, mas ainda falta prática para sustentá-la.',
      ],
      falhaFerida: [
        'A tentativa falhou e o impacto da técnica feriu seu corpo. Você precisará se recuperar.',
        'O movimento perdeu o eixo e o golpe voltou contra você. Quando acordou, estava no chão.',
      ],
      desvioVivo: 'Sua técnica saiu do controle! Você sobreviveu por pouco, mas ficou gravemente ferido.',
      desvioMorto: 'Sua técnica saiu do controle e os ferimentos foram fatais.',
    },
  },
  regras: {
    dificuldade: 2.5,
    longevidade: false,
    demoniacaMudaAlinhamento: false,
    motor: 'classico',
    eventoInicial: 'murim_ferro_inicio',
    eventoDiaComum: 'murim_dia_comum',
    eventoVidaComum: 'murim_vida_comum',
  },
  finalDeVelhice,
};
