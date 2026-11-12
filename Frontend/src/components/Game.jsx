import { useEffect, useRef } from 'react'
import { assets } from '../data/siteData'

// Galaxy mini-game: drag / swipe to steer the globe, collect stars, dodge asteroids.
// Collect `goal` stars → onProgress(1) → onWin(). One-finger & mouse friendly.
export default function Game({ goal = 8, onProgress, onWin }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    const img = new Image()
    img.src = assets.globe

    let w = window.innerWidth, h = window.innerHeight, raf, last = performance.now()
    let sSpawn = 0, aSpawn = 0, score = 0, won = false, flash = 0
    const me = { x: w / 2, y: h * 0.7, tx: w / 2, ty: h * 0.7, r: 28 }
    let stars = [], rocks = []

    const size = () => {
      if (!c) return
      const r = c.getBoundingClientRect()
      w = c.width = r.width || window.innerWidth
      h = c.height = r.height || window.innerHeight
      if (!me.x || me.x === 0) {
        me.x = me.tx = w / 2
        me.y = me.ty = h * 0.7
      }
    }

    const move = (e) => {
      if (!c) return
      const r = c.getBoundingClientRect()
      const p = e.touches ? e.touches[0] : e
      me.tx = p.clientX - r.left
      me.ty = p.clientY - r.top - (e.touches ? 40 : 0)
    }

    const loop = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      ctx.clearRect(0, 0, w, h)

      me.x += (me.tx - me.x) * 0.18
      me.y += (me.ty - me.y) * 0.18

      sSpawn -= dt
      aSpawn -= dt
      if (sSpawn <= 0) {
        sSpawn = 0.65
        stars.push({
          x: 40 + Math.random() * (w - 80),
          y: -20,
          v: 110 + Math.random() * 70,
          p: Math.random() * 6.28,
        })
      }
      if (aSpawn <= 0) {
        aSpawn = 1.0
        rocks.push({
          x: 40 + Math.random() * (w - 80),
          y: -30,
          v: 80 + Math.random() * 90,
          r: 16 + Math.random() * 14,
          a: 0,
        })
      }

      // Draw and update stars
      for (const s of stars) {
        s.y += s.v * dt
        s.p += dt * 4
        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.p)
        ctx.fillStyle = '#ffd35a'
        ctx.shadowColor = '#ffb020'
        ctx.shadowBlur = 16
        ctx.beginPath()
        for (let i = 0; i < 10; i++) {
          const rr = i % 2 ? 5 : 12
          const a = (i * Math.PI) / 5
          ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr)
        }
        ctx.fill()
        ctx.restore()

        if (!won && Math.hypot(s.x - me.x, s.y - me.y) < me.r + 12) {
          s.dead = true
          score++
          onProgress?.(Math.min(1, score / goal))
          if (score >= goal) {
            won = true
            setTimeout(() => onWin?.(), 400)
          }
        }
      }

      // Draw and update asteroids
      for (const a of rocks) {
        a.y += a.v * dt
        a.a += dt * 1.5
        ctx.save()
        ctx.translate(a.x, a.y)
        ctx.rotate(a.a)
        ctx.fillStyle = '#6b7280'
        ctx.strokeStyle = '#9ca3af'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        for (let i = 0; i < 7; i++) {
          const rr = a.r * (0.8 + (0.25 * ((i * 37) % 3)) / 3)
          const q = (i / 7) * 6.28
          ctx.lineTo(Math.cos(q) * rr, Math.sin(q) * rr)
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        ctx.restore()

        if (!a.dead && Math.hypot(a.x - me.x, a.y - me.y) < me.r + a.r * 0.8) {
          a.dead = true
          flash = 0.35
          if (!won && score > 0) {
            score--
            onProgress?.(score / goal)
          }
        }
      }

      stars = stars.filter((s) => !s.dead && s.y < h + 30)
      rocks = rocks.filter((a) => !a.dead && a.y < h + 40)

      flash = Math.max(0, flash - dt)

      // Draw player globe
      ctx.save()
      ctx.globalAlpha = 1 - flash
      ctx.shadowColor = '#a066ff'
      ctx.shadowBlur = 30

      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, me.x - me.r, me.y - me.r, me.r * 2, me.r * 2)
      } else {
        // Fallback glowing orb
        const grad = ctx.createRadialGradient(me.x, me.y, 4, me.x, me.y, me.r)
        grad.addColorStop(0, '#ffc83d')
        grad.addColorStop(1, '#8a4dff')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(me.x, me.y, me.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      raf = requestAnimationFrame(loop)
    }

    size()
    raf = requestAnimationFrame(loop)
    addEventListener('resize', size)
    c.addEventListener('pointermove', move)
    c.addEventListener('pointerdown', move)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', size)
      c.removeEventListener('pointermove', move)
      c.removeEventListener('pointerdown', move)
    }
  }, [goal, onProgress, onWin])

  return (
    <canvas
      ref={ref}
      className="game-canvas"
      aria-label="Galaxy mini-game: drag to steer the globe and collect stars"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }}
    />
  )
}
