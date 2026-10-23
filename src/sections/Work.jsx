import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Reveal } from '../components/ui/Motion';
import SectionHeader from '../components/ui/SectionHeader';
import Modal, { ModalHeader, modalItem, modalList } from '../components/modals/Modal';
import { Squiggle } from '../components/decor/Decor';
import Note from '../components/ui/Note';
import { work } from '../lib/data';
import { COLORS } from '../lib/brand';

const FILLS = ['fill-green', 'fill-coral', 'fill-sky', 'fill-butter'];
const TILTS = [-1.2, 1, -0.8, 1.3];

function Card({ job, onOpen, i }) {
  const n = job.products?.length || 0;
  return (
    <Reveal y={90} rotate={i % 2 ? 7 : -7} scale={0.92} delay={(i % 3) * 0.09} amount={0.2} style={{ height: '100%' }}>
      <motion.button
        layoutId={`work-${job.company}`}
        onClick={onOpen}
        whileHover={{ y: -8, rotate: TILTS[i % TILTS.length] }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="card work-card"
        aria-label={`${job.company}: ${job.role}. Open details`}
      >
        <div
          className={FILLS[i % FILLS.length]}
          style={{
            padding: '1.4rem 1.5rem 1.2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            width: '100%',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <span className="pill" style={{ marginBottom: '0.7rem' }}>
              {job.period}
            </span>
            <motion.h3
              layoutId={`work-name-${job.company}`}
              style={{ fontSize: 'clamp(1.6rem, 3vw, 1.9rem)', marginTop: '0.6rem' }}
            >
              {job.company}
            </motion.h3>
          </div>
          <span
            aria-hidden="true"
            style={{
              flexShrink: 0,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'var(--on-color)',
              color: COLORS.cream,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plus size={18} />
          </span>
        </div>
        <div
          style={{
            padding: '1.2rem 1.5rem 1.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            flex: 1,
            width: '100%',
          }}
        >
          <div style={{ fontWeight: 700 }}>{job.role}</div>
          <p className="muted clamp-2" style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
            {job.summary}
          </p>
          <div
            style={{
              marginTop: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
              alignItems: 'center',
            }}
          >
            {(n > 0 || job.shippedLabel) && (
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)', marginRight: '0.3rem' }}>
                {job.shippedLabel || `${n} ${n > 1 ? 'products' : 'product'} shipped`}
              </span>
            )}
            {job.stack.slice(0, 3).map((s) => (
              <span key={s} className="pill">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.button>
    </Reveal>
  );
}

function Detail({ job, current, fill, onClose }) {
  return (
    <Modal layoutId={`work-${job.company}`} onClose={onClose} maxWidth={720} label={`${job.company}: ${job.role}`}>
      <ModalHeader fill={fill}>
        <Note color="var(--on-color)" play arrow={false} style={{ marginBottom: '0.5rem' }}>
          {current ? 'where I am now' : "where I've been"}
        </Note>
        <br />
        <span className="pill">
          {job.period} · {job.mode}
        </span>
        <motion.h2
          layoutId={`work-name-${job.company}`}
          style={{ fontSize: 'clamp(2rem,6vw,3rem)', margin: '0.7rem 0 0.2rem' }}
        >
          {job.company}
        </motion.h2>
        <div style={{ fontSize: '1.05rem', fontWeight: 600 }}>{job.role}</div>
      </ModalHeader>

      <motion.div className="modal-body" variants={modalList} initial="hidden" animate="show">
        <motion.p variants={modalItem} style={{ lineHeight: 1.6, marginBottom: '1.4rem', fontSize: '1.05rem' }}>
          {job.summary}
        </motion.p>

        <motion.ul
          variants={modalList}
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            marginBottom: '1.6rem',
          }}
        >
          {job.points.map((pt) => (
            <motion.li variants={modalItem} key={pt} style={{ display: 'flex', gap: '0.7rem', color: 'var(--text-2)', lineHeight: 1.5 }}>
              <span aria-hidden="true" style={{ color: 'var(--accent)', fontWeight: 800 }}>
                ✓
              </span>
              {pt}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div variants={modalItem} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: job.products?.length ? '2rem' : 0 }}>
          {job.stack.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </motion.div>

        {job.products?.length > 0 && (
          <>
            <motion.h3 variants={modalItem} style={{ fontSize: '1.35rem', marginBottom: '0.8rem' }}>
              What we shipped
            </motion.h3>
            <motion.div variants={modalList} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {job.products.map((p) => {
                const body = (
                  <div className="prod-card">
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          flexWrap: 'wrap',
                          color: p.link ? 'var(--accent)' : 'var(--text)',
                        }}
                      >
                        {p.name}
                        {p.link && <ArrowUpRight size={16} aria-label="(opens in a new tab)" />}
                      </div>
                      <div className="muted" style={{ fontSize: '0.9rem', marginTop: '0.2rem', lineHeight: 1.45 }}>
                        {p.note}
                      </div>
                    </div>
                    <span className={`pill prod-tag ${p.metric ? 'fill-green' : ''}`}>{p.metric || p.tag}</span>
                  </div>
                );
                return p.link ? (
                  <motion.a variants={modalItem} key={p.name} href={p.link} target="_blank" rel="noreferrer">
                    {body}
                  </motion.a>
                ) : (
                  <motion.div variants={modalItem} key={p.name}>
                    {body}
                  </motion.div>
                );
              })}
            </motion.div>
            {job.moreShipped && (
              <motion.p variants={modalItem} className="muted" style={{ fontSize: '0.92rem', marginTop: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                <span aria-hidden="true" style={{ color: 'var(--accent)', fontWeight: 800 }}>
                  +
                </span>
                {job.moreShipped}
              </motion.p>
            )}
          </>
        )}
      </motion.div>
    </Modal>
  );
}

export default function Work() {
  const [open, setOpen] = useState(null);
  const idx = work.findIndex((w) => w.company === open);
  const job = work[idx];
  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHeader
          note="stuff I've actually shipped"
          title="Teams I've built [with]"
          lede="The companies I've shipped for, and what we put live together. Tap a card for the details."
        >
          <Squiggle width={120} color="var(--coral)" style={{ marginTop: '1.2rem' }} />
        </SectionHeader>

        <LayoutGroup>
          <div className="grid-cards">
            {work.map((j, i) => (
              <Card key={j.company} job={j} i={i} onOpen={() => setOpen(j.company)} />
            ))}
          </div>
          <AnimatePresence>
            {job && <Detail key="d" job={job} current={idx === 0} fill={FILLS[idx % FILLS.length]} onClose={() => setOpen(null)} />}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
