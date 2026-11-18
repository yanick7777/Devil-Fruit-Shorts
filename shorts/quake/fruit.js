// Gura Gura no Mi (Tremor-Tremor Fruit). The main One Piece Wiki describes it as "a blue pear, albeit with a
// 'cracked' lower appearance"; like every Devil Fruit it carries swirl patterns. An official design exists
// (October 2025) that could not be viewed from here, so this drawing is unconfirmed.
// Plain object: no face, eyes, mouth, arms or legs.
import { OL } from '/engine/art.js';
export const GURA = { body: '#4f8fe0', lit: '#78adf0', shade: '#3a6fbf', swirl: '#2a4f99', crack: '#1c3266', crackLit: '#cfe6ff', stem: '#6b4630' };

function pear(x, cx, cy, R) { // pear outline: narrow top, wide round bottom
  x.beginPath();
  x.moveTo(cx, cy - R * 1.15);
  x.bezierCurveTo(cx + R * 0.42, cy - R * 1.15, cx + R * 0.45, cy - R * 0.55, cx + R * 0.62, cy - R * 0.2);
  x.bezierCurveTo(cx + R * 1.08, cy + R * 0.2, cx + R * 1.0, cy + R * 0.95, cx, cy + R * 0.98);
  x.bezierCurveTo(cx - R * 1.0, cy + R * 0.95, cx - R * 1.08, cy + R * 0.2, cx - R * 0.62, cy - R * 0.2);
  x.bezierCurveTo(cx - R * 0.45, cy - R * 0.55, cx - R * 0.42, cy - R * 1.15, cx, cy - R * 1.15);
  x.closePath();
}
function curl(x, cx, cy, r, dir, lw) { x.beginPath(); for (let a = 0; a <= Math.PI * 3; a += 0.15) { const rr = r * a / (Math.PI * 3); x.lineTo(cx + Math.cos(a * dir) * rr, cy + Math.sin(a * dir) * rr); } x.lineWidth = lw; x.strokeStyle = GURA.swirl; x.lineCap = 'round'; x.stroke(); }

export function drawGura(x, cx, cy, R, rot = 0, { shadow = true } = {}) {
  if (R <= 0) return;
  x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.0, R * 0.85, R * 0.15, 0, 0, 7); x.fill(); }
  pear(x, cx, cy, R); x.fillStyle = GURA.body; x.fill();
  x.save(); pear(x, cx, cy, R); x.clip();
  x.beginPath(); x.ellipse(cx - R * 0.25, cy - R * 0.2, R * 0.7, R * 0.95, 0, 0, 7); x.fillStyle = GURA.lit; x.fill();
  x.beginPath(); x.arc(cx + R * 0.6, cy + R * 0.6, R * 0.85, 0, 7); x.globalAlpha = 0.5; x.fillStyle = GURA.shade; x.fill(); x.globalAlpha = 1;
  // swirls on the upper part, drifting with rot
  const sw = [[-0.3, -0.75, 1], [0.25, -0.5, -1], [-0.45, -0.15, -1], [0.45, -0.05, 1], [0, -0.3, 1]];
  sw.forEach(([u, v, d], i) => { const k = Math.cos(rot + i); if (k < -0.2) return; curl(x, cx + (u + Math.sin(rot + i) * 0.15) * R, cy + v * R, R * 0.17, d, R * 0.045); });
  // the cracked lower part: jagged cracks spreading up from the bottom
  x.lineCap = 'round'; x.lineJoin = 'round';
  const cracks = [[[-0.55, 0.9], [-0.4, 0.55], [-0.5, 0.35], [-0.3, 0.15]], [[-0.1, 0.98], [0.0, 0.7], [-0.12, 0.5], [0.05, 0.3], [-0.02, 0.18]], [[0.35, 0.92], [0.3, 0.65], [0.48, 0.45], [0.4, 0.28]],
    [[0.75, 0.6], [0.55, 0.52]], [[-0.8, 0.55], [-0.62, 0.48]], [[0.0, 0.7], [0.18, 0.6]], [[-0.4, 0.55], [-0.22, 0.6]]];
  for (const c of cracks) { for (const [lw, col] of [[R * 0.06, GURA.crack], [R * 0.018, GURA.crackLit]]) { x.beginPath(); c.forEach(([u, v], i) => (i ? x.lineTo(cx + u * R, cy + v * R) : x.moveTo(cx + u * R, cy + v * R))); x.lineWidth = lw; x.strokeStyle = col; x.stroke(); } }
  x.restore();
  pear(x, cx, cy, R); x.lineWidth = R * 0.07; x.strokeStyle = OL; x.stroke();
  // stem
  x.beginPath(); x.moveTo(cx, cy - R * 1.12); x.quadraticCurveTo(cx + R * 0.05, cy - R * 1.4, cx + R * 0.2, cy - R * 1.45);
  x.lineCap = 'round'; x.lineWidth = R * 0.12; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.06; x.strokeStyle = GURA.stem; x.stroke();
  x.beginPath(); x.ellipse(cx + R * 0.2, cy - R * 1.35, R * 0.2, R * 0.09, -0.4, 0, 7); x.fillStyle = '#4aa83f'; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke();
  // highlight
  x.beginPath(); x.arc(cx - R * 0.05, cy - R * 0.1, R * 0.75, Math.PI * 1.15, Math.PI * 1.4); x.lineWidth = R * 0.07; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineCap = 'round'; x.stroke();
  x.beginPath(); x.arc(cx - R * 0.55, cy - R * 0.05, R * 0.045, 0, 7); x.fillStyle = '#fff'; x.fill();
  x.restore();
}
