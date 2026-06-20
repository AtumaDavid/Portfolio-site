import { motion } from 'framer-motion'

// Image with a tasteful placeholder when `src` is null.
// Pass `layoutId` to let it morph in shared-layout animations.
export default function Thumb({ src, name, ratio = '16 / 10', layoutId, rounded = 14 }) {
  const initials = name
    ? name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
    : '—'

  return (
    <motion.div
      layoutId={layoutId}
      style={{
        position: 'relative', width: '100%', aspectRatio: ratio,
        borderRadius: rounded, overflow: 'hidden', background: 'var(--surface)',
        border: '1px solid var(--line)',
      }}
    >
      {src ? (
        <img src={src} alt={name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
          background:
            'radial-gradient(120% 120% at 0% 0%, var(--signal-soft), transparent 55%), var(--surface)' }}>
          <span className="display" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)', fontWeight: 700, color: 'var(--line-strong)' }}>
            {initials}
          </span>
          <span className="mono" style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>
            Image optional
          </span>
        </div>
      )}
    </motion.div>
  )
}
