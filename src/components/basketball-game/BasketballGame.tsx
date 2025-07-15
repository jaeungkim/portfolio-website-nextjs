'use client'

import { useEffect, useRef, useState } from 'react'
import type Phaser from 'phaser'

interface BasketballGameProps { className?: string }

let P: typeof Phaser

export default function BasketballGame({ className }: BasketballGameProps) {
  const holder = useRef<HTMLDivElement>(null)
  const gRef = useRef<any>(null)
  const [ok, setOk] = useState(false)
  useEffect(() => setOk(true), [])

  useEffect(() => {
    if (!ok || !holder.current || gRef.current) return

    const getGameSize = () => {
      const container = holder.current!
      const rect = container.getBoundingClientRect()
      return {
        width: Math.max(rect.width, 320),
        height: Math.max(rect.height, 480),
      }
    }

    import('phaser').then((Ph) => {
      P = Ph.default ?? (Ph as any)
      const { width, height } = getGameSize()

      gRef.current = new P.Game({
        type: P.AUTO,
        parent: holder.current,
        width,
        height,
        backgroundColor: '#87CEEB',
        scale: {
          mode: P.Scale.FIT,
          autoCenter: P.Scale.CENTER_BOTH,
          width,
          height,
        },
        physics: {
          default: 'matter',
          matter: { gravity: { x: 0, y: 1 }, debug: false },
        },
        scene: { preload, create, update },
      })

      const handleResize = () => {
        if (gRef.current) {
          const { width: newWidth, height: newHeight } = getGameSize()
          gRef.current.scale.resize(newWidth, newHeight)
        }
      }

      window.addEventListener('resize', handleResize)
      window.addEventListener('orientationchange', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('orientationchange', handleResize)
      }
    })

    return () => gRef.current?.destroy(true)
  }, [ok])

  return ok ? (
    <div ref={holder} className={`w-full h-full min-h-[480px] max-h-screen ${className ?? ''}`} style={{ height: '100dvh' }} />
  ) : (
    <div className="flex items-center justify-center h-full min-h-[480px] max-h-screen" style={{ height: '100dvh' }}>
      <span>Loading…</span>
    </div>
  )
}

/* ————— game‑wide refs ————— */
let ball: any, traj: any, scoreTxt: any
let frontSensor: any, scoreSensor: any, rimY = 0
let dragging = false, canScore = false, shot = false, score = 0
let start = { x: 0, y: 0 }

/* ————— assets ————— */
function preload(this: any) {
  const g = this.add.graphics()
  g.fillStyle(0xff6600).fillCircle(16, 16, 16)
  g.lineStyle(2, 0x000000).strokeCircle(16, 16, 16)
  g.generateTexture('ball', 32, 32); g.destroy()

  const p = this.add.graphics()
  p.lineStyle(4, 0x000000).strokeCircle(15, 12, 6)
  p.lineBetween(15, 18, 15, 42)
  p.lineBetween(5, 28, 25, 28)
  p.lineBetween(15, 42, 8, 58)
  p.lineBetween(15, 42, 22, 58)
  p.generateTexture('player', 30, 60); p.destroy()
}

/* ————— create ————— */
function create(this: any) {
  const { width: W, height: H } = this.scale
  const M = (P.Physics.Matter as any).Matter
  const shootPos = { x: W * 0.25, y: H - 85 }

  this.add.graphics().fillStyle(0x8b4513).fillRect(0, H - 20, W, 20)

  const world = this.matter.world
  world.add([
    M.Bodies.rectangle(W / 2, H - 10, W, 20, { isStatic: true }),
    M.Bodies.rectangle(-10, H / 2, 20, H, { isStatic: true }),
    M.Bodies.rectangle(W + 10, H / 2, 20, H, { isStatic: true })
  ])

  ;({ frontSensor, scoreSensor, rimTop: rimY } = buildHoop(this, W * 0.72, H * 0.32))

  this.add.image(shootPos.x, shootPos.y + 38, 'player')
  ball = this.matter.add.image(shootPos.x, shootPos.y, 'ball')
    .setCircle(16)
    .setBounce(0.65)
    .setFrictionAir(0.005)

  scoreTxt = this.add.text(20, 20, 'Score: 0', { fontSize: '24px', fontStyle: 'bold' })
  traj = this.add.graphics()

  this.input.on('pointerdown', (p: any) => {
    dragging = true
    start = { x: p.x, y: p.y }
    ball.setPosition(shootPos.x, shootPos.y)
    ball.setVelocity(0, 0)
    ball.setStatic(true)
  })

  this.input.on('pointermove', (p: any) => {
    if (!dragging) return
    const dx = p.x - start.x
    const dy = start.y - p.y
    drawTraj.call(this, dx, dy)
  })

  this.input.on('pointerup', (p: any) => {
    if (!dragging) return
    dragging = false
    traj.clear()
    ball.setStatic(false)

    const dx = p.x - start.x
    const dy = start.y - p.y
    const powerScale = 0.09

    const maxPower = 25
    const vx = Math.max(-maxPower, Math.min(maxPower, dx * powerScale))
    const vy = Math.max(-maxPower, Math.min(maxPower, dy * powerScale))
    ball.setVelocity(vx, vy)

    canScore = true
    shot = true
  })

  world.on('collisionstart', (ev: any) => {
    ev.pairs.forEach((p: any) => {
      const a = p.bodyA, b = p.bodyB

      if ((a === frontSensor || b === frontSensor) && ball.body.velocity.y > 0 && ball.y < rimY) {
        ball.setVelocity(ball.body.velocity.x * 0.5, -ball.body.velocity.y * 0.6)
      }

      if ((a === scoreSensor || b === scoreSensor) &&
        canScore && ball.body.velocity.y > 0 && ball.y < rimY + 12) {
        score += 2
        scoreTxt.setText(`Score: ${score}`)
        canScore = false
      }
    })
  })
}

/* ————— update ————— */
function update(this: any) {
  const { width: W, height: H } = this.scale
  if (!dragging && shot &&
    (ball.y > H + 60 || ball.x < -60 || ball.x > W + 60 ||
      (Math.abs(ball.body.velocity.x) < 0.05 && Math.abs(ball.body.velocity.y) < 0.05 && ball.y > H - 30))) {
    shot = false
    ball.setPosition(W * 0.25, H - 85).setVelocity(0, 0)
  }
}

/* ————— hoop helper ————— */
function buildHoop(scene: any, x: number, y: number) {
  const M = (P.Physics.Matter as any).Matter
  const half = 92 / 2, iron = 7
  const w = scene.matter.world

  w.add([
    M.Bodies.circle(x - half, y, iron, { isStatic: true, restitution: 0.6 }),
    M.Bodies.circle(x + half, y, iron, { isStatic: true, restitution: 0.6 }),
    M.Bodies.rectangle(x + 60, y, 14, 120, { isStatic: true })
  ])

  const rimSensor = M.Bodies.rectangle(x, y, 92, 6, { isStatic: true, isSensor: true })
  const scoreSens = M.Bodies.rectangle(x, y + iron + 2, 92 - 8, 4, { isStatic: true, isSensor: true })
  w.add([rimSensor, scoreSens])

  scene.add.rectangle(x + 60, y, 14, 120, 0xffffff)
  scene.add.ellipse(x, y, 92 + iron * 2, iron * 2, 0xff6600)
  const net = scene.add.graphics(); net.lineStyle(2, 0xffffff, 0.9)
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    net.lineBetween(x + Math.cos(a) * (half - 6), y + iron,
      x + Math.cos(a) * (half - 16), y + 38)
  }

  return { frontSensor: rimSensor, scoreSensor: scoreSens, rimTop: y }
}

/* ————— trajectory ————— */
function drawTraj(this: any, dx: number, dy: number) {
  traj.clear().lineStyle(3, 0x00ff00, 0.8)
  const g = 60 * 60, step = 0.05, maxT = 2
  const velocityScale = 0.09
  const vx = dx * velocityScale, vy = dy * velocityScale

  traj.beginPath().moveTo(ball.x, ball.y)
  for (let t = 0; t <= maxT; t += step) {
    const px = ball.x + vx * t
    const py = ball.y + vy * t + 0.5 * g * t * t
    if (py > this.scale.height - 20) break
    traj.lineTo(px, py)
  }
  traj.strokePath()
}