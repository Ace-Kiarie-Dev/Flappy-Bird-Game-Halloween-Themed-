# Flappy Horror: asset register

Every file in `Flappy Bird/`, who made it, and whether we have confirmed the right to use it.

> **Before promoting the game:** `df.mp3`, `bg2.jpg` and `flappybirdbg2.png` were downloaded and their
> source and licence are unknown. Confirm a licence that allows commercial use on nesturex.com for each,
> or replace them (see [Replacing an asset](#replacing-an-asset)).

## Art and audio

| File | Size | Used for | Made by | Licence confirmed? |
| --- | ---: | --- | --- | --- |
| `df.mp3` | 2,468 KB | Background music (looping soundtrack) | Downloaded, source and licence unknown | **No** |
| `bg2.jpg` | 176 KB (1366×768) | Page background behind the game (`style.css`) | Downloaded, source and licence unknown | **No** |
| `flappybirdbg2.png` | 163 KB (360×640) | Source of the in-game background, the castle and moon | Downloaded, source and licence unknown | **No** |
| `ghost.png` | 149 KB (408×288) | Source of the player's ghost sprite | Peter Kiarie (NX Gaming) | Yes, own work |
| `toppipe.png` | 575 KB (384×3072) | Source of the zombie hands reaching down | Peter Kiarie (NX Gaming) | Yes, own work |
| `bottompipe.png` | 539 KB (384×3072) | Source of the zombie hands reaching up | Peter Kiarie (NX Gaming) | Yes, own work |
| `favicon.png` | 192 KB (512×512) | Browser tab icon; source art for the app icons below | Not recorded: ghost-with-scythe art | To confirm |

Sound effects (flap, score, souls, thunder and so on) are synthesized live in `main.js` with the Web Audio API.
There are no sound-effect files.

## Generated files

These are built by scripts in `tools/` and inherit the status of their sources.

| File | Size | Built from | Licence confirmed? |
| --- | ---: | --- | --- |
| `flappybirdbg2.webp` | 15 KB | `flappybirdbg2.png` (`npm run sprites`, WebP quality 95). Loaded by `main.js` | **No**, same as `flappybirdbg2.png` |
| `ghost.webp` | 60 KB | `ghost.png` (`npm run sprites`, lossless). Loaded by `main.js` | Yes, own work |
| `toppipe.webp` | 362 KB | `toppipe.png` (`npm run sprites`, lossless). Loaded by `main.js` | Yes, own work |
| `bottompipe.webp` | 340 KB | `bottompipe.png` (`npm run sprites`, lossless). Loaded by `main.js` | Yes, own work |
| `icon-192.png` | 13 KB | `favicon.png` (`npm run icons`) | Same as `favicon.png` |
| `icon-512.png` | 65 KB | `favicon.png` (`npm run icons`) | Same as `favicon.png` |
| `icon-maskable-512.png` | 31 KB | `favicon.png` (`npm run icons`) | Same as `favicon.png` |
| `apple-touch-icon.png` | 9 KB | `favicon.png` (`npm run icons`) | Same as `favicon.png` |
| `og.png` | 155 KB (1200×630) | `hero-flappy-horror.webp` from the website repo, plus Sora text (`npm run og`) | Hero art: to confirm. Sora: yes, SIL OFL 1.1 |

## Code and config

| File | Size | Made by | Licence confirmed? |
| --- | ---: | --- | --- |
| `index.html` | 14 KB | NX Gaming | Yes, own work |
| `style.css` | 22 KB | NX Gaming | Yes, own work |
| `main.js` | 52 KB | NX Gaming | Yes, own work |
| `sw.js` | 5 KB | NX Gaming | Yes, own work |
| `manifest.webmanifest` | 1 KB | NX Gaming | Yes, own work |
| `_redirects` | under 1 KB | NX Gaming (Netlify config, not deployed to nesturex.com) | Yes, own work |

## Fonts

Self-hosted in `Flappy Bird/fonts/`: the latin subsets Google Fonts serves, downloaded unchanged. All are under
the SIL Open Font License 1.1, which allows commercial use; each licence file sits next to its font.

| File | Size | Font | Used for | Licence confirmed? |
| --- | ---: | --- | --- | --- |
| `fonts/rubik-wet-paint-latin.woff2` | 74 KB | Rubik Wet Paint | Dripping titles and scores | Yes, OFL (`fonts/OFL-rubik-wet-paint.txt`) |
| `fonts/space-grotesk-latin.woff2` | 22 KB | Space Grotesk (variable, 400–700) | Body text and buttons | Yes, OFL (`fonts/OFL-space-grotesk.txt`) |
| `fonts/jetbrains-mono-latin.woff2` | 31 KB | JetBrains Mono (variable, 500–700) | Labels, hints and records | Yes, OFL (`fonts/OFL-jetbrains-mono.txt`) |
| (not in the game) | | Sora (800, 600) | Text in `og.png` only, drawn as paths (from the `@fontsource/sora` dev dependency) | Yes, OFL |

## Replacing an asset

**Easiest:** save the replacement under the **same file name and format** (for example a new `df.mp3`).
No code changes are needed. For `flappybirdbg2.png` (and the sprite PNGs), then run `npm run sprites` to
rebuild the `.webp` the game actually loads. Then bump `CACHE` in `sw.js` (`nx-flappy-horror:v1` → `v2`) so
returning players get the new file, and copy it to the website as described in the README's Deploy section.

Keep these shapes so the layout doesn't change:

- `df.mp3`: any length; it loops. Keep it small (it is downloaded on the first run, then kept offline).
- `bg2.jpg`: landscape, around 1366×768 or larger. It's shown with `background-size: cover` and darkened.
- `flappybirdbg2.png`: **portrait 9:16** (360×640, or 720×1280 for sharper screens). It's stretched to the
  game area, so any other shape will look squashed.

**If the name or format changes**, update every reference:

| Asset | Referenced in |
| --- | --- |
| `df.mp3` | `Flappy Bird/index.html` (`<audio src>`), `Flappy Bird/sw.js` (`MUSIC`), README copy list |
| `bg2.jpg` | `Flappy Bird/style.css` (`body` background), `Flappy Bird/sw.js` (`ASSETS`), README copy list |
| `flappybirdbg2.png` | `tools/make-sprites.mjs` (source), which writes `flappybirdbg2.webp`; that is referenced in `Flappy Bird/main.js` (`loadImage` in `boot()`), `Flappy Bird/sw.js` (`ASSETS`) and the README copy list |
