import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Send, Calendar, FileText } from 'lucide-react';
import { Reveal, PopWords } from '../components/ui/Motion';
import { Dots, Ring } from '../components/decor/Decor';
import Note from '../components/ui/Note';
import MorphBlob from '../components/decor/MorphBlob';
import { useUI } from '../context/ui';
import { useLocalTime } from '../hooks/useLocalTime';
import { profile } from '../lib/data';
import Logo from '../components/ui/Logo';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { openContact, openCV } = useUI();
  const time = useLocalTime(profile.timeZone);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  const socials = [
    { label: 'GitHub', href: profile.links.github },
    { label: 'LinkedIn', href: profile.links.linkedin },
    { label: 'Medium', href: profile.links.medium },
  ].filter((s) => s.href);

  // The band grows and straightens as it scrolls into view.
  const band = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: band, offset: ['start end', 'start 35%'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });
  const scale = useTransform(p, [0, 1], [0.86, 1]);
  const rotate = useTransform(p, [0, 1], [-3, 0]);
  const y = useTransform(p, [0, 1], [80, 0]);

  const onInk = { color: 'var(--on-ink)' };
  const ghostOnInk = { ...onInk, borderColor: 'var(--on-ink)', background: 'transparent' };

  return (
    <section id="contact" style={{ padding: 'clamp(2rem, 6vh, 4rem) 0 1.5rem' }}>
      <div className="wrap">
        <motion.div
          ref={band}
          style={{
            ...(reduce ? {} : { scale, rotate, y }),
            background: 'var(--band-ink)',
            ...onInk,
            borderRadius: 'clamp(24px, 4vw, 40px)',
            padding: 'clamp(3rem, 9vw, 6rem) clamp(1.25rem, 6vw, 5rem)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            border: '1.5px solid var(--line)',
          }}
        >
          <MorphBlob size={460} duration={11} color="rgba(46, 224, 134, 0.12)" style={{ top: -170, right: -150 }} />
          <MorphBlob size={340} duration={16} color="rgba(255, 216, 77, 0.08)" style={{ bottom: -150, left: -120 }} />
          <Dots cols={5} rows={4} color="rgba(255, 248, 242, 0.18)" style={{ top: '10%', left: '6%' }} />
          <Ring size={64} color="var(--green)" className="float" style={{ bottom: '12%', right: '7%' }} />

          <Reveal>
            <Note color="var(--green)" arrow={false} style={{ marginBottom: '0.8rem' }}>
              okay, your turn ✍️
            </Note>
            <PopWords
              text="Got something to build?"
              className="headline"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
            />
            <motion.div
              className="headline"
              aria-hidden="true"
              initial={{ scale: 0, rotate: -12 }}
              whileInView={{ scale: 1, rotate: -2 }}
              whileHover={{ rotate: [-2, 3, -4, 2, -2], transition: { duration: 0.5 } }}
              viewport={{ once: true, amount: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 10, delay: 0.5 }}
              style={{
                display: 'inline-block',
                fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                color: 'var(--green)',
                marginBottom: '1.3rem',
                cursor: 'default',
              }}
            >
              Let's cook.
            </motion.div>
            <p style={{ fontSize: '1.15rem', maxWidth: '44ch', margin: '0 auto 2.4rem', opacity: 0.85 }}>
              I'm open to contract projects and full-time roles. Book a quick call or send a note about what you're
              working on, and we'll figure out the next step together.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.4rem' }}>
              <button className="btn btn-primary" onClick={() => openContact('call')} style={{ borderColor: 'transparent', boxShadow: 'none' }}>
                <Calendar size={18} /> Book a call
              </button>
              <button className="btn btn-ghost" onClick={() => openContact('message')} style={ghostOnInk}>
                <Send size={17} /> Send a message
              </button>
              <button className="btn btn-ghost" onClick={openCV} style={{ ...ghostOnInk, borderColor: 'transparent' }}>
                <FileText size={17} /> View CV
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                borderRadius: 'var(--pill)',
                padding: '0.45rem 0.5rem 0.45rem 1.3rem',
                background: 'rgba(255, 248, 242, 0.08)',
                border: '1.5px solid rgba(255, 248, 242, 0.18)',
                maxWidth: '100%',
              }}
            >
              <a href={`mailto:${profile.email}`} style={{ fontWeight: 700, overflowWrap: 'anywhere', padding: '0.7rem 0' }}>
                {profile.email}
              </a>
              <button
                onClick={copy}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  minHeight: 40,
                  background: copied ? 'var(--green)' : 'rgba(255, 248, 242, 0.12)',
                  color: copied ? 'var(--on-color)' : 'var(--on-ink)',
                  border: 'none',
                  borderRadius: 'var(--pill)',
                  padding: '0.45rem 0.95rem',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'd' : 'c'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy'}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </Reveal>

          {socials.length > 0 && (
            <Reveal delay={0.2}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.75rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-link">
                    {s.label} <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </Reveal>
          )}
        </motion.div>

        <footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            padding: '1.5rem 0.25rem 0.5rem',
            fontSize: '0.9rem',
            color: 'var(--text-2)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            <Logo size={24} />© {new Date().getFullYear()} {profile.name}. Made with care in Lagos.
          </span>
          <span>
            {profile.location} · {time}
          </span>
        </footer>
      </div>
    </section>
  );
}
