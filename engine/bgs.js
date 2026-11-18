// Flat painted backgrounds. Each is a 1240x2200 canvas (80px/140px margin around the 1080x1920 frame
// so camera moves never show an edge), finished with a soft blurred edge.
import { mk, rrect, fs, OL, hash } from './art.js';
export const BW = 1240, BH = 2200, OX = 80, OY = 140;

function canvas() { const c = mk(BW, BH), x = c.getContext('2d'); x.translate(OX, OY); return [c, x]; }
function fill(x, a, b, y0 = -OY, y1 = BH - OY) { const g = x.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, a); g.addColorStop(1, b); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH); }
function finish(c, blur = 14) {
  const t = mk(BW, BH), tx = t.getContext('2d');
  tx.filter = `blur(${blur}px)`; tx.drawImage(c, 0, 0); tx.filter = 'none';
  const m = tx.createRadialGradient(BW / 2, BH / 2, BH * 0.36, BW / 2, BH / 2, BH * 0.62);
  m.addColorStop(0, 'rgba(0,0,0,0)'); m.addColorStop(1, 'rgba(0,0,0,1)');
  tx.globalCompositeOperation = 'destination-in'; tx.fillStyle = m; tx.fillRect(0, 0, BW, BH);
  c.getContext('2d').drawImage(t, 0, 0);
  return c;
}
function cloud(x, cx, cy, s) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.arc(-60, 10, 50, 0, 7); x.arc(0, -15, 65, 0, 7); x.arc(70, 8, 48, 0, 7); x.rect(-110, 10, 230, 50); fs(x, 'rgba(255,255,255,0.95)', 0); x.restore(); }
function sunDisk(x, cx, cy, r, col = '255,250,210') {
  x.save(); for (let i = 0; i < 12; i++) { x.fillStyle = `rgba(${col},0.10)`; const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, 1400, a, a + 0.12); x.closePath(); x.fill(); }
  const g = x.createRadialGradient(cx, cy, r * 0.6, cx, cy, r * 2.4); g.addColorStop(0, `rgba(${col},0.7)`); g.addColorStop(1, `rgba(${col},0)`); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r * 2.4, 0, 7); x.fill();
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = `rgb(${col})`; x.fill(); x.restore();
}
function waves(x, y, col, n = 7, amp = 10) { x.strokeStyle = col; x.lineWidth = 6; x.lineCap = 'round'; for (let i = 0; i < n; i++) { const wx = hash(i + y) * 1100 - 20, wy = y + hash(i + 7) * 200; x.beginPath(); x.moveTo(wx, wy); x.quadraticCurveTo(wx + 30, wy - amp, wx + 60, wy); x.quadraticCurveTo(wx + 90, wy - amp, wx + 120, wy); x.stroke(); } }

export const BG = {
  desk() { // teal-blue brick wall, purple window frame with a pale light shaft
    const [c, x] = canvas(); fill(x, '#7fb9c4', '#5f9cab');
    x.strokeStyle = 'rgba(255,255,255,0.22)'; x.lineWidth = 5;
    for (let r = 0, y = -OY; y < BH; r++, y += 70) { x.beginPath(); x.moveTo(-OX, y); x.lineTo(BW, y); x.stroke(); for (let bx = -OX + (r % 2) * 80; bx < BW; bx += 160) { x.beginPath(); x.moveTo(bx, y); x.lineTo(bx, y + 70); x.stroke(); } }
    x.fillStyle = 'rgba(30,20,50,0.25)'; rrect(x, 4, 230, 900, 1200, 70); x.fill();
    rrect(x, -20, 210, 900, 1200, 70); const g = x.createLinearGradient(0, 210, 0, 1410); g.addColorStop(0, '#93597c'); g.addColorStop(1, '#7c4a6c'); fs(x, g, 22, '#3a2537');
    x.save(); rrect(x, -20, 210, 900, 1200, 70); x.clip();
    x.fillStyle = 'rgba(255,235,245,0.16)'; x.beginPath(); x.moveTo(60, 210); x.lineTo(300, 210); x.lineTo(120, 1410); x.lineTo(-120, 1410); x.fill();
    x.fillStyle = 'rgba(255,235,245,0.08)'; x.beginPath(); x.moveTo(340, 210); x.lineTo(420, 210); x.lineTo(240, 1410); x.lineTo(160, 1410); x.fill();
    x.strokeStyle = 'rgba(255,255,255,0.12)'; x.lineWidth = 6; rrect(x, 6, 236, 848, 1148, 52); x.stroke(); x.restore();
    return finish(c);
  },
  rays(hue) { // radial light rays in one hue
    const [c, x] = canvas(); const H = { orange: ['#ffb24d', '#ff9a2e'], purple: ['#a77ee8', '#8d5fd6'], pink: ['#ff9cc6', '#ff7fb4'], red: ['#ff7a5c', '#e8402e'], blue: ['#7cc8ff', '#4a9fe8'], green: ['#9be37a', '#5cc45a'], yellow: ['#ffe680', '#ffcf3a'] }[hue];
    x.fillStyle = H[1]; x.fillRect(-OX, -OY, BW, BH);
    x.fillStyle = H[0]; for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; x.beginPath(); x.moveTo(540, 820); x.arc(540, 820, 2200, a, a + Math.PI / 24); x.closePath(); x.fill(); }
    const g = x.createRadialGradient(540, 820, 50, 540, 820, 700); g.addColorStop(0, 'rgba(255,255,255,0.55)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    return finish(c, 10);
  },
  pinkDots() {
    const [c, x] = canvas(); fill(x, '#ffd3e6', '#ffb3d2');
    x.fillStyle = 'rgba(255,255,255,0.55)'; for (let r = 0; r < 26; r++) for (let k = 0; k < 10; k++) { x.beginPath(); x.arc(-60 + k * 130 + (r % 2) * 65, -120 + r * 90, 14, 0, 7); x.fill(); }
    return finish(c);
  },
  stage() { // pedestal stage: dark curtain, spotlights, floor
    const [c, x] = canvas(); fill(x, '#3b2560', '#24163e');
    x.fillStyle = 'rgba(0,0,0,0.18)'; for (let i = -1; i < 12; i++) x.fillRect(i * 100, -OY, 40, 1400);
    for (const sx of [180, 540, 900]) { const g = x.createLinearGradient(sx, -OY, sx, 1300); g.addColorStop(0, 'rgba(255,240,200,0.35)'); g.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(sx - 30, -OY); x.lineTo(sx + 30, -OY); x.lineTo(sx + 220, 1300); x.lineTo(sx - 220, 1300); x.fill(); }
    x.fillStyle = '#5a3d86'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    x.strokeStyle = 'rgba(255,255,255,0.08)'; x.lineWidth = 4; for (let i = 0; i < 14; i++) { x.beginPath(); x.moveTo(540, 1240); x.lineTo(-600 + i * 170, 2100); x.stroke(); }
    return finish(c);
  },
  beach() {
    const [c, x] = canvas(); fill(x, '#5cc8ff', '#c9f0ff', -OY, 1100); sunDisk(x, 820, 260, 110);
    cloud(x, 160, 380, 1.1); cloud(x, 760, 620, 0.8);
    x.fillStyle = '#2f9fe0'; x.fillRect(-OX, 1000, BW, 400); waves(x, 1030, 'rgba(255,255,255,0.7)', 9);
    x.fillStyle = '#ffe2a3'; x.beginPath(); x.moveTo(-OX, 1360); x.quadraticCurveTo(540, 1290, BW, 1360); x.lineTo(BW, BH); x.lineTo(-OX, BH); x.fill(); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
    x.fillStyle = 'rgba(210,170,100,0.35)'; for (let i = 0; i < 60; i++) { x.beginPath(); x.arc(hash(i) * 1100, 1420 + hash(i + 1) * 600, 5, 0, 7); x.fill(); }
    // palm
    x.lineWidth = 34; x.strokeStyle = OL; x.beginPath(); x.moveTo(-10, 1500); x.quadraticCurveTo(60, 1100, 10, 780); x.stroke(); x.lineWidth = 22; x.strokeStyle = '#9b6a3c'; x.stroke();
    for (const a of [-2.6, -2.0, -1.2, -0.5, 0.2]) { x.save(); x.translate(10, 780); x.rotate(a); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(140, -60, 280, 30); x.quadraticCurveTo(140, 10, 0, 0); fs(x, '#3fb85a', 9); x.restore(); }
    return finish(c);
  },
  deck() { // ship deck
    const [c, x] = canvas(); fill(x, '#7fd0ff', '#e3f6ff', -OY, 1000); cloud(x, 220, 260, 1); cloud(x, 880, 480, 0.9);
    x.fillStyle = '#2f9fe0'; x.fillRect(-OX, 880, BW, 200);
    // sail + mast
    x.lineWidth = 30; x.strokeStyle = OL; x.beginPath(); x.moveTo(800, -OY); x.lineTo(800, 1200); x.stroke(); x.lineWidth = 18; x.strokeStyle = '#8a5a3c'; x.stroke();
    x.beginPath(); x.moveTo(820, 80); x.quadraticCurveTo(1100, 300, 1060, 620); x.lineTo(820, 620); x.closePath(); fs(x, '#fff7e6', 11);
    // rail
    x.fillStyle = '#8a5a3c'; x.fillRect(-OX, 960, BW, 40); x.lineWidth = 9; x.strokeStyle = OL; x.strokeRect(-OX, 960, BW, 40);
    for (let i = -1; i < 12; i++) { rrect(x, i * 110 + 20, 1000, 34, 170, 10); fs(x, '#a26d45', 8); }
    // planks
    x.fillStyle = '#c48a55'; x.fillRect(-OX, 1170, BW, 1100); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1170); x.lineTo(BW, 1170); x.stroke();
    x.strokeStyle = 'rgba(80,40,20,0.45)'; x.lineWidth = 5; for (let i = 0; i < 16; i++) { x.beginPath(); x.moveTo(540, 1170); x.lineTo(-900 + i * 180, 2100); x.stroke(); }
    return finish(c);
  },
  grid() { // dark grid / blueprint
    const [c, x] = canvas(); fill(x, '#1d1840', '#120f2a');
    x.strokeStyle = 'rgba(255,201,49,0.16)'; x.lineWidth = 3; for (let i = -2; i < 20; i++) { x.beginPath(); x.moveTo(i * 70, -OY); x.lineTo(i * 70, BH); x.stroke(); } for (let j = -3; j < 32; j++) { x.beginPath(); x.moveTo(-OX, j * 70); x.lineTo(BW, j * 70); x.stroke(); }
    x.strokeStyle = 'rgba(255,201,49,0.3)'; x.lineWidth = 5; for (let i = -1; i < 6; i++) { x.beginPath(); x.moveTo(i * 280, -OY); x.lineTo(i * 280, BH); x.stroke(); }
    return finish(c, 8);
  },
  navyGrid() {
    const [c, x] = canvas(); fill(x, '#14244a', '#0b1530');
    x.strokeStyle = 'rgba(120,180,255,0.18)'; x.lineWidth = 3; for (let i = -2; i < 20; i++) { x.beginPath(); x.moveTo(i * 90, -OY); x.lineTo(i * 90, BH); x.stroke(); } for (let j = -3; j < 26; j++) { x.beginPath(); x.moveTo(-OX, j * 90); x.lineTo(BW, j * 90); x.stroke(); }
    return finish(c, 8);
  },
  cliff() { // island cliff over the sea
    const [c, x] = canvas(); fill(x, '#66c6ff', '#d6f3ff', -OY, 1000); sunDisk(x, 220, 300, 90); cloud(x, 760, 300, 1.2); cloud(x, 420, 640, 0.7);
    x.fillStyle = '#2a8fd6'; x.fillRect(-OX, 900, BW, 1400); waves(x, 940, 'rgba(255,255,255,0.6)', 10);
    x.beginPath(); x.moveTo(-OX, 1180); x.lineTo(420, 1120); x.lineTo(600, 1200); x.lineTo(700, 1500); x.lineTo(640, BH); x.lineTo(-OX, BH); x.closePath(); fs(x, '#9a7b5a', 11);
    x.beginPath(); x.moveTo(-OX, 1180); x.lineTo(420, 1120); x.lineTo(600, 1200); x.lineTo(560, 1240); x.lineTo(-OX, 1260); x.closePath(); fs(x, '#5cbf4f', 10);
    x.strokeStyle = 'rgba(60,40,20,0.4)'; x.lineWidth = 6; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(100 + i * 90, 1300 + i * 60); x.lineTo(180 + i * 80, 1360 + i * 60); x.stroke(); }
    return finish(c);
  },
  harbor() { // sunset harbor town
    const [c, x] = canvas(); fill(x, '#ff9a6b', '#ffd77a', -OY, 1100); sunDisk(x, 540, 900, 170, '255,236,170');
    const cols = ['#e86a5a', '#f2b04d', '#7d6fd6', '#4fb3a6', '#e8806f', '#c96fb0'];
    for (let i = 0; i < 9; i++) { const hx = -60 + i * 140, hh = 260 + hash(i) * 220, top = 1000 - hh; x.beginPath(); x.rect(hx, top, 130, hh); fs(x, cols[i % 6], 9);
      x.beginPath(); x.moveTo(hx - 12, top); x.lineTo(hx + 65, top - 80); x.lineTo(hx + 142, top); x.closePath(); fs(x, '#8a3d3d', 9);
      x.fillStyle = '#ffe9a8'; for (let k = 0; k < 3; k++) { rrect(x, hx + 22 + (k % 2) * 50, top + 40 + k * 70, 34, 40, 6); x.fill(); } }
    x.fillStyle = '#c7637a'; x.fillRect(-OX, 1000, BW, 1400); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1000); x.lineTo(BW, 1000); x.stroke();
    x.fillStyle = 'rgba(255,230,160,0.6)'; for (let i = 0; i < 8; i++) x.fillRect(440 + Math.sin(i) * 40, 1030 + i * 50, 200 - i * 18, 10);
    x.fillStyle = '#8a5a3c'; x.fillRect(-OX, 1500, BW, 1000); x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1500); x.lineTo(BW, 1500); x.stroke();
    return finish(c);
  },
  darkHalo() { const [c, x] = canvas(); fill(x, '#2a1238', '#120818'); x.fillStyle = 'rgba(255,255,255,0.6)'; for (let i = 0; i < 70; i++) { x.beginPath(); x.arc(hash(i) * 1080, hash(i + 1) * 1920, 2 + hash(i + 2) * 3, 0, 7); x.fill(); } return finish(c, 8); },
  sea() { // open sea
    const [c, x] = canvas(); fill(x, '#4ab8ff', '#bfeaff', -OY, 1100); cloud(x, 200, 520, 1); cloud(x, 860, 330, 1.3);
    x.fillStyle = '#1f7fc4'; x.fillRect(-OX, 1050, BW, 1300); x.lineWidth = 8; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1050); x.lineTo(BW, 1050); x.stroke();
    waves(x, 1080, 'rgba(255,255,255,0.65)', 14, 14); waves(x, 1400, 'rgba(255,255,255,0.5)', 10, 20);
    return finish(c);
  },
  night() { // night-blue backdrop
    const [c, x] = canvas(); fill(x, '#162a5c', '#0a1430');
    for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(255,255,255,${0.4 + hash(i + 3) * 0.6})`; x.beginPath(); x.arc(hash(i) * 1080, hash(i + 1) * 1500, 2 + hash(i + 2) * 4, 0, 7); x.fill(); }
    x.beginPath(); x.arc(860, 260, 90, 0, 7); fs(x, '#fff4c4', 10); x.beginPath(); x.arc(900, 240, 80, 0, 7); x.fillStyle = '#162a5c'; x.fill();
    x.fillStyle = '#0e1d44'; x.beginPath(); x.moveTo(-OX, 1500); x.quadraticCurveTo(300, 1380, 600, 1480); x.quadraticCurveTo(900, 1560, BW, 1440); x.lineTo(BW, BH); x.lineTo(-OX, BH); x.fill();
    return finish(c);
  },
  colosseum() {
    const [c, x] = canvas(); fill(x, '#7fd0ff', '#ffeac2', -OY, 900);
    x.beginPath(); x.rect(-OX, 520, BW, 700); fs(x, '#e0b07a', 10);
    for (let r = 0; r < 2; r++) for (let i = -1; i < 9; i++) { x.beginPath(); const ax = i * 150 + (r ? 75 : 0), ay = 640 + r * 260; x.moveTo(ax, ay + 160); x.lineTo(ax, ay + 50); x.arc(ax + 50, ay + 50, 50, Math.PI, 0); x.lineTo(ax + 100, ay + 160); x.closePath(); fs(x, '#8a5a3c', 8); }
    for (let i = 0; i < 120; i++) { x.fillStyle = ['#ff6f91', '#ffd23f', '#5fe07a', '#4fb3ff', '#b07cff'][i % 5]; x.beginPath(); x.arc(hash(i) * 1080, 540 + hash(i + 1) * 70, 12, 0, 7); x.fill(); }
    for (let i = 0; i < 6; i++) { const fx = 40 + i * 200; x.lineWidth = 6; x.strokeStyle = OL; x.beginPath(); x.moveTo(fx, 520); x.lineTo(fx, 400); x.stroke(); x.beginPath(); x.moveTo(fx, 400); x.lineTo(fx + 70, 425); x.lineTo(fx, 450); fs(x, i % 2 ? '#ff4a3d' : '#ffc931', 6); }
    x.fillStyle = '#f0d39a'; x.fillRect(-OX, 1220, BW, 1200); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1220); x.lineTo(BW, 1220); x.stroke();
    return finish(c);
  },
  underwater() {
    const [c, x] = canvas(); fill(x, '#2aa0dc', '#0a2f6a');
    for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(200,240,255,0.12)'; x.beginPath(); const sx = 80 + i * 200; x.moveTo(sx, -OY); x.lineTo(sx + 90, -OY); x.lineTo(sx - 100, 1700); x.lineTo(sx - 240, 1700); x.fill(); }
    x.fillStyle = '#d9c38a'; x.beginPath(); x.moveTo(-OX, 1720); x.quadraticCurveTo(540, 1640, BW, 1730); x.lineTo(BW, BH); x.lineTo(-OX, BH); x.fill(); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
    for (let i = 0; i < 7; i++) { const sx = 40 + i * 170; x.lineWidth = 22; x.strokeStyle = OL; x.beginPath(); x.moveTo(sx, 1760); x.quadraticCurveTo(sx + 40, 1600, sx - 10, 1450 - hash(i) * 150); x.stroke(); x.lineWidth = 12; x.strokeStyle = '#3fb85a'; x.stroke(); }
    return finish(c);
  },
  pool() {
    const [c, x] = canvas(); fill(x, '#8fd8ff', '#e9f8ff', -OY, 800); cloud(x, 820, 260, 1);
    x.fillStyle = '#f4f1ea'; x.fillRect(-OX, 700, BW, 400);
    x.strokeStyle = 'rgba(0,0,0,0.12)'; x.lineWidth = 3; for (let i = 0; i < 20; i++) { x.beginPath(); x.moveTo(i * 70 - 80, 700); x.lineTo(i * 70 - 80, 1100); x.stroke(); }
    x.beginPath(); x.rect(-OX, 1100, BW, 1300); fs(x, '#3fc4e8', 10);
    x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = 6; for (let i = 0; i < 18; i++) { const wx = hash(i) * 1080, wy = 1150 + hash(i + 1) * 800; x.beginPath(); x.moveTo(wx, wy); x.bezierCurveTo(wx + 30, wy - 20, wx + 60, wy + 20, wx + 90, wy); x.stroke(); }
    for (const lx of [880, 960]) { x.lineWidth = 16; x.strokeStyle = OL; x.beginPath(); x.moveTo(lx, 1260); x.lineTo(lx, 1000); x.quadraticCurveTo(lx, 940, lx - 50, 940); x.stroke(); x.lineWidth = 8; x.strokeStyle = '#d7dee8'; x.stroke(); }
    // deck chair + umbrella
    x.beginPath(); x.moveTo(60, 900); x.lineTo(320, 900); x.lineTo(360, 760); fs(x, '#ff6f91', 0); x.lineWidth = 14; x.strokeStyle = OL; x.stroke(); x.lineWidth = 8; x.strokeStyle = '#ff6f91'; x.stroke();
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(200, 900); x.lineTo(200, 420); x.stroke();
    x.beginPath(); x.moveTo(20, 470); x.quadraticCurveTo(200, 300, 380, 470); x.closePath(); fs(x, '#ffd23f', 10);
    return finish(c);
  },
  snow() { // snowy night outside a log cabin
    const [c, x] = canvas(); fill(x, '#7aa8d8', '#cfe3f5', -OY, 1300);
    x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(-OX, 900); x.quadraticCurveTo(300, 760, 620, 880); x.quadraticCurveTo(900, 980, BW, 860); x.lineTo(BW, BH); x.lineTo(-OX, BH); x.fill(); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
    for (const [tx, ty, s] of [[90, 900, 1], [980, 880, 1.2], [860, 960, 0.8]]) { x.save(); x.translate(tx, ty); x.scale(s, s); for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(-110 + k * 20, -k * 110); x.lineTo(0, -170 - k * 110); x.lineTo(110 - k * 20, -k * 110); x.closePath(); fs(x, '#2f7a5a', 9); x.beginPath(); x.moveTo(-60 + k * 15, -60 - k * 110); x.lineTo(0, -170 - k * 110); x.lineTo(60 - k * 15, -60 - k * 110); x.closePath(); fs(x, '#fff', 0); } x.restore(); }
    // cabin
    x.beginPath(); x.rect(330, 560, 420, 330); fs(x, '#9a6440', 10); x.strokeStyle = 'rgba(60,30,15,0.5)'; x.lineWidth = 5; for (let y = 600; y < 890; y += 40) { x.beginPath(); x.moveTo(330, y); x.lineTo(750, y); x.stroke(); }
    x.beginPath(); x.moveTo(300, 570); x.lineTo(540, 400); x.lineTo(780, 570); x.closePath(); fs(x, '#fff', 10);
    rrect(x, 400, 640, 110, 100, 8); fs(x, '#ffd77a', 8); rrect(x, 580, 640, 110, 100, 8); fs(x, '#ffd77a', 8);
    x.fillStyle = 'rgba(255,255,255,0.8)'; for (let i = 0; i < 80; i++) { x.beginPath(); x.arc(hash(i) * 1080, hash(i + 1) * 1500, 3 + hash(i + 2) * 5, 0, 7); x.fill(); }
    return finish(c);
  },
  plain() { // soft lavender close-up backdrop
    const [c, x] = canvas(); const g = x.createRadialGradient(540, 900, 100, 540, 900, 1300); g.addColorStop(0, '#d9ccff'); g.addColorStop(1, '#9f8ae0'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    x.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 40; i++) { x.beginPath(); x.arc(hash(i) * 1080, hash(i + 1) * 1920, 4 + hash(i + 2) * 8, 0, 7); x.fill(); }
    return finish(c);
  },

  // ======================= sets added for the Gum-Gum short =======================
  halftone() { // comic-book yellow with halftone dots and a burst
    const [c, x] = canvas(); fill(x, '#ffe066', '#ffc93a');
    for (let r = 0; r < 32; r++) for (let k = 0; k < 18; k++) { const px = -60 + k * 70 + (r % 2) * 35, py = -120 + r * 70, d = Math.hypot(px - 540, py - 900) / 1100; x.beginPath(); x.arc(px, py, 6 + 16 * d, 0, 7); x.fillStyle = 'rgba(255,140,40,0.35)'; x.fill(); }
    x.beginPath(); for (let i = 0; i < 28; i++) { const a = i / 28 * Math.PI * 2, r = i % 2 ? 360 : 520; x.lineTo(540 + Math.cos(a) * r, 900 + Math.sin(a) * r * 1.2); } x.closePath(); x.fillStyle = 'rgba(255,255,255,0.55)'; x.fill();
    return finish(c, 8);
  },
  swirl() { // violet candy swirl for the fruit reveal
    const [c, x] = canvas(); x.fillStyle = '#c9a8ff'; x.fillRect(-OX, -OY, BW, BH);
    for (let i = 0; i < 16; i++) { x.beginPath(); x.moveTo(540, 880); for (let a = 0; a < 7; a += 0.05) { const r = a * 160; x.lineTo(540 + Math.cos(a + i * Math.PI / 8) * r, 880 + Math.sin(a + i * Math.PI / 8) * r); }
      x.lineWidth = 46; x.strokeStyle = i % 2 ? 'rgba(255,255,255,0.35)' : 'rgba(140,90,230,0.35)'; x.stroke(); }
    return finish(c, 10);
  },
  townStreet() { // sunny desert-town street
    const [c, x] = canvas(); fill(x, '#7fd0ff', '#ffe9c2', -OY, 1000); sunDisk(x, 860, 220, 90); cloud(x, 200, 300, 0.9);
    const cols = ['#e8a35a', '#d98c4a', '#f2c27a', '#c9784a'];
    for (let i = 0; i < 5; i++) { const hx = -80 + i * 260, top = 520 + (i % 2) * 90; x.beginPath(); x.rect(hx, top, 250, 760 - (i % 2) * 90); fs(x, cols[i % 4], 10);
      rrect(x, hx + 40, top + 90, 70, 90, 8); fs(x, '#5b3a24', 8); rrect(x, hx + 140, top + 90, 70, 90, 8); fs(x, '#5b3a24', 8); x.beginPath(); x.rect(hx + 80, top + 300, 90, 160); fs(x, '#7a4a2a', 8);
      x.beginPath(); x.rect(hx - 10, top - 30, 270, 34); fs(x, '#8a5a3c', 8); }
    x.fillStyle = '#f0cf8f'; x.fillRect(-OX, 1280, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1280); x.lineTo(BW, 1280); x.stroke();
    x.fillStyle = 'rgba(160,110,60,0.3)'; for (let i = 0; i < 40; i++) { x.beginPath(); x.ellipse(hash(i) * 1080, 1320 + hash(i + 1) * 600, 30, 6, 0, 0, 7); x.fill(); }
    return finish(c);
  },
  storm() { // storm clouds over a hilltop
    const [c, x] = canvas(); fill(x, '#3a4466', '#6c7aa3', -OY, 1400);
    for (let i = 0; i < 7; i++) { x.save(); x.globalAlpha = 0.85; cloud(x, hash(i) * 1100, 120 + hash(i + 1) * 380, 1.6 + hash(i + 2)); x.restore(); }
    x.fillStyle = 'rgba(40,46,80,0.55)'; for (let i = 0; i < 7; i++) { x.beginPath(); x.ellipse(hash(i + 5) * 1100, 200 + hash(i + 6) * 300, 220, 80, 0, 0, 7); x.fill(); }
    x.strokeStyle = 'rgba(200,220,255,0.25)'; x.lineWidth = 3; for (let i = 0; i < 70; i++) { const rx = hash(i + 9) * 1100, ry = hash(i + 10) * 1500; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 20, ry + 60); x.stroke(); }
    x.beginPath(); x.moveTo(-OX, 1500); x.quadraticCurveTo(540, 1300, BW, 1500); x.lineTo(BW, BH); x.lineTo(-OX, BH); fs(x, '#3f6b45', 11);
    return finish(c);
  },
  arcade() { // neon level-select stage for the gears
    const [c, x] = canvas(); fill(x, '#141033', '#2a1450');
    x.strokeStyle = 'rgba(80,220,255,0.35)'; x.lineWidth = 4; for (let i = 0; i < 22; i++) { x.beginPath(); x.moveTo(540, 1180); x.lineTo(-1200 + i * 160, 2100); x.stroke(); } for (let j = 0; j < 10; j++) { const y = 1180 + j * j * 10; x.beginPath(); x.moveTo(-OX, y); x.lineTo(BW, y); x.stroke(); }
    x.fillStyle = 'rgba(255,90,200,0.18)'; x.fillRect(-OX, 1150, BW, 30);
    for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(${hash(i) > 0.5 ? '255,120,220' : '120,230,255'},0.8)`; x.beginPath(); x.arc(hash(i + 3) * 1080, hash(i + 4) * 1000, 2 + hash(i + 5) * 4, 0, 7); x.fill(); }
    return finish(c, 8);
  },
  bamboo() { // bright bamboo grove
    const [c, x] = canvas(); fill(x, '#cdf5c9', '#8fd88a');
    for (let i = 0; i < 14; i++) { const bx = -60 + i * 90 + hash(i) * 30, w = 34 + hash(i + 1) * 18; x.fillStyle = i % 3 ? '#5cbf4f' : '#4aa83f'; x.fillRect(bx, -OY, w, 1500); x.lineWidth = 6; x.strokeStyle = 'rgba(30,70,30,0.55)';
      for (let y = 0; y < 1400; y += 170 + hash(i + 2) * 60) { x.beginPath(); x.moveTo(bx, y); x.lineTo(bx + w, y); x.stroke(); } }
    x.fillStyle = '#9ad08a'; x.fillRect(-OX, 1360, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1360); x.lineTo(BW, 1360); x.stroke();
    return finish(c);
  },
  rooftops() { // tiled rooftops under a bright sky
    const [c, x] = canvas(); fill(x, '#66c6ff', '#d6f3ff', -OY, 1000); cloud(x, 820, 300, 1.1); cloud(x, 200, 520, 0.8);
    for (let i = 0; i < 4; i++) { const rx = -100 + i * 330, top = 900 + (i % 2) * 120; x.beginPath(); x.moveTo(rx, 1500); x.lineTo(rx, top); x.lineTo(rx + 170, top - 140); x.lineTo(rx + 340, top); x.lineTo(rx + 340, 1500); fs(x, i % 2 ? '#d9534f' : '#c0392b', 10);
      x.strokeStyle = 'rgba(0,0,0,0.25)'; x.lineWidth = 5; for (let k = 1; k < 7; k++) { x.beginPath(); x.moveTo(rx, top + k * 80); x.lineTo(rx + 340, top + k * 80); x.stroke(); } }
    x.fillStyle = '#b5462f'; x.fillRect(-OX, 1500, BW, 800); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1500); x.lineTo(BW, 1500); x.stroke();
    return finish(c);
  },
  blueprint() { // blueprint grid with white chalk lines
    const [c, x] = canvas(); fill(x, '#1f5fae', '#164a8c');
    x.strokeStyle = 'rgba(255,255,255,0.18)'; x.lineWidth = 3; for (let i = -2; i < 20; i++) { x.beginPath(); x.moveTo(i * 60, -OY); x.lineTo(i * 60, BH); x.stroke(); } for (let j = -3; j < 36; j++) { x.beginPath(); x.moveTo(-OX, j * 60); x.lineTo(BW, j * 60); x.stroke(); }
    x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 6; x.strokeRect(40, 160, 1000, 1600);
    return finish(c, 8);
  },
  mountain() { // snowy mountain valley
    const [c, x] = canvas(); fill(x, '#8fd3ff', '#e8f7ff', -OY, 1100); cloud(x, 220, 260, 1.2);
    for (const [mx, mh, col] of [[150, 700, '#8a9cc0'], [600, 900, '#7488b3'], [1000, 650, '#8a9cc0']]) { x.beginPath(); x.moveTo(mx - 450, 1300); x.lineTo(mx, 1300 - mh); x.lineTo(mx + 450, 1300); fs(x, col, 10); x.beginPath(); x.moveTo(mx - 110, 1300 - mh + 170); x.lineTo(mx, 1300 - mh); x.lineTo(mx + 110, 1300 - mh + 170); x.lineTo(mx + 40, 1300 - mh + 130); x.lineTo(mx - 30, 1300 - mh + 170); fs(x, '#fff', 0); }
    x.fillStyle = '#7cc46a'; x.fillRect(-OX, 1300, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1300); x.lineTo(BW, 1300); x.stroke();
    return finish(c);
  },
  ring() { // boxing ring under spotlights
    const [c, x] = canvas(); fill(x, '#1e1a2e', '#2e2440');
    for (const sx of [200, 880]) { const g = x.createLinearGradient(sx, -OY, sx, 1400); g.addColorStop(0, 'rgba(255,250,210,0.4)'); g.addColorStop(1, 'rgba(255,250,210,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(sx - 40, -OY); x.lineTo(sx + 40, -OY); x.lineTo(sx + 300, 1400); x.lineTo(sx - 300, 1400); x.fill(); }
    x.fillStyle = 'rgba(255,255,255,0.12)'; for (let i = 0; i < 90; i++) { x.beginPath(); x.arc(hash(i) * 1080, 700 + hash(i + 1) * 300, 10, 0, 7); x.fill(); }
    x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.lineTo(BW, BH); x.lineTo(-OX, BH); fs(x, '#3c78d8', 11);
    for (const [y, col] of [[1000, '#ff4a3d'], [1080, '#ffffff'], [1160, '#4fb3ff']]) { x.beginPath(); x.moveTo(-OX, y); x.lineTo(BW, y); x.lineWidth = 22; x.strokeStyle = OL; x.stroke(); x.lineWidth = 12; x.strokeStyle = col; x.stroke(); }
    for (const px of [60, 1020]) { rrect(x, px - 26, 940, 52, 330, 14); fs(x, '#ffc931', 10); }
    return finish(c);
  },
  fortress() { // grey stone fortress wall
    const [c, x] = canvas(); fill(x, '#a9d8ff', '#e9f6ff', -OY, 800);
    x.fillStyle = '#9aa0ad'; x.fillRect(-OX, 600, BW, 1700);
    x.strokeStyle = 'rgba(40,40,60,0.35)'; x.lineWidth = 6; for (let r = 0, y = 600; y < BH; r++, y += 110) { x.beginPath(); x.moveTo(-OX, y); x.lineTo(BW, y); x.stroke(); for (let bx = -OX + (r % 2) * 110; bx < BW; bx += 220) { x.beginPath(); x.moveTo(bx, y); x.lineTo(bx, y + 110); x.stroke(); } }
    for (let i = -1; i < 12; i++) { x.beginPath(); x.rect(i * 120, 520, 70, 90); fs(x, '#9aa0ad', 9); }
    x.beginPath(); x.moveTo(-OX, 600); x.lineTo(BW, 600); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
    x.beginPath(); x.moveTo(540, 300); x.lineTo(540, 520); x.lineWidth = 8; x.stroke(); x.beginPath(); x.moveTo(540, 300); x.lineTo(660, 330); x.lineTo(540, 360); fs(x, '#4fb3ff', 7);
    return finish(c);
  },
  cartoon() { // white-and-gold toon world for Gear 5
    const [c, x] = canvas(); fill(x, '#fffbe8', '#fff1c2');
    x.lineWidth = 9; x.strokeStyle = 'rgba(255,190,60,0.5)'; for (let i = 0; i < 9; i++) { x.beginPath(); for (let k = 0; k <= 30; k++) { const px = -60 + k * 40; x.lineTo(px, 200 + i * 200 + Math.sin(k * 0.6 + i) * 40); } x.stroke(); }
    for (let i = 0; i < 10; i++) { x.save(); x.globalAlpha = 0.9; cloud(x, hash(i) * 1080, hash(i + 1) * 1700, 0.6 + hash(i + 2) * 0.6); x.restore(); }
    return finish(c, 8);
  },
  clouds() { // high above the clouds
    const [c, x] = canvas(); fill(x, '#5fb4ff', '#c8ecff', -OY, 1500);
    for (let i = 0; i < 12; i++) cloud(x, hash(i + 20) * 1100, 1100 + hash(i + 21) * 900, 1.4 + hash(i + 22) * 1.2);
    for (let i = 0; i < 4; i++) cloud(x, hash(i + 30) * 1080, 200 + hash(i + 31) * 500, 0.8);
    return finish(c);
  },
  archive() { // dark records room, shelves of scrolls
    const [c, x] = canvas(); fill(x, '#2b2236', '#17121e');
    for (let r = 0; r < 6; r++) { const y = 100 + r * 260; x.fillStyle = '#4a3428'; x.fillRect(-OX, y + 200, BW, 30);
      for (let k = 0; k < 16; k++) { x.save(); x.translate(-40 + k * 75, y + 200); x.beginPath(); x.ellipse(0, -60, 26, 60, 0, 0, 7); x.fillStyle = ['#e8d9b0', '#d9c38a', '#c9b07a'][k % 3]; x.globalAlpha = 0.55; x.fill(); x.restore(); } }
    const g = x.createRadialGradient(540, 900, 50, 540, 900, 900); g.addColorStop(0, 'rgba(255,220,150,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0.5)'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    return finish(c);
  },
  sunburst() { // white-gold sun-god burst
    const [c, x] = canvas(); fill(x, '#fff3c4', '#ffd56b');
    x.fillStyle = 'rgba(255,255,255,0.6)'; for (let i = 0; i < 36; i++) { const a = i / 36 * Math.PI * 2; x.beginPath(); x.moveTo(540, 820); x.arc(540, 820, 2400, a, a + Math.PI / 36); x.closePath(); x.fill(); }
    const g = x.createRadialGradient(540, 820, 30, 540, 820, 700); g.addColorStop(0, 'rgba(255,255,255,0.95)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    return finish(c, 10);
  },
  nightSea() { // stormy night sea
    const [c, x] = canvas(); fill(x, '#101a3a', '#24305e', -OY, 1100);
    for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(255,255,255,${0.3 + hash(i) * 0.6})`; x.beginPath(); x.arc(hash(i + 1) * 1080, hash(i + 2) * 800, 2 + hash(i + 3) * 3, 0, 7); x.fill(); }
    x.beginPath(); x.arc(200, 300, 80, 0, 7); fs(x, '#fff4c4', 10);
    x.fillStyle = '#1a3a6e'; x.fillRect(-OX, 1050, BW, 1300); x.lineWidth = 8; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1050); x.lineTo(BW, 1050); x.stroke();
    waves(x, 1090, 'rgba(180,210,255,0.45)', 16, 18);
    return finish(c);
  },
  tavern() { // cosy village bar interior
    const [c, x] = canvas(); fill(x, '#c98a52', '#a86d3c');
    x.strokeStyle = 'rgba(80,40,20,0.35)'; x.lineWidth = 6; for (let i = -1; i < 14; i++) { x.beginPath(); x.moveTo(i * 90, -OY); x.lineTo(i * 90, 1300); x.stroke(); }
    for (const wx of [140, 700]) { rrect(x, wx, 260, 240, 300, 20); fs(x, '#ffe9a8', 12); x.lineWidth = 9; x.strokeStyle = OL; x.beginPath(); x.moveTo(wx + 120, 260); x.lineTo(wx + 120, 560); x.moveTo(wx, 410); x.lineTo(wx + 240, 410); x.stroke(); }
    for (let i = 0; i < 6; i++) { rrect(x, 80 + i * 160, 700, 60, 110, 12); fs(x, ['#4fb3a6', '#e8806f', '#7d6fd6'][i % 3], 8); } x.fillStyle = '#6d4425'; x.fillRect(-OX, 810, BW, 26);
    x.beginPath(); x.rect(-OX, 1300, BW, 1000); fs(x, '#7a4a2a', 10);
    return finish(c);
  },
  bedroom() { // morning bedroom
    const [c, x] = canvas(); fill(x, '#ffd9e6', '#ffc2d6');
    rrect(x, 640, 220, 330, 380, 20); fs(x, '#bfe8ff', 12); x.lineWidth = 9; x.strokeStyle = OL; x.beginPath(); x.moveTo(805, 220); x.lineTo(805, 600); x.moveTo(640, 410); x.lineTo(970, 410); x.stroke();
    sunDisk(x, 880, 310, 40);
    x.beginPath(); x.rect(-OX, 1240, BW, 1000); fs(x, '#c99b6d', 10);
    rrect(x, 120, 300, 60, 60, 30); fs(x, '#ffffff', 8); x.beginPath(); x.moveTo(150, 330); x.lineTo(150, 310); x.moveTo(150, 330); x.lineTo(166, 336); x.lineWidth = 5; x.stroke();
    return finish(c);
  },

  // ======================= sets added for the Tremor-Tremor short =======================
  zigzag() { // lime vibration zigzags
    const [c, x] = canvas(); fill(x, '#d9f99a', '#b6ec6a');
    for (let r = 0; r < 26; r++) { x.beginPath(); for (let k = 0; k <= 26; k++) x.lineTo(-80 + k * 50, -120 + r * 90 + (k % 2 ? 26 : -26)); x.lineWidth = 12; x.strokeStyle = r % 2 ? 'rgba(255,255,255,0.45)' : 'rgba(90,170,40,0.35)'; x.stroke(); }
    return finish(c, 8);
  },
  crackSky() { // pale sky with glassy cracks
    const [c, x] = canvas(); fill(x, '#dff1ff', '#b3dcff');
    x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineWidth = 6;
    for (let i = 0; i < 14; i++) { let px = 540, py = 860, a = i / 14 * Math.PI * 2; x.beginPath(); x.moveTo(px, py); for (let k = 0; k < 7; k++) { a += (hash(i * 9 + k) - 0.5) * 0.6; px += Math.cos(a) * 140; py += Math.sin(a) * 140; x.lineTo(px, py); } x.stroke(); }
    x.strokeStyle = 'rgba(120,170,220,0.5)'; x.lineWidth = 4; for (let r = 1; r < 5; r++) { x.beginPath(); for (let i = 0; i <= 14; i++) { const a = i / 14 * Math.PI * 2; x.lineTo(540 + Math.cos(a) * r * 190 * (0.9 + hash(i + r) * 0.2), 860 + Math.sin(a) * r * 190 * (0.9 + hash(i + r) * 0.2)); } x.stroke(); }
    return finish(c, 8);
  },
  market() { // fruit market street
    const [c, x] = canvas(); fill(x, '#8fd8ff', '#fff1d6', -OY, 900); cloud(x, 820, 260, 1);
    for (let i = 0; i < 3; i++) { const sx = -40 + i * 380; x.beginPath(); x.rect(sx, 760, 340, 420); fs(x, '#c9935f', 10);
      for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(sx + k * 68, 700); x.lineTo(sx + k * 68 + 68, 700); x.lineTo(sx + k * 68 + 68, 790); x.quadraticCurveTo(sx + k * 68 + 34, 830, sx + k * 68, 790); x.closePath(); fs(x, k % 2 ? '#ffffff' : ['#e8402e', '#3c78d8', '#3fb85a'][i], 7); }
      for (let k = 0; k < 6; k++) { x.beginPath(); x.arc(sx + 50 + k * 50, 900, 26, 0, 7); fs(x, ['#ff9a2e', '#e8402e', '#ffd23f', '#9be37a'][(k + i) % 4], 6); } }
    x.fillStyle = '#d9c3a0'; x.fillRect(-OX, 1180, BW, 1200); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1180); x.lineTo(BW, 1180); x.stroke();
    x.strokeStyle = 'rgba(120,90,60,0.3)'; x.lineWidth = 5; for (let r = 0; r < 10; r++) for (let k = 0; k < 12; k++) x.strokeRect(-60 + k * 110 + (r % 2) * 55, 1200 + r * 80, 110, 80);
    return finish(c);
  },
  quarry() { // rocky quarry arena for the forms stage
    const [c, x] = canvas(); fill(x, '#ffcf8a', '#f2a65a', -OY, 900);
    for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(-OX, 700 + i * 110); for (let k = 0; k <= 12; k++) x.lineTo(-OX + k * 120, 680 + i * 110 + (hash(i * 7 + k) - 0.5) * 80); x.lineTo(BW, BH); x.lineTo(-OX, BH); fs(x, ['#c98a52', '#b5773f', '#a26a38', '#8f5d31', '#7c512b'][i], 9); }
    x.fillStyle = '#6b4630'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  meadow() { // bright flower meadow
    const [c, x] = canvas(); fill(x, '#6fd0ff', '#e3f7ff', -OY, 1000); sunDisk(x, 220, 260, 90); cloud(x, 820, 380, 1.1);
    x.beginPath(); x.moveTo(-OX, 1100); x.quadraticCurveTo(540, 980, BW, 1100); x.lineTo(BW, BH); x.lineTo(-OX, BH); fs(x, '#7fd36a', 11);
    for (let i = 0; i < 60; i++) { const fx = hash(i) * 1080, fy = 1120 + hash(i + 1) * 800; x.fillStyle = ['#ffffff', '#ffd23f', '#ff7eb3'][i % 3]; for (let k = 0; k < 5; k++) { x.beginPath(); x.arc(fx + Math.cos(k * 1.26) * 12, fy + Math.sin(k * 1.26) * 12, 9, 0, 7); x.fill(); } x.fillStyle = '#ff9a2e'; x.beginPath(); x.arc(fx, fy, 7, 0, 7); x.fill(); }
    return finish(c);
  },
  dojo() { // wooden dojo with paper walls
    const [c, x] = canvas(); fill(x, '#f6ead2', '#eadbb8');
    for (let i = -1; i < 7; i++) { x.fillStyle = '#7a4a2a'; x.fillRect(i * 200 - 15, -OY, 30, 1400); }
    x.strokeStyle = 'rgba(122,74,42,0.6)'; x.lineWidth = 6; for (let j = 0; j < 9; j++) { x.beginPath(); x.moveTo(-OX, j * 150); x.lineTo(BW, j * 150); x.stroke(); }
    x.fillStyle = '#c9934f'; x.fillRect(-OX, 1280, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1280); x.lineTo(BW, 1280); x.stroke();
    x.strokeStyle = 'rgba(90,50,20,0.35)'; x.lineWidth = 5; for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(540, 1280); x.lineTo(-900 + i * 230, 2100); x.stroke(); }
    return finish(c);
  },
  seismo() { // seismograph paper: grid + a long trace
    const [c, x] = canvas(); fill(x, '#fffaf0', '#f4ead2');
    x.strokeStyle = 'rgba(232,64,46,0.18)'; x.lineWidth = 2; for (let i = -2; i < 26; i++) { x.beginPath(); x.moveTo(i * 50, -OY); x.lineTo(i * 50, BH); x.stroke(); } for (let j = -3; j < 44; j++) { x.beginPath(); x.moveTo(-OX, j * 50); x.lineTo(BW, j * 50); x.stroke(); }
    for (const yy of [300, 1500]) { x.beginPath(); for (let k = 0; k <= 120; k++) { const px = -60 + k * 10, a = (k > 50 && k < 80 ? 120 : 14) * (hash(k + yy) - 0.5) * 2; x.lineTo(px, yy + a); } x.lineWidth = 5; x.strokeStyle = '#1b1530'; x.stroke(); }
    return finish(c, 6);
  },
  canyon() { // red rock canyon floor
    const [c, x] = canvas(); fill(x, '#ffb27a', '#ffe1b8', -OY, 900); sunDisk(x, 840, 240, 80, '255,240,200');
    for (const [mx, w, h] of [[120, 300, 520], [520, 360, 420], [950, 320, 560]]) { x.beginPath(); x.moveTo(mx - w / 2, 1150); x.lineTo(mx - w / 2 + 40, 1150 - h); x.lineTo(mx + w / 2 - 40, 1150 - h); x.lineTo(mx + w / 2, 1150); fs(x, '#c9653f', 10); x.fillStyle = 'rgba(120,40,20,0.3)'; for (let k = 1; k < 4; k++) x.fillRect(mx - w / 2 + 20, 1150 - h + k * h / 4, w - 40, 12); }
    x.fillStyle = '#d98a55'; x.fillRect(-OX, 1150, BW, 1200); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(BW, 1150); x.stroke();
    return finish(c);
  },
  lighthouse() { // rocky coast with a lighthouse
    const [c, x] = canvas(); fill(x, '#7ac6ff', '#d9f0ff', -OY, 1000); cloud(x, 300, 300, 1);
    x.fillStyle = '#2a8fd6'; x.fillRect(-OX, 900, BW, 1500); waves(x, 940, 'rgba(255,255,255,0.6)', 12);
    x.beginPath(); x.moveTo(600, 1500); x.lineTo(700, 1050); x.lineTo(1000, 1000); x.lineTo(BW, 1100); x.lineTo(BW, BH); x.lineTo(600, BH); fs(x, '#8a7a6a', 11);
    x.beginPath(); x.moveTo(800, 1030); x.lineTo(830, 640); x.lineTo(930, 640); x.lineTo(960, 1030); fs(x, '#ffffff', 10); x.fillStyle = '#e8402e'; x.fillRect(822, 760, 118, 60); x.fillRect(812, 900, 138, 60);
    x.beginPath(); x.rect(830, 560, 100, 80); fs(x, '#ffe14d', 10); x.beginPath(); x.moveTo(815, 560); x.lineTo(880, 500); x.lineTo(945, 560); fs(x, '#e8402e', 10);
    return finish(c);
  },
  docks() { // wooden docks over the water
    const [c, x] = canvas(); fill(x, '#89d0ff', '#e6f6ff', -OY, 900); cloud(x, 820, 300, 1.1);
    x.fillStyle = '#2f9fe0'; x.fillRect(-OX, 860, BW, 1500); waves(x, 900, 'rgba(255,255,255,0.6)', 10);
    for (let i = 0; i < 9; i++) { x.beginPath(); x.rect(-60 + i * 140, 1120, 40, 420); fs(x, '#6b4630', 8); }
    x.beginPath(); x.rect(-OX, 1250, BW, 260); fs(x, '#b5824f', 11); x.strokeStyle = 'rgba(80,40,20,0.5)'; x.lineWidth = 5; for (let k = 0; k < 20; k++) { x.beginPath(); x.moveTo(-60 + k * 70, 1250); x.lineTo(-60 + k * 70, 1510); x.stroke(); }
    return finish(c);
  },
  oceanWide() { // wide horizon of open sea
    const [c, x] = canvas(); fill(x, '#3fa0ff', '#b8e6ff', -OY, 1000); for (let i = 0; i < 5; i++) cloud(x, hash(i + 40) * 1080, 200 + hash(i + 41) * 500, 0.7 + hash(i + 42));
    x.fillStyle = '#1f6fbf'; x.fillRect(-OX - 400, 1000, BW + 800, 1500); x.lineWidth = 8; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1000); x.lineTo(BW, 1000); x.stroke();
    waves(x, 1040, 'rgba(255,255,255,0.6)', 18, 16); waves(x, 1400, 'rgba(255,255,255,0.5)', 12, 22);
    return finish(c);
  },
  alarm() { // red warning stripes
    const [c, x] = canvas(); fill(x, '#2a0f14', '#120509');
    x.save(); x.translate(540, 960); x.rotate(-0.5); for (let i = -20; i < 20; i++) { x.fillStyle = i % 2 ? '#ffd23f' : '#1b1530'; x.fillRect(i * 90, -1600, 90, 3200); } x.restore();
    x.fillStyle = 'rgba(200,20,30,0.55)'; x.fillRect(-OX, -OY, BW, BH);
    const g = x.createRadialGradient(540, 900, 100, 540, 900, 1000); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.7)'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    return finish(c, 8);
  },
  space() { // deep space
    const [c, x] = canvas(); fill(x, '#0b0b24', '#1a1240');
    for (let i = 0; i < 160; i++) { x.fillStyle = `rgba(255,255,255,${0.3 + hash(i) * 0.7})`; x.beginPath(); x.arc(hash(i + 1) * 1080, hash(i + 2) * 1920, 1.5 + hash(i + 3) * 3, 0, 7); x.fill(); }
    const g = x.createRadialGradient(800, 400, 10, 800, 400, 500); g.addColorStop(0, 'rgba(180,90,255,0.35)'); g.addColorStop(1, 'rgba(180,90,255,0)'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    return finish(c, 6);
  },
  plaza() { // stone war plaza with flags
    const [c, x] = canvas(); fill(x, '#ffcf9a', '#ffe9cf', -OY, 900);
    x.beginPath(); x.rect(-OX, 560, BW, 560); fs(x, '#d9cbb3', 10); for (let i = 0; i < 8; i++) { x.beginPath(); x.rect(-40 + i * 150, 620, 80, 500); fs(x, '#efe4d0', 8); }
    for (const fx of [140, 940]) { x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(fx, 560); x.lineTo(fx, 300); x.stroke(); x.beginPath(); x.moveTo(fx, 300); x.lineTo(fx + 140, 330); x.lineTo(fx, 380); fs(x, '#3c78d8', 8); }
    x.fillStyle = '#b7a68c'; x.fillRect(-OX, 1120, BW, 1200); x.strokeStyle = 'rgba(80,60,40,0.3)'; x.lineWidth = 5; for (let r = 0; r < 12; r++) for (let k = 0; k < 10; k++) x.strokeRect(-60 + k * 140 + (r % 2) * 70, 1130 + r * 90, 140, 90);
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1120); x.lineTo(BW, 1120); x.stroke();
    return finish(c);
  },
  smoke() { // dark smoky backdrop
    const [c, x] = canvas(); fill(x, '#2b2533', '#141018');
    for (let i = 0; i < 26; i++) { x.fillStyle = `rgba(${90 + hash(i) * 40},${80 + hash(i) * 30},${100 + hash(i) * 40},0.35)`; x.beginPath(); x.arc(hash(i + 1) * 1080, hash(i + 2) * 1920, 120 + hash(i + 3) * 220, 0, 7); x.fill(); }
    return finish(c, 12);
  },
  spa() { // calm spa with plants
    const [c, x] = canvas(); fill(x, '#d7f5ee', '#b7e8dc');
    for (let i = -1; i < 12; i++) { x.fillStyle = i % 2 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)'; x.fillRect(i * 100, -OY, 100, 1400); }
    for (const px of [80, 1000]) { x.beginPath(); x.rect(px - 60, 1060, 120, 180); fs(x, '#c9935f', 9); for (let k = 0; k < 6; k++) { x.save(); x.translate(px, 1060); x.rotate(-1.2 + k * 0.48); x.beginPath(); x.ellipse(0, -110, 30, 110, 0, 0, 7); A_leaf(x); x.restore(); } }
    x.fillStyle = '#efe4d0'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },

  // ======================= sets added for the Op-Op short =======================
  hearts() { // soft pink with little hearts
    const [c, x] = canvas(); fill(x, '#ffd6e2', '#ffb8cf');
    for (let r = 0; r < 24; r++) for (let k = 0; k < 9; k++) { const hx = -40 + k * 140 + (r % 2) * 70, hy = -100 + r * 95; x.save(); x.translate(hx, hy); x.scale(1.4, 1.4); x.beginPath(); x.moveTo(0, 14); x.bezierCurveTo(-26, -2, -12, -22, 0, -8); x.bezierCurveTo(12, -22, 26, -2, 0, 14); x.fillStyle = 'rgba(255,255,255,0.55)'; x.fill(); x.restore(); }
    return finish(c, 8);
  },
  ecg() { // dark monitor with a green heartbeat line
    const [c, x] = canvas(); fill(x, '#0f2a24', '#081812');
    x.strokeStyle = 'rgba(80,255,170,0.12)'; x.lineWidth = 2; for (let i = -2; i < 26; i++) { x.beginPath(); x.moveTo(i * 50, -OY); x.lineTo(i * 50, BH); x.stroke(); } for (let j = -3; j < 44; j++) { x.beginPath(); x.moveTo(-OX, j * 50); x.lineTo(BW, j * 50); x.stroke(); }
    for (const yy of [320, 1560]) { x.beginPath(); x.moveTo(-OX, yy); for (let k = 0; k < 6; k++) { const bx = -40 + k * 220; x.lineTo(bx, yy); x.lineTo(bx + 30, yy - 20); x.lineTo(bx + 50, yy + 10); x.lineTo(bx + 70, yy - 120); x.lineTo(bx + 90, yy + 60); x.lineTo(bx + 110, yy); } x.lineTo(BW, yy); x.lineWidth = 7; x.strokeStyle = '#4dffa0'; x.stroke(); }
    return finish(c, 6);
  },
  surgery() { // operating room: green tiles, big round lamp
    const [c, x] = canvas(); fill(x, '#cfe9df', '#a9d6c6');
    x.strokeStyle = 'rgba(255,255,255,0.5)'; x.lineWidth = 4; for (let i = -2; i < 14; i++) { x.beginPath(); x.moveTo(i * 100, -OY); x.lineTo(i * 100, BH); x.stroke(); } for (let j = -2; j < 24; j++) { x.beginPath(); x.moveTo(-OX, j * 100); x.lineTo(BW, j * 100); x.stroke(); }
    x.lineWidth = 12; x.strokeStyle = OL; x.beginPath(); x.moveTo(540, -OY); x.lineTo(540, 160); x.stroke();
    x.beginPath(); x.ellipse(540, 220, 240, 90, 0, 0, 7); fs(x, '#e6edf2', 12); for (const [lx, ly] of [[460, 220], [540, 240], [620, 220], [540, 195]]) { x.beginPath(); x.arc(lx, ly, 30, 0, 7); fs(x, '#fffbe0', 7); }
    const g = x.createLinearGradient(540, 260, 540, 1300); g.addColorStop(0, 'rgba(255,255,230,0.45)'); g.addColorStop(1, 'rgba(255,255,230,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(330, 260); x.lineTo(750, 260); x.lineTo(1000, 1300); x.lineTo(80, 1300); x.fill();
    x.fillStyle = '#8fbfb0'; x.fillRect(-OX, 1320, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1320); x.lineTo(BW, 1320); x.stroke();
    return finish(c);
  },
  clinic() { // light blue clinic hall for the forms stage
    const [c, x] = canvas(); fill(x, '#dff0ff', '#bcdcf5');
    for (let i = 0; i < 4; i++) { rrect(x, 30 + i * 270, 200, 200, 560, 18); fs(x, '#f4f9ff', 9); x.beginPath(); x.moveTo(130 + i * 270, 320); x.lineTo(130 + i * 270, 440); x.moveTo(70 + i * 270, 380); x.lineTo(190 + i * 270, 380); x.lineWidth = 26; x.strokeStyle = '#e8506f'; x.stroke(); }
    x.fillStyle = '#9fc4e0'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    x.strokeStyle = 'rgba(255,255,255,0.4)'; x.lineWidth = 4; for (let i = 0; i < 14; i++) { x.beginPath(); x.moveTo(540, 1240); x.lineTo(-1000 + i * 170, 2100); x.stroke(); }
    return finish(c);
  },
  forest() { // pine forest path in daylight
    const [c, x] = canvas(); fill(x, '#8fd8ff', '#e6f6ff', -OY, 1100); cloud(x, 820, 280, 1);
    for (let i = 0; i < 9; i++) { const tx = -60 + i * 150, by = 1250 - (i % 2) * 60; x.fillStyle = '#6b4630'; x.fillRect(tx - 14, by - 120, 28, 140); for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(tx - 110 + k * 20, by - 100 - k * 110); x.lineTo(tx, by - 280 - k * 110); x.lineTo(tx + 110 - k * 20, by - 100 - k * 110); x.closePath(); fs(x, i % 2 ? '#2f8a4f' : '#3fa35a', 8); } }
    x.fillStyle = '#7cc46a'; x.fillRect(-OX, 1250, BW, 1000); x.beginPath(); x.moveTo(380, 1250); x.lineTo(700, 1250); x.lineTo(1000, BH); x.lineTo(80, BH); x.fillStyle = '#d9c38a'; x.fill();
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  kitchen() { // ship's galley kitchen
    const [c, x] = canvas(); fill(x, '#ffe9c2', '#ffd79a');
    x.strokeStyle = 'rgba(200,140,60,0.35)'; x.lineWidth = 4; for (let r = 0; r < 14; r++) for (let k = 0; k < 12; k++) x.strokeRect(-60 + k * 100 + (r % 2) * 50, 300 + r * 70, 100, 70);
    for (let i = 0; i < 5; i++) { x.lineWidth = 6; x.strokeStyle = OL; x.beginPath(); x.moveTo(140 + i * 200, 120); x.lineTo(140 + i * 200, 220); x.stroke(); x.beginPath(); x.arc(140 + i * 200, 260, 44, 0, Math.PI); A_pan(x); }
    x.beginPath(); x.rect(-OX, 1180, BW, 160); fs(x, '#b5824f', 11); x.fillStyle = '#8a5a3c'; x.fillRect(-OX, 1340, BW, 1000);
    for (const [bx, col] of [[160, '#e8402e'], [330, '#ffd23f'], [880, '#3fb85a']]) { x.beginPath(); x.arc(bx, 1150, 40, 0, 7); fs(x, col, 8); }
    return finish(c);
  },
  chessboard() { // giant chessboard floor for Shambles
    const [c, x] = canvas(); fill(x, '#2b2240', '#1a1430');
    x.save(); x.translate(540, 1100); for (let r = 0; r < 12; r++) for (let k = -8; k < 8; k++) { const y0 = r * r * 9, y1 = (r + 1) * (r + 1) * 9, s0 = 1 + r * 0.35, s1 = 1 + (r + 1) * 0.35;
      x.beginPath(); x.moveTo(k * 90 * s0, y0); x.lineTo((k + 1) * 90 * s0, y0); x.lineTo((k + 1) * 90 * s1, y1); x.lineTo(k * 90 * s1, y1); x.closePath(); x.fillStyle = (r + k) % 2 ? '#f4efe6' : '#3a3346'; x.fill(); } x.restore();
    return finish(c, 8);
  },
  park() { // city park with benches
    const [c, x] = canvas(); fill(x, '#8fd8ff', '#e6f6ff', -OY, 1000); cloud(x, 220, 260, 1); cloud(x, 860, 420, 0.8);
    for (let i = 0; i < 4; i++) { const tx = 80 + i * 300; x.fillStyle = '#6b4630'; x.fillRect(tx - 16, 700, 32, 420); x.beginPath(); x.arc(tx, 640, 150, 0, 7); fs(x, '#4aa83f', 10); }
    x.fillStyle = '#9ad08a'; x.fillRect(-OX, 1120, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1120); x.lineTo(BW, 1120); x.stroke();
    x.beginPath(); x.rect(600, 1120, 320, 40); fs(x, '#b5824f', 9); x.beginPath(); x.rect(600, 1050, 320, 30); fs(x, '#b5824f', 9);
    return finish(c);
  },
  lab() { // lab with beakers and shelves
    const [c, x] = canvas(); fill(x, '#e9f0ff', '#cdd9f2');
    for (let r = 0; r < 3; r++) { x.fillStyle = '#9aa6c0'; x.fillRect(-OX, 420 + r * 260, BW, 24); for (let k = 0; k < 8; k++) { const bx = 40 + k * 130, by = 420 + r * 260; x.beginPath(); x.moveTo(bx, by); x.lineTo(bx + 20, by - 110); x.lineTo(bx + 60, by - 110); x.lineTo(bx + 80, by); x.closePath(); fs(x, ['#7cc8ff', '#ff8cbc', '#9be37a', '#ffd23f'][(k + r) % 4], 7); } }
    x.fillStyle = '#c3cbe0'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  xray() { // black X-ray lightbox with a blue grid
    const [c, x] = canvas(); fill(x, '#071226', '#030812');
    x.strokeStyle = 'rgba(90,180,255,0.18)'; x.lineWidth = 3; for (let i = -2; i < 20; i++) { x.beginPath(); x.moveTo(i * 70, -OY); x.lineTo(i * 70, BH); x.stroke(); } for (let j = -3; j < 32; j++) { x.beginPath(); x.moveTo(-OX, j * 70); x.lineTo(BW, j * 70); x.stroke(); }
    const g = x.createRadialGradient(540, 900, 50, 540, 900, 800); g.addColorStop(0, 'rgba(90,180,255,0.25)'); g.addColorStop(1, 'rgba(90,180,255,0)'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    return finish(c, 6);
  },
  hourglass() { // dark gold room of clocks
    const [c, x] = canvas(); fill(x, '#2a1d10', '#140c06');
    for (let i = 0; i < 9; i++) { const cx = hash(i) * 1080, cy = 150 + hash(i + 1) * 1500, r = 50 + hash(i + 2) * 70; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.lineWidth = 8; x.strokeStyle = 'rgba(255,200,90,0.35)'; x.stroke(); x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx, cy - r * 0.7); x.moveTo(cx, cy); x.lineTo(cx + r * 0.5, cy); x.stroke(); }
    const g = x.createRadialGradient(540, 900, 50, 540, 900, 900); g.addColorStop(0, 'rgba(255,200,90,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0.5)'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    return finish(c, 8);
  },
  dusk() { // purple-orange dusk sky over a hill
    const [c, x] = canvas(); fill(x, '#5b3a8a', '#ff9a6b', -OY, 1300); sunDisk(x, 540, 1150, 160, '255,200,140');
    x.beginPath(); x.moveTo(-OX, 1300); x.quadraticCurveTo(540, 1160, BW, 1300); x.lineTo(BW, BH); x.lineTo(-OX, BH); fs(x, '#3a2a4a', 11);
    for (let i = 0; i < 30; i++) { x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.arc(hash(i) * 1080, hash(i + 1) * 600, 2 + hash(i + 2) * 3, 0, 7); x.fill(); }
    return finish(c);
  },
  snowNight() { // snowy northern town at night
    const [c, x] = canvas(); fill(x, '#1b2a50', '#3a4f80', -OY, 1200);
    for (let i = 0; i < 6; i++) { const hx = -60 + i * 200, top = 820 + (i % 2) * 80; x.beginPath(); x.rect(hx, top, 180, 500); fs(x, '#5b4a6a', 9); x.beginPath(); x.moveTo(hx - 14, top); x.lineTo(hx + 90, top - 110); x.lineTo(hx + 194, top); fs(x, '#ffffff', 9); rrect(x, hx + 60, top + 90, 60, 70, 6); fs(x, '#ffd77a', 7); }
    x.fillStyle = '#eef4ff'; x.fillRect(-OX, 1300, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1300); x.lineTo(BW, 1300); x.stroke();
    x.fillStyle = 'rgba(255,255,255,0.85)'; for (let i = 0; i < 90; i++) { x.beginPath(); x.arc(hash(i + 7) * 1080, hash(i + 8) * 1300, 3 + hash(i + 9) * 5, 0, 7); x.fill(); }
    return finish(c);
  },
  party() { // party room with a circle of chairs
    const [c, x] = canvas(); fill(x, '#fff0b8', '#ffd98a');
    for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(-40 + i * 100, 120); x.lineTo(10 + i * 100, 200); x.lineTo(60 + i * 100, 120); x.closePath(); fs(x, ['#ff5fa2', '#4fb3ff', '#5fe07a', '#ffc931'][i % 4], 5); }
    x.lineWidth = 5; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 120); x.lineTo(BW, 120); x.stroke();
    x.fillStyle = '#e8a35a'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
};
function A_leaf(x) { fs(x, '#3fb85a', 7); }
function A_pan(x) { fs(x, '#3a3346', 8); }
