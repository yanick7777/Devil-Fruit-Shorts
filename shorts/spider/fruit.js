// Kumo Kumo no Mi design from the user's reference: a purple fruit, wide at the top and narrowing to a rounded bottom, covered in
// dense dark swirls, two dark-red spirals near the bottom, and green leaves fanning out all around it. No face or limbs.
import { OL } from '/engine/art.js';
export const KUMO = { body: '#8a52d8', lit: '#c49af5', shade: '#5a2ea8', swirl: '#3a1a78', spiral: '#7a1428', leaf: '#4fc82a', leafD: '#2f8a18' };
function shape(x, cx, cy, R) { x.beginPath(); x.moveTo(cx, cy - R * 0.95); x.bezierCurveTo(cx + R * 0.95, cy - R * 0.95, cx + R * 0.95, cy - R * 0.1, cx + R * 0.55, cy + R * 0.55);
  x.bezierCurveTo(cx + R * 0.35, cy + R * 0.95, cx - R * 0.35, cy + R * 0.95, cx - R * 0.55, cy + R * 0.55); x.bezierCurveTo(cx - R * 0.95, cy - R * 0.1, cx - R * 0.95, cy - R * 0.95, cx, cy - R * 0.95); x.closePath(); }
function curl(x, cx, cy, r, lw, col, d = 1) { x.beginPath(); for (let a = 0; a <= Math.PI * 3.2; a += 0.2) { const rr = r * a / (Math.PI * 3.2); x.lineTo(cx + Math.cos(a * d) * rr, cy + Math.sin(a * d) * rr); } x.lineWidth = lw; x.strokeStyle = col; x.lineCap = 'round'; x.stroke(); }
function leaf(x, cx, cy, R, ang, len) { x.save(); x.translate(cx, cy); x.rotate(ang); x.beginPath(); x.moveTo(0, -R * 0.12); x.quadraticCurveTo(len * 0.6, -R * 0.28, len, 0); x.quadraticCurveTo(len * 0.6, R * 0.2, 0, R * 0.12); x.closePath();
  const g = x.createLinearGradient(0, 0, len, 0); g.addColorStop(0, KUMO.leafD); g.addColorStop(1, KUMO.leaf); x.fillStyle = g; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke(); x.restore(); }
export function drawKumo(x, cx, cy, R, rot = 0, { shadow = true } = {}) {
  if (R <= 0) return; x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.0, R * 0.7, R * 0.13, 0, 0, 7); x.fill(); }
  const sw = Math.sin(rot) * 0.04;
  for (const [a, l] of [[-1.75, 0.55], [-1.4, 0.55], [-0.35, 0.75], [0.25, 0.75], [Math.PI + 0.35, 0.75], [Math.PI - 0.25, 0.75], [1.25, 0.6], [1.9, 0.6]]) leaf(x, cx + Math.cos(a) * R * 0.45, cy + Math.sin(a) * R * 0.45, R, a + sw, R * (0.55 + l));
  shape(x, cx, cy, R); x.fillStyle = KUMO.body; x.fill();
  x.save(); shape(x, cx, cy, R); x.clip();
  const g = x.createRadialGradient(cx - R * 0.15, cy - R * 0.3, R * 0.1, cx, cy, R); g.addColorStop(0, KUMO.lit); g.addColorStop(1, KUMO.shade); x.fillStyle = g; x.fillRect(cx - R, cy - R, R * 2, R * 2);
  let i = 0; for (let yy = -0.85; yy < 0.9; yy += 0.2) for (let xx = -0.85; xx < 0.9; xx += 0.2) { i++; curl(x, cx + (xx + (Math.round(yy * 5) % 2 ? 0.1 : 0)) * R, cy + yy * R, R * 0.085, R * 0.022, KUMO.swirl, i % 2 ? 1 : -1); }
  for (const sd of [-1, 1]) curl(x, cx + sd * R * 0.17, cy + R * 0.58, R * 0.13, R * 0.03, KUMO.spiral, sd);
  x.restore();
  shape(x, cx, cy, R); x.lineWidth = R * 0.06; x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke();
  x.restore();
}
