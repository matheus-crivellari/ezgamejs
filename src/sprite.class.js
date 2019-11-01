'use strict';

class Sprite extends GameObject {
    $url;
    img;
    failed;
    loaded;

    constructor(url) {
        const def = 10;
        super();

        const $url = url || '';
        const elem = document.createElement('IMG');

        if($url)
            elem.src = $url;

        const ref = this;
        elem.addEventListener('error', (e) => {
            ref.loaded = false;
            ref.failed = true;
            ref.width  = ref.width  ? ref.width  : def;
            ref.height = ref.height ? ref.height : def;
        });

        elem.addEventListener('load', (e) => {
            const img = e.target;

            if(img) {
                ref.width  = ref.width  ? ref.width  : img.width;
                ref.height = ref.height ? ref.height : img.height;
                ref.loaded = true;
                ref.failed = false;
            } else {
                ref.width  = ref.width  ? ref.width  : def;
                ref.height = ref.height ? ref.height : def;
            }
        });

        this.$url   = $url;
        this.img    = elem || null;
        this.width  = 0;
        this.height = 0;
        this.loaded = false;
        this.failed = false;
    }

    get spriteRect() {

        if(this.failed)
            return this.rect;

        let fn;

        if(this.pixelPerfect)
            fn = Math.ceil;
        else
            fn = (value) => value;

        return {
            x:      fn(this.x - this.img.width / 2),
            y:      fn(this.y - this.img.height / 2),
            width:  fn(this.img.width),
            height: fn(this.img.height),
        };
    }
}