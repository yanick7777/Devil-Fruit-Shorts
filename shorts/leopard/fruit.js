// Neko Neko no Mi, Model: Leopard. One Piece Wiki Appearance (via search): resembles the head of a leopard, including spots and ears,
// with a green T-shaped stem that curls up at one end. Drawn as a fruit shape only: ears and spots, no face.
import { OL } from '/engine/art.js';
export const NEKO = { body: '#f2b84a', lit: '#ffe090', shade: '#d8902a', spot: '#5a3a1a', swirl: '#a8641a', stem: '#4f9a3a' };
function head(x, cx, cy, R) { x.beginPath(); x.moveTo(cx - R * 0.95, cy); x.bezierCurveTo(cx - R * 0.95, cy - R * 0.7, cx - R * 0.5, cy - R * 0.9, cx, cy - R * 0.9);
  x.bezierCurveTo(cx + R * 0.5, cy - R * 0.9, cx + R * 0.95, cy - R * 0.7, cx + R * 0.95, cy); x.bezierCurveTo(cx + R * 0.95, cy + R * 0.75, cx + R * 0.5, cy + R * 0.92, cx, cy + R * 0.92); x.bezierCurveTo(cx - R * 0.5, cy + R * 0.92, cx - R * 0.95, cy + R * 0.75, cx - R * 0.95, cy); x.closePath(); }
export function drawNeko(x, cx, cy, R, rot = 0, { shadow = true } = {}) {
  if (R <= 0) return; x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.0, R * 0.8, R * 0.13, 0, 0, 7); x.fill(); }
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(cx + sd * R * 0.75, cy - R * 0.45); x.quadraticCurveTo(cx + sd * R * 0.85, cy - R * 1.15, cx + sd * R * 0.35, cy - R * 0.85); x.closePath(); x.fillStyle = NEKO.body; x.fill(); x.lineWidth = R * 0.06; x.strokeStyle = OL; x.stroke();
    x.beginPath(); x.moveTo(cx + sd * R * 0.7, cy - R * 0.55); x.quadraticCurveTo(cx + sd * R * 0.76, cy - R * 0.95, cx + sd * R * 0.45, cy - R * 0.8); x.closePath(); x.fillStyle = NEKO.spot; x.fill(); }
  head(x, cx, cy, R); x.fillStyle = NEKO.body; x.fill();
  x.save(); head(x, cx, cy, R); x.clip(); x.beginPath(); x.ellipse(cx - R * 0.25, cy - R * 0.3, R * 0.6, R * 0.5, 0, 0, 7); x.fillStyle = NEKO.lit; x.globalAlpha = 0.6; x.fill(); x.globalAlpha = 1;
  x.beginPath(); x.arc(cx + R * 0.6, cy + R * 0.55, R * 0.8, 0, 7); x.globalAlpha = 0.4; x.fillStyle = NEKO.shade; x.fill(); x.globalAlpha = 1;
  for (let i = 0; i < 16; i++) { const a = i * 2.4 + rot * 0.2, d = R * (0.2 + (i % 4) * 0.2), sx = cx + Math.cos(a) * d, sy = cy + Math.sin(a) * d * 0.9; x.beginPath(); x.ellipse(sx, sy, R * 0.09, R * 0.07, a, 0, 6); x.lineWidth = R * 0.035; x.strokeStyle = NEKO.spot; x.stroke(); x.beginPath(); x.arc(sx, sy, R * 0.03, 0, 7); x.fillStyle = NEKO.swirl; x.fill(); }
  x.restore(); head(x, cx, cy, R); x.lineWidth = R * 0.06; x.strokeStyle = OL; x.stroke();
  // T-shaped green stem with one curled end
  x.lineCap = 'round'; x.beginPath(); x.moveTo(cx, cy - R * 0.88); x.lineTo(cx, cy - R * 1.12); x.moveTo(cx - R * 0.25, cy - R * 1.12); x.lineTo(cx + R * 0.2, cy - R * 1.12); x.arc(cx + R * 0.2, cy - R * 1.2, R * 0.08, Math.PI / 2, -Math.PI * 0.9, true);
  x.lineWidth = R * 0.12; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.06; x.strokeStyle = NEKO.stem; x.stroke();
  x.restore();
}
