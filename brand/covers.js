// Video covers, 1080x1920. ?f=mera|gum|quake|ope|string|sheet
import { drawPerson, mark, sparkle, glow, OL, FONT, BANNER, drawBanner } from '/engine/art.js';
import { drawFruit } from '/engine/fruit.js';
import { drawGomu } from '/shorts/gum-gum/fruit.js';
import { drawGura } from '/shorts/quake/fruit.js';
import { drawOpe } from '/shorts/ope/fruit.js';
import { drawIto } from '/shorts/string/fruit.js';

const C = {
  mera:   { rays: ['#ffb24d', '#ff8a1d'], glow: '255,150,40', fruit: drawFruit, who: 'ace', whoExpr: 'smug', lines: [['WHAT IF YOU ATE THE', 84, '#ffffff'], ['FLAME-FLAME', 150, '#ffd84a'], ['FRUIT?', 110, '#ffd84a']], bottom: "ACE'S FRUIT" },
  gum:    { rays: ['#c9a8ff', '#9a6be8'], glow: '200,150,255', fruit: drawGomu, who: 'host_g5', whoExpr: 'grin', lines: [['ITS REAL NAME', 90, '#ffffff'], ["ISN'T GUM-GUM", 140, '#ff5fa2'], ['🤫', 1, '#ffffff']], bottom: 'GEAR 5 SECRET' },
  quake:  { rays: ['#7cc8ff', '#3c8fe0'], glow: '140,200,255', fruit: drawGura, who: 'whitebeard', whoExpr: 'smug', lines: [['THE FRUIT THAT CAN', 88, '#ffffff'], ['DESTROY THE', 140, '#ff4a3d'], ['WORLD', 150, '#ff4a3d']], bottom: 'TREMOR-TREMOR FRUIT' },
  ope:    { rays: ['#ff8a9a', '#e0303e'], glow: '255,120,140', fruit: drawOpe, who: 'corazon', whoExpr: 'grin', lines: [['THIS FRUIT COSTS', 92, '#ffffff'], ['YOUR LIFE', 160, '#ffd84a']], bottom: 'OP-OP FRUIT' },
  string: { rays: ['#dcc6f5', '#a07fd0'], glow: '220,200,255', fruit: drawIto, who: 'doflamingo', whoExpr: 'grin', lines: [['WHAT IF YOU ATE THE', 84, '#ffffff'], ['STRING-STRING', 150, '#ff5fa2'], ['FRUIT?', 110, '#ff5fa2']], bottom: "DOFLAMINGO'S FRUIT" },
};
function rays(x, a, b) { x.fillStyle = b; x.fillRect(0, 0, 1080, 1920); x.fillStyle = a; for (let i = 0; i < 28; i++) { const t = i / 28 * Math.PI * 2; x.beginPath(); x.moveTo(540, 960); x.arc(540, 960, 2400, t, t + Math.PI / 28); x.closePath(); x.fill(); } }
function title(x, text, y, size, fill, rot = -0.03) {
  x.save(); x.translate(540, y); x.rotate(rot); x.font = `${size}px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round';
  let s = size; while (x.measureText(text).width > 980) { s -= 4; x.font = `${s}px ${FONT}`; }
  x.fillStyle = 'rgba(10,6,25,0.5)'; x.fillText(text, 10, 16); x.lineWidth = s * 0.22; x.strokeStyle = OL; x.strokeText(text, 0, 0); x.fillStyle = fill; x.fillText(text, 0, 0); x.restore();
}
function figure(x, who, expr, pose, cx, fy, s, flip) { const im = drawPerson({ who, expr, pose }); x.save(); x.translate(cx, fy); x.scale(flip ? -s : s, s); x.drawImage(im, -500, -1745); x.restore(); return im; }
function cover(x, k) {
  const c = C[k]; rays(x, c.rays[0], c.rays[1]);
  const g = x.createRadialGradient(540, 960, 50, 540, 960, 900); g.addColorStop(0, 'rgba(255,255,255,0.45)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920);
  // characters on either side, faces clear of the fruit
  figure(x, c.who, c.whoExpr, 'shrug', 880, 2120, 0.86, true);
  figure(x, 'host', 'shock', 'shrug', 200, 2120, 0.86, false);
  mark(x, '!?', 370, 700, 1.3, 0.15);
  glow(x, 540, 1130, 380, c.glow, 0.9);
  c.fruit(x, 540, 1130, 215, 0.3, { shadow: false });
  for (const [sx, sy, r] of [[390, 1000, 34], [700, 960, 28], [690, 1330, 24], [380, 1300, 20]]) sparkle(x, sx, sy, r);
  // title block in the top safe area, label above the caption zone
  let y = 280; c.lines.forEach(([t, sz, col], i) => { if (sz < 10) return; title(x, t, y, sz, col, i % 2 ? -0.05 : -0.02); y += sz * 0.95 + 20; });
  title(x, c.bottom, 1470, 92, '#ffffff', 0.02);
}
export function sheet(cv, q) {
  const f = q.get('f') || 'sheet', x = cv.getContext('2d');
  if (f !== 'sheet') { cv.width = 1080; cv.height = 1920; cover(x, f); return; }
  const keys = Object.keys(C); cv.width = keys.length * 380 + 20; cv.height = 700; x.fillStyle = '#1b1530'; x.fillRect(0, 0, cv.width, cv.height);
  keys.forEach((k, i) => { const t = document.createElement('canvas'); t.width = 1080; t.height = 1920; cover(t.getContext('2d'), k); x.drawImage(t, 20 + i * 380, 20, 360, 640); });
}
