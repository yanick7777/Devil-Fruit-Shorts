// Canvas 2D drawing kit: flat Bitmoji-style cartoon with thick dark outlines.
export const OL = '#1d1320';
export const FONT = '"Lilita One", "Arial Black", sans-serif';

export function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

export function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function fs(ctx, fill, lw = 12, stroke = OL) { ctx.fillStyle = fill; ctx.fill(); if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); } }
function rnd(seed) { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); }

// ---------- backgrounds ----------
export function drawWall(w, h) {
  const c = mk(w, h), x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#a9c3d3'); g.addColorStop(1, '#8fa9bd');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.strokeStyle = 'rgba(255,255,255,0.28)'; x.lineWidth = 5;
  for (let r = 0, y = 0; y < h; r++, y += 70) {
    x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke();
    for (let bx = (r % 2) * 80; bx < w; bx += 160) { x.beginPath(); x.moveTo(bx, y); x.lineTo(bx, y + 70); x.stroke(); }
  }
  return c;
}

export function drawPanel(w, h) {
  const c = mk(w, h), x = c.getContext('2d');
  // drop shadow
  x.fillStyle = 'rgba(40,20,50,0.25)'; rrect(x, 24, 30, w - 30, h - 34, 70); x.fill();
  rrect(x, 10, 10, w - 34, h - 40, 70);
  const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#93597c'); g.addColorStop(1, '#7c4a6c');
  fs(x, g, 22, '#3a2537');
  x.save(); rrect(x, 10, 10, w - 34, h - 40, 70); x.clip();
  // sheen stripe like a glass pane
  x.fillStyle = 'rgba(255,220,240,0.13)';
  x.beginPath(); x.moveTo(60, 0); x.lineTo(260, 0); x.lineTo(110, h); x.lineTo(-90, h); x.fill();
  // soft blob highlight top right
  const rg = x.createRadialGradient(w * 0.82, h * 0.42, 10, w * 0.82, h * 0.42, 330);
  rg.addColorStop(0, 'rgba(215,160,200,0.55)'); rg.addColorStop(1, 'rgba(215,160,200,0)');
  x.fillStyle = rg; x.fillRect(0, 0, w, h);
  // inner frame line
  x.strokeStyle = 'rgba(255,255,255,0.12)'; x.lineWidth = 6; rrect(x, 34, 34, w - 82, h - 88, 52); x.stroke();
  x.restore();
  return c;
}

export function drawDesk(w, h, px = 430) {
  const c = mk(w, h), x = c.getContext('2d');
  x.fillStyle = '#e9e3f2'; x.fillRect(0, 40, w, 120);
  x.fillStyle = '#c9c0d8'; x.fillRect(0, 160, w, 40);
  x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(0, 40); x.lineTo(w, 40); x.stroke();
  x.beginPath(); x.moveTo(0, 160); x.lineTo(w, 160); x.stroke();
  const g = x.createLinearGradient(0, 200, 0, h); g.addColorStop(0, '#b4c4d6'); g.addColorStop(1, '#98acc2');
  x.fillStyle = g; x.fillRect(0, 205, w, h - 205);
  // plate
  x.save(); x.translate(px, 100); x.scale(1, 0.22);
  x.beginPath(); x.arc(0, 0, 300, 0, Math.PI * 2); fs(x, '#cfe6f7', 0);
  x.restore();
  x.save(); x.translate(px, 100); x.scale(1, 0.2); x.beginPath(); x.arc(0, 0, 290, 0, Math.PI * 2); x.restore();
  x.lineWidth = 11; x.strokeStyle = OL; x.stroke();
  x.save(); x.translate(px, 92); x.scale(1, 0.14); x.beginPath(); x.arc(0, 0, 220, 0, Math.PI * 2); x.restore();
  x.lineWidth = 5; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke();
  return c;
}

// ---------- banner ----------
export function drawBanner(text) {
  const w = 820, h = 240, c = mk(w, h), x = c.getContext('2d');
  // ribbon tails
  x.beginPath(); x.moveTo(40, 70); x.lineTo(120, 80); x.lineTo(120, 190); x.lineTo(50, 205); x.lineTo(75, 140); x.closePath(); fs(x, '#d9487f', 10);
  x.beginPath(); x.moveTo(w - 40, 60); x.lineTo(w - 120, 70); x.lineTo(w - 120, 180); x.lineTo(w - 50, 195); x.lineTo(w - 75, 125); x.closePath(); fs(x, '#d9487f', 10);
  rrect(x, 95, 45, w - 190, 140, 26);
  const g = x.createLinearGradient(0, 45, 0, 185); g.addColorStop(0, '#ff8cbc'); g.addColorStop(1, '#ea5f98');
  fs(x, g, 12);
  x.fillStyle = 'rgba(255,255,255,0.35)'; rrect(x, 115, 58, w - 230, 26, 13); x.fill();
  let size = 92; x.font = `${size}px ${FONT}`;
  while (x.measureText(text).width > w - 260) { size -= 4; x.font = `${size}px ${FONT}`; }
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.lineWidth = 16; x.strokeStyle = OL; x.lineJoin = 'round'; x.strokeText(text, w / 2, 122);
  x.fillStyle = '#fff'; x.fillText(text, w / 2, 122);
  // sparkles
  sparkle(x, 110, 40, 16); sparkle(x, w - 120, 190, 12);
  return c;
}
export function sparkle(x, cx, cy, r) {
  x.save(); x.translate(cx, cy); x.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.3 : r; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  x.closePath(); x.fillStyle = '#fff'; x.fill(); x.restore();
}

// ---------- characters ----------
const LOOKS = {
  you:  { skin: '#f6c690', skinD: '#e2a673', hair: '#5b3a24', hairL: '#7c5435', jacket: '#f3ae3a', jacketD: '#d38a20', shirt: '#2a2730', stubble: true },
  ace:  { skin: '#f3bd85', skinD: '#dc9d66', hair: '#1f1a22', hairL: '#3d3443', jacket: null, shirt: null, freckles: true, hat: 'cowboy', beads: true },
  sabo: { skin: '#f7cc9c', skinD: '#e2ab78', hair: '#f2cf55', hairL: '#ffe58a', jacket: '#2f4f8f', jacketD: '#223a6c', shirt: '#f4f1ea', hat: 'top', cravat: true },
};

export function drawCharacter({ who = 'you', expr = 'smug', mouth = 0, blink = false }) {
  const L = LOOKS[who];
  const W = 760, H = 960, c = mk(W, H), x = c.getContext('2d');
  x.translate(0, 60);
  // ---- body ----
  x.beginPath(); x.moveTo(90, 900); x.bezierCurveTo(100, 720, 160, 660, 300, 630); x.lineTo(460, 630);
  x.bezierCurveTo(600, 660, 660, 720, 670, 900); x.closePath();
  if (L.jacket) {
    fs(x, L.jacket, 12);
    // shirt / inner
    x.beginPath(); x.moveTo(300, 632); x.lineTo(460, 632); x.lineTo(445, 900); x.lineTo(315, 900); x.closePath(); fs(x, L.shirt, 10);
    // lapels
    x.beginPath(); x.moveTo(300, 632); x.lineTo(250, 690); x.lineTo(300, 740); x.lineTo(275, 790); x.lineTo(318, 900); x.lineTo(330, 900); x.lineTo(320, 700); x.closePath(); fs(x, L.jacketD, 10);
    x.beginPath(); x.moveTo(460, 632); x.lineTo(510, 690); x.lineTo(460, 740); x.lineTo(485, 790); x.lineTo(442, 900); x.lineTo(430, 900); x.lineTo(440, 700); x.closePath(); fs(x, L.jacketD, 10);
    // collar of inner shirt
    x.beginPath(); x.moveTo(325, 640); x.quadraticCurveTo(380, 668, 435, 640); x.lineWidth = 8; x.strokeStyle = who === 'sabo' ? '#bdb6a8' : '#fff3'; x.stroke();
    // rim light
    x.beginPath(); x.moveTo(108, 860); x.bezierCurveTo(115, 740, 165, 690, 270, 660); x.lineWidth = 9; x.strokeStyle = 'rgba(255,255,255,0.8)'; x.stroke();
    if (L.cravat) { x.beginPath(); x.moveTo(350, 645); x.lineTo(410, 645); x.lineTo(395, 720); x.lineTo(380, 760); x.lineTo(365, 720); x.closePath(); fs(x, '#f7f4ee', 8); }
  } else {
    fs(x, L.skin, 12); // bare chest
    x.beginPath(); x.moveTo(380, 700); x.lineTo(380, 860); x.lineWidth = 6; x.strokeStyle = L.skinD; x.stroke();
    x.beginPath(); x.moveTo(250, 760); x.quadraticCurveTo(320, 790, 370, 760); x.moveTo(390, 760); x.quadraticCurveTo(440, 790, 510, 760); x.stroke();
    // open black vest edges
    x.beginPath(); x.moveTo(90, 900); x.bezierCurveTo(100, 720, 160, 660, 270, 640); x.lineTo(215, 900); x.closePath(); fs(x, '#2a2730', 10);
    x.beginPath(); x.moveTo(670, 900); x.bezierCurveTo(660, 720, 600, 660, 490, 640); x.lineTo(545, 900); x.closePath(); fs(x, '#2a2730', 10);
  }
  // ---- neck ----
  x.beginPath(); x.moveTo(325, 520); x.lineTo(325, 640); x.quadraticCurveTo(380, 668, 435, 640); x.lineTo(435, 520); x.closePath(); fs(x, L.skin, 10);
  x.beginPath(); x.moveTo(330, 560); x.quadraticCurveTo(380, 600, 430, 560); x.lineTo(430, 530); x.lineTo(330, 530); x.closePath(); x.fillStyle = L.skinD; x.fill();
  if (L.beads) { for (let i = 0; i < 13; i++) { const a = Math.PI * (0.15 + 0.7 * i / 12); x.beginPath(); x.arc(380 - Math.cos(a) * 95, 640 + Math.sin(a) * 70, 15, 0, 7); fs(x, '#d8342c', 6); } }
  // ---- ears ----
  for (const ex of [168, 592]) { x.beginPath(); x.ellipse(ex, 345, 34, 50, 0, 0, 7); fs(x, L.skin, 11); }
  // ---- head ----
  const head = () => { x.beginPath(); x.moveTo(168, 320); x.bezierCurveTo(168, 115, 592, 115, 592, 320); x.bezierCurveTo(592, 470, 520, 560, 380, 566); x.bezierCurveTo(240, 560, 168, 470, 168, 320); x.closePath(); };
  head(); fs(x, L.skin, 12);
  // ---- face ----
  const ey = 360, eyes = [285, 475];
  const lid = blink ? 1 : ({ smug: 0.48, grin: 0.3, shock: 0, shout: 0.12, sad: 0.35 })[expr];
  const look = ({ smug: [14, 6], grin: [0, 4], shock: [0, 0], shout: [0, 2], sad: [-6, 10] })[expr];
  eyes.forEach((ex, i) => {
    // under-eye bags
    x.beginPath(); x.ellipse(ex, ey + 30, 56, 26, 0, 0.15 * Math.PI, 0.85 * Math.PI); x.lineWidth = 9; x.strokeStyle = L.skinD; x.stroke();
    const rx = 54, ry = expr === 'shock' ? 50 : 42;
    x.save(); x.beginPath(); x.ellipse(ex, ey, rx, ry, 0, 0, 7); x.fillStyle = '#fff'; x.fill(); x.clip();
    const pr = expr === 'shock' ? 15 : 23;
    x.beginPath(); x.arc(ex + look[0], ey + look[1], pr, 0, 7); x.fillStyle = '#16101a'; x.fill();
    x.beginPath(); x.arc(ex + look[0] - 7, ey + look[1] - 8, 6, 0, 7); x.fillStyle = '#fff'; x.fill();
    if (lid > 0) { x.fillStyle = L.skin; x.fillRect(ex - rx - 5, ey - ry - 5, rx * 2 + 10, (ry * 2 + 10) * lid); }
    x.restore();
    x.beginPath(); x.ellipse(ex, ey, rx, ry, 0, 0, 7); x.lineWidth = 11; x.strokeStyle = OL; x.stroke();
    if (lid > 0) { const ly = ey - ry - 5 + (ry * 2 + 10) * lid; x.beginPath(); x.moveTo(ex - rx - 4, ly + 3); x.quadraticCurveTo(ex, ly - 6, ex + rx + 4, ly + 3); x.lineWidth = 15; x.stroke(); }
    // brows
    const bw = 64, by = ({ smug: i ? -82 : -72, grin: -84, shock: -100, shout: -70, sad: -82 })[expr];
    const tilt = ({ smug: i ? -0.08 : 0.06, grin: 0, shock: 0, shout: i ? -0.3 : 0.3, sad: i ? 0.25 : -0.25 })[expr];
    x.save(); x.translate(ex, ey + by); x.rotate(tilt);
    x.beginPath(); x.moveTo(-bw, 6); x.quadraticCurveTo(0, -14, bw, 2); x.lineWidth = 24; x.strokeStyle = who === 'sabo' ? '#b88a2c' : OL; x.stroke(); x.restore();
  });
  // nose
  x.beginPath(); x.moveTo(372, 395); x.quadraticCurveTo(402, 425, 392, 448); x.quadraticCurveTo(382, 458, 368, 448); x.lineWidth = 9; x.strokeStyle = OL; x.stroke();
  // mouth
  x.lineWidth = 10; x.strokeStyle = OL;
  if (mouth > 0.05 || expr === 'shock' || expr === 'shout') {
    const mo = Math.max(mouth, expr === 'shock' ? 0.7 : expr === 'shout' ? 0.85 : 0);
    const mw = expr === 'grin' ? 70 : 52, mh = 10 + 46 * mo;
    x.beginPath();
    if (expr === 'sad') { x.ellipse(385, 500, mw * 0.8, mh * 0.6 + 4, 0, Math.PI, 2 * Math.PI); x.closePath(); }
    else if (expr === 'grin' || expr === 'smug') { x.moveTo(385 - mw, 478); x.quadraticCurveTo(385, 488, 385 + mw, 474); x.quadraticCurveTo(385 + mw * 0.7, 480 + mh * 1.2, 385, 482 + mh * 1.2); x.quadraticCurveTo(385 - mw * 0.8, 480 + mh, 385 - mw, 478); }
    else { x.ellipse(385, 490, mw * 0.75, mh * 0.9, 0, 0, 7); }
    x.save(); fs(x, '#5a1f2a', 10); x.clip();
    x.beginPath(); x.ellipse(385, 500 + mh, mw * 0.6, mh * 0.6, 0, 0, 7); x.fillStyle = '#ef7b8b'; x.fill();
    x.fillStyle = '#fff'; x.fillRect(330, 470, 110, 11);
    x.restore();
  } else if (expr === 'sad') {
    x.beginPath(); x.moveTo(345, 495); x.quadraticCurveTo(385, 470, 425, 495); x.stroke();
  } else if (expr === 'grin') {
    x.beginPath(); x.moveTo(318, 470); x.quadraticCurveTo(385, 530, 452, 466); x.stroke();
  } else { // smug lopsided smirk
    x.beginPath(); x.moveTo(330, 486); x.quadraticCurveTo(370, 498, 415, 486); x.quadraticCurveTo(440, 478, 452, 462); x.stroke();
  }
  // stubble / freckles
  const r = rnd(7);
  if (L.stubble) { x.fillStyle = '#b77c55'; for (let i = 0; i < 26; i++) { const a = 0.12 * Math.PI + r() * 0.76 * Math.PI, rr = 150 + r() * 40; const px = 380 + Math.cos(a) * rr * 1.05, py = 400 + Math.sin(a) * rr * 0.85; if (py > 455) { x.beginPath(); x.arc(px, py, 4.5, 0, 7); x.fill(); } } }
  if (L.freckles) { x.fillStyle = '#b8683e'; for (const cx of [262, 498]) for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(cx - 26 + (i % 3) * 24 + (i > 2 ? 12 : 0), 425 + (i > 2 ? 18 : 0), 5, 0, 7); x.fill(); } }
  // ---- hair ----
  x.save(); head(); x.lineWidth = 0; x.restore();
  x.beginPath();
  if (who === 'you') {
    x.moveTo(156, 345); x.bezierCurveTo(120, 60, 640, 60, 604, 345); x.lineTo(588, 345); x.quadraticCurveTo(575, 245, 540, 220);
    x.quadraticCurveTo(470, 205, 420, 215); x.quadraticCurveTo(380, 260, 330, 300); x.quadraticCurveTo(345, 255, 340, 225);
    x.quadraticCurveTo(250, 225, 212, 260); x.quadraticCurveTo(185, 290, 176, 345); x.closePath();
  } else if (who === 'ace') {
    x.moveTo(150, 360); x.bezierCurveTo(110, 70, 650, 70, 610, 360);
    for (let i = 0; i <= 8; i++) { const px = 600 - i * 55, py = i % 2 ? 300 : 240; x.lineTo(px, py); }
    x.closePath();
  } else {
    x.moveTo(140, 380); x.bezierCurveTo(100, 70, 660, 70, 620, 380); x.quadraticCurveTo(600, 300, 560, 250);
    x.quadraticCurveTo(450, 250, 380, 225); x.quadraticCurveTo(300, 255, 210, 250); x.quadraticCurveTo(170, 300, 140, 380); x.closePath();
  }
  fs(x, L.hair, 12);
  x.lineWidth = 8; x.strokeStyle = L.hairL;
  x.beginPath(); x.moveTo(250, 160); x.quadraticCurveTo(330, 130, 420, 140); x.stroke();
  x.beginPath(); x.moveTo(470, 150); x.quadraticCurveTo(530, 170, 560, 220); x.stroke();
  // white rim-light arc around the hair (like the reference)
  if (!L.hat) {
    x.beginPath(); x.ellipse(380, 330, 222, 205, 0, Math.PI * 1.08, Math.PI * 1.6); x.lineWidth = 11; x.strokeStyle = '#fff'; x.stroke();
    x.beginPath(); x.ellipse(380, 330, 222, 205, 0, Math.PI * 1.72, Math.PI * 1.95); x.lineWidth = 8; x.strokeStyle = '#d7a64a'; x.stroke();
  }
  // ---- hats ----
  if (L.hat === 'cowboy') {
    x.beginPath(); x.ellipse(380, 175, 330, 60, -0.05, 0, 7); fs(x, '#e8822e', 12);
    x.beginPath(); x.moveTo(230, 175); x.bezierCurveTo(230, 20, 530, 20, 530, 175); x.quadraticCurveTo(380, 200, 230, 175); fs(x, '#f19a3f', 12);
    x.beginPath(); x.moveTo(236, 150); x.quadraticCurveTo(380, 175, 524, 150); x.lineWidth = 22; x.strokeStyle = '#c0392b'; x.stroke();
    for (let i = 0; i < 7; i++) { x.beginPath(); x.arc(250 + i * 45, 152 + Math.sin(i / 6 * Math.PI) * 10, 9, 0, 7); fs(x, '#ffd34d', 4); }
  } else if (L.hat === 'top') {
    x.beginPath(); x.ellipse(380, 165, 250, 46, 0.04, 0, 7); fs(x, '#26232b', 12);
    rrect(x, 255, -40, 250, 205, 18); fs(x, '#2e2a35', 12);
    x.fillStyle = '#4b6db2'; x.fillRect(262, 115, 236, 30);
    for (const gx of [330, 430]) { x.beginPath(); x.arc(gx, 72, 34, 0, 7); fs(x, '#9bd6ff', 10); x.beginPath(); x.arc(gx - 10, 62, 9, 0, 7); x.fillStyle = '#fff'; x.fill(); }
    x.beginPath(); x.moveTo(364, 72); x.lineTo(396, 72); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
  }
  return c;
}

// ---------- the fruit buddy ----------
export function drawFruit({ mood = 'happy', blink = false } = {}) {
  const W = 420, H = 480, c = mk(W, H), x = c.getContext('2d');
  const cx = 210, cy = 280;
  // little arms
  x.lineWidth = 12; x.strokeStyle = OL; x.lineCap = 'round';
  x.beginPath(); x.moveTo(80, 300); x.quadraticCurveTo(30, 330, 40, 390); x.stroke();
  x.beginPath(); x.moveTo(340, 300); x.quadraticCurveTo(395, 270, 395, 215); x.stroke();
  x.lineWidth = 7; x.strokeStyle = '#ff9a3c';
  x.beginPath(); x.moveTo(80, 300); x.quadraticCurveTo(30, 330, 40, 390); x.stroke();
  x.beginPath(); x.moveTo(340, 300); x.quadraticCurveTo(395, 270, 395, 215); x.stroke();
  // body: round fruit with flame-shaped top lobes
  x.beginPath();
  x.moveTo(cx - 150, cy);
  x.bezierCurveTo(cx - 170, cy - 110, cx - 120, cy - 150, cx - 85, cy - 160);
  x.quadraticCurveTo(cx - 95, cy - 205, cx - 60, cy - 230); x.quadraticCurveTo(cx - 45, cy - 185, cx - 20, cy - 172);
  x.quadraticCurveTo(cx - 10, cy - 225, cx + 25, cy - 245); x.quadraticCurveTo(cx + 20, cy - 195, cx + 45, cy - 168);
  x.quadraticCurveTo(cx + 75, cy - 200, cx + 105, cy - 205); x.quadraticCurveTo(cx + 90, cy - 170, cx + 100, cy - 150);
  x.bezierCurveTo(cx + 150, cy - 120, cx + 170, cy - 60, cx + 150, cy + 20);
  x.bezierCurveTo(cx + 140, cy + 140, cx + 60, cy + 175, cx, cy + 175);
  x.bezierCurveTo(cx - 70, cy + 175, cx - 145, cy + 120, cx - 150, cy); x.closePath();
  const g = x.createRadialGradient(cx - 50, cy - 60, 20, cx, cy, 200); g.addColorStop(0, '#ffd457'); g.addColorStop(0.6, '#ff9a2e'); g.addColorStop(1, '#f1661e');
  x.save(); fs(x, g, 13); x.clip();
  // swirl pattern
  x.lineWidth = 9; x.strokeStyle = '#d7501b';
  const swirl = (sx, sy, r, d = 1) => { x.beginPath(); for (let a = 0; a < Math.PI * 3.2; a += 0.15) { const rr = r * (1 - a / (Math.PI * 3.6)); x.lineTo(sx + Math.cos(a * d) * rr, sy + Math.sin(a * d) * rr); } x.stroke(); };
  swirl(cx - 95, cy + 70, 46); swirl(cx + 95, cy + 75, 44, -1); swirl(cx + 5, cy + 135, 38); swirl(cx - 80, cy - 90, 34, -1); swirl(cx + 85, cy - 95, 34);
  x.fillStyle = 'rgba(255,255,255,0.45)'; x.beginPath(); x.ellipse(cx - 80, cy - 40, 22, 40, 0.5, 0, 7); x.fill();
  x.restore();
  // curly stem
  x.lineWidth = 16; x.strokeStyle = OL; x.beginPath(); x.moveTo(cx + 25, cy - 238); x.bezierCurveTo(cx + 30, cy - 300, cx + 100, cy - 300, cx + 85, cy - 255); x.quadraticCurveTo(cx + 70, cy - 230, cx + 55, cy - 262); x.stroke();
  x.lineWidth = 8; x.strokeStyle = '#3f9a4a'; x.stroke();
  // face
  const fy = cy + 10;
  for (const ex of [cx - 52, cx + 52]) {
    if (blink) { x.beginPath(); x.moveTo(ex - 18, fy); x.lineTo(ex + 18, fy); x.lineWidth = 9; x.strokeStyle = OL; x.stroke(); }
    else { x.beginPath(); x.ellipse(ex, fy, 18, 24, 0, 0, 7); x.fillStyle = OL; x.fill(); x.beginPath(); x.arc(ex - 5, fy - 9, 6, 0, 7); x.fillStyle = '#fff'; x.fill(); }
    x.beginPath(); const s = ex < cx ? 1 : -1;
    if (mood === 'sad') { x.moveTo(ex - 26 * s, fy - 34); x.lineTo(ex + 22 * s, fy - 48); }
    else { x.moveTo(ex - 26 * s, fy - 50); x.lineTo(ex + 22 * s, fy - 36); }
    x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
  }
  x.beginPath();
  if (mood === 'sad') x.arc(cx, fy + 66, 24, Math.PI * 1.15, Math.PI * 1.85); else x.arc(cx, fy + 30, 24, 0.15 * Math.PI, 0.85 * Math.PI);
  x.lineWidth = 9; x.strokeStyle = OL; x.stroke();
  // blush
  x.fillStyle = 'rgba(230,60,60,0.35)'; for (const bx of [cx - 92, cx + 92]) { x.beginPath(); x.ellipse(bx, fy + 36, 22, 12, 0, 0, 7); x.fill(); }
  return c;
}

// ---------- fire ----------
export function flame(x, cx, by, w, h, t, seed = 0, alpha = 1) {
  const wob = (k) => Math.sin(t * (7 + seed % 3) + seed * 1.7 + k) * 0.12;
  const layers = [['#e2361f', 1], ['#ff8a1d', 0.72], ['#ffd84a', 0.42]];
  x.save(); x.globalAlpha = alpha;
  layers.forEach(([col, s], li) => {
    const ww = w * s, hh = h * s * (1 + wob(li) * 0.8), tipx = cx + Math.sin(t * 5 + seed) * w * 0.25 * s;
    x.beginPath(); x.moveTo(cx - ww / 2, by);
    x.bezierCurveTo(cx - ww * 0.7, by - hh * 0.45, cx - ww * (0.15 - wob(1)), by - hh * 0.65, tipx, by - hh);
    x.bezierCurveTo(cx + ww * (0.2 + wob(2)), by - hh * 0.6, cx + ww * 0.75, by - hh * 0.4, cx + ww / 2, by);
    x.quadraticCurveTo(cx, by + ww * 0.35, cx - ww / 2, by); x.closePath();
    x.fillStyle = col; x.fill();
    if (li === 0) { x.lineWidth = 9; x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke(); }
  });
  x.restore();
}

export function glow(x, cx, cy, r, col, a = 1) {
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0));
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
}

// ---------- stickers & props ----------
export function sticker(x, text, cx, cy, { bg = '#ffd23f', fg = '#fff', size = 64, rot = 0, scale = 1 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(scale, scale);
  x.font = `${size}px ${FONT}`; const tw = x.measureText(text).width, w = tw + 70, h = size + 44;
  rrect(x, -w / 2 + 8, -h / 2 + 10, w, h, 24); x.fillStyle = 'rgba(29,19,32,0.5)'; x.fill();
  rrect(x, -w / 2, -h / 2, w, h, 24); fs(x, bg, 11);
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 13; x.strokeStyle = OL; x.lineJoin = 'round';
  x.strokeText(text, 0, 4); x.fillStyle = fg; x.fillText(text, 0, 4);
  x.restore();
}

export function sword(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot);
  x.beginPath(); x.moveTo(-40, -16); x.lineTo(260, -16); x.lineTo(310, 0); x.lineTo(260, 16); x.lineTo(-40, 16); x.closePath(); fs(x, '#e7eef6', 10);
  x.beginPath(); x.moveTo(-10, -4); x.lineTo(250, -4); x.lineWidth = 5; x.strokeStyle = '#ffffff'; x.stroke();
  rrect(x, -60, -50, 22, 100, 8); fs(x, '#c99a2e', 9);
  rrect(x, -150, -14, 92, 28, 10); fs(x, '#4a2c3a', 9);
  x.restore();
}
export function bullet(x, cx, cy) {
  x.beginPath(); x.moveTo(cx - 40, cy - 16); x.lineTo(cx + 10, cy - 16); x.quadraticCurveTo(cx + 50, cy, cx + 10, cy + 16); x.lineTo(cx - 40, cy + 16); x.closePath(); fs(x, '#e0b04a', 9);
  x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 6; for (let i = 1; i <= 3; i++) { x.beginPath(); x.moveTo(cx - 40 - i * 40, cy - 10 + i * 4); x.lineTo(cx - 60 - i * 40, cy - 10 + i * 4); x.stroke(); }
}
export function fist(x, cx, cy, s = 1, sleeve = '#f3ae3a') {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  rrect(x, -200, -70, 140, 140, 30); fs(x, sleeve, 12);
  x.beginPath(); x.ellipse(0, 0, 95, 82, 0, 0, 7); fs(x, '#f6c690', 12);
  x.lineWidth = 9; x.strokeStyle = OL;
  for (const yy of [-38, 0, 38]) { x.beginPath(); x.moveTo(40, yy - 20); x.quadraticCurveTo(95, yy, 40, yy + 20); x.stroke(); }
  x.beginPath(); x.moveTo(-40, -60); x.quadraticCurveTo(10, -30, 30, -70); x.stroke();
  x.restore();
}
export function trophy(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  x.lineWidth = 16; x.strokeStyle = OL; x.beginPath(); x.arc(-120, -40, 50, Math.PI * 0.5, Math.PI * 1.5); x.stroke(); x.beginPath(); x.arc(120, -40, 50, -Math.PI * 0.5, Math.PI * 0.5); x.stroke();
  x.lineWidth = 8; x.strokeStyle = '#ffd34d'; x.beginPath(); x.arc(-120, -40, 50, Math.PI * 0.5, Math.PI * 1.5); x.stroke(); x.beginPath(); x.arc(120, -40, 50, -Math.PI * 0.5, Math.PI * 0.5); x.stroke();
  x.beginPath(); x.moveTo(-130, -110); x.lineTo(130, -110); x.quadraticCurveTo(130, 60, 0, 80); x.quadraticCurveTo(-130, 60, -130, -110); x.closePath(); fs(x, '#ffc93a', 12);
  rrect(x, -30, 75, 60, 60, 6); fs(x, '#e0a52a', 10); rrect(x, -90, 130, 180, 46, 12); fs(x, '#8a5a3c', 10);
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.beginPath(); x.ellipse(-70, -40, 16, 50, 0, 0, 7); x.fill();
  x.restore();
}
export function heart(x, cx, cy, r, col = '#e8303c') {
  x.save(); x.translate(cx, cy); x.beginPath(); x.moveTo(0, r * 0.9);
  x.bezierCurveTo(-r * 1.4, -r * 0.1, -r * 0.6, -r * 1.1, 0, -r * 0.35); x.bezierCurveTo(r * 0.6, -r * 1.1, r * 1.4, -r * 0.1, 0, r * 0.9);
  fs(x, col, 6); x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.arc(-r * 0.45, -r * 0.35, r * 0.18, 0, 7); x.fill(); x.restore();
}
