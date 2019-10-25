'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Debug {
  static render(go, display, color) {
    const {
      x,
      y,
      width: w,
      height: h
    } = go.rect;
    display.beginPath();
    display.strokeStyle = color || go.color || '#ffff';
    display.lineWidth = 2;
    display.strokeRect(x, y, w, h);
    display.closePath();
  }

}

'use strict';
/**
 * Main game engine class responsible for creating the main game updating logic.
 */


class EzGame {
  /**
   * Instantiates a new game based on the definitions provided
   * and returns closure within which the game will be executed.
   *
   * @param {Game} game instance of a game definition class.
   * @returns Game closure.
   */
  static start(game) {
    return (gameInstance => {
      gameInstance.setupDisplay();
      gameInstance.$input();

      const loopFn = timestamp => {
        gameInstance.tick(timestamp);
        if (gameInstance.$alive) window.requestAnimationFrame(loopFn);
      };

      window.requestAnimationFrame(loopFn);
      gameInstance.$init();
    })(game);
  }
  /**
   * Generates a random identification string to be used inside game engine.
   */


  static randomId(seed) {
    return (new Date().getTime() + Math.random() * 1000).toString(16).replace('.', '');
  }

}

'use strict';
/**
 * This class represents an interface for
 * declaring a game with minimal implementation;
 */


class Game {
  /** Internal identification string */

  /**
   * Stores the reference for canvase's DOM
   * element where the game will be rendered.
   */

  /** Stores the reference for canvase's DOM parent element. */

  /**
   * Stores the reference for canvase's 2d
   * context where the game will be rendered.
   */

  /** Display resolution width. */

  /** Display resolution height. */

  /** Tells if game should either render pixel perfect or not. */

  /** Tells if game is whether paused or not. */

  /** Tells if game is whether playing or not. */

  /** Tells if game processing is either alive or dead. */

  /** Game object queue. This is for update and rendering. */

  /** Tells if game is whether over or not. */

  /**
   * Stores the reference for buffer canvase's 2d
   * context where the game will be rendered.
   */

  /**
   * Receives the reference for canvas where game will be rendered.
   *
   * @param {DOMElement} element Canvas DOM element.
   */
  constructor(element, width, height) {
    _defineProperty(this, "$id", void 0);

    _defineProperty(this, "domElement", null);

    _defineProperty(this, "parentDomElement", null);

    _defineProperty(this, "display", null);

    _defineProperty(this, "width", 320);

    _defineProperty(this, "height", 240);

    _defineProperty(this, "pixelPerfect", true);

    _defineProperty(this, "paused", false);

    _defineProperty(this, "playing", true);

    _defineProperty(this, "$alive", true);

    _defineProperty(this, "gameObjects", []);

    _defineProperty(this, "isOver", false);

    _defineProperty(this, "elapsedTime", 0);

    _defineProperty(this, "$deltaTime", 0);

    _defineProperty(this, "timeScale", 1);

    _defineProperty(this, "displayWidth", 0);

    _defineProperty(this, "displayHeight", 0);

    _defineProperty(this, "buffer", null);

    _defineProperty(this, "init", () => {});

    _defineProperty(this, "input", () => {});

    _defineProperty(this, "update", () => {});

    _defineProperty(this, "lateUpdate", () => {});

    _defineProperty(this, "render", () => {});

    _defineProperty(this, "gui", () => {});

    _defineProperty(this, "gameOver", () => {});

    _defineProperty(this, "restart", () => {});

    this.$id = EzGame.randomId();
    this.domElement = element;
    if (this.domElement) this.display = this.domElement.getContext('2d');
    this.width = width || this.width;
    this.height = height || this.height;
    this.displayWidth = this.width;
    this.displayHeight = this.height;
    this.buffer = {
      element: document.createElement('canvas'),
      context: null
    };
    this.buffer.context = this.buffer.element.getContext('2d');
  }
  /** Adds game object(s) to game's object processing list. */


  add(gameObject) {
    if (gameObject instanceof GameObject) {
      if (this.gameObjects.indexOf(gameObject) == -1) this.gameObjects.push(gameObject);
    }

    if (gameObject instanceof Array) {
      gameObject.map(go => this.gameObjects.push(go));
    }
  }
  /** Removes specific provided game object from game's processing list. */


  remove(gameObject) {
    const index = this.gameObjects.indexOf(gameObject);
    return this.gameObjects.splice(index, 1);
  }
  /**
   * Kills the game loop process. Must create the game again to restart.
   **/


  kill() {
    this.$alive = false;
  }
  /**
   * Pauses game loop process.
   */


  pause() {
    if (this.playing) {
      this.paused = true;
      this.playing = false;
    } else {
      this.play();
    }
  }
  /**
   * Resumes game loop process.
   */


  play() {
    this.paused = false;
    this.playing = true;
  }
  /** Setup game display before starting the game. */


  setupDisplay() {
    // Handles display setup if no canvas element is provided in constructor.
    if (!this.domElement) {
      const id = EzGame.randomId();
      this.domElement = document.createElement('CANVAS');
      this.domElement.id = `$game_${id}`;
      const $parent = this.parentDomElement || document.body;
      $parent.appendChild(this.domElement);
    }

    if (this.pixelPerfect) {
      this.domElement.style['image-rendering'] = 'pixelated';
    }

    this.display = this.domElement.getContext('2d'); // setup buffer display dimensions

    this.buffer.element.width = this.width;
    this.buffer.element.height = this.height; // setup actual display dimensions

    this.domElement.width = this.width;
    this.domElement.height = this.height;
    this.display.fillStyle = '#000';
    this.display.fillRect(0, 0, this.width, this.height);
  }
  /** Scales actual game display. */


  scale(width, height) {
    this.domElement.style.width = `${width}px`;
    this.domElement.style.height = `${height}px`;
    this.displayWidth = width;
    this.displayHeight = height;
  }
  /** User defined callback for game initialization. */


  reset() {
    this.isOver = false;
    this.gameObjects.map(go => {
      go.$alive = true;
    });
    this.restart.apply(this, [this]);
  }
  /**
   * Ends game match.
   */


  over() {
    this.isOver = true;
    this.gameOver.apply(this, [this]);
  }
  /** Handles game internal initialization logic. */


  $init() {
    this.isOver = false;
    this.init.apply(this, [this]);
  }
  /** Handles game internal input logic. */


  $input() {
    this.gameObjects.map(gameObject => gameObject.$input(this));
    this.input.apply(this, [this]);
  }
  /** Handles game internal update logic. */


  $update() {
    this.gameObjects.map(gameObject => gameObject.$update(this));
    this.update.apply(this, [this]);
  }
  /** Handles game internal late update logic. */


  $lateUpdate() {
    // TODO perform game object list's late update.
    this.lateUpdate.apply(this, [this]);
  }
  /** Handles game internal render logic. */


  $render() {
    const x = 0,
          y = 0,
          {
      width: w,
      height: h
    } = this; // clear buffer

    this.buffer.context.clearRect(x, y, w, h);
    this.buffer.context.fillStyle = '#000';
    this.buffer.context.fillRect(x, y, w, h);
    this.gameObjects.map(gameObject => gameObject.$render(this.buffer.context));
    this.render.apply(this, [this, this.buffer.context]); // clear actual display

    this.display.clearRect(x, y, w, h);
    this.display.fillStyle = '#000';
    this.display.fillRect(x, y, w, h); // render buffer to actual display

    this.display.drawImage(this.buffer.element, 0, 0);
  }
  /** Handles game internal gui render logic. */


  $gui() {
    this.gui.apply(this, [this]);
  }
  /**
   * Executes all logic updates once per frame.
   *
   * @param {Number} timestamp Elapsed time since game started.
   */


  tick(timestamp) {
    if (!this.$alive) return;
    this.$deltaTime = (timestamp - this.elapsedTime) / 1000;
    this.elapsedTime = timestamp;

    if (this.playing) {
      this.$update();
      this.$lateUpdate();
    }

    this.$render();
    this.$gui();
  }
  /** Gets the game scale ratio. */


  get ratio() {
    return this.displayWidth / this.width;
  }

  get deltaTime() {
    return this.$deltaTime * this.timeScale;
  }

}

'use strict';

class GameObject {
  constructor(name, width, height, x, y, color) {
    _defineProperty(this, "$id", void 0);

    _defineProperty(this, "$alive", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    _defineProperty(this, "width", 10);

    _defineProperty(this, "height", 10);

    _defineProperty(this, "input", () => {});

    _defineProperty(this, "update", () => {});

    _defineProperty(this, "lateUpdate", () => {});

    _defineProperty(this, "render", () => {});

    _defineProperty(this, "gui", () => {});

    _defineProperty(this, "onDestroy", () => {});

    this.$id = EzGame.randomId();
    this.$alive = true;
    this.name = name || `$go_${this.$id}`;
    this.width = width || this.width;
    this.height = height || width || this.height;
    this.color = color || '#0f0f';
    this.x = x || this.x;
    this.y = y || this.y;
  }
  /** User defined callback for game object input logic. */


  /** Handles game object's internal input logic. */
  $input(gameInstance) {
    if (this.$alive) this.input.apply(this, [this, gameInstance]);
  }
  /** Handles game object's internal update logic. */


  $update(gameInstance) {
    if (this.$alive) this.update.apply(this, [this, gameInstance]);
  }
  /** Handles game object's internal late update logic. */


  $lateUpdate() {
    if (this.$alive) this.lateUpdate.apply(this, [this]);
  }
  /** Handles game object's internal rendering logic. */


  $render(displayRef) {
    if (this.$alive) this.render.apply(this, [this, displayRef]);
  }
  /** Handles game object's internal gui rendering logic. */


  $gui() {
    if (this.$alive) this.gui.apply(this, [this]);
  }
  /** Game object's absolute hit box getter. */


  get hitBox() {
    return {
      left: this.x - this.width / 2,
      top: this.y - this.height / 2,
      right: this.x + this.width / 2,
      bottom: this.y + this.height / 2
    };
  }
  /** Game object's rect getter. */


  get rect() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    };
  }
  /** Game object's position getter. */


  get pivot() {
    return {
      x: this.x,
      y: this.y
    };
  }
  /** Game object's position setter. */


  set pivot(pivot) {
    this.x = pivot.x;
    this.y = pivot.y;
  }
  /**
   * Test overlapping with other game object. Can be used for collision testing.
   *
   * @param {GameObject} other other game object wihch we want to test overlapping with.
   * @returns {bollean} true if overlaps, false if not.
   */


  overlaps(other) {
    if (!this.$alive) return false;
    let {
      left: aL,
      top: aT,
      right: aR,
      bottom: aB
    } = this.hitBox;
    let {
      left: bL,
      top: bT,
      right: bR,
      bottom: bB
    } = other.hitBox;
    if (aL > bR) return false;
    if (aR < bL) return false;
    if (aT > bB) return false;
    if (aB < bT) return false;
    return true;
  }

  destroy() {
    if (this.$alive) {
      this.$alive = false;
      this.onDestroy.apply(this, [this]);
    }
  }

  getIntersection(other) {
    if (!this.overlaps(other)) return null;
    let left = other.hitBox.left;
    let right = other.hitBox.right;
    let top = other.hitBox.top;
    let bottom = other.hitBox.bottom;
    if (this.hitBox.left > left) left = this.hitBox.left;
    if (this.hitBox.right < right) right = this.hitBox.right;
    if (this.hitBox.top > top) top = this.hitBox.top;
    if (this.hitBox.bottom < bottom) bottom = this.hitBox.bottom;
    const width = right - left;
    const height = bottom - top;
    return {
      x: left + width / 2,
      y: top + height / 2,
      width: width,
      height: height
    };
  }

}