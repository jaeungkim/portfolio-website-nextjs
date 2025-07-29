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
        this.gameStarted = false;
        this.gameEnded = false;

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
        this.load.image("backboard", "/assets/backboard6.png");
        this.load.image("hoop", "/assets/hoop3.png");
        this.load.spritesheet("player", "/assets/player-dribble-sheet.png", {
          frameWidth: 1280 / 4,
          frameHeight: 477,
        });
        
        // Load digital font CSS - add to head directly
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/css/digital-font.css';
        document.head.appendChild(link);
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

        // Score text (will be positioned after backboard is created)
        this.scoreTxt = null;

        // Backboard (create first so it appears behind everything)
        const backboardX = W * 0.7 + 50 * this.scaleFactor;
        const backboardY = H * 0.27;
        const backboardScale = 0.25 * this.scaleFactor;
                const backboardImage = this.add
          .image(backboardX, backboardY, "backboard")
          .setOrigin(0.615, 0.25)
          .setScale(backboardScale);
        
        // Calculate backboard's actual dimensions and position hoop consistently
        const backboardWidth = backboardImage.width * backboardScale;
        const backboardHeight = backboardImage.height * backboardScale;
        const backboardLeftEdge = backboardX - backboardWidth * 0.615; // Account for origin
        const backboardTopEdge = backboardY - backboardHeight * 0.25; // Account for origin
        
        // Create scoreboard billboard on top of backboard
        const scoreboardX = backboardX;
        const scoreboardY = backboardY - backboardHeight * 0.6; // Position closer to top of backboard
        
        // Create scoreboard background (more like NBA scoreboard)
        const scoreboardBg = this.add.rectangle(
          scoreboardX, 
          scoreboardY, 
          backboardWidth * 0.9, 
          80 * this.scaleFactor, // Increased height from 50 to 80
          0x1a1a1a, 
          0.95
        );
        scoreboardBg.setStrokeStyle(4 * this.scaleFactor, 0x333333);
        
        // Store scoreboard position for updates
        this.scoreboardY = scoreboardY;
        
        // Create digital LED scoreboard with proper font - wait for CSS to load
        this.time.delayedCall(100, () => {
          this.createDigitalScoreboard(scoreboardX, scoreboardY);
        });

        // Position hoop at 1/3 of backboard width and consistent height relative to backboard
        const hoopX = backboardLeftEdge + backboardWidth / 2.07;
        const hoopY = backboardTopEdge + backboardHeight * 0.605; // 60% down from top of backboard

        // Ball (create after backboard but before rim)
        const ballSize = H * 0.125;
        const handOffset = -75 * playerScale;
        this.ball = this.physics.add
          .image(this.shootPos.x, this.shootPos.y + handOffset, "ball")
          .setDisplaySize(ballSize, ballSize)
          // .setOrigin(0.5, 0.5)
          .setCircle(ballSize, 175, 175)
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
        
        // Disable ball interaction until game starts
        this.ball.body.setEnable(false);

        // Hoop & Rim (create last so they appear in front of ball)
        const hoopData = this.buildHoop(hoopX, hoopY);
        this.irons = hoopData.irons;
        this.middleSensor = hoopData.middleSensor;
        // this.scoreSensor = hoopData.scoreSensor;
        this.rimY = hoopData.rimTop;

        // Ground (create after hoop)
        this.ground = this.add.rectangle(W / 2, H - 50, W, 20).setOrigin(0.5);
        this.physics.add.existing(this.ground, true);

        this.traj = this.add.graphics();
        // Input handlers
        this.setupInput();

        // Collisions
        this.setupCollisions();
        
        // Show start screen
        this.showStartScreen();
      }

      setupInput() {
        this.input.on("pointerdown", (p) => {
          if (!this.gameStarted || this.gameEnded || this.resetting || this.shot || !this.ballTween) return;

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
            this.updateScoreDisplay(this.score);
            
            // Score celebration animations
            this.animateScore();
            
            // Check for win condition
            if (this.score >= 10) {
              this.gameEnded = true;
              this.time.delayedCall(1000, () => {
                this.showGameOverScreen();
              });
            }
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



      createDigitalScoreboard(x, y) {
        const scale = this.scaleFactor;
        
        // Create digital scoreboard text with DS-Digital font
        this.scoreTxt = this.add.text(x, y, "SCORE: 000", {
          fontSize: `${48 * scale}px`, // Increased from 40 to 48
          color: "#00ff00",
          fontStyle: "bold",
          fontFamily: "DS-Digital, 'Courier New', monospace",
          stroke: "#003300",
          strokeThickness: 2,
          shadow: {
            offsetX: 1,
            offsetY: 1,
            color: '#000000',
            blur: 0,
            fill: true
          }
        });
        this.scoreTxt.setOrigin(0.5);
        
        this.currentScore = 0;
      }

      showStartScreen() {
        const { width: W, height: H } = this.scale;
        
        // Create semi-transparent overlay
        this.startOverlay = this.add.rectangle(
          W / 2, 
          H / 2, 
          W, 
          H, 
          0x000000, 
          0.7
        );
        
        // Create title text
        this.titleText = this.add.text(
          W / 2, 
          H * 0.3, 
          "STREETBALL", 
          {
            fontSize: `${64 * this.scaleFactor}px`,
            color: "#00ff00",
            fontStyle: "bold",
            fontFamily: "DS-Digital, 'Courier New', monospace",
            stroke: "#000000",
            strokeThickness: 4
          }
        );
        this.titleText.setOrigin(0.5);
        
        // Create subtitle
        this.subtitleText = this.add.text(
          W / 2, 
          H * 0.45, 
          "First to 10 points wins!", 
          {
            fontSize: `${24 * this.scaleFactor}px`,
            color: "#ffffff",
            fontStyle: "bold",
            fontFamily: "DS-Digital, 'Courier New', monospace"
          }
        );
        this.subtitleText.setOrigin(0.5);
        
        // Create start button
        this.startButton = this.add.rectangle(
          W / 2, 
          H * 0.6, 
          200 * this.scaleFactor, 
          60 * this.scaleFactor, 
          0x00ff00, 
          0.8
        );
        this.startButton.setStrokeStyle(4, 0xffffff);
        
        // Create start button text
        this.startButtonText = this.add.text(
          W / 2, 
          H * 0.6, 
          "START GAME", 
          {
            fontSize: `${28 * this.scaleFactor}px`,
            color: "#000000",
            fontStyle: "bold",
            fontFamily: "DS-Digital, 'Courier New', monospace"
          }
        );
        this.startButtonText.setOrigin(0.5);
        
        // Make button interactive
        this.startButton.setInteractive();
        this.startButton.on('pointerdown', () => {
          this.startGame();
        });
        
        // Add hover effect
        this.startButton.on('pointerover', () => {
          this.startButton.setFillStyle(0x00ff00, 1);
        });
        this.startButton.on('pointerout', () => {
          this.startButton.setFillStyle(0x00ff00, 0.8);
        });
      }

      startGame() {
        // Remove start screen
        this.startOverlay.destroy();
        this.titleText.destroy();
        this.subtitleText.destroy();
        this.startButton.destroy();
        this.startButtonText.destroy();
        
        // Start the game
        this.gameStarted = true;
        
        // Enable ball interaction
        this.ball.body.setEnable(true);
      }

      showGameOverScreen() {
        const { width: W, height: H } = this.scale;
        
        // Create semi-transparent overlay
        this.gameOverOverlay = this.add.rectangle(
          W / 2, 
          H / 2, 
          W, 
          H, 
          0x000000, 
          0.8
        );
        
        // Create game over text
        this.gameOverText = this.add.text(
          W / 2, 
          H * 0.35, 
          "GAME OVER!", 
          {
            fontSize: `${56 * this.scaleFactor}px`,
            color: "#ff6600",
            fontStyle: "bold",
            fontFamily: "DS-Digital, 'Courier New', monospace",
            stroke: "#000000",
            strokeThickness: 4
          }
        );
        this.gameOverText.setOrigin(0.5);
        
        // Create final score text
        this.finalScoreText = this.add.text(
          W / 2, 
          H * 0.45, 
          `Final Score: ${this.score}`, 
          {
            fontSize: `${32 * this.scaleFactor}px`,
            color: "#00ff00",
            fontStyle: "bold",
            fontFamily: "DS-Digital, 'Courier New', monospace"
          }
        );
        this.finalScoreText.setOrigin(0.5);
        
        // Create restart button
        this.restartButton = this.add.rectangle(
          W / 2, 
          H * 0.6, 
          200 * this.scaleFactor, 
          60 * this.scaleFactor, 
          0x00ff00, 
          0.8
        );
        this.restartButton.setStrokeStyle(4, 0xffffff);
        
        // Create restart button text
        this.restartButtonText = this.add.text(
          W / 2, 
          H * 0.6, 
          "PLAY AGAIN", 
          {
            fontSize: `${28 * this.scaleFactor}px`,
            color: "#000000",
            fontStyle: "bold",
            fontFamily: "DS-Digital, 'Courier New', monospace"
          }
        );
        this.restartButtonText.setOrigin(0.5);
        
        // Make button interactive
        this.restartButton.setInteractive();
        this.restartButton.on('pointerdown', () => {
          this.restartGame();
        });
        
        // Add hover effect
        this.restartButton.on('pointerover', () => {
          this.restartButton.setFillStyle(0x00ff00, 1);
        });
        this.restartButton.on('pointerout', () => {
          this.restartButton.setFillStyle(0x00ff00, 0.8);
        });
      }

      restartGame() {
        // Remove game over screen
        this.gameOverOverlay.destroy();
        this.gameOverText.destroy();
        this.finalScoreText.destroy();
        this.restartButton.destroy();
        this.restartButtonText.destroy();
        
        // Reset game state
        this.score = 0;
        this.gameEnded = false;
        this.updateScoreDisplay(0);
        
        // Reset ball
        this.ball.body.setEnable(false);
        this.ball.setVelocity(0);
        this.ball.setPosition(this.shootPos.x, this.releaseY);
        this.ball.setAlpha(1);
        
        // Restart ball tween
        if (this.ballTween) {
          this.ballTween.stop();
          this.ballTween = null;
        }
        this.ballTween = this.tweens.add({
          targets: this.ball,
          y: this.releaseY + 100 * this.scaleFactor,
          yoyo: true,
          duration: 600,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
        
        // Show start screen again
        this.showStartScreen();
      }

      updateScoreDisplay(score) {
        this.currentScore = score;
        const scoreStr = score.toString().padStart(3, '0');
        this.scoreTxt.setText(`SCORE: ${scoreStr}`);
        
        // Reapply font styling after text update
        this.scoreTxt.setStyle({
          fontSize: `${48 * this.scaleFactor}px`,
          color: "#00ff00",
          fontStyle: "bold",
          fontFamily: "DS-Digital, 'Courier New', monospace",
          stroke: "#003300",
          strokeThickness: 2,
          shadow: {
            offsetX: 1,
            offsetY: 1,
            color: '#000000',
            blur: 0,
            fill: true
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
        const RIM_RADIUS = 4 * f;
        const HOOP_WIDTH = 100 * f;
        const SENSOR_THICKNESS = 4 * f;
        const HALF_WIDTH = HOOP_WIDTH / 2;

        // Create two rim circles using graphics objects for proper circular collision
        const irons = this.physics.add.staticGroup();

        // Create left rim circle (transparent)
        const leftRimGraphics = this.add.circle(
          x - HALF_WIDTH,
          y,
          RIM_RADIUS,
          0x000000,
          0
        );
        this.physics.add.existing(leftRimGraphics, true);
        leftRimGraphics.body.setCircle(RIM_RADIUS);
        irons.add(leftRimGraphics);

        // Create right rim circle (transparent)
        const rightRimGraphics = this.add.circle(
          x + HALF_WIDTH,
          y,
          RIM_RADIUS,
          0x000000,
          0
        );
        this.physics.add.existing(rightRimGraphics, true);
        rightRimGraphics.body.setCircle(RIM_RADIUS);
        irons.add(rightRimGraphics);

        // Create one middle sensor for the hoop opening (transparent, full width)
        const middleSensor = this.physics.add.staticGroup();
        const middle = middleSensor.create(x, y + RIM_RADIUS, undefined);
        middle.setSize(HOOP_WIDTH - 2 * RIM_RADIUS, SENSOR_THICKNESS);
        middle.setVisible(false);

        // Create rim at the same base position
        const rimY = y;

        // Add hoop image
        const hoopImage = this.add.image(x, rimY, "hoop");
        const hoopScale = 0.1 * this.scaleFactor;
        hoopImage.setScale(hoopScale);
        hoopImage.setOrigin(0.5, 0.25);

        return {
          irons,
          middleSensor: middleSensor,
          rimTop: rimY,
        };
      }

      animateScore() {
        const { width: W, height: H } = this.scale;
        
        // Streetball score animation - clean and authentic
        const scoreboardX = W * 0.7 + 50 * this.scaleFactor;
        const scoreboardY = H * 0.27 - (50 * this.scaleFactor) * 0.4;
        
        // 1. Create golden sparkle effect
        for (let i = 0; i < 15; i++) {
          const sparkle = this.add.circle(
            this.ball.x + (Math.random() - 0.5) * 30,
            this.ball.y + (Math.random() - 0.5) * 30,
            2,
            0xffd700, // Golden color
            0.9
          );
          
          this.tweens.add({
            targets: sparkle,
            x: sparkle.x + (Math.random() - 0.5) * 100,
            y: sparkle.y + (Math.random() - 0.5) * 100,
            alpha: 0,
            scaleX: 0.5,
            scaleY: 0.5,
            duration: 1000 + Math.random() * 500,
            ease: 'Power2',
            onComplete: () => {
              sparkle.destroy();
            }
          });
        }
        
        // 2. Create electric arc effect
        // for (let i = 0; i < 6; i++) {
        //   const arc = this.add.graphics();
        //   arc.lineStyle(3, 0x00ffff, 0.8); // Cyan color
          
        //   const startX = this.ball.x + (Math.random() - 0.5) * 20;
        //   const startY = this.ball.y + (Math.random() - 0.5) * 20;
        //   const endX = startX + (Math.random() - 0.5) * 80;
        //   const endY = startY + (Math.random() - 0.5) * 80;
          
        //   arc.beginPath();
        //   arc.moveTo(startX, startY);
        //   arc.lineTo(endX, endY);
        //   arc.strokePath();
          
        //   this.tweens.add({
        //     targets: arc,
        //     alpha: 0,
        //     duration: 400 + Math.random() * 200,
        //     ease: 'Power1',
        //     onComplete: () => {
        //       arc.destroy();
        //     }
        //   });
        // }
        
        // 3. Create score number popup
        const scorePopup = this.add.text(
          this.ball.x,
          this.ball.y - 30,
          "+2",
          {
            fontSize: `${32 * this.scaleFactor}px`,
            color: "#ff6600",
            fontStyle: "bold",
            fontFamily: "DS-Digital, 'Courier New', monospace",
            stroke: "#000000",
            strokeThickness: 3
          }
        );
        scorePopup.setOrigin(0.5);
        
        this.tweens.add({
          targets: scorePopup,
          y: scorePopup.y - 80,
          alpha: 0,
          scaleX: 1.5,
          scaleY: 1.5,
          duration: 1200,
          ease: 'Power2',
          onComplete: () => {
            scorePopup.destroy();
          }
        });
        
        // 4. Enhanced backboard and rim wobble effects
        const backboardImage = this.children.list.find(child => child.texture && child.texture.key === 'backboard');
        const hoopImage = this.children.list.find(child => child.texture && child.texture.key === 'hoop');
        
        // Backboard wobble with rotation
        if (backboardImage) {
          this.tweens.add({
            targets: backboardImage,
            x: backboardImage.x + 2,
            angle: 1,
            duration: 100,
            yoyo: true,
            repeat: 2,
            ease: 'Sine.easeInOut'
          });
        }
        
        // Rim wobble with bounce
        if (hoopImage) {
          this.tweens.add({
            targets: hoopImage,
            x: hoopImage.x + 1.5,
            y: hoopImage.y + 1,
            duration: 80,
            yoyo: true,
            repeat: 2,
            ease: 'Sine.easeInOut'
          });
        }
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
            i > dots * 0.8 ? 0xffffff : i > dots * 0.5 ? 0xffffff : 0xffffff
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
