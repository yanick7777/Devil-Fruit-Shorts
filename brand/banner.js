// YouTube channel banner, 2560x1440. Everything that must be read sits in the 1546x423 safe area in the middle;
// the wider TV/desktop area holds fruits and characters. ?name=...&tag=...&guides=1
import { drawPerson, mark, sparkle, glow, OL, FONT } from '/engine/art.js';
import { drawFruit } from '/engine/fruit.js';
import { drawGomu } from '/shorts/gum-gum/fruit.js';
import { drawGura } from '/shorts/quake/fruit.js';
import { drawOpe } from '/shorts/ope/fruit.js';
import { drawTori } from '/shorts/phoenix/fruit.js';
import { FRUITS3 } from '/engine/fruits3.js';

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
  // fruits scattered around the edges (visible on desktop and TV, never under the text)
  const F = [[drawGomu, 260, 300, 120], [drawFruit, 2300, 280, 115], [drawGura, 380, 1160, 110], [drawOpe, 2190, 1170, 105], [drawTori, 120, 720, 95], [FRUITS3.rumble, 2450, 720, 95],
    [FRUITS3.flower, 900, 160, 80], [FRUITS3.human, 1660, 150, 80], [FRUITS3.magnet, 880, 1300, 80], [FRUITS3.shadow, 1700, 1310, 80]];
  for (const [f, fx, fy, r] of F) { glow(x, fx, fy, r * 1.8, '255,255,255', 0.5); f(x, fx, fy, r, 0.3, { shadow: false }); }
  for (const [sx, sy, r] of [[620, 260, 34], [1980, 300, 30], [700, 1180, 26], [1900, 1150, 30], [1280, 140, 24], [1280, 1320, 24]]) sparkle(x, sx, sy, r);
  // characters on the far sides (TV-only area)
  figure(x, 'luffy', 'grin', 'cheer', 330, 1440 + 500, 0.62, false);
  figure(x, 'chopper', 'grin', 'cheer', 2240, 1440 + 330, 0.62, true);
  // safe area: host holding a fruit on the left, channel name + tagline on the right
  const [sx, sy, sw, sh] = SAFE;
  x.save(); x.beginPath(); x.rect(sx, sy - 20, 420, sh + 40); x.clip(); figure(x, 'host', 'shock', 'shrug', sx + 210, sy + 1440 - 500, 0.55, false); x.restore();
  mark(x, '!?', sx + 380, sy + 70, 0.75, 0.15);
  text(x, name, sx + 420 + (sw - 420) / 2, sy + 150, 190, '#ffd84a', -0.03, sw - 470);
  text(x, tag, sx + 420 + (sw - 420) / 2, sy + 320, 84, '#ffffff', -0.01, sw - 470);
  if (q.get('guides')) { x.lineWidth = 6; x.setLineDash([24, 18]); x.strokeStyle = '#00ff88'; x.strokeRect(sx, sy, sw, sh); x.strokeStyle = '#ffffff'; x.strokeRect(W / 2 - 1235, 0, 2470, H); x.setLineDash([]); }
}
