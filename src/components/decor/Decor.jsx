import { motion } from 'framer-motion';
import MaskSvg from './MaskSvg';
import { SVG } from '../../lib/assets';

// Decorative shapes (artwork in public/svg/decor). All aria-hidden,
// positioned by the caller and kept away from text.

const REVEAL = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.1, ease: 'easeInOut', delay: 0.3 } },
};

export function Dots({ cols = 5, rows = 4, gap = 14, color = 'var(--green)', style = {}, className = '' }) {
  return (
    <MaskSvg
      src={SVG.dot}
      tile={gap}
      color={color}
      width={(cols - 1) * gap + 6}
      height={(rows - 1) * gap + 6}
      className={className}
      style={{ position: 'absolute', ...style }}
    />
  );
}

export function Ring({ size = 48, color = 'var(--coral)', style = {}, className = '' }) {
  return (
    <MaskSvg src={SVG.ring} color={color} width={size} height={size} className={className} style={{ position: 'absolute', ...style }} />
  );
}

// Wavy underline that draws itself in (left to right) when scrolled into view.
// The in-view check sits on an unclipped wrapper: a fully clipped element
// never counts as visible, so it would never start.
export function Squiggle({ width = 140, color = 'var(--accent)', style = {} }) {
  return (
    <motion.span
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      style={{ display: 'block', width, ...style }}
    >
      <MaskSvg src={SVG.squiggle} color={color} width={width} height={width * 0.14} variants={REVEAL} />
    </motion.span>
  );
}
