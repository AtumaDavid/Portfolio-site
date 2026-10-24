import { useEffect, useRef } from 'react';
import { motion, useDragControls, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLenisCtx } from '../../context/lenis';
import MorphBlob from '../decor/MorphBlob';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const BLOOM = { type: 'spring', stiffness: 160, damping: 18 };
// Opening: the panel starts as a round blob and springs into a card.
const OPEN = {
  initial: { opacity: 0, scale: 0.6, y: 60, rotate: -6, borderRadius: 240 },
  animate: { opacity: 1, scale: 1, y: 0, rotate: 0, borderRadius: 28 },
  exit: { opacity: 0, scale: 0.85, y: 40, rotate: 4, borderRadius: 120, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
};
// Phones: a bottom sheet that slides up, leaving page visible above it.
const SHEET = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%', transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
};
const OPEN_REDUCED = {
  initial: { opacity: 0 },
  animate: { opacity: 1, borderRadius: 28 },
  exit: { opacity: 0 },
};

// Stagger helper for modal contents: wrap blocks in <motion.div variants={modalItem}>.
export const modalItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};
export const modalList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.18 } },
};

// Shared shell for every modal on the site. With `layoutId` it morphs out of
// the card that opened it; otherwise it blooms open from a blob. On phones it
// becomes a bottom sheet you can drag down to close.
// `header` sits above the scroll area and stays put while content scrolls.
// Closes on: the X, the backdrop, Escape, dragging down, or the back button.
export default function Modal({
  layoutId,
  onClose,
  children,
  header = null,
  maxWidth = 680,
  height,
  scroll = true,
  hideClose = false,
  blob = 'var(--green)',
  label,
}) {
  const lenis = useLenisCtx();
  const reduce = useReducedMotion();
  const sheet = useMediaQuery('(max-width: 640px)');
  const drag = useDragControls();
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && close.current();
    window.addEventListener('keydown', onKey);
    // Back button closes the modal instead of leaving the site.
    let popped = false;
    history.pushState({ modal: true }, '');
    const onPop = () => {
      popped = true;
      close.current();
    };
    window.addEventListener('popstate', onPop);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', onPop);
      if (!popped && history.state?.modal) history.back();
    };
  }, []);

  const panelMotion = sheet
    ? SHEET
    : layoutId
      ? { layoutId, style: { borderRadius: 28 } }
      : reduce
        ? OPEN_REDUCED
        : OPEN;
  const startDrag = (e) => sheet && drag.start(e);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1500,
        display: 'flex',
        alignItems: sheet ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: sheet ? 0 : 'clamp(0.75rem,4vw,2.5rem)',
      }}
    >
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        transition={{ duration: 0.3 }}
        className="modal-backdrop"
      />
      {/* Colour bloom behind the panel */}
      {!sheet && (
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, transition: { duration: 0.25 } }}
        transition={BLOOM}
        style={{ position: 'absolute', width: 'min(900px, 120vw)', aspectRatio: '1', pointerEvents: 'none' }}
      >
        <MorphBlob size="100%" color={`color-mix(in srgb, ${blob} 30%, transparent)`} duration={10} style={{ inset: 0 }} />
      </motion.div>
      )}

      <motion.div
        {...panelMotion}
        transition={sheet ? { type: 'spring', stiffness: 320, damping: 34 } : { type: 'spring', stiffness: 230, damping: 20 }}
        className={`modal-panel ${sheet ? 'is-sheet' : ''}`}
        style={{
          ...(panelMotion.style || {}),
          width: sheet ? '100%' : `min(${maxWidth}px, 100%)`,
          height: sheet && height ? '88svh' : height,
          maxHeight: sheet ? '88svh' : '90vh',
        }}
        {...(sheet && {
          drag: 'y',
          dragControls: drag,
          dragListener: false,
          dragConstraints: { top: 0, bottom: 0 },
          dragElastic: { top: 0, bottom: 0.7 },
          onDragEnd: (_, info) => (info.offset.y > 110 || info.velocity.y > 600) && onClose(),
        })}
      >
        {sheet && (
          <div className="sheet-handle" onPointerDown={startDrag} aria-hidden="true">
            <span />
          </div>
        )}
        {!hideClose && (
          <motion.button
            onClick={onClose}
            aria-label="Close"
            className="modal-close"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ rotate: 90, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.15 }}
          >
            <X size={19} strokeWidth={2.6} />
          </motion.button>
        )}
        {header && <div onPointerDown={startDrag}>{header}</div>}
        {scroll ? (
          <div data-lenis-prevent className="scroll-area modal-scroll">
            {children}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>{children}</div>
        )}
      </motion.div>
    </div>
  );
}

// Coloured header band used at the top of modals.
export function ModalHeader({ fill = 'fill-green', children, style = {} }) {
  return (
    <div className={`modal-head ${fill}`} style={style}>
      {children}
    </div>
  );
}
