/* Estilo B — Manhwa/manhua: contorno firme, cel-shading em dois tons, cores fortes, brilhos e linhas de ação (SVG gerado por código). */
(function () {
  const OL = '#1a1030';
  let uid = 0;
  const id = (p) => `${p}${++uid}`;
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const star = (x, y, r, c = '#fff') => `<path d="M${x} ${y - r}L${x + r * 0.28} ${y - r * 0.28} ${x + r} ${y} ${x + r * 0.28} ${y + r * 0.28} ${x} ${y + r} ${x - r * 0.28} ${y + r * 0.28} ${x - r} ${y} ${x - r * 0.28} ${y - r * 0.28}z" fill="${c}"/>`;

  function card(inner, c1, c2) {
    const g = id('bg');
    return svg(120, 120, `<defs><radialGradient id="${g}" cx="50%" cy="42%" r="75%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>
      <rect width="120" height="120" rx="14" fill="url(#${g})"/>
      <g opacity=".35" stroke="#fff" stroke-width="1.2">${Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return `<path d="M${60 + Math.cos(a) * 30} ${60 + Math.sin(a) * 30}L${60 + Math.cos(a) * 80} ${60 + Math.sin(a) * 80}"/>`; }).join('')}</g>
      ${inner}${star(14, 16, 6)}${star(104, 20, 4)}${star(100, 100, 5)}
      <rect x="1.5" y="1.5" width="117" height="117" rx="13" fill="none" stroke="${OL}" stroke-width="3"/>`);
  }

  const items = {
    pilula: () => card(`
      <circle cx="60" cy="62" r="34" fill="#ffe27a" opacity=".35"/><circle cx="60" cy="62" r="42" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>
      <circle cx="60" cy="62" r="24" fill="#8a4dff" stroke="${OL}" stroke-width="4"/>
      <path d="M44 70a18 18 0 0 0 32 4 22 22 0 0 1-32-4z" fill="#4a21b5"/>
      <path d="M44 52a18 18 0 0 1 22-10 14 14 0 0 0-16 14z" fill="#c9a8ff"/>
      <ellipse cx="50" cy="50" rx="5" ry="3" fill="#fff" transform="rotate(-35 50 50)"/>
      <path d="M52 30q-6-8 2-14M62 28q-5-9 3-15M72 32q-4-8 3-13" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>`, '#7a4dff', '#1c0f4a'),
    espada: () => card(`
      <g transform="rotate(38 60 60)">
        <path d="M60 6l10 14v54H50V20z" fill="#d6e8ff" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
        <path d="M60 6l10 14v54H60z" fill="#8fb4e8"/><path d="M60 12v60" stroke="#fff" stroke-width="2.5"/>
        <rect x="38" y="74" width="44" height="9" rx="3" fill="#ffc93c" stroke="${OL}" stroke-width="4"/><rect x="38" y="74" width="44" height="3" fill="#fff0a0"/>
        <rect x="54" y="83" width="12" height="22" rx="3" fill="#d6323f" stroke="${OL}" stroke-width="4"/>
        <circle cx="60" cy="109" r="6" fill="#ffc93c" stroke="${OL}" stroke-width="4"/>
      </g>
      <path d="M12 86q20-4 34 10M20 30q16 4 22 20" fill="none" stroke="#bff3ff" stroke-width="4" stroke-linecap="round" opacity=".9"/>`, '#2d9cff', '#0d2a66'),
    manual: () => card(`
      <path d="M26 30l34-8 34 8v62l-34-8-34 8z" fill="#ff5a4a" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M60 22v62l34 8V30z" fill="#c42d3a"/><path d="M60 22v62" stroke="${OL}" stroke-width="4"/>
      <path d="M26 92l34-8 34 8" fill="none" stroke="#fff4d6" stroke-width="5" stroke-linecap="round"/>
      <circle cx="42" cy="54" r="12" fill="#ffd54a" stroke="${OL}" stroke-width="3.5"/>
      <path d="M36 54h12M42 48v12M37 49l10 10M47 49L37 59" stroke="${OL}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M72 44h14M72 54h14M72 64h10" stroke="#ffe0a0" stroke-width="3" stroke-linecap="round"/>
      ${star(86, 22, 7, '#ffe27a')}`, '#ff8a3c', '#4a0f2a'),
    erva: () => card(`
      <path d="M60 104C60 80 58 62 60 40" fill="none" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M60 104C60 80 58 62 60 40" fill="none" stroke="#3ddc84" stroke-width="5" stroke-linecap="round"/>
      <path d="M60 78C40 78 28 66 26 52c18 0 32 8 34 26z" fill="#3ddc84" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><path d="M60 78C40 78 28 66 26 52c10 4 26 12 34 26z" fill="#1fa65a"/>
      <path d="M60 62C78 62 92 50 94 36c-18 0-32 8-34 26z" fill="#3ddc84" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><path d="M60 62C78 62 92 50 94 36c-10 4-26 12-34 26z" fill="#1fa65a"/>
      <circle cx="60" cy="34" r="12" fill="#ffe27a" stroke="${OL}" stroke-width="4"/><circle cx="60" cy="34" r="20" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>
      <path d="M50 106q10 8 20 0" stroke="${OL}" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${star(30, 80, 5, '#c8ffd0')}${star(92, 78, 4, '#c8ffd0')}`, '#1fd18a', '#053a3a'),
    nucleo: () => card(`
      <circle cx="60" cy="62" r="46" fill="#ff7a2a" opacity=".3"/>
      <path d="M30 48q-6-18 8-26 2 14 12 16 0-14 12-22 4 16 14 20 10-6 14-16 8 14-2 28z" fill="#ff9d2a" opacity=".9"/>
      <circle cx="60" cy="66" r="30" fill="#ff5a2a" stroke="${OL}" stroke-width="4.5"/>
      <path d="M34 78a30 30 0 0 0 52 8 36 36 0 0 1-52-8z" fill="#b5251a"/><path d="M36 54a28 28 0 0 1 34-20 20 20 0 0 0-26 22z" fill="#ffb066"/>
      <ellipse cx="60" cy="66" rx="7" ry="18" fill="${OL}"/><ellipse cx="60" cy="66" rx="3.5" ry="14" fill="#ffe27a"/>
      <ellipse cx="46" cy="52" rx="6" ry="3.5" fill="#fff" transform="rotate(-40 46 52)"/>`, '#ff5a3a', '#3a0a1a'),
    talisma: () => card(`
      <path d="M36 12h48l4 8v88l-8 4H40l-8-4V20z" fill="#ffd54a" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M60 12h24l4 8v88l-8 4H60z" fill="#e0a82a"/>
      <path d="M42 24h36M42 30h36" stroke="#d6323f" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M50 42h20M60 42v22M48 54q12 6 24 0M52 74q8-6 16 0M54 86h12M60 74v18" stroke="#d6323f" stroke-width="5" stroke-linecap="round" fill="none"/>
      <circle cx="60" cy="100" r="5" fill="#d6323f" stroke="${OL}" stroke-width="3"/>
      <path d="M26 40q-12 10-4 26M94 40q12 10 4 26" fill="none" stroke="#fff4a0" stroke-width="4" stroke-linecap="round" opacity=".9"/>`, '#ffb43a', '#4a1a0a'),
  };

  function portrait(old) {
    const skin = old ? '#f3d2b0' : '#ffe0c4', skinSh = old ? '#d9a982' : '#f0b894';
    const hair = old ? '#f4f4ff' : '#251a4a', hairSh = old ? '#b8b8d8' : '#120a30', hairHi = old ? '#fff' : '#6a4fd8';
    const robe = old ? '#2f9d6a' : '#2f6dd8', robeSh = old ? '#1a6a48' : '#1a3f9a', trim = old ? '#ffe9a0' : '#ffffff';
    const bg = old ? ['#3fd8a0', '#06362a'] : ['#7aa8ff', '#1a1050'];
    const g = id('pb');
    return svg(200, 240, `<defs><radialGradient id="${g}" cx="50%" cy="40%" r="80%"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></radialGradient></defs>
      <rect width="200" height="240" rx="16" fill="url(#${g})"/>
      <g opacity=".3" stroke="#fff" stroke-width="2">${Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * Math.PI * 2; return `<path d="M${100 + Math.cos(a) * 60} ${110 + Math.sin(a) * 60}L${100 + Math.cos(a) * 150} ${110 + Math.sin(a) * 150}"/>`; }).join('')}</g>
      ${old ? `<path d="M40 50q60-50 120 0l-8 70q-52-24-104 0z" fill="${hair}" stroke="${OL}" stroke-width="4"/>` : `<path d="M34 70q4-60 66-60t66 60l6 120-30-30-10-70H68L58 160l-30 30z" fill="${hair}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>`}
      <path d="M20 240q4-60 52-76l28 22 28-22q48 16 52 76z" fill="${robe}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M100 186l-28-22q-6 20-4 76h32z" fill="${robeSh}"/><path d="M72 164l28 22 28-22" fill="none" stroke="${trim}" stroke-width="7" stroke-linejoin="round"/><path d="M100 186v54" stroke="${OL}" stroke-width="3.5"/>
      <path d="M86 146h28v28q-14 12-28 0z" fill="${skin}" stroke="${OL}" stroke-width="4"/><path d="M86 160q14 10 28 0v14q-14 12-28 0z" fill="${skinSh}"/>
      <path d="M56 84q0 56 44 66 44-10 44-66 0-30-44-30T56 84z" fill="${skin}" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M144 90q0 50-44 60 30-12 36-60z" fill="${skinSh}"/>
      <ellipse cx="55" cy="100" rx="6" ry="10" fill="${skin}" stroke="${OL}" stroke-width="3.5"/><ellipse cx="145" cy="100" rx="6" ry="10" fill="${skin}" stroke="${OL}" stroke-width="3.5"/>
      ${old
        ? `<path d="M56 78q0-34 44-36t44 36q-30-14-44-14T56 78z" fill="${hair}" stroke="${OL}" stroke-width="4"/><path d="M74 150q26 34 52 0-10 40-26 56-16-16-26-56z" fill="${hair}" stroke="${OL}" stroke-width="3.5"/><path d="M100 168v28M88 160l-6 22M112 160l6 22" stroke="${hairSh}" stroke-width="2.5"/>
           <path d="M72 82q-6-6-16 0M144 82q-6-6-16 0" stroke="${hairSh}" stroke-width="3" fill="none"/><path d="M70 98q8-3 14 0M116 98q8-3 14 0M78 88q10-3 18 0M104 88q10-3 18 0" stroke="${skinSh}" stroke-width="2" fill="none"/>
           <path d="M74 102q8-8 18-2-4 10-14 8z" fill="#fff" stroke="${OL}" stroke-width="3"/><path d="M108 100q10-6 18 2-4 8-14 8z" fill="#fff" stroke="${OL}" stroke-width="3"/>
           <circle cx="85" cy="104" r="5" fill="#2a6a5a"/><circle cx="117" cy="104" r="5" fill="#2a6a5a"/><circle cx="85" cy="104" r="2.5" fill="${OL}"/><circle cx="117" cy="104" r="2.5" fill="${OL}"/>
           <path d="M76 94q10-7 20-2M104 92q10-5 20 2" stroke="${hair}" stroke-width="5" stroke-linecap="round" fill="none"/>`
        : `<path d="M56 84q0-36 44-42t44 42q-6-20-24-24-8 14-20 14-16 0-22-14-14 6-22 24z" fill="${hair}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
           <path d="M72 62q8 14 28 14M110 66q10 8 26 10" stroke="${hairHi}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M56 82q40-28 88 0" fill="none" stroke="#e8433a" stroke-width="7" stroke-linecap="round"/>
           <path d="M70 100q8-12 22-6 4 10-6 16-14 0-16-10z" fill="#fff" stroke="${OL}" stroke-width="3.5"/><path d="M108 94q14-6 22 6-2 10-16 10-10-6-6-16z" fill="#fff" stroke="${OL}" stroke-width="3.5"/>
           <circle cx="84" cy="102" r="8" fill="#3a8aff"/><circle cx="116" cy="102" r="8" fill="#3a8aff"/><circle cx="84" cy="102" r="4.5" fill="${OL}"/><circle cx="116" cy="102" r="4.5" fill="${OL}"/>
           <circle cx="80" cy="98" r="3" fill="#fff"/><circle cx="112" cy="98" r="3" fill="#fff"/><circle cx="88" cy="106" r="1.5" fill="#fff"/><circle cx="120" cy="106" r="1.5" fill="#fff"/>
           <path d="M68 92q12-8 26-4M106 88q14-4 26 4" stroke="${OL}" stroke-width="4.5" stroke-linecap="round" fill="none"/>`}
      <path d="M99 112q-3 8 2 12" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${old ? `<path d="M88 130q12 6 24 0" stroke="${OL}" stroke-width="3.5" fill="none" stroke-linecap="round"/>` : `<path d="M90 132q10 8 20 0" stroke="${OL}" stroke-width="3.5" fill="#d6323f" stroke-linecap="round"/>`}
      ${old ? '' : `<circle cx="72" cy="120" r="7" fill="#ff8a8a" opacity=".35"/><circle cx="128" cy="120" r="7" fill="#ff8a8a" opacity=".35"/>`}
      ${star(24, 28, 9)}${star(176, 44, 6)}${star(160, 210, 7)}
      <rect x="2" y="2" width="196" height="236" rx="15" fill="none" stroke="${OL}" stroke-width="4"/>`);
  }

  function scene() {
    const g1 = id('sk');
    return svg(320, 180, `<defs>
        <linearGradient id="${g1}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a7a"/><stop offset=".55" stop-color="#d8409a"/><stop offset="1" stop-color="#ffd27a"/></linearGradient></defs>
      <rect width="320" height="180" fill="url(#${g1})"/>
      <circle cx="232" cy="64" r="34" fill="#fff4d0" stroke="${OL}" stroke-width="4"/><circle cx="224" cy="56" r="34" fill="#fffbe8" opacity=".6"/>
      <g fill="#fff" opacity=".9">${[[30, 20], [80, 40], [120, 14], [170, 30], [290, 24], [20, 70]].map(([x, y]) => `<path d="M${x} ${y - 4}L${x + 1.2} ${y - 1.2} ${x + 4} ${y} ${x + 1.2} ${y + 1.2} ${x} ${y + 4} ${x - 1.2} ${y + 1.2} ${x - 4} ${y} ${x - 1.2} ${y - 1.2}z"/>`).join('')}</g>
      <path d="M0 120l40-40 28 24 40-52 50 70 36-30 44 44 40-34 42 50v50H0z" fill="#5a2a9a" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M108 52l50 70 10-8-30-46z" fill="#3a1a7a"/><path d="M0 120l40-40 28 24-34 22z" fill="#3a1a7a"/>
      <path d="M0 150q50-30 100-10t110-10 110 20v30H0z" fill="#3a1a6a" stroke="${OL}" stroke-width="4"/>
      <g stroke="${OL}" stroke-width="4" stroke-linejoin="round">
        <path d="M58 126h44l-6-10H64z" fill="#e8433a"/><path d="M66 116h28l-6-12H72z" fill="#ff6a4a"/><path d="M74 104h12l-3-12h-6z" fill="#e8433a"/>
        <rect x="64" y="126" width="32" height="22" fill="#ffb86a"/><rect x="74" y="132" width="12" height="16" fill="#3a1a4a"/>
      </g>
      <path d="M80 92v-12" stroke="${OL}" stroke-width="3"/><path d="M80 80l8 4-8 4z" fill="#ffd54a"/>
      <path d="M-4 168q60-20 130-4t130-8 74 14v20H-4z" fill="#1a0e3a" stroke="${OL}" stroke-width="4"/>
      <g fill="#ffb3d1">${Array.from({ length: 22 }, (_, i) => `<ellipse cx="${(i * 47) % 320}" cy="${(i * 31) % 150 + 10}" rx="3" ry="1.8" transform="rotate(${i * 40} ${(i * 47) % 320} ${(i * 31) % 150 + 10})"/>`).join('')}</g>
      <path d="M30 60q30-6 60 4t60-4" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".55"/>
      <rect x="2" y="2" width="316" height="176" fill="none" stroke="${OL}" stroke-width="4"/>`);
  }

  function fighter(x, y, flip, c1, c2, hair) {
    const s = flip ? -1 : 1;
    return `<g transform="translate(${x} ${y}) scale(${s} 1)">
      <path d="M-14 56l-6 50h12l4-36zM8 60l14 46h12L24 56z" fill="#1a1236" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M-22 16q-6 30 0 50l44 4q8-26-2-54z" fill="${c1}" stroke="${OL}" stroke-width="4" stroke-linejoin="round"/><path d="M0 16l22 8q8 26-2 46l-20-2z" fill="${c2}"/>
      <path d="M-18 24l-26 22" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M-18 24l-26 22" stroke="${c1}" stroke-width="6" stroke-linecap="round"/>
      <path d="M18 22l30-16" stroke="${OL}" stroke-width="12" stroke-linecap="round"/><path d="M18 22l30-16" stroke="${c1}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="15" fill="#ffe0c4" stroke="${OL}" stroke-width="4"/>
      <path d="M-17 -2q0-22 17-22t18 22q-8-10-18-8t-17 8zM-14 -2q-8 20 0 34 4-14 6-26z" fill="${hair}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M4 -2q5-3 9 0M-10 -2q5-3 9 0" stroke="${OL}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="8" cy="2" r="2.2" fill="${OL}"/><circle cx="-6" cy="2" r="2.2" fill="${OL}"/>
    </g>`;
  }
  function duel() {
    const g = id('dg');
    return svg(320, 180, `<defs><radialGradient id="${g}" cx="52%" cy="50%" r="75%"><stop offset="0" stop-color="#fff2a0"/><stop offset=".4" stop-color="#ff7a3a"/><stop offset="1" stop-color="#3a0a3a"/></radialGradient></defs>
      <rect width="320" height="180" fill="url(#${g})"/>
      <g stroke="#fff" opacity=".8" stroke-width="2.5">${Array.from({ length: 40 }, (_, i) => { const a = (i / 40) * Math.PI * 2; const r0 = 40 + (i % 3) * 14; return `<path d="M${164 + Math.cos(a) * r0} ${86 + Math.sin(a) * r0}L${164 + Math.cos(a) * 240} ${86 + Math.sin(a) * 240}"/>`; }).join('')}</g>
      <path d="M0 150q80-14 160-6t160-4v40H0z" fill="#1a0a2a" stroke="${OL}" stroke-width="4"/>
      ${fighter(86, 54, false, '#2f6dd8', '#1a3f9a', '#251a4a')}
      ${fighter(244, 54, true, '#d6323f', '#8f1f2b', '#3a2418')}
      <path d="M96 78Q164 8 232 62" stroke="${OL}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M96 78Q164 8 232 62" stroke="#bff3ff" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M104 76Q166 20 226 62" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M232 62l14-22 4 18 20-8-12 18 18 8-22 4 6 20-18-14-8 22-6-22-22 6 14-18-20-10 22-2z" fill="#fff6a0" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
      <rect x="10" y="10" width="110" height="12" rx="3" fill="${OL}"/><rect x="13" y="13" width="72" height="6" rx="2" fill="#5aff9a"/>
      <rect x="200" y="10" width="110" height="12" rx="3" fill="${OL}"/><rect x="203" y="13" width="34" height="6" rx="2" fill="#ff5a5a"/>
      <text x="164" y="168" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="700" fill="#fff" stroke="${OL}" stroke-width="4" paint-order="stroke">Espada que Corta o Céu!</text>
      <rect x="2" y="2" width="316" height="176" fill="none" stroke="${OL}" stroke-width="4"/>`);
  }

  window.EstiloB = {
    items: [['Tônico de Recuperação', 'pilula'], ['Sabre de Viagem', 'espada'], ['Ficha de Jade', 'manual'], ['Raiz de Cordilheira', 'erva'], ['Broquel de Emergência', 'nucleo'], ['Fumaça de Fuga', 'talisma']].map(([n, k]) => ({ nome: n, html: items[k]() })),
    jovem: () => portrait(false), ancião: () => portrait(true), cenario: scene, duelo: duel,
  };
})();
