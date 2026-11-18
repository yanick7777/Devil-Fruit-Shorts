# Devil Fruit Shorts

Code-only pipeline for 9:16 animated shorts that explain one Devil Fruit each.
The look is a flat 2D Bitmoji-style cartoon: canvas-drawn billboard cards in a flat illustrated room, a pink ribbon title,
bold word-by-word captions and punchy camera moves. Every frame is rendered by Three.js in headless Chromium.

## Build

```bash
npm install                 # three + Lilita One font
pip install numpy scipy     # audio synthesis
apt-get install espeak-ng mbrola mbrola-us2   # voiceover
./make.sh mera-mera         # -> out/mera-mera.mp4 (1080x1920, 30 fps, AAC)
```

## Layout

| Path | What it does |
| --- | --- |
| `shorts/<name>/script.json` | Scenes: caption text (`*word*` = pink highlight), spoken text, banner, character, expression, camera keys, SFX cues, source facts |
| `tools/voice.py` | Voiceover per scene + `timeline.json` with scene and word timings |
| `tools/audio.py` | Synthesized music bed (ducked under the voice) and SFX, mixed to WAV |
| `engine/draw.js` | Canvas 2D art kit: room, banner, characters, fruit buddy, flames, stickers, props |
| `engine/engine.js` | Three.js compositor: layered cards with parallax, camera moves and shake, per-scene effects, captions |
| `tools/render.mjs` | Steps through frames in Chromium and pipes them into ffmpeg (`--only 1.5,8` renders stills) |

To make a new short, copy `shorts/mera-mera/script.json`, rewrite the scenes for one fruit, and add any new
scene effects to `FX` in `engine/engine.js`.
