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
| `flappybirdbg2.png` | 163 KB (360×640) | In-game background, the castle and moon (`main.js`) | Downloaded, source and licence unknown | **No** |
| `ghost.png` | 149 KB (408×288) | The player's ghost sprite | Peter Kiarie (NX Gaming) | Yes, own work |
| `toppipe.png` | 575 KB (384×3072) | Zombie hands reaching down | Peter Kiarie (NX Gaming) | Yes, own work |
| `bottompipe.png` | 539 KB (384×3072) | Zombie hands reaching up | Peter Kiarie (NX Gaming) | Yes, own work |
| `favicon.png` | 192 KB (512×512) | Browser tab icon; source art for the app icons below | Not recorded: ghost-with-scythe art | To confirm |

Sound effects (flap, score, souls, thunder and so on) are synthesized live in `main.js` with the Web Audio API.
There are no sound-effect files.

## Generated files

These are built by scripts in `tools/` and inherit the status of their sources.

| File | Size | Built from | Licence confirmed? |
| --- | ---: | --- | --- |
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

## Fonts (not in the repo)

Loaded from Google Fonts at runtime. All are under the SIL Open Font License 1.1, which allows commercial use.

| Font | Used for |
| --- | --- |
| Rubik Wet Paint | Dripping titles and scores |
| Space Grotesk | Body text and buttons |
| JetBrains Mono | Labels, hints and records |
| Sora (800, 600) | Text in `og.png` only, drawn as paths (from the `@fontsource/sora` dev dependency) |

## Replacing an asset

**Easiest:** save the replacement under the **same file name and format** (for example a new `df.mp3`).
No code changes are needed. Then bump `CACHE` in `sw.js` (`nx-flappy-horror:v1` → `v2`) so returning
players get the new file, and copy it to the website as described in the README's Deploy section.

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
| `flappybirdbg2.png` | `Flappy Bird/main.js` (`loadImage` in `boot()`), `Flappy Bird/sw.js` (`ASSETS`), README copy list |
