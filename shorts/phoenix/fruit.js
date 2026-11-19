// Tori Tori no Mi, Model: Phoenix, from the user's reference: a pineapple whose skin is made of turquoise flame-shaped scales,
// each curling into a swirl, under a crown of golden flame-like leaves with a heart-shaped piece at the base. No face or limbs.
import { OL } from '/engine/art.js';
export const TORI = { body: '#2ad8e0', lit: '#9ff6f8', shade: '#14a8c0', swirl: '#0a6f88', leaf: '#ffd23a', leafD: '#e8a515', leafL: '#fff2a0' };
function body(x, cx, cy, R) { x.beginPath(); x.ellipse(cx, cy + R * 0.1, R * 0.72, R * 0.88, 0, 0, 7); }
function scale(x, px, py, s, flip) { // one flame-shaped scale with a curl
  x.save(); x.translate(px, py); x.scale(flip ? -s : s, s);
  x.beginPath(); x.moveTo(-40, 30); x.quadraticCurveTo(-48, -18, -10, -36); x.quadraticCurveTo(20, -48, 30, -70); x.quadraticCurveTo(46, -20, 40, 10); x.quadraticCurveTo(30, 40, -40, 30); x.closePath();
  x.fillStyle = TORI.body; x.fill(); x.lineWidth = 5; x.strokeStyle = TORI.swirl; x.stroke();
  x.beginPath(); for (let a = 0; a <= Math.PI * 2.6; a += 0.2) { const r = 18 * a / (Math.PI * 2.6); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.lineWidth = 5; x.stroke();
  x.beginPath(); x.arc(-14, -12, 6, 0, 7); x.fillStyle = TORI.lit; x.fill();
  x.restore();
}
function flameLeaf(x, cx, cy, ang, len, w, col, R) { x.save(); x.translate(cx, cy); if (ang < 0) { x.scale(-1, 1); ang = -ang; } x.rotate(ang); x.beginPath(); x.moveTo(-w, 0); x.bezierCurveTo(-w * 1.2, -len * 0.5, w * 0.6, -len * 0.6, w * 0.2, -len); x.bezierCurveTo(w * 1.4, -len * 0.55, w * 1.1, -len * 0.2, w, 0); x.closePath();
  x.fillStyle = col; x.fill(); x.lineWidth = R * 0.025; x.strokeStyle = OL; x.stroke(); x.beginPath(); x.moveTo(0, -len * 0.15); x.quadraticCurveTo(w * 0.3, -len * 0.5, w * 0.1, -len * 0.8); x.lineWidth = R * 0.02; x.strokeStyle = TORI.leafL; x.stroke(); x.restore(); }
export function drawTori(x, cx, cy, R, rot = 0, { shadow = true } = {}) {
  if (R <= 0) return; x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.0, R * 0.65, R * 0.12, 0, 0, 7); x.fill(); }
  const sw = Math.sin(rot * 1.5) * 0.04, top = cy - R * 0.72;
  for (let i = 0; i < 7; i++) { const a = (i - 3) * 0.32 + sw, l = R * (0.95 - Math.abs(i - 3) * 0.12); flameLeaf(x, cx, top, a, l, R * 0.2, i % 2 ? TORI.leaf : TORI.leafD, R); }
  body(x, cx, cy, R); const g = x.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R); g.addColorStop(0, TORI.lit); g.addColorStop(1, TORI.shade); x.fillStyle = g; x.fill();
  x.save(); body(x, cx, cy, R); x.clip(); const s = R / 190;
  for (let r = 0; r < 7; r++) for (let k = -3; k <= 3; k++) scale(x, cx + (k + (r % 2 ? 0.5 : 0)) * 95 * s, cy - R * 0.62 + r * 66 * s * 1.4, s * 1.25, (r + k) % 2 === 0);
  x.restore();
  body(x, cx, cy, R); x.lineWidth = R * 0.05; x.strokeStyle = OL; x.stroke();
  // golden heart at the base of the crown
  x.save(); x.translate(cx, top + R * 0.08); x.scale(R / 190, R / 190); x.beginPath(); x.moveTo(0, 40); x.bezierCurveTo(-60, 0, -40, -40, 0, -14); x.bezierCurveTo(40, -40, 60, 0, 0, 40); x.closePath(); x.fillStyle = TORI.leaf; x.fill(); x.lineWidth = 5; x.strokeStyle = OL; x.stroke(); x.restore();
  x.restore();
}
