// Host profile pictures: 1080x1080, safe inside a circle crop. ?v=1|2|3|sheet
import { drawPerson, mug, mark, sparkle, OL } from '/engine/art.js';
import { drawFruit } from '/engine/fruit.js';
import { drawGomu } from '/shorts/gum-gum/fruit.js';

function rays(x, a, b, cx = 540, cy = 560) {
  x.fillStyle = b; x.fillRect(0, 0, 1080, 1080); x.fillStyle = a;
  for (let i = 0; i < 24; i++) { const t = i / 24 * Math.PI * 2; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, 1600, t, t + Math.PI / 24); x.closePath(); x.fill(); }
  const g = x.createRadialGradient(cx, cy, 40, cx, cy, 620); g.addColorStop(0, 'rgba(255,255,255,0.55)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1080);
}
function bust(x, expr, pose, s = 1.05) { // head and shoulders, head centred a little above the middle
  const im = drawPerson({ who: 'host', expr, pose });
  const hx = 500, hy = 440; // head centre inside the figure canvas
  x.drawImage(im, 540 - hx * s, 470 - hy * s, im.width * s, im.height * s);
  return (lx, ly) => [540 + (lx + 120 - hx) * s, 470 + (ly + 110 - hy) * s];
}
function variant(x, v) {
  if (v === 1) { rays(x, '#ff9cc6', '#ff7fb4'); const P = bust(x, 'smug', 'hold'); const [hx, hy] = P(480, 880); mug(x, hx + 20, hy - 10, 1.35, 0.6, true, false); sparkle(x, 200, 260, 34); sparkle(x, 880, 220, 24); }
  if (v === 2) { rays(x, '#ffb24d', '#ff9a2e'); const P = bust(x, 'grin', 'holdUp'); const [hx, hy] = P(620, 560); drawFruit(x, hx + 30, hy - 110, 110, 0.4, { shadow: false }); sparkle(x, 200, 260, 30); }
  if (v === 3) { rays(x, '#7fe6d8', '#3fc4b4'); bust(x, 'shock', 'shrug'); mark(x, '!?', 830, 250, 1.3, 0.15); drawGomu(x, 210, 300, 70, 0.3, { shadow: false }); }
  x.save(); x.globalCompositeOperation = 'destination-in'; x.restore();
}
export function sheet(c, q) {
  const v = q.get('v') || 'sheet', x = c.getContext('2d');
  if (v !== 'sheet') { c.width = 1080; c.height = 1080; variant(x, +v); return; }
  c.width = 3 * 560 + 40; c.height = 640; x.fillStyle = '#1b1530'; x.fillRect(0, 0, c.width, c.height);
  for (let i = 1; i <= 3; i++) { const t = document.createElement('canvas'); t.width = t.height = 1080; variant(t.getContext('2d'), i);
    const ox = 20 + (i - 1) * 560; x.save(); x.beginPath(); x.arc(ox + 260, 300, 250, 0, 7); x.clip(); x.drawImage(t, ox + 10, 50, 500, 500); x.restore();
    x.beginPath(); x.arc(ox + 260, 300, 250, 0, 7); x.lineWidth = 6; x.strokeStyle = '#fff'; x.stroke();
    x.font = '34px "Lilita One"'; x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText(`Option ${i}`, ox + 260, 605); }
}
