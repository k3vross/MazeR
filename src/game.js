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
        this.ctx.clearRect(0, 0, 1100, 700)
        this.stage.animate(this.ctx);
        this.player.animate(this.ctx);
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this))
        }
    }

}

// class App {
//     constructor() {
//         let canvas = document.createElement('canvas');
//         let stage = new Stage()
//         canvas.width = stage.tileSize * stage.level[0].length
//         canvas.height = stage.tileSize * stage.level.length
//         document.body.appendChild(canvas)
//         let ctx = canvas.getContext("2d")
//         stage.draw(ctx)
//     }
// }

// new App();