import { BG } from '/engine/bgs.js';
export function sheet(c) {
  const names = ['halftone', 'rays:blue', 'swirl', 'townStreet', 'storm', 'arcade', 'bamboo', 'rooftops', 'blueprint', 'mountain', 'ring', 'fortress', 'cartoon', 'clouds', 'archive', 'sunburst', 'nightSea', 'tavern', 'bedroom'];
  c.width = 10 * 216; c.height = 2 * 384 + 40; const x = c.getContext('2d'); x.fillStyle = '#111'; x.fillRect(0, 0, c.width, c.height);
  names.forEach((n, i) => { const [k, a] = n.split(':'); const b = BG[k](a); x.drawImage(b, 80, 140, 1080, 1920, (i % 10) * 216, Math.floor(i / 10) * 404, 216, 384); x.fillStyle = '#fff'; x.font = '18px sans-serif'; x.fillText(n, (i % 10) * 216 + 6, Math.floor(i / 10) * 404 + 400); });
}
