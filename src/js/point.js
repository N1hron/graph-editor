export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    equals(point) {
        return point.x == this.x && this.y == point.y;
    }

    draw(ctx, { 
        radius = 8, 
        color = '#959595', 
        selected = false, 
        selectColor = "#222",
        hovered = false,
        hoverColor = "#222"
    } = {}) {
        ctx.beginPath();

        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);

        ctx.fill();

        if (selected) {
            ctx.beginPath();

            ctx.fillStyle = selectColor;
            ctx.arc(this.x, this.y, radius * 0.7, 0, 2 * Math.PI);

            ctx.fill();
        }

        if (hovered && !selected) {
            ctx.beginPath();

            ctx.fillStyle = hoverColor;
            ctx.arc(this.x, this.y, radius * 0.4, 0, 2 * Math.PI);

            ctx.fill();
        }
    }
}