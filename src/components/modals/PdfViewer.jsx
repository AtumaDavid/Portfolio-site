import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function PdfViewer({ url }) {
  const containerRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let pdfjsScript = null;

    async function loadPdf() {
      try {
        setLoading(true);

        // Load pdf.js if not already loaded
        if (!window.pdfjsLib) {
          pdfjsScript = document.createElement('script');
          pdfjsScript.src =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          pdfjsScript.async = true;
          document.head.appendChild(pdfjsScript);
          await new Promise((resolve, reject) => {
            pdfjsScript.onload = resolve;
            pdfjsScript.onerror = () =>
              reject(new Error('Failed to load PDF.js'));
          });
        }

        if (cancelled) return;

        const pdfjs = window.pdfjsLib;
        pdfjs.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const pdf = await pdfjs.getDocument(url).promise;
        if (cancelled) return;

        const canvasPages = [];
        const scale = 1.5;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          // Clear to transparent so the modal background shows through
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: ctx, viewport }).promise;
          if (cancelled) return;

          canvasPages.push(canvas.toDataURL('image/png'));
        }

        if (!cancelled) {
          setPages(canvasPages);
          setLoading(false);
        }
      } catch (err) {
        console.error('PDF load error:', err);
        if (!cancelled) {
          setError(err.message || 'Failed to load PDF');
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
      // Don't remove the script — it may be reused
    };
  }, [url]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'var(--text-2)',
          fontSize: '0.9rem',
          gap: '0.5rem',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: '2px solid var(--line)',
            borderTopColor: 'var(--accent)',
          }}
        />
        Loading resume…
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'var(--text-2)',
          fontSize: '0.9rem',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <p>
          Couldn't preview resume.{' '}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)' }}
          >
            Open in new tab ↗
          </a>
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.6rem 0',
      }}
    >
      {pages.map((dataUrl, idx) => (
        <img
          key={idx}
          src={dataUrl}
          alt={`Resume page ${idx + 1}`}
          style={{
            width: '100%',
            maxWidth: 800,
            height: 'auto',
            borderRadius: 8,
            boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
            display: 'block',
          }}
        />
      ))}
    </div>
  );
}
