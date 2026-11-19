// Shot plan for the Hana Hana no Mi (Flower-Flower Fruit) short. Structure: sprouted arms, sprouted eyes/ears, giant arms, Demonio Fleur as the peak.
import * as A from '/engine/art.js';
import { drawHana } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawHana(x, cx, cy, R * 0.9, rot, o);

export const SETS = ['s3:fl_garden', 'rays:pink', 's3:fl_petals', 's3:fl_greenhouse', 's3:fl_plaza', 's3:fl_alley', 's3:fl_roofs', 's3:fl_canyon', 's3:fl_castle', 's3:fl_desert', 's3:fl_arena', 's3:fl_ohara', 's3:fl_deck'];
scene('fl_garden', { sky: ['#c8f0d8', '#f0fff4'], ground: '#7ac05a', back: [['custom', { fn: (x, h) => { for (let i = 0; i < 9; i++) { const fx = 60 + i * 120, fy = 1150 + (i % 2) * 40; h.rrect(x, fx - 5, fy, 10, 100, 4); h.fs(x, '#3a8a3a', 4); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283; x.beginPath(); x.arc(fx + Math.cos(a) * 22, fy + Math.sin(a) * 22, 16, 0, 7); h.fs(x, ['#ff8cc0', '#ffd84a', '#ff7a5c'][i % 3], 4); } } } }], ['clouds', { n: 3, y: 180 }]] });
scene('fl_petals', { sky: ['#ffd0e4', '#fff0f6'], back: [['confetti', { n: 70 }], ['custom', { fn: (x, h) => { for (let i = 0; i < 40; i++) { x.save(); x.translate(h.hash(i + 3) * 1080, h.hash(i + 9) * 1900); x.rotate(i); x.beginPath(); x.ellipse(0, 0, 26, 12, 0, 0, 7); x.fillStyle = 'rgba(255,140,190,0.7)'; x.fill(); x.restore(); } } }]] });
scene('fl_greenhouse', { sky: ['#e0f8f0', '#c8ecd8'], ground: '#9a8a7a', back: [['windows', { n: 3, x0: 60, gap: 340 }], ['custom', { fn: (x) => { x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 8; for (let k = 0; k < 8; k++) { x.beginPath(); x.moveTo(k * 150, 0); x.lineTo(k * 150 - 100, 1200); x.stroke(); } } }]] });
scene('fl_plaza', { sky: ['#ffe8d0', '#fff6ec'], ground: '#d8b890', back: [['tiles', { col: 'rgba(120,80,40,0.2)' }], ['columns', { n: 2, x0: 80, gap: 820, w: 80, col: '#f4e8d8' }]] });
scene('fl_alley', { sky: ['#c8a890', '#e8d0b8'], ground: '#7a6a5a', back: [['bricks', {}], ['custom', { fn: (x, h) => { h.rrect(x, 760, 760, 200, 480, 10); h.fs(x, '#6b4630', 8); } }]] });
scene('fl_roofs', { sky: ['#2a3a6a', '#5a6aa0'], ground: '#4a4a6a', back: [['moon', { x: 820, y: 260 }], ['houses', { cols: ['#5a5a7a', '#4a4a6a', '#6a6a8a'], roof: '#2a2436', win: '#ffe070', seed: 71 }]] });
scene('fl_canyon', { sky: ['#ffc890', '#ffe8c8'], ground: '#c87a4a', back: [['mountains', { gy: 1250, col: '#a85a3a' }], ['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(-100, 1250); x.lineTo(160, 500); x.lineTo(300, 1250); x.closePath(); h.fs(x, '#b8653a', 10); x.beginPath(); x.moveTo(780, 1250); x.lineTo(980, 420); x.lineTo(1200, 1250); x.closePath(); h.fs(x, '#b8653a', 10); } }]] });
scene('fl_castle', { sky: ['#3a1a3a', '#6a2a5a'], ground: '#3a2a3a', back: [['custom', { fn: (x, h) => { for (const [cx, w, hh] of [[200, 260, 700], [540, 340, 900], [880, 260, 700]]) { h.rrect(x, cx - w / 2, 1250 - hh, w, hh, 8); h.fs(x, '#2a1a2a', 9); x.beginPath(); x.moveTo(cx - w / 2 - 40, 1250 - hh); x.lineTo(cx, 1250 - hh - 140); x.lineTo(cx + w / 2 + 40, 1250 - hh); x.closePath(); h.fs(x, '#8a2a3a', 9); } } }], ['stars', { n: 30 }]] });
scene('fl_desert', { sky: ['#ffd890', '#fff0c8'], ground: '#e8c080', back: [['sun', { x: 820, y: 280, r: 110 }], ['custom', { fn: (x, h) => { for (const [dx, s] of [[120, 1], [520, 1.4]]) { x.beginPath(); x.moveTo(dx - 200 * s, 1260); x.quadraticCurveTo(dx, 1260 - 260 * s, dx + 260 * s, 1260); x.closePath(); h.fs(x, '#d8a860', 8); } } }]] });
scene('fl_arena', { sky: ['#e8d0b0', '#c8a880'], ground: '#b89060', back: [['custom', { fn: (x, h) => { for (let r = 0; r < 4; r++) { h.rrect(x, -80, 300 + r * 180, 1240, 140, 10); h.fs(x, '#a07850', 8); } } }], ['banners', { n: 4, y: 160, cols: ['#e8402e', '#f4d030', '#3f6fd8'] }]] });
scene('fl_ohara', { sky: ['#b8e0f0', '#e8f8ff'], ground: '#7ac05a', back: [['custom', { fn: (x, h) => { h.rrect(x, 440, 300, 200, 950, 40); h.fs(x, '#8a5a3a', 12); for (const [cx, cy, r] of [[540, 300, 340], [260, 460, 220], [820, 460, 220]]) { x.beginPath(); x.arc(cx, cy, r, 0, 7); h.fs(x, '#4aa04a', 12); } h.rrect(x, 680, 900, 260, 340, 12); h.fs(x, '#3a3a5a', 9); x.fillStyle = '#7a8ab0'; for (let r = 0; r < 6; r++) for (let k = 0; k < 4; k++) x.fillRect(710 + k * 56, 940 + r * 50, 36, 24); } }]] });
scene('fl_deck', { sky: ['#8fd4ff', '#e8f6ff'], ground: '#c99b6d', gy: 1260, back: [['water', { y: 1000, hh: 260 }], ['custom', { fn: (x, h) => { h.rrect(x, 0, 1100, 1080, 40, 6); h.fs(x, '#8a5a3a', 6); } }]] });

// ---------------- sprouted body parts ----------------
const SKIN = '#f6dcc4';
function petals(x, cx, cy, s, t) { for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + t; x.save(); x.translate(cx + Math.cos(a) * 30 * s, cy + Math.sin(a) * 12 * s); x.rotate(a); x.beginPath(); x.ellipse(0, 0, 22 * s, 9 * s, 0, 0, 7); x.fillStyle = '#ff8cc0'; x.fill(); x.lineWidth = 3; x.strokeStyle = A.OL; x.stroke(); x.restore(); } }
// an arm sprouting from (bx, by) toward angle ang (0 = up), with grab k (0 open .. 1 closed fist)
export function arm(x, bx, by, len, ang, s, t, grab = 0) { x.save(); x.translate(bx, by); x.rotate(ang); x.lineCap = 'round';
  x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -len); x.lineWidth = 46 * s; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 32 * s; x.strokeStyle = SKIN; x.stroke();
  x.beginPath(); x.arc(0, -len - 20 * s, 30 * s, 0, 7); A.fs(x, SKIN, 7 * s); if (grab < 0.5) for (let k = -1.5; k <= 1.5; k++) { x.beginPath(); x.moveTo(k * 14 * s, -len - 40 * s); x.lineTo(k * 18 * s, -len - 76 * s); x.lineWidth = 18 * s; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 9 * s; x.strokeStyle = SKIN; x.stroke(); }
  x.restore(); petals(x, bx, by, s, t * 0.5); }
function eye(x, cx, cy, s, t) { x.beginPath(); x.ellipse(cx, cy, 60 * s, 34 * s, 0, 0, 7); A.fs(x, '#ffffff', 7 * s); x.beginPath(); x.arc(cx + Math.sin(t * 2) * 18 * s, cy, 18 * s, 0, 7); x.fillStyle = '#2a3a9a'; x.fill(); petals(x, cx, cy + 30 * s, s * 0.8, t); }
function ear(x, cx, cy, s, t) { x.beginPath(); x.ellipse(cx, cy, 34 * s, 54 * s, 0, 0, 7); A.fs(x, SKIN, 7 * s); x.beginPath(); x.ellipse(cx, cy, 16 * s, 30 * s, 0, 0, 7); x.lineWidth = 5 * s; x.strokeStyle = '#d8a888'; x.stroke(); petals(x, cx, cy + 50 * s, s * 0.8, t); }
export function hanaIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { arm(x, -60, 120, 140, -0.2, 0.7, t); arm(x, 60, 120, 140, 0.2, 0.7, t); }
  else if (k === 2) { eye(x, -40, -20, 1, t); ear(x, 90, 30, 1, t); }
  else if (k === 3) arm(x, 0, 160, 260, 0, 1.4, t, 1);
  else { A.glow(x, 0, 0, 200, '255,140,200', 0.6); petals(x, 0, 0, 3, t); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a pink flower-shaped fruit', biteDesc: 'pink petals burst into the air', biteSfx: 'shimmer', bannerCol: 'pink', biteCol: '#ff8cc0',
    biteFx(x, S, k) { if (k > 0 && k < 1) petals(x, 560, 800, 1 + 5 * k, S.T); },
    calmBg: 's3:fl_garden', calmDesc: 'flower garden', seaHue: 'pink', seed: 63, nameRe: /^Flower-Flower/,
    revealBg: 's3:fl_petals', revealDesc: 'storm of falling petals', revealBanner: 'FLOWER-FLOWER FRUIT', haloRgb: '255,170,210' });
  const tSprout = W('type', /^sprout/) - 0.1, tAny = W('type', /^anywhere/) - 0.1;
  add({ name: 'Sprout (greenhouse): extra hands bloom out of the walls around the host in puffs of petals', t0: tSprout, t1: tAny, bg: 's3:fl_greenhouse',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'pop'], [0.4, 'pop'], [0.7, 'pop']],
    draw(x, S) { person(x, S, 'host', 'shock', 540, 1780, 0.66, { seed: 2, pose: 'shrug' }); [[150, 900, 0.9], [930, 820, -0.9], [200, 1300, 1.2], [880, 1350, -1.2]].forEach(([bx, by, a], i) => { const k = ease.outBack(prog(S.t, 0.1 + i * 0.15, 0.35 + i * 0.15)); if (k > 0) arm(x, bx, by, 140 * k, a, 0.7, S.T); }); } });
  stage(T, { desc: 'sunny stone plaza', bg: 's3:fl_plaza', t0: tAny, t1: end('type'), times: [W('type', /^anywhere/), W('type', /^anywhere/) + 0.2, W('type', /^anywhere/) + 0.4, W('type', /^anywhere/) + 0.6],
    labels: ['GRAB', 'SPY', 'GIANT', 'DEMONIO'], bar: 'BLOOM POWERS', haloRgb: '255,170,210', icon: hanaIcon });

  const tGrab = W('power1', /^grab/) - 0.1;
  addSplit({ name: 'Power 1 (brick alley): arms bloom out of the walls and the floor around a bandit; pink BLOOM banner', t0: st('power1'), t1: end('power1'), bg: 's3:fl_alley',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['ARMS EVERYWHERE', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'pop'], [0.5, 'pop'], [0.8, 'pop']],
    draw(x, S) { person(x, S, 'robin', 'calm', 250, 1780, 0.62, { seed: 2, pose: 'idle' }); const e = person(x, S, 'bandit', 'worried', 760, 1780, 0.6, { seed: 3, pose: 'shrug', flip: true }); [[560, 1000, 1.0], [980, 900, -1.0], [620, 1640, 0.5], [920, 1660, -0.5]].forEach(([bx, by, a], i) => { const k = ease.outBack(prog(S.t, 0.2 + i * 0.2, 0.45 + i * 0.2)); if (k > 0) arm(x, bx, by, 120 * k, a, 0.6, S.T); }); A.mark(x, '!?', e.head[0] - 100, e.head[1] - 180, pop(S.T, S.t0 + 0.6)); } },
    tGrab, [[1.05, 560, 1000, 0.02], [1.1, 560, 990, 0.035]], 'Power 1 grab (same alley): all the arms clamp onto the bandit, who freezes mid-step');
  const p1 = T.shots[T.shots.length - 1]; p1.draw = function (x, S) { person(x, S, 'robin', 'smug', 250, 1780, 0.62, { seed: 2, pose: 'idle' }); const e = person(x, S, 'bandit', 'hit', 760, 1780, 0.6, { seed: 3, pose: 'shrug', flip: true }); [[600, 1300, 0.7], [920, 1300, -0.7], [640, 1640, 0.3], [880, 1640, -0.3]].forEach(([bx, by, a]) => arm(x, bx, by, 110, a, 0.6, S.T, 1)); if (S.T < S.t0 + 7 * F) S.shake = 0.4; };

  const tSpy = W('power2', /^spy/) - 0.1;
  add({ name: 'Power 2 evolve (moonlit rooftops): grab icon becomes the eye-and-ear icon; an eye and an ear bloom on a chimney far from Robin, watching the bandit sneak past; purple SPY banner', t0: st('power2'), t1: end('power2'), bg: 's3:fl_roofs',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['SPY ON EVERYTHING', 'pink', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^eyes/) - st('power2'), 'pop'], [W('power2', /^ears/) - st('power2'), 'pop']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, hanaIcon)) return; const ke = pop(S.T, W('power2', /^eyes/)), kr = pop(S.T, W('power2', /^ears/)); if (ke > 0) eye(x, 300, 860, 2.2 * ke, S.T); if (kr > 0) ear(x, 780, 860, 2.2 * kr, S.T);
      person(x, S, 'bandit', 'worried', lerp(260, 820, prog(S.T, S.t0 + 0.5, end('power2'))), 1780, 0.6, { seed: 3, pose: 'shrug' }); } });

  const tTower = W('power3', /^tower/) - 0.1;
  addSplit({ name: 'Power 3 evolve (red canyon): eye icon becomes the giant-arm icon; a huge arm as tall as the cliffs grows out of the ground; orange GIGANTESCO banner', t0: st('power3'), t1: end('power3'), bg: 's3:fl_canyon',
    cam: [[1.0, 540, 980, 0], [1.0, 540, 900, 0.02]], banners: [['GIANT ARMS', 'gold', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^giant/) - st('power3'), 'rumble']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, hanaIcon)) return; const k = ease.outCubic(prog(S.T, W('power3', /^grow/), tTower)); arm(x, 640, 1300, 640 * k + 40, 0.1, 3.2, S.T, 1); person(x, S, 'robin', 'calm', 240, 1820, 0.5, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 }); if (k > 0 && k < 1) S.shake = 0.3; } },
    tTower, [[0.9, 540, 900, -0.02], [0.95, 540, 880, -0.035]], 'Power 3 slam (same canyon): the giant fist slams down on a cliff, impact star, shake');
  const p3 = T.shots[T.shots.length - 1]; p3.draw = function (x, S) { const k = ease.outCubic(prog(S.T, tTower, tTower + 0.35)); arm(x, 640, 1300, 680, lerp(0.1, -0.9, k), 3.2, S.T, 1); if (k >= 1) { A.impactStar(x, 120, 900, 240 * pop(S.T, tTower + 0.35), S.T); if (S.T < tTower + 0.35 + 7 * F) S.shake = 0.8; } };

  const tDemon = W('peak', /^demon$/) - 0.1;
  addSplit({ name: 'Peak (dark castle roof): giant-arm icon gives way to the petal icon, pink halo; gold DEMONIO FLEUR banner; a giant Robin of petals rises behind Robin', t0: st('peak'), t1: end('peak'), bg: 's3:fl_castle',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['DEMONIO FLEUR', 'gold', W('peak', /^Demonio/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Demonio/) - st('peak'), 'shimmer']],
    draw(x, S) { halo(x, 540, 900, 620, '255,140,200', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, hanaIcon); return; }
      const k = ease.outCubic(prog(S.T, W('peak', /^Demonio/), tDemon + 0.3)); petals(x, 540, 900, 6 * k, S.T); if (k > 0) person(x, S, 'robin', 'smug', 540, 1900, 1.1 * k, { seed: 7, pose: 'raise', alpha: 0.5 * k }); person(x, S, 'robin', 'calm', 540, 1820, 0.6, { seed: 7, pose: 'idle' }); } },
    tDemon, [[1.0, 540, 900, -0.02], [1.06, 540, 880, -0.035]], 'Peak demon (same roof): the huge pink demon Robin with dark wings crosses her arms over the castle');
  const pk = T.shots[T.shots.length - 1]; pk.draw = function (x, S) { for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(540, 900); x.quadraticCurveTo(540 + sd * 600, 400, 540 + sd * 520, 1200); x.closePath(); x.fillStyle = 'rgba(60,20,60,0.85)'; x.fill(); } person(x, S, 'robin', 'smug', 540, 1900, 1.1, { seed: 7, pose: 'idle', alpha: 0.8 }); petals(x, 540, 1300, 5, S.T); };

  add({ name: 'Twist (desert dunes): push-in with roll, low sting; red PAINFUL CATCH banner', t0: st('twist'), t1: end('twist'), bg: 's3:fl_desert', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['PAINFUL CATCH', 'red', W('twist', /^catch/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Ouch (arena stands): a brute stomps on a sprouted hand; Robin, far away, winces and grabs her own hand; red YOU FEEL IT banner', t0: st('truth'), t1: end('truth'), bg: 's3:fl_arena',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['YOU FEEL IT TOO', 'red', W('truth', /^feel/) - 0.1, end('truth')]], sfx: [[W('truth', /^hurts/) - st('truth'), 'impact'], [W('truth', /^feel/) - st('truth'), 'shock']],
    draw(x, S) { const th = W('truth', /^hurts/); arm(x, 760, 1650, 90, 0, 0.6, S.T); const b = person(x, S, 'brute', 'smug', 760, 1700 - (S.T > th ? 0 : 60), 0.6, { seed: 5, pose: 'idle', flip: true }); if (S.T > th) A.impactStar(x, 760, 1620, 80 * pop(S.T, th), S.T);
      const r = person(x, S, 'robin', S.T > th + 0.2 ? 'hit' : 'calm', 260, 1780, 0.62, { seed: 2, pose: 'shrug' }); if (S.T > th + 0.2) A.mark(x, '!', r.head[0] + 90, r.head[1] - 180, pop(S.T, th + 0.2)); } });

  const tStraw = W('users', /^Straw/) - 0.1;
  add({ name: 'Robin (Ohara tree of knowledge): Nico Robin with sunglasses on her head and blue jacket; purple NICO ROBIN banner', t0: st('users'), t1: tStraw, bg: 's3:fl_ohara',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['NICO ROBIN', 'pink', st('users') + 0.2, tStraw + 0.2]], sfx: [[0, 'whoosh']],
    draw(x, S) { person(x, S, 'robin', 'smug', 400, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); } });
  add({ name: 'Archaeologist (same tree, closer on the stone tablet): Robin reads the ancient tablet while a sprouted hand holds her book; gold ARCHAEOLOGIST banner', t0: tStraw, t1: end('users'), bg: 's3:fl_ohara',
    cam: [[1.1, 640, 1050, -0.02], [1.18, 660, 1040, 0.02]], banners: [['STRAW HAT ARCHAEOLOGIST', 'gold', tStraw + 0.1, end('users')]], sfx: [[0.2, 'shimmer']],
    draw(x, S) { const r = person(x, S, 'robin', 'calm', 440, 1820, 0.7, { seed: 8, pose: 'holdUp' }); arm(x, 300, 1250, 100, 0.8, 0.5, S.T); A.rrect(x, r.hand.R[0] - 60, r.hand.R[1] - 120, 120, 90, 6); A.fs(x, '#8a3a3a', 6); } });

  add({ name: 'Joke (ship deck): the host claps one hand against a hand that sprouted on his own shoulder; sparkles; gold ONE-HAND CLAP banner', t0: st('joke'), t1: end('joke'), bg: 's3:fl_deck',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['ONE-HAND CLAP', 'gold', W('joke', /^clap/) - 0.1, end('joke')]], sfx: [[W('joke', /^clap/) - st('joke'), 'snap'], [W('joke', /^hand/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'grin', 460, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); const c = Math.abs(Math.sin(S.T * 8)); arm(x, h.hand.R[0] + 120 - 40 * c, h.hand.R[1] + 100, 100, -0.6, 0.6, S.T); if (c < 0.2) A.sparkle(x, h.hand.R[0] + 50, h.hand.R[1] - 30, 40, '#ffe14d'); } });

  ending(T, { TL, fruit });
  return finish();
}
