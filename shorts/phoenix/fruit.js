// Tori Tori no Mi, Model: Phoenix. Official design (One Piece Magazine Vol. 20, via search): shaped like a pineapple, an oval fruit
// with skin segmented into round fruitlets, each with a swirl and a prickly tip, and a crown of leaves on top (one source says golden leaves).
// Plain object: no face or limbs.
import { OL } from '/engine/art.js';
export const TORI = { body: '#5fbf8a', lit: '#9be0b4', shade: '#3f9a6a', swirl: '#1f5f48', tip: '#e8f4c8', leaf: '#e8c84a', leafD: '#c9a42a' };
function pine(x, cx, cy, R) { x.beginPath(); x.ellipse(cx, cy, R * 0.78, R, 0, 0, 7); }
function curl(x, cx, cy, r, lw) { x.beginPath(); for (let a = 0; a <= Math.PI * 3; a += 0.2) { const rr = r * a / (Math.PI * 3); x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.lineWidth = lw; x.strokeStyle = TORI.swirl; x.lineCap = 'round'; x.stroke(); }
export function drawTori(x, cx, cy, R, rot = 0, { shadow = true } = {}) {
  if (R <= 0) return; x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.02, R * 0.7, R * 0.13, 0, 0, 7); x.fill(); }
  // crown of leaves
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.32 + Math.sin(rot + i) * 0.03, l = R * (0.75 - Math.abs(i - 3) * 0.1);
    x.save(); x.translate(cx, cy - R * 0.85); x.rotate(a + Math.PI / 2); x.beginPath(); x.moveTo(-R * 0.09, 0); x.quadraticCurveTo(-R * 0.08, -l * 0.6, 0, -l); x.quadraticCurveTo(R * 0.08, -l * 0.6, R * 0.09, 0); x.closePath();
    x.fillStyle = i % 2 ? TORI.leaf : TORI.leafD; x.fill(); x.lineWidth = R * 0.045; x.strokeStyle = OL; x.stroke(); x.restore(); }
  pine(x, cx, cy, R); x.fillStyle = TORI.body; x.fill();
  x.save(); pine(x, cx, cy, R); x.clip();
  x.beginPath(); x.ellipse(cx - R * 0.25, cy - R * 0.25, R * 0.5, R * 0.65, 0, 0, 7); x.fillStyle = TORI.lit; x.globalAlpha = 0.6; x.fill(); x.globalAlpha = 1;
  x.beginPath(); x.arc(cx + R * 0.55, cy + R * 0.5, R * 0.8, 0, 7); x.globalAlpha = 0.45; x.fillStyle = TORI.shade; x.fill(); x.globalAlpha = 1;
  // diamond fruitlets, each with a swirl and a prickly tip
  const d = R * 0.32, off = (rot * 0.15 % 1) * d;
  x.lineWidth = R * 0.03; x.strokeStyle = 'rgba(27,21,48,0.55)';
  for (let k = -6; k <= 6; k++) { x.beginPath(); x.moveTo(cx - R + k * d + off, cy - R * 1.1); x.lineTo(cx + R + k * d + off, cy + R * 1.1); x.stroke(); x.beginPath(); x.moveTo(cx + R + k * d - off, cy - R * 1.1); x.lineTo(cx - R + k * d - off, cy + R * 1.1); x.stroke(); }
  for (let r = -3; r <= 3; r++) for (let k = -3; k <= 3; k++) { const px = cx + k * d * 0.95 + (r % 2 ? d * 0.47 : 0) + off * 0.5, py = cy + r * d * 0.9; curl(x, px, py, d * 0.22, R * 0.022); x.beginPath(); x.moveTo(px + d * 0.1, py - d * 0.25); x.lineTo(px + d * 0.18, py - d * 0.38); x.lineWidth = R * 0.025; x.strokeStyle = TORI.tip; x.stroke(); x.lineWidth = R * 0.03; x.strokeStyle = 'rgba(27,21,48,0.55)'; }
  x.restore();
  pine(x, cx, cy, R); x.lineWidth = R * 0.07; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(cx - R * 0.38, cy - R * 0.5, R * 0.12, R * 0.07, -0.8, 0, 7); x.fillStyle = 'rgba(255,255,255,0.85)'; x.fill();
  x.restore();
}
