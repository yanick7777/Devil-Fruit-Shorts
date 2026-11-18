// Render every frame through Three.js in headless Chromium and pipe them into ffmpeg.
// usage: node tools/render.mjs <timeline.json> <out.mp4> [--fps 30] [--only t1,t2,...] (stills to PNG)
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const [tlPath, out] = process.argv.slice(2);
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const FPS = +arg('--fps', 30), only = arg('--only', null);
const root = path.resolve('.');
const types = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html', '.woff2': 'font/woff2', '.json': 'application/json' };
const srv = http.createServer((req, res) => {
  const f = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
}).listen(0);
const port = srv.address().port;

const tl = JSON.parse(fs.readFileSync(tlPath, 'utf8'));
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('console', (m) => m.type() === 'error' && console.error('[page]', m.text()));
page.on('pageerror', (e) => console.error('[pageerror]', e));
await page.goto(`http://127.0.0.1:${port}/engine/index.html`);
await page.waitForFunction(() => window.__ready);
await page.evaluate((t) => window.__init(t), tl);
fs.writeFileSync(path.join(path.dirname(tlPath), 'cues.json'), JSON.stringify(await page.evaluate(() => window.__cues()), null, 1));

if (only) {
  for (const t of only.split(',').map(Number)) {
    const d = await page.evaluate((t) => window.__frame(t), t);
    fs.writeFileSync(`${out}_${t.toFixed(2)}.jpg`, Buffer.from(d.split(',')[1], 'base64'));
  }
} else {
  const n = Math.ceil(tl.duration * FPS);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let i = 0; i < n; i++) {
    const d = await page.evaluate((t) => window.__frame(t), i / FPS);
    if (!ff.stdin.write(Buffer.from(d.split(',')[1], 'base64'))) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 90 === 0) console.log(`frame ${i}/${n}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise((r) => ff.on('close', r));
}
await browser.close(); srv.close();
