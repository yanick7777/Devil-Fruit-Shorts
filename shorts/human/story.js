// Shot plan for the Hito Hito no Mi (Human-Human Fruit) short. Structure: talking reindeer, small/big forms, Rumble Ball forms, Monster Point as the peak.
import * as A from '/engine/art.js';
import { drawHito } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawHito(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:hu_snowfield', 'rays:teal', 's3:hu_castle', 's3:hu_pines', 's3:hu_clinic', 's3:hu_village', 's3:hu_gym', 's3:hu_pharmacy', 's3:hu_tower', 's3:hu_blizzard', 's3:hu_wreck', 's3:hu_sickbay', 's3:hu_zoo'];
const snow = ['custom', { fn: (x, h) => { x.fillStyle = 'rgba(255,255,255,0.85)'; for (let i = 0; i < 60; i++) { x.beginPath(); x.arc(h.hash(i + 5) * 1080, h.hash(i + 6) * 1300, 4 + h.hash(i) * 6, 0, 7); x.fill(); } } }];
scene('hu_snowfield', { sky: ['#b8d8f0', '#e8f4ff'], ground: '#f4f8ff', back: [['mountains', { gy: 1250, col: '#d8e4f4', hh: 600 }], snow] });
scene('hu_castle', { sky: ['#3a4a7a', '#7a8ab8'], back: [['custom', { fn: (x, h) => { h.rrect(x, 240, 600, 600, 700, 10); h.fs(x, '#e8eef8', 10); for (const tx of [240, 780]) { h.rrect(x, tx - 40, 400, 140, 900, 10); h.fs(x, '#d8e0f0', 10); x.beginPath(); x.moveTo(tx - 60, 400); x.lineTo(tx + 30, 260); x.lineTo(tx + 120, 400); x.closePath(); h.fs(x, '#e8402e', 9); } } }], snow] });
scene('hu_pines', { sky: ['#c8e0f0', '#f0f8ff'], ground: '#f4f8ff', back: [['custom', { fn: (x, h) => { for (let i = 0; i < 6; i++) { const tx = 40 + i * 200, ty = 500 + (i % 2) * 120; x.beginPath(); x.moveTo(tx, ty); x.lineTo(tx + 120, ty + 650); x.lineTo(tx - 120, ty + 650); x.closePath(); h.fs(x, '#3a7a5a', 9); x.beginPath(); x.moveTo(tx, ty); x.lineTo(tx + 50, ty + 200); x.lineTo(tx - 50, ty + 200); x.closePath(); h.fs(x, '#ffffff', 6); } } }], snow] });
scene('hu_clinic', { sky: ['#e8f8f4', '#d0ece8'], ground: '#b8d0cc', back: [['tiles', { col: 'rgba(60,120,110,0.15)' }], ['custom', { fn: (x, h) => { h.rrect(x, 440, 220, 200, 200, 20); h.fs(x, '#ffffff', 8); x.fillStyle = '#e8402e'; x.fillRect(520, 250, 40, 140); x.fillRect(470, 300, 140, 40); } }]] });
scene('hu_village', { sky: ['#ffe0c0', '#fff4e4'], ground: '#f4f8ff', back: [['houses', { cols: ['#8a5a3c', '#a07050', '#6b4630'], roof: '#ffffff', win: '#ffe070', seed: 91 }], snow] });
scene('hu_gym', { sky: ['#f0e0c8', '#e0c8a8'], ground: '#a07850', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 3; k++) { h.rrect(x, 100 + k * 320, 900, 200, 30, 10); h.fs(x, '#6a6a7a', 6); for (const sd of [0, 170]) { x.beginPath(); x.arc(110 + k * 320 + sd, 915, 50, 0, 7); h.fs(x, '#3a3346', 7); } } } }], ['stripes', { a: 'rgba(255,255,255,0.08)', b: 'rgba(0,0,0,0)', w: 120 }]] });
scene('hu_pharmacy', { sky: ['#f4f0e0', '#e8e0c8'], ground: '#8a6a4a', back: [['shelves', { rows: 3, y: 240, cols: ['#f4d030', '#ffffff', '#e8402e', '#7cc8ff'] }]] });
scene('hu_tower', { sky: ['#1a1a3a', '#3a2a5a'], ground: '#4a4a5a', back: [['moon', { x: 800, y: 260, r: 120 }], ['custom', { fn: (x, h) => { h.rrect(x, 380, 300, 320, 1000, 10); h.fs(x, '#5a5a6a', 10); for (let r = 0; r < 5; r++) { h.rrect(x, 440, 380 + r * 170, 70, 100, 6); h.fs(x, '#ffd070', 6); h.rrect(x, 570, 380 + r * 170, 70, 100, 6); h.fs(x, '#ffd070', 6); } } }]] });
scene('hu_blizzard', { sky: ['#8aa0b8', '#c8d4e0'], ground: '#e8eef4', back: [['fog', { n: 10, col: 'rgba(255,255,255,0.35)' }], snow] });
scene('hu_wreck', { sky: ['#5a4a5a', '#8a6a6a'], ground: '#6a5a4a', back: [['crates', { list: [[60, 1100, 160], [240, 1120, 120], [880, 1080, 180], [760, 1140, 110]] }], ['custom', { fn: (x, h) => { x.save(); x.translate(540, 900); x.rotate(0.4); h.rrect(x, -20, -500, 40, 600, 8); h.fs(x, '#6b4630', 8); x.restore(); } }]] });
scene('hu_sickbay', { sky: ['#e8f4ff', '#d0e4f4'], ground: '#c99b6d', back: [['windows', { n: 2, x0: 120, gap: 560 }], ['custom', { fn: (x, h) => { h.rrect(x, 640, 1000, 360, 120, 16); h.fs(x, '#ffffff', 8); h.rrect(x, 620, 1100, 400, 40, 10); h.fs(x, '#8a5a3a', 6); } }]] });
scene('hu_zoo', { sky: ['#c8f0c8', '#f0fff0'], ground: '#9ad86a', back: [['custom', { fn: (x, h) => { x.strokeStyle = '#6a6a7a'; x.lineWidth = 12; for (let k = 0; k < 12; k++) { x.beginPath(); x.moveTo(k * 100, 700); x.lineTo(k * 100, 1250); x.stroke(); } x.beginPath(); x.moveTo(-40, 700); x.lineTo(1120, 700); x.stroke(); } }], ['sign', { text: 'RACCOONS', bg: '#ffffff', y: 520, w: 460, x: 310 }], ['trees', { n: 2, x0: 100, gap: 860, leaf: '#4aa04a' }]] });

// ---------------- reindeer bits ----------------
export function reindeer(x, cx, fy, s, t, o = {}) { x.save(); x.translate(cx, fy); x.scale(o.flip ? -s : s, s); const b = Math.abs(Math.sin(t * 6)) * (o.walk ? 12 : 0);
  for (const lx of [-90, -50, 60, 100]) { A.rrect(x, lx - 12, -200 - b, 24, 200 + b, 10); A.fs(x, '#a8723a', 7); }
  x.beginPath(); x.ellipse(0, -240 - b, 150, 80, 0, 0, 7); A.fs(x, '#c8884a', 10); x.beginPath(); x.moveTo(110, -260 - b); x.lineTo(150, -380 - b); x.lineTo(200, -360 - b); x.lineTo(170, -240 - b); x.closePath(); A.fs(x, '#c8884a', 9);
  x.beginPath(); x.ellipse(200, -400 - b, 70, 50, 0.3, 0, 7); A.fs(x, '#c8884a', 9); x.beginPath(); x.arc(262, -380 - b, 18, 0, 7); A.fs(x, '#3f6fd8', 5); x.beginPath(); x.arc(200, -420 - b, 9, 0, 7); x.fillStyle = A.OL; x.fill();
  x.lineCap = 'round'; x.lineWidth = 12; x.strokeStyle = '#6b4630'; x.beginPath(); x.moveTo(180, -440 - b); x.lineTo(150, -540 - b); x.moveTo(165, -490 - b); x.lineTo(120, -510 - b); x.moveTo(210, -440 - b); x.lineTo(230, -540 - b); x.stroke(); x.restore(); }
export function rumbleBall(x, cx, cy, s) { x.beginPath(); x.arc(cx, cy, 30 * s, 0, 7); A.fs(x, '#f4d030', 6 * s); x.beginPath(); x.ellipse(cx, cy, 30 * s, 10 * s, 0, 0, 7); x.lineWidth = 5 * s; x.strokeStyle = A.OL; x.stroke(); }
function speech(x, cx, cy, text) { A.rrect(x, cx - 150, cy - 60, 300, 110, 30); A.fs(x, '#ffffff', 7); x.beginPath(); x.moveTo(cx - 30, cy + 48); x.lineTo(cx - 60, cy + 100); x.lineTo(cx + 10, cy + 48); A.fs(x, '#ffffff', 0); x.font = '56px "Lilita One"'; x.fillStyle = A.OL; x.textAlign = 'center'; x.fillText(text, cx, cy + 18); }
export function hitoIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { reindeer(x, -40, 160, 0.5, t); speech(x, 40, -100, 'HI!'); }
  else if (k === 2) { A.mark(x, '!', -60, -120, 0.8); A.mark(x, '?', 60, -120, 0.8); reindeer(x, 0, 160, 0.4, t); }
  else if (k === 3) rumbleBall(x, 0, 0, 3.2);
  else { A.glow(x, 0, 0, 200, '255,120,60', 0.6); A.impactStar(x, 0, 0, 120, t); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a red mushroom-shaped fruit', biteDesc: 'the host suddenly talks extra clearly', biteSfx: 'shimmer', bannerCol: 'red', biteCol: '#e0303a',
    calmBg: 's3:hu_snowfield', calmDesc: 'snowy field', seaHue: 'teal', seed: 67, nameRe: /^Human-Human/,
    revealBg: 's3:hu_castle', revealDesc: 'snowy castle on Drum Island', revealBanner: 'HUMAN-HUMAN FRUIT', haloRgb: '255,170,150' });
  const tAnimal = W('type', /^animal/) - 0.1, tHuman = W('type', /^human/) - 0.1;
  add({ name: 'Animal to human (snowy pines): a plain reindeer stands up on two legs and becomes little Chopper', t0: tAnimal, t1: tHuman, bg: 's3:hu_pines',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'whoosh'], [0.4, 'pop']],
    draw(x, S) { const k = prog(S.t, 0.2, 0.5); if (k < 1) reindeer(x, 420, 1780, 0.9, S.T, {}); if (k > 0) { A.glowRing(x, 540, 1500, 300 * k, 1 - k); } if (k >= 1) person(x, S, 'chopper', 'grin', 540, 1780, 0.9, { seed: 2, pose: 'cheer' }); } });
  stage(T, { desc: 'little doctor\'s clinic', bg: 's3:hu_clinic', t0: tHuman, t1: end('type'), times: [W('type', /^human/), W('type', /^human/) + 0.2, W('type', /^human/) + 0.4, W('type', /^human/) + 0.6],
    labels: ['TALK', 'SIZE', 'BALL', 'MONSTER'], bar: 'HUMAN POWERS', haloRgb: '255,170,150', icon: hitoIcon });

  const tWalk = W('power1', /^walk/) - 0.1;
  addSplit({ name: 'Power 1 (snowy village): a little reindeer looks up at a villager and says HELLO in a speech bubble; the villager drops his mug; gold IT TALKS banner', t0: st('power1'), t1: end('power1'), bg: 's3:hu_village',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['IT TALKS!', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^talk/) - st('power1'), 'pop']],
    draw(x, S) { reindeer(x, 280, 1640, 1.15, S.T); const tt = W('power1', /^talk/); if (S.T > tt) speech(x, 380, 1150, 'HELLO!'); const v = person(x, S, 'lumberjack', S.T > tt ? 'shock' : 'calm', 820, 1780, 0.62, { seed: 3, pose: 'shrug', flip: true }); if (S.T > tt) A.mark(x, '!?', v.head[0] - 100, v.head[1] - 180, pop(S.T, tt + 0.1)); } },
    tWalk, [[1.0, 540, 1000, 0.02], [1.06, 540, 990, 0.035]], 'Power 1 walk (same village): Chopper strolls past on two legs in his pink hat, waving');
  const p1 = T.shots[T.shots.length - 1]; p1.draw = function (x, S) { person(x, S, 'chopper', 'grin', lerp(200, 700, prog(S.T, S.t0, S.t0 + 2)), 1780, 0.8, { seed: 2, pose: Math.sin(S.T * 6) > 0 ? 'cheer' : 'idle' }); person(x, S, 'lumberjack', 'shock', 900, 1780, 0.58, { seed: 3, pose: 'shrug', flip: true }); };

  const tGiant = W('power2', /^giant/) - 0.1;
  addSplit({ name: 'Power 2 evolve (training gym): talk icon becomes the switch icon; little Chopper hops onto a dumbbell; green CUTE FORM banner', t0: st('power2'), t1: end('power2'), bg: 's3:hu_gym',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['CUTE FORM', 'green', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^cute/) - st('power2'), 'twinkle']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, hitoIcon)) return; person(x, S, 'chopper', 'grin', 540, 1780, 0.9, { seed: 2, pose: 'cheer', pop: S.t0 + 0.45 }); if (S.T > W('power2', /^cute/)) A.heart(x, 760, 1000, 40 * pop(S.T, W('power2', /^cute/))); } },
    tGiant, [[1.0, 540, 980, -0.02], [1.04, 540, 960, -0.035]], 'Power 2 big (same gym): poof, he becomes a huge muscular Heavy Point and lifts the heavy barbell; red STRONG FORM banner');
  const p2 = T.shots[T.shots.length - 1]; p2.banners = [['STRONG FORM', 'red', tGiant, end('power2')]]; p2.sfx = [[0, 'boom']];
  p2.draw = function (x, S) { const k = ease.outBack(prog(S.T, S.t0, S.t0 + 0.3)); const c = person(x, S, 'chopperMonster', 'grin', 540, 1800, 0.62 + 0.18 * k, { seed: 2, pose: 'raise' }); A.rrect(x, c.hand.L[0] - 20, c.hand.L[1] - 20, c.hand.R[0] - c.hand.L[0] + 40, 30, 10); A.fs(x, '#6a6a7a', 6); if (S.T < S.t0 + 7 * F) S.shake = 0.5; };

  const tThree = W('power3', /^three/) - 0.1;
  addSplit({ name: 'Power 3 evolve (pharmacy shelves): switch icon becomes the Rumble Ball icon; Chopper pops a yellow Rumble Ball and his body flickers between forms; purple RUMBLE BALL banner', t0: st('power3'), t1: end('power3'), bg: 's3:hu_pharmacy',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['RUMBLE BALL', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^Rumble/) - st('power3'), 'crunch'], [W('power3', /^forms/) - st('power3'), 'levelup']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, hitoIcon)) return; const tr = W('power3', /^Rumble/), tf = W('power3', /^forms/); const c = person(x, S, S.T > tf && Math.sin(S.T * 18) > 0 ? 'chopperMonster' : 'chopper', 'grin', 540, 1780, S.T > tf && Math.sin(S.T * 18) > 0 ? 0.6 : 0.9, { seed: 2, pose: 'holdUp', pop: S.t0 + 0.45 }); if (S.T < tr + 0.3) rumbleBall(x, c.hand.R[0], c.hand.R[1] - 30, 1.4); } },
    tThree, [[1.0, 540, 1000, -0.02], [1.06, 540, 980, -0.035]], 'Power 3 timer (same pharmacy): a big stopwatch ticks down 3:00 beside Chopper');
  const p3 = T.shots[T.shots.length - 1]; p3.sfx = [[0, 'tick'], [0.5, 'tick']]; p3.draw = function (x, S) { person(x, S, 'chopper', 'smug', 330, 1780, 0.8, { seed: 2, pose: 'idle' }); x.beginPath(); x.arc(760, 1150, 170, 0, 7); A.fs(x, '#ffffff', 12); x.font = '110px "Lilita One"'; x.fillStyle = A.OL; x.textAlign = 'center'; const secs = Math.max(0, 180 - Math.floor((S.T - S.t0) * 20)); x.fillText(`${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`, 760, 1190); };

  const tBeast = W('peak', /^giant/) - 0.1;
  addSplit({ name: 'Peak (stone tower at night): Rumble Ball icon gives way to the monster icon, orange halo; gold MONSTER POINT banner; Chopper swells into a towering shaggy beast', t0: st('peak'), t1: end('peak'), bg: 's3:hu_tower',
    cam: [[1.0, 540, 980, 0], [1.0, 540, 900, 0.02]], banners: [['MONSTER POINT', 'gold', W('peak', /^Monster/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Monster/) - st('peak'), 'rumble']],
    draw(x, S) { halo(x, 540, 900, 620, '255,120,60', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, hitoIcon); return; }
      const k = ease.outCubic(prog(S.T, W('peak', /^Monster/), tBeast + 0.2)); person(x, S, 'chopperMonster', 'grin', 540, 1850, lerp(0.5, 0.95, k), { seed: 7, pose: 'raise' }); if (k > 0 && k < 1) S.shake = 0.3; } },
    tBeast, [[0.9, 540, 900, -0.02], [0.95, 540, 880, -0.035]], 'Peak roar (same tower): the giant beast roars, glowing eyes, the tower cracks; shake');
  const pk = T.shots[T.shots.length - 1]; pk.draw = function (x, S) { person(x, S, 'chopperMonster', 'shock', 540, 1880, 0.95, { seed: 7, pose: 'raise' }); A.speedLines(x, 540, 900, S.T, 16, 400); if (S.T < tBeast + 0.4) S.shake = 0.7; };

  add({ name: 'Twist (whiteout blizzard): push-in with roll, low sting; red SCARY CATCH banner', t0: st('twist'), t1: end('twist'), bg: 's3:hu_blizzard', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['SCARY CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Out of control (smashed ship deck): the monster swings wildly; the host ducks behind a crate with a white flag; red FRIEND OR FOE? banner', t0: st('truth'), t1: end('truth'), bg: 's3:hu_wreck',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['FRIEND OR FOE?', 'red', W('truth', /^friends/) - 0.1, end('truth')]], sfx: [[0.2, 'impact'], [W('truth', /^friends/) - st('truth'), 'shock']],
    draw(x, S) { person(x, S, 'chopperMonster', 'shock', 380, 1850, 0.82, { seed: 5, pose: Math.sin(S.T * 5) > 0 ? 'punch' : 'raise' }); const h = person(x, S, 'host', 'worried', 860, 1800, 0.5, { seed: 2, pose: 'raise', flip: true }); A.rrect(x, h.hand.L[0], h.hand.L[1] - 100, 80, 60, 4); A.fs(x, '#ffffff', 5); A.sweat(x, h.head[0] - 80, h.head[1] - 60, 1); } });

  const tAte = W('users', /^ate/) - 0.1;
  add({ name: 'Chopper (ship sick bay): Tony Tony Chopper in his pink hat with a medical bag; purple TONY TONY CHOPPER banner', t0: st('users'), t1: tAte, bg: 's3:hu_sickbay',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['TONY TONY CHOPPER', 'pink', st('users') + 0.2, W('users', /^doctor/)], ['STRAW HAT DOCTOR', 'blue', W('users', /^doctor/), tAte]], sfx: [[0, 'whoosh'], [W('users', /^doctor/) - st('users'), 'ding']],
    draw(x, S) { const c = person(x, S, 'chopper', 'grin', 440, 1820, 1.05, { pop: S.t0 + 0.05, seed: 8, pose: 'holdUp' }); A.rrect(x, c.hand.R[0] - 50, c.hand.R[1] - 20, 100, 80, 14); A.fs(x, '#8a5a3a', 6); x.fillStyle = '#ffffff'; x.fillRect(c.hand.R[0] - 8, c.hand.R[1], 16, 44); x.fillRect(c.hand.R[0] - 22, c.hand.R[1] + 14, 44, 16); } });
  add({ name: 'Ate it as a reindeer (snowy pines, flashback tint): a little blue-nosed reindeer nibbles the red mushroom fruit off the snow; gold FLASHBACK banner', t0: tAte, t1: end('users'), bg: 's3:hu_pines',
    cam: [[1.05, 540, 1050, -0.02], [1.12, 540, 1040, 0.03]], banners: [['ATE IT AS A REINDEER', 'gold', tAte + 0.2, end('users')]], sfx: [[0.3, 'crunch']],
    draw(x, S) { reindeer(x, 300, 1640, 1.15, S.T); drawHito(x, 720, 1560, 90, 0, { shadow: false }); S.flash = 0.12; S.flashCol = '255,230,190'; } });

  add({ name: 'Joke (zoo): the host points at a RACCOONS sign; Chopper, insulted, shouts I\'M A REINDEER; gold NOT A RACCOON banner', t0: st('joke'), t1: end('joke'), bg: 's3:hu_zoo',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NOT A RACCOON', 'gold', W('joke', /^raccoon/) - 0.1, end('joke')]], sfx: [[W('joke', /^raccoon/) - st('joke'), 'boing'], [W('joke', /^raccoon/) - st('joke') + 0.4, 'jokesting']],
    draw(x, S) { person(x, S, 'host', 'grin', 300, 1780, 0.66, { pop: S.t0 + 0.05, seed: 11, pose: 'punch', talk: true }); const tr = W('joke', /^raccoon/); person(x, S, 'chopper', S.T > tr ? 'yuck' : 'calm', 780, 1780, 0.8, { seed: 2, pose: S.T > tr ? 'raise' : 'idle', flip: true }); if (S.T > tr) speech(x, 760, 1100, 'REINDEER!'); } });

  ending(T, { TL, fruit });
  return finish();
}
