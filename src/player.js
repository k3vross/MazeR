const CONSTANTS = {
    GRAVITY: .5,
    X_TERMINAL_VEL: 3.5,
    Y_TERMINAL_VEL: 15,
};

export default class Player {
    constructor() {
        this.xPos = 550;
        this.yPos = 142;
        this.width = 15;
        this.height = 15;
        this.xVel = 0;
        this.yVel = 0;
        this.keys = {};
        
    }

    drawPlayer(ctx) {  
        ctx.fillStyle = 'rgb(0, 230, 0)';
        ctx.fillRect(this.xPos, this.yPos, this.width, this.height)
    }

    
    movePlayer() {
        window.addEventListener("keydown", (e) => {
            this.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", (e) => {
            this.keys[e.keyCode] = false;
        });

        if (this.keys[39] && (this.xVel) < CONSTANTS.X_TERMINAL_VEL) {
          this.xVel += 1;
        } else {
            if (this.xVel > 0) {
            this.xVel --
            }
        }
        if (this.keys[37] && Math.abs(this.xVel) < CONSTANTS.X_TERMINAL_VEL) {
            this.xVel -= 1;
        } else {
            if (this.xVel < 0) {
              this.xVel ++;
            }
        }

        this.xPos += this.xVel;

        this.yPos += this.yVel;
        
        // this.yVel += CONSTANTS.GRAVITY;
        
        // if (Math.abs(this.yVel) > CONSTANTS.Y_TERMINAL_VEL) {
        //     if (this.yVel > 0) {
        //         this.yVel = CONSTANTS.Y_TERMINAL_VEL
        //     } else {
        //         this.yVel = CONSTANTS.Y_TERMINAL_VEL * -1
        //     }
        // }
    }
    
    animate(ctx) {
        this.drawPlayer(ctx);
        this.movePlayer(ctx)
    }
}