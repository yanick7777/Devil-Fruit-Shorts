// Shot plan for the Pika Pika no Mi (Glint-Glint Fruit) short. Structure: Logia techniques (light speed, finger lasers, light sword), Yasakani no Magatama as the peak.
import * as A from '/engine/art.js';
import { drawPika } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawPika(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:li_harbor', 'rays:gold', 's3:li_prism', 's3:li_mirrors', 's3:li_stage', 's3:li_rooftops', 's3:li_quarry', 's3:li_dojo', 's3:li_night', 's3:li_mangroves', 's3:li_grove', 's3:li_navy', 's3:li_cave'];
const bubbles = ['bubbles', { n: 16 }];
scene('li_harbor', { sky: ['#9ad8ff', '#e8f8ff'], ground: '#c99b6d', gy: 1250, back: [['water', { y: 1000, hh: 250, col: '#3a8ad8' }], ['clouds', { n: 3, y: 200 }]] });
scene('li_prism', { sky: ['#fff4c0', '#fffbe8'], back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(540, 380); x.lineTo(760, 780); x.lineTo(320, 780); x.closePath(); h.fs(x, 'rgba(220,240,255,0.9)', 10); ['#ff5a5a', '#ffa03a', '#ffe14d', '#5cc45a', '#3f9bff', '#9a5ad8'].forEach((c, i) => { x.beginPath(); x.moveTo(700, 650 + i * 8); x.lineTo(1180, 900 + i * 60); x.lineTo(1180, 940 + i * 60); x.lineTo(700, 658 + i * 8); x.fillStyle = c; x.fill(); }); x.fillStyle = 'rgba(255,255,255,0.9)'; x.fillRect(-100, 600, 480, 30); } }]] });
scene('li_mirrors', { sky: ['#e8eef8', '#d0d8ec'], ground: '#a8b0c8', back: [['frames', { list: [[60, 300, 260, 640], [410, 260, 260, 700], [760, 300, 260, 640]], col: '#e0f0ff' }]] });
scene('li_stage', { sky: ['#2a2a4a', '#4a4a7a'], ground: '#5a5a7a', back: [['custom', { fn: (x) => { for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(255,240,170,0.15)'; x.beginPath(); x.moveTo(100 + i * 220, -100); x.lineTo(160 + i * 220, -100); x.lineTo(240 + i * 220, 1260); x.lineTo(20 + i * 220, 1260); x.fill(); } } }]] });
scene('li_rooftops', { sky: ['#ffc890', '#ffe8c8'], ground: '#8a6a5a', back: [['houses', { cols: ['#c8a080', '#b89070', '#d8b090'], roof: '#6a3a3a', seed: 121 }]] });
scene('li_quarry', { sky: ['#d8e8f0', '#f0f8ff'], ground: '#b8a890', back: [['custom', { fn: (x, h) => { for (const [cx, w, hh] of [[160, 300, 500], [540, 380, 650], [920, 300, 460]]) { h.rrect(x, cx - w / 2, 1250 - hh, w, hh, 30); h.fs(x, '#a89a88', 10); x.strokeStyle = 'rgba(80,60,40,0.3)'; x.lineWidth = 6; x.beginPath(); x.moveTo(cx - w / 3, 1250 - hh * 0.6); x.lineTo(cx + w / 4, 1250 - hh * 0.5); x.stroke(); } } }]] });
scene('li_dojo', { sky: ['#f4e8d8', '#e0d0b8'], ground: '#a07850', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 3; k++) { h.rrect(x, 120 + k * 300, 320, 240, 620, 6); h.fs(x, '#f8f0e0', 7); } } }], ['columns', { n: 4, x0: 40, gap: 300, w: 50, col: '#6b4630' }]] });
scene('li_night', { sky: ['#0a0a24', '#1a1a44'], ground: '#2a2a3a', back: [['stars', { n: 70 }], ['moon', { x: 820, y: 280, r: 100 }]] });
scene('li_mangroves', { sky: ['#a8e0c8', '#e0f8ec'], ground: '#7a9a5a', back: [['custom', { fn: (x, h) => { for (let i = 0; i < 4; i++) { const tx = 60 + i * 300; h.rrect(x, tx, 200, 70, 1060, 30); h.fs(x, '#a8906a', 8); x.beginPath(); x.ellipse(tx + 35, 220, 200, 110, 0, 0, 7); h.fs(x, '#6ab86a', 9); } } }], bubbles] });
scene('li_grove', { sky: ['#c8f0dc', '#f0fff6'], ground: '#8aba6a', back: [['custom', { fn: (x, h) => { h.rrect(x, 760, 150, 140, 1110, 60); h.fs(x, '#a8906a', 10); x.font = '90px "Lilita One"'; x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.fillText('41', 830, 640); } }], bubbles] });
scene('li_navy', { sky: ['#8ac8ff', '#e0f2ff'], ground: '#b8b8c8', gy: 1250, back: [['custom', { fn: (x, h) => { h.rrect(x, 120, 380, 840, 870, 10); h.fs(x, '#f4f4f8', 10); x.font = '110px "Lilita One"'; x.textAlign = 'center'; x.fillStyle = '#3a6ad8'; x.fillText('MARINE', 540, 620); for (let k = 0; k < 4; k++) { h.rrect(x, 190 + k * 200, 720, 110, 160, 50); h.fs(x, '#c8dcf0', 6); } } }]] });
scene('li_cave', { sky: ['#1a1a2a', '#2a2a3a'], ground: '#3a3a44', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(-100, 300); for (let i = 0; i <= 12; i++) x.lineTo(i * 100, 200 + (i % 2) * 120); x.lineTo(1180, -200); x.lineTo(-100, -200); x.closePath(); h.fs(x, '#4a4a5a', 0); } }]] });

// ---------------- light effects ----------------
export function beam(x, x0, y0, x1, y1, w = 18, a = 1) { x.save(); x.globalAlpha = a; x.lineCap = 'round'; for (const [lw, c] of [[w * 3, 'rgba(255,230,90,0.3)'], [w * 1.6, 'rgba(255,230,90,0.7)'], [w, '#fff6c0'], [w * 0.4, '#ffffff']]) { x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.lineWidth = lw; x.strokeStyle = c; x.stroke(); } x.restore(); }
function shimmerBody(x, cx, cy, r, t) { A.glow(x, cx, cy, r, '255,230,90', 0.6); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283 + t * 2; A.sparkle(x, cx + Math.cos(a) * r * 0.6, cy + Math.sin(a) * r * 0.8, 18 + 8 * Math.sin(t * 6 + i), '#fff6c0'); } }
export function lightSword(x, cx, cy, rot, s) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.glow(x, 0, -260, 260, '255,230,90', 0.7); x.beginPath(); x.moveTo(-26, 0); x.lineTo(-20, -520); x.lineTo(0, -580); x.lineTo(20, -520); x.lineTo(26, 0); x.closePath(); x.fillStyle = '#fff6c0'; x.fill(); x.lineWidth = 8; x.strokeStyle = '#f4c830'; x.stroke(); A.rrect(x, -60, -10, 120, 24, 10); A.fs(x, '#f4c830', 6); A.rrect(x, -14, 10, 28, 90, 8); A.fs(x, '#f4c830', 6); x.restore(); }
function bullets(x, t, n, y0, y1, seed = 0) { for (let i = 0; i < n; i++) { const bx = (i * 137 + seed) % 1080, u = ((t * 1.6 + i * 0.13) % 1); const by = lerp(y0, y1, u); A.glow(x, bx, by, 40, '255,230,90', 0.8); x.beginPath(); x.arc(bx, by, 12, 0, 7); x.fillStyle = '#ffffff'; x.fill(); if (u > 0.9) A.impactStar(x, bx, y1, 60, t + i); } }
function streak(x, x0, x1, y, t) { A.speedLines(x, (x0 + x1) / 2, y, t, 10, 260); beam(x, x0, y, x1, y, 34); }
export function pikaIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { A.speedLines(x, 0, 0, t, 10, 180); beam(x, -140, 0, 140, 0, 20); }
  else if (k === 2) { A.openHand(x, -60, 40, 0.9, '#e8b830'); beam(x, -10, 0, 150, -80, 12); }
  else if (k === 3) lightSword(x, 0, 140, 0.3, 0.4);
  else { A.glow(x, 0, 0, 200, '255,230,90', 0.7); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; x.beginPath(); x.arc(Math.cos(a) * 90, Math.sin(a) * 90, 16, 0, 7); x.fillStyle = '#fff6c0'; x.fill(); } }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a star-topped yellow shield-shaped fruit', biteDesc: 'a blinding flash of light bursts from the fruit', biteSfx: 'shimmer', bannerCol: 'gold', biteCol: '#f0d030',
    biteFx(x, S, k) { if (k > 0 && k < 1) { A.glow(x, 560, 780, 500 * k, '255,240,170', 1 - k); A.shineLines(x, 560, 780, 100, 500 * k, S.T, 14); } },
    calmBg: 's3:li_harbor', calmDesc: 'sunny harbour', seaHue: 'gold', seed: 83, nameRe: /^Glint-Glint/,
    revealBg: 's3:li_prism', revealDesc: 'giant prism splitting a beam of light', revealBanner: 'GLINT-GLINT FRUIT', haloRgb: '255,230,120' });
  const tTurns = W('type', /^turns/) - 0.1, tLight = W('type', /^light/) - 0.1;
  add({ name: 'Logia (hall of mirrors): the host glows gold and turns into shimmering light, reflected in every mirror', t0: tTurns, t1: tLight, bg: 's3:li_mirrors',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'shimmer']],
    draw(x, S) { const k = prog(S.t, 0.05, 0.9); shimmerBody(x, 540, 1300, 300 * k + 60, S.T); person(x, S, 'host', 'shock', 540, 1780, 0.66, { seed: 2, pose: 'raise', alpha: 1 - 0.5 * k }); for (const mx of [190, 890]) { x.save(); x.globalAlpha = 0.35 * k; person(x, S, 'host', 'shock', mx, 1500, 0.4, { seed: 2, pose: 'raise' }); x.restore(); } } });
  stage(T, { desc: 'spotlit stage', bg: 's3:li_stage', t0: tLight, t1: end('type'), times: [W('type', /^light/), W('type', /^light/) + 0.2, W('type', /^light/) + 0.4, W('type', /^light/) + 0.6],
    labels: ['SPEED', 'LASER', 'SWORD', 'YASAKANI'], bar: 'LIGHT POWERS', haloRgb: '255,230,120', icon: pikaIcon });

  const tZip = W('power1', /^zipping/) - 0.1;
  addSplit({ name: 'Power 1 (sunset rooftops): Kizaru stands on one roof, then flashes into a beam of light; gold SPEED OF LIGHT banner', t0: st('power1'), t1: end('power1'), bg: 's3:li_rooftops',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['SPEED OF LIGHT', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^speed/) - st('power1'), 'zip']],
    draw(x, S) { const tf = W('power1', /^speed/); if (S.T < tf) person(x, S, 'kizaru', 'smug', 300, 1780, 0.62, { seed: 2, pose: 'idle' }); else { shimmerBody(x, 300, 1300, 200, S.T); beam(x, 300, 1300, lerp(300, 1100, prog(S.T, tf, tf + 0.25)), 1100, 30); } } },
    tZip, [[1.0, 540, 1000, 0.02], [1.06, 540, 990, 0.035]], 'Power 1 zip (same rooftops): a streak of light zigzags across the frame; Kizaru pops up behind a startled grunt');
  const p1 = T.shots[T.shots.length - 1]; p1.sfx = [[0, 'zip'], [0.4, 'zip']]; p1.draw = function (x, S) { const u = (S.T - S.t0) * 2; if (u < 1) streak(x, -100, lerp(-100, 1180, u), 1100, S.T); const g = person(x, S, 'grunt', 'shock', 420, 1780, 0.6, { seed: 3, pose: 'shrug' }); if (u > 0.8) { person(x, S, 'kizaru', 'smug', 800, 1780, 0.62, { seed: 2, pose: 'idle', flip: true, pop: S.t0 + 0.4 }); A.mark(x, '!?', g.head[0] + 100, g.head[1] - 180, pop(S.T, S.t0 + 0.45)); } };

  const tBlow = W('power2', /^blow/) - 0.1;
  addSplit({ name: 'Power 2 evolve (rock quarry): speed icon becomes the laser icon; Kizaru points a finger and a thin golden laser shoots across the quarry; red LASERS banner', t0: st('power2'), t1: end('power2'), bg: 's3:li_quarry',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['FINGER LASERS', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^lasers/) - st('power2'), 'zap']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, pikaIcon)) return; const k = person(x, S, 'kizaru', 'smug', 260, 1780, 0.62, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 }); const tl = W('power2', /^lasers/); if (S.T > tl) beam(x, k.hand.R[0] + 20, k.hand.R[1], lerp(k.hand.R[0], 900, prog(S.T, tl, tl + 0.15)), 1000, 14); } },
    tBlow, [[0.95, 540, 960, 0.02], [1.0, 540, 940, 0.035]], 'Power 2 boom (same quarry): the laser hits a boulder and it explodes in a golden blast; shake');
  const p2 = T.shots[T.shots.length - 1]; p2.sfx = [[0, 'blast'], [0.2, 'crumble']]; p2.draw = function (x, S) { const k = ease.outCubic(prog(S.T, S.t0, S.t0 + 0.4)); A.glow(x, 760, 900, 500 * k, '255,220,90', 1 - k * 0.5); A.impactStar(x, 760, 900, 380 * k, S.T); for (let i = 0; i < 8; i++) { x.beginPath(); x.arc(760 + Math.cos(i) * 500 * k, 900 + Math.sin(i * 1.7) * 400 * k, 30, 0, 7); A.fs(x, '#a89a88', 6); } if (S.T < S.t0 + 0.3) S.shake = 0.8; };

  add({ name: 'Power 3 evolve (dojo): laser icon becomes the sword icon; light gathers in Kizaru\'s hands into a glowing golden sword (Ama no Murakumo); blue LIGHT SWORD banner', t0: st('power3'), t1: end('power3'), bg: 's3:li_dojo',
    cam: [[1.0, 540, 980, 0], [1.06, 560, 960, 0.02]], banners: [['SWORD OF LIGHT', 'blue', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^sword/) - st('power3'), 'shimmer']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, pikaIcon)) return; const k = person(x, S, 'kizaru', 'smug', 420, 1780, 0.66, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 }); const g = ease.outBack(prog(S.T, W('power3', /^make/), W('power3', /^sword/) + 0.3)); if (g > 0) lightSword(x, k.hand.L[0], k.hand.L[1] + 20, -0.3, 0.9 * g); } });

  const tRain = W('peak', /^rain/) - 0.1;
  addSplit({ name: 'Peak (starry night sky): sword icon gives way to the bullet-ring icon, gold halo; gold YASAKANI NO MAGATAMA banner; Kizaru floats in the sky, crossing his hands as light gathers', t0: st('peak'), t1: end('peak'), bg: 's3:li_night',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['YASAKANI NO MAGATAMA', 'gold', W('peak', /^Yasakani/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Yasakani/) - st('peak'), 'charge']],
    draw(x, S) { halo(x, 540, 900, 620, '255,230,90', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, pikaIcon); return; }
      shimmerBody(x, 540, 1100, 260 + 120 * prog(S.T, W('peak', /^Yasakani/), tRain), S.T); person(x, S, 'kizaru', 'smug', 540, 1700, 0.64, { seed: 7, pose: 'raise' }); } },
    tRain, [[1.0, 540, 1000, -0.02], [1.08, 540, 980, -0.035]], 'Peak rain (same sky, wide): hundreds of glowing light bullets pour down onto the ground, explosions everywhere; shake');
  const pk = T.shots[T.shots.length - 1]; pk.sfx = [[0, 'bullets'], [0.3, 'blast'], [0.8, 'boom']]; pk.draw = function (x, S) { person(x, S, 'kizaru', 'smug', 540, 1150, 0.45, { seed: 7, pose: 'raise' }); bullets(x, S.T, 26, 600, 1400); S.shake = 0.35; };

  add({ name: 'Twist (dark cave): push-in with roll, low sting; red NOT EVERYTHING banner', t0: st('twist'), t1: end('twist'), bg: 's3:li_cave', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['SPEED ISN\'T EVERYTHING', 'red', W('twist', /^isn/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  const tRay = W('truth', /^Rayleigh/) - 0.1;
  addSplit({ name: 'Haki (mangrove grove): a grunt\'s fist glows black with Haki and connects with glowing Kizaru; red HAKI HITS banner', t0: st('truth'), t1: end('truth'), bg: 's3:li_mangroves',
    cam: [[1.05, 540, 1000, -0.02], [1.12, 560, 990, -0.04]], banners: [['HAKI CAN HIT YOU', 'red', st('truth') + 0.2, tRay]], sfx: [[W('truth', /^hit/) - st('truth'), 'haki']],
    draw(x, S) { shimmerBody(x, 760, 1300, 180, S.T); person(x, S, 'kizaru', S.T > W('truth', /^hit/) ? 'hit' : 'smug', 760, 1780, 0.62, { seed: 2, pose: 'shrug', flip: true }); const g = person(x, S, 'grunt', 'grin', 330, 1780, 0.62, { seed: 3, pose: 'punch' }); A.glow(x, g.hand.R[0], g.hand.R[1], 70, '40,20,60', 0.9); if (S.T > W('truth', /^hit/)) A.impactStar(x, g.hand.R[0] + 60, g.hand.R[1], 120 * pop(S.T, W('truth', /^hit/)), S.T); } },
    tRay, [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], 'Rayleigh (Sabaody grove 41): Kizaru\'s glowing kick is stopped dead by Rayleigh\'s sword; clang; blue BLOCKED banner');
  const tr = T.shots[T.shots.length - 1]; tr.bg = 's3:li_grove'; tr.banners = [['RAYLEIGH BLOCKS IT', 'blue', tRay + 0.2, end('truth')]]; tr.sfx = [[W('truth', /^kick/) - tRay, 'impact'], [W('truth', /^sword/) - tRay, 'slash']];
  tr.draw = function (x, S) { shimmerBody(x, 760, 1250, 160, S.T); person(x, S, 'kizaru', 'shock', 780, 1780, 0.62, { seed: 2, pose: 'punch', flip: true }); const r = person(x, S, 'rayleigh', 'smug', 300, 1780, 0.64, { seed: 5, pose: 'punch' }); A.sword(x, r.hand.R[0], r.hand.R[1], 0.9, 1.1); if (S.T > W('truth', /^kick/)) A.impactStar(x, 560, 1250, 120 * pop(S.T, W('truth', /^kick/)), S.T); };

  const tBeat = W('users', /^beat/) - 0.1;
  add({ name: 'Admiral Kizaru (Marine HQ): Kizaru in his yellow pinstripe suit and white coat, hands in his pockets; gold ADMIRAL KIZARU banner', t0: st('users'), t1: tBeat, bg: 's3:li_navy',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['ADMIRAL KIZARU', 'gold', st('users') + 0.2, tBeat + 0.1]], sfx: [[0, 'whoosh'], [0.3, 'shimmer']],
    draw(x, S) { person(x, S, 'kizaru', 'smug', 540, 1820, 0.84, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); } });
  add({ name: 'Sabaody (mangrove grove): light beams rain down, Luffy, Sanji and Usopp are knocked flat, then vanish one by one with a pop; red STRAW HATS BEATEN banner', t0: tBeat, t1: end('users'), bg: 's3:li_grove',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['STRAW HATS BEATEN', 'red', tBeat + 0.1, W('users', /^Kuma/)], ['KUMA SENT THEM AWAY', 'pink', W('users', /^Kuma/), end('users')]], sfx: [[0.1, 'bullets'], [W('users', /^sent/) - tBeat, 'pops']],
    draw(x, S) { const tk = W('users', /^sent/); bullets(x, S.T, 10, 300, 1200, 50); ['luffy', 'sanji', 'usopp'].forEach((w, i) => { const gone = S.T > tk + i * 0.25; if (!gone) person(x, S, w, 'hit', 220 + i * 320, 1800, 0.5, { seed: i, pose: 'shrug' }); else A.sparkle(x, 220 + i * 320, 1500, 40 * (1 - prog(S.T, tk + i * 0.25, tk + i * 0.25 + 0.5)), '#ffffff'); }); } });

  add({ name: 'Joke (pitch-black cave): the host glows like a lamp, lighting up the whole cave with a thumbs-up; gold NO FLASHLIGHT banner', t0: st('joke'), t1: end('joke'), bg: 's3:li_cave',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO FLASHLIGHT NEEDED', 'gold', W('joke', /^flashlight/) - 0.1, end('joke')]], sfx: [[0.3, 'shimmer'], [W('joke', /^flashlight/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { A.glow(x, 540, 1200, 700, '255,240,170', 0.8); shimmerBody(x, 540, 1300, 260, S.T); person(x, S, 'host', 'grin', 540, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'cheer', talk: true }); } });

  ending(T, { TL, fruit });
  return finish();
}
