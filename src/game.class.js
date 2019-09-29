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
    element = null;

    /** Stores the reference for canvase's DOM parent element. */
    parentElement = null;

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
        this.element = element;

        if(this.element)
            this.display = this.element.getContext('2d');

        this.width   = width  || this.width;
        this.height  = height || this.height;
        this.displayWidth  = this.width;
        this.displayHeight = this.height;
    }

    kill() {
        this.alive = false;
        console.log('killou');
    }

    pause() {
        this.paused  = true;
        this.playing = false;
    }

    play() {
        this.paused  = false;
        this.playing = true;
    }

    /** Setup game display before starting the game. */
    setupDisplay() {
        // Handles display setup if no canvas element is provided in constructor.
        if(!this.element) {
            this.element = document.createElement('CANVAS');
            this.element.id = `game_${(Math.random()).toString(16).replace('.','')}`;

            const $parent = this.parentElement || document.body;
            $parent.appendChild(this.element);
        }

        if(this.pixelPerfect) {
            this.element.style['image-rendering'] = 'pixelated';
        }

        this.display = this.element.getContext('2d');

        this.element.width  = this.width;
        this.element.height = this.height;

        this.element.style.width = `${this.displayWidth}px`;
        this.element.style.height = `${this.displayHeight}px`;

        this.display.fillStyle = '#000';
        this.display.fillRect(0,0, this.width, this.height);
    }

    /**
     * User defined callback for internal game input logic.
     */
    input = () => {};

    /**
     * User defined callback for internal game logic udpate.
     */
    update = () => {};

    /**
     * User defined callback for internal game logic update. This update runs
     * after all elements were updated and before the render cycle.
     */
    lateUpdate = () => {};

    /** User defined callback for game objects rendering. */
    render = () => {};

    /** User defined callback for game gui rendering. */
    gui = () => {};

    $input() {
        this.element.addEventListener('keyup', (event) => {

        });
    }

    $update() {
        // TODO perform game object list's update.
        this.update.apply(this);
    }

    $lateUpdate() {
        // TODO perform game object list's late update.
        this.lateUpdate.apply(this);
    }

    $render() {
        // TODO render game object list.
        this.render.apply(this);
    }

    $gui() {
        this.gui.apply(this);
    }

    /**
     * Executes all logic updates once per frame.
     *
     * @param {Number} timestamp Elapsed time since game started.
     */
    tick(timestamp) {
        this.deltaTime   = timestamp - this.elapsedTime;
        this.elapsedTime = timestamp;

        this.$update();
        this.$lateUpdate();
        this.$render();
        this.$gui();
    }
}