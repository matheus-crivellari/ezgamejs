class GameObject {
    $id;
    name;
    x = 0;
    y = 0;
    width = 10;
    height = 10;

    constructor(name, width, height, x, y, color) {
        this.$id = EzGame.randomId();
        this.name   = name   || `$go_${this.$id}`;
        this.width  = width  || this.width;
        this.height = height || this.height;
        this.color  = color  || '#0f0f';
        this.x = x || this.x;
        this.y = y || this.y;
    }

    /** User defined callback for game object input logic. */
    input = () => {};

    /** User defined callback for game object update logic. */
    update = () => {};

    /** User defined callback for game object late update logic. */
    lateUpdate = () => {};

    /** User defined callback for game object rendering logic. */
    render = () => {};

    /** User defined callback for game object gui rendering logic. */
    gui = () => {};

    /** Handles game object's internal input logic. */
    $input(gameInstance) {
        this.input.apply(this, [this, gameInstance]);
    }

    /** Handles game object's internal update logic. */
    $update(gameInstance) {
        this.update.apply(this, [this, gameInstance]);
    }

    /** Handles game object's internal late update logic. */
    $lateUpdate() {
        this.lateUpdate.apply(this, [this]);
    }

    /** Handles game object's internal rendering logic. */
    $render(displayRef) {
        this.render.apply(this, [this, displayRef]);
    }

    /** Handles game object's internal gui rendering logic. */
    $gui(){
        this.gui.apply(this, [this]);
    }

    /** Game object's hit box getter */
    get hitBox() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height,
        };
    }

    /** Game object's position getter */
    get pivot() {
        return { x: this.x, y: this.y };
    }
}
