// Every SVG file the site uses, in one place. The files live in src/assets/svg/:
//   brand/     logo mark (also the favicon)
//   decor/     single-colour shapes, drawn via CSS masks so the colour can
//              follow the theme (see components/decor/MaskSvg.jsx)
//   services/  "What I do" card illustrations
// Importing them (rather than serving from public/) means Vite fingerprints
// them, picks up changes without a restart, and fails the build if one is
// missing. Morphing shapes (blobs, the intro) are generated in lib/shapes.js.

import logo from '../assets/svg/brand/logo.svg';
import noteArrow from '../assets/svg/decor/note-arrow.svg';
import squiggle from '../assets/svg/decor/squiggle.svg';
import ring from '../assets/svg/decor/ring.svg';
import dot from '../assets/svg/decor/dot.svg';
import web from '../assets/svg/services/web.svg';
import api from '../assets/svg/services/api.svg';
import plan from '../assets/svg/services/plan.svg';
import cloud from '../assets/svg/services/cloud.svg';

export const SVG = {
  logo,
  noteArrow,
  squiggle,
  ring,
  dot,
  services: { web, api, plan, cloud },
};
