"use client";

import { useEffect, useRef, useState } from "react";
import type Phaser from "phaser";
import { m } from "motion/dist/react";

interface BasketballGameProps {
  className?: string;
}
let P: typeof Phaser;

/* ─────────── React wrapper ─────────── */
export default function BasketballGame({ className }: BasketballGameProps) {
  const holder = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!ready || !holder.current || gameRef.current) return;

    const size = () => {
      const r = holder.current!.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      return { 
        w: Math.max(r.width || viewportWidth, 320), 
        h: Math.max(r.height || viewportHeight, 480) 
      };
    };
    const { w, h } = size();

    import("phaser").then((Ph) => {
      P = Ph.default ?? (Ph as any);
      gameRef.current = new P.Game({
        type: P.AUTO,
        parent: holder.current,
        width: w,
        height: h,
        backgroundColor: "#000000",
        scale: { 
          mode: P.Scale.RESIZE, 
          autoCenter: P.Scale.CENTER_BOTH,
          parent: holder.current,
          width: '100%',
          height: '100%'
        },
        physics: { default: "arcade", arcade: { gravity: { x: 0, y: 250 } } },
        scene: { preload, create, update },
      });

      const onResize = () => {
        const { w, h } = size();
        if (gameRef.current) {
          gameRef.current.scale.resize(w, h);
          gameRef.current.scale.refresh();
        }
      };
      
      // Handle orientation changes on mobile
      const onOrientationChange = () => {
        setTimeout(onResize, 100); // Small delay to ensure orientation change is complete
      };
      
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onOrientationChange);
      
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onOrientationChange);
      };
    });

    return () => gameRef.current?.destroy(true);
  }, [ready]);

  return ready ? (
    <div
      ref={holder}
      className={`w-full h-full ${className ?? ""}`}
      style={{ 
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
        position: "relative"
      }}
    />
  ) : (
    <div
      className="flex items-center justify-center h-full"
      style={{ height: "100dvh" }}
    >
      <span>Loading…</span>
    </div>
  );
}

/* ───────── Scene‑scope vars ───────── */
let player: any;
let ball: any;
let traj: any;
let scoreTxt: any;
let playerTween: any;
let ballTween: any;
let irons: any;

let shootPos: { x: number; y: number };
let releaseY: number;
let dragging = false,
  shot = false,
  canScore = false;
let start = { x: 0, y: 0 };
let score = 0,
  rimY = 0;
let frontSensor: any, middleSensor: any, scoreSensor: any;
let scaleRatio: number; // For smart scaling across devices

/* ───────── preload ───────── */
function preload(this: Phaser.Scene) {
  this.load.image("ball", "/assets/basketball.png");
  this.load.image("background", "/assets/background.png");
  this.load.image("backboard", "/assets/backboard.png");
  this.load.spritesheet("player", "/assets/player-dribble-sheet.png", {
    frameWidth: 1280 / 4,
    frameHeight: 477,
  });
}

/* ───────── create ───────── */
function create(this: Phaser.Scene) {
  const { width: W, height: H } = this.scale;
  
  // Calculate smart scale ratio based on device
  const baseWidth = 800; // Base width for scaling calculations
  const baseHeight = 600; // Base height for scaling calculations
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  // Smart scaling that accounts for DPR and screen size
  const widthRatio = W / baseWidth;
  const heightRatio = H / baseHeight;
  scaleRatio = Math.min(widthRatio, heightRatio) / Math.max(devicePixelRatio, 1);
  
  // Clamp scale ratio to reasonable bounds
  scaleRatio = Math.max(0.5, Math.min(scaleRatio, 2.0));
  
  shootPos = { x: W * 0.3, y: H - 90 };

  /* Responsive background */
  const background = this.add.image(W / 2, H / 2, "background");
  background.setDisplaySize(W, H);
  background.setOrigin(0.5, 0.5);
  // background.setAlpha(0.8); // Make background brighter and more visible

  /* dribble animation */
  this.anims.create({
    key: "dribble",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
    frameRate: 6,
    repeat: -1,
  });

  /* invisible boundaries */
  this.physics.add.staticGroup([
    this.add.rectangle(-10, H / 2, 20, H).setOrigin(0.5, 0.5),
    this.add.rectangle(W + 10, H / 2, 20, H).setOrigin(0.5, 0.5),
  ]);
  ({
    irons,
    frontSensor,
    middleSensor,
    scoreSensor,
    rimTop: rimY,
  } = buildHoop(this, W * 0.72, H * 0.32));
  
  
  

  /* player sprite */
  const SCALE = 0.75 * scaleRatio; // Scale based on device
  player = this.add
    .sprite(shootPos.x, shootPos.y, "player")
    .setOrigin(0.75, 0.75)
    .setScale(SCALE * 1.5)
    .play("dribble");
  /* physics ball */
  const HAND_Y = -75 * SCALE; // hand offset from feet
  const ballSize = 100 * scaleRatio * 1.5; // Scale ball size
  ball = this.physics.add
    .image(shootPos.x, shootPos.y + HAND_Y, "ball")
    .setDisplaySize(ballSize, ballSize)
    .setCircle(ballSize / 2)
    .setBounce(0.65)
    .setFriction(0)
    .setImmovable(true)
    .setGravityY(1000);

  releaseY = shootPos.y + HAND_Y;

  ball.body.setEnable(false);
  ballTween = this.tweens.add({
    targets: ball,
    y: releaseY + 100,
    yoyo: true,
    duration: 600,
    repeat: -1,
    ease: "Sine.easeInOut",
  });

  scoreTxt = this.add.text(20, 20, "Score: 0", { 
    fontSize: `${56 * scaleRatio}px`,
    color: "#ffffff"
  });
  traj = this.add.graphics();

  /* ───── input ───── */
  this.input.on("pointerdown", (p) => {
    if (ballTween) ballTween.stop();
    dragging = true;
    start = { x: p.x, y: p.y };
    ball.body.setEnable(true);
    ball.body.setAllowGravity(false);
    ball.setVelocity(0, 0);
    ball.setImmovable(true);
    ball.setPosition(shootPos.x, releaseY);
  });

  let lastTrajUpdate = 0;
  this.input.on("pointermove", (p) => {
    if (dragging && Date.now() - lastTrajUpdate > 16) {
      // ~60fps
      drawTraj.call(this, p.x - start.x, start.y - p.y);
      lastTrajUpdate = Date.now();
    }
  });

  this.input.on("pointerup", (p) => {
    if (!dragging) return;
    dragging = false;
    traj.clear();
    ball.body.enable = true;
    ball.body.setAllowGravity(true);
    ball.setImmovable(false);
    ball.setFriction(0);

    const dx = p.x - start.x;
    const dy = start.y - p.y;
    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
    const power = Math.min(distance * 35, 1300);

    const vx = (dx / distance) * power;
    const vy = (-dy / distance) * power;

    ball.setVelocity(vx, vy);
    canScore = shot = true;
  });

/* ─ collisions ─ */
this.physics.add.collider(ball, irons);              // side irons stop the ball
  
// manual bounce when ball grazes underside of rim sensor
this.physics.add.overlap(ball, frontSensor, () => {
  if (ball.body.velocity.y > 0 && ball.y < rimY) {
    ball.setVelocity(ball.body.velocity.x * 0.5, -ball.body.velocity.y * 0.6);
  }
});

// detect when ball goes through the hoop
this.physics.add.overlap(ball, middleSensor, () => {
  if (canScore && ball.body.velocity.y > 0) {
    canScore = false;
    scoreTxt.setText(`Score: ${(score += 2)}`);
  }
});
}

/* ───────── update ───────── */
function update(this: Phaser.Scene) {
  const { width: W, height: H } = this.scale;
  const stopped =
    Math.abs(ball.body.velocity.x) < 0.05 &&
    Math.abs(ball.body.velocity.y) < 0.05 &&
    ball.y > shootPos.y - 50;

      if (shot && (ball.y > H + 60 || ball.x < -60 || ball.x > W + 60 || stopped)) {
      shot = false;
      ball.body.setEnable(false);
      ball.setPosition(shootPos.x, releaseY);
      
      // Always create a new tween instead of trying to restart
      ballTween = this.tweens.add({
        targets: ball,
        y: releaseY + 100,
        yoyo: true,
        duration: 600,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
    }
}


/* ───────── hoop helper (Realistic basketball hoop) ───────── */
function buildHoop(scene: Phaser.Scene, x: number, y: number) {
  const IRON = 10 * scaleRatio;          // rim thickness (scaled)
  const INNER = 150 * scaleRatio;        // clear opening (scaled)
  const HALF = INNER / 2;

  /* solid left / right irons (tiny circles) */
  const irons = scene.physics.add.staticGroup();
  irons.create(x - HALF, y, undefined).setCircle(IRON).setOrigin(0.5);
  irons.create(x + HALF, y, undefined).setCircle(IRON).setOrigin(0.5);

  /* front‑rim strip — SENSOR, not collider */
  const frontSensor = scene.add.zone(x, y, INNER - IRON * 2, IRON);
  scene.physics.add.existing(frontSensor, true);

  /* middle hoop sensor - detects when ball goes through the rim */
  const middleSensor = scene.add.zone(x, y + IRON + 8, INNER - IRON * 2, 4);
  scene.physics.add.existing(middleSensor, true);

  /* score strip much lower, also sensor */
  const scoreSensor = scene.add.zone(x, y + IRON + 15, INNER - 16, 6);
  scene.physics.add.existing(scoreSensor, true);

  /* Backboard asset */
  const backboard = scene.add.image(x + 50, y, "backboard");
  backboard.setOrigin(0.615, 0.25);
  backboard.setScale(0.75 * scaleRatio); // Scale backboard based on device
  
  /* Rim with realistic details */
  const rim = scene.add.ellipse(x, y, INNER + IRON, IRON, 0xff6600);
  rim.setStrokeStyle(3, 0xcc5500);
  
  // Rim inner edge (thicker rim effect)
  const rimInner = scene.add.ellipse(x, y, INNER - 1, IRON - 1, 0xff6600);
  rimInner.setStrokeStyle(1, 0xcc5500);
  
  // Rim mounting brackets
  const bracket = scene.add.graphics();
  bracket.lineStyle(2, 0x444444);
  
  // Left bracket
  bracket.lineBetween(x + 50, y, x + 20, y);
  bracket.lineBetween(x + 20, y, x + 20, y - 6);
  bracket.lineBetween(x + 20, y - 6, x + 17, y - 6);
  bracket.lineBetween(x + 17, y - 6, x + 17, y + 6);
  bracket.lineBetween(x + 17, y + 6, x + 20, y + 6);
  bracket.lineBetween(x + 20, y + 6, x + 20, y);
  
  // Right bracket
  bracket.lineBetween(x + 50, y, x + 20, y);
  bracket.lineBetween(x + 20, y, x + 20, y - 6);
  bracket.lineBetween(x + 20, y - 6, x + 17, y - 6);
  bracket.lineBetween(x + 17, y - 6, x + 17, y + 6);
  bracket.lineBetween(x + 17, y + 6, x + 20, y + 6);
  bracket.lineBetween(x + 20, y + 6, x + 20, y);

  return { irons, frontSensor, middleSensor, scoreSensor, rimTop: y };
}

/* ───────── trajectory preview ───────── */
function drawTraj(this: any, dx: number, dy: number) {
  traj.clear();
  const distance = Math.sqrt(dx * dx + dy * dy) || 1;
  const power = Math.min(distance * 0.25, 1200);

  const vx0 = (dx / distance) * power;
  const vy0 = (-dy / distance) * power * 1.1;

  const maxDots = 20;
  const dt = 1 / 60;
  const gravity = 350;

  let x = ball.x;
  let y = ball.y;
  let vx = vx0;
  let vy = vy0;

  for (let i = 0; i < maxDots; i++) {
    vx *= 0.995;
    vy += gravity * dt;
    x += vx * dt * 60;
    y += vy * dt * 60;

    const dotSize = 3;
    let color = 0x00ff00;
    if (i > maxDots * 0.5) color = 0xffff00;
    if (i > maxDots * 0.8) color = 0xff6600;

    traj.fillStyle(color);
    traj.fillCircle(x, y, dotSize);

    const { width: W, height: H } = this.scale;
    if (x < -50 || x > W + 50 || y > H + 50) break;
  }
}
