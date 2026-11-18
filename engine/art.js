// Canvas 2D art kit for the flat Bitmoji-style look: thick navy outlines, flat fills, thin white rim light.
export const OL = '#1b1530';
export const FONT = '"Lilita One", "Arial Black", sans-serif';
export const COL = { pink: '#ff5fa2', gold: '#ffc931', blue: '#4fb3ff', purple: '#b07cff', green: '#5fe07a', red: '#ff4a3d', orange: '#ff9a2e', white: '#ffffff' };
export const BANNER = { pink: ['#ff8cbc', '#ea5f98', '#d9487f'], gold: ['#ffd65a', '#f5ad1b', '#d98f0f'], blue: ['#7cc8ff', '#3c8fe0', '#2a6fc0'], green: ['#8ee87c', '#3fb85a', '#2c9445'], red: ['#ff8a6a', '#e8402e', '#c22e20'] };

export function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
export function rrect(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
export function fs(x, fill, lw = 12, stroke = OL) { x.fillStyle = fill; x.fill(); if (lw) { x.lineWidth = lw; x.strokeStyle = stroke; x.lineJoin = 'round'; x.lineCap = 'round'; x.stroke(); } }
export const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

// ======================= characters =======================
export const LOOKS = {
  luffyKid: { skin: '#f3c08a', skinD: '#dca06a', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'messy', hat: 'straw', eyeScar: true,
          top: 'tee', cloth: '#d8342c', clothD: '#a92620', inner: '#d8342c', pants: '#3f6fb5', shorts: true, shoe: '#c9934f', boots: false, sleeveSkin: true },
  gunner: { skin: '#c98d64', skinD: '#ab7049', hair: '#2a1d18', hairL: '#4d362c', hairStyle: 'bald', shades: true, goatee: true,
          top: 'vest', cloth: '#4f7a3a', clothD: '#3a5c2a', inner: '#8e8e99', pants: '#5a4a3a', shoe: '#2a2026', boots: true, arm: '#8e8e99', sleeveSkin: true },
  host: { skin: '#f6c690', skinD: '#e2a673', hair: '#1d1a26', hairL: '#4a4560', hairStyle: 'messy', glasses: true,
          top: 'hoodie', cloth: '#22a99a', clothD: '#178274', inner: '#ffffff', innerD: '#d9dde6', pants: '#3b4f7a', shoe: '#e9e6f0', cuff: '#178274' },
  host_g2: null, host_g5: null,
  enemy: { skin: '#d9a27a', skinD: '#bb8460', hair: '#2a1d18', hairL: '#4d362c', hairStyle: 'bandana', beard: true,
           top: 'stripes', cloth: '#ffffff', clothD: '#2c3e78', inner: '#c0392b', innerD: '#962a1f', pants: '#7a5236', shoe: '#2a2026', boots: true, arm: '#ffffff', sleeveSkin: true },
  ace: { skin: '#f3bd85', skinD: '#dc9d66', hair: '#1f1a22', hairL: '#3d3443', hairStyle: 'wavy', freckles: true, hat: 'cowboy', top: 'bare', beads: true, pants: '#2a2730', shorts: true, shoe: '#2a2026', boots: true, arm: '#f3bd85' },
  sabo: { skin: '#f7cc9c', skinD: '#e2ab78', hair: '#f2cf55', hairL: '#ffe58a', hairStyle: 'curly', hat: 'top', scar: true,
          top: 'coat', cloth: '#2f4f8f', clothD: '#223a6c', inner: '#f4f1ea', innerD: '#cfc8b8', cravat: true, pants: '#3a3340', shoe: '#6b4630', boots: true, cuff: '#f4f1ea' },
};

// Full-body figure. Canvas 1000x1900; local coords are offset by (120,110); the head is centred at local (380,330).
// Feet rest on canvas y = FEET. pose: idle | hold | sip | raise | punch | cheer | shrug | holdUp
export const FIG = { W: 1000, H: 1900, OX: 120, OY: 110, FEET: 1745, HEAD: [380, 330] };
const SH = { L: [262, 690], R: [498, 690] };
export const POSES = {
  idle:   { L: [[226, 880], [222, 1060], 'round'], R: [[534, 880], [538, 1060], 'round'] },
  hold:   { L: [[226, 880], [222, 1060], 'round'], R: [[585, 900], [480, 880], 'round'] },
  sip:    { L: [[226, 880], [222, 1060], 'round'], R: [[600, 800], [470, 560], 'round'] },
  raise:  { L: [[140, 620], [165, 420], 'open'], R: [[534, 880], [538, 1060], 'round'] },
  punch:  { L: [[226, 880], [222, 1060], 'round'], R: [[660, 700], [820, 690], 'fist'] },
  cheer:  { L: [[165, 560], [155, 390], 'fist'], R: [[595, 560], [605, 390], 'fist'] },
  shrug:  { L: [[165, 830], [105, 720], 'open'], R: [[595, 830], [655, 720], 'open'] },
  holdUp: { L: [[226, 880], [222, 1060], 'round'], R: [[640, 760], [620, 560], 'open'] },
};
// hand / head position of a figure drawn with its feet at (cx, fy), scale s, optionally mirrored
export function figPoint(lx, ly, cx, fy, s, flip = false) { const dx = (lx + FIG.OX - FIG.W / 2) * s; return [cx + (flip ? -dx : dx), fy + (ly + FIG.OY - FIG.FEET) * s]; }

function drawLegs(x, L) {
  const pants = L.pants, shoe = L.shoe;
  for (const [x0, x1] of [[262, 372], [388, 498]]) {
    x.beginPath(); x.moveTo(x0, 1060); x.lineTo(x1, 1060); x.lineTo(x1 - 6, 1580); x.lineTo(x0 + 6, 1580); x.closePath(); fs(x, pants, 12);
    if (L.shorts) { x.beginPath(); x.rect(x0 + 10, 1330, x1 - x0 - 20, 250); fs(x, L.skin, 10); x.beginPath(); x.moveTo(x0, 1330); x.lineTo(x1, 1330); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); }
    if (L.boots) { x.beginPath(); x.rect(x0 + 4, 1440, x1 - x0 - 8, 145); fs(x, shoe, 11); }
    x.beginPath(); x.ellipse((x0 + x1) / 2 + (x0 < 380 ? -14 : 14), 1600, 76, 36, 0, 0, 7); fs(x, shoe, 12);
    if (!L.boots) { x.beginPath(); x.ellipse((x0 + x1) / 2 + (x0 < 380 ? -14 : 14), 1622, 74, 14, 0, 0, Math.PI); x.lineWidth = 12; x.strokeStyle = '#f4f4f4'; x.stroke(); }
  }
  x.lineWidth = 6; x.strokeStyle = 'rgba(0,0,0,0.2)'; x.beginPath(); x.moveTo(318, 1150); x.lineTo(320, 1250); x.moveTo(444, 1150); x.lineTo(442, 1250); x.stroke(); // fold lines
}
function drawTorso(x, L) {
  const torso = () => { x.beginPath(); x.moveTo(236, 1090); x.lineTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(524, 1090); x.closePath(); };
  if (L.top === 'hoodie') {
    x.beginPath(); x.moveTo(262, 670); x.bezierCurveTo(262, 590, 498, 590, 498, 670); x.lineTo(470, 700); x.lineTo(290, 700); x.closePath(); fs(x, L.clothD, 12); // hood
    torso(); fs(x, L.cloth, 12);
    x.beginPath(); x.moveTo(316, 640); x.quadraticCurveTo(380, 712, 444, 640); x.closePath(); fs(x, L.inner, 10);
    x.beginPath(); x.moveTo(298, 642); x.quadraticCurveTo(380, 760, 462, 642); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
    x.lineWidth = 7; x.strokeStyle = '#f2f2f2'; for (const dx of [345, 415]) { x.beginPath(); x.moveTo(dx, 700); x.lineTo(dx + (dx < 380 ? -4 : 4), 800); x.stroke(); x.beginPath(); x.arc(dx + (dx < 380 ? -4 : 4), 806, 8, 0, 7); fs(x, '#f2f2f2', 5); }
    x.beginPath(); x.moveTo(290, 1000); x.lineTo(300, 930); x.lineTo(460, 930); x.lineTo(470, 1000); x.lineWidth = 9; x.strokeStyle = L.clothD; x.stroke(); // pocket
    rrect(x, 230, 1050, 300, 50, 18); fs(x, L.clothD, 11); // hem band
  } else if (L.top === 'stripes') {
    torso(); fs(x, L.cloth, 12); x.save(); torso(); x.clip(); x.fillStyle = L.clothD; for (let y = 660; y < 1100; y += 56) x.fillRect(200, y, 360, 26); x.restore();
    torso(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
    x.beginPath(); x.rect(232, 1020, 296, 60); fs(x, L.inner, 10); x.beginPath(); x.moveTo(500, 1050); x.lineTo(560, 1150); x.lineTo(520, 1160); x.lineTo(480, 1070); fs(x, L.inner, 9); // sash
  } else if (L.top === 'coat') {
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(560, 1330); x.lineTo(200, 1330); x.closePath(); fs(x, L.cloth, 12); // long coat
    x.beginPath(); x.moveTo(318, 640); x.lineTo(442, 640); x.lineTo(430, 1080); x.lineTo(330, 1080); x.closePath(); fs(x, L.inner, 10);
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 - sd * 62, 640); x.lineTo(380 - sd * 110, 700); x.lineTo(380 - sd * 70, 760); x.lineTo(380 - sd * 52, 1080); x.lineTo(380 - sd * 62, 1080); x.closePath(); fs(x, L.clothD, 10); }
    x.lineWidth = 7; x.strokeStyle = L.clothD; x.beginPath(); x.moveTo(240, 1200); x.lineTo(260, 1320); x.moveTo(520, 1200); x.lineTo(500, 1320); x.stroke();
    if (L.cravat) { x.beginPath(); x.moveTo(350, 648); x.lineTo(410, 648); x.lineTo(395, 720); x.lineTo(380, 760); x.lineTo(365, 720); x.closePath(); fs(x, '#f7f4ee', 8); }
  } else if (L.top === 'tee') {
    torso(); fs(x, L.cloth, 12);
    x.beginPath(); x.moveTo(318, 640); x.quadraticCurveTo(380, 700, 442, 640); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
    x.lineWidth = 7; x.strokeStyle = L.clothD; x.beginPath(); x.moveTo(280, 900); x.quadraticCurveTo(300, 980, 290, 1060); x.moveTo(480, 900); x.quadraticCurveTo(460, 980, 470, 1060); x.stroke();
    rrect(x, 228, 1040, 304, 52, 14); fs(x, '#8a5a3c', 11);
  } else if (L.top === 'vest') {
    torso(); fs(x, L.inner, 12);
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 150, 650); x.lineTo(380 + sd * 60, 650); x.lineTo(380 + sd * 40, 1090); x.lineTo(380 + sd * 146, 1090); x.closePath(); fs(x, L.cloth, 11); }
    x.fillStyle = L.clothD; for (const yy of [760, 860]) for (const sd of [-1, 1]) { rrect(x, 380 + sd * 95 - 26, yy, 52, 40, 8); fs(x, L.clothD, 7); }
    rrect(x, 228, 1040, 304, 52, 14); fs(x, '#3a2a20', 11); x.beginPath(); x.arc(560, 1080, 1, 0, 7);
  } else { // bare chest
    torso(); fs(x, L.skin, 12);
    x.lineWidth = 6; x.strokeStyle = L.skinD; x.beginPath(); x.moveTo(380, 760); x.lineTo(380, 1000); x.moveTo(290, 790); x.quadraticCurveTo(330, 815, 370, 790); x.moveTo(390, 790); x.quadraticCurveTo(430, 815, 470, 790); x.stroke();
    x.beginPath(); x.moveTo(300, 860); x.lineTo(460, 860); x.moveTo(305, 930); x.lineTo(455, 930); x.lineWidth = 5; x.stroke();
    rrect(x, 228, 1040, 304, 52, 14); fs(x, '#e8822e', 11); rrect(x, 345, 1036, 70, 60, 10); fs(x, '#ffd34d', 9); // belt + buckle
  }
  // white rim light on the upper-left edge
  x.beginPath(); x.moveTo(240, 1000); x.lineTo(238, 730); x.quadraticCurveTo(242, 664, 296, 650); x.lineWidth = 7; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke();
}
function drawArms(x, L, pose) {
  const P = POSES[pose] || POSES.idle, armCol = L.arm || L.cloth || L.skin;
  for (const side of ['L', 'R']) {
    const [sx, sy] = SH[side], [[ex, ey], [hx, hy], hand] = P[side];
    x.lineCap = 'round'; x.lineJoin = 'round';
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.lineTo(hx, hy);
    x.lineWidth = 86; x.strokeStyle = OL; x.stroke(); x.lineWidth = 64; x.strokeStyle = armCol; x.stroke();
    if (L.sleeveSkin) { x.beginPath(); x.moveTo(ex, ey); x.lineTo(hx, hy); x.lineWidth = 64; x.strokeStyle = L.skin; x.stroke(); x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.lineWidth = 64; x.strokeStyle = armCol; x.stroke(); }
    // cuff + hand
    const ang = Math.atan2(hy - ey, hx - ex);
    x.save(); x.translate(hx, hy); x.rotate(ang);
    if (L.cuff) { rrect(x, -30, -36, 26, 72, 10); fs(x, L.cuff, 8); }
    x.beginPath();
    if (hand === 'open') { x.ellipse(28, 0, 40, 36, 0, 0, 7); fs(x, L.skin, 10); for (const k of [-24, -8, 8, 24]) { x.save(); x.translate(64, k); x.rotate(k * 0.012); rrect(x, -12, -10, 40, 20, 10); fs(x, L.skin, 7); x.restore(); } }
    else { x.arc(26, 0, 40, 0, 7); fs(x, L.skin, 10); if (hand === 'fist') { x.lineWidth = 6; x.strokeStyle = OL; for (const k of [-16, 4]) { x.beginPath(); x.moveTo(48, k); x.lineTo(60, k + 6); x.stroke(); } } }
    x.restore();
  }
}

// expr: smug | grin | shock | shout | sad | worried | hit | calm | yuck
export function drawPerson({ who = 'host', expr = 'calm', mouth = 0, blink = false, pose = 'idle' }) {
  const L = LOOKS[who], c = mk(FIG.W, FIG.H), x = c.getContext('2d');
  x.translate(FIG.OX, FIG.OY);
  drawLegs(x, L);
  drawTorso(x, L);
  // ---- neck ----
  x.beginPath(); x.moveTo(325, 520); x.lineTo(325, 636); x.quadraticCurveTo(380, 660, 435, 636); x.lineTo(435, 520); x.closePath(); fs(x, L.skin, 10);
  x.beginPath(); x.moveTo(330, 560); x.quadraticCurveTo(380, 600, 430, 560); x.lineTo(430, 530); x.lineTo(330, 530); x.closePath(); x.fillStyle = L.skinD; x.fill();
  if (L.beads) for (let i = 0; i < 13; i++) { const a = Math.PI * (0.15 + 0.7 * i / 12); x.beginPath(); x.arc(380 - Math.cos(a) * 95, 640 + Math.sin(a) * 70, 15, 0, 7); fs(x, '#d8342c', 6); }
  // ---- ears + head ----
  for (const ex of [168, 592]) { x.beginPath(); x.ellipse(ex, 345, 34, 50, 0, 0, 7); fs(x, L.skin, 11); }
  const head = () => { x.beginPath(); x.moveTo(168, 320); x.bezierCurveTo(168, 115, 592, 115, 592, 320); x.bezierCurveTo(592, 470, 520, 560, 380, 566); x.bezierCurveTo(240, 560, 168, 470, 168, 320); x.closePath(); };
  head(); fs(x, L.skin, 12);
  if (L.beard) { x.beginPath(); x.moveTo(176, 380); x.bezierCurveTo(190, 520, 280, 600, 380, 604); x.bezierCurveTo(480, 600, 570, 520, 584, 380); x.bezierCurveTo(560, 470, 480, 470, 380, 470); x.bezierCurveTo(280, 470, 200, 470, 176, 380); fs(x, L.hair, 11); }
  // ---- eyes ----
  const ey = 360, eyes = [285, 475];
  const lid = blink ? 1 : ({ yuck: 1, smug: 0.48, grin: 0.3, shock: 0, shout: 0.12, sad: 0.35, worried: 0.1, hit: 1, calm: 0.4 })[expr];
  const look = ({ yuck: [0, 0], smug: [14, 6], grin: [0, 4], shock: [0, 0], shout: [0, 2], sad: [-6, 10], worried: [-10, 0], hit: [0, 0], calm: [6, 4] })[expr];
  eyes.forEach((ex, i) => {
    x.beginPath(); x.ellipse(ex, ey + 30, 56, 26, 0, 0.15 * Math.PI, 0.85 * Math.PI); x.lineWidth = 9; x.strokeStyle = L.skinD; x.stroke(); // tan eye bags
    if (expr === 'hit' || expr === 'yuck') { // squeezed >< eyes
      x.beginPath(); const s = i ? -1 : 1; x.moveTo(ex - 40 * s, ey - 30); x.lineTo(ex + 30 * s, ey); x.lineTo(ex - 40 * s, ey + 30); x.lineWidth = 13; x.strokeStyle = OL; x.stroke();
    } else {
      const rx = 54, ry = expr === 'shock' || expr === 'worried' ? 50 : 42;
      x.save(); x.beginPath(); x.ellipse(ex, ey, rx, ry, 0, 0, 7); x.fillStyle = '#fff'; x.fill(); x.clip();
      const pr = expr === 'shock' ? 13 : expr === 'worried' ? 17 : 23;
      x.beginPath(); x.arc(ex + look[0], ey + look[1], pr, 0, 7); x.fillStyle = '#16101a'; x.fill();
      x.beginPath(); x.arc(ex + look[0] - 7, ey + look[1] - 8, 6, 0, 7); x.fillStyle = '#fff'; x.fill();
      if (lid > 0) { x.fillStyle = L.skin; x.fillRect(ex - rx - 5, ey - ry - 5, rx * 2 + 10, (ry * 2 + 10) * lid); }
      x.restore();
      x.beginPath(); x.ellipse(ex, ey, rx, ry, 0, 0, 7); x.lineWidth = 11; x.strokeStyle = OL; x.stroke();
      if (lid > 0) { const ly = ey - ry - 5 + (ry * 2 + 10) * lid; x.beginPath(); x.moveTo(ex - rx - 4, ly + 3); x.quadraticCurveTo(ex, ly - 6, ex + rx + 4, ly + 3); x.lineWidth = 15; x.stroke(); }
    }
    const by = ({ yuck: -66, smug: i ? -82 : -72, grin: -84, shock: -104, shout: -70, sad: -82, worried: -96, hit: -80, calm: -80 })[expr];
    const tilt = ({ yuck: i ? 0.25 : -0.25, smug: i ? -0.08 : 0.06, grin: 0, shock: 0, shout: i ? -0.3 : 0.3, sad: i ? 0.25 : -0.25, worried: i ? 0.3 : -0.3, hit: i ? -0.2 : 0.2, calm: 0.02 })[expr];
    x.save(); x.translate(ex, ey + by); x.rotate(tilt);
    x.beginPath(); x.moveTo(-64, 6); x.quadraticCurveTo(0, -14, 64, 2); x.lineWidth = 24; x.strokeStyle = who === 'sabo' ? '#b88a2c' : OL; x.stroke(); x.restore();
  });
  if (L.goatee) { x.beginPath(); x.moveTo(330, 520); x.quadraticCurveTo(380, 610, 430, 520); x.quadraticCurveTo(380, 545, 330, 520); fs(x, L.hair, 9); }
  if (L.eyeScar) { x.lineWidth = 6; x.strokeStyle = '#a5523e'; x.beginPath(); x.moveTo(440, 418); x.quadraticCurveTo(478, 430, 512, 418); x.stroke(); for (const k of [455, 478, 500]) { x.beginPath(); x.moveTo(k, 410); x.lineTo(k + 4, 430); x.stroke(); } }
  if (L.shades) { for (const ex of [285, 475]) { rrect(x, ex - 74, 316, 148, 92, 34); fs(x, '#1c1a26', 10); x.beginPath(); x.moveTo(ex - 50, 336); x.lineTo(ex - 20, 336); x.lineWidth = 7; x.strokeStyle = 'rgba(255,255,255,0.75)'; x.stroke(); }
    x.beginPath(); x.moveTo(359, 350); x.lineTo(401, 350); x.lineWidth = 10; x.strokeStyle = OL; x.stroke(); }
  if (L.scar) { x.beginPath(); x.moveTo(430, 290); x.bezierCurveTo(560, 270, 580, 380, 545, 440); x.bezierCurveTo(500, 450, 440, 420, 430, 380); x.closePath(); x.fillStyle = 'rgba(214,120,110,0.45)'; x.fill(); }
  if (L.glasses) { // small round glasses
    x.lineWidth = 8; x.strokeStyle = OL;
    for (const ex of eyes) { x.beginPath(); x.arc(ex, ey + 4, 66, 0, 7); x.fillStyle = 'rgba(190,230,255,0.16)'; x.fill(); x.stroke();
      x.beginPath(); x.moveTo(ex - 34, ey - 34); x.lineTo(ex - 14, ey - 50); x.lineWidth = 6; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke(); x.lineWidth = 8; x.strokeStyle = OL; }
    x.beginPath(); x.moveTo(351, ey - 4); x.quadraticCurveTo(380, ey - 22, 409, ey - 4); x.stroke();
    x.beginPath(); x.moveTo(219, ey - 6); x.lineTo(172, ey - 18); x.moveTo(541, ey - 6); x.lineTo(588, ey - 18); x.stroke();
  }
  if (expr === 'yuck') { x.fillStyle = 'rgba(110,200,90,0.45)'; for (const cx of [262, 498]) { x.beginPath(); x.ellipse(cx, 445, 52, 30, 0, 0, 7); x.fill(); } }
  // nose + mouth
  x.beginPath(); x.moveTo(372, 400); x.quadraticCurveTo(402, 428, 392, 450); x.quadraticCurveTo(382, 460, 368, 450); x.lineWidth = 9; x.strokeStyle = OL; x.stroke();
  x.lineWidth = 10;
  const open = Math.max(mouth, { shock: 0.7, shout: 0.85, hit: 0.6, worried: 0.25 }[expr] || 0);
  if (open > 0.05) {
    const mw = expr === 'grin' ? 70 : 52, mh = 10 + 46 * open;
    x.beginPath();
    if (expr === 'grin' || expr === 'smug') { x.moveTo(385 - mw, 478); x.quadraticCurveTo(385, 488, 385 + mw, 474); x.quadraticCurveTo(385 + mw * 0.7, 480 + mh * 1.2, 385, 482 + mh * 1.2); x.quadraticCurveTo(385 - mw * 0.8, 480 + mh, 385 - mw, 478); }
    else if (expr === 'worried' || expr === 'sad') { x.moveTo(330, 500 + mh * 0.3); x.quadraticCurveTo(385, 470 - mh * 0.4, 440, 500 + mh * 0.3); x.quadraticCurveTo(385, 500 + mh * 0.6, 330, 500 + mh * 0.3); }
    else x.ellipse(385, 492, mw * 0.72, mh * 0.85, 0, 0, 7);
    x.save(); fs(x, '#5a1f2a', 10); x.clip();
    x.beginPath(); x.ellipse(385, 504 + mh, mw * 0.6, mh * 0.6, 0, 0, 7); x.fillStyle = '#ef7b8b'; x.fill();
    x.restore();
  } else if (expr === 'sad') { x.beginPath(); x.moveTo(345, 498); x.quadraticCurveTo(385, 474, 425, 498); x.stroke(); }
  else if (expr === 'grin') { x.beginPath(); x.moveTo(318, 470); x.quadraticCurveTo(385, 530, 452, 466); x.stroke(); }
  else if (expr === 'yuck') { x.beginPath(); x.moveTo(320, 492); for (let k = 1; k <= 6; k++) x.lineTo(320 + k * 22, k % 2 ? 474 : 498); x.stroke(); x.beginPath(); x.ellipse(400, 510, 22, 26, 0, 0, Math.PI); x.fillStyle = '#ef7b8b'; x.fill(); x.lineWidth = 8; x.stroke(); }
  else if (expr === 'calm') { x.beginPath(); x.moveTo(345, 488); x.quadraticCurveTo(385, 496, 425, 486); x.stroke(); }
  else { x.beginPath(); x.moveTo(330, 486); x.quadraticCurveTo(370, 498, 415, 486); x.quadraticCurveTo(440, 478, 452, 462); x.stroke(); }
  if (L.freckles) { x.fillStyle = '#b8683e'; for (const cx of [262, 498]) for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(cx - 26 + (i % 3) * 24 + (i > 2 ? 12 : 0), 432 + (i > 2 ? 18 : 0), 5, 0, 7); x.fill(); } }
  // ---- hair ----
  x.beginPath();
  if (L.hairStyle === 'messy') {
    x.moveTo(156, 350); x.bezierCurveTo(130, 230, 150, 160, 190, 130);
    const tufts = [[170, 95], [230, 120], [250, 55], [310, 100], [350, 30], [400, 92], [460, 40], [490, 105], [560, 70], [555, 140], [620, 150]];
    for (const [tx, ty] of tufts) x.lineTo(tx, ty);
    x.bezierCurveTo(630, 220, 612, 300, 604, 350); x.lineTo(586, 340); x.lineTo(575, 250);
    // fringe falling over the forehead in spikes
    [[540, 290], [520, 225], [470, 285], [445, 220], [395, 300], [370, 222], [320, 280], [300, 222], [250, 270], [235, 230], [190, 290], [176, 345]].forEach(([fx, fy]) => x.lineTo(fx, fy));
    x.closePath();
  } else if (L.hairStyle === 'wavy') {
    x.moveTo(150, 360); x.bezierCurveTo(110, 70, 650, 70, 610, 360);
    for (let i = 0; i <= 8; i++) x.lineTo(600 - i * 55, i % 2 ? 300 : 240);
    x.closePath();
  } else if (L.hairStyle === 'curly') {
    x.moveTo(140, 380); x.bezierCurveTo(100, 70, 660, 70, 620, 380); x.quadraticCurveTo(600, 300, 560, 250);
    x.quadraticCurveTo(450, 250, 380, 225); x.quadraticCurveTo(300, 255, 210, 250); x.quadraticCurveTo(170, 300, 140, 380); x.closePath();
  } else if (L.hairStyle === 'bald') { x.moveTo(380, 330);
  } else { // bandana
    x.moveTo(160, 300); x.bezierCurveTo(150, 100, 610, 100, 600, 300); x.quadraticCurveTo(380, 250, 160, 300); x.closePath();
  }
  fs(x, L.hairStyle === 'bandana' ? '#7b3fb5' : L.hair, 12);
  if (L.hairStyle === 'bald') { x.beginPath(); x.arc(300, 190, 40, Math.PI * 1.1, Math.PI * 1.6); x.lineWidth = 12; x.strokeStyle = 'rgba(255,255,255,0.8)'; x.stroke(); }
  if (L.hairStyle === 'bandana') { x.fillStyle = '#fff'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(220 + (i % 5) * 80 + (i > 4 ? 40 : 0), 190 + (i > 4 ? 45 : 0), 9, 0, 7); x.fill(); }
    x.beginPath(); x.moveTo(600, 260); x.lineTo(690, 230); x.lineTo(670, 300); x.closePath(); fs(x, '#7b3fb5', 10); }
  x.lineWidth = 8; x.strokeStyle = L.hairL;
  if (L.hairStyle !== 'bandana' && L.hairStyle !== 'bald') { x.beginPath(); x.moveTo(250, 150); x.quadraticCurveTo(330, 110, 420, 125); x.stroke(); x.beginPath(); x.moveTo(470, 140); x.quadraticCurveTo(530, 160, 560, 210); x.stroke(); }
  // thin white rim light along the upper-left edge
  if (!L.hat) { x.beginPath(); x.ellipse(380, 330, 226, 215, 0, Math.PI * 1.06, Math.PI * 1.48); x.lineWidth = 9; x.strokeStyle = '#fff'; x.stroke(); }
  if (L.hat === 'straw') {
    x.beginPath(); x.ellipse(380, 190, 320, 64, -0.04, 0, 7); fs(x, '#f2c94c', 12);
    x.beginPath(); x.moveTo(236, 192); x.bezierCurveTo(236, 50, 524, 50, 524, 192); x.quadraticCurveTo(380, 214, 236, 192); fs(x, '#f6d466', 12);
    x.beginPath(); x.moveTo(242, 168); x.quadraticCurveTo(380, 196, 518, 168); x.lineWidth = 26; x.strokeStyle = '#c0392b'; x.stroke();
    x.lineWidth = 4; x.strokeStyle = 'rgba(150,110,30,0.5)'; for (let k = 0; k < 6; k++) { x.beginPath(); x.ellipse(380, 190, 300 - k * 40, 58 - k * 7, -0.04, 0.2, 2.9); x.stroke(); }
  } else if (L.hat === 'cowboy') {
    x.beginPath(); x.ellipse(380, 175, 330, 60, -0.05, 0, 7); fs(x, '#e8822e', 12);
    x.beginPath(); x.moveTo(230, 175); x.bezierCurveTo(230, 20, 530, 20, 530, 175); x.quadraticCurveTo(380, 200, 230, 175); fs(x, '#f19a3f', 12);
    x.beginPath(); x.moveTo(236, 150); x.quadraticCurveTo(380, 175, 524, 150); x.lineWidth = 22; x.strokeStyle = '#c0392b'; x.stroke();
    for (let i = 0; i < 7; i++) { x.beginPath(); x.arc(250 + i * 45, 152 + Math.sin(i / 6 * Math.PI) * 10, 9, 0, 7); fs(x, '#ffd34d', 4); }
  } else if (L.hat === 'top') {
    x.beginPath(); x.ellipse(380, 165, 250, 46, 0.04, 0, 7); fs(x, '#26232b', 12);
    rrect(x, 255, -60, 250, 225, 18); fs(x, '#2e2a35', 12);
    x.fillStyle = '#4b6db2'; x.fillRect(262, 115, 236, 30);
    for (const gx of [330, 430]) { x.beginPath(); x.arc(gx, 62, 34, 0, 7); fs(x, '#9bd6ff', 10); x.beginPath(); x.arc(gx - 10, 52, 9, 0, 7); x.fillStyle = '#fff'; x.fill(); }
    x.beginPath(); x.moveTo(364, 62); x.lineTo(396, 62); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
  }
  drawArms(x, L, pose);
  return c;
}

// ======================= props =======================
export function mug(x, cx, cy, s = 1, t = 0, steam = true, hand = true) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (steam) { x.lineWidth = 10; x.lineCap = 'round'; for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.strokeStyle = `rgba(255,255,255,${0.75 * (1 - ph)})`; x.beginPath();
    for (let k = 0; k <= 10; k++) { const yy = -90 - k * 10 - ph * 60; x.lineTo(-25 + i * 25 + Math.sin(k * 0.7 + t * 4 + i) * 10, yy); } x.stroke(); } }
  x.beginPath(); x.arc(62, 0, 34, -Math.PI / 2, Math.PI / 2); x.lineWidth = 26; x.strokeStyle = OL; x.stroke(); x.lineWidth = 12; x.strokeStyle = '#ff7eb3'; x.stroke();
  rrect(x, -62, -78, 124, 150, 22); fs(x, '#ff7eb3', 11);
  x.beginPath(); x.ellipse(0, -76, 58, 14, 0, 0, 7); fs(x, '#5a3524', 8);
  x.beginPath(); x.moveTo(-44, -50); x.lineTo(-44, 40); x.lineWidth = 9; x.strokeStyle = 'rgba(255,255,255,0.8)'; x.stroke();
  if (hand) { x.beginPath(); x.ellipse(-58, 10, 34, 46, 0.2, 0, 7); fs(x, '#f6c690', 10);
  x.lineWidth = 6; x.strokeStyle = OL; for (const yy of [-6, 18]) { x.beginPath(); x.moveTo(-40, yy); x.quadraticCurveTo(-28, yy + 6, -40, yy + 14); x.stroke(); } }
  x.restore();
}

export function fist(x, cx, cy, s = 1, sleeve = '#22a99a', rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s);
  rrect(x, -230, -78, 160, 156, 34); fs(x, sleeve, 12);
  x.beginPath(); x.moveTo(-80, -70); x.lineTo(-80, 70); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(0, 0, 98, 84, 0, 0, 7); fs(x, '#f6c690', 12);
  x.lineWidth = 9; x.strokeStyle = OL;
  for (const yy of [-40, 0, 40]) { x.beginPath(); x.moveTo(42, yy - 20); x.quadraticCurveTo(98, yy, 42, yy + 20); x.stroke(); }
  x.beginPath(); x.moveTo(-40, -62); x.quadraticCurveTo(10, -30, 32, -72); x.stroke();
  x.restore();
}
export function openHand(x, cx, cy, s = 1, sleeve = '#22a99a') {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  rrect(x, -70, 110, 140, 200, 34); fs(x, sleeve, 12);
  x.beginPath(); x.ellipse(0, 50, 92, 86, 0, 0, 7); fs(x, '#f6c690', 12);
  [[-70, -10, -0.5], [-30, -50, -0.15], [15, -58, 0.05], [58, -40, 0.3]].forEach(([fx, fy, r]) => { x.save(); x.translate(fx, fy + 20); x.rotate(r); rrect(x, -20, -70, 40, 100, 20); fs(x, '#f6c690', 10); x.restore(); });
  x.beginPath(); x.ellipse(0, 50, 80, 72, 0, 0.1, Math.PI - 0.1); x.fillStyle = '#f6c690'; x.fill();
  x.save(); x.translate(88, 60); x.rotate(0.7); rrect(x, -18, -55, 36, 80, 18); fs(x, '#f6c690', 10); x.restore();
  x.restore();
}
export function sword(x, cx, cy, rot, s = 1, haki = false) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s);
  if (haki) { x.shadowColor = '#b07cff'; x.shadowBlur = 40; }
  x.beginPath(); x.moveTo(-40, -18); x.lineTo(280, -18); x.lineTo(330, 0); x.lineTo(280, 18); x.lineTo(-40, 18); x.closePath(); fs(x, haki ? '#1d1630' : '#e7eef6', 10);
  x.shadowBlur = 0;
  x.beginPath(); x.moveTo(-10, -5); x.lineTo(268, -5); x.lineWidth = 5; x.strokeStyle = haki ? '#7a5cff' : '#fff'; x.stroke();
  rrect(x, -62, -52, 24, 104, 8); fs(x, '#c99a2e', 9);
  rrect(x, -160, -15, 100, 30, 10); fs(x, '#4a2c3a', 9);
  x.restore();
}
export function bullet(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  x.beginPath(); x.moveTo(-40, -16); x.lineTo(10, -16); x.quadraticCurveTo(50, 0, 10, 16); x.lineTo(-40, 16); x.closePath(); fs(x, '#e0b04a', 9);
  x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 6; for (let i = 1; i <= 3; i++) { x.beginPath(); x.moveTo(-50 - i * 34, -10 + i * 5); x.lineTo(-74 - i * 34, -10 + i * 5); x.stroke(); }
  x.restore();
}
export function trophy(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  for (const d of [-1, 1]) { x.beginPath(); x.arc(d * 120, -40, 50, d < 0 ? Math.PI * 0.5 : -Math.PI * 0.5, d < 0 ? Math.PI * 1.5 : Math.PI * 0.5); x.lineWidth = 16; x.strokeStyle = OL; x.stroke(); x.lineWidth = 8; x.strokeStyle = '#ffd34d'; x.stroke(); }
  x.beginPath(); x.moveTo(-130, -110); x.lineTo(130, -110); x.quadraticCurveTo(130, 60, 0, 80); x.quadraticCurveTo(-130, 60, -130, -110); x.closePath(); fs(x, '#ffc93a', 12);
  rrect(x, -30, 75, 60, 60, 6); fs(x, '#e0a52a', 10); rrect(x, -90, 130, 180, 46, 12); fs(x, '#8a5a3c', 10);
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.beginPath(); x.ellipse(-70, -40, 16, 50, 0, 0, 7); x.fill();
  x.restore();
}
export function floatie(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  x.beginPath(); x.ellipse(0, 0, 330, 120, 0, 0, 7); x.ellipse(0, -10, 190, 58, 0, 0, 7, true); fs(x, '#ffe14d', 12);
  x.save(); x.beginPath(); x.ellipse(0, 0, 330, 120, 0, 0, 7); x.clip(); x.fillStyle = '#ff5fa2';
  for (const a of [0.3, 1.4, 2.4, 3.5, 4.6, 5.6]) { x.beginPath(); x.moveTo(0, -10); x.arc(0, -10, 400, a, a + 0.45); x.closePath(); x.fill(); } x.restore();
  x.beginPath(); x.ellipse(0, -10, 190, 58, 0, 0, 7); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(0, 0, 330, 120, 0, 0, 7); x.stroke();
  x.restore();
}

// ======================= effects =======================
export function flame(x, cx, by, w, h, t, seed = 0, alpha = 1, palette = ['#e2361f', '#ff8a1d', '#ffd84a']) {
  const wob = (k) => Math.sin(t * (7 + seed % 3) + seed * 1.7 + k) * 0.12;
  x.save(); x.globalAlpha *= alpha;
  palette.forEach((col, li) => {
    const s = [1, 0.72, 0.42][li], ww = w * s, hh = h * s * (1 + wob(li) * 0.8), tipx = cx + Math.sin(t * 5 + seed) * w * 0.25 * s;
    x.beginPath(); x.moveTo(cx - ww / 2, by);
    x.bezierCurveTo(cx - ww * 0.7, by - hh * 0.45, cx - ww * (0.15 - wob(1)), by - hh * 0.65, tipx, by - hh);
    x.bezierCurveTo(cx + ww * (0.2 + wob(2)), by - hh * 0.6, cx + ww * 0.75, by - hh * 0.4, cx + ww / 2, by);
    x.quadraticCurveTo(cx, by + ww * 0.35, cx - ww / 2, by); x.closePath();
    x.fillStyle = col; x.fill();
    if (li === 0) { x.lineWidth = Math.max(4, w * 0.06); x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke(); }
  });
  x.restore();
}
export function glow(x, cx, cy, r, rgb, a = 1) {
  if (r <= 0) return;
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
}
// yellow shine / motion lines radiating around a powered part
export function shineLines(x, cx, cy, r0, r1, t, n = 10, col = '#ffe14d') {
  x.save(); x.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + hash(i) * 0.4, ph = (t * 2.2 + hash(i + 9)) % 1;
    const a0 = r0 + (r1 - r0) * ph * 0.5, a1 = a0 + (r1 - r0) * 0.45;
    x.globalAlpha = 1 - ph; x.lineWidth = 16; x.strokeStyle = OL;
    x.beginPath(); x.moveTo(cx + Math.cos(a) * a0, cy + Math.sin(a) * a0); x.lineTo(cx + Math.cos(a) * a1, cy + Math.sin(a) * a1); x.stroke();
    x.lineWidth = 8; x.strokeStyle = col; x.stroke();
  }
  x.restore();
}
export function speedLines(x, cx, cy, t, n = 14, len = 260, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.lineCap = 'round';
  for (let i = 0; i < n; i++) { const ph = (t * 3 + hash(i)) % 1, y = (hash(i + 3) - 0.5) * 360, xx = -ph * 600;
    x.globalAlpha = 0.8 * (1 - ph); x.lineWidth = 7; x.strokeStyle = '#fff'; x.beginPath(); x.moveTo(xx, y); x.lineTo(xx - len * (0.5 + hash(i)), y); x.stroke(); }
  x.restore();
}
// red-orange impact star
export function impactStar(x, cx, cy, r, rot = 0) {
  if (r <= 0) return;
  x.save(); x.translate(cx, cy); x.rotate(rot);
  const star = (rr, k) => { x.beginPath(); for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2, q = i % 2 ? rr * 0.48 : rr * (0.85 + 0.3 * hash(i + k)); x.lineTo(Math.cos(a) * q, Math.sin(a) * q); } x.closePath(); };
  star(r, 1); fs(x, '#ff4a2d', Math.max(5, r * 0.06)); star(r * 0.62, 2); fs(x, '#ffb02e', 0); star(r * 0.32, 3); fs(x, '#fff3a0', 0);
  x.restore();
}
export function glowRing(x, cx, cy, r, a, col = '255,240,170') {
  if (a <= 0) return;
  x.save(); x.globalAlpha = a; x.lineWidth = 34 * a + 6; x.strokeStyle = `rgba(${col},1)`; x.shadowColor = `rgba(${col},1)`; x.shadowBlur = 40;
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke(); x.restore();
}
// emotion marks: '!?' (red + yellow) or '?' (purple)
export function mark(x, kind, cx, cy, s = 1, rot = 0) {
  if (s <= 0) return;
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.font = `150px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round';
  const glyphs = kind === '!?' ? [['!', -34, '#ff3b3b'], ['?', 34, '#ffd23f']] : [['?', 0, '#b07cff']];
  for (const [g, dx, col] of glyphs) { x.lineWidth = 22; x.strokeStyle = OL; x.strokeText(g, dx, 0); x.fillStyle = col; x.fillText(g, dx, 0); }
  x.restore();
}
// pink Japanese sound marks (ゴ) floating in a diagonal stack
export function gogo(x, cx, cy, t, s = 1, n = 3) {
  x.save(); x.font = `bold ${130 * s}px "WenQuanYi Zen Hei", "IPAGothic", sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round';
  for (let i = 0; i < n; i++) { const px = cx + i * 70 * s, py = cy + i * 120 * s + Math.sin(t * 3 + i) * 10;
    x.save(); x.translate(px, py); x.rotate(-0.15 + Math.sin(t * 2 + i) * 0.05); x.scale(1 + 0.06 * Math.sin(t * 6 + i), 1 + 0.06 * Math.sin(t * 6 + i));
    x.lineWidth = 18 * s; x.strokeStyle = OL; x.strokeText('ゴ', 0, 0); x.fillStyle = '#ff6fb0'; x.fillText('ゴ', 0, 0); x.restore(); }
  x.restore();
}
export function sparkle(x, cx, cy, r, col = '#fff') {
  if (r <= 0) return;
  x.save(); x.translate(cx, cy); x.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.28 : r; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  x.closePath(); x.fillStyle = col; x.fill(); x.restore();
}
export function dust(x, W, H, t, n = 26, col = '255,255,255') {
  for (let i = 0; i < n; i++) {
    const px = (hash(i) * W + Math.sin(t * 0.4 + i) * 40 + t * 12 * (hash(i + 1) - 0.5) * 4 + W) % W;
    const py = (hash(i + 2) * H - t * (14 + hash(i + 3) * 26) + H * 10) % H;
    x.fillStyle = `rgba(${col},${0.25 + 0.35 * hash(i + 4)})`; x.beginPath(); x.arc(px, py, 3 + hash(i + 5) * 6, 0, 7); x.fill();
  }
}
export function bubble(x, cx, cy, r) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.lineWidth = 6; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke(); x.beginPath(); x.arc(cx - r * 0.35, cy - r * 0.35, r * 0.22, 0, 7); x.fillStyle = '#fff'; x.fill(); }
export function sweat(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.moveTo(0, -40); x.quadraticCurveTo(30, 0, 0, 22); x.quadraticCurveTo(-30, 0, 0, -40); fs(x, '#8fd3ff', 7); x.restore(); }
// a little sun (Flame Emperor)
export function sun(x, cx, cy, r, t) {
  if (r <= 0) return;
  for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + t * 0.7; x.save(); x.translate(cx + Math.cos(a) * r * 0.82, cy + Math.sin(a) * r * 0.82); x.rotate(a + Math.PI / 2); flame(x, 0, 0, r * 0.5, r * 0.75, t, i); x.restore(); }
  const g = x.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r); g.addColorStop(0, '#fff6b0'); g.addColorStop(0.5, '#ffc93a'); g.addColorStop(1, '#ff7a1f');
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = g; x.fill(); x.lineWidth = Math.max(6, r * 0.04); x.strokeStyle = OL; x.stroke();
  x.lineWidth = Math.max(4, r * 0.03); x.strokeStyle = 'rgba(230,90,20,0.8)';
  for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(cx, cy, r * (0.35 + i * 0.15), t * (1 + i * 0.3) + i, t * (1 + i * 0.3) + i + 2); x.stroke(); }
  x.beginPath(); x.arc(cx, cy, r * 0.88, Math.PI * 1.1, Math.PI * 1.4); x.lineWidth = r * 0.06; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke();
}
export function firefly(x, cx, cy, s, t, i) {
  const tw = 0.75 + 0.25 * Math.sin(t * 9 + i);
  glow(x, cx, cy, 70 * s * tw, '255,170,60', 0.8);
  x.beginPath(); x.arc(cx, cy, 17 * s, 0, 7); x.fillStyle = '#ffd84a'; x.fill(); x.lineWidth = 5; x.strokeStyle = OL; x.stroke();
  sparkle(x, cx + 10 * s, cy - 12 * s, 9 * s * tw);
}
// generic dark fruit silhouette (unnamed, no identifiable design)
export function fruitSilhouette(x, cx, cy, r, k) {
  x.save(); x.translate(cx, cy);
  x.beginPath();
  if (k % 3 === 0) x.arc(0, 0, r, 0, 7);
  else if (k % 3 === 1) x.ellipse(0, 0, r * 0.8, r, 0.3, 0, 7);
  else { x.moveTo(0, -r); x.bezierCurveTo(r * 1.2, -r, r, r, 0, r); x.bezierCurveTo(-r, r, -r * 1.2, -r, 0, -r); }
  fs(x, '#2b2140', 8, '#140f22');
  x.beginPath(); x.moveTo(0, -r * 0.95); x.quadraticCurveTo(r * 0.2, -r * 1.35, r * 0.4, -r * 1.25); x.lineWidth = 10; x.strokeStyle = '#140f22'; x.stroke();
  x.beginPath(); x.arc(-r * 0.2, r * 0.05, r * 0.35, 0.5, 5.5); x.lineWidth = 6; x.strokeStyle = 'rgba(160,130,220,0.35)'; x.stroke();
  x.restore();
}
export function globe(x, cx, cy, r, t) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = '#3fa7e8'; x.fill(); x.clip();
  x.fillStyle = '#7fd36a';
  for (let i = 0; i < 6; i++) { const lon = ((i / 6 + t * 0.12) % 1) * 2 - 1, px = cx + Math.sin(lon * Math.PI) * r, w = Math.cos(lon * Math.PI) * r * 0.35;
    if (Math.cos(lon * Math.PI) > 0) { x.beginPath(); x.ellipse(px, cy + (hash(i) - 0.5) * r, Math.abs(w), r * (0.2 + hash(i + 1) * 0.2), 0, 0, 7); x.fill(); } }
  x.restore();
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(cx, cy, r, r * 0.3, 0, 0, 7); x.lineWidth = 5; x.strokeStyle = 'rgba(255,255,255,0.4)'; x.stroke();
  x.beginPath(); x.arc(cx, cy, r * 0.85, Math.PI * 1.1, Math.PI * 1.4); x.lineWidth = 12; x.strokeStyle = 'rgba(255,255,255,0.8)'; x.stroke();
}

// ======================= HUD pieces =======================
export function drawBanner(text, color = 'pink') {
  const [c0, c1, tail] = BANNER[color], w = 860, h = 240, c = mk(w, h), x = c.getContext('2d');
  x.beginPath(); x.moveTo(40, 70); x.lineTo(130, 80); x.lineTo(130, 190); x.lineTo(50, 205); x.lineTo(75, 140); x.closePath(); fs(x, tail, 10);
  x.beginPath(); x.moveTo(w - 40, 60); x.lineTo(w - 130, 70); x.lineTo(w - 130, 180); x.lineTo(w - 50, 195); x.lineTo(w - 75, 125); x.closePath(); fs(x, tail, 10);
  rrect(x, 100, 45, w - 200, 140, 26); const g = x.createLinearGradient(0, 45, 0, 185); g.addColorStop(0, c0); g.addColorStop(1, c1); fs(x, g, 12);
  x.fillStyle = 'rgba(255,255,255,0.35)'; rrect(x, 120, 58, w - 240, 26, 13); x.fill();
  let size = 96; x.font = `${size}px ${FONT}`; while (x.measureText(text).width > w - 270) { size -= 4; x.font = `${size}px ${FONT}`; }
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 17; x.strokeStyle = OL; x.lineJoin = 'round'; x.strokeText(text, w / 2, 122); x.fillStyle = '#fff'; x.fillText(text, w / 2, 122);
  sparkle(x, 110, 40, 16); sparkle(x, w - 120, 190, 12);
  return c;
}
// corner overlays
export function scopeOverlay(x, cx, cy, r, t, inner) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = 'rgba(20,40,30,0.9)'; x.fill(); x.clip(); inner(x); x.restore();
  x.lineWidth = 14; x.strokeStyle = OL; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke(); x.lineWidth = 6; x.strokeStyle = '#5fe07a'; x.stroke();
  x.lineWidth = 4; x.strokeStyle = 'rgba(95,224,122,0.9)'; x.beginPath(); x.moveTo(cx - r, cy); x.lineTo(cx + r, cy); x.moveTo(cx, cy - r); x.lineTo(cx, cy + r); x.stroke();
  x.beginPath(); x.arc(cx, cy, r * 0.45, 0, 7); x.stroke();
  const a = t * 2; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, r, a, a + 0.5); x.closePath(); x.fillStyle = 'rgba(95,224,122,0.18)'; x.fill();
}
export function meterOverlay(x, X, Y, h, pct, label) {
  rrect(x, X, Y, 90, h, 26); fs(x, '#2a2140', 12);
  const fh = (h - 24) * pct; rrect(x, X + 12, Y + h - 12 - fh, 66, Math.max(fh, 1), 18);
  const g = x.createLinearGradient(0, Y + h, 0, Y); g.addColorStop(0, '#ff4a2d'); g.addColorStop(1, '#ffd84a'); x.fillStyle = g; x.fill();
  x.font = `58px ${FONT}`; x.textAlign = 'center'; x.lineJoin = 'round'; x.lineWidth = 12; x.strokeStyle = OL;
  const txt = `${Math.round(pct * 100)}%`; x.strokeText(txt, X + 45, Y - 30); x.fillStyle = '#fff'; x.fillText(txt, X + 45, Y - 30);
  if (label) { x.font = `40px ${FONT}`; x.strokeText(label, X + 45, Y + h + 52); x.fillStyle = '#ffc931'; x.fillText(label, X + 45, Y + h + 52); }
}
export function magnifier(x, cx, cy, r, t, inner) {
  x.save(); x.translate(cx + r * 0.7, cy + r * 0.7); x.rotate(-Math.PI / 4); rrect(x, -26, 0, 52, r * 0.9, 20); fs(x, '#8a5a3c', 12); x.restore();
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = '#efe4ff'; x.fill(); x.clip();
  x.lineWidth = 10; x.strokeStyle = 'rgba(176,124,255,0.55)'; x.beginPath();
  for (let a = 0; a < Math.PI * 8; a += 0.1) { const rr = r * a / (Math.PI * 8); x.lineTo(cx + Math.cos(a + t * 2) * rr, cy + Math.sin(a + t * 2) * rr); } x.stroke();
  inner(x); x.restore();
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.lineWidth = 18; x.strokeStyle = OL; x.stroke(); x.lineWidth = 9; x.strokeStyle = '#ffd34d'; x.stroke();
  x.beginPath(); x.arc(cx, cy, r * 0.82, Math.PI * 1.1, Math.PI * 1.4); x.lineWidth = 10; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke();
}
// pedestal for the FORMS stage
export function pedestal(x, cx, cy, label, lit) {
  x.beginPath(); x.ellipse(cx, cy + 40, 120, 34, 0, 0, Math.PI); x.lineTo(cx - 120, cy); x.fillStyle = '#5b3b8f'; x.fill();
  x.beginPath(); x.moveTo(cx - 120, cy); x.lineTo(cx - 120, cy + 40); x.ellipse(cx, cy + 40, 120, 34, 0, Math.PI, 0, true); x.lineTo(cx + 120, cy); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(cx, cy, 120, 34, 0, 0, 7); fs(x, lit ? '#a77ee8' : '#8a63c9', 10);
  x.setLineDash([14, 12]); x.beginPath(); x.ellipse(cx, cy, 96, 24, 0, 0, 7); x.lineWidth = 5; x.strokeStyle = 'rgba(255,255,255,0.75)'; x.stroke(); x.setLineDash([]);
  x.font = `50px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = 13; x.strokeStyle = OL;
  x.strokeText(label, cx, cy + 112); x.fillStyle = lit ? '#ffe14d' : '#ffc931'; x.fillText(label, cx, cy + 112);
}
export function progressBar(x, cx, cy, w, pct, label) {
  rrect(x, cx - w / 2, cy - 38, w, 76, 38); fs(x, '#2a2140', 12);
  if (pct > 0) { rrect(x, cx - w / 2 + 12, cy - 26, (w - 24) * pct, 52, 26); x.fillStyle = '#ffd23f'; x.fill(); x.fillStyle = 'rgba(255,255,255,0.45)'; rrect(x, cx - w / 2 + 22, cy - 20, Math.max(0, (w - 44) * pct), 12, 6); x.fill(); }
  if (label) { x.font = `56px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = 14; x.strokeStyle = OL; x.strokeText(label, cx, cy + 4); x.fillStyle = '#fff'; x.fillText(label, cx, cy + 4); }
}
// host gear variants (same character, different colours)
LOOKS.host_g2 = { ...LOOKS.host, skin: '#ff9a96', skinD: '#e2716d' };
LOOKS.host_g5 = { ...LOOKS.host, hair: '#ffffff', hairL: '#d9e0ff', cloth: '#f4f4f8', clothD: '#cfd0dc', inner: '#ffffff', pants: '#e3e3ec', cuff: '#cfd0dc', shoe: '#ffffff' };
