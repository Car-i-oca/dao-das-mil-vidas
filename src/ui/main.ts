import './style.css';
import { Rng } from '../engine/rng';
import {
  newMeta, rollCreation, startLife, view, choose, proceed, finalizeLife, useItem, useItemInEncounter, buyUpgrade,
  realmOf, ladderOf, eff, cultivationRate, EVENT, virtudeDominante, PATH, ORIGIN, TALENT, FLAW, ITEM, ENDING, CONSTITUTION, STAT_KEYS, STAT_NAMES, acceptQuest, abandonQuest, sectRankOf, equipItem, unequipItem, recruitCompanion, dismissCompanion, joinGuild, factionReputation, combatCheckPreview, tradeItem,
  type Creation,
} from '../engine/engine';
import { ACHIEVEMENTS, UPGRADES, upgradePrice } from '../data/endings';
import { ORIGINS, TALENTS } from '../data/character';
import type { Change, DiceRoll, EquipmentSlot, GuildFaction, Meta, State, UiNotification } from '../types';
import { ITEMS } from '../data/items';
import { WORLD } from '../data/mundo';
import { ALCUNHA, VIRTUDE_NOME } from '../data/marcas';
import { EVENTS } from '../data/events';
import { PATHS } from '../data/paths';
import { ENDINGS } from '../data/endings';
import { itemIcon, pathIcon, realmIcon, definirEstilo, estiloValido, ESTILOS, amostraDe, type Estilo } from './art';
import { sceneSvg, endingCard, type SceneKind } from './art';
import { portraitSvg, lookFromState, lookForNpc, type Role } from './art';
import { hash } from './art';
import { FOES, foeFor } from '../data/combates';
import { QUESTS } from '../data/quests';
import { COMPANIONS } from '../data/companions';
import { playSfx, startAudioExperience, setAudioForeground } from './audio';
import { pacote as pixelArt } from './art/pixel';
const FOE_NAMES: Record<string, string> = Object.fromEntries(FOES.map((x) => [x.id, x.name]));

/* ---------- Persistência ---------- */
const KEY = 'dao-mil-vidas-save-v1';
interface Settings { estilo: Estilo; speed: number; theme: 'auto' | 'claro' | 'escuro'; font: number; intro: boolean; difficulty: number }
function normSettings(x?: Partial<Settings>): Settings {
  return { estilo: estiloValido(x?.estilo) ? x.estilo : 'manhwa', speed: x?.speed ?? 2, theme: x?.theme ?? 'auto', font: x?.font ?? 1, intro: x?.intro ?? false, difficulty: x?.difficulty ?? 0 };
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

function shopModalHtml(s: State): string {
  const byRarity = new Map<string, (typeof ITEMS)[number]>();
  const rarityOrder = ['comum', 'incomum', 'raro', 'epico', 'lendario'];
  for (const rarity of rarityOrder) {
    const item = ITEMS.filter((entry) => entry.rarity === rarity && entry.kind !== 'misc')
      .sort((a, b) => a.value - b.value)[0];
    if (item) byRarity.set(rarity, item);
  }
  const offers = [...byRarity.entries()].map(([rarity, item]) =>
    `<div class="shop-row"><span class="shop-item rarity-text-${rarity}"><b>${esc(item.name)}</b><small>${RARITY_LABEL[rarity]} · ${item.value} pedras</small></span><button class="btn" data-act="shop-buy" data-id="${item.id}" ${s.pedras < item.value ? 'disabled' : ''}>Comprar</button></div>`,
  ).join('');
  const saleCounts = new Map<string, number>();
  for (const id of s.items) saleCounts.set(id, (saleCounts.get(id) ?? 0) + 1);
  const sales = [...saleCounts.entries()].map(([id, count]) => {
    const item = ITEM[id];
    if (!item || Object.values(s.equipment ?? {}).includes(id)) return '';
    const price = Math.max(1, Math.floor(item.value / 2));
    return `<div class="shop-row"><span class="shop-item"><b>${esc(item.name)}${count > 1 ? ` ×${count}` : ''}</b><small>${RARITY_LABEL[item.rarity]} · revenda ${price} pedras</small></span><button class="btn ghost" data-act="shop-sell" data-id="${id}">Vender</button></div>`;
  }).join('') || '<p class="muted small">Não há itens disponíveis para venda.</p>';
  return `<div class="shop-overlay" role="dialog" aria-modal="true" aria-label="Loja do mercador">
    <button class="shop-backdrop" data-act="shop-close" aria-label="Fechar loja"></button>
    <section class="shop-modal"><header class="shop-header"><div><span class="muted small">PEDRAS ESPIRITUAIS · ${s.pedras}</span><h2>Mercador</h2></div><button class="btn ghost" data-act="shop-close" aria-label="Fechar">×</button></header>
      <div class="shop-scroll"><div class="muted small">COMPRAR · OFERTAS POR RARIDADE</div>${offers}<div class="muted small shop-section-title">VENDER · RECEBA METADE DO VALOR</div>${sales}</div>
    </section>
  </div>`;
}

window.addEventListener('pagehide', persist);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    persist();
    void setAudioForeground(false).catch((error: unknown) => {
      audioGateError = error instanceof Error ? error.message : 'Não foi possível pausar os efeitos sonoros.';
    });
  } else if (audioStarted) {
    void setAudioForeground(true).catch((error: unknown) => {
      audioGateError = error instanceof Error ? error.message : 'Não foi possível retomar os efeitos sonoros.';
    });
  }
});

function withRng<T>(s: State, fn: (r: Rng) => T): T {
  const r = new Rng(s.seed);
  const out = fn(r);
  s.seed = r.seed;
  return out;
}

/* ---------- Estado de interface ---------- */
type Screen = 'home' | 'create' | 'game' | 'end' | 'meta';
let screen: Screen = 'home';
let tab: 'aventura' | 'equipamentos' | 'inventario' | 'faccoes' | 'diario' = 'aventura';
let metaTab: 'heranca' | 'conquistas' | 'codice' | 'historico' | 'opcoes' = 'heranca';
let creation: { c: Creation; seed: number; rerolls: number } | null = null;
let typer: { timer: number; el: HTMLElement; full: string; done: () => void } | null = null;
let audioStarted = false;
let audioGateError = '';
let audioStarting = false;
let diceModal: { roll: DiceRoll; combat: boolean; success: boolean; face: number; settled: boolean } | null = null;
let diceTimer = 0;
let selectedInventoryItem: string | null = null;
let galleryOpen = false;
let galleryTab: 'endings' | 'enemies' | 'artifacts' = 'endings';
let shopOpen = false;
let shopEventId = '';

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
  definirEstilo(save.settings.estilo);
  if (save.settings.theme === 'auto') r.removeAttribute('data-theme');
  else r.setAttribute('data-theme', save.settings.theme === 'claro' ? 'light' : 'dark');
  r.setAttribute('data-font', String(save.settings.font));
}

const chipsHtml = (ch?: Change[]) => (ch?.length ? `<div class="chips">${ch.map((c) => `<span class="chip ${c.k}">${esc(c.t)}</span>`).join('')}</div>` : '');

function toast(msg: string, kind: UiNotification['kind'] = 'quest') {
  playSfx(kind === 'rare-item' ? 'rare' : 'toast');
  let region = document.getElementById('toast-region');
  if (!region) {
    region = document.createElement('div');
    region.id = 'toast-region';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    document.body.appendChild(region);
  }
  const el = document.createElement('div');
  el.className = `toast${kind === 'rare-item' ? ' toast-rare' : ''}${kind === 'alignment' ? ' toast-alignment' : ''}`;
  el.textContent = msg;
  region.appendChild(el);
  setTimeout(() => {
    el.classList.add('toast-out');
    setTimeout(() => el.remove(), 220);
  }, 2600);
}

function flushEngineNotifications(s: State) {
  for (const notification of s.uiNotifications?.splice(0) ?? []) toast(notification.message, notification.kind);
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
  const alignment = screen === 'game' && save.run
    ? save.run.alignment ?? (save.run.path === 'demoniaca' ? 'demoniaco' : 'daoico')
    : null;
  app.classList.toggle('alignment-demonic', alignment === 'demoniaco');
  app.classList.toggle('alignment-daoic', alignment === 'daoico');
  if (alignment) document.documentElement.dataset.alignment = alignment;
  else delete document.documentElement.dataset.alignment;
  if (!audioStarted) {
    app.innerHTML = `<div class="audio-gate"><div class="audio-gate-card"><div class="seal">道</div><h1>Dao das Mil Vidas</h1><p>Uma jornada entre vidas, escolhas e destinos.</p><div class="btn primary audio-start" data-act="start-audio" role="button" tabindex="0" aria-disabled="${audioStarting}">${audioStarting ? 'Preparando o Cultivo…' : 'Toque para Iniciar o Cultivo'}</div><span class="muted small audio-error">${esc(audioGateError)}</span></div></div>`;
    return;
  }
  switch (screen) {
    case 'home': renderHome(); break;
    case 'create': renderCreate(); break;
    case 'game': renderGame(); break;
    case 'end': renderEnd(); break;
    case 'meta': renderMeta(); break;
  }
  if (diceModal) app.insertAdjacentHTML('beforeend', diceModalHtml(diceModal));
}

function diceModalHtml(modal: NonNullable<typeof diceModal>): string {
  const { roll } = modal;
  const signed = (value: number) => `${value >= 0 ? '+' : '−'} ${Math.abs(value)}`;
  const statusBonus = roll.statBonus + roll.otherBonus;
  const result = modal.settled
    ? `<span class="formula-part">D20 <b>${roll.d20}</b></span><span>${signed(statusBonus)} Status do Jogador</span><span>${signed(roll.equipmentBonus)} Equipamento</span><b>= ${roll.total}</b>`
    : '<span class="formula-part">D20 <b>?</b></span><span>+ Status do Jogador</span><span>+ Equipamento</span>';
  const combat = modal.combat && roll.enemyPower !== undefined
    ? `<div class="dice-power"><span>Seu poder <b>${roll.playerPower}</b></span><span>Inimigo <b>${roll.enemyPower}</b></span></div>`
    : '';
  return `<div class="dice-overlay" role="dialog" aria-modal="true" aria-label="Resultado da rolagem">
    <div class="dice-card ${modal.settled ? (modal.success ? 'success' : 'failure') : 'rolling'}">
      <span class="dice-kicker">${modal.combat ? 'CONFRONTO' : 'TESTE DE ATRIBUTO'}</span>
      <div class="dice-face" aria-live="polite">${modal.settled ? roll.d20 : modal.face}</div>
      <h2>${modal.settled ? (modal.success ? 'Sucesso' : 'Falha') : 'O destino decide'}</h2>
      <div class="dice-equation">${result}<span class="dice-dc">vs Dificuldade ${roll.dc}</span></div>
      <p class="dice-stat">${STAT_NAMES[roll.stat]} · status inclui atributos, cultivo e efeitos; equipamento aparece à parte.</p>
      ${combat}
      ${modal.settled ? '<button class="btn primary" data-act="roll-close">Ver consequência</button>' : '<div class="dice-wait">Rolando…</div>'}
    </div>
  </div>`;
}

function showDiceModal(s: State) {
  const roll = s.result?.roll;
  if (!roll) return;
  window.clearInterval(diceTimer);
  diceModal = { roll, combat: roll.enemyPower !== undefined, success: !!s.result?.check?.success, face: 1, settled: false };
  playSfx('roll');
  render();
  const timerStarted = performance.now();
  diceTimer = window.setInterval(() => {
    if (!diceModal) { window.clearInterval(diceTimer); return; }
    if (performance.now() - timerStarted >= 2000) {
      window.clearInterval(diceTimer);
      diceModal.face = roll.d20;
      diceModal.settled = true;
      playSfx(diceModal.success ? 'victory' : 'impact');
      render();
      return;
    }
    diceModal.face = 1 + Math.floor(Math.random() * 20);
    const face = app.querySelector<HTMLElement>('.dice-face');
    if (face) face.textContent = String(diceModal.face);
  }, 72);
}

function renderHome() {
  const m = save.meta;
  const gallery = galleryOpen ? galleryModalHtml(m) : '';
  app.innerHTML = `
    <div class="screen home">
      <div class="home-emblem"><div class="seal">道</div><span>CRÔNICAS DO CULTIVO</span></div>
      <div class="home-title"><h1>Dao das Mil Vidas</h1><div class="tag">Cada vida deixa uma marca no Dao.</div></div>
      <div class="stack home-menu">
        ${save.run && !save.run.summary ? `<button class="btn primary" data-act="continue">Continuar a vida de ${esc(save.run.name)}</button>` : ''}
        <button class="btn ${save.run && !save.run.summary ? '' : 'primary'}" data-act="new">Nova vida</button>
        <button class="btn" data-act="meta">Herança do Dao · ${m.legacy} pts</button>
        <button class="btn" data-act="gallery-open">Galeria · finais, inimigos e artefatos</button>
        <button class="btn ghost" data-act="estilomenu">Estilo de arte: ${ESTILOS.find((e) => e.id === save.settings.estilo)?.nome ?? ''}</button>
        ${isStandalone() ? '' : '<button class="btn ghost" data-act="install">Instalar como app</button>'}
      </div>
      <p class="home-stats">Vidas vividas <b>${m.lives}</b><span>·</span> Finais descobertos <b>${m.endingsSeen.length}/${ENDINGS.length}</b>${m.best ? `<span>·</span> Melhor: ${esc(bestName(m))}` : ''}</p>
      <p class="muted small copy">Dao das Mil Vidas © 2026 Andre Barbosa Vieira. Todos os direitos reservados.</p>
    </div>${gallery}`;
}

function galleryModalHtml(meta: Meta): string {
  const tabs: [typeof galleryTab, string][] = [['endings', 'Finais'], ['enemies', 'Inimigos'], ['artifacts', 'Artefatos']];
  let content = '';
  if (galleryTab === 'endings') {
    content = `<div class="gallery-grid">${ENDINGS.map((ending) => {
      const found = meta.endingsSeen.includes(ending.id);
      return `<div class="gallery-entry ${found ? 'found' : 'locked'}"><span class="gallery-silhouette">${found ? '✦' : '◈'}</span><b>${found ? esc(ending.name) : '???'}</b><small>${found ? 'Final descoberto' : 'Final não descoberto'}</small></div>`;
    }).join('')}</div>`;
  } else if (galleryTab === 'enemies') {
    const defeated = new Set(meta.defeatedFoes ?? []);
    content = `<div class="gallery-grid">${FOES.map((foe) => {
      const found = defeated.has(foe.id);
      const portrait = found && pixelArt.foe ? pixelArt.foe(foe.id) : found ? esc(foe.name.slice(0, 1)) : '◈';
      return `<div class="gallery-entry ${found ? 'found' : 'locked'}"><span class="gallery-silhouette">${portrait}</span><b>${found ? esc(foe.name) : '???'}</b><small>${found ? 'Derrotado' : 'Inimigo desconhecido'}</small></div>`;
    }).join('')}</div>`;
  } else {
    const discovered = new Set(meta.codex?.items ?? []);
    const artifacts = ITEMS.filter((item) => ['artefato', 'arma', 'armadura', 'anel', 'talisma'].includes(item.kind));
    content = `<div class="gallery-grid">${artifacts.map((item) => {
      const found = discovered.has(item.id);
      return `<div class="gallery-entry ${found ? 'found' : 'locked'} rarity-${item.rarity}"><span class="gallery-silhouette">${found ? itemIcon(item, 40) : '◈'}</span><b>${found ? esc(item.name) : '???'}</b><small>${found ? RARITY_LABEL[item.rarity] : 'Artefato desconhecido'}</small></div>`;
    }).join('')}</div>`;
  }
  return `<div class="gallery-overlay" role="dialog" aria-modal="true" aria-label="Galeria e Herança do Dao">
    <button class="gallery-backdrop" data-act="gallery-close" aria-label="Fechar galeria"></button>
    <section class="gallery-modal"><header class="gallery-header"><div><span class="muted small">MEMÓRIA DAS VIDAS</span><h2>Galeria</h2></div><button class="btn ghost" data-act="gallery-close" aria-label="Fechar">×</button></header>
      <nav class="gallery-tabs">${tabs.map(([id, label]) => `<button class="${galleryTab === id ? 'active' : ''}" data-act="gallery-tab" data-id="${id}">${label}</button>`).join('')}</nav>
      <div class="gallery-content">${content}</div>
    </section>
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
  const sagaProgress = Math.round((s.turn % 6) / 6 * 100);
  const sagaChapter = Math.floor(s.turn / 6) + 1;
  const statusNames: Record<string, string> = { poisoned: 'Envenenado', bleeding: 'Sangrando', burning: 'Queimando', frozen: 'Congelado', focused: 'Focado', guarded: 'Protegido' };
  const statuses = (s.statuses ?? []).map((status) => `<span class="status-chip ${status.id}">${statusNames[status.id]} · ${status.turns} t</span>`).join('');
  return `
    <div class="hud">
      <div class="hud-row"><div class="hud-pt">${portraitSvg(lookFromState(s), 52)}</div><div class="hud-main">
      <div class="row between"><span class="name">${esc(s.name)}${alcunhaHtml(s)}</span><span class="wounds" title="Ferimentos">${s.wounds > 0 ? '♥'.repeat(Math.min(6, Math.round(s.wounds))) : ''}</span></div>
      <div class="sub">${esc(realm.name)} · ${Math.floor(s.age)} anos de ${s.maxAge}${s.tier > 0 ? ` · ${Math.min(100, Math.round(s.xp))}%` : ''}${s.world ? ` · <span style="color:var(--gold)">Era: ${esc(WORLD[s.world.id].name)}</span>` : ''}</div>
      <div class="hud-resources"><span>Dia ${s.day ?? 1} · ${String(s.hour ?? 8).padStart(2, '0')}:00</span><span>${weatherLabel(s.weather)}</span><span>Reputação: ${s.reputation ?? 0}</span>${sectRankOf(s) ? `<span>Seita: ${sectRankLabel(sectRankOf(s)!)}</span>` : ''}${statuses ? `<div class="status-chips">${statuses}</div>` : ''}</div>
      ${s.tier > 0 ? `<div class="bar"><i style="width:${Math.min(100, s.xp)}%"></i></div>` : ''}
      <div class="bar age"><i style="width:${ageRatio * 100}%"></i></div>
      <div class="saga-progress"><span>Jornada · Cap. ${sagaChapter}</span><div class="bar"><i style="width:${sagaProgress}%"></i></div><b>${sagaProgress}%</b></div>
      </div></div>
    </div>`;
}

/** Cenário do lugar atual (e da era do mundo, quando há). */
function sceneFor(s: State, eventId: string): string {
  let kind: string = s.place;
  if (s.world?.id === 'reino_secreto') kind = 'reino_secreto';
  else if (s.tier >= 7 && hash(eventId) % 3 === 0) kind = 'ceu';
  const scene = pixelArt.scene?.(kind as SceneKind, `${eventId}-${s.day ?? 1}-${s.weather ?? 'sunny'}`, (s.hour ?? 8) >= 19 || (s.hour ?? 8) < 6)
    ?? sceneSvg(kind as SceneKind, eventId, (s.hour ?? 8) >= 19 || (s.hour ?? 8) < 6);
  return `<div class="scene">${scene}</div>`;
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
  const t = (id: typeof tab, icon: string, label: string) => `<button class="tab-item ${tab === id ? 'on' : ''}" data-act="tab" data-id="${id}" aria-current="${tab === id ? 'page' : 'false'}"><span class="tab-icon">${icon}</span><span>${label}</span></button>`;
  return `<nav class="tabs" aria-label="Navegação da vida">${t('aventura', '⚔', 'Aventura')}${t('equipamentos', '◈', 'Equipamentos')}${t('inventario', '▣', 'Inventário')}${t('faccoes', '⚑', 'Facções')}</nav>`;
}

function renderGame() {
  const s = save.run!;
  const currentType = s.current ? EVENT[s.current.id]?.type ?? (EVENT[s.current.id] ? view(s).eventType : undefined) : undefined;
  const currentEventId = s.current?.id;
  if (currentType === 'shop' && currentEventId && currentEventId !== shopEventId) {
    shopEventId = currentEventId;
    shopOpen = true;
  } else if (currentType !== 'shop') {
    shopEventId = '';
    shopOpen = false;
  }
  let body = '';
  if (tab === 'aventura') body = lifeHtml(s);
  else if (tab === 'equipamentos') body = equipmentHtml(s);
  else if (tab === 'inventario') body = lifeHtml(s);
  else if (tab === 'faccoes') body = factionsHtml(s);
  else body = logHtml(s);
  const frameTab = tab === 'inventario' ? 'aventura' : tab;
  app.innerHTML = `<div class="game-frame" data-tab="${frameTab}">${hudHtml(s)}<button class="journal-link" data-act="tab" data-id="diario">Abrir diário da vida <span>↗</span></button><main class="game" id="game">${body}</main></div>${tabsHtml()}`;
  if (tab === 'aventura' || tab === 'inventario') startTyping(s);
}

const RARITY_LABEL: Record<string, string> = { comum: 'Comum', incomum: 'Incomum', raro: 'Raro', epico: 'Épico', lendario: 'Lendário' };

const INTRO_HTML = `<details class="intro"><summary>Como jogar</summary><p>Cada acontecimento traz escolhas; os testes dependem de atributos e equipamentos. O tempo passa a cada decisão e o clima pode alterar seus testes. Explore as abas para cuidar do equipamento, inventário e facções.</p><button class="btn ghost" data-act="intro">Entendi</button></details>`;

function weatherLabel(weather?: State['weather']): string {
  return weather === 'rain' ? 'Chuva' : weather === 'blizzard' ? 'Nevasca' : 'Ensolarado';
}

function adventureArt(s: State, eventId: string, title: string, eventType?: string): string {
  const event = EVENT[eventId];
  const foeId = s.current?.foe ?? event?.combate?.oponente
    ?? (eventType === 'combat' && event ? foeFor(event.id, event.title, event.text) : undefined);
  const encounter = eventType === 'combat' && foeId && pixelArt.player && pixelArt.foe
    ? `<div class="encounter-pair"><div class="encounter-fighter player-fighter"><svg viewBox="0 0 120 140" role="img" aria-label="${esc(s.name)}">${pixelArt.player(s.path, s.tier)}</svg><small>${esc(s.name)}</small></div><b>VS</b><div class="encounter-fighter"><svg viewBox="0 0 120 140" role="img" aria-label="${esc(FOE_NAMES[foeId] ?? foeId)}"><g transform="translate(120 0) scale(-1 1)">${pixelArt.foe(foeId)}</g></svg><small>${esc(FOE_NAMES[foeId] ?? foeId)}</small></div></div>`
    : '';
  return `<section class="adventure-art">${sceneFor(s, eventId)}${encounter}<div class="art-caption"><span class="badge">${weatherLabel(s.weather)} · Dia ${s.day ?? 1}</span><h2>${esc(title)}</h2></div></section>`;
}

function lifeHtml(s: State): string {
  const v = view(s);
  const intro = !save.settings.intro && s.turn < 2 ? INTRO_HTML : '';
  const eventId = s.current?.id ?? '';
  const title = v.kind === 'event' ? v.title : (s.ending ? ENDING[s.ending]?.name ?? 'O destino se revela' : 'Consequências');
  const eventType = v.eventType ?? EVENT[eventId]?.type;
  const chk = s.result?.check;
  const combatItems = eventType === 'combat'
    ? [...new Set(s.items)].filter((id) => ITEM[id]?.use).map((id) => {
      const item = ITEM[id];
      return `<div class="choice combat-item-choice" data-act="use-combat-item" data-id="${id}" role="button" tabindex="0" aria-label="Usar ${esc(item.name)}"><span>${itemIcon(item, 24)} Usar ${esc(item.name)}</span><span class="note">Preparação</span></div>`;
    }).join('')
    : '';
  const choicesHtml = v.kind === 'result' || v.kind === 'ending'
    ? `${chipsHtml(s.result?.changes)}<button class="btn primary" data-act="${s.ending ? 'toEnd' : 'next'}">${s.ending ? 'Ver o final desta vida' : 'Continuar'}</button>`
    : `${v.nota ? `<div class="nota-defeito">${esc(v.nota)}</div>` : ''}${v.choices.map((c, i) => ({ c, i })).filter(({ c }) => !c.disabled).map(({ c, i }) => {
      const preview = c.check ? combatCheckPreview(s, c.check, EVENT[eventId]) : null;
      const checkedStats = c.check ? (Array.isArray(c.check.stat) ? c.check.stat : [c.check.stat]) : [];
      const testBadge = preview
        ? `<span class="choice-test-stat"><i aria-hidden="true">${preview.stat === 'fis' ? '⚔' : preview.stat === 'esp' ? '◈' : preview.stat === 'comp' ? '⌘' : preview.stat === 'sor' ? '✦' : preview.stat === 'car' ? '❖' : '☯'}</i><b>${checkedStats.map((key) => key.toUpperCase()).join(' · ')}</b><small>${checkedStats.map((key) => STAT_NAMES[key]).join(' / ')}</small></span>`
        : '<span class="choice-test-stat neutral"><i aria-hidden="true">◇</i><small>Escolha</small></span>';
      return `<div class="choice" data-act="choose" data-i="${i}" role="button" tabindex="0" aria-label="${esc(`${preview ? `Teste de ${checkedStats.map((key) => STAT_NAMES[key]).join(' e ')} contra CD ${preview.dc}: ` : ''}${c.text}`)}">
        ${testBadge}<span class="choice-copy">${c.selo ? `<span class="selo">${esc(c.selo)}</span> ` : ''}${esc(c.text)}</span>
        <span class="row">${c.note ? `<span class="note">${esc(c.note)}</span>` : ''}${preview ? '<span class="dice-icon">D20</span>' : c.chance !== undefined ? `<span class="chance ${c.chance >= 0.7 ? 'hi' : c.chance >= 0.45 ? 'mid' : 'lo'}">${pct(c.chance)}</span>` : ''}</span>
      </div>`;
    }).join('')}${combatItems}`;
  return `
    <div class="adventure-layout">
      ${adventureArt(s, eventId || 'x', title, eventType)}
      <section class="story-panel" id="story-panel" data-act="${v.kind === 'event' ? 'skip' : ''}">
        ${chk ? `<span class="badge ${chk.success ? 'ok' : 'bad'}">${chk.success ? '✔ Sucesso' : '✘ Falha'} · ${pct(chk.chance)}</span>` : ''}
        ${intro}
        ${npcFor(s, eventId)}
      <p class="story-text" id="typed"></p>
        ${v.kind === 'event' ? '<div class="hint" id="hint">toque para pular</div>' : ''}
        ${eventType === 'shop' && !shopOpen ? '<button class="btn ghost" data-act="shop-open">Abrir loja do mercador</button>' : ''}
      </section>
      <section class="choice-panel"><div class="choices show" id="choices">${choicesHtml}</div></section>
      ${tab === 'inventario' ? inventoryModalHtml(s) : ''}
      ${eventType === 'shop' && shopOpen ? shopModalHtml(s) : ''}
    </div>`;
}

function startTyping(s: State) {
  const el = document.getElementById('typed');
  const choices = document.getElementById('choices');
  if (!el || !choices) return;
  const v = view(s);
  const text = v.text;
  const reveal = () => { choices.classList.add('show'); document.getElementById('hint')?.remove(); };
  typewrite(el, text, reveal);
}

/** Alcunha ganha pela conduta (virtude dominante a partir de 10 pontos). */
function alcunhaHtml(s: State): string {
  const v = virtudeDominante(s);
  return v ? ` <span class="alcunha">· ${esc(ALCUNHA[v as keyof typeof ALCUNHA] ?? '')}</span>` : '';
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
  return `<div class="card"><div class="kv"><div class="k">Título</div><div class="v">${esc(r.titulo ?? 'Mortal')}</div></div>
    ${powers ? `<ul class="small" style="margin:6px 0 0 18px">${powers}</ul>` : ''}
    ${next?.poder ? `<div class="muted small" style="margin-top:4px">Próximo reino (${esc(next.name)}): ${esc(next.poder)}</div>` : ''}</div>`;
}

function statusHtml(s: State): string {
  const path = PATH[s.path];
  const L = ladderOf(s);
  const stats = STAT_KEYS.map((k) => {
    const v = eff(s, k);
    const base = s.stats[k];
    return `<div class="stat"><span>${STAT_NAMES[k]}</span><div class="bar"><i style="width:${Math.min(100, v)}%"></i></div><span class="n">${v}${v !== base ? `<span class="muted small"> (${base})</span>` : ''}</span></div>`;
  }).join('');
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
    ${moralAlignmentHtml(s)}
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
    ${relationsHtml(s)}`;
}

function sectRankLabel(rank: NonNullable<ReturnType<typeof sectRankOf>>): string {
  return rank === 'anciao' ? 'Ancião' : rank === 'interno' ? 'Discípulo Interno' : 'Discípulo Externo';
}

function moralAlignmentHtml(s: State): string {
  const morality = s.morality ?? { good: 0, evil: 0, order: 0, chaos: 0 };
  const axes: [keyof typeof morality, string, string][] = [
    ['good', 'Bom', '✦'], ['evil', 'Mau', '☠'], ['order', 'Ordem', '▤'], ['chaos', 'Caos', '〰'],
  ];
  return `<div class="card moral-card"><div class="muted small">ALINHAMENTO MORAL</div><div class="moral-grid">${axes.map(([axis, label, icon]) =>
    `<div class="moral-axis ${axis}"><span><i aria-hidden="true">${icon}</i>${label}</span><div class="bar"><i style="width:${morality[axis]}%"></i></div><b>${morality[axis]}</b></div>`,
  ).join('')}</div><p class="muted small">Suas escolhas moldam a reputação e podem revelar caminhos secretos.</p></div>`;
}

function questsHtml(s: State): string {
  const active = s.activeQuest ? QUESTS.find((quest) => quest.id === s.activeQuest?.id) : undefined;
  const objective = active?.objective;
  const progress = s.activeQuest?.progress ?? 0;
  const activeCard = active && objective
    ? `<div class="card quest-card"><div class="muted small">CONTRATO ATIVO</div><h3>${esc(active.title)}</h3><p>${esc(active.description)}</p><div class="quest-progress"><div class="bar"><i style="width:${Math.min(100, (progress / objective.count) * 100)}%"></i></div><span>${progress}/${objective.count}</span></div><div class="muted small">Recompensa: ${active.reward.pedras} pedras espirituais · ${active.reward.reputation} reputação</div><button class="btn ghost" data-act="quest-abandon">Abandonar contrato</button></div>`
    : `<div class="card muted">Nenhum contrato ativo.</div>`;
  const safe = s.place === 'cidade' || s.place === 'seita';
  const board = !safe ? '<div class="card muted small">O quadro de missões fica disponível na cidade ou na seita.</div>'
    : active ? '' : `<div class="card"><div class="muted small">QUADRO DE MISSÕES · ${PLACE_NAMES[s.place] ?? s.place}</div>${QUESTS.map((quest) => `<div class="quest-offer"><div><b>${esc(quest.title)}</b><div class="muted small">${esc(quest.description)}</div><div class="muted small">Recompensa: ${quest.reward.pedras} pedras · ${quest.reward.reputation} reputação</div></div><button class="btn" data-act="quest-accept" data-id="${esc(quest.id)}">Aceitar</button></div>`).join('')}</div>`;
  return `<div class="card kv"><div class="k">Reputação</div><div class="v">${s.reputation ?? 0}</div><div class="k">Rank da Seita</div><div class="v">${sectRankOf(s) ? sectRankLabel(sectRankOf(s)!) : 'Sem rank'}</div>${s.flags.includes('secta_vip') ? '<div class="k">Acesso VIP</div><div class="v">Pavilhão dos Anciãos</div>' : ''}</div>${activeCard}${board}`;
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

function inventoryModalHtml(s: State): string {
  const counts = new Map<string, number>();
  for (const id of s.items) counts.set(id, (counts.get(id) ?? 0) + 1);
  const slots = EQUIPMENT_SLOTS.map(({ id: slot, label }) => {
    const itemId = s.equipment?.[slot];
    const item = itemId ? ITEM[itemId] : undefined;
    return `<button class="inventory-slot ${item ? `rarity-${item.rarity}` : ''}" data-act="${item ? 'item-detail' : 'noop'}" data-id="${item?.id ?? ''}" ${item ? '' : 'disabled'}>
      <span class="slot-label">${esc(label)}</span><b>${item ? esc(item.name) : 'Vazio'}</b>
      ${item ? `<span class="item-stats">${Object.entries(item.bonuses ?? {}).map(([k, v]) => `+${v} ${STAT_NAMES[k as keyof typeof STAT_NAMES]}`).join(' · ') || 'Sem bônus numéricos'}</span>` : ''}
    </button>`;
  }).join('');
  const rows = [...counts.entries()].map(([id, count]) => {
    const item = ITEM[id];
    if (!item) return '';
    const usable = !!item.use;
    const equipped = Object.values(s.equipment ?? {}).includes(id);
    return `<div class="inventory-item-row">
      <button class="inventory-item rarity-${item.rarity}" data-act="item-detail" data-id="${item.id}">
        <span class="item-icon">${itemIcon(item, 40)}</span><span class="item-copy"><b>${esc(item.name)}${count > 1 ? ` ×${count}` : ''}</b><small>${RARITY_LABEL[item.rarity]}${equipped ? ' · Equipado' : ''}</small></span>
      </button>${usable ? `<button class="btn inventory-use" data-act="use" data-id="${item.id}">Usar</button>` : ''}
    </div>`;
  }).join('') || '<div class="muted small inventory-empty">Sua mochila está vazia.</div>';
  const selected = selectedInventoryItem ? ITEM[selectedInventoryItem] : undefined;
  const details = selected ? `<section class="item-detail rarity-${selected.rarity}">
    <div class="row between"><span class="rarity-label">${RARITY_LABEL[selected.rarity]}</span><button class="btn ghost item-detail-close" data-act="item-detail-close" aria-label="Fechar detalhes">×</button></div>
    <h3>${esc(selected.name)}</h3><p>${esc(selected.desc)}</p>
    ${selected.bonuses ? `<div class="item-detail-stats"><b>Bônus de equipamento</b>${Object.entries(selected.bonuses).map(([k, v]) => `<span>+${v} ${STAT_NAMES[k as keyof typeof STAT_NAMES]}</span>`).join('')}</div>` : ''}
    ${selected.passive ? `<div class="item-detail-stats"><b>Bônus passivos</b>${Object.entries(selected.passive).map(([k, v]) => `<span>+${v} ${STAT_NAMES[k as keyof typeof STAT_NAMES]}</span>`).join('')}</div>` : ''}
    ${selected.equipmentSlot ? `<div class="muted small">Slot: ${esc(EQUIPMENT_SLOTS.find((slot) => slot.id === selected.equipmentSlot)?.label ?? selected.equipmentSlot)}</div>` : ''}
    ${selected.equipmentSlot && !Object.values(s.equipment ?? {}).includes(selected.id) ? `<button class="btn" data-act="gear-equip" data-id="${selected.id}">Equipar</button>` : ''}
  </section>` : '';
  return `<div class="inventory-overlay" role="dialog" aria-modal="true" aria-label="Inventário">
    <div class="inventory-backdrop" data-act="inventory-close"></div>
    <section class="inventory-modal">
      <header class="inventory-header"><div><span class="muted small">MOCHILA · ${s.items.length} ITENS</span><h2>Inventário</h2></div><button class="btn ghost" data-act="inventory-close" aria-label="Fechar inventário">×</button></header>
      <div class="inventory-equipped"><div class="muted small">EQUIPADOS</div><div class="inventory-slots">${slots}</div></div>
      <div class="inventory-list"><div class="muted small">MOCHILA</div>${rows}${details}</div>
    </section>
  </div>`;
}

const EQUIPMENT_SLOTS: { id: EquipmentSlot; label: string }[] = [
  { id: 'rightWeapon', label: 'Arma direita' },
  { id: 'leftWeapon', label: 'Arma esquerda' },
  { id: 'armor', label: 'Armadura' },
  { id: 'accessory', label: 'Acessório' },
];

function equipmentHtml(s: State): string {
  const slots = EQUIPMENT_SLOTS.map(({ id, label }) => {
    const itemId = s.equipment?.[id];
    const item = itemId ? ITEM[itemId] : undefined;
    return `<div class="equipment-slot"><div><small>${label}</small><b>${item ? esc(item.name) : 'Vazio'}</b>${item?.bonuses ? `<span class="muted small">${Object.entries(item.bonuses).map(([key, value]) => `+${value} ${STAT_NAMES[key as keyof typeof STAT_NAMES]}`).join(' · ')}</span>` : ''}</div>${item ? `<button class="btn ghost" data-act="gear-remove" data-id="${id}">Remover</button>` : ''}</div>`;
  }).join('');
  const ownedGear = [...new Set(s.items)].map((id) => ITEM[id]).filter((item) => !!item?.equipmentSlot);
  const gearOptions = ownedGear.map((item) => `<div class="equipment-slot"><div><b>${esc(item.name)}</b><span class="muted small">${item.bonuses ? Object.entries(item.bonuses).map(([key, value]) => `+${value} ${STAT_NAMES[key as keyof typeof STAT_NAMES]}`).join(' · ') : ''}</span></div><button class="btn" data-act="gear-equip" data-id="${item.id}" ${s.equipment?.[item.equipmentSlot!] === item.id ? 'disabled' : ''}>Equipar</button></div>`).join('');
  const party = (s.companions ?? []).map((id) => {
    const companion = COMPANIONS.find((entry) => entry.id === id);
    return companion ? `<div class="equipment-slot"><div><b>${esc(companion.name)}</b><span class="muted small">${esc(companion.description)} · ${Object.entries(companion.bonus).map(([key, value]) => `+${value} ${STAT_NAMES[key as keyof typeof STAT_NAMES]}`).join(' · ')}</span></div><button class="btn ghost" data-act="companion-dismiss" data-id="${id}">Dispensar</button></div>` : '';
  }).join('');
  const offers = COMPANIONS.filter((companion) => !(s.companions ?? []).includes(companion.id)).map((companion) => `<div class="equipment-slot"><div><b>${esc(companion.name)}</b><span class="muted small">${esc(companion.description)} · ${Object.entries(companion.bonus).map(([key, value]) => `+${value} ${STAT_NAMES[key as keyof typeof STAT_NAMES]}`).join(' · ')}</span></div><button class="btn" data-act="companion-recruit" data-id="${companion.id}" ${s.pedras < companion.price || (s.companions?.length ?? 0) >= 2 ? 'disabled' : ''}>Recrutar · ${companion.price}</button></div>`).join('');
  const stats = STAT_KEYS.map((key) => `<div class="stat"><span>${STAT_NAMES[key]}</span><div class="bar"><i style="width:${Math.min(100, eff(s, key))}%"></i></div><span class="n">${eff(s, key)}</span></div>`).join('');
  return `<div class="card"><div class="muted small">EQUIPAMENTO ATIVO</div>${slots}</div><div class="card"><div class="muted small">EQUIPAR ITEM DA MOCHILA</div>${gearOptions || '<span class="muted small">Nenhum equipamento disponível.</span>'}</div><div class="card"><div class="muted small">COMPANHEIROS · ${(s.companions ?? []).length}/2</div>${party || '<span class="muted small">Nenhum companheiro ativo.</span>'}${offers}</div>${moralAlignmentHtml(s)}<div class="card">${stats}</div>`;
}

const GUILDS: { id: GuildFaction; name: string; desc: string }[] = [
  { id: 'sword_sect', name: 'Seita da Espada', desc: 'Disciplina e tradição marcial; reputação alta melhora testes de combate.' },
  { id: 'demon_cult', name: 'Culto Demoníaco', desc: 'Poder sem hesitação; influência abre caminhos sombrios.' },
  { id: 'merchant_guild', name: 'Guilda dos Mercadores', desc: 'Rotas, contatos e vantagens nas trocas.' },
];

function factionsHtml(s: State): string {
  const cards = GUILDS.map((guild) => {
    const reputation = factionReputation(s, guild.id);
    const hostile = s.guild === guild.id && reputation <= -40;
    const active = s.guild === guild.id;
    return `<div class="faction-card"><div class="row between"><b>${esc(guild.name)}</b><span class="muted small">${active ? 'Afiliado' : 'Independente'}</span></div><p class="muted small">${esc(guild.desc)}</p><div class="rep-line"><span>Reputação</span><b>${reputation}</b></div><div class="bar reputation"><i style="width:${Math.min(100, Math.max(0, (reputation + 100) / 2))}%"></i></div>${hostile ? '<p class="faction-hostile">Hostilidade: patrulhas podem emboscar você.</p>' : reputation >= 30 ? '<p class="faction-friendly">Favor: +2 nos testes enquanto afiliado.</p>' : ''}<button class="btn ${active ? 'ghost' : ''}" data-act="guild-join" data-id="${guild.id}" ${active ? 'disabled' : ''}>${active ? 'Facção atual' : 'Afilia-se'}</button></div>`;
  }).join('');
  return `<div class="card"><div class="muted small">FACÇÕES E INFLUÊNCIA</div>${cards}</div>${questsHtml(s)}`;
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
  const finalGear = EQUIPMENT_SLOTS.map(({ id, label }) => {
    const item = ITEM[sm.equipment?.[id] ?? s.equipment?.[id] ?? ''];
    return `<span>${esc(label)}</span><b class="${item ? `rarity-text-${item.rarity}` : 'muted'}">${item ? esc(item.name) : 'Nenhum'}</b>`;
  }).join('');
  app.innerHTML = `
    <div class="screen end">
      <div class="end-card">${endingCard(e.id, e.name)}<div class="end-pt">${portraitSvg(lookFromState(s), 64)}</div></div>
      <div class="muted small" style="text-align:center">${esc(s.name)} · ${esc(PATH[s.path].name)}</div>
      <h1>${esc(e.name)}</h1>
      <p class="epitaph">${esc(s.endingText ?? '')}</p>
      <div class="card sum">
        <span>Rank de Cultivo</span><b>${esc(sm.tierName)}</b>
        <span>Idade alcançada</span><b>${Math.floor(s.age)} anos</b>
        <span>Causa do fim</span><b>${esc(e.name)}</b>
        <span>Herança ganha nesta vida</span><b class="legacy-earned">+${sm.legacy}</b>
        <span>Fama</span><b>${s.fama}</b>
        <span>Karma</span><b>${s.karma > 0 ? '+' : ''}${s.karma}</b>
      </div>
      <div class="card sum final-equipment"><div class="muted small equipment-summary-title">EQUIPAMENTOS FINAIS</div>${finalGear}</div>
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
    const cx = m.codex ?? { items: [] };
    const pill = (name: string, ok: boolean, grade?: number, icon = '') => `<span class="pill cx ${ok && grade ? 'g' + Math.min(4, grade) : ''}" style="${ok ? '' : 'opacity:.4'}">${icon ? `<span class="cxi">${icon}</span>` : ''}${ok ? esc(name) : '???'}</span>`;
    body = `<div class="card"><div class="muted small">FINAIS · ${m.endingsSeen.length}/${ENDINGS.length}</div>${ENDINGS.map((e) => pill(e.name, m.endingsSeen.includes(e.id))).join('')}</div>
      <div class="card"><div class="muted small">ITENS · ${cx.items.length}/${ITEMS.length}</div>${ITEMS.map((i) => pill(i.name, cx.items.includes(i.id), i.grade, cx.items.includes(i.id) ? itemIcon(i, 26) : '')).join('')}</div>
      <div class="card muted small">O Códice guarda tudo o que você já encontrou em qualquer vida. Os nomes escondidos (???) esperam ser descobertos.</div>`;
  } else if (metaTab === 'historico') {
    body = m.history.length
      ? `<div class="card list">${m.history.map((h) => `<div><b>${esc(h.name)}</b> <span class="muted small">${esc(h.path)}</span><div class="small">${esc(h.tierName)} · ${h.age} anos · ${esc(h.ending)}</div></div>`).join('')}</div>`
      : '<div class="card muted">Nenhuma vida encerrada ainda.</div>';
  } else {
    body = `<div class="card"><div class="muted small">ESTILO DE ARTE</div>
      <div class="row estilos">${ESTILOS.map((e) => { const a = amostraDe(e.id, { seed: 'Lin Feng', stage: 2, path: 'espada', tier: 3, corr: 0, role: 'jogador', items: [] }, ITEMS.find((i) => i.kind === 'artefato' && i.name.toLowerCase().includes('espada')) ?? ITEMS[0]); return `<button class="estilo ${save.settings.estilo === e.id ? 'sel' : ''}" data-act="estilo" data-id="${e.id}"><span class="amostra">${a.retrato}${a.item}</span><span class="cenario">${a.cenario}</span><b>${e.nome}</b></button>`; }).join('')}</div>
      <div class="muted small" style="margin-top:6px">${ESTILOS.find((e) => e.id === save.settings.estilo)?.desc ?? ''}</div></div>
      <div class="card"><div class="muted small">TEMA</div>
      <div class="row" style="flex-wrap:wrap;margin-top:8px">${THEME_NAMES.map(([id, n]) => `<button class="btn ${save.settings.theme === id ? 'primary' : ''}" style="width:auto;flex:1;padding:10px 6px" data-act="theme" data-id="${id}">${n}</button>`).join('')}</div>
      <div class="muted small" style="margin-top:12px">TAMANHO DO TEXTO</div>
      <div class="row" style="flex-wrap:wrap;margin-top:8px">${FONT_NAMES.map((n, i) => `<button class="btn ${save.settings.font === i ? 'primary' : ''}" style="width:auto;flex:1;padding:10px 6px" data-act="font" data-i="${i}">${n}</button>`).join('')}</div></div>
      <div class="card"><div class="muted small">VELOCIDADE DO TEXTO</div>
      <div class="row" style="flex-wrap:wrap;margin-top:8px">${SPEED_NAMES.map((n, i) => `<button class="btn ${save.settings.speed === i ? 'primary' : ''}" style="width:auto;flex:1;padding:10px 6px" data-act="speed" data-i="${i}">${n}</button>`).join('')}</div></div>
      <div class="card"><div class="muted small">SISTEMA DE TESTES</div><p class="small">Toda escolha com teste é resolvida com um D20, atributos, equipamento, cultivo e companheiros. O resultado aparece antes da consequência narrativa.</p></div>
      <button class="btn" data-act="export">Copiar save (backup)</button>
      <button class="btn" data-act="import">Importar save</button>
      <button class="btn ghost" data-act="wipe" style="color:var(--red)">Apagar todo o progresso</button>
      <div class="card muted small"><b>Sobre</b><br>Dao das Mil Vidas · versão ${__APP_VERSION__} (${__BUILD_DATE__})<br>${EVENTS.length} eventos · ${ITEMS.length} itens · ${ENDINGS.length} finais · ${PATHS.length} caminhos de cultivo<br>Convenções de gênero pesquisadas em novels xianxia/wuxia/xuanhuan, manhwas murim e mitologia chinesa; personagens, seitas e textos são originais. Fontes em docs/pesquisa.md e docs/lotes.md.<br><b>Dao das Mil Vidas © 2026 Andre Barbosa Vieira. Todos os direitos reservados.</b></div>`;
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
  tab = 'aventura';
  screen = 'game';
  persist();
  render();
}

app.addEventListener('click', (ev) => {
  const target = (ev.target as HTMLElement).closest<HTMLElement>('[data-act]');
  if (!target) return;
  const act = target.dataset.act!;
  if (diceModal && act !== 'roll-close') return;
  if (act === 'start-audio') {
    if (audioStarting) return;
    audioStarting = true;
    audioGateError = '';
    target.setAttribute('aria-disabled', 'true');
    target.textContent = 'Preparando o Cultivo…';
    void startAudioExperience().catch(() => undefined).then(() => {
      audioStarted = true;
      audioStarting = false;
      render();
    }).catch((error: unknown) => {
      audioStarting = false;
      audioGateError = error instanceof Error ? error.message : 'Não foi possível iniciar o áudio.';
      const message = app.querySelector<HTMLElement>('.audio-error');
      if (message) message.textContent = audioGateError;
      target.setAttribute('aria-disabled', 'false');
      target.textContent = 'Toque para Iniciar o Cultivo';
    });
    return;
  }
  playSfx('tap');
  const s = save.run;
  switch (act) {
    case 'roll-close':
      window.clearInterval(diceTimer);
      diceModal = null;
      render();
      break;
    case 'skip': skipTyper(); break;
    case 'home': screen = 'home'; render(); break;
    case 'gallery-open': galleryOpen = true; galleryTab = 'endings'; render(); break;
    case 'gallery-close': galleryOpen = false; render(); break;
    case 'gallery-tab': galleryTab = target.dataset.id as typeof galleryTab; render(); break;
    case 'new': newCreation(); screen = 'create'; render(); break;
    case 'continue':
      if (save.run) tab = 'aventura';
      screen = save.run?.ending ? 'end' : 'game';
      persist();
      render();
      break;
    case 'meta': screen = 'meta'; render(); break;
    case 'estilomenu': screen = 'meta'; metaTab = 'opcoes'; render(); break;
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
    case 'tab':
      tab = target.dataset.id as typeof tab;
      selectedInventoryItem = null;
      render();
      break;
    case 'shop-open': shopOpen = true; render(); break;
    case 'shop-close': shopOpen = false; render(); break;
    case 'shop-buy':
    case 'shop-sell': {
      if (!s) break;
      const message = tradeItem(s, act === 'shop-buy' ? 'buy' : 'sell', target.dataset.id!);
      if (message) toast(message, act === 'shop-buy' && ITEM[target.dataset.id!]?.rarity !== 'comum' ? 'rare-item' : 'quest');
      persist();
      render();
      break;
    }
    case 'inventory-close':
      tab = 'aventura';
      selectedInventoryItem = null;
      render();
      break;
    case 'item-detail':
      selectedInventoryItem = target.dataset.id ?? null;
      render();
      break;
    case 'item-detail-close':
      selectedInventoryItem = null;
      render();
      break;
    case 'gear-equip':
      if (!s) break;
      if (equipItem(s, target.dataset.id!)) { persist(); render(); }
      break;
    case 'gear-remove':
      if (!s) break;
      if (unequipItem(s, target.dataset.id as EquipmentSlot)) { persist(); render(); }
      break;
    case 'companion-recruit':
      if (!s) break;
      if (recruitCompanion(s, target.dataset.id!)) { persist(); render(); }
      break;
    case 'companion-dismiss':
      if (!s) break;
      if (dismissCompanion(s, target.dataset.id!)) { persist(); render(); }
      break;
    case 'guild-join':
      if (!s) break;
      if (joinGuild(s, target.dataset.id as GuildFaction)) { persist(); render(); }
      break;
    case 'quest-accept':
      if (!s) break;
      if (acceptQuest(s, target.dataset.id!)) flushEngineNotifications(s);
      persist();
      render();
      break;
    case 'quest-abandon':
      if (!s) break;
      if (abandonQuest(s)) flushEngineNotifications(s);
      persist();
      render();
      break;
    case 'choose':
      if (!s) break;
      {
        const previousWounds = s.wounds;
      withRng(s, (r) => choose(s, Number(target.dataset.i), r));
      flushEngineNotifications(s);
      persist();
        if (s.result?.roll) {
          showDiceModal(s);
          if (s.wounds > previousWounds) playSfx('impact');
        } else render();
      }
      break;
    case 'next':
      if (!s) break;
      withRng(s, (r) => proceed(s, r));
      flushEngineNotifications(s);
      persist();
      render();
      window.scrollTo(0, 0);
      document.getElementById('game')?.scrollTo(0, 0);
      break;
    case 'toEnd': screen = 'end'; render(); break;
    case 'use':
      if (!s) break;
      { const msg = withRng(s, (r) => useItem(s, target.dataset.id!, r)); if (msg) toast(msg); }
      flushEngineNotifications(s);
      persist();
      if (s.ending) { s.result = { text: 'Seu corpo não resistiu.' }; tab = 'aventura'; }
      render();
      break;
    case 'use-combat-item':
      if (!s) break;
      if (withRng(s, (r) => useItemInEncounter(s, target.dataset.id!, r))) {
        flushEngineNotifications(s);
        persist();
        render();
      }
      break;
    case 'buy': {
      const u = UPGRADES.find((x) => x.id === target.dataset.id)!;
      if (buyUpgrade(save.meta, u.id, u.cost, u.max)) { persist(); render(); }
      break;
    }
    case 'estilo': if (estiloValido(target.dataset.id)) { save.settings.estilo = target.dataset.id; applySettings(); persist(); render(); } break;
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

app.addEventListener('keydown', (ev) => {
  if (ev.key !== 'Enter' && ev.key !== ' ') return;
  const target = (ev.target as HTMLElement).closest<HTMLElement>('[role="button"][data-act]');
  if (!target) return;
  ev.preventDefault();
  target.click();
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

/** Depuração: ?arte=<pixel|manhwa|tinta>&sec=<itens|trilhas|reinos|cenarios|finais|retratos|lutadores> */
{
  const q = new URLSearchParams(location.search);
  const e = q.get('arte');
  if (e && estiloValido(e)) import('./galeria').then((m) => m.mostrarGaleria(app, e, q.get('sec') ?? ''));
}
