// Ope Ope no Mi (Op-Op Fruit): described on the fan wikis as a red, heart-shaped fruit that resembles a strawberry,
// with a swirl-patterned surface and a stem with a swirling end pointing upwards. Plain object: no face or limbs.
import { OL } from '/engine/art.js';
export const OPE = { body: '#e0303e', lit: '#f25a64', shade: '#b51e2c', swirl: '#8e1422', seed: '#ffd86b', stem: '#3f8f3a' };

function heartPath(x, cx, cy, R) {
  x.beginPath();
  x.moveTo(cx, cy + R * 1.05);
  x.bezierCurveTo(cx - R * 0.55, cy + R * 0.6, cx - R * 1.15, cy + R * 0.05, cx - R * 1.0, cy - R * 0.45);
  x.bezierCurveTo(cx - R * 0.88, cy - R * 0.95, cx - R * 0.2, cy - R * 1.0, cx, cy - R * 0.55);
  x.bezierCurveTo(cx + R * 0.2, cy - R * 1.0, cx + R * 0.88, cy - R * 0.95, cx + R * 1.0, cy - R * 0.45);
  x.bezierCurveTo(cx + R * 1.15, cy + R * 0.05, cx + R * 0.55, cy + R * 0.6, cx, cy + R * 1.05);
  x.closePath();
}
function curl(x, cx, cy, r, dir, lw, col) { x.beginPath(); for (let a = 0; a <= Math.PI * 3; a += 0.15) { const rr = r * a / (Math.PI * 3); x.lineTo(cx + Math.cos(a * dir) * rr, cy + Math.sin(a * dir) * rr); } x.lineWidth = lw; x.strokeStyle = col; x.lineCap = 'round'; x.stroke(); }

export function drawOpe(x, cx, cy, R, rot = 0, { shadow = true } = {}) {
  if (R <= 0) return;
  x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.08, R * 0.8, R * 0.15, 0, 0, 7); x.fill(); }
  heartPath(x, cx, cy, R); x.fillStyle = OPE.body; x.fill();
  x.save(); heartPath(x, cx, cy, R); x.clip();
  x.beginPath(); x.ellipse(cx - R * 0.35, cy - R * 0.3, R * 0.6, R * 0.55, 0, 0, 7); x.fillStyle = OPE.lit; x.fill();
  x.beginPath(); x.arc(cx + R * 0.6, cy + R * 0.6, R * 0.8, 0, 7); x.globalAlpha = 0.5; x.fillStyle = OPE.shade; x.fill(); x.globalAlpha = 1;
  // swirls across the surface
  [[-0.5, -0.35, 1], [0.45, -0.4, -1], [0, 0.15, 1], [-0.35, 0.45, -1], [0.38, 0.35, 1]].forEach(([u, v, d], i) => curl(x, cx + (u + Math.sin(rot + i) * 0.08) * R, cy + v * R, R * 0.17, d, R * 0.045, OPE.swirl));
  // strawberry-like seeds
  for (let i = 0; i < 26; i++) { const u = Math.sin(i * 2.4 + rot) * 0.85, v = -0.6 + (i % 7) * 0.24; x.save(); x.translate(cx + u * R * (1 - Math.max(0, v) * 0.6), cy + v * R); x.rotate(0.3); x.beginPath(); x.ellipse(0, 0, R * 0.03, R * 0.05, 0, 0, 7); x.fillStyle = OPE.seed; x.fill(); x.restore(); }
  x.restore();
  heartPath(x, cx, cy, R); x.lineWidth = R * 0.07; x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke();
  // stem with a swirling end pointing upwards
  x.beginPath(); x.moveTo(cx, cy - R * 0.55); x.quadraticCurveTo(cx - R * 0.05, cy - R * 0.9, cx + R * 0.05, cy - R * 1.15);
  x.lineCap = 'round'; x.lineWidth = R * 0.12; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.06; x.strokeStyle = OPE.stem; x.stroke();
  curl(x, cx + R * 0.12, cy - R * 1.22, R * 0.12, 1, R * 0.11, OL); curl(x, cx + R * 0.12, cy - R * 1.22, R * 0.12, 1, R * 0.055, OPE.stem);
  for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(cx + sd * R * 0.22, cy - R * 0.62, R * 0.24, R * 0.09, sd * 0.4, 0, 7); x.fillStyle = OPE.stem; x.fill(); x.lineWidth = R * 0.035; x.strokeStyle = OL; x.stroke(); }
  // highlight
  x.beginPath(); x.arc(cx - R * 0.5, cy - R * 0.45, R * 0.35, Math.PI * 1.05, Math.PI * 1.55); x.lineWidth = R * 0.07; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineCap = 'round'; x.stroke();
  x.beginPath(); x.arc(cx - R * 0.72, cy - R * 0.2, R * 0.045, 0, 7); x.fillStyle = '#fff'; x.fill();
  x.restore();
}
