// Renders the Happy Path film from film.html and soundtrack.js.
//
//   node render-film.js cues                 -> cues.json (his footfalls + the timeline; run first)
//   node soundtrack.js                       -> soundtrack.wav
//   node render-film.js stills 1080x1920 4 8 -> stills/1080x1920-t<s>.png, for checking frames
//   node render-film.js video 1080x1920      -> out/happy-path-film-1080x1920-v<N>.mp4 (+ -silent)
//
// Never overwrites: each render takes the next free version in out/. Copy the one you mean to
// publish into ../film/ by hand.
//
// Sound, in this order - the order the published film was made in:
//   1. loudnorm to -16 LUFS. Its default mode is dynamic: it rides the level over time, which
//      also sets how far the quiet opening sits below the music. Changing the mode changes that.
//   2. the music turned down 4 dB from the moment the box opens, easing in from 2.45 s (after the
//      last boxed step lands) to 2.85 s (before the first mallet note). The footsteps cannot be
//      turned up instead: their impacts already peak near full scale, so raising them clips, and
//      limiting them changes how they sound.
// Do not add a volume expression after a resample in ffmpeg: it reads a timestamp the resample
// breaks, and silently does nothing. That is why step 2 is done here in JavaScript.
const http = require('http'), fs = require('fs'), path = require('path');
const { spawn, spawnSync } = require('child_process');
const { chromium } = require('playwright');
const ffmpeg = require('ffmpeg-static');

const ROOT = __dirname, FPS = 30, DUR = 12, SR = 48000;
const MUSIC_DOWN_DB = 4, EASE = [2.45, 2.85];
const server = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': f.endsWith('.html') ? 'text/html' : 'application/octet-stream' }); res.end(d); });
});

function nextOut(tag) {
  const dir = path.join(ROOT, 'out'); fs.mkdirSync(dir, { recursive: true });
  const re = new RegExp(`^happy-path-film-${tag}-v(\\d+)\\.mp4$`);
  const n = Math.max(0, ...fs.readdirSync(dir).map(f => re.exec(f)).filter(Boolean).map(m => +m[1])) + 1;
  return path.join(dir, `happy-path-film-${tag}-v${n}.mp4`);
}

function finalAudio(wavOut) {
  const lev = path.join(ROOT, 'out', 'levelled.f32');
  const r = spawnSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', path.join(ROOT, 'soundtrack.wav'),
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', String(SR), '-ac', '2', '-f', 'f32le', lev]);
  if (r.status) throw new Error('loudnorm failed: ' + r.stderr);
  const b = fs.readFileSync(lev), x = new Float32Array(b.buffer, b.byteOffset, b.length / 4), n = x.length / 2;
  const G = Math.pow(10, -MUSIC_DOWN_DB / 20);
  const out = Buffer.alloc(44 + n * 4);
  out.write('RIFF', 0); out.writeUInt32LE(36 + n * 4, 4); out.write('WAVE', 8);
  out.write('fmt ', 12); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22);
  out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34);
  out.write('data', 36); out.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const g = t < EASE[0] ? 1 : t < EASE[1] ? 1 + (G - 1) * (0.5 - 0.5 * Math.cos(Math.PI * (t - EASE[0]) / (EASE[1] - EASE[0]))) : G;
    out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, x[2 * i] * g)) * 32767), 44 + i * 4);
    out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, x[2 * i + 1] * g)) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(wavOut, out); fs.unlinkSync(lev);
}

(async () => {
  const [mode, size = '1080x1920', ...rest] = process.argv.slice(2);
  const [w, h] = size.split('x').map(Number);
  await new Promise(r => server.listen(8766, r));
  const browser = await chromium.launch({ executablePath: process.env.CHROME });
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`http://localhost:8766/film.html?render&w=${w}&h=${h}`);
  await page.evaluate(() => window.ready);

  if (mode === 'cues') {
    fs.writeFileSync(path.join(ROOT, 'cues.json'), JSON.stringify(await page.evaluate(() => window.cues())));
    console.log('cues.json written');
  } else if (mode === 'stills') {
    fs.mkdirSync(path.join(ROOT, 'stills'), { recursive: true });
    for (const s of rest) { await page.evaluate(t => window.renderAt(t), +s); await page.screenshot({ path: path.join(ROOT, 'stills', `${size}-t${s}.png`) }); }
  } else if (mode === 'video') {
    const out = nextOut(size), silent = out.replace(/\.mp4$/, '-silent.mp4');
    if (fs.existsSync(silent)) throw new Error(`${silent} exists; refusing to overwrite`);
    const ff = spawn(ffmpeg, ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
      '-movflags', '+faststart', silent], { stdio: ['pipe', 'ignore', 'inherit'] });
    for (let i = 0; i < FPS * DUR; i++) {
      await page.evaluate(t => window.renderAt(t), i / FPS);
      const buf = await page.screenshot({ type: 'png' });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
    const wav = path.join(ROOT, 'out', 'final-audio.wav');
    finalAudio(wav);
    const m = spawnSync(ffmpeg, ['-n', '-loglevel', 'error', '-i', silent, '-i', wav, '-map', '0:v', '-map', '1:a',
      '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out]);
    if (m.status) throw new Error('mux failed: ' + m.stderr);
    console.log('wrote', out, 'and', path.basename(silent));
  }
  await browser.close(); server.close();
})();
