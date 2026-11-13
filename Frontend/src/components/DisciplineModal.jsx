import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DisciplineModal({ discipline, onClose }) {
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [onClose])

  if (!discipline) return null

  return (
    <>
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
          aria-label={discipline.name}
          initial={{ y: 30, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{ '--accent': discipline.accent }}
        >
          <button className="x" onClick={onClose} aria-label="Close modal">
            ✕
          </button>

          <span className="kicker" style={{ color: discipline.accent, letterSpacing: '0.18em' }}>
            WCE ART CIRCLE · ARTFORM WING
          </span>
          <h2 className="grad" style={{ fontSize: 'var(--fs-h2)', fontWeight: 600, marginTop: '0.2rem' }}>
            {discipline.name}
          </h2>
          <p style={{ fontStyle: 'italic', color: discipline.accent, margin: '0.2rem 0 1rem', fontSize: 'var(--fs-body)' }}>
            "{discipline.headline}"
          </p>

          <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.7', color: 'var(--text)', whiteSpace: 'pre-line' }}>
            {discipline.description || discipline.blurb}
          </p>

          {/* Exhibition / Gallery */}
          {discipline.artforms && discipline.artforms.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 600, color: '#fff', borderBottom: '1px solid var(--line)', paddingBottom: '0.5rem' }}>
                Exhibition Gallery & Performances
              </h3>

              <div className="art-grid">
                {discipline.artforms.map((item, idx) => (
                  <div key={idx} className="art-card" onClick={() => item.image && setActiveImage(item)}>
                    {item.type === 'youtube' && (
                      <div className="video-frame">
                        <iframe
                          src={item.youtube}
                          title={item.artist}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {item.type === 'instagram' && (
                      <div
                        style={{
                          height: '160px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, rgba(225,48,108,0.2), rgba(64,93,230,0.2))',
                          borderRadius: '10px',
                          padding: '1rem',
                          textAlign: 'center',
                        }}
                      >
                        <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</span>
                        <a
                          href={item.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-gold btn-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Watch Reel on Instagram ↗
                        </a>
                      </div>
                    )}

                    {item.type === 'image' && (
                      <>
                        <img src={item.image} alt={item.artist} loading="lazy" />
                        <div className="art-card-info">
                          <span style={{ fontWeight: 600 }}>{item.artist}</span>
                          {item.social && (
                            <a
                              href={item.social}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Profile ↗
                            </a>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Lightbox for viewing full-size artwork */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="modal-back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            style={{ zIndex: 300 }}
          >
            <motion.div
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="x"
                onClick={() => setActiveImage(null)}
                style={{ top: '-36px', right: '0', color: '#fff', fontSize: '1.4rem' }}
              >
                ✕
              </button>
              <img
                src={activeImage.image}
                alt={activeImage.artist}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                }}
              />
              <p style={{ marginTop: '0.8rem', color: '#fff', fontWeight: 600, fontSize: '1rem' }}>
                {activeImage.artist}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
