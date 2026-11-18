// review sheets for the quake short: ?k=fruit | cast
import { drawOpe as drawGura, OPE as GURA } from '/shorts/ope/fruit.js';
import { drawPerson, OL } from '/engine/art.js';
export function sheet(c, q) {
  const x = c.getContext('2d');
  if (q.get('k') === 'cast') {
    c.width = 2600; c.height = 1050; x.fillStyle = '#e9f1f6'; x.fillRect(0, 0, c.width, c.height);
    [['chef', 'smug', 'idle'], ['chef', 'worried', 'shrug'], ['chef', 'hit', 'punch'], ['corazon', 'grin', 'idle'], ['corazon', 'smug', 'holdUp'], ['lawKid', 'sad', 'idle'], ['lawKid', 'grin', 'cheer'], ['host', 'calm', 'raise']].forEach(([w, e, p], k) => {
      const s = 0.48, cx = 160 + k * 320, fy = 920; x.drawImage(drawPerson({ who: w, expr: e, pose: p }), cx - 500 * s, fy - 1745 * s, 1000 * s, 1900 * s);
      x.font = '30px "Lilita One"'; x.fillStyle = OL; x.textAlign = 'center'; x.fillText(`${w} ${e}`, cx, fy + 60); });
    return;
  }
  c.width = 1600; c.height = 900; x.fillStyle = '#f4efe6'; x.fillRect(0, 0, 1600, 900);
  x.font = '64px "Lilita One"'; x.fillStyle = OL; x.fillText('OPE OPE NO MI  -  design sheet', 50, 85);
  [0, 0.6, 1.2, 1.8].forEach((r, i) => drawGura(x, 200 + i * 320, 400, 125, r));
  x.font = '34px "Lilita One"'; ['front', 'turn', 'turn', 'turn'].forEach((t, i) => x.fillText(t, 165 + i * 320, 600));
  drawGura(x, 1450, 430, 55, 0.3); x.font = '28px "Lilita One"'; x.fillText('prop size', 1390, 530);
  const sw = [['body', GURA.body], ['lit', GURA.lit], ['swirl', GURA.swirl], ['seed', GURA.seed], ['stem', GURA.stem], ['outline', OL]];
  sw.forEach(([n, col], i) => { x.fillStyle = col; x.fillRect(50 + i * 250, 680, 70, 70); x.strokeStyle = OL; x.lineWidth = 4; x.strokeRect(50 + i * 250, 680, 70, 70); x.fillStyle = OL; x.fillText(n, 135 + i * 250, 712); x.font = '22px monospace'; x.fillText(col, 135 + i * 250, 742); x.font = '28px "Lilita One"'; });
  x.font = '26px sans-serif'; x.fillText('Red heart-shaped, strawberry-like, swirls all over, curling stem pointing up. No face or limbs.', 50, 830);
}
