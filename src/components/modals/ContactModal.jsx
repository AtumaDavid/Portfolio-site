import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Calendar, Loader2, ArrowUpRight } from 'lucide-react';
import Modal, { ModalHeader, modalItem, modalList } from './Modal';
import Note from '../ui/Note';
import Confetti from '../decor/Confetti';
import { profile } from '../../lib/data';
import { COLORS } from '../../lib/brand';

const EASE = [0.16, 1, 0.3, 1];
const TABS = {
  message: { title: 'Send a message', note: 'say hello 👋', bg: COLORS.green, blob: 'var(--green)' },
  call: { title: 'Book a call', note: "let's talk it through", bg: COLORS.butter, blob: 'var(--butter)' },
};

export default function ContactModal({ initialTab = 'message', onClose }) {
  const [tab, setTab] = useState(initialTab);
  const t = TABS[tab];
  return (
    <Modal
      onClose={onClose}
      maxWidth={560}
      blob={TABS[initialTab].blob}
      label={t.title}
      header={
        <motion.div animate={{ backgroundColor: t.bg }} transition={{ duration: 0.35 }} style={{ backgroundColor: t.bg }}>
          <ModalHeader fill="" style={{ color: 'var(--on-color)' }}>
            <Note color="var(--on-color)" play arrow={false} style={{ marginBottom: '0.3rem' }}>
              {t.note}
            </Note>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.h2
                key={tab}
                initial={{ y: 30, opacity: 0, rotate: 3 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -30, opacity: 0, rotate: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                {t.title}
              </motion.h2>
            </AnimatePresence>
          </ModalHeader>
        </motion.div>
      }
    >
      <motion.div className="modal-body" variants={modalList} initial="hidden" animate="show">
        <motion.div variants={modalItem} className="seg" role="tablist" style={{ marginBottom: '1.6rem', width: '100%' }}>
          {Object.entries({ message: [Send, 'Message'], call: [Calendar, 'Book a call'] }).map(([key, [Icon, text]]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              aria-pressed={tab === key}
              onClick={() => setTab(key)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', flex: 1, justifyContent: 'center' }}
            >
              {tab === key && (
                <motion.span
                  layoutId="seg-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--green)',
                    border: '2px solid var(--on-color)',
                    borderRadius: 980,
                    zIndex: -1,
                  }}
                />
              )}
              <Icon size={15} /> {text}
            </button>
          ))}
        </motion.div>

        <motion.div variants={modalItem}>
          <AnimatePresence mode="wait">
            {tab === 'message' ? (
              <motion.div
                key="m"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <MessageForm onClose={onClose} />
              </motion.div>
            ) : (
              <motion.div
                key="c"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Booker />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </Modal>
  );
}

function Booker() {
  return (
    <div style={{ textAlign: 'center', padding: '0.5rem 0 0.25rem' }}>
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.1 }}
        className="fill-butter"
        style={{
          width: 92,
          height: 92,
          margin: '0 auto 1.2rem',
          borderRadius: 26,
          border: '2px solid var(--on-color)',
          boxShadow: '3px 4px 0 var(--on-color)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <span style={{ background: 'var(--coral)', fontWeight: 800, fontSize: '0.8rem', padding: '0.25rem 0', borderBottom: '2px solid var(--on-color)' }}>
          30 MIN
        </span>
        <span className="display" style={{ fontSize: '2.3rem', fontWeight: 800, flex: 1, display: 'grid', placeItems: 'center' }}>
          ☕
        </span>
      </motion.div>
      <p className="muted" style={{ marginBottom: '1.4rem', lineHeight: 1.6 }}>
        Pick a time that works for you on my calendar and I'll see you there.
      </p>
      <a
        href={profile.calendlyUrl}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary"
        style={{ width: '100%' }}
      >
        <Calendar size={17} /> Schedule a 30-min call <ArrowUpRight size={16} />
      </a>
      <p className="muted" style={{ fontSize: '0.85rem', marginTop: '1.1rem' }}>
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
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setState('sent');
    }
  };

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '0.5rem 0', position: 'relative' }}
      >
        <Confetti style={{ left: '50%', top: 32 }} />
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          className="fill-green"
          style={{
            width: 68,
            height: 68,
            borderRadius: '50%',
            border: '2px solid var(--on-color)',
            boxShadow: '3px 4px 0 var(--on-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.2rem',
          }}
        >
          <Check size={32} strokeWidth={3} />
        </motion.div>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>
          {profile.web3formsKey ? 'Message sent!' : 'Opening your mail app'}
        </h3>
        <p className="muted" style={{ marginBottom: '1.5rem' }}>
          {profile.web3formsKey ? "Thanks, I'll get back to you soon." : 'Your message is prefilled and ready to send.'}
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          Done
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label className="field-label" htmlFor="cf-name">
          Your name
        </label>
        <input id="cf-name" className="field" autoComplete="name" value={form.name} onChange={set('name')} required />
      </div>
      <div>
        <label className="field-label" htmlFor="cf-email">
          Your email
        </label>
        <input id="cf-email" className="field" type="email" autoComplete="email" value={form.email} onChange={set('email')} required />
      </div>
      <div>
        <label className="field-label" htmlFor="cf-message">
          What are you working on?
        </label>
        <textarea
          id="cf-message"
          className="field"
          placeholder="A few lines about the project, role or idea"
          value={form.message}
          onChange={set('message')}
          required
        />
      </div>
      {state === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong. Try emailing {profile.email} directly.
        </p>
      )}
      <motion.button
        type="submit"
        disabled={state === 'sending'}
        className="btn btn-primary"
        whileTap={{ scale: 0.96 }}
        style={{ marginTop: '0.3rem', opacity: state === 'sending' ? 0.7 : 1 }}
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
      </motion.button>
    </form>
  );
}
