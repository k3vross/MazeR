/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _stage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stage */ "./src/stage.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");




class Game {
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
        this.stage = new _stage__WEBPACK_IMPORTED_MODULE_0__["default"]()
        this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]()

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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


const canvas = document.getElementById('mazer-canvas');
new _game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas);




/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
const CONSTANTS = {
    GRAVITY: .5,
    X_TERMINAL_VEL: 3.5,
    Y_TERMINAL_VEL: 15,
};

class Player {
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

/***/ }),

/***/ "./src/stage.js":
/*!**********************!*\
  !*** ./src/stage.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stage; });
class Stage {
  constructor() {
    this.tileSize = 25;
    this.level = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,1],
        [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,1],
        [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,1,1,1,1,0,0,1,1,0,0,0,0,1,0,1,1,1,0,0,1,1,1],
        [1,1,0,1,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,0,0,1,1],
        [1,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,1,1,0,0,1,1,1,0,1,1,0,0,1,1,1,1,1,1,0,0,1,0,1,0,0,1,1,1],
        [1,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1,0,0,0,0,0,0,1],
        [1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,1,1,1,1,0,0,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,1],
        [1,0,0,1,1,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,1,1,0,1,0,0,1,1],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,1],
        [1,0,0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,0,0,1],
        [1,1,0,0,0,0,1,0,0,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,0,0,0,1],
        [1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,1,1,0,0,1,0,0,1,0,1,0,0,1,1,1,1,0,0,1,1],
        [1,1,1,1,1,1,0,1,0,1,0,0,0,0,1,0,1,1,0,0,1,1,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,1,1,1,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1],
        [1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,0,1,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,1],
        [1,1,0,1,1,0,0,0,0,1,1,0,1,1,1,0,0,0,1,0,0,1,0,1,1,1,1,0,0,1,1,1,0,0,1,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,1],
        [1,1,0,0,0,1,1,1,0,1,0,0,1,0,0,0,0,0,1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,1,1,0,0,0,0,1,0,0,1,0,0,1,1,0,1,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
        [1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
        [1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

      
    ];
  }
  draw(ctx) {
    this.level.forEach((row, y) => {
      row.forEach((tile, x) => {
        let xPos = x * this.tileSize;
        let yPos = y * this.tileSize;
        if (tile === 1) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = 'rgb(50, 0, 50)';
            ctx.fillRect(xPos, yPos, this.tileSize, this.tileSize);
            ctx.stroke();
        }
        
      });
    });
  }

  animate(ctx) {
    this.draw(ctx)
  }
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map