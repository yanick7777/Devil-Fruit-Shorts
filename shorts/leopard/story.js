// Shot plan for the Neko Neko no Mi, Model: Leopard (Cat-Cat Fruit) short.
// Structure follows the fruit's real progression: base powers (full leopard, hybrid, Rokuogan) and then the AWAKENING as the peak.
import * as A from '/engine/art.js';
import { drawNeko } from '/shorts/leopard/fruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawNeko(x, cx, cy, R * 0.9, rot, o);

// ---------------- leopard effects ----------------
// a full leopard standing or running, feet on (cx, by); facing right (flip for left)
export function leopard(x, cx, by, s, t, o = {}) {
  x.save(); x.translate(cx, by); x.scale(s * (o.flip ? -1 : 1), s); const run = o.run ? t * 14 : 0, body = o.white ? '#f4ead2' : '#f2b84a', spot = o.white ? '#3a3346' : '#5a3a1a';
  for (const [lx, ph] of [[-170, 0], [-110, 1.6], [110, 3.1], [170, 4.7]]) { const sw = o.run ? Math.sin(run + ph) * 40 : 0; x.beginPath(); x.moveTo(lx, -200); x.lineTo(lx + sw, 0); x.lineWidth = 56; x.strokeStyle = A.OL; x.lineCap = 'round'; x.stroke(); x.lineWidth = 40; x.strokeStyle = body; x.stroke(); }
  x.beginPath(); x.moveTo(-230, -260); x.quadraticCurveTo(-380, -300, -400, -420 + Math.sin(t * 3) * 30); x.lineWidth = 40; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 26; x.strokeStyle = body; x.stroke();
  x.beginPath(); x.ellipse(0, -270, 250, 110, 0, 0, 7); A.fs(x, body, 12);
  x.lineWidth = 7; x.strokeStyle = spot; for (let i = 0; i < 14; i++) { x.beginPath(); x.ellipse(-190 + (i * 53) % 380, -330 + (i * 37) % 120, 20, 14, i, 0, 5.5); x.stroke(); }
  x.beginPath(); x.arc(250, -370, 95, 0, 7); A.fs(x, body, 12);
  for (const ex of [205, 300]) { x.beginPath(); x.moveTo(ex - 30, -430); x.lineTo(ex, -500); x.lineTo(ex + 30, -440); x.closePath(); A.fs(x, body, 8); }
  x.beginPath(); x.ellipse(310, -350, 50, 34, 0, 0, 7); A.fs(x, o.white ? '#ffffff' : '#fff0d0', 6); x.beginPath(); x.arc(345, -362, 12, 0, 7); x.fillStyle = A.OL; x.fill();
  for (const ex of [225, 280]) { x.beginPath(); x.ellipse(ex, -390, 14, 18, 0, 0, 7); x.fillStyle = '#ffd34d'; x.fill(); x.beginPath(); x.ellipse(ex + 2, -390, 4, 14, 0, 0, 7); x.fillStyle = A.OL; x.fill(); }
  x.restore();
}
function pigeon(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.ellipse(0, 0, 60, 46, 0, 0, 7); A.fs(x, '#f4f4f8', 7); x.beginPath(); x.arc(46, -34, 28, 0, 7); A.fs(x, '#f4f4f8', 7); x.beginPath(); x.moveTo(70, -34); x.lineTo(96, -28); x.lineTo(70, -24); x.closePath(); A.fs(x, '#ffcf3a', 4); x.beginPath(); x.arc(52, -40, 5, 0, 7); x.fillStyle = A.OL; x.fill(); x.beginPath(); x.moveTo(20, -10); x.lineTo(46, 8); x.lineTo(20, 14); x.closePath(); A.fs(x, '#e8303c', 4); x.restore(); }
function shockRing(x, cx, cy, k, col = '255,255,255') { if (k <= 0 || k >= 1) return; for (let i = 0; i < 3; i++) { const r = (60 + 600 * k) * (1 - i * 0.18); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.lineWidth = 18 * (1 - k); x.strokeStyle = `rgba(${col},${(1 - k) * (1 - i * 0.25)})`; x.stroke(); } }
function whiteAura(x, cx, cy, r, t) { for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283 + t, rr = r * (1 + 0.1 * Math.sin(t * 4 + i)); x.beginPath(); x.arc(cx + Math.cos(a) * rr * 0.7, cy + Math.sin(a) * rr, r * 0.35, 0, 7); x.fillStyle = 'rgba(255,255,255,0.35)'; x.fill(); } }
export function nekoIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) leopard(x, 0, 120, 0.42, t);
  else if (k === 2) { x.beginPath(); x.arc(0, -20, 90, 0, 7); A.fs(x, '#e8a84a', 8); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(sd * 50, -90); x.lineTo(sd * 90, -170); x.lineTo(sd * 100, -60); x.closePath(); A.fs(x, '#e8a84a', 6); } }
  else if (k === 3) { A.fist(x, 0, 0, 0.6, '#e8a84a'); shockRing(x, 0, 0, (t * 0.8) % 1); }
  else { A.glow(x, 0, 0, 180, '255,255,255', 0.7); whiteAura(x, 0, 0, 120, t); leopard(x, 0, 120, 0.4, t, { white: true }); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a spotted fruit shaped like a leopard\'s head', biteDesc: 'little cat ears pop up on his head', biteSfx: 'boing', bannerCol: 'gold', biteCol: '#fff0d0',
    biteFx(x, S, k, h) { const [hx, hy] = A.figPoint(380, 120, 540, 1900, 0.8); for (const sd of [-1, 1]) { x.save(); x.translate(hx + sd * 130, hy + 20); x.scale(ease.outBack(k), ease.outBack(k)); x.beginPath(); x.moveTo(-40, 30); x.lineTo(sd * 20, -90); x.lineTo(40, 30); x.closePath(); A.fs(x, '#f2b84a', 8); x.restore(); } },
    calmBg: 'savanna', calmDesc: 'savanna', seaHue: 'peach', seed: 49, nameRe: /^Cat-Cat/,
    revealBg: 'jungleVines', revealDesc: 'jungle vines', revealBanner: 'CAT-CAT FRUIT: LEOPARD', haloRgb: '255,200,110' });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tAndT = W('type', /^and$/) - 0.1;
  add({ name: 'Leopard (rocky outcrop): the host drops to all fours and turns into a leopard that roars on the rocks', t0: tThat, t1: tAndT, bg: 'rockyOutcrop',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.2, 'whoosh'], [0.5, 'shock']],
    draw(x, S) { const k = ease.outCubic(prog(S.t, 0.1, 0.5)); if (k < 1) person(x, S, 'host', 'grin', 540, 1780, 0.7, { seed: 2, alpha: 1 - k }); leopard(x, 500, 1780, 1.1 * k, S.T); } });
  stage(T, { desc: 'dojo hall with six scrolls', bg: 'sixPowers', t0: tAndT, t1: end('type'), times: [W('type', /^and$/), W('type', /^can/), W('type', /^even/), W('type', /^awaken/)],
    labels: ['LEOPARD', 'HYBRID', 'SHOCK', 'AWAKENED'], bar: 'CAT POWERS', haloRgb: '255,200,110', icon: nekoIcon });

  // ---------------- POWER 1: full leopard ----------------
  const tDead = W('power1', /^deadly/) - 0.1;
  addSplit({ name: 'Power 1 (grass plain): the leopard-host sprints across the plain with speed lines; gold FULL LEOPARD banner', t0: st('power1'), t1: end('power1'), bg: 'grassPlain',
    cam: [[1.05, 540, 1000, -0.02], [1.1, 560, 990, -0.01]], banners: [['FULL LEOPARD', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.2, 'zip'], [W('power1', /^fast/) - st('power1'), 'whoosh']],
    draw(x, S) { const u = (S.T * 0.7) % 1; leopard(x, lerp(-200, 1300, u), 1600, 0.9, S.T, { run: true }); A.speedLines(x, lerp(-200, 1300, u) - 300, 1350, S.T, 12, 260, Math.PI); } },
    tDead, [[1.2, 540, 1200, 0.02], [1.28, 560, 1190, 0.035]], 'Power 1 pounce (same plain): the leopard lands in front of the bandit, who drops his knife; !?');
  const p1 = T.shots[T.shots.length - 1];
  p1.draw = function (x, S) { const k = ease.outCubic(prog(S.T, tDead, tDead + 0.4)); const e = person(x, S, 'bandit', 'shock', 840, 1780, 0.6, { seed: 3, pose: 'shrug', flip: true }); leopard(x, lerp(-100, 400, k), 1780 - Math.sin(k * Math.PI) * 300, 1.0, S.T); A.mark(x, '!?', e.head[0] + 140, e.head[1] - 200, pop(S.T, tDead + 0.3)); };

  // ---------------- POWER 2: hybrid ----------------
  const tFights = W('power2', /^fights/) - 0.1;
  addSplit({ name: 'Power 2 evolve (island courthouse): leopard icon becomes the hybrid icon, flash + glow ring; orange HYBRID banner; the host bulks up into a huge spotted leopard-man with cat ears', t0: st('power2'), t1: end('power2'), bg: 'courthouse',
    cam: [[1.0, 540, 980, 0], [1.06, 540, 960, -0.02]], banners: [['HYBRID FORM', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^half-leopard/) - st('power2'), 'inflate'], [tFights - st('power2') + 0.3, 'impact']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, nekoIcon)) return;
      const k = ease.outBack(prog(S.T, W('power2', /^half-leopard/) - 0.2, W('power2', /^half-leopard/) + 0.4));
      const e = person(x, S, 'bandit', k > 0.5 ? 'shock' : 'smug', 900, 1780, 0.56, { seed: 3, pose: 'shrug', flip: true, pop: S.t0 + 0.45 });
      person(x, S, k > 0.5 ? 'lucciHybrid' : 'host', k > 0.5 ? 'grin' : 'calm', 420, 1780, 0.62 + 0.18 * k, { seed: 2, pose: 'cheer', sx: 1 + 0.2 * k });
      if (k > 0.5) A.mark(x, '!?', e.head[0] - 130, e.head[1] - 190, pop(S.T, W('power2', /^half-leopard/) + 0.3));
    } },
    tFights, [[1.2, 600, 1150, 0.03], [1.28, 620, 1140, 0.045]], 'Power 2 fight (same courthouse): the leopard-man throws a person-style punch; star and shake');
  const p2 = T.shots[T.shots.length - 1];
  p2.draw = function (x, S) { const hit = S.T > tFights + 0.3; const e = person(x, S, 'bandit', hit ? 'hit' : 'shock', 860, 1780, 0.56, { seed: 3, pose: 'shrug', flip: true, rot: hit ? 0.3 : 0 }); person(x, S, 'lucciHybrid', 'shout', 420, 1780, 0.8, { seed: 2, pose: 'punch', sx: 1.2 });
    if (hit) { A.impactStar(x, e.head[0], e.head[1] + 80, 170 * (1 - prog(S.T, tFights + 0.5, tFights + 0.9)), 0.3); if (S.T < tFights + 0.3 + 7 * F) S.shake = 0.9; } };

  // ---------------- POWER 3: Rokuogan ----------------
  const tShock = W('power3', /^shockwave/) - 0.1;
  add({ name: 'Power 3 evolve (tower rooftop): hybrid icon becomes the shockwave icon; the leopard-man presses both fists to the bandit\'s chest and a white shockwave ring blasts out; purple ROKUOGAN banner; 7-frame shake', t0: st('power3'), t1: end('power3'), bg: 'towerRoof',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['ROKUOGAN', 'pink', W('power3', /^Rokuogan/) - 0.1, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^Six/) - st('power3'), 'charge'], [tShock - st('power3'), 'quake']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, nekoIcon)) return;
      const hit = S.T > tShock;
      const e = person(x, S, 'bandit', hit ? 'hit' : 'worried', hit ? 820 + 120 * prog(S.T, tShock, tShock + 0.5) : 760, 1780, 0.58, { seed: 3, pose: 'shrug', flip: true, rot: hit ? 0.4 * prog(S.T, tShock, tShock + 0.5) : 0, pop: S.t0 + 0.45 });
      person(x, S, 'lucciHybrid', 'shout', 420, 1780, 0.8, { seed: 2, pose: 'punch', sx: 1.2, pop: S.t0 + 0.45 });
      if (hit) { shockRing(x, 690, 1250, prog(S.T, tShock, tShock + 0.8)); if (S.T < tShock + 7 * F) S.shake = 1.2; }
    } });

  // ---------------- AWAKENING (peak) ----------------
  const tStr = W('awaken', /^stronger/) - 0.1;
  add({ name: 'Awakening (futuristic lab): the shockwave icon gives way to the awakened icon, white halo; gold AWAKENED banner; white flash; the leopard-man\'s fur turns pale white with a cloudy white aura', t0: st('awaken'), t1: tStr, bg: 'futureLab',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 940, 0.02]], banners: [['AWAKENED', 'gold', W('awaken', /^awaken/) - 0.1, end('awaken'), 'slide']], sfx: [[0, 'evolve'], [W('awaken', /^awaken/) - st('awaken'), 'charge']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,255,255', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5), '255,255,255'); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, nekoIcon); return; }
      const ta = W('awaken', /^awaken/), aw = S.T > ta + 0.1;
      if (aw) whiteAura(x, 540, 1300, 380, S.T);
      person(x, S, aw ? 'lucciAwake' : 'lucciHybrid', 'grin', 540, 1780, 0.82, { seed: 7, pose: 'cheer', sx: 1.2 });
      if (S.T > ta) { S.flash = Math.max(S.flash, 0.9 * (1 - prog(S.T, ta, ta + 0.4))); S.flashCol = '255,255,255'; }
    } });
  add({ name: 'Awakened speed (same lab, wide): the white leopard-man blurs across the room in a zig-zag of after-images and flattens the bandit; impact star, shake', t0: tStr, t1: end('awaken'), bg: 'futureLab',
    cam: [[1.0, 540, 1000, -0.02], [1.06, 560, 990, -0.04]], sfx: [[0.1, 'zip'], [0.6, 'impact']],
    draw(x, S) { const u = ease.smoother(prog(S.t, 0, 0.6)); for (let i = 0; i < 4; i++) { const v = Math.max(0, u - i * 0.12); person(x, S, 'lucciAwake', 'shout', lerp(160, 560, v), 1780, 0.66, { seed: 7, pose: 'punch', sx: 1.15, alpha: i ? 0.25 : 1 }); }
      const hit = S.t > 0.6; const e = person(x, S, 'bandit', hit ? 'hit' : 'shock', 860, 1780, 0.56, { seed: 3, pose: 'shrug', flip: true, rot: hit ? 1.2 * prog(S.t, 0.6, 1.0) : 0 });
      if (hit) { A.impactStar(x, 820, 1250, 200 * (1 - prog(S.t, 0.8, 1.2)), 0.3); if (S.t < 0.6 + 7 * F) S.shake = 1.1; } } });

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (iron cage in the dark): yellow eyes glow behind the bars; push-in with roll, low sting; red SCARY PART banner', t0: st('twist'), t1: end('twist'), bg: 'beastCage', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 980, 0.07]], banners: [['THE SCARY PART', 'red', st('twist') + 0.3, end('twist')]], sfx: [[0, 'sting'], [0.5, 'shock']],
    draw(x, S) { } });
  const tStay = W('truth', /^but/) - 0.1;
  add({ name: 'Mind takeover (mind spiral): a wild beast silhouette swirls in on the spiral, trying to swallow a little Lucci head; purple TAKEOVER banner', t0: st('truth'), t1: tStay, bg: 'mindSpiral',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 540, 990, -0.04]], banners: [['MIND TAKEOVER', 'pink', W('truth', /^take/) - 0.1, tStay]], sfx: [[0, 'whoosh'], [0.5, 'rumble']],
    draw(x, S) { x.save(); x.translate(540, 900); x.rotate(S.T * 0.8); x.translate(-540, -900); leopard(x, 600, 1100, 1.3, S.T, { white: true }); x.restore(); A.mark(x, '!?', 800, 600, pop(S.T, S.t0 + 0.4)); } });
  add({ name: 'Still himself (same spiral fades): calm Lucci in his top hat, pigeon on his shoulder, unbothered; green STILL HIMSELF banner', t0: tStay, t1: end('truth'), bg: 'mindSpiral',
    cam: [[1.15, 540, 1000, 0.02], [1.22, 540, 990, 0.035]], banners: [['STILL HIMSELF', 'green', tStay + 0.2, end('truth')]], sfx: [[0.1, 'ding']],
    draw(x, S) { const l = person(x, S, 'lucci', 'calm', 540, 1800, 0.84, { seed: 8, pose: 'idle' }); pigeon(x, l.head[0] + 210, l.head[1] + 280, 0.8); } });

  // ---------------- USERS ----------------
  const tLuffy = W('users', /^fought/) - 0.1;
  add({ name: 'Rob Lucci (island courthouse): Lucci in his black suit and top hat, pigeon on his shoulder; blue CP9 + CP0 banner', t0: st('users'), t1: tLuffy, bg: 'courthouse',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['CP9 + CP0', 'blue', W('users', /^CP9/) - 0.1, tLuffy]], sfx: [[0, 'whoosh']],
    draw(x, S) { const l = person(x, S, 'lucci', 'smug', 540, 1820, 0.84, { pop: S.t0 + 0.05, seed: 8, pose: 'idle' }); pigeon(x, l.head[0] + 210, l.head[1] + 280, 0.8); } });
  add({ name: 'Versus Luffy (futuristic egg-dome island): the awakened leopard-man squares off against Luffy; red VS LUFFY banner', t0: tLuffy, t1: end('users'), bg: 'eggheadIsle',
    cam: [[1.0, 540, 1000, -0.02], [1.08, 540, 990, 0.03]], banners: [['ENIES LOBBY + EGGHEAD', 'red', tLuffy + 0.3, end('users')]], sfx: [[0.1, 'whoosh'], [0.6, 'impact']],
    draw(x, S) { whiteAura(x, 780, 1350, 300, S.T); person(x, S, 'lucciAwake', 'shout', 780, 1800, 0.7, { seed: 7, pose: 'punch', flip: true, sx: 1.15 }); person(x, S, 'luffy', 'shout', 280, 1800, 0.66, { seed: 4, pose: 'punch' }); A.impactStar(x, 530, 1200, 120 * Math.abs(Math.sin(S.T * 3)), 0.3); } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (night rooftops): the host trips off a roof, flips mid-air and lands perfectly on his feet like a cat, then sips his coffee; green ALWAYS LANDS banner', t0: st('joke'), t1: end('joke'), bg: 'catRooftops',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['PERFECT LANDING', 'green', W('joke', /^feet/) - 0.1, end('joke')]], sfx: [[0.2, 'whoosh'], [0.8, 'thunk'], [W('joke', /^feet/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const k = ease.outCubic(prog(S.t, 0.1, 0.8)); x.save(); x.translate(540, lerp(900, 1780, k)); x.rotate((1 - k) * 6.283); const h = person(x, S, 'host', k >= 1 ? 'smug' : 'shock', 0, 0, 0.72, { seed: 11, pose: k >= 1 ? 'hold' : 'cheer' }); x.restore();
      if (k >= 1) { A.mug(x, 540 + h.hand.R[0] + 16, 1780 + h.hand.R[1] - 8, 0.9, S.T, true, false); A.sparkle(x, 380, 1700, 40 * Math.abs(Math.sin(S.T * 5))); } } });

  ending(T, { TL, fruit });
  return finish();
}
