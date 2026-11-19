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
    const [c, x] = canvas(); const H = { orange: ['#ffb24d', '#ff9a2e'], purple: ['#a77ee8', '#8d5fd6'], pink: ['#ff9cc6', '#ff7fb4'], red: ['#ff7a5c', '#e8402e'], blue: ['#7cc8ff', '#4a9fe8'], green: ['#9be37a', '#5cc45a'], yellow: ['#ffe680', '#ffcf3a'], teal: ['#7fe6d8', '#3fc4b4'], coral: ['#ffb8a8', '#ff8f7a'], lime: ['#d8f27a', '#b5dc3f'], sky: ['#a8e4ff', '#78cdf5'], gold: ['#ffd98a', '#f5b942'], olive: ['#c8d88a', '#9ab24a'], peach: ['#ffd0b0', '#ffae80'], cyan: ['#a0f0ff', '#4fd0e8'], rose: ['#ffb0c8', '#f07898'], amber: ['#ffc870', '#f09a2a'], mint: ['#b8f5d8', '#6fdcae'], indigo: ['#a8b0ff', '#6a74e0'], tan: ['#e8d0a8', '#c8a878'], lavender: ['#e0c8ff', '#b898f0'], navy: ['#8ab0e8', '#4a70b8'] }[hue];
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

  // ======================= sets added for the String-String short =======================
  yarn() { // cosy pink with balls of yarn
    const [c, x] = canvas(); fill(x, '#ffe0ec', '#ffc7da');
    for (let i = 0; i < 9; i++) { const cx = hash(i) * 1080, cy = hash(i + 1) * 1920, r = 60 + hash(i + 2) * 50; x.beginPath(); x.arc(cx, cy, r, 0, 7); fs(x, ['#ff8fb3', '#b07cff', '#7fd6ff'][i % 3], 8); x.lineWidth = 4; x.strokeStyle = 'rgba(255,255,255,0.6)'; for (let k = -2; k <= 2; k++) { x.beginPath(); x.ellipse(cx, cy, r * 0.9, r * 0.3, k * 0.6, 0, 7); x.stroke(); } }
    return finish(c, 10);
  },
  web() { // dark purple with a silver string web
    const [c, x] = canvas(); fill(x, '#2a1d40', '#140c22');
    x.strokeStyle = 'rgba(230,220,255,0.35)'; x.lineWidth = 3;
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; x.beginPath(); x.moveTo(540, 880); x.lineTo(540 + Math.cos(a) * 1600, 880 + Math.sin(a) * 1600); x.stroke(); }
    for (let r = 120; r < 1400; r += 120) { x.beginPath(); for (let i = 0; i <= 16; i++) { const a = i / 16 * Math.PI * 2; x.lineTo(540 + Math.cos(a) * r, 880 + Math.sin(a) * r); } x.stroke(); }
    return finish(c, 6);
  },
  ruins() { // sunlit stone ruins with cleanly sliced columns
    const [c, x] = canvas(); fill(x, '#9ed8ff', '#f4f0e0', -OY, 1000); sunDisk(x, 860, 260, 80);
    for (let i = 0; i < 5; i++) { const px = 60 + i * 230, h = 500 + hash(i) * 300; x.beginPath(); x.rect(px, 1250 - h, 110, h); fs(x, '#e0d6c0', 10);
      const cy = 1250 - h * 0.55; x.beginPath(); x.moveTo(px - 10, cy + 20); x.lineTo(px + 120, cy - 20); x.lineWidth = 8; x.strokeStyle = OL; x.stroke(); }
    x.fillStyle = '#d9c9a0'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  theater() { // puppet theatre stage with red curtains
    const [c, x] = canvas(); fill(x, '#2a1420', '#170a12');
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(540 + sd * 700, -OY); x.lineTo(540 + sd * 360, -OY); x.quadraticCurveTo(540 + sd * 420, 600, 540 + sd * 560, 1250); x.lineTo(540 + sd * 700, 1250); x.closePath(); fs(x, '#b5223a', 10);
      x.strokeStyle = 'rgba(80,10,20,0.45)'; x.lineWidth = 8; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(540 + sd * (400 + k * 60), -OY); x.quadraticCurveTo(540 + sd * (440 + k * 60), 600, 540 + sd * (580 + k * 30), 1250); x.stroke(); } }
    x.beginPath(); x.moveTo(-OX, -OY); x.lineTo(BW, -OY); x.lineTo(BW, 120); x.quadraticCurveTo(540, 260, -OX, 120); x.closePath(); fs(x, '#9a1c30', 10);
    x.fillStyle = '#7a4a2a'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  skyHigh() { // high sky full of clouds
    const [c, x] = canvas(); fill(x, '#3fa8ff', '#bfe6ff');
    for (let i = 0; i < 9; i++) cloud(x, hash(i + 60) * 1100, 150 + hash(i + 61) * 1600, 0.9 + hash(i + 62) * 1.1);
    return finish(c);
  },
  windmill() { // green hills with a windmill
    const [c, x] = canvas(); fill(x, '#8fd8ff', '#e6f6ff', -OY, 1100); cloud(x, 300, 300, 1);
    x.beginPath(); x.moveTo(-OX, 1150); x.quadraticCurveTo(300, 1000, 640, 1120); x.quadraticCurveTo(900, 1200, BW, 1080); x.lineTo(BW, BH); x.lineTo(-OX, BH); fs(x, '#7fd36a', 11);
    x.beginPath(); x.moveTo(800, 1120); x.lineTo(830, 700); x.lineTo(910, 700); x.lineTo(940, 1120); fs(x, '#f4ead2', 10);
    for (let i = 0; i < 4; i++) { x.save(); x.translate(870, 700); x.rotate(i * Math.PI / 2 + 0.4); A_blade(x); x.restore(); }
    return finish(c);
  },
  circus() { // circus tent stripes
    const [c, x] = canvas(); fill(x, '#ffe9b0', '#ffd27a');
    for (let i = -6; i < 7; i++) { x.beginPath(); x.moveTo(540, -OY); x.lineTo(540 + i * 200, 1300); x.lineTo(540 + (i + 1) * 200, 1300); x.closePath(); x.fillStyle = i % 2 ? '#e8302e' : '#fff3e0'; x.fill(); }
    x.fillStyle = '#7a4a2a'; x.fillRect(-OX, 1300, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1300); x.lineTo(BW, 1300); x.stroke();
    return finish(c, 8);
  },
  mirrorHall() { // hall of mirrors
    const [c, x] = canvas(); fill(x, '#3a2a55', '#20163a');
    for (let i = 0; i < 4; i++) { const mx = 40 + i * 270; rrect(x, mx, 260, 220, 820, 110); fs(x, '#c9b07a', 12); rrect(x, mx + 18, 278, 184, 784, 92); const g = x.createLinearGradient(mx, 260, mx + 220, 1080); g.addColorStop(0, '#d9ecff'); g.addColorStop(1, '#8fb6e0'); x.fillStyle = g; x.fill(); x.lineWidth = 8; x.strokeStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.moveTo(mx + 50, 360); x.lineTo(mx + 120, 300); x.stroke(); }
    x.fillStyle = '#5a3d86'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  palace() { // sunny plaza with colourful tiles and arches
    const [c, x] = canvas(); fill(x, '#8fd8ff', '#ffefcf', -OY, 900); sunDisk(x, 200, 240, 80);
    x.beginPath(); x.rect(-OX, 520, BW, 700); fs(x, '#f2c27a', 10); for (let i = 0; i < 5; i++) { x.beginPath(); const ax = 20 + i * 220; x.moveTo(ax, 1220); x.lineTo(ax, 760); x.arc(ax + 80, 760, 80, Math.PI, 0); x.lineTo(ax + 160, 1220); x.closePath(); fs(x, '#c9653f', 8); }
    for (let r = 0; r < 10; r++) for (let k = 0; k < 11; k++) { x.fillStyle = (r + k) % 2 ? '#4fb3a6' : '#ffd23f'; x.fillRect(-60 + k * 110, 1220 + r * 90, 110, 90); }
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1220); x.lineTo(BW, 1220); x.stroke();
    return finish(c);
  },
  nightIsland() { // island at night under a dark sky
    const [c, x] = canvas(); fill(x, '#0f1430', '#26305e', -OY, 1200);
    for (let i = 0; i < 80; i++) { x.fillStyle = `rgba(255,255,255,${0.3 + hash(i) * 0.6})`; x.beginPath(); x.arc(hash(i + 1) * 1080, hash(i + 2) * 1000, 2 + hash(i + 3) * 3, 0, 7); x.fill(); }
    x.fillStyle = '#1a2f5a'; x.fillRect(-OX, 1150, BW, 1200);
    x.beginPath(); x.moveTo(60, 1180); x.quadraticCurveTo(540, 880, 1020, 1180); x.closePath(); fs(x, '#2f4a3a', 10);
    for (let i = 0; i < 8; i++) { const hx = 240 + i * 80, hy = 1100 - Math.sin(i / 7 * Math.PI) * 140; x.beginPath(); x.rect(hx, hy, 60, 80); fs(x, '#5b4a6a', 6); x.fillStyle = '#ffd77a'; x.fillRect(hx + 20, hy + 25, 20, 20); }
    return finish(c);
  },
  throne() { // royal throne room
    const [c, x] = canvas(); fill(x, '#5a1f3a', '#2e0f20');
    for (let i = 0; i < 4; i++) { x.beginPath(); x.rect(60 + i * 300, 200, 70, 1100); fs(x, '#c9a64a', 9); }
    x.beginPath(); x.moveTo(380, 1280); x.lineTo(380, 520); x.quadraticCurveTo(540, 380, 700, 520); x.lineTo(700, 1280); x.closePath(); fs(x, '#ff6fb0', 11);
    x.fillStyle = '#b5223a'; x.fillRect(440, 1240, 200, 1100); x.fillStyle = '#8a5a3c'; x.fillRect(-OX, 1280, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1280); x.lineTo(BW, 1280); x.stroke();
    return finish(c);
  },
  battleRuins() { // dusty, broken battlefield at dusk
    const [c, x] = canvas(); fill(x, '#ff9a6b', '#5a3a6a', -OY, 1300);
    for (let i = 0; i < 6; i++) { const bx = -40 + i * 200, h = 300 + hash(i) * 400; x.beginPath(); x.moveTo(bx, 1250); x.lineTo(bx, 1250 - h); x.lineTo(bx + 60, 1250 - h + 60); x.lineTo(bx + 110, 1250 - h - 30); x.lineTo(bx + 160, 1250); x.closePath(); fs(x, '#4a3a4a', 9); }
    x.fillStyle = '#6b5040'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    x.fillStyle = 'rgba(80,60,60,0.4)'; for (let i = 0; i < 12; i++) { x.beginPath(); x.arc(hash(i + 5) * 1080, 400 + hash(i + 6) * 800, 80 + hash(i + 7) * 80, 0, 7); x.fill(); }
    return finish(c);
  },
  cozyRoom() { // warm living room with a rug
    const [c, x] = canvas(); fill(x, '#ffe2b8', '#ffd09a');
    for (let i = -1; i < 12; i++) { x.fillStyle = i % 2 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'; x.fillRect(i * 100, -OY, 100, 1400); }
    rrect(x, 640, 300, 300, 260, 16); fs(x, '#9ed8ff', 10); x.beginPath(); x.moveTo(790, 300); x.lineTo(790, 560); x.moveTo(640, 430); x.lineTo(940, 430); x.lineWidth = 8; x.strokeStyle = OL; x.stroke();
    x.fillStyle = '#c99b6d'; x.fillRect(-OX, 1260, BW, 1000); x.beginPath(); x.ellipse(540, 1500, 460, 140, 0, 0, 7); fs(x, '#e8506f', 9);
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  islandAerial() { // an island seen from high above, surrounded by sea
    const [c, x] = canvas(); fill(x, '#2f8fd6', '#1f6fb5');
    waves(x, 200, 'rgba(255,255,255,0.35)', 18, 12); waves(x, 1500, 'rgba(255,255,255,0.35)', 18, 12);
    x.beginPath(); x.ellipse(540, 980, 420, 300, 0, 0, 7); fs(x, '#e8d6a0', 11); x.beginPath(); x.ellipse(540, 960, 370, 250, 0, 0, 7); fs(x, '#7fd36a', 0);
    for (let i = 0; i < 30; i++) { const a = hash(i) * 6.28, r = hash(i + 1) * 220; x.beginPath(); x.rect(540 + Math.cos(a) * r * 1.3, 960 + Math.sin(a) * r * 0.85, 26, 26); fs(x, ['#e86a5a', '#f2b04d', '#7d6fd6', '#4fb3a6'][i % 4], 3); }
    return finish(c);
  },
  // ---------------- Hobby-Hobby (toy) short ----------------
  playroom() { // pastel playroom with building blocks on the floor
    const [c, x] = canvas(); fill(x, '#cfe8ff', '#b5d8ff');
    for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.beginPath(); x.arc(120 + i * 180, 220 + (i % 2) * 120, 24, 0, 7); x.fill(); }
    x.fillStyle = '#f2c98a'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    const blocks = [[60, 1180, '#e8402e', 'A'], [150, 1180, '#3f9bff', 'B'], [105, 1095, '#ffcf3a', 'C'], [900, 1180, '#5cc45a', 'D'], [990, 1180, '#ff8fb3', 'E']];
    for (const [bx, by, col, l] of blocks) { rrect(x, bx, by, 86, 86, 10); fs(x, col, 8); x.fillStyle = '#fff'; x.font = 'bold 56px sans-serif'; x.textAlign = 'center'; x.fillText(l, bx + 43, by + 64); }
    return finish(c);
  },
  toyShelf() { // wooden shelves full of toys, for the fruit reveal
    const [c, x] = canvas(); fill(x, '#7a4a2a', '#5a341c');
    for (let r = 0; r < 5; r++) { const y = 120 + r * 360; x.fillStyle = '#a26d45'; x.fillRect(-OX, y + 250, BW, 40); x.lineWidth = 8; x.strokeStyle = OL; x.strokeRect(-OX, y + 250, BW, 40);
      for (let k = 0; k < 6; k++) { const tx = 20 + k * 190, col = ['#e8402e', '#3f9bff', '#ffcf3a', '#5cc45a', '#ff8fb3', '#b07cff'][(k + r) % 6];
        if ((k + r) % 3 === 0) { x.beginPath(); x.arc(tx + 70, y + 190, 60, 0, 7); fs(x, col, 7); }
        else if ((k + r) % 3 === 1) { rrect(x, tx + 20, y + 120, 100, 130, 14); fs(x, col, 7); x.beginPath(); x.arc(tx + 70, y + 90, 40, 0, 7); fs(x, '#f6d7b0', 7); }
        else { x.beginPath(); x.moveTo(tx + 10, y + 250); x.lineTo(tx + 70, y + 110); x.lineTo(tx + 130, y + 250); x.closePath(); fs(x, col, 7); } } }
    return finish(c, 12);
  },
  toyTown() { // bright hillside town with flags and colourful houses
    const [c, x] = canvas(); fill(x, '#7fd0ff', '#fff2d0', -OY, 1000); sunDisk(x, 860, 260, 70);
    for (let i = 0; i < 7; i++) { const hx = -40 + i * 170, hh = 260 + hash(i + 3) * 260, hy = 1150 - hh;
      x.beginPath(); x.rect(hx, hy, 150, hh); fs(x, ['#ffd6a8', '#ffb8c8', '#fff0b0', '#c8f0ff', '#d8ffc8'][i % 5], 9);
      x.beginPath(); x.moveTo(hx - 15, hy); x.lineTo(hx + 75, hy - 80); x.lineTo(hx + 165, hy); x.closePath(); fs(x, '#e8402e', 9);
      for (let w = 0; w < 2; w++) { rrect(x, hx + 25 + w * 60, hy + 50, 40, 50, 8); fs(x, '#5aa8e8', 6); } }
    x.strokeStyle = OL; x.lineWidth = 4; x.beginPath(); x.moveTo(-OX, 420); x.quadraticCurveTo(540, 560, BW, 420); x.stroke();
    for (let i = 0; i < 12; i++) { const fx = i * 100, fy = 430 + Math.sin(i / 11 * Math.PI) * 120; x.beginPath(); x.moveTo(fx, fy); x.lineTo(fx + 50, fy); x.lineTo(fx + 25, fy + 50); x.closePath(); fs(x, ['#e8402e', '#ffcf3a', '#3f9bff'][i % 3], 4); }
    x.fillStyle = '#d9b48a'; x.fillRect(-OX, 1150, BW, 1100); for (let r = 0; r < 12; r++) for (let k = 0; k < 10; k++) { rrect(x, -60 + k * 130 + (r % 2) * 65, 1170 + r * 70, 120, 60, 12); x.strokeStyle = 'rgba(120,80,40,0.35)'; x.lineWidth = 4; x.stroke(); }
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(BW, 1150); x.stroke();
    return finish(c);
  },
  blocks() { // giant toy-block stage: yellow wall, coloured block steps
    const [c, x] = canvas(); fill(x, '#fff0a8', '#ffd95a');
    for (let i = 0; i < 40; i++) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(hash(i) * 1080, hash(i + 9) * 1100, 10 + hash(i + 4) * 18, 0, 7); x.fill(); }
    for (let k = 0; k < 9; k++) { rrect(x, -60 + k * 140, 1180, 130, 130, 14); fs(x, ['#e8402e', '#3f9bff', '#5cc45a', '#ff8fb3'][k % 4], 9); }
    x.fillStyle = '#c99b6d'; x.fillRect(-OX, 1310, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1310); x.lineTo(BW, 1310); x.stroke();
    return finish(c, 10);
  },
  flowerTown() { // cobbled street with flower boxes and an arch
    const [c, x] = canvas(); fill(x, '#a8e0ff', '#ffe9f0', -OY, 1000);
    for (const [hx, w, col] of [[-80, 380, '#f7d7b0'], [700, 460, '#ffd1dc']]) { x.beginPath(); x.rect(hx, 200, w, 1020); fs(x, col, 10);
      for (let r = 0; r < 3; r++) { const wy = 330 + r * 270; rrect(x, hx + 90, wy, 160, 150, 70); fs(x, '#6fb8e8', 8); x.beginPath(); x.rect(hx + 70, wy + 150, 200, 40); fs(x, '#8a5a3c', 7); for (let f = 0; f < 6; f++) { x.beginPath(); x.arc(hx + 85 + f * 34, wy + 140, 18, 0, 7); fs(x, ['#ff5a7a', '#ffcf3a', '#ff8fd0'][f % 3], 4); } } }
    x.beginPath(); x.moveTo(300, 1220); x.lineTo(300, 640); x.arc(500, 640, 200, Math.PI, 0); x.lineTo(700, 1220); x.lineWidth = 50; x.strokeStyle = OL; x.stroke(); x.lineWidth = 34; x.strokeStyle = '#f2e2c0'; x.stroke();
    x.fillStyle = '#b8a58a'; x.fillRect(-OX, 1220, BW, 1100); for (let r = 0; r < 14; r++) for (let k = 0; k < 12; k++) { x.beginPath(); x.ellipse(-40 + k * 110 + (r % 2) * 55, 1250 + r * 60, 48, 24, 0, 0, 7); x.fillStyle = r % 3 ? '#a8957a' : '#c9b89a'; x.fill(); }
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1220); x.lineTo(BW, 1220); x.stroke();
    return finish(c);
  },
  photoHall() { // hallway wall with framed family photos
    const [c, x] = canvas(); fill(x, '#e6d4f2', '#d2bde6');
    for (let i = -1; i < 12; i++) { x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(i * 100, -OY, 50, 1400); }
    for (const [fx, fy, w, h] of [[60, 220, 220, 280], [800, 300, 200, 240], [90, 1500, 180, 200]]) { rrect(x, fx, fy, w, h, 10); fs(x, '#a26d45', 10); rrect(x, fx + 18, fy + 18, w - 36, h - 36, 6); fs(x, '#fff7e0', 6); x.beginPath(); x.arc(fx + w / 2, fy + h * 0.45, w * 0.18, 0, 7); fs(x, '#c9b0a0', 5); }
    x.fillStyle = '#8a6a9a'; x.fillRect(-OX, 1300, BW, 1000); x.fillStyle = '#ffffff'; x.fillRect(-OX, 1270, BW, 40); x.lineWidth = 8; x.strokeStyle = OL; x.strokeRect(-OX, 1270, BW, 40);
    return finish(c);
  },
  study() { // dim study: desk lamp glow, bookshelves, parchment wall
    const [c, x] = canvas(); fill(x, '#4a3226', '#2a1c16');
    const g = x.createRadialGradient(540, 700, 50, 540, 700, 800); g.addColorStop(0, 'rgba(255,214,140,0.55)'); g.addColorStop(1, 'rgba(255,214,140,0)'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    for (const sx of [-60, 820]) for (let r = 0; r < 5; r++) { x.fillStyle = '#6b4630'; x.fillRect(sx, 200 + r * 210, 320, 20); for (let b = 0; b < 7; b++) { x.beginPath(); x.rect(sx + 10 + b * 42, 100 + r * 210, 34, 100); fs(x, ['#c0392b', '#2f6fb5', '#5c8a3a', '#d9a03a'][(b + r) % 4], 4); } }
    x.fillStyle = '#5a3a26'; x.fillRect(-OX, 1280, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1280); x.lineTo(BW, 1280); x.stroke();
    return finish(c);
  },
  birthday() { // party wall with bunting, balloons and confetti
    const [c, x] = canvas(); fill(x, '#ffe4f2', '#ffd0e6');
    for (let i = 0; i < 70; i++) { x.fillStyle = ['#ff5a7a', '#3f9bff', '#ffcf3a', '#5cc45a', '#b07cff'][i % 5]; x.save(); x.translate(hash(i) * 1080, hash(i + 3) * 1200); x.rotate(hash(i + 5) * 3); x.fillRect(-10, -5, 20, 10); x.restore(); }
    for (const row of [180, 360]) { x.strokeStyle = OL; x.lineWidth = 4; x.beginPath(); x.moveTo(-OX, row); x.quadraticCurveTo(540, row + 120, BW, row); x.stroke();
      for (let i = 0; i < 13; i++) { const fx = -40 + i * 95, fy = row + Math.sin(i / 12 * Math.PI) * 60; x.beginPath(); x.moveTo(fx, fy); x.lineTo(fx + 60, fy + 4); x.lineTo(fx + 30, fy + 70); x.closePath(); fs(x, ['#ff5a7a', '#3f9bff', '#ffcf3a', '#5cc45a'][i % 4], 4); } }
    for (const [bx, by, col] of [[90, 640, '#ff5a7a'], [960, 600, '#3f9bff'], [1000, 820, '#ffcf3a']]) { x.beginPath(); x.moveTo(bx, by + 90); x.quadraticCurveTo(bx + 20, by + 200, bx - 10, by + 320); x.lineWidth = 4; x.strokeStyle = OL; x.stroke(); x.beginPath(); x.ellipse(bx, by, 70, 90, 0, 0, 7); fs(x, col, 8); }
    x.fillStyle = '#c9a0e0'; x.fillRect(-OX, 1280, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1280); x.lineTo(BW, 1280); x.stroke();
    return finish(c);
  },
  toyFactory() { // dark underground toy factory: gears and a conveyor belt
    const [c, x] = canvas(); fill(x, '#2a2436', '#141018');
    const gear = (gx, gy, r, n) => { x.beginPath(); for (let i = 0; i < n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, rr = i % 2 ? r : r * 0.82; x.lineTo(gx + Math.cos(a) * rr, gy + Math.sin(a) * rr); } x.closePath(); fs(x, '#4a4458', 8); x.beginPath(); x.arc(gx, gy, r * 0.3, 0, 7); fs(x, '#2a2436', 6); };
    gear(160, 300, 180, 12); gear(900, 420, 240, 14); gear(560, 160, 110, 9);
    x.fillStyle = '#3a3346'; x.fillRect(-OX, 1150, BW, 70); for (let i = 0; i < 14; i++) { x.beginPath(); x.arc(-40 + i * 90, 1185, 26, 0, 7); fs(x, '#5a5468', 5); }
    x.fillStyle = '#1e1a26'; x.fillRect(-OX, 1220, BW, 1100); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(BW, 1150); x.stroke();
    for (let i = 0; i < 6; i++) { const lx = 100 + i * 180; x.fillStyle = 'rgba(255,90,70,0.85)'; x.beginPath(); x.arc(lx, 60, 14, 0, 7); x.fill(); }
    return finish(c, 10);
  },
  sunriseSquare() { // town square at sunrise with a fountain
    const [c, x] = canvas(); fill(x, '#ffb07a', '#ffe9c0', -OY, 1100); sunDisk(x, 540, 900, 120, '255,240,190');
    for (let i = 0; i < 6; i++) { const hx = -60 + i * 210, hh = 220 + hash(i + 40) * 200; x.beginPath(); x.rect(hx, 1150 - hh, 180, hh); fs(x, '#c97a6a', 8); }
    x.fillStyle = '#e8c9a0'; x.fillRect(-OX, 1150, BW, 1100); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(BW, 1150); x.stroke();
    x.beginPath(); x.ellipse(540, 1330, 330, 70, 0, 0, 7); fs(x, '#bfb4c8', 9); x.beginPath(); x.ellipse(540, 1320, 280, 46, 0, 0, 7); fs(x, '#7fd0ff', 6);
    return finish(c);
  },
  toyHouse() { // a giant pink toy house on a grassy hill
    const [c, x] = canvas(); fill(x, '#9ee0ff', '#e8f8ff', -OY, 1100); cloud(x, 220, 260, 0.9); cloud(x, 900, 420, 0.7);
    x.beginPath(); x.moveTo(-OX, 1180); x.quadraticCurveTo(540, 1040, BW, 1180); x.lineTo(BW, BH); x.lineTo(-OX, BH); fs(x, '#7fd36a', 11);
    x.beginPath(); x.rect(160, 520, 760, 600); fs(x, '#ff9fc6', 11); x.beginPath(); x.moveTo(120, 540); x.lineTo(540, 230); x.lineTo(960, 540); x.closePath(); fs(x, '#b07cff', 11);
    for (const wx of [230, 690]) { rrect(x, wx, 640, 160, 160, 20); fs(x, '#fff3a8', 9); x.beginPath(); x.moveTo(wx + 80, 640); x.lineTo(wx + 80, 800); x.moveTo(wx, 720); x.lineTo(wx + 160, 720); x.lineWidth = 8; x.strokeStyle = OL; x.stroke(); }
    rrect(x, 460, 850, 160, 270, 70); fs(x, '#ffcf3a', 10);
    return finish(c);
  },
  spiralScare() { // green-and-purple scare spiral
    const [c, x] = canvas(); x.fillStyle = '#3a1f5a'; x.fillRect(-OX, -OY, BW, BH);
    for (let i = 0; i < 16; i++) { x.beginPath(); x.moveTo(540, 900); for (let k = 0; k <= 60; k++) { const a = i / 16 * Math.PI * 2 + k * 0.09, r = k * 28; x.lineTo(540 + Math.cos(a) * r, 900 + Math.sin(a) * r); }
      for (let k = 60; k >= 0; k--) { const a = (i + 0.5) / 16 * Math.PI * 2 + k * 0.09, r = k * 28; x.lineTo(540 + Math.cos(a) * r, 900 + Math.sin(a) * r); } x.closePath(); x.fillStyle = i % 2 ? '#6fe08a' : '#5a2f8a'; x.fill(); }
    return finish(c, 8);
  },
  kidsRoom() { // kid's bedroom: starry blue wallpaper, toy shelf, rug
    const [c, x] = canvas(); fill(x, '#5a7fe0', '#3f5fc0');
    x.fillStyle = '#ffe680'; for (let i = 0; i < 26; i++) { const sx = hash(i + 70) * 1080, sy = hash(i + 71) * 1100; x.save(); x.translate(sx, sy); x.beginPath(); for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2 - Math.PI / 2, r = k % 2 ? 9 : 22; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fill(); x.restore(); }
    x.fillStyle = '#a26d45'; x.fillRect(640, 700, 380, 30); x.lineWidth = 7; x.strokeStyle = OL; x.strokeRect(640, 700, 380, 30);
    for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(690 + k * 90, 650, 40, 0, 7); fs(x, ['#e8402e', '#ffcf3a', '#5cc45a', '#ff8fb3'][k], 6); }
    x.fillStyle = '#e8d6b0'; x.fillRect(-OX, 1260, BW, 1000); x.beginPath(); x.ellipse(540, 1520, 470, 150, 0, 0, 7); fs(x, '#ffcf3a', 9);
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  // ---------------- Spike-Spike short ----------------
  desertCactus() { // midday desert with tall cacti
    const [c, x] = canvas(); fill(x, '#7fd0ff', '#ffe9b8', -OY, 1100); sunDisk(x, 850, 250, 75);
    x.beginPath(); x.moveTo(-OX, 1150); x.quadraticCurveTo(400, 1060, 760, 1130); x.quadraticCurveTo(950, 1170, BW, 1100); x.lineTo(BW, BH); x.lineTo(-OX, BH); fs(x, '#f2c27a', 10);
    const cactus = (cx, by, h) => { A_rr(x, cx - 40, by - h, 80, h, 40, '#4fae5a'); A_rr(x, cx - 130, by - h * 0.7, 50, h * 0.35, 25, '#4fae5a'); A_rr(x, cx - 110, by - h * 0.45, 90, 44, 22, '#4fae5a'); A_rr(x, cx + 80, by - h * 0.85, 50, h * 0.35, 25, '#4fae5a'); A_rr(x, cx + 20, by - h * 0.6, 100, 44, 22, '#4fae5a');
      x.strokeStyle = OL; x.lineWidth = 4; for (let k = 0; k < 8; k++) { const py = by - h + 40 + k * h / 9; x.beginPath(); x.moveTo(cx - 40, py); x.lineTo(cx - 58, py - 8); x.moveTo(cx + 40, py); x.lineTo(cx + 58, py - 8); x.stroke(); } };
    cactus(120, 1180, 520); cactus(930, 1160, 420);
    return finish(c);
  },
  greenhouse() { // glass greenhouse full of spiky potted cacti
    const [c, x] = canvas(); fill(x, '#d8f2e0', '#b8e0c8');
    x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 10; for (let i = 0; i < 7; i++) { x.beginPath(); x.moveTo(i * 180 - 40, -OY); x.lineTo(i * 180 - 40, 1250); x.stroke(); } for (let r = 0; r < 4; r++) { x.beginPath(); x.moveTo(-OX, 150 + r * 280); x.lineTo(BW, 150 + r * 280); x.stroke(); }
    x.fillStyle = '#a26d45'; x.fillRect(-OX, 1180, BW, 40); for (let k = 0; k < 7; k++) { const px = 20 + k * 170; x.beginPath(); x.moveTo(px, 1180); x.lineTo(px + 120, 1180); x.lineTo(px + 105, 1080); x.lineTo(px + 15, 1080); x.closePath(); fs(x, '#e8822e', 7); x.beginPath(); x.ellipse(px + 60, 1030, 50, 70, 0, 0, 7); fs(x, '#5cc45a', 7); x.strokeStyle = OL; x.lineWidth = 3; for (let q = 0; q < 6; q++) { const a = q * 1.05; x.beginPath(); x.moveTo(px + 60 + Math.cos(a) * 50, 1030 + Math.sin(a) * 70); x.lineTo(px + 60 + Math.cos(a) * 66, 1030 + Math.sin(a) * 88); x.stroke(); } }
    x.fillStyle = '#7a5a40'; x.fillRect(-OX, 1220, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1220); x.lineTo(BW, 1220); x.stroke();
    return finish(c, 10);
  },
  armory() { // weapons wall: crossed spears and shields
    const [c, x] = canvas(); fill(x, '#6a4a3a', '#4a3226');
    for (let r = 0; r < 12; r++) for (let k = 0; k < 7; k++) { x.strokeStyle = 'rgba(0,0,0,0.18)'; x.lineWidth = 4; x.strokeRect(-60 + k * 180 + (r % 2) * 90, -100 + r * 110, 180, 110); }
    for (const [sx, sy] of [[220, 520], [860, 520]]) { for (const r of [-0.6, 0.6]) { x.save(); x.translate(sx, sy); x.rotate(r); A_rr(x, -10, -320, 20, 640, 8, '#8a5a3c'); x.beginPath(); x.moveTo(-26, -320); x.lineTo(0, -400); x.lineTo(26, -320); x.closePath(); fs(x, '#c9ccd6', 7); x.restore(); } x.beginPath(); x.arc(sx, sy, 110, 0, 7); fs(x, '#b5223a', 10); x.beginPath(); x.arc(sx, sy, 40, 0, 7); fs(x, '#d9b44a', 8); }
    x.fillStyle = '#3a2a20'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  spikeArena() { // stone arena ringed by an iron spike fence, for the techniques stage
    const [c, x] = canvas(); fill(x, '#ff9f6b', '#ffd2a0', -OY, 1000);
    x.beginPath(); x.rect(-OX, 700, BW, 560); fs(x, '#c9b8a0', 10); for (let k = 0; k < 9; k++) { x.beginPath(); x.moveTo(-40 + k * 140, 700); x.lineTo(-40 + k * 140, 1260); x.lineWidth = 6; x.strokeStyle = 'rgba(0,0,0,0.2)'; x.stroke(); }
    for (let k = 0; k < 22; k++) { const px = -60 + k * 60; x.beginPath(); x.moveTo(px, 1200); x.lineTo(px, 1080); x.lineTo(px + 14, 1040); x.lineTo(px + 28, 1080); x.lineTo(px + 28, 1200); x.closePath(); fs(x, '#3a3346', 5); }
    x.fillStyle = '#e8d6b8'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  lumberYard() { // stacked planks and a wooden fence
    const [c, x] = canvas(); fill(x, '#a8e0ff', '#f0f8ff', -OY, 900);
    for (let k = 0; k < 12; k++) { A_rr(x, -60 + k * 100, 520, 90, 720, 6, k % 2 ? '#d9a868' : '#c99556'); x.beginPath(); x.moveTo(-15 + k * 100, 520); x.lineTo(-60 + k * 100 + 45, 470); x.lineTo(30 + k * 100, 520); x.closePath(); fs(x, k % 2 ? '#d9a868' : '#c99556', 6); }
    for (let r = 0; r < 4; r++) A_rr(x, 600, 1000 - r * 60, 420, 56, 10, '#e6b878');
    x.fillStyle = '#b89a6a'; x.fillRect(-OX, 1240, BW, 1000); x.fillStyle = 'rgba(255,240,200,0.6)'; for (let i = 0; i < 30; i++) x.fillRect(hash(i) * 1080, 1260 + hash(i + 1) * 600, 30, 6);
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  nightStreet() { // neon city street at night, wet road
    const [c, x] = canvas(); fill(x, '#1a1440', '#3a1f5a', -OY, 1200);
    for (let i = 0; i < 7; i++) { const bx = -60 + i * 170, h = 500 + hash(i + 80) * 500; x.beginPath(); x.rect(bx, 1200 - h, 160, h); fs(x, '#2a2250', 8); for (let w = 0; w < 10; w++) { x.fillStyle = hash(i * 10 + w) > 0.5 ? '#ffd77a' : '#5a4a8a'; x.fillRect(bx + 25 + (w % 2) * 65, 1230 - h + Math.floor(w / 2) * 90, 40, 50); } }
    x.font = 'bold 80px sans-serif'; x.fillStyle = '#ff5ad0'; x.shadowColor = '#ff5ad0'; x.shadowBlur = 30; x.fillText('BAR', 120, 640); x.fillStyle = '#5affe0'; x.shadowColor = '#5affe0'; x.fillText('24H', 780, 560); x.shadowBlur = 0;
    x.fillStyle = '#2a2436'; x.fillRect(-OX, 1200, BW, 1100); x.fillStyle = 'rgba(255,90,208,0.25)'; x.fillRect(80, 1300, 260, 600); x.fillStyle = 'rgba(90,255,224,0.2)'; x.fillRect(740, 1300, 260, 600);
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1200); x.lineTo(BW, 1200); x.stroke();
    return finish(c, 10);
  },
  brickAlley() { // red brick alley wall with a drainpipe
    const [c, x] = canvas(); fill(x, '#b5523a', '#8a3a2a');
    for (let r = 0; r < 24; r++) for (let k = 0; k < 9; k++) { x.strokeStyle = 'rgba(60,20,10,0.45)'; x.lineWidth = 5; x.strokeRect(-60 + k * 140 + (r % 2) * 70, -120 + r * 60, 140, 60); }
    A_rr(x, 930, -OY, 50, 1400, 10, '#7a8a9a'); x.fillStyle = '#5a5060'; x.fillRect(-OX, 1280, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1280); x.lineTo(BW, 1280); x.stroke();
    return finish(c);
  },
  gym() { // gym: rubber floor, weight racks, mirror strip
    const [c, x] = canvas(); fill(x, '#e8eef6', '#cfd8e6');
    x.fillStyle = '#b8cde0'; x.fillRect(-OX, 300, BW, 500); x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 10; x.beginPath(); x.moveTo(100, 340); x.lineTo(220, 760); x.moveTo(700, 340); x.lineTo(820, 760); x.stroke();
    x.fillStyle = '#3a3346'; x.fillRect(80, 900, 900, 24); for (let k = 0; k < 6; k++) { x.beginPath(); x.arc(140 + k * 160, 980, 50, 0, 7); fs(x, ['#e8402e', '#3f9bff', '#ffcf3a'][k % 3], 8); }
    x.fillStyle = '#3a3a46'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  rainNight() { // dark night with heavy rain
    const [c, x] = canvas(); fill(x, '#141a2e', '#2a3450');
    for (let i = 0; i < 8; i++) { x.fillStyle = 'rgba(70,80,110,0.8)'; x.beginPath(); x.arc(hash(i + 20) * 1080, 100 + hash(i + 21) * 250, 120 + hash(i + 22) * 100, 0, 7); x.fill(); }
    x.strokeStyle = 'rgba(180,200,255,0.45)'; x.lineWidth = 4; for (let i = 0; i < 160; i++) { const rx = hash(i + 30) * 1200 - 60, ry = hash(i + 31) * 2000; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 14, ry + 60); x.stroke(); }
    x.fillStyle = '#1a2030'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c, 8);
  },
  thunderClouds() { // purple thunder clouds lit by lightning
    const [c, x] = canvas(); fill(x, '#3a2a6a', '#7a5ab5');
    for (let i = 0; i < 14; i++) { x.fillStyle = i % 2 ? 'rgba(90,70,150,0.9)' : 'rgba(120,100,190,0.9)'; x.beginPath(); x.arc(hash(i + 40) * 1080, hash(i + 41) * 1900, 140 + hash(i + 42) * 160, 0, 7); x.fill(); }
    x.strokeStyle = '#fff6a0'; x.lineWidth = 12; x.lineJoin = 'round'; for (const bx of [200, 880]) { x.beginPath(); x.moveTo(bx, -OY); x.lineTo(bx + 60, 300); x.lineTo(bx - 20, 340); x.lineTo(bx + 50, 700); x.stroke(); }
    return finish(c, 8);
  },
  casino() { // casino floor: red carpet, gold arches, card suits
    const [c, x] = canvas(); fill(x, '#3a0f2a', '#1f0818');
    for (let i = 0; i < 4; i++) { x.beginPath(); const ax = -20 + i * 290; x.moveTo(ax, 1260); x.lineTo(ax, 560); x.arc(ax + 120, 560, 120, Math.PI, 0); x.lineTo(ax + 240, 1260); x.closePath(); fs(x, '#5a1a3a', 9); x.lineWidth = 12; x.strokeStyle = '#d9b44a'; x.stroke(); }
    x.font = 'bold 90px sans-serif'; x.textAlign = 'center'; ['♠', '♥', '♦', '♣'].forEach((g, i) => { x.fillStyle = i % 3 ? '#e8303c' : '#f4f4f4'; x.fillText(g, 100 + i * 290, 300); });
    x.fillStyle = '#9a1a2a'; x.fillRect(-OX, 1260, BW, 1000); x.fillStyle = 'rgba(217,180,74,0.4)'; for (let i = 0; i < 9; i++) x.fillRect(-60 + i * 140, 1260, 10, 1000);
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  trainPlatform() { // sunny train platform with a bench and a clock
    const [c, x] = canvas(); fill(x, '#9ed8ff', '#e8f6ff', -OY, 900);
    x.beginPath(); x.rect(-OX, 220, BW, 70); fs(x, '#3f6fb5', 10); for (let k = 0; k < 6; k++) A_rr(x, 40 + k * 200, 290, 24, 950, 6, '#5a6a8a');
    x.beginPath(); x.arc(540, 420, 80, 0, 7); fs(x, '#ffffff', 10); x.beginPath(); x.moveTo(540, 420); x.lineTo(540, 365); x.moveTo(540, 420); x.lineTo(585, 440); x.lineWidth = 9; x.strokeStyle = OL; x.stroke();
    x.fillStyle = '#c9c3b0'; x.fillRect(-OX, 1240, BW, 1000); x.fillStyle = '#ffcf3a'; x.fillRect(-OX, 1240, BW, 30);
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  // ---------------- Spider-Spider short ----------------
  attic() { // dusty wooden attic with a round window and cobwebs in the corners
    const [c, x] = canvas(); fill(x, '#a27a5a', '#7a5a40');
    for (let k = -1; k < 12; k++) { x.strokeStyle = 'rgba(60,35,20,0.35)'; x.lineWidth = 6; x.beginPath(); x.moveTo(k * 100, -OY); x.lineTo(k * 100, 1300); x.stroke(); }
    x.beginPath(); x.moveTo(-OX, 300); x.lineTo(540, -100); x.lineTo(BW, 300); x.lineWidth = 60; x.strokeStyle = '#5a3a26'; x.stroke();
    x.beginPath(); x.arc(540, 420, 130, 0, 7); fs(x, '#ffe9b0', 12); x.beginPath(); x.moveTo(410, 420); x.lineTo(670, 420); x.moveTo(540, 290); x.lineTo(540, 550); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
    for (const [cx, cy, d] of [[-OX, -OY + 140, 1], [BW - OX, -OY + 140, -1]]) { x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 3; for (let i = 0; i < 6; i++) { const a = (i / 5) * Math.PI / 2; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + d * Math.cos(a) * 320, cy + Math.sin(a) * 320); x.stroke(); } for (let r = 80; r < 320; r += 70) { x.beginPath(); x.arc(cx, cy, r, d > 0 ? 0 : Math.PI / 2, d > 0 ? Math.PI / 2 : Math.PI); x.stroke(); } }
    x.fillStyle = '#6b4630'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  dewGarden() { // misty morning garden with a dewy web between flowers
    const [c, x] = canvas(); fill(x, '#cfe9ff', '#e8ffe0');
    for (let i = 0; i < 9; i++) { const fx = hash(i + 90) * 1080, fy = 1100 + hash(i + 91) * 200; x.beginPath(); x.moveTo(fx, 1300); x.lineTo(fx, fy); x.lineWidth = 8; x.strokeStyle = '#4f9a3a'; x.stroke(); for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283; x.beginPath(); x.ellipse(fx + Math.cos(a) * 28, fy + Math.sin(a) * 28, 22, 14, a, 0, 7); fs(x, ['#ff9ccf', '#ffe680', '#b9b2e6'][i % 3], 4); } }
    x.strokeStyle = 'rgba(255,255,255,0.85)'; x.lineWidth = 3; for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283; x.beginPath(); x.moveTo(540, 800); x.lineTo(540 + Math.cos(a) * 700, 800 + Math.sin(a) * 700); x.stroke(); } for (let r = 100; r < 700; r += 90) { x.beginPath(); for (let i = 0; i <= 14; i++) { const a = i / 14 * 6.283; x.lineTo(540 + Math.cos(a) * r, 800 + Math.sin(a) * r); } x.stroke(); }
    x.fillStyle = 'rgba(160,220,255,0.9)'; for (let i = 0; i < 30; i++) { x.beginPath(); x.arc(hash(i + 3) * 1080, hash(i + 4) * 1500, 6, 0, 7); x.fill(); }
    x.fillStyle = '#7fc86a'; x.fillRect(-OX, 1300, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1300); x.lineTo(BW, 1300); x.stroke();
    return finish(c, 10);
  },
  fernJungle() { // prehistoric jungle: giant ferns and a hazy volcano
    const [c, x] = canvas(); fill(x, '#ffd9a0', '#b8e0a0', -OY, 1200);
    x.beginPath(); x.moveTo(560, 900); x.lineTo(760, 420); x.lineTo(840, 420); x.lineTo(1040, 900); fs(x, '#9a7a8a', 8); x.fillStyle = 'rgba(120,110,120,0.5)'; x.beginPath(); x.arc(800, 330, 90, 0, 7); x.fill();
    const fern = (fx, fy, sz, r) => { x.save(); x.translate(fx, fy); x.rotate(r); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(sz * 0.2, -sz * 0.6, 0, -sz); x.lineWidth = 10; x.strokeStyle = '#2f6a2a'; x.stroke(); for (let k = 1; k < 10; k++) { const py = -sz * k / 10, w = sz * 0.35 * (1 - k / 11); for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(sd * w / 2, py, w / 2, 14, sd * 0.3, 0, 7); x.fillStyle = '#4f9a3a'; x.fill(); } } x.restore(); };
    fern(60, 1300, 800, 0.25); fern(1000, 1300, 760, -0.3); fern(250, 1300, 500, -0.1); fern(820, 1300, 520, 0.15);
    x.fillStyle = '#6a8a3a'; x.fillRect(-OX, 1280, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1280); x.lineTo(BW, 1280); x.stroke();
    return finish(c);
  },
  stoneSteps() { // moss-covered stone temple steps
    const [c, x] = canvas(); fill(x, '#a8d8c0', '#d8f0e0', -OY, 900);
    for (let r = 0; r < 6; r++) { const y = 500 + r * 130, w = 500 + r * 150; x.beginPath(); x.rect(540 - w / 2, y, w, 130); fs(x, r % 2 ? '#b8b0a0' : '#a8a090', 8); x.fillStyle = 'rgba(90,150,70,0.7)'; for (let k = 0; k < 6; k++) { x.beginPath(); x.ellipse(540 - w / 2 + hash(r * 7 + k) * w, y + 8, 40, 12, 0, 0, 7); x.fill(); } }
    x.fillStyle = '#8a8478'; x.fillRect(-OX, 1280, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1280); x.lineTo(BW, 1280); x.stroke();
    return finish(c);
  },
  wanoStreet() { // old Japanese town street with paper lanterns
    const [c, x] = canvas(); fill(x, '#ffb88a', '#ffe0c0', -OY, 1000);
    for (const [hx, w] of [[-80, 360], [760, 400]]) { x.beginPath(); x.rect(hx, 420, w, 820); fs(x, '#8a5a3c', 10); x.beginPath(); x.moveTo(hx - 40, 440); x.lineTo(hx + w / 2, 300); x.lineTo(hx + w + 40, 440); x.closePath(); fs(x, '#3a3346', 10);
      for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { x.beginPath(); x.rect(hx + 30 + k * (w - 60) / 3, 520 + r * 220, (w - 60) / 3 - 14, 180); fs(x, '#f4ead2', 5); } }
    x.strokeStyle = OL; x.lineWidth = 4; x.beginPath(); x.moveTo(-OX, 360); x.quadraticCurveTo(540, 470, BW, 360); x.stroke();
    for (let i = 0; i < 7; i++) { const lx = 40 + i * 170, ly = 380 + Math.sin(i / 6 * Math.PI) * 60; x.beginPath(); x.ellipse(lx, ly + 50, 40, 56, 0, 0, 7); fs(x, '#e8402e', 6); x.fillStyle = 'rgba(255,230,140,0.5)'; x.beginPath(); x.ellipse(lx, ly + 50, 24, 40, 0, 0, 7); x.fill(); }
    x.fillStyle = '#c9a880'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  webHall() { // dark wooden hall strung with thick webs
    const [c, x] = canvas(); fill(x, '#3a2436', '#1f1420');
    for (let k = 0; k < 5; k++) A_rr(x, -40 + k * 260, -OY, 70, 1450, 6, '#5a3a3a');
    x.strokeStyle = 'rgba(245,240,255,0.55)'; x.lineWidth = 6; for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(hash(i) * 1080, -OY); x.quadraticCurveTo(540, 600 + hash(i + 1) * 300, hash(i + 2) * 1080, 1250); x.stroke(); }
    x.fillStyle = '#3a2a2a'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c, 8);
  },
  warehouse() { // tall warehouse interior: brick wall and a beamed ceiling
    const [c, x] = canvas(); fill(x, '#c9b8a8', '#a89888');
    x.fillStyle = '#5a4a40'; x.fillRect(-OX, -OY, BW, 300); for (let k = 0; k < 7; k++) A_rr(x, -60 + k * 190, 120, 60, 60, 4, '#3a2e28');
    for (let k = 0; k < 4; k++) { rrect(x, 80 + k * 250, 520, 160, 260, 10); fs(x, '#9ed8ff', 9); }
    for (let r = 0; r < 4; r++) A_rr(x, 650, 1000 + r * 60 - 240, 300, 56, 8, '#c99556');
    x.fillStyle = '#8a7a6a'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.moveTo(-OX, 160); x.lineTo(BW, 160); x.stroke();
    return finish(c);
  },
  volcano() { // erupting volcano under a red sky
    const [c, x] = canvas(); fill(x, '#ff7a3a', '#5a1a2a', -OY, 1300);
    x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(360, 520); x.lineTo(720, 520); x.lineTo(BW, 1250); x.closePath(); fs(x, '#3a2430', 10);
    x.beginPath(); x.moveTo(380, 540); x.quadraticCurveTo(420, 800, 360, 1000); x.lineTo(420, 1000); x.quadraticCurveTo(480, 760, 470, 540); fs(x, '#ff9a2e', 0);
    for (let i = 0; i < 9; i++) { x.fillStyle = `rgba(90,60,70,${0.5 + hash(i) * 0.4})`; x.beginPath(); x.arc(540 + (hash(i + 5) - 0.5) * 600, 300 - i * 50, 90 + hash(i + 6) * 80, 0, 7); x.fill(); }
    x.fillStyle = '#2a1a20'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  museumNight() { // museum hall at night: fossil display and spotlights
    const [c, x] = canvas(); fill(x, '#1f2440', '#121628');
    for (const sx of [200, 880]) { const g = x.createLinearGradient(sx, 0, sx, 1250); g.addColorStop(0, 'rgba(255,240,200,0.45)'); g.addColorStop(1, 'rgba(255,240,200,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(sx - 40, -OY); x.lineTo(sx + 40, -OY); x.lineTo(sx + 250, 1250); x.lineTo(sx - 250, 1250); x.fill(); }
    for (let k = 0; k < 3; k++) { rrect(x, 80 + k * 340, 420, 240, 300, 10); fs(x, '#c9b8a0', 9); rrect(x, 100 + k * 340, 440, 200, 260, 6); fs(x, '#3a3428', 0); }
    x.fillStyle = '#2a2a3a'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  dinoValley() { // Triassic valley with long-neck dinosaur silhouettes
    const [c, x] = canvas(); fill(x, '#ffcf8a', '#ffe9c8', -OY, 1100); sunDisk(x, 300, 300, 90, '255,230,170');
    for (const [dx, sc] of [[740, 1], [180, 0.6]]) { x.save(); x.translate(dx, 1150); x.scale(sc, sc); x.beginPath(); x.ellipse(0, -160, 220, 110, 0, 0, 7); x.moveTo(150, -200); x.quadraticCurveTo(260, -480, 330, -560); x.lineTo(380, -540); x.quadraticCurveTo(300, -440, 210, -150); x.moveTo(-200, -150); x.quadraticCurveTo(-380, -120, -460, -60); x.lineTo(-200, -110); for (const lx of [-140, -60, 60, 140]) x.rect(lx, -100, 50, 120); x.fillStyle = 'rgba(110,80,90,0.75)'; x.fill(); x.restore(); }
    x.fillStyle = '#c9a060'; x.fillRect(-OX, 1150, BW, 1100); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(BW, 1150); x.stroke();
    return finish(c);
  },
  pleasureHall() { // red-and-gold Wano pleasure hall with screens and lanterns
    const [c, x] = canvas(); fill(x, '#8a1a2a', '#5a0f1a');
    for (let k = 0; k < 6; k++) { rrect(x, -40 + k * 200, 300, 180, 900, 6); fs(x, '#f4e2c0', 7); x.strokeStyle = 'rgba(120,60,40,0.5)'; x.lineWidth = 4; for (let r = 1; r < 6; r++) { x.beginPath(); x.moveTo(-40 + k * 200, 300 + r * 150); x.lineTo(140 + k * 200, 300 + r * 150); x.stroke(); } }
    for (let i = 0; i < 4; i++) { x.beginPath(); x.ellipse(120 + i * 280, 200, 50, 70, 0, 0, 7); fs(x, '#ff6a3a', 7); }
    x.fillStyle = '#d9b44a'; x.fillRect(-OX, 1200, BW, 60); x.fillStyle = '#5a1a20'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  backyard() { // sunny backyard between two trees
    const [c, x] = canvas(); fill(x, '#8fd8ff', '#e6f6ff', -OY, 1000); cloud(x, 540, 300, 1);
    for (const tx of [40, 1040]) { A_rr(x, tx - 40, 500, 80, 800, 20, '#8a5a3c'); x.beginPath(); x.arc(tx, 430, 220, 0, 7); fs(x, '#5cc45a', 10); }
    x.fillStyle = '#ffffff'; for (let k = 0; k < 9; k++) x.fillRect(100 + k * 100, 1000, 40, 240);
    x.fillStyle = '#7fd36a'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  // ---------------- Straw-Straw short ----------------
  barn() { // red barn interior with hay bales
    const [c, x] = canvas(); fill(x, '#b5523a', '#8a3a2a');
    for (let k = -1; k < 12; k++) { x.strokeStyle = 'rgba(60,20,10,0.35)'; x.lineWidth = 6; x.beginPath(); x.moveTo(k * 100, -OY); x.lineTo(k * 100, 1300); x.stroke(); }
    x.beginPath(); x.moveTo(340, 1240); x.lineTo(340, 500); x.lineTo(740, 500); x.lineTo(740, 1240); fs(x, '#ffe9b0', 10); x.beginPath(); x.moveTo(340, 500); x.lineTo(740, 1240); x.moveTo(740, 500); x.lineTo(340, 1240); x.lineWidth = 14; x.strokeStyle = '#f4f4f4'; x.stroke();
    for (const [bx, by] of [[0, 1080], [120, 1080], [60, 940], [880, 1080], [980, 1080]]) { A_rr(x, bx - 60, by, 150, 150, 14, '#f2c94c'); x.strokeStyle = 'rgba(150,110,30,0.6)'; x.lineWidth = 4; for (let k = 1; k < 5; k++) { x.beginPath(); x.moveTo(bx - 60, by + k * 30); x.lineTo(bx + 90, by + k * 30); x.stroke(); } }
    x.fillStyle = '#d9b46a'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  wheatField() { // golden wheat field under a big sky
    const [c, x] = canvas(); fill(x, '#7fc8ff', '#fff2c0', -OY, 1000); sunDisk(x, 220, 300, 80); cloud(x, 820, 380, 0.9);
    x.fillStyle = '#f2c94c'; x.fillRect(-OX, 1000, BW, 1300); x.strokeStyle = '#d9a52e'; x.lineWidth = 5; for (let i = 0; i < 140; i++) { const wx = hash(i + 200) * 1240 - 80, wy = 1000 + hash(i + 201) * 300; x.beginPath(); x.moveTo(wx, wy + 120); x.quadraticCurveTo(wx + 10, wy + 40, wx + 4, wy); x.stroke(); x.beginPath(); x.ellipse(wx + 4, wy, 7, 18, 0.2, 0, 7); x.fillStyle = '#e8b52e'; x.fill(); }
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1000); x.lineTo(BW, 1000); x.stroke();
    return finish(c);
  },
  haystackFarm() { // farmyard with round haystacks and a fence
    const [c, x] = canvas(); fill(x, '#9ed8ff', '#f0f8ff', -OY, 1000);
    for (const [hx, hs] of [[160, 1], [900, 1.2], [560, 0.7]]) { x.save(); x.translate(hx, 1180); x.scale(hs, hs); x.beginPath(); x.moveTo(-180, 0); x.quadraticCurveTo(-170, -320, 0, -340); x.quadraticCurveTo(170, -320, 180, 0); x.closePath(); fs(x, '#f2c94c', 10); x.strokeStyle = 'rgba(150,110,30,0.5)'; x.lineWidth = 5; for (let k = 0; k < 7; k++) { x.beginPath(); x.moveTo(-150 + k * 50, -20); x.lineTo(-120 + k * 40, -280); x.stroke(); } x.restore(); }
    x.fillStyle = '#ffffff'; for (let k = 0; k < 12; k++) x.fillRect(-60 + k * 100, 1100, 30, 140); x.fillRect(-OX, 1140, BW, 20);
    x.fillStyle = '#8fcf6a'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  tarotStage() { // dark violet stage with giant tarot cards for the techniques stage
    const [c, x] = canvas(); fill(x, '#3a2050', '#1f1030');
    for (let i = 0; i < 5; i++) { x.save(); x.translate(80 + i * 230, 420 + (i % 2) * 60); x.rotate((i - 2) * 0.12); rrect(x, -90, -150, 180, 300, 14); fs(x, '#f4e2c0', 9); rrect(x, -70, -130, 140, 260, 8); x.lineWidth = 5; x.strokeStyle = '#c9a64a'; x.stroke(); x.beginPath(); x.arc(0, -20, 40, 0, 7); fs(x, ['#e8402e', '#3f9bff', '#ffcf3a', '#5cc45a', '#b07cff'][i], 5); x.restore(); }
    x.fillStyle = '#4a2a5a'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  harvestFair() { // autumn harvest fair: pumpkins and bunting
    const [c, x] = canvas(); fill(x, '#ffcf9a', '#ffe9d0', -OY, 1000);
    for (let i = 0; i < 6; i++) { const tx = -40 + i * 220; x.beginPath(); x.moveTo(tx, 700); x.lineTo(tx + 100, 560); x.lineTo(tx + 200, 700); x.closePath(); fs(x, i % 2 ? '#e8402e' : '#f4f4f4', 8); A_rr(x, tx + 10, 700, 180, 520, 4, i % 2 ? '#ffe0c0' : '#ffd0a0'); }
    for (let i = 0; i < 8; i++) { const px = 40 + i * 140; x.beginPath(); x.ellipse(px, 1200, 60, 46, 0, 0, 7); fs(x, '#ff8a2e', 8); A_rr(x, px - 6, 1140, 12, 20, 4, '#4f8a2e'); }
    x.fillStyle = '#c99b6d'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  boxingGym() { // old boxing gym: punching bags and a poster wall
    const [c, x] = canvas(); fill(x, '#5a6a7a', '#3a4654');
    for (let i = 0; i < 4; i++) { rrect(x, 60 + i * 260, 200, 180, 240, 8); fs(x, ['#ffcf3a', '#e8402e', '#f4f4f4', '#3f9bff'][i], 8); x.fillStyle = OL; x.font = 'bold 40px sans-serif'; x.textAlign = 'center'; x.fillText('FIGHT', 150 + i * 260, 330); }
    for (const bx of [140, 940]) { x.beginPath(); x.moveTo(bx, -OY); x.lineTo(bx, 560); x.lineWidth = 8; x.strokeStyle = '#2a2a2a'; x.stroke(); A_rr(x, bx - 70, 560, 140, 340, 60, '#b5223a'); }
    x.fillStyle = '#8a6a4a'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  voodooShop() { // dim shop with shelves of straw dolls and candles
    const [c, x] = canvas(); fill(x, '#4a2a3a', '#2a1420');
    for (let r = 0; r < 4; r++) { const y = 250 + r * 260; x.fillStyle = '#6b4630'; x.fillRect(-OX, y + 150, BW, 30); for (let k = 0; k < 7; k++) { const dx = 20 + k * 160; x.beginPath(); x.arc(dx + 60, y + 60, 32, 0, 7); fs(x, '#e8c870', 6); A_rr(x, dx + 40, y + 90, 40, 60, 10, '#e8c870'); } }
    for (let i = 0; i < 5; i++) { const cx = 100 + i * 220; A_rr(x, cx - 14, 1150, 28, 90, 6, '#f4ead2'); x.fillStyle = 'rgba(255,200,90,0.35)'; x.beginPath(); x.arc(cx, 1130, 60, 0, 7); x.fill(); x.fillStyle = '#ffcf3a'; x.beginPath(); x.ellipse(cx, 1130, 10, 18, 0, 0, 7); x.fill(); }
    x.fillStyle = '#3a2028'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  duskField() { // empty field at dusk with crows and a fence
    const [c, x] = canvas(); fill(x, '#ff9a6b', '#6a3a7a', -OY, 1150); sunDisk(x, 540, 1050, 110, '255,200,120');
    x.fillStyle = OL; for (let i = 0; i < 7; i++) { const bx = 120 + hash(i + 300) * 840, by = 200 + hash(i + 301) * 400; x.beginPath(); x.moveTo(bx - 30, by); x.quadraticCurveTo(bx - 10, by - 18, bx, by); x.quadraticCurveTo(bx + 10, by - 18, bx + 30, by); x.lineWidth = 6; x.strokeStyle = OL; x.stroke(); }
    x.fillStyle = '#5a4a3a'; x.fillRect(-OX, 1150, BW, 1100); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(BW, 1150); x.stroke();
    return finish(c);
  },
  candleRoom() { // dark red room lit by candles, tarot cards on a table
    const [c, x] = canvas(); fill(x, '#3a0f1a', '#1a0810');
    for (let i = 0; i < 7; i++) { const cx = 60 + i * 160, cy = 300 + (i % 3) * 180; x.fillStyle = 'rgba(255,170,80,0.18)'; x.beginPath(); x.arc(cx, cy, 120, 0, 7); x.fill(); }
    x.beginPath(); x.ellipse(540, 1250, 560, 120, 0, 0, 7); fs(x, '#5a1a2a', 10);
    x.fillStyle = '#1a0810'; x.fillRect(-OX, 1300, BW, 1000);
    return finish(c, 10);
  },
  cornMaze() { // tall corn maze walls
    const [c, x] = canvas(); fill(x, '#a8e0ff', '#e8f6ff', -OY, 700);
    for (let r = 0; r < 3; r++) { const y = 600 + r * 160; x.beginPath(); x.rect(-OX, y, BW, 700 - r * 160); fs(x, ['#7aa83a', '#8ab84a', '#9ac85a'][r], 8); x.strokeStyle = 'rgba(60,90,30,0.5)'; x.lineWidth = 6; for (let k = 0; k < 18; k++) { x.beginPath(); x.moveTo(-60 + k * 70, y + 30); x.lineTo(-40 + k * 70, y + 200); x.stroke(); } }
    x.fillStyle = '#c9a06a'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  wanoRoofNight() { // Wano castle rooftop under a full moon
    const [c, x] = canvas(); fill(x, '#1a1a3a', '#3a2a5a', -OY, 1300); x.beginPath(); x.arc(780, 360, 150, 0, 7); x.fillStyle = '#fff4c8'; x.fill();
    x.beginPath(); x.moveTo(-OX, 1050); x.quadraticCurveTo(300, 960, 540, 1000); x.quadraticCurveTo(780, 960, BW, 1050); x.lineTo(BW, 1300); x.lineTo(-OX, 1300); x.closePath(); fs(x, '#2a2436', 10);
    x.strokeStyle = 'rgba(255,255,255,0.15)'; x.lineWidth = 6; for (let k = 0; k < 14; k++) { x.beginPath(); x.moveTo(-60 + k * 90, 1020); x.lineTo(-80 + k * 90, 1300); x.stroke(); }
    x.fillStyle = '#1f1a2a'; x.fillRect(-OX, 1300, BW, 1000);
    return finish(c);
  },
  hayLoft() { // hay loft with a big haystack and a sunbeam
    const [c, x] = canvas(); fill(x, '#a27a5a', '#7a5a40');
    const g = x.createLinearGradient(700, -OY, 300, 1300); g.addColorStop(0, 'rgba(255,240,180,0.6)'); g.addColorStop(1, 'rgba(255,240,180,0)'); x.fillStyle = g; x.beginPath(); x.moveTo(700, -OY); x.lineTo(900, -OY); x.lineTo(600, 1300); x.lineTo(200, 1300); x.fill();
    x.beginPath(); x.moveTo(500, 1260); x.quadraticCurveTo(520, 700, 800, 680); x.quadraticCurveTo(1100, 700, 1160, 1260); x.closePath(); fs(x, '#f2c94c', 10);
    x.fillStyle = '#8a6a4a'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  // ---------------- Swamp-Swamp short ----------------
  bayou() { // misty bayou with mossy trees
    const [c, x] = canvas(); fill(x, '#b8d8b0', '#7a9a6a');
    for (const [tx, s] of [[60, 1], [980, 1.1], [520, 0.6]]) { A_rr(x, tx - 40 * s, 200, 80 * s, 1050, 20, '#5a4a3a'); x.fillStyle = 'rgba(90,130,70,0.85)'; for (let i = 0; i < 8; i++) { x.beginPath(); x.ellipse(tx + (i - 4) * 50 * s, 300 + (i % 3) * 30, 50 * s, 160 * s, 0, 0, 7); x.fill(); } }
    x.fillStyle = 'rgba(255,255,255,0.3)'; for (let i = 0; i < 5; i++) x.fillRect(-OX, 700 + i * 120, BW, 40);
    x.fillStyle = '#4a5a3a'; x.fillRect(-OX, 1250, BW, 1000); x.fillStyle = 'rgba(120,150,90,0.5)'; for (let i = 0; i < 8; i++) { x.beginPath(); x.ellipse(hash(i + 400) * 1080, 1350 + hash(i + 401) * 400, 70, 20, 0, 0, 7); x.fill(); }
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  lilyPond() { // calm pond with lily pads
    const [c, x] = canvas(); fill(x, '#7fd0b0', '#3a8a7a');
    for (let i = 0; i < 12; i++) { const lx = hash(i + 410) * 1080, ly = hash(i + 411) * 1900, r = 50 + hash(i + 412) * 50; x.beginPath(); x.moveTo(lx, ly); x.arc(lx, ly, r, 0.3, 6.0); x.closePath(); fs(x, '#5cc45a', 6); if (i % 3 === 0) { x.beginPath(); x.arc(lx, ly, 20, 0, 7); fs(x, '#ff9ccf', 4); } }
    x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 4; for (let i = 0; i < 8; i++) { x.beginPath(); x.ellipse(hash(i + 420) * 1080, hash(i + 421) * 1900, 80, 20, 0, 0, 7); x.stroke(); }
    return finish(c, 8);
  },
  mangrove() { // mangrove roots over brown water
    const [c, x] = canvas(); fill(x, '#cfe8c0', '#9ac08a', -OY, 900);
    for (let i = 0; i < 6; i++) { const tx = -20 + i * 220; A_rr(x, tx - 20, -OY, 40, 1000, 10, '#6b5040'); for (let k = -2; k <= 2; k++) { x.beginPath(); x.moveTo(tx, 760); x.quadraticCurveTo(tx + k * 60, 900, tx + k * 90, 1100); x.lineWidth = 16; x.strokeStyle = '#6b5040'; x.stroke(); } x.beginPath(); x.arc(tx, 100, 160, 0, 7); fs(x, '#4f9a3a', 8); }
    x.fillStyle = '#7a6040'; x.fillRect(-OX, 1100, BW, 1200); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1100); x.lineTo(BW, 1100); x.stroke();
    return finish(c);
  },
  marshStage() { // wooden stage on stilts in a marsh, for the techniques
    const [c, x] = canvas(); fill(x, '#ffd9a0', '#a8c890', -OY, 1100);
    for (let i = 0; i < 9; i++) { const rx = hash(i + 430) * 1080; x.beginPath(); x.moveTo(rx, 1250); x.lineTo(rx + 6, 1000); x.lineWidth = 8; x.strokeStyle = '#5a7a3a'; x.stroke(); x.beginPath(); x.ellipse(rx + 6, 990, 10, 30, 0, 0, 7); x.fillStyle = '#7a4a2a'; x.fill(); }
    x.fillStyle = '#a26d45'; x.fillRect(-OX, 1180, BW, 80); x.fillStyle = '#5a6a3a'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1180); x.lineTo(BW, 1180); x.stroke();
    return finish(c);
  },
  seaFort() { // stone sea fort with cannon ports
    const [c, x] = canvas(); fill(x, '#8fd0ff', '#e0f4ff', -OY, 900);
    x.beginPath(); x.rect(-OX, 400, BW, 850); fs(x, '#b8b0a0', 10); for (let k = 0; k < 7; k++) { x.beginPath(); x.rect(-60 + k * 180, 330, 100, 80); fs(x, '#b8b0a0', 8); }
    for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(200 + k * 340, 760, 70, 0, 7); fs(x, '#3a3346', 9); }
    x.fillStyle = '#a89878'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  treasureCave() { // cave with glittering gold piles
    const [c, x] = canvas(); fill(x, '#3a2a4a', '#1f1428');
    x.beginPath(); x.moveTo(-OX, -OY); x.lineTo(BW, -OY); x.lineTo(BW, 300); x.quadraticCurveTo(540, 600, -OX, 300); x.closePath(); fs(x, '#2a1f36', 0);
    for (const [gx, gr] of [[150, 260], [900, 300], [540, 180]]) { x.beginPath(); x.arc(gx, 1250, gr, Math.PI, 0); fs(x, '#ffcf3a', 10); x.fillStyle = '#fff4b0'; for (let i = 0; i < 12; i++) { x.beginPath(); x.arc(gx + (hash(i + gx) - 0.5) * gr * 1.4, 1250 - hash(i + gx + 1) * gr * 0.8, 10, 0, 7); x.fill(); } }
    x.fillStyle = '#2a2036'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  fogMarsh() { // grey-green marsh in thick fog
    const [c, x] = canvas(); fill(x, '#a8b8a8', '#6a7a6a');
    for (let i = 0; i < 10; i++) { x.fillStyle = 'rgba(255,255,255,0.28)'; x.beginPath(); x.ellipse(hash(i + 440) * 1080, 300 + i * 110, 400, 70, 0, 0, 7); x.fill(); }
    for (let i = 0; i < 4; i++) { const tx = 80 + i * 300; x.beginPath(); x.moveTo(tx, 1250); x.lineTo(tx + 10, 500); x.lineTo(tx - 60, 420); x.moveTo(tx + 6, 640); x.lineTo(tx + 80, 560); x.lineWidth = 18; x.strokeStyle = '#4a4a3a'; x.stroke(); }
    x.fillStyle = '#4a5a40'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c, 10);
  },
  wreckDeck() { // tilted deck of a wrecked ship at sunset
    const [c, x] = canvas(); fill(x, '#ff8a5a', '#ffd0a0', -OY, 1000);
    x.save(); x.translate(540, 900); x.rotate(-0.08); A_rr(x, -60, -800, 40, 900, 6, '#5a3a26'); x.beginPath(); x.moveTo(-40, -760); x.lineTo(300, -500); x.lineTo(-40, -300); x.closePath(); fs(x, '#e8dcc0', 8); x.restore();
    x.save(); x.translate(540, 1240); x.rotate(-0.04); x.fillStyle = '#8a5a3c'; x.fillRect(-800, 0, 1600, 1000); x.strokeStyle = 'rgba(60,30,15,0.5)'; x.lineWidth = 6; for (let k = 0; k < 12; k++) { x.beginPath(); x.moveTo(-800, k * 60); x.lineTo(800, k * 60); x.stroke(); } x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-800, 0); x.lineTo(800, 0); x.stroke(); x.restore();
    return finish(c);
  },
  cellarBarrels() { // dim cellar full of barrels
    const [c, x] = canvas(); fill(x, '#4a3a30', '#2a201a');
    for (let r = 0; r < 3; r++) for (let k = 0; k < 6; k++) { const bx = -40 + k * 200 + (r % 2) * 100, by = 300 + r * 280; x.beginPath(); x.ellipse(bx, by, 90, 110, 0, 0, 7); fs(x, '#8a5a3c', 8); x.strokeStyle = '#3a2a20'; x.lineWidth = 8; for (const d of [-50, 50]) { x.beginPath(); x.ellipse(bx, by + d, 88, 16, 0, 0, Math.PI); x.stroke(); } }
    x.fillStyle = '#3a2a20'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  pantry() { // pantry with shelves of jars
    const [c, x] = canvas(); fill(x, '#f2e2c0', '#e0c8a0');
    for (let r = 0; r < 5; r++) { const y = 200 + r * 240; x.fillStyle = '#a26d45'; x.fillRect(-OX, y + 170, BW, 24); for (let k = 0; k < 7; k++) { A_rr(x, -20 + k * 160, y + 40, 110, 130, 18, ['#ff9a6a', '#9ae07a', '#ffd06a', '#c8a0ff'][(k + r) % 4]); A_rr(x, -10 + k * 160, y + 20, 90, 28, 6, '#d9dce6'); } }
    x.fillStyle = '#b89a7a'; x.fillRect(-OX, 1260, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1260); x.lineTo(BW, 1260); x.stroke();
    return finish(c);
  },
  bubbleGrove() { // giant mangrove grove with floating bubbles
    const [c, x] = canvas(); fill(x, '#c8f0e0', '#9ad8c8');
    for (const tx of [100, 980]) { A_rr(x, tx - 90, -OY, 180, 1400, 40, '#a07a5a'); }
    for (let i = 0; i < 14; i++) { const bx = hash(i + 450) * 1080, by = hash(i + 451) * 1200, r = 40 + hash(i + 452) * 70; x.beginPath(); x.arc(bx, by, r, 0, 7); x.fillStyle = 'rgba(255,255,255,0.3)'; x.fill(); x.lineWidth = 5; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke(); x.beginPath(); x.arc(bx - r * 0.35, by - r * 0.35, r * 0.15, 0, 7); x.fillStyle = '#fff'; x.fill(); }
    x.fillStyle = '#8ab878'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  schoolHall() { // school hallway with lockers
    const [c, x] = canvas(); fill(x, '#e8eef6', '#cfd8e6');
    for (let k = 0; k < 8; k++) { A_rr(x, -40 + k * 145, 380, 135, 860, 6, '#3f9bff'); for (let v = 0; v < 3; v++) { x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-10 + k * 145, 440 + v * 22, 80, 8); } x.beginPath(); x.arc(70 + k * 145, 800, 10, 0, 7); x.fillStyle = '#d9dce6'; x.fill(); }
    x.fillStyle = '#c9b8a0'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  // ---------------- Bis-Bis short ----------------
  bakery() { // cosy bakery with a counter and bread shelves
    const [c, x] = canvas(); fill(x, '#ffe0c0', '#f2c8a0');
    for (let r = 0; r < 3; r++) { x.fillStyle = '#a26d45'; x.fillRect(-OX, 300 + r * 230, BW, 24); for (let k = 0; k < 7; k++) { x.beginPath(); x.ellipse(40 + k * 160, 270 + r * 230, 60, 34, 0, 0, 7); fs(x, ['#e8a85a', '#d9904a', '#f2c070'][(k + r) % 3], 6); } }
    A_rr(x, -OX, 1050, BW, 200, 0, '#c97a5a'); x.fillStyle = '#e8d4b8'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  cookieJar() { // giant glass cookie jar on a checked tablecloth
    const [c, x] = canvas(); fill(x, '#ffd6e0', '#ffb8cc');
    rrect(x, 140, 300, 800, 950, 120); x.fillStyle = 'rgba(220,240,255,0.5)'; x.fill(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
    for (let i = 0; i < 14; i++) { x.beginPath(); x.arc(220 + (i % 5) * 160, 1100 - Math.floor(i / 5) * 150, 70, 0, 7); fs(x, '#e8b86a', 7); x.fillStyle = '#7a4a2a'; for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(220 + (i % 5) * 160 + (hash(i * 4 + k) - 0.5) * 80, 1100 - Math.floor(i / 5) * 150 + (hash(i * 4 + k + 1) - 0.5) * 80, 9, 0, 7); x.fill(); } }
    for (let r = 0; r < 10; r++) for (let k = 0; k < 12; k++) { x.fillStyle = (r + k) % 2 ? '#e8402e' : '#ffffff'; x.fillRect(-80 + k * 110, 1250 + r * 90, 110, 90); }
    return finish(c);
  },
  bakeryOven() { // big brick oven glowing orange
    const [c, x] = canvas(); fill(x, '#c97a5a', '#a25a40');
    for (let r = 0; r < 20; r++) for (let k = 0; k < 9; k++) { x.strokeStyle = 'rgba(80,30,20,0.35)'; x.lineWidth = 5; x.strokeRect(-60 + k * 140 + (r % 2) * 70, -120 + r * 70, 140, 70); }
    x.beginPath(); x.moveTo(240, 1150); x.lineTo(240, 700); x.arc(540, 700, 300, Math.PI, 0); x.lineTo(840, 1150); x.closePath(); fs(x, '#2a1410', 12);
    const g = x.createRadialGradient(540, 1000, 40, 540, 1000, 340); g.addColorStop(0, 'rgba(255,190,90,0.9)'); g.addColorStop(1, 'rgba(255,120,40,0)'); x.fillStyle = g; x.fillRect(240, 500, 600, 650);
    x.fillStyle = '#6b4630'; x.fillRect(-OX, 1150, BW, 1100); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(BW, 1150); x.stroke();
    return finish(c);
  },
  cakeStage() { // pastel cake-tier stage
    const [c, x] = canvas(); fill(x, '#ffe8f4', '#ffd0e8');
    for (let i = 0; i < 3; i++) { const w = 1100 - i * 280, y = 1000 - i * 180; A_rr(x, 540 - w / 2, y, w, 200, 40, ['#ff9ccf', '#fff3d0', '#a8e0ff'][i]); for (let k = 0; k < 10; k++) { x.beginPath(); x.arc(540 - w / 2 + 30 + k * (w - 60) / 9, y, 26, 0, Math.PI); fs(x, '#ffffff', 5); } }
    x.fillStyle = '#ff8cbc'; x.fillRect(-OX, 1200, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1200); x.lineTo(BW, 1200); x.stroke();
    return finish(c);
  },
  candyTown() { // candy town street: lollipop trees and frosted roofs
    const [c, x] = canvas(); fill(x, '#a8e0ff', '#fff0f8', -OY, 1000);
    for (let i = 0; i < 5; i++) { const hx = -40 + i * 230; x.beginPath(); x.rect(hx, 650, 200, 590); fs(x, ['#ffb8d0', '#c8e8ff', '#fff0b0'][i % 3], 9); x.beginPath(); x.moveTo(hx - 20, 660); x.quadraticCurveTo(hx + 100, 520, hx + 220, 660); x.closePath(); fs(x, '#ffffff', 9); }
    for (const lx of [120, 940]) { A_rr(x, lx - 10, 800, 20, 450, 8, '#f4f4f4'); x.beginPath(); x.arc(lx, 760, 90, 0, 7); fs(x, '#ff5a8a', 8); x.strokeStyle = '#ffffff'; x.lineWidth = 12; x.beginPath(); x.arc(lx, 760, 50, 0, 5); x.stroke(); }
    x.fillStyle = '#ffd0a0'; x.fillRect(-OX, 1240, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1240); x.lineTo(BW, 1240); x.stroke();
    return finish(c);
  },
  paradeGround() { // castle parade ground with banners
    const [c, x] = canvas(); fill(x, '#ffd8b0', '#fff4e0', -OY, 1000);
    x.beginPath(); x.rect(-OX, 500, BW, 700); fs(x, '#e8c8a8', 10); for (let k = 0; k < 8; k++) { x.beginPath(); x.rect(-60 + k * 160, 430, 90, 80); fs(x, '#e8c8a8', 8); }
    for (let k = 0; k < 4; k++) { const bx = 80 + k * 300; x.beginPath(); x.moveTo(bx, 560); x.lineTo(bx + 120, 560); x.lineTo(bx + 120, 900); x.lineTo(bx + 60, 850); x.lineTo(bx, 900); x.closePath(); fs(x, k % 2 ? '#ff5a8a' : '#7a5ab5', 7); }
    x.fillStyle = '#d9b48a'; x.fillRect(-OX, 1200, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1200); x.lineTo(BW, 1200); x.stroke();
    return finish(c);
  },
  sweetHall() { // grand candy-castle hall with chandeliers
    const [c, x] = canvas(); fill(x, '#ffd0e8', '#e8a8d0');
    for (let k = 0; k < 4; k++) A_rr(x, 30 + k * 300, 200, 90, 1050, 30, '#fff3d0');
    for (const cx of [300, 780]) { x.beginPath(); x.moveTo(cx, -OY); x.lineTo(cx, 200); x.lineWidth = 6; x.strokeStyle = '#c9a64a'; x.stroke(); x.beginPath(); x.ellipse(cx, 240, 140, 50, 0, 0, 7); fs(x, '#ffd34d', 8); }
    x.fillStyle = '#c86aa0'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  forge() { // blacksmith forge with an anvil and sparks
    const [c, x] = canvas(); fill(x, '#3a2a2a', '#1f1414');
    const g = x.createRadialGradient(850, 800, 40, 850, 800, 500); g.addColorStop(0, 'rgba(255,140,40,0.7)'); g.addColorStop(1, 'rgba(255,90,20,0)'); x.fillStyle = g; x.fillRect(-OX, -OY, BW, BH);
    x.beginPath(); x.moveTo(650, 1250); x.lineTo(700, 700); x.lineTo(1000, 700); x.lineTo(1050, 1250); fs(x, '#4a3a3a', 10); x.fillStyle = '#ff8a2e'; x.fillRect(730, 760, 240, 120);
    x.fillStyle = '#ffd34d'; for (let i = 0; i < 30; i++) { x.beginPath(); x.arc(700 + hash(i + 500) * 300, 300 + hash(i + 501) * 450, 4, 0, 7); x.fill(); }
    x.fillStyle = '#2a2020'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  rainCafe() { // café window streaked with rain
    const [c, x] = canvas(); fill(x, '#5a6a8a', '#3a4660');
    rrect(x, 80, 200, 920, 900, 20); fs(x, '#7a8aa8', 14); x.beginPath(); x.moveTo(540, 200); x.lineTo(540, 1100); x.moveTo(80, 650); x.lineTo(1000, 650); x.lineWidth = 14; x.strokeStyle = OL; x.stroke();
    x.strokeStyle = 'rgba(220,235,255,0.55)'; x.lineWidth = 5; for (let i = 0; i < 40; i++) { const rx = 100 + hash(i + 520) * 880, ry = 220 + hash(i + 521) * 840; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 4, ry + 50); x.stroke(); }
    x.fillStyle = '#6b4630'; x.fillRect(-OX, 1180, BW, 1100); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1180); x.lineTo(BW, 1180); x.stroke();
    return finish(c);
  },
  drizzleTown() { // daytime rain over a town square with puddles
    const [c, x] = canvas(); fill(x, '#a8b8c8', '#c8d4e0', -OY, 1000);
    for (let i = 0; i < 6; i++) { const hx = -60 + i * 210; x.beginPath(); x.rect(hx, 600, 180, 600); fs(x, '#b0a8b8', 8); }
    x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 4; for (let i = 0; i < 140; i++) { const rx = hash(i + 530) * 1200 - 60, ry = hash(i + 531) * 1900; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 10, ry + 50); x.stroke(); }
    x.fillStyle = '#8a8a98'; x.fillRect(-OX, 1200, BW, 1000); x.fillStyle = 'rgba(200,220,255,0.6)'; for (let i = 0; i < 5; i++) { x.beginPath(); x.ellipse(100 + i * 220, 1400 + (i % 2) * 200, 110, 26, 0, 0, 7); x.fill(); }
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1200); x.lineTo(BW, 1200); x.stroke();
    return finish(c);
  },
  mirrorWorld() { // purple mirror world full of floating shards
    const [c, x] = canvas(); fill(x, '#6a4ab5', '#2a1a5a');
    for (let i = 0; i < 16; i++) { const sx = hash(i + 540) * 1080, sy = hash(i + 541) * 1800; x.save(); x.translate(sx, sy); x.rotate(hash(i + 542) * 3); x.beginPath(); x.moveTo(0, -80); x.lineTo(60, 40); x.lineTo(-50, 70); x.closePath(); x.fillStyle = 'rgba(200,230,255,0.55)'; x.fill(); x.lineWidth = 4; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke(); x.restore(); }
    x.fillStyle = '#3a2a7a'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c, 8);
  },
  snackAisle() { // supermarket snack aisle
    const [c, x] = canvas(); fill(x, '#f4f4f8', '#e0e0ea');
    for (let r = 0; r < 5; r++) { const y = 200 + r * 210; x.fillStyle = '#c9ccd6'; x.fillRect(-OX, y + 160, BW, 20); for (let k = 0; k < 9; k++) A_rr(x, -40 + k * 125, y + 30, 100, 130, 10, ['#e8402e', '#ffcf3a', '#3f9bff', '#5cc45a', '#ff8a2e'][(k + r) % 5]); }
    x.fillStyle = '#d9dce6'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  // ---------------- Phoenix short ----------------
  cliffNest() { // giant twig nest on a cliff top above the clouds
    const [c, x] = canvas(); fill(x, '#ffcfa0', '#a8d8ff'); for (let i = 0; i < 5; i++) cloud(x, hash(i + 600) * 1080, 900 + hash(i + 601) * 300, 1.1);
    x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(300, 1180); x.lineTo(900, 1160); x.lineTo(BW, 1200); x.lineTo(BW, BH); x.lineTo(-OX, BH); fs(x, '#8a7a6a', 10);
    x.beginPath(); x.ellipse(540, 1180, 420, 90, 0, 0, 7); fs(x, '#a2763e', 10); x.strokeStyle = '#6b4a2a'; x.lineWidth = 8; for (let i = 0; i < 24; i++) { const a = hash(i + 610) * 3.14; x.beginPath(); x.moveTo(540 + Math.cos(a) * 400, 1180 - Math.sin(a) * 40); x.lineTo(540 - Math.cos(a) * 380, 1190 + Math.sin(a) * 50); x.stroke(); }
    return finish(c);
  },
  tropicalBeach() { // tropical beach with pineapple plants
    const [c, x] = canvas(); fill(x, '#7fd8ff', '#c8f4ff', -OY, 900);
    x.fillStyle = '#3fb8d8'; x.fillRect(-OX, 900, BW, 250); x.fillStyle = '#f8e2b0'; x.fillRect(-OX, 1150, BW, 1100);
    for (const px of [120, 960]) { for (let k = 0; k < 7; k++) { x.save(); x.translate(px, 1250); x.rotate(-1.2 + k * 0.4); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(30, -140, 0, -260); x.quadraticCurveTo(-30, -140, 0, 0); fs(x, '#4f9a3a', 6); x.restore(); } }
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(BW, 1150); x.stroke();
    return finish(c);
  },
  auroraSky() { // night sky with a blue-green aurora
    const [c, x] = canvas(); fill(x, '#0a1028', '#1a2a50');
    for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(-OX, 400 + i * 140); for (let k = 0; k <= 12; k++) x.lineTo(-OX + k * 110, 400 + i * 140 + Math.sin(k * 0.8 + i) * 90); x.lineWidth = 70 - i * 10; x.strokeStyle = `rgba(${90 + i * 20},${230 - i * 20},${200 + i * 10},0.35)`; x.stroke(); }
    for (let i = 0; i < 60; i++) { x.fillStyle = 'rgba(255,255,255,0.8)'; x.beginPath(); x.arc(hash(i + 620) * 1080, hash(i + 621) * 1300, 2 + hash(i + 622) * 2, 0, 7); x.fill(); }
    x.fillStyle = '#1a2436'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  blueAltar() { // stone altar with blue braziers, for the techniques stage
    const [c, x] = canvas(); fill(x, '#2a3a6a', '#1a2448');
    for (const bx of [120, 960]) { A_rr(x, bx - 40, 700, 80, 500, 10, '#8a8aa0'); x.beginPath(); x.moveTo(bx - 90, 700); x.lineTo(bx + 90, 700); x.lineTo(bx + 60, 640); x.lineTo(bx - 60, 640); fs(x, '#8a8aa0', 8); x.fillStyle = 'rgba(90,200,255,0.5)'; x.beginPath(); x.ellipse(bx, 560, 70, 100, 0, 0, 7); x.fill(); }
    x.fillStyle = '#5a6a8a'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  seaArch() { // giant rock arch over a bright sea
    const [c, x] = canvas(); fill(x, '#7fd0ff', '#d8f2ff', -OY, 1150); cloud(x, 260, 260, 0.9);
    x.beginPath(); x.moveTo(60, 1300); x.lineTo(120, 600); x.quadraticCurveTo(540, 160, 960, 600); x.lineTo(1020, 1300); x.lineTo(820, 1300); x.lineTo(800, 760); x.quadraticCurveTo(540, 420, 280, 760); x.lineTo(260, 1300); x.closePath(); fs(x, '#c9a880', 11);
    x.fillStyle = '#2f8fd6'; x.fillRect(-OX, 1150, BW, 1100); waves(x, 1300, 'rgba(255,255,255,0.5)', 12, 12);
    return finish(c);
  },
  fieldHospital() { // white field-hospital tent with cots
    const [c, x] = canvas(); fill(x, '#f4f8ff', '#dfe8f4');
    x.beginPath(); x.moveTo(-OX, 500); x.lineTo(540, 80); x.lineTo(BW, 500); x.closePath(); fs(x, '#e8eef6', 10); x.fillStyle = '#e8402e'; x.fillRect(500, 220, 80, 24); x.fillRect(528, 192, 24, 80);
    for (let k = 0; k < 3; k++) { A_rr(x, 40 + k * 360, 1100, 300, 60, 14, '#ffffff'); A_rr(x, 40 + k * 360, 1060, 90, 50, 14, '#cfe0f4'); }
    x.fillStyle = '#c9c0a8'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  sphinxVillage() { // small island village with a big sphinx-like statue
    const [c, x] = canvas(); fill(x, '#ffe0b0', '#fff4e0', -OY, 1000);
    x.beginPath(); x.moveTo(600, 1150); x.lineTo(620, 700); x.quadraticCurveTo(760, 560, 900, 700); x.lineTo(960, 1150); fs(x, '#d9b48a', 10); x.beginPath(); x.arc(760, 640, 110, 0, 7); fs(x, '#d9b48a', 10);
    for (let i = 0; i < 4; i++) { const hx = -40 + i * 160; x.beginPath(); x.rect(hx, 900, 140, 260); fs(x, '#f4ead2', 8); x.beginPath(); x.moveTo(hx - 10, 900); x.lineTo(hx + 70, 840); x.lineTo(hx + 150, 900); fs(x, '#e8822e', 8); }
    x.fillStyle = '#e8c890'; x.fillRect(-OX, 1150, BW, 1100); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1150); x.lineTo(BW, 1150); x.stroke();
    return finish(c);
  },
  sunsetClouds() { // high sky at sunset, pink-orange clouds
    const [c, x] = canvas(); fill(x, '#ff8a6a', '#ffd08a'); sunDisk(x, 540, 1300, 140, '255,230,170');
    for (let i = 0; i < 8; i++) { x.fillStyle = 'rgba(255,190,200,0.85)'; x.beginPath(); x.ellipse(hash(i + 630) * 1080, 200 + i * 200, 260, 60, 0, 0, 7); x.fill(); }
    return finish(c);
  },
  jailCell() { // grey prison cell with bars and chains
    const [c, x] = canvas(); fill(x, '#6a6a7a', '#4a4a58');
    for (let r = 0; r < 20; r++) for (let k = 0; k < 7; k++) { x.strokeStyle = 'rgba(30,30,40,0.35)'; x.lineWidth = 5; x.strokeRect(-60 + k * 180 + (r % 2) * 90, -120 + r * 90, 180, 90); }
    for (let k = 0; k < 9; k++) A_rr(x, -20 + k * 130, -OY, 30, 1450, 12, '#3a3a46');
    x.fillStyle = '#3a3a46'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  marineHQ() { // marine headquarters wall with a big MARINE sign
    const [c, x] = canvas(); fill(x, '#9ed8ff', '#e8f6ff', -OY, 800);
    x.beginPath(); x.rect(-OX, 300, BW, 950); fs(x, '#f4f4f8', 10); for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) { rrect(x, -20 + k * 190, 520 + r * 170, 110, 110, 10); fs(x, '#5a8ac8', 6); }
    x.font = 'bold 120px sans-serif'; x.textAlign = 'center'; x.fillStyle = '#2a5ab8'; x.fillText('MARINE', 540, 450);
    x.fillStyle = '#c9c4b8'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
  mobyDeck() { // a big pirate ship deck with a white whale figurehead and the sea
    const [c, x] = canvas(); fill(x, '#8fd8ff', '#e0f6ff', -OY, 900);
    x.fillStyle = '#2f8fd6'; x.fillRect(-OX, 800, BW, 300);
    x.beginPath(); x.ellipse(880, 620, 260, 150, 0, 0, 7); fs(x, '#f4f4f8', 11); x.beginPath(); x.arc(980, 580, 18, 0, 7); x.fillStyle = OL; x.fill(); x.beginPath(); x.moveTo(1000, 680); x.quadraticCurveTo(920, 720, 840, 690); x.lineWidth = 8; x.strokeStyle = OL; x.stroke();
    A_rr(x, 200, -OY, 50, 1100, 8, '#6b4630'); x.beginPath(); x.moveTo(250, 0); x.quadraticCurveTo(520, 120, 250, 520); fs(x, '#f4ead2', 8);
    x.fillStyle = '#a26d45'; x.fillRect(-OX, 1100, BW, 1200); x.strokeStyle = 'rgba(60,30,15,0.5)'; x.lineWidth = 6; for (let k = 0; k < 18; k++) { x.beginPath(); x.moveTo(-OX, 1150 + k * 60); x.lineTo(BW, 1150 + k * 60); x.stroke(); }
    x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1100); x.lineTo(BW, 1100); x.stroke();
    return finish(c);
  },
  firstAid() { // pharmacy shelves full of band-aid boxes
    const [c, x] = canvas(); fill(x, '#e8f8f4', '#c8ece4');
    for (let r = 0; r < 5; r++) { const y = 200 + r * 210; x.fillStyle = '#ffffff'; x.fillRect(-OX, y + 160, BW, 20); for (let k = 0; k < 7; k++) { A_rr(x, -20 + k * 160, y + 40, 120, 120, 12, ['#ffffff', '#ffd0d0', '#d0e8ff'][(k + r) % 3]); x.fillStyle = '#e8402e'; x.fillRect(20 + k * 160, y + 90, 40, 14); x.fillRect(33 + k * 160, y + 77, 14, 40); } }
    x.fillStyle = '#b8d8d0'; x.fillRect(-OX, 1250, BW, 1000); x.lineWidth = 10; x.strokeStyle = OL; x.beginPath(); x.moveTo(-OX, 1250); x.lineTo(BW, 1250); x.stroke();
    return finish(c);
  },
};





function A_rr(x, X, Y, w, h, r, col) { rrect(x, X, Y, w, h, r); fs(x, col, 8); }


function A_leaf(x) { fs(x, '#3fb85a', 7); }
function A_pan(x) { fs(x, '#3a3346', 8); }
function A_blade(x) { x.beginPath(); x.moveTo(0, 0); x.lineTo(30, -230); x.lineTo(-30, -230); x.closePath(); fs(x, '#f4ead2', 8); }
