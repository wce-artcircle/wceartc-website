import { useEffect, useRef } from 'react'

// Persistent animated Milky-Way background (teal / purple / blue particles).
export default function Starfield({ reduced }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const cols = ['#9ff3ff', '#b79cff', '#7fa8ff', '#ffffff']
    let w, h, stars, raf
    const init = () => {
      w = c.width = innerWidth; h = c.height = innerHeight
      const n = Math.min(260, Math.floor((w * h) / 6500))
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.2,
        p: Math.random() * 6.28, s: Math.random() * 0.02 + 0.005, c: cols[(Math.random() * 4) | 0],
      }))
    }
    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(s.p + t * s.s * 0.06))
        ctx.fillStyle = s.c
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    init(); draw()
    addEventListener('resize', init)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', init) }
  }, [reduced])
  return (
    <div className="bg-fixed" aria-hidden="true">
      <div className="nebula" />
      <canvas ref={ref} />
    </div>
  )
}
