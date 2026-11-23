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
  const len = Math.max(2, Math.round(n * (o.k ?? 1))), rad = (i) => (40 + 40 * i / n) * s;
  // black spiky mane along the back
  for (let i = 1; i < len - 1; i++) { const [px, py] = pts[i], r = rad(i); x.beginPath(); x.moveTo(px - r * 0.6, py - r * 0.7); x.lineTo(px - r * 0.1, py - r * 1.75 - Math.sin(t * 6 + i) * 6 * s); x.lineTo(px + r * 0.5, py - r * 0.7); x.closePath(); x.fillStyle = '#14121a'; x.fill(); }
  for (let i = 0; i < len - 1; i++) { const [px, py] = pts[i]; x.beginPath(); x.arc(px, py, rad(i) + 8 * s, 0, 7); x.fillStyle = A.OL; x.fill(); }
  for (let i = 0; i < len - 1; i++) { const [px, py] = pts[i], r = rad(i); x.beginPath(); x.arc(px, py, r, 0, 7); x.fillStyle = '#2a5a8a'; x.fill();
    x.strokeStyle = '#4a8ac0'; x.lineWidth = 3 * s; for (const [ax, ay] of [[-0.35, -0.35], [0.25, -0.45], [-0.05, -0.05]]) { x.beginPath(); x.arc(px + ax * r, py + ay * r, r * 0.25, 0, Math.PI); x.stroke(); }
    x.beginPath(); x.ellipse(px, py + r * 0.5, r * 0.85, r * 0.45, 0, 0, Math.PI); x.fillStyle = '#d8b878'; x.fill(); x.strokeStyle = '#8a6a3a'; x.lineWidth = 3 * s; x.beginPath(); x.moveTo(px - r * 0.7, py + r * 0.62); x.lineTo(px + r * 0.7, py + r * 0.62); x.stroke(); }
  const [hx, hy] = pts[len - 1];
  // little clawed arm under the neck
  if (len > 6) { const [ax, ay] = pts[len - 5]; x.save(); x.translate(ax, ay + rad(len - 5) * 0.7); x.scale(s, s); x.beginPath(); x.moveTo(0, 0); x.lineTo(20, 90); x.lineWidth = 28; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 18; x.strokeStyle = '#2a5a8a'; x.stroke(); for (const d of [-14, 0, 14]) { x.beginPath(); x.moveTo(20 + d, 95); x.lineTo(28 + d * 1.6, 128); x.lineWidth = 7; x.strokeStyle = '#f4ecd8'; x.stroke(); } x.restore(); }
  x.save(); x.translate(hx, hy); x.scale(s, s);
  // antlers: tan, branching, sweeping back
  for (const [sd, off] of [[-1, 0], [1, 14]]) { x.save(); x.translate(-30 + off, -50); x.lineCap = 'round'; const br = () => { x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(-60, -90, -150, -150); x.moveTo(-60, -80); x.lineTo(-40, -150); x.moveTo(-110, -125); x.lineTo(-100, -190); x.moveTo(-30, -40); x.lineTo(-90, -40); };
    br(); x.lineWidth = 26; x.strokeStyle = A.OL; x.stroke(); br(); x.lineWidth = 16; x.strokeStyle = sd < 0 ? '#b89a6a' : '#d8b878'; x.stroke(); x.restore(); }
  // black mane behind the head
  for (let k = 0; k < 7; k++) { x.beginPath(); x.moveTo(-60, -40 + k * 14); x.lineTo(-170 - (k % 2) * 30, -60 + k * 26); x.lineTo(-60, -20 + k * 14); x.closePath(); x.fillStyle = '#14121a'; x.fill(); }
  // head: snout + open jaw
  x.beginPath(); x.moveTo(-90, -60); x.quadraticCurveTo(40, -80, 170, -30); x.lineTo(175, 0); x.lineTo(-90, 10); x.closePath(); A.fs(x, '#2a5a8a', 9);
  const jaw = o.roar ? 1 : 0.35; x.beginPath(); x.moveTo(-70, 10); x.lineTo(160, 10 + 40 * jaw); x.lineTo(150, 40 + 60 * jaw); x.quadraticCurveTo(20, 60 + 30 * jaw, -70, 50); x.closePath(); A.fs(x, '#2a5a8a', 9);
  x.beginPath(); x.moveTo(-40, 12); x.lineTo(150, 12 + 36 * jaw); x.lineTo(150, 30 + 36 * jaw); x.lineTo(-40, 40); x.closePath(); x.fillStyle = '#8a1a2a'; x.fill();
  x.fillStyle = '#f4f4f8'; for (let k = 0; k < 6; k++) { const tx = -20 + k * 30; x.beginPath(); x.moveTo(tx, 8); x.lineTo(tx + 8, 28); x.lineTo(tx + 16, 8); x.fill(); x.beginPath(); x.moveTo(tx, 44 + k * 6 * jaw); x.lineTo(tx + 8, 26 + k * 6 * jaw); x.lineTo(tx + 16, 44 + k * 6 * jaw); x.fill(); }
  x.beginPath(); x.ellipse(50, -42, 22, 13, -0.2, 0, 7); A.fs(x, '#ff4a3a', 5); x.fillStyle = '#1b1530'; x.fillRect(46, -52, 7, 20);
  x.strokeStyle = '#4a8ac0'; x.lineWidth = 4; for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(-40 + k * 40, -40, 14, Math.PI, 0); x.stroke(); }
  // long whiskers
  for (const [sd, c] of [[-1, '#14121a'], [1, '#14121a']]) { x.beginPath(); x.moveTo(150, -20); x.bezierCurveTo(220, 40 * sd - 40, 120, 160 * sd, 200, 260 * sd - 40); x.lineCap = 'round'; x.lineWidth = 8; x.strokeStyle = c; x.stroke(); }
  x.restore(); return [hx + 160 * s, hy + 20 * s]; }
// Front-facing Kaido dragon (from the user's anime reference): head-on blue dragon face with red eyes, open fanged jaw,
// tan branching antlers, black wild mane, long whiskers, clawed arms, thick scaly coils with a ridged tan belly behind.
function coil(x, pts, w) { const path = () => { x.beginPath(); pts.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py))); };
  x.lineCap = 'round'; x.lineJoin = 'round'; path(); x.lineWidth = w + 18; x.strokeStyle = A.OL; x.stroke(); path(); x.lineWidth = w; x.strokeStyle = '#2a5a8a'; x.stroke();
  x.save(); x.translate(0, w * 0.22); path(); x.lineWidth = w * 0.45; x.strokeStyle = '#d8b878'; x.stroke(); path(); x.setLineDash([6, w * 0.22]); x.lineWidth = w * 0.45; x.strokeStyle = '#8a6a3a'; x.stroke(); x.restore();
  for (const [off, lw] of [[-0.3, 0.16], [-0.08, 0.14]]) { x.save(); x.translate(0, w * off); path(); x.setLineDash([w * 0.12, w * 0.1]); x.lineWidth = w * lw; x.strokeStyle = off < -0.2 ? '#4a8ac0' : '#3a7ab0'; x.stroke(); x.restore(); } x.setLineDash([]); }
export function dragonFront(x, cx, cy, s, t, o = {}) { x.save(); x.translate(cx, cy); x.scale(s, s); const wv = Math.sin(t * 2) * 20;
  // body coils behind the head
  const c1 = [], c2 = []; for (let i = 0; i <= 30; i++) { const u = i / 30; c1.push([-700 + u * 1400, -250 + Math.sin(u * 5 + t) * 120 + wv]); c2.push([700 - u * 1400, 330 + Math.sin(u * 4 + t + 2) * 110]); }
  coil(x, c1, 170); coil(x, c2, 190);
  // neck down from the head
  x.beginPath(); x.moveTo(-120, 0); x.lineTo(120, 0); x.lineTo(150, 420); x.lineTo(-150, 420); x.closePath(); A.fs(x, '#2a5a8a', 12); x.fillStyle = '#d8b878'; x.beginPath(); x.moveTo(-70, 120); x.lineTo(70, 120); x.lineTo(95, 420); x.lineTo(-95, 420); x.closePath(); x.fill(); x.strokeStyle = '#8a6a3a'; x.lineWidth = 6; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(-75 - k * 4, 160 + k * 45); x.lineTo(75 + k * 4, 160 + k * 45); x.stroke(); }
  // clawed arms
  for (const sd of [-1, 1]) { x.save(); x.translate(sd * 220, 220); x.beginPath(); x.moveTo(0, -60); x.lineTo(sd * 60, 120); x.lineCap = 'round'; x.lineWidth = 70; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 52; x.strokeStyle = '#2a5a8a'; x.stroke(); for (const d of [-26, 0, 26]) { x.beginPath(); x.moveTo(sd * 60 + d, 140); x.quadraticCurveTo(sd * 70 + d * 1.4, 190, sd * 60 + d * 1.6, 215); x.lineWidth = 12; x.strokeStyle = '#f4ecd8'; x.stroke(); } if (o.flames) A.flame(x, sd * 70, 150, 90, 220, t, sd + 2); x.restore(); }
  // black wild mane around the head
  for (let i = 0; i < 20; i++) { const a = Math.PI * (0.95 + i / 19 * 1.1), r = 230 + (i % 3) * 50; x.beginPath(); x.moveTo(Math.cos(a - 0.12) * 120, -40 + Math.sin(a - 0.12) * 120); x.lineTo(Math.cos(a) * r, -40 + Math.sin(a) * r * 0.9 + (i % 2) * 20); x.lineTo(Math.cos(a + 0.12) * 120, -40 + Math.sin(a + 0.12) * 120); x.closePath(); x.fillStyle = '#14121a'; x.fill(); }
  for (const sd of [-1, 1]) for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(sd * 120, -60 + k * 30); x.lineTo(sd * (260 + (k % 2) * 60), -40 + k * 40); x.lineTo(sd * 120, -30 + k * 30); x.closePath(); x.fillStyle = '#14121a'; x.fill(); }
  // big tan antlers: curve up and out from the brow, then sweep back with forward branches
  for (const sd of [-1, 1]) { const br = () => { x.beginPath(); x.moveTo(sd * 60, -150); x.bezierCurveTo(sd * 70, -330, sd * 220, -380, sd * 330, -560); x.moveTo(sd * 95, -290); x.quadraticCurveTo(sd * 70, -400, sd * 110, -520); x.moveTo(sd * 180, -360); x.quadraticCurveTo(sd * 170, -460, sd * 220, -560); x.moveTo(sd * 80, -200); x.quadraticCurveTo(sd * 260, -200, sd * 380, -260); };
    x.lineCap = 'round'; br(); x.lineWidth = 46; x.strokeStyle = A.OL; x.stroke(); br(); x.lineWidth = 30; x.strokeStyle = '#d8b878'; x.stroke(); br(); x.lineWidth = 8; x.strokeStyle = '#a8865a'; x.stroke(); }
  // head: broad brow narrowing to a long snout
  x.beginPath(); x.moveTo(-150, -150); x.quadraticCurveTo(0, -220, 150, -150); x.quadraticCurveTo(190, -40, 110, 40); x.lineTo(80, 150); x.quadraticCurveTo(0, 175, -80, 150); x.lineTo(-110, 40); x.quadraticCurveTo(-190, -40, -150, -150); x.closePath(); A.fs(x, '#2a5a8a', 12);
  x.save(); x.beginPath(); x.moveTo(-150, -150); x.quadraticCurveTo(0, -220, 150, -150); x.quadraticCurveTo(190, -40, 110, 40); x.lineTo(80, 150); x.lineTo(-80, 150); x.lineTo(-110, 40); x.quadraticCurveTo(-190, -40, -150, -150); x.clip(); x.strokeStyle = '#4a8ac0'; x.lineWidth = 5; for (let r = 0; r < 6; r++) for (let k = -4; k <= 4; k++) { x.beginPath(); x.arc(k * 40 + (r % 2) * 20, -190 + r * 34, 17, 0, Math.PI); x.stroke(); } x.restore();
  // brows + glowing red eyes
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 30, -95); x.lineTo(sd * 140, -120); x.lineTo(sd * 135, -85); x.closePath(); x.fillStyle = '#1a3a6a'; x.fill(); A.glow(x, sd * 85, -70, 50, '255,60,40', 0.8); x.beginPath(); x.moveTo(sd * 40, -72); x.lineTo(sd * 130, -88); x.lineTo(sd * 115, -55); x.closePath(); A.fs(x, '#ff3a2a', 5); }
  // snout ridge + nostrils
  x.strokeStyle = '#1a3a6a'; x.lineWidth = 6; x.beginPath(); x.moveTo(0, -50); x.lineTo(0, 50); x.stroke(); for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(sd * 30, 70, 14, 9, sd * 0.4, 0, 7); x.fillStyle = '#14121a'; x.fill(); }
  // open jaw with fangs
  const jaw = o.roar ? 1 : 0.5; x.beginPath(); x.moveTo(-80, 120); x.lineTo(80, 120); x.lineTo(70, 160 + 90 * jaw); x.quadraticCurveTo(0, 190 + 100 * jaw, -70, 160 + 90 * jaw); x.closePath(); A.fs(x, '#8a1a2a', 9);
  x.fillStyle = '#ffffff'; for (const dx of [-60, -30, 0, 30, 60]) { x.beginPath(); x.moveTo(dx - 12, 122); x.lineTo(dx, 160); x.lineTo(dx + 12, 122); x.fill(); } for (const dx of [-45, 45]) { x.beginPath(); x.moveTo(dx - 12, 150 + 90 * jaw); x.lineTo(dx, 110 + 80 * jaw); x.lineTo(dx + 12, 150 + 90 * jaw); x.fill(); }
  // long whiskers
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 60, 60); x.bezierCurveTo(sd * 300, 0, sd * 360, 200, sd * 520, 160 + Math.sin(t * 3) * 30); x.lineCap = 'round'; x.lineWidth = 10; x.strokeStyle = '#14121a'; x.stroke(); }
  x.restore(); return [cx, cy + (150 + 90 * (o.roar ? 1 : 0.5)) * s]; }
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
  const p1 = T.shots[T.shots.length - 1]; p1.sfx = [[0.1, 'whoosh']]; p1.draw = function (x, S) { for (let i = 0; i < 4; i++) cloudPuff(x, ((S.T * 260 + i * 330) % 1500) - 200, 1250 + (i % 2) * 120, 1.2); dragon(x, 540, 900, 0.9, S.T); A.speedLines(x, 540, 900, S.T, 10, 260, Math.PI); };

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
