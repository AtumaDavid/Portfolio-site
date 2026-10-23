import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion';
import { polar, squircle } from '../../lib/shapes';
import { useIntro } from '../../context/intro';
import { useLenisCtx } from '../../context/lenis';
import { profile } from '../../lib/data';
import { COLORS } from '../../lib/brand';

// Shape slot is 4:5 so the last shape lines up with the hero photo card.
const W = 220;
const H = 275;
const box = { cx: W / 2, cy: H / 2, size: 96 };

const STAGES = [
  { d: polar(() => 0.32, box), fill: COLORS.green, word: 'Hey there.' },
  { d: polar((t) => 1 + 0.17 * Math.cos(6 * t), box), fill: COLORS.coral, word: `I'm ${profile.name}.` },
  { d: polar((t) => 1 + 0.12 * Math.sin(3 * t) + 0.08 * Math.cos(5 * t + 1), box), fill: COLORS.butter, word: 'I build software' },
  { d: polar((t) => 1 + 0.2 * Math.cos(3 * t + Math.PI / 2), box), fill: COLORS.sky, word: 'you can count on.' },
  { d: squircle({ cx: W / 2, cy: H / 2, rx: W / 2, ry: H / 2, n: 9 }), fill: COLORS.green, word: "Let's go." },
];
const STEP = 640; // ms per stage
const HANDOFF = STEP * STAGES.length - 40; // morph finished, swap in the card
const TOTAL = HANDOFF + 520;
const EASE = [0.76, 0, 0.24, 1];
// Centre of the shape slot: the column is shape + 2rem gap + 5.5rem word line.
const HOLE = 'radial-gradient(circle at 50% calc(50% - 3.75rem), transparent var(--hole), #000 calc(var(--hole) + 1px))';

function Slots({ children, word }) {
  // Shared layout so the overlay shape and the hand-off card sit in the same spot.
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        pointerEvents: 'none',
      }}
    >
      <div style={{ width: W, height: H, position: 'relative' }}>{children}</div>
      <div style={{ height: '5.5rem', width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>{word}</div>
    </div>
  );
}

export default function Intro() {
  const { done, fromIntro, finish } = useIntro();
  const { stop, start } = useLenisCtx();
  const [stage, setStage] = useState(0);
  const [handoff, setHandoff] = useState(false);
  const cardRef = useRef(null);
  // Report where the final card is so the hero card can fly from there.
  const end = () => finish(cardRef.current?.getBoundingClientRect() ?? null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'));

  useEffect(() => {
    if (!fromIntro) return;
    try {
      history.scrollRestoration = 'manual';
    } catch {}
    window.scrollTo(0, 0);
    // Lenis is created in a parent effect, which runs after this one.
    const s = setTimeout(stop, 0);
    const timers = STAGES.slice(1).map((_, i) => setTimeout(() => setStage(i + 1), STEP * (i + 1)));
    const swap = setTimeout(() => setHandoff(true), HANDOFF);
    const endTimer = setTimeout(end, TOTAL);
    const counter = animate(count, 100, { duration: TOTAL / 1000, ease: [0.4, 0, 0.2, 1] });
    const onKey = (e) => (e.key === 'Escape' || e.key === 'Enter') && end();
    window.addEventListener('keydown', onKey);
    return () => {
      [s, swap, endTimer, ...timers].forEach(clearTimeout);
      counter.stop();
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (done && fromIntro) start();
  }, [done]);

  if (!fromIntro) return null;
  const last = stage === STAGES.length - 1;
  const cur = STAGES[stage];

  return (
    <>
      <AnimatePresence>
        {!done && (
          <motion.div
            key="intro"
            role="dialog"
            aria-label="Intro animation"
            // Exit: a hole opens from where the card sits and swallows the overlay.
            initial={{ '--hole': '0px' }}
            exit={{ '--hole': '2600px', transition: { duration: 1.2, ease: [0.3, 0.7, 0.2, 1] } }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: COLORS.ink,
              color: COLORS.cream,
              WebkitMaskImage: HOLE,
              maskImage: HOLE,
            }}
          >
            <Slots
              word={
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={stage}
                    className="headline"
                    initial={{ y: '110%', rotate: 6, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    exit={{ y: '-110%', rotate: -6, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    style={{ fontSize: 'clamp(2rem, 7vw, 4rem)', whiteSpace: 'nowrap', textAlign: 'center' }}
                  >
                    {cur.word}
                  </motion.div>
                </AnimatePresence>
              }
            >
              <motion.svg
                viewBox={`0 0 ${W} ${H}`}
                width={W}
                height={H}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: last ? 0 : stage * 72, opacity: handoff ? 0 : 1 }}
                transition={{
                  scale: { type: 'spring', stiffness: 200, damping: 14 },
                  rotate: { duration: STEP / 1000, ease: EASE },
                  opacity: { duration: 0 },
                }}
                style={{ overflow: 'visible' }}
              >
                <motion.path
                  initial={{ d: STAGES[0].d, fill: STAGES[0].fill }}
                  animate={{ d: cur.d, fill: cur.fill }}
                  transition={{ duration: (STEP - 80) / 1000, ease: EASE }}
                />
              </motion.svg>
            </Slots>

            <div
              style={{
                position: 'absolute',
                left: 'clamp(1rem, 4vw, 2.5rem)',
                right: 'clamp(1rem, 4vw, 2.5rem)',
                bottom: 'clamp(1rem, 4vw, 2rem)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '1rem',
              }}
            >
              <motion.span className="display" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1, opacity: 0.9 }}>
                {rounded}
              </motion.span>
              <button
                onClick={end}
                className="btn btn-ghost btn-sm"
                style={{ color: COLORS.cream, borderColor: 'rgba(255,248,242,0.4)', boxShadow: 'none' }}
              >
                Skip intro
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The final card. When the intro ends it unmounts, and the hero photo
          card flies from this exact spot into its place. */}
      <AnimatePresence>
        {!done && handoff && (
          <motion.div key="card" style={{ position: 'fixed', inset: 0, zIndex: 1001, pointerEvents: 'none' }}>
            <Slots word={null}>
              <div
                ref={cardRef}
                className="display"
                style={{
                  width: W,
                  height: H,
                  borderRadius: 32,
                  background: COLORS.green,
                  color: COLORS.ink,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4.5rem',
                  fontWeight: 800,
                  letterSpacing: '-0.06em',
                }}
              >
                <motion.span initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 12 }}>
                  {profile.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')}
                </motion.span>
              </div>
            </Slots>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
