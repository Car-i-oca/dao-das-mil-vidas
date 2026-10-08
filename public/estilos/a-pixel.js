/* Estilo A — Pixel art 16-bit (amostras geradas por código: sombreamento por faixas, contorno automático, animação em quadros). */
(function () {
  const P = {
    '.': null, k: '#1a1423', K: '#2d2440', w: '#fff7e6', W: '#e8dcc0', g: '#9aa3ad', G: '#6a7480', s: '#c9d3dc',
    r: '#d94a3d', R: '#8f2a2f', o: '#f08a3c', O: '#b5532a', y: '#ffd35a', Y: '#c9962e', l: '#7fd37a', L: '#3d8f5a', D: '#1f5a3d',
    b: '#5aa0e8', B: '#2d5aa0', v: '#a07be0', V: '#5d3f9a', p: '#f2a0b8', t: '#8a5a3a', T: '#5a3a24',
    n: '#f0cfa8', N: '#d9a878', m: '#b87a52', z: '#8f5a3a',
  };

  /** Superfície de pixels com camadas simples. */
  function Surf(w, h) {
    const px = new Array(w * h).fill(null);
    return {
      w, h, px,
      set(x, y, c) { x = Math.round(x); y = Math.round(y); if (x >= 0 && y >= 0 && x < w && y < h) px[y * w + x] = c; },
      get(x, y) { return x >= 0 && y >= 0 && x < w && y < h ? px[y * w + x] : null; },
      rect(x, y, rw, rh, c) { for (let j = 0; j < rh; j++) for (let i = 0; i < rw; i++) this.set(x + i, y + j, c); },
      line(x0, y0, x1, y1, c) { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; for (let i = 0; i <= n; i++) this.set(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n, c); },
      /** Elipse sombreada: base, sombra embaixo/direita (com pontilhado), luz em cima/esquerda. cols = [escuro, base, claro, brilho] */
      blob(cx, cy, rx, ry, cols, light = [-0.5, -0.6]) {
        for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
          const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
          if (dx * dx + dy * dy > 1) continue;
          const d = dx * light[0] + dy * light[1];
          let c = cols[1];
          if (d > 0.55) c = cols[0];
          else if (d > 0.3) c = ((x + y) & 1) ? cols[0] : cols[1];
          else if (d < -0.62 && cols[3]) c = cols[3];
          else if (d < -0.38) c = cols[2];
          else if (d < -0.2 && ((x + y) & 1)) c = cols[2];
          this.set(x, y, c);
        }
      },
      /** Contorno escuro ao redor de tudo que não é transparente. */
      outline(c = P.k) {
        const out = px.slice();
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          if (px[y * w + x]) continue;
          if (this.get(x - 1, y) || this.get(x + 1, y) || this.get(x, y - 1) || this.get(x, y + 1)) out[y * w + x] = c;
        }
        for (let i = 0; i < px.length; i++) px[i] = out[i];
        return this;
      },
      draw(scale, bg) {
        const cv = document.createElement('canvas');
        cv.width = w * scale; cv.height = h * scale;
        cv.className = 'pix';
        const g = cv.getContext('2d');
        if (bg) { g.fillStyle = bg; g.fillRect(0, 0, cv.width, cv.height); }
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const c = px[y * w + x]; if (c) { g.fillStyle = c; g.fillRect(x * scale, y * scale, scale, scale); } }
        return cv;
      },
      blit(src, ox, oy) { for (let y = 0; y < src.h; y++) for (let x = 0; x < src.w; x++) { const c = src.px[y * src.w + x]; if (c) this.set(ox + x, oy + y, c); } },
    };
  }

  /* ---------------- Itens (24x24) ---------------- */
  const items = {
    pilula() {
      const s = Surf(24, 24);
      s.blob(12, 13, 7, 7, [P.V, P.v, '#c9b0f5', P.w]);
      s.set(9, 9, P.w); s.set(10, 9, P.w); s.set(9, 10, P.w);
      s.line(7, 20, 17, 20, P.K); s.line(8, 21, 16, 21, P.K);
      for (const [x, y] of [[3, 5], [20, 7], [4, 17], [19, 18]]) { s.set(x, y, P.y); s.set(x - 1, y, P.Y); s.set(x + 1, y, P.Y); s.set(x, y - 1, P.Y); s.set(x, y + 1, P.Y); }
      return s.outline();
    },
    espada() {
      const s = Surf(24, 24);
      for (let i = 0; i < 15; i++) { s.set(19 - i, 3 + i, P.s); s.set(18 - i, 3 + i, P.g); s.set(20 - i, 3 + i, P.w); s.set(17 - i, 3 + i, P.G); }
      s.set(21, 2, P.w); s.set(20, 2, P.s);
      s.line(5, 14, 11, 20, P.Y); s.line(5, 15, 10, 20, P.y); s.line(4, 16, 9, 21, P.Y);
      s.line(3, 21, 6, 18, P.T); s.line(2, 21, 5, 18, P.t); s.rect(2, 21, 2, 2, P.R);
      return s.outline();
    },
    manual() {
      const s = Surf(24, 24);
      s.rect(5, 3, 14, 18, P.r); s.rect(5, 3, 14, 2, '#ff7a6a'); s.rect(5, 19, 14, 2, P.R); s.rect(5, 3, 2, 18, P.R);
      s.rect(8, 7, 9, 7, P.W); s.rect(8, 7, 9, 1, P.w); s.rect(8, 13, 9, 1, P.N);
      s.rect(10, 9, 5, 1, P.K); s.rect(10, 11, 3, 1, P.K);
      s.rect(8, 16, 9, 1, P.y); s.set(12, 5, P.y); s.set(12, 18, P.y);
      s.rect(19, 5, 2, 12, P.W); s.rect(19, 5, 1, 12, P.w);
      return s.outline();
    },
    erva() {
      const s = Surf(24, 24);
      s.line(12, 22, 12, 9, P.L); s.line(13, 22, 13, 9, P.D);
      s.blob(7, 11, 4, 2, [P.D, P.L, P.l, '#d9ffd0']); s.blob(17, 8, 4, 2, [P.D, P.L, P.l, '#d9ffd0']);
      s.blob(8, 16, 3.5, 2, [P.D, P.L, P.l]); s.blob(17, 14, 3.5, 2, [P.D, P.L, P.l]);
      s.blob(12, 6, 2.5, 3, [P.D, P.L, P.l]);
      s.line(10, 22, 7, 21, P.t); s.line(14, 22, 17, 21, P.t); s.line(12, 22, 12, 23, P.T);
      for (const [x, y] of [[4, 5], [20, 4]]) { s.set(x, y, P.y); s.set(x + 1, y, P.Y); s.set(x, y + 1, P.Y); }
      return s.outline();
    },
    nucleo() {
      const s = Surf(24, 24);
      s.blob(12, 12, 8, 8, [P.O, P.o, P.y, P.w]);
      s.rect(11, 8, 3, 8, P.k); s.rect(12, 9, 1, 6, P.y); s.set(12, 11, P.w);
      for (let i = 0; i < 6; i++) { s.set(3 + i * 3, 2 + ((i * 5) % 3), P.r); s.set(4 + i * 3, 21 - ((i * 7) % 3), P.o); }
      return s.outline();
    },
    talisma() {
      const s = Surf(24, 24);
      s.rect(8, 2, 8, 20, P.y); s.rect(8, 2, 8, 1, '#ffeea0'); s.rect(8, 21, 8, 1, P.Y); s.rect(8, 2, 1, 20, '#ffeea0'); s.rect(15, 2, 1, 20, P.Y);
      s.rect(10, 5, 4, 1, P.r); s.rect(11, 7, 2, 4, P.r); s.rect(10, 9, 1, 3, P.r); s.rect(13, 9, 1, 3, P.r); s.rect(10, 13, 4, 1, P.r); s.rect(11, 15, 2, 2, P.R);
      s.rect(11, 18, 2, 2, P.r);
      return s.outline();
    },
  };

  /* ---------------- Retratos (40x40) ---------------- */
  function portrait(old) {
    const s = Surf(40, 40);
    const skin = [P.m, P.N, P.n, '#ffe5c8'];
    const hairCols = old ? [P.G, P.g, P.s, P.w] : [P.K, P.k, '#3a2f55', '#5a4a80'];
    const robe = old ? [P.D, P.L, P.l] : [P.B, P.b, '#9ad0ff'];
    // ombros e roupa
    s.blob(20, 42, 17, 9, [robe[0], robe[1], robe[2]]);
    s.rect(15, 31, 10, 6, skin[1]);
    s.blob(20, 20, 9, 11, skin);
    // cabelo
    s.blob(20, 12, 10, 8, hairCols);
    if (!old) { s.blob(30, 24, 3, 8, hairCols); s.blob(10, 24, 3, 8, hairCols); s.rect(11, 14, 18, 2, P.r); }
    else { s.rect(10, 15, 3, 10, hairCols[2]); s.rect(27, 15, 3, 10, hairCols[2]); s.blob(20, 6, 3, 3, hairCols); s.rect(19, 8, 2, 1, P.y); }
    // rosto
    const eye = old ? P.K : P.k;
    s.rect(15, 19, 3, 2, P.w); s.rect(22, 19, 3, 2, P.w); s.rect(16, 19, 2, 2, eye); s.rect(23, 19, 2, 2, eye);
    s.set(16, 19, P.w);
    s.rect(14, 17, 4, 1, hairCols[1]); s.rect(22, 17, 4, 1, hairCols[1]);
    s.rect(19, 23, 2, 1, skin[0]);
    s.rect(18, 26, 5, 1, old ? skin[0] : P.R);
    if (old) {
      s.rect(15, 21, 2, 1, skin[0]); s.rect(23, 21, 2, 1, skin[0]); s.rect(16, 15, 8, 1, skin[0]);
      s.blob(20, 30, 5, 6, [P.g, P.s, P.w, P.w]); s.rect(17, 26, 6, 1, P.s);
    } else {
      s.set(15, 24, '#f5a8a0'); s.set(24, 24, '#f5a8a0');
    }
    s.rect(14, 33, 12, 1, robe[2]); s.line(20, 34, 20, 40, robe[0]);
    return s.outline();
  }

  /* ---------------- Cenário (160x90) ---------------- */
  function scene() {
    const s = Surf(160, 90);
    const bands = ['#2a1d4a', '#3d2a66', '#5a3a80', '#8a4a8f', '#c45a8a', '#f08a7a', '#ffc58a', '#ffe5a8'];
    for (let y = 0; y < 62; y++) { const t = (y / 62) * (bands.length - 1); const i = Math.floor(t); const dither = (t - i) > 0.5 && ((y + 3) & 1) ? 1 : 0; for (let x = 0; x < 160; x++) { s.set(x, y, bands[Math.min(bands.length - 1, i + (((x + y) & 1) && (t - i) > 0.35 ? 1 : dither ? 1 : 0))]); } }
    for (let i = 0; i < 46; i++) { const x = (i * 97 + 13) % 160, y = (i * i * 7 + i * 3) % 34; s.set(x, y, i % 4 ? P.w : P.y); }
    s.blob(122, 22, 10, 10, ['#e8b878', '#ffe9b0', '#fff6d8', P.w]);
    // montanhas em camadas
    const layers = [[50, '#6a3f86', '#7d4f9a'], [60, '#45296a', '#5a3a80'], [70, '#2a1a4a', '#3d2a66']];
    layers.forEach(([base, dark, light], li) => {
      for (let x = 0; x < 160; x++) {
        const h = base - Math.round(10 * Math.abs(Math.sin((x + li * 31) / 17)) + 6 * Math.abs(Math.sin((x + li * 13) / 7)));
        for (let y = h; y < 90; y++) s.set(x, y, y < h + 2 ? light : dark);
      }
    });
    // pagode
    const px = 40, py = 52;
    for (let k = 0; k < 3; k++) {
      const w = 22 - k * 5, yy = py + k * -9;
      s.rect(px - w / 2 + 6, yy, w, 2, P.R); s.rect(px - w / 2 + 3, yy + 2, w + 6, 1, P.r); s.rect(px - w / 2 + 8, yy + 3, w - 4, 6, P.O); s.rect(px - w / 2 + 10, yy + 5, 2, 4, P.k);
    }
    s.rect(px + 5, py - 31, 1, 4, P.y);
    // pinheiros e chão
    for (const x of [100, 112, 142]) { for (let k = 0; k < 4; k++) s.rect(x - 4 + k, 62 + k * 4 - 12, 9 - k * 2, 3, P.D); s.rect(x, 74, 2, 5, P.T); }
    for (let x = 0; x < 160; x++) for (let y = 80; y < 90; y++) s.set(x, y, y === 80 ? '#5a3a80' : '#1a1228');
    return s;
  }

  /* ---------------- Duelo (160x90): dois quadros de animação ---------------- */
  function fighter(kind, frame) {
    const s = Surf(30, 40);
    const rob = kind === 'p' ? [P.B, P.b, '#9ad0ff'] : [P.R, P.r, '#ff9a8a'];
    const hair = kind === 'p' ? [P.K, P.k, '#3a2f55'] : [P.K, P.k, '#5a3a24'];
    const lunge = frame ? 3 : 0;
    s.rect(11 + lunge, 30, 4, 9, P.K); s.rect(17 + lunge, 30, 4, 9, P.K); s.rect(10 + lunge, 38, 6, 2, P.k); s.rect(16 + lunge, 38, 6, 2, P.k);
    s.blob(16 + lunge, 24, 9, 10, rob);
    s.rect(7 + lunge, 24, 3, 8, rob[1]); s.rect(22 + lunge, 22, 8, 3, rob[1]);
    s.blob(16 + lunge, 13, 6, 6.5, [P.m, P.N, P.n, '#ffe5c8']);
    s.blob(16 + lunge, 8, 7, 5, hair);
    s.rect(18 + lunge, 13, 2, 2, P.k); s.rect(14 + lunge, 13, 2, 2, P.k);
    if (kind === 'p') { for (let i = 0; i < 14; i++) { s.set(29 - i + (frame ? 0 : -2), 14 + i, P.s); s.set(28 - i + (frame ? 0 : -2), 14 + i, P.w); } s.rect(28 + (frame ? 0 : -2), 25, 2, 2, P.y); }
    else { s.rect(2 + lunge, 18, 2, 12, P.t); s.rect(1 + lunge, 16, 4, 3, P.z); }
    return s.outline();
  }
  function duel(frame) {
    const s = scene();
    s.blit(fighter('p', frame), 30 + (frame ? 14 : 0), 40);
    // inimigo espelhado
    const f = fighter('f', 0); const m = Surf(30, 40); for (let y = 0; y < 40; y++) for (let x = 0; x < 30; x++) m.px[y * 30 + (29 - x)] = f.px[y * 30 + x];
    s.blit(m, 100 - (frame ? 6 : 0), 40);
    if (frame) {
      for (let i = 0; i < 28; i++) { s.set(62 + i, 52 - Math.round(Math.sin(i / 28 * Math.PI) * 10), P.w); s.set(62 + i, 53 - Math.round(Math.sin(i / 28 * Math.PI) * 10), '#9ad0ff'); }
      for (const [dx, dy] of [[0, -7], [5, -3], [7, 3], [0, 6], [-6, 3], [-5, -4]]) { s.line(96, 52, 96 + dx * 1.4, 52 + dy * 1.4, P.y); }
      s.rect(94, 50, 5, 5, P.w);
    }
    // barras de vida
    s.rect(6, 4, 52, 6, P.k); s.rect(7, 5, 50, 4, P.K); s.rect(7, 5, frame ? 34 : 44, 4, P.l);
    s.rect(102, 4, 52, 6, P.k); s.rect(103, 5, 50, 4, P.K); s.rect(103, 5, frame ? 20 : 36, 4, P.r);
    return s;
  }

  window.EstiloA = {
    items: [['Tônico de Recuperação', items.pilula], ['Sabre de Viagem', items.espada], ['Ficha de Jade', items.manual], ['Raiz de Cordilheira', items.erva], ['Broquel de Emergência', items.nucleo], ['Fumaça de Fuga', items.talisma]].map(([n, f]) => ({ nome: n, el: f().draw(5, '#2d2440') })),
    jovem: () => portrait(false).draw(5, '#3d2a66'),
    ancião: () => portrait(true).draw(5, '#1f3d34'),
    cenario: () => scene().draw(2),
    duelo: () => {
      const a = duel(0).draw(2), b = duel(1).draw(2);
      const box = document.createElement('div'); box.className = 'anim'; box.appendChild(a);
      let on = false; setInterval(() => { on = !on; box.replaceChildren(on ? b : a); }, 500);
      return box;
    },
  };
})();
