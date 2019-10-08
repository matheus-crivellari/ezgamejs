'use strict';

/**
 * This class represents an interface for
 * declaring a game with minimal implementation;
 */
class Game {
    /** Internal identification string */
    $id;

    /**
     * Stores the reference for canvase's DOM
     * element where the game will be rendered.
     */
    domElement = null;

    /** Stores the reference for canvase's DOM parent element. */
    parentDomElement = null;

    /**
     * Stores the reference for canvase's 2d
     * context where the game will be rendered.
     */
    display  = null;

    /** Display resolution width. */
    width = 320;

    /** Display resolution height. */
    height = 240;

    /** Tells if game should either render pixel perfect or not. */
    pixelPerfect = true;

    /** Tells if game is whether paused or not. */
    paused  = false;

    /** Tells if game is whether playing or not. */
    playing = true;

    /** Tells if game processing is either alive or dead. */
    $alive = true;

    /** Game object queue. This is for update and rendering. */
    gameObjects = [];

    elapsedTime = 0;
    deltaTime   = 0;

    displayWidth = 0;
    displayHeight = 0;

    buffer = null;

    /**
     * Receives the reference for canvas where game will be rendered.
     *
     * @param {DOMElement} element Canvas DOM element.
     */
    constructor(element, width, height) {
        this.$id = EzGame.randomId();

        this.domElement = element;

        if(this.domElement)
            this.display = this.domElement.getContext('2d');

        this.width   = width  || this.width;
        this.height  = height || this.height;
        this.displayWidth  = this.width;
        this.displayHeight = this.height;

        this.buffer = {
            element: document.createElement('canvas'),
            context: null,
        };

        this.buffer.context = this.buffer.element.getContext('2d');
    }

    add(gameObject) {
        if(gameObject instanceof GameObject) {
            if(this.gameObjects.indexOf(gameObject) == -1)
                this.gameObjects.push(gameObject);
        }

        if(gameObject instanceof Array) {
            gameObject.map(go => this.gameObjects.push(go));
        }
    }

    remove(gameObject) {
        const index = this.gameObjects.indexOf(gameObject);
        return this.gameObjects.splice(index,1);
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
            this.paused  = true;
            this.playing = false;
        } else {
            this.play();
        }
    }

    /**
     * Resumes game loop process.
     */
    play() {
        this.paused  = false;
        this.playing = true;
    }

    /** Setup game display before starting the game. */
    setupDisplay() {
        // Handles display setup if no canvas element is provided in constructor.
        if(!this.domElement) {
            const id = EzGame.randomId();
            this.domElement = document.createElement('CANVAS');
            this.domElement.id = `$game_${id}`;

            const $parent = this.parentDomElement || document.body;
            $parent.appendChild(this.domElement);
        }

        if(this.pixelPerfect) {
            this.domElement.style['image-rendering'] = 'pixelated';
        }

        this.display = this.domElement.getContext('2d');

        // setup buffer display dimensions
        this.buffer.element.width  = this.width;
        this.buffer.element.height = this.height;

        // setup actual display dimensions
        this.domElement.width  = this.width;
        this.domElement.height = this.height;

        this.display.fillStyle = '#000';
        this.display.fillRect(0,0, this.width, this.height);
    }

    scale(width, height) {
        this.domElement.style.width = `${width}px`;
        this.domElement.style.height = `${height}px`;

        this.displayWidth  = width;
        this.displayHeight = height;
    }

    /**
     * User defined callback for game input logic.
     */
    input = () => {};

    /**
     * User defined callback for game logic udpate.
     */
    update = () => {};

    /**
     * User defined callback for game logic update. This update runs
     * after all elements were updated and before the render cycle.
     */
    lateUpdate = () => {};

    /** User defined callback for game objects rendering. */
    render = () => {};

    /** User defined callback for game gui rendering. */
    gui = () => {};

    /** Handles game internal input logic. */
    $input() {
        this.gameObjects.map((gameObject) => gameObject.$input(this));
        this.input.apply(this, [this]);
    }

    /** Handles game internal update logic. */
    $update() {
        this.gameObjects.map((gameObject) => gameObject.$update(this));
        this.update.apply(this, [this]);
    }

    /** Handles game internal late update logic. */
    $lateUpdate() {
        // TODO perform game object list's late update.
        this.lateUpdate.apply(this, [this]);
    }

    /** Handles game internal render logic. */
    $render() {
        const x = 0, y = 0, { width: w, height: h } = this;

        // clear buffer
        this.buffer.context.clearRect(x, y, w, h);
        this.buffer.context.fillStyle = '#000';
        this.buffer.context.fillRect(x, y, w, h);

        this.gameObjects.map((gameObject) => gameObject.$render(this.buffer.context));
        this.render.apply(this, [this, this.buffer.context]);

        // clear actual display
        this.display.clearRect(x, y, w, h);
        this.display.fillStyle = '#000';
        this.display.fillRect(x, y, w, h);

        // render buffer to actual display
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
        this.deltaTime   = timestamp - this.elapsedTime;
        this.elapsedTime = timestamp;

        if(this.playing) {
            this.$update();
            this.$lateUpdate();
            this.$render();
        }

        this.$gui();
    }

    get ratio() {
        return this.displayWidth / this.width;
    }
}