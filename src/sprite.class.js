class Sprite {
    $url;
    element;
    width;
    height;
    failed;
    loaded;

    constructor(url) {
        const $url = url || '';
        const e = document.createElement('IMG');

        if($url)
            e.src = $url;

        const ref = this;
        e.addEventListener('load', function (e) {
            const img = e.target;

            if(img) {
                ref.width  = img.width;
                ref.height = img.height;
                ref.loaded = true;
                ref.failed = false;
            }
        });

        this.$url    = $url;
        this.element = e   || null;
        this.width   = 0;
        this.height  = 0;
        this.loaded  = false;
        this.failed  = false;
    }
}