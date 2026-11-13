import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { policies } from '../data/siteData'

export default function PolicyModal({ policyKey, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [onClose])

  const p = policies[policyKey]
  if (!p) return null

  return (
    <motion.div
      className="modal-back"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal modal-lg glass"
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <button className="x" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <span className="kicker" style={{ color: 'var(--teal)', letterSpacing: '0.25em' }}>
          WCE ART CIRCLE · LEGAL & POLICIES
        </span>
        <h2 className="grad" style={{ fontSize: 'var(--fs-h2)', fontWeight: 600, margin: '0.2rem 0 1rem' }}>
          {content.title}
        </h2>

        <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text)', marginBottom: '1.2rem' }}>
          {content.intro}
        </p>

        <ul style={{ paddingLeft: '1.2rem', display: 'grid', gap: '0.8rem', color: 'var(--text)', fontSize: 'var(--fs-body)', lineHeight: '1.7' }}>
          {p.points.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>

        {p.contact && (
          <div style={{ marginTop: '1.8rem', background: 'rgba(5, 8, 22, 0.5)', border: '1px solid var(--line)', borderRadius: '14px', padding: '1rem', fontSize: 'var(--fs-small)' }}>
            <h4 style={{ color: 'var(--gold)', marginBottom: '0.5rem', fontSize: 'var(--fs-body)' }}>Official Contact:</h4>
            <p style={{ margin: '0 0 0.3rem' }}>
              📞 Phone: <a href={`tel:${p.contact.phone}`}>{p.contact.phone}</a>
            </p>
            <p style={{ margin: '0 0 0.3rem' }}>
              ✉️ Email: <a href={`mailto:${p.contact.email}`}>{p.contact.email}</a>
            </p>
            <p style={{ margin: '0' }}>
              📍 Operational Address: {p.contact.address}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
