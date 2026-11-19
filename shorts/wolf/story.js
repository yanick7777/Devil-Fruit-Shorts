// Shot plan for the Inu Inu no Mi, Model: Okuchi no Makami short. Structure: giant white wolf, ice, barriers, wolf + Conqueror's Haki as the peak.
import * as A from '/engine/art.js';
import { drawWolf } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawWolf(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:wo_shrine', 'rays:indigo', 's3:wo_snowpeak', 's3:wo_torii', 's3:wo_dojo', 's3:wo_plain', 's3:wo_icelake', 's3:wo_village', 's3:wo_skull', 's3:wo_sakura', 's3:wo_temple', 's3:wo_ruins', 's3:wo_summer'];
const snow = ['custom', { fn: (x, h) => { x.fillStyle = 'rgba(255,255,255,0.85)'; for (let i = 0; i < 50; i++) { x.beginPath(); x.arc(h.hash(i + 15) * 1080, h.hash(i + 16) * 1300, 4 + h.hash(i) * 5, 0, 7); x.fill(); } } }];
const torii = (cx, s, col = '#e8303a') => ['custom', { fn: (x, h) => { x.save(); x.translate(cx, 1250); x.scale(s, s); for (const sd of [-1, 1]) { h.rrect(x, sd * 220 - 25, -700, 50, 700, 8); h.fs(x, col, 8); } h.rrect(x, -320, -760, 640, 60, 20); h.fs(x, col, 8); h.rrect(x, -260, -640, 520, 40, 8); h.fs(x, col, 7); x.restore(); } }];
scene('wo_shrine', { sky: ['#ffe8d0', '#fff6ea'], ground: '#c9a880', back: [torii(540, 1.0), ['lanterns', { y: 260 }]] });
scene('wo_snowpeak', { sky: ['#1a2a4a', '#4a5a8a'], back: [['moon', { x: 540, y: 500, r: 220, col: '#f0f8ff' }], ['mountains', { gy: 1350, col: '#e8f0ff', hh: 600 }], snow] });
scene('wo_torii', { sky: ['#ffd0a0', '#ffecd8'], ground: '#c8a070', back: [torii(300, 0.7), torii(780, 0.7)] });
scene('wo_dojo', { sky: ['#f4e8d0', '#e0d0b0'], ground: '#a07850', back: [['custom', { fn: (x, h) => { h.rrect(x, 80, 260, 920, 140, 10); h.fs(x, '#ffffff', 8); x.font = '90px "Lilita One"'; x.fillStyle = '#c8303a'; x.textAlign = 'center'; x.fillText('OKUCHI', 540, 360); } }], ['columns', { n: 4, x0: 40, gap: 300, w: 50, col: '#8a5a3a' }]] });
scene('wo_plain', { sky: ['#b8d8f0', '#e8f4ff'], ground: '#f4f8ff', back: [['mountains', { gy: 1250, col: '#c8d8ec', hh: 450 }], snow] });
scene('wo_icelake', { sky: ['#c8ecff', '#f0faff'], ground: '#bfe8ff', back: [['custom', { fn: (x, h) => { for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(60 + i * 190, 1250); x.lineTo(110 + i * 190, 950 - (i % 3) * 100); x.lineTo(160 + i * 190, 1250); x.closePath(); h.fs(x, '#e0f6ff', 8); } } }]] });
scene('wo_village', { sky: ['#ffd8b0', '#fff0dc'], ground: '#c9a880', back: [['houses', { cols: ['#8a5a3c', '#a07050', '#6b4630'], roof: '#3a3346', win: '#f4ead2', seed: 101 }]] });
scene('wo_skull', { sky: ['#2a1020', '#5a1a2a'], ground: '#2a2020', back: [['custom', { fn: (x, h) => { x.beginPath(); x.ellipse(540, 700, 380, 340, 0, 0, 7); h.fs(x, '#e8e0d0', 12); for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(540 + sd * 140, 700, 90, 110, 0, 0, 7); h.fs(x, '#2a1020', 8); x.beginPath(); x.moveTo(540 + sd * 260, 450); x.quadraticCurveTo(540 + sd * 460, 250, 540 + sd * 380, 80); x.quadraticCurveTo(540 + sd * 360, 300, 540 + sd * 200, 420); h.fs(x, '#e8e0d0', 9); } } }]] });
scene('wo_sakura', { sky: ['#ffd8e8', '#fff2f8'], ground: '#9ad86a', back: [['trees', { n: 3, x0: 80, gap: 420, leaf: '#ffb8d8' }], ['confetti', { n: 30 }]] });
scene('wo_temple', { sky: ['#e8f0f8', '#c8d8e8'], ground: '#b8b0a0', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(60, 700); x.lineTo(540, 420); x.lineTo(1020, 700); x.closePath(); h.fs(x, '#3a3346', 10); h.rrect(x, 140, 700, 800, 560, 6); h.fs(x, '#f4ead2', 9); h.rrect(x, 420, 880, 240, 380, 8); h.fs(x, '#8a5a3a', 7); } }], snow] });
scene('wo_ruins', { sky: ['#5a3a3a', '#a06a4a'], ground: '#6a5a4a', back: [['custom', { fn: (x, h) => { for (const [cx, hh, r] of [[160, 500, -0.1], [480, 700, 0.05], [860, 420, 0.15]]) { x.save(); x.translate(cx, 1250); x.rotate(r); h.rrect(x, -60, -hh, 120, hh, 6); h.fs(x, '#8a7a6a', 8); x.restore(); } } }], ['fog', { n: 6, col: 'rgba(255,200,150,0.2)' }]] });
scene('wo_summer', { sky: ['#ffe080', '#fff4c0'], ground: '#e8c890', back: [['sun', { x: 820, y: 260, r: 120 }], ['custom', { fn: (x) => { x.strokeStyle = 'rgba(255,160,60,0.35)'; x.lineWidth = 6; for (let k = 0; k < 6; k++) { x.beginPath(); for (let i = 0; i <= 20; i++) x.lineTo(i * 60, 700 + k * 90 + Math.sin(i) * 14); x.stroke(); } } }]] });

// ---------------- wolf + ice + haki ----------------
export function wolf(x, cx, fy, s, t, o = {}) { x.save(); x.translate(cx, fy); x.scale(o.flip ? -s : s, s); const W = '#f8fbff', M = '#7fe0d0';
  const fluff = (px, py, rx, ry, n, col, lw = 10) => { x.beginPath(); for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * 6.283, r = i % 2 ? 1 : 0.86; x.lineTo(px + Math.cos(a) * rx * r, py + Math.sin(a) * ry * r); } x.closePath(); A.fs(x, col, lw); };
  // tail: big fluffy curl with a teal tip
  x.save(); x.translate(-250, -360); x.rotate(-0.6 + Math.sin(t * 4) * 0.1); fluff(-60, -120, 90, 170, 9, W); fluff(-80, -260, 60, 70, 6, M, 7); x.restore();
  // far legs, body, near legs
  for (const lx of [-150, 150]) { A.rrect(x, lx - 34, -250, 68, 250, 26); A.fs(x, '#dfe8f4', 9); }
  fluff(0, -340, 300, 150, 14, W, 12);
  for (const lx of [-210, 210]) { A.rrect(x, lx - 38, -250, 76, 250, 28); A.fs(x, W, 9); x.beginPath(); x.ellipse(lx + 10, -14, 52, 26, 0, 0, 7); A.fs(x, W, 8); }
  // mane + head
  x.save(); x.translate(250, -460); fluff(0, 40, 150, 150, 11, M, 10);
  x.beginPath(); x.moveTo(-40, -70); x.lineTo(-20, -210); x.lineTo(40, -90); x.closePath(); A.fs(x, W, 9); x.beginPath(); x.moveTo(30, -80); x.lineTo(80, -210); x.lineTo(110, -70); x.closePath(); A.fs(x, W, 9);
  x.beginPath(); x.moveTo(-70, 0); x.quadraticCurveTo(-60, -110, 60, -100); x.quadraticCurveTo(140, -90, 230, -10); x.quadraticCurveTo(250, 30, 210, 50); x.lineTo(60, 80); x.quadraticCurveTo(-60, 90, -70, 0); x.closePath(); A.fs(x, W, 10);
  if (o.roar) { x.beginPath(); x.moveTo(90, 50); x.lineTo(210, 40); x.lineTo(110, 110); x.closePath(); A.fs(x, '#c8303a', 7); x.fillStyle = '#ffffff'; for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(120 + k * 30, 48); x.lineTo(130 + k * 30, 70); x.lineTo(140 + k * 30, 46); x.fill(); } }
  x.beginPath(); x.ellipse(232, -4, 22, 16, 0, 0, 7); A.fs(x, '#2a2436', 5);
  x.beginPath(); x.moveTo(40, -50); x.quadraticCurveTo(80, -70, 110, -48); x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke(); x.beginPath(); x.moveTo(20, -64); x.lineTo(130, -80); x.lineWidth = 8; x.strokeStyle = '#d8303a'; x.stroke();
  x.beginPath(); x.moveTo(20, 10); x.quadraticCurveTo(60, -10, 100, 10); x.lineWidth = 7; x.strokeStyle = '#d8303a'; x.stroke();
  x.restore(); x.restore(); }
function iceShard(x, cx, cy, s, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.beginPath(); x.moveTo(0, -120); x.lineTo(45, 0); x.lineTo(0, 120); x.lineTo(-45, 0); x.closePath(); A.fs(x, 'rgba(190,235,255,0.95)', 7); x.beginPath(); x.moveTo(0, -100); x.lineTo(15, 0); x.lineTo(0, 30); x.fillStyle = '#ffffff'; x.fill(); x.restore(); }
function barrier(x, cx, cy, r, a = 0.6) { x.save(); x.globalAlpha = a; x.beginPath(); for (let i = 0; i < 6; i++) { const ang = i / 6 * 6.283 - 1.57; x.lineTo(cx + Math.cos(ang) * r, cy + Math.sin(ang) * r); } x.closePath(); x.fillStyle = 'rgba(160,230,255,0.35)'; x.fill(); x.lineWidth = 12; x.strokeStyle = '#7fe0ff'; x.stroke(); x.restore(); }
export function hakiBolt(x, x0, y0, x1, y1, t, w = 16, seed = 0) { const pts = []; for (let i = 0; i <= 8; i++) { const k = i / 8, j = i && i < 8 ? Math.sin(t * 30 + i * 5.1 + seed) * 50 : 0; pts.push([lerp(x0, x1, k) + j, lerp(y0, y1, k) - j * 0.5]); }
  x.save(); x.lineCap = 'round'; x.lineJoin = 'round'; for (const [lw, c] of [[w * 2.4, 'rgba(255,40,40,0.55)'], [w, '#14121a']]) { x.beginPath(); pts.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py))); x.lineWidth = lw; x.strokeStyle = c; x.stroke(); } x.restore(); }
function club(x, cx, cy, rot, s) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.rrect(x, -14, -40, 28, 120, 8); A.fs(x, '#5a3a26', 6); A.rrect(x, -40, -380, 80, 350, 30); A.fs(x, '#3a3346', 8); x.fillStyle = '#a8a8b8'; for (let r = 0; r < 5; r++) for (const dx of [-24, 0, 24]) { x.beginPath(); x.arc(dx, -350 + r * 64, 9, 0, 7); x.fill(); } x.restore(); }
function kaidoShadow(x, cx, fy, s) { x.save(); x.translate(cx, fy); x.scale(s, s); x.fillStyle = '#14121a'; x.beginPath(); x.moveTo(-260, 0); x.lineTo(-220, -700); x.quadraticCurveTo(0, -900, 220, -700); x.lineTo(260, 0); x.closePath(); x.fill(); x.beginPath(); x.arc(0, -920, 150, 0, 7); x.fill();
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 60, -1030); x.quadraticCurveTo(sd * 200, -1150, sd * 260, -1300); x.quadraticCurveTo(sd * 140, -1100, sd * 30, -1000); x.fill(); } x.fillStyle = '#ff3a3a'; for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(sd * 55, -930, 26, 10, 0, 0, 7); x.fill(); } x.restore(); }
export function wolfIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) wolf(x, -60, 160, 0.4, t);
  else if (k === 2) { iceShard(x, -50, 0, 0.9, -0.3); iceShard(x, 50, 10, 0.8, 0.3); }
  else if (k === 3) barrier(x, 0, 0, 130, 0.9);
  else { A.glow(x, 0, 0, 200, '255,60,60', 0.5); hakiBolt(x, -120, -80, 120, 80, t, 14); hakiBolt(x, 120, -80, -120, 80, t, 14, 3); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'an orange fruit with brown leaves', biteDesc: 'a cold white mist puffs out', biteSfx: 'shimmer', bannerCol: 'blue', biteCol: '#f08a2a',
    biteFx(x, S, k) { if (k > 0 && k < 1) { x.save(); x.globalAlpha = 1 - k; x.beginPath(); x.arc(600, 760, 200 * k + 40, 0, 7); x.fillStyle = 'rgba(220,245,255,0.8)'; x.fill(); x.restore(); } },
    calmBg: 's3:wo_shrine', calmDesc: 'mountain shrine gate', seaHue: 'indigo', seed: 71, nameRe: /^Dog-Dog/,
    revealBg: 's3:wo_snowpeak', revealDesc: 'snowy peak under a full moon', revealBanner: 'DOG-DOG FRUIT: OKUCHI NO MAKAMI', haloRgb: '200,240,255' });
  const tTurns = W('type', /^turns/) - 0.1, tGuard = W('type', /^guardian/) - 0.1;
  add({ name: 'Holy wolf (twin torii gates): a glowing white wolf spirit circles the host', t0: tTurns, t1: tGuard, bg: 's3:wo_torii',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'shimmer']],
    draw(x, S) { A.glow(x, 540, 1300, 400, '200,240,255', 0.6); person(x, S, 'host', 'shock', 540, 1780, 0.62, { seed: 2, pose: 'shrug' }); x.save(); x.globalAlpha = 0.6; wolf(x, 540 + Math.cos(S.T * 2) * 300, 1700, 0.45, S.T, { flip: Math.sin(S.T * 2) > 0 }); x.restore(); } });
  stage(T, { desc: 'Wano dojo', bg: 's3:wo_dojo', t0: tGuard, t1: end('type'), times: [W('type', /^guardian/), W('type', /^guardian/) + 0.2, W('type', /^guardian/) + 0.4, W('type', /^guardian/) + 0.6],
    labels: ['WOLF', 'ICE', 'BARRIER', 'HAKI'], bar: 'WOLF POWERS', haloRgb: '200,240,255', icon: wolfIcon });

  const tWhite = W('power1', /^white/) - 0.1;
  addSplit({ name: 'Power 1 (snowy plain): Yamato swirls into white fur and grows; gold BIG WOLF banner', t0: st('power1'), t1: end('power1'), bg: 's3:wo_plain',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['GIANT WHITE WOLF', 'blue', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'whoosh']],
    draw(x, S) { const k = prog(S.T, W('power1', /^turn/), tWhite); person(x, S, 'yamato', 'grin', 540, 1780, 0.7, { seed: 2, pose: 'raise', alpha: 1 - k * 0.6 }); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283 + S.T * 4; x.beginPath(); x.ellipse(540 + Math.cos(a) * 250 * k, 1300 + Math.sin(a) * 300 * k, 50, 20, a, 0, 7); x.fillStyle = 'rgba(255,255,255,0.8)'; x.fill(); } } },
    tWhite, [[0.95, 540, 950, 0.02], [1.0, 540, 930, 0.035]], 'Power 1 wolf (same plain): a huge white wolf with a teal mane and red markings howls; shake');
  const p1 = T.shots[T.shots.length - 1]; p1.sfx = [[0, 'boom']]; p1.draw = function (x, S) { wolf(x, 380, 1650, 1.25, S.T, { roar: true }); if (S.T < tWhite + 0.25) S.shake = 0.5; };

  add({ name: 'Power 2 evolve (frozen lake): wolf icon becomes the ice icon; the wolf breathes a blast of icy wind that freezes a charging grunt solid; blue FREEZE banner', t0: st('power2'), t1: end('power2'), bg: 's3:wo_icelake',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['FREEZE ANYTHING', 'blue', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^freeze/) - st('power2'), 'glass']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, wolfIcon)) return; const tf = W('power2', /^freeze/); wolf(x, 200, 1720, 0.72, S.T, { roar: S.T > tf - 0.3 }); if (S.T > tf - 0.3) for (let i = 0; i < 6; i++) iceShard(x, lerp(460, 820, ((S.T * 2 + i / 6) % 1)), 1300 + Math.sin(i * 2) * 120, 0.4, 1.57);
      const g = person(x, S, 'grunt', S.T > tf ? 'shock' : 'calm', 860, 1780, 0.6, { seed: 3, pose: 'punch', flip: true, pop: S.t0 + 0.45 }); if (S.T > tf) { x.save(); x.globalAlpha = 0.7 * prog(S.T, tf, tf + 0.4); A.rrect(x, 700, g.head[1] - 180, 320, 1780 - g.head[1] + 180, 30); A.fs(x, 'rgba(180,230,255,0.8)', 8); x.restore(); } } });

  const tProtect = W('power3', /^protect/) - 0.1;
  addSplit({ name: 'Power 3 evolve (village street): ice icon becomes the barrier icon; Yamato slams the club down and a glowing hex barrier rises around two villagers; teal BARRIER banner', t0: st('power3'), t1: end('power3'), bg: 's3:wo_village',
    cam: [[1.0, 540, 980, 0], [1.06, 560, 960, 0.02]], banners: [['BARRIERS', 'green', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^barriers/) - st('power3'), 'shimmer']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, wolfIcon)) return; const y = person(x, S, 'yamato', 'grin', 300, 1780, 0.66, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 }); club(x, y.hand.R[0], y.hand.R[1], 1.2, 0.8); person(x, S, 'farmer', 'worried', 760, 1780, 0.55, { seed: 4, pose: 'shrug', flip: true }); const k = ease.outBack(prog(S.T, W('power3', /^barriers/), W('power3', /^barriers/) + 0.4)); if (k > 0) barrier(x, 760, 1400, 360 * k); } },
    tProtect, [[1.05, 640, 1000, -0.02], [1.1, 660, 990, -0.035]], 'Power 3 protect (same street): falling rocks bounce off the barrier, the villager cheers');
  const p3 = T.shots[T.shots.length - 1]; p3.sfx = [[0.2, 'thunk'], [0.5, 'thunk']]; p3.draw = function (x, S) { person(x, S, 'farmer', 'grin', 760, 1780, 0.55, { seed: 4, pose: 'cheer', flip: true }); barrier(x, 760, 1400, 360); for (let i = 0; i < 3; i++) { const u = ((S.T - S.t0) * 1.3 + i / 3) % 1; const ry = u < 0.5 ? lerp(700, 1050, u * 2) : lerp(1050, 800, (u - 0.5) * 2); x.beginPath(); x.arc(560 + i * 200 + (u > 0.5 ? (u - 0.5) * 400 * (i - 1) : 0), ry, 40, 0, 7); A.fs(x, '#8a7a6a', 7); } };

  const tConq = W('peak', /^Conqueror/) - 0.1;
  addSplit({ name: 'Peak (giant skull island): barrier icon gives way to the haki icon, red halo; gold HAKI banner; the wolf charges with black-red lightning crackling over its fur', t0: st('peak'), t1: end('peak'), bg: 's3:wo_skull',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 950, 0.02]], banners: [['WOLF + HAKI', 'gold', W('peak', /^wolf/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^wolf/) - st('peak'), 'charge']],
    draw(x, S) { halo(x, 540, 900, 620, '255,80,80', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, wolfIcon); return; }
      wolf(x, 380, 1700, 1.1, S.T, { roar: true }); A.speedLines(x, 540, 1300, S.T, 12, 300); } },
    tConq, [[1.0, 540, 1000, -0.02], [1.08, 540, 990, -0.035]], 'Peak Conqueror\'s (same skull): Yamato swings the club, black-red haki lightning explodes outward; shake');
  const pk = T.shots[T.shots.length - 1]; pk.sfx = [[0, 'haki']]; pk.draw = function (x, S) { for (let i = 0; i < 7; i++) { const a = i / 7 * 6.283 + 0.3; hakiBolt(x, 540, 1300, 540 + Math.cos(a) * 600, 1300 + Math.sin(a) * 600, S.T, 16, i * 2); } const y = person(x, S, 'yamato', 'grin', 540, 1800, 0.78, { seed: 7, pose: 'raise' }); club(x, y.hand.L[0], y.hand.L[1], -0.4, 1.0); if (S.T < tConq + 0.4) S.shake = 0.7; };

  add({ name: 'Twist (cherry-blossom grove): push-in with roll, low sting; red SURPRISE banner', t0: st('twist'), t1: end('twist'), bg: 's3:wo_sakura', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['SURPRISING PART', 'red', W('twist', /^surprising/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Guardian deity (snowy temple): the white wolf sits calmly in front of the temple like a statue, villagers bow; gold GUARDIAN DEITY banner', t0: st('truth'), t1: end('truth'), bg: 's3:wo_temple',
    cam: [[1.05, 540, 1000, -0.02], [1.12, 540, 990, -0.04]], banners: [['GUARDIAN DEITY OF WANO', 'gold', W('truth', /^guardian/) - 0.1, W('truth', /^protector/)], ['PROTECTOR, NOT DESTROYER', 'green', W('truth', /^protector/), end('truth')]], sfx: [[0.3, 'shimmer'], [W('truth', /^protector/) - st('truth'), 'ding']],
    draw(x, S) { A.glow(x, 540, 1400, 420, '255,240,180', 0.5); wolf(x, 380, 1650, 0.9, S.T); person(x, S, 'farmer', 'calm', 160, 1850, 0.42, { seed: 4, pose: 'raise' }); person(x, S, 'chef', 'calm', 920, 1850, 0.42, { seed: 5, pose: 'raise', flip: true }); } });

  const tProt = W('users', /^protect/) - 0.1;
  add({ name: 'Yamato (ancient shrine ruins): Yamato with long white hair, red horns and the spiked club; purple YAMATO banner', t0: st('users'), t1: tProt, bg: 's3:wo_ruins',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['YAMATO', 'pink', st('users') + 0.2, W('users', /^child/)], ['KAIDO\'S CHILD', 'red', W('users', /^child/), tProt + 0.1]], sfx: [[0, 'whoosh'], [W('users', /^child/) - st('users'), 'drums']],
    draw(x, S) { const y = person(x, S, 'yamato', 'grin', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'holdUp' }); club(x, y.hand.R[0], y.hand.R[1], 0.2, 1.0); } });
  add({ name: 'Protecting Wano (same ruins, night tint): Yamato stands in front of a huge horned shadow of Kaido with the club raised; red PROTECT WANO banner', t0: tProt, t1: end('users'), bg: 's3:wo_ruins',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['PROTECT WANO', 'red', tProt + 0.2, end('users')]], sfx: [[0.1, 'haki']],
    draw(x, S) { kaidoShadow(x, 760, 1900, 0.75); const y = person(x, S, 'yamato', 'grin', 300, 1800, 0.66, { seed: 8, pose: 'raise' }); club(x, y.hand.L[0], y.hand.L[1], -0.5, 0.9); hakiBolt(x, 420, 1100, 620, 900, S.T, 10); } });

  add({ name: 'Joke (blazing summer street): the host lounges in the heat while the little wolf breathes cold air on him like a fan; gold NO A/C NEEDED banner', t0: st('joke'), t1: end('joke'), bg: 's3:wo_summer',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO A/C NEEDED', 'gold', W('joke', /^air/) - 0.1, end('joke')]], sfx: [[0.3, 'whoosh'], [W('joke', /^conditioning/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { person(x, S, 'host', 'grin', 640, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'idle', talk: true, flip: true }); wolf(x, 120, 1800, 0.55, S.T, { roar: true }); for (let i = 0; i < 4; i++) { const u = (S.T * 1.2 + i / 4) % 1; x.beginPath(); x.ellipse(lerp(380, 640, u), 1500 - i * 40, 40, 14, 0, 0, 7); x.fillStyle = `rgba(200,240,255,${0.8 * (1 - u)})`; x.fill(); } } });

  ending(T, { TL, fruit });
  return finish();
}
