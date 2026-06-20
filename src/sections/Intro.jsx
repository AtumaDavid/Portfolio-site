import { ScrubText } from '../components/Motion';

export default function Intro() {
  return (
    <section id="intro" style={{ padding: 'clamp(4rem, 10vh, 8rem) 0' }}>
      <div className="wrap" style={{ maxWidth: 980 }}>
        <ScrubText
          text="I build dependable full-stack systems — the APIs, the databases, and the cloud they run on. Today I lead engineering at a fintech making credit accessible to women across Nigeria."
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.6rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.18,
          }}
        />
      </div>
    </section>
  );
}
