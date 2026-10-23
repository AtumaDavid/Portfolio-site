import { createContext, useContext, useCallback, useRef } from 'react';
const Ctx = createContext(null);

export function LenisProvider({ children }) {
  const bodyLocked = useRef(false);
  const scrollTo = useCallback((id) => {
    const target = id === 'top' ? 0 : document.getElementById(id);
    if (target === null && id !== 'top') return;

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const stop = useCallback(() => {
    bodyLocked.current = true;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }, []);

  const start = useCallback(() => {
    bodyLocked.current = false;
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  }, []);

  return (
    <Ctx.Provider value={{ scrollTo, stop, start }}>{children}</Ctx.Provider>
  );
}

export const useLenisCtx = () => useContext(Ctx);
