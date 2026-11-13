import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// RegisterModal connects to the exact DB & Backend schema of WCE Art Circle:
// Schema fields: { name, prn, phone, email, transactionId, otp }
// Endpoint: POST /register  ->  returns { task: { otp, ... } }
// Verification: PATCH /register  -> { otp } -> returns { msg: "OTP verified" }
// Configured via VITE_REGISTER_API in .env

export default function RegisterModal({ event, onClose }) {
  const [step, setStep] = useState('form') // 'form' | 'otp' | 'success'
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [studentData, setStudentData] = useState(null)

  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [onClose])

  const submitRegistration = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)

    const form = e.target
    const name = form.name.value.trim()
    const email = form.email.value.trim()
    const prn = form.prn.value.trim()
    const phone = form.phone.value.trim()
    const transactionId = form.transactionId?.value.trim() || `TXN-${Date.now().toString().slice(-6)}`

    const payload = { name, prn, phone, email, transactionId }
    setStudentData(payload)

    const api = import.meta.env.VITE_REGISTER_API

    if (!api) {
      if (import.meta.env.DEV) {
        // Dev-only: no backend running locally, simulate instant confirmation
        setTimeout(() => {
          setLoading(false)
          setStep('success')
        }, 600)
      } else {
        setLoading(false)
        setErr('Online registration is not available yet. Please use the official portal if provided, or contact the club directly.')
      }
      return
    }

    try {
      const res = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setLoading(false)
        setErr(data.msg || 'Registration submission failed. Please verify details.')
        return
      }

      setLoading(false)
      // If backend sends OTP for verification, advance to OTP step; otherwise success
      if (data.task?.otp || data.msg?.includes('OTP')) {
        setStep('otp')
      } else {
        setStep('success')
      }
    } catch {
      setLoading(false)
      if (import.meta.env.DEV) {
        // Dev-only fallback for demo when backend is offline
        setStep('success')
      } else {
        setErr('Could not reach the registration server. Please check your connection and try again.')
      }
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)

    const api = import.meta.env.VITE_REGISTER_API

    if (!api) {
      if (import.meta.env.DEV) {
        setTimeout(() => {
          setLoading(false)
          setStep('success')
        }, 400)
      } else {
        setLoading(false)
        setErr('Verification is unavailable right now. Please contact the club to confirm your registration.')
      }
      return
    }

    try {
      const res = await fetch(api, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpInput.trim() }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setLoading(false)
        setErr(data.msg || 'Invalid or expired OTP. Please try again.')
        return
      }

      setLoading(false)
      setStep('success')
    } catch {
      setLoading(false)
      if (import.meta.env.DEV) {
        setStep('success')
      } else {
        setErr('Could not reach the registration server. Please try again in a moment.')
      }
    }
  }

  return (
    <motion.div
      className="modal-back"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal glass"
        role="dialog"
        aria-modal="true"
        aria-label={`Register for ${event.title}`}
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', width: '92%' }}
      >
        <button className="x" onClick={onClose} aria-label="Close">✕</button>
        <span className="badge live">● LIVE NOW</span>
        <h3 className="grad">{event.title}</h3>
        <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
          {event.subtitle || event.tagline} · {event.date} · {event.venue}
        </p>

        {/* External Registration Portal (e.g. KonfHub) */}
        {event.registerUrl && (
          <div style={{ marginBottom: '1rem' }}>
            <a
              className="btn btn-gold"
              href={event.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', marginBottom: '0.6rem' }}
            >
              Open Official KonfHub Portal ↗
            </a>
            <p className="muted" style={{ fontSize: '0.75rem', textAlign: 'center' }}>
              Or register directly in our college database below:
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.form
              key="form"
              onSubmit={submitRegistration}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'grid', gap: '0.6rem' }}
            >
              <input
                name="name"
                required
                placeholder="Full Name (as per ID)"
                defaultValue={studentData?.name || ''}
              />
              <input
                name="prn"
                required
                placeholder="College PRN / Roll Number"
                defaultValue={studentData?.prn || ''}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="Email ID"
                  defaultValue={studentData?.email || ''}
                />
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="Contact Number"
                  defaultValue={studentData?.phone || ''}
                />
              </div>
              <input
                name="transactionId"
                placeholder="Transaction ID (if applicable / leave empty)"
              />
              {err && <p style={{ color: '#ff6b6b', fontSize: '0.8rem', margin: '0.2rem 0' }}>{err}</p>}
              <button className="btn btn-gold" disabled={loading} style={{ marginTop: '0.4rem', justifyContent: 'center' }}>
                {loading ? 'Registering...' : 'Register in WCE Art Circle DB →'}
              </button>
            </motion.form>
          )}

          {step === 'otp' && (
            <motion.form
              key="otp"
              onSubmit={verifyOtp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'grid', gap: '0.8rem', textAlign: 'center' }}
            >
              <p style={{ fontSize: '0.88rem' }}>
                Enter the 4-digit verification code sent to <b>{studentData?.email}</b>:
              </p>
              <input
                required
                maxLength={6}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="Enter OTP"
                style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '0.2em' }}
              />
              {err && <p style={{ color: '#ff6b6b', fontSize: '0.8rem' }}>{err}</p>}
              <button className="btn btn-gold" disabled={loading} style={{ justifyContent: 'center' }}>
                {loading ? 'Verifying...' : 'Verify OTP & Confirm Entry →'}
              </button>
              <button
                type="button"
                onClick={() => setStep('form')}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.78rem' }}
              >
                ← Edit details
              </button>
            </motion.form>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '1rem 0' }}
            >
              <p className="ok" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--gold)', margin: '0 0 0.5rem' }}>
                ✦ Registration Confirmed! ✦
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text)', margin: '0 0 1rem' }}>
                You are registered in the WCE Art Circle database. See you under the stage lights!
              </p>
              <button className="btn btn-gold btn-sm" onClick={onClose} style={{ margin: '0 auto' }}>
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
