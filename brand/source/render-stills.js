// Draws the still brand assets from stills.html into brand/, at their exact pixel sizes.
//   node render-stills.js
// Unlike the film, these are meant to be replaced in place: the site links to them by name.
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');

const ROOT = __dirname, OUT = path.join(ROOT, '..');
const ASSETS = [
  ['mark-1024.png', 'asset=mark&size=1024', 1024, 1024],   // Facebook and Instagram profile picture
  ['mark-512.png', 'asset=mark&size=512', 512, 512],
  ['favicon-180.png', 'asset=mark&size=180', 180, 180],    // apple-touch-icon
  ['favicon-32.png', 'asset=icon&size=32', 32, 32],
  ['cover-1640x856.png', 'asset=cover', 1640, 856],        // Facebook page cover
];
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(d); });
});

(async () => {
  await new Promise(r => server.listen(8767, r));
  const browser = await chromium.launch({ executablePath: process.env.CHROME });
  for (const [file, query, w, h] of ASSETS) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(`http://localhost:8767/stills.html?${query}`);
    await page.evaluate(() => window.ready);
    await page.screenshot({ path: path.join(OUT, file), clip: { x: 0, y: 0, width: w, height: h } });
    await page.close();
    console.log('wrote brand/' + file);
  }
  await browser.close(); server.close();
})();
