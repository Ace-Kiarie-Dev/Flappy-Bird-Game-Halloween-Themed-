// Builds the WebP images the game loads, from the original PNGs (which stay as the source files).
// Run from the repo root:  npm install && npm run sprites
//
// The sprites keep their original size and are saved lossless, so the game draws exactly the same
// pixels. (Shrinking them to the size the game pre-renders at saves more, but changes how the
// browser resamples their edges, which was measurable on the ghost's outline.)
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const game = path.join(root, 'Flappy Bird');

const outputs = [
    // [source, output, webp options]
    ['toppipe.png', 'toppipe.webp', { lossless: true }],
    ['bottompipe.png', 'bottompipe.webp', { lossless: true }],
    ['ghost.png', 'ghost.webp', { lossless: true }],
    // In-game background: a soft, dark painting where lossless WebP barely helps.
    // Quality 95 measures ~50 dB PSNR against the PNG as drawn in the game (max error 9/255): not visible.
    ['flappybirdbg2.png', 'flappybirdbg2.webp', { quality: 95 }],
];

for (const [src, out, opts] of outputs) {
    const file = path.join(game, out);
    await sharp(path.join(game, src)).webp({ ...opts, effort: 6 }).toFile(file);
    const before = (await stat(path.join(game, src))).size;
    const after = (await stat(file)).size;
    console.log(`Wrote Flappy Bird/${out}: ${(after / 1024).toFixed(1)} KB (from ${src}, ${(before / 1024).toFixed(0)} KB)`);
}
