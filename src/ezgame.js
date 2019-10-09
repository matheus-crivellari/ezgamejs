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

        return ((gameInstance) => {
            gameInstance.setupDisplay();

            gameInstance.$input();

            const loopFn = (timestamp) => {
                gameInstance.tick(timestamp);

                if(gameInstance.$alive)
                    window.requestAnimationFrame(loopFn);
            };

            window.requestAnimationFrame(loopFn);

            gameInstance.$init();

        })(game);
    }

    /**
     * Generates a random identification string to be used inside game engine.
     */
    static randomId() {
        return (new Date().getTime()).toString(16).replace('.','');
    }
}