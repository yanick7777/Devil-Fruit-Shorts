// Shot plan for the Shiro Shiro no Mi (Castle-Castle Fruit) short.
// Structure follows the fruit's real uses: the crew hides inside, cannons fire out, enemies get trapped, and Big Father as the peak.
import * as A from '/engine/art.js';
import { drawSwirlFruit } from '/engine/swirlFruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawSwirlFruit(x, cx, cy, R, rot, { pal: 'grey', ...o });

// ---------------- castle effects ----------------
// stone wall texture, windows, a gate and cannon ports over a figure's torso (cx, fy, s as for person)
function fortressBody(x, S, cx, fy, s, o = {}) {
  const [tx, ty] = A.figPoint(380, 860, cx, fy, s), w = 300 * s, h = 440 * s;
  x.save(); A.rrect(x, tx - w / 2, ty - h / 2, w, h, 20 * s); x.fillStyle = 'rgba(168,160,160,0.92)'; x.fill(); x.lineWidth = 10 * s; x.strokeStyle = A.OL; x.stroke();
  x.save(); A.rrect(x, tx - w / 2, ty - h / 2, w, h, 20 * s); x.clip(); x.strokeStyle = 'rgba(40,30,30,0.35)'; x.lineWidth = 4 * s; for (let r = 0; r < 8; r++) for (let k = 0; k < 4; k++) x.strokeRect(tx - w / 2 + k * 80 * s + (r % 2) * 40 * s - 40 * s, ty - h / 2 + r * 55 * s, 80 * s, 55 * s); x.restore();
  for (let k = 0; k < 4; k++) A.rrect(x, tx - w / 2 + k * 80 * s - 10 * s, ty - h / 2 - 40 * s, 50 * s, 50 * s, 4 * s), A.fs(x, '#a8a0a0', 6 * s);
  for (const sd of [-1, 1]) { A.rrect(x, tx + sd * 80 * s - 22 * s, ty - 130 * s, 44 * s, 60 * s, 20 * s); A.fs(x, '#ffd77a', 5 * s); }
  const gate = o.gate ?? 0; x.beginPath(); x.moveTo(tx - 70 * s, ty + h / 2); x.lineTo(tx - 70 * s, ty + 60 * s); x.arc(tx, ty + 60 * s, 70 * s, Math.PI, 0); x.lineTo(tx + 70 * s, ty + h / 2); x.closePath(); A.fs(x, gate > 0 ? '#2a2026' : '#8a5a3c', 7 * s);
  if (o.cannons) for (const [dx, dy] of [[-110, -10], [110, -10], [0, -60]]) { const k = o.cannons; x.save(); x.translate(tx + dx * s, ty + dy * s); x.rotate(dx < 0 ? Math.PI : dx > 0 ? 0 : -Math.PI / 2); A.rrect(x, 0, -18 * s, 110 * s * k, 36 * s, 10 * s); A.fs(x, '#3a3346', 6 * s); x.restore(); }
  x.restore(); return [tx, ty];
}
function tinyCrew(x, S, cx, by, n, k, s = 0.14) { for (let i = 0; i < n; i++) { const u = Math.max(0, Math.min(1, k * 1.6 - i * 0.12)); if (u >= 1) continue; person(x, S, ['grunt', 'bandit', 'ronin', 'kid'][i % 4] === 'grunt' ? 'kid' : 'kid', 'grin', lerp(cx + 300 + i * 70, cx, u), by, s * (1 - u * 0.6), { seed: i, pose: 'cheer' }); } }
function cannonball(x, cx, cy, r) { x.beginPath(); x.arc(cx, cy, r, 0, 7); A.fs(x, '#2a2a36', 6); }
export function bigFather(x, cx, by, s, t) { // giant stone fortress warrior with towers on its shoulders
  x.save(); x.translate(cx, by); x.scale(s, s); x.rotate(Math.sin(t * 1.2) * 0.015);
  const stone = (X, Y, w, h) => { A.rrect(x, X, Y, w, h, 24); A.fs(x, '#a8a0a0', 12); x.save(); A.rrect(x, X, Y, w, h, 24); x.clip(); x.strokeStyle = 'rgba(40,30,30,0.3)'; x.lineWidth = 5; for (let r = 0; r < h / 60; r++) for (let k = -1; k < w / 90 + 1; k++) x.strokeRect(X + k * 90 + (r % 2) * 45, Y + r * 60, 90, 60); x.restore(); };
  stone(-260, -600, 180, 600); stone(80, -600, 180, 600);
  stone(-340, -1400, 680, 820);
  for (const sd of [-1, 1]) { x.save(); x.translate(sd * 390, -1300); x.rotate(sd * 0.25); stone(-90, 0, 180, 640); x.restore(); stone(sd * 330 - 90, -1700, 180, 340); for (let k = 0; k < 3; k++) { A.rrect(x, sd * 330 - 90 + k * 65, -1750, 45, 60, 4); A.fs(x, '#a8a0a0', 8); } x.beginPath(); x.moveTo(sd * 330 - 110, -1700); x.lineTo(sd * 330, -1880); x.lineTo(sd * 330 + 110, -1700); x.closePath(); A.fs(x, '#8a2a3a', 10); }
  stone(-160, -1700, 320, 300); for (const sd of [-1, 1]) { x.beginPath(); x.arc(sd * 70, -1560, 30, 0, 7); x.fillStyle = '#ffd77a'; x.fill(); x.lineWidth = 8; x.strokeStyle = A.OL; x.stroke(); }
  for (let k = 0; k < 4; k++) { A.rrect(x, -240 + k * 130, -1100, 60, 80, 20); A.fs(x, '#ffd77a', 8); }
  x.beginPath(); x.moveTo(-100, -600); x.lineTo(-100, -800); x.arc(0, -800, 100, Math.PI, 0); x.lineTo(100, -600); x.closePath(); A.fs(x, '#3a2a20', 10);
  x.restore();
}
export function castleIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { A.rrect(x, -90, -80, 180, 170, 16); A.fs(x, '#a8a0a0', 8); x.beginPath(); x.arc(0, 60, 40, Math.PI, 0); x.lineTo(40, 90); x.lineTo(-40, 90); x.closePath(); A.fs(x, '#2a2026', 6); for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(-60 + i * 60, 110, 12, 0, 7); A.fs(x, '#f6c690', 4); } }
  else if (k === 2) { A.rrect(x, -90, -80, 180, 170, 16); A.fs(x, '#a8a0a0', 8); A.rrect(x, 50, -30, 120, 40, 10); A.fs(x, '#3a3346', 6); cannonball(x, 200, -10, 20); }
  else if (k === 3) { A.rrect(x, -90, -80, 180, 170, 16); A.fs(x, '#a8a0a0', 8); for (let i = 0; i < 4; i++) A.rrect(x, -60 + i * 40, -60, 12, 130, 4), A.fs(x, '#3a3346', 3); }
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); bigFather(x, 0, 150, 0.17, t); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a stone-grey swirl fruit', biteDesc: 'his chest turns to stone bricks with a little window', biteSfx: 'thunk', bannerCol: 'gold', biteCol: '#f0eef0',
    biteFx(x, S, k) { const [tx, ty] = A.figPoint(380, 860, 540, 1900, 0.8); x.save(); x.globalAlpha = ease.outCubic(k); A.rrect(x, tx - 110, ty - 140, 220, 280, 16); x.fillStyle = 'rgba(168,160,160,0.9)'; x.fill(); x.lineWidth = 8; x.strokeStyle = A.OL; x.stroke(); A.rrect(x, tx - 20, ty - 80, 40, 50, 16); A.fs(x, '#ffd77a', 5); x.restore(); },
    calmBg: 'medievalTown', calmDesc: 'medieval town', seaHue: 'lavender', seed: 53, nameRe: /^Castle-Castle/,
    revealBg: 'castleGate', revealDesc: 'castle gate', revealBanner: 'CASTLE-CASTLE FRUIT', haloRgb: '255,220,150' });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tLiv = W('type', /^living/) - 0.1;
  add({ name: 'Fortress body (drawbridge over a moat): stone, windows and a gate spread over the host\'s body', t0: tThat, t1: tLiv, bg: 'moatBridge',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'rumble'], [0.5, 'thunk']],
    draw(x, S) { person(x, S, 'host', 'grin', 540, 1780, 0.74, { seed: 2, pose: 'cheer' }); if (S.t > 0.2) fortressBody(x, S, 540, 1780, 0.74 * ease.outBack(prog(S.t, 0.2, 0.6))); } });
  stage(T, { desc: 'castle battlements', bg: 'battlements', t0: tLiv, t1: end('type'), times: [W('type', /^living/), W('type', /^living/) + 0.25, W('type', /^fortress/), W('type', /^fortress/) + 0.35],
    labels: ['CREW', 'CANNONS', 'TRAP', 'BIG FATHER'], bar: 'FORTRESS TRICKS', haloRgb: '255,220,150', icon: castleIcon });

  // ---------------- POWER 1: crew inside ----------------
  const tHide = W('power1', /^hide/) - 0.1;
  addSplit({ name: 'Power 1 (gangster office): the gate in the host\'s chest opens and a line of tiny shrunken crew members marches inside; gold CREW banner', t0: st('power1'), t1: end('power1'), bg: 'mobOffice',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['CREW INSIDE', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^shrink/) - st('power1'), 'shimmer'], [tHide - st('power1'), 'thunk']],
    draw(x, S) { person(x, S, 'host', 'smug', 420, 1780, 0.74, { seed: 2, pose: 'shrug' }); const [tx, ty] = fortressBody(x, S, 420, 1780, 0.74, { gate: 1 });
      const k = prog(S.T, W('power1', /^shrink/), end('power1') - 0.2); for (let i = 0; i < 5; i++) { const u = Math.max(0, Math.min(1, k * 1.8 - i * 0.18)); if (u >= 1) continue; const sc = lerp(0.36, 0.09, Math.min(1, u * 2)); person(x, S, 'kid', 'grin', lerp(900 - i * 30, tx, u), lerp(1780, ty + 140, u), sc, { seed: i, pose: 'cheer' }); } } },
    tHide, [[1.4, 470, 1260, 0.02], [1.48, 480, 1250, 0.035]], 'Power 1 close (same office): the last tiny crew member waves from the gate, which swings shut');

  // ---------------- POWER 2: cannons ----------------
  const tFire = W('power2', /^fire/) - 0.1;
  addSplit({ name: 'Power 2 evolve (smoky battlefield): crew icon becomes the cannon icon, flash + glow ring; red CANNONS banner; cannons slide out of the host\'s fortress body and fire at the marine grunt', t0: st('power2'), t1: end('power2'), bg: 'siegeField',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['CANNONS', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^cannons/) - st('power2'), 'thunk'], [tFire - st('power2') + 0.1, 'impact']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, castleIcon)) return;
      const k = ease.outBack(prog(S.T, W('power2', /^cannons/), W('power2', /^cannons/) + 0.4));
      person(x, S, 'host', 'grin', 340, 1780, 0.74, { seed: 2, pose: 'shrug', pop: S.t0 + 0.45 }); const [tx, ty] = fortressBody(x, S, 340, 1780, 0.74, { cannons: k });
      const e = person(x, S, 'grunt', S.T > tFire + 0.4 ? 'hit' : 'shock', 900, 1780, 0.58, { seed: 3, pose: 'shrug', flip: true, rot: S.T > tFire + 0.4 ? 0.3 : 0, pop: S.t0 + 0.45 });
      if (S.T > tFire) { const u = prog(S.T, tFire, tFire + 0.4); if (u < 1) cannonball(x, lerp(tx + 180, e.head[0], u), lerp(ty, e.head[1] + 200, u), 22); x.fillStyle = 'rgba(220,220,230,0.6)'; x.beginPath(); x.arc(tx + 200, ty, 60 * (1 - prog(S.T, tFire, tFire + 0.6)), 0, 7); x.fill(); }
      if (S.T > tFire + 0.4) { A.impactStar(x, e.head[0], e.head[1] + 200, 160 * (1 - prog(S.T, tFire + 0.6, tFire + 1.0)), 0.3); if (S.T < tFire + 0.4 + 7 * F) S.shake = 1.0; }
    } },
    tFire, [[1.25, 700, 1250, 0.03], [1.32, 720, 1240, 0.045]], 'Power 2 fire (same field): the cannonballs land, star and shake');

  // ---------------- POWER 3: trap inside ----------------
  add({ name: 'Power 3 evolve (dungeon with torches): cannon icon becomes the bars icon; the marine grunt gets sucked through the gate into the host\'s fortress body and ends up behind bars in a window; purple TRAPPED banner', t0: st('power3'), t1: end('power3'), bg: 'dungeon',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['TRAPPED INSIDE', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^trap/) - st('power3'), 'whoosh'], [W('power3', /^inside/) - st('power3'), 'thunk']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, castleIcon)) return;
      const k = ease.smoother(prog(S.T, W('power3', /^trap/), W('power3', /^inside/)));
      person(x, S, 'host', 'smug', 420, 1780, 0.74, { seed: 2, pose: 'shrug', pop: S.t0 + 0.45 }); const [tx, ty] = fortressBody(x, S, 420, 1780, 0.74, { gate: 1 });
      if (k < 1) person(x, S, 'grunt', 'shock', lerp(880, tx, k), lerp(1780, ty + 150, k), 0.58 * (1 - k * 0.8), { seed: 3, pose: 'cheer', flip: true, rot: k * 2 });
      else { x.save(); A.rrect(x, tx + 40, ty - 160, 80, 80, 10); x.clip(); person(x, S, 'grunt', 'worried', tx + 80, ty - 60, 0.08, { seed: 3 }); x.restore(); for (let i = 0; i < 3; i++) A.rrect(x, tx + 52 + i * 24, ty - 160, 6, 80, 2), A.fs(x, '#3a3346', 2); A.mark(x, '?', tx + 160, ty - 220, pop(S.T, W('power3', /^inside/) + 0.2), 0.2); }
    } });

  // ---------------- PEAK: Big Father ----------------
  const tGiant = W('peak', /^giant/) - 0.1;
  addSplit({ name: 'Peak (candy-island coast): the bars icon gives way to the Big Father icon, gold halo; gold BIG FATHER banner; the host grows into a towering stone fortress-warrior with towers on its shoulders', t0: st('peak'), t1: end('peak'), bg: 'candyCoast',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['BIG FATHER', 'gold', W('peak', /^Big/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Big/) - st('peak'), 'charge'], [tGiant - st('peak'), 'quake']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, castleIcon); return; }
      const k = ease.outBack(prog(S.T, W('peak', /^Big/), tGiant + 0.4)); bigFather(x, 540, 1800, 0.9 * k, S.T);
      if (S.T > tGiant && S.T < tGiant + 7 * F) S.shake = 1.0;
      if (S.T > W('peak', /^Big/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Big/), W('peak', /^Big/) + 0.3))); S.flashCol = '255,246,200'; }
    } },
    tGiant + 0.4, [[1.0, 540, 1000, -0.02], [1.06, 540, 990, -0.035]], 'Peak scale (same coast): a tiny marine grunt at its feet looks all the way up, ?');
  const pk = T.shots[T.shots.length - 1], pkd = pk.draw;
  pk.draw = function (x, S) { pkd.call(this, x, S); const e = person(x, S, 'grunt', 'shock', 940, 1800, 0.22, { seed: 3, pose: 'shrug', flip: true }); A.mark(x, '?', e.head[0] - 40, e.head[1] - 80, 0.6 * pop(S.T, S.t0 + 0.2)); };

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (cracked stone wall): a crack splits down the wall; push-in with roll, low sting; red PAINFUL CATCH banner', t0: st('twist'), t1: end('twist'), bg: 'crackedWall', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 980, 0.07]], banners: [['PAINFUL CATCH', 'red', W('twist', /^painful/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.3, 'crumble']],
    draw(x, S) { A.mark(x, '!?', 800, 900, pop(S.T, S.t0 + 0.4)); } });
  const tHurts = W('truth', /^hurts/) - 0.1;
  add({ name: 'Walls = body (sick bay): a cannonball smacks the fortress body and the host yelps; impact star on the stone; red OUCH banner', t0: st('truth'), t1: end('truth'), bg: 'clinicRoom',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['OUCH!', 'red', tHurts - 0.1, end('truth')]], sfx: [[W('truth', /^hit/) - st('truth'), 'impact'], [tHurts - st('truth'), 'shock']],
    draw(x, S) { const th = W('truth', /^hit/), hit = S.T > th; const h = person(x, S, 'host', hit ? 'hit' : 'calm', 460, 1780, 0.74, { seed: 2, pose: 'shrug', rot: hit ? -0.1 : 0 }); const [tx, ty] = fortressBody(x, S, 460, 1780, 0.74);
      const u = prog(S.T, th - 0.4, th); if (u < 1) cannonball(x, lerp(1100, tx + 60, u), lerp(900, ty, u), 28);
      if (hit) { A.impactStar(x, tx + 60, ty, 170 * (1 - prog(S.T, th + 0.2, th + 0.6)), 0.3); if (S.T < th + 7 * F) S.shake = 0.9; x.strokeStyle = A.OL; x.lineWidth = 6; x.beginPath(); x.moveTo(tx + 60, ty); x.lineTo(tx + 20, ty + 60); x.lineTo(tx + 70, ty + 110); x.stroke(); A.sweat(x, h.head[0] + 180, h.head[1] - 40, 1); } } });

  // ---------------- USERS ----------------
  const tStraw = W('users', /^help/) - 0.1;
  add({ name: 'Capone Bege (gangster office): Bege with his cigar and pinstripe suit, a fortress window glowing on his chest; purple CAPONE BEGE banner', t0: st('users'), t1: tStraw, bg: 'mobOffice',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['CAPONE BEGE', 'pink', st('users') + 0.2, tStraw]], sfx: [[0, 'whoosh']],
    draw(x, S) { person(x, S, 'bege', 'smug', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); } });
  add({ name: 'The escape (stormy sea): a little ship with a straw-hat flag sails away while Big Father holds the line on the shore; gold ESCAPE banner', t0: tStraw, t1: end('users'), bg: 'escapeSea',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['ESCAPE FROM BIG MOM', 'gold', tStraw + 0.3, end('users')]], sfx: [[0.1, 'whoosh'], [0.6, 'rumble']],
    draw(x, S) { bigFather(x, 280, 1900, 0.55, S.T); const sx = 820 + S.t * 40; x.save(); x.translate(sx, 940); x.beginPath(); x.ellipse(0, 0, 50, 14, 0, 0, 7); A.fs(x, '#f2c94c', 5); x.restore(); } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (apartment hallway with a FOR RENT sign): the host shrugs and opens the little gate in his chest, a cosy lit room inside; green NO RENT banner', t0: st('joke'), t1: end('joke'), bg: 'rentHall',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO RENT', 'green', W('joke', /^rent/) - 0.1, end('joke')]], sfx: [[0.3, 'thunk'], [W('joke', /^rent/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { person(x, S, 'host', 'smug', 540, 1780, 0.8, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug', talk: true }); const [tx, ty] = fortressBody(x, S, 540, 1780, 0.8, { gate: 1 }); x.fillStyle = 'rgba(255,215,120,0.8)'; x.beginPath(); x.arc(tx, ty + 120, 40, 0, 7); x.fill(); A.sparkle(x, tx + 100, ty + 60, 30 * Math.abs(Math.sin(S.T * 4))); } });

  ending(T, { TL, fruit });
  return finish();
}
