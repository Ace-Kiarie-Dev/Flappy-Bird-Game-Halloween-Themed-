// Builds the PWA and home-screen icons from Flappy Bird/favicon.png.
// Run from the repo root:  npm install && npm run icons
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const game = path.join(root, 'Flappy Bird');
const SOURCE = path.join(game, 'favicon.png');

const VOID = '#05080a';
const ECTO = '#5ff5d1';

const png = { compressionLevel: 9, effort: 10, palette: true, quality: 95 };

// Opaque square: the ghost centred at `scale` of the canvas on the game's dark
// background with a faint ecto glow. Used where the platform masks or rounds the icon.
async function onBackground(size, scale) {
    const inner = Math.round(size * scale);
    const ghost = await sharp(SOURCE).resize(inner, inner).toBuffer();
    const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <defs>
    <radialGradient id="g" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${ECTO}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${ECTO}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="${VOID}"/>
  <rect width="${size}" height="${size}" fill="url(#g)"/>
</svg>`);
    const offset = Math.round((size - inner) / 2);
    return sharp(bg).composite([{ input: ghost, left: offset, top: offset }]);
}

const outputs = [
    // purpose "any": transparent, same art as the favicon
    ['icon-192.png', () => sharp(SOURCE).resize(192, 192)],
    ['icon-512.png', () => sharp(SOURCE).resize(512, 512)],
    // purpose "maskable": art kept inside the 80% safe zone
    ['icon-maskable-512.png', () => onBackground(512, 0.6)],
    // iOS home screen: must be opaque (iOS fills transparency with black) and rounds corners itself
    ['apple-touch-icon.png', () => onBackground(180, 0.82)],
];

for (const [name, build] of outputs) {
    const file = path.join(game, name);
    await (await build()).png(png).toFile(file);
    const { size } = await stat(file);
    console.log(`Wrote Flappy Bird/${name}: ${(size / 1024).toFixed(1)} KB`);
}
