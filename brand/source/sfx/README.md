# Footstep recording

`847090-footsteps-hq.mp3` — "Footsteps" by HolyDeathFridge, Freesound sound 847090:
https://freesound.org/people/HolyDeathFridge/sounds/847090/

Licence: **Creative Commons 0** (public domain dedication). Commercial use allowed, no attribution
required. Checked on the sound's page, 29 September 2026.

This is Freesound's public high-quality preview (MP3, 48 kHz mono). The original is a 24-bit WAV
that needs a Freesound login to download; if it is dropped in here, decode it to `steps.f32` the
same way (soundtrack.js does it when steps.f32 is missing) and nothing else changes:

    ffmpeg -i <file> -ac 1 -ar 48000 -f f32le steps.f32
