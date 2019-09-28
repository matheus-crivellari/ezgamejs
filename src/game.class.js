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

    setupDisplay() {
        if(!this.element) {
            this.element = document.createElement('CANVAS');
            this.element.id = `game_${(Math.random()).toString(16).replace('.','')}`;

            const $parent = this.parentElement || document.body;
            $parent.appendChild(this.element);
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

    /**
     * User defined callback for game objects rendering.
     */
    render = () => {};
}