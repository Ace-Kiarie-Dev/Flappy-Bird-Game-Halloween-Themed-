// Builds the 1200×630 link-preview image, Flappy Bird/og.png.
// Run from the repo root:  npm install && npm run og
// Text is drawn as SVG paths from the Sora font files, so the result doesn't depend
// on which fonts are installed on the machine.
import { readFile, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const HERO = path.resolve(root, '../../nesture-x-website/nesture-x-website/public/images/NX-Gaming/hero-flappy-horror.webp');
const OUT = path.join(root, 'Flappy Bird', 'og.png');
const MAX_BYTES = 300 * 1024;

const W = 1200;
const H = 630;
const C = {
    teal: '#1b4a4f',
    void: '#05080a',
    blood: '#e3263a',
    bone: '#e8f1f2',
    mist: '#9fb4b9',
    ecto: '#5ff5d1',
};

async function loadFont(weight) {
    const file = require.resolve(`@fontsource/sora/files/sora-latin-${weight}-normal.woff`);
    const buf = await readFile(file);
    return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

// Path data for `text` with its left edge at x and baseline at y.
function textPath(font, text, x, y, size) {
    return font.getPath(text, x, y, size).toPathData(2);
}

// Largest size (up to `max`) at which `text` fits in `width`.
function fitSize(font, text, width, max) {
    return Math.min(max, Math.floor((width / font.getAdvanceWidth(text, 1000)) * 1000));
}

const heavy = await loadFont(800);
const semi = await loadFont(600);

// Ghost: large on the left, leaving room for the footer line underneath.
const GHOST_H = 520;
const ghostMeta = await sharp(HERO).metadata();
const GHOST_W = Math.round((ghostMeta.width / ghostMeta.height) * GHOST_H);
const GHOST_X = 40;
const GHOST_Y = 34;
const ghost = await sharp(HERO).resize({ height: GHOST_H }).png().toBuffer();

// Title block on the right.
const TEXT_X = GHOST_X + GHOST_W + 36;
const TEXT_W = W - TEXT_X - 56;
const titleSize = fitSize(heavy, 'Horror', TEXT_W, 150);
const line1Y = 300;
const line2Y = line1Y + Math.round(titleSize * 0.98);
const tagSize = 26;
const tagY = line2Y + 64;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.teal}"/>
      <stop offset="0.62" stop-color="${C.void}"/>
      <stop offset="1" stop-color="${C.void}"/>
    </linearGradient>
    <radialGradient id="moonGlow" cx="1040" cy="110" r="420" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${C.blood}" stop-opacity="0.75"/>
      <stop offset="0.35" stop-color="${C.blood}" stop-opacity="0.28"/>
      <stop offset="1" stop-color="${C.blood}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="moon" cx="0.4" cy="0.38" r="0.7">
      <stop offset="0" stop-color="#ff6b78"/>
      <stop offset="0.55" stop-color="${C.blood}"/>
      <stop offset="1" stop-color="#8f0f1e"/>
    </radialGradient>
    <radialGradient id="ectoGlow" cx="${GHOST_X + GHOST_W / 2}" cy="${GHOST_Y + GHOST_H / 2}" r="${GHOST_H * 0.62}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${C.ecto}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${C.ecto}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.void}" stop-opacity="0"/>
      <stop offset="1" stop-color="${C.void}" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#moonGlow)"/>
  <circle cx="1040" cy="110" r="62" fill="url(#moon)"/>
  <rect width="${W}" height="${H}" fill="url(#ectoGlow)"/>
  <rect y="${H - 170}" width="${W}" height="170" fill="url(#ground)"/>
  <path d="${textPath(heavy, 'Flappy', TEXT_X, line1Y, titleSize)}" fill="${C.bone}"/>
  <path d="${textPath(heavy, 'Horror', TEXT_X, line2Y, titleSize)}" fill="${C.blood}"/>
  <path d="${textPath(semi, 'Free Halloween arcade game', TEXT_X + 4, tagY, tagSize)}" fill="${C.mist}"/>
  <path d="${textPath(semi, 'NX Gaming · nesturex.com', 48, H - 34, 22)}" fill="${C.mist}"/>
</svg>`;

const png = await sharp(Buffer.from(svg))
    .composite([{ input: ghost, left: GHOST_X, top: GHOST_Y }])
    .png({ palette: true, quality: 95, dither: 0.6, compressionLevel: 9, effort: 10 })
    .toBuffer();

await sharp(png).toFile(OUT);
const { size } = await stat(OUT);
console.log(`Wrote ${path.relative(root, OUT)}: ${W}×${H}, ${(size / 1024).toFixed(1)} KB`);
if (size > MAX_BYTES) {
    console.error(`og.png is over ${MAX_BYTES / 1024} KB; lower the palette quality.`);
    process.exitCode = 1;
}
