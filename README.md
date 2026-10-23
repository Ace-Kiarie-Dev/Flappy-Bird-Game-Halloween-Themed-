# Flappy Horror · The Reaper's Flight

An **NX Gaming** original. A Halloween take on Flappy Bird, rebuilt from scratch.

**Play:** https://nesturex.com/nx-gaming/flappy-horror

Guide a little ghost through a graveyard of grasping hands. Gather lost souls, phase through the dead, and survive the Blood Moon.

## What makes it different

- **Souls and Phase.** Cyan wisps float in the gaps. Collect 5 to charge your meter, then **Phase**: for a few seconds you drift straight through the hands. Phase never runs out while you're inside a hand or about to enter one.
- **Blood Moon.** Every 15 points the moon turns red, the screen bleeds, lightning strikes and the dead speed up for a stretch.
- **They stir.** From 20 points on, the hands start swaying up and down.
- **Medals of the dead.** Bone (10), Silver Skull (25), Gold Pumpkin (50), Blood Moon (100).
- **Crypt records.** Your best score, souls harvested and times claimed are saved in your browser.
- **Atmosphere.** Procedural scrolling graveyard, parallax fog, bats, embers, lightning with thunder, and synthesized sound effects layered over the soundtrack.
- **Installable and playable offline** (PWA). The soundtrack is downloaded only once you start a run, then kept for offline play.
- Branded link previews (`og.png`) when the URL is pasted into chats and socials.

## Controls

| Action | Keyboard | Touch / mouse |
| --- | --- | --- |
| Flap | `Space`, `↑`, `X`, `W` | Tap / click |
| Phase (meter full) | `Shift` or `E` | Tap the glowing orb |
| Pause | `P` or `Esc` | Pause button |
| Retry | `Enter` | Rise Again |
| Mute | `M` | Speaker button |

## Run locally

It's a static site with no build step. Open `Flappy Bird/index.html` in a browser, or serve the folder:

```bash
npx serve "Flappy Bird"
```

The service worker only registers over HTTPS (and not on `localhost`), so offline mode is off while you develop.

## Deploy

The live game is served from the Nesture-X website (Next.js on Vercel) at
**https://nesturex.com/nx-gaming/flappy-horror**.

1. Copy the game files into the website repo:

   ```sh
   cd "Flappy Bird"
   DEST="../../../nesture-x-website/nesture-x-website/public/nx-gaming/flappy-horror"
   mkdir -p "$DEST/fonts"
   cp index.html main.js style.css sw.js manifest.webmanifest \
      favicon.png apple-touch-icon.png icon-192.png icon-512.png icon-maskable-512.png og.png \
      ghost.webp toppipe.webp bottompipe.webp flappybirdbg2.webp bg2.jpg df.mp3 \
      "$DEST/"
   cp fonts/* "$DEST/fonts/"
   ```

   (Don't copy `_redirects`; that file is only for Netlify. The original `ghost.png`, `toppipe.png`,
   `bottompipe.png` and `flappybirdbg2.png` are only the sources for the `.webp` files and aren't loaded by the game.)
2. Bump `CACHE` in `sw.js` (`nx-flappy-horror:v1` → `v2`, …) whenever you ship changes, so returning players get the new version.
   The page itself is network-first, but every other file is served from the cache until `CACHE` changes.
3. On the website, a route handler serves `public/nx-gaming/flappy-horror/index.html` at the clean URL and injects
   `<base href="/nx-gaming/flappy-horror/">`, and `next.config.ts` sends a `Service-Worker-Allowed` header for
   `sw.js` so offline play works without a trailing slash. Both mirror the 2048 setup.

The old Netlify site (`flappy-horror.netlify.app`, publishing `Flappy Bird/`) now just
301-redirects everything to the URL above via `Flappy Bird/_redirects`, so old shared links keep working.

### Regenerating images

The game's WebP sprites, the share image and the app icons are built with small Node scripts
(dev-only dependencies; the game itself has none):

```sh
npm install
npm run sprites # ghost/toppipe/bottompipe/flappybirdbg2 .webp from the .png originals
npm run og      # Flappy Bird/og.png (1200×630) from the ghost hero art
npm run icons   # icon-192/512, icon-maskable-512 and apple-touch-icon from favicon.png
```

Re-run `npm run sprites` after replacing any of those PNGs.

Fonts are self-hosted in `Flappy Bird/fonts/` (latin subsets from Google Fonts, SIL OFL 1.1; the licences
are next to them), so the game makes no third-party requests.

`tools/make-og.mjs` reads the ghost from the website repo
(`../../nesture-x-website/nesture-x-website/public/images/NX-Gaming/hero-flappy-horror.webp`).

## Assets

See [ASSETS.md](ASSETS.md) for every asset file, who made it and its licence status, and how to swap one out.

## Tech

Vanilla HTML, CSS and JavaScript, rendered on a single `<canvas>`.

- Fixed-timestep (60 Hz) physics, so the game plays the same on 60 Hz and 144 Hz screens.
- Rendering is sharp on high-DPI screens, and the stage scales responsively from phones to desktops.
- Sound effects are generated live with the Web Audio API.
- Service worker: network-first for the page, cache-first for assets, the soundtrack cached on first play.

---

© NX Gaming. All rights reserved. Made by [Nesture-X](https://nesturex.com/).
