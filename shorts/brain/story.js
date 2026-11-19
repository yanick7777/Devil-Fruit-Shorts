// Shot plan for the Nomi Nomi no Mi (Brain-Brain Fruit) short.
// Structure follows the fruit's real uses: the brain grows, perfect memory, detaching the brain, and Punk Records as the peak.
import * as A from '/engine/art.js';
import { drawSwirlFruit } from '/engine/swirlFruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawSwirlFruit(x, cx, cy, R, rot, { pal: 'pink', ...o });

// ---------------- brain effects ----------------
export function brain(x, cx, cy, r, t = 0, glow = 0) {
  if (r <= 0) return; x.save();
  if (glow) A.glow(x, cx, cy, r * 1.6, '255,140,200', glow);
  x.beginPath(); x.ellipse(cx, cy, r * 1.2, r * 0.9, 0, 0, 7); A.fs(x, '#ff9ccf', Math.max(4, r * 0.07));
  x.save(); x.beginPath(); x.ellipse(cx, cy, r * 1.2, r * 0.9, 0, 0, 7); x.clip(); x.strokeStyle = '#d0609a'; x.lineWidth = Math.max(3, r * 0.05); x.lineCap = 'round';
  for (let i = 0; i < 9; i++) { const y0 = cy - r * 0.7 + i * r * 0.18; x.beginPath(); for (let k = 0; k <= 10; k++) { const px = cx - r * 1.2 + k * r * 0.24; x.lineTo(px, y0 + Math.sin(k * 1.7 + i * 2.1 + t) * r * 0.08); } x.stroke(); }
  x.beginPath(); x.moveTo(cx, cy - r * 0.9); x.quadraticCurveTo(cx + r * 0.05, cy, cx, cy + r * 0.9); x.lineWidth = Math.max(4, r * 0.06); x.strokeStyle = '#b04880'; x.stroke(); x.restore();
  x.beginPath(); x.ellipse(cx - r * 0.5, cy - r * 0.45, r * 0.3, r * 0.12, -0.5, 0, 7); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fill(); x.restore();
}
function book(x, cx, cy, s, rot, col) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.rrect(x, -60, -40, 120, 80, 6); A.fs(x, col, 6); x.fillStyle = '#f4ead2'; x.fillRect(-52, -30, 104, 8); x.restore(); }
function cable(x, x0, y0, x1, y1, t, col = '#5affe0') { x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + 120, x1, y1); x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 7; x.strokeStyle = col; x.stroke();
  const u = (t * 0.8) % 1, px = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * (x0 + x1) / 2 + u * u * x1, py = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * (Math.max(y0, y1) + 120) + u * u * y1; x.beginPath(); x.arc(px, py, 10, 0, 7); x.fillStyle = '#ffffff'; x.fill(); }
function bigHead(x, S, cx, fy, s, k) { // a swollen brain-head on top of a figure
  const [hx, hy] = A.figPoint(380, 260, cx, fy, s); brain(x, hx, hy - 160 * s * k, 230 * s * (1 + k * 0.8), S.T); }
function paper(x, cx, cy, s, grade) { x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(s, s); A.rrect(x, -130, -170, 260, 340, 10); A.fs(x, '#ffffff', 8); x.strokeStyle = 'rgba(80,80,120,0.5)'; x.lineWidth = 6; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(-100, -60 + i * 40); x.lineTo(80, -60 + i * 40); x.stroke(); }
  x.font = `110px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = '#e8303c'; x.fillText(grade, 40, -80); x.restore(); }
export function brainIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { brain(x, 0, 0, 70 + 30 * Math.abs(Math.sin(t * 2)), t); }
  else if (k === 2) { brain(x, -20, 20, 80, t); book(x, 70, -70, 0.7, 0.3, '#2f6fb5'); }
  else if (k === 3) { brain(x, 0, -40, 70, t); x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-90, 60); x.lineTo(90, 60); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke(); x.setLineDash([]); x.beginPath(); x.arc(0, 120, 40, 0, 7); A.fs(x, '#f6c690', 6); }
  else { A.glow(x, 0, 0, 180, '255,140,200', 0.6); brain(x, 0, 0, 90, t); for (let i = 0; i < 4; i++) { const a = i / 4 * 6.283; x.beginPath(); x.moveTo(Math.cos(a) * 100, Math.sin(a) * 80); x.lineTo(Math.cos(a) * 170, Math.sin(a) * 140); x.lineWidth = 8; x.strokeStyle = '#5affe0'; x.stroke(); } }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a pink swirl fruit', biteDesc: 'a light-bulb idea pings above his head', biteSfx: 'ding', bannerCol: 'pink', biteCol: '#ffe8f2',
    biteFx(x, S, k) { const p = ease.outBack(k); x.save(); x.translate(300, 620); x.scale(p, p); x.beginPath(); x.arc(0, 0, 50, 0, 7); A.fs(x, '#ffe680', 7); A.rrect(x, -22, 40, 44, 30, 6); A.fs(x, '#9aa0b0', 5); x.restore(); A.shineLines(x, 300, 620, 60, 110 * p, S.T, 8); },
    calmBg: 'library', calmDesc: 'library', seaHue: 'indigo', seed: 57, nameRe: /^Brain-Brain/,
    revealBg: 'bookTower', revealDesc: 'towers of books', revealBanner: 'BRAIN-BRAIN FRUIT', haloRgb: '255,150,210' });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tEnd = W('type', /^endless/) - 0.1;
  add({ name: 'Endless knowledge (planetarium): books fly in from all sides and get sucked into a glowing brain over the host', t0: tThat, t1: tEnd, bg: 'planetarium',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'whoosh'], [0.5, 'shimmer']],
    draw(x, S) { person(x, S, 'host', 'grin', 540, 1780, 0.7, { seed: 2, pose: 'cheer' }); brain(x, 540, 560, 120, S.T, 0.5); for (let i = 0; i < 6; i++) { const u = (S.T * 0.8 + i / 6) % 1, a = i * 1.05; book(x, 540 + Math.cos(a) * 500 * (1 - u), 560 + Math.sin(a) * 600 * (1 - u), 0.8 * (1 - u * 0.6), u * 4, ['#c0392b', '#2f6fb5', '#5c8a3a', '#d9a03a', '#7a5ab5', '#ff8a2e'][i]); } } });
  stage(T, { desc: 'circuit-board wall', bg: 'circuitBoard', t0: tEnd, t1: end('type'), times: [W('type', /^endless/), W('type', /^amount/), W('type', /^of$/), W('type', /^knowledge/)],
    labels: ['GROW', 'REMEMBER', 'DETACH', 'RECORDS'], bar: 'BRAIN POWERS', haloRgb: '255,150,210', icon: brainIcon });

  // ---------------- POWER 1: grows ----------------
  const tLearn = W('power1', /^learn/) - 0.1;
  addSplit({ name: 'Power 1 (classroom with a chalkboard): the host reads a book and his head swells into a big glowing brain; pink GROW banner', t0: st('power1'), t1: end('power1'), bg: 'classroom',
    cam: [[1.05, 540, 1050, -0.02], [1.1, 540, 1000, -0.01]], banners: [['BRAIN GROWS', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^bigger/) - st('power1'), 'inflate'], [tLearn - st('power1'), 'ding']],
    draw(x, S) { const k = ease.outBack(prog(S.T, W('power1', /^bigger/) - 0.2, W('power1', /^bigger/) + 0.4)); const h = person(x, S, 'host', 'grin', 540, 1780, 0.66, { seed: 2, pose: 'holdUp' }); book(x, h.hand.R[0], h.hand.R[1] - 30, 1, 0, '#2f6fb5'); if (k > 0) bigHead(x, S, 540, 1780, 0.66, k * 0.5); } },
    tLearn, [[1.2, 540, 1000, 0.02], [1.28, 540, 980, 0.035]], 'Power 1 more (same classroom): another book, the brain balloons even bigger; the rival gasps');
  const p1 = T.shots[T.shots.length - 1];
  p1.draw = function (x, S) { const k = 0.5 + 0.5 * ease.outBack(prog(S.T, tLearn, tLearn + 0.5)); const e = person(x, S, 'rival', 'shock', 900, 1780, 0.5, { seed: 3, pose: 'shrug', flip: true }); person(x, S, 'host', 'grin', 460, 1780, 0.66, { seed: 2, pose: 'holdUp' }); bigHead(x, S, 460, 1780, 0.66, k); A.mark(x, '!?', e.head[0] - 100, e.head[1] - 160, pop(S.T, tLearn + 0.3)); };

  // ---------------- POWER 2: remember ----------------
  const tFor = W('power2', /^forever/) - 0.1;
  add({ name: 'Power 2 evolve (corridor of doors): grow icon becomes the memory icon, flash + glow ring; gold REMEMBER banner; every door in the corridor swings open and glowing memory pictures float out to the host', t0: st('power2'), t1: end('power2'), bg: 'memoryHall',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['PERFECT MEMORY', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^everything/) - st('power2'), 'shimmer'], [tFor - st('power2'), 'ding']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, brainIcon)) return;
      person(x, S, 'host', 'smug', 540, 1780, 0.66, { seed: 2, pose: 'cheer', pop: S.t0 + 0.45 });
      for (let i = 0; i < 6; i++) { const u = prog(S.T, W('power2', /^everything/) + i * 0.15, W('power2', /^everything/) + i * 0.15 + 1.0); if (u <= 0) continue; const sx = i % 2 ? 900 : 180, sy = 700 + Math.floor(i / 2) * 150; x.save(); x.translate(lerp(sx, 540, u), lerp(sy, 620, u)); x.scale(1 - u * 0.6, 1 - u * 0.6); A.rrect(x, -70, -50, 140, 100, 10); A.fs(x, '#fff4c8', 6); A.sparkle(x, 0, 0, 30); x.restore(); }
      if (S.T > tFor) { x.save(); x.translate(820, 560); x.scale(pop(S.T, tFor), pop(S.T, tFor)); x.font = `100px ${A.FONT}`; x.textAlign = 'center'; x.lineWidth = 14; x.strokeStyle = A.OL; x.strokeText('100%', 0, 0); x.fillStyle = '#5cc45a'; x.fillText('100%', 0, 0); x.restore(); }
    } });

  // ---------------- POWER 3: detach ----------------
  const tOut = W('power3', /^outside/) - 0.1;
  add({ name: 'Power 3 evolve (lab with glowing tubes): memory icon becomes the detach icon; the host\'s big brain lifts off his head and floats into a glowing tube, connected by a cable; red DETACH banner; ?', t0: st('power3'), t1: end('power3'), bg: 'tubeLab',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['DETACHED', 'red', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^cut/) - st('power3'), 'slash'], [tOut - st('power3'), 'shimmer']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, brainIcon)) return;
      const k = ease.smoother(prog(S.T, W('power3', /^cut/), tOut + 0.3)), h = person(x, S, 'host', 'calm', 300, 1780, 0.66, { seed: 2, pose: 'shrug', pop: S.t0 + 0.45 });
      const bx = lerp(h.head[0], 820, k), by = lerp(h.head[1] - 200, 700, k); A.rrect(x, 720, 450, 200, 520, 100); x.fillStyle = 'rgba(160,255,230,0.5)'; x.fill(); x.lineWidth = 10; x.strokeStyle = A.OL; x.stroke();
      brain(x, bx, by, 110, S.T, 0.3); if (k > 0.2) cable(x, h.head[0], h.head[1] - 100, bx - 100, by + 40, S.T);
      if (k > 0.8) A.mark(x, '?', h.head[0] + 160, h.head[1] - 200, pop(S.T, tOut + 0.3), 0.2);
    } });

  // ---------------- PEAK: Punk Records ----------------
  const tShare = W('peak', /^share/) - 0.1;
  addSplit({ name: 'Peak (sky full of data cables): the detach icon gives way to the Punk Records icon, gold halo; gold PUNK RECORDS banner; a gigantic glowing brain floats in the sky', t0: st('peak'), t1: end('peak'), bg: 'cableSky',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['PUNK RECORDS', 'gold', W('peak', /^Punk/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Punk/) - st('peak'), 'charge'], [W('peak', /^giant/) - st('peak'), 'rumble']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,150,210', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5), '255,190,230'); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, brainIcon); return; }
      brain(x, 540, 820, 330 * ease.outBack(prog(S.T, W('peak', /^Punk/), W('peak', /^giant/) + 0.3)), S.T, 0.5);
      if (S.T > W('peak', /^Punk/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Punk/), W('peak', /^Punk/) + 0.3))); S.flashCol = '255,240,250'; }
    } },
    tShare, [[1.0, 540, 1000, -0.02], [1.06, 540, 990, -0.04]], 'Peak share (same sky): cables run from the giant brain down to the host and the rival, both lighting up with ideas');
  const pk = T.shots[T.shots.length - 1];
  pk.draw = function (x, S) { brain(x, 540, 560, 260, S.T, 0.5); const h = person(x, S, 'host', 'grin', 300, 1800, 0.56, { seed: 7, pose: 'cheer' }), e = person(x, S, 'rival', 'grin', 800, 1800, 0.52, { seed: 3, pose: 'cheer', flip: true });
    cable(x, 460, 780, h.head[0], h.head[1] - 140, S.T); cable(x, 620, 780, e.head[0], e.head[1] - 140, S.T + 0.5, '#ff8cd0'); for (const p of [h, e]) A.sparkle(x, p.head[0], p.head[1] - 230, 36 * Math.abs(Math.sin(S.T * 5))); };

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (hallway with a tiny door): a very small door at the end of the hall; push-in with roll, low sting; red CATCH banner', t0: st('twist'), t1: end('twist'), bg: 'tinyDoor', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1060, 0.07]], banners: [['THE CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 760, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  const tCut = W('truth', /^cut/) - 0.1;
  add({ name: 'Too big (same hallway): the host\'s head has swollen into a huge brain that jams in the tiny doorframe; sweat, !?', t0: st('truth'), t1: tCut, bg: 'tinyDoor',
    cam: [[1.1, 540, 1000, -0.02], [1.18, 540, 1000, -0.04]], sfx: [[0.2, 'inflate'], [0.7, 'thunk']],
    draw(x, S) { const k = ease.outBack(prog(S.t, 0.1, 0.7)); person(x, S, 'host', 'worried', 540, 1780, 0.66, { seed: 2, pose: 'shrug' }); bigHead(x, S, 540, 1780, 0.66, 1.2 * k); A.mark(x, '!?', 860, 600, pop(S.T, S.t0 + 0.6)); } });
  add({ name: 'Cut off (glowing vat lab): most of the brain floats off into a big glowing vat, leaving a normal-sized head; red CUT OFF banner', t0: tCut, t1: end('truth'), bg: 'vatLab',
    cam: [[1.05, 540, 1000, -0.02], [1.12, 540, 990, 0.03]], banners: [['CUT OFF', 'red', tCut + 0.2, end('truth')]], sfx: [[0.1, 'slash'], [0.5, 'splash']],
    draw(x, S) { const k = ease.smoother(prog(S.t, 0.1, 0.9)); A.rrect(x, 600, 500, 380, 700, 60); x.fillStyle = 'rgba(90,255,220,0.35)'; x.fill(); x.lineWidth = 10; x.strokeStyle = A.OL; x.stroke();
      brain(x, lerp(320, 790, k), lerp(640, 820, k), lerp(240, 150, k), S.T, 0.3); person(x, S, 'host', k > 0.8 ? 'calm' : 'worried', 320, 1780, 0.66, { seed: 2, pose: 'idle' }); } });

  // ---------------- USERS ----------------
  const tSat = W('users', /^and$/) - 0.1;
  add({ name: 'Dr. Vegapunk (futuristic lab of pods): the old scientist with his headset gives a thumbs-up; blue VEGAPUNK banner', t0: st('users'), t1: tSat, bg: 'podRoom',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['DR. VEGAPUNK', 'blue', st('users') + 0.2, tSat]], sfx: [[0, 'whoosh'], [0.4, 'ding']],
    draw(x, S) { person(x, S, 'vegapunk', 'grin', 540, 1820, 0.84, { pop: S.t0 + 0.05, seed: 8, pose: 'raise' }); } });
  add({ name: 'Six satellites (same pods, wide): six glowing figures in their pods, cables running from each to a floating brain above; gold SIX SATELLITES banner', t0: tSat, t1: end('users'), bg: 'podRoom',
    cam: [[1.0, 540, 1000, -0.02], [1.06, 540, 990, 0.03]], banners: [['SIX SATELLITES', 'gold', W('users', /^six/) - 0.1, end('users')]], sfx: [[0.1, 'shimmer'], [0.5, 'pop']],
    draw(x, S) { brain(x, 540, 180, 120, S.T, 0.4); for (let k = 0; k < 6; k++) { const px = 200 + (k % 3) * 340, py = 460 + Math.floor(k / 3) * 480; cable(x, 540, 260, px, py - 40, S.T + k * 0.2, ['#ff8cbc', '#ffd34d', '#5cc45a', '#6fa8ff', '#b07cff', '#ff8a2e'][k]); A.sparkle(x, px, py - 60, 24 * Math.abs(Math.sin(S.T * 4 + k))); } } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (exam hall): the host breezes through an exam and holds up a paper with a big red A+; the rival sweats; green A+ banner', t0: st('joke'), t1: end('joke'), bg: 'examHall',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['A+ EVERY TIME', 'green', W('joke', /^test/) - 0.1, end('joke')]], sfx: [[0.3, 'ding'], [W('joke', /^test/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 400, 1780, 0.74, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); paper(x, h.hand.R[0] + 30, h.hand.R[1] - 100, 0.8 * pop(S.T, S.t0 + 0.3), 'A+');
      const e = person(x, S, 'rival', 'worried', 880, 1780, 0.56, { seed: 3, pose: 'idle', flip: true }); A.sweat(x, e.head[0] - 130, e.head[1] - 40, 1); } });

  ending(T, { TL, fruit });
  return finish();
}
