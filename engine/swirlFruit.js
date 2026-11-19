// Plain swirl fruit for Devil Fruits whose look has never been revealed: a round fruit covered in the curly swirls every
// Devil Fruit has, a short stem and one leaf. Colour palette is picked per short (it is a stand-in, not a canon design).
import { OL } from './art.js';
export const PALETTES = {
  slate: { body: '#8f86c9', lit: '#b9b2e6', shade: '#6a61a8', swirl: '#3f3680', stem: '#5c7a2e' },
  orange: { body: '#ffae4d', lit: '#ffd08a', shade: '#e8862e', swirl: '#a8541a', stem: '#4f8a2e' },
  teal: { body: '#5cc8b8', lit: '#9ee6dc', shade: '#3a9e90', swirl: '#1f5f58', stem: '#5c7a2e' },
  brown: { body: '#c99a5c', lit: '#e6c38f', shade: '#a2763e', swirl: '#5a3a1c', stem: '#4f8a2e' },
  green: { body: '#8ccf5a', lit: '#bfe892', shade: '#64a83c', swirl: '#2f5a1c', stem: '#3f6a22' },
  blue: { body: '#6fa8ff', lit: '#a8ccff', shade: '#4a82e0', swirl: '#1f3f8a', stem: '#4f8a2e' },
  pink: { body: '#ff9ccf', lit: '#ffc8e6', shade: '#e070ac', swirl: '#8a2a5c', stem: '#4f8a2e' },
  gold: { body: '#ffd64d', lit: '#ffe999', shade: '#e8b52e', swirl: '#8a5a0a', stem: '#4f8a2e' },
  grey: { body: '#b8b8c8', lit: '#dcdce6', shade: '#8e8ea2', swirl: '#45455a', stem: '#5c7a2e' },
  red: { body: '#ff6f5a', lit: '#ffa696', shade: '#d84a38', swirl: '#7a1a10', stem: '#4f8a2e' },
};
function curl(x, cx, cy, r, d, lw, col) { x.beginPath(); for (let a = 0; a <= Math.PI * 3; a += 0.15) { const rr = r * a / (Math.PI * 3); x.lineTo(cx + Math.cos(a * d) * rr, cy + Math.sin(a * d) * rr); } x.lineWidth = lw; x.strokeStyle = col; x.lineCap = 'round'; x.stroke(); }
export function drawSwirlFruit(x, cx, cy, R, rot = 0, { shadow = true, pal = 'slate' } = {}) {
  if (R <= 0) return; const P = typeof pal === 'string' ? PALETTES[pal] : pal;
  const shape = () => { x.beginPath(); x.moveTo(cx, cy - R * 0.82); x.bezierCurveTo(cx + R * 0.35, cy - R * 1.05, cx + R * 1.05, cy - R * 0.85, cx + R * 1.0, cy + R * 0.05);
    x.bezierCurveTo(cx + R * 0.95, cy + R * 0.85, cx + R * 0.35, cy + R * 1.0, cx, cy + R * 0.95); x.bezierCurveTo(cx - R * 0.35, cy + R * 1.0, cx - R * 0.95, cy + R * 0.85, cx - R * 1.0, cy + R * 0.05);
    x.bezierCurveTo(cx - R * 1.05, cy - R * 0.85, cx - R * 0.35, cy - R * 1.05, cx, cy - R * 0.82); x.closePath(); };
  x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.0, R * 0.85, R * 0.15, 0, 0, 7); x.fill(); }
  shape(); x.fillStyle = P.body; x.fill();
  x.save(); shape(); x.clip();
  x.beginPath(); x.ellipse(cx - R * 0.3, cy - R * 0.25, R * 0.65, R * 0.6, 0, 0, 7); x.fillStyle = P.lit; x.fill();
  x.beginPath(); x.arc(cx + R * 0.6, cy + R * 0.55, R * 0.8, 0, 7); x.globalAlpha = 0.5; x.fillStyle = P.shade; x.fill(); x.globalAlpha = 1;
  [[-0.45, -0.35, 1], [0.25, -0.5, -1], [0.6, 0.1, 1], [-0.1, 0.15, -1], [-0.6, 0.45, 1], [0.3, 0.6, -1]].forEach(([u, v, d], i) => curl(x, cx + (u + Math.sin(rot + i) * 0.08) * R, cy + v * R, R * 0.2, d, R * 0.05, P.swirl));
  x.restore();
  shape(); x.lineWidth = R * 0.07; x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke();
  x.beginPath(); x.moveTo(cx, cy - R * 0.8); x.quadraticCurveTo(cx - R * 0.05, cy - R * 1.1, cx + R * 0.1, cy - R * 1.25); x.lineCap = 'round'; x.lineWidth = R * 0.13; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.065; x.strokeStyle = P.stem; x.stroke();
  x.beginPath(); x.ellipse(cx + R * 0.32, cy - R * 1.08, R * 0.24, R * 0.1, -0.5, 0, 7); x.fillStyle = P.stem; x.fill(); x.lineWidth = R * 0.045; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(cx - R * 0.45, cy - R * 0.45, R * 0.16, R * 0.08, -0.7, 0, 7); x.fillStyle = 'rgba(255,255,255,0.85)'; x.fill();
  x.restore();
}
