import type { CombatScript } from '../engine/combate';
import { FOE } from '../data/combates';
import { sceneSvg, type SceneKind } from './art/scenes';
import { foeFighter, pathColor, playerFighter } from './art/lutadores';

/**
 * Cena animada do duelo (lado a lado). Só encena o roteiro `CombatScript` que o motor já decidiu.
 * Usa Web Animations (compositor) e poucos elementos: leve em celular.
 */
export interface DuelOptions {
  /** Nome do jogador, mostrado na barra de vida. */
  nome: string;
  /** Chamado ao terminar ou pular. */
  onDone: () => void;
}

const esc = (t: string) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));

export function playDuel(script: CombatScript, opts: DuelOptions): void {
  const foe = FOE[script.foe];
  const root = document.createElement('div');
  root.className = 'duel';
  const wide = foe.id === 'serpente' || foe.id === 'dragao' || foe.id === 'lobo' || foe.id === 'tigre';
  root.innerHTML = `
    <div class="duel-hud">
      <div class="duel-hp"><span>${esc(opts.nome)}</span><div class="hpbar"><i id="hp-p" style="width:100%"></i></div></div>
      <div class="duel-hp foe"><span>${esc(script.foeName)}</span><div class="hpbar"><i id="hp-f" style="width:100%"></i></div></div>
    </div>
    <div class="duel-stage" id="stage">
      ${sceneSvg(script.scene as SceneKind, script.foe).replace('<svg ', '<svg preserveAspectRatio="xMidYMid slice" ')}
      <svg class="fighter p" id="fp" viewBox="0 0 120 140" width="120" height="140">${playerFighter(script.path, script.tier)}</svg>
      <svg class="fighter f ${wide ? 'wide' : ''}" id="ff" viewBox="0 0 120 140" width="120" height="140"><g transform="translate(120 0) scale(-1 1)">${foeFighter(script.foe)}</g></svg>
      <div class="duel-fx" id="fx"></div>
      <div class="duel-banner" id="banner"></div>
    </div>
    <div class="duel-btns">
      <button class="btn" id="d-fast">Acelerar x2</button>
      <button class="btn" id="d-skip">Pular</button>
    </div>`;
  document.body.appendChild(root);

  const $ = (id: string) => root.querySelector('#' + id) as HTMLElement;
  const stage = $('stage'), fp = $('fp') as unknown as SVGElement, ff = $('ff') as unknown as SVGElement, fx = $('fx'), banner = $('banner');
  let speed = 1;
  let skipped = false;
  let finished = false;
  const timers: number[] = [];
  const sleep = (ms: number) => new Promise<void>((res) => { const t = window.setTimeout(res, ms / speed); timers.push(t); });
  const anims: Animation[] = [];
  const anim = (el: Element, kf: Keyframe[], ms: number, o: KeyframeAnimationOptions = {}) => {
    const a = el.animate(kf, { duration: ms / speed, easing: 'ease-out', fill: 'both', ...o });
    anims.push(a);
    return a;
  };

  let hpP = 100, hpF = 100;
  const setHp = (who: 'p' | 'f', v: number) => {
    const el = $(who === 'p' ? 'hp-p' : 'hp-f');
    el.style.width = `${Math.max(0, v)}%`;
    el.className = v < 25 ? 'low' : '';
  };
  const say = (text: string, cls = '') => { banner.className = `duel-banner show ${cls}`; banner.textContent = text; };

  const finish = () => {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    anims.forEach((a) => { try { a.cancel(); } catch { /* ignora */ } });
    root.classList.add('out');
    window.setTimeout(() => { root.remove(); opts.onDone(); }, 220);
  };

  $('d-skip').onclick = () => { skipped = true; finish(); };
  $('d-fast').onclick = () => { speed = speed === 1 ? 2 : 1; $('d-fast').textContent = speed === 2 ? 'Normal x1' : 'Acelerar x2'; };

  const pop = (txt: string, who: 'p' | 'f', crit: boolean, color: string) => {
    const d = document.createElement('div');
    d.className = `dmg ${crit ? 'crit' : ''}`;
    d.textContent = txt;
    d.style.color = color;
    d.style.left = who === 'f' ? '68%' : '22%';
    fx.appendChild(d);
    anim(d, [{ transform: 'translateY(0) scale(0.7)', opacity: 0 }, { transform: 'translateY(-8px) scale(1.15)', opacity: 1, offset: 0.25 }, { transform: 'translateY(-34px) scale(1)', opacity: 0 }], 900, { easing: 'ease-out' }).onfinish = () => d.remove();
  };

  const slash = (toFoe: boolean, color: string) => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 100 60');
    s.setAttribute('class', 'slash');
    s.style.left = toFoe ? '52%' : '12%';
    s.innerHTML = `<path d="M${toFoe ? '10 50Q50 -4 92 10' : '92 50Q50 -4 8 10'}" stroke="${color}" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M${toFoe ? '24 46Q54 8 86 14' : '78 46Q48 8 16 14'}" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.8"/>`;
    fx.appendChild(s);
    anim(s, [{ opacity: 0, transform: 'scale(0.6)' }, { opacity: 1, transform: 'scale(1)', offset: 0.3 }, { opacity: 0, transform: 'scale(1.1)' }], 420).onfinish = () => s.remove();
  };

  const shakeStage = (px: number) => anim(stage, [{ transform: 'translate(0,0)' }, { transform: `translate(${px}px,${-px / 2}px)` }, { transform: `translate(${-px}px,${px / 2}px)` }, { transform: `translate(${px / 2}px,0)` }, { transform: 'translate(0,0)' }], 320, { easing: 'linear' });

  const run = async () => {
    say(`${script.foeName} bloqueia o caminho!`);
    anim(ff, [{ transform: 'translateX(40px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], 450);
    anim(fp, [{ transform: 'translateX(-40px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }], 450);
    await sleep(1100);
    const pc = pathColor(script.path);
    for (const b of script.beats) {
      if (skipped) return;
      const atk = b.a === 'p' ? fp : ff;
      const def = b.a === 'p' ? ff : fp;
      const dir = b.a === 'p' ? 1 : -1;
      say(b.mov, b.a === 'p' ? (b.tec ? 'tec' : 'mine') : 'theirs');
      anim(atk, [{ transform: 'translateX(0) scale(1)' }, { transform: `translateX(${-8 * dir}px) scale(1.04)`, offset: 0.25 }, { transform: `translateX(${52 * dir}px) scale(1.08)`, offset: 0.55 }, { transform: 'translateX(0) scale(1)' }], 620, { fill: 'none' });
      await sleep(340);
      if (skipped) return;
      if (b.esq) {
        anim(def, [{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${28 * dir}px,-12px)`, opacity: 0.45, offset: 0.4 }, { transform: 'translate(0,0)', opacity: 1 }], 520, { fill: 'none' });
        pop('Desvio!', b.a === 'p' ? 'f' : 'p', false, 'var(--blue)');
        await sleep(620);
        continue;
      }
      slash(b.a === 'p', b.a === 'p' ? pc : 'var(--red)');
      anim(def, [{ transform: 'translateX(0) rotate(0)', filter: 'brightness(1)' }, { transform: `translateX(${18 * dir}px) rotate(${4 * dir}deg)`, filter: 'brightness(2.4)', offset: 0.3 }, { transform: 'translateX(0) rotate(0)', filter: 'brightness(1)' }], 380, { fill: 'none' });
      shakeStage(b.crit ? 9 : 4);
      if (b.a === 'p') { hpF = Math.max(script.fim.f, hpF - b.dano); setHp('f', hpF); } else { hpP = Math.max(script.fim.p, hpP - b.dano); setHp('p', hpP); }
      pop(b.crit ? `CRÍTICO −${b.dano}%` : `−${b.dano}%`, b.a === 'p' ? 'f' : 'p', !!b.crit, b.a === 'p' ? 'var(--gold)' : 'var(--red)');
      await sleep(b.crit ? 1000 : 780);
    }
    if (skipped) return;
    if (script.vitoria) {
      say(`${script.foeName} ${script.fraseFim}.`);
      anim(ff, [{ transform: 'rotate(0)', opacity: 1 }, { transform: 'translateX(24px) rotate(78deg)', opacity: 0.2 }], 900);
      await sleep(1000);
      say('VITÓRIA', 'win');
    } else {
      say('Você é forçado a recuar...');
      anim(fp, [{ transform: 'rotate(0)', opacity: 1 }, { transform: 'translateX(-24px) rotate(-70deg)', opacity: 0.35 }], 900);
      await sleep(1000);
      say('DERROTA', 'lose');
    }
    await sleep(1100);
  };
  run().then(() => { if (!skipped) finish(); });
}
