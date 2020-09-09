import Stage from "./stage";
import Player from "./player";

class App {
    constructor() {
        let canvas = document.createElement('canvas');
        let stage = new Stage()
        canvas.width = stage.tileSize * stage.level[0].length
        canvas.height = stage.tileSize * stage.level.length
        document.body.appendChild(canvas)
        let ctx = canvas.getContext("2d")
        stage.draw(ctx)
    }
}

new App();