import './style.css';
import { Rng } from '../engine/rng';
import {
  newMeta, rollCreation, startLife, view, choose, proceed, finalizeLife, useItem, buyUpgrade,
  realmOf, ladderOf, eff, cultivationRate, recStage, EVENT, dominioEstagio, DOMINIO_NOMES, DOMINIO_LIMITES, virtudeDominante, PATH, ORIGIN, TALENT, FLAW, ITEM, TECH, ENDING, CONSTITUTION, STAT_KEYS, STAT_NAMES,
  type Creation,
} from '../engine/engine';
import { ACHIEVEMENTS, UPGRADES, upgradePrice } from '../data/endings';
import { ORIGINS, TALENTS } from '../data/character';
import type { Change, Meta, State } from '../types';
import { TECHNIQUES } from '../data/techniques';
import { ITEMS } from '../data/items';
import { WORLD } from '../data/mundo';
import { ALCUNHA, VIRTUDE_NOME } from '../data/marcas';
import { EVENTS } from '../data/events';
import { PATHS } from '../data/paths';
import { ENDINGS } from '../data/endings';
import { itemIcon, techIcon, pathIcon, realmIcon } from './art/icons';
import { sceneSvg, endingCard, type SceneKind } from './art/scenes';
import { portraitSvg, lookFromState, lookForNpc, type Role } from './art/portrait';
import { hash } from './art/core';
import { playDuel } from './duelo';
import { FOES } from '../data/combates';
const FOE_NAMES: Record<string, string> = Object.fromEntries(FOES.map((x) => [x.id, x.name]));

/* ---------- Persistência ---------- */
const KEY = 'dao-mil-vidas-save-v1';
interface Settings { speed: number; theme: 'auto' | 'claro' | 'escuro'; font: number; intro: boolean; difficulty: number; duelos: boolean }
function normSettings(x?: Partial<Settings>): Settings {
  return { speed: x?.speed ?? 2, theme: x?.theme ?? 'auto', font: x?.font ?? 1, intro: x?.intro ?? false, difficulty: x?.difficulty ?? 0, duelos: x?.duelos ?? true };
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
const PLACE_NAMES: Record<string, string> = { vilarejo: 'Vilarejo', cidade: 'Cidade', seita: 'Seita', selva: 'Selva espiritual', montanha: 'Montanhas sagradas', ruinas: 'Ruínas', deserto: 'Deserto do Vento Cego', gelo: 'Planície de Gelo Silencioso', mar: 'Mar das Mil Ilhas' };
const THEME_NAMES: [Settings['theme'], string][] = [['auto', 'Automático'], ['claro', 'Claro'], ['escuro', 'Escuro']];
const FONT_NAMES = ['Pequena', 'Média', 'Grande'];
const DIFFICULTIES: [number, string, string][] = [[-1, 'Calma', 'Mais chance nos testes; menos Herança'], [0, 'Normal', 'Equilíbrio padrão'], [1, 'Desafio', 'Menos chance nos testes; mais Herança']];

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
      <p class="muted small">Vidas vividas: ${m.lives} · Finais descobertos: ${m.endingsSeen.length}/${ENDINGS.length}${m.best ? ` · Melhor: ${esc(bestName(m))}` : ''}</p>
      <p class="muted small copy">Dao das Mil Vidas © 2026 Andre Barbosa Vieira. Todos os direitos reservados.</p>
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
      <div class="card"><div class="muted small">DIFICULDADE</div><div class="row" style="flex-wrap:wrap;margin-top:8px">${DIFFICULTIES.map(([v, n]) => `<button class="btn ${save.settings.difficulty === v ? 'primary' : ''}" style="width:auto;flex:1;padding:10px 6px" data-act="dif" data-i="${v}">${n}</button>`).join('')}</div><div class="muted small" style="margin-top:6px">${DIFFICULTIES.find(([v]) => v === save.settings.difficulty)?.[2] ?? ''}</div></div>
      <p class="muted small">Sua trilha de cultivo não é escolhida agora: um mestre, um manual ou um acaso a revelará depois que o Qi despertar. Você decide dentro da história.</p>
      <button class="btn primary" data-act="start">Iniciar vida</button>
    </div>`;
}

function hudHtml(s: State): string {
  const realm = realmOf(s);
  const ageRatio = Math.min(1, s.age / s.maxAge);
  return `
    <div class="hud">
      <div class="hud-row"><div class="hud-pt">${portraitSvg(lookFromState(s), 52)}</div><div class="hud-main">
      <div class="row between"><span class="name">${esc(s.name)}${alcunhaHtml(s)}</span><span class="wounds" title="Ferimentos">${s.wounds > 0 ? '♥'.repeat(Math.min(6, Math.round(s.wounds))) : ''}</span></div>
      <div class="sub">${esc(realm.name)} · ${Math.floor(s.age)} anos de ${s.maxAge}${s.tier > 0 ? ` · ${Math.min(100, Math.round(s.xp))}%` : ''}${s.world ? ` · <span style="color:var(--gold)">Era: ${esc(WORLD[s.world.id].name)}</span>` : ''}</div>
      ${s.tier > 0 ? `<div class="bar"><i style="width:${Math.min(100, s.xp)}%"></i></div>` : ''}
      <div class="bar age"><i style="width:${ageRatio * 100}%"></i></div>
      </div></div>
    </div>`;
}

/** Cenário do lugar atual (e da era do mundo, quando há). */
function sceneFor(s: State, eventId: string): string {
  let kind: string = s.place;
  if (s.world?.id === 'reino_secreto') kind = 'reino_secreto';
  else if (s.tier >= 7 && hash(eventId) % 3 === 0) kind = 'ceu';
  return `<div class="scene">${sceneSvg(kind as SceneKind, eventId, hash(eventId) % 4 === 0)}</div>`;
}

/** Retrato do personagem recorrente citado no texto do evento ({mentor}, {rival}...). */
function npcFor(s: State, eventId: string): string {
  const raw = EVENT[eventId]?.text ?? '';
  const roles: Role[] = ['mentor', 'rival', 'amigo', 'noivo', 'discipulo', 'inimigo'];
  const role = roles.find((r) => raw.includes('{' + r + '}'));
  if (!role) return '';
  const name = s.names[role] ?? role;
  return `<div class="npc">${portraitSvg(lookForNpc(role, name, Math.max(1, s.tier)), 54)}<div class="small muted">${esc(name)}</div></div>`;
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

const INTRO_HTML = `<div class="card intro">
  <b>Como jogar</b>
  <ul>
    <li>Cada acontecimento traz escolhas. Quando há uma porcentagem, é a <b>chance de sucesso</b>, influenciada pelos seus atributos.</li>
    <li>Depois de escolher, as <b>etiquetas</b> mostram o que mudou: verde é bom, vermelho é ruim.</li>
    <li>O tempo passa sozinho. Quando a barra de cultivo encher, você tentará <b>romper o gargalo</b>.</li>
    <li>Abas: <b>Status</b> (atributos e técnicas), <b>Mochila</b> (itens), <b>Diário</b> (sua história).</li>
    <li>Sua trilha de cultivo aparecerá na história, depois do despertar. Ao morrer, você ganha <b>Herança do Dao</b> para as próximas vidas.</li>
  </ul>
  <button class="btn" data-act="intro">Entendi</button>
</div>`;

function lifeHtml(s: State): string {
  const v = view(s);
  const intro = !save.settings.intro && s.turn < 2 ? INTRO_HTML : '';
  if (v.kind === 'result' || v.kind === 'ending') {
    const chk = s.result?.check;
    return `
      ${intro}
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
    ${intro}
    <div class="card story" data-act="skip">
      ${sceneFor(s, s.current?.id ?? 'x')}
      <div class="ev-title">${v.rarity && RAR_LABEL[v.rarity] ? `<span class="rar rar-${v.rarity}">${RAR_LABEL[v.rarity]}</span>` : ''}<span>${esc(v.title)}</span></div>
      ${npcFor(s, s.current?.id ?? '')}
      <p class="story-text" id="typed"></p>
      <div class="hint" id="hint">toque para pular</div>
    </div>
    <div class="choices" id="choices">
      ${v.nota ? `<div class="nota-defeito">${esc(v.nota)}</div>` : ''}
      ${v.choices.map((c, i) => `
        <button class="choice" data-act="choose" data-i="${i}" ${c.disabled ? 'disabled' : ''}>
          <span>${c.selo ? `<span class="selo">${esc(c.selo)}</span> ` : ''}${esc(c.text)}</span>
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

/** Alcunha ganha pela conduta (virtude dominante a partir de 10 pontos). */
function alcunhaHtml(s: State): string {
  const v = virtudeDominante(s);
  return v ? ` <span class="alcunha">· ${esc(ALCUNHA[v as keyof typeof ALCUNHA] ?? '')}</span>` : '';
}

/** Estágio de domínio de uma técnica, com o progresso até o próximo. */
function dominioHtml(s: State, id: string): string {
  const e = dominioEstagio(s, id);
  const p = s.dominio?.[id] ?? 0;
  const prox = DOMINIO_LIMITES[e + 1];
  return `<b>${DOMINIO_NOMES[e]}</b>${prox ? ` <span class="muted small">(${p}/${prox})</span>` : ''}`;
}

/** Conduta: o que as suas escolhas fizeram de você. */
function perfilHtml(s: State): string {
  const p = s.perfil ?? {};
  const rows = Object.entries(p).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  if (!rows.length) return '';
  const max = Math.max(20, rows[0][1]);
  const v = virtudeDominante(s);
  return `<div class="card"><div class="muted small">CONDUTA${v ? ` · <b>${esc(ALCUNHA[v as keyof typeof ALCUNHA] ?? '')}</b>` : ''}</div>${rows.map(([k, n]) => `<div class="stat"><span>${esc(VIRTUDE_NOME[k as keyof typeof VIRTUDE_NOME] ?? k)}</span><div class="bar"><i style="width:${Math.min(100, (n / max) * 100)}%"></i></div><span class="n">${n}</span></div>`).join('')}<div class="muted small" style="margin-top:6px">Suas escolhas abrem, fecham e mudam opções e como os outros reagem a você.</div></div>`;
}

/** Título no mundo, poderes de reino e recurso próprio da trilha. */
function powerHtml(s: State): string {
  const path = PATH[s.path];
  const L = ladderOf(s);
  const r = realmOf(s);
  const powers = L.realms
    .map((x, i) => ({ x, i }))
    .filter(({ x, i }) => i >= 1 && i <= s.tier && x.poder)
    .map(({ x }) => `<li><b>${esc(x.name)}</b>: ${esc(x.poder!)}</li>`)
    .join('');
  const next = L.realms[s.tier + 1];
  let rec = '';
  if (path?.rec) {
    const stage = recStage(s);
    const into = (s.rec ?? 0) - stage * 3;
    const last = stage >= path.rec.stages.length - 1;
    rec = `<div style="margin-top:8px"><b>${esc(path.rec.name)}:</b> ${esc(path.rec.stages[stage])} <span class="muted small">(estágio ${stage + 1}/${path.rec.stages.length})</span>
      <div class="bar"><i style="width:${last ? 100 : Math.min(100, (into / 3) * 100)}%"></i></div>
      <div class="small muted">${esc(path.rec.desc)} A cada 2 estágios, +1 nos testes de ${esc(path.tags.join(', '))}.${path.fraco?.length ? ` Ponto fraco: ${esc(path.fraco.join(', '))}.` : ''}</div></div>`;
  }
  return `<div class="card"><div class="kv"><div class="k">Título</div><div class="v">${esc(r.titulo ?? 'Mortal')}</div></div>
    ${powers ? `<ul class="small" style="margin:6px 0 0 18px">${powers}</ul>` : ''}
    ${next?.poder ? `<div class="muted small" style="margin-top:4px">Próximo reino (${esc(next.name)}): ${esc(next.poder)}</div>` : ''}${rec}</div>`;
}

function statusHtml(s: State): string {
  const path = PATH[s.path];
  const L = ladderOf(s);
  const stats = STAT_KEYS.map((k) => {
    const v = eff(s, k);
    const base = s.stats[k];
    return `<div class="stat"><span>${STAT_NAMES[k]}</span><div class="bar"><i style="width:${Math.min(100, v)}%"></i></div><span class="n">${v}${v !== base ? `<span class="muted small"> (${base})</span>` : ''}</span></div>`;
  }).join('');
  const GRADE = ['', 'Mortal', 'Terra', 'Céu', 'Divino'];
  const techEffects = (t: (typeof TECH)[string]) => [
    ...Object.entries(t.stats ?? {}).map(([k, v]) => `${(v as number) > 0 ? '+' : ''}${v} ${STAT_NAMES[k as keyof typeof STAT_NAMES]}`),
    ...(t.xpMult && t.xpMult !== 1 ? [`cultivo +${Math.round((t.xpMult - 1) * 100)}%`] : []),
    ...(t.tags?.length ? [`bônus em testes de ${t.tags.join(', ')} (+${t.grade})`] : []),
  ].join(' · ');
  const techs = s.techniques.map((id) => { const t = TECH[id]; return `<div class="tech tech-ico"><div class="ico">${techIcon(t, 44)}</div><div><span class="pill g${t.grade}">${esc(t.name)}</span> <span class="muted small">${GRADE[t.grade]}</span> <span class="dom">${dominioHtml(s, t.id)}</span><div class="small">${esc(t.desc)}</div>${t.origem ? `<div class="muted small">Origem: ${esc(t.origem)}</div>` : ''}<div class="muted small">${esc(techEffects(t))}</div></div></div>`; }).join('') || '<span class="muted">Nenhuma ainda</span>';
  const cons = s.constitution ? CONSTITUTION[s.constitution] : null;
  const fac: Record<string, string> = { seita: 'Seita justa', demoniaca: 'Seita demoníaca', cla: 'Clã', errante: 'Errante', nenhuma: 'Sem facção' };
  return `
    <div class="card">
      <div class="emblems">${pathIcon(s.path || 'sopro', 56)}${realmIcon(L.name.includes('Murim') ? 'murim' : 'xianxia', s.tier, 56)}<div class="grow"><b>${esc(path.name)}</b><div class="muted small">${esc(realmOf(s).name)}</div></div></div>
      <div class="kv">
        <div class="k">Trilha</div><div class="v">${esc(path.name)}</div>
        <div class="k">Reino</div><div class="v">${esc(realmOf(s).name)} <span class="muted small">(${s.tier}/${L.realms.length - 1})</span></div>
        <div class="k">Origem</div><div class="v">${esc(ORIGIN[s.origin].name)}</div>
        <div class="k">Raiz</div><div class="v">${esc(s.root.name)}</div>
        ${cons ? `<div class="k">Corpo</div><div class="v">${esc(cons.name)}</div>` : ''}
        <div class="k">Talento</div><div class="v">${esc(TALENT[s.talent].name)}</div>
        <div class="k">Defeito</div><div class="v">${esc(FLAW[s.flaw].name)}</div>
        <div class="k">Facção</div><div class="v">${fac[s.faction]}</div>
        <div class="k">Dificuldade</div><div class="v">${(DIFFICULTIES.find(([v]) => v === (s.dif ?? 0)) ?? DIFFICULTIES[1])[1]}</div>
        <div class="k">Local</div><div class="v">${PLACE_NAMES[s.place] ?? s.place}</div>
      </div>
    </div>
    ${powerHtml(s)}
    ${perfilHtml(s)}
    <div class="card">${stats}<details style="margin-top:8px"><summary class="muted small">O que cada atributo faz</summary><div class="small" style="margin-top:6px"><b>Físico:</b> força e vigor, para combate e corpo. <b>Espírito:</b> Qi e consciência. <b>Compreensão:</b> aprendizado, alquimia, formações e velocidade de cultivo. <b>Sorte:</b> eventos raros e pequenos ajustes em todos os testes. <b>Carisma:</b> aliados, negociação e fama. <b>Coração do Dao:</b> vontade, resistência a demônios interiores e rompimentos.</div></details></div>
    <div class="card kv">
      <div class="k">Pedras</div><div class="v">${s.pedras}</div>
      <div class="k">Fama</div><div class="v">${s.fama}</div>
      <div class="k">Karma</div><div class="v">${s.karma > 0 ? '+' : ''}${s.karma}</div>
      <div class="k">Corrupção</div><div class="v">${s.corr}/100</div>
      <div class="k">Ferimentos</div><div class="v">${Math.round(s.wounds)}/6</div>
      <div class="k">Cultivo</div><div class="v">${s.tier > 0 ? `${cultivationRate(s).toFixed(1)}%/ano` : '—'}</div>
    </div>
    ${relationsHtml(s)}
    <div class="card"><div class="muted small" style="margin-bottom:4px">TÉCNICAS</div>${techs}</div>`;
}

/** Relações importantes da história, derivadas das flags da vida. */
function relationsHtml(s: State): string {
  const f = (x: string) => s.flags.includes(x);
  const n = s.names;
  const rows: [string, string][] = [];
  if (f('mestre_protetor')) rows.push(['Mestre ' + n.mentor, 'protege você na seita']);
  if (f('mestre_do_anel') || f('velho_no_anel')) rows.push(['O Velho do Anel', f('velho_livre') ? 'recuperou o corpo e é seu aliado' : 'mora no anel negro e guarda seus segredos']);
  if (f('mestre_renascido')) rows.push(['Seu antigo mestre', 'renasceu criança e você o guia de novo']);
  if (f('companheiro_dao')) rows.push(['Companheiro(a) do Dao', 'caminha ao seu lado']);
  if (f('viuvo_do_dao')) rows.push(['Companheiro(a) perdido(a)', 'o luto virou parte do seu caminho']);
  if (f('tem_filho')) rows.push(['Seu filho' + (f('tem_neto') ? ' e seu neto' : ''), f('filho_com_raiz') ? 'a raiz espiritual despertou na família' : 'a família cresce']);
  if (f('cla_proprio')) rows.push([n.cla, 'o clã que você fundou']);
  if (f('tem_discipulo') || f('aprendiz_alquimista')) rows.push(['Discípulo(a)', 'aprende com você e um dia volta']);
  if (f('aliado_junior')) rows.push(['Jovem discípulo que você ajudou', 'agora é um aliado poderoso']);
  if (f('irmao_jurado')) rows.push(['Irmão jurado', 'uma promessa de vinho e sangue']);
  if (f('irmao_de_sangue')) rows.push(['Irmão de sangue', 'um laço que cobra caro de quem trair']);
  if (f('aliado_amigo') || f('amigo_juramento')) rows.push([n.amigo, 'amigo de infância' + (f('traiu_por_amigo') ? ', que o traiu' : '')]);
  if (f('amigo_do_dormitorio')) rows.push(['Colega do dormitório', 'dividiu o pão com você']);
  if (f('besta_companheira') || f('pacto_besta')) rows.push(['Fera companheira', f('pacto_besta') ? 'ligada à sua alma' : 'ainda cresce']);
  if (f('rival_derrotado')) rows.push([n.rival, 'rival derrotado']);
  else if (f('paz_com_rival')) rows.push([n.rival, 'rival com quem você fez as pazes']);
  else if (f('rival_interno') || f('enfrentou_rival') || f('humilhado_por_rival') || f('humilhou_rival') || f('perdeu_para_rival_interno')) rows.push([n.rival, 'rival que ainda não esqueceu']);
  if (f('noivado') && !f('perdoou_noivado')) rows.push([n.noivo, f('juramento_vinganca') ? 'noivado rompido; você jurou voltar com glória' : 'noivado rompido']);
  if (f('perdoou_noivado')) rows.push([n.noivo, 'você ajudou a família que o desprezou']);
  if (f('inimigo_anciao')) rows.push(['Um Ancião', 'inimigo na sua seita']);
  if (f('inimigo_mestre_demoniaco')) rows.push(['Mestre demoníaco', 'quer o seu coração']);
  if (f('viuva_inimiga') || f('chen_vinganca')) rows.push(['O filho de Chen', 'vai cobrar uma dívida antiga']);
  if (f('devedor_demoniaca')) rows.push(['A mulher de olhos vermelhos', 'salvou sua vida e esperou nada em troca']);
  if (!rows.length) return '';
  return `<div class="card"><div class="muted small" style="margin-bottom:4px">RELAÇÕES</div>${rows.map(([a, b]) => `<div class="tech"><b>${esc(a)}</b><div class="small muted">${esc(b)}</div></div>`).join('')}</div>`;
}

function bagHtml(s: State): string {
  if (!s.items.length) return '<div class="card muted">Sua mochila está vazia.</div>';
  const counts = new Map<string, number>();
  for (const id of s.items) counts.set(id, (counts.get(id) ?? 0) + 1);
  const rows = [...counts.entries()].map(([id, n]) => {
    const it = ITEM[id];
    const usable = !!it.use;
    return `<div class="item"><div class="ico">${itemIcon(it, 46)}</div><div class="grow"><b>${esc(it.name)}</b>${n > 1 ? ` ×${n}` : ''}<div class="muted small">${esc(it.desc)}${it.passive ? ' · ' + Object.entries(it.passive).map(([k, v]) => `${STAT_NAMES[k as keyof typeof STAT_NAMES]} +${v}`).join(', ') : ''}${it.breakBonus ? ` · ajuda no rompimento (+${Math.round(it.breakBonus.bonus * 100)}%)` : ''}</div></div>${usable ? `<button class="btn" data-act="use" data-id="${id}">Usar</button>` : ''}</div>`;
  }).join('');
  return `<div class="card list">${rows}</div>`;
}

function logHtml(s: State): string {
  if (!s.log.length) return '<div class="card muted">Nada ainda.</div>';
  return `<div class="card">${[...s.log].reverse().map((l) => `<div class="log-entry"><span class="a">${l.age}a</span><span>${esc(l.text)}</span></div>`).join('')}</div>`;
}

function milestones(s: State): string {
  const rows = s.log.filter((l, i) => i === 0 || /^(Alcançou o reino|Encontrou seu método)/.test(l.text));
  return rows.map((l) => `<div class="log-entry"><span class="a">${l.age}a</span><span>${esc(l.text)}</span></div>`).join('');
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
      <div class="end-card">${endingCard(e.id, e.name)}<div class="end-pt">${portraitSvg(lookFromState(s), 64)}</div></div>
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
      <div class="card"><div class="muted small">MARCOS DA VIDA</div>${milestones(s)}</div>
      ${sm.marcas?.length ? `<div class="card"><div class="muted small">O QUE VOCÊ DEIXOU PARA TRÁS</div>${sm.marcas.map((m) => `<div class="tech small">${esc(m)}</div>`).join('')}<div class="muted small" style="margin-top:6px">Cada quatro marcas rendem +1 de Herança (até +2).</div></div>` : ''}
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
    const pill = (name: string, ok: boolean, grade?: number, icon = '') => `<span class="pill cx ${ok && grade ? 'g' + Math.min(4, grade) : ''}" style="${ok ? '' : 'opacity:.4'}">${icon ? `<span class="cxi">${icon}</span>` : ''}${ok ? esc(name) : '???'}</span>`;
    body = `<div class="card"><div class="muted small">FINAIS · ${m.endingsSeen.length}/${ENDINGS.length}</div>${ENDINGS.map((e) => pill(e.name, m.endingsSeen.includes(e.id))).join('')}</div>
      <div class="card"><div class="muted small">TÉCNICAS · ${cx.techs.length}/${TECHNIQUES.length}</div>${TECHNIQUES.map((t) => pill(t.name, cx.techs.includes(t.id), t.grade, cx.techs.includes(t.id) ? techIcon(t, 26) : '')).join('')}</div>
      <div class="card"><div class="muted small">ITENS · ${cx.items.length}/${ITEMS.length}</div>${ITEMS.map((i) => pill(i.name, cx.items.includes(i.id), i.grade, cx.items.includes(i.id) ? itemIcon(i, 26) : '')).join('')}</div>
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
      <div class="card"><div class="muted small">DUELOS ANIMADOS</div><div class="row" style="flex-wrap:wrap;margin-top:8px"><button class="btn ${save.settings.duelos ? 'primary' : ''}" style="width:auto;flex:1;padding:10px 6px" data-act="duelos" data-i="1">Ligados</button><button class="btn ${!save.settings.duelos ? 'primary' : ''}" style="width:auto;flex:1;padding:10px 6px" data-act="duelos" data-i="0">Desligados</button></div><div class="muted small" style="margin-top:6px">Uma cena curta que encena as lutas. Não muda o resultado; dá para pular a qualquer momento.</div></div>
      <button class="btn" data-act="export">Copiar save (backup)</button>
      <button class="btn" data-act="import">Importar save</button>
      <button class="btn ghost" data-act="wipe" style="color:var(--red)">Apagar todo o progresso</button>
      <div class="card muted small"><b>Sobre</b><br>Dao das Mil Vidas · versão ${__APP_VERSION__} (${__BUILD_DATE__})<br>${EVENTS.length} eventos · ${ITEMS.length} itens · ${TECHNIQUES.length} técnicas · ${ENDINGS.length} finais · ${PATHS.length} trilhas<br>Convenções de gênero pesquisadas em novels xianxia/wuxia/xuanhuan, manhwas murim e mitologia chinesa; personagens, seitas, técnicas e textos são originais. Fontes em docs/pesquisa.md e docs/lotes.md.<br><b>Dao das Mil Vidas © 2026 Andre Barbosa Vieira. Todos os direitos reservados.</b></div>`;
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
  save.run.dif = save.settings.difficulty;
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
      if (s.result?.combate && save.settings.duelos) playDuel(s.result.combate, { nome: s.name, onDone: () => render() });
      else render();
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
    case 'duelos': save.settings.duelos = target.dataset.i === '1'; persist(); render(); break;
    case 'speed': save.settings.speed = Number(target.dataset.i); persist(); render(); break;
    case 'theme': save.settings.theme = target.dataset.id as Settings['theme']; applySettings(); persist(); render(); break;
    case 'font': save.settings.font = Number(target.dataset.i); applySettings(); persist(); render(); break;
    case 'dif': save.settings.difficulty = Number(target.dataset.i); persist(); render(); break;
    case 'intro': save.settings.intro = true; persist(); render(); break;
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

/** Depuração: ?duelo=<oponente>&trilha=<id>&reino=<n>&derrota=1 toca um duelo de exemplo. */
{
  const q = new URLSearchParams(location.search);
  const f = q.get('duelo');
  if (f) {
    const win = !q.get('derrota');
    const beats = win
      ? [{ a: 'p' as const, mov: 'Golpe de Teste', dano: 30 }, { a: 'f' as const, mov: 'Ataque', dano: 20 }, { a: 'p' as const, mov: 'Técnica Secreta', tec: true, dano: 30 }, { a: 'f' as const, mov: 'Ataque', dano: 0, esq: true }, { a: 'p' as const, mov: 'Golpe Final', dano: 40, crit: true }]
      : [{ a: 'p' as const, mov: 'Golpe de Teste', dano: 25 }, { a: 'f' as const, mov: 'Ataque', dano: 35 }, { a: 'f' as const, mov: 'Golpe Final', dano: 45, crit: true }];
    setTimeout(() => playDuel({ foe: f, foeName: (FOE_NAMES[f] ?? f), scene: q.get('cenario') ?? 'selva', vitoria: win, desfecho: win ? 'vitoria' : ((q.get('desfecho') as 'derrota' | 'fuga' | 'salvo') ?? 'derrota'), beats, fim: win ? { p: 50, f: 0 } : { p: 20, f: 45 }, fraseFim: 'tomba', path: q.get('trilha') ?? 'espada', tier: Number(q.get('reino') ?? 2) }, { nome: 'Teste', onDone: () => { document.title = 'duelo-fim'; } }), 300);
  }
}
