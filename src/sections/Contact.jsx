import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Calendar,
  FileText,
} from 'lucide-react';
import { Reveal } from '../components/Motion';
import { useUI } from '../lib/ui';
import { profile } from '../lib/data';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { openContact, openCV } = useUI();
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
  ];
  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(6rem, 16vh, 12rem) 0 4rem',
        textAlign: 'center',
      }}
    >
      <div className="wrap">
        <Reveal>
          <div className="label" style={{ marginBottom: '1.25rem' }}>
            04 — Contact
          </div>
          <h2
            className="headline"
            style={{
              fontSize: 'clamp(2.6rem, 9vw, 6.5rem)',
              marginBottom: '1.5rem',
            }}
          >
            Let’s build
            <br />
            <span className="grad-text">something great.</span>
          </h2>
          <p
            className="muted"
            style={{
              fontSize: '1.15rem',
              maxWidth: '40ch',
              margin: '0 auto 2.5rem',
              lineHeight: 1.5,
            }}
          >
            Open to full-time roles, contract work and ambitious projects. Send
            a message, book a call, or grab my CV.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              display: 'flex',
              gap: '0.8rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2.75rem',
            }}
          >
            <button
              className="btn btn-primary"
              onClick={() => openContact('message')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <Send size={15} /> Send a message
            </button>
            <button
              className="btn"
              onClick={() => openContact('call')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'transparent',
                border: '1px solid var(--line-2)',
                color: 'var(--text)',
              }}
            >
              <Calendar size={15} /> Book a call
            </button>
            <button
              className="btn"
              onClick={openCV}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'transparent',
                border: '1px solid var(--line-2)',
                color: 'var(--text)',
              }}
            >
              <FileText size={15} /> View CV
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="glass"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              borderRadius: 980,
              padding: '0.55rem 0.65rem 0.55rem 1.4rem',
            }}
          >
            <a href={`mailto:${profile.email}`} style={{ fontWeight: 600 }}>
              {profile.email}
            </a>
            <button
              onClick={copy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: copied ? 'var(--accent)' : 'transparent',
                color: copied ? '#fff' : 'var(--text-2)',
                border: '1px solid var(--line-2)',
                borderRadius: 980,
                padding: '0.45rem 0.9rem',
                cursor: 'pointer',
                fontSize: '0.82rem',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="d"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Check size={14} /> Copied
                  </motion.span>
                ) : (
                  <motion.span
                    key="c"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Copy size={14} /> Copy
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '3rem',
              flexWrap: 'wrap',
            }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--text-2)',
                }}
              >
                {s.label} <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
        </Reveal>

        <div
          className="label"
          style={{
            marginTop: 'clamp(5rem, 12vh, 8rem)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            borderTop: '1px solid var(--line)',
            paddingTop: '1.5rem',
          }}
        >
          <span>© {new Date().getFullYear()} Atuma David</span>
          <span>Lagos, Nigeria</span>
        </div>
      </div>
    </section>
  );
}
