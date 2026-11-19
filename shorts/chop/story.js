// Shot plan for the Bara Bara no Mi (Chop-Chop Fruit) short.
// Structure follows the fruit's real uses: immune to blades, Chop-Chop Cannon, head pop escape, and Chop-Chop Festival as the peak.
import * as A from '/engine/art.js';
import { drawBara } from '/shorts/chop/fruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawBara(x, cx, cy, R * 0.85, rot, o);

// ---------------- chop effects ----------------
// a figure split into floating parts. off = {head:[dx,dy], torso:[dx,dy], legs:[dx,dy]} in screen px; feet (legs) stay put unless moved
function split(x, S, who, expr, cx, fy, s, off = {}, o = {}) {
  const cut = (y0, y1, d) => { const [dx, dy] = d || [0, 0]; x.save(); x.beginPath(); x.rect(cx - 700 * s + dx, fy + (y0 - 1745) * s + dy, 1400 * s, (y1 - y0) * s); x.clip(); x.translate(dx, dy); const r = person(x, S, who, expr, cx, fy, s, o); x.restore(); return r; };
  cut(1180, 1900, off.legs); cut(690, 1180, off.torso); const r = cut(0, 690, off.head);
  const dash = (y, d1, d2) => { if (!d1 && !d2) return; x.save(); x.setLineDash([10, 10]); x.lineWidth = 4; x.strokeStyle = 'rgba(27,21,48,0.35)'; x.beginPath(); x.moveTo(cx - 200 * s, fy + (y - 1745) * s); x.lineTo(cx + 200 * s, fy + (y - 1745) * s); x.stroke(); x.restore(); };
  dash(690, off.head, off.torso); dash(1180, off.torso, off.legs);
  const [hx, hy] = off.head || [0, 0]; return { ...r, head: [r.head[0] + hx, r.head[1] + hy] };
}
function sword(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.rrect(x, -140, -14, 110, 28, 8); A.fs(x, '#3a2a20', 6); A.rrect(x, -40, -30, 16, 60, 4); A.fs(x, '#d9b44a', 4); x.beginPath(); x.moveTo(-24, -14); x.lineTo(320, -6); x.lineTo(340, 4); x.lineTo(-24, 14); x.closePath(); A.fs(x, '#e8eef4', 6); x.restore(); }
export function chopIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { sword(x, -100, 0, 0.6, 0); x.beginPath(); x.arc(40, -50, 34, 0, 7); A.fs(x, '#f6c690', 6); x.beginPath(); x.arc(40, 50, 34, 0, 7); A.fs(x, '#22a99a', 6); }
  else if (k === 2) { A.fist(x, 40, 0, 0.6); A.speedLines(x, -80, 0, t, 6, 120, Math.PI); }
  else if (k === 3) { x.beginPath(); x.arc(0, -40 - Math.abs(Math.sin(t * 3)) * 30, 60, 0, 7); A.fs(x, '#f6c690', 7); A.rrect(x, -60, 50, 120, 90, 20); A.fs(x, '#22a99a', 7); }
  else { A.glow(x, 0, 0, 180, '255,200,120', 0.6); for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283 + t; x.beginPath(); x.arc(Math.cos(a) * 110, Math.sin(a) * 110, 26, 0, 7); A.fs(x, i % 2 ? '#f6c690' : '#22a99a', 5); } }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a purple fruit made of little swirly balls', biteDesc: 'his head hops up off his shoulders for a second', biteSfx: 'boing', bannerCol: 'pink', biteCol: '#f0e0ff',
    biteFx(x, S, k) { A.mark(x, '?', 300, 700, pop(S.T, S.t0 + 1.0), -0.2); },
    calmBg: 'carnivalNight', calmDesc: 'carnival at night', seaHue: 'amber', seed: 45, nameRe: /^Chop-Chop/,
    revealBg: 'fruitStall', revealDesc: 'market fruit stall', revealBanner: 'CHOP-CHOP FRUIT', haloRgb: '210,160,255',
    revealFx(x, S) { } });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tFloat = W('type', /^float/) - 0.1;
  add({ name: 'Split apart (magician\'s stage): the host stands in a sawing box... then his head, body and legs drift apart and wave', t0: tThat, t1: tFloat, bg: 'magicStage',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'slash'], [0.5, 'boing']],
    draw(x, S) { const k = ease.outBack(prog(S.t, 0.3, 0.9)); split(x, S, 'host', 'grin', 540, 1780, 0.7, { head: [-60 * k, -160 * k], torso: [80 * k, -60 * k] }, { seed: 2, pose: 'cheer' }); } });
  stage(T, { desc: 'giant jigsaw wall', bg: 'puzzleRoom', t0: tFloat, t1: end('type'), times: [W('type', /^float/), W('type', /^float/) + 0.2, W('type', /^around/), W('type', /^around/) + 0.3],
    labels: ['NO CUTS', 'CANNON', 'HEAD POP', 'FESTIVAL'], bar: 'CHOP TRICKS', haloRgb: '210,160,255', icon: chopIcon });

  // ---------------- POWER 1: swords pass through ----------------
  const tHurt = W('power1', /^hurting/) - 0.1, tSw = W('power1', /^cut/);
  addSplit({ name: 'Power 1 (Japanese garden): the ronin slashes straight through the host\'s middle; his body just splits at the cut and floats there, no damage; gold NO CUTS banner', t0: st('power1'), t1: end('power1'), bg: 'zenGarden',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['SWORD-PROOF', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[tSw - st('power1'), 'slash'], [tHurt - st('power1'), 'boing']],
    draw(x, S) {
      const ts = tSw - S.t0, k = ease.outBack(prog(S.t, ts, ts + 0.4));
      const e = person(x, S, 'ronin', S.t > ts + 0.4 ? 'shock' : 'shout', 840, 1780, 0.62, { seed: 3, pose: 'punch', flip: true });
      split(x, S, 'host', 'smug', 360, 1780, 0.66, { head: [0, -40 * k], torso: [40 * k, -90 * k] }, { seed: 2, pose: 'shrug' });
      sword(x, lerp(800, 520, prog(S.t, ts - 0.2, ts + 0.1)), 1300, 0.9, Math.PI);
      if (S.t > ts + 0.4) A.mark(x, '!?', e.head[0] + 150, e.head[1] - 200, pop(S.T, S.t0 + ts + 0.4));
    } },
    tHurt, [[1.35, 400, 1150, 0.02], [1.42, 410, 1140, 0.035]], 'Power 1 close (same garden): the floating pieces wave while the sword hangs in mid-air');

  // ---------------- POWER 2: fist rocket ----------------
  const tRock = W('power2', /^rocket/) - 0.1;
  addSplit({ name: 'Power 2 evolve (fairground shooting gallery): no-cuts icon becomes the cannon icon, flash + glow ring; red CANNON banner; the host\'s fist detaches and rockets across the gallery', t0: st('power2'), t1: end('power2'), bg: 'shootingGallery',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['CHOP-CHOP CANNON', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^fist/) - st('power2'), 'zip'], [tRock - st('power2') + 0.3, 'impact']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, chopIcon)) return;
      const tf = W('power2', /^fist/) - S.t0, u = ease.outCubic(prog(S.t, tf, tf + 0.5));
      const h = person(x, S, 'host', 'grin', 260, 1780, 0.66, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 });
      const fx = lerp(h.hand.R[0], 900, u), fy = h.hand.R[1]; A.fist(x, fx, fy, 0.6, '#22a99a'); if (u > 0 && u < 1) A.speedLines(x, fx - 120, fy, S.T, 10, 200, Math.PI);
      const hit = S.T > tRock + 0.3; const e = person(x, S, 'ronin', hit ? 'hit' : 'calm', 900, 1780, 0.6, { seed: 3, pose: 'idle', flip: true, rot: hit ? 0.3 : 0, pop: S.t0 + 0.45 });
      if (hit) { A.impactStar(x, e.head[0], e.head[1] + 60, 160 * (1 - prog(S.T, tRock + 0.5, tRock + 0.9)), 0.3); if (S.T < tRock + 0.3 + 7 * F) S.shake = 0.9; }
    } },
    tRock, [[1.25, 760, 1250, 0.03], [1.32, 780, 1240, 0.045]], 'Power 2 hit (same gallery): the fist rocket smacks the ronin');

  // ---------------- POWER 3: head pop ----------------
  const tEsc = W('power3', /^escape/) - 0.1;
  add({ name: 'Power 3 evolve (haunted hallway): cannon icon becomes the head-pop icon; the ronin grabs at the host but his head pops off and floats away laughing; gold HEAD POP banner; ? marks', t0: st('power3'), t1: end('power3'), bg: 'hauntedHouse',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['HEAD POP', 'gold', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^head/) - st('power3'), 'boing'], [tEsc - st('power3'), 'whoosh']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, chopIcon)) return;
      const th = W('power3', /^head/) - S.t0, k = ease.outCubic(prog(S.t, th, th + 0.9));
      const e = person(x, S, 'ronin', k > 0.3 ? 'shock' : 'shout', 820, 1780, 0.62, { seed: 3, pose: 'punch', flip: true, pop: S.t0 + 0.45 });
      split(x, S, 'host', 'grin', 380, 1780, 0.66, { head: [-180 * k, -520 * k] }, { seed: 2, pose: 'shrug' });
      if (k > 0.3) A.mark(x, '?', e.head[0] - 120, e.head[1] - 200, pop(S.T, S.t0 + th + 0.4), -0.2);
    } });

  // ---------------- PEAK: festival ----------------
  const tAtk = W('peak', /^attack/) - 0.1;
  addSplit({ name: 'Peak (confetti arena): head-pop icon gives way to the festival icon, gold halo; gold CHOP-CHOP FESTIVAL banner; the host bursts into dozens of tiny pieces that whirl around the arena', t0: st('peak'), t1: end('peak'), bg: 'confettiArena',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['CHOP-CHOP FESTIVAL', 'gold', W('peak', /^Chop-Chop/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Chop-Chop/) - st('peak'), 'charge'], [W('peak', /^tiny/) - st('peak'), 'pop'], [tAtk - st('peak') + 0.3, 'impact']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,200,120', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, chopIcon); return; }
      const k = ease.outCubic(prog(S.T, W('peak', /^tiny/) - 0.3, W('peak', /^tiny/) + 0.5));
      if (k < 1) split(x, S, 'host', 'grin', 540, 1780, 0.66, { head: [0, -200 * k], torso: [0, -100 * k] }, { seed: 7, pose: 'cheer', alpha: 1 - k });
      for (let i = 0; i < 26; i++) { const a = i / 26 * 6.283 + S.T * 2, r = 120 + 380 * k * (0.6 + 0.4 * Math.sin(i * 3.3)); x.save(); x.translate(540 + Math.cos(a) * r, 1050 + Math.sin(a) * r * 0.8); x.rotate(a * 3); A.rrect(x, -26, -20, 52, 40, 12); A.fs(x, i % 3 === 0 ? '#f6c690' : i % 3 === 1 ? '#22a99a' : '#3b4f7a', 5); x.restore(); }
      if (k > 0) { x.beginPath(); x.arc(540, 1050, 70, 0, 7); A.fs(x, '#f6c690', 8); A.mark(x, '!?', 760, 760, pop(S.T, W('peak', /^tiny/) + 0.3)); }
      if (S.T > W('peak', /^Chop-Chop/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Chop-Chop/), W('peak', /^Chop-Chop/) + 0.3))); S.flashCol = '255,246,200'; }
    } },
    tAtk, [[1.0, 540, 1000, -0.02], [1.06, 560, 990, -0.04]], 'Peak attack (same arena): the pieces pummel the ronin from every side; stars and shake');
  const pk = T.shots[T.shots.length - 1], pkd = pk.draw;
  pk.draw = function (x, S) { const hit = S.T > tAtk + 0.3; const e = person(x, S, 'ronin', hit ? 'hit' : 'shock', 760, 1780, 0.62, { seed: 3, pose: 'shrug', flip: true, rot: hit ? Math.sin(S.T * 20) * 0.08 : 0 });
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + S.T * 4, r = 220 + 60 * Math.sin(S.T * 6 + i); x.save(); x.translate(760 + Math.cos(a) * r, 1200 + Math.sin(a) * r); A.rrect(x, -26, -20, 52, 40, 12); A.fs(x, i % 2 ? '#f6c690' : '#22a99a', 5); x.restore(); }
    if (hit) { for (let i = 0; i < 3; i++) A.impactStar(x, 700 + i * 60, 1000 + i * 120, 90 * Math.abs(Math.sin(S.T * 8 + i)), 0.3); if (Math.floor(S.T * 12) % 3 === 0) S.shake = 0.4; } };

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (muddy field with footprints): two footprints in the mud, a push-in with roll and a low sting; red CATCH banner', t0: st('twist'), t1: end('twist'), bg: 'muddyField', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1100, 0.07]], banners: [['THE CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 780, 900, pop(S.T, S.t0 + 0.5), 0.2); } });
  add({ name: 'Feet stay down (army obstacle course): the host\'s head, arms and body float up over the climbing wall, but his feet stay stuck on the ground; red GROUNDED banner; sweat', t0: st('truth'), t1: end('truth'), bg: 'bootCamp',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['FEET STAY DOWN', 'red', W('truth', /^stay/) - 0.1, end('truth')]], sfx: [[0.2, 'whoosh'], [W('truth', /^ground/) - st('truth'), 'thunk']],
    draw(x, S) { const k = ease.outCubic(prog(S.t, 0.1, 1.2)); const h = split(x, S, 'host', k > 0.6 ? 'worried' : 'grin', 400, 1780, 0.66, { head: [120 * k, -600 * k], torso: [100 * k, -480 * k] }, { seed: 2, pose: 'cheer' });
      if (k > 0.6) { A.sweat(x, h.head[0] + 170, h.head[1] - 40, 1); A.mark(x, '!?', 400, 1350, pop(S.T, S.t0 + 1.0)); } } });

  // ---------------- USERS ----------------
  const tClown = W('users', /^and$/) - 0.1;
  add({ name: 'The accident (legendary old ship at night): young-looking Buggy gulps the fruit down by accident on deck, eyes bulging; gold ROGER\'S SHIP banner', t0: st('users'), t1: tClown, bg: 'oldShipNight',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['ROGER\'S SHIP', 'gold', W('users', /^Roger/) - 0.1, tClown]], sfx: [[0.2, 'crunch'], [0.6, 'shock']],
    draw(x, S) { const b = person(x, S, 'buggy', S.t > 0.5 ? 'shock' : 'grin', 540, 1820, 0.8, { pop: S.t0 + 0.05, seed: 8, pose: S.t < 0.5 ? 'sip' : 'shrug' }); if (S.t < 0.5) fruit(x, b.hand.R[0], b.hand.R[1] - 40, 50, S.T, { shadow: false }); else A.mark(x, '!?', b.head[0] + 200, b.head[1] - 220, pop(S.T, S.t0 + 0.5)); } });
  add({ name: 'A clown ever since (same deck): Buggy, split into floating pieces, shouts at the camera, his red nose bobbing; pink CLOWN banner', t0: tClown, t1: end('users'), bg: 'oldShipNight',
    cam: [[1.15, 540, 1000, -0.02], [1.22, 540, 990, 0.03]], banners: [['CLOWN', 'pink', W('users', /^clown/) - 0.1, end('users')]], sfx: [[0.1, 'boing'], [0.6, 'boing']],
    draw(x, S) { split(x, S, 'buggy', 'shout', 540, 1820, 0.8, { head: [Math.sin(S.T * 3) * 40, -120 + Math.sin(S.T * 4) * 20], torso: [-20, -50] }, { seed: 8, pose: 'cheer' }); } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (bathroom): the host\'s hand floats off around behind him and scratches his back; he sighs happily; green FINALLY banner', t0: st('joke'), t1: end('joke'), bg: 'bathroom',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['FINALLY!', 'green', W('joke', /^back/) - 0.1, end('joke')]], sfx: [[0.3, 'swish'], [W('joke', /^back/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 520, 1780, 0.78, { pop: S.t0 + 0.05, seed: 11, pose: 'raise', talk: true }); const sx = h.head[0] + 170, sy = h.head[1] + 420 + Math.sin(S.T * 12) * 20; A.openHand(x, sx, sy, 0.55, '#22a99a');
      for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(sx + 50, sy - 20 + i * 20); x.lineTo(sx + 90, sy - 20 + i * 20); x.lineWidth = 5; x.strokeStyle = A.OL; x.stroke(); } A.sparkle(x, h.head[0] - 160, h.head[1] - 100, 30 * Math.abs(Math.sin(S.T * 4))); } });

  ending(T, { TL, fruit });
  return finish();
}
