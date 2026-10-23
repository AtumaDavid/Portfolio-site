import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Note from './Note';
import { stack, certifications, education } from '../../lib/data';
import { FILLS } from '../../lib/brand';

const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5];
const total = stack.reduce((n, g) => n + g.items.length, 0);

// Toolbox: pick a drawer, its tools tumble out as stickers.
export default function Toolbox() {
  const [open, setOpen] = useState(0);
  const [touched, setTouched] = useState(false);
  const g = stack[open];
  const fill = FILLS[open % FILLS.length];
  const next = (open + 1) % stack.length;

  // Until someone opens a drawer, the tabs do a little wave now and then
  // so it's obvious they're clickable.
  const tabsRef = useRef(null);
  const inView = useInView(tabsRef, { amount: 0.6 });
  const wave = useAnimationControls();
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView || touched || reduce) return;
    const run = () =>
      wave.start((i) => ({ y: [0, -8, 0], transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' } }));
    const first = setTimeout(run, 700);
    const loop = setInterval(run, 5000);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
    };
  }, [inView, touched, reduce]);

  const pick = (i, focus = false) => {
    setTouched(true);
    setOpen(i);
    if (focus) document.getElementById(`tb-tab-${i}`)?.focus();
  };
  const onKey = (e) => {
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    pick((open + d + stack.length) % stack.length, true);
  };

  return (
    <div className="card toolbox">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <Note arrow={false} style={{ marginBottom: '0.2rem' }}>
            tap a drawer to open it 👇
          </Note>
          <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}>My toolbox</h3>
        </div>
        <span className="pill">
          {stack.length} drawers · {total} tools
        </span>
      </div>

      {/* Drawer tabs */}
      <div ref={tabsRef} role="tablist" aria-label="Tool categories" className="toolbox-tabs" onKeyDown={onKey}>
        {stack.map((s, i) => {
          const active = i === open;
          return (
            <motion.button
              key={s.group}
              role="tab"
              id={`tb-tab-${i}`}
              aria-selected={active}
              aria-controls="tb-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => pick(i)}
              custom={i}
              animate={wave}
              whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
              whileTap={{ scale: 0.92, y: 1 }}
              className={`toolbox-tab ${active ? FILLS[i % FILLS.length] + ' is-active' : ''}`}
            >
              <span aria-hidden="true">{s.emoji}</span> {s.group}
              <span className="toolbox-count" aria-label={`${s.items.length} tools`}>
                {s.items.length}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* The open drawer */}
      <motion.div
        layout
        id="tb-panel"
        role="tabpanel"
        aria-labelledby={`tb-tab-${open}`}
        className={`toolbox-drawer ${fill}`}
        transition={{ layout: { type: 'spring', stiffness: 260, damping: 26 } }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={g.group} style={{ position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}
            >
              <span aria-hidden="true" style={{ fontSize: '1.9rem', lineHeight: 1 }}>
                {g.emoji}
              </span>
              <span className="display" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {g.group}
              </span>
            </motion.div>
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {g.items.map((it, i) => (
                <motion.li
                  key={it}
                  className="sticker inked"
                  initial={{ opacity: 0, y: -40, rotate: TILTS[i % TILTS.length] * 5, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, rotate: TILTS[i % TILTS.length], scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.8, transition: { duration: 0.15 } }}
                  whileHover={{ rotate: 0, scale: 1.08, y: -3 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 16, delay: 0.05 + i * 0.04 }}
                >
                  {it}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <motion.button
          layout="position"
          className="toolbox-next"
          onClick={() => pick(next)}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          Next drawer: {stack[next].emoji} {stack[next].group} <ArrowRight size={16} />
        </motion.button>
      </motion.div>

      {/* Credentials strip */}
      <div className="toolbox-creds">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span aria-hidden="true" className="toolbox-badge fill-butter">
            🎓
          </span>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontWeight: 700 }}>{education.degree}</div>
            <div className="muted" style={{ fontSize: '0.9rem' }}>
              {education.school}
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '0.55rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span aria-hidden="true" className="toolbox-badge fill-green" style={{ width: 28, height: 28, fontSize: '0.9rem' }}>
              ✓
            </span>
            Certified in
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {certifications.map((c) => (
              <li key={c} className="pill" style={{ color: 'var(--text)', fontSize: '0.82rem' }}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
