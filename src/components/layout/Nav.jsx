import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useLenisCtx } from '../../context/lenis';
import { useUI } from '../../context/ui';
import { profile } from '../../lib/data';
import Logo from '../ui/Logo';
import { COLORS } from '../../lib/brand';

const items = [
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export default function Nav() {
  const { scrollTo } = useLenisCtx();
  const { openContact } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const jump = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ position: 'fixed', top: 12, left: 0, right: 0, zIndex: 100 }}
      >
        <div className="wrap">
          {/* Morphs from a full-width bar into a compact floating pill on scroll */}
          <motion.div
            animate={{ maxWidth: scrolled ? 860 : 1160 }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            style={{
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '0.45rem 0.5rem 0.45rem 1.1rem',
              borderRadius: 'var(--pill)',
              background: scrolled ? 'color-mix(in srgb, var(--card) 88%, transparent)' : 'transparent',
              backdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
              WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
              boxShadow: scrolled ? 'var(--shadow)' : 'none',
              border: `1.5px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
              transition: 'background 0.3s, box-shadow 0.3s, border-color 0.3s',
            }}
          >
            <button
              onClick={() => jump('top')}
              className="display"
              aria-label={`${profile.name}, back to top`}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '1.15rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                minHeight: 44,
              }}
            >
              <Logo size={30} />
              {profile.name}
            </button>

            <nav className="nav-d" aria-label="Main" style={{ display: 'flex', gap: '1.6rem', alignItems: 'center' }}>
              {items.map((it) => (
                <button key={it.id} onClick={() => jump(it.id)} className="nav-link">
                  {it.label}
                </button>
              ))}
              <ThemeToggle />
              <button onClick={() => openContact('call')} className="btn btn-primary btn-sm">
                <Calendar size={15} /> Book a call
              </button>
            </nav>

            <div className="nav-m" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
              <ThemeToggle />
              <button
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'var(--text)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                }}
              >
                {[0, 1].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ rotate: open ? (i === 0 ? 45 : -45) : 0, y: open ? (i === 0 ? 3.5 : -3.5) : 0 }}
                    style={{ width: 18, height: 2, borderRadius: 2, background: 'var(--bg)', display: 'block' }}
                  />
                ))}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fill-green"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 90,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 1.5rem',
              gap: '0.3rem',
            }}
          >
            {items.map((it, i) => (
              <motion.button
                key={it.id}
                onClick={() => jump(it.id)}
                initial={{ opacity: 0, y: 22, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.05 * i + 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                className="display"
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '0.6rem 0',
                  cursor: 'pointer',
                  fontSize: '2.6rem',
                  fontWeight: 800,
                  color: 'var(--on-color)',
                }}
              >
                {it.label}
              </motion.button>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginTop: '1.5rem' }}>
              <button
                onClick={() => {
                  setOpen(false);
                  openContact('call');
                }}
                className="btn"
                style={{ background: 'var(--on-color)', color: COLORS.cream }}
              >
                <Calendar size={17} /> Book a call
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          .nav-d { display: none !important; }
          .nav-m { display: flex !important; }
        }
      `}</style>
    </>
  );
}
