'use strict';

class GameObject {
    $id;
    $alive;
    name;
    x = 0;
    y = 0;
    width = 10;
    height = 10;
    pixelPerfect = true;
    color;

    constructor(name, width, height, x, y, color) {
        this.$id = EzGame.randomId();
        this.$alive = true;
        this.name   = name   || `$go_${this.$id}`;
        this.width  = width  || this.width;
        this.height = height || width || this.height;
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

    /** User defined callback for game object destruction event. */
    onDestroy = () => {};

    /** Handles game object's internal input logic. */
    $input(gameInstance) {
        if(this.$alive)
            this.input.apply(this, [this, gameInstance]);
    }

    /** Handles game object's internal update logic. */
    $update(gameInstance) {
        if(this.$alive)
            this.update.apply(this, [this, gameInstance]);
    }

    /** Handles game object's internal late update logic. */
    $lateUpdate() {
        if(this.$alive)
            this.lateUpdate.apply(this, [this]);
    }

    /** Handles game object's internal rendering logic. */
    $render(displayRef) {
        if(this.$alive)
            this.render.apply(this, [this, displayRef]);
    }

    /** Handles game object's internal gui rendering logic. */
    $gui(){
        if(this.$alive)
            this.gui.apply(this, [this]);
    }

    /** Game object's absolute hit box getter. */
    get hitBox() {
        return {
            left:   this.x - this.width  / 2,
            top:    this.y - this.height / 2,
            right:  this.x + this.width  / 2,
            bottom: this.y + this.height / 2,
        };
    }

    /** Game object's rect getter. */
    get rect() {
        let fn;

        if(this.pixelPerfect)
            fn = Math.ceil;
        else
            fn = (value) => value;

        return {
            x:      fn(this.x - this.width / 2),
            y:      fn(this.y - this.height / 2),
            width:  fn(this.width),
            height: fn(this.height),
        };
    }

    /** Game object's position getter. */
    get pivot() {
        return { x: this.x, y: this.y };
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
        if (!this.$alive)
            return false;

        let { left: aL, top: aT, right: aR, bottom: aB } = this.hitBox;
        let { left: bL, top: bT, right: bR, bottom: bB } = other.hitBox;

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
        if (!this.overlaps(other))
            return null;

        let left   = other.hitBox.left;
        let right  = other.hitBox.right;
        let top    = other.hitBox.top;
        let bottom = other.hitBox.bottom;

        if (this.hitBox.left > left)
            left = this.hitBox.left;

        if (this.hitBox.right < right)
            right = this.hitBox.right;

        if (this.hitBox.top > top)
            top = this.hitBox.top;

        if (this.hitBox.bottom < bottom)
            bottom = this.hitBox.bottom;

        const width  = right - left;
        const height = bottom - top;

        return {
            x: left + width / 2,
            y: top + height / 2,
            width: width,
            height: height,
        };
    }
}
