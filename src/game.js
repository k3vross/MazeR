import Stage from "./stage";
import Player from "./player";

export default class Game {
  constructor() {
    let canvas = document.getElementById("mazer-canvas");
    canvas.width = 1100;
    canvas.height = 700;
    this.startTime = 0;
    this.gameOver = false;
    this.ctx = canvas.getContext("2d");
    
    this.registerEvents();
    this.restart();
  }

  play() {
    this.running = true;
    this.startTime = Date.now();
    this.animate();
  }

  restart() {
    this.running = false;
    this.stage = new Stage();
    this.player = new Player();
    this.animate();
  }

  registerEvents() {
    this.boundClickHandler = this.click.bind(this);
    window.addEventListener("mousedown", this.boundClickHandler);
    this.music = document.getElementById("music");
    this.musicBtn = document.getElementById("music-btn");
    this.musicEvent = this.handleMusic.bind(this);
    this.musicBtn.addEventListener("click", this.musicEvent);
  }

  click(e) {
    if (!this.running) {    
      this.play();
      let winScreen = document.getElementsByClassName("win-modal")[0];
      winScreen.classList.remove("is-open");
    }
  }

  checkWin() {
    if (this.player.xPos > 1026 && this.player.yPos < 56 && this.player.level === 1) {
      let winScreen = document.getElementsByClassName('win-modal')[0];
      winScreen.classList.add("is-open");
      this.running = false;
      this.restart()
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, 1100, 700);
    this.checkWin();
    this.checkBottomCollision();
    this.checkLeftCollision();
    this.checkRightCollision();
    this.checkTopCollision();
    this.stage.animate(this.ctx);
    this.player.animate(this.ctx);
    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  checkBottomCollision() {
    let leftX = this.player.xPos;
    let rightX = this.player.xPos + 15;
    let bottomY = this.player.yPos + 15;

    if (
      this.stage.level[Math.floor(bottomY / 25)][Math.floor(rightX / 25)] === 1
      ||
      this.stage.level[Math.floor(bottomY / 25)][Math.floor(leftX / 25)] === 1
    ) {
      this.player.collision.bottom = true;
      this.player.yPos = this.player.prevYPos;
      this.onGround = true;
    } else {
      this.player.collision.bottom = false;
    }
  }

  checkLeftCollision() {
    let leftX = this.player.xPos - 4;
    let topY = this.player.yPos;
    let bottomY = this.player.yPos + 15;

    if (
      this.stage.level[Math.floor(bottomY / 25)][Math.floor(leftX / 25)] === 1 
      ||
      this.stage.level[Math.floor(topY / 25)][Math.floor(leftX / 25)] === 1
    ) {
      this.player.collision.left = true;
    //   this.player.xPos = this.player.prevXPos;
    //   this.player.keys[37] = false
    } else {
      this.player.collision.left = false;
    }
  }

  checkRightCollision() {
    let topY = this.player.yPos;
    let rightX = this.player.xPos + 19;
    let bottomY = this.player.yPos + 15;

    if (
      this.stage.level[Math.floor(bottomY / 25)][Math.floor(rightX / 25)] === 1
      ||
      this.stage.level[Math.floor(topY / 25)][Math.floor(rightX / 25)] === 1
    ) {
      this.player.collision.right = true;
    //   this.player.xPos = this.player.prevXPos;
    //   this.player.keys[39] = false;
    } else {
      this.player.collision.right = false;
    }
  }

  checkTopCollision() {
    let leftX = this.player.xPos;
    let topY = this.player.yPos - 3;
    let rightX = this.player.xPos + 15;

    if (
      this.stage.level[Math.floor(topY / 25)][Math.floor(rightX / 25)] === 1 
      ||
      this.stage.level[Math.floor(topY / 25)][Math.floor(leftX / 25)] === 1
    ) {
      this.player.collision.top = true;
    } else {
      this.player.collision.top = false;
    }
  }

  handleMusic(e) {
        e.preventDefault()
        if (this.musicBtn.classList.contains('fa-volume-mute')) {
            this.music.play();
            this.musicBtn.classList.remove('fa-volume-mute')
            this.musicBtn.classList.add('fa-volume-up')
        } else if (this.musicBtn.classList.contains('fa-volume-up')) {
            this.music.pause();
            this.musicBtn.classList.remove('fa-volume-up')
            this.musicBtn.classList.add('fa-volume-mute')
        }
    }
}