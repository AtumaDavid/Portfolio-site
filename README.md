# Atuma David — Portfolio

A playful, single-page portfolio: warm colour blocks, sticker-style UI,
handwritten notes, morphing shapes and smooth, scroll-driven animation —
in light and dark themes.

## Run it locally

Requires Node.js 18+.

    npm install
    npm run dev

Production build:

    npm run build
    npm run preview

## Edit your content — one file

Everything you'd normally change lives in **src/lib/data.js**:

- `profile` — name, contact details, links, CV path, photo, story, stickers
- `services` and `steps` — the "What I do" cards and "How I work" steps
- `work` — companies and the products shipped there (live links optional;
  `shippedLabel` / `moreShipped` for work that can't be shown publicly)
- `stack` — the toolbox drawers (each with an emoji), plus `certifications`
  and `education`
- `testimonials` — real quotes only; the section stays hidden while empty

### Your photo

Drop it into `public/images/` and set `profile.photo` (e.g. `'/images/me.jpg'`).
Until then the hero shows the "AD" monogram card.

### Messages and bookings

The message form sends in-page via web3forms when `profile.web3formsKey` is
set, otherwise it opens the visitor's mail app. "Book a call" links to
`profile.calendlyUrl`.

### CV

Replace `public/Atuma-David-CV.pdf` (keep the filename, or update
`profile.cvPath`).

## Project structure

    src/
      App.jsx, main.jsx
      assets/svg/   every SVG file the site uses (imported via src/lib/assets.js)
        brand/      logo.svg — the "AD" mark, also the favicon
        decor/      note-arrow, squiggle, ring, dot — single-colour shapes painted
                    in theme colours via CSS masks (components/decor/MaskSvg.jsx)
        services/   web, api, plan, cloud — the "What I do" illustrations
      lib/          data.js (content), brand.js (colours for JS), assets.js (SVG imports),
                    shapes.js (morphing shapes)
      context/      app-wide providers: theme, intro, smooth scroll (lenis), modals (ui)
      hooks/        useLocalTime, useMediaQuery
      sections/     one file per page section: Hero, Facts, Work, Services, About,
                    Testimonials, Contact
      components/
        ui/         reusable building blocks: Motion (Reveal, PopWords, Parallax,
                    ScrollProgress), Note, SectionHeader, Logo, Toolbox
        decor/      Squiggle/Dots/Ring, MaskSvg, MorphBlob, ServiceArt
        modals/     Modal shell (+ ModalHeader), ContactModal, CVModal, PdfViewer
        layout/     Nav, Intro (opening animation), ThemeToggle
      styles/       tokens.css → base.css → components.css → sections.css → modals.css

To add an SVG, drop it in the right `src/assets/svg/` folder and import it in
`src/lib/assets.js`; a missing file fails the build instead of showing a broken
image. Shapes that morph while animating (the blobs and the intro sequence) aren't
files: they're generated in `src/lib/shapes.js`.

Design tokens (colours, radii, shadows, fonts) are CSS variables in
`src/styles/tokens.css`; `src/lib/brand.js` mirrors the colours for places
CSS variables can't reach (colour tweens, the intro, meta tags).

## Motion

Smooth scrolling uses Lenis; animation uses framer-motion. Everything —
including the intro and smooth scrolling — switches off for visitors who
prefer reduced motion. The intro plays once per browser session; to see it
again run `sessionStorage.removeItem('introSeen')` in the console and reload.

## Brand, icons & link previews

- `src/assets/svg/brand/logo.svg` is the "AD" logo mark — the favicon, and the logo
  in the nav/footer. `favicon.ico`, `apple-touch-icon.png` and the `icon-*.png`
  files are rendered from it; `brand/icon-full-bleed.svg` is the
  edge-to-edge version used for the Apple and maskable icons.
- `public/og-image.png` is the 1200×630 image shown when the site is shared.
  Its source is `brand/og-image.html`; to re-render after editing:

      google-chrome --headless=new --hide-scrollbars --window-size=1200,630 \
        --virtual-time-budget=8000 --screenshot=public/og-image.png brand/og-image.html

- Set `SITE_URL` (e.g. `SITE_URL=https://yourdomain.com npm run build`) so link
  previews use full URLs. Netlify and Vercel production builds fill it in
  automatically.

---

Built for Atuma David • Lagos, Nigeria
