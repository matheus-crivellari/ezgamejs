class GameObject {
    name;
    width = 10;
    height = 10;

    constructor(name, width, height) {
        const rndName = EzGame.randomId();

        this.name   = name   || `$go_${rndName}`;
        this.width  = width  || this.width;
        this.height = height || this.height;
    }

    /** User defined callback for game object update logic. */
    update = () => {};

    /** User defined callback for game object late update logic. */
    lateUpdate = () => {};

    /** User defined callback for game object rendering logic. */
    render = () => {};

    /** User defined callback for game object gui rendering logic. */
    gui = () => {};

    /** Handles game object's internal update logic. */
    $update() {
        this.update.apply(this, [this]);
    }

    /** Handles game object's internal late update logic. */
    $lateUpdate() {
        this.lateUpdate.apply(this, [this]);
    }

    /** Handles game object's internal rendering logic. */
    $render() {
        this.render.apply(this, [this]);
    }

    /** Handles game object's internal gui rendering logic. */
    $gui(){
        this.gui.apply(this, [this]);
    }

    /** Game object's hit box getter */
    get hitBox() {
        return { width: this.width, height: this.height };
    }
}
