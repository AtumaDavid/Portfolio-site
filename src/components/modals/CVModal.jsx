import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { profile } from '../../lib/data';
import PdfViewer from './PdfViewer';
import Modal, { ModalHeader } from './Modal';
import Note from '../ui/Note';
import { COLORS } from '../../lib/brand';

const pop = (delay) => ({
  initial: { scale: 0, rotate: -15 },
  animate: { scale: 1, rotate: 0 },
  whileHover: { y: -2, rotate: -3 },
  whileTap: { scale: 0.94 },
  transition: { type: 'spring', stiffness: 320, damping: 14, delay },
});

export default function CVModal({ onClose }) {
  return (
    <Modal
      onClose={onClose}
      maxWidth={840}
      height="min(90vh, 1000px)"
      blob="var(--sky)"
      label="Curriculum vitae"
      header={
        <ModalHeader fill="fill-sky">
          <Note color="var(--on-color)" play arrow={false} style={{ marginBottom: '0.3rem' }}>
            the paper version 📄
          </Note>
          <h2>My CV</h2>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <motion.a {...pop(0.25)} href={profile.cvPath} download className="sticker" style={{ background: COLORS.cream, minHeight: 44 }}>
              <Download size={16} /> Download PDF
            </motion.a>
            <motion.a
              {...pop(0.32)}
              href={profile.cvPath}
              target="_blank"
              rel="noreferrer"
             
              className="sticker fill-green"
              style={{ minHeight: 44 }}
            >
              <ExternalLink size={16} /> Open in new tab
            </motion.a>
          </div>
        </ModalHeader>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 24 }}
        style={{ background: 'var(--bg-2)', minHeight: '100%' }}
      >
        <PdfViewer url={profile.cvPath} />
      </motion.div>
    </Modal>
  );
}
