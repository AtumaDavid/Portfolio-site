import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { stack } from '../lib/data';
import Note from '../components/ui/Note';

const tools = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Nest.js', 'PostgreSQL', 'AWS', 'Docker', 'Nginx', 'Shopify'].filter(
  (t) => stack.some((g) => g.items.some((i) => i.includes(t))),
);
const tints = ['fill-butter', 'fill-sky', 'fill-coral', ''];
const tilts = [-3, 2, -1, 3, -2];

function Sticker({ t, i, hidden }) {
  const tint = tints[i % tints.length];
  return (
    <li
      aria-hidden={hidden || undefined}
      className={`sticker inked wiggle-hover ${tint}`}
      style={{
        '--rot': `${tilts[i % tilts.length]}deg`,
        transform: 'rotate(var(--rot))',
        flexShrink: 0,
        fontSize: '1.05rem',
        padding: '0.6rem 1.15rem',
      }}
    >
      {t}
    </li>
  );
}

// Endless row of stickers. Drifts on its own, speeds up with scroll speed
// and flips direction when you scroll back up.
function Marquee({ base = 1.2 }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const dir = useRef(1);
  const track = useRef(null);

  useAnimationFrame((_, delta) => {
    const half = track.current ? track.current.scrollWidth / 2 : 0;
    if (!half) return;
    const b = boost.get();
    if (b < -0.05) dir.current = -1;
    else if (b > 0.05) dir.current = 1;
    const move = dir.current * base * (delta / 16) * (1 + Math.abs(b));
    let next = x.get() - move;
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    x.set(next);
  });

  // Four copies so the row always overflows even on very wide screens.
  const row = [...tools, ...tools, ...tools, ...tools];
  return (
    <div style={{ overflow: 'hidden', padding: '0.6rem 0' }}>
      <motion.ul ref={track} style={{ x, listStyle: 'none', display: 'flex', gap: '0.9rem', width: 'max-content' }}>
        {row.map((t, i) => (
          <Sticker key={i} t={t} i={i % tools.length} hidden={i >= tools.length} />
        ))}
      </motion.ul>
    </div>
  );
}

export default function Facts() {
  const reduce = useReducedMotion();
  return (
    <section
      aria-label="Tools I use"
      className="fill-green"
      style={{ padding: 'clamp(2.5rem, 6vh, 3.5rem) 0', position: 'relative', overflow: 'hidden' }}
    >
      <div className="wrap">
        <Note color="var(--on-color)">my daily drivers</Note>
      </div>
      {reduce ? (
        <div className="wrap">
          <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
            {tools.map((t, i) => (
              <Sticker key={t} t={t} i={i} />
            ))}
          </ul>
        </div>
      ) : (
        <Marquee />
      )}
    </section>
  );
}
