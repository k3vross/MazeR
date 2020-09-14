# MazeR

## A maze platformer with inverse gravity on level 2

[Live Link](https://k3vross.github.io/MazeR)


![Image of MazeR](https://github.com/k3vross/MazeR/blob/master/images/mazer_screen.png)

### Background

MazeR is a 2D platformer maze game. The game consists of two stages. The first has normal gravity and the goal is to solve the maze as quickly as posible. The second stage features the same maze, but gravity is reversed. Beat both stages and try and beat your own highscore!

### Controls
* W: Jump
* S: Inverse Jump
* A: Move Left
* D: Move Right

### Functionality & How to play
* Navigate to the green goal area to advance to the next stage
* The 'w' key is jump up on the first stage
* The 's' key is jump down on the second stage
* A timer will keep track of how it takes to beat both stages.

### Technologies Used

* JavaScript for all game logic
* HTML5 Canvas to draw game levels, player, timer, and level titles
* Webpack to bundle JavaScript files


### Future Plans 

* Add more stages with different physics changes
* Add more variations of the maze
* Add Saving of high scores that will show the top-ten scores.

### Challenges and Code Snippets

* Collision detection was difficult to make functional with the stage generated from a tile map. The pixel coordiantes on the canvas were divided by the tile size, then rounded down to get the indicies that a given tile is generated on the map. 

```Javascript
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
```

* Getting the physics to change as the level changes required a level variable assigned to the player. Once the first level is completed, the varibale is changed. That variable is used to change the physics of the game

```javascript
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
```
