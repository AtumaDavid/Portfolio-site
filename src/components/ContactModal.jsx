import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Calendar, Loader2 } from 'lucide-react';
import Sheet from './Sheet';
import { profile } from '../lib/data';

const EASE = [0.16, 1, 0.3, 1];

export default function ContactModal({ initialTab = 'message', onClose }) {
  const [tab, setTab] = useState(initialTab);
  return (
    <Sheet onClose={onClose} maxWidth={560}>
      <div style={{ padding: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
        <div className="label" style={{ marginBottom: '0.6rem' }}>
          Get in touch
        </div>
        <h2
          style={{
            fontSize: 'clamp(1.6rem,5vw,2.2rem)',
            fontWeight: 600,
            marginBottom: '1.4rem',
          }}
        >
          {tab === 'message' ? 'Send a message' : 'Book a call'}
        </h2>

        <div className="seg" style={{ marginBottom: '1.75rem' }}>
          <SegBtn active={tab === 'message'} onClick={() => setTab('message')}>
            <Send size={14} /> Message
          </SegBtn>
          <SegBtn active={tab === 'call'} onClick={() => setTab('call')}>
            <Calendar size={14} /> Book a call
          </SegBtn>
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            style={{
              position: 'absolute',
              top: 4,
              bottom: 4,
              left: tab === 'message' ? 4 : '50%',
              width: 'calc(50% - 4px)',
              background: 'color-mix(in srgb, var(--text) 12%, transparent)',
              borderRadius: 980,
              zIndex: 0,
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {tab === 'message' ? (
            <motion.div
              key="m"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <MessageForm onClose={onClose} />
            </motion.div>
          ) : (
            <motion.div
              key="c"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Booker />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Sheet>
  );
}

function SegBtn({ active, onClick, children }) {
  return (
    <button
      aria-pressed={active}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}

function Booker() {
  return (
    <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
      <p className="muted" style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
        Pick a time that works for you — I'll see you there.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.8rem',
          alignItems: 'center',
        }}
      >
        <a
          href={profile.calendlyUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            width: '100%',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <Calendar size={15} /> Schedule a 30-min call
        </a>
      </div>

      <p className="muted" style={{ fontSize: '0.8rem', marginTop: '1.25rem' }}>
        I typically respond within a few hours.
      </p>
    </div>
  );
}

function MessageForm({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setState('sending');

    if (profile.web3formsKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: profile.web3formsKey,
            name: form.name,
            email: form.email,
            message: form.message,
            subject: `Portfolio message from ${form.name}`,
          }),
        });
        const data = await res.json();
        setState(data.success ? 'sent' : 'error');
      } catch {
        setState('error');
      }
    } else {
      // Fallback: open the visitor's mail app, prefilled to you.
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(
        `${form.message}\n\n— ${form.name} (${form.email})`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setState('sent');
    }
  };

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '1.5rem 0' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'color-mix(in srgb, #30d158 18%, transparent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}
        >
          <Check size={30} style={{ color: '#30d158' }} />
        </motion.div>
        <h3
          style={{
            fontSize: '1.2rem',
            fontWeight: 600,
            marginBottom: '0.4rem',
          }}
        >
          {profile.web3formsKey ? 'Message sent' : 'Opening your mail app'}
        </h3>
        <p
          className="muted"
          style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}
        >
          {profile.web3formsKey
            ? "Thanks — I'll get back to you soon."
            : 'Your message is prefilled and ready to send.'}
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          Done
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
    >
      <input
        className="field"
        placeholder="Your name"
        value={form.name}
        onChange={set('name')}
        required
      />
      <input
        className="field"
        type="email"
        placeholder="Your email"
        value={form.email}
        onChange={set('email')}
        required
      />
      <textarea
        className="field"
        placeholder="What's on your mind?"
        value={form.message}
        onChange={set('message')}
        required
      />
      {state === 'error' && (
        <span style={{ color: '#ff453a', fontSize: '0.82rem' }}>
          Something went wrong — try emailing {profile.email} directly.
        </span>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="btn btn-primary"
        style={{
          marginTop: '0.4rem',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.45rem',
          opacity: state === 'sending' ? 0.7 : 1,
        }}
      >
        {state === 'sending' ? (
          <>
            <Loader2 size={16} className="spin" /> Sending…
          </>
        ) : (
          <>
            Send message <Send size={15} />
          </>
        )}
      </button>

      <style>{`.spin{animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </form>
  );
}
