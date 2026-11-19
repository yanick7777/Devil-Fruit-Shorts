// Generic review sheets: fruit design sheet and cast sheet.
import { drawPerson, OL } from './art.js';
export function fruitSheet(c, title, draw, swatches, note, rots = [0, 0.6, 1.2, 1.8], labels = ['front', 'turn', 'turn', 'turn']) {
  const x = c.getContext('2d'); c.width = 1600; c.height = 900; x.fillStyle = '#f4efe6'; x.fillRect(0, 0, 1600, 900);
  x.font = '64px "Lilita One"'; x.fillStyle = OL; x.fillText(`${title}  -  design sheet`, 50, 85);
  rots.forEach((r, i) => draw(x, 200 + i * 320, 400, 120, r, i));
  x.font = '34px "Lilita One"'; labels.forEach((t, i) => x.fillText(t, 165 + i * 320, 600));
  draw(x, 1450, 430, 55, 0.3, 0); x.font = '28px "Lilita One"'; x.fillText('prop size', 1390, 530);
  swatches.forEach(([n, col], i) => { x.fillStyle = col; x.fillRect(50 + i * 250, 680, 70, 70); x.strokeStyle = OL; x.lineWidth = 4; x.strokeRect(50 + i * 250, 680, 70, 70); x.fillStyle = OL; x.fillText(n, 135 + i * 250, 712); x.font = '22px monospace'; x.fillText(col, 135 + i * 250, 742); x.font = '28px "Lilita One"'; });
  x.font = '24px sans-serif'; x.fillText(note, 50, 830);
}
export function castSheet(c, list) { // list of [who, expr, pose, scale?]
  const x = c.getContext('2d'); c.width = 2600; c.height = 1050; x.fillStyle = '#e9f1f6'; x.fillRect(0, 0, c.width, c.height);
  list.forEach(([w, e, p, sc], k) => { const s = sc || 0.48, cx = 160 + k * 320, fy = 920; x.drawImage(drawPerson({ who: w, expr: e, pose: p }), cx - 500 * s, fy - 1745 * s, 1000 * s, 1900 * s);
    x.font = '30px "Lilita One"'; x.fillStyle = OL; x.textAlign = 'center'; x.fillText(`${w} ${e}`, cx, fy + 60); });
}
export function bgSheet(c, BG, names) {
  const cols = Math.ceil(names.length / 2); c.width = cols * 216; c.height = 2 * 404; const x = c.getContext('2d'); x.fillStyle = '#111'; x.fillRect(0, 0, c.width, c.height);
  names.forEach((n, i) => { const [k, a] = n.split(':'); x.drawImage(BG[k](a), 80, 140, 1080, 1920, (i % cols) * 216, Math.floor(i / cols) * 404, 216, 384); x.fillStyle = '#fff'; x.font = '18px sans-serif'; x.fillText(n, (i % cols) * 216 + 6, Math.floor(i / cols) * 404 + 400); });
}
// one-call sheets module for batch 3 shorts
export function makeSheet({ title, fruit, cols, note, cast, sets, BG }) {
  return (c, q) => {
    if (q.get('k') === 'cast') return castSheet(c, cast);
    if (q.get('k') === 'bg') return bgSheet(c, BG, sets);
    fruitSheet(c, title, (x, cx, cy, R, r) => fruit(x, cx, cy, R * 0.9, r), cols, note);
  };
}
