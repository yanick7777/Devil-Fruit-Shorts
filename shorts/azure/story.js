// Shot plan for the Uo Uo no Mi, Model: Seiryu short. Structure: dragon form + cloud flight, fire breath, tornadoes + wind blades, hybrid form as the peak.
import * as A from '/engine/art.js';
import { drawSeiryu } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawSeiryu(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:az_dojo', 'rays:navy', 's3:az_thunder', 's3:az_dock', 's3:az_skies', 's3:az_wano', 's3:az_plains', 's3:az_onigashima', 's3:az_fishmarket', 's3:az_aquarium', 's3:az_skull', 's3:az_rain', 's3:az_stage'];
scene('az_dojo', { sky: ['#f0e0c8', '#d8c0a0'], ground: '#8a6a4a', back: [['columns', { n: 4, x0: 40, gap: 300, w: 50, col: '#6b4630' }], ['lanterns', { y: 260 }]] });
scene('az_thunder', { sky: ['#1a1a3a', '#3a3a6a'], back: [['clouds', { n: 6, y: 200, h: 900, seed: 7, s: 1.3 }], ['custom', { fn: (x) => { x.strokeStyle = 'rgba(180,220,255,0.6)'; x.lineWidth = 10; for (const bx of [200, 860]) { x.beginPath(); x.moveTo(bx, 0); x.lineTo(bx + 60, 260); x.lineTo(bx - 10, 300); x.lineTo(bx + 50, 640); x.stroke(); } } }]] });
scene('az_dock', { sky: ['#9ad0ff', '#e0f2ff'], ground: '#a07850', gy: 1250, back: [['water', { y: 1000, hh: 250, col: '#2a6ac8' }], ['crates', {}]] });
scene('az_skies', { sky: ['#5a9ae8', '#c8e4ff'], back: [['clouds', { n: 7, y: 200, h: 1100, seed: 9, s: 1.2 }]] });
scene('az_wano', { sky: ['#ffb88a', '#ffe0c0'], ground: '#c9a880', back: [['houses', { cols: ['#8a5a3c', '#7a4a2a', '#a06a4a'], roof: '#3a3346', win: '#f4ead2', seed: 131 }], ['lanterns', { y: 300 }]] });
scene('az_plains', { sky: ['#a8c8a0', '#e0f0d8'], ground: '#8aa86a', back: [['mountains', { gy: 1250, col: '#7a9a7a', hh: 400 }], ['fog', { n: 4 }]] });
scene('az_onigashima', { sky: ['#2a0a1a', '#5a1a2a'], ground: '#3a2a2a', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(-100, 1250); x.lineTo(200, 500); x.lineTo(540, 380); x.lineTo(880, 500); x.lineTo(1180, 1250); x.closePath(); h.fs(x, '#4a3a3a', 10); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(540 + sd * 200, 420); x.quadraticCurveTo(540 + sd * 380, 200, 540 + sd * 300, 60); x.quadraticCurveTo(540 + sd * 280, 280, 540 + sd * 120, 400); h.fs(x, '#e8e0d0', 9); } } }], ['stars', { n: 30 }]] });
scene('az_fishmarket', { sky: ['#e8f4ff', '#c8e0f4'], ground: '#8a9aa8', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 4; k++) { h.rrect(x, 40 + k * 260, 900, 220, 80, 8); h.fs(x, '#a8c8e0', 7); for (let f = 0; f < 3; f++) { x.beginPath(); x.ellipse(90 + k * 260 + f * 60, 900, 28, 14, 0, 0, 7); h.fs(x, '#7aa8d8', 4); } } } }], ['sign', { text: 'FISH', bg: '#ffffff', y: 300 }]] });
scene('az_aquarium', { sky: ['#0a3a6a', '#1a6aa8'], back: [['bubbles', { n: 20 }], ['custom', { fn: (x) => { x.strokeStyle = 'rgba(255,255,255,0.15)'; x.lineWidth = 30; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(k * 260 - 100, 0); x.lineTo(k * 260 + 100, 1300); x.stroke(); } } }]] });
scene('az_skull', { sky: ['#1a0a14', '#3a1a2a'], ground: '#2a1a1a', back: [['moon', { x: 820, y: 280, col: '#ff8a7a' }], ['fog', { n: 6, col: 'rgba(255,120,120,0.12)' }]] });
scene('az_rain', { sky: ['#3a4a5a', '#6a7a8a'], ground: '#4a4a52', back: [['custom', { fn: (x) => { x.strokeStyle = 'rgba(200,220,255,0.35)'; x.lineWidth = 4; for (let i = 0; i < 80; i++) { const rx = (i * 137) % 1200 - 60, ry = (i * 251) % 1300; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 20, ry + 70); x.stroke(); } } }]] });
scene('az_stage', { sky: ['#2a1a3a', '#4a2a5a'], ground: '#5a3a5a', back: [['custom', { fn: (x) => { for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(160,200,255,0.15)'; x.beginPath(); x.moveTo(100 + i * 220, -100); x.lineTo(160 + i * 220, -100); x.lineTo(240 + i * 220, 1260); x.lineTo(20 + i * 220, 1260); x.fill(); } } }]] });

// ---------------- dragon + effects ----------------
// Kaido's dragon (from the user's reference): long dark-blue scaly body with a tan ridged belly, black spiky mane along the back,
// tan branching antlers, long whiskers, red eyes, open fanged jaw, small clawed blue arms. k = 0..1 how much of the body is shown.
export function dragon(x, cx, cy, s, t, o = {}) { const n = 30, pts = []; for (let i = 0; i < n; i++) { const u = i / (n - 1); pts.push([cx - 540 * s + u * 1080 * s, cy + Math.sin(u * 7 + t * 2.4) * 150 * s - u * 120 * s]); }
  const len = Math.max(3, Math.round(n * (o.k ?? 1))); x.save(); scaledTube(x, pts.slice(0, len), 120 * s, t); x.restore();
  const [hx, hy] = pts[len - 1]; x.save(); x.translate(hx, hy); x.scale(s, s);
  for (let k = 0; k < 7; k++) { x.beginPath(); x.moveTo(-40, -50 + k * 14); x.lineTo(-170 - (k % 2) * 40, -80 + k * 30); x.lineTo(-40, -30 + k * 14); x.closePath(); x.fillStyle = '#0e0c14'; x.fill(); }
  for (const [dy, dx2] of [[-60, 0], [-40, 30]]) { x.beginPath(); x.moveTo(-10 + dx2, dy); x.bezierCurveTo(-60 + dx2, dy - 120, -180 + dx2, dy - 140, -220 + dx2, dy - 60); x.moveTo(-60 + dx2, dy - 90); x.lineTo(-40 + dx2, dy - 170); x.lineCap = 'round'; x.lineWidth = 30; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 18; x.strokeStyle = ANT; x.stroke(); }
  x.beginPath(); x.moveTo(-70, -60); x.quadraticCurveTo(40, -80, 175, -30); x.lineTo(178, 0); x.lineTo(-70, 10); x.closePath(); A.fs(x, DBL, 9);
  const jaw = o.roar ? 1 : 0.35; x.beginPath(); x.moveTo(-60, 10); x.lineTo(160, 10 + 40 * jaw); x.lineTo(150, 40 + 60 * jaw); x.quadraticCurveTo(20, 60 + 30 * jaw, -60, 50); x.closePath(); A.fs(x, DBL, 9);
  x.fillStyle = '#ffffff'; for (let k = 0; k < 6; k++) { const tx = -10 + k * 28; x.beginPath(); x.moveTo(tx, 8); x.lineTo(tx + 8, 26); x.lineTo(tx + 16, 8); x.fill(); }
  x.beginPath(); x.moveTo(20, -45); x.quadraticCurveTo(50, -60, 80, -42); x.quadraticCurveTo(50, -30, 20, -45); A.fs(x, '#f2c43a', 4);
  for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(-50 + k * 6, 40 + k * 8); x.lineTo(-110 - k * 6, 60 + k * 14); x.lineTo(-50 + k * 6, 55 + k * 8); x.closePath(); A.fs(x, '#a8dcf0', 3); }
  x.beginPath(); x.moveTo(150, -10); x.bezierCurveTo(220, 40, 140, 160, 230, 230); x.lineWidth = 7; x.strokeStyle = '#0e0c14'; x.stroke();
  x.restore(); return [hx + 160 * s, hy + 20 * s]; }

// ---------------- Kaido's dragon, matched to the anime frame the user sent ----------------
// palette: light scaly blue body, khaki ridged belly, black flame mane, tan antlers, yellow eyes, gold spiked cuffs, purple fur at the shoulders
const DB = '#3a8ac0', DBL = '#7cc4e4', DBD = '#1f5a8a', BELLY = '#c8b070', BELLYD = '#8a7440', ANT = '#b8945a';
// one body segment run: thick tube along pts with scales on top, khaki ridged belly underneath and a black flame mane on the back
export function scaledTube(x, pts, w, t, o = {}) {
  const n = pts.length, nrm = pts.map((p, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dy / l, -dx / l]; });
  const up = (i, d) => [pts[i][0] + nrm[i][0] * d, pts[i][1] + nrm[i][1] * d], tang = (i) => Math.atan2(-nrm[i][0], nrm[i][1]);
  // black flame mane along the back: several tongues per flame, curling backwards
  if (o.mane !== false) for (let i = 1; i < n - 2; i += 2) { const [bx, by] = up(i, w * 0.4), [ex, ey] = up(i + 2, w * 0.4), h = w * (0.7 + 0.3 * Math.sin(i * 1.3 + t * 3));
    const [t1x, t1y] = up(i, w * 0.4 + h), [t2x, t2y] = up(i + 1, w * 0.4 + h * 0.6);
    x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(bx + (t1x - bx) * 0.6 - nrm[i][1] * w * 0.25, by + (t1y - by) * 0.6 + nrm[i][0] * w * 0.25, t1x, t1y); x.quadraticCurveTo((t1x + t2x) / 2, (t1y + t2y) / 2 + 10, t2x, t2y); x.quadraticCurveTo((t2x + ex) / 2, (t2y + ey) / 2, ex, ey); x.closePath(); x.fillStyle = '#0c0a12'; x.fill(); }
  const path = (d = 0) => { x.beginPath(); for (let i = 0; i < n; i++) { const [px, py] = up(i, d); i ? x.lineTo(px, py) : x.moveTo(px, py); } };
  x.lineCap = 'round'; x.lineJoin = 'round';
  path(); x.lineWidth = w + 14; x.strokeStyle = A.OL; x.stroke();
  path(); x.lineWidth = w; x.strokeStyle = DB; x.stroke();
  // khaki belly band (lower half) with rib lines across it
  path(-w * 0.25); x.lineWidth = w * 0.5; x.strokeStyle = BELLY; x.stroke();
  x.strokeStyle = BELLYD; x.lineWidth = 3; x.lineCap = 'butt'; for (let i = 0; i < n; i++) { const [ax, ay] = up(i, -w * 0.02), [bx2, by2] = up(i, -w * 0.48); x.beginPath(); x.moveTo(ax, ay); x.quadraticCurveTo((ax + bx2) / 2 + nrm[i][1] * w * 0.06, (ay + by2) / 2 - nrm[i][0] * w * 0.06, bx2, by2); x.stroke(); } x.lineCap = 'round';
  path(-w * 0.02); x.lineWidth = 4; x.strokeStyle = A.OL; x.stroke();
  // scales on the upper half: rows of pointed light-blue scales with dark-blue centres, overlapping along the body
  for (const [d, off] of [[w * 0.36, 0.5], [w * 0.2, 0], [w * 0.06, 0.5]]) for (let i = 0; i < n - 1; i++) { const f = i + off; if (f > n - 1.5) continue; const i0 = Math.floor(f), [px, py] = up(i0, d), a = tang(i0), sw = w * 0.12, sh = w * 0.1;
    x.save(); x.translate(px, py); x.rotate(a); x.beginPath(); x.moveTo(-sw, -sh); x.quadraticCurveTo(-sw, sh, 0, sh * 1.3); x.quadraticCurveTo(sw, sh, sw, -sh); x.quadraticCurveTo(0, -sh * 0.6, -sw, -sh); x.closePath(); x.fillStyle = DBL; x.fill(); x.lineWidth = 2.5; x.strokeStyle = '#163e66'; x.stroke();
    x.beginPath(); x.ellipse(0, sh * 0.15, sw * 0.45, sh * 0.6, 0, 0, 7); x.fillStyle = DBD; x.fill(); x.restore(); }
  path(w * 0.47); x.setLineDash([2, 12]); x.lineWidth = 5; x.strokeStyle = '#0c0a12'; x.stroke(); x.setLineDash([]); }
function claw(x, sd, t, o) { // light-blue scaly forearm with a gold spiked cuff, four hooked talons
  x.save(); x.scale(sd, 1);
  x.beginPath(); x.moveTo(0, -80); x.quadraticCurveTo(20, 40, 50, 140); x.lineWidth = 92; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 74; x.strokeStyle = DBL; x.stroke();
  x.strokeStyle = DB; x.lineWidth = 4; for (let k = 0; k < 6; k++) { x.beginPath(); x.arc(16 + k * 6, -40 + k * 30, 14, 0, Math.PI); x.stroke(); }
  // spiked cuff
  A.rrect(x, -10, 40, 110, 40, 12); A.fs(x, '#2a2430', 7); for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(k * 28 - 2, 42); x.lineTo(k * 28 + 10, 0); x.lineTo(k * 28 + 22, 42); x.closePath(); A.fs(x, '#c8a840', 5); }
  // hand + four curled talons
  x.beginPath(); x.ellipse(60, 150, 62, 48, 0.2, 0, 7); A.fs(x, DBL, 8);
  for (const [dx, a] of [[-40, 0.35], [-8, 0.15], [28, -0.05], [70, -0.4]]) { x.save(); x.translate(60 + dx * 0.9, 180); x.rotate(a); x.beginPath(); x.moveTo(-14, 0); x.quadraticCurveTo(-18, 60, 6, 90); x.lineTo(18, 84); x.quadraticCurveTo(10, 50, 14, 0); x.closePath(); A.fs(x, DBL, 6); x.beginPath(); x.moveTo(4, 84); x.quadraticCurveTo(-6, 120, 20, 130); x.quadraticCurveTo(10, 110, 18, 86); x.closePath(); A.fs(x, '#f4f0e4', 4); x.restore(); }
  x.restore(); }
// flame sweeping along a line: layered tongues licking up, red-orange outside, yellow-white core
function fireSwoosh(x, x0, y0, x1, y1, w, t, seed) { // merged anime-style flame: overlapping teardrop tongues filled per colour layer, no outlines, soft glow
  const n = 9; A.glow(x, (x0 + x1) / 2, (y0 + y1) / 2 - w * 0.4, Math.hypot(x1 - x0, y1 - y0) * 0.6, '255,150,40', 0.55);
  for (const [k, col] of [[1, '#e8501e'], [0.78, '#ff8c1e'], [0.55, '#ffc83a'], [0.32, '#fff2b0']]) { x.beginPath();
    for (let i = 0; i <= n; i++) { const u = i / n, px = x0 + (x1 - x0) * u, py = y0 + (y1 - y0) * u, sz = w * k * (0.55 + 0.65 * Math.sin(u * Math.PI)), h = sz * (2.0 + 0.5 * Math.sin(t * 9 + i * 1.9 + seed)), lean = Math.sin(t * 5 + i + seed) * sz * 0.35 + sz * 0.3;
      x.moveTo(px - sz, py); x.bezierCurveTo(px - sz, py - h * 0.5, px + lean - sz * 0.2, py - h * 0.75, px + lean, py - h); x.bezierCurveTo(px + lean + sz * 0.1, py - h * 0.6, px + sz, py - h * 0.45, px + sz, py); x.arc(px, py, sz, 0, Math.PI); }
    x.fillStyle = col; x.fill(); } }
function fur(x, cx, cy, r) { x.beginPath(); for (let i = 0; i <= 28; i++) { const a = i / 28 * 6.283, rr = r * (i % 2 ? 1 : 0.72); x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.8); } x.closePath(); A.fs(x, '#4a3a7a', 6); }
export function dragonFront(x, cx, cy, s, t, o = {}) { x.save(); x.translate(cx, cy); x.scale(s, s); const wv = Math.sin(t * 1.6) * 16;
  // coils: a big loop sweeping left and back, one rising behind the head to the upper right, the chest dropping down the middle
  const loopL = [], high = [], chest = [];
  for (let i = 0; i <= 36; i++) { const u = i / 36; loopL.push([-120 - Math.sin(u * Math.PI) * 860, 480 - u * 600 + Math.sin(u * 6 + t) * 20 + wv]); }
  for (let i = 0; i <= 30; i++) { const u = i / 30; high.push([-60 + u * 900, -420 + Math.sin(u * 3.2 + 0.4 + t * 0.8) * 160 + u * 120]); }
  for (let i = 0; i <= 16; i++) { const u = i / 16; chest.push([60 + Math.sin(u * 2.4) * 140, 60 + u * 640]); }
  scaledTube(x, high, 220, t); scaledTube(x, loopL, 230, t);
  // chest: wide khaki ridged belly facing the camera
  x.beginPath(); x.moveTo(-60, 40); x.quadraticCurveTo(260, 200, 220, 700); x.lineTo(-40, 700); x.quadraticCurveTo(-120, 300, -60, 40); x.closePath(); A.fs(x, BELLY, 12);
  x.save(); x.clip(); x.strokeStyle = BELLYD; x.lineWidth = 6; for (let k = 0; k < 16; k++) { x.beginPath(); x.moveTo(-160, 90 + k * 42); x.quadraticCurveTo(80, 120 + k * 42, 300, 80 + k * 42); x.stroke(); } x.restore();
  x.beginPath(); x.moveTo(170, 60); x.quadraticCurveTo(330, 260, 260, 700); x.lineTo(210, 700); x.quadraticCurveTo(260, 260, 120, 60); x.closePath(); A.fs(x, DB, 8);
  // purple fur at the shoulders and the clawed arms with gold spiked cuffs
  fur(x, -230, 260, 120); fur(x, 380, 280, 130);
  x.save(); x.translate(-260, 300); claw(x, -1, t, o); x.restore(); x.save(); x.translate(360, 320); claw(x, 1, t, o); x.restore();
  if (o.flames) { fireSwoosh(x, -330, 420, -170, 300, 55, t, 1); fireSwoosh(x, 300, 430, 720, 160, 80, t, 2); }
  // black flame mane around and behind the head
  for (let i = 0; i < 16; i++) { const a = Math.PI * (0.75 + i / 15 * 1.5), r = 200 + (i % 3) * 60; x.beginPath(); x.moveTo(Math.cos(a - 0.2) * 110, -60 + Math.sin(a - 0.2) * 110); x.quadraticCurveTo(Math.cos(a) * r * 0.8, -60 + Math.sin(a) * r * 0.8 - 30, Math.cos(a + 0.05) * r, -60 + Math.sin(a + 0.05) * r); x.lineTo(Math.cos(a + 0.2) * 110, -60 + Math.sin(a + 0.2) * 110); x.closePath(); x.fillStyle = '#0e0c14'; x.fill(); }
  // antlers: two tall prongs up from the forehead (with a small branch), and two big horns that arc out from the top of the head and hook down beside the face
  const ant = (fn, w) => { fn(); x.lineCap = 'round'; x.lineWidth = w + 14; x.strokeStyle = A.OL; x.stroke(); fn(); x.lineWidth = w; x.strokeStyle = ANT; x.stroke(); fn(); x.lineWidth = w * 0.22; x.strokeStyle = '#7a5a2a'; x.stroke(); };
  for (const sd of [-1, 1]) {
    ant(() => { x.beginPath(); x.moveTo(sd * 30, -200); x.quadraticCurveTo(sd * 45, -420, sd * 20, -640); x.moveTo(sd * 38, -380); x.quadraticCurveTo(sd * 95, -420, sd * 105, -500); }, 30);
    ant(() => { x.beginPath(); x.moveTo(sd * 90, -190); x.bezierCurveTo(sd * 170, -330, sd * 330, -330, sd * 360, -170); x.quadraticCurveTo(sd * 375, -80, sd * 330, -10); }, 36); }
  // pale scale fringe all around the face (sides and under the jaw), like a ruff
  for (let i = 0; i < 30; i++) { const a = Math.PI * (-0.12 + i / 29 * 1.24), r1 = 112, r2 = 165 + (i % 2) * 18; const ox = Math.cos(a), oy = Math.sin(a); x.beginPath(); x.moveTo(Math.cos(a - 0.06) * r1, 20 + Math.sin(a - 0.06) * r1 * 1.25); x.lineTo(ox * r2, 20 + oy * r2 * 1.25); x.lineTo(Math.cos(a + 0.06) * r1, 20 + Math.sin(a + 0.06) * r1 * 1.25); x.closePath(); A.fs(x, '#9ad4ec', 4); }
  // head: narrow, long, scaly
  const head = () => { x.beginPath(); x.moveTo(-115, -170); x.quadraticCurveTo(0, -235, 115, -170); x.quadraticCurveTo(140, -80, 118, -10); x.quadraticCurveTo(100, 50, 70, 80); x.lineTo(62, 150); x.quadraticCurveTo(0, 172, -62, 150); x.lineTo(-70, 80); x.quadraticCurveTo(-100, 50, -118, -10); x.quadraticCurveTo(-140, -80, -115, -170); x.closePath(); };
  head(); A.fs(x, DB, 12); x.save(); head(); x.clip();
  for (let r = 0; r < 8; r++) for (let k = -4; k <= 4; k++) { const px = k * 30 + (r % 2) * 15, py = -205 + r * 26; x.beginPath(); x.moveTo(px - 13, py); x.quadraticCurveTo(px - 13, py + 14, px, py + 18); x.quadraticCurveTo(px + 13, py + 14, px + 13, py); x.fillStyle = DBL; x.fill(); x.lineWidth = 2.5; x.strokeStyle = '#163e66'; x.stroke(); }
  x.restore(); head(); x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke();
  // forehead ridge crest and heavy angry brows over small yellow eyes
  x.beginPath(); x.moveTo(-30, -190); x.quadraticCurveTo(0, -150, 30, -190); x.lineTo(14, -110); x.lineTo(-14, -110); x.closePath(); A.fs(x, DBL, 5);
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 18, -80); x.quadraticCurveTo(sd * 80, -125, sd * 135, -100); x.lineTo(sd * 128, -72); x.quadraticCurveTo(sd * 75, -88, sd * 22, -55); x.closePath(); A.fs(x, '#1f4e78', 6);
    x.beginPath(); x.moveTo(sd * 40, -55); x.quadraticCurveTo(sd * 82, -74, sd * 118, -64); x.quadraticCurveTo(sd * 88, -38, sd * 44, -40); x.closePath(); A.fs(x, '#f2c43a', 5); x.beginPath(); x.ellipse(sd * 82, -54, 6, 11, 0, 0, 7); x.fillStyle = '#0c0a12'; x.fill(); }
  // white tusks curving up beside the snout
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 92, 40); x.quadraticCurveTo(sd * 130, 10, sd * 128, -35); x.quadraticCurveTo(sd * 108, 5, sd * 78, 48); x.closePath(); A.fs(x, '#f4f0e4', 5); }
  // snout with flared nostrils
  x.beginPath(); x.moveTo(-60, 60); x.quadraticCurveTo(0, 20, 60, 60); x.quadraticCurveTo(72, 95, 56, 118); x.lineTo(-56, 118); x.quadraticCurveTo(-72, 95, -60, 60); x.closePath(); A.fs(x, DB, 7);
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 12, 92); x.quadraticCurveTo(sd * 40, 70, sd * 54, 96); x.quadraticCurveTo(sd * 36, 88, sd * 16, 102); x.closePath(); x.fillStyle = '#0c0a12'; x.fill(); }
  // open jaw: dark pink mouth, rows of fangs, lower jaw with fringe
  const jaw = o.roar ? 1 : 0.55; x.beginPath(); x.moveTo(-58, 122); x.lineTo(58, 122); x.lineTo(52, 150 + 70 * jaw); x.quadraticCurveTo(0, 170 + 80 * jaw, -52, 150 + 70 * jaw); x.closePath(); A.fs(x, '#8a2a44', 9);
  x.beginPath(); x.ellipse(0, 150 + 55 * jaw, 28, 15, 0, 0, 7); x.fillStyle = '#d86a88'; x.fill();
  x.fillStyle = '#ffffff'; for (const dx of [-46, -28, -10, 10, 28, 46]) { x.beginPath(); x.moveTo(dx - 8, 122); x.lineTo(dx, Math.abs(dx) > 40 ? 162 : 142); x.lineTo(dx + 8, 122); x.fill(); } for (const dx of [-38, -14, 14, 38]) { x.beginPath(); x.moveTo(dx - 8, 148 + 72 * jaw); x.lineTo(dx, 115 + 70 * jaw); x.lineTo(dx + 8, 148 + 72 * jaw); x.fill(); }
  x.beginPath(); x.moveTo(-62, 146 + 70 * jaw); x.quadraticCurveTo(0, 182 + 82 * jaw, 62, 146 + 70 * jaw); x.lineTo(52, 172 + 72 * jaw); x.quadraticCurveTo(0, 200 + 82 * jaw, -52, 172 + 72 * jaw); x.closePath(); A.fs(x, DB, 7);
  // long black whiskers trailing out to both sides
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 60, 100); x.bezierCurveTo(sd * 300, 60 + wv, sd * 500, 220, sd * 780, 140 + wv * 2); x.lineCap = 'round'; x.lineWidth = 9; x.strokeStyle = '#0e0c14'; x.stroke(); }
  x.restore(); return [cx, cy + (150 + 80 * (o.roar ? 1 : 0.55)) * s]; }
function fireBreath(x, hx, hy, len, t, ang = 0) { x.save(); x.translate(hx, hy); x.rotate(ang); for (let i = 0; i < 9; i++) { const u = i / 8, r = 30 + u * 120; x.beginPath(); x.arc(u * len + Math.sin(t * 20 + i) * 10, Math.sin(t * 15 + i * 2) * 20, r, 0, 7); x.fillStyle = i % 2 ? 'rgba(255,140,40,0.85)' : 'rgba(255,220,90,0.85)'; x.fill(); } x.restore(); }
function tornado(x, cx, by, h, t) { for (let i = 0; i < 10; i++) { const u = i / 9, w = 40 + u * 200, y = by - u * h; x.beginPath(); x.ellipse(cx + Math.sin(t * 6 + i) * 30 * u, y, w, 24 + u * 14, 0, 0, 7); x.lineWidth = 18; x.strokeStyle = 'rgba(60,80,120,0.5)'; x.stroke(); x.lineWidth = 12; x.strokeStyle = `rgba(240,248,255,${0.75 + 0.25 * (1 - u)})`; x.stroke(); } }
function windBlade(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.beginPath(); x.moveTo(-160, 0); x.quadraticCurveTo(0, -70, 160, 0); x.quadraticCurveTo(0, -30, -160, 0); x.fillStyle = 'rgba(200,240,255,0.9)'; x.fill(); x.lineWidth = 5; x.strokeStyle = '#ffffff'; x.stroke(); x.restore(); }
function cloudPuff(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); for (const [dx, dy, r] of [[-80, 10, 60], [0, -20, 80], [90, 10, 60]]) { x.beginPath(); x.arc(dx, dy, r, 0, 7); A.fs(x, '#ffffff', 7); } x.restore(); }
export function azureIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) dragon(x, 0, 0, 0.3, t);
  else if (k === 2) fireBreath(x, -120, 0, 220, t);
  else if (k === 3) { tornado(x, -60, 140, 280, t); windBlade(x, 80, 0, 0.6, -0.3); }
  else { A.glow(x, 0, 0, 200, '120,170,255', 0.7); x.beginPath(); x.moveTo(-60, 80); x.quadraticCurveTo(0, -120, 60, 80); A.fs(x, '#3a8ad8', 8); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a blue scale-patterned fruit with orange leaves', biteDesc: 'blue scales ripple up the host\'s arm', biteSfx: 'shimmer', bannerCol: 'blue', biteCol: '#3a6ad8',
    calmBg: 's3:az_dojo', calmDesc: 'Wano dojo', seaHue: 'navy', seed: 87, nameRe: /^Fish-Fish/,
    revealBg: 's3:az_thunder', revealDesc: 'stormy thunder sky', revealBanner: 'FISH-FISH FRUIT: AZURE DRAGON', haloRgb: '140,190,255' });
  const tTurns = W('type', /^turns/) - 0.1, tDragon = W('type', /^dragon/) - 0.1;
  add({ name: 'Mythical Zoan (harbour dock): a long blue dragon uncoils out of the host and rises over the water', t0: tTurns, t1: tDragon, bg: 's3:az_dock',
    cam: [[1.0, 540, 1000, 0.02], [1.06, 540, 980, 0.03]], sfx: [[0.1, 'whoosh'], [0.6, 'rumble']],
    draw(x, S) { const k = prog(S.t, 0.05, 0.9); dragonFront(x, 540, 900, 0.3 + 0.5 * ease.outBack(k), S.T, { roar: k > 0.6 }); person(x, S, 'host', 'shock', 300, 1820, 0.5, { seed: 2, pose: 'shrug' }); } });
  stage(T, { desc: 'spotlit stage', bg: 's3:az_stage', t0: tDragon, t1: end('type'), times: [W('type', /^dragon/), W('type', /^dragon/) + 0.2, W('type', /^dragon/) + 0.4, W('type', /^dragon/) + 0.6],
    labels: ['DRAGON', 'FIRE', 'WIND', 'HYBRID'], bar: 'DRAGON POWERS', haloRgb: '140,190,255', icon: azureIcon });

  const tFly = W('power1', /^fly/) - 0.1;
  addSplit({ name: 'Power 1 (open skies): Kaido roars and turns into a huge blue dragon; blue AZURE DRAGON banner', t0: st('power1'), t1: end('power1'), bg: 's3:az_skies',
    cam: [[1.0, 540, 980, -0.02], [1.05, 560, 970, -0.01]], banners: [['AZURE DRAGON', 'blue', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'rumble'], [W('power1', /^dragon/) - st('power1'), 'boom']],
    draw(x, S) { const td = W('power1', /^dragon/); if (S.T < td) person(x, S, 'kaido', 'grin', 540, 1880, 0.74, { seed: 2, pose: 'raise' }); else { dragonFront(x, 540, 1060, 0.5 + 0.3 * ease.outBack(prog(S.T, td, td + 0.5)), S.T, { roar: true, flames: true }); if (S.T < td + 0.3) S.shake = 0.5; } } },
    tFly, [[0.95, 540, 960, 0.02], [1.0, 540, 940, 0.035]], 'Power 1 fly (same skies): the dragon swims through the air riding on puffy white clouds');
  const p1 = T.shots[T.shots.length - 1]; p1.sfx = [[0.1, 'whoosh']]; p1.draw = function (x, S) { for (let i = 0; i < 4; i++) cloudPuff(x, ((S.T * 260 + i * 330) % 1500) - 200, 1250 + (i % 2) * 120, 1.2); dragon(x, 420, 900, 0.85, S.T); A.speedLines(x, 540, 900, S.T, 10, 260, Math.PI); };

  add({ name: 'Power 2 evolve (old Wano street): dragon icon becomes the fire icon; the dragon breathes a huge blast of fire (Bolo Breath) down the street; red FIRE BREATH banner', t0: st('power2'), t1: end('power2'), bg: 's3:az_wano',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['BOLO BREATH', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^breathe/) - st('power2'), 'blast'], [W('power2', /^fire/) - st('power2'), 'fireloop']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, azureIcon)) return; const [hx, hy] = dragonFront(x, 540, 700, 0.62, S.T, { roar: true }); const k = prog(S.T, W('power2', /^breathe/), W('power2', /^fire/) + 0.3); if (k > 0) { fireBreath(x, hx, hy, 620 * k, S.T, Math.PI / 2); if (k < 1) S.shake = 0.3; } for (let i = 0; i < 4; i++) if (k > 0.6) A.flame(x, 300 + i * 200, 1300, 90, 220, S.T, i); } });

  const tBlades = W('power3', /^wind/) - 0.1;
  addSplit({ name: 'Power 3 evolve (grassy plains): fire icon becomes the wind icon; the dragon coils and spins up three giant tornadoes; purple TORNADOES banner', t0: st('power3'), t1: end('power3'), bg: 's3:az_plains',
    cam: [[1.0, 540, 980, 0], [1.06, 560, 960, 0.02]], banners: [['TORNADOES', 'pink', st('power3') + 0.3, tBlades]], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^tornadoes/) - st('power3'), 'storm']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, azureIcon)) return; const k = prog(S.T, W('power3', /^tornadoes/) - 0.3, tBlades); for (let i = 0; i < 3; i++) tornado(x, 200 + i * 340, 1350, 800 * Math.max(0.05, Math.min(1, k * 1.5 - i * 0.2)), S.T + i); dragon(x, 540, 620, 0.55, S.T); } },
    tBlades, [[1.0, 540, 1000, -0.02], [1.06, 540, 980, -0.035]], 'Power 3 wind blades (same plains): curved blades of wind slice across and cut the tops off rocks; blue WIND BLADES banner');
  const p3 = T.shots[T.shots.length - 1]; p3.banners = [['WIND BLADES', 'blue', tBlades, end('power3')]]; p3.sfx = [[0.1, 'slash'], [0.4, 'slash']]; p3.draw = function (x, S) { for (let i = 0; i < 3; i++) { const u = ((S.T - S.t0) * 1.4 + i / 3) % 1; windBlade(x, lerp(-200, 1280, u), 900 + i * 180, 1.2, -0.15); } for (let i = 0; i < 3; i++) { A.rrect(x, 180 + i * 320, 1200, 160, 200, 30); A.fs(x, '#8a8a7a', 9); } };

  const tWarrior = W('peak', /^warrior/) - 0.1;
  addSplit({ name: 'Peak (Onigashima skull rooftop): wind icon gives way to the hybrid icon, blue halo; gold HYBRID FORM banner; Kaido grows scales, horns and a long dragon tail', t0: st('peak'), t1: end('peak'), bg: 's3:az_onigashima',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['HALF HUMAN, HALF DRAGON', 'gold', W('peak', /^half/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^half/) - st('peak'), 'charge']],
    draw(x, S) { halo(x, 540, 900, 620, '120,170,255', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, azureIcon); return; }
      const k = prog(S.T, W('peak', /^half/), tWarrior + 0.3); x.beginPath(); x.moveTo(600, 1500); x.quadraticCurveTo(900, 1700 - 200 * k, 1000, 1300); x.lineCap = 'round'; x.lineWidth = 90; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 74; x.strokeStyle = '#2a5a8a'; x.stroke(); person(x, S, 'kaido', 'grin', 540, 1860, 0.89, { seed: 7, pose: 'raise' }); } },
    tWarrior, [[1.0, 540, 1000, -0.02], [1.08, 540, 980, -0.035]], 'Peak warrior (same rooftop): hybrid Kaido swings his spiked club with Conqueror\'s Haki lightning around it; shake');
  const pk = T.shots[T.shots.length - 1]; pk.sfx = [[0, 'haki'], [0.3, 'impact']]; pk.draw = function (x, S) { x.beginPath(); x.moveTo(600, 1500); x.quadraticCurveTo(900, 1500, 1000, 1300); x.lineCap = 'round'; x.lineWidth = 90; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 74; x.strokeStyle = '#2a5a8a'; x.stroke(); const kd = person(x, S, 'kaido', 'grin', 540, 1860, 0.89, { seed: 7, pose: 'raise' }); x.save(); x.translate(kd.hand.L[0], kd.hand.L[1]); x.rotate(-0.5); A.rrect(x, -40, -420, 80, 440, 30); A.fs(x, '#2a2a36', 8); x.fillStyle = '#a8a8b8'; for (let r = 0; r < 5; r++) for (const dx of [-24, 0, 24]) { x.beginPath(); x.arc(dx, -390 + r * 70, 9, 0, 7); x.fill(); } x.restore(); for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(540, 1000); x.lineTo(540 + Math.cos(i * 1.3) * 500, 1000 + Math.sin(i * 1.3) * 400); x.lineWidth = 12; x.strokeStyle = i % 2 ? '#14121a' : '#c8303a'; x.stroke(); } if (S.T < S.t0 + 0.3) S.shake = 0.6; };

  add({ name: 'Twist (fish market): push-in with roll, low sting; red THE TWIST banner', t0: st('twist'), t1: end('twist'), bg: 's3:az_fishmarket', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['THE TWIST', 'red', W('twist', /^twist/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Fish fruit (aquarium tank): a little goldfish swims past the giant dragon, which looks down at it confused; gold FISH?! banner', t0: st('truth'), t1: end('truth'), bg: 's3:az_aquarium',
    cam: [[1.05, 540, 1000, -0.02], [1.12, 560, 990, -0.04]], banners: [['A "FISH" FRUIT?!', 'gold', W('truth', /^fish/) - 0.1, end('truth')]], sfx: [[W('truth', /^fish/) - st('truth'), 'boing'], [W('truth', /^dragon/) - st('truth'), 'rumble']],
    draw(x, S) { dragonFront(x, 540, 800, 0.62, S.T * 0.5); const fx = lerp(1100, 100, prog(S.T, S.t0, S.t1)); x.beginPath(); x.ellipse(fx, 1400, 70, 44, 0, 0, 7); A.fs(x, '#f08a2a', 7); x.beginPath(); x.moveTo(fx + 60, 1400); x.lineTo(fx + 120, 1360); x.lineTo(fx + 120, 1440); x.closePath(); A.fs(x, '#f08a2a', 6); x.beginPath(); x.arc(fx - 35, 1390, 9, 0, 7); x.fillStyle = A.OL; x.fill(); A.mark(x, '?', 860, 600, pop(S.T, W('truth', /^fish/) + 0.2)); } });

  add({ name: 'Kaido (skull island under a red moon): Kaido with his bull horns, long dreadlocks, whiskers and purple fur coat; red STRONGEST CREATURE banner', t0: st('users'), t1: end('users'), bg: 's3:az_skull',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['KAIDO', 'pink', st('users') + 0.2, W('users', /^strongest/)], ['STRONGEST CREATURE IN THE WORLD', 'red', W('users', /^strongest/), end('users')]], sfx: [[0, 'whoosh'], [W('users', /^strongest/) - st('users'), 'drums']],
    draw(x, S) { person(x, S, 'kaido', 'calm', 540, 1900, 0.98, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); } });

  add({ name: 'Joke (rainy street): rain pours, but the host rides on a little cloud with a dragon tail curled over him like a roof; gold NO UMBRELLA banner', t0: st('joke'), t1: end('joke'), bg: 's3:az_rain',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO UMBRELLA NEEDED', 'gold', W('joke', /^umbrella/) - 0.1, end('joke')]], sfx: [[0.3, 'whoosh'], [W('joke', /^storm/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { cloudPuff(x, 540, 1700, 1.8); person(x, S, 'host', 'grin', 540, 1660, 0.66, { pop: S.t0 + 0.05, seed: 11, pose: 'cheer', talk: true }); x.beginPath(); x.moveTo(160, 1200); x.quadraticCurveTo(540, 700, 920, 1200); x.lineCap = 'round'; x.lineWidth = 80; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 64; x.strokeStyle = '#2a5a8a'; x.stroke(); } });

  ending(T, { TL, fruit });
  return finish();
}
