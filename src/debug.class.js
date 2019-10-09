class Debug {
    static render(go, display, color) {
        const { x, y, width: w, height: h } = go.hitBox;

        display.beginPath();

        display.strokeStyle = color || go.color || '#ffff';
        display.lineWidth = 2;
        display.strokeRect(x, y, w, h);

        display.closePath();
    }
}