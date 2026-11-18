// Ito Ito no Mi (String-String Fruit): described as a gourd-shaped, lilac-coloured fruit with a twirly stem
// (fan wiki via search); like every Devil Fruit it carries swirls. Plain object: no face or limbs.
import { OL } from '/engine/art.js';
export const ITO = { body: '#c3a3e8', lit: '#dcc6f5', shade: '#a07fd0', swirl: '#6c4aa8', stem: '#5c7a2e' };
function gourd(x, cx, cy, R) { // small top bulb, waist, big bottom bulb
  x.beginPath();
  x.moveTo(cx, cy - R * 1.2);
  x.bezierCurveTo(cx + R * 0.48, cy - R * 1.2, cx + R * 0.55, cy - R * 0.55, cx + R * 0.3, cy - R * 0.3);
  x.bezierCurveTo(cx + R * 1.05, cy - R * 0.05, cx + R * 1.0, cy + R * 0.95, cx, cy + R * 0.95);
  x.bezierCurveTo(cx - R * 1.0, cy + R * 0.95, cx - R * 1.05, cy - R * 0.05, cx - R * 0.3, cy - R * 0.3);
  x.bezierCurveTo(cx - R * 0.55, cy - R * 0.55, cx - R * 0.48, cy - R * 1.2, cx, cy - R * 1.2);
  x.closePath();
}
function curl(x, cx, cy, r, d, lw) { x.beginPath(); for (let a = 0; a <= Math.PI * 3; a += 0.15) { const rr = r * a / (Math.PI * 3); x.lineTo(cx + Math.cos(a * d) * rr, cy + Math.sin(a * d) * rr); } x.lineWidth = lw; x.strokeStyle = ITO.swirl; x.lineCap = 'round'; x.stroke(); }
export function drawIto(x, cx, cy, R, rot = 0, { shadow = true } = {}) {
  if (R <= 0) return;
  x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.0, R * 0.85, R * 0.15, 0, 0, 7); x.fill(); }
  gourd(x, cx, cy, R); x.fillStyle = ITO.body; x.fill();
  x.save(); gourd(x, cx, cy, R); x.clip();
  x.beginPath(); x.ellipse(cx - R * 0.3, cy - R * 0.1, R * 0.6, R * 0.9, 0, 0, 7); x.fillStyle = ITO.lit; x.fill();
  x.beginPath(); x.arc(cx + R * 0.6, cy + R * 0.55, R * 0.8, 0, 7); x.globalAlpha = 0.5; x.fillStyle = ITO.shade; x.fill(); x.globalAlpha = 1;
  [[-0.1, -0.8, 1], [-0.5, 0.15, -1], [0.45, 0.2, 1], [0, 0.6, -1], [-0.4, 0.6, 1], [0.15, -0.05, -1]].forEach(([u, v, d], i) => curl(x, cx + (u + Math.sin(rot + i) * 0.1) * R, cy + v * R, R * (v < -0.4 ? 0.13 : 0.18), d, R * 0.045));
  x.restore();
  gourd(x, cx, cy, R); x.lineWidth = R * 0.07; x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke();
  // twirly stem
  x.beginPath(); x.moveTo(cx, cy - R * 1.17); x.bezierCurveTo(cx - R * 0.05, cy - R * 1.45, cx + R * 0.35, cy - R * 1.55, cx + R * 0.3, cy - R * 1.35); x.bezierCurveTo(cx + R * 0.26, cy - R * 1.22, cx + R * 0.1, cy - R * 1.3, cx + R * 0.15, cy - R * 1.4);
  x.lineCap = 'round'; x.lineWidth = R * 0.12; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.06; x.strokeStyle = ITO.stem; x.stroke();
  x.beginPath(); x.arc(cx - R * 0.15, cy - R * 0.05, R * 0.62, Math.PI * 1.1, Math.PI * 1.4); x.lineWidth = R * 0.07; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke();
  x.beginPath(); x.arc(cx - R * 0.6, cy + R * 0.05, R * 0.045, 0, 7); x.fillStyle = '#fff'; x.fill();
  x.restore();
}
