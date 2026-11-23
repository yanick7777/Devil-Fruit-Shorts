// Shot plan for the Mochi Mochi no Mi short. Structure: three base powers (intangible mochi body, mochi fists + spear, sticky trap), then AWAKENING as the peak.
import * as A from '/engine/art.js';
import { drawMochi } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawMochi(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:mo_teashop', 'rays:peach', 's3:mo_cake', 's3:mo_kitchen', 's3:mo_mirror', 's3:mo_chessboard', 's3:mo_dining', 's3:mo_candyforest', 's3:mo_mochitown', 's3:mo_lagoon', 's3:mo_tearoom', 's3:mo_castle', 's3:mo_snackbar'];
scene('mo_teashop', { sky: ['#ffe8d8', '#f8d8c0'], ground: '#a07850', back: [['shelves', { rows: 3, y: 240, cols: ['#f4f2ec', '#ff8cc0', '#9ad86a'] }]] });
scene('mo_cake', { sky: ['#ffd0e8', '#fff0f6'], back: [['custom', { fn: (x, h) => { for (let r = 0; r < 4; r++) { const w = 760 - r * 150, y = 1250 - r * 220; h.rrect(x, 540 - w / 2, y - 200, w, 200, 30); h.fs(x, ['#f8e8d0', '#ff8cc0', '#fff0f8', '#8a5a3a'][r], 10); for (let k = 0; k < 7; k++) { x.beginPath(); x.arc(540 - w / 2 + 40 + k * (w - 80) / 6, y - 200, 26, 0, Math.PI); x.fillStyle = '#ffffff'; x.fill(); } } } }], ['confetti', { n: 30 }]] });
scene('mo_kitchen', { sky: ['#f4f0e8', '#e0d8c8'], ground: '#c8b8a0', back: [['tiles', { col: 'rgba(120,90,60,0.18)' }], ['custom', { fn: (x, h) => { h.rrect(x, 80, 900, 920, 120, 10); h.fs(x, '#8a6a4a', 9); for (let k = 0; k < 5; k++) { x.beginPath(); x.ellipse(200 + k * 170, 880, 60, 36, 0, 0, 7); h.fs(x, '#f4f2ec', 6); } } }]] });
scene('mo_mirror', { sky: ['#3a2a5a', '#5a3a7a'], ground: '#4a3a6a', back: [['frames', { list: [[100, 300, 340, 760], [640, 300, 340, 760]], col: '#c8b8f0' }], ['stars', { n: 20 }]] });
scene('mo_chessboard', { sky: ['#e8d8f0', '#c8b0e0'], ground: '#f4f0f8', back: [['custom', { fn: (x) => { for (let r = 0; r < 4; r++) for (let k = 0; k < 9; k++) if ((r + k) % 2) { x.fillStyle = '#5a3a7a'; x.fillRect(k * 130 - 40, 1250 + r * 70, 130, 70); } } }], ['columns', { n: 3, x0: 80, gap: 400, w: 60, col: '#ff8cc0' }]] });
scene('mo_dining', { sky: ['#ffe8f0', '#ffd0e0'], ground: '#a05a6a', back: [['custom', { fn: (x, h) => { h.rrect(x, -80, 950, 1240, 60, 10); h.fs(x, '#f4ecd8', 8); for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(140 + k * 200, 940); x.lineTo(180 + k * 200, 820); x.lineTo(220 + k * 200, 940); x.closePath(); h.fs(x, ['#ff8cc0', '#ffd84a', '#9ad86a'][k % 3], 6); } } }], ['lanterns', { y: 260 }]] });
scene('mo_candyforest', { sky: ['#c8f0ff', '#f0fbff'], ground: '#ffc0d8', back: [['custom', { fn: (x, h) => { for (let i = 0; i < 5; i++) { const tx = 80 + i * 230; h.rrect(x, tx - 12, 800, 24, 460, 8); h.fs(x, '#f4f4f8', 6); x.beginPath(); x.arc(tx, 760, 110, 0, 7); h.fs(x, ['#ff8cc0', '#ffd84a', '#9ad86a', '#7cc8ff', '#c88aff'][i], 9); x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 12; x.beginPath(); x.arc(tx, 760, 60, 0, 5); x.stroke(); } } }]] });
scene('mo_mochitown', { sky: ['#f0e8ff', '#ffffff'], ground: '#f4f2ec', back: [['custom', { fn: (x, h) => { for (let i = 0; i < 6; i++) { x.beginPath(); x.ellipse(-60 + i * 230, 1180, 160, 260 + (i % 2) * 80, 0, Math.PI, 0); h.fs(x, '#f8f6f0', 9); } } }]] });
scene('mo_lagoon', { sky: ['#ffb8a0', '#ffe0c8'], back: [['water', { y: 1150, hh: 800, col: '#ff8ca0' }], ['clouds', { n: 3, y: 260, seed: 2 }]] });
scene('mo_tearoom', { sky: ['#3a2a3a', '#5a3a4a'], ground: '#6a3a4a', back: [['custom', { fn: (x, h) => { h.rrect(x, 280, 300, 520, 640, 20); h.fs(x, '#2a1a2a', 10); h.rrect(x, 320, 340, 440, 560, 14); h.fs(x, '#4a2a3a', 6); h.rrect(x, 420, 960, 240, 40, 10); h.fs(x, '#c89a50', 6); } }]] });
scene('mo_castle', { sky: ['#ffd0e8', '#fff0f8'], ground: '#d8b8c8', back: [['custom', { fn: (x, h) => { for (const [cx, w, hh, col] of [[220, 240, 600, '#ff8cc0'], [540, 320, 820, '#ffffff'], [860, 240, 600, '#ffd84a']]) { h.rrect(x, cx - w / 2, 1250 - hh, w, hh, 40); h.fs(x, col, 10); x.beginPath(); x.arc(cx, 1250 - hh, w / 2, Math.PI, 0); h.fs(x, '#8a5a3a', 9); } } }]] });
scene('mo_snackbar', { sky: ['#fff0d8', '#ffe0b8'], ground: '#c89a6a', back: [['shelves', { rows: 3, y: 260, cols: ['#f4f2ec', '#ffd84a', '#ff8cc0', '#8a5a3a'] }], ['sign', { text: 'SNACKS', bg: '#ffffff', y: 120 }]] });

// ---------------- mochi effects ----------------
const MW = '#f8f6f0', MS = '#d8d2c4';
// a blob of mochi: wobbly white shape
export function blob(x, cx, cy, r, t, seed = 0) { x.beginPath(); for (let i = 0; i <= 24; i++) { const a = i / 24 * 6.283, rr = r * (1 + 0.08 * Math.sin(a * 5 + t * 3 + seed)); x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.closePath(); A.fs(x, MW, Math.max(4, r * 0.06)); x.beginPath(); x.ellipse(cx - r * 0.3, cy - r * 0.35, r * 0.2, r * 0.1, -0.5, 0, 7); x.fillStyle = 'rgba(255,255,255,0.9)'; x.fill(); }
function mochiFist(x, cx, cy, s, t) { blob(x, cx, cy, 90 * s, t); x.strokeStyle = MS; x.lineWidth = 8 * s; for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(cx + 20 * s, cy - 50 * s + k * 40 * s); x.lineTo(cx + 70 * s, cy - 40 * s + k * 40 * s); x.stroke(); } }
function spear(x, cx, cy, rot, s) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.rrect(x, -14, -500, 28, 700, 10); A.fs(x, '#6a3a2a', 6); for (const dx of [-60, 0, 60]) { x.beginPath(); x.moveTo(dx - 20, -470); x.lineTo(dx, -640); x.lineTo(dx + 20, -470); x.closePath(); A.fs(x, '#c8ccd8', 6); } A.rrect(x, -70, -480, 140, 30, 8); A.fs(x, '#d9b44a', 5); x.restore(); }
function goo(x, x0, y0, x1, y1, w, t) { x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo((x0 + x1) / 2 + Math.sin(t * 3) * 30, (y0 + y1) / 2 + 40, x1, y1); x.lineCap = 'round'; x.lineWidth = w + 10; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = w; x.strokeStyle = MW; x.stroke(); }
export function mochiIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { blob(x, 0, 0, 120, t); A.mark(x, '!', 0, -10, 0.6); }
  else if (k === 2) { mochiFist(x, -40, 30, 1, t); spear(x, 80, 150, 0.3, 0.3); }
  else if (k === 3) { goo(x, -140, -60, 140, 60, 30, t); goo(x, -140, 60, 140, -60, 30, t + 1); }
  else { A.glow(x, 0, 0, 200, '255,250,230', 0.7); for (let i = 0; i < 5; i++) blob(x, Math.cos(i * 1.26) * 90, Math.sin(i * 1.26) * 90, 50, t, i); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a white bumpy fruit', biteDesc: 'the bite stretches like chewy mochi', biteSfx: 'stretch', bannerCol: 'pink', biteCol: '#f4f2ec',
    biteFx(x, S, k) { if (k > 0 && k < 1) goo(x, 520, 760, 520 + 200 * k, 760 + 60 * k, 26, S.T); },
    calmBg: 's3:mo_teashop', calmDesc: 'mochi tea shop', seaHue: 'peach', seed: 85, nameRe: /^Mochi-Mochi/,
    revealBg: 's3:mo_cake', revealDesc: 'giant layered cake', revealBanner: 'MOCHI-MOCHI FRUIT', haloRgb: '255,240,230' });
  const tTurns = W('type', /^turns/) - 0.1, tAwk = W('type', /^awaken/) - 0.1;
  add({ name: 'Sticky body (kitchen): the host\'s arm squishes and stretches like white mochi', t0: tTurns, t1: tAwk, bg: 's3:mo_kitchen',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'stretch'], [0.5, 'boing']],
    draw(x, S) { const h = person(x, S, 'host', 'shock', 400, 1780, 0.66, { seed: 2, pose: 'punch' }); const k = prog(S.t, 0.1, 0.7); goo(x, h.hand.R[0], h.hand.R[1], h.hand.R[0] + 380 * k, h.hand.R[1] + 40, 60, S.T); blob(x, h.hand.R[0] + 380 * k, h.hand.R[1] + 40, 60, S.T); } });
  stage(T, { desc: 'mirror hall', bg: 's3:mo_mirror', t0: tAwk, t1: end('type'), times: [W('type', /^awaken/), W('type', /^awaken/) + 0.2, W('type', /^awaken/) + 0.4, W('type', /^awaken/) + 0.6],
    labels: ['POWER 1', 'POWER 2', 'POWER 3', 'AWAKENED'], bar: 'MOCHI POWERS', haloRgb: '255,240,230', icon: mochiIcon });

  const tSoft = W('power1', /^soft/) - 0.1;
  addSplit({ name: 'Power 1 (chessboard hall): a brute punches Katakuri; his torso opens into a mochi ring and the fist goes straight through; pink DODGE banner', t0: st('power1'), t1: end('power1'), bg: 's3:mo_chessboard',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['ATTACKS GO THROUGH', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^attacks/) - st('power1'), 'whoosh'], [W('power1', /^through/) - st('power1'), 'boing']],
    draw(x, S) { const kt = person(x, S, 'katakuri', 'calm', 700, 1780, 0.64, { seed: 2, pose: 'idle', flip: true }); const k = ease.outCubic(prog(S.T, W('power1', /^attacks/), W('power1', /^through/) + 0.2));
      if (k > 0.3) { x.beginPath(); x.arc(700, 1260, 110 * k, 0, 7); A.fs(x, MW, 10); x.beginPath(); x.arc(700, 1260, 70 * k, 0, 7); x.fillStyle = '#c8b0e0'; x.fill(); }
      person(x, S, 'brute', 'smug', lerp(280, 420, k), 1780, 0.62, { seed: 3, pose: 'punch' }); } },
    tSoft, [[1.05, 600, 1000, 0.02], [1.1, 600, 990, 0.035]], 'Power 1 soft (same hall): the brute is stuck with his arm through the hole, shocked; ?');
  const p1 = T.shots[T.shots.length - 1]; p1.draw = function (x, S) { person(x, S, 'katakuri', 'smug', 700, 1780, 0.64, { seed: 2, pose: 'idle', flip: true }); x.beginPath(); x.arc(700, 1260, 110, 0, 7); A.fs(x, MW, 10); x.beginPath(); x.arc(700, 1260, 70, 0, 7); x.fillStyle = '#c8b0e0'; x.fill(); const b = person(x, S, 'brute', 'shock', 420, 1780, 0.62, { seed: 3, pose: 'punch' }); A.mark(x, '?', b.head[0] - 60, b.head[1] - 180, pop(S.T, S.t0 + 0.2)); };

  const tSpear = W('power2', /^spear/) - 0.1;
  addSplit({ name: 'Power 2 evolve (pink dining hall): dodge icon becomes the fist icon; giant white mochi fists burst out of Katakuri\'s arm; red MOCHI FISTS banner', t0: st('power2'), t1: end('power2'), bg: 's3:mo_dining',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['MOCHI FISTS', 'red', st('power2') + 0.3, tSpear]], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^fists/) - st('power2'), 'impact']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, mochiIcon)) return; const kt = person(x, S, 'katakuri', 'calm', 300, 1780, 0.62, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 }); const tf = W('power2', /^fists/); for (let i = 0; i < 3; i++) { const k = ease.outBack(prog(S.T, tf + i * 0.12, tf + i * 0.12 + 0.3)); if (k > 0) { goo(x, kt.hand.R[0], kt.hand.R[1], kt.hand.R[0] + 380 * k, kt.hand.R[1] - 200 + i * 200, 50, S.T); mochiFist(x, kt.hand.R[0] + 380 * k, kt.hand.R[1] - 200 + i * 200, 0.9, S.T); } } } },
    tSpear, [[1.0, 540, 1000, -0.02], [1.06, 540, 980, -0.035]], 'Power 2 spear (same hall): mochi coils around his trident Mogura, which stretches into a giant spear; gold MOCHI SPEAR banner');
  const p2 = T.shots[T.shots.length - 1]; p2.banners = [['GIANT SPEAR', 'gold', tSpear, end('power2')]]; p2.sfx = [[0.1, 'stretch'], [0.4, 'slash']];
  p2.draw = function (x, S) { const kt = person(x, S, 'katakuri', 'smug', 300, 1780, 0.64, { seed: 2, pose: 'raise' }); const k = ease.outCubic(prog(S.T, S.t0, S.t0 + 0.6)); spear(x, kt.hand.L[0], kt.hand.L[1] + 200, 0.9, 0.8 + 0.6 * k); goo(x, kt.hand.L[0], kt.hand.L[1], kt.hand.L[0] + 200 * k, kt.hand.L[1] + 120 * k, 40, S.T); };

  const tCant = W('power3', /^can't/) - 0.1;
  add({ name: 'Power 3 evolve (candy forest): fist icon becomes the goo icon; ropes of sticky mochi wrap a grunt from head to toe so he can\'t move; purple STUCK banner', t0: st('power3'), t1: end('power3'), bg: 's3:mo_candyforest',
    cam: [[1.0, 540, 980, 0], [1.06, 560, 960, 0.02]], banners: [['STICKY TRAP', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^trap/) - st('power3'), 'stretch'], [tCant - st('power3'), 'boing']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, mochiIcon)) return; const g = person(x, S, 'grunt', S.T > tCant ? 'worried' : 'calm', 720, 1780, 0.6, { seed: 3, pose: 'shrug', flip: true, pop: S.t0 + 0.45 }); const k = prog(S.T, W('power3', /^trap/), tCant);
      for (let i = 0; i < 4; i++) if (k > i / 4) goo(x, 520, 1150 + i * 140, 920, 1100 + i * 150, 40, S.T + i); person(x, S, 'katakuri', 'calm', 240, 1780, 0.58, { seed: 2, pose: 'punch' }); if (S.T > tCant) A.mark(x, '!', g.head[0] - 100, g.head[1] - 180, pop(S.T, tCant)); } });

  const tArea = W('awaken', /^area/) - 0.1;
  addSplit({ name: 'AWAKENED (white mochi town): goo icon gives way to the blob icon, gold halo; gold AWAKENED banner; Katakuri slams his hand down and the ground turns to bubbling white mochi', t0: st('awaken'), t1: end('awaken'), bg: 's3:mo_mochitown',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['AWAKENED', 'gold', W('awaken', /^awaken/) - 0.1, end('awaken'), 'slide']], sfx: [[0, 'evolve'], [W('awaken', /^awaken/) - st('awaken'), 'levelup']],
    draw(x, S) { halo(x, 540, 900, 620, '255,250,230', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, mochiIcon); return; }
      person(x, S, 'katakuri', 'smug', 540, 1780, 0.68, { seed: 7, pose: 'raise' }); } },
    tArea, [[0.95, 540, 980, -0.02], [1.0, 540, 960, -0.035]], 'AWAKENED area (same town): the floor, walls and houses all melt into rolling white mochi waves around Katakuri; shake');
  const pk = T.shots[T.shots.length - 1]; pk.sfx = [[0, 'rumble'], [0.3, 'stretch']]; pk.draw = function (x, S) { const k = prog(S.T, S.t0, S.t0 + 1.0); for (let i = 0; i < 10; i++) blob(x, 60 + i * 110, 1500 - Math.sin(S.T * 3 + i) * 60 * k, 120 * k + 20, S.T, i); for (let i = 0; i < 6; i++) blob(x, 100 + i * 190, 1000 - k * 200 + Math.sin(S.T * 2 + i) * 40, 70 * k, S.T, i + 3); person(x, S, 'katakuri', 'smug', 540, 1780, 0.66, { seed: 7, pose: 'raise' }); if (S.T < S.t0 + 0.4) S.shake = 0.4; };

  add({ name: 'Twist (pink lagoon at sunset): push-in with roll, low sting; red STICKY SECRET banner', t0: st('twist'), t1: end('twist'), bg: 's3:mo_lagoon', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['STICKY SECRET', 'red', W('twist', /^secret/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Hidden mouth (dark private tea room): Katakuri sits alone with a giant donut, his big fur scarf pulled up over his mouth; red HIDDEN MOUTH banner', t0: st('truth'), t1: end('truth'), bg: 's3:mo_tearoom',
    cam: [[1.1, 540, 1050, -0.02], [1.2, 540, 1030, -0.04]], banners: [['HID HIS MOUTH', 'red', W('truth', /^mouth/) - 0.1, end('truth')]], sfx: [[0.3, 'sting'], [W('truth', /^laughed/) - st('truth'), 'yuck']],
    draw(x, S) { person(x, S, 'katakuri', 'sad', 540, 1820, 0.7, { seed: 8, pose: 'holdUp' }); x.beginPath(); x.arc(760, 1180, 70, 0, 7); A.fs(x, '#c8884a', 8); x.beginPath(); x.arc(760, 1180, 26, 0, 7); x.fillStyle = '#4a2a3a'; x.fill(); x.beginPath(); x.arc(760, 1180, 56, Math.PI * 1.1, Math.PI * 1.9); x.lineWidth = 22; x.strokeStyle = '#ff8cc0'; x.stroke(); } });

  const tLuffy = W('users', /^fought/) - 0.1;
  add({ name: 'Katakuri (cake castle): Charlotte Katakuri, maroon hair, fur scarf, pink-striped chest, trident; purple CHARLOTTE KATAKURI banner', t0: st('users'), t1: tLuffy, bg: 's3:mo_castle',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['CHARLOTTE KATAKURI', 'pink', st('users') + 0.2, W('users', /^strongest/)], ['BIG MOM\'S STRONGEST SON', 'red', W('users', /^strongest/), tLuffy + 0.1]], sfx: [[0, 'whoosh'], [W('users', /^strongest/) - st('users'), 'drums']],
    draw(x, S) { const kt = person(x, S, 'katakuri', 'calm', 520, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'raise' }); spear(x, kt.hand.L[0], kt.hand.L[1] + 280, 0.1, 0.75); } });
  add({ name: 'Vs Luffy (cake castle, mirror world tint): Luffy and Katakuri clash fist to mochi fist, impact star; red VS LUFFY banner', t0: tLuffy, t1: end('users'), bg: 's3:mo_mirror',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['VS LUFFY', 'red', tLuffy + 0.1, end('users')]], sfx: [[0.2, 'impact'], [0.6, 'impact']],
    draw(x, S) { person(x, S, 'luffy', 'grin', 260, 1800, 0.62, { seed: 4, pose: 'punch' }); const kt = person(x, S, 'katakuri', 'smug', 820, 1800, 0.64, { seed: 8, pose: 'punch', flip: true }); mochiFist(x, kt.hand.R[0] - 60, kt.hand.R[1], 0.8, S.T); A.impactStar(x, 540, kt.hand.R[1], 140 * (0.8 + 0.2 * Math.sin(S.T * 12)), S.T); } });

  add({ name: 'Joke (snack bar): the host pinches a chunk of mochi off his own arm and eats it happily; gold ENDLESS SNACKS banner', t0: st('joke'), t1: end('joke'), bg: 's3:mo_snackbar',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['ENDLESS SNACKS', 'gold', W('joke', /^snacks/) - 0.1, end('joke')]], sfx: [[0.3, 'stretch'], [W('joke', /^snacks/) - st('joke'), 'crunch'], [W('joke', /^snacks/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'grin', 460, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); blob(x, h.hand.R[0] + 20, h.hand.R[1] - 40, 46, S.T); A.sparkle(x, 820, 900, 40 * Math.abs(Math.sin(S.T * 4)), '#ffe14d'); } });

  ending(T, { TL, fruit });
  return finish();
}
