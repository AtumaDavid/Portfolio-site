import { Reveal } from '../components/ui/Motion';
import { testimonials } from '../lib/data';
import Note from '../components/ui/Note';
import { COLORS } from '../lib/brand';

// Hidden until real testimonials are added in data.js.
export default function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section id="kind-words" className="section fill-butter">
      <div className="wrap">
        <Reveal>
          <Note color="var(--on-color)">what people say</Note>
        </Reveal>
        <div className="grid-cards" style={{ marginTop: '1rem' }}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure
                style={{
                  background: COLORS.cream,
                  color: 'var(--on-color)',
                  borderRadius: 'var(--r)',
                  padding: '1.75rem',
                  border: '2px solid var(--on-color)',
                  transform: `rotate(${i % 2 ? 1 : -1}deg)`,
                  height: '100%',
                }}
              >
                <blockquote className="display" style={{ fontSize: '1.35rem', lineHeight: 1.3, fontWeight: 600 }}>
                  “{t.quote}”
                </blockquote>
                <figcaption style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginTop: '1.4rem' }}>
                  {t.photo && (
                    <img src={t.photo} alt="" width="48" height="48" loading="lazy" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  )}
                  <div>
                    <div style={{ fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
