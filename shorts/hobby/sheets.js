// review sheets for the hobby short: ?k=fruit | cast
import { drawHobi, HOBI } from '/shorts/hobby/fruit.js';
import { drawPerson, OL } from '/engine/art.js';
export function sheet(c, q) {
  const x = c.getContext('2d');
  if (q.get('k') === 'cast') {
    c.width = 2600; c.height = 1050; x.fillStyle = '#e9f1f6'; x.fillRect(0, 0, c.width, c.height);
    [['builder', 'smug', 'idle'], ['builder', 'shock', 'shrug'], ['builder', 'shout', 'punch'], ['sugar', 'smug', 'idle', 0.34], ['sugar', 'hit', 'shrug', 0.34], ['usopp', 'shout', 'cheer'], ['doflamingo', 'grin', 'idle'], ['host', 'grin', 'shrug']].forEach(([w, e, p, sc], k) => {
      const s = sc || 0.48, cx = 160 + k * 320, fy = 920; x.drawImage(drawPerson({ who: w, expr: e, pose: p }), cx - 500 * s, fy - 1745 * s, 1000 * s, 1900 * s);
      x.font = '30px "Lilita One"'; x.fillStyle = OL; x.textAlign = 'center'; x.fillText(`${w} ${e}`, cx, fy + 60); });
    return;
  }
  c.width = 1600; c.height = 900; x.fillStyle = '#f4efe6'; x.fillRect(0, 0, 1600, 900);
  x.font = '64px "Lilita One"'; x.fillStyle = OL; x.fillText('HOBI HOBI NO MI  -  design sheet', 50, 85);
  [0, 0.35, 0.7, 0.95].forEach((t, i) => drawHobi(x, 200 + i * 320, 400, 125, 0.4 * i, { turn: t }));
  x.font = '34px "Lilita One"'; ['face', 'turn', 'turn', 'edge'].forEach((t, i) => x.fillText(t, 165 + i * 320, 600));
  drawHobi(x, 1450, 430, 55, 0.3); x.font = '28px "Lilita One"'; x.fillText('prop size', 1390, 530);
  const sw = [['shell', HOBI.shell], ['swirl', HOBI.swirl], ['core', HOBI.core], ['core line', HOBI.coreLine], ['stem', HOBI.stem], ['outline', OL]];
  sw.forEach(([n, col], i) => { x.fillStyle = col; x.fillRect(50 + i * 250, 680, 70, 70); x.strokeStyle = OL; x.lineWidth = 4; x.strokeRect(50 + i * 250, 680, 70, 70); x.fillStyle = OL; x.fillText(n, 135 + i * 250, 712); x.font = '22px monospace'; x.fillText(col, 135 + i * 250, 742); x.font = '28px "Lilita One"'; });
  x.font = '24px sans-serif'; x.fillText('Wheel-shaped (yo-yo): light yellow spiral core on both sides, red swirly shell around the middle, green stem. No face or limbs.', 50, 830);
}
