// Shared animation kit for every short: easing, pop-ins, full-body characters, desk room, transitions, effects.
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
export const lerp = (a, b, t) => a + (b - a) * t;
export const F = 1 / 30;
// pop-in with a small bounce over ~5 frames
export const pop = (T, t0) => (T < t0 ? 0 : 0.55 + 0.45 * ease.outBack(prog(T, t0, t0 + 5 * F)));

export const memo = new Map();
export const cached = (k, fn) => { if (!memo.has(k)) memo.set(k, fn()); return memo.get(k); };
// full-body figures are big canvases: keep a small LRU of them
export const figs = new Map();
export function figure(key, fn) {
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
  x.scale(s * p * (flip ? -1 : 1) * (o.sx || 1), s * p * br * (o.sy || 1)); x.drawImage(c, -A.FIG.W / 2, -A.FIG.FEET); x.restore();
  return info;
}
// where a figure's head will be (for marks drawn before or without the figure)
export const headAt = (cx, fy, s) => A.figPoint(...A.FIG.HEAD, cx, fy, s);
export function rowboat(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.moveTo(-260, -40); x.lineTo(260, -40); x.quadraticCurveTo(230, 90, 0, 100); x.quadraticCurveTo(-230, 90, -260, -40); A.fs(x, '#a26d45', 12); x.strokeStyle = 'rgba(60,30,15,0.5)'; x.lineWidth = 6; x.beginPath(); x.moveTo(-230, 10); x.lineTo(230, 10); x.stroke(); x.restore(); }

export function deskFront(x, S, { plate = true } = {}) {
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
export function evolve(x, S, oldK, newK, cx, cy, s, d = 0.45, icon = formIcon) {
  const k = prog(S.t, 0, d);
  if (k < 1) { x.save(); x.globalAlpha = 1 - k; icon(x, oldK, cx, cy, s * (1 + 0.35 * k), S.T); x.restore(); }
  x.save(); x.globalAlpha = Math.min(1, k * 1.4); icon(x, newK, cx, cy, s * (0.75 + 0.25 * ease.outBack(k)), S.T); x.restore();
  A.glowRing(x, cx, cy, 120 + 420 * ease.outCubic(prog(S.t, 0.05, 0.6)), 1 - prog(S.t, 0.1, 0.6));
  S.flash = Math.max(S.flash, 0.85 * Math.sin(Math.PI * prog(S.t, 0.05, 0.4))); S.flashCol = '255,246,200';
}
export function halo(x, cx, cy, r, rgb, t) { A.glow(x, cx, cy, r * (1 + 0.04 * Math.sin(t * 3)), rgb, 0.75); x.save(); x.globalAlpha = 0.5; x.lineWidth = 10; x.strokeStyle = `rgba(${rgb},1)`; x.beginPath(); x.arc(cx, cy, r * 0.62, 0, 7); x.stroke(); x.restore(); }
export function enemyShip(x, cx, cy, s, t, smoke = 0) {
  x.save(); x.translate(cx, cy + Math.sin(t * 2) * 6); x.rotate(Math.sin(t * 1.5) * 0.03); x.scale(s, s);
  x.lineWidth = 12; x.strokeStyle = A.OL; x.beginPath(); x.moveTo(0, 40); x.lineTo(0, -260); x.stroke(); x.lineWidth = 6; x.strokeStyle = '#8a5a3c'; x.stroke();
  x.beginPath(); x.moveTo(10, -240); x.quadraticCurveTo(170, -150, 150, -30); x.lineTo(10, -30); x.closePath(); A.fs(x, '#f4ead2', 9);
  x.beginPath(); x.moveTo(0, -260); x.lineTo(-90, -240); x.lineTo(0, -215); x.closePath(); A.fs(x, '#7b3fb5', 7);
  x.beginPath(); x.moveTo(-200, 20); x.lineTo(220, 20); x.lineTo(170, 110); x.lineTo(-160, 110); x.closePath(); A.fs(x, '#8a5a3c', 11);
  x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 5; x.beginPath(); x.moveTo(-180, 55); x.lineTo(200, 55); x.stroke();
  for (let i = 0; i < 6 * smoke; i++) { const ph = (t * 0.6 + i / 6) % 1; x.globalAlpha = (1 - ph) * 0.8; x.beginPath(); x.arc(-40 + Math.sin(i) * 60, -60 - ph * 300, 30 + ph * 50, 0, 7); x.fillStyle = '#5a5566'; x.fill(); }
  x.restore();
}
export function fireBody(x, S, cx, fy, s, amt) { // flames hugging a full-body figure (feet at fy)
  if (amt <= 0) return;
  const [hx, hy] = headAt(cx, fy, s);
  A.glow(x, cx, fy - 760 * s, 1050 * s * amt, '255,140,40', 0.5);
  for (let i = 0; i <= 10; i++) { const a = Math.PI * (1.02 + i * 0.096); A.flame(x, hx + Math.cos(a) * 250 * s, hy + Math.sin(a) * 260 * s + 60 * s, 110 * s * amt, 220 * s * amt, S.T, i); }
  for (let k = 0; k < 6; k++) for (const sd of [-1, 1]) A.flame(x, cx + sd * (215 - k * 6) * s, fy - (1000 - k * 170) * s, 120 * s * amt, 230 * s * amt, S.T, k * 2 + (sd > 0 ? 1 : 0) + 20);
}

// fruit with a bite taken out of it
export function bittenFruit(x, cx, cy, R, rot, bitten) {
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
export function eternalFlame(x, cx, by, s, t) {
  A.glow(x, cx, by - 300 * s, 520 * s, '255,140,40', 0.7);
  for (let i = 0; i < 5; i++) A.flame(x, cx + (i - 2) * 70 * s, by - Math.abs(i - 2) * 20 * s, 230 * s - Math.abs(i - 2) * 40 * s, (560 - Math.abs(i - 2) * 130) * s, t, i + 70);
  x.save(); x.translate(cx, by); A.rrect(x, -170 * s, 0, 340 * s, 110 * s, 24 * s); A.fs(x, '#6d4b8f', 11); x.restore();
}
export function shipRow(x, S, hitTimes, y) {
  const xs = [380, 560, 740, 920];
  xs.forEach((sx, i) => { const hit = S.T > hitTimes[i]; x.save(); if (hit) { x.translate(sx, y + 60); x.rotate(0.25 * prog(S.T, hitTimes[i], hitTimes[i] + 0.4)); x.translate(-sx, -(y + 60)); }
    enemyShip(x, sx, y, 0.42, S.T + i, hit ? 1 : 0); x.restore();
    A.impactStar(x, sx, y - 40, 110 * pop(S.T, hitTimes[i]) * (1 - prog(S.T, hitTimes[i] + 0.35, hitTimes[i] + 0.6)), i); });
}

