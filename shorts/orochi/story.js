// Shot plan for the Hebi Hebi no Mi, Model: Yamata no Orochi short. Structure: eight-headed serpent, heads that fight on their own, losing a head, surviving as the peak.
import * as A from '/engine/art.js';
import { drawOrochi } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawOrochi(x, cx, cy, R * 0.85, rot, o);

export const SETS = ['s3:or_teahouse', 'rays:coral', 's3:or_moon', 's3:or_bamboo', 's3:or_hall', 's3:or_swamp', 's3:or_courtyard', 's3:or_cliffs', 's3:or_flames', 's3:or_rain', 's3:or_rooftop', 's3:or_palace', 's3:or_hatshop'];
scene('or_teahouse', { sky: ['#ffe8c8', '#f4d8b0'], ground: '#a26d45', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 4; k++) { h.rrect(x, 40 + k * 260, 300, 220, 700, 6); h.fs(x, '#fff6e4', 7); x.strokeStyle = '#8a5a3a'; x.lineWidth = 5; for (let r = 1; r < 4; r++) { x.beginPath(); x.moveTo(40 + k * 260, 300 + r * 175); x.lineTo(260 + k * 260, 300 + r * 175); x.stroke(); } } } }], ['lanterns', { y: 240 }]] });
scene('or_moon', { sky: ['#2a1438', '#5a2a6a'], back: [['moon', { x: 540, y: 600, r: 300, col: '#ffe0f0' }], ['stars', { n: 50 }]] });
scene('or_bamboo', { sky: ['#d8f0c8', '#f0fff0'], ground: '#8ab060', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 9; k++) { const bx = 20 + k * 130; h.rrect(x, bx, -100, 40, 1400, 10); h.fs(x, k % 2 ? '#6ab84a' : '#4f9a3a', 6); for (let r = 0; r < 6; r++) { x.fillStyle = '#3a7a2a'; x.fillRect(bx, 100 + r * 220, 40, 8); } } } }]] });
scene('or_hall', { sky: ['#5a2a3a', '#3a1a2a'], ground: '#8a5a3a', back: [['columns', { n: 4, x0: 40, gap: 300, w: 60, col: '#c8303a' }], ['banners', { n: 4, y: 200, cols: ['#f4d030', '#b040c8'] }]] });
scene('or_swamp', { sky: ['#5a6a4a', '#8a9a6a'], ground: '#4a5a3a', back: [['fog', { n: 8, col: 'rgba(220,240,200,0.25)' }], ['trees', { n: 3, x0: 60, gap: 420, leaf: '#3a5a2a' }]] });
scene('or_courtyard', { sky: ['#ffd8a8', '#fff0dc'], ground: '#d8c0a0', back: [['custom', { fn: (x, h) => { h.rrect(x, -80, 820, 1240, 420, 6); h.fs(x, '#f4ead2', 8); x.beginPath(); x.moveTo(-100, 820); x.lineTo(540, 640); x.lineTo(1180, 820); x.closePath(); h.fs(x, '#3a3346', 9); } }], ['lanterns', { y: 300 }]] });
scene('or_cliffs', { sky: ['#8ab0d8', '#d8e8f8'], ground: '#7a8a6a', back: [['mountains', { gy: 1260, col: '#6a7a8a', hh: 700 }], ['clouds', { n: 3, y: 200, seed: 4 }]] });
scene('or_flames', { sky: ['#4a1010', '#a03a10'], ground: '#3a2020', back: [['custom', { fn: (x) => { for (let i = 0; i < 8; i++) { x.fillStyle = 'rgba(255,140,40,0.35)'; x.beginPath(); x.moveTo(i * 150 - 50, 1250); x.quadraticCurveTo(i * 150 + 20, 700 - (i % 3) * 120, i * 150 + 90, 1250); x.fill(); } } }]] });
scene('or_rain', { sky: ['#3a4a5a', '#6a7a8a'], ground: '#4a4a52', back: [['custom', { fn: (x) => { x.strokeStyle = 'rgba(200,220,255,0.35)'; x.lineWidth = 4; for (let i = 0; i < 80; i++) { const rx = (i * 137) % 1200 - 60, ry = (i * 251) % 1300; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 20, ry + 70); x.stroke(); } } }]] });
scene('or_rooftop', { sky: ['#1a1030', '#3a2050'], ground: '#2a2436', back: [['moon', { x: 820, y: 260, col: '#ffd0d0' }], ['houses', { cols: ['#3a3346', '#2a2436'], roof: '#14121a', win: '#ff8a5a', seed: 81 }]] });
scene('or_palace', { sky: ['#ffd890', '#fff0c8'], ground: '#c8a060', back: [['custom', { fn: (x, h) => { h.rrect(x, 140, 500, 800, 750, 10); h.fs(x, '#f4ead2', 10); for (let r = 0; r < 3; r++) { x.beginPath(); x.moveTo(80 + r * 60, 520 - r * 150); x.lineTo(540, 360 - r * 150); x.lineTo(1000 - r * 60, 520 - r * 150); x.closePath(); h.fs(x, '#3a3346', 9); } h.rrect(x, 440, 900, 200, 350, 10); h.fs(x, '#c8303a', 8); } }]] });
scene('or_hatshop', { sky: ['#f4e0f8', '#e0c8f0'], ground: '#a07850', back: [['shelves', { rows: 3, y: 260 }], ['sign', { text: 'HATS', bg: '#ffffff', y: 120 }]] });

// ---------------- serpent ----------------
const SC = '#5a2a6a', SCL = '#8a4a9a';
// one snake head on a neck from (bx, by) to (hx, hy); face points by `dir`
export function snakeHead(x, bx, by, hx, hy, s, t, o = {}) { const dir = o.dir ?? (hx > bx ? 1 : -1), bite = o.bite || 0;
  x.save(); x.lineCap = 'round'; const mx = (bx + hx) / 2 + Math.sin(t * 2 + hx) * 30 * s, my = (by + hy) / 2;
  for (const [lw, c] of [[110 * s, A.OL], [86 * s, SC]]) { x.beginPath(); x.moveTo(bx, by); x.quadraticCurveTo(mx - dir * 80 * s, my, hx, hy); x.lineWidth = lw; x.strokeStyle = c; x.stroke(); }
  x.translate(hx, hy); x.scale(dir * s, s); x.beginPath(); x.ellipse(30, 0, 95, 62, 0, 0, 7); A.fs(x, SC, 10);
  x.beginPath(); x.moveTo(40, 10 + bite * 10); x.lineTo(140, 20 + bite * 40); x.lineTo(40, 40); x.closePath(); x.fillStyle = '#c8303a'; if (bite) x.fill();
  x.beginPath(); x.ellipse(40, -26, 22, 16, 0, 0, 7); A.fs(x, '#f4d030', 6); x.fillStyle = A.OL; x.fillRect(36, -40, 8, 28);
  for (const sx of [-30, 0]) { x.beginPath(); x.moveTo(sx, -50); x.lineTo(sx + 10, -86); x.lineTo(sx + 26, -54); A.fs(x, SCL, 5); }
  if (o.hat) { A.rrect(x, -10, -120, 90, 60, 10); A.fs(x, o.hat, 6); A.rrect(x, -30, -70, 130, 18, 8); A.fs(x, o.hat, 5); }
  x.restore(); }
// the full eight-headed serpent; heads = how many remain (0..8)
export function orochiBeast(x, cx, by, s, t, o = {}) { const n = o.heads ?? 8;
  x.beginPath(); x.ellipse(cx, by, 300 * s, 160 * s, 0, 0, 7); A.fs(x, SC, 12 * s);
  for (let i = 0; i < 8; i++) { const a = -Math.PI * (0.1 + 0.8 * i / 7), hx = cx + Math.cos(a) * 520 * s, hy = by - 80 * s + Math.sin(a) * 620 * s + Math.sin(t * 3 + i) * 20 * s;
    if (i < n) snakeHead(x, cx + Math.cos(a) * 150 * s, by - 60 * s, hx, hy, s * 0.8, t + i, { dir: hx > cx ? 1 : -1, bite: o.bite && i === o.bite - 1 ? 1 : 0, hat: o.hats ? ['#e8402e', '#f4d030', '#3f9bff', '#5cc45a', '#ff8cc0', '#b040c8', '#ffffff', '#f08a2a'][i] : null });
    else { x.beginPath(); x.arc(cx + Math.cos(a) * 200 * s, by - 80 * s + Math.sin(a) * 200 * s, 30 * s, 0, 7); A.fs(x, '#c8303a', 6); } } }
function kaidoShadow(x, cx, fy, s, k) { x.save(); x.translate(cx, fy); x.scale(s, s); x.fillStyle = '#14121a'; x.beginPath(); x.moveTo(-260, 0); x.lineTo(-220, -700); x.quadraticCurveTo(0, -900, 220, -700); x.lineTo(260, 0); x.closePath(); x.fill(); x.beginPath(); x.arc(0, -920, 150, 0, 7); x.fill();
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 60, -1030); x.quadraticCurveTo(sd * 200, -1150, sd * 260, -1300); x.quadraticCurveTo(sd * 140, -1100, sd * 30, -1000); x.fill(); }
  x.fillStyle = '#ff3a3a'; for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(sd * 55, -930, 26, 10, 0, 0, 7); x.fill(); }
  x.rotate(lerp(-1.2, 1.0, k)); A.rrect(x, -20, -1400, 40, 900, 12); A.fs(x, '#6a6a7a', 0); x.restore(); }
export function orochiIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) orochiBeast(x, 0, 120, 0.3, t);
  else if (k === 2) snakeHead(x, -100, 140, 40, -40, 0.9, t, { bite: 1 });
  else if (k === 3) orochiBeast(x, 0, 120, 0.3, t, { heads: 6 });
  else { A.glow(x, 0, 0, 200, '200,120,255', 0.6); A.heart(x, 0, 0, 80, '#c8303a'); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a big magenta fruit with drooping green leaves', biteDesc: 'snake-scale shimmer creeps up the host\'s arm', biteSfx: 'shimmer', bannerCol: 'pink', biteCol: '#c8287a',
    calmBg: 's3:or_teahouse', calmDesc: 'old Wano tea house', seaHue: 'coral', seed: 65, nameRe: /^Snake-Snake/,
    revealBg: 's3:or_moon', revealDesc: 'huge pink moon', revealBanner: 'SNAKE-SNAKE FRUIT', haloRgb: '220,120,200' });
  const tTurns = W('type', /^turns/) - 0.1, tSnake = W('type', /^snake/) - 0.1;
  add({ name: 'Zoan (bamboo grove): eight snake heads burst up out of the host\'s shadow one by one', t0: tTurns, t1: tSnake, bg: 's3:or_bamboo',
    cam: [[1.0, 540, 1000, 0.02], [1.06, 540, 980, 0.03]], sfx: [[0.1, 'whoosh'], [0.5, 'pop']],
    draw(x, S) { const k = prog(S.t, 0.05, 0.9); person(x, S, 'host', 'shock', 540, 1800, 0.6, { seed: 2, pose: 'shrug' }); for (let i = 0; i < Math.floor(k * 8); i++) { const hx = 120 + i * 120; snakeHead(x, 540, 1850, hx, 1150 - (i % 2) * 140, 0.5, S.T + i, { dir: hx > 540 ? 1 : -1 }); } } });
  stage(T, { desc: 'red lacquer hall', bg: 's3:or_hall', t0: tSnake, t1: end('type'), times: [W('type', /^snake/), W('type', /^snake/) + 0.2, W('type', /^snake/) + 0.4, W('type', /^snake/) + 0.6],
    labels: ['8 HEADS', 'BITE', 'LOSE ONE', 'SURVIVE'], bar: 'SERPENT POWERS', haloRgb: '220,120,200', icon: orochiIcon });

  const tEight = W('power1', /^eight/) - 0.1;
  addSplit({ name: 'Power 1 (misty swamp): the host swells into a huge dragon-like serpent body rising out of the swamp; purple SERPENT banner', t0: st('power1'), t1: end('power1'), bg: 's3:or_swamp',
    cam: [[1.05, 540, 1000, -0.02], [1.0, 540, 960, -0.01]], banners: [['GIANT SERPENT', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'rumble']],
    draw(x, S) { const k = ease.outCubic(prog(S.T, W('power1', /^turn/), tEight)); orochiBeast(x, 540, 1500, lerp(0.3, 0.8, k), S.T, { heads: 1 + Math.floor(k * 2) }); } },
    tEight, [[0.95, 540, 950, 0.02], [1.0, 540, 930, 0.035]], 'Power 1 eight heads (same swamp): all eight heads fan out and hiss together, shake');
  const p1 = T.shots[T.shots.length - 1]; p1.draw = function (x, S) { orochiBeast(x, 540, 1500, 0.8, S.T); if (S.T < tEight + 0.25) S.shake = 0.5; };

  add({ name: 'Power 2 evolve (castle courtyard): heads icon becomes the bite icon; two heads snap at two ninjas at once on their own; red BITE banner', t0: st('power2'), t1: end('power2'), bg: 's3:or_courtyard',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['EVERY HEAD FIGHTS', 'red', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^bite/) - st('power2'), 'snap'], [W('power2', /^attack/) - st('power2'), 'snap']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, orochiIcon)) return; const b1 = S.T > W('power2', /^bite/), b2 = S.T > W('power2', /^attack/);
      const n1 = person(x, S, 'ninja', b1 ? 'hit' : 'worried', 220, 1800, 0.5, { seed: 3, pose: 'shrug' }); const n2 = person(x, S, 'ninja', b2 ? 'hit' : 'worried', 860, 1800, 0.5, { seed: 4, pose: 'shrug', flip: true });
      snakeHead(x, 540, 1950, b1 ? 380 : 470, 1150, 1.0, S.T, { dir: -1, bite: b1 ? 1 : 0 }); snakeHead(x, 540, 1950, b2 ? 700 : 610, 1080, 1.0, S.T + 2, { dir: 1, bite: b2 ? 1 : 0 }); } });

  const tKeep = W('power3', /^keep/) - 0.1;
  addSplit({ name: 'Power 3 evolve (windy cliffs): bite icon becomes the lost-head icon; a samurai slash takes off one head; purple LOSE A HEAD banner', t0: st('power3'), t1: end('power3'), bg: 's3:or_cliffs',
    cam: [[1.0, 540, 980, 0], [1.05, 560, 960, 0.02]], banners: [['LOSE A HEAD?', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^lose/) - st('power3'), 'slash']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, orochiIcon)) return; const tl = W('power3', /^lose/); orochiBeast(x, 540, 1550, 0.7, S.T, { heads: S.T > tl ? 7 : 8 }); if (S.T > tl) { A.impactStar(x, 200, 1000, 120 * pop(S.T, tl), S.T); if (S.T < tl + 7 * F) S.shake = 0.5; } } },
    tKeep, [[1.0, 540, 980, -0.02], [1.05, 540, 960, -0.035]], 'Power 3 keep going (same cliffs): the seven other heads shrug it off and keep hissing');
  const p3 = T.shots[T.shots.length - 1]; p3.draw = function (x, S) { orochiBeast(x, 540, 1550, 0.7, S.T, { heads: 7 }); A.mark(x, '?', 860, 760, pop(S.T, S.t0 + 0.2)); };

  const tKill = W('peak', /^kill/) - 0.1;
  addSplit({ name: 'Peak (burning castle): lost-head icon gives way to the heart icon, purple halo; gold SURVIVOR banner; flames rage but the serpent stays standing', t0: st('peak'), t1: end('peak'), bg: 's3:or_flames',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['THE SURVIVOR', 'gold', W('peak', /^surviving/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^surviving/) - st('peak'), 'fireloop']],
    draw(x, S) { halo(x, 540, 900, 620, '200,120,255', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, orochiIcon); return; }
      orochiBeast(x, 540, 1550, 0.7, S.T); for (let i = 0; i < 5; i++) A.flame(x, 120 + i * 210, 1700, 140, 300, S.T, i); } },
    tKill, [[1.05, 540, 1000, -0.02], [1.1, 540, 990, -0.035]], 'Peak still alive (same flames): Orochi in his crown grins through the smoke, unhurt');
  const pk = T.shots[T.shots.length - 1]; pk.draw = function (x, S) { for (let i = 0; i < 5; i++) A.flame(x, 120 + i * 210, 1800, 120, 260, S.T, i, 0.7); person(x, S, 'orochi', 'grin', 540, 1820, 0.8, { seed: 7, pose: 'cheer' }); };

  add({ name: 'Twist (rainy street): push-in with roll, low sting; red SHOCKING PART banner', t0: st('twist'), t1: end('twist'), bg: 's3:or_rain', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['SHOCKING PART', 'red', W('twist', /^shocking/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  const tSurv = W('truth', /^survived/) - 0.1;
  add({ name: 'Kaido\'s strike (night rooftop): a horned shadow giant swings his club; Orochi\'s head goes flying; red OFF WITH HIS HEAD banner', t0: st('truth'), t1: tSurv, bg: 's3:or_rooftop',
    cam: [[1.05, 540, 1000, -0.02], [1.12, 560, 990, -0.04]], banners: [['KAIDO STRIKES', 'red', st('truth') + 0.2, tSurv]], sfx: [[W('truth', /^cut/) - st('truth'), 'slash']],
    draw(x, S) { const tc = W('truth', /^cut/), k = prog(S.T, tc - 0.3, tc); kaidoShadow(x, 280, 1900, 0.7, k); person(x, S, 'orochi', 'shock', 780, 1820, 0.6, { seed: 7, pose: 'shrug', flip: true }); if (S.T > tc) { A.impactStar(x, 780, 1080, 180 * pop(S.T, tc), S.T); if (S.T < tc + 7 * F) S.shake = 0.6; } } });
  add({ name: 'Survived (same rooftop): a little snake head pops out of a jar in the dark; Orochi\'s head on it, grinning; gold EXTRA HEADS banner', t0: tSurv, t1: end('truth'), bg: 's3:or_rooftop',
    cam: [[1.1, 540, 1050, 0.02], [1.18, 540, 1040, 0]], banners: [['EXTRA HEADS = ALIVE', 'gold', tSurv + 0.2, end('truth')]], sfx: [[0.2, 'pop'], [0.5, 'shimmer']],
    draw(x, S) { const k = ease.outBack(prog(S.T, tSurv + 0.1, tSurv + 0.6)); snakeHead(x, 540, 1700, 540 + 40 * k, 1700 - 400 * k, 0.8, S.T, { dir: 1 }); A.rrect(x, 400, 1500, 280, 300, 40); A.fs(x, '#8a6a4a', 10); A.mark(x, '!', 760, 1100, pop(S.T, tSurv + 0.6)); } });

  const tCruel = W('users', /^cruel/) - 0.1;
  add({ name: 'Orochi (golden palace): Kurozumi Orochi, gold crown, purple tufts, yellow kimono and black cloak; purple KUROZUMI OROCHI banner', t0: st('users'), t1: tCruel, bg: 's3:or_palace',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['KUROZUMI OROCHI', 'pink', st('users') + 0.2, tCruel + 0.2]], sfx: [[0, 'whoosh']],
    draw(x, S) { person(x, S, 'orochi', 'grin', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); } });
  add({ name: 'Cruel shogun (same palace): Orochi laughs on his throne with eight snake heads coiled behind him; red CRUEL SHOGUN banner', t0: tCruel, t1: end('users'), bg: 's3:or_palace',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['CRUEL SHOGUN OF WANO', 'red', tCruel + 0.1, end('users')]], sfx: [[0.2, 'drums']],
    draw(x, S) { orochiBeast(x, 540, 1300, 0.55, S.T); A.rrect(x, 330, 1450, 420, 300, 20); A.fs(x, '#c8303a', 10); person(x, S, 'orochi', 'smug', 540, 1820, 0.62, { seed: 8, pose: 'cheer' }); } });

  add({ name: 'Joke (hat shop): eight snake heads each try on a different coloured hat while the host holds the bill; gold 8 HATS banner', t0: st('joke'), t1: end('joke'), bg: 's3:or_hatshop',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['EIGHT HATS', 'gold', W('joke', /^eight/) - 0.1, end('joke')]], sfx: [[W('joke', /^eight/) - st('joke'), 'pops'], [W('joke', /^hats/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { orochiBeast(x, 540, 1600, 0.6, S.T, { hats: S.T > W('joke', /^eight/) }); } });

  ending(T, { TL, fruit });
  return finish();
}
