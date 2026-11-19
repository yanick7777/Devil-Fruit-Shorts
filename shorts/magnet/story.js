// Shot plan for the Jiki Jiki no Mi (Magnet-Magnet Fruit) short. Structure: three base powers (pull, scrap arm, push), then AWAKENING as the peak.
import * as A from '/engine/art.js';
import { drawJiki } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawJiki(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:ma_garage', 'rays:blue', 's3:ma_field', 's3:ma_workshop', 's3:ma_foundry', 's3:ma_junkyard', 's3:ma_scrapheap', 's3:ma_port', 's3:ma_onigashima', 's3:ma_reactor', 's3:ma_forest', 's3:ma_roof', 's3:ma_door'];
scene('ma_garage', { sky: ['#d8dce8', '#b8c0d0'], ground: '#6a6a7a', back: [['custom', { fn: (x, h) => { h.rrect(x, 100, 300, 880, 160, 10); h.fs(x, '#8a8aa0', 8); for (let k = 0; k < 6; k++) { h.rrect(x, 140 + k * 140, 340, 80, 30, 8); h.fs(x, '#c8ccd8', 5); } } }], ['crates', {}]] });
scene('ma_field', { sky: ['#1a2a5a', '#3a5aa0'], back: [['custom', { fn: (x) => { x.strokeStyle = 'rgba(120,200,255,0.35)'; x.lineWidth = 8; for (let k = 1; k < 8; k++) { x.beginPath(); x.ellipse(540, 820, 80 * k, 140 * k, 0, 0, 7); x.stroke(); } } }], ['stars', { n: 30 }]] });
scene('ma_workshop', { sky: ['#f0e0c8', '#d8c0a0'], ground: '#7a6a5a', back: [['shelves', { rows: 3, y: 240, cols: ['#8a8aa0', '#c8ccd8', '#a07850'] }]] });
scene('ma_foundry', { sky: ['#4a2a1a', '#8a3a1a'], ground: '#3a2a2a', back: [['pipes', { n: 5, col: '#6a5a5a' }], ['custom', { fn: (x) => { const g = x.createRadialGradient(540, 1250, 50, 540, 1250, 600); g.addColorStop(0, 'rgba(255,160,40,0.6)'); g.addColorStop(1, 'rgba(255,160,40,0)'); x.fillStyle = g; x.fillRect(-100, 600, 1300, 800); } }]] });
scene('ma_junkyard', { sky: ['#e8c8a0', '#f8e8d0'], ground: '#8a7a6a', back: [['custom', { fn: (x, h) => { for (const [cx, w, hh, col] of [[160, 360, 420, '#7a7a8a'], [560, 420, 560, '#8a8a9a'], [940, 360, 380, '#6a6a7a']]) { x.beginPath(); x.moveTo(cx - w / 2, 1250); x.lineTo(cx - w / 4, 1250 - hh); x.lineTo(cx + w / 5, 1250 - hh * 0.9); x.lineTo(cx + w / 2, 1250); x.closePath(); h.fs(x, col, 9); x.beginPath(); x.arc(cx, 1250 - hh * 0.5, 40, 0, 7); h.fs(x, '#3a3346', 6); } } }]] });
scene('ma_scrapheap', { sky: ['#5a5a7a', '#8a8aa8'], ground: '#5a5a5a', back: [['custom', { fn: (x, h) => { for (let i = 0; i < 14; i++) { x.save(); x.translate(h.hash(i + 3) * 1080, 1050 + h.hash(i + 4) * 200); x.rotate(h.hash(i) * 3); h.rrect(x, -60, -20, 120, 40, 6); h.fs(x, ['#8a8aa0', '#a07850', '#6a6a7a'][i % 3], 6); x.restore(); } } }], ['fog', { n: 5, col: 'rgba(255,255,255,0.15)' }]] });
scene('ma_port', { sky: ['#9ad0ff', '#e0f2ff'], ground: '#8a8a8a', gy: 1250, back: [['water', { y: 1000, hh: 250, col: '#3a7ac8' }], ['custom', { fn: (x, h) => { h.rrect(x, 760, 300, 40, 700, 6); h.fs(x, '#e8402e', 8); h.rrect(x, 520, 300, 380, 40, 6); h.fs(x, '#e8402e', 8); x.beginPath(); x.moveTo(560, 340); x.lineTo(560, 600); x.lineWidth = 6; x.strokeStyle = '#3a3346'; x.stroke(); } }]] });
scene('ma_onigashima', { sky: ['#2a0a1a', '#5a1a2a'], ground: '#3a2a2a', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(-100, 1250); x.lineTo(200, 500); x.lineTo(540, 380); x.lineTo(880, 500); x.lineTo(1180, 1250); x.closePath(); h.fs(x, '#4a3a3a', 10); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(540 + sd * 200, 420); x.quadraticCurveTo(540 + sd * 380, 200, 540 + sd * 300, 60); x.quadraticCurveTo(540 + sd * 280, 280, 540 + sd * 120, 400); h.fs(x, '#e8e0d0', 9); } } }], ['stars', { n: 30 }]] });
scene('ma_reactor', { sky: ['#0a1a3a', '#1a3a6a'], ground: '#2a3a5a', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(540, 820, 200 + k * 140, 0, 7); x.lineWidth = 16; x.strokeStyle = `rgba(100,200,255,${0.5 - k * 0.12})`; x.stroke(); } h.rrect(x, 440, 1000, 200, 260, 10); h.fs(x, '#3a4a6a', 8); } }]] });
scene('ma_forest', { sky: ['#a8d8a8', '#e8f8e8'], ground: '#6aa04a', back: [['trees', { n: 4, x0: 20, gap: 300, leaf: '#3a8a4a' }]] });
scene('ma_roof', { sky: ['#ff9a6a', '#ffd8b0'], ground: '#6a3a3a', back: [['custom', { fn: (x, h) => { for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(-100 + i * 220, 1250); x.lineTo(10 + i * 220, 1080); x.lineTo(120 + i * 220, 1250); x.closePath(); h.fs(x, '#3a3346', 8); } } }], ['sun', { x: 540, y: 600, r: 160 }]] });
scene('ma_door', { sky: ['#e8e0d8', '#d0c8c0'], ground: '#8a6a4a', back: [['custom', { fn: (x, h) => { h.rrect(x, 640, 400, 300, 860, 10); h.fs(x, '#8a5a3a', 10); x.beginPath(); x.arc(900, 860, 22, 0, 7); h.fs(x, '#f4d030', 6); h.rrect(x, 120, 600, 280, 30, 10); h.fs(x, '#6b4630', 6); for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(170 + k * 80, 630); x.lineTo(170 + k * 80, 700); x.lineWidth = 6; x.strokeStyle = '#3a3346'; x.stroke(); } } }]] });

// ---------------- magnetism ----------------
const METAL = ['#a8b0c0', '#8a8fa0', '#c8ccd8', '#6a6f80'];
function scrap(x, cx, cy, s, i, t) { x.save(); x.translate(cx, cy); x.rotate(i * 1.7 + t); x.scale(s, s); const k = i % 4;
  if (k === 0) { A.rrect(x, -50, -14, 100, 28, 8); A.fs(x, METAL[i % 4], 6); }
  else if (k === 1) { x.beginPath(); x.arc(0, 0, 34, 0, 7); A.fs(x, METAL[i % 4], 6); x.beginPath(); x.arc(0, 0, 12, 0, 7); A.fs(x, '#3a3346', 4); }
  else if (k === 2) { A.sword(x, 0, 30, 0, 0.5); }
  else { for (let g = 0; g < 8; g++) { const a = g / 8 * 6.283; A.rrect(x, Math.cos(a) * 30 - 8, Math.sin(a) * 30 - 8, 16, 16, 3); A.fs(x, METAL[1], 3); } x.beginPath(); x.arc(0, 0, 30, 0, 7); A.fs(x, METAL[0], 6); }
  x.restore(); }
function fieldLines(x, cx, cy, r, t, col = '120,200,255') { x.save(); x.strokeStyle = `rgba(${col},0.6)`; x.lineWidth = 6; x.setLineDash([20, 16]); x.lineDashOffset = -t * 120; for (let k = 1; k <= 3; k++) { x.beginPath(); x.ellipse(cx, cy, r * k / 3, r * k / 2, 0, 0, 7); x.stroke(); } x.setLineDash([]); x.restore(); }
function scrapArm(x, cx, cy, s, t, n = 26) { for (let i = 0; i < n; i++) { const u = i / n; scrap(x, cx + Math.sin(u * 3) * 40 * s + (u - 0.5) * 140 * s, cy - u * 700 * s, s * (1.2 - u * 0.3), i, t * 0.1); } x.beginPath(); x.arc(cx, cy - 760 * s, 120 * s, 0, 7); A.fs(x, METAL[2], 10 * s); }
export function jikiIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { fieldLines(x, 0, 0, 160, t); for (let i = 0; i < 4; i++) scrap(x, Math.cos(i * 1.57) * 110, Math.sin(i * 1.57) * 110, 0.8, i, t); }
  else if (k === 2) scrapArm(x, 0, 150, 0.4, t, 12);
  else if (k === 3) { for (let i = 0; i < 3; i++) scrap(x, -80 + i * 80, 0, 0.8, 2, -0.6); A.speedLines(x, 0, 0, t, 8, 160); }
  else { A.glow(x, 0, 0, 200, '120,200,255', 0.6); fieldLines(x, 0, 0, 200, t, '255,230,120'); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'blue swirl balls wrapped in a yellow zigzag ring', biteDesc: 'spoons and keys fly off the desk and stick to the host', biteSfx: 'zip', bannerCol: 'blue', biteCol: '#3a6ad8',
    biteFx(x, S, k) { if (k > 0 && k < 1) for (let i = 0; i < 4; i++) scrap(x, lerp(200 + i * 200, 560, k), lerp(1500, 800, k), 0.6, i, S.T); },
    calmBg: 's3:ma_garage', calmDesc: 'mechanic garage', seaHue: 'blue', seed: 73, nameRe: /^Magnet-Magnet/,
    revealBg: 's3:ma_field', revealDesc: 'night sky full of magnetic field lines', revealBanner: 'MAGNET-MAGNET FRUIT', haloRgb: '140,200,255' });
  const tCtrl = W('type', /^control/) - 0.1, tAwk = W('type', /^awaken/) - 0.1;
  add({ name: 'Magnetism (workshop): blue field lines ripple out of the host and every tool on the shelves rattles', t0: tCtrl, t1: tAwk, bg: 's3:ma_workshop',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'hum']],
    draw(x, S) { fieldLines(x, 540, 1300, 520, S.T); person(x, S, 'host', 'shock', 540, 1780, 0.66, { seed: 2, pose: 'raise' }); for (let i = 0; i < 5; i++) scrap(x, 140 + i * 200 + Math.sin(S.T * 30 + i) * 6, 900, 0.7, i, 0); } });
  stage(T, { desc: 'glowing foundry', bg: 's3:ma_foundry', t0: tAwk, t1: end('type'), times: [W('type', /^awaken/), W('type', /^awaken/) + 0.2, W('type', /^awaken/) + 0.4, W('type', /^awaken/) + 0.6],
    labels: ['POWER 1', 'POWER 2', 'POWER 3', 'AWAKENED'], bar: 'MAGNET POWERS', haloRgb: '140,200,255', icon: jikiIcon });

  const tEvery = W('power1', /^everywhere/) - 0.1;
  addSplit({ name: 'Power 1 (junkyard): Kid holds out his hand and wrenches, gears and swords zoom toward him; blue PULL banner', t0: st('power1'), t1: end('power1'), bg: 's3:ma_junkyard',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['PULL METAL', 'blue', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'zip'], [0.5, 'thunk']],
    draw(x, S) { const k = ease.outCubic(prog(S.T, W('power1', /^pull/), tEvery)); const kd = person(x, S, 'eustass', 'grin', 360, 1780, 0.66, { seed: 2, pose: 'punch' }); fieldLines(x, kd.hand.R[0], kd.hand.R[1], 260, S.T); for (let i = 0; i < 6; i++) scrap(x, lerp(1000 - (i % 3) * 60, kd.hand.R[0] + 40, k), lerp(900 + i * 100, kd.hand.R[1], k), 0.7, i, S.T); } },
    tEvery, [[0.95, 540, 980, 0.02], [1.0, 540, 960, 0.035]], 'Power 1 everywhere (same junkyard): metal streams in from every direction and clumps into a ball around him');
  const p1 = T.shots[T.shots.length - 1]; p1.draw = function (x, S) { person(x, S, 'eustass', 'grin', 540, 1780, 0.62, { seed: 2, pose: 'raise' }); for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + S.T, r = lerp(700, 260, prog(S.T, S.t0, S.t0 + 0.8)); scrap(x, 540 + Math.cos(a) * r, 1300 + Math.sin(a) * r, 0.6, i, S.T); } };

  add({ name: 'Power 2 evolve (scrap heap): pull icon becomes the arm icon; scrap metal stacks into a giant mechanical arm on Kid\'s shoulder; red SCRAP ARM banner', t0: st('power2'), t1: end('power2'), bg: 's3:ma_scrapheap',
    cam: [[0.95, 540, 940, 0], [1.0, 540, 920, -0.02]], banners: [['GIANT SCRAP ARM', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^build/) - st('power2'), 'crumble'], [W('power2', /^arm/) - st('power2'), 'stamp']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, jikiIcon)) return; const k = prog(S.T, W('power2', /^build/), W('power2', /^arm/) + 0.3); const kd = person(x, S, 'eustass', 'grin', 360, 1800, 0.62, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 }); if (k > 0) scrapArm(x, 760, 1760, 1.35, S.T, Math.max(1, Math.floor(26 * k))); } });

  const tFire = W('power3', /^fire/) - 0.1;
  addSplit({ name: 'Power 3 evolve (harbour): arm icon becomes the bullet icon; Kid flings his hand and a wall of swords and bolts flies away from him; purple REPEL banner', t0: st('power3'), t1: end('power3'), bg: 's3:ma_port',
    cam: [[1.0, 540, 980, 0], [1.06, 560, 960, 0.02]], banners: [['PUSH METAL AWAY', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^push/) - st('power3'), 'whoosh']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, jikiIcon)) return; const k = prog(S.T, W('power3', /^push/), tFire); const kd = person(x, S, 'eustass', 'grin', 260, 1780, 0.62, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 }); for (let i = 0; i < 6; i++) scrap(x, kd.hand.R[0] + 80 + k * 500 + (i % 2) * 60, 1100 + i * 90, 0.7, i, 0); } },
    tFire, [[1.0, 540, 1000, -0.02], [1.06, 540, 980, -0.035]], 'Power 3 bullets (same harbour): a hail of metal fires across the frame and pins a grunt\'s coat to the crane; shake');
  const p3 = T.shots[T.shots.length - 1]; p3.sfx = [[0, 'bullets']]; p3.draw = function (x, S) { A.speedLines(x, 540, 1300, S.T, 14, 300); for (let i = 0; i < 8; i++) { const u = ((S.T - S.t0) * 2 + i / 8) % 1; scrap(x, lerp(-60, 760, u), 1000 + i * 60, 0.6, 2, -1.57); } const g = person(x, S, 'grunt', 'shock', 860, 1780, 0.6, { seed: 3, pose: 'raise', flip: true }); A.mark(x, '!?', g.head[0] - 100, g.head[1] - 180, pop(S.T, S.t0 + 0.2)); if (S.T < S.t0 + 0.25) S.shake = 0.5; };

  const tEven = W('awaken', /^even/) - 0.1;
  addSplit({ name: 'AWAKENED (Onigashima rooftop): bullet icon gives way to the gold-field icon, gold halo; gold AWAKENED banner; Kid makes a whole rooftop of stone and wood stick together like a magnet', t0: st('awaken'), t1: end('awaken'), bg: 's3:ma_onigashima',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['AWAKENED', 'gold', W('awaken', /^awaken/) - 0.1, end('awaken'), 'slide']], sfx: [[0, 'evolve'], [W('awaken', /^awaken/) - st('awaken'), 'levelup'], [W('awaken', /^magnetic/) - st('awaken'), 'hum']],
    draw(x, S) { halo(x, 540, 900, 620, '255,220,120', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, jikiIcon); return; }
      fieldLines(x, 540, 1200, 600, S.T, '255,230,120'); const k = prog(S.T, W('awaken', /^anything/), tEven); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; x.save(); x.translate(lerp(540 + Math.cos(a) * 600, 540 + Math.cos(a) * 300, k), lerp(1200 + Math.sin(a) * 500, 1200 + Math.sin(a) * 260, k)); x.rotate(a); A.rrect(x, -50, -30, 100, 60, 8); A.fs(x, i % 2 ? '#8a7a6a' : '#a07850', 7); x.restore(); }
      person(x, S, 'eustass', 'grin', 540, 1780, 0.7, { seed: 7, pose: 'raise' }); } },
    tEven, [[1.0, 540, 1000, -0.02], [1.08, 540, 990, -0.035]], 'AWAKENED people (same rooftop): two grunts get yanked together and stick back to back, gold field lines around them');
  const pk = T.shots[T.shots.length - 1]; pk.sfx = [[0, 'thunk'], [0.2, 'boing']]; pk.draw = function (x, S) { const k = ease.outBack(prog(S.T, S.t0, S.t0 + 0.5)); fieldLines(x, 540, 1300, 400, S.T, '255,230,120'); person(x, S, 'grunt', 'shock', lerp(160, 420, k), 1780, 0.6, { seed: 3, pose: 'shrug' }); person(x, S, 'grunt', 'shock', lerp(920, 660, k), 1780, 0.6, { seed: 4, pose: 'shrug', flip: true }); if (k > 0.9) A.mark(x, '!?', 540, 950, pop(S.T, S.t0 + 0.5)); };

  add({ name: 'Twist (humming reactor room): push-in with roll, low sting; red ONE CATCH banner', t0: st('twist'), t1: end('twist'), bg: 's3:ma_reactor', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['ONE CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Metal only (forest): Kid\'s magnetism pulls a sword out of a farmer\'s hands but his wooden pitchfork stays put; red METAL ONLY banner', t0: st('truth'), t1: end('truth'), bg: 's3:ma_forest',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['METAL ONLY', 'red', W('truth', /^metal/) - 0.1, W('truth', /^unless/)], ['UNLESS AWAKENED', 'gold', W('truth', /^unless/), end('truth')]], sfx: [[0.2, 'zip'], [W('truth', /^unless/) - st('truth'), 'levelup']],
    draw(x, S) { const kd = person(x, S, 'eustass', 'smug', 280, 1780, 0.62, { seed: 2, pose: 'punch' }); fieldLines(x, kd.hand.R[0], kd.hand.R[1], 200, S.T); const f = person(x, S, 'farmer', 'shock', 820, 1780, 0.6, { seed: 4, pose: 'holdUp', flip: true }); x.save(); x.translate(f.hand.L[0], f.hand.L[1]); x.rotate(-0.2); A.rrect(x, -8, -260, 16, 360, 6); A.fs(x, '#a07850', 5); x.restore(); scrap(x, lerp(f.hand.L[0], kd.hand.R[0] + 60, prog(S.T, S.t0 + 0.2, S.t0 + 0.8)), f.hand.L[1] - 40, 0.8, 2, -1.57); A.mark(x, '?', f.head[0] - 100, f.head[1] - 180, pop(S.T, S.t0 + 0.9)); } });

  const tBig = W('users', /^Big/) - 0.1;
  add({ name: 'Eustass Kid (sunset rooftops): Kid, spiky red hair, goggles, red fur coat and metal arm; purple EUSTASS KID banner', t0: st('users'), t1: tBig, bg: 's3:ma_roof',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['EUSTASS KID', 'pink', st('users') + 0.2, tBig + 0.2]], sfx: [[0, 'whoosh'], [0.3, 'hum']],
    draw(x, S) { person(x, S, 'eustass', 'grin', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); } });
  add({ name: 'Down goes Big Mom (Onigashima): a huge shadow with wild pink hair topples backwards as Kid\'s magnetic punch lands; red WITH LAW IN WANO banner', t0: tBig, t1: end('users'), bg: 's3:ma_onigashima',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['BEAT BIG MOM WITH LAW', 'red', tBig + 0.1, end('users')]], sfx: [[W('users', /^down/) - tBig, 'impact']],
    draw(x, S) { const td = W('users', /^down/), k = Math.pow(prog(S.T, td, td + 0.8), 2); x.save(); x.translate(720, 1950); x.rotate(0.3 * k); x.scale(0.85, 0.85); x.fillStyle = '#14121a'; A.rrect(x, -260, -900, 520, 900, 200); x.fill(); x.beginPath(); x.arc(0, -1000, 170, 0, 7); x.fill(); for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + i / 9); x.beginPath(); x.arc(Math.cos(a) * 200, -1000 + Math.sin(a) * 200, 70, 0, 7); x.fillStyle = '#ff8cc0'; x.fill(); } x.restore();
      person(x, S, 'eustass', 'grin', 260, 1800, 0.66, { seed: 8, pose: 'punch' }); if (S.T > td) { A.impactStar(x, 560, 1300, 200 * pop(S.T, td), S.T); if (S.T < td + 7 * F) S.shake = 0.7; } } });

  add({ name: 'Joke (front door): the host stands at the door, holds out a hand, and his keys come flying off the hook into it; gold NEVER LOSE KEYS banner', t0: st('joke'), t1: end('joke'), bg: 's3:ma_door',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NEVER LOSE YOUR KEYS', 'gold', W('joke', /^lose/) - 0.1, end('joke')]], sfx: [[W('joke', /^keys/) - st('joke'), 'zip'], [W('joke', /^keys/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 520, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'punch', talk: true }); const k = ease.outCubic(prog(S.T, W('joke', /^keys/) - 0.3, W('joke', /^keys/) + 0.1)); const kx = lerp(250, h.hand.R[0] + 30, k), ky = lerp(720, h.hand.R[1] - 20, k);
      x.beginPath(); x.arc(kx, ky, 26, 0, 7); x.lineWidth = 10; x.strokeStyle = '#f4d030'; x.stroke(); A.rrect(x, kx + 10, ky - 6, 80, 14, 4); A.fs(x, '#c8ccd8', 4); if (k > 0 && k < 1) A.speedLines(x, kx, ky, S.T, 6, 120); } });

  ending(T, { TL, fruit });
  return finish();
}
