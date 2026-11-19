// Batch 3 fruit designs, drawn from the oparchive screenshots the user sent (refs/batch3/DESIGNS.md). Plain objects: no face or limbs.
import { OL } from './art.js';

// ---- helpers ----
export function curl(x, cx, cy, r, lw, col, d = 1) { x.beginPath(); for (let a = 0; a <= Math.PI * 3; a += 0.2) { const rr = r * a / (Math.PI * 3); x.lineTo(cx + Math.cos(a * d) * rr, cy + Math.sin(a * d) * rr); } x.lineWidth = lw; x.strokeStyle = col; x.lineCap = 'round'; x.stroke(); }
// fill a clip path with a shaded body and a grid of swirls
export function swirlFill(x, R, cx, cy, body, lit, shade, swirl, step = 0.26, sr = 0.1) {
  const g = x.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R * 1.2); g.addColorStop(0, lit); g.addColorStop(0.55, body); g.addColorStop(1, shade); x.fillStyle = g; x.fillRect(cx - R * 2, cy - R * 2, R * 4, R * 4);
  let i = 0; for (let v = -1.3; v < 1.3; v += step) for (let u = -1.3; u < 1.3; u += step) { i++; curl(x, cx + (u + (Math.round(v / step) % 2 ? step / 2 : 0)) * R, cy + v * R, R * sr, R * 0.022, swirl, i % 2 ? 1 : -1); }
}
function outline(x, R, path) { path(); x.lineWidth = R * 0.06; x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke(); }
function shadowAt(x, cx, cy, R) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.0, R * 0.8, R * 0.13, 0, 0, 7); x.fill(); }
function shine(x, cx, cy, R) { x.beginPath(); x.ellipse(cx - R * 0.4, cy - R * 0.45, R * 0.15, R * 0.07, -0.7, 0, 7); x.fillStyle = 'rgba(255,255,255,0.8)'; x.fill(); }
function stem(x, cx, cy, R, col = '#4f9a3a', curlDir = 1) { x.beginPath(); x.moveTo(cx, cy); x.quadraticCurveTo(cx - R * 0.05 * curlDir, cy - R * 0.3, cx + R * 0.25 * curlDir, cy - R * 0.38); x.arc(cx + R * 0.25 * curlDir, cy - R * 0.28, R * 0.1, -Math.PI / 2, Math.PI * 0.6, curlDir < 0);
  x.lineCap = 'round'; x.lineWidth = R * 0.12; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.06; x.strokeStyle = col; x.stroke(); }
function wrap(draw) { return (x, cx, cy, R, rot = 0, o = {}) => { if (R <= 0) return; x.save(); if (o.shadow !== false) shadowAt(x, cx, cy, R); draw(x, cx, cy, R, rot, o); x.restore(); }; }

// ---- Awa Awa: flat round lavender fruit covered in swirls, thin yellow stem ----
export const drawAwa = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); x.ellipse(cx, cy + R * 0.1, R * 1.0, R * 0.72, 0, 0, 7); };
  stem(x, cx - R * 0.2, cy - R * 0.55, R, '#e8c84a', -1);
  p(); x.save(); x.clip(); swirlFill(x, R, cx, cy, '#9a8ad8', '#c8bcf0', '#6a5ab0', '#4a3a8a', 0.24, 0.1); x.restore(); outline(x, R, p); shine(x, cx, cy, R);
});
// ---- Baku Baku: round purple fruit with a jagged zigzag split across the middle, green stem ----
export const drawBaku = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); x.arc(cx, cy, R * 0.92, 0, 7); };
  stem(x, cx, cy - R * 0.88, R, '#5cc45a', 1);
  p(); x.save(); x.clip(); swirlFill(x, R, cx, cy, '#7a3aa8', '#b07ad8', '#4a1a78', '#2a0a50', 0.26, 0.1);
  x.beginPath(); x.moveTo(cx, cy - R); for (let i = 1; i <= 8; i++) x.lineTo(cx + (i % 2 ? 1 : -1) * R * 0.16, cy - R + i * R * 0.25); x.lineWidth = R * 0.07; x.strokeStyle = '#ffffff'; x.stroke(); x.lineWidth = R * 0.03; x.strokeStyle = OL; x.stroke(); x.restore();
  outline(x, R, p); shine(x, cx, cy, R);
});
// ---- Bomu Bomu: dark navy round fruit with orange swirls, a rope fuse for a stem ----
export const drawBomu = wrap((x, cx, cy, R, rot) => {
  const p = () => { x.beginPath(); x.arc(cx, cy, R * 0.92, 0, 7); };
  p(); x.save(); x.clip(); swirlFill(x, R, cx, cy, '#2a2a5a', '#4a4a8a', '#14143a', '#e8822e', 0.28, 0.11); x.restore(); outline(x, R, p);
  x.beginPath(); x.moveTo(cx, cy - R * 0.85); x.bezierCurveTo(cx + R * 0.1, cy - R * 1.15, cx - R * 0.2, cy - R * 1.25, cx + R * 0.05, cy - R * 1.45); x.lineCap = 'round'; x.lineWidth = R * 0.12; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.07; x.strokeStyle = '#c99556'; x.stroke();
  x.setLineDash([R * 0.04, R * 0.05]); x.lineWidth = R * 0.07; x.strokeStyle = '#8a5a2a'; x.stroke(); x.setLineDash([]);
  shine(x, cx, cy, R);
});
// ---- Doru Doru: white fruit with pale swirls, top dripping like melted wax, green stem ----
export const drawDoru = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); x.moveTo(cx - R * 0.35, cy - R * 0.85); x.bezierCurveTo(cx - R * 1.0, cy - R * 0.3, cx - R * 1.0, cy + R * 0.9, cx, cy + R * 0.95); x.bezierCurveTo(cx + R * 1.0, cy + R * 0.9, cx + R * 1.0, cy - R * 0.3, cx + R * 0.35, cy - R * 0.85); x.closePath(); };
  p(); x.save(); x.clip(); swirlFill(x, R, cx, cy, '#f4f0e6', '#ffffff', '#d8d0c0', '#c8b890', 0.24, 0.1); x.restore(); outline(x, R, p);
  x.beginPath(); x.moveTo(cx - R * 0.55, cy - R * 0.75); x.quadraticCurveTo(cx, cy - R * 1.05, cx + R * 0.55, cy - R * 0.75);
  for (const [dx, l] of [[0.5, 0.3], [0.3, 0.5], [0.1, 0.25], [-0.1, 0.45], [-0.3, 0.2], [-0.5, 0.35]]) { x.lineTo(cx + dx * R + R * 0.05, cy - R * 0.7); x.quadraticCurveTo(cx + dx * R + R * 0.06, cy - R * 0.7 + l * R, cx + dx * R, cy - R * 0.7 + l * R); x.quadraticCurveTo(cx + dx * R - R * 0.06, cy - R * 0.7 + l * R, cx + dx * R - R * 0.05, cy - R * 0.7); }
  x.closePath(); x.fillStyle = '#fffaf0'; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke();
  stem(x, cx, cy - R * 0.95, R, '#4f9a3a', 1); shine(x, cx, cy + R * 0.2, R);
});
// ---- Fude Fude: round fruit with swirls under a black ink-brush tip top ----
export const drawFude = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); x.arc(cx, cy + R * 0.1, R * 0.85, 0, 7); };
  p(); x.save(); x.clip(); swirlFill(x, R, cx, cy, '#e8e4dc', '#ffffff', '#b8b0a8', '#3a3346', 0.26, 0.11); x.restore(); outline(x, R, p);
  x.beginPath(); x.moveTo(cx - R * 0.75, cy - R * 0.35); x.quadraticCurveTo(cx - R * 0.6, cy - R * 0.9, cx - R * 0.1, cy - R * 1.05); x.quadraticCurveTo(cx + R * 0.15, cy - R * 1.5, cx + R * 0.35, cy - R * 1.6); x.quadraticCurveTo(cx + R * 0.35, cy - R * 1.1, cx + R * 0.75, cy - R * 0.4);
  for (let i = 0; i <= 6; i++) x.lineTo(cx + R * (0.75 - i * 0.25), cy - R * (0.35 + (i % 2 ? 0.12 : 0)));
  x.closePath(); x.fillStyle = '#14121a'; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke();
  x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = R * 0.02; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(cx - R * 0.4 + i * R * 0.25, cy - R * 0.45); x.quadraticCurveTo(cx - R * 0.2 + i * R * 0.15, cy - R * 0.9, cx + R * 0.3, cy - R * 1.5); x.stroke(); }
});
export const FRUITS3 = { bubble: drawAwa, munch: drawBaku, bomb: drawBomu, wax: drawDoru, brush: drawFude };
