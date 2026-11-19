// Shot plan for the Doru Doru no Mi (Wax-Wax Fruit) short. Structure: wax weapons, wax traps, wax armour, Candle Service Set as the peak.
import * as A from '/engine/art.js';
import { drawDoru } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawDoru(x, cx, cy, R * 0.9, rot, o);
const WAX = '#f4f0e6', WAXD = '#d8d0c0';

export const SETS = ['s3:wx_candleshop', 'rays:lavender', 's3:wx_chapel', 's3:wx_studio', 's3:wx_stage', 's3:wx_forge', 's3:wx_jungle', 's3:wx_dino', 's3:wx_cake', 's3:wx_dark', 's3:wx_volcano', 's3:wx_beach', 's3:wx_dinner'];
scene('wx_candleshop', { sky: ['#ffe8c8', '#f2d0a8'], ground: '#a26d45', back: [['shelves', { rows: 3, y: 200, cols: ['#f4f0e6', '#ff9ccf', '#a8d8ff', '#ffe680'] }]] });
scene('wx_chapel', { sky: ['#2a2040', '#14101f'], ground: '#3a2a3a', back: [['custom', { fn: (x, h) => { for (let i = 0; i < 9; i++) { const cx = 60 + i * 120, ch = 160 + h.hash(i) * 200; h.rrect(x, cx - 20, 1240 - ch, 40, ch, 8); h.fs(x, '#f4f0e6', 5); x.fillStyle = 'rgba(255,190,90,0.35)'; x.beginPath(); x.arc(cx, 1220 - ch, 60, 0, 7); x.fill(); x.fillStyle = '#ffcf3a'; x.beginPath(); x.ellipse(cx, 1225 - ch, 10, 20, 0, 0, 7); x.fill(); } } }]] });
scene('wx_studio', { sky: ['#f4f4f8', '#e0e0ea'], ground: '#c8c0b0', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 3; k++) { h.rrect(x, 100 + k * 320, 600, 160, 60, 10); h.fs(x, '#a89a88', 6); h.rrect(x, 140 + k * 320, 300, 80, 300, 30); h.fs(x, '#f4f0e6', 7); } } }]] });
scene('wx_stage', { sky: ['#3a2a5a', '#241838'], ground: '#5a4a6a', gy: 1250, back: [['custom', { fn: (x) => { for (let i = 0; i < 12; i++) { x.fillStyle = 'rgba(255,255,255,0.75)'; x.beginPath(); x.ellipse(60 + i * 90, 160 + (i % 3) * 40, 14, 60, 0, 0, 7); x.fill(); } } }]] });
scene('wx_forge', { sky: ['#3a2a2a', '#1f1414'], ground: '#2a2020', back: [['custom', { fn: (x) => { const g = x.createRadialGradient(540, 800, 40, 540, 800, 600); g.addColorStop(0, 'rgba(255,170,80,0.5)'); g.addColorStop(1, 'rgba(255,90,20,0)'); x.fillStyle = g; x.fillRect(-80, -140, 1240, 2200); } }]] });
scene('wx_jungle', { sky: ['#9ad8a0', '#5aa86a'], ground: '#4a7a3a', back: [['trees', { n: 4, x0: 40, gap: 330, leaf: '#3f8a2a', trunk: '#5a3a26', th: 700, r: 200 }]] });
scene('wx_dino', { sky: ['#ffcf8a', '#ffe9c8'], ground: '#c9a060', gy: 1150, back: [['sun', { x: 300, y: 300, r: 90, col: '255,230,170' }], ['mountains', { gy: 1150, col: '#c8805a', hh: 420 }]] });
scene('wx_cake', { sky: ['#ffd8e8', '#ffc0d8'], ground: '#c99b6d', back: [['confetti', { n: 40 }]] });
scene('wx_dark', { sky: ['#1a1a2a', '#0a0a14'], ground: '#1a1420', back: [['fog', { col: 'rgba(120,110,140,0.2)' }]] });
scene('wx_volcano', { sky: ['#ff7a3a', '#5a1a2a'], ground: '#2a1a20', gy: 1250, back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(-h.OX, 1250); x.lineTo(360, 520); x.lineTo(720, 520); x.lineTo(h.BW, 1250); x.closePath(); h.fs(x, '#3a2430', 10); } }]] });
scene('wx_beach', { sky: ['#7fd8ff', '#c8f4ff'], ground: '#f8e2b0', gy: 1150, back: [['water', { y: 900, hh: 250, col: '#3fb8d8' }], ['sun', { x: 840, y: 250 }]] });
scene('wx_dinner', { sky: ['#5a2a3a', '#3a1a24'], ground: '#4a2a20', back: [['custom', { fn: (x, h) => { h.rrect(x, 80, 1000, 920, 60, 10); h.fs(x, '#f4ead2', 8); for (let i = 0; i < 5; i++) { const cx = 180 + i * 180; h.rrect(x, cx - 14, 860, 28, 140, 6); h.fs(x, '#f4f0e6', 5); x.fillStyle = 'rgba(255,190,90,0.4)'; x.beginPath(); x.arc(cx, 840, 70, 0, 7); x.fill(); x.fillStyle = '#ffcf3a'; x.beginPath(); x.ellipse(cx, 845, 10, 20, 0, 0, 7); x.fill(); } } }]] });

// ---------------- wax effects ----------------
function drip(x, cx, cy, w, h, k) { if (k <= 0) return; x.beginPath(); x.moveTo(cx - w / 2, cy); x.lineTo(cx + w / 2, cy); for (let i = 0; i <= 6; i++) { const px = cx + w / 2 - i * w / 6, l = h * k * (0.4 + 0.6 * ((i * 37) % 10) / 10); x.lineTo(px, cy + l); x.quadraticCurveTo(px - w / 24, cy + l + 16, px - w / 12, cy + l); } x.closePath(); A.fs(x, WAX, 6); }
function waxBlock(x, cx, by, w, h, k) { if (k <= 0) return; A.rrect(x, cx - w / 2, by - h * k, w, h * k, 20); A.fs(x, WAX, 8); drip(x, cx, by - h * k, w, 60, 1); }
function waxSword(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.rrect(x, -140, -16, 100, 32, 8); A.fs(x, WAXD, 6); x.beginPath(); x.moveTo(-40, -24); x.lineTo(320, 0); x.lineTo(-40, 24); x.closePath(); A.fs(x, WAX, 7); x.restore(); }
function candleCake(x, cx, by, s, t, k) { x.save(); x.translate(cx, by); x.scale(s, s); A.rrect(x, -300, -200, 600, 200, 30); A.fs(x, WAX, 10); A.rrect(x, -220, -360, 440, 170, 30); A.fs(x, WAX, 10); drip(x, 0, -360, 440, 80, 1);
  for (const cx2 of [-120, 0, 120]) { A.rrect(x, cx2 - 16, -500, 32, 140, 8); A.fs(x, '#ff9ccf', 6); A.flame(x, cx2, -500, 32, 70, t, cx2); }
  x.save(); x.translate(0, -360); x.rotate(t * 2); for (let i = 0; i < 6; i++) { x.rotate(Math.PI / 3); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(0, -6, 260 * k, 12); } x.restore(); x.restore(); }
export function waxIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) waxSword(x, -80, 0, 0.6, -0.5);
  else if (k === 2) { waxBlock(x, 0, 120, 200, 120, 1); for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(sd * 50, 30, 30, 18, 0, 0, 7); A.fs(x, '#6b4630', 5); } }
  else if (k === 3) { A.rrect(x, -90, -130, 180, 260, 40); A.fs(x, WAX, 8); A.rrect(x, -40, -90, 80, 50, 14); A.fs(x, '#3a2a20', 5); }
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); candleCake(x, 0, 130, 0.28, t, 1); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a white fruit dripping like candle wax', biteDesc: 'his fingers come out coated in hard white wax', biteSfx: 'thunk', bannerCol: 'gold', biteCol: '#fffaf0',
    biteFx(x, S, k, h) { x.beginPath(); x.arc(h.hand.L[0], h.hand.L[1], 50 * ease.outBack(k), 0, 7); A.fs(x, WAX, 7); },
    calmBg: 's3:wx_candleshop', calmDesc: 'candle shop', seaHue: 'lavender', seed: 73, nameRe: /^Wax-Wax/,
    revealBg: 's3:wx_chapel', revealDesc: 'candle-lit room', revealBanner: 'WAX-WAX FRUIT', haloRgb: '255,230,180' });
  const tThat = W('type', /^that/) - 0.1, tHard = W('type', /^hard/) - 0.1;
  add({ name: 'Wax (sculptor\'s studio): wax pours from the host\'s hands and sets into a block, then he taps it — clang, hard as steel', t0: tThat, t1: tHard, bg: 's3:wx_studio',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'splash'], [0.7, 'ding']],
    draw(x, S) { person(x, S, 'host', 'grin', 300, 1780, 0.68, { seed: 2, pose: 'punch' }); waxBlock(x, 780, 1780, 300, 500, ease.outCubic(prog(S.t, 0.1, 0.7))); if (S.t > 0.7) A.sparkle(x, 780, 1400, 40 * (1 - prog(S.t, 0.7, 1.2))); } });
  stage(T, { desc: 'stage with wax drips', bg: 's3:wx_stage', t0: tHard, t1: end('type'), times: [W('type', /^hard/), W('type', /^as$/), W('type', /^steel/), W('type', /^steel/) + 0.3],
    labels: ['WEAPONS', 'TRAP', 'ARMOR', 'CANDLE SET'], bar: 'WAX TRICKS', haloRgb: '255,230,180', icon: waxIcon });

  const tShield = W('power1', /^shields/) - 0.1;
  addSplit({ name: 'Power 1 (forge): wax shapes into a wall, a sword and a shield in the host\'s hands; gold WAX WEAPONS banner', t0: st('power1'), t1: end('power1'), bg: 's3:wx_forge',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['WAX WEAPONS', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^walls/) - st('power1'), 'thunk'], [W('power1', /^swords/) - st('power1'), 'slash']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 400, 1780, 0.68, { seed: 2, pose: 'punch' }); waxBlock(x, 880, 1780, 200, 700, ease.outCubic(prog(S.T, W('power1', /^walls/), W('power1', /^walls/) + 0.4))); if (S.T > W('power1', /^swords/)) waxSword(x, h.hand.R[0] + 40, h.hand.R[1], 0.9 * pop(S.T, W('power1', /^swords/)), -0.3); } },
    tShield, [[1.3, 520, 1200, 0.02], [1.38, 540, 1190, 0.035]], 'Power 1 shield (same forge): a round wax shield blocks a hammer swing, clang');
  const p1 = T.shots[T.shots.length - 1]; p1.draw = function (x, S) { person(x, S, 'mechanic', 'shout', 780, 1780, 0.62, { seed: 3, pose: 'punch', flip: true }); const h = person(x, S, 'host', 'smug', 360, 1780, 0.66, { seed: 2, pose: 'holdUp' }); x.beginPath(); x.arc(h.hand.R[0] + 60, h.hand.R[1] + 40, 130, 0, 7); A.fs(x, WAX, 10); if (S.T > tShield + 0.3) A.impactStar(x, 620, h.hand.R[1] + 40, 120 * (1 - prog(S.T, tShield + 0.5, tShield + 0.9)), 0.3); };

  const tMove = W('power2', /^move/) - 0.1;
  add({ name: 'Power 2 evolve (jungle): weapons icon becomes the trap icon; wax splashes on the mechanic\'s boots and sets hard, he can\'t pull his feet up; blue STUCK banner', t0: st('power2'), t1: end('power2'), bg: 's3:wx_jungle',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['STUCK IN WAX', 'blue', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^feet/) - st('power2'), 'splash'], [tMove - st('power2'), 'thunk']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, waxIcon)) return; const k = ease.outCubic(prog(S.T, W('power2', /^feet/), W('power2', /^feet/) + 0.4)); const e = person(x, S, 'mechanic', k > 0.5 ? 'worried' : 'calm', 760, 1780, 0.64, { seed: 3, pose: k > 0.5 ? 'cheer' : 'idle', flip: true, rot: k > 0.5 ? Math.sin(S.T * 10) * 0.04 : 0, pop: S.t0 + 0.45 });
      waxBlock(x, 760, 1790, 280, 200, k); person(x, S, 'host', 'grin', 280, 1780, 0.66, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 }); if (k > 0.5) A.mark(x, '!?', e.head[0] + 140, e.head[1] - 200, pop(S.T, W('power2', /^feet/) + 0.4)); } });

  const tSuit = W('power3', /^suit/) - 0.1;
  addSplit({ name: 'Power 3 evolve (Little Garden dinosaur plains): trap icon becomes the armour icon; wax builds up into a giant wax suit with the host inside a window; purple WAX ARMOR banner', t0: st('power3'), t1: end('power3'), bg: 's3:wx_dino',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['WAX ARMOR', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [tSuit - st('power3'), 'charge']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, waxIcon)) return; const k = ease.outBack(prog(S.t, 0.5, 1.4)) * 0.72; x.save(); x.translate(540, 1780); x.scale(k, k);
      A.rrect(x, -300, -1300, 600, 900, 160); A.fs(x, WAX, 12); for (const sd of [-1, 1]) { A.rrect(x, sd * 160 - 80, -420, 160, 420, 50); A.fs(x, WAX, 10); A.rrect(x, sd * 380 - 70, -1200, 140, 600, 60); A.fs(x, WAX, 10); }
      x.beginPath(); x.arc(0, -1420, 170, 0, 7); A.fs(x, WAX, 12); drip(x, 0, -1300, 600, 120, 1); A.rrect(x, -110, -1020, 220, 200, 30); A.fs(x, '#3a2a20', 8); x.restore();
      if (k > 0.6) { const wy = 1780 - 1020 * k, wh = 200 * k; x.save(); A.rrect(x, 540 - 110 * k, wy, 220 * k, wh, 30 * k); x.clip(); person(x, S, 'host', 'grin', 540, wy + wh + 20, 0.16, { seed: 2, pose: 'cheer' }); x.restore(); } } },
    tSuit + 0.6, [[1.25, 540, 1050, -0.02], [1.32, 540, 1040, -0.035]], 'Power 3 close (same plains): the host waves from inside the wax suit\'s window');

  const tStat = W('peak', /^statues/) - 0.1;
  addSplit({ name: 'Peak (party room): armour icon gives way to the candle-cake icon, gold halo; gold CANDLE SERVICE SET banner; a giant wax cake with a spinning top sprays wax mist', t0: st('peak'), t1: end('peak'), bg: 's3:wx_cake',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['CANDLE SERVICE SET', 'gold', W('peak', /^Candle/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Candle/) - st('peak'), 'charge'], [W('peak', /^cake/) - st('peak'), 'whoosh']],
    draw(x, S) { halo(x, 540, 900, 620, '255,215,90', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, waxIcon); return; }
      candleCake(x, 540, 1780, 1.1 * ease.outBack(prog(S.T, W('peak', /^Candle/), W('peak', /^cake/))), S.T, prog(S.T, W('peak', /^cake/), tStat));
      if (S.T > W('peak', /^Candle/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Candle/), W('peak', /^Candle/) + 0.3))); S.flashCol = '255,246,200'; } } },
    tStat, [[1.0, 540, 1000, -0.02], [1.06, 560, 990, -0.04]], 'Peak statues (same room): the mechanic and the farmer slowly turn into white wax statues on the cake');
  const pk = T.shots[T.shots.length - 1]; pk.draw = function (x, S) { candleCake(x, 540, 1780, 1.0, S.T, 1); const k = prog(S.T, tStat, end('peak')); for (const [who, cx] of [['mechanic', 380], ['farmer', 700]]) { person(x, S, who, 'worried', cx, 1420, 0.36, { seed: cx, pose: 'cheer' }); x.save(); x.globalAlpha = k; x.beginPath(); x.rect(cx - 160, 1420 - 640 * k, 320, 640 * k); x.fillStyle = WAX; x.fill(); x.restore(); } };

  add({ name: 'Twist (dark room): a single wax figure in the dark, a match strikes; push-in with roll, low sting; red WEAKNESS banner', t0: st('twist'), t1: end('twist'), bg: 's3:wx_dark', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['BIG WEAKNESS', 'red', W('twist', /^weakness/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.6, 'whoosh']],
    draw(x, S) { waxBlock(x, 540, 1780, 260, 600, 1); A.flame(x, 700, 1100, 40, 90 * prog(S.t, 0.5, 0.8), S.T, 3); } });
  add({ name: 'Melts (erupting volcano): fire hits the wax wall and it slumps into a puddle; red MELTS banner', t0: st('truth'), t1: end('truth'), bg: 's3:wx_volcano',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['FIRE MELTS IT', 'red', W('truth', /^melts/) - 0.1, end('truth')]], sfx: [[0.1, 'whoosh'], [0.6, 'splash']],
    draw(x, S) { const k = prog(S.t, 0.2, S.dur); waxBlock(x, 540, 1780, 420 + 300 * k, 700 * (1 - k * 0.85), 1); for (let i = 0; i < 6; i++) A.flame(x, 380 + i * 60, 1780 - 700 * (1 - k * 0.85), 60, 160, S.T, i); } });

  const tUsopp = W('users', /^until/) - 0.1;
  add({ name: 'Mr. 3 (sunny beach): Mr. 3 with his 3-shaped hair, sipping tea; red MR. 3 banner', t0: st('users'), t1: tUsopp, bg: 's3:wx_beach',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['MR. 3', 'red', st('users') + 0.2, tUsopp]], sfx: [[0, 'whoosh']],
    draw(x, S) { const m = person(x, S, 'mr3', 'grin', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'sip' }); A.mug(x, m.hand.R[0] + 16, m.hand.R[1] - 8, 0.9, S.T, true, false); } });
  add({ name: 'Usopp lights it (same beach): Usopp fires a flaming pellet and Mr. 3\'s wax goes up in flames; he panics; orange FIRE banner', t0: tUsopp, t1: end('users'), bg: 's3:wx_beach',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['FIRE!', 'red', tUsopp + 0.3, end('users')]], sfx: [[0.2, 'whoosh'], [0.5, 'shock']],
    draw(x, S) { person(x, S, 'usopp', 'shout', 260, 1820, 0.66, { seed: 4, pose: 'punch' }); const m = person(x, S, 'mr3', S.t > 0.5 ? 'shock' : 'grin', 780, 1820, 0.66, { seed: 8, pose: 'cheer', flip: true }); if (S.t > 0.5) for (let i = 0; i < 4; i++) A.flame(x, m.head[0] - 90 + i * 60, m.head[1] - 120, 50, 140, S.T, i); } });

  add({ name: 'Joke (candle-lit dinner table): a whole row of candles grows out of the host\'s fingertips; gold FREE CANDLES banner', t0: st('joke'), t1: end('joke'), bg: 's3:wx_dinner',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['FREE CANDLES', 'gold', W('joke', /^candles/) - 0.1, end('joke')]], sfx: [[0.3, 'pop'], [W('joke', /^candles/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 540, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'cheer', talk: true }); for (const k of ['L', 'R']) { A.rrect(x, h.hand[k][0] - 12, h.hand[k][1] - 100, 24, 90, 6); A.fs(x, WAX, 5); A.flame(x, h.hand[k][0], h.hand[k][1] - 100, 26, 60, S.T, k === 'L' ? 1 : 2); } } });

  ending(T, { TL, fruit });
  return finish();
}
