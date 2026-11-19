// Shot plan for the Kage Kage no Mi (Shadow-Shadow Fruit) short. Structure: cut shadows, zombie soldiers, shadow swap, Shadow's Asgard as the peak.
import * as A from '/engine/art.js';
import { drawKage } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawKage(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:sh_library', 'rays:purple', 's3:sh_eclipse', 's3:sh_alley', 's3:sh_crypt', 's3:sh_lamp', 's3:sh_lab', 's3:sh_corridor', 's3:sh_thriller', 's3:sh_dusk', 's3:sh_sunrise', 's3:sh_ship', 's3:sh_cinema'];
scene('sh_library', { sky: ['#e8d8c0', '#c8b090'], ground: '#6b4630', back: [['shelves', { rows: 4, y: 200, cols: ['#8a2a3a', '#2a4a8a', '#3a6a3a', '#8a6a2a'] }]] });
scene('sh_eclipse', { sky: ['#140c24', '#2a1a40'], back: [['custom', { fn: (x) => { const g = x.createRadialGradient(540, 700, 180, 540, 700, 420); g.addColorStop(0, 'rgba(255,230,180,0.9)'); g.addColorStop(1, 'rgba(255,230,180,0)'); x.fillStyle = g; x.fillRect(0, 200, 1080, 1000); x.beginPath(); x.arc(540, 700, 200, 0, 7); x.fillStyle = '#0a0612'; x.fill(); } }], ['stars', { n: 50 }]] });
scene('sh_alley', { sky: ['#ffd8a0', '#fff0d0'], ground: '#b8a080', back: [['bricks', { col: 'rgba(80,40,20,0.25)' }], ['custom', { fn: (x) => { x.fillStyle = 'rgba(40,20,60,0.25)'; x.beginPath(); x.moveTo(0, 1250); x.lineTo(1080, 1250); x.lineTo(1080, 1500); x.lineTo(0, 1500); x.fill(); } }]] });
scene('sh_crypt', { sky: ['#3a3a4a', '#1a1a2a'], ground: '#4a4a52', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 3; k++) { h.rrect(x, 80 + k * 340, 900, 240, 340, 10); h.fs(x, '#6a6a7a', 9); h.rrect(x, 100 + k * 340, 880, 200, 40, 6); h.fs(x, '#8a8a9a', 6); } } }], ['fog', { n: 6, col: 'rgba(160,255,160,0.12)' }]] });
scene('sh_lamp', { sky: ['#2a2a3a', '#4a4a5a'], ground: '#5a5a62', back: [['custom', { fn: (x, h) => { h.rrect(x, 520, 300, 30, 950, 6); h.fs(x, '#3a3346', 6); x.beginPath(); x.moveTo(470, 300); x.lineTo(600, 300); x.lineTo(570, 240); x.lineTo(500, 240); x.closePath(); h.fs(x, '#3a3346', 6); const g = x.createRadialGradient(535, 320, 10, 535, 900, 700); g.addColorStop(0, 'rgba(255,240,170,0.6)'); g.addColorStop(1, 'rgba(255,240,170,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(500, 300); x.lineTo(100, 1300); x.lineTo(980, 1300); x.lineTo(570, 300); x.fill(); } }]] });
scene('sh_lab', { sky: ['#2a3a2a', '#4a5a4a'], ground: '#3a3a3a', back: [['custom', { fn: (x, h) => { h.rrect(x, 240, 900, 600, 140, 10); h.fs(x, '#8a8a9a', 9); for (let k = 0; k < 4; k++) { h.rrect(x, 80 + k * 260, 300, 120, 300, 50); h.fs(x, 'rgba(140,255,140,0.5)', 8); } } }]] });
scene('sh_corridor', { sky: ['#3a2a4a', '#2a1a3a'], ground: '#4a3a5a', back: [['custom', { fn: (x) => { x.strokeStyle = 'rgba(255,255,255,0.1)'; x.lineWidth = 6; for (let k = 0; k < 8; k++) { x.beginPath(); x.moveTo(540, 700); x.lineTo(k * 180 - 100, k % 2 ? 0 : 1300); x.stroke(); } } }], ['windows', { n: 2, x0: 100, gap: 600 }]] });
scene('sh_thriller', { sky: ['#1a1030', '#3a2050'], ground: '#2a2a2a', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(-100, 1250); x.lineTo(80, 700); x.lineTo(300, 500); x.lineTo(540, 300); x.lineTo(780, 500); x.lineTo(1000, 700); x.lineTo(1180, 1250); x.closePath(); h.fs(x, '#3a2a4a', 10); for (let k = 0; k < 5; k++) { h.rrect(x, 180 + k * 160, 700, 60, 100, 30); h.fs(x, '#ffd070', 6); } } }], ['fog', { n: 8, col: 'rgba(200,180,255,0.18)' }]] });
scene('sh_dusk', { sky: ['#4a2a4a', '#c86a5a'], ground: '#4a3a3a', back: [['sun', { x: 540, y: 1150, r: 220 }], ['fog', { n: 4 }]] });
scene('sh_sunrise', { sky: ['#ffd890', '#fff6dc'], ground: '#d8c090', back: [['sun', { x: 820, y: 360, r: 150 }], ['rays', { col: 'rgba(255,255,255,0.2)', y: 360 }]] });
scene('sh_ship', { sky: ['#3a2a4a', '#6a4a6a'], ground: '#8a5a3a', gy: 1260, back: [['custom', { fn: (x, h) => { h.rrect(x, 500, 200, 40, 1060, 6); h.fs(x, '#6b4630', 8); x.beginPath(); x.moveTo(540, 240); x.quadraticCurveTo(900, 500, 540, 800); x.closePath(); h.fs(x, '#2a2436', 8); } }]] });
scene('sh_cinema', { sky: ['#2a1a2a', '#140a14'], ground: '#4a1a2a', back: [['custom', { fn: (x, h) => { h.rrect(x, 100, 260, 880, 500, 10); h.fs(x, '#f4f0e8', 10); for (let r = 0; r < 2; r++) for (let k = 0; k < 6; k++) { h.rrect(x, 40 + k * 180, 1000 + r * 140, 140, 110, 30); h.fs(x, '#a0283a', 7); } } }]] });

// ---------------- shadows ----------------
// a living shadow: the person drawn as a dark silhouette (feet at fy)
export function shade(x, S, who, cx, fy, s, o = {}) { x.save(); x.filter = 'brightness(0)'; x.globalAlpha = o.alpha ?? 0.85; const p = person(x, S, who, 'calm', cx, fy, s, { ...o, alpha: 1 }); x.restore(); return p; }
function floorShadow(x, cx, fy, w, a = 0.45) { x.fillStyle = `rgba(20,10,30,${a})`; x.beginPath(); x.ellipse(cx, fy, w, w * 0.18, 0, 0, 7); x.fill(); }
export function scissors(x, cx, cy, s, open = 0.4, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s);
  for (const sd of [-1, 1]) { x.save(); x.rotate(sd * open * 0.5); x.beginPath(); x.moveTo(0, 0); x.lineTo(sd * 30, -360); x.lineTo(sd * -10, -360); x.closePath(); A.fs(x, '#c8ccd8', 7); x.beginPath(); x.ellipse(sd * 40, 90, 50, 70, 0, 0, 7); x.lineWidth = 22; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 12; x.strokeStyle = '#9a3ab0'; x.stroke(); x.restore(); }
  x.beginPath(); x.arc(0, 0, 14, 0, 7); A.fs(x, '#f4d030', 5); x.restore(); }
function stitches(x, cx, cy, s) { x.strokeStyle = A.OL; x.lineWidth = 6 * s; x.beginPath(); x.moveTo(cx - 60 * s, cy); x.lineTo(cx + 60 * s, cy - 20 * s); x.stroke(); for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(cx - 50 * s + k * 25 * s, cy - 18 * s - k * 4 * s); x.lineTo(cx - 50 * s + k * 25 * s, cy + 14 * s - k * 4 * s); x.stroke(); } }
export function zombie(x, S, who, cx, fy, s, o = {}) { const p = person(x, S, who, 'yuck', cx, fy, s, o); stitches(x, p.head[0], p.head[1] - 40 * s / 0.6, s / 0.6); A.glow(x, p.head[0], p.head[1], 90 * s / 0.6, '120,255,140', 0.3); return p; }
export function kageIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) scissors(x, 0, 120, 0.55, 0.5 + 0.2 * Math.sin(t * 6));
  else if (k === 2) { x.beginPath(); x.ellipse(0, 0, 90, 110, 0, 0, 7); A.fs(x, '#9ad890', 8); stitches(x, 0, -10, 1); }
  else if (k === 3) { A.mark(x, '!', -50, 0, 0.8); x.beginPath(); x.ellipse(50, 30, 60, 90, 0, 0, 7); x.fillStyle = '#14121a'; x.fill(); }
  else { A.glow(x, 0, 0, 200, '160,80,220', 0.7); x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fillStyle = '#14121a'; x.fill(); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a black fruit cradled in green leaves', biteDesc: 'the host\'s shadow on the wall jumps on its own', biteSfx: 'shimmer', bannerCol: 'pink', biteCol: '#2a2436',
    calmBg: 's3:sh_library', calmDesc: 'old library', seaHue: 'purple', seed: 75, nameRe: /^Shadow-Shadow/,
    revealBg: 's3:sh_eclipse', revealDesc: 'solar eclipse', revealBanner: 'SHADOW-SHADOW FRUIT', haloRgb: '190,140,240' });
  const tCtrl = W('type', /^control/) - 0.1, tPeople = W('type', /^people/) - 0.1;
  add({ name: 'Control shadows (sunny alley): the host\'s shadow stands up off the ground and waves at him', t0: tCtrl, t1: tPeople, bg: 's3:sh_alley',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'shimmer']],
    draw(x, S) { floorShadow(x, 540, 1790, 160); const k = ease.outBack(prog(S.t, 0.1, 0.6)); if (k > 0) shade(x, S, 'host', 780, 1780, 0.66 * k, { seed: 2, pose: 'raise', flip: true }); person(x, S, 'host', 'shock', 330, 1780, 0.66, { seed: 2, pose: 'shrug' }); } });
  stage(T, { desc: 'stone crypt', bg: 's3:sh_crypt', t0: tPeople, t1: end('type'), times: [W('type', /^people/), W('type', /^people/) + 0.2, W('type', /^people/) + 0.4, W('type', /^people/) + 0.6],
    labels: ['SNIP', 'ZOMBIE', 'SWAP', 'ASGARD'], bar: 'SHADOW POWERS', haloRgb: '190,140,240', icon: kageIcon });

  const tGiant = W('power1', /^giant/) - 0.1;
  addSplit({ name: 'Power 1 (street lamp at night): a grunt stands under the lamp with a long shadow behind him; purple CUT SHADOWS banner', t0: st('power1'), t1: end('power1'), bg: 's3:sh_lamp',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['STEAL SHADOWS', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'whoosh']],
    draw(x, S) { shade(x, S, 'grunt', 760, 1780, 0.62, { seed: 3, pose: 'idle', alpha: 0.6 }); person(x, S, 'grunt', 'calm', 400, 1780, 0.62, { seed: 3, pose: 'idle' }); } },
    tGiant, [[1.05, 600, 1000, 0.02], [1.1, 600, 990, 0.035]], 'Power 1 snip (same lamp): giant purple scissors snip, and the shadow peels away from the grunt\'s feet; shake');
  const p1 = T.shots[T.shots.length - 1]; p1.sfx = [[0.1, 'snap'], [0.3, 'slash']]; p1.draw = function (x, S) { const k = prog(S.T, S.t0 + 0.3, S.t0 + 1.2); person(x, S, 'grunt', 'shock', 400, 1780, 0.62, { seed: 3, pose: 'shrug' }); shade(x, S, 'grunt', lerp(760, 960, k), 1780 - 200 * k, 0.62, { seed: 3, pose: 'raise', alpha: 0.6 }); scissors(x, 640, 1700, 1.3, S.T < S.t0 + 0.3 ? 0.8 : 0, -1.3); if (S.T > S.t0 + 0.3 && S.T < S.t0 + 0.3 + 7 * F) S.shake = 0.4; };

  const tZomb = W('power2', /^zombie/) - 0.1;
  addSplit({ name: 'Power 2 evolve (mad lab): snip icon becomes the zombie icon; a dark shadow dives into a body on a lab table; green REANIMATE banner', t0: st('power2'), t1: end('power2'), bg: 's3:sh_lab',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['SHADOW + BODY', 'green', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^dead/) - st('power2'), 'shimmer']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, kageIcon)) return; const k = prog(S.T, W('power2', /^put/), W('power2', /^body/) + 0.2); x.save(); x.globalAlpha = 1 - k; shade(x, S, 'viking', lerp(200, 540, k), lerp(1500, 1000, k), 0.4, { seed: 3, pose: 'raise' }); x.restore(); if (k >= 1) A.glowRing(x, 540, 900, 300 * prog(S.T, W('power2', /^body/) + 0.2, tZomb), 0.7, '140,255,140'); } },
    tZomb, [[1.0, 540, 1000, -0.02], [1.06, 540, 980, -0.035]], 'Power 2 zombie (same lab): a stitched-up zombie soldier rises with a green glow and salutes');
  const p2 = T.shots[T.shots.length - 1]; p2.sfx = [[0, 'boom'], [0.3, 'stamp']]; p2.draw = function (x, S) { const k = ease.outBack(prog(S.T, S.t0, S.t0 + 0.4)); zombie(x, S, 'viking', 540, 1800, 0.7 * k + 0.01, { seed: 3, pose: 'raise' }); };

  add({ name: 'Power 3 evolve (purple corridor): zombie icon becomes the swap icon; Moria and his shadow trade places in a puff of darkness, dodging a punch; purple SWAP banner', t0: st('power3'), t1: end('power3'), bg: 's3:sh_corridor',
    cam: [[1.0, 540, 980, 0], [1.06, 560, 960, 0.02]], banners: [['SHADOW SWAP', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^swap/) - st('power3'), 'zip']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, kageIcon)) return; const sw = S.T > W('power3', /^swap/); const b = person(x, S, 'boxer', 'shock', 860, 1780, 0.6, { seed: 4, pose: 'punch', flip: true, pop: S.t0 + 0.45 });
      if (!sw) { person(x, S, 'moria', 'smug', 560, 1800, 0.5, { seed: 2, pose: 'idle' }); shade(x, S, 'moria', 280, 1800, 0.5, { seed: 2, pose: 'idle' }); } else { shade(x, S, 'moria', 560, 1800, 0.5, { seed: 2, pose: 'idle' }); person(x, S, 'moria', 'grin', 280, 1800, 0.5, { seed: 2, pose: 'cheer' }); A.mark(x, '?', b.head[0] - 100, b.head[1] - 180, pop(S.T, W('power3', /^swap/) + 0.2)); }
      if (Math.abs(S.T - W('power3', /^swap/)) < 0.15) { S.flash = 0.5; S.flashCol = '40,20,60'; } } });

  const tGiantP = W('peak', /^giant/) - 0.1;
  addSplit({ name: 'Peak (Thriller Bark at night): swap icon gives way to the black-orb icon, purple halo; gold SHADOW\'S ASGARD banner; a thousand shadows swirl down into Moria', t0: st('peak'), t1: end('peak'), bg: 's3:sh_thriller',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['SHADOW\'S ASGARD', 'gold', W('peak', /^Asgard/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^absorb/) - st('peak'), 'whoosh'], [W('peak', /^thousand/) - st('peak'), 'rumble']],
    draw(x, S) { halo(x, 540, 900, 620, '160,80,220', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, kageIcon); return; }
      person(x, S, 'moria', 'grin', 540, 1800, 0.6, { seed: 7, pose: 'raise' }); for (let i = 0; i < 18; i++) { const a = i / 18 * 6.283 + S.T * 2, r = 520 - ((S.T * 260 + i * 40) % 460); x.beginPath(); x.ellipse(540 + Math.cos(a) * r, 1200 + Math.sin(a) * r, 34, 58, a, 0, 7); x.fillStyle = 'rgba(20,10,30,0.85)'; x.fill(); } } },
    tGiantP, [[0.85, 540, 900, -0.02], [0.9, 540, 880, -0.035]], 'Peak giant (same island): Moria bulges into a towering giant, wiping the tower lights out; shake');
  const pk = T.shots[T.shots.length - 1]; pk.sfx = [[0, 'boom']]; pk.draw = function (x, S) { const k = ease.outBack(prog(S.T, S.t0, S.t0 + 0.5)); A.glow(x, 540, 1100, 600, '120,40,180', 0.6); person(x, S, 'moria', 'grin', 540, 2000, lerp(0.6, 1.25, k), { seed: 7, pose: 'raise' }); if (S.T < S.t0 + 0.4) S.shake = 0.7; };

  add({ name: 'Twist (dusk over the sea): push-in with roll, low sting; red SCARY TWIST banner', t0: st('twist'), t1: end('twist'), bg: 's3:sh_dusk', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['SCARY TWIST', 'red', W('twist', /^twist/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Sunlight (bright sunrise): a shadowless grunt steps into a sunbeam and starts fading into sparkles; red NO SHADOW = VANISH banner', t0: st('truth'), t1: end('truth'), bg: 's3:sh_sunrise',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['NO SHADOW + SUN = GONE', 'red', W('truth', /^vanish/) - 0.1, end('truth')]], sfx: [[W('truth', /^vanish/) - st('truth'), 'shimmer'], [W('truth', /^sunlight/) - st('truth'), 'fade']],
    draw(x, S) { const k = prog(S.T, W('truth', /^vanish/), end('truth')); person(x, S, 'grunt', 'shock', 540, 1780, 0.66, { seed: 3, pose: 'shrug', alpha: 1 - 0.85 * k }); for (let i = 0; i < 12; i++) A.sparkle(x, 400 + (i * 97) % 280, 1700 - ((S.T * 300 + i * 90) % 800), 16 * k, '#fff6c0'); } });

  const tUntil = W('users', /^until/) - 0.1;
  add({ name: 'Gecko Moria (ghost-ship deck): huge Moria with his tall stitched neck, horns, purple crest and bat-collar coat, zombies behind; purple GECKO MORIA banner', t0: st('users'), t1: tUntil, bg: 's3:sh_ship',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['GECKO MORIA', 'pink', st('users') + 0.2, W('users', /^Thriller/)], ['THRILLER BARK', 'blue', W('users', /^Thriller/), tUntil + 0.1]], sfx: [[0, 'whoosh']],
    draw(x, S) { zombie(x, S, 'viking', 180, 1760, 0.45, { seed: 3, pose: 'idle' }); zombie(x, S, 'brute', 900, 1760, 0.45, { seed: 4, pose: 'idle', flip: true }); person(x, S, 'moria', 'grin', 540, 1840, 0.72, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); } });
  add({ name: 'Luffy wins (same deck at dawn): Luffy\'s punch lands and Moria spits out every shadow he swallowed; red LUFFY WINS banner', t0: tUntil, t1: end('users'), bg: 's3:sh_ship',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['LUFFY BEAT HIM', 'red', W('users', /^beat/) - 0.1, end('users')]], sfx: [[W('users', /^beat/) - tUntil, 'impact']],
    draw(x, S) { const tb = W('users', /^beat/); person(x, S, 'moria', S.T > tb ? 'hit' : 'smug', 740, 1840, 0.6, { seed: 8, pose: 'shrug', flip: true }); person(x, S, 'luffy', 'grin', 260, 1800, 0.66, { seed: 4, pose: 'punch' }); if (S.T > tb) { A.impactStar(x, 560, 1300, 200 * pop(S.T, tb), S.T); for (let i = 0; i < 8; i++) { const u = prog(S.T, tb, tb + 1.2); x.beginPath(); x.ellipse(740 + Math.cos(i) * 500 * u, 1100 - Math.sin(i * 1.3) * 500 * u, 30, 50, i, 0, 7); x.fillStyle = 'rgba(20,10,30,0.8)'; x.fill(); } if (S.T < tb + 7 * F) S.shake = 0.7; } } });

  add({ name: 'Joke (empty cinema): the host sits alone with popcorn, then his shadow sits down in the seat next to him; gold NEVER ALONE banner', t0: st('joke'), t1: end('joke'), bg: 's3:sh_cinema',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NEVER ALONE', 'gold', W('joke', /^alone/) - 0.1, end('joke')]], sfx: [[0.3, 'pop'], [W('joke', /^alone/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'grin', 360, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); A.rrect(x, h.hand.R[0] - 40, h.hand.R[1] - 90, 80, 100, 8); A.fs(x, '#e8402e', 6); const k = ease.outBack(prog(S.T, S.t0 + 0.6, S.t0 + 1.0)); if (k > 0) shade(x, S, 'host', 780, 1780, 0.76 * k, { seed: 11, pose: 'cheer', flip: true }); } });

  ending(T, { TL, fruit });
  return finish();
}
