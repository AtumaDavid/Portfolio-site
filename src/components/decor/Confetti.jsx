import { motion } from 'framer-motion';
import { COLORS } from '../../lib/brand';

// Little burst of palette shapes from a point. Position it with `style`
// (it's absolutely positioned); it plays once when mounted.
export default function Confetti({ count = 14, distance = 70, delay = 0.15, style = {} }) {
  const colors = [COLORS.green, COLORS.coral, COLORS.butter, COLORS.sky];
  return (
    <div aria-hidden="true" style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        const d = distance + (i % 3) * 22;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
            animate={{ x: Math.cos(a) * d, y: Math.sin(a) * d, scale: 1, rotate: 180 + i * 40, opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.2, 0.8, 0.3, 1], delay }}
            style={{
              position: 'absolute',
              width: i % 2 ? 10 : 8,
              height: i % 2 ? 10 : 14,
              borderRadius: i % 3 === 0 ? '50%' : 3,
              background: colors[i % colors.length],
            }}
          />
        );
      })}
    </div>
  );
}
