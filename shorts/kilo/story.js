// Shot plan for the Kilo Kilo no Mi (Kilo-Kilo Fruit) short. Structure: feather-light float, 10,000 kg drop, instant weight switch, the sky crush as the peak.
import * as A from '/engine/art.js';
import { drawKiro } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawKiro(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:ki_bakery', 'rays:lime', 's3:ki_weights', 's3:ki_balloon', 's3:ki_scale', 's3:ki_meadow', 's3:ki_crater', 's3:ki_seesaw', 's3:ki_clouds', 's3:ki_desert', 's3:ki_cracked', 's3:ki_whisky', 's3:ki_bathroom'];
scene('ki_bakery', { sky: ['#fff0dc', '#f4dcc0'], ground: '#c99b6d', back: [['shelves', { rows: 3, y: 240, cols: ['#e8b070', '#f4d090', '#c8884a'] }]] });
scene('ki_weights', { sky: ['#3a2a3a', '#6a3a5a'], back: [['custom', { fn: (x, h) => { for (const [cx, cy, s] of [[200, 400, 1], [880, 600, 0.8], [300, 1100, 0.7], [820, 1200, 1.1]]) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.moveTo(-90, 80); x.lineTo(90, 80); x.lineTo(60, -60); x.lineTo(-60, -60); x.closePath(); h.fs(x, '#4a4a5a', 8); x.beginPath(); x.arc(0, -80, 30, 0, 7); x.lineWidth = 14; x.strokeStyle = '#4a4a5a'; x.stroke(); x.restore(); } } }], ['stars', { n: 30 }]] });
scene('ki_balloon', { sky: ['#a8e0ff', '#e8f8ff'], ground: '#9ad86a', back: [['clouds', { n: 4, y: 200 }], ['custom', { fn: (x, h) => { for (const [bx, by, col] of [[180, 500, '#ff8cc0'], [880, 380, '#f4d030'], [700, 700, '#7cc8ff']]) { x.beginPath(); x.ellipse(bx, by, 60, 76, 0, 0, 7); h.fs(x, col, 7); x.beginPath(); x.moveTo(bx, by + 76); x.lineTo(bx + 10, by + 260); x.lineWidth = 3; x.strokeStyle = '#3a3346'; x.stroke(); } } }]] });
scene('ki_scale', { sky: ['#f4e8f8', '#e0d0ec'], ground: '#a89ac8', back: [['custom', { fn: (x, h) => { h.rrect(x, 520, 300, 40, 900, 8); h.fs(x, '#d9b44a', 8); h.rrect(x, 160, 300, 760, 30, 10); h.fs(x, '#d9b44a', 8); for (const px of [200, 880]) { x.beginPath(); x.moveTo(px, 330); x.lineTo(px - 90, 600); x.moveTo(px, 330); x.lineTo(px + 90, 600); x.lineWidth = 4; x.strokeStyle = '#8a6a2a'; x.stroke(); x.beginPath(); x.ellipse(px, 600, 120, 26, 0, 0, Math.PI); h.fs(x, '#d9b44a', 7); } } }]] });
scene('ki_meadow', { sky: ['#bfe8ff', '#f0fbff'], ground: '#8ad06a', back: [['clouds', { n: 3, y: 240, seed: 6 }], ['trees', { n: 2, x0: 60, gap: 900, leaf: '#5cb84a' }]] });
scene('ki_crater', { sky: ['#e8c890', '#f8e8c8'], ground: '#b89060', back: [['mountains', { gy: 1250, col: '#c8a070', hh: 300 }]] });
scene('ki_seesaw', { sky: ['#ffe0b0', '#fff4dc'], ground: '#9ad86a', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(470, 1250); x.lineTo(540, 1130); x.lineTo(610, 1250); x.closePath(); h.fs(x, '#8a5a3a', 8); } }], ['clouds', { n: 2, y: 200, seed: 2 }]] });
scene('ki_clouds', { sky: ['#5a8ad8', '#c8e0ff'], back: [['clouds', { n: 6, y: 300, h: 900, s: 1.3, seed: 11 }]] });
scene('ki_desert', { sky: ['#ffc880', '#ffe8c0'], ground: '#e8b870', back: [['sun', { x: 220, y: 300, r: 100 }], ['custom', { fn: (x, h) => { h.rrect(x, 760, 900, 50, 350, 20); h.fs(x, '#5a9a4a', 8); h.rrect(x, 700, 1000, 50, 120, 20); h.fs(x, '#5a9a4a', 7); h.rrect(x, 820, 960, 50, 120, 20); h.fs(x, '#5a9a4a', 7); } }]] });
scene('ki_cracked', { sky: ['#d8d0c8', '#f0e8e0'], ground: '#a89888', back: [['custom', { fn: (x) => { x.strokeStyle = '#5a4a3a'; x.lineWidth = 8; x.lineCap = 'round'; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(540, 1350); for (let k = 1; k < 5; k++) x.lineTo(540 + Math.cos(i) * k * 120 + (k % 2) * 30, 1350 + Math.sin(i * 0.6) * k * 40); x.stroke(); } } }]] });
scene('ki_whisky', { sky: ['#2a1a3a', '#5a3a6a'], ground: '#6a5a4a', back: [['moon', { x: 820, y: 240 }], ['custom', { fn: (x, h) => { for (let i = 0; i < 4; i++) { h.rrect(x, -40 + i * 290, 700 + (i % 2) * 80, 240, 560, 10); h.fs(x, '#8a6a4a', 9); x.beginPath(); x.arc(80 + i * 290, 700 + (i % 2) * 80, 120, Math.PI, 0); h.fs(x, '#a07850', 9); h.rrect(x, 40 + i * 290, 900 + (i % 2) * 80, 80, 100, 20); h.fs(x, '#ffd070', 6); } } }]] });
scene('ki_bathroom', { sky: ['#e0f4f8', '#c8e4ec'], ground: '#e8eef0', back: [['tiles', { col: 'rgba(60,120,140,0.2)' }], ['custom', { fn: (x, h) => { h.rrect(x, 640, 300, 300, 400, 20); h.fs(x, '#c8e8ff', 9); } }]] });

// ---------------- weight props ----------------
export function kgWeight(x, cx, cy, s, label = '10,000 KG') { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.moveTo(-200, 140); x.lineTo(200, 140); x.lineTo(140, -120); x.lineTo(-140, -120); x.closePath(); A.fs(x, '#3a3346', 12); x.beginPath(); x.arc(0, -150, 60, Math.PI, 0); x.lineWidth = 30; x.strokeStyle = '#3a3346'; x.stroke(); x.font = '64px "Lilita One"'; x.textAlign = 'center'; x.fillStyle = '#ffffff'; x.fillText(label, 0, 50); x.restore(); }
function feather(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.beginPath(); x.moveTo(0, -120); x.quadraticCurveTo(60, -40, 0, 120); x.quadraticCurveTo(-60, -40, 0, -120); A.fs(x, '#ffffff', 6); x.beginPath(); x.moveTo(0, -110); x.lineTo(0, 130); x.lineWidth = 5; x.strokeStyle = '#c8b8a8'; x.stroke(); x.restore(); }
export function bathScale(x, cx, cy, s, read) { x.save(); x.translate(cx, cy); x.scale(s, s); A.rrect(x, -160, -40, 320, 80, 24); A.fs(x, '#f4f8ff', 9); A.rrect(x, -90, -32, 180, 54, 10); A.fs(x, '#1b2440', 6); x.font = '44px "Lilita One"'; x.textAlign = 'center'; x.fillStyle = '#7fe0a0'; x.fillText(read, 0, 8); x.restore(); }
function sizeLines(x, cx, cy, t) { x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 8; x.lineCap = 'round'; for (let i = 0; i < 6; i++) { const yy = cy - 300 + i * 60 - ((t * 900) % 60); x.beginPath(); x.moveTo(cx - 200 - i * 20, yy); x.lineTo(cx - 200 - i * 20, yy - 120); x.moveTo(cx + 200 + i * 20, yy); x.lineTo(cx + 200 + i * 20, yy - 120); x.stroke(); } }
export function kiloIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) feather(x, 0, 0, 1, 0.4 + Math.sin(t * 3) * 0.2);
  else if (k === 2) kgWeight(x, 0, 20, 0.6, '10T');
  else if (k === 3) { x.font = '110px "Lilita One"'; x.textAlign = 'center'; x.lineWidth = 16; x.strokeStyle = A.OL; x.strokeText('1-10K', 0, 40); x.fillStyle = '#f4d030'; x.fillText('1-10K', 0, 40); }
  else { A.glow(x, 0, 0, 200, '255,210,90', 0.6); kgWeight(x, 0, 20, 0.6, '10,000'); A.speedLines(x, 0, -60, t, 8, 160, Math.PI / 2); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a maroon weight-shaped fruit with a green T stem', biteDesc: 'the desk groans and the plate cracks under the fruit', biteSfx: 'thunk', bannerCol: 'gold', biteCol: '#b0405a',
    calmBg: 's3:ki_bakery', calmDesc: 'bakery counter', seaHue: 'lime', seed: 79, nameRe: /^Kilo-Kilo/,
    revealBg: 's3:ki_weights', revealDesc: 'floating iron weights', revealBanner: 'KILO-KILO FRUIT', haloRgb: '255,200,150' });
  const tChg = W('type', /^changes/) - 0.1, tAre = W('type', /^are/) - 0.1;
  add({ name: 'Weight (balloon sky): the host floats up like a balloon, then thumps down', t0: tChg, t1: tAre, bg: 's3:ki_balloon',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'inflate'], [0.7, 'thunk']],
    draw(x, S) { const k = prog(S.t, 0, 0.6), d = prog(S.t, 0.6, 0.75); person(x, S, 'host', 'shock', 540, 1780 - 500 * k * (1 - d), 0.66, { seed: 2, pose: 'raise' }); if (d >= 1 && S.t < 0.75 + 7 * F) S.shake = 0.4; } });
  stage(T, { desc: 'giant balance scale', bg: 's3:ki_scale', t0: tAre, t1: end('type'), times: [W('type', /^are/), W('type', /^are/) + 0.2, W('type', /^are/) + 0.4, W('type', /^are/) + 0.6],
    labels: ['FEATHER', 'DROP', 'SWITCH', 'CRUSH'], bar: 'WEIGHT POWERS', haloRgb: '255,200,150', icon: kiloIcon });

  const tFloat = W('power1', /^float/) - 0.1;
  addSplit({ name: 'Power 1 (breezy meadow): Miss Valentine goes feather-light, feathers drift around her; pink FEATHER LIGHT banner', t0: st('power1'), t1: end('power1'), bg: 's3:ki_meadow',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['1 KILO', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'twinkle']],
    draw(x, S) { person(x, S, 'valentine', 'grin', 540, 1780, 0.66, { seed: 2, pose: 'idle' }); for (let i = 0; i < 5; i++) feather(x, 160 + i * 190, 900 + Math.sin(S.T * 2 + i) * 160, 0.5, S.T + i); } },
    tFloat, [[1.0, 540, 900, 0.02], [1.05, 540, 880, 0.035]], 'Power 1 float (same meadow, higher): she drifts up on her yellow-and-purple umbrella like a dandelion seed');
  const p1 = T.shots[T.shots.length - 1]; p1.sfx = [[0, 'whoosh']]; p1.draw = function (x, S) { const k = prog(S.T, S.t0, S.t0 + 1.5); person(x, S, 'valentine', 'grin', 540 + Math.sin(S.T * 2) * 60, lerp(1780, 1500, k), 0.62, { seed: 2, pose: 'raise' }); };

  const tTen = W('power2', /^ten/) - 0.1;
  addSplit({ name: 'Power 2 evolve (dusty plain): feather icon becomes the weight icon; Miss Valentine tumbles out of the sky right above a grunt, who looks up; red DROP banner', t0: st('power2'), t1: end('power2'), bg: 's3:ki_crater',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['INCOMING', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^drop/) - st('power2'), 'fall']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, kiloIcon)) return; const g = person(x, S, 'grunt', 'worried', 560, 1780, 0.62, { seed: 3, pose: 'shrug', pop: S.t0 + 0.45 }); const k = prog(S.T, W('power2', /^drop/), tTen + 0.2); person(x, S, 'valentine', 'smug', 560, lerp(200, 900, k), 0.5, { seed: 2, pose: 'raise' }); A.speedLines(x, 560, 400 + 500 * k, S.T, 8, 200, Math.PI / 2); A.mark(x, '!', g.head[0] + 120, g.head[1] - 120, pop(S.T, W('power2', /^drop/) + 0.2)); } },
    tTen, [[1.0, 540, 1000, -0.02], [1.08, 540, 990, -0.035]], 'Power 2 impact (same plain): SLAM, a crater with a 10,000 KG weight sign, dust rings; shake');
  const p2 = T.shots[T.shots.length - 1]; p2.sfx = [[0.05, 'boom'], [0.1, 'crumble']]; p2.draw = function (x, S) { const k = prog(S.T, S.t0, S.t0 + 0.25); x.beginPath(); x.ellipse(540, 1780, 420 * ease.outBack(k), 70, 0, 0, 7); x.fillStyle = '#7a5a3a'; x.fill(); person(x, S, 'valentine', 'grin', 540, 1780, 0.62, { seed: 2, pose: 'cheer' }); kgWeight(x, 540, 620, 0.9 * pop(S.T, S.t0 + 0.1)); if (S.T < S.t0 + 0.35) S.shake = 0.8; };

  add({ name: 'Power 3 evolve (playground seesaw): weight icon becomes the switch icon; she flips between 1 kg and 10,000 kg so the seesaw slams up and down, launching the host; purple 1 OR 10,000 banner', t0: st('power3'), t1: end('power3'), bg: 's3:ki_seesaw',
    cam: [[1.0, 540, 980, 0], [1.06, 560, 960, 0.02]], banners: [['1 KG OR 10,000 KG', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^instantly/) - st('power3'), 'thunk'], [W('power3', /^between/) - st('power3'), 'boing']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, kiloIcon)) return; const heavy = Math.sin(S.T * 5) > 0, a = heavy ? -0.28 : 0.28; x.save(); x.translate(540, 1150); x.rotate(a); A.rrect(x, -440, -20, 880, 40, 10); A.fs(x, '#c8303a', 8); x.restore();
      person(x, S, 'valentine', heavy ? 'smug' : 'grin', 160, 1150 + Math.sin(a) * -380 + 20, 0.42, { seed: 2, pose: 'idle' }); if (heavy) kgWeight(x, 160, 640, 0.4, '10,000'); else feather(x, 200, 700, 0.5, S.T);
      person(x, S, 'host', 'shock', 920, 1150 + Math.sin(a) * 380 - (heavy ? 300 : 0) + 20, 0.42, { seed: 11, pose: 'raise', flip: true }); } });

  const tCrush = W('peak', /^crush/) - 0.1;
  addSplit({ name: 'Peak (high clouds): switch icon gives way to the 10,000 icon, gold halo; gold 10,000 KILO PRESS banner; Miss Valentine closes her umbrella high above the clouds', t0: st('peak'), t1: end('peak'), bg: 's3:ki_clouds',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['10,000 KILO PRESS', 'gold', W('peak', /^ten/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^ten/) - st('peak'), 'charge']],
    draw(x, S) { halo(x, 540, 900, 620, '255,210,90', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, kiloIcon); return; }
      person(x, S, 'valentine', 'smug', 540, 1700, 0.62, { seed: 7, pose: 'raise' }); kgWeight(x, 540, 700, 0.6 * pop(S.T, W('peak', /^kilo/))); } },
    tCrush, [[1.0, 540, 1000, -0.02], [1.08, 540, 990, -0.035]], 'Peak crush (same sky, looking down): she plummets with speed lines and a giant 10,000 KG weight, BOOM on the ground below; shake');
  const pk = T.shots[T.shots.length - 1]; pk.sfx = [[0, 'fall'], [0.6, 'blast']]; pk.draw = function (x, S) { const k = prog(S.T, S.t0, S.t0 + 0.6); A.speedLines(x, 540, 1000, S.T, 16, 400, Math.PI / 2); person(x, S, 'valentine', 'grin', 540, lerp(900, 1800, k), 0.62, { seed: 7, pose: 'raise' }); kgWeight(x, 540, lerp(100, 1000, k), 0.8); if (k >= 1) { A.impactStar(x, 540, 1750, 400 * pop(S.T, S.t0 + 0.6), S.T); if (S.T < S.t0 + 0.6 + 8 * F) S.shake = 0.9; } };

  add({ name: 'Twist (desert with a cactus): push-in with roll, low sting; red ONE CATCH banner', t0: st('twist'), t1: end('twist'), bg: 's3:ki_desert', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['ONE CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  const tNothing = W('truth', /^nothing/) - 0.1;
  add({ name: 'Steps aside (cracked ground): a cowboy casually sidesteps; Miss Valentine slams into the empty ground and cracks it; red MISSED banner', t0: st('truth'), t1: end('truth'), bg: 's3:ki_cracked',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['MISSED!', 'red', tNothing, end('truth')]], sfx: [[W('truth', /^steps/) - st('truth'), 'swish'], [tNothing - st('truth'), 'boom'], [tNothing - st('truth') + 0.3, 'boing']],
    draw(x, S) { const ts = W('truth', /^steps/), k = ease.outCubic(prog(S.T, ts, ts + 0.3)); person(x, S, 'cowboy', 'smug', lerp(540, 880, k), 1780, 0.6, { seed: 3, pose: 'idle', flip: true }); const f = prog(S.T, ts + 0.1, tNothing); person(x, S, 'valentine', S.T > tNothing ? 'hit' : 'smug', 480, lerp(500, 1780, f), 0.6, { seed: 2, pose: S.T > tNothing ? 'shrug' : 'raise' }); if (S.T > tNothing && S.T < tNothing + 7 * F) S.shake = 0.6; } });

  const tUntil = W('users', /^until/) - 0.1;
  add({ name: 'Miss Valentine (Whisky Peak at night): orange bucket hat, blue jacket, lemon-print dress, yellow-and-purple umbrella; purple MISS VALENTINE banner', t0: st('users'), t1: tUntil, bg: 's3:ki_whisky',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['MISS VALENTINE', 'pink', st('users') + 0.2, W('users', /^Baroque/)], ['BAROQUE WORKS', 'blue', W('users', /^Baroque/), tUntil + 0.1]], sfx: [[0, 'whoosh']],
    draw(x, S) { person(x, S, 'valentine', 'grin', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); } });
  add({ name: 'Luffy wins (same town): Luffy\'s punch sends her spinning off into the night sky with a twinkle; red LUFFY WINS banner', t0: tUntil, t1: end('users'), bg: 's3:ki_whisky',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['LUFFY BEAT HER', 'red', W('users', /^beat/) - 0.1, end('users')]], sfx: [[W('users', /^beat/) - tUntil, 'impact'], [W('users', /^Whisky/) - tUntil, 'twinkle']],
    draw(x, S) { const tb = W('users', /^beat/), k = ease.outCubic(prog(S.T, tb, tb + 0.8)); person(x, S, 'luffy', 'grin', 280, 1800, 0.66, { seed: 4, pose: 'punch' }); if (k < 1) person(x, S, 'valentine', S.T > tb ? 'hit' : 'smug', lerp(760, 1000, k), lerp(1800, 600, k), lerp(0.62, 0.1, k), { seed: 8, pose: 'shrug', flip: true }); else A.sparkle(x, 1000, 600, 40 * Math.abs(Math.sin(S.T * 8)), '#ffffff'); if (S.T > tb && S.T < tb + 0.3) A.impactStar(x, 600, 1300, 200, S.T); } });

  add({ name: 'Joke (bathroom): the host steps on a scale; it flickers 1 KG... 10,000 KG... 1 KG, and he shrugs happily; gold NO SCALE WORRIES banner', t0: st('joke'), t1: end('joke'), bg: 's3:ki_bathroom',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['SCALE? WHAT SCALE?', 'gold', W('joke', /^scale/) - 0.1, end('joke')]], sfx: [[0.3, 'ding'], [W('joke', /^scale/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { bathScale(x, 540, 1790, 1.0, Math.sin(S.T * 4) > 0 ? '1 KG' : '10000'); person(x, S, 'host', 'grin', 540, 1760, 0.72, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug', talk: true }); } });

  ending(T, { TL, fruit });
  return finish();
}
