// Shot plan for the Baku Baku no Mi (Munch-Munch Fruit) short. Structure: eat anything, become what you eat, fuse the crew, Munch-Munch Factory as the peak.
import * as A from '/engine/art.js';
import { drawBaku } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawBaku(x, cx, cy, R * 0.95, rot, o);

export const SETS = ['s3:mu_diner', 'rays:indigo', 's3:mu_snow', 's3:mu_castle', 's3:mu_stage', 's3:mu_scrap', 's3:mu_armory', 's3:mu_barracks', 's3:mu_village', 's3:mu_cliff', 's3:mu_throne', 's3:mu_sky', 's3:mu_sink'];
scene('mu_diner', { sky: ['#ffe0c0', '#ffc898'], ground: '#c84a3a', back: [['stripes', { a: '#ffffff', b: '#e8402e', w: 90, to: 320 }], ['windows', { n: 3, y: 420, col: '#a8e0ff' }]] });
scene('mu_snow', { sky: ['#a8c8f0', '#e8f4ff'], ground: '#f4f8ff', gy: 1150, back: [['mountains', { gy: 1150, col: '#d8e4f8', hh: 600 }], ['spots', { col: 'rgba(255,255,255,0.9)', n: 60, r: 8, h: 1800 }]] });
scene('mu_castle', { sky: ['#8ab0e8', '#d8e8ff'], ground: '#e8f0ff', gy: 1180, back: [['custom', { fn: (x, h) => { x.beginPath(); x.rect(200, 400, 680, 780); h.fs(x, '#c8d0e0', 10); for (const tx of [200, 760]) { x.beginPath(); x.rect(tx, 250, 120, 930); h.fs(x, '#b8c0d0', 9); x.beginPath(); x.moveTo(tx - 20, 260); x.lineTo(tx + 60, 120); x.lineTo(tx + 140, 260); x.closePath(); h.fs(x, '#6a5ab5', 9); } } }], ['spots', { col: 'rgba(255,255,255,0.9)', n: 40, r: 7, h: 1800 }]] });
scene('mu_stage', { sky: ['#2a1a4a', '#140c28'], ground: '#4a2a6a', gy: 1250, back: [['banners', { n: 4, y: 200, cols: ['#7a3aa8', '#5cc45a', '#7a3aa8', '#5cc45a'] }]] });
scene('mu_scrap', { sky: ['#ffcf9a', '#ffe8c8'], ground: '#8a7a6a', back: [['crates', { list: [[40, 1060, 180], [200, 1000, 240], [760, 1040, 200], [900, 1100, 140]], col: '#8a8fa0' }]] });
scene('mu_armory', { sky: ['#5a4a40', '#3a2e28'], ground: '#3a2a20', back: [['bricks', {}], ['custom', { fn: (x, h) => { for (let k = 0; k < 4; k++) { h.rrect(x, 100 + k * 240, 500, 60, 400, 20); h.fs(x, '#3a3346', 7); x.beginPath(); x.arc(130 + k * 240, 920, 70, 0, 7); h.fs(x, '#5a5a6a', 8); } } }]] });
scene('mu_barracks', { sky: ['#d8d0c0', '#b8b0a0'], ground: '#8a6a4a', back: [['banners', { n: 4, y: 300, cols: ['#c0392b', '#ffcf3a'] }], ['columns', { n: 4, x0: 40, gap: 300, w: 60, col: '#a89878' }]] });
scene('mu_village', { sky: ['#c8e0ff', '#f0f8ff'], ground: '#f4f8ff', gy: 1220, back: [['houses', { cols: ['#c8a878', '#b89868', '#d8b888'], roof: '#ffffff', seed: 31 }], ['spots', { col: 'rgba(255,255,255,0.9)', n: 40, r: 7, h: 1800 }]] });
scene('mu_cliff', { sky: ['#8ab8e8', '#d8ecff'], ground: '#e8f0ff', gy: 1180, back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(-h.OX, 1180); x.lineTo(700, 1180); x.lineTo(760, 1300); x.lineTo(-h.OX, 1300); h.fs(x, '#c8d0e0', 8); } }], ['clouds', { n: 4, y: 600, h: 500 }]] });
scene('mu_throne', { sky: ['#4a2a6a', '#2a1440'], ground: '#5a2a3a', back: [['custom', { fn: (x, h) => { x.beginPath(); x.moveTo(380, 1280); x.lineTo(380, 520); x.quadraticCurveTo(540, 380, 700, 520); x.lineTo(700, 1280); x.closePath(); h.fs(x, '#ffcf3a', 11); x.fillStyle = '#7a3aa8'; x.fillRect(420, 600, 240, 600); } }]] });
scene('mu_sky', { sky: ['#5ab0ff', '#c8e8ff'], back: [['clouds', { n: 6, y: 900, h: 700, s: 1.1 }], ['sun', { x: 200, y: 300 }]] });
scene('mu_sink', { sky: ['#f4f8f8', '#dceaf0'], ground: '#b8c8d0', back: [['tiles', { col: 'rgba(100,150,170,0.3)' }], ['custom', { fn: (x, h) => { h.rrect(x, -60, 1040, 1200, 200, 0); h.fs(x, '#e8e4dc', 10); for (let i = 0; i < 6; i++) { h.rrect(x, 120 + (i % 3) * 30, 900 - i * 40, 220, 30, 12); h.fs(x, '#ffffff', 6); } } }]] });

// ---------------- munch effects ----------------
function bigMouth(x, cx, cy, s, open, t) { // a huge chomping mouth with a metal jaw
  x.save(); x.translate(cx, cy); x.scale(s, s); const o = 40 + open * 260;
  A.rrect(x, -260, -o / 2 - 60, 520, 120, 30); A.fs(x, '#a8b0c0', 10); A.rrect(x, -260, o / 2 - 60, 520, 120, 30); A.fs(x, '#a8b0c0', 10);
  x.beginPath(); x.rect(-240, -o / 2 + 50, 480, o - 100); x.fillStyle = '#5a1f2a'; x.fill();
  x.fillStyle = '#ffffff'; for (let i = 0; i < 7; i++) { x.beginPath(); x.moveTo(-220 + i * 70, -o / 2 + 50); x.lineTo(-190 + i * 70, -o / 2 + 100); x.lineTo(-160 + i * 70, -o / 2 + 50); x.fill(); x.beginPath(); x.moveTo(-220 + i * 70, o / 2 - 50); x.lineTo(-190 + i * 70, o / 2 - 100); x.lineTo(-160 + i * 70, o / 2 - 50); x.fill(); }
  x.restore();
}
function cannonArm(x, cx, cy, s, rot, firing, t) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); A.rrect(x, -20, -50, 300, 100, 30); A.fs(x, '#3a3346', 10); A.rrect(x, 260, -66, 50, 132, 14); A.fs(x, '#5a5a6a', 8); x.beginPath(); x.arc(320, 0, 34, 0, 7); x.fillStyle = OLc; x.fill(); if (firing) A.glow(x, 360, 0, 120, '255,180,80', 0.8); x.restore(); }
const OLc = '#16101a';
function house(x, cx, by, s, t) { x.save(); x.translate(cx, by); x.scale(s, s); x.beginPath(); x.rect(-260, -420, 520, 420); A.fs(x, '#c8a878', 12); x.beginPath(); x.moveTo(-300, -420); x.lineTo(0, -640); x.lineTo(300, -420); x.closePath(); A.fs(x, '#a8402e', 12); A.rrect(x, -60, -220, 120, 220, 16); A.fs(x, '#5a3a26', 8); for (const sd of [-1, 1]) { A.rrect(x, sd * 170 - 50, -340, 100, 100, 10); A.fs(x, '#ffd77a', 7); } x.restore(); }
export function bakuIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) bigMouth(x, 0, 0, 0.4, Math.abs(Math.sin(t * 4)), t);
  else if (k === 2) cannonArm(x, -100, 0, 0.6, 0, false, t);
  else if (k === 3) { for (const sd of [-1, 1]) { x.beginPath(); x.arc(sd * 50, -20, 50, 0, 7); A.fs(x, sd < 0 ? '#f6c690' : '#e8b48a', 7); } x.font = `80px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = '#ffe14d'; x.fillText('+', 0, 70); }
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); house(x, 0, 120, 0.3, t); }
  x.restore();
}

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a purple fruit with a zigzag split', biteDesc: 'he takes a second bite out of the plate too', biteSfx: 'crunch', bannerCol: 'pink', biteCol: '#f0e0ff',
    biteFx(x, S, k) { x.save(); x.globalAlpha = 1 - k; x.beginPath(); x.ellipse(290, 1430, 200, 44, 0, 0, 7); x.fillStyle = '#d6ecfa'; x.fill(); x.restore(); },
    calmBg: 's3:mu_diner', calmDesc: 'diner', seaHue: 'indigo', seed: 65, nameRe: /^Munch-Munch/,
    revealBg: 's3:mu_snow', revealDesc: 'snowy mountains', revealBanner: 'MUNCH-MUNCH FRUIT', haloRgb: '200,150,255' });
  const tThat = W('type', /^that/) - 0.1, tMetal = W('type', /^metal/) - 0.1;
  add({ name: 'Eat anything (snow castle): a giant metal mouth chomps the castle gate clean off', t0: tThat, t1: tMetal, bg: 's3:mu_castle',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'crunch'], [0.5, 'crunch']],
    draw(x, S) { bigMouth(x, 540, 900, 1.3, Math.abs(Math.sin(S.T * 6)), S.T); for (let i = 0; i < 6; i++) { const ph = (S.T * 1.5 + i / 6) % 1; x.beginPath(); x.arc(540 + Math.cos(i) * 300 * ph, 900 + Math.sin(i * 2) * 200 * ph, 14 * (1 - ph), 0, 7); A.fs(x, '#a8b0c0', 4); } } });
  stage(T, { desc: 'purple-and-green banner stage', bg: 's3:mu_stage', t0: tMetal, t1: end('type'), times: [W('type', /^metal/), W('type', /^and$/), W('type', /^stone/), W('type', /^stone/) + 0.35],
    labels: ['CHOMP', 'BECOME', 'FUSE', 'FACTORY'], bar: 'MUNCH TRICKS', haloRgb: '200,150,255', icon: bakuIcon });

  const tWalls = W('power1', /^walls/) - 0.1;
  addSplit({ name: 'Power 1 (scrapyard): the host\'s mouth opens huge and gulps down a cannon in one bite; the mechanic gapes; pink CHOMP banner', t0: st('power1'), t1: end('power1'), bg: 's3:mu_scrap',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['CHOMP!', 'pink', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^huge/) - st('power1'), 'crunch'], [tWalls - st('power1'), 'crunch']],
    draw(x, S) { const e = person(x, S, 'mechanic', 'shock', 860, 1780, 0.6, { seed: 3, pose: 'shrug', flip: true }); const k = prog(S.T, W('power1', /^huge/) - 0.2, tWalls);
      person(x, S, 'host', 'grin', 300, 1780, 0.66, { seed: 2, pose: 'shrug' }); bigMouth(x, 440, 1100, 0.6, Math.abs(Math.sin(S.T * 5)), S.T); if (k < 1) cannonArm(x, lerp(700, 460, k), 1100, 0.6 * (1 - k * 0.7), 0, false, S.T); A.mark(x, '!?', e.head[0] - 130, e.head[1] - 190, pop(S.T, S.t0 + 0.6)); } },
    tWalls, [[1.25, 540, 1150, 0.02], [1.32, 560, 1140, 0.035]], 'Power 1 more (same scrapyard): a whole stone wall disappears into the mouth');

  const tCannon = W('power2', /^cannon/) - 0.1;
  addSplit({ name: 'Power 2 evolve (armory): chomp icon becomes the become icon; the host\'s arm morphs into the cannon he ate and fires; gold BECOME IT banner', t0: st('power2'), t1: end('power2'), bg: 's3:mu_armory',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['BECOME WHAT YOU EAT', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [tCannon - st('power2'), 'thunk'], [tCannon - st('power2') + 0.3, 'impact']],
    draw(x, S) { if (evolveIn(x, S, 1, 2, bakuIcon)) return; const h = person(x, S, 'host', 'grin', 320, 1780, 0.68, { seed: 2, pose: 'punch', pop: S.t0 + 0.45 }); const k = ease.outBack(prog(S.T, tCannon - 0.3, tCannon + 0.2));
      if (k > 0) cannonArm(x, h.hand.R[0] - 60, h.hand.R[1], 0.7 * k, 0, S.T > tCannon + 0.3, S.T); if (S.T > tCannon + 0.3) { A.impactStar(x, 900, h.hand.R[1], 140 * (1 - prog(S.T, tCannon + 0.5, tCannon + 0.9)), 0.3); if (S.T < tCannon + 0.3 + 7 * F) S.shake = 0.9; } } },
    tCannon + 0.3, [[1.3, 520, 1250, 0.03], [1.38, 540, 1240, 0.045]], 'Power 2 fire (same armory): smoke curls out of the cannon arm');

  const tSold = W('power3', /^soldier/) - 0.1;
  add({ name: 'Power 3 evolve (barracks): become icon becomes the fuse icon; the host gulps two soldiers and pops out as one lumpy two-headed soldier; purple FUSED banner; ?', t0: st('power3'), t1: end('power3'), bg: 's3:mu_barracks',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['FUSED!', 'pink', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^eat/) - st('power3'), 'crunch'], [tSold - st('power3'), 'boing']],
    draw(x, S) { if (evolveIn(x, S, 2, 3, bakuIcon)) return; const fused = S.T > tSold;
      if (!fused) { person(x, S, 'mechanic', 'worried', 760, 1780, 0.6, { seed: 3, pose: 'shrug', flip: true }); person(x, S, 'farmer', 'worried', 920, 1780, 0.56, { seed: 4, pose: 'shrug', flip: true }); person(x, S, 'host', 'grin', 300, 1780, 0.66, { seed: 2, pose: 'shrug' }); }
      else { const p = pop(S.T, tSold); x.save(); x.translate(540, 1780); x.scale(p * 1.3, p); x.translate(-540, -1780); person(x, S, 'mechanic', 'grin', 470, 1780, 0.66, { seed: 3, pose: 'cheer' }); person(x, S, 'farmer', 'shock', 610, 1780, 0.66, { seed: 4, pose: 'cheer' }); x.restore(); A.mark(x, '?', 860, 900, pop(S.T, tSold + 0.3), 0.2); } } });

  const tOne = W('peak', /^one/) - 0.1;
  addSplit({ name: 'Peak (snowy village): fuse icon gives way to the factory icon, gold halo; gold MUNCH FACTORY banner; the host swallows a whole house and turns into a walking house', t0: st('peak'), t1: end('peak'), bg: 's3:mu_village',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['MUNCH-MUNCH FACTORY', 'gold', W('peak', /^Munch-Munch/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Munch-Munch/) - st('peak'), 'charge'], [W('peak', /^house/) - st('peak'), 'crunch'], [tOne - st('peak'), 'quake']],
    draw(x, S) { halo(x, 540, 900, 620, '255,215,90', S.T); if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, bakuIcon); return; }
      const k = prog(S.T, W('peak', /^house/) - 0.4, tOne); if (k < 1) { house(x, lerp(800, 540, k), 1780, 1 - k * 0.6, S.T); person(x, S, 'host', 'grin', 300, 1780, 0.66, { seed: 7, pose: 'shrug' }); } else { house(x, 540, 1680, 1.1 * pop(S.T, tOne), S.T); x.save(); x.beginPath(); x.rect(0, 1680, 1080, 200); x.clip(); person(x, S, 'host', 'grin', 540, 1780, 0.66, { seed: 7 }); x.restore(); if (S.T < tOne + 7 * F) S.shake = 0.9; }
      if (S.T > W('peak', /^Munch-Munch/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Munch-Munch/), W('peak', /^Munch-Munch/) + 0.3))); S.flashCol = '255,246,200'; } } },
    tOne + 0.3, [[1.2, 540, 1200, -0.02], [1.28, 540, 1190, -0.035]], 'Peak close (same village): the house-body\'s door opens and the host waves out of it');

  add({ name: 'Twist (snowy cliff edge): little boats sail away from the island; push-in with roll, low sting; red FUNNY PART banner', t0: st('twist'), t1: end('twist'), bg: 's3:mu_cliff', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['THE FUNNY PART', 'red', st('twist') + 0.3, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  add({ name: 'Ran away (same cliff): Wapol, in his hippo hood and fur cape, scuttles off with a sack while pirates arrive; red RAN AWAY banner; sweat', t0: st('truth'), t1: end('truth'), bg: 's3:mu_cliff',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['RAN AWAY', 'red', W('truth', /^away/) - 0.1, end('truth')]], sfx: [[0.2, 'zip'], [0.6, 'whoosh']],
    draw(x, S) { const u = prog(S.t, 0.1, S.dur); const w = person(x, S, 'wapol', 'shock', lerp(540, 1150, u), 1780, 0.66, { seed: 8, pose: 'cheer' }); A.sweat(x, w.head[0] - 160, w.head[1] - 60, 1); A.speedLines(x, w.head[0] - 300, w.head[1] + 300, S.T, 8, 200, Math.PI); } });

  const tSky = W('users', /^blasted/) - 0.1;
  add({ name: 'Wapol (royal throne): the old king of Drum Island on his throne, grinning with his metal jaw; purple KING WAPOL banner', t0: st('users'), t1: tSky, bg: 's3:mu_throne',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['KING WAPOL', 'pink', st('users') + 0.2, tSky]], sfx: [[0, 'whoosh'], [0.4, 'crunch']],
    draw(x, S) { person(x, S, 'wapol', 'grin', 540, 1820, 0.82, { pop: S.t0 + 0.05, seed: 8, pose: 'shrug' }); } });
  add({ name: 'Blasted away (blue sky): Luffy\'s punch sends Wapol flying into the sky as a tiny twinkle; impact star; gold BYE BYE banner', t0: tSky, t1: end('users'), bg: 's3:mu_sky',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['BYE BYE!', 'gold', tSky + 0.3, end('users')]], sfx: [[0.1, 'impact'], [0.4, 'whoosh'], [1.0, 'ding']],
    draw(x, S) { const u = ease.outCubic(prog(S.t, 0.1, 1.0)); person(x, S, 'luffy', 'shout', 280, 1820, 0.66, { seed: 4, pose: 'punch' }); x.save(); x.translate(lerp(620, 900, u), lerp(1500, 200, u)); x.rotate(u * 8); person(x, S, 'wapol', 'hit', 0, 0, 0.5 * (1 - u * 0.85), { seed: 8, pose: 'cheer' }); x.restore();
      if (S.t < 0.4) A.impactStar(x, 600, 1300, 160, 0.3); if (u >= 1) A.sparkle(x, 900, 200, 50 * Math.abs(Math.sin(S.T * 8))); } });

  add({ name: 'Joke (kitchen sink piled with plates): the host just eats the whole stack of dirty plates; green NO DISHES banner', t0: st('joke'), t1: end('joke'), bg: 's3:mu_sink',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NO DISHES', 'green', W('joke', /^dishes/) - 0.1, end('joke')]], sfx: [[0.3, 'crunch'], [0.7, 'crunch'], [W('joke', /^dishes/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'grin', 480, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'holdUp', talk: true }); const n = Math.max(0, 5 - Math.floor(S.t * 3)); for (let i = 0; i < n; i++) { A.rrect(x, h.hand.R[0] - 80, h.hand.R[1] - 40 - i * 24, 160, 22, 10); A.fs(x, '#ffffff', 5); } } });

  ending(T, { TL, fruit });
  return finish();
}
