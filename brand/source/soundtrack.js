// The film's score, synthesised so there is no licence to clear, plus one recorded sound: the
// footsteps (sfx/README.md). No drums. Every time comes from the film itself - cues.json holds his
// footfalls and the timeline T, written by `node render-film.js cues` - so the two cannot drift.
//
//   boxed, 0 - 2.0 s    footsteps only
//   the box opens       the pad swells in
//   walking the smile   a mallet note on each footfall, pitched above the pad so none is masked
//   the lamps           a warm chime each, the second a major third above the first
//   the name            soft bells
//   the close           everything fades to silence, so the loop restarts on a footstep
//
// Writes soundtrack.wav. render-film.js then levels it and turns the music down 4 dB from the
// moment the box opens (see there); that final balance is the one the film shipped with.
const fs = require('fs'), path = require('path');
const { spawnSync } = require('child_process');
const { steps, T, DUR } = JSON.parse(fs.readFileSync(path.join(__dirname, 'cues.json'), 'utf8'));
const SR = 48000, N = SR * DUR;
const L = new Float32Array(N), R = new Float32Array(N);
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
const add = (i, v, pan = 0) => { if (i >= 0 && i < N) { L[i] += v * (1 - pan); R[i] += v * (1 + pan); } };

// ---- footsteps: a real recording, decoded once to raw samples
const F32 = path.join(__dirname, 'sfx', 'steps.f32');
if (!fs.existsSync(F32)) spawnSync(require('ffmpeg-static'),
  ['-y', '-loglevel', 'error', '-i', path.join(__dirname, 'sfx', '847090-footsteps-hq.mp3'), '-ac', '1', '-ar', '48000', '-f', 'f32le', F32]);
const rec = (() => { const b = fs.readFileSync(F32); return new Float32Array(b.buffer, b.byteOffset, b.length / 4); })();

// The recording has been gated: between steps it is exact digital silence, and each step is cut to
// zero mid-decay. Heard alone that is an abrupt stop, so each step is cut out up to the gate and
// its tail eased to nothing before it. The first step in the recording is cut hardest (~100 ms)
// and is left out; the other five play in rotation, levelled to one peak.
//
// Tried and rejected: early reflections on the steps (it changed their character) and a faint
// room tone under the opening (it read as static). Keep them out.
const HITS = [0.475, 0.960, 1.870, 2.395, 2.780];            // impacts in the recording, seconds
const PRE = 0.012, MAXLEN = 0.42, TAILFADE = 0.09;
const samples = HITS.map(h => {
  const a = Math.floor((h - PRE) * SR);
  let n = Math.floor(MAXLEN * SR);
  for (let i = Math.floor(PRE * SR) + 480; i < n; i++) if (rec[a + i] === 0 && rec[a + i + 1] === 0 && rec[a + i + 2] === 0) { n = i; break; }
  const out = new Float32Array(n), fade = Math.floor(TAILFADE * SR);
  let pk = 0;
  for (let i = 0; i < n; i++) { out[i] = rec[a + i]; pk = Math.max(pk, Math.abs(out[i])); }
  for (let i = 0; i < n; i++) {
    const tail = i > n - fade ? 0.5 + 0.5 * Math.cos(Math.PI * (i - (n - fade)) / fade) : 1;
    out[i] *= tail * Math.min(1, i / 96) / pk;
  }
  return out;
});
let nextSample = 0;
function step(t0, g, pan) {               // placed so the impact lands on the frame his foot does
  const smp = samples[nextSample++ % samples.length], s = Math.floor((t0 - PRE) * SR);
  for (let i = 0; i < smp.length; i++) add(s + i, g * smp[i], pan);
}

function pad(t0, dur, midi, g, pan, attack = 0.9) {
  const s = Math.floor(t0 * SR), n = Math.floor((dur + 2.5) * SR), f = mtof(midi);
  for (let i = 0; i < n; i++) {
    const x = i / SR;
    const env = Math.min(1, x / attack) ** 2 * (x > dur ? Math.exp(-(x - dur) * 1.8) : 1);
    const ph = 2 * Math.PI * f * x * (1 + 0.0018 * Math.sin(2 * Math.PI * 0.21 * x + midi));
    add(s + i, g * env * (Math.sin(ph) + 0.18 * Math.sin(2 * ph) + 0.06 * Math.sin(3 * ph)), pan);
  }
}
function mallet(t0, midi, g, pan) {
  const s = Math.floor(t0 * SR), f = mtof(midi);
  for (let i = 0; i < SR * 1.6; i++) {
    const x = i / SR, a = Math.min(1, x / 0.004);
    add(s + i, g * a * (Math.sin(2 * Math.PI * f * x) * Math.exp(-x * 3.4)
      + 0.25 * Math.sin(2 * Math.PI * f * 2 * x) * Math.exp(-x * 8)
      + 0.06 * Math.sin(2 * Math.PI * f * 5.4 * x) * Math.exp(-x * 24)), pan);
  }
}
function bell(t0, midi, g, pan = 0, decay = 1.1) {
  const s = Math.floor(t0 * SR), f = mtof(midi);
  for (let i = 0; i < SR * 4; i++) {
    const x = i / SR, a = Math.min(1, x / 0.003);
    add(s + i, g * a * (Math.sin(2 * Math.PI * f * x) * Math.exp(-x * decay)
      + 0.22 * Math.sin(2 * Math.PI * f * 2.76 * x) * Math.exp(-x * 3)
      + 0.1 * Math.sin(2 * Math.PI * f * 5.4 * x) * Math.exp(-x * 6)), pan);
  }
}

const open = T.open[0], walkOn = T.open[1], smiled = T.bend[1], closeEnd = T.close[1];

// ---- footsteps. Boxed: the step alone. On the smile: a mallet note, climbing, above the pad
const melody = [81, 84, 86, 88, 86, 88, 91, 93, 91, 96, 93, 96];   // C major pentatonic, A5 up to C7
let k = 0;
steps.forEach((t, i) => {
  if (t < walkOn) step(t, 0.30, i % 2 ? 0.15 : -0.15);
  else { mallet(t, melody[Math.min(k, melody.length - 1)], 0.075, k % 2 ? 0.25 : -0.25); step(t, 0.16, 0); k++; }
});

// ---- the pad: in with the box, an open chord while he walks, resolving as the smile completes
const chords = [
  [open, walkOn + 0.6 - open, [60, 67, 74, 79]],                    // Csus2 - the straight road
  [walkOn + 0.6, 1.4, [57, 64, 72, 79]],                             // Am7   - the bend begins
  [walkOn + 2.0, smiled - (walkOn + 2.0) + 0.4, [53, 69, 72, 76]],   // Fmaj7 - still bending
  [smiled + 0.4, closeEnd - smiled - 1.6, [60, 67, 76, 83]],         // Cmaj7 - the smile, held to the close
];
chords.forEach(([t, d, notes], ci) => notes.forEach((m, j) =>
  pad(t, d, m, 0.038, (j / (notes.length - 1)) - 0.5, ci === 0 ? 0.8 : 0.9)));

// ---- the lamps: a warm chime each, G then B, a major third apart, both in the Cmaj7 above them
bell(T.lamp1, 79, 0.07, -0.3); bell(T.lamp1, 91, 0.025, -0.3);
bell(T.lamp2, 83, 0.07, 0.3); bell(T.lamp2, 95, 0.025, 0.3);

// ---- the name: C, E, G in the bells, gently
[84, 88, 91].forEach((m, j) => bell(T.name[0] + 0.1 + j * 0.13, m, 0.04, (j - 1) * 0.25, 0.9));

// ---- master: high-pass what a phone cannot play, gentle glue, a fade to silence over the close
const hp = Math.exp(-2 * Math.PI * 90 / SR);
let peak = 0, hl = 0, hr = 0, pl = 0, pr = 0;
const fadeA = Math.floor(T.close[0] * SR), fadeB = Math.floor((closeEnd + 0.05) * SR);
for (let i = 0; i < N; i++) {
  hl = hp * (hl + L[i] - pl); pl = L[i]; hr = hp * (hr + R[i] - pr); pr = R[i];
  const f = i < fadeA ? 1 : i > fadeB ? 0 : 0.5 + 0.5 * Math.cos(Math.PI * (i - fadeA) / (fadeB - fadeA));
  L[i] = Math.tanh(hl * 1.2) * f; R[i] = Math.tanh(hr * 1.2) * f;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const gain = 0.891 / peak;
const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8);
buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * gain)) * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * gain)) * 32767), 46 + i * 4);
}
fs.writeFileSync(path.join(__dirname, 'soundtrack.wav'), buf);
console.log(`soundtrack.wav: ${steps.filter(t => t < walkOn).length} steps alone, ${k} notes`);
