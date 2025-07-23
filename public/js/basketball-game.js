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
        "https://cdn.jsdelivr.net/npm/phaser@3.87.0/dist/phaser.min.js";
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
          .setOrigin(0.8)
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
        const backboardScale = 0.35 * this.scaleFactor;
        const backboardImage = this.add
          .image(backboardX, backboardY, "backboard")
          .setOrigin(0.615, 0.25)
          .setScale(backboardScale);
        
        // Calculate backboard's actual dimensions and position hoop consistently
        const backboardWidth = backboardImage.width * backboardScale;
        const backboardHeight = backboardImage.height * backboardScale;
        const backboardLeftEdge = backboardX - (backboardWidth * 0.615); // Account for origin
        const backboardTopEdge = backboardY - (backboardHeight * 0.25); // Account for origin
        
        // Position hoop at 1/3 of backboard width and consistent height relative to backboard
        const hoopX = backboardLeftEdge + (backboardWidth / 2);
        const hoopY = backboardTopEdge + (backboardHeight * 0.55); // 60% down from top of backboard

        // Ball (create after backboard but before rim)
        const ballSize = H * 0.125;
        const handOffset = -75 * playerScale;
        this.ball = this.physics.add
          .image(this.shootPos.x, this.shootPos.y + handOffset, "ball")
          .setDisplaySize(ballSize, ballSize)
          // .setOrigin(0.5, 0.5)
          .setCircle(ballSize, 175,175)
          .setBounce(0.65)
          // .setImmovable(true)
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
        const hoopData = this.buildHoop(hoopX, hoopY);
        this.irons = hoopData.irons;
        this.middleSensor = hoopData.middleSensor;
        // this.scoreSensor = hoopData.scoreSensor;
        this.rimY = hoopData.rimTop;

        // Ground (create after hoop)
        this.ground = this.add.rectangle(W / 2, H - 50, W, 20).setOrigin(0.5);
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
          const power = Math.min(dist * 7, 1100); // Unified scaling factor and max

          this.ball.body.setAllowGravity(true);
          this.ball.setImmovable(false);
          this.ball.setVelocity((dx / dist) * power, (-dy / dist) * power);

          this.shot = this.canScore = true;
          this.bounceCount = 0;
        });
      }

      setupCollisions() {
        this.physics.add.collider(this.ball, this.irons);

        this.physics.add.overlap(this.ball, this.middleSensor, () => {
          if (this.canScore && this.ball.body.velocity.y > 0) {
            this.canScore = false;
            this.score += 2;
            this.scoreTxt.setText(`Score: ${this.score}`);
            this.animateSwish(); // Animate swish on score
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
        const RIM_RADIUS = 8 * f;
        const HOOP_WIDTH = 100 * f;
        const SENSOR_THICKNESS = 4 * f;
        const HALF_WIDTH = HOOP_WIDTH / 2;

        // Create two rim circles using graphics objects for proper circular collision
        const irons = this.physics.add.staticGroup();
        
        // Create left rim circle (transparent)
        const leftRimGraphics = this.add.circle(x - HALF_WIDTH, y, RIM_RADIUS, 0x000000, 0);
        this.physics.add.existing(leftRimGraphics, true);
        leftRimGraphics.body.setCircle(RIM_RADIUS);
        irons.add(leftRimGraphics);
        
        // Create right rim circle (transparent)
        const rightRimGraphics = this.add.circle(x + HALF_WIDTH, y, RIM_RADIUS, 0x000000, 0);
        this.physics.add.existing(rightRimGraphics, true);
        rightRimGraphics.body.setCircle(RIM_RADIUS);
        irons.add(rightRimGraphics);

        // Create one middle sensor for the hoop opening (transparent, full width)
        const middleSensor = this.physics.add.staticGroup();
        const middle = middleSensor.create(x, y + RIM_RADIUS, undefined);
        middle.setSize(HOOP_WIDTH - 2 * RIM_RADIUS, SENSOR_THICKNESS);
        middle.setVisible(false);

        // Create rim and net at the same base position
        const rimY = y;
        this.createHoopStructure(x, rimY, HOOP_WIDTH, RIM_RADIUS);
        this.createRealisticNet(x, rimY, HOOP_WIDTH - 2 * RIM_RADIUS);

        return {
          irons,
          middleSensor: middleSensor,
          rimTop: rimY,
        };
      }

      createHoopStructure(x, y, width, rimRadius) {
        const f = this.scaleFactor;
        const rimThickness = 4.8 * f; // 1.2 times thicker (4 * 1.2 = 4.8)
        
        // Create simple linear basketball rim (no curves)
        const rimGraphics = this.add.graphics();
        rimGraphics.lineStyle(rimThickness, 0xff6600, 1);
        rimGraphics.beginPath();
        
        // Draw a simple straight horizontal line
        rimGraphics.moveTo(x - width/2, y);
        rimGraphics.lineTo(x + width/2, y);
        
        rimGraphics.strokePath();
      }

      createRealisticNet(x, y, width) {
        const f = this.scaleFactor;
        const netHeight = 40 * f;
        const netWidth = width;
        const lineSpacing = 3 * f;
        const netColor = 0x424242;
        const netAlpha = 0.9;

        // Create net container positioned exactly at the rim level
        this.net = this.add.container(x, y);

        // Draw vertical net lines starting from rim level
        const numLines = Math.floor(netWidth / lineSpacing);
        this.netLines = [];

        for (let i = 0; i <= numLines; i++) {
          const lineX = (i * lineSpacing) - (netWidth / 2);
          const line = this.add.graphics();
          line.lineStyle(1.5 * f, netColor, netAlpha);
          
          // Draw net line starting exactly from rim level
          line.beginPath();
          line.moveTo(lineX, 0);
          
          // Create realistic curve for each line (narrowing at bottom)
          for (let j = 1; j <= 8; j++) {
            const yPos = (j / 8) * netHeight;
            const progress = j / 8;
            // Curve that narrows the net at the bottom
            const curveOffset = Math.sin(progress * Math.PI) * 2 * f;
            const narrowing = progress * 0.4;
            const adjustedX = lineX * (1 - narrowing) + curveOffset;
            line.lineTo(adjustedX, yPos);
          }
          
          line.strokePath();
          this.net.add(line);
          this.netLines.push(line);
        }

        // Add horizontal lines for net texture
        const horizontalLines = 6;
        for (let i = 1; i <= horizontalLines; i++) {
          const lineY = (i / horizontalLines) * netHeight;
          const progress = i / horizontalLines;
          const lineWidth = netWidth * (1 - progress * 0.4);
          
          const line = this.add.graphics();
          line.lineStyle(0.8 * f, netColor, netAlpha * 0.7);
          line.beginPath();
          line.moveTo(-lineWidth / 2, lineY);
          line.lineTo(lineWidth / 2, lineY);
          line.strokePath();
          this.net.add(line);
        }

        // Add net bottom with realistic gathering
        const bottomLine = this.add.graphics();
        bottomLine.lineStyle(2 * f, netColor, netAlpha);
        bottomLine.beginPath();
        bottomLine.moveTo(-netWidth * 0.15, netHeight);
        bottomLine.lineTo(netWidth * 0.15, netHeight);
        bottomLine.strokePath();
        this.net.add(bottomLine);
      }

      animateSwish() {
        if (!this.net || !this.netLines) return;

        // Get ball position and velocity for realistic rim-based animation
        const ballX = this.ball.x;
        const ballY = this.ball.y;
        const ballVelX = this.ball.body.velocity.x;
        const ballVelY = this.ball.body.velocity.y;
        const ballSpeed = Math.sqrt(ballVelX * ballVelX + ballVelY * ballVelY);

        // Calculate where ball hits the rim (horizontal position)
        const rimX = this.net.x;
        const rimY = this.net.y;
        const rimWidth = this.netLines.length * 3 * this.scaleFactor;
        const rimLeft = rimX - rimWidth / 2;
        const rimRight = rimX + rimWidth / 2;
        
        // Determine rim contact point
        let rimContactX = ballX;
        if (ballX < rimLeft) rimContactX = rimLeft;
        if (ballX > rimRight) rimContactX = rimRight;
        
        // Calculate distance from rim contact point
        const distanceFromContact = Math.abs(ballX - rimContactX);
        const maxInfluence = 30 * this.scaleFactor;

        // Realistic net animation based on ball trajectory and rim contact
        this.netLines.forEach((line, index) => {
          const lineX = rimX + (index * 3 * this.scaleFactor) - (this.netLines.length * 1.5 * this.scaleFactor);
          const distanceFromLine = Math.abs(rimContactX - lineX);
          
          if (distanceFromLine < maxInfluence) {
            // Calculate realistic movement based on ball trajectory
            const influence = 1 - (distanceFromLine / maxInfluence);
            const baseForce = ballSpeed * 0.005 * influence;
            
            // Horizontal movement based on ball direction
            const horizontalForce = (ballVelX / ballSpeed) * baseForce * 3;
            
            // Vertical movement based on ball hitting rim
            const verticalForce = Math.abs(ballVelY / ballSpeed) * baseForce * 2;
            
            // Apply realistic cloth movement
            this.tweens.add({
              targets: line,
              x: line.x + horizontalForce,
              y: line.y + verticalForce,
              duration: 120,
              ease: 'Sine.easeOut',
              onComplete: () => {
                // Spring back with realistic bounce
                this.tweens.add({
                  targets: line,
                  x: line.x - horizontalForce * 0.6,
                  y: line.y - verticalForce * 0.4,
                  duration: 180,
                  ease: 'Sine.easeInOut',
                  onComplete: () => {
                    // Final settling with slight oscillation
                    this.tweens.add({
                      targets: line,
                      x: line.x + horizontalForce * 0.2,
                      y: line.y + verticalForce * 0.1,
                      duration: 150,
                      ease: 'Sine.easeInOut',
                      onComplete: () => {
                        // Last settling motion
                        this.tweens.add({
                          targets: line,
                          x: line.x - horizontalForce * 0.1,
                          y: line.y - verticalForce * 0.05,
                          duration: 100,
                          ease: 'Sine.easeInOut'
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });

        // Overall net movement based on ball impact
        const netInfluence = 1 - (distanceFromContact / (rimWidth / 2));
        const overallPushX = (ballVelX / ballSpeed) * netInfluence * 1.5;
        
        this.tweens.add({
          targets: this.net,
          x: this.net.x + overallPushX,
          duration: 150,
          ease: 'Sine.easeOut',
          onComplete: () => {
            this.tweens.add({
              targets: this.net,
              x: this.net.x - overallPushX * 0.5,
              duration: 200,
              ease: 'Sine.easeInOut',
              onComplete: () => {
                this.tweens.add({
                  targets: this.net,
                  x: this.net.x + overallPushX * 0.2,
                  duration: 150,
                  ease: 'Sine.easeInOut'
                });
              }
            });
          }
        });
      }

      drawTraj(dx, dy) {
        this.traj.clear();

        const dist = Math.max(Math.hypot(dx, dy), 1);
        const power = Math.min(dist * 0.2, 1000);

        let vx = (dx / dist) * power;
        let vy = (-dy / dist) * power;
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
        arcade: { gravity: { x: 0, y: 250 }, debug: false },
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
