import type { CombatScript } from '../engine/combate';
import { FOE } from '../data/combates';
import { sceneSvg, type SceneKind } from './art';
import { foeFighter, pathColor, playerFighter } from './art';

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

function hashStr(s: string): number { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
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

  /** Efeito visual próprio de cada técnica (etiqueta): projétil, onda, glifo, veneno, garras... */
  const effect = (b: { fx?: string; tid?: string }, toFoe: boolean, base: string) => {
    const kind = b.fx ?? 'golpe';
    const hue = b.tid ? hashStr(b.tid) % 360 : -1;
    const col = hue >= 0 && kind !== 'espada' ? `hsl(${hue} 80% 62%)` : base;
    const x = toFoe ? 62 : 22;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.setAttribute('viewBox', '0 0 100 100');
    el.setAttribute('class', 'vfx');
    el.style.left = x - 18 + '%';
    const g = (s: string) => { el.innerHTML = s; };
    const dir = toFoe ? -1 : 1;
    let ms = 520;
    let kf: Keyframe[] = [{ opacity: 0, transform: 'scale(0.5)' }, { opacity: 1, transform: 'scale(1)', offset: 0.3 }, { opacity: 0, transform: 'scale(1.15)' }];
    const fromSide = (px: number): Keyframe[] => [{ opacity: 0, transform: `translateX(${dir * px}px) scale(.5)` }, { opacity: 1, transform: 'translateX(0) scale(1)', offset: 0.55 }, { opacity: 0, transform: 'scale(1.6)' }];
    switch (kind) {
      case 'corpo': g('<circle cx="50" cy="50" r="10" fill="none" stroke="' + col + '" stroke-width="7"/><circle cx="50" cy="50" r="24" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><path d="M50 14v14M50 72v14M14 50h14M72 50h14M25 25l10 10M65 65l10 10M75 25L65 35M25 75l10-10" stroke="' + col + '" stroke-width="4" stroke-linecap="round"/>'); kf = [{ opacity: 0, transform: 'scale(0.3)' }, { opacity: 1, transform: 'scale(1)', offset: 0.35 }, { opacity: 0, transform: 'scale(1.5)' }]; break;
      case 'qi': g('<circle cx="50" cy="50" r="12" fill="' + col + '"/><circle cx="50" cy="50" r="22" fill="none" stroke="' + col + '" stroke-width="3" opacity=".7"/><circle cx="50" cy="50" r="34" fill="none" stroke="' + col + '" stroke-width="2" opacity=".4"/>'); ms = 600; kf = fromSide(120); break;
      case 'mente': g('<path d="M8 50Q50 12 92 50Q50 88 8 50z" fill="none" stroke="' + col + '" stroke-width="5"/><circle cx="50" cy="50" r="15" fill="' + col + '"/><circle cx="50" cy="50" r="6" fill="#111"/><circle cx="50" cy="50" r="40" fill="none" stroke="' + col + '" stroke-width="2" opacity=".5"/>'); ms = 700; break;
      case 'formacao': g('<path d="M50 6l38 22v44L50 94 12 72V28z" fill="none" stroke="' + col + '" stroke-width="4"/><path d="M50 6v88M12 28l76 44M88 28L12 72" stroke="' + col + '" stroke-width="2" opacity=".7"/><circle cx="50" cy="50" r="10" fill="' + col + '" opacity=".8"/>'); ms = 750; kf = [{ opacity: 0, transform: 'scale(0.4) rotate(0deg)' }, { opacity: 1, transform: 'scale(1) rotate(40deg)', offset: 0.4 }, { opacity: 0, transform: 'scale(1.1) rotate(90deg)' }]; break;
      case 'veneno': g('<circle cx="30" cy="40" r="16" fill="' + col + '" opacity=".6"/><circle cx="55" cy="35" r="20" fill="' + col + '" opacity=".55"/><circle cx="70" cy="55" r="15" fill="' + col + '" opacity=".6"/><path d="M30 60v14M52 62v18M72 70v12" stroke="' + col + '" stroke-width="5" stroke-linecap="round"/>'); ms = 800; break;
      case 'besta': g('<path d="M0 78h14l6-10 6 10h14M44 62h14l6-10 6 10h14" fill="none" stroke="' + col + '" stroke-width="5" stroke-linecap="round"/><circle cx="20" cy="66" r="7" fill="' + col + '"/><circle cx="64" cy="50" r="8" fill="' + col + '"/>'); ms = 650; kf = [{ opacity: 0, transform: `translateX(${dir * 90}px)` }, { opacity: 1, transform: 'translateX(0)', offset: 0.5 }, { opacity: 0, transform: 'translateX(10px)' }]; break;
      case 'demonio': g('<path d="M18 10L58 92M40 6l36 86M64 12l22 76" stroke="' + col + '" stroke-width="6" stroke-linecap="round"/><path d="M50 96c-14-8-18-22-8-34 3 8 8 8 10 0 3 8 8 8 10 0 8 12 4 28-12 34z" fill="#e0742f" opacity=".9"/>'); ms = 600; break;
      case 'alquimia': g('<circle cx="50" cy="50" r="18" fill="#e0742f"/><circle cx="50" cy="50" r="30" fill="' + col + '" opacity=".35"/><path d="M50 16l6 14 14-6-8 14 16 4-16 6 8 14-14-6-6 14-6-14-14 6 8-14-16-6 16-4-8-14 14 6z" fill="#ffcc66" opacity=".85"/>'); ms = 650; kf = fromSide(110); break;
      case 'forja': g('<path d="M50 50L14 30M50 50L86 28M50 50L20 78M50 50L82 76M50 50L50 8" stroke="#ffcc66" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="12" fill="' + col + '"/>'); ms = 480; break;
      case 'fuga': g('<path d="M4 40h70M14 52h80M0 64h60" stroke="' + col + '" stroke-width="6" stroke-linecap="round" opacity=".7"/>'); ms = 500; kf = [{ opacity: 0, transform: `translateX(${dir * 60}px)` }, { opacity: 1, transform: 'translateX(0)', offset: 0.4 }, { opacity: 0, transform: `translateX(${-dir * 40}px)` }]; break;
      default: g('<path d="M' + (toFoe ? '8 82Q50 -6 94 14' : '94 82Q50 -6 6 14') + '" stroke="' + col + '" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M' + (toFoe ? '24 74Q54 14 86 20' : '78 74Q48 14 16 20') + '" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".85"/>');
    }
    fx.appendChild(el);
    anim(el, kf, ms).onfinish = () => el.remove();
  };

  const shakeStage = (px: number) => anim(stage, [{ transform: 'translate(0,0)' }, { transform: `translate(${px}px,${-px / 2}px)` }, { transform: `translate(${-px}px,${px / 2}px)` }, { transform: `translate(${px / 2}px,0)` }, { transform: 'translate(0,0)' }], 320, { easing: 'linear' });

  const run = async () => {
    say(script.selo ? `Opção exclusiva: ${script.selo}` : `${script.foeName} bloqueia o caminho!`, script.selo ? 'tec' : '');
    if (script.selo) { await sleep(900); say(`${script.foeName} bloqueia o caminho!`); }
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
      if (b.a === 'p') effect(b, true, pc); else slash(false, 'var(--red)');
      anim(def, [{ transform: 'translateX(0) rotate(0)', filter: 'brightness(1)' }, { transform: `translateX(${18 * dir}px) rotate(${4 * dir}deg)`, filter: 'brightness(2.4)', offset: 0.3 }, { transform: 'translateX(0) rotate(0)', filter: 'brightness(1)' }], 380, { fill: 'none' });
      shakeStage(b.crit ? 9 : 4);
      if (b.a === 'p') { hpF = Math.max(script.fim.f, hpF - b.dano); setHp('f', hpF); } else { hpP = Math.max(script.fim.p, hpP - b.dano); setHp('p', hpP); }
      pop(b.crit ? `CRÍTICO −${b.dano}%` : `−${b.dano}%`, b.a === 'p' ? 'f' : 'p', !!b.crit, b.a === 'p' ? 'var(--gold)' : 'var(--red)');
      await sleep(b.crit ? 1000 : 780);
    }
    if (skipped) return;
    if (script.desfecho === 'vitoria') {
      say(`${script.foeName} ${script.fraseFim}.`);
      anim(ff, [{ transform: 'rotate(0)', opacity: 1 }, { transform: 'translateX(24px) rotate(78deg)', opacity: 0.2 }], 900);
      await sleep(1000);
      say('VITÓRIA', 'win');
    } else if (script.desfecho === 'derrota') {
      say('Seus joelhos cedem. A vida se esvai...');
      anim(fp, [{ transform: 'rotate(0)', opacity: 1 }, { transform: 'translateX(-24px) rotate(-78deg)', opacity: 0.35 }], 900);
      await sleep(1000);
      say('DERROTA', 'lose');
    } else if (script.desfecho === 'fuga') {
      say('Ferido, você recua e foge.');
      anim(fp, [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(-160px)', opacity: 0 }], 900);
      await sleep(1000);
      say('FUGA', 'lose');
    } else {
      say('Alguém surge e arrasta você para longe!');
      anim(fp, [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(-140px)', opacity: 0.1 }], 1000);
      await sleep(1100);
      say('SALVO', 'lose');
    }
    await sleep(1100);
  };
  run().then(() => { if (!skipped) finish(); });
}
