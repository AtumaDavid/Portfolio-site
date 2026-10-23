import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useLenisCtx } from '../lib/lenis';
import { useUI } from '../lib/ui';

const items = [
  { label: 'Work', id: 'work' },
  // { label: 'Projects', id: 'projects' },
  { label: 'Stack', id: 'stack' },
  { label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const { scrollTo } = useLenisCtx();
  const { openContact } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 40);
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(24px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--glass-border)'
            : '1px solid transparent',
          transition:
            'background 0.4s var(--ease), border-color 0.4s var(--ease)',
        }}
      >
        {/* Scroll progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            right: 0,
            height: 2,
            background: 'transparent',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: 'var(--accent)',
              transition: 'width 0.1s linear',
              borderRadius: '0 1px 1px 0',
            }}
          />
        </div>

        <div
          className="wrap"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={() => jump('top')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            Atuma David
          </button>

          <nav
            className="nav-d"
            style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
          >
            {items.map((it) => (
              <button
                key={it.id}
                onClick={() => jump(it.id)}
                className="nav-link"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  color: 'var(--text-2)',
                }}
              >
                {it.label}
              </button>
            ))}
            <button
              onClick={() => openContact('message')}
              className="btn btn-primary"
              style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}
            >
              Get in touch
            </button>
            <ThemeToggle />
          </nav>

          <div
            className="nav-m"
            style={{ display: 'none', alignItems: 'center', gap: '1rem' }}
          >
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                padding: 4,
              }}
            >
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  animate={{
                    rotate: open ? (i === 0 ? 45 : -45) : 0,
                    y: open ? (i === 0 ? 3.5 : -3.5) : 0,
                  }}
                  style={{
                    width: 20,
                    height: 1.5,
                    background: 'var(--text)',
                    display: 'block',
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              background: 'var(--bg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 2rem',
            }}
          >
            {items.map((it, i) => (
              <motion.button
                key={it.id}
                onClick={() => jump(it.id)}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.06 * i + 0.08,
                  ease: [0.16, 1, 0.3, 1],
                  duration: 0.5,
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--line)',
                  textAlign: 'left',
                  padding: '1.4rem 0',
                  cursor: 'pointer',
                  fontSize: '2.2rem',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                }}
              >
                {it.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-d { display: none !important; }
          .nav-m { display: flex !important; }
        }
      `}</style>
    </>
  );
}
