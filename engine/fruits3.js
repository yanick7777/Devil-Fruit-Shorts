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
function leaf(x, cx, cy, R, ang, len, col = '#4f9a3a') { x.save(); x.translate(cx, cy); x.rotate(ang); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(len * 0.5, -len * 0.35, len, 0); x.quadraticCurveTo(len * 0.5, len * 0.35, 0, 0); x.fillStyle = col; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke(); x.beginPath(); x.moveTo(0, 0); x.lineTo(len * 0.85, 0); x.lineWidth = R * 0.02; x.stroke(); x.restore(); }
const body = (x, R, p, cx, cy, c) => { p(); x.save(); x.clip(); swirlFill(x, R, cx, cy, ...c); x.restore(); outline(x, R, p); };

// ---- Goro Goro: spiky yellow fruit with swirls, lightning-bolt green stem ----
export const drawGoro = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); for (let i = 0; i < 28; i++) { const a = i / 28 * 6.283 - 1.57, r = R * (i % 2 ? 0.78 : 0.98); x.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } x.closePath(); };
  body(x, R, p, cx, cy, ['#f4d030', '#fff08a', '#c89a10', '#a07000', 0.26, 0.1]);
  x.beginPath(); x.moveTo(cx, cy - R * 0.9); x.lineTo(cx + R * 0.18, cy - R * 1.15); x.lineTo(cx - R * 0.05, cy - R * 1.2); x.lineTo(cx + R * 0.15, cy - R * 1.5); x.lineTo(cx - R * 0.15, cy - R * 1.15); x.lineTo(cx + R * 0.05, cy - R * 1.1); x.closePath(); x.fillStyle = '#5cc45a'; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke(); shine(x, cx, cy, R);
});
// ---- Hana Hana: pink dahlia-shaped fruit, petals with swirls, yellow centre ----
export const drawHana = wrap((x, cx, cy, R) => {
  for (const [n, r, col] of [[12, 0.95, '#e85a9a'], [10, 0.68, '#f68ab8']]) for (let i = 0; i < n; i++) { const a = i / n * 6.283 + (r < 0.9 ? 0.3 : 0); const p = () => { x.beginPath(); x.ellipse(cx + Math.cos(a) * R * r * 0.55, cy + Math.sin(a) * R * r * 0.55, R * r * 0.42, R * r * 0.2, a, 0, 7); }; p(); x.save(); x.clip(); swirlFill(x, R, cx, cy, col, '#ffc8e0', '#c03a7a', '#a02a60', 0.2, 0.06); x.restore(); outline(x, R * 0.6, p); }
  x.beginPath(); x.arc(cx, cy, R * 0.22, 0, 7); x.fillStyle = '#f4d030'; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke(); curl(x, cx, cy, R * 0.12, R * 0.025, '#a07000');
});
// ---- Hebi Hebi model Yamata no Orochi: big magenta fruit, green leaves hanging down from the top ----
export const drawOrochi = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); x.ellipse(cx, cy + R * 0.05, R * 0.95, R * 0.9, 0, 0, 7); };
  body(x, R, p, cx, cy, ['#c8287a', '#f070b0', '#801050', '#5a0838', 0.26, 0.1]);
  for (let i = 0; i < 6; i++) leaf(x, cx, cy - R * 0.85, R, 0.5 + i * 0.42, R * 0.7, i % 2 ? '#4f9a3a' : '#6ab84a'); stem(x, cx, cy - R * 0.85, R); shine(x, cx, cy + R * 0.25, R);
});
// ---- Hito Hito: red mushroom-cap fruit with swirls on a pale stalk, green curly stem ----
export const drawHito = wrap((x, cx, cy, R) => {
  const st = () => { x.beginPath(); x.moveTo(cx - R * 0.3, cy); x.quadraticCurveTo(cx - R * 0.35, cy + R * 0.8, cx - R * 0.42, cy + R * 0.95); x.lineTo(cx + R * 0.42, cy + R * 0.95); x.quadraticCurveTo(cx + R * 0.35, cy + R * 0.8, cx + R * 0.3, cy); x.closePath(); };
  body(x, R, st, cx, cy + R * 0.5, ['#f4ead2', '#ffffff', '#d8c8a0', '#c8b890', 0.22, 0.08]);
  const cap = () => { x.beginPath(); x.moveTo(cx - R * 1.0, cy + R * 0.1); x.bezierCurveTo(cx - R * 1.0, cy - R * 1.0, cx + R * 1.0, cy - R * 1.0, cx + R * 1.0, cy + R * 0.1); x.quadraticCurveTo(cx, cy - R * 0.05, cx - R * 1.0, cy + R * 0.1); x.closePath(); };
  body(x, R, cap, cx, cy - R * 0.3, ['#e0303a', '#ff7a7a', '#a01020', '#700810', 0.26, 0.1]); stem(x, cx, cy - R * 0.7, R); shine(x, cx, cy - R * 0.05, R);
});
// ---- Horo Horo: pale yellow fruit of five ghost-shaped lobes, curly stem ----
export const drawHoro = wrap((x, cx, cy, R) => {
  const lobes = [[0, -0.3, 0.42], [-0.48, -0.05, 0.4], [0.48, -0.05, 0.4], [-0.25, 0.4, 0.42], [0.25, 0.4, 0.42]];
  for (const [dx, dy, r] of lobes) { const gx = cx + dx * R, gy = cy + dy * R, gr = r * R; const p = () => { x.beginPath(); x.arc(gx, gy - gr * 0.1, gr, Math.PI, 0); x.lineTo(gx + gr, gy + gr * 0.6); for (let k = 0; k < 4; k++) x.quadraticCurveTo(gx + gr - (k + 0.5) * gr / 2, gy + gr * (k % 2 ? 0.6 : 0.95), gx + gr - (k + 1) * gr / 2, gy + gr * 0.6); x.closePath(); };
    body(x, R * 0.7, p, gx, gy, ['#f4eaa0', '#fffbe0', '#d0c070', '#b0a050', 0.32, 0.12]); x.fillStyle = OL; for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(gx + sd * gr * 0.3, gy - gr * 0.15, gr * 0.09, gr * 0.15, 0, 0, 7); x.fill(); } }
  stem(x, cx, cy - R * 0.7, R);
});
// ---- Inu Inu model Okuchi no Makami: orange persimmon with brown leaves, curly stem ----
export const drawWolf = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); x.ellipse(cx, cy + R * 0.1, R * 1.0, R * 0.82, 0, 0, 7); };
  body(x, R, p, cx, cy, ['#f08a2a', '#ffc070', '#c05a10', '#8a3a00', 0.26, 0.1]);
  for (let i = 0; i < 4; i++) leaf(x, cx, cy - R * 0.68, R, i * 1.57 + 0.4, R * 0.45, '#8a5a2a'); stem(x, cx, cy - R * 0.72, R, '#6a4a2a'); shine(x, cx, cy + R * 0.1, R);
});
// ---- Jiki Jiki: cluster of blue swirl balls in a yellow zigzag ring ----
export const drawJiki = wrap((x, cx, cy, R) => {
  for (const [dx, dy] of [[-0.35, 0.2], [0.35, 0.2], [0, -0.25], [0, 0.45]]) { const p = () => { x.beginPath(); x.arc(cx + dx * R, cy + dy * R, R * 0.42, 0, 7); }; body(x, R * 0.6, p, cx + dx * R, cy + dy * R, ['#3a6ad8', '#8ab0ff', '#1a3a90', '#0a1a60', 0.3, 0.12]); }
  x.beginPath(); for (let i = 0; i <= 32; i++) { const a = i / 32 * 6.283, r = R * (i % 2 ? 0.92 : 1.05); x.lineTo(cx + Math.cos(a) * r, cy + R * 0.1 + Math.sin(a) * r * 0.42); } x.lineWidth = R * 0.13; x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke(); x.lineWidth = R * 0.07; x.strokeStyle = '#f4d030'; x.stroke();
  stem(x, cx, cy - R * 0.62, R);
});
// ---- Kiro Kiro: maroon-pink barrel / weight-shaped fruit, thick green T stem ----
export const drawKiro = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); x.moveTo(cx - R * 0.55, cy - R * 0.6); x.lineTo(cx + R * 0.55, cy - R * 0.6); x.quadraticCurveTo(cx + R * 1.05, cy + R * 0.2, cx + R * 0.8, cy + R * 0.9); x.lineTo(cx - R * 0.8, cy + R * 0.9); x.quadraticCurveTo(cx - R * 1.05, cy + R * 0.2, cx - R * 0.55, cy - R * 0.6); x.closePath(); };
  body(x, R, p, cx, cy, ['#b0405a', '#e0809a', '#701830', '#4a0a20', 0.26, 0.1]);
  x.beginPath(); x.rect(cx - R * 0.1, cy - R * 1.0, R * 0.2, R * 0.42); x.rect(cx - R * 0.4, cy - R * 1.12, R * 0.8, R * 0.18); x.fillStyle = '#5cb04a'; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke(); shine(x, cx, cy + R * 0.1, R);
});
// ---- Mane Mane: two orange striped gourds side by side ----
export const drawMane = wrap((x, cx, cy, R) => {
  for (const sd of [-1, 1]) { const gx = cx + sd * R * 0.42; const p = () => { x.beginPath(); x.arc(gx, cy - R * 0.4, R * 0.3, Math.PI * 0.75, Math.PI * 2.25); x.bezierCurveTo(gx + R * 0.5, cy - R * 0.1, gx + R * 0.58, cy + R * 0.95, gx, cy + R * 0.95); x.bezierCurveTo(gx - R * 0.58, cy + R * 0.95, gx - R * 0.5, cy - R * 0.1, gx - R * 0.21, cy - R * 0.19); x.closePath(); };
    p(); x.save(); x.clip(); swirlFill(x, R * 0.7, gx, cy, '#f08a2a', '#ffc070', '#c05a10', '#a04a00', 0.3, 0.1); x.strokeStyle = '#fff0c8'; x.lineWidth = R * 0.06; for (const yy of [-0.4, 0.25, 0.6]) { x.beginPath(); x.moveTo(gx - R, cy + yy * R); x.lineTo(gx + R, cy + yy * R + R * 0.05); x.stroke(); } x.restore(); outline(x, R, p); stem(x, gx, cy - R * 0.7, R * 0.7, '#4f9a3a', sd); }
});
// ---- Mero Mero: two heart-shaped cherries (red and purple) on joined stems ----
export const drawMero = wrap((x, cx, cy, R) => {
  for (const [sd, c] of [[-1, ['#e0303a', '#ff8a8a', '#a01020', '#ffd0d8']], [1, ['#8a3ab0', '#c08ae0', '#5a1a80', '#f0d0ff']]]) { const hx = cx + sd * R * 0.45, hy = cy + R * 0.25, s = R * 0.5;
    x.beginPath(); x.moveTo(hx, hy - s * 0.55); x.quadraticCurveTo(hx - sd * R * 0.1, cy - R * 0.6, cx, cy - R * 1.0); x.lineWidth = R * 0.08; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.04; x.strokeStyle = '#4f9a3a'; x.stroke();
    const p = () => { x.beginPath(); x.moveTo(hx, hy + s * 0.9); x.bezierCurveTo(hx - s * 1.3, hy, hx - s * 0.7, hy - s * 1.0, hx, hy - s * 0.45); x.bezierCurveTo(hx + s * 0.7, hy - s * 1.0, hx + s * 1.3, hy, hx, hy + s * 0.9); x.closePath(); };
    body(x, R * 0.6, p, hx, hy, [c[0], c[1], c[2], c[3], 0.3, 0.12]); shine(x, hx, hy, s); }
  leaf(x, cx, cy - R * 1.0, R, -0.3, R * 0.45);
});
// ---- Kage Kage: black fruit with swirls cradled in big green leaves ----
export const drawKage = wrap((x, cx, cy, R) => {
  for (const a of [2.4, 2.9, 0.25, 0.75]) leaf(x, cx, cy + R * 0.55, R, a + Math.PI, R * 1.0, '#4f9a3a');
  const p = () => { x.beginPath(); x.arc(cx, cy, R * 0.75, 0, 7); };
  body(x, R * 0.8, p, cx, cy, ['#2a2436', '#5a5070', '#0e0a16', '#7a6a9a', 0.28, 0.1]); stem(x, cx, cy - R * 0.72, R); shine(x, cx, cy, R * 0.8);
  for (const a of [0.6, 2.55]) leaf(x, cx, cy + R * 0.7, R, a + Math.PI, R * 0.8, '#6ab84a');
});
// ---- Sara Sara no Mi, Model: Axolotl: blue round fruit with swirls, curly stem ----
export const drawSara = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); x.ellipse(cx, cy + R * 0.05, R * 0.95, R * 0.88, 0, 0, 7); };
  body(x, R, p, cx, cy, ['#4a8ae8', '#9ac4ff', '#1a4ab0', '#0a2a70', 0.26, 0.1]); stem(x, cx, cy - R * 0.82, R); shine(x, cx, cy, R);
});
// ---- Pika Pika no Mi: yellow shield-shaped fruit split into two faces, swirls, star-shaped top, curly stem with a star leaf ----
function star(x, cx, cy, r, rot = 0) { x.beginPath(); for (let i = 0; i < 10; i++) { const a = rot - Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.closePath(); }
export const drawPika = wrap((x, cx, cy, R) => {
  const top = cy - R * 0.55, L = (k) => [cx - R * 0.78 + k, top];
  const half = (sd) => () => { x.beginPath(); x.moveTo(cx, top + R * 0.15); x.lineTo(cx + sd * R * 0.8, top); x.quadraticCurveTo(cx + sd * R * 0.85, cy + R * 0.6, cx, cy + R * 1.05); x.closePath(); };
  for (const [sd, c] of [[-1, ['#c89a20', '#e8c040', '#8a6810', '#7a5a10']], [1, ['#f0d030', '#fff08a', '#c8a010', '#8a6a10']]]) { const p = half(sd); p(); x.save(); x.clip(); swirlFill(x, R, cx + sd * R * 0.3, cy, ...c, 0.26, 0.1); x.restore(); outline(x, R, p); }
  star(x, cx, top + R * 0.05, R * 0.95, 0); x.save(); x.scale(1, 1); x.restore();
  x.save(); x.translate(cx, top + R * 0.05); x.scale(1, 0.38); star(x, 0, 0, R * 0.95, 0); x.restore(); x.fillStyle = '#f4e070'; x.fill(); x.lineWidth = R * 0.05; x.strokeStyle = OL; x.stroke();
  x.save(); x.translate(cx, top + R * 0.05); x.scale(1, 0.38); star(x, 0, 0, R * 0.95, 0); x.restore(); x.save(); x.clip(); curl(x, cx - R * 0.3, top + R * 0.02, R * 0.12, R * 0.025, '#a07a10'); curl(x, cx + R * 0.3, top + R * 0.05, R * 0.12, R * 0.025, '#a07a10', -1); x.restore();
  // stem: curl up, a branch out to a star leaf
  x.lineCap = 'round'; const sp = () => { x.beginPath(); x.moveTo(cx, top + R * 0.05); x.quadraticCurveTo(cx - R * 0.05, top - R * 0.35, cx + R * 0.05, top - R * 0.7); x.arc(cx - R * 0.08, top - R * 0.72, R * 0.13, 0, Math.PI * 1.5, true); x.moveTo(cx + R * 0.02, top - R * 0.35); x.quadraticCurveTo(cx + R * 0.35, top - R * 0.4, cx + R * 0.6, top - R * 0.55); };
  sp(); x.lineWidth = R * 0.13; x.strokeStyle = OL; x.stroke(); sp(); x.lineWidth = R * 0.07; x.strokeStyle = '#5ab04a'; x.stroke();
  star(x, cx + R * 0.68, top - R * 0.6, R * 0.22, 0.3); x.fillStyle = '#5ab04a'; x.fill(); x.lineWidth = R * 0.04; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(cx + R * 0.42, cy + R * 0.15, R * 0.07, R * 0.16, 0.2, 0, 7); x.fillStyle = 'rgba(255,255,255,0.7)'; x.fill();
});
// ---- Mochi Mochi (user's reference): white gourd, big ball on top of a small bulb, grey swirls, green T-shaped stem curling both ways ----
export const drawMochi = wrap((x, cx, cy, R) => {
  const p = () => { x.beginPath(); x.moveTo(cx - R * 0.25, cy + R * 0.42); x.bezierCurveTo(cx - R * 1.05, cy + R * 0.25, cx - R * 1.0, cy - R * 0.95, cx, cy - R * 0.95); x.bezierCurveTo(cx + R * 1.0, cy - R * 0.95, cx + R * 1.05, cy + R * 0.25, cx + R * 0.25, cy + R * 0.42);
    x.bezierCurveTo(cx + R * 0.55, cy + R * 0.55, cx + R * 0.5, cy + R * 1.05, cx, cy + R * 1.05); x.bezierCurveTo(cx - R * 0.5, cy + R * 1.05, cx - R * 0.55, cy + R * 0.55, cx - R * 0.25, cy + R * 0.42); x.closePath(); };
  p(); x.save(); x.clip(); swirlFill(x, R, cx, cy, '#f8f6ee', '#ffffff', '#d8d2c0', '#9a9488', 0.22, 0.1); x.restore(); outline(x, R, p);
  const sp = () => { x.beginPath(); x.moveTo(cx, cy - R * 0.92); x.lineTo(cx, cy - R * 1.2); x.moveTo(cx - R * 0.02, cy - R * 1.2); x.bezierCurveTo(cx - R * 0.5, cy - R * 1.3, cx - R * 0.9, cy - R * 1.05, cx - R * 1.05, cy - R * 1.3); x.arc(cx - R * 0.9, cy - R * 1.32, R * 0.15, Math.PI, Math.PI * 2.6); x.moveTo(cx + R * 0.02, cy - R * 1.2); x.bezierCurveTo(cx + R * 0.5, cy - R * 1.32, cx + R * 0.8, cy - R * 1.1, cx + R * 1.0, cy - R * 1.35); };
  x.lineCap = 'round'; sp(); x.lineWidth = R * 0.15; x.strokeStyle = OL; x.stroke(); sp(); x.lineWidth = R * 0.09; x.strokeStyle = '#8ad03a'; x.stroke();
  x.beginPath(); x.ellipse(cx, cy - R * 0.92, R * 0.14, R * 0.07, 0, 0, 7); x.fillStyle = '#8ad03a'; x.fill(); x.lineWidth = R * 0.03; x.strokeStyle = OL; x.stroke(); shine(x, cx, cy - R * 0.1, R * 0.9);
});
// ---- Uo Uo no Mi, Model: Seiryu (user's reference): pinecone of overlapping teal/blue scales with curled tongues, orange star calyx, two purple curly stems ----
export const drawSeiryu = wrap((x, cx, cy, R) => {
  // egg shape built from big teardrop scales; upper rows overlap the rows below
  const rows = [[-0.42, 4, 0.7], [-0.1, 5, 0.98], [0.22, 5, 0.98], [0.52, 4, 0.78], [0.78, 3, 0.48], [0.96, 2, 0.2]];
  const cols = ['#58c4d4', '#a6e2ea', '#3aaec4', '#7cd2de', '#c6eef2'];
  const scale = (sx, sy, sw, sh, c, d) => {
    const P = () => { x.beginPath(); x.moveTo(sx - sw * 0.55, sy - sh * 0.7); x.bezierCurveTo(sx - sw * 1.25, sy - sh * 0.2, sx - sw * 0.9, sy + sh, sx, sy + sh); x.bezierCurveTo(sx + sw * 0.9, sy + sh, sx + sw * 1.25, sy - sh * 0.2, sx + sw * 0.55, sy - sh * 0.7); x.quadraticCurveTo(sx, sy - sh * 1.15, sx - sw * 0.55, sy - sh * 0.7); x.closePath(); };
    P(); x.fillStyle = c; x.fill(); x.lineWidth = R * 0.03; x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke();
    x.save(); P(); x.clip(); x.beginPath(); x.moveTo(sx - sw * 0.5, sy - sh * 0.9); x.bezierCurveTo(sx - sw * 0.75, sy + sh * 0.1, sx - sw * 0.35, sy + sh * 0.62, sx - sw * 0.02, sy + sh * 0.6); x.bezierCurveTo(sx + sw * 0.28, sy + sh * 0.55, sx + sw * 0.25, sy - sh * 0.2, sx + sw * 0.05, sy - sh * 0.9); x.closePath(); x.fillStyle = d; x.fill(); x.lineWidth = R * 0.02; x.stroke(); x.restore();
    curl(x, sx - sw * 0.18, sy + sh * 0.3, sw * 0.24, R * 0.022, '#0a1a5a'); };
  for (let r = rows.length - 1; r >= 0; r--) { const [dy, n, w] = rows[r]; for (let i = 0; i < n; i++) { const u = n === 1 ? 0 : i / (n - 1) - 0.5; scale(cx + u * w * R * 1.72, cy + dy * R, R * 0.27, R * 0.34, cols[(i * 2 + r) % 5], (i + r) % 2 ? '#3a56c8' : '#5a7ad8'); } }
  // orange calyx: six fat rounded arms spreading flat over the top
  const ccy = cy - R * 0.66; for (const a of [-2.75, -2.15, -1.6, -1.05, -0.45, 0.15, 2.95]) { x.save(); x.translate(cx + Math.cos(a) * R * 0.28, ccy + Math.sin(a) * R * 0.18); x.rotate(a + Math.PI / 2); x.beginPath(); x.moveTo(-R * 0.1, R * 0.12); x.quadraticCurveTo(-R * 0.14, -R * 0.2, 0, -R * 0.3); x.quadraticCurveTo(R * 0.14, -R * 0.2, R * 0.1, R * 0.12); x.closePath(); x.fillStyle = '#f2a428'; x.fill(); x.lineWidth = R * 0.03; x.strokeStyle = OL; x.stroke(); x.restore(); }
  x.beginPath(); x.ellipse(cx, ccy, R * 0.28, R * 0.13, 0, 0, 7); x.fillStyle = '#f2a428'; x.fill();
  // two tall purple stems: up, a loop curling to the left, then a long tail flicking up to the right
  for (const [dx, col, sc] of [[-0.14, '#c890e0', 0.85], [0.12, '#8a48c0', 1.05]]) { const bx = cx + dx * R, yt = ccy - R * 0.7 * sc, r = R * 0.24 * sc, lc = bx - r;
    const sp = () => { x.beginPath(); x.moveTo(bx, ccy); x.lineTo(bx, yt); x.arc(lc, yt, r, 0, -1.85 * Math.PI, true); x.bezierCurveTo(lc + r * 1.2, yt - r * 1.6, bx + R * 0.25 * sc, yt - R * 0.5 * sc, bx + R * 0.5 * sc, yt - R * 0.75 * sc); };
    x.lineCap = 'round'; x.lineJoin = 'round'; sp(); x.lineWidth = R * 0.14; x.strokeStyle = OL; x.stroke(); sp(); x.lineWidth = R * 0.08; x.strokeStyle = col; x.stroke(); }
});
export const FRUITS3 = { mochi: drawMochi, azure: drawSeiryu,  light: drawPika,  axolotl: drawSara,  shadow: drawKage,  bubble: drawAwa, munch: drawBaku, bomb: drawBomu, wax: drawDoru, brush: drawFude, rumble: drawGoro, flower: drawHana, orochi: drawOrochi, human: drawHito, hollow: drawHoro, wolf: drawWolf, magnet: drawJiki, kilo: drawKiro, clone: drawMane, love: drawMero };
