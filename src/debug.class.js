class Debug {
    static render(go, display, color) {
        const { x, y, width: w, height: h } = go.hitBox;

        display.beginPath();

        display.strokeStyle = color || '#ffff';
        display.strokeWidth = 1;
        display.strokeRect(x, y, w, h);

        display.closePath();
    }
}