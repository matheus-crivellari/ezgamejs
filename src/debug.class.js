class Debug {
    static render(gameObject, display, color) {
        const { x, y, width: w, height: h } = gameObject;

        display.beginPath();

        display.strokeStyle = color || '#ffff';
        display.strokeWidth = 1;
        display.strokeRect(x, y, w, h);

        display.closePath();
    }
}