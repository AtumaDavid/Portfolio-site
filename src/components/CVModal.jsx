import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { profile } from '../lib/data';
import PdfViewer from './PdfViewer';
import { useLenisCtx } from '../lib/lenis';

export default function CVModal({ onClose }) {
  const scrollRef = useRef(null);
  const { stop, start } = useLenisCtx();

  useEffect(() => {
    stop();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      start();
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
      {/* Backdrop */}
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'color-mix(in srgb, var(--bg) 40%, transparent)',
          backdropFilter: 'blur(24px) saturate(140%)',
          WebkitBackdropFilter: 'blur(24px) saturate(140%)',
        }}
      />

      {/* Modal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        className="glass"
        style={{
          position: 'relative',
          width: 'min(820px, 100%)',
          height: 'min(88vh, 1000px)',
          borderRadius: 24,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--line)',
            flexShrink: 0,
            background: 'var(--glass-bg)',
            zIndex: 1,
          }}
        >
          <span style={{ fontWeight: 600 }}>Curriculum Vitae</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a
              href={profile.cvPath}
              target="_blank"
              rel="noreferrer"
              data-no-preview
              aria-label="Open in new tab"
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid var(--line-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-2)',
              }}
            >
              <ExternalLink size={16} />
            </a>
            <a
              href={profile.cvPath}
              download
              data-no-preview
              aria-label="Download"
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid var(--line-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-2)',
              }}
            >
              <Download size={16} />
            </a>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                width: 34,
                height: 34,
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
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="scroll-area"
          style={{
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
            background: 'transparent',
          }}
        >
          <PdfViewer url={profile.cvPath} />
        </div>
      </motion.div>
    </div>
  );
}
