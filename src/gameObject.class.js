'use strict';

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
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height,
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
        let { left: aL, top: aT, right: aR, bottom: aB } = this.hitBox;
        let { left: bL, top: bT, right: bR, bottom: bB } = other.hitBox;

        if (aL > bR) return false;
        if (aR < bL) return false;
        if (aT > bB) return false;
        if (aB < bT) return false;

        return true;
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
