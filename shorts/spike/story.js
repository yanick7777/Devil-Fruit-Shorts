// Shot plan for the Toge Toge no Mi (Spike-Spike Fruit) short.
// Structure follows the fruit's real uses: three techniques (spike fingers, spike stilts, spike wall) and Doping as the peak.
// No stages and no awakening exist for this fruit, so there are no forced "forms".
import * as A from '/engine/art.js';
import { drawSwirlFruit } from '/engine/swirlFruit.js';
import { F, ease, prog, lerp, pop, person, deskFront, halo, evolve } from '/engine/kit.js';
const PAL = 'slate';
const fruit = (x, cx, cy, R, rot, o = {}) => drawSwirlFruit(x, cx, cy, R, rot, { pal: PAL, ...o });

// ---------------- spike effects ----------------
export function spike(x, x0, y0, x1, y1, w = 26, col = '#c9ccd6') { // steel cone from a base point to a tip
  const a = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(a) * w / 2, ny = Math.cos(a) * w / 2;
  x.beginPath(); x.moveTo(x0 + nx, y0 + ny); x.lineTo(x1, y1); x.lineTo(x0 - nx, y0 - ny); x.closePath(); A.fs(x, col, Math.max(3, w * 0.22));
  x.beginPath(); x.moveTo(x0 + nx * 0.4, y0 + ny * 0.4); x.lineTo(x1 - (x1 - x0) * 0.1, y1 - (y1 - y0) * 0.1); x.lineWidth = Math.max(2, w * 0.15); x.strokeStyle = 'rgba(255,255,255,0.8)'; x.stroke();
}
function spikeFan(x, hx, hy, ang, len, k, n = 5, w = 22) { for (let i = 0; i < n; i++) { const a = ang + (i - (n - 1) / 2) * 0.12; spike(x, hx, hy, hx + Math.cos(a) * len * k, hy + Math.sin(a) * len * k, w); } }
function spikeBurst(x, cx, cy, r0, r1, k, n = 14, t = 0) { for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + 0.2; spike(x, cx + Math.cos(a) * r0, cy + Math.sin(a) * r0 * 1.4, cx + Math.cos(a) * (r0 + (r1 - r0) * k), cy + Math.sin(a) * (r0 + (r1 - r0) * k) * 1.4, 34); } }
function stilts(x, cx, fy, s, h) { for (const sd of [-1, 1]) spike(x, cx + sd * 70 * s, fy - h, cx + sd * 70 * s, fy, 70 * s); }
function bigArms(x, S, cx, fy, s, k, spiky = true) { // pumped-up arms over a figure in the cheer pose
  if (k <= 0) return;
  for (const [sx, sy, ex, ey] of [[262, 690, 165, 560], [498, 690, 595, 560]]) {
    const [ax0, ay] = A.figPoint((sx + ex) / 2, (sy + ey) / 2 + 40, cx, fy, s), ax = ax0 + (sx < 380 ? -70 : 70) * s, r = 120 * s * k;
    x.beginPath(); x.ellipse(ax, ay, r, r * 0.8, sx < 380 ? 0.5 : -0.5, 0, 7); A.fs(x, '#f6c690', 10 * s);
    x.beginPath(); x.arc(ax, ay - r * 0.2, r * 0.55, Math.PI * 1.1, Math.PI * 1.6); x.lineWidth = 8 * s; x.strokeStyle = '#e2a673'; x.stroke();
    if (spiky) for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.3; spike(x, ax + Math.cos(a) * r * 0.85, ay + Math.sin(a) * r * 0.68, ax + Math.cos(a) * r * 1.35, ay + Math.sin(a) * r * 1.1, 26 * s * k); }
  }
}
function bolt(x, x0, y0, x1, y1, k, w = 26) { // zig-zag lightning from (x0,y0) to (x1,y1), drawn over k
  if (k <= 0) return; const n = 7, pts = [];
  for (let i = 0; i <= n; i++) { const u = i / n; pts.push([lerp(x0, x1, u) + (i % 2 ? 40 : -40) * (i && i < n ? 1 : 0), lerp(y0, y1, u)]); }
  const m = Math.max(1, Math.ceil(n * k)); x.save(); x.lineJoin = 'round'; x.lineCap = 'round';
  for (const [lw, col] of [[w + 18, 'rgba(255,240,120,0.4)'], [w + 8, A.OL], [w, '#fff6a0'], [w * 0.4, '#ffffff']]) { x.beginPath(); pts.slice(0, m + 1).forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py))); x.lineWidth = lw; x.strokeStyle = col; x.stroke(); }
  x.restore();
}
function climaTact(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s);
  for (let i = 0; i < 3; i++) { A.rrect(x, -210 + i * 140, -14, 130, 28, 12); A.fs(x, '#5aa8ff', 7); x.beginPath(); x.arc(-145 + i * 140, 0, 20, 0, 7); A.fs(x, '#f4f4f8', 6); } x.restore(); }
export function spikeIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { A.openHand(x, -60, 20, 0.5); spikeFan(x, -10, 20, -0.5, 170, 1, 4, 18); }
  else if (k === 2) { A.rrect(x, -70, -150, 140, 120, 30); A.fs(x, '#22a99a', 8); stilts(x, 0, 140, 1, 170); }
  else if (k === 3) { for (let i = 0; i < 5; i++) spike(x, -80, -100 + i * 50, 100, -100 + i * 50, 30); }
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); x.beginPath(); x.arc(0, 0, 90, 0, 7); A.fs(x, '#f6c690', 8); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; spike(x, Math.cos(a) * 80, Math.sin(a) * 80, Math.cos(a) * 140, Math.sin(a) * 140, 30); } }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const L = Object.fromEntries(TL.lines.map((l) => [l.id, l]));
  const W = (id, re) => { const l = L[id], w = l.words.find((w) => re.test(w.w)); if (!w) throw new Error(`word ${re} not in ${id}`); return l.start + w.t; };
  const end = (id) => L[id].start + L[id].dur, st = (id) => L[id].start;
  const shots = [], add = (o) => shots.push(o);
  const addSplit = (o, tSplit, cam2, name2) => {
    const S0 = o.t0;
    const wrap = (fn) => fn && function (x, S) { const P = new Proxy(S, { get: (t, k) => (k === 't0' ? S0 : k === 't' ? S.T - S0 : t[k]), set: (t, k, v) => { t[k] = v; return true; } }); return fn.call(this, x, P); };
    add({ ...o, t1: tSplit });
    add({ ...o, name: name2, t0: tSplit, cam: cam2, banners: [], sfx: [], draw: wrap(o.draw), hud: wrap(o.hud) });
  };
  const evolveIn = (x, S, a, b) => { A.glowRing(x, 540, 760, 300 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, a, b, 540, 760, 1.4, 0.45, spikeIcon); };

  // ---------------- HOOK ----------------
  const tDrop = 0.55, tShock = 0.9, tBite = W('hook', /^bite/), s2 = tBite - 0.4;
  add({ name: 'Hook (desk room): host sips coffee, a slate-purple swirl fruit drops onto the plate, wide-eyed shock with !?', t0: 0, t1: s2, bg: 'desk',
    cam: [[1.0, 540, 980, 0], [1.07, 540, 950, 0]], sfx: [[0.1, 'sip'], [tDrop - 0.25, 'fall'], [tDrop + 0.3, 'thunk'], [tShock, 'shock']],
    draw(x, S) {
      const h = person(x, S, 'host', S.t < tShock ? 'calm' : 'shock', 540, 1900, 0.8, { pose: S.t > 0.05 && S.t < 0.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S);
      fruit(x, 290, lerp(-200, 1340, ease.outBounce(prog(S.t, tDrop - 0.3, tDrop + 0.3))), 80, S.T * 0.6, { shadow: false });
      if (S.t > tDrop + 0.3 && S.t < tDrop + 0.3 + 7 * F) S.shake = 0.6;
      if (S.t > tShock) A.mark(x, '!?', h.head[0] + 230, h.head[1] - 230, pop(S.T, tShock));
    } });
  add({ name: 'The bite (desk close-up): dip, bite, disgusted face; little steel spikes pop out of his hair; pink YOUR FRUIT banner', t0: s2, t1: end('hook'), bg: 'desk',
    cam: [[1.4, 500, 1010, 0.02], [1.5, 490, 1000, 0.035]], banners: [['YOUR FRUIT', 'pink', W('hook', /^fruit/) - 0.1, end('hook')]],
    sfx: [[tBite - s2, 'crunch'], [tBite - s2 + 0.3, 'slash'], [W('hook', /^weird/) - s2, 'yuck']],
    draw(x, S) {
      const bt = tBite - s2, bitten = S.t >= bt, atMouth = S.t > bt - 0.35 && S.t < bt + 0.45, dip = S.t > bt - 2 * F && S.t < bt ? 16 : 0;
      const k = ease.outBack(prog(S.t, bt + 0.25, bt + 0.5));
      if (bitten && k > 0) { const [hx, hy] = A.figPoint(380, 200, 540, 1900, 0.8); for (let i = 0; i < 7; i++) { const a = Math.PI * (1.1 + i * 0.13); spike(x, hx + Math.cos(a) * 120, hy + Math.sin(a) * 100, hx + Math.cos(a) * (120 + 110 * k), hy + Math.sin(a) * (100 + 110 * k), 26); } }
      const h = person(x, S, 'host', bitten ? 'yuck' : 'calm', 540, 1900, 0.8, { pose: atMouth ? 'sip' : 'hold' });
      deskFront(x, S); A.mug(x, 830, 1330, 0.75, S.T, true, false);
      const fx = h.hand.R[0] - 18, fy = h.hand.R[1] - 48 + dip; fruit(x, fx, fy, 56, S.T * 0.4, { shadow: false });
      if (bitten) { x.beginPath(); x.arc(fx + 40, fy - 10, 22, 0, 7); x.fillStyle = '#eceaff'; x.fill(); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke(); A.mark(x, '!?', 820, 560, pop(S.T, tBite + 0.1)); }
      S.flash = Math.max(S.flash, 0.45 * (1 - prog(S.t, bt, bt + 0.25)) * (bitten ? 1 : 0));
    } });
  add({ name: 'Don\'t panic (desert with cacti): the host calms down and holds up the bitten fruit', t0: st('calm'), t1: end('calm'), bg: 'desertCactus',
    cam: [[1.06, 540, 1000, -0.02], [1.12, 540, 990, 0.01]], sfx: [[0, 'whoosh'], [W('calm', /^Devil/) - st('calm'), 'shimmer']],
    draw(x, S) {
      const tj = W('calm', /^just/) - S.t0;
      const h = person(x, S, 'host', S.t < tj ? 'worried' : 'calm', 520, 1760, 0.8, { talk: true, seed: 1, pose: 'holdUp' });
      if (S.t < tj) A.sweat(x, h.head[0] + 190, h.head[1] - 60, pop(S.T, S.t0 + 0.3));
      fruit(x, h.hand.R[0] + 20, h.hand.R[1] - 70, 58, S.T * 0.4, { shadow: false });
      const td = W('calm', /^Devil/) - S.t0; A.sparkle(x, h.hand.R[0] - 20, h.hand.R[1] - 160, 36 * Math.sin(Math.PI * prog(S.t, td, td + 0.6)));
    } });

  // ---------------- OUT OF EVERY FRUIT + NAME ----------------
  const tName = W('name', /^Spike-Spike/) - 0.15, tThat = W('type', /^that/) - 0.1;
  add({ name: 'Out of every fruit: lime rays, pink ゴ marks, spinning globe, dark unnamed fruit silhouettes', t0: st('sea'), t1: tName, bg: 'rays:lime',
    cam: [[1.0, 540, 900, 0], [1.1, 540, 880, 0.04]], sfx: [[0, 'whoosh'], [0.1, 'rumble']],
    draw(x, S) {
      A.globe(x, 540, 860, 230 * pop(S.T, S.t0 + 0.05), S.T);
      for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + S.T * 0.6, p = pop(S.T, S.t0 + 0.12 + i * 0.18); if (p > 0) A.fruitSilhouette(x, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 300, 70 * p, i + 13); }
      A.gogo(x, 110, 330, S.T, pop(S.T, S.t0 + 0.1)); A.gogo(x, 800, 1020, S.T + 1, 0.7 * pop(S.T, S.t0 + 0.6));
    } });
  add({ name: 'Fruit reveal (cactus greenhouse): the Spike-Spike Fruit spins inside a ring of steel spikes; pink SPIKE-SPIKE FRUIT banner', t0: tName, t1: tThat, bg: 'greenhouse',
    cam: [[1.05, 540, 900, 0.02], [1.16, 540, 880, 0]], banners: [['SPIKE-SPIKE FRUIT', 'pink', tName + 0.1, tThat]], sfx: [[0, 'whoosh'], [0.1, 'ding'], [0.3, 'shimmer']],
    draw(x, S) {
      halo(x, 540, 900, 470, '190,170,255', S.T);
      const k = ease.outBack(prog(S.t, 0.1, 0.5)); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + S.T * 0.4; spike(x, 540 + Math.cos(a) * 330, 900 + Math.sin(a) * 330, 540 + Math.cos(a) * (330 - 60 * k), 900 + Math.sin(a) * (330 - 60 * k), 34); }
      fruit(x, 540, 900, 230 * pop(S.T, S.t0), S.t * 0.7);
    } });

  // ---------------- TYPE + STAGE ----------------
  const tAny = W('type', /^any/) - 0.1, tSp = W('type', /^spikes/);
  add({ name: 'Spikes everywhere (armory wall): steel spikes burst out of the host\'s whole body; the captain jumps back', t0: tThat, t1: tAny, bg: 'armory',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 560, 990, 0.03]], sfx: [[0.1, 'whoosh'], [tSp - tThat, 'slash'], [tSp - tThat + 0.1, 'impact']],
    draw(x, S) {
      const ts = tSp - S.t0, k = ease.outBack(prog(S.t, ts, ts + 0.3));
      const e = person(x, S, 'captain', S.t > ts ? 'shock' : 'smug', 880, 1780, 0.62, { seed: 3, pose: S.t > ts ? 'shrug' : 'idle', flip: true });
      if (k > 0) spikeBurst(x, 400, 1220, 150, 330, k, 14);
      person(x, S, 'host', S.t > ts ? 'grin' : 'calm', 400, 1780, 0.66, { seed: 2, pose: 'cheer' });
      if (S.t > ts) { A.mark(x, '!?', e.head[0] - 150, e.head[1] - 200, pop(S.T, S.t0 + ts + 0.2)); if (S.t < ts + 7 * F) S.shake = 0.6; }
    } });
  const pw = [W('type', /^any/), W('type', /^part/), W('type', /^your/), W('type', /^body/)], lvl = pw[3] + 0.4;
  const labels = ['FINGERS', 'STILTS', 'WALL', 'DOPING'];
  add({ name: 'Arena stage behind an iron spike fence: FINGERS, STILTS, WALL and DOPING pop onto pedestals, the bar fills, LEVEL UP', t0: tAny, t1: end('type'), bg: 'spikeArena',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 920, 0.03]], sfx: [[0, 'whoosh'], ...pw.map((t) => [t - tAny, 'pop']), [lvl - tAny, 'levelup']],
    draw(x, S) {
      const xs = [165, 415, 665, 915], lit = pw.filter((t) => S.T >= t).length;
      const fill = lit === 0 ? 0 : (lit - 1) / 4 + 0.25 * ease.outCubic(prog(S.T, pw[lit - 1], pw[lit - 1] + 0.3));
      A.progressBar(x, 540, 560, 900, fill, S.T > lvl ? 'LEVEL UP!' : 'SPIKE TRICKS');
      if (S.T > lvl) A.shineLines(x, 540, 560, 470, 620, S.T, 12);
      xs.forEach((px, i) => {
        if (i === lit - 1) halo(x, px, 860, 210, i === 3 ? '255,220,90' : '190,170,255', S.T);
        A.pedestal(x, px, 990, labels[i], i < lit);
        const p = pop(S.T, pw[i]); if (p > 0) spikeIcon(x, i + 1, px, 860 + Math.sin(S.T * 2 + i) * 10, 0.62 * p, S.T);
        else { x.font = `110px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillText('?', px, 900); }
      });
    } });

  // ---------------- POWER 1: spike fingers ----------------
  const tLong = W('power1', /^long/) - 0.1, tFing = W('power1', /^fingers/);
  addSplit({ name: 'Power 1 (lumber yard): the host points, his fingers shoot out into long steel spikes and skewer a stack of planks next to the captain; gold FINGERS banner; magnifier on the fingertips', t0: st('power1'), t1: end('power1'), bg: 'lumberYard',
    cam: [[1.05, 560, 1000, -0.02], [1.1, 580, 990, -0.01]], banners: [['FINGERS', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.1, 'whoosh'], [tFing - st('power1') + 0.1, 'slash'], [tFing - st('power1') + 0.35, 'crumble']],
    draw(x, S) {
      const tf = tFing - S.t0, k = ease.outCubic(prog(S.t, tf, tf + 0.35)), hit = S.t > tf + 0.35;
      A.rrect(x, 640, 1080 + (hit ? 6 : 0), 380, 50, 10); A.fs(x, '#e6b878', 8); A.rrect(x, 640, 1140, 380, 50, 10); A.fs(x, '#d9a868', 8);
      const e = person(x, S, 'captain', hit ? 'shock' : 'smug', 900, 1780, 0.6, { seed: 3, pose: hit ? 'shrug' : 'idle', flip: true });
      const h = person(x, S, 'host', 'smug', 230, 1780, 0.66, { seed: 2, pose: 'punch' });
      spikeFan(x, h.hand.R[0] + 20, h.hand.R[1], 0.04, 720, k, 4, 22);
      if (hit) { A.impactStar(x, 760, 1120, 110 * (1 - prog(S.t, tf + 0.35, tf + 0.7)), 0.2); A.mark(x, '!?', e.head[0] - 160, e.head[1] - 200, pop(S.T, S.t0 + tf + 0.4)); if (S.t < tf + 0.35 + 7 * F) S.shake = 0.6; }
    } },
    tLong, [[1.4, 520, 1020, 0.02], [1.48, 540, 1010, 0.035]], 'Power 1 close (same yard): the spike fingers stuck clean through the planks');

  // ---------------- POWER 2: spike stilts ----------------
  const tRun = W('power2', /^run/) - 0.1;
  addSplit({ name: 'Power 2 evolve (neon night street): fingers icon becomes the stilts icon, flash + glow ring; gold STILTS banner; spikes shoot out under the host\'s feet and lift him high; he runs across on them past the captain, ?', t0: st('power2'), t1: end('power2'), bg: 'nightStreet',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 960, -0.02]], banners: [['STILTS', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^feet/) - st('power2'), 'slash'], [tRun - st('power2'), 'zip']],
    draw(x, S) {
      if (S.t < 0.5) return evolveIn(x, S, 1, 2);
      const tf = W('power2', /^feet/) - S.t0, h = 400 * ease.outBack(prog(S.t, tf, tf + 0.4)), run = prog(S.T, tRun, end('power2'));
      const hx = lerp(320, 900, ease.smoother(run)), bob = run > 0 ? Math.abs(Math.sin(S.T * 10)) * 20 : 0;
      const e = person(x, S, 'captain', run > 0 ? 'shock' : 'calm', 260, 1780, 0.6, { seed: 3, pose: 'shrug', pop: S.t0 + 0.45 });
      if (h > 0) stilts(x, hx, 1780, 0.6, h + bob);
      person(x, S, 'host', 'grin', hx, 1780 - h - bob, 0.6, { seed: 2, pose: run > 0 ? 'cheer' : 'idle', pop: S.t0 + 0.45 });
      if (run > 0) { A.speedLines(x, hx - 200, 1300 - h, S.T, 10, 200, Math.PI); A.mark(x, '?', e.head[0] + 160, e.head[1] - 200, pop(S.T, tRun + 0.2), 0.2); }
    } },
    tRun, [[1.12, 620, 1000, 0.03], [1.18, 680, 990, 0.045]], 'Power 2 run (same street): the host strides along on two giant spikes');

  // ---------------- POWER 3: spike wall ----------------
  const tPin = W('power3', /^pin/) - 0.1;
  addSplit({ name: 'Power 3 evolve (brick alley): stilts icon becomes the spike-wall icon; the host\'s arms burst into a row of spikes that pin the captain\'s coat to the bricks; impact star, shake, !?; gold WALL banner', t0: st('power3'), t1: end('power3'), bg: 'brickAlley',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['SPIKE WALL', 'gold', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^spikes/) - st('power3'), 'slash'], [tPin - st('power3') + 0.3, 'impact']],
    draw(x, S) {
      if (S.t < 0.5) return evolveIn(x, S, 2, 3);
      const ts = W('power3', /^spikes/) - S.t0, k = ease.outCubic(prog(S.t, ts, ts + 0.5)), hit = S.T > tPin + 0.3;
      const e = person(x, S, 'captain', hit ? 'hit' : 'worried', 830, 1700, 0.62, { seed: 3, pose: 'shrug', flip: true, pop: S.t0 + 0.45 });
      const h = person(x, S, 'host', 'shout', 230, 1780, 0.64, { seed: 2, pose: 'cheer', pop: S.t0 + 0.45 });
      if (k > 0) for (let i = 0; i < 6; i++) { const y = 900 + i * 110; spike(x, h.hand.R[0], h.hand.R[1] + i * 60, lerp(h.hand.R[0], i % 2 ? 960 : 700, k), y, 30); }
      if (hit) { A.impactStar(x, 830, 1100, 170 * (1 - prog(S.T, tPin + 0.5, tPin + 0.9)), 0.3); A.mark(x, '!?', e.head[0] + 170, e.head[1] - 220, pop(S.T, tPin + 0.4)); if (S.T < tPin + 0.3 + 7 * F) S.shake = 0.9; }
    } },
    tPin, [[1.28, 700, 1060, -0.03], [1.36, 720, 1050, -0.045]], 'Power 3 close (same alley): the captain pinned to the wall between the spikes');

  // ---------------- PEAK: Doping ----------------
  const tDop = W('peak', /^Doping/), tPump = W('peak', /^pump/);
  addSplit({ name: 'Peak (gym): wall icon gives way to the Doping icon, gold halo; the host flexes and his arms pump up into huge spiked arms; gold DOPING banner; the captain backs away', t0: st('peak'), t1: end('peak'), bg: 'gym',
    cam: [[1.0, 540, 980, 0], [1.1, 540, 940, 0.02]], banners: [['DOPING', 'gold', tDop - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [tDop - st('peak'), 'charge'], [tPump - st('peak'), 'inflate']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, spikeIcon); return; }
      const k = ease.outBack(prog(S.T, tPump - 0.1, tPump + 0.5));
      const e = person(x, S, 'captain', k > 0.5 ? 'shock' : 'calm', 900, 1780, 0.56, { seed: 3, pose: 'shrug', flip: true, pop: S.t0 + 0.5 });
      person(x, S, 'host', 'shout', 440, 1780, 0.74, { pop: S.t0 + 0.45, seed: 7, pose: 'cheer' });
      bigArms(x, S, 440, 1780, 0.74, k);
      if (k > 0.5) { A.shineLines(x, 440, 900, 380, 520, S.T, 12); A.mark(x, '!?', e.head[0] - 140, e.head[1] - 200, pop(S.T, tPump + 0.4)); }
      if (S.T > tDop) { S.flash = Math.max(S.flash, 0.5 * (1 - prog(S.T, tDop, tDop + 0.3))); S.flashCol = '255,246,200'; }
    } },
    tPump - 0.15, [[1.25, 520, 1080, -0.02], [1.33, 520, 1060, -0.035]], 'Peak close (same gym): the giant spiked arms flex, shine lines, the captain backs off');

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (dark rainy night): a blue three-part weather stick spins down through the rain; push-in with roll, low sting; blue WEATHER STICK banner', t0: st('twist'), t1: end('twist'), bg: 'rainNight', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 980, 0.07]], banners: [['WEATHER STICK', 'blue', W('twist', /^weather/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.4, 'whoosh']],
    draw(x, S) { const k = ease.outCubic(prog(S.t, 0.1, 1.2)); climaTact(x, 540, lerp(-200, 900, k), 1.6, S.T * 6 * (1 - k) + 0.2); A.sparkle(x, 540, 900, 50 * prog(S.t, 1.0, 1.4)); } });
  const tBolt = W('truth', /^lightning/);
  add({ name: 'The win (purple thunder clouds): Nami raises the Clima-Tact, a lightning bolt crashes down on Zala\'s spikes; white flash, impact, shake; gold THUNDERBOLT banner', t0: st('truth'), t1: end('truth'), bg: 'thunderClouds',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['THUNDERBOLT!', 'gold', tBolt - 0.1, end('truth')]], sfx: [[0, 'whoosh'], [tBolt - st('truth'), 'zap'], [tBolt - st('truth') + 0.15, 'impact']],
    draw(x, S) {
      const tb = tBolt - S.t0, hit = S.t > tb + 0.15;
      const n = person(x, S, 'nami', 'shout', 260, 1780, 0.66, { seed: 4, pose: 'raise' }); climaTact(x, n.hand.L[0], n.hand.L[1] - 20, 0.7, -1.2);
      const z = person(x, S, 'zala', hit ? 'hit' : 'smug', 800, 1780, 0.66, { seed: 5, pose: 'punch', flip: true, rot: hit ? 0.2 * prog(S.t, tb + 0.15, tb + 0.6) : 0 });
      if (!hit) spikeFan(x, z.hand.R[0] - 10, z.hand.R[1], Math.PI + 0.1, 260, 1, 4, 20);
      bolt(x, 820, -200, z.head[0], z.head[1] + 60, prog(S.t, tb, tb + 0.15), 30);
      if (hit) { S.flash = Math.max(S.flash, 0.9 * (1 - prog(S.t, tb + 0.15, tb + 0.5))); S.flashCol = '255,255,240'; A.impactStar(x, z.head[0], z.head[1] + 150, 200 * (1 - prog(S.t, tb + 0.4, tb + 0.8)), 0.3); if (S.t < tb + 0.15 + 7 * F) S.shake = 1.1; }
    } });

  // ---------------- USERS ----------------
  add({ name: 'Zala (Baroque Works casino): Miss Doublefinger smirks, her fingers stretch into spikes; red BAROQUE WORKS banner', t0: st('users'), t1: end('users'), bg: 'casino',
    cam: [[1.05, 540, 1000, 0.02], [1.14, 540, 980, 0]], banners: [['BAROQUE WORKS', 'red', W('users', /^Baroque/) - 0.1, end('users')]], sfx: [[0, 'whoosh'], [0.6, 'slash']],
    draw(x, S) { const z = person(x, S, 'zala', 'smug', 540, 1800, 0.86, { pop: S.t0 + 0.05, seed: 8, pose: 'holdUp' }); spikeFan(x, z.hand.R[0], z.hand.R[1] - 30, -1.5, 260, ease.outCubic(prog(S.t, 0.5, 0.8)), 4, 22); A.sparkle(x, z.hand.R[0] + 30, z.hand.R[1] - 300, 30 * Math.abs(Math.sin(S.T * 4))); } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (train platform): the host opens his arms for a hug, spikes pop out all over; the captain leaps away; red NO HUGS banner', t0: st('joke'), t1: end('joke'), bg: 'trainPlatform',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO HUGS', 'red', W('joke', /^hugs/) - 0.1, end('joke')]], sfx: [[0.3, 'slash'], [W('joke', /^hugs/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      const k = ease.outBack(prog(S.t, 0.4, 0.7));
      const e = person(x, S, 'captain', k > 0.5 ? 'shock' : 'grin', lerp(780, 900, k), 1780, 0.62, { seed: 3, pose: k > 0.5 ? 'shrug' : 'idle', flip: true, rot: 0.1 * k });
      if (k > 0) spikeBurst(x, 380, 1220, 150, 300, k, 12);
      person(x, S, 'host', 'grin', 380, 1780, 0.72, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug', talk: true });
      if (k > 0.5) A.mark(x, '!?', e.head[0] + 120, e.head[1] - 200, pop(S.T, S.t0 + 0.7));
    } });

  // ---------------- OUTRO ----------------
  const tDesk = st('outro') + L.outro.voStart + L.outro.voDur + 0.35;
  add({ name: 'Outro (purple rays): host with big ? marks, the swirl fruit bouncing in; pink NEXT? banner', t0: st('outro'), t1: tDesk, bg: 'rays:purple',
    cam: [[1.0, 540, 960, 0], [1.1, 540, 930, 0.03]], banners: [['NEXT?', 'pink', st('outro') + 0.3, tDesk]], sfx: [[0, 'whoosh'], [0.3, 'pop'], [0.8, 'pop'], [1.4, 'pop']],
    draw(x, S) {
      A.gogo(x, 90, 300, S.T, 0.8 * pop(S.T, S.t0 + 0.2));
      person(x, S, 'host', 'smug', 540, 1760, 0.8, { pop: S.t0 + 0.05, talk: true, seed: 12, pose: 'shrug' });
      A.mark(x, '?', 200, 640, 1.3 * pop(S.T, S.t0 + 0.8), -0.2); A.mark(x, '?', 880, 600, 1.1 * pop(S.T, S.t0 + 1.4), 0.25);
      const p = pop(S.T, S.t0 + 2.0); if (p > 0) fruit(x, 860, 1200 - Math.abs(Math.sin(S.T * 4)) * 60, 70 * p, S.T, { shadow: false });
    } });
  add({ name: 'Back in the desk room: host sips coffee, steam rising', t0: tDesk, t1: TL.duration, bg: 'desk',
    cam: [[1.12, 540, 1000, 0], [1.18, 540, 990, 0]], sfx: [[0.2, 'sip']],
    draw(x, S) {
      const h = person(x, S, 'host', 'calm', 540, 1900, 0.8, { seed: 13, pose: S.t > 0.25 && S.t < 1.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S, { plate: true });
    } });

  shots.forEach((s, i) => { s.i = i; s.sfx = (s.sfx || []).map(([t, n]) => [s.t0 + t, n]); });
  return shots;
}
