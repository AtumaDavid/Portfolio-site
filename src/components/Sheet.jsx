import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLenisCtx } from '../lib/lenis';

export default function Sheet({ onClose, children, maxWidth = 540 }) {
  const lenis = useLenisCtx();
  useEffect(() => {
    lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem,4vw,2.5rem)',
      }}
    >
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'color-mix(in srgb, var(--bg) 50%, transparent)',
          backdropFilter: 'blur(22px) saturate(160%)',
          WebkitBackdropFilter: 'blur(22px) saturate(160%)',
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', stiffness: 250, damping: 26 }}
        className="glass"
        style={{
          position: 'relative',
          width: `min(${maxWidth}px, 100%)`,
          maxHeight: '88vh',
          borderRadius: 28,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: 'color-mix(in srgb, var(--text) 82%, transparent)',
            color: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>
        <div
          className="scroll-area"
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            flex: 1,
            minHeight: 0,
            borderRadius: 28,
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
