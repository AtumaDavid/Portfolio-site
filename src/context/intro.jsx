import { createContext, useCallback, useContext, useState } from 'react';

const KEY = 'introSeen';
const Ctx = createContext({ done: true, fromIntro: false, fromRect: null, finish: () => {} });

function shouldPlay() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

// Tracks the opening sequence. It plays once per browser session.
// `fromIntro` tells the hero its photo card will arrive from the intro;
// `fromRect` is where the intro's final card was, so it can fly from there.
export function IntroProvider({ children }) {
  const [fromIntro] = useState(shouldPlay);
  const [done, setDone] = useState(!fromIntro);
  const [fromRect, setFromRect] = useState(null);
  const finish = useCallback((rect = null) => {
    setFromRect(rect);
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {}
    setDone(true);
  }, []);
  return <Ctx.Provider value={{ done, fromIntro, fromRect, finish }}>{children}</Ctx.Provider>;
}

export const useIntro = () => useContext(Ctx);
