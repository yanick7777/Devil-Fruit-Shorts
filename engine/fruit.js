// Mera Mera no Mi, drawn from the One Piece Wiki "Appearance" description:
// "a round orange fruit, composed of many flame-shaped components with swirl patterns on each one,
//  and has a swirled stem on the top."  Plain object: no face, eyes, mouth, arms or legs.
export const OL = '#1b1530';
export const FRUIT = {
  base: '#e86f1c',      // body orange (shadow side between bumps)
  lobe: '#ff9630',      // flame bump fill
  lobeLit: '#ffb54a',   // lit bumps (upper-left light)
  swirl: '#b9480f',     // swirl lines on each bump
  stem: '#3d6b35',      // stem (colour not given by the wiki; dark green like other Devil Fruit stems)
};

// one flame-shaped bump, pointing up, local origin at its base centre
function lobe(x, w, h, fill, curl) {
  x.beginPath();
  x.moveTo(-w / 2, 0);
  x.bezierCurveTo(-w * 0.62, -h * 0.45, -w * 0.25, -h * 0.72, curl * w * 0.12, -h);
  x.bezierCurveTo(curl * w * 0.05 + w * 0.32, -h * 0.78, w * 0.62, -h * 0.42, w / 2, 0);
  x.quadraticCurveTo(0, h * 0.22, -w / 2, 0);
  x.closePath();
  x.fillStyle = fill; x.fill();
  x.lineWidth = Math.max(3, w * 0.075); x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke();
  // its own swirl
  x.beginPath();
  const cx = 0, cy = -h * 0.36, r0 = w * 0.27;
  for (let a = 0; a <= Math.PI * 3.3; a += 0.12) { const r = r0 * (1 - a / (Math.PI * 3.7)); x.lineTo(cx + Math.cos(a * curl) * r, cy + Math.sin(a * curl) * r * 1.1); }
  x.lineWidth = Math.max(2.5, w * 0.06); x.strokeStyle = FRUIT.swirl; x.lineCap = 'round'; x.stroke();
}

// rot: spin around the vertical axis (radians). R: radius in px.
export function drawFruit(x, cx, cy, R, rot = 0, { shadow = true } = {}) {
  x.save();
  if (shadow) { x.fillStyle = 'rgba(20,10,40,0.25)'; x.beginPath(); x.ellipse(cx, cy + R * 1.02, R * 0.85, R * 0.16, 0, 0, 7); x.fill(); }
  // body
  x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fillStyle = FRUIT.base; x.fill(); x.lineWidth = R * 0.07; x.strokeStyle = OL; x.stroke();
  // bumps on a sphere: rows by latitude, spinning with rot
  const rows = [[-62, 6, 0.0], [-32, 9, 0.35], [-2, 11, 0.1], [28, 10, 0.5], [55, 7, 0.2], [76, 4, 0.0]];
  const items = [];
  rows.forEach(([latD, n, off], ri) => {
    const lat = latD * Math.PI / 180;
    for (let i = 0; i < n; i++) {
      const th = (i / n) * Math.PI * 2 + off + rot;
      const depth = Math.cos(th) * Math.cos(lat);
      if (Math.cos(th) < -0.05) continue;
      items.push({ ri, lat, th, depth, i });
    }
  });
  items.sort((a, b) => a.depth - b.depth || b.ri - a.ri);
  x.save(); x.beginPath(); x.arc(cx, cy, R * 1.18, 0, 7); x.clip();
  for (const it of items) {
    const ct = Math.cos(it.th), px = cx + R * Math.cos(it.lat) * Math.sin(it.th), py = cy - R * Math.sin(it.lat) * 0.98;
    const sc = Math.max(0.25, ct);
    const w = R * 0.52 * (0.45 + 0.55 * sc) * (0.55 + 0.45 * Math.cos(it.lat)), h = R * 0.62 * (0.75 + 0.25 * Math.cos(it.lat));
    const lit = Math.sin(it.th) < 0.1 && it.lat > -0.3;
    x.save(); x.translate(px, py + h * 0.42); x.rotate(Math.sin(it.th) * 0.35 * Math.cos(it.lat)); x.scale(1, 1);
    lobe(x, w, h, lit ? FRUIT.lobeLit : FRUIT.lobe, (it.i + it.ri) % 2 ? 1 : -1);
    x.restore();
  }
  x.restore();
  // spiral stem on top
  const sx = cx + Math.sin(rot) * R * 0.08, sy = cy - R * 0.98;
  x.beginPath(); x.moveTo(sx, sy + R * 0.05);
  x.bezierCurveTo(sx - R * 0.02, sy - R * 0.25, sx + R * 0.32, sy - R * 0.38, sx + R * 0.3, sy - R * 0.16);
  x.bezierCurveTo(sx + R * 0.28, sy - R * 0.02, sx + R * 0.1, sy - R * 0.06, sx + R * 0.13, sy - R * 0.18);
  x.bezierCurveTo(sx + R * 0.15, sy - R * 0.26, sx + R * 0.22, sy - R * 0.22, sx + R * 0.2, sy - R * 0.17);
  x.lineCap = 'round'; x.lineJoin = 'round';
  x.lineWidth = R * 0.12; x.strokeStyle = OL; x.stroke();
  x.lineWidth = R * 0.065; x.strokeStyle = FRUIT.stem; x.stroke();
  // glossy white highlight arc
  x.beginPath(); x.arc(cx, cy, R * 0.86, Math.PI * 1.12, Math.PI * 1.42); x.lineWidth = R * 0.07; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineCap = 'round'; x.stroke();
  x.beginPath(); x.arc(cx - R * 0.62, cy - R * 0.1, R * 0.045, 0, 7); x.fillStyle = '#fff'; x.fill();
  x.restore();
}
