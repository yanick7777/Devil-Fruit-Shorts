// Shot plan for the Tori Tori no Mi, Model: Phoenix (Bird-Bird Fruit) short.
// Structure follows the fruit's real uses: flight, self-regeneration, healing others, and Phoenix Brand as the peak.
import * as A from '/engine/art.js';
import { drawTori } from '/shorts/phoenix/fruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawTori(x, cx, cy, R * 0.92, rot, o);
const BLUE = ['#2a6fe0', '#4fd0ff', '#ffe680'];

// ---------------- phoenix effects ----------------
function blueFire(x, cx, by, w, h, t, seed = 0, a = 1) { A.flame(x, cx, by, w, h, t, seed, a, BLUE); }
// a flaming wing made of feather-shaped blue flames, rooted at (sx, sy), pointing to side sd (-1 left, 1 right)
export function wing(x, sx, sy, s, sd, t, flap = 0) {
  x.save(); x.translate(sx, sy); x.scale(sd * s, s); x.rotate(-0.35 - flap * 0.5);
  for (let i = 0; i < 7; i++) { const a = -0.15 + i * 0.16, l = 380 - i * 30; x.save(); x.rotate(a); x.beginPath(); x.moveTo(0, -30); x.quadraticCurveTo(l * 0.5, -70, l, 0); x.quadraticCurveTo(l * 0.5, 50, 0, 30); x.closePath();
    const g = x.createLinearGradient(0, 0, l, 0); g.addColorStop(0, '#2a6fe0'); g.addColorStop(0.7, '#4fd0ff'); g.addColorStop(1, '#ffe680'); x.fillStyle = g; x.globalAlpha = 0.92; x.fill(); x.globalAlpha = 1; x.lineWidth = 6; x.strokeStyle = 'rgba(27,21,48,0.6)'; x.stroke(); x.restore(); }
  x.restore();
}
// someone with blue flame wings on their back
function winged(x, S, who, expr, cx, fy, s, o = {}) { const flap = Math.sin(S.T * (o.fast ? 9 : 4)) * 0.5 + 0.5; const [bx, by] = A.figPoint(380, 700, cx, fy, s);
  wing(x, bx - 60 * s, by, s * 1.1, -1, S.T, flap); wing(x, bx + 60 * s, by, s * 1.1, 1, S.T, flap); const r = person(x, S, who, expr, cx, fy, s, o);
  for (let i = 0; i < 3; i++) blueFire(x, cx - 60 * s + i * 60 * s, fy, 40 * s, 120 * s, S.T, i, 0.8); return r; }
export function phoenixBird(x, cx, cy, s, t) { // full blue-fire phoenix
  x.save(); x.translate(cx, cy); x.scale(s, s); const flap = Math.sin(t * 5) * 0.5 + 0.5;
  wing(x, -40, 0, 1.3, -1, t, flap); wing(x, 40, 0, 1.3, 1, t, flap);
  for (let i = 0; i < 4; i++) { x.save(); x.rotate((i - 1.5) * 0.2); x.beginPath(); x.moveTo(-30, 80); x.quadraticCurveTo(-60 + i * 20, 300, (i - 1.5) * 60, 460); x.lineWidth = 34 - i * 4; x.strokeStyle = i % 2 ? '#4fd0ff' : '#2a6fe0'; x.lineCap = 'round'; x.stroke(); x.restore(); }
  x.beginPath(); x.ellipse(0, 40, 90, 140, 0, 0, 7); A.fs(x, '#4fb0ff', 10); x.beginPath(); x.arc(0, -130, 70, 0, 7); A.fs(x, '#4fb0ff', 10);
  x.beginPath(); x.moveTo(50, -140); x.lineTo(130, -110); x.lineTo(55, -100); x.closePath(); A.fs(x, '#ffcf3a', 7); x.beginPath(); x.arc(25, -145, 12, 0, 7); x.fillStyle = A.OL; x.fill();
  for (let i = 0; i < 3; i++) blueFire(x, -30 + i * 30, -190, 30, 90, t, i + 3);
  x.restore();
}
function wound(x, cx, cy, s, k) { if (k >= 1) return; x.save(); x.globalAlpha = 1 - k; x.beginPath(); x.moveTo(cx - 60 * s, cy - 30 * s); x.lineTo(cx + 60 * s, cy + 30 * s); x.lineWidth = 22 * s; x.strokeStyle = '#c0283a'; x.lineCap = 'round'; x.stroke(); x.restore(); }
function cuffs(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); for (const sd of [-1, 1]) { x.beginPath(); x.arc(sd * 60, 0, 44, 0, 7); x.lineWidth = 26; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 16; x.strokeStyle = '#8a8fa0'; x.stroke(); } x.beginPath(); x.moveTo(-16, 0); x.lineTo(16, 0); x.lineWidth = 14; x.strokeStyle = '#6a6f80'; x.stroke(); x.restore(); }
function bandaid(x, cx, cy, s, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.rrect(x, -110, -34, 220, 68, 34); A.fs(x, '#f2c8a0', 7); A.rrect(x, -40, -30, 80, 60, 10); x.fillStyle = '#ffe8d8'; x.fill(); x.restore(); }
export function phoenixIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { wing(x, -10, 0, 0.4, -1, t, Math.sin(t * 4) * 0.5 + 0.5); wing(x, 10, 0, 0.4, 1, t, Math.sin(t * 4) * 0.5 + 0.5); }
  else if (k === 2) { A.heart(x, 0, 0, 90, '#4fb0ff'); blueFire(x, 0, 60, 80, 170, t, 2, 0.8); }
  else if (k === 3) { A.openHand(x, 0, 30, 0.55); for (let i = 0; i < 3; i++) blueFire(x, -40 + i * 40, 0, 40, 120, t, i); }
  else { A.glow(x, 0, 0, 180, '120,200,255', 0.6); phoenixBird(x, 0, 30, 0.3, t); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a pineapple-shaped fruit', biteDesc: 'little blue flames flicker up from his shoulders', biteSfx: 'whoosh', bannerCol: 'blue', biteCol: '#e8ffe0',
    biteFx(x, S, k) { for (let i = 0; i < 4; i++) blueFire(x, 330 + i * 140, 1350, 50, 160 * ease.outBack(k), S.T, i); },
    calmBg: 'cliffNest', calmDesc: 'giant nest on a cliff', seaHue: 'cyan', seed: 33, nameRe: /^Bird-Bird/,
    revealBg: 'tropicalBeach', revealDesc: 'tropical beach', revealBanner: 'BIRD-BIRD FRUIT: PHOENIX', haloRgb: '120,200,255' });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tMade = W('type', /^made/) - 0.1;
  add({ name: 'Phoenix (aurora night sky): blue flames burst up around the host and a full blue-fire phoenix spreads its wings over the aurora', t0: tThat, t1: tMade, bg: 'auroraSky',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 960, 0.03]], sfx: [[0.1, 'whoosh'], [0.3, 'charge']],
    draw(x, S) { const k = ease.outBack(prog(S.t, 0.1, 0.7)); phoenixBird(x, 540, 900, 1.1 * k, S.T); A.glow(x, 540, 900, 500, '90,180,255', 0.3 * k); } });
  stage(T, { desc: 'altar with blue braziers', bg: 'blueAltar', t0: tMade, t1: end('type'), times: [W('type', /^made/), W('type', /^of$/), W('type', /^blue/), W('type', /^fire/)],
    labels: ['WINGS', 'REGEN', 'HEAL', 'BRAND'], bar: 'PHOENIX POWERS', haloRgb: '120,200,255', icon: phoenixIcon });

  // ---------------- POWER 1: wings and flight ----------------
  const tFly = W('power1', /^fly/) - 0.15;
  add({ name: 'Power 1 (rock arch over the sea): blue flame wings sprout from the host\'s back; blue WINGS banner', t0: st('power1'), t1: tFly, bg: 'seaArch',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 540, 990, -0.01]], banners: [['FLAME WINGS', 'blue', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'whoosh'], [W('power1', /^wings/) - st('power1'), 'charge']],
    draw(x, S) { const k = ease.outBack(prog(S.T, W('power1', /^flaming/) - 0.1, W('power1', /^wings/) + 0.2)); if (k <= 0) person(x, S, 'host', 'calm', 540, 1780, 0.72, { seed: 2 }); else { x.save(); x.translate(540, 1780); x.scale(1, 1); x.restore(); const [bx, by] = A.figPoint(380, 700, 540, 1780, 0.72); wing(x, bx - 40, by, 0.8 * k, -1, S.T, 0.3); wing(x, bx + 40, by, 0.8 * k, 1, S.T, 0.3); person(x, S, 'host', 'grin', 540, 1780, 0.72, { seed: 2, pose: 'cheer' }); } } });
  add({ name: 'Power 1 flight (same arch, wide): the winged host swoops through the arch over the waves, speed lines; the viking on the cliff gapes, ?', t0: tFly, t1: end('power1'), bg: 'seaArch',
    cam: [[1.0, 540, 980, 0.03], [1.06, 560, 960, 0.045]], sfx: [[0.05, 'zip']],
    draw(x, S) { const u = ease.smoother(prog(S.t, 0, S.dur)); const hx = lerp(150, 900, u), hy = 1250 - Math.sin(u * Math.PI) * 250;
      const e = person(x, S, 'viking', 'shock', 900, 1500, 0.4, { seed: 3, pose: 'shrug', flip: true });
      x.save(); x.translate(hx, hy); x.rotate(0.6); winged(x, S, 'host', 'grin', 0, 0, 0.5, { pose: 'cheer', fast: true, seed: 2 }); x.restore(); A.speedLines(x, hx - 260, hy - 300, S.T, 10, 200, Math.PI);
      A.mark(x, '?', e.head[0] - 100, e.head[1] - 140, pop(S.T, S.t0 + 0.3), 0.1); } });

  // ---------------- POWER 2: regeneration ----------------
  const tHeal = W('power2', /^heals/) - 0.1;
  addSplit({ name: 'Power 2 evolve (field-hospital tent): wings icon becomes the heart icon, flash + glow ring; green REGEN banner; the viking\'s axe leaves a cut on the host\'s arm, blue flames flare up and the cut disappears', t0: st('power2'), t1: end('power2'), bg: 'fieldHospital',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['REGENERATION', 'green', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^wound/) - st('power2'), 'slash'], [tHeal - st('power2'), 'shimmer']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, phoenixIcon)) return;
      const tw = W('power2', /^wound/) - S.t0, th = tHeal - S.t0;
      const e = person(x, S, 'viking', S.t > th ? 'shock' : 'shout', 820, 1780, 0.64, { seed: 3, pose: S.t > tw - 0.2 && S.t < tw + 0.4 ? 'punch' : 'shrug', flip: true, pop: S.t0 + 0.45 });
      const h = person(x, S, 'host', S.t > th ? 'smug' : S.t > tw ? 'hit' : 'calm', 330, 1780, 0.68, { seed: 2, pose: 'shrug', pop: S.t0 + 0.45 });
      if (S.t > tw) { wound(x, h.head[0] + 20, h.head[1] + 330, 1, prog(S.t, th, th + 0.6)); if (S.t > th) for (let i = 0; i < 3; i++) blueFire(x, h.head[0] - 30 + i * 40, h.head[1] + 380, 50, 160 * (1 - prog(S.t, th + 0.8, th + 1.4)), S.T, i); }
      if (S.t > th + 0.4) A.mark(x, '!?', e.head[0] + 140, e.head[1] - 200, pop(S.T, S.t0 + th + 0.4));
    } },
    tHeal, [[1.35, 400, 1050, -0.02], [1.42, 410, 1040, -0.035]], 'Power 2 close (same tent): blue flames lick over the arm and the cut closes up');

  // ---------------- POWER 3: heal others ----------------
  add({ name: 'Power 3 evolve (island village with a statue): heart icon becomes the healing-hand icon; the host presses blue flames onto a bruised, bandaged viking who perks up and cheers; green HEAL banner', t0: st('power3'), t1: end('power3'), bg: 'sphinxVillage',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['HEAL OTHERS', 'green', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^heal/) - st('power3'), 'shimmer']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, phoenixIcon)) return;
      const th = W('power3', /^heal/) - S.t0, ok = S.t > th + 0.4;
      const e = person(x, S, 'viking', ok ? 'grin' : 'sad', 760, 1780, 0.64, { seed: 3, pose: ok ? 'cheer' : 'idle', flip: true, pop: S.t0 + 0.45 });
      if (!ok) { bandaid(x, e.head[0] + 40, e.head[1] - 20, 0.6, 0.5); A.sweat(x, e.head[0] - 140, e.head[1] - 60, 1); }
      const h = person(x, S, 'host', 'calm', 300, 1780, 0.66, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 });
      for (let i = 0; i < 4; i++) blueFire(x, h.hand.R[0] + 40 + i * 50, h.hand.R[1] + 30, 50, 130, S.T, i, 0.9);
      if (ok) A.sparkle(x, e.head[0], e.head[1] - 230, 40 * Math.abs(Math.sin(S.T * 5)));
    } });

  // ---------------- PEAK: Phoenix Brand ----------------
  const tSlam = W('peak', /^slams/) - 0.1;
  addSplit({ name: 'Peak (sunset clouds): the heal icon gives way to the phoenix icon, gold halo; gold PHOENIX BRAND banner; the winged host dives out of the sky, foot first, wrapped in blue fire', t0: st('peak'), t1: end('peak'), bg: 'sunsetClouds',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['PHOENIX BRAND', 'gold', W('peak', /^Phoenix/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Phoenix/) - st('peak'), 'charge'], [W('peak', /^kick/) - st('peak'), 'whoosh'], [tSlam - st('peak') + 0.4, 'impact']],
    draw(x, S) {
      halo(x, 540, 900, 620, '120,200,255', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5), '160,220,255'); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, phoenixIcon); return; }
      const k = ease.smoother(prog(S.T, W('peak', /^Phoenix/), tSlam + 0.4)), hx = lerp(250, 560, k), hy = lerp(1050, 1550, k);
      x.save(); x.translate(hx, hy); x.rotate(-0.6); winged(x, S, 'host', 'shout', 0, 0, 0.55, { pose: 'cheer', seed: 7 }); x.restore();
      for (let i = 0; i < 5; i++) blueFire(x, hx - 40 + i * 30, hy + 40, 60, 260, S.T, i + 10, 0.85);
      A.speedLines(x, hx - 200, hy - 300, S.T, 12, 260, -2.2);
      if (S.T > W('peak', /^Phoenix/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Phoenix/), W('peak', /^Phoenix/) + 0.3))); S.flashCol = '200,235,255'; }
    } },
    tSlam, [[1.15, 600, 1300, -0.02], [1.22, 600, 1290, -0.04]], 'Peak impact (same sky): the flaming kick slams into the viking\'s shield; blue fire shockwave, impact star, 7-frame shake');
  const pk = T.shots[T.shots.length - 1], pkd = pk.draw;
  pk.draw = function (x, S) { const hit = S.T > tSlam + 0.4;
    const e = person(x, S, 'viking', hit ? 'hit' : 'shock', 720, 1800, 0.62, { seed: 3, pose: 'shrug', flip: true, rot: hit ? 0.35 * prog(S.T, tSlam + 0.4, tSlam + 0.8) : 0 });
    pkd.call(this, x, S);
    if (hit) { A.glowRing(x, 640, 1400, 500 * prog(S.T, tSlam + 0.4, tSlam + 0.9), 1 - prog(S.T, tSlam + 0.6, tSlam + 1.0), '120,200,255'); A.impactStar(x, 660, 1350, 200 * (1 - prog(S.T, tSlam + 0.6, tSlam + 1.0)), 0.3); if (S.T < tSlam + 0.4 + 7 * F) S.shake = 1.1; } };

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (prison cell): a pair of grey seastone cuffs swings from a chain in the dark cell; push-in with roll, low sting; red LIMIT banner', t0: st('twist'), t1: end('twist'), bg: 'jailCell', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 980, 0.07]], banners: [['THE LIMIT', 'red', W('twist', /^limit/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.3, 'tick']],
    draw(x, S) { const sw = Math.sin(S.T * 2) * 0.15; x.save(); x.translate(540, -100); x.rotate(sw); x.beginPath(); x.moveTo(0, 0); x.lineTo(0, 920); x.lineWidth = 12; x.strokeStyle = '#6a6f80'; x.stroke(); cuffs(x, 0, 1000, 1.6); x.restore(); } });
  const tMar = W('truth', /^Marines/) - 0.1;
  add({ name: 'Cuffed (Marine headquarters): seastone cuffs snap shut on the winged host; his blue flames flicker out and the wings vanish; !?', t0: st('truth'), t1: tMar, bg: 'marineHQ',
    cam: [[1.1, 540, 1000, -0.02], [1.18, 540, 1000, -0.04]], sfx: [[0.25, 'thunk'], [0.5, 'shock']],
    draw(x, S) { const c = S.t > 0.25, k = prog(S.t, 0.25, 0.9); const [bx, by] = A.figPoint(380, 700, 540, 1780, 0.72);
      if (k < 1) { x.save(); x.globalAlpha = 1 - k; wing(x, bx - 40, by, 0.8, -1, S.T, 0.3); wing(x, bx + 40, by, 0.8, 1, S.T, 0.3); x.restore(); }
      const h = person(x, S, 'host', c ? 'shock' : 'grin', 540, 1780, 0.72, { seed: 2, pose: 'hold' }); if (c) { cuffs(x, h.hand.R[0] - 30, h.hand.R[1], 0.7 * pop(S.T, S.t0 + 0.25)); A.mark(x, '!?', h.head[0] + 200, h.head[1] - 220, pop(S.T, S.t0 + 0.5)); } } });
  add({ name: 'Marineford (same HQ, wide): a red MARINEFORD tag slams onto the scene over the cuffed host; red MARINEFORD banner', t0: tMar, t1: end('truth'), bg: 'marineHQ',
    cam: [[1.0, 540, 980, 0.02], [1.06, 540, 960, 0.035]], banners: [['MARINEFORD', 'red', tMar + 0.2, end('truth')]], sfx: [[0.2, 'stamp']],
    draw(x, S) { const h = person(x, S, 'host', 'worried', 540, 1780, 0.62, { seed: 2, pose: 'hold' }); cuffs(x, h.hand.R[0] - 30, h.hand.R[1], 0.6); A.sweat(x, h.head[0] + 170, h.head[1] - 40, 1); } });

  // ---------------- USERS ----------------
  add({ name: 'Marco (big ship deck, white whale figurehead): Marco stands with blue flame wings spread, sleepy smirk; gold 1ST DIVISION banner', t0: st('users'), t1: end('users'), bg: 'mobyDeck',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['1ST DIVISION COMMANDER', 'gold', W('users', /^first/) - 0.1, end('users')]], sfx: [[0, 'whoosh'], [0.3, 'charge']],
    draw(x, S) { winged(x, S, 'marco', 'smug', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'shrug' }); } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (pharmacy shelves of band-aids): the host shrugs, a tiny blue flame closes a paper cut on his finger; the band-aid box gets tossed away; pink NO BAND-AIDS banner', t0: st('joke'), t1: end('joke'), bg: 'firstAid',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO BAND-AIDS', 'pink', W('joke', /^band-aid/) - 0.1, end('joke')]], sfx: [[0.3, 'shimmer'], [0.9, 'whoosh'], [W('joke', /^band-aid/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 480, 1780, 0.78, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); blueFire(x, h.hand.R[0] + 20, h.hand.R[1] - 30, 40, 110, S.T, 4, 0.9);
      const k = prog(S.t, 0.9, 1.6); if (k < 1) bandaid(x, lerp(820, 1200, k), lerp(1300, 800, k) + k * k * 400, 0.8, k * 6); } });

  ending(T, { TL, fruit });
  return finish();
}
