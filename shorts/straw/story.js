// Shot plan for the Wara Wara no Mi (Straw-Straw Fruit) short.
// Structure follows the fruit's real uses: straw weapons, linked straw dolls, up to ten links, and the giant straw man as the peak.
import * as A from '/engine/art.js';
import { drawSwirlFruit } from '/engine/swirlFruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawSwirlFruit(x, cx, cy, R, rot, { pal: 'gold', ...o });

// ---------------- straw effects ----------------
function strands(x, x0, y0, ang, len, k, n = 7, spread = 0.5) { // bundle of straw strands growing out
  if (k <= 0) return; x.save(); x.lineCap = 'round';
  for (let i = 0; i < n; i++) { const a = ang + (i / (n - 1) - 0.5) * spread, l = len * k * (0.8 + 0.2 * Math.sin(i * 7.1)); x.beginPath(); x.moveTo(x0, y0); x.lineTo(x0 + Math.cos(a) * l, y0 + Math.sin(a) * l);
    x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 7; x.strokeStyle = i % 2 ? '#f2c94c' : '#e8b52e'; x.stroke(); }
  x.restore();
}
function strawSpear(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); strands(x, -260, 0, 0, 420, 1, 9, 0.08); x.beginPath(); x.moveTo(160, -40); x.lineTo(300, 0); x.lineTo(160, 40); x.closePath(); A.fs(x, '#f2c94c', 8); A.rrect(x, 120, -22, 50, 44, 8); A.fs(x, '#c0392b', 6); x.restore(); }
export function strawDoll(x, cx, cy, s, o = {}) { // little straw voodoo doll with a red tie
  x.save(); x.translate(cx, cy); x.rotate(o.rot || 0); x.scale(s, s);
  const st = (x0, y0, x1, y1, w) => { x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.lineWidth = w + 8; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = w; x.strokeStyle = '#f2c94c'; x.stroke(); };
  x.lineCap = 'round';
  st(-30, 60, -50, 150, 26); st(30, 60, 50, 150, 26); if (!o.noLeftArm) st(-20, -20, -110, 30, 24); st(20, -20, 110, 30, 24);
  x.beginPath(); x.ellipse(0, 20, 50, 70, 0, 0, 7); A.fs(x, '#f2c94c', 8); x.beginPath(); x.arc(0, -80, 52, 0, 7); A.fs(x, '#f2c94c', 8);
  x.strokeStyle = 'rgba(150,110,30,0.6)'; x.lineWidth = 4; for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(i * 16, -125); x.lineTo(i * 18, -40); x.stroke(); }
  A.rrect(x, -50, -30, 100, 18, 8); A.fs(x, '#c0392b', 5);
  x.lineWidth = 6; x.strokeStyle = A.OL; for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 20 - 9, -90); x.lineTo(sd * 20 + 9, -72); x.moveTo(sd * 20 + 9, -90); x.lineTo(sd * 20 - 9, -72); x.stroke(); }
  if (o.label) { x.font = `40px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = '#c0392b'; x.fillText(o.label, 0, 40); }
  x.restore();
}
function link(x, x0, y0, x1, y1, k = 1) { x.save(); x.setLineDash([18, 14]); x.lineDashOffset = -k * 40; x.beginPath(); x.moveTo(x0, y0); x.lineTo(lerp(x0, x1, Math.min(1, k)), lerp(y0, y1, Math.min(1, k))); x.lineWidth = 7; x.strokeStyle = '#ffe14d'; x.stroke(); x.restore(); }
function strawMan(x, cx, by, s, t, o = {}) { // towering scarecrow made of straw, with a window showing the user inside
  x.save(); x.translate(cx, by); x.scale(s, s); x.rotate(Math.sin(t * 1.2) * 0.02);
  const blob = (bx, by2, rx, ry) => { x.beginPath(); x.ellipse(bx, by2, rx, ry, 0, 0, 7); A.fs(x, '#e8b52e', 12); x.strokeStyle = 'rgba(150,100,20,0.55)'; x.lineWidth = 6; for (let i = -3; i <= 3; i++) { x.beginPath(); x.moveTo(bx + i * rx / 4, by2 - ry * 0.85); x.lineTo(bx + i * rx / 3.6, by2 + ry * 0.85); x.stroke(); } };
  blob(-110, -260, 80, 260); blob(110, -260, 80, 260); // legs
  x.save(); x.rotate(-0.25); blob(-330, -880, 280, 70); x.restore(); x.save(); x.rotate(0.25); blob(330, -880, 280, 70); x.restore(); // arms
  blob(0, -820, 230, 330); // body
  x.beginPath(); x.arc(0, -1240, 160, 0, 7); A.fs(x, '#f2c94c', 12); // head
  x.beginPath(); x.moveTo(-230, -1320); x.quadraticCurveTo(0, -1560, 230, -1320); x.closePath(); A.fs(x, '#8a5a3c', 10); // hat
  for (const sd of [-1, 1]) { x.beginPath(); x.arc(sd * 60, -1250, 22, 0, 7); A.fs(x, A.OL, 0); }
  A.rrect(x, -110, -900, 220, 200, 30); A.fs(x, '#3a2a20', 10); // window to the user inside
  if (o.inside) o.inside(x);
  x.restore();
}
function needle(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.beginPath(); x.moveTo(-160, -8); x.lineTo(150, 0); x.lineTo(-160, 8); x.closePath(); A.fs(x, '#d9dce6', 5); x.beginPath(); x.ellipse(-130, 0, 16, 5, 0, 0, 7); x.fillStyle = A.OL; x.fill(); x.restore(); }
export function strawIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) strawSpear(x, 0, 0, 0.5, -0.6);
  else if (k === 2) strawDoll(x, 0, 0, 1);
  else if (k === 3) { for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283; strawDoll(x, Math.cos(a) * 110, Math.sin(a) * 110, 0.32); } x.font = `90px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = '#ffe14d'; x.fillText('10', 0, 30); }
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); strawMan(x, 0, 150, 0.2, t); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a straw-gold swirl fruit', biteDesc: 'straws poke out of his sleeves and collar', biteSfx: 'swish', bannerCol: 'gold', biteCol: '#fff4c8',
    biteFx(x, S, k, h) { strands(x, h.hand.L[0], h.hand.L[1], Math.PI * 0.75, 200, ease.outBack(k), 6, 0.7); const [nx, ny] = A.figPoint(380, 640, 540, 1900, 0.8); strands(x, nx, ny, -Math.PI / 2, 120, ease.outBack(k), 7, 1.4); },
    calmBg: 'barn', calmDesc: 'red barn with hay bales', seaHue: 'gold', seed: 21, nameRe: /^Straw-Straw/,
    revealBg: 'wheatField', revealDesc: 'golden wheat field', revealBanner: 'STRAW-STRAW FRUIT', haloRgb: '255,220,120' });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tCtrl = W('type', /^create/) - 0.1;
  add({ name: 'Create straw (haystack farm): the host sweeps his hands, a haystack untangles into a whirl of straw that circles him', t0: tThat, t1: tCtrl, bg: 'haystackFarm',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'whoosh'], [0.4, 'swish']],
    draw(x, S) { const h = person(x, S, 'host', 'grin', 540, 1780, 0.7, { seed: 2, pose: 'raise' });
      for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283 + S.T * 3, r = 300 * ease.outCubic(prog(S.t, 0, 0.6)); strands(x, 540 + Math.cos(a) * r, 1250 + Math.sin(a) * r * 0.5, a + 1.6, 90, 1, 3, 0.3); } } });
  stage(T, { desc: 'giant tarot-card stage', bg: 'tarotStage', t0: tCtrl, t1: end('type'), times: [W('type', /^create/), W('type', /^and/), W('type', /^control/), W('type', /^straw/)],
    labels: ['WEAPONS', 'DOLLS', 'TEN LINKS', 'STRAW MAN'], bar: 'STRAW TRICKS', haloRgb: '255,220,120', icon: strawIcon });

  // ---------------- POWER 1: straw weapons ----------------
  const tWeap = W('power1', /^weapons/) - 0.1;
  addSplit({ name: 'Power 1 (autumn harvest fair): straw bursts out of the host\'s arm and twists into a long straw spear; gold WEAPONS banner; the boxer gulps', t0: st('power1'), t1: end('power1'), bg: 'harvestFair',
    cam: [[1.05, 560, 1000, -0.02], [1.1, 580, 990, -0.01]], banners: [['STRAW WEAPONS', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.1, 'whoosh'], [W('power1', /^straw/) - st('power1'), 'swish'], [tWeap - st('power1'), 'slash']],
    draw(x, S) {
      const ts = W('power1', /^straw/) - S.t0, k = ease.outCubic(prog(S.t, ts, ts + 0.5)), sp = S.T > tWeap;
      const e = person(x, S, 'boxer', sp ? 'shock' : 'smug', 880, 1780, 0.64, { seed: 3, pose: sp ? 'shrug' : 'idle', flip: true });
      const h = person(x, S, 'host', 'smug', 260, 1780, 0.68, { seed: 2, pose: sp ? 'punch' : 'raise' });
      if (!sp) strands(x, h.hand.L[0], h.hand.L[1], -Math.PI / 2, 260, k, 9, 0.6);
      else { strawSpear(x, h.hand.R[0] + 60, h.hand.R[1], 0.9 * ease.outBack(prog(S.T, tWeap, tWeap + 0.3)), 0); A.mark(x, '!?', e.head[0] - 150, e.head[1] - 200, pop(S.T, tWeap + 0.3)); }
    } },
    tWeap, [[1.35, 560, 1180, 0.02], [1.42, 580, 1170, 0.035]], 'Power 1 close (same fair): the straw spear pointing right at the boxer');

  // ---------------- POWER 2: linked dolls ----------------
  const tHurt = W('power2', /^hurt/) - 0.2;
  addSplit({ name: 'Power 2 evolve (boxing gym): spear icon becomes the doll icon, flash + glow ring; gold DOLLS banner; the host holds up a straw doll and a golden link snaps from it to the boxer', t0: st('power2'), t1: end('power2'), bg: 'boxingGym',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['STRAW DOLLS', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^linked/) - st('power2'), 'ding'], [tHurt - st('power2') + 0.25, 'impact'], [tHurt - st('power2') + 0.35, 'boing']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, strawIcon)) return;
      const tl = W('power2', /^linked/) - S.t0, th = tHurt - S.t0, punched = S.t > th + 0.25;
      const e = person(x, S, 'boxer', punched ? 'hit' : 'shout', 760, 1780, 0.64, { seed: 3, pose: S.t > th ? 'punch' : 'idle', flip: true, rot: punched ? 0.25 * prog(S.t, th + 0.25, th + 0.6) : 0, pop: S.t0 + 0.45 });
      const h = person(x, S, 'host', punched ? 'grin' : 'smug', 300, 1780, 0.66, { seed: 2, pose: 'holdUp', pop: S.t0 + 0.45 });
      strawDoll(x, h.hand.R[0], h.hand.R[1] - 80, 0.75);
      if (S.t > tl) link(x, h.hand.R[0], h.hand.R[1] - 80, e.head[0], e.head[1], prog(S.t, tl, tl + 0.4));
      if (punched) { A.impactStar(x, e.head[0], e.head[1], 160 * (1 - prog(S.t, th + 0.5, th + 0.9)), 0.3); A.mark(x, '!?', e.head[0] + 160, e.head[1] - 220, pop(S.T, S.t0 + th + 0.4)); if (S.t < th + 0.25 + 7 * F) S.shake = 0.8; }
    } },
    tHurt, [[1.25, 620, 1020, 0.03], [1.32, 650, 1010, 0.045]], 'Power 2 twist (same gym, closer): the boxer\'s own punch lands on himself through the doll; impact star and !?');

  // ---------------- POWER 3: ten links ----------------
  add({ name: 'Power 3 evolve (voodoo doll shop): doll icon becomes the ring of ten dolls; ten golden links fan out from the host; gold x10 counter; blue TEN banner', t0: st('power3'), t1: end('power3'), bg: 'voodooShop',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['TEN AT ONCE', 'blue', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^ten/) - st('power3'), 'levelup']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, strawIcon)) return;
      const h = person(x, S, 'host', 'grin', 540, 1780, 0.66, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 });
      const n = Math.min(10, Math.floor(prog(S.t, 0.6, 0.6 + 1.4) * 10 + 0.001));
      for (let i = 0; i < n; i++) { const a = Math.PI * (1.05 + i / 9 * 0.9), dx = 540 + Math.cos(a) * 430, dy = 1000 + Math.sin(a) * 420; link(x, h.head[0], h.head[1] + 200, dx, dy, 1); strawDoll(x, dx, dy, 0.42 * pop(S.T, S.t0 + 0.6 + i * 0.14)); }
      x.save(); x.translate(860, 1480); x.scale(pop(S.T, S.t0 + 0.6), pop(S.T, S.t0 + 0.6)); x.font = `120px ${A.FONT}`; x.textAlign = 'center'; x.lineWidth = 16; x.strokeStyle = A.OL; x.strokeText(`x${n}`, 0, 0); x.fillStyle = '#ffe14d'; x.fillText(`x${n}`, 0, 0); x.restore();
    } });

  // ---------------- PEAK: straw man ----------------
  const tTow = W('peak', /^towering/) - 0.1;
  addSplit({ name: 'Peak (field at dusk with crows): the ten-dolls icon gives way to the straw-man icon, gold halo; gold STRAW MAN banner; straw piles up into a towering scarecrow with the host visible in its chest window; the boxer looks tiny', t0: st('peak'), t1: end('peak'), bg: 'duskField',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['STRAW MAN', 'gold', W('peak', /^giant/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^giant/) - st('peak'), 'charge'], [tTow - st('peak'), 'rumble']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, strawIcon); return; }
      const k = ease.outBack(prog(S.T, W('peak', /^giant/), W('peak', /^giant/) + 0.8));
      strawMan(x, 470, 1800, 0.92 * k, S.T, { inside: (c) => person(c, S, 'host', 'grin', 0, -700, 0.22, { seed: 2, pose: 'cheer' }) });
      const e = person(x, S, 'boxer', k > 0.6 ? 'shock' : 'calm', 930, 1800, 0.4, { seed: 3, pose: 'shrug', flip: true });
      if (k > 0.6) A.mark(x, '!?', e.head[0] - 90, e.head[1] - 130, pop(S.T, W('peak', /^giant/) + 0.7), 0.1);
      if (S.T > W('peak', /^giant/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^giant/), W('peak', /^giant/) + 0.3))); S.flashCol = '255,246,200'; }
    } },
    tTow, [[1.25, 470, 900, -0.02], [1.33, 470, 880, -0.035]], 'Peak close (same field): the straw man\'s head and the host grinning in its chest window');

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (candle-lit tarot room): a tarot card flips over to show a cracked straw doll; push-in with roll, low sting; red CATCH banner', t0: st('twist'), t1: end('twist'), bg: 'candleRoom', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 980, 0.07]], banners: [['THE CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.3, 'swish']],
    draw(x, S) { const fl = Math.cos(Math.min(1, prog(S.t, 0.1, 0.6)) * Math.PI); x.save(); x.translate(540, 980); x.scale(Math.abs(fl), 1);
      A.rrect(x, -190, -300, 380, 600, 24); A.fs(x, fl > 0 ? '#5a2a6a' : '#f4e2c0', 10); if (fl <= 0) { strawDoll(x, 0, 0, 1.3, { rot: 0.1 }); x.beginPath(); x.moveTo(-60, -140); x.lineTo(10, -40); x.lineTo(-30, 30); x.lineTo(40, 140); x.lineWidth = 9; x.strokeStyle = A.OL; x.stroke(); } x.restore(); } });
  const tStr = W('truth', /^straight/) - 0.15;
  add({ name: 'Out of dolls (corn maze): the dolls pop into puffs of straw one by one, the last link snaps, and the boxer\'s punch lands right on the host; impact star, shake, red NO DOLLS LEFT banner', t0: st('truth'), t1: end('truth'), bg: 'cornMaze',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['NO DOLLS LEFT', 'red', tStr - 0.2, end('truth')]], sfx: [[0.2, 'pop'], [0.5, 'pop'], [0.8, 'pop'], [tStr - st('truth'), 'impact']],
    draw(x, S) {
      const ts = tStr - S.t0, hit = S.t > ts;
      for (let i = 0; i < 3; i++) { const t0 = 0.2 + i * 0.3, gone = S.t > t0; if (!gone) strawDoll(x, 200 + i * 340, 520, 0.6); else if (S.t < t0 + 0.4) strands(x, 200 + i * 340, 520, i, 80 * prog(S.t, t0, t0 + 0.4), 1, 10, 6.28); }
      const h = person(x, S, 'host', hit ? 'hit' : 'worried', 360, 1780, 0.68, { seed: 2, pose: 'shrug', rot: hit ? -0.2 * prog(S.t, ts, ts + 0.4) : 0 });
      person(x, S, 'boxer', 'shout', 780, 1780, 0.66, { seed: 3, pose: S.t > ts - 0.2 ? 'punch' : 'idle', flip: true });
      if (hit) { A.impactStar(x, h.head[0] + 80, h.head[1] + 40, 180 * (1 - prog(S.t, ts + 0.3, ts + 0.7)), 0.3); if (S.t < ts + 7 * F) S.shake = 1.0; }
    } });

  // ---------------- USERS ----------------
  const tKiller = W('users', /^until/) - 0.1, tKid = W('users', /^which/) - 0.1;
  add({ name: 'Basil Hawkins (Wano rooftop under the full moon): Hawkins, calm, holds up a straw doll; gold WORST GENERATION banner', t0: st('users'), t1: tKiller, bg: 'wanoRoofNight',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['BASIL HAWKINS', 'gold', st('users') + 0.2, tKiller]], sfx: [[0, 'whoosh'], [0.3, 'swish']],
    draw(x, S) { const h = person(x, S, 'hawkins', 'calm', 540, 1800, 0.84, { pop: S.t0 + 0.05, seed: 8, pose: 'holdUp' }); strawDoll(x, h.hand.R[0], h.hand.R[1] - 80, 0.8); } });
  add({ name: 'The left arm (same rooftop, wider): Killer slashes the doll\'s left arm off; a red tag "KID" on the doll, and a ? because Kid had no left arm to lose; Hawkins shocked', t0: tKiller, t1: end('users'), bg: 'wanoRoofNight',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], sfx: [[0.2, 'slash'], [tKid - tKiller, 'impact']],
    draw(x, S) {
      const cut = S.t > 0.3, hit = S.T > tKid;
      person(x, S, 'killer', 'shout', 260, 1800, 0.64, { seed: 6, pose: cut ? 'punch' : 'idle' });
      const h = person(x, S, 'hawkins', hit ? 'hit' : 'shock', 780, 1800, 0.64, { seed: 8, pose: 'holdUp', flip: true, rot: hit ? 0.25 * prog(S.T, tKid, tKid + 0.4) : 0 });
      strawDoll(x, h.hand.R[0], h.hand.R[1] - 70, 0.7, { noLeftArm: cut, label: 'KID' });
      if (cut) { const k = prog(S.t, 0.3, 0.9); x.save(); x.translate(h.hand.R[0] - 60 - 120 * k, h.hand.R[1] - 50 + 300 * k); x.rotate(k * 4); x.beginPath(); x.moveTo(0, 0); x.lineTo(-60, 30); x.lineWidth = 32; x.strokeStyle = A.OL; x.lineCap = 'round'; x.stroke(); x.lineWidth = 24; x.strokeStyle = '#f2c94c'; x.stroke(); x.restore();
        A.mark(x, '?', h.hand.R[0] + 60, h.hand.R[1] - 280, pop(S.T, S.t0 + 0.6), 0.2); }
      if (hit) { A.impactStar(x, h.head[0], h.head[1] + 200, 150 * (1 - prog(S.T, tKid + 0.3, tKid + 0.7)), 0.3); if (S.T < tKid + 7 * F) S.shake = 0.8; }
    } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (hay loft): the host waves his hand, the whole haystack parts like a curtain and a shiny needle floats up into his fingers; gold FOUND IT banner', t0: st('joke'), t1: end('joke'), bg: 'hayLoft',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['FOUND IT!', 'gold', W('joke', /^haystack/) - 0.1, end('joke')]], sfx: [[0.3, 'swish'], [W('joke', /^needle/) - st('joke'), 'ding'], [W('joke', /^haystack/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      const k = ease.outCubic(prog(S.T, W('joke', /^needle/) - 0.3, W('joke', /^needle/) + 0.4));
      const h = person(x, S, 'host', 'smug', 330, 1780, 0.72, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true });
      needle(x, lerp(820, h.hand.R[0] + 30, k), lerp(1000, h.hand.R[1] - 60, k), 0.9, -0.5 + k * 0.4); A.sparkle(x, lerp(820, h.hand.R[0] + 30, k), lerp(1000, h.hand.R[1] - 60, k), 50 * Math.abs(Math.sin(S.T * 5)));
    } });

  ending(T, { TL, fruit });
  return finish();
}
