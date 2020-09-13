

export default class Player {
    constructor() {
        this.gravity = .25;
        this.xTermV = 3;
        this.yTermV = 6.5;
        this.level = 1;
        this.prevXPos = 0;
        this.prevYPos = 0
        this.xPos = 43;
        this.yPos = 643;
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
        ctx.fillStyle = 'rgb(0, 230, 230)';
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
            if (this.keys[68] && this.xVel < this.xTermV) {
                this.xVel += 1;
            } else {
                if (this.xVel > 0) {
                    this.xVel--;
                }
            }
        } else if (!this.keys[65]) {
            this.xVel = 0;
        }
        
        if (!this.collision.left) {
            if (this.keys[65] && Math.abs(this.xVel) < this.xTermV) {
                this.xVel -= 1;
            } else {
                if (this.xVel < 0) {
                    this.xVel ++;
                }
            }
        } else if (!this.keys[68]) {
            this.xVel = 0
        }
        
        if (this.level === 1) {
            if (!this.collision.top && this.onGround) {
                if (this.keys[87]) {
                    this.jumping = true;
                    this.onGround = false;
                    this.yVel = -this.speed * 3.5
                }  
            } else if (this.collision.top) {
                this.yPos = this.prevYPos;
                this.yVel = .5
            }
        } else if (this.level === 2) {
            if (!this.collision.bottom && this.onGround) {
              if (this.keys[83]) {
                this.jumping = true;
                this.onGround = false;
                this.yVel = this.speed * 4.8;
              }
            } else if (this.collision.bottom) {
              this.yPos = this.prevYPos;
              this.yVel = -0.5;
            }
        }
    
        if (this.level === 1) {
            if (this.collision.bottom) {
                this.onGround = true;
            } else {
                this.onGround = false;
            }
            
            if (this.yVel >= 0) {
                this.jumping = false
            }
        } else if (this.level === 2) {
            this.gravity = - .25
            if (this.collision.top) {
              this.onGround = true;
            } else {
              this.onGround = false;
            }

            if (this.yVel <= 0) {
              this.jumping = false;
            }
        }
        
        if (this.xPos < 25) {
            this.xPos = 25;
        } else if (this.xPos > 1060) {
            this.xPos = 1060;
        }
        
        if (this.yPos < 25) {
            this.yPos = 25;
        } else if (this.yPos > 660) {
            this.yPos = 660;
        }
        
        if (!this.onGround) {
            this.yVel += this.gravity;
            if (Math.abs(this.yVel) >= this.yTermV) {
                if (this.yVel > 0) {
                    this.yVel = this.yTermV
                }
            }
        } else {
            this.yVel = 0
        }



        // wall glitch resolutions
        if (this.collision.top && this.collision.bottom && this.collision.right && this.collision.left) {
            this.xPos = this.xPos - 16;
        }

        if (this.collision.top && this.collision.bottom && this.collision.right) {
            this.xPos = this.xPos - 8
        }

        if (this.collision.top && this.collision.bottom && this.collision.left) {
            this.xPos = this.xPos + 8
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