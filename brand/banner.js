// YouTube channel banner, 2560x1440. Everything that must be read sits in the 1546x423 safe area in the middle;
// the wider TV/desktop area holds fruits and characters. ?name=...&tag=...&guides=1
import { drawPerson, mark, sparkle, glow, OL, FONT } from '/engine/art.js';
import { drawFruit } from '/engine/fruit.js';
import { drawGomu } from '/shorts/gum-gum/fruit.js';
import { drawGura } from '/shorts/quake/fruit.js';
import { drawOpe } from '/shorts/ope/fruit.js';
import { drawTori } from '/shorts/phoenix/fruit.js';
import { FRUITS3 } from '/engine/fruits3.js';
import { C } from '/brand/covers.js';

const W = 2560, H = 1440, SAFE = [507, 508, 1546, 423];
function rays(x) { x.fillStyle = '#8d5fd6'; x.fillRect(0, 0, W, H); x.fillStyle = '#a77ee8'; for (let i = 0; i < 40; i++) { const t = i / 40 * Math.PI * 2; x.beginPath(); x.moveTo(W / 2, H / 2); x.arc(W / 2, H / 2, 3200, t, t + Math.PI / 40); x.closePath(); x.fill(); }
  const g = x.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, 1200); g.addColorStop(0, 'rgba(255,255,255,0.5)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, W, H); }
function figure(x, who, expr, pose, cx, fy, s, flip) { const im = drawPerson({ who, expr, pose }); x.save(); x.translate(cx, fy); x.scale(flip ? -s : s, s); x.drawImage(im, -500, -1745); x.restore(); }
function text(x, t, cx, cy, size, fill, rot = -0.03, maxW = 1100) { x.save(); x.translate(cx, cy); x.rotate(rot); let s = size; x.font = `${s}px ${FONT}`; while (x.measureText(t).width > maxW) { s -= 4; x.font = `${s}px ${FONT}`; }
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.fillStyle = 'rgba(10,6,25,0.5)'; x.fillText(t, 12, 18); x.lineWidth = s * 0.22; x.strokeStyle = OL; x.strokeText(t, 0, 0); x.fillStyle = fill; x.fillText(t, 0, 0); x.restore(); }

export function sheet(c, q) {
  c.width = W; c.height = H; const x = c.getContext('2d');
  const name = q.get('name') || 'DEVIL FRUIT SHORTS', tag = q.get('tag') || 'WHAT IF YOU ATE IT? ONE FRUIT PER SHORT';
  rays(x);
  // every fruit from the channel: two rows above and two below the middle strip (desktop strip = full width, y 508-931)
  const keys = Object.keys(C), top = keys.slice(0, 16), bot = keys.slice(16, 32), side = keys.slice(32);
  const row = (ks, y0, y1) => ks.forEach((k, i) => { const fx = 90 + i * (2380 / (ks.length - 1)), fy = i % 2 ? y1 : y0, r = 78 + (i * 37 % 3) * 8;
    glow(x, fx, fy, r * 1.7, '255,255,255', 0.45); C[k].fruit(x, fx, fy, r, 0.25 * (i % 3 - 1), { shadow: false }); });
  row(top, 120, 360); row(bot, 1080, 1320);
  for (const [sx2, sy2, r] of [[180, 240, 30], [560, 470, 24], [2000, 470, 24], [2380, 250, 30], [700, 980, 26], [1880, 990, 26], [1280, 470, 22], [1280, 980, 22]]) sparkle(x, sx2, sy2, r);
  // desktop side zones (x 0-507 and 2053-2560 inside the strip): a character and fruits on each side
  figure(x, 'luffy', 'grin', 'cheer', 250, 1560, 0.6, false);
  figure(x, 'chopper', 'grin', 'cheer', 2330, 1250, 0.66, true);
  const sideF = [[drawGomu, 455, 600, 62], [FRUITS3.rumble, 445, 850, 56], [drawFruit, 2110, 610, 60], [FRUITS3.human, 2105, 850, 58]];
  if (side.length) sideF.push([C[side[0]].fruit, 2470, 520, 46]);
  for (const [f, fx, fy, r] of sideF) { glow(x, fx, fy, r * 1.8, '255,255,255', 0.5); f(x, fx, fy, r, 0.2, { shadow: false }); }
  // safe area: host holding a fruit on the left, channel name + tagline on the right
  const [sx, sy, sw, sh] = SAFE;
  x.save(); x.beginPath(); x.rect(sx, sy - 20, 420, sh + 40); x.clip(); figure(x, 'host', 'shock', 'shrug', sx + 210, sy + 1440 - 500, 0.55, false); x.restore();
  mark(x, '!?', sx + 380, sy + 70, 0.75, 0.15);
  text(x, name, sx + 420 + (sw - 420) / 2, sy + 150, 190, '#ffd84a', -0.03, sw - 470);
  text(x, tag, sx + 420 + (sw - 420) / 2, sy + 320, 84, '#ffffff', -0.01, sw - 470);
  if (q.get('guides')) { x.lineWidth = 6; x.setLineDash([24, 18]); x.strokeStyle = '#00ff88'; x.strokeRect(sx, sy, sw, sh); x.strokeStyle = '#ffffff'; x.strokeRect(W / 2 - 1235, 0, 2470, H); x.setLineDash([]); }
}
