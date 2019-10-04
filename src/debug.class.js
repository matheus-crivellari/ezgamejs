class Debug {
    static draw(gameObject, display) {
        const { x, y, width: w, height: h } = gameObject;

        display.beginPath();

        display.strokeStyle = '#0f0f';
        display.strokeWidth = 1;
        display.strokeRect(x, y, w, h);

        display.closePath();
    }
}