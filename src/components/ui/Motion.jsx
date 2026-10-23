import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';

const SPRING = { type: 'spring', stiffness: 120, damping: 18, mass: 0.9 };
const BOUNCY = { type: 'spring', stiffness: 260, damping: 14 };

// Springy fade + rise (optionally with a little rotation) as it enters the viewport.
export function Reveal({ children, delay = 0, y = 40, rotate = 0, scale = 1, once = true, style = {}, amount = 0.3 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, rotate, scale }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ ...SPRING, delay, opacity: { duration: 0.5, delay } }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Headline whose words pop up one by one with a bounce.
// Wrap the highlighted part in [brackets]: "Teams I've built [with]".
// Pass `play` to control it yourself instead of triggering on scroll-in.
export function PopWords({ text, as = 'h2', className = '', style = {}, delay = 0, stagger = 0.07, play }) {
  const Tag = motion[as];
  const parts = text.split(/(\[[^\]]+\])/).filter(Boolean);
  let i = 0;
  const word = (w, key) => {
    const d = delay + i++ * stagger;
    return (
      <span key={key} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', padding: '0.08em 0.04em 0.12em', margin: '-0.08em -0.04em -0.12em' }}>
        <motion.span
          style={{ display: 'inline-block', transformOrigin: '0% 100%' }}
          variants={{ hidden: { y: '115%', rotate: 10 }, show: { y: 0, rotate: 0, transition: { ...BOUNCY, delay: d } } }}
        >
          {w}
        </motion.span>
      </span>
    );
  };
  const trigger = play !== undefined ? { animate: play ? 'show' : 'hidden' } : { whileInView: 'show', viewport: { once: true, amount: 0.6 } };
  return (
    <Tag initial="hidden" {...trigger} className={className} style={style} aria-label={text.replace(/[[\]]/g, '')}>
      {parts.map((p, pi) => {
        const marked = p.startsWith('[');
        const words = (marked ? p.slice(1, -1) : p).split(' ').filter(Boolean);
        const nodes = words.map((w, wi) => [word(w, `${pi}-${wi}`), wi < words.length - 1 ? ' ' : null]);
        const trailing = !marked && p.endsWith(' ') ? ' ' : null;
        const leading = !marked && p.startsWith(' ') ? ' ' : null;
        return marked ? (
          <motion.span
            key={pi}
            className="mark"
            aria-hidden="true"
            variants={{ hidden: { '--mark': 0 }, show: { '--mark': 1, transition: { duration: 0.6, delay: delay + i * stagger + 0.1 } } }}
          >
            {nodes}
          </motion.span>
        ) : (
          <span key={pi} aria-hidden="true">
            {leading}
            {nodes}
            {trailing}
          </span>
        );
      })}
    </Tag>
  );
}

// Moves its children vertically at a different rate to the page.
// speed > 0 drifts up as you scroll; < 0 drifts down.
export function Parallax({ children, speed = 60, rotate = 0, style = {}, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [speed, -speed]);
  const r = useTransform(smooth, [0, 1], [-rotate, rotate]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? style : { ...style, y, rotate: r }}>
      {children}
    </motion.div>
  );
}

// Thin bar at the very top that fills as you scroll the page.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: 'var(--green)',
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 200,
      }}
    />
  );
}
