import { BG } from '/engine/bgs.js';
export function sheet(c) {
  const names = ['hearts', 'rays:yellow', 'ecg', 'surgery', 'clinic', 'forest', 'kitchen', 'chessboard', 'park', 'lab', 'xray', 'hourglass', 'dusk', 'snowNight', 'party'];
  c.width = 9 * 216; c.height = 2 * 404; const x = c.getContext('2d'); x.fillStyle = '#111'; x.fillRect(0, 0, c.width, c.height);
  names.forEach((n, i) => { const [k, a] = n.split(':'); x.drawImage(BG[k](a), 80, 140, 1080, 1920, (i % 9) * 216, Math.floor(i / 9) * 404, 216, 384); x.fillStyle = '#fff'; x.font = '18px sans-serif'; x.fillText(n, (i % 9) * 216 + 6, Math.floor(i / 9) * 404 + 400); });
}
