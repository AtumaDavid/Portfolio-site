import { Reveal } from '../components/Motion';
import { stack, certifications, education } from '../lib/data';

export default function Stack() {
  return (
    <section
      id="stack"
      style={{
        padding: 'clamp(4rem, 10vh, 7rem) 0',
        background: 'var(--bg-2)',
      }}
    >
      <div className="wrap">
        <Reveal>
          <div className="label" style={{ marginBottom: '0.75rem' }}>
            03 — Capabilities
          </div>
          <h2
            className="headline"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              marginBottom: 'clamp(2.5rem, 6vh, 4rem)',
            }}
          >
            Stack
          </h2>
        </Reveal>

        <div>
          {stack.map((g, i) => (
            <Reveal key={g.group} y={20} amount={0.3}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.6rem',
                  padding: '1.5rem 0',
                  borderTop: '1px solid var(--line)',
                }}
                className="spec-row"
              >
                <div className="label" style={{ paddingTop: '0.3rem' }}>
                  {g.group}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem 1.4rem',
                  }}
                >
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="stack-item"
                      style={{
                        fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)',
                        fontWeight: 500,
                      }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid var(--line)' }} />
        </div>

        <Reveal>
          <div style={{ marginTop: 'clamp(3rem, 7vh, 4.5rem)' }}>
            <div className="label" style={{ marginBottom: '1.25rem' }}>
              Certifications
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                gap: '0.6rem 2rem',
              }}
            >
              {certifications.map((c) => (
                <div
                  key={c}
                  style={{
                    display: 'flex',
                    gap: '0.6rem',
                    alignItems: 'baseline',
                    color: 'var(--text-2)',
                    fontSize: '0.95rem',
                    paddingBottom: '0.5rem',
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>
                    ✓
                  </span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* <Reveal>
          <div
            style={{
              marginTop: 'clamp(3rem, 7vh, 4.5rem)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--line)',
            }}
          >
            <div>
              <div className="label" style={{ marginBottom: '0.6rem' }}>
                Education
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>
                {education.degree}
              </div>
              <div className="muted">{education.school}</div>
            </div>
            <span className="label">{education.period}</span>
          </div>
        </Reveal> */}
      </div>

      <style>{`@media (min-width: 720px){ .spec-row { grid-template-columns: 200px 1fr !important; gap: 2.5rem !important; } }`}</style>
    </section>
  );
}
