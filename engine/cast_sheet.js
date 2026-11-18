import { drawPerson, mug, figPoint, POSES, OL } from './art.js';
export function sheet(c) {
  c.width = 2600; c.height = 2000; const x = c.getContext('2d'); x.fillStyle = '#e9f1f6'; x.fillRect(0, 0, c.width, c.height);
  const cell = (k, who, expr, pose, row) => {
    const s = 0.48, cx = 160 + k * 320, fy = 920 + row * 980;
    const im = drawPerson({ who, expr, pose }); x.drawImage(im, cx - 500 * s, fy - 1745 * s, 1000 * s, 1900 * s);
    if (pose === 'hold' || pose === 'sip') { const [hx, hy] = figPoint(...POSES[pose].R[1], cx, fy, s); mug(x, hx + 20 * s, hy - 10 * s, 0.9 * s / 0.7, 0.4, true, false); }
    x.font = '30px "Lilita One"'; x.fillStyle = OL; x.textAlign = 'center'; x.fillText(`${who} ${expr} / ${pose}`, cx, fy + 60);
  };
  [['host', 'calm', 'idle'], ['host', 'smug', 'hold'], ['host', 'calm', 'sip'], ['host', 'grin', 'raise'], ['host', 'shout', 'cheer'], ['host', 'worried', 'shrug'], ['host', 'yuck', 'holdUp'], ['host', 'shock', 'punch']].forEach((a, k) => cell(k, ...a, 0));
  [['enemy', 'smug', 'idle'], ['enemy', 'worried', 'shrug'], ['enemy', 'hit', 'punch'], ['ace', 'smug', 'idle'], ['ace', 'grin', 'cheer'], ['sabo', 'grin', 'idle'], ['sabo', 'grin', 'cheer']].forEach((a, k) => cell(k, ...a, 1));
}
