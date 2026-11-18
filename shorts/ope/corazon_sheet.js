import { drawPerson, OL } from '/engine/art.js';
export function sheet(c) {
  c.width = 1400; c.height = 1100; const x = c.getContext('2d'); x.fillStyle = '#e9f1f6'; x.fillRect(0, 0, c.width, c.height);
  [['corazon', 'grin', 'idle', 0.56], ['corazon', 'smug', 'holdUp', 0.56], ['lawKid', 'sad', 'idle', 0.4]].forEach(([w, e, p, s], k) => {
    const cx = 230 + k * 470, fy = 1020; x.drawImage(drawPerson({ who: w, expr: e, pose: p }), cx - 500 * s, fy - 1745 * s, 1000 * s, 1900 * s); });
}
