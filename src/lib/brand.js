// Brand constants for JS. CSS uses the matching custom properties in
// src/styles/tokens.css — keep the two in sync. JS needs raw values where
// CSS variables can't reach: colour tweens, SVG fills in the intro, meta tags.

export const COLORS = {
  green: '#22d37a',
  ink: '#0f1b2d',
  cream: '#fff8f2',
  butter: '#ffd84d',
  sky: '#9ad8ff',
  coral: '#ff7a66',
};

// Browser UI colour (<meta name="theme-color">) per theme.
export const THEME_COLOR = { light: '#FFF8F2', dark: '#0E1726' };

// Default order for colour-cycled items (cards, stickers, tabs).
export const FILLS = ['fill-green', 'fill-butter', 'fill-sky', 'fill-coral'];
