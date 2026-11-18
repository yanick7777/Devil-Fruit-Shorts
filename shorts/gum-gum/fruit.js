// Gomu Gomu no Mi, drawn from the One Piece Wiki "Appearance" description:
// "a violet, spherical shaped fruit, similar to a cantaloupe, with a stem sprouting out of the top,
//  with swirls that go in a curly 'S' like-pattern. Its overall appearance greatly resembles a Yubari King."
// Plain object: no face, eyes, mouth, arms or legs.
import { OL } from '/engine/art.js';
export const GOMU = {
  body: '#9150dc',     // violet rind
  lit: '#aa72ee',      // lit side
  shade: '#7438bd',    // shadow side
  swirl: '#4f1f8f',    // curly S swirls
  net: 'rgba(255,255,255,0.10)', // faint cantaloupe netting
  stem: '#5c7a2e',     // stem (colour not given by the wiki: green, unconfirmed)
};

function spiral(cx, cy, r, turns, dir) {
  const pts = [];
  for (let a = 0; a <= turns * Math.PI * 2; a += 0.14) { const rr = r * a / (turns * Math.PI * 2); pts.push([cx + Math.cos(a * dir) * rr, cy + Math.sin(a * dir) * rr]); }
  return pts;
}
// one curly "S": a spiral at each end, joined in the middle, turning opposite ways
function sSwirl(x, L, lw) {
  const a = spiral(-L * 0.32, -L * 0.1, L * 0.22, 1.25, 1), b = spiral(L * 0.32, L * 0.1, L * 0.22, 1.25, 1);
  x.beginPath(); a.forEach(([px, py], i) => (i ? x.lineTo(px, py) : x.moveTo(px, py)));
  for (let i = b.length - 1; i >= 0; i--) x.lineTo(b[i][0], b[i][1]);
  x.lineWidth = lw; x.strokeStyle = GOMU.swirl; x.lineCap = 'round'; x.lineJoin = 'round'; x.stroke();
}

export function drawGomu(x, cx, cy, R, rot = 0, { shadow = true } = {}) {
  if (R <= 0) return;
  x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.02, R * 0.85, R * 0.16, 0, 0, 7); x.fill(); }
  // rind: flat violet with a lit upper-left half and a darker lower-right crescent
  x.beginPath(); x.ellipse(cx, cy, R * 1.02, R, 0, 0, 7); x.fillStyle = GOMU.body; x.fill();
  x.save(); x.clip();
  x.beginPath(); x.ellipse(cx - R * 0.18, cy - R * 0.2, R * 0.85, R * 0.8, 0, 0, 7); x.fillStyle = GOMU.lit; x.fill();
  x.beginPath(); x.arc(cx + R * 0.55, cy + R * 0.55, R * 0.9, 0, 7); x.fillStyle = GOMU.shade; x.globalAlpha = 0.55; x.fill(); x.globalAlpha = 1;
  // faint melon netting
  x.strokeStyle = GOMU.net; x.lineWidth = R * 0.012;
  for (let i = -4; i <= 4; i++) { x.beginPath(); x.ellipse(cx + Math.sin(rot + i * 0.35) * R * 0.2, cy, Math.abs(Math.cos(i * 0.35)) * R, R, 0, 0, 7); x.stroke(); }
  // curly S swirls spread over the sphere, turning with rot
  const rows = [[-48, 4, 0.3], [-6, 6, 0.0], [40, 5, 0.5]];
  rows.forEach(([latD, n, off], ri) => {
    const lat = latD * Math.PI / 180;
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2 + off + rot, ct = Math.cos(th);
      if (ct < 0.05) continue;
      const px = cx + R * Math.cos(lat) * Math.sin(th), py = cy - R * Math.sin(lat) * 0.97;
      x.save(); x.translate(px, py); x.rotate(((i * 37 + ri * 11) % 7 - 3) * 0.18); x.scale(Math.max(0.3, ct) * (0.6 + 0.4 * Math.cos(lat)), 0.75 + 0.25 * Math.cos(lat));
      sSwirl(x, R * 0.62, R * 0.042); x.restore();
    }
  });
  x.restore();
  x.beginPath(); x.ellipse(cx, cy, R * 1.02, R, 0, 0, 7); x.lineWidth = R * 0.07; x.strokeStyle = OL; x.stroke();
  // stem sprouting from the top with a small curl
  const sx = cx + Math.sin(rot) * R * 0.06, sy = cy - R * 0.97;
  x.beginPath(); x.moveTo(sx, sy + R * 0.04); x.quadraticCurveTo(sx - R * 0.04, sy - R * 0.2, sx + R * 0.12, sy - R * 0.3); x.quadraticCurveTo(sx + R * 0.26, sy - R * 0.36, sx + R * 0.24, sy - R * 0.22); x.quadraticCurveTo(sx + R * 0.2, sy - R * 0.14, sx + R * 0.14, sy - R * 0.2);
  x.lineCap = 'round'; x.lineWidth = R * 0.13; x.strokeStyle = OL; x.stroke(); x.lineWidth = R * 0.07; x.strokeStyle = GOMU.stem; x.stroke();
  // glossy highlight arc + glint
  x.beginPath(); x.arc(cx, cy, R * 0.84, Math.PI * 1.12, Math.PI * 1.42); x.lineWidth = R * 0.07; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineCap = 'round'; x.stroke();
  x.beginPath(); x.arc(cx - R * 0.6, cy - R * 0.08, R * 0.045, 0, 7); x.fillStyle = '#fff'; x.fill();
  x.restore();
}
