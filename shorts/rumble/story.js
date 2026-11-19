// Shot plan for the Goro Goro no Mi (Rumble-Rumble Fruit) short. Structure: Logia techniques (dodge + speed, bolts, thundercloud), Amaru as the peak.
import * as A from '/engine/art.js';
import { drawGoro } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawGoro(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:ru_cloudsea', 'rays:yellow', 's3:ru_storm', 's3:ru_lab', 's3:ru_ruins', 's3:ru_forest', 's3:ru_dock', 's3:ru_island', 's3:ru_temple', 's3:ru_ark', 's3:ru_skypiea', 's3:ru_bell', 's3:ru_bedroom'];
const cloudFloor = (col) => ['custom', { fn: (x, h) => { for (let i = 0; i < 9; i++) h.cloud(x, i * 140 - 40, 1260 + (i % 2) * 30, 1.6, col); } }];
scene('ru_cloudsea', { sky: ['#8fd4ff', '#e8f6ff'], ground: '#ffffff', gy: 1300, back: [['clouds', { n: 4, y: 260 }], cloudFloor('#ffffff')] });
scene('ru_storm', { sky: ['#2a2a5a', '#4a4a8a'], back: [['clouds', { n: 5, y: 220, seed: 3, col: '#5a5a8a' }], ['custom', { fn: (x) => { x.strokeStyle = 'rgba(255,240,120,0.5)'; x.lineWidth = 10; for (const bx of [180, 900]) { x.beginPath(); x.moveTo(bx, 0); x.lineTo(bx + 60, 300); x.lineTo(bx - 20, 340); x.lineTo(bx + 40, 700); x.stroke(); } } }]] });
scene('ru_lab', { sky: ['#e8f0ff', '#c8d8f0'], ground: '#8a9ab0', back: [['pipes', { n: 5, col: '#b8c8d8' }], ['custom', { fn: (x, h) => { h.rrect(x, 340, 380, 400, 260, 16); h.fs(x, '#1b2440', 9); x.strokeStyle = '#f4d030'; x.lineWidth = 10; x.beginPath(); x.moveTo(380, 520); x.lineTo(480, 520); x.lineTo(520, 440); x.lineTo(560, 600); x.lineTo(600, 500); x.lineTo(700, 500); x.stroke(); } }]] });
scene('ru_ruins', { sky: ['#ffe8b0', '#fff6dc'], ground: '#d8c090', back: [['columns', { n: 4, x0: 40, gap: 300, w: 70, col: '#e8d8b0' }], ['clouds', { n: 2, y: 200, seed: 5 }]] });
scene('ru_forest', { sky: ['#a8e8c8', '#e8fff0'], ground: '#7ac05a', back: [['trees', { n: 4, x0: 20, gap: 300, leaf: '#3a9a4a' }], ['clouds', { n: 2, y: 160, seed: 8 }]] });
scene('ru_dock', { sky: ['#9ad0ff', '#e0f2ff'], ground: '#a07850', gy: 1250, back: [['water', { y: 1000, hh: 250, col: '#4a9ae8' }], ['crates', {}]] });
scene('ru_island', { sky: ['#3a3a6a', '#7a7aa8'], back: [['water', { y: 1250, hh: 800, col: '#2a5a9a' }], ['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(140, 1260); x.quadraticCurveTo(540, 900, 940, 1260); x.closePath(); h.fs(x, '#5a9a4a', 10); for (const tx of [380, 540, 700]) { h.rrect(x, tx - 12, 1010, 24, 120, 6); h.fs(x, '#6b4630', 6); x.beginPath(); x.arc(tx, 1000, 50, 0, 7); h.fs(x, '#3a8a3a', 7); } } }]] });
scene('ru_temple', { sky: ['#1a1a40', '#3a3a7a'], ground: '#c8b890', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(140, 1250); x.lineTo(140, 700); x.lineTo(540, 460); x.lineTo(940, 700); x.lineTo(940, 1250); x.closePath(); h.fs(x, '#e8d8b0', 10); for (let k = 0; k < 4; k++) { h.rrect(x, 200 + k * 200, 760, 70, 480, 8); h.fs(x, '#d0bc90', 7); } } }], ['stars', { n: 40 }]] });
scene('ru_ark', { sky: ['#4a5a8a', '#8a9ac8'], back: [['clouds', { n: 4, y: 900, seed: 9, col: '#c8d0e8' }], ['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(60, 700); x.lineTo(1020, 700); x.lineTo(900, 880); x.lineTo(180, 880); x.closePath(); h.fs(x, '#8a5a3a', 10); h.rrect(x, 520, 280, 30, 420, 6); h.fs(x, '#6b4630', 6); x.beginPath(); x.moveTo(550, 300); x.quadraticCurveTo(820, 440, 550, 640); x.closePath(); h.fs(x, '#f4f0e0', 8); } }]] });
scene('ru_skypiea', { sky: ['#ffd8a8', '#fff2dc'], ground: '#ffffff', gy: 1300, back: [['custom', { fn: (x, h) => { for (const [hx, hy] of [[120, 900], [760, 860]]) { x.beginPath(); x.ellipse(hx + 100, hy + 120, 140, 120, 0, 0, 7); h.fs(x, '#f4f0f8', 9); h.rrect(x, hx + 70, hy + 140, 60, 100, 20); h.fs(x, '#8a6a4a', 6); } } }], cloudFloor('#ffffff')] });
scene('ru_bell', { sky: ['#ffe8a0', '#fff8e0'], ground: '#ffffff', gy: 1300, back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(380, 300); x.quadraticCurveTo(380, 120, 540, 120); x.quadraticCurveTo(700, 120, 700, 300); x.lineTo(760, 560); x.lineTo(320, 560); x.closePath(); h.fs(x, '#e8b830', 12); x.beginPath(); x.arc(540, 580, 40, 0, 7); h.fs(x, '#c89a10', 8); } }], ['rays', { col: 'rgba(255,255,255,0.25)' }], cloudFloor('#ffffff')] });
scene('ru_bedroom', { sky: ['#e8e0f8', '#d0c8ec'], ground: '#a07850', back: [['windows', { n: 2, x0: 160, gap: 500 }], ['custom', { fn: (x, h) => { h.rrect(x, 640, 1000, 300, 60, 10); h.fs(x, '#6b4630', 8); } }]] });

// ---------------- lightning effects ----------------
export function bolt(x, x0, y0, x1, y1, t, w = 14, col = '#fff6a0', seed = 0) {
  const n = 9, pts = []; for (let i = 0; i <= n; i++) { const k = i / n, j = i && i < n ? Math.sin(t * 40 + i * 7.3 + seed) * 40 : 0; pts.push([lerp(x0, x1, k) + j, lerp(y0, y1, k) - j * 0.4]); }
  x.save(); x.lineCap = 'round'; x.lineJoin = 'round'; for (const [lw, c] of [[w * 3, 'rgba(120,200,255,0.35)'], [w, col], [w * 0.4, '#ffffff']]) { x.beginPath(); pts.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py))); x.lineWidth = lw; x.strokeStyle = c; x.stroke(); } x.restore(); }
export function sparks(x, cx, cy, r, t, n = 6) { for (let i = 0; i < n; i++) { const a = i / n * 6.283 + t * 3; bolt(x, cx, cy, cx + Math.cos(a) * r, cy + Math.sin(a) * r, t, 6, '#fff6a0', i); } }
function stormCloud(x, cx, cy, s, t) { x.save(); x.translate(cx, cy); x.scale(s, s); for (const [dx, dy, r] of [[-160, 20, 120], [0, -40, 160], [170, 10, 120], [80, 60, 110], [-80, 70, 110]]) { x.beginPath(); x.arc(dx, dy, r, 0, 7); A.fs(x, '#4a4a6a', 10); } x.fillStyle = '#4a4a6a'; x.fillRect(-250, 20, 500, 120); if (Math.sin(t * 9) > 0.2) A.glow(x, 0, 40, 260, '255,240,150', 0.4); x.restore(); }
export function goroIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { A.speedLines(x, 0, 0, t, 10, 180); bolt(x, -120, 0, 120, 0, t, 10); }
  else if (k === 2) bolt(x, -60, -160, 60, 160, t, 18);
  else if (k === 3) { stormCloud(x, 0, -40, 0.45, t); bolt(x, 0, 0, 0, 160, t, 10); }
  else { A.glow(x, 0, 0, 200, '120,200,255', 0.7); sparks(x, 0, 0, 160, t, 7); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a spiky yellow fruit with a lightning-bolt stem', biteDesc: 'sparks crackle off the host\'s hair', biteSfx: 'zap', bannerCol: 'gold', biteCol: '#f4d030',
    biteFx(x, S, k) { if (k > 0 && k < 1) sparks(x, 560, 760, 200 * k, S.T, 5); },
    calmBg: 's3:ru_cloudsea', calmDesc: 'sea of white clouds', seaHue: 'yellow', seed: 61, nameRe: /^Rumble-Rumble/,
    revealBg: 's3:ru_storm', revealDesc: 'thunderstorm sky', revealBanner: 'RUMBLE-RUMBLE FRUIT', haloRgb: '255,230,120' });
  const tTurns = W('type', /^turns/) - 0.1, tLight = W('type', /^lightning/) - 0.1;
  add({ name: 'Logia (lab with a voltage screen): the host turns into crackling yellow lightning from the feet up', t0: tTurns, t1: tLight, bg: 's3:ru_lab',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'zap']],
    draw(x, S) { const k = prog(S.t, 0.1, 0.9); person(x, S, 'host', 'shock', 540, 1780, 0.7, { seed: 2, pose: 'raise', alpha: 1 - k * 0.5 }); for (let i = 0; i < 6; i++) bolt(x, 380 + i * 64, 1780, 400 + i * 60, lerp(1780, 700, k), S.T, 8, '#fff6a0', i); } });
  stage(T, { desc: 'ancient sky ruins', bg: 's3:ru_ruins', t0: tLight, t1: end('type'), times: [W('type', /^lightning/), W('type', /^lightning/) + 0.2, W('type', /^lightning/) + 0.4, W('type', /^lightning/) + 0.6],
    labels: ['DODGE', 'BOLTS', 'STORM', 'AMARU'], bar: 'LIGHTNING POWERS', haloRgb: '255,230,120', icon: goroIcon });

  const tMove = W('power1', /^move/) - 0.1;
  addSplit({ name: 'Power 1 (sky forest): a grunt swings a sword straight through the host\'s body, which is just lightning; gold INTANGIBLE banner', t0: st('power1'), t1: end('power1'), bg: 's3:ru_forest',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['UNTOUCHABLE', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.3, 'slash'], [0.5, 'zap']],
    draw(x, S) { const k = prog(S.T, W('power1', /^pass/) - 0.2, W('power1', /^through/) + 0.2); person(x, S, 'host', 'smug', 360, 1780, 0.66, { seed: 2, pose: 'idle' }); sparks(x, 360, 1350, 140, S.T, 4);
      const e = person(x, S, 'grunt', 'shock', lerp(860, 520, k), 1780, 0.62, { seed: 3, pose: 'punch', flip: true }); A.sword(x, e.hand.R[0], e.hand.R[1], lerp(-1.2, 1.2, k), 1.0); if (k >= 1) A.mark(x, '?', e.head[0] - 120, e.head[1] - 180, pop(S.T, W('power1', /^through/) + 0.2)); } },
    tMove, [[1.0, 540, 1000, 0.02], [1.06, 540, 990, 0.035]], 'Power 1 speed (same forest): the host zips across the frame as a streak of lightning, the grunt spins around');
  const p1 = T.shots[T.shots.length - 1]; p1.draw = function (x, S) { const u = (S.T * 1.5) % 1; A.speedLines(x, 540, 1300, S.T, 14, 300); bolt(x, lerp(-100, 1180, u) - 300, 1300, lerp(-100, 1180, u), 1300, S.T, 22); const e = person(x, S, 'grunt', 'worried', 540, 1800, 0.6, { seed: 3, pose: 'shrug', flip: Math.sin(S.T * 6) > 0 }); A.mark(x, '!?', e.head[0] + 100, e.head[1] - 180, pop(S.T, S.t0 + 0.3)); };

  const tBolts = W('power2', /^bolts/) - 0.1;
  add({ name: 'Power 2 evolve (sky dock): dodge icon becomes the bolt icon; the host fires giant lightning bolts from both hands at a wooden crate pile, it explodes; red LIGHTNING BOLT banner', t0: st('power2'), t1: end('power2'), bg: 's3:ru_dock',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['LIGHTNING BOLTS', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [tBolts - st('power2'), 'zap'], [tBolts - st('power2') + 0.2, 'boom']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, goroIcon)) return; const h = person(x, S, 'host', 'grin', 260, 1780, 0.64, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 }); const k = prog(S.T, W('power2', /^shoot/), tBolts + 0.2);
      if (k > 0) bolt(x, h.hand.R[0], h.hand.R[1], lerp(h.hand.R[0], 860, k), lerp(h.hand.R[1], 1350, k), S.T, 26); if (S.T > tBolts + 0.2) { A.impactStar(x, 860, 1350, 220 * ease.outBack(prog(S.T, tBolts + 0.2, tBolts + 0.5)), S.T); if (S.T < tBolts + 0.2 + 7 * F) S.shake = 0.7; } } });

  const tWipe = W('power3', /^wipes/) - 0.1;
  addSplit({ name: 'Power 3 evolve (stormy sea island): bolt icon becomes the cloud icon; the host raises a hand and a giant black thundercloud spreads over a little island; purple THUNDERCLOUD banner', t0: st('power3'), t1: end('power3'), bg: 's3:ru_island',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['THUNDERCLOUD', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^thundercloud/) - st('power3'), 'storm']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, goroIcon)) return; stormCloud(x, 540, 500, lerp(0.3, 1.6, ease.outCubic(prog(S.T, W('power3', /^make/), tWipe))), S.T); person(x, S, 'host', 'smug', 200, 1820, 0.5, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 }); } },
    tWipe, [[0.95, 540, 950, -0.02], [1.0, 540, 930, -0.035]], 'Power 3 strike (same island): a storm of bolts rains onto the island, white flash, shake');
  const p3 = T.shots[T.shots.length - 1]; p3.draw = function (x, S) { stormCloud(x, 540, 500, 1.6, S.T); for (let i = 0; i < 5; i++) bolt(x, 260 + i * 140, 620, 300 + i * 120, 1150, S.T + i, 20, '#fff6a0', i * 3); if (S.T < tWipe + 0.3) { S.flash = 0.6 * (1 - prog(S.T, tWipe, tWipe + 0.3)); S.flashCol = '255,250,210'; } S.shake = Math.max(S.shake || 0, 0.4); };

  const tVolts = W('peak', /^two$/) - 0.1;
  addSplit({ name: 'Peak (temple under a night sky): cloud icon gives way to the god icon, gold halo; gold AMARU banner; Enel grows into a giant blue thunder-god body with drums glowing', t0: st('peak'), t1: end('peak'), bg: 's3:ru_temple',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['AMARU: THUNDER GOD', 'gold', W('peak', /^Amaru/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Amaru/) - st('peak'), 'charge'], [W('peak', /^god/) - st('peak'), 'zap']],
    draw(x, S) { halo(x, 540, 900, 620, '140,200,255', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, goroIcon); return; }
      const k = ease.outCubic(prog(S.T, W('peak', /^Amaru/), W('peak', /^god/) + 0.3)); A.glow(x, 540, 1100, 500 * k + 100, '90,170,255', 0.8); person(x, S, 'enel', 'smug', 540, 1800, lerp(0.6, 0.95, k), { seed: 7, pose: 'raise' }); sparks(x, 540, 1100, 420 * k, S.T, 8); } },
    tVolts, [[1.0, 540, 980, -0.02], [1.08, 540, 960, -0.035]], 'Peak volts (same temple): a giant meter slams to 200,000,000 V as bolts crackle; shake');
  const pk = T.shots[T.shots.length - 1]; pk.draw = function (x, S) { A.glow(x, 540, 1100, 600, '90,170,255', 0.8); person(x, S, 'enel', 'grin', 540, 1800, 0.95, { seed: 7, pose: 'raise' }); sparks(x, 540, 1100, 460, S.T, 9); A.meterOverlay(x, 840, 520, 640, ease.outCubic(prog(S.T, S.t0, S.t0 + 0.8)), '200,000,000 V'); if (S.T < S.t0 + 0.3) S.shake = 0.6; };

  add({ name: 'Twist (Ark Maxim sailing through clouds): push-in with roll, low sting; red ONE WEAKNESS banner', t0: st('twist'), t1: end('twist'), bg: 's3:ru_ark', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['ONE WEAKNESS', 'red', W('twist', /^weakness/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Rubber (sky village): Enel blasts Luffy with lightning; it fizzles off him harmlessly, Luffy grins, Enel is shocked; red RUBBER WINS banner', t0: st('truth'), t1: end('truth'), bg: 's3:ru_skypiea',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['RUBBER = NO SHOCK', 'red', W('truth', /^conduct/) - 0.1, end('truth')]], sfx: [[0.2, 'zap'], [W('truth', /^electricity/) - st('truth'), 'boing']],
    draw(x, S) { const e = person(x, S, 'enel', S.t > 0.6 ? 'shock' : 'smug', 280, 1780, 0.62, { seed: 3, pose: 'punch' }); const l = person(x, S, 'luffy', 'grin', 800, 1780, 0.66, { seed: 4, pose: 'idle', flip: true });
      bolt(x, e.hand.R[0], e.hand.R[1], 760, 1300, S.T, 18); if (S.t > 0.4) sparks(x, 760, 1300, 80, S.T, 4); if (S.t > 0.6) A.mark(x, '!?', e.head[0] - 60, e.head[1] - 200, pop(S.T, S.t0 + 0.6)); } });

  const tUntil = W('users', /^until/) - 0.1;
  add({ name: 'Enel (golden bell on the clouds): Enel, long earlobes, drum ring behind him, smug as a god; purple GOD ENEL banner', t0: st('users'), t1: tUntil, bg: 's3:ru_bell',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['"GOD" ENEL', 'pink', st('users') + 0.2, tUntil]], sfx: [[0, 'whoosh'], [0.3, 'zap']],
    draw(x, S) { person(x, S, 'enel', 'smug', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); sparks(x, 540, 1300, 260, S.T, 4); } });
  add({ name: 'Punched out (same bell, wide): Luffy\'s fist slams Enel off the frame; impact star; red KNOCKED OUT banner', t0: tUntil, t1: end('users'), bg: 's3:ru_bell',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['KNOCKED OUT', 'red', W('users', /^punched/) - 0.1, end('users')]], sfx: [[W('users', /^punched/) - tUntil, 'impact']],
    draw(x, S) { const tp = W('users', /^punched/), k = Math.pow(prog(S.T, tp, tp + 0.6), 3); person(x, S, 'luffy', 'grin', 300, 1800, 0.66, { seed: 4, pose: 'punch' }); person(x, S, 'enel', S.T > tp ? 'hit' : 'smug', lerp(760, 1300, k), 1800 - 300 * k, 0.62, { seed: 8, pose: 'shrug', flip: true });
      if (S.T > tp) { A.impactStar(x, 640, 1300, 160 * pop(S.T, tp), S.T); if (S.T < tp + 7 * F) S.shake = 0.7; } } });

  add({ name: 'Joke (bedroom): the host holds a dead phone in one hand and charges it with a little spark from a finger; battery jumps to 100%; gold FULLY CHARGED banner', t0: st('joke'), t1: end('joke'), bg: 's3:ru_bedroom',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['100% CHARGED', 'gold', W('joke', /^charger/) - 0.1, end('joke')]], sfx: [[0.3, 'zap'], [W('joke', /^charger/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 420, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); const px = h.hand.R[0] + 40, py = h.hand.R[1] - 200; A.rrect(x, px - 60, py - 110, 120, 220, 18); A.fs(x, '#1b1530', 8);
      const pct = ease.outCubic(prog(S.T, S.t0 + 0.4, W('joke', /^charger/))); A.rrect(x, px - 30, py - 40, 60, 90, 6); A.fs(x, '#ffffff', 4); x.fillStyle = pct > 0.95 ? '#5cc45a' : '#e8402e'; x.fillRect(px - 26, py + 46 - 82 * pct, 52, 82 * pct); bolt(x, h.hand.R[0] - 10, h.hand.R[1] - 20, px - 60, py, S.T, 6); } });

  ending(T, { TL, fruit });
  return finish();
}
