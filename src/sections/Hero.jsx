import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MaskText } from '../components/Motion';
import { profile } from '../lib/data';
import { useLenisCtx } from '../lib/lenis';
import { useUI } from '../lib/ui';
import CursorField from '../components/CursorField';

export default function Hero() {
  const { scrollTo } = useLenisCtx();
  const { openContact, openCV } = useUI();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  // Only keep the opacity transform — visually the most impactful, lowest cost.
  // Removed scale and y transforms which triggered per-frame repaints.
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section
      ref={ref}
      id="top"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <CursorField />
      <motion.div style={{ opacity }} className="wrap" data-hero>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem',
            marginBottom: '1.75rem',
          }}
        >
          {/* <span style={{ position: 'relative', display: 'inline-flex' }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#30d158',
              }}
            />
            <motion.span
              animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: '#30d158',
              }}
            />
          </span> */}
          {/* <span className="eyebrow" style={{ color: 'var(--text-2)' }}>
            Available for work · {profile.location}
          </span> */}
        </motion.div>

        <h1
          className="headline grad-text"
          style={{ fontSize: 'clamp(3.2rem, 11vw, 9rem)', fontWeight: 600 }}
        >
          <MaskText text="Atuma David" delay={0.45} stagger={0.06} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1.15rem, 3vw, 1.9rem)',
            color: 'var(--text-2)',
            fontWeight: 400,
            maxWidth: '24ch',
            margin: '1.5rem auto 0',
            lineHeight: 1.3,
          }}
        >
          Software engineer building dependable full-stack systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            display: 'flex',
            gap: '0.9rem',
            justifyContent: 'center',
            marginTop: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <button onClick={() => scrollTo('work')} className="btn btn-primary">
            See my work
          </button>
          <button
            onClick={() => openContact('message')}
            className="btn"
            style={{ color: 'var(--accent)', background: 'transparent' }}
          >
            Get in touch ›
          </button>
          <button
            onClick={openCV}
            className="btn"
            style={{
              background: 'transparent',
              color: 'var(--text-2)',
              border: '1px solid var(--line-2)',
            }}
          >
            View CV
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo('intro')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          position: 'absolute',
          bottom: '2.2rem',
          left: '50%',
          x: '-50%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-3)',
        }}
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ display: 'block' }}
        >
          <ChevronDown size={22} />
        </motion.span>
      </motion.button>
    </section>
  );
}
