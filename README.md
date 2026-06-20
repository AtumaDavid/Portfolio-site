# Atuma David — Portfolio

A single-page, scroll-driven portfolio in the spirit of Apple's product pages —
true-black / clean-white themes, Liquid Glass surfaces, momentum scrolling, and
fluid modal animations throughout.

## Run it locally

Requires Node.js 18+.

    npm install
    npm run dev

Production build:

    npm run build
    npm run preview

## What's inside

- Dark / light theme (toggle in nav, remembers your choice)
- Liquid Glass material on the nav, cards and modals
- Mouse-reactive particle field in the hero + pointer glow on cards
- Work & Projects open into enlarging glass modals (scrollable, custom scrollbars)
- "Get in touch" → contact modal with a **message form** and an **appointment booker**
  (adds the call to Google Calendar or downloads an .ics)
- **View CV** → in-page PDF preview (open in new tab / download too)
- **Link previews**: every external link opens a mini "preview" card first
  (Open Graph image + domain) before opening in a new tab

## Edit your content — one file

Everything reads from **src/lib/data.js**:

- profile — name, role, email, phone, social links, cvPath
- work — companies + products (each product can have a live link)
- projects — personal builds
- stack, certifications, education

### Email sending
By default the message form opens the visitor's mail app prefilled to you
(mailto). To send in-page without leaving the site, create a free key at
web3forms.com and set `profile.web3formsKey` in src/lib/data.js.

### Booking
The booker builds a Google Calendar event (with you as guest) and an .ics file.
To use Calendly instead, set `profile.calendlyUrl`.

### CV
Replace public/Atuma-David-CV.pdf with your own (keep the filename, or update
`profile.cvPath`).

### Project / product images
Optional. Drop files into public/images/ and set the `image` field; otherwise a
tasteful placeholder shows.

## Notes

- Link previews use the free microlink.io API (100 req/day per IP, no key).
- Smooth scrolling: lenis. Animation: framer-motion.

---

Built for Atuma David • Lagos, Nigeria
