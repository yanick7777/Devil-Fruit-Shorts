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
    const [c, x] = canvas(); const H = { orange: ['#ffb24d', '#ff9a2e'], purple: ['#a77ee8', '#8d5fd6'], pink: ['#ff9cc6', '#ff7fb4'], red: ['#ff7a5c', '#e8402e'] }[hue];
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
};
