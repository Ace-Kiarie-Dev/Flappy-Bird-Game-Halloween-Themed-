# Flappy Horror · The Reaper's Flight

An **NX Gaming** original. A Halloween take on Flappy Bird, rebuilt from scratch.

**Play:** https://flappy-horror.netlify.app

Guide a little reaper through a graveyard of grasping hands. Gather lost souls, phase through the dead, and survive the Blood Moon.

## What makes it different

- **Souls and Phase.** Cyan wisps float in the gaps. Collect 5 to charge your meter, then **Phase**: for a few seconds you drift straight through the hands. Phase never runs out while you're inside a hand or about to enter one.
- **Blood Moon.** Every 15 points the moon turns red, the screen bleeds, lightning strikes and the dead speed up for a stretch.
- **They stir.** From 20 points on, the hands start swaying up and down.
- **Medals of the dead.** Bone (10), Silver Skull (25), Gold Pumpkin (50), Blood Moon (100).
- **Crypt records.** Your best score, souls harvested and times claimed are saved in your browser.
- **Atmosphere.** Procedural scrolling graveyard, parallax fog, bats, embers, lightning with thunder, and synthesized sound effects layered over the soundtrack.

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

## Tech

Vanilla HTML, CSS and JavaScript, rendered on a single `<canvas>`.

- Fixed-timestep (60 Hz) physics, so the game plays the same on 60 Hz and 144 Hz screens.
- Rendering is sharp on high-DPI screens, and the stage scales responsively from phones to desktops.
- Sound effects are generated live with the Web Audio API.

---

© NX Gaming. All rights reserved.
