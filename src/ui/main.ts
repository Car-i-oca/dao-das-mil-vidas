import './style.css';
import { Rng } from '../engine/rng';
import {
  newMeta, rollCreation, startLife, view, choose, proceed, finalizeLife, useItem, buyUpgrade,
  realmOf, ladderOf, eff, cultivationRate, PATH, ORIGIN, TALENT, FLAW, ITEM, TECH, ENDING, CONSTITUTION, STAT_KEYS, STAT_NAMES,
  type Creation,
} from '../engine/engine';
import { ACHIEVEMENTS, UPGRADES, upgradePrice } from '../data/endings';
import { ORIGINS, TALENTS } from '../data/character';
import type { Change, Meta, State } from '../types';
import { TECHNIQUES } from '../data/techniques';
import { ITEMS } from '../data/items';
import { ENDINGS } from '../data/endings';

/* ---------- Persistência ---------- */
const KEY = 'dao-mil-vidas-save-v1';
interface Settings { speed: number; theme: 'auto' | 'claro' | 'escuro'; font: number }
function normSettings(x?: Partial<Settings>): Settings {
  return { speed: x?.speed ?? 2, theme: x?.theme ?? 'auto', font: x?.font ?? 1 };
}
interface Save { meta: Meta; run: State | null; settings: Settings }

function load(): Save {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as Save;
      if (p?.meta) return { meta: { ...newMeta(), ...p.meta }, run: p.run ?? null, settings: normSettings(p.settings) };
    }
  } catch { /* save corrompido ou indisponível */ }
  return { meta: newMeta(), run: null, settings: normSettings() };
}
let save = load();
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(save)); } catch { /* sem armazenamento */ }
}

function withRng<T>(s: State, fn: (r: Rng) => T): T {
  const r = new Rng(s.seed);
  const out = fn(r);
  s.seed = r.seed;
  return out;
}

/* ---------- Estado de interface ---------- */
type Screen = 'home' | 'create' | 'game' | 'end' | 'meta';
let screen: Screen = 'home';
let tab: 'vida' | 'status' | 'mochila' | 'diario' = 'vida';
let metaTab: 'heranca' | 'conquistas' | 'codice' | 'historico' | 'opcoes' = 'heranca';
let creation: { c: Creation; seed: number; rerolls: number } | null = null;
let typer: { timer: number; el: HTMLElement; full: string; done: () => void } | null = null;

const app = document.getElementById('app')!;

/* ---------- Instalação como app (PWA) ---------- */
let installEvt: (Event & { prompt: () => Promise<void> }) | null = null;
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installEvt = e as typeof installEvt;
  if (screen === 'home') render();
});
window.addEventListener('appinstalled', () => { installEvt = null; if (screen === 'home') render(); });
const esc = (t: string) => t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const pct = (n: number) => `${Math.round(n * 100)}%`;
const SPEEDS = [0, 8, 18, 34]; // ms por caractere (0 = instantâneo)
const SPEED_NAMES = ['Instantâneo', 'Rápido', 'Normal', 'Lento'];
const THEME_NAMES: [Settings['theme'], string][] = [['auto', 'Automático'], ['claro', 'Claro'], ['escuro', 'Escuro']];
const FONT_NAMES = ['Pequena', 'Média', 'Grande'];

function applySettings() {
  const r = document.documentElement;
  if (save.settings.theme === 'auto') r.removeAttribute('data-theme');
  else r.setAttribute('data-theme', save.settings.theme === 'claro' ? 'light' : 'dark');
  r.setAttribute('data-font', String(save.settings.font));
}

const chipsHtml = (ch?: Change[]) => (ch?.length ? `<div class="chips">${ch.map((c) => `<span class="chip ${c.k}">${esc(c.t)}</span>`).join('')}</div>` : '');

function toast(msg: string) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2400);
}

/* ---------- Texto que aparece aos poucos ---------- */
function typewrite(el: HTMLElement, text: string, onDone: () => void) {
  stopTyper();
  const ms = SPEEDS[save.settings.speed] ?? 18;
  if (!ms) { el.textContent = text; onDone(); return; }
  let i = 0;
  const finish = () => { stopTyper(); el.textContent = text; onDone(); };
  const timer = window.setInterval(() => {
    i += 1 + (ms < 12 ? 2 : 0);
    el.textContent = text.slice(0, i);
    if (i >= text.length) finish();
  }, ms);
  typer = { timer, el, full: text, done: onDone };
}
function stopTyper() {
  if (typer) { clearInterval(typer.timer); typer = null; }
}
function skipTyper() {
  if (!typer) return;
  const { el, full, done } = typer;
  stopTyper();
  el.textContent = full;
  done();
}

/* ---------- Telas ---------- */
function render() {
  stopTyper();
  switch (screen) {
    case 'home': return renderHome();
    case 'create': return renderCreate();
    case 'game': return renderGame();
    case 'end': return renderEnd();
    case 'meta': return renderMeta();
  }
}

function renderHome() {
  const m = save.meta;
  app.innerHTML = `
    <div class="screen home">
      <div class="seal">道</div>
      <div><h1>Dao das Mil Vidas</h1><div class="tag">Viva. Cultive. Morra. Lembre.</div></div>
      <div class="stack">
        ${save.run && !save.run.summary ? `<button class="btn primary" data-act="continue">Continuar a vida de ${esc(save.run.name)}</button>` : ''}
        <button class="btn ${save.run && !save.run.summary ? '' : 'primary'}" data-act="new">Nova vida</button>
        <button class="btn" data-act="meta">Herança do Dao · ${m.legacy} pts</button>
        ${isStandalone() ? '' : '<button class="btn ghost" data-act="install">Instalar como app</button>'}
      </div>
      <p class="muted small">Vidas vividas: ${m.lives} · Finais descobertos: ${m.endingsSeen.length}/10${m.best ? ` · Melhor: ${esc(bestName(m))}` : ''}</p>
    </div>`;
}

function bestName(m: Meta): string {
  const b = m.best!;
  return `reino ${b.tier}, ${b.age} anos`;
}

function newCreation(prevRerolls = 3 + (save.meta.upgrades.sorteio ?? 0)) {
  const seed = (Math.random() * 4294967295) >>> 0;
  const rng = new Rng(seed);
  creation = { c: rollCreation(save.meta, rng), seed: rng.seed, rerolls: prevRerolls };
}

function renderCreate() {
  if (!creation) newCreation();
  const { c, rerolls } = creation!;
  const o = ORIGIN[c.origin], t = TALENT[c.talent], f = FLAW[c.flaw];
  const cons = c.constitution ? CONSTITUTION[c.constitution] : null;
  app.innerHTML = `
    <div class="screen">
      <div class="row between"><h2>Seu destino</h2><button class="btn ghost" style="width:auto;padding:8px 14px;min-height:0" data-act="home">‹ Início</button></div>
      <div class="card kv">
        <div class="k">Origem</div><div class="v"><b>${esc(o.name)}</b><br><span class="muted small">${esc(o.desc)}</span></div>
        <div class="k">Raiz</div><div class="v"><b>${esc(c.root.name)}</b><br><span class="muted small">Ritmo de cultivo ×${c.root.mult.toFixed(2)}</span></div>
        ${cons ? `<div class="k">Corpo</div><div class="v"><b>${esc(cons.name)}</b><br><span class="muted small">${esc(cons.desc)}</span></div>` : ''}
        <div class="k">Talento</div><div class="v"><b>${esc(t.name)}</b><br><span class="muted small">${esc(t.desc)}</span></div>
        <div class="k">Defeito</div><div class="v"><b>${esc(f.name)}</b><br><span class="muted small">${esc(f.desc)}</span></div>
      </div>
      <button class="btn" data-act="reroll" ${rerolls <= 0 ? 'disabled' : ''}>Sortear de novo (${rerolls} restantes)</button>
      <p class="muted small">Sua trilha de cultivo não é escolhida agora: um mestre, um manual ou um acaso a revelará depois que o Qi despertar. Você decide dentro da história.</p>
      <button class="btn primary" data-act="start">Iniciar vida</button>
    </div>`;
}

function hudHtml(s: State): string {
  const realm = realmOf(s);
  const ageRatio = Math.min(1, s.age / s.maxAge);
  return `
    <div class="hud">
      <div class="row between"><span class="name">${esc(s.name)}</span><span class="wounds" title="Ferimentos">${s.wounds > 0 ? '♥'.repeat(Math.min(6, Math.round(s.wounds))) : ''}</span></div>
      <div class="sub">${esc(realm.name)} · ${Math.floor(s.age)} anos de ${s.maxAge}${s.tier > 0 ? ` · ${Math.min(100, Math.round(s.xp))}%` : ''}</div>
      ${s.tier > 0 ? `<div class="bar"><i style="width:${Math.min(100, s.xp)}%"></i></div>` : ''}
      <div class="bar age"><i style="width:${ageRatio * 100}%"></i></div>
    </div>`;
}

function tabsHtml(): string {
  const t = (id: typeof tab, icon: string, label: string) => `<button class="${tab === id ? 'on' : ''}" data-act="tab" data-id="${id}"><b>${icon}</b>${label}</button>`;
  return `<nav class="tabs">${t('vida', '☯', 'Vida')}${t('status', '◈', 'Status')}${t('mochila', '▣', 'Mochila')}${t('diario', '✎', 'Diário')}</nav>`;
}

function renderGame() {
  const s = save.run!;
  let body = '';
  if (tab === 'vida') body = lifeHtml(s);
  else if (tab === 'status') body = statusHtml(s);
  else if (tab === 'mochila') body = bagHtml(s);
  else body = logHtml(s);
  app.innerHTML = `${hudHtml(s)}<div class="game" id="game">${body}</div>${tabsHtml()}`;
  if (tab === 'vida') startTyping(s);
}

const RAR_LABEL: Record<string, string> = { raro: 'Raro', lendario: 'Lendário' };

function lifeHtml(s: State): string {
  const v = view(s);
  if (v.kind === 'result' || v.kind === 'ending') {
    const chk = s.result?.check;
    return `
      <div class="card story" data-act="skip">
        ${chk ? `<span class="badge ${chk.success ? 'ok' : 'bad'}">${chk.success ? '✔ Sucesso' : '✘ Falha'} · ${pct(chk.chance)}</span>` : ''}
        <p class="story-text" id="typed"></p>
        <div class="hint" id="hint">toque para pular</div>
      </div>
      <div class="choices" id="choices">
        ${chipsHtml(s.result?.changes)}
        <button class="btn primary" data-act="${s.ending ? 'toEnd' : 'next'}">${s.ending ? 'Ver o final desta vida' : 'Continuar'}</button>
      </div>`;
  }
  return `
    <div class="card story" data-act="skip">
      <div class="ev-title">${v.rarity && RAR_LABEL[v.rarity] ? `<span class="rar rar-${v.rarity}">${RAR_LABEL[v.rarity]}</span>` : ''}<span>${esc(v.title)}</span></div>
      <p class="story-text" id="typed"></p>
      <div class="hint" id="hint">toque para pular</div>
    </div>
    <div class="choices" id="choices">
      ${v.choices.map((c, i) => `
        <button class="choice" data-act="choose" data-i="${i}" ${c.disabled ? 'disabled' : ''}>
          <span>${esc(c.text)}</span>
          <span class="row">${c.note ? `<span class="note">${esc(c.note)}</span>` : ''}${c.chance !== undefined ? `<span class="chance ${c.chance >= 0.7 ? 'hi' : c.chance >= 0.45 ? 'mid' : 'lo'}">${pct(c.chance)}</span>` : ''}</span>
        </button>`).join('')}
    </div>`;
}

function startTyping(s: State) {
  const el = document.getElementById('typed');
  const choices = document.getElementById('choices');
  if (!el || !choices) return;
  const v = view(s);
  const text = v.kind === 'event' ? v.text : v.text;
  const reveal = () => { choices.classList.add('show'); document.getElementById('hint')?.remove(); };
  typewrite(el, text, reveal);
}

function statusHtml(s: State): string {
  const path = PATH[s.path];
  const L = ladderOf(s);
  const stats = STAT_KEYS.map((k) => {
    const v = eff(s, k);
    const base = s.stats[k];
    return `<div class="stat"><span>${STAT_NAMES[k]}</span><div class="bar"><i style="width:${Math.min(100, v)}%"></i></div><span class="n">${v}${v !== base ? `<span class="muted small"> (${base})</span>` : ''}</span></div>`;
  }).join('');
  const techs = s.techniques.map((t) => `<span class="pill g${TECH[t].grade}" title="${esc(TECH[t].desc)}">${esc(TECH[t].name)}</span>`).join('') || '<span class="muted">Nenhuma</span>';
  const cons = s.constitution ? CONSTITUTION[s.constitution] : null;
  const fac: Record<string, string> = { seita: 'Seita justa', demoniaca: 'Seita demoníaca', cla: 'Clã', errante: 'Errante', nenhuma: 'Sem facção' };
  return `
    <div class="card">
      <div class="kv">
        <div class="k">Trilha</div><div class="v">${esc(path.name)}</div>
        <div class="k">Reino</div><div class="v">${esc(realmOf(s).name)} <span class="muted small">(${s.tier}/${L.realms.length - 1})</span></div>
        <div class="k">Origem</div><div class="v">${esc(ORIGIN[s.origin].name)}</div>
        <div class="k">Raiz</div><div class="v">${esc(s.root.name)}</div>
        ${cons ? `<div class="k">Corpo</div><div class="v">${esc(cons.name)}</div>` : ''}
        <div class="k">Talento</div><div class="v">${esc(TALENT[s.talent].name)}</div>
        <div class="k">Defeito</div><div class="v">${esc(FLAW[s.flaw].name)}</div>
        <div class="k">Facção</div><div class="v">${fac[s.faction]}</div>
      </div>
    </div>
    <div class="card">${stats}</div>
    <div class="card kv">
      <div class="k">Pedras</div><div class="v">${s.pedras}</div>
      <div class="k">Fama</div><div class="v">${s.fama}</div>
      <div class="k">Karma</div><div class="v">${s.karma > 0 ? '+' : ''}${s.karma}</div>
      <div class="k">Corrupção</div><div class="v">${s.corr}/100</div>
      <div class="k">Ferimentos</div><div class="v">${Math.round(s.wounds)}/6</div>
      <div class="k">Cultivo</div><div class="v">${s.tier > 0 ? `${cultivationRate(s).toFixed(1)}%/ano` : '—'}</div>
    </div>
    <div class="card"><div class="muted small" style="margin-bottom:4px">TÉCNICAS</div>${techs}</div>`;
}

function bagHtml(s: State): string {
  if (!s.items.length) return '<div class="card muted">Sua mochila está vazia.</div>';
  const counts = new Map<string, number>();
  for (const id of s.items) counts.set(id, (counts.get(id) ?? 0) + 1);
  const rows = [...counts.entries()].map(([id, n]) => {
    const it = ITEM[id];
    const usable = !!it.use;
    return `<div class="item"><div><b>${esc(it.name)}</b>${n > 1 ? ` ×${n}` : ''}<div class="muted small">${esc(it.desc)}${it.passive ? ' · ' + Object.entries(it.passive).map(([k, v]) => `${STAT_NAMES[k as keyof typeof STAT_NAMES]} +${v}`).join(', ') : ''}${it.breakBonus ? ` · ajuda no rompimento (+${Math.round(it.breakBonus.bonus * 100)}%)` : ''}</div></div>${usable ? `<button class="btn" data-act="use" data-id="${id}">Usar</button>` : ''}</div>`;
  }).join('');
  return `<div class="card list">${rows}</div>`;
}

function logHtml(s: State): string {
  if (!s.log.length) return '<div class="card muted">Nada ainda.</div>';
  return `<div class="card">${[...s.log].reverse().map((l) => `<div class="log-entry"><span class="a">${l.age}a</span><span>${esc(l.text)}</span></div>`).join('')}</div>`;
}

function renderEnd() {
  const s = save.run!;
  const meta = save.meta;
  if (!s.summary) { finalizeLife(meta, s); persist(); }
  const e = ENDING[s.ending!];
  const sm = s.summary!;
  const ach = sm.ach.map((id) => ACHIEVEMENTS.find((a) => a.id === id)!).filter(Boolean);
  app.innerHTML = `
    <div class="screen end">
      <div class="muted small" style="text-align:center">${esc(s.name)} · ${esc(PATH[s.path].name)}</div>
      <h1>${esc(e.name)}</h1>
      <p class="epitaph">${esc(s.endingText ?? '')}</p>
      <div class="card sum">
        <span>Reino alcançado</span><b>${esc(sm.tierName)}</b>
        <span>Idade ao morrer</span><b>${Math.floor(s.age)} anos</b>
        <span>Fama</span><b>${s.fama}</b>
        <span>Karma</span><b>${s.karma > 0 ? '+' : ''}${s.karma}</b>
        <span>Técnicas</span><b>${s.techniques.length}</b>
        <span>Herança do Dao</span><b style="color:var(--gold)">+${sm.legacy}</b>
      </div>
      ${ach.length ? `<div class="card"><div class="muted small">CONQUISTAS DESBLOQUEADAS</div>${ach.map((a) => `<div><b>${esc(a.name)}</b> <span class="muted small">— ${esc(a.reward)}</span></div>`).join('')}</div>` : ''}
      <details class="card"><summary>Diário da vida (${s.log.length})</summary>${logHtml(s).replace('class="card"', '')}</details>
      <button class="btn primary" data-act="new">Nova vida</button>
      <button class="btn" data-act="share">Copiar resumo da vida</button>
      <button class="btn" data-act="meta">Herança do Dao</button>
      <button class="btn ghost" data-act="home">Início</button>
    </div>`;
}

function renderMeta() {
  const m = save.meta;
  const tabs: [typeof metaTab, string][] = [['heranca', 'Herança'], ['conquistas', 'Conquistas'], ['codice', 'Códice'], ['historico', 'Histórico'], ['opcoes', 'Opções']];
  let body = '';
  if (metaTab === 'heranca') {
    body = `<div class="card row between"><span>Pontos disponíveis</span><b style="color:var(--gold);font-size:1.3rem">${m.legacy}</b></div>
      ${UPGRADES.map((u) => {
        const lvl = m.upgrades[u.id] ?? 0;
        const price = upgradePrice(u.cost, lvl);
        return `<div class="card item"><div><b>${u.name}</b> <span class="muted small">nv ${lvl}/${u.max}</span><div class="muted small">${u.desc}</div></div>
          <button class="btn" data-act="buy" data-id="${u.id}" ${lvl >= u.max || m.legacy < price ? 'disabled' : ''}>${lvl >= u.max ? 'Máx' : price + ' pts'}</button></div>`;
      }).join('')}
      <div class="card muted small">Morra bem para ganhar Herança: reinos altos, longevidade, fama e finais raros rendem mais pontos.</div>`;
  } else if (metaTab === 'conquistas') {
    body = `<div class="card list">${ACHIEVEMENTS.map((a) => {
      const got = m.achievements.includes(a.id);
      return `<div style="opacity:${got ? 1 : 0.55}"><b>${got ? '✔ ' : '○ '}${esc(a.name)}</b><div class="muted small">${esc(a.desc)}</div><div class="small" style="color:var(--gold)">${esc(a.reward)}</div></div>`;
    }).join('')}</div>
    <div class="card muted small">Origens liberadas: ${ORIGINS.filter((o) => !o.unlock || m.achievements.includes(o.unlock)).length}/${ORIGINS.length} · Talentos liberados: ${TALENTS.filter((t) => !t.unlock || m.achievements.includes(t.unlock)).length}/${TALENTS.length}</div>`;
  } else if (metaTab === 'codice') {
    const cx = m.codex ?? { items: [], techs: [] };
    const pill = (name: string, ok: boolean, grade?: number) => `<span class="pill ${ok && grade ? 'g' + Math.min(4, grade) : ''}" style="${ok ? '' : 'opacity:.4'}">${ok ? esc(name) : '???'}</span>`;
    body = `<div class="card"><div class="muted small">FINAIS · ${m.endingsSeen.length}/${ENDINGS.length}</div>${ENDINGS.map((e) => pill(e.name, m.endingsSeen.includes(e.id))).join('')}</div>
      <div class="card"><div class="muted small">TÉCNICAS · ${cx.techs.length}/${TECHNIQUES.length}</div>${TECHNIQUES.map((t) => pill(t.name, cx.techs.includes(t.id), t.grade)).join('')}</div>
      <div class="card"><div class="muted small">ITENS · ${cx.items.length}/${ITEMS.length}</div>${ITEMS.map((i) => pill(i.name, cx.items.includes(i.id), i.grade)).join('')}</div>
      <div class="card muted small">O Códice guarda tudo o que você já encontrou em qualquer vida. Os nomes escondidos (???) esperam ser descobertos.</div>`;
  } else if (metaTab === 'historico') {
    body = m.history.length
      ? `<div class="card list">${m.history.map((h) => `<div><b>${esc(h.name)}</b> <span class="muted small">${esc(h.path)}</span><div class="small">${esc(h.tierName)} · ${h.age} anos · ${esc(h.ending)}</div></div>`).join('')}</div>`
      : '<div class="card muted">Nenhuma vida encerrada ainda.</div>';
  } else {
    body = `<div class="card"><div class="muted small">TEMA</div>
      <div class="row" style="flex-wrap:wrap;margin-top:8px">${THEME_NAMES.map(([id, n]) => `<button class="btn ${save.settings.theme === id ? 'primary' : ''}" style="width:auto;flex:1;padding:10px 6px" data-act="theme" data-id="${id}">${n}</button>`).join('')}</div>
      <div class="muted small" style="margin-top:12px">TAMANHO DO TEXTO</div>
      <div class="row" style="flex-wrap:wrap;margin-top:8px">${FONT_NAMES.map((n, i) => `<button class="btn ${save.settings.font === i ? 'primary' : ''}" style="width:auto;flex:1;padding:10px 6px" data-act="font" data-i="${i}">${n}</button>`).join('')}</div></div>
      <div class="card"><div class="muted small">VELOCIDADE DO TEXTO</div>
      <div class="row" style="flex-wrap:wrap;margin-top:8px">${SPEED_NAMES.map((n, i) => `<button class="btn ${save.settings.speed === i ? 'primary' : ''}" style="width:auto;flex:1;padding:10px 6px" data-act="speed" data-i="${i}">${n}</button>`).join('')}</div></div>
      <button class="btn" data-act="export">Copiar save (backup)</button>
      <button class="btn" data-act="import">Importar save</button>
      <button class="btn ghost" data-act="wipe" style="color:var(--red)">Apagar todo o progresso</button>`;
  }
  app.innerHTML = `
    <div class="screen">
      <div class="row between"><h2>Herança do Dao</h2><button class="btn ghost" style="width:auto;padding:8px 14px;min-height:0" data-act="home">‹ Início</button></div>
      <div class="row" style="flex-wrap:wrap">${tabs.map(([id, n]) => `<button class="path ${metaTab === id ? 'sel' : ''}" style="padding:8px 12px" data-act="mtab" data-id="${id}">${n}</button>`).join('')}</div>
      ${body}
    </div>`;
}

/* ---------- Eventos de clique ---------- */
function startRun() {
  if (!creation) return;
  const seed = (Math.random() * 4294967295) >>> 0;
  save.run = startLife(save.meta, creation.c, '', seed);
  creation = null;
  tab = 'vida';
  screen = 'game';
  persist();
  render();
}

app.addEventListener('click', (ev) => {
  const target = (ev.target as HTMLElement).closest<HTMLElement>('[data-act]');
  if (!target) return;
  const act = target.dataset.act!;
  const s = save.run;
  switch (act) {
    case 'skip': skipTyper(); break;
    case 'home': screen = 'home'; render(); break;
    case 'new': newCreation(); screen = 'create'; render(); break;
    case 'continue': screen = save.run?.ending ? 'end' : 'game'; render(); break;
    case 'meta': screen = 'meta'; render(); break;
    case 'install':
      if (installEvt) { void installEvt.prompt(); installEvt = null; }
      else toast(/iphone|ipad|ipod/i.test(navigator.userAgent) ? 'No Safari: Compartilhar → Adicionar à Tela de Início' : 'No menu do navegador: Instalar app / Adicionar à tela inicial');
      break;
    case 'mtab': metaTab = target.dataset.id as typeof metaTab; render(); break;
    case 'reroll':
      if (creation && creation.rerolls > 0) newCreation(creation.rerolls - 1);
      render();
      break;
    case 'start': startRun(); break;
    case 'tab': tab = target.dataset.id as typeof tab; render(); break;
    case 'choose':
      if (!s) break;
      withRng(s, (r) => choose(s, Number(target.dataset.i), r));
      persist();
      render();
      break;
    case 'next':
      if (!s) break;
      withRng(s, (r) => proceed(s, r));
      persist();
      render();
      window.scrollTo(0, 0);
      document.getElementById('game')?.scrollTo(0, 0);
      break;
    case 'toEnd': screen = 'end'; render(); break;
    case 'use':
      if (!s) break;
      { const msg = withRng(s, (r) => useItem(s, target.dataset.id!, r)); if (msg) toast(msg); }
      persist();
      if (s.ending) { s.result = { text: 'Seu corpo não resistiu.' }; tab = 'vida'; }
      render();
      break;
    case 'buy': {
      const u = UPGRADES.find((x) => x.id === target.dataset.id)!;
      if (buyUpgrade(save.meta, u.id, u.cost, u.max)) { persist(); render(); }
      break;
    }
    case 'speed': save.settings.speed = Number(target.dataset.i); persist(); render(); break;
    case 'theme': save.settings.theme = target.dataset.id as Settings['theme']; applySettings(); persist(); render(); break;
    case 'font': save.settings.font = Number(target.dataset.i); applySettings(); persist(); render(); break;
    case 'share': {
      if (!s?.ending) break;
      const txt = [`${s.name} — ${PATH[s.path].name}`, `${ENDING[s.ending].name}: ${s.summary?.tierName ?? realmOf(s).name}, ${Math.floor(s.age)} anos`, s.endingText ?? '', '', 'Dao das Mil Vidas'].join('\n');
      navigator.clipboard?.writeText(txt).then(() => toast('Resumo copiado'), () => toast('Não foi possível copiar'));
      break;
    }
    case 'export':
      navigator.clipboard?.writeText(JSON.stringify(save)).then(() => toast('Save copiado para a área de transferência'), () => toast('Não foi possível copiar'));
      break;
    case 'import': {
      const txt = window.prompt('Cole o save aqui:');
      if (!txt) break;
      try {
        const p = JSON.parse(txt) as Save;
        if (!p.meta) throw new Error('inválido');
        save = { meta: { ...newMeta(), ...p.meta }, run: p.run ?? null, settings: normSettings(p.settings) };
        persist(); render(); toast('Save importado');
      } catch { toast('Save inválido'); }
      break;
    }
    case 'wipe':
      if (window.confirm('Apagar TODO o progresso, inclusive a Herança do Dao?')) {
        save = { meta: newMeta(), run: null, settings: save.settings };
        persist(); screen = 'home'; render();
      }
      break;
  }
});

/* ---------- Início ---------- */
if (save.run && save.run.ending && !save.run.summary) {
  // Vida encerrada mas final não registrado (fechou o app antes): registra agora.
  finalizeLife(save.meta, save.run);
  persist();
}
applySettings();
render();

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
