// Shot plan for the Bari Bari no Mi (Barrier-Barrier Fruit) short.
// Structure follows the fruit's real uses: the barrier wall, barrier stairs, the barrier ball, and Barrier Bulls as the peak.
import * as A from '/engine/art.js';
import { drawSwirlFruit } from '/engine/swirlFruit.js';
import { F, ease, prog, lerp, pop, person, halo, evolve } from '/engine/kit.js';
import { timing, opening, stage, evolveIn, ending } from '/engine/template.js';
const fruit = (x, cx, cy, R, rot, o = {}) => drawSwirlFruit(x, cx, cy, R, rot, { pal: 'blue', ...o });

// ---------------- barrier effects ----------------
// see-through barrier panel centred at (cx, cy); k = 0..1 grow-in; crack = 0..1
export function barrier(x, cx, cy, w, h, k = 1, crack = 0) {
  if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k);
  A.rrect(x, -w / 2, -h / 2, w, h, 30); x.fillStyle = 'rgba(150,220,255,0.35)'; x.fill(); x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 6; x.strokeStyle = '#bff0ff'; x.stroke();
  x.save(); A.rrect(x, -w / 2, -h / 2, w, h, 30); x.clip(); x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 3;
  for (let yy = -h / 2; yy < h / 2; yy += 60) for (let xx = -w / 2 + ((yy / 60) % 2 ? 35 : 0); xx < w / 2; xx += 70) { x.beginPath(); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; x.lineTo(xx + Math.cos(a) * 34, yy + Math.sin(a) * 34); } x.closePath(); x.stroke(); }
  x.beginPath(); x.moveTo(-w / 2 + 30, -h / 2 + 60); x.lineTo(-w / 2 + 90, -h / 2 + 20); x.lineWidth = 10; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke();
  if (crack > 0) { x.beginPath(); x.moveTo(0, 0); x.lineTo(w * 0.2 * crack, -h * 0.25 * crack); x.moveTo(0, 0); x.lineTo(-w * 0.25 * crack, h * 0.1 * crack); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke(); }
  x.restore(); x.restore();
}
function bubbleBall(x, cx, cy, r, t) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = 'rgba(150,220,255,0.3)'; x.fill(); x.lineWidth = 12; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 6; x.strokeStyle = '#bff0ff'; x.stroke();
  x.beginPath(); x.arc(cx - r * 0.3, cy - r * 0.35, r * 0.25, Math.PI * 1.1, Math.PI * 1.5); x.lineWidth = 12; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke(); }
function horns(x, cx, cy, s) { for (const sd of [-1, 1]) { x.save(); x.translate(cx, cy); x.scale(sd * s, s); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(120, -20, 150, -140); x.quadraticCurveTo(90, -60, 0, -50); x.closePath(); x.fillStyle = 'rgba(190,240,255,0.7)'; x.fill(); x.lineWidth = 8; x.strokeStyle = A.OL; x.stroke(); x.restore(); } }
function pica(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.arc(0, 0, 230, 0, 7); A.fs(x, '#a89a8a', 12); for (const k of [-1, 0, 1]) { x.beginPath(); x.moveTo(k * 80, -200); x.lineTo(k * 80, -90); x.lineWidth = 10; x.strokeStyle = A.OL; x.stroke(); } x.fillStyle = 'rgba(80,60,40,0.3)'; for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(-100 + i * 40, 60 + (i % 2) * 40, 18, 0, 7); x.fill(); } x.restore(); }
function scroll(x, cx, cy, s, t) { x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(Math.sin(t * 1.2) * 0.02); A.rrect(x, -180, -420, 360, 840, 10); A.fs(x, '#f2e6c8', 10); A.rrect(x, -210, -450, 420, 40, 14); A.fs(x, '#6b4630', 8); A.rrect(x, -210, 410, 420, 40, 14); A.fs(x, '#6b4630', 8);
  x.globalAlpha = 0.55; x.beginPath(); x.arc(0, -120, 90, 0, 7); x.fillStyle = '#5a5a6a'; x.fill(); x.beginPath(); x.moveTo(-140, 300); x.quadraticCurveTo(-120, -20, 0, -20); x.quadraticCurveTo(120, -20, 140, 300); x.closePath(); x.fill(); x.globalAlpha = 1;
  x.font = `52px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = '#8a1a14'; x.fillText('SEMIMARU', 0, 380); x.restore(); }
export function barrierIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) barrier(x, 0, 0, 200, 260);
  else if (k === 2) { for (let i = 0; i < 4; i++) barrier(x, -90 + i * 60, 90 - i * 60, 110, 40); }
  else if (k === 3) { bubbleBall(x, 0, 0, 120, t); x.beginPath(); x.arc(0, 20, 40, 0, 7); A.fs(x, '#e8402e', 6); }
  else { A.glow(x, 0, 0, 180, '190,240,255', 0.6); barrier(x, 0, 20, 220, 160); horns(x, 0, -60, 0.6); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const T = timing(TL), { W, end, st, add, addSplit, finish } = T;
  opening(T, { fruit, desc: 'a light-blue swirl fruit', biteDesc: 'a see-through barrier pops up right in front of his face', biteSfx: 'ding', bannerCol: 'blue', biteCol: '#e0f2ff',
    biteFx(x, S, k) { barrier(x, 760, 780, 300, 380, ease.outBack(k)); },
    calmBg: 'iceRink', calmDesc: 'ice rink', seaHue: 'mint', seed: 37, nameRe: /^Barrier-Barrier/,
    revealBg: 'crystalCave', revealDesc: 'crystal cave', revealBanner: 'BARRIER-BARRIER FRUIT', haloRgb: '170,230,255',
    revealFx(x, S) { barrier(x, 540, 900, 640, 640, 1); } });

  // ---------------- TYPE + STAGE ----------------
  const tThat = W('type', /^that/) - 0.1, tAlmost = W('type', /^almost/) - 0.1;
  add({ name: 'See-through barriers (glass office lobby): the host flicks his fingers and a clear barrier panel snaps up between him and the luchador', t0: tThat, t1: tAlmost, bg: 'glassLobby',
    cam: [[1.0, 540, 1000, 0.02], [1.08, 540, 980, 0.03]], sfx: [[0.3, 'ding']],
    draw(x, S) { const k = ease.outBack(prog(S.t, 0.3, 0.6)); person(x, S, 'luchador', k > 0.5 ? 'shock' : 'smug', 860, 1780, 0.62, { seed: 3, pose: 'idle', flip: true }); barrier(x, 600, 1350, 260, 860, k); person(x, S, 'host', 'smug', 300, 1780, 0.66, { seed: 2, pose: 'raise' }); } });
  stage(T, { desc: 'arena under a glass dome', bg: 'domeArena', t0: tAlmost, t1: end('type'), times: [W('type', /^almost/), W('type', /^nothing/), W('type', /^can/), W('type', /^break/)],
    labels: ['WALL', 'STAIRS', 'BALL', 'BULLS'], bar: 'BARRIER TRICKS', haloRgb: '170,230,255', icon: barrierIcon });

  // ---------------- POWER 1: the wall ----------------
  const tStops = W('power1', /^stops/) - 0.1;
  addSplit({ name: 'Power 1 (rope bridge over a canyon): the host holds up an invisible wall; the luchador\'s flying kick slams into it; blue BARRIER WALL banner', t0: st('power1'), t1: end('power1'), bg: 'canyonBridge',
    cam: [[1.05, 560, 1000, -0.02], [1.1, 580, 990, -0.01]], banners: [['BARRIER WALL', 'blue', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[W('power1', /^wall/) - st('power1'), 'ding'], [tStops - st('power1') + 0.2, 'impact']],
    draw(x, S) {
      const tw = W('power1', /^wall/) - S.t0, hit = S.T > tStops + 0.2, ex = hit ? 760 + 80 * prog(S.T, tStops + 0.2, tStops + 0.6) : lerp(1000, 760, prog(S.T, tStops - 0.6, tStops + 0.2));
      person(x, S, 'host', 'smug', 260, 1780, 0.66, { seed: 2, pose: 'raise' }); barrier(x, 560, 1350, 240, 820, ease.outBack(prog(S.t, tw, tw + 0.3)));
      const e = person(x, S, 'luchador', hit ? 'hit' : 'shout', ex, 1780 - (hit ? 0 : 120), 0.62, { seed: 3, pose: 'punch', flip: true, rot: hit ? 0.3 : -0.2 });
      if (hit) { A.impactStar(x, 600, 1250, 170 * (1 - prog(S.T, tStops + 0.4, tStops + 0.8)), 0.3); if (S.T < tStops + 0.2 + 7 * F) S.shake = 0.9; A.mark(x, '!?', e.head[0] + 150, e.head[1] - 200, pop(S.T, tStops + 0.4)); }
    } },
    tStops, [[1.35, 600, 1250, 0.02], [1.42, 610, 1240, 0.035]], 'Power 1 close (same bridge): the kick stops dead against the barrier, star and shake');

  // ---------------- POWER 2: stairs ----------------
  const tClimb = W('power2', /^climb/) - 0.1;
  addSplit({ name: 'Power 2 evolve (sheer cliff): wall icon becomes the stairs icon, flash + glow ring; gold STAIRS banner; barrier steps pop up one by one and the host walks up them into the sky', t0: st('power2'), t1: end('power2'), bg: 'sheerCliff',
    cam: [[1.0, 540, 1000, 0], [1.06, 560, 960, -0.02]], banners: [['BARRIER STAIRS', 'gold', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^stairs/) - st('power2'), 'ding'], [tClimb - st('power2'), 'pop']],
    draw(x, S) {
      if (evolveIn(x, S, 1, 2, barrierIcon)) return;
      const ts = W('power2', /^stairs/) - S.t0;
      for (let i = 0; i < 6; i++) barrier(x, 500 + i * 90, 1650 - i * 170, 180, 60, ease.outBack(prog(S.t, ts + i * 0.12, ts + i * 0.12 + 0.25)));
      const u = ease.smoother(prog(S.T, tClimb, end('power2'))), step = Math.min(5, Math.floor(u * 6));
      person(x, S, 'host', 'grin', 500 + u * 450, 1620 - u * 850, 0.42, { seed: 2, pose: u > 0 ? 'cheer' : 'idle', pop: S.t0 + 0.45 });
    } },
    tClimb, [[1.1, 760, 1050, 0.03], [1.16, 800, 900, 0.045]], 'Power 2 climb (same cliff): the host strides up the floating steps above the clouds');

  // ---------------- POWER 3: ball ----------------
  add({ name: 'Power 3 evolve (playground): stairs icon becomes the ball icon; a barrier ball snaps shut around the luchador, who pounds on it from inside and rolls away; purple BALL banner', t0: st('power3'), t1: end('power3'), bg: 'playground',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['BARRIER BALL', 'blue', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^ball/) - st('power3'), 'ding'], [W('power3', /^ball/) - st('power3') + 0.4, 'thunk']],
    draw(x, S) {
      if (evolveIn(x, S, 2, 3, barrierIcon)) return;
      const tb = W('power3', /^ball/) - S.t0, k = ease.outBack(prog(S.t, tb, tb + 0.3)), roll = prog(S.t, tb + 0.6, S.dur) * 200;
      person(x, S, 'host', 'smug', 240, 1780, 0.64, { seed: 2, pose: 'raise', pop: S.t0 + 0.45 });
      const bx = 760 + roll, by = 1500; if (k > 0) { x.save(); x.translate(bx, by); x.rotate(roll / 260); x.translate(-bx, -by); }
      const e = person(x, S, 'luchador', k > 0 ? 'shout' : 'smug', bx, by + 260, 0.5, { seed: 3, pose: k > 0 ? 'cheer' : 'idle', flip: true, pop: S.t0 + 0.45 });
      if (k > 0) { x.restore(); bubbleBall(x, bx, by, 300 * k, S.T); A.mark(x, '!?', bx + 180, by - 340, pop(S.T, S.t0 + tb + 0.4)); }
    } });

  // ---------------- PEAK: Barrier Bulls ----------------
  const tPlow = W('peak', /^plow/) - 0.1;
  addSplit({ name: 'Peak (sunny bullring): the ball icon gives way to the horned-barrier icon, gold halo; gold BARRIER BULLS banner; the host crouches behind a horned barrier', t0: st('peak'), t1: end('peak'), bg: 'bullRing',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 950, 0.02]], banners: [['BARRIER BULLS', 'gold', W('peak', /^Barrier/) - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [W('peak', /^Barrier/) - st('peak'), 'charge'], [W('peak', /^charge/) - st('peak'), 'rumble'], [tPlow - st('peak') + 0.3, 'impact']],
    draw(x, S) {
      halo(x, 540, 900, 620, '170,230,255', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5), '190,240,255'); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, barrierIcon); return; }
      const u = ease.smoother(prog(S.T, W('peak', /^charge/), tPlow + 0.3)), hx = lerp(200, 560, u);
      person(x, S, 'host', 'shout', hx, 1780, 0.64, { seed: 7, pose: 'punch' }); barrier(x, hx + 230, 1400, 220, 640, 1); horns(x, hx + 230, 1100, 0.9);
      if (u > 0 && u < 1) { A.speedLines(x, hx - 200, 1300, S.T, 10, 220, Math.PI); for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(hx - 100 - i * 60, 1770, 30 - i * 5, 0, 7); x.fillStyle = 'rgba(210,180,130,0.6)'; x.fill(); } }
      if (S.T > W('peak', /^Barrier/)) { S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, W('peak', /^Barrier/), W('peak', /^Barrier/) + 0.3))); S.flashCol = '220,245,255'; }
    } },
    tPlow, [[1.0, 640, 1000, -0.02], [1.08, 680, 990, -0.04]], 'Peak impact (same bullring): the luchador and two more go flying off the horned barrier; impact star, 7-frame shake');
  const pk = T.shots[T.shots.length - 1], pkd = pk.draw;
  pk.draw = function (x, S) { const hit = S.T > tPlow + 0.3, f = prog(S.T, tPlow + 0.3, tPlow + 1.0);
    for (let i = 0; i < 2; i++) person(x, S, 'luchador', hit ? 'hit' : 'shock', 860 + i * 140 + f * 300, 1780 - f * 500 * (1 + i * 0.3), 0.5, { seed: 3 + i, pose: 'cheer', flip: true, rot: f * (2 + i) });
    pkd.call(this, x, S);
    if (hit) { A.impactStar(x, 860, 1300, 200 * (1 - prog(S.T, tPlow + 0.5, tPlow + 0.9)), 0.3); if (S.T < tPlow + 0.3 + 7 * F) S.shake = 1.1; } };

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (city at night): a single barrier glows on an empty street; push-in with roll, low sting; red WEAKNESS banner', t0: st('twist'), t1: end('twist'), bg: 'cityNight', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 1000, 0.07]], banners: [['WEAKNESS', 'red', W('twist', /^weakness/) - 0.1, end('twist')]], sfx: [[0, 'sting']],
    draw(x, S) { barrier(x, 540, 1300, 360, 600, pop(S.T, S.t0 + 0.1)); A.mark(x, '?', 820, 900, pop(S.T, S.t0 + 0.5), 0.2); } });
  const tTime = W('truth', /^time/) - 0.1;
  add({ name: 'One at a time (rubble-strewn town): the host blocks one stone fist with a barrier, but a second giant stone fist swings in from the other side and he can\'t raise another; red ONE AT A TIME banner; impact, shake', t0: st('truth'), t1: end('truth'), bg: 'rubbleTown',
    cam: [[1.05, 540, 1000, -0.02], [1.15, 560, 990, -0.04]], banners: [['ONE AT A TIME', 'red', W('truth', /^one/) - 0.1, end('truth')]], sfx: [[0.2, 'impact'], [tTime - st('truth'), 'whoosh'], [tTime - st('truth') + 0.35, 'impact']],
    draw(x, S) {
      const hit = S.T > tTime + 0.35;
      const h = person(x, S, 'host', hit ? 'hit' : 'worried', 540, 1780, 0.64, { seed: 2, pose: 'raise', rot: hit ? 0.2 : 0 });
      barrier(x, 300, 1250, 200, 560, 1, prog(S.t, 0.2, 0.6)); pica(x, lerp(-200, 60, ease.outCubic(prog(S.t, 0, 0.25))), 1150, 0.9);
      pica(x, lerp(1300, 860, ease.outCubic(prog(S.T, tTime, tTime + 0.35))), 1150, 0.9);
      if (hit) { A.impactStar(x, h.head[0] + 150, h.head[1] + 100, 180 * (1 - prog(S.T, tTime + 0.5, tTime + 0.9)), 0.3); if (S.T < tTime + 0.35 + 7 * F) S.shake = 1.0; }
    } });

  // ---------------- USERS ----------------
  const tSemi = W('users', /^before/) - 0.1;
  add({ name: 'Bartolomeo (superfan bedroom full of straw-hat posters): Bartolomeo cries happy tears in front of his Luffy posters; green BIGGEST FAN banner', t0: st('users'), t1: tSemi, bg: 'fanRoom',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], banners: [['LUFFY\'S BIGGEST FAN', 'green', W('users', /^Luffy/) - 0.1, tSemi]], sfx: [[0, 'whoosh'], [0.4, 'shimmer']],
    draw(x, S) { const b = person(x, S, 'bartolomeo', 'grin', 540, 1820, 0.84, { pop: S.t0 + 0.05, seed: 8, pose: 'cheer' }); for (const sd of [-1, 1]) { const ph = (S.T * 2 + (sd > 0 ? 0.5 : 0)) % 1; x.beginPath(); x.ellipse(b.head[0] + sd * 110, b.head[1] + 60 + ph * 200, 14, 22, 0, 0, 7); x.fillStyle = 'rgba(120,200,255,0.9)'; x.fill(); } } });
  add({ name: 'Semimaru (old Wano hall): a faded hanging scroll portrait labelled SEMIMARU swings into view; purple BEFORE HIM banner', t0: tSemi, t1: end('users'), bg: 'scrollHall',
    cam: [[1.0, 540, 980, -0.02], [1.08, 540, 960, 0.03]], banners: [['BEFORE HIM', 'pink', tSemi + 0.2, end('users')]], sfx: [[0.1, 'swish']],
    draw(x, S) { scroll(x, 540, lerp(500, 980, ease.outBack(prog(S.t, 0, 0.5))), 1.0, S.T); barrier(x, 840, 1500, 160, 220, pop(S.T, S.t0 + 0.7)); } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (rainy meadow): rain pours down everywhere except on the host, who strolls along dry under a barrier roof; blue NEVER WET banner', t0: st('joke'), t1: end('joke'), bg: 'rainyMeadow',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['NEVER WET', 'blue', W('joke', /^rained/) - 0.1, end('joke')]], sfx: [[0.2, 'splash'], [W('joke', /^rained/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) { const h = person(x, S, 'host', 'smug', 540, 1780, 0.76, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug', talk: true }); barrier(x, 540, h.head[1] - 260, 520, 60, 1);
      x.fillStyle = 'rgba(200,230,255,0.9)'; for (let i = 0; i < 8; i++) { const ph = (S.T * 2 + i / 8) % 1; x.beginPath(); x.arc(300 + i * 70, h.head[1] - 300 + ph * 30, 6, 0, 7); x.fill(); } } });

  ending(T, { TL, fruit });
  return finish();
}
