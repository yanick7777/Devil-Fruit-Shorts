// Shot plan for the Bisu Bisu no Mi (Bis-Bis Fruit) short.
// Structure follows the fruit's real uses: hard biscuits, a biscuit army, fighting from inside a soldier, and rock-hard packed biscuits as the peak.
import * as A from '/engine/art.js';
import { drawSwirlFruit } from '/engine/swirlFruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawSwirlFruit(x, cx, cy, R, rot, { pal: 'orange', ...o });
const BIS = '#e8b86a', BISD = '#c9984a';

// ---------------- biscuit effects ----------------
function holes(x, cx, cy, w, h, n = 6) { x.fillStyle = BISD; for (let i = 0; i < n; i++) { x.beginPath(); x.arc(cx + (((i * 37) % 10) / 10 - 0.5) * w, cy + (((i * 53) % 10) / 10 - 0.5) * h, 7, 0, 7); x.fill(); } }
export function biscuit(x, cx, cy, r, rot = 0, soft = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); x.beginPath(); for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283, rr = r * (1 + (i % 2 ? 0.05 : 0) - soft * 0.15 * Math.sin(i * 3)); x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr * (1 + soft * 0.2)); } x.closePath(); A.fs(x, soft > 0.5 ? '#d9c08a' : BIS, Math.max(5, r * 0.07)); holes(x, 0, 0, r, r, 7); x.restore(); }
// a biscuit soldier: knobbly biscuit armour, helmet, shield, spear; optional window showing someone inside
export function soldier(x, S, cx, fy, s, o = {}) {
  x.save(); x.translate(cx, fy); x.scale(s * (o.flip ? -1 : 1), s); const bob = Math.abs(Math.sin(S.T * (o.march ? 7 : 1.5) + (o.seed || 0))) * (o.march ? 16 : 4); x.translate(0, -bob);
  for (const sd of [-1, 1]) { A.rrect(x, sd * 70 - 40, -300, 80, 300, 30); A.fs(x, BIS, 9); }
  A.rrect(x, -170, -760, 340, 480, 90); A.fs(x, BIS, 10); holes(x, 0, -520, 240, 340, 10);
  x.beginPath(); x.arc(0, -880, 130, 0, 7); A.fs(x, BIS, 10); A.rrect(x, -150, -1000, 300, 90, 40); A.fs(x, BISD, 9); A.rrect(x, -90, -900, 180, 40, 12); A.fs(x, '#3a2a20', 6);
  A.rrect(x, 150, -1100, 30, 1100, 10); A.fs(x, '#8a5a3c', 7); x.beginPath(); x.moveTo(130, -1100); x.lineTo(165, -1220); x.lineTo(200, -1100); x.closePath(); A.fs(x, BISD, 7);
  x.beginPath(); x.arc(-190, -520, 130, 0, 7); A.fs(x, BISD, 10); x.beginPath(); x.arc(-190, -520, 60, 0, 7); A.fs(x, BIS, 7);
  if (o.inside) { A.rrect(x, -110, -720, 220, 220, 30); A.fs(x, '#3a2a20', 8); x.save(); A.rrect(x, -104, -714, 208, 208, 26); x.clip(); o.inside(x); x.restore(); }
  if (o.crack) { x.beginPath(); x.moveTo(-60, -760); x.lineTo(10, -600); x.lineTo(-40, -480); x.lineTo(40, -330); x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke(); }
  x.restore();
}
function raindrops(x, t, n = 60) { x.save(); x.strokeStyle = 'rgba(180,210,255,0.8)'; x.lineWidth = 5; for (let i = 0; i < n; i++) { const px = ((i * 97) % 1100), py = ((i * 211 + t * 900) % 2000) - 40; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 8, py + 50); x.stroke(); } x.restore(); }
function layers(x, cx, cy, n, s) { x.save(); x.translate(cx, cy); x.scale(s, s); for (let i = 0; i < n; i++) { A.rrect(x, -160, -20 - i * 34, 320, 44, 16); A.fs(x, i % 2 ? BIS : BISD, 7); } x.restore(); }
export function bisIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) biscuit(x, 0, 0, 120);
  else if (k === 2) { for (let i = 0; i < 3; i++) soldier(x, { T: t }, -110 + i * 110, 150, 0.22, { seed: i }); }
  else if (k === 3) soldier(x, { T: t }, 0, 170, 0.3, { inside: (c) => { c.beginPath(); c.arc(0, -620, 60, 0, 7); A.fs(c, '#f6c690', 5); } });
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); layers(x, 0, 80, 7, 0.7); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a biscuit-orange swirl fruit', biteDesc: 'a biscuit pops out of thin air into his hand', biteSfx: 'pop', bannerCol: 'gold', biteCol: '#fff0c8',
    biteFx(x, S, k, h) { biscuit(x, h.hand.L[0], h.hand.L[1] - 40, 60 * ease.outBack(k), S.T); },
    calmBg: 'bakery', calmDesc: 'cosy bakery', seaHue: 'tan', seed: 29, nameRe: /^Bis-Bis/,
    revealBg: 'cookieJar', revealDesc: 'giant cookie jar', revealBanner: 'BIS-BIS FRUIT', haloRgb: '255,210,140' });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tShape = W('type', /^shape/) - 0.1;
  add({ name: 'Make biscuits (glowing brick oven): biscuits pop out of the host\'s palms and stack up in a tower', t0: tThat, t1: tShape, bg: 'bakeryOven',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'pop'], [0.3, 'pop'], [0.5, 'pop']],
    draw(x, S) { person(x, S, 'host', 'grin', 360, 1780, 0.7, { seed: 2, pose: 'holdUp' }); for (let i = 0; i < 6; i++) { const p = pop(S.T, S.t0 + 0.1 + i * 0.15); if (p > 0) biscuit(x, 760 + (i % 2) * 20, 1700 - i * 90, 90 * p, i); } } });
  stage(T, { desc: 'pastel cake-tier stage', bg: 'cakeStage', t0: tShape, t1: end('type'), times: [W('type', /^shape/), W('type', /^shape/) + 0.25, W('type', /^biscuits/), W('type', /^biscuits/) + 0.3],
    labels: ['SHIELD', 'ARMY', 'INSIDE', 'ROCK HARD'], bar: 'BISCUIT TRICKS', haloRgb: '255,210,140', icon: bisIcon });

  // ---------------- POWER 1: biscuit shield ----------------
  const tBlock = W('power1', /^block/) - 0.1;
  addSplit({ name: 'Power 1 (candy town street): the ninja throws a punch, a thick biscuit wall pops up in front of the host and the punch bounces off; gold SHIELD banner; impact star, the ninja shakes his fist', t0: st('power1'), t1: end('power1'), bg: 'candyTown',
    cam: [[1.05, 560, 1000, -0.02], [1.1, 580, 990, -0.01]], banners: [['BISCUIT SHIELD', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^biscuits/) - st('power1'), 'pop'], [tBlock - st('power1') + 0.2, 'impact'], [tBlock - st('power1') + 0.35, 'boing']],
    draw(x, S) {
      const tb = W('power1', /^biscuits/) - S.t0, hit = S.T > tBlock + 0.2;
      person(x, S, 'host', 'smug', 260, 1780, 0.66, { seed: 2, pose: 'raise' });
      const e = person(x, S, 'ninja', hit ? 'hit' : 'shout', 840, 1780, 0.64, { seed: 3, pose: S.T > tBlock - 0.1 ? 'punch' : 'idle', flip: true });
      const k = ease.outBack(prog(S.t, tb, tb + 0.4)); if (k > 0) { x.save(); x.translate(560, 1780); x.scale(k, k); A.rrect(x, -60, -760, 120, 760, 40); A.fs(x, BIS, 10); holes(x, 0, -380, 80, 640, 9); x.restore(); }
      if (hit) { A.impactStar(x, 600, e.hand.R[1], 140 * (1 - prog(S.T, tBlock + 0.4, tBlock + 0.8)), 0.3); A.mark(x, '!?', e.head[0] + 150, e.head[1] - 200, pop(S.T, tBlock + 0.4)); if (S.T < tBlock + 0.2 + 7 * F) S.shake = 0.7; }
    } },
    tBlock, [[1.35, 640, 1150, 0.02], [1.42, 650, 1140, 0.035]], 'Power 1 close (same street): the fist meets the biscuit wall, which doesn\'t even crack');

  // ---------------- POWER 2: biscuit army ----------------
  const tMany = W('power2', /^many/) - 0.1;
  addSplit({ name: 'Power 2 evolve (castle parade ground): shield icon becomes the army icon, flash + glow ring; gold ARMY banner; rows of biscuit soldiers pop up and march toward the ninja', t0: st('power2'), t1: end('power2'), bg: 'paradeGround',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['BISCUIT ARMY', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^army/) - st('power2'), 'drums'], [tMany - st('power2'), 'pop']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, bisIcon)) return;
      const ta = W('power2', /^army/) - S.t0;
      for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { const p = pop(S.T, S.t0 + ta + (r * 4 + i) * 0.12); if (p > 0) soldier(x, S, 160 + i * 190 + r * 90, 1600 + r * 180, 0.42 * p, { march: true, seed: i + r }); }
      person(x, S, 'host', 'grin', 960, 1800, 0.5, { seed: 2, pose: 'cheer', pop: S.t0 + 0.45 });
    } },
    tMany, [[1.0, 540, 1000, 0.03], [1.06, 540, 980, 0.045]], 'Power 2 more (same ground): more soldiers keep popping up, a counter spins x99');
  const p2 = T.shots[T.shots.length - 1], p2d = p2.draw;
  p2.draw = function (x, S) { p2d.call(this, x, S); const n = Math.min(99, 8 + Math.floor((S.T - tMany) * 60)); x.save(); x.translate(820, 640); x.font = `130px ${A.FONT}`; x.textAlign = 'center'; x.lineWidth = 16; x.strokeStyle = A.OL; x.strokeText(`x${n}`, 0, 0); x.fillStyle = '#ffe14d'; x.fillText(`x${n}`, 0, 0); x.restore(); };

  // ---------------- POWER 3: inside a soldier ----------------
  const tFight = W('power3', /^fight/) - 0.1;
  addSplit({ name: 'Power 3 evolve (candy-castle hall): army icon becomes the inside icon; a giant biscuit soldier stomps in and a window in its chest shows the host steering from inside; gold INSIDE banner; the ninja\'s kick breaks a chunk off but the host is fine', t0: st('power3'), t1: end('power3'), bg: 'sweetHall',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['HIDE INSIDE', 'gold', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^inside/) - st('power3'), 'thunk'], [tFight - st('power3') + 0.2, 'impact']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, bisIcon)) return;
      const hit = S.T > tFight + 0.2;
      soldier(x, S, 420, 1800, 0.95, { crack: hit, inside: (c) => person(c, S, 'host', hit ? 'smug' : 'grin', 0, -380, 0.22, { seed: 2, pose: 'cheer' }) });
      const e = person(x, S, 'ninja', hit ? 'shock' : 'shout', 880, 1780, 0.56, { seed: 3, pose: S.T > tFight ? 'punch' : 'idle', flip: true, pop: S.t0 + 0.5 });
      if (hit) { A.impactStar(x, 660, 1250, 150 * (1 - prog(S.T, tFight + 0.4, tFight + 0.8)), 0.3); A.mark(x, '?', e.head[0] - 130, e.head[1] - 180, pop(S.T, tFight + 0.5)); if (S.T < tFight + 0.2 + 7 * F) S.shake = 0.8; }
    } },
    W('power3', /^inside/) - 0.1, [[1.4, 420, 1160, -0.03], [1.48, 420, 1150, -0.045]], 'Power 3 close (same hall): the host waves from the soldier\'s chest window');

  // ---------------- PEAK: rock hard ----------------
  const tRock = W('peak', /^rock/) - 0.15;
  addSplit({ name: 'Peak (blacksmith forge): the inside icon gives way to the layered-biscuit icon, gold halo; gold ROCK HARD banner; biscuit layers press together into one dense slab; the ninja\'s sword snaps on it', t0: st('peak'), t1: end('peak'), bg: 'forge',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['ROCK HARD', 'gold', W('peak', /^layers/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^layers/) - st('peak'), 'stamp'], [tRock - st('peak') + 0.3, 'glass']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, bisIcon); return; }
      const tl = W('peak', /^layers/) - S.t0, k = ease.outCubic(prog(S.t, tl, tl + 0.8)), hit = S.T > tRock + 0.3;
      person(x, S, 'host', 'grin', 260, 1780, 0.64, { seed: 7, pose: 'holdUp' });
      for (let i = 0; i < 7; i++) { A.rrect(x, 440, 1500 - i * lerp(60, 34, k), 340, 50, 16); A.fs(x, i % 2 ? BIS : BISD, 8); }
      const e = person(x, S, 'ninja', hit ? 'shock' : 'shout', 940, 1780, 0.56, { seed: 3, pose: 'punch', flip: true });
      if (S.T > tRock) { const [hx, hy] = e.hand.R; A.rrect(x, hx - (hit ? 150 : 260), hy - 12, hit ? 130 : 240, 24, 8); A.fs(x, '#d9dce6', 6); if (hit) { x.save(); x.translate(hx - 260, hy + 120 * prog(S.T, tRock + 0.3, tRock + 0.9)); x.rotate(2 * prog(S.T, tRock + 0.3, tRock + 0.9)); A.rrect(x, -50, -12, 100, 24, 8); A.fs(x, '#d9dce6', 6); x.restore(); A.impactStar(x, 620, hy, 120 * (1 - prog(S.T, tRock + 0.5, tRock + 0.9)), 0.3); if (S.T < tRock + 0.3 + 7 * F) S.shake = 0.8; } }
    } },
    tRock, [[1.3, 640, 1350, -0.02], [1.38, 650, 1340, -0.035]], 'Peak close (same forge): the sword snaps against the rock-hard biscuit, star and shake');

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (rainy café window): a biscuit on the windowsill, raindrops racing down the glass behind it; push-in with roll, low sting; pink WEAKNESS banner', t0: st('twist'), t1: end('twist'), bg: 'rainCafe', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['TASTY WEAKNESS', 'pink', W('twist', /^weakness/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.4, 'splash']],
    draw(x, S) { biscuit(x, 540, 1160, 150, 0.1); A.mark(x, '?', 780, 900, pop(S.T, S.t0 + 0.5), 0.2); } });
  add({ name: 'Soggy (rainy town square): rain pours on a biscuit soldier, it droops, sags and slumps into a soggy heap; blue SOGGY banner', t0: st('truth'), t1: end('truth'), bg: 'drizzleTown',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['SOGGY!', 'blue', W('truth', /^soft/) - 0.1, end('truth')]], sfx: [[0, 'splash'], [W('truth', /^soft/) - st('truth'), 'boing'], [W('truth', /^wet/) - st('truth'), 'splash']],
    draw(x, S) {
      const k = ease.outCubic(prog(S.T, W('truth', /^soft/) - 0.2, end('truth') - 0.2));
      x.save(); x.translate(540, 1780); x.scale(1 + 0.4 * k, 1 - 0.6 * k); x.rotate(Math.sin(S.T * 3) * 0.05 * k); soldier(x, S, 0, 0, 0.85, {}); x.restore();
      x.beginPath(); x.ellipse(540, 1790, 300 * (0.4 + k), 40, 0, 0, 7); x.fillStyle = 'rgba(160,200,255,0.6)'; x.fill(); raindrops(x, S.T, 70);
    } });

  // ---------------- USERS ----------------
  const tLuffy = W('users', /^fought/) - 0.1, tAte = W('users', /^and$/) - 0.1;
  add({ name: 'Charlotte Cracker (Mirro-World shards): Cracker grins inside a ring of biscuit soldiers; purple CRACKER banner', t0: st('users'), t1: tLuffy, bg: 'mirrorWorld',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['CHARLOTTE CRACKER', 'pink', st('users') + 0.2, tLuffy]], sfx: [[0, 'whoosh'], [0.3, 'pop']],
    draw(x, S) { soldier(x, S, 160, 1800, 0.45, { seed: 1 }); soldier(x, S, 920, 1800, 0.45, { seed: 2, flip: true }); person(x, S, 'cracker', 'grin', 540, 1820, 0.84, { pop: S.t0 + 0.05, seed: 8, pose: 'shrug' }); } });
  add({ name: 'Eleven hours (same shards): Luffy and a biscuit soldier trade blows while a clock spins to 11 HOURS; red 11 HOURS banner', t0: tLuffy, t1: tAte, bg: 'mirrorWorld',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['11 HOURS', 'red', tLuffy + 0.3, tAte]], sfx: [[0.1, 'impact'], [0.5, 'impact'], [0.9, 'tick']],
    draw(x, S) { soldier(x, S, 780, 1800, 0.6, { flip: true, crack: Math.floor(S.T * 3) % 2 === 0 }); person(x, S, 'luffy', 'shout', 300, 1800, 0.66, { seed: 4, pose: Math.floor(S.T * 5) % 2 ? 'punch' : 'idle' });
      x.save(); x.translate(540, 560); x.beginPath(); x.arc(0, 0, 110, 0, 7); A.fs(x, '#ffffff', 10); x.rotate(S.T * 10); x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -80); x.lineWidth = 10; x.strokeStyle = A.OL; x.stroke(); x.restore(); } });
  add({ name: 'Luffy eats through (same shards, closer): Luffy, belly huge, munches through a biscuit soldier; crumbs fly; green CHOMP banner', t0: tAte, t1: end('users'), bg: 'mirrorWorld',
    cam: [[1.2, 540, 1000, 0.02], [1.28, 540, 990, 0.035]], banners: [['CHOMP!', 'green', tAte + 0.2, end('users')]], sfx: [[0.1, 'crunch'], [0.5, 'crunch'], [0.9, 'crunch']],
    draw(x, S) { const k = prog(S.t, 0, S.dur); x.save(); x.beginPath(); x.rect(0, 0, 1080 - 400 * k, 1920); x.clip(); soldier(x, S, 760, 1800, 0.6, { flip: true }); x.restore();
      const l = person(x, S, 'luffy', 'grin', 380, 1800, 0.66, { seed: 4, pose: 'holdUp', sx: 1 + 0.3 * k });
      for (let i = 0; i < 6; i++) { const ph = (S.T * 1.8 + i / 6) % 1; x.beginPath(); x.arc(l.head[0] + 120 + ph * 200, l.head[1] + 150 - Math.sin(ph * 3) * 80, 10, 0, 7); A.fs(x, BIS, 4); } } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (supermarket snack aisle): the host walks past the snacks, pops a fresh biscuit out of his palm and munches it; gold FREE SNACKS banner', t0: st('joke'), t1: end('joke'), bg: 'snackAisle',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['FREE SNACKS', 'gold', W('joke', /^snacks/) - 0.1, end('joke')]], sfx: [[0.3, 'pop'], [0.8, 'crunch'], [W('joke', /^snacks/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 540, 1780, 0.78, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); biscuit(x, h.hand.R[0] + 10, h.hand.R[1] - 60, 70 * pop(S.T, S.t0 + 0.3), S.T); A.sparkle(x, h.hand.R[0] + 60, h.hand.R[1] - 140, 30 * Math.abs(Math.sin(S.T * 4))); } });

  ending(T, { TL, fruit });
  return finish();
}
