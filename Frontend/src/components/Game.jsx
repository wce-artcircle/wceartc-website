import { useEffect, useRef } from 'react'

const TUNE = {
  fire: 0.18,
  bulletV: 82,
  bugHp: 2,
  bugV: 5.5,
  bugRamp: 0.3,
  bugWave: 3.2,
  bugAmp: 9,
  bugShoot: 2,
  redV: 14,
  spawn: 1.0,
  spawnMin: 0.45,
  spawnFast: 0.55,
  maxBugs: 5,
  stun: 0.5,
  fly: 0.85,
  warpTime: 1.0,
  maxParts: 150,
  maxTexts: 24,
}

const EMOJIS = ['🎸', '🥁', '🎹', '🎻', '🎺', '🎤', '🎷', '🪕']

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)

const makeGlow = (rgb) => {
  const cv = document.createElement('canvas')
  cv.width = cv.height = 64
  const g = cv.getContext('2d')
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  gr.addColorStop(0, `rgba(${rgb},0.55)`)
  gr.addColorStop(0.45, `rgba(${rgb},0.16)`)
  gr.addColorStop(1, `rgba(${rgb},0)`)
  g.fillStyle = gr
  g.fillRect(0, 0, 64, 64)
  return cv
}

const makeVig = (fn) => {
  const cv = document.createElement('canvas')
  cv.width = cv.height = 160
  const g = cv.getContext('2d')
  const gr = g.createRadialGradient(80, 80, 10, 80, 80, 120)
  fn(gr)
  g.fillStyle = gr
  g.fillRect(0, 0, 160, 160)
  return cv
}

const buildSprites = () => {
  const S = {
    glows: {
      gold: makeGlow('255,190,70'),
      orange: makeGlow('255,140,60'),
      teal: makeGlow('45,220,190'),
      violet: makeGlow('150,90,255'),
      red: makeGlow('255,60,70'),
      white: makeGlow('200,215,255'),
    },
  }
  S.vigDark = makeVig((gr) => {
    gr.addColorStop(0, 'rgba(0,0,10,0)')
    gr.addColorStop(0.55, 'rgba(0,0,10,0)')
    gr.addColorStop(1, 'rgba(0,0,10,0.42)')
  })
  S.vigRed = makeVig((gr) => {
    gr.addColorStop(0, 'rgba(255,40,50,0)')
    gr.addColorStop(0.5, 'rgba(255,40,50,0.06)')
    gr.addColorStop(1, 'rgba(255,40,60,0.55)')
  })
  S.vigGold = makeVig((gr) => {
    gr.addColorStop(0, 'rgba(255,244,214,0.95)')
    gr.addColorStop(0.5, 'rgba(255,205,110,0.5)')
    gr.addColorStop(1, 'rgba(255,170,60,0.25)')
  })
  return S
}

const emojiFont = (px) => `600 ${px}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`

export default function Game({ goal = 8, onProgress, onWin }) {
  const ref = useRef(null)
  const cb = useRef({ onProgress, onWin })
  useEffect(() => {
    cb.current = { onProgress, onWin }
  })

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const SPR = buildSprites()
    const buzz = (ms) => {
      try {
        navigator.vibrate && navigator.vibrate(ms)
      } catch {}
    }

    let w = 0
    let h = 0
    let u = 4
    let dpr = 1
    let bgGrad = null
    let raf = 0
    let last = performance.now()
    let now = last

    const me = { x: 0, y: 0, tx: 0, ty: 0, r: 18, bank: 0, vx: 0 }
    let collected = 0
    let won = false
    let winSent = false
    let warp = 0
    let fireT = 0.3
    let muzzle = 0
    let stun = 0
    let shipFlash = 0
    let shake = 0
    let hitFlash = 0
    let bugSpawnT = 0.6
    let emojiSeq = 0
    const slotEmoji = new Array(goal).fill('')

    const bugs = []
    const bullets = []
    const reds = []
    const flyers = []
    const parts = Array.from({ length: TUNE.maxParts }, () => ({ life: 0, max: 1, x: 0, y: 0, vx: 0, vy: 0, size: 0.5, color: '#fff', drag: 2.4 }))
    let pc = 0
    const texts = Array.from({ length: TUNE.maxTexts }, () => ({ life: 0, max: 1, x: 0, y: 0, str: '', col: '#fff', size: 4, wgt: 600 }))
    let tc = 0

    const field = [[], [], []]
    const LAYERS = [
      { v: 6, a: 0.35, lw: 0.3, col: '#8ea2ff' },
      { v: 14, a: 0.55, lw: 0.55, col: '#c9d6ff' },
      { v: 28, a: 0.9, lw: 1.0, col: '#ffffff' },
    ]
    let maxR = 500

    const seedField = () => {
      const counts = [90, 48, 26]
      maxR = h + 6 * u
      for (let l = 0; l < 3; l++) {
        const arr = field[l]
        arr.length = 0
        for (let i = 0; i < counts[l]; i++) {
          arr.push({ x: Math.random() * w, y: Math.random() * h, sp: 0.85 + Math.random() * 0.3 })
        }
      }
    }

    const slotX = (i) => w / 2 + (i - (goal - 1) / 2) * 7.6 * u
    const slotY = () => h - 6.5 * u

    const size = () => {
      const rect = c.getBoundingClientRect()
      const nw = Math.max(1, rect.width || window.innerWidth)
      const nh = Math.max(1, rect.height || window.innerHeight)
      dpr = Math.min(2, window.devicePixelRatio || 1)
      const changed = Math.abs(nw - w) > 0.5 || Math.abs(nh - h) > 0.5
      c.width = Math.round(nw * dpr)
      c.height = Math.round(nh * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      w = nw
      h = nh
      u = Math.min(nw, nh) / 100
      me.r = 4.5 * u
      bgGrad = ctx.createLinearGradient(0, 0, 0, h)
      bgGrad.addColorStop(0, '#0d1332')
      bgGrad.addColorStop(0.55, '#080c22')
      bgGrad.addColorStop(1, '#04060e')
      const xm = me.r + 1.5 * u
      me.x = clamp(me.x || w / 2, xm, w - xm)
      me.y = clamp(me.y || h * 0.72, me.r + 2 * u, h - 12 * u)
      me.tx = clamp(me.tx || me.x, xm, w - xm)
      me.ty = clamp(me.ty || me.y, me.r + 2 * u, h - 12 * u)
      if (changed) seedField()
    }

    const addPart = (x, y, vx, vy, life, size2, color, drag) => {
      const p = parts[pc]
      pc = (pc + 1) % parts.length
      p.x = x
      p.y = y
      p.vx = vx
      p.vy = vy
      p.life = life
      p.max = life
      p.size = size2
      p.color = color
      p.drag = drag || 2.4
    }

    const burst = (x, y, color, n, sp) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * 6.283
        const v = sp * (0.35 + Math.random() * 0.75)
        addPart(x, y, Math.cos(a) * v, Math.sin(a) * v, 0.4 + Math.random() * 0.45, (0.45 + Math.random() * 0.65) * u, color, 2.6)
      }
    }

    const addText = (x, y, str, col, size2, wgt) => {
      const t = texts[tc]
      tc = (tc + 1) % texts.length
      t.x = x
      t.y = y
      t.str = str
      t.col = col
      t.size = size2 || 4 * u
      t.wgt = wgt || 600
      t.life = 0.9
      t.max = 0.9
    }

    const spawnBug = () => {
      const bx = 10 * u + Math.random() * (w - 20 * u)
      bugs.push({
        bx,
        x: bx,
        y: -7 * u,
        t: Math.random() * 6.283,
        amp: TUNE.bugAmp * (0.7 + Math.random() * 0.6) * u,
        freq: TUNE.bugWave * (0.8 + Math.random() * 0.5),
        emoji: EMOJIS[emojiSeq++ % EMOJIS.length],
        hp: TUNE.bugHp,
        flash: 0,
        shootT: TUNE.bugShoot * (0.6 + Math.random() * 0.8),
      })
    }

    const killBug = (g) => {
      burst(g.x, g.y, '#ff8a2a', reduced ? 7 : 15, 42 * u)
      burst(g.x, g.y, '#ffd35a', reduced ? 3 : 7, 30 * u)
      flyers.push({ emoji: g.emoji, sx: g.x, sy: g.y + 9.5 * u, slot: collected, t: 0, ex: slotX(collected), ey: slotY() })
      buzz(14)
    }

    const hitShip = (x, y) => {
      stun = TUNE.stun
      shipFlash = 1
      hitFlash = 0.6
      shake = reduced ? 0 : 2.6 * u
      burst(x, y, '#ff5a4a', reduced ? 4 : 9, 32 * u)
      buzz(40)
    }

    const arrive = (f) => {
      slotEmoji[f.slot] = f.emoji
      collected++
      cb.current.onProgress && cb.current.onProgress(Math.min(1, collected / goal))
      addText(f.ex, f.ey - 5.5 * u, '+1', '#ffd35a', 3.8 * u, 700)
      if (!reduced) shake = Math.max(shake, 1.3 * u)
      buzz(10)
      if (collected >= goal && !won) {
        won = true
        warp = 0
        reds.length = 0
        burst(w / 2, h * 0.45, '#ffd35a', reduced ? 8 : 26, 60 * u)
        buzz(30)
        if (reduced) {
          winSent = true
          cb.current.onWin && cb.current.onWin()
        }
      }
    }

    const updateWorld = (mdt, dt) => {
      if (!won) {
        bugSpawnT -= mdt
        if (bugSpawnT <= 0 && bugs.length < TUNE.maxBugs) {
          spawnBug()
          bugSpawnT = Math.max(TUNE.spawnMin, TUNE.spawn - (collected / goal) * TUNE.spawnFast) * (0.85 + Math.random() * 0.3)
        }
      } else if (!reduced && !winSent) {
        warp = Math.min(1, warp + dt / TUNE.warpTime)
        me.tx += (w / 2 - me.tx) * Math.min(1, dt * 2.5)
        me.ty += (h * 0.55 - me.ty) * Math.min(1, dt * 2.5)
        if (warp >= 1 && !winSent) {
          winSent = true
          cb.current.onWin && cb.current.onWin()
        }
      }

      const xm = me.r + 1.5 * u
      const yTop = me.r + 2 * u
      const yBot = h - 12 * u
      const k = 1 - Math.exp(-dt * 9)
      const nx = me.x + (me.tx - me.x) * k
      const ny = me.y + (me.ty - me.y) * k
      if (dt > 0.0005) me.vx = (nx - me.x) / dt
      me.x = clamp(nx, xm, w - xm)
      me.y = clamp(ny, yTop, yBot)
      const bankT = clamp(me.vx * 0.0012, -0.4, 0.4)
      me.bank += (bankT - me.bank) * (1 - Math.exp(-dt * 8))

      fireT -= mdt
      muzzle = Math.max(0, muzzle - dt)
      stun = Math.max(0, stun - dt)
      shipFlash = Math.max(0, shipFlash - dt * 3)
      if (fireT <= 0 && stun <= 0) {
        fireT = TUNE.fire
        muzzle = 0.07
        const bv = -TUNE.bulletV * u
        bullets.push({ x: me.x - 1.7 * u, y: me.y - 3.2 * u, vy: bv })
        bullets.push({ x: me.x + 1.7 * u, y: me.y - 3.2 * u, vy: bv })
      }

      const objMul = won && !reduced ? 1 + warp * 4 : 1

      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i]
        b.y += b.vy * mdt * objMul
        if (b.y < -6 * u) {
          bullets.splice(i, 1)
          continue
        }
        for (let j = bugs.length - 1; j >= 0; j--) {
          const g = bugs[j]
          if (Math.abs(b.x - g.x) < 4.5 * u && Math.abs(b.y - g.y) < 5 * u) {
            bullets.splice(i, 1)
            g.hp--
            g.flash = 1
            burst(b.x, b.y - u, '#dffcf2', reduced ? 2 : 4, 18 * u)
            if (g.hp <= 0) {
              bugs.splice(j, 1)
              killBug(g)
            }
            break
          }
        }
      }

      const bugV = (TUNE.bugV + collected * TUNE.bugRamp) * u
      for (let i = bugs.length - 1; i >= 0; i--) {
        const g = bugs[i]
        g.t += g.freq * mdt
        g.y += bugV * mdt * objMul
        g.x = clamp(g.bx + Math.sin(g.t) * g.amp, 6 * u, w - 6 * u)
        g.flash = Math.max(0, g.flash - dt * 3.5)
        if (g.y > h + 7 * u) {
          bugs.splice(i, 1)
          continue
        }
        if (!won && g.y > 8 * u && g.y < h - 18 * u) {
          g.shootT -= mdt
          if (g.shootT <= 0) {
            g.shootT = TUNE.bugShoot * (0.9 + Math.random() * 0.3)
            reds.push({ x: g.x, y: g.y + 3 * u, vy: TUNE.redV * u })
          }
        }
      }

      for (let i = reds.length - 1; i >= 0; i--) {
        const r = reds[i]
        r.y += r.vy * mdt
        if (r.y > h + 5 * u) {
          reds.splice(i, 1)
          continue
        }
        if (!won && Math.hypot(r.x - me.x, r.y - me.y) < me.r + 1.2 * u) {
          reds.splice(i, 1)
          hitShip(r.x, r.y)
        }
      }

      for (let i = flyers.length - 1; i >= 0; i--) {
        const f = flyers[i]
        f.t += dt / TUNE.fly
        if (f.t >= 1) {
          flyers.splice(i, 1)
          arrive(f)
        }
      }

      const fieldMul = won && !reduced ? 1 + warp * warp * 8 : 1
      for (let l = 0; l < 3; l++) {
        const L = LAYERS[l]
        const arr = field[l]
        for (let i = 0; i < arr.length; i++) {
          const st = arr[i]
          st.y += L.v * u * st.sp * fieldMul * mdt
          if (st.y > maxR) {
            st.y = -2 * u - Math.random() * 8 * u
            st.x = Math.random() * w
          }
        }
      }

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        if (p.life <= 0) continue
        p.life -= dt
        if (p.life <= 0) continue
        p.x += p.vx * dt
        p.y += p.vy * dt
        const dr = Math.exp(-dt * p.drag)
        p.vx *= dr
        p.vy *= dr
      }
      for (let i = 0; i < texts.length; i++) {
        const t = texts[i]
        if (t.life <= 0) continue
        t.life -= dt
        t.y -= 12 * u * dt
      }

      shake = Math.max(0, shake - dt * 13 * u)
      hitFlash = Math.max(0, hitFlash - dt * 1.6)
    }

    const drawSprite = (spr, x, y, size2, rot, alpha) => {
      if (alpha !== 1) ctx.globalAlpha = alpha
      if (rot) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rot)
        ctx.drawImage(spr, -size2 / 2, -size2 / 2, size2, size2)
        ctx.restore()
      } else {
        ctx.drawImage(spr, x - size2 / 2, y - size2 / 2, size2, size2)
      }
      if (alpha !== 1) ctx.globalAlpha = 1
    }

    const drawField = () => {
      const mul = won && !reduced ? 1 + warp * warp * 8 : 1
      ctx.lineCap = 'round'
      for (let l = 0; l < 3; l++) {
        const L = LAYERS[l]
        const arr = field[l]
        ctx.strokeStyle = L.col
        ctx.lineWidth = L.lw * u
        ctx.globalAlpha = L.a
        ctx.beginPath()
        for (let i = 0; i < arr.length; i++) {
          const st = arr[i]
          const len = (reduced ? 0.4 : Math.min(30, Math.max(0.5, L.v * st.sp * mul * 0.045))) * u
          ctx.moveTo(st.x, st.y - len)
          ctx.lineTo(st.x, st.y)
        }
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const drawBug = (g) => {
      ctx.save()
      ctx.translate(g.x, g.y)
      const flap = Math.sin(now * 0.02 + g.t) * 0.55
      ctx.strokeStyle = '#0d5f52'
      ctx.lineWidth = 0.3 * u
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(-0.9 * u, -2.6 * u)
      ctx.quadraticCurveTo(-1.6 * u, -4.4 * u, -2.1 * u, -5.1 * u)
      ctx.moveTo(0.9 * u, -2.6 * u)
      ctx.quadraticCurveTo(1.6 * u, -4.4 * u, 2.1 * u, -5.1 * u)
      ctx.stroke()
      ctx.fillStyle = '#0d5f52'
      ctx.beginPath()
      ctx.arc(-2.1 * u, -5.1 * u, 0.42 * u, 0, 6.283)
      ctx.arc(2.1 * u, -5.1 * u, 0.42 * u, 0, 6.283)
      ctx.fill()
      const wing = (dir, fillCol) => {
        ctx.save()
        ctx.translate(dir * 4 * u, -0.3 * u)
        ctx.rotate(dir * flap * 0.5)
        ctx.fillStyle = fillCol || 'rgba(190,240,255,0.5)'
        ctx.strokeStyle = 'rgba(150,220,240,0.65)'
        ctx.lineWidth = 0.22 * u
        ctx.beginPath()
        ctx.ellipse(dir * 1.5 * u, 0, 2.1 * u, 1.15 * u, 0, 0, 6.283)
        ctx.fill()
        ctx.stroke()
        ctx.restore()
      }
      wing(-1)
      wing(1)
      const grad = ctx.createLinearGradient(0, -3 * u, 0, 3 * u)
      grad.addColorStop(0, '#4df0d3')
      grad.addColorStop(1, '#17a88e')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.ellipse(0, 0, 2.2 * u, 3.1 * u, 0, 0, 6.283)
      ctx.fill()
      ctx.strokeStyle = '#0d5f52'
      ctx.lineWidth = 0.28 * u
      ctx.stroke()
      ctx.fillStyle = 'rgba(6,40,34,0.45)'
      ctx.beginPath()
      ctx.ellipse(0, 1.2 * u, 1.4 * u, 0.55 * u, 0, 0, 6.283)
      ctx.ellipse(0, 2.2 * u, 1 * u, 0.4 * u, 0, 0, 6.283)
      ctx.fill()
      ctx.fillStyle = '#04251f'
      ctx.beginPath()
      ctx.arc(-0.75 * u, -1.5 * u, 0.4 * u, 0, 6.283)
      ctx.arc(0.75 * u, -1.5 * u, 0.4 * u, 0, 6.283)
      ctx.fill()
      if (g.flash > 0) {
        ctx.globalAlpha = Math.min(1, g.flash)
        wing(-1, '#ffffff')
        wing(1, '#ffffff')
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.ellipse(0, 0, 2.2 * u, 3.1 * u, 0, 0, 6.283)
        ctx.fill()
        ctx.globalAlpha = 1
      }
      ctx.restore()
      ctx.font = emojiFont(9 * u)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(g.emoji, g.x, g.y + 9.5 * u + Math.sin(now * 0.0025 + g.t) * 0.5 * u)
    }

    const wingPath = (dir) => {
      ctx.beginPath()
      ctx.moveTo(dir * 1.3 * u, -0.4 * u)
      ctx.lineTo(dir * 4.5 * u, 2.7 * u)
      ctx.lineTo(dir * 4.2 * u, 3.3 * u)
      ctx.lineTo(dir * 1.1 * u, 2.6 * u)
      ctx.closePath()
    }
    const bodyPath = () => {
      ctx.beginPath()
      ctx.moveTo(0, -4.8 * u)
      ctx.quadraticCurveTo(1.5 * u, -2.2 * u, 1.35 * u, 1.4 * u)
      ctx.lineTo(0.95 * u, 3.5 * u)
      ctx.lineTo(-0.95 * u, 3.5 * u)
      ctx.lineTo(-1.35 * u, 1.4 * u)
      ctx.quadraticCurveTo(-1.5 * u, -2.2 * u, 0, -4.8 * u)
      ctx.closePath()
    }

    const drawShip = () => {
      const bob = Math.sin(now * 0.003) * (reduced ? 0.3 : 0.6) * u
      drawSprite(SPR.glows.gold, me.x, me.y + bob, me.r * 4.6, 0, 0.5)
      ctx.save()
      ctx.translate(me.x, me.y + bob)
      ctx.rotate(me.bank)
      const fl = (reduced ? 2.4 : 2.6 + Math.sin(now * 0.03) * 0.9 + Math.random() * 0.5) * u
      const fg = ctx.createLinearGradient(0, 2 * u, 0, 2.2 * u + fl)
      fg.addColorStop(0, 'rgba(255,190,60,0.95)')
      fg.addColorStop(0.6, 'rgba(255,110,30,0.8)')
      fg.addColorStop(1, 'rgba(255,60,20,0)')
      ctx.fillStyle = fg
      ctx.beginPath()
      ctx.moveTo(-1.05 * u, 2.1 * u)
      ctx.lineTo(1.05 * u, 2.1 * u)
      ctx.lineTo(0, 2.2 * u + fl)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = 'rgba(255,240,180,0.9)'
      ctx.beginPath()
      ctx.moveTo(-0.45 * u, 2.1 * u)
      ctx.lineTo(0.45 * u, 2.1 * u)
      ctx.lineTo(0, 2.1 * u + fl * 0.55)
      ctx.closePath()
      ctx.fill()
      const shapes = (wingFill, bodyFill) => {
        ctx.fillStyle = wingFill
        wingPath(-1)
        ctx.fill()
        wingPath(1)
        ctx.fill()
        ctx.fillStyle = bodyFill
        bodyPath()
        ctx.fill()
      }
      const wg = ctx.createLinearGradient(-4.5 * u, 0, 4.5 * u, 0)
      wg.addColorStop(0, '#c98a1a')
      wg.addColorStop(0.5, '#ffd35a')
      wg.addColorStop(1, '#c98a1a')
      const bg2 = ctx.createLinearGradient(0, -4.8 * u, 0, 3.5 * u)
      bg2.addColorStop(0, '#eef3ff')
      bg2.addColorStop(0.55, '#b9c8ee')
      bg2.addColorStop(1, '#8fa5d8')
      shapes(wg, bg2)
      ctx.strokeStyle = 'rgba(25,38,80,0.7)'
      ctx.lineWidth = 0.25 * u
      bodyPath()
      ctx.stroke()
      ctx.fillStyle = '#19c8ae'
      ctx.beginPath()
      ctx.ellipse(0, -1.7 * u, 0.55 * u, 1.15 * u, 0, 0, 6.283)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.75)'
      ctx.beginPath()
      ctx.ellipse(-0.15 * u, -2.1 * u, 0.2 * u, 0.45 * u, 0, 0, 6.283)
      ctx.fill()
      if (shipFlash > 0) {
        ctx.globalAlpha = Math.min(1, shipFlash)
        shapes('#ffffff', '#ffffff')
        ctx.globalAlpha = 1
      }
      ctx.restore()
      if (muzzle > 0) {
        const a = muzzle / 0.07
        const mx = me.x
        const my = me.y + bob - 5 * u
        drawSprite(SPR.glows.gold, mx, my, 4.2 * u, 0, a * 0.9)
        ctx.globalAlpha = a
        ctx.fillStyle = '#fff6d8'
        ctx.beginPath()
        ctx.arc(mx, my, (0.5 + (1 - a) * 0.5) * u, 0, 6.283)
        ctx.fill()
        ctx.globalAlpha = 1
      }
      const frac = Math.min(1, collected / goal)
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'rgba(255,255,255,0.16)'
      ctx.lineWidth = 0.8 * u
      ctx.beginPath()
      ctx.arc(me.x, me.y + bob, me.r + 2.6 * u, 0, 6.283)
      ctx.stroke()
      if (frac > 0) {
        ctx.strokeStyle = '#ffd35a'
        ctx.lineWidth = 0.9 * u
        ctx.shadowColor = 'rgba(255,190,60,0.8)'
        ctx.shadowBlur = 2 * u
        ctx.beginPath()
        ctx.arc(me.x, me.y + bob, me.r + 2.6 * u, -Math.PI / 2, -Math.PI / 2 + frac * 6.283)
        ctx.stroke()
        ctx.shadowBlur = 0
      }
    }

    const drawBullets = () => {
      if (!bullets.length) return
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#ffe173'
      ctx.lineWidth = 0.75 * u
      ctx.shadowColor = 'rgba(255,205,80,0.9)'
      ctx.shadowBlur = 1.4 * u
      ctx.beginPath()
      for (let i = 0; i < bullets.length; i++) {
        const b = bullets[i]
        ctx.moveTo(b.x, b.y)
        ctx.lineTo(b.x, b.y + 2.8 * u)
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    const drawReds = () => {
      for (let i = 0; i < reds.length; i++) {
        const r = reds[i]
        drawSprite(SPR.glows.red, r.x, r.y, 4.5 * u, 0, 0.75)
        ctx.strokeStyle = 'rgba(255,77,94,0.35)'
        ctx.lineWidth = 0.5 * u
        ctx.beginPath()
        ctx.moveTo(r.x, r.y - 3.5 * u)
        ctx.lineTo(r.x, r.y)
        ctx.stroke()
        ctx.fillStyle = '#ff4d5e'
        ctx.beginPath()
        ctx.arc(r.x, r.y, 1.25 * u, 0, 6.283)
        ctx.fill()
      }
    }

    const drawFlyers = () => {
      if (!flyers.length) return
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      for (let i = 0; i < flyers.length; i++) {
        const f = flyers[i]
        const t = f.t
        const it = 1 - t
        const cx2 = (f.sx + f.ex) / 2
        const cy2 = Math.min(f.sy, f.ey) - 10 * u
        const x = it * it * f.sx + 2 * it * t * cx2 + t * t * f.ex
        const y = it * it * f.sy + 2 * it * t * cy2 + t * t * f.ey
        const s = (9 - 4.6 * t) * u
        drawSprite(SPR.glows.gold, x, y, s * 1.7, 0, 0.6)
        ctx.font = emojiFont(s)
        ctx.fillText(f.emoji, x, y)
      }
    }

    const drawSlots = () => {
      const sy = slotY()
      for (let i = 0; i < goal; i++) {
        const x = slotX(i)
        if (i < collected && slotEmoji[i]) {
          drawSprite(SPR.glows.gold, x, sy, 7.5 * u, 0, 0.7)
          ctx.fillStyle = 'rgba(255,205,110,0.14)'
          ctx.beginPath()
          ctx.arc(x, sy, 3 * u, 0, 6.283)
          ctx.fill()
          ctx.strokeStyle = 'rgba(255,211,90,0.9)'
          ctx.lineWidth = 0.4 * u
          ctx.beginPath()
          ctx.arc(x, sy, 3 * u, 0, 6.283)
          ctx.stroke()
          ctx.font = emojiFont(4.2 * u)
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.shadowColor = 'rgba(255,200,80,0.9)'
          ctx.shadowBlur = 2 * u
          ctx.fillText(slotEmoji[i], x, sy + 0.2 * u)
          ctx.shadowBlur = 0
        } else {
          ctx.fillStyle = 'rgba(8,12,30,0.55)'
          ctx.beginPath()
          ctx.arc(x, sy, 3 * u, 0, 6.283)
          ctx.fill()
          ctx.strokeStyle = 'rgba(255,255,255,0.28)'
          ctx.lineWidth = 0.3 * u
          ctx.beginPath()
          ctx.arc(x, sy, 3 * u, 0, 6.283)
          ctx.stroke()
        }
      }
    }

    const render = () => {
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, w, h)
      ctx.save()
      if (shake > 0) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake)

      const ns = Math.min(w, h) * 1.5
      ctx.globalAlpha = 0.14 + 0.03 * Math.sin(now * 0.0005)
      ctx.drawImage(SPR.glows.violet, w / 2 - ns / 2, h * 0.35 - ns / 2, ns, ns)
      ctx.globalAlpha = 0.08 + 0.02 * Math.sin(now * 0.0004 + 2)
      ctx.drawImage(SPR.glows.teal, w / 2 - ns * 0.35, h * 0.35 - ns * 0.3, ns * 0.7, ns * 0.7)
      ctx.globalAlpha = 1

      drawField()
      for (let i = 0; i < bugs.length; i++) drawBug(bugs[i])
      drawBullets()
      drawReds()

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i]
        if (p.life <= 0) continue
        const a = p.life / p.max
        ctx.globalAlpha = a * 0.9
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (0.4 + 0.6 * a), 0, 6.283)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      drawFlyers()
      drawShip()
      drawSlots()

      ctx.textAlign = 'center'
      for (let i = 0; i < texts.length; i++) {
        const t = texts[i]
        if (t.life <= 0) continue
        const a = Math.min(1, (t.life / t.max) * 1.8)
        ctx.globalAlpha = a
        ctx.font = `${t.wgt} ${t.size}px Lora, Georgia, serif`
        ctx.strokeStyle = 'rgba(5,8,20,0.85)'
        ctx.lineWidth = 0.8 * u
        ctx.strokeText(t.str, t.x, t.y)
        ctx.fillStyle = t.col
        ctx.fillText(t.str, t.x, t.y)
      }
      ctx.globalAlpha = 1
      ctx.restore()

      ctx.drawImage(SPR.vigDark, 0, 0, w, h)
      if (hitFlash > 0) {
        ctx.globalAlpha = Math.min(1, hitFlash * 1.4)
        ctx.drawImage(SPR.vigRed, 0, 0, w, h)
        ctx.globalAlpha = 1
      }
      if (won && !reduced) {
        const wf = clamp((warp - 0.7) / 0.3, 0, 1)
        if (wf > 0) {
          ctx.globalAlpha = wf
          ctx.drawImage(SPR.vigGold, 0, 0, w, h)
          ctx.globalAlpha = 1
        }
      }
    }

    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      let dt = (t - last) / 1000
      last = t
      if (dt <= 0) return
      dt = Math.min(dt, 0.05)
      now = t
      updateWorld(dt, dt)
      render()
    }

    const move = (e) => {
      const r = c.getBoundingClientRect()
      const off = e.pointerType === 'touch' ? 60 : 0
      const xm = me.r + 1.5 * u
      me.tx = clamp(e.clientX - r.left, xm, w - xm)
      me.ty = clamp(e.clientY - r.top - off, me.r + 2 * u, h - 12 * u)
    }

    const vis = () => {
      last = performance.now()
    }

    size()
    raf = requestAnimationFrame(loop)
    window.addEventListener('resize', size)
    document.addEventListener('visibilitychange', vis)
    c.addEventListener('pointermove', move)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      document.removeEventListener('visibilitychange', vis)
      c.removeEventListener('pointermove', move)
    }
  }, [goal])

  return (
    <canvas
      ref={ref}
      className="game-canvas"
      aria-label="Galaxy mini-game: move to steer the ship and shoot bugs to collect instruments"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }}
    />
  )
}
