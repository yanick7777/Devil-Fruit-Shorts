// Shot plan for the Ito Ito no Mi (String-String Fruit) short.
// Structure follows the fruit's real progression: three base powers, then the AWAKENING as the peak (no forced "four forms").
import * as A from '/engine/art.js';
import { drawIto } from '/shorts/string/fruit.js';
import { F, ease, prog, lerp, pop, person, deskFront, halo, evolve, cached } from '/engine/kit.js';

// ---------------- string effects ----------------
function string(x, x0, y0, x1, y1, w = 5, sag = 0) { // a taut white string with a dark edge
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + sag;
  x.save(); x.lineCap = 'round';
  x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo(mx, my, x1, y1); x.lineWidth = w + 4; x.strokeStyle = 'rgba(27,21,48,0.75)'; x.stroke();
  x.lineWidth = w; x.strokeStyle = '#ffffff'; x.stroke(); x.restore();
}
function fingerStrings(x, hx, hy, tx, ty, k, n = 5) { // strings shooting from the fingertips toward a target
  for (let i = 0; i < n; i++) { const off = (i - (n - 1) / 2) * 16; string(x, hx, hy + off * 0.3, lerp(hx, tx + off * 2, k), lerp(hy, ty + off, k), 4); }
}
function stringWave(x, by, h, t, x0 = -100, x1 = 1180) { // the ground turning into a wave of strings
  if (h <= 0) return;
  for (let i = 0; i < 26; i++) { const px = lerp(x0, x1, i / 25), top = by - h * (0.6 + 0.4 * Math.sin(t * 4 + i * 0.7));
    x.beginPath(); x.moveTo(px - 30, by + 40); x.bezierCurveTo(px - 50, by - h * 0.4, px + 40, top + 60, px + Math.sin(t * 3 + i) * 30, top);
    x.lineWidth = 16; x.strokeStyle = 'rgba(27,21,48,0.75)'; x.stroke(); x.lineWidth = 10; x.strokeStyle = '#fbf7ff'; x.stroke(); }
}
function stringClone(x, S, who, expr, cx, fy, s, o = {}) { // a copy made of strings: pale, striped with string lines
  const key = `sc:${who}|${expr}|${o.pose || 'idle'}`;
  const c = cached(key, () => { const im = A.drawPerson({ who, expr, pose: o.pose || 'idle' }), t = A.mk(im.width, im.height), tx = t.getContext('2d');
    tx.drawImage(im, 0, 0); tx.globalCompositeOperation = 'source-atop'; tx.fillStyle = 'rgba(245,240,255,0.78)'; tx.fillRect(0, 0, t.width, t.height);
    tx.strokeStyle = 'rgba(150,130,200,0.8)'; tx.lineWidth = 6; for (let y = 0; y < t.height; y += 22) { tx.beginPath(); tx.moveTo(0, y); tx.lineTo(t.width, y + 30); tx.stroke(); } return t; });
  x.save(); x.translate(cx, fy); x.rotate(Math.sin(S.T * 1.1) * 0.012); x.scale(s * (o.flip ? -1 : 1), s); x.drawImage(c, -A.FIG.W / 2, -A.FIG.FEET); x.restore();
}
function birdcage(x, cx, cy, r, t, k) { // dome of strings over an island
  if (r <= 0) return;
  x.save(); x.globalAlpha = 0.95; x.strokeStyle = '#ffffff'; x.lineWidth = 4;
  for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI; x.beginPath(); x.ellipse(cx, cy, Math.abs(Math.cos(a)) * r, r * 0.8, 0, Math.PI, 0); x.stroke(); }
  for (let j = 1; j < 6; j++) { const yy = cy - r * 0.8 * j / 6, ww = r * Math.sqrt(1 - (j / 6) ** 2); x.beginPath(); x.ellipse(cx, yy, ww, ww * 0.18, 0, 0, 7); x.stroke(); }
  x.restore(); A.glow(x, cx, cy - r * 0.4, r * 1.2, '255,255,255', 0.15 * k);
}
function stoneColumn(x, cx, by, s, cut, k) { // a column sliced in two; the top half slides off (k 0..1)
  x.save(); x.translate(cx, by); x.scale(s, s);
  x.beginPath(); x.rect(-70, -cut, 140, cut); A.fs(x, '#e0d6c0', 10);
  x.save(); x.translate(160 * k, 30 * k); x.rotate(0.25 * k); x.beginPath(); x.rect(-70, -620, 140, 620 - cut); A.fs(x, '#e0d6c0', 10); x.restore();
  x.restore();
}
function catsCradle(x, L, R) { // a string figure stretched between the two hands
  const [lx, ly] = L, [rx, ry] = R, mx = (lx + rx) / 2, my = (ly + ry) / 2;
  const pts = [[lx, ly - 40], [lx, ly + 40], [rx, ry - 40], [rx, ry + 40]];
  for (const [ax, ay] of pts) for (const [bx, by] of pts) if (ax < bx) string(x, ax, ay, bx, by, 4);
  string(x, lx, ly - 40, mx, my + 60, 4); string(x, rx, ry - 40, mx, my + 60, 4); string(x, lx, ly + 40, mx, my - 60, 4); string(x, rx, ry + 40, mx, my - 60, 4);
}
function stitches(x, cx, cy, len, k) { // white zig-zag stitches closing a wound
  x.save(); x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - len / 2, cy); x.lineTo(cx + len / 2, cy + 20); x.lineWidth = 18; x.strokeStyle = '#a02838'; x.stroke();
  const n = Math.floor(9 * k); for (let i = 0; i < n; i++) { const px = cx - len / 2 + (i + 0.5) * len / 9, py = cy + 20 * (i + 0.5) / 9; string(x, px - 18, py - 30, px + 18, py + 30, 7); } x.restore();
}
export function stringIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { x.beginPath(); x.arc(-60, -70, 50, 0, 7); x.arc(0, -90, 60, 0, 7); x.arc(60, -70, 50, 0, 7); A.fs(x, '#ffffff', 6); string(x, -40, -40, -60, 90, 5); string(x, 40, -40, 60, 90, 5); }
  else if (k === 2) { x.beginPath(); x.rect(-110, -110, 220, 24); A.fs(x, '#8a5a3c', 6); for (const [dx, dy] of [[-60, 40], [0, 20], [60, 40]]) string(x, dx, -90, dx, dy, 4); for (const [dx, dy] of [[-60, 40], [60, 40]]) { x.beginPath(); x.arc(dx, dy + 14, 16, 0, 7); A.fs(x, '#f6c690', 5); } x.beginPath(); x.arc(0, 40, 26, 0, 7); A.fs(x, '#f6c690', 5); }
  else if (k === 3) { for (const [dx, a] of [[-40, 1], [40, 0.5]]) { x.save(); x.globalAlpha = a; x.beginPath(); x.arc(dx, -40, 40, 0, 7); A.fs(x, a < 1 ? '#f1ecff' : '#f6c690', 6); A.rrect(x, dx - 40, 0, 80, 100, 20); A.fs(x, a < 1 ? '#f1ecff' : '#22a99a', 6); x.restore(); } }
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); stringWave(x, 90, 150, t, -120, 120); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const L = Object.fromEntries(TL.lines.map((l) => [l.id, l]));
  const W = (id, re) => { const l = L[id], w = l.words.find((w) => re.test(w.w)); if (!w) throw new Error(`word ${re} not in ${id}`); return l.start + w.t; };
  const end = (id) => L[id].start + L[id].dur, st = (id) => L[id].start;
  const shots = [], add = (o) => shots.push(o);
  const addSplit = (o, tSplit, cam2, name2) => {
    const S0 = o.t0;
    const wrap = (fn) => fn && function (x, S) { const P = new Proxy(S, { get: (t, k) => (k === 't0' ? S0 : k === 't' ? S.T - S0 : t[k]), set: (t, k, v) => { t[k] = v; return true; } }); return fn.call(this, x, P); };
    add({ ...o, t1: tSplit });
    add({ ...o, name: name2, t0: tSplit, cam: cam2, banners: [], sfx: [], draw: wrap(o.draw), hud: wrap(o.hud) });
  };

  // ---------------- HOOK ----------------
  const tDrop = 0.55, tShock = 0.9, tBite = W('hook', /^bite/), s2 = tBite - 0.4;
  add({ name: 'Hook (desk room): host sips coffee, the lilac gourd fruit drops onto the plate, wide-eyed shock with !?', t0: 0, t1: s2, bg: 'desk',
    cam: [[1.0, 540, 980, 0], [1.07, 540, 950, 0]], sfx: [[0.1, 'sip'], [tDrop - 0.25, 'fall'], [tDrop + 0.3, 'thunk'], [tShock, 'shock']],
    draw(x, S) {
      const h = person(x, S, 'host', S.t < tShock ? 'calm' : 'shock', 540, 1900, 0.8, { pose: S.t > 0.05 && S.t < 0.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S);
      const k = prog(S.t, tDrop - 0.3, tDrop + 0.3);
      drawIto(x, 290, lerp(-200, 1330, ease.outBounce(k)), 80, S.T * 0.6, { shadow: false });
      if (S.t > tDrop + 0.3 && S.t < tDrop + 0.3 + 7 * F) S.shake = 0.6;
      if (S.t > tShock) A.mark(x, '!?', h.head[0] + 230, h.head[1] - 230, pop(S.T, tShock));
    } });
  add({ name: 'The bite (desk close-up): dip, bite, disgusted face, a few strings twitch out of his fingertips; pink YOUR FRUIT banner', t0: s2, t1: end('hook'), bg: 'desk',
    cam: [[1.4, 500, 1010, 0.02], [1.5, 490, 1000, 0.035]], banners: [['YOUR FRUIT', 'pink', W('hook', /^fruit/) - 0.1, end('hook')]],
    sfx: [[tBite - s2, 'crunch'], [tBite - s2 + 0.3, 'swish'], [W('hook', /^weird/) - s2, 'yuck']],
    draw(x, S) {
      const bt = tBite - s2, bitten = S.t >= bt, atMouth = S.t > bt - 0.35 && S.t < bt + 0.45, dip = S.t > bt - 2 * F && S.t < bt ? 16 : 0;
      const h = person(x, S, 'host', bitten ? 'yuck' : 'calm', 540, 1900, 0.8, { pose: atMouth ? 'sip' : 'hold' });
      deskFront(x, S); A.mug(x, 830, 1330, 0.75, S.T, true, false);
      const fx = h.hand.R[0] - 18, fy = h.hand.R[1] - 48 + dip; drawIto(x, fx, fy, 56, S.T * 0.4, { shadow: false });
      if (bitten) { x.beginPath(); x.arc(fx + 40, fy - 10, 22, 0, 7); x.fillStyle = '#f3ecff'; x.fill(); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke();
        const k = ease.outCubic(prog(S.t, bt + 0.3, bt + 0.7)); fingerStrings(x, h.hand.L[0], h.hand.L[1], h.hand.L[0] - 260, h.hand.L[1] + 120, k, 4); A.mark(x, '!?', 820, 560, pop(S.T, tBite + 0.1)); }
      S.flash = Math.max(S.flash, 0.45 * (1 - prog(S.t, bt, bt + 0.25)) * (bitten ? 1 : 0));
    } });
  add({ name: 'Don\'t panic (balls of yarn): the host calms down, holds up the bitten fruit, a loose thread dangling from his finger', t0: st('calm'), t1: end('calm'), bg: 'yarn',
    cam: [[1.06, 540, 1000, -0.02], [1.12, 540, 990, 0.01]], sfx: [[0, 'whoosh'], [W('calm', /^Devil/) - st('calm'), 'shimmer']],
    draw(x, S) {
      const tj = W('calm', /^just/) - S.t0;
      const h = person(x, S, 'host', S.t < tj ? 'worried' : 'calm', 520, 1760, 0.8, { talk: true, seed: 1, pose: 'holdUp' });
      if (S.t < tj) A.sweat(x, h.head[0] + 190, h.head[1] - 60, pop(S.T, S.t0 + 0.3));
      drawIto(x, h.hand.R[0] + 20, h.hand.R[1] - 70, 58, S.T * 0.4, { shadow: false });
      string(x, h.hand.L[0], h.hand.L[1], h.hand.L[0] - 40 + Math.sin(S.T * 3) * 20, h.hand.L[1] + 260, 4, 30);
      const td = W('calm', /^Devil/) - S.t0; A.sparkle(x, h.hand.R[0] - 20, h.hand.R[1] - 160, 36 * Math.sin(Math.PI * prog(S.t, td, td + 0.6)));
    } });

  // ---------------- OUT OF EVERY FRUIT + NAME ----------------
  const tName = W('name', /^String-String/) - 0.15, tThat = W('type', /^that/) - 0.1;
  add({ name: 'Out of every fruit: teal rays, pink ゴ marks, spinning globe, dark unnamed fruit silhouettes', t0: st('sea'), t1: tName, bg: 'rays:teal',
    cam: [[1.0, 540, 900, 0], [1.1, 540, 880, 0.04]], sfx: [[0, 'whoosh'], [0.1, 'rumble']],
    draw(x, S) {
      A.globe(x, 540, 860, 230 * pop(S.T, S.t0 + 0.05), S.T);
      for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + S.T * 0.6, p = pop(S.T, S.t0 + 0.12 + i * 0.18); if (p > 0) A.fruitSilhouette(x, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 300, 70 * p, i + 4); }
      A.gogo(x, 110, 330, S.T, pop(S.T, S.t0 + 0.1)); A.gogo(x, 800, 1020, S.T + 1, 0.7 * pop(S.T, S.t0 + 0.6));
    } });
  add({ name: 'Fruit reveal (silver string web): the String-String Fruit hangs from a single thread and spins; pink STRING-STRING FRUIT banner', t0: tName, t1: tThat, bg: 'web',
    cam: [[1.05, 540, 900, 0.02], [1.16, 540, 880, 0]], banners: [['STRING-STRING FRUIT', 'pink', tName + 0.1, tThat]], sfx: [[0, 'whoosh'], [0.1, 'ding'], [0.3, 'shimmer']],
    draw(x, S) {
      halo(x, 540, 900, 470, '200,170,255', S.T);
      const sw = Math.sin(S.T * 1.6) * 0.06; x.save(); x.translate(540, -100); x.rotate(sw); x.translate(-540, 100);
      string(x, 540, -100, 540, 560, 5); drawIto(x, 540, 900, 260 * pop(S.T, S.t0), S.t * 0.7); x.restore();
      for (let i = 0; i < 6; i++) { const ph = (S.T * 0.7 + i / 6) % 1; A.sparkle(x, 540 + Math.cos(i * 1.7) * 360, 880 + Math.sin(i * 2.3) * 360, 36 * Math.sin(Math.PI * ph)); }
    } });

  // ---------------- SLICE STONE + STAGE ----------------
  const tAndType = W('type', /^and$/) - 0.1, tSlice = W('type', /^slice/);
  add({ name: 'Sharp strings (sunlit ruins): strings shoot from the host\'s fingers and a stone column slides apart', t0: tThat, t1: tAndType, bg: 'ruins',
    cam: [[1.05, 560, 1000, 0.02], [1.12, 580, 990, 0.03]], sfx: [[0.1, 'swish'], [tSlice - tThat, 'slash'], [tSlice - tThat + 0.3, 'crumble']],
    draw(x, S) {
      const ts = tSlice - S.t0, k = ease.outCubic(prog(S.t, ts + 0.1, ts + 0.8));
      stoneColumn(x, 820, 1500, 1.1, 300, k);
      const h = person(x, S, 'host', S.t > ts ? 'grin' : 'calm', 280, 1780, 0.72, { seed: 2, pose: 'punch' });
      fingerStrings(x, h.hand.R[0], h.hand.R[1], 1100, 1170, ease.outCubic(prog(S.t, 0.05, ts)), 5);
      if (S.t > ts && S.t < ts + 7 * F) S.shake = 0.6;
    } });
  const pw = [W('type', /^comes/), W('type', /^whole/), W('type', /^set/), W('type', /^tricks/)], lvl = pw[3] + 0.4;
  const labels = ['POWER 1', 'POWER 2', 'POWER 3', 'AWAKENED'];
  const stageDraw = (x, S) => {
    const xs = [165, 415, 665, 915], lit = pw.filter((t) => S.T >= t).length;
    const fill = lit === 0 ? 0 : (lit - 1) / 4 + 0.25 * ease.outCubic(prog(S.T, pw[lit - 1], pw[lit - 1] + 0.3));
    A.progressBar(x, 540, 560, 900, fill, S.T > lvl ? 'LEVEL UP!' : 'STRING TRICKS');
    if (S.T > lvl) A.shineLines(x, 540, 560, 470, 620, S.T, 12);
    for (const px of xs) string(x, px, -100, px, 760, 3);
    xs.forEach((px, i) => {
      if (i === lit - 1) halo(x, px, 860, 210, i === 3 ? '255,220,90' : '255,140,200', S.T);
      A.pedestal(x, px, 990, labels[i], i < lit);
      const p = pop(S.T, pw[i]); if (p > 0) stringIcon(x, i + 1, px, 860 + Math.sin(S.T * 2 + i) * 10, 0.62 * p, S.T);
      else { x.font = `110px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillText('?', px, 900); }
    });
  };
  add({ name: 'Puppet-theatre stage: POWER 1, POWER 2, POWER 3 and AWAKENED pop onto pedestals hanging from strings, the bar fills, LEVEL UP', t0: tAndType, t1: end('type'), bg: 'theater',
    cam: [[1.0, 540, 980, 0], [1.12, 600, 900, 0.03]], sfx: [[0, 'whoosh'], ...pw.map((t) => [t - tAndType, 'pop']), [lvl - tAndType, 'levelup']], draw: stageDraw });

  // ---------------- POWER 1: walking across the sky ----------------
  const tWalk = W('power1', /^walk/) - 0.1;
  add({ name: 'Power 1 close-up (high sky): the host hooks strings onto two clouds and walks across the sky; shine lines; scope overlay on the lumberjack below', t0: st('power1'), t1: tWalk, bg: 'skyHigh',
    cam: [[1.05, 540, 980, -0.03], [1.12, 540, 960, -0.01]], sfx: [[0.2, 'swish'], [W('power1', /^clouds/) - st('power1'), 'swish']],
    draw(x, S) {
      const k = ease.outCubic(prog(S.t, 0.2, 1.0));
      const h = person(x, S, 'host', 'grin', 540, 1500, 0.66, { seed: 2, pose: 'cheer' });
      string(x, h.hand.L[0], h.hand.L[1], lerp(h.hand.L[0], 180, k), lerp(h.hand.L[1], 300, k), 5); string(x, h.hand.R[0], h.hand.R[1], lerp(h.hand.R[0], 900, k), lerp(h.hand.R[1], 280, k), 5);
      A.shineLines(x, h.head[0], h.head[1] + 300, 380, 520, S.T, 10);
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.5); if (p <= 0) return; x.save(); x.translate(860, 1080); x.scale(p * 0.85, p * 0.85);
      A.scopeOverlay(x, 0, 0, 150, S.T, (c) => person(c, S, 'lumberjack', 'worried', 0, 180, 0.17, { seed: 4, pose: 'shrug' }));
      x.font = `44px ${A.FONT}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = A.OL; x.strokeText('BELOW', 0, 200); x.fillStyle = '#5fe07a'; x.fillText('BELOW', 0, 200); x.restore(); } });
  add({ name: 'Power 1 reaction (windmill hills): the lumberjack looks up, the host strolls across the sky on strings, ?', t0: tWalk, t1: end('power1'), bg: 'windmill',
    cam: [[1.08, 540, 1000, 0.03], [1.14, 560, 990, 0.04]], sfx: [[0.1, 'whoosh']],
    draw(x, S) {
      const u = prog(S.t, 0, S.dur), hx = lerp(150, 900, u);
      string(x, hx - 40, 380, hx - 220, -60, 4); string(x, hx + 40, 380, hx + 220, -60, 4);
      person(x, S, 'host', 'grin', hx, 560, 0.24, { seed: 2, pose: 'cheer' });
      const e = person(x, S, 'lumberjack', 'shock', 540, 1780, 0.76, { seed: 3, pose: 'shrug' });
      A.mark(x, '?', e.head[0] + 220, e.head[1] - 230, pop(S.T, S.t0 + 0.3), 0.2);
    } });

  // ---------------- POWER 2: puppet strings ----------------
  addSplit({ name: 'Power 2 evolve (circus tent): sky strings dissolve into the puppet icon, flash + glow ring; gold POWER 2 banner; the lumberjack dances on strings like a puppet; CONTROL meter', t0: st('power2'), t1: end('power2'), bg: 'circus',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 960, -0.02]], banners: [['POWER 2', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^control/) - st('power2'), 'boing']],
    draw(x, S) {
      if (S.t < 0.5) evolve(x, S, 1, 2, 540, 760, 1.4, 0.45, stringIcon);
      const tc = W('power2', /^strings/) - S.t0, ctrl = S.t > tc, beat = Math.floor((S.t - tc) * 2.5) % 3;
      const pose = !ctrl ? 'idle' : ['cheer', 'shrug', 'raise'][beat];
      const e = person(x, S, 'lumberjack', ctrl ? 'shock' : 'smug', 700, 1780, 0.72, { seed: 3, pose, pop: S.t0 + 0.4 });
      const h = person(x, S, 'host', 'smug', 250, 1780, 0.66, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 });
      if (ctrl) { for (const k of ['L', 'R']) string(x, h.hand.L[0], h.hand.L[1], e.hand[k][0], e.hand[k][1], 4, -60); string(x, h.hand.L[0], h.hand.L[1], e.head[0], e.head[1] - 120, 4, -80); A.mark(x, '!?', e.head[0] + 210, e.head[1] - 240, pop(S.T, S.t0 + tc + 0.3)); }
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.6); if (p <= 0) return; x.save(); x.translate(70, 520); x.scale(p, p); A.meterOverlay(x, 0, 0, 380, ease.outCubic(prog(S.t, 0.6, 2.4)), 'CONTROL'); x.restore(); } },
    W('power2', /^control/) - 0.1, [[1.3, 700, 1000, 0.03], [1.38, 720, 990, 0.045]], 'Power 2 close (same tent): the lumberjack jerks through puppet poses on the strings');

  // ---------------- POWER 3: string clone ----------------
  const tPain = W('power3', /^pain/) - 0.6;
  addSplit({ name: 'Power 3 evolve (hall of mirrors): puppet icon becomes the clone icon; a pale string copy of the host steps out, takes the lumberjack\'s punch (impact star) and doesn\'t even flinch; magnifier shows it\'s all string; gold POWER 3 banner', t0: st('power3'), t1: end('power3'), bg: 'mirrorHall',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['POWER 3', 'gold', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^clone/) - st('power3'), 'shimmer'], [tPain - st('power3'), 'impact']],
    draw(x, S) {
      if (S.t < 0.5) evolve(x, S, 2, 3, 540, 760, 1.4, 0.45, stringIcon);
      const tc = W('power3', /^clone/) - S.t0, cl = ease.outBack(prog(S.t, tc, tc + 0.5)), hit = S.T > tPain;
      person(x, S, 'host', 'smug', 200, 1780, 0.62, { seed: 2, pose: 'shrug', pop: S.t0 + 0.4 });
      if (cl > 0) stringClone(x, S, 'host', 'smug', lerp(200, 520, cl), 1780, 0.66, { pose: hit ? 'shrug' : 'idle' });
      const e = person(x, S, 'lumberjack', hit ? 'worried' : 'shout', 840, 1780, 0.68, { seed: 3, pose: S.T > tPain - 0.2 ? 'punch' : 'idle', flip: true, pop: S.t0 + 0.5 });
      A.impactStar(x, 560, 1150, 150 * pop(S.T, tPain) * (1 - prog(S.T, tPain + 0.3, tPain + 0.6)), 0.3);
      if (hit && S.T < tPain + 7 * F) S.shake = 0.8;
      if (hit) A.mark(x, '?', e.head[0] - 200, e.head[1] - 230, pop(S.T, tPain + 0.3), -0.2);
    },
    hud(x, S) { const tc = W('power3', /^clone/), p = pop(S.T, tc + 0.4); if (p <= 0) return; x.save(); x.translate(820, 480); x.scale(p * 0.85, p * 0.85);
      A.magnifier(x, 0, 0, 175, S.T, (c) => { for (let y = -170; y < 170; y += 22) string(c, -180, y, 180, y + 40, 5); }); x.restore(); } },
    W('power3', /^that/) - 0.1, [[1.28, 640, 1020, -0.03], [1.36, 660, 1010, -0.045]], 'Power 3 close (same mirrors): the punch lands on the string clone, impact star, it doesn\'t even flinch');

  // ---------------- AWAKENING (peak) ----------------
  const tGround = W('awaken', /^ground/) - 0.15, tAw = W('awaken', /^awaken/);
  add({ name: 'Awakening (sunny tiled plaza): the clone icon gives way to the awakened icon, gold halo, gold AWAKENED banner; the host raises his hand', t0: st('awaken'), t1: tGround, bg: 'palace',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 940, 0.02]], banners: [['AWAKENED', 'gold', tAw - 0.1, tGround, 'slide']], sfx: [[0, 'evolve'], [tAw - st('awaken'), 'charge']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, stringIcon);
      else { const h = person(x, S, 'host', 'grin', 540, 1780, 0.78, { pop: S.t0 + 0.45, seed: 7, pose: 'raise' }); A.shineLines(x, h.hand.L[0], h.hand.L[1], 100, 240, S.T, 10);
        if (S.T > tAw) { S.flash = Math.max(S.flash, 0.6 * (1 - prog(S.T, tAw, tAw + 0.3))); S.flashCol = '255,246,200'; } }
    } });
  add({ name: 'Awakened (stone ruins): the ground and broken columns ripple up into waves of string that sweep over the lumberjack; impact star, 7-frame shake, !?', t0: tGround, t1: end('awaken'), bg: 'ruins',
    cam: [[1.12, 600, 1040, 0.03], [1.06, 580, 1000, 0.05]], sfx: [[0, 'rumble'], [0.2, 'swish'], [1.2, 'impact']],
    draw(x, S) {
      const wv = ease.outCubic(prog(S.t, 0, 1.2)) * 520, ti = 1.2, hit = S.t > ti;
      const e = person(x, S, 'lumberjack', hit ? 'hit' : 'worried', 820, 1780, 0.66, { seed: 6, pose: 'shrug', rot: hit ? -0.25 * prog(S.t, ti, ti + 0.4) : 0 });
      person(x, S, 'host', 'grin', 260, 1780, 0.66, { seed: 7, pose: 'raise' });
      stringWave(x, 1700, wv, S.T, -100, lerp(400, 1180, prog(S.t, 0.3, ti)));
      A.impactStar(x, e.head[0], e.head[1] + 300, 220 * pop(S.T, S.t0 + ti) * (1 - prog(S.t, ti + 0.5, ti + 0.9)), 0.3);
      if (hit && S.t < ti + 7 * F) S.shake = 1.1;
      if (hit) A.mark(x, '!?', e.head[0] + 190, e.head[1] - 240, pop(S.T, S.t0 + ti + 0.25));
    } });

  // ---------------- TWIST + TRUTH: the Birdcage ----------------
  add({ name: 'Twist (island at night): thin strings start dropping out of the dark sky toward the island; push-in with roll, low sting; red BIRDCAGE banner', t0: st('twist'), t1: end('twist'), bg: 'nightIsland', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 980, 0.07]], banners: [['BIRDCAGE', 'red', W('twist', /^Birdcage/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.3, 'swish']],
    draw(x, S) { const k = ease.outCubic(prog(S.t, 0.1, S.dur)); for (let i = 0; i < 16; i++) { const px = 60 + i * 64, top = -150; string(x, px, top, lerp(px, 540 + (px - 540) * 0.6, k), lerp(top, 1080, k), 3); } } });
  addSplit({ name: 'The cage closes (island from above): a dome of strings covers the whole island and shrinks, slicing everything inside', t0: st('truth'), t1: end('truth'), bg: 'islandAerial',
    cam: [[1.05, 540, 960, -0.02], [1.18, 540, 960, -0.04]], sfx: [[0, 'whoosh'], [W('truth', /^slowly/) - st('truth'), 'rumble'], [W('truth', /^slicing/) - st('truth'), 'slash']],
    draw(x, S) {
      const ts = W('truth', /^slowly/), r = lerp(560, 380, ease.smoother(prog(S.T, ts, end('truth'))));
      birdcage(x, 540, 1050, r * pop(S.T, S.t0 + 0.05), S.T, 1);
      if (S.T > W('truth', /^slicing/)) for (let i = 0; i < 6; i++) { const a = i * 1.1 + S.T * 2; string(x, 540 + Math.cos(a) * 300, 980 + Math.sin(a) * 200, 540 - Math.cos(a) * 300, 980 - Math.sin(a) * 200, 3); }
    } },
    W('truth', /^slowly/) - 0.1, [[1.4, 540, 1000, 0.03], [1.55, 540, 1010, 0.05]], 'The cage closes (closer on the island): the dome shrinks and strings slice through the town');

  // ---------------- USERS ----------------
  const tStitch = W('users', /^and$/) - 0.1;
  add({ name: 'Doflamingo (royal throne room): a slimy green hand (Trebol) offers the fruit, Doflamingo grins and takes it', t0: st('users'), t1: tStitch, bg: 'throne',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], sfx: [[0, 'whoosh'], [0.2, 'ding']],
    draw(x, S) {
      const h = person(x, S, 'doflamingo', 'grin', 560, 1800, 0.9, { pop: S.t0 + 0.05, seed: 8, pose: 'holdUp' });
      const k = ease.outCubic(prog(S.t, 0.5, 1.1)), fx = lerp(150, h.hand.R[0] + 20, k), fy = lerp(1080, h.hand.R[1] - 70, k) - Math.sin(k * Math.PI) * 120;
      const ha = 1 - prog(S.t, 1.0, 1.3); if (ha > 0) { x.save(); x.globalAlpha = ha; x.beginPath(); x.moveTo(-120, 1200); x.quadraticCurveTo(40, 1180, 120, 1110); x.lineWidth = 70; x.strokeStyle = A.OL; x.lineCap = 'round'; x.stroke(); x.lineWidth = 56; x.strokeStyle = '#8fd36a'; x.stroke(); x.beginPath(); x.arc(140, 1100, 44, 0, 7); A.fs(x, '#8fd36a', 9); x.restore(); }
      drawIto(x, fx, fy, 60, S.T, { shadow: false });
    } });
  add({ name: 'Stitched up (dusty battlefield at dusk): Doflamingo, still grinning, sews a wound on his chest shut with white string', t0: tStitch, t1: end('users'), bg: 'battleRuins',
    cam: [[1.25, 540, 900, -0.02], [1.32, 540, 880, 0.02]], sfx: [[0.2, 'swish'], [0.6, 'swish']],
    draw(x, S) { const h = person(x, S, 'doflamingo', 'grin', 540, 1800, 0.9, { seed: 8, pose: 'shrug' }); stitches(x, h.head[0], h.head[1] + 400, 300, ease.outCubic(prog(S.t, 0.1, S.dur - 0.2))); fingerStrings(x, h.hand.L[0], h.hand.L[1], h.head[0] - 100, h.head[1] + 400, 1, 2); } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (cosy living room): the host holds up a giant, perfect cat\'s cradle between his hands; gold UNDEFEATED banner', t0: st('joke'), t1: end('joke'), bg: 'cozyRoom',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['UNDEFEATED', 'gold', W('joke', /^cat/) - 0.1, end('joke')]], sfx: [[0.3, 'swish'], [W('joke', /^cradle/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      const h = person(x, S, 'host', 'smug', 540, 1780, 0.8, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug', talk: true });
      if (S.t > 0.3) catsCradle(x, h.hand.L, h.hand.R);
      A.sparkle(x, 540, h.hand.L[1] - 160, 34 * Math.abs(Math.sin(S.T * 4)));
    } });

  // ---------------- OUTRO ----------------
  const tDesk = st('outro') + L.outro.voStart + L.outro.voDur + 0.35;
  add({ name: 'Outro (purple rays): host with big ? marks, the gourd fruit swinging on a thread; pink NEXT? banner', t0: st('outro'), t1: tDesk, bg: 'rays:purple',
    cam: [[1.0, 540, 960, 0], [1.1, 540, 930, 0.03]], banners: [['NEXT?', 'pink', st('outro') + 0.3, tDesk]], sfx: [[0, 'whoosh'], [0.3, 'pop'], [0.8, 'pop'], [1.4, 'pop']],
    draw(x, S) {
      A.gogo(x, 90, 300, S.T, 0.8 * pop(S.T, S.t0 + 0.2));
      person(x, S, 'host', 'smug', 540, 1760, 0.8, { pop: S.t0 + 0.05, talk: true, seed: 12, pose: 'shrug' });
      A.mark(x, '?', 200, 640, 1.3 * pop(S.T, S.t0 + 0.8), -0.2); A.mark(x, '?', 880, 600, 1.1 * pop(S.T, S.t0 + 1.4), 0.25);
      const p = pop(S.T, S.t0 + 2.0), fx = 860 + Math.sin(S.T * 2) * 40; if (p > 0) { string(x, 860, -100, fx, 1120, 4); drawIto(x, fx, 1200, 70 * p, S.T, { shadow: false }); }
    } });
  add({ name: 'Back in the desk room: host sips coffee, steam rising', t0: tDesk, t1: TL.duration, bg: 'desk',
    cam: [[1.12, 540, 1000, 0], [1.18, 540, 990, 0]], sfx: [[0.2, 'sip']],
    draw(x, S) {
      const h = person(x, S, 'host', 'calm', 540, 1900, 0.8, { seed: 13, pose: S.t > 0.25 && S.t < 1.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S, { plate: true });
    } });

  shots.forEach((s, i) => { s.i = i; s.sfx = (s.sfx || []).map(([t, n]) => [s.t0 + t, n]); });
  return shots;
}
