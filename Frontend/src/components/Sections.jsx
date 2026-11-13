import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue, useMotionValueEvent, useInView } from 'framer-motion'
import { club, nav, socials, disciplines, events, assets, leaders } from '../data/siteData'

const rise = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7 },
}

export function Navbar({ live, onRegisterLive }) {
  return (
    <header className="nav">
      <a href="#top" className="brand">
        <span className="brand-dot">✦</span>
        <span>{club.name}</span>
      </a>
      <nav>
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      {live ? (
        <button className="btn btn-gold btn-sm" onClick={onRegisterLive}>
          ● Live now
        </button>
      ) : (
        <a href="#events" className="btn btn-gold btn-sm">
          Explore Events
        </a>
      )}
    </header>
  )
}

export function Hero({ reduced }) {
  return (
    <section id="top" className="hero">
      <div className="orbit-ring" aria-hidden="true">
        {!reduced && <i />}
      </div>
      <motion.p className="kicker" {...rise}>
        {club.tagline}
      </motion.p>
      <motion.h1 {...rise}>
        <span className="small-caps">{club.welcomeKicker}</span>
        <span className="grad">{club.name}</span>
      </motion.h1>
      <motion.p className="lede" {...rise}>
        {club.heroSub}
      </motion.p>
      <motion.div className="row" {...rise}>
        <a className="btn btn-gold" href="#disciplines">
          Explore disciplines →
        </a>
        <a className="btn btn-ghost" href="#events">
          See events
        </a>
      </motion.div>
      <span className="scroll-hint">Scroll to orbit</span>
    </section>
  )
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (inView) {
      const a = animate(0, value, {
        duration: 1.4,
        onUpdate: (v) => setN(Math.round(v)),
      })
      return () => a.stop()
    }
  }, [inView, value])

  return (
    <b ref={ref}>
      {n}
      {suffix}
    </b>
  )
}

export function About() {
  return (
    <section id="about" className="section">
      <motion.div className="glass about" {...rise}>
        <figure>
          <img src={assets.mandala} alt="WCE Art Circle mandala artwork" />
          <figcaption>{club.mandalaCaption}</figcaption>
        </figure>
        <div>
          <p className="kicker">{club.aboutKicker}</p>
          <h2 className="grad">{club.aboutTitle}</h2>
          <p>{club.aboutBody}</p>
          <p className="muted">
            <em>{club.aboutNote}</em>
          </p>
          <div className="stats">
            {club.stats.map((s) => (
              <div key={s.label}>
                <Counter {...s} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export function Disciplines({ onSelectDiscipline }) {
  const trackRef = useRef(null)
  const wrapRef = useRef(null)
  const x = useMotionValue(0)
  const [limit, setLimit] = useState(0)
  const [idx, setIdx] = useState(0)
  const [hover, setHover] = useState(false)
  const [touch, setTouch] = useState(false)
  const [focus, setFocus] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [bump, setBump] = useState(0)
  const [reduced] = useState(() => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches))
  const inView = useInView(wrapRef, { amount: 0.2 })
  const STEP = 292 // card width + gap
  const AUTO_MS = 3500 // auto-advance interval

  useEffect(() => {
    const m = () => {
      if (trackRef.current && wrapRef.current) {
        setLimit(Math.max(0, trackRef.current.scrollWidth - wrapRef.current.clientWidth))
      }
    }
    m()
    addEventListener('resize', m)
    return () => removeEventListener('resize', m)
  }, [])

  useEffect(() => {
    const v = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', v)
    return () => document.removeEventListener('visibilitychange', v)
  }, [])

  useEffect(() => {
    const up = () => setTouch(false)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [])

  useMotionValueEvent(x, 'change', (v) =>
    setIdx(Math.min(disciplines.length - 1, Math.max(0, Math.round(-v / STEP))))
  )

  const go = (d) =>
    animate(x, -Math.min(limit, Math.max(0, (idx + d) * STEP)), {
      type: 'spring',
      stiffness: 160,
      damping: 26,
    })

  useEffect(() => {
    if (reduced || hover || touch || focus || hidden || !inView || limit <= 0) return
    const id = setTimeout(() => {
      const cur = -x.get()
      if (cur >= limit - 2) {
        animate(x, 0, { duration: 0.9, ease: [0.22, 1, 0.36, 1] })
      } else {
        animate(x, -Math.min(limit, (idx + 1) * STEP), { type: 'spring', stiffness: 160, damping: 26 })
      }
    }, AUTO_MS)
    return () => clearTimeout(id)
  }, [hover, touch, focus, hidden, inView, limit, idx, bump, reduced])

  const bumpTimer = () => setBump((b) => b + 1)

  const goUser = (d) => {
    bumpTimer()
    go(d)
  }

  return (
    <section
      id="disciplines"
      className="section"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse' || e.pointerType === 'pen') setHover(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse' || e.pointerType === 'pen') setHover(false)
      }}
      onFocus={(e) => setFocus(!!(e.target.matches && e.target.matches(':focus-visible')))}
      onBlur={() => setFocus(false)}
    >
      <motion.div {...rise} className="sec-head">
        <div>
          <p className="kicker">{club.disciplinesKicker}</p>
          <h2 className="grad">Our Disciplines</h2>
          <p className="muted">{club.disciplinesSub}</p>
        </div>
        <div className="arrows">
          <span className="now">
            Now orbiting: <b style={{ color: disciplines[idx]?.accent }}>{disciplines[idx]?.name}</b>
          </span>
          <button aria-label="Previous" onClick={() => goUser(-1)}>
            ←
          </button>
          <button aria-label="Next" onClick={() => goUser(1)}>
            →
          </button>
        </div>
      </motion.div>

      <div ref={wrapRef} className="disc-wrap">
        <motion.div
          ref={trackRef}
          className="disc-track"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.12}
          onPointerDown={() => {
            setTouch(true)
            bumpTimer()
          }}
        >
          {disciplines.map((d, i) => (
            <article
              key={d.id}
              className={'disc-card' + (i === idx ? ' active' : '')}
              style={{ '--accent': d.accent }}
              onClick={() => onSelectDiscipline(d)}
            >
              <div
                className="disc-bg"
                style={
                  d.image
                    ? { backgroundImage: `url(${d.image})` }
                    : {
                        background: `radial-gradient(circle at 30% 20%, ${d.accent}66, transparent 60%), linear-gradient(160deg, #101a3a, #070b20)`,
                      }
                }
              />
              <div className="disc-shade" />
              <span className="disc-no">{String(i + 1).padStart(2, '0')}</span>
              <div className="disc-body">
                <small>{d.name}</small>
                <h3>{d.headline}</h3>
                <p>{d.blurb}</p>
                <footer>
                  <span>
                    {d.members} members · {d.meets}
                  </span>
                  <button
                    className="open-btn"
                    aria-label={`Open ${d.name} exhibition`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectDiscipline(d)
                    }}
                  >
                    ↗
                  </button>
                </footer>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      <div className="dots">
        {disciplines.map((d, i) => (
          <i
            key={d.id}
            className={i === idx ? 'on' : ''}
            style={i === idx ? { background: d.accent } : null}
          />
        ))}
      </div>
    </section>
  )
}

export function Events({ onRegister, onSelectEvent }) {
  const [filter, setFilter] = useState('all')
  const list = events.filter((e) => filter === 'all' || e.status === filter)

  return (
    <section id="events" className="section">
      <motion.div {...rise} className="sec-head">
        <div>
          <p className="kicker">{club.eventsKicker}</p>
          <h2 className="grad">Events & Milestones</h2>
          <p className="muted">{club.eventsSub}</p>
        </div>
        <div className="filters" role="tablist">
          {['all', 'live', 'completed'].map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={filter === f ? 'on' : ''}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="ev-grid">
        {list.length === 0 && (
          <p className="muted" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem 0' }}>
            ✦ Registrations closed — next event coming soon ✦
          </p>
        )}
        {list.map((e) => (
          <motion.article
            layout
            key={e.id}
            {...rise}
            className={'ev-card ' + e.status}
            onClick={() => onSelectEvent(e)}
          >
            <div className="ev-img" style={{ backgroundImage: `url(${e.image})` }}>
              <span className={'badge ' + e.status}>
                {e.status === 'live' ? '● LIVE NOW' : '✓ COMPLETED'}
              </span>
            </div>
            <div className="ev-body">
              <small>{e.tag}</small>
              <h3>{e.title}</h3>
              <p className="muted">{e.subtitle}</p>
              <ul>
                <li>📅 {e.date}</li>
                <li>📍 {e.venue}</li>
                {e.seats ? (
                  <li>
                    🎟 {e.seats.taken}/{e.seats.total} seats · {e.status === 'live' ? 'Registrations Open' : 'Registrations closed'}
                  </li>
                ) : (
                  <li>📊 {e.stat}</li>
                )}
              </ul>
              {e.seats && (
                <div className="bar">
                  <i style={{ width: `${(e.seats.taken / e.seats.total) * 100}%` }} />
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem' }}>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    onSelectEvent(e)
                  }}
                >
                  View Details ↗
                </button>
                {e.status === 'live' && (
                  <button
                    className="btn btn-gold btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={(ev) => {
                      ev.stopPropagation()
                      onRegister(e)
                    }}
                  >
                    Register →
                  </button>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function Leaders() {
  return (
    <section id="leaders" className="section">
      <motion.div {...rise} className="sec-head">
        <div>
          <p className="kicker">Core Leadership</p>
          <h2 className="grad">Our Leaders</h2>
          <p className="muted">The dedicated student council steering the creative spirit of WCE Art Circle.</p>
        </div>
      </motion.div>

      <div className="leaders-grid">
        {leaders.map((m) => (
          <motion.div key={m.name} className="leader-card glass" {...rise}>
            <div className="leader-avatar">
              <img src={m.image} alt={m.name} style={m.imgPos ? { objectPosition: m.imgPos } : undefined} />
            </div>
            <h3 className="leader-name">{m.name}</h3>
            <p className="leader-role">{m.role}</p>
            <div className="leader-links">
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label={`${m.name} LinkedIn`}>
                  in
                </a>
              )}
              {m.instagram && (
                <a href={m.instagram} target="_blank" rel="noreferrer" aria-label={`${m.name} Instagram`}>
                  IG
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section id="join" className="section">
      <motion.div className="cta" {...rise}>
        <p className="kicker">{club.ctaKicker}</p>
        <h2 className="grad">{club.ctaTitle}</h2>
        <div className="row">
          <a className="btn btn-gold" href={`mailto:${club.email}`}>
            Join ArtCircle →
          </a>
          <a className="btn btn-ghost" href="#events">
            Explore Events
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export function Footer({ onSelectPolicy }) {
  return (
    <footer className="footer-wrap" id="footer">
      <div className="footer-container">
        {/* Column 1: Logo */}
        <div className="footer-brand-col">
          <img src={assets.favi} alt="WCE Art Circle Emblem" className="footer-logo-img" />
          <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 600, fontSize: '0.95rem', color: '#fff' }}>
            WCE ART CIRCLE
          </span>
          <small className="muted" style={{ fontSize: '0.72rem' }}>
            Walchand College of Engineering
          </small>
        </div>

        {/* Column 2: Social Media & Stay Tuned */}
        <div className="footer-social-col">
          <h4>Stay Tuned!</h4>
          <div className="footer-social-icons">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                {s.glyph}
              </a>
            ))}
          </div>
          <p className="copy muted" style={{ fontSize: '0.76rem' }}>
            {club.copyright}
          </p>
        </div>

        {/* Column 3: Contact & Address Details */}
        <div className="footer-details-col">
          <p className="footer-detail-item">
            <span>✉️</span>
            <span>
              <b>Email Us At: </b>
              <a href={`mailto:${club.email}`} style={{ color: 'var(--text)' }}>
                {club.email}
              </a>
            </span>
          </p>
          <p className="footer-detail-item">
            <span>📍</span>
            <span>
              <b>Reach Us At: </b>
              {club.address}
            </span>
          </p>
          <p className="footer-detail-item">
            <span>📞</span>
            <span>
              <b>Contact Us At: </b>
              <a href={`tel:${club.phone.replace(/[^0-9+]/g, '')}`} style={{ color: 'var(--text)' }}>
                {club.phone}
              </a>
            </span>
          </p>
        </div>
      </div>

      {/* Policy Bar with clickable modals */}
      <div className="footer-policy-bar">
        <div className="footer-policy-links">
          <button onClick={() => onSelectPolicy('privacy')}>PRIVACY POLICY</button>
          <span>|</span>
          <button onClick={() => onSelectPolicy('terms')}>TERMS AND CONDITIONS</button>
          <span>|</span>
          <button onClick={() => onSelectPolicy('cancellation')}>CANCELLATION AND REFUND POLICY</button>
          <span>|</span>
          <button onClick={() => onSelectPolicy('pricing')}>SERVICE PRICING</button>
        </div>
        <div>
          <span>Crafted with passion by WCE Art Circle</span>
        </div>
      </div>
    </footer>
  )
}
