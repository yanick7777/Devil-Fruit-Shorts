// Render a design sheet page to PNG: node tools/sheet.mjs <module path> <out.png> [query]
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const [mod, out, qs = ''] = process.argv.slice(2), root = path.resolve('.');
const types = { '.js': 'text/javascript', '.html': 'text/html', '.woff2': 'font/woff2' };
const srv = http.createServer((q, r) => { const f = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(root) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r); }).listen(0);
const b = await chromium.launch(); const p = await b.newPage();
p.on('pageerror', (e) => console.error(e)); p.on('console', (m) => m.type() === 'error' && console.error(m.text()));
await p.goto(`http://127.0.0.1:${srv.address().port}/engine/sheet.html?m=${encodeURIComponent(mod)}&${qs}`);
await p.waitForFunction(() => window.__done, null, { timeout: 60000 });
const d = await p.evaluate(() => document.getElementById('c').toDataURL('image/png'));
fs.writeFileSync(out, Buffer.from(d.split(',')[1], 'base64')); await b.close(); srv.close();
