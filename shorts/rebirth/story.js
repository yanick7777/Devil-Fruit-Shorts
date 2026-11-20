// Special: how Devil Fruits come back after their user dies. Rules -> rebirth into a nearby fruit -> Punk Hazard (Smiley) -> Ace's Mera Mera -> Blackbeard.
import * as A from '/engine/art.js';
import { drawFruit } from '/engine/fruit.js';
import { drawGura } from '/shorts/quake/fruit.js';
import { drawSara } from '/engine/fruits3.js';
import { scene } from '/engine/scenes3.js';
import { F, ease, prog, lerp, pop, person, halo, deskFront, fireBody } from '/engine/kit.js';
import { timing, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawFruit(x, cx, cy, R * 0.9, rot, o);

export const SETS = ['s3:rb_crypt', 's3:rb_sea', 's3:rb_jungle', 's3:rb_battle', 's3:rb_orchard', 's3:rb_lab', 's3:rb_hazard', 's3:rb_marineford', 's3:rb_palace', 's3:rb_colosseum', 's3:rb_storm', 's3:rb_moby', 's3:rb_road'];
scene('rb_crypt', { sky: ['#4a3a6a', '#7a6a9a'], ground: '#5a5a6a', back: [['fog', { n: 6, col: 'rgba(230,220,255,0.2)' }], ['custom', { fn: (x, h) => { for (let k = 0; k < 4; k++) { h.rrect(x, 60 + k * 270, 1020 + (k % 2) * 40, 160, 240, 70); h.fs(x, '#8a8aa0', 8); } } }], ['moon', { x: 820, y: 300 }]] });
scene('rb_sea', { sky: ['#8fd4ff', '#e0f4ff'], back: [['water', { y: 1250, hh: 800, col: '#2a7ac8' }], ['clouds', { n: 3, y: 200 }]] });
scene('rb_jungle', { sky: ['#bfe8b0', '#e8ffe0'], ground: '#5a8a3a', back: [['trees', { n: 5, x0: 0, gap: 260, leaf: '#3a8a3a' }], ['fog', { n: 3, col: 'rgba(255,255,255,0.2)' }]] });
scene('rb_battle', { sky: ['#5a3a3a', '#a0603a'], ground: '#6a5a4a', back: [['fog', { n: 6, col: 'rgba(255,200,150,0.2)' }], ['custom', { fn: (x, h) => { for (const [cx, hh] of [[160, 300], [900, 380]]) { h.rrect(x, cx - 20, 1250 - hh, 40, hh, 6); h.fs(x, '#3a3346', 6); x.beginPath(); x.moveTo(cx + 20, 1250 - hh); x.lineTo(cx + 180, 1250 - hh + 60); x.lineTo(cx + 20, 1250 - hh + 120); h.fs(x, '#c8303a', 6); } } }]] });
scene('rb_orchard', { sky: ['#ffe8c0', '#fff6e4'], ground: '#9ad86a', back: [['trees', { n: 3, x0: 60, gap: 420, leaf: '#4aa04a' }], ['custom', { fn: (x) => { for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(80 + (i * 137) % 1000, 400 + (i * 61) % 400, 22, 0, 7); x.fillStyle = '#e8402e'; x.fill(); } } }]] });
scene('rb_lab', { sky: ['#e8f4ff', '#c8dcf0'], ground: '#8a9ab0', back: [['custom', { fn: (x, h) => { h.rrect(x, 100, 260, 880, 520, 14); h.fs(x, '#1b2440', 10); x.strokeStyle = '#7fe0ff'; x.lineWidth = 6; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(160, 340 + k * 90); x.lineTo(540 + (k % 3) * 120, 340 + k * 90); x.stroke(); } x.beginPath(); x.arc(820, 520, 110, 0, 7); x.stroke(); } }], ['pipes', { n: 2, col: '#b8c8d8' }]] });
scene('rb_hazard', { sky: ['#ff8a4a', '#ffd0a0'], ground: '#8a5a4a', back: [['custom', { fn: (x, h) => { x.fillStyle = '#c8e8ff'; x.fillRect(540, -200, 800, 1500); for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(600 + i * 110, 1260); x.lineTo(650 + i * 110, 900 - (i % 2) * 120); x.lineTo(700 + i * 110, 1260); x.closePath(); h.fs(x, '#e8f6ff', 7); } for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(255,120,40,0.5)'; x.beginPath(); x.moveTo(i * 130, 1260); x.quadraticCurveTo(i * 130 + 60, 800 - (i % 2) * 150, i * 130 + 120, 1260); x.fill(); } } }]] });
scene('rb_marineford', { sky: ['#6a7a9a', '#a8b8d0'], ground: '#9a9aa0', back: [['custom', { fn: (x, h) => { h.rrect(x, 240, 420, 600, 830, 10); h.fs(x, '#e8e8f0', 10); x.font = '120px "Lilita One"'; x.textAlign = 'center'; x.fillStyle = '#3a6ad8'; x.fillText('MARINE', 540, 620); } }], ['fog', { n: 6, col: 'rgba(80,80,90,0.25)' }]] });
scene('rb_palace', { sky: ['#ffd0e8', '#fff0f8'], ground: '#d8b8c8', back: [['columns', { n: 4, x0: 40, gap: 300, w: 60, col: '#ff8cc0' }], ['custom', { fn: (x, h) => { h.rrect(x, 380, 760, 320, 500, 30); h.fs(x, '#c8304a', 10); } }]] });
scene('rb_colosseum', { sky: ['#ffd890', '#fff0c8'], ground: '#c8a070', back: [['custom', { fn: (x, h) => { for (let r = 0; r < 4; r++) { x.beginPath(); x.ellipse(540, 1100, 900 - r * 40, 520 - r * 110, 0, Math.PI, 0); x.lineWidth = 60; x.strokeStyle = r % 2 ? '#c8a070' : '#a07850'; x.stroke(); } x.fillStyle = '#ff8cc0'; for (let i = 0; i < 30; i++) { x.beginPath(); x.arc(60 + (i * 97) % 960, 620 + (i * 53) % 300, 14, 0, 7); x.fill(); } } }]] });
scene('rb_storm', { sky: ['#1a1a2a', '#3a3a5a'], back: [['custom', { fn: (x) => { x.strokeStyle = 'rgba(200,220,255,0.3)'; x.lineWidth = 4; for (let i = 0; i < 70; i++) { const rx = (i * 137) % 1200 - 60, ry = (i * 251) % 1500; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 20, ry + 70); x.stroke(); } } }]] });
scene('rb_moby', { sky: ['#3a2a3a', '#7a4a3a'], ground: '#6b4630', gy: 1260, back: [['custom', { fn: (x, h) => { h.rrect(x, 500, 120, 40, 1140, 6); h.fs(x, '#3a3346', 7); x.beginPath(); x.moveTo(540, 160); x.quadraticCurveTo(940, 420, 540, 760); x.closePath(); h.fs(x, '#f4f0e0', 8); x.beginPath(); x.arc(700, 460, 60, 0, 7); h.fs(x, '#1b1530', 0); } }], ['fog', { n: 5, col: 'rgba(40,20,40,0.25)' }]] });
scene('rb_road', { sky: ['#ffe8b0', '#fff8e0'], ground: '#c8b080', back: [['trees', { n: 2, x0: 80, gap: 860, leaf: '#5cb84a' }], ['clouds', { n: 2, y: 220 }]] });

// ---------------- special props ----------------
// the power itself: a glowing swirl orb
function orb(x, cx, cy, r, t, rgb = '255,220,140') { A.glow(x, cx, cy, r * 2.4, rgb, 0.8); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = `rgba(${rgb},0.9)`; x.fill(); x.save(); x.translate(cx, cy); x.rotate(t * 3); x.strokeStyle = '#ffffff'; x.lineWidth = r * 0.12; x.beginPath(); for (let a = 0; a < 9; a += 0.2) x.lineTo(Math.cos(a) * a * r * 0.09, Math.sin(a) * a * r * 0.09); x.stroke(); x.restore(); }
function apple(x, cx, cy, R) { x.beginPath(); x.moveTo(cx, cy - R * 0.6); x.bezierCurveTo(cx - R * 1.2, cy - R * 1.1, cx - R * 1.2, cy + R * 0.9, cx, cy + R * 0.9); x.bezierCurveTo(cx + R * 1.2, cy + R * 0.9, cx + R * 1.2, cy - R * 1.1, cx, cy - R * 0.6); A.fs(x, '#e8402e', R * 0.07); x.beginPath(); x.moveTo(cx, cy - R * 0.6); x.lineTo(cx + R * 0.1, cy - R * 1.0); x.lineWidth = R * 0.08; x.strokeStyle = '#6b4630'; x.stroke(); x.beginPath(); x.ellipse(cx - R * 0.35, cy - R * 0.2, R * 0.12, R * 0.22, 0.4, 0, 7); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fill(); }
// an apple that turns into a Devil Fruit in a flash (k 0..1)
function transform(x, cx, cy, R, k, t, df = drawFruit) { if (k < 0.5) apple(x, cx, cy, R); else df(x, cx, cy, R, 0, { shadow: false }); if (k > 0.3 && k < 0.8) { A.glowRing(x, cx, cy, R * 3 * (k - 0.3) * 2, 1 - (k - 0.3) * 2); A.shineLines(x, cx, cy, R * 1.2, R * 2.2, t, 12); } }
// Smiley: a huge lavender gas axolotl with a wide grin and pink gill fronds; burst = 0..1 turns it into Shinokuni
export function smiley(x, cx, cy, s, t, burst = 0) { x.save(); x.translate(cx, cy); x.scale(s, s); x.globalAlpha = 1 - burst * 0.9; const wob = Math.sin(t * 3) * 10;
  for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) { x.beginPath(); x.ellipse(sd * (250 + k * 10), -140 + k * 70, 70, 26, sd * (0.5 - k * 0.4), 0, 7); A.fs(x, '#ff8cc0', 7); }
  x.beginPath(); for (let i = 0; i <= 24; i++) { const a = i / 24 * 6.283, r = 260 + Math.sin(a * 5 + t * 2) * 14; x.lineTo(Math.cos(a) * r * 1.1, Math.sin(a) * r * 0.85 + wob); } x.closePath(); A.fs(x, '#c8a8f0', 12);
  x.fillStyle = A.OL; for (const sd of [-1, 1]) { x.beginPath(); x.arc(sd * 110, -60 + wob, 26, 0, 7); x.fill(); }
  x.beginPath(); x.moveTo(-170, 40 + wob); x.quadraticCurveTo(0, 190 + wob, 170, 40 + wob); x.quadraticCurveTo(0, 110 + wob, -170, 40 + wob); A.fs(x, '#ffffff', 9);
  x.restore(); if (burst > 0) shinokuni(x, cx, cy, s * (0.6 + burst * 1.6), t, burst); }
function shinokuni(x, cx, cy, s, t, a = 1) { x.save(); x.globalAlpha = Math.min(1, a * 1.4); for (let i = 0; i < 12; i++) { const ang = i / 12 * 6.283 + t * 0.3; x.beginPath(); x.arc(cx + Math.cos(ang) * 260 * s, cy + Math.sin(ang) * 180 * s, 170 * s, 0, 7); x.fillStyle = i % 2 ? '#4a2a6a' : '#6a3a8a'; x.fill(); } x.restore(); }
function candy(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 30, 0); x.lineTo(sd * 70, -26); x.lineTo(sd * 70, 26); x.closePath(); A.fs(x, '#ff8cc0', 5); } x.beginPath(); x.arc(0, 0, 34, 0, 7); A.fs(x, '#ffd84a', 6); x.restore(); }
function sheet(x, cx, fy, s) { x.save(); x.translate(cx, fy); x.scale(s, s); x.beginPath(); x.moveTo(-420, 0); x.quadraticCurveTo(-400, -260, -200, -300); x.quadraticCurveTo(0, -360, 220, -300); x.quadraticCurveTo(420, -240, 420, 0); x.closePath(); A.fs(x, '#14121a', 10); x.restore(); }
function prize(x, cx, cy, s, t) { A.rrect(x, cx - 120 * s, cy + 80 * s, 240 * s, 220 * s, 16 * s); A.fs(x, '#d9b44a', 8); A.glow(x, cx, cy, 200 * s, '255,180,80', 0.7); drawFruit(x, cx, cy, 90 * s, Math.sin(t) * 0.1, { shadow: false }); A.shineLines(x, cx, cy, 120 * s, 200 * s, t, 12); }

export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  // 1. hook: desk room, a Devil Fruit on the plate, question marks
  add({ name: 'Hook (desk room): the host stares at a swirly Devil Fruit on the plate next to a little gravestone; ?!; gold WHERE DOES IT GO? banner', t0: 0, t1: end('hook'), bg: 'desk',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0]], banners: [['WHERE DOES IT GO?', 'gold', W('hook', /^dies/) - 0.2, end('hook')]], sfx: [[0.1, 'sip'], [W('hook', /^dies/), 'sting']],
    draw(x, S) { const h = person(x, S, 'host', S.T > W('hook', /^user/) ? 'shock' : 'calm', 540, 1900, 0.8, { pose: 'hold' }); A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false); deskFront(x, S); drawFruit(x, 290, 1340, 80, 0.3, { shadow: false });
      if (S.T > W('hook', /^user/)) A.mark(x, '!?', h.head[0] + 230, h.head[1] - 230, pop(S.T, W('hook', /^user/))); } });
  // 2. calm
  add({ name: 'Don\'t panic (moonlit graveyard): the host calms down; a glowing swirl orb floats up out of a grave', t0: st('calm'), t1: end('calm'), bg: 's3:rb_crypt',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 540, 990, 0.01]], banners: [['THE POWER LIVES ON', 'pink', W('calm', /^die/) - 0.1, end('calm')]], sfx: [[0, 'whoosh'], [W('calm', /^power/) - st('calm'), 'shimmer']],
    draw(x, S) { person(x, S, 'host', 'calm', 300, 1780, 0.66, { seed: 2, pose: 'shrug', talk: true }); orb(x, 800, lerp(1150, 850, prog(S.T, W('calm', /^power/), end('calm'))), 50, S.T); } });
  // 3. rule 1: one at a time
  add({ name: 'Rule 1 (open sea): a world globe spins with a single glowing fruit pin; gold ONLY ONE banner', t0: st('rule1'), t1: end('rule1'), bg: 's3:rb_sea',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['ONLY ONE AT A TIME', 'gold', W('rule1', /^one/) - 0.1, end('rule1'), 'slide']], sfx: [[0, 'whoosh'], [W('rule1', /^one/) - st('rule1'), 'ding']],
    draw(x, S) { A.globe(x, 540, 1000, 300, S.T); const k = pop(S.T, W('rule1', /^one/)); if (k > 0) { A.glow(x, 640, 900, 120, '255,220,140', 0.8); drawFruit(x, 640, 860, 60 * k, 0, { shadow: false }); } A.mark(x, '1', 860, 600, pop(S.T, W('rule1', /^exist/)), 0.1); } });
  // 4. rule 2: nobody can find it
  add({ name: 'Rule 2 (jungle): a treasure hunter sweeps a giant magnifier over the bushes and finds nothing; red CAN\'T FIND IT banner', t0: st('rule2'), t1: end('rule2'), bg: 's3:rb_jungle',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, 0]], banners: [['NOBODY CAN FIND IT', 'red', W('rule2', /^find/) - 0.2, end('rule2')]], sfx: [[0.2, 'swish'], [W('rule2', /^find/) - st('rule2'), 'boing']],
    draw(x, S) { const e = person(x, S, 'cowboy', 'worried', 300, 1780, 0.62, { seed: 3, pose: 'punch' }); A.magnifier(x, 700 + Math.sin(S.T * 2) * 120, 1300, 150, S.T, () => {}); A.mark(x, '?', e.head[0] + 120, e.head[1] - 180, pop(S.T, W('rule2', /^find/))); } });
  // 5. death: the power leaves the body
  add({ name: 'User dies (smoky battlefield): a fallen captain fades out and a glowing swirl orb rises out of him; purple POWER LEAVES banner', t0: st('death'), t1: end('death'), bg: 's3:rb_battle',
    cam: [[1.05, 540, 1000, 0], [1.1, 540, 980, -0.02]], banners: [['THE POWER LEAVES', 'pink', W('death', /^leaves/) - 0.1, end('death')]], sfx: [[W('death', /^dies/) - st('death'), 'fade'], [W('death', /^leaves/) - st('death'), 'shimmer']],
    draw(x, S) { const td = W('death', /^dies/), k = prog(S.T, td, td + 0.8); person(x, S, 'captain', 'sad', 540, 1780, 0.66, { seed: 4, pose: 'shrug', alpha: 1 - 0.75 * k }); const ko = prog(S.T, W('death', /^power/), end('death')); if (ko > 0) orb(x, 540, lerp(1250, 700, ko), 55, S.T); } });
  // 6. reborn into a nearby fruit
  const tJump = W('reborn', /^jumps/), tBecome = W('reborn', /^becomes/);
  addSplit({ name: 'Reborn (orchard): the orb zips across and dives into a red apple sitting in a basket', t0: st('reborn'), t1: end('reborn'), bg: 's3:rb_orchard',
    cam: [[1.0, 540, 1000, 0.02], [1.06, 540, 990, 0]], banners: [['INTO A FRUIT NEARBY', 'green', W('reborn', /^nearby/) - 0.1, tBecome - 0.1]], sfx: [[tJump - st('reborn'), 'zip']],
    draw(x, S) { const k = ease.outCubic(prog(S.T, tJump, W('reborn', /^nearby/))); A.rrect(x, 380, 1500, 320, 160, 30); A.fs(x, '#a07850', 9); apple(x, 540, 1420, 90); if (k < 1) orb(x, lerp(120, 540, k), lerp(700, 1420, k), 40, S.T); } },
    tBecome - 0.1, [[1.15, 540, 1250, -0.02], [1.25, 540, 1240, 0.02]], 'Transform (same orchard, close): the apple flashes and becomes a swirly Devil Fruit; gold SAME FRUIT AGAIN banner');
  const rb = T.shots[T.shots.length - 1]; rb.banners = [['SAME FRUIT, SAME POWER', 'gold', tBecome, end('reborn')]]; rb.sfx = [[0.1, 'levelup'], [W('reborn', /^swirls/) - tBecome, 'shimmer']];
  rb.draw = function (x, S) { A.rrect(x, 380, 1500, 320, 160, 30); A.fs(x, '#a07850', 9); transform(x, 540, 1420, 90, prog(S.T, tBecome, tBecome + 0.6), S.T); };
  // 7. vegapunk
  add({ name: 'Vegapunk (lab with glowing screens): Dr. Vegapunk points at a chart of an orb jumping into a fruit; blue VEGAPUNK FOUND IT banner', t0: st('vegapunk'), t1: end('vegapunk'), bg: 's3:rb_lab',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 540, 990, 0.02]], banners: [['DR. VEGAPUNK', 'blue', st('vegapunk') + 0.2, W('vegapunk', /^saw/)], ['SEEN ON PUNK HAZARD', 'red', W('vegapunk', /^saw/), end('vegapunk')]], sfx: [[0.1, 'ding'], [W('vegapunk', /^Punk/) - st('vegapunk'), 'whoosh']],
    draw(x, S) { person(x, S, 'vegapunk', 'grin', 300, 1800, 0.72, { seed: 5, pose: 'punch', talk: true }); orb(x, 660, 520, 26, S.T, '127,224,255'); apple(x, 860, 520, 40); } });
  // 8-10. Punk Hazard: Smiley
  add({ name: 'Smiley (Punk Hazard, half fire half ice): Caesar Clown feeds a blue swirly fruit to Smiley, a giant grinning gas axolotl; purple CAESAR + SMILEY banner', t0: st('smiley1'), t1: end('smiley1'), bg: 's3:rb_hazard',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['CAESAR CLOWN', 'pink', st('smiley1') + 0.2, W('smiley1', /^Smiley/)], ['SMILEY: A POISON GAS BLOB', 'green', W('smiley1', /^Smiley/), end('smiley1')]], sfx: [[0.1, 'whoosh'], [W('smiley1', /^fed/) - st('smiley1'), 'crunch'], [W('smiley1', /^gas/) - st('smiley1'), 'steam']],
    draw(x, S) { smiley(x, 700, 1050, 0.9, S.T); const c = person(x, S, 'caesar', 'grin', 260, 1800, 0.6, { seed: 6, pose: 'raise' }); const k = prog(S.T, W('smiley1', /^fed/), W('smiley1', /^Smiley/)); if (k < 1) drawSara(x, lerp(c.hand.L[0], 700, k), lerp(c.hand.L[1], 1100, k), 50, 0, { shadow: false }); } });
  const tBurst = W('smiley2', /^burst/);
  add({ name: 'Shinokuni (same lab): Smiley gulps a candy, swells and bursts into a huge dark purple gas cloud; red SHINOKUNI banner; shake', t0: st('smiley2'), t1: end('smiley2'), bg: 's3:rb_hazard',
    cam: [[1.0, 540, 980, 0], [0.95, 540, 960, 0.02]], banners: [['CANDY', 'pink', W('smiley2', /^candy/) - 0.1, tBurst], ['SHINOKUNI', 'red', tBurst, end('smiley2')]], sfx: [[W('smiley2', /^ate/) - st('smiley2'), 'crunch'], [tBurst - st('smiley2'), 'boom'], [tBurst - st('smiley2') + 0.2, 'steam']],
    draw(x, S) { const kc = prog(S.T, W('smiley2', /^ate/) - 0.3, W('smiley2', /^candy/) + 0.2); if (kc < 1) candy(x, lerp(200, 700, kc), lerp(700, 1100, kc), 1.2); smiley(x, 700, 1050, 0.9 * (1 + 0.15 * prog(S.T, W('smiley2', /^candy/), tBurst)), S.T, prog(S.T, tBurst, tBurst + 0.8)); if (S.T > tBurst && S.T < tBurst + 0.3) S.shake = 0.7; } });
  const tApple = W('smiley3', /^turned/);
  add({ name: 'The apple (same lab, close on a workbench): right beside the fading gas, an ordinary apple flashes into the blue Axolotl Fruit; gold REBORN banner', t0: st('smiley3'), t1: end('smiley3'), bg: 's3:rb_hazard',
    cam: [[1.15, 540, 1250, -0.02], [1.25, 540, 1230, 0.03]], banners: [['THE AXOLOTL FRUIT IS BACK', 'gold', tApple - 0.1, end('smiley3')]], sfx: [[tApple - st('smiley3'), 'levelup']],
    draw(x, S) { shinokuni(x, 860, 900, 0.5, S.T, 0.5); A.rrect(x, 300, 1500, 480, 60, 10); A.fs(x, '#8a9ab0', 8); transform(x, 540, 1400, 95, prog(S.T, tApple - 0.2, tApple + 0.4), S.T, drawSara); } });
  // 11-15. Ace's Mera Mera
  add({ name: 'Ace\'s fruit (blazing rays): the Flame-Flame Fruit spins in a ring of fire, Ace grins beside it; orange FLAME-FLAME banner', t0: st('ace1'), t1: end('ace1'), bg: 'rays:orange',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['FLAME-FLAME FRUIT', 'gold', st('ace1') + 0.2, end('ace1'), 'slide']], sfx: [[0, 'ignite']],
    draw(x, S) { person(x, S, 'ace', 'grin', 300, 1800, 0.66, { seed: 7, pose: 'idle' }); halo(x, 760, 1150, 300, '255,150,40', S.T); drawFruit(x, 760, 1150, 110, S.T * 0.6, { shadow: false }); for (let i = 0; i < 6; i++) A.flame(x, 620 + i * 56, 1330, 50, 120, S.T, i); } });
  const tTwo = W('ace2', /^two/);
  addSplit({ name: 'Marineford (grey fortress): Ace falls; a flame orb drifts up out of him; red MARINEFORD banner', t0: st('ace2'), t1: end('ace2'), bg: 's3:rb_marineford',
    cam: [[1.05, 540, 1000, 0], [1.1, 540, 990, -0.02]], banners: [['MARINEFORD', 'red', st('ace2') + 0.1, tTwo]], sfx: [[0.1, 'sting'], [0.6, 'fade']],
    draw(x, S) { const k = prog(S.T, S.t0 + 0.2, tTwo); person(x, S, 'ace', 'sad', 540, 1780, 0.66, { seed: 7, pose: 'shrug', alpha: 1 - 0.7 * k }); orb(x, 540, lerp(1250, 700, k), 46, S.T, '255,150,60'); } },
    tTwo - 0.1, [[1.05, 540, 1000, 0.02], [1.1, 540, 990, 0]], '2 years later (Doflamingo\'s pink palace): Doflamingo grins and holds up the Flame-Flame Fruit; pink 2 YEARS LATER banner');
  const a2 = T.shots[T.shots.length - 1]; a2.banners = [['2 YEARS LATER', 'pink', tTwo, end('ace2')]]; a2.sfx = [[0.1, 'whoosh'], [W('ace2', /^Doflamingo/) - tTwo + 0.1, 'shimmer']]; a2.bg = 's3:rb_palace';
  a2.draw = function (x, S) { const d = person(x, S, 'doflamingo', 'grin', 420, 1800, 0.7, { seed: 8, pose: 'holdUp' }); drawFruit(x, d.hand.R[0] + 20, d.hand.R[1] - 90, 75, 0, { shadow: false }); };
  add({ name: 'Grand prize (Corrida Colosseum): the fruit glows on a gold pedestal in the middle of a cheering arena; gold GRAND PRIZE banner', t0: st('ace3'), t1: end('ace3'), bg: 's3:rb_colosseum',
    cam: [[1.0, 540, 1000, 0], [1.08, 540, 980, 0.02]], banners: [['GRAND PRIZE', 'gold', W('ace3', /^prize/) - 0.2, W('ace3', /^Corrida/)], ['CORRIDA COLOSSEUM', 'red', W('ace3', /^Corrida/), end('ace3')]], sfx: [[0.1, 'fanfare'], [W('ace3', /^Corrida/) - st('ace3'), 'drums']],
    draw(x, S) { prize(x, 540, 1150, 1.3, S.T); person(x, S, 'doflamingo', 'smug', 880, 1820, 0.5, { seed: 8, pose: 'shrug', flip: true }); } });
  const tSabo = W('ace4', /^Sabo/);
  addSplit({ name: 'Luffy enters (same arena): Luffy pumps his fist in front of the prize to win back his brother\'s fruit; red FOR HIS BROTHER banner', t0: st('ace4'), t1: end('ace4'), bg: 's3:rb_colosseum',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 540, 990, 0]], banners: [['FOR HIS BROTHER', 'red', st('ace4') + 0.2, tSabo]], sfx: [[0.2, 'whoosh']],
    draw(x, S) { prize(x, 820, 1150, 0.8, S.T); person(x, S, 'luffy', 'grin', 360, 1800, 0.7, { seed: 4, pose: 'cheer' }); } },
    tSabo - 0.1, [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], 'Sabo wins (same arena): Sabo in his top hat steps in, wins, and bites the fruit; blue SABO WINS banner');
  const a4 = T.shots[T.shots.length - 1]; a4.banners = [['SABO WINS', 'blue', tSabo, end('ace4')]]; a4.sfx = [[0.1, 'swish'], [W('ace4', /^won/) - tSabo + 0.1, 'fanfare'], [W('ace4', /^ate/) - tSabo + 0.1, 'crunch']];
  a4.draw = function (x, S) { const s = person(x, S, 'sabo', 'grin', 540, 1800, 0.72, { seed: 9, pose: 'holdUp' }); if (S.T < W('ace4', /^ate/) + 0.2) drawFruit(x, s.hand.R[0] + 20, s.hand.R[1] - 80, 60, 0, { shadow: false }); else A.mark(x, '!', s.head[0] + 140, s.head[1] - 180, pop(S.T, W('ace4', /^ate/) + 0.2)); if (S.T > W('ace4', /^won/)) A.dust(x, 1080, 1920, S.T, 30, '255,200,120'); };
  add({ name: 'Ace\'s flames (same arena, sunset tint): Sabo bursts into roaring flames, fist forward; orange FLAMES banner', t0: st('ace5'), t1: end('ace5'), bg: 's3:rb_colosseum',
    cam: [[1.1, 540, 1050, 0], [1.18, 540, 1030, 0.03]], banners: [['ACE\'S FLAMES LIVE ON', 'gold', W('ace5', /^flames/) - 0.2, end('ace5')]], sfx: [[0, 'ignite'], [0.3, 'fireloop']],
    draw(x, S) { fireBody(x, S, 540, 1800, 0.72, 1); person(x, S, 'sabo', 'grin', 540, 1800, 0.72, { seed: 9, pose: 'punch' }); } });
  // 16-17. Blackbeard
  add({ name: 'Twist (stormy night): push-in with roll, low sting; red BROKE THE RULES banner', t0: st('twist'), t1: end('twist'), bg: 's3:rb_storm', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['BROKE THE RULES', 'red', W('twist', /^broke/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.4), 0.2); } });
  const tBB = W('truth', /^Blackbeard/);
  addSplit({ name: 'Whitebeard (deck of his ship): Whitebeard stands tall, then falls still', t0: st('truth'), t1: end('truth'), bg: 's3:rb_moby',
    cam: [[1.05, 540, 1000, 0], [1.1, 540, 990, -0.02]], banners: [['WHITEBEARD', 'blue', st('truth') + 0.1, tBB]], sfx: [[0.2, 'fade']],
    draw(x, S) { person(x, S, 'whitebeard', 'calm', 540, 1800, 0.72, { seed: 10, pose: 'idle', alpha: 1 - 0.6 * prog(S.T, S.t0 + 0.3, tBB) }); } },
    tBB - 0.1, [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], 'Blackbeard (same deck): Blackbeard throws a black sheet over the body, cracks spread through the air, he grins with two powers; purple HOW?! banner');
  const tr = T.shots[T.shots.length - 1]; tr.banners = [['STOLE THE TREMOR POWER', 'pink', tBB, W('truth', /^nobody/)], ['NOBODY KNOWS HOW', 'gold', W('truth', /^nobody/), end('truth')]]; tr.sfx = [[0.1, 'whoosh'], [W('truth', /^stole/) - tBB + 0.1, 'quake'], [W('truth', /^how/) - tBB + 0.1, 'sting']];
  tr.draw = function (x, S) { sheet(x, 800, 1820, 0.85); const b = person(x, S, 'blackbeard', 'grin', 300, 1800, 0.68, { seed: 11, pose: 'raise' }); if (S.T > W('truth', /^stole/)) { drawGura(x, b.hand.L[0], b.hand.L[1] - 60, 55, 0, { shadow: false }); x.strokeStyle = '#ffffff'; x.lineWidth = 8; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(820, 700); x.lineTo(820 + Math.cos(i * 1.6 + 0.4) * 260, 700 + Math.sin(i * 1.6 + 0.4) * 220); x.stroke(); } if (S.T < W('truth', /^stole/) + 0.3) S.shake = 0.6; } if (S.T > W('truth', /^how/)) A.mark(x, '?', 860, 800, pop(S.T, W('truth', /^how/))); };
  // 18. joke
  add({ name: 'Joke (country road): the host finds a swirly fruit lying in the grass, looks around nervously and sweats; gold BAD DAY banner', t0: st('joke'), t1: end('joke'), bg: 's3:rb_road',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['SOMEONE HAD A BAD DAY', 'gold', W('joke', /^bad/) - 0.2, end('joke')]], sfx: [[0.3, 'ding'], [W('joke', /^bad/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', S.T > W('joke', /^someone/) ? 'worried' : 'grin', 400, 1780, 0.76, { pop: S.t0 + 0.05, seed: 12, pose: 'holdUp', talk: true }); drawGura(x, h.hand.R[0] + 20, h.hand.R[1] - 80, 60, 0, { shadow: false }); if (S.T > W('joke', /^someone/)) A.sweat(x, h.head[0] - 120, h.head[1] - 60, 1.2); } });

  ending(T, { TL, fruit });
  return finish();
}
