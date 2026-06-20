import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../lib/theme'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.86 }}
      aria-label={dark ? 'Switch to light' : 'Switch to dark'}
      style={{
        width: 34, height: 34, borderRadius: '50%', border: '1px solid var(--line-2)',
        background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden', flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={theme}
          initial={{ y: 14, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex' }}>
          {dark ? <Moon size={15} /> : <Sun size={15} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
