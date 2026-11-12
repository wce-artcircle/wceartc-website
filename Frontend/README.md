# ArtCircle — React + Vite

```bash
npm install
npm run dev        # http://localhost:5173
npm run build
```

- **All content:** `src/data/siteData.js` · **Images:** `public/assets/`
- Intro: Skip is always visible; "Tap to play" starts the star-collecting mini-game (8 stars fills the ring → dive into the site). Not played → auto-continues after ~9 s. Seen once → skipped on return (`localStorage` key `artcircle-intro-seen`; the "↻ Intro" button replays it).
- Reduced motion: mini-game replaced by a "Skip forward" button; starfield stops animating.
- To deploy under a sub-path (e.g. GitHub Pages) set `base` in `vite.config.js`; asset paths already respect it.
- Assets were cropped from your UX Pilot export. The PDF/HTML is a flattened render, so the "Content" and "Art & Deco" cards (not visible in it) use gradients until you add photos.
