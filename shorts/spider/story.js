// Shot plan for the Kumo Kumo no Mi, Model: Rosamygale Grauvogeli (Spider-Spider Fruit) short.
// Structure follows what the fruit really does: spider hybrid body, webs, wall/ceiling crawling, and Ancient Zoan toughness as the peak.
// No stages and no awakening have been shown, so there are no forced "forms".
import * as A from '/engine/art.js';
import { drawKumo } from '/shorts/spider/fruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawKumo(x, cx, cy, R * 0.85, rot, o);

// ---------------- spider effects ----------------
// giant hairy spider body; (cx, by) = ground point under its middle; returns where the rider's waist sits
export function spiderBody(x, cx, by, s, t, o = {}) {
  const walk = o.walk ? t * 9 : 0, lift = 330 * s;
  x.save(); x.lineCap = 'round'; x.lineJoin = 'round';
  for (let side of [-1, 1]) for (let i = 0; i < 4; i++) {
    const ph = Math.sin(walk + i * 1.3 + (side > 0 ? 1.5 : 0)), hx = cx + side * (70 + i * 30) * s, hy = by - lift + (i - 1.5) * 26 * s;
    const kx = cx + side * (230 + i * 40) * s, ky = by - lift - 170 * s + ph * 20 * s, fx = cx + side * (300 + i * 70) * s + ph * 25 * s, fy = by;
    x.beginPath(); x.moveTo(hx, hy); x.lineTo(kx, ky); x.lineTo(fx, fy); x.lineWidth = 46 * s; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 32 * s; x.strokeStyle = i % 2 ? '#6b4a3a' : '#5a3c2e'; x.stroke();
    x.beginPath(); x.arc(kx, ky, 18 * s, 0, 7); A.fs(x, '#8a6a4a', 6 * s);
  }
  x.beginPath(); x.ellipse(cx - 230 * s, by - lift - 40 * s, 230 * s, 190 * s, 0.25, 0, 7); A.fs(x, '#5a3c2e', 12 * s); // abdomen
  x.fillStyle = 'rgba(255,220,180,0.25)'; for (let i = 0; i < 4; i++) { x.beginPath(); x.ellipse(cx - 230 * s, by - lift - 120 * s + i * 55 * s, 90 * s, 18 * s, 0.25, 0, 7); x.fill(); }
  x.beginPath(); x.ellipse(cx, by - lift, 160 * s, 120 * s, 0, 0, 7); A.fs(x, '#6b4a3a', 12 * s); // front body
  x.strokeStyle = 'rgba(30,20,20,0.5)'; x.lineWidth = 5 * s; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; x.beginPath(); x.moveTo(cx + Math.cos(a) * 150 * s, by - lift + Math.sin(a) * 110 * s); x.lineTo(cx + Math.cos(a) * 172 * s, by - lift + Math.sin(a) * 128 * s); x.stroke(); }
  x.restore();
  return [cx, by - lift - 60 * s];
}
// a figure from the waist up sitting on a spider body (waist at wx, wy)
function rider(x, S, who, expr, wx, wy, s, o = {}) {
  const fy = wy + 575 * s; x.save(); x.beginPath(); x.rect(wx - 600 * s, wy - 2000 * s, 1200 * s, 2000 * s + 30 * s); x.clip();
  const r = person(x, S, who, expr, wx, fy, s, o); x.restore(); return r;
}
function spiderRider(x, S, who, expr, cx, by, s, o = {}) { const [wx, wy] = spiderBody(x, cx, by, s * 1.1, S.T, o); return rider(x, S, who, expr, wx, wy, s, o); }
function web(x, cx, cy, r, k = 1, a = 0.9) { // radial web drawn out to r*k
  if (k <= 0) return; x.save(); x.strokeStyle = `rgba(250,250,255,${a})`; x.lineWidth = 5;
  for (let i = 0; i < 12; i++) { const ang = i / 12 * 6.283; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ang) * r * k, cy + Math.sin(ang) * r * k); x.stroke(); }
  x.lineWidth = 3.5; for (let rr = r * 0.15; rr < r * k; rr += r * 0.14) { x.beginPath(); for (let i = 0; i <= 12; i++) { const ang = i / 12 * 6.283; x.lineTo(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr); } x.stroke(); }
  x.restore();
}
function silk(x, x0, y0, x1, y1) { x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.lineWidth = 9; x.strokeStyle = 'rgba(27,21,48,0.6)'; x.stroke(); x.lineWidth = 5; x.strokeStyle = '#ffffff'; x.stroke(); }
function fossil(x, cx, cy, s) { // spider fossil in a stone slab
  x.save(); x.translate(cx, cy); x.scale(s, s); A.rrect(x, -220, -170, 440, 340, 30); A.fs(x, '#c9b89a', 10);
  x.strokeStyle = '#7a6a50'; x.lineWidth = 12; x.lineCap = 'round';
  for (const sd of [-1, 1]) for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(sd * 30, -30 + i * 22); x.lineTo(sd * 110, -80 + i * 40); x.lineTo(sd * 170, -20 + i * 50); x.stroke(); }
  x.beginPath(); x.ellipse(0, 0, 50, 40, 0, 0, 7); x.ellipse(0, 70, 60, 50, 0, 0, 7); x.fillStyle = '#7a6a50'; x.fill(); x.restore();
}
function hammock(x, x0, y0, x1, y1, sag) { x.save(); x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2, y0 + sag * 2, x1, y1); x.lineWidth = 16; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 9; x.strokeStyle = '#fff'; x.stroke(); x.lineWidth = 5;
  for (let i = 0; i <= 10; i++) { const u = i / 10, px = lerp(x0, x1, u), py = lerp(y0, y1, u) + Math.sin(u * Math.PI) * sag; x.beginPath(); x.moveTo(px, py); x.lineTo(px, py + 40); x.stroke(); } x.restore(); }
export function spiderIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) spiderBody(x, 0, 160, 0.42, t);
  else if (k === 2) web(x, 0, 0, 150, 1);
  else if (k === 3) { A.rrect(x, -130, -150, 260, 40, 8); A.fs(x, '#8a5a3c', 6); silk(x, 0, -110, 0, 40); spiderBody(x, 0, 160, 0.24, t); }
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); fossil(x, 0, 0, 0.55); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a purple swirly fruit ringed with green leaves', biteDesc: 'a strand of silk shoots from his fingertips and sticks to the window', biteSfx: 'swish', bannerCol: 'gold',
    biteFx(x, S, k, h) { silk(x, h.hand.L[0], h.hand.L[1], lerp(h.hand.L[0], 80, ease.outCubic(k)), lerp(h.hand.L[1], 380, ease.outCubic(k))); },
    calmBg: 'attic', calmDesc: 'dusty attic with cobwebs', seaHue: 'sky', seed: 17, nameRe: /^Spider-Spider/,
    revealBg: 'dewGarden', revealDesc: 'dewy web in a morning garden', revealBanner: 'SPIDER-SPIDER FRUIT', haloRgb: '230,200,160',
    revealFx(x, S) { x.save(); x.translate(540, -100); x.rotate(Math.sin(S.T * 1.6) * 0.05); x.translate(-540, 100); silk(x, 540, -100, 540, 660); x.restore(); },
    revealEnd: W('type', /^Ancient/) - 0.15 });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^Ancient/) - 0.15, tGiant = W('type', /^into/) - 0.1;
  add({ name: 'Ancient Zoan (prehistoric fern jungle): the host is lifted up as a giant spider body grows under him; the sumo wrestler stumbles back, !?', t0: tThat, t1: tGiant, bg: 'fernJungle',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'whoosh'], [0.3, 'inflate']],
    draw(x, S) {
      const k = ease.outBack(prog(S.t, 0.2, 0.8));
      const e = person(x, S, 'sumo', k > 0.5 ? 'shock' : 'smug', 920, 1800, 0.56, { seed: 3, pose: k > 0.5 ? 'shrug' : 'idle', flip: true, sx: 1.25 });
      if (k < 0.05) person(x, S, 'host', 'calm', 420, 1800, 0.6, { seed: 2 }); else spiderRider(x, S, 'host', 'grin', 460, 1800, 0.6 * k, {});
      if (k > 0.5) A.mark(x, '!?', e.head[0] - 130, e.head[1] - 200, pop(S.T, S.t0 + 0.7));
    } });
  stage(T, { desc: 'mossy temple steps', bg: 'stoneSteps', t0: tGiant, t1: end('type'), times: [W('type', /^into/), W('type', /^giant/), W('type', /^prehistoric/), W('type', /^spider/)],
    labels: ['SPIDER', 'WEBS', 'WALLS', 'ANCIENT'], bar: 'SPIDER POWERS', haloRgb: '230,200,160', icon: spiderIcon });

  // ---------------- POWER 1: spider body ----------------
  const tLegs = W('power1', /^eight/) - 0.1;
  addSplit({ name: 'Power 1 (old Wano street with lanterns): the host rides on top of a huge brown spider body; gold SPIDER banner; it scuttles toward the sumo wrestler, whose eyes bulge', t0: st('power1'), t1: end('power1'), bg: 'wanoStreet',
    cam: [[1.0, 540, 1000, -0.02], [1.06, 540, 990, -0.01]], banners: [['SPIDER BODY', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.1, 'whoosh'], [W('power1', /^spider/) - st('power1'), 'rumble'], [tLegs - st('power1'), 'tick'], [tLegs - st('power1') + 0.2, 'tick']],
    draw(x, S) {
      const u = prog(S.T, tLegs, end('power1')), cx = lerp(380, 520, u);
      const e = person(x, S, 'sumo', 'shock', 900, 1800, 0.54, { seed: 3, pose: 'shrug', flip: true, sx: 1.25 });
      spiderRider(x, S, 'host', 'grin', cx, 1800, 0.62, { walk: u > 0 && u < 1 });
      A.mark(x, '!?', e.head[0] - 120, e.head[1] - 180, pop(S.T, tLegs + 0.2));
    } },
    tLegs, [[1.3, 420, 1450, 0.02], [1.38, 430, 1460, 0.035]], 'Power 1 close (same street): the eight hairy legs step one after another');

  // ---------------- POWER 2: webs ----------------
  const tSanji = W('power2', /^Sanji/) - 0.15;
  add({ name: 'Power 2 evolve (dark hall strung with webs): body icon becomes the web icon, flash + glow ring; blue WEBS banner; a huge web spreads across the hall', t0: st('power2'), t1: tSanji, bg: 'webHall',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['WEBS', 'blue', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^webs/) - st('power2'), 'swish']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, spiderIcon)) return;
      const tw = W('power2', /^webs/) - S.t0; web(x, 540, 900, 620, ease.outCubic(prog(S.t, tw, tw + 0.8)));
      const h = person(x, S, 'host', 'smug', 540, 1800, 0.62, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 }); silk(x, h.hand.L[0], h.hand.L[1], 540, 900);
    } });
  add({ name: 'Caught (same hall, closer): Sanji, mid-kick, is stuck flat in the web, struggling; gold CAUGHT banner; ? marks', t0: tSanji, t1: end('power2'), bg: 'webHall',
    cam: [[1.2, 540, 1000, 0.03], [1.28, 540, 990, 0.045]], banners: [['CAUGHT!', 'gold', tSanji + 0.2, end('power2')]], sfx: [[0.1, 'thunk'], [0.4, 'boing']],
    draw(x, S) { web(x, 540, 1000, 640, 1); const s = person(x, S, 'sanji', 'shout', 540, 1700, 0.62, { seed: 6, pose: 'shrug', rot: Math.sin(S.T * 9) * 0.04 });
      for (const [dx, dy] of [[-260, -300], [260, -300], [-280, 200], [280, 200], [0, -520]]) silk(x, s.head[0], s.head[1] + 350, s.head[0] + dx, s.head[1] + 350 + dy);
      A.mark(x, '?', s.head[0] + 190, s.head[1] - 210, pop(S.T, S.t0 + 0.3), 0.2); } });

  // ---------------- POWER 3: walls and ceiling ----------------
  const tHang = W('power3', /^hang/) - 0.1;
  addSplit({ name: 'Power 3 evolve (tall warehouse): web icon becomes the wall icon; the spider-host scuttles straight up the brick wall, then hangs upside down from the ceiling beams on a silk thread over the sumo wrestler; gold WALLS banner', t0: st('power3'), t1: end('power3'), bg: 'warehouse',
    cam: [[1.0, 540, 980, 0], [1.06, 560, 960, 0.02]], banners: [['WALLS + CEILING', 'gold', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^crawl/) - st('power3'), 'tick'], [tHang - st('power3'), 'swish']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, spiderIcon)) return;
      const tc = W('power3', /^crawl/) - S.t0, up = ease.smoother(prog(S.t, tc, tc + 1.2)), hang = S.T > tHang;
      const e = person(x, S, 'sumo', hang ? 'shock' : 'calm', 640, 1800, 0.56, { seed: 3, pose: 'shrug', sx: 1.25, pop: S.t0 + 0.45 });
      if (!hang) { x.save(); x.translate(150, lerp(1700, 700, up)); x.rotate(Math.PI / 2); spiderRider(x, S, 'host', 'grin', 0, 0, 0.42, { walk: up > 0 && up < 1 }); x.restore(); }
      else { const dy = ease.outBack(prog(S.T, tHang, tHang + 0.6)) * 200; silk(x, 640, 160, 640, 300 + dy); x.save(); x.translate(640, 300 + dy); x.rotate(Math.PI); spiderRider(x, S, 'host', 'smug', 0, 0, 0.4, {}); x.restore();
        A.mark(x, '!?', e.head[0] + 170, e.head[1] - 200, pop(S.T, tHang + 0.5)); }
    } },
    tHang, [[1.18, 640, 880, -0.03], [1.25, 640, 900, -0.05]], 'Power 3 hang (same warehouse): upside down on a thread right above the wrestler\'s head');

  // ---------------- PEAK: Ancient Zoan toughness ----------------
  const tStrong = W('peak', /^strong/);
  addSplit({ name: 'Peak (erupting volcano): wall icon gives way to the fossil icon, gold halo; gold ANCIENT ZOAN banner; the sumo wrestler charges and bounces right off the spider-host; impact star, 7-frame shake', t0: st('peak'), t1: end('peak'), bg: 'volcano',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['ANCIENT ZOAN', 'gold', st('peak') + 0.4, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Zoan/) - st('peak'), 'charge'], [tStrong - st('peak'), 'impact'], [tStrong - st('peak') + 0.3, 'boing']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, spiderIcon); return; }
      const ts = tStrong - S.t0, hit = S.t > ts, bx = hit ? lerp(700, 1000, ease.outCubic(prog(S.t, ts, ts + 0.6))) : lerp(1050, 700, prog(S.t, 0.5, ts));
      spiderRider(x, S, 'host', 'grin', 380, 1800, 0.6, {});
      person(x, S, 'sumo', hit ? 'hit' : 'shout', bx, 1800, 0.56, { seed: 3, pose: hit ? 'shrug' : 'punch', flip: true, sx: 1.25, rot: hit ? 0.3 : 0 });
      if (hit) { A.impactStar(x, 620, 1250, 200 * (1 - prog(S.t, ts + 0.3, ts + 0.7)), 0.3); if (S.t < ts + 7 * F) S.shake = 1.0; A.shineLines(x, 380, 1150, 300, 440, S.T, 10); }
      if (S.T > W('peak', /^Zoan/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Zoan/), W('peak', /^Zoan/) + 0.3))); S.flashCol = '255,246,200'; }
    } },
    tStrong - 0.1, [[1.25, 560, 1300, -0.02], [1.32, 580, 1290, -0.035]], 'Peak close (same volcano): the wrestler flies back off the tough spider, star and shake');

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (museum at night): a spotlight snaps on a fossil slab with a spider pressed into the stone; push-in with roll, low sting; purple-ish ? marks', t0: st('twist'), t1: end('twist'), bg: 'museumNight', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 980, 0.07]], sfx: [[0, 'sting'], [0.3, 'thunk']],
    draw(x, S) { fossil(x, 540, 980, 1.4 * pop(S.T, S.t0 + 0.15)); A.mark(x, '?', 850, 640, pop(S.T, S.t0 + 0.6), 0.2); A.glow(x, 540, 980, 420, '255,240,200', 0.25); } });
  const tDino = W('truth', /^dinosaurs/) - 0.4;
  add({ name: 'The truth (Triassic valley): long-neck dinosaurs wander by while a big ancient spider sits on a rock; gold OLDEST SPIDER banner; a timeline tag "TRIASSIC"', t0: st('truth'), t1: end('truth'), bg: 'dinoValley',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['OLDEST SPIDER', 'gold', W('truth', /^oldest/) - 0.1, end('truth')]], sfx: [[0, 'whoosh'], [W('truth', /^oldest/) - st('truth'), 'ding'], [tDino - st('truth'), 'rumble']],
    draw(x, S) {
      x.beginPath(); x.ellipse(540, 1560, 360, 120, 0, 0, 7); A.fs(x, '#9a8a7a', 10); spiderBody(x, 560, 1520, 0.75, S.T, { walk: false });
      const p = pop(S.T, tDino); if (p > 0) { x.save(); x.translate(800, 620); x.scale(p, p); x.rotate(0.08); A.rrect(x, -170, -60, 340, 120, 20); A.fs(x, '#ffffff', 10); x.font = `64px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = '#c0392b'; x.fillText('TRIASSIC', 0, 22); x.restore(); }
    } });

  // ---------------- USERS ----------------
  const tRobin = W('users', /^until/) - 0.1;
  add({ name: 'Black Maria (red-and-gold Wano pleasure hall): the giant Flying Six member sits on her spider body with her pipe; red FLYING SIX banner', t0: st('users'), t1: tRobin, bg: 'pleasureHall',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['FLYING SIX', 'red', W('users', /^Flying/) - 0.1, tRobin]], sfx: [[0, 'whoosh'], [0.3, 'rumble']],
    draw(x, S) { spiderRider(x, S, 'blackMaria', 'smug', 560, 1820, 0.72, {}); } });
  add({ name: 'Robin wins (same hall, wider): Robin calmly crosses her arms, a ring of extra arms blooms out of the floor and pins Black Maria; impact star, shake', t0: tRobin, t1: end('users'), bg: 'pleasureHall',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], sfx: [[0.15, 'swish'], [0.5, 'impact']],
    draw(x, S) {
      const k = ease.outBack(prog(S.t, 0.1, 0.5)), hit = S.t > 0.5;
      spiderRider(x, S, 'blackMaria', hit ? 'hit' : 'shock', 720, 1820, 0.6, {});
      for (let i = 0; i < 6; i++) { const ax = 520 + i * 80, ay = 1820; x.save(); x.translate(ax, ay); x.rotate(-0.4 + i * 0.16); x.scale(k, k); A.rrect(x, -22, -260, 44, 260, 20); A.fs(x, '#f0c8a8', 7); x.beginPath(); x.arc(0, -270, 30, 0, 7); A.fs(x, '#f0c8a8', 7); x.restore(); }
      person(x, S, 'robin', 'smug', 220, 1800, 0.62, { seed: 4, pose: 'idle' });
      if (hit) { A.impactStar(x, 760, 1200, 170 * (1 - prog(S.t, 0.7, 1.1)), 0.3); if (S.t < 0.5 + 7 * F) S.shake = 0.9; }
    } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (sunny backyard): the host lounges in a web hammock strung between two trees, sipping coffee; green NO HAMMOCK NEEDED banner', t0: st('joke'), t1: end('joke'), bg: 'backyard',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['FREE HAMMOCK', 'green', W('joke', /^hammock/) - 0.1, end('joke')]], sfx: [[0.3, 'swish'], [W('joke', /^hammock/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      const sw = Math.sin(S.T * 1.5) * 10; web(x, 60, 640, 260, 1, 0.7); web(x, 1020, 640, 260, 1, 0.7);
      hammock(x, 60, 900, 1020, 900, 300 + sw);
      x.save(); x.translate(930, 1130 + sw); x.rotate(-1.5); const h = person(x, S, 'host', 'smug', 0, 0, 0.44, { seed: 11, pose: 'sip', talk: true }); x.restore();
    } });

  ending(T, { TL, fruit });
  return finish();
}
