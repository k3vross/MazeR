import Player from "./player";


export default class Stage {
  constructor() {
    this.tileSize = 25;
    this.level = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,2,2,1],
        [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,2,2,1],
        [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,1,1,1,1,0,0,1,1,0,0,0,0,1,0,1,1,1,0,0,1,1,1],
        [1,1,0,1,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,0,0,1,1],
        [1,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1],
        [1,0,0,0,0,0,1,1,1,1,1,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,1,0,0,0,0,1,1,0,1,0,0,0,0,0,0,1],
        [1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,1,1,1,1,0,0,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,1],
        [1,0,0,1,1,0,0,0,1,0,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,1,1,0,1,0,0,1,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,1],
        [1,0,0,1,0,0,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,0,0,1],
        [1,1,0,0,0,0,1,0,0,0,0,0,1,1,0,0,1,0,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,0,0,0,1],
        [1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,1,1,1,1,0,0,1,1],
        [1,1,1,1,1,1,0,1,0,1,0,0,0,0,1,0,1,1,0,0,1,1,0,1,0,0,0,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,1,1,1,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1],
        [1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,1,0,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,1],
        [1,1,0,1,1,0,0,0,0,1,1,0,1,1,1,0,0,0,1,0,0,1,1,1,1,1,1,0,0,1,1,1,0,0,1,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,1],
        [1,1,0,0,0,1,1,1,0,1,0,0,1,0,0,0,0,0,1,0,1,1,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,1,1,0,0,0,0,1,0,0,1,0,0,1,1,0,1,0,1,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
        [1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
  }
  
  draw(ctx) {
    this.level.forEach((row, y) => {
      row.forEach((tile, x) => {
        let xPos = x * this.tileSize;
        let yPos = y * this.tileSize;
        if (tile === 1) {
          ctx.fillStyle = "rgb(150, 0, 150)";
          ctx.fillRect(xPos, yPos, this.tileSize, this.tileSize);
        } else if (tile === 2) {
          ctx.fillStyle = "rgb(0, 200, 0)";
          ctx.fillRect(xPos, yPos, this.tileSize, this.tileSize);
        }
      });
    });
  } 

  animate(ctx) {
    this.draw(ctx)
  }
}