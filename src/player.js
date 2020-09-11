const CONSTANTS = {
    GRAVITY: .25,
    X_TERMINAL_VEL: 3,
    Y_TERMINAL_VEL: 6.5,
};

export default class Player {
    constructor() {
        this.prevXPos = 0;
        this.prevYPos = 0
        this.xPos = 562;
        this.yPos = 30;
        this.width = 15;
        this.height = 15;
        this.speed = 2;
        this.xVel = 0;
        this.yVel = 0;
        this.keys = {}; 
        this.onGround = false;
        this.jumping = false;
        this.collision = {
            bottom: false,
            left: false,
            right: false,
            top: false
        }
    }

    drawPlayer(ctx) {  
        ctx.beginPath()
        ctx.fillStyle = 'rgb(0, 230, 0)';
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height)
    }

    movePlayer(ctx) {
        window.addEventListener("keydown", (e) => {
            
            this.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", (e) => {
        
            this.keys[e.keyCode] = false;
        });

        if (!this.collision.right) {
            if (this.keys[39] && this.xVel < CONSTANTS.X_TERMINAL_VEL) {
                this.xVel += 1;
            } else {
                if (this.xVel > 0) {
                    this.xVel--;
                }
            }
        } 
        else if (!this.keys[37]) {
            this.xVel = 0;
        }
        
        if (!this.collision.left) {
            if (this.keys[37] && Math.abs(this.xVel) < CONSTANTS.X_TERMINAL_VEL) {
                this.xVel -= 1;
            } else {
                if (this.xVel < 0) {
                    this.xVel ++;
                }
            }
        } else if (!this.keys[39]) {
            this.xVel = 0
        }

        if (!this.collision.top && this.onGround) {
            if (this.keys[38] && Math.abs(this.yVel) < CONSTANTS.Y_TERMINAL_VEL && !this.jumping) {
                this.jumping = true;
                this.onGround = false;
                this.yVel = -this.speed * 3.25
            }  
        }

        if (this.collision.bottom) {
          this.onGround = true;
        } else {
            this.onGround = false;
        }

        if (this.yVel > 0) {
            this.jumping = false
        }

        if (this.xPos <= 25) {
            this.xPos = 25;
        } else if (this.xPos + 40 >= 1100) {
            this.xPos = 1060;
        }

        if (this.yPos <= 25) {
            this.yPos = 25;
        } else if (this.yPos + 40 >= 700) {
            this.yPos = 660;
        }

            

        
        
        if (!this.onGround) {
            this.yVel += CONSTANTS.GRAVITY;
            if (Math.abs(this.yVel) > CONSTANTS.Y_TERMINAL_VEL) {
                if (this.yVel > 0) {
                    this.yVel = CONSTANTS.Y_TERMINAL_VEL
                } else {
                    this.yVel = CONSTANTS.Y_TERMINAL_VEL * -1
                }
            }
        } else {
            this.yVel = 0
        }

        this.prevXPos = this.xPos;
        this.prevYPos = this.yPos;
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    }
    
    animate(ctx) {
        this.movePlayer(ctx)
        this.drawPlayer(ctx);
    }
}