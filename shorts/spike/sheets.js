// review sheets for the spike short: ?k=fruit | cast
import { drawSwirlFruit, PALETTES } from '/engine/swirlFruit.js';
import { drawPerson, OL } from '/engine/art.js';
const PAL = 'slate';
export function sheet(c, q) {
  const x = c.getContext('2d');
  if (q.get('k') === 'cast') {
    c.width = 2600; c.height = 1050; x.fillStyle = '#e9f1f6'; x.fillRect(0, 0, c.width, c.height);
    [['captain', 'smug', 'idle'], ['captain', 'shock', 'shrug'], ['captain', 'shout', 'punch'], ['zala', 'smug', 'idle'], ['zala', 'grin', 'punch'], ['nami', 'grin', 'raise'], ['nami', 'shout', 'cheer'], ['host', 'grin', 'shrug']].forEach(([w, e, p], k) => {
      const s = 0.48, cx = 160 + k * 320, fy = 920; x.drawImage(drawPerson({ who: w, expr: e, pose: p }), cx - 500 * s, fy - 1745 * s, 1000 * s, 1900 * s);
      x.font = '30px "Lilita One"'; x.fillStyle = OL; x.textAlign = 'center'; x.fillText(`${w} ${e}`, cx, fy + 60); });
    return;
  }
  c.width = 1600; c.height = 900; x.fillStyle = '#f4efe6'; x.fillRect(0, 0, 1600, 900);
  x.font = '64px "Lilita One"'; x.fillStyle = OL; x.fillText('TOGE TOGE NO MI  -  design sheet', 50, 85);
  [0, 0.6, 1.2, 1.8].forEach((r, i) => drawSwirlFruit(x, 200 + i * 320, 400, 120, r, { pal: PAL }));
  x.font = '34px "Lilita One"'; ['front', 'turn', 'turn', 'turn'].forEach((t, i) => x.fillText(t, 165 + i * 320, 600));
  drawSwirlFruit(x, 1450, 430, 55, 0.3, { pal: PAL }); x.font = '28px "Lilita One"'; x.fillText('prop size', 1390, 530);
  const P = PALETTES[PAL], sw = [['body', P.body], ['lit', P.lit], ['swirl', P.swirl], ['shade', P.shade], ['stem', P.stem], ['outline', OL]];
  sw.forEach(([n, col], i) => { x.fillStyle = col; x.fillRect(50 + i * 250, 680, 70, 70); x.strokeStyle = OL; x.lineWidth = 4; x.strokeRect(50 + i * 250, 680, 70, 70); x.fillStyle = OL; x.fillText(n, 135 + i * 250, 712); x.font = '22px monospace'; x.fillText(col, 135 + i * 250, 742); x.font = '28px "Lilita One"'; });
  x.font = '24px sans-serif'; x.fillText('The fruit\'s look has never been revealed: a plain round swirl fruit (slate purple) stands in. No face or limbs.', 50, 830);
}
