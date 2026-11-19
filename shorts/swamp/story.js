// Shot plan for the Numa Numa no Mi (Swamp-Swamp Fruit) short.
// Structure follows the fruit's real uses: attacks sink in, swallowing and storing, the swamp ball, and the stomach Gatling gun as the peak.
import * as A from '/engine/art.js';
import { drawSwirlFruit } from '/engine/swirlFruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawSwirlFruit(x, cx, cy, R, rot, { pal: 'green', ...o });
const MUD = '#6b5a3a', MUDL = '#8a7a50';

// ---------------- swamp effects ----------------
function mudPool(x, cx, cy, rx, t, k = 1) { if (k <= 0) return; x.beginPath(); x.ellipse(cx, cy, rx * k, rx * 0.25 * k, 0, 0, 7); A.fs(x, MUD, 10);
  x.beginPath(); x.ellipse(cx - rx * 0.2 * k, cy - rx * 0.05 * k, rx * 0.5 * k, rx * 0.08 * k, 0, 0, 7); x.fillStyle = MUDL; x.fill();
  for (let i = 0; i < 4; i++) { const ph = (t * 0.8 + i / 4) % 1; x.beginPath(); x.arc(cx + (i - 1.5) * rx * 0.4 * k, cy - ph * 20, 10 * (1 - ph) * k, 0, 7); x.fillStyle = MUDL; x.fill(); } }
// the host as a swamp man: body above the waist, a swamp mound below (k 0..1 how much is swamp)
function swampMan(x, S, who, expr, cx, fy, s, k, o = {}) {
  const wy = fy - 575 * s; x.save(); x.beginPath(); x.rect(cx - 700 * s, fy - 2000 * s, 1400 * s, 2000 * s - (fy - wy) * k + 20 * s); x.clip();
  const r = person(x, S, who, expr, cx, fy, s, o); x.restore();
  if (k > 0) { const top = fy - (fy - wy) * k; x.beginPath(); x.moveTo(cx - 170 * s, top); x.bezierCurveTo(cx - 260 * s, fy - 60 * s, cx - 420 * s, fy, cx - 500 * s, fy); x.lineTo(cx + 500 * s, fy); x.bezierCurveTo(cx + 420 * s, fy, cx + 260 * s, fy - 60 * s, cx + 170 * s, top); x.quadraticCurveTo(cx, top + 30 * s, cx - 170 * s, top); A.fs(x, MUD, 10 * s);
    for (let i = 0; i < 3; i++) { const ph = (S.T * 0.9 + i / 3) % 1; x.beginPath(); x.arc(cx + (i - 1) * 120 * s, top + 120 * s - ph * 60 * s, 18 * s * (1 - ph), 0, 7); x.fillStyle = MUDL; x.fill(); } }
  return r;
}
function cannonball(x, cx, cy, r) { x.beginPath(); x.arc(cx, cy, r, 0, 7); A.fs(x, '#2a2a36', 8); x.beginPath(); x.arc(cx - r * 0.35, cy - r * 0.35, r * 0.25, 0, 7); x.fillStyle = 'rgba(255,255,255,0.5)'; x.fill(); }
function splash(x, cx, cy, k) { if (k <= 0 || k >= 1) return; for (let i = 0; i < 7; i++) { const a = Math.PI * (1.1 + i / 6 * 0.8), d = 140 * ease.outCubic(k); x.beginPath(); x.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.8 + 60 * k * k, 18 * (1 - k), 0, 7); A.fs(x, MUD, 5); } }
function chest(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); A.rrect(x, -110, -40, 220, 120, 10); A.fs(x, '#8a5a3c', 9); x.beginPath(); x.moveTo(-110, -40); x.quadraticCurveTo(0, -130, 110, -40); x.closePath(); A.fs(x, '#a26d45', 9); A.rrect(x, -20, -40, 40, 50, 6); A.fs(x, '#ffcf3a', 6); x.fillStyle = '#ffe680'; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(-60 + i * 30, -60 - (i % 2) * 14, 14, 0, 7); x.fill(); } x.restore(); }
function mudBall(x, cx, cy, r, t) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = 'rgba(107,90,58,0.85)'; x.fill(); x.lineWidth = 10; x.strokeStyle = A.OL; x.stroke();
  for (let i = 0; i < 4; i++) { const ph = (t + i / 4) % 1; x.beginPath(); x.arc(cx + (i - 1.5) * r * 0.4, cy + r * 0.5 - ph * r, 10 * (1 - ph), 0, 7); x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 4; x.stroke(); } }
function gatling(x, cx, cy, s, t, firing) { // a crank Gatling gun with a spinning barrel cluster
  x.save(); x.translate(cx, cy); x.scale(s, s); A.rrect(x, -60, -50, 120, 100, 16); A.fs(x, '#5a5a6a', 9);
  for (let i = 0; i < 5; i++) { const a = t * (firing ? 30 : 2) + i / 5 * 6.283; A.rrect(x, 40, -10 + Math.sin(a) * 26, 260, 20, 8); A.fs(x, i % 2 ? '#8a8a9a' : '#6a6a7a', 5); }
  A.rrect(x, 290, -40, 30, 80, 8); A.fs(x, '#3a3a46', 6); x.beginPath(); x.moveTo(-60, 0); x.lineTo(-120, -50); x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke(); x.beginPath(); x.arc(-120, -50, 16, 0, 7); A.fs(x, '#c0392b', 5);
  if (firing) for (let i = 0; i < 3; i++) { const ph = (t * 6 + i / 3) % 1; x.beginPath(); x.arc(340 + ph * 500, (i - 1) * 30, 10, 0, 7); A.fs(x, '#ffcf3a', 4); }
  x.restore();
}
function barrel(x, cx, by, s, t, shake) { x.save(); x.translate(cx + (shake ? Math.sin(t * 40) * 6 : 0), by); x.scale(s, s); x.beginPath(); x.moveTo(-150, 0); x.quadraticCurveTo(-200, -230, -150, -460); x.lineTo(150, -460); x.quadraticCurveTo(200, -230, 150, 0); x.closePath(); A.fs(x, '#8a5a3c', 10);
  x.strokeStyle = '#3a2a20'; x.lineWidth = 16; for (const y of [-80, -380]) { x.beginPath(); x.moveTo(-170, y); x.quadraticCurveTo(0, y + 20, 170, y); x.stroke(); } x.beginPath(); x.ellipse(0, -460, 150, 30, 0, 0, 7); A.fs(x, '#a26d45', 8); x.restore(); }
function backpackIcon(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); A.rrect(x, -90, -110, 180, 220, 40); A.fs(x, '#3f9bff', 9); A.rrect(x, -60, 10, 120, 80, 20); A.fs(x, '#2a7ad8', 7); x.restore(); }
export function swampIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { mudPool(x, 0, 60, 150, t); cannonball(x, 0, 40 - 30 * Math.abs(Math.sin(t * 2)), 40); }
  else if (k === 2) { mudPool(x, 0, 60, 150, t); chest(x, 0, 40, 0.6); }
  else if (k === 3) { x.beginPath(); x.arc(0, 0, 50, 0, 7); A.fs(x, '#f6c690', 7); mudBall(x, 0, 0, 90, t); }
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); gatling(x, -60, 0, 0.5, t, true); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a swamp-green swirl fruit', biteDesc: 'his legs start melting into a puddle of mud under the desk', biteSfx: 'splash', bannerCol: 'green', biteCol: '#e8ffd0',
    biteFx(x, S, k) { mudPool(x, 540, 1560, 420, S.T, ease.outCubic(k)); },
    calmBg: 'bayou', calmDesc: 'misty bayou', seaHue: 'olive', seed: 25, nameRe: /^Swamp-Swamp/,
    revealBg: 'lilyPond', revealDesc: 'lily pond', revealBanner: 'SWAMP-SWAMP FRUIT', haloRgb: '170,230,140',
    revealFx(x, S) { mudPool(x, 540, 1230, 300, S.T, 1); } });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tBot = W('type', /^bottomless/) - 0.1;
  add({ name: 'Turning to swamp (mangrove roots): from the waist down the host melts into a bubbling mud mound; the fisherman steps back', t0: tThat, t1: tBot, bg: 'mangrove',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'whoosh'], [0.3, 'splash']],
    draw(x, S) { const k = ease.outCubic(prog(S.t, 0.1, 0.8)); const e = person(x, S, 'fisher', k > 0.5 ? 'shock' : 'calm', 900, 1780, 0.6, { seed: 3, pose: k > 0.5 ? 'shrug' : 'idle', flip: true });
      swampMan(x, S, 'host', 'grin', 420, 1780, 0.68, k, { pose: 'cheer', seed: 2 }); if (k > 0.5) A.mark(x, '!?', e.head[0] - 140, e.head[1] - 190, pop(S.T, S.t0 + 0.6)); } });
  stage(T, { desc: 'wooden stage over a marsh', bg: 'marshStage', t0: tBot, t1: end('type'), times: [W('type', /^bottomless/), W('type', /^bottomless/) + 0.3, W('type', /^swamp/), W('type', /^swamp/) + 0.35],
    labels: ['SINK', 'SWALLOW', 'MUD BALL', 'GATLING'], bar: 'SWAMP TRICKS', haloRgb: '170,230,140', icon: swampIcon });

  // ---------------- POWER 1: attacks sink in ----------------
  const tCan = W('power1', /^cannonballs/) - 0.15;
  addSplit({ name: 'Power 1 (stone sea fort): the fisherman throws a punch that sinks into the swamp-host up to the elbow; gold SINK banner', t0: st('power1'), t1: end('power1'), bg: 'seaFort',
    cam: [[1.05, 560, 1000, -0.02], [1.1, 580, 990, -0.01]], banners: [['SINK', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.3, 'whoosh'], [0.6, 'splash']],
    draw(x, S) {
      const e = person(x, S, 'fisher', S.t > 0.7 ? 'shock' : 'shout', 720, 1780, 0.64, { seed: 3, pose: 'punch', flip: true });
      swampMan(x, S, 'host', 'smug', 360, 1780, 0.68, 1, { pose: 'shrug', seed: 2 }); mudPool(x, e.hand.R[0], e.hand.R[1] + 10, 70, S.T, ease.outBack(prog(S.t, 0.6, 0.9)));
      if (S.t > 0.7) A.mark(x, '!?', e.head[0] + 150, e.head[1] - 200, pop(S.T, S.t0 + 0.8));
    } },
    tCan, [[1.0, 540, 980, 0.02], [1.05, 540, 960, 0.03]], 'Power 1 cannon (same fort, wider): a cannon fires, the cannonball sinks right into the swamp-host with a splash; he grins');
  // overlay the cannonball on the split second half
  const p1b = T.shots[T.shots.length - 1], p1draw = p1b.draw;
  p1b.draw = function (x, S) { const k = prog(S.T, tCan, tCan + 0.7);
    x.beginPath(); x.arc(980, 750, 70, 0, 7); A.fs(x, '#3a3346', 9);
    if (k < 1) cannonball(x, lerp(980, 380, k), lerp(750, 1300, k) - Math.sin(k * Math.PI) * 300, 50);
    swampMan(x, S, 'host', k >= 1 ? 'grin' : 'calm', 360, 1780, 0.68, 1, { pose: 'shrug', seed: 2 }); splash(x, 380, 1320, prog(S.T, tCan + 0.7, tCan + 1.2));
    if (k > 0 && k < 0.15) { A.impactStar(x, 940, 750, 120, 0.2); } };

  // ---------------- POWER 2: swallow and store ----------------
  const tKeep = W('power2', /^keep/) - 0.1;
  addSplit({ name: 'Power 2 evolve (treasure cave): sink icon becomes the chest icon, flash + glow ring; gold SWALLOW banner; a treasure chest and the startled fisherman slide into the swamp-host\'s mud and vanish', t0: st('power2'), t1: end('power2'), bg: 'treasureCave',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['SWALLOW', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^people/) - st('power2'), 'splash'], [W('power2', /^treasure/) - st('power2'), 'splash']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, swampIcon)) return;
      const tp = W('power2', /^people/) - S.t0, tt = W('power2', /^treasure/) - S.t0;
      mudPool(x, 560, 1760, 480, S.T, 1);
      const ke = ease.smoother(prog(S.t, tp, tp + 0.9)); if (ke < 1) { x.save(); x.beginPath(); x.rect(0, 0, 1080, 1760); x.clip(); person(x, S, 'fisher', 'shock', lerp(860, 700, ke), 1780 + ke * 1000, 0.56, { seed: 3, pose: 'cheer' }); x.restore(); }
      const kc = ease.smoother(prog(S.t, tt, tt + 0.9)); if (kc < 1) { x.save(); x.beginPath(); x.rect(0, 0, 1080, 1760); x.clip(); chest(x, lerp(220, 380, kc), 1700 + kc * 300, 1); x.restore(); }
      swampMan(x, S, 'host', 'grin', 540, 1780, 0.66, 1, { pose: 'shrug', seed: 2, pop: S.t0 + 0.45 });
    } },
    tKeep, [[1.3, 540, 1250, 0.03], [1.38, 540, 1240, 0.045]], 'Power 2 storage (same cave, closer): a cut-away of the swamp belly shows the chest and the fisherman floating inside');
  const p2b = T.shots[T.shots.length - 1];
  p2b.draw = function (x, S) { swampMan(x, S, 'host', 'smug', 540, 1780, 0.66, 1, { pose: 'shrug', seed: 2 });
    x.save(); x.beginPath(); x.ellipse(540, 1660, 260, 110, 0, 0, 7); x.fillStyle = 'rgba(40,30,20,0.6)'; x.fill(); x.clip(); chest(x, 430, 1680 + Math.sin(S.T * 2) * 10, 0.5); person(x, S, 'fisher', 'worried', 650, 1700 + Math.sin(S.T * 2 + 1) * 10, 0.16, { seed: 3, pose: 'shrug', rot: 0.4 }); x.restore();
    A.mark(x, '?', 760, 1500, pop(S.T, tKeep + 0.4), 0.2); };

  // ---------------- POWER 3: swamp ball ----------------
  const tBreath = W('power3', /^breathe/) - 0.3;
  addSplit({ name: 'Power 3 evolve (foggy marsh): chest icon becomes the mud-ball icon; the host flings a blob of swamp that wraps the fisherman\'s head in a bubbling ball; he flails; blue MUD BALL banner', t0: st('power3'), t1: end('power3'), bg: 'fogMarsh',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['MUD BALL', 'blue', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^ball/) - st('power3'), 'splash'], [tBreath - st('power3'), 'splash']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, swampIcon)) return;
      const tb = W('power3', /^ball/) - S.t0, k = prog(S.t, tb - 0.4, tb);
      const e = person(x, S, 'fisher', S.t > tb ? 'worried' : 'calm', 800, 1780, 0.66, { seed: 3, pose: S.t > tb ? 'cheer' : 'idle', flip: true, rot: S.t > tb ? Math.sin(S.T * 12) * 0.05 : 0, pop: S.t0 + 0.45 });
      const h = person(x, S, 'host', 'smug', 260, 1780, 0.66, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 });
      if (k > 0 && k < 1) mudBall(x, lerp(h.hand.R[0], e.head[0], k), lerp(h.hand.R[1], e.head[1], k) - Math.sin(k * Math.PI) * 200, 50, S.T);
      if (S.t >= tb) mudBall(x, e.head[0], e.head[1] + 20, 150 * ease.outBack(prog(S.t, tb, tb + 0.3)), S.T);
    } },
    tBreath, [[1.4, 760, 900, -0.03], [1.48, 760, 890, -0.045]], 'Power 3 close (same marsh): bubbles rise from inside the swamp ball around his head');

  // ---------------- PEAK: stomach Gatling ----------------
  const tStom = W('peak', /^stomach/) - 0.3;
  addSplit({ name: 'Peak (wrecked ship deck at sunset): the mud-ball icon gives way to the Gatling icon, gold halo; gold GATLING banner; a crank Gatling gun rises out of the swamp-host\'s stomach and rattles off shots; the fisherman dives for cover', t0: st('peak'), t1: end('peak'), bg: 'wreckDeck',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['GATLING GUN', 'gold', W('peak', /^Gatling/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Gatling/) - st('peak'), 'charge'], [tStom - st('peak') + 0.3, 'drums']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, swampIcon); return; }
      const tg = W('peak', /^Gatling/) - S.t0, k = ease.outBack(prog(S.t, tg, tg + 0.6)), fire = S.T > tStom + 0.3;
      const e = person(x, S, 'fisher', fire ? 'shock' : 'calm', 900, 1780, 0.56, { seed: 3, pose: fire ? 'cheer' : 'idle', flip: true, rot: fire ? 0.3 : 0 });
      const h = swampMan(x, S, 'host', 'grin', 340, 1780, 0.68, 1, { pose: 'shrug', seed: 7 });
      if (k > 0) gatling(x, 400, 1400 - 120 * k, 0.9 * k, S.T, fire);
      if (fire) { A.mark(x, '!?', e.head[0] - 130, e.head[1] - 180, pop(S.T, tStom + 0.5)); if (Math.floor(S.T * 15) % 2) S.shake = 0.25; }
      if (S.T > W('peak', /^Gatling/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Gatling/), W('peak', /^Gatling/) + 0.3))); S.flashCol = '255,246,200'; }
    } },
    tStom, [[1.3, 560, 1300, -0.02], [1.38, 580, 1290, -0.035]], 'Peak close (same deck): the barrels spin and spit shots, muzzle shake');

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (cellar full of barrels): one barrel lid wobbles in the dark; push-in with roll, low sting; red CATCH banner', t0: st('twist'), t1: end('twist'), bg: 'cellarBarrels', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 980, 0.07]], banners: [['THE CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.4, 'thunk']],
    draw(x, S) { barrel(x, 540, 1780, 1.3, S.T, S.t > 0.4); A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.5), 0.2); } });
  const tCant = W('truth', /^can't$/) - 0.1;
  add({ name: 'Stuck (pantry of jars): the swamp-host oozes into a glass jar, a lid slams on, and he can\'t pull his body back out; red STUCK banner; sweat and !?', t0: st('truth'), t1: end('truth'), bg: 'pantry',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['STUCK!', 'red', tCant - 0.1, end('truth')]], sfx: [[0.2, 'splash'], [W('truth', /^fit/) - st('truth'), 'thunk'], [tCant - st('truth'), 'shock']],
    draw(x, S) {
      const lid = S.T > W('truth', /^fit/), k = ease.outCubic(prog(S.t, 0.1, 1.0));
      A.rrect(x, 330, 1000, 420, 560, 60); x.fillStyle = 'rgba(200,240,255,0.35)'; x.fill(); x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke();
      x.save(); A.rrect(x, 340, 1010, 400, 540, 54); x.clip(); x.fillStyle = MUD; x.fillRect(330, 1560 - 420 * k, 420, 420 * k); person(x, S, 'host', lid ? 'worried' : 'calm', 540, 1520 + (1 - k) * 300, 0.3, { seed: 2, pose: lid ? 'cheer' : 'idle' }); x.restore();
      if (lid) { A.rrect(x, 320, 950 - 30 * (1 - prog(S.T, W('truth', /^fit/), W('truth', /^fit/) + 0.2)), 440, 70, 16); A.fs(x, '#d9dce6', 10); A.sweat(x, 700, 1100, 1); A.mark(x, '!?', 820, 900, pop(S.T, tCant)); }
    } });

  // ---------------- USERS ----------------
  const tFranky = W('users', /^Franky/) - 0.1;
  add({ name: 'Caribou (bubble grove): Caribou grins wide, half sunk in his own swamp; purple CARIBOU banner', t0: st('users'), t1: tFranky, bg: 'bubbleGrove',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['CARIBOU', 'pink', st('users') + 0.2, tFranky]], sfx: [[0, 'whoosh'], [0.3, 'splash']],
    draw(x, S) { swampMan(x, S, 'caribou', 'grin', 540, 1820, 0.84, 1, { pop: S.t0 + 0.05, seed: 8, pose: 'shrug' }); } });
  add({ name: 'Sealed (cellar of barrels, wide): Franky slams a lid onto a barrel with Caribou inside; the barrel rattles; blue SEALED banner', t0: tFranky, t1: end('users'), bg: 'cellarBarrels',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['SEALED!', 'blue', W('users', /^barrel/) - 0.1, end('users')]], sfx: [[0.3, 'thunk'], [0.8, 'impact']],
    draw(x, S) {
      const lid = S.T > W('users', /^barrel/) - 0.1;
      barrel(x, 720, 1800, 1.0, S.T, lid);
      if (!lid) { x.save(); x.beginPath(); x.rect(0, 0, 1080, 1340); x.clip(); person(x, S, 'caribou', 'shock', 720, 1340 + 900 * 0.42, 0.42, { seed: 8, pose: 'cheer' }); x.restore(); }
      person(x, S, 'franky', 'grin', 280, 1800, 0.66, { seed: 4, pose: lid ? 'cheer' : 'raise' });
      if (lid) { A.mark(x, '!?', 900, 1100, pop(S.T, W('users', /^barrel/) + 0.2), 0.2); if (S.T < W('users', /^barrel/) + 7 * F) S.shake = 0.8; }
    } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (school hallway with lockers): the host drops books, a lunchbox and a basketball into his swamp belly, no backpack; crossed-out backpack icon; gold NO BACKPACK banner', t0: st('joke'), t1: end('joke'), bg: 'schoolHall',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO BACKPACK', 'gold', W('joke', /^backpack/) - 0.1, end('joke')]], sfx: [[0.3, 'splash'], [0.7, 'splash'], [W('joke', /^backpack/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      swampMan(x, S, 'host', 'smug', 420, 1780, 0.72, 0.6, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug', talk: true });
      for (let i = 0; i < 3; i++) { const k = prog(S.t, 0.2 + i * 0.4, 0.6 + i * 0.4); if (k < 1) { const px = lerp(780, 430, k), py = lerp(800, 1550, k) - Math.sin(k * Math.PI) * 200; x.save(); x.translate(px, py); x.rotate(k * 5); A.rrect(x, -50, -35, 100, 70, 10); A.fs(x, ['#e8402e', '#ffcf3a', '#ff8a2e'][i], 7); x.restore(); } }
      const p = pop(S.T, W('joke', /^backpack/)); if (p > 0) { backpackIcon(x, 840, 560, 0.8 * p); x.beginPath(); x.moveTo(760, 470); x.lineTo(920, 650); x.lineWidth = 20; x.strokeStyle = '#e8303c'; x.lineCap = 'round'; x.stroke(); }
    } });

  ending(T, { TL, fruit });
  return finish();
}
