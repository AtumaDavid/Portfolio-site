import { motion } from 'framer-motion';
import MaskSvg from '../decor/MaskSvg';
import { SVG } from '../../lib/assets';

// Handwritten margin note with a hand-drawn arrow curling toward the heading
// below it. Scribbles in when scrolled into view, or when `play` turns true.
export default function Note({ children, color = 'var(--accent)', arrow = true, play, delay = 0, style = {} }) {
  const trigger =
    play !== undefined ? { animate: play ? 'show' : 'hidden' } : { whileInView: 'show', viewport: { once: true, amount: 1 } };
  return (
    <motion.p
      className="note"
      initial="hidden"
      {...trigger}
      variants={{
        hidden: { opacity: 0, rotate: -9, x: -10 },
        show: { opacity: 1, rotate: -3, x: 0, transition: { type: 'spring', stiffness: 260, damping: 15, delay } },
      }}
      style={{ color, ...style }}
    >
      <span>{children}</span>
      {arrow && (
        <MaskSvg
          src={SVG.noteArrow}
          color="currentColor"
          width={52}
          height={38}
          className="note-arrow"
          variants={{
            hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
            show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.8, ease: 'easeInOut', delay: delay + 0.25 } },
          }}
        />
      )}
    </motion.p>
  );
}
