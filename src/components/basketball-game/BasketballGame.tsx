"use client";

import { useEffect, useRef, useState } from "react";
import type Phaser from "phaser";

interface BasketballGameProps {
  className?: string;
}

let P: typeof Phaser;

export default function BasketballGame({ className }: BasketballGameProps) {
  const holder = useRef<HTMLDivElement>(null);
  const gRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready || !holder.current || gRef.current) return;

    const size = () => {
      const r = holder.current!.getBoundingClientRect();
      return { width: Math.max(r.width, 320), height: Math.max(r.height, 480) };
    };

    import("phaser").then((Ph) => {
      P = Ph.default ?? (Ph as any);
      const { width, height } = size();

      gRef.current = new P.Game({
        type: P.AUTO,
        parent: holder.current,
        width,
        height,
        backgroundColor: "#87CEEB",
        scale: {
          mode: P.Scale.FIT,
          autoCenter: P.Scale.CENTER_BOTH,
          width,
          height,
        },
        physics: {
          default: "matter",
          matter: { gravity: { x: 0, y: 1 }, debug: false },
        },
        scene: { preload, create, update },
      });

      const resize = () => {
        const { width, height } = size();
        gRef.current.scale.resize(width, height);
      };
      window.addEventListener("resize", resize);
      window.addEventListener("orientationchange", resize);
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("orientationchange", resize);
      };
    });

    return () => gRef.current?.destroy(true);
  }, [ready]);

  return ready ? (
    <div
      ref={holder}
      className={`w-full h-full min-h-[480px] max-h-screen ${className ?? ""}`}
      style={{ height: "100dvh" }}
    />
  ) : (
    <div
      className="flex items-center justify-center h-full min-h-[480px] max-h-screen"
      style={{ height: "100dvh" }}
    >
      <span>Loading…</span>
    </div>
  );
}

/* ───────────────────────── helpers ───────────────────────── */
let ball: any, traj: any, scoreTxt: any;
let frontSensor: any,
  scoreSensor: any,
  rimY = 0,
  shootPos: { x: number; y: number };
let dragging = false,
  canScore = false,
  shot = false,
  score = 0;
let start = { x: 0, y: 0 };

/* ---------------- assets ---------------- */
function preload(this: any) {
  const g = this.add.graphics();
  g.fillStyle(0xff6600).fillCircle(16, 16, 16);
  g.lineStyle(2, 0x000000).strokeCircle(16, 16, 16);
  g.generateTexture("ball", 32, 32);
  g.destroy();

  const p = this.add.graphics();
  p.lineStyle(4, 0x000000).strokeCircle(15, 12, 6);
  p.lineBetween(15, 18, 15, 42);
  p.lineBetween(5, 28, 25, 28);
  p.lineBetween(15, 42, 8, 58);
  p.lineBetween(15, 42, 22, 58);
  p.generateTexture("player", 30, 60);
  p.destroy();
}

/* ---------------- create ---------------- */
function create(this: any) {
  const { width: W, height: H } = this.scale;
  const M = (P.Physics.Matter as any).Matter;
  shootPos = { x: W * 0.25, y: H - 85 };

  this.add
    .graphics()
    .fillStyle(0x8b4513)
    .fillRect(0, H - 20, W, 20);
  this.matter.world.add([
    M.Bodies.rectangle(W / 2, H - 10, W, 20, { isStatic: true }),
    M.Bodies.rectangle(-10, H / 2, 20, H, { isStatic: true }),
    M.Bodies.rectangle(W + 10, H / 2, 20, H, { isStatic: true }),
  ]);
  ({
    frontSensor,
    scoreSensor,
    rimTop: rimY,
  } = buildHoop(this, W * 0.72, H * 0.32));

  this.add.image(shootPos.x, shootPos.y + 38, "player");
  ball = this.matter.add
    .image(shootPos.x, shootPos.y, "ball")
    .setCircle(16)
    .setBounce(0.65)
    .setFrictionAir(0.005);

  scoreTxt = this.add.text(20, 20, "Score: 0", {
    fontSize: "24px",
    fontStyle: "bold",
  });
  traj = this.add.graphics();

  /* ----- drag & shoot ----- */
  this.input.on("pointerdown", (p: any) => {
    dragging = true;
    start = { x: p.x, y: p.y };
    ball.setPosition(shootPos.x, shootPos.y).setVelocity(0, 0).setStatic(true);
  });

  this.input.on("pointermove", (p: any) => {
    if (!dragging) return;
    const dx = p.x - start.x; // right  +
    const dy = start.y - p.y; // up     +
    drawTraj.call(this, dx, dy);
  });

  this.input.on("pointerup", (p: any) => {
    if (!dragging) return;
    dragging = false;
    traj.clear();
    ball.setStatic(false);

    const dx = p.x - start.x;
    const dy = start.y - p.y;

    // Enhanced power calculation with more vertical responsiveness
    const dragDistance = Math.sqrt(dx * dx + dy * dy);
    const POWER = 0.02 + dragDistance * 0.0005; // balanced base power requiring more drag
    const MAX_V = 35; // reasonable velocity cap

    // Give more weight to vertical drag for realistic basketball physics
    const verticalMultiplier = 2.0; // balanced boost for vertical component
    const vx = P.Math.Clamp(dx * POWER, -MAX_V, MAX_V);
    const vy = P.Math.Clamp(-dy * POWER * verticalMultiplier, -MAX_V, MAX_V);

    ball.setVelocity(vx, vy);

    canScore = true;
    shot = true;
  });

  /* ----- collisions ----- */
  this.matter.world.on("collisionstart", (ev: any) => {
    ev.pairs.forEach((pair: any) => {
      const a = pair.bodyA,
        b = pair.bodyB;

      if (
        (a === frontSensor || b === frontSensor) &&
        ball.body.velocity.y > 0 &&
        ball.y < rimY
      )
        ball.setVelocity(
          ball.body.velocity.x * 0.5,
          -ball.body.velocity.y * 0.6
        );

      if (
        (a === scoreSensor || b === scoreSensor) &&
        canScore &&
        ball.body.velocity.y > 0 &&
        ball.y < rimY + 12
      ) {
        score += 2;
        scoreTxt.setText(`Score: ${score}`);
        canScore = false;
      }
    });
  });
}

/* ---------------- update ---------------- */
function update(this: any) {
  const { width: W, height: H } = this.scale;
  if (
    !dragging &&
    shot &&
    (ball.y > H + 60 ||
      ball.x < -60 ||
      ball.x > W + 60 ||
      (Math.abs(ball.body.velocity.x) < 0.05 &&
        Math.abs(ball.body.velocity.y) < 0.05 &&
        ball.y > H - 30))
  ) {
    shot = false;
    ball.setPosition(shootPos.x, shootPos.y).setVelocity(0, 0);
  }
}

/* ---------------- hoop helper ---------------- */
function buildHoop(scene: any, x: number, y: number) {
  const M = (P.Physics.Matter as any).Matter;
  const half = 92 / 2,
    iron = 7;
  const w = scene.matter.world;

  w.add([
    M.Bodies.circle(x - half, y, iron, { isStatic: true, restitution: 0.6 }),
    M.Bodies.circle(x + half, y, iron, { isStatic: true, restitution: 0.6 }),
    M.Bodies.rectangle(x + 60, y, 14, 120, { isStatic: true }),
  ]);

  const rimSensor = M.Bodies.rectangle(x, y, 92, 6, {
    isStatic: true,
    isSensor: true,
  });
  const scoreSensor = M.Bodies.rectangle(x, y + iron + 2, 92 - 8, 4, {
    isStatic: true,
    isSensor: true,
  });
  w.add([rimSensor, scoreSensor]);

  scene.add.rectangle(x + 60, y, 14, 120, 0xffffff);
  scene.add.ellipse(x, y, 92 + iron * 2, iron * 2, 0xff6600);
  const net = scene.add.graphics();
  net.lineStyle(2, 0xffffff, 0.9);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    net.lineBetween(
      x + Math.cos(a) * (half - 6),
      y + iron,
      x + Math.cos(a) * (half - 16),
      y + 38
    );
  }
  return { frontSensor: rimSensor, scoreSensor, rimTop: y };
}

/* ---------------- trajectory preview ---------------- */
function drawTraj(this: any, dx: number, dy: number) {
  traj.clear();

  // Enhanced power calculation matching the launch calculation
  const dragDistance = Math.sqrt(dx * dx + dy * dy);
  const POWER = 0.02 + dragDistance * 0.0005;
  const MAX_V = 35;
  const verticalMultiplier = 2.0;

  const vx0 = P.Math.Clamp(dx * POWER, -MAX_V, MAX_V);
  const vy0 = P.Math.Clamp(-dy * POWER * verticalMultiplier, -MAX_V, MAX_V);

  // Calculate visual power for dot spacing (normalize between 0-1)
  const visualPower = Math.min(dragDistance / 200, 1);

  // Adaptive dot spacing: closer dots for weak shots, further for strong shots
  const baseSteps = 2 + visualPower * 4; // 2-6 physics steps per dot
  const maxDots = Math.floor(12 + visualPower * 8); // 12-20 dots total

  const dt = 1 / 60;
  const gravity = 1;

  let x = ball.x;
  let y = ball.y;
  let vx = vx0;
  let vy = vy0;
  let initialY = ball.y;
  let stepCount = 0;

  // Draw dots for basketball arc with adaptive spacing
  for (let i = 0; i < maxDots; i++) {
    // Apply physics steps based on power (more steps = further spacing)
    const stepsThisDot = Math.floor(baseSteps);
    for (let j = 0; j < stepsThisDot; j++) {
      vx *= 0.995; // air friction
      vy *= 0.995;
      vy += gravity * dt * 60; // gravity
      x += vx;
      y += vy;
      stepCount++;
    }

    // Dynamic dot size based on power
    const dotSize = 1.5 + visualPower * 1.5; // 1.5-3px radius

    // Color gradient based on power (green to yellow to red)
    let color = 0x00ff00; // green for weak
    if (visualPower > 0.3) color = 0xffff00; // yellow for medium
    if (visualPower > 0.7) color = 0xff6600; // orange for strong

    traj.fillStyle(color);
    traj.fillCircle(x, y, dotSize);

    // Stop showing dots after reaching peak and falling back to initial height
    // This shows only the "shooting arc" not the full trajectory
    if (i > 4 && y >= initialY) break;

    // Don't show trajectory if it goes too far off screen
    const { width: W, height: H } = this.scale;
    if (x < -50 || x > W + 50 || y > H + 50) break;
  }
}
