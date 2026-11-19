// Hobi Hobi no Mi (Hobby-Hobby Fruit). One Piece Wiki Appearance (via search): "a wheel-shaped fruit with a light yellow,
// spiraling core at both of its sides and a red, swirly outer shell that envelops its meridian"; a green stem (secondary source).
// Like a yo-yo. Plain object: no face or limbs. `turn` 0 = face-on (yellow spiral core visible), 1 = edge-on (red shell band).
import { OL } from '/engine/art.js';
export const HOBI = { shell: '#e8402e', shellL: '#ff7a5c', shellD: '#b52a1f', swirl: '#8a1a14', core: '#fff1a6', coreD: '#f2cf55', coreLine: '#c99a1e', stem: '#4f9a3a' };
function spiral(x, cx, cy, r, turns, lw, col, rot) { x.beginPath(); const N = 80; for (let i = 0; i <= N; i++) { const a = i / N * turns * Math.PI * 2 + rot, rr = r * i / N; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.lineWidth = lw; x.strokeStyle = col; x.lineCap = 'round'; x.stroke(); }
export function drawHobi(x, cx, cy, R, rot = 0, { shadow = true, turn = 0.25 } = {}) {
  if (R <= 0) return;
  const sx = 1 - turn * 0.72, band = R * 0.42 * turn; // face width, visible shell depth
  x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.02, R * 0.85, R * 0.14, 0, 0, 7); x.fill(); }
  // back face hint + the red shell band around the meridian
  x.beginPath(); x.ellipse(cx + band, cy, R * sx, R, 0, 0, 7); x.rect(cx, cy - R, band, R * 2); x.fillStyle = HOBI.shellD; x.fill();
  x.beginPath(); x.ellipse(cx + band, cy, R * sx, R, 0, -Math.PI / 2, Math.PI / 2); x.lineTo(cx, cy + R); x.ellipse(cx, cy, R * sx, R, 0, Math.PI / 2, -Math.PI / 2, true); x.closePath(); x.fillStyle = HOBI.shell; x.fill();
  x.save(); x.clip(); x.strokeStyle = HOBI.swirl; x.lineWidth = R * 0.05; for (let i = 0; i < 6; i++) { const yy = cy - R * 0.8 + i * R * 0.32; x.beginPath(); x.arc(cx + band * 0.5 + R * sx, yy, R * 0.12, 0.5 + rot, 4.8 + rot); x.stroke(); } x.restore();
  x.beginPath(); x.ellipse(cx + band, cy, R * sx, R, 0, -Math.PI / 2, Math.PI / 2); x.lineTo(cx, cy + R); x.ellipse(cx, cy, R * sx, R, 0, Math.PI / 2, -Math.PI / 2, true); x.closePath(); x.lineWidth = R * 0.07; x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke();
  // front face: red swirly rim, light yellow spiraling core
  x.beginPath(); x.ellipse(cx, cy, R * sx, R, 0, 0, 7); x.fillStyle = HOBI.shell; x.fill();
  x.save(); x.beginPath(); x.ellipse(cx, cy, R * sx, R, 0, 0, 7); x.clip();
  x.beginPath(); x.ellipse(cx - R * 0.2 * sx, cy - R * 0.25, R * 0.7 * sx, R * 0.6, 0, 0, 7); x.fillStyle = HOBI.shellL; x.globalAlpha = 0.6; x.fill(); x.globalAlpha = 1;
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + rot * 0.5, px = cx + Math.cos(a) * R * 0.8 * sx, py = cy + Math.sin(a) * R * 0.8; x.save(); x.translate(px, py); x.scale(sx, 1); spiral(x, 0, 0, R * 0.13, 1.4, R * 0.04, HOBI.swirl, a); x.restore(); }
  x.beginPath(); x.ellipse(cx, cy, R * 0.56 * sx, R * 0.56, 0, 0, 7); x.fillStyle = HOBI.core; x.fill(); x.lineWidth = R * 0.05; x.strokeStyle = OL; x.stroke();
  x.save(); x.translate(cx, cy); x.scale(sx, 1); spiral(x, 0, 0, R * 0.5, 2.6, R * 0.06, HOBI.coreLine, rot); x.restore();
  x.restore();
  x.beginPath(); x.ellipse(cx, cy, R * sx, R, 0, 0, 7); x.lineWidth = R * 0.07; x.strokeStyle = OL; x.stroke();
  // green stem on top of the shell
  const tx = cx + band * 0.5; x.beginPath(); x.moveTo(tx, cy - R * 0.96); x.quadraticCurveTo(tx + R * 0.05, cy - R * 1.3, tx + R * 0.32, cy - R * 1.32);
  x.lineCap = 'round'; x.lineWidth = R * 0.14; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.07; x.strokeStyle = HOBI.stem; x.stroke();
  x.beginPath(); x.ellipse(tx + R * 0.3, cy - R * 1.2, R * 0.2, R * 0.09, -0.4, 0, 7); x.fillStyle = HOBI.stem; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(cx - R * 0.35 * sx, cy - R * 0.5, R * 0.18 * sx, R * 0.08, -0.6, 0, 7); x.fillStyle = 'rgba(255,255,255,0.85)'; x.fill();
  x.restore();
}
