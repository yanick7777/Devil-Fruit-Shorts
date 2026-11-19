import { BG } from '/engine/bgs.js';
export function sheet(c) {
  const names = ['desertCactus', 'rays:lime', 'greenhouse', 'armory', 'spikeArena', 'lumberYard', 'nightStreet', 'brickAlley', 'gym', 'rainNight', 'thunderClouds', 'casino', 'trainPlatform'];
  c.width = 7 * 216; c.height = 2 * 404; const x = c.getContext('2d'); x.fillStyle = '#111'; x.fillRect(0, 0, c.width, c.height);
  names.forEach((n, i) => { const [k, a] = n.split(':'); x.drawImage(BG[k](a), 80, 140, 1080, 1920, (i % 7) * 216, Math.floor(i / 7) * 404, 216, 384); x.fillStyle = '#fff'; x.font = '18px sans-serif'; x.fillText(n, (i % 7) * 216 + 6, Math.floor(i / 7) * 404 + 400); });
}
