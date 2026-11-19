// Shot plan for the Hobi Hobi no Mi (Hobby-Hobby Fruit) short.
// Structure follows the fruit's real progression: three techniques (toy touch, forgotten, contract) and the ageless body as the peak.
// The fruit has no stages and no awakening shown, so there are no forced "forms".
import * as A from '/engine/art.js';
import { drawHobi } from '/shorts/hobby/fruit.js';
import { F, ease, prog, lerp, pop, person, deskFront, halo, evolve, cached } from '/engine/kit.js';

// ---------------- toy effects ----------------
// the builder as a living toy: round tin body, hard hat, button eyes, stub arms and a turning wind-up key
export function toyFigure(x, cx, fy, s, t, o = {}) {
  if (s <= 0) return { head: [cx, fy - 300 * s] };
  x.save(); x.translate(cx, fy); x.rotate(o.rot || 0); x.scale(s * (o.flip ? -1 : 1), s);
  const bob = Math.abs(Math.sin(t * (o.march ? 8 : 2))) * (o.march ? 14 : 4);
  x.translate(0, -bob);
  for (const sd of [-1, 1]) { rr(x, sd * 40 - 22, -90, 44, 90, 14, '#3f5f95'); x.beginPath(); x.ellipse(sd * 40, -4, 34, 16, 0, 0, 7); A.fs(x, '#6b4630', 8); }
  // wind-up key
  x.save(); x.translate(-118, -190); x.scale(Math.cos(t * 5), 1); x.beginPath(); x.rect(-6, -14, 30, 28); A.fs(x, '#c9ccd6', 6); x.beginPath(); x.ellipse(-30, -26, 28, 22, 0, 0, 7); x.ellipse(-30, 26, 28, 22, 0, 0, 7); A.fs(x, '#d9dce6', 7); x.restore();
  rr(x, -105, -290, 210, 210, 60, '#ff7a1a');
  x.fillStyle = '#e85a00'; for (const sd of [-1, 1]) x.fillRect(sd * 52 - 10, -282, 20, 196);
  for (const yy of [-240, -190, -140]) { x.beginPath(); x.arc(0, yy, 9, 0, 7); A.fs(x, '#ffd34d', 4); }
  const wave = o.salute ? -1.9 : Math.sin(t * 3) * 0.3;
  for (const sd of [-1, 1]) { x.save(); x.translate(sd * 105, -250); x.rotate(sd * (0.5 + (sd > 0 && o.salute ? wave : sd > 0 ? wave : 0))); rr(x, -18, 0, 36, 90, 16, '#8a8f9c'); x.beginPath(); x.arc(0, 96, 22, 0, 7); A.fs(x, '#d9a27a', 7); x.restore(); }
  // head
  x.beginPath(); x.arc(0, -370, 95, 0, 7); A.fs(x, '#d9a27a', 10);
  x.beginPath(); x.moveTo(-88, -350); x.quadraticCurveTo(0, -250, 88, -350); x.quadraticCurveTo(0, -300, -88, -350); A.fs(x, '#7a4a2a', 7);
  for (const sd of [-1, 1]) { x.beginPath(); x.arc(sd * 36, -385, 17, 0, 7); A.fs(x, '#1b1530', 0); x.beginPath(); x.arc(sd * 36 - 5, -391, 5, 0, 7); x.fillStyle = '#fff'; x.fill(); }
  x.beginPath(); x.moveTo(-90, -400); x.bezierCurveTo(-90, -500, 90, -500, 90, -400); x.closePath(); A.fs(x, '#ffcf3a', 9); rr(x, -110, -412, 220, 26, 12, '#f2b705');
  x.restore();
  return { head: [cx, fy - 370 * s], hand: [cx + 105 * s, fy - 160 * s] };
}
function rr(x, X, Y, w, h, r, col) { A.rrect(x, X, Y, w, h, r); A.fs(x, col, 8); }
function poof(x, cx, cy, r, k) { // white cloud puff that blows up and fades (k 0..1)
  if (k <= 0 || k >= 1) return;
  x.save(); x.globalAlpha = 1 - k;
  for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283, d = r * (0.3 + 0.7 * ease.outCubic(k)); x.beginPath(); x.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.8, r * 0.38 * (1 - k * 0.4), 0, 7); A.fs(x, '#ffffff', 6); }
  x.restore(); for (let i = 0; i < 4; i++) A.sparkle(x, cx + Math.cos(i * 1.6) * r * 1.2, cy + Math.sin(i * 1.6) * r, 30 * Math.sin(Math.PI * k));
}
function grapes(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); [[0, 0], [-26, -30], [26, -30], [-50, -62], [0, -62], [50, -62], [-26, -94], [26, -94]].forEach(([gx, gy]) => { x.beginPath(); x.arc(gx, -gy, 24, 0, 7); A.fs(x, '#7a3fb5', 6); }); x.beginPath(); x.moveTo(0, 110); x.lineTo(6, 140); x.lineWidth = 8; x.strokeStyle = '#5c7a2e'; x.stroke(); x.restore(); }
function contract(x, cx, cy, s, k, t) { // parchment with a title, text lines and a signature drawn in over k
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.05);
  A.rrect(x, -190, -250, 380, 500, 14); A.fs(x, '#fff3d0', 10);
  for (const yy of [-250, 250]) { x.beginPath(); x.ellipse(0, yy, 210, 26, 0, 0, 7); A.fs(x, '#e8d4a0', 8); }
  x.font = `52px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = '#8a1a14'; x.fillText('CONTRACT', 0, -160);
  x.strokeStyle = 'rgba(80,50,30,0.5)'; x.lineWidth = 7; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(-140, -100 + i * 50); x.lineTo(i === 4 ? 40 : 140, -100 + i * 50); x.stroke(); }
  x.font = `40px ${A.FONT}`; x.fillStyle = '#c0392b'; x.fillText('OBEY ALL ORDERS', 0, 0);
  x.beginPath(); const n = Math.floor(40 * k); for (let i = 0; i <= n; i++) { const u = i / 40; x.lineTo(-120 + u * 240, 170 + Math.sin(u * 30) * 18 * (1 - u * 0.5)); } x.lineWidth = 7; x.strokeStyle = '#1b3fa0'; x.stroke();
  x.restore();
}
function photo(x, cx, cy, w, h) { A.rrect(x, cx - w / 2, cy - h / 2, w, h, 12); A.fs(x, '#a26d45', 12); A.rrect(x, cx - w / 2 + 22, cy - h / 2 + 22, w - 44, h - 44, 6); A.fs(x, '#fff7e0', 6); }
function cake(x, cx, by, s, t) {
  x.save(); x.translate(cx, by); x.scale(s, s);
  A.rrect(x, -200, -160, 400, 160, 20); A.fs(x, '#ff9fc6', 10); A.rrect(x, -150, -290, 300, 140, 20); A.fs(x, '#fff3d0', 10);
  for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(-180 + i * 45, -160, 22, 0, Math.PI); A.fs(x, '#ffffff', 5); }
  for (const cxx of [-80, 0, 80]) { A.rrect(x, cxx - 12, -380, 24, 90, 8); A.fs(x, '#7fc8ff', 6); A.flame(x, cxx, -380, 30, 60, t, cxx); }
  x.restore();
}
function scaryFace(x, S, cx, fy, s, k) { // exaggerated pop-eyes, veins and a tongue over a figure's face
  if (k <= 0) return;
  for (const ex of [285, 475]) { const [px, py] = A.figPoint(ex, 360, cx, fy, s); const r = 120 * s * k;
    x.beginPath(); x.arc(px, py - 20 * s, r, 0, 7); A.fs(x, '#ffffff', 12 * s);
    x.strokeStyle = '#e8303c'; x.lineWidth = 6 * s; for (let i = 0; i < 6; i++) { const a = i * 1.05; x.beginPath(); x.moveTo(px + Math.cos(a) * r, py - 20 * s + Math.sin(a) * r); x.lineTo(px + Math.cos(a) * r * 0.55, py - 20 * s + Math.sin(a) * r * 0.55); x.stroke(); }
    x.beginPath(); x.arc(px + Math.sin(S.T * 20) * 8 * s, py - 20 * s, r * 0.22, 0, 7); x.fillStyle = OLc; x.fill(); }
  const [mx, my] = A.figPoint(385, 500, cx, fy, s);
  x.beginPath(); x.ellipse(mx, my + 20 * s, 110 * s * k, 70 * s * k, 0, 0, 7); A.fs(x, '#5a1f2a', 10 * s);
  x.beginPath(); x.ellipse(mx + 10 * s, my + 110 * s * k, 60 * s * k, 120 * s * k, 0, 0, 7); A.fs(x, '#ef7b8b', 10 * s);
}
const OLc = '#16101a';
function yearCard(x, cx, cy, s, n) { x.save(); x.translate(cx, cy); x.scale(s, s); A.rrect(x, -150, -110, 300, 220, 18); A.fs(x, '#ffffff', 10); x.fillStyle = '#e8402e'; A.rrect(x, -150, -110, 300, 60, 18); x.fill();
  x.font = `40px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = '#fff'; x.fillText('YEAR', 0, -66); x.font = `100px ${A.FONT}`; x.fillStyle = A.OL; x.fillText(`+${n}`, 0, 80); x.restore(); }
export function toyIcon(x, k, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (k === 1) { toyFigure(x, 0, 120, 0.5, t); A.openHand(x, -110, -60, 0.4); }
  else if (k === 2) { photo(x, 0, 0, 220, 260); x.globalAlpha = 0.35; x.beginPath(); x.arc(-30, -20, 40, 0, 7); A.fs(x, '#c9b0a0', 5); x.globalAlpha = 1; x.beginPath(); x.arc(40, 10, 30, 0, 7); A.fs(x, '#f3c6a0', 5); A.mark(x, '?', 60, -120, 0.5); }
  else if (k === 3) contract(x, 0, 0, 0.45, 1, t);
  else { A.glow(x, 0, 0, 180, '255,230,150', 0.6); cake(x, 0, 120, 0.55, t); }
  x.restore();
}

// --------------------------------------------------------------------------------------
export function buildShots(TL) {
  const L = Object.fromEntries(TL.lines.map((l) => [l.id, l]));
  const W = (id, re) => { const l = L[id], w = l.words.find((w) => re.test(w.w)); if (!w) throw new Error(`word ${re} not in ${id}`); return l.start + w.t; };
  const end = (id) => L[id].start + L[id].dur, st = (id) => L[id].start;
  const shots = [], add = (o) => shots.push(o);
  const addSplit = (o, tSplit, cam2, name2) => {
    const S0 = o.t0;
    const wrap = (fn) => fn && function (x, S) { const P = new Proxy(S, { get: (t, k) => (k === 't0' ? S0 : k === 't' ? S.T - S0 : t[k]), set: (t, k, v) => { t[k] = v; return true; } }); return fn.call(this, x, P); };
    add({ ...o, t1: tSplit });
    add({ ...o, name: name2, t0: tSplit, cam: cam2, banners: [], sfx: [], draw: wrap(o.draw), hud: wrap(o.hud) });
  };

  // ---------------- HOOK ----------------
  const tDrop = 0.55, tShock = 0.9, tBite = W('hook', /^bite/), s2 = tBite - 0.4;
  add({ name: 'Hook (desk room): host sips coffee, the red wheel-shaped fruit rolls in and flops onto the plate, wide-eyed shock with !?', t0: 0, t1: s2, bg: 'desk',
    cam: [[1.0, 540, 980, 0], [1.07, 540, 950, 0]], sfx: [[0.1, 'sip'], [tDrop - 0.25, 'fall'], [tDrop + 0.3, 'thunk'], [tShock, 'shock']],
    draw(x, S) {
      const h = person(x, S, 'host', S.t < tShock ? 'calm' : 'shock', 540, 1900, 0.8, { pose: S.t > 0.05 && S.t < 0.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S);
      const k = prog(S.t, tDrop - 0.3, tDrop + 0.3);
      drawHobi(x, 290, lerp(-200, 1330, ease.outBounce(k)), 80, S.T * 0.6, { shadow: false, turn: 0.3 + 0.2 * Math.sin(S.T * 3) });
      if (S.t > tDrop + 0.3 && S.t < tDrop + 0.3 + 7 * F) S.shake = 0.6;
      if (S.t > tShock) A.mark(x, '!?', h.head[0] + 230, h.head[1] - 230, pop(S.T, tShock));
    } });
  add({ name: 'The bite (desk close-up): dip, bite, disgusted face; a tiny wind-up toy pops up on the desk; red YOUR FRUIT banner', t0: s2, t1: end('hook'), bg: 'desk',
    cam: [[1.4, 500, 1010, 0.02], [1.5, 490, 1000, 0.035]], banners: [['YOUR FRUIT', 'red', W('hook', /^fruit/) - 0.1, end('hook')]],
    sfx: [[tBite - s2, 'crunch'], [tBite - s2 + 0.3, 'boing'], [W('hook', /^weird/) - s2, 'yuck']],
    draw(x, S) {
      const bt = tBite - s2, bitten = S.t >= bt, atMouth = S.t > bt - 0.35 && S.t < bt + 0.45, dip = S.t > bt - 2 * F && S.t < bt ? 16 : 0;
      const h = person(x, S, 'host', bitten ? 'yuck' : 'calm', 540, 1900, 0.8, { pose: atMouth ? 'sip' : 'hold' });
      deskFront(x, S); A.mug(x, 830, 1330, 0.75, S.T, true, false);
      const fx = h.hand.R[0] - 18, fy = h.hand.R[1] - 48 + dip; drawHobi(x, fx, fy, 56, S.T * 0.4, { shadow: false, turn: 0.2 });
      if (bitten) { x.beginPath(); x.arc(fx + 40, fy - 10, 22, 0, 7); x.fillStyle = '#fff6c8'; x.fill(); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke();
        toyFigure(x, 230, 1440, 0.32 * pop(S.T, tBite + 0.25), S.T, { march: true }); A.mark(x, '!?', 820, 560, pop(S.T, tBite + 0.1)); }
      S.flash = Math.max(S.flash, 0.45 * (1 - prog(S.t, bt, bt + 0.25)) * (bitten ? 1 : 0));
    } });
  add({ name: 'Don\'t panic (pastel playroom): the host calms down and holds up the bitten fruit among alphabet blocks', t0: st('calm'), t1: end('calm'), bg: 'playroom',
    cam: [[1.06, 540, 1000, -0.02], [1.12, 540, 990, 0.01]], sfx: [[0, 'whoosh'], [W('calm', /^Devil/) - st('calm'), 'shimmer']],
    draw(x, S) {
      const tj = W('calm', /^just/) - S.t0;
      const h = person(x, S, 'host', S.t < tj ? 'worried' : 'calm', 520, 1760, 0.8, { talk: true, seed: 1, pose: 'holdUp' });
      if (S.t < tj) A.sweat(x, h.head[0] + 190, h.head[1] - 60, pop(S.T, S.t0 + 0.3));
      drawHobi(x, h.hand.R[0] + 20, h.hand.R[1] - 70, 58, S.T * 0.4, { shadow: false, turn: 0.25 });
      const td = W('calm', /^Devil/) - S.t0; A.sparkle(x, h.hand.R[0] - 20, h.hand.R[1] - 160, 36 * Math.sin(Math.PI * prog(S.t, td, td + 0.6)));
    } });

  // ---------------- OUT OF EVERY FRUIT + NAME ----------------
  const tName = W('name', /^Hobby-Hobby/) - 0.15, tThat = W('type', /^that/) - 0.1;
  add({ name: 'Out of every fruit: coral rays, pink ゴ marks, spinning globe, dark unnamed fruit silhouettes', t0: st('sea'), t1: tName, bg: 'rays:coral',
    cam: [[1.0, 540, 900, 0], [1.1, 540, 880, 0.04]], sfx: [[0, 'whoosh'], [0.1, 'rumble']],
    draw(x, S) {
      A.globe(x, 540, 860, 230 * pop(S.T, S.t0 + 0.05), S.T);
      for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + S.T * 0.6, p = pop(S.T, S.t0 + 0.12 + i * 0.18); if (p > 0) A.fruitSilhouette(x, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 300, 70 * p, i + 9); }
      A.gogo(x, 110, 330, S.T, pop(S.T, S.t0 + 0.1)); A.gogo(x, 800, 1020, S.T + 1, 0.7 * pop(S.T, S.t0 + 0.6));
    } });
  add({ name: 'Fruit reveal (toy shelves): the Hobby-Hobby Fruit spins like a yo-yo between the toys; red HOBBY-HOBBY FRUIT banner', t0: tName, t1: tThat, bg: 'toyShelf',
    cam: [[1.05, 540, 900, 0.02], [1.16, 540, 880, 0]], banners: [['HOBBY-HOBBY FRUIT', 'red', tName + 0.1, tThat]], sfx: [[0, 'whoosh'], [0.1, 'ding'], [0.3, 'shimmer']],
    draw(x, S) {
      halo(x, 540, 900, 470, '255,140,110', S.T);
      drawHobi(x, 540, 900 + Math.sin(S.T * 2) * 20, 260 * pop(S.T, S.t0), S.t * 0.7, { turn: 0.5 + 0.45 * Math.sin(S.T * 2.2) });
      for (let i = 0; i < 6; i++) { const ph = (S.T * 0.7 + i / 6) % 1; A.sparkle(x, 540 + Math.cos(i * 1.7) * 360, 880 + Math.sin(i * 2.3) * 360, 36 * Math.sin(Math.PI * ph)); }
    } });

  // ---------------- TYPE + STAGE ----------------
  const tAndType = W('type', /^and$/) - 0.1, tTouch = W('type', /^touch/);
  add({ name: 'Touch (bright toy town): the host taps the builder\'s shoulder; poof! he shrinks into a wind-up toy', t0: tThat, t1: tAndType, bg: 'toyTown',
    cam: [[1.05, 560, 1000, 0.02], [1.12, 580, 990, 0.03]], sfx: [[0.1, 'whoosh'], [tTouch - tThat, 'ding'], [tTouch - tThat + 0.15, 'boing']],
    draw(x, S) {
      const tt = tTouch - S.t0, toy = S.t > tt + 0.15;
      if (!toy) person(x, S, 'builder', 'smug', 760, 1780, 0.7, { seed: 3, pose: 'idle' });
      else toyFigure(x, 760, 1780, 0.75 * pop(S.T, S.t0 + tt + 0.15), S.T);
      person(x, S, 'host', 'grin', 280, 1780, 0.7, { seed: 2, pose: 'punch' });
      poof(x, 760, 1300, 260, prog(S.t, tt, tt + 0.6));
    } });
  const pw = [W('type', /^comes/), W('type', /^whole/), W('type', /^set/), W('type', /^tricks/)], lvl = pw[3] + 0.4;
  const labels = ['TOUCH', 'FORGET', 'DEAL', 'AGELESS'];
  add({ name: 'Toy-block stage: TOUCH, FORGET, DEAL (contract) and AGELESS pop onto block pedestals, the bar fills, LEVEL UP', t0: tAndType, t1: end('type'), bg: 'blocks',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 920, 0.03]], sfx: [[0, 'whoosh'], ...pw.map((t) => [t - tAndType, 'pop']), [lvl - tAndType, 'levelup']],
    draw(x, S) {
      const xs = [165, 415, 665, 915], lit = pw.filter((t) => S.T >= t).length;
      const fill = lit === 0 ? 0 : (lit - 1) / 4 + 0.25 * ease.outCubic(prog(S.T, pw[lit - 1], pw[lit - 1] + 0.3));
      A.progressBar(x, 540, 560, 900, fill, S.T > lvl ? 'LEVEL UP!' : 'TOY TRICKS');
      if (S.T > lvl) A.shineLines(x, 540, 560, 470, 620, S.T, 12);
      xs.forEach((px, i) => {
        if (i === lit - 1) halo(x, px, 860, 210, i === 3 ? '255,220,90' : '255,140,110', S.T);
        A.pedestal(x, px, 990, labels[i], i < lit);
        const p = pop(S.T, pw[i]); if (p > 0) toyIcon(x, i + 1, px, 860 + Math.sin(S.T * 2 + i) * 10, 0.62 * p, S.T);
        else { x.font = `110px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillText('?', px, 900); }
      });
    } });

  // ---------------- POWER 1: toy touch ----------------
  const tLiving = W('power1', /^living/) - 0.1, tT1 = W('power1', /^touch/);
  add({ name: 'Power 1 close-up (cobbled flower street): one finger taps the builder, sparkle burst, poof; gold TOY TOUCH banner; magnifier on the wind-up key', t0: st('power1'), t1: tLiving, bg: 'flowerTown',
    cam: [[1.1, 600, 1000, -0.03], [1.2, 620, 980, -0.01]], banners: [['TOY TOUCH', 'gold', st('power1') + 0.2, end('power1'), 'slide']], sfx: [[0.1, 'whoosh'], [tT1 - st('power1'), 'ding'], [tT1 - st('power1') + 0.2, 'boing']],
    draw(x, S) {
      const tt = tT1 - S.t0, toy = S.t > tt + 0.2;
      if (!toy) person(x, S, 'builder', S.t > tt ? 'shock' : 'calm', 780, 1780, 0.74, { seed: 3, pose: 'shrug' });
      else toyFigure(x, 780, 1780, 0.8 * pop(S.T, S.t0 + tt + 0.2), S.T, { march: true });
      const h = person(x, S, 'host', 'smug', 240, 1780, 0.72, { seed: 2, pose: 'punch' });
      A.shineLines(x, h.hand.R[0] + 20, h.hand.R[1], 40, 140 * (1 - prog(S.t, tt, tt + 0.5)), S.T, 10);
      poof(x, 780, 1350, 280, prog(S.t, tt + 0.05, tt + 0.7));
    },
    hud(x, S) { const p = pop(S.T, tT1 + 0.6); if (p <= 0) return; x.save(); x.translate(800, 470); x.scale(p * 0.8, p * 0.8);
      A.magnifier(x, 0, 0, 175, S.T, (c) => { c.save(); c.scale(1.8, 1.8); c.translate(-60, -40); c.translate(0, 0); c.beginPath(); c.rect(-6, -14, 30, 28); A.fs(c, '#c9ccd6', 6); c.save(); c.scale(Math.cos(S.T * 5), 1); c.beginPath(); c.ellipse(-30, -26, 28, 22, 0, 0, 7); c.ellipse(-30, 26, 28, 22, 0, 0, 7); A.fs(c, '#d9dce6', 7); c.restore(); c.restore(); }); x.restore(); } });
  add({ name: 'Power 1 reaction (toy shop shelf): the new toy builder marches in place, waving its stubby arms, ?', t0: tLiving, t1: end('power1'), bg: 'toyShelf',
    cam: [[1.08, 540, 1000, 0.03], [1.14, 560, 990, 0.04]], sfx: [[0.1, 'tick'], [0.5, 'tick']],
    draw(x, S) { const t = toyFigure(x, 540, 1700, 1.2, S.T, { march: true }); A.mark(x, '?', t.head[0] + 220, t.head[1] - 120, pop(S.T, S.t0 + 0.3), 0.2); A.speedLines(x, 540, 1300, S.T, 10, 160); } });

  // ---------------- POWER 2: forgotten ----------------
  const tFam = W('power2', /^family/) - 0.1;
  addSplit({ name: 'Power 2 evolve (hallway of photos): toy icon dissolves into the photo icon, flash + glow ring; blue FORGOTTEN banner; in a big family photo the builder fades out, leaving his kid alone; memory bubbles pop', t0: st('power2'), t1: end('power2'), bg: 'photoHall',
    cam: [[1.0, 540, 980, 0], [1.08, 540, 960, -0.02]], banners: [['FORGOTTEN', 'blue', st('power2') + 0.3, end('power2'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power2', /^forgets/) - st('power2'), 'shimmer'], [tFam - st('power2'), 'pop']],
    draw(x, S) {
      if (S.t < 0.5) { A.glowRing(x, 540, 760, 300 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 1, 2, 540, 760, 1.4, 0.45, toyIcon); return; }
      const tf = W('power2', /^forgets/) - S.t0, fade = 1 - ease.smoother(prog(S.t, tf, tf + 1.2));
      photo(x, 540, 900, 820, 900);
      x.save(); x.beginPath(); x.rect(152, 472, 776, 856); x.clip();
      person(x, S, 'builder', 'grin', 400, 1500, 0.5, { seed: 3, alpha: fade, pose: 'idle' });
      const kid = person(x, S, 'kid', fade < 0.3 ? 'worried' : 'grin', 700, 1500, 0.38, { seed: 5, pose: fade < 0.3 ? 'shrug' : 'cheer' });
      x.restore();
      if (fade < 0.3) A.mark(x, '?', kid.head[0] + 120, kid.head[1] - 160, pop(S.T, S.t0 + tf + 1.0), 0.2);
      for (let i = 0; i < 3; i++) { const bt = tf + 0.3 + i * 0.35, k = prog(S.t, bt, bt + 0.6); if (k > 0 && k < 1) { x.save(); x.globalAlpha = 1 - k; A.bubble(x, 200 + i * 340, 420 - k * 120, 60 * (0.5 + k)); x.restore(); } }
    } },
    tFam, [[1.3, 600, 1040, 0.03], [1.38, 640, 1030, 0.045]], 'Power 2 close (same photo): the kid stands alone in the frame, confused, ?');

  // ---------------- POWER 3: contract ----------------
  const tObey = W('power3', /^obey/) - 0.1;
  addSplit({ name: 'Power 3 evolve (lamp-lit study): photo icon becomes the contract icon; the toy signs a big CONTRACT with a quill, then snaps into a salute; gold CONTRACT banner; OBEY meter fills', t0: st('power3'), t1: end('power3'), bg: 'study',
    cam: [[1.0, 540, 980, 0], [1.08, 560, 960, 0.02]], banners: [['CONTRACT', 'gold', st('power3') + 0.3, end('power3'), 'slide']], sfx: [[0, 'evolve'], [0.35, 'whoosh'], [W('power3', /^contract/) - st('power3'), 'swish'], [tObey - st('power3') + 0.1, 'stamp']],
    draw(x, S) {
      if (S.t < 0.5) { A.glowRing(x, 540, 760, 300 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 2, 3, 540, 760, 1.4, 0.45, toyIcon); return; }
      const ts = W('power3', /^sign/) - S.t0, to = tObey - S.t0, sal = S.t > to;
      contract(x, 330, 900, 1.05 * pop(S.T, S.t0 + 0.5), ease.outCubic(prog(S.t, ts, to)), S.T);
      const tf = toyFigure(x, 800, 1400, 1.05, S.T, { salute: sal });
      if (!sal) { const qx = lerp(520, 330 + 120, prog(S.t, ts, to)), qy = 1100 + Math.sin(S.T * 30) * 10; x.save(); x.translate(qx, qy); x.rotate(-0.6); x.beginPath(); x.ellipse(0, -80, 18, 90, 0, 0, 7); A.fs(x, '#ffffff', 6); x.restore(); }
      if (sal) { A.mark(x, '!?', tf.head[0] + 150, tf.head[1] - 150, pop(S.T, S.t0 + to + 0.2)); if (S.t < to + 7 * F) S.shake = 0.5; }
    },
    hud(x, S) { const p = pop(S.T, S.t0 + 0.8); if (p <= 0) return; x.save(); x.translate(70, 520); x.scale(p, p); A.meterOverlay(x, 0, 0, 380, ease.outCubic(prog(S.T, tObey, tObey + 0.8)), 'OBEY'); x.restore(); } },
    tObey, [[1.3, 780, 1060, 0.03], [1.38, 790, 1050, 0.045]], 'Power 3 close (same study): the toy salutes, stamp sound, short shake');

  // ---------------- PEAK: ageless ----------------
  const tKid = W('peak', /^kid/) - 0.15, tAge = W('peak', /^aging/);
  add({ name: 'Peak (birthday party): contract icon gives way to the cake icon, gold halo; the year card flips +1, +10, +50 while the host stays exactly the same; gold AGELESS banner', t0: st('peak'), t1: end('peak'), bg: 'birthday',
    cam: [[1.0, 540, 980, 0], [1.1, 540, 940, 0.02]], banners: [['AGELESS', 'gold', tAge - 0.1, end('peak'), 'slide']], sfx: [[0, 'evolve'], [tAge - st('peak'), 'charge'], [tKid - st('peak'), 'shimmer']],
    draw(x, S) {
      halo(x, 540, 900, 620, '255,215,90', S.T);
      if (S.t < 0.5) { A.glowRing(x, 540, 820, 320 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, 3, 4, 540, 820, 1.5, 0.45, toyIcon); return; }
      const h = person(x, S, 'host', 'grin', 380, 1780, 0.72, { pop: S.t0 + 0.45, seed: 7, pose: 'cheer' }); A.shineLines(x, h.head[0], h.head[1] + 200, 300, 460, S.T, 10);
      cake(x, 820, 1780, 0.9, S.T);
      const n = Math.floor(Math.pow(Math.max(0, S.T - tAge) * 2.2, 2.2)) + 1; if (S.T > tAge) yearCard(x, 820, 620, 1.0 * pop(S.T, tAge), Math.min(n, 99));
      if (S.T > tAge) { S.flash = Math.max(S.flash, 0.5 * (1 - prog(S.T, tAge, tAge + 0.3))); S.flashCol = '255,246,200'; }
    } });

  // ---------------- TWIST + TRUTH ----------------
  add({ name: 'Twist (dark underground toy factory): toys roll along a conveyor belt under red lights; push-in with roll, low sting; red WEAKNESS banner', t0: st('twist'), t1: end('twist'), bg: 'toyFactory', twist: true,
    cam: [[1.0, 540, 960, 0], [1.28, 540, 980, 0.07]], banners: [['WEAKNESS', 'red', W('twist', /^weakness/) - 0.1, end('twist')]], sfx: [[0, 'sting'], [0.3, 'tick']],
    draw(x, S) { for (let i = 0; i < 5; i++) toyFigure(x, ((i * 260 + S.T * 120) % 1300) - 110, 1150, 0.55, S.T + i, { march: true }); S.flashCol = '255,60,40'; S.flash = Math.max(S.flash, 0.08 + 0.06 * Math.sin(S.T * 6)); } });
  const tEvery = W('truth', /^every/) - 0.1, tRem = W('truth', /^everyone/);
  add({ name: 'Knocked out (town square at sunrise): a bonk! impact star, the host keels over with KO swirl, 7-frame shake', t0: st('truth'), t1: tEvery, bg: 'sunriseSquare',
    cam: [[1.1, 540, 1000, -0.02], [1.18, 540, 1000, -0.04]], sfx: [[0.15, 'impact'], [0.6, 'thunk']],
    draw(x, S) { const k = prog(S.t, 0.2, 0.6); const h = person(x, S, 'host', S.t > 0.15 ? 'hit' : 'calm', 540, 1780, 0.78, { seed: 9, rot: -1.2 * ease.outCubic(k) });
      A.impactStar(x, 600, 680, 200 * pop(S.T, S.t0 + 0.15) * (1 - prog(S.t, 0.45, 0.8)), 0.3); if (S.t > 0.15 && S.t < 0.15 + 7 * F) S.shake = 1.0;
      for (let i = 0; i < 3; i++) { const a = S.T * 4 + i * 2.1; A.sparkle(x, h.head[0] - 200 * k + Math.cos(a) * 110, h.head[1] + 150 * k + Math.sin(a) * 40, 26 * k, '#ffe14d'); } } });
  add({ name: 'Back to normal (same square, closer): poof! the toy turns back into the builder, his kid runs in, a big heart; green BACK! banner', t0: tEvery, t1: end('truth'), bg: 'sunriseSquare',
    cam: [[1.25, 560, 1080, 0.02], [1.32, 560, 1070, 0.035]], banners: [['BACK!', 'green', tEvery + 0.4, end('truth')]], sfx: [[0.1, 'boing'], [0.2, 'shimmer'], [tRem - tEvery, 'ding']],
    draw(x, S) { const tb = 0.25, back = S.t > tb;
      if (!back) toyFigure(x, 460, 1780, 0.8, S.T); else person(x, S, 'builder', 'grin', 460, 1780, 0.72, { seed: 3, pose: 'cheer', pop: S.t0 + tb });
      poof(x, 460, 1350, 300, prog(S.t, 0.05, 0.7));
      const kx = lerp(1250, 790, ease.outCubic(prog(S.t, 0.5, 1.2))); person(x, S, 'kid', 'grin', kx, 1780, 0.5, { seed: 5, pose: 'cheer' });
      const hk = pop(S.T, tRem); if (hk > 0) A.heart(x, 640, 820, 110 * hk * (1 + 0.06 * Math.sin(S.T * 8))); } });

  // ---------------- USERS ----------------
  const tUntil = W('users', /^until/) - 0.1;
  add({ name: 'Sugar (giant pink toy house): Sugar sits on a block eating grapes, Doflamingo grinning behind her', t0: st('users'), t1: tUntil, bg: 'toyHouse',
    cam: [[1.05, 540, 1000, 0.02], [1.12, 540, 980, 0]], sfx: [[0, 'whoosh'], [0.3, 'pop']],
    draw(x, S) {
      person(x, S, 'doflamingo', 'grin', 780, 1800, 0.78, { pop: S.t0 + 0.3, seed: 8, pose: 'shrug' });
      A.rrect(x, 200, 1580, 300, 200, 16); A.fs(x, '#3f9bff', 10);
      const s = person(x, S, 'sugar', 'smug', 350, 1600, 0.55, { pop: S.t0 + 0.05, seed: 4, pose: 'holdUp' });
      grapes(x, s.hand.R[0] + 10, s.hand.R[1] - 30, 0.8);
    } });
  add({ name: 'The scare (green-purple spiral): Usopp pulls a terrifying face, eyes popping, tongue out; Sugar faints, !? and dizzy stars; shake', t0: tUntil, t1: end('users'), bg: 'spiralScare',
    cam: [[1.1, 540, 1000, -0.02], [1.2, 540, 980, 0.04]], sfx: [[0.1, 'shock'], [0.25, 'boing'], [0.9, 'thunk']],
    draw(x, S) {
      const k = ease.outBack(prog(S.t, 0.1, 0.4));
      person(x, S, 'usopp', 'shout', 360, 1820, 0.8, { seed: 6, pose: 'cheer' }); scaryFace(x, S, 360, 1820, 0.8, k);
      const fk = ease.outCubic(prog(S.t, 0.6, 1.0)); const s = person(x, S, 'sugar', S.t > 0.5 ? 'hit' : 'shock', 760, 1800, 0.5, { seed: 4, pose: 'shrug', rot: 0.55 * fk });
      if (S.t > 0.25) A.mark(x, '!?', 860, 880, pop(S.T, S.t0 + 0.25), 0.2);
      if (S.t > 0.1 && S.t < 0.1 + 7 * F) S.shake = 0.8;
      for (let i = 0; i < 3; i++) { const a = S.T * 4 + i * 2.1; A.sparkle(x, s.head[0] + 150 * fk + Math.cos(a) * 80, s.head[1] + 140 * fk + Math.sin(a) * 30, 24 * fk, '#ffe14d'); }
    } });

  // ---------------- JOKE ----------------
  add({ name: 'Joke (kid\'s bedroom): the host shrugs, the toy builder marching at his feet, a shelf of toys behind; gold FREE TOYS banner', t0: st('joke'), t1: end('joke'), bg: 'kidsRoom',
    cam: [[1.05, 540, 1000, -0.03], [1.12, 540, 980, 0]], banners: [['FREE TOYS', 'gold', W('joke', /^toys/) - 0.1, end('joke')]], sfx: [[0.3, 'tick'], [W('joke', /^toys/) - st('joke') + 0.3, 'jokesting']],
    draw(x, S) {
      person(x, S, 'host', 'smug', 420, 1780, 0.8, { pop: S.t0 + 0.05, seed: 11, pose: 'shrug', talk: true });
      toyFigure(x, 820, 1780, 0.6, S.T, { march: true });
      A.sparkle(x, 820, 1300, 34 * Math.abs(Math.sin(S.T * 4)));
    } });

  // ---------------- OUTRO ----------------
  const tDesk = st('outro') + L.outro.voStart + L.outro.voDur + 0.35;
  add({ name: 'Outro (purple rays): host with big ? marks, the wheel-shaped fruit rolling in; pink NEXT? banner', t0: st('outro'), t1: tDesk, bg: 'rays:purple',
    cam: [[1.0, 540, 960, 0], [1.1, 540, 930, 0.03]], banners: [['NEXT?', 'pink', st('outro') + 0.3, tDesk]], sfx: [[0, 'whoosh'], [0.3, 'pop'], [0.8, 'pop'], [1.4, 'pop']],
    draw(x, S) {
      A.gogo(x, 90, 300, S.T, 0.8 * pop(S.T, S.t0 + 0.2));
      person(x, S, 'host', 'smug', 540, 1760, 0.8, { pop: S.t0 + 0.05, talk: true, seed: 12, pose: 'shrug' });
      A.mark(x, '?', 200, 640, 1.3 * pop(S.T, S.t0 + 0.8), -0.2); A.mark(x, '?', 880, 600, 1.1 * pop(S.T, S.t0 + 1.4), 0.25);
      const p = pop(S.T, S.t0 + 2.0); if (p > 0) drawHobi(x, lerp(1200, 860, ease.outCubic(prog(S.T, S.t0 + 2.0, S.t0 + 2.6))), 1200, 70 * p, -S.T * 3, { shadow: false, turn: 0.1 });
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
