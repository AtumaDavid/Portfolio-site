import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import ContactModal from '../components/ContactModal';
import CVModal from '../components/CVModal';

// const UICtx = createContext(null)
const UICtx = createContext({
  openContact: () => {},
  closeContact: () => {},
  openCV: () => {},
  closeCV: () => {},
});

export function UIProvider({ children }) {
  const [contact, setContact] = useState(null); // null | 'message' | 'call'
  const [cv, setCv] = useState(false);

  const openContact = useCallback((tab = 'message') => setContact(tab), []);
  const closeContact = useCallback(() => setContact(null), []);
  const openCV = useCallback(() => setCv(true), []);
  const closeCV = useCallback(() => setCv(false), []);

  return (
    <UICtx.Provider value={{ openContact, closeContact, openCV, closeCV }}>
      {children}
      <AnimatePresence>
        {contact && (
          <ContactModal
            key="contact"
            initialTab={contact}
            onClose={closeContact}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cv && <CVModal key="cv" onClose={closeCV} />}
      </AnimatePresence>
    </UICtx.Provider>
  );
}

export const useUI = () => useContext(UICtx);
