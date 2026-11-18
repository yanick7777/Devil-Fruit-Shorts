import { drawGomu, GOMU } from '/shorts/gum-gum/fruit.js';
import { OL } from '/engine/art.js';
export function sheet(c) {
  c.width = 1600; c.height = 900; const x = c.getContext('2d');
  x.fillStyle = '#f4efe6'; x.fillRect(0, 0, 1600, 900);
  x.font = '64px "Lilita One"'; x.fillStyle = OL; x.fillText('GOMU GOMU NO MI  -  design sheet', 50, 85);
  [0, 0.5, 1.05, 1.6].forEach((r, i) => drawGomu(x, 200 + i * 320, 390, 125, r));
  x.font = '34px "Lilita One"'; ['front', 'turn 30°', 'turn 60°', 'turn 90°'].forEach((t, i) => x.fillText(t, 150 + i * 320, 600));
  drawGomu(x, 1450, 420, 60, 0.3); x.font = '28px "Lilita One"'; x.fillText('prop size', 1390, 530);
  const sw = [['rind', GOMU.body], ['lit', GOMU.lit], ['shade', GOMU.shade], ['S swirl', GOMU.swirl], ['stem', GOMU.stem], ['outline', OL]];
  sw.forEach(([n, col], i) => { x.fillStyle = col; x.fillRect(50 + i * 250, 680, 70, 70); x.strokeStyle = OL; x.lineWidth = 4; x.strokeRect(50 + i * 250, 680, 70, 70); x.fillStyle = OL; x.fillText(n, 135 + i * 250, 712); x.font = '22px monospace'; x.fillText(col, 135 + i * 250, 742); x.font = '28px "Lilita One"'; });
  x.font = '26px sans-serif'; x.fillText('Violet, round like a cantaloupe (Yubari King melon), stem on top, curly S-shaped swirls all over. No face or limbs.', 50, 830);
}
