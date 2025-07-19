"use client";

import { useEffect, useRef, useState } from "react";

interface BasketballGameProps {
	className?: string;
}

/* ───────── helper ───────── */
const getScaleFactor = (w: number, h: number) => {
	const SHORT = Math.min(w, h);
	const REF = 600; // tweak to taste
	return Math.max(0.5, Math.min(SHORT / REF, 1));
};

/* ───────── React wrapper ───────── */
let P: any;

export default function BasketballGame({ className }: BasketballGameProps) {
	const holder = useRef<HTMLDivElement>(null);
	const game = useRef<any>(null);
	const [boot, setBoot] = useState(false);
	useEffect(() => setBoot(true), []);

	useEffect(() => {
		if (!boot || !holder.current || game.current) return;

		// Cache DOM reference
		const holderElement = holder.current;

		const size = () => {
			const r = holderElement.getBoundingClientRect();
			return {
				w: Math.max(r.width || innerWidth, 320),
				h: Math.max(r.height || innerHeight, 480),
			};
		};
		const { w, h } = size();

		import("phaser").then((Ph) => {
			P = Ph;
			game.current = new P.Game({
				type: P.CANVAS, // Use Canvas for better performance on mobile
				parent: holderElement,
				width: w,
				height: h,
				backgroundColor: "#000",
				scale: { mode: P.Scale.RESIZE, autoCenter: P.Scale.CENTER_BOTH },
				physics: { default: "arcade", arcade: { gravity: { y: 250 } } },
				scene: { preload, create, update },
				// Performance optimizations
				render: {
					pixelArt: false,
					antialias: false, // Disable antialiasing for better performance
				},
			});

			// Cache resize function
			const onResize = () => {
				const { w, h } = size();
				game.current.scale.resize(w, h);

				/* rescale persistent sprites */
				if (player && ball) {
					const f = getScaleFactor(w, h);
					player.setScale((h * 0.25) / 477);
					const s = h * 0.06;
					ball.setDisplaySize(s, s);
				}
			};

			// Use passive listeners for better performance
			addEventListener("resize", onResize, { passive: true });
			addEventListener("orientationchange", onResize, { passive: true });
		});

		return () => {
			game.current?.destroy(true);
			game.current = null;
		};
	}, [boot]);

	return boot ? (
		<div
			ref={holder}
			className={`w-full h-full ${className ?? ""}`}
			style={{ width: "100vw", height: "100dvh", overflow: "hidden" }}
		/>
	) : (
		<div className="flex items-center justify-center h-full" style={{ height: "100dvh" }}>
			Loading…
		</div>
	);
}

/* ───────── Scene‑scope stuff ───────── */
let player: any, ball: any, traj: any, scoreTxt: any, ballTween: any;
let irons: any, frontSensor: any, middleSensor: any, scoreSensor: any;
let ground: any; // Cache ground reference

let shootPos = { x: 0, y: 0 };
let releaseY = 0;
let start = { x: 0, y: 0 };

let dragging = false, shot = false, canScore = false;
let bounceCount = 0, resetting = false, score = 0, rimY = 0, scaleFactor = 1;

// Cache frequently used values
let lastTrajUpdate = 0;
const TRAJ_UPDATE_INTERVAL = 16; // ~60fps
const RESET_DELAY = 150;
const FADE_DURATION = 250;

/* ───────── preload ───────── */
function preload(this: any) {
	// Load assets with optimized settings
	this.load.image("ball", "/assets/basketball.png");
	this.load.image("background", "/assets/background.png");
	this.load.image("backboard", "/assets/backboard.png");
	this.load.spritesheet("player", "/assets/player-dribble-sheet.png", {
		frameWidth: 1280 / 4,
		frameHeight: 477,
	});
}

/* ───────── create ───────── */
function create(this: any) {
	const { width: W, height: H } = this.scale;
	scaleFactor = getScaleFactor(W, H);

	shootPos = { x: W * 0.28, y: H - 90 * scaleFactor };

	/* background */
	this.add.image(W / 2, H / 2, "background").setDisplaySize(W, H).setOrigin(0.5);

	/* player anim */
	this.anims.create({
		key: "dribble",
		frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
		frameRate: 8,
		repeat: -1,
	});

	/* player sprite */
	const playerScale = (H * 0.25) / 477;
	player = this.add
		.sprite(shootPos.x, shootPos.y, "player")
		.setOrigin(0.75)
		.setScale(playerScale)
		.play("dribble");

	/* ball */
	const ballSize = H * 0.06;
	const handOffset = -75 * playerScale;
	ball = this.physics.add
		.image(shootPos.x, shootPos.y + handOffset, "ball")
		.setDisplaySize(ballSize, ballSize)
		.setCircle(ballSize / 2)
		.setBounce(0.65)
		.setImmovable(true)
		.setGravityY(1000);
	releaseY = ball.y;

	ball.body.setEnable(false);
	ballTween = this.tweens.add({
		targets: ball,
		y: releaseY + 100 * scaleFactor,
		yoyo: true,
		duration: 600,
		repeat: -1,
		ease: "Sine.easeInOut",
	});

	/* score text */
	scoreTxt = this.add.text(20, 20, "Score: 0", {
		fontSize: `${28 * scaleFactor}px`,
		color: "#fff",
	});

	traj = this.add.graphics();

	/* ground */
	ground = this.add.rectangle(W / 2, H + 10, W, 20).setOrigin(0.5);
	this.physics.add.existing(ground, true);

	/* hoop */
	({ irons, frontSensor, middleSensor, scoreSensor, rimTop: rimY } = buildHoop(
		this,
		W * 0.7,
		H * 0.27,
		scaleFactor
	));

	/* ───── input ───── */
	this.input.on("pointerdown", (p: any) => {
		if (resetting || shot || !ballTween) return;

		ballTween.stop();
		ballTween = null;

		dragging = true;
		start = { x: p.x, y: p.y };

		ball.body.setEnable(true).setAllowGravity(false);
		ball.setVelocity(0).setImmovable(true).setPosition(shootPos.x, releaseY);
	});

	this.input.on("pointermove", (p: any) => {
		if (!dragging) return;
		
		// Optimize trajectory updates
		const now = performance.now();
		if (now - lastTrajUpdate < TRAJ_UPDATE_INTERVAL) return;
		lastTrajUpdate = now;
		
		drawTraj.call(this, p.x - start.x, start.y - p.y);
	});

	this.input.on("pointerup", (p: any) => {
		if (!dragging) return;
		dragging = false;
		traj.clear();

		const dx = p.x - start.x,
			dy = start.y - p.y;
		const dist = Math.max(Math.hypot(dx, dy), 1);
		const power = Math.min(dist * 35, 1300);

		ball.body.setAllowGravity(true);
		ball.setImmovable(false);
		ball.setVelocity((dx / dist) * power, (-dy / dist) * power);

		shot = canScore = true;
		bounceCount = 0;
	});

	/* ───── collisions ───── */
	this.physics.add.collider(ball, irons);

	this.physics.add.overlap(ball, frontSensor, () => {
		if (ball.body.velocity.y > 0 && ball.y < rimY) {
			ball.setVelocity(ball.body.velocity.x * 0.8, -ball.body.velocity.y * 0.6);
		}
	});

	this.physics.add.overlap(ball, middleSensor, () => {
		if (canScore && ball.body.velocity.y > 0) {
			canScore = false;
			score += 2;
			scoreTxt.setText(`Score: ${score}`);
		}
	});

	this.physics.add.collider(ball, ground, () => {
		if (!shot || resetting) return;

		bounceCount++;

		if (bounceCount === 1) {
			resetting = true;
			ball.setBounce(0.3);

			this.time.delayedCall(RESET_DELAY, () => {
				this.tweens.add({
					targets: ball,
					alpha: 0,
					duration: FADE_DURATION,
					onComplete: () => {
						ballTween?.stop();
						ballTween = null;
						ball.body.setEnable(false);
						ball.setVelocity(0).setPosition(shootPos.x, releaseY).setAlpha(1);

						shot = resetting = false;
						canScore = false;

						ballTween = this.tweens.add({
							targets: ball,
							y: releaseY + 100 * scaleFactor,
							yoyo: true,
							duration: 600,
							repeat: -1,
							ease: "Sine.easeInOut",
						});
					},
				});
			});
		}
	});
}

/* ───────── update ───────── */
function update(this: any) {
	// Early return if no shot in progress
	if (!shot) return;

	const { width: W, height: H } = this.scale;
	
	// Only check bounds if ball is way out
	if (ball.y > H + 200 || ball.x < -200 || ball.x > W + 200) {
		ballTween?.stop();
		ballTween = null;
		ball.body.setEnable(false);
		ball.setVelocity(0).setPosition(shootPos.x, releaseY).setAlpha(1);
		shot = resetting = canScore = false;

		ballTween = this.tweens.add({
			targets: ball,
			y: releaseY + 100 * scaleFactor,
			yoyo: true,
			duration: 600,
			repeat: -1,
			ease: "Sine.easeInOut",
		});
	}
}

/* ───────── hoop helper ───────── */
function buildHoop(scene: any, x: number, y: number, f: number) {
	const IRON = 10 * f,
		INNER = 150 * f,
		HALF = INNER / 2;

	const irons = scene.physics.add.staticGroup();
	irons.create(x - HALF, y, undefined).setCircle(IRON);
	irons.create(x + HALF, y, undefined).setCircle(IRON);

	const front = scene.add.zone(x, y, INNER - IRON * 2, IRON);
	const middle = scene.add.zone(x, y + IRON, INNER - IRON * 2, 4);
	const score = scene.add.zone(x, y + IRON + 15 * f, INNER - 16 * f, 6);
	scene.physics.add.existing(front, true);
	scene.physics.add.existing(middle, true);
	scene.physics.add.existing(score, true);

	scene.add
		.image(x + 50 * f, y, "backboard")
		.setOrigin(0.615, 0.25)
		.setScale(0.5 * f);

	scene.add.ellipse(x, y, INNER + IRON, IRON, 0xff6600).setStrokeStyle(2 * f, 0xcc5500);
	scene.add.ellipse(x, y, INNER - 1, IRON - 1, 0xff6600).setStrokeStyle(1, 0xcc5500);

	return {
		irons,
		frontSensor: front,
		middleSensor: middle,
		scoreSensor: score,
		rimTop: y,
	};
}

/* ───────── trajectory preview ───────── */
function drawTraj(this: any, dx: number, dy: number) {
	traj.clear();

	const dist = Math.max(Math.hypot(dx, dy), 1);
	const power = Math.min(dist * 0.25, 1200);

	let vx = (dx / dist) * power;
	let vy = (-dy / dist) * power * 1.1;
	let x = ball.x,
		y = ball.y;

	const dt = 1 / 60,
		g = 350,
		dots = 20;

	for (let i = 0; i < dots; i++) {
		vx *= 0.995;
		vy += g * dt;
		x += vx * dt * 60;
		y += vy * dt * 60;

		traj.fillStyle(
			i > dots * 0.8 ? 0xff6600 : i > dots * 0.5 ? 0xffff00 : 0x00ff00
		);
		traj.fillCircle(x, y, 3);

		const { width: W, height: H } = this.scale;
		if (y > H || x < 0 || x > W) break;
	}
}
