import { motion, useReducedMotion } from 'framer-motion';
import { BLOBS } from '../../lib/shapes';

// Ambient blob that slowly morphs between organic shapes and spins.
export default function MorphBlob({ size = 520, color = 'var(--green)', duration = 14, style = {} }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ repeat: Infinity, duration: duration * 3, ease: 'linear' }}
      style={{ position: 'absolute', pointerEvents: 'none', zIndex: 0, ...style }}
    >
      <motion.path
        d={BLOBS[0]}
        animate={reduce ? undefined : { d: [...BLOBS, BLOBS[0]] }}
        transition={{ repeat: Infinity, duration, ease: 'easeInOut' }}
        style={{ fill: color }}
      />
    </motion.svg>
  );
}
