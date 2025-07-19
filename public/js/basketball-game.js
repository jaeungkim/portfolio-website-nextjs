class BasketballGame {
  constructor(containerId) {
    this.containerId = containerId;
    this.game = null;
    this.init();
  }

  async init() {
    await this.loadPhaser();
    this.createGame();
  }

  async loadPhaser() {
    return new Promise((resolve) => {
      if (typeof Phaser !== "undefined") {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js";
      script.onload = () => resolve();
      script.onerror = () => {
        console.error("Failed to load Phaser from CDN");
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  createGame() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    // Define the scene class after Phaser is loaded
    class BasketballScene extends Phaser.Scene {
      constructor() {
        super({ key: "BasketballScene" });

        // Game state
        this.shootPos = { x: 0, y: 0 };
        this.releaseY = 0;
        this.start = { x: 0, y: 0 };
        this.dragging = false;
        this.shot = false;
        this.canScore = false;
        this.bounceCount = 0;
        this.resetting = false;
        this.score = 0;
        this.rimY = 0;
        this.scaleFactor = 1;

        // Game objects
        this.player = null;
        this.ball = null;
        this.traj = null;
        this.scoreTxt = null;
        this.ballTween = null;
        this.irons = null;
        this.frontSensor = null;
        this.middleSensor = null;
        this.scoreSensor = null;
        this.ground = null;

        // Performance constants
        this.lastTrajUpdate = 0;
        this.TRAJ_UPDATE_INTERVAL = 16;
        this.RESET_DELAY = 150;
        this.FADE_DURATION = 250;
      }

      getScaleFactor(w, h) {
        const SHORT = Math.min(w, h);
        const REF = 600;
        return Math.max(0.5, Math.min(SHORT / REF, 1));
      }

      preload() {
        this.load.image("ball", "/assets/basketball.png");
        this.load.image("background", "/assets/background2.png");
        this.load.image("backboard", "/assets/backboard3.png");
        this.load.spritesheet("player", "/assets/player-dribble-sheet.png", {
          frameWidth: 1280 / 4,
          frameHeight: 477,
        });
      }

      create() {
        const { width: W, height: H } = this.scale;
        this.scaleFactor = this.getScaleFactor(W, H);
        this.shootPos = { x: W * 0.28, y: H - 90 * this.scaleFactor };

        // Background
        this.add
          .image(W / 2, H / 2, "background")
          .setDisplaySize(W, H)
          .setOrigin(0.5);

        // Player animation
        this.anims.create({
          key: "dribble",
          frames: this.anims.generateFrameNumbers("player", {
            start: 0,
            end: 3,
          }),
          frameRate: 8,
          repeat: -1,
        });

        // Player sprite
        const playerScale = (H * 0.25) / 477;
        this.player = this.add
          .sprite(this.shootPos.x, this.shootPos.y, "player")
          .setOrigin(0.75)
          .setScale(playerScale)
          .play("dribble");

        // Score text
        this.scoreTxt = this.add.text(20, 20, "Score: 0", {
          fontSize: `${28 * this.scaleFactor}px`,
          color: "#fff",
        });

        this.traj = this.add.graphics();

        // Backboard (create first so it appears behind everything)
        const backboardX = W * 0.7 + 50 * this.scaleFactor;
        const backboardY = H * 0.27;
        this.add
          .image(backboardX, backboardY, "backboard")
          .setOrigin(0.615, 0.25)
          .setScale(0.35 * this.scaleFactor);

        // Ball (create after backboard but before rim)
        const ballSize = H * 0.08;
        const handOffset = -75 * playerScale;
        this.ball = this.physics.add
          .image(this.shootPos.x, this.shootPos.y + handOffset, "ball")
          .setDisplaySize(ballSize, ballSize)
          .setCircle(ballSize / 2)
          .setBounce(0.65)
          .setImmovable(true)
          .setGravityY(1000);
        this.releaseY = this.ball.y;

        this.ball.body.setEnable(false);
        this.ballTween = this.tweens.add({
          targets: this.ball,
          y: this.releaseY + 100 * this.scaleFactor,
          yoyo: true,
          duration: 600,
          repeat: -1,
          ease: "Sine.easeInOut",
        });

        // Hoop & Rim (create last so they appear in front of ball)
        const hoopData = this.buildHoop(W * 0.71, H * 0.375);
        this.irons = hoopData.irons;
        this.frontSensor = hoopData.frontSensor;
        this.middleSensor = hoopData.middleSensor;
        this.scoreSensor = hoopData.scoreSensor;
        this.rimY = hoopData.rimTop;

        // Ground (create after hoop)
        this.ground = this.add.rectangle(W / 2, H + 10, W, 20).setOrigin(0.5);
        this.physics.add.existing(this.ground, true);

        // Input handlers
        this.setupInput();

        // Collisions
        this.setupCollisions();
      }

      setupInput() {
        this.input.on("pointerdown", (p) => {
          if (this.resetting || this.shot || !this.ballTween) return;

          this.ballTween.stop();
          this.ballTween = null;

          this.dragging = true;
          this.start = { x: p.x, y: p.y };

          this.ball.body.setEnable(true).setAllowGravity(false);
          this.ball
            .setVelocity(0)
            .setImmovable(true)
            .setPosition(this.shootPos.x, this.releaseY);
        });

        this.input.on("pointermove", (p) => {
          if (!this.dragging) return;

          const now = performance.now();
          if (now - this.lastTrajUpdate < this.TRAJ_UPDATE_INTERVAL) return;
          this.lastTrajUpdate = now;

          this.drawTraj(p.x - this.start.x, this.start.y - p.y);
        });

        this.input.on("pointerup", (p) => {
          if (!this.dragging) return;
          this.dragging = false;
          this.traj.clear();

          const dx = p.x - this.start.x;
          const dy = this.start.y - p.y;
          const dist = Math.max(Math.hypot(dx, dy), 1);
          const power = Math.min(dist * 325, 1200);

          this.ball.body.setAllowGravity(true);
          this.ball.setImmovable(false);
          this.ball.setVelocity((dx / dist) * power, (-dy / dist) * power);

          this.shot = this.canScore = true;
          this.bounceCount = 0;
        });
      }

      setupCollisions() {
        this.physics.add.collider(this.ball, this.irons);

        this.physics.add.overlap(this.ball, this.frontSensor, () => {
          if (this.ball.body.velocity.y > 0 && this.ball.y < this.rimY) {
            this.ball.setVelocity(
              this.ball.body.velocity.x * 0.8,
              -this.ball.body.velocity.y * 0.6
            );
          }
        });

        this.physics.add.overlap(this.ball, this.middleSensor, () => {
          if (this.canScore && this.ball.body.velocity.y > 0) {
            this.canScore = false;
            this.score += 2;
            this.scoreTxt.setText(`Score: ${this.score}`);
          }
        });

        this.physics.add.collider(this.ball, this.ground, () => {
          if (!this.shot || this.resetting) return;

          this.bounceCount++;

          if (this.bounceCount === 1) {
            this.resetting = true;
            this.ball.setBounce(0.3);

            this.time.delayedCall(this.RESET_DELAY, () => {
              this.tweens.add({
                targets: this.ball,
                alpha: 0,
                duration: this.FADE_DURATION,
                onComplete: () => {
                  if (this.ballTween) {
                    this.ballTween.stop();
                    this.ballTween = null;
                  }
                  this.ball.body.setEnable(false);
                  this.ball
                    .setVelocity(0)
                    .setPosition(this.shootPos.x, this.releaseY)
                    .setAlpha(1);

                  this.shot = this.resetting = false;
                  this.canScore = false;

                  this.ballTween = this.tweens.add({
                    targets: this.ball,
                    y: this.releaseY + 100 * this.scaleFactor,
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

      update() {
        if (!this.shot) return;

        const { width: W, height: H } = this.scale;

        if (
          this.ball.y > H + 200 ||
          this.ball.x < -200 ||
          this.ball.x > W + 200
        ) {
          if (this.ballTween) {
            this.ballTween.stop();
            this.ballTween = null;
          }
          this.ball.body.setEnable(false);
          this.ball
            .setVelocity(0)
            .setPosition(this.shootPos.x, this.releaseY)
            .setAlpha(1);
          this.shot = this.resetting = this.canScore = false;

          this.ballTween = this.tweens.add({
            targets: this.ball,
            y: this.releaseY + 100 * this.scaleFactor,
            yoyo: true,
            duration: 600,
            repeat: -1,
            ease: "Sine.easeInOut",
          });
        }
      }

      buildHoop(x, y) {
        const f = this.scaleFactor;
        const IRON = 10 * f;
        const INNER = 100 * f;
        const HALF = INNER / 2;

        const irons = this.physics.add.staticGroup();
        irons.create(x - HALF, y, undefined).setCircle(IRON);
        irons.create(x + HALF, y, undefined).setCircle(IRON);

        // Create invisible collision sensors using physics bodies only
        const front = this.physics.add.staticGroup();
        const middle = this.physics.add.staticGroup();
        const score = this.physics.add.staticGroup();

        front.create(x, y, undefined).setSize(INNER - IRON * 2, IRON);
        middle.create(x, y + IRON, undefined).setSize(INNER - IRON * 2, 4);
        score
          .create(x, y + IRON + 15 * f, undefined)
          .setSize(INNER - 16 * f, 6);

        this.add
          .ellipse(x, y, INNER + IRON, IRON, 0xff6600)
          .setStrokeStyle(2 * f, 0xcc5500);
        this.add
          .ellipse(x, y, INNER - 1, IRON - 1, 0xff6600)
          .setStrokeStyle(1, 0xcc5500);

        return {
          irons,
          frontSensor: front,
          middleSensor: middle,
          scoreSensor: score,
          rimTop: y,
        };
      }

      drawTraj(dx, dy) {
        this.traj.clear();

        const dist = Math.max(Math.hypot(dx, dy), 1);
        const power = Math.min(dist * 0.25, 1200);

        let vx = (dx / dist) * power;
        let vy = (-dy / dist) * power * 1.1;
        let x = this.ball.x;
        let y = this.ball.y;

        const dt = 1 / 60;
        const g = 350;
        const dots = 20;

        for (let i = 0; i < dots; i++) {
          vx *= 0.995;
          vy += g * dt;
          x += vx * dt * 60;
          y += vy * dt * 60;

          this.traj.fillStyle(
            i > dots * 0.8 ? 0xff6600 : i > dots * 0.5 ? 0xffff00 : 0x00ff00
          );
          this.traj.fillCircle(x, y, 3);

          const { width: W, height: H } = this.scale;
          if (y > H || x < 0 || x > W) break;
        }
      }
    }

    const rect = container.getBoundingClientRect();
    const w = Math.max(rect.width || window.innerWidth, 320);
    const h = Math.max(rect.height || window.innerHeight, 480);

    const config = {
      type: Phaser.CANVAS,
      parent: container,
      width: w,
      height: h,
      backgroundColor: "#000",
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: "arcade",
        arcade: { gravity: { x: 0, y: 250 } },
      },
      render: {
        pixelArt: false,
        antialias: false,
      },
      scene: BasketballScene,
    };

    this.game = new Phaser.Game(config);

    // Handle resize
    const onResize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width || window.innerWidth, 320);
      const h = Math.max(rect.height || window.innerHeight, 480);
      this.game.scale.resize(w, h);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
  }

  destroy() {
    if (this.game) {
      this.game.destroy(true);
      this.game = null;
    }
  }
}

// Export for use in Next.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = BasketballGame;
} else if (typeof window !== "undefined") {
  window.BasketballGame = BasketballGame;
}
