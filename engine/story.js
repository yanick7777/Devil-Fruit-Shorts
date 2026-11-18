// Shot plan for the Mera Mera no Mi short. Every shot: background, camera keys, stage drawing, HUD overlay, SFX.
import * as A from './art.js';
import { drawFruit } from './fruit.js';

export const ease = {
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  smoother: (t) => t * t * t * (t * (t * 6 - 15) + 10),
  outBack: (t) => { const c = 2.2; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  outBounce: (t) => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375; return n * (t -= 2.625 / d) * t + 0.984375; },
};
export const clamp01 = (v) => Math.max(0, Math.min(1, v));
export const prog = (t, a, b) => clamp01((t - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const F = 1 / 30;
// pop-in with a small bounce over ~5 frames
export const pop = (T, t0) => (T < t0 ? 0 : 0.55 + 0.45 * ease.outBack(prog(T, t0, t0 + 5 * F)));

const memo = new Map();
const cached = (k, fn) => { if (!memo.has(k)) memo.set(k, fn()); return memo.get(k); };
// full-body figures are big canvases: keep a small LRU of them
const figs = new Map();
function figure(key, fn) {
  if (figs.has(key)) { const v = figs.get(key); figs.delete(key); figs.set(key, v); return v; }
  const v = fn(); figs.set(key, v); if (figs.size > 48) figs.delete(figs.keys().next().value); return v;
}

// --------------------------------------------------------------------------------------
// Full-body character with its feet at (cx, fy). Returns head and hand positions for props and marks.
export function person(x, S, who, expr, cx, fy, s = 1, o = {}) {
  const pose = o.pose || 'idle', flip = !!o.flip, P = A.POSES[pose];
  const info = { head: A.figPoint(...A.FIG.HEAD, cx, fy, s, flip), hand: { L: A.figPoint(...P.L[1], cx, fy, s, flip), R: A.figPoint(...P.R[1], cx, fy, s, flip) }, s };
  const p = o.pop != null ? pop(S.T, o.pop) : 1; if (p <= 0) return info;
  const seed = o.seed || 0, blink = ((S.T + seed) % 3.3) < 0.11;
  let mouth = 0;
  if (o.talk && S.speaking) { const m = Math.abs(Math.sin(S.T * 13.5)) * (0.55 + 0.45 * Math.sin(S.T * 5.3 + 1)); mouth = m > 0.5 ? 1 : m > 0.18 ? 0.5 : 0; }
  const c = figure(`p:${who}|${expr}|${mouth}|${blink}|${pose}`, () => A.drawPerson({ who, expr, mouth, blink, pose }));
  const br = 1 + Math.sin(S.T * 2.4 + seed) * 0.01;
  x.save(); x.globalAlpha = o.alpha ?? 1; x.translate(cx, fy); x.rotate((o.rot || 0) + Math.sin(S.T * 1.1 + seed) * 0.012);
  x.scale(s * p * (flip ? -1 : 1), s * p * br); x.drawImage(c, -A.FIG.W / 2, -A.FIG.FEET); x.restore();
  return info;
}
// where a figure's head will be (for marks drawn before or without the figure)
const headAt = (cx, fy, s) => A.figPoint(...A.FIG.HEAD, cx, fy, s);
function rowboat(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.moveTo(-260, -40); x.lineTo(260, -40); x.quadraticCurveTo(230, 90, 0, 100); x.quadraticCurveTo(-230, 90, -260, -40); A.fs(x, '#a26d45', 12); x.strokeStyle = 'rgba(60,30,15,0.5)'; x.lineWidth = 6; x.beginPath(); x.moveTo(-230, 10); x.lineTo(230, 10); x.stroke(); x.restore(); }

function deskFront(x, S, { plate = true } = {}) {
  x.fillStyle = '#ecebf3'; x.fillRect(-100, 1380, 1300, 120); x.fillStyle = '#c9c3d8'; x.fillRect(-100, 1500, 1300, 50);
  x.fillStyle = '#9db4c4'; x.fillRect(-100, 1550, 1300, 600);
  x.lineWidth = 10; x.strokeStyle = A.OL; x.beginPath(); x.moveTo(-100, 1380); x.lineTo(1300, 1380); x.moveTo(-100, 1500); x.lineTo(1300, 1500); x.stroke();
  if (plate) { x.save(); x.translate(290, 1430); x.scale(1, 0.22); x.beginPath(); x.arc(0, 0, 210, 0, 7); x.restore(); x.fillStyle = '#d6ecfa'; x.fill(); x.lineWidth = 10; x.stroke();
    x.save(); x.translate(290, 1424); x.scale(1, 0.15); x.beginPath(); x.arc(0, 0, 150, 0, 7); x.restore(); x.lineWidth = 5; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke(); }
}
// form icons: 1 fire body (flaming hand), 2 flaming fist, 3 fire flies, 4 flame emperor sun
export function formIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { A.glow(x, 0, -20, 170, '255,140,40', 0.5); A.openHand(x, 0, 0, 0.55); for (let i = 0; i < 5; i++) A.flame(x, -60 + i * 30, -20 + Math.abs(i - 2) * 8, 46, 110, t, i); }
  else if (k === 2) { A.glow(x, 30, 0, 180, '255,120,30', 0.5); for (let i = 0; i < 4; i++) { x.save(); x.translate(40, 0); x.rotate(Math.PI / 2); A.flame(x, (i - 1.5) * 26, -10, 90 - i * 10, 170, t, i + 10); x.restore(); } A.fist(x, 0, 0, 0.55, '#22a99a'); }
  else if (k === 3) { for (let i = 0; i < 7; i++) { const a = i / 7 * 6.283 + t * 1.5; A.firefly(x, Math.cos(a) * 80, Math.sin(a) * 60 - 10, 0.8, t, i); } }
  else { A.glow(x, 0, 0, 200, '255,170,40', 0.6); A.sun(x, 0, 0, 85, t); }
  x.restore();
}
function evolve(x, S, oldK, newK, cx, cy, s, d = 0.45) {
  const k = prog(S.t, 0, d);
  if (k < 1) { x.save(); x.globalAlpha = 1 - k; formIcon(x, oldK, cx, cy, s * (1 + 0.35 * k), S.T); x.restore(); }
  x.save(); x.globalAlpha = Math.min(1, k * 1.4); formIcon(x, newK, cx, cy, s * (0.75 + 0.25 * ease.outBack(k)), S.T); x.restore();
  A.glowRing(x, cx, cy, 120 + 420 * ease.outCubic(prog(S.t, 0.05, 0.6)), 1 - prog(S.t, 0.1, 0.6));
  S.flash = Math.max(S.flash, 0.85 * Math.sin(Math.PI * prog(S.t, 0.05, 0.4))); S.flashCol = '255,246,200';
}
function halo(x, cx, cy, r, rgb, t) { A.glow(x, cx, cy, r * (1 + 0.04 * Math.sin(t * 3)), rgb, 0.75); x.save(); x.globalAlpha = 0.5; x.lineWidth = 10; x.strokeStyle = `rgba(${rgb},1)`; x.beginPath(); x.arc(cx, cy, r * 0.62, 0, 7); x.stroke(); x.restore(); }
function enemyShip(x, cx, cy, s, t, smoke = 0) {
  x.save(); x.translate(cx, cy + Math.sin(t * 2) * 6); x.rotate(Math.sin(t * 1.5) * 0.03); x.scale(s, s);
  x.lineWidth = 12; x.strokeStyle = A.OL; x.beginPath(); x.moveTo(0, 40); x.lineTo(0, -260); x.stroke(); x.lineWidth = 6; x.strokeStyle = '#8a5a3c'; x.stroke();
  x.beginPath(); x.moveTo(10, -240); x.quadraticCurveTo(170, -150, 150, -30); x.lineTo(10, -30); x.closePath(); A.fs(x, '#f4ead2', 9);
  x.beginPath(); x.moveTo(0, -260); x.lineTo(-90, -240); x.lineTo(0, -215); x.closePath(); A.fs(x, '#7b3fb5', 7);
  x.beginPath(); x.moveTo(-200, 20); x.lineTo(220, 20); x.lineTo(170, 110); x.lineTo(-160, 110); x.closePath(); A.fs(x, '#8a5a3c', 11);
  x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 5; x.beginPath(); x.moveTo(-180, 55); x.lineTo(200, 55); x.stroke();
  for (let i = 0; i < 6 * smoke; i++) { const ph = (t * 0.6 + i / 6) % 1; x.globalAlpha = (1 - ph) * 0.8; x.beginPath(); x.arc(-40 + Math.sin(i) * 60, -60 - ph * 300, 30 + ph * 50, 0, 7); x.fillStyle = '#5a5566'; x.fill(); }
  x.restore();
}
function fireBody(x, S, cx, fy, s, amt) { // flames hugging a full-body figure (feet at fy)
  if (amt <= 0) return;
  const [hx, hy] = headAt(cx, fy, s);
  A.glow(x, cx, fy - 760 * s, 1050 * s * amt, '255,140,40', 0.5);
  for (let i = 0; i <= 10; i++) { const a = Math.PI * (1.02 + i * 0.096); A.flame(x, hx + Math.cos(a) * 250 * s, hy + Math.sin(a) * 260 * s + 60 * s, 110 * s * amt, 220 * s * amt, S.T, i); }
  for (let k = 0; k < 6; k++) for (const sd of [-1, 1]) A.flame(x, cx + sd * (215 - k * 6) * s, fy - (1000 - k * 170) * s, 120 * s * amt, 230 * s * amt, S.T, k * 2 + (sd > 0 ? 1 : 0) + 20);
}

// fruit with a bite taken out of it
function bittenFruit(x, cx, cy, R, rot, bitten) {
  if (R <= 0) return;
  const S2 = Math.ceil(R * 3), c = cached(`bf:${S2}`, () => A.mk(S2, S2)), bx = c.getContext('2d');
  bx.clearRect(0, 0, S2, S2); drawFruit(bx, S2 / 2, S2 / 2 + R * 0.1, R, rot, { shadow: false });
  if (bitten) {
    const bxs = [[0.72, -0.35], [0.95, 0.05], [0.8, -0.72]].map(([u, v]) => [S2 / 2 + u * R, S2 / 2 + R * 0.1 + v * R]);
    bx.globalCompositeOperation = 'source-atop'; for (const [px, py] of bxs) { bx.beginPath(); bx.arc(px, py, R * 0.36, 0, 7); bx.fillStyle = '#ffe9a8'; bx.fill(); bx.lineWidth = R * 0.07; bx.strokeStyle = A.OL; bx.stroke(); }
    bx.globalCompositeOperation = 'destination-out'; for (const [px, py] of bxs) { bx.beginPath(); bx.arc(px + R * 0.12, py, R * 0.33, 0, 7); bx.fill(); }
    bx.globalCompositeOperation = 'source-over';
  }
  x.drawImage(c, cx - S2 / 2, cy - S2 / 2 - R * 0.1);
}
function eternalFlame(x, cx, by, s, t) {
  A.glow(x, cx, by - 300 * s, 520 * s, '255,140,40', 0.7);
  for (let i = 0; i < 5; i++) A.flame(x, cx + (i - 2) * 70 * s, by - Math.abs(i - 2) * 20 * s, 230 * s - Math.abs(i - 2) * 40 * s, (560 - Math.abs(i - 2) * 130) * s, t, i + 70);
  x.save(); x.translate(cx, by); A.rrect(x, -170 * s, 0, 340 * s, 110 * s, 24 * s); A.fs(x, '#6d4b8f', 11); x.restore();
}
function shipRow(x, S, hitTimes, y) {
  const xs = [380, 560, 740, 920];
  xs.forEach((sx, i) => { const hit = S.T > hitTimes[i]; x.save(); if (hit) { x.translate(sx, y + 60); x.rotate(0.25 * prog(S.T, hitTimes[i], hitTimes[i] + 0.4)); x.translate(-sx, -(y + 60)); }
    enemyShip(x, sx, y, 0.42, S.T + i, hit ? 1 : 0); x.restore();
    A.impactStar(x, sx, y - 40, 110 * pop(S.T, hitTimes[i]) * (1 - prog(S.T, hitTimes[i] + 0.35, hitTimes[i] + 0.6)), i); });
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const L = Object.fromEntries(TL.lines.map((l) => [l.id, l]));
  const W = (id, re) => { const l = L[id], w = l.words.find((w) => re.test(w.w)); if (!w) throw new Error(`word ${re} not in ${id}`); return l.start + w.t; };
  const end = (id) => L[id].start + L[id].dur, st = (id) => L[id].start;
  const shots = [], add = (o) => shots.push(o);

  // ---------------- HOOK: desk room ----------------
  const tDrop = 0.75, tShock = 1.1, tBite = W('hook', /^bite/), s2 = tBite - 0.45;
  add({ name: 'Hook (desk room): host sips coffee, the fruit drops onto the plate, wide-eyed shock with !?', t0: 0, t1: s2, bg: 'desk',
    cam: [[1.0, 540, 980, 0], [1.07, 540, 950, 0]],
    sfx: [[0.15, 'sip'], [tDrop - 0.25, 'fall'], [tDrop + 0.3, 'thunk'], [tShock, 'shock']],
    draw(x, S) {
      const sipping = S.t > 0.05 && S.t < 0.7;
      const h = person(x, S, 'host', S.t < tShock ? 'calm' : 'shock', 540, 1900, 0.8, { pose: sipping ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S);
      const k = prog(S.t, tDrop - 0.3, tDrop + 0.3);
      drawFruit(x, 290, lerp(-200, 1340, ease.outBounce(k)), 95, S.T * 0.6, { shadow: false });
      if (S.t > tDrop + 0.3 && S.t < tDrop + 0.3 + 7 * F) S.shake = 0.6;
      if (S.t > tShock) A.mark(x, '!?', h.head[0] + 230, h.head[1] - 230, pop(S.T, tShock));
    } });
  add({ name: 'The bite (desk close-up): 2-frame dip, bite, disgusted face, light flash; pink YOUR FRUIT banner', t0: s2, t1: end('hook'), bg: 'desk',
    cam: [[1.4, 500, 1010, 0.02], [1.5, 490, 1000, 0.035]], banners: [['YOUR FRUIT', 'pink', W('hook', /^fruit/) - 0.1, end('hook')]],
    sfx: [[tBite - s2, 'crunch'], [W('hook', /^weird/) - s2, 'yuck']],
    draw(x, S) {
      const bt = tBite - s2, bitten = S.t >= bt;
      const atMouth = S.t > bt - 0.4 && S.t < bt + 0.45, dip = S.t > bt - 2 * F && S.t < bt ? 16 : 0;
      const h = person(x, S, 'host', bitten ? 'yuck' : 'calm', 540, 1900, 0.8, { pose: atMouth ? 'sip' : 'hold' });
      deskFront(x, S, { plate: true });
      A.mug(x, 830, 1330, 0.75, S.T, true, false);
      bittenFruit(x, h.hand.R[0] - 18, h.hand.R[1] - 48 + dip, 62, S.T * 0.4, bitten);
      S.flash = Math.max(S.flash, 0.45 * (1 - prog(S.t, bt, bt + 0.25)) * (bitten ? 1 : 0));
      if (bitten) A.mark(x, '!?', 820, 560, pop(S.T, tBite + 0.1));
    } });
  add({ name: 'Don\'t panic (close-up on a plain lavender backdrop): host calms down, holds the bitten fruit', t0: st('calm'), t1: end('calm'), bg: 'plain',
    cam: [[1.06, 540, 1000, -0.02], [1.12, 540, 990, 0]], sfx: [[0, 'whoosh'], [W('calm', /^Devil/), 'shimmer']],
    draw(x, S) {
      const tj = W('calm', /^just/) - S.t0;
      const h = person(x, S, 'host', S.t < tj ? 'worried' : 'calm', 520, 1760, 0.8, { talk: true, seed: 1, pose: 'holdUp' });
      if (S.t < tj) A.sweat(x, h.head[0] + 190, h.head[1] - 60, pop(S.T, S.t0 + 0.3));
      bittenFruit(x, h.hand.R[0] + 20, h.hand.R[1] - 70, 66, S.T * 0.4, true);
      const td = W('calm', /^Devil/) - S.t0; A.sparkle(x, h.hand.R[0] - 20, h.hand.R[1] - 140, 36 * Math.sin(Math.PI * prog(S.t, td, td + 0.6)));
      for (let i = 0; i < 4; i++) A.sparkle(x, 150 + i * 260, 420 + (i % 2) * 120, 22 * pop(S.T, S.t0 + 0.4 + i * 0.4));
    } });

  // ---------------- OUT OF EVERY FRUIT ----------------
  const tName = W('name', /^Flame-Flame/) - 0.15;
  add({ name: 'Out of every fruit: orange rays, pink ゴ marks, spinning globe, dark unnamed fruit silhouettes', t0: st('sea'), t1: tName, bg: 'rays:orange',
    cam: [[1.0, 540, 900, 0], [1.1, 540, 880, 0.04]], sfx: [[0, 'whoosh'], [0.1, 'rumble']],
    draw(x, S) {
      A.globe(x, 540, 860, 230 * pop(S.T, S.t0 + 0.05), S.T);
      for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + S.T * 0.5, p = pop(S.T, S.t0 + 0.15 + i * 0.22); if (p > 0) A.fruitSilhouette(x, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 300, 70 * p, i); }
      A.gogo(x, 110, 330, S.T, pop(S.T, S.t0 + 0.1)); A.gogo(x, 800, 1020, S.T + 1, 0.7 * pop(S.T, S.t0 + 0.8));
    } });
  add({ name: 'Fruit reveal: the Mera Mera no Mi slowly rotating on pink with shimmer; pink FLAME-FLAME FRUIT banner', t0: tName, t1: end('name'), bg: 'pinkDots',
    cam: [[1.05, 540, 900, -0.02], [1.16, 540, 880, 0]], banners: [['FLAME-FLAME FRUIT', 'pink', tName + 0.1, end('name')]],
    sfx: [[0, 'whoosh'], [0.1, 'ding'], [0.3, 'shimmer']],
    draw(x, S) {
      halo(x, 540, 880, 470, '255,120,180', S.T);
      drawFruit(x, 540, 880, 280 * pop(S.T, S.t0), S.t * 0.7);
      for (let i = 0; i < 6; i++) { const ph = (S.T * 0.7 + i / 6) % 1; A.sparkle(x, 540 + Math.cos(i * 1.7) * 360, 880 + Math.sin(i * 2.3) * 360, 36 * Math.sin(Math.PI * ph)); }
    } });

  // ---------------- STAGES ----------------
  const pw = [W('logia', /^turn/), W('logia', /^use/), W('logia', /^list/), W('logia', /^powers/)];
  const lvl = pw[3] + 0.45, stageSplit = pw[1] - 0.1;
  const stageDraw = (x, S) => {
    const xs = [165, 415, 665, 915], lit = pw.filter((t) => S.T >= t).length;
    const fill = lit === 0 ? 0 : (lit - 1) / 4 + 0.25 * ease.outCubic(prog(S.T, pw[lit - 1], pw[lit - 1] + 0.35));
    A.progressBar(x, 540, 560, 900, fill, S.T > lvl ? 'LEVEL UP!' : 'FIRE POWERS');
    if (S.T > lvl) A.shineLines(x, 540, 560, 470, 620, S.T, 12);
    xs.forEach((px, i) => {
      if (i === lit - 1) halo(x, px, 860, 210, i === 3 ? '255,200,60' : '255,120,200', S.T);
      A.pedestal(x, px, 990, `FORM ${i + 1}`, i < lit);
      const p = pop(S.T, pw[i]); if (p > 0) formIcon(x, i + 1, px, 860 + Math.sin(S.T * 2 + i) * 10, 0.62 * p, S.T);
      else { x.font = `110px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillText('?', px, 900); }
    });
  };
  add({ name: 'Pedestal stage (wide): FORM 1-4 on purple pedestals, dark progress bar starts filling yellow', t0: st('logia'), t1: stageSplit, bg: 'stage',
    cam: [[1.0, 540, 980, 0], [1.06, 530, 960, 0]], sfx: [[0, 'whoosh'], [pw[0] - st('logia'), 'pop']], draw: stageDraw });
  add({ name: 'Pedestal stage (close): forms 2-4 pop in, bar fills, LEVEL UP, gold halo on FORM 4', t0: stageSplit, t1: end('logia'), bg: 'stage',
    cam: [[1.28, 640, 860, 0.03], [1.36, 700, 840, 0.045]], sfx: [[pw[1] - stageSplit, 'pop'], [pw[2] - stageSplit, 'pop'], [pw[3] - stageSplit, 'pop'], [lvl - stageSplit, 'levelup']], draw: stageDraw });

  // ---------------- FORM 1: body turns into fire ----------------
  const tSo = W('form1', /^so$/) - 0.1;
  add({ name: 'Form 1 close-up (bright beach): the host\'s body turns into fire, yellow shine lines; scope overlay', t0: st('form1'), t1: tSo, bg: 'beach',
    cam: [[1.15, 540, 1000, -0.03], [1.25, 540, 980, -0.01]], sfx: [[0.1, 'ignite'], [0.3, 'fireloop']],
    draw(x, S) {
      const f = ease.outCubic(prog(S.t, 0.2, 1.4));
      fireBody(x, S, 540, 1760, 0.8, f);
      person(x, S, 'host', 'shock', 540, 1760, 0.8, { seed: 2, pose: 'cheer' });
      for (let i = 0; i < 7; i++) A.flame(x, 300 + i * 80, 1790, 110, (130 + (i % 3) * 40) * f + 30, S.T, i + 40);
      A.shineLines(x, 540, 1000, 430, 620, S.T, 12);
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.6); if (p <= 0) return; x.save(); x.translate(860, 600); x.scale(p, p);
      A.scopeOverlay(x, 0, 0, 160, S.T, (c) => { for (let i = 0; i < 4; i++) A.flame(c, -60 + i * 40, 90, 70, 190, S.T, i); });
      x.font = `44px ${A.FONT}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = A.OL; x.strokeText('100% FIRE', 0, 215); x.fillStyle = '#5fe07a'; x.fillText('100% FIRE', 0, 215); x.restore(); } });
  const tPunch = W('form1', /^punches/), tBul = W('form1', /^bullets/);
  add({ name: 'Form 1 reaction (ship deck): the pirate\'s punch and bullets go right through the fire body; pirate shocked !?', t0: tSo, t1: end('form1'), bg: 'deck',
    cam: [[1.05, 600, 980, 0.02], [1.14, 620, 960, 0.03]], sfx: [[0, 'whoosh'], [tPunch - tSo + 0.1, 'swish'], [tBul - tSo + 0.1, 'bullets'], [tBul - tSo + 0.8, 'shock']],
    draw(x, S) {
      const pp = Math.sin(Math.PI * prog(S.T, tPunch, tPunch + 0.7));
      fireBody(x, S, 310, 1760, 0.7, 0.9);
      person(x, S, 'host', 'smug', 310, 1760, 0.7, { seed: 1, alpha: 0.85, pose: 'shrug' });
      const punching = pp > 0.15;
      const e = person(x, S, 'enemy', S.T > tBul + 0.7 ? 'shock' : 'smug', lerp(760, 700, pp), 1760, 0.72, { pop: S.t0 + 0.05, seed: 3, flip: true, pose: punching ? 'punch' : 'idle' });
      if (punching) { A.speedLines(x, e.hand.R[0] + 120, e.hand.R[1], S.T, 8, 160, Math.PI); A.sparkle(x, e.hand.R[0] - 30, e.hand.R[1] - 30, 30 * pp); }
      for (let i = 0; i < 3; i++) { const bp = prog(S.T, tBul + 0.1 + i * 0.1, tBul + 0.5 + i * 0.1); if (bp > 0 && bp < 1) A.bullet(x, lerp(1150, -150, bp), 1050 + i * 110, -1.2); }
      if (S.T > tBul + 0.7) A.mark(x, '!?', e.head[0] - 200, e.head[1] - 230, pop(S.T, tBul + 0.7));
    } });

  // ---------------- FORM 2: Fire Fist ----------------
  const tShoots = W('form2', /^shoots/) - 0.1, tPunchThru = W('form2', /^punch/) - 0.1;
  add({ name: 'Form 2 evolve (dark gold grid): ghost of form 1 dissolves into the flaming fist, flash + glow ring; gold FORM 2 banner slides in', t0: st('form2'), t1: tShoots, bg: 'grid',
    cam: [[1.0, 540, 900, 0], [1.1, 560, 900, -0.02]], banners: [['FORM 2', 'gold', st('form2') + 0.3, tShoots, 'slide']],
    sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('form2', /^catches/) - st('form2'), 'ignite']],
    draw(x, S) {
      halo(x, 540, 880, 380, '255,120,200', S.T);
      evolve(x, S, 1, 2, 540, 880, 1.6);
      const g = prog(S.t, 0.6, 1.4); x.save(); x.strokeStyle = '#ffc931'; x.lineWidth = 9; x.setLineDash([22, 14]); x.lineDashOffset = -S.T * 60;
      if (g > 0) { x.beginPath(); x.moveTo(200, 1180); x.lineTo(200 + 680 * g, 1180); x.stroke(); }
      x.setLineDash([]); if (g > 0.95) { x.beginPath(); x.moveTo(880, 1180); x.lineTo(840, 1150); x.lineTo(840, 1210); x.closePath(); x.fillStyle = '#ffc931'; x.fill(); }
      x.restore(); A.shineLines(x, 540, 880, 220, 380, S.T, 10);
    } });
  const shipHits = [0, 1, 2, 3].map((i) => tPunchThru + 0.15 + i * 0.22);
  const blast = (x, S, t0) => {
    const len = ease.outCubic(prog(S.T, t0, t0 + 0.5)) * 1150;
    A.glow(x, 400, 1050, 500 * len / 1150, '255,120,30', 0.6);
    x.save(); x.translate(180, 1050); x.rotate(Math.PI / 2 - 0.05); for (let i = 0; i < 6; i++) A.flame(x, (A.hash(i) - 0.5) * 140, 30 + i * 20, 300 - i * 25, len * (1 - i * 0.07), S.T, i + 50); x.restore();
    A.speedLines(x, 600, 1050, S.T, 14, 220); A.fist(x, 150, 1060, 0.95, '#22a99a'); A.shineLines(x, 150, 1060, 120, 260, S.T, 9);
  };
  add({ name: 'Form 2 blast (open sea): a column of flame shoots from the fist; pirate in the foreground worried; heat meter rises', t0: tShoots, t1: tPunchThru, bg: 'sea',
    cam: [[1.08, 540, 960, 0.03], [1.14, 560, 960, 0.04]], sfx: [[0.05, 'blast']],
    draw(x, S) {
      shipRow(x, S, shipHits, 1130);
      blast(x, S, S.t0 + 0.05);
      if (S.t < 7 * F + 0.05) S.shake = 1;
      const e = person(x, S, 'enemy', 'worried', 860, 1860, 0.5, { pop: S.t0 + 0.3, seed: 5, pose: 'shrug' }); rowboat(x, 860, 1700, 0.95); A.sweat(x, e.head[0] + 130, e.head[1] - 40, pop(S.T, S.t0 + 0.9));
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.15); if (p <= 0) return; x.save(); x.translate(70, 520); x.scale(p, p); A.meterOverlay(x, 0, 0, 380, ease.outCubic(prog(S.t, 0.15, 2.2)), 'HEAT'); x.restore(); } });
  add({ name: 'Form 2 impact (closer on the ships): the flame punches through a row of ships, impact stars, 7-frame shake', t0: tPunchThru, t1: end('form2'), bg: 'sea',
    cam: [[1.3, 680, 1060, -0.03], [1.38, 700, 1060, -0.045]], sfx: shipHits.map((t) => [t - tPunchThru, 'impact']),
    draw(x, S) {
      shipRow(x, S, shipHits, 1130);
      blast(x, S, S.t0 - 3);
      if (shipHits.some((t) => S.T > t && S.T < t + 7 * F)) S.shake = 1;
      const e = person(x, S, 'enemy', 'shock', 860, 1860, 0.5, { seed: 5, pose: 'shrug' }); rowboat(x, 860, 1700, 0.95); A.mark(x, '!?', e.head[0] - 170, e.head[1] - 170, pop(S.T, shipHits[1]));
    },
    hud(x, S) { x.save(); x.translate(70, 520); A.meterOverlay(x, 0, 0, 380, 1, 'HEAT'); x.restore(); } });

  // ---------------- FORM 3: Fire Flies ----------------
  const tThen = W('form3', /^then/) - 0.1, tAround = W('form3', /^around/);
  const f3 = { name: 'Form 3 evolve (sunset harbor): fist becomes little fireballs floating from the host\'s hand; magnifier shows the tiny pirate inside a swirl', t0: st('form3'), t1: tAround - 0.1, bg: 'harbor',
    cam: [[1.0, 540, 960, -0.02], [1.08, 520, 960, 0]], banners: [['FORM 3', 'gold', st('form3') + 0.3, tAround - 0.1, 'slide']],
    sfx: [[0, 'evolve'], [0.35, 'whoosh'], [0.6, 'twinkle']],
    draw(x, S) {
      evolve(x, S, 2, 3, 540, 760, 1.4);
      const h = person(x, S, 'host', 'grin', 640, 1780, 0.74, { pop: S.t0 + 0.35, seed: 2, pose: 'raise' });
      const [px, py] = h.hand.L; A.shineLines(x, px, py, 90, 210, S.T, 8);
      for (let i = 0; i < 12; i++) { const born = 0.5 + i * 0.12; if (S.t < born) continue; const ph = Math.min(1, (S.t - born) / 1.2), a = i * 2.1 + S.T * 0.8;
        A.firefly(x, px + Math.cos(a) * 60 * ph + (i % 2 ? 1 : -1) * ph * 220 * A.hash(i), py - 40 - ph * (200 + A.hash(i + 2) * 260), 0.9, S.T, i); }
    },
    hud(x, S) { const p = pop(S.T, tAround - 0.1); if (p <= 0) return; x.save(); x.translate(250, 640); x.scale(p, p);
      A.magnifier(x, 0, 0, 175, S.T, (c) => { person(c, S, 'enemy', 'worried', 0, 150, 0.17, { seed: 4, pose: 'shrug' }); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + S.T * 2; A.firefly(c, Math.cos(a) * 115, Math.sin(a) * 95, 0.5, S.T, i); } }); x.restore(); } };
  add(f3);
  add({ ...f3, name: 'Form 3 close (same harbor): fireballs float around the pirate, shown in the magnifier circle', t0: tAround - 0.1, t1: tThen, cam: [[1.3, 420, 900, 0.03], [1.38, 400, 880, 0.04]], banners: [['FORM 3', 'gold', st('form3') + 0.3, tThen, 'slide']], sfx: [[0, 'twinkle']] });
  add({ name: 'Form 3 hit (island cliff): all the fireballs fly in at once and explode on the pirate; red impact star, 7-frame shake, !?', t0: tThen, t1: end('form3'), bg: 'cliff',
    cam: [[1.16, 540, 1010, 0.04], [1.08, 540, 1000, 0.02]], sfx: [[0.1, 'whoosh'], [0.75, 'pops'], [0.78, 'impact']],
    draw(x, S) {
      const ti = 0.75, hit = S.t > ti;
      const e = person(x, S, 'enemy', hit ? 'hit' : 'worried', 540, 1760, 0.78, { seed: 6, pose: 'shrug', rot: hit ? Math.sin(S.T * 20) * 0.03 * (1 - prog(S.t, ti, ti + 0.8)) : 0 });
      for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + S.T * 0.6, r = lerp(430, 110, ease.smoother(prog(S.t, 0.1, ti))), e = prog(S.t, ti + i * 0.03, ti + 0.5 + i * 0.03);
        const px = 540 + Math.cos(a) * r, py = 1080 + Math.sin(a) * r * 0.8;
        if (e <= 0) A.firefly(x, px, py, 0.9, S.T, i); else if (e < 1) { A.glow(x, px, py, 180 * e + 30, '255,150,40', 1 - e); A.flame(x, px, py + 50, 100, 170 * Math.sin(e * Math.PI) + 20, S.T, i); } }
      A.impactStar(x, 600, 1000, 240 * pop(S.T, S.t0 + ti) * (1 - prog(S.t, ti + 0.5, ti + 0.9)), S.T);
      if (S.t > ti && S.t < ti + 7 * F) S.shake = 1;
      A.mark(x, '!?', e.head[0] + 230, e.head[1] - 230, pop(S.T, S.t0 + ti + 0.3));
    } });

  // ---------------- FORM 4: Flame Emperor (peak) ----------------
  const tGiant = W('form4', /^giant/) - 0.1;
  const f4 = { name: 'Form 4 peak (dark backdrop): evolve into a giant sun-like fireball with a gold halo; gold FORM 4 banner; host tiny below', t0: st('form4'), t1: tGiant, bg: 'darkHalo',
    cam: [[1.0, 540, 940, 0], [1.08, 540, 900, 0.03]], banners: [['FORM 4', 'gold', st('form4') + 0.3, tGiant, 'slide']],
    sfx: [[0, 'evolve'], [0.35, 'whoosh'], [0.4, 'rumble']],
    draw(x, S) {
      halo(x, 540, 800, 560, '255,200,60', S.T);
      const g = ease.outCubic(prog(S.t, 0.4, 3.0)), ts = W('form4', /^sun/) - S.t0;
      if (S.t < 0.45) evolve(x, S, 3, 4, 540, 800, 1.6); else { evolve(x, S, 3, 4, 540, 800, 0); A.sun(x, 540, 800, 140 + 170 * g + 30 * pop(S.T, S.t0 + ts), S.T); }
      A.shineLines(x, 540, 800, 340, 540, S.T, 14);
      person(x, S, 'host', 'shout', 540, 1820, 0.4, { pop: S.t0 + 0.6, seed: 7, pose: 'cheer' });
      S.shake = Math.max(S.shake, 0.15 * g, S.t > ts && S.t < ts + 7 * F ? 1 : 0);
      S.flash = Math.max(S.flash, 0.5 * (1 - prog(S.t, ts, ts + 0.3)) * (S.t > ts ? 1 : 0)); S.flashCol = '255,246,200';
    } };
  add(f4);
  add({ ...f4, name: 'Form 4 low angle (same backdrop): the sun swells to full size above the tiny host, shine lines', t0: tGiant, t1: end('form4'), cam: [[1.25, 540, 1050, -0.04], [1.12, 540, 900, -0.02]],
    banners: [['FORM 4', 'gold', tGiant, end('form4')]], sfx: [[W('form4', /^sun/) - tGiant, 'boom']],
    draw(x, S) { f4.draw(x, { ...S, get t() { return S.T - st('form4'); }, set shake(v) { S.shake = v; }, get shake() { return S.shake; }, set flash(v) { S.flash = v; }, get flash() { return S.flash; }, set flashCol(v) { S.flashCol = v; } }); } });

  // ---------------- TWIST: never goes out ----------------
  add({ name: 'Twist (red rays): an eternal flame that never goes out; music stops, low hit, push-in with roll; red NEVER GOES OUT banner', t0: st('never'), t1: end('never'), bg: 'rays:red', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 900, 0.07]], banners: [['NEVER GOES OUT', 'red', W('never', /^never/), end('never')]],
    sfx: [[0, 'sting'], [0.1, 'fireloop']],
    draw(x, S) {
      eternalFlame(x, 540, 1150, 1.0 * pop(S.T, S.t0), S.T);
      for (let i = 0; i < 16; i++) { const ph = (S.T * 0.5 + A.hash(i)) % 1; x.fillStyle = i % 2 ? '#ffd84a' : '#ff8a1d'; x.globalAlpha = 1 - ph; x.beginPath(); x.arc(320 + A.hash(i + 3) * 440, 1100 - ph * 800, 8, 0, 7); x.fill(); x.globalAlpha = 1; }
    } });

  // ---------------- REBORN ----------------
  const tBack = W('reborn', /^comes/), tNew = W('reborn', /^new/);
  const rb = { name: 'When you die (navy grid, circle overlay): the fruit fades away inside the circle', t0: st('reborn'), t1: tBack - 0.15, bg: 'navyGrid',
    cam: [[1.1, 540, 900, 0], [1.16, 540, 880, 0.02]],
    sfx: [[0, 'whoosh'], [0.2, 'fade']],
    draw(x, S) {
      x.save(); x.beginPath(); x.arc(540, 880, 340, 0, 7); x.fillStyle = 'rgba(80,140,255,0.18)'; x.fill(); x.lineWidth = 14; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 7; x.strokeStyle = '#5fe07a'; x.stroke(); x.restore();
      const out = 1 - prog(S.T, st('reborn') + 0.2, st('reborn') + 0.8), back = prog(S.T, tBack - 0.1, tBack + 0.5), a = Math.max(out, back);
      x.save(); x.globalAlpha = a; drawFruit(x, 540, 880, 170 * (out > back ? 1 : 0.6 + 0.4 * ease.outBack(back)), S.T * 0.8, { shadow: false }); x.restore();
      for (let i = 0; i < 8; i++) A.sparkle(x, 540 + Math.cos(i * 0.8 + S.T) * 260, 880 + Math.sin(i * 0.8 + S.T) * 260, 24 * back);
      const np = pop(S.T, tNew); if (np > 0) { x.save(); x.globalAlpha = 0.85; x.translate(860, 1180); x.scale(np, np); x.beginPath(); x.arc(0, -120, 80, 0, 7); x.moveTo(-130, 120); x.quadraticCurveTo(0, -60, 130, 120); x.closePath(); A.fs(x, '#2b2140', 8, '#140f22'); x.restore(); A.mark(x, '?', 860, 960, np, 0.15); }
    } };
  add(rb);
  add({ ...rb, name: 'It comes back (closer, same grid): the fruit reappears with sparkles, a ? silhouette of a new user pops in; green IT COMES BACK banner', t0: tBack - 0.15, t1: end('reborn'),
    cam: [[1.3, 620, 940, -0.03], [1.38, 640, 930, -0.04]], banners: [['IT COMES BACK', 'green', tBack, end('reborn')]], sfx: [[0.1, 'shimmer'], [tNew - tBack + 0.15, 'pop']] });

  // ---------------- SABO ----------------
  const tSabo = W('sabo', /^Sabo/) - 0.1, tTour = W('sabo', /^tournament/);
  add({ name: 'After Ace died (night-blue backdrop): Portgas D. Ace\'s ghostly portrait with a fire aura fades out', t0: st('sabo'), t1: tSabo, bg: 'night',
    cam: [[1.15, 540, 940, -0.02], [1.2, 540, 930, -0.03]], sfx: [[0, 'whoosh']],
    draw(x, S) { const a = 1 - prog(S.t, 0.35, S.dur); fireBody(x, S, 540, 1760, 0.8, 0.8 * a); person(x, S, 'ace', 'smug', 540, 1760, 0.8, { alpha: a, seed: 8 }); } });
  add({ name: 'Colosseum: Sabo pops in and wins the tournament trophy with the fruit on top', t0: tSabo, t1: end('sabo'), bg: 'colosseum',
    cam: [[1.0, 560, 980, -0.02], [1.1, 520, 980, 0.01]], sfx: [[0, 'whoosh'], [0.1, 'pop'], [tTour - tSabo, 'fanfare']],
    draw(x, S) {
      person(x, S, 'sabo', 'grin', 320, 1760, 0.74, { pop: S.t0 + 0.08, seed: 9, pose: S.T > tTour ? 'cheer' : 'idle' });
      const tp = pop(S.T, tTour - 0.2); if (tp > 0) { A.glow(x, 820, 1080, 300, '255,230,120', 0.7); A.trophy(x, 820, 1090, 0.75 * tp); drawFruit(x, 820, 930 + Math.sin(S.T * 4) * 6, 80 * tp, S.T, { shadow: false }); A.shineLines(x, 820, 1000, 180, 320, S.T, 10); }
      for (let i = 0; i < 10; i++) { const ph = (S.T * 0.7 + A.hash(i)) % 1; x.fillStyle = ['#ff6f91', '#ffd23f', '#5fe07a', '#4fb3ff'][i % 4]; x.fillRect(A.hash(i + 2) * 1080, 300 + ph * 1100, 18, 28); }
    } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (snowy cabin): host warm in a hoodie with a cozy fire glow while snow falls; gold HEATING BILL: $0 banner', t0: st('joke'), t1: end('joke'), bg: 'snow',
    cam: [[1.08, 540, 1020, -0.03], [1.16, 540, 1000, 0]], banners: [['HEATING BILL: $0', 'gold', W('joke', /^heating/) - 0.1, end('joke')]],
    sfx: [[0, 'whoosh'], [W('joke', /^bill/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      A.glow(x, 540, 1000, 560, '255,170,60', 0.55);
      for (let i = 0; i < 7; i++) A.flame(x, 260 + i * 95, 1500, 110, 180 + (i % 2) * 60, S.T, i + 90, 0.9);
      const h = person(x, S, 'host', S.T > W('joke', /^heating/) ? 'smug' : 'calm', 540, 1780, 0.78, { pop: S.t0 + 0.05, seed: 11, talk: true, pose: 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.0, S.T, true, false);
      for (let i = 0; i < 30; i++) { const ph = (S.T * 0.25 + A.hash(i)) % 1; x.fillStyle = '#fff'; x.beginPath(); x.arc((A.hash(i + 1) * 1080 + Math.sin(S.T + i) * 30), ph * 1920, 5 + A.hash(i + 2) * 6, 0, 7); x.fill(); }
    } });

  // ---------------- OUTRO ----------------
  const tDesk = st('outro') + L.outro.voStart + L.outro.voDur + 0.35;
  add({ name: 'Outro (purple rays): host with big ? marks, pink NEXT? banner', t0: st('outro'), t1: tDesk, bg: 'rays:purple',
    cam: [[1.0, 540, 960, 0], [1.1, 540, 930, -0.03]], banners: [['NEXT?', 'pink', st('outro') + 0.3, tDesk]],
    sfx: [[0, 'whoosh'], [0.3, 'pop'], [0.8, 'pop'], [1.4, 'pop']],
    draw(x, S) {
      A.gogo(x, 90, 300, S.T, 0.8 * pop(S.T, S.t0 + 0.2));
      person(x, S, 'host', 'smug', 540, 1760, 0.8, { pop: S.t0 + 0.05, talk: true, seed: 12, pose: 'shrug' });
      A.mark(x, '?', 200, 640, 1.3 * pop(S.T, S.t0 + 0.8), -0.2); A.mark(x, '?', 880, 600, 1.1 * pop(S.T, S.t0 + 1.4), 0.25);
      drawFruit(x, 860, 1200 + Math.sin(S.T * 2) * 14, 75 * pop(S.T, S.t0 + 2.0), S.T, { shadow: false });
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
