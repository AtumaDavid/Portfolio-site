import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase, Sparkles, Smile, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useLenisCtx } from '../../context/lenis';
import { useUI } from '../../context/ui';
import { useIntro } from '../../context/intro';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { profile } from '../../lib/data';
import Logo from '../ui/Logo';

// One-page site: links jump to sections, and the current section is
// highlighted as you scroll. `sections` lists which page sections count
// as each link (e.g. the process road belongs to Services).
const items = [
  { label: 'Work', id: 'work', icon: Briefcase, sections: ['work'] },
  { label: 'Services', id: 'services', icon: Sparkles, sections: ['services', 'process'] },
  { label: 'About', id: 'about', icon: Smile, sections: ['about', 'kind-words'] },
  { label: 'Contact', id: 'contact', icon: Mail, sections: ['contact'] },
];
const SECTIONS = Object.fromEntries(items.map((it) => [it.id, it.sections]));
const SPRING = { type: 'spring', stiffness: 420, damping: 34 };

export default function Nav() {
  const { scrollTo } = useLenisCtx();
  const { openContact } = useUI();
  const { done } = useIntro();
  const wide = useMediaQuery('(min-width: 860px)');
  const active = useActiveSection(SECTIONS);
  const dir = useScrollDirection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const home = (
    <button
      onClick={() => scrollTo('top')}
      className="display nav-home"
      aria-label={`${profile.name}, back to top`}
    >
      <Logo size={30} />
      {profile.name}
    </button>
  );

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
            className={`nav-bar ${scrolled ? 'is-scrolled' : ''}`}
          >
            {home}
            {wide ? (
              <nav aria-label="Main" className="nav-links">
                {items.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => scrollTo(it.id)}
                    className={`nav-link ${active === it.id ? 'is-active' : ''}`}
                    aria-current={active === it.id ? 'location' : undefined}
                  >
                    {active === it.id && <motion.span layoutId="nav-active" className="nav-link-pill" transition={SPRING} />}
                    <span style={{ position: 'relative' }}>{it.label}</span>
                  </button>
                ))}
                <ThemeToggle />
                <button onClick={() => openContact('call')} className="btn btn-primary btn-sm">
                  <Calendar size={15} /> Book a call
                </button>
              </nav>
            ) : (
              <ThemeToggle />
            )}
          </motion.div>
        </div>
      </motion.header>

      {/* Phones: thumb-reachable tab bar. Tucks away while scrolling down. */}
      {!wide && (
        <AnimatePresence>
          {done && (
            <motion.nav
              aria-label="Main"
              className="dock"
              initial={{ y: 120 }}
              animate={{ y: dir === 'down' ? 120 : 0 }}
              exit={{ y: 120 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {items.slice(0, 2).map((it) => (
                <DockItem key={it.id} it={it} active={active === it.id} onClick={() => scrollTo(it.id)} />
              ))}
              <motion.button
                className="dock-cta"
                onClick={() => openContact('call')}
                whileTap={{ scale: 0.9 }}
                aria-label="Book a call"
              >
                <Calendar size={22} strokeWidth={2.4} />
                <span>Book</span>
              </motion.button>
              {items.slice(2).map((it) => (
                <DockItem key={it.id} it={it} active={active === it.id} onClick={() => scrollTo(it.id)} />
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

function DockItem({ it, active, onClick }) {
  const Icon = it.icon;
  return (
    <motion.button
      onClick={onClick}
      className={`dock-item ${active ? 'is-active' : ''}`}
      aria-current={active ? 'location' : undefined}
      whileTap={{ scale: 0.9 }}
    >
      {active && <motion.span layoutId="dock-active" className="dock-pill" transition={SPRING} />}
      <Icon size={20} strokeWidth={2.2} style={{ position: 'relative' }} />
      <span style={{ position: 'relative' }}>{it.label}</span>
    </motion.button>
  );
}
