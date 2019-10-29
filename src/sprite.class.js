'use strict';

class Sprite extends GameObject {
    $url;
    img;
    failed;
    loaded;

    constructor(url) {
        super();

        const $url = url || '';
        const elem = document.createElement('IMG');

        if($url)
            elem.src = $url;

        const ref = this;
        elem.addEventListener('error', (e) => {
            ref.loaded = false;
            ref.failed = true;
        });

        elem.addEventListener('load', (e) => {
            const img = e.target;

            if(img) {
                ref.width  = img.width;
                ref.height = img.height;
                ref.loaded = true;
                ref.failed = false;
            }
        });

        this.$url   = $url;
        this.img    = elem || null;
        this.width  = 0;
        this.height = 0;
        this.loaded = false;
        this.failed = false;
    }
}