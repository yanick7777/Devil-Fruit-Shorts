// Shot plan for the Mane Mane no Mi (Clone-Clone Fruit) short. Structure: face copy, full-body copy, face memory, tricking enemies into fighting each other as the peak.
import * as A from '/engine/art.js';
import { drawMane } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawMane(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:cl_dressing', 'rays:amber', 's3:cl_curtain', 's3:cl_mirrors', 's3:cl_ballet', 's3:cl_market', 's3:cl_tailor', 's3:cl_gallery', 's3:cl_camp', 's3:cl_spotlight', 's3:cl_harbor', 's3:cl_prison', 's3:cl_bathroom'];
scene('cl_dressing', { sky: ['#ffe8f0', '#f8d0e0'], ground: '#a07850', back: [['custom', { fn: (x, h) => { h.rrect(x, 300, 260, 480, 560, 20); h.fs(x, '#c8e8ff', 10); for (let k = 0; k < 8; k++) { x.beginPath(); x.arc(320 + k * 63, 260, 16, 0, 7); h.fs(x, '#fff6c0', 4); } } }]] });
scene('cl_curtain', { sky: ['#8a1a3a', '#5a0a2a'], ground: '#3a1a2a', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 10; k++) { x.beginPath(); x.moveTo(k * 120 - 60, -100); x.quadraticCurveTo(k * 120, 600, k * 120 - 40, 1300); x.lineWidth = 50; x.strokeStyle = k % 2 ? '#a0283a' : '#7a1a2a'; x.stroke(); } h.rrect(x, -80, 1180, 1240, 80, 6); h.fs(x, '#d9b44a', 6); } }]] });
scene('cl_mirrors', { sky: ['#e0e8f8', '#c8d4ec'], ground: '#9aa8c8', back: [['frames', { list: [[60, 300, 280, 700], [400, 260, 280, 760], [740, 300, 280, 700]], col: '#d8ecff' }]] });
scene('cl_ballet', { sky: ['#ffd8e8', '#ffeef6'], ground: '#c88aa8', back: [['custom', { fn: (x, h) => { h.rrect(x, -80, 900, 1240, 20, 6); h.fs(x, '#d9b44a', 4); for (let k = 0; k < 6; k++) { h.rrect(x, -20 + k * 200, 920, 12, 300, 4); h.fs(x, '#d9b44a', 3); } } }], ['windows', { n: 2, x0: 160, gap: 520 }]] });
scene('cl_market', { sky: ['#ffe0b0', '#fff4dc'], ground: '#c9a880', back: [['banners', { n: 4, y: 180, cols: ['#f08a2a', '#3f9bff', '#ff8cc0'] }], ['crates', {}]] });
scene('cl_tailor', { sky: ['#f4ecdc', '#e4d8c0'], ground: '#8a6a4a', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 3; k++) { const cx = 200 + k * 340; h.rrect(x, cx - 70, 500, 140, 320, 60); h.fs(x, ['#ff8cc0', '#3f6fd8', '#f4d030'][k], 8); h.rrect(x, cx - 8, 820, 16, 300, 4); h.fs(x, '#6b4630', 4); } } }]] });
scene('cl_gallery', { sky: ['#2a2a3a', '#4a4a5a'], ground: '#3a3a4a', back: [['custom', { fn: (x, h) => { for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) { h.rrect(x, 70 + k * 250, 200 + r * 280, 190, 220, 14); h.fs(x, ['#ffd8b0', '#f0c8a0', '#e8b88a', '#f6dcc4'][(k + r) % 4], 7); x.fillStyle = '#1b1530'; for (const sd of [-1, 1]) { x.beginPath(); x.arc(165 + k * 250 + sd * 30, 290 + r * 280, 10, 0, 7); x.fill(); } } } }]] });
scene('cl_camp', { sky: ['#2a3a2a', '#4a5a3a'], ground: '#5a4a3a', back: [['custom', { fn: (x, h) => { for (const [cx, col] of [[180, '#8a7a5a'], [900, '#7a6a4a']]) { x.beginPath(); x.moveTo(cx - 200, 1250); x.lineTo(cx, 850); x.lineTo(cx + 200, 1250); x.closePath(); h.fs(x, col, 9); } const g = x.createRadialGradient(540, 1250, 20, 540, 1250, 400); g.addColorStop(0, 'rgba(255,170,60,0.6)'); g.addColorStop(1, 'rgba(255,170,60,0)'); x.fillStyle = g; x.fillRect(100, 900, 900, 500); } }], ['stars', { n: 30 }]] });
scene('cl_spotlight', { sky: ['#1a1a2a', '#0a0a14'], ground: '#2a2a3a', back: [['custom', { fn: (x) => { x.fillStyle = 'rgba(255,240,200,0.25)'; x.beginPath(); x.moveTo(480, -100); x.lineTo(600, -100); x.lineTo(900, 1300); x.lineTo(180, 1300); x.fill(); } }]] });
scene('cl_harbor', { sky: ['#ff9a6a', '#ffd8b0'], ground: '#8a6a4a', gy: 1260, back: [['water', { y: 1000, hh: 260, col: '#4a7ac8' }], ['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(600, 980); x.lineTo(1000, 980); x.lineTo(940, 1060); x.lineTo(660, 1060); x.closePath(); h.fs(x, '#8a5a3a', 8); h.rrect(x, 790, 640, 20, 340, 4); h.fs(x, '#6b4630', 4); x.beginPath(); x.moveTo(810, 660); x.lineTo(950, 900); x.lineTo(810, 900); x.closePath(); h.fs(x, '#ffffff', 6); } }]] });
scene('cl_prison', { sky: ['#3a3a4a', '#1a1a2a'], ground: '#4a4a52', back: [['bricks', { col: 'rgba(0,0,0,0.3)' }], ['custom', { fn: (x, h) => { h.rrect(x, 100, 400, 880, 40, 6); h.fs(x, '#5a5a6a', 7); for (let k = 0; k < 9; k++) { h.rrect(x, 120 + k * 100, 400, 26, 860, 6); h.fs(x, '#6a6a7a', 6); } x.font = '80px "Lilita One"'; x.fillStyle = '#e8402e'; x.textAlign = 'center'; x.fillText('IMPEL DOWN', 540, 340); } }]] });
scene('cl_bathroom', { sky: ['#f0f8fc', '#d8ecf4'], ground: '#c8d8e0', back: [['tiles', { col: 'rgba(80,120,160,0.18)' }]] });

// ---------------- clone bits ----------------
function puff(x, cx, cy, r, k) { if (k <= 0 || k >= 1) return; x.save(); x.globalAlpha = 1 - k; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283; x.beginPath(); x.arc(cx + Math.cos(a) * r * (0.4 + k), cy + Math.sin(a) * r * (0.4 + k), r * 0.4, 0, 7); x.fillStyle = '#ffffff'; x.fill(); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke(); } x.restore(); }
// small swan badge that marks Bon Clay in disguise
function swanTag(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.ellipse(0, 20, 50, 30, 0, 0, 7); A.fs(x, '#ffffff', 6); x.beginPath(); x.moveTo(30, 10); x.quadraticCurveTo(60, -40, 30, -70); x.lineWidth = 16; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 9; x.strokeStyle = '#ffffff'; x.stroke(); x.beginPath(); x.moveTo(30, -74); x.lineTo(60, -66); x.lineTo(30, -60); x.closePath(); A.fs(x, '#f4d030', 4); x.restore(); }
function thought(x, cx, cy, w, h) { A.rrect(x, cx - w / 2, cy - h / 2, w, h, 60); A.fs(x, '#ffffff', 8); for (const [dx, dy, r] of [[-w / 2 + 40, h / 2 + 30, 26], [-w / 2 + 10, h / 2 + 80, 16]]) { x.beginPath(); x.arc(cx + dx, cy + dy, r, 0, 7); A.fs(x, '#ffffff', 6); } }
export function maneIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { A.openHand(x, -40, 0, 1.2, '#f4a8c8'); A.mark(x, '!', 70, -40, 0.6); }
  else if (k === 2) { swanTag(x, 0, 20, 1.6); }
  else if (k === 3) { thought(x, 0, 0, 240, 160); for (const [dx, col] of [[-60, '#f0c8a0'], [0, '#e8b88a'], [60, '#f6dcc4']]) { x.beginPath(); x.arc(dx, 0, 26, 0, 7); A.fs(x, col, 5); } }
  else { A.glow(x, 0, 0, 200, '255,200,120', 0.6); A.impactStar(x, -50, 0, 70, t); A.impactStar(x, 50, 0, 70, t + 1); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'two orange striped gourd fruits', biteDesc: 'a puff of smoke and the host\'s face flickers', biteSfx: 'pop', bannerCol: 'gold', biteCol: '#f08a2a',
    biteFx(x, S, k) { puff(x, 560, 760, 160, k); },
    calmBg: 's3:cl_dressing', calmDesc: 'dressing room with a lit mirror', seaHue: 'amber', seed: 81, nameRe: /^Clone-Clone/,
    revealBg: 's3:cl_curtain', revealDesc: 'red theatre curtains', revealBanner: 'CLONE-CLONE FRUIT', haloRgb: '255,200,140' });
  const tCopy = W('type', /^copy/) - 0.1, tFace = W('type', /^face/) - 0.1;
  add({ name: 'Copy a face (hall of mirrors): puff, the host has a copy of the critic\'s face, then the critic gasps', t0: tCopy, t1: tFace, bg: 's3:cl_mirrors',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.3, 'pop']],
    draw(x, S) { const k = prog(S.t, 0.25, 0.6); person(x, S, 'critic', 'shock', 800, 1780, 0.62, { seed: 3, pose: 'shrug', flip: true }); person(x, S, S.t > 0.4 ? 'critic' : 'host', 'grin', 300, 1780, 0.62, { seed: 2, pose: 'idle' }); puff(x, 300, 1100, 180, k); } });
  stage(T, { desc: 'ballet studio barre', bg: 's3:cl_ballet', t0: tFace, t1: end('type'), times: [W('type', /^face/), W('type', /^face/) + 0.2, W('type', /^face/) + 0.4, W('type', /^face/) + 0.6],
    labels: ['TOUCH', 'BODY', 'MEMORY', 'TRICK'], bar: 'CLONE POWERS', haloRgb: '255,200,140', icon: maneIcon });

  const tBecome = W('power1', /^become/) - 0.1;
  addSplit({ name: 'Power 1 (busy market): Bon Clay reaches out and taps a mechanic on the cheek with his left hand; pink TOUCH banner', t0: st('power1'), t1: end('power1'), bg: 's3:cl_market',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['ONE TOUCH', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^touch/) - st('power1'), 'snap']],
    draw(x, S) { person(x, S, 'bonclay', 'grin', 330, 1780, 0.62, { seed: 2, pose: 'punch' }); person(x, S, 'mechanic', 'worried', 760, 1780, 0.62, { seed: 3, pose: 'shrug', flip: true }); if (S.T > W('power1', /^touch/)) A.sparkle(x, 600, 1050, 40 * pop(S.T, W('power1', /^touch/)), '#ffe14d'); } },
    tBecome, [[1.0, 540, 1000, 0.02], [1.06, 540, 990, 0.035]], 'Power 1 twin (same market): puff, two identical mechanics stare at each other, the copy has a little swan badge; ?!');
  const p1 = T.shots[T.shots.length - 1]; p1.sfx = [[0, 'pop']]; p1.draw = function (x, S) { const k = prog(S.T, S.t0, S.t0 + 0.4); const c = person(x, S, k > 0.4 ? 'mechanic' : 'bonclay', 'grin', 330, 1780, 0.62, { seed: 2, pose: 'idle' }); puff(x, 330, 1200, 200, k); const m = person(x, S, 'mechanic', 'shock', 760, 1780, 0.62, { seed: 3, pose: 'shrug', flip: true }); if (k >= 1) { swanTag(x, c.head[0] - 130, c.head[1] - 170, 0.6); A.mark(x, '!?', m.head[0] + 60, m.head[1] - 180, pop(S.T, S.t0 + 0.4)); } };

  add({ name: 'Power 2 evolve (tailor shop): touch icon becomes the swan icon; Bon Clay spins and becomes a full-body copy of the tall farmer, clothes and all; gold WHOLE BODY banner', t0: st('power2'), t1: end('power2'), bg: 's3:cl_tailor',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['WHOLE BODY COPY', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^whole/) - st('power2'), 'pop']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, maneIcon)) return; const tw = W('power2', /^whole/), k = prog(S.T, tw - 0.1, tw + 0.3); person(x, S, 'farmer', 'calm', 780, 1780, 0.66, { seed: 4, pose: 'idle', flip: true, pop: S.t0 + 0.45 }); const c = person(x, S, k > 0.4 ? 'farmer' : 'bonclay', 'grin', 300, 1780, 0.66, { seed: 2, pose: k > 0.4 ? 'idle' : 'cheer' }); puff(x, 300, 1250, 260, k); if (k >= 1) swanTag(x, c.head[0] - 140, c.head[1] - 180, 0.6); } });

  const tSwitch = W('power3', /^switch/) - 0.1;
  addSplit({ name: 'Power 3 evolve (gallery of faces): swan icon becomes the memory icon; a thought bubble fills with saved faces above Bon Clay; purple FACE MEMORY banner', t0: st('power3'), t1: end('power3'), bg: 's3:cl_gallery',
    cam: [[1.0, 540, 980, 0], [1.06, 560, 960, 0.02]], banners: [['SAVED FACES', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^memory/) - st('power3'), 'ding']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, maneIcon)) return; const b = person(x, S, 'bonclay', 'smug', 360, 1820, 0.62, { seed: 2, pose: 'idle', pop: S.t0 + 0.45 }); const k = prog(S.T, W('power3', /^faces/), W('power3', /^memory/) + 0.3); if (k > 0) { thought(x, 700, 1100, 520 * Math.min(1, k * 2), 300 * Math.min(1, k * 2)); ['host', 'farmer', 'luffy', 'critic'].forEach((w, i) => { if (k > 0.3 + i * 0.15) person(x, S, w, 'grin', 560 + i * 95, 1220, 0.13, { seed: i }); }); } } },
    tSwitch, [[1.05, 540, 1000, -0.02], [1.1, 540, 980, -0.035]], 'Power 3 switch (same gallery): POP-POP-POP, Bon Clay flicks through faces: Luffy, the farmer, the critic, back to himself');
  const p3 = T.shots[T.shots.length - 1]; p3.sfx = [[0, 'pop'], [0.35, 'pop'], [0.7, 'pop']]; p3.draw = function (x, S) { const seq = ['luffy', 'farmer', 'critic', 'bonclay'], i = Math.min(3, Math.floor((S.T - S.t0) / 0.35)); const c = person(x, S, seq[i], 'grin', 540, 1780, 0.7, { seed: 2, pose: 'cheer' }); puff(x, 540, 1200, 220, ((S.T - S.t0) % 0.35) / 0.35); if (i < 3) swanTag(x, c.head[0] - 150, c.head[1] - 180, 0.6); };

  const tFight = W('peak', /^fighting/) - 0.1;
  addSplit({ name: 'Peak (night army camp): memory icon gives way to the double-impact icon, gold halo; gold MASTER OF DISGUISE banner; Bon Clay disguised as a grunt sneaks up behind a brute and taps him', t0: st('peak'), t1: end('peak'), bg: 's3:cl_camp',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['FOOL YOUR ENEMIES', 'gold', W('peak', /^fooling/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^fooling/) - st('peak'), 'swish']],
    draw(x, S) { halo(x, 540, 900, 620, '255,200,120', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, maneIcon); return; }
      person(x, S, 'brute', 'calm', 760, 1780, 0.62, { seed: 3, pose: 'idle', flip: true }); const c = person(x, S, 'grunt', 'smug', 330, 1780, 0.62, { seed: 2, pose: 'punch' }); swanTag(x, c.head[0] - 130, c.head[1] - 170, 0.55); } },
    tFight, [[1.0, 540, 1000, -0.02], [1.08, 540, 990, -0.035]], 'Peak brawl (same camp): the brute punches a real grunt, the two start brawling in a dust cloud while Bon Clay tiptoes away laughing; shake');
  const pk = T.shots[T.shots.length - 1]; pk.sfx = [[0, 'impact'], [0.3, 'impact'], [0.6, 'impact']]; pk.draw = function (x, S) { const sh = Math.sin(S.T * 14) * 20; person(x, S, 'brute', 'hit', 560 + sh, 1780, 0.6, { seed: 3, pose: 'punch', flip: true }); person(x, S, 'grunt', 'hit', 360 - sh, 1780, 0.6, { seed: 4, pose: 'punch' }); for (let i = 0; i < 3; i++) A.impactStar(x, 460 + Math.cos(S.T * 5 + i * 2) * 120, 1250 + Math.sin(S.T * 4 + i) * 120, 70, S.T + i); person(x, S, 'bonclay', 'grin', lerp(840, 1000, prog(S.T, S.t0, S.t0 + 1.5)), 1780, 0.5, { seed: 2, pose: 'cheer', flip: true }); if ((S.T * 3) % 1 < 0.1) S.shake = 0.3; };

  add({ name: 'Twist (single spotlight): push-in with roll, low sting; red ONE CATCH banner', t0: st('twist'), t1: end('twist'), bg: 's3:cl_spotlight', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['ONE CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'No powers (sunset harbour): Bon Clay copies Luffy and tries a stretchy punch; his arm doesn\'t stretch at all, the real Luffy laughs; red LOOKS ONLY banner', t0: st('truth'), t1: end('truth'), bg: 's3:cl_harbor',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['LOOKS ONLY', 'red', W('truth', /^look/) - 0.1, W('truth', /^powers/)], ['NO POWERS', 'red', W('truth', /^powers/), end('truth')]], sfx: [[W('truth', /^powers/) - st('truth'), 'boing']],
    draw(x, S) { const c = person(x, S, 'luffy', S.T > W('truth', /^powers/) ? 'sad' : 'grin', 330, 1780, 0.64, { seed: 2, pose: 'punch' }); swanTag(x, c.head[0] - 130, c.head[1] - 170, 0.55); person(x, S, 'luffy', 'grin', 800, 1780, 0.64, { seed: 4, pose: 'cheer', flip: true }); if (S.T > W('truth', /^powers/)) A.mark(x, '?', c.head[0] + 120, c.head[1] - 170, pop(S.T, W('truth', /^powers/))); } });

  const tHelp = W('users', /^help/) - 0.1;
  add({ name: 'Bon Clay (theatre stage): Mr. 2 Bon Clay in his pink swan coat, ballet pose on one leg; purple MR. 2 BON CLAY banner', t0: st('users'), t1: tHelp, bg: 's3:cl_curtain',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['MR. 2 BON CLAY', 'pink', st('users') + 0.2, tHelp + 0.1]], sfx: [[0, 'whoosh'], [0.3, 'twinkle']],
    draw(x, S) { person(x, S, 'bonclay', 'grin', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'cheer' }); } });
  add({ name: 'Impel Down (prison bars): Bon Clay and Luffy dash side by side past the bars, Bon Clay disguised as a guard; red BREAK INTO IMPEL DOWN banner', t0: tHelp, t1: end('users'), bg: 's3:cl_prison',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['INTO IMPEL DOWN', 'red', W('users', /^break/) - 0.1, end('users')]], sfx: [[0.1, 'whoosh'], [W('users', /^Impel/) - tHelp, 'drums']],
    draw(x, S) { const u = prog(S.T, tHelp, end('users') + 0.4); A.speedLines(x, 540, 1300, S.T, 10, 260, Math.PI); person(x, S, 'luffy', 'grin', lerp(200, 520, u), 1800, 0.62, { seed: 4, pose: 'punch' }); const c = person(x, S, 'bonclay', 'grin', lerp(520, 840, u), 1800, 0.62, { seed: 8, pose: 'cheer' }); } });

  add({ name: 'Joke (bathroom, no mirror on the wall): Bon Clay copies the host and stands facing him like a mirror while the host fixes his hair; gold NO MIRROR NEEDED banner', t0: st('joke'), t1: end('joke'), bg: 's3:cl_bathroom',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO MIRROR NEEDED', 'gold', W('joke', /^mirror/) - 0.1, end('joke')]], sfx: [[0.3, 'pop'], [W('joke', /^mirror/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { person(x, S, 'host', 'smug', 300, 1780, 0.7, { pop: S.t0 + 0.05, seed: 11, pose: 'raise', talk: true }); const c = person(x, S, 'host', 'smug', 780, 1780, 0.7, { seed: 11, pose: 'raise', flip: true }); swanTag(x, c.head[0] + 140, c.head[1] - 170, 0.55); } });

  ending(T, { TL, fruit });
  return finish();
}
