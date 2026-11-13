import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Game from './Game'
import { club } from '../data/siteData'

const R = 34, CIRC = 2 * Math.PI * R

export default function Intro({ onDone, reduced }) {
  const [phase, setPhase] = useState('play') // 'play' | 'dive'
  const [progress, setProgress] = useState(0)

  const dive = useCallback(() => setPhase('dive'), [])

  useEffect(() => {
    if (phase !== 'dive') return
    const t = setTimeout(onDone, 1200)
    return () => clearTimeout(t)
  }, [phase, onDone])

  return (
    <motion.div className="intro" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      {/* Skip button is always readily available */}
      <button className="skip skip-top" onClick={onDone} aria-label="Skip intro">
        Skip intro ⏭
      </button>

      {/* Mini-game starts immediately upon opening */}
      {phase !== 'dive' && !reduced && (
        <Game onProgress={setProgress} onWin={dive} goal={8} />
      )}

      {/* Intro Header & Banner */}
      <AnimatePresence>
        {phase !== 'dive' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              top: 'clamp(20px, 6vh, 60px)',
              left: 0,
              right: 0,
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 10,
              padding: '0 1rem',
            }}
          >
            <p className="kicker" style={{ color: 'var(--teal)', letterSpacing: '0.18em', marginBottom: '0.4rem' }}>
              COLLEGE CREATIVE COLLECTIVE
            </p>
            <h2 className="grad" style={{ fontSize: 'var(--fs-h2)', fontWeight: 600, fontFamily: 'Cinzel, serif' }}>
              {club.name}
            </h2>
            <p style={{ fontStyle: 'italic', color: '#c9d1ee', fontSize: 'var(--fs-body)', margin: '0.3rem 0 0' }}>
              {club.introPunch}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Bottom Game Controls & Status */}
      {phase !== 'dive' && (
        <div className="intro-bottom" style={{ zIndex: 10 }}>
          {reduced ? (
            <>
              <button className="btn btn-gold" onClick={dive}>
                Enter Orbit ✦
              </button>
              <small>Reduced motion active.</small>
            </>
          ) : (
            <>
              <div
                className="ring"
                role="progressbar"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r={R} className="ring-bg" />
                  <circle
                    cx="40"
                    cy="40"
                    r={R}
                    className="ring-fg"
                    strokeDasharray={CIRC}
                    strokeDashoffset={CIRC * (1 - progress)}
                  />
                </svg>
                <span>{Math.round(progress * 100)}%</span>
              </div>
              <small style={{ color: 'var(--text)', background: 'rgba(5, 8, 22, 0.6)', padding: '0.3rem 0.8rem', borderRadius: '999px', backdropFilter: 'blur(8px)' }}>
                Drag globe to steer · Catch 8 stars to enter orbit
              </small>
            </>
          )}
        </div>
      )}

      {/* Dive transition animation */}
      {phase === 'dive' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'absolute', zIndex: 20, textAlign: 'center' }}
        >
          <span className="kicker" style={{ fontSize: '0.9rem', letterSpacing: '0.2em' }}>WELCOME TO</span>
          <h1 className="welcome-flash" style={{ position: 'static', margin: '0.5rem 0' }}>
            {club.name}
          </h1>
          <p className="muted" style={{ fontStyle: 'italic' }}>Entering orbit...</p>
        </motion.div>
      )}
    </motion.div>
  )
}
