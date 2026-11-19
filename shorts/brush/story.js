// Shot plan for the Fude Fude no Mi (Brush-Brush Fruit) short. Structure: drawings come alive, drawn fighters, a giant monster, drawn fake copy as the peak.
import * as A from '/engine/art.js';
import { drawFude } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawFude(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:fu_artroom', 'rays:tan', 's3:fu_scroll', 's3:fu_paper', 's3:fu_stage', 's3:fu_meadow', 's3:fu_dojo', 's3:fu_city', 's3:fu_mirror', 's3:fu_gallery', 's3:fu_spy', 's3:fu_wano', 's3:fu_class'];
scene('fu_artroom', { sky: ['#fff4e0', '#f2e2c8'], ground: '#c99b6d', back: [['frames', { list: [[60, 260, 260, 320], [400, 220, 280, 360], [760, 300, 240, 280]] }], ['spots', { col: 'rgba(80,140,255,0.25)', n: 20, r: 18, h: 1200 }]] });
scene('fu_scroll', { sky: ['#f4ead2', '#e8dcc0'], back: [['custom', { fn: (x, h) => { h.rrect(x, 90, 200, 900, 1500, 10); h.fs(x, '#fffaf0', 10); h.rrect(x, 60, 160, 960, 60, 20); h.fs(x, '#6b4630', 8); h.rrect(x, 60, 1680, 960, 60, 20); h.fs(x, '#6b4630', 8); x.strokeStyle = 'rgba(30,20,20,0.35)'; x.lineWidth = 14; x.lineCap = 'round'; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(200 + i * 150, 300); x.quadraticCurveTo(240 + i * 150, 600, 200 + i * 150, 900); x.stroke(); } } }]] });
scene('fu_paper', { sky: ['#fffaf0', '#f4ead2'], back: [['custom', { fn: (x) => { x.strokeStyle = 'rgba(90,140,200,0.25)'; x.lineWidth = 3; for (let y = 0; y < 2000; y += 60) { x.beginPath(); x.moveTo(-80, y); x.lineTo(1160, y); x.stroke(); } } }]] });
scene('fu_stage', { sky: ['#2a2430', '#141018'], ground: '#4a3a3a', gy: 1250, back: [['custom', { fn: (x) => { x.strokeStyle = 'rgba(255,255,255,0.18)'; x.lineWidth = 30; x.lineCap = 'round'; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(-50, 200 + i * 180); x.quadraticCurveTo(540, 140 + i * 180, 1130, 220 + i * 180); x.stroke(); } } }]] });
scene('fu_meadow', { sky: ['#a8e0ff', '#e8f8ff'], ground: '#9ad86a', gy: 1180, back: [['clouds', { n: 3, y: 200 }], ['trees', { n: 2, x0: 80, gap: 920, leaf: '#5cb84a' }]] });
scene('fu_dojo', { sky: ['#e8d8b8', '#c8b090'], ground: '#a26d45', back: [['columns', { n: 4, x0: 40, gap: 300, w: 50, col: '#6b4630' }], ['custom', { fn: (x, h) => { for (let k = 0; k < 3; k++) { h.rrect(x, 160 + k * 300, 300, 160, 600, 6); h.fs(x, '#f4ead2', 6); } } }]] });
scene('fu_city', { sky: ['#ffb88a', '#ffe0c0'], ground: '#9a8a7a', back: [['houses', { cols: ['#c8a878', '#b8a090', '#d8b8a0'], roof: '#5a3a3a', seed: 51 }]] });
scene('fu_mirror', { sky: ['#e8e0f8', '#d0c4ec'], ground: '#a89ac8', back: [['frames', { list: [[100, 260, 340, 880], [640, 260, 340, 880]], col: '#c8e0ff' }]] });
scene('fu_gallery', { sky: ['#f4f0e8', '#e0d8c8'], ground: '#8a6a4a', back: [['frames', { list: [[60, 300, 260, 320], [400, 260, 280, 360], [760, 300, 260, 320]] }], ['custom', { fn: (x) => { x.strokeStyle = '#1b1530'; x.lineWidth = 6; for (const [cx, cy] of [[190, 460], [540, 440], [890, 460]]) { x.beginPath(); x.moveTo(cx - 60, cy + 40); x.lineTo(cx - 20, cy - 50); x.lineTo(cx + 40, cy + 30); x.lineTo(cx + 60, cy - 30); x.stroke(); } } }]] });
scene('fu_spy', { sky: ['#1a1a2a', '#0a0a14'], ground: '#1a1420', back: [['moon', { x: 820, y: 280 }], ['custom', { fn: (x, h) => { for (let k = 0; k < 6; k++) { h.rrect(x, -40 + k * 200, 300, 180, 900, 4); h.fs(x, '#2a2436', 6); } } }]] });
scene('fu_wano', { sky: ['#ffb88a', '#ffe0c0'], ground: '#c9a880', back: [['lanterns', { y: 320 }], ['houses', { cols: ['#8a5a3c', '#7a4a2a'], roof: '#3a3346', win: '#f4ead2', seed: 57 }]] });
scene('fu_class', { sky: ['#f4e8d0', '#e8d8b8'], ground: '#a26d45', back: [['custom', { fn: (x, h) => { h.rrect(x, 60, 250, 960, 520, 10); h.fs(x, '#2f4a3a', 10); } }], ['sign', { text: 'ART CLASS', bg: '#ffffff', y: 820 }]] });

// ---------------- brush effects ----------------
export function bigBrush(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.rrect(x, -18, -300, 36, 300, 12); A.fs(x, '#5a2a6a', 7); A.rrect(x, -24, -30, 48, 40, 8); A.fs(x, '#d9b44a', 6); x.beginPath(); x.moveTo(-34, 10); x.quadraticCurveTo(-30, 120, 0, 190); x.quadraticCurveTo(30, 120, 34, 10); x.closePath(); A.fs(x, '#f4ead2', 7); x.beginPath(); x.moveTo(-14, 120); x.quadraticCurveTo(0, 180, 0, 190); x.quadraticCurveTo(10, 160, 14, 120); x.fillStyle = '#14121a'; x.fill(); x.restore(); }
// a deliberately bad scribbly ink creature; k = 0..1 how much is drawn
function scribble(x, cx, cy, s, k, t, kind = 'dog') { x.save(); x.translate(cx, cy); x.scale(s, s); x.lineCap = 'round'; x.lineJoin = 'round'; x.lineWidth = 16; x.strokeStyle = '#14121a';
  const path = kind === 'dog' ? [[-160, 40], [-100, -40], [60, -40], [140, -100], [200, -60], [160, 0], [120, 20], [120, 100], [80, 100], [80, 40], [-100, 40], [-100, 100], [-140, 100], [-160, 40], [-220, -20]]
    : kind === 'warrior' ? [[0, -200], [-60, -160], [-40, -100], [40, -100], [60, -160], [0, -200], [0, -100], [0, 60], [-80, 160], [0, 60], [80, 160], [0, -40], [-120, -60], [0, -40], [160, -120], [220, -180]]
    : [[-260, 100], [-200, -200], [-100, -300], [0, -200], [100, -320], [200, -200], [260, 100], [160, 0], [100, 120], [0, 20], [-100, 120], [-160, 0], [-260, 100]];
  const n = Math.max(1, Math.floor(path.length * k)); x.beginPath(); path.slice(0, n).forEach(([px, py], i) => { const wob = Math.sin(t * 6 + i) * 6; i ? x.lineTo(px + wob, py - wob) : x.moveTo(px, py); }); x.stroke();
  if (k > 0.9) { x.fillStyle = '#14121a'; for (const [ex, ey] of (kind === 'monster' ? [[-80, -120], [80, -120]] : kind === 'warrior' ? [[-20, -150], [20, -150]] : [[150, -60]])) { x.beginPath(); x.arc(ex, ey, kind === 'monster' ? 26 : 10, 0, 7); x.fill(); } }
  x.restore(); }
function inkSplat(x, cx, cy, r, k) { if (k <= 0 || k >= 1) return; x.save(); x.globalAlpha = 1 - k; for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; x.beginPath(); x.arc(cx + Math.cos(a) * r * k, cy + Math.sin(a) * r * k, 20 * (1 - k), 0, 7); x.fillStyle = '#14121a'; x.fill(); } x.restore(); }
export function fudeIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) scribble(x, 0, 30, 0.5, 1, t, 'dog');
  else if (k === 2) scribble(x, 0, 20, 0.6, 1, t, 'warrior');
  else if (k === 3) scribble(x, 0, 60, 0.4, 1, t, 'monster');
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); bigBrush(x, 0, -40, 0.5, 0.4); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a swirly fruit with a black ink-brush top', biteDesc: 'black ink splashes across the desk', biteSfx: 'splash', bannerCol: 'gold', biteCol: '#f4f4f4',
    biteFx(x, S, k) { inkSplat(x, 760, 1400, 200, k); },
    calmBg: 's3:fu_artroom', calmDesc: 'art room', seaHue: 'tan', seed: 77, nameRe: /^Brush-Brush/,
    revealBg: 's3:fu_scroll', revealDesc: 'giant ink scroll', revealBanner: 'BRUSH-BRUSH FRUIT', haloRgb: '220,210,190' });
  const tThat = W('type', /^that/) - 0.1, tLife = W('type', /^come/) - 0.1;
  add({ name: 'Draw it (lined paper): a giant brush in the host\'s hand paints a quick line that hops up off the page', t0: tThat, t1: tLife, bg: 's3:fu_paper',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'swish']],
    draw(x, S) { const h = person(x, S, 'host', 'grin', 300, 1780, 0.66, { seed: 2, pose: 'punch' }); bigBrush(x, h.hand.R[0] + 20, h.hand.R[1], 0.8, 1.2); scribble(x, 760, 1300 - 100 * prog(S.t, 0.6, 1.0), 0.8, prog(S.t, 0.1, 0.7), S.T, 'dog'); } });
  stage(T, { desc: 'ink-stroke stage', bg: 's3:fu_stage', t0: tLife, t1: end('type'), times: [W('type', /^come/), W('type', /^to$/), W('type', /^life/), W('type', /^life/) + 0.35],
    labels: ['ALIVE', 'FIGHTERS', 'MONSTER', 'FAKE YOU'], bar: 'BRUSH TRICKS', haloRgb: '220,210,190', icon: fudeIcon });

  const tJump = W('power1', /^jumps/) - 0.1;
  addSplit({ name: 'Power 1 (sunny meadow): the host paints a scribbly dog; it jumps right off the paper and runs around; gold COMES ALIVE banner', t0: st('power1'), t1: end('power1'), bg: 's3:fu_meadow',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['IT\'S ALIVE', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'swish'], [tJump - st('power1'), 'boing']],
    draw(x, S) { const h = person(x, S, 'host', 'grin', 280, 1780, 0.66, { seed: 2, pose: 'punch' }); bigBrush(x, h.hand.R[0] + 20, h.hand.R[1], 0.8, 1.2); A.rrect(x, 520, 1100, 440, 340, 10); A.fs(x, '#fffaf0', 8); scribble(x, 740, 1300, 0.7, prog(S.t, 0.1, 0.9), S.T, 'dog'); } },
    tJump, [[1.0, 540, 1000, 0.02], [1.06, 540, 990, 0.035]], 'Power 1 run (same meadow): the ink dog bounds across the grass, the surfer stares, ?');
  const p1 = T.shots[T.shots.length - 1]; p1.draw = function (x, S) { const u = (S.T * 0.6) % 1; const e = person(x, S, 'surfer', 'shock', 860, 1780, 0.6, { seed: 3, pose: 'shrug', flip: true }); scribble(x, lerp(100, 900, u), 1600 - Math.abs(Math.sin(S.T * 6)) * 120, 0.8, 1, S.T, 'dog'); A.mark(x, '?', e.head[0] - 130, e.head[1] - 190, pop(S.T, S.t0 + 0.3), -0.2); };

  const tBattle = W('power2', /^battle/) - 0.1;
  add({ name: 'Power 2 evolve (dojo): alive icon becomes the fighters icon; three scribbly ink warriors leap out of a scroll and charge the surfer; red INK ARMY banner', t0: st('power2'), t1: end('power2'), bg: 's3:fu_dojo',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['INK FIGHTERS', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^weapons/) - st('power2'), 'swish'], [tBattle - st('power2'), 'drums']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, fudeIcon)) return; const u = ease.outCubic(prog(S.T, W('power2', /^weapons/), tBattle + 0.6)); for (let i = 0; i < 3; i++) scribble(x, lerp(200 + i * 60, 520 + i * 120, u), 1500 - i * 40, 0.9, Math.min(1, u * 2), S.T + i, 'warrior');
      const e = person(x, S, 'surfer', u > 0.6 ? 'shock' : 'calm', 900, 1780, 0.58, { seed: 3, pose: 'shrug', flip: true, pop: S.t0 + 0.45 }); if (u > 0.6) A.mark(x, '!?', e.head[0] - 120, e.head[1] - 190, pop(S.T, tBattle + 0.3)); } });

  const tBuild = W('power3', /^building/) - 0.1;
  addSplit({ name: 'Power 3 evolve (sunset city): fighters icon becomes the monster icon; the host paints in huge strokes and a building-sized ink monster rises behind the houses; purple GIANT MONSTER banner', t0: st('power3'), t1: end('power3'), bg: 's3:fu_city',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['GIANT INK MONSTER', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^monster/) - st('power3'), 'rumble'], [tBuild - st('power3'), 'shock']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, fudeIcon)) return; scribble(x, 560, 1000, 2.6, prog(S.T, W('power3', /^draw/), tBuild), S.T, 'monster'); const h = person(x, S, 'host', 'grin', 240, 1780, 0.56, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 }); bigBrush(x, h.hand.L[0], h.hand.L[1] - 40, 0.7, -0.4); } },
    tBuild, [[0.95, 540, 900, -0.02], [1.0, 540, 880, -0.035]], 'Power 3 roar (same city): the ink monster towers over the rooftops; shake');
  const p3 = T.shots[T.shots.length - 1]; p3.draw = function (x, S) { scribble(x, 560, 1000, 2.7, 1, S.T, 'monster'); if (S.T < tBuild + 7 * F) S.shake = 0.8; };

  const tFool = W('peak', /^fool/) - 0.1;
  addSplit({ name: 'Peak (hall of mirrors): monster icon gives way to the brush icon, gold halo; gold FAKE COPY banner; the host paints a copy of himself in one stroke and the two stand side by side', t0: st('peak'), t1: end('peak'), bg: 's3:fu_mirror',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['A FAKE YOU', 'gold', W('peak', /^fake/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^fake/) - st('peak'), 'swish'], [W('peak', /^yourself/) - st('peak'), 'shimmer']],
    draw(x, S) { halo(x, 540, 900, 620, '255,215,90', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, fudeIcon); return; }
      const h = person(x, S, 'host', 'smug', 330, 1780, 0.66, { seed: 7, pose: 'punch' }); bigBrush(x, h.hand.R[0] + 20, h.hand.R[1], 0.8, 1.2); const k = prog(S.T, W('peak', /^fake/), W('peak', /^yourself/) + 0.3);
      if (k > 0) person(x, S, 'host', 'smug', 760, 1780, 0.66, { seed: 7, pose: 'shrug', alpha: k, flip: true }); if (S.T > W('peak', /^fake/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^fake/), W('peak', /^fake/) + 0.3))); S.flashCol = '255,246,200'; } } },
    tFool, [[1.2, 540, 1100, -0.02], [1.28, 540, 1090, -0.035]], 'Peak fooled (same mirrors): the surfer looks from one host to the other, ?? marks');
  const pk = T.shots[T.shots.length - 1]; pk.draw = function (x, S) { person(x, S, 'host', 'smug', 330, 1780, 0.62, { seed: 7, pose: 'shrug' }); person(x, S, 'host', 'smug', 750, 1780, 0.62, { seed: 7, pose: 'shrug', flip: true }); const e = person(x, S, 'surfer', 'worried', 540, 1800, 0.5, { seed: 3, pose: 'shrug' }); A.mark(x, '?', e.head[0] - 100, e.head[1] - 170, pop(S.T, S.t0 + 0.2), -0.2); A.mark(x, '?', e.head[0] + 100, e.head[1] - 170, pop(S.T, S.t0 + 0.5), 0.2); };

  add({ name: 'Twist (art gallery): a row of frames holds terrible scribbles; push-in with roll, low sting; red FUNNY CATCH banner', t0: st('twist'), t1: end('twist'), bg: 's3:fu_gallery', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['FUNNY CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Bad drawings (same gallery, closer): a wobbly scribble dog shuffles around, the critic in a beret winces; red TERRIBLE banner', t0: st('truth'), t1: end('truth'), bg: 's3:fu_gallery',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['TERRIBLE ART', 'red', W('truth', /^terrible/) - 0.1, end('truth')]], sfx: [[0.3, 'boing'], [W('truth', /^terrible/) - st('truth'), 'yuck']],
    draw(x, S) { scribble(x, 400, 1600, 0.8, 1, S.T * 2, 'dog'); person(x, S, 'critic', 'yuck', 820, 1780, 0.64, { seed: 3, pose: 'shrug', flip: true }); } });

  const tSpy = W('users', /^spy/) - 0.1;
  add({ name: 'Kanjuro (old Wano street): Kanjuro, long red hair, pink-and-green kimono, holding his giant brush; purple KANJURO banner', t0: st('users'), t1: tSpy, bg: 's3:fu_wano',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['KUROZUMI KANJURO', 'pink', st('users') + 0.2, tSpy]], sfx: [[0, 'whoosh']],
    draw(x, S) { const k = person(x, S, 'kanjuro', 'grin', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'holdUp' }); bigBrush(x, k.hand.R[0], k.hand.R[1] - 20, 1.0, 0.3); } });
  add({ name: 'The spy (night rooftops): Kanjuro peeks out from behind a paper wall, a scribbly bird carrying a note; red SPY FOR 20 YEARS banner', t0: tSpy, t1: end('users'), bg: 's3:fu_spy',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['SPY FOR 20 YEARS', 'red', tSpy + 0.3, end('users')]], sfx: [[0.2, 'swish']],
    draw(x, S) { person(x, S, 'kanjuro', 'smug', 360, 1820, 0.66, { seed: 8, pose: 'idle' }); scribble(x, 760 + Math.sin(S.T * 2) * 60, 600, 0.6, 1, S.T, 'dog'); } });

  add({ name: 'Joke (art class): the host holds up a terrible scribble, and it waves back; the teacher gives a gold star anyway; gold A+ banner', t0: st('joke'), t1: end('joke'), bg: 's3:fu_class',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['ART CLASS: A+', 'gold', W('joke', /^class/) - 0.1, end('joke')]], sfx: [[0.3, 'boing'], [W('joke', /^class/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 400, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); A.rrect(x, h.hand.R[0] - 30, h.hand.R[1] - 300, 260, 300, 8); A.fs(x, '#fffaf0', 7); scribble(x, h.hand.R[0] + 100, h.hand.R[1] - 150, 0.4, 1, S.T * 3, 'warrior'); A.sparkle(x, 860, 900, 50 * Math.abs(Math.sin(S.T * 4)), '#ffe14d'); } });

  ending(T, { TL, fruit });
  return finish();
}
