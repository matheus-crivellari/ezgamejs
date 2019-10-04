'use strict';

/**
 * This class represents an interface for
 * declaring a game with minimal implementation;
 */
class Game {

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
    alive = true;

    elapsedTime = 0;
    deltaTime   = 0;

    displayWidth = 0;
    displayHeight = 0;

    /**
     * Receives the reference for canvas where game will be rendered.
     *
     * @param {DOMElement} element Canvas DOM element.
     */
    constructor(element, width, height) {
        this.domElement = element;

        if(this.domElement)
            this.display = this.domElement.getContext('2d');

        this.width   = width  || this.width;
        this.height  = height || this.height;
        this.displayWidth  = this.width;
        this.displayHeight = this.height;
    }

    /**
     * Kills the game loop process. Must create the game again to restart.
     **/
    kill() {
        this.alive = false;
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
            this.domElement = document.createElement('CANVAS');
            this.domElement.id = `game_${(Math.random()).toString(16).replace('.','')}`;

            const $parent = this.parentDomElement || document.body;
            $parent.appendChild(this.domElement);
        }

        if(this.pixelPerfect) {
            this.domElement.style['image-rendering'] = 'pixelated';
        }

        this.display = this.domElement.getContext('2d');

        this.domElement.width  = this.width;
        this.domElement.height = this.height;

        this.domElement.style.width = `${this.displayWidth}px`;
        this.domElement.style.height = `${this.displayHeight}px`;

        this.display.fillStyle = '#000';
        this.display.fillRect(0,0, this.width, this.height);
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
        // TODO perform game internal input logic.
    }

    /** Handles game internal update logic. */
    $update() {
        // TODO perform game object list's update.
        this.update.apply(this, [this]);
    }

    /** Handles game internal late update logic. */
    $lateUpdate() {
        // TODO perform game object list's late update.
        this.lateUpdate.apply(this, [this]);
    }

    /** Handles game internal render logic. */
    $render() {
        // TODO render game object list.
        this.render.apply(this, [this]);
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
}