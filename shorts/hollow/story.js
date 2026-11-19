// Shot plan for the Horo Horo no Mi (Hollow-Hollow Fruit) short. Structure: Negative Hollows, exploding mini hollows, astral body, a whole crew kneeling as the peak.
import * as A from '/engine/art.js';
import { drawHoro } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawHoro(x, cx, cy, R * 0.9, rot, o);

export const SETS = ['s3:ho_attic', 'rays:lavender', 's3:ho_mansion', 's3:ho_graveyard', 's3:ho_ballroom', 's3:ho_hallway', 's3:ho_garden', 's3:ho_bedroom', 's3:ho_courtyard', 's3:ho_fogsea', 's3:ho_cellar', 's3:ho_tower', 's3:ho_party'];
scene('ho_attic', { sky: ['#d8c8b0', '#b8a890'], ground: '#8a6a4a', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(-100, 300); x.lineTo(540, -80); x.lineTo(1180, 300); x.lineTo(1180, 0); x.lineTo(-100, 0); x.closePath(); h.fs(x, '#6b4630', 0); h.rrect(x, 440, 420, 200, 200, 100); h.fs(x, '#c8e0ff', 9); } }], ['crates', {}]] });
scene('ho_mansion', { sky: ['#2a1a3a', '#4a2a5a'], back: [['moon', { x: 820, y: 240, r: 140, col: '#f0e8ff' }], ['custom', { fn: (x, h) => { h.rrect(x, 160, 600, 760, 700, 8); h.fs(x, '#3a2a4a', 10); x.beginPath(); x.moveTo(120, 620); x.lineTo(540, 360); x.lineTo(960, 620); x.closePath(); h.fs(x, '#2a1a2a', 10); for (let r = 0; r < 2; r++) for (let k = 0; k < 4; k++) { h.rrect(x, 220 + k * 170, 700 + r * 220, 90, 140, 40); h.fs(x, '#ffd070', 6); } } }], ['stars', { n: 30 }]] });
scene('ho_graveyard', { sky: ['#4a3a6a', '#7a6a9a'], ground: '#4a5a4a', back: [['fog', { n: 8, col: 'rgba(230,220,255,0.25)' }], ['custom', { fn: (x, h) => { for (let k = 0; k < 5; k++) { h.rrect(x, 40 + k * 220, 1000 + (k % 2) * 40, 140, 260, 60); h.fs(x, '#8a8aa0', 8); x.fillStyle = '#5a5a70'; x.fillRect(100 + k * 220, 1060 + (k % 2) * 40, 20, 80); x.fillRect(80 + k * 220, 1080 + (k % 2) * 40, 60, 20); } } }]] });
scene('ho_ballroom', { sky: ['#f0d8f0', '#d8b8d8'], ground: '#5a3a5a', back: [['tiles', { col: 'rgba(80,30,80,0.2)' }], ['custom', { fn: (x, h) => { x.beginPath(); x.arc(540, 160, 120, 0, Math.PI); h.fs(x, '#f4d030', 8); for (let k = 0; k < 5; k++) { x.beginPath(); x.arc(440 + k * 50, 300, 16, 0, 7); h.fs(x, '#fff6c0', 4); } } }], ['columns', { n: 2, x0: 60, gap: 860, w: 70, col: '#ff8cc0' }]] });
scene('ho_hallway', { sky: ['#3a2a3a', '#5a3a4a'], ground: '#6a2a3a', back: [['frames', { list: [[80, 340, 220, 300], [430, 300, 220, 340], [780, 340, 220, 300]], col: '#b8a8c8' }], ['custom', { fn: (x) => { x.fillStyle = '#8a2a3a'; x.fillRect(-80, 1150, 1240, 120); } }]] });
scene('ho_garden', { sky: ['#6a5a8a', '#a898c0'], ground: '#5a7a4a', back: [['trees', { n: 3, x0: 60, gap: 420, leaf: '#3a4a3a' }], ['fog', { n: 6 }]] });
scene('ho_bedroom', { sky: ['#ffd8ec', '#ffeef6'], ground: '#c88aa8', back: [['custom', { fn: (x, h) => { h.rrect(x, 560, 900, 460, 260, 20); h.fs(x, '#ff8cc0', 9); h.rrect(x, 560, 840, 460, 80, 30); h.fs(x, '#ffffff', 8); for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(150 + k * 90, 500, 40, 0, 7); h.fs(x, '#f8f4f8', 6); } } }], ['windows', { n: 1, x0: 140, gap: 300 }]] });
scene('ho_courtyard', { sky: ['#1a1030', '#4a2a5a'], ground: '#5a4a5a', back: [['moon', { x: 540, y: 400, r: 260, col: '#e8dcff' }], ['custom', { fn: (x, h) => { for (let k = 0; k < 6; k++) { h.rrect(x, -20 + k * 200, 900, 60, 360, 6); h.fs(x, '#3a2a3a', 7); } h.rrect(x, -80, 880, 1240, 40, 6); h.fs(x, '#3a2a3a', 7); } }]] });
scene('ho_fogsea', { sky: ['#5a6a7a', '#8a9aaa'], back: [['water', { y: 1200, hh: 800, col: '#3a4a5a' }], ['fog', { n: 12, col: 'rgba(255,255,255,0.3)' }]] });
scene('ho_cellar', { sky: ['#4a3a3a', '#2a2020'], ground: '#5a4a3a', back: [['bricks', { col: 'rgba(0,0,0,0.3)' }], ['custom', { fn: (x, h) => { for (let k = 0; k < 4; k++) { x.beginPath(); x.ellipse(160 + k * 250, 1150, 90, 120, 0, 0, 7); h.fs(x, '#8a5a3a', 8); } } }]] });
scene('ho_tower', { sky: ['#2a1a3a', '#6a3a6a'], ground: '#3a2a3a', back: [['custom', { fn: (x, h) => { h.rrect(x, 340, 200, 400, 1100, 10); h.fs(x, '#4a3a5a', 10); x.beginPath(); x.moveTo(300, 220); x.lineTo(540, -40); x.lineTo(780, 220); x.closePath(); h.fs(x, '#ff8cc0', 10); h.rrect(x, 470, 400, 140, 200, 70); h.fs(x, '#ffd070', 7); } }], ['stars', { n: 40 }]] });
scene('ho_party', { sky: ['#ffe0f0', '#fff4fa'], ground: '#d8a8c8', back: [['confetti', { n: 50 }], ['custom', { fn: (x, h) => { h.rrect(x, 640, 1050, 340, 200, 12); h.fs(x, '#ffffff', 8); x.beginPath(); x.moveTo(700, 1050); x.lineTo(810, 900); x.lineTo(920, 1050); x.closePath(); h.fs(x, '#ff8cc0', 8); } }]] });

// ---------------- ghosts ----------------
// a sheet ghost; mood 'sad' gives the droopy Negative Hollow face
export function ghost(x, cx, cy, s, t, o = {}) { const a = o.alpha ?? 0.92; x.save(); x.globalAlpha = a; x.translate(cx, cy + Math.sin(t * 3 + cx) * 10 * s); x.scale(s, s);
  x.beginPath(); x.arc(0, -40, 90, Math.PI, 0); x.lineTo(90, 60); for (let k = 0; k < 4; k++) x.quadraticCurveTo(90 - (k + 0.5) * 45, k % 2 ? 60 : 100, 90 - (k + 1) * 45, 70); x.closePath(); A.fs(x, o.col || '#f8f6ff', 8);
  x.fillStyle = A.OL; if (o.mood === 'boom') { for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 46, -60); x.lineTo(sd * 18, -42); x.lineWidth = 8; x.strokeStyle = A.OL; x.stroke(); } x.beginPath(); x.arc(0, 0, 18, 0, Math.PI); x.fill(); }
  else { for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(sd * 32, -40, 12, 18, 0, 0, 7); x.fill(); } x.beginPath(); if (o.mood === 'sad') x.arc(0, 10, 22, Math.PI, 0); else x.arc(0, -4, 18, 0.2, Math.PI - 0.2); x.lineWidth = 7; x.strokeStyle = A.OL; x.stroke(); }
  if (o.crown) { x.beginPath(); x.moveTo(-40, -120); x.lineTo(-40, -160); x.lineTo(-15, -140); x.lineTo(0, -175); x.lineTo(15, -140); x.lineTo(40, -160); x.lineTo(40, -120); x.closePath(); A.fs(x, '#f4d030', 6); }
  x.restore(); }
function gloom(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); for (let k = 0; k < 3; k++) x.arc(-50 + k * 50, 0, 50, Math.PI, 0); A.fs(x, '#6a6a80', 6); x.strokeStyle = '#7cc8ff'; x.lineWidth = 6; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(-80 + k * 40, 30); x.lineTo(-90 + k * 40, 90); x.stroke(); } x.restore(); }
export function horoIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) ghost(x, 0, 0, 1.0, t, { mood: 'sad' });
  else if (k === 2) { ghost(x, -40, 20, 0.6, t, { mood: 'boom' }); A.impactStar(x, 60, -30, 70, t); }
  else if (k === 3) ghost(x, 0, 0, 1.0, t, { alpha: 0.5, crown: true });
  else { A.glow(x, 0, 0, 200, '200,170,255', 0.6); gloom(x, 0, -20, 1.2); }
  x.restore();
}
const kneel = (x, S, who, cx, fy, s, o) => { const p = person(x, S, who, 'sad', cx, fy + 120 * s, s, o); gloom(x, p.head[0], p.head[1] - 260 * s, s * 1.4); return p; };

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a pale yellow fruit made of little ghost lobes', biteDesc: 'a tiny ghost giggles out of the fruit', biteSfx: 'shimmer', bannerCol: 'pink', biteCol: '#f4eaa0',
    biteFx(x, S, k) { if (k > 0 && k < 1) ghost(x, 700, 900 - 200 * k, 0.6, S.T, { alpha: 1 - k }); },
    calmBg: 's3:ho_attic', calmDesc: 'dusty attic', seaHue: 'lavender', seed: 69, nameRe: /^Hollow-Hollow/,
    revealBg: 's3:ho_mansion', revealDesc: 'haunted mansion under the moon', revealBanner: 'HOLLOW-HOLLOW FRUIT', haloRgb: '220,200,255' });
  const tMake = W('type', /^make/) - 0.1, tGhosts = W('type', /^ghosts/) - 0.1;
  add({ name: 'Make ghosts (foggy graveyard): little white ghosts pop out of the host\'s palms', t0: tMake, t1: tGhosts, bg: 's3:ho_graveyard',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.1, 'pop'], [0.3, 'pop']],
    draw(x, S) { const h = person(x, S, 'host', 'shock', 540, 1780, 0.66, { seed: 2, pose: 'raise' }); for (let i = 0; i < 3; i++) { const k = prog(S.t, 0.05 + i * 0.15, 0.5 + i * 0.15); if (k > 0) ghost(x, lerp(h.hand.L[0], 200 + i * 340, k), lerp(h.hand.L[1], 900, k), 0.6 * k, S.T + i); } } });
  stage(T, { desc: 'pink ghost ballroom', bg: 's3:ho_ballroom', t0: tGhosts, t1: end('type'), times: [W('type', /^ghosts/), W('type', /^ghosts/) + 0.2, W('type', /^ghosts/) + 0.4, W('type', /^ghosts/) + 0.6],
    labels: ['NEGATIVE', 'BOOM', 'ASTRAL', 'KNEEL'], bar: 'GHOST POWERS', haloRgb: '220,200,255', icon: horoIcon });

  const tSad = W('power1', /^super/) - 0.1;
  addSplit({ name: 'Power 1 (gloomy hallway): a droopy Negative Hollow floats straight through a viking; purple NEGATIVE HOLLOW banner', t0: st('power1'), t1: end('power1'), bg: 's3:ho_hallway',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['NEGATIVE HOLLOW', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'whoosh'], [W('power1', /^through/) - st('power1'), 'shimmer']],
    draw(x, S) { person(x, S, 'viking', 'smug', 700, 1780, 0.66, { seed: 3, pose: 'idle', flip: true }); ghost(x, lerp(100, 1000, prog(S.T, S.t0, tSad)), 1250, 0.9, S.T, { mood: 'sad', alpha: 0.85 }); } },
    tSad, [[1.1, 600, 1050, 0.02], [1.15, 600, 1040, 0.035]], 'Power 1 sad (same hallway): the viking drops to his knees under a little rain cloud');
  const p1 = T.shots[T.shots.length - 1]; p1.sfx = [[0, 'sting']]; p1.draw = function (x, S) { kneel(x, S, 'viking', 640, 1780, 0.66, { seed: 3, pose: 'shrug', flip: true }); A.mark(x, '...', 860, 900, pop(S.T, S.t0 + 0.3)); };

  const tBoom = W('power2', /^explode/) - 0.1;
  add({ name: 'Power 2 evolve (twisted garden): negative icon becomes the boom icon; a flock of mini ghosts flies at a brute and explodes like little bombs; red GHOST RAP banner', t0: st('power2'), t1: end('power2'), bg: 's3:ho_garden',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['MINI HOLLOWS', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [tBoom - st('power2'), 'pops'], [tBoom - st('power2') + 0.2, 'boom']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, horoIcon)) return; const k = prog(S.T, S.t0 + 0.5, tBoom + 0.1); person(x, S, 'brute', S.T > tBoom + 0.1 ? 'hit' : 'worried', 780, 1780, 0.64, { seed: 3, pose: 'shrug', flip: true, pop: S.t0 + 0.45 });
      if (S.T < tBoom + 0.1) for (let i = 0; i < 5; i++) ghost(x, lerp(80 + i * 40, 720, k), 1100 + i * 80, 0.45, S.T + i, { mood: 'boom' }); else for (let i = 0; i < 3; i++) A.impactStar(x, 700 + i * 60, 1150 + i * 120, 140 * pop(S.T, tBoom + 0.1 + i * 0.08), S.T); if (S.T > tBoom + 0.1 && S.T < tBoom + 0.1 + 7 * F) S.shake = 0.6; } });

  const tFloat = W('power3', /^float/) - 0.1;
  addSplit({ name: 'Power 3 evolve (pink bedroom): boom icon becomes the astral icon; Perona lies asleep on the bed while her see-through ghost body sits up out of her; purple ASTRAL BODY banner', t0: st('power3'), t1: end('power3'), bg: 's3:ho_bedroom',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['GHOST BODY', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^leave/) - st('power3'), 'shimmer']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, horoIcon)) return; const k = ease.outCubic(prog(S.T, W('power3', /^leave/), tFloat)); person(x, S, 'perona', 'calm', 540, 1800, 0.66, { seed: 2, pose: 'idle', pop: S.t0 + 0.45 }); if (k > 0) person(x, S, 'perona', 'grin', 540 + 180 * k, 1800 - 260 * k, 0.66, { seed: 2, pose: 'raise', alpha: 0.45 }); } },
    tFloat, [[1.0, 540, 1000, -0.02], [1.06, 540, 980, -0.035]], 'Through walls (same bedroom): the ghost Perona drifts straight through the wall, half in, half out');
  const p3 = T.shots[T.shots.length - 1]; p3.draw = function (x, S) { const k = prog(S.T, S.t0, S.t0 + 1.2); x.save(); x.beginPath(); x.rect(-200, 0, 1000 - 0, 2000); x.clip(); person(x, S, 'perona', 'grin', lerp(600, 1050, k), 1600, 0.66, { seed: 2, pose: 'raise', alpha: 0.5 }); x.restore(); A.rrect(x, 800, 300, 40, 1200, 4); A.fs(x, '#c88aa8', 6); };

  const tKnees = W('peak', /^knees/) - 0.1;
  addSplit({ name: 'Peak (moonlit castle courtyard): astral icon gives way to the gloom icon, lavender halo; gold KNEEL banner; a swarm of Negative Hollows streams out of Perona\'s hands', t0: st('peak'), t1: end('peak'), bg: 's3:ho_courtyard',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['EVEN THE TOUGHEST', 'gold', W('peak', /^toughest/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^makes/) - st('peak'), 'whoosh']],
    draw(x, S) { halo(x, 540, 900, 620, '200,170,255', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, horoIcon); return; }
      person(x, S, 'perona', 'smug', 540, 1800, 0.72, { seed: 7, pose: 'raise' }); for (let i = 0; i < 7; i++) { const a = i / 7 * 6.283 + S.T; ghost(x, 540 + Math.cos(a) * 360, 1100 + Math.sin(a) * 260, 0.5, S.T + i, { mood: 'sad' }); } } },
    tKnees, [[1.0, 540, 1000, -0.02], [1.08, 540, 990, -0.035]], 'Peak cry (same courtyard): a brute, a viking and a boxer all collapse to their knees sobbing');
  const pk = T.shots[T.shots.length - 1]; pk.sfx = [[0, 'sting']]; pk.draw = function (x, S) { kneel(x, S, 'brute', 220, 1800, 0.55, { seed: 3, pose: 'shrug' }); kneel(x, S, 'viking', 540, 1820, 0.58, { seed: 4, pose: 'shrug' }); kneel(x, S, 'boxer', 860, 1800, 0.55, { seed: 5, pose: 'shrug', flip: true }); };

  add({ name: 'Twist (foggy sea): push-in with roll, low sting; red FUNNY WEAKNESS banner', t0: st('twist'), t1: end('twist'), bg: 's3:ho_fogsea', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['FUNNY WEAKNESS', 'red', W('twist', /^weakness/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Already negative (gloomy cellar): a Negative Hollow flies through Usopp, who was already moping; nothing happens and the ghost looks confused; red ALREADY NEGATIVE banner', t0: st('truth'), t1: end('truth'), bg: 's3:ho_cellar',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['ALREADY NEGATIVE', 'red', W('truth', /^negative/) - 0.1, end('truth')]], sfx: [[0.2, 'whoosh'], [W('truth', /^negative/) - st('truth'), 'boing']],
    draw(x, S) { const u = person(x, S, 'usopp', 'sad', 420, 1780, 0.66, { seed: 3, pose: 'shrug' }); gloom(x, u.head[0], u.head[1] - 240, 0.9); const k = prog(S.T, S.t0, S.t0 + 1.0); ghost(x, lerp(1000, 420, k), 1250, 0.8, S.T, { mood: 'sad', alpha: 0.85 }); if (k >= 1) A.mark(x, '?', 560, 1050, pop(S.T, S.t0 + 1.0)); } });

  const tLost = W('users', /^lost/) - 0.1;
  add({ name: 'Perona (ghost princess tower): Perona in her crown, pink twin-tails and striped stockings, ghosts around her; purple GHOST PRINCESS banner', t0: st('users'), t1: tLost, bg: 's3:ho_tower',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['PERONA', 'pink', st('users') + 0.2, W('users', /^ghost/)], ['GHOST PRINCESS', 'pink', W('users', /^ghost/), tLost + 0.1]], sfx: [[0, 'whoosh'], [W('users', /^ghost/) - st('users'), 'shimmer']],
    draw(x, S) { person(x, S, 'perona', 'grin', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); ghost(x, 200, 1000, 0.6, S.T); ghost(x, 880, 900, 0.5, S.T + 2); } });
  add({ name: 'Lost to Usopp (same tower): Usopp shrugs, totally gloomy, while Perona stares in shock; red LOST TO USOPP banner', t0: tLost, t1: end('users'), bg: 's3:ho_tower',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['LOST TO USOPP', 'red', tLost + 0.2, end('users')]], sfx: [[0.1, 'impact'], [0.4, 'shock']],
    draw(x, S) { person(x, S, 'perona', 'shock', 300, 1800, 0.62, { seed: 8, pose: 'shrug' }); person(x, S, 'usopp', 'smug', 790, 1800, 0.66, { seed: 4, pose: 'punch', flip: true }); A.mark(x, '!?', 300, 950, pop(S.T, tLost + 0.4)); } });

  add({ name: 'Joke (pink party room): the host sits at a party table surrounded by happy little ghosts in party hats; gold NEVER LONELY banner', t0: st('joke'), t1: end('joke'), bg: 's3:ho_party',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NEVER LONELY', 'gold', W('joke', /^lonely/) - 0.1, end('joke')]], sfx: [[0.3, 'pops'], [W('joke', /^lonely/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { person(x, S, 'host', 'grin', 420, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'cheer', talk: true }); for (let i = 0; i < 5; i++) ghost(x, 120 + i * 210, 900 + (i % 2) * 140, 0.5, S.T + i, { crown: i % 2 === 0 }); } });

  ending(T, { TL, fruit });
  return finish();
}
