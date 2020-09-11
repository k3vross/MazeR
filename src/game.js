import Stage from "./stage";
import Player from "./player";


export default class Game {
    constructor() {
        let canvas = document.getElementById('mazer-canvas');
        canvas.width = 1100;
        canvas.height = 700;
        this.ctx = canvas.getContext("2d");
        this.registerEvents();
        this.restart();
    }

    play() {
        this.running = true;
        this.animate();
    }
    
    restart() {
        this.running = false;
        this.stage = new Stage()
        this.player = new Player()
        this.animate();
    }

    registerEvents() {
        this.boundClickHandler = this.click.bind(this);
        this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    }

    click(e) {
        if (!this.running) {
            this.play();
        }
    }


    animate() {
        this.ctx.clearRect(0, 0, 1100, 700);
        this.checkBottomCollision();
        this.checkLeftCollision();
        this.checkRightCollision();
        this.checkTopCollision();
        this.stage.animate(this.ctx);
        this.player.animate(this.ctx);
        console.log(this.player.collision.top, this.player.collision.right, this.player.collision.bottom, this.player.collision.left);
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this))
        }
    }

    checkBottomCollision() {
        let leftX = this.player.xPos;
        let rightX = this.player.xPos + 15; 
        let bottomY = this.player.yPos + 15;

        if ((this.stage.level[Math.floor(bottomY / 25)][Math.floor(rightX / 25)] === 1) || (this.stage.level[Math.floor(bottomY / 25)][Math.floor(leftX / 25)] === 1)) {
            this.player.yPos = this.player.prevYPos;
            this.player.collision.bottom = true;
            this.onGround = true;
        } else {
            this.player.collision.bottom = false;
        }        
    }

    checkLeftCollision() {
        let leftX = this.player.xPos;
        let topY = this.player.yPos;
        let bottomY = this.player.yPos + 15;

        if ((this.stage.level[Math.floor(bottomY / 25)][Math.floor(leftX / 25)] === 1) || (this.stage.level[Math.floor(topY / 25)][Math.floor(leftX / 25)] === 1)) {
            this.player.xPos = this.player.prevXPos;
            this.player.collision.left = true;
        } else {
            this.player.collision.left = false;
        }
    }

    checkRightCollision() {
        let topY = this.player.yPos;
        let rightX = this.player.xPos + 15; 
        let bottomY = this.player.yPos + 15;

        if ((this.stage.level[Math.floor(bottomY / 25)][Math.floor(rightX / 25)] === 1) || (this.stage.level[Math.floor(topY / 25)][Math.floor(rightX / 25)] === 1)) {
            this.player.xPos = this.player.prevXPos;
            this.player.collision.right = true;
        } else {
            this.player.collision.right = false;
        }
    }

    checkTopCollision() {
        let leftX = this.player.xPos;
        let topY = this.player.yPos;
        let rightX = this.player.xPos + 15; 

        if ((this.stage.level[Math.floor(topY / 25)][Math.floor(rightX / 25)] === 1) || (this.stage.level[Math.floor(topY / 25)][Math.floor(leftX / 25)] === 1)) {
            this.player.yPos = this.player.prevYPos;
            this.player.collision.top = true;
        } else {
            this.player.collision.top = false;
        }
    }
}