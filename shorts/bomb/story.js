// Shot plan for the Bomu Bomu no Mi (Bomb-Bomb Fruit) short. Structure: explosive touch, explosive breath, flicked bombs, immune to explosions as the peak.
import * as A from '/engine/art.js';
import { drawBomu } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawBomu(x, cx, cy, R * 0.9, rot, o);

export const SETS = ['s3:bo_mine', 'rays:amber', 's3:bo_fireworks', 's3:bo_quarry', 's3:bo_stage', 's3:bo_saloon', 's3:bo_desert', 's3:bo_range', 's3:bo_crater', 's3:bo_bunker', 's3:bo_whisky', 's3:bo_cactus', 's3:bo_party'];
scene('bo_mine', { sky: ['#4a3a30', '#2a1e18'], ground: '#5a4030', back: [['custom', { fn: (x, h) => { for (let k = 0; k < 4; k++) { h.rrect(x, 40 + k * 280, 200, 50, 1050, 6); h.fs(x, '#8a5a3c', 7); } h.rrect(x, -h.OX, 200, h.BW, 50, 4); h.fs(x, '#8a5a3c', 7); } }], ['lanterns', { y: 300, col: '#ffcf3a' }]] });
scene('bo_fireworks', { sky: ['#140c30', '#2a1a50'], back: [['stars', { n: 40 }], ['custom', { fn: (x) => { for (const [cx, cy, col] of [[240, 400, '#ff5a8a'], [820, 300, '#ffcf3a'], [560, 700, '#5affe0']]) { x.strokeStyle = col; x.lineWidth = 8; x.lineCap = 'round'; for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; x.beginPath(); x.moveTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40); x.lineTo(cx + Math.cos(a) * 150, cy + Math.sin(a) * 150); x.stroke(); } } } }]] });
scene('bo_quarry', { sky: ['#ffcf9a', '#ffe8c8'], ground: '#c8a078', back: [['mountains', { gy: 1240, col: '#b88a68', hh: 600 }]] });
scene('bo_stage', { sky: ['#3a1a14', '#1f0e0a'], ground: '#5a2a1e', gy: 1250, back: [['custom', { fn: (x) => { x.fillStyle = 'rgba(255,140,40,0.25)'; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(100 + i * 180, 200 + (i % 2) * 120, 110, 0, 7); x.fill(); } } }]] });
scene('bo_saloon', { sky: ['#a26d45', '#7a4a2a'], ground: '#5a3a26', back: [['stripes', { a: '#8a5a3c', b: '#a26d45', w: 80, to: 1300 }], ['shelves', { rows: 2, y: 220, wood: '#5a3a26', cols: ['#7a3a2a', '#c8a050', '#3a6a3a'] }]] });
scene('bo_desert', { sky: ['#ff9a5a', '#ffd8a0'], ground: '#e8c070', gy: 1150, back: [['sun', { x: 540, y: 900, r: 120 }], ['mountains', { gy: 1150, col: '#c8805a', hh: 380 }]] });
scene('bo_range', { sky: ['#9ed8ff', '#e8f6ff'], ground: '#8fcf6a', back: [['custom', { fn: (x, h) => { for (const tx of [200, 540, 880]) { for (let r = 4; r > 0; r--) { x.beginPath(); x.arc(tx, 900, r * 30, 0, 7); h.fs(x, r % 2 ? '#e8402e' : '#ffffff', 5); } } } }]] });
scene('bo_crater', { sky: ['#a8a0a0', '#d8d0c8'], ground: '#7a6a5a', back: [['fog', { col: 'rgba(90,80,70,0.35)' }]], front: [['custom', { fn: (x, h) => { x.beginPath(); x.ellipse(540, 1400, 460, 110, 0, 0, 7); h.fs(x, '#4a3a30', 9); } }]] });
scene('bo_bunker', { sky: ['#5a6a5a', '#3a4a3a'], ground: '#4a4a3a', back: [['bricks', { col: 'rgba(20,30,20,0.4)' }], ['sign', { text: 'DANGER', bg: '#ffcf3a', col: '#1b1530', y: 300 }]] });
scene('bo_whisky', { sky: ['#ffb07a', '#ffe0c0'], ground: '#c8a070', back: [['houses', { cols: ['#c97a5a', '#d8a070', '#b86a4a'], roof: '#6b4630', seed: 41, gy: 1240 }], ['custom', { fn: (x, h) => { x.beginPath(); x.arc(540, 500, 160, Math.PI, 0); h.fs(x, '#c97a5a', 9); } }]] });
scene('bo_cactus', { sky: ['#7fd0ff', '#ffe9b8'], ground: '#f2c27a', gy: 1180, back: [['sun', { x: 820, y: 260 }], ['custom', { fn: (x, h) => { for (const cx of [140, 940]) { h.rrect(x, cx - 40, 700, 80, 500, 40); h.fs(x, '#4fae5a', 8); } } }]] });
scene('bo_party', { sky: ['#ffd0e8', '#ffb8d8'], ground: '#c99b6d', back: [['confetti', {}], ['custom', { fn: (x, h) => { for (const [bx, by, col] of [[90, 600, '#ff5a7a'], [960, 560, '#3f9bff']]) { x.beginPath(); x.ellipse(bx, by, 70, 90, 0, 0, 7); h.fs(x, col, 8); } } }]] });

// ---------------- bomb effects ----------------
export function boom(x, cx, cy, r, k) { if (k <= 0 || k >= 1) return; const rr = r * ease.outCubic(k);
  x.save(); x.globalAlpha = 1 - k * 0.7; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283; x.beginPath(); x.arc(cx + Math.cos(a) * rr * 0.6, cy + Math.sin(a) * rr * 0.5, rr * 0.45, 0, 7); x.fillStyle = i % 2 ? '#ff8a2e' : '#ffcf3a'; x.fill(); }
  x.beginPath(); x.arc(cx, cy, rr * 0.5, 0, 7); x.fillStyle = '#fff4c0'; x.fill(); x.restore();
  x.save(); x.globalAlpha = k * 0.7; for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; x.beginPath(); x.arc(cx + Math.cos(a) * rr * 0.9, cy + Math.sin(a) * rr * 0.7 - k * 60, rr * 0.35, 0, 7); x.fillStyle = '#5a5050'; x.fill(); } x.restore(); }
function booger(x, x0, y0, x1, y1, k) { if (k <= 0 || k >= 1) return; x.beginPath(); x.arc(lerp(x0, x1, k), lerp(y0, y1, k) - Math.sin(k * Math.PI) * 120, 18, 0, 7); A.fs(x, '#9ad84a', 5); }
export function bombIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { A.openHand(x, -20, 20, 0.55); boom(x, 60, -20, 90, (t * 0.7) % 1); }
  else if (k === 2) { for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(-60 + i * 50, 0, 26 + i * 8, 0, 7); x.fillStyle = 'rgba(255,255,255,0.7)'; x.fill(); } boom(x, 80, 0, 80, (t * 0.7 + 0.3) % 1); }
  else if (k === 3) { booger(x, -100, 40, 100, 0, (t * 0.8) % 1); boom(x, 100, 0, 70, ((t * 0.8) % 1) > 0.9 ? 0.3 : 0); }
  else { A.glow(x, 0, 0, 180, '255,200,90', 0.6); boom(x, 0, 0, 150, 0.4); x.beginPath(); x.arc(0, 0, 40, 0, 7); A.fs(x, '#f6c690', 6); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a navy bomb-shaped fruit with a rope fuse', biteDesc: 'a little puff of smoke pops out of his ears', biteSfx: 'impact', bannerCol: 'red', biteCol: '#e8e0f0',
    biteFx(x, S, k) { boom(x, 260, 640, 120, k); boom(x, 820, 640, 120, k); },
    calmBg: 's3:bo_mine', calmDesc: 'mine tunnel', seaHue: 'amber', seed: 69, nameRe: /^Bomb-Bomb/,
    revealBg: 's3:bo_fireworks', revealDesc: 'night fireworks', revealBanner: 'BOMB-BOMB FRUIT', haloRgb: '255,170,90' });
  const tThat = W('type', /^that/) - 0.1, tBomb = W('type', /^whole/) - 0.1;
  add({ name: 'Bomb body (rocky quarry): the host claps and a fireball bursts between his hands; he\'s fine', t0: tThat, t1: tBomb, bg: 's3:bo_quarry',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.3, 'impact']],
    draw(x, S) { person(x, S, 'host', 'grin', 540, 1780, 0.7, { seed: 2, pose: 'cheer' }); boom(x, 540, 900, 300, prog(S.t, 0.3, 1.3)); if (S.t > 0.3 && S.t < 0.3 + 7 * F) S.shake = 0.8; } });
  stage(T, { desc: 'smoky stage', bg: 's3:bo_stage', t0: tBomb, t1: end('type'), times: [W('type', /^whole/), W('type', /^body/), W('type', /^into/), W('type', /^bomb/)],
    labels: ['TOUCH', 'BREATH', 'FLICK', 'IMMUNE'], bar: 'BOMB TRICKS', haloRgb: '255,170,90', icon: bombIcon });

  const tTouch = W('power1', /^touch/) - 0.1;
  addSplit({ name: 'Power 1 (old saloon): the host taps the cowboy\'s hat with one finger and it explodes; red TOUCH banner', t0: st('power1'), t1: end('power1'), bg: 's3:bo_saloon',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['EXPLODING TOUCH', 'red', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[tTouch - st('power1') + 0.2, 'impact']],
    draw(x, S) { const hit = S.T > tTouch + 0.2; const e = person(x, S, 'cowboy', hit ? 'hit' : 'smug', 760, 1780, 0.64, { seed: 3, pose: 'idle', flip: true, rot: hit ? 0.15 : 0 }); person(x, S, 'host', 'smug', 400, 1780, 0.66, { seed: 2, pose: 'punch' });
      boom(x, e.head[0], e.head[1] - 120, 220, prog(S.T, tTouch + 0.2, tTouch + 1.2)); if (hit && S.T < tTouch + 0.2 + 7 * F) S.shake = 0.9; } },
    tTouch + 0.7, [[1.3, 720, 1100, 0.02], [1.38, 740, 1090, 0.035]], 'Power 1 after (same saloon): the cowboy\'s hat is a smoking ring, his face sooty, ?');
  const p1 = T.shots[T.shots.length - 1]; p1.draw = function (x, S) { const e = person(x, S, 'cowboy', 'shock', 760, 1780, 0.64, { seed: 3, pose: 'shrug', flip: true }); x.fillStyle = 'rgba(40,30,30,0.5)'; x.beginPath(); x.arc(e.head[0], e.head[1], 120, 0, 7); x.fill(); A.mark(x, '?', e.head[0] + 120, e.head[1] - 200, pop(S.T, S.t0 + 0.2), 0.2); };

  const tBreath = W('power2', /^breath/) - 0.1;
  add({ name: 'Power 2 evolve (desert sunset): touch icon becomes the breath icon; the host breathes out a puff that blows up on the cowboy; gold BREATH BOMB banner', t0: st('power2'), t1: end('power2'), bg: 's3:bo_desert',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['BREATH BOMB', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [tBreath - st('power2'), 'whoosh'], [tBreath - st('power2') + 0.5, 'impact']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, bombIcon)) return; const h = person(x, S, 'host', 'shout', 300, 1780, 0.66, { seed: 2, pose: 'idle', pop: S.t0 + 0.45 }); const e = person(x, S, 'cowboy', S.T > tBreath + 0.5 ? 'hit' : 'calm', 800, 1780, 0.62, { seed: 3, pose: 'shrug', flip: true, pop: S.t0 + 0.45 });
      const u = prog(S.T, tBreath, tBreath + 0.5); if (u > 0 && u < 1) { x.beginPath(); x.arc(lerp(h.head[0] + 100, e.head[0], u), h.head[1] + 100, 30 + u * 20, 0, 7); x.fillStyle = 'rgba(255,255,255,0.7)'; x.fill(); }
      boom(x, e.head[0], e.head[1] + 50, 260, prog(S.T, tBreath + 0.5, tBreath + 1.5)); if (S.T > tBreath + 0.5 && S.T < tBreath + 0.5 + 7 * F) S.shake = 0.9; } });

  const tFar = W('power3', /^far/) - 0.1;
  add({ name: 'Power 3 evolve (target range): breath icon becomes the flick icon; the host flicks a tiny green bomb from his nose across the range; it hits the bullseye and explodes; green FLICK banner', t0: st('power3'), t1: end('power3'), bg: 's3:bo_range',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['FLICK BOMB', 'green', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^flick/) - st('power3'), 'boing'], [tFar - st('power3') + 0.3, 'impact']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, bombIcon)) return; const h = person(x, S, 'host', 'smug', 260, 1780, 0.66, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 }); const tf = W('power3', /^flick/);
      booger(x, h.hand.R[0], h.hand.R[1], 880, 900, prog(S.T, tf, tFar + 0.3)); boom(x, 880, 900, 200, prog(S.T, tFar + 0.3, tFar + 1.3)); } });

  const tOwn = W('peak', /^own/) - 0.1;
  addSplit({ name: 'Peak (bomb crater): flick icon gives way to the immune icon, gold halo; gold IMMUNE banner; a huge explosion goes off right on the host and when the smoke clears he\'s standing there, unhurt', t0: st('peak'), t1: end('peak'), bg: 's3:bo_crater',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['EXPLOSION-PROOF', 'gold', st('peak') + 0.4, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^explosions/) - st('peak'), 'impact'], [tOwn - st('peak'), 'ding']],
    draw(x, S) { halo(x, 540, 900, 620, '255,215,90', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, bombIcon); return; }
      const te = W('peak', /^explosions/); person(x, S, 'host', S.T > te + 0.8 ? 'smug' : 'calm', 540, 1780, 0.72, { seed: 7, pose: 'shrug' }); boom(x, 540, 1300, 520, prog(S.T, te, te + 1.2)); if (S.T > te && S.T < te + 7 * F) S.shake = 1.2;
      if (S.T > te + 0.8) A.shineLines(x, 540, 1100, 300, 460, S.T, 12); } },
    tOwn, [[1.25, 540, 1100, -0.02], [1.32, 540, 1090, -0.035]], 'Peak close (same crater): he dusts off his shoulder, not even a scratch');

  add({ name: 'Twist (danger bunker): a single booger-bomb sits on a desk under a DANGER sign; push-in with roll, low sting; red GROSS banner', t0: st('twist'), t1: end('twist'), bg: 's3:bo_bunker', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['GROSS SECRET', 'red', W('twist', /^gross/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { x.beginPath(); x.arc(540, 1150, 40, 0, 7); A.fs(x, '#9ad84a', 8); A.mark(x, '!?', 760, 900, pop(S.T, S.t0 + 0.4)); } });
  add({ name: 'Nose Fancy Cannon (same bunker, wide): Mr. 5 picks his nose and flicks — boom; green NOSE FANCY CANNON banner', t0: st('truth'), t1: end('truth'), bg: 's3:bo_bunker',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['NOSE FANCY CANNON', 'green', W('truth', /^Nose/) - 0.1, end('truth')]], sfx: [[W('truth', /^Nose/) - st('truth'), 'boing'], [W('truth', /^boogers/) - st('truth'), 'impact']],
    draw(x, S) { const m = person(x, S, 'mr5', 'smug', 320, 1800, 0.7, { seed: 8, pose: 'punch' }); const tb = W('truth', /^Nose/); booger(x, m.hand.R[0], m.hand.R[1], 900, 1200, prog(S.T, tb, W('truth', /^boogers/))); boom(x, 900, 1200, 240, prog(S.T, W('truth', /^boogers/), W('truth', /^boogers/) + 1)); } });

  const tLuffy = W('users', /^until/) - 0.1;
  add({ name: 'Mr. 5 (Whisky Peak town): Mr. 5 in his long brown coat with the 5 patches, hands in pockets; red BAROQUE WORKS banner', t0: st('users'), t1: tLuffy, bg: 's3:bo_whisky',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['MR. 5', 'red', st('users') + 0.2, tLuffy]], sfx: [[0, 'whoosh']],
    draw(x, S) { person(x, S, 'mr5', 'smug', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); } });
  add({ name: 'Beaten (cactus street): Luffy\'s punch sends Mr. 5 flying; impact star; gold KO banner', t0: tLuffy, t1: end('users'), bg: 's3:bo_cactus',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['KO!', 'gold', tLuffy + 0.3, end('users')]], sfx: [[0.2, 'impact']],
    draw(x, S) { const u = ease.outCubic(prog(S.t, 0.2, 1.0)); person(x, S, 'luffy', 'shout', 280, 1820, 0.66, { seed: 4, pose: 'punch' }); person(x, S, 'mr5', 'hit', lerp(700, 1050, u), 1820 - Math.sin(u * Math.PI) * 300, 0.6, { seed: 8, pose: 'cheer', rot: u * 3 }); if (S.t > 0.2 && S.t < 0.5) A.impactStar(x, 640, 1300, 160, 0.3); } });

  add({ name: 'Joke (party room): friends pass a hot potato; it reaches the host and blows up in his hands; he stands there sooty; red NO HOT POTATO banner', t0: st('joke'), t1: end('joke'), bg: 's3:bo_party',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['GAME OVER', 'red', W('joke', /^potato/) - 0.1, end('joke')]], sfx: [[0.5, 'impact'], [W('joke', /^potato/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', S.t > 0.6 ? 'shock' : 'grin', 540, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); if (S.t < 0.6) { x.beginPath(); x.ellipse(h.hand.R[0], h.hand.R[1] - 40, 50, 36, 0.3, 0, 7); A.fs(x, '#c99556', 7); } boom(x, h.hand.R[0], h.hand.R[1] - 40, 200, prog(S.t, 0.6, 1.6)); if (S.t > 0.6 && S.t < 0.6 + 7 * F) S.shake = 0.7; } });

  ending(T, { TL, fruit });
  return finish();
}
