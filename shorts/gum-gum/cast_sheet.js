import { drawPerson, OL } from '/engine/art.js';
export function sheet(c) {
  c.width = 2600; c.height = 1050; const x = c.getContext('2d'); x.fillStyle = '#e9f1f6'; x.fillRect(0, 0, c.width, c.height);
  [['luffyKid', 'grin', 'idle'], ['luffyKid', 'yuck', 'holdUp'], ['gunner', 'smug', 'punch'], ['gunner', 'worried', 'shrug'], ['gunner', 'hit', 'idle'], ['host_g2', 'shout', 'cheer'], ['host_g5', 'grin', 'shrug'], ['host', 'grin', 'raise']].forEach(([w, e, p], k) => {
    const s = 0.48, cx = 160 + k * 320, fy = 920; x.drawImage(drawPerson({ who: w, expr: e, pose: p }), cx - 500 * s, fy - 1745 * s, 1000 * s, 1900 * s);
    x.font = '30px "Lilita One"'; x.fillStyle = OL; x.textAlign = 'center'; x.fillText(`${w} ${e}`, cx, fy + 60); });
}
