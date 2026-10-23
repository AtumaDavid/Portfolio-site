import { createContext, useContext, useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const Ctx = createContext(null);
const NAV_OFFSET = -88;

// Smooth, inertial scrolling. Skipped entirely under prefers-reduced-motion,
// where we fall back to native scrolling.
export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((id) => {
    const target = id === 'top' ? 0 : document.getElementById(id);
    if (target === null) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: id === 'top' ? 0 : NAV_OFFSET, duration: 1.4 });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + NAV_OFFSET, behavior: 'smooth' });
    }
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }, []);

  return <Ctx.Provider value={{ scrollTo, stop, start }}>{children}</Ctx.Provider>;
}

export const useLenisCtx = () => useContext(Ctx);
