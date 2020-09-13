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

  timer() {
    return (new Date().getTime() - this.startTime) / 1000
  }

  drawTimer() {
    this.ctx.font = "35px VT323";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.timer().toFixed(2), 25, 22);
  }

  play() {
    this.running = true;
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
    if (this.player.level === 1 && !this.running) {
      this.startTime = Date.now()
    }
    if (!this.running && !this.gameOver) {    
      let welcome = document.getElementsByClassName('welcome')[0];
      welcome.classList.add('is-closed');
      let winScreen = document.getElementsByClassName("win-modal")[0];
      winScreen.classList.remove("is-open");
      this.play();    
    }
  }

  checkNextLevel() {
    if (this.player.xPos > 1026 && this.player.yPos < 60) {
      if (this.player.level === 1) {
        this.ctx.font = "35px VT323";
        this.ctx.fillStyle = "white";
      } else if (this.player.level === 2) {
        let finalTime = (new Date().getTime() - this.startTime) / 1000
        let winscreen = document.getElementsByClassName('win-modal')[0];
        let score = document.createElement("P");
        score.class = "score-msg";
        let text = document.createTextNode(`Your final score is ${finalTime}`);
        score.appendChild(text);
        let playAgain = document.createElement("a");
        playAgain.href = 'https://k3vross.github.io/MazeR';
        let playText = document.createTextNode(`Play Again`);
        playAgain.appendChild(playText);
        winscreen.appendChild(score);
        winscreen.appendChild(playAgain);
        winscreen.classList.add('is-open');
        this.running = false;
        this.gameOver = true;
        
      }
      if (this.player.level === 1) {
        this.player.xPos = 43;
        this.player.yPos = 643
        this.player.level = 2;
      }
    }
  }

  endGame() {
    // let finalTime = (new Date().getTime() - this.startTime) / 1000
    
    // let text = document.createTextNode(`Your final score is ${finalTime}`);
    // score.appendChild(text);
    // document.getElementByClassName("win-modal")[0].appendChild(score);  
  }

  // checkWin() {
  //   if (this.player.xPos > 1026 && this.player.yPos < 56 && this.player.level === 3) {
  //     let winScreen = document.getElementsByClassName('win-modal')[0];
  //     winScreen.classList.add("is-open");
  //     this.running = false;
  //     this.restart()
  //   }
  // }

  animate() {
    this.ctx.clearRect(0, 0, 1100, 700);
    this.checkNextLevel();
    // this.checkWin();
    this.checkBottomCollision();
    this.checkLeftCollision();
    this.checkRightCollision();
    this.checkTopCollision();
    this.stage.animate(this.ctx);
    this.player.animate(this.ctx);
    console.log(this.player.collision.right, this.player.collision.bottom, this.player.collision.top)
    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
      this.drawTimer();
      if (this.player.level === 1) {
        this.ctx.font = "35px VT323";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("LEVEL 1: THIS SEEMS NORMAL", 713, 22);
      } else {
        this.ctx.font = "35px VT323";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("LEVEL 2: WHAT GOES UP MUST...STAY UP?", 560, 22);
      }
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
      if (this.player.level === 1 ) {
        this.onGround = true;
      }
    } else {
      this.player.collision.bottom = false;
    }
  }

  checkLeftCollision() {
    let leftX = this.player.xPos - 2;
    let topY = this.player.yPos;
    let bottomY = this.player.yPos + 15;

    if (
      this.stage.level[Math.floor(bottomY / 25)][Math.floor(leftX / 25)] === 1 
      ||
      this.stage.level[Math.floor(topY / 25)][Math.floor(leftX / 25)] === 1
    ) {
      this.player.collision.left = true;
      this.player.xPos = this.player.xPos + 1
    } else {
      this.player.collision.left = false;
    }
  }

  checkRightCollision() {
    let topY = this.player.yPos;
    let rightX = this.player.xPos + 17;
    let bottomY = this.player.yPos + 15;

    if (
      this.stage.level[Math.floor(bottomY / 25)][Math.floor(rightX / 25)] === 1
      ||
      this.stage.level[Math.floor(topY / 25)][Math.floor(rightX / 25)] === 1
    ) {
      this.player.collision.right = true;
      this.player.xPos = this.player.xPos - 1;
    } else {
      this.player.collision.right = false;
    }
  }

  checkTopCollision() {
    let leftX = this.player.xPos;
    let topY = this.player.yPos - 1;
    let rightX = this.player.xPos + 15;

    if (
      this.stage.level[Math.floor(topY / 25)][Math.floor(rightX / 25)] === 1 
      ||
      this.stage.level[Math.floor(topY / 25)][Math.floor(leftX / 25)] === 1
    ) {
      this.player.collision.top = true;
      this.player.yPos = this.player.yPos + 1;
      if (this.player.level === 2) {
        this.onGround = true;
      }
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