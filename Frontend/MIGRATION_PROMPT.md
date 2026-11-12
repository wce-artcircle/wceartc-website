# Antigravity migration prompt

Open **both** projects in Antigravity (this new `artcircle/` project + your old one as a second workspace folder), then paste everything below the line into the agent.

---

You are migrating content from my OLD ArtCircle project into this NEW React (Vite + framer-motion) project. The new project's design, layout, animations, intro mini-game and CSS are final — **do not redesign, restyle or restructure components.** Your job is data and asset migration only.

## Ground rules
1. The single source of truth for all content is `src/data/siteData.js`. Edit only that file plus files in `public/assets/`. Touch `src/components/*` or `src/styles.css` only if a field I add genuinely needs rendering, and keep changes minimal.
2. Do not delete or overwrite anything in the OLD project. Read from it, write to the NEW one.
3. Never invent content. If something exists in the old project, copy it exactly (spelling, dates, numbers). If it doesn't exist, keep the current placeholder and list it in the report.
4. Keep the existing exported names and object shapes in `siteData.js` (`club`, `nav`, `footerLinks`, `socials`, `disciplines`, `events`, `assets`).

## Steps
1. **Inventory the old project.** Find where it keeps: club name/tagline/about text, stats, member lists or counts, disciplines/departments, events (title, date, venue, status, poster, gallery), team/core members, social links, contact email, forms/backend endpoints, and image/video/font files. Output a short table: *old location → new field*.
2. **Assets.** Copy images into `public/assets/` with lowercase-kebab-case names. Convert anything >500 KB to optimised `.webp`/`.jpg` (max 1600 px wide). Reference them in `siteData.js` through the existing `A('file.jpg')` helper. Replace the cropped placeholder photos (`disc-*.jpg`, `event-*.jpg`, `globe.png`, `mandala.png`) when the old project has better originals; keep filenames consistent or update references.
3. **Disciplines.** Map each old discipline/department to an entry in `disciplines` (`id, name, headline, blurb, members, meets, accent (hex), image|null, href`). Keep 6 if the old site has 6; the carousel adapts to any count. Pick an accent colour from the old brand if one exists.
4. **Events.** Map each event to `events` (`id, status 'live'|'completed', tag, title, subtitle, date, venue, image, gallery` plus `seats {taken,total}` for live or `stat` for completed). Decide status from the date vs. today. At most ONE event should be `live` — it drives the Register popup and the "Live now" nav button. If none is live, the popup simply doesn't appear.
5. **Club info, stats, socials, footer.** Fill `club`, `socials`, `footerLinks`, `nav`. Update `club.email`, `discordUrl`, `joinUrl` and the copyright year.
6. **Registration.** If the old project has a form/API/Google Form/Firebase for sign-ups, wire it into `src/components/RegisterModal.jsx` at the `// TODO` in `submit`, keeping the same success state. Put any keys in `.env` (`VITE_…`), never in source, and add `.env.example`.
7. **Extra pages/features** the old project has that the new one lacks (e.g. gallery, team page): list them in the report and propose — do not build — until I approve.
8. **Verify.** Run `npm install && npm run build`; fix any errors. Run `npm run dev` and check: intro plays and Skip works, the mini-game starts from "Tap to play", all cards show real images (no broken paths), Register popup opens for the live event, mobile width 375 px has no horizontal scroll.

## Report back
- Fields migrated, with old → new mapping
- Assets copied/replaced
- Anything missing or ambiguous (with the exact placeholder left behind)
- Features in the old project that were NOT migrated
