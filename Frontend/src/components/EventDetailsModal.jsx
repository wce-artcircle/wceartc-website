import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function EventDetailsModal({ event, onClose, onRegister }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [onClose])

  if (!event) return null

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
        aria-label={event.title}
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="x" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 320px) 1fr', gap: '2rem', alignItems: 'start' }}>
          <div>
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--line)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              }}
            >
              <img
                src={event.image}
                alt={event.title}
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              />
            </div>

            {event.status === 'live' ? (
              <button
                className="btn btn-gold"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1.2rem' }}
                onClick={() => {
                  onClose()
                  onRegister(event)
                }}
              >
                ● Register Now →
              </button>
            ) : event.registerUrl ? (
              <a
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'center', marginTop: '1.2rem' }}
                href={event.registerUrl}
                target="_blank"
                rel="noreferrer"
              >
                Official Event Link ↗
              </a>
            ) : null}
          </div>

          <div>
            <span className={'badge ' + event.status}>
              {event.status === 'live' ? '● LIVE NOW' : '✓ COMPLETED EVENT'}
            </span>
            <small style={{ color: 'var(--teal)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', margin: '0.4rem 0' }}>
              {event.tag}
            </small>
            <h2 className="grad" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', margin: '0 0 0.4rem' }}>
              {event.title}
            </h2>
            {event.subtitle && (
              <p style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1rem' }}>
                {event.subtitle}
              </p>
            )}

            <div style={{ background: 'rgba(5, 8, 22, 0.5)', border: '1px solid var(--line)', borderRadius: '14px', padding: '1rem', margin: '1rem 0' }}>
              <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem' }}>
                <b>📅 Date:</b> {event.date}
              </p>
              <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem' }}>
                <b>📍 Venue:</b> {event.venue}
              </p>
              {event.entry && (
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem' }}>
                  <b>🎟 Entry:</b> {event.entry}
                </p>
              )}
              {event.contact && (
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem' }}>
                  <b>📞 Contact:</b> {event.contact}
                </p>
              )}
              {event.presentedBy && (
                <p style={{ margin: '0', fontSize: '0.85rem' }}>
                  <b>🤝 Presented By:</b> {event.presentedBy}
                </p>
              )}
            </div>

            {/* RuleBook button if available */}
            {event.rulebook && (
              <div style={{ margin: '1rem 0' }}>
                <a
                  href={event.rulebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold btn-sm"
                  style={{ display: 'inline-flex' }}
                >
                  ✨ View Official RuleBook (PDF) ↗
                </a>
              </div>
            )}

            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginTop: '1.2rem', marginBottom: '0.5rem' }}>
              About the Event
            </h3>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.7', color: 'var(--text)' }}>
              {event.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
