import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// Fade + rise as it enters the viewport.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  style = {},
  amount = 0.4,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Word-by-word mask reveal (used on load for big headlines).
export function MaskText({ text, delay = 0, stagger = 0.05, style = {} }) {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline-block', ...style }}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '108%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.95,
              ease: EASE,
              delay: delay + i * stagger,
            }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Faded paragraph that fades in fully on scroll — lightweight alternative to ScrubText.
// Uses a single `whileInView` instead of per-word useTransform subscriptions.
export function ScrubText({ text, style = {} }) {
  const words = text.split(' ');
  return (
    <motion.p
      initial={{ opacity: 0.18 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ ...style, display: 'flex', flexWrap: 'wrap' }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ marginRight: '0.28em' }}>
          {w}
        </span>
      ))}
    </motion.p>
  );
}
