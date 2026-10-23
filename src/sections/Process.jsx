import { useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';
import Confetti from '../components/decor/Confetti';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { FILLS } from '../lib/brand';
import { steps } from '../lib/data';

const TILTS = [-2.5, 2, -1.5, 2.5];

// Smooth curve through points (Catmull-Rom → cubic Bézier).
function curveThrough(pts) {
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += `C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
  }
  return d;
}

// Road through the badge centres, with a short lead-in and lead-out (`lead` is
// a fraction of the first/last gap), and a sideways wiggle between stops (used
// when the stops are in a straight line).
function buildRoad(stops, wiggle, leadK) {
  const lead = (a, b, k) => ({ x: a.x + (a.x - b.x) * k, y: a.y + (a.y - b.y) * k });
  const pts = [lead(stops[0], stops[1], leadK)];
  stops.forEach((p, i) => {
    pts.push(p);
    const q = stops[i + 1];
    if (q && wiggle) {
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const len = Math.hypot(dx, dy) || 1;
      const s = i % 2 ? -1 : 1;
      pts.push({ x: (p.x + q.x) / 2 + (-dy / len) * wiggle * s, y: (p.y + q.y) / 2 + (dx / len) * wiggle * s });
    }
  });
  const n = stops.length;
  pts.push(lead(stops[n - 1], stops[n - 2], leadK));
  return curveThrough(pts);
}

export default function Process() {
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 900px)');
  const wrap = useRef(null);
  const badges = useRef([]);
  const road = useRef(null);
  const [geo, setGeo] = useState(null); // { w, h, d }
  const [stopsAt, setStopsAt] = useState([]); // where each badge sits along the road, 0–1
  const [reached, setReached] = useState(reduce ? steps.length : 0);

  // Measure badge centres and rebuild the road whenever the layout changes.
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const box = el.getBoundingClientRect();
      const stops = badges.current.map((b) => {
        const r = b.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      // On phones the road runs vertically, so keep the lead-in short enough
      // not to reach up into the section's intro text.
      setGeo({ w: box.width, h: box.height, d: buildRoad(stops, wide ? 0 : 26, wide ? 0.45 : 0.18) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [wide]);

  // Find how far along the road each badge is.
  useLayoutEffect(() => {
    const path = road.current;
    if (!path || !geo) return;
    const total = path.getTotalLength();
    const samples = Array.from({ length: 241 }, (_, i) => path.getPointAtLength((total * i) / 240));
    setStopsAt(
      badges.current.map((b) => {
        const box = wrap.current.getBoundingClientRect();
        const r = b.getBoundingClientRect();
        const c = { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
        let best = 0;
        samples.forEach((s, i) => {
          if (Math.hypot(s.x - c.x, s.y - c.y) < Math.hypot(samples[best].x - c.x, samples[best].y - c.y)) best = i;
        });
        return best / 240;
      }),
    );
  }, [geo]);

  // Scroll drives the rocket along the road.
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.6 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(45);

  useMotionValueEvent(progress, 'change', (v) => {
    const path = road.current;
    if (!path || reduce) return;
    const total = path.getTotalLength();
    const at = Math.min(Math.max(v, 0), 1) * total;
    const p = path.getPointAtLength(at);
    const q = path.getPointAtLength(Math.min(at + 2, total));
    const back = path.getPointAtLength(Math.max(at - 2, 0));
    x.set(p.x);
    y.set(p.y);
    // 🚀 points up-right, so add 45° to the direction of travel
    rotate.set((Math.atan2(q.y - back.y, q.x - back.x) * 180) / Math.PI + 45);
    const n = stopsAt.filter((f) => v >= f - 0.01).length;
    if (n !== reached) setReached(n);
  });

  const done = reduce || reached >= steps.length;

  return (
    <section id="process" className="section">
      <div className="wrap">
        <SectionHeader
          note="what working with me feels like"
          title="Clear steps, [no wahala]"
          lede="You always know what's happening and what comes next. Scroll to take the ride 🚀"
        />

        <div ref={wrap} className="road">
          {geo && (
            <svg aria-hidden="true" className="road-svg" width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`}>
              <path d={geo.d} className="road-base" />
              <motion.path
                ref={road}
                d={geo.d}
                className="road-trail"
                style={{ pathLength: reduce ? 1 : progress }}
              />
            </svg>
          )}

          {geo && !reduce && (
            <motion.div aria-hidden="true" className="road-rocket" style={{ x, y, rotate }}>
              <span>🚀</span>
            </motion.div>
          )}

          <ol className="road-steps">
            {steps.map((s, i) => {
              const on = i < reached;
              const fill = FILLS[i % FILLS.length];
              return (
                <li key={s.title} className={`road-step ${i % 2 ? 'is-low' : ''}`}>
                  <motion.div
                    ref={(el) => (badges.current[i] = el)}
                    className={`road-badge ${on ? fill + ' is-on' : ''}`}
                    animate={on ? { scale: [1, 1.35, 1], rotate: [0, -12, 0] } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={on ? 'e' : 'n'}
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                        aria-hidden="true"
                      >
                        {on ? s.emoji : i + 1}
                      </motion.span>
                    </AnimatePresence>
                    {on && <span className="road-badge-num">{i + 1}</span>}
                    {done && i === steps.length - 1 && !reduce && <Confetti distance={60} delay={0} style={{ left: '50%', top: '50%' }} />}
                  </motion.div>

                  <motion.div
                    className={`road-card ${on ? fill : ''}`}
                    animate={on ? { opacity: 1, y: 0, rotate: TILTS[i % TILTS.length], scale: 1 } : { opacity: 0.55, y: 12, rotate: 0, scale: 0.96 }}
                    whileHover={on ? { rotate: 0, scale: 1.03, y: -4 } : undefined}
                    transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                  >
                    <h3>
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p>{s.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
