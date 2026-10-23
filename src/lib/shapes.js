// Shape generator for morphing. Every shape is sampled at the same number
// of points in the same angular order, so framer-motion can tween the SVG
// `d` string point-for-point between any two of them.

const N = 96;

function toPath(points) {
  return 'M' + points.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L') + 'Z';
}

// Polar shape: radius as a function of angle. r(θ) ≈ 1 is "round".
export function polar(r, { cx = 100, cy = 100, size = 90, sx = 1, sy = 1 } = {}) {
  const pts = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const rr = r(t) * size;
    pts.push([cx + Math.cos(t) * rr * sx, cy + Math.sin(t) * rr * sy]);
  }
  return toPath(pts);
}

// Superellipse: a rounded rectangle when n is large (≈ 6-10).
export function squircle({ cx = 100, cy = 100, rx = 90, ry = 90, n = 8 } = {}) {
  const pts = [];
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    pts.push([cx + rx * Math.sign(c) * Math.abs(c) ** (2 / n), cy + ry * Math.sign(s) * Math.abs(s) ** (2 / n)]);
  }
  return toPath(pts);
}

// Organic blobs for ambient decoration (200×200 viewBox).
export const BLOBS = [
  polar((t) => 1 + 0.1 * Math.sin(3 * t) + 0.06 * Math.cos(5 * t + 1)),
  polar((t) => 1 + 0.14 * Math.cos(2 * t + 0.5) + 0.05 * Math.sin(6 * t)),
  polar((t) => 1 + 0.09 * Math.sin(4 * t + 2) + 0.08 * Math.cos(3 * t)),
  polar((t) => 1 + 0.12 * Math.cos(3 * t + 1.2) + 0.04 * Math.sin(7 * t)),
];
