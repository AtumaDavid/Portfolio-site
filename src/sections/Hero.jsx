import { useLayoutEffect, useRef } from 'react';
import { motion, useAnimationControls, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Calendar, ArrowDown } from 'lucide-react';
import { profile, work } from '../lib/data';
import { useLenisCtx } from '../context/lenis';
import { useUI } from '../context/ui';
import { useLocalTime } from '../hooks/useLocalTime';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { PopWords } from '../components/ui/Motion';
import { Dots, Ring } from '../components/decor/Decor';
import Note from '../components/ui/Note';
import MorphBlob from '../components/decor/MorphBlob';
import { useIntro } from '../context/intro';

const EASE = [0.16, 1, 0.3, 1];
// Jelly frame: corner radii wander so the photo card gently changes shape.
const JELLY = [
  '32px 32px 32px 32px / 32px 32px 32px 32px',
  '90px 36px 70px 44px / 60px 80px 40px 96px',
  '44px 96px 40px 80px / 96px 44px 80px 40px',
  '70px 44px 96px 36px / 40px 96px 60px 70px',
  '32px 32px 32px 32px / 32px 32px 32px 32px',
];
const SOFT = { stiffness: 80, damping: 20, mass: 0.5 };

export default function Hero() {
  const { scrollTo } = useLenisCtx();
  const { openContact, openCV } = useUI();
  const time = useLocalTime(profile.timeZone);
  const current = work[0];
  const reduce = useReducedMotion();
  // Hold every entrance until the opening sequence has handed over.
  const { done, fromIntro, fromRect } = useIntro();
  const rise = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: done ? { opacity: 1, y: 0 } : undefined,
    transition: { delay, duration: 0.9, ease: EASE },
  });
  const pop = (delay) => ({
    initial: { opacity: 0, scale: 0.3, rotate: -20 },
    animate: done ? { opacity: 1, scale: 1, rotate: 0 } : undefined,
    transition: { delay, type: 'spring', stiffness: 300, damping: 13 },
  });

  // Scroll: the hero drifts apart as you leave it.
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const p = useSpring(scrollYProgress, SOFT);
  const textY = useTransform(p, [0, 1], [0, -90]);
  const textOpacity = useTransform(p, [0, 0.75], [1, 0]);
  const artY = useTransform(p, [0, 1], [0, 140]);
  const artRotate = useTransform(p, [0, 1], [0, 8]);
  const artScale = useTransform(p, [0, 1], [1, 0.9]);
  const blobRotate = useTransform(p, [0, 1], [0, 90]);
  const cardY = [
    useTransform(p, [0, 1], [0, -160]),
    useTransform(p, [0, 1], [0, -60]),
    useTransform(p, [0, 1], [0, -220]),
    useTransform(p, [0, 1], [0, 40]),
  ];

  // Mouse: the photo card tilts toward the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 15 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 150, damping: 15 });
  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Hand-off: the photo card starts where the intro's card was and springs home.
  const frameRef = useRef(null);
  const frame = useAnimationControls();
  useLayoutEffect(() => {
    if (!done || !fromIntro) return;
    const r = frameRef.current.getBoundingClientRect();
    if (fromRect && !reduce) {
      frame.set({
        opacity: 1,
        x: fromRect.left + fromRect.width / 2 - (r.left + r.width / 2),
        y: fromRect.top + fromRect.height / 2 - (r.top + r.height / 2),
        scale: fromRect.width / r.width,
        rotate: -14,
      });
      frame.start({ x: 0, y: 0, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 65, damping: 13, mass: 1.1 } });
    } else {
      frame.set({ opacity: 0, scale: 0.6 });
      frame.start({ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 14 } });
    }
  }, [done]);

  const m = (styles) => (reduce ? {} : styles);
  // Cards and photo only drift on wide screens; on phones they're stacked.
  const wide = useMediaQuery('(min-width: 900px)');
  const w = (styles) => (reduce || !wide ? {} : styles);

  return (
    <section id="top" ref={ref} className="hero" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div style={{ position: 'absolute', top: -180, right: -200, width: 560, height: 560, ...m({ rotate: blobRotate }) }}>
        <MorphBlob size={560} color="color-mix(in srgb, var(--green) 14%, transparent)" style={{ inset: 0 }} />
      </motion.div>
      <div className="wrap hero-grid" style={{ position: 'relative', width: '100%' }}>
        <motion.div style={m({ y: textY, opacity: textOpacity })}>
          <Note play={done} delay={0.1} style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', marginBottom: '0.6rem' }}>
            <motion.span
              aria-hidden="true"
              style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
              animate={reduce || !done ? undefined : { rotate: [0, 18, -8, 18, -4, 0] }}
              transition={{ delay: 0.9, duration: 1.2, ease: 'easeInOut' }}
            >
              👋
            </motion.span>{' '}
            hey! I'm {profile.name}
          </Note>

          <PopWords
            as="h1"
            play={done}
            delay={0.3}
            stagger={0.08}
            text="I build software you can [count on.]"
            className="headline"
            style={{ fontSize: 'clamp(2.9rem, 7.4vw, 5.4rem)', maxWidth: '13ch' }}
          />

          <motion.p {...rise(0.85)} className="lede" style={{ marginTop: '1.5rem', fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)' }}>
            I'm a full-stack engineer in {profile.location.split(',')[0]}. I build web apps, APIs and the cloud setup
            they run on, from first sketch to live and looked after.
          </motion.p>

          <motion.div
            {...rise(1)}
            style={{ display: 'flex', gap: '0.9rem', marginTop: '2.2rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <motion.button
              onClick={() => openContact('call')}
              className="btn btn-primary"
              whileHover={{ scale: 1.04, rotate: -2 }}
              whileTap={{ scale: 0.94 }}
            >
              <Calendar size={18} /> Book a call
            </motion.button>
            <motion.button
              onClick={() => scrollTo('work')}
              className="btn btn-ghost"
              whileHover={{ scale: 1.04, rotate: 2 }}
              whileTap={{ scale: 0.94 }}
            >
              See my work{' '}
              <motion.span
                style={{ display: 'inline-flex' }}
                animate={reduce ? undefined : { y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 2 }}
              >
                <ArrowDown size={17} />
              </motion.span>
            </motion.button>
          </motion.div>
          <motion.p {...rise(1.1)} className="muted" style={{ marginTop: '1.1rem', fontSize: '0.95rem' }}>
            Hiring full-time?{' '}
            <button className="link" onClick={openCV}>
              Grab my CV
            </button>
          </motion.p>
        </motion.div>

        <motion.div
          className="hero-art"
          initial={fromIntro ? false : { opacity: 0, rotate: -12, y: 80, scale: 0.85 }}
          animate={{ opacity: 1, rotate: 0, y: 0, scale: 1 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 90, damping: 13 }}
        >
          <motion.div style={w({ y: artY, rotate: artRotate, scale: artScale })}>
            <motion.div style={{ position: 'relative', zIndex: 0, transformPerspective: 900, ...m({ rotateX: tiltX, rotateY: tiltY }) }}>
              <motion.div
                style={{ position: 'absolute', inset: 0, zIndex: -1 }}
                initial={fromIntro ? { scale: 0, rotate: -25 } : false}
                animate={done ? { scale: 1, rotate: 0 } : undefined}
                transition={{ delay: 0.55, type: 'spring', stiffness: 200, damping: 12 }}
              >
                <div className="hero-backdrop" />
              </motion.div>
              <motion.div ref={frameRef} initial={fromIntro ? { opacity: 0 } : false} animate={frame} style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                  className="hero-frame"
                  animate={reduce || !done ? undefined : { borderRadius: JELLY }}
                  transition={{ delay: 1.2, duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ borderRadius: JELLY[0] }}
                >
                  {profile.photo ? (
                    <img src={profile.photo} alt={`Photo of ${profile.name}`} width="440" height="550" fetchpriority="high" />
                  ) : (
                    <Monogram name={profile.name} />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          <Ring size={44} color="var(--coral)" className="float" style={{ top: -22, left: -18 }} />
          <Dots cols={4} rows={4} color="var(--accent)" style={{ bottom: 30, right: -34, zIndex: -1 }} />

          <div className="hero-cards">
            {profile.available && (
              <motion.div {...pop(1.1)} className="float-card" style={{ top: 26, left: -44, '--rot': '-4deg', ...w({ y: cardY[0] }) }}>
                <span className="sticker fill-green">
                  <span aria-hidden="true">✓</span> Available for projects
                </span>
              </motion.div>
            )}
            <motion.div {...pop(1.25)} className="float-card" style={{ bottom: 70, left: -64, '--rot': '3deg', ...w({ y: cardY[1] }) }}>
              <div className="card" style={{ padding: '0.85rem 1.05rem', maxWidth: 230 }}>
                <div className="label" style={{ fontSize: '0.68rem', marginBottom: '0.2rem' }}>
                  Currently
                </div>
                <div style={{ fontWeight: 700, lineHeight: 1.3, fontSize: '0.95rem' }}>
                  {current.role} at {current.company}
                </div>
              </div>
            </motion.div>
            <motion.div {...pop(1.4)} className="float-card" style={{ top: '44%', right: -40, '--rot': '5deg', ...w({ y: cardY[2] }) }}>
              <span className="sticker fill-butter" style={{ maxWidth: 200 }}>
                <span aria-hidden="true">🧪</span> Biochem grad turned engineer
              </span>
            </motion.div>
            <motion.div {...pop(1.55)} className="float-card" style={{ bottom: -18, right: 18, '--rot': '-2deg', ...w({ y: cardY[3] }) }}>
              <span className="sticker plain">
                <span aria-hidden="true">🕒</span> {time} in Lagos
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Shown until a real photo is added in data.js
function Monogram({ name }) {
  const reduce = useReducedMotion();
  // Hold every entrance until the opening sequence has handed over.
  const { done, fromIntro, fromRect } = useIntro();
  const rise = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: done ? { opacity: 1, y: 0 } : undefined,
    transition: { delay, duration: 0.9, ease: EASE },
  });
  const pop = (delay) => ({
    initial: { opacity: 0, scale: 0.3, rotate: -20 },
    animate: done ? { opacity: 1, scale: 1, rotate: 0 } : undefined,
    transition: { delay, type: 'spring', stiffness: 300, damping: 13 },
  });
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('');
  return (
    <div
      className="fill-green"
      role="img"
      aria-label={`${name} monogram`}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 200 250" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <motion.circle
          cx="160"
          cy="40"
          r="60"
          fill="var(--sky)"
          opacity="0.7"
          animate={reduce ? undefined : { cx: [160, 150, 160], cy: [40, 52, 40] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="30"
          cy="225"
          r="70"
          fill="var(--butter)"
          opacity="0.8"
          animate={reduce ? undefined : { cx: [30, 42, 30], cy: [225, 214, 225] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
        />
        <motion.path
          d="M20 70c15-12 30-12 45 0s30 12 45 0"
          stroke="var(--on-color)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
      <motion.span
        className="display"
        initial={{ scale: 0.4, rotate: -15, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 220, damping: 11 }}
        style={{ position: 'relative', fontSize: 'clamp(6rem, 18vw, 9rem)', fontWeight: 800, letterSpacing: '-0.06em' }}
      >
        {initials}
      </motion.span>
      <span
        style={{
          position: 'absolute',
          bottom: 22,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'var(--mono)',
          fontSize: '0.85rem',
          fontWeight: 600,
        }}
      >
        {'{ full-stack }'}
      </span>
    </div>
  );
}
