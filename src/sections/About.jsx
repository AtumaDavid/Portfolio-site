import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';
import { Reveal, PopWords } from '../components/ui/Motion';
import { Squiggle } from '../components/decor/Decor';
import Note from '../components/ui/Note';
import { useUI } from '../context/ui';
import { profile } from '../lib/data';
import { FILLS } from '../lib/brand';
import Toolbox from '../components/ui/Toolbox';

export default function About() {
  const { openCV } = useUI();
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="wrap about-grid">
        <div>
          <Reveal>
            <Note>the human behind the code</Note>
            <PopWords text="Calm code, [warm] people" className="headline h2" />
            <Squiggle width={110} color="var(--green)" style={{ margin: '0.4rem 0 1.6rem' }} />
            {profile.story.map((p) => (
              <p key={p} className="lede" style={{ marginBottom: '1rem', color: 'var(--text)' }}>
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '1.75rem 0 2rem' }}>
              {profile.stickers.map((s, i) => (
                <motion.li
                  key={s.text}
                  className={`sticker ${FILLS[i % FILLS.length]}`}
                  initial={{ scale: 1.4, opacity: 0, rotate: [-3, 2, -2, 3][i % 4] * 6 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: [-3, 2, -2, 3][i % 4] }}
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 16, delay: 0.2 + i * 0.12 }}
                >
                  <span aria-hidden="true">{s.emoji}</span> {s.text}
                </motion.li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button className="btn btn-ghost" onClick={openCV}>
                <FileText size={17} /> View my CV
              </button>
              <a className="btn btn-ghost" href={profile.cvPath} download style={{ borderColor: 'transparent' }}>
                <Download size={17} /> Download PDF
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={120} rotate={6} amount={0.1}>
          <Toolbox />
        </Reveal>
      </div>
    </section>
  );
}
