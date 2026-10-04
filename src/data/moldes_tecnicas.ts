import type { Choice, Technique } from '../types';
import { TECHNIQUES } from './techniques';
import type { Cat, Molde } from './opcoes';

/**
 * Opções exclusivas de TÉCNICA: cada técnica abre duas saídas em eventos comuns, escolhidas pela sua etiqueta principal
 * ("usar {nome} para..."). Usar uma opção de técnica aumenta o domínio dela (ver `dominio` no motor), e o domínio dá bônus
 * aos testes da etiqueta. Falhar custa ferimentos; técnicas de grau alto rendem mais, e custam mais quando falham.
 */
interface Uso { cats: Cat[]; txt: (n: string) => string; ok: string; fail: string; stat: ('fis' | 'esp' | 'comp' | 'sor' | 'car' | 'dao')[]; tag: string; extra?: (g: number) => Record<string, unknown> }

const USOS: Record<string, [Uso, Uso]> = {
  espada: [
    { cats: ['combate', 'perigo'], txt: (n) => `Cortar com ${n}.`, ok: 'O corte sai limpo e na hora certa. O adversário percebe tarde que já estava vencido.', fail: 'O corte erra por um fio, e a resposta chega antes do segundo.', stat: ['fis', 'dao'], tag: 'espada' },
    { cats: ['social', 'viagem'], txt: (n) => `Mostrar ${n} num gesto contido, só para ser reconhecido.`, ok: 'Quem sabe de espadas entende na hora. A postura vale mais que a apresentação.', fail: 'O gesto é lido como provocação, e a conversa esfria.', stat: ['car', 'dao'], tag: 'espada' },
  ],
  corpo: [
    { cats: ['combate', 'perigo'], txt: (n) => `Aguentar o golpe com ${n} e devolver.`, ok: 'O impacto estala e escorre. O revide termina o que o outro começou.', fail: 'A têmpera ainda não chega a tanto, e o corpo cobra.', stat: ['fis', 'dao'], tag: 'corpo' },
    { cats: ['tesouro', 'viagem', 'social'], txt: (n) => `Forçar passagem com ${n}: o corpo abre o caminho.`, ok: 'Portas, grades, multidões: o corpo, treinado, cede lugar a quem o leva.', fail: 'O obstáculo era mais teimoso do que a técnica.', stat: ['fis'], tag: 'corpo' },
  ],
  qi: [
    { cats: ['cultivo', 'tesouro'], txt: (n) => `Aprofundar a prática com ${n}.`, ok: 'Cada respiração rende o dobro. O Qi assenta onde antes só passava.', fail: 'O Qi escapa pelo lado errado, e a prática vira cansaço.', stat: ['esp', 'comp'], tag: 'qi' },
    { cats: ['perigo', 'combate'], txt: (n) => `Usar ${n} para dissipar o perigo antes que ele chegue.`, ok: 'O Qi desvia, abafa, dispersa. O perigo passa e ninguém entende como.', fail: 'O Qi chega tarde, e o perigo cobra por inteiro.', stat: ['esp', 'dao'], tag: 'qi' },
  ],
  mente: [
    { cats: ['social', 'perigo'], txt: (n) => `Ler a situação com ${n}.`, ok: 'A consciência cobre o lugar como névoa: intenções, medos, o que se esconde. Você age um passo adiante.', fail: 'O ruído é demais, e a cabeça lateja sem resposta.', stat: ['esp', 'comp'], tag: 'mente' },
    { cats: ['cultivo', 'tesouro'], txt: (n) => `Mergulhar em ${n} e procurar a resposta lá dentro.`, ok: 'No fundo da consciência você acha o que procurava, e algo que não sabia que procurava.', fail: 'O mar interior está agitado. Você sobe cansado.', stat: ['esp', 'dao'], tag: 'mente' },
  ],
  formacao: [
    { cats: ['perigo', 'combate'], txt: (n) => `Preparar o terreno com ${n} antes do primeiro golpe.`, ok: 'Linhas, pedras, uma sequência: o lugar passa a ser seu, e o inimigo entra pelo lado errado.', fail: 'Um traço torto, e a formação só ajuda pela metade.', stat: ['comp', 'esp'], tag: 'formacao' },
    { cats: ['tesouro', 'viagem'], txt: (n) => `Achar a falha do lugar com ${n}.`, ok: 'Todo arranjo tem uma falha. Você a encontra e passa por onde só quem lê linhas passaria.', fail: 'O arranjo é mais antigo e sutil do que parecia.', stat: ['comp', 'sor'], tag: 'formacao' },
  ],
  alquimia: [
    { cats: ['tesouro', 'cultivo'], txt: (n) => `Refinar com ${n} o que estiver à mão.`, ok: 'A chama obedece. O que estava cru vira algo que vale pedras, ou vale tempo.', fail: 'O fogo falha, e o material racha. Você anota o erro.', stat: ['comp', 'esp'], tag: 'alquimia' },
    { cats: ['perigo', 'social'], txt: (n) => `Improvisar um remédio ou um antídoto com ${n}.`, ok: 'Um frasco certo na hora certa vale por muita espada. Quem é salvo não esquece.', fail: 'O frasco errado, de cor parecida. A pressa cobra juros.', stat: ['comp', 'sor'], tag: 'alquimia' },
  ],
  veneno: [
    { cats: ['combate', 'perigo'], txt: (n) => `Usar ${n} na dose certa, sem alarde.`, ok: 'Uma agulha, uma gota, uma espera. O adversário cai sem saber quando foi atingido.', fail: 'A dose falha por um grama. O inimigo cai de pé, e você precisa fugir.', stat: ['comp', 'sor'], tag: 'veneno' },
    { cats: ['social', 'tesouro'], txt: (n) => `Servir o chá deixando claro, sem dizer, que sabe de ${n}.`, ok: 'Todo mundo, de repente, é muito educado. A fama de quem sabe viaja mais depressa que as palavras.', fail: 'Alguém percebe o jogo e não gosta. A conversa azeda.', stat: ['car', 'comp'], tag: 'veneno' },
  ],
  besta: [
    { cats: ['combate', 'perigo'], txt: (n) => `Chamar o companheiro com ${n}.`, ok: 'Dois corpos, uma luta. O adversário não sabe para onde olhar.', fail: 'O companheiro hesita, e o golpe que seria dele é seu.', stat: ['car', 'esp'], tag: 'besta' },
    { cats: ['viagem', 'tesouro', 'social'], txt: (n) => `Deixar o companheiro farejar o caminho, com ${n}.`, ok: 'O faro dele vale mais que um mapa. Uma trilha curta, uma fonte, um esconderijo.', fail: 'O companheiro se distrai com um rastro falso, e o caminho se alonga.', stat: ['sor', 'esp'], tag: 'besta' },
  ],
  demonio: [
    { cats: ['combate', 'perigo'], txt: (n) => `Soltar o sangue com ${n}.`, ok: 'O sangue responde, escuro e rápido. A luta é curta, e a sensação, estranha: aquilo era seu.', fail: 'O sangue sobe demais, e você perde o controle por um instante.', stat: ['fis', 'dao'], tag: 'demonio', extra: (g) => ({ corr: 3 + g }) },
    { cats: ['social', 'viagem'], txt: (n) => `Deixar o medo do seu nome pesar, com ${n}.`, ok: 'Os olhares fogem, as portas se abrem. O medo é uma moeda, e você a gasta com juros.', fail: 'O medo vira desprezo, e a porta se fecha na sua cara.', stat: ['car', 'dao'], tag: 'demonio', extra: (g) => ({ corr: 2 + g }) },
  ],
  forja: [
    { cats: ['tesouro', 'viagem'], txt: (n) => `Consertar ou forjar com ${n} o que o lugar precisa.`, ok: 'Martelo e fogo resolvem o que ninguém mais resolvia. O dono se lembra de quem ajudou.', fail: 'O metal não cede, e a tarde vira calor perdido.', stat: ['fis', 'comp'], tag: 'forja' },
    { cats: ['combate', 'perigo'], txt: (n) => `Descer o martelo de ${n} no ponto fraco.`, ok: 'Um golpe de forja, no ritmo certo, parte o que parecia inteiro.', fail: 'O golpe desce fora do compasso, e o rebote machuca o braço.', stat: ['fis', 'comp'], tag: 'forja' },
  ],
  fuga: [
    { cats: ['perigo', 'combate'], txt: (n) => `Sumir com ${n}.`, ok: 'Você não está mais onde estava. O perigo gira no vazio e demora a entender.', fail: 'O passo falha por um dedo, e você reaparece no meio do golpe.', stat: ['sor', 'esp'], tag: 'fuga' },
    { cats: ['social', 'viagem', 'tesouro'], txt: (n) => `Passar despercebido com ${n}.`, ok: 'Ninguém o vê passar, e você ouve o que não devia. A conversa lhe rende mais do que um duelo.', fail: 'Alguém o nota. O disfarce vira fama de intrometido.', stat: ['sor', 'comp'], tag: 'fuga' },
  ],
  combate: [
    { cats: ['combate', 'perigo'], txt: (n) => `Usar ${n} a fundo, sem guardar nada.`, ok: 'Tudo o que você sabe, de uma vez. A luta termina antes que o outro entenda por quê.', fail: 'Dar tudo sem medida deixa o flanco aberto, e o outro aproveita.', stat: ['fis', 'dao'], tag: 'combate' },
    { cats: ['social', 'tesouro'], txt: (n) => `Deixar ${n} aparecer nos gestos, sem usar.`, ok: 'A postura de quem sabe lutar abre portas. Ninguém quer descobrir se é verdade.', fail: 'Alguém decide testar, e a conversa vira duelo sem plano.', stat: ['car', 'fis'], tag: 'combate' },
  ],
};

function tagPrincipal(t: Technique): string {
  const ordem = ['espada', 'demonio', 'veneno', 'besta', 'formacao', 'alquimia', 'forja', 'corpo', 'mente', 'fuga', 'qi', 'combate'];
  return ordem.find((k) => t.tags?.includes(k)) ?? 'mente';
}

function molde(t: Technique, i: 0 | 1): Molde | null {
  const par = USOS[tagPrincipal(t)];
  if (!par) return null;
  const u = par[i];
  const g = t.grade;
  const bonus = Math.min(2, Math.ceil(g / 2));
  const stat = u.stat;
  const ok = {
    text: u.ok,
    fx: { stats: { [stat[0]]: bonus }, xp: 3 + 2 * g, fama: 2 + g, rec: 1, ...(u.extra ? u.extra(g) : {}) },
  };
  const fail = { text: u.fail, fx: { ferida: g >= 3 ? 2 : 1, stats: { [stat[0]]: 1 }, ...(u.extra ? { corr: 2 + g } : {}) } };
  const choice: Choice = { cond: { tecnicas: [t.id] }, text: u.txt(t.name), check: { stat, dif: Math.max(0, g - 2), tag: u.tag }, ok, fail };
  return { id: `tec_${t.id}_${i}`, alvo: u.cats, choice };
}

export function moldesDeTecnicas(): Molde[] {
  const out: Molde[] = [];
  for (const t of TECHNIQUES) for (const i of [0, 1] as const) { const m = molde(t, i); if (m) out.push(m); }
  return out;
}
