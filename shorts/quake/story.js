// Shot plan for the Gura Gura no Mi (Tremor-Tremor Fruit) short. New sets and effects; same script skeleton.
import * as A from '/engine/art.js';
import { drawGura } from '/shorts/quake/fruit.js';
import { F, ease, prog, lerp, pop, person, deskFront, halo, evolve } from '/engine/kit.js';

// ---------------- quake effects ----------------
function shockBubble(x, cx, cy, r, t, a = 1) { // the bubble of shockwaves around a fist
  if (r <= 0) return;
  x.save(); x.globalAlpha = a;
  A.glow(x, cx, cy, r * 1.6, '200,235,255', 0.6);
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = 'rgba(220,240,255,0.35)'; x.fill(); x.lineWidth = Math.max(6, r * 0.05); x.strokeStyle = A.OL; x.stroke();
  x.lineWidth = Math.max(4, r * 0.03); x.strokeStyle = 'rgba(255,255,255,0.9)';
  for (let i = 0; i < 3; i++) { const rr = r * (0.45 + ((t * 1.5 + i / 3) % 1) * 0.5); x.beginPath(); x.arc(cx, cy, rr, 0, 7); x.stroke(); }
  x.beginPath(); x.arc(cx, cy, r * 0.82, Math.PI * 1.1, Math.PI * 1.45); x.lineWidth = r * 0.08; x.strokeStyle = '#fff'; x.stroke();
  x.restore();
}
function cracks(x, cx, cy, R, k, seed = 1, lw = 9) { // glass-like cracks spreading from a point (k: 0..1)
  if (k <= 0) return;
  x.save(); x.lineCap = 'round'; x.lineJoin = 'round';
  for (const [w, col] of [[lw * 2.2, A.OL], [lw, '#ffffff']]) {
    x.lineWidth = w; x.strokeStyle = col;
    for (let i = 0; i < 12; i++) { let px = cx, py = cy, a = i / 12 * Math.PI * 2 + A.hash(seed + i) * 0.4; x.beginPath(); x.moveTo(px, py);
      const n = Math.ceil(7 * k); for (let j = 0; j < n; j++) { a += (A.hash(seed * 31 + i * 7 + j) - 0.5) * 0.7; px += Math.cos(a) * R / 7; py += Math.sin(a) * R / 7; x.lineTo(px, py); } x.stroke(); }
    for (let r = 1; r <= Math.floor(3 * k); r++) { x.beginPath(); for (let i = 0; i <= 12; i++) { const a = i / 12 * Math.PI * 2, rr = R * r / 4 * (0.85 + A.hash(seed + r * 13 + i) * 0.3); x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.stroke(); }
  }
  x.restore();
}
function chasm(x, y, k, t) { // the ground splitting in two
  if (k <= 0) return;
  x.beginPath(); x.moveTo(-100, y);
  for (let i = 0; i <= 24; i++) { const px = -100 + i * 55; x.lineTo(px, y - 30 * k + (A.hash(i) - 0.5) * 60 * k); }
  for (let i = 24; i >= 0; i--) { const px = -100 + i * 55; x.lineTo(px, y + 120 * k + (A.hash(i + 50) - 0.5) * 70 * k); }
  x.closePath(); A.fs(x, '#140c18', 12);
  for (let i = 0; i < 10; i++) { const ph = (t * 1.2 + A.hash(i)) % 1; x.fillStyle = '#9a6a4a'; x.globalAlpha = 1 - ph; x.beginPath(); x.arc(A.hash(i + 3) * 1080, y - ph * 300, 14 + A.hash(i + 4) * 14, 0, 7); x.fill(); x.globalAlpha = 1; }
}
function tsunami(x, h, t, cx = 540) { // a towering curling wave of height h (px) rising from the bottom
  if (h <= 0) return;
  const top = 1920 - h;
  x.beginPath(); x.moveTo(-100, 2000); x.lineTo(-100, top + 160);
  x.bezierCurveTo(200, top + 60, cx - 100, top - 40, cx + 200, top + 10); x.bezierCurveTo(cx + 360, top + 40, cx + 330, top + 200, cx + 230, top + 210);
  x.bezierCurveTo(cx + 300, top + 120, cx + 180, top + 90, cx + 120, top + 160); x.bezierCurveTo(cx + 260, top + 300, 1000, top + 380, 1200, top + 420); x.lineTo(1200, 2000); x.closePath();
  const g = x.createLinearGradient(0, top, 0, 1920); g.addColorStop(0, '#5fc0ff'); g.addColorStop(1, '#1d5fae'); x.fillStyle = g; x.fill(); x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke();
  x.lineWidth = 16; x.strokeStyle = '#ffffff'; x.beginPath(); x.moveTo(-60, top + 180); x.bezierCurveTo(200, top + 90, cx - 100, top - 10, cx + 190, top + 40); x.stroke();
  for (let i = 0; i < 12; i++) { const ph = (t * 1.5 + A.hash(i)) % 1; x.beginPath(); x.arc(cx + 120 + A.hash(i + 2) * 220, top + 20 - ph * 120, 12 + A.hash(i + 3) * 14, 0, 7); x.fillStyle = `rgba(255,255,255,${1 - ph})`; x.fill(); }
}
function crackedEarth(x, cx, cy, r, k, t) {
  A.globe(x, cx, cy, r, t * 0.3);
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip(); cracks(x, cx, cy, r * 1.1, k, 7, 8); x.restore();
  A.glow(x, cx, cy, r * 1.5 * k, '255,80,60', 0.35 * k);
}
function massageChair(x, cx, by, s) { x.save(); x.translate(cx, by); x.scale(s, s);
  A.rrect(x, -120, -420, 240, 300, 60); A.fs(x, '#5a4a6a', 11); A.rrect(x, -150, -150, 300, 120, 30); A.fs(x, '#5a4a6a', 11); A.rrect(x, -90, -30, 180, 30, 10); A.fs(x, '#3a3346', 9);
  A.rrect(x, -110, -330, 220, 110, 20); A.fs(x, '#ffffff', 9); x.font = `64px ${A.FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#e8302e'; x.fillText('SOLD', 0, -273); x.restore(); }
// form icons for the pedestals and evolve transitions
export function quakeIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { A.fist(x, 0, 0, 0.5, '#22a99a'); shockBubble(x, 30, 0, 90, t); }
  else if (k === 2) { A.rrect(x, -130, -20, 260, 100, 14); A.fs(x, '#a26a38', 10); x.beginPath(); x.moveTo(-10, -20); x.lineTo(15, 20); x.lineTo(-15, 45); x.lineTo(10, 80); x.lineWidth = 14; x.strokeStyle = A.OL; x.stroke(); cracks(x, 0, -60, 90, 0.8, 3, 5); }
  else if (k === 3) { x.save(); x.translate(0, 0); x.scale(0.22, 0.22); x.translate(-540, -1700); tsunami(x, 600, t); x.restore(); }
  else { x.rotate(-0.35 + Math.sin(t * 2) * 0.05); x.beginPath(); x.rect(-130, -80, 260, 80); A.fs(x, '#7ac6ff', 8); x.beginPath(); x.rect(-130, 0, 260, 80); A.fs(x, '#1f6fbf', 8); x.lineWidth = 6; x.strokeStyle = '#fff'; x.beginPath(); x.moveTo(-100, 30); x.quadraticCurveTo(-70, 15, -40, 30); x.moveTo(20, 50); x.quadraticCurveTo(50, 35, 80, 50); x.stroke(); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const L = Object.fromEntries(TL.lines.map((l) => [l.id, l]));
  const W = (id, re) => { const l = L[id], w = l.words.find((w) => re.test(w.w)); if (!w) throw new Error(`word ${re} not in ${id}`); return l.start + w.t; };
  const end = (id) => L[id].start + L[id].dur, st = (id) => L[id].start;
  const shots = [], add = (o) => shots.push(o);

  // ---------------- HOOK ----------------
  const tDrop = 0.55, tShock = 0.9, tBite = W('hook', /^bite/), s2 = tBite - 0.4;
  add({ name: 'Hook (desk room): host sips coffee, the blue pear drops onto the plate, wide-eyed shock with !?', t0: 0, t1: s2, bg: 'desk',
    cam: [[1.0, 540, 980, 0], [1.07, 540, 950, 0]], sfx: [[0.1, 'sip'], [tDrop - 0.25, 'fall'], [tDrop + 0.3, 'thunk'], [tShock, 'shock']],
    draw(x, S) {
      const h = person(x, S, 'host', S.t < tShock ? 'calm' : 'shock', 540, 1900, 0.8, { pose: S.t > 0.05 && S.t < 0.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S);
      const k = prog(S.t, tDrop - 0.3, tDrop + 0.3);
      drawGura(x, 290, lerp(-200, 1330, ease.outBounce(k)), 82, S.T * 0.6, { shadow: false });
      if (S.t > tDrop + 0.3 && S.t < tDrop + 0.3 + 7 * F) S.shake = 0.6;
      if (S.t > tShock) A.mark(x, '!?', h.head[0] + 230, h.head[1] - 230, pop(S.T, tShock));
    } });
  add({ name: 'The bite (desk close-up): dip, bite, disgusted face, then the whole desk starts rattling; pink YOUR FRUIT banner', t0: s2, t1: end('hook'), bg: 'desk',
    cam: [[1.4, 500, 1010, 0.02], [1.5, 490, 1000, 0.035]], banners: [['YOUR FRUIT', 'pink', W('hook', /^fruit/) - 0.1, end('hook')]],
    sfx: [[tBite - s2, 'crunch'], [tBite - s2 + 0.2, 'rumble'], [W('hook', /^weird/) - s2, 'yuck']],
    draw(x, S) {
      const bt = tBite - s2, bitten = S.t >= bt, atMouth = S.t > bt - 0.35 && S.t < bt + 0.45, dip = S.t > bt - 2 * F && S.t < bt ? 16 : 0;
      const jit = bitten ? Math.sin(S.T * 70) * 6 : 0;
      const h = person(x, S, 'host', bitten ? 'yuck' : 'calm', 540 + jit, 1900, 0.8, { pose: atMouth ? 'sip' : 'hold' });
      x.save(); x.translate(-jit, 0); deskFront(x, S); A.mug(x, 830 + jit * 2, 1330 - Math.abs(jit), 0.75, S.T, true, false); x.restore();
      const fx = h.hand.R[0] - 18, fy = h.hand.R[1] - 48 + dip; drawGura(x, fx, fy, 56, S.T * 0.4, { shadow: false });
      if (bitten) { x.beginPath(); x.arc(fx + 40, fy - 30, 22, 0, 7); x.fillStyle = '#e6f2ff'; x.fill(); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke(); S.shake = Math.max(S.shake, 0.25); }
      S.flash = Math.max(S.flash, 0.45 * (1 - prog(S.t, bt, bt + 0.25)) * (bitten ? 1 : 0));
      if (bitten) A.mark(x, '!?', 820, 560, pop(S.T, tBite + 0.1));
    } });
  add({ name: 'Don\'t panic (lime zigzag backdrop): the host is still vibrating, holds up the bitten pear, calms down', t0: st('calm'), t1: end('calm'), bg: 'zigzag',
    cam: [[1.06, 540, 1000, -0.02], [1.12, 540, 990, 0.01]], sfx: [[0, 'whoosh'], [0.1, 'rumble'], [W('calm', /^Devil/) - st('calm'), 'shimmer']],
    draw(x, S) {
      const tj = W('calm', /^just/) - S.t0, vib = (1 - prog(S.t, tj, tj + 0.5)) * 8;
      const h = person(x, S, 'host', S.t < tj ? 'worried' : 'calm', 520 + Math.sin(S.T * 70) * vib, 1760, 0.8, { talk: true, seed: 1, pose: 'holdUp' });
      if (S.t < tj) A.sweat(x, h.head[0] + 190, h.head[1] - 60, pop(S.T, S.t0 + 0.3));
      drawGura(x, h.hand.R[0] + 20, h.hand.R[1] - 70, 60, S.T * 0.4, { shadow: false });
      const td = W('calm', /^Devil/) - S.t0; A.sparkle(x, h.hand.R[0] - 20, h.hand.R[1] - 150, 36 * Math.sin(Math.PI * prog(S.t, td, td + 0.6)));
      for (let i = 0; i < 3; i++) { x.lineWidth = 6; x.strokeStyle = 'rgba(27,21,48,0.6)'; x.beginPath(); x.arc(h.head[0], h.head[1], 280 + i * 40 + Math.sin(S.T * 30) * 6 * vib / 8, Math.PI * 1.15, Math.PI * 1.35); x.stroke(); x.beginPath(); x.arc(h.head[0], h.head[1], 280 + i * 40, -Math.PI * 0.35, -Math.PI * 0.15); x.stroke(); }
    } });

  // ---------------- OUT OF EVERY FRUIT + NAME ----------------
  const tName = W('name', /^Tremor-Tremor/) - 0.15, tThat = W('type', /^that/) - 0.1;
  add({ name: 'Out of every fruit: green rays, pink ゴ marks, spinning globe, dark unnamed fruit silhouettes', t0: st('sea'), t1: tName, bg: 'rays:green',
    cam: [[1.0, 540, 900, 0], [1.1, 540, 880, 0.04]], sfx: [[0, 'whoosh'], [0.1, 'rumble']],
    draw(x, S) {
      A.globe(x, 540, 860, 230 * pop(S.T, S.t0 + 0.05), S.T);
      for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + S.T * 0.6, p = pop(S.T, S.t0 + 0.12 + i * 0.18); if (p > 0) A.fruitSilhouette(x, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 300, 70 * p, i + 2); }
      A.gogo(x, 110, 330, S.T, pop(S.T, S.t0 + 0.1)); A.gogo(x, 800, 1020, S.T + 1, 0.7 * pop(S.T, S.t0 + 0.6));
    } });
  add({ name: 'Fruit reveal (cracked-glass sky): the Tremor-Tremor Fruit vibrates while cracks spread around it; pink TREMOR-TREMOR FRUIT banner', t0: tName, t1: tThat, bg: 'crackSky',
    cam: [[1.05, 540, 900, -0.02], [1.16, 540, 880, 0]], banners: [['TREMOR-TREMOR FRUIT', 'pink', tName + 0.1, tThat]], sfx: [[0, 'whoosh'], [0.1, 'ding'], [0.3, 'quake']],
    draw(x, S) {
      halo(x, 540, 880, 470, '120,180,255', S.T);
      cracks(x, 540, 880, 520, ease.outCubic(prog(S.t, 0.3, 1.6)), 5, 7);
      drawGura(x, 540 + Math.sin(S.T * 60) * 6, 900, 250 * pop(S.T, S.t0), S.t * 0.7);
      S.shake = Math.max(S.shake, 0.12);
    } });

  // ---------------- SHAKE ANYTHING + STAGE ----------------
  const tGives = W('type', /^gives/) - 0.1;
  add({ name: 'Shake anything (fruit market): the host taps a stall and the whole street jumps, fruit bouncing everywhere', t0: tThat, t1: tGives, bg: 'market',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 560, 990, 0.04]], sfx: [[0.25, 'quake'], [0.4, 'pops']],
    draw(x, S) {
      const tap = 0.25, q = S.t > tap ? 1 - prog(S.t, tap + 0.6, tap + 1.4) * 0.6 : 0;
      const h = person(x, S, 'host', S.t > tap ? 'grin' : 'calm', 360, 1780, 0.72, { seed: 2, pose: S.t > tap - 0.1 && S.t < tap + 0.3 ? 'punch' : 'idle' });
      if (S.t > tap) { shockBubble(x, h.hand.R[0], h.hand.R[1], 70 * pop(S.T, S.t0 + tap) * (1 - prog(S.t, tap + 0.3, tap + 0.6)), S.T); S.shake = Math.max(S.shake, 0.45 * q); }
      for (let i = 0; i < 14; i++) { const ph = ((S.t - tap) * 2 + A.hash(i)) % 1; if (S.t < tap) continue; x.beginPath(); x.arc(80 + A.hash(i + 1) * 920, 900 - Math.abs(Math.sin(ph * Math.PI)) * 240 * q, 24, 0, 7); A.fs(x, ['#ff9a2e', '#e8402e', '#ffd23f', '#9be37a'][i % 4], 6); }
    } });
  const pw = [W('type', /^gives/), W('type', /^whole/), W('type', /^quake/), W('type', /^powers/)], lvl = pw[3] + 0.4;
  const stageDraw = (x, S) => {
    const xs = [165, 415, 665, 915], lit = pw.filter((t) => S.T >= t).length;
    const fill = lit === 0 ? 0 : (lit - 1) / 4 + 0.25 * ease.outCubic(prog(S.T, pw[lit - 1], pw[lit - 1] + 0.3));
    A.progressBar(x, 540, 560, 900, fill, S.T > lvl ? 'LEVEL UP!' : 'QUAKE POWERS');
    if (S.T > lvl) { A.shineLines(x, 540, 560, 470, 620, S.T, 12); S.shake = Math.max(S.shake, 0.3 * (1 - prog(S.T, lvl, lvl + 0.4))); }
    xs.forEach((px, i) => {
      if (i === lit - 1) halo(x, px, 860, 210, i === 3 ? '255,220,90' : '120,200,255', S.T);
      A.pedestal(x, px, 990, `FORM ${i + 1}`, i < lit);
      const p = pop(S.T, pw[i]); if (p > 0) quakeIcon(x, i + 1, px, 860 + Math.sin(S.T * 2 + i) * 10, 0.62 * p, S.T);
      else { x.font = `110px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillText('?', px, 900); }
    });
  };
  add({ name: 'Rocky quarry stage: FORM 1-4 quake powers pop onto pedestals one per word, the bar fills, LEVEL UP with a jolt', t0: tGives, t1: end('type'), bg: 'quarry',
    cam: [[1.0, 540, 980, 0], [1.12, 600, 900, 0.03]], sfx: [[0, 'whoosh'], ...pw.map((t) => [t - tGives, 'pop']), [lvl - tGives, 'levelup']], draw: stageDraw });

  // ---------------- FORM 1: shock bubble fist / cracks the air ----------------
  const tOne = W('form1', /^one$/) - 0.1, tCracks = W('form1', /^cracks/);
  add({ name: 'Form 1 close-up (flower meadow): a giant fist wrapped in a bubble of shockwaves, yellow shine lines; scope overlay', t0: st('form1'), t1: tOne, bg: 'meadow',
    cam: [[1.1, 540, 960, -0.03], [1.2, 540, 940, -0.01]], sfx: [[0.1, 'charge'], [W('form1', /^bubble/) - st('form1'), 'hum']],
    draw(x, S) {
      const p = ease.outBack(prog(S.t, 0.1, 0.5)), tb = W('form1', /^bubble/) - S.t0;
      A.fist(x, 560, 960, 2.2 * p, '#22a99a', -0.1);
      shockBubble(x, 600, 950, 340 * pop(S.T, S.t0 + tb), S.T);
      A.shineLines(x, 600, 950, 380, 560, S.T, 14);
      S.shake = Math.max(S.shake, 0.1);
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.5); if (p <= 0) return; x.save(); x.translate(860, 470); x.scale(p, p);
      A.scopeOverlay(x, 0, 0, 150, S.T, (c) => { person(c, S, 'brute', 'worried', 0, 180, 0.17, { seed: 4, pose: 'shrug' }); });
      x.font = `44px ${A.FONT}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = A.OL; x.strokeText('TARGET', 0, 200); x.fillStyle = '#5fe07a'; x.fillText('TARGET', 0, 200); x.restore(); } });
  add({ name: 'Form 1 reaction (dojo): one punch cracks the air like glass in front of the brute; brute shocked !?', t0: tOne, t1: end('form1'), bg: 'dojo',
    cam: [[1.1, 600, 1000, 0.03], [1.04, 580, 990, 0.01]], sfx: [[tCracks - tOne - 0.1, 'whoosh'], [tCracks - tOne, 'glass'], [tCracks - tOne + 0.05, 'quake']],
    draw(x, S) {
      const tc = tCracks - S.t0, hit = S.t > tc;
      const e = person(x, S, 'brute', hit ? 'shock' : 'smug', 800, 1780, 0.72, { seed: 3, flip: true, pose: hit ? 'shrug' : 'idle', pop: S.t0 + 0.02 });
      const h = person(x, S, 'host', 'shout', 260, 1780, 0.72, { seed: 2, pose: S.t > tc - 0.15 ? 'punch' : 'idle' });
      if (S.t > tc - 0.15) shockBubble(x, h.hand.R[0] + 20, h.hand.R[1], 80, S.T);
      cracks(x, 560, 1000, 480, ease.outCubic(prog(S.t, tc, tc + 0.35)), 9, 8);
      if (hit && S.t < tc + 7 * F) S.shake = 1;
      if (hit) A.mark(x, '!?', e.head[0] - 200, e.head[1] - 230, pop(S.T, S.t0 + tc + 0.15));
    } });

  // ---------------- FORM 2: punch the ground, the island splits ----------------
  const tAndIsland = W('form2', /^and$/) - 0.1;
  add({ name: 'Form 2 evolve (seismograph paper): ghost of the bubble fist dissolves into the split-ground icon, flash + glow ring; gold FORM 2 banner; the pen trace spikes', t0: st('form2'), t1: tAndIsland, bg: 'seismo',
    cam: [[1.0, 540, 900, 0], [1.08, 560, 890, -0.02]], banners: [['FORM 2', 'gold', st('form2') + 0.3, tAndIsland, 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('form2', /^ground/) - st('form2'), 'quake']],
    draw(x, S) {
      evolve(x, S, 1, 2, 540, 820, 1.5, 0.45, quakeIcon);
      const g = prog(S.t, 0.5, 1.6); x.beginPath(); for (let k = 0; k <= 100 * g; k++) { const a = (k > 55 ? 150 : 16) * (A.hash(k + 7) - 0.5) * 2; x.lineTo(60 + k * 9.6, 1200 + a); } x.lineWidth = 8; x.strokeStyle = '#e8302e'; x.stroke();
      S.shake = Math.max(S.shake, 0.4 * prog(S.t, 1.0, 1.4));
    } });
  add({ name: 'Form 2 outdoor (red-rock canyon): the ground splits open in a huge chasm under the brute; MAGNITUDE meter climbs', t0: tAndIsland, t1: end('form2'), bg: 'canyon',
    cam: [[1.05, 540, 1060, 0.03], [1.12, 540, 1040, 0.05]], sfx: [[0, 'quake'], [0.1, 'crumble']],
    draw(x, S) {
      chasm(x, 1380, ease.outCubic(prog(S.t, 0.05, 0.8)), S.T);
      const e = person(x, S, 'brute', 'worried', 760 + Math.sin(S.T * 40) * 6, 1300, 0.6, { seed: 5, pose: 'shrug', rot: Math.sin(S.T * 6) * 0.08 });
      A.sweat(x, e.head[0] + 130, e.head[1] - 40, pop(S.T, S.t0 + 0.5));
      A.mark(x, '!?', e.head[0] - 170, e.head[1] - 200, pop(S.T, S.t0 + 0.4));
      S.shake = Math.max(S.shake, S.t < 7 * F + 0.05 ? 1.2 : 0.35);
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.1); if (p <= 0) return; x.save(); x.translate(70, 520); x.scale(p, p); A.meterOverlay(x, 0, 0, 380, ease.outCubic(prog(S.t, 0.1, 1.2)), 'MAGNITUDE'); x.restore(); } });

  // ---------------- FORM 3: shake the sea, tsunamis ----------------
  const tCrash = W('form3', /^crashing/) - 0.1;
  add({ name: 'Form 3 evolve (lighthouse coast): split-ground icon becomes the wave; the host shakes the sea and a giant tsunami rises; magnifier shows the tiny brute in a swirl; gold FORM 3 banner', t0: st('form3'), t1: tCrash, bg: 'lighthouse',
    cam: [[1.0, 540, 980, -0.02], [1.08, 520, 960, 0]], banners: [['FORM 3', 'gold', st('form3') + 0.3, tCrash, 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [0.6, 'waves'], [W('form3', /^tsunamis/) - st('form3'), 'rumble']],
    draw(x, S) {
      if (S.t < 0.5) evolve(x, S, 2, 3, 540, 820, 1.5, 0.45, quakeIcon);
      tsunami(x, 1300 * ease.outCubic(prog(S.t, 0.6, S.dur)), S.T, 420);
      const h = person(x, S, 'host', 'shout', 260, 1820, 0.62, { pop: S.t0 + 0.4, seed: 2, pose: 'cheer' });
      for (const k of ['L', 'R']) shockBubble(x, h.hand[k][0], h.hand[k][1], 50 * pop(S.T, S.t0 + 0.6), S.T);
      S.shake = Math.max(S.shake, 0.3 * prog(S.t, 0.6, S.dur));
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 1.0); if (p <= 0) return; x.save(); x.translate(820, 560); x.scale(p * 0.85, p * 0.85);
      A.magnifier(x, 0, 0, 175, S.T, (c) => { person(c, S, 'brute', 'worried', 0, 150, 0.17, { seed: 4, pose: 'shrug' }); }); x.restore(); } });
  add({ name: 'Form 3 hit (wooden docks): the tsunami crashes onto the brute; red impact star, 7-frame shake, !?', t0: tCrash, t1: end('form3'), bg: 'docks',
    cam: [[1.15, 540, 1000, 0.04], [1.05, 560, 990, 0.02]], sfx: [[0, 'splash'], [0.15, 'impact']],
    draw(x, S) {
      const ti = 0.15, hit = S.t > ti;
      const e = person(x, S, 'brute', hit ? 'hit' : 'worried', 620, 1700, 0.7, { seed: 6, pose: 'shrug', rot: hit ? -0.3 * prog(S.t, ti, ti + 0.4) : 0 });
      x.save(); x.translate(-600 + 900 * ease.outCubic(prog(S.t, 0, 0.5)), 0); tsunami(x, 900, S.T, 300); x.restore();
      A.impactStar(x, e.head[0], e.head[1] + 140, 260 * pop(S.T, S.t0 + ti) * (1 - prog(S.t, ti + 0.5, ti + 0.9)), 0.3);
      if (hit && S.t < ti + 7 * F) S.shake = 1.2;
      if (hit) A.mark(x, '!?', e.head[0] + 200, e.head[1] - 240, pop(S.T, S.t0 + ti + 0.25));
      for (let i = 0; i < 14; i++) A.bubble(x, 200 + A.hash(i) * 700, 1600 - ((S.T * 0.6 + A.hash(i + 1)) % 1) * 700, 10 + A.hash(i + 2) * 16);
    } });

  // ---------------- FORM 4: grab the air, tilt the sea ----------------
  const tTilts = W('form4', /^tilts/) - 0.15, tGrab = W('form4', /^grabs/);
  add({ name: 'Form 4 peak (open sea): evolve into the strongest form; the host grabs the air, cracks form in his fists; gold halo; gold FORM 4 banner', t0: st('form4'), t1: tTilts, bg: 'oceanWide',
    cam: [[1.0, 540, 980, 0], [1.1, 540, 940, 0.02]], banners: [['FORM 4', 'gold', st('form4') + 0.3, tTilts, 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [tGrab - st('form4'), 'glass']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, quakeIcon);
      else { const grab = S.T > tGrab; const h = person(x, S, 'host', grab ? 'shout' : 'grin', 540, 1780, 0.78, { pop: S.t0 + 0.45, seed: 7, pose: 'cheer' });
        if (grab) for (const k of ['L', 'R']) cracks(x, h.hand[k][0], h.hand[k][1], 220, ease.outCubic(prog(S.T, tGrab, tGrab + 0.4)), k === 'L' ? 11 : 12, 6);
        A.shineLines(x, h.head[0], h.head[1] + 200, 430, 640, S.T, 14); }
    } });
  add({ name: 'Form 4 tilt (same open sea): the host yanks the air and the whole sea tilts sideways behind him; ships slide; long shake', t0: tTilts, t1: end('form4'), bg: 'oceanWide',
    cam: [[1.05, 540, 980, 0.03], [1.12, 540, 960, 0.06]], sfx: [[0, 'quake'], [0.1, 'rumble'], [0.3, 'waves']],
    draw(x, S) {
      const k = ease.outBack(prog(S.t, 0, 0.8)); S.bgRoll = -0.32 * k; S.shake = Math.max(S.shake, 0.5);
      x.save(); x.translate(540, 1200); x.rotate(-0.32 * k); x.translate(-540, -1200);
      for (let i = 0; i < 3; i++) { const sx = 200 + i * 320 - 200 * k; x.save(); x.translate(sx, 1060); x.scale(0.35, 0.35); x.beginPath(); x.moveTo(-200, 0); x.lineTo(200, 0); x.lineTo(150, 90); x.lineTo(-150, 90); x.closePath(); A.fs(x, '#8a5a3c', 14); x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -260); x.lineTo(150, -60); x.closePath(); A.fs(x, '#f4ead2', 12); x.restore(); }
      x.restore();
      const h = person(x, S, 'host', 'shout', 540, 1820, 0.74, { seed: 7, pose: 'punch' });
      cracks(x, h.hand.R[0], h.hand.R[1], 260, 1, 12, 6);
      A.mark(x, '!?', 900, 520, pop(S.T, S.t0 + 0.5), 0.3);
    } });

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (red warning stripes): the host freezes, siren flashes; music-style sting, push-in with roll; red DANGER banner', t0: st('twist'), t1: end('twist'), bg: 'alarm', twist: true,
    cam: [[1.0, 540, 960, 0], [1.3, 540, 900, 0.07]], banners: [['DANGER', 'red', st('twist') + 0.2, end('twist')]], sfx: [[0, 'sting'], [0.2, 'siren']],
    draw(x, S) {
      const h = person(x, S, 'host', 'shock', 540, 1780, 0.8, { seed: 10, pose: 'shrug' });
      A.sweat(x, h.head[0] + 190, h.head[1] - 60, pop(S.T, S.t0 + 0.3)); A.mark(x, '!?', h.head[0] - 240, h.head[1] - 220, pop(S.T, S.t0 + 0.4), -0.2);
      if (Math.floor(S.T * 4) % 2) { S.flash = Math.max(S.flash, 0.25); S.flashCol = '255,40,40'; }
    } });
  add({ name: 'World-ending power (deep space): the Earth cracks apart under spreading quake lines, pulses and shakes', t0: st('truth'), t1: end('truth'), bg: 'space',
    cam: [[1.1, 540, 900, 0], [1.25, 540, 880, -0.04]], sfx: [[0, 'whoosh'], [W('truth', /^destroy/) - st('truth'), 'boom'], [W('truth', /^destroy/) - st('truth') + 0.1, 'glass']],
    draw(x, S) {
      const td = W('truth', /^destroy/), k = ease.outCubic(prog(S.T, td - 0.2, td + 0.8));
      crackedEarth(x, 540, 880, 360 * pop(S.T, S.t0 + 0.05), k, S.T);
      if (S.T > td && S.T < td + 7 * F) S.shake = 1.3;
      S.flash = Math.max(S.flash, 0.6 * (1 - prog(S.T, td, td + 0.3)) * (S.T > td ? 1 : 0)); S.flashCol = '255,120,90';
      for (let i = 0; i < 10; i++) { const ph = (S.T * 0.4 + A.hash(i)) % 1; if (k > 0.5) { x.save(); x.translate(540 + Math.cos(i * 2.1) * (380 + ph * 300), 880 + Math.sin(i * 2.1) * (380 + ph * 300)); x.rotate(ph * 6); x.beginPath(); x.moveTo(-20, -14); x.lineTo(22, -6); x.lineTo(4, 20); x.closePath(); A.fs(x, '#7fd36a', 5); x.restore(); } }
    } });

  // ---------------- USERS ----------------
  const tBB = W('users', /^Blackbeard/) - 0.15;
  add({ name: 'Past user (stone war plaza): Whitebeard stands tall with a shockwave bubble around his fist', t0: st('users'), t1: tBB, bg: 'plaza',
    cam: [[1.05, 540, 1000, -0.02], [1.12, 540, 980, 0]], sfx: [[0, 'whoosh'], [0.15, 'hum'], [0.3, 'ding']],
    draw(x, S) {
      const h = person(x, S, 'whitebeard', 'smug', 540, 1780, 0.86, { pop: S.t0 + 0.05, seed: 8, pose: 'cheer' });
      shockBubble(x, h.hand.R[0], h.hand.R[1], 90 * pop(S.T, S.t0 + 0.4), S.T);
      A.shineLines(x, h.hand.R[0], h.hand.R[1], 110, 220, S.T, 8);
    } });
  add({ name: 'Stolen (dark smoke): Blackbeard grins, the blue pear and a shockwave bubble now in his hand; !?', t0: tBB, t1: end('users'), bg: 'smoke',
    cam: [[1.15, 520, 980, 0.03], [1.25, 500, 960, 0.05]], sfx: [[0, 'sting'], [0.4, 'quake']],
    draw(x, S) {
      A.glow(x, 540, 1000, 600, '120,60,160', 0.5);
      const h = person(x, S, 'blackbeard', 'grin', 540, 1780, 0.82, { pop: S.t0 + 0.05, seed: 9, pose: 'holdUp' });
      drawGura(x, h.hand.R[0] + 10, h.hand.R[1] - 80, 64, S.T, { shadow: false }); shockBubble(x, h.hand.R[0] + 10, h.hand.R[1] - 70, 110 * pop(S.T, S.t0 + 0.35), S.T, 0.8);
      A.mark(x, '!?', h.head[0] - 240, h.head[1] - 220, pop(S.T, S.t0 + 0.6), -0.2);
    } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (calm spa): the host relaxes with a built-in vibration massage; the massage chair beside him is marked SOLD; gold FREE MASSAGE banner', t0: st('joke'), t1: end('joke'), bg: 'spa',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['FREE MASSAGE', 'gold', W('joke', /^massage/) - 0.1, end('joke')]], sfx: [[0.1, 'hum'], [W('joke', /^chair/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      massageChair(x, 850, 1500, 0.95 * pop(S.T, S.t0 + 0.4));
      const h = person(x, S, 'host', 'smug', 380 + Math.sin(S.T * 60) * 4, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug' });
      for (let i = 0; i < 3; i++) { x.lineWidth = 6; x.strokeStyle = 'rgba(27,21,48,0.5)'; x.beginPath(); x.arc(h.head[0], h.head[1] + 400, 300 + i * 40, Math.PI * 1.05, Math.PI * 1.25); x.stroke(); x.beginPath(); x.arc(h.head[0], h.head[1] + 400, 300 + i * 40, -Math.PI * 0.25, -Math.PI * 0.05); x.stroke(); }
      A.heart(x, h.head[0] + 200, h.head[1] - 150 - ((S.T * 0.8) % 1) * 80, 22 * pop(S.T, S.t0 + 0.8));
    } });

  // ---------------- OUTRO ----------------
  const tDesk = st('outro') + L.outro.voStart + L.outro.voDur + 0.35;
  add({ name: 'Outro (purple rays): host with big ? marks, the blue pear wobbling; pink NEXT? banner', t0: st('outro'), t1: tDesk, bg: 'rays:purple',
    cam: [[1.0, 540, 960, 0], [1.1, 540, 930, 0.03]], banners: [['NEXT?', 'pink', st('outro') + 0.3, tDesk]], sfx: [[0, 'whoosh'], [0.3, 'pop'], [0.8, 'pop'], [1.4, 'pop']],
    draw(x, S) {
      A.gogo(x, 90, 300, S.T, 0.8 * pop(S.T, S.t0 + 0.2));
      person(x, S, 'host', 'smug', 540, 1760, 0.8, { pop: S.t0 + 0.05, talk: true, seed: 12, pose: 'shrug' });
      A.mark(x, '?', 200, 640, 1.3 * pop(S.T, S.t0 + 0.8), -0.2); A.mark(x, '?', 880, 600, 1.1 * pop(S.T, S.t0 + 1.4), 0.25);
      drawGura(x, 860 + Math.sin(S.T * 40) * 4, 1200, 70 * pop(S.T, S.t0 + 2.0), S.T, { shadow: false });
    } });
  add({ name: 'Back in the desk room: host sips coffee, steam rising (the mug gives one last little rattle)', t0: tDesk, t1: TL.duration, bg: 'desk',
    cam: [[1.12, 540, 1000, 0], [1.18, 540, 990, 0]], sfx: [[0.2, 'sip']],
    draw(x, S) {
      const h = person(x, S, 'host', 'calm', 540, 1900, 0.8, { seed: 13, pose: S.t > 0.25 && S.t < 1.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16 + (S.t > 1.6 ? Math.sin(S.T * 70) * 4 : 0), h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S, { plate: true });
    } });

  shots.forEach((s, i) => { s.i = i; s.sfx = (s.sfx || []).map(([t, n]) => [s.t0 + t, n]); });
  return shots;
}
