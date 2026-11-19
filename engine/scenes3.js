// Composable painted sets for batch 3: each set is a spec (sky, ground, props) turned into a background by register(BG, h).
// h = { canvas, fill, finish, cloud, sunDisk, waves, rrect, fs, OL, hash, OX, OY, BW, BH }
export const SPECS = {};
export function scene(name, spec) { SPECS[name] = spec; }

const P = {
  clouds(x, h, o) { for (let i = 0; i < (o.n || 4); i++) h.cloud(x, h.hash(i + (o.seed || 0)) * 1080, (o.y || 200) + h.hash(i + 7 + (o.seed || 0)) * (o.h || 400), o.s || 0.9); },
  sun(x, h, o) { h.sunDisk(x, o.x ?? 820, o.y ?? 260, o.r || 80, o.col); },
  moon(x, h, o) { x.beginPath(); x.arc(o.x ?? 800, o.y ?? 300, o.r || 110, 0, 7); x.fillStyle = o.col || '#fff4c8'; x.fill(); },
  stars(x, h, o) { for (let i = 0; i < (o.n || 60); i++) { x.fillStyle = `rgba(255,255,255,${0.4 + h.hash(i) * 0.5})`; x.beginPath(); x.arc(h.hash(i + 3) * 1080, h.hash(i + 5) * (o.h || 1000), 2 + h.hash(i + 9) * 3, 0, 7); x.fill(); } },
  bubbles(x, h, o) { for (let i = 0; i < (o.n || 14); i++) { const bx = h.hash(i + 40) * 1080, by = h.hash(i + 41) * (o.h || 1200), r = 30 + h.hash(i + 42) * 70; x.beginPath(); x.arc(bx, by, r, 0, 7); x.fillStyle = 'rgba(255,255,255,0.25)'; x.fill(); x.lineWidth = 5; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke(); x.beginPath(); x.arc(bx - r * 0.35, by - r * 0.35, r * 0.15, 0, 7); x.fillStyle = '#fff'; x.fill(); } },
  tiles(x, h, o) { for (let r = 0; r < 30; r++) for (let k = 0; k < 12; k++) { x.strokeStyle = o.col || 'rgba(0,0,0,0.15)'; x.lineWidth = 3; x.strokeRect(-60 + k * (o.s || 100), -120 + r * (o.s || 100), o.s || 100, o.s || 100); } },
  bricks(x, h, o) { for (let r = 0; r < 24; r++) for (let k = 0; k < 9; k++) { x.strokeStyle = o.col || 'rgba(40,20,10,0.35)'; x.lineWidth = 5; x.strokeRect(-60 + k * 140 + (r % 2) * 70, -120 + r * 60, 140, 60); } },
  stripes(x, h, o) { for (let k = -1; k < 14; k++) { x.fillStyle = k % 2 ? o.a : o.b; x.fillRect(k * (o.w || 100), -h.OY, o.w || 100, o.to || 1300); } },
  windows(x, h, o) { for (let k = 0; k < (o.n || 3); k++) { const wx = (o.x0 || 90) + k * (o.gap || 320); h.rrect(x, wx, o.y || 300, o.w || 220, o.hh || 300, 14); h.fs(x, o.col || '#a8e0ff', 10); x.beginPath(); x.moveTo(wx + (o.w || 220) / 2, o.y || 300); x.lineTo(wx + (o.w || 220) / 2, (o.y || 300) + (o.hh || 300)); x.lineWidth = 8; x.strokeStyle = h.OL; x.stroke(); } },
  shelves(x, h, o) { for (let r = 0; r < (o.rows || 4); r++) { const y = (o.y || 200) + r * 230; x.fillStyle = o.wood || '#a26d45'; x.fillRect(-h.OX, y + 160, h.BW, 22); for (let k = 0; k < 8; k++) { h.rrect(x, -30 + k * 140, y + 50, 100, 110, 12); h.fs(x, o.cols[(k + r) % o.cols.length], 6); } } },
  columns(x, h, o) { for (let k = 0; k < (o.n || 4); k++) { h.rrect(x, (o.x0 || 40) + k * (o.gap || 300), o.y || 250, o.w || 80, o.hh || 1000, 10); h.fs(x, o.col || '#f4ead2', 9); } },
  houses(x, h, o) { for (let i = 0; i < (o.n || 6); i++) { const hx = -60 + i * 200, hh = 260 + h.hash(i + (o.seed || 11)) * 300, gy = o.gy || 1220; x.beginPath(); x.rect(hx, gy - hh, 180, hh); h.fs(x, o.cols[i % o.cols.length], 8); x.beginPath(); x.moveTo(hx - 15, gy - hh); x.lineTo(hx + 90, gy - hh - 80); x.lineTo(hx + 195, gy - hh); x.closePath(); h.fs(x, o.roof || '#a8402e', 8); x.fillStyle = o.win || '#ffd77a'; x.fillRect(hx + 60, gy - hh + 60, 60, 60); } },
  trees(x, h, o) { for (let i = 0; i < (o.n || 4); i++) { const tx = (o.x0 ?? 60) + i * (o.gap || 320), gy = o.gy || 1240, th = o.th || 520; h.rrect(x, tx - 26, gy - th, 52, th, 14); h.fs(x, o.trunk || '#6b4630', 8); x.beginPath(); x.arc(tx, gy - th, o.r || 170, 0, 7); h.fs(x, o.leaf || '#4fae5a', 9); } },
  mountains(x, h, o) { x.beginPath(); x.moveTo(-h.OX, o.gy || 1100); for (let i = 0; i <= 6; i++) x.lineTo(-h.OX + i * 220, (o.gy || 1100) - (i % 2 ? (o.hh || 500) : 150)); x.lineTo(h.BW, o.gy || 1100); x.closePath(); h.fs(x, o.col || '#8a90b0', 9); },
  water(x, h, o) { x.fillStyle = o.col || '#3f8ad8'; x.fillRect(-h.OX, o.y || 1000, h.BW, o.hh || 400); h.waves(x, (o.y || 1000) + 40, 'rgba(255,255,255,0.5)', 12, 12); },
  lanterns(x, h, o) { x.strokeStyle = h.OL; x.lineWidth = 4; x.beginPath(); x.moveTo(-h.OX, o.y || 300); x.quadraticCurveTo(540, (o.y || 300) + 120, h.BW, o.y || 300); x.stroke(); for (let i = 0; i < 7; i++) { const lx = 40 + i * 170, ly = (o.y || 300) + Math.sin(i / 6 * Math.PI) * 60; x.beginPath(); x.ellipse(lx, ly + 50, 40, 56, 0, 0, 7); h.fs(x, o.col || '#e8402e', 6); } },
  banners(x, h, o) { const cols = o.cols || ['#e8402e', '#f4d030', '#3f9bff', '#5cc45a']; for (let k = 0; k < (o.n || 4); k++) { const bx = 80 + k * 280; x.beginPath(); x.moveTo(bx, o.y || 420); x.lineTo(bx + 140, o.y || 420); x.lineTo(bx + 140, (o.y || 420) + 380); x.lineTo(bx + 70, (o.y || 420) + 330); x.lineTo(bx, (o.y || 420) + 380); x.closePath(); h.fs(x, cols[k % cols.length], 7); } },
  crates(x, h, o) { for (const [cx, cy, s] of (o.list || [[60, 1100, 140], [200, 1100, 140], [120, 960, 140], [880, 1100, 160]])) { h.rrect(x, cx, cy, s, s, 8); h.fs(x, o.col || '#c99556', 8); x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + s, cy + s); x.moveTo(cx + s, cy); x.lineTo(cx, cy + s); x.lineWidth = 6; x.strokeStyle = 'rgba(80,50,20,0.5)'; x.stroke(); } },
  spots(x, h, o) { for (let i = 0; i < (o.n || 30); i++) { x.fillStyle = o.col; x.beginPath(); x.arc(h.hash(i + (o.seed || 0)) * 1080, h.hash(i + 1 + (o.seed || 0)) * (o.h || 1200), (o.r || 20) * (0.5 + h.hash(i + 2)), 0, 7); x.fill(); } },
  rays(x, h, o) { for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; x.fillStyle = o.col; x.beginPath(); x.moveTo(540, o.y || 820); x.arc(540, o.y || 820, 2200, a, a + Math.PI / 24); x.closePath(); x.fill(); } },
  frames(x, h, o) { for (const [fx, fy, w, hh] of (o.list || [[80, 300, 260, 320], [740, 380, 240, 280]])) { h.rrect(x, fx, fy, w, hh, 10); h.fs(x, '#a26d45', 10); h.rrect(x, fx + 18, fy + 18, w - 36, hh - 36, 6); h.fs(x, o.col || '#fff7e0', 6); } },
  arch(x, h, o) { x.beginPath(); x.moveTo(o.x || 300, o.gy || 1240); x.lineTo(o.x || 300, o.y || 700); x.arc((o.x || 300) + (o.w || 480) / 2, o.y || 700, (o.w || 480) / 2, Math.PI, 0); x.lineTo((o.x || 300) + (o.w || 480), o.gy || 1240); x.closePath(); h.fs(x, o.col || '#3a3036', 10); },
  pipes(x, h, o) { for (let k = 0; k < (o.n || 5); k++) { h.rrect(x, 40 + k * 220, -h.OY, 50, 1400, 16); h.fs(x, o.col || '#8a8fa0', 7); } x.lineWidth = 50; x.strokeStyle = h.OL; x.beginPath(); x.moveTo(-h.OX, o.y || 500); x.lineTo(h.BW, o.y || 500); x.stroke(); x.lineWidth = 36; x.strokeStyle = o.col || '#8a8fa0'; x.stroke(); },
  confetti(x, h, o) { for (let i = 0; i < (o.n || 60); i++) { x.fillStyle = ['#ff5a7a', '#3f9bff', '#ffcf3a', '#5cc45a', '#ffffff'][i % 5]; x.save(); x.translate(h.hash(i + 70) * 1080, h.hash(i + 71) * 1200); x.rotate(h.hash(i + 72) * 3); x.fillRect(-10, -5, 20, 10); x.restore(); } },
  fog(x, h, o) { for (let i = 0; i < (o.n || 8); i++) { x.fillStyle = o.col || 'rgba(255,255,255,0.25)'; x.beginPath(); x.ellipse(h.hash(i + 80) * 1080, 300 + i * 120, 420, 70, 0, 0, 7); x.fill(); } },
  sign(x, h, o) { h.rrect(x, o.x || 340, o.y || 260, o.w || 400, 120, 12); h.fs(x, o.bg || '#ffffff', 9); x.font = `bold ${o.size || 60}px sans-serif`; x.textAlign = 'center'; x.fillStyle = o.col || '#c0392b'; x.fillText(o.text, (o.x || 340) + (o.w || 400) / 2, (o.y || 260) + 82); },
  custom(x, h, o) { o.fn(x, h); },
};

export function register(BG, h) {
  BG.s3 = (name) => {
    const sp = SPECS[name]; const [c, x] = h.canvas();
    h.fill(x, sp.sky[0], sp.sky[1], -h.OY, sp.skyTo || h.BH - h.OY);
    for (const [k, o = {}] of (sp.back || [])) P[k](x, h, o);
    if (sp.ground) { x.fillStyle = sp.ground; x.fillRect(-h.OX, sp.gy || 1240, h.BW, 1100); }
    for (const [k, o = {}] of (sp.front || [])) P[k](x, h, o);
    if (sp.ground && sp.line !== false) { x.lineWidth = 10; x.strokeStyle = h.OL; x.beginPath(); x.moveTo(-h.OX, sp.gy || 1240); x.lineTo(h.BW, sp.gy || 1240); x.stroke(); }
    return h.finish(c, sp.blur || 12);
  };
}
