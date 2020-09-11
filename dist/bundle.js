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
    let canvas = document.getElementById("mazer-canvas");
    canvas.width = 1100;
    canvas.height = 700;
    this.startTime = 0;
    this.gameOver = false;
    this.ctx = canvas.getContext("2d");
    
    this.registerEvents();
    this.restart();
  }

  play() {
    this.running = true;
    this.startTime = Date.now();
    this.animate();
  }

  restart() {
    this.running = false;
    this.stage = new _stage__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.animate();
  }

  registerEvents() {
    this.boundClickHandler = this.click.bind(this);
    window.addEventListener("mousedown", this.boundClickHandler);
  }

  click(e) {
    if (!this.running) {    
      this.play();
      let winScreen = document.getElementsByClassName("win-modal")[0];
      winScreen.classList.remove("is-open");
    }
  }

  checkWin() {
    if (this.player.xPos > 1026 && this.player.yPos < 56) {
      let winScreen = document.getElementsByClassName('win-modal')[0];
      winScreen.classList.add("is-open");
      this.running = false;
      this.restart()
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, 1100, 700);
    this.checkWin();
    this.checkBottomCollision();
    this.checkLeftCollision();
    this.checkRightCollision();
    this.checkTopCollision();
    this.stage.animate(this.ctx);
    this.player.animate(this.ctx);
    console.log(
    this.player.jumping
    );
    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
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
      this.onGround = true;
    } else {
      this.player.collision.bottom = false;
    }
  }

  checkLeftCollision() {
    let leftX = this.player.xPos - 3;
    let topY = this.player.yPos;
    let bottomY = this.player.yPos + 15;

    if (
      this.stage.level[Math.floor(bottomY / 25)][Math.floor(leftX / 25)] === 1 
      ||
      this.stage.level[Math.floor(topY / 25)][Math.floor(leftX / 25)] === 1
    ) {
      this.player.collision.left = true;
    //   this.player.xPos = this.player.prevXPos;
    //   this.player.keys[37] = false
    } else {
      this.player.collision.left = false;
    }
  }

  checkRightCollision() {
    let topY = this.player.yPos;
    let rightX = this.player.xPos + 18;
    let bottomY = this.player.yPos + 15;

    if (
      this.stage.level[Math.floor(bottomY / 25)][Math.floor(rightX / 25)] === 1
      ||
      this.stage.level[Math.floor(topY / 25)][Math.floor(rightX / 25)] === 1
    ) {
      this.player.collision.right = true;
    //   this.player.xPos = this.player.prevXPos;
    //   this.player.keys[39] = false;
    } else {
      this.player.collision.right = false;
    }
  }

  checkTopCollision() {
    let leftX = this.player.xPos;
    let topY = this.player.yPos - 3;
    let rightX = this.player.xPos + 15;

    if (
      this.stage.level[Math.floor(topY / 25)][Math.floor(rightX / 25)] === 1 
      ||
      this.stage.level[Math.floor(topY / 25)][Math.floor(leftX / 25)] === 1
    ) {
      this.player.collision.top = true;
    } else {
      this.player.collision.top = false;
    }
  }
}

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


new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();




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


class Player {
    constructor() {
        this.gravity = .3;
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

        if (this.level === 1) {
            if (!this.collision.right) {
                if (this.keys[39] && this.xVel < this.xTermV) {
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
                if (this.keys[37] && Math.abs(this.xVel) < this.xTermV) {
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
                if (this.keys[38]) {
                    this.jumping = true;
                    this.onGround = false;
                    this.yVel = -this.speed * 3.5
                }  
            } else if (this.collision.top) {
                this.yPos = this.prevYPos;
                this.yVel = .5
            }
            
            if (this.collision.bottom) {
                this.onGround = true;
            } else {
                this.onGround = false;
            }
            
            if (this.yVel >= 0) {
                this.jumping = false
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
            
            this.prevXPos = this.xPos;
            this.prevYPos = this.yPos;
            this.xPos += this.xVel;
            this.yPos += this.yVel;
        }
    }
        
            
    animate(ctx) {
        this.movePlayer(ctx)
        this.drawPlayer(ctx);
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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");



class Stage {
  constructor() {
    this.tileSize = 25;
    this.level = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,2,2,1],
        [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,2,2,1],
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
        [1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,1,1,1,1,0,0,1,1],
        [1,1,1,1,1,1,0,1,0,1,0,0,0,0,1,0,1,1,0,0,1,1,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,1,1,1,0,0,0,1,0,0,1,0,0,0,1,0,1,0,0,1,0,1,1,1,1,1],
        [1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1],
        [1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,1,1,1,1,1,1,0,0,1,0,1,1,1,1,1,0,1,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,1],
        [1,1,0,1,1,0,0,0,0,1,1,0,1,1,1,0,0,0,1,0,0,1,0,1,1,1,1,0,0,1,1,1,0,0,1,0,0,0,0,1,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,1,0,1],
        [1,1,0,0,0,1,1,1,0,1,0,0,1,0,0,0,0,0,1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,1,1,0,0,0,0,1,0,0,1,0,0,1,1,0,1,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
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
          ctx.beginPath();
          ctx.fillStyle = "rgb(150, 0, 150)";
          ctx.fillRect(xPos, yPos, this.tileSize, this.tileSize);
          ctx.stroke();
        } else if (tile === 2) {
          ctx.beginPath();
          ctx.fillStyle = "rgb(0, 200, 0)";
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