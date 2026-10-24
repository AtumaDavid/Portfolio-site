import { useEffect, useState } from 'react';

// Which section is under a reading line ~40% down the viewport.
// `ids` maps each nav target to the section ids that count as it,
// e.g. { services: ['services', 'process'] }. Returns null at the very top.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const entries = Object.entries(ids);
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let found = null;
      for (const [key, sections] of entries) {
        for (const id of sections) {
          const r = document.getElementById(id)?.getBoundingClientRect();
          if (r && r.top <= line && r.bottom > line) found = key;
        }
      }
      // The last section may never reach the line on tall screens.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        found = entries[entries.length - 1][0];
      }
      setActive(found);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return active;
}
