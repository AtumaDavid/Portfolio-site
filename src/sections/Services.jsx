import { motion } from 'framer-motion';
import { Reveal } from '../components/ui/Motion';
import SectionHeader from '../components/ui/SectionHeader';
import { Dots } from '../components/decor/Decor';
import ServiceArt from '../components/decor/ServiceArt';
import { services } from '../lib/data';

const FILLS = ['fill-sky', 'fill-butter', 'fill-green', 'fill-coral'];
const TILTS = [-1.5, 1, -0.8, 0.6];

export default function Services() {
  return (
    <section id="services" className="section" style={{ background: 'var(--bg-2)' }}>
      <Dots cols={6} rows={3} color="var(--line-2)" style={{ top: '10%', right: '7%' }} />
      <div className="wrap">
        <SectionHeader
          note="how I can help you"
          title="From the screen to the [server]"
          lede="Bring me in for one layer or the whole thing. I'm happiest owning a product end to end."
        />

        <div className="grid-3">
          {services.map((s, i) => (
            <Reveal key={s.title} y={100} rotate={[-8, 4, -5, 8][i % FILLS.length]} scale={0.9} delay={i * 0.12} amount={0.2} style={{ height: '100%' }}>
              <motion.article
                className="card"
                whileHover={{ y: -6, rotate: TILTS[i % FILLS.length] }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                style={{ padding: '1.75rem', height: '100%' }}
              >
                <motion.div
                  className={FILLS[i % FILLS.length]}
                  initial={{ scale: 0, rotate: -120 }}
                  whileInView={{ scale: 1, rotate: TILTS[i % FILLS.length] * 3 }}
                  whileHover={{ borderRadius: '42px', rotate: 0, scale: 1.1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.25 + i * 0.12 }}
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: 26,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.4rem',
                  }}
                >
                  <ServiceArt kind={s.icon} />
                </motion.div>
                <h3 style={{ fontSize: '1.45rem', marginBottom: '0.6rem' }}>{s.title}</h3>
                <p className="muted">{s.body}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
