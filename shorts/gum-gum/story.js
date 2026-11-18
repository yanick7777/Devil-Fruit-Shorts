// Shot plan for the Gomu Gomu no Mi short. New sets and effects; same script skeleton as the Mera Mera short.
import * as A from '/engine/art.js';
import { drawGomu } from '/shorts/gum-gum/fruit.js';
import { F, ease, prog, clamp01, lerp, pop, cached, person, deskFront, halo, evolve, headAt } from '/engine/kit.js';

// ---------------- props & effects ----------------
function steam(x, cx, cy, s, t, n = 8) {
  for (let i = 0; i < n; i++) { const ph = (t * 0.9 + A.hash(i)) % 1, px = cx + (A.hash(i + 1) - 0.5) * 260 * s + Math.sin(t * 3 + i) * 20 * s, py = cy - ph * 420 * s;
    x.globalAlpha = 0.85 * (1 - ph); x.beginPath(); x.arc(px, py, (30 + ph * 50) * s, 0, 7); x.fillStyle = '#ffffff'; x.fill(); x.lineWidth = 5 * s; x.strokeStyle = 'rgba(27,21,48,0.35)'; x.stroke(); }
  x.globalAlpha = 1;
}
// a rubber arm stretched from a shoulder point to a far target, with a fist or open hand on the end
function stretchArm(x, from, to, sleeve, s, hand = 'fist', t = 0) {
  const [x0, y0] = from, [x1, y1] = to, mx = (x0 + x1) / 2, my = (y0 + y1) / 2 + Math.sin(t * 9) * 18 * s + 30 * s;
  x.lineCap = 'round';
  x.beginPath(); x.moveTo(x0, y0); x.quadraticCurveTo(mx, my, x1, y1); x.lineWidth = 64 * s; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 46 * s; x.strokeStyle = '#f6c690'; x.stroke();
  x.beginPath(); x.moveTo(x0, y0); x.lineTo(x0 + (x1 - x0) * 0.08, y0 + (y1 - y0) * 0.08); x.lineWidth = 72 * s; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 56 * s; x.strokeStyle = sleeve; x.stroke();
  const ang = Math.atan2(y1 - my, x1 - mx);
  if (hand === 'fist') A.fist(x, x1, y1, 0.42 * s, sleeve, ang); else { x.beginPath(); x.arc(x1, y1, 42 * s, 0, 7); A.fs(x, '#f6c690', 9 * s); }
  // motion lines along the arm
  x.save(); x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineWidth = 6; for (let k = 1; k < 4; k++) { const u = k / 4, px = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1, py = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1;
    x.beginPath(); x.moveTo(px - 40, py - 46 * s); x.lineTo(px + 40, py - 46 * s); x.stroke(); } x.restore();
}
function bigFist(x, cx, cy, s, t) { // Gear Third: an air-filled giant fist
  A.glow(x, cx, cy, 420 * s, '255,230,150', 0.4);
  x.save(); x.translate(cx, cy); x.scale(s, s);
  x.beginPath(); x.ellipse(0, 0, 300, 260, 0, 0, 7); A.fs(x, '#f6c690', 16);
  x.lineWidth = 12; x.strokeStyle = A.OL; for (const yy of [-130, -40, 50, 140]) { x.beginPath(); x.moveTo(150, yy - 50); x.quadraticCurveTo(300, yy, 150, yy + 50); x.stroke(); }
  x.beginPath(); x.moveTo(-120, -200); x.quadraticCurveTo(20, -120, 80, -230); x.stroke();
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.ellipse(-130, -110, 50, 80, -0.5, 0, 7); x.fill();
  x.restore();
}
function house(x, cx, by, s) { x.save(); x.translate(cx, by); x.scale(s, s); x.beginPath(); x.rect(-90, -140, 180, 140); A.fs(x, '#f2c27a', 9); x.beginPath(); x.moveTo(-110, -140); x.lineTo(0, -230); x.lineTo(110, -140); x.closePath(); A.fs(x, '#c0392b', 9); A.rrect(x, -25, -80, 50, 80, 6); A.fs(x, '#7a4a2a', 7); x.restore(); }
function gun(x, hx, hy, s, flip) { x.save(); x.translate(hx, hy); x.scale(flip ? -s : s, s); A.rrect(x, -10, -26, 120, 34, 8); A.fs(x, '#3a3a46', 8); A.rrect(x, -10, -2, 40, 70, 10); A.fs(x, '#6b4630', 8); x.restore(); }
function bullet(x, cx, cy, s, ang) { x.save(); x.translate(cx, cy); x.rotate(ang); x.beginPath(); x.moveTo(-26 * s, -11 * s); x.lineTo(10 * s, -11 * s); x.quadraticCurveTo(36 * s, 0, 10 * s, 11 * s); x.lineTo(-26 * s, 11 * s); x.closePath(); A.fs(x, '#e0b04a', 6); x.restore(); }
function scroll(x, cx, cy, s, title, sub) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  A.rrect(x, -300, -360, 600, 720, 20); A.fs(x, '#f3e3b8', 12);
  for (const yy of [-380, 380]) { A.rrect(x, -340, yy - 30, 680, 60, 30); A.fs(x, '#8a5a3c', 11); }
  x.font = `66px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = '#5b3a24'; x.fillText(title, 0, -200);
  if (sub) { x.font = `46px ${A.FONT}`; sub.split('|').forEach((l, i) => x.fillText(l, 0, -100 + i * 60)); }
  x.strokeStyle = 'rgba(91,58,36,0.35)'; x.lineWidth = 8; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(-220, 60 + i * 50); x.lineTo(220 - (i % 3) * 60, 60 + i * 50); x.stroke(); }
  x.restore();
}
function stamp(x, cx, cy, text, s, rot) { if (s <= 0) return; x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.font = `92px ${A.FONT}`; const w = x.measureText(text).width + 60;
  A.rrect(x, -w / 2, -70, w, 140, 16); x.lineWidth = 14; x.strokeStyle = '#e8302e'; x.stroke(); x.fillStyle = '#e8302e'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 6); x.restore(); }
function chest(x, cx, cy, s, t) { x.save(); x.translate(cx, cy); x.scale(s, s); A.glow(x, 0, -60, 220, '200,150,255', 0.6);
  A.rrect(x, -130, -60, 260, 150, 18); A.fs(x, '#8a5a3c', 11); x.beginPath(); x.moveTo(-130, -60); x.quadraticCurveTo(0, -170, 130, -60); A.fs(x, '#a26d45', 11);
  A.rrect(x, -20, -40, 40, 50, 6); A.fs(x, '#ffc931', 8); x.restore(); drawGomu(x, cx, cy - 150 * s, 60 * s, t, { shadow: false }); }
function ship(x, cx, cy, s, t, gov) {
  x.save(); x.translate(cx, cy + Math.sin(t * 2) * 6 * s); x.rotate(Math.sin(t * 1.5) * 0.03); x.scale(s, s);
  for (const [mx, h] of [[-80, 320], [90, 260]]) { x.lineWidth = 14; x.strokeStyle = A.OL; x.beginPath(); x.moveTo(mx, 40); x.lineTo(mx, -h); x.stroke(); x.lineWidth = 7; x.strokeStyle = '#8a5a3c'; x.stroke();
    A.rrect(x, mx - 90, -h + 30, 180, h - 110, 16); A.fs(x, gov ? '#f4f4f8' : '#3a3346', 9); if (gov) { x.fillStyle = '#3c78d8'; x.fillRect(mx - 86, -h + 100, 172, 26); } }
  x.beginPath(); x.moveTo(-90, -320); x.lineTo(-90, -380); x.lineTo(-10, -350); x.closePath(); A.fs(x, gov ? '#3c78d8' : '#e8302e', 7);
  x.beginPath(); x.moveTo(-260, 20); x.lineTo(270, 20); x.lineTo(210, 130); x.lineTo(-200, 130); x.closePath(); A.fs(x, gov ? '#f4f4f8' : '#4a3428', 11);
  if (gov) { x.fillStyle = '#3c78d8'; x.fillRect(-240, 60, 470, 20); }
  x.restore();
}
function nika(x, S, cx, fy, s) { // glowing sun-god silhouette (no identifiable design: a white figure with a sun halo)
  A.glow(x, cx, fy - 1300 * s, 700 * s, '255,240,180', 0.9);
  const [hx, hy] = headAt(cx, fy, s);
  for (let i = 0; i < 3; i++) { const ph = (S.T * 0.9 + i / 3) % 1; x.beginPath(); x.arc(hx, hy, (250 + ph * 650) * s, 0, 7); x.lineWidth = 14 * (1 - ph); x.strokeStyle = `rgba(255,200,80,${1 - ph})`; x.stroke(); }
  const c = cached('nika', () => { const im = A.drawPerson({ who: 'host_g5', expr: 'grin', pose: 'cheer' }), t = A.mk(im.width, im.height), tx = t.getContext('2d'); tx.drawImage(im, 0, 0); tx.globalCompositeOperation = 'source-in'; tx.fillStyle = '#fffdf2'; tx.fillRect(0, 0, t.width, t.height); return t; });
  const o = cached('nikaO', () => { const t = A.mk(c.width, c.height), tx = t.getContext('2d'); tx.drawImage(c, 0, 0); tx.globalCompositeOperation = 'source-in'; tx.fillStyle = '#e0952a'; tx.fillRect(0, 0, t.width, t.height); return t; });
  x.save(); x.translate(cx, fy); x.scale(s, s * (1 + Math.sin(S.T * 2.4) * 0.01));
  for (const [dx, dy] of [[-14, 0], [14, 0], [0, -14], [0, 14]]) x.drawImage(o, -A.FIG.W / 2 + dx, -A.FIG.FEET + dy);
  x.shadowColor = '#ffb627'; x.shadowBlur = 50; for (let k = 0; k < 3; k++) x.drawImage(c, -A.FIG.W / 2, -A.FIG.FEET); x.restore();
}
function cloudCollar(x, cx, cy, s, t) { for (let i = 0; i < 7; i++) { const a = Math.PI * (0.05 + i * 0.15) , r = 190 * s; x.beginPath(); x.arc(cx + Math.cos(a + Math.PI) * r * -1, cy + Math.sin(a) * r * 0.35 + Math.sin(t * 3 + i) * 6, (46 + (i % 2) * 14) * s, 0, 7); A.fs(x, '#ffffff', 7 * s); } }
function hakiArms(x, h, s) { for (const k of ['L', 'R']) { const [hx, hy] = h.hand[k]; A.glow(x, hx, hy, 140 * s, '120,60,200', 0.6); x.beginPath(); x.arc(hx, hy, 70 * s, 0, 7); A.fs(x, '#1c1530', 9 * s); x.beginPath(); x.arc(hx - 18 * s, hy - 20 * s, 14 * s, 0, 7); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fill(); } }
// gear icons for the pedestals and the evolve cross-dissolves (2..5)
export function gearIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 2) { A.glow(x, 0, 0, 170, '255,140,160', 0.6); A.fist(x, 0, 10, 0.5, '#22a99a'); steam(x, 0, 0, 0.45, t, 6); x.save(); x.translate(0, 10); x.scale(0.5, 0.5); x.beginPath(); x.ellipse(0, 0, 98, 84, 0, 0, 7); x.fillStyle = 'rgba(255,120,130,0.45)'; x.fill(); x.restore(); }
  else if (k === 3) { bigFist(x, 0, 0, 0.42, t); }
  else if (k === 4) { A.glow(x, 0, 0, 180, '150,80,220', 0.6); x.beginPath(); x.arc(0, 0, 110, 0, 7); A.fs(x, '#22a99a', 12); x.lineWidth = 16; x.strokeStyle = '#1c1530'; x.beginPath(); x.arc(0, 0, 80, 0.4, 2.6); x.stroke(); for (const sd of [-1, 1]) { x.beginPath(); x.arc(sd * 120, -20, 46, 0, 7); A.fs(x, '#1c1530', 9); } }
  else { A.glow(x, 0, 0, 200, '255,230,150', 0.8); A.sun(x, 0, 0, 70, t); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + t; x.beginPath(); x.arc(Math.cos(a) * 120, Math.sin(a) * 120, 34, 0, 7); A.fs(x, '#ffffff', 7); } }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const L = Object.fromEntries(TL.lines.map((l) => [l.id, l]));
  const Wn = (id, re, n = 1) => { const l = L[id], ws = l.words.filter((w) => re.test(w.w)); if (ws.length < n) throw new Error(`word ${re} #${n} not in ${id}`); return l.start + ws[n - 1].t; };
  const W = (id, re) => Wn(id, re, 1);
  const end = (id) => L[id].start + L[id].dur, st = (id) => L[id].start;
  const shots = [], add = (o) => shots.push(o);
  const SLV = '#22a99a';

  // ---------------- HOOK: desk room ----------------
  const tDrop = 0.55, tShock = 0.9, tBite = W('hook', /^bite/), s2 = tBite - 0.4;
  add({ name: 'Hook (desk room): host sips coffee, the purple fruit drops onto the plate, wide-eyed shock with !?', t0: 0, t1: s2, bg: 'desk',
    cam: [[1.0, 540, 980, 0], [1.07, 540, 950, 0]], sfx: [[0.1, 'sip'], [tDrop - 0.25, 'fall'], [tDrop + 0.3, 'thunk'], [tShock, 'shock']],
    draw(x, S) {
      const sipping = S.t > 0.05 && S.t < 0.5;
      const h = person(x, S, 'host', S.t < tShock ? 'calm' : 'shock', 540, 1900, 0.8, { pose: sipping ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S);
      const k = prog(S.t, tDrop - 0.3, tDrop + 0.3);
      drawGomu(x, 290, lerp(-200, 1340, ease.outBounce(k)), 92, S.T * 0.6, { shadow: false });
      if (S.t > tDrop + 0.3 && S.t < tDrop + 0.3 + 7 * F) S.shake = 0.6;
      if (S.t > tShock) A.mark(x, '!?', h.head[0] + 230, h.head[1] - 230, pop(S.T, tShock));
    } });
  add({ name: 'The bite (desk close-up): 2-frame dip, bite, disgusted face, light flash; pink YOUR FRUIT banner', t0: s2, t1: end('hook'), bg: 'desk',
    cam: [[1.4, 500, 1010, 0.02], [1.5, 490, 1000, 0.035]], banners: [['YOUR FRUIT', 'pink', W('hook', /^fruit/) - 0.1, end('hook')]],
    sfx: [[tBite - s2, 'crunch'], [W('hook', /^weird/) - s2, 'yuck']],
    draw(x, S) {
      const bt = tBite - s2, bitten = S.t >= bt, atMouth = S.t > bt - 0.35 && S.t < bt + 0.45, dip = S.t > bt - 2 * F && S.t < bt ? 16 : 0;
      const h = person(x, S, 'host', bitten ? 'yuck' : 'calm', 540, 1900, 0.8, { pose: atMouth ? 'sip' : 'hold' });
      deskFront(x, S); A.mug(x, 830, 1330, 0.75, S.T, true, false);
      const fx = h.hand.R[0] - 18, fy = h.hand.R[1] - 48 + dip; drawGomu(x, fx, fy, 62, S.T * 0.4, { shadow: false });
      if (bitten) { x.save(); x.beginPath(); x.arc(fx + 50, fy - 30, 26, 0, 7); x.fillStyle = '#e9d7ff'; x.fill(); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke(); x.restore(); }
      S.flash = Math.max(S.flash, 0.45 * (1 - prog(S.t, bt, bt + 0.25)) * (bitten ? 1 : 0));
      if (bitten) A.mark(x, '!?', 820, 560, pop(S.T, tBite + 0.1));
    } });
  // ---------------- DON'T PANIC ----------------
  const tPanic = W('calm', /^panic/);
  add({ name: 'Don\'t panic (comic halftone): the host\'s arm stretches out and snaps back like rubber, then he calms down', t0: st('calm'), t1: end('calm'), bg: 'halftone',
    cam: [[1.05, 540, 1000, -0.02], [1.12, 540, 990, 0.01]], sfx: [[0, 'whoosh'], [tPanic - st('calm'), 'stretch'], [tPanic - st('calm') + 0.55, 'snap'], [W('calm', /^Devil/) - st('calm'), 'shimmer']],
    draw(x, S) {
      const tp = tPanic - S.t0, out = Math.sin(Math.PI * prog(S.t, tp, tp + 0.6));
      const h = person(x, S, 'host', S.t < tp + 0.6 ? 'shock' : 'calm', 470, 1760, 0.8, { talk: true, seed: 1, pose: out > 0.02 ? 'idle' : 'shrug' });
      if (out > 0.02) { const sh = A.figPoint(498, 690, 470, 1760, 0.8); stretchArm(x, sh, [lerp(sh[0] + 80, 1180, out), lerp(sh[1] + 80, 760, out)], SLV, 0.8, 'open', S.T); }
      if (S.t > tp + 0.55 && S.t < tp + 0.55 + 7 * F) S.shake = 0.5;
      A.impactStar(x, sh0(h), h.hand.R[1], 70 * pop(S.T, S.t0 + tp + 0.55) * (1 - prog(S.t, tp + 0.7, tp + 0.9)), 0);
      const td = W('calm', /^Devil/) - S.t0; drawGomu(x, 860, 1180 + Math.sin(S.T * 2) * 10, 70 * pop(S.T, S.t0 + td - 0.1), S.T); A.sparkle(x, 800, 1090, 34 * Math.sin(Math.PI * prog(S.t, td, td + 0.6)));
    } });
  function sh0(h) { return h.hand.R[0]; }

  // ---------------- OUT OF EVERY FRUIT + NAME ----------------
  const tName = W('name', /^Gum-Gum/) - 0.15, tThat = W('type', /^that/) - 0.1;
  add({ name: 'Out of every fruit: blue rays, pink ゴ marks, spinning globe, dark unnamed fruit silhouettes', t0: st('sea'), t1: tName, bg: 'rays:blue',
    cam: [[1.0, 540, 900, 0], [1.1, 540, 880, -0.04]], sfx: [[0, 'whoosh'], [0.1, 'rumble']],
    draw(x, S) {
      A.globe(x, 540, 860, 230 * pop(S.T, S.t0 + 0.05), S.T);
      for (let i = 0; i < 6; i++) { const a = -i / 6 * 6.283 - S.T * 0.5, p = pop(S.T, S.t0 + 0.12 + i * 0.18); if (p > 0) A.fruitSilhouette(x, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 300, 70 * p, i + 1); }
      A.gogo(x, 760, 280, S.T, pop(S.T, S.t0 + 0.1)); A.gogo(x, 110, 1000, S.T + 1, 0.7 * pop(S.T, S.t0 + 0.6));
    } });
  add({ name: 'Fruit reveal (violet candy swirl): the Gum-Gum Fruit bounces in and spins with shimmer; pink GUM-GUM FRUIT banner', t0: tName, t1: tThat, bg: 'swirl',
    cam: [[1.05, 540, 900, 0.02], [1.16, 540, 880, 0]], banners: [['GUM-GUM FRUIT', 'pink', tName + 0.1, tThat]], sfx: [[0, 'whoosh'], [0.1, 'boing'], [0.3, 'shimmer']],
    draw(x, S) {
      halo(x, 540, 880, 470, '200,140,255', S.T);
      const b = Math.abs(Math.sin(S.t * 6)) * Math.exp(-S.t * 2.2), sq = 1 + 0.12 * Math.sin(S.t * 12) * Math.exp(-S.t * 3);
      x.save(); x.translate(540, 880 - b * 160); x.scale(sq, 2 - sq); drawGomu(x, 0, 0, 280 * pop(S.T, S.t0), S.t * 0.7); x.restore();
      for (let i = 0; i < 6; i++) { const ph = (S.T * 0.7 + i / 6) % 1; A.sparkle(x, 540 + Math.cos(i * 1.7) * 360, 880 + Math.sin(i * 2.3) * 360, 36 * Math.sin(Math.PI * ph)); }
    } });

  // ---------------- RUBBER BODY + GEARS STAGE ----------------
  const tUnl = W('type', /^unlocks/) - 0.1;
  add({ name: 'Rubber body (sunny town street): the gunslinger fires, the host\'s belly stretches and the bullets bounce back; gunslinger !?', t0: tThat, t1: tUnl, bg: 'townStreet',
    cam: [[1.05, 560, 1000, 0.02], [1.12, 580, 990, 0.03]], sfx: [[0.15, 'bullets'], [0.35, 'boing'], [0.6, 'ricochet']],
    draw(x, S) {
      const bulge = Math.sin(Math.PI * prog(S.t, 0.25, 0.75));
      const h = person(x, S, 'host', 'grin', 320, 1780, 0.72, { seed: 2, pose: 'shrug', sx: 1 + 0.25 * bulge, sy: 1 - 0.08 * bulge });
      const e = person(x, S, 'gunner', S.t > 0.7 ? 'shock' : 'smug', 820, 1780, 0.72, { seed: 3, flip: true, pose: 'punch', pop: S.t0 + 0.02 });
      gun(x, e.hand.R[0] - 10, e.hand.R[1] - 10, 0.8, true);
      for (let i = 0; i < 3; i++) { const t0 = 0.15 + i * 0.08, a = prog(S.t, t0, t0 + 0.2), b = prog(S.t, t0 + 0.2, t0 + 0.6);
        if (a > 0 && a < 1) bullet(x, lerp(e.hand.R[0] - 80, 380, a), lerp(e.hand.R[1], 1220 + i * 40, a), 1, Math.PI);
        else if (b > 0 && b < 1) bullet(x, lerp(380, 1200, b), lerp(1220 + i * 40, 500 - i * 120, b), 1, -0.6); }
      if (S.t > 0.7) A.mark(x, '!?', e.head[0] - 200, e.head[1] - 220, pop(S.T, S.t0 + 0.7));
      A.speedLines(x, 380, 1220, S.T, 6, 120 * bulge, Math.PI);
    } });
  const pw = [W('type', /^unlocks/), W('type', /^whole/), W('type', /^list/), W('type', /^gears/)], lvl = pw[3] + 0.4;
  const stageDraw = (x, S) => {
    const xs = [165, 415, 665, 915], lit = pw.filter((t) => S.T >= t).length;
    const fill = lit === 0 ? 0 : (lit - 1) / 4 + 0.25 * ease.outCubic(prog(S.T, pw[lit - 1], pw[lit - 1] + 0.3));
    A.progressBar(x, 540, 560, 900, fill, S.T > lvl ? 'LEVEL UP!' : 'GEARS');
    if (S.T > lvl) A.shineLines(x, 540, 560, 470, 620, S.T, 12);
    xs.forEach((px, i) => {
      if (i === lit - 1) halo(x, px, 860, 210, i === 3 ? '255,220,90' : '120,230,255', S.T);
      A.pedestal(x, px, 990, `GEAR ${i + 2}`, i < lit);
      const p = pop(S.T, pw[i]); if (p > 0) gearIcon(x, i + 2, px, 860 + Math.sin(S.T * 2 + i) * 10, 0.62 * p, S.T);
      else { x.font = `110px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillText('?', px, 900); }
    });
  };
  add({ name: 'Neon arcade stage: GEAR 2-5 pop onto pedestals one per word, the bar fills, LEVEL UP with shine lines', t0: tUnl, t1: end('type'), bg: 'arcade',
    cam: [[1.0, 540, 980, 0], [1.12, 600, 900, 0.03]], sfx: [[0, 'whoosh'], ...pw.map((t) => [t - tUnl, 'pop']), [lvl - tUnl, 'levelup']], draw: stageDraw });

  // ---------------- GEAR 2 ----------------
  const tMove = W('gear2', /^move/) - 0.15;
  add({ name: 'Gear 2 close-up (bamboo grove): pink skin, steam pouring off, yellow shine lines; SPEED meter overlay', t0: st('gear2'), t1: tMove, bg: 'bamboo',
    cam: [[1.15, 540, 1040, -0.03], [1.24, 540, 1000, -0.01]], sfx: [[0.1, 'steam'], [W('gear2', /^steam/) - st('gear2'), 'steam']],
    draw(x, S) {
      const ts = W('gear2', /^steam/) - S.t0, k = ease.outCubic(prog(S.t, 0, 0.5));
      const h = person(x, S, k > 0.5 ? 'host_g2' : 'host', 'shout', 540, 1760, 0.8, { seed: 2, pose: 'cheer' });
      steam(x, 540, 1300, 0.9 + 0.5 * prog(S.t, ts, ts + 0.5), S.T, 12);
      A.shineLines(x, h.head[0], h.head[1] + 300, 420, 600, S.T, 12);
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.2); if (p <= 0) return; x.save(); x.translate(70, 520); x.scale(p, p); A.meterOverlay(x, 0, 0, 380, ease.outCubic(prog(S.t, 0.2, 2.2)), 'SPEED'); x.restore(); } });
  add({ name: 'Gear 2 blur (rooftops): pink afterimages zip past, the gunslinger spins around confused with ?, then gets tagged (impact star)', t0: tMove, t1: end('gear2'), bg: 'rooftops',
    cam: [[1.1, 540, 1000, 0.03], [1.18, 520, 990, 0.04]], sfx: [[0, 'zip'], [0.35, 'zip'], [0.75, 'impact']],
    draw(x, S) {
      const hit = S.t > 0.75;
      const e = person(x, S, 'gunner', hit ? 'hit' : 'worried', 700, 1780, 0.72, { seed: 3, flip: Math.floor(S.t * 4) % 2 === 1, pose: 'shrug' });
      for (let i = 0; i < 4; i++) { const px = lerp(-200, 1300, ((S.t * 1.6 + i * 0.22) % 1)); person(x, S, 'host_g2', 'shout', px, 1780, 0.66, { alpha: 0.18 + i * 0.12, pose: 'punch', seed: i }); }
      A.speedLines(x, 540, 1150, S.T, 16, 260);
      if (!hit) A.mark(x, '?', e.head[0] + 210, e.head[1] - 220, pop(S.T, S.t0 + 0.15), 0.2);
      A.impactStar(x, e.head[0] - 40, e.head[1] + 60, 170 * pop(S.T, S.t0 + 0.75) * (1 - prog(S.t, 1.2, 1.5)), 0.4);
      if (hit && S.t < 0.75 + 7 * F) S.shake = 1;
    } });

  // ---------------- GEAR 3 ----------------
  const tFor = W('gear3', /^for$/) - 0.1;
  add({ name: 'Gear 3 evolve (blueprint): ghost of Gear 2 dissolves into the giant fist, flash + glow ring; gold GEAR 3 banner; chalk diagram bone + air = giant fist', t0: st('gear3'), t1: tFor, bg: 'blueprint',
    cam: [[1.0, 540, 900, 0], [1.08, 560, 890, -0.02]], banners: [['GEAR 3', 'gold', st('gear3') + 0.3, tFor, 'slide']],
    sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('gear3', /^air/) - st('gear3'), 'inflate']],
    draw(x, S) {
      evolve(x, S, 2, 3, 540, 820, 1.5, 0.45, gearIcon);
      const g = prog(S.t, 0.6, 1.6); x.save(); x.strokeStyle = '#ffffff'; x.lineWidth = 9; x.lineCap = 'round';
      if (g > 0) { x.beginPath(); x.moveTo(160, 1180); x.lineTo(160 + 240 * Math.min(1, g * 2), 1180); x.stroke(); x.beginPath(); x.arc(150, 1180, 26, 0, 7); x.arc(400, 1180, 26, 0, 7); x.stroke(); }
      if (g > 0.5) { x.font = `90px ${A.FONT}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText('+ AIR =', 610, 1210); }
      if (g > 0.9) { x.beginPath(); x.ellipse(910, 1170, 110, 90, 0, 0, 7); x.stroke(); }
      x.restore();
    } });
  add({ name: 'Gear 3 outdoor (mountain valley): a fist the size of a house next to an actual house; tiny gunslinger worried in the magnifier', t0: tFor, t1: end('gear3'), bg: 'mountain',
    cam: [[1.0, 540, 980, 0.02], [1.08, 560, 940, 0.03]], sfx: [[0, 'inflate'], [W('gear3', /^house/) - tFor, 'boing']],
    draw(x, S) {
      const p = ease.outBack(prog(S.t, 0, 0.45));
      const h = person(x, S, 'host', 'shout', 200, 1800, 0.55, { seed: 4, pose: 'punch' });
      x.beginPath(); x.moveTo(h.hand.R[0] - 40, h.hand.R[1]); x.lineTo(560, 860); x.lineWidth = 120 * p; x.strokeStyle = A.OL; x.stroke(); x.lineWidth = 96 * p; x.strokeStyle = '#f6c690'; x.stroke();
      bigFist(x, 640, 820, 1.05 * p, S.T);
      house(x, 900, 1300, 1.1 * pop(S.T, S.t0 + 0.5));
      A.shineLines(x, 640, 820, 360, 520, S.T, 12);
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.4); if (p <= 0) return; x.save(); x.translate(860, 1080); x.scale(p * 0.8, p * 0.8);
      A.magnifier(x, 0, 0, 175, S.T, (c) => { person(c, S, 'gunner', 'worried', 0, 150, 0.17, { seed: 4, pose: 'shrug' }); }); x.restore(); } });

  // ---------------- GEAR 4 ----------------
  const tBounce = W('gear4', /^bounce/) - 0.1;
  add({ name: 'Gear 4 evolve (boxing ring): ghost giant fist becomes the bouncing Haki ball, host puffs up with black Haki fists; gold GEAR 4 banner; scope overlay', t0: st('gear4'), t1: tBounce, bg: 'ring',
    cam: [[1.0, 540, 980, 0], [1.1, 540, 950, 0.02]], banners: [['GEAR 4', 'gold', st('gear4') + 0.3, tBounce, 'slide']],
    sfx: [[0, 'evolve'], [0.35, 'whoosh'], [0.6, 'inflate'], [W('gear4', /^Haki/) - st('gear4'), 'haki']],
    draw(x, S) {
      if (S.t < 0.5) evolve(x, S, 3, 4, 540, 820, 1.4, 0.45, gearIcon);
      else { const b = Math.abs(Math.sin(S.T * 5)), sq = 1 - 0.12 * (1 - b);
        const h = person(x, S, 'host', 'shout', 540, 1700 - b * 160, 0.78, { seed: 5, pose: 'cheer', sx: 1.3 / sq, sy: 0.95 * sq, pop: S.t0 + 0.5 });
        hakiArms(x, h, 0.78); steam(x, 540, 1100 - b * 160, 0.7, S.T, 6); }
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.8); if (p <= 0) return; x.save(); x.translate(870, 600); x.scale(p, p);
      A.scopeOverlay(x, 0, 0, 160, S.T, (c) => gearIcon(c, 4, 0, Math.abs(Math.sin(S.T * 5)) * -40 + 20, 0.7, S.T));
      x.font = `44px ${A.FONT}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = A.OL; x.strokeText('BOING!', 0, 215); x.fillStyle = '#5fe07a'; x.fillText('BOING!', 0, 215); x.restore(); } });
  add({ name: 'Gear 4 hit (fortress wall): the host bounces in like a rubber ball and slams the gunslinger; red impact star, 7-frame shake, !?', t0: tBounce, t1: end('gear4'), bg: 'fortress',
    cam: [[1.15, 540, 1000, 0.04], [1.05, 560, 990, 0.02]], sfx: [[0, 'boing'], [0.4, 'boing'], [0.85, 'impact']],
    draw(x, S) {
      const ti = 0.85, hit = S.t > ti;
      const e = person(x, S, 'gunner', hit ? 'hit' : 'worried', 730, 1780, 0.72, { seed: 6, pose: 'shrug', rot: hit ? 0.25 * prog(S.t, ti, ti + 0.3) : 0 });
      const u = prog(S.t, 0, ti), bx = lerp(-150, 580, u), by = 1150 - Math.abs(Math.sin(u * Math.PI * 2.5)) * 420;
      if (!hit) { x.save(); x.translate(bx, by); x.rotate(S.t * 8); gearIcon(x, 4, 0, 0, 1.0, S.T); x.restore(); A.speedLines(x, bx - 160, by, S.T, 8, 200); }
      else { const h = person(x, S, 'host', 'grin', 340, 1780, 0.7, { seed: 5, pose: 'punch', sx: 1.25, sy: 0.96 }); hakiArms(x, h, 0.7); }
      A.impactStar(x, e.head[0] - 40, e.head[1] + 120, 260 * pop(S.T, S.t0 + ti) * (1 - prog(S.t, ti + 0.5, ti + 0.9)), 0.3);
      if (hit && S.t < ti + 7 * F) S.shake = 1.2;
      if (hit) A.mark(x, '!?', e.head[0] + 200, e.head[1] - 240, pop(S.T, S.t0 + ti + 0.25));
    } });

  // ---------------- GEAR 5 (peak) ----------------
  const tBend = W('gear5', /^bend/) - 0.15, tWhite = W('gear5', /^white/);
  add({ name: 'Gear 5 peak (white-gold toon world): evolve into Gear 5, hair and clothes turn white, cloud collar, gold halo; gold GEAR 5 banner; the world starts to wobble', t0: st('gear5'), t1: tBend, bg: 'cartoon',
    cam: [[1.0, 540, 980, 0], [1.12, 540, 900, 0.05]], banners: [['GEAR 5', 'gold', st('gear5') + 0.3, tBend, 'slide']],
    sfx: [[0, 'evolve'], [0.35, 'whoosh'], [0.5, 'drums'], [tWhite - st('gear5'), 'shimmer']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.45) evolve(x, S, 4, 5, 540, 820, 1.6, 0.45, gearIcon);
      else { const white = S.T > tWhite - 0.1;
        const h = person(x, S, white ? 'host_g5' : 'host', 'grin', 540, 1760, 0.8, { pop: S.t0 + 0.45, seed: 7, pose: 'cheer' });
        if (white) { cloudCollar(x, h.head[0], h.head[1] + 300, 0.8, S.T); S.flash = Math.max(S.flash, 0.6 * (1 - prog(S.T, tWhite - 0.1, tWhite + 0.2))); }
        A.shineLines(x, h.head[0], h.head[1] + 200, 430, 640, S.T, 14); }
      S.wobble = 0.35 * prog(S.t, 0.5, 2.0);
    } });
  add({ name: 'Gear 5 cartoon physics (above the clouds): the gunslinger squashes and stretches like rubber, eyes popping; the host laughs; the world bends', t0: tBend, t1: end('gear5'), bg: 'clouds',
    cam: [[1.05, 540, 980, -0.04], [1.15, 520, 960, -0.02]], sfx: [[0, 'boing'], [0.5, 'boing'], [1.0, 'boing'], [0.2, 'drums']],
    draw(x, S) {
      const w = Math.sin(S.T * 9);
      const e = person(x, S, 'gunner', 'shock', 780, 1780, 0.66, { seed: 8, pose: 'shrug', sx: 1 + 0.35 * w, sy: 1 - 0.3 * w });
      const h = person(x, S, 'host_g5', 'grin', 300, 1780, 0.7, { seed: 7, pose: 'shrug', talk: true }); cloudCollar(x, h.head[0], h.head[1] + 260, 0.7, S.T);
      A.mark(x, '!?', e.head[0] + 180, e.head[1] - 260 - 40 * w, pop(S.T, S.t0 + 0.3));
      S.wobble = 0.8;
    } });

  // ---------------- TWIST: never its real name ----------------
  const tNever = W('twist', /^never/);
  add({ name: 'Twist (dark records room): a scroll labelled GUM-GUM FRUIT gets a red slash; push-in with roll, low sting; red FAKE NAME banner', t0: st('twist'), t1: end('twist'), bg: 'archive', twist: true,
    cam: [[1.0, 540, 960, 0], [1.3, 540, 900, 0.07]], banners: [['FAKE NAME', 'red', tNever, end('twist')]], sfx: [[0, 'sting'], [tNever - st('twist'), 'slash']],
    draw(x, S) {
      scroll(x, 540, 880, 1.05 * pop(S.T, S.t0), 'GUM-GUM FRUIT', 'Type: Paramecia|Power: rubber body');
      const k = prog(S.T, tNever, tNever + 0.25); if (k > 0) { x.save(); x.lineCap = 'round'; x.lineWidth = 34; x.strokeStyle = '#e8302e'; x.beginPath(); x.moveTo(250, 640); x.lineTo(lerp(250, 830, k), lerp(640, 760, k)); x.stroke(); x.restore(); }
      A.mark(x, '?', 860, 450, pop(S.T, S.t0 + 0.5), 0.2);
    } });

  // ---------------- TRUTH ----------------
  const tAnd = W('truth', /^and$/) - 0.1, tNika = W('truth', /^Nika/);
  add({ name: 'True name (white-gold sunburst): a glowing sun-god silhouette with drum-beat rings; pink TRUE NAME: NIKA banner', t0: st('truth'), t1: tAnd, bg: 'sunburst',
    cam: [[1.1, 540, 900, 0], [1.2, 540, 860, 0.02]], banners: [['TRUE NAME: NIKA', 'pink', W('truth', /^Human-Human/) - 0.1, tAnd]], sfx: [[0, 'whoosh'], [0.2, 'drums'], [tNika - st('truth'), 'ding']],
    draw(x, S) { nika(x, S, 540, 1760, 0.8 * pop(S.T, S.t0 + 0.05)); for (let i = 0; i < 8; i++) A.sparkle(x, 120 + A.hash(i) * 840, 250 + A.hash(i + 1) * 900, 26 * Math.abs(Math.sin(S.T * 2 + i))); } });
  add({ name: 'Renamed to hide it (stormy sky): the scroll now reads HUMAN-HUMAN FRUIT, MODEL: NIKA, then a red CLASSIFIED stamp slams down and a GUM-GUM label covers it', t0: tAnd, t1: end('truth'), bg: 'storm',
    cam: [[1.1, 540, 920, -0.02], [1.2, 540, 900, -0.04]], sfx: [[W('truth', /^renamed/) - tAnd, 'stamp'], [W('truth', /^hide/) - tAnd, 'stamp']],
    draw(x, S) {
      scroll(x, 540, 880, 1.05, 'HUMAN-HUMAN', 'FRUIT|MODEL: NIKA');
      const tr = W('truth', /^renamed/), th = W('truth', /^hide/);
      stamp(x, 540, 1040, 'CLASSIFIED', pop(S.T, tr) * (1 + 0.3 * (1 - prog(S.T, tr, tr + 0.12))), -0.2);
      if (S.T > th) { const p = pop(S.T, th); x.save(); x.translate(540, 700); x.rotate(0.06); x.scale(p, p); A.rrect(x, -270, -70, 540, 140, 14); A.fs(x, '#ffd23f', 10); x.font = `74px ${A.FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = A.OL; x.fillText('GUM-GUM FRUIT', 0, 6); x.restore(); }
      if (S.T > tr && S.T < tr + 7 * F) S.shake = 0.8;
      for (let i = 0; i < 2; i++) { const ph = (S.T * 0.7 + i * 0.5) % 1; if (ph < 0.08) { S.flash = Math.max(S.flash, 0.35); S.flashCol = '220,230,255'; } }
    } });

  // ---------------- USERS ----------------
  const tLuffy = W('users', /^and$/) - 0.1, tAte = W('users', /^ate/);
  add({ name: 'Stolen (stormy night sea): a chest with the glowing fruit swings from a government ship over to the Red-Haired crew\'s ship', t0: st('users'), t1: tLuffy, bg: 'nightSea',
    cam: [[1.0, 540, 980, 0.02], [1.1, 560, 960, 0]], sfx: [[0, 'waves'], [W('users', /^stole/) - st('users'), 'whoosh'], [W('users', /^stole/) - st('users') + 0.6, 'thunk']],
    draw(x, S) {
      ship(x, 270, 1180, 0.85, S.T, true); ship(x, 830, 1240, 0.8, S.T + 1, false);
      const ts = W('users', /^stole/) - S.t0, k = ease.smoother(prog(S.t, ts, ts + 0.6));
      chest(x, lerp(270, 830, k), lerp(1000, 1060, k) - Math.sin(k * Math.PI) * 380, 0.6, S.T);
      A.mark(x, '!?', 270, 700, pop(S.T, S.t0 + ts + 0.3), -0.1);
    } });
  add({ name: 'Partys Bar (village tavern): little Luffy grins, bites the fruit by accident, disgusted face, !?', t0: tLuffy, t1: end('users'), bg: 'tavern',
    cam: [[1.1, 540, 1080, -0.02], [1.2, 520, 1060, 0.01]], sfx: [[tAte - tLuffy, 'crunch'], [tAte - tLuffy + 0.3, 'yuck']],
    draw(x, S) {
      const ate = S.T > tAte;
      const h = person(x, S, 'luffyKid', ate ? 'yuck' : 'grin', 540, 1760, 0.68, { pop: S.t0 + 0.05, seed: 9, pose: ate && S.T < tAte + 0.5 ? 'sip' : 'holdUp' });
      x.beginPath(); x.rect(-100, 1500, 1300, 60); A.fs(x, '#8a5a3c', 10); x.fillStyle = '#6d4425'; x.fillRect(-100, 1560, 1300, 400);
      drawGomu(x, h.hand.R[0] + (ate ? -20 : 20), h.hand.R[1] - 60, 58, S.T * 0.4, { shadow: false });
      if (ate) { x.beginPath(); x.arc(h.hand.R[0] + 25, h.hand.R[1] - 90, 22, 0, 7); x.fillStyle = '#e9d7ff'; x.fill(); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke(); A.mark(x, '!?', h.head[0] + 210, h.head[1] - 220, pop(S.T, tAte + 0.15)); }
      S.flash = Math.max(S.flash, 0.4 * (1 - prog(S.T, tAte, tAte + 0.25)) * (ate ? 1 : 0));
    } });

  // ---------------- JOKE ----------------
  const tLadder = W('joke', /^ladder/);
  add({ name: 'Joke (bedroom): the host reaches a box on the top shelf by stretching his arm up across the room; gold NO LADDER NEEDED banner', t0: st('joke'), t1: end('joke'), bg: 'bedroom',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 960, 0]], banners: [['NO LADDER NEEDED', 'gold', tLadder - 0.1, end('joke')]], sfx: [[0.6, 'stretch'], [tLadder - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      A.rrect(x, 640, 250, 380, 40, 8); A.fs(x, '#8a5a3c', 9); A.rrect(x, 760, 160, 150, 92, 10); A.fs(x, '#ffc931', 9);
      const k = ease.outCubic(prog(S.t, 0.6, 1.3));
      const h = person(x, S, 'host', S.T > tLadder ? 'smug' : 'calm', 300, 1780, 0.72, { pop: S.t0 + 0.05, seed: 11, pose: 'idle' });
      const sh = A.figPoint(498, 690, 300, 1780, 0.72);
      if (k > 0) stretchArm(x, sh, [lerp(sh[0] + 60, 830, k), lerp(sh[1] - 60, 300, k)], SLV, 0.72, 'open', S.T);
      if (k >= 1) A.sparkle(x, 840, 150, 30 * Math.abs(Math.sin(S.T * 4)));
    } });

  // ---------------- OUTRO ----------------
  const tDesk = st('outro') + L.outro.voStart + L.outro.voDur + 0.35;
  add({ name: 'Outro (purple rays): host with big ? marks, the fruit bouncing; pink NEXT? banner', t0: st('outro'), t1: tDesk, bg: 'rays:purple',
    cam: [[1.0, 540, 960, 0], [1.1, 540, 930, 0.03]], banners: [['NEXT?', 'pink', st('outro') + 0.3, tDesk]], sfx: [[0, 'whoosh'], [0.3, 'pop'], [0.8, 'pop'], [1.4, 'pop']],
    draw(x, S) {
      A.gogo(x, 90, 300, S.T, 0.8 * pop(S.T, S.t0 + 0.2));
      person(x, S, 'host', 'smug', 540, 1760, 0.8, { pop: S.t0 + 0.05, talk: true, seed: 12, pose: 'shrug' });
      A.mark(x, '?', 200, 640, 1.3 * pop(S.T, S.t0 + 0.8), -0.2); A.mark(x, '?', 880, 600, 1.1 * pop(S.T, S.t0 + 1.4), 0.25);
      drawGomu(x, 860, 1200 - Math.abs(Math.sin(S.T * 4)) * 120, 75 * pop(S.T, S.t0 + 2.0), S.T, { shadow: false });
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
