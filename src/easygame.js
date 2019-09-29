'use strict';

/**
 * Main game engine class responsible for creating the main game updating logic.
 */
class EasyGame {

    /**
     * Instantiates a new game based on the definitions provided
     * and returns closure within which the game will be executed.
     *
     * @param {Game} game instance of a game definition class.
     * @returns Game closure.
     */
    static create(game) {

        return ((gameInstance) => {
            gameInstance.setupDisplay();

            const callback = (timestamp) => {
                gameInstance.tick(timestamp);
                window.requestAnimationFrame(callback);
            };

            window.requestAnimationFrame(callback);

        })(game);
    }
}