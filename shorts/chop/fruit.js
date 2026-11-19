// Bara Bara no Mi (Chop-Chop Fruit). One Piece Wiki Appearance (via search): "an oval-shaped purple fruit (orange in the anime) made up of
// little spherical pieces with swirls, and a green leafage sprouting on top". Drawn purple (the manga colour, and the script says purple).
import { OL } from '/engine/art.js';
export const BARA = { body: '#9a5ad8', lit: '#c49af5', shade: '#6a34a8', swirl: '#3f1a78', leaf: '#5cc45a', leafD: '#3f8a2a' };
function curl(x, cx, cy, r, lw) { x.beginPath(); for (let a = 0; a <= Math.PI * 3; a += 0.25) { const rr = r * a / (Math.PI * 3); x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.lineWidth = lw; x.strokeStyle = BARA.swirl; x.lineCap = 'round'; x.stroke(); }
export function drawBara(x, cx, cy, R, rot = 0, { shadow = true, split = 0 } = {}) {
  if (R <= 0) return; x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.0, R * 0.7, R * 0.13, 0, 0, 7); x.fill(); }
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i - 2) * 0.45 + Math.sin(rot + i) * 0.04; x.save(); x.translate(cx, cy - R * 0.85); x.rotate(a + Math.PI / 2); x.beginPath(); x.ellipse(0, -R * 0.25, R * 0.1, R * 0.28, 0, 0, 7); x.fillStyle = i % 2 ? BARA.leaf : BARA.leafD; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke(); x.restore(); }
  const balls = []; for (let r = -3; r <= 3; r++) { const n = 4 - Math.abs(r) * 0.5 | 0; for (let k = 0; k <= n; k++) balls.push([(k - n / 2) * 0.36 + (r % 2 ? 0.05 : 0), r * 0.27]); }
  balls.sort((a, b) => a[1] - b[1]);
  for (const [u, v] of balls) { const sx = cx + u * R * (1 + split * 0.6) + Math.sin(rot * 3 + u * 9) * split * R * 0.1, sy = cy + v * R * (1 + split * 0.5); const r = R * 0.22;
    x.beginPath(); x.arc(sx, sy, r, 0, 7); const g = x.createRadialGradient(sx - r * 0.35, sy - r * 0.35, r * 0.1, sx, sy, r); g.addColorStop(0, BARA.lit); g.addColorStop(1, BARA.body); x.fillStyle = g; x.fill(); x.lineWidth = R * 0.035; x.strokeStyle = OL; x.stroke(); curl(x, sx, sy, r * 0.55, R * 0.025); }
  x.restore();
}
