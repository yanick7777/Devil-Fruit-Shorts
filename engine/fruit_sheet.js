import { drawFruit, FRUIT, OL } from './fruit.js';
export function sheet(c) {
  c.width = 1600; c.height = 900; const x = c.getContext('2d');
  x.fillStyle = '#f4efe6'; x.fillRect(0, 0, 1600, 900);
  x.font = '64px "Lilita One"'; x.fillStyle = OL; x.fillText('MERA MERA NO MI  -  design sheet', 50, 85);
  [0, 0.5, 1.05, 1.6].forEach((r, i) => drawFruit(x, 220 + i * 330, 380, 130, r));
  x.font = '34px "Lilita One"'; ['front', 'turn 30°', 'turn 60°', 'turn 90°'].forEach((t, i) => x.fillText(t, 165 + i * 330, 600));
  drawFruit(x, 1400, 400, 60, 0.3);
  x.font = '28px "Lilita One"'; x.fillText('prop size', 1340, 520);
  const sw = [['body', FRUIT.base], ['bump', FRUIT.lobe], ['lit bump', FRUIT.lobeLit], ['swirl', FRUIT.swirl], ['stem', FRUIT.stem], ['outline', OL]];
  sw.forEach(([n, col], i) => { x.fillStyle = col; x.fillRect(50 + i * 250, 680, 70, 70); x.strokeStyle = OL; x.lineWidth = 4; x.strokeRect(50 + i * 250, 680, 70, 70); x.fillStyle = OL; x.fillText(n, 135 + i * 250, 712); x.font = '22px monospace'; x.fillText(col, 135 + i * 250, 742); x.font = '28px "Lilita One"'; });
  x.font = '26px sans-serif'; x.fillText('Round orange fruit made of many flame-shaped bumps, each with its own swirl; spiral stem on top. No face or limbs.', 50, 830);
}
