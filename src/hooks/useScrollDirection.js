import { useEffect, useState } from 'react';

// 'up' or 'down', ignoring jitter smaller than `threshold` px.
// Always 'up' near the top of the page.
export function useScrollDirection(threshold = 8) {
  const [dir, setDir] = useState('up');
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setDir('up');
      else if (Math.abs(y - last) >= threshold) setDir(y > last ? 'down' : 'up');
      else return;
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return dir;
}
