// Shot plan for the Ope Ope no Mi (Op-Op Fruit) short. New sets and effects; same script skeleton.
import * as A from '/engine/art.js';
import { drawOpe } from '/shorts/ope/fruit.js';
import { F, ease, prog, lerp, pop, person, deskFront, halo, evolve } from '/engine/kit.js';

// ---------------- operation effects ----------------
function room(x, cx, cy, r, t, a = 1) { // the blue spherical "Room"
  if (r <= 0) return;
  x.save(); x.globalAlpha = a;
  const g = x.createRadialGradient(cx, cy, r * 0.2, cx, cy, r); g.addColorStop(0, 'rgba(120,200,255,0.10)'); g.addColorStop(1, 'rgba(80,160,255,0.35)');
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = g; x.fill(); x.lineWidth = 10; x.strokeStyle = '#4fb3ff'; x.stroke();
  x.lineWidth = 3; x.strokeStyle = 'rgba(180,230,255,0.7)';
  for (let i = 1; i < 6; i++) { x.beginPath(); x.ellipse(cx, cy, r, r * i / 6, 0, 0, 7); x.stroke(); x.beginPath(); x.ellipse(cx, cy, r * i / 6, r, 0, 0, 7); x.stroke(); }
  x.beginPath(); x.arc(cx, cy, r * 0.92, Math.PI * 1.1, Math.PI * 1.4); x.lineWidth = 12; x.strokeStyle = 'rgba(255,255,255,0.8)'; x.stroke();
  x.restore();
}
let SLICE; // offscreen stage-sized canvas for slicing a character into floating pieces
function slicedPerson(x, S, who, expr, cx, fy, s, k, o = {}) {
  if (!SLICE) SLICE = A.mk(1080, 1920);
  const c = SLICE.getContext('2d'); c.clearRect(0, 0, 1080, 1920);
  const h = person(c, S, who, expr, cx, fy, s, o);
  const top = fy - 1700 * s, H = 1700 * s, cuts = [0, 0.3, 0.55, 1];
  for (let i = 0; i < 3; i++) {
    const y0 = top + H * cuts[i], y1 = top + H * cuts[i + 1], dx = (i - 1) * 90 * k * (i % 2 ? -1 : 1), dy = (i - 1) * 60 * k + Math.sin(S.T * 3 + i) * 12 * k;
    x.drawImage(SLICE, 0, y0, 1080, y1 - y0, dx, y0 + dy, 1080, y1 - y0);
    if (k > 0.05 && i < 2) { x.beginPath(); x.moveTo(cx - 260 * s + dx, y1 + dy); x.lineTo(cx + 260 * s + dx, y1 + dy); x.lineWidth = 6; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke(); }
  }
  return h;
}
function heartCube(x, cx, cy, s, t) { // a heart beating inside a translucent cube
  if (s <= 0) return;
  const b = 1 + 0.12 * Math.max(0, Math.sin(t * 8)) ** 4;
  x.save(); x.translate(cx, cy); x.scale(s, s);
  A.glow(x, 0, 0, 160, '255,120,160', 0.5);
  x.beginPath(); x.rect(-90, -90, 180, 180); x.fillStyle = 'rgba(200,230,255,0.45)'; x.fill(); x.lineWidth = 10; x.strokeStyle = A.OL; x.stroke();
  x.beginPath(); x.moveTo(-90, -90); x.lineTo(-50, -130); x.lineTo(130, -130); x.lineTo(90, -90); x.moveTo(130, -130); x.lineTo(130, 50); x.lineTo(90, 90); x.stroke();
  x.save(); x.scale(b * 2.4, b * 2.4); x.beginPath(); x.moveTo(0, 22); x.bezierCurveTo(-34, 0, -20, -30, 0, -12); x.bezierCurveTo(20, -30, 34, 0, 0, 22); x.fillStyle = '#e8303c'; x.fill(); x.lineWidth = 3; x.strokeStyle = A.OL; x.stroke(); x.restore();
  x.restore();
}
function mask(x, h, s) { // surgical mask over the host's mouth
  x.save(); x.translate(h.head[0], h.head[1] + 110 * s); x.scale(s, s); A.rrect(x, -150, -70, 300, 150, 40); A.fs(x, '#bfe3f2', 9);
  x.lineWidth = 6; x.strokeStyle = '#8fbfd6'; for (const yy of [-20, 15]) { x.beginPath(); x.moveTo(-120, yy); x.lineTo(120, yy); x.stroke(); } x.restore();
}
function scalpel(x, hx, hy, s, rot) { x.save(); x.translate(hx, hy); x.rotate(rot); x.scale(s, s); A.rrect(x, -10, -12, 130, 24, 10); A.fs(x, '#8a95a8', 7); x.beginPath(); x.moveTo(120, -12); x.lineTo(190, -2); x.lineTo(120, 12); x.closePath(); A.fs(x, '#e6eef6', 7); x.restore(); }
function gammaBlade(x, x0, y0, x1, y1, t, a = 1) {
  x.save(); x.globalAlpha = a; x.lineCap = 'round';
  for (const [w, col] of [[60, 'rgba(90,200,255,0.25)'], [30, 'rgba(140,230,255,0.6)'], [12, '#ffffff']]) { x.beginPath(); x.moveTo(x0, y0); x.lineTo(x1, y1); x.lineWidth = w * (1 + 0.1 * Math.sin(t * 20)); x.strokeStyle = col; x.stroke(); }
  x.restore();
}
function skeleton(x, h, s, a) { // a glowing x-ray skeleton over a figure
  if (a <= 0) return;
  x.save(); x.globalAlpha = a; x.strokeStyle = '#bfe8ff'; x.lineWidth = 16 * s; x.lineCap = 'round'; x.shadowColor = '#4fb3ff'; x.shadowBlur = 30;
  const [hx, hy] = h.head; x.beginPath(); x.arc(hx, hy, 150 * s, 0, 7); x.stroke();
  x.beginPath(); x.moveTo(hx, hy + 200 * s); x.lineTo(hx, hy + 820 * s); x.stroke();
  for (let i = 0; i < 5; i++) { const yy = hy + (330 + i * 70) * s; x.beginPath(); x.moveTo(hx - 120 * s, yy + 20 * s); x.quadraticCurveTo(hx, yy - 20 * s, hx + 120 * s, yy + 20 * s); x.stroke(); }
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(hx, hy + 820 * s); x.lineTo(hx + sd * 70 * s, hy + 1300 * s); x.stroke(); }
  x.restore();
}
function hourglass(x, cx, cy, s, t, k) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  for (const yy of [-300, 300]) { A.rrect(x, -220, yy - 26, 440, 52, 18); A.fs(x, '#8a5a3c', 10); }
  x.beginPath(); x.moveTo(-170, -274); x.quadraticCurveTo(-170, -60, -20, 0); x.quadraticCurveTo(-170, 60, -170, 274); x.lineTo(170, 274); x.quadraticCurveTo(170, 60, 20, 0); x.quadraticCurveTo(170, -60, 170, -274); x.closePath();
  x.fillStyle = 'rgba(220,240,255,0.4)'; x.fill(); x.lineWidth = 10; x.strokeStyle = A.OL; x.stroke();
  x.fillStyle = '#ffc931'; x.beginPath(); x.moveTo(-150 * (1 - k), -60 - 180 * (1 - k)); x.lineTo(150 * (1 - k), -60 - 180 * (1 - k)); x.lineTo(0, -10); x.closePath(); x.fill();
  x.beginPath(); x.moveTo(-160, 270); x.lineTo(160, 270); x.lineTo(0, 270 - 200 * k); x.closePath(); x.fill();
  x.lineWidth = 6; x.strokeStyle = '#ffc931'; x.beginPath(); x.moveTo(0, -10); x.lineTo(0, 270 - 200 * k); x.stroke();
  x.restore();
}
function chessPiece(x, cx, by, s, king) { x.save(); x.translate(cx, by); x.scale(s, s); A.rrect(x, -70, -40, 140, 40, 10); A.fs(x, '#f4efe6', 9); x.beginPath(); x.moveTo(-45, -40); x.lineTo(-30, -200); x.lineTo(30, -200); x.lineTo(45, -40); x.closePath(); A.fs(x, '#f4efe6', 9);
  if (king) { x.beginPath(); x.arc(0, -230, 44, 0, 7); A.fs(x, '#f4efe6', 9); x.beginPath(); x.moveTo(0, -300); x.lineTo(0, -340); x.moveTo(-18, -322); x.lineTo(18, -322); x.lineWidth = 10; x.strokeStyle = A.OL; x.stroke(); } else { x.beginPath(); x.arc(0, -220, 36, 0, 7); A.fs(x, '#f4efe6', 9); } x.restore(); }
function chair(x, cx, by, s, col) { x.save(); x.translate(cx, by); x.scale(s, s); A.rrect(x, -60, -260, 120, 150, 14); A.fs(x, col, 8); A.rrect(x, -70, -120, 140, 30, 8); A.fs(x, col, 8); x.lineWidth = 12; x.strokeStyle = A.OL; x.beginPath(); x.moveTo(-55, -90); x.lineTo(-55, 0); x.moveTo(55, -90); x.lineTo(55, 0); x.stroke(); x.restore(); }
function swapFlash(x, a, b, k) { // Shambles: a ring at both ends while they trade places
  for (const [px, py] of [a, b]) { A.glowRing(x, px, py, 80 + 160 * k, 1 - k, '120,200,255'); }
}
export function opeIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) room(x, 0, 0, 120, t);
  else if (k === 2) { const p = (Math.sin(t * 3) + 1) / 2; chessPiece(x, lerp(-60, 60, p), 90, 0.45, true); chessPiece(x, lerp(60, -60, p), 90, 0.45, false); }
  else if (k === 3) heartCube(x, 0, 0, 0.7, t);
  else { gammaBlade(x, -120, 90, 120, -90, t); A.sparkle(x, 120, -90, 30); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const L = Object.fromEntries(TL.lines.map((l) => [l.id, l]));
  const W = (id, re) => { const l = L[id], w = l.words.find((w) => re.test(w.w)); if (!w) throw new Error(`word ${re} not in ${id}`); return l.start + w.t; };
  const end = (id) => L[id].start + L[id].dur, st = (id) => L[id].start;
  const shots = [], add = (o) => shots.push(o);

  // ---------------- HOOK ----------------
  const tDrop = 0.55, tShock = 0.9, tBite = W('hook', /^bite/), s2 = tBite - 0.4;
  add({ name: 'Hook (desk room): host sips coffee, the red heart-shaped fruit drops onto the plate, wide-eyed shock with !?', t0: 0, t1: s2, bg: 'desk',
    cam: [[1.0, 540, 980, 0], [1.07, 540, 950, 0]], sfx: [[0.1, 'sip'], [tDrop - 0.25, 'fall'], [tDrop + 0.3, 'thunk'], [tShock, 'shock']],
    draw(x, S) {
      const h = person(x, S, 'host', S.t < tShock ? 'calm' : 'shock', 540, 1900, 0.8, { pose: S.t > 0.05 && S.t < 0.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S);
      const k = prog(S.t, tDrop - 0.3, tDrop + 0.3);
      drawOpe(x, 290, lerp(-200, 1330, ease.outBounce(k)), 80, S.T * 0.6, { shadow: false });
      if (S.t > tDrop + 0.3 && S.t < tDrop + 0.3 + 7 * F) S.shake = 0.6;
      if (S.t > tShock) A.mark(x, '!?', h.head[0] + 230, h.head[1] - 230, pop(S.T, tShock));
    } });
  add({ name: 'The bite (desk close-up): dip, bite, disgusted face, a faint blue dome flickers around the host; pink YOUR FRUIT banner', t0: s2, t1: end('hook'), bg: 'desk',
    cam: [[1.4, 500, 1010, 0.02], [1.5, 490, 1000, 0.035]], banners: [['YOUR FRUIT', 'pink', W('hook', /^fruit/) - 0.1, end('hook')]],
    sfx: [[tBite - s2, 'crunch'], [tBite - s2 + 0.3, 'hum'], [W('hook', /^weird/) - s2, 'yuck']],
    draw(x, S) {
      const bt = tBite - s2, bitten = S.t >= bt, atMouth = S.t > bt - 0.35 && S.t < bt + 0.45, dip = S.t > bt - 2 * F && S.t < bt ? 16 : 0;
      if (bitten) room(x, 540, 900, 520 * ease.outCubic(prog(S.t, bt + 0.2, bt + 0.8)), S.T, 0.35 + 0.25 * Math.sin(S.T * 12));
      const h = person(x, S, 'host', bitten ? 'yuck' : 'calm', 540, 1900, 0.8, { pose: atMouth ? 'sip' : 'hold' });
      deskFront(x, S); A.mug(x, 830, 1330, 0.75, S.T, true, false);
      const fx = h.hand.R[0] - 18, fy = h.hand.R[1] - 48 + dip; drawOpe(x, fx, fy, 56, S.T * 0.4, { shadow: false });
      if (bitten) { x.beginPath(); x.arc(fx + 40, fy - 30, 22, 0, 7); x.fillStyle = '#fff1e0'; x.fill(); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke(); }
      S.flash = Math.max(S.flash, 0.45 * (1 - prog(S.t, bt, bt + 0.25)) * (bitten ? 1 : 0));
      if (bitten) A.mark(x, '!?', 820, 560, pop(S.T, tBite + 0.1));
    } });
  add({ name: 'Don\'t panic (soft pink hearts): the host calms down and holds up the bitten heart fruit, which pulses like a heartbeat', t0: st('calm'), t1: end('calm'), bg: 'hearts',
    cam: [[1.06, 540, 1000, -0.02], [1.12, 540, 990, 0.01]], sfx: [[0, 'whoosh'], [0.2, 'heartbeat'], [W('calm', /^Devil/) - st('calm'), 'shimmer']],
    draw(x, S) {
      const tj = W('calm', /^just/) - S.t0;
      const h = person(x, S, 'host', S.t < tj ? 'worried' : 'calm', 520, 1760, 0.8, { talk: true, seed: 1, pose: 'holdUp' });
      if (S.t < tj) A.sweat(x, h.head[0] + 190, h.head[1] - 60, pop(S.T, S.t0 + 0.3));
      const beat = 1 + 0.1 * Math.max(0, Math.sin(S.T * 7)) ** 6;
      drawOpe(x, h.hand.R[0] + 20, h.hand.R[1] - 70, 60 * beat, S.T * 0.4, { shadow: false });
      const td = W('calm', /^Devil/) - S.t0; A.sparkle(x, h.hand.R[0] - 20, h.hand.R[1] - 150, 36 * Math.sin(Math.PI * prog(S.t, td, td + 0.6)));
    } });

  // ---------------- OUT OF EVERY FRUIT + NAME ----------------
  const tName = W('name', /^Op-Op/) - 0.15, tThat = W('type', /^that/) - 0.1;
  add({ name: 'Out of every fruit: yellow rays, pink ゴ marks, spinning globe, dark unnamed fruit silhouettes', t0: st('sea'), t1: tName, bg: 'rays:yellow',
    cam: [[1.0, 540, 900, 0], [1.1, 540, 880, -0.04]], sfx: [[0, 'whoosh'], [0.1, 'rumble']],
    draw(x, S) {
      A.globe(x, 540, 860, 230 * pop(S.T, S.t0 + 0.05), S.T);
      for (let i = 0; i < 6; i++) { const a = -i / 6 * 6.283 - S.T * 0.6, p = pop(S.T, S.t0 + 0.12 + i * 0.18); if (p > 0) A.fruitSilhouette(x, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 300, 70 * p, i + 3); }
      A.gogo(x, 760, 280, S.T, pop(S.T, S.t0 + 0.1)); A.gogo(x, 110, 1000, S.T + 1, 0.7 * pop(S.T, S.t0 + 0.6));
    } });
  add({ name: 'Fruit reveal (heart monitor): the Op-Op Fruit beats in time with the ECG line; pink OP-OP FRUIT banner', t0: tName, t1: tThat, bg: 'ecg',
    cam: [[1.05, 540, 900, 0.02], [1.16, 540, 880, 0]], banners: [['OP-OP FRUIT', 'pink', tName + 0.1, tThat]], sfx: [[0, 'whoosh'], [0.1, 'ding'], [0.3, 'heartbeat']],
    draw(x, S) {
      halo(x, 540, 880, 470, '255,90,120', S.T);
      const beat = 1 + 0.1 * Math.max(0, Math.sin(S.T * 7)) ** 6;
      drawOpe(x, 540, 900, 260 * pop(S.T, S.t0) * beat, S.t * 0.7);
      for (let i = 0; i < 6; i++) { const ph = (S.T * 0.7 + i / 6) % 1; A.sparkle(x, 540 + Math.cos(i * 1.7) * 360, 880 + Math.sin(i * 2.3) * 360, 36 * Math.sin(Math.PI * ph)); }
    } });

  // ---------------- SURGEON + STAGE ----------------
  const tWith = W('type', /^with/) - 0.1;
  add({ name: 'The surgeon (operating room): the host snaps on a surgical mask and twirls a scalpel under the big lamp', t0: tThat, t1: tWith, bg: 'surgery',
    cam: [[1.08, 540, 1000, 0.02], [1.15, 540, 980, 0.03]], sfx: [[0.2, 'snap'], [0.6, 'swish']],
    draw(x, S) {
      const h = person(x, S, 'host', 'smug', 540, 1780, 0.8, { seed: 2, pose: 'holdUp' });
      if (S.t > 0.2) mask(x, h, 0.8 * pop(S.T, S.t0 + 0.2));
      scalpel(x, h.hand.R[0], h.hand.R[1] - 20, 1.0 * pop(S.T, S.t0 + 0.5), -1.2 + Math.sin(S.T * 6) * 0.4);
      A.sparkle(x, h.hand.R[0] + 40, h.hand.R[1] - 200, 30 * Math.abs(Math.sin(S.T * 5)));
    } });
  const pw = [W('type', /^with/), W('type', /^whole/), W('type', /^list/), W('type', /^operations/)], lvl = pw[3] + 0.4;
  const stageDraw = (x, S) => {
    const xs = [165, 415, 665, 915], lit = pw.filter((t) => S.T >= t).length;
    const fill = lit === 0 ? 0 : (lit - 1) / 4 + 0.25 * ease.outCubic(prog(S.T, pw[lit - 1], pw[lit - 1] + 0.3));
    A.progressBar(x, 540, 560, 900, fill, S.T > lvl ? 'LEVEL UP!' : 'OPERATIONS');
    if (S.T > lvl) A.shineLines(x, 540, 560, 470, 620, S.T, 12);
    xs.forEach((px, i) => {
      if (i === lit - 1) halo(x, px, 860, 210, i === 3 ? '255,220,90' : '120,200,255', S.T);
      A.pedestal(x, px, 990, `FORM ${i + 1}`, i < lit);
      const p = pop(S.T, pw[i]); if (p > 0) opeIcon(x, i + 1, px, 860 + Math.sin(S.T * 2 + i) * 10, 0.62 * p, S.T);
      else { x.font = `110px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = 'rgba(80,120,160,0.35)'; x.fillText('?', px, 900); }
    });
  };
  add({ name: 'Clinic hall stage: FORM 1-4 operations pop onto pedestals one per word, the bar fills, LEVEL UP', t0: tWith, t1: end('type'), bg: 'clinic',
    cam: [[1.0, 540, 980, 0], [1.12, 600, 900, 0.03]], sfx: [[0, 'whoosh'], ...pw.map((t) => [t - tWith, 'pop']), [lvl - tWith, 'levelup']], draw: stageDraw });

  // ---------------- FORM 1: Room + slicing ----------------
  const tAnd1 = W('form1', /^and$/) - 0.1, tSlice = W('form1', /^slice/);
  add({ name: 'Form 1 close-up (pine forest path): the host raises a hand and a huge blue Room dome spreads out, shine lines; scope overlay on the chef', t0: st('form1'), t1: tAnd1, bg: 'forest',
    cam: [[1.05, 540, 1000, -0.03], [1.14, 540, 960, -0.01]], sfx: [[0.1, 'room'], [W('form1', /^Room/) - st('form1'), 'hum']],
    draw(x, S) {
      const r = 900 * ease.outCubic(prog(S.t, 0.2, 1.6));
      const h = person(x, S, 'host', 'grin', 540, 1780, 0.78, { seed: 2, pose: 'raise' });
      room(x, h.hand.L[0], h.hand.L[1], r, S.T);
      A.shineLines(x, h.hand.L[0], h.hand.L[1], 90, 220, S.T, 10);
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.6); if (p <= 0) return; x.save(); x.translate(860, 470); x.scale(p, p);
      A.scopeOverlay(x, 0, 0, 150, S.T, (c) => { person(c, S, 'chef', 'smug', 0, 180, 0.17, { seed: 4, pose: 'idle' }); });
      x.font = `44px ${A.FONT}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = A.OL; x.strokeText('IN ROOM', 0, 200); x.fillStyle = '#5fe07a'; x.fillText('IN ROOM', 0, 200); x.restore(); } });
  add({ name: 'Form 1 reaction (ship galley): the chef is sliced into three floating pieces that are still alive; white cut lines, chef shocked !?', t0: tAnd1, t1: end('form1'), bg: 'kitchen',
    cam: [[1.08, 560, 1000, 0.03], [1.14, 560, 980, 0.04]], sfx: [[tSlice - tAnd1, 'slash'], [tSlice - tAnd1 + 0.1, 'swish'], [tSlice - tAnd1 + 0.5, 'shock']],
    draw(x, S) {
      room(x, 540, 1000, 900, S.T, 0.6);
      const k = ease.outBack(prog(S.T, tSlice, tSlice + 0.5));
      const e = slicedPerson(x, S, 'chef', S.T > tSlice ? 'shock' : 'smug', 640, 1780, 0.74, k, { seed: 3, pose: 'shrug' });
      const sw = prog(S.T, tSlice - 0.15, tSlice + 0.1); if (sw > 0 && sw < 1) { x.beginPath(); x.moveTo(lerp(-100, 1180, sw) - 200, 1100); x.lineTo(lerp(-100, 1180, sw), 1100); x.lineWidth = 14; x.strokeStyle = '#ffffff'; x.lineCap = 'round'; x.stroke(); }
      if (S.T > tSlice) A.mark(x, '!?', e.head[0] + 220, e.head[1] - 260, pop(S.T, tSlice + 0.4));
      if (S.T > tSlice && S.T < tSlice + 7 * F) S.shake = 0.8;
    } });

  // ---------------- FORM 2: Shambles ----------------
  const tEven = W('form2', /^even/) - 0.1;
  add({ name: 'Form 2 evolve (giant chessboard): ghost of the Room dissolves into the swap icon, flash + glow ring; gold FORM 2 banner; a king and a pawn trade places', t0: st('form2'), t1: tEven, bg: 'chessboard',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, -0.02]], banners: [['FORM 2', 'gold', st('form2') + 0.3, tEven, 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('form2', /^swap/) - st('form2'), 'zip']],
    draw(x, S) {
      if (S.t < 0.5) evolve(x, S, 1, 2, 540, 760, 1.4, 0.45, opeIcon);
      const ts = W('form2', /^swap/), k = prog(S.T, ts, ts + 0.12), sw = S.T > ts + 0.06;
      chessPiece(x, sw ? 780 : 300, 1250, 1.7 * pop(S.T, S.t0 + 0.4), true); chessPiece(x, sw ? 300 : 780, 1250, 1.7 * pop(S.T, S.t0 + 0.5), false);
      if (S.T > ts) swapFlash(x, [300, 1000], [780, 1000], prog(S.T, ts, ts + 0.5));
      if (k > 0 && k < 1) { S.flash = Math.max(S.flash, 0.5); S.flashCol = '180,230,255'; }
    } });
  add({ name: 'Form 2 people (city park): the host and the chef swap places in a blue flash; the chef is suddenly on the bench, confused ?; ROOM meter', t0: tEven, t1: end('form2'), bg: 'park',
    cam: [[1.05, 540, 1000, 0.03], [1.12, 560, 990, 0.04]], sfx: [[0.3, 'zip'], [0.35, 'boing']],
    draw(x, S) {
      room(x, 540, 1000, 900, S.T, 0.5);
      const sw = S.t > 0.35;
      person(x, S, 'chef', sw ? 'worried' : 'smug', sw ? 760 : 260, 1780, 0.7, { seed: 3, pose: 'shrug', flip: !sw });
      const h = person(x, S, 'host', 'grin', sw ? 260 : 760, 1780, 0.7, { seed: 2, pose: 'raise' });
      if (S.t > 0.3) swapFlash(x, [260, 1300], [760, 1300], prog(S.t, 0.3, 0.8));
      if (sw) A.mark(x, '?', 900, 880, pop(S.T, S.t0 + 0.6), 0.2);
      if (S.t > 0.3 && S.t < 0.4) { S.flash = Math.max(S.flash, 0.55); S.flashCol = '180,230,255'; }
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.1); if (p <= 0) return; x.save(); x.translate(70, 520); x.scale(p, p); A.meterOverlay(x, 0, 0, 380, ease.outCubic(prog(S.t, 0.1, 1.0)), 'ROOM'); x.restore(); } });

  // ---------------- FORM 3: Mes (heart cube) ----------------
  add({ name: 'Form 3 evolve (lab): the swap icon becomes a heart cube; the host pulls the chef\'s beating heart out in a cube and the chef stays alive; magnifier on the heartbeat; gold FORM 3 banner', t0: st('form3'), t1: end('form3'), bg: 'lab',
    cam: [[1.0, 540, 980, -0.02], [1.08, 540, 960, 0]], banners: [['FORM 3', 'gold', st('form3') + 0.3, end('form3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('form3', /^heart/) - st('form3'), 'pop'], [W('form3', /^heart/) - st('form3') + 0.1, 'heartbeat']],
    draw(x, S) {
      if (S.t < 0.5) evolve(x, S, 2, 3, 540, 760, 1.4, 0.45, opeIcon);
      const th = W('form3', /^heart/), out = ease.outBack(prog(S.T, th, th + 0.5)), alive = S.T > W('form3', /^alive/) - 0.2;
      const e = person(x, S, 'chef', alive ? 'grin' : 'shock', 760, 1780, 0.7, { seed: 3, pose: 'shrug', flip: true, pop: S.t0 + 0.4 });
      const h = person(x, S, 'host', 'smug', 280, 1780, 0.7, { seed: 2, pose: 'holdUp', pop: S.t0 + 0.45 });
      if (S.T > th) { const cx = lerp(e.head[0], h.hand.R[0] + 40, out), cy = lerp(e.head[1] + 380, h.hand.R[1] - 90, out); heartCube(x, cx, cy, 0.55, S.T); }
      if (S.T > th && S.T < th + 0.6) { x.beginPath(); x.rect(e.head[0] - 60, e.head[1] + 330, 120, 120); x.lineWidth = 6; x.setLineDash([12, 10]); x.strokeStyle = '#ffffff'; x.stroke(); x.setLineDash([]); }
      if (alive) A.sparkle(x, e.head[0] + 160, e.head[1] - 120, 30 * Math.abs(Math.sin(S.T * 5)));
    },
    hud(x, S) { const th = W('form3', /^heart/), p = pop(S.T, th + 0.3); if (p <= 0) return; x.save(); x.translate(820, 520); x.scale(p * 0.85, p * 0.85);
      A.magnifier(x, 0, 0, 175, S.T, (c) => heartCube(c, 0, 0, 0.9, S.T)); x.restore(); } });

  // ---------------- FORM 4: Gamma Knife ----------------
  const tWhich = W('form4', /^which/) - 0.15;
  add({ name: 'Form 4 peak (operating room): evolve into Gamma Knife, a glowing blue blade grows from the host\'s hand; gold halo; gold FORM 4 banner', t0: st('form4'), t1: tWhich, bg: 'surgery',
    cam: [[1.0, 540, 980, 0], [1.1, 540, 940, 0.02]], banners: [['FORM 4', 'gold', st('form4') + 0.3, tWhich, 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('form4', /^Gamma/) - st('form4'), 'charge']],
    draw(x, S) {
      halo(x, 540, 900, 620, '120,200,255', S.T);
      if (S.t < 0.5) evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, opeIcon);
      else { const h = person(x, S, 'host', 'shout', 540, 1780, 0.78, { pop: S.t0 + 0.45, seed: 7, pose: 'punch' });
        const g = ease.outCubic(prog(S.T, W('form4', /^Gamma/) - 0.1, W('form4', /^Gamma/) + 0.5)); gammaBlade(x, h.hand.R[0], h.hand.R[1], h.hand.R[0] + 360 * g, h.hand.R[1] - 300 * g, S.T, g);
        A.shineLines(x, h.hand.R[0], h.hand.R[1], 100, 240, S.T, 10); }
    } });
  add({ name: 'Gamma Knife hit (x-ray lightbox): the blade passes into the chef, his skeleton lights up from the inside, no cut on the outside; impact star, 7-frame shake, !?', t0: tWhich, t1: end('form4'), bg: 'xray',
    cam: [[1.1, 600, 980, 0.03], [1.04, 600, 980, 0.01]], sfx: [[0.3, 'zap'], [0.35, 'impact']],
    draw(x, S) {
      const ti = 0.35, hit = S.t > ti;
      const e = person(x, S, 'chef', hit ? 'hit' : 'worried', 700, 1780, 0.74, { seed: 6, pose: 'shrug' });
      skeleton(x, e, 0.74, hit ? 0.9 * (0.6 + 0.4 * Math.sin(S.T * 20)) : 0);
      const k = prog(S.t, 0, ti); gammaBlade(x, -100, 1300, lerp(-100, e.head[0], k), lerp(1300, e.head[1] + 400, k), S.T);
      A.impactStar(x, e.head[0], e.head[1] + 420, 200 * pop(S.T, S.t0 + ti) * (1 - prog(S.t, ti + 0.4, ti + 0.8)), 0.3);
      if (hit && S.t < ti + 7 * F) S.shake = 1.1;
      if (hit) A.mark(x, '!?', e.head[0] + 200, e.head[1] - 240, pop(S.T, S.t0 + ti + 0.25));
    } });

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (dark clock room): a giant hourglass starts running out; push-in with roll, low sting; red TERRIBLE PRICE banner', t0: st('twist'), t1: end('twist'), bg: 'hourglass', twist: true,
    cam: [[1.0, 540, 960, 0], [1.3, 540, 900, 0.07]], banners: [['TERRIBLE PRICE', 'red', W('twist', /^terrible/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.3, 'tick']],
    draw(x, S) { hourglass(x, 540, 900, 1.2 * pop(S.T, S.t0), S.T, prog(S.t, 0, S.dur)); A.mark(x, '?', 880, 420, pop(S.T, S.t0 + 0.6), 0.2); } });
  const tBut = W('truth', /^but$/) - 0.1;
  const price = { name: 'Eternal youth (dusk hill): sparkles make the chef young and glowing', t0: st('truth'), t1: tBut, bg: 'dusk',
    cam: [[1.05, 540, 1000, -0.02], [1.12, 540, 990, -0.03]], sfx: [[0.2, 'shimmer']],
    draw(x, S) {
      const fade = prog(S.T, tBut, tBut + 1.4);
      const e = person(x, S, 'chef', 'grin', 760, 1780, 0.7, { seed: 3, pose: 'cheer', pop: st('truth') + 0.1 });
      for (let i = 0; i < 8; i++) A.sparkle(x, e.head[0] + Math.cos(S.T * 2 + i) * 200, e.head[1] + 300 + Math.sin(S.T * 2 + i) * 300, 26 * Math.abs(Math.sin(S.T * 3 + i)));
      const h = person(x, S, 'host', fade > 0 ? 'sad' : 'calm', 300, 1780, 0.7, { seed: 2, pose: 'holdUp', alpha: 1 - 0.75 * fade });
      x.save(); x.globalAlpha = 1 - 0.85 * fade; heartCube(x, h.hand.R[0] + 40, h.hand.R[1] - 90, 0.5, S.T * (1 - fade)); x.restore();
    } };
  add(price);
  add({ ...price, name: 'The price (closer, same dusk hill): the host\'s heart cube fades and the host turns see-through', t0: tBut, t1: end('truth'), cam: [[1.3, 380, 960, 0.03], [1.38, 360, 950, 0.05]], sfx: [[0.1, 'fade'], [0.2, 'heartbeat']] });

  // ---------------- USERS ----------------
  const tCured = W('users', /^and$/) - 0.1;
  add({ name: 'Corazon (snowy northern town at night): Corazon holds up the stolen fruit next to little Law, who has white patches from his disease', t0: st('users'), t1: tCured, bg: 'snowNight',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], sfx: [[0, 'whoosh'], [0.2, 'ding']],
    draw(x, S) {
      const c = person(x, S, 'corazon', 'grin', 380, 1830, 0.92, { pop: S.t0 + 0.05, seed: 8, pose: 'holdUp' });
      drawOpe(x, c.hand.R[0] + 20, c.hand.R[1] - 70, 62, S.T, { shadow: false });
      person(x, S, 'lawKid', 'sad', 800, 1830, 0.55, { pop: S.t0 + 0.25, seed: 9, pose: 'idle' });
    } });
  add({ name: 'Cured (pink hearts): little Law\'s white patches fade away in sparkles and he grins', t0: tCured, t1: end('users'), bg: 'hearts',
    cam: [[1.15, 540, 1080, -0.02], [1.22, 540, 1060, 0.01]], sfx: [[0.2, 'shimmer'], [0.6, 'levelup']],
    draw(x, S) {
      const cured = S.t > 0.6;
      const h = person(x, S, cured ? 'lawKid_cured' : 'lawKid', cured ? 'grin' : 'sad', 540, 1800, 0.75, { seed: 9, pose: cured ? 'cheer' : 'idle' });
      for (let i = 0; i < 10; i++) A.sparkle(x, h.head[0] + Math.cos(i * 0.63 + S.T) * 260, h.head[1] + 260 + Math.sin(i * 0.63 + S.T) * 380, 30 * pop(S.T, S.t0 + 0.2 + i * 0.05) * Math.abs(Math.sin(S.T * 4 + i)));
      S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.t, 0.6, 0.85)) * (cured ? 1 : 0));
    } });

  // ---------------- JOKE ----------------
  const tChairs = W('joke', /^chairs/);
  add({ name: 'Joke (party room): one chair left, the chef dives for it, and the host Shambles into the seat in a blue flash; gold UNBEATABLE banner', t0: st('joke'), t1: end('joke'), bg: 'party',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['UNBEATABLE', 'gold', tChairs - 0.1, end('joke')]], sfx: [[0.6, 'zip'], [tChairs - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      chair(x, 540, 1760, 1.0, '#ff5fa2');
      const sw = S.t > 0.7;
      person(x, S, 'chef', sw ? 'worried' : 'shout', sw ? 860 : 700, 1780, 0.66, { seed: 3, pose: sw ? 'shrug' : 'punch', flip: true });
      person(x, S, 'host', 'smug', sw ? 520 : 180, 1780, 0.66, { seed: 2, pose: sw ? 'cheer' : 'idle' });
      if (S.t > 0.65) swapFlash(x, [180, 1300], [520, 1300], prog(S.t, 0.65, 1.15));
      if (sw) A.mark(x, '!?', 950, 900, pop(S.T, S.t0 + 0.9), 0.2);
    } });

  // ---------------- OUTRO ----------------
  const tDesk = st('outro') + L.outro.voStart + L.outro.voDur + 0.35;
  add({ name: 'Outro (purple rays): host with big ? marks, the heart fruit beating; pink NEXT? banner', t0: st('outro'), t1: tDesk, bg: 'rays:purple',
    cam: [[1.0, 540, 960, 0], [1.1, 540, 930, 0.03]], banners: [['NEXT?', 'pink', st('outro') + 0.3, tDesk]], sfx: [[0, 'whoosh'], [0.3, 'pop'], [0.8, 'pop'], [1.4, 'pop']],
    draw(x, S) {
      A.gogo(x, 90, 300, S.T, 0.8 * pop(S.T, S.t0 + 0.2));
      person(x, S, 'host', 'smug', 540, 1760, 0.8, { pop: S.t0 + 0.05, talk: true, seed: 12, pose: 'shrug' });
      A.mark(x, '?', 200, 640, 1.3 * pop(S.T, S.t0 + 0.8), -0.2); A.mark(x, '?', 880, 600, 1.1 * pop(S.T, S.t0 + 1.4), 0.25);
      drawOpe(x, 860, 1200, 70 * pop(S.T, S.t0 + 2.0) * (1 + 0.1 * Math.max(0, Math.sin(S.T * 7)) ** 6), S.T, { shadow: false });
    } });
  add({ name: 'Back in the desk room: host sips coffee, steam rising', t0: tDesk, t1: TL.duration, bg: 'desk',
    cam: [[1.12, 540, 1000, 0], [1.18, 540, 990, 0]], sfx: [[0.2, 'sip']],
    draw(x, S) {
      const h = person(x, S, 'host', 'calm', 540, 1900, 0.8, { seed: 13, pose: S.t > 0.25 && S.t < 1.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S, { plate: true });
    } });

  shots.forEach((s, i) => { s.i = i; s.sfx = (s.sfx || []).map(([t, n]) => [s.t0 + t, n]); });
  return shots;
}
