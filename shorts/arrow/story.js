// Shot plan for the Aro Aro no Mi (Arrow-Arrow Fruit) short.
// Structure follows the fruit's known uses: arrows from the body, arrows that boost attacks, arrows a knife can't cut, and full control (pierce, bind, redirect) as the peak.
import * as A from '/engine/art.js';
import { drawSwirlFruit } from '/engine/swirlFruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawSwirlFruit(x, cx, cy, R, rot, { pal: 'pink', ...o });

// ---------------- arrow effects ----------------
// a flat pink arrow strip from (x0,y0) pointing at angle a, length len
export function arrow(x, x0, y0, a, len, w = 34) {
  if (len <= 0) return; x.save(); x.translate(x0, y0); x.rotate(a);
  x.beginPath(); x.moveTo(0, -w / 2); x.lineTo(len - w, -w / 2); x.lineTo(len - w, -w); x.lineTo(len + w * 0.4, 0); x.lineTo(len - w, w); x.lineTo(len - w, w / 2); x.lineTo(0, w / 2); x.closePath();
  A.fs(x, '#f8fbff', Math.max(4, w * 0.2)); x.beginPath(); x.moveTo(6, w / 4); x.lineTo(len - w, w / 4); x.lineWidth = Math.max(2, w * 0.2); x.strokeStyle = '#8ab8e8'; x.stroke(); x.restore();
}
function arrowFan(x, cx, cy, k, n, len, a0 = 0, spread = Math.PI * 2) { for (let i = 0; i < n; i++) { const a = a0 + (n > 1 ? (i / n) * spread : 0); arrow(x, cx + Math.cos(a) * 40, cy + Math.sin(a) * 40, a, len * k, 28); } }
function knife(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.rrect(x, -110, -16, 90, 32, 8); A.fs(x, '#3a2a20', 6); x.beginPath(); x.moveTo(-20, -22); x.lineTo(160, -6); x.lineTo(170, 10); x.lineTo(-20, 22); x.closePath(); A.fs(x, '#d9dce6', 6); x.restore(); }
function compass(x, cx, cy, s, t) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.arc(0, 0, 120, 0, 7); A.fs(x, '#f4ead2', 10); x.rotate(Math.sin(t * 3) * 0.2); arrow(x, -80, 0, 0, 150, 30); x.restore(); }
export function arrowIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) arrowFan(x, 0, 0, 1, 5, 130, -Math.PI / 2 - 0.8, 1.6);
  else if (k === 2) { A.fist(x, -30, 0, 0.5); arrow(x, -160, -40, 0, 120, 26); arrow(x, -160, 40, 0, 120, 26); }
  else if (k === 3) { arrow(x, -130, 0, 0, 260, 40); knife(x, 0, -40, 0.7, 0.9); }
  else { A.glow(x, 0, 0, 180, '255,150,210', 0.6); for (let i = 0; i < 3; i++) { arrow(x, -120, -60 + i * 60, i === 1 ? 0 : (i - 1) * 0.5, 230, 26); } }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a pink swirl fruit', biteDesc: 'a pink arrow pops out of his hand and points at the screen', biteSfx: 'swish', bannerCol: 'pink', biteCol: '#ffe8f2',
    biteFx(x, S, k, h) { arrow(x, h.hand.L[0], h.hand.L[1], -0.8, 220 * ease.outBack(k), 34); },
    calmBg: 'archeryRange', calmDesc: 'archery range', seaHue: 'rose', seed: 41, nameRe: /^Arrow-Arrow/,
    revealBg: 'signposts', revealDesc: 'crossroads signpost', revealBanner: 'ARROW-ARROW FRUIT', haloRgb: '255,150,210',
    revealFx(x, S) { for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283 + S.T * 0.5; arrow(x, 540 + Math.cos(a) * 300, 900 + Math.sin(a) * 300, a, 90, 26); } } });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tMoves = W('type', /^moves/) - 0.1;
  add({ name: 'Arrows from the body (windy hill): a ring of pink arrows bursts out of the host and hovers around him', t0: tThat, t1: tMoves, bg: 'windyHill',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'swish'], [0.5, 'swish']],
    draw(x, S) { person(x, S, 'host', 'grin', 540, 1780, 0.7, { seed: 2, pose: 'cheer' }); arrowFan(x, 540, 1200, ease.outBack(prog(S.t, 0.2, 0.6)), 10, 220, S.T * 0.3); } });
  stage(T, { desc: 'compass-rose hall', bg: 'compassHall', t0: tMoves, t1: end('type'), times: [W('type', /^moves/), W('type', /^them/), W('type', /^with/), W('type', /^mind/)],
    labels: ['SHOOT', 'BOOST', 'TOUGH', 'CONTROL'], bar: 'ARROW TRICKS', haloRgb: '255,150,210', icon: arrowIcon });

  // ---------------- POWER 1: shoot ----------------
  const tPoint = W('power1', /^point/) - 0.1;
  addSplit({ name: 'Power 1 (stone courtyard): pink arrows fly out of the host\'s body and curve through the air; pink SHOOT banner', t0: st('power1'), t1: end('power1'), bg: 'courtyard',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['ARROW SHOT', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^arrows/) - st('power1'), 'swish'], [tPoint - st('power1') + 0.3, 'impact']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 260, 1780, 0.66, { seed: 2, pose: 'punch' });
      const k = prog(S.T, W('power1', /^arrows/), tPoint); for (let i = 0; i < 3; i++) { const u = Math.max(0, k - i * 0.15), px = h.hand.R[0] + u * 500, py = h.hand.R[1] - Math.sin(u * Math.PI) * 300 - i * 60; if (u > 0) arrow(x, px - 140, py, -Math.cos(u * Math.PI) * 0.6, 160, 28); }
      const e = person(x, S, 'knight', 'calm', 880, 1780, 0.62, { seed: 3, pose: 'idle', flip: true }); } },
    tPoint, [[1.15, 660, 1150, 0.02], [1.22, 680, 1140, 0.035]], 'Power 1 aim (same courtyard): the host points and every arrow snaps around to hit the knight\'s helmet; star and !?');
  const p1 = T.shots[T.shots.length - 1];
  p1.draw = function (x, S) { const h = person(x, S, 'host', 'grin', 260, 1780, 0.66, { seed: 2, pose: 'punch' }); const hit = S.T > tPoint + 0.3;
    const e = person(x, S, 'knight', hit ? 'hit' : 'shock', 880, 1780, 0.62, { seed: 3, pose: 'shrug', flip: true, rot: hit ? 0.2 : 0 });
    const k = ease.outCubic(prog(S.T, tPoint, tPoint + 0.3)); for (let i = 0; i < 4; i++) { const sx = 400 + i * 60, sy = 900 + i * 50; arrow(x, lerp(sx, e.head[0] - 160, k), lerp(sy, e.head[1] + i * 20, k), Math.atan2(e.head[1] - sy, e.head[0] - sx), 150, 28); }
    if (hit) { A.impactStar(x, e.head[0], e.head[1], 160 * (1 - prog(S.T, tPoint + 0.5, tPoint + 0.9)), 0.3); A.mark(x, '!?', e.head[0] + 140, e.head[1] - 210, pop(S.T, tPoint + 0.4)); if (S.T < tPoint + 0.3 + 7 * F) S.shake = 0.8; } };

  // ---------------- POWER 2: boost ----------------
  const tHeavy = W('power2', /^heavier/) - 0.1;
  addSplit({ name: 'Power 2 evolve (running track): shoot icon becomes the boost icon, flash + glow ring; blue BOOST banner; arrows latch onto the host\'s fist and rocket it forward with speed lines', t0: st('power2'), t1: end('power2'), bg: 'raceTrack',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['ARROW BOOST', 'blue', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^faster/) - st('power2'), 'zip'], [tHeavy - st('power2') + 0.2, 'impact']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, arrowIcon)) return;
      const tf = W('power2', /^faster/) - S.t0, k = ease.outCubic(prog(S.t, tf - 0.3, tf + 0.3));
      const h = person(x, S, 'host', 'shout', lerp(220, 420, k), 1780, 0.66, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 });
      arrow(x, h.hand.R[0] - 220, h.hand.R[1] - 30, 0, 200, 30); arrow(x, h.hand.R[0] - 220, h.hand.R[1] + 30, 0, 200, 30); A.speedLines(x, h.hand.R[0] - 200, h.hand.R[1], S.T, 12, 260, Math.PI);
      const hit = S.T > tHeavy + 0.2; const e = person(x, S, 'knight', hit ? 'hit' : 'shock', hit ? 900 + 60 * prog(S.T, tHeavy + 0.2, tHeavy + 0.6) : 900, 1780, 0.6, { seed: 3, pose: 'shrug', flip: true, rot: hit ? 0.35 : 0, pop: S.t0 + 0.45 });
      if (hit) { A.impactStar(x, 760, 1250, 180 * (1 - prog(S.T, tHeavy + 0.4, tHeavy + 0.8)), 0.3); if (S.T < tHeavy + 0.2 + 7 * F) S.shake = 1.0; }
    } },
    tHeavy, [[1.3, 700, 1250, 0.03], [1.38, 720, 1240, 0.045]], 'Power 2 hit (same track): the boosted punch knocks the knight back');

  // ---------------- POWER 3: tough ----------------
  const tCut = W('power3', /^cut/) - 0.1;
  add({ name: 'Power 3 evolve (butcher shop): boost icon becomes the knife icon; a big arrow floats on the counter, a cleaver chops down on it and bounces off with a clang; gold TOUGH banner', t0: st('power3'), t1: end('power3'), bg: 'butcherShop',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['UNCUTTABLE', 'gold', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [tCut - st('power3'), 'slash'], [tCut - st('power3') + 0.15, 'ding']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, arrowIcon)) return;
      arrow(x, 200, 1250, 0, 600, 70); const k = prog(S.T, tCut - 0.4, tCut), bounce = S.T > tCut ? ease.outCubic(prog(S.T, tCut, tCut + 0.5)) : 0;
      knife(x, 560 + bounce * 200, lerp(700, 1180, k) - bounce * 400, 2.0, 0.9 + bounce * 3);
      person(x, S, 'host', 'smug', 900, 1780, 0.56, { seed: 2, pose: 'shrug', flip: true, pop: S.t0 + 0.45 });
      if (S.T > tCut) { A.impactStar(x, 560, 1250, 140 * (1 - prog(S.T, tCut + 0.2, tCut + 0.6)), 0.3); A.sparkle(x, 600, 1200, 60 * (1 - prog(S.T, tCut, tCut + 0.5))); if (S.T < tCut + 7 * F) S.shake = 0.6; }
    } });

  // ---------------- PEAK: control ----------------
  const tTie = W('peak', /^tie/) - 0.1, tRedir = W('peak', /^redirect/) - 0.1;
  add({ name: 'Peak 1 (rail yard at sunset): the knife icon gives way to the control icon, gold halo; gold CONTROL banner; an arrow pierces the knight\'s shield', t0: st('peak'), t1: tTie, bg: 'railYard',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['TOTAL CONTROL', 'gold', st('peak') + 0.4, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^pierce/) - st('peak'), 'slash'], [W('peak', /^pierce/) - st('peak') + 0.2, 'impact']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,150,210', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5), '255,190,230'); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, arrowIcon); return; }
      const tp = W('peak', /^pierce/), k = ease.outCubic(prog(S.T, tp - 0.2, tp + 0.15));
      person(x, S, 'host', 'smug', 240, 1780, 0.62, { seed: 7, pose: 'punch' }); const e = person(x, S, 'knight', S.T > tp ? 'shock' : 'calm', 860, 1780, 0.62, { seed: 3, pose: 'holdUp', flip: true });
      x.beginPath(); x.arc(e.hand.R[0], e.hand.R[1] + 60, 100, 0, 7); A.fs(x, '#b8bcc8', 10); arrow(x, lerp(300, e.hand.R[0] - 260, k), e.hand.R[1] + 60, 0, 320, 34);
      if (S.T > tp) A.impactStar(x, e.hand.R[0], e.hand.R[1] + 60, 120 * (1 - prog(S.T, tp + 0.2, tp + 0.6)), 0.2);
    } });
  add({ name: 'Peak 2 (same rail yard, closer): arrows wrap around the knight and tie him up', t0: tTie, t1: tRedir, bg: 'railYard',
    cam: [[1.2, 760, 1100, 0.02], [1.28, 770, 1090, 0.035]], sfx: [[0.1, 'swish'], [0.4, 'thunk']],
    draw(x, S) { const e = person(x, S, 'knight', 'worried', 760, 1780, 0.62, { seed: 3, pose: 'idle', flip: true }); const k = ease.outCubic(prog(S.t, 0.05, 0.5));
      for (let i = 0; i < 3; i++) { const y = e.head[1] + 300 + i * 150; x.save(); x.beginPath(); x.ellipse(760, y, 200 * k, 40, 0, 0, 7); x.lineWidth = 34; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 24; x.strokeStyle = '#f8fbff'; x.stroke(); x.restore(); } A.mark(x, '?', e.head[0] + 140, e.head[1] - 200, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Peak 3 (same rail yard, wide): the knight hurls a spear, an arrow latches on and swings it right back around at him; 7-frame shake', t0: tRedir, t1: end('peak'), bg: 'railYard',
    cam: [[1.0, 540, 980, -0.02], [1.06, 540, 970, -0.04]], sfx: [[0.1, 'whoosh'], [0.6, 'impact']],
    draw(x, S) { const u = ease.smoother(prog(S.t, 0, 0.6)), sx = 540 + Math.cos(u * Math.PI) * -300, sy = 1100 - Math.sin(u * Math.PI) * 300;
      person(x, S, 'host', 'grin', 240, 1780, 0.62, { seed: 7, pose: 'raise' }); const e = person(x, S, 'knight', S.t > 0.6 ? 'hit' : 'shout', 860, 1780, 0.62, { seed: 3, pose: 'shrug', flip: true, rot: S.t > 0.6 ? 0.3 : 0 });
      x.save(); x.translate(sx, sy); x.rotate(u * Math.PI + Math.PI); A.rrect(x, -180, -10, 360, 20, 8); A.fs(x, '#8a5a3c', 5); x.beginPath(); x.moveTo(180, -24); x.lineTo(240, 0); x.lineTo(180, 24); x.closePath(); A.fs(x, '#d9dce6', 5); x.restore(); arrow(x, sx - 160, sy - 60, 0.3, 140, 24);
      if (S.t > 0.6) { A.impactStar(x, e.head[0], e.head[1] + 150, 180 * (1 - prog(S.t, 0.8, 1.2)), 0.3); if (S.t < 0.6 + 7 * F) S.shake = 0.9; } } });

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (dark cathedral): Gunko appears (goggle cap, mask, pink cape) under the stained glass; push-in with roll, low sting; red SCARY PART banner', t0: st('twist'), t1: end('twist'), bg: 'cathedral', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['THE SCARY PART', 'red', st('twist') + 0.3, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { person(x, S, 'gunko', 'calm', 540, 1800, 0.8, { seed: 5, alpha: prog(S.t, 0, 0.6), pose: 'idle' }); } });
  add({ name: 'The Holy Knights (white-and-gold palace above the clouds): Gunko in the middle, two faded Holy Knights behind her, arrows circling; gold HOLY KNIGHTS banner', t0: st('truth'), t1: end('truth'), bg: 'holyPalace',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 540, 990, -0.04]], banners: [['HOLY KNIGHTS', 'gold', W('truth', /^Holy/) - 0.1, end('truth')]], sfx: [[0, 'whoosh'], [W('truth', /^Holy/) - st('truth'), 'charge']],
    draw(x, S) { for (const [kx, s] of [[200, 0.55], [880, 0.55]]) person(x, S, 'gunko', 'calm', kx, 1760, s, { seed: kx, alpha: 0.75 }); const g = person(x, S, 'gunko', 'smug', 540, 1800, 0.7, { seed: 5, pose: 'raise' });
      for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283 + S.T; arrow(x, g.head[0] + Math.cos(a) * 260, g.head[1] + 200 + Math.sin(a) * 140, a + Math.PI / 2, 110, 24); } } });

  // ---------------- USERS ----------------
  add({ name: 'Gunko in Elbaph (giant forest with a huge sword in the ground): Gunko fires a volley of arrows at a straw hat that tumbles past; pink ELBAPH banner', t0: st('users'), t1: end('users'), bg: 'giantForest',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['ELBAPH', 'green', W('users', /^Elbaph/) - 0.1, end('users')]], sfx: [[0, 'whoosh'], [0.5, 'swish'], [0.9, 'swish']],
    draw(x, S) { const g = person(x, S, 'gunko', 'smug', 320, 1800, 0.78, { pop: S.t0 + 0.05, seed: 8, pose: 'punch' });
      for (let i = 0; i < 3; i++) { const u = (S.T * 0.8 + i / 3) % 1; arrow(x, g.hand.R[0] + u * 600, g.hand.R[1] - 40 + i * 40, 0, 140, 26); }
      const hx = 860 + Math.sin(S.T * 2) * 40, hy = 1000 + Math.sin(S.T * 3) * 30; x.save(); x.translate(hx, hy); x.rotate(Math.sin(S.T * 2) * 0.4); x.beginPath(); x.ellipse(0, 0, 120, 30, 0, 0, 7); A.fs(x, '#f2c94c', 8); x.beginPath(); x.moveTo(-70, 0); x.bezierCurveTo(-70, -90, 70, -90, 70, 0); A.fs(x, '#f6d466', 8); x.fillStyle = '#c0392b'; x.fillRect(-68, -24, 136, 16); x.restore(); } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (hedge maze): the host strolls through the maze while a little pink arrow floats ahead pointing the way; green NEVER LOST banner', t0: st('joke'), t1: end('joke'), bg: 'hedgeMaze',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NEVER LOST', 'green', W('joke', /^lost/) - 0.1, end('joke')]], sfx: [[0.3, 'ding'], [W('joke', /^lost/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 480, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug', talk: true }); const a = Math.sin(S.T * 2) * 0.6 - 0.3; arrow(x, h.head[0] + 200, h.head[1] - 120, a, 160, 30); A.sparkle(x, h.head[0] + 380, h.head[1] - 160, 30 * Math.abs(Math.sin(S.T * 4))); } });

  ending(T, { TL, fruit });
  return finish();
}
