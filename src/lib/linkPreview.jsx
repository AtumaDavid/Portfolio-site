import { useState, useCallback, createContext, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Globe, ShieldCheck } from 'lucide-react'

const LinkPreviewCtx = createContext(null)
const metaCache = new Map()

function isPreviewable(anchor) {
  const href = anchor.getAttribute('href')
  const target = anchor.getAttribute('target')
  if (!href) return false
  if (anchor.hasAttribute('data-no-preview')) return false
  if (anchor.hasAttribute('download')) return false
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false
  const sameDomain = href.startsWith(window.location.origin) || href.startsWith('/') || href.startsWith('#') || href.startsWith('.')
  if (sameDomain) return false
  const external = target === '_blank' || anchor.hasAttribute('data-link-preview')
  return external
}

export function LinkPreviewProvider({ children }) {
  const [preview, setPreview] = useState(null)
  const openPreview = useCallback((url, label) => setPreview({ url, label }), [])
  const closePreview = useCallback(() => setPreview(null), [])
  const confirmOpen = useCallback(() => {
    if (preview?.url) { window.open(preview.url, '_blank', 'noopener,noreferrer'); setPreview(null) }
  }, [preview])

  // Prefetch metadata for links present on mount
  useEffect(() => {
    const urls = new Set()
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href')
      if (isPreviewable(a) && !metaCache.has(href)) urls.add(href)
    })
    urls.forEach(href => {
      fetch(`https://api.microlink.io?url=${encodeURIComponent(href)}`)
        .then(r => r.json())
        .then(data => {
          if (data.status === 'success') {
            metaCache.set(href, data.data)
            if (data.data?.image?.url) { const img = new Image(); img.src = data.data.image.url }
          } else metaCache.set(href, null)
        })
        .catch(() => metaCache.set(href, null))
    })
  }, [])

  // Global click interceptor
  useEffect(() => {
    const handler = (e) => {
      const anchor = e.target.closest('a')
      if (!anchor || !isPreviewable(anchor)) return
      e.preventDefault(); e.stopPropagation()
      const label = (anchor.textContent?.trim() || anchor.getAttribute('aria-label') || '').substring(0, 60)
      openPreview(anchor.getAttribute('href'), label)
    }
    document.addEventListener('click', handler, { capture: true })
    return () => document.removeEventListener('click', handler, { capture: true })
  }, [openPreview])

  return (
    <LinkPreviewCtx.Provider value={{ openPreview }}>
      {children}
      <AnimatePresence>
        {preview && <LinkPreviewModal url={preview.url} label={preview.label} onClose={closePreview} onConfirm={confirmOpen} />}
      </AnimatePresence>
    </LinkPreviewCtx.Provider>
  )
}

export const useLinkPreview = () => useContext(LinkPreviewCtx)

function useLinkMeta(url) {
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!url) return
    let cancelled = false
    if (metaCache.has(url)) {
      const c = metaCache.get(url); setMeta(c); setLoading(false)
      if (c?.image?.url) { const img = new Image(); img.src = c.image.url }
      return
    }
    setLoading(true)
    const controller = new AbortController()
    fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error('meta'); return r.json() })
      .then(data => {
        if (cancelled) return
        if (data.status === 'success' && data.data) {
          metaCache.set(url, data.data); setMeta(data.data)
          if (data.data?.image?.url) { const img = new Image(); img.src = data.data.image.url }
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true; controller.abort() }
  }, [url])
  return { meta, loading }
}

function LinkPreviewModal({ url, label, onClose, onConfirm }) {
  const { meta, loading } = useLinkMeta(url)
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  let displayUrl = url || ''
  try { const u = new URL(url); displayUrl = u.hostname + u.pathname.replace(/\/$/, '') } catch {}
  const title = meta?.title || label || 'External link'
  const description = meta?.description || null
  const imageUrl = meta?.image?.url || null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(1rem,4vw,2.5rem)' }}>
      <motion.div onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
        style={{ position: 'absolute', inset: 0, background: 'color-mix(in srgb, var(--bg) 50%, transparent)', backdropFilter: 'blur(22px) saturate(160%)', WebkitBackdropFilter: 'blur(22px) saturate(160%)' }} />
      <motion.div initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }} className="glass"
        style={{ position: 'relative', width: 'min(440px, 100%)', borderRadius: 24, overflow: 'hidden', textAlign: 'center' }}>
        <button onClick={onClose} aria-label="Close"
          style={{ position: 'absolute', top: 14, right: 14, zIndex: 10, width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'color-mix(in srgb, var(--text) 12%, transparent)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <X size={16} />
        </button>

        <AnimatePresence>
          {imageUrl && !loading && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 180 }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden', flexShrink: 0 }}>
              <img src={imageUrl} alt={title} loading="eager" decoding="async" fetchpriority="high"
                style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ padding: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            {!imageUrl && (
              <div style={{ width: 56, height: 56, borderRadius: 18, background: 'color-mix(in srgb, var(--accent) 12%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                {loading ? <Spinner /> : <Globe size={26} style={{ color: 'var(--accent)' }} />}
              </div>
            )}
            {loading ? (
              <div style={{ height: 20, width: '60%', margin: '0 auto 0.5rem', borderRadius: 6, background: 'color-mix(in srgb, var(--text) 8%, transparent)', animation: 'pulse 1.4s ease-in-out infinite' }} />
            ) : (
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.3rem', marginTop: imageUrl ? '0.75rem' : 0 }}>{title}</h3>
            )}
            {!loading && description && (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', lineHeight: 1.5, margin: '0.25rem 0 0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</p>
            )}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'color-mix(in srgb, var(--text) 6%, transparent)', borderRadius: 10, padding: '0.4rem 0.85rem', margin: '0.5rem 0 1.25rem' }}>
              <ShieldCheck size={13} style={{ color: '#30d158', flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-2)', wordBreak: 'break-all' }}>{displayUrl}</span>
            </div>
            <p className="muted" style={{ fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>This opens in a new tab.</p>
            <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center' }}>
              <button onClick={onClose} style={{ padding: '0.7rem 1.4rem', borderRadius: 980, border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-2)', fontWeight: 500, flex: 1 }}>Stay here</button>
              <button onClick={onConfirm} style={{ padding: '0.7rem 1.4rem', borderRadius: 980, border: 'none', background: 'var(--accent)', cursor: 'pointer', fontSize: '0.85rem', color: '#fff', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', flex: 1, justifyContent: 'center' }}>Open <ExternalLink size={14} /></button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  )
}

function Spinner() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <circle cx="11" cy="11" r="9" stroke="var(--accent)" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M11 2a9 9 0 0 1 9 9" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </svg>
  )
}
