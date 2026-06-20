import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Reveal } from '../components/Motion';
import Modal from '../components/Modal';
import { work } from '../lib/data';

function Card({ job, onOpen, i }) {
  return (
    <Reveal y={28} delay={i * 0.05} amount={0.3}>
      <motion.button
        layoutId={`work-${job.company}`}
        onClick={onOpen}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="glass glow"
        style={{
          width: '100%',
          height: 196,
          textAlign: 'left',
          cursor: 'pointer',
          borderRadius: 24,
          padding: '1.5rem 1.6rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <motion.h3
              layoutId={`work-name-${job.company}`}
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: '0.3rem',
              }}
            >
              {job.company}
            </motion.h3>
            <div className="muted clamp-1" style={{ fontSize: '0.95rem' }}>
              {job.role}
            </div>
          </div>
          <span
            style={{
              flexShrink: 0,
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '1px solid var(--line-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plus size={16} />
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span className="label">{job.period}</span>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {job.stack.slice(0, 3).map((s) => (
              <span
                key={s}
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-2)',
                  border: '1px solid var(--line)',
                  padding: '0.18rem 0.55rem',
                  borderRadius: 980,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.button>
    </Reveal>
  );
}

function Detail({ job, onClose }) {
  return (
    <Modal layoutId={`work-${job.company}`} onClose={onClose} maxWidth={720}>
      <div style={{ padding: 'clamp(1.75rem, 5vw, 2.75rem)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="label"
          style={{ marginBottom: '0.6rem' }}
        >
          {job.period} · {job.mode}
        </motion.div>
        <motion.h2
          layoutId={`work-name-${job.company}`}
          style={{
            fontSize: 'clamp(2rem,6vw,3rem)',
            fontWeight: 600,
            marginBottom: '0.25rem',
          }}
        >
          {job.company}
        </motion.h2>
        <div
          className="muted"
          style={{ fontSize: '1.05rem', marginBottom: '1.5rem' }}
        >
          {job.role}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {job.summary}
          </p>

          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginBottom: '1.75rem',
            }}
          >
            {job.points.map((pt) => (
              <li
                key={pt}
                style={{
                  display: 'flex',
                  gap: '0.7rem',
                  color: 'var(--text-2)',
                  fontSize: '0.92rem',
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: '0.6rem',
                    width: 13,
                    height: 1,
                    background: 'var(--line-2)',
                  }}
                />
                {pt}
              </li>
            ))}
          </ul>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              marginBottom: job.products?.length ? '1.75rem' : 0,
            }}
          >
            {job.stack.map((s) => (
              <span
                key={s}
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--text-2)',
                  border: '1px solid var(--line)',
                  padding: '0.25rem 0.7rem',
                  borderRadius: 980,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {job.products?.length > 0 && (
            <>
              <div className="label" style={{ marginBottom: '0.9rem' }}>
                {job.products.length > 1 ? 'What shipped' : 'Product'}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                {job.products.map((p) => {
                  const body = (
                    <div
                      className="glass"
                      style={{
                        borderRadius: 16,
                        padding: '0.9rem 1.1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            color: p.link ? 'var(--accent)' : 'var(--text)',
                          }}
                        >
                          {p.name}
                          {p.link && <ArrowUpRight size={15} />}
                        </div>
                        <div
                          className="muted"
                          style={{ fontSize: '0.85rem', marginTop: '0.15rem' }}
                        >
                          {p.note}
                        </div>
                      </div>
                      <span className="label" style={{ flexShrink: 0 }}>
                        {p.metric || p.tag}
                      </span>
                    </div>
                  );
                  return p.link ? (
                    <a
                      key={p.name}
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {body}
                    </a>
                  ) : (
                    <div key={p.name}>{body}</div>
                  );
                })}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </Modal>
  );
}

export default function Work() {
  const [open, setOpen] = useState(null);
  const job = work.find((w) => w.company === open);
  return (
    <section id="work" style={{ padding: 'clamp(4rem, 10vh, 7rem) 0' }}>
      <div className="wrap">
        <Reveal>
          <div className="label" style={{ marginBottom: '0.75rem' }}>
            01 — Experience
          </div>
          <h2
            className="headline"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              marginBottom: '0.75rem',
            }}
          >
            Work
          </h2>
          <p
            className="muted"
            style={{
              maxWidth: '46ch',
              lineHeight: 1.5,
              marginBottom: 'clamp(2.5rem, 6vh, 3.5rem)',
            }}
          >
            The companies I've built for — and the products that shipped. Tap a
            card to open it.
          </p>
        </Reveal>

        <LayoutGroup>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.1rem',
            }}
          >
            {work.map((j, i) => (
              <Card
                key={j.company}
                job={j}
                i={i}
                onOpen={() => setOpen(j.company)}
              />
            ))}
          </div>
          <AnimatePresence>
            {job && <Detail key="d" job={job} onClose={() => setOpen(null)} />}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
