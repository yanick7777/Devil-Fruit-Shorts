// Shot plan for the Awa Awa no Mi (Bubble-Bubble Fruit) short. Structure: cleaning, strength-draining, slippery ground, Golden Awa as the peak.
import * as A from '/engine/art.js';
import { drawAwa } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawAwa(x, cx, cy, R * 0.95, rot, o);

export const SETS = ['s3:bb_laundry', 'rays:lavender', 's3:bb_spa', 's3:bb_bath', 's3:bb_stage', 's3:bb_kitchen', 's3:bb_gym', 's3:bb_rink', 's3:bb_carwash', 's3:bb_drain', 's3:bb_justice', 's3:bb_office', 's3:bb_bathroom'];
scene('bb_laundry', { sky: ['#cfe8ff', '#b8d8f4'], ground: '#e8eef6', back: [['tiles', { col: 'rgba(120,160,200,0.25)' }], ['windows', { n: 3, y: 520, w: 260, hh: 260, col: '#e8f6ff', gap: 330, x0: 50 }], ['bubbles', { n: 8, h: 500 }]] });
scene('bb_spa', { sky: ['#f4e8ff', '#e0d0f8'], ground: '#f4f0e6', back: [['bubbles', { n: 16 }], ['columns', { n: 3, x0: 100, gap: 380, col: '#ffffff' }]] });
scene('bb_bath', { sky: ['#d0ecff', '#a8d8f8'], ground: '#ffffff', gy: 1200, back: [['tiles', { col: 'rgba(80,140,200,0.3)', s: 120 }], ['bubbles', { n: 12, h: 1100 }]], front: [['custom', { fn: (x, h) => { h.rrect(x, 100, 1080, 880, 200, 80); h.fs(x, '#ffffff', 10); for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(160 + i * 95, 1080, 60, 0, 7); x.fillStyle = '#ffffff'; x.fill(); } } }]] });
scene('bb_stage', { sky: ['#3a2a6a', '#24184a'], ground: '#5a4a8a', gy: 1250, back: [['bubbles', { n: 20, h: 1100 }], ['stars', { n: 30 }]] });
scene('bb_kitchen', { sky: ['#fff4e0', '#ffe8c8'], ground: '#c8a878', back: [['tiles', { col: 'rgba(200,120,80,0.25)', s: 80 }], ['shelves', { rows: 2, y: 180, cols: ['#ff9a6a', '#9ae07a', '#ffd06a', '#c8a0ff'] }]], front: [['custom', { fn: (x, h) => { h.rrect(x, -60, 1040, 1200, 200, 0); h.fs(x, '#e8e4dc', 10); x.beginPath(); x.ellipse(540, 1090, 220, 50, 0, 0, 7); h.fs(x, '#a8b8c8', 8); } }]] });
scene('bb_gym', { sky: ['#e8eef6', '#cfd8e6'], ground: '#5a5a6a', back: [['stripes', { a: '#e8402e', b: '#e8eef6', w: 120, to: 300 }], ['custom', { fn: (x, h) => { for (let k = 0; k < 4; k++) { h.rrect(x, 80 + k * 250, 600, 160, 30, 10); h.fs(x, '#3a3346', 6); for (const sd of [0, 1]) { x.beginPath(); x.arc(80 + k * 250 + sd * 160, 615, 45, 0, 7); h.fs(x, '#2a2a36', 6); } } } }]] });
scene('bb_rink', { sky: ['#a8c8e8', '#e8f4ff'], ground: '#f4fbff', gy: 1100, back: [['mountains', { gy: 1100, col: '#c8d8f0', hh: 420 }]], front: [['bubbles', { n: 10, h: 1800 }]] });
scene('bb_carwash', { sky: ['#9ed8ff', '#e8f6ff'], ground: '#9a9aa8', back: [['stripes', { a: '#3f9bff', b: '#e8f6ff', w: 140, to: 900 }], ['custom', { fn: (x, h) => { for (const bx of [140, 940]) { h.rrect(x, bx - 70, 500, 140, 760, 70); h.fs(x, '#ff5a8a', 9); } } }], ['bubbles', { n: 14, h: 1200 }]] });
scene('bb_drain', { sky: ['#5a6a7a', '#3a4654'], ground: '#4a5460', back: [['pipes', { n: 5, y: 600, col: '#8a96a6' }], ['custom', { fn: (x) => { x.fillStyle = 'rgba(160,200,240,0.4)'; for (let i = 0; i < 5; i++) { x.fillRect(80 + i * 220, 620, 26, 640); } } }]] });
scene('bb_justice', { sky: ['#ffd8b0', '#fff2e0'], ground: '#c8bca8', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(60, 520); x.lineTo(540, 260); x.lineTo(1020, 520); x.closePath(); h.fs(x, '#f4ece0', 10); } }], ['columns', { n: 6, x0: 100, gap: 160, w: 70, y: 540, hh: 700, col: '#ffffff' }]] });
scene('bb_office', { sky: ['#e8e4dc', '#d0c8bc'], ground: '#6a5a4a', back: [['windows', { n: 2, y: 300, w: 360, hh: 420, gap: 460, x0: 80, col: '#bfe4ff' }], ['frames', { list: [[420, 820, 240, 180]] }]] });
scene('bb_bathroom', { sky: ['#e8f8ff', '#c8e8f4'], ground: '#a8c8d8', back: [['tiles', { col: 'rgba(100,160,190,0.35)' }], ['custom', { fn: (x, h) => { h.rrect(x, 640, 300, 320, 420, 30); h.fs(x, '#c8e8ff', 10); } }]] });

// ---------------- bubble effects ----------------
function soap(x, cx, cy, r, a = 1) { if (r <= 0) return; x.save(); x.globalAlpha = a; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = 'rgba(230,220,255,0.35)'; x.fill(); x.lineWidth = Math.max(3, r * 0.08); x.strokeStyle = '#ffffff'; x.stroke(); x.beginPath(); x.arc(cx - r * 0.35, cy - r * 0.35, r * 0.18, 0, 7); x.fillStyle = '#fff'; x.fill(); x.restore(); }
function foam(x, cx, cy, w, t, k = 1, gold = false) { for (let i = 0; i < 18; i++) { const u = i / 17, px = cx - w / 2 + u * w, py = cy + Math.sin(u * 9 + t * 3) * 20; soap(x, px, py - (i % 3) * 30 * k, (30 + (i % 4) * 14) * k); } if (gold) A.glow(x, cx, cy, w * 0.6, '255,220,90', 0.35 * k); }
function stream(x, x0, y0, x1, y1, t, n = 10, k = 1) { for (let i = 0; i < n; i++) { const u = ((t * 1.4 + i / n) % 1) * k; soap(x, lerp(x0, x1, u) + Math.sin(i * 3) * 30, lerp(y0, y1, u) + Math.cos(i * 2) * 30, 22 + (i % 3) * 10); } }
function dirt(x, cx, cy, s, k) { if (k >= 1) return; x.save(); x.globalAlpha = 1 - k; x.fillStyle = '#6b4a2a'; for (let i = 0; i < 9; i++) { x.beginPath(); x.ellipse(cx + Math.cos(i * 1.7) * 90 * s, cy + Math.sin(i * 2.3) * 120 * s, 40 * s, 26 * s, i, 0, 7); x.fill(); } x.restore(); }
export function awaIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { soap(x, -40, 10, 60); soap(x, 50, -30, 44); A.sparkle(x, 60, 60, 40); }
  else if (k === 2) { A.fist(x, 0, 0, 0.55); soap(x, -60, -60, 40); soap(x, 60, -50, 30); soap(x, 0, 80, 34); }
  else if (k === 3) { x.beginPath(); x.ellipse(0, 70, 150, 30, 0, 0, 7); x.fillStyle = '#c8e8ff'; x.fill(); for (let i = 0; i < 5; i++) soap(x, -100 + i * 50, 50, 22); }
  else { A.glow(x, 0, 0, 180, '255,220,90', 0.6); for (let i = 0; i < 7; i++) soap(x, Math.cos(i) * 80, Math.sin(i * 1.4) * 70, 34); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a flat lavender fruit covered in swirls', biteDesc: 'soap bubbles float out of his mouth', biteSfx: 'shimmer', bannerCol: 'pink', biteCol: '#f0ecff',
    biteFx(x, S, k) { for (let i = 0; i < 6; i++) soap(x, 620 + i * 50, 700 - k * 400 - i * 60, 24 + i * 4); },
    calmBg: 's3:bb_laundry', calmDesc: 'laundromat', seaHue: 'lavender', seed: 61, nameRe: /^Bubble-Bubble/,
    revealBg: 's3:bb_spa', revealDesc: 'bubble spa', revealBanner: 'BUBBLE-BUBBLE FRUIT', haloRgb: '210,200,255' });
  const tThat = W('type', /^that/) - 0.1, tSoap = W('type', /^soap/) - 0.1;
  add({ name: 'Soap body (bathroom tiles): bubbles pour out of the host\'s hands and shoulders', t0: tThat, t1: tSoap, bg: 's3:bb_bath',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'shimmer']],
    draw(x, S) { const h = person(x, S, 'host', 'grin', 540, 1780, 0.7, { seed: 2, pose: 'cheer' }); stream(x, h.hand.L[0], h.hand.L[1], 100, 300, S.T, 8); stream(x, h.hand.R[0], h.hand.R[1], 980, 300, S.T + 0.5, 8); } });
  stage(T, { desc: 'bubble stage', bg: 's3:bb_stage', t0: tSoap, t1: end('type'), times: [W('type', /^soap/), W('type', /^bubbles/), W('type', /^come/), W('type', /^body/)],
    labels: ['CLEAN', 'WEAKEN', 'SLIPPERY', 'GOLDEN'], bar: 'BUBBLE TRICKS', haloRgb: '210,200,255', icon: awaIcon });

  const tSec = W('power1', /^seconds/) - 0.1;
  addSplit({ name: 'Power 1 (kitchen): the farmer\'s muddy boots and a grimy pot get a blast of bubbles and come out sparkling; pink SPOTLESS banner', t0: st('power1'), t1: end('power1'), bg: 's3:bb_kitchen',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['SPOTLESS', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'shimmer'], [tSec - st('power1'), 'ding']],
    draw(x, S) { const k = prog(S.t, 0.2, S.dur - 0.2); const e = person(x, S, 'farmer', k > 0.6 ? 'grin' : 'worried', 780, 1780, 0.64, { seed: 3, pose: 'shrug', flip: true }); dirt(x, e.head[0], e.head[1] + 600, 0.9, k);
      const h = person(x, S, 'host', 'smug', 260, 1780, 0.66, { seed: 2, pose: 'punch' }); stream(x, h.hand.R[0], h.hand.R[1], e.head[0], e.head[1] + 500, S.T, 10); } },
    tSec, [[1.3, 720, 1200, 0.02], [1.38, 740, 1190, 0.035]], 'Power 1 close (same kitchen): the farmer shines, sparkles everywhere');
  const p1 = T.shots[T.shots.length - 1];
  p1.draw = function (x, S) { const e = person(x, S, 'farmer', 'grin', 760, 1780, 0.64, { seed: 3, pose: 'cheer', flip: true }); for (let i = 0; i < 5; i++) A.sparkle(x, 600 + i * 70, 1000 + (i % 2) * 300, 40 * Math.abs(Math.sin(S.T * 4 + i))); };

  const tSlip = W('power2', /^slippery/) - 0.1;
  addSplit({ name: 'Power 2 evolve (gym with weights): clean icon becomes the weaken icon; bubbles cover the farmer and he drops his dumbbell, arms limp; blue WEAKENED banner', t0: st('power2'), t1: end('power2'), bg: 's3:bb_gym',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['STRENGTH DRAINED', 'blue', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^strength/) - st('power2'), 'shimmer'], [tSlip - st('power2'), 'thunk']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, awaIcon)) return; const k = prog(S.T, W('power2', /^wash/), tSlip);
      const e = person(x, S, 'farmer', k > 0.6 ? 'sad' : 'shout', 760, 1780 + 60 * k, 0.64, { seed: 3, pose: k > 0.6 ? 'idle' : 'cheer', flip: true, sy: 1 - 0.1 * k, pop: S.t0 + 0.45 });
      for (let i = 0; i < 12; i++) soap(x, e.head[0] + Math.cos(i * 1.3 + S.T) * 150, e.head[1] + 200 + Math.sin(i * 2 + S.T) * 300, 30 * k);
      person(x, S, 'host', 'smug', 260, 1780, 0.66, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 }); if (k > 0.6) A.sweat(x, e.head[0] - 140, e.head[1] - 40, 1); } },
    tSlip, [[1.3, 720, 1100, 0.03], [1.38, 740, 1090, 0.045]], 'Power 2 slippery (same gym): the weak farmer can\'t even hold on, his hands slide right off');

  const tStand = W('power3', /^stand/) - 0.1;
  add({ name: 'Power 3 evolve (frozen lake rink): weaken icon becomes the slippery icon; the host bubbles the ground and the farmer slips, spins and lands flat; gold SLIPPERY banner', t0: st('power3'), t1: end('power3'), bg: 's3:bb_rink',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['SLIPPERY GROUND', 'gold', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^slippery/) - st('power3'), 'shimmer'], [tStand - st('power3') + 0.2, 'thunk']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, awaIcon)) return; foam(x, 540, 1790, 1100, S.T, ease.outCubic(prog(S.T, W('power3', /^slippery/), W('power3', /^slippery/) + 0.5)));
      const k = prog(S.T, tStand - 0.4, tStand + 0.3); person(x, S, 'farmer', k > 0.5 ? 'hit' : 'shock', 760 + 80 * k, 1780, 0.62, { seed: 3, pose: 'cheer', flip: true, rot: k * 1.5, pop: S.t0 + 0.45 });
      person(x, S, 'host', 'grin', 260, 1780, 0.64, { seed: 2, pose: 'shrug', pop: S.t0 + 0.45 }); if (k >= 1 && S.T < tStand + 0.3 + 7 * F) S.shake = 0.7; } });

  const tWave = W('peak', /^wave/) - 0.1;
  addSplit({ name: 'Peak (car wash): slippery icon gives way to the golden icon, gold halo; gold GOLDEN AWA banner; a towering wave of golden bubbles rises behind the host', t0: st('peak'), t1: end('peak'), bg: 's3:bb_carwash',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['GOLDEN AWA', 'gold', W('peak', /^Golden/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Golden/) - st('peak'), 'charge'], [tWave - st('peak'), 'splash']],
    draw(x, S) { halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, awaIcon); return; }
      const k = ease.outBack(prog(S.T, W('peak', /^Golden/), tWave + 0.3)); for (let r = 0; r < 4; r++) foam(x, 540, 1400 - r * 220 * k, 1200, S.T + r, k, true);
      person(x, S, 'host', 'shout', 540, 1780, 0.7, { seed: 7, pose: 'cheer' }); if (S.T > W('peak', /^Golden/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Golden/), W('peak', /^Golden/) + 0.3))); S.flashCol = '255,246,200'; } } },
    tWave, [[1.0, 540, 1000, -0.02], [1.06, 560, 990, -0.04]], 'Peak crash (same car wash): the golden wave crashes over the farmer; impact star, shake');
  const pk = T.shots[T.shots.length - 1];
  pk.draw = function (x, S) { const u = ease.outCubic(prog(S.T, tWave, tWave + 0.7)); const e = person(x, S, 'farmer', u > 0.5 ? 'hit' : 'shock', 780, 1780, 0.62, { seed: 3, pose: 'cheer', flip: true }); foam(x, lerp(-200, 600, u), 1500, 1300, S.T, 1.3, true); foam(x, lerp(-300, 500, u), 1200, 1300, S.T + 1, 1.1, true);
    if (u > 0.5) { A.impactStar(x, e.head[0], e.head[1] + 150, 150 * (1 - prog(S.T, tWave + 0.5, tWave + 0.9)), 0.3); if (S.T < tWave + 0.35 + 7 * F) S.shake = 0.9; } };

  add({ name: 'Twist (drain room with pipes): bubbles circle down a drain; push-in with roll, low sting; red CATCH banner', t0: st('twist'), t1: end('twist'), bg: 's3:bb_drain', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['THE CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.3, 'splash']],
    draw(x, S) { x.beginPath(); x.ellipse(540, 1500, 180, 50, 0, 0, 7); A.fs(x, '#2a2a36', 8); for (let i = 0; i < 8; i++) { const a = i + S.T * 3, r = 160 - ((S.T * 60 + i * 20) % 150); soap(x, 540 + Math.cos(a) * r, 1500 + Math.sin(a) * r * 0.3, 18); } } });
  add({ name: 'Strength back (same drain room, wide): the bubbles rinse away and the farmer flexes, strong again; green STRENGTH BACK banner', t0: st('truth'), t1: end('truth'), bg: 's3:bb_drain',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['STRENGTH BACK', 'green', W('truth', /^strength/) - 0.1, end('truth')]], sfx: [[0.2, 'splash'], [W('truth', /^strength/) - st('truth'), 'levelup']],
    draw(x, S) { const k = prog(S.T, W('truth', /^wash/), W('truth', /^strength/)); for (let i = 0; i < 10; i++) soap(x, 540 + Math.cos(i * 1.7) * 200, 900 + i * 60 + k * 400, 30, 1 - k); const e = person(x, S, 'farmer', k > 0.8 ? 'grin' : 'sad', 540, 1780, 0.7, { seed: 3, pose: k > 0.8 ? 'cheer' : 'idle' }); if (k > 0.8) A.shineLines(x, e.head[0], e.head[1] + 300, 260, 400, S.T, 10); } });

  const tNami = W('users', /^against/) - 0.1;
  add({ name: 'Kalifa (Enies Lobby courthouse): Kalifa in her suit, a stream of bubbles curling off her hand; blue CP9 banner', t0: st('users'), t1: tNami, bg: 's3:bb_justice',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['KALIFA, CP9', 'blue', st('users') + 0.2, tNami]], sfx: [[0, 'whoosh'], [0.4, 'shimmer']],
    draw(x, S) { const k = person(x, S, 'kalifa', 'smug', 540, 1820, 0.84, { pop: S.t0 + 0.05, seed: 8, pose: 'holdUp' }); stream(x, k.hand.R[0], k.hand.R[1] - 30, k.hand.R[0] + 200, k.hand.R[1] - 500, S.T, 8); } });
  add({ name: 'Versus Nami (secretary office): Nami swings her Clima-Tact through the bubbles; red VS NAMI banner', t0: tNami, t1: end('users'), bg: 's3:bb_office',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['VS NAMI', 'red', tNami + 0.2, end('users')]], sfx: [[0.2, 'zap'], [0.5, 'impact']],
    draw(x, S) { person(x, S, 'kalifa', 'shout', 780, 1800, 0.66, { seed: 8, pose: 'punch', flip: true }); const n = person(x, S, 'nami', 'shout', 280, 1800, 0.66, { seed: 4, pose: 'raise' }); for (let i = 0; i < 6; i++) soap(x, 540 + Math.cos(i * 2 + S.T) * 120, 1100 + Math.sin(i + S.T) * 200, 34); A.impactStar(x, 540, 1000, 110 * Math.abs(Math.sin(S.T * 4)), 0.3); } });

  add({ name: 'Joke (bathroom): the host steps out of a cloud of his own bubbles, already sparkling clean; pink NO BATH banner', t0: st('joke'), t1: end('joke'), bg: 's3:bb_bathroom',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO BATH NEEDED', 'pink', W('joke', /^bath/) - 0.1, end('joke')]], sfx: [[0.2, 'shimmer'], [W('joke', /^bath/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { person(x, S, 'host', 'smug', 540, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug', talk: true }); for (let i = 0; i < 10; i++) soap(x, 540 + Math.cos(i * 1.3) * 320, 1300 + Math.sin(i * 2.1) * 400 - S.t * 80, 36, 1 - prog(S.t, 0.5, 1.5)); A.sparkle(x, 400, 900, 40 * Math.abs(Math.sin(S.T * 5))); A.sparkle(x, 700, 1000, 34 * Math.abs(Math.sin(S.T * 4 + 1))); } });

  ending(T, { TL, fruit });
  return finish();
}
