/* Estilo C — Pintura chinesa a tinta (shuimo): pinceladas, lavis, papel de arroz, selo vermelho e muita névoa (SVG com filtros). */
(function () {
  const INK = '#15131a', WASH = '#6c6a74', RED = '#b3262b', JADE = '#7fae9a', PAPER = '#efe6d0';
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const paper = (w, h) => `<rect width="${w}" height="${h}" fill="${PAPER}"/><rect width="${w}" height="${h}" filter="url(#papel)"/>`;
  const seal = (x, y, s = 16, ch = '道') => `<g transform="translate(${x} ${y})"><rect width="${s}" height="${s}" rx="1.5" fill="${RED}" filter="url(#tinta)"/><text x="${s / 2}" y="${s * 0.78}" text-anchor="middle" font-size="${s * 0.78}" font-family="'Noto Serif SC','Songti SC','SimSun','Noto Serif CJK SC',serif" fill="${PAPER}" font-weight="700">${ch}</text></g>`;
  const frame = (w, h) => `<rect x="2" y="2" width="${w - 4}" height="${h - 4}" fill="none" stroke="${INK}" stroke-width="1.4" opacity=".7"/>`;
  /** Pincelada com afinamento: traço grosso translúcido + traço fino por cima. */
  const brush = (d, w = 6, c = INK, o = 0.9) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}" filter="url(#tinta)"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${Math.max(1, w * 0.35)}" stroke-linecap="round" opacity="${Math.min(1, o + 0.1)}"/>`;
  const wash = (d, c = WASH, o = 0.4) => `<path d="${d}" fill="${c}" opacity="${o}" filter="url(#lavis)"/>`;
  const card = (inner, sealCh = '道') => svg(120, 120, `${paper(120, 120)}${inner}${seal(98, 96, 14, sealCh)}${frame(120, 120)}`);

  const items = {
    pilula: () => card(`
      ${wash('M60 24a36 36 0 1 0 0.1 0z', '#c9b8e8', 0.5)}
      ${brush('M60 22a38 38 0 1 0 30 18', 5, INK)}
      ${wash('M60 36a24 24 0 1 0 0.1 0z', '#7a5fc0', 0.55)}
      ${brush('M44 52q8-14 22-10', 3, '#fff', 0.8)}
      ${brush('M40 16q4 8 0 14M54 12q4 8 0 16M70 14q4 8 0 14', 2, WASH, 0.55)}`, '丹'),
    espada: () => card(`
      ${wash('M96 18L28 98', '#cfd8e8', 0.0)}
      ${brush('M98 14L30 94', 8, INK, 0.85)}${brush('M98 14L30 94', 3, '#e9eef8', 0.9)}
      ${brush('M26 82l18 18M22 98l10-12', 6, '#7a4a2a')}${brush('M30 74l22 22', 5, '#b08a2a')}
      ${brush('M20 104q-8 6-6 12M20 104q4 8 10 10', 2.2, RED, 0.9)}
      ${wash('M10 100q20-8 40 6', JADE, 0.3)}`, '剑'),
    manual: () => card(`
      ${wash('M28 24h62v76H28z', '#d9c9a0', 0.8)}
      ${brush('M28 24h62v76H28z', 3, INK, 0.9)}${brush('M36 24v76', 2, INK, 0.7)}
      ${brush('M48 38v44M58 38v34M68 38v44M78 38v30', 3, INK, 0.85)}
      ${brush('M32 40h2M32 54h2M32 68h2M32 82h2', 3, RED)}
      ${wash('M92 34h6v56h-6z', '#e9dcb8', 0.8)}`, '经'),
    erva: () => card(`
      ${brush('M60 104C58 84 62 66 58 40', 6, '#3d6a52', 0.9)}
      ${wash('M58 78C38 78 26 66 24 52c18 0 32 8 34 26z', JADE, 0.7)}${brush('M58 78C40 74 30 64 26 54', 2.5, INK, 0.8)}
      ${wash('M60 62C78 62 92 50 94 36c-18 0-32 8-34 26z', JADE, 0.7)}${brush('M60 62C76 58 88 48 92 38', 2.5, INK, 0.8)}
      ${brush('M48 104q6 6 12 0q6 6 14 0', 3, '#7a4a2a')}
      ${wash('M52 34a9 9 0 1 0 0.1 0z', '#e9c04a', 0.7)}${brush('M44 108q-8 4-14 2M76 108q8 4 14 2', 2, '#7a4a2a', 0.7)}`, '药'),
    nucleo: () => card(`
      ${wash('M60 20a40 40 0 1 0 0.1 0z', '#e87a4a', 0.55)}
      ${brush('M58 18a42 42 0 1 0 34 30', 5, INK, 0.9)}
      ${wash('M60 40a22 22 0 1 0 0.1 0z', RED, 0.55)}
      ${brush('M60 40q-6 22 0 44q6-22 0-44z', 3, INK, 0.95)}${brush('M60 46q-3 16 0 30', 1.5, '#e9c04a')}
      <circle cx="94" cy="26" r="3" fill="${INK}" opacity=".7"/><circle cx="26" cy="30" r="2" fill="${INK}" opacity=".6"/><circle cx="100" cy="64" r="2.2" fill="${RED}" opacity=".7"/>`, '核'),
    talisma: () => card(`
      ${wash('M36 12h48v100H36z', '#e8c85a', 0.85)}
      ${brush('M36 12h48v100H36z', 3, INK, 0.8)}
      ${brush('M44 24h32M44 32h32', 2.5, RED)}
      ${brush('M52 46h18M60 46v24M50 58q10 8 22 0M54 80q6-8 14 0M60 74v22', 4, RED, 0.95)}
      ${brush('M60 104h0', 6, RED)}
      ${wash('M20 40q-8 20 0 40M100 40q8 20 0 40', JADE, 0.25)}`, '符'),
  };

  function portrait(old) {
    return svg(200, 240, `${paper(200, 240)}
      ${wash('M-10 200q60-60 110-20t110-30v90H-10z', '#bfc6c0', 0.6)}
      ${wash('M20 230q4-60 52-76l28 22 28-22q48 16 52 76z', old ? '#7fae9a' : '#7a96c0', 0.75)}
      ${brush('M20 232q6-58 52-76M180 232q-6-58-52-76M72 156l28 22 28-22', 4, INK, 0.85)}
      ${brush('M100 178v54M84 190q-10 24-8 42M116 190q10 24 8 42', 2.2, INK, 0.6)}
      ${wash('M56 84q0 56 44 66 44-10 44-66 0-30-44-30T56 84z', old ? '#ecd2b0' : '#f3dcc0', 0.9)}
      ${brush('M56 86q2 50 44 62 42-12 44-62', 3.2, INK, 0.85)}
      ${brush('M56 88q0-32 44-34t44 34', 2.5, INK, 0.5)}
      ${old
        ? `${wash('M54 88q-2-44 46-48t46 48q-12-28-46-30T54 88z', '#9a9aa2', 0.85)}${brush('M60 74q10-24 40-26M104 48q30 4 38 26', 3, '#555', 0.7)}
           ${brush('M70 70q-4 20 0 36M130 70q4 20 0 36', 1.6, '#777', 0.7)}
           ${brush('M72 98q8-5 16 0M112 98q8-5 16 0', 3, INK)}<circle cx="80" cy="101" r="2.3" fill="${INK}"/><circle cx="120" cy="101" r="2.3" fill="${INK}"/>
           ${brush('M70 90q10-6 22-2M108 88q12-4 22 2', 3, '#777')}
           ${brush('M96 112q-4 8 2 12', 2, INK)}${brush('M86 132q14 6 28 0', 2.4, INK)}
           ${brush('M80 140q6 40 20 60 14-20 20-60', 3, '#aaa', 0.7)}${brush('M88 150q4 24 12 44M112 150q-4 24-12 44M100 154v44M94 146q6 14 6 40M106 146q-6 14-6 40', 1.4, '#999', 0.8)}
           ${brush('M74 118q14 8 26 0 12 8 26 0', 2.6, '#bbb', 0.8)}
           ${brush('M100 38v-12M92 34l16 0', 4, INK, 0.85)}${brush('M96 28q4-8 8 0', 3, RED)}`
        : `${wash('M52 92q-4-46 48-50t48 50q-4-26-24-34-14 16-30 16T76 58q-20 8-24 34z', '#2a2a36', 0.9)}${brush('M56 90q-2-40 44-44t44 44', 3, INK, 0.85)}
           ${brush('M72 64q8 12 28 12M110 68q10 6 24 8', 1.8, '#666', 0.6)}${brush('M50 100q-8 50 4 110M150 100q8 50-4 110', 6, '#222', 0.8)}${brush('M56 150q-6 30-2 60M144 150q6 30 2 60', 2.5, '#444', 0.7)}
           ${brush('M56 84q40-26 88 0', 5, RED, 0.85)}
           ${brush('M68 98q10-7 20 0M112 98q10-7 20 0', 3.2, INK)}<circle cx="80" cy="100" r="3.2" fill="${INK}"/><circle cx="120" cy="100" r="3.2" fill="${INK}"/><circle cx="82" cy="98.5" r="1" fill="#fff"/><circle cx="122" cy="98.5" r="1" fill="#fff"/>
           ${brush('M66 88q12-8 26-3M108 85q14-5 26 3', 3, INK, 0.9)}${brush('M97 110q-3 8 3 12', 2, INK)}${brush('M90 132q10 6 20 0', 2.6, RED, 0.9)}
           ${wash('M64 112a8 6 0 1 0 0.1 0zM126 112a8 6 0 1 0 0.1 0z', '#e87a8a', 0.35)}`}
      ${seal(160, 200, 20, old ? '寿' : '青')}${frame(200, 240)}`);
  }

  function scene() {
    return svg(320, 180, `${paper(320, 180)}
      ${wash('M0 0h320v180H0z', '#e8dcc0', 0.6)}
      <circle cx="244" cy="50" r="22" fill="none" stroke="${INK}" stroke-width="1.6" opacity=".6" filter="url(#tinta)"/><circle cx="244" cy="50" r="21" fill="#f6efd8" opacity=".6"/>
      ${wash('M-10 120l50-60 40 34 54-56 60 70 40-40 70 60v52H-10z', '#8a8e96', 0.45)}
      ${wash('M-10 140l60-40 50 30 60-48 70 54 50-30 80 40v34H-10z', '#5a5e68', 0.55)}
      ${wash('M0 120q80-18 160 0t160-6', '#fff', 0.7)}
      ${wash('M-10 160q80-30 170-6t170-10v36H-10z', '#2e3038', 0.8)}
      ${brush('M60 172q-4-40 10-70M70 102q-20-8-30 6M70 106q18-8 28 4M68 124q-14-4-22 6M68 128q14-4 22 6M66 144q-12 0-18 8M66 148q12 0 18 8', 4, '#1f2a24', 0.9)}
      ${brush('M180 140h40M186 140v-20h28v20M178 120l36-14 36 14', 3, INK, 0.9)}${wash('M186 120h28v20h-28z', '#c9b48a', 0.7)}${brush('M214 120l8-4', 3, RED)}
      ${brush('M96 60q10-8 22-2q8-6 14 2M110 56l-6 10M118 58l10 8', 2, INK, 0.9)}
      ${brush('M270 24v52M278 24v44M286 28v36', 2.6, INK, 0.8)}
      ${seal(288, 144, 18)}${frame(320, 180)}`);
  }

  function figure(x, y, flip, tone, hairy) {
    const s = flip ? -1 : 1;
    return `<g transform="translate(${x} ${y}) scale(${s} 1)">
      ${wash('M-26 18q-10 40 6 74l54-4q14-38-4-70z', tone, 0.75)}
      ${brush('M-24 20q-12 40 6 72M28 20q14 38-4 68', 4, INK, 0.9)}${brush('M-20 92q-16 14-26 12M24 90q14 14 26 12', 4, INK, 0.8)}
      ${brush('M-10 30q8 20 4 48M8 30q-4 20 0 50', 2, INK, 0.6)}
      ${wash('M0 0a14 14 0 1 0 0.1 0z', '#f0d8b8', 0.95)}${brush('M-14 0a14 14 0 1 0 28 0', 2.6, INK, 0.9)}
      ${brush('M-16 -4q0-16 16-16t18 16q-10-8-18-6t-16 6zM-12 0q-10 22 0 38', 5, hairy, 0.95)}
      ${brush('M4 0h6M-8 0h6', 2.4, INK)}
    </g>`;
  }
  function duel() {
    return svg(320, 180, `${paper(320, 180)}
      ${wash('M-10 110q80-30 170-6t170-14v90H-10z', '#8a8e96', 0.4)}
      ${wash('M-10 150q90-22 170-6t170-10v46H-10z', '#2e3038', 0.75)}
      ${figure(96, 58, false, '#7a96c0', INK)}${figure(236, 58, true, '#c0605a', '#3a2418')}
      ${brush('M64 118L128 56', 5, INK, 0.9)}${brush('M64 118L128 56', 2, '#fff', 0.9)}${brush('M60 122l8-8', 5, '#7a4a2a')}
      ${brush('M110 70Q170 4 228 60', 12, INK, 0.9)}${brush('M114 70Q170 12 224 60', 4, '#fff', 0.95)}
      ${brush('M226 60l10-12M226 64l16-2M224 68l12 10', 3, RED, 0.9)}
      ${[[150, 22, 3], [168, 30, 2], [190, 18, 4], [210, 34, 2.5], [132, 38, 2]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="${INK}" opacity=".75" filter="url(#tinta)"/>`).join('')}
      ${brush('M20 28q30-6 60 4M240 24q30 6 60-2', 3, '#fff', 0.8)}
      <text x="160" y="22" text-anchor="middle" font-size="15" font-family="'Noto Serif SC','Songti SC',Georgia,serif" fill="${INK}" opacity=".85" font-weight="700">Espada que Corta o Céu</text>
      ${seal(292, 140, 18, '斩')}${frame(320, 180)}`);
  }

  window.EstiloC = {
    items: [['Tônico de Recuperação', 'pilula'], ['Sabre de Viagem', 'espada'], ['Ficha de Jade', 'manual'], ['Raiz de Cordilheira', 'erva'], ['Broquel de Emergência', 'nucleo'], ['Fumaça de Fuga', 'talisma']].map(([n, k]) => ({ nome: n, html: items[k]() })),
    jovem: () => portrait(false), ancião: () => portrait(true), cenario: scene, duelo: duel,
  };
})();
